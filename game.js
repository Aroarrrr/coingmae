// Define variables
var game;
var player;
var platforms;
var items;
var cursors;
var jumpButton; // This will represent the up arrow
var text;
var levelText; 
var currentScore = 0; 
var level = 1; 

// Setup game when the web page loads
window.onload = function () {
    game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    // Preload assets
    function preload() {
        game.stage.backgroundColor = '#5db1ad';
        game.load.image('platform', 'platform_1.png');
        game.load.image('platform2', 'platform_2.png');
        game.load.spritesheet('player', 'chalkers.png', 48, 62);
        game.load.spritesheet('coin', 'coin.png', 36, 44);
        game.load.spritesheet('poison', 'poison.png', 32, 32);
        game.load.spritesheet('star', 'star.png', 32, 32);
    }

    // Initial game setup
    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE); // Start the physics system

        player = game.add.sprite(50, 500, 'player'); // Starting position
        player.animations.add('walk', [0, 1, 2, 3], 10, true);
        player.anchor.setTo(0.5, 1);
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 500; // Set gravity

        resetGame();

        cursors = game.input.keyboard.createCursorKeys(); // Create cursor keys
        jumpButton = jumpButton; // Set jumpButton to the up arrow

        text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
        levelText = game.add.text(game.world.width - 150, 16, "LEVEL: " + level, { font: "bold 24px Arial", fill: "white" });
        levelText.anchor.setTo(1, 0);
    }

    // Reset the game state
    function resetGame() {
        if (items) items.removeAll(); 
        if (platforms) platforms.removeAll();

        items = game.add.physicsGroup();
        platforms = game.add.physicsGroup();
        currentScore = 0;

        if (level === 1) {
            loadLevelOne();
        } else if (level === 2) {
            loadLevelTwo();
        }
    }

    // Load Level 1 items and platforms
    function loadLevelOne() {
        addLevel1Items();
        addLevel1Platforms();
    }

    // Load Level 2 items and platforms
    function loadLevelTwo() {
        addLevel2Items();
        addLevel2Platforms();
    }

    // Level 1 items and platforms
    function addLevel1Items() {
        createItem(375, 400, 'coin');
        createItem(575, 500, 'coin');
        createItem(225, 500, 'coin');
        createItem(100, 250, 'coin');
        createItem(575, 150, 'coin');
        createItem(525, 300, 'coin');
        createItem(650, 250, 'coin');
        createItem(225, 200, 'coin');
        createItem(375, 100, 'poison');
        createItem(370, 500, 'poison');
        createItem(100, 375, 'poison');
        createItem(125, 50, 'star');
    }

    function addLevel1Platforms() {
        createPlatform(450, 550, 'platform');
        createPlatform(100, 550, 'platform');
        createPlatform(300, 450, 'platform');
        createPlatform(250, 150, 'platform');
        createPlatform(50, 300, 'platform');
        createPlatform(150, 250, 'platform');
        createPlatform(650, 300, 'platform');
        createPlatform(550, 200, 'platform2');
        createPlatform(300, 450, 'platform2');
        createPlatform(400, 350, 'platform2');
        createPlatform(100, 100, 'platform2');
    }

    // Level 2 items and platforms
    function addLevel2Items() {
        createItem(150, 500, 'coin');
        createItem(600, 400, 'coin');
        createItem(300, 300, 'poison');
        createItem(700, 150, 'star');
        createItem(200, 200, 'coin');
        createItem(400, 250, 'poison');
        createItem(500, 100, 'coin');
    }

    function addLevel2Platforms() {
        createPlatform(100, 550, 'platform');
        createPlatform(200, 450, 'platform2');
        createPlatform(400, 350, 'platform');
        createPlatform(600, 250, 'platform2');
        createPlatform(700, 400, 'platform');
        createPlatform(300, 200, 'platform');
        createPlatform(500, 300, 'platform2');
    }

    // Create a single animated item and add to screen
    function createItem(left, top, image) {
        var item = items.create(left, top, image);
        item.animations.add('spin');
        item.animations.play('spin', 10, true);
        game.physics.arcade.enable(item);
        item.body.immovable = true;
    }

    // Create a platform and add to screen
    function createPlatform(left, top, image) {
        var platform = platforms.create(left, top, image);
        game.physics.arcade.enable(platform);
        platform.body.immovable = true; 
        platform.body.allowGravity = false; // Platforms should not be affected by gravity
    }

    function update() {
        text.text = "SCORE: " + currentScore;
        levelText.text = "LEVEL: " + level;

        game.physics.arcade.collide(player, platforms); // Handle collisions

        // Reset horizontal velocity
        player.body.velocity.x = 0;

        // Player movement
        if (cursors.left.isDown) {
            player.body.velocity.x = -300;
            player.animations.play('walk');
            player.scale.x = -1;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 300;
            player.animations.play('walk');
            player.scale.x = 1;
        } else {
            player.animations.stop();
        }

        // Jumping logic (using the up arrow)
        if (jumpButton.isDown && player.body.touching.down) {
            player.body.velocity.y = -500; // Adjust the jump height if needed
        }

        // Debugging output
        console.log("Player position:", player.body.position);
        console.log("Player velocity:", player.body.velocity);
        console.log("Touching down:", player.body.touching.down);
        console.log("Jump button pressed:", jumpButton.isDown);
    }
}
