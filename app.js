let items = {
  attack: {
    modifier: 2,
    name: "Attack",
    description: "Huzzah!",
    duration: 2
  },
  defense: {
    modifier: -2,
    name: "Defend",
    description: "Block",
    duration: 2
  }
}
let itemActive = "attack";
let itemTimeOut = 0;
let enemy = {
  health: 100,
}
let player = {
  health: 100,
  attacks: {
    slap: 1,
    punch: 5,
    kick: 10
  },
  items: [items.attack, items.defense]
}
let playerName = "Bradley";
let hits = 0;
function updateHealth() {
  document.getElementById("health").style = ("width: " + enemy.health + '%');
  document.getElementById("hits").textContent = "Hits:" + hits;
}
function slap() {
  if (itemTimeOut > 0) {
    enemy.health = enemy.health - 1 - addMods(itemActive);
    hits++;
    updateHealth();
    itemTimeOut--;
  }
  else {
    enemy.health = enemy.health - 1;
    hits++;
    updateHealth();
  }
}
function punch() {
  enemy.health = enemy.health - 5 + addMods();
  hits++;
  updateHealth();
}
function kick() {
  enemy.health = enemy.health - 10 + addMods();
  hits++;
  updateHealth();
}
function giveAttack() {
  player.items.push(items.attack)
}
function giveDefense() {
  player.items.push(items.defense)
}
function addMods(type) {
  return items[type].modifier;
  console.log(itemActive + itemTimeOut);
}
function setMods(type) {
  itemActive = type;
  itemTimeOut = items[type].duration;
}