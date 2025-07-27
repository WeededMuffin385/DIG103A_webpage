const locations_lineup = document.getElementById("locations_lineup");
const artists_lineup = document.getElementById("artists_lineup");

const set_hover_listener = (children) => {
    Array.from(children).forEach(child => {
        let clone = null;
        let size_multiplier = 0.4;

        const update_position_and_size = (child, clone) => {
           const rect = child.getBoundingClientRect();

            if (clone.classList.contains('locations')) {
                clone.style.top = rect.top + 'px';
                clone.style.left = rect.left + 'px';
            }

            if (clone.classList.contains('artists')) {
                clone.style.top = rect.top - rect.height * size_multiplier + 'px';
                clone.style.left = rect.left + 'px';
            }

            clone.style.width = child.offsetWidth + 'px';
            clone.style.height = child.offsetHeight + rect.height * size_multiplier + 'px';
        }

        const animate = (child, clone) => {
            const child_rect = child.getBoundingClientRect();
            const clone_rect = clone.getBoundingClientRect();

            clone.animate([
            {
                width: child_rect.width + 'px',
                height: child_rect.height + 'px',
                top: child_rect.top + 'px',
                left: child_rect.left + 'px',
                boxShadow: '0 0 0 rgba(0,0,0,0)'
            },
            {
                width: clone_rect.width + 'px',
                height: clone_rect.height + 'px',
                top: clone_rect.top + 'px',
                left: clone_rect.left + 'px',
                boxShadow: '0 0px 32px rgba(0,0,0,0.5)',
            }
            ], {
                duration: 500,
                easing: 'ease',
            });
        }

        const animate_backwards = (child, clone) => {
            const child_rect = child.getBoundingClientRect();
            const clone_rect = clone.getBoundingClientRect();

            return clone.animate([
            {
                width: clone_rect.width + 'px',
                height: clone_rect.height + 'px',
                top: clone_rect.top + 'px',
                left: clone_rect.left + 'px',
                boxShadow: '0 0px 32px rgba(0,0,0,0.5)',
            },
            {
                width: child_rect.width + 'px',
                height: child_rect.height + 'px',
                top: child_rect.top + 'px',
                left: child_rect.left + 'px',
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

            clone.style.position = 'fixed';
            clone.style.zIndex = '5';
            clone.style.pointerEvents = 'none';

            update_position_and_size(child, clone);

            document.body.appendChild(clone);
            
            animate(child, clone);
        });

        window.addEventListener('scroll', () => {
            update_position_and_size(child, clone);
        });

        child.addEventListener('mouseleave', () => {
            if (!clone) {return}
            console.log('coursor left the element');
            
            animate_backwards(child, clone).finished.then(() => {
                document.body.removeChild(clone);
                clone = null;
            });
        });
    })
}

set_hover_listener(locations_lineup.children);
set_hover_listener(artists_lineup.children);