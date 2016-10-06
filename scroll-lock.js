;(function() {
	'use strict';
	function scrollLockStart(event) {
		var lastY;

		function scrollLock(event) {
			/*const*/var delta = event.type === 'touchmove'
				? event.touches[0].screenY - lastY
				: event.wheelDelta;

			// If scrolling up and already at the top...
			if (delta > 0 && this.scrollTop < 1 ||
				// ...or if scrolling down and already at bottom
				delta < 0 && this.clientHeight + this.scrollTop >= this.scrollHeight)
			{
				event.preventDefault();
			}

			if (event.type === 'touchmove') {
				lastY = event.touches[0].screenY;
			}
		}

		function removeTouchListeners(event) {
			if (!event.touches.length) {
				this.removeEventListener('touchmove', scrollLock);
				this.removeEventListener('touchend', removeTouchListeners);
			}
		}

		if (['wheel', 'scrollwheel'].indexOf(event.type) != -1) {
			scrollLock.call(this, event);
		} else { // Touch
			lastY = event.touches[0].screenY;
			this.addEventListener('touchmove', scrollLock);
			this.addEventListener('touchend', removeTouchListeners);
		}
	}

	function scrollLock(element) {
		['mousewheel', 'touchstart', 'wheel'].forEach(function(eventType) {
			element.addEventListener(eventType, scrollLockStart);
		});
	}

	//TODO proper module export
	window.scrollLock = scrollLock;
	return scrollLock;
}());
