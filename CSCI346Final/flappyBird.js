
/**
 * 
 * @author:  Edward Angel
 * Modified by Marietta E. Cameron, David Cable, Justin Blankenship, Lucas Clarke
 * this is our rendition of FlappyBird; the original flappy bird game was created by Dong Nguyen
 */
var flag = true;
var gl;
var green = 0;
var blue = 0;
var xAxis = 0; //used as a subscript in theta array
var yAxis = 1; //used as a subscript in theta array
var zAxis = 2; //used as a subscript in theta array
var axis = 1;
var theta = [0, 0, 0]; //rotation angle about x, y, z 
var randomy = [Math.random() * .5  - 0.5, Math.random() * .5  - 0.25, Math.random() * .2  - 0.5];
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

    var bird = genBird();
    

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
    document.getElementById("Pause").onclick = function(){flag = !flag;};
  
    drawObject(gl, program, bird, axis);
    
}


function genBird() {
    
var flappyVertices = [
//A:  black
vec4(-0.2, 0.6,0.1,1),//0
vec4(0.4, 0.6,0.1,1),//1
vec4(0.4, 0.5,0.1,1),//2
vec4(-0.2, 0.5,0.1,1),//3

//B:  black
vec4(-0.4, 0.5,0.2,1),//4
vec4(-0.2, 0.5,0.2,1),//5
vec4(-0.2, 0.4,0.2,1),//6
vec4(-0.4, 0.4,0.2,1),//7

//C:  white
vec4(-0.2, 0.5,0.2,1),
vec4(0.1, 0.5,0.2,1),
vec4(0.1, 0.4,0.2,1),
vec4(-0.2, 0.4,0.2,1),

//D:  black
vec4(0.1, 0.5,0.2,1),
vec4(0.2, 0.5,0.2,1),
vec4(0.2, 0.4,0.2,1),
vec4(0.1, 0.4,0.2,1),

//E:  white
vec4(0.2, 0.5,0.2,1),
vec4(0.4, 0.5,0.2,1),
vec4(0.4, 0.4,0.2,1),
vec4(0.2, 0.4,0.2,1),

//F:  black
vec4(0.4, 0.5,0.2,1),
vec4(0.5, 0.5,0.2,1),
vec4(0.5, 0.4,0.2,1),
vec4(0.4, 0.4,0.2,1),

//G:  black
vec4(-0.5, 0.4,0.3,1),
vec4(-0.4, 0.4,0.3,1),
vec4(-0.4, 0.3,0.3,1),
vec4(-0.5, 0.3,0.3,1),

//H:  white
vec4(-0.4, 0.4,0.3,1),
vec4(-0.2, 0.4,0.3,1),
vec4(-0.2, 0.3,0.3,1),
vec4(-0.4, 0.3,0.3,1),

//I:  yellow
vec4(-0.2, 0.4,0.3,1),
vec4(0, 0.4,0.3,1),
vec4(0, 0.1,0.3,1),
vec4(-0.2, 0.1,0.3,1),

//J:  black
vec4(0, 0.4,0.3,1),
vec4(0.1, 0.4,0.3,1),
vec4(0.1, 0.1,0.3,1),
vec4(0, 0.1,0.3,1),

//K:  white
vec4(0.1, 0.4,0.2,1),
vec4(0.5, 0.4,0.2,1),
vec4(0.5, 0.3,0.2,1),
vec4(0.1, 0.3,0.2,1),

//L:  black
vec4(0.5, 0.4,0.2,1),
vec4(0.6, 0.4,0.2,1),
vec4(0.6, 0.3,0.2,1),
vec4(0.5, 0.3,0.2,1),

//M:  black
vec4(-0.7, 0.3,0.4,1),
vec4(-0.3, 0.3,0.4,1),
vec4(-0.3, 0.2,0.4,1),
vec4(-0.7, 0.2,0.4,1),

//N:  yellow
vec4(-0.3, 0.3,0.4,1),
vec4(-0.2, 0.3,0.4,1),
vec4(-0.2, 0.2,0.4,1),
vec4(-0.3, 0.2,0.4,1),

//O:  white
vec4(0.1, 0.3,0.3,1),
vec4(0.4, 0.3,0.3,1),
vec4(0.4, 0.1,0.3,1),
vec4(0.1, 0.1,0.3,1),

//P:  black
vec4(0.4, 0.3,0.3,1),
vec4(0.5, 0.3,0.3,1),
vec4(0.5, 0.1,0.3,1),
vec4(0.4, 0.1,0.3,1),

//Q:  white
vec4(0.5, 0.3,0.3,1),
vec4(0.6, 0.3,0.3,1),
vec4(0.6, 0,0.3,1),
vec4(0.5, 0,0.3,1),

//R:  black
vec4(0.6, 0.3,0.3,1),
vec4(0.7, 0.3,0.3,1),
vec4(0.7, 0,0.3,1),
vec4(0.6, 0,0.3,1),

//S:  black
vec4(-0.8, 0.2,0.4,1),
vec4(-0.7, 0.2,0.4,1),
vec4(-0.7, -0.1,0.4,1),
vec4(-0.8, -0.1,0.4,1),

//T:  white
vec4(-0.7, 0.2,0.45,1),
vec4(-0.3, 0.2,0.45,1),
vec4(-0.3, 0.1,0.45,1),
vec4(-0.7, 0.1,0.45,1),

//U:  black
vec4(-0.3, 0.2,0.4,1),
vec4(-0.2, 0.2,0.4,1),
vec4(-0.2, 0.1,0.4,1),
vec4(-0.3, 0.1,0.4,1),

//V:  white
vec4(-0.7, 0.1,0.5,1),
vec4(-0.2, 0.1,0.5,1),
vec4(-0.2, 0,0.5,1),
vec4(-0.7, 0,0.5,1),

//W:  black
vec4(-0.2, 0.1,0.3,1),
vec4(-0.1, 0.1,0.3,1),
vec4(-0.1, -0.1,0.3,1),
vec4(-0.2, -0.1,0.3,1),

//X:  black
vec4(0.1, 0.1,0.3,1),
vec4(0.2, 0.1,0.3,1),
vec4(0.2, 0,0.3,1),
vec4(0.1, 0,0.3,1),

//Y:  white
vec4(0.2, 0.1,0.3,1),
vec4(0.5, 0.1,0.3,1),
vec4(0.5, 0,0.3,1),
vec4(0.2, 0,0.3,1),

//Z:  yellow
vec4(-0.7, 0,0.4,1),
vec4(-0.6, 0,0.4,1),
vec4(-0.6, -0.1,0.4,1),
vec4(-0.7, -0.1,0.4,1),

//AX:  white
vec4(-0.6, 0,0.53,1),
vec4(-0.3, 0,0.53,1),
vec4(-0.3, -0.1,0.53,1),
vec4(-0.6, -0.1,0.53,1),

//BX:  yellow
vec4(-0.3, 0,0.4,1),
vec4(-0.2, 0,0.4,1),
vec4(-0.2, -0.1,0.4,1),
vec4(-0.3, -0.1,0.4,1),

//CX:  yellow           origin 0,0 is in this square
vec4(-0.1, 0.1,0.3,1),
vec4(0.1, 0.1,0.3,1),
vec4(0.1, -0.1,0.3,1),
vec4(-0.1, -0.1,0.3,1),

//DX:  yellow
vec4(0.1, 0,0.3,1),
vec4(0.2, 0,0.3,1),
vec4(0.2, -0.1,0.3,1),
vec4(0.1, -0.1,0.3,1),

//EX:  black
vec4(0.2, 0,0.3,1),
vec4(0.8, 0,0.3,1),
vec4(0.8, -0.1,0.3,1),
vec4(0.2, -0.1,0.3,1),

//FX:  black
vec4(-0.7, -0.1,0.4,1),
vec4(-0.6, -0.1,0.4,1),
vec4(-0.6, -0.2,0.4,1),
vec4(-0.7, -0.2,0.4,1),

//GX:  yellow
vec4(-0.6, -0.1,0.4,1),
vec4(-0.3, -0.1,0.4,1),
vec4(-0.3, -0.2,0.4,1),
vec4(-0.6, -0.2,0.4,1),

//HX:
vec4(-0.3, -0.1,0.4,1),
vec4(-0.2, -0.1,0.4,1),
vec4(-0.2, -0.2,0.4,1),
vec4(-0.3, -0.2,0.4,1),

//IX:  yellow
vec4(-0.2, -0.1,0.3,1),
vec4(0.1, -0.1,0.3,1),
vec4(0.1, -0.2,0.3,1),
vec4(-0.2, -0.2,0.3,1),

//JX:  black
vec4(0.1, -0.1,0.3,1),
vec4(0.2, -0.1,0.3,1),
vec4(0.2, -0.2,0.3,1),
vec4(0.1, -0.2,0.3,1),

//KX:  red
vec4(0.2, -0.1,0.35,1),
vec4(0.8, -0.1,0.35,1),
vec4(0.8, -0.2,0.35,1),
vec4(0.2, -0.2,0.35,1),

//LX:  black
vec4(0.8, -0.1,0.3,1),
vec4(0.9, -0.1,0.3,1),
vec4(0.9, -0.2,0.3,1),
vec4(0.8, -0.2,0.3,1),

//MX:  black
vec4(-0.6, -0.2,0.3,1),
vec4(-0.3, -0.2,0.3,1),
vec4(-0.3, -0.3,0.3,1),
vec4(-0.6, -0.3,0.3,1),

//NX:  orange
vec4(-0.3, -0.2,0.3,1),
vec4(0, -0.2,0.3,1),
vec4(0, -0.3,0.3,1),
vec4(-0.3, -0.3,0.3,1),

//OX:  black
vec4(0, -0.2,0.3,1),
vec4(0.1, -0.2,0.3,1),
vec4(0.1, -0.3,0.3,1),
vec4(0, -0.3,0.3,1),

//PX:  red
vec4(0.1, -0.2,0.35,1),
vec4(0.2, -0.2,0.35,1),
vec4(0.2, -0.3,0.35,1),
vec4(0.1, -0.3,0.35,1),

//QX:  black
vec4(0.2, -0.2,0.3,1),
vec4(0.8, -0.2,0.3,1),
vec4(0.8, -0.3,0.3,1),
vec4(0.2, -0.3,0.3,1),

//RX:  black
vec4(-0.6, -0.3,0.3,1),
vec4(-0.5, -0.3,0.3,1),
vec4(-0.5, -0.4,0.3,1),
vec4(-0.6, -0.4,0.3,1),

//SX:  orange
vec4(-0.5, -0.3,0.3,1),
vec4(0.1, -0.3,0.3,1),
vec4(0.1, -0.4,0.3,1),
vec4(-0.5, -0.4,0.3,1),

//TX:  black
vec4(0.1, -0.3,0.3,1),
vec4(0.2, -0.3,0.3,1),
vec4(0.2, -0.4,0.3,1),
vec4(0.1, -0.4,0.3,1),

//UX:  red
vec4(0.2, -0.3,0.35,1),
vec4(0.7, -0.3,0.35,1),
vec4(0.7, -0.4,0.35,1),
vec4(0.2, -0.4,0.35,1),

//VX:  black
vec4(0.7, -0.3,0.3,1),
vec4(0.8, -0.3,0.3,1),
vec4(0.8, -0.4,0.3,1),
vec4(0.7, -0.4,0.3,1),

//WX:  black
vec4(-0.5, -0.4,0.2,1),
vec4(-0.3, -0.4,0.2,1),
vec4(-0.3, -0.5,0.2,1),
vec4(-0.5, -0.5,0.2,1),

//XX:  orange
vec4(-0.3, -0.4,0.2,1),
vec4(0.2, -0.4,0.2,1),
vec4(0.2, -0.5,0.2,1),
vec4(-0.3, -0.5,0.2,1),

//YX:  black
vec4(0.2, -0.4,0.2,1),
vec4(0.7, -0.4,0.2,1),
vec4(0.7, -0.5,0.2,1),
vec4(0.2, -0.5,0.2,1),

//ZX:  black
vec4(-0.3, -0.5,0.1,1),
vec4(0.2, -0.5,0.1,1),
vec4(0.2, -0.6,0.1,1),
vec4(-0.3, -0.6,0.1,1),
//--------------------------------------------------------------------------------- Negative Z direction
    //A:  black
vec4(-0.2, 0.6,-0.1,1),//0
vec4(0.4, 0.6,-0.1,1),//1
vec4(0.4, 0.5,-0.1,1),//2
vec4(-0.2, 0.5,-0.1,1),//3

//B:  black
vec4(-0.4, 0.5,-0.2,1),//4
vec4(-0.2, 0.5,-0.2,1),//5
vec4(-0.2, 0.4,-0.2,1),//6
vec4(-0.4, 0.4,-0.2,1),//7

//C:  white
vec4(-0.2, 0.5,-0.2,1),
vec4(0.1, 0.5,-0.2,1),
vec4(0.1, 0.4,-0.2,1),
vec4(-0.2, 0.4,-0.2,1),

//D:  black
vec4(0.1, 0.5,-0.2,1),
vec4(0.2, 0.5,-0.2,1),
vec4(0.2, 0.4,-0.2,1),
vec4(0.1, 0.4,-0.2,1),

//E:  white
vec4(0.2, 0.5,-0.2,1),
vec4(0.4, 0.5,-0.2,1),
vec4(0.4, 0.4,-0.2,1),
vec4(0.2, 0.4,-0.2,1),

//F:  black
vec4(0.4, 0.5,-0.2,1),
vec4(0.5, 0.5,-0.2,1),
vec4(0.5, 0.4,-0.2,1),
vec4(0.4, 0.4,-0.2,1),

//G:  black
vec4(-0.5, 0.4,-0.3,1),
vec4(-0.4, 0.4,-0.3,1),
vec4(-0.4, 0.3,-0.3,1),
vec4(-0.5, 0.3,-0.3,1),

//H:  white
vec4(-0.4, 0.4,-0.3,1),
vec4(-0.2, 0.4,-0.3,1),
vec4(-0.2, 0.3,-0.3,1),
vec4(-0.4, 0.3,-0.3,1),

//I:  yellow
vec4(-0.2, 0.4,-0.3,1),
vec4(0, 0.4,-0.3,1),
vec4(0, 0.1,-0.3,1),
vec4(-0.2, 0.1,-0.3,1),

//J:  black
vec4(0, 0.4,-0.3,1),
vec4(0.1, 0.4,-0.3,1),
vec4(0.1, 0.1,-0.3,1),
vec4(0, 0.1,-0.3,1),

//K:  white
vec4(0.1, 0.4,-0.2,1),
vec4(0.5, 0.4,-0.2,1),
vec4(0.5, 0.3,-0.2,1),
vec4(0.1, 0.3,-0.2,1),

//L:  black
vec4(0.5, 0.4,-0.2,1),
vec4(0.6, 0.4,-0.2,1),
vec4(0.6, 0.3,-0.2,1),
vec4(0.5, 0.3,-0.2,1),

//M:  black
vec4(-0.7, 0.3,-0.4,1),
vec4(-0.3, 0.3,-0.4,1),
vec4(-0.3, 0.2,-0.4,1),
vec4(-0.7, 0.2,-0.4,1),

//N:  yellow
vec4(-0.3, 0.3,-0.4,1),
vec4(-0.2, 0.3,-0.4,1),
vec4(-0.2, 0.2,-0.4,1),
vec4(-0.3, 0.2,-0.4,1),

//O:  white
vec4(0.1, 0.3,-0.3,1),
vec4(0.4, 0.3,-0.3,1),
vec4(0.4, 0.1,-0.3,1),
vec4(0.1, 0.1,-0.3,1),

//P:  black
vec4(0.4, 0.3,-0.3,1),
vec4(0.5, 0.3,-0.3,1),
vec4(0.5, 0.1,-0.3,1),
vec4(0.4, 0.1,-0.3,1),

//Q:  white
vec4(0.5, 0.3,-0.3,1),
vec4(0.6, 0.3,-0.3,1),
vec4(0.6, 0,-0.3,1),
vec4(0.5, 0,-0.3,1),

//R:  black
vec4(0.6, 0.3,-0.3,1),
vec4(0.7, 0.3,-0.3,1),
vec4(0.7, 0,-0.3,1),
vec4(0.6, 0,-0.3,1),

//S:  black
vec4(-0.8, 0.2,-0.4,1),
vec4(-0.7, 0.2,-0.4,1),
vec4(-0.7, -0.1,-0.4,1),
vec4(-0.8, -0.1,-0.4,1),

//T:  white
vec4(-0.7, 0.2,-0.45,1),
vec4(-0.3, 0.2,-0.45,1),
vec4(-0.3, 0.1,-0.45,1),
vec4(-0.7, 0.1,-0.45,1),

//U:  black
vec4(-0.3, 0.2,-0.4,1),
vec4(-0.2, 0.2,-0.4,1),
vec4(-0.2, 0.1,-0.4,1),
vec4(-0.3, 0.1,-0.4,1),

//V:  white
vec4(-0.7, 0.1,-0.5,1),
vec4(-0.2, 0.1,-0.5,1),
vec4(-0.2, 0,-0.5,1),
vec4(-0.7, 0,-0.5,1),

//W:  black
vec4(-0.2, 0.1,-0.3,1),
vec4(-0.1, 0.1,-0.3,1),
vec4(-0.1, -0.1,-0.3,1),
vec4(-0.2, -0.1,-0.3,1),

//X:  black
vec4(0.1, 0.1,-0.3,1),
vec4(0.2, 0.1,-0.3,1),
vec4(0.2, 0,-0.3,1),
vec4(0.1, 0,-0.3,1),

//Y:  white
vec4(0.2, 0.1,-0.3,1),
vec4(0.5, 0.1,-0.3,1),
vec4(0.5, 0,-0.3,1),
vec4(0.2, 0,-0.3,1),

//Z:  yellow
vec4(-0.7, 0,-0.4,1),
vec4(-0.6, 0,-0.4,1),
vec4(-0.6, -0.1,-0.4,1),
vec4(-0.7, -0.1,-0.4,1),

//AX:  white
vec4(-0.6, 0,-0.53,1),
vec4(-0.3, 0,-0.53,1),
vec4(-0.3, -0.1,-0.53,1),
vec4(-0.6, -0.1,-0.53,1),

//BX:  yellow 
vec4(-0.3, 0,-0.4,1),
vec4(-0.2, 0,-0.4,1),
vec4(-0.2, -0.1,-0.4,1),
vec4(-0.3, -0.1,-0.4,1),

//CX:  yellow   origin 0,0 is in this square
vec4(-0.1, 0.1,-0.3,1),
vec4(0.1, 0.1,-0.3,1),
vec4(0.1, -0.1,-0.3,1),
vec4(-0.1, -0.1,-0.3,1),

//DX:  yellow
vec4(0.1, 0,-0.3,1),
vec4(0.2, 0,-0.3,1),
vec4(0.2, -0.1,-0.3,1),
vec4(0.1, -0.1,-0.3,1),

//EX:  black
vec4(0.2, 0,-0.3,1),
vec4(0.8, 0,-0.3,1),
vec4(0.8, -0.1,-0.3,1),
vec4(0.2, -0.1,-0.3,1),

//FX:  black
vec4(-0.7, -0.1,-0.4,1),
vec4(-0.6, -0.1,-0.4,1),
vec4(-0.6, -0.2,-0.4,1),
vec4(-0.7, -0.2,-0.4,1),

//GX:  yellow
vec4(-0.6, -0.1,-0.4,1),
vec4(-0.3, -0.1,-0.4,1),
vec4(-0.3, -0.2,-0.4,1),
vec4(-0.6, -0.2,-0.4,1),

//HX:
vec4(-0.3, -0.1,-0.4,1),
vec4(-0.2, -0.1,-0.4,1),
vec4(-0.2, -0.2,-0.4,1),
vec4(-0.3, -0.2,-0.4,1),

//IX:  yellow
vec4(-0.2, -0.1,-0.3,1),
vec4(0.1, -0.1,-0.3,1),
vec4(0.1, -0.2,-0.3,1),
vec4(-0.2, -0.2,-0.3,1),

//JX:  black
vec4(0.1, -0.1,-0.3,1),
vec4(0.2, -0.1,-0.3,1),
vec4(0.2, -0.2,-0.3,1),
vec4(0.1, -0.2,-0.3,1),

//KX:  red
vec4(0.2, -0.1,-0.35,1),
vec4(0.8, -0.1,-0.35,1),
vec4(0.8, -0.2,-0.35,1),
vec4(0.2, -0.2,-0.35,1),

//LX:  black
vec4(0.8, -0.1,-0.3,1),
vec4(0.9, -0.1,-0.3,1),
vec4(0.9, -0.2,-0.3,1),
vec4(0.8, -0.2,-0.3,1),

//MX:  black
vec4(-0.6, -0.2,-0.3,1),
vec4(-0.3, -0.2,-0.3,1),
vec4(-0.3, -0.3,-0.3,1),
vec4(-0.6, -0.3,-0.3,1),

//NX:  orange
vec4(-0.3, -0.2,-0.3,1),
vec4(0, -0.2,-0.3,1),
vec4(0, -0.3,-0.3,1),
vec4(-0.3, -0.3,-0.3,1),

//OX:  black
vec4(0, -0.2,-0.3,1),
vec4(0.1, -0.2,-0.3,1),
vec4(0.1, -0.3,-0.3,1),
vec4(0, -0.3,-0.3,1),

//PX:  red
vec4(0.1, -0.2,-0.35,1),
vec4(0.2, -0.2,-0.35,1),
vec4(0.2, -0.3,-0.35,1),
vec4(0.1, -0.3,-0.35,1),

//QX:  black
vec4(0.2, -0.2,-0.3,1),
vec4(0.8, -0.2,-0.3,1),
vec4(0.8, -0.3,-0.3,1),
vec4(0.2, -0.3,-0.3,1),

//RX:  black
vec4(-0.6, -0.3,-0.3,1),
vec4(-0.5, -0.3,-0.3,1),
vec4(-0.5, -0.4,-0.3,1),
vec4(-0.6, -0.4,-0.3,1),

//SX:  orange
vec4(-0.5, -0.3,-0.3,1),
vec4(0.1, -0.3,-0.3,1),
vec4(0.1, -0.4,-0.3,1),
vec4(-0.5, -0.4,-0.3,1),

//TX:  black
vec4(0.1, -0.3,-0.3,1),
vec4(0.2, -0.3,-0.3,1),
vec4(0.2, -0.4,-0.3,1),
vec4(0.1, -0.4,-0.3,1),

//UX:  red
vec4(0.2, -0.3,-0.35,1),
vec4(0.7, -0.3,-0.35,1),
vec4(0.7, -0.4,-0.35,1),
vec4(0.2, -0.4,-0.35,1),

//VX:  black
vec4(0.7, -0.3,-0.3,1),
vec4(0.8, -0.3,-0.3,1),
vec4(0.8, -0.4,-0.3,1),
vec4(0.7, -0.4,-0.3,1),

//WX:  black
vec4(-0.5, -0.4,-0.2,1),
vec4(-0.3, -0.4,-0.2,1),
vec4(-0.3, -0.5,-0.2,1),
vec4(-0.5, -0.5,-0.2,1),

//XX:  orange
vec4(-0.3, -0.4,-0.2,1),
vec4(0.2, -0.4,-0.2,1),
vec4(0.2, -0.5,-0.2,1),
vec4(-0.3, -0.5,-0.2,1),

//YX:  black
vec4(0.2, -0.4,-0.2,1),
vec4(0.7, -0.4,-0.2,1),
vec4(0.7, -0.5,-0.2,1),
vec4(0.2, -0.5,-0.2,1),

//ZX:  black
vec4(-0.3, -0.5,-0.1,1),
vec4(0.2, -0.5,-0.1,1),
vec4(0.2, -0.6,-0.1,1),
vec4(-0.3, -0.6,-0.1,1)
];

var indices = [];
    //this loop draws all the indices for both 2d drawings
    for(var i = 0; i<flappyVertices.length;i+=4){
      indices.push(i,i+1,i+2,i,i+2, i+3);
    }
    
    //the following loop connects the two separate 2d flappy bird drawings together
   var second = (flappyVertices.length/2);//this is the first point of the second 2d flappybird
   for(var i = 0; i<flappyVertices.length/2;i+=4){
     indices.push(i,second+i,(second+1)+i,i,(second+1)+i,i+1);//top coverage of each block
     indices.push(i+3,(second+i)+3,(second+i)+2,i+3,(second+i)+2,i+2); //bottom coverage of each block
     indices.push(i+3,(second+i)+3,second+i,i+3,second+i,i);//left coverage of each block
     indices.push(i+2,i+1,(second+1)+i,i+2,(second+1)+i,(second+2)+i);//right coverage of each block   
       
 }
    
    //the colors for flappy bird each one is labeled accordingly
    var colors = [
//A:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//B:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),
        
//C:  white
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),

//D:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//E:  white
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),

