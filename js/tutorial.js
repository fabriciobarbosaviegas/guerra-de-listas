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

    if(tutorialBool){
        let playerHand = document.querySelectorAll('#playerCard1');
        let playerHandSize = playerHand.length;
        let ownList = document.querySelectorAll('#player1ListCard');
        let ownListSize = ownList.length;

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
                        for(let j = 0; j < adversaryListSize; j++){0
                            if(playerHand[i].name.slice(1,) == adversaryList[j].name.slice(1,)){
                                stealPlayTip(i);
                                break;
                            }
                        }
                    }
                }
            }
        }
        if(!ownListTutorial){
            for(let i = 0; i < playerHandSize; i++){
                for(let j = 0; j < ownListSize; j++){
                    if(playerHand[i].name.slice(1,) == ownList[j].name.slice(1,)){
                        ownListPlayTip(i);
                        break;
                    }
                }
            }        
        }
        if(!sortListTutorial){
            if(ownListSize > 1){
                sortListTutorialTip();
            }    
        }
    }
    return false;
} 

function defaultPlayTip(){
    console.log('normal')
    createModalTip('default', 'Você não pode fazer nenhuma grande jogada no momento, selecione uma carta para adicionar a lista principal.');
    defaultModal = new bootstrap.Modal(document.querySelector("#defaultModal"), {});
    defaultModal.show();
    
    normalTutorial = true;

    document.querySelector('#defaultModal').querySelector('button').addEventListener('click', () => {
        document.querySelector('#defaultMessage').innerHTML = 'Após jogar uma carta que não exista nem na lista principal, nem na lista de um dos jogadores, ela é adicionada a lista principal para poder ser pega por outro jogador no próximo turno, encerrando sua vez.';
        document.querySelector('#defaultModal').querySelector('button').addEventListener('click', () => {
            defaultModal.hide();
        });
    });
}

function mainListPlayTip(handCardIndex){
    console.log('main')
    createModalTip('mainList','Você possui uma ou mais cartas em sua mão que também existem na lista principal, jogue uma dessas cartas para adiciona-la a sua lista principal.');
    mainListModal = new bootstrap.Modal(document.querySelector("#mainListModal"), {});
    mainListModal.show();
    document.querySelectorAll('#playerCard1')[handCardIndex].classList.add('highlight');

    document.querySelectorAll('#playerCard1')[handCardIndex].addEventListener('click', () => {
        mainTutorial = true;
        document.querySelector('#mainListMessage').innerHTML = 'Sempre que jogar uma carta existente na lista principal, essa carta será removida de lá e adicionada a sua lista, enquanto a carta que você jogou originalmente irá para a pilha de descarte, encerrando sua vez.';
        document.querySelector('#playerList1').classList.add('highlight');
        mainListModal.show();
    });

    document.querySelector('#mainListModal').querySelector('button').addEventListener('click', () => {
        if(document.querySelectorAll('#playerCard1')[handCardIndex]){
            document.querySelectorAll('#playerCard1')[handCardIndex].classList.remove('highlight');
        }
        document.querySelector('#playerList1').classList.remove('highlight');
        mainListModal.hide();
    });
}

function stealPlayTip(handCardIndex){
    console.log('steal')
    createModalTip('stealList','Você possui uma ou mais cartas em sua mão que também existem na lista de algum dos seus adversários, jogue uma dessas cartas para roubar todas as cartas do seu adversário a partir dela.');
    stealListModal = new bootstrap.Modal(document.querySelector("#stealListModal"), {});
    stealListModal.show();
    document.querySelectorAll('#playerCard1')[handCardIndex].classList.add('highlight');

    document.querySelectorAll('#playerCard1')[handCardIndex].addEventListener('click', () => {
        stealTutorial = true;
        document.querySelector('#stealListMessage').innerHTML = 'Sempre que jogar uma carta existente na lista de um dos seus adversários, todas as cartas a partir dela na lista dele serão roubadas e movidas para o final da sua lista, enquanto a carta original irá para a pilha de descarte.';
        document.querySelector('#playerList1').classList.add('highlight');
        stealListModal.show();
            
        document.querySelector('#stealListModal').querySelector('button').addEventListener('click', () => {
            document.querySelector('#playerList1').classList.remove('highlight');
        });
    });

    document.querySelector('#stealListModal').querySelector('button').addEventListener('click', () => {
        if(document.querySelectorAll('#playerCard1')[handCardIndex]){
            document.querySelectorAll('#playerCard1')[handCardIndex].classList.remove('highlight');
        }
        stealListModal.hide();
    });
}

