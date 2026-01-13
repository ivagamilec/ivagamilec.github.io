// Main birthday card module
import ConfettiSystem from "./confetti.js";

class BirthdayCard {
  constructor() {
    this.postcard = document.querySelector(".postcard");
    this.confettiContainer = document.querySelector(".confetti-container");
    this.nameElement = document.querySelector(".birthday-name");
    this.cakeContainer = document.querySelector(".cake-container");

    this.confettiSystem = new ConfettiSystem(this.confettiContainer);
    this.isAnimating = false;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupNameAnimation();
    this.setupCakeAnimation();
  }

  setupEventListeners() {
    // Hover events for confetti
    this.postcard.addEventListener("mouseenter", () => {
      if (!this.isAnimating) {
        this.triggerCelebration();
      }
    });

    // Click event for extra celebration
    this.postcard.addEventListener("click", () => {
      this.triggerBigCelebration();
    });

    // Touch events for mobile
    this.postcard.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.triggerCelebration();
    });
  }

  setupNameAnimation() {
    // Add letter animation to the name
    const nameText = this.nameElement.textContent;
    this.nameElement.innerHTML = "";

    nameText.split("").forEach((letter, index) => {
      const span = document.createElement("span");
      span.textContent = letter === " " ? "\u00A0" : letter;
      span.style.display = "inline-block";
      span.style.transition = "transform 0.3s ease";
      span.style.transitionDelay = index * 0.1 + "s";
      this.nameElement.appendChild(span);
    });

    // Hover effect on name letters
    this.postcard.addEventListener("mouseenter", () => {
      const letters = this.nameElement.querySelectorAll("span");
      letters.forEach((letter, index) => {
        setTimeout(() => {
          letter.style.transform = "translateY(-10px) rotate(5deg) scale(1.1)";
          letter.style.color = this.getRandomColor();
        }, index * 100);
      });
    });

    this.postcard.addEventListener("mouseleave", () => {
      const letters = this.nameElement.querySelectorAll("span");
      letters.forEach((letter) => {
        letter.style.transform = "translateY(0) rotate(0deg) scale(1)";
        letter.style.color = "#2c3e50";
      });
    });
  }

  setupCakeAnimation() {
    const candles = document.querySelectorAll(".candle");
    const flames = document.querySelectorAll(".flame");

    // Add blow animation on click
    this.cakeContainer.addEventListener("click", (e) => {
      e.stopPropagation();
      this.blowCandles(flames);
    });

    // Re-light candles after a delay
    setTimeout(() => {
      this.relightCandles(flames);
    }, 5000);
  }

  blowCandles(flames) {
    flames.forEach((flame, index) => {
      setTimeout(() => {
        flame.style.opacity = "0";
        flame.style.transform = "translateX(-50%) scale(0) rotate(45deg)";
      }, index * 200);
    });

    // Trigger confetti when candles are blown
    setTimeout(() => {
      this.confettiSystem.burst(30);
    }, 600);
  }

  relightCandles(flames) {
    flames.forEach((flame, index) => {
      setTimeout(() => {
        flame.style.opacity = "1";
        flame.style.transform = "translateX(-50%) scale(1) rotate(0deg)";
      }, index * 100);
    });
  }

  triggerCelebration() {
    this.isAnimating = true;
    this.confettiSystem.burst(25);

    // Add sparkle effect
    this.addSparkles();

    setTimeout(() => {
      this.isAnimating = false;
    }, 1000);
  }

  triggerBigCelebration() {
    this.confettiSystem.continuousBurst(2000, 150);
    this.addSparkles(50);

    // Cake celebration animation
    this.cakeContainer.style.transform = "scale(1.2) rotate(360deg)";
    setTimeout(() => {
      this.cakeContainer.style.transform = "scale(1) rotate(0deg)";
    }, 1000);
  }

  addSparkles(count = 20) {
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement("div");
      sparkle.innerHTML = "✨";
      sparkle.style.position = "absolute";
      sparkle.style.fontSize = Math.random() * 20 + 10 + "px";
      sparkle.style.left = Math.random() * 100 + "%";
      sparkle.style.top = Math.random() * 100 + "%";
      sparkle.style.pointerEvents = "none";
      sparkle.style.animation = "sparkle 2s ease-out forwards";
      sparkle.style.zIndex = "50";

      this.confettiContainer.appendChild(sparkle);

      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, 2000);
    }
  }

  getRandomColor() {
    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#feca57",
      "#ff9ff3",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

// Add sparkle animation CSS
const sparkleCSS = `
@keyframes sparkle {
    0% {
        opacity: 0;
        transform: scale(0) rotate(0deg);
    }
    50% {
        opacity: 1;
        transform: scale(1) rotate(180deg);
    }
    100% {
        opacity: 0;
        transform: scale(0) rotate(360deg);
    }
}
`;

// Inject sparkle CSS
const style = document.createElement("style");
style.textContent = sparkleCSS;
document.head.appendChild(style);

// Initialize the birthday card when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new BirthdayCard();
});

// Add some extra birthday magic
window.addEventListener("load", () => {
  setTimeout(() => {
    const confettiSystem = new ConfettiSystem(
      document.querySelector(".confetti-container")
    );
    confettiSystem.burst(15);
  }, 500);
});
