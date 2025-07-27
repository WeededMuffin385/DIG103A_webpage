const buy_ticket_form = document.getElementById("buy_ticket_form");

function toggle_ticket_form_buy () {
    console.log("pressed the button")

    if (buy_ticket_form.style.display === 'block') {
        buy_ticket_form.style.display = 'none';
    } else {
        buy_ticket_form.style.display = 'block';
    }
}