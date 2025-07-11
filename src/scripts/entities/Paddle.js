/**
 * Professional Paddle Entity with enhanced rendering
 * @class Paddle
 * @description Handles paddle movement, rendering, and collision detection
 */
class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 8;
    this.color = themeManager.getColors().paddle;
    this.originalWidth = width;
    this.hasLaser = false;
    this.lastLaserTime = 0;
    this.laserCooldown = 200; // 200ms between laser shots
  }

  update(keys, mouseX) {
    // Keyboard controls with smooth movement
    if (keys["ArrowLeft"]) {
      this.x -= this.speed;
    }
    if (keys["ArrowRight"]) {
      this.x += this.speed;
    }

    // Apply boundary constraints for keyboard movement
    this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));

    // Enhanced mouse controls
    if (mouseX > 0 && mouseX < canvas.width) {
      this.x = mouseX - this.width / 2;
      this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
    }
  }

  /**
   * Professional rendering with rounded corners and effects
   */
  render(ctx) {
    const effects = themeManager.getEffects();

    // Draw rounded paddle
    ctx.fillStyle = this.color;
    this.drawRoundedRect(ctx, this.x, this.y, this.width, this.height, 6);

    // Add professional glow effect
    if (effects.shadowBlur > 0) {
      ctx.shadowColor = this.color;
      ctx.shadowBlur = effects.shadowBlur;
      this.drawRoundedRect(ctx, this.x, this.y, this.width, this.height, 6);
      ctx.shadowBlur = 0;
    }
  }

  /**
   * Draw rounded rectangle helper
   */
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

  reset() {
    this.width = this.originalWidth;
    this.color = themeManager.getColors().paddle;
  }
}
