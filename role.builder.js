var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // Set working state
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.say('🚧 build');
        }

        // working = build
        if(creep.memory.working) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        // move randomly
        else{
            const directions = [RIGHT, LEFT, TOP, TOP_RIGHT, TOP_LEFT, BOTTOM, BOTTOM_LEFT, BOTTOM_RIGHT]
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            creep.move(randomDirection);
        }
    }
};

module.exports = roleBuilder;