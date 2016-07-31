/*jshint esversion: 6 */

class Player {
    constructor () {
        this.lastHealth = 20;
        this.takingDamage = false;
        this.fullHealth = true;
        this.readyToFight = true;
        this.currDirection = 'backward';
        this.action = ""; //default to walk
    }

    playTurn (warrior) {
        this.action = ""; //default to walk

        this.takingDamage = this.lastHealth > warrior.health();

        this.checkDirection(warrior); //which way should be facing
        this.checkRest(warrior); // Check if should be healing/done healing
        this.checkAttack(warrior); // Check if an enemy and ready
        this.checkRescue(warrior); //Check if something to rescue
        this.checkRunning(warrior); //Check if we should really be running


        this.commitAction(warrior);
        this.lastHealth = warrior.health();
    }

    commitAction (warrior) {
        if (this.action == 'rest') {
            warrior.rest();
        } else if (this.action == 'attack') {
            warrior.attack(this.currDirection);
        } else if (this.action == 'shoot') {
            warrior.shoot(this.currDirection);
        } else if (this.action == 'rescue') {
            warrior.rescue(this.currDirection);
        } else if (this.action == 'pivot') {
            warrior.pivot();
        } else {
            warrior.walk(this.currDirection);
        }
    }

    checkDirection (warrior) {
        if (warrior.feel(this.currDirection).isWall()) {
            this.turnArround();
            this.action = 'pivot';
        }
    }

    checkAttack (warrior) {
        if (warrior.feel(this.currDirection).isEnemy() && this.readyToFight) {
            this.action = "attack";
        } else if (warrior.look().find(space => space.isEnemy())) {
            this.action = 'shoot';
        }
    }

    checkRescue (warrior) {
        if (warrior.feel(this.currDirection).isCaptive()) {
            this.action = "rescue";
        } else if (warrior.look().find(space => space.isCaptive())) {
            this.action = "";
        }
    }

    checkRest (warrior) {
        if (warrior.health() < 20 && !this.takingDamage) { //heal to full
            this.action = "rest";
        } else if (warrior.health() == 20) {
            this.fullHealth = true;
            this.currDirection = 'forward'; //attack forward
        }
        this.readyToFight = warrior.health() > 10; //check low health
    }

    checkRunning (warrior) {
        if (!this.readyToFight && this.takingDamage) {
            this.currDirection = 'backward';
            this.action = "";
        }
    }

    turnArround () {
        if (this.currDirection == 'forward') {
            this.currDirection = 'backward';

        } else {
            this.currDirection = 'forward';
        }
    }

    /**
        check direction
        check for captives
            move towards
            rescue
        check for health
            taking damage?
                yes
                    move opposite of damage
                no
                    rest to full health
        check for attacking
            charge
    */

}
