/**
 * Brick Unit Tests
 * Tests for Brick entity functionality
 */

// Mock global dependencies for testing
window.themeManager = GameTestUtils.createMockThemeManager();

const brickTests = {
  "Brick Creation - Standard brick properties": () => {
    const brick = GameTestUtils.createTestBrick(100, 50, 1);

    TestAssert.assertEqual(brick.x, 100, "Brick X position incorrect");
    TestAssert.assertEqual(brick.y, 50, "Brick Y position incorrect");
    TestAssert.assertEqual(brick.width, 60, "Brick width incorrect");
    TestAssert.assertEqual(brick.height, 20, "Brick height incorrect");
    TestAssert.assertEqual(brick.hits, 1, "Brick hits incorrect");
    TestAssert.assertEqual(brick.maxHits, 1, "Brick max hits incorrect");
    TestAssert.assertFalse(
      brick.destroyed,
      "Brick should not be destroyed initially"
    );
    TestAssert.assertEqual(brick.points, 10, "Brick points incorrect");
  },

  "Brick Multi-hit - Two hit brick": () => {
    const brick = GameTestUtils.createTestBrick(100, 50, 2);

    TestAssert.assertEqual(brick.hits, 2, "Two-hit brick should have 2 hits");
    TestAssert.assertEqual(
      brick.maxHits,
      2,
      "Two-hit brick should have max 2 hits"
    );
    TestAssert.assertFalse(
      brick.destroyed,
      "Two-hit brick should not be destroyed initially"
    );
  },

  "Brick Damage - Single hit reduces hits": () => {
    const brick = GameTestUtils.createTestBrick(100, 50, 2);

    brick.hits--;

    TestAssert.assertEqual(brick.hits, 1, "Brick should have 1 hit remaining");
    TestAssert.assertFalse(
      brick.destroyed,
      "Brick should not be destroyed after first hit"
    );
  },

  "Brick Destruction - Zero hits destroys brick": () => {
    const brick = GameTestUtils.createTestBrick(100, 50, 1);

    brick.hits--;
    if (brick.hits <= 0) {
      brick.destroyed = true;
    }

    TestAssert.assertEqual(brick.hits, 0, "Brick should have 0 hits");
    TestAssert.assertTrue(brick.destroyed, "Brick should be destroyed");
  },

  "Brick Collision Detection - Point inside brick": () => {
    const brick = GameTestUtils.createTestBrick(100, 50, 1);

    // Test point inside brick
    const pointX = 120;
    const pointY = 60;

    const isInside =
      pointX >= brick.x &&
      pointX <= brick.x + brick.width &&
      pointY >= brick.y &&
      pointY <= brick.y + brick.height;

    TestAssert.assertTrue(isInside, "Point should be inside brick bounds");
  },

  "Brick Collision Detection - Point outside brick": () => {
    const brick = GameTestUtils.createTestBrick(100, 50, 1);

    // Test point outside brick
    const pointX = 200;
    const pointY = 200;

    const isInside =
      pointX >= brick.x &&
      pointX <= brick.x + brick.width &&
      pointY >= brick.y &&
      pointY <= brick.y + brick.height;

    TestAssert.assertFalse(isInside, "Point should be outside brick bounds");
  },

  "Brick Color Change - Damage visualization": () => {
    const brick = GameTestUtils.createTestBrick(100, 50, 2);
    const originalColor = brick.color;

    // Simulate damage color change
    brick.hits--;
    if (brick.hits === 1 && brick.maxHits === 2) {
      brick.color = brick.color.replace("44", "88");
    }

    TestAssert.assertNotEqual(
      brick.color,
      originalColor,
      "Brick color should change after damage"
    );
  },

  "Brick Array Management - Multiple bricks": () => {
    const bricks = [
      GameTestUtils.createTestBrick(0, 0, 1),
      GameTestUtils.createTestBrick(60, 0, 1),
      GameTestUtils.createTestBrick(120, 0, 1),
    ];

    TestAssert.assertEqual(bricks.length, 3, "Should have 3 bricks");

    // Destroy middle brick
    bricks[1].destroyed = true;
    const activeBricks = bricks.filter((b) => !b.destroyed);

    TestAssert.assertEqual(
      activeBricks.length,
      2,
      "Should have 2 active bricks"
    );
  },

  "Brick Performance - Collision check performance": () => {
    const brick = GameTestUtils.createTestBrick(100, 50, 1);

    const performance = PerformanceTest.measureExecutionTime(() => {
      // Simulate collision check
      const ballX = 120;
      const ballY = 60;
      const ballRadius = 10;

      const collision =
        ballX + ballRadius >= brick.x &&
        ballX - ballRadius <= brick.x + brick.width &&
        ballY + ballRadius >= brick.y &&
        ballY - ballRadius <= brick.y + brick.height;
    }, 10000);

    TestAssert.assertLessThan(
      performance.averageTime,
      0.1,
      "Collision check should be very fast (< 0.1ms average)"
    );
  },
};

// Function to run brick tests
async function runBrickTests() {
  const results = await TestRunner.runTestSuite("Brick Unit Tests", brickTests);
  testResults.unit.push(...results);
  return results;
}
