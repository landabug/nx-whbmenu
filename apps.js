const apps = [
{
    name:"Snake",
    author:"You",
    version:"1.0.0",
    description:"Classic snake game.",
    icon:"icons/snake.png",
    url:"apps/snake/index.html"
},
{
    name:"Calculator",
    author:"You",
    version:"1.0.0",
    description:"Simple calculator tool.",
    icon:"icons/calc.png",
    url:"apps/calculator/index.html"
},
{
    name:"Browser",
    author:"You",
    version:"1.0.0",
    description:"Open web pages.",
    icon:"icons/browser.png",
    url:"https://example.com"
},
{
    name:"Settings",
    author:"You",
    version:"1.0.0",
    description:"System settings panel.",
    icon:"icons/settings.png",
    url:"#"
}
];

let selected = 0;
let start = 0;

const visibleSlots = 6;

/* ---------------- INFO PANEL ---------------- */

function updateInfo(){
    const app = apps[selected];

    document.getElementById("large-icon").src = app.icon;
    document.getElementById("app-name").textContent = app.name;
    document.getElementById("app-author").textContent = "by " + app.author;
    document.getElementById("app-version").textContent = "Version " + app.version;
    document.getElementById("app-description").textContent = app.description;
}

/* ---------------- DOCK RENDER ---------------- */

function renderDock(){

    const dock = document.getElementById("dock-apps");
    dock.innerHTML = "";

    const end = Math.min(start + visibleSlots, apps.length);

    for(let i = start; i < end; i++){

        const div = document.createElement("div");

        div.className = "app" + (i === selected ? " selected" : "");

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

/* ---------------- OPEN APP (NEW WINDOW) ---------------- */

function openApp(){

    const app = apps[selected];

    if(app.url === "#") return;

    window.open(
        app.url,
        "_blank",
        "width=1000,height=700"
    );
}

/* ---------------- NAVIGATION ---------------- */

function moveRight(){

    if(selected < apps.length - 1){
        selected++;

        if(selected > start + visibleSlots - 2){
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

/* ---------------- INPUT ---------------- */

document.addEventListener("keydown",(e)=>{

    if(e.key === "ArrowRight") moveRight();
    if(e.key === "ArrowLeft") moveLeft();

    if(e.key === "Enter") openApp();
});

/* ---------------- INIT ---------------- */

updateInfo();
renderDock();
