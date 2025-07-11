/**
 * Ball Unit Tests
 * Tests for Ball entity functionality
 */

// Mock global dependencies for testing
window.themeManager = GameTestUtils.createMockThemeManager();
window.canvas = GameTestUtils.createMockCanvas();

const ballTests = {
  "Ball Constructor - Creates ball with correct properties": () => {
    const ball = new Ball(100, 200, 10);

    TestAssert.assertEqual(ball.x, 100, "Ball X position incorrect");
    TestAssert.assertEqual(ball.y, 200, "Ball Y position incorrect");
    TestAssert.assertEqual(ball.radius, 10, "Ball radius incorrect");
    TestAssert.assertEqual(ball.speed, 6, "Ball speed incorrect");
    TestAssert.assertEqual(
      ball.velocityX,
      0,
      "Ball initial velocityX should be 0"
    );
    TestAssert.assertEqual(
      ball.velocityY,
      0,
      "Ball initial velocityY should be 0"
    );
  },

  "Ball Launch - Sets velocity correctly": () => {
    const ball = new Ball(100, 200, 10);
    ball.launch();

    TestAssert.assertNotEqual(
      ball.velocityX,
      0,
      "Ball velocityX should be set after launch"
    );
    TestAssert.assertNotEqual(
      ball.velocityY,
      0,
      "Ball velocityY should be set after launch"
    );
    TestAssert.assertLessThan(
      ball.velocityY,
      0,
      "Ball should move upward after launch"
    );
  },

  "Ball Update - Moves ball correctly": () => {
    // Mock game state
    window.gameState = "playing";
    window.GAME_STATES = {
      BALL_ON_PADDLE: "ball_on_paddle",
      PLAYING: "playing",
    };

    const ball = new Ball(100, 200, 10);
    ball.velocityX = 5;
    ball.velocityY = -3;

    const initialX = ball.x;
    const initialY = ball.y;

    ball.update();

    TestAssert.assertEqual(
      ball.x,
      initialX + 5,
      "Ball X position not updated correctly"
    );
    TestAssert.assertEqual(
      ball.y,
      initialY - 3,
      "Ball Y position not updated correctly"
    );
  },

  "Ball Wall Collision - Left wall": () => {
    window.gameState = "playing";
    window.GAME_STATES = { PLAYING: "playing" };

    const ball = new Ball(5, 200, 10);
    ball.velocityX = -5;
    ball.velocityY = -3;

    ball.update();

    TestAssert.assertGreaterThan(
      ball.velocityX,
      0,
      "Ball should bounce off left wall"
    );
    TestAssert.assertEqual(
      ball.x,
      ball.radius,
      "Ball should be positioned at wall boundary"
    );
  },

  "Ball Wall Collision - Right wall": () => {
    window.gameState = "playing";
    window.GAME_STATES = { PLAYING: "playing" };

    const ball = new Ball(795, 200, 10);
    ball.velocityX = 5;
    ball.velocityY = -3;

    ball.update();

    TestAssert.assertLessThan(
      ball.velocityX,
      0,
      "Ball should bounce off right wall"
    );
    TestAssert.assertEqual(
      ball.x,
      canvas.width - ball.radius,
      "Ball should be positioned at wall boundary"
    );
  },

  "Ball Wall Collision - Top wall": () => {
    window.gameState = "playing";
    window.GAME_STATES = { PLAYING: "playing" };

    const ball = new Ball(400, 5, 10);
    ball.velocityX = 3;
    ball.velocityY = -5;

    ball.update();

    TestAssert.assertGreaterThan(
      ball.velocityY,
      0,
      "Ball should bounce off top wall"
    );
    TestAssert.assertEqual(
      ball.y,
      ball.radius,
      "Ball should be positioned at wall boundary"
    );
  },

  "Ball Render - Calls correct canvas methods": () => {
    const ball = new Ball(100, 200, 10);
    const mockCtx = new MockCanvasContext();

    ball.render(mockCtx);

    TestAssert.assertGreaterThan(
      mockCtx.getOperationCount("beginPath"),
      0,
      "Should call beginPath"
    );
    TestAssert.assertGreaterThan(
      mockCtx.getOperationCount("arc"),
      0,
      "Should call arc"
    );
    TestAssert.assertGreaterThan(
      mockCtx.getOperationCount("fill"),
      0,
      "Should call fill"
    );
  },

  "Ball Performance - Update performance": () => {
    const ball = new Ball(100, 200, 10);
    window.gameState = "playing";

    const performance = PerformanceTest.measureExecutionTime(() => {
      ball.update();
    }, 1000);

    TestAssert.assertLessThan(
      performance.averageTime,
      1,
      "Ball update should be fast (< 1ms average)"
    );
  },
};

// Function to run ball tests
async function runBallTests() {
  const results = await TestRunner.runTestSuite("Ball Unit Tests", ballTests);
  testResults.unit.push(...results);
  return results;
}
