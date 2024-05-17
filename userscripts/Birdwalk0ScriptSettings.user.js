// ==UserScript==
// @name         Neopets - Birdwalk0 Userscript Settings
// @version      0.0.1
// @description  Set variables for birdwalk0 scripts. Set this script to run first. Do NOT auto-update this. Your settings will be wiped.
// @author       birdwalk0
// @namespace    birdwalk0_neo
// @match        *://*.neopets.com/*
// @grant        none
// ==/UserScript==

localStorage.setItem('birdwalkConfig', JSON.stringify({
    isAutoTripleZeroEnabled: true,
}));