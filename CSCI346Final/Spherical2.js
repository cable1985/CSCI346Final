
/**
 * 
 * @author:  Edward Angel
 * Modified by: Marietta E. Cameron, David Cable, Justin Blankenship, Lucas Clarke
 * 
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

    var shape = generateSphere();

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
    
      
        drawSphere(gl, program, shape, axis);
   
    
    //drawMountain(gl, program, shape, axis);
}//CanvasMain

    

function generateSphere() {
   var vertices = [];
   var inc = 2*Math.PI/50;
   
    //creates a circular grid starting at radius of 0.7 down to 0 decrementing by 0.05 each cycle
    for(var r = 0.7; r >= 0; r-= .05){
    for(var theta = 0; theta < 2*Math.PI; theta +=inc){
       var x = r*Math.cos(theta);
       var y = r*Math.sin(theta);
        vertices.push(vec4(-(Math.pow(x,2)+Math.pow(y,2)),x,y,1));
        
    } 
   }   
    //creates a circular grid starting at radius of 0.7 down to 0 decrementing by 0.05 each cycle
    for(var r = 0.7; r >= 0; r-= .05){
    for(var theta = 0; theta < 2*Math.PI; theta +=inc){
       var x = r*Math.cos(theta);
       var y = r*Math.sin(theta);
        vertices.push(vec4((Math.pow(x,2)+Math.pow(y,2)),x,y,1));
        
    } 
   }   
    

    
    var indices = [];
    for(var i = 0; i < vertices.length/2;i++){
        if(i+51<vertices.length/2-1){
            indices.push(i,i+1,i+51,i+51,i+50,i,i,i+49);
         }
    }
        
    for(var i = vertices.length/2; i < vertices.length;i++){
        if(i+51<vertices.length){
            indices.push(i,i+1,i+51,i+51,i+50,i,i,i+49);
        }
    }
    
    
    
    var colors = [];
    for(var i = 0; i < vertices.length; i++){
        colors.push(vec4(Math.random()*.4,Math.random()*.7,.3,1));
    }
    console.log(colors);
    
    var shape = {vertices: vertices, indices: indices, colors: colors, primtype: gl.TRIANGLES};


    return shape;
}


function drawSphere(gl, program, obj, viewAxis) {
    
    //Background 
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
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
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
   if(flag) theta[axis] += 0.5;
    gl.uniform3fv(thetaLoc, theta); //find theta in html  and set it

    gl.drawElements(gl.POINTS, elementCount, gl.UNSIGNED_SHORT, 0);
    requestAnimFrame(render);
}
