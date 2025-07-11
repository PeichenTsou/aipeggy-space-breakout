/**
 * Enhanced power-up system with better visuals
 */
const POWER_UP_TYPES = {
  WIDE_PADDLE: {
    effect: "widePaddle",
    duration: 15000,
    icon: "↔",
    size: { width: 40, height: 30 }, // Larger size
  },
  MULTI_BALL: {
    effect: "multiBall",
    duration: 0,
    icon: "●●●",
    size: { width: 40, height: 30 },
  },
  SLOW_BALL: {
    effect: "slowBall",
    duration: 20000,
    icon: "⏱",
    size: { width: 40, height: 30 },
  },
  LASER_PADDLE: {
    effect: "laserPaddle",
    duration: 15000,
    icon: "⚡",
    size: { width: 40, height: 30 },
  },
};

/**
 * PowerUp System Manager
 * @class PowerUpSystem
 * @description Manages power-up creation, rendering, and effects
 */
class PowerUpSystem {
  constructor() {
    this.powerUps = [];
    this.activePowerUps = [];
  }

  /**
   * Drop a power-up at specified location
   */
  dropPowerUp(x, y) {
    const powerUpTypes = Object.keys(POWER_UP_TYPES);
    const randomType =
      powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
    const powerUpData = POWER_UP_TYPES[randomType];
    const colors = themeManager.getColors().powerUps;

    const powerUp = {
      x: x - powerUpData.size.width / 2,
      y: y,
      width: powerUpData.size.width,
      height: powerUpData.size.height,
      velocityY: 2,
      type: randomType,
      color: colors[powerUpData.effect] || colors.widePaddle,
      icon: powerUpData.icon,
    };

    this.powerUps.push(powerUp);
  }

  /**
   * Update power-up positions and check collisions
   */
  update() {
    // Update falling power-ups
    for (let i = this.powerUps.length - 1; i >= 0; i--) {
      const powerUp = this.powerUps[i];
      powerUp.y += powerUp.velocityY;

      if (powerUp.y > canvas.height) {
        this.powerUps.splice(i, 1);
        continue;
      }

      // Check collision with paddle
      if (
        powerUp.y + powerUp.height >= paddle.y &&
        powerUp.y <= paddle.y + paddle.height &&
        powerUp.x + powerUp.width >= paddle.x &&
        powerUp.x <= paddle.x + paddle.width
      ) {
        this.activatePowerUp(powerUp.type);
        this.powerUps.splice(i, 1);

        // Play power-up collection sound
        if (window.soundManager) {
          soundManager.play("powerUpCollect");
        }
      }
    }

    // Update active power-ups (check for expiration)
    for (let i = this.activePowerUps.length - 1; i >= 0; i--) {
      const activePowerUp = this.activePowerUps[i];
      if (Date.now() - activePowerUp.startTime > activePowerUp.duration) {
        this.deactivatePowerUp(activePowerUp);
        this.activePowerUps.splice(i, 1);
      }
    }
  }

  /**
   * Activate a power-up effect
   */
  activatePowerUp(type) {
    const powerUpData = POWER_UP_TYPES[type];
    const colors = themeManager.getColors();

    switch (powerUpData.effect) {
      case "widePaddle":
        paddle.width = 150;
        paddle.color = colors.powerUps.widePaddle;
        this.activePowerUps.push({
          type: type,
          effect: powerUpData.effect,
          duration: powerUpData.duration,
          startTime: Date.now(),
        });
        break;

      case "multiBall":
        const newBall1 = new Ball(ball.x, ball.y, ball.radius, false); // Split ball
        newBall1.velocityX = ball.velocityX + 2;
        newBall1.velocityY = ball.velocityY;
        newBall1.speed = ball.speed;

        const newBall2 = new Ball(ball.x, ball.y, ball.radius, false); // Split ball
        newBall2.velocityX = ball.velocityX - 2;
        newBall2.velocityY = ball.velocityY;
        newBall2.speed = ball.speed;

        balls.push(newBall1, newBall2);

        // Play ball split sound
        if (window.soundManager) {
          soundManager.play("ballSplit");
        }
        break;

      case "slowBall":
        for (let ballObj of balls) {
          ballObj.speed *= 0.7;
          ballObj.velocityX *= 0.7;
          ballObj.velocityY *= 0.7;
        }
        ball.speed *= 0.7;
        ball.velocityX *= 0.7;
        ball.velocityY *= 0.7;
        this.activePowerUps.push({
          type: type,
          effect: powerUpData.effect,
          duration: powerUpData.duration,
          startTime: Date.now(),
        });
        break;

      case "laserPaddle":
        paddle.hasLaser = true;
        paddle.color = colors.powerUps.laser || "#FFD700";
        this.activePowerUps.push({
          type: type,
          effect: powerUpData.effect,
          duration: powerUpData.duration,
          startTime: Date.now(),
        });
        break;
    }
  }

  /**
   * Deactivate a power-up effect
   */
  deactivatePowerUp(activePowerUp) {
    switch (activePowerUp.effect) {
      case "widePaddle":
        paddle.reset();
        break;
      case "slowBall":
        ball.speed /= 0.7;
        ball.velocityX /= 0.7;
        ball.velocityY /= 0.7;
        break;
      case "laserPaddle":
        paddle.hasLaser = false;
        paddle.reset();
        break;
    }
  }

  /**
   * Enhanced power-up rendering with centered icons and glow
   */
  render(ctx) {
    const effects = themeManager.getEffects();

    // Render falling power-ups
    for (let powerUp of this.powerUps) {
      // Draw power-up with glow effect
      ctx.fillStyle = powerUp.color;
      this.drawRoundedRect(
        ctx,
        powerUp.x,
        powerUp.y,
        powerUp.width,
        powerUp.height,
        6
      );

      // Professional glow animation
      if (effects.shadowBlur > 0) {
        ctx.shadowColor = powerUp.color;
        ctx.shadowBlur = 12 + Math.sin(Date.now() * 0.005) * 4;
        this.drawRoundedRect(
          ctx,
          powerUp.x,
          powerUp.y,
          powerUp.width,
          powerUp.height,
          6
        );
        ctx.shadowBlur = 0;
      }

      // Perfectly centered icon
      ctx.fillStyle =
        themeManager.currentTheme.name === "Minimalist" ? "#2D3748" : "#000000";
      ctx.font = 'bold 16px "Segoe UI"';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        powerUp.icon,
        powerUp.x + powerUp.width / 2,
        powerUp.y + powerUp.height / 2
      );
    }

    // Active power-up indicators
    let yOffset = 10;
    for (let activePowerUp of this.activePowerUps) {
      const timeLeft = Math.max(
        0,
        activePowerUp.duration - (Date.now() - activePowerUp.startTime)
      );
      const seconds = Math.ceil(timeLeft / 1000);

      const indicatorColor =
        themeManager.currentTheme.name === "Minimalist"
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(139, 92, 246, 0.9)";

      ctx.fillStyle = indicatorColor;
      this.drawRoundedRect(ctx, 10, yOffset, 140, 28, 6);

      ctx.fillStyle =
        themeManager.currentTheme.name === "Minimalist" ? "#2D3748" : "#F8FAFC";
      ctx.font = 'bold 12px "Segoe UI"';
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(`${activePowerUp.type}: ${seconds}s`, 18, yOffset + 14);

      yOffset += 35;
    }
  }

  drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  }

  clear() {
    this.powerUps = [];
    this.activePowerUps = [];
  }
}