//F:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//G:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//H:  white
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
        
//I:  yellow
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//J:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//K:  white
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),

//L:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//M:  black
vec4(0.3,0.3,0.3,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0.6,0.6,0.6,1),

//N:  yellow
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//O:  white
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),

//P:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//Q:  white
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),

//R:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//S:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//T:  white
vec4(1,1,1,1),
vec4(.9,.9,.9,1),
vec4(.8,.8,.8,1),
vec4(.9,.9,.9,1),

//U:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//V:  white
vec4(1,1,1,1),
vec4(.9,.9,.9,1),
vec4(.8,.8,.8,1),
vec4(.9,.9,.9,1),
        
//W:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//X:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
        
//Y:  white
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),

//Z:  yellow
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//AX:  white
vec4(1,1,1,1),
vec4(.9,.9,.9,1),
vec4(.8,.8,.8,1),
vec4(.9,.9,.9,1),

//BX:  yellow
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//CX:  yellow   origin 0,0 is in this square
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//DX:  yellow
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//EX:  black
vec4(0,0,0,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0,0,0,1),

//FX:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//GX:  yellow
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//HX: black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//IX:  yellow
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//JX:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//KX:  red
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),

//LX:  black
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),

//MX:  black
vec4(0.3,0.3,0.3,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0.6,0.6,0.6,1),

