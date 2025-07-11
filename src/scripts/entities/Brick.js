/**
 * Professional brick configuration with enhanced design
 */
const BRICK_TYPES = {
  RED: { hits: 1, points: 10 },
  ORANGE: { hits: 1, points: 20 },
  YELLOW: { hits: 2, points: 30 },
  GREEN: { hits: 2, points: 40 },
};

const BRICK_CONFIG = {
  rows: 6,
  cols: 9, // Reduced for better proportions
  width: 90, // Wider bricks (was 75)
  height: 28, // Taller bricks (was 20)
  padding: 8, // Better spacing (was 5)
  offsetX: 15, // Centered positioning
  offsetY: 60,
  borderRadius: 8, // Professional rounded corners
};

/**
 * Brick utility functions for game management
 */
class BrickManager {
  /**
   * Generate professional brick layout with rounded corners
   */
  static generateBricks() {
    const bricks = [];
    const colors = themeManager.getColors().bricks;

    for (let row = 0; row < BRICK_CONFIG.rows; row++) {
      for (let col = 0; col < BRICK_CONFIG.cols; col++) {
        let brickType, color;
        if (row < 2) {
          brickType = BRICK_TYPES.RED;
          color = colors.red;
        } else if (row < 4) {
          brickType = BRICK_TYPES.ORANGE;
          color = colors.orange;
        } else if (row < 5) {
          brickType = BRICK_TYPES.YELLOW;
          color = colors.yellow;
        } else {
          brickType = BRICK_TYPES.GREEN;
          color = colors.green;
        }

        if (level > 1 && Math.random() < 0.3) {
          const typeKeys = Object.keys(BRICK_TYPES);
          const randomKey =
            typeKeys[Math.floor(Math.random() * typeKeys.length)];
          brickType = BRICK_TYPES[randomKey];
          color = colors[randomKey.toLowerCase()];
        }

        const brick = {
          x:
            BRICK_CONFIG.offsetX +
            col * (BRICK_CONFIG.width + BRICK_CONFIG.padding),
          y:
            BRICK_CONFIG.offsetY +
            row * (BRICK_CONFIG.height + BRICK_CONFIG.padding),
          width: BRICK_CONFIG.width,
          height: BRICK_CONFIG.height,
          maxHits: brickType.hits,
          hits: brickType.hits,
          points: brickType.points,
          color: color,
          destroyed: false,
        };

        bricks.push(brick);
      }
    }

    return bricks;
  }

  /**
   * Professional rendering with rounded bricks
   */
  static renderBricks(ctx, bricks) {
    const effects = themeManager.getEffects();

    for (let brick of bricks) {
      if (brick.destroyed) continue;

      // Draw rounded brick
      ctx.fillStyle = brick.color;
      BrickManager.drawRoundedRect(
        ctx,
        brick.x,
        brick.y,
        brick.width,
        brick.height,
        BRICK_CONFIG.borderRadius
      );

      // Professional border
      ctx.strokeStyle =
        themeManager.currentTheme.name === "Minimalist"
          ? "#e2e8f0"
          : "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 1;
      BrickManager.strokeRoundedRect(
        ctx,
        brick.x,
        brick.y,
        brick.width,
        brick.height,
        BRICK_CONFIG.borderRadius
      );

      // Enhanced glow for damaged bricks
      if (brick.hits < brick.maxHits && effects.shadowBlur > 0) {
        ctx.shadowColor = brick.color;
        ctx.shadowBlur = 8;
        BrickManager.drawRoundedRect(
          ctx,
          brick.x,
          brick.y,
          brick.width,
          brick.height,
          BRICK_CONFIG.borderRadius
        );
        ctx.shadowBlur = 0;
      }
    }
  }

  static drawRoundedRect(ctx, x, y, width, height, radius) {
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

  static strokeRoundedRect(ctx, x, y, width, height, radius) {
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
    ctx.stroke();
  }
}
