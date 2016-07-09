'esversion: 6';

class Player {
    constructor () {
        this.health = 20;
    }

    playTurn (warrior) {
        var direction = this.checkAround(warrior);
        this.action(warrior, direction);
        this.health = warrior.health();
    }

    checkAround (warrior) {
        if (warrior.feel('forward')) {   //forward
            return 'forward';
        } else {                //backward
            return 'backward';
        }
    }

    action (warrior, direction) {
        var feel = warrior.feel(direction);
        if (feel.isEnemy()) {           //enemy
            warrior.attack();
        } else if (feel.isCaptive()) {  //captive
            warrior.rescue();
        } else if (warrior.health() < 20 && (warrior.health() >= this.health)) {
            warrior.rest();
        } else {                        //walk
            warrior.walk(direction);
        }
    }

}
