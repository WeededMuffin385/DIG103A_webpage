// now
const now = new Date();

// beginning of the next day (tomorrow at 00:00:00)
const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

const deadline = new Date(tomorrow.getTime() + 2 * 24 * 60 * 60 * 1000).getTime();

const countdown_element = document.getElementById("countdown");

const update_countdown = () => {
    const now = new Date().getTime();
    const diff = deadline - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdown_element.innerHTML =
        String(days) + ":" +
        String(hours).padStart(2, '0') + ":" +
        String(minutes).padStart(2, '0') + ":" +
        String(seconds).padStart(2, '0');
}

setInterval(update_countdown, 1000);
update_countdown(); // initial update without intervals