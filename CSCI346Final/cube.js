
/**
 * 
 * @author:  Edward Angel
 * Modified by Marietta E. Cameron, Justin Blankenship, David Cable, Lucas Clark
 * Last Modified: 02-26-2016
 * 
 * Draws a Truncated Cube on screen with blended colors
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

    var cube = generateCube();

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

    drawObject(gl, program, cube, axis);
}//CanvasMain




/**
 * Generate Cube creates the geometry for the cube object (setup vertices, colors, and indices)
 * @returns {generateCube.cube}
 */
function generateCube() {

    var s = .5;    //sets desired size of polyhedron
    var p = s/3;   
    
    var vertices = [
        vec4(-s, p, s),   //0  front octagon face
        vec4(-p, s, s),   //1
        vec4(p, s, s),    //2
        vec4(s, p, s),    //3
        vec4(s, -p, s),   //4
        vec4(p, -s, s),   //5
        vec4(-p, -s, s),  //6
        vec4(-s, -p, s),  //7
        
        vec4(-s, p, -s),  //8  left octagon face
        vec4(-s, s, -p),  //9
        vec4(-s, s, p),   //10
        vec4(-s, -s, p),  //11
        vec4(-s, -s, -p), //12
        vec4(-s, -p, -s), //13
        
        vec4(-p, -s, -s), //14  rear octagon face
        vec4(p, -s, -s),  //15
        vec4(s, -p, -s),  //16
        vec4(s, p, -s),   //17
        vec4(p, s, -s),   //18
        vec4(-p, s, -s),  //19
        
        vec4(s, s, -p),   //20  right octagon face
        vec4(s, s, p),    //21
        vec4(s, -s, p),   //22
        vec4(s, -s, -p)   //23
    ];
    
    
    //Remember webGl has only triangles as fragment primitives
    var indices = [
        0, 1, 2,     //0  front octagon face
        0, 2, 3,     //1
        0, 3, 4,     //2
        0, 4, 5,     //3
        0, 5, 6,     //4
        0, 6, 7,     //5
        
        0, 7, 11,    //6  left octagon face
        0, 11, 12,   //7
        0, 12, 13,   //8
        0, 13, 8,    //9
        0, 8, 9,     //10
        0, 9, 10,    //11
        
        8, 13, 14,   //12  rear octagon face
        8, 14, 15,   //13
        8, 15, 16,   //14
        8, 16, 17,   //15
        8, 17, 18,   //16
        8, 18, 19,   //17
        
        3, 21, 20,   //18  right octagon face
        3, 20, 17,   //19
        3, 17, 16,   //20
        3, 16, 23,   //21
        3, 23, 22,   //22
        3, 22, 4,    //23
        
        1, 10, 9,    //24  top octagon face
        1, 9, 19,    //25
        1, 19, 18,   //26
        1, 18, 20,   //27
        1, 20, 21,   //28
        1, 21, 2,    //29
        
        5, 22, 23,   //30  bottom octagon face
        5, 23, 15,   //31
        5, 15, 14,   //32
        5, 14, 12,   //33
        5, 12, 11,   //34
        5, 11, 6,    //35
        
        11, 7, 6,    //36  bottom front left corner face
        5, 4, 22,    //37  bottom front right corner face
        
        23, 16, 15,  //38  bottom rear right corner face
        14, 13, 12,  //39  bottom rear left corner face

        8, 19, 9,    //40  top rear left corner face
        18, 17, 20,  //41  top rear right corner face
        
        21, 3, 2,    //42  top front right corner face
        10, 1, 0     //43  top front left corner face
    ];
    
    
    var colors = [
        vec4(0, 0, 1, 1),  //0
        vec4(0, 0, 0, 1),  //1
        vec4(0, 1, 1, 1),  //2
        vec4(0, 1, 0, 1),  //3
        vec4(0, 0, 1, 1),  //4
        vec4(0, 0, 0, 1),  //5
        vec4(0, 1, 1, 1),  //6
        vec4(0, 1, 0, 1),  //7
        vec4(0, 0, 1, 1),  //8
        vec4(0, 0, 0, 1),  //9
        vec4(0, 1, 1, 1),  //10
        vec4(0, 1, 0, 1),  //11
        vec4(1, 0, 1, 1),  //12
        vec4(1, 0, 0, 1),  //13
        vec4(1, 1, 1, 1),  //14
        vec4(1, 1, 0, 1),  //15
        vec4(1, 0, 1, 1),  //16
        vec4(1, 0, 0, 1),  //17
        vec4(1, 1, 1, 1),  //18
        vec4(1, 1, 0, 1),  //19
        vec4(1, 0, 1, 1),  //20
        vec4(1, 0, 0, 1),  //21
        vec4(1, 1, 1, 1),  //22
        vec4(1, 1, 0, 1)];  //23

    //example of an object in java script 
    var cube = {vertices: vertices, indices: indices, colors: colors, primtype: gl.TRIANGLES};

    return cube;
}//generateCube



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

    gl.drawElements(gl.TRIANGLES, elementCount, gl.UNSIGNED_SHORT, 0);  //draw elements  ... elementCount number of indices  

    requestAnimFrame( render );  
}