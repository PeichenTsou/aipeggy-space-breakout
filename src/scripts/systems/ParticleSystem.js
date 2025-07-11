/**
 * Enhanced Particle System with professional effects
 * @class ParticleSystem
 * @description Manages visual particle effects for explosions and score displays
 */
class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  createExplosion(x, y, color) {
    const effects = themeManager.getEffects();
    const particleCount = effects.particleCount;

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: x,
        y: y,
        velocityX: (Math.random() - 0.5) * 10,
        velocityY: (Math.random() - 0.5) * 10,
        life: 1.0,
        decay: 0.015,
        size: Math.random() * 5 + 2,
        color: color || themeManager.getColors().particles.explosion,
      });
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

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];

      particle.x += particle.velocityX;
      particle.y += particle.velocityY;

      if (!particle.isText) {
        particle.velocityY += 0.2;
      }

      particle.life -= particle.decay;

      if (particle.life <= 0) {
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
