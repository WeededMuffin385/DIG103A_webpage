const $navbar = $("#navbar");
const $navbar_button = $("#navbar_button");
const $navbar_button_icon = $("#navbar_button_icon");

function toggle_navigation_bar() {
    if ($navbar.hasClass("hide")) {
        $navbar.removeClass("hide").addClass("show");
        $navbar_button_icon.attr("class", "fa fa-close");
    } else {
        $navbar.removeClass("show").addClass("hide");
        $navbar_button_icon.attr("class", "fa fa-bars");
    }
}

function toggle_navigation_bar_off() {
    $navbar.removeClass("show").addClass("hide");
    $navbar_button_icon.attr("class", "fa fa-bars");
}

$navbar_button.on("click", toggle_navigation_bar);
$navbar.find("a").on("click", toggle_navigation_bar_off);