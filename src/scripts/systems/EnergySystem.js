/**
 * Energy System for powerful beam attacks
 * @class EnergySystem
 * @description Manages energy accumulation and beam attack mechanics
 */
class EnergySystem {
  constructor() {
    this.maxEnergy = 100;
    this.currentEnergy = 0;
    this.energyGainRate = {
      RED: 5, // Basic bricks give less energy
      ORANGE: 8,
      YELLOW: 12, // Stronger bricks give more energy
      GREEN: 15,
      BOMB: 25, // Bomb bricks give bonus energy
    };
    this.beamActive = false;
    this.beamDuration = 2000; // 2 seconds
    this.beamStartTime = 0;
    this.beamCooldown = 5000; // 5 second cooldown
    this.lastBeamTime = 0;
    this.beamWidth = 60;
    this.beamParticles = [];
  }

  /**
   * Add energy when bricks are destroyed
   */
  addEnergy(brickType, amount = null) {
    if (this.currentEnergy >= this.maxEnergy) return;

    const energyGain = amount || this.energyGainRate[brickType] || 5;
    this.currentEnergy = Math.min(
      this.maxEnergy,
      this.currentEnergy + energyGain
    );

    // Create energy gain particle effect
    if (particleSystem) {
      particleSystem.createEnergyGain(
        paddle.x + paddle.width / 2,
        paddle.y - 20,
        energyGain
      );
    }
  }

  /**
   * Check if beam attack is available
   */
  canUseBeam() {
    return (
      this.currentEnergy >= this.maxEnergy &&
      !this.beamActive &&
      Date.now() - this.lastBeamTime > this.beamCooldown
    );
  }

  /**
   * Activate the powerful beam attack
   */
  activateBeam() {
    if (!this.canUseBeam()) return false;

    this.beamActive = true;
    this.beamStartTime = Date.now();
    this.currentEnergy = 0; // Consume all energy
    this.lastBeamTime = Date.now();

    // Create dramatic beam particles
    this.createBeamParticles();

    // Screen shake effect
    if (typeof canvas !== "undefined") {
      this.createScreenShake();
    }

    return true;
  }

  /**
   * Create spectacular beam particle effects
   */
  createBeamParticles() {
    const beamX = paddle.x + paddle.width / 2;
    const beamY = paddle.y;

    // Create beam core particles
    for (let i = 0; i < 50; i++) {
      this.beamParticles.push({
        x: beamX + (Math.random() - 0.5) * this.beamWidth,
        y: beamY - Math.random() * canvas.height,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: -Math.random() * 15 - 10,
        life: 1.0,
        decay: 0.02,
        size: Math.random() * 8 + 4,
        color:
          themeManager.currentTheme.name === "Minimalist"
            ? "#FF6B35"
            : "#FFD700",
        isBeam: true,
      });
    }
  }

  /**
   * Create screen shake effect for impact
   */
  createScreenShake() {
    // This would be implemented with canvas transform if needed
    // For now, we'll use particle effects to simulate impact
  }

  /**
   * Check beam collisions with bricks
   */
  checkBeamCollisions() {
    if (!this.beamActive) return [];

    const beamX = paddle.x + paddle.width / 2;
    const beamLeft = beamX - this.beamWidth / 2;
    const beamRight = beamX + this.beamWidth / 2;
    const hitBricks = [];

    for (let brick of bricks) {
      if (brick.destroyed) continue;

      // Check if brick is within beam width
      if (brick.x + brick.width >= beamLeft && brick.x <= beamRight) {
        hitBricks.push(brick);

        // Create spectacular destruction effect
        particleSystem.createBeamExplosion(
          brick.x + brick.width / 2,
          brick.y + brick.height / 2,
          brick.color
        );
      }
    }

    return hitBricks;
  }

  /**
   * Update energy system
   */
  update() {
    // Update beam state
    if (this.beamActive) {
      if (Date.now() - this.beamStartTime > this.beamDuration) {
        this.beamActive = false;
        this.beamParticles = [];
      }
    }

    // Update beam particles
    for (let i = this.beamParticles.length - 1; i >= 0; i--) {
      const particle = this.beamParticles[i];

      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.life -= particle.decay;

      if (particle.life <= 0) {
        this.beamParticles.splice(i, 1);
      }
    }
  }

