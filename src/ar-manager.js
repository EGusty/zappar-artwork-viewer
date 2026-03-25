import * as THREE from 'three';
import { ZapparThree } from '@zappar/zappar-threejs';

export class ARManager {
    constructor(scene, camera, renderer, firebaseManager) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.firebaseManager = firebaseManager;

        this.instantTracker = null;
        this.placedArtwork = null;
        this.scale = 1.0;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.listeners = {
            onPlanesDetected: null,
            onArtworkPlaced: null,
            onError: null
        };
    }

    async init() {
        try {
            // Crear Instant Tracker para detectar superficies
            const zappar = new ZapparThree();
            this.instantTracker = zappar.createInstantTracker();
            this.scene.add(this.instantTracker.anchor);

            // Listeners de mouse
            window.addEventListener('click', (e) => this.onCanvasClick(e));

            console.log('AR Manager inicializado');
        } catch (error) {
            console.error('Error en AR init:', error);
            this.listeners.onError?.(error);
        }
    }

    async placeArtwork(artworkId) {
        try {
            const artwork = this.firebaseManager.getArtworks()
                .find(a => a.id === artworkId);

            if (!artwork) {
                throw new Error('Obra no encontrada');
            }

            // Descargar imagen
            const imageBlob = await this.firebaseManager.downloadImage(artwork.imageUrl);
            const texture = new THREE.TextureLoader().load(URL.createObjectURL(imageBlob));

            // Crear plano con la imagen
            const geometry = new THREE.PlaneGeometry(
                artwork.widthCm / 100,
                artwork.heightCm / 100
            );
            const material = new THREE.MeshPhongMaterial({
                map: texture,
                side: THREE.FrontSide
            });

            // Remover artwork anterior si existe
            if (this.placedArtwork) {
                this.scene.remove(this.placedArtwork);
            }

            this.placedArtwork = new THREE.Mesh(geometry, material);
            this.placedArtwork.position.set(0, 0, -0.5);
            this.placedArtwork.scale.set(this.scale, this.scale, 1);

            this.scene.add(this.placedArtwork);

            this.listeners.onArtworkPlaced?.({
                artworkId,
                title: artwork.title
            });

        } catch (error) {
            console.error('Error colocando obra:', error);
            this.listeners.onError?.(error);
        }
    }

    onCanvasClick(event) {
        // Calcular posición del click
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Hit test
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Detectar superficie (para futura expansión)
        // Por ahora, simplemente colocar la obra en el centro
        if (this.instantTracker?.visible) {
            // La obra ya se colocó en placeArtwork
            console.log('Artwork placed');
        }
    }

    setScale(scale) {
        this.scale = Math.max(0.3, Math.min(3, scale));
        if (this.placedArtwork) {
            this.placedArtwork.scale.set(this.scale, this.scale, 1);
        }
    }

    reset() {
        if (this.placedArtwork) {
            this.scene.remove(this.placedArtwork);
            this.placedArtwork = null;
        }
        this.scale = 1.0;
    }

    update() {
        // Update instant tracker
        if (this.instantTracker?.visible) {
            this.listeners.onPlanesDetected?.();
        }
    }

    on(event, callback) {
        if (this.listeners.hasOwnProperty(`on${event.charAt(0).toUpperCase() + event.slice(1)}`)) {
            this.listeners[`on${event.charAt(0).toUpperCase() + event.slice(1)}`] = callback;
        }
    }
}
