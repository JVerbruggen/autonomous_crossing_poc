class Rotectangle{
    constructor(x,y,dx,dy,width,height,c=color('rgb(255,0,0)')){
        this.halfWidth = width/2;
        this.halfHeight = height/2;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = c;

        this.setDYDX(dy,dx);
    }    

    setDYDX(dy,dx){
        this.dy = dy;
        this.dx = dx;
        this.d = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        if(this.d == 0){
            this.dx = this.dx;
            this.dy = this.dy;
        }else{
            this.dx = this.dx/this.d;
            this.dy = this.dy/this.d;
        }
    }

    draw(){
        let x1 = this.x + this.halfWidth*this.dx - this.halfHeight*(-this.dy);
        let y1 = this.y - this.halfWidth*this.dy - this.halfHeight*(-this.dx);
        let x2 = this.x - this.halfWidth*this.dx - this.halfHeight*(-this.dy);
        let y2 = this.y + this.halfWidth*this.dy - this.halfHeight*(-this.dx);

        let x3 = this.x - this.halfWidth*this.dx + this.halfHeight*(-this.dy);  
        let y3 = this.y + this.halfWidth*this.dy + this.halfHeight*(-this.dx);
        let x4 = this.x + this.halfWidth*this.dx + this.halfHeight*(-this.dy);
        let y4 = this.y - this.halfWidth*this.dy + this.halfHeight*(-this.dx);

        stroke(this.color);
        strokeWeight(1);
        fill(this.color);
        quad(x1,y1,x2,y2,x3,y3,x4,y4);

        noStroke();
        circle(this.x,this.y,5);
    }
}