  /**
   * Render energy bar and beam effects
   */
  render(ctx) {
    this.renderEnergyBar(ctx);
    this.renderBeamEffects(ctx);
  }

  /**
   * Render the energy bar UI
   */
  renderEnergyBar(ctx) {
    const barWidth = 200;
    const barHeight = 20;
    const barX = canvas.width - barWidth - 20;
    const barY = 20;

    // Background
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(barX - 5, barY - 5, barWidth + 10, barHeight + 10);

    // Energy bar background
    ctx.fillStyle =
      themeManager.currentTheme.name === "Minimalist" ? "#E2E8F0" : "#2D3748";
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // Energy fill
    const fillWidth = (this.currentEnergy / this.maxEnergy) * barWidth;
    const gradient = ctx.createLinearGradient(
      barX,
      barY,
      barX + fillWidth,
      barY
    );

    if (this.currentEnergy >= this.maxEnergy) {
      // Full energy - pulsing gold effect
      const pulse = 0.8 + 0.2 * Math.sin(Date.now() * 0.01);
      gradient.addColorStop(0, `rgba(255, 215, 0, ${pulse})`);
      gradient.addColorStop(1, `rgba(255, 140, 0, ${pulse})`);
    } else {
      // Building energy - blue to cyan gradient
      gradient.addColorStop(
        0,
        themeManager.currentTheme.name === "Minimalist" ? "#3182CE" : "#00BFFF"
      );
      gradient.addColorStop(
        1,
        themeManager.currentTheme.name === "Minimalist" ? "#63B3ED" : "#87CEEB"
      );
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(barX, barY, fillWidth, barHeight);

    // Energy bar border
    ctx.strokeStyle =
      themeManager.currentTheme.name === "Minimalist" ? "#2D3748" : "#F8FAFC";
    ctx.lineWidth = 2;
    ctx.strokeRect(barX, barY, barWidth, barHeight);

    // Energy text
    ctx.fillStyle =
      themeManager.currentTheme.name === "Minimalist" ? "#2D3748" : "#F8FAFC";
    ctx.font = 'bold 14px "Segoe UI"';
    ctx.textAlign = "center";
    ctx.fillText("ENERGY", barX + barWidth / 2, barY - 10);

    // Ready indicator
    if (this.canUseBeam()) {
      ctx.fillStyle = "#FFD700";
      ctx.font = 'bold 12px "Segoe UI"';
      ctx.fillText(
        "BEAM READY! Press B",
        barX + barWidth / 2,
        barY + barHeight + 20
      );
    }

    // Cooldown indicator
    if (!this.canUseBeam() && this.currentEnergy >= this.maxEnergy) {
      const cooldownRemaining = Math.max(
        0,
        this.beamCooldown - (Date.now() - this.lastBeamTime)
      );
      const seconds = Math.ceil(cooldownRemaining / 1000);
      ctx.fillStyle = "#FF6B6B";
      ctx.font = 'bold 12px "Segoe UI"';
      ctx.fillText(
        `Cooldown: ${seconds}s`,
        barX + barWidth / 2,
        barY + barHeight + 20
      );
    }
  }

  /**
   * Render beam attack effects
   */
  renderBeamEffects(ctx) {
    if (!this.beamActive) return;

    const beamX = paddle.x + paddle.width / 2;
    const beamY = paddle.y;

    // Main beam
    const gradient = ctx.createLinearGradient(
      beamX - this.beamWidth / 2,
      beamY,
      beamX + this.beamWidth / 2,
      beamY
    );
    gradient.addColorStop(0, "rgba(255, 215, 0, 0.1)");
    gradient.addColorStop(0.5, "rgba(255, 215, 0, 0.8)");
    gradient.addColorStop(1, "rgba(255, 215, 0, 0.1)");

    ctx.fillStyle = gradient;
    ctx.fillRect(beamX - this.beamWidth / 2, 0, this.beamWidth, beamY);

    // Beam particles
    for (let particle of this.beamParticles) {
      ctx.save();
      ctx.globalAlpha = particle.life;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /**
   * Reset energy system
   */
  reset() {
    this.currentEnergy = 0;
    this.beamActive = false;
    this.beamParticles = [];
    this.lastBeamTime = 0;
  }
}
