const infectionStates = {
    SUSCEPTIBLE: 'susceptible',
    INFECTED: 'infected',
    RECOVERED: 'recovered'
}

class Agent {



    constructor(pos) {
        this.pos = pos;
        this.radius = 10;
        this.infState = infectionStates.SUSCEPTIBLE;
        this.velocity = 3;
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
    update(sketch, agent){
        let xVelocity = sketch.random(-5.5,5.5);
        let yVelocity = sketch.random(-5.5,5.5);
        let previousPos = this.pos;
        let inRangeOfOtherAgent = false;
        this.pos.add(sketch.createVector(xVelocity,yVelocity));
        if(agent != undefined){
               inRangeOfOtherAgent  = this.inRange(agent, sketch);
        }
        if(this.pos.x >= 395 || this.pos.x <= 5 || this.pos.y >= 395 || this.pos.y <= 5|| inRangeOfOtherAgent){
            this.pos = previousPos;
            this.pos.sub(sketch.createVector(xVelocity, yVelocity));
        }


    }
    inRange(agent, sketch){
      return sketch.dist(this.pos.x, this.pos.y, agent.pos.x, agent.pos.y)<=infectionRadius
    }
    recovered(){
        if(this.timeInfected == 3){
            this.infState = infectionStates.RECOVERED;
            this.timeInfected = 0;
            return true;
        }
        return false;
    }

}