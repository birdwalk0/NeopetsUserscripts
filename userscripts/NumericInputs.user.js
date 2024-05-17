// ==UserScript==
// @name        Neopets - Numeric Inputs
// @description Makes the numeric keyboard show up on mobile and highlights value on focus
// @version     1.0.0
// @author      birdwalk0
// @namespace   birdwalk0_neo
// @icon        https://www.neopets.com/favicon.ico
// @match       *://*.neopets.com/haggle.phtml*
// @match       *://*.neopets.com/market.phtml?*type=your*
// @match       *://*.neopets.com/auctions.phtml?type=bids&auction_id=*
// @match       *://*.neopets.com/safetydeposit.phtml*
// @match       *://*.neopets.com/closet.phtml*
// @grant       none
// ==/UserScript==

/* globals $ */

// Select the HTML <input> elements that need to be numeric and apply changes
$([
    `form[action="process_market.phtml"] input[name="current_offer"]`, // haggle page
    `form[action="process_market.phtml"] input[name^="cost_"]`, // shop stock page
    `form[action="auctions.phtml?type=placebid"] input[name="amount"]`, // on the auction page
    `input.remove_safety_deposit[name^="back_to_inv"]`, // safety deposit box removal
    `form[action="process_closet.phtml"] input`, // closet
].join(", ")).each(function () {
    // Change the inputmode so that the browser may display the appropriate virtual keyboard
    // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
    $(this).attr("inputmode", "numeric");
    
    // Set the input to automatically select its value text on focus (click/tap). This should
    // make it easier for mobile users to update the value.
    $(this).attr("onfocus", "this.select();");
});
