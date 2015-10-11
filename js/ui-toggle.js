(function () {

    if (!document.querySelector) {

        return false;

    }

    var targets = [],
        toggles;


    toggles = document.querySelectorAll("[data-toggle]");


    for (i = 0; i < toggles.length; i++) {

        (function(i) {

            var stateClass, // The name of the class that indicates the current state of the toggle
                toggleClass,
                mode = toggles[i].getAttribute('data-toggle'),
                targetSelector = toggles[i].getAttribute('data-toggle-target');

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


            toggles[i].onclick = function () {

                var ariaExpanded = this.getAttribute("aria-expanded") === 'true',
                    targets = document.querySelectorAll(targetSelector);

                this.setAttribute('aria-expanded', !ariaExpanded);

                toggleClass(stateClass, this);

                for (i = 0; i < targets.length; i++) {

                    toggleClass(stateClass, targets[i]);

                }

            };

        }(i));

    }

}());
