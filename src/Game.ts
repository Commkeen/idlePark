class SimpleGame
{
	game:Phaser.Game;
	mapModel:gameMapModel;
	graphics:Phaser.Graphics;
	
	constructor()
	{
		// create our phaser game
		// 800 - width
		// 600 - height
		// Phaser.AUTO - determine the renderer automatically (canvas, webgl)
		// 'content' - the name of the container to add our game to
		// { preload:this.preload, create:this.create} - functions to call for our states
		this.game = new Phaser.Game( 800, 600, Phaser.AUTO, 'content', { preload:this.preload, create:this.create, update:this.update} );
		
	}
	
	preload()
	{
		// add our player image to the assets class under the
		// key 'player'. We're also setting the background colour
		// so it's the same as the background colour in the image
		
		//this.game.load.spritesheet( 'player', "assets/player.png", 16, 32);
		//this.game.stage.backgroundColor = 0xB20059;
	}
	
	create()
	{
		// add the 'player' sprite to the game, position it in the
		// center of the screen, and set the anchor to the center of
		// the image so it's centered properly. There's a lot of
		// centering in that last sentence
		
		//var player = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'player' );
		//player.anchor.setTo( 0.5, 0.5 );
		//this.game.camera.scale.x = 2;
		//this.game.camera.scale.y = 2;
		//this.game.camera.follow(player);

		this.graphics = this.game.add.graphics(0,0);
		this.mapModel = gameMapGenerator.createMap(new Phaser.Point(800,600), 10);

		
	}

	update()
	{
		this.graphics.clear();
		this.graphics.lineStyle(1, 0xffd900, 1);
		for (var poly of this.mapModel.voronoiPolygons){
			if (poly.contains(this.game.input.x, this.game.input.y))
			{
				this.graphics.beginFill(Phaser.Color.getColor(50, 50, 255));
			}
			else
			{
				this.graphics.beginFill(Phaser.Color.getColor(50, 255, 100));
			}
			this.graphics.drawPolygon(poly);
			this.graphics.endFill();
		}
	}
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new SimpleGame();
}