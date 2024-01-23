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

function tutorialTips(){    
    document.querySelector('#tutorialModal').querySelector('button').removeEventListener('click', () => {});

    let playerHand = document.querySelectorAll('#playerCard1');
    let playerHandSize = playerHand.length;

    if(!normalTutorial){
        defaultPlayTip();
    }
    else if(!mainTutorial){
        let mainList = document.querySelectorAll('#mainListCard');
        let mainListSize = mainList.length;
        let playable;

        for(let i = 0; i < playerHandSize; i++){
            for(let j = 0; j < mainListSize; j++){
                if(playerHand[i].name.slice(1,) == mainList[j].name.slice(1,)){
                    mainListPlayTip(i);
                    playable = true;
                    break;
                }
            }
            if(playable){
                break;
            }
        }
    }
    else if(!stealTutorial){
        for(let adversary = 2; adversary <= 4; adversary++){
            let adversaryList = document.querySelectorAll(`#player${adversary}ListCard`);
            let adversaryListSize = adversaryList.length;

            if(adversaryListSize != 0){
                for(let i = 0; i < playerHandSize; i++){
                    for(let j = 0; j < adversaryListSize; j++){
                        if(playerHand[i].name.slice(1,) == adversaryList[j].name.slice(1,)){
                            stealPlayTip(i);
                            break;
                        }
                    }
                }
            }
        }
    }
    else if(!ownListTutorial){
        let ownList = document.querySelectorAll('#player1ListCard');
        let ownListSize = ownList.length;

        for(let i = 0; i < playerHandSize; i++){
            for(let j = 0; j < ownListSize; j++){
                if(playerHand[i].name.slice(1,) == ownList[j].name.slice(1,)){
                    ownListPlayTip(i);
                    break;
                }
            }
        }        
    }
    else if(!sortListTutorial){
        let ownList = document.querySelectorAll('#player1ListCard');
        let ownListSize = ownList.length;

        if(ownListSize > 1){
            sortListTutorialTip();
        }
        
    }

    return false;
} 

function defaultPlayTip(){
    console.log('normal')
    document.querySelector('#tutorialMessage').innerHTML = 'Você não pode fazer nenhuma grande jogado no momento, selecione uma carta para adicionar a lista principal.';
    modalTutorial.show();
    normalTutorial = true;

    document.querySelector('#tutorialModal').querySelector('button').addEventListener('click', () => {
        document.querySelector('#tutorialMessage').innerHTML = 'Após jogar uma carta que não exista nem na lista principal, nem na lista de um dos jogadores, ela é adicionada a lista principal para que possa ser pega por outro jogador no próximo turno, ecerrando sua vez..';
        document.querySelector('#tutorialModal').querySelector('button').addEventListener('click', () => {
            modalTutorial.hide();
        });
    });
}

function mainListPlayTip(handCardIndex){
    console.log('main')
    document.querySelector('#tutorialMessage').innerHTML = 'Você possui uma ou mais cartas em sua mão que também existem na lista principal, jogue uma dessas cartas para adiciona-la a sua lista principal.';
    modalTutorial.show();
    document.querySelectorAll('#playerCard1')[handCardIndex].classList.add('highlight');

    document.querySelectorAll('#playerCard1')[handCardIndex].addEventListener('click', () => {
        mainTutorial = true;
        document.querySelector('#tutorialMessage').innerHTML = 'Sempre que jogar uma carta existente na lista principal essa carta será removida de lá e adicionada a sua lista, enquanto a carta que você jogou originalmente irá para a pilha de descarte, ecerrando sua vez.';
        document.querySelector('#playerList1').classList.add('highlight');
        modalTutorial.show();
            
        document.querySelector('#tutorialModal').querySelector('button').addEventListener('click', () => {
            document.querySelector('#playerList1').classList.remove('highlight');
            modalTutorial.hide();
        });
    });

    document.querySelector('#tutorialModal').querySelector('button').addEventListener('click', () => {
        document.querySelectorAll('#playerCard1')[handCardIndex].classList.remove('highlight');
        modalTutorial.hide();
        document.querySelector('#tutorialModal').querySelector('button').removeEventListener('click', () => {
            document.querySelectorAll('#playerCard1')[handCardIndex].classList.remove('highlight');
            modalTutorial.hide();
        });
    });
}

