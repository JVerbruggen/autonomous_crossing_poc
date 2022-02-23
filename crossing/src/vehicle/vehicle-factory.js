var vehicleFactory;
function initVehicleFactory(factory){
    this.vehicleFactory = factory;
}

class DefaultVehicleFactory{
    CreateNewVehicle(x,y,dx,dy,drivingOn,drivingTowards){
        return new DefaultVehicle(x,y,dx,dy,drivingOn,drivingTowards);
    }

    CreateSupervisor(){
        return new NotSupervisedSupervisor();
    }
}

class MasterSlaveVehicleFactory{
    constructor(routeCalculator){
        this.routeCalculator = routeCalculator;
    }

    CreateNewVehicle(x,y,dx,dy,drivingOn,drivingTowards){
        return new SlaveVehicle(x,y,dx,dy,drivingOn,drivingTowards,this.routeCalculator);
    }

    CreateSupervisor(){
        return new SelfRegulatedSupervisor();
    }
}