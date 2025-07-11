/**
 * Enhanced Particle System with professional effects and performance optimization
 * @class ParticleSystem
 * @description Manages visual particle effects for explosions and score displays
 */
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.particlePool = [];
    this.maxParticles = 200; // Limit to prevent performance issues
    this.lastUpdate = Date.now();
    this.updateInterval = 16; // ~60fps update rate
  }

  /**
   * Get a particle from the pool or create a new one
   */
  getParticle() {
    if (this.particlePool.length > 0) {
      return this.particlePool.pop();
    }
    return {};
  }

  /**
   * Return a particle to the pool for reuse
   */
  returnParticle(particle) {
    if (this.particlePool.length < 50) {
      // Limit pool size
      this.particlePool.push(particle);
    }
  }

  createExplosion(x, y, color) {
    if (this.particles.length >= this.maxParticles) return; // Prevent overflow

    const effects = themeManager.getEffects();
    const particleCount = Math.min(
      effects.particleCount,
      this.maxParticles - this.particles.length
    );

    for (let i = 0; i < particleCount; i++) {
      const particle = this.getParticle();
      particle.x = x;
      particle.y = y;
      particle.velocityX = (Math.random() - 0.5) * 10;
      particle.velocityY = (Math.random() - 0.5) * 10;
      particle.life = 1.0;
      particle.decay = 0.015;
      particle.size = Math.random() * 5 + 2;
      particle.color = color || themeManager.getColors().particles.explosion;
      particle.isText = false;

      this.particles.push(particle);
    }
  }

  createSmallExplosion(x, y, color) {
    const effects = themeManager.getEffects();
    const particleCount = Math.max(3, effects.particleCount / 3);

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: x,
        y: y,
        velocityX: (Math.random() - 0.5) * 6,
        velocityY: (Math.random() - 0.5) * 6,
        life: 0.8,
        decay: 0.025,
        size: Math.random() * 3 + 1,
        color: color || themeManager.getColors().particles.explosion,
      });
    }
  }

  createFloatingScore(x, y, points) {
    this.particles.push({
      x: x,
      y: y,
      velocityX: 0,
      velocityY: -2,
      life: 1.0,
      decay: 0.012,
      size: 18,
      color: themeManager.getColors().particles.score,
      text: `+${points}`,
      isText: true,
    });
  }

  /**
   * Create energy gain particle effect
   */
  createEnergyGain(x, y, energyAmount) {
    if (this.particles.length >= this.maxParticles) return;

    for (let i = 0; i < 8; i++) {
      const particle = this.getParticle();
      particle.x = x + (Math.random() - 0.5) * 20;
      particle.y = y + (Math.random() - 0.5) * 10;
      particle.velocityX = (Math.random() - 0.5) * 4;
      particle.velocityY = -Math.random() * 3 - 2;
      particle.life = 1.0;
      particle.decay = 0.02;
      particle.size = Math.random() * 4 + 2;
      particle.color =
        themeManager.currentTheme.name === "Minimalist" ? "#3182CE" : "#00BFFF";
      particle.isText = false;

      this.particles.push(particle);
    }

    // Add floating energy text
    this.particles.push({
      x: x,
      y: y,
      velocityX: 0,
      velocityY: -1.5,
      life: 1.0,
      decay: 0.015,
      size: 14,
      color:
        themeManager.currentTheme.name === "Minimalist" ? "#3182CE" : "#00BFFF",
      text: `+${energyAmount} Energy`,
      isText: true,
    });
  }

  /**
   * Create spectacular beam explosion effect
   */
  createBeamExplosion(x, y, color) {
    if (this.particles.length >= this.maxParticles) return;

    const particleCount = Math.min(
      30,
      this.maxParticles - this.particles.length
    );

    for (let i = 0; i < particleCount; i++) {
      const particle = this.getParticle();
      particle.x = x;
      particle.y = y;
      particle.velocityX = (Math.random() - 0.5) * 15;
      particle.velocityY = (Math.random() - 0.5) * 15;
      particle.life = 1.0;
      particle.decay = 0.02;
      particle.size = Math.random() * 8 + 4;
      particle.color = color;
      particle.isText = false;

      this.particles.push(particle);
    }

    // Add some golden beam particles
    for (let i = 0; i < 15; i++) {
      const particle = this.getParticle();
      particle.x = x;
      particle.y = y;
      particle.velocityX = (Math.random() - 0.5) * 12;
      particle.velocityY = (Math.random() - 0.5) * 12;
      particle.life = 1.2;
      particle.decay = 0.015;
      particle.size = Math.random() * 6 + 3;
      particle.color = "#FFD700";
      particle.isText = false;

      this.particles.push(particle);
    }
  }

  /**
   * Create bomb explosion effects
   */
  createBombExplosion(x, y, type = "LINE") {
    if (this.particles.length >= this.maxParticles) return;

    const particleCount = Math.min(
      50,
      this.maxParticles - this.particles.length
    );

    for (let i = 0; i < particleCount; i++) {
      const particle = this.getParticle();
      particle.x = x + (Math.random() - 0.5) * 40;
      particle.y = y + (Math.random() - 0.5) * 40;

      if (type === "LINE") {
        // Cross explosion pattern
        if (Math.random() < 0.5) {
          particle.velocityX = (Math.random() - 0.5) * 20;
          particle.velocityY = (Math.random() - 0.5) * 4;
        } else {
          particle.velocityX = (Math.random() - 0.5) * 4;
          particle.velocityY = (Math.random() - 0.5) * 20;
        }
      } else {
        // Circular explosion pattern
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 15 + 5;
        particle.velocityX = Math.cos(angle) * speed;
        particle.velocityY = Math.sin(angle) * speed;
      }

      particle.life = 1.5;
      particle.decay = 0.012;
      particle.size = Math.random() * 10 + 5;
      particle.color = type === "LINE" ? "#FF4500" : "#FF6B35";
      particle.isText = false;

      this.particles.push(particle);
    }
  }

  update() {
    // Throttle updates for better performance
    const now = Date.now();
    if (now - this.lastUpdate < this.updateInterval) return;
    this.lastUpdate = now;

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];

      particle.x += particle.velocityX;
      particle.y += particle.velocityY;

      if (!particle.isText) {
        particle.velocityY += 0.2;
      }

      particle.life -= particle.decay;

      if (particle.life <= 0) {
        this.returnParticle(particle);
        this.particles.splice(i, 1);
      }
    }
  }

  render(ctx) {
    for (let particle of this.particles) {
      ctx.save();
      ctx.globalAlpha = particle.life;

      if (particle.isText) {
        ctx.fillStyle = particle.color;
        ctx.font = `${particle.size}px 'Segoe UI'`;
        ctx.textAlign = "center";
        ctx.fillText(particle.text, particle.x, particle.y);
      } else {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  clear() {
    this.particles = [];
  }
}
