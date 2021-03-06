domdata = document.querySelectorAll('[data-card-text]')
document.querySelector("input[name='medium']").addEventListener('change', chance)
document.querySelector("input[name='hard']").addEventListener('change', chance)
document.querySelector("input[name='extreme']").addEventListener('change', chance)
data = Array.from(domdata).map(e => ({"text": e.dataset.cardText, "id": e.dataset.cardId, "type": e.dataset.cardType, "tag": e.dataset.cardTag}));
MEDIUM = data.filter(d => d.type == "NORMAL")
EXTREME = data.filter(d => d.type == "EXTREME")
HARD = data.filter(d => d.type == "HARD");
chance1 = localStorage.getItem('chance_medium');
chance2 = localStorage.getItem('chance_hard');
chance3 = localStorage.getItem('chance_extreme');
CHANCE_MEDIUM = parseInt(chance1 ? chance1 : 62);
CHANCE_HARD = parseInt(chance2 ? chance2 : 30);
CHANCE_EXTREME = parseInt(chance3 ? chance3 : 8);
RESENT = 0;
CHANCE_SWITCH_START = localStorage.getItem('switch_start') ? localStorage.getItem('switch_start') : 15;
CHANCE_SWITCH_END = localStorage.getItem('switch_end') ? localStorage.getItem('switch_end') : 25;
NUMBER_OF_CARDS_LATEST_SWITCH = localStorage.getItem('cards_latest_switch') ? localStorage.getItem('cards_latest_switch') : 0;


function throttle (callback, limit) {
    var wait = false;                  // Initially, we're not waiting
    return function () {               // We return a throttled function
        if (!wait) {                   // If we're not waiting
            callback.call();           // Execute users function
            wait = true;               // Prevent future invocations
            setTimeout(function () {   // After a period of time
                wait = false;          // And allow future invocations
            }, limit);
        }
    }
}

const trampoline = fn => (...args) => {
    let result = fn(...args)
    while (typeof result === 'function') {
        result = result()
    }
    return result
}

const gewNewRandom = trampoline(getNewRandomRec)

function chance() {
    console.log(this.name);
}

function switch_position() {
    if(NUMBER_OF_CARDS_LATEST_SWITCH >= CHANCE_SWITCH_START && NUMBER_OF_CARDS_LATEST_SWITCH < CHANCE_SWITCH_END)
        return Math.random() >= 0.7 ? true : false;
    if (NUMBER_OF_CARDS_LATEST_SWITCH >= CHANCE_SWITCH_END)
        return true;
    return false;
}

let t = throttle(switch_card_func, 3000)
function switch_card() {
    t()
}

switch_card();

function switch_card_func() {
    document.querySelector('.card').classList.remove('SWITCHPPLACE');
    console.log(NUMBER_OF_CARDS_LATEST_SWITCH)
    if(switch_position()) {
        document.querySelector('.card').classList.add('SWITCHPPLACE');
        document.querySelector('#text').innerHTML = "Its time to switch places you fucking alcoholics! Drink some more!";
        NUMBER_OF_CARDS_LATEST_SWITCH = 0;
        localStorage.setItem('cards_latest_switch', NUMBER_OF_CARDS_LATEST_SWITCH);
        return;
    }

    const card = gewNewRandom(getRandomData());
    RESENT = card.id;
    if(card.type == "EXTREME")
        document.querySelector('.card').classList.add('EXTREME');
    else
        document.querySelector('.card').classList.remove('EXTREME');
    document.querySelector('#text').innerHTML = card.text;
    localStorage.setItem('cards_latest_switch', NUMBER_OF_CARDS_LATEST_SWITCH++);

    //cardText = document.querySelector('.card');
    //cardText.style.fontSize = getFontSize(cardText.textContent.length);
}

function switch_settings() {
    if(document.querySelector('.card').classList.contains("hiden")) {
        document.querySelector('main').classList.add('owerflow')
        comfirm();
    } else {
        document.querySelector('main').classList.remove('owerflow')
        document.querySelector('#setting_menu').classList.toggle('hiden')
        document.querySelector('.card').classList.toggle('hiden')
    }
    document.querySelector('input[name="medium"]').value = CHANCE_MEDIUM;
    document.querySelector('input[name="hard"]').value = CHANCE_HARD;
    document.querySelector('input[name="extreme"]').value = CHANCE_EXTREME;
    document.querySelector('input[name="end"]').value = CHANCE_SWITCH_END;
    document.querySelector('input[name="start"]').value = CHANCE_SWITCH_START;
}

function comfirm() {
    let data = []
    document.querySelectorAll('input[name="tags"]:checked').forEach(input => {
        data.push(input.value);
    });
    CHANCE_MEDIUM = document.querySelector('input[name="medium"]').value;
    CHANCE_HARD = document.querySelector('input[name="hard"]').value;
    CHANCE_EXTREME = document.querySelector('input[name="extreme"]').value;
    localStorage.setItem("tags", data.join(','))
    localStorage.setItem('chance_medium', CHANCE_MEDIUM);
    localStorage.setItem('chance_hard', CHANCE_HARD);
    localStorage.setItem('chance_extreme', CHANCE_EXTREME);
    document.querySelector('#setting_menu').classList.add('hiden')
    document.querySelector('.card').classList.remove('hiden')
    CHANCE_SWITCH_END = document.querySelector('input[name="end"]').value;
    CHANCE_SWITCH_START = document.querySelector('input[name="start"]').value;
    localStorage.setItem('switch_end', CHANCE_SWITCH_END);
    localStorage.setItem('switch_start', CHANCE_SWITCH_START);
}

function getRandomData() {
    random = Math.floor(Math.random() * 100) + 1;

    if(random <= parseInt(CHANCE_MEDIUM)) return MEDIUM;
    else if(random <= parseInt(CHANCE_MEDIUM) + parseInt(CHANCE_HARD)) return HARD;
    else return EXTREME;
}

function getNewRandomRec(data) {
    if(data.length == 1)
        return data[0];
    random = data[Math.floor(Math.random() * data.length-1) + 1];

    cardTags = random.tag.split(',');
    userTags = (localStorage.getItem("tags") ? localStorage.getItem("tags") : "").split(',')

    if(cardTags && userTags  && userTags[0] != "") {
        for(var cardTag = 0; cardTag <= cardTags.length; cardTag++) {
            bool = false;
            for(var userTag = 0; userTag <= userTags.length; userTag++) {
                if(userTags[userTag] == cardTags[cardTag] && RESENT != random.id) {
                    bool = true;
                    break;
                }
            }
            if(!bool)
                return () => getNewRandomRec(data);
        }
    }
    return random;

}
