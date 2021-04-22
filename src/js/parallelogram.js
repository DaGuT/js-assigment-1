class Parallelogram {
    constructor(x1, x2, x3, clr, app) {
        // saving vectors
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;

        this.x4 = null;
        this.center = null;

        // getting missing point and center of mass (set inside, not returned)
        this.calculateX4();

        // saving color
        this.clr = clr || '#0000FF';

        this.app = app;
    }

    // this function will calculate coordinates of 4th point
    calculateX4() {
        this.center = this.x1.add(this.x2).div(2);

        //last point can be found as sum of vectors (sides) (there are plenty of options for that 4th side, I'll just stick with this one)
        this.x4 = new Vector(2 * this.center.x - this.x3.x, 2 * this.center.y - this.x3.y);
    }

    draw() {
        // settings tyle
        const oldStyle = this.app.ctx.strokeStyle;
        this.app.ctx.strokeStyle = this.clr;

        // our weirdest sorting to know how to draw points
        let points = [this.x1, this.x2, this.x3, this.x4].sort(this.sortPoints.bind(this));

        // drawing figure
        this.app.ctx.beginPath();
        // starting position
        app.ctx.moveTo(points[0].x, points[0].y);
        //drawing lines between points
        for (i=1; points[i]; i++) {
            app.ctx.lineTo(points[i].x, points[i].y);
        }
        // going back to the first point
        app.ctx.lineTo(points[0].x, points[0].y);
        this.app.ctx.stroke();

        this.app.ctx.strokeStyle = oldStyle;
    }

    calculateSquare() {
        // Geron's formula to calculate square of triangle (and square of parallalogram is double of that)
        let a = this.x1.sub(this.x2).mag();
        let b = this.x1.sub(this.x3).mag();
        let c = this.x2.sub(this.x3).mag();

        // half of perimeter
        let p = (a+b+c)/2;

        // double triangle square
        return (2*Math.sqrt(p*(p-a)*(p-b)*(p-c)));
    }

    // sorting points clockwise
    sortPoints(a, b) {
        // getting vectors relative to c
        let x1 = a.sub(this.center);
        let x2 = b.sub(this.center);

        return (x1.heading() - x2.heading());
    }
}