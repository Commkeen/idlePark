class gameMapGenerator{


    static createMap(size:Phaser.Point, num:number):gameMapModel{

        var model:gameMapModel = new gameMapModel(size);

        for (var i = 0; i < num; i++)
        {
            var x = Math.random()*size.x;
            var y = Math.random()*size.y;
            model.definitionPoints.push(new Phaser.Point(Math.floor(x),Math.floor(y)));
        }
        
        var result = Delaunay.triangulate(model.definitionPoints.map(v => [v.x,v.y]));
        for (var i = 0; i < result.length; i+=3)
        {
            model.delaunayTriangles.push([result[i], result[i+1], result[i+2]]);
        }

        //temp
        for (var tri of model.delaunayTriangles)
        {
            var pointArray = [model.definitionPoints[tri[2]], model.definitionPoints[tri[1]], model.definitionPoints[tri[0]]];
            var newPoly = new Phaser.Polygon();
            newPoly.setTo(pointArray);
            newPoly.flatten();
            model.voronoiPolygons.push(newPoly);
        }

        return model;

    }

}