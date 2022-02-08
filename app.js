const healthBars= document.querySelectorAll('.hp>span');
const firstMenu= document.querySelector('.menu1');
const attackMenu= document.querySelector('.menu2');
const convos=document.querySelectorAll('.text');
const moves=['rock','paper','scissors','lizard','spock'];
const ruleAdjMatrix=[
    [0,-1,1,1,-1],
    [1,0,-1,-1,1],
    [-1,1,0,1,-1],
    [-1,1,-1,0,1],
    [1,-1,1,-1,0]
]
attackMenu.style.visibility='hidden';

document.addEventListener('keyup', playTheGame);
function playTheGame(e){
    if(attackMenu.style.visibility==='hidden'){
        switch(e.key){
            case 'a':
                attackMenu.style.visibility='visible';
                firstMenu.classList.add('disabled');
                convoExchange('aggro');
                break;
            case 'm':
                convoExchange('mercy');
                break;
            case 'i':
                convoExchange('intimidate');
                break;
        }
    }else {
        
        switch(e.key){
            case 'r':
                attack('rock');
                break;
            case 'p':
                attack('paper');
                break;
            case 's':
                attack('scissors');
                break;
            case 'l':
                attack('lizard');
                break;
            case 'k':
                attack('spock');
        }
        checkClear();
    }
}
const convoExchange=(mode)=>{
    document.removeEventListener('keyup',playTheGame);
    switch(mode){
        case 'mercy':
            convos[1].classList.add('speaking');
            convos[1].textContent='Please Mr. Roboto! I have a family!';
            setTimeout(()=>{
                convos[0].classList.add('speaking')
                convos[0].textContent="That's right! Beg!"
                setTimeout(()=>{
                    convos[1].textContent='';
                    convos[0].textContent='And die!';
                },1500)
            },2000);
            break;
        case 'intimidate':
            convos[1].classList.add('speaking')
            convos[1].textContent='Your days of RPS-terrorism have come to an end. Surrender now!';
            setTimeout(()=>{
                convos[0].classList.add('speaking')
                convos[0].textContent='Ok! I will leave...';
                convos[1].textContent='';
                setTimeout(()=>{
                    convos[0].textContent='...NOT!';
                },1500)
            },2500);
            break;
        case 'aggro':
            convos[0].classList.add('speaking');
            convos[0].textContent='Show me what you got!';
            setTimeout(()=>{
                convos[0].textContent='';
                convos[1].classList.add('speaking');
                convos[1].textContent='Oh I\'ll show you, like Euclid showed the infinitude of primes';
            },2000)
    }
    convos.forEach(text=>{
        text.classList.remove('speaking');
        text.textContent='';
    })
    document.addEventListener('keyup',playTheGame)
};
const attack=function(move){
        convos[0].textContent='';
        convos[1].textContent='';
        win(move,p2Move());

        firstMenu.classList.remove('disabled');
        attackMenu.style.visibility='hidden';
    
}
//get the play from Player2(so far we play only against random computer)
const p2Move=function(strat=0){
    let move;
    switch(strat){
        case 0:
            move= moves[Math.floor(Math.random()*moves.length)];
            break;
        case 1:
            move= moves[0];
            break;
    }
    
    
    return move;
    
}
const win=function(myMove,opMove){
    //brute force it for now
    const i=moves.indexOf(myMove);
    const j=moves.indexOf(opMove);
    
    switch(ruleAdjMatrix[i][j]){
        case 1:
            healthBars[0].textContent=Number(healthBars[0].textContent)-1;
            break;
        case -1:
            healthBars[1].textContent=Number(healthBars[1].textContent)-1;
            break;
    }
}
const checkClear=function(){
    convos.forEach(text=>{text.classList.remove('speaking')});
    if(healthBars[0].textContent==0){
        convos[0].classList.add('speaking');
        convos[0].textContent='I admit defeat, you win';
        document.removeEventListener('keyup',playTheGame);
        alert('You have defeated Mr. Roboto. Press any key to play again.');
        document.addEventListener('keyup',resetTheGame);
     }else if(healthBars[1].textContent==0){
        convos[0].classList.add('speaking');
        convos[0].textContent='You thought you could beat me';
        setTimeout(()=>{
            convos[0].textContent='HA';
            setTimeout(()=>{
                convos[0].textContent='HA HA'
            },500);
        },1500)
        document.removeEventListener('keyup',playTheGame)
        alert('Mr. Roboto has bested you. Press any key to have another go.');
        document.addEventListener('keyup',resetTheGame)
    }
}
function resetTheGame(){
    healthBars.forEach(hp=>{hp.textContent=3;});
    convos.forEach(text=>{
        text.classList.remove('speaking')
        text.textContent='';
    })
    document.removeEventListener('keyup',resetTheGame);
    document.addEventListener('keyup',playTheGame);
}