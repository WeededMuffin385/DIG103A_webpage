const genres_list = document.getElementById("genres_list");

let scrollInterval = setInterval(() => {
    genres_list.scrollTop += 1;
    if (genres_list.scrollTop + genres_list.clientHeight >= genres_list.scrollHeight - 16.0) {
        const first = genres_list.firstElementChild;
        genres_list.appendChild(first);
    }
}, 20);