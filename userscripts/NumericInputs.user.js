// ==UserScript==
// @name            Neopets - Numeric Inputs
// @author          birdwalk0 on GitHub
// @version         0.0.1
// @namespace       birdwalk_neo
// @description     Makes the numeric keyboard show up on mobile.
// @match           *://*.neopets.com/haggle.phtml*
// @match           *://*.neopets.com/market.phtml?*type=your*
// @grant           GM_getValue
// ==/UserScript==

/* globals jQuery, $ */


(function () {
    // Add selectors that we want to make numeric here:
    const selectorsForInputsThatShouldBeNumeric = [
        `input[name="current_offer"]`, // the offer input on the haggle page
        `input[name^="cost_"]`, // all inputs starting with 'cost_' on the shop stock page
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