function ownListPlayTip(handCardIndex){
    console.log('own')
    createModalTip('ownList','Você possui uma ou mais cartas em sua mão que também existem em sua própria lista, jogue essa carta para elimina-la de sua mão.');
    ownListModal = new bootstrap.Modal(document.querySelector("#ownListModal"), {});
    
    ownListModal.show();
    
    document.querySelectorAll('#playerCard1')[handCardIndex].classList.add('highlight');

    document.querySelectorAll('#playerCard1')[handCardIndex].addEventListener('click', () => {
        ownListTutorial = true;
        document.querySelector('#ownListMessage').innerHTML = 'Sempre que jogar uma carta existente em sua própria lista, ela será removida de sua mão e adicionada a pilha de descarte, encerrando sua vez.';
        document.querySelector('#playerList1').classList.add('highlight');
        ownListModal.show();
            
        document.querySelector('#ownListModal').querySelector('button').addEventListener('click', () => {
            document.querySelector('#playerList1').classList.remove('highlight');
            ownListModal.hide();
        });
    });

    document.querySelector('#ownListModal').querySelector('button').addEventListener('click', () => {
        if(document.querySelectorAll('#playerCard1')[handCardIndex])
        {
            document.querySelectorAll('#playerCard1')[handCardIndex].classList.remove('highlight');
        }
        ownListModal.hide();
    });
}

function sortListTutorialTip(){
    console.log('sort')
    
    createModalTip('sortList','Você pode ordenar sua lista clicando em "Ordenar lista" e depois movendo livremente as cartas dentro dela. Isso encerrara sua vez. <br> <span style="color:red">Dica: Organizar sua lista pode ajudar a diminuir os danos que os outros jogadores podem causar a ela.</span>');
    sortListModal = new bootstrap.Modal(document.querySelector("#sortListModal"), {});
    
    sortListModal.show();
    if(document.querySelector('#sortButton1')){
        document.querySelector('#sortButton1').classList.add('highlight');
    }
    document.querySelector('#sortListModal').querySelector('button').addEventListener('click', () => {
        sortListTutorial = true;
        document.querySelector('#sortButton1').classList.remove('highlight');
        sortListModal.hide();
     });
}

