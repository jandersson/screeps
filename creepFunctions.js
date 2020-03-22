Creep.prototype.findEnergySources = function() {
    let sources = this.room.find(FIND_SOURCES);
    if(sources.length){
        this.memory.source = sources[0].id;
        return sources[0];
    }
}

Creep.prototype.randomWalk = function() {
    let directions = [RIGHT, LEFT, TOP, TOP_RIGHT, TOP_LEFT, BOTTOM, BOTTOM_LEFT, BOTTOM_RIGHT]
    let randomDirection = directions[Math.floor(Math.random() * directions.length)];
    this.move(randomDirection);
}