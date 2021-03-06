
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
var n = 150, m =150;
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

    var shape = generateShape();

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
    
      
        drawShape(gl, program, shape, axis);
   
}//CanvasMain

    

function generateShape() {
   
    var vertices = [];
    for (var i = 0; i < n + 1; i++) {
        for (var j = 0; j < m + 1; j++) {
            var x = (1.6 * i / n) - .8;
            var z = (1.6 * j / m) - .8;
            var b = (6 * j / m) - 3;
            var a = (6 * i / n) - 3;
            vertices.push(vec4(x, 0.4*(Math.sin(Math.pow(a,2) + Math.pow(b,2))/(Math.pow(a,2)+Math.pow(b,2))), z, 1));
        //https://www.packtpub.com/books/content/visualizations-made-easy-gnuplot
        }
    }

    var what = (n + 1) * m;
    var indices = [];
    for (var i = 0; i < what - 1; i++) {
        if (i % (n + 1) !== n) {
            indices.push(i, i + 1, i + (m + 2), i, i + (m + 2), i + (m + 1));
        }
    }

    var colors = [];
    for (var i = 0; i < what; i++) {
        colors.push(vec4(Math.random()*0.8, 0, .5, 1));
        colors.push(vec4(Math.random() * .64, 0, Math.random()*.3, 1));
        colors.push(vec4(Math.random() * .34, 0, Math.random() * .8, 1));

    }
  
    var shape = {vertices: vertices, indices: indices, colors: colors, primtype: gl.TRIANGLES};


    return shape;
}


function drawShape(gl, program, obj, viewAxis) {
    
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
    elementCount2 = obj.indices.length;
    

    render();

}//drawObject

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    if(flag) theta[axis] += 0.5;
    gl.uniform3fv(thetaLoc, theta); //find theta in html  and set it

    gl.drawElements(gl.LINES, elementCount, gl.UNSIGNED_SHORT, 0);  //draw elements  ... elementCount number of indices  
    //gl.drawElements(gl.LINES, elementCount2, gl.UNSIGNED_SHORT, 0);
    requestAnimFrame(render);
}