function stealPlayTip(handCardIndex){
    console.log('steal')
    document.querySelector('#tutorialMessage').innerHTML = 'Você possui uma ou mais cartas em sua mão que também existem na lista de algum dos seus adversários, jogue uma dessas cartas para roubar todas as cartas do seu adversário a partir dela.';
    modalTutorial.show();
    document.querySelectorAll('#playerCard1')[handCardIndex].classList.add('highlight');

    document.querySelectorAll('#playerCard1')[handCardIndex].addEventListener('click', () => {
        stealTutorial = true;
        document.querySelector('#tutorialMessage').innerHTML = 'Sempre que jogar uma carta existente na lista de um dos seus adversários, todas as cartas a partir dela na lista dele serão roubadas e movidas para o final da sua lista, enquanto a carta original irá para a pilha de descarte.';
        document.querySelector('#playerList1').classList.add('highlight');
        modalTutorial.show();
            
        document.querySelector('#tutorialModal').querySelector('button').addEventListener('click', () => {
            document.querySelector('#playerList1').classList.remove('highlight');
            modalTutorial.hide();
        });
    });

    document.querySelector('#tutorialModal').querySelector('button').addEventListener('click', () => {
        document.querySelectorAll('#playerCard1')[handCardIndex].classList.remove('highlight');
        modalTutorial.hide();
        document.querySelector('#tutorialModal').querySelector('button').removeEventListener('click', () => {
            document.querySelectorAll('#playerCard1')[handCardIndex].classList.remove('highlight');
            modalTutorial.hide();
        });
    });
}

function ownListPlayTip(handCardIndex){
    console.log('own')
    document.querySelector('#tutorialMessage').innerHTML = 'Você possui uma ou mais cartas em sua mão que também existem em sua própria lista, jogue essa carta para elimina-la de sua mão.';
    modalTutorial.show();
    document.querySelectorAll('#playerCard1')[handCardIndex].classList.add('highlight');

    document.querySelectorAll('#playerCard1')[handCardIndex].addEventListener('click', () => {
        ownListTutorial = true;
        document.querySelector('#tutorialMessage').innerHTML = 'Sempre que jogar uma carta existente em sua própria lista ela será removida de sua mão e adicionada a pilha de descarte, encerrando sua vez.';
        document.querySelector('#playerList1').classList.add('highlight');
        modalTutorial.show();
            
        document.querySelector('#tutorialModal').querySelector('button').addEventListener('click', () => {
            document.querySelector('#playerList1').classList.remove('highlight');
            modalTutorial.hide();
        });
    });

    document.querySelector('#tutorialModal').querySelector('button').addEventListener('click', () => {
        document.querySelectorAll('#playerCard1')[handCardIndex].classList.remove('highlight');
        modalTutorial.hide();
        document.querySelector('#tutorialModal').querySelector('button').removeEventListener('click', () => {
            document.querySelectorAll('#playerCard1')[handCardIndex].classList.remove('highlight');
            modalTutorial.hide();
        });
    });
}

function sortListTutorialTip(){
    console.log('sort')
    document.querySelector('#tutorialMessage').innerHTML = 'Você pode ordenar sua lista clicando em "Ordenar lista" e depois movendo livremente as cartas dentro dela. Isso encerrara sua vez. <br> <span style="color:red">Dica: Organizar sua lista pode ajudar a diminuir os danos que os outros jogadores podem causar a ela.</span>';
    modalTutorial.show();
    document.querySelectorAll('#sortButton1').classList.add('highlight');
    
    document.querySelector('#tutorialModal').querySelector('button').addEventListener('click', () => {
        sortListTutorial = true;
        document.querySelectorAll('#sortButton1').classList.remove('highlight');
        modalTutorial.hide();
     });
}

