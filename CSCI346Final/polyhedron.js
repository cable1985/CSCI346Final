
/**
 * 
 * @author:  Edward Angel
 * Modified by Marietta E. Cameron, David Cable, Justin Blankenship, Lucas Clarke
 */
var flag = true;
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
    
    document.getElementById("Pause").onclick = function(){flag = !flag;};
  
    drawObject(gl, program, cube, axis);
    
}


function genDeltoid() {

    var pointCount = 50;
    var a = 0.25;
    var b = 0.125;
    var shapeVertices = [];
    var inc = 2 * Math.PI / pointCount;
    
    //----------------------------inner solid shape-----------------------------------------------------------
    for (var theta = 0; theta < 2 * Math.PI; theta += inc) {
          shapeVertices.push(vec4((((2*b)*Math.cos(theta)) + (b*Math.cos(2*theta))),-.3,(((2*b)*Math.sin(theta)) - (b*Math.sin(2*theta))),1));
        shapeVertices.push(vec4((((2*b)*Math.cos(theta)) + (b*Math.cos(2*theta))),.3,(((2*b)*Math.sin(theta)) - (b*Math.sin(2*theta))),1));
        
}
    shapeVertices.push(vec4(0,-0.3,0,1));
    shapeVertices.push(vec4(0,0.3,0,1));
    
    //----------------------------outer cage-----------------------------------------------------------
    for (var theta = 0; theta < 2 * Math.PI; theta += inc) {
          shapeVertices.push(vec4((((2*a)*Math.cos(theta)) + (a*Math.cos(2*theta))),-.5,(((2*a)*Math.sin(theta)) - (a*Math.sin(2*theta))),1));
        shapeVertices.push(vec4((((2*a)*Math.cos(theta)) + (a*Math.cos(2*theta))),.5,(((2*a)*Math.sin(theta)) - (a*Math.sin(2*theta))),1));
        
        //https://en.wikipedia.org/wiki/Deltoid_curve
}
    shapeVertices.push(vec4(0,-0.5,0,1));
    shapeVertices.push(vec4(0,0.5,0,1));
    
   
    var indices = [];
    //----------------------------inner solid-----------------------------------------------------------
    for(var i = 0; i < 101;i++){
        if(i%2===0){
            indices.push(i+2,i,100);
            indices.push(i+2,i+1,i);
        }
        else {
          indices.push(i+2,i,101);
          indices.push(i+2,i+1,i);
        }
    }
    
    
    //----------------------------inner solid shape-----------------------------------------------------------
    for(var i = 103; i < 201;i++){
        if(i%2===0){
            indices.push(i+2,i,202);
            indices.push(i+2,i+1,i);
        }
        else {
          indices.push(i+2,i,203);
          indices.push(i+2,i+1,i);
        }
    }
    
    var colors = [];
    for (var i = 0; i < 203; i++) {
        colors.push(vec4(1, .4, .8, 1));
        colors.push(vec4(Math.random() * .64, .125, Math.random()*.4, 1));
        colors.push(vec4(Math.random() * .34, .063, Math.random() * 8, 1));
        
    }
            
    //example of an object in java script 
    var cube = {shapeVertices: shapeVertices, indices: indices, colors: colors, primtype: gl.TRIANGLES};
    

    return cube;
}//generateShape

 
function drawObject(gl, program, obj, viewAxis) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
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
    elementCount = obj.indices.length/2;
    elementCount2 = obj.indices.length;
    
    
    render();
   
}//drawObject

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if(flag) theta[axis] += 0.5;
    gl.uniform3fv(thetaLoc, theta); //find theta in html  and set it

    gl.drawElements(gl.TRIANGLES, elementCount, gl.UNSIGNED_SHORT, 0);  //draw elements  ... elementCount number of indices  
    gl.drawElements(gl.LINES, elementCount2, gl.UNSIGNED_SHORT, 0);
    requestAnimFrame( render );  
}