//NX:  orange
vec4(1,.6,0,1),
vec4(1,.6,0,1),
vec4(1,.6,0,1),
vec4(1,.6,0,1),

//OX:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//PX:  red
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),

//QX:  black
vec4(0,0,0,1),
vec4(0.3,0.3,0.3,1),
vec4(0.6,0.6,0.6,1),
vec4(0,0,0,1),

//RX:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//SX:  orange
vec4(1,.6,0,1),
vec4(1,.6,0,1),
vec4(1,.6,0,1),
vec4(1,.6,0,1),
        
//TX:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//UX:  red
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),

//VX:  black
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),

//WX:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//XX:  orange
vec4(1,.6,0,1),
vec4(1,.6,0,1),
vec4(1,.6,0,1),
vec4(1,.6,0,1),

//YX:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//ZX:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),
//-------------------------------------------------------------------------
        //A:  black
//A:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//B:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),
        
//C:  white
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),

//D:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//E:  white
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),

//F:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//G:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//H:  white
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
        
//I:  yellow
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//J:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//K:  white
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),

//L:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//M:  black
vec4(0.3,0.3,0.3,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0.6,0.6,0.6,1),

//N:  yellow
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//O:  white
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),

//P:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//Q:  white
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),

//R:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//S:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//T:  white
vec4(1,1,1,1),
vec4(.9,.9,.9,1),
vec4(.8,.8,.8,1),
vec4(.9,.9,.9,1),

