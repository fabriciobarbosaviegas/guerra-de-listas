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

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex > 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function draw(){
    if(deck.length != 0){
        drawed = deck.slice(0, 4);
        deck = deck.slice(4, );
        deckSize = deck.length;

        if(deckSize == 0){
            document.querySelector("#deckImg").remove()
        }

        document.querySelector("#deckCounter").innerText = `${deckSize}`
       
        return drawed;
    }
    else{
        return [];
    }
}

function startMainList(){
    let newMainList = draw();

    for(let i = 0; i < newMainList.length; i++){
        document.querySelector("#mainListContainer").innerHTML += `<img src="img/bg_${newMainList[i]}.gif" name="${newMainList[i]}" class="p-2 shadow-sm" id="mainListCard">`;
    }

    document.querySelector("#mainListCounter").innerText = `${newMainList.length}`
}

function reset(player){
    
    if(document.querySelector(`#playerHandCounter${player}`).innerText == 0/* && deck.length != 0*/){
        startPlayerHand(player);
        if(!drawTutorial && tutorialBool){
            drawTutorial = true;
            drawTutorialTip();
        }
    }
    if(document.querySelector("#mainListCounter").innerText == 0/* && deck.length != 0*/){
        startMainList();
        if(!drawTutorial && tutorialBool){
            drawTutorial = true;
            drawTutorialTip();
        }
    }
    turnCards(currentPlayer);
}

function startPlayerHand(player){
    let newHand = draw();

    for(let i = 0; i < newHand.length; i++){
        document.querySelector(`#playerHandCards${player}`).innerHTML += `<li><img src="img/bg_${newHand[i]}.gif" name="${newHand[i]}" id="playerCard${player}" class="p-2 shadow-sm playerCard"></li>`;
    }

    let cards = document.querySelectorAll(`#playerCard${player}`);

    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener("click", (e) => {
            gameOver();
            selectedCard = e["target"].name;

            if(e["target"].id[e["target"].id.length-1] == currentPlayer && document.querySelector(`#playerHandCounter${currentPlayer}`).innerText != 0){
                play = playCard(selectedCard, player);

                if(!play){
                    addToMainList(selectedCard, player);
                }

                document.querySelector(`#playerHandCounter${player}`).innerText = document.querySelectorAll(`#playerCard${player}`).length;
                
                currentPlayer++;
                if(currentPlayer > 4){
                    currentPlayer = 1;
                    turn(currentPlayer);
                }
                else{
                    turn(currentPlayer);
                }
            
                reset(player);
                seeSortOption(player);
                updateLists();
            }
        })
    }
    
    document.querySelector(`#playerHandCounter${player}`).innerText = document.querySelectorAll(`#playerCard${player}`).length;
}

function playCard(card, player){

    let mainList = document.querySelectorAll("#mainListCard");
    let mainListSize = mainList.length;
    let playerList;

    let steal = stealsList(card, player);

    if(steal){
        for(let i = 0; i < steal.length; i++){
            steal[i].remove();
            steal[i].id = `player${player}ListCard`;
            let li = document.createElement('li');
            li.appendChild(steal[i])
            document.querySelector("#trashContainer").innerHTML = `<img src="img/bg_${card}.gif" name="${card}" id="trashCard" class="p-2 shadow-sm">`
            document.querySelector(`#playerListCards${player}`).appendChild(li);
        }
        document.querySelector(`#playerCard${player}[name=${card}]`).remove();        
        updateLists();
        console.log('steal')
        return true;
    }

    else{
        
        for(let i = 0; i < mainListSize; i++){
            if(mainList[i].name.slice(1, ) == card.slice(1,)){
                playerList = mainList[i].name;

                document.querySelector(`[name=${mainList[i].name}]`).remove();
                document.querySelector(`[name=${card}]`).remove();
                document.querySelector("#trashContainer").innerHTML = `<img src="img/bg_${card}.gif" name="${card}" id="trashCard" class="p-2 shadow-sm">`
            }
        }                
        
        if(playerList){
            document.querySelector(`#playerListCards${player}`).innerHTML += `<li><img src="img/bg_${playerList}.gif" name="${playerList}" id="player${player}ListCard" class="p-2 shadow-sm"></li>`
            document.querySelector("#mainListCounter").innerText = document.querySelectorAll("#mainListCard").length;
            document.querySelector(`#playerList${player}Counter`).innerText = document.querySelectorAll(`#player${player}ListCard`).length;
            return true;
        }
        else{
            playerList = document.querySelectorAll(`#player${player}ListCard`);
            let playerListSize = playerList.length;
            
            for(let i = 0; i < playerListSize; i++){
                if(playerList[i].name.slice(1, ) == card.slice(1,)){
                    document.querySelector(`[name=${card}]`).remove();
                    document.querySelector("#trashContainer").innerHTML = `<img src="img/bg_${card}.gif" name="${card}" id="trashCard" class="p-2 shadow-sm">`        
                    document.querySelector(`#playerList${player}Counter`).innerText = document.querySelectorAll(`#player${player}ListCard`).length;
                    return true;
                }
            }
        }
    }

    return false;
}

