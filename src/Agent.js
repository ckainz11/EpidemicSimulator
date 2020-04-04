const infectionStates = {
    SUSCEPTIBLE: 'susceptible',
    INFECTED: 'infected',
    RECOVERED: 'recovered'
}

class Agent {



    constructor(pos, sketch) {
        this.offset = sketch.random(10000);
        this.pos = pos;
        this.radius = 10;
        this.infState = infectionStates.SUSCEPTIBLE;
        this.vel = p5.Vector.random2D();
        this.vel.mult(sketch.random(3));
        this.acc = sketch.createVector(0,0);
        this.timeInfected = 0;

    }
    show(sketch){
        switch (this.infState) {
            case infectionStates.SUSCEPTIBLE: sketch.fill(45, 74, 83); break;
            case infectionStates.INFECTED: {
                if(showRadii) {
                    sketch.noFill();
                    sketch.stroke(78, 225, 56);
                    sketch.ellipse(this.pos.x, this.pos.y, infectionRadius * 2, infectionRadius * 2);
                    sketch.noStroke();
                }
                sketch.fill(78, 225, 56);
                break;
            }
            case infectionStates.RECOVERED: sketch.fill(70); break;
        }
        sketch.ellipse(this.pos.x, this.pos.y, this.radius, this.radius);

    }
    update(sketch, agentsInRange){


        for(let agent of agentsInRange){
            let distance = p5.Vector.sub(this.pos, agent.pos);
            distance.setMag(10);
            this.acc.add(distance);
        }

        this.vel.add(this.acc);
        this.vel.setMag(1);
        this.pos.add(this.vel);
        if(this.pos.x >= 405){
            this.pos.x = 5;
        }
        else if(this.pos.x <= -5){
            this.pos.x = 395;
        }
        else if(this.pos.y >= 405){
            this.pos.y = 5;
        }
        else if(this.pos.y <= 5){
            this.pos.y = 395;
        }
    }
    inRange(agent, sketch){
      return this.pos.dist(agent.pos)<=infectionRadius;
    }
    recovered(){
        if(this.timeInfected == 3){
            this.infState = infectionStates.RECOVERED;
            this.timeInfected = 0;
            return true;
        }
        return false;
    }
    changeAcceleration(sketch){
        this.acc = p5.Vector.fromAngle((sketch.noise(sketch.frameCount / 500 + this.offset)*100)%(2*Math.PI));
        this.acc.setMag(10);
    }

}