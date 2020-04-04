const showRadiiCheckbox = document.getElementById("show-radii");
const infectionRateSlider = document.getElementById("infection-rate-slider");
const infectionRadiusSlider = document.getElementById("infection-radius-slider");
const infectionRateLabel = document.getElementById("infection-rate-label");
let playing = true;
let socialDistancing = false;
let showRadii;
let infectionRate = 20;
let infectionRadius = 25.0;


let simulator = function (sketch) {
    const numOfAgents = 200;
    let allAgents = [];
    sketch.setup = () => {

        let canvas = sketch.createCanvas(400, 400);
        canvas.parent('simulator-placeholder');
        for (let i = 0; i < numOfAgents; i++) {
            let agent = new Agent(sketch.createVector(sketch.random(5, 395), sketch.random(5, 395)), sketch);
            agent.changeAcceleration(sketch);
            if (i < 5)
                agent.infState = infectionStates.INFECTED;
            allAgents.push(agent);


        }


    }
    sketch.draw = () => {
        sketch.background(0);
        for (let agent of allAgents) {
            agent.show(sketch);
            agent.changeAcceleration(sketch);
            let agentsInRange = [];
            for (let agent1 of allAgents) {
                if (agent.inRange(agent1, sketch) && agent1 !== agent) {
                    agentsInRange.push(agent1);
                }
            }
            agent.update(sketch, agentsInRange);
        }


        // if((infectedAgents.length == numOfAgents || infectedAgents.length == 0 || recoveredAgents.length == numOfAgents) && timeUnit > 1){
        //     alert("The epidemic is over");
        //     sketch.noLoop();
        // }
    }
    sketch.restart = () => {
        recoveredAgents = [];
        infectedAgents = [];
        susceptibleAgents = [];
        allAgents = [];
        sketch.setup();
    }

}
let sim = new p5(simulator);

function getRadiusCheckboxValue() {
    showRadii = showRadiiCheckbox.checked;
}

infectionRateSlider.oninput = function () {
    infectionRate = this.value;
    infectionRateLabel.innerHTML = "Infection rate in %: " + infectionRate;
}
infectionRadiusSlider.oninput = function () {
    infectionRadius = this.value;
}

function toggleSocialDistancing() {
    socialDistancing = !socialDistancing;
}

function play() {
    playing = !playing;
    if (playing)
        sim.loop();
    else
        sim.noLoop();

}