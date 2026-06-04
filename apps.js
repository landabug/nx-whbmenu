const apps = [
{
    name:"Snake",
    author:"You",
    version:"1.0.0",
    description:"Classic snake game.",
    icon:"icons/snake.png",
    url:"#"
},
{
    name:"Calculator",
    author:"You",
    version:"1.1.0",
    description:"Quick calculations.",
    icon:"icons/calc.png",
    url:"#"
},
{
    name:"Browser",
    author:"You",
    version:"2.0.0",
    description:"Browse the web.",
    icon:"icons/browser.png",
    url:"#"
},
{
    name:"Settings",
    author:"You",
    version:"1.0.0",
    description:"Launcher settings.",
    icon:"icons/settings.png",
    url:"#"
},
{
    name:"Game 5",
    author:"You",
    version:"1.0",
    description:"Another app.",
    icon:"icons/snake.png",
    url:"#"
},
{
    name:"Game 6",
    author:"You",
    version:"1.0",
    description:"Another app.",
    icon:"icons/snake.png",
    url:"#"
},
{
    name:"Game 7",
    author:"You",
    version:"1.0",
    description:"Another app.",
    icon:"icons/snake.png",
    url:"#"
},
{
    name:"Game 8",
    author:"You",
    version:"1.0",
    description:"Another app.",
    icon:"icons/snake.png",
    url:"#"
}
];

const visibleSlots = 6;

let selected = 0;
let start = 0;

function updateInfo() {

    const app = apps[selected];

    document.getElementById("large-icon").src =
        app.icon;

    document.getElementById("app-name").textContent =
        app.name;

    document.getElementById("app-author").textContent =
        "by " + app.author;

    document.getElementById("app-version").textContent =
        "Version " + app.version;

    document.getElementById("app-description").textContent =
        app.description;
}

function renderDock() {

    const dock =
        document.getElementById("dock-apps");

    dock.innerHTML = "";

    const end =
        Math.min(start + visibleSlots, apps.length);

    for(let i=start;i<end;i++){

        const div =
            document.createElement("div");

        div.className =
            "app" + (i===selected ? " selected" : "");

        div.innerHTML = `
            <div class="app-title">${apps[i].name}</div>
            <img src="${apps[i].icon}">
        `;

        div.onclick = () => {
            selected = i;
            updateInfo();
            renderDock();
        };

        dock.appendChild(div);
    }
}

function moveRight(){

    if(selected < apps.length-1){

        selected++;

        if(
            selected >
            start + visibleSlots - 2
        ){
            start++;
        }

        updateInfo();
        renderDock();
    }
}

function moveLeft(){

    if(selected > 0){

        selected--;

        if(selected < start + 1){
            start--;
        }

        updateInfo();
        renderDock();
    }
}

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){
        moveRight();
    }

    if(e.key==="ArrowLeft"){
        moveLeft();
    }

    if(e.key==="Enter"){
        window.location.href =
            apps[selected].url;
    }

});

updateInfo();
renderDock();