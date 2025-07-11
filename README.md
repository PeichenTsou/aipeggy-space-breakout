# 🚀 AIPeggy Space Breakout

[![Version](https://img.shields.io/badge/Version-5.0.0-blue.svg)](https://github.com/username/aipeggy-space-breakout)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

> **Professional space-themed breakout game with intelligent AI assistance, modular architecture, and stunning visual effects.**

![AIPeggy Space Theme](https://via.placeholder.com/800x400/0B1426/8B5CF6?text=AIPeggy+Space+Breakout)

## ✨ Features

### 🎮 **Core Gameplay**

- **Classic Breakout Mechanics** - Destroy all bricks to advance levels
- **Bomb Bricks System** - Line bombs (✚) and Area bombs (💥) with spectacular chain reactions
- **Energy System** - Build energy by destroying bricks, unleash powerful beam attacks
- **Intelligent AI Assistance** - Adaptive difficulty that helps struggling players invisibly
- **Power-up System** - Wide Paddle, Multi-ball, Slow Ball, and Laser effects
- **Progressive Difficulty** - Increasing speed and randomized brick layouts

### 🎨 **Visual Excellence**

- **Space Theme Primary** - Beautiful cosmic design with animated starfield background
- **Rounded Bricks** - Modern 8px border-radius with enhanced proportions (90x28px)
- **Professional Spacing** - Improved brick spacing (8px) for better visual hierarchy
- **Centered Power-up Icons** - Perfect icon alignment with enhanced glow animations
- **Larger Power-ups** - Increased size (40x30px) with continuous shine effects
- **Dual Theme System** - Space (primary) + Minimalist themes with 'T' key switching

### 🏗️ **Professional Architecture**

- **Modular Design** - Clean separation of concerns with professional class hierarchy
- **Modern CSS System** - Professional design system with CSS custom properties
- **Performance Optimized** - Efficient rendering maintaining 60fps across all themes
- **Cross-Browser Compatible** - Tested patterns working across Chrome, Firefox, Safari, Edge
- **Senior Developer Code Quality** - Comprehensive JSDoc documentation and error handling

## 🚀 Quick Start

### **Option 1: Direct Play**

1. **Clone the repository**

   ```bash
   git clone https://github.com/username/aipeggy-space-breakout.git
   cd aipeggy-space-breakout
   ```

2. **Open and play**

   ```bash
   # Windows
   start src/index.html

   # macOS
   open src/index.html

   # Linux
   xdg-open src/index.html
   ```

### **Option 2: Local Server** (Recommended)

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have it)
npx serve .

# Then open: http://localhost:8000/src/
```

## 🎮 How to Play

### **Controls**

| Key     | Action                               |
| ------- | ------------------------------------ |
| `←` `→` | Move paddle left/right               |
| `Mouse` | Move paddle (alternative control)    |
| `Space` | Launch ball from paddle/shoot lasers |
| `B`     | Activate energy beam attack          |
| `P`     | Pause/unpause game                   |
| `R`     | Restart game                         |
| `T`     | Switch themes (Space ↔ Minimalist)   |

### **Gameplay**

1. **Objective**: Destroy all bricks by bouncing the ball with your paddle
2. **Lives**: You start with 3 lives - lose one when the ball falls below the paddle
3. **Scoring**: Different brick types give different points (10-40 points)
4. **Levels**: Complete all bricks to advance to the next level with increased difficulty
5. **Power-ups**: Collect falling power-ups for temporary advantages

### **Power-ups**

- **↔ Wide Paddle**: Increases paddle width for 15 seconds
- **●●● Multi-ball**: Splits ball into 3 balls for maximum destruction
- **⏱ Slow Ball**: Reduces ball speed by 30% for 20 seconds
- **⚡ Laser Paddle**: Enables paddle to shoot laser projectiles for 15 seconds

## 🎨 Themes

### **🌌 Space Theme (Primary)**

- Deep space background with animated starfield
- Cosmic colors (purples, blues, nebula pinks)
- Enhanced particle effects with 15 particles
- Professional glow effects and shadows

### **🎯 Minimalist Theme**

- Clean gradient background
- Subtle color palette
- Material Design principles
- Gentle particle effects with 6 particles

## 🤖 AI Assistance System

AIPeggy features an invisible AI system that monitors your performance:

- **No Help** (>60% accuracy): Full challenge mode
- **Subtle Help** (30-60% accuracy): Minor ball magnetism toward paddle
- **Active Help** (<30% accuracy): Enhanced paddle collision area and increased power-up drops

The AI tracks metrics like hit accuracy, paddle efficiency, and consecutive deaths to provide seamless assistance.

## 🏆 Scoring System

| Brick Type      | Hits Required | Points | Color   | Special                     |
| --------------- | ------------- | ------ | ------- | --------------------------- |
| Red (Indigo)    | 1             | 10     | #6366F1 | -                           |
| Orange (Purple) | 1             | 20     | #8B5CF6 | -                           |
| Yellow (Pink)   | 2             | 30     | #EC4899 | -                           |
| Green (Amber)   | 2             | 40     | #F59E0B | -                           |
| Line Bomb (✚)   | 1             | 100    | Gold    | Destroys entire row/column  |
| Area Bomb (💥)  | 1             | 150    | Gold    | Destroys 3x3 area around it |

## ⚡ Energy System

- **Energy Accumulation**: Gain energy by destroying bricks (different types give different amounts)
- **Energy Bar**: Visual indicator shows current energy level with pulsing gold effect when full
- **Beam Attack**: Press 'B' when energy bar is full to unleash devastating vertical beam
- **Spectacular Effects**: Golden beam with particle trails and screen impact
- **Cooldown**: 5-second cooldown prevents spam while maintaining excitement
- **Strategic Use**: Save energy for dense brick areas or difficult situations

## 🏗️ Architecture

### **Project Structure**

```
aipeggy-space-breakout/
├── src/
│   ├── index.html              # Main game entry point
│   ├── styles/
│   │   ├── base.css           # Core styles and design system
│   │   └── themes/
│   │       ├── space.css      # Space theme (primary)
│   │       └── minimalist.css # Minimalist theme
│   └── scripts/
│       ├── core/
│       │   ├── Game.js        # Main game manager
│       │   └── ThemeManager.js # Theme switching system
│       ├── entities/
│       │   ├── Paddle.js      # Paddle entity
│       │   ├── Ball.js        # Ball physics
│       │   └── Brick.js       # Brick management
│       └── systems/
│           ├── AIAssistant.js    # Intelligent assistance
│           ├── PowerUpSystem.js  # Power-up management
│           ├── ParticleSystem.js # Visual effects
│           └── EnergySystem.js   # Energy and beam system
├── archive/                    # Previous versions
├── memory-bank/               # Development context
└── docs/                      # Documentation files
```

### **Key Design Patterns**

- **Modular Architecture** - Clean separation of concerns
- **Entity-Component System** - Game objects with specific responsibilities
- **Observer Pattern** - Theme changes update all relevant components
- **Strategy Pattern** - Different AI assistance levels
- **Factory Pattern** - Brick and power-up generation

## 🔧 Technical Features

- **60fps Performance** - Optimized rendering with requestAnimationFrame
- **Responsive Design** - Adapts to different screen sizes
- **Professional Code** - Comprehensive JSDoc documentation
- **Error Handling** - Robust parameter validation
- **Memory Management** - Efficient particle and object cleanup
- **Cross-Browser Support** - Works on all modern browsers

## 📱 Browser Compatibility

- ✅ **Chrome 60+**
- ✅ **Firefox 55+**
- ✅ **Safari 12+**
- ✅ **Edge 79+**

## 🧪 Testing Suite

AIPeggy includes a comprehensive testing framework for ensuring code quality and functionality:

### **Test Runner**

```bash
# Open the test runner in your browser
open tests/testRunner.html
```

### **Test Categories**

- **🔧 Unit Tests** - Individual component testing (Ball, Paddle, Brick entities)
- **🔗 Integration Tests** - System interaction testing (PowerUpSystem, GameManager)
- **🎯 Functional Tests** - Complete workflow testing (GameplayFlow, UserInteraction)
- **⚡ Performance Tests** - Speed and memory usage monitoring

### **Running Tests**

1. **All Tests** - Run complete test suite with visual results
2. **Selective Testing** - Run specific test categories (Unit, Integration, Functional)
3. **Visual Feedback** - Color-coded results with detailed error reporting
4. **Performance Metrics** - Built-in timing and performance analysis

## 🎯 Development

### **Code Quality Standards**

- **JSDoc Documentation** - Comprehensive function and class documentation
- **SOLID Principles** - Clean, maintainable code architecture
- **Performance First** - Optimized algorithms maintaining 60fps
- **Professional Naming** - Descriptive variable and function names
- **Error Handling** - Graceful error recovery and validation
- **Test Coverage** - Comprehensive testing across all game systems

### **Adding New Features**

1. **Entities** - Add new game objects in `src/scripts/entities/`
2. **Systems** - Add new game systems in `src/scripts/systems/`
3. **Themes** - Add new themes in `src/styles/themes/`
4. **Tests** - Add corresponding tests in `tests/` directory
5. **Update** - Modify `src/index.html` to include new scripts

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📚 Documentation

- [Gameplay Guide](GAMEPLAY.md) - Detailed gameplay mechanics
- [Technical Documentation](TECHNICAL.md) - Architecture and implementation details
- [Changelog](CHANGELOG.md) - Version history and updates
- [Contributing Guide](CONTRIBUTING.md) - Development guidelines

## 🎮 Play Now!

**[🚀 Launch AIPeggy Space Breakout](https://peichentsou.github.io/aipeggy-space-breakout/src/index.html)**

---

<div align="center">

**Made with ❤️ by the AIPeggy Development Team**

_Professional browser-based game development with modern JavaScript and CSS_

</div>
