/**
 * AIPeggy Test Utilities
 * Professional testing framework for game components
 */

/**
 * Test assertion utilities
 */
class TestAssert {
  static assertTrue(condition, message = "Assertion failed") {
    if (!condition) {
      throw new Error(message);
    }
  }

  static assertFalse(condition, message = "Assertion failed") {
    if (condition) {
      throw new Error(message);
    }
  }

  static assertEqual(actual, expected, message = "Values not equal") {
    if (actual !== expected) {
      throw new Error(`${message}. Expected: ${expected}, Actual: ${actual}`);
    }
  }

  static assertNotEqual(
    actual,
    expected,
    message = "Values should not be equal"
  ) {
    if (actual === expected) {
      throw new Error(`${message}. Both values: ${actual}`);
    }
  }

  static assertGreaterThan(
    actual,
    expected,
    message = "Value not greater than expected"
  ) {
    if (actual <= expected) {
      throw new Error(`${message}. Expected > ${expected}, Actual: ${actual}`);
    }
  }

  static assertLessThan(
    actual,
    expected,
    message = "Value not less than expected"
  ) {
    if (actual >= expected) {
      throw new Error(`${message}. Expected < ${expected}, Actual: ${actual}`);
    }
  }

  static assertInstanceOf(
    obj,
    constructor,
    message = "Object not instance of expected type"
  ) {
    if (!(obj instanceof constructor)) {
      throw new Error(`${message}. Expected instance of ${constructor.name}`);
    }
  }

  static assertThrows(fn, message = "Function should throw an error") {
    try {
      fn();
      throw new Error(message);
    } catch (error) {
      // Expected behavior
    }
  }

  static assertArrayEqual(actual, expected, message = "Arrays not equal") {
    if (!Array.isArray(actual) || !Array.isArray(expected)) {
      throw new Error(`${message}. Both values must be arrays`);
    }
    if (actual.length !== expected.length) {
      throw new Error(
        `${message}. Different lengths: ${actual.length} vs ${expected.length}`
      );
    }
    for (let i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) {
        throw new Error(
          `${message}. Difference at index ${i}: ${actual[i]} vs ${expected[i]}`
        );
      }
    }
  }

  static assertObjectHasProperty(
    obj,
    property,
    message = "Object missing property"
  ) {
    if (!(property in obj)) {
      throw new Error(`${message}. Property '${property}' not found`);
    }
  }
}

/**
 * Test runner utilities
 */
class TestRunner {
  static async runTest(testName, testFunction) {
    const startTime = performance.now();
    let result = {
      name: testName,
      passed: false,
      duration: 0,
      error: null,
    };

    try {
      await testFunction();
      result.passed = true;
    } catch (error) {
      result.passed = false;
      result.error = error.message;
    }

    result.duration = Math.round(performance.now() - startTime);
    return result;
  }

  static async runTestSuite(suiteName, tests) {
    console.log(`🧪 Running ${suiteName} test suite...`);
    const results = [];

    for (const [testName, testFunction] of Object.entries(tests)) {
      const result = await this.runTest(testName, testFunction);
      results.push(result);
      console.log(
        `  ${result.passed ? "✅" : "❌"} ${testName} (${result.duration}ms)`
      );
    }

    const passed = results.filter((r) => r.passed).length;
    const total = results.length;
    console.log(`📊 ${suiteName}: ${passed}/${total} tests passed`);

    return results;
  }
}

/**
 * Mock canvas for testing
 */
class MockCanvas {
  constructor(width = 800, height = 600) {
    this.width = width;
    this.height = height;
    this.context = new MockCanvasContext();
  }

  getContext(type) {
    return this.context;
  }

  getBoundingClientRect() {
    return {
      left: 0,
      top: 0,
      width: this.width,
      height: this.height,
    };
  }
}

/**
 * Mock canvas context for testing
 */
class MockCanvasContext {
  constructor() {
    this.fillStyle = "#000000";
    this.strokeStyle = "#000000";
    this.lineWidth = 1;
    this.font = "10px sans-serif";
    this.textAlign = "start";
    this.textBaseline = "alphabetic";
    this.shadowColor = "rgba(0, 0, 0, 0)";
    this.shadowBlur = 0;
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 0;

    // Track drawing operations for testing
    this.operations = [];
  }

  // Drawing methods
  fillRect(x, y, width, height) {
    this.operations.push({ type: "fillRect", x, y, width, height });
  }

  strokeRect(x, y, width, height) {
    this.operations.push({ type: "strokeRect", x, y, width, height });
  }

  clearRect(x, y, width, height) {
    this.operations.push({ type: "clearRect", x, y, width, height });
  }

  arc(x, y, radius, startAngle, endAngle, anticlockwise = false) {
    this.operations.push({
      type: "arc",
      x,
      y,
      radius,
      startAngle,
      endAngle,
      anticlockwise,
    });
  }

