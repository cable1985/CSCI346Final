
/**
 * 
 * @author:  Edward Angel
 * Modified by Marietta E. Cameron, David Cable, Justin Blankenship, Lucas Clarke
 */

var gl;
var red = 1;
var green = 0;
var blue = 0;
var xAxis = 0; //used as a subscript in theta array
var yAxis = 1; //used as a subscript in theta array
var zAxis = 2; //used as a subscript in theta array
var axis = 0;
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

    var cube = genDeltoid();
    

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
  
    drawObject(gl, program, cube, axis);
    
}


function genDeltoid() {

    var pointCount = 150;
    var shapeVertices = [];
    var inc = 2 * Math.PI / pointCount;
    var r = 0.5;
    //x	=	sqrt(r^2-u^2)cos(theta)
    //y	=	sqrt(r^2-u^2)sin(theta)
    
    for (var theta = 0; theta < 2 * Math.PI; theta += inc) {
        for(r=-r;r<.5;r+= 0.01){
            var u = r*Math.cos(theta);
            var x = Math.sqrt((Math.pow(r,2)-Math.pow(u,2)))*Math.cos(theta);
            var y = Math.sqrt((Math.pow(r,2)-Math.pow(u,2)))*Math.sin(theta);
        
            var z = u;
            shapeVertices.push(vec4(x,y,z,1));
         }
    }

    var indices = [];
    for(var i = 0; i < pointCount;i++){
       indices.push(i);
    }
   
    
    var colors = [];
    for (var i = 0; i < pointCount; i++) {
        
        colors.push(vec4(1, .4, .8, 1));
        colors.push(vec4(Math.random() * .64, .125, Math.random()*.4, 1));
        colors.push(vec4(Math.random() * .34, .063, Math.random() * 8, 1));
        
    }
            
    //example of an object in java script 
    var cube = {shapeVertices: shapeVertices, indices: indices, colors: colors, primtype: gl.POINTS};
    

    return cube;
}//generateShape

 
function drawObject(gl, program, obj, viewAxis) {
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
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
    gl.bufferData(gl.ARRAY_BUFFER, flatten(obj.shapeVertices), gl.STATIC_DRAW);

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

    theta[axis] += 0.5;  //rotate by 2degrees
    gl.uniform3fv(thetaLoc, theta); //find theta in html  and set it

    gl.drawElements(gl.LINES, elementCount, gl.UNSIGNED_SHORT, 0);  //draw elements  ... elementCount number of indices  
  
    requestAnimFrame( render );  
}