/// https://www.w3schools.com/jquery/jquery_syntax.asp
/// "Tip: The jQuery team has also created an even shorter method for the document ready event:"


$(function(){
    const navbar = $('#navbar');
    const navbar_button = $('#navbar_button');
    const navbar_button_icon = $('#navbar_button_icon');

    $(navbar_button).click(function(){
        console.log("hello jquery!");

/*         if ((navbar.className === "navigation_bar") || (navbar.className === "navigation_bar hide")) {
            navbar.className = "navigation_bar show";
            navbar_button_icon.className = "fa fa-close";
        } else {
            navbar.className = "navigation_bar hide";
            navbar_button_icon.className = "fa fa-bars";
        } */
    });
}); 