var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        //debug
        console.log(creep + ' free capacity: ' + creep.store.getFreeCapacity() );
        
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            //debug
            console.log(creep + ' targets: ' + targets);
            console.log(creep + ' targets.length: ' + targets.length);
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            // move randomly
            else{
                const directions = [RIGHT, LEFT, TOP, TOP_RIGHT, TOP_LEFT, BOTTOM, BOTTOM_LEFT, BOTTOM_RIGHT]
                const randomDirection = directions[Math.floor(Math.random() * directions.length)];
                creep.move(randomDirection);
            }
        }
    }
};

module.exports = roleHarvester;