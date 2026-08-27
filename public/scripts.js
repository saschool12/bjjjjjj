const GAMES = [
  {
    id:"super-ace",
    name:"Super Ace",
    provider:"JILI",
    icon:"🎰",
    c1:"#f2b900",
    c2:"#9c1318",
    cat:"Slots"
  },
  {
    id:"wild-bounty",
    name:"Wild Bounty Showdown",
    provider:"PG",
    icon:"🤠",
    c1:"#7a451c",
    c2:"#17110b",
    cat:"Slots"
  },
  {
    id:"dragon-gems",
    name:"Dragon Gems Wheel",
    provider:"YB",
    icon:"🐉",
    c1:"#ff8c00",
    c2:"#762100",
    cat:"Slots"
  },
  {
    id:"poker-kingdom",
    name:"Poker Kingdom",
    provider:"PG",
    icon:"👑",
    c1:"#a00f25",
    c2:"#3b0710",
    cat:"Casino"
  },
  {
    id:"golden-empire",
    name:"Golden Empire",
    provider:"JILI",
    icon:"🏛️",
    c1:"#c67b16",
    c2:"#54210a",
    cat:"Slots"
  },
  {
    id:"fortune-gems",
    name:"Fortune Gems 2",
    provider:"JILI",
    icon:"💎",
    c1:"#d39c00",
    c2:"#54250b",
    cat:"Slots"
  },
  {
    id:"money-coming",
    name:"Money Coming",
    provider:"JILI",
    icon:"💵",
    c1:"#22a63c",
    c2:"#073f1b",
    cat:"Slots"
  },
  {
    id:"pinata-wins",
    name:"Pinata Wins",
    provider:"PG",
    icon:"🪅",
    c1:"#ef7e43",
    c2:"#7e2865",
    cat:"Slots"
  },
  {
    id:"treasures-aztec",
    name:"Treasures of Aztec",
    provider:"PG",
    icon:"🗿",
    c1:"#d79b24",
    c2:"#5a2a0c",
    cat:"Slots"
  },
  {
    id:"sweet-bonanza",
    name:"Sweet Bonanza 1000",
    provider:"PP",
    icon:"🍭",
    c1:"#f5a6e5",
    c2:"#d52a7c",
    cat:"Slots"
  },
  {
    id:"chinese-new-year",
    name:"Chinese New Year 2",
    provider:"FC",
    icon:"🧧",
    c1:"#d83224",
    c2:"#7d0909",
    cat:"Slots"
  },
  {
    id:"wild-ape",
    name:"Wild Ape #3258",
    provider:"PG",
    icon:"🦍",
    c1:"#8a3a9b",
    c2:"#28133d",
    cat:"Slots"
  },
  {
    id:"olympus",
    name:"Gates of Olympus 1000",
    provider:"PP",
    icon:"⚡",
    c1:"#4f8edc",
    c2:"#101e55",
    cat:"Slots"
  },
  {
    id:"boxing-king",
    name:"Boxing King",
    provider:"JILI",
    icon:"🥊",
    c1:"#ed4b25",
    c2:"#541111",
    cat:"Slots"
  },
  {
    id:"lucky-fortunes",
    name:"Lucky Fortunes",
    provider:"FC",
    icon:"🧧",
    c1:"#e8b51e",
    c2:"#9b2e11",
    cat:"Slots"
  },
  {
    id:"fruit-party",
    name:"Fruit Party",
    provider:"PP",
    icon:"🍓",
    c1:"#f34f79",
    c2:"#6c1950",
    cat:"Slots"
  },
  {
    id:"fish-shooter",
    name:"Fishing War",
    provider:"JILI",
    icon:"🐟",
    c1:"#1b99d8",
    c2:"#092b66",
    cat:"Fish"
  },
  {
    id:"live-blackjack",
    name:"Live Blackjack",
    provider:"LIVE",
    icon:"🃏",
    c1:"#8c5d22",
    c2:"#17100a",
    cat:"Casino"
  },
  {
    id:"sports-demo",
    name:"Sports Center",
    provider:"SPORT",
    icon:"🏀",
    c1:"#3e78b9",
    c2:"#152342",
    cat:"Sports"
  },
  {
    id:"lottery-demo",
    name:"Lottery 6/49",
    provider:"LOTTO",
    icon:"🎱",
    c1:"#623ca1",
    c2:"#1d123e",
    cat:"Lottery"
  }
];

const CATS = [
  ["🎰","Slots"],
  ["🐟","Fish"],
  ["🃏","Casino"],
  ["♣️","Poker"],
  ["🏀","Sports"],
  ["🎱","Lottery"]
];

let activeCat = "Slots";

let balance =
  Number(localStorage.getItem("demoPoints")) || 1000;

let favorites =
  JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

const $ = selector =>
  document.querySelector(selector);

