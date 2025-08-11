
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

    reposition = false;

    const animate = () => {
        if (!selected) {
            pos.x += speed;
            pos.y += speed;
            
            if (!reposition && (pos.x > get_width() || pos.y > get_height())) {
                reposition = true;
                navigator.locks.request('reposition', async lock => {
                    console.log('lock acquired');
                    await try_reposition();
                    console.log('lock released');
                });
            }
   
            child.style.left = pos.x + 'px';
            child.style.top = pos.y + 'px';
        }
        requestAnimationFrame(animate);
    }

    const try_reposition = async () => {
        let attempts = 0;
        const max_attempts = 16;

        let new_pos = {
            x: 0,
            y: 0,
        };

        while (attempts < max_attempts) {
            
            if (Math.random() > 0.5) {
                const offset = -child.offsetHeight;
                new_pos.x = offset * 2.0 + Math.random() * get_width() * 0.5;
                new_pos.y = offset * 2.0;
            } else {
                const offset = -child.offsetWidth;
                new_pos.x = offset * 2.0;
                new_pos.y = offset * 2.0 + Math.random() * get_height() * 0.5;
            }

            if (!collisions(new_pos)) {break;}

            attempts += 1;
            console.log(`attempt: ${attempts}`);
            await new Promise(resolve => setTimeout(resolve, 250));
        }

        pos = new_pos;
        reposition = false;
    }

    const collision_virtual = (pos, value, other) => {
        const a = value.getBoundingClientRect();
        const b = other.getBoundingClientRect();

        const w = a.width;
        const h = a.height;

        const left = pos.x;
        const right = pos.x + w;

        const top = pos.y;
        const bottom = pos.y + h;

        return (
            left   < b.right  &&
            right  > b.left   &&
            top    < b.bottom &&
            bottom > b.top    
        );
    }

    const collisions = (pos) => {
        const others = Array.from(children).filter(x => x != child);
        return others.some(x => collision_virtual(pos, child, x));
    }

    child.addEventListener("click", () => {
        setTimeout(() => {
            child.classList.add('selected');
            child.removeAttribute('style');
            selected = child;
        }, 100);
    });

    document.addEventListener('click', (event) => {
        if (selected && selected == child && event.target.closest('.artist') != child) {   
            child.style.left = pos.x + 'px';
            child.style.top = pos.y + 'px';
            child.classList.remove('selected');
            child.classList.add('unselected');

            setTimeout(() => {
                child.classList.remove('selected');
                child.classList.remove('unselected');

                if (selected == child) {
                    selected = null;
                }
            }, 300);
        }
    });

    setTimeout(() => {requestAnimationFrame(animate)}, 100 * index);
});