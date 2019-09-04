var Cedar = function ( selector, context ) {

    if ( ! ( this instanceof Cedar ) ) {
        return new Cedar( selector, context );
    }

    if ( selector instanceof Cedar ) {
        return selector;
    }

    if ( typeof selector === 'string' ) {
        selector = ( context || document ).querySelectorAll( selector );
    }

    if ( selector && selector.nodeName ) {
        selector = [selector];
    }

    this.nodes = this.slice( selector );
}

Cedar.prototype = {
    get length () {
        return this.nodes.length;
    }
};

Cedar.prototype.nodes = [];

Cedar.prototype.each = function ( callback ) {
    // http://stackoverflow.com/q/4065353
    this.nodes.forEach( callback.bind( this ) );

    return this;
};
/*
Cedar.prototype.eacharg = function ( args, callback ) {
    return this.each( function ( node, i ) {

    })
}
*/


    /*
    var Cedar = function () {
        this.context = context;
        this.nodes = context ? context.querySelectorAll( selector ) : document.querySelectorAll( selector );
    };
    */
    Cedar.prototype.classes = function () {
        return this;
    };

    Cedar.prototype.classes.add = function ( className ) {
        for ( var i = 0; i < this.nodes.length; i++ ) {
            this.nodes[i].classList.add( className );
        }
        return this;
    };
    Cedar.prototype.classes.remove = function ( className ) {
        for ( var i = 0; i < this.nodes.length; i++ ) {
            this.nodes[i].classList.remove( className );
        }
        return this;
    };
    Cedar.prototype.classes.toggle = function ( className ) {
        for ( var i = 0; i < this.nodes.length; i++ ) {
            this.nodes[i].classList.toggle( className );
        }
        return this;
    };

    Cedar.prototype.events = function () {
        return this;
    };

    Cedar.prototype.events.on( event, handler, capture ) {
        capture = capture == null ? false : true;
        var events = event.split(/ /);
        for ( i = 0; i < events.length; i++ ) {
            for ( var j = 0; j < this.nodes.length; j++ ) {
                this.nodes[j].addEventListener( events[i], handler, capture );
            }
        }
        return this;
    };

    Cedar.prototype.events.off( event, handler, capture ) {
        capture = capture == null ? false : true;
        var events = event.split(/ /);
        for ( i = 0; i < events.length; i++ ) {
            for ( var j = 0; j < this.nodes.length; j++ ) {
                this.nodes[j].removeEventListener( events[i], handler, capture );
            }
        }
        return this;
    };

    Cedar.prototype.events.dispatch( event ) {
        if ( this.context.createEvent ) {
            // dispatch for firefox + others
            for ( var i = 0; i < this.nodes.length; i++ ) {
                var createdEvent = document.createEvent( 'HTMLEvents' );
                createdEvent.initEvent( event, true, true );
                this.nodes[i].dispatchEvent( createdEvent );
            }
        } else {
            // dispatch for IE
            for ( var i = 0; i < this.nodes.length; i++ ) {
                var createdEvent = document.createEventObject();
                this.nodes[i].fireEvent('on' + event, createdEvent );
            }
        }

        return this;
    };

    Cedar.prototype.dom = function () {
        return this;
    };

    Cedar.prototype.dom.insertAfter = function ( newNode ) {
        for ( var i = 0; i < this.nodes.length; i++ ) {
            this.nodes[i].parentNode.insertBefore( newNode, this.nodes[i].nextSibling );
        }

        return this;

	};

};

var c = function( selector, context ) {
    Cedar( selector, context );
};

/*
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

Cedar.utilities = {
};


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
  */
