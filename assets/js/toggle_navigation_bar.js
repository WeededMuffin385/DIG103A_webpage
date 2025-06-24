const navbar = document.getElementById("navbar");
const navbar_button_icon = document.getElementById("navbar_button_icon");

const toggle_navigation_bar = () => {
    if ((navbar.className === "navigation_bar") || (navbar.className === "navigation_bar hide")) {
        navbar.className = "navigation_bar show";
        navbar_button_icon.className = "fa fa-close";
    } else {
        navbar.className = "navigation_bar hide";
        navbar_button_icon.className = "fa fa-bars";
    }
}

document.getElementById("navbar_button").addEventListener("click", toggle_navigation_bar);

[...document.getElementById("navbar").getElementsByTagName("a")].forEach(child => {
    child.addEventListener("click", toggle_navigation_bar);
});