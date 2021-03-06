var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var creepFunctions = require('creepFunctions');

var maxBuilders = 4;
var maxHarvesters = 1;
var maxUpgraders = 4;

module.exports.loop = function () {


    // Garbage collector
    // clear dead creeps from memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // Loop through Rooms with a controller i own
    _.forEach(Game.rooms, function(room){
        //console.log(room, room.name);
        //console.log('Room ' + room.name + ' has ' + Game.rooms[room.name].energyAvailable+' energy');

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        //console.log('Harvesters: ' + harvesters.length);


        // Spawn builders
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        //console.log('Builders: ' + builders.length);
        let builderCensus = _.get(room.memory, ['census', 'builder'], maxBuilders);
        let builderSites = room.find(FIND_CONSTRUCTION_SITES);
        //console.log('Construction sites: ' + builderSites.length);
        
        if(builderSites.length > 0 && builders.length < builderCensus) {
            let newName = 'Builder' + Game.time;
            //console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                {memory: {role: 'builder'}});
        }

        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        //console.log('Upgraders: ' + upgraders.length);
        let upgraderCensus = _.get(room.memory, ['census', 'upgrader'], maxUpgraders);
        
        if(upgraders.length < upgraderCensus) {
            let newName = 'Upgrader' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                {memory: {role: 'upgrader'}});
        }

        // Spawn harvesters

        let harvesterCensus = _.get(room.memory, ['census', 'harvester'], maxHarvesters);

        if(harvesters.length < harvesterCensus) {
            let newName = 'Harvester' + Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'harvester'}});
        }
    });


    // Defense Tower

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
    // Run roles

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}