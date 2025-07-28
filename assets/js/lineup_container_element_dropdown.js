const locations_lineup = document.getElementById("locations_lineup");
const artists_lineup = document.getElementById("artists_lineup");

const parent = document.getElementById('lineup');

const set_hover_listener = (children) => {
    Array.from(children).forEach(child => {
        let clone = null;
        let size_multiplier = 0.4;

        const update_position_and_size = (child, clone) => {
            const parent_rect = parent.getBoundingClientRect();
            const child_rect = child.getBoundingClientRect();

            const top = child_rect.top - parent_rect.top;
            const left = child_rect.left - parent_rect.left;

            if (clone.classList.contains('locations')) {
                clone.style.top = top + 'px';
                clone.style.left = left + 'px';
            }

            if (clone.classList.contains('artists')) {
                clone.style.top = top - child_rect.height * size_multiplier + 'px';
                clone.style.left = left + 'px';
            }

            clone.style.width = child.offsetWidth + 'px';
            clone.style.height = child.offsetHeight + child_rect.height * size_multiplier + 'px';
        }

        const animate = (child, clone) => {
            const parent_rect = parent.getBoundingClientRect();
            const child_rect = child.getBoundingClientRect();
            const clone_rect = clone.getBoundingClientRect();

            const child_top = child_rect.top - parent_rect.top;
            const child_left = child_rect.left - parent_rect.left;

            const clone_top = clone_rect.top - parent_rect.top;
            const clone_left = clone_rect.left - parent_rect.left;

            clone.animate([
            {
                width: child_rect.width + 'px',
                height: child_rect.height + 'px',
                top: child_top + 'px',
                left: child_left + 'px',
                boxShadow: '0 0 0 rgba(0,0,0,0)'
            },
            {
                width: clone_rect.width + 'px',
                height: clone_rect.height + 'px',
                top: clone_top + 'px',
                left: clone_left + 'px',
                boxShadow: '0 0px 32px rgba(0,0,0,0.5)',
            }
            ], {
                duration: 500,
                easing: 'ease',
            });
        }

        const animate_backwards = (child, clone) => {
            const parent_rect = parent.getBoundingClientRect();
            const child_rect = child.getBoundingClientRect();
            const clone_rect = clone.getBoundingClientRect();

            const child_top = child_rect.top - parent_rect.top;
            const child_left = child_rect.left - parent_rect.left;

            const clone_top = clone_rect.top - parent_rect.top;
            const clone_left = clone_rect.left - parent_rect.left;

            return clone.animate([
            {
                width: clone_rect.width + 'px',
                height: clone_rect.height + 'px',
                top: clone_top + 'px',
                left: clone_left + 'px',
                boxShadow: '0 0px 32px rgba(0,0,0,0.5)',
            },
            {
                width: child_rect.width + 'px',
                height: child_rect.height + 'px',
                top: child_top + 'px',
                left: child_left + 'px',
                boxShadow: '0 0 0 rgba(0,0,0,0)'
            },
            ], {
                duration: 500,
                easing: 'ease',
            });
        }

        child.addEventListener('mouseenter', () => {
            if (clone) {return}

            console.log('coursor entered the element');
            
            clone = child.cloneNode(true);
            clone.classList = child.parentElement.parentElement.classList;
            clone.classList.add('clone');

            update_position_and_size(child, clone);

            parent.appendChild(clone);

            animate(child, clone);
        });

        window.addEventListener('scroll', () => {
            update_position_and_size(child, clone);
        });

        child.addEventListener('mouseleave', () => {
            if (!clone) {return}
            console.log('coursor left the element');
/*             parent.removeChild(clone);
            clone = null; */
            animate_backwards(child, clone).finished.then(() => {
                parent.removeChild(clone);
                clone = null;
            });
        });
    })
}

set_hover_listener(locations_lineup.children);
set_hover_listener(artists_lineup.children);