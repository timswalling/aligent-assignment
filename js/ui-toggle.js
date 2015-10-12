/*jslint browser:true */

(function () {

    'use strict';

    // Fail silently if the browser doesn't support the necessary methods

    if (!document.querySelectorAll) {
        return false;
    }

    var i,
        initToggle,
        toggles = document.querySelectorAll("[data-toggle]");   // All the togglable elements


    // Initialise a toggle

    initToggle = function (target) {

        var stateClass, // The name of the class that indicates the current state of the toggle
            toggleClass,    // Add or remove the state class
            mode = target.getAttribute('data-toggle'),
            targetSelector = target.getAttribute('data-toggle-target');

        stateClass = 'is-' + mode;

        toggleClass = function (targetClass, targetElement) {

            var currentClass = targetElement.className,
                regEx = new RegExp('(?:^|\\s)' + targetClass + '(?!\\S)');

            // Check for a match

            if (regEx.test(currentClass)) {
                targetElement.className = currentClass.replace(regEx, ""); // If the class is found, remove it
            } else {
                targetElement.className += ' ' + targetClass;   // Otherwise add it
            }

        };


        // Add event listeners

        target.onclick = function () {

            var ariaExpanded = this.getAttribute("aria-expanded") === 'true',
                targets = document.querySelectorAll(targetSelector);

            this.setAttribute('aria-expanded', !ariaExpanded);

            toggleClass(stateClass, this);

            for (i = 0; i < targets.length; i += 1) {

                toggleClass(stateClass, targets[i]);

            }

        };

    };


    // Initialise all the toggles

    for (i = 0; i < toggles.length; i += 1) {

        initToggle(toggles[i]);

    }

}());
