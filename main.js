function Increment() {
    app.cookies += app.cps;
    SaveGame();
}
function clearLocal() { /* Clears local (Only for production) */
    localStorage.clear();
    window.location.reload(true);
}
function SaveGame() {
    localStorage.cookies = app.cookies;
    localStorage.cps = app.cps;
    localStorage.cpc = app.cpc;
    localStorage.items = JSON.stringify(app.items);
}

function getJSON(path) {
    return fetch(path).then(response => response.json());
}

getJSON("./src/data/data.json").then(info => { // Asynchronous fetching from json before the program does anything
    var app = new Vue({
        el: "#game",
        
        data: {
            cookies: 0,
            cps: 0,
            cpc: 1,
            items: info.items
        },
        mounted: function() { /* Runs when this object is created */
            if (localStorage.cookies) this.cookies = parseInt(localStorage.cookies);
            if (localStorage.cps) this.cps = parseInt(localStorage.cps);
            if (localStorage.cpc) this.cpc = parseInt(localStorage.cpc);
            if (localStorage.items) this.items = JSON.parse(localStorage.items);
        },
        methods: {
            order: function(index, amount_ordered, event) {
                /* - if event target not include item class go up to parent el until item is found - */
                let target = event.target;
                let inflation = 0.1;
                while (!(target.classList.contains('item'))) {
                    target = target.parentElement;
                }
    
                /* - if item is purchasable - */
                if (target.classList.contains('purchasable')) {
                    /* - konni123 - */
                    let konni123 = this.items[index];
    
                    /* - checks cookies and buys item - */
                    if (this.cookies >= (konni123.price*(1+inflation)**amount_ordered-1)) {
                        /* - remove cookies from wallet - */
                        this.cookies -= konni123.price;
    
                        /* - increase cookies per second gained - */
                        this.cps += konni123.increase * amount_ordered;
    
                        /* - finally adds the amount of items bought to item count - */
                        konni123.amount += amount_ordered;
    
                        /* - inflation - */
                        konni123.price = konni123.price*(1+inflation)**amount_ordered
                    }            
                }
            }
        }
    
    })
    
    var cookie = document.getElementById("cookie");
    
    setInterval(Increment,1000);
})


