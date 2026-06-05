const apps = [
{
    name:"nx-whbmenu",
    author:"landabug",
    version:"/",
    description:"Fun Fact: You are currently in this application.",
    icon:"icons/hbmenu.png",
    url:"https://landabug.github.io/nx-whbmenu/"
},
{
    name:"BrowseDNS",
    author:"BrowseDNS Team",
    version:"/",
    description:"Allows browsing the internet.",
    icon:"icons/BrowseDNS.jpeg",
    url:"https://browsedns.com/"
},
{
    name:"VoidDock",
    author:"landabug",
    version:"2.0.0",
    description:"Web app to test all kinds of things in your browser.",
    icon:"icons/VoidDock.png",
    url:"https://landabug.github.io/voiddock/"
},
{
    name:"Placeholder",
    author:"You",
    version:"1.0.0",
    description:"More Apps will be added soon.",
    icon:"icons/placeholder.png",
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

    start = Math.max(
    0,
    Math.min(
        start,
        Math.max(0, apps.length - visibleSlots)
    )
);

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

window.open(app.url, "_blank");
}

/* ---------------- NAVIGATION ---------------- */

function moveRight(){

    if(selected < apps.length - 1){

        selected++;

        if(selected >= start + visibleSlots){
            start = selected - visibleSlots + 1;
        }

        updateInfo();
        renderDock();
    }
}

function moveLeft(){

    if(selected > 0){

        selected--;

        if(selected < start){
            start = selected;
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

let gamepadIndex = null;
let gpCooldown = false;

/* CONNECT / DISCONNECT */

window.addEventListener("gamepadconnected", (e) => {
    gamepadIndex = e.gamepad.index;
});

window.addEventListener("gamepaddisconnected", () => {
    gamepadIndex = null;
});

/* JOYSTICK LOOP */

function pollGamepad() {

    if (gamepadIndex !== null) {

        const gp = navigator.getGamepads()[gamepadIndex];

        if (gp && !gpCooldown) {

            const x = gp.axes[0];
            const deadzone = 0.5;

            if (x < -deadzone) {
                moveLeft();
                gpCooldown = true;
                setTimeout(() => gpCooldown = false, 180);
            }

            if (x > deadzone) {
                moveRight();
                gpCooldown = true;
                setTimeout(() => gpCooldown = false, 180);
            }

            if (gp.buttons[0].pressed) {
                openApp();
                gpCooldown = true;
                setTimeout(() => gpCooldown = false, 300);
            }
        }
    }

    requestAnimationFrame(pollGamepad);
}

pollGamepad();
