function Increment() {
    app.cookies += app.cps;
}
/*
function Clicked() {
    app.cookies += app.cpc;
    cookie.setAttribute("class","cookie-clicked");
}
function Release() {
    cookie.setAttribute("class","cookie");
}
*/

function Buy(e) {
    var target = e.target;
    while(target.className != "item") {
        target = target.parentElement;
    }
    var index = parseInt(target.querySelector(".index").textContent);
    console.log(index);
    var it = app.items[index];
    if (app.cookies >= it.price) {
        app.cookies -= it.price;
        app.cps += it.increase;
        it.amount += 1;
    }
}

var app = new Vue({
    el: "#game",
    
    data: {
        cookies: 0,
        cps: 0,
        cpc: 1,
        items: [
            {
                index: 0,
                title: "Grandma",
                price: 10,
                amount: 0,
                increase: 1
            },
            {
                index: 1,
                title: "Farm",
                price: 100,
                amount: 0,
                increase: 10
            }
        ]
    },

    methods: {
        /* - setja functions hérna - */

    }

})

var cookie = document.getElementById("cookie");

setInterval(Increment,1000);

/* Shop event listeners */

var shoplist = document.getElementsByClassName("item");
console.log(shoplist);

var shoparr = [...shoplist];

for (var i = 0; i < shoparr.length; i++) {
    var tal = parseInt(shoparr[i].querySelector("span").textContent);
    shoparr[i].addEventListener("click", Buy);
}

/* --- *

cookie.addEventListener("mousedown",Clicked);
cookie.addEventListener("mouseup",Release);
*/