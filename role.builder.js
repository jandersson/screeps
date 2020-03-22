var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // Set working state
        if(creep.memory.isWorking && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.isWorking = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.isWorking && creep.store.getFreeCapacity() == 0) {
            creep.memory.isWorking = true;
            creep.say('🚧 build');
        }

        // isWorking = build
        if(creep.memory.isWorking) {
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        
        if(creep.store.getFreeCapacity() > 0 && !creep.memory.isWorking) {
            let sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        // move randomly
        if(!creep.memory.isWorking && !creep.store.getFreeCapacity()){
            creep.say('idle');
            creep.randomWalk();
        }
    }
};

module.exports = roleBuilder;