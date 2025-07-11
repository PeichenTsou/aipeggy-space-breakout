/**
 * Enhanced Ball Entity with professional effects
 * @class Ball
 * @description Handles ball physics, movement, and rendering
 */
class Ball {
  constructor(x, y, radius, isMainBall = false) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = 0;
    this.velocityY = 0;
    this.speed = 6;
    this.isMainBall = isMainBall;
    this.ballType = isMainBall ? "main" : "split";

    // Set color based on ball type
    if (isMainBall) {
      this.color = themeManager.getColors().ball; // White/main color
    } else {
      this.color = themeManager.getColors().powerUps?.multiBall || "#FF69B4"; // Pink for split balls
    }
  }

  update() {
    if (gameState === GAME_STATES.BALL_ON_PADDLE) {
      this.x = paddle.x + paddle.width / 2;
      this.y = paddle.y - this.radius - 2;
      return;
    }

    if (gameState !== GAME_STATES.PLAYING) return;

    // Enhanced movement with smooth physics
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Wall collisions with improved physics
    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
      this.velocityX = -this.velocityX;
      this.x = Math.max(
        this.radius,
        Math.min(canvas.width - this.radius, this.x)
      );
    }

    if (this.y - this.radius <= 0) {
      this.velocityY = -this.velocityY;
      this.y = this.radius;
    }

    if (this.y > canvas.height) {
      return;
    }
  }

  launch() {
    const angle = (Math.random() - 0.5) * 0.5;
    this.velocityX = Math.sin(angle) * this.speed;
    this.velocityY = -Math.cos(angle) * this.speed;
  }

  /**
   * Professional ball rendering with glow effects
   */
  render(ctx) {
    const effects = themeManager.getEffects();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Enhanced glow effect for space theme
    if (effects.shadowBlur > 0) {
      ctx.shadowColor = this.color;
      ctx.shadowBlur = effects.glowIntensity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
}
