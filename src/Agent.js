const infectionStates = {
    SUSCEPTIBLE: 'susceptible',
    INFECTED: 'infected',
    RECOVERED: 'recovered'
}

class Agent {



    constructor(pos) {
        this.pos = pos;
        this.radius = 5;
        this.infState = infectionStates.SUSCEPTIBLE;
        this.velocity = 3;
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
    update(sketch){
        let xVelocity = sketch.random(-2.5,2.5);
        let yVelocity = sketch.random(-2.5,2.5);
        let previousPos = this.pos;
        this.pos.add(sketch.createVector(xVelocity,yVelocity));
        if(this.pos.x >= 395 || this.pos.x <= 5 || this.pos.y >= 395 || this.pos.y <= 5){
            this.pos = previousPos;
            this.pos.sub(sketch.createVector(xVelocity, yVelocity));
        }

    }
    inRange(agent, sketch){

        if(sketch.dist(this.pos.x, this.pos.y, agent.pos.x, agent.pos.y)<=infectionRadius)
            return true;
        return false;

    }
}