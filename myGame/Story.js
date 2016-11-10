/*global game phaser game_state*/
game_state.story = function() {};

game_state.story.prototype = {
    

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/Sapphire.png');
        game.load.spritesheet('Black Mage', 'assets/Black Mage.png', 192, 192 );
    },

    create: function() {
        
        this.storyText = game.add.text(200, game.world.height / 2, 'Welcome to the game./n Press up to start)',{
            fill: '#ffffff'
        });
        this.cursors = game.input.keyboard.createCursorKeys();
        this.space.inputEnabled = true;
        var gameNum = 1;
    },
    
    
    update: function() {
        if(this.cursor.down.isDown){ 
            
            game.state.start('main');
            
        }

},
},
game.state.add('story', game_state.story);
game.state.start('story');
