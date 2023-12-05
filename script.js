const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');

let people = [];

addRandomUser();
addRandomUser();
addRandomUser();

async function addRandomUser() {
    const res = await fetch(`https://randomuser.me/api`);
    const data = await res.json();
    console.log(data.results[0]);

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first}  ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
        picture: `${user.picture.thumbnail}`
    }

    addPeople(newUser);
}

function addPeople(personObj) {
    people.push(personObj);

    updateDOM();
}

function updateDOM(providedPeople = people) {
    main.innerHTML = '<h2><strong>Person</strong></h2>';
    console.log(providedPeople);

    providedPeople.forEach((person) => {
        const element = document.createElement('li');
        element.classList.add('person');
        element.innerHTML = `<img src="${person.picture}"></><strong>${person.name}</strong> <div class="money">${formatMoney(person.money)}</div>`;
        main.appendChild(element);
    })

}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney() {
    console.log(people);
    people = people.map((person) => {
        return {...person, money: person.money * 2};
    })
    updateDOM();
}

function showOnlyMillionaires() {
    people = people.filter((person) => {
        return person.money >= 1000000;
    })
    updateDOM();
}

function sortByRichest() {
    people = people.sort((a,b) => {
        return b.money - a.money;
    })
    updateDOM();
}

function calculateEntireWealth() {
    const wealth = people.reduce((acc, person) => {
        return acc += person.money;
    }, 0);
    console.log(wealth);

    const wealthEl = document.createElement('div');
    wealthEl.className = 'total-wealth';
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);


    // need to figure out how to not have multiples of the total wealth pop up
    // need to figure out how to display an alert message when there are no users to calculate the total wealth for
    console.log(main.childNodes);
    const mainNodes = main.childNodes;

    mainNodes.forEach((node) => {
        if (node.classList.contains('total-wealth')) {
            node.classList.remove('total-wealth')
            // return console.log('sweet');
            // remove parent element?
        } else {
            node.classList.add('total-wealth')
        }
    })
    
}

// Event Listeners 
addUser.addEventListener('click', addRandomUser);
double.addEventListener('click', doubleMoney);
showMillionaires.addEventListener('click', showOnlyMillionaires);
sort.addEventListener('click', sortByRichest);
calculateWealth.addEventListener('click', calculateEntireWealth);