//U:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//V:  white
vec4(1,1,1,1),
vec4(.9,.9,.9,1),
vec4(.8,.8,.8,1),
vec4(.9,.9,.9,1),

//W:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//X:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
        
//Y:  white
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),
vec4(1,1,1,1),

//Z:  yellow
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//AX:  white
vec4(1,1,1,1),
vec4(.9,.9,.9,1),
vec4(.8,.8,.8,1),
vec4(.9,.9,.9,1),

//BX:  yellow
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//CX:  yellow   origin 0,0 is in this square
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//DX:  yellow
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//EX:  black
vec4(0,0,0,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0,0,0,1),

//FX:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//GX:  yellow
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//HX: black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//IX:  yellow
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),
vec4(1,1,0,1),

//JX:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//KX:  red
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),

//LX:  black
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),

//MX:  black
vec4(0.3,0.3,0.3,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0.6,0.6,0.6,1),

//NX:  orange
vec4(1,.6,0,1),
vec4(1,.6,0,1),
vec4(1,.6,0,1),
vec4(1,.6,0,1),

//OX:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//PX:  red
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),

//QX:  black
vec4(0,0,0,1),
vec4(0.3,0.3,0.3,1),
vec4(0.6,0.6,0.6,1),
vec4(0,0,0,1),

