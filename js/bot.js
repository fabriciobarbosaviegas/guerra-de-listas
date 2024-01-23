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

function playerBot(player){
    let botHand = document.querySelectorAll(`#playerCard${player}`);
    let botHandSize = botHand.length;

    if(botHandSize > 0){
        let mainList = document.querySelectorAll(`#mainListCard`);
        let mainListSize = mainList.length;

        let playIndex;
        let stealSize = 0;

        for(let adversary = 1; adversary <= 4; adversary++){
            if(adversary != player){
                let adversaryList = document.querySelectorAll(`#player${adversary}ListCard`);
                let adversaryListSize = adversaryList.length;

                if(adversaryListSize != 0){
                    for(let i = 0; i < botHandSize; i++){
                        for(let j = 0; j < adversaryListSize; j++){
                            if(botHand[i].name.slice(1,) == adversaryList[j].name.slice(1,)){
                                let currentSteal = adversaryListSize - (j+1);
                                if(currentSteal > stealSize){
                                    stealSize = currentSteal;
                                    playIndex = i;
                                }
                            }
                        }
                    }
                }
            }
        }

        if(!playIndex){
            for(i = 0; i < botHandSize; i++){
                for(j = 0; j < mainListSize; j++){
                    if(botHand[i].name.slice(1,) == mainList[j].name.slice(1,)){
                        playIndex = i;
                        break;
                    }    
                }
                if(playIndex){
                    break;
                }
            }
            if(!playIndex){
                playIndex = 0;
            }
        }
        document.querySelectorAll(`#playerCard${player}`)[playIndex].click();
        return true;
    }
    return false;
} 
