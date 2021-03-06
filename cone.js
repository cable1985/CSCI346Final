
/** 
 * 
 * @author:  Edward Angel
 * Modified by Marietta E. Cameron, Justin Blankenship, David Cable, Lucas Clarke
 * Last Modified: 04-23-2016
 * 
 * Draws a Cone on screen with blended colors. Changing the radius
 * makes different shapes, like regular cylinders or pure cones.
 */

var gl;

var xAxis = 0; //used as a subscript in theta array
var yAxis = 1; //used as a subscript in theta array
var zAxis = 2; //used as a subscript in theta array
var pauseAxis = 3;
var flag = true;

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

    var cylinder = generateCylinder();

    gl.viewport(0, 0, canvas.width, canvas.height);   
    
  
    //event listeners for buttons    
    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis; 
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;   
    };
    document.getElementById( "pButton" ).onclick = function () {
        axis = pauseAxis;   
    };
    document.getElementById("pButton").onclick = function(){flag = !flag;};    

    drawObject(gl, program, cylinder, axis);
}//CanvasMain




/**
 * Generate Cylinder creates the geometry for the cylinder object (setup vertices, colors, and indices)
 * @returns {generateCylinder.cylinder}
 */
function generateCylinder() {

    var radius = 0.5;    //sets desired radius size  
    
    // generate vertices
    var vertices = [];
    
    //circle face
    var inc = 2*Math.PI / 100;
    for (var theta = 0; theta < 2*Math.PI; theta += inc){
        vertices.push(vec4(0.5*Math.cos(theta), 0.5* Math.sin(theta), -0.8, 1));
    }
    // middle of circle
    vertices.push(vec4(0, 0, -0.7, 1)); // center point #40
    //middle of circle at opposite end to create cone
    vertices.push(vec4(0, 0, 0.7, 1)); // center point #41
   var last = vertices.length-1;
   
//generate indices
    var indices = [];
    
    for (var i = 0; i < last-1; i++) {
        indices.push(i, last-1, i+1);
    }
    indices.push(last-2, 1, last-1);
    
    
    for (var i = 0; i < last; i++) {
        if(i !== last-2){
         indices.push(i+1, last, i);
        }
    }
    indices.push(last-2,1,last);
    
    //generate colors (used colors from previous assignment)
    var colors = [];
    for (var i = 0; i < vertices.length; i++) {
        colors.push(vec4(Math.random(), Math.random(), Math.random(), 1));
        colors.push(vec4(Math.random(), Math.random(), Math.random(), 1));
        colors.push(vec4(Math.random(), Math.random(), Math.random(), 1));
    }
    

    //example of an object in java script 
    var cylinder = {vertices: vertices, indices: indices, colors: colors, primtype: gl.TRIANGLES};

    return cylinder;
}//generateCylinder



function drawObject(gl, program, obj, viewAxis) {
   
    // clear the background (with black)
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // set the shader to use
    gl.useProgram(program);


    // array element buffer

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(obj.indices), gl.STATIC_DRAW);

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
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation(program, "theta");
    axis = viewAxis;
    elementCount = obj.indices.length;
    
    
    render();
   
}//drawObject

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    if(flag) theta[axis] += 0.5; // rotate the axis by desired degrees

    gl.uniform3fv(thetaLoc, theta); //find theta in html  and set it

    gl.drawElements(gl.LINES, elementCount, gl.UNSIGNED_SHORT, 0);  //draw elements  ... elementCount number of indices  
    
    requestAnimFrame( render );  
}
