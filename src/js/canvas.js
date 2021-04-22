class Canvas {
    constructor(parent, updateFrame) {
        // creating canvas
        this.canvas = document.createElement('canvas');
        // setting its size
        this.resize();
        // adding it to DOM
        parent.appendChild(this.canvas);
        // extracting context
        this.ctx = this.canvas.getContext("2d");

        // starting animation based on function outside
        this.updateFrame = updateFrame.bind(this);
        requestAnimationFrame(this.updateFrame);

        // mouse position on canvas
        this.mouseX = 0;
        this.mouseY = 0;

        // even listener to update position of a mouse
        this.canvas.addEventListener('mousemove', this.updateMousePos.bind(this));
        this.canvas.addEventListener('touchmove', this.updateMousePos.bind(this));
    }

    // to resize canvas when window is resized
    resize() {
        this.canvas.width = parent.innerWidth;
        this.canvas.height = parent.innerHeight;
    }

    // for animations
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // to know location of a mose for drag and drop and more
    updateMousePos(e) {
        let rect = this.canvas.getBoundingClientRect();
        let pos = e.touches ? e.touches[0] : e; 
        this.mouseX = pos.clientX - rect.left;
        this.mouseY = pos.clientY - rect.top;
    }
}