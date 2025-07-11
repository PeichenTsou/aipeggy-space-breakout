# AIPeggy - Technical Architecture Documentation

## 🏗️ System Architecture Overview

AIPeggy is built using a modern, modular architecture within a single HTML file constraint. The system follows object-oriented design principles with clear separation of concerns and professional code organization.

### Core Architecture Principles

- **Single Responsibility**: Each class handles one specific aspect of the game
- **Modular Design**: Clear separation between game systems
- **Event-Driven**: Input and game state changes drive system updates
- **Performance-First**: Optimized for 60fps gameplay
- **Theme-Agnostic**: Visual themes don't affect core game logic

## 🎨 Theme System Architecture

### ThemeManager Class

The theme system is built around a centralized `ThemeManager` that handles all visual transitions and color management.

```javascript
class ThemeManager {
  constructor() {
    this.currentTheme = THEMES.CYBERPUNK;
    this.themeKeys = Object.keys(THEMES);
    this.currentIndex = 0;
  }
}
```

#### Theme Configuration Structure

```javascript
const THEMES = {
    THEME_NAME: {
        name: 'Display Name',
        className: 'css-class-name',
        colors: {
            paddle: '#color',
            ball: '#color',
            bricks: { red: '#color', orange: '#color', ... },
            powerUps: { widePaddle: '#color', ... },
            particles: { explosion: '#color', score: '#color' }
        },
        effects: {
            glowIntensity: number,
            particleCount: number,
            shadowBlur: number
        }
    }
}
```

#### Theme Switching Process

1. **Input Detection**: 'T' key press captured by event listener
2. **Index Cycling**: `currentIndex = (currentIndex + 1) % themeKeys.length`
3. **Theme Application**: CSS classes updated, colors propagated
4. **Visual Transition**: 0.5s CSS transition for smooth change
5. **Game Object Updates**: All entities receive new color values

### CSS Theme Implementation

Each theme uses CSS classes with smooth transitions:

```css
body.theme-cyberpunk {
  /* Cyberpunk styles */
}
body.theme-minimalist {
  /* Minimalist styles */
}
body.theme-space {
  /* Space styles */
}
```

## 🎮 Game Core Systems

### Entity-Component Architecture

#### Paddle Class

```javascript
class Paddle {
  constructor(x, y, width, height) {
    // Position and size properties
    // Movement and rendering methods
    // Theme-aware color updates
  }
}
```

**Responsibilities:**

- Position management and boundary checking
- Input processing (keyboard and mouse)
- Theme-appropriate rendering with effects
- Power-up state management (width changes)

#### Ball Class

```javascript
class Ball {
  constructor(x, y, radius) {
    // Physics properties (position, velocity, speed)
    // Collision detection methods
    // Theme-aware rendering
  }
}
```

**Responsibilities:**

- Physics simulation (position, velocity)
- Wall collision detection and response
- Theme-appropriate visual effects
- Launch mechanics and angle calculation

### Game State Management

#### State Machine Pattern

```javascript
const GAME_STATES = {
  PLAYING: "playing",
  BALL_ON_PADDLE: "ball_on_paddle",
  GAME_OVER: "game_over",
  LEVEL_COMPLETE: "level_complete",
  PAUSED: "paused",
};
```

**State Transitions:**

- `BALL_ON_PADDLE` → `PLAYING` (ball launch)
- `PLAYING` → `BALL_ON_PADDLE` (life lost)
- `PLAYING` → `GAME_OVER` (no lives remaining)
- `PLAYING` → `LEVEL_COMPLETE` (all bricks destroyed)
- Any state ↔ `PAUSED` (pause toggle)

## 🤖 AI Assistance System

### Performance Tracking Architecture

The AI system uses continuous performance monitoring to adjust assistance levels dynamically.

#### AIAssistant Class Structure

```javascript
class AIAssistant {
  constructor() {
    this.metrics = {
      ballsLost: 0,
      bricksHit: 0,
      totalBallBounces: 0,
      paddleHits: 0,
      missedBalls: 0,
      consecutiveDeaths: 0,
      // ... additional metrics
    };

    this.assistanceLevels = {
      NO_HELP: "no_help",
      SUBTLE_HELP: "subtle_help",
      ACTIVE_HELP: "active_help",
    };
  }
}
```

#### Performance Analysis Algorithm

```javascript
analyzePerformanceAndAdjustAssistance() {
    const hitAccuracy = (this.metrics.bricksHit / this.metrics.totalBallBounces) * 100;
    const paddleEfficiency = (this.metrics.paddleHits /
        (this.metrics.paddleHits + this.metrics.missedBalls)) * 100;
    const averageAccuracy = (hitAccuracy + paddleEfficiency) / 2;

    // Determine assistance level based on performance thresholds
    if (averageAccuracy > 60 || this.metrics.consecutiveDeaths === 0) {
        newAssistanceLevel = this.assistanceLevels.NO_HELP;
    } else if (averageAccuracy >= 30 && this.metrics.consecutiveDeaths < 3) {
        newAssistanceLevel = this.assistanceLevels.SUBTLE_HELP;
    } else {
        newAssistanceLevel = this.assistanceLevels.ACTIVE_HELP;
    }
}
```

