const main = document.getElementById("main");
const addUser = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionaires = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealth = document.getElementById("calculate-wealth");

let people = [];

addRandomUser();
addRandomUser();
addRandomUser();

async function addRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  // console.log(data.results[0]);

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
    picture: `${user.picture.thumbnail}`,
  };

  addPeople(newUser);
}

function addPeople(person) {
  people.push(person);

  updateDOM();
}

function updateDOM(providedPeople = people) {
  main.innerHTML = `<h2><strong>Celebrity</strong> Wealth</h2>`;
  // console.log(providedPeople);

  providedPeople.forEach((person) => {
    const element = document.createElement("li");
    element.classList.add("person");
    element.innerHTML = `<img src="${person.picture}"/>
        <strong>${person.name}</strong>
        <div class="money">${formatMoney(person.money)}</div>`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function doubleMoney() {
  people = people.map((person) => {
    // console.log(person);
    return { ...person, money: person.money * 2 };
  });
  updateDOM();
}

function showOnlyMillionaires() {
  people = people.filter((person) => {
    if (person.money >= 1000000) {
      return person;
    }
  });
  updateDOM();
}

function sortByRichest() {
  people = people.sort((personA, personB) => {
    // console.log(personA, personB);
    return personB.money - personA.money;
  });
  updateDOM();
}

function calculateTotalWealth() {
  checkUI();

  const wealth = people.reduce((acc, person) => {
    return (acc += person.money);
  }, 0);

  const wealthEl = document.createElement("div");
  wealthEl.className = "total-wealth";
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

function checkUI() {
  main.childNodes.forEach((node) => {
    if (node.classList.contains("total-wealth")) {
      node.remove();
    }
  });
}

// Event Listeners
addUser.addEventListener("click", addRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionaires.addEventListener("click", showOnlyMillionaires);
sort.addEventListener("click", sortByRichest);
calculateWealth.addEventListener("click", calculateTotalWealth);
