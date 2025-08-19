const buy_ticket_form = document.getElementById("buy_ticket_form");
const reserve_ticket_form = document.getElementById("reserve_ticket_form");

const toggle_form_visibility = (form) => {
    if (form.style.display === 'flex') {
        form.style.display = 'none';
    } else {
        form.style.display = 'flex';
    }
}

function toggle_buy_ticket_form() {
    toggle_form_visibility(buy_ticket_form);
}

function toggle_reserve_ticket_form() {
    toggle_form_visibility(reserve_ticket_form);
}