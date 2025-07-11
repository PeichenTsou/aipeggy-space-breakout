# Development Principles - AIPeggy Game Project

## Senior Developer Guidelines

### For Development Tasks

Act as a senior developer with expertise in HTML game applications. When making changes:

- Start with low confidence and use real code following industry best practices to build confidence in solutions
- Provide confidence percentage for each solution before implementing
- Avoid unnecessary complexity and follow SOLID principles
- Rate confidence (1-10) before saving files, after saving, after rejections, and before task completion
- Ensure 10/10 confidence and all tasks in the plan are actioned with comprehensive checklists

### For Architecture Reviews

Act as a senior architect with expert knowledge in HTML game development:

- Review current implementation against ONION and Modular principles
- Provide recommendations ordered by highest percentage improvement versus lowest chance of regression
- Focus on maintainability, testability, and scalability
- Consider performance implications of architectural decisions

## SOLID Principles Application

### Single Responsibility Principle (SRP)

- Each class should have one reason to change
- Game entities (Ball, Paddle, Brick) handle only their own state and behavior
- Systems (PowerUpSystem, AIAssistant) manage specific game mechanics
- Managers (GameManager, ThemeManager) coordinate between systems

### Open/Closed Principle (OCP)

- Classes should be open for extension, closed for modification
- Use inheritance and composition for new features
- Theme system allows new themes without modifying existing code
- Power-up system allows new power-ups through configuration

### Liskov Substitution Principle (LSP)

- Derived classes must be substitutable for their base classes
- All game entities should implement common interfaces
- Theme implementations should be interchangeable

### Interface Segregation Principle (ISP)

- Clients should not depend on interfaces they don't use
- Separate interfaces for rendering, updating, and collision detection
- Avoid monolithic interfaces

### Dependency Inversion Principle (DIP)

- Depend on abstractions, not concretions
- Use dependency injection where possible
- Abstract game systems from specific implementations

## Code Quality Standards

### Documentation Requirements

- Comprehensive JSDoc for all public methods
- Clear parameter and return type documentation
- Usage examples for complex functions
- Architecture decision records (ADRs) for major changes

### Error Handling

- Graceful degradation for non-critical failures
- Comprehensive error logging with context
- User-friendly error messages
- Recovery mechanisms where possible

### Performance Standards

- Maintain 60fps gameplay
- Efficient collision detection algorithms
- Memory management for dynamic objects
- Profiling and optimization metrics

### Testing Requirements

- Unit tests for all business logic
- Integration tests for system interactions
- Functional tests for user workflows
- Performance benchmarks

## Confidence Rating System

### Rating Scale (1-10)

- **1-3**: Low confidence - Experimental, high risk of issues
- **4-6**: Medium confidence - Functional but may need refinement
- **7-8**: High confidence - Well-tested, follows best practices
- **9-10**: Very high confidence - Production-ready, thoroughly validated

### Rating Checkpoints

1. **Before Implementation**: Initial confidence in approach
2. **After Code Review**: Confidence after peer/self review
3. **After Testing**: Confidence after test validation
4. **Before Deployment**: Final confidence assessment
5. **After User Feedback**: Post-deployment confidence adjustment

### Confidence Improvement Strategies

- Code reviews and pair programming
- Comprehensive testing at multiple levels
- Performance profiling and optimization
- User acceptance testing
- Continuous monitoring and feedback loops

## Best Practices Checklist

### Before Starting Development

- [ ] Requirements clearly understood
- [ ] Architecture approach defined
- [ ] Risk assessment completed
- [ ] Testing strategy planned
- [ ] Performance targets set

### During Development

- [ ] SOLID principles followed
- [ ] Code documented with JSDoc
- [ ] Error handling implemented
- [ ] Unit tests written
- [ ] Performance considerations addressed

### Before Completion

- [ ] Integration tests passing
- [ ] Functional tests validated
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] **ALL TESTS MUST BE RUN AND PASSING** - Execute comprehensive test suite and fix any failures before task completion
- [ ] Confidence rating 8+ achieved

### Post-Implementation

- [ ] User feedback collected
- [ ] Performance monitored
- [ ] Issues tracked and resolved
- [ ] Lessons learned documented
- [ ] Confidence rating validated
- [ ] **AUTOMATIC MEMORY BANK UPDATE** - After finishing any action, automatically update memory bank with results and inform user
- [ ] **NEW TASK OPTION** - Always offer user the option to start a new task after completion

## Architecture Patterns

### Modular Architecture

- Clear separation of concerns
- Loose coupling between modules
- High cohesion within modules
- Well-defined interfaces

### ONION Architecture Principles

- Domain logic at the center
- Dependencies point inward
- Infrastructure at the outer layers
- Testable and maintainable structure

### Event-Driven Architecture

- Decoupled communication between systems
- Event sourcing for game state changes
- Observer pattern for UI updates
- Command pattern for user actions

## Quality Gates

### Code Quality

- ESLint/JSHint compliance
- Code coverage > 80%
- Cyclomatic complexity < 10
- No code duplication > 5%

### Performance

- Frame rate > 55fps (target 60fps)
- Memory usage < 100MB
- Load time < 2 seconds
- Responsive user interactions

### Maintainability

- Clear naming conventions
- Consistent code style
- Comprehensive documentation
- Modular structure

---

**Last Updated**: 2025-01-07
**Version**: 1.0.0
**Confidence Level**: 9/10
