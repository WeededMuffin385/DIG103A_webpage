let timeout;
let current_snapped_element = null;
const snap_range = 128;

const elements = document.querySelectorAll('.section');

const update_scroll_snap = () => {
    clearTimeout(timeout);
    current_snapped_element = null;

    timeout = setTimeout(() => {
        let nearest = null;
        let distance = Infinity;

        elements.forEach(e => {
            const current_distance = Math.abs(e.getBoundingClientRect().top);

            if (current_distance < distance) {
                distance = current_distance;
                nearest = e;
            }
        })

        if (nearest && (distance < snap_range) && (nearest != current_snapped_element)) {
            window.scrollTo({ top: nearest.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
            current_snapped_element = nearest;
        }
    }, 300);
}

window.addEventListener("scroll", update_scroll_snap)