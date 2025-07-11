# Contributing to AIPeggy

Thank you for your interest in contributing to AIPeggy! This document provides guidelines and information for contributors to help maintain code quality and project consistency.

## 🎯 Project Vision

AIPeggy aims to be a professional-quality, accessible Breakout/Arkanoid game that demonstrates:

- **Intelligent AI assistance** that helps players without being obvious
- **Beautiful visual themes** that enhance the gaming experience
- **Clean, maintainable code** that serves as a learning resource
- **Single-file simplicity** for easy distribution and deployment

## 🤝 How to Contribute

### Types of Contributions Welcome

- 🐛 **Bug Reports**: Help us identify and fix issues
- ✨ **Feature Suggestions**: Ideas for new themes, power-ups, or gameplay elements
- 🎨 **Visual Improvements**: New themes, better graphics, or UI enhancements
- 📚 **Documentation**: Improvements to guides, comments, or explanations
- 🔧 **Code Quality**: Refactoring, optimization, or architectural improvements
- 🧪 **Testing**: Cross-browser testing, performance analysis, or edge case discovery

### Getting Started

1. **Understand the Codebase**: Read through the documentation files

   - [README.md](README.md) - Game overview and features
   - [TECHNICAL.md](TECHNICAL.md) - Architecture and implementation details
   - [GAMEPLAY.md](GAMEPLAY.md) - Game mechanics and AI system

2. **Set Up Development Environment**:

   - Any text editor (VS Code recommended)
   - Modern web browser for testing
   - No build tools or dependencies required

3. **Test the Current Version**:
   - Open `index.html` in your browser
   - Try all themes (press 'T' to cycle)
   - Test all controls and power-ups
   - Understand the AI assistance system

## 📋 Development Guidelines

### Code Style Standards

#### JavaScript Standards

```javascript
/**
 * Use JSDoc comments for all functions and classes
 * @param {Type} paramName - Description of parameter
 * @returns {Type} Description of return value
 * @description Detailed explanation of function purpose
 */
function exampleFunction(paramName) {
  // Use camelCase for variables and functions
  const localVariable = "value";

  // Use descriptive names
  const playerPerformanceMetrics = calculateMetrics();

  // Include error handling where appropriate
  if (!paramName) {
    console.warn("Parameter missing in exampleFunction");
    return null;
  }

  return result;
}
```

#### Class Structure

```javascript
/**
 * Class description with purpose and responsibilities
 */
class ExampleClass {
  /**
   * Constructor with parameter documentation
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.initialized = true;
  }

  /**
   * Method with clear documentation
   * @param {Object} context - Canvas rendering context
   */
  render(context) {
    // Implementation with clear logic flow
  }
}
```

#### Theme Integration

```javascript
// Always make new features theme-aware
const colors = themeManager.getColors();
const effects = themeManager.getEffects();

// Use theme colors instead of hardcoded values
ctx.fillStyle = colors.paddle; // ✅ Good
ctx.fillStyle = "#00ffff"; // ❌ Avoid
```

### Architecture Principles

#### Single Responsibility

- Each class should handle one specific aspect of the game
- Functions should have a single, clear purpose
- Separate concerns between rendering, logic, and data management

#### Theme Agnostic Core

- Game logic should not depend on visual themes
- Themes should only affect colors and visual effects
- Core mechanics must work identically across all themes

#### Performance First

- Maintain 60fps target across all browsers
- Optimize particle systems and rendering loops
- Use efficient collision detection algorithms
- Minimize memory allocations in game loops

#### AI Integration

- New features should consider AI assistance implications
- Maintain invisible assistance philosophy
- Update performance metrics when adding new mechanics
- Preserve player agency in all assistance implementations

### File Organization

#### Single File Constraint

Despite the modular architecture, maintain the single HTML file structure:

- All CSS within `<style>` tags
- All JavaScript within `<script>` tags
- No external dependencies or resources
- Preserve offline capability

#### Code Sections

Organize code within the single file using clear section headers:

```javascript
// ===== THEME SYSTEM =====
// Theme-related classes and constants

// ===== GAME CORE SYSTEM =====
// Core game logic and entities

// ===== AI ASSISTANCE SYSTEM =====
// AI performance tracking and assistance

// ===== PARTICLE SYSTEM =====
// Visual effects and particle management
```

## 🎨 Adding New Themes

### Theme Structure

```javascript
const NEW_THEME = {
  name: "Theme Display Name",
  className: "theme-css-class",
  colors: {
    paddle: "#color",
    ball: "#color",
    bricks: {
      red: "#color",
      orange: "#color",
      yellow: "#color",
      green: "#color",
    },
    powerUps: {
      widePaddle: "#color",
      multiBall: "#color",
      slowBall: "#color",
    },
    particles: {
      explosion: "#color",
      score: "#color",
    },
  },
  effects: {
    glowIntensity: 0 - 20, // 0 = no glow, 20 = maximum
    particleCount: 4 - 12, // Number of particles per explosion
    shadowBlur: 0 - 15, // Canvas shadow blur amount
  },
};
```

### CSS Theme Implementation

```css
/* Theme-specific styles */
body.theme-new-theme {
  background: /* theme background */ ;
  color: /* theme text color */ ;
}

body.theme-new-theme #gameCanvas {
  background: /* canvas background */ ;
  border-color: /* border color */ ;
  box-shadow: /* theme-appropriate shadow */ ;
}

/* Add any special effects or animations */
body.theme-new-theme::before {
  /* Background effects if needed */
}
```

### Theme Guidelines

- **Accessibility**: Ensure good contrast ratios
- **Performance**: Test particle effects don't impact framerate
- **Consistency**: Follow established visual patterns
- **Uniqueness**: Each theme should have distinct personality

