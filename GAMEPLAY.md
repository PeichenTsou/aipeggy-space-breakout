# AIPeggy - Detailed Gameplay Guide

## 🎮 Core Gameplay Mechanics

### Objective

Destroy all bricks on the screen by bouncing a ball with your paddle. Complete all levels while managing your limited lives and utilizing power-ups strategically.

### Game Flow

1. **Ball Launch**: Ball starts on paddle - press Space or click to launch
2. **Brick Destruction**: Ball bounces off bricks, damaging or destroying them
3. **Paddle Control**: Keep the ball in play by hitting it with your paddle
4. **Level Progression**: Clear all bricks to advance to the next level
5. **Life Management**: Avoid letting the ball fall below the paddle

## 🎯 Detailed Controls

### Primary Controls

- **Arrow Keys (← →)**: Move paddle left and right
- **Mouse Movement**: Alternative paddle control (hover over game area)
- **Spacebar**: Launch ball from paddle / Shoot laser projectiles
- **B Key**: Activate energy beam attack (when energy bar is full)
- **Click**: Alternative ball launch method

### Game Management

- **P Key**: Pause/unpause the game (preserves power-up timers)
- **R Key**: Restart game completely (resets score, lives, level)
- **T Key**: Cycle through visual themes (Cyberpunk → Minimalist → Space)

### Control Tips

- **Precision**: Use arrow keys for precise paddle positioning
- **Speed**: Use mouse for quick paddle movements
- **Angle Control**: Hit the ball with different parts of the paddle to control bounce angle
- **Edge Hits**: Hitting near paddle edges creates sharper angles

## 🧱 Brick System

### Brick Types & Properties

| Type          | Color  | Hits | Points | Strategy                      |
| ------------- | ------ | ---- | ------ | ----------------------------- |
| **Red**       | Red    | 1    | 10     | Easy targets, clear first     |
| **Orange**    | Orange | 1    | 20     | Medium value, good targets    |
| **Yellow**    | Yellow | 2    | 30     | Requires planning, high value |
| **Green**     | Green  | 2    | 40     | Highest value, prioritize     |
| **Line Bomb** | Gold   | 1    | 100    | Destroys entire row/column    |
| **Area Bomb** | Gold   | 1    | 150    | Destroys 3x3 area around it   |

### Special Bomb Bricks

#### Line Bomb (✚)

- **Visual**: Golden brick with cross (✚) icon and pulsing glow
- **Effect**: Destroys entire row or column when hit
- **Strategy**: Target when aligned with many bricks
- **Chain Reaction**: Can trigger other bombs in the destruction path
- **Spawn Rate**: 5% chance when generating new bricks

#### Area Bomb (💥)

- **Visual**: Golden brick with explosion (💥) icon and shimmering animation
- **Effect**: Destroys 3x3 area around the bomb when triggered
- **Strategy**: Most effective when surrounded by bricks
- **Chain Reaction**: Can trigger other bombs within the blast radius
- **Spawn Rate**: 5% chance when generating new bricks

### Brick Behavior

- **Single-Hit Bricks**: Red and Orange bricks are destroyed in one hit
- **Multi-Hit Bricks**: Yellow and Green bricks require 2 hits
- **Visual Feedback**: Damaged bricks change color and create particle effects
- **Collision Physics**: Ball reflects based on collision angle and brick position

### Strategic Considerations

- **Top-Down Approach**: Clear upper rows first to access lower bricks
- **Corner Strategy**: Use wall bounces to reach difficult corners
- **Multi-Hit Priority**: Focus on 2-hit bricks early when you have more control
- **Power-up Timing**: Save difficult bricks for when you have power-ups active

## ⚡ Power-up System

### Power-up Types

#### Wide Paddle (↔)

- **Effect**: Increases paddle width by 50%
- **Duration**: 15 seconds
- **Strategy**: Collect when ball control is difficult
- **Visual**: Paddle turns green and expands
- **Best Use**: During fast ball speeds or multi-ball scenarios

#### Multi-ball (●●●)

- **Effect**: Splits current ball into 3 balls
- **Duration**: Until balls are lost
- **Strategy**: Massive brick clearing potential
- **Visual**: Additional balls appear in magenta/pink
- **Best Use**: When many bricks remain, especially multi-hit bricks

#### Slow Ball (⏱)

