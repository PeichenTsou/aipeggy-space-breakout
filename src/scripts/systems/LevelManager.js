/**
 * Professional Level Manager with Progressive Difficulty
 * @class LevelManager
 * @description Manages level progression, difficulty scaling, and moving bricks
 */
class LevelManager {
  constructor() {
    this.currentLevel = 1;
    this.maxLevel = 10;
    this.showingLevelComplete = false;
    this.levelCompleteStartTime = 0;

    // Level configurations with progressive difficulty
    this.levelConfigs = {
      1: {
        ballSpeedMultiplier: 1.0,
        brickMovement: null,
        bombChance: 0.03,
        description: "Welcome to AIPeggy!",
      },
      2: {
        ballSpeedMultiplier: 1.15,
        brickMovement: null,
        bombChance: 0.03,
        description: "Faster Ball Challenge",
      },
      3: {
        ballSpeedMultiplier: 1.0,
        brickMovement: "horizontal",
        bombChance: 0.04,
        description: "Moving Bricks - Horizontal",
      },
      4: {
        ballSpeedMultiplier: 1.25,
        brickMovement: "horizontal",
        bombChance: 0.04,
        description: "Fast Ball + Moving Bricks",
      },
      5: {
        ballSpeedMultiplier: 1.35,
        brickMovement: "vertical",
        bombChance: 0.05,
        description: "Vertical Movement",
      },
      6: {
        ballSpeedMultiplier: 1.45,
        brickMovement: "both",
        bombChance: 0.05,
        description: "Multi-Directional Movement",
      },
      7: {
        ballSpeedMultiplier: 1.55,
        brickMovement: "circular",
        bombChance: 0.06,
        description: "Circular Patterns",
      },
      8: {
        ballSpeedMultiplier: 1.65,
        brickMovement: "random",
        bombChance: 0.06,
        description: "Chaotic Movement",
      },
      9: {
        ballSpeedMultiplier: 1.75,
        brickMovement: "complex",
        bombChance: 0.07,
        description: "Complex Patterns",
      },
      10: {
        ballSpeedMultiplier: 1.85,
        brickMovement: "extreme",
        bombChance: 0.08,
        description: "Ultimate Challenge",
      },
    };

    // Movement parameters
    this.movementSpeed = 0.5;
    this.movementAmplitude = 30;
    this.gameStartTime = Date.now();
  }

  /**
   * Get current level configuration
   */
  getCurrentConfig() {
    return this.levelConfigs[this.currentLevel] || this.levelConfigs[1];
  }

  /**
   * Show level completion screen
   */
  showLevelComplete(score) {
    this.showingLevelComplete = true;
    this.levelCompleteStartTime = Date.now();

    // Play level complete sound
    if (window.soundManager) {
      soundManager.playLevelComplete();
    }
  }

  /**
   * Hide level completion screen and advance to next level
   */
  advanceLevel() {
    this.showingLevelComplete = false;
    this.currentLevel = Math.min(this.currentLevel + 1, this.maxLevel);

    // Reset game start time for movement calculations
    this.gameStartTime = Date.now();

    return this.currentLevel;
  }

  /**
   * Apply level settings to game entities
   */
  applyLevelSettings(ball, bricks) {
    const config = this.getCurrentConfig();

    // Apply ball speed multiplier
    if (ball) {
      ball.speed = 6 * config.ballSpeedMultiplier;

      // Adjust current velocity if ball is moving
      if (ball.velocityX !== 0 || ball.velocityY !== 0) {
        const currentSpeed = Math.sqrt(
          ball.velocityX * ball.velocityX + ball.velocityY * ball.velocityY
        );
        if (currentSpeed > 0) {
          const ratio = ball.speed / currentSpeed;
          ball.velocityX *= ratio;
          ball.velocityY *= ratio;
        }
      }
    }

    // Apply movement settings to bricks
    if (bricks && config.brickMovement) {
      this.initializeBrickMovement(bricks, config.brickMovement);
    }
  }

  /**
   * Initialize brick movement patterns
   */
  initializeBrickMovement(bricks, movementType) {
    bricks.forEach((brick, index) => {
      if (brick.destroyed) return;

      // Store original position
      brick.originalX = brick.x;
      brick.originalY = brick.y;
      brick.movementType = movementType;
      brick.movementPhase = Math.random() * Math.PI * 2; // Random starting phase
      brick.movementIndex = index;
    });
  }

