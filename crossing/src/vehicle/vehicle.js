const ToStart = -1;
const ToEnd = 1;

class DefaultVehicle{
    constructor(x,y,dx,dy,drivingOn,drivingTowards){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.speed = Math.random() * 3 + 3;
        this.drivingOn = drivingOn;
        this.drivingOnProgression = 1;
        this.drivingTowards = drivingTowards;
        this.width = 20;
        this.height = 35;

        this.visRectangle = this.getNewVisual();
    }

    getNewVisual(){
        return new Rotectangle(this.x,this.y,this.dx,this.dy,this.width,this.height);
    }

    setDrivingOn(drivingOn, towards){
        this.drivingOn = drivingOn;
        this.drivingTowards = towards;
        if(towards == ToStart) this.drivingOnProgression = 1;
        if(towards == ToEnd) this.drivingOnProgression = 0;
    }

    doTick(){
        if(this.drivingOn == null) return;
        let newProgression = this.drivingOnProgression + this.speed*this.drivingTowards / this.drivingOn.getLength();
        if(!this.drivingOn.shouldWait(newProgression, this)){
            this.drivingOnProgression = newProgression;
        }

        if((this.drivingOnProgression >= 1 && this.drivingTowards == ToEnd)
        || (this.drivingOnProgression <= 0 && this.drivingTowards == ToStart)){
            this.drivingOn.removeVehicle(this);

            this.drivingOn = this.drivingOn.getNextDrivingOn(this.drivingOnProgression,this);
            if(this.drivingTowards == ToEnd) this.drivingOnProgression = 0;
            else thise.drivingOnProgression = 1;

            if(this.drivingOn != null){
                this.drivingOn.addVehicle(this);
            }else return;
        }

        let loc = this.drivingOn.getLocationAt(this.drivingOnProgression);
        this.x = loc.loc.x;
        this.y = loc.loc.y;
        this.dx = loc.dir.x;
        this.dy = loc.dir.y;
    }

    draw(){
        this.visRectangle.x = this.x;
        this.visRectangle.y = this.y;
        this.visRectangle.setDYDX(this.dy,this.dx);
        this.visRectangle.draw();
    }

    relativeProgression(){
        if(ToEnd){
            return this.drivingOnProgression;
        }else{
            return 1-this.drivingOnProgression;
        }
    }
}

class SlaveVehicle extends DefaultVehicle{
    constructor(x,y,dx,dy,drivingOn,drivingTowards,routeCalculator){
        super(x,y,dx,dy,drivingOn,drivingTowards);
        this.route = routeCalculator.calculate(new RoutePoint(drivingOn, drivingTowards));
    }

    getNewVisual(){
        return new Rotectangle(this.x,this.y,this.dx,this.dy,this.width,this.height,color('rgb(0,0,255)'));
    }

    doTick(){
        // no calculations done for the vehicle itself, done by supervisor
    }
}