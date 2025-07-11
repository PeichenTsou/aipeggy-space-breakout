/**
 * Professional Game Manager with enhanced features
 * @class GameManager
 * @description Main game controller that coordinates all systems
 */
class GameManager {
  constructor() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener("keydown", (e) => {
      keys[e.key] = true;

      if (e.key === " ") {
        // Handle spacebar for both ball launch and laser shooting
        if (gameState === GAME_STATES.BALL_ON_PADDLE) {
          this.launchBall();
        } else if (gameState === GAME_STATES.PLAYING && paddle.hasLaser) {
          this.shootLaser();
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
   * Generate professional brick layout with rounded corners
   */
  generateBricks() {
    bricks = BrickManager.generateBricks();
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
    level++;
    ball.speed += 0.5;
    gameState = GAME_STATES.BALL_ON_PADDLE;
    ball.velocityX = 0;
    ball.velocityY = 0;
    this.generateBricks();
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
      ball.velocityX = 0;
      ball.velocityY = 0;
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
    this.generateBricks();
    this.updateUI();
  }

  updateUI() {
    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = lives;
    document.getElementById("level").textContent = level;
  }

  update() {
    if (gameState !== GAME_STATES.PAUSED) {
      paddle.update(keys, mouseX);

      // Update all balls and remove those that fall off screen
      for (let i = balls.length - 1; i >= 0; i--) {
        const currentBall = balls[i];
        currentBall.update();

        // Remove balls that fall off screen (except main ball)
        if (currentBall.y > canvas.height && currentBall !== ball) {
          balls.splice(i, 1);
        }
      }

      // If main ball falls off screen, handle life loss
      if (ball.y > canvas.height) {
        this.loseLife();
        return;
      }

      this.checkBrickCollisions();
      this.checkPaddleCollision();
      this.checkLaserCollisions();
      powerUpSystem.update();
      laserManager.update();
      aiAssistant.updateMetrics();
      aiAssistant.applyAssistance(ball);
      particleSystem.update();
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

    if (gameState === GAME_STATES.GAME_OVER) {
      this.renderGameOver(ctx);
    } else if (gameState === GAME_STATES.PAUSED) {
      this.renderPauseScreen(ctx);
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
