// ==UserScript==
// @name        Neopets - Better Pick Your Own
// @description Makes the arrows bigger and easier to tap in Pick Your Own
// @version     0.0.1
// @author      birdwalk0
// @namespace   birdwalk0_neo
// @icon        https://www.neopets.com/favicon.ico
// @match       *://*.neopets.com/medieval/pickyourown.phtml
// @grant       GM.addStyle
// ==/UserScript==

/* global $ */

/* Compatibility: layout = Neopets Classic, language = any
 * 
 * This userscript is designed to work with the Classic Neopets layout, because Pick Your Own
 * has not yet been migrated to the new, more modern layout. If/when this change occurs, this
 * userscript likely will need to be updated.
 */

(function() {
    // Define the selectors for elements that need to be modified
    // FYI, attributeX^="valueX" means 'attributeX starts with valueX'
    const pickerTableSelector = 'table[width="400"][height="400"]';
    const arrowLinkSelector = 'a[href^="process_pickyourown.phtml?x_move"]';
    const arrowImageSelector = 'img[src^="//images.neopets.com/medieval/arrow"]';
    // Run the following functions simultaneously. Order does not matter, only speed!
     Promise.all([ 
        GM.addStyle(`
            ${pickerTableSelector} { height: auto !important; width: auto !important; }
            ${arrowLinkSelector} { display: block; }
            ${arrowImageSelector} { padding: 5px; height: 50px; }
        `), // add CSS styles to override attributes and make the arrows bigger
        (async () => $(pickerTableSelector).attr("cellspacing", "15"))(), // put space between cells in the table
        (async () => $(arrowImageSelector).attr("border", "1"))(), // outline arrow tap targets with a border
    ]);
})()