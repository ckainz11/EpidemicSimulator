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
        this.timeAtMarket = 0;
        this.atMarket = false;

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
        let infectionFrame = false
        if(sketch.frameCount % timeUnit ==  0 && this.infState == infectionStates.INFECTED){
            infectionFrame = true;
            this.timeInfected += 1;
        }


        for(let agent of agentsInRange){
            if(socialDistancing) {
                let distance = p5.Vector.sub(this.pos, agent.pos);
                distance.setMag(10);
                this.acc.add(distance);
            }
            if(this.infState === infectionStates.INFECTED && infectionFrame){
                if(agent.infState === infectionStates.SUSCEPTIBLE && sketch.random(100)<infectionRate){
                    agent.infState = infectionStates.INFECTED;
                }
            }
        }
        if(this.timeInfected == recoverTime && this.infState === infectionStates.INFECTED)
            this.infState = infectionStates.RECOVERED;
        if(sketch.random(100) > 95 && sketch.frameCount % timeUnit == 0 && marketEnabled){
            this.pos.x = marketLocation.x;
            this.pos.y = marketLocation.y;
        }
        else {
            this.vel.add(this.acc);
            this.vel.setMag(1);
            this.pos.add(this.vel);
            if (this.pos.x >= 395) {
                this.pos.x = 395;
            } else if (this.pos.x <= 5) {
                this.pos.x = 5;
            } else if (this.pos.y >= 395) {
                this.pos.y = 395;
            } else if (this.pos.y <= 5) {
                this.pos.y = 5;
            }
        }
    }
    inRange(agent, sketch){
      return this.pos.dist(agent.pos)<=infectionRadius;
    }
    changeAcceleration(sketch){
        this.acc = p5.Vector.fromAngle((sketch.noise(sketch.frameCount / 500 + this.offset)*100)%(2*Math.PI));
        this.acc.setMag(10);
    }

}