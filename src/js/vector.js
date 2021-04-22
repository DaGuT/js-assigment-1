// vector class with functions that I need

class Vector {
    // storing vector coords
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    // adding another vector
    add(vec2) {
        return new Vector(this.x + vec2.x, this.y + vec2.y);
    }

    sub(vec2) {
        return new Vector(this.x - vec2.x, this.y - vec2.y);
    }

    mag() {
        return Math.sqrt(this.x**2+this.y**2);
    }

    // division by scalar
    div (a) {
        return new Vector(Math.floor(this.x / a), Math.floor(this.y / a));
    }

    heading() {
        return Math.atan2(this.y,this.x)
    }
}