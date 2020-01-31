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
  hits: 0,
  attack: 7,
  mobility: 50,
  xp: 100
}
let player = {
  health: 100,
  attacks: {
    slap: {
      attack: 1,
      refresh: 1
    },
    punch: {
      attack: 5,
      refresh: 2
    },
    kick: {
      attack: 10,
      refresh: 3
    }
  },
  items: {
    attack: {
      quantity: 3
    },
    defense: {
      quantity: 3
    }
  },
  hits: 0,
  mobility: 50,
  xp: 0
}
let playerTurn = true;
let playerName = "Bradley";
document.getElementById("player-name").textContent = playerName;
let hits = 0;
function playerHitTest() {
  let luck = player.mobility / enemy.mobility * Math.random() * 100;
  if (luck > 25) {
    document.getElementById("player-hit-test").textContent = "Hit!"
    return true;
  }
  else {
    document.getElementById("player-hit-test").textContent = "Miss!"
    return false;
  }
}
function enemyHitTest() {
  let luck = enemy.mobility / player.mobility * Math.random() * 100;
  if (luck > 25) {
    document.getElementById("enemy-hit-test").textContent = "Hit!"
    return true;
  }
  else {
    document.getElementById("enemy-hit-test").textContent = "Miss!"
    return false;
  }
}
function updateHealth() {
  if (enemy.health <= 0) {
    document.getElementById("enemy-health").style = ("width: " + enemy.health + '%');
    document.getElementById("player-hits").textContent = "Hits:" + hits;
    document.getElementById("enemy-health-num").textContent = "K.O!"
    document.getElementById("enemy-hits").textContent = "Hits:" + enemy.hits;
    document.getElementById("player-hits").textContent = "Hits:" + player.hits;
    document.getElementById("player-health-num").textContent = "Health: " + player.health;
  }
  else if (player.health <= 0) {
    document.getElementById("enemy-health").style = ("width: " + enemy.health + '%');
    document.getElementById("player-hits").textContent = "Hits:" + hits;
    document.getElementById("enemy-health-num").textContent = "Health: " + enemy.health;
    document.getElementById("enemy-hits").textContent = "Hits:" + enemy.hits;
    document.getElementById("player-hits").textContent = "Hits:" + player.hits;
    document.getElementById("player-health-num").textContent = "You Lose!";
  }
  else {
    document.getElementById("enemy-health").style = ("width: " + enemy.health + '%');
    document.getElementById("enemy-hits").textContent = "Hits:" + enemy.hits;
    document.getElementById("enemy-health-num").textContent = "Health: " + enemy.health;
    document.getElementById("player-health").style = ("width: " + player.health + '%');
    document.getElementById("player-hits").textContent = "Hits:" + player.hits;
    document.getElementById("player-health-num").textContent = "Health: " + player.health;
  }
}
function enemyAttack() {
  if (enemyHitTest()) {
    player.health -= enemy.attack;
    enemy.hits++;
    updateHealth();
  }
  playerTurn = true;
}
function playerAttack(type) {
  document.getElementById("player").animate({ marginLeft: "10px" }, 100);
  if (playerTurn) {
    if (playerHitTest()) {
      enemy.health = enemy.health - Math.ceil((Math.random() * player.attacks[type].attack / 2) + Math.ceil(player.attacks[type].attack / 2));
      player.hits++;
      updateHealth();
    }
    playerTurn = false;
    setTimeout(enemyAttack, 1000);
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
  player.health = 100;
  player.hits = 0;
  enemy.hits = 0;
  player.items.attack.quantity = 3;
  player.items.defense.quantity = 3;
  document.getElementById("defense-info").textContent = "x" + player.items.defense.quantity;
  document.getElementById("attack-info").textContent = "x" + player.items.attack.quantity;
  updateHealth();
}