function toast(message){

  const element = $("#toast");

  if(!element) return;

  element.textContent = message;

  element.classList.add("show");

  clearTimeout(window.__toast);

  window.__toast = setTimeout(() => {
    element.classList.remove("show");
  },1800);
}

function renderCats(){

  const element = $("#categories");

  if(!element) return;

  element.innerHTML = CATS.map(
    ([icon,name]) => `
      <button
        class="cat ${name === activeCat ? "active" : ""}"
        data-cat="${name}"
      >
        <div class="cat-icon">${icon}</div>
        <span>${name}</span>
      </button>
    `
  ).join("");

  element.onclick = event => {

    const button =
      event.target.closest(".cat");

    if(!button) return;

    activeCat =
      button.dataset.cat;

    renderCats();
    renderGames();
  };
}

function renderGames(){

  const query =
    ($("#search")?.value || "")
      .toLowerCase()
      .trim();

  let list = GAMES.filter(game =>
    game.cat === activeCat &&
    game.name.toLowerCase().includes(query)
  );

  if($("#sort")?.value === "az"){
    list.sort((a,b) =>
      a.name.localeCompare(b.name)
    );
  }

  const grid = $("#gameGrid");

  if(!grid) return;

  if(!list.length){

    grid.innerHTML = `
      <div class="empty">
        No games found.
      </div>
    `;

    return;
  }

  grid.innerHTML = list.map(game => `
    <article
      class="game-card"
      data-id="${game.id}"
    >

      <div
        class="thumb"
        style="
          --c1:${game.c1};
          --c2:${game.c2};
        "
      >

        <span class="provider">
          ${game.provider}
        </span>

        <button
          class="heart"
          aria-label="favorite"
        >
          ${
            favorites.includes(game.id)
              ? "♥"
              : "♡"
          }
        </button>

        <div class="thumb-art">
          ${game.icon}
        </div>

      </div>

      <div class="game-name">
        ${game.name}
      </div>

      <div class="game-meta">
        ${game.provider} • Demo
      </div>

    </article>
  `).join("");

  grid.onclick = event => {

    const heart =
      event.target.closest(".heart");

    const card =
      event.target.closest(".game-card");

    if(!card) return;

    if(heart){

      event.stopPropagation();

      const id = card.dataset.id;

      if(favorites.includes(id)){

        favorites =
          favorites.filter(
            item => item !== id
          );

      }else{

        favorites.push(id);
      }

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      renderGames();

      return;
    }

    openGame(card.dataset.id);
  };
}

function updateBalance(){

  const balanceElement =
    $("#balance");

  const modalBalance =
    $("#modalBalance");

  if(balanceElement){
    balanceElement.textContent =
      balance.toLocaleString();
  }

  if(modalBalance){
    modalBalance.textContent =
      balance.toLocaleString();
  }

  localStorage.setItem(
    "demoPoints",
    balance
  );
}

function openGame(id){

  const game =
    GAMES.find(item => item.id === id);

  if(!game) return;

  $("#modalTitle").textContent =
    game.name;

  $("#modalArt").textContent =
    game.icon;

  $("#gameModal")
    .classList
    .add("open");

  $("#playDemo").onclick = () => {

    const bet =
      Math.floor(
        Number(
          $("#demoBet").value
        )
      );

    if(!Number.isFinite(bet) || bet < 1){

      toast(
        "Enter a valid demo amount"
      );

      return;
    }

    if(bet > balance){

      toast(
        "Not enough demo points"
      );

      return;
    }

    balance -= bet;

    const win =
      Math.random() < 0.34
        ? bet * 2
        : 0;

    balance += win;

    updateBalance();

    toast(
      win
        ? `Demo win +${win} points`
        : `Demo round -${bet} points`
    );
  };
}

function closeGame(){

  $("#gameModal")
    ?.classList
    .remove("open");
}

function init(){

  renderCats();

  renderGames();

  updateBalance();

  $("#search")
    ?.addEventListener(
      "input",
      renderGames
    );

  $("#sort")
    ?.addEventListener(
      "change",
      renderGames
    );

  $("#closeModal")
    ?.addEventListener(
      "click",
      closeGame
    );

  $("#gameModal")
    ?.addEventListener(
      "click",
      event => {

        if(
          event.target.id ===
          "gameModal"
        ){
          closeGame();
        }
      }
    );

  document
    .querySelectorAll(".nav-item")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          toast(
            `${button.dataset.label} is ready`
          );
        }
      );

    });

  $("#promoClose")
    ?.addEventListener(
      "click",
      () => {
        $(".promo-strip")?.remove();
      }
    );

  $("#power")
    ?.addEventListener(
      "click",
      () => {

        localStorage.removeItem(
          "currentUser"
        );

        toast(
          "Demo session cleared"
        );
      }
    );
}

document.addEventListener(
  "DOMContentLoaded",
  init
);