  beginPath() {
    this.operations.push({ type: "beginPath" });
  }

  closePath() {
    this.operations.push({ type: "closePath" });
  }

  fill() {
    this.operations.push({ type: "fill" });
  }

  stroke() {
    this.operations.push({ type: "stroke" });
  }

  moveTo(x, y) {
    this.operations.push({ type: "moveTo", x, y });
  }

  lineTo(x, y) {
    this.operations.push({ type: "lineTo", x, y });
  }

  quadraticCurveTo(cpx, cpy, x, y) {
    this.operations.push({ type: "quadraticCurveTo", cpx, cpy, x, y });
  }

  fillText(text, x, y, maxWidth) {
    this.operations.push({ type: "fillText", text, x, y, maxWidth });
  }

  strokeText(text, x, y, maxWidth) {
    this.operations.push({ type: "strokeText", text, x, y, maxWidth });
  }

  createLinearGradient(x0, y0, x1, y1) {
    return new MockGradient();
  }

  createRadialGradient(x0, y0, r0, x1, y1, r1) {
    return new MockGradient();
  }

  // Utility methods for testing
  getOperations() {
    return this.operations;
  }

  clearOperations() {
    this.operations = [];
  }

  getOperationCount(type) {
    return this.operations.filter((op) => op.type === type).length;
  }
}

/**
 * Mock gradient for testing
 */
class MockGradient {
  constructor() {
    this.colorStops = [];
  }

  addColorStop(offset, color) {
    this.colorStops.push({ offset, color });
  }
}

/**
 * Performance testing utilities
 */
class PerformanceTest {
  static measureExecutionTime(fn, iterations = 1000) {
    const startTime = performance.now();

    for (let i = 0; i < iterations; i++) {
      fn();
    }

    const endTime = performance.now();
    return {
      totalTime: endTime - startTime,
      averageTime: (endTime - startTime) / iterations,
      iterations,
    };
  }

  static measureMemoryUsage(fn) {
    if (!performance.memory) {
      return { error: "Memory measurement not supported" };
    }

    const beforeMemory = performance.memory.usedJSHeapSize;
    fn();
    const afterMemory = performance.memory.usedJSHeapSize;

    return {
      memoryUsed: afterMemory - beforeMemory,
      beforeMemory,
      afterMemory,
    };
  }

  static async measureFrameRate(fn, duration = 1000) {
    let frameCount = 0;
    const startTime = performance.now();
    let lastFrameTime = startTime;

    return new Promise((resolve) => {
      function frame() {
        const currentTime = performance.now();

        if (currentTime - startTime < duration) {
          fn();
          frameCount++;
          requestAnimationFrame(frame);
        } else {
          const totalTime = currentTime - startTime;
          const fps = (frameCount * 1000) / totalTime;
          resolve({
            fps,
            frameCount,
            duration: totalTime,
          });
        }
      }

      requestAnimationFrame(frame);
    });
  }
}

/**
 * Game state utilities for testing
 */
class GameTestUtils {
  static createMockThemeManager() {
    return {
      currentTheme: { name: "Test" },
      getColors: () => ({
        paddle: "#ffffff",
        ball: "#ffffff",
        powerUps: {
          widePaddle: "#00ff00",
          multiBall: "#ff0000",
          slowBall: "#0000ff",
          laser: "#ffff00",
        },
      }),
      getEffects: () => ({
        shadowBlur: 0,
        glowIntensity: 0,
      }),
    };
  }

  static createMockCanvas() {
    return new MockCanvas();
  }

  static createTestBrick(x = 0, y = 0, hits = 1) {
    return {
      x,
      y,
      width: 60,
      height: 20,
      hits,
      maxHits: hits,
      destroyed: false,
      color: "#ff4444", // Use a color that contains "44" for testing color changes
      points: 10,
    };
  }

  static simulateKeyPress(key, target = document) {
    const event = new KeyboardEvent("keydown", { key });
    target.dispatchEvent(event);
  }

  static simulateKeyRelease(key, target = document) {
    const event = new KeyboardEvent("keyup", { key });
    target.dispatchEvent(event);
  }

  static simulateMouseMove(x, y, target) {
    const event = new MouseEvent("mousemove", {
      clientX: x,
      clientY: y,
    });
    target.dispatchEvent(event);
  }

  static simulateClick(x, y, target) {
    const event = new MouseEvent("click", {
      clientX: x,
      clientY: y,
    });
    target.dispatchEvent(event);
  }
}

// Export utilities for global use
window.TestAssert = TestAssert;
window.TestRunner = TestRunner;
window.MockCanvas = MockCanvas;
window.MockCanvasContext = MockCanvasContext;
window.PerformanceTest = PerformanceTest;
window.GameTestUtils = GameTestUtils;

console.log("🧪 Test utilities loaded successfully");
