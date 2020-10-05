confirm();
domdata = document.querySelectorAll('[data-card-text]')
data = Array.from(domdata).map(e => ({"text": e.dataset.cardText, "id": e.dataset.cardId, "type": e.dataset.cardType, "tag": e.dataset.cardTag}));
switch_card();


if(localStorage.getItem('dark-mode') == "false") {
    document.querySelector('main').classList.remove('DARK_MODE')
    document.querySelector('.switch').classList.remove('DARK_MODE')
} else {
    localStorage.setItem('dark-mode', true);
    document.querySelector('main').classList.add('DARK_MODE')
    document.querySelector('.switch').classList.add('DARK_MODE')
}

function switch_dark_mode() {
    mode = localStorage.getItem('dark-mode');
    document.querySelector('main').classList.toggle('DARK_MODE')
    document.querySelector('.switch').classList.toggle('DARK_MODE')
    localStorage.setItem('dark-mode', mode=="false" ? "true" : "false");
}

function switch_card() {
    card = getNewRandom();
    console.log(card.type);
    if(card.type == "EXTREME")
        document.querySelector('.card').classList.add('EXTREME');
    else
        document.querySelector('.card').classList.remove('EXTREME');
    document.querySelector('#text').innerHTML = card.text;
}

function switch_settings() {
    document.querySelector('.setting_menu').classList.toggle('hiden')
}

function confirm() {
    let data = []
    document.querySelectorAll('input[name="tags"]:checked').forEach(input => {
        data.push(input.value);
    });
    localStorage.setItem("tags", data.join(','))
    document.querySelector('.setting_menu').classList.add('hiden')
}

function getNewRandom() {
    random = data[Math.floor(Math.random() * data.length-1) + 1];
    

    cardTags = random.tag.split(',');
    userTags = (localStorage.getItem("tags") ? localStorage.getItem("tags") : "").split(',')

    if(cardTags) {
        for(var cardTag = 0; cardTag <= cardTags.length; cardTag++) {
            bool = false;
            for(var userTag = 0; userTag <= userTags.length; userTag++) {
                if(userTag == cardTag) {
                    bool = true;
                    break;
                }
            }
            if(!bool)
                return getNewRandom();
        }
    }
    return random;

}