
/**
 * 
 * @author:  Edward Angel
 * Modified by: Marietta E. Cameron, David Cable, partner Justin Blankenship, Lucas Clarke
 */
var flag = true;
var draw;
var gl;
var xAxis = 0; //used as a subscript in theta array
var yAxis = 1; //used as a subscript in theta array
var zAxis = 2; //used as a subscript in theta array
var n = 100, m =100;
var axis = 0;
var theta = [0, 0, 0]; //rotation angle about x, y, z 
var thetaLoc;
var elementCount; //number of indices

function canvasMain() {
    //load webGL
    var canvas = document.getElementById("gl-canvas"); //must be in html
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }


    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");

    var shape = generateMountain();

    gl.viewport(0, 0, canvas.width, canvas.height);


    //event listeners for buttons    
    document.getElementById("xButton").onclick = function () {
        axis = xAxis;

    };
    document.getElementById("yButton").onclick = function () {
        axis = yAxis;

    };
    document.getElementById("zButton").onclick = function () {
        axis = zAxis;

    };
    
    document.getElementById("Pause").onclick = function(){flag = !flag;};
    
      
        drawMountain(gl, program, shape, axis);
   
    
    //drawMountain(gl, program, shape, axis);
}//CanvasMain

    

function generateShape(x, y) {

    var shapeVertices = [];
    var inc = 2 * Math.PI/50;
    for (var theta = 0; theta < 2 * Math.PI; theta += inc) {
        var a = h + r*Math.cos(theta);
        var b = k - r*Math.sin(theta);
        shapeVertices.push(vec2(x+a,y+b));
    }

    return shapeVertices;
    
    var colors = [];
    for(var i = 0; i < shapeVertices.length; i++){
        colors.push(vec4(0,1,1,1));
    }
};


function drawMountain(gl, program, obj, viewAxis) {
    
    //Background 
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // set the shader to use
    gl.useProgram(program);


    // color array atrribute buffer

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj.colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    // vertex array attribute buffer

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj.vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation(program, "theta");
    axis = viewAxis;
    elementCount = obj.indices.length;
    elementCount2 = obj.indices.length;
    

    render();

}//drawObject

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    if(flag) theta[axis] += 0.5;
    gl.uniform3fv(thetaLoc, theta); //find theta in html  and set it

    gl.drawElements(gl.POINTS, elementCount, gl.UNSIGNED_SHORT, 0);  //draw elements  ... elementCount number of indices  
    //gl.drawElements(gl.LINES, elementCount2, gl.UNSIGNED_SHORT, 0);
    requestAnimFrame(render);
}
