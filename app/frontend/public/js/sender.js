const users = [{ name: 'e' }];
let userselected;
const result = document.getElementById("result");

function nousers() {
    result.style.top = "50vh";
    result.style.left = "40vw";
    result.style.position = "absolute";
    result.innerHTML = '<p class="text-center text-white mx-auto h-full">No users trying receiveing, Try again later</p>';
}

function run() {
    fetch('/public/template/selectmenu.hbs').then(e => e.text()).then(e => {
        result.innerHTML = Handlebars.compile(e)({
            data: users.map(f => f.name)
        });

        const option = document.getElementsByTagName("option")
        option.item(option.length - 1).remove()
        const menu = document.getElementById("optionsmenu")
        menu.onchange = () => {
            userselected = menu.value;
        }
    })
}

fetch('/api/get-users').then(e => e.json()).then(e => {
    if (e.length === 0) return nousers()
    users.push(e);
    run()
})
