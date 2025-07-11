/**
 * Professional Theme Manager with enhanced capabilities
 * @class ThemeManager
 * @description Manages theme switching and color coordination across the game
 */
class ThemeManager {
  constructor() {
    this.currentTheme = THEMES.SPACE; // Space as primary theme
    this.themeKeys = Object.keys(THEMES);
    this.currentIndex = 0;
  }

  /**
   * Switch between Space and Minimalist themes
   */
  switchTheme() {
    this.currentIndex = (this.currentIndex + 1) % this.themeKeys.length;
    const themeKey = this.themeKeys[this.currentIndex];
    this.currentTheme = THEMES[themeKey];
    this.applyTheme();
  }

  /**
   * Apply theme with smooth transitions
   */
  applyTheme() {
    // Remove all theme classes
    document.body.className = "";
    // Add current theme class
    document.body.classList.add(this.currentTheme.className);
    // Update theme display
    document.getElementById("currentTheme").textContent =
      this.currentTheme.name;

    // Update game colors with smooth transition
    this.updateGameColors();
  }

  /**
   * Update all game object colors
   */
  updateGameColors() {
    if (typeof paddle !== "undefined") {
      paddle.color = this.currentTheme.colors.paddle;
    }
    if (typeof ball !== "undefined") {
      ball.color = this.currentTheme.colors.ball;
    }
    if (typeof bricks !== "undefined") {
      bricks.forEach((brick) => {
        if (!brick.destroyed) {
          const brickType = this.getBrickType(brick);
          brick.color = this.currentTheme.colors.bricks[brickType];
        }
      });
    }
  }

  /**
   * Determine brick type for color mapping
   */
  getBrickType(brick) {
    if (brick.points === 10) return "red";
    if (brick.points === 20) return "orange";
    if (brick.points === 30) return "yellow";
    if (brick.points === 40) return "green";
    return "red";
  }

  getColors() {
    return this.currentTheme.colors;
  }
  getEffects() {
    return this.currentTheme.effects;
  }
}

/**
 * Professional theme configuration with design system
 */
const THEMES = {
  SPACE: {
    name: "Space",
    className: "theme-space",
    colors: {
      paddle: "#8B5CF6",
      ball: "#F8FAFC",
      bricks: {
        red: "#6366F1", // Indigo
        orange: "#8B5CF6", // Purple
        yellow: "#EC4899", // Pink
        green: "#F59E0B", // Amber
      },
      powerUps: {
        widePaddle: "#8B5CF6",
        multiBall: "#EC4899",
        slowBall: "#3B82F6",
        laser: "#FFD700",
      },
      particles: {
        explosion: "#EC4899",
        score: "#F8FAFC",
      },
    },
    effects: {
      glowIntensity: 25,
      particleCount: 15,
      shadowBlur: 20,
    },
  },
  MINIMALIST: {
    name: "Minimalist",
    className: "theme-minimalist",
    colors: {
      paddle: "#4A5568",
      ball: "#2D3748",
      bricks: {
        red: "#E53E3E",
        orange: "#DD6B20",
        yellow: "#D69E2E",
        green: "#38A169",
      },
      powerUps: {
        widePaddle: "#38A169",
        multiBall: "#9F7AEA",
        slowBall: "#3182CE",
        laser: "#F6AD55",
      },
      particles: {
        explosion: "#E53E3E",
        score: "#2D3748",
      },
    },
    effects: {
      glowIntensity: 0,
      particleCount: 6,
      shadowBlur: 0,
    },
  },
};