  /**
   * Update brick positions based on movement patterns
   */
  updateBrickMovement(bricks, canvasWidth = 800, canvasHeight = 600) {
    if (!bricks) return;

    const config = this.getCurrentConfig();
    if (!config.brickMovement) return;

    const currentTime = Date.now();
    const elapsed = (currentTime - this.gameStartTime) / 1000; // Convert to seconds

    bricks.forEach((brick, index) => {
      if (brick.destroyed || !brick.originalX) return;

      const phase = brick.movementPhase + elapsed * this.movementSpeed;

      switch (config.brickMovement) {
        case "horizontal":
          brick.x = brick.originalX + Math.sin(phase) * this.movementAmplitude;
          break;

        case "vertical":
          brick.y =
            brick.originalY + Math.sin(phase) * (this.movementAmplitude * 0.5);
          break;

        case "both":
          brick.x = brick.originalX + Math.sin(phase) * this.movementAmplitude;
          brick.y =
            brick.originalY +
            Math.cos(phase * 1.3) * (this.movementAmplitude * 0.3);
          break;

        case "circular":
          const radius = this.movementAmplitude * 0.7;
          brick.x = brick.originalX + Math.cos(phase) * radius;
          brick.y = brick.originalY + Math.sin(phase) * radius * 0.5;
          break;

        case "random":
          // Change direction randomly every few seconds
          const changeInterval = 3; // seconds
          const changePhase = Math.floor(elapsed / changeInterval);
          const randomSeed = (brick.movementIndex + changePhase) * 12345;
          const pseudoRandom1 = (Math.sin(randomSeed) + 1) / 2;
          const pseudoRandom2 = (Math.cos(randomSeed * 1.7) + 1) / 2;

          brick.x =
            brick.originalX +
            (pseudoRandom1 - 0.5) * this.movementAmplitude * 2;
          brick.y =
            brick.originalY + (pseudoRandom2 - 0.5) * this.movementAmplitude;
          break;

        case "complex":
          // Multiple sine waves for complex movement
          brick.x =
            brick.originalX +
            Math.sin(phase) * this.movementAmplitude * 0.7 +
            Math.sin(phase * 2.3) * this.movementAmplitude * 0.3;
          brick.y =
            brick.originalY +
            Math.cos(phase * 1.7) * this.movementAmplitude * 0.4;
          break;

        case "extreme":
          // Chaotic movement with multiple frequencies
          brick.x =
            brick.originalX +
            Math.sin(phase) * this.movementAmplitude * 0.8 +
            Math.sin(phase * 3.1) * this.movementAmplitude * 0.4 +
            Math.cos(phase * 1.9) * this.movementAmplitude * 0.2;
          brick.y =
            brick.originalY +
            Math.cos(phase * 2.1) * this.movementAmplitude * 0.5 +
            Math.sin(phase * 4.3) * this.movementAmplitude * 0.2;
          break;
      }

      // Keep bricks within canvas bounds with proper safety margins
      const minX = 10;
      const maxX = canvasWidth - brick.width - 10;
      const minY = 60;
      const maxY = Math.min(400, canvasHeight * 0.6); // Keep bricks in upper portion

      brick.x = Math.max(minX, Math.min(maxX, brick.x));
      brick.y = Math.max(minY, Math.min(maxY, brick.y));
    });
  }

  /**
   * Check if player has completed all levels
   */
  isGameComplete() {
    return this.currentLevel > this.maxLevel;
  }

  /**
   * Reset to level 1
   */
  reset() {
    this.currentLevel = 1;
    this.showingLevelComplete = false;
    this.gameStartTime = Date.now();
  }

  /**
   * Render level completion screen
   */
  renderLevelComplete(ctx, score, canvasWidth = 800, canvasHeight = 600) {
    if (!this.showingLevelComplete) return;

    // Semi-transparent overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const colors = themeManager.getColors();
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Level complete title
    ctx.fillStyle = colors.paddle;
    ctx.font = 'bold 48px "Orbitron", "Segoe UI"';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("LEVEL COMPLETE!", centerX, centerY - 80);

    // Level info
    ctx.fillStyle =
      themeManager.currentTheme.name === "Minimalist" ? "#4A5568" : "#F8FAFC";
    ctx.font = 'bold 24px "Segoe UI"';
    ctx.fillText(
      `Level ${this.currentLevel - 1} Cleared!`,
      centerX,
      centerY - 30
    );

    // Score
    ctx.font = '20px "Segoe UI"';
    ctx.fillText(`Score: ${score}`, centerX, centerY + 10);

    // Next level preview
    if (this.currentLevel <= this.maxLevel) {
      const nextConfig = this.levelConfigs[this.currentLevel];
      ctx.fillStyle = colors.ball;
      ctx.font = 'bold 18px "Segoe UI"';
      ctx.fillText(`Next: Level ${this.currentLevel}`, centerX, centerY + 50);
      ctx.font = '16px "Segoe UI"';
      ctx.fillText(nextConfig.description, centerX, centerY + 75);
    } else {
      // Game complete
      ctx.fillStyle = "#FFD700";
      ctx.font = 'bold 24px "Segoe UI"';
      ctx.fillText("🎉 GAME COMPLETE! 🎉", centerX, centerY + 50);
      ctx.font = '18px "Segoe UI"';
      ctx.fillText("You've mastered all levels!", centerX, centerY + 80);
    }

    // Continue instruction
    ctx.fillStyle =
      themeManager.currentTheme.name === "Minimalist" ? "#718096" : "#CBD5E0";
    ctx.font = '16px "Segoe UI"';
    ctx.fillText("Press ENTER or click to continue", centerX, centerY + 120);
  }

  /**
   * Handle level complete input
   */
  handleLevelCompleteInput(key, mouseClick) {
    if (!this.showingLevelComplete) return false;

    if (key === "Enter" || mouseClick) {
      this.advanceLevel();
      return true;
    }

    return false;
  }

  /**
   * Get level progress information
   */
  getLevelInfo() {
    const config = this.getCurrentConfig();
    return {
      level: this.currentLevel,
      maxLevel: this.maxLevel,
      description: config.description,
      ballSpeedMultiplier: config.ballSpeedMultiplier,
      brickMovement: config.brickMovement,
      bombChance: config.bombChance,
      isComplete: this.isGameComplete(),
    };
  }
}