- **Effect**: Reduces ball speed by 30%
- **Duration**: 20 seconds
- **Strategy**: Provides more reaction time
- **Visual**: Ball maintains normal appearance but moves slower
- **Best Use**: When ball speed becomes unmanageable

### Power-up Mechanics

- **Drop Chance**: 15-25% chance when destroying bricks (AI-adjusted)
- **Collection**: Touch falling power-up with paddle
- **Stacking**: Multiple power-ups can be active simultaneously
- **Timer Display**: Active power-ups show countdown in top-left corner
- **Pause Compatibility**: Timers pause when game is paused

### Advanced Power-up Strategies

- **Combo Usage**: Wide Paddle + Slow Ball = Maximum control
- **Multi-ball Timing**: Activate when bricks are clustered
- **Conservation**: Don't waste power-ups on easy sections
- **AI Assistance**: Struggling players get more power-up drops

## ⚡ Energy System

### Energy Mechanics

#### Energy Accumulation

- **Brick Destruction**: Gain energy by destroying bricks
- **Different Values**: Different brick types give different energy amounts
- **Visual Feedback**: Floating "+X Energy" text appears when energy is gained
- **Energy Bar**: Visual indicator at top of screen shows current energy level

#### Energy Bar States

- **Empty**: Gray bar, no energy available
- **Filling**: Blue gradient shows energy accumulation progress
- **Full**: Pulsing gold effect indicates beam attack is ready
- **Cooldown**: Red tint during 5-second cooldown period

### Beam Attack System

#### Activation

- **Key**: Press 'B' when energy bar is full
- **Requirement**: Energy bar must be completely filled
- **Instant Use**: Energy is consumed immediately upon activation

#### Beam Effects

- **Visual**: Devastating golden vertical beam from paddle to top of screen
- **Destruction**: Destroys all bricks in the beam's path
- **Particles**: Spectacular particle trails and screen impact effects
- **Sound**: Powerful audio feedback (when sound system is implemented)

#### Strategic Usage

- **Dense Areas**: Most effective when many bricks are vertically aligned
- **Difficult Situations**: Save for when regular gameplay becomes challenging
- **Level Clearing**: Excellent for clearing final difficult-to-reach bricks
- **Emergency Tool**: Use when ball control becomes unmanageable

### Energy Strategy Guide

#### Energy Management

1. **Conservation**: Don't waste beam attacks on sparse brick areas
2. **Timing**: Wait for optimal brick alignment before using beam
3. **Emergency Use**: Save energy for difficult situations
4. **Level Planning**: Consider energy availability when approaching new levels

#### Optimal Beam Timing

- **Vertical Columns**: Target areas with many bricks in a straight line
- **Dense Clusters**: Use when bricks are tightly packed vertically
- **Final Cleanup**: Clear remaining difficult bricks at level end
- **Multi-Hit Bricks**: Especially effective against yellow and green bricks

#### Energy Efficiency Tips

- **Brick Priority**: Focus on destroying higher-value bricks for more energy
- **Combo Potential**: Combine with power-ups for maximum effectiveness
- **Cooldown Awareness**: Plan next moves during 5-second cooldown period
- **Visual Cues**: Watch for energy bar pulsing to know when beam is ready

## 🤖 AI Assistance System

### Performance Tracking

The AI continuously monitors your gameplay performance:

- **Hit Accuracy**: Percentage of ball bounces that hit bricks
- **Paddle Efficiency**: Success rate of paddle-ball collisions
- **Consecutive Deaths**: Number of lives lost in succession
- **Rally Length**: Average time ball stays in play

### Assistance Levels

#### No Help (>60% accuracy)

- **Status**: Full challenge mode
- **Assistance**: None - pure skill-based gameplay
- **Power-up Rate**: Standard 15% drop chance
- **Physics**: Normal ball and paddle physics

#### Subtle Help (30-60% accuracy)

- **Status**: Minor assistance activated
- **Assistance**: Slight ball magnetism toward paddle when close
- **Power-up Rate**: Increased to 20% drop chance
- **Physics**: Nearly imperceptible physics adjustments

#### Active Help (<30% accuracy)

- **Status**: Maximum assistance activated
- **Assistance**: Enhanced paddle collision area + stronger magnetism
- **Power-up Rate**: Maximum 25% drop chance
- **Physics**: Noticeable but still challenging adjustments

### AI Philosophy