function tutorialIntro(){
    console.log(tutorialStep)
    if(tutorialStep == 1){
        document.querySelectorAll('.modal-dialog-centered')[1].classList.remove('modal-dialog-centered');
        document.querySelector('#tutorialMessage').innerHTML = 'O jogo se inicia com a distribuição de 4 cartas no centro da mesa, chamaremos esse centro de "lista principal".';
        modalTutorial.show();
        document.querySelector('#mainListContainer').classList.add('show');
        document.querySelector('#mainListContainer').classList.add('highlight');
    }
    else if(tutorialStep == 2){
        document.querySelector('#mainListContainer').classList.remove('show');
        document.querySelector('#mainListContainer').classList.remove('highlight');
        document.querySelector('#mainListContainer').classList.remove('fade');
        document.querySelector('#tutorialMessage').innerHTML = 'Em seguida, cada jogar também recebe 4 cartas do baralho.<br><br><span style="color:red">*Importante: Nesse jogo os naipes das cartas serão ignorados, consideramos como iguais todas as cartas que possuirem o mesmo número ou figura, indepedente de naipe ou cor.</span>';
        modalTutorial.show();

        for(let i = 1; i <= 4; i++){
            document.querySelector(`#playerHandCards${i}`).classList.add('show');
            document.querySelector(`#playerHandCards${i}`).classList.add('highlight');
        }
    }
    else if(tutorialStep == 3){
        for(let i = 1; i <= 4; i++){
            document.querySelector(`#playerHandCards${i}`).classList.remove('show');
            document.querySelector(`#playerHandCards${i}`).classList.remove('highlight');
            document.querySelector(`#playerHandCards${i}`).classList.remove('fade');

            console.log(`#playerList${i}`)
            
            document.querySelector(`#playerList${i}`).classList.add('show');
            document.querySelector(`#playerList${i}`).classList.add('highlight');
        }
        document.querySelector('#tutorialMessage').innerHTML = 'Além da lista principal cada jogador também possui sua própria lista, que serve como pontuação, ao final do jogo vencerá o jogador com o maior número de cartas em sua lista.';
        modalTutorial.show();
    }
    else if(tutorialStep == 4){
        for(let i = 1; i <= 4; i++){            
            document.querySelector(`#playerList${i}`).classList.remove('show');
            document.querySelector(`#playerList${i}`).classList.remove('highlight');
            document.querySelector(`#playerList${i}`).classList.remove('fade');
        }
        document.querySelector('#tutorialMessage').innerHTML = 'A pilha de descarte é o destino das cartas jogadas pelos jogadores em seu turno, sempre que uma carta é utilizada para pegar cartas da lista principal, ou roubar cartas dos adversários, essa carta será adicionada a pilha de descarte, enquanto as outras irão para a lista do jogador.';
    
        document.querySelector(`#trash`).classList.add('show');
        document.querySelector(`#trash`).classList.add('highlight');

        document.querySelector(`#tutorialModal`).querySelector('.modal-dialog').classList.add('fixed-bottom');
        modalTutorial.show();
    
    }
    else if(tutorialStep == 5){
        document.querySelector(`#tutorialModal`).querySelector('.modal-dialog').classList.remove('fixed-bottom');
    
        document.querySelector(`#trash`).classList.remove('show');
        document.querySelector(`#trash`).classList.remove('highlight');
    
        document.querySelector('#tutorialMessage').innerHTML = 'Agora vamos jogar!';
    
        modalTutorial.show();
    }
    else{
        tutorialTips();
        tutorialStep = 0;
        return true;
    }
    tutorialStep++;
}

function drawTutorialTip(){
    console.log('draw')
    document.querySelector('#tutorialMessage').innerHTML = 'Sempre que uma mão ou a lista principal forem esvaziadas as 4 cartas são repostas, o jogo segue até que as cartas da mão de algum jogador acabe e ele não possa mais comprar.';
    modalTutorial.show();
    document.querySelectorAll('#deck').classList.add('highlight');
    
    document.querySelector('#tutorialModal').querySelector('button').addEventListener('click', () => {
        document.querySelectorAll('#deck').classList.remove('highlight');
        modalTutorial.hide();
     });
}

let stealTutorial = false;
let normalTutorial = false;
let mainTutorial = false;
let ownListTutorial = false;
let sortListTutorial = false;
let drawTutorial = false;

let tutorialBool = localStorage.getItem('tutorial') == 'true' ? true : false;

let tutorialStep = 1;
let modalTutorial = new bootstrap.Modal(document.querySelector("#tutorialModal"), {});
document.querySelector('#tutorialMessage').innerHTML = 'Bem-Vindo ao tutorial, iniciaremos a experiência com um jogo orientado e a medida que os conceitos forem compreendidos, iremos retirar as "rodinhas".'

if(tutorialBool){
    modalTutorial.show()
}
else{
    for(let i = 1; i <= 4; i++){
        document.querySelector(`#playerHandCards${i}`).classList.remove('show');
        document.querySelector(`#playerHandCards${i}`).classList.remove('highlight');
        document.querySelector(`#playerHandCards${i}`).classList.remove('fade');
    }
    document.querySelector('#mainListContainer').classList.remove('show');
    document.querySelector('#mainListContainer').classList.remove('highlight');
    document.querySelector('#mainListContainer').classList.remove('fade');
}

document.querySelector('#nextTutorial').addEventListener('click', () => {
    if(tutorialStep != 0){
        tutorialIntro();
    }
    else{
        document.querySelector("#nextTutorial").setAttribute("data-bs-dismiss", "modal");
        document.querySelector("#nextTutorial").removeEventListener('click', () => {});
    }    
})

document.querySelector('#notTutorial').addEventListener('change', () => {
    tutorialBool = !document.querySelector('#notTutorial').checked;
});