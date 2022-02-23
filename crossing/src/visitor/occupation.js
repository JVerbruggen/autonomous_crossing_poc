class StandardOccupation{
    constructor(by){
        this.by = by;
    }

    isBlocked(forOther){
        return this.by != forOther;
    }

    isOccupiedBy(vehicle){
        return this.by == vehicle;
    }
}