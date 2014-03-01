window.onload = function () {

    // Get a reference to the canvas element.
    var myCanvas = document.getElementById('myCanvas');

    // Set up screen width and height.
    var screenWidth  = 400;
    var screenHeight = 400;
    myCanvas.width   = screenWidth;
    myCanvas.height  = screenHeight;

    // Get the (graphics?) context.
    var context    = myCanvas.getContext('2d');
    
    var controller = new Controller();

    window.onkeydown = function (event) { controller.keyDown(event); };
    window.onkeyup   = function (event) { controller.keyUp(event); };

    // Instantiate a new instance of type Box.
    var myBox = new Box(50, 50, 20, 20, screenWidth, screenHeight, 10, controller, context);

    // Instantiate a new instance of type Background.
    var background = new Background(screenWidth, screenHeight, 0, context);

    // Define and initiate the game loop.
    function draw() {
        context.clearRect(0, 0, screenWidth, screenHeight);
        background.draw();
        myBox.update();
        myBox.draw();
    }

    var fps = 60;
    setInterval(draw, 1000 / fps);
};