domdata = document.querySelectorAll('[data-card-text]')
data = Array.from(domdata).map(e => ({"text": e.dataset.cardText, "id": e.dataset.cardId, "type": e.dataset.cardType, "tag": e.dataset.cardTag}));
MEDIUM = data.filter(d => d.type == "NORMAL")
EXTREME = data.filter(d => d.type == "EXTREME")
HARD = data.filter(d => d.type == "HARD");
chance1 = localStorage.getItem('chance_medium');
chance2 = localStorage.getItem('chance_hard');
chance3 = localStorage.getItem('chance_extreme');
CHANCE_MEDIUM = parseInt(chance1 ? chance1 : 60);
CHANCE_HARD = parseInt(chance2 ? chance2 : 30);
CHANCE_EXTREME = parseInt(chance3 ? chance3 : 10);
RESENT = 0;

switch_card();

function switch_card() {
    
    card = getNewRandom(getRandomData());
    RESENT = card.id;
    console.log(card.type);
    if(card.type == "EXTREME")
        document.querySelector('.card').classList.add('EXTREME');
    else
        document.querySelector('.card').classList.remove('EXTREME');
    document.querySelector('#text').innerHTML = card.text;
}

function switch_settings() {
    document.querySelector('#setting_menu').classList.toggle('hiden')
    document.querySelector('.card').classList.toggle('hiden')
}

function comfirm() {
    console.log("hello")
    let data = []
    document.querySelectorAll('input[name="tags"]:checked').forEach(input => {
        data.push(input.value);
    });
    localStorage.setItem("tags", data.join(','))
    localStorage.setItem('chance_medium', document.querySelector('input[name="medium"]').value);
    localStorage.setItem('chance_hard', document.querySelector('input[name="hard"]').value);
    localStorage.setItem('chance_extreme', document.querySelector('input[name="extreme"]').value);
    document.querySelector('#setting_menu').classList.add('hiden')
    document.querySelector('.card').classList.remove('hiden')
}

function getRandomData() {
    random = Math.floor(Math.random() * 100) + 1;
    console.log(random);

    if(random > 0 && random <= CHANCE_MEDIUM)
        return MEDIUM;
    if(random > CHANCE_MEDIUM && random <= (CHANCE_MEDIUM + CHANCE_HARD))
        return HARD;
    return EXTREME;
}

function getNewRandom(data) {
    random = data[Math.floor(Math.random() * data.length-1) + 1];

    cardTags = random.tag.split(',');
    userTags = (localStorage.getItem("tags") ? localStorage.getItem("tags") : "").split(',')
    chance = (localStorage.getItem("chance") ? localStorage.getItem("chance") : "").split(',')

    if(cardTags) {
        for(var cardTag = 0; cardTag <= cardTags.length; cardTag++) {
            bool = false;
            for(var userTag = 0; userTag <= userTags.length; userTag++) {
                if(userTags[userTag] == cardTags[cardTag] && RESENT != random.id) {
                    bool = true;
                    break;
                }
            }
            if(!bool)
                return getNewRandom(data);
        }
    }
    return random;

}