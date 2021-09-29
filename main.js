/*
    "we gaming gamers
     We dropping tilted towers
     esketit my homie slice"
        - Nonni og Ragnar
*/

function clearLocal() { // Clears local (Only for production) 
    localStorage.clear();
    window.location.reload(true);
}

function getJSON(path) {
    return fetch(path).then(response => response.json());
}

getJSON("./src/data/data.json").then(info => { // Asynchronous fetching from json before the program does anything
    var app = new Vue({
        el: "#game",
        
        /* - app data - */
        data: {
            /* - static data - */
            inflation: 1.1, // controls inflation :flushed:

            /* - flexible data - */
            item_amount_ordered: "1", // used to determine how much of an item is ordered at once

            /* - user data - */
            cookies: 0, // wallet
            cps: 0, // += per second
            cpc: 1, // += per click
            items: info.items, // list of items are owned
            trophies: info.trophies // !--! not yet implemented !--!
        },
        
        /* Runs when this object is created */
        mounted: function() { 

            /* - loads the game vars from local storage - */
            if (localStorage.cookies) this.cookies = parseInt(localStorage.cookies);
            if (localStorage.cps) this.cps = parseInt(localStorage.cps);
            if (localStorage.cpc) this.cpc = parseInt(localStorage.cpc);
            if (localStorage.items) this.items = JSON.parse(localStorage.items);
            if (localStorage.trophies) this.trophies = JSON.parse(localStorage.trophies);
            
            /* - intervals - */
            setInterval(this.increment, 100); // adds tenth of cps every one tenth of a second
            setInterval(this.save_game, 30000); // saves the game every 30 seconds
        },

        computed: {
            /* - parses amount from string to int - */
            amount_int: function () {
                return parseInt(this.item_amount_ordered)
            }
        },

        methods: {
            /* - returns the cost of inputted item based on how much of that item u own - */
            cost: function (item) {
                let result = 0;
                /* - my mind is mega i am genius - */
                for (let T = 0; T < this.amount_int; T++) {
                    result += Math.floor(item.price * Math.pow(this.inflation, item.amount + T))
                }

                return result
            },

            /* - floors numbers - */
            floor: function (num) {
                return Math.floor(num);
            },

            /* - purchases an item frome itemlist - */
            order: function (index, event) {
                /* - if event target not include item class go up to parent el until item is found - */
                let target = event.target;
                while (!(target.classList.contains('item'))) {
                    target = target.parentElement;
                }
    
                /* - if item is purchasable - */
                if (target.classList.contains('purchasable')) {

                    /* - amount ordered - */
                    let amount_ordered = this.amount_int;

                    /* - konni123 - */
                    let konni123 = this.items[index];

                    /* - cost of item - */
                    let c = this.cost(konni123);
    
                    /* - checks cookies and buys item - */
                    if (this.cookies >= (c)) {
                        /* - remove cookies from wallet - */
                        this.cookies -= c;
    
                        /* - increase cookies per second gained - */
                        this.cps += konni123.increase * amount_ordered;
    
                        /* - finally adds the amount of items bought to item count - */
                        konni123.amount += amount_ordered;
                    }            
                }
            },

            /* - adds cookies per cps - */
            increment: function () {
                this.cookies += (this.cps / 10);
            },

            /* - saves all the game variables - */
            save_game: function () {
                localStorage.cookies = this.cookies;
                localStorage.cps = this.cps;
                localStorage.cpc = this.cpc;
                localStorage.items = JSON.stringify(this.items);
                localStorage.trophies = JSON.stringify(this.trophies);
            }
        }
    })
})


