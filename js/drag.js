/* 
* MIT License

* Copyright (c) 2024 Fabrício Barbosa Viegas

* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:

* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*/

let dragable = false;

let sorters = document.querySelectorAll(".sorter");

let playerHand = document.querySelector(`#playerListCards1`);
let sortable = Sortable.create(playerHand);
let state = sortable.option("disabled");
sortable.option("disabled", !state);

playerHand = document.querySelector(`#playerListCards2`);
let sortable2 = Sortable.create(playerHand);
let state2 = sortable2.option("disabled");
sortable2.option("disabled", !state2);

playerHand = document.querySelector(`#playerListCards3`);
let sortable3 = Sortable.create(playerHand);
let state3 = sortable3.option("disabled");
sortable3.option("disabled", !state3);

playerHand = document.querySelector(`#playerListCards4`);
let sortable4 = Sortable.create(playerHand);
let state4 = sortable4.option("disabled");
sortable4.option("disabled", !state4);

for(let i = 0; i < sorters.length; i++){

    sorters[i].addEventListener("click", (e) => {
        console.log(e.target.id[e.target.id.length - 1])
        if(e.target.id[e.target.id.length - 1] == '1'){
            console.log("1 ativo")
            state = sortable.option("disabled");
            sortable.option("disabled", !state);    
        }
        else if(e.target.id[e.target.id.length - 1] == '2'){
            console.log("2 ativo")
            state2 = sortable2.option("disabled");
            sortable2.option("disabled", !state2);
        }
        else if(e.target.id[e.target.id.length - 1] == '3'){
            console.log("3 ativo")
            state3 = sortable3.option("disabled");
            sortable3.option("disabled", !state3);            
        }
        else{
            console.log("4 ativo")
            state4 = sortable4.option("disabled");
            sortable4.option("disabled", !state4);  
        }

        if(!dragable){
            dragable = true;
    
            e.target.innerText = "Concluir";
            e.target.classList.remove("btn-primary");
            e.target.classList.add("btn-success");
            
            let players = document.querySelectorAll(".player");

            for(let i = 0; i < players.length; i++){
                let playerList = document.querySelectorAll(`#player${i+1}ListCard`);
        
                for(let j = 0; j < playerList.length; j++){
                    playerList[j].classList.add("dragable");
                }
            }
        }
        else{
            dragable = false;
            
            e.target.innerText = "Ordenar Lista";
            e.target.classList.remove("btn-success");
            e.target.classList.add("btn-primary");

            let players = document.querySelectorAll(".player");
    
            for(let i = 0; i < players.length; i++){
                let playerList = document.querySelectorAll(`#player${i+1}ListCard`);
        
                for(let j = 0; j < playerList.length; j++){
                    playerList[j].classList.remove("dragable");
                }
            }    
                        
            currentPlayer++;
            if(currentPlayer > 4){
                currentPlayer = 1;
                turn(currentPlayer);
            }
            else{
                turn(currentPlayer);
            }

            seeSortOption(currentPlayer);

            for(i = 0; i < 4; i++){
                if(i+1 != currentPlayer){
                    seeSortOption(i+1);
                }
            }

            turnCards(currentPlayer);
        }
    })
}