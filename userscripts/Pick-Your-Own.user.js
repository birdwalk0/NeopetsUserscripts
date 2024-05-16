// ==UserScript==
// @name         Neopets - Better Pick-Your-Own Arrows
// @namespace    birdwalk0_neo
// @version      0.0.1
// @description  Make the arrows bigger and easier to tap in Pick-Your-Own
// @author       birdwalk0 on GitHub
// @match        *://*.neopets.com/medieval/pickyourown.phtml
// @grant        GM.addStyle
// ==/UserScript==

/* global $ */

(function() {
    // Define the selectors for elements that need to be modified
    // (Note: attributeX^="valueX" means 'attributeX starts with valueX')
    const pickerTableSelector = 'table[width="400"][height="400"]';
    const arrowLinkSelector = 'a[href^="process_pickyourown.phtml?x_move"]';
    const arrowImageSelector = 'img[src^="//images.neopets.com/medieval/arrow"]';

     Promise.all([ // Run the following functions simultaneously. Order does not matter; speed does!
        GM.addStyle(`
            ${pickerTableSelector} { height: auto !important; width: auto !important; }
            ${arrowLinkSelector} { display: block; }
            ${arrowImageSelector} { padding: 5px; height: 50px; }`
        ), // add CSS styles to override attributes and make the arrows bigger
        (async () => $(pickerTableSelector).attr("cellspacing", "15"))(), // put space between cells in the table
        (async () => $(arrowImageSelector).attr("border", "1"))(), // outline arrow tap targets with a border
    ]);
})()