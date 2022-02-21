class ConflictSection{
    constructor(conA, conB, fromA, toA, fromB, toB, t){
        this.conA = conA;
        this.conB = conB;
        this.fromA = fromA;
        this.toA = toA;
        this.fromB = fromB;
        this.toB = toB;
        this.t = t;
        this.occupiedBy = null;
    }

    draw(){
        for(let i = this.fromA; i <= this.toA; i+=this.t){
            this.drawSpec(this.conA, i);
        }
        for(let j = this.fromB; j <= this.toB; j+=this.t){
            this.drawSpec(this.conB, j);
        }
    }

    drawSpec(con, i){
        let x = bezierPoint(con.x1, con.x2, con.x3, con.x4, i);
        let y = bezierPoint(con.y1, con.y2, con.y3, con.y4, i);
        noStroke();
        colorMode(RGB);
        fill(color(255,0,0));
        circle(x,y,5);
    }

    setOccupation(vehicle){
        this.occupiedBy = vehicle;
    }

    isOccupied(){
        return this.occupiedBy != null;
    }

    isOccupiedBy(vehicle){
        return this.occupiedBy == vehicle;
    }
}