function tutorialIntro(){
    console.log(tutorialStep)
    if(tutorialStep == 1 && tutorialBool){
        document.querySelectorAll('.modal-dialog-centered')[1].classList.remove('modal-dialog-centered');
        document.querySelector('#tutorialMessage').innerHTML = 'O jogo se inicia com a distribuição de 4 cartas no centro da mesa, chamaremos esse centro de "lista principal".';
        modalTutorial.show();
        document.querySelector('#mainListContainer').classList.add('show');
        document.querySelector('#mainListContainer').classList.add('highlight');
    }
    else if(tutorialStep == 2 && tutorialBool){
        document.querySelector('#mainListContainer').classList.remove('show');
        document.querySelector('#mainListContainer').classList.remove('highlight');
        document.querySelector('#mainListContainer').classList.remove('fade');
        document.querySelector('#tutorialMessage').innerHTML = 'Em seguida, cada jogar também recebe 4 cartas do baralho.<br><br><span style="color:red">*Importante: Nesse jogo os naipes das cartas serão ignorados, consideramos como iguais todas as cartas que possuírem o mesmo número ou figura, independente de naipe ou cor.</span>';
        modalTutorial.show();

        for(let i = 1; i <= 4; i++){
            document.querySelector(`#playerHandCards${i}`).classList.add('show');
            document.querySelector(`#playerHandCards${i}`).classList.add('highlight');
        }
    }
    else if(tutorialStep == 3 && tutorialBool){
        for(let i = 1; i <= 4; i++){
            document.querySelector(`#playerHandCards${i}`).classList.remove('show');
            document.querySelector(`#playerHandCards${i}`).classList.remove('highlight');
            document.querySelector(`#playerHandCards${i}`).classList.remove('fade');

            console.log(`#playerList${i}`)
            
            document.querySelector(`#playerList${i}`).classList.add('fade');
            document.querySelector(`#playerList${i}`).classList.add('show');
            document.querySelector(`#playerList${i}`).classList.add('highlight');
        }
        document.querySelector('#tutorialMessage').innerHTML = 'Além da lista principal cada jogador também possui sua própria lista, que serve como pontuação, ao final do jogo vencerá o jogador com o maior número de cartas em sua lista.';
        modalTutorial.show();
    }
    else if(tutorialStep == 4 && tutorialBool){
        for(let i = 1; i <= 4; i++){            
            document.querySelector(`#playerList${i}`).classList.remove('show');
            document.querySelector(`#playerList${i}`).classList.remove('highlight');
            document.querySelector(`#playerList${i}`).classList.remove('fade');
        }
        document.querySelector('#tutorialMessage').innerHTML = 'A pilha de descarte é o destino das cartas jogadas pelos jogadores em seu turno, sempre que uma carta é utilizada para pegar cartas da lista principal, ou roubar cartas dos adversários, essa carta será adicionada a pilha de descarte, enquanto as outras irão para a lista do jogador.';
    
        document.querySelector(`#trash`).classList.add('fade');
        document.querySelector(`#trash`).classList.add('show');
        document.querySelector(`#trash`).classList.add('highlight');

        document.querySelector(`#tutorialModal`).querySelector('.modal-dialog').classList.add('fixed-bottom');
        modalTutorial.show();
    
    }
    else if(tutorialStep == 5 && tutorialBool){
        document.querySelector(`#tutorialModal`).querySelector('.modal-dialog').classList.remove('fixed-bottom');
    
        document.querySelector(`#trash`).classList.remove('show');
        document.querySelector(`#trash`).classList.remove('fade');
        document.querySelector(`#trash`).classList.remove('highlight');
    
        document.querySelector('#tutorialMessage').innerHTML = 'Agora vamos jogar!';
    
        modalTutorial.show();
    }
    else if(!tutorialBool){
        modalTutorial.hide();

        document.querySelector('#mainListContainer').classList.remove('show');
        document.querySelector('#mainListContainer').classList.remove('highlight');
        document.querySelector('#mainListContainer').classList.remove('fade');

        for(let i = 1; i <= 4; i++){
            document.querySelector(`#playerHandCards${i}`).classList.remove('show');
            document.querySelector(`#playerHandCards${i}`).classList.remove('fade');
        }

        for(let i = 1; i <= 4; i++){            
            document.querySelector(`#playerList${i}`).classList.remove('show');
            document.querySelector(`#playerList${i}`).classList.remove('fade');
        }

        document.querySelector(`#trash`).classList.remove('show');
        document.querySelector(`#trash`).classList.remove('fade');
    }
    else{
        tutorialTips();
        tutorialStep = 0;
        modalTutorial.hide();
        return true;
    }
    tutorialStep++;
}

function drawTutorialTip(){
    if(tutorialBool){   
        console.log('draw')
        createModalTip('drawTip','Sempre que uma mão ou a lista principal forem esvaziadas, as 4 cartas são repostas, o jogo segue até que as cartas da mão de algum jogador acabe e ele não possa mais comprar.')
        let modalTip = new bootstrap.Modal(document.querySelector("#drawTipModal"), {});
        modalTip.show();
        document.querySelector('#deck').classList.add('highlight');
        
        document.querySelector('#drawTipModal').querySelector('button').addEventListener('click', () => {
            if(document.querySelector('#deck')){
                document.querySelector('#deck').classList.remove('highlight');   
            }
            modalTip.hide();
        });
    }
}

function createModalTip(name, text){
    let modalTip = `
    <div class="modal fade pr-0" id="${name}Modal" tabindex="-1" aria-hidden="true" style="z-index: 1062 !important;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="${name}ModalLabel">Tutorial</h5>
                </div>
                <div class="modal-body" id="${name}Message">
                ${text}
                </div>
                <div class="modal-footer justify-content-center">
                    <input type="checkbox" name="notTutorial" id="notTutorial">
                    <label for="notTutorial" data-dismiss="modal">Destativar tutorial</label>
                    <button type="button" class="btn btn-success ms-5" id="nextTutorial">Continuar</button>
                    <br>
                    <hr>
                    <a href="https://github.com/fabriciobarbosaviegas/Guerra-de-Listas?tab=readme-ov-file#regras-do-jogo" target="_blank" class="mt-2 mb-1">Ler guia completo de como jogar</a>
                </div>
            </div>
        </div>
    </div>`
    document.body.insertAdjacentHTML('beforeend', modalTip);
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
