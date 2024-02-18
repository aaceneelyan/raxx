/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-redeclare */
/* eslint-disable max-len */
/* NOTE (Henrique): This code overrides some parts of the original lib (version 1.2.4) */

/*
  Garlic.js allows you to automatically persist your forms' text field values locally,
  until the form is submitted. This way, your users don't lose any precious data if they
  accidentally close their tab or browser.

  author: Guillaume Potier - @guillaumepotier
*/

globalThis.CFGarlicValues = {}!(function($) {
    'use strict'
    /*global localStorage */
    /*global document */

    /* STORAGE PUBLIC CLASS DEFINITION
     * =============================== */

    var Storage = function(options) {
        this.defined = 'undefined' !== typeof localStorage
    }

    Storage.prototype = {
        constructor: Storage,

        get: function(key, placeholder) {
            return localStorage.getItem(key) ?
                localStorage.getItem(key) :
                'undefined' !== typeof placeholder ?
                placeholder :
                null
        },

        has: function(key) {
            return localStorage.getItem(key) ? true : false
        },

        set: function(key, value, fn) {
            if ('string' === typeof value) {
                // if value is null, remove storage if exists
                if ('' === value) {
                    this.destroy(key)
                } else {
                    localStorage.setItem(key, value)
                }
            }

            return 'function' === typeof fn ? fn() : true
        },

        destroy: function(key, fn) {
            localStorage.removeItem(key)
            return 'function' === typeof fn ? fn() : true
        },
    }

    window.cfGarlicUtils = {
        buildKey: (name) => {
            return `garlic::${document.domain}*:${name}`
        },
        retrieve: (name) => {
            const storage = new Storage()
            const key = window.cfGarlicUtils.buildKey(name)
            return storage.get(key)
        },
        store: (name, value) => {
            const storage = new Storage()
            const key = window.cfGarlicUtils.buildKey(name)
            return storage.set(key, value)
        },
    }

    /* GARLIC PUBLIC CLASS DEFINITION
     * =============================== */

    var Garlic = function(element, storage, options) {
        this.init('garlic', element, storage, options)
    }

    Garlic.prototype = {
        constructor: Garlic,

        /* init data, bind jQuery on() actions */
        init: function(type, element, storage, options) {
            this.type = type
            this.$element = $(element)
            this.options = this.getOptions(options)
            this.storage = storage
            this.path = this.getPath()
            this.$element.addClass('garlic-auto-save')

            // bind garlic events
            this.$element.on(this.options.events.join('.' + this.type + ' '), false, $.proxy(this.persist, this))

            // retrieve garlic persisted data
            this.retrieve()
        },

        getOptions: function(options) {
            return $.extend({}, $.fn[this.type].defaults, options, this.$element.data())
        },

        /* temporary store data / state in localStorage */
        persist: function() {
            // some binded events are redundant (change & paste for example), persist only once by field val
            if (this.val === this.getVal()) {
                return
            }

            this.val = this.getVal()

            this.storage.set(this.path, this.getVal())

            this.options.onPersist(this.$element, this.getVal())
        },

        getVal: function() {
            return !this.$element.is('input[type=checkbox]') ?
                this.$element.val() :
                this.$element.prop('checked') ?
                'checked' :
                'unchecked'
        },

        /* retrieve localStorage data / state and update elem accordingly */
        retrieve: function() {
            if (this.storage.has(this.path)) {
                var storedValue = this.storage.get(this.path)

                // input[type=checkbox] and input[type=radio] have a special checked / unchecked behavior
                if (this.$element.is('input[type=radio], input[type=checkbox]')) {
                    // for checkboxes and radios
                    if ('checked' === storedValue || this.$element.val() === storedValue) {
                        return this.$element.attr('checked', true)

                        // only needed for checkboxes
                    } else if ('unchecked' === storedValue) {
                        this.$element.attr('checked', false)
                    }

                    return
                }

                // for input[type=text], select and textarea, just set val()
                this.$element.val(storedValue)

                // trigger an input event given the value has been changed
                this.$element.trigger('input')

                // trigger custom user function when data is retrieved
                this.options.onRetrieve(this.$element, storedValue)

                return
            }
        },

        /* delete localStorage persistance only */
        destroy: function() {
            this.storage.destroy(this.path)
        },

        getPath: function(elem) {
            if ('undefined' === typeof elem) {
                elem = this.$element
            }

            // Requires one element.
            if (elem.length != 1) {
                return false
            }

            // set input type as name + name attr if exists
            const node = elem.length ? elem[0] : elem
            const name = node.getAttribute('name')

            return window.cfGarlicUtils.buildKey(name)
        },

        getStorage: function() {
            return this.storage
        },
    }

    /* GARLIC PLUGIN DEFINITION
     * ========================= */

    $.fn.garlic = function(option, fn) {
        const options = $.extend(true, {}, $.fn.garlic.defaults, option, this.data())
        const storage = new Storage()

        // this plugin heavily rely on local Storage. If there is no localStorage or data-storage=false, no need to go further
        if (!storage.defined) {
            return false
        }

        function bind(self) {
            var $this = $(self),
                data = $this.data('garlic'),
                fieldOptions = $.extend({}, options, $this.data())

            // don't bind an elem with data-storage=false
            if ('undefined' !== typeof fieldOptions.storage && !fieldOptions.storage) {
                return
            }

            // don't bind a password type field
            if ('password' === $(self).attr('type')) {
                return
            }

            // if data never binded, bind it right now!
            if (!data) {
                $this.data('garlic', (data = new Garlic(self, storage, fieldOptions)))
            }

            // here is our garlic public function accessor, currently does not support args
            if ('string' === typeof option && 'function' === typeof data[option]) {
                return data[option]()
            }
        }

        const returnValue = bind($(this))

        return 'function' === typeof fn ? fn() : returnValue
    }

    /* GARLIC CONFIGS & OPTIONS
     * ========================= */
    $.fn.garlic.Constructor = Garlic

    $.fn.garlic.defaults = {
        events: ['DOMAttrModified', 'textInput', 'input', 'change', 'click', 'keypress', 'paste', 'focus'], // Events list that trigger a localStorage
        onRetrieve: function($item, storedVal) {}, // This function will be triggered each time Garlic find an retrieve a local stored data for a field
        onPersist: function($item, storedVal) {}, // This function will be triggered each time Garlic stores a field to local storage
    }

    /* GARLIC DATA-API
     * =============== */

    // This plugin works with jQuery or Zepto (with data extension builded for Zepto. See changelog 0.0.6)
})(window.jQuery || window.Zepto)