## ⚡ Adding New Power-ups

### Power-up Structure

```javascript
const NEW_POWER_UP = {
  effect: "effectName",
  duration: 15000, // milliseconds (0 for instant effects)
  icon: "🎯", // Unicode symbol for visual representation
};
```

### Implementation Requirements

1. **Add to POWER_UP_TYPES**: Include configuration
2. **Update activatePowerUp()**: Handle activation logic
3. **Update deactivatePowerUp()**: Handle cleanup if needed
4. **Theme Integration**: Use theme-appropriate colors
5. **AI Consideration**: Consider impact on assistance metrics

### Power-up Guidelines

- **Balanced Impact**: Should help but not make game trivial
- **Visual Feedback**: Clear indication when active
- **Theme Compatibility**: Works well with all visual themes
- **Performance**: No negative impact on game performance

## 🤖 AI System Modifications

### Performance Metrics

When adding new gameplay elements, consider their impact on AI metrics:

```javascript
// Update relevant metrics
aiAssistant.metrics.newMetric++;

// Consider assistance level implications
if (newGameplayElement.affectsPlayerPerformance) {
  // Update performance analysis algorithm
}
```

### Assistance Implementation

- **Invisible**: Players shouldn't notice AI intervention
- **Gradual**: Smooth transitions between assistance levels
- **Preserving Agency**: Player maintains full control
- **Performance-Based**: Adjustments based on actual skill metrics

## 🧪 Testing Guidelines

### Manual Testing Checklist

#### Functionality Testing

- [ ] All controls respond correctly (arrows, mouse, spacebar, P, R, T)
- [ ] Theme switching works smoothly between all themes
- [ ] Power-ups activate, display timers, and deactivate properly
- [ ] AI assistance levels adjust based on performance
- [ ] Pause functionality preserves all game state
- [ ] Game restart resets all systems properly

#### Visual Testing

- [ ] All themes render correctly
- [ ] Particle effects work in all themes
- [ ] UI elements adapt to theme colors
- [ ] No visual glitches or rendering issues
- [ ] Smooth 60fps performance maintained

#### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Performance Testing

- [ ] No memory leaks during extended play
- [ ] Consistent framerate across all themes
- [ ] Responsive controls under all conditions
- [ ] Efficient particle system performance

### Testing New Features

1. **Isolated Testing**: Test new feature independently
2. **Integration Testing**: Ensure compatibility with existing systems
3. **Theme Testing**: Verify functionality across all themes
4. **Performance Testing**: Confirm no performance degradation
5. **Edge Case Testing**: Test boundary conditions and error states

## 📚 Documentation Standards

### Code Documentation

- **JSDoc Comments**: All functions and classes must have comprehensive JSDoc
- **Inline Comments**: Explain complex logic and algorithms
- **Clear Naming**: Use descriptive variable and function names
- **Architecture Comments**: Explain design decisions and patterns

### User Documentation

- **README Updates**: Keep feature list and instructions current
- **GAMEPLAY Updates**: Document new mechanics and strategies
- **TECHNICAL Updates**: Explain architectural changes
- **CHANGELOG Updates**: Record all changes with proper categorization

## 🚀 Submission Process

### Before Submitting

1. **Test Thoroughly**: Complete all testing checklists
2. **Update Documentation**: Ensure all docs reflect changes
3. **Check Code Quality**: Follow all style guidelines
4. **Verify Single File**: Ensure no external dependencies introduced
5. **Performance Check**: Confirm 60fps performance maintained

### Submission Format

1. **Clear Description**: Explain what the contribution does
2. **Testing Evidence**: Describe testing performed
3. **Documentation Updates**: List all documentation changes
4. **Breaking Changes**: Highlight any compatibility impacts
5. **Screenshots/Videos**: Visual evidence for UI/theme changes

### Review Process

1. **Code Review**: Architecture and implementation review
2. **Testing Verification**: Independent testing of changes
3. **Documentation Review**: Accuracy and completeness check
4. **Performance Validation**: Framerate and memory usage verification
5. **Integration Testing**: Compatibility with existing features

## 🎯 Contribution Ideas

### Beginner-Friendly

- **New Themes**: Create additional visual themes
- **Documentation Improvements**: Enhance guides and comments
- **Bug Reports**: Identify and report issues
- **Testing**: Cross-browser compatibility testing

### Intermediate

- **Power-up Additions**: Design and implement new power-ups
- **Visual Enhancements**: Improve particle effects or animations
- **AI Improvements**: Enhance performance tracking metrics
- **Code Refactoring**: Improve code organization and efficiency

### Advanced

- **Architecture Enhancements**: Major system improvements
- **Performance Optimization**: Advanced rendering or algorithm improvements
- **New Game Modes**: Additional gameplay variations
- **Accessibility Features**: Screen reader support, keyboard navigation

## 📞 Getting Help

### Resources

- **TECHNICAL.md**: Detailed architecture documentation
- **GAMEPLAY.md**: Game mechanics and AI system explanation
- **Code Comments**: Comprehensive inline documentation
- **Browser DevTools**: For debugging and performance analysis

### Questions and Discussion

- Review existing documentation first
- Check the code comments for implementation details
- Test your ideas in isolation before integration
- Consider the impact on all three themes

## 🏆 Recognition

Contributors will be recognized in:

- **CHANGELOG.md**: Feature and improvement credits
- **README.md**: Contributor acknowledgments
- **Code Comments**: Attribution for significant contributions

## 📄 License

By contributing to AIPeggy, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

Thank you for helping make AIPeggy better! Your contributions help create a more enjoyable gaming experience and a better learning resource for developers.

**Happy coding! 🎮✨**
