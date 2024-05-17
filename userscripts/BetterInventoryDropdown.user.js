// ==UserScript==
// @name        Neopets - Better Inventory Dropdown
// @description Organizes options in the inventory item dropdown into groups
// @version     1.0.1
// @author      birdwalk0
// @namespace   birdwalk0_neo
// @icon        https://www.neopets.com/favicon.ico
// @match       *://*.neopets.com/inventory.phtml*
// @require     https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// @grant       none
// ==/UserScript==

/* global $, waitForKeyElements */

(function() {
    const mutatingParentSelector = `#invDesc > .popup-body__2020`;
    const selectElementSelector = `select[name="action"]`;
    const mutationObserverConfig = { subtree: true, childList: true };

    /**
     * Creates an `optgroup` node, moves provided `option` nodes into that group, and appends the group to
     * the given `select` element. Will not create an empty `optgroup`.
     * @param {NodeList} selectNode the select node to which to add the new `optgroup`
     * @param {string} groupLabel the label for the `optgroup`
     * @param {NodeList} optionNodes option nodes to move inside the `optgroup`
     */
    function appendOptGroup(selectNode, groupLabel, optionNodes) {
        if (!optionNodes.length) return; // if are no options, do not continue
        // Find the optgroup if it already exists, or create a new one
        let optgroup = selectNode.find(`optgroup[label="${groupLabel}"]`);
        if (!optgroup.length) {
            // The optgroup does not yet exist, so let's create it and add it to the dropdown
            optgroup = $(`<optgroup label="${groupLabel}"></optgroup>`);
            selectNode.append(optgroup);
        }
        optgroup.append(optionNodes); // Move option nodes inside to the optgroup
    }

    /**
     * Organizes some options contained in the `selectNode` into the following groups:
     *  - "Toss" group containing Donate and Discard options
     *  - "Use" group containing "Feed to ...", "Bless ...", "Use on ...", "Equip ...", or any other options
     *      with values that contain one or more spaces
     * Any inputs that do not fall into the above categories will remain ungrouped at the top of the dropdown.
     * Only direct descendants of the `selectNode` will be evaluated, so if options have already been categorized
     * no updates will be made.
     * @param {NodeList} selectNode The jQuery node of the select element
     */
    function addOptGroups(selectNode) {
        appendOptGroup(selectNode, "Toss", selectNode.children(`option[value="drop"], option[value="donate"]`));
        appendOptGroup(selectNode, "Use", selectNode.children(`option[value*=" "]`));
    }

    // Wait for the parent we want to monitor to appear on the page
    waitForKeyElements(mutatingParentSelector, (mutatingParent) => {
        // Create observer to monitor changes to the mutatingParent (the pop-up element), which is updated via AJAX
        const observer = new MutationObserver(
            /**
             * Callback function triggered when mutations are observed on the `mutatingParent.
             * Pauses the `observer` and adds `optgroup` nodes, if applicable. Resumes the observer
             * after modifications are complete.
             * @param {MutationRecord[]} mutationList a list of mutations that have occurred
             * @param {MutationObserver} observer the observer created by this constructor
             */
            (mutationList, observer) => mutationList.forEach((mutation) => {
                if (!mutation.addedNodes.length) return; // if nodes were not added to the popup body, abort
                const select = $(mutatingParent).find(selectElementSelector);
                if (!select.length) return; // if no select elements are found, abort the function
                observer.disconnect();
                console.debug("Disconnected observer"); // so it doesn't fire as we make changes
                addOptGroups(select);
                console.debug("Added option groups to select dropdown, if applicable.");
                observer.observe(mutatingParent, mutationObserverConfig); // reactivate the observer
                console.debug("Reconnected observer");
            })
        );
        // Update the current select element, if it exists, before activating the observer
        addOptGroups($(mutatingParent).find(selectElementSelector));

        // Activate the observer for the first time
        observer.observe(mutatingParent, mutationObserverConfig);
        console.debug("Activated observer");

    });
})();
