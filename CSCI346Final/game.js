/**
 * 
 * @author:  Edward Angel
 * Modified by Marietta E. Cameron, 
 * Modified by David Cable Partner Justin Blankenship
 * 
 * Last Modified: 2-05-2016
 * 
 * hypocycloid
 */

var gl;
var points;

function canvasMain() {
    var canvas = document.getElementById("gl-canvas"); //must be in html

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }


    //  Configure WebGL

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    var objColor = shapeColor(1,50);
     
       for(var i = 0; i < 10; i++){
            var size = Math.random()* 0.5;
            drawObject(gl, program, generateShape(size * 1.0, size * 0.3333, 50 , .5, -.5), objColor, gl.LINE_STRIP);
            drawObject(gl, program, generateShape1(size * 1.0, size * 0.3333, 50 , .5, .5), objColor, gl.LINE_STRIP);
            
        }
    
    
       for(var i = 0; i < 10; i++){
            var size = Math.random()* 0.5;
            
            drawObject(gl, program, generateShape(size * 1.0, size * 0.3333, 50 , .5, .37), objColor, gl.LINE_STRIP);
            drawObject(gl, program, generateShape1(size * 1.0, size * 0.3333, 50 , .5, -.37), objColor, gl.LINE_STRIP);
        }
    
   
    
       for(var i = 0; i < 10; i++){
            var size = Math.random()* 0.5;
            
            drawObject(gl, program, generateShape(size * 1.0, size * 0.3333, 50 , -.5, -.5), objColor, gl.LINE_STRIP);
            drawObject(gl, program, generateShape1(size * 1.0, size * 0.3333, 50 , -.5, .5), objColor, gl.LINE_STRIP);
        }
    
    
       for(var i = 0; i < 10; i++){
            var size = Math.random()* 0.5;
            
            drawObject(gl, program, generateShape(size * 1.0, size * 0.3333, 50 , -.5, .37), objColor, gl.LINE_STRIP);
            drawObject(gl, program, generateShape1(size * 1.0, size * 0.3333, 50 , -.5, -.37), objColor, gl.LINE_STRIP);
        }
       
       //middle
       for(var i = 0; i < 10; i++){
            var size = Math.random()* 0.1;
            var size1 = 0.1;
            
            drawObject(gl, program, generateShape(size * 1.0, size * 0.3333, 50 , 0, 0), objColor, gl.LINE_STRIP);
            drawObject(gl, program, generateShape1(size * 1.0, size * 0.3333, 50 , 0, 0), objColor, gl.LINE_STRIP);
        } 
        
        //corner shapes
        drawObject(gl, program, generateShape(size1 * 1.0, size1 * 0.3333, 50 , -.9, .9), objColor, gl.TRIANGLE_FAN);
        drawObject(gl, program, generateShape1(size1 * 1.0,  size1 * 0.3333, 50 , .9, -.9), objColor, gl.TRIANGLE_FAN);
        drawObject(gl, program, generateShape(size1 * 1.0, size1 * 0.3333, 50 , -.9, -.9), objColor, gl.TRIANGLE_FAN);
        drawObject(gl, program, generateShape1(size1 * 1.0,  size1 * 0.3333, 50 , .9, .9), objColor, gl.TRIANGLE_FAN);
        drawObject(gl, program, generateShape(.3*1, .3*.0909, 50 , 0, 0), objColor, gl.LINE_STRIP);
}
;//CanvasMain

//blending
function shapeColor(radius, pointCount){
    var circleVertices = [];
    var inc = 2*Math.PI / pointCount;
    
    for (var theta = 0; theta <2*Math.PI; theta += inc){
        circleVertices.push(vec4(radius*Math.cos(theta), radius*Math.sin(theta), 0, 1.0));
    }
    
    return circleVertices;
};

//hypocycloid facing West
function generateShape(a, b, pointCount, x, y) {

    var shapeVertices = [];
    var inc = 2 * Math.PI / pointCount;
    for (var theta = 0; theta < 2 * Math.PI; theta += inc) {
        shapeVertices.push(vec2(x + (((a - b) * Math.cos(theta)) + (b * Math.cos(((a / b) - 1) * theta))), y + (((a - b)) * Math.sin(theta)) - (b * Math.sin(((a / b) - 1) * theta))));
    }

    return shapeVertices;
};

//hypocycloid facing East
function generateShape1(a, b, pointCount, x, y) {

    var shapeVertices = [];
    var inc = 2 * Math.PI / pointCount;
    for (var theta = 0; theta < 2 * Math.PI; theta += inc) {
        shapeVertices.push(vec2(x + -(((a - b) * Math.cos(theta)) + (b * Math.cos(((a / b) - 1) * theta))), -(y + (((a - b)) * Math.sin(theta)) - (b * Math.sin(((a / b) - 1) * theta)))));
    }

    return shapeVertices;
};

function drawObject(gl, program, vertices, colors, glType) {
    var colorLocation = gl.getAttribLocation(program, "myColor"); 
    gl.enableVertexAttribArray(colorLocation);
    var objVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, objVertexColorBuffer);    
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    objVertexColorBuffer.itemSize = colors[0].length;
    objVertexColorBuffer.numItems = colors.length;
   
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);   
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    
    
    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
   
    
    gl.bindBuffer(gl.ARRAY_BUFFER, objVertexColorBuffer);
    gl.vertexAttribPointer(colorLocation, objVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
      
    
    
    gl.drawArrays(glType, 0, vertices.length);
   
   
}//drawObject 
