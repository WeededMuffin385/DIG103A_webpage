
const children = document.querySelectorAll('.artist');
const speed = 1.0;

let selected = null;
let selected_timeout = null;

const get_width = () => {
    return window.innerWidth;
}

const get_height = () => {
    return window.innerHeight;
}

Array.from(children).forEach((child, index) => {
    let pos = {
        x: get_width(),
        y: get_height(),
    };

    let is_repositioning = false;

    const animate = () => {
        if (!selected) {
            pos.x += speed;
            pos.y += speed;
            
            if ((pos.x > get_width() || pos.y > get_height()) && !is_repositioning) {
                is_repositioning = true;
                try_reposition()
            }
            
            child.style.left = pos.x + 'px';
            child.style.top = pos.y + 'px';
        }
        requestAnimationFrame(animate);
    }

    const try_reposition = () => {
        if (selected) {
            setTimeout(try_reposition, 100);
        } else {
            child.style.opacity = '0';
            if (Math.random() > 0.5) {
                pos.x = Math.random() * get_width() * 0.5;
                pos.y = -child.offsetHeight;
            } else {
                pos.x = -child.offsetWidth;
                pos.y = Math.random() * get_height() * 0.5;
            }

            child.style.left = pos.x + 'px';
            child.style.top = pos.y + 'px';

            if (check_collision()) {
                setTimeout(try_reposition, 100);
            } else {
                is_repositioning = false;
                child.style.opacity = '1';
            }
        }
    }

    const collision = (value, other) => {
        const a = value.getBoundingClientRect();
        const b = other.getBoundingClientRect();

        return !(
            a.right < b.left ||
            a.left > b.right ||
            a.bottom < b.top ||
            a.top > b.bottom
        );
    }

    const check_collision = () => {
        const others = Array.from(children).filter(x => x != child);
        return others.some(x => collision(child, x));
    }

    child.addEventListener("click", () => {
        setTimeout(() => {
            child.classList.add('selected');
            child.removeAttribute('style');
            selected = child;
        }, 100);
    });

    document.addEventListener('click', (event) => {
        if (selected && selected == child) {   
            selected.classList.remove('selected');
            selected.style.left = pos.x + 'px';
            selected.style.top = pos.y + 'px';
            selected = null;
        }
    });

    setTimeout(() => {requestAnimationFrame(animate)}, 100 * index);
});