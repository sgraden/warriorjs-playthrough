'esversion: 6';

class Player {
    constructor () {
        this.lastHealth = 20;
        this.fighting = false; //currently attacking something
        this.currDirection = 'backward';
        this.action = ""; //default to walk
    }

    playTurn (warrior) {
        this.action = ""; //default to walk
        this.checkDirection(warrior); //which way should be facing

        this.checkRest(warrior);
        this.checkRunning(warrior);
        this.checkAttack(warrior);
        this.checkRescue(warrior);

        this.commitAction(warrior);
        this.lastHealth = warrior.health();
    }

    commitAction (warrior) {
        if (this.action == "rest") {
            warrior.rest();
        } else if (this.action == "attack") {
            warrior.attack(this.currDirection);
        } else if (this.action == "rescue") {
            warrior.rescue(this.currDirection);
        } else {
            warrior.walk(this.currDirection);
        }
    }

    checkDirection (warrior) {
        if (warrior.feel(this.currDirection).isWall()) {
            this.turnArround();
        }
    }

    checkAttack (warrior) {
        if (warrior.feel(this.currDirection).isEnemy()) {
            this.fighting = true;
            this.action = "attack";
        } else {
            this.fighting = false;
        }
    }

    checkRescue (warrior) {
        if (warrior.feel(this.currDirection).isCaptive()) {
            this.action = "rescue";
        }
    }

    checkRest (warrior) {
        if (!this.fighting && warrior.health() < 20) { //heal to full
            this.action = "rest";
        }

        if (warrior.health() > 14) {
            this.readyToFight = true;
        } else {
            this.readyToFight = false;
        }
    }

    checkRunning (warrior) {
        if (!this.readyToFight) { //If not enough health check if healing
            // if taking damage and not fighting or low health and fighting
            //turn around, stop fighting, and walk
            if ((this.takingDamage(warrior) && !this.fighting) ||
                (warrior.health() < 6)) {

                this.turnArround();
                this.fighting = false;
                this.readyToFight = false;
                this.action = "";
            }
        }
    }

    turnArround () {
        if (this.currDirection == 'forward') {
            this.currDirection = 'backward';
        } else {
            this.currDirection = 'forward';
        }
    }

    takingDamage (warrior) {
        return this.lastHealth > warrior.health();
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
