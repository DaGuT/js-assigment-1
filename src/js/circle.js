class Circle {
    // just savign everything
    constructor(pos, radius, clr, app) {
        this.pos = pos;
        this.radius = radius;
        this.app = app;
        this.clr = clr;
        this.isFollowingMouse = false;
    }

    // updating function where we update location
    update() {
        if (this.isFollowingMouse) {
            this.pos = new Vector(app.mouseX, app.mouseY);
        }
    }

    draw () {
        this.update();

        const oldStyle = this.app.ctx.strokeStyle;
        this.app.ctx.strokeStyle = this.clr;

        this.app.ctx.beginPath();
        this.app.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
        this.app.ctx.stroke();

        this.app.ctx.strokeStyle = oldStyle;
    }

    setRadiusBasedOnSquare(square) {
        this.radius = Math.sqrt(square/Math.PI);
    }

    calculateSquare() {
        return Math.PI*(this.radius**2);
    }

    followMouseStart() {
        this.isFollowingMouse = true;
    }

    followMouseStop() {
        this.isFollowingMouse = false;
    }
}