/**
 * Professional Game Manager with enhanced features
 * @class GameManager
 * @description Main game controller that coordinates all systems
 */
class GameManager {
  constructor() {
    this.setupEventListeners();
    this.lastLevelCompleteInput = "";
  }

  setupEventListeners() {
    document.addEventListener("keydown", (e) => {
      keys[e.key] = true;

      // Handle level complete input
      if (
        window.levelManager &&
        levelManager.handleLevelCompleteInput(e.key, false)
      ) {
        this.advanceToNextLevel();
        return;
      }

      if (e.key === " ") {
        // Handle spacebar for both ball launch and laser shooting
        if (gameState === GAME_STATES.BALL_ON_PADDLE) {
          this.launchBall();
        } else if (gameState === GAME_STATES.PLAYING && paddle.hasLaser) {
          this.shootLaser();
        }
      }
      if (e.key === "b" || e.key === "B") {
        // Handle beam attack
        if (gameState === GAME_STATES.PLAYING && energySystem.canUseBeam()) {
          this.activateBeam();
        }
      }
      if (e.key === "r" || e.key === "R") {
        this.restartGame();
      }
      if (e.key === "p" || e.key === "P") {
        this.togglePause();
      }
      if (e.key === "t" || e.key === "T") {
        themeManager.switchTheme();
      }
      if (e.key === "s" || e.key === "S") {
        // Toggle sound settings
        if (window.soundManager) {
          soundManager.toggleSettings();
        }
      }
    });

    document.addEventListener("keyup", (e) => {
      keys[e.key] = false;
    });

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
    });

    canvas.addEventListener("click", (e) => {
      if (gameState === GAME_STATES.BALL_ON_PADDLE) {
        this.launchBall();
      } else if (
        gameState === GAME_STATES.LEVEL_COMPLETE &&
        window.levelManager &&
        levelManager.handleLevelCompleteInput(null, true)
      ) {
        this.advanceToNextLevel();
      }
    });
  }

  launchBall() {
    ball.launch();
    gameState = GAME_STATES.PLAYING;
  }

  /**
   * Shoot laser from paddle if laser power-up is active
   */
  shootLaser() {
    if (
      paddle.hasLaser &&
      Date.now() - paddle.lastLaserTime > paddle.laserCooldown
    ) {
      laserManager.createLaser(paddle.x, paddle.y, paddle.width);
      paddle.lastLaserTime = Date.now();
    }
  }

  /**
   * Activate powerful beam attack
   */
  activateBeam() {
    if (energySystem.activateBeam()) {
      // Check beam collisions and destroy bricks
      const hitBricks = energySystem.checkBeamCollisions();

      for (let brick of hitBricks) {
        brick.destroyed = true;
        score += brick.points;

        // Add energy for destroyed bricks
        const brickType = this.getBrickType(brick);
        energySystem.addEnergy(brickType);

        // Handle bomb explosions
        if (brick.isBomb) {
          this.handleBombExplosion(brick);
        }
      }

      this.updateUI();

      // Check level completion
      if (bricks.every((b) => b.destroyed)) {
        this.levelComplete();
      }
    }
  }

  /**
   * Handle bomb brick explosion
   */
  handleBombExplosion(bombBrick) {
    const destroyedBricks = BrickManager.explodeBomb(bombBrick, bricks);

    // Create spectacular explosion effect
    particleSystem.createBombExplosion(
      bombBrick.x + bombBrick.width / 2,
      bombBrick.y + bombBrick.height / 2,
      bombBrick.bombType
    );

    // Process destroyed bricks
    for (let brick of destroyedBricks) {
      score += brick.points;

      // Add energy for each destroyed brick
      const brickType = this.getBrickType(brick);
      energySystem.addEnergy(brickType);

      // Create explosion effects for each destroyed brick
      particleSystem.createExplosion(
        brick.x + brick.width / 2,
        brick.y + brick.height / 2,
        brick.color
      );

      particleSystem.createFloatingScore(
        brick.x + brick.width / 2,
        brick.y + brick.height / 2,
        brick.points
      );
    }
  }

  /**
   * Get brick type from brick object
   */
  getBrickType(brick) {
    if (brick.isBomb) {
      return "BOMB";
    }

    // Determine type based on points
    switch (brick.points) {
      case 10:
        return "RED";
      case 20:
        return "ORANGE";
      case 30:
        return "YELLOW";
      case 40:
        return "GREEN";
      default:
        return "RED";
    }
  }

  /**
   * Generate professional brick layout with rounded corners
   */
  generateBricks() {
    bricks = BrickManager.generateBricks(canvas.width);
  }

  checkBrickCollisions() {
    // Check collisions for all active balls
    for (let ballIndex = 0; ballIndex < balls.length; ballIndex++) {
      const currentBall = balls[ballIndex];

      for (let i = 0; i < bricks.length; i++) {
        const brick = bricks[i];
        if (brick.destroyed) continue;

        if (
          currentBall.x + currentBall.radius >= brick.x &&
          currentBall.x - currentBall.radius <= brick.x + brick.width &&
          currentBall.y + currentBall.radius >= brick.y &&
          currentBall.y - currentBall.radius <= brick.y + brick.height
        ) {
          const ballCenterX = currentBall.x;
          const ballCenterY = currentBall.y;
          const brickCenterX = brick.x + brick.width / 2;
          const brickCenterY = brick.y + brick.height / 2;

          const deltaX = ballCenterX - brickCenterX;
          const deltaY = ballCenterY - brickCenterY;

          const intersectX =
            Math.abs(deltaX) - (brick.width / 2 + currentBall.radius);
          const intersectY =
            Math.abs(deltaY) - (brick.height / 2 + currentBall.radius);

          if (intersectX > intersectY) {
            currentBall.velocityY = -currentBall.velocityY;
          } else {
            currentBall.velocityX = -currentBall.velocityX;
          }

          brick.hits--;
          if (brick.hits <= 0) {
            brick.destroyed = true;
            score += brick.points;

            // Add energy for destroyed brick
            const brickType = this.getBrickType(brick);
            energySystem.addEnergy(brickType);

            this.updateUI();

            // Handle bomb explosions
            if (brick.isBomb) {
              this.handleBombExplosion(brick);
              // Play bomb explosion sound
              if (window.soundManager) {
                soundManager.play("bombExplosion");
              }
            } else {
              particleSystem.createExplosion(
                brick.x + brick.width / 2,
                brick.y + brick.height / 2,
                brick.color
              );
              // Play brick hit sound based on type
              if (window.soundManager) {
                soundManager.playBrickHit(brickType);
              }
            }

            particleSystem.createFloatingScore(
              brick.x + brick.width / 2,
              brick.y + brick.height / 2,
              brick.points
            );

            aiAssistant.metrics.bricksHit++;
            if (Math.random() < aiAssistant.getAdjustedPowerUpChance()) {
              powerUpSystem.dropPowerUp(
                brick.x + brick.width / 2,
                brick.y + brick.height
              );
            }

            if (bricks.every((b) => b.destroyed)) {
              this.levelComplete();
            }
          } else {
            if (brick.hits === 1 && brick.maxHits === 2) {
              brick.color = brick.color.replace("44", "88");
              particleSystem.createSmallExplosion(
                brick.x + brick.width / 2,
                brick.y + brick.height / 2,
                brick.color
              );
            }
          }

          break;
        }
      }
    }
  }

  checkPaddleCollision() {
    let paddleWidth = paddle.width;
    if (
      aiAssistant.currentAssistanceLevel ===
      aiAssistant.assistanceLevels.ACTIVE_HELP
    ) {
      paddleWidth += 20;
    }

    // Check paddle collision for all active balls
    for (let ballIndex = 0; ballIndex < balls.length; ballIndex++) {
      const currentBall = balls[ballIndex];

      if (
        currentBall.y + currentBall.radius >= paddle.y &&
        currentBall.y - currentBall.radius <= paddle.y + paddle.height &&
        currentBall.x >= paddle.x - (paddleWidth - paddle.width) / 2 &&
        currentBall.x <=
          paddle.x + paddleWidth - (paddleWidth - paddle.width) / 2
      ) {
        aiAssistant.metrics.paddleHits++;
        aiAssistant.metrics.totalBallBounces++;
        aiAssistant.metrics.consecutiveDeaths = 0;

        const hitPos = (currentBall.x - paddle.x) / paddle.width;
        const angle = (hitPos - 0.5) * Math.PI * 0.6;

        currentBall.velocityX = Math.sin(angle) * currentBall.speed;
        currentBall.velocityY = -Math.abs(Math.cos(angle) * currentBall.speed);
        currentBall.y = paddle.y - currentBall.radius - 1;
      }
    }
  }

  /**
   * Check laser collisions with bricks
   */
  checkLaserCollisions() {
    const collisions = laserManager.checkBrickCollisions(bricks);

    for (let collision of collisions) {
      const brick = collision.brick;

      brick.hits--;
      if (brick.hits <= 0) {
        brick.destroyed = true;
        score += brick.points;
        this.updateUI();

        particleSystem.createExplosion(
          brick.x + brick.width / 2,
          brick.y + brick.height / 2,
          brick.color
        );
        particleSystem.createFloatingScore(
          brick.x + brick.width / 2,
          brick.y + brick.height / 2,
          brick.points
        );

        aiAssistant.metrics.bricksHit++;
        if (Math.random() < aiAssistant.getAdjustedPowerUpChance()) {
          powerUpSystem.dropPowerUp(
            brick.x + brick.width / 2,
            brick.y + brick.height
          );
        }

        if (bricks.every((b) => b.destroyed)) {
          this.levelComplete();
        }
      } else {
        if (brick.hits === 1 && brick.maxHits === 2) {
          brick.color = brick.color.replace("44", "88");
          particleSystem.createSmallExplosion(
            brick.x + brick.width / 2,
            brick.y + brick.height / 2,
            brick.color
          );
        }
      }
    }
  }

  levelComplete() {
    // Show level complete screen using LevelManager
    if (window.levelManager) {
      levelManager.showLevelComplete(score);
      gameState = GAME_STATES.LEVEL_COMPLETE;
    } else {
      // Fallback to old system
      level++;
      ball.speed += 0.5;
      gameState = GAME_STATES.BALL_ON_PADDLE;

      // Properly reset ball position and velocity
      ball.x = paddle.x + paddle.width / 2;
      ball.y = paddle.y - ball.radius - 1;
      ball.velocityX = 0;
      ball.velocityY = 0;

      // Reset balls array to just the main ball
      balls = [ball];

      this.generateBricks();
      this.updateUI();
    }
  }

  /**
   * Advance to next level after level complete screen
   */
  advanceToNextLevel() {
    if (!window.levelManager) return;

    const newLevel = levelManager.advanceLevel();
    level = newLevel;

    // Apply level settings
    levelManager.applyLevelSettings(ball, bricks);

    // Reset game state
    gameState = GAME_STATES.BALL_ON_PADDLE;

    // Properly reset ball position and velocity
    ball.x = paddle.x + paddle.width / 2;
    ball.y = paddle.y - ball.radius - 1;
    ball.velocityX = 0;
    ball.velocityY = 0;

    // Reset balls array to just the main ball
    balls = [ball];

    // Generate new bricks and apply movement
    this.generateBricks();
    if (levelManager.getCurrentConfig().brickMovement) {
      levelManager.applyLevelSettings(ball, bricks);
    }

    this.updateUI();
  }

  loseLife() {
    lives--;
    aiAssistant.metrics.ballsLost++;
    aiAssistant.metrics.missedBalls++;
    aiAssistant.metrics.consecutiveDeaths++;
    this.updateUI();

    if (lives <= 0) {
      gameState = GAME_STATES.GAME_OVER;
    } else {
      gameState = GAME_STATES.BALL_ON_PADDLE;

      // Properly reset ball position and velocity
      ball.x = paddle.x + paddle.width / 2;
      ball.y = paddle.y - ball.radius - 1;
      ball.velocityX = 0;
      ball.velocityY = 0;

      // Reset balls array to just the main ball
      balls = [ball];
    }
  }

  togglePause() {
    if (gameState === GAME_STATES.PAUSED) {
      gameState = pausedState.previousState;
      const pauseDuration = Date.now() - pausedState.pauseStartTime;
      for (let activePowerUp of powerUpSystem.activePowerUps) {
        activePowerUp.startTime += pauseDuration;
      }
      pausedState = null;
    } else if (
      gameState === GAME_STATES.PLAYING ||
      gameState === GAME_STATES.BALL_ON_PADDLE
    ) {
      pausedState = {
        previousState: gameState,
        pauseStartTime: Date.now(),
      };
      gameState = GAME_STATES.PAUSED;
    }
  }

  restartGame() {
    score = 0;
    lives = 3;
    level = 1;
    ball.speed = 6;
    gameState = GAME_STATES.BALL_ON_PADDLE;
    ball.velocityX = 0;
    ball.velocityY = 0;
    paddle.x = canvas.width / 2 - paddle.width / 2;
    paddle.reset();
    powerUpSystem.clear();
    laserManager.clear();
    balls = [ball];
    particleSystem.clear();
    aiAssistant.reset();
    if (energySystem && typeof energySystem.reset === "function") {
      energySystem.reset();
    }
    this.generateBricks();
    this.updateUI();
  }

  updateUI() {
    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = lives;
    document.getElementById("level").textContent = level;
  }

  update() {
    if (
      gameState !== GAME_STATES.PAUSED &&
      gameState !== GAME_STATES.LEVEL_COMPLETE
    ) {
      // Null checks to prevent undefined errors
      if (paddle && typeof paddle.update === "function") {
        paddle.update(keys, mouseX);
      }

      // Update all balls and remove those that fall off screen
      if (balls && Array.isArray(balls)) {
        for (let i = balls.length - 1; i >= 0; i--) {
          const currentBall = balls[i];
          if (currentBall && typeof currentBall.update === "function") {
            currentBall.update();

            // Remove split balls that fall off screen (NOT main ball)
            if (currentBall.y > canvas.height && !currentBall.isMainBall) {
              balls.splice(i, 1);
            }
          }
        }
      }

      // Only lose life if MAIN ball falls off screen
      if (ball && ball.isMainBall && ball.y > canvas.height) {
        this.loseLife();
        return;
      }

      this.checkBrickCollisions();
      this.checkPaddleCollision();
      this.checkLaserCollisions();

      // Update brick movement if level manager is active
      if (
        window.levelManager &&
        typeof levelManager.updateBrickMovement === "function"
      ) {
        levelManager.updateBrickMovement(bricks, canvas.width, canvas.height);
      }

      // Safe system updates with null checks
      if (powerUpSystem && typeof powerUpSystem.update === "function") {
        powerUpSystem.update();
      }
      if (laserManager && typeof laserManager.update === "function") {
        laserManager.update();
      }
      if (aiAssistant && typeof aiAssistant.updateMetrics === "function") {
        aiAssistant.updateMetrics();
      }
      if (
        aiAssistant &&
        typeof aiAssistant.applyAssistance === "function" &&
        ball
      ) {
        aiAssistant.applyAssistance(ball);
      }
      if (particleSystem && typeof particleSystem.update === "function") {
        particleSystem.update();
      }
      if (energySystem && typeof energySystem.update === "function") {
        energySystem.update();
      }
    }
  }

  renderGameOver(ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const textColor =
      themeManager.currentTheme.name === "Minimalist" ? "#E53E3E" : "#EC4899";
    ctx.fillStyle = textColor;
    ctx.font = 'bold 48px "Segoe UI"';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 50);

    const scoreColor =
      themeManager.currentTheme.name === "Minimalist" ? "#4A5568" : "#F8FAFC";
    ctx.fillStyle = scoreColor;
    ctx.font = '24px "Segoe UI"';
    ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2);
    ctx.fillText(
      "Press R to Restart",
      canvas.width / 2,
      canvas.height / 2 + 50
    );
  }

  renderPauseScreen(ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const pauseColor = themeManager.getColors().paddle;
    ctx.fillStyle = pauseColor;
    ctx.font = 'bold 48px "Segoe UI"';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2 - 50);

    const instructionColor =
      themeManager.currentTheme.name === "Minimalist" ? "#718096" : "#F8FAFC";
    ctx.fillStyle = instructionColor;
    ctx.font = '24px "Segoe UI"';
    ctx.fillText("Press P to Resume", canvas.width / 2, canvas.height / 2 + 20);
  }

  render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    BrickManager.renderBricks(ctx, bricks);
    powerUpSystem.render(ctx);
    paddle.render(ctx);

    // Render all active balls
    for (let currentBall of balls) {
      currentBall.render(ctx);
    }

    // Render lasers
    laserManager.render(ctx);

    particleSystem.render(ctx);

    // Render energy system
    if (energySystem && typeof energySystem.render === "function") {
      energySystem.render(ctx);
    }

    if (gameState === GAME_STATES.GAME_OVER) {
      this.renderGameOver(ctx);
    } else if (gameState === GAME_STATES.PAUSED) {
      this.renderPauseScreen(ctx);
    } else if (
      gameState === GAME_STATES.LEVEL_COMPLETE &&
      window.levelManager
    ) {
      levelManager.renderLevelComplete(ctx, score, canvas.width, canvas.height);
    }
  }
}

/**
 * Professional game state management
 */
const GAME_STATES = {
  PLAYING: "playing",
  BALL_ON_PADDLE: "ball_on_paddle",
  GAME_OVER: "game_over",
  LEVEL_COMPLETE: "level_complete",
  PAUSED: "paused",
};
