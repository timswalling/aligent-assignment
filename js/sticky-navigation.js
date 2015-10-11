(function () {

    if (!document.querySelector) {

        return false;

    }

    var container = document.querySelector('[data-sticky]'),
        sticker,  // The function that will fix (or unfix) the target element
        target = document.querySelector(container.getAttribute('data-sticky-target')), // The element to be fixed
        targetBounds,
        targetFixed = false,   // The current fixedness of the target element
        targetHeight,   // The height of the target element, which will be used to set the height of the container
        targetOffset;   // The offset of the target element, relative to the page

    targetBounds = target.getBoundingClientRect();

    targetHeight = targetBounds.bottom - targetBounds.top;

    // Calculate the offset of the sticky element by getting the height from the
    // top of the window and adding the distance from the top of the document
    // to the top of the window

    targetOffset = targetBounds.top + window.pageYOffset;


    // Sticker function

    sticker = function () {
        var offsetDifference,
            viewportOffset = window.pageYOffset;

        offsetDifference = viewportOffset - targetOffset;

        if (offsetDifference >= 0 && !targetFixed)  {
            targetFixed = true;
            target.className += " is-fixed";
            container.style.height = targetHeight + "px";   // Compensate for the target element being removed from layout flow
        } else if (offsetDifference <= 0 && targetFixed) {
            targetFixed = false;
            target.className = target.className.replace(/(?:^|\s)is-fixed(?!\S)/,"");
            container.style.height = auto;
        }
    };


    // Run the sticker immediately in case the user has scrolled before the script runs

    sticker();


    // Add event listeners

    if (window.addEventListener) {
        window.addEventListener('scroll', sticker, false);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', sticker);
    }

}());
