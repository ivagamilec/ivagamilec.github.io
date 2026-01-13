// Confetti animation module
export class ConfettiSystem {
    constructor(container) {
        this.container = container;
        this.colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
        this.shapes = ['circle', 'square', 'triangle'];
    }

    createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const shape = this.shapes[Math.floor(Math.random() * this.shapes.length)];
        const size = Math.random() * 8 + 4;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 2 + 2;
        const delay = Math.random() * 2;
        
        // Style the confetti piece
        confetti.style.left = left + '%';
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.backgroundColor = color;
        confetti.style.animationDuration = animationDuration + 's';
        confetti.style.animationDelay = delay + 's';
        
        // Apply shape
        switch(shape) {
            case 'circle':
                confetti.style.borderRadius = '50%';
                break;
            case 'square':
                confetti.style.borderRadius = '0';
                break;
            case 'triangle':
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.backgroundColor = 'transparent';
                confetti.style.borderLeft = (size/2) + 'px solid transparent';
                confetti.style.borderRight = (size/2) + 'px solid transparent';
                confetti.style.borderBottom = size + 'px solid ' + color;
                break;
        }
        
        return confetti;
    }

    burst(count = 50) {
        for (let i = 0; i < count; i++) {
            const confetti = this.createConfetti();
            this.container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }
    }

    continuousBurst(duration = 3000, interval = 200) {
        const startTime = Date.now();
        const burstInterval = setInterval(() => {
            if (Date.now() - startTime > duration) {
                clearInterval(burstInterval);
                return;
            }
            this.burst(5);
        }, interval);
    }
}

// Export for use in other modules
export default ConfettiSystem;
