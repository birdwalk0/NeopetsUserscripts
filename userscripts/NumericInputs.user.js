// ==UserScript==
// @name        Neopets - Numeric Inputs
// @description Makes the virtual numeric keyboard show up for various input elements
// @version     0.0.1
// @author      birdwalk0
// @namespace   birdwalk0_neo
// @icon        https://www.neopets.com/favicon.ico
// @match       *://*.neopets.com/haggle.phtml*
// @match       *://*.neopets.com/market.phtml?*type=your*
// @match       *://*.neopets.com/market.phtml?type=till
// @match       *://*.neopets.com/auctions.phtml?type=bids&auction_id=*
// @match       *://*.neopets.com/safetydeposit.phtml*
// @match       *://*.neopets.com/closet.phtml*
// @match       *://*.neopets.com/island/tradingpost.phtml*
// @match       *://*.neopets.com/neohome/shed*
// @grant       none
// ==/UserScript==

/* globals $ */

/* Compatibility:
 * This userscript is designed primarily for the "classic" Neopets pages. The only exception
 * is the haggle page, which has been converted to the more mobile-friendly redesigned page layout.
 * 
 * This userscript should work for Neopets in any language, but testing has only been done for
 * the English version.
 */

/**
 * The following code selects the HTML <input> elements that need to be numeric and modifies them to
 * bring up the numeric virtual keyboard on mobile devices, instead of the QWERTY keyboard.
 */
$([
    `form[action="process_market.phtml"] input[name="current_offer"]`, // haggle page
    `form[action="process_market.phtml"] input[name^="cost_"]`, // shop stock prices
    `form[action="process_market.phtml"] input[name="amount"]`, // shop till
    `form[action="auctions.phtml?type=placebid"] input[name="amount"]`, // auction bid
    `form[action$="process_tradingpost.phtml"] input[name="neopoints"]`, // trading post offer
    `form[action^="process_safetydeposit.phtml"] input[name^="back_to_inv"]`, // safety deposit box removal
    `form[action$="neohome/shed/move_to_inventory"] input`, // shed
    `form[action="process_closet.phtml"] input`, // closet
].join(", ")).each(function () {
    // Change the inputmode so that the browser displays the appropriate virtual keyboard
    // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
    $(this).attr("inputmode", "numeric");
});
