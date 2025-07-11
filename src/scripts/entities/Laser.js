/**
 * Laser Entity for Laser Paddle Power-up
 * @class Laser
 * @description Handles laser projectile physics, movement, and rendering
 */
class Laser {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 4;
    this.height = 15;
    this.speed = 8;
    this.color = themeManager.getColors().powerUps.laser || "#FFD700";
    this.active = true;
  }

  /**
   * Update laser position and check boundaries
   */
  update() {
    this.y -= this.speed;

    // Remove laser if it goes off screen
    if (this.y + this.height < 0) {
      this.active = false;
    }
  }

  /**
   * Check collision with a brick
   * @param {Object} brick - Brick object to check collision with
   * @returns {boolean} - True if collision detected
   */
  checkBrickCollision(brick) {
    if (brick.destroyed) return false;

    return (
      this.x < brick.x + brick.width &&
      this.x + this.width > brick.x &&
      this.y < brick.y + brick.height &&
      this.y + this.height > brick.y
    );
  }

  /**
   * Professional laser rendering with glow effects
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  render(ctx) {
    const effects = themeManager.getEffects();

    // Draw laser beam
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Add glow effect
    if (effects.shadowBlur > 0) {
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.shadowBlur = 0;
    }

    // Add laser trail effect
    const gradient = ctx.createLinearGradient(
      this.x,
      this.y,
      this.x,
      this.y + this.height
    );
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, "rgba(255, 215, 0, 0.3)");

    ctx.fillStyle = gradient;
    ctx.fillRect(this.x - 1, this.y, this.width + 2, this.height);
  }
}

/**
 * Laser Manager for handling multiple laser projectiles
 * @class LaserManager
 * @description Manages laser creation, updates, and collisions
 */
class LaserManager {
  constructor() {
    this.lasers = [];
  }

  /**
   * Create a new laser from paddle position
   * @param {number} paddleX - Paddle X position
   * @param {number} paddleY - Paddle Y position
   * @param {number} paddleWidth - Paddle width
   */
  createLaser(paddleX, paddleY, paddleWidth) {
    // Create laser from center of paddle
    const laserX = paddleX + paddleWidth / 2 - 2;
    const laserY = paddleY - 15;

    this.lasers.push(new Laser(laserX, laserY));
  }

  /**
   * Update all active lasers
   */
  update() {
    // Update laser positions and remove inactive ones
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const laser = this.lasers[i];
      laser.update();

      if (!laser.active) {
        this.lasers.splice(i, 1);
      }
    }
  }

  /**
   * Check laser collisions with bricks
   * @param {Array} bricks - Array of brick objects
   * @returns {Object} - Collision results with hit bricks and lasers to remove
   */
  checkBrickCollisions(bricks) {
    const collisions = [];

    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const laser = this.lasers[i];

      for (let j = 0; j < bricks.length; j++) {
        const brick = bricks[j];

        if (laser.checkBrickCollision(brick)) {
          collisions.push({
            laser: laser,
            laserIndex: i,
            brick: brick,
            brickIndex: j,
          });

          // Remove laser after collision
          this.lasers.splice(i, 1);
          break;
        }
      }
    }

    return collisions;
  }

  /**
   * Render all active lasers
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  render(ctx) {
    for (let laser of this.lasers) {
      laser.render(ctx);
    }
  }

  /**
   * Clear all lasers
   */
  clear() {
    this.lasers = [];
  }

  /**
   * Get number of active lasers
   * @returns {number} - Number of active lasers
   */
  getActiveCount() {
    return this.lasers.length;
  }
}
