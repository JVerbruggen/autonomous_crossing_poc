class NotSupervisedSupervisor{
    constructor(){
        
    }

    updateVehicles(){
        let i = 0;
        for(let vehicle of vehicles){
            if(vehicle.drivingOn == null){
            vehicles.splice(i,1);
            continue;
            }

            vehicle.doTick();
            vehicle.draw();

            i++;
        }
    }
}

class SelfRegulatedSupervisor{
    constructor(){
        
    }

    updateVehicles(){
        let i = 0;
        for(let vehicle of vehicles){
            if(vehicle.drivingOn == null){
                vehicles.splice(i,1);
                continue;
            }

            this.updateVehicle(vehicle);
            i++;
        }
    }

    updateVehicle(vehicle){
        let newProgression = vehicle.drivingOnProgression + vehicle.speed*vehicle.drivingTowards / vehicle.drivingOn.getLength();
        if(!vehicle.drivingOn.shouldWait(newProgression, vehicle)){
            vehicle.drivingOnProgression = newProgression;
        }

        if((vehicle.drivingOnProgression >= 1 && vehicle.drivingTowards == ToEnd)
        || (vehicle.drivingOnProgression <= 0 && vehicle.drivingTowards == ToStart)){
            vehicle.drivingOn.removeVehicle(vehicle);

            vehicle.drivingOn = vehicle.drivingOn.getNextDrivingOn(vehicle.drivingOnProgression,vehicle);
            if(vehicle.drivingTowards == ToEnd) vehicle.drivingOnProgression = 0;
            else vehicle.drivingOnProgression = 1;

            if(vehicle.drivingOn != null){
                vehicle.drivingOn.addVehicle(vehicle);
            }else return;
        }

        let loc = vehicle.drivingOn.getLocationAt(vehicle.drivingOnProgression);
        vehicle.x = loc.loc.x;
        vehicle.y = loc.loc.y;
        vehicle.dx = loc.dir.x;
        vehicle.dy = loc.dir.y;


        vehicle.doTick();
        vehicle.draw();
    }
}