/**
 * Paddle Unit Tests
 * Tests for Paddle entity functionality
 */

// Mock global dependencies for testing
window.themeManager = GameTestUtils.createMockThemeManager();
window.canvas = GameTestUtils.createMockCanvas();

const paddleTests = {
  "Paddle Constructor - Creates paddle with correct properties": () => {
    const paddle = new Paddle(100, 200, 80, 15);

    TestAssert.assertEqual(paddle.x, 100, "Paddle X position incorrect");
    TestAssert.assertEqual(paddle.y, 200, "Paddle Y position incorrect");
    TestAssert.assertEqual(paddle.width, 80, "Paddle width incorrect");
    TestAssert.assertEqual(paddle.height, 15, "Paddle height incorrect");
    TestAssert.assertEqual(paddle.speed, 8, "Paddle speed incorrect");
    TestAssert.assertEqual(
      paddle.originalWidth,
      80,
      "Original width not stored"
    );
    TestAssert.assertFalse(
      paddle.hasLaser,
      "Paddle should not have laser initially"
    );
  },

  "Paddle Movement - Left arrow key": () => {
    const paddle = new Paddle(100, 200, 80, 15);
    const keys = { ArrowLeft: true };
    const initialX = paddle.x;

    paddle.update(keys, 0);

    TestAssert.assertLessThan(paddle.x, initialX, "Paddle should move left");
    TestAssert.assertEqual(
      paddle.x,
      initialX - paddle.speed,
      "Paddle should move by speed amount"
    );
  },

  "Paddle Movement - Right arrow key": () => {
    const paddle = new Paddle(100, 200, 80, 15);
    const keys = { ArrowRight: true };
    const initialX = paddle.x;

    paddle.update(keys, 0);

    TestAssert.assertGreaterThan(
      paddle.x,
      initialX,
      "Paddle should move right"
    );
    TestAssert.assertEqual(
      paddle.x,
      initialX + paddle.speed,
      "Paddle should move by speed amount"
    );
  },

  "Paddle Movement - Left boundary constraint": () => {
    const paddle = new Paddle(5, 200, 80, 15);
    const keys = { ArrowLeft: true };

    paddle.update(keys, 0);

    TestAssert.assertGreaterThan(
      paddle.x,
      -1,
      "Paddle should not go past left boundary"
    );
  },

  "Paddle Movement - Right boundary constraint": () => {
    const paddle = new Paddle(750, 200, 80, 15);
    const keys = { ArrowRight: true };

    paddle.update(keys, 0);

    TestAssert.assertLessThan(
      paddle.x,
      canvas.width - paddle.width + 1,
      "Paddle should not go past right boundary"
    );
  },

  "Paddle Mouse Control - Follows mouse position": () => {
    const paddle = new Paddle(100, 200, 80, 15);
    const keys = {};
    const mouseX = 300;

    paddle.update(keys, mouseX);

    const expectedX = mouseX - paddle.width / 2;
    TestAssert.assertEqual(
      paddle.x,
      expectedX,
      "Paddle should center on mouse position"
    );
  },

  "Paddle Mouse Control - Boundary constraints": () => {
    const paddle = new Paddle(100, 200, 80, 15);
    const keys = {};

    // Test left boundary
    paddle.update(keys, 10);
    TestAssert.assertEqual(
      paddle.x,
      0,
      "Paddle should be constrained to left boundary"
    );

    // Test right boundary
    paddle.update(keys, canvas.width - 10);
    TestAssert.assertEqual(
      paddle.x,
      canvas.width - paddle.width,
      "Paddle should be constrained to right boundary"
    );
  },

  "Paddle Reset - Restores original properties": () => {
    const paddle = new Paddle(100, 200, 80, 15);

    // Modify paddle properties
    paddle.width = 150;
    paddle.hasLaser = true;
    paddle.color = "#ff0000";

    paddle.reset();

    TestAssert.assertEqual(
      paddle.width,
      paddle.originalWidth,
      "Width should be reset to original"
    );
    TestAssert.assertEqual(
      paddle.color,
      themeManager.getColors().paddle,
      "Color should be reset"
    );
  },

  "Paddle Render - Calls correct canvas methods": () => {
    const paddle = new Paddle(100, 200, 80, 15);
    const mockCtx = new MockCanvasContext();

    paddle.render(mockCtx);

    TestAssert.assertGreaterThan(
      mockCtx.getOperationCount("beginPath"),
      0,
      "Should call beginPath"
    );
    TestAssert.assertGreaterThan(
      mockCtx.getOperationCount("fill"),
      0,
      "Should call fill"
    );
    TestAssert.assertGreaterThan(
      mockCtx.getOperationCount("quadraticCurveTo"),
      0,
      "Should draw rounded corners"
    );
  },

  "Paddle Laser Properties - Laser cooldown management": () => {
    const paddle = new Paddle(100, 200, 80, 15);

    TestAssert.assertEqual(
      paddle.lastLaserTime,
      0,
      "Initial laser time should be 0"
    );
    TestAssert.assertEqual(
      paddle.laserCooldown,
      200,
      "Laser cooldown should be 200ms"
    );

    paddle.lastLaserTime = Date.now();
    TestAssert.assertGreaterThan(
      paddle.lastLaserTime,
      0,
      "Laser time should be updated"
    );
  },
};

// Function to run paddle tests
async function runPaddleTests() {
  const results = await TestRunner.runTestSuite(
    "Paddle Unit Tests",
    paddleTests
  );
  testResults.unit.push(...results);
  return results;
}
