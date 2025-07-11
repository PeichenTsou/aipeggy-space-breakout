/**
 * Enhanced AI Assistant with improved algorithms
 * @class AIAssistant
 * @description Provides intelligent assistance based on player performance
 */
class AIAssistant {
  constructor() {
    this.metrics = {
      ballsLost: 0,
      bricksHit: 0,
      totalBallBounces: 0,
      paddleHits: 0,
      missedBalls: 0,
      timeSpentOnLevel: 0,
      consecutiveDeaths: 0,
      averageRallyLength: 0,
      sessionStartTime: Date.now(),
      lastMetricsUpdate: Date.now(),
    };

    this.assistanceLevels = {
      NO_HELP: "no_help",
      SUBTLE_HELP: "subtle_help",
      ACTIVE_HELP: "active_help",
    };

    this.currentAssistanceLevel = this.assistanceLevels.NO_HELP;
    this.lastAssistanceCheck = Date.now();
  }

  updateMetrics() {
    const now = Date.now();
    this.metrics.timeSpentOnLevel = now - this.metrics.sessionStartTime;

    if (now - this.lastAssistanceCheck > 30000) {
      this.analyzePerformanceAndAdjustAssistance();
      this.lastAssistanceCheck = now;
    }
  }

  analyzePerformanceAndAdjustAssistance() {
    const hitAccuracy =
      this.metrics.totalBallBounces > 0
        ? (this.metrics.bricksHit / this.metrics.totalBallBounces) * 100
        : 0;

    const paddleEfficiency =
      this.metrics.paddleHits + this.metrics.missedBalls > 0
        ? (this.metrics.paddleHits /
            (this.metrics.paddleHits + this.metrics.missedBalls)) *
          100
        : 100;

    const averageAccuracy = (hitAccuracy + paddleEfficiency) / 2;

    let newAssistanceLevel;
    if (averageAccuracy > 60 || this.metrics.consecutiveDeaths === 0) {
      newAssistanceLevel = this.assistanceLevels.NO_HELP;
    } else if (averageAccuracy >= 30 && this.metrics.consecutiveDeaths < 3) {
      newAssistanceLevel = this.assistanceLevels.SUBTLE_HELP;
    } else {
      newAssistanceLevel = this.assistanceLevels.ACTIVE_HELP;
    }

    if (newAssistanceLevel !== this.currentAssistanceLevel) {
      this.currentAssistanceLevel = newAssistanceLevel;
      console.log(`AI Assistance Level: ${this.currentAssistanceLevel}`);
    }
  }

  applyAssistance(ball) {
    if (this.currentAssistanceLevel === this.assistanceLevels.NO_HELP) {
      return;
    }

    if (
      this.currentAssistanceLevel === this.assistanceLevels.SUBTLE_HELP ||
      this.currentAssistanceLevel === this.assistanceLevels.ACTIVE_HELP
    ) {
      const distanceToPaddle = Math.abs(ball.x - (paddle.x + paddle.width / 2));
      const ballToPaddleY = paddle.y - ball.y;

      if (ballToPaddleY < 100 && ballToPaddleY > 0 && distanceToPaddle < 50) {
        const magnetStrength =
          this.currentAssistanceLevel === this.assistanceLevels.ACTIVE_HELP
            ? 0.3
            : 0.1;
        const paddleCenter = paddle.x + paddle.width / 2;

        if (ball.x < paddleCenter) {
          ball.velocityX += magnetStrength;
        } else {
          ball.velocityX -= magnetStrength;
        }
      }
    }
  }

  getAdjustedPowerUpChance() {
    let baseChance = 0.3; // Increased from 0.15 to 0.3 (30%)
    if (this.currentAssistanceLevel === this.assistanceLevels.SUBTLE_HELP) {
      baseChance = 0.35; // Increased from 0.2 to 0.35 (35%)
    } else if (
      this.currentAssistanceLevel === this.assistanceLevels.ACTIVE_HELP
    ) {
      baseChance = 0.4; // Increased from 0.25 to 0.4 (40%)
    }
    return baseChance;
  }

  reset() {
    this.metrics = {
      ballsLost: 0,
      bricksHit: 0,
      totalBallBounces: 0,
      paddleHits: 0,
      missedBalls: 0,
      timeSpentOnLevel: 0,
      consecutiveDeaths: 0,
      averageRallyLength: 0,
      sessionStartTime: Date.now(),
      lastMetricsUpdate: Date.now(),
    };
    this.currentAssistanceLevel = this.assistanceLevels.NO_HELP;
    this.lastAssistanceCheck = Date.now();
  }
}
