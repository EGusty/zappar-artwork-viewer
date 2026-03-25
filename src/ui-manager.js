export class UIManager {
    constructor(arManager, firebaseManager) {
        this.arManager = arManager;
        this.firebaseManager = firebaseManager;
        this.currentArtwork = null;

        this.setupListeners();
    }

    setupListeners() {
        // Scale slider
        const scaleSlider = document.getElementById('scaleSlider');
        const scaleValue = document.getElementById('scaleValue');

        scaleSlider?.addEventListener('input', (e) => {
            const scale = parseFloat(e.target.value);
            scaleValue.textContent = scale.toFixed(1);
            this.arManager.setScale(scale);
        });

        // Reset button
        document.getElementById('resetBtn')?.addEventListener('click', () => {
            this.arManager.reset();
            this.setStatus('Listo. Apunta a una pared.', true);
        });

        // Capture button
        document.getElementById('captureBtn')?.addEventListener('click', () => {
            this.captureScreenshot();
        });

        // AR Manager listeners
        this.arManager.on('planesDetected', () => {
            this.setStatus('Superficie detectada. Toca para colocar.', true);
        });

        this.arManager.on('artworkPlaced', (data) => {
            this.setStatus(`Obra: ${data.title}`, true);
        });

        this.arManager.on('error', (error) => {
            this.showError(error.message);
        });

        // Cargar primer artwork por defecto
        this.loadFirstArtwork();
    }

    async loadFirstArtwork() {
        const artworks = this.firebaseManager.getArtworks();
        if (artworks.length > 0) {
            try {
                await this.arManager.placeArtwork(artworks[0].id);
                this.currentArtwork = artworks[0];
            } catch (error) {
                this.showError('Error cargando obra: ' + error.message);
            }
        }
    }

    setStatus(text, isActive = false) {
        const statusText = document.getElementById('statusText');
        const indicator = document.getElementById('statusIndicator');

        if (statusText) statusText.textContent = text;
        if (indicator) {
            indicator.classList.toggle('active', isActive);
        }
    }

    showError(message) {
        const errorBox = document.getElementById('errorBox');
        if (errorBox) {
            errorBox.textContent = '⚠️ ' + message;
            errorBox.classList.add('show');

            setTimeout(() => {
                errorBox.classList.remove('show');
            }, 5000);
        }
    }

    captureScreenshot() {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `artwork-${Date.now()}.png`;
                a.click();
                URL.revokeObjectURL(url);
            });
        }
    }
}
