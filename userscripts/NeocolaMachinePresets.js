// ==UserScript==
// @name        Neopets - Neocola Machine Presets
// @description Automatically selects the best combination of flavor and # of button presses for the Neocola Machine
// @version     0.0.1
// @author      birdwalk0
// @namespace   birdwalk0_neo
// @icon        https://www.neopets.com/favicon.ico
// @match       *://*.neopets.com/moon/neocola2.phtml
// @grant       none
// ==/UserScript==

/* globals $ */

/**
 * Selects the best combination of flavor and number of button presses for the Neocola Machine,
 * per research conducted by Jellyneo. (See https://www.jellyneo.net/?go=neocolamachine)
 * 
 * Compatibility: layout = Neopets Classic, language = any
 */
(function () {
    'use strict';
    // Set flavor to "Dehydrated H2O"
    $(`select[name="neocola_flavor"] > option[value="7"]`).attr("selected", true);
    // Set number of red buttion presses to "3"
    $(`select[name="red_button"] > option[value="3"]`).attr("selected", true);
})();
