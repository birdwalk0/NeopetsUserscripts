// ==UserScript==
// @name            Neopets - Numeric Inputs
// @version         0.0.2
// @description     Makes the numeric keyboard show up on mobile.
// @author          birdwalk0
// @namespace       birdwalk0_neo
// @match           *://*.neopets.com/haggle.phtml*
// @match           *://*.neopets.com/market.phtml?*type=your*
// @match           *://*.neopets.com/auctions.phtml?type=bids&auction_id=*
// @match           *://*.neopets.com/safetydeposit.phtml*
// @match           *://*.neopets.com/closet.phtml*
// @grant           GM_getValue
// ==/UserScript==

/* globals jQuery, $ */


(function () {
    // Add selectors that we want to make numeric here:
    const selectorsForInputsThatShouldBeNumeric = [
        `form[action="process_market.phtml"] input[name="current_offer"]`, // the offer input on the haggle page
        `form[action="process_market.phtml"] input[name^="cost_"]`, // shop stock page
        `form[action="auctions.phtml?type=placebid"] input[name="amount"]`, // on the auction page
        `input.remove_safety_deposit[name^="back_to_inv"]`, // safety deposit box removal
        `form[action="process_closet.phtml"] input`,
    ];

    const isAutomaticKEnabled = Boolean(GM_getValue("isAutomaticKEnabled"));

    // Combine the selectors into a single comma-separated string and and fetch matching HTML elements
    $(selectorsForInputsThatShouldBeNumeric.join(", ")).each(
        // For every input matching the above selectors, execute the following function
        function () {
            // Change the inputmode so that the browser may display the appropriate virtual keyboard
            // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
            $(this).attr("inputmode", "numeric");

            // Set the input to automatically select its value text on focus (click/tap). This should
            // make it easier for mobile users to update the value.
            $(this).attr("onfocus", "this.select();");
            
            if (isAutomaticKEnabled) {
                $(this).on("input", function() {
                    // replace any character that is not numeric with 000
                    $(this).val($(this).val().replace("[^0-9]", "000"));
                });
            }
        }
    );
})();
