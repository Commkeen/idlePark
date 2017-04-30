

class gameMapModel
{
    size:Phaser.Point;
    definitionPoints:Array<Phaser.Point>; //points from which the diagram is derived
    delaunayTriangles:Array<Array<number>>; //array of triangles, each vertex is an index into definitionPoints
    delaunayCircumcenters = new Array<Phaser.Point>(); //circumcenters aligned to above index
    voronoiPolygons:Array<Phaser.Polygon>; //polygons corresponding by index to definitionPoints

    constructor(size:Phaser.Point)
    {
        this.size = size;
        this.definitionPoints = new Array<Phaser.Point>();
        this.delaunayTriangles = new Array<Array<number>>();
        this.delaunayCircumcenters = new Array<Phaser.Point>();
        this.voronoiPolygons = new Array<Phaser.Polygon>();
    }
}