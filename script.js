// Elements 
const apps = document.querySelector("#br-os-apps");
let menu = document.querySelector("#os-ct-menu");
const os_window = document.querySelector(".br-os-window");
const brand_window = document.querySelector(".brand");
const app_main = document.querySelector("#app-main");
const maximise = document.querySelector("#maximise");
const shorter = document.querySelector("#shorter");
const cross = document.querySelector("#cross");
const taskbar = document.querySelector("#taskbar");
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

// Operations 
/* reseting window */
close(os_window)
/* Creating Apps */
create_app("File Manager", "./images/images.png", "file-manager")
create_app("Recycling Bin", "./images/9268d3e343b3a9c8b9d764698ff6025d.jpg", "recycle-bin")
create_app("Settings", "./images/unnamed (1).png", "settings")
create_app("System Info", "./images/download.png", "system-info")

// Functions 
function create_app(name, image, id) {
  let app = document.createElement("div")
  app.classList.add("app")
  app.id = id
  app.setAttribute("onclick", "window_open('" + id + "')")
  app.oncontextmenu = e => {
    open_menu(e, id)
  }
  let img = document.createElement("img")
  img.src = image
  img.setAttribute("alt", name)
  let p = document.createElement("p")
  p.innerText = name
  app.appendChild(img)
  app.appendChild(p)
  apps.appendChild(app)
}

function open (tag) {
  tag.style.display = "block"

}

function close(tag) {
  tag.style.display = "none"
}

function window_open (id) {
  brand_window.innerHTML = ""
  app_main.innerHTML = ""
  init_window()
  
  let main = document.querySelector("#" + id)
  
  let img = document.createElement("img")
  img.src = main.childNodes[0].src
  img.setAttribute("alt", main.childNodes[0].getAttribute("alt"))
  
  let p = document.createElement("p")
  p.innerText = main.childNodes[1].innerText
  brand_window.appendChild(img)
  brand_window.appendChild(p)
  
  open(os_window)
  }
  
  function init_window() {
    close(shorter)
    maximise.onclick = e => {
      maximise_window()
    }
    shorter.onclick = e => {
      shorter_window()
    }
    cross.onclick = e => {
      close(os_window)
      os_window
    }
  }
  
  function maximise_window() {
    open(shorter)
    close(maximise)
    window.restoreX = os_window.style.left
    window.restoreY = os_window.style.top
    os_window.style.top = 0
    os_window.style.left = 0
    os_window.style.width = "100%"
    os_window.style.height = "100vh"
  }
  
  function shorter_window() {
    open(maximise)
    close(shorter)
    os_window.style.top = window.restoreY
    os_window.style.left = window.restoreX
    os_window.style.width = "60%"
    os_window.style.height = "60vh"
  }
  
  function open_menu(e, id) {
    e.preventDefault()
    menu.classList.add("active")
    menu.querySelectorAll("ul li")[0].childNodes[0].onclick = () => {
      window_open(id)
    }
    menu.querySelectorAll("ul li")[1].childNodes[0].onclick = () => {
      admin_access(id)
    }
    menu.querySelectorAll("ul li")[2].childNodes[0].onclick = () => {
      remove_app(id)
    }

    menu.style.top = e.pageY + 5 + "px"
    menu.style.left = e.pageX + 5 + "px"
    return false
  }

  function admin_access(id) {
    vex.dialog.confirm({
      message: " Are you sure you want to give admin access to this app?", callback: function(value) {
        if(value) {
          window_open(id)
        } else {
          vex.dialog.alert({
            message: "Request denied"
          })
        }
      }
    })
  }

  function remove_app(id) {
    vex.dialog.confirm({
      message: " Are you sure you want to remove this app?", callback: function(value) {
        if(value) {
          document.querySelector("#" + id).remove()
        } else {
          vex.dialog.alert({
            message: "App is not removed"
          })
        }
      }
    })
  }

  /**
   * 
   * @param {Date} date 
   */
  function formatTime (date) {
    const hours12 = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const isAm = date.getHours() < 12;

    return `${hours12.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
  }
    /**
     * 
     * @param {Date} date  
     */
function formatDate(date) {
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}

setInterval(() => {
  const now = new Date();
  timeElement.textContent = formatTime(now)
  dateElement.textContent = formatDate(now);
}, 200);


  // Anonymous functions in Event Listeners
  
  window.onclick = e => {
    if (menu.classList.contains("active")) {
      menu.classList.remove("active")
    }
  }
  
  os_window.ondragend = e => {
    let go_top = e.pageY
    let go_left = e.pageX
    if (go_top < 0) {
      go_top = 0
    }
    if (go_left < 0) {
      go_left = 0
    }
    os_window.style.top = go_top + "px"
    os_window.style.left = go_left + "px"
  }