#### Assistance Implementation

**Subtle Help:**

- Ball magnetism: `ball.velocityX += magnetStrength * direction`
- Strength: 0.1 units when ball is within 50px of paddle
- Activation zone: 100px above paddle

**Active Help:**

- Enhanced magnetism: 0.3 units strength
- Expanded paddle collision area: +20px effective width
- Increased power-up drop rate: 25% vs 15% base

### AI Philosophy & Design

- **Invisible Assistance**: Players shouldn't notice AI intervention
- **Performance-Based**: Adjustments based on actual skill metrics
- **Preserving Agency**: Player maintains full control
- **Gradual Scaling**: Smooth transitions between assistance levels

## 💫 Particle System Architecture

### ParticleSystem Class

```javascript
class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  createExplosion(x, y, color) {
    // Theme-aware particle generation
    const effects = themeManager.getEffects();
    const particleCount = effects.particleCount;
    // Create particles with theme-specific properties
  }
}
```

#### Particle Types

**Explosion Particles:**

- Physics: Velocity-based movement with gravity
- Lifecycle: 1.0 initial life, 0.02 decay rate
- Theme Integration: Count and intensity vary by theme

**Floating Score Text:**

- Movement: Vertical upward motion
- Rendering: Text-based particles with fade-out
- Theme Colors: Matches current theme's score color

**Small Explosions:**

- Usage: Damaged brick feedback
- Properties: Smaller size, faster decay
- Performance: Reduced particle count for efficiency

### Particle Lifecycle Management

1. **Creation**: Particles added to array with initial properties
2. **Update**: Position, velocity, and life updated each frame
3. **Physics**: Gravity applied to non-text particles
4. **Cleanup**: Dead particles (life <= 0) removed from array
5. **Rendering**: Alpha blending based on remaining life

## 🎯 Collision Detection System

### Brick Collision Algorithm

```javascript
checkBrickCollisions() {
    for (let brick of bricks) {
        if (brick.destroyed) continue;

        // AABB (Axis-Aligned Bounding Box) collision detection
        if (ball.x + ball.radius >= brick.x &&
            ball.x - ball.radius <= brick.x + brick.width &&
            ball.y + ball.radius >= brick.y &&
            ball.y - ball.radius <= brick.y + brick.height) {

            // Determine collision side for accurate reflection
            const intersectX = Math.abs(deltaX) - (brick.width / 2 + ball.radius);
            const intersectY = Math.abs(deltaY) - (brick.height / 2 + ball.radius);

            // Reflect ball based on collision side
            if (intersectX > intersectY) {
                ball.velocityY = -ball.velocityY;
            } else {
                ball.velocityX = -ball.velocityX;
            }
        }
    }
}
```

### Paddle Collision System

**Standard Collision:**

```javascript
if (
  ball.y + ball.radius >= paddle.y &&
  ball.y - ball.radius <= paddle.y + paddle.height &&
  ball.x >= paddle.x &&
  ball.x <= paddle.x + paddle.width
) {
  // Calculate reflection angle based on hit position
  const hitPos = (ball.x - paddle.x) / paddle.width;
  const angle = (hitPos - 0.5) * Math.PI * 0.6; // Max 54 degrees
}
```

**AI-Enhanced Collision:**

- Expanded collision area for Active Help mode
- Effective paddle width increased by 20px
- Maintains visual paddle size while expanding hit detection

## ⚡ Power-up System Architecture

### Power-up Lifecycle

1. **Generation**: Random power-up type selected on brick destruction
2. **Physics**: Falling animation with constant velocity
3. **Collection**: Collision detection with paddle
4. **Activation**: Effect applied to game objects
5. **Duration Management**: Timer-based deactivation
6. **Cleanup**: Effect removal and state restoration

### Power-up Implementation

#### Wide Paddle

```javascript
activatePowerUp('WIDE_PADDLE') {
    paddle.width = 150;  // 50% increase
    paddle.color = colors.powerUps.widePaddle;
    // Add to active power-ups with 15-second timer
}
```

#### Multi-ball

```javascript
activatePowerUp('MULTI_BALL') {
    // Create two additional Ball instances
    const newBall1 = new Ball(ball.x, ball.y, ball.radius);
    newBall1.velocityX = ball.velocityX + 2;  // Spread pattern
    balls.push(newBall1, newBall2);
}
```

#### Slow Ball

```javascript
activatePowerUp('SLOW_BALL') {
    // Apply to all active balls
    for (let ballObj of balls) {
        ballObj.speed *= 0.7;
        ballObj.velocityX *= 0.7;
        ballObj.velocityY *= 0.7;
    }
}
```

## 🔄 Game Loop Architecture

### Main Game Loop

```javascript
function gameLoop() {
  gameManager.update(); // Update all game systems
  gameManager.render(ctx); // Render all visual elements
  requestAnimationFrame(gameLoop); // Schedule next frame
}
```

