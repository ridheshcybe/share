let width = 0;

let elem;

export function move(num) {
    if (!elem) elem = document.getElementById("barStatus");
    const id = setInterval(() => {
        if (width >= num) return clearInterval(id);
        width++;
        elem.style.width = elem.innerText = `${width}%`;
    }, 10);
};

export default move;