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
    let content = ''
    users.map(f => f.name).forEach((e, i, a) => {
        content += `<option value="${e}">${e}</option>`
        if (i == a.length - 1) return result.innerHTML = `<style>.box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.box select{background-color:#0563af;color:#fff;padding:12px;width:250px;border:none;font-size:20px;box-shadow:0 5px 25px rgba(0,0,0,.2);-webkit-appearance:button;appearance:button;outline:0}.box:hover::before{color:rgba(255,255,255,.6);background-color:rgba(255,255,255,.2)}.box select option{padding:30px}</style>
        <div class="box">
            <select id="optionsmenu">
                ${content}
            </select>
        </div>`
    })

    const menu = document.getElementById("optionsmenu")
    menu.onchange = () => {
        userselected = menu.value;
    }
}

fetch('/api/get-users').then(e => e.json()).then(e => {
    if (e.length === 0) return nousers()
    e.forEach((f, i, a) => {
        users.push(f);
        if (i === a.length - 1) return run()
    })
})