function stealsList(card, player){
    let playerList;
    let playersLen = document.querySelectorAll(".player").length;
    let playersStealables = [];
    
    for(let j = 0; j < playersLen; j++){
        playerList = [];
        for(let i = 0; i < document.querySelectorAll(`#player${j+1}ListCard`).length; i++){
            if(player != j+1){
                playerList.push(document.querySelectorAll(`#player${j+1}ListCard`)[i].name.slice(1,));
            }
        }
        if(playerList.includes(card.slice(1,)) && player != j+1){
            playersStealables.push(j+1);
            break;
        }
    }

    if(playersStealables.length == 1){
        let steal = Array.from(document.querySelectorAll(`#player${playersStealables[0]}ListCard`)).slice(playerList.indexOf(card.slice(1,)), );
        return steal
    }
    else{
        return false;
    }
}

function seeSortOption(player){
    if(document.querySelector(`#playerList${player}Counter`).innerText == 0 || player != currentPlayer){
        document.querySelector(`#sortButton${player}`).classList.add("d-none")
    }
    else{
        document.querySelector(`#sortButton${player}`).classList.remove("d-none")
    }
}

function addToMainList(card, player){
    document.querySelector("#mainListContainer").innerHTML += `<img src="img/bg_${card}.gif" name="${card}" class="p-2 shadow-sm" id="mainListCard">`;
    document.querySelector(`#playerCard${player}[name=${card}]`).remove();
    document.querySelector("#mainListCounter").innerText = document.querySelectorAll("#mainListCard").length;
}

function updateLists(){
    totalPlayers = 4;

    for(let i = 0; i < totalPlayers; i++){
        seeSortOption(i+1);
        document.querySelector(`#playerList${i+1}Counter`).innerText = document.querySelectorAll(`#player${i+1}ListCard`).length;
    }

    document.querySelector("#mainListCounter").innerText = document.querySelectorAll("#mainListCard").length;
}

function turn(player){
    if(document.querySelectorAll(`#playerCard${player}`).length > 0){
        turnCards(currentPlayer);
    }
    else if(isValidGame()){
        currentPlayer++;
        if(currentPlayer > 4){
            currentPlayer = 1;
            turn(currentPlayer);
        }
        else{
            turn(currentPlayer);
        }
    }

    if(player != 1 && currentPlayer != 1 && botBool){
        playerBot(player);
    }
    else if(tutorialStep != 1 && tutorialBool){
        console.log('tutorial')
        tutorialTips();
    }
}

function isValidGame(){
    let validGame = false;

    for(let i = 0; i < 4; i++){
        if(document.querySelectorAll(`#playerCard${i}`).length != 0){
            validGame = true;
        }
        else{
            validGame = false;
        }
    }

    return validGame;
}

function turnCards(player){
    for(let i = 0; i < 4; i++){
        if(i+1 != player){
            let playerHand = document.querySelectorAll(`#playerCard${i+1}`);
            let playerHandSize = playerHand.length;
            for(let j = 0; j < playerHandSize; j++){
                playerHand[j].src = `img/card_bg2.gif`;
                playerHand[j].classList.remove("playerCard");
            }
        }
        else{
            let playerHand = document.querySelectorAll(`#playerCard${player}`);
            let playerHandSize = playerHand.length;
            for(let j = 0; j < playerHandSize; j++){
                playerHand[j].src = `img/bg_${playerHand[j].name}.gif`;
                playerHand[j].classList.add("playerCard");
            }
        }
    }
}

function gameOver(){
    let modalGameOver = new bootstrap.Modal(document.querySelector("#gameOverModal"), {});

    let player1Score = document.querySelectorAll(`#player1ListCard`).length;
    let player2Score = document.querySelectorAll(`#player2ListCard`).length;
    let player3Score = document.querySelectorAll(`#player3ListCard`).length;
    let player4Score = document.querySelectorAll(`#player4ListCard`).length;

    if(deck.length == 0 && !isValidGame()){
        if(player1Score > player2Score && player1Score > player3Score && player1Score > player4Score){
            document.querySelector("#gameOverMessage").innerText = `Player1 venceu!\nCom: ${player1Score} cartas`;
        }
        else if(player2Score > player1Score && player2Score > player3Score && player2Score > player4Score){
            document.querySelector("#gameOverMessage").innerText = `Player2 venceu!\nCom: ${player2Score} cartas`;
        }
        else if(player3Score > player1Score && player3Score > player2Score && player3Score > player4Score){
            document.querySelector("#gameOverMessage").innerText = `Player3 venceu!\nCom: ${player3Score} cartas`;
        }
        else if(player4Score > player1Score && player4Score > player2Score && player4Score > player3Score){
            document.querySelector("#gameOverMessage").innerText = `Player4 venceu!\nCom: ${player4Score} cartas`;
        }
        else{
            document.querySelector("#gameOverMessage").innerText = `Empate!`;
        }
        modalGameOver.show();

        return true;
    }
    return false;
}

let deckIndex = 0;
let deck = shuffle(['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12', 'c13', 'd01', 'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'd11', 'd12', 'd13', 'h01', 'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'h11', 'h12', 'h13', 's01', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 's11', 's12', 's13']);
let currentPlayer = 1;
let botBool = localStorage.getItem('bot') == 'true' ? true : false;

if(!botBool){
    simulationDisclaimer();
}

startMainList()

for(let i = 0; i < 4; i++){
    startPlayerHand(`${i+1}`)
}

turn(currentPlayer);