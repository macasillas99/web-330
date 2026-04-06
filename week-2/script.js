/*
  Pragmatic JavaScript
  Chapter 1
  Programming Assignment

  Author: Maxine Casillas
  Date: 04/05/2026
  Filename: script.js
*/

"use strict";

function createCharacter(name, gender, characterClass) {
  return {
    getName: function() { return name; },
    getGender: function() { return gender; },
    getClass: function() { return characterClass; }
  };
}

document.getElementById("generateHero").addEventListener("click", function(e) {
  e.preventDefault();

  const name = document.getElementById("heroName").value;
  const gender = document.getElementById("heroGender").value;
  const charClass = document.getElementById("heroClass").value;

  const character = createCharacter(name, gender, charClass);

  const output = document.getElementById("characterOutput");

  let description = "";
  if (charClass === "warrior") description = "A hardened frontline fighter, built for battle.";
  if (charClass === "mage") description = "A wielder of arcane forces and forbidden knowledge.";
  if (charClass === "rogue") description = "A silent blade, striking from the shadows.";

  output.innerHTML = `
    <h3>${character.getName()}</h3>
    <p><strong>Gender:</strong> ${character.getGender()}</p>
    <p><strong>Class:</strong> ${character.getClass()}</p>
    <p>${description}</p>
  `;
});