### Update Cycle Order

1. **Input Processing**: Paddle movement, key presses
2. **Physics Update**: Ball movement, collision detection
3. **AI Processing**: Performance analysis, assistance application
4. **Power-up Management**: Timer updates, effect processing
5. **Particle Updates**: Position, lifecycle management
6. **State Management**: Game state transitions

### Render Cycle Order

1. **Canvas Clear**: `ctx.clearRect(0, 0, width, height)`
2. **Background Elements**: Bricks (bottom layer)
3. **Game Objects**: Paddle, ball, power-ups
4. **Effects**: Particles, visual feedback
5. **UI Overlays**: Pause screen, game over screen

## 🎨 Rendering System

### Theme-Aware Rendering

Each renderable object implements theme-aware rendering:

```javascript
render(ctx) {
    const effects = themeManager.getEffects();

    // Base rendering
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Theme-specific effects
    if (effects.shadowBlur > 0) {
        ctx.shadowColor = this.color;
        ctx.shadowBlur = effects.shadowBlur;
        // Re-render with glow effect
    }
}
```

### Performance Optimizations

- **Conditional Rendering**: Skip destroyed bricks
- **Effect Culling**: Only apply expensive effects when theme supports them
- **Efficient Clearing**: Single canvas clear per frame
- **Object Pooling**: Reuse particle objects where possible

## 📊 Performance Considerations

### 60fps Target Maintenance

**Optimization Strategies:**

- Minimal DOM manipulation (canvas-only rendering)
- Efficient collision detection with early exits
- Theme-based effect scaling (fewer particles for minimalist theme)
- Single requestAnimationFrame loop

**Performance Monitoring:**

- Browser DevTools for frame rate analysis
- Console logging for AI assistance level changes
- Visual feedback for smooth gameplay verification

### Memory Management

- **Particle Cleanup**: Dead particles removed immediately
- **Object Reuse**: Brick objects reused between levels
- **Event Listener Management**: Proper cleanup on game restart
- **Theme Switching**: Efficient color updates without object recreation

## 🔧 Code Quality Standards

### JSDoc Documentation

All functions include comprehensive JSDoc comments:

```javascript
/**
 * Apply AI assistance to ball physics based on current assistance level
 * @param {Ball} ball - The ball object to apply assistance to
 * @description Provides invisible magnetism and collision area expansion
 */
applyAssistance(ball) {
    // Implementation with clear logic flow
}
```

### Error Handling

- **Parameter Validation**: Type checking for critical functions
- **Boundary Checking**: Prevent objects from moving outside game area
- **State Validation**: Ensure valid game state transitions
- **Graceful Degradation**: Fallback behaviors for edge cases

### Code Organization

- **Class-Based Architecture**: Clear object-oriented design
- **Separation of Concerns**: Each class handles specific functionality
- **Consistent Naming**: Descriptive variable and function names
- **Modular Structure**: Easy to understand and maintain

## 🚀 Deployment Architecture

### Single-File Constraint

Despite the modular architecture, the entire game is contained in one HTML file:

- **Embedded CSS**: All styles within `<style>` tags
- **Embedded JavaScript**: Complete game logic in `<script>` tags
- **No External Dependencies**: Zero network requests required
- **Offline Capability**: Fully functional without internet connection

### Browser Compatibility

**Target Browsers:**

- Chrome 60+ (Canvas 2D, ES6 classes)
- Firefox 55+ (requestAnimationFrame, arrow functions)
- Safari 12+ (modern JavaScript features)
- Edge 79+ (Chromium-based compatibility)

**Required APIs:**

- Canvas 2D Context
- requestAnimationFrame
- Event Listeners
- ES6 Classes and Arrow Functions

## 🔍 Testing Strategy

### Manual Testing Approach

Given the visual and interactive nature of the game, manual testing is the primary approach:

**Functional Testing:**

- All controls respond correctly
- Theme switching works smoothly
- Power-ups activate and deactivate properly
- AI assistance levels adjust appropriately

**Performance Testing:**

- Smooth 60fps gameplay across all themes
- No memory leaks during extended play
- Responsive controls under all conditions

**Cross-Browser Testing:**

- Consistent behavior across supported browsers
- Visual appearance matches design specifications
- Performance maintains standards on different platforms

## 📈 Future Architecture Considerations

### Scalability Potential

The current architecture supports future enhancements:

- **Additional Themes**: Easy to add new theme configurations
- **New Power-ups**: Modular power-up system supports expansion
- **Enhanced AI**: Metrics system can support more sophisticated algorithms
- **Sound System**: Architecture ready for audio integration

### Maintainability Features

- **Clear Documentation**: Comprehensive JSDoc comments
- **Modular Design**: Easy to modify individual systems
- **Theme Separation**: Visual changes don't affect game logic
- **Performance Monitoring**: Built-in systems for optimization

This technical architecture provides a solid foundation for the enhanced AIPeggy game while maintaining the simplicity and portability of a single-file implementation.
