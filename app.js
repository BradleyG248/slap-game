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
  items: {
    attack: {
      quantity: 3
    },
    defense: {
      quantity: 3
    }
  }
}
let playerName = "Bradley";
document.getElementById("player-name").textContent = playerName;
let hits = 0;
function updateHealth() {
  if (enemy.health > 0) {
    document.getElementById("enemy-health").style = ("width: " + enemy.health + '%');
    document.getElementById("player-hits").textContent = "Hits:" + hits;
    document.getElementById("enemy-health-num").textContent = "Health: " + enemy.health;
  }
  else {
    document.getElementById("enemy-health").style = ("width: " + enemy.health + '%');
    document.getElementById("player-hits").textContent = "Hits:" + hits;
    document.getElementById("enemy-health-num").textContent = "K.O!";
  }
}
function slap() {
  if (itemTimeOut > 0) {
    enemy.health = enemy.health - Math.ceil(Math.random() * 2) - addMods(itemActive);
    hits++;
    updateHealth();
  }
  else {
    enemy.health = enemy.health - Math.ceil(Math.random() * 2);
    hits++;
    updateHealth();
  }
}
function punch() {
  if (itemTimeOut > 0) {
    enemy.health = enemy.health - Math.ceil(Math.random() * 3 + 4) - addMods(itemActive);
    hits++;
    updateHealth();
  }
  else {
    enemy.health = enemy.health - Math.ceil(Math.random() * 3 + 4);
    hits++;
    updateHealth();
  }
}
function kick() {
  if (itemTimeOut > 0) {
    enemy.health = enemy.health - Math.ceil(Math.random() * 5 + 10) - addMods(itemActive);
    hits++;
    updateHealth();
  }
  else {
    enemy.health = enemy.health - Math.ceil(Math.random() * 5 + 10);
    hits++;
    updateHealth();
  }
}
function giveAttack() {
  player.items.push(items.attack)
}
function giveDefense() {
  player.items.push(items.defense)
}
function addMods(type) {
  itemTimeOut--;
  updateItemUI(type);
  return items[type].modifier;
}
function setMods(type) {
  if (player.items[type].quantity > 0) {
    player.items[type].quantity--;
    itemActive = type;
    itemTimeOut = items[type].duration;
    updateItemUI(type);
  }
  else {
    updateItemUI("empty");
  }
}
function updateItemUI(type) {
  if (type == "empty") {
    document.getElementById("mods").textContent = "You're out.";
    document.getElementById(type + "-info").textContent = "x" + player.items[type].quantity;
  }

  else {
    document.getElementById("mods").textContent = "Item: " + type + ". Duration: " + itemTimeOut + ".";
    document.getElementById(type + "-info").textContent = "x" + player.items[type].quantity;
  }
}
function reset() {
  enemy.health = 100;
  hits = 0;
  player.items.attack.quantity = 3;
  player.items.defense.quantity = 3;
  document.getElementById("defense-info").textContent = "x" + player.items.defense.quantity;
  document.getElementById("attack-info").textContent = "x" + player.items.attack.quantity;
  updateHealth();
}
