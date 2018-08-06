(function() {

    'use strict';

    var Cedar = {};

    Cedar.query = function(selector) {
        return document.querySelector(selector);
    };

    Cedar.queryAll = function(selector) {
        return document.querySelectorAll(selector);
    };

    /*
	 * Cedar XHR request plain text
	 */
	Cedar.requestPlainText = function ( options ) {

		var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if ( options.success ) {
				options.success( this.responseText );
			}
        };

        xhr.open('GET', options.url, true);
        xhr.send();
	};

	/*
	 * Cedar XHR post form
	 */
	Cedar.post = function ( options ) {

		var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if ( options.success ) {
				options.success( this.responseText );
			}
        };

        xhr.open('POST', options.url, true);
        xhr.send(options.data);

        console.log( options.data );
	};


    /*
     * Cedar event functions
     */
    Cedar.events = {

        on: function(element, event, handler, capture) {
            capture = capture == null ? false : true;
            var events = event.split(/ /),
                pos = events.length;
            while ( pos-- ) {
                element.addEventListener(events[pos], handler, capture);
            }
        },

        off: function(element, event, handler, capture) {
            capture = capture == null ? false : true;
            var events = event.split(/ /),
                pos = events.length;
            while ( pos-- ) {
                element.removeEventListener(events[pos], handler, capture);
            }
        },

        dispatch: function(element, event) {
            if (document.createEvent) {
                // dispatch for firefox + others
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent(event, true, true); // event type,bubbling,cancelable
                return !element.dispatchEvent(evt);
            } else {
                // dispatch for IE
                var evt = document.createEventObject();
                return element.fireEvent('on' + event, evt)
            }
        }
    };


    /*
     * Cedar class manipulation functions
     */
    Cedar.classes = {

        add: function(element, className) {
            if (element) {
                element.classList.add(className);
            }
            return;
        },

        remove: function(element, className) {
            if (element) {
                element.classList.remove(className);
            }
            return;
        },

        toggle: function(element, className) {
            if (element) {
                element.classList.toggle(className);
            }
            return;
        },

        contains: function(element, className) {
            if (element) {
                return element.classList.contains(className) ? true : false;
            }
            return;
        }

    };

    /*
     * Cedar utility functions
     */
    Cedar.utilities = {
    };


    /*
     * Cedar dom functions
     */
	Cedar.dom = {
		insertAfter: function ( newNode, referenceNode ) {
			referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
		},
        closest: function(element, string, isAttribute) {
            if (isAttribute === undefined) {
                isAttribute = false;
            }

            if (element.parentElement) {

                if (!isAttribute && Cedar.classes.contains(element.parentElement, string)) {
                    return element.parentElement;
                } else if (isAttribute && element.parentElement.hasAttribute(string)) {
                    return element.parentElement;
                } else {
                    return Cedar.dom.closest(element.parentElement, string, isAttribute);
                }
            } else {
                return false;
            }
        }
	};

    // Node.js-style export for Node and Component
      if (typeof module != 'undefined') {
        module.exports = Cedar;
      } else if (typeof define === "function" && define.amd) {
        // AMD/requirejs: Define the module
        define(function(){
          return Cedar;
        });
      } else {
        // Browser: Expose to window
        window.Cedar = Cedar;
      }

})();
