// ==UserScript==
// @name         Neopets - Wishing Well Filler
// @version      0.0.1
// @description  Populates the Wishing Well inputs so you don't have to
// @author       birdwalk0
// @namespace    birdwalk0_neo
// @match        *://*.neopets.com/wishing.phtml*
// @grant        none
// ==/UserScript==

/* global $ */

(function() {
    // You can configure the donation amount. Note that anything below 21 NP will be ignored by the Wishing Well.
    const myDonationAmount = 21;
    // Update this list with any wishes you have.
    const myWishes = [
        "Cliffhanger Stamp",
        "Neopets 24th Birthday Goodie Bag",
        "Christmas Scene Stamp",
        "Diadem of the Deep",
    ];

    $('input[name="donation"]').val(myDonationAmount);

    if (!myWishes.length) return; // Stop execution if there are no wishes

    // Declare a function to get a random integer that is >= 0 and < max (or just return 0 if max is 1)
    const getRandomInt = (max) => max === 1 ? 0 : Math.floor(Math.random() * max);

    // Get a random wish from the list above
    const randomWish = myWishes[getRandomInt(myWishes.length)];

    // Set the value of the "wish" input
    $('input[name="wish"]').val(randomWish);
})();
