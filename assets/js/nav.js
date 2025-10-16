// add classes for mobile navigation toggling
var body = document.querySelector("body");
const navbarMenu = document.querySelector("#main_nav");
const hamburgerMenu = document.querySelector("#main_nav .nav_mobile_toggle");

hamburgerMenu.addEventListener("click", function() {
    hamburgerMenu.classList.toggle("active_element");
    navbarMenu.classList.toggle("active_element");
    body.classList.toggle("open");
    ariaExpanded();
});

function ariaExpanded() {
    const navList = document.querySelector("#nav_list_expanded");
    const isExpanded = navList.getAttribute("aria-expanded");
    navList.setAttribute("aria-expanded", isExpanded === "false" ? "true" : "false");
}

// nav toggle code
const dropDowns = Array.from(document.querySelectorAll("#main_nav .dropdown"));
for (const item of dropDowns) {
    item.addEventListener("click", () => item.classList.toggle("active_element"));
}

// Dark mode toggle
const $btn = window["dark_mode_toggle"];
const bodyClassList = document.body.classList;
const storageKey = "isDarkModeEnabled";

let isEnabled = localStorage.getItem(storageKey) === "true";

const setLogo = () => {
    const logo = document.querySelector("#main_nav .nav_logo img");
    if (!logo) return;

    if (bodyClassList.contains("dark_mode")) {
        logo.src = "https://res.cloudinary.com/dzk1utcsn/image/upload/v1760523884/codem%C3%BBr_logoLight.svg";
    } else {
        logo.src = "https://res.cloudinary.com/dzk1utcsn/image/upload/v1760520438/codem%C3%BBr_logoDark2_qxehij.svg";
    }
};

const update = () => {
    bodyClassList.toggle("dark_mode", isEnabled);
    setLogo(); // make sure logo updates immediately
};

const save = () => {
    if (isEnabled) localStorage.setItem(storageKey, "true");
    else localStorage.removeItem(storageKey);
};

const toggle = () => {
    isEnabled = !isEnabled;
    update();
    save();
};

update(); // ensures correct logo & mode on load

$btn.addEventListener("click", toggle);
