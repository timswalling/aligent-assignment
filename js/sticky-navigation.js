/*jslint browser:true */

(function () {

    'use strict';

    var docElem = document.documentElement,
        placeholder,    // An empty element to counteract lost height of the fixed element
        measurements,   // The height and offset of the target element
        sticker,    // Update the sticky state
        sticky,     // Whether or not supports position: sticky
        stuck,      // Whether or not the element is stuck or not
        target,
        targetSelector = '.sticky';


    // Fail silently if the browser doesn't support the necessary methods

    if (!document.querySelector || !docElem.getBoundingClientRect) {
        return false;
    }


    // Get the target element

    target = document.querySelector(targetSelector);


    // Calculate height and offset.

    measurements = (function () {

        var bounds = target.getBoundingClientRect(),
            height,
            offset;

        // Get the height of the target element

        height = bounds.bottom - bounds.top;

        // Calculate the offset of the sticky element by getting the height from the
        // top of the window and adding the distance from the top of the document
        // to the top of the window
        // Based on https://github.com/jquery/jquery/blob/1.11.3/src/offset.js

        offset = bounds.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0);

        return {
            height: height,
            offset: offset
        };

    }());


    // Create the placeholder element, prevent it from displaying, and add it to
    // the document.

    placeholder = document.createElement('div');
    placeholder.style.display = 'none';
    placeholder.style.height = measurements.height + 'px';
    target.parentNode.insertBefore(placeholder, target);


    // Check the browser capabilities. Use and immediately-invoked function,
    // as the browser's capabilities won't change.

    sticky = (function () {

        // Based on https://github.com/Modernizr/Modernizr/blob/5e3f359bfc9aa511543ece60bd8a6ea8aa7defd3/feature-detects/css/positionsticky.js

        var prefixes = ['-webkit-', '-moz-', '-ms-', '-o-', ''],
            prop = 'position:',
            value = 'sticky',
            el = document.createElement('a'),
            mStyle = el.style;

        mStyle.cssText = prop + prefixes.join(value + ';' + prop).slice(0, -prop.length);

        return mStyle.position.indexOf(value) !== -1;

    }());

    // Set the appropriate class if the browser doesn't support position: sticky

    if (!sticky) {
        docElem.className += " not-sticky";
    }


    // Update the sticky state

    sticker = function () {

        var offsetDifference,
            viewportOffset = (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0);

        offsetDifference = viewportOffset - measurements.offset;

        if (offsetDifference >= 0 && !stuck) {
            stuck = true;
            target.className += " is-fixed";

            if (!sticky) {
                placeholder.style.display = 'block';
            }
        } else if (offsetDifference <= 0 && stuck) {
            stuck = false;
            target.className = target.className.replace(/(?:^|\s)is-fixed(?!\S)/, "");

            if (!sticky) {
                placeholder.style.display = 'none';
            }
        }

    };

    // Update the sticky state immediately in case the user has scrolled before
    // the scripts loaded.

    sticker();


    // Add event listeners

    if (window.addEventListener) {
        window.addEventListener('scroll', sticker, false);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', sticker);
    }

}());
