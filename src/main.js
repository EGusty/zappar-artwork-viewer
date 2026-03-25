import * as THREE from 'three';
import { ZapparThree } from '@zappar/zappar-threejs';
import { FirebaseManager } from './firebase-manager.js';
import { ARManager } from './ar-manager.js';
import { UIManager } from './ui-manager.js';

let zappar, scene, camera, renderer, arManager, firebaseManager, uiManager;

async function init() {
    try {
        // Inicializar Firebase
        firebaseManager = new FirebaseManager('ar-artwork-viewer');
        await firebaseManager.init();

        // Setup Three.js + Zappar
        setupThreeJS();

        // Inicializar AR Manager
        arManager = new ARManager(scene, camera, renderer, firebaseManager);
        await arManager.init();

        // Inicializar UI Manager
        uiManager = new UIManager(arManager, firebaseManager);
        uiManager.setStatus('Listo. Apunta a una pared.', true);

        // Iniciar loop de render
        animate();

    } catch (error) {
        console.error('Error inicializando app:', error);
        uiManager?.showError('Error: ' + error.message);
    }
}

function setupThreeJS() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('canvas'),
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.xr.enabled = true;

    // Zappar
    zappar = new ZapparThree();
    renderer.xr.setSession(zappar.session);

    // Setup Zappar camera
    camera.position.z = 0;
    zappar.updateCameraProjectionMatrix(camera);

    // Listeners
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    zappar.updateCameraProjectionMatrix(camera);
}

function animate() {
    requestAnimationFrame(animate);

    // Update Zappar
    zappar.update(camera);

    // Update AR Manager
    if (arManager) {
        arManager.update();
    }

    // Render
    renderer.render(scene, camera);
}

// Iniciar app cuando DOM está listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