- **Invisible**: Assistance is designed to feel natural
- **Adaptive**: Continuously adjusts based on performance
- **Preserving Agency**: Player still controls all actions
- **Encouraging**: Helps without making game too easy

## 🎨 Theme System

### Theme Switching

- **Key**: Press 'T' to cycle through themes
- **Transition**: Smooth 0.5-second animation between themes
- **Persistence**: Theme selection maintained during gameplay
- **Real-time**: Can switch themes while playing

### Theme Characteristics

#### Cyberpunk Theme

- **Aesthetic**: Dark, futuristic, neon-lit
- **Colors**: Cyan paddle, white ball, vibrant brick colors
- **Effects**: Strong glow effects, dramatic particles
- **Atmosphere**: High-tech, intense gaming experience

#### Minimalist Theme

- **Aesthetic**: Clean, modern, Material Design
- **Colors**: Pastel palette (coral, mint, lavender, peach)
- **Effects**: Subtle shadows, gentle particles
- **Atmosphere**: Calm, focused, distraction-free

#### Space Theme

- **Aesthetic**: Cosmic, mysterious, otherworldly
- **Colors**: Deep purples, blues, nebula pinks
- **Effects**: Enhanced particles, animated starfield background
- **Atmosphere**: Epic, immersive, space exploration

### Theme Impact on Gameplay

- **Visual Only**: Themes don't affect game mechanics
- **Performance**: All themes optimized for 60fps
- **Accessibility**: Each theme offers different visual contrast options
- **Preference**: Choose based on personal visual preference

## 📊 Scoring & Progression

### Scoring System

- **Base Points**: 10-40 points per brick (see brick table above)
- **No Multipliers**: Pure brick value scoring
- **Cumulative**: Score carries across levels
- **Display**: Real-time score updates in top UI

### Level Progression

- **Advancement**: Clear all bricks to proceed
- **Difficulty Increase**: Ball speed increases by 0.5 per level
- **Brick Layout**: Randomization increases at higher levels
- **No Level Cap**: Infinite progression possible

### Lives System

- **Starting Lives**: 3 lives per game
- **Life Loss**: Ball falls below paddle
- **Game Over**: All lives lost
- **No Extra Lives**: No way to gain additional lives

## 🎯 Advanced Strategies

### Ball Control Techniques

1. **Angle Management**: Hit ball with paddle edges for sharp angles
2. **Speed Control**: Use Slow Ball power-up during fast sections
3. **Wall Usage**: Utilize wall bounces to reach difficult areas
4. **Paddle Positioning**: Anticipate ball trajectory and position early

### Efficient Brick Clearing

1. **Top Priority**: Clear upper rows to access lower bricks
2. **Multi-Hit Focus**: Target 2-hit bricks early in the level
3. **Corner Strategy**: Use angles to reach corner bricks
4. **Power-up Timing**: Save Multi-ball for dense brick areas

### Power-up Optimization

1. **Collection Timing**: Don't collect power-ups too early
2. **Stacking Strategy**: Combine compatible power-ups
3. **Situation Assessment**: Match power-up to current need
4. **Conservation**: Save powerful effects for difficult moments

### AI Assistance Awareness

1. **Performance Monitoring**: Play consistently to avoid assistance
2. **Skill Development**: Use assistance periods to improve
3. **Challenge Seeking**: Aim for No Help status
4. **Learning Tool**: Understand when you're struggling

## 🏆 Mastery Goals

### Beginner Goals

- [ ] Complete first level without losing a life
- [ ] Successfully use each power-up type
- [ ] Try all three visual themes
- [ ] Understand basic ball physics

### Intermediate Goals

- [ ] Reach level 5 consistently
- [ ] Maintain >60% accuracy (No Help status)
- [ ] Master paddle angle control
- [ ] Efficiently clear multi-hit bricks

### Advanced Goals

- [ ] Reach level 10+
- [ ] Achieve high scores consistently
- [ ] Master power-up combinations
- [ ] Play effectively in all themes

### Expert Goals

- [ ] Maintain No Help status throughout entire games
- [ ] Develop personal high score records
- [ ] Master advanced ball control techniques
- [ ] Help others learn the game

## 🎮 Enjoy the Challenge!

AIPeggy offers depth for players of all skill levels. The AI assistance ensures everyone can enjoy the game while still providing meaningful challenges for experienced players. Experiment with different strategies, themes, and power-up combinations to find your optimal playstyle!
