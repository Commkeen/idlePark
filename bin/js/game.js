var SimpleGame = (function () {
    function SimpleGame() {
        // create our phaser game
        // 800 - width
        // 600 - height
        // Phaser.AUTO - determine the renderer automatically (canvas, webgl)
        // 'content' - the name of the container to add our game to
        // { preload:this.preload, create:this.create} - functions to call for our states
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    SimpleGame.prototype.preload = function () {
        // add our player image to the assets class under the
        // key 'player'. We're also setting the background colour
        // so it's the same as the background colour in the image
        //this.game.load.spritesheet( 'player', "assets/player.png", 16, 32);
        //this.game.stage.backgroundColor = 0xB20059;
    };
    SimpleGame.prototype.create = function () {
        // add the 'player' sprite to the game, position it in the
        // center of the screen, and set the anchor to the center of
        // the image so it's centered properly. There's a lot of
        // centering in that last sentence
        //var player = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'player' );
        //player.anchor.setTo( 0.5, 0.5 );
        //this.game.camera.scale.x = 2;
        //this.game.camera.scale.y = 2;
        //this.game.camera.follow(player);
        this.graphics = this.game.add.graphics(0, 0);
        this.mapModel = gameMapGenerator.createMap(new Phaser.Point(800, 600), 10);
    };
    SimpleGame.prototype.update = function () {
        this.graphics.clear();
        this.graphics.lineStyle(1, 0xffd900, 1);
        for (var _i = 0, _a = this.mapModel.voronoiPolygons; _i < _a.length; _i++) {
            var poly = _a[_i];
            if (poly.contains(this.game.input.x, this.game.input.y)) {
                this.graphics.beginFill(Phaser.Color.getColor(50, 50, 255));
            }
            else {
                this.graphics.beginFill(Phaser.Color.getColor(50, 255, 100));
            }
            this.graphics.drawPolygon(poly);
            this.graphics.endFill();
        }
    };
    return SimpleGame;
}());
// when the page has finished loading, create our game
window.onload = function () {
    var game = new SimpleGame();
};
var gameMapGenerator = (function () {
    function gameMapGenerator() {
    }
    gameMapGenerator.createMap = function (size, num) {
        var model = new gameMapModel(size);
        for (var i = 0; i < num; i++) {
            var x = Math.random() * size.x;
            var y = Math.random() * size.y;
            model.definitionPoints.push(new Phaser.Point(Math.floor(x), Math.floor(y)));
        }
        var result = Delaunay.triangulate(model.definitionPoints.map(function (v) { return [v.x, v.y]; }));
        for (var i = 0; i < result.length; i += 3) {
            model.delaunayTriangles.push([result[i], result[i + 1], result[i + 2]]);
        }
        //temp
        for (var _i = 0, _a = model.delaunayTriangles; _i < _a.length; _i++) {
            var tri = _a[_i];
            var pointArray = [model.definitionPoints[tri[2]], model.definitionPoints[tri[1]], model.definitionPoints[tri[0]]];
            var newPoly = new Phaser.Polygon();
            newPoly.setTo(pointArray);
            newPoly.flatten();
            model.voronoiPolygons.push(newPoly);
        }
        return model;
    };
    return gameMapGenerator;
}());
var gameMapModel = (function () {
    function gameMapModel(size) {
        this.delaunayCircumcenters = new Array(); //circumcenters aligned to above index
        this.size = size;
        this.definitionPoints = new Array();
        this.delaunayTriangles = new Array();
        this.delaunayCircumcenters = new Array();
        this.voronoiPolygons = new Array();
    }
    return gameMapModel;
}());