//RX:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//SX:  orange
vec4(1,.6,0,1),
vec4(1,.6,0,1),
vec4(1,.6,0,1),
vec4(1,.6,0,1),
        
//TX:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//UX:  red
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),

//VX:  black
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),
vec4(1,0,0,1),

//WX:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1),

//XX:  orange
vec4(1,.6,0,1),
vec4(1,.6,0,1),
vec4(1,.6,0,1),
vec4(1,.6,0,1),

//YX:  black
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),
vec4(0,0,0,1),

//ZX:  black
vec4(0.2,0.2,0.2,1),
vec4(0.6,0.6,0.6,1),
vec4(0.3,0.3,0.3,1),
vec4(0.1,0.1,0.1,1)
];
    
    
     
    
    var cube = {flappyVertices: flappyVertices, indices: indices, colors: colors, primtype: gl.TRIANGLES};
    

    return cube;
}//generate FLappy Bird

 
function drawObject(gl, program, obj, viewAxis) {
    gl.clearColor(0.0, 1, .5, 1.0);
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
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj.flappyVertices), gl.STATIC_DRAW);

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

    if(flag) theta[axis] += 0.5;
    gl.uniform3fv(thetaLoc, theta); //find theta in html  and set it
    gl.drawElements(gl.TRIANGLES, elementCount, gl.UNSIGNED_SHORT, 0);  //draw elements  ... elementCount number of indices  
    requestAnimFrame( render );  
}