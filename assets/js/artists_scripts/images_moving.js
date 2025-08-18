const get_width = () => {
    return window.innerWidth;
}

const get_height = () => {
    return window.innerHeight;
}

const gap = 16.0;
const speed = 1.0;
const children = Array.from(
    document.querySelectorAll('.artist'),
    element => ({
        child: element,
        pos: {
            x: get_width(),
            y: get_height(),
        }
    })
);

let selected = null;

const update = () => {
    children.forEach(({child, pos}) => {
        const try_reposition = () => {
            let new_pos = {
                x: 0,
                y: 0,
            };

            if (Math.random() > 0.5) {
                const offset = -child.offsetHeight;
                new_pos.x = offset + Math.random() * get_width() * 0.5;
                new_pos.y = offset;
            } else {
                const offset = -child.offsetWidth;
                new_pos.x = offset;
                new_pos.y = offset + Math.random() * get_height() * 0.5;
            }

            if (!collisions(new_pos)) {
                pos.x = new_pos.x;
                pos.y = new_pos.y;
                reposition = false;
            }
        }

        const collision_virtual = (pos, value, other) => {
            const a = value.getBoundingClientRect();
            const b = other.getBoundingClientRect();

            const w = a.width;
            const h = a.height;

            const left = pos.x - gap;
            const right = pos.x + w + gap;
            const top = pos.y - gap;
            const bottom = pos.y + h + gap;

            const other_left = b.left - gap;
            const other_right = b.right + gap;
            const other_top = b.top - gap;
            const other_bottom = b.bottom + gap;

            return (
                left   < other_right  &&
                right  > other_left   &&
                top    < other_bottom &&
                bottom > other_top    
            );
        }

        const collisions = (pos) => {
            const others = children.filter(({child: other}) => other != child);
            return others.some(({child: other}) => collision_virtual(pos, child, other));
        }

        if (!selected) {
            if (pos.x > get_width() || pos.y > get_height()) {
                try_reposition();
            }
            
            pos.x += speed;
            pos.y += speed;
   
            child.style.left = pos.x + 'px';
            child.style.top = pos.y + 'px';
        }
    })
};


children.forEach(({child, pos}) => {
    child.addEventListener("click", () => {
        setTimeout(() => {
            child.classList.add('selected');
            child.removeAttribute('style');
            selected = child;

            const others = children.filter(({child: other}) => other != child);

            others.forEach(({child, pos}) => {
                if (!child.classList.contains('selected')) {return;}

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
            });
        }, 100);
    });

    document.addEventListener('click', (event) => {
        const element = event.target.closest('.artist');
        const element_in_artists = children.some(({child}) => child == element);
        if (selected && selected == child && element != child && !element_in_artists) {
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
})



const loop = () => {
    update();
    requestAnimationFrame(loop);
}

/* give a browser some time to preload images and have a correct size for all elements with images */
setTimeout(() => {loop()}, 500);