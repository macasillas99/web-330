"use strict";

// Shared mutable state.
// Every async retrieval stores its result in the same variable.
// If multiple async operations overlap, later requests can overwrite
// earlier values before the DOM update finishes.

const chefs = [
  { name: "Chef A", specialty: "Italian cuisine", location: "New York" },
  { name: "Chef B", specialty: "French cuisine", location: "Paris" },
  { name: "Chef C", specialty: "Japanese cuisine", location: "Tokyo" }
];

let currentChef = null;

// This function still returns a Promise, but async/await is now used
// to consume the result instead of Promise.allSettled().

function retrieveChef(index, delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(chefs[index]), delay);
  });
}

// The loop waits for each chef sequentially.
// That avoids Promise.allSettled(), but it also changes timing behavior.
// The chefs no longer load in parallel.
async function displayChefs() {
  const chefData = [
    { index: 0, delay: 600 },
    { index: 1, delay: 900 },
    { index: 2, delay: 1200 }
  ];

  for (let i = 0; i < chefData.length; i++) {
    // The retrieved chef is stored in shared state.
    // If this logic were expanded later with overlapping async work,
    // another retrieval could replace currentChef before the DOM update runs.
    currentChef = await retrieveChef(chefData[i].index, chefData[i].delay);

    const el = document.getElementById(`chef${i + 1}`);

    // The DOM update depends on whatever value currently exists
    // in currentChef instead of directly using a local result variable.
    // That coupling makes the behavior more fragile.

    el.innerHTML = `<h2>${currentChef.name}</h2>
                    <p>Specialty: ${currentChef.specialty}</p>
                    <p>Location: ${currentChef.location}</p>`;
  }
}

displayChefs();

