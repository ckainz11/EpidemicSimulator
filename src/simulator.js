const showRadiiCheckbox = document.getElementById("show-radii");
const infectionRateSlider = document.getElementById("infection-rate-slider");
const infectionRadiusSlider = document.getElementById("infection-radius-slider");
let showRadii;
let infectionRate = 20;
let infectionRadius = 25;



let simulator = function(sketch){
    let numOfAgents = 100;
    let agents = [];
    let infectedAgents = [];
    let timeUnit = 0;
    sketch.setup = () => {

        let canvas = sketch.createCanvas(400, 400);
        canvas.parent('simulator-placeholder');
        for(let i=0;i<numOfAgents;i++){
            let agent = new Agent(sketch.createVector(sketch.random(5, 395), sketch.random(5, 395)));
            if(sketch.random(100) > 80) {
                agent.infState = infectionStates.INFECTED;
                infectedAgents.push(agent);
            }
            else{
                agents.push(agent);
            }



        }


    }
    sketch.draw = () => {
        sketch.background(0);

        if(timeUnit == 200) {
            for (let infected of infectedAgents) {
                for (let i = agents.length - 1; i >= 0; i--) {
                    if (infected.inRange(agents[i], sketch) && sketch.random(100) < infectionRate) {
                        let newInfected = agents.splice(i, 1)[0];
                        newInfected.infState = infectionStates.INFECTED;
                        infectedAgents.push(newInfected);
                    }
                }
            }
            timeUnit = 0;
        }




        for(let agent of agents){
            agent.show(sketch);
            agent.update(sketch);
        }
        for(let infected of infectedAgents){
            infected.show(sketch);
            infected.update(sketch);
        }
        timeUnit++;

    }
    if(infectedAgents.length == numOfAgents){
        alert("The epidemic has taken over the environment");
        sketch.noLoop();
    }
}




let sim = new p5(simulator);
function getRadiusCheckboxValue(){
    showRadii = showRadiiCheckbox.checked;
}
infectionRateSlider.oninput = function(){
    infectionRate = this.value;

}
infectionRadiusSlider.oninput = function () {
    infectionRadius = this.value;
}