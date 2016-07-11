'esversion: 6';

class Player {
    constructor () {
        this.health = 20;
        this.charge = false;
        this.direction = 'backward';
        this.acted = false;

    }

    playTurn (warrior) {
        this.acted = false;
        if (warrior.health < 10) {
            this.charge = false;
        }
        this.checkDirection(warrior);   //Set direction to go
        if (!this.acted) {
            this.checkCaptive(warrior);     //check if you found a captiv
        }
        console.log(this.charge);
        if (!this.acted && !this.charge) { //if not charging then check if need to rest
            this.checkRest(warrior);
        }
        if (!this.acted) {
            this.checkCharge(warrior);
        }
        if (!this.acted) {
            this.checkAttack(warrior);
        }
        if (!this.acted) {
            warrior.walk(this.direction); //walk!
        }
        this.health = warrior.health();
    }

    checkDirection (warrior) {
        var feel = warrior.feel(this.direction);
        if (feel.isWall()) {
            this.oppositeDirection();
        }
    }

    checkCaptive (warrior) {
        var feel = warrior.feel(this.direction);
        if (feel.isCaptive()) {
            warrior.rescue(this.direction);
            this.acted = true;
        }
    }

    checkRest (warrior) {
        console.log('check rest');
        if (warrior.health < this.health) { //taking damage
            this.oppositeDirection(); // turn around
            warrior.walk(this.direction);
            this.acted = true;
        } else if (warrior.health < 20) {
            console.log('resting');
            warrior.rest();
            this.acted = true;
        }
        if (this.acted && warrior.health == 20) { //all healed turnaround and run
            this.oppositeDirection();
        }
    }

    checkCharge (warrior) {
        if (warrior.health == 20) {
            this.charge = true;
        }
    }

    checkAttack (warrior) {
        var feel = warrior.feel(this.direction);
        if (feel.isEnemy()) {
            warrior.attack(this.direction);
            this.acted = true;
        }
    }

    oppositeDirection () {
        if (this.direction == 'forward') {
            this.direction = 'backward';
        } else {
            this.direction = 'forward';
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
