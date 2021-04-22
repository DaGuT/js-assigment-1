// canvas with its functions like clearning, frame update etc
let app = new Canvas(document.getElementsByClassName('main-app')[0], updateFrame);

// default parameters
const circleColor = "#FF0000";
const circleRadius = 11;


// objects
let circles = [];
let bigCircle = null;
let parallelogram = null;

// event listeners
window.addEventListener('resize', (e) => app.resize()); // to save scope of app I decided to call it like that (can do with bind, but look how fancy that one is)
app.canvas.addEventListener('mousedown', (e) => {
    handleCanvasMouseDown(app, e);
});
app.canvas.addEventListener('mouseup', (e) => {
    handleCanvasMouseUp(app, e);
});
app.canvas.addEventListener('mousemove', (e) => {
    handleCanvasMouseMove(app, e);
});
// replicating for mobile
//these are handled by mousedown and up :\
// app.canvas.addEventListener('touchstart', (e) => {
//     handleCanvasMouseDown(app, e);
// });
// app.canvas.addEventListener('touchend', (e) => {
//     handleCanvasMouseUp(app, e);
// });
app.canvas.addEventListener('touchmove', (e) => {
    console.log(e);
    handleCanvasMouseMove(app, e);
});

// ------------- CANVAS RELATED functions

// This function is frame updater. It will draw all objects
// "this" will be asigned in Canvas
function updateFrame() {
    this.clear();

    // drawing figures
    circles.forEach((circle)=>circle.draw());
    if (parallelogram) parallelogram.draw();
    if (bigCircle) bigCircle.draw();

    // updating circle positions on sidemenu (I dont want to merge this with update, because of readability)
    let coords = document.getElementsByClassName('coord');
    // clear coords first
    for (i = 0; coords[i]; i++) coords[i].getElementsByClassName('point-coord')[0].innerHTML = ``;
    circles.forEach((circle, i) => coords[i].getElementsByClassName('point-coord')[0].innerHTML = `(x: ${circle.pos.x} y:${circle.pos.y})`);

    // now update squares
    document.getElementById('figure1').innerHTML = parallelogram === null ? '' : parallelogram.calculateSquare().toFixed(2);
    document.getElementById('figure2').innerHTML = bigCircle === null ? '' : bigCircle.calculateSquare().toFixed(2);

    requestAnimationFrame(this.updateFrame);
}

// this function will be used to add circle upon click
function addDot(app) {
    if (circles.length <= 2) {
        circles.push(new Circle(new Vector(app.mouseX, app.mouseY), circleRadius, circleColor, app));
    }
}

//to avoid code repetition
function makeCircleAndParal() {
    parallelogram = new Parallelogram(...circles.map(c => c.pos), null, app);
    bigCircle = new Circle(parallelogram.center, 0, "#FFF000", app);
    bigCircle.setRadiusBasedOnSquare(parallelogram.calculateSquare());
}

// --------EVENT HANDLERS
//this function will add circle or will enable its drag and drop functionality
function handleCanvasMouseDown(app) {
    // this var will be used to check if we have clicked any circle
    let selectedCircle = circles.filter(circle => (app.mouseX - circle.pos.x) ** 2 + (app.mouseY - circle.pos.y) ** 2 <= circle.radius ** 2);

    // in case if we want to move circle, this is drag and drop feature
    if (selectedCircle.length>0) {
        // we save selected circle
        selectedCircle = selectedCircle[0];
        // and enable it's followMouseFeature
        selectedCircle.followMouseStart();
    } else {
        //  if we clicked outside of circle, we add new one if we can
        addDot(app);
        if (circles.length===3) {
            makeCircleAndParal();
        }
    }
}

// this function will disable drag and drop of circles
function handleCanvasMouseUp(app, e) {
    // disabling drag and drop of circles
    circles.forEach(c => c.followMouseStop());
}
// redrawing big circle and parallelogram
function handleCanvasMouseMove(app, e) {
    // redraw parallelogram and circle
    if ((circles.length === 3) && (circles.some(c => c.isFollowingMouse))) {
        makeCircleAndParal();
    }
}

// -------- BUTTONS RELATED

// resetting application
function resetApp() {
    circles = [];
    parallelogram = null;
    bigCircle = null;
}

// hide/show help
function toggleHelp() {
    document.getElementsByClassName('help')[0].classList.toggle('hidden');
}