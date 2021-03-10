"use strict";

// The model of all features
const features = {
    tripod: false,
    waterbottle: false,
    trolley: false,
    blanket: false
  };

document.addEventListener("DOMContentLoaded", loadSVG);

let paint="";

function loadSVG() {
    console.log("loadSVG");

    fetch("backpack-01.svg")
    .then( response => response.text() )
    .then( svgData => {
        console.log("SVG loaded");

        // TODO: put the SVG into the DOM
        document.querySelector("section").innerHTML = svgData;
        // TODO: Start the animation
    startPersonalising();
    })
}

function startPersonalising() {
    console.log("startPersonalising");
    document.querySelectorAll(".option").forEach(option => option.addEventListener("click", toggleOption));
    document.querySelector(".color1").addEventListener("click", clickColor1);
    document.querySelector(".color2").addEventListener("click", clickColor2);
    document.querySelector(".color3").addEventListener("click", clickColor3);
    document.querySelector(".color4").addEventListener("click", clickColor4);
    document.querySelector(".color5").addEventListener("click", clickColor5);
    document.querySelector(".color6").addEventListener("click", clickColor6);
    document.querySelector(".pattern1").addEventListener("click", clickPattern1);
    document.querySelector(".pattern2").addEventListener("click", clickPattern2);
    document.querySelector("#body").classList.add("hover");
    document.querySelector("#cords").classList.add("hover");
    document.querySelector("#pads").classList.add("hover");
    document.querySelector("#stripes").classList.add("hover");
}

function clickColor1() {
    console.log("clickColor1");
    document.querySelector(".color1").removeEventListener("click", clickColor1);
    document.querySelector(".color1").classList.add("outline");
    paint = "darkgrey";

    backpackListener();
}

function clickColor2() {
    console.log("clickColor2");
    document.querySelector(".color2").removeEventListener("click", clickColor2);
    document.querySelector(".color2").classList.add("outline");
    paint = "#436134";

    backpackListener();
}

function clickColor3() {
    console.log("clickColor3");
    document.querySelector(".color3").removeEventListener("click", clickColor3);
    document.querySelector(".color3").classList.add("outline");
    paint = "wheat";

    backpackListener();
}

function clickColor4() {
    console.log("clickColor4");
    document.querySelector(".color4").removeEventListener("click", clickColor4);
    document.querySelector(".color4").classList.add("outline");
    paint = "#680C0C";

    backpackListener();
}

function clickColor5() {
    console.log("clickColor5");
    document.querySelector(".color5").removeEventListener("click", clickColor5);
    document.querySelector(".color5").classList.add("outline");
    paint = "#003F57";

    backpackListener();
}

function clickColor6() {
    console.log("clickColor6");
    document.querySelector(".color6").removeEventListener("click", clickColor6);
    document.querySelector(".color6").classList.add("outline");
    paint = "#C299B1";

    backpackListener();
}

function clickPattern1() {
    console.log("clickPattern1");
    document.querySelector(".pattern1").removeEventListener("click", clickPattern1);
    document.querySelector(".pattern1").classList.add("outline");
    paint = "url(#pattern-cubes)";

    backpackListener();
}

function clickPattern2() {
    console.log("clickPattern2");
    document.querySelector(".pattern2").removeEventListener("click", clickPattern2);
    document.querySelector(".pattern2").classList.add("outline");
    paint = "url(#pattern-hex)";

    backpackListener();
}

function backpackListener() {
    document.querySelector("#body").addEventListener("click", clickBody);
    document.querySelector("#cords").addEventListener("click", clickCords);
    document.querySelector("#pads").addEventListener("click", clickPads);
    document.querySelector("#stripes").addEventListener("click", clickStripes);
}

function clickBody() {
    console.log("clickBody");
    document.querySelector("#body").setAttribute("fill", paint);
    removalEventListeners();
    startPersonalising();
}

function clickCords() {
    console.log("clickCords");
    document.querySelector("#cords").setAttribute("fill", paint);
    removalEventListeners();
    startPersonalising();
}

function clickPads() {
    console.log("clickPads");
    document.querySelector("#pads").setAttribute("fill", paint);
    removalEventListeners();
    startPersonalising();
}

function clickStripes() {
    console.log("clickStripes");
    document.querySelector("#stripes").setAttribute("fill", paint);
    removalEventListeners();
    startPersonalising(); 
}

function removalEventListeners() {
    document.querySelector("#body").removeEventListener("click", clickBody);
    document.querySelector("#cords").removeEventListener("click", clickCords);
    document.querySelector("#pads").removeEventListener("click", clickPads);
    document.querySelector("#stripes").removeEventListener("click", clickStripes);
}

function toggleOption(event) {
    const target = event.currentTarget;
    const feature = target.dataset.feature;
  
    // Toggle
    console.log(features[feature]);
    if(features[feature]) {
      features[feature] = false ;
    } else {
      features[feature] = true;
    }

  
    if (features[feature]) {
      // feature added
      console.log(`Feature ${feature} is turned on!`);
  
      // TODO: More code
      document.querySelector(`#backpack [data-feature = ${feature}]`).classList.remove("hide");
      target.classList.add("chosen");
      let feat = createFeatureElement(feature);
      document.querySelector("#selected ul").appendChild(feat);
    
      // first
      const start = document.querySelector(`#options > [data-feature=${feature}]`).getBoundingClientRect();
      // last
      const end  = document.querySelector(`#selected ul [data-feature=${feature}]`).getBoundingClientRect();
      // invert
      const diffX = start.x - end.x;
      const diffY = start.y - end.y;
  
      document.querySelector(`#selected ul [data-feature=${feature}]`).style.setProperty("--diffY", diffY);
      document.querySelector(`#selected ul [data-feature=${feature}]`).style.setProperty("--diffX", diffX);
      // play
      document.querySelector(`#selected ul [data-feature=${feature}]`).classList.add("animate-feature-in");

    } else {
      // feature removed
      console.log(`Feature ${feature} is turned off!`);
      
      // TODO: More code
      document.querySelector(`#backpack [data-feature = ${feature}]`).classList.add("hide");
      target.classList.remove("chosen");
    // first
    const start = document.querySelector(`#options > [data-feature=${feature}]`).getBoundingClientRect();
    // last
    const end  = document.querySelector(`#selected ul [data-feature=${feature}]`).getBoundingClientRect();
    // invert
    const diffX =  start.x - end.x;
    const diffY =  start.y - end.y;

    document.querySelector(`#selected ul [data-feature=${feature}]`).style.setProperty("--diffY", diffY);
    document.querySelector(`#selected ul [data-feature=${feature}]`).style.setProperty("--diffX", diffX);
    // play
    document.querySelector(`#selected ul [data-feature=${feature}]`).classList.add("animate-feature-out");
    document.querySelector(`#selected ul [data-feature=${feature}]`).addEventListener("animationend" ,() =>{ 
      dell(feature);
    })
  }
  }
  
  function dell (feature) {
    document.querySelector(`#selected ul [data-feature=${feature}]`).remove()
  }
  
  // Create featureElement to be appended to #selected ul - could have used a <template> instead
  function createFeatureElement(feature) {
    console.log("createFeatureElement");
    const li = document.createElement("li");
    li.dataset.feature = feature;
  
    const img = document.createElement("img");
    img.src = `images/add_${feature}_feature.png`;
    img.alt = capitalize(feature);
  
    li.append(img);
  
    return li;
  }
  
  function capitalize(text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
  }

