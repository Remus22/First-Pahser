/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};


game_state.main = function() {};
game_state.main.prototype = {


    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/Sapphire.png');
        game.load.spritesheet('Black Mage', 'assets/Black Mage.png', 192, 192 );

    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.physics.startSystem(Phaser.Physics.Arcade);
        game.add.sprite(0, 0, 'star');
        game.add.sprite(0, 0, 'sky');
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        
        var ledge = this.platforms.create(200, 400, 'ground');
        ledge.body.immovable = true;
        var ledge= this.platforms.create(500, 100, 'ground');
        ledge.body.immovable = true;
        ledge.width=100
        var ledge= this.platforms.create(150, 250, 'ground');
        ledge.body.immovable = true;
        
          
        this.player = game.add.sprite(32, game.world.height - 180, 'Black Mage');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 1 - 0.8;
        this.player.body.gravity.y = 400 - 50;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [1, 2], 10, true);     
        this.player.animations.add('right', [3, 4], 10, true);
        this.player.scale.setTo(0.5,0.5);
            
        
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.stars = game.add.group();
        this.stars.enableBody = true;
        for (var i = 0; i < 12; i++) {  
            var star = this.stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.6 + Math.random() * 0.2;

        }
        this.scoreText = game.add.text(16, 16, 'score: 0', {
            fontsize: '32px',
            fill: '#000'
        });
        this.score = 0;
    },



    update: function() {
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.platforms, this.stars);
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        
        
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
        }
        else {
            this.player.animations.stop();
            this.player.frame = 0;
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
    
     this.player.body.setSize(170, 170, 2,1);
     

    },
    collectStar: function(player, star) {
        this.score++;
        this.scoreText.text = "Score: " + this.score;
        star.kill();
           var star = this.stars.create( Math.random() * 800, Math.random() * 600, 'star');
            star.body.gravity.y = 300;
            star.body.bounce.y = .5 + Math.random() * .5;
            ;
    }
};
game.state.add('main', game_state.main);



