/**
 * Professional brick configuration with enhanced design
 */
const BRICK_TYPES = {
  RED: { hits: 1, points: 10 },
  ORANGE: { hits: 1, points: 20 },
  YELLOW: { hits: 2, points: 30 },
  GREEN: { hits: 2, points: 40 },
  BOMB_LINE: { hits: 1, points: 100 },
  BOMB_AREA: { hits: 1, points: 150 },
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
        let brickType,
          color,
          isBomb = false;

        // Determine base brick type
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

        // Add bomb bricks with low probability (5% chance)
        if (level > 1 && Math.random() < 0.05) {
          if (Math.random() < 0.5) {
            brickType = BRICK_TYPES.BOMB_LINE;
            color =
              themeManager.currentTheme.name === "Minimalist"
                ? "#FF4500"
                : "#FF6B35";
            isBomb = "LINE";
          } else {
            brickType = BRICK_TYPES.BOMB_AREA;
            color =
              themeManager.currentTheme.name === "Minimalist"
                ? "#FF6B35"
                : "#FF4500";
            isBomb = "AREA";
          }
        } else if (level > 1 && Math.random() < 0.3) {
          const normalTypes = ["RED", "ORANGE", "YELLOW", "GREEN"];
          const randomKey =
            normalTypes[Math.floor(Math.random() * normalTypes.length)];
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
          isBomb: isBomb,
          bombType: isBomb,
          row: row,
          col: col,
          shimmerTime: Math.random() * 1000, // For bomb animation
        };

        bricks.push(brick);
      }
    }

    return bricks;
  }

  /**
   * Professional rendering with rounded bricks and bomb effects
   */
  static renderBricks(ctx, bricks) {
    const effects = themeManager.getEffects();
    const currentTime = Date.now();

    for (let brick of bricks) {
      if (brick.destroyed) continue;

      // Special rendering for bomb bricks
      if (brick.isBomb) {
        BrickManager.renderBombBrick(ctx, brick, currentTime, effects);
      } else {
        // Draw normal rounded brick
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
  }

  /**
   * Render bomb bricks with special effects
   */
  static renderBombBrick(ctx, brick, currentTime, effects) {
    const shimmer =
      0.7 + 0.3 * Math.sin((currentTime + brick.shimmerTime) * 0.008);
    const pulse =
      0.9 + 0.1 * Math.sin((currentTime + brick.shimmerTime) * 0.012);

    // Pulsing glow effect
    if (effects.shadowBlur > 0) {
      ctx.shadowColor = brick.color;
      ctx.shadowBlur = 15 * pulse;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    // Draw bomb brick with shimmer effect
    ctx.fillStyle = brick.color;
    ctx.globalAlpha = shimmer;
    BrickManager.drawRoundedRect(
      ctx,
      brick.x,
      brick.y,
      brick.width,
      brick.height,
      BRICK_CONFIG.borderRadius
    );
    ctx.globalAlpha = 1.0;
    ctx.shadowBlur = 0;

    // Special border for bomb bricks
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2 * pulse;
    BrickManager.strokeRoundedRect(
      ctx,
      brick.x,
      brick.y,
      brick.width,
      brick.height,
      BRICK_CONFIG.borderRadius
    );

    // Draw bomb icon
    ctx.fillStyle = "#FFD700";
    ctx.font = 'bold 16px "Segoe UI"';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const iconX = brick.x + brick.width / 2;
    const iconY = brick.y + brick.height / 2;

    if (brick.bombType === "LINE") {
      // Cross icon for line bomb
      ctx.fillText("✚", iconX, iconY);
    } else {
      // Explosion icon for area bomb
      ctx.fillText("💥", iconX, iconY);
    }
  }

  /**
   * Handle bomb explosion logic
   */
  static explodeBomb(bombBrick, allBricks) {
    const destroyedBricks = [];

    if (bombBrick.bombType === "LINE") {
      // Destroy all bricks in same row and column
      for (let brick of allBricks) {
        if (brick.destroyed) continue;
        if (brick.row === bombBrick.row || brick.col === bombBrick.col) {
          brick.destroyed = true;
          destroyedBricks.push(brick);
        }
      }
    } else if (bombBrick.bombType === "AREA") {
      // Destroy bricks in circular area
      const bombCenterX = bombBrick.x + bombBrick.width / 2;
      const bombCenterY = bombBrick.y + bombBrick.height / 2;
      const explosionRadius = 120;

      for (let brick of allBricks) {
        if (brick.destroyed) continue;
        const brickCenterX = brick.x + brick.width / 2;
        const brickCenterY = brick.y + brick.height / 2;
        const distance = Math.sqrt(
          Math.pow(brickCenterX - bombCenterX, 2) +
            Math.pow(brickCenterY - bombCenterY, 2)
        );

        if (distance <= explosionRadius) {
          brick.destroyed = true;
          destroyedBricks.push(brick);
        }
      }
    }

    return destroyedBricks;
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
