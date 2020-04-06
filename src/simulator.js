const showRadiiCheckbox = document.getElementById("show-radii");
const infectionRateSlider = document.getElementById("infection-rate-slider");
const infectionRadiusSlider = document.getElementById("infection-radius-slider");
const infectionRateLabel = document.getElementById("infection-rate-label");
const timeUnitField = document.getElementById("time-unit");
const recoverTimeField = document.getElementById("recover-time");
const marketLocation = {x: 200, y:200};
let marketEnabled = false;
let recoverTime = 3;
let timeUnit = 60;
let playing = true;
let socialDistancing = false;
let showRadii;
let infectionRate = 20;
let infectionRadius = 25.0;


let simulator = function (sketch) {
    const numOfAgents = 300;

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
        if(marketEnabled) {
            sketch.fill(255, 0, 0);
            sketch.ellipse(marketLocation.x, marketLocation.y, infectionRadius * 4, infectionRadius * 4);
        }
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
    }



    sketch.restart = () => {
        allAgents = [];
        sketch.loop();
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
function toggleMarket(){
    marketEnabled = !marketEnabled;
}
timeUnitField.oninput = function () {
    timeUnit = this.value * 60;
}
recoverTimeField.oninput = function () {
    recoverTime = this.value;
}
function play() {
    playing = !playing;
    if (playing)
        sim.loop();
    else
        sim.noLoop();

}