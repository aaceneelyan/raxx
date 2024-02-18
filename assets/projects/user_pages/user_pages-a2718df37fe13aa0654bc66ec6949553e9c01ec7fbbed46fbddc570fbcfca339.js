(() => {
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __defProps = Object.defineProperties;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getOwnPropSymbols = Object.getOwnPropertySymbols;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __propIsEnum = Object.prototype.propertyIsEnumerable;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
    var __spreadValues = (a, b) => {
        for (var prop in b || (b = {}))
            if (__hasOwnProp.call(b, prop))
                __defNormalProp(a, prop, b[prop]);
        if (__getOwnPropSymbols)
            for (var prop of __getOwnPropSymbols(b)) {
                if (__propIsEnum.call(b, prop))
                    __defNormalProp(a, prop, b[prop]);
            }
        return a;
    };
    var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
    var __objRest = (source, exclude) => {
        var target = {};
        for (var prop in source)
            if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
                target[prop] = source[prop];
        if (source != null && __getOwnPropSymbols)
            for (var prop of __getOwnPropSymbols(source)) {
                if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
                    target[prop] = source[prop];
            }
        return target;
    };
    var __esm = (fn, res) => function __init() {
        return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    };
    var __commonJS = (cb, mod) => function __require() {
        return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
            exports: {}
        }).exports, mod), mod.exports;
    };
    var __export = (target, all) => {
        for (var name in all)
            __defProp(target, name, {
                get: all[name],
                enumerable: true
            });
    };
    var __copyProps = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
            for (let key of __getOwnPropNames(from))
                if (!__hasOwnProp.call(to, key) && key !== except)
                    __defProp(to, key, {
                        get: () => from[key],
                        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                    });
        }
        return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
        // If the importer is in node compatibility mode or this is not an ESM
        // file that has been converted to a CommonJS file using a Babel-
        // compatible transform (i.e. "__esModule" has not been set), then set
        // "default" to the CommonJS "module.exports" for node compatibility.
        isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
            value: mod,
            enumerable: true
        }) : target,
        mod
    ));
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
    var __async = (__this, __arguments, generator) => {
        return new Promise((resolve, reject) => {
            var fulfilled = (value) => {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            };
            var rejected = (value) => {
                try {
                    step(generator.throw(value));
                } catch (e) {
                    reject(e);
                }
            };
            var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
            step((generator = generator.apply(__this, __arguments)).next());
        });
    };

    // <define:process>
    var define_process_default;
    var init_define_process = __esm({
        "<define:process>" () {
            define_process_default = {
                env: {
                    NODE_ENV: "production",
                    RAILS_ENV: "production"
                }
            };
        }
    });

    // projects/user_pages/app/javascript/lander/utils/replace_tag.js
    var require_replace_tag = __commonJS({
        "projects/user_pages/app/javascript/lander/utils/replace_tag.js" () {
            init_define_process();
            (function($4) {
                $4.fn.changeElementType = function(newType) {
                    var attrs = {};
                    $4.each(this[0].attributes, function(idx, attr) {
                        attrs[attr.nodeName] = attr.nodeValue;
                    });
                    this.replaceWith(function() {
                        return $4("<" + newType + "/>", attrs).append($4(this).contents());
                    });
                };
            })(jQuery);
        }
    });

    // projects/user_pages/app/javascript/lander/utils/error_with_cause.ts
    var CFErrorWithCause, getErrorCause, _stackWithCauses, CFstackWithCauses;
    var init_error_with_cause = __esm({
        "projects/user_pages/app/javascript/lander/utils/error_with_cause.ts" () {
            init_define_process();
            CFErrorWithCause = class extends Error {
                constructor(message, {
                    cause = null
                } = {}) {
                    super(message);
                    this.name = CFErrorWithCause.name;
                    if (cause) {
                        this["cause"] = cause;
                    }
                    this.message = message;
                }
            };
            getErrorCause = (err) => {
                if (!err || typeof err !== "object" || !("cause" in err)) {
                    return;
                }
                if (typeof err.cause === "function") {
                    const causeResult = err.cause();
                    return causeResult instanceof Error ? causeResult : void 0;
                } else {
                    return err.cause instanceof Error ? err.cause : void 0;
                }
            };
            _stackWithCauses = (err, seen) => {
                if (!(err instanceof Error))
                    return "";
                const stack = err.stack || "";
                if (seen.has(err)) {
                    return stack + "\ncauses have become circular...";
                }
                const cause = getErrorCause(err);
                if (cause) {
                    seen.add(err);
                    return stack + "\ncaused by: " + _stackWithCauses(cause, seen);
                } else {
                    return stack;
                }
            };
            CFstackWithCauses = (err) => _stackWithCauses(err, /* @__PURE__ */ new Set());
            globalThis.CFErrorWithCause = CFErrorWithCause;
            globalThis.CFstackWithCauses = CFstackWithCauses;
        }
    });

    // projects/user_pages/app/javascript/lander/utils/fetcher.ts
    var fetcher_exports = {};
    __export(fetcher_exports, {
        default: () => Fetcher,
        isResponseError: () => isResponseError
    });

    function isResponseError(response) {
        return typeof response.error == "string";
    }
    var CFFetcherErrorTypes, CFFetcherError, FetcherRequestDefaultOptions, Fetcher;
    var init_fetcher = __esm({
        "projects/user_pages/app/javascript/lander/utils/fetcher.ts" () {
            init_define_process();
            init_error_with_cause();
            CFFetcherErrorTypes = {
                NETWORK_ERROR: "NETWORK_ERROR",
                SERVER_ERROR: "SERVER_ERROR"
            };
            globalThis.CFFetcherErrorTypes = CFFetcherErrorTypes;
            CFFetcherError = class extends CFErrorWithCause {
                constructor(type, options = {}) {
                    super(type, options);
                    this.name = "CFFetcherError";
                    this.type = type;
                }
            };
            globalThis.CFFetcherError = CFFetcherError;
            FetcherRequestDefaultOptions = {
                retries: 1,
                timeoutMS: -1,
                timeoutAfterRetrial: 1e3,
                shouldCaptureServerError: false
            };
            Fetcher = class {
                constructor(options) {
                    this.options = options || {};
                }
                /*
                 * This fetch call is an extension of original fetch which only fires
                 * api with a loading state before and after the call.
                 * Can also debounce greater or less than 500ms if required.
                 * The fetch request returns the JSON promise and is abortable
                 */
                fetch(url, data, requestOptions) {
                    return __async(this, null, function*() {
                        const _a3 = __spreadValues(__spreadValues({}, FetcherRequestDefaultOptions), requestOptions),
                            {
                                callbackData,
                                customEvent
                            } = _a3,
                            enhancedFetchOptions = __objRest(_a3, ["callbackData", "customEvent"]);
                        let response;
                        this.url = url;
                        data = data || {};
                        this.controller = new AbortController();
                        this.signal = this.controller.signal;
                        data.signal = this.signal;
                        this.setLoading(true, callbackData, customEvent);
                        try {
                            response = yield this.enhancedFetch(url, data, enhancedFetchOptions);
                            this.setLoading(false, callbackData, customEvent);
                            if (this.options.debug) {
                                console.log("[Fetch Request Completed]", response);
                            }
                            return response;
                        } catch (error) {
                            if (this.options.debug) {
                                console.log("[Error During Fetch]", error);
                            }
                            this.setLoading(false, error, customEvent);
                            if (!this.manuallyAborted) {
                                throw error;
                            }
                        }
                    });
                }
                enhancedFetch(url, fetchOpts, opts) {
                    return __async(this, null, function*() {
                        const {
                            retries,
                            timeoutMS,
                            timeoutAfterRetrial,
                            shouldCaptureServerError
                        } = opts;
                        let lastErr;
                        for (let i = 0; i < retries; i++) {
                            try {
                                if (i > 0) {
                                    yield new Promise((resolve) => setTimeout(resolve, timeoutAfterRetrial));
                                }
                                if (shouldCaptureServerError) {
                                    return yield this.fetchWithTimeout(url, fetchOpts, timeoutMS).then((response) => {
                                        if (response.status >= 500) {
                                            throw new CFFetcherError(CFFetcherErrorTypes.SERVER_ERROR);
                                        }
                                        return response;
                                    });
                                } else {
                                    return yield this.fetchWithTimeout(url, fetchOpts, timeoutMS);
                                }
                            } catch (err) {
                                if (err instanceof CFFetcherError && err.type == CFFetcherErrorTypes.SERVER_ERROR) {
                                    throw err;
                                }
                                lastErr = err;
                            }
                        }
                        throw new CFFetcherError(CFFetcherErrorTypes.NETWORK_ERROR, lastErr);
                    });
                }
                fetchWithTimeout(url, opts, timeoutDuration = 1e3) {
                    if (timeoutDuration > 0) {
                        setTimeout(() => this.controller.abort(), timeoutDuration);
                    }
                    return fetch(url, opts);
                }
                abort() {
                    if (this.options.debug) {
                        console.log("[Aborting Request]", this.url);
                    }
                    this.manuallyAborted = true;
                    this.controller.abort();
                }
                setLoading(isLoading, details, customName) {
                    let loadingEvent;
                    const startEvent = customName && customName + "Started" || "CFFetchStarted";
                    const endEvent = customName && customName + "Finished" || "CFFetchFinished";
                    if (isLoading && !this.loading) {
                        if (this.options.debug) {
                            console.log("[Loading Started]", startEvent);
                        }
                        this.loading = true;
                        loadingEvent = new CustomEvent(startEvent, {
                            detail: details
                        });
                    } else if (!isLoading && this.loading) {
                        if (this.options.debug) {
                            console.log("[Loading Finished/Aborted]", endEvent);
                        }
                        this.loading = false;
                        loadingEvent = new CustomEvent(endEvent, {
                            detail: details
                        });
                    }
                    if (loadingEvent) {
                        document.dispatchEvent(loadingEvent);
                    }
                }
            };
            globalThis.CFFetcher = globalThis.CFFetcher || Fetcher;
            globalThis.CFFetch = (url, data, requestOptions) => {
                const fetcher = new Fetcher();
                return fetcher.fetch(url, data, requestOptions);
            };
        }
    });

    // projects/shared/javascript/parseurl.js
    var require_parseurl = __commonJS({
        "projects/shared/javascript/parseurl.js" () {
            init_define_process();
            (function($4) {
                var re = /([^&=]+)=?([^&]*)/g;
                var decode = function(str) {
                    return decodeURIComponent(str.replace(/\+/g, " "));
                };
                $4.parseParams = function(query) {
                    function createElement(params2, key2, value2) {
                        key2 = key2 + "";
                        if (key2.indexOf(".") !== -1) {
                            var list = key2.split(".");
                            var new_key = key2.split(/\.(.+)?/)[1];
                            if (!params2[list[0]])
                                params2[list[0]] = {};
                            if (new_key !== "") {
                                createElement(params2[list[0]], new_key, value2);
                            } else
                                console.warn('parseParams :: empty property in key "' + key2 + '"');
                        } else if (key2.indexOf("[") !== -1) {
                            var list = key2.split("[");
                            key2 = list[0];
                            var list = list[1].split("]");
                            var index = list[0];
                            if (index == "") {
                                if (!params2)
                                    params2 = {};
                                if (!params2[key2] || !$4.isArray(params2[key2]))
                                    params2[key2] = [];
                                params2[key2].push(value2);
                            } else {
                                if (!params2)
                                    params2 = {};
                                if (!params2[key2] || !$4.isArray(params2[key2]))
                                    params2[key2] = [];
                                params2[key2][parseInt(index)] = value2;
                            }
                        } else {
                            if (!params2)
                                params2 = {};
                            params2[key2] = value2;
                        }
                    }
                    query = query + "";
                    if (query === "")
                        query = window.location + "";
                    var params = {},
                        e;
                    if (query) {
                        if (query.indexOf("#") !== -1) {
                            query = query.substr(0, query.indexOf("#"));
                        }
                        if (query.indexOf("?") !== -1) {
                            query = query.substr(query.indexOf("?") + 1, query.length);
                        } else
                            return {};
                        if (query == "")
                            return {};
                        while (e = re.exec(query)) {
                            var key = decode(e[1]);
                            var value = decode(e[2]);
                            createElement(params, key, value);
                        }
                    }
                    return params;
                };
            })(jQuery);
        }
    });

    // projects/user_pages/app/javascript/lander/audio_player.ts
    var require_audio_player = __commonJS({
        "projects/user_pages/app/javascript/lander/audio_player.ts" () {
            init_define_process();
            var CFbuildAudioPlayer = function(el) {
                try {
                    el.each(function() {
                        const $this = $(this);
                        const audioURL = $this.attr("data-audio-url") || "https://images.clickfunnels.com/images/SevenNationArmy.mp3";
                        const loop = $this.attr("data-audio-loop") || "no";
                        const playerOptions = {
                            class: "elAudioElement",
                            audioWidth: "100%",
                            audioHeight: "100%",
                            enableAutosize: true,
                            enableProgressTooltip: false,
                            loop: loop === "yes",
                            features: ["playpause", "current", "progress", "duration", "volume"]
                        };
                        const audio = $(this).find("audio");
                        audio.attr("src", audioURL);
                        audio.mediaelementplayer(playerOptions);
                    });
                } catch (err) {
                    console.log(err);
                }
            };
            window.addEventListener("load", function() {
                CFbuildAudioPlayer($(".pageRoot .elAudioWrapper"));
            });
        }
    });

    // projects/user_pages/app/javascript/lander/vendor/garlic.cf.js
    var require_garlic_cf = __commonJS({
        "projects/user_pages/app/javascript/lander/vendor/garlic.cf.js" () {
            init_define_process();
            globalThis.CFGarlicValues = {};
            ! function($4) {
                "use strict";
                var Storage = function(options) {
                    this.defined = "undefined" !== typeof localStorage;
                };
                Storage.prototype = {
                    constructor: Storage,
                    get: function(key, placeholder) {
                        return localStorage.getItem(key) ? localStorage.getItem(key) : "undefined" !== typeof placeholder ? placeholder : null;
                    },
                    has: function(key) {
                        return localStorage.getItem(key) ? true : false;
                    },
                    set: function(key, value, fn) {
                        if ("string" === typeof value) {
                            if ("" === value) {
                                this.destroy(key);
                            } else {
                                localStorage.setItem(key, value);
                            }
                        }
                        return "function" === typeof fn ? fn() : true;
                    },
                    destroy: function(key, fn) {
                        localStorage.removeItem(key);
                        return "function" === typeof fn ? fn() : true;
                    }
                };
                window.cfGarlicUtils = {
                    buildKey: (name) => {
                        return `garlic::${document.domain}*:${name}`;
                    },
                    retrieve: (name) => {
                        const storage = new Storage();
                        const key = window.cfGarlicUtils.buildKey(name);
                        return storage.get(key);
                    },
                    store: (name, value) => {
                        const storage = new Storage();
                        const key = window.cfGarlicUtils.buildKey(name);
                        return storage.set(key, value);
                    }
                };
                var Garlic = function(element, storage, options) {
                    this.init("garlic", element, storage, options);
                };
                Garlic.prototype = {
                    constructor: Garlic,
                    /* init data, bind jQuery on() actions */
                    init: function(type, element, storage, options) {
                        this.type = type;
                        this.$element = $4(element);
                        this.options = this.getOptions(options);
                        this.storage = storage;
                        this.path = this.getPath();
                        this.$element.addClass("garlic-auto-save");
                        this.$element.on(this.options.events.join("." + this.type + " "), false, $4.proxy(this.persist, this));
                        this.retrieve();
                    },
                    getOptions: function(options) {
                        return $4.extend({}, $4.fn[this.type].defaults, options, this.$element.data());
                    },
                    /* temporary store data / state in localStorage */
                    persist: function() {
                        if (this.val === this.getVal()) {
                            return;
                        }
                        this.val = this.getVal();
                        this.storage.set(this.path, this.getVal());
                        this.options.onPersist(this.$element, this.getVal());
                    },
                    getVal: function() {
                        return !this.$element.is("input[type=checkbox]") ? this.$element.val() : this.$element.prop("checked") ? "checked" : "unchecked";
                    },
                    /* retrieve localStorage data / state and update elem accordingly */
                    retrieve: function() {
                        if (this.storage.has(this.path)) {
                            var storedValue = this.storage.get(this.path);
                            if (this.$element.is("input[type=radio], input[type=checkbox]")) {
                                if ("checked" === storedValue || this.$element.val() === storedValue) {
                                    return this.$element.attr("checked", true);
                                } else if ("unchecked" === storedValue) {
                                    this.$element.attr("checked", false);
                                }
                                return;
                            }
                            this.$element.val(storedValue);
                            this.$element.trigger("input");
                            this.options.onRetrieve(this.$element, storedValue);
                            return;
                        }
                    },
                    /* delete localStorage persistance only */
                    destroy: function() {
                        this.storage.destroy(this.path);
                    },
                    getPath: function(elem) {
                        if ("undefined" === typeof elem) {
                            elem = this.$element;
                        }
                        if (elem.length != 1) {
                            return false;
                        }
                        const node = elem.length ? elem[0] : elem;
                        const name = node.getAttribute("name");
                        return window.cfGarlicUtils.buildKey(name);
                    },
                    getStorage: function() {
                        return this.storage;
                    }
                };
                $4.fn.garlic = function(option, fn) {
                    const options = $4.extend(true, {}, $4.fn.garlic.defaults, option, this.data());
                    const storage = new Storage();
                    if (!storage.defined) {
                        return false;
                    }

                    function bind(self) {
                        var $this = $4(self),
                            data = $this.data("garlic"),
                            fieldOptions = $4.extend({}, options, $this.data());
                        if ("undefined" !== typeof fieldOptions.storage && !fieldOptions.storage) {
                            return;
                        }
                        if ("password" === $4(self).attr("type")) {
                            return;
                        }
                        if (!data) {
                            $this.data("garlic", data = new Garlic(self, storage, fieldOptions));
                        }
                        if ("string" === typeof option && "function" === typeof data[option]) {
                            return data[option]();
                        }
                    }
                    const returnValue = bind($4(this));
                    return "function" === typeof fn ? fn() : returnValue;
                };
                $4.fn.garlic.Constructor = Garlic;
                $4.fn.garlic.defaults = {
                    events: ["DOMAttrModified", "textInput", "input", "change", "click", "keypress", "paste", "focus"],
                    // Events list that trigger a localStorage
                    onRetrieve: function($item, storedVal) {},
                    // This function will be triggered each time Garlic find an retrieve a local stored data for a field
                    onPersist: function($item, storedVal) {}
                    // This function will be triggered each time Garlic stores a field to local storage
                };
            }(window.jQuery || window.Zepto);
        }
    });

    // projects/user_pages/app/javascript/lander/populate_select.ts
    var populate_select_exports = {};
    __export(populate_select_exports, {
        populateSelect: () => populateSelect
    });
    var _a, populateSelect;
    var init_populate_select = __esm({
        "projects/user_pages/app/javascript/lander/populate_select.ts" () {
            init_define_process();
            globalThis.ClickFunnels = (_a = globalThis.ClickFunnels) != null ? _a : {};
            populateSelect = (selectElement, type = void 0) => {
                var _a3, _b;
                type = type != null ? type : $(selectElement).parents(".elSelectWrapper").attr("data-type");
                let items;
                const allCountries = globalThis.ClickFunnels.all_countries;
                if (type == "all_united_states") {
                    selectElement.innerHTML = "<option> Select State </option>";
                    items = (_a3 = allCountries.find((c) => c.iso2 == "US")) == null ? void 0 : _a3.regions;
                    items.forEach((item) => selectElement.innerHTML += `<option value="${item.state_code}" > ${item.name} </option>`);
                } else if (type == "all_canadian_provinces") {
                    selectElement.innerHTML = "<option> Select State </option>";
                    items = (_b = allCountries.find((c) => c.iso2 == "CA")) == null ? void 0 : _b.regions;
                    items.forEach((item) => selectElement.innerHTML += `<option value="${item.state_code}" > ${item.name} </option>`);
                } else if (type == "all_countries") {
                    const topMapping = ["US", "CA", "GB", "IE", "AU", "NZ"];
                    const topHash = topMapping.reduce((acc, val) => {
                        acc[val] = true;
                        return acc;
                    }, {});
                    const topOptions = topMapping.map((iso2) => ({
                        iso2
                    }));
                    const remainingOptions = [];
                    allCountries.forEach((item) => {
                        if (topHash[item.iso2]) {
                            const option = topOptions.find((option2) => option2.iso2 == item.iso2);
                            option.name = item.name;
                        } else {
                            remainingOptions.push(item);
                        }
                    });
                    let html = "";
                    topOptions.forEach((item) => html += `<option value="${item.iso2}" > ${item.name} </option>`);
                    remainingOptions.forEach((item) => html += `<option value="${item.iso2}" > ${item.name} </option>`);
                    selectElement.innerHTML = html;
                }
            };
            globalThis.ClickFunnels.populateSelect = populateSelect;
            window.addEventListener("load", function() {
                if (!$(".elCheckout, .elSelect, .elSuperSelect").length)
                    return;
                if ($('[data-page-element="Checkout/V2"]').length)
                    return;
                $.ajax({
                    type: "GET",
                    contentType: "application/json",
                    url: "/cf_countries_states"
                }).then((data) => {
                    globalThis.ClickFunnels.all_countries = data.result;
                    window.dispatchEvent(new CustomEvent("CF2_COUNTRIES_FETCHED"));
                    $(".elSelect, .elSuperSelect").each((index, element) => {
                        populateSelect(element);
                    });
                });
            });
        }
    });

    // projects/user_pages/app/javascript/lander/runtime_events.ts
    var require_runtime_events = __commonJS({
        "projects/user_pages/app/javascript/lander/runtime_events.ts" () {
            init_define_process();
            var CFEvents2 = /* @__PURE__ */ ((CFEvents3) => {
                CFEvents3["FORM_SUBMITTED"] = "cf:form_submitted";
                CFEvents3["FORM_SUBMITTED_OK"] = "cf:form_submitted:ok";
                CFEvents3["FORM_SUBMITTED_FINALIZED"] = "cf:form_submitted:finalized";
                return CFEvents3;
            })(CFEvents2 || {});
            globalThis.CFEvents = CFEvents2;
            globalThis.CFDispatchEvent = function(eventName, detail) {
                const event = new CustomEvent(eventName, {
                    detail
                });
                document.dispatchEvent(event);
            };
        }
    });

    // projects/user_pages/app/javascript/lander/fhl_handle_select_transformation.ts
    var fhl_handle_select_transformation_exports = {};
    var init_fhl_handle_select_transformation = __esm({
        "projects/user_pages/app/javascript/lander/fhl_handle_select_transformation.ts" () {
            init_define_process();
            init_populate_select();
            window.addEventListener("CF2_COUNTRIES_FETCHED", function() {
                const $allCountrySelects = $(".elSelectWrapper[data-type='all_countries'] .elSelect[name='country']");
                const $allStateInputs = $(".elInput[name='state']");
                let $allStates = $(".elSelect[name='state']");
                if ($allCountrySelects.length && $allStates.length && !$allStateInputs.length) {
                    $allCountrySelects.on("change", function() {
                        const $select = $(this);
                        const val = $select.val();
                        $allStates = $(".elSelect[name='state']");
                        if (val != "US") {
                            $allStates.html("");
                            $allStates.val("");
                            $allStates.changeElementType("input");
                            $allStates = $(".elSelect[name='state']");
                            $allStates.attr("placeholder", "Shipping State");
                        } else {
                            $allStates.val("");
                            $allStates.changeElementType("select");
                            $allStates = $(".elSelect[name='state']");
                            $allStates.each((index, element) => populateSelect(element));
                        }
                    });
                    $allCountrySelects.trigger("change");
                }
            });
        }
    });

    // node_modules/uuid/dist/esm-browser/rng.js
    function rng() {
        if (!getRandomValues) {
            getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
            if (!getRandomValues) {
                throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            }
        }
        return getRandomValues(rnds8);
    }
    var getRandomValues, rnds8;
    var init_rng = __esm({
        "node_modules/uuid/dist/esm-browser/rng.js" () {
            init_define_process();
            rnds8 = new Uint8Array(16);
        }
    });

    // node_modules/uuid/dist/esm-browser/regex.js
    var regex_default;
    var init_regex = __esm({
        "node_modules/uuid/dist/esm-browser/regex.js" () {
            init_define_process();
            regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
        }
    });

    // node_modules/uuid/dist/esm-browser/validate.js
    function validate(uuid) {
        return typeof uuid === "string" && regex_default.test(uuid);
    }
    var validate_default;
    var init_validate = __esm({
        "node_modules/uuid/dist/esm-browser/validate.js" () {
            init_define_process();
            init_regex();
            validate_default = validate;
        }
    });

    // node_modules/uuid/dist/esm-browser/stringify.js
    function stringify(arr) {
        var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
        if (!validate_default(uuid)) {
            throw TypeError("Stringified UUID is invalid");
        }
        return uuid;
    }
    var byteToHex, i, stringify_default;
    var init_stringify = __esm({
        "node_modules/uuid/dist/esm-browser/stringify.js" () {
            init_define_process();
            init_validate();
            byteToHex = [];
            for (i = 0; i < 256; ++i) {
                byteToHex.push((i + 256).toString(16).substr(1));
            }
            stringify_default = stringify;
        }
    });

    // node_modules/uuid/dist/esm-browser/v4.js
    function v4(options, buf, offset) {
        options = options || {};
        var rnds = options.random || (options.rng || rng)();
        rnds[6] = rnds[6] & 15 | 64;
        rnds[8] = rnds[8] & 63 | 128;
        if (buf) {
            offset = offset || 0;
            for (var i = 0; i < 16; ++i) {
                buf[offset + i] = rnds[i];
            }
            return buf;
        }
        return stringify_default(rnds);
    }
    var v4_default;
    var init_v4 = __esm({
        "node_modules/uuid/dist/esm-browser/v4.js" () {
            init_define_process();
            init_rng();
            init_stringify();
            v4_default = v4;
        }
    });

    // node_modules/uuid/dist/esm-browser/index.js
    var init_esm_browser = __esm({
        "node_modules/uuid/dist/esm-browser/index.js" () {
            init_define_process();
            init_v4();
        }
    });

    // node_modules/@clickfunnels2/cfhoy.js/dist/cfhoy.esm.js
    function visitsUrl() {
        return config.urlPrefix + config.visitsUrl;
    }

    function eventsUrl() {
        return config.urlPrefix + config.eventsUrl;
    }

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    function canTrackNow() {
        return (config.useBeacon || config.trackNow) && isEmpty(config.headers) && canStringify && typeof window.navigator.sendBeacon !== "undefined" && !config.withCredentials;
    }

    function serialize(object) {
        var data = new FormData();
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                data.append(key, object[key]);
            }
        }
        return data;
    }

    function setCookie(name, value, ttl) {
        Cookies.set(name, value, ttl, config.cookieDomain || config.domain);
    }

    function getCookie(name) {
        return Cookies.get(name);
    }

    function destroyCookie(name) {
        Cookies.set(name, "", -1);
    }

    function getFbclid() {
        var fbclidQueryString = QueryString.get("fbclid");
        if (fbclidQueryString) {
            return fbclidQueryString;
        } else {
            var fbcCookie = getCookie("_fbc");
            if (fbcCookie) {
                var fbclid = fbcCookie.slice(19);
                return fbclid;
            } else {
                return null;
            }
        }
    }

    function getG4ClientId() {
        var g4Cookie = getCookie("_ga");
        if (g4Cookie) {
            var g4ClientId = g4Cookie.slice(6);
            return g4ClientId;
        } else {
            return null;
        }
    }

    function log(message) {
        if (getCookie("cfhoy_debug")) {
            window.console.log(message);
        }
    }

    function setReady() {
        var callback;
        while (callback = queue.shift()) {
            callback();
        }
        isReady = true;
    }

    function matchesSelector(element, selector) {
        var matches = element.matches || element.matchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector;
        if (matches) {
            if (matches.apply(element, [selector])) {
                return element;
            } else if (element.parentElement) {
                return matchesSelector(element.parentElement, selector);
            }
            return null;
        } else {
            log("Unable to match");
            return null;
        }
    }

    function onEvent(eventName, selector, callback) {
        document.addEventListener(eventName, function(e) {
            var matchedElement = matchesSelector(e.target, selector);
            if (matchedElement) {
                callback.call(matchedElement, e);
            }
        });
    }

    function documentReady(callback) {
        if (document.readyState === "interactive" || document.readyState === "complete") {
            setTimeout(callback, 0);
        } else {
            document.addEventListener("DOMContentLoaded", callback);
        }
    }

    function generateId() {
        return v4_default();
    }

    function saveEventQueue() {
        if (config.cookies && canStringify) {
            setCookie("cfhoy_events", JSON.stringify(eventQueue), 1);
        }
    }

    function csrfToken() {
        var meta = document.querySelector("meta[name=csrf-token]");
        return meta && meta.content;
    }

    function csrfParam() {
        var meta = document.querySelector("meta[name=csrf-param]");
        return meta && meta.content;
    }

    function CSRFProtection(xhr) {
        var token = csrfToken();
        if (token) {
            xhr.setRequestHeader("X-CSRF-Token", token);
        }
    }

    function sendRequest(url, data, success) {
        if (canStringify) {
            if ($2 && $2.ajax) {
                $2.ajax({
                    type: "POST",
                    url,
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    beforeSend: CSRFProtection,
                    success,
                    headers: config.headers,
                    xhrFields: {
                        withCredentials: config.withCredentials
                    }
                });
            } else {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.withCredentials = config.withCredentials;
                xhr.setRequestHeader("Content-Type", "application/json");
                for (var header in config.headers) {
                    if (config.headers.hasOwnProperty(header)) {
                        xhr.setRequestHeader(header, config.headers[header]);
                    }
                }
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        success();
                    }
                };
                CSRFProtection(xhr);
                xhr.send(JSON.stringify(data));
            }
        }
    }

    function eventData(event) {
        var data = {
            events: [event]
        };
        if (config.cookies) {
            data.visit_token = event.visit_token;
            data.visitor_token = event.visitor_token;
        }
        delete event.visit_token;
        delete event.visitor_token;
        return data;
    }

    function trackEvent(event) {
        ahoy.ready(function() {
            sendRequest(eventsUrl(), eventData(event), function() {
                for (var i = 0; i < eventQueue.length; i++) {
                    if (eventQueue[i].id == event.id) {
                        eventQueue.splice(i, 1);
                        break;
                    }
                }
                saveEventQueue();
            });
        });
    }

    function trackEventNow(event) {
        ahoy.ready(function() {
            var data = eventData(event);
            var param = csrfParam();
            var token = csrfToken();
            if (param && token) {
                data[param] = token;
            }
            data.events_json = JSON.stringify(data.events);
            delete data.events;
            window.navigator.sendBeacon(eventsUrl(), serialize(data));
        });
    }

    function page() {
        return config.page || window.location.pathname;
    }

    function presence(str) {
        return str && str.length > 0 ? str : null;
    }

    function cleanObject(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] === null) {
                    delete obj[key];
                }
            }
        }
        return obj;
    }

    function eventProperties() {
        return cleanObject({
            tag: this.tagName.toLowerCase(),
            id: presence(this.id),
            "class": presence(this.className),
            page: page(),
            section: getClosestSection(this)
        });
    }

    function getClosestSection(element) {
        for (; element && element !== document; element = element.parentNode) {
            if (element.hasAttribute("data-section")) {
                return element.getAttribute("data-section");
            }
        }
        return null;
    }

    function createVisit() {
        isReady = false;
        visitId = ahoy.getVisitId();
        visitorId = ahoy.getVisitorId();
        track = getCookie("cfhoy_track");
        if (config.cookies === false || config.trackVisits === false) {
            log("Visit tracking disabled");
            setReady();
        } else if (visitId && visitorId && !track) {
            log("Active visit");
            setReady();
        } else {
            if (!visitId) {
                visitId = generateId();
                setCookie("cfhoy_visit", visitId, config.visitDuration);
            }
            if (getCookie("cfhoy_visit")) {
                log("Visit started");
                if (!visitorId) {
                    visitorId = generateId();
                    setCookie("cfhoy_visitor", visitorId, config.visitorDuration);
                }
                var fbclid = getFbclid();
                var fbc = getCookie("_fbc");
                var fbp = getCookie("_fbp");
                var g4_client_id = getG4ClientId();
                var data = {
                    visit_token: visitId,
                    visitor_token: visitorId,
                    time: ( /* @__PURE__ */ new Date()).getTime() / 1e3,
                    platform: config.platform,
                    landing_page: window.location.href,
                    screen_width: window.screen.width,
                    screen_height: window.screen.height,
                    fbclid,
                    fbc,
                    fbp,
                    js: true,
                    g4_client_id
                };
                if (document.referrer.length > 0) {
                    data.referrer = document.referrer;
                }
                for (var key in config.visitParams) {
                    if (config.visitParams.hasOwnProperty(key)) {
                        data[key] = config.visitParams[key];
                    }
                }
                log(data);
                sendRequest(visitsUrl(), data, function() {
                    destroyCookie("cfhoy_track");
                    setReady();
                });
            } else {
                log("Cookies disabled");
                setReady();
            }
        }
    }
    var Cookies, QueryString, config, ahoy, $2, visitId, visitorId, track, isReady, queue, canStringify, eventQueue, i;
    var init_cfhoy_esm = __esm({
        "node_modules/@clickfunnels2/cfhoy.js/dist/cfhoy.esm.js" () {
            init_define_process();
            init_esm_browser();
            Cookies = {
                set: function(name, value, ttl, domain) {
                    var expires = "";
                    var cookieDomain = "";
                    if (ttl) {
                        var date = /* @__PURE__ */ new Date();
                        date.setTime(date.getTime() + ttl * 60 * 1e3);
                        expires = "; expires=" + date.toGMTString();
                    }
                    if (domain) {
                        cookieDomain = "; domain=" + domain;
                    }
                    document.cookie = name + "=" + escape(value) + expires + cookieDomain + "; path=/; samesite=lax";
                },
                get: function(name) {
                    var i, c;
                    var nameEQ = name + "=";
                    var ca = document.cookie.split(";");
                    for (i = 0; i < ca.length; i++) {
                        c = ca[i];
                        while (c.charAt(0) === " ") {
                            c = c.substring(1, c.length);
                        }
                        if (c.indexOf(nameEQ) === 0) {
                            return unescape(c.substring(nameEQ.length, c.length));
                        }
                    }
                    return null;
                }
            };
            QueryString = {
                get: function(name) {
                    var query = window.location.search.substring(1);
                    var vars = query.split("&");
                    for (var i = 0; i < vars.length; i++) {
                        var pair = vars[i].split("=");
                        if (decodeURIComponent(pair[0]) == name) {
                            return decodeURIComponent(pair[1]);
                        }
                    }
                    return null;
                }
            };
            config = {
                urlPrefix: "",
                visitsUrl: "/ahoy/visits",
                eventsUrl: "/ahoy/events",
                page: null,
                platform: "Web",
                useBeacon: true,
                startOnReady: true,
                trackVisits: true,
                cookies: true,
                cookieDomain: null,
                headers: {},
                visitParams: {},
                withCredentials: false,
                visitDuration: 4 * 60,
                // default 4 hours
                visitorDuration: 2 * 365 * 24 * 60
                // default 2 years
            };
            ahoy = window.ahoy || window.Ahoy || {};
            ahoy.configure = function(options) {
                for (var key in options) {
                    if (options.hasOwnProperty(key)) {
                        config[key] = options[key];
                    }
                }
            };
            ahoy.configure(ahoy);
            $2 = window.jQuery || window.Zepto || window.$;
            isReady = false;
            queue = [];
            canStringify = typeof JSON !== "undefined" && typeof JSON.stringify !== "undefined";
            eventQueue = [];
            ahoy.ready = function(callback) {
                if (isReady) {
                    callback();
                } else {
                    queue.push(callback);
                }
            };
            ahoy.getVisitId = ahoy.getVisitToken = function() {
                return getCookie("cfhoy_visit");
            };
            ahoy.getVisitorId = ahoy.getVisitorToken = function() {
                return getCookie("cfhoy_visitor");
            };
            ahoy.reset = function() {
                destroyCookie("cfhoy_visit");
                destroyCookie("cfhoy_visitor");
                destroyCookie("cfhoy_events");
                destroyCookie("cfhoy_track");
                return true;
            };
            ahoy.debug = function(enabled) {
                if (enabled === false) {
                    destroyCookie("cfhoy_debug");
                } else {
                    setCookie("cfhoy_debug", "t", 365 * 24 * 60);
                }
                return true;
            };
            ahoy.track = function(name, properties) {
                var event = {
                    name,
                    properties: properties || {},
                    time: ( /* @__PURE__ */ new Date()).getTime() / 1e3,
                    id: generateId(),
                    source: window.location.href,
                    js: true
                };
                ahoy.ready(function() {
                    if (config.cookies && !ahoy.getVisitId()) {
                        createVisit();
                    }
                    ahoy.ready(function() {
                        log(event);
                        event.visit_token = ahoy.getVisitId();
                        event.visitor_token = ahoy.getVisitorId();
                        var documentEvent = new CustomEvent("cfhoy:tracked", {
                            detail: event
                        });
                        document.dispatchEvent(documentEvent);
                        if (canTrackNow()) {
                            trackEventNow(event);
                        } else {
                            eventQueue.push(event);
                            saveEventQueue();
                            setTimeout(function() {
                                trackEvent(event);
                            }, 1e3);
                        }
                    });
                });
                return true;
            };
            ahoy.trackView = function(additionalProperties) {
                var properties = {
                    url: window.location.href,
                    title: document.title,
                    page: page()
                };
                if (additionalProperties) {
                    for (var propName in additionalProperties) {
                        if (additionalProperties.hasOwnProperty(propName)) {
                            properties[propName] = additionalProperties[propName];
                        }
                    }
                }
                ahoy.track("$view", properties);
            };
            ahoy.trackClicks = function(selector) {
                if (selector === void 0) {
                    throw new Error("Missing selector");
                }
                onEvent("click", selector, function(e) {
                    var properties = eventProperties.call(this, e);
                    properties.text = properties.tag == "input" ? this.value : (this.textContent || this.innerText || this.innerHTML).replace(/[\s\r\n]+/g, " ").trim();
                    properties.href = this.href;
                    ahoy.track("$click", properties);
                });
            };
            ahoy.trackSubmits = function(selector) {
                if (selector === void 0) {
                    throw new Error("Missing selector");
                }
                onEvent("submit", selector, function(e) {
                    var properties = eventProperties.call(this, e);
                    ahoy.track("$submit", properties);
                });
            };
            ahoy.trackChanges = function(selector) {
                log("trackChanges is deprecated and will be removed in 0.5.0");
                if (selector === void 0) {
                    throw new Error("Missing selector");
                }
                onEvent("change", selector, function(e) {
                    var properties = eventProperties.call(this, e);
                    ahoy.track("$change", properties);
                });
            };
            try {
                eventQueue = JSON.parse(getCookie("cfhoy_events") || "[]");
            } catch (e) {}
            for (i = 0; i < eventQueue.length; i++) {
                trackEvent(eventQueue[i]);
            }
            ahoy.start = function() {
                createVisit();
                ahoy.start = function() {};
            };
            documentReady(function() {
                if (config.startOnReady) {
                    ahoy.start();
                }
            });
        }
    });

    // projects/user_pages/app/javascript/lander/track_events.js
    var track_events_exports = {};

    function cfhoyVisitorData() {
        return {
            firstName: Cookies.get("contact_first_name"),
            lastName: Cookies.get("contact_last_name"),
            emailAddress: Cookies.get("contact_email_address"),
            phoneNumber: Cookies.get("contact_phone_number"),
            postalCode: Cookies.get("contact_postal_code"),
            country: Cookies.get("contact_country"),
            uuid: Cookies.get("cfhoy_visitor")
        };
    }

    function getLeadEventID() {
        return Cookies.get("cfhoy_lead_event_id");
    }

    function removeLeadEventID() {
        Cookies.set("cfhoy_lead_event_id", "", -1);
        return true;
    }

    function getPurchaseEventID() {
        return Cookies.get("cfhoy_purchase_event_id");
    }

    function removePurchaseEventID() {
        Cookies.set("cfhoy_purchase_event_id", "", -1);
        return true;
    }

    function isLivePage(queryString) {
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get("preview") !== "true";
    }
    var livePage, trackingDisabled;
    var init_track_events = __esm({
        "projects/user_pages/app/javascript/lander/track_events.js" () {
            init_define_process();
            init_cfhoy_esm();
            init_cfhoy_esm();
            livePage = isLivePage(window.location.search);
            trackingDisabled = window.disableTracking;
            if (!trackingDisabled && livePage) {
                ahoy.configure({
                    urlPrefix: "/_tracking",
                    visitsUrl: "/visits",
                    eventsUrl: "/events",
                    platform: "Web",
                    useBeacon: true,
                    startOnReady: true,
                    trackVisits: true,
                    cookies: true,
                    withCredentials: false,
                    visitDuration: 4 * 60,
                    // 4 hours
                    visitorDuration: 2 * 365 * 24 * 60
                    // 2 years
                });
                document.addEventListener("cfhoy:tracked", function(event) {
                    window.dataLayer = window.dataLayer || [];
                    if (event.detail.name == "$view") {
                        const visitorData = cfhoyVisitorData();
                        dataLayer.push({
                            event: "cfPageView",
                            contactFirstName: visitorData.firstName,
                            contactLastName: visitorData.lastName,
                            contactEmailAddress: visitorData.emailAddress,
                            contactPhoneNumber: visitorData.phoneNumber,
                            contactPostalCode: visitorData.postalCode,
                            contactCountry: visitorData.country,
                            contactExternalID: visitorData.uuid,
                            visitEventID: event.detail.id
                        });
                    }
                });
                document.addEventListener("DOMContentLoaded", function(event) {
                    ahoy.trackClicks("a, button, input[type=submit]");
                    ahoy.trackSubmits("form");
                    ahoy.trackChanges("input, textarea, select");
                    ahoy.trackView({
                        cfhoy_visitor: $.cookie("cfhoy_visitor") || ""
                    });
                    $(document).on("click", '[event-tracking="enable"]', function() {
                        const data = {
                            url: window.location.href,
                            page: window.location.pathname,
                            title: document.title
                        };
                        ahoy.track("click-custom-button", data);
                    });
                });
            }
            document.addEventListener("DOMContentLoaded", function(event) {
                window.dataLayer = window.dataLayer || [];
                const visitorData = cfhoyVisitorData();
                const leadEventID = getLeadEventID();
                const purchaseEventID = getPurchaseEventID();
                if (leadEventID) {
                    dataLayer.push({
                        event: "cfLead",
                        contactFirstName: visitorData.firstName,
                        contactLastName: visitorData.lastName,
                        contactEmailAddress: visitorData.emailAddress,
                        contactPhoneNumber: visitorData.phoneNumber,
                        contactPostalCode: visitorData.postalCode,
                        contactCountry: visitorData.country,
                        contactExternalID: visitorData.uuid,
                        leadEventID
                    });
                    removeLeadEventID();
                }
                if (purchaseEventID) {
                    dataLayer.push({
                        event: "cfPurchase",
                        contactFirstName: visitorData.firstName,
                        contactLastName: visitorData.lastName,
                        contactEmailAddress: visitorData.emailAddress,
                        contactPhoneNumber: visitorData.phoneNumber,
                        contactPostalCode: visitorData.postalCode,
                        contactCountry: visitorData.country,
                        contactExternalID: visitorData.uuid,
                        purchaseEventID
                    });
                    removePurchaseEventID();
                }
            });
        }
    });

    // projects/user_pages/app/javascript/lander/vendor/mailCheck/domains.ts
    var defaultDomains, defaultSecondLevelDomains, defaultTopLevelDomains;
    var init_domains = __esm({
        "projects/user_pages/app/javascript/lander/vendor/mailCheck/domains.ts" () {
            init_define_process();
            defaultDomains = [
                "msn.com",
                "bellsouth.net",
                "telus.net",
                "comcast.net",
                "optusnet.com.au",
                "earthlink.net",
                "qq.com",
                "sky.com",
                "icloud.com",
                "mac.com",
                "sympatico.ca",
                "googlemail.com",
                "att.net",
                "xtra.co.nz",
                "web.de",
                "cox.net",
                "gmail.com",
                "ymail.com",
                "aim.com",
                "rogers.com",
                "verizon.net",
                "rocketmail.com",
                "google.com",
                "optonline.net",
                "sbcglobal.net",
                "aol.com",
                "me.com",
                "btinternet.com",
                "charter.net",
                "shaw.ca"
            ];
            defaultSecondLevelDomains = ["yahoo", "hotmail", "mail", "live", "outlook", "gmx"];
            defaultTopLevelDomains = [
                "com",
                "com.au",
                "com.tw",
                "ca",
                "co.nz",
                "co.uk",
                "de",
                "fr",
                "it",
                "ru",
                "net",
                "org",
                "edu",
                "gov",
                "jp",
                "nl",
                "kr",
                "se",
                "eu",
                "ie",
                "co.il",
                "us",
                "at",
                "be",
                "dk",
                "hk",
                "es",
                "gr",
                "ch",
                "no",
                "cz",
                "in",
                "net",
                "net.au",
                "info",
                "biz",
                "mil",
                "co.jp",
                "sg",
                "hu",
                "uk",
                "io"
            ];
        }
    });

    // projects/user_pages/app/javascript/lander/vendor/mailCheck/main.ts
    var define2, Mailcheck;
    var init_main = __esm({
        "projects/user_pages/app/javascript/lander/vendor/mailCheck/main.ts" () {
            init_define_process();
            init_domains();
            Mailcheck = {
                domainThreshold: 2,
                secondLevelThreshold: 2,
                topLevelThreshold: 2,
                run: function(opts) {
                    opts.domains = opts.domains || defaultDomains;
                    opts.secondLevelDomains = opts.secondLevelDomains || defaultSecondLevelDomains;
                    opts.topLevelDomains = opts.topLevelDomains || defaultTopLevelDomains;
                    opts.distanceFunction = opts.distanceFunction || Mailcheck.sift4Distance;
                    const defaultCallback = function(result2) {
                        return result2;
                    };
                    const suggestedCallback = opts.suggested || defaultCallback;
                    const emptyCallback = opts.empty || defaultCallback;
                    const result = Mailcheck.suggest(
                        Mailcheck.encodeEmail(opts.email),
                        opts.domains,
                        opts.secondLevelDomains,
                        opts.topLevelDomains,
                        opts.distanceFunction
                    );
                    return result ? suggestedCallback(result) : emptyCallback();
                },
                suggest: function(email, domains, secondLevelDomains, topLevelDomains, distanceFunction) {
                    email = email.toLowerCase();
                    const emailParts = this.splitEmail(email);
                    if (secondLevelDomains && topLevelDomains) {
                        if (secondLevelDomains.indexOf(emailParts.secondLevelDomain) !== -1 && topLevelDomains.indexOf(emailParts.topLevelDomain) !== -1) {
                            return false;
                        }
                    }
                    let closestDomain = this.findClosestDomain(emailParts.domain, domains, distanceFunction, this.domainThreshold);
                    if (closestDomain) {
                        if (closestDomain == emailParts.domain) {
                            return false;
                        } else {
                            return {
                                address: emailParts.address,
                                domain: closestDomain,
                                full: emailParts.address + "@" + closestDomain
                            };
                        }
                    }
                    const closestSecondLevelDomain = this.findClosestDomain(
                        emailParts.secondLevelDomain,
                        secondLevelDomains,
                        distanceFunction,
                        this.secondLevelThreshold
                    );
                    const closestTopLevelDomain = this.findClosestDomain(
                        emailParts.topLevelDomain,
                        topLevelDomains,
                        distanceFunction,
                        this.topLevelThreshold
                    );
                    if (emailParts.domain) {
                        closestDomain = emailParts.domain;
                        let rtrn = false;
                        if (closestSecondLevelDomain && closestSecondLevelDomain != emailParts.secondLevelDomain) {
                            closestDomain = closestDomain.replace(emailParts.secondLevelDomain, closestSecondLevelDomain);
                            rtrn = true;
                        }
                        if (closestTopLevelDomain && closestTopLevelDomain != emailParts.topLevelDomain && emailParts.secondLevelDomain !== "") {
                            closestDomain = closestDomain.replace(new RegExp(emailParts.topLevelDomain + "$"), closestTopLevelDomain);
                            rtrn = true;
                        }
                        if (rtrn) {
                            return {
                                address: emailParts.address,
                                domain: closestDomain,
                                full: emailParts.address + "@" + closestDomain
                            };
                        }
                    }
                    return false;
                },
                findClosestDomain: function(domain, domains, distanceFunction, threshold) {
                    threshold = threshold || this.topLevelThreshold;
                    let dist;
                    let minDist = Infinity;
                    let closestDomain = null;
                    if (!domain || !domains) {
                        return false;
                    }
                    if (!distanceFunction) {
                        distanceFunction = this.sift4Distance;
                    }
                    for (let i = 0; i < domains.length; i++) {
                        if (domain === domains[i]) {
                            return domain;
                        }
                        dist = distanceFunction(domain, domains[i]);
                        if (dist < minDist) {
                            minDist = dist;
                            closestDomain = domains[i];
                        }
                    }
                    if (minDist <= threshold && closestDomain !== null) {
                        return closestDomain;
                    } else {
                        return false;
                    }
                },
                sift4Distance: function(s1, s2, maxOffset) {
                    if (maxOffset === void 0) {
                        maxOffset = 5;
                    }
                    if (!s1 || !s1.length) {
                        if (!s2) {
                            return 0;
                        }
                        return s2.length;
                    }
                    if (!s2 || !s2.length) {
                        return s1.length;
                    }
                    const l1 = s1.length;
                    const l2 = s2.length;
                    let c1 = 0;
                    let c2 = 0;
                    let lcss = 0;
                    let local_cs = 0;
                    let trans = 0;
                    const offset_arr = [];
                    while (c1 < l1 && c2 < l2) {
                        if (s1.charAt(c1) == s2.charAt(c2)) {
                            local_cs++;
                            let isTrans = false;
                            let i = 0;
                            while (i < offset_arr.length) {
                                const ofs = offset_arr[i];
                                if (c1 <= ofs.c1 || c2 <= ofs.c2) {
                                    isTrans = Math.abs(c2 - c1) >= Math.abs(ofs.c2 - ofs.c1);
                                    if (isTrans) {
                                        trans++;
                                    } else {
                                        if (!ofs.trans) {
                                            ofs.trans = true;
                                            trans++;
                                        }
                                    }
                                    break;
                                } else {
                                    if (c1 > ofs.c2 && c2 > ofs.c1) {
                                        offset_arr.splice(i, 1);
                                    } else {
                                        i++;
                                    }
                                }
                            }
                            offset_arr.push({
                                c1,
                                c2,
                                trans: isTrans
                            });
                        } else {
                            lcss += local_cs;
                            local_cs = 0;
                            if (c1 != c2) {
                                c1 = c2 = Math.min(c1, c2);
                            }
                            for (let j = 0; j < maxOffset && (c1 + j < l1 || c2 + j < l2); j++) {
                                if (c1 + j < l1 && s1.charAt(c1 + j) == s2.charAt(c2)) {
                                    c1 += j - 1;
                                    c2--;
                                    break;
                                }
                                if (c2 + j < l2 && s1.charAt(c1) == s2.charAt(c2 + j)) {
                                    c1--;
                                    c2 += j - 1;
                                    break;
                                }
                            }
                        }
                        c1++;
                        c2++;
                        if (c1 >= l1 || c2 >= l2) {
                            lcss += local_cs;
                            local_cs = 0;
                            c1 = c2 = Math.min(c1, c2);
                        }
                    }
                    lcss += local_cs;
                    return Math.round(Math.max(l1, l2) - lcss + trans);
                },
                splitEmail: function(email) {
                    email = email !== null ? email.replace(/^\s*/, "").replace(/\s*$/, "") : null;
                    const parts = email.split("@");
                    if (parts.length < 2) {
                        return false;
                    }
                    for (let i = 0; i < parts.length; i++) {
                        if (parts[i] === "") {
                            return false;
                        }
                    }
                    const domain = parts.pop();
                    const domainParts = domain.split(".");
                    let sld = "";
                    let tld = "";
                    if (domainParts.length === 0) {
                        return false;
                    } else if (domainParts.length == 1) {
                        tld = domainParts[0];
                    } else {
                        sld = domainParts[0];
                        for (let j = 1; j < domainParts.length; j++) {
                            tld += domainParts[j] + ".";
                        }
                        tld = tld.substring(0, tld.length - 1);
                    }
                    return {
                        topLevelDomain: tld,
                        secondLevelDomain: sld,
                        domain,
                        address: parts.join("@")
                    };
                },
                // Encode the email address to prevent XSS but leave in valid
                // characters, following this official spec:
                // http://en.wikipedia.org/wiki/Email_address#Syntax
                encodeEmail: function(email) {
                    let result = encodeURI(email);
                    result = result.replace("%20", " ").replace("%25", "%").replace("%5E", "^").replace("%60", "`").replace("%7B", "{").replace("%7C", "|").replace("%7D", "}");
                    return result;
                }
            };
            if (typeof module !== "undefined" && module.exports) {
                module.exports = Mailcheck;
            }
            if (typeof define2 === "function" && define2.amd) {
                define2("mailcheck", [], function() {
                    return Mailcheck;
                });
            }
            if (typeof window !== "undefined" && window.jQuery) {;
                (function($4) {
                    $4.fn.mailcheck = function(opts) {
                        const self = this;
                        if (opts.suggested) {
                            const oldSuggested = opts.suggested;
                            opts.suggested = function(result) {
                                oldSuggested(self, result);
                            };
                        }
                        if (opts.empty) {
                            const oldEmpty = opts.empty;
                            opts.empty = function() {
                                oldEmpty.call(null, self);
                            };
                        }
                        opts.email = this.val();
                        Mailcheck.run(opts);
                    };
                })(jQuery);
            }
        }
    });

    // node_modules/jquery/dist/jquery.js
    var require_jquery = __commonJS({
        "node_modules/jquery/dist/jquery.js" (exports, module2) {
            init_define_process();
            (function(global, factory) {
                "use strict";
                if (typeof module2 === "object" && typeof module2.exports === "object") {
                    module2.exports = global.document ? factory(global, true) : function(w) {
                        if (!w.document) {
                            throw new Error("jQuery requires a window with a document");
                        }
                        return factory(w);
                    };
                } else {
                    factory(global);
                }
            })(typeof window !== "undefined" ? window : exports, function(window2, noGlobal) {
                "use strict";
                var arr = [];
                var getProto = Object.getPrototypeOf;
                var slice = arr.slice;
                var flat = arr.flat ? function(array) {
                    return arr.flat.call(array);
                } : function(array) {
                    return arr.concat.apply([], array);
                };
                var push = arr.push;
                var indexOf = arr.indexOf;
                var class2type = {};
                var toString = class2type.toString;
                var hasOwn = class2type.hasOwnProperty;
                var fnToString = hasOwn.toString;
                var ObjectFunctionString = fnToString.call(Object);
                var support = {};
                var isFunction = function isFunction2(obj) {
                    return typeof obj === "function" && typeof obj.nodeType !== "number";
                };
                var isWindow = function isWindow2(obj) {
                    return obj != null && obj === obj.window;
                };
                var document2 = window2.document;
                var preservedScriptAttributes = {
                    type: true,
                    src: true,
                    nonce: true,
                    noModule: true
                };

                function DOMEval(code, node, doc) {
                    doc = doc || document2;
                    var i, val, script = doc.createElement("script");
                    script.text = code;
                    if (node) {
                        for (i in preservedScriptAttributes) {
                            val = node[i] || node.getAttribute && node.getAttribute(i);
                            if (val) {
                                script.setAttribute(i, val);
                            }
                        }
                    }
                    doc.head.appendChild(script).parentNode.removeChild(script);
                }

                function toType(obj) {
                    if (obj == null) {
                        return obj + "";
                    }
                    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
                }
                var version = "3.5.1",
                    jQuery2 = function(selector, context) {
                        return new jQuery2.fn.init(selector, context);
                    };
                jQuery2.fn = jQuery2.prototype = {
                    // The current version of jQuery being used
                    jquery: version,
                    constructor: jQuery2,
                    // The default length of a jQuery object is 0
                    length: 0,
                    toArray: function() {
                        return slice.call(this);
                    },
                    // Get the Nth element in the matched element set OR
                    // Get the whole matched element set as a clean array
                    get: function(num) {
                        if (num == null) {
                            return slice.call(this);
                        }
                        return num < 0 ? this[num + this.length] : this[num];
                    },
                    // Take an array of elements and push it onto the stack
                    // (returning the new matched element set)
                    pushStack: function(elems) {
                        var ret = jQuery2.merge(this.constructor(), elems);
                        ret.prevObject = this;
                        return ret;
                    },
                    // Execute a callback for every element in the matched set.
                    each: function(callback) {
                        return jQuery2.each(this, callback);
                    },
                    map: function(callback) {
                        return this.pushStack(jQuery2.map(this, function(elem, i) {
                            return callback.call(elem, i, elem);
                        }));
                    },
                    slice: function() {
                        return this.pushStack(slice.apply(this, arguments));
                    },
                    first: function() {
                        return this.eq(0);
                    },
                    last: function() {
                        return this.eq(-1);
                    },
                    even: function() {
                        return this.pushStack(jQuery2.grep(this, function(_elem, i) {
                            return (i + 1) % 2;
                        }));
                    },
                    odd: function() {
                        return this.pushStack(jQuery2.grep(this, function(_elem, i) {
                            return i % 2;
                        }));
                    },
                    eq: function(i) {
                        var len = this.length,
                            j = +i + (i < 0 ? len : 0);
                        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
                    },
                    end: function() {
                        return this.prevObject || this.constructor();
                    },
                    // For internal use only.
                    // Behaves like an Array's method, not like a jQuery method.
                    push,
                    sort: arr.sort,
                    splice: arr.splice
                };
                jQuery2.extend = jQuery2.fn.extend = function() {
                    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
                        i = 1,
                        length = arguments.length,
                        deep = false;
                    if (typeof target === "boolean") {
                        deep = target;
                        target = arguments[i] || {};
                        i++;
                    }
                    if (typeof target !== "object" && !isFunction(target)) {
                        target = {};
                    }
                    if (i === length) {
                        target = this;
                        i--;
                    }
                    for (; i < length; i++) {
                        if ((options = arguments[i]) != null) {
                            for (name in options) {
                                copy = options[name];
                                if (name === "__proto__" || target === copy) {
                                    continue;
                                }
                                if (deep && copy && (jQuery2.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                                    src = target[name];
                                    if (copyIsArray && !Array.isArray(src)) {
                                        clone = [];
                                    } else if (!copyIsArray && !jQuery2.isPlainObject(src)) {
                                        clone = {};
                                    } else {
                                        clone = src;
                                    }
                                    copyIsArray = false;
                                    target[name] = jQuery2.extend(deep, clone, copy);
                                } else if (copy !== void 0) {
                                    target[name] = copy;
                                }
                            }
                        }
                    }
                    return target;
                };
                jQuery2.extend({
                    // Unique for each copy of jQuery on the page
                    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
                    // Assume jQuery is ready without the ready module
                    isReady: true,
                    error: function(msg) {
                        throw new Error(msg);
                    },
                    noop: function() {},
                    isPlainObject: function(obj) {
                        var proto, Ctor;
                        if (!obj || toString.call(obj) !== "[object Object]") {
                            return false;
                        }
                        proto = getProto(obj);
                        if (!proto) {
                            return true;
                        }
                        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
                        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
                    },
                    isEmptyObject: function(obj) {
                        var name;
                        for (name in obj) {
                            return false;
                        }
                        return true;
                    },
                    // Evaluates a script in a provided context; falls back to the global one
                    // if not specified.
                    globalEval: function(code, options, doc) {
                        DOMEval(code, {
                            nonce: options && options.nonce
                        }, doc);
                    },
                    each: function(obj, callback) {
                        var length, i = 0;
                        if (isArrayLike(obj)) {
                            length = obj.length;
                            for (; i < length; i++) {
                                if (callback.call(obj[i], i, obj[i]) === false) {
                                    break;
                                }
                            }
                        } else {
                            for (i in obj) {
                                if (callback.call(obj[i], i, obj[i]) === false) {
                                    break;
                                }
                            }
                        }
                        return obj;
                    },
                    // results is for internal usage only
                    makeArray: function(arr2, results) {
                        var ret = results || [];
                        if (arr2 != null) {
                            if (isArrayLike(Object(arr2))) {
                                jQuery2.merge(
                                    ret,
                                    typeof arr2 === "string" ? [arr2] : arr2
                                );
                            } else {
                                push.call(ret, arr2);
                            }
                        }
                        return ret;
                    },
                    inArray: function(elem, arr2, i) {
                        return arr2 == null ? -1 : indexOf.call(arr2, elem, i);
                    },
                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // push.apply(_, arraylike) throws on ancient WebKit
                    merge: function(first, second) {
                        var len = +second.length,
                            j = 0,
                            i = first.length;
                        for (; j < len; j++) {
                            first[i++] = second[j];
                        }
                        first.length = i;
                        return first;
                    },
                    grep: function(elems, callback, invert) {
                        var callbackInverse, matches = [],
                            i = 0,
                            length = elems.length,
                            callbackExpect = !invert;
                        for (; i < length; i++) {
                            callbackInverse = !callback(elems[i], i);
                            if (callbackInverse !== callbackExpect) {
                                matches.push(elems[i]);
                            }
                        }
                        return matches;
                    },
                    // arg is for internal usage only
                    map: function(elems, callback, arg) {
                        var length, value, i = 0,
                            ret = [];
                        if (isArrayLike(elems)) {
                            length = elems.length;
                            for (; i < length; i++) {
                                value = callback(elems[i], i, arg);
                                if (value != null) {
                                    ret.push(value);
                                }
                            }
                        } else {
                            for (i in elems) {
                                value = callback(elems[i], i, arg);
                                if (value != null) {
                                    ret.push(value);
                                }
                            }
                        }
                        return flat(ret);
                    },
                    // A global GUID counter for objects
                    guid: 1,
                    // jQuery.support is not used in Core but other projects attach their
                    // properties to it so it needs to exist.
                    support
                });
                if (typeof Symbol === "function") {
                    jQuery2.fn[Symbol.iterator] = arr[Symbol.iterator];
                }
                jQuery2.each(
                    "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
                    function(_i, name) {
                        class2type["[object " + name + "]"] = name.toLowerCase();
                    }
                );

                function isArrayLike(obj) {
                    var length = !!obj && "length" in obj && obj.length,
                        type = toType(obj);
                    if (isFunction(obj) || isWindow(obj)) {
                        return false;
                    }
                    return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
                }
                var Sizzle = (
                    /*!
                     * Sizzle CSS Selector Engine v2.3.5
                     * https://sizzlejs.com/
                     *
                     * Copyright JS Foundation and other contributors
                     * Released under the MIT license
                     * https://js.foundation/
                     *
                     * Date: 2020-03-14
                     */
                    function(window3) {
                        var i, support2, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document3, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * /* @__PURE__ */ new Date(),
                            preferredDoc = window3.document,
                            dirruns = 0,
                            done = 0,
                            classCache = createCache(),
                            tokenCache = createCache(),
                            compilerCache = createCache(),
                            nonnativeSelectorCache = createCache(),
                            sortOrder = function(a, b) {
                                if (a === b) {
                                    hasDuplicate = true;
                                }
                                return 0;
                            },
                            hasOwn2 = {}.hasOwnProperty,
                            arr2 = [],
                            pop = arr2.pop,
                            pushNative = arr2.push,
                            push2 = arr2.push,
                            slice2 = arr2.slice,
                            indexOf2 = function(list, elem) {
                                var i2 = 0,
                                    len = list.length;
                                for (; i2 < len; i2++) {
                                    if (list[i2] === elem) {
                                        return i2;
                                    }
                                }
                                return -1;
                            },
                            booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                            whitespace = "[\\x20\\t\\r\\n\\f]",
                            identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
                            attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + // Operator (capture 2)
                            "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5]
                            // or strings [capture 3 or capture 4]"
                            `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + identifier + "))|)" + whitespace + "*\\]",
                            pseudos = ":(" + identifier + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + attributes + ")*)|.*)\\)|)",
                            rwhitespace = new RegExp(whitespace + "+", "g"),
                            rtrim2 = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
                            rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                            rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
                            rdescend = new RegExp(whitespace + "|>"),
                            rpseudo = new RegExp(pseudos),
                            ridentifier = new RegExp("^" + identifier + "$"),
                            matchExpr = {
                                "ID": new RegExp("^#(" + identifier + ")"),
                                "CLASS": new RegExp("^\\.(" + identifier + ")"),
                                "TAG": new RegExp("^(" + identifier + "|[*])"),
                                "ATTR": new RegExp("^" + attributes),
                                "PSEUDO": new RegExp("^" + pseudos),
                                "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                                "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                                // For use in libraries implementing .is()
                                // We use this for POS matching in `select`
                                "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                            },
                            rhtml2 = /HTML$/i,
                            rinputs = /^(?:input|select|textarea|button)$/i,
                            rheader = /^h\d$/i,
                            rnative = /^[^{]+\{\s*\[native \w/,
                            rquickExpr2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                            rsibling = /[+~]/,
                            runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"),
                            funescape = function(escape2, nonHex) {
                                var high = "0x" + escape2.slice(1) - 65536;
                                return nonHex ? (
                                    // Strip the backslash prefix from a non-hex escape sequence
                                    nonHex
                                ) : (
                                    // Replace a hexadecimal escape sequence with the encoded Unicode code point
                                    // Support: IE <=11+
                                    // For values outside the Basic Multilingual Plane (BMP), manually construct a
                                    // surrogate pair
                                    high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
                                );
                            },
                            rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                            fcssescape = function(ch, asCodePoint) {
                                if (asCodePoint) {
                                    if (ch === "\0") {
                                        return "\uFFFD";
                                    }
                                    return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
                                }
                                return "\\" + ch;
                            },
                            unloadHandler = function() {
                                setDocument();
                            },
                            inDisabledFieldset = addCombinator(
                                function(elem) {
                                    return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
                                }, {
                                    dir: "parentNode",
                                    next: "legend"
                                }
                            );
                        try {
                            push2.apply(
                                arr2 = slice2.call(preferredDoc.childNodes),
                                preferredDoc.childNodes
                            );
                            arr2[preferredDoc.childNodes.length].nodeType;
                        } catch (e) {
                            push2 = {
                                apply: arr2.length ? (
                                    // Leverage slice if possible
                                    function(target, els) {
                                        pushNative.apply(target, slice2.call(els));
                                    }
                                ) : (
                                    // Support: IE<9
                                    // Otherwise append directly
                                    function(target, els) {
                                        var j = target.length,
                                            i2 = 0;
                                        while (target[j++] = els[i2++]) {}
                                        target.length = j - 1;
                                    }
                                )
                            };
                        }

                        function Sizzle2(selector, context, results, seed) {
                            var m, i2, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument,
                                nodeType = context ? context.nodeType : 9;
                            results = results || [];
                            if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                                return results;
                            }
                            if (!seed) {
                                setDocument(context);
                                context = context || document3;
                                if (documentIsHTML) {
                                    if (nodeType !== 11 && (match = rquickExpr2.exec(selector))) {
                                        if (m = match[1]) {
                                            if (nodeType === 9) {
                                                if (elem = context.getElementById(m)) {
                                                    if (elem.id === m) {
                                                        results.push(elem);
                                                        return results;
                                                    }
                                                } else {
                                                    return results;
                                                }
                                            } else {
                                                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                                    results.push(elem);
                                                    return results;
                                                }
                                            }
                                        } else if (match[2]) {
                                            push2.apply(results, context.getElementsByTagName(selector));
                                            return results;
                                        } else if ((m = match[3]) && support2.getElementsByClassName && context.getElementsByClassName) {
                                            push2.apply(results, context.getElementsByClassName(m));
                                            return results;
                                        }
                                    }
                                    if (support2.qsa && !nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && // Support: IE 8 only
                                        // Exclude object elements
                                        (nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {
                                        newSelector = selector;
                                        newContext = context;
                                        if (nodeType === 1 && (rdescend.test(selector) || rcombinators.test(selector))) {
                                            newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                                            if (newContext !== context || !support2.scope) {
                                                if (nid = context.getAttribute("id")) {
                                                    nid = nid.replace(rcssescape, fcssescape);
                                                } else {
                                                    context.setAttribute("id", nid = expando);
                                                }
                                            }
                                            groups = tokenize(selector);
                                            i2 = groups.length;
                                            while (i2--) {
                                                groups[i2] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i2]);
                                            }
                                            newSelector = groups.join(",");
                                        }
                                        try {
                                            push2.apply(
                                                results,
                                                newContext.querySelectorAll(newSelector)
                                            );
                                            return results;
                                        } catch (qsaError) {
                                            nonnativeSelectorCache(selector, true);
                                        } finally {
                                            if (nid === expando) {
                                                context.removeAttribute("id");
                                            }
                                        }
                                    }
                                }
                            }
                            return select(selector.replace(rtrim2, "$1"), context, results, seed);
                        }

                        function createCache() {
                            var keys = [];

                            function cache(key, value) {
                                if (keys.push(key + " ") > Expr.cacheLength) {
                                    delete cache[keys.shift()];
                                }
                                return cache[key + " "] = value;
                            }
                            return cache;
                        }

                        function markFunction(fn) {
                            fn[expando] = true;
                            return fn;
                        }

                        function assert(fn) {
                            var el = document3.createElement("fieldset");
                            try {
                                return !!fn(el);
                            } catch (e) {
                                return false;
                            } finally {
                                if (el.parentNode) {
                                    el.parentNode.removeChild(el);
                                }
                                el = null;
                            }
                        }

                        function addHandle(attrs, handler) {
                            var arr3 = attrs.split("|"),
                                i2 = arr3.length;
                            while (i2--) {
                                Expr.attrHandle[arr3[i2]] = handler;
                            }
                        }

                        function siblingCheck(a, b) {
                            var cur = b && a,
                                diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;
                            if (diff) {
                                return diff;
                            }
                            if (cur) {
                                while (cur = cur.nextSibling) {
                                    if (cur === b) {
                                        return -1;
                                    }
                                }
                            }
                            return a ? 1 : -1;
                        }

                        function createInputPseudo(type) {
                            return function(elem) {
                                var name = elem.nodeName.toLowerCase();
                                return name === "input" && elem.type === type;
                            };
                        }

                        function createButtonPseudo(type) {
                            return function(elem) {
                                var name = elem.nodeName.toLowerCase();
                                return (name === "input" || name === "button") && elem.type === type;
                            };
                        }

                        function createDisabledPseudo(disabled) {
                            return function(elem) {
                                if ("form" in elem) {
                                    if (elem.parentNode && elem.disabled === false) {
                                        if ("label" in elem) {
                                            if ("label" in elem.parentNode) {
                                                return elem.parentNode.disabled === disabled;
                                            } else {
                                                return elem.disabled === disabled;
                                            }
                                        }
                                        return elem.isDisabled === disabled || // Where there is no isDisabled, check manually
                                            /* jshint -W018 */
                                            elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
                                    }
                                    return elem.disabled === disabled;
                                } else if ("label" in elem) {
                                    return elem.disabled === disabled;
                                }
                                return false;
                            };
                        }

                        function createPositionalPseudo(fn) {
                            return markFunction(function(argument) {
                                argument = +argument;
                                return markFunction(function(seed, matches2) {
                                    var j, matchIndexes = fn([], seed.length, argument),
                                        i2 = matchIndexes.length;
                                    while (i2--) {
                                        if (seed[j = matchIndexes[i2]]) {
                                            seed[j] = !(matches2[j] = seed[j]);
                                        }
                                    }
                                });
                            });
                        }

                        function testContext(context) {
                            return context && typeof context.getElementsByTagName !== "undefined" && context;
                        }
                        support2 = Sizzle2.support = {};
                        isXML = Sizzle2.isXML = function(elem) {
                            var namespace = elem.namespaceURI,
                                docElem2 = (elem.ownerDocument || elem).documentElement;
                            return !rhtml2.test(namespace || docElem2 && docElem2.nodeName || "HTML");
                        };
                        setDocument = Sizzle2.setDocument = function(node) {
                            var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
                            if (doc == document3 || doc.nodeType !== 9 || !doc.documentElement) {
                                return document3;
                            }
                            document3 = doc;
                            docElem = document3.documentElement;
                            documentIsHTML = !isXML(document3);
                            if (preferredDoc != document3 && (subWindow = document3.defaultView) && subWindow.top !== subWindow) {
                                if (subWindow.addEventListener) {
                                    subWindow.addEventListener("unload", unloadHandler, false);
                                } else if (subWindow.attachEvent) {
                                    subWindow.attachEvent("onunload", unloadHandler);
                                }
                            }
                            support2.scope = assert(function(el) {
                                docElem.appendChild(el).appendChild(document3.createElement("div"));
                                return typeof el.querySelectorAll !== "undefined" && !el.querySelectorAll(":scope fieldset div").length;
                            });
                            support2.attributes = assert(function(el) {
                                el.className = "i";
                                return !el.getAttribute("className");
                            });
                            support2.getElementsByTagName = assert(function(el) {
                                el.appendChild(document3.createComment(""));
                                return !el.getElementsByTagName("*").length;
                            });
                            support2.getElementsByClassName = rnative.test(document3.getElementsByClassName);
                            support2.getById = assert(function(el) {
                                docElem.appendChild(el).id = expando;
                                return !document3.getElementsByName || !document3.getElementsByName(expando).length;
                            });
                            if (support2.getById) {
                                Expr.filter["ID"] = function(id) {
                                    var attrId = id.replace(runescape, funescape);
                                    return function(elem) {
                                        return elem.getAttribute("id") === attrId;
                                    };
                                };
                                Expr.find["ID"] = function(id, context) {
                                    if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                                        var elem = context.getElementById(id);
                                        return elem ? [elem] : [];
                                    }
                                };
                            } else {
                                Expr.filter["ID"] = function(id) {
                                    var attrId = id.replace(runescape, funescape);
                                    return function(elem) {
                                        var node2 = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                                        return node2 && node2.value === attrId;
                                    };
                                };
                                Expr.find["ID"] = function(id, context) {
                                    if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                                        var node2, i2, elems, elem = context.getElementById(id);
                                        if (elem) {
                                            node2 = elem.getAttributeNode("id");
                                            if (node2 && node2.value === id) {
                                                return [elem];
                                            }
                                            elems = context.getElementsByName(id);
                                            i2 = 0;
                                            while (elem = elems[i2++]) {
                                                node2 = elem.getAttributeNode("id");
                                                if (node2 && node2.value === id) {
                                                    return [elem];
                                                }
                                            }
                                        }
                                        return [];
                                    }
                                };
                            }
                            Expr.find["TAG"] = support2.getElementsByTagName ? function(tag, context) {
                                if (typeof context.getElementsByTagName !== "undefined") {
                                    return context.getElementsByTagName(tag);
                                } else if (support2.qsa) {
                                    return context.querySelectorAll(tag);
                                }
                            } : function(tag, context) {
                                var elem, tmp = [],
                                    i2 = 0,
                                    results = context.getElementsByTagName(tag);
                                if (tag === "*") {
                                    while (elem = results[i2++]) {
                                        if (elem.nodeType === 1) {
                                            tmp.push(elem);
                                        }
                                    }
                                    return tmp;
                                }
                                return results;
                            };
                            Expr.find["CLASS"] = support2.getElementsByClassName && function(className, context) {
                                if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                                    return context.getElementsByClassName(className);
                                }
                            };
                            rbuggyMatches = [];
                            rbuggyQSA = [];
                            if (support2.qsa = rnative.test(document3.querySelectorAll)) {
                                assert(function(el) {
                                    var input;
                                    docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>";
                                    if (el.querySelectorAll("[msallowcapture^='']").length) {
                                        rbuggyQSA.push("[*^$]=" + whitespace + `*(?:''|"")`);
                                    }
                                    if (!el.querySelectorAll("[selected]").length) {
                                        rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                                    }
                                    if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                                        rbuggyQSA.push("~=");
                                    }
                                    input = document3.createElement("input");
                                    input.setAttribute("name", "");
                                    el.appendChild(input);
                                    if (!el.querySelectorAll("[name='']").length) {
                                        rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + `*(?:''|"")`);
                                    }
                                    if (!el.querySelectorAll(":checked").length) {
                                        rbuggyQSA.push(":checked");
                                    }
                                    if (!el.querySelectorAll("a#" + expando + "+*").length) {
                                        rbuggyQSA.push(".#.+[+~]");
                                    }
                                    el.querySelectorAll("\\\f");
                                    rbuggyQSA.push("[\\r\\n\\f]");
                                });
                                assert(function(el) {
                                    el.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                    var input = document3.createElement("input");
                                    input.setAttribute("type", "hidden");
                                    el.appendChild(input).setAttribute("name", "D");
                                    if (el.querySelectorAll("[name=d]").length) {
                                        rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                                    }
                                    if (el.querySelectorAll(":enabled").length !== 2) {
                                        rbuggyQSA.push(":enabled", ":disabled");
                                    }
                                    docElem.appendChild(el).disabled = true;
                                    if (el.querySelectorAll(":disabled").length !== 2) {
                                        rbuggyQSA.push(":enabled", ":disabled");
                                    }
                                    el.querySelectorAll("*,:x");
                                    rbuggyQSA.push(",.*:");
                                });
                            }
                            if (support2.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
                                assert(function(el) {
                                    support2.disconnectedMatch = matches.call(el, "*");
                                    matches.call(el, "[s!='']:x");
                                    rbuggyMatches.push("!=", pseudos);
                                });
                            }
                            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
                            hasCompare = rnative.test(docElem.compareDocumentPosition);
                            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                                var adown = a.nodeType === 9 ? a.documentElement : a,
                                    bup = b && b.parentNode;
                                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
                            } : function(a, b) {
                                if (b) {
                                    while (b = b.parentNode) {
                                        if (b === a) {
                                            return true;
                                        }
                                    }
                                }
                                return false;
                            };
                            sortOrder = hasCompare ? function(a, b) {
                                if (a === b) {
                                    hasDuplicate = true;
                                    return 0;
                                }
                                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                                if (compare) {
                                    return compare;
                                }
                                compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : (
                                    // Otherwise we know they are disconnected
                                    1
                                );
                                if (compare & 1 || !support2.sortDetached && b.compareDocumentPosition(a) === compare) {
                                    if (a == document3 || a.ownerDocument == preferredDoc && contains(preferredDoc, a)) {
                                        return -1;
                                    }
                                    if (b == document3 || b.ownerDocument == preferredDoc && contains(preferredDoc, b)) {
                                        return 1;
                                    }
                                    return sortInput ? indexOf2(sortInput, a) - indexOf2(sortInput, b) : 0;
                                }
                                return compare & 4 ? -1 : 1;
                            } : function(a, b) {
                                if (a === b) {
                                    hasDuplicate = true;
                                    return 0;
                                }
                                var cur, i2 = 0,
                                    aup = a.parentNode,
                                    bup = b.parentNode,
                                    ap = [a],
                                    bp = [b];
                                if (!aup || !bup) {
                                    return a == document3 ? -1 : b == document3 ? 1 : (
                                        /* eslint-enable eqeqeq */
                                        aup ? -1 : bup ? 1 : sortInput ? indexOf2(sortInput, a) - indexOf2(sortInput, b) : 0
                                    );
                                } else if (aup === bup) {
                                    return siblingCheck(a, b);
                                }
                                cur = a;
                                while (cur = cur.parentNode) {
                                    ap.unshift(cur);
                                }
                                cur = b;
                                while (cur = cur.parentNode) {
                                    bp.unshift(cur);
                                }
                                while (ap[i2] === bp[i2]) {
                                    i2++;
                                }
                                return i2 ? (
                                    // Do a sibling check if the nodes have a common ancestor
                                    siblingCheck(ap[i2], bp[i2])
                                ) : (
                                    // Otherwise nodes in our document sort first
                                    // Support: IE 11+, Edge 17 - 18+
                                    // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                                    // two documents; shallow comparisons work.
                                    /* eslint-disable eqeqeq */
                                    ap[i2] == preferredDoc ? -1 : bp[i2] == preferredDoc ? 1 : (
                                        /* eslint-enable eqeqeq */
                                        0
                                    )
                                );
                            };
                            return document3;
                        };
                        Sizzle2.matches = function(expr, elements) {
                            return Sizzle2(expr, null, null, elements);
                        };
                        Sizzle2.matchesSelector = function(elem, expr) {
                            setDocument(elem);
                            if (support2.matchesSelector && documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                                try {
                                    var ret = matches.call(elem, expr);
                                    if (ret || support2.disconnectedMatch || // As well, disconnected nodes are said to be in a document
                                        // fragment in IE 9
                                        elem.document && elem.document.nodeType !== 11) {
                                        return ret;
                                    }
                                } catch (e) {
                                    nonnativeSelectorCache(expr, true);
                                }
                            }
                            return Sizzle2(expr, document3, null, [elem]).length > 0;
                        };
                        Sizzle2.contains = function(context, elem) {
                            if ((context.ownerDocument || context) != document3) {
                                setDocument(context);
                            }
                            return contains(context, elem);
                        };
                        Sizzle2.attr = function(elem, name) {
                            if ((elem.ownerDocument || elem) != document3) {
                                setDocument(elem);
                            }
                            var fn = Expr.attrHandle[name.toLowerCase()],
                                val = fn && hasOwn2.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
                            return val !== void 0 ? val : support2.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
                        };
                        Sizzle2.escape = function(sel) {
                            return (sel + "").replace(rcssescape, fcssescape);
                        };
                        Sizzle2.error = function(msg) {
                            throw new Error("Syntax error, unrecognized expression: " + msg);
                        };
                        Sizzle2.uniqueSort = function(results) {
                            var elem, duplicates = [],
                                j = 0,
                                i2 = 0;
                            hasDuplicate = !support2.detectDuplicates;
                            sortInput = !support2.sortStable && results.slice(0);
                            results.sort(sortOrder);
                            if (hasDuplicate) {
                                while (elem = results[i2++]) {
                                    if (elem === results[i2]) {
                                        j = duplicates.push(i2);
                                    }
                                }
                                while (j--) {
                                    results.splice(duplicates[j], 1);
                                }
                            }
                            sortInput = null;
                            return results;
                        };
                        getText = Sizzle2.getText = function(elem) {
                            var node, ret = "",
                                i2 = 0,
                                nodeType = elem.nodeType;
                            if (!nodeType) {
                                while (node = elem[i2++]) {
                                    ret += getText(node);
                                }
                            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                                if (typeof elem.textContent === "string") {
                                    return elem.textContent;
                                } else {
                                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                                        ret += getText(elem);
                                    }
                                }
                            } else if (nodeType === 3 || nodeType === 4) {
                                return elem.nodeValue;
                            }
                            return ret;
                        };
                        Expr = Sizzle2.selectors = {
                            // Can be adjusted by the user
                            cacheLength: 50,
                            createPseudo: markFunction,
                            match: matchExpr,
                            attrHandle: {},
                            find: {},
                            relative: {
                                ">": {
                                    dir: "parentNode",
                                    first: true
                                },
                                " ": {
                                    dir: "parentNode"
                                },
                                "+": {
                                    dir: "previousSibling",
                                    first: true
                                },
                                "~": {
                                    dir: "previousSibling"
                                }
                            },
                            preFilter: {
                                "ATTR": function(match) {
                                    match[1] = match[1].replace(runescape, funescape);
                                    match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                                    if (match[2] === "~=") {
                                        match[3] = " " + match[3] + " ";
                                    }
                                    return match.slice(0, 4);
                                },
                                "CHILD": function(match) {
                                    match[1] = match[1].toLowerCase();
                                    if (match[1].slice(0, 3) === "nth") {
                                        if (!match[3]) {
                                            Sizzle2.error(match[0]);
                                        }
                                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                                        match[5] = +(match[7] + match[8] || match[3] === "odd");
                                    } else if (match[3]) {
                                        Sizzle2.error(match[0]);
                                    }
                                    return match;
                                },
                                "PSEUDO": function(match) {
                                    var excess, unquoted = !match[6] && match[2];
                                    if (matchExpr["CHILD"].test(match[0])) {
                                        return null;
                                    }
                                    if (match[3]) {
                                        match[2] = match[4] || match[5] || "";
                                    } else if (unquoted && rpseudo.test(unquoted) && // Get excess from tokenize (recursively)
                                        (excess = tokenize(unquoted, true)) && // advance to the next closing parenthesis
                                        (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                                        match[0] = match[0].slice(0, excess);
                                        match[2] = unquoted.slice(0, excess);
                                    }
                                    return match.slice(0, 3);
                                }
                            },
                            filter: {
                                "TAG": function(nodeNameSelector) {
                                    var nodeName2 = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                                    return nodeNameSelector === "*" ? function() {
                                        return true;
                                    } : function(elem) {
                                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName2;
                                    };
                                },
                                "CLASS": function(className) {
                                    var pattern = classCache[className + " "];
                                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(
                                        className,
                                        function(elem) {
                                            return pattern.test(
                                                typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || ""
                                            );
                                        }
                                    );
                                },
                                "ATTR": function(name, operator, check) {
                                    return function(elem) {
                                        var result = Sizzle2.attr(elem, name);
                                        if (result == null) {
                                            return operator === "!=";
                                        }
                                        if (!operator) {
                                            return true;
                                        }
                                        result += "";
                                        return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                                    };
                                },
                                "CHILD": function(type, what, _argument, first, last) {
                                    var simple = type.slice(0, 3) !== "nth",
                                        forward = type.slice(-4) !== "last",
                                        ofType = what === "of-type";
                                    return first === 1 && last === 0 ? (
                                        // Shortcut for :nth-*(n)
                                        function(elem) {
                                            return !!elem.parentNode;
                                        }
                                    ) : function(elem, _context, xml) {
                                        var cache, uniqueCache, outerCache, node, nodeIndex, start, dir2 = simple !== forward ? "nextSibling" : "previousSibling",
                                            parent = elem.parentNode,
                                            name = ofType && elem.nodeName.toLowerCase(),
                                            useCache = !xml && !ofType,
                                            diff = false;
                                        if (parent) {
                                            if (simple) {
                                                while (dir2) {
                                                    node = elem;
                                                    while (node = node[dir2]) {
                                                        if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                                            return false;
                                                        }
                                                    }
                                                    start = dir2 = type === "only" && !start && "nextSibling";
                                                }
                                                return true;
                                            }
                                            start = [forward ? parent.firstChild : parent.lastChild];
                                            if (forward && useCache) {
                                                node = parent;
                                                outerCache = node[expando] || (node[expando] = {});
                                                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                                cache = uniqueCache[type] || [];
                                                nodeIndex = cache[0] === dirruns && cache[1];
                                                diff = nodeIndex && cache[2];
                                                node = nodeIndex && parent.childNodes[nodeIndex];
                                                while (node = ++nodeIndex && node && node[dir2] || // Fallback to seeking `elem` from the start
                                                    (diff = nodeIndex = 0) || start.pop()) {
                                                    if (node.nodeType === 1 && ++diff && node === elem) {
                                                        uniqueCache[type] = [dirruns, nodeIndex, diff];
                                                        break;
                                                    }
                                                }
                                            } else {
                                                if (useCache) {
                                                    node = elem;
                                                    outerCache = node[expando] || (node[expando] = {});
                                                    uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                                    cache = uniqueCache[type] || [];
                                                    nodeIndex = cache[0] === dirruns && cache[1];
                                                    diff = nodeIndex;
                                                }
                                                if (diff === false) {
                                                    while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                                                        if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                                            if (useCache) {
                                                                outerCache = node[expando] || (node[expando] = {});
                                                                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                                                uniqueCache[type] = [dirruns, diff];
                                                            }
                                                            if (node === elem) {
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            diff -= last;
                                            return diff === first || diff % first === 0 && diff / first >= 0;
                                        }
                                    };
                                },
                                "PSEUDO": function(pseudo, argument) {
                                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle2.error("unsupported pseudo: " + pseudo);
                                    if (fn[expando]) {
                                        return fn(argument);
                                    }
                                    if (fn.length > 1) {
                                        args = [pseudo, pseudo, "", argument];
                                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches2) {
                                            var idx, matched = fn(seed, argument),
                                                i2 = matched.length;
                                            while (i2--) {
                                                idx = indexOf2(seed, matched[i2]);
                                                seed[idx] = !(matches2[idx] = matched[i2]);
                                            }
                                        }) : function(elem) {
                                            return fn(elem, 0, args);
                                        };
                                    }
                                    return fn;
                                }
                            },
                            pseudos: {
                                // Potentially complex pseudos
                                "not": markFunction(function(selector) {
                                    var input = [],
                                        results = [],
                                        matcher = compile(selector.replace(rtrim2, "$1"));
                                    return matcher[expando] ? markFunction(function(seed, matches2, _context, xml) {
                                        var elem, unmatched = matcher(seed, null, xml, []),
                                            i2 = seed.length;
                                        while (i2--) {
                                            if (elem = unmatched[i2]) {
                                                seed[i2] = !(matches2[i2] = elem);
                                            }
                                        }
                                    }) : function(elem, _context, xml) {
                                        input[0] = elem;
                                        matcher(input, null, xml, results);
                                        input[0] = null;
                                        return !results.pop();
                                    };
                                }),
                                "has": markFunction(function(selector) {
                                    return function(elem) {
                                        return Sizzle2(selector, elem).length > 0;
                                    };
                                }),
                                "contains": markFunction(function(text) {
                                    text = text.replace(runescape, funescape);
                                    return function(elem) {
                                        return (elem.textContent || getText(elem)).indexOf(text) > -1;
                                    };
                                }),
                                // "Whether an element is represented by a :lang() selector
                                // is based solely on the element's language value
                                // being equal to the identifier C,
                                // or beginning with the identifier C immediately followed by "-".
                                // The matching of C against the element's language value is performed case-insensitively.
                                // The identifier C does not have to be a valid language name."
                                // http://www.w3.org/TR/selectors/#lang-pseudo
                                "lang": markFunction(function(lang) {
                                    if (!ridentifier.test(lang || "")) {
                                        Sizzle2.error("unsupported lang: " + lang);
                                    }
                                    lang = lang.replace(runescape, funescape).toLowerCase();
                                    return function(elem) {
                                        var elemLang;
                                        do {
                                            if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                                                elemLang = elemLang.toLowerCase();
                                                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                                            }
                                        } while ((elem = elem.parentNode) && elem.nodeType === 1);
                                        return false;
                                    };
                                }),
                                // Miscellaneous
                                "target": function(elem) {
                                    var hash = window3.location && window3.location.hash;
                                    return hash && hash.slice(1) === elem.id;
                                },
                                "root": function(elem) {
                                    return elem === docElem;
                                },
                                "focus": function(elem) {
                                    return elem === document3.activeElement && (!document3.hasFocus || document3.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                                },
                                // Boolean properties
                                "enabled": createDisabledPseudo(false),
                                "disabled": createDisabledPseudo(true),
                                "checked": function(elem) {
                                    var nodeName2 = elem.nodeName.toLowerCase();
                                    return nodeName2 === "input" && !!elem.checked || nodeName2 === "option" && !!elem.selected;
                                },
                                "selected": function(elem) {
                                    if (elem.parentNode) {
                                        elem.parentNode.selectedIndex;
                                    }
                                    return elem.selected === true;
                                },
                                // Contents
                                "empty": function(elem) {
                                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                                        if (elem.nodeType < 6) {
                                            return false;
                                        }
                                    }
                                    return true;
                                },
                                "parent": function(elem) {
                                    return !Expr.pseudos["empty"](elem);
                                },
                                // Element/input types
                                "header": function(elem) {
                                    return rheader.test(elem.nodeName);
                                },
                                "input": function(elem) {
                                    return rinputs.test(elem.nodeName);
                                },
                                "button": function(elem) {
                                    var name = elem.nodeName.toLowerCase();
                                    return name === "input" && elem.type === "button" || name === "button";
                                },
                                "text": function(elem) {
                                    var attr;
                                    return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && // Support: IE<8
                                        // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                                        ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                                },
                                // Position-in-collection
                                "first": createPositionalPseudo(function() {
                                    return [0];
                                }),
                                "last": createPositionalPseudo(function(_matchIndexes, length) {
                                    return [length - 1];
                                }),
                                "eq": createPositionalPseudo(function(_matchIndexes, length, argument) {
                                    return [argument < 0 ? argument + length : argument];
                                }),
                                "even": createPositionalPseudo(function(matchIndexes, length) {
                                    var i2 = 0;
                                    for (; i2 < length; i2 += 2) {
                                        matchIndexes.push(i2);
                                    }
                                    return matchIndexes;
                                }),
                                "odd": createPositionalPseudo(function(matchIndexes, length) {
                                    var i2 = 1;
                                    for (; i2 < length; i2 += 2) {
                                        matchIndexes.push(i2);
                                    }
                                    return matchIndexes;
                                }),
                                "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                                    var i2 = argument < 0 ? argument + length : argument > length ? length : argument;
                                    for (; --i2 >= 0;) {
                                        matchIndexes.push(i2);
                                    }
                                    return matchIndexes;
                                }),
                                "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                                    var i2 = argument < 0 ? argument + length : argument;
                                    for (; ++i2 < length;) {
                                        matchIndexes.push(i2);
                                    }
                                    return matchIndexes;
                                })
                            }
                        };
                        Expr.pseudos["nth"] = Expr.pseudos["eq"];
                        for (i in {
                                radio: true,
                                checkbox: true,
                                file: true,
                                password: true,
                                image: true
                            }) {
                            Expr.pseudos[i] = createInputPseudo(i);
                        }
                        for (i in {
                                submit: true,
                                reset: true
                            }) {
                            Expr.pseudos[i] = createButtonPseudo(i);
                        }

                        function setFilters() {}
                        setFilters.prototype = Expr.filters = Expr.pseudos;
                        Expr.setFilters = new setFilters();
                        tokenize = Sizzle2.tokenize = function(selector, parseOnly) {
                            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
                            if (cached) {
                                return parseOnly ? 0 : cached.slice(0);
                            }
                            soFar = selector;
                            groups = [];
                            preFilters = Expr.preFilter;
                            while (soFar) {
                                if (!matched || (match = rcomma.exec(soFar))) {
                                    if (match) {
                                        soFar = soFar.slice(match[0].length) || soFar;
                                    }
                                    groups.push(tokens = []);
                                }
                                matched = false;
                                if (match = rcombinators.exec(soFar)) {
                                    matched = match.shift();
                                    tokens.push({
                                        value: matched,
                                        // Cast descendant combinators to space
                                        type: match[0].replace(rtrim2, " ")
                                    });
                                    soFar = soFar.slice(matched.length);
                                }
                                for (type in Expr.filter) {
                                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                                        matched = match.shift();
                                        tokens.push({
                                            value: matched,
                                            type,
                                            matches: match
                                        });
                                        soFar = soFar.slice(matched.length);
                                    }
                                }
                                if (!matched) {
                                    break;
                                }
                            }
                            return parseOnly ? soFar.length : soFar ? Sizzle2.error(selector) : (
                                // Cache the tokens
                                tokenCache(selector, groups).slice(0)
                            );
                        };

                        function toSelector(tokens) {
                            var i2 = 0,
                                len = tokens.length,
                                selector = "";
                            for (; i2 < len; i2++) {
                                selector += tokens[i2].value;
                            }
                            return selector;
                        }

                        function addCombinator(matcher, combinator, base) {
                            var dir2 = combinator.dir,
                                skip = combinator.next,
                                key = skip || dir2,
                                checkNonElements = base && key === "parentNode",
                                doneName = done++;
                            return combinator.first ? (
                                // Check against closest ancestor/preceding element
                                function(elem, context, xml) {
                                    while (elem = elem[dir2]) {
                                        if (elem.nodeType === 1 || checkNonElements) {
                                            return matcher(elem, context, xml);
                                        }
                                    }
                                    return false;
                                }
                            ) : (
                                // Check against all ancestor/preceding elements
                                function(elem, context, xml) {
                                    var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName];
                                    if (xml) {
                                        while (elem = elem[dir2]) {
                                            if (elem.nodeType === 1 || checkNonElements) {
                                                if (matcher(elem, context, xml)) {
                                                    return true;
                                                }
                                            }
                                        }
                                    } else {
                                        while (elem = elem[dir2]) {
                                            if (elem.nodeType === 1 || checkNonElements) {
                                                outerCache = elem[expando] || (elem[expando] = {});
                                                uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
                                                if (skip && skip === elem.nodeName.toLowerCase()) {
                                                    elem = elem[dir2] || elem;
                                                } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                                                    return newCache[2] = oldCache[2];
                                                } else {
                                                    uniqueCache[key] = newCache;
                                                    if (newCache[2] = matcher(elem, context, xml)) {
                                                        return true;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    return false;
                                }
                            );
                        }

                        function elementMatcher(matchers) {
                            return matchers.length > 1 ? function(elem, context, xml) {
                                var i2 = matchers.length;
                                while (i2--) {
                                    if (!matchers[i2](elem, context, xml)) {
                                        return false;
                                    }
                                }
                                return true;
                            } : matchers[0];
                        }

                        function multipleContexts(selector, contexts, results) {
                            var i2 = 0,
                                len = contexts.length;
                            for (; i2 < len; i2++) {
                                Sizzle2(selector, contexts[i2], results);
                            }
                            return results;
                        }

                        function condense(unmatched, map2, filter, context, xml) {
                            var elem, newUnmatched = [],
                                i2 = 0,
                                len = unmatched.length,
                                mapped = map2 != null;
                            for (; i2 < len; i2++) {
                                if (elem = unmatched[i2]) {
                                    if (!filter || filter(elem, context, xml)) {
                                        newUnmatched.push(elem);
                                        if (mapped) {
                                            map2.push(i2);
                                        }
                                    }
                                }
                            }
                            return newUnmatched;
                        }

                        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                            if (postFilter && !postFilter[expando]) {
                                postFilter = setMatcher(postFilter);
                            }
                            if (postFinder && !postFinder[expando]) {
                                postFinder = setMatcher(postFinder, postSelector);
                            }
                            return markFunction(function(seed, results, context, xml) {
                                var temp, i2, elem, preMap = [],
                                    postMap = [],
                                    preexisting = results.length,
                                    elems = seed || multipleContexts(
                                        selector || "*",
                                        context.nodeType ? [context] : context, []
                                    ),
                                    matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
                                    matcherOut = matcher ? (
                                        // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                                        postFinder || (seed ? preFilter : preexisting || postFilter) ? (
                                            // ...intermediate processing is necessary
                                            []
                                        ) : (
                                            // ...otherwise use results directly
                                            results
                                        )
                                    ) : matcherIn;
                                if (matcher) {
                                    matcher(matcherIn, matcherOut, context, xml);
                                }
                                if (postFilter) {
                                    temp = condense(matcherOut, postMap);
                                    postFilter(temp, [], context, xml);
                                    i2 = temp.length;
                                    while (i2--) {
                                        if (elem = temp[i2]) {
                                            matcherOut[postMap[i2]] = !(matcherIn[postMap[i2]] = elem);
                                        }
                                    }
                                }
                                if (seed) {
                                    if (postFinder || preFilter) {
                                        if (postFinder) {
                                            temp = [];
                                            i2 = matcherOut.length;
                                            while (i2--) {
                                                if (elem = matcherOut[i2]) {
                                                    temp.push(matcherIn[i2] = elem);
                                                }
                                            }
                                            postFinder(null, matcherOut = [], temp, xml);
                                        }
                                        i2 = matcherOut.length;
                                        while (i2--) {
                                            if ((elem = matcherOut[i2]) && (temp = postFinder ? indexOf2(seed, elem) : preMap[i2]) > -1) {
                                                seed[temp] = !(results[temp] = elem);
                                            }
                                        }
                                    }
                                } else {
                                    matcherOut = condense(
                                        matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut
                                    );
                                    if (postFinder) {
                                        postFinder(null, results, matcherOut, xml);
                                    } else {
                                        push2.apply(results, matcherOut);
                                    }
                                }
                            });
                        }

                        function matcherFromTokens(tokens) {
                            var checkContext, matcher, j, len = tokens.length,
                                leadingRelative = Expr.relative[tokens[0].type],
                                implicitRelative = leadingRelative || Expr.relative[" "],
                                i2 = leadingRelative ? 1 : 0,
                                matchContext = addCombinator(function(elem) {
                                    return elem === checkContext;
                                }, implicitRelative, true),
                                matchAnyContext = addCombinator(function(elem) {
                                    return indexOf2(checkContext, elem) > -1;
                                }, implicitRelative, true),
                                matchers = [function(elem, context, xml) {
                                    var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                                    checkContext = null;
                                    return ret;
                                }];
                            for (; i2 < len; i2++) {
                                if (matcher = Expr.relative[tokens[i2].type]) {
                                    matchers = [addCombinator(elementMatcher(matchers), matcher)];
                                } else {
                                    matcher = Expr.filter[tokens[i2].type].apply(null, tokens[i2].matches);
                                    if (matcher[expando]) {
                                        j = ++i2;
                                        for (; j < len; j++) {
                                            if (Expr.relative[tokens[j].type]) {
                                                break;
                                            }
                                        }
                                        return setMatcher(
                                            i2 > 1 && elementMatcher(matchers),
                                            i2 > 1 && toSelector(
                                                // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                                tokens.slice(0, i2 - 1).concat({
                                                    value: tokens[i2 - 2].type === " " ? "*" : ""
                                                })
                                            ).replace(rtrim2, "$1"),
                                            matcher,
                                            i2 < j && matcherFromTokens(tokens.slice(i2, j)),
                                            j < len && matcherFromTokens(tokens = tokens.slice(j)),
                                            j < len && toSelector(tokens)
                                        );
                                    }
                                    matchers.push(matcher);
                                }
                            }
                            return elementMatcher(matchers);
                        }

                        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                            var bySet = setMatchers.length > 0,
                                byElement = elementMatchers.length > 0,
                                superMatcher = function(seed, context, xml, results, outermost) {
                                    var elem, j, matcher, matchedCount = 0,
                                        i2 = "0",
                                        unmatched = seed && [],
                                        setMatched = [],
                                        contextBackup = outermostContext,
                                        elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                                        dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
                                        len = elems.length;
                                    if (outermost) {
                                        outermostContext = context == document3 || context || outermost;
                                    }
                                    for (; i2 !== len && (elem = elems[i2]) != null; i2++) {
                                        if (byElement && elem) {
                                            j = 0;
                                            if (!context && elem.ownerDocument != document3) {
                                                setDocument(elem);
                                                xml = !documentIsHTML;
                                            }
                                            while (matcher = elementMatchers[j++]) {
                                                if (matcher(elem, context || document3, xml)) {
                                                    results.push(elem);
                                                    break;
                                                }
                                            }
                                            if (outermost) {
                                                dirruns = dirrunsUnique;
                                            }
                                        }
                                        if (bySet) {
                                            if (elem = !matcher && elem) {
                                                matchedCount--;
                                            }
                                            if (seed) {
                                                unmatched.push(elem);
                                            }
                                        }
                                    }
                                    matchedCount += i2;
                                    if (bySet && i2 !== matchedCount) {
                                        j = 0;
                                        while (matcher = setMatchers[j++]) {
                                            matcher(unmatched, setMatched, context, xml);
                                        }
                                        if (seed) {
                                            if (matchedCount > 0) {
                                                while (i2--) {
                                                    if (!(unmatched[i2] || setMatched[i2])) {
                                                        setMatched[i2] = pop.call(results);
                                                    }
                                                }
                                            }
                                            setMatched = condense(setMatched);
                                        }
                                        push2.apply(results, setMatched);
                                        if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                                            Sizzle2.uniqueSort(results);
                                        }
                                    }
                                    if (outermost) {
                                        dirruns = dirrunsUnique;
                                        outermostContext = contextBackup;
                                    }
                                    return unmatched;
                                };
                            return bySet ? markFunction(superMatcher) : superMatcher;
                        }
                        compile = Sizzle2.compile = function(selector, match) {
                            var i2, setMatchers = [],
                                elementMatchers = [],
                                cached = compilerCache[selector + " "];
                            if (!cached) {
                                if (!match) {
                                    match = tokenize(selector);
                                }
                                i2 = match.length;
                                while (i2--) {
                                    cached = matcherFromTokens(match[i2]);
                                    if (cached[expando]) {
                                        setMatchers.push(cached);
                                    } else {
                                        elementMatchers.push(cached);
                                    }
                                }
                                cached = compilerCache(
                                    selector,
                                    matcherFromGroupMatchers(elementMatchers, setMatchers)
                                );
                                cached.selector = selector;
                            }
                            return cached;
                        };
                        select = Sizzle2.select = function(selector, context, results, seed) {
                            var i2, tokens, token, type, find, compiled = typeof selector === "function" && selector,
                                match = !seed && tokenize(selector = compiled.selector || selector);
                            results = results || [];
                            if (match.length === 1) {
                                tokens = match[0] = match[0].slice(0);
                                if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                                    context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                                    if (!context) {
                                        return results;
                                    } else if (compiled) {
                                        context = context.parentNode;
                                    }
                                    selector = selector.slice(tokens.shift().value.length);
                                }
                                i2 = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                                while (i2--) {
                                    token = tokens[i2];
                                    if (Expr.relative[type = token.type]) {
                                        break;
                                    }
                                    if (find = Expr.find[type]) {
                                        if (seed = find(
                                                token.matches[0].replace(runescape, funescape),
                                                rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                                            )) {
                                            tokens.splice(i2, 1);
                                            selector = seed.length && toSelector(tokens);
                                            if (!selector) {
                                                push2.apply(results, seed);
                                                return results;
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                            (compiled || compile(selector, match))(
                                seed,
                                context, !documentIsHTML,
                                results, !context || rsibling.test(selector) && testContext(context.parentNode) || context
                            );
                            return results;
                        };
                        support2.sortStable = expando.split("").sort(sortOrder).join("") === expando;
                        support2.detectDuplicates = !!hasDuplicate;
                        setDocument();
                        support2.sortDetached = assert(function(el) {
                            return el.compareDocumentPosition(document3.createElement("fieldset")) & 1;
                        });
                        if (!assert(function(el) {
                                el.innerHTML = "<a href='#'></a>";
                                return el.firstChild.getAttribute("href") === "#";
                            })) {
                            addHandle("type|href|height|width", function(elem, name, isXML2) {
                                if (!isXML2) {
                                    return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                                }
                            });
                        }
                        if (!support2.attributes || !assert(function(el) {
                                el.innerHTML = "<input/>";
                                el.firstChild.setAttribute("value", "");
                                return el.firstChild.getAttribute("value") === "";
                            })) {
                            addHandle("value", function(elem, _name, isXML2) {
                                if (!isXML2 && elem.nodeName.toLowerCase() === "input") {
                                    return elem.defaultValue;
                                }
                            });
                        }
                        if (!assert(function(el) {
                                return el.getAttribute("disabled") == null;
                            })) {
                            addHandle(booleans, function(elem, name, isXML2) {
                                var val;
                                if (!isXML2) {
                                    return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
                                }
                            });
                        }
                        return Sizzle2;
                    }(window2)
                );
                jQuery2.find = Sizzle;
                jQuery2.expr = Sizzle.selectors;
                jQuery2.expr[":"] = jQuery2.expr.pseudos;
                jQuery2.uniqueSort = jQuery2.unique = Sizzle.uniqueSort;
                jQuery2.text = Sizzle.getText;
                jQuery2.isXMLDoc = Sizzle.isXML;
                jQuery2.contains = Sizzle.contains;
                jQuery2.escapeSelector = Sizzle.escape;
                var dir = function(elem, dir2, until) {
                    var matched = [],
                        truncate = until !== void 0;
                    while ((elem = elem[dir2]) && elem.nodeType !== 9) {
                        if (elem.nodeType === 1) {
                            if (truncate && jQuery2(elem).is(until)) {
                                break;
                            }
                            matched.push(elem);
                        }
                    }
                    return matched;
                };
                var siblings = function(n, elem) {
                    var matched = [];
                    for (; n; n = n.nextSibling) {
                        if (n.nodeType === 1 && n !== elem) {
                            matched.push(n);
                        }
                    }
                    return matched;
                };
                var rneedsContext = jQuery2.expr.match.needsContext;

                function nodeName(elem, name) {
                    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
                };
                var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

                function winnow(elements, qualifier, not) {
                    if (isFunction(qualifier)) {
                        return jQuery2.grep(elements, function(elem, i) {
                            return !!qualifier.call(elem, i, elem) !== not;
                        });
                    }
                    if (qualifier.nodeType) {
                        return jQuery2.grep(elements, function(elem) {
                            return elem === qualifier !== not;
                        });
                    }
                    if (typeof qualifier !== "string") {
                        return jQuery2.grep(elements, function(elem) {
                            return indexOf.call(qualifier, elem) > -1 !== not;
                        });
                    }
                    return jQuery2.filter(qualifier, elements, not);
                }
                jQuery2.filter = function(expr, elems, not) {
                    var elem = elems[0];
                    if (not) {
                        expr = ":not(" + expr + ")";
                    }
                    if (elems.length === 1 && elem.nodeType === 1) {
                        return jQuery2.find.matchesSelector(elem, expr) ? [elem] : [];
                    }
                    return jQuery2.find.matches(expr, jQuery2.grep(elems, function(elem2) {
                        return elem2.nodeType === 1;
                    }));
                };
                jQuery2.fn.extend({
                    find: function(selector) {
                        var i, ret, len = this.length,
                            self = this;
                        if (typeof selector !== "string") {
                            return this.pushStack(jQuery2(selector).filter(function() {
                                for (i = 0; i < len; i++) {
                                    if (jQuery2.contains(self[i], this)) {
                                        return true;
                                    }
                                }
                            }));
                        }
                        ret = this.pushStack([]);
                        for (i = 0; i < len; i++) {
                            jQuery2.find(selector, self[i], ret);
                        }
                        return len > 1 ? jQuery2.uniqueSort(ret) : ret;
                    },
                    filter: function(selector) {
                        return this.pushStack(winnow(this, selector || [], false));
                    },
                    not: function(selector) {
                        return this.pushStack(winnow(this, selector || [], true));
                    },
                    is: function(selector) {
                        return !!winnow(
                            this,
                            // If this is a positional/relative selector, check membership in the returned set
                            // so $("p:first").is("p:last") won't return true for a doc with two "p".
                            typeof selector === "string" && rneedsContext.test(selector) ? jQuery2(selector) : selector || [],
                            false
                        ).length;
                    }
                });
                var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
                    init = jQuery2.fn.init = function(selector, context, root) {
                        var match, elem;
                        if (!selector) {
                            return this;
                        }
                        root = root || rootjQuery;
                        if (typeof selector === "string") {
                            if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
                                match = [null, selector, null];
                            } else {
                                match = rquickExpr.exec(selector);
                            }
                            if (match && (match[1] || !context)) {
                                if (match[1]) {
                                    context = context instanceof jQuery2 ? context[0] : context;
                                    jQuery2.merge(this, jQuery2.parseHTML(
                                        match[1],
                                        context && context.nodeType ? context.ownerDocument || context : document2,
                                        true
                                    ));
                                    if (rsingleTag.test(match[1]) && jQuery2.isPlainObject(context)) {
                                        for (match in context) {
                                            if (isFunction(this[match])) {
                                                this[match](context[match]);
                                            } else {
                                                this.attr(match, context[match]);
                                            }
                                        }
                                    }
                                    return this;
                                } else {
                                    elem = document2.getElementById(match[2]);
                                    if (elem) {
                                        this[0] = elem;
                                        this.length = 1;
                                    }
                                    return this;
                                }
                            } else if (!context || context.jquery) {
                                return (context || root).find(selector);
                            } else {
                                return this.constructor(context).find(selector);
                            }
                        } else if (selector.nodeType) {
                            this[0] = selector;
                            this.length = 1;
                            return this;
                        } else if (isFunction(selector)) {
                            return root.ready !== void 0 ? root.ready(selector) : (
                                // Execute immediately if ready is not present
                                selector(jQuery2)
                            );
                        }
                        return jQuery2.makeArray(selector, this);
                    };
                init.prototype = jQuery2.fn;
                rootjQuery = jQuery2(document2);
                var rparentsprev = /^(?:parents|prev(?:Until|All))/,
                    guaranteedUnique = {
                        children: true,
                        contents: true,
                        next: true,
                        prev: true
                    };
                jQuery2.fn.extend({
                    has: function(target) {
                        var targets = jQuery2(target, this),
                            l = targets.length;
                        return this.filter(function() {
                            var i = 0;
                            for (; i < l; i++) {
                                if (jQuery2.contains(this, targets[i])) {
                                    return true;
                                }
                            }
                        });
                    },
                    closest: function(selectors, context) {
                        var cur, i = 0,
                            l = this.length,
                            matched = [],
                            targets = typeof selectors !== "string" && jQuery2(selectors);
                        if (!rneedsContext.test(selectors)) {
                            for (; i < l; i++) {
                                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                                    if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : (
                                            // Don't pass non-elements to Sizzle
                                            cur.nodeType === 1 && jQuery2.find.matchesSelector(cur, selectors)
                                        ))) {
                                        matched.push(cur);
                                        break;
                                    }
                                }
                            }
                        }
                        return this.pushStack(matched.length > 1 ? jQuery2.uniqueSort(matched) : matched);
                    },
                    // Determine the position of an element within the set
                    index: function(elem) {
                        if (!elem) {
                            return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
                        }
                        if (typeof elem === "string") {
                            return indexOf.call(jQuery2(elem), this[0]);
                        }
                        return indexOf.call(
                            this,
                            // If it receives a jQuery object, the first element is used
                            elem.jquery ? elem[0] : elem
                        );
                    },
                    add: function(selector, context) {
                        return this.pushStack(
                            jQuery2.uniqueSort(
                                jQuery2.merge(this.get(), jQuery2(selector, context))
                            )
                        );
                    },
                    addBack: function(selector) {
                        return this.add(
                            selector == null ? this.prevObject : this.prevObject.filter(selector)
                        );
                    }
                });

                function sibling(cur, dir2) {
                    while ((cur = cur[dir2]) && cur.nodeType !== 1) {}
                    return cur;
                }
                jQuery2.each({
                    parent: function(elem) {
                        var parent = elem.parentNode;
                        return parent && parent.nodeType !== 11 ? parent : null;
                    },
                    parents: function(elem) {
                        return dir(elem, "parentNode");
                    },
                    parentsUntil: function(elem, _i, until) {
                        return dir(elem, "parentNode", until);
                    },
                    next: function(elem) {
                        return sibling(elem, "nextSibling");
                    },
                    prev: function(elem) {
                        return sibling(elem, "previousSibling");
                    },
                    nextAll: function(elem) {
                        return dir(elem, "nextSibling");
                    },
                    prevAll: function(elem) {
                        return dir(elem, "previousSibling");
                    },
                    nextUntil: function(elem, _i, until) {
                        return dir(elem, "nextSibling", until);
                    },
                    prevUntil: function(elem, _i, until) {
                        return dir(elem, "previousSibling", until);
                    },
                    siblings: function(elem) {
                        return siblings((elem.parentNode || {}).firstChild, elem);
                    },
                    children: function(elem) {
                        return siblings(elem.firstChild);
                    },
                    contents: function(elem) {
                        if (elem.contentDocument != null && // Support: IE 11+
                            // <object> elements with no `data` attribute has an object
                            // `contentDocument` with a `null` prototype.
                            getProto(elem.contentDocument)) {
                            return elem.contentDocument;
                        }
                        if (nodeName(elem, "template")) {
                            elem = elem.content || elem;
                        }
                        return jQuery2.merge([], elem.childNodes);
                    }
                }, function(name, fn) {
                    jQuery2.fn[name] = function(until, selector) {
                        var matched = jQuery2.map(this, fn, until);
                        if (name.slice(-5) !== "Until") {
                            selector = until;
                        }
                        if (selector && typeof selector === "string") {
                            matched = jQuery2.filter(selector, matched);
                        }
                        if (this.length > 1) {
                            if (!guaranteedUnique[name]) {
                                jQuery2.uniqueSort(matched);
                            }
                            if (rparentsprev.test(name)) {
                                matched.reverse();
                            }
                        }
                        return this.pushStack(matched);
                    };
                });
                var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

                function createOptions(options) {
                    var object = {};
                    jQuery2.each(options.match(rnothtmlwhite) || [], function(_, flag) {
                        object[flag] = true;
                    });
                    return object;
                }
                jQuery2.Callbacks = function(options) {
                    options = typeof options === "string" ? createOptions(options) : jQuery2.extend({}, options);
                    var firing, memory, fired, locked, list = [],
                        queue2 = [],
                        firingIndex = -1,
                        fire = function() {
                            locked = locked || options.once;
                            fired = firing = true;
                            for (; queue2.length; firingIndex = -1) {
                                memory = queue2.shift();
                                while (++firingIndex < list.length) {
                                    if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                                        firingIndex = list.length;
                                        memory = false;
                                    }
                                }
                            }
                            if (!options.memory) {
                                memory = false;
                            }
                            firing = false;
                            if (locked) {
                                if (memory) {
                                    list = [];
                                } else {
                                    list = "";
                                }
                            }
                        },
                        self = {
                            // Add a callback or a collection of callbacks to the list
                            add: function() {
                                if (list) {
                                    if (memory && !firing) {
                                        firingIndex = list.length - 1;
                                        queue2.push(memory);
                                    }
                                    (function add(args) {
                                        jQuery2.each(args, function(_, arg) {
                                            if (isFunction(arg)) {
                                                if (!options.unique || !self.has(arg)) {
                                                    list.push(arg);
                                                }
                                            } else if (arg && arg.length && toType(arg) !== "string") {
                                                add(arg);
                                            }
                                        });
                                    })(arguments);
                                    if (memory && !firing) {
                                        fire();
                                    }
                                }
                                return this;
                            },
                            // Remove a callback from the list
                            remove: function() {
                                jQuery2.each(arguments, function(_, arg) {
                                    var index;
                                    while ((index = jQuery2.inArray(arg, list, index)) > -1) {
                                        list.splice(index, 1);
                                        if (index <= firingIndex) {
                                            firingIndex--;
                                        }
                                    }
                                });
                                return this;
                            },
                            // Check if a given callback is in the list.
                            // If no argument is given, return whether or not list has callbacks attached.
                            has: function(fn) {
                                return fn ? jQuery2.inArray(fn, list) > -1 : list.length > 0;
                            },
                            // Remove all callbacks from the list
                            empty: function() {
                                if (list) {
                                    list = [];
                                }
                                return this;
                            },
                            // Disable .fire and .add
                            // Abort any current/pending executions
                            // Clear all callbacks and values
                            disable: function() {
                                locked = queue2 = [];
                                list = memory = "";
                                return this;
                            },
                            disabled: function() {
                                return !list;
                            },
                            // Disable .fire
                            // Also disable .add unless we have memory (since it would have no effect)
                            // Abort any pending executions
                            lock: function() {
                                locked = queue2 = [];
                                if (!memory && !firing) {
                                    list = memory = "";
                                }
                                return this;
                            },
                            locked: function() {
                                return !!locked;
                            },
                            // Call all callbacks with the given context and arguments
                            fireWith: function(context, args) {
                                if (!locked) {
                                    args = args || [];
                                    args = [context, args.slice ? args.slice() : args];
                                    queue2.push(args);
                                    if (!firing) {
                                        fire();
                                    }
                                }
                                return this;
                            },
                            // Call all the callbacks with the given arguments
                            fire: function() {
                                self.fireWith(this, arguments);
                                return this;
                            },
                            // To know if the callbacks have already been called at least once
                            fired: function() {
                                return !!fired;
                            }
                        };
                    return self;
                };

                function Identity(v) {
                    return v;
                }

                function Thrower(ex) {
                    throw ex;
                }

                function adoptValue(value, resolve, reject, noValue) {
                    var method;
                    try {
                        if (value && isFunction(method = value.promise)) {
                            method.call(value).done(resolve).fail(reject);
                        } else if (value && isFunction(method = value.then)) {
                            method.call(value, resolve, reject);
                        } else {
                            resolve.apply(void 0, [value].slice(noValue));
                        }
                    } catch (value2) {
                        reject.apply(void 0, [value2]);
                    }
                }
                jQuery2.extend({
                    Deferred: function(func) {
                        var tuples = [
                                // action, add listener, callbacks,
                                // ... .then handlers, argument index, [final state]
                                [
                                    "notify",
                                    "progress",
                                    jQuery2.Callbacks("memory"),
                                    jQuery2.Callbacks("memory"),
                                    2
                                ],
                                [
                                    "resolve",
                                    "done",
                                    jQuery2.Callbacks("once memory"),
                                    jQuery2.Callbacks("once memory"),
                                    0,
                                    "resolved"
                                ],
                                [
                                    "reject",
                                    "fail",
                                    jQuery2.Callbacks("once memory"),
                                    jQuery2.Callbacks("once memory"),
                                    1,
                                    "rejected"
                                ]
                            ],
                            state = "pending",
                            promise = {
                                state: function() {
                                    return state;
                                },
                                always: function() {
                                    deferred.done(arguments).fail(arguments);
                                    return this;
                                },
                                "catch": function(fn) {
                                    return promise.then(null, fn);
                                },
                                // Keep pipe for back-compat
                                pipe: function() {
                                    var fns = arguments;
                                    return jQuery2.Deferred(function(newDefer) {
                                        jQuery2.each(tuples, function(_i, tuple) {
                                            var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
                                            deferred[tuple[1]](function() {
                                                var returned = fn && fn.apply(this, arguments);
                                                if (returned && isFunction(returned.promise)) {
                                                    returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                                                } else {
                                                    newDefer[tuple[0] + "With"](
                                                        this,
                                                        fn ? [returned] : arguments
                                                    );
                                                }
                                            });
                                        });
                                        fns = null;
                                    }).promise();
                                },
                                then: function(onFulfilled, onRejected, onProgress) {
                                    var maxDepth = 0;

                                    function resolve(depth, deferred2, handler, special) {
                                        return function() {
                                            var that = this,
                                                args = arguments,
                                                mightThrow = function() {
                                                    var returned, then;
                                                    if (depth < maxDepth) {
                                                        return;
                                                    }
                                                    returned = handler.apply(that, args);
                                                    if (returned === deferred2.promise()) {
                                                        throw new TypeError("Thenable self-resolution");
                                                    }
                                                    then = returned && // Support: Promises/A+ section 2.3.4
                                                        // https://promisesaplus.com/#point-64
                                                        // Only check objects and functions for thenability
                                                        (typeof returned === "object" || typeof returned === "function") && returned.then;
                                                    if (isFunction(then)) {
                                                        if (special) {
                                                            then.call(
                                                                returned,
                                                                resolve(maxDepth, deferred2, Identity, special),
                                                                resolve(maxDepth, deferred2, Thrower, special)
                                                            );
                                                        } else {
                                                            maxDepth++;
                                                            then.call(
                                                                returned,
                                                                resolve(maxDepth, deferred2, Identity, special),
                                                                resolve(maxDepth, deferred2, Thrower, special),
                                                                resolve(
                                                                    maxDepth,
                                                                    deferred2,
                                                                    Identity,
                                                                    deferred2.notifyWith
                                                                )
                                                            );
                                                        }
                                                    } else {
                                                        if (handler !== Identity) {
                                                            that = void 0;
                                                            args = [returned];
                                                        }
                                                        (special || deferred2.resolveWith)(that, args);
                                                    }
                                                },
                                                process2 = special ? mightThrow : function() {
                                                    try {
                                                        mightThrow();
                                                    } catch (e) {
                                                        if (jQuery2.Deferred.exceptionHook) {
                                                            jQuery2.Deferred.exceptionHook(
                                                                e,
                                                                process2.stackTrace
                                                            );
                                                        }
                                                        if (depth + 1 >= maxDepth) {
                                                            if (handler !== Thrower) {
                                                                that = void 0;
                                                                args = [e];
                                                            }
                                                            deferred2.rejectWith(that, args);
                                                        }
                                                    }
                                                };
                                            if (depth) {
                                                process2();
                                            } else {
                                                if (jQuery2.Deferred.getStackHook) {
                                                    process2.stackTrace = jQuery2.Deferred.getStackHook();
                                                }
                                                window2.setTimeout(process2);
                                            }
                                        };
                                    }
                                    return jQuery2.Deferred(function(newDefer) {
                                        tuples[0][3].add(
                                            resolve(
                                                0,
                                                newDefer,
                                                isFunction(onProgress) ? onProgress : Identity,
                                                newDefer.notifyWith
                                            )
                                        );
                                        tuples[1][3].add(
                                            resolve(
                                                0,
                                                newDefer,
                                                isFunction(onFulfilled) ? onFulfilled : Identity
                                            )
                                        );
                                        tuples[2][3].add(
                                            resolve(
                                                0,
                                                newDefer,
                                                isFunction(onRejected) ? onRejected : Thrower
                                            )
                                        );
                                    }).promise();
                                },
                                // Get a promise for this deferred
                                // If obj is provided, the promise aspect is added to the object
                                promise: function(obj) {
                                    return obj != null ? jQuery2.extend(obj, promise) : promise;
                                }
                            },
                            deferred = {};
                        jQuery2.each(tuples, function(i, tuple) {
                            var list = tuple[2],
                                stateString = tuple[5];
                            promise[tuple[1]] = list.add;
                            if (stateString) {
                                list.add(
                                    function() {
                                        state = stateString;
                                    },
                                    // rejected_callbacks.disable
                                    // fulfilled_callbacks.disable
                                    tuples[3 - i][2].disable,
                                    // rejected_handlers.disable
                                    // fulfilled_handlers.disable
                                    tuples[3 - i][3].disable,
                                    // progress_callbacks.lock
                                    tuples[0][2].lock,
                                    // progress_handlers.lock
                                    tuples[0][3].lock
                                );
                            }
                            list.add(tuple[3].fire);
                            deferred[tuple[0]] = function() {
                                deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments);
                                return this;
                            };
                            deferred[tuple[0] + "With"] = list.fireWith;
                        });
                        promise.promise(deferred);
                        if (func) {
                            func.call(deferred, deferred);
                        }
                        return deferred;
                    },
                    // Deferred helper
                    when: function(singleValue) {
                        var remaining = arguments.length,
                            i = remaining,
                            resolveContexts = Array(i),
                            resolveValues = slice.call(arguments),
                            master = jQuery2.Deferred(),
                            updateFunc = function(i2) {
                                return function(value) {
                                    resolveContexts[i2] = this;
                                    resolveValues[i2] = arguments.length > 1 ? slice.call(arguments) : value;
                                    if (!--remaining) {
                                        master.resolveWith(resolveContexts, resolveValues);
                                    }
                                };
                            };
                        if (remaining <= 1) {
                            adoptValue(
                                singleValue,
                                master.done(updateFunc(i)).resolve,
                                master.reject, !remaining
                            );
                            if (master.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
                                return master.then();
                            }
                        }
                        while (i--) {
                            adoptValue(resolveValues[i], updateFunc(i), master.reject);
                        }
                        return master.promise();
                    }
                });
                var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
                jQuery2.Deferred.exceptionHook = function(error, stack) {
                    if (window2.console && window2.console.warn && error && rerrorNames.test(error.name)) {
                        window2.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
                    }
                };
                jQuery2.readyException = function(error) {
                    window2.setTimeout(function() {
                        throw error;
                    });
                };
                var readyList = jQuery2.Deferred();
                jQuery2.fn.ready = function(fn) {
                    readyList.then(fn).catch(function(error) {
                        jQuery2.readyException(error);
                    });
                    return this;
                };
                jQuery2.extend({
                    // Is the DOM ready to be used? Set to true once it occurs.
                    isReady: false,
                    // A counter to track how many items to wait for before
                    // the ready event fires. See #6781
                    readyWait: 1,
                    // Handle when the DOM is ready
                    ready: function(wait) {
                        if (wait === true ? --jQuery2.readyWait : jQuery2.isReady) {
                            return;
                        }
                        jQuery2.isReady = true;
                        if (wait !== true && --jQuery2.readyWait > 0) {
                            return;
                        }
                        readyList.resolveWith(document2, [jQuery2]);
                    }
                });
                jQuery2.ready.then = readyList.then;

                function completed() {
                    document2.removeEventListener("DOMContentLoaded", completed);
                    window2.removeEventListener("load", completed);
                    jQuery2.ready();
                }
                if (document2.readyState === "complete" || document2.readyState !== "loading" && !document2.documentElement.doScroll) {
                    window2.setTimeout(jQuery2.ready);
                } else {
                    document2.addEventListener("DOMContentLoaded", completed);
                    window2.addEventListener("load", completed);
                }
                var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
                    var i = 0,
                        len = elems.length,
                        bulk = key == null;
                    if (toType(key) === "object") {
                        chainable = true;
                        for (i in key) {
                            access(elems, fn, i, key[i], true, emptyGet, raw);
                        }
                    } else if (value !== void 0) {
                        chainable = true;
                        if (!isFunction(value)) {
                            raw = true;
                        }
                        if (bulk) {
                            if (raw) {
                                fn.call(elems, value);
                                fn = null;
                            } else {
                                bulk = fn;
                                fn = function(elem, _key, value2) {
                                    return bulk.call(jQuery2(elem), value2);
                                };
                            }
                        }
                        if (fn) {
                            for (; i < len; i++) {
                                fn(
                                    elems[i],
                                    key,
                                    raw ? value : value.call(elems[i], i, fn(elems[i], key))
                                );
                            }
                        }
                    }
                    if (chainable) {
                        return elems;
                    }
                    if (bulk) {
                        return fn.call(elems);
                    }
                    return len ? fn(elems[0], key) : emptyGet;
                };
                var rmsPrefix = /^-ms-/,
                    rdashAlpha = /-([a-z])/g;

                function fcamelCase(_all, letter) {
                    return letter.toUpperCase();
                }

                function camelCase(string) {
                    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
                }
                var acceptData = function(owner) {
                    return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
                };

                function Data() {
                    this.expando = jQuery2.expando + Data.uid++;
                }
                Data.uid = 1;
                Data.prototype = {
                    cache: function(owner) {
                        var value = owner[this.expando];
                        if (!value) {
                            value = {};
                            if (acceptData(owner)) {
                                if (owner.nodeType) {
                                    owner[this.expando] = value;
                                } else {
                                    Object.defineProperty(owner, this.expando, {
                                        value,
                                        configurable: true
                                    });
                                }
                            }
                        }
                        return value;
                    },
                    set: function(owner, data, value) {
                        var prop, cache = this.cache(owner);
                        if (typeof data === "string") {
                            cache[camelCase(data)] = value;
                        } else {
                            for (prop in data) {
                                cache[camelCase(prop)] = data[prop];
                            }
                        }
                        return cache;
                    },
                    get: function(owner, key) {
                        return key === void 0 ? this.cache(owner) : (
                            // Always use camelCase key (gh-2257)
                            owner[this.expando] && owner[this.expando][camelCase(key)]
                        );
                    },
                    access: function(owner, key, value) {
                        if (key === void 0 || key && typeof key === "string" && value === void 0) {
                            return this.get(owner, key);
                        }
                        this.set(owner, key, value);
                        return value !== void 0 ? value : key;
                    },
                    remove: function(owner, key) {
                        var i, cache = owner[this.expando];
                        if (cache === void 0) {
                            return;
                        }
                        if (key !== void 0) {
                            if (Array.isArray(key)) {
                                key = key.map(camelCase);
                            } else {
                                key = camelCase(key);
                                key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
                            }
                            i = key.length;
                            while (i--) {
                                delete cache[key[i]];
                            }
                        }
                        if (key === void 0 || jQuery2.isEmptyObject(cache)) {
                            if (owner.nodeType) {
                                owner[this.expando] = void 0;
                            } else {
                                delete owner[this.expando];
                            }
                        }
                    },
                    hasData: function(owner) {
                        var cache = owner[this.expando];
                        return cache !== void 0 && !jQuery2.isEmptyObject(cache);
                    }
                };
                var dataPriv = new Data();
                var dataUser = new Data();
                var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                    rmultiDash = /[A-Z]/g;

                function getData(data) {
                    if (data === "true") {
                        return true;
                    }
                    if (data === "false") {
                        return false;
                    }
                    if (data === "null") {
                        return null;
                    }
                    if (data === +data + "") {
                        return +data;
                    }
                    if (rbrace.test(data)) {
                        return JSON.parse(data);
                    }
                    return data;
                }

                function dataAttr(elem, key, data) {
                    var name;
                    if (data === void 0 && elem.nodeType === 1) {
                        name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
                        data = elem.getAttribute(name);
                        if (typeof data === "string") {
                            try {
                                data = getData(data);
                            } catch (e) {}
                            dataUser.set(elem, key, data);
                        } else {
                            data = void 0;
                        }
                    }
                    return data;
                }
                jQuery2.extend({
                    hasData: function(elem) {
                        return dataUser.hasData(elem) || dataPriv.hasData(elem);
                    },
                    data: function(elem, name, data) {
                        return dataUser.access(elem, name, data);
                    },
                    removeData: function(elem, name) {
                        dataUser.remove(elem, name);
                    },
                    // TODO: Now that all calls to _data and _removeData have been replaced
                    // with direct calls to dataPriv methods, these can be deprecated.
                    _data: function(elem, name, data) {
                        return dataPriv.access(elem, name, data);
                    },
                    _removeData: function(elem, name) {
                        dataPriv.remove(elem, name);
                    }
                });
                jQuery2.fn.extend({
                    data: function(key, value) {
                        var i, name, data, elem = this[0],
                            attrs = elem && elem.attributes;
                        if (key === void 0) {
                            if (this.length) {
                                data = dataUser.get(elem);
                                if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                                    i = attrs.length;
                                    while (i--) {
                                        if (attrs[i]) {
                                            name = attrs[i].name;
                                            if (name.indexOf("data-") === 0) {
                                                name = camelCase(name.slice(5));
                                                dataAttr(elem, name, data[name]);
                                            }
                                        }
                                    }
                                    dataPriv.set(elem, "hasDataAttrs", true);
                                }
                            }
                            return data;
                        }
                        if (typeof key === "object") {
                            return this.each(function() {
                                dataUser.set(this, key);
                            });
                        }
                        return access(this, function(value2) {
                            var data2;
                            if (elem && value2 === void 0) {
                                data2 = dataUser.get(elem, key);
                                if (data2 !== void 0) {
                                    return data2;
                                }
                                data2 = dataAttr(elem, key);
                                if (data2 !== void 0) {
                                    return data2;
                                }
                                return;
                            }
                            this.each(function() {
                                dataUser.set(this, key, value2);
                            });
                        }, null, value, arguments.length > 1, null, true);
                    },
                    removeData: function(key) {
                        return this.each(function() {
                            dataUser.remove(this, key);
                        });
                    }
                });
                jQuery2.extend({
                    queue: function(elem, type, data) {
                        var queue2;
                        if (elem) {
                            type = (type || "fx") + "queue";
                            queue2 = dataPriv.get(elem, type);
                            if (data) {
                                if (!queue2 || Array.isArray(data)) {
                                    queue2 = dataPriv.access(elem, type, jQuery2.makeArray(data));
                                } else {
                                    queue2.push(data);
                                }
                            }
                            return queue2 || [];
                        }
                    },
                    dequeue: function(elem, type) {
                        type = type || "fx";
                        var queue2 = jQuery2.queue(elem, type),
                            startLength = queue2.length,
                            fn = queue2.shift(),
                            hooks = jQuery2._queueHooks(elem, type),
                            next = function() {
                                jQuery2.dequeue(elem, type);
                            };
                        if (fn === "inprogress") {
                            fn = queue2.shift();
                            startLength--;
                        }
                        if (fn) {
                            if (type === "fx") {
                                queue2.unshift("inprogress");
                            }
                            delete hooks.stop;
                            fn.call(elem, next, hooks);
                        }
                        if (!startLength && hooks) {
                            hooks.empty.fire();
                        }
                    },
                    // Not public - generate a queueHooks object, or return the current one
                    _queueHooks: function(elem, type) {
                        var key = type + "queueHooks";
                        return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                            empty: jQuery2.Callbacks("once memory").add(function() {
                                dataPriv.remove(elem, [type + "queue", key]);
                            })
                        });
                    }
                });
                jQuery2.fn.extend({
                    queue: function(type, data) {
                        var setter = 2;
                        if (typeof type !== "string") {
                            data = type;
                            type = "fx";
                            setter--;
                        }
                        if (arguments.length < setter) {
                            return jQuery2.queue(this[0], type);
                        }
                        return data === void 0 ? this : this.each(function() {
                            var queue2 = jQuery2.queue(this, type, data);
                            jQuery2._queueHooks(this, type);
                            if (type === "fx" && queue2[0] !== "inprogress") {
                                jQuery2.dequeue(this, type);
                            }
                        });
                    },
                    dequeue: function(type) {
                        return this.each(function() {
                            jQuery2.dequeue(this, type);
                        });
                    },
                    clearQueue: function(type) {
                        return this.queue(type || "fx", []);
                    },
                    // Get a promise resolved when queues of a certain type
                    // are emptied (fx is the type by default)
                    promise: function(type, obj) {
                        var tmp, count = 1,
                            defer = jQuery2.Deferred(),
                            elements = this,
                            i = this.length,
                            resolve = function() {
                                if (!--count) {
                                    defer.resolveWith(elements, [elements]);
                                }
                            };
                        if (typeof type !== "string") {
                            obj = type;
                            type = void 0;
                        }
                        type = type || "fx";
                        while (i--) {
                            tmp = dataPriv.get(elements[i], type + "queueHooks");
                            if (tmp && tmp.empty) {
                                count++;
                                tmp.empty.add(resolve);
                            }
                        }
                        resolve();
                        return defer.promise(obj);
                    }
                });
                var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
                var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
                var cssExpand = ["Top", "Right", "Bottom", "Left"];
                var documentElement = document2.documentElement;
                var isAttached = function(elem) {
                        return jQuery2.contains(elem.ownerDocument, elem);
                    },
                    composed = {
                        composed: true
                    };
                if (documentElement.getRootNode) {
                    isAttached = function(elem) {
                        return jQuery2.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
                    };
                }
                var isHiddenWithinTree = function(elem, el) {
                    elem = el || elem;
                    return elem.style.display === "none" || elem.style.display === "" && // Otherwise, check computed style
                        // Support: Firefox <=43 - 45
                        // Disconnected elements can have computed display: none, so first confirm that elem is
                        // in the document.
                        isAttached(elem) && jQuery2.css(elem, "display") === "none";
                };

                function adjustCSS(elem, prop, valueParts, tween) {
                    var adjusted, scale, maxIterations = 20,
                        currentValue = tween ? function() {
                            return tween.cur();
                        } : function() {
                            return jQuery2.css(elem, prop, "");
                        },
                        initial = currentValue(),
                        unit = valueParts && valueParts[3] || (jQuery2.cssNumber[prop] ? "" : "px"),
                        initialInUnit = elem.nodeType && (jQuery2.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery2.css(elem, prop));
                    if (initialInUnit && initialInUnit[3] !== unit) {
                        initial = initial / 2;
                        unit = unit || initialInUnit[3];
                        initialInUnit = +initial || 1;
                        while (maxIterations--) {
                            jQuery2.style(elem, prop, initialInUnit + unit);
                            if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
                                maxIterations = 0;
                            }
                            initialInUnit = initialInUnit / scale;
                        }
                        initialInUnit = initialInUnit * 2;
                        jQuery2.style(elem, prop, initialInUnit + unit);
                        valueParts = valueParts || [];
                    }
                    if (valueParts) {
                        initialInUnit = +initialInUnit || +initial || 0;
                        adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
                        if (tween) {
                            tween.unit = unit;
                            tween.start = initialInUnit;
                            tween.end = adjusted;
                        }
                    }
                    return adjusted;
                }
                var defaultDisplayMap = {};

                function getDefaultDisplay(elem) {
                    var temp, doc = elem.ownerDocument,
                        nodeName2 = elem.nodeName,
                        display = defaultDisplayMap[nodeName2];
                    if (display) {
                        return display;
                    }
                    temp = doc.body.appendChild(doc.createElement(nodeName2));
                    display = jQuery2.css(temp, "display");
                    temp.parentNode.removeChild(temp);
                    if (display === "none") {
                        display = "block";
                    }
                    defaultDisplayMap[nodeName2] = display;
                    return display;
                }

                function showHide(elements, show) {
                    var display, elem, values = [],
                        index = 0,
                        length = elements.length;
                    for (; index < length; index++) {
                        elem = elements[index];
                        if (!elem.style) {
                            continue;
                        }
                        display = elem.style.display;
                        if (show) {
                            if (display === "none") {
                                values[index] = dataPriv.get(elem, "display") || null;
                                if (!values[index]) {
                                    elem.style.display = "";
                                }
                            }
                            if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                                values[index] = getDefaultDisplay(elem);
                            }
                        } else {
                            if (display !== "none") {
                                values[index] = "none";
                                dataPriv.set(elem, "display", display);
                            }
                        }
                    }
                    for (index = 0; index < length; index++) {
                        if (values[index] != null) {
                            elements[index].style.display = values[index];
                        }
                    }
                    return elements;
                }
                jQuery2.fn.extend({
                    show: function() {
                        return showHide(this, true);
                    },
                    hide: function() {
                        return showHide(this);
                    },
                    toggle: function(state) {
                        if (typeof state === "boolean") {
                            return state ? this.show() : this.hide();
                        }
                        return this.each(function() {
                            if (isHiddenWithinTree(this)) {
                                jQuery2(this).show();
                            } else {
                                jQuery2(this).hide();
                            }
                        });
                    }
                });
                var rcheckableType = /^(?:checkbox|radio)$/i;
                var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
                var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
                (function() {
                    var fragment = document2.createDocumentFragment(),
                        div = fragment.appendChild(document2.createElement("div")),
                        input = document2.createElement("input");
                    input.setAttribute("type", "radio");
                    input.setAttribute("checked", "checked");
                    input.setAttribute("name", "t");
                    div.appendChild(input);
                    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
                    div.innerHTML = "<textarea>x</textarea>";
                    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
                    div.innerHTML = "<option></option>";
                    support.option = !!div.lastChild;
                })();
                var wrapMap = {
                    // XHTML parsers do not magically insert elements in the
                    // same way that tag soup parsers do. So we cannot shorten
                    // this by omitting <tbody> or other required elements.
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""]
                };
                wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
                wrapMap.th = wrapMap.td;
                if (!support.option) {
                    wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
                }

                function getAll(context, tag) {
                    var ret;
                    if (typeof context.getElementsByTagName !== "undefined") {
                        ret = context.getElementsByTagName(tag || "*");
                    } else if (typeof context.querySelectorAll !== "undefined") {
                        ret = context.querySelectorAll(tag || "*");
                    } else {
                        ret = [];
                    }
                    if (tag === void 0 || tag && nodeName(context, tag)) {
                        return jQuery2.merge([context], ret);
                    }
                    return ret;
                }

                function setGlobalEval(elems, refElements) {
                    var i = 0,
                        l = elems.length;
                    for (; i < l; i++) {
                        dataPriv.set(
                            elems[i],
                            "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval")
                        );
                    }
                }
                var rhtml = /<|&#?\w+;/;

                function buildFragment(elems, context, scripts, selection, ignored) {
                    var elem, tmp, tag, wrap, attached, j, fragment = context.createDocumentFragment(),
                        nodes = [],
                        i = 0,
                        l = elems.length;
                    for (; i < l; i++) {
                        elem = elems[i];
                        if (elem || elem === 0) {
                            if (toType(elem) === "object") {
                                jQuery2.merge(nodes, elem.nodeType ? [elem] : elem);
                            } else if (!rhtml.test(elem)) {
                                nodes.push(context.createTextNode(elem));
                            } else {
                                tmp = tmp || fragment.appendChild(context.createElement("div"));
                                tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                                wrap = wrapMap[tag] || wrapMap._default;
                                tmp.innerHTML = wrap[1] + jQuery2.htmlPrefilter(elem) + wrap[2];
                                j = wrap[0];
                                while (j--) {
                                    tmp = tmp.lastChild;
                                }
                                jQuery2.merge(nodes, tmp.childNodes);
                                tmp = fragment.firstChild;
                                tmp.textContent = "";
                            }
                        }
                    }
                    fragment.textContent = "";
                    i = 0;
                    while (elem = nodes[i++]) {
                        if (selection && jQuery2.inArray(elem, selection) > -1) {
                            if (ignored) {
                                ignored.push(elem);
                            }
                            continue;
                        }
                        attached = isAttached(elem);
                        tmp = getAll(fragment.appendChild(elem), "script");
                        if (attached) {
                            setGlobalEval(tmp);
                        }
                        if (scripts) {
                            j = 0;
                            while (elem = tmp[j++]) {
                                if (rscriptType.test(elem.type || "")) {
                                    scripts.push(elem);
                                }
                            }
                        }
                    }
                    return fragment;
                }
                var rkeyEvent = /^key/,
                    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

                function returnTrue() {
                    return true;
                }

                function returnFalse() {
                    return false;
                }

                function expectSync(elem, type) {
                    return elem === safeActiveElement() === (type === "focus");
                }

                function safeActiveElement() {
                    try {
                        return document2.activeElement;
                    } catch (err) {}
                }

                function on2(elem, types, selector, data, fn, one) {
                    var origFn, type;
                    if (typeof types === "object") {
                        if (typeof selector !== "string") {
                            data = data || selector;
                            selector = void 0;
                        }
                        for (type in types) {
                            on2(elem, type, selector, data, types[type], one);
                        }
                        return elem;
                    }
                    if (data == null && fn == null) {
                        fn = selector;
                        data = selector = void 0;
                    } else if (fn == null) {
                        if (typeof selector === "string") {
                            fn = data;
                            data = void 0;
                        } else {
                            fn = data;
                            data = selector;
                            selector = void 0;
                        }
                    }
                    if (fn === false) {
                        fn = returnFalse;
                    } else if (!fn) {
                        return elem;
                    }
                    if (one === 1) {
                        origFn = fn;
                        fn = function(event) {
                            jQuery2().off(event);
                            return origFn.apply(this, arguments);
                        };
                        fn.guid = origFn.guid || (origFn.guid = jQuery2.guid++);
                    }
                    return elem.each(function() {
                        jQuery2.event.add(this, types, fn, data, selector);
                    });
                }
                jQuery2.event = {
                    global: {},
                    add: function(elem, types, handler, data, selector) {
                        var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
                        if (!acceptData(elem)) {
                            return;
                        }
                        if (handler.handler) {
                            handleObjIn = handler;
                            handler = handleObjIn.handler;
                            selector = handleObjIn.selector;
                        }
                        if (selector) {
                            jQuery2.find.matchesSelector(documentElement, selector);
                        }
                        if (!handler.guid) {
                            handler.guid = jQuery2.guid++;
                        }
                        if (!(events = elemData.events)) {
                            events = elemData.events = /* @__PURE__ */ Object.create(null);
                        }
                        if (!(eventHandle = elemData.handle)) {
                            eventHandle = elemData.handle = function(e) {
                                return typeof jQuery2 !== "undefined" && jQuery2.event.triggered !== e.type ? jQuery2.event.dispatch.apply(elem, arguments) : void 0;
                            };
                        }
                        types = (types || "").match(rnothtmlwhite) || [""];
                        t = types.length;
                        while (t--) {
                            tmp = rtypenamespace.exec(types[t]) || [];
                            type = origType = tmp[1];
                            namespaces = (tmp[2] || "").split(".").sort();
                            if (!type) {
                                continue;
                            }
                            special = jQuery2.event.special[type] || {};
                            type = (selector ? special.delegateType : special.bindType) || type;
                            special = jQuery2.event.special[type] || {};
                            handleObj = jQuery2.extend({
                                type,
                                origType,
                                data,
                                handler,
                                guid: handler.guid,
                                selector,
                                needsContext: selector && jQuery2.expr.match.needsContext.test(selector),
                                namespace: namespaces.join(".")
                            }, handleObjIn);
                            if (!(handlers = events[type])) {
                                handlers = events[type] = [];
                                handlers.delegateCount = 0;
                                if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                                    if (elem.addEventListener) {
                                        elem.addEventListener(type, eventHandle);
                                    }
                                }
                            }
                            if (special.add) {
                                special.add.call(elem, handleObj);
                                if (!handleObj.handler.guid) {
                                    handleObj.handler.guid = handler.guid;
                                }
                            }
                            if (selector) {
                                handlers.splice(handlers.delegateCount++, 0, handleObj);
                            } else {
                                handlers.push(handleObj);
                            }
                            jQuery2.event.global[type] = true;
                        }
                    },
                    // Detach an event or set of events from an element
                    remove: function(elem, types, handler, selector, mappedTypes) {
                        var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
                        if (!elemData || !(events = elemData.events)) {
                            return;
                        }
                        types = (types || "").match(rnothtmlwhite) || [""];
                        t = types.length;
                        while (t--) {
                            tmp = rtypenamespace.exec(types[t]) || [];
                            type = origType = tmp[1];
                            namespaces = (tmp[2] || "").split(".").sort();
                            if (!type) {
                                for (type in events) {
                                    jQuery2.event.remove(elem, type + types[t], handler, selector, true);
                                }
                                continue;
                            }
                            special = jQuery2.event.special[type] || {};
                            type = (selector ? special.delegateType : special.bindType) || type;
                            handlers = events[type] || [];
                            tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                            origCount = j = handlers.length;
                            while (j--) {
                                handleObj = handlers[j];
                                if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                                    handlers.splice(j, 1);
                                    if (handleObj.selector) {
                                        handlers.delegateCount--;
                                    }
                                    if (special.remove) {
                                        special.remove.call(elem, handleObj);
                                    }
                                }
                            }
                            if (origCount && !handlers.length) {
                                if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                                    jQuery2.removeEvent(elem, type, elemData.handle);
                                }
                                delete events[type];
                            }
                        }
                        if (jQuery2.isEmptyObject(events)) {
                            dataPriv.remove(elem, "handle events");
                        }
                    },
                    dispatch: function(nativeEvent) {
                        var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length),
                            event = jQuery2.event.fix(nativeEvent),
                            handlers = (dataPriv.get(this, "events") || /* @__PURE__ */ Object.create(null))[event.type] || [],
                            special = jQuery2.event.special[event.type] || {};
                        args[0] = event;
                        for (i = 1; i < arguments.length; i++) {
                            args[i] = arguments[i];
                        }
                        event.delegateTarget = this;
                        if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                            return;
                        }
                        handlerQueue = jQuery2.event.handlers.call(this, event, handlers);
                        i = 0;
                        while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                            event.currentTarget = matched.elem;
                            j = 0;
                            while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                                if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
                                    event.handleObj = handleObj;
                                    event.data = handleObj.data;
                                    ret = ((jQuery2.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                                    if (ret !== void 0) {
                                        if ((event.result = ret) === false) {
                                            event.preventDefault();
                                            event.stopPropagation();
                                        }
                                    }
                                }
                            }
                        }
                        if (special.postDispatch) {
                            special.postDispatch.call(this, event);
                        }
                        return event.result;
                    },
                    handlers: function(event, handlers) {
                        var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [],
                            delegateCount = handlers.delegateCount,
                            cur = event.target;
                        if (delegateCount && // Support: IE <=9
                            // Black-hole SVG <use> instance trees (trac-13180)
                            cur.nodeType && // Support: Firefox <=42
                            // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
                            // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
                            // Support: IE 11 only
                            // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
                            !(event.type === "click" && event.button >= 1)) {
                            for (; cur !== this; cur = cur.parentNode || this) {
                                if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                                    matchedHandlers = [];
                                    matchedSelectors = {};
                                    for (i = 0; i < delegateCount; i++) {
                                        handleObj = handlers[i];
                                        sel = handleObj.selector + " ";
                                        if (matchedSelectors[sel] === void 0) {
                                            matchedSelectors[sel] = handleObj.needsContext ? jQuery2(sel, this).index(cur) > -1 : jQuery2.find(sel, this, null, [cur]).length;
                                        }
                                        if (matchedSelectors[sel]) {
                                            matchedHandlers.push(handleObj);
                                        }
                                    }
                                    if (matchedHandlers.length) {
                                        handlerQueue.push({
                                            elem: cur,
                                            handlers: matchedHandlers
                                        });
                                    }
                                }
                            }
                        }
                        cur = this;
                        if (delegateCount < handlers.length) {
                            handlerQueue.push({
                                elem: cur,
                                handlers: handlers.slice(delegateCount)
                            });
                        }
                        return handlerQueue;
                    },
                    addProp: function(name, hook) {
                        Object.defineProperty(jQuery2.Event.prototype, name, {
                            enumerable: true,
                            configurable: true,
                            get: isFunction(hook) ? function() {
                                if (this.originalEvent) {
                                    return hook(this.originalEvent);
                                }
                            } : function() {
                                if (this.originalEvent) {
                                    return this.originalEvent[name];
                                }
                            },
                            set: function(value) {
                                Object.defineProperty(this, name, {
                                    enumerable: true,
                                    configurable: true,
                                    writable: true,
                                    value
                                });
                            }
                        });
                    },
                    fix: function(originalEvent) {
                        return originalEvent[jQuery2.expando] ? originalEvent : new jQuery2.Event(originalEvent);
                    },
                    special: {
                        load: {
                            // Prevent triggered image.load events from bubbling to window.load
                            noBubble: true
                        },
                        click: {
                            // Utilize native event to ensure correct state for checkable inputs
                            setup: function(data) {
                                var el = this || data;
                                if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                                    leverageNative(el, "click", returnTrue);
                                }
                                return false;
                            },
                            trigger: function(data) {
                                var el = this || data;
                                if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                                    leverageNative(el, "click");
                                }
                                return true;
                            },
                            // For cross-browser consistency, suppress native .click() on links
                            // Also prevent it if we're currently inside a leveraged native-event stack
                            _default: function(event) {
                                var target = event.target;
                                return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
                            }
                        },
                        beforeunload: {
                            postDispatch: function(event) {
                                if (event.result !== void 0 && event.originalEvent) {
                                    event.originalEvent.returnValue = event.result;
                                }
                            }
                        }
                    }
                };

                function leverageNative(el, type, expectSync2) {
                    if (!expectSync2) {
                        if (dataPriv.get(el, type) === void 0) {
                            jQuery2.event.add(el, type, returnTrue);
                        }
                        return;
                    }
                    dataPriv.set(el, type, false);
                    jQuery2.event.add(el, type, {
                        namespace: false,
                        handler: function(event) {
                            var notAsync, result, saved = dataPriv.get(this, type);
                            if (event.isTrigger & 1 && this[type]) {
                                if (!saved.length) {
                                    saved = slice.call(arguments);
                                    dataPriv.set(this, type, saved);
                                    notAsync = expectSync2(this, type);
                                    this[type]();
                                    result = dataPriv.get(this, type);
                                    if (saved !== result || notAsync) {
                                        dataPriv.set(this, type, false);
                                    } else {
                                        result = {};
                                    }
                                    if (saved !== result) {
                                        event.stopImmediatePropagation();
                                        event.preventDefault();
                                        return result.value;
                                    }
                                } else if ((jQuery2.event.special[type] || {}).delegateType) {
                                    event.stopPropagation();
                                }
                            } else if (saved.length) {
                                dataPriv.set(this, type, {
                                    value: jQuery2.event.trigger(
                                        // Support: IE <=9 - 11+
                                        // Extend with the prototype to reset the above stopImmediatePropagation()
                                        jQuery2.extend(saved[0], jQuery2.Event.prototype),
                                        saved.slice(1),
                                        this
                                    )
                                });
                                event.stopImmediatePropagation();
                            }
                        }
                    });
                }
                jQuery2.removeEvent = function(elem, type, handle) {
                    if (elem.removeEventListener) {
                        elem.removeEventListener(type, handle);
                    }
                };
                jQuery2.Event = function(src, props) {
                    if (!(this instanceof jQuery2.Event)) {
                        return new jQuery2.Event(src, props);
                    }
                    if (src && src.type) {
                        this.originalEvent = src;
                        this.type = src.type;
                        this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === void 0 && // Support: Android <=2.3 only
                            src.returnValue === false ? returnTrue : returnFalse;
                        this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
                        this.currentTarget = src.currentTarget;
                        this.relatedTarget = src.relatedTarget;
                    } else {
                        this.type = src;
                    }
                    if (props) {
                        jQuery2.extend(this, props);
                    }
                    this.timeStamp = src && src.timeStamp || Date.now();
                    this[jQuery2.expando] = true;
                };
                jQuery2.Event.prototype = {
                    constructor: jQuery2.Event,
                    isDefaultPrevented: returnFalse,
                    isPropagationStopped: returnFalse,
                    isImmediatePropagationStopped: returnFalse,
                    isSimulated: false,
                    preventDefault: function() {
                        var e = this.originalEvent;
                        this.isDefaultPrevented = returnTrue;
                        if (e && !this.isSimulated) {
                            e.preventDefault();
                        }
                    },
                    stopPropagation: function() {
                        var e = this.originalEvent;
                        this.isPropagationStopped = returnTrue;
                        if (e && !this.isSimulated) {
                            e.stopPropagation();
                        }
                    },
                    stopImmediatePropagation: function() {
                        var e = this.originalEvent;
                        this.isImmediatePropagationStopped = returnTrue;
                        if (e && !this.isSimulated) {
                            e.stopImmediatePropagation();
                        }
                        this.stopPropagation();
                    }
                };
                jQuery2.each({
                    altKey: true,
                    bubbles: true,
                    cancelable: true,
                    changedTouches: true,
                    ctrlKey: true,
                    detail: true,
                    eventPhase: true,
                    metaKey: true,
                    pageX: true,
                    pageY: true,
                    shiftKey: true,
                    view: true,
                    "char": true,
                    code: true,
                    charCode: true,
                    key: true,
                    keyCode: true,
                    button: true,
                    buttons: true,
                    clientX: true,
                    clientY: true,
                    offsetX: true,
                    offsetY: true,
                    pointerId: true,
                    pointerType: true,
                    screenX: true,
                    screenY: true,
                    targetTouches: true,
                    toElement: true,
                    touches: true,
                    which: function(event) {
                        var button = event.button;
                        if (event.which == null && rkeyEvent.test(event.type)) {
                            return event.charCode != null ? event.charCode : event.keyCode;
                        }
                        if (!event.which && button !== void 0 && rmouseEvent.test(event.type)) {
                            if (button & 1) {
                                return 1;
                            }
                            if (button & 2) {
                                return 3;
                            }
                            if (button & 4) {
                                return 2;
                            }
                            return 0;
                        }
                        return event.which;
                    }
                }, jQuery2.event.addProp);
                jQuery2.each({
                    focus: "focusin",
                    blur: "focusout"
                }, function(type, delegateType) {
                    jQuery2.event.special[type] = {
                        // Utilize native event if possible so blur/focus sequence is correct
                        setup: function() {
                            leverageNative(this, type, expectSync);
                            return false;
                        },
                        trigger: function() {
                            leverageNative(this, type);
                            return true;
                        },
                        delegateType
                    };
                });
                jQuery2.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    pointerenter: "pointerover",
                    pointerleave: "pointerout"
                }, function(orig, fix) {
                    jQuery2.event.special[orig] = {
                        delegateType: fix,
                        bindType: fix,
                        handle: function(event) {
                            var ret, target = this,
                                related = event.relatedTarget,
                                handleObj = event.handleObj;
                            if (!related || related !== target && !jQuery2.contains(target, related)) {
                                event.type = handleObj.origType;
                                ret = handleObj.handler.apply(this, arguments);
                                event.type = fix;
                            }
                            return ret;
                        }
                    };
                });
                jQuery2.fn.extend({
                    on: function(types, selector, data, fn) {
                        return on2(this, types, selector, data, fn);
                    },
                    one: function(types, selector, data, fn) {
                        return on2(this, types, selector, data, fn, 1);
                    },
                    off: function(types, selector, fn) {
                        var handleObj, type;
                        if (types && types.preventDefault && types.handleObj) {
                            handleObj = types.handleObj;
                            jQuery2(types.delegateTarget).off(
                                handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                                handleObj.selector,
                                handleObj.handler
                            );
                            return this;
                        }
                        if (typeof types === "object") {
                            for (type in types) {
                                this.off(type, selector, types[type]);
                            }
                            return this;
                        }
                        if (selector === false || typeof selector === "function") {
                            fn = selector;
                            selector = void 0;
                        }
                        if (fn === false) {
                            fn = returnFalse;
                        }
                        return this.each(function() {
                            jQuery2.event.remove(this, types, fn, selector);
                        });
                    }
                });
                var rnoInnerhtml = /<script|<style|<link/i,
                    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
                    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

                function manipulationTarget(elem, content) {
                    if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
                        return jQuery2(elem).children("tbody")[0] || elem;
                    }
                    return elem;
                }

                function disableScript(elem) {
                    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
                    return elem;
                }

                function restoreScript(elem) {
                    if ((elem.type || "").slice(0, 5) === "true/") {
                        elem.type = elem.type.slice(5);
                    } else {
                        elem.removeAttribute("type");
                    }
                    return elem;
                }

                function cloneCopyEvent(src, dest) {
                    var i, l, type, pdataOld, udataOld, udataCur, events;
                    if (dest.nodeType !== 1) {
                        return;
                    }
                    if (dataPriv.hasData(src)) {
                        pdataOld = dataPriv.get(src);
                        events = pdataOld.events;
                        if (events) {
                            dataPriv.remove(dest, "handle events");
                            for (type in events) {
                                for (i = 0, l = events[type].length; i < l; i++) {
                                    jQuery2.event.add(dest, type, events[type][i]);
                                }
                            }
                        }
                    }
                    if (dataUser.hasData(src)) {
                        udataOld = dataUser.access(src);
                        udataCur = jQuery2.extend({}, udataOld);
                        dataUser.set(dest, udataCur);
                    }
                }

                function fixInput(src, dest) {
                    var nodeName2 = dest.nodeName.toLowerCase();
                    if (nodeName2 === "input" && rcheckableType.test(src.type)) {
                        dest.checked = src.checked;
                    } else if (nodeName2 === "input" || nodeName2 === "textarea") {
                        dest.defaultValue = src.defaultValue;
                    }
                }

                function domManip(collection, args, callback, ignored) {
                    args = flat(args);
                    var fragment, first, scripts, hasScripts, node, doc, i = 0,
                        l = collection.length,
                        iNoClone = l - 1,
                        value = args[0],
                        valueIsFunction = isFunction(value);
                    if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
                        return collection.each(function(index) {
                            var self = collection.eq(index);
                            if (valueIsFunction) {
                                args[0] = value.call(this, index, self.html());
                            }
                            domManip(self, args, callback, ignored);
                        });
                    }
                    if (l) {
                        fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
                        first = fragment.firstChild;
                        if (fragment.childNodes.length === 1) {
                            fragment = first;
                        }
                        if (first || ignored) {
                            scripts = jQuery2.map(getAll(fragment, "script"), disableScript);
                            hasScripts = scripts.length;
                            for (; i < l; i++) {
                                node = fragment;
                                if (i !== iNoClone) {
                                    node = jQuery2.clone(node, true, true);
                                    if (hasScripts) {
                                        jQuery2.merge(scripts, getAll(node, "script"));
                                    }
                                }
                                callback.call(collection[i], node, i);
                            }
                            if (hasScripts) {
                                doc = scripts[scripts.length - 1].ownerDocument;
                                jQuery2.map(scripts, restoreScript);
                                for (i = 0; i < hasScripts; i++) {
                                    node = scripts[i];
                                    if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery2.contains(doc, node)) {
                                        if (node.src && (node.type || "").toLowerCase() !== "module") {
                                            if (jQuery2._evalUrl && !node.noModule) {
                                                jQuery2._evalUrl(node.src, {
                                                    nonce: node.nonce || node.getAttribute("nonce")
                                                }, doc);
                                            }
                                        } else {
                                            DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return collection;
                }

                function remove(elem, selector, keepData) {
                    var node, nodes = selector ? jQuery2.filter(selector, elem) : elem,
                        i = 0;
                    for (;
                        (node = nodes[i]) != null; i++) {
                        if (!keepData && node.nodeType === 1) {
                            jQuery2.cleanData(getAll(node));
                        }
                        if (node.parentNode) {
                            if (keepData && isAttached(node)) {
                                setGlobalEval(getAll(node, "script"));
                            }
                            node.parentNode.removeChild(node);
                        }
                    }
                    return elem;
                }
                jQuery2.extend({
                    htmlPrefilter: function(html) {
                        return html;
                    },
                    clone: function(elem, dataAndEvents, deepDataAndEvents) {
                        var i, l, srcElements, destElements, clone = elem.cloneNode(true),
                            inPage = isAttached(elem);
                        if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery2.isXMLDoc(elem)) {
                            destElements = getAll(clone);
                            srcElements = getAll(elem);
                            for (i = 0, l = srcElements.length; i < l; i++) {
                                fixInput(srcElements[i], destElements[i]);
                            }
                        }
                        if (dataAndEvents) {
                            if (deepDataAndEvents) {
                                srcElements = srcElements || getAll(elem);
                                destElements = destElements || getAll(clone);
                                for (i = 0, l = srcElements.length; i < l; i++) {
                                    cloneCopyEvent(srcElements[i], destElements[i]);
                                }
                            } else {
                                cloneCopyEvent(elem, clone);
                            }
                        }
                        destElements = getAll(clone, "script");
                        if (destElements.length > 0) {
                            setGlobalEval(destElements, !inPage && getAll(elem, "script"));
                        }
                        return clone;
                    },
                    cleanData: function(elems) {
                        var data, elem, type, special = jQuery2.event.special,
                            i = 0;
                        for (;
                            (elem = elems[i]) !== void 0; i++) {
                            if (acceptData(elem)) {
                                if (data = elem[dataPriv.expando]) {
                                    if (data.events) {
                                        for (type in data.events) {
                                            if (special[type]) {
                                                jQuery2.event.remove(elem, type);
                                            } else {
                                                jQuery2.removeEvent(elem, type, data.handle);
                                            }
                                        }
                                    }
                                    elem[dataPriv.expando] = void 0;
                                }
                                if (elem[dataUser.expando]) {
                                    elem[dataUser.expando] = void 0;
                                }
                            }
                        }
                    }
                });
                jQuery2.fn.extend({
                    detach: function(selector) {
                        return remove(this, selector, true);
                    },
                    remove: function(selector) {
                        return remove(this, selector);
                    },
                    text: function(value) {
                        return access(this, function(value2) {
                            return value2 === void 0 ? jQuery2.text(this) : this.empty().each(function() {
                                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                                    this.textContent = value2;
                                }
                            });
                        }, null, value, arguments.length);
                    },
                    append: function() {
                        return domManip(this, arguments, function(elem) {
                            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                                var target = manipulationTarget(this, elem);
                                target.appendChild(elem);
                            }
                        });
                    },
                    prepend: function() {
                        return domManip(this, arguments, function(elem) {
                            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                                var target = manipulationTarget(this, elem);
                                target.insertBefore(elem, target.firstChild);
                            }
                        });
                    },
                    before: function() {
                        return domManip(this, arguments, function(elem) {
                            if (this.parentNode) {
                                this.parentNode.insertBefore(elem, this);
                            }
                        });
                    },
                    after: function() {
                        return domManip(this, arguments, function(elem) {
                            if (this.parentNode) {
                                this.parentNode.insertBefore(elem, this.nextSibling);
                            }
                        });
                    },
                    empty: function() {
                        var elem, i = 0;
                        for (;
                            (elem = this[i]) != null; i++) {
                            if (elem.nodeType === 1) {
                                jQuery2.cleanData(getAll(elem, false));
                                elem.textContent = "";
                            }
                        }
                        return this;
                    },
                    clone: function(dataAndEvents, deepDataAndEvents) {
                        dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
                        deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
                        return this.map(function() {
                            return jQuery2.clone(this, dataAndEvents, deepDataAndEvents);
                        });
                    },
                    html: function(value) {
                        return access(this, function(value2) {
                            var elem = this[0] || {},
                                i = 0,
                                l = this.length;
                            if (value2 === void 0 && elem.nodeType === 1) {
                                return elem.innerHTML;
                            }
                            if (typeof value2 === "string" && !rnoInnerhtml.test(value2) && !wrapMap[(rtagName.exec(value2) || ["", ""])[1].toLowerCase()]) {
                                value2 = jQuery2.htmlPrefilter(value2);
                                try {
                                    for (; i < l; i++) {
                                        elem = this[i] || {};
                                        if (elem.nodeType === 1) {
                                            jQuery2.cleanData(getAll(elem, false));
                                            elem.innerHTML = value2;
                                        }
                                    }
                                    elem = 0;
                                } catch (e) {}
                            }
                            if (elem) {
                                this.empty().append(value2);
                            }
                        }, null, value, arguments.length);
                    },
                    replaceWith: function() {
                        var ignored = [];
                        return domManip(this, arguments, function(elem) {
                            var parent = this.parentNode;
                            if (jQuery2.inArray(this, ignored) < 0) {
                                jQuery2.cleanData(getAll(this));
                                if (parent) {
                                    parent.replaceChild(elem, this);
                                }
                            }
                        }, ignored);
                    }
                });
                jQuery2.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, function(name, original) {
                    jQuery2.fn[name] = function(selector) {
                        var elems, ret = [],
                            insert = jQuery2(selector),
                            last = insert.length - 1,
                            i = 0;
                        for (; i <= last; i++) {
                            elems = i === last ? this : this.clone(true);
                            jQuery2(insert[i])[original](elems);
                            push.apply(ret, elems.get());
                        }
                        return this.pushStack(ret);
                    };
                });
                var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
                var getStyles = function(elem) {
                    var view = elem.ownerDocument.defaultView;
                    if (!view || !view.opener) {
                        view = window2;
                    }
                    return view.getComputedStyle(elem);
                };
                var swap = function(elem, options, callback) {
                    var ret, name, old = {};
                    for (name in options) {
                        old[name] = elem.style[name];
                        elem.style[name] = options[name];
                    }
                    ret = callback.call(elem);
                    for (name in options) {
                        elem.style[name] = old[name];
                    }
                    return ret;
                };
                var rboxStyle = new RegExp(cssExpand.join("|"), "i");
                (function() {
                    function computeStyleTests() {
                        if (!div) {
                            return;
                        }
                        container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
                        div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
                        documentElement.appendChild(container).appendChild(div);
                        var divStyle = window2.getComputedStyle(div);
                        pixelPositionVal = divStyle.top !== "1%";
                        reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
                        div.style.right = "60%";
                        pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
                        boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
                        div.style.position = "absolute";
                        scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
                        documentElement.removeChild(container);
                        div = null;
                    }

                    function roundPixelMeasures(measure) {
                        return Math.round(parseFloat(measure));
                    }
                    var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableTrDimensionsVal, reliableMarginLeftVal, container = document2.createElement("div"),
                        div = document2.createElement("div");
                    if (!div.style) {
                        return;
                    }
                    div.style.backgroundClip = "content-box";
                    div.cloneNode(true).style.backgroundClip = "";
                    support.clearCloneStyle = div.style.backgroundClip === "content-box";
                    jQuery2.extend(support, {
                        boxSizingReliable: function() {
                            computeStyleTests();
                            return boxSizingReliableVal;
                        },
                        pixelBoxStyles: function() {
                            computeStyleTests();
                            return pixelBoxStylesVal;
                        },
                        pixelPosition: function() {
                            computeStyleTests();
                            return pixelPositionVal;
                        },
                        reliableMarginLeft: function() {
                            computeStyleTests();
                            return reliableMarginLeftVal;
                        },
                        scrollboxSize: function() {
                            computeStyleTests();
                            return scrollboxSizeVal;
                        },
                        // Support: IE 9 - 11+, Edge 15 - 18+
                        // IE/Edge misreport `getComputedStyle` of table rows with width/height
                        // set in CSS while `offset*` properties report correct values.
                        // Behavior in IE 9 is more subtle than in newer versions & it passes
                        // some versions of this test; make sure not to make it pass there!
                        reliableTrDimensions: function() {
                            var table, tr, trChild, trStyle;
                            if (reliableTrDimensionsVal == null) {
                                table = document2.createElement("table");
                                tr = document2.createElement("tr");
                                trChild = document2.createElement("div");
                                table.style.cssText = "position:absolute;left:-11111px";
                                tr.style.height = "1px";
                                trChild.style.height = "9px";
                                documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
                                trStyle = window2.getComputedStyle(tr);
                                reliableTrDimensionsVal = parseInt(trStyle.height) > 3;
                                documentElement.removeChild(table);
                            }
                            return reliableTrDimensionsVal;
                        }
                    });
                })();

                function curCSS(elem, name, computed2) {
                    var width, minWidth, maxWidth, ret, style = elem.style;
                    computed2 = computed2 || getStyles(elem);
                    if (computed2) {
                        ret = computed2.getPropertyValue(name) || computed2[name];
                        if (ret === "" && !isAttached(elem)) {
                            ret = jQuery2.style(elem, name);
                        }
                        if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
                            width = style.width;
                            minWidth = style.minWidth;
                            maxWidth = style.maxWidth;
                            style.minWidth = style.maxWidth = style.width = ret;
                            ret = computed2.width;
                            style.width = width;
                            style.minWidth = minWidth;
                            style.maxWidth = maxWidth;
                        }
                    }
                    return ret !== void 0 ? (
                        // Support: IE <=9 - 11 only
                        // IE returns zIndex value as an integer.
                        ret + ""
                    ) : ret;
                }

                function addGetHookIf(conditionFn, hookFn) {
                    return {
                        get: function() {
                            if (conditionFn()) {
                                delete this.get;
                                return;
                            }
                            return (this.get = hookFn).apply(this, arguments);
                        }
                    };
                }
                var cssPrefixes = ["Webkit", "Moz", "ms"],
                    emptyStyle = document2.createElement("div").style,
                    vendorProps = {};

                function vendorPropName(name) {
                    var capName = name[0].toUpperCase() + name.slice(1),
                        i = cssPrefixes.length;
                    while (i--) {
                        name = cssPrefixes[i] + capName;
                        if (name in emptyStyle) {
                            return name;
                        }
                    }
                }

                function finalPropName(name) {
                    var final = jQuery2.cssProps[name] || vendorProps[name];
                    if (final) {
                        return final;
                    }
                    if (name in emptyStyle) {
                        return name;
                    }
                    return vendorProps[name] = vendorPropName(name) || name;
                }
                var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
                    rcustomProp = /^--/,
                    cssShow = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    cssNormalTransform = {
                        letterSpacing: "0",
                        fontWeight: "400"
                    };

                function setPositiveNumber(_elem, value, subtract) {
                    var matches = rcssNum.exec(value);
                    return matches ? (
                        // Guard against undefined "subtract", e.g., when used as in cssHooks
                        Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px")
                    ) : value;
                }

                function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
                    var i = dimension === "width" ? 1 : 0,
                        extra = 0,
                        delta = 0;
                    if (box === (isBorderBox ? "border" : "content")) {
                        return 0;
                    }
                    for (; i < 4; i += 2) {
                        if (box === "margin") {
                            delta += jQuery2.css(elem, box + cssExpand[i], true, styles);
                        }
                        if (!isBorderBox) {
                            delta += jQuery2.css(elem, "padding" + cssExpand[i], true, styles);
                            if (box !== "padding") {
                                delta += jQuery2.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                            } else {
                                extra += jQuery2.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                            }
                        } else {
                            if (box === "content") {
                                delta -= jQuery2.css(elem, "padding" + cssExpand[i], true, styles);
                            }
                            if (box !== "margin") {
                                delta -= jQuery2.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                            }
                        }
                    }
                    if (!isBorderBox && computedVal >= 0) {
                        delta += Math.max(0, Math.ceil(
                            elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5
                            // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
                            // Use an explicit zero to avoid NaN (gh-3964)
                        )) || 0;
                    }
                    return delta;
                }

                function getWidthOrHeight(elem, dimension, extra) {
                    var styles = getStyles(elem),
                        boxSizingNeeded = !support.boxSizingReliable() || extra,
                        isBorderBox = boxSizingNeeded && jQuery2.css(elem, "boxSizing", false, styles) === "border-box",
                        valueIsBorderBox = isBorderBox,
                        val = curCSS(elem, dimension, styles),
                        offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
                    if (rnumnonpx.test(val)) {
                        if (!extra) {
                            return val;
                        }
                        val = "auto";
                    }
                    if ((!support.boxSizingReliable() && isBorderBox || // Support: IE 10 - 11+, Edge 15 - 18+
                            // IE/Edge misreport `getComputedStyle` of table rows with width/height
                            // set in CSS while `offset*` properties report correct values.
                            // Interestingly, in some cases IE 9 doesn't suffer from this issue.
                            !support.reliableTrDimensions() && nodeName(elem, "tr") || // Fall back to offsetWidth/offsetHeight when value is "auto"
                            // This happens for inline elements with no explicit setting (gh-3571)
                            val === "auto" || // Support: Android <=4.1 - 4.3 only
                            // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
                            !parseFloat(val) && jQuery2.css(elem, "display", false, styles) === "inline") && // Make sure the element is visible & connected
                        elem.getClientRects().length) {
                        isBorderBox = jQuery2.css(elem, "boxSizing", false, styles) === "border-box";
                        valueIsBorderBox = offsetProp in elem;
                        if (valueIsBorderBox) {
                            val = elem[offsetProp];
                        }
                    }
                    val = parseFloat(val) || 0;
                    return val + boxModelAdjustment(
                        elem,
                        dimension,
                        extra || (isBorderBox ? "border" : "content"),
                        valueIsBorderBox,
                        styles,
                        // Provide the current computed size to request scroll gutter calculation (gh-3589)
                        val
                    ) + "px";
                }
                jQuery2.extend({
                    // Add in style property hooks for overriding the default
                    // behavior of getting and setting a style property
                    cssHooks: {
                        opacity: {
                            get: function(elem, computed2) {
                                if (computed2) {
                                    var ret = curCSS(elem, "opacity");
                                    return ret === "" ? "1" : ret;
                                }
                            }
                        }
                    },
                    // Don't automatically add "px" to these possibly-unitless properties
                    cssNumber: {
                        "animationIterationCount": true,
                        "columnCount": true,
                        "fillOpacity": true,
                        "flexGrow": true,
                        "flexShrink": true,
                        "fontWeight": true,
                        "gridArea": true,
                        "gridColumn": true,
                        "gridColumnEnd": true,
                        "gridColumnStart": true,
                        "gridRow": true,
                        "gridRowEnd": true,
                        "gridRowStart": true,
                        "lineHeight": true,
                        "opacity": true,
                        "order": true,
                        "orphans": true,
                        "widows": true,
                        "zIndex": true,
                        "zoom": true
                    },
                    // Add in properties whose names you wish to fix before
                    // setting or getting the value
                    cssProps: {},
                    // Get and set the style property on a DOM Node
                    style: function(elem, name, value, extra) {
                        if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                            return;
                        }
                        var ret, type, hooks, origName = camelCase(name),
                            isCustomProp = rcustomProp.test(name),
                            style = elem.style;
                        if (!isCustomProp) {
                            name = finalPropName(origName);
                        }
                        hooks = jQuery2.cssHooks[name] || jQuery2.cssHooks[origName];
                        if (value !== void 0) {
                            type = typeof value;
                            if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                                value = adjustCSS(elem, name, ret);
                                type = "number";
                            }
                            if (value == null || value !== value) {
                                return;
                            }
                            if (type === "number" && !isCustomProp) {
                                value += ret && ret[3] || (jQuery2.cssNumber[origName] ? "" : "px");
                            }
                            if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                                style[name] = "inherit";
                            }
                            if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== void 0) {
                                if (isCustomProp) {
                                    style.setProperty(name, value);
                                } else {
                                    style[name] = value;
                                }
                            }
                        } else {
                            if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== void 0) {
                                return ret;
                            }
                            return style[name];
                        }
                    },
                    css: function(elem, name, extra, styles) {
                        var val, num, hooks, origName = camelCase(name),
                            isCustomProp = rcustomProp.test(name);
                        if (!isCustomProp) {
                            name = finalPropName(origName);
                        }
                        hooks = jQuery2.cssHooks[name] || jQuery2.cssHooks[origName];
                        if (hooks && "get" in hooks) {
                            val = hooks.get(elem, true, extra);
                        }
                        if (val === void 0) {
                            val = curCSS(elem, name, styles);
                        }
                        if (val === "normal" && name in cssNormalTransform) {
                            val = cssNormalTransform[name];
                        }
                        if (extra === "" || extra) {
                            num = parseFloat(val);
                            return extra === true || isFinite(num) ? num || 0 : val;
                        }
                        return val;
                    }
                });
                jQuery2.each(["height", "width"], function(_i, dimension) {
                    jQuery2.cssHooks[dimension] = {
                        get: function(elem, computed2, extra) {
                            if (computed2) {
                                return rdisplayswap.test(jQuery2.css(elem, "display")) && // Support: Safari 8+
                                    // Table columns in Safari have non-zero offsetWidth & zero
                                    // getBoundingClientRect().width unless display is changed.
                                    // Support: IE <=11 only
                                    // Running getBoundingClientRect on a disconnected node
                                    // in IE throws an error.
                                    (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function() {
                                        return getWidthOrHeight(elem, dimension, extra);
                                    }) : getWidthOrHeight(elem, dimension, extra);
                            }
                        },
                        set: function(elem, value, extra) {
                            var matches, styles = getStyles(elem),
                                scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute",
                                boxSizingNeeded = scrollboxSizeBuggy || extra,
                                isBorderBox = boxSizingNeeded && jQuery2.css(elem, "boxSizing", false, styles) === "border-box",
                                subtract = extra ? boxModelAdjustment(
                                    elem,
                                    dimension,
                                    extra,
                                    isBorderBox,
                                    styles
                                ) : 0;
                            if (isBorderBox && scrollboxSizeBuggy) {
                                subtract -= Math.ceil(
                                    elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5
                                );
                            }
                            if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
                                elem.style[dimension] = value;
                                value = jQuery2.css(elem, dimension);
                            }
                            return setPositiveNumber(elem, value, subtract);
                        }
                    };
                });
                jQuery2.cssHooks.marginLeft = addGetHookIf(
                    support.reliableMarginLeft,
                    function(elem, computed2) {
                        if (computed2) {
                            return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
                                marginLeft: 0
                            }, function() {
                                return elem.getBoundingClientRect().left;
                            })) + "px";
                        }
                    }
                );
                jQuery2.each({
                    margin: "",
                    padding: "",
                    border: "Width"
                }, function(prefix, suffix) {
                    jQuery2.cssHooks[prefix + suffix] = {
                        expand: function(value) {
                            var i = 0,
                                expanded = {},
                                parts = typeof value === "string" ? value.split(" ") : [value];
                            for (; i < 4; i++) {
                                expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                            }
                            return expanded;
                        }
                    };
                    if (prefix !== "margin") {
                        jQuery2.cssHooks[prefix + suffix].set = setPositiveNumber;
                    }
                });
                jQuery2.fn.extend({
                    css: function(name, value) {
                        return access(this, function(elem, name2, value2) {
                            var styles, len, map2 = {},
                                i = 0;
                            if (Array.isArray(name2)) {
                                styles = getStyles(elem);
                                len = name2.length;
                                for (; i < len; i++) {
                                    map2[name2[i]] = jQuery2.css(elem, name2[i], false, styles);
                                }
                                return map2;
                            }
                            return value2 !== void 0 ? jQuery2.style(elem, name2, value2) : jQuery2.css(elem, name2);
                        }, name, value, arguments.length > 1);
                    }
                });

                function Tween(elem, options, prop, end, easing) {
                    return new Tween.prototype.init(elem, options, prop, end, easing);
                }
                jQuery2.Tween = Tween;
                Tween.prototype = {
                    constructor: Tween,
                    init: function(elem, options, prop, end, easing, unit) {
                        this.elem = elem;
                        this.prop = prop;
                        this.easing = easing || jQuery2.easing._default;
                        this.options = options;
                        this.start = this.now = this.cur();
                        this.end = end;
                        this.unit = unit || (jQuery2.cssNumber[prop] ? "" : "px");
                    },
                    cur: function() {
                        var hooks = Tween.propHooks[this.prop];
                        return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
                    },
                    run: function(percent) {
                        var eased, hooks = Tween.propHooks[this.prop];
                        if (this.options.duration) {
                            this.pos = eased = jQuery2.easing[this.easing](
                                percent,
                                this.options.duration * percent,
                                0,
                                1,
                                this.options.duration
                            );
                        } else {
                            this.pos = eased = percent;
                        }
                        this.now = (this.end - this.start) * eased + this.start;
                        if (this.options.step) {
                            this.options.step.call(this.elem, this.now, this);
                        }
                        if (hooks && hooks.set) {
                            hooks.set(this);
                        } else {
                            Tween.propHooks._default.set(this);
                        }
                        return this;
                    }
                };
                Tween.prototype.init.prototype = Tween.prototype;
                Tween.propHooks = {
                    _default: {
                        get: function(tween) {
                            var result;
                            if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                                return tween.elem[tween.prop];
                            }
                            result = jQuery2.css(tween.elem, tween.prop, "");
                            return !result || result === "auto" ? 0 : result;
                        },
                        set: function(tween) {
                            if (jQuery2.fx.step[tween.prop]) {
                                jQuery2.fx.step[tween.prop](tween);
                            } else if (tween.elem.nodeType === 1 && (jQuery2.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
                                jQuery2.style(tween.elem, tween.prop, tween.now + tween.unit);
                            } else {
                                tween.elem[tween.prop] = tween.now;
                            }
                        }
                    }
                };
                Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
                    set: function(tween) {
                        if (tween.elem.nodeType && tween.elem.parentNode) {
                            tween.elem[tween.prop] = tween.now;
                        }
                    }
                };
                jQuery2.easing = {
                    linear: function(p) {
                        return p;
                    },
                    swing: function(p) {
                        return 0.5 - Math.cos(p * Math.PI) / 2;
                    },
                    _default: "swing"
                };
                jQuery2.fx = Tween.prototype.init;
                jQuery2.fx.step = {};
                var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/,
                    rrun = /queueHooks$/;

                function schedule() {
                    if (inProgress) {
                        if (document2.hidden === false && window2.requestAnimationFrame) {
                            window2.requestAnimationFrame(schedule);
                        } else {
                            window2.setTimeout(schedule, jQuery2.fx.interval);
                        }
                        jQuery2.fx.tick();
                    }
                }

                function createFxNow() {
                    window2.setTimeout(function() {
                        fxNow = void 0;
                    });
                    return fxNow = Date.now();
                }

                function genFx(type, includeWidth) {
                    var which, i = 0,
                        attrs = {
                            height: type
                        };
                    includeWidth = includeWidth ? 1 : 0;
                    for (; i < 4; i += 2 - includeWidth) {
                        which = cssExpand[i];
                        attrs["margin" + which] = attrs["padding" + which] = type;
                    }
                    if (includeWidth) {
                        attrs.opacity = attrs.width = type;
                    }
                    return attrs;
                }

                function createTween(value, prop, animation) {
                    var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
                        index = 0,
                        length = collection.length;
                    for (; index < length; index++) {
                        if (tween = collection[index].call(animation, prop, value)) {
                            return tween;
                        }
                    }
                }

                function defaultPrefilter(elem, props, opts) {
                    var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props,
                        anim = this,
                        orig = {},
                        style = elem.style,
                        hidden = elem.nodeType && isHiddenWithinTree(elem),
                        dataShow = dataPriv.get(elem, "fxshow");
                    if (!opts.queue) {
                        hooks = jQuery2._queueHooks(elem, "fx");
                        if (hooks.unqueued == null) {
                            hooks.unqueued = 0;
                            oldfire = hooks.empty.fire;
                            hooks.empty.fire = function() {
                                if (!hooks.unqueued) {
                                    oldfire();
                                }
                            };
                        }
                        hooks.unqueued++;
                        anim.always(function() {
                            anim.always(function() {
                                hooks.unqueued--;
                                if (!jQuery2.queue(elem, "fx").length) {
                                    hooks.empty.fire();
                                }
                            });
                        });
                    }
                    for (prop in props) {
                        value = props[prop];
                        if (rfxtypes.test(value)) {
                            delete props[prop];
                            toggle = toggle || value === "toggle";
                            if (value === (hidden ? "hide" : "show")) {
                                if (value === "show" && dataShow && dataShow[prop] !== void 0) {
                                    hidden = true;
                                } else {
                                    continue;
                                }
                            }
                            orig[prop] = dataShow && dataShow[prop] || jQuery2.style(elem, prop);
                        }
                    }
                    propTween = !jQuery2.isEmptyObject(props);
                    if (!propTween && jQuery2.isEmptyObject(orig)) {
                        return;
                    }
                    if (isBox && elem.nodeType === 1) {
                        opts.overflow = [style.overflow, style.overflowX, style.overflowY];
                        restoreDisplay = dataShow && dataShow.display;
                        if (restoreDisplay == null) {
                            restoreDisplay = dataPriv.get(elem, "display");
                        }
                        display = jQuery2.css(elem, "display");
                        if (display === "none") {
                            if (restoreDisplay) {
                                display = restoreDisplay;
                            } else {
                                showHide([elem], true);
                                restoreDisplay = elem.style.display || restoreDisplay;
                                display = jQuery2.css(elem, "display");
                                showHide([elem]);
                            }
                        }
                        if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
                            if (jQuery2.css(elem, "float") === "none") {
                                if (!propTween) {
                                    anim.done(function() {
                                        style.display = restoreDisplay;
                                    });
                                    if (restoreDisplay == null) {
                                        display = style.display;
                                        restoreDisplay = display === "none" ? "" : display;
                                    }
                                }
                                style.display = "inline-block";
                            }
                        }
                    }
                    if (opts.overflow) {
                        style.overflow = "hidden";
                        anim.always(function() {
                            style.overflow = opts.overflow[0];
                            style.overflowX = opts.overflow[1];
                            style.overflowY = opts.overflow[2];
                        });
                    }
                    propTween = false;
                    for (prop in orig) {
                        if (!propTween) {
                            if (dataShow) {
                                if ("hidden" in dataShow) {
                                    hidden = dataShow.hidden;
                                }
                            } else {
                                dataShow = dataPriv.access(elem, "fxshow", {
                                    display: restoreDisplay
                                });
                            }
                            if (toggle) {
                                dataShow.hidden = !hidden;
                            }
                            if (hidden) {
                                showHide([elem], true);
                            }
                            anim.done(function() {
                                if (!hidden) {
                                    showHide([elem]);
                                }
                                dataPriv.remove(elem, "fxshow");
                                for (prop in orig) {
                                    jQuery2.style(elem, prop, orig[prop]);
                                }
                            });
                        }
                        propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                        if (!(prop in dataShow)) {
                            dataShow[prop] = propTween.start;
                            if (hidden) {
                                propTween.end = propTween.start;
                                propTween.start = 0;
                            }
                        }
                    }
                }

                function propFilter(props, specialEasing) {
                    var index, name, easing, value, hooks;
                    for (index in props) {
                        name = camelCase(index);
                        easing = specialEasing[name];
                        value = props[index];
                        if (Array.isArray(value)) {
                            easing = value[1];
                            value = props[index] = value[0];
                        }
                        if (index !== name) {
                            props[name] = value;
                            delete props[index];
                        }
                        hooks = jQuery2.cssHooks[name];
                        if (hooks && "expand" in hooks) {
                            value = hooks.expand(value);
                            delete props[name];
                            for (index in value) {
                                if (!(index in props)) {
                                    props[index] = value[index];
                                    specialEasing[index] = easing;
                                }
                            }
                        } else {
                            specialEasing[name] = easing;
                        }
                    }
                }

                function Animation(elem, properties, options) {
                    var result, stopped, index = 0,
                        length = Animation.prefilters.length,
                        deferred = jQuery2.Deferred().always(function() {
                            delete tick.elem;
                        }),
                        tick = function() {
                            if (stopped) {
                                return false;
                            }
                            var currentTime = fxNow || createFxNow(),
                                remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                                temp = remaining / animation.duration || 0,
                                percent = 1 - temp,
                                index2 = 0,
                                length2 = animation.tweens.length;
                            for (; index2 < length2; index2++) {
                                animation.tweens[index2].run(percent);
                            }
                            deferred.notifyWith(elem, [animation, percent, remaining]);
                            if (percent < 1 && length2) {
                                return remaining;
                            }
                            if (!length2) {
                                deferred.notifyWith(elem, [animation, 1, 0]);
                            }
                            deferred.resolveWith(elem, [animation]);
                            return false;
                        },
                        animation = deferred.promise({
                            elem,
                            props: jQuery2.extend({}, properties),
                            opts: jQuery2.extend(true, {
                                specialEasing: {},
                                easing: jQuery2.easing._default
                            }, options),
                            originalProperties: properties,
                            originalOptions: options,
                            startTime: fxNow || createFxNow(),
                            duration: options.duration,
                            tweens: [],
                            createTween: function(prop, end) {
                                var tween = jQuery2.Tween(
                                    elem,
                                    animation.opts,
                                    prop,
                                    end,
                                    animation.opts.specialEasing[prop] || animation.opts.easing
                                );
                                animation.tweens.push(tween);
                                return tween;
                            },
                            stop: function(gotoEnd) {
                                var index2 = 0,
                                    length2 = gotoEnd ? animation.tweens.length : 0;
                                if (stopped) {
                                    return this;
                                }
                                stopped = true;
                                for (; index2 < length2; index2++) {
                                    animation.tweens[index2].run(1);
                                }
                                if (gotoEnd) {
                                    deferred.notifyWith(elem, [animation, 1, 0]);
                                    deferred.resolveWith(elem, [animation, gotoEnd]);
                                } else {
                                    deferred.rejectWith(elem, [animation, gotoEnd]);
                                }
                                return this;
                            }
                        }),
                        props = animation.props;
                    propFilter(props, animation.opts.specialEasing);
                    for (; index < length; index++) {
                        result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
                        if (result) {
                            if (isFunction(result.stop)) {
                                jQuery2._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
                            }
                            return result;
                        }
                    }
                    jQuery2.map(props, createTween, animation);
                    if (isFunction(animation.opts.start)) {
                        animation.opts.start.call(elem, animation);
                    }
                    animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
                    jQuery2.fx.timer(
                        jQuery2.extend(tick, {
                            elem,
                            anim: animation,
                            queue: animation.opts.queue
                        })
                    );
                    return animation;
                }
                jQuery2.Animation = jQuery2.extend(Animation, {
                    tweeners: {
                        "*": [function(prop, value) {
                            var tween = this.createTween(prop, value);
                            adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                            return tween;
                        }]
                    },
                    tweener: function(props, callback) {
                        if (isFunction(props)) {
                            callback = props;
                            props = ["*"];
                        } else {
                            props = props.match(rnothtmlwhite);
                        }
                        var prop, index = 0,
                            length = props.length;
                        for (; index < length; index++) {
                            prop = props[index];
                            Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                            Animation.tweeners[prop].unshift(callback);
                        }
                    },
                    prefilters: [defaultPrefilter],
                    prefilter: function(callback, prepend) {
                        if (prepend) {
                            Animation.prefilters.unshift(callback);
                        } else {
                            Animation.prefilters.push(callback);
                        }
                    }
                });
                jQuery2.speed = function(speed, easing, fn) {
                    var opt = speed && typeof speed === "object" ? jQuery2.extend({}, speed) : {
                        complete: fn || !fn && easing || isFunction(speed) && speed,
                        duration: speed,
                        easing: fn && easing || easing && !isFunction(easing) && easing
                    };
                    if (jQuery2.fx.off) {
                        opt.duration = 0;
                    } else {
                        if (typeof opt.duration !== "number") {
                            if (opt.duration in jQuery2.fx.speeds) {
                                opt.duration = jQuery2.fx.speeds[opt.duration];
                            } else {
                                opt.duration = jQuery2.fx.speeds._default;
                            }
                        }
                    }
                    if (opt.queue == null || opt.queue === true) {
                        opt.queue = "fx";
                    }
                    opt.old = opt.complete;
                    opt.complete = function() {
                        if (isFunction(opt.old)) {
                            opt.old.call(this);
                        }
                        if (opt.queue) {
                            jQuery2.dequeue(this, opt.queue);
                        }
                    };
                    return opt;
                };
                jQuery2.fn.extend({
                    fadeTo: function(speed, to, easing, callback) {
                        return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({
                            opacity: to
                        }, speed, easing, callback);
                    },
                    animate: function(prop, speed, easing, callback) {
                        var empty = jQuery2.isEmptyObject(prop),
                            optall = jQuery2.speed(speed, easing, callback),
                            doAnimation = function() {
                                var anim = Animation(this, jQuery2.extend({}, prop), optall);
                                if (empty || dataPriv.get(this, "finish")) {
                                    anim.stop(true);
                                }
                            };
                        doAnimation.finish = doAnimation;
                        return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
                    },
                    stop: function(type, clearQueue, gotoEnd) {
                        var stopQueue = function(hooks) {
                            var stop = hooks.stop;
                            delete hooks.stop;
                            stop(gotoEnd);
                        };
                        if (typeof type !== "string") {
                            gotoEnd = clearQueue;
                            clearQueue = type;
                            type = void 0;
                        }
                        if (clearQueue) {
                            this.queue(type || "fx", []);
                        }
                        return this.each(function() {
                            var dequeue = true,
                                index = type != null && type + "queueHooks",
                                timers = jQuery2.timers,
                                data = dataPriv.get(this);
                            if (index) {
                                if (data[index] && data[index].stop) {
                                    stopQueue(data[index]);
                                }
                            } else {
                                for (index in data) {
                                    if (data[index] && data[index].stop && rrun.test(index)) {
                                        stopQueue(data[index]);
                                    }
                                }
                            }
                            for (index = timers.length; index--;) {
                                if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                                    timers[index].anim.stop(gotoEnd);
                                    dequeue = false;
                                    timers.splice(index, 1);
                                }
                            }
                            if (dequeue || !gotoEnd) {
                                jQuery2.dequeue(this, type);
                            }
                        });
                    },
                    finish: function(type) {
                        if (type !== false) {
                            type = type || "fx";
                        }
                        return this.each(function() {
                            var index, data = dataPriv.get(this),
                                queue2 = data[type + "queue"],
                                hooks = data[type + "queueHooks"],
                                timers = jQuery2.timers,
                                length = queue2 ? queue2.length : 0;
                            data.finish = true;
                            jQuery2.queue(this, type, []);
                            if (hooks && hooks.stop) {
                                hooks.stop.call(this, true);
                            }
                            for (index = timers.length; index--;) {
                                if (timers[index].elem === this && timers[index].queue === type) {
                                    timers[index].anim.stop(true);
                                    timers.splice(index, 1);
                                }
                            }
                            for (index = 0; index < length; index++) {
                                if (queue2[index] && queue2[index].finish) {
                                    queue2[index].finish.call(this);
                                }
                            }
                            delete data.finish;
                        });
                    }
                });
                jQuery2.each(["toggle", "show", "hide"], function(_i, name) {
                    var cssFn = jQuery2.fn[name];
                    jQuery2.fn[name] = function(speed, easing, callback) {
                        return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
                    };
                });
                jQuery2.each({
                    slideDown: genFx("show"),
                    slideUp: genFx("hide"),
                    slideToggle: genFx("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function(name, props) {
                    jQuery2.fn[name] = function(speed, easing, callback) {
                        return this.animate(props, speed, easing, callback);
                    };
                });
                jQuery2.timers = [];
                jQuery2.fx.tick = function() {
                    var timer, i = 0,
                        timers = jQuery2.timers;
                    fxNow = Date.now();
                    for (; i < timers.length; i++) {
                        timer = timers[i];
                        if (!timer() && timers[i] === timer) {
                            timers.splice(i--, 1);
                        }
                    }
                    if (!timers.length) {
                        jQuery2.fx.stop();
                    }
                    fxNow = void 0;
                };
                jQuery2.fx.timer = function(timer) {
                    jQuery2.timers.push(timer);
                    jQuery2.fx.start();
                };
                jQuery2.fx.interval = 13;
                jQuery2.fx.start = function() {
                    if (inProgress) {
                        return;
                    }
                    inProgress = true;
                    schedule();
                };
                jQuery2.fx.stop = function() {
                    inProgress = null;
                };
                jQuery2.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    // Default speed
                    _default: 400
                };
                jQuery2.fn.delay = function(time, type) {
                    time = jQuery2.fx ? jQuery2.fx.speeds[time] || time : time;
                    type = type || "fx";
                    return this.queue(type, function(next, hooks) {
                        var timeout = window2.setTimeout(next, time);
                        hooks.stop = function() {
                            window2.clearTimeout(timeout);
                        };
                    });
                };
                (function() {
                    var input = document2.createElement("input"),
                        select = document2.createElement("select"),
                        opt = select.appendChild(document2.createElement("option"));
                    input.type = "checkbox";
                    support.checkOn = input.value !== "";
                    support.optSelected = opt.selected;
                    input = document2.createElement("input");
                    input.value = "t";
                    input.type = "radio";
                    support.radioValue = input.value === "t";
                })();
                var boolHook, attrHandle = jQuery2.expr.attrHandle;
                jQuery2.fn.extend({
                    attr: function(name, value) {
                        return access(this, jQuery2.attr, name, value, arguments.length > 1);
                    },
                    removeAttr: function(name) {
                        return this.each(function() {
                            jQuery2.removeAttr(this, name);
                        });
                    }
                });
                jQuery2.extend({
                    attr: function(elem, name, value) {
                        var ret, hooks, nType = elem.nodeType;
                        if (nType === 3 || nType === 8 || nType === 2) {
                            return;
                        }
                        if (typeof elem.getAttribute === "undefined") {
                            return jQuery2.prop(elem, name, value);
                        }
                        if (nType !== 1 || !jQuery2.isXMLDoc(elem)) {
                            hooks = jQuery2.attrHooks[name.toLowerCase()] || (jQuery2.expr.match.bool.test(name) ? boolHook : void 0);
                        }
                        if (value !== void 0) {
                            if (value === null) {
                                jQuery2.removeAttr(elem, name);
                                return;
                            }
                            if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
                                return ret;
                            }
                            elem.setAttribute(name, value + "");
                            return value;
                        }
                        if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                            return ret;
                        }
                        ret = jQuery2.find.attr(elem, name);
                        return ret == null ? void 0 : ret;
                    },
                    attrHooks: {
                        type: {
                            set: function(elem, value) {
                                if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
                                    var val = elem.value;
                                    elem.setAttribute("type", value);
                                    if (val) {
                                        elem.value = val;
                                    }
                                    return value;
                                }
                            }
                        }
                    },
                    removeAttr: function(elem, value) {
                        var name, i = 0,
                            attrNames = value && value.match(rnothtmlwhite);
                        if (attrNames && elem.nodeType === 1) {
                            while (name = attrNames[i++]) {
                                elem.removeAttribute(name);
                            }
                        }
                    }
                });
                boolHook = {
                    set: function(elem, value, name) {
                        if (value === false) {
                            jQuery2.removeAttr(elem, name);
                        } else {
                            elem.setAttribute(name, name);
                        }
                        return name;
                    }
                };
                jQuery2.each(jQuery2.expr.match.bool.source.match(/\w+/g), function(_i, name) {
                    var getter = attrHandle[name] || jQuery2.find.attr;
                    attrHandle[name] = function(elem, name2, isXML) {
                        var ret, handle, lowercaseName = name2.toLowerCase();
                        if (!isXML) {
                            handle = attrHandle[lowercaseName];
                            attrHandle[lowercaseName] = ret;
                            ret = getter(elem, name2, isXML) != null ? lowercaseName : null;
                            attrHandle[lowercaseName] = handle;
                        }
                        return ret;
                    };
                });
                var rfocusable = /^(?:input|select|textarea|button)$/i,
                    rclickable = /^(?:a|area)$/i;
                jQuery2.fn.extend({
                    prop: function(name, value) {
                        return access(this, jQuery2.prop, name, value, arguments.length > 1);
                    },
                    removeProp: function(name) {
                        return this.each(function() {
                            delete this[jQuery2.propFix[name] || name];
                        });
                    }
                });
                jQuery2.extend({
                    prop: function(elem, name, value) {
                        var ret, hooks, nType = elem.nodeType;
                        if (nType === 3 || nType === 8 || nType === 2) {
                            return;
                        }
                        if (nType !== 1 || !jQuery2.isXMLDoc(elem)) {
                            name = jQuery2.propFix[name] || name;
                            hooks = jQuery2.propHooks[name];
                        }
                        if (value !== void 0) {
                            if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
                                return ret;
                            }
                            return elem[name] = value;
                        }
                        if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                            return ret;
                        }
                        return elem[name];
                    },
                    propHooks: {
                        tabIndex: {
                            get: function(elem) {
                                var tabindex = jQuery2.find.attr(elem, "tabindex");
                                if (tabindex) {
                                    return parseInt(tabindex, 10);
                                }
                                if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
                                    return 0;
                                }
                                return -1;
                            }
                        }
                    },
                    propFix: {
                        "for": "htmlFor",
                        "class": "className"
                    }
                });
                if (!support.optSelected) {
                    jQuery2.propHooks.selected = {
                        get: function(elem) {
                            var parent = elem.parentNode;
                            if (parent && parent.parentNode) {
                                parent.parentNode.selectedIndex;
                            }
                            return null;
                        },
                        set: function(elem) {
                            var parent = elem.parentNode;
                            if (parent) {
                                parent.selectedIndex;
                                if (parent.parentNode) {
                                    parent.parentNode.selectedIndex;
                                }
                            }
                        }
                    };
                }
                jQuery2.each([
                    "tabIndex",
                    "readOnly",
                    "maxLength",
                    "cellSpacing",
                    "cellPadding",
                    "rowSpan",
                    "colSpan",
                    "useMap",
                    "frameBorder",
                    "contentEditable"
                ], function() {
                    jQuery2.propFix[this.toLowerCase()] = this;
                });

                function stripAndCollapse(value) {
                    var tokens = value.match(rnothtmlwhite) || [];
                    return tokens.join(" ");
                }

                function getClass(elem) {
                    return elem.getAttribute && elem.getAttribute("class") || "";
                }

                function classesToArray(value) {
                    if (Array.isArray(value)) {
                        return value;
                    }
                    if (typeof value === "string") {
                        return value.match(rnothtmlwhite) || [];
                    }
                    return [];
                }
                jQuery2.fn.extend({
                    addClass: function(value) {
                        var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                        if (isFunction(value)) {
                            return this.each(function(j2) {
                                jQuery2(this).addClass(value.call(this, j2, getClass(this)));
                            });
                        }
                        classes = classesToArray(value);
                        if (classes.length) {
                            while (elem = this[i++]) {
                                curValue = getClass(elem);
                                cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
                                if (cur) {
                                    j = 0;
                                    while (clazz = classes[j++]) {
                                        if (cur.indexOf(" " + clazz + " ") < 0) {
                                            cur += clazz + " ";
                                        }
                                    }
                                    finalValue = stripAndCollapse(cur);
                                    if (curValue !== finalValue) {
                                        elem.setAttribute("class", finalValue);
                                    }
                                }
                            }
                        }
                        return this;
                    },
                    removeClass: function(value) {
                        var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                        if (isFunction(value)) {
                            return this.each(function(j2) {
                                jQuery2(this).removeClass(value.call(this, j2, getClass(this)));
                            });
                        }
                        if (!arguments.length) {
                            return this.attr("class", "");
                        }
                        classes = classesToArray(value);
                        if (classes.length) {
                            while (elem = this[i++]) {
                                curValue = getClass(elem);
                                cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
                                if (cur) {
                                    j = 0;
                                    while (clazz = classes[j++]) {
                                        while (cur.indexOf(" " + clazz + " ") > -1) {
                                            cur = cur.replace(" " + clazz + " ", " ");
                                        }
                                    }
                                    finalValue = stripAndCollapse(cur);
                                    if (curValue !== finalValue) {
                                        elem.setAttribute("class", finalValue);
                                    }
                                }
                            }
                        }
                        return this;
                    },
                    toggleClass: function(value, stateVal) {
                        var type = typeof value,
                            isValidValue = type === "string" || Array.isArray(value);
                        if (typeof stateVal === "boolean" && isValidValue) {
                            return stateVal ? this.addClass(value) : this.removeClass(value);
                        }
                        if (isFunction(value)) {
                            return this.each(function(i) {
                                jQuery2(this).toggleClass(
                                    value.call(this, i, getClass(this), stateVal),
                                    stateVal
                                );
                            });
                        }
                        return this.each(function() {
                            var className, i, self, classNames;
                            if (isValidValue) {
                                i = 0;
                                self = jQuery2(this);
                                classNames = classesToArray(value);
                                while (className = classNames[i++]) {
                                    if (self.hasClass(className)) {
                                        self.removeClass(className);
                                    } else {
                                        self.addClass(className);
                                    }
                                }
                            } else if (value === void 0 || type === "boolean") {
                                className = getClass(this);
                                if (className) {
                                    dataPriv.set(this, "__className__", className);
                                }
                                if (this.setAttribute) {
                                    this.setAttribute(
                                        "class",
                                        className || value === false ? "" : dataPriv.get(this, "__className__") || ""
                                    );
                                }
                            }
                        });
                    },
                    hasClass: function(selector) {
                        var className, elem, i = 0;
                        className = " " + selector + " ";
                        while (elem = this[i++]) {
                            if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
                                return true;
                            }
                        }
                        return false;
                    }
                });
                var rreturn = /\r/g;
                jQuery2.fn.extend({
                    val: function(value) {
                        var hooks, ret, valueIsFunction, elem = this[0];
                        if (!arguments.length) {
                            if (elem) {
                                hooks = jQuery2.valHooks[elem.type] || jQuery2.valHooks[elem.nodeName.toLowerCase()];
                                if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== void 0) {
                                    return ret;
                                }
                                ret = elem.value;
                                if (typeof ret === "string") {
                                    return ret.replace(rreturn, "");
                                }
                                return ret == null ? "" : ret;
                            }
                            return;
                        }
                        valueIsFunction = isFunction(value);
                        return this.each(function(i) {
                            var val;
                            if (this.nodeType !== 1) {
                                return;
                            }
                            if (valueIsFunction) {
                                val = value.call(this, i, jQuery2(this).val());
                            } else {
                                val = value;
                            }
                            if (val == null) {
                                val = "";
                            } else if (typeof val === "number") {
                                val += "";
                            } else if (Array.isArray(val)) {
                                val = jQuery2.map(val, function(value2) {
                                    return value2 == null ? "" : value2 + "";
                                });
                            }
                            hooks = jQuery2.valHooks[this.type] || jQuery2.valHooks[this.nodeName.toLowerCase()];
                            if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === void 0) {
                                this.value = val;
                            }
                        });
                    }
                });
                jQuery2.extend({
                    valHooks: {
                        option: {
                            get: function(elem) {
                                var val = jQuery2.find.attr(elem, "value");
                                return val != null ? val : (
                                    // Support: IE <=10 - 11 only
                                    // option.text throws exceptions (#14686, #14858)
                                    // Strip and collapse whitespace
                                    // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                                    stripAndCollapse(jQuery2.text(elem))
                                );
                            }
                        },
                        select: {
                            get: function(elem) {
                                var value, option, i, options = elem.options,
                                    index = elem.selectedIndex,
                                    one = elem.type === "select-one",
                                    values = one ? null : [],
                                    max = one ? index + 1 : options.length;
                                if (index < 0) {
                                    i = max;
                                } else {
                                    i = one ? index : 0;
                                }
                                for (; i < max; i++) {
                                    option = options[i];
                                    if ((option.selected || i === index) && // Don't return options that are disabled or in a disabled optgroup
                                        !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                                        value = jQuery2(option).val();
                                        if (one) {
                                            return value;
                                        }
                                        values.push(value);
                                    }
                                }
                                return values;
                            },
                            set: function(elem, value) {
                                var optionSet, option, options = elem.options,
                                    values = jQuery2.makeArray(value),
                                    i = options.length;
                                while (i--) {
                                    option = options[i];
                                    if (option.selected = jQuery2.inArray(jQuery2.valHooks.option.get(option), values) > -1) {
                                        optionSet = true;
                                    }
                                }
                                if (!optionSet) {
                                    elem.selectedIndex = -1;
                                }
                                return values;
                            }
                        }
                    }
                });
                jQuery2.each(["radio", "checkbox"], function() {
                    jQuery2.valHooks[this] = {
                        set: function(elem, value) {
                            if (Array.isArray(value)) {
                                return elem.checked = jQuery2.inArray(jQuery2(elem).val(), value) > -1;
                            }
                        }
                    };
                    if (!support.checkOn) {
                        jQuery2.valHooks[this].get = function(elem) {
                            return elem.getAttribute("value") === null ? "on" : elem.value;
                        };
                    }
                });
                support.focusin = "onfocusin" in window2;
                var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
                    stopPropagationCallback = function(e) {
                        e.stopPropagation();
                    };
                jQuery2.extend(jQuery2.event, {
                    trigger: function(event, data, elem, onlyHandlers) {
                        var i, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document2],
                            type = hasOwn.call(event, "type") ? event.type : event,
                            namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
                        cur = lastElement = tmp = elem = elem || document2;
                        if (elem.nodeType === 3 || elem.nodeType === 8) {
                            return;
                        }
                        if (rfocusMorph.test(type + jQuery2.event.triggered)) {
                            return;
                        }
                        if (type.indexOf(".") > -1) {
                            namespaces = type.split(".");
                            type = namespaces.shift();
                            namespaces.sort();
                        }
                        ontype = type.indexOf(":") < 0 && "on" + type;
                        event = event[jQuery2.expando] ? event : new jQuery2.Event(type, typeof event === "object" && event);
                        event.isTrigger = onlyHandlers ? 2 : 3;
                        event.namespace = namespaces.join(".");
                        event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                        event.result = void 0;
                        if (!event.target) {
                            event.target = elem;
                        }
                        data = data == null ? [event] : jQuery2.makeArray(data, [event]);
                        special = jQuery2.event.special[type] || {};
                        if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                            return;
                        }
                        if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
                            bubbleType = special.delegateType || type;
                            if (!rfocusMorph.test(bubbleType + type)) {
                                cur = cur.parentNode;
                            }
                            for (; cur; cur = cur.parentNode) {
                                eventPath.push(cur);
                                tmp = cur;
                            }
                            if (tmp === (elem.ownerDocument || document2)) {
                                eventPath.push(tmp.defaultView || tmp.parentWindow || window2);
                            }
                        }
                        i = 0;
                        while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                            lastElement = cur;
                            event.type = i > 1 ? bubbleType : special.bindType || type;
                            handle = (dataPriv.get(cur, "events") || /* @__PURE__ */ Object.create(null))[event.type] && dataPriv.get(cur, "handle");
                            if (handle) {
                                handle.apply(cur, data);
                            }
                            handle = ontype && cur[ontype];
                            if (handle && handle.apply && acceptData(cur)) {
                                event.result = handle.apply(cur, data);
                                if (event.result === false) {
                                    event.preventDefault();
                                }
                            }
                        }
                        event.type = type;
                        if (!onlyHandlers && !event.isDefaultPrevented()) {
                            if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
                                if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
                                    tmp = elem[ontype];
                                    if (tmp) {
                                        elem[ontype] = null;
                                    }
                                    jQuery2.event.triggered = type;
                                    if (event.isPropagationStopped()) {
                                        lastElement.addEventListener(type, stopPropagationCallback);
                                    }
                                    elem[type]();
                                    if (event.isPropagationStopped()) {
                                        lastElement.removeEventListener(type, stopPropagationCallback);
                                    }
                                    jQuery2.event.triggered = void 0;
                                    if (tmp) {
                                        elem[ontype] = tmp;
                                    }
                                }
                            }
                        }
                        return event.result;
                    },
                    // Piggyback on a donor event to simulate a different one
                    // Used only for `focus(in | out)` events
                    simulate: function(type, elem, event) {
                        var e = jQuery2.extend(
                            new jQuery2.Event(),
                            event, {
                                type,
                                isSimulated: true
                            }
                        );
                        jQuery2.event.trigger(e, null, elem);
                    }
                });
                jQuery2.fn.extend({
                    trigger: function(type, data) {
                        return this.each(function() {
                            jQuery2.event.trigger(type, data, this);
                        });
                    },
                    triggerHandler: function(type, data) {
                        var elem = this[0];
                        if (elem) {
                            return jQuery2.event.trigger(type, data, elem, true);
                        }
                    }
                });
                if (!support.focusin) {
                    jQuery2.each({
                        focus: "focusin",
                        blur: "focusout"
                    }, function(orig, fix) {
                        var handler = function(event) {
                            jQuery2.event.simulate(fix, event.target, jQuery2.event.fix(event));
                        };
                        jQuery2.event.special[fix] = {
                            setup: function() {
                                var doc = this.ownerDocument || this.document || this,
                                    attaches = dataPriv.access(doc, fix);
                                if (!attaches) {
                                    doc.addEventListener(orig, handler, true);
                                }
                                dataPriv.access(doc, fix, (attaches || 0) + 1);
                            },
                            teardown: function() {
                                var doc = this.ownerDocument || this.document || this,
                                    attaches = dataPriv.access(doc, fix) - 1;
                                if (!attaches) {
                                    doc.removeEventListener(orig, handler, true);
                                    dataPriv.remove(doc, fix);
                                } else {
                                    dataPriv.access(doc, fix, attaches);
                                }
                            }
                        };
                    });
                }
                var location = window2.location;
                var nonce = {
                    guid: Date.now()
                };
                var rquery = /\?/;
                jQuery2.parseXML = function(data) {
                    var xml;
                    if (!data || typeof data !== "string") {
                        return null;
                    }
                    try {
                        xml = new window2.DOMParser().parseFromString(data, "text/xml");
                    } catch (e) {
                        xml = void 0;
                    }
                    if (!xml || xml.getElementsByTagName("parsererror").length) {
                        jQuery2.error("Invalid XML: " + data);
                    }
                    return xml;
                };
                var rbracket = /\[\]$/,
                    rCRLF = /\r?\n/g,
                    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
                    rsubmittable = /^(?:input|select|textarea|keygen)/i;

                function buildParams(prefix, obj, traditional, add) {
                    var name;
                    if (Array.isArray(obj)) {
                        jQuery2.each(obj, function(i, v) {
                            if (traditional || rbracket.test(prefix)) {
                                add(prefix, v);
                            } else {
                                buildParams(
                                    prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
                                    v,
                                    traditional,
                                    add
                                );
                            }
                        });
                    } else if (!traditional && toType(obj) === "object") {
                        for (name in obj) {
                            buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
                        }
                    } else {
                        add(prefix, obj);
                    }
                }
                jQuery2.param = function(a, traditional) {
                    var prefix, s = [],
                        add = function(key, valueOrFunction) {
                            var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
                            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
                        };
                    if (a == null) {
                        return "";
                    }
                    if (Array.isArray(a) || a.jquery && !jQuery2.isPlainObject(a)) {
                        jQuery2.each(a, function() {
                            add(this.name, this.value);
                        });
                    } else {
                        for (prefix in a) {
                            buildParams(prefix, a[prefix], traditional, add);
                        }
                    }
                    return s.join("&");
                };
                jQuery2.fn.extend({
                    serialize: function() {
                        return jQuery2.param(this.serializeArray());
                    },
                    serializeArray: function() {
                        return this.map(function() {
                            var elements = jQuery2.prop(this, "elements");
                            return elements ? jQuery2.makeArray(elements) : this;
                        }).filter(function() {
                            var type = this.type;
                            return this.name && !jQuery2(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
                        }).map(function(_i, elem) {
                            var val = jQuery2(this).val();
                            if (val == null) {
                                return null;
                            }
                            if (Array.isArray(val)) {
                                return jQuery2.map(val, function(val2) {
                                    return {
                                        name: elem.name,
                                        value: val2.replace(rCRLF, "\r\n")
                                    };
                                });
                            }
                            return {
                                name: elem.name,
                                value: val.replace(rCRLF, "\r\n")
                            };
                        }).get();
                    }
                });
                var r20 = /%20/g,
                    rhash = /#.*$/,
                    rantiCache = /([?&])_=[^&]*/,
                    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
                    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                    rnoContent = /^(?:GET|HEAD)$/,
                    rprotocol = /^\/\//,
                    prefilters = {},
                    transports = {},
                    allTypes = "*/".concat("*"),
                    originAnchor = document2.createElement("a");
                originAnchor.href = location.href;

                function addToPrefiltersOrTransports(structure) {
                    return function(dataTypeExpression, func) {
                        if (typeof dataTypeExpression !== "string") {
                            func = dataTypeExpression;
                            dataTypeExpression = "*";
                        }
                        var dataType, i = 0,
                            dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
                        if (isFunction(func)) {
                            while (dataType = dataTypes[i++]) {
                                if (dataType[0] === "+") {
                                    dataType = dataType.slice(1) || "*";
                                    (structure[dataType] = structure[dataType] || []).unshift(func);
                                } else {
                                    (structure[dataType] = structure[dataType] || []).push(func);
                                }
                            }
                        }
                    };
                }

                function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
                    var inspected = {},
                        seekingTransport = structure === transports;

                    function inspect(dataType) {
                        var selected;
                        inspected[dataType] = true;
                        jQuery2.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                            var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                            if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                                options.dataTypes.unshift(dataTypeOrTransport);
                                inspect(dataTypeOrTransport);
                                return false;
                            } else if (seekingTransport) {
                                return !(selected = dataTypeOrTransport);
                            }
                        });
                        return selected;
                    }
                    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
                }

                function ajaxExtend(target, src) {
                    var key, deep, flatOptions = jQuery2.ajaxSettings.flatOptions || {};
                    for (key in src) {
                        if (src[key] !== void 0) {
                            (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
                        }
                    }
                    if (deep) {
                        jQuery2.extend(true, target, deep);
                    }
                    return target;
                }

                function ajaxHandleResponses(s, jqXHR, responses) {
                    var ct, type, finalDataType, firstDataType, contents = s.contents,
                        dataTypes = s.dataTypes;
                    while (dataTypes[0] === "*") {
                        dataTypes.shift();
                        if (ct === void 0) {
                            ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
                        }
                    }
                    if (ct) {
                        for (type in contents) {
                            if (contents[type] && contents[type].test(ct)) {
                                dataTypes.unshift(type);
                                break;
                            }
                        }
                    }
                    if (dataTypes[0] in responses) {
                        finalDataType = dataTypes[0];
                    } else {
                        for (type in responses) {
                            if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                                finalDataType = type;
                                break;
                            }
                            if (!firstDataType) {
                                firstDataType = type;
                            }
                        }
                        finalDataType = finalDataType || firstDataType;
                    }
                    if (finalDataType) {
                        if (finalDataType !== dataTypes[0]) {
                            dataTypes.unshift(finalDataType);
                        }
                        return responses[finalDataType];
                    }
                }

                function ajaxConvert(s, response, jqXHR, isSuccess) {
                    var conv2, current, conv, tmp, prev, converters = {},
                        dataTypes = s.dataTypes.slice();
                    if (dataTypes[1]) {
                        for (conv in s.converters) {
                            converters[conv.toLowerCase()] = s.converters[conv];
                        }
                    }
                    current = dataTypes.shift();
                    while (current) {
                        if (s.responseFields[current]) {
                            jqXHR[s.responseFields[current]] = response;
                        }
                        if (!prev && isSuccess && s.dataFilter) {
                            response = s.dataFilter(response, s.dataType);
                        }
                        prev = current;
                        current = dataTypes.shift();
                        if (current) {
                            if (current === "*") {
                                current = prev;
                            } else if (prev !== "*" && prev !== current) {
                                conv = converters[prev + " " + current] || converters["* " + current];
                                if (!conv) {
                                    for (conv2 in converters) {
                                        tmp = conv2.split(" ");
                                        if (tmp[1] === current) {
                                            conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                            if (conv) {
                                                if (conv === true) {
                                                    conv = converters[conv2];
                                                } else if (converters[conv2] !== true) {
                                                    current = tmp[0];
                                                    dataTypes.unshift(tmp[1]);
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (conv !== true) {
                                    if (conv && s.throws) {
                                        response = conv(response);
                                    } else {
                                        try {
                                            response = conv(response);
                                        } catch (e) {
                                            return {
                                                state: "parsererror",
                                                error: conv ? e : "No conversion from " + prev + " to " + current
                                            };
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return {
                        state: "success",
                        data: response
                    };
                }
                jQuery2.extend({
                    // Counter for holding the number of active queries
                    active: 0,
                    // Last-Modified header cache for next request
                    lastModified: {},
                    etag: {},
                    ajaxSettings: {
                        url: location.href,
                        type: "GET",
                        isLocal: rlocalProtocol.test(location.protocol),
                        global: true,
                        processData: true,
                        async: true,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        /*
                        timeout: 0,
                        data: null,
                        dataType: null,
                        username: null,
                        password: null,
                        cache: null,
                        throws: false,
                        traditional: false,
                        headers: {},
                        */
                        accepts: {
                            "*": allTypes,
                            text: "text/plain",
                            html: "text/html",
                            xml: "application/xml, text/xml",
                            json: "application/json, text/javascript"
                        },
                        contents: {
                            xml: /\bxml\b/,
                            html: /\bhtml/,
                            json: /\bjson\b/
                        },
                        responseFields: {
                            xml: "responseXML",
                            text: "responseText",
                            json: "responseJSON"
                        },
                        // Data converters
                        // Keys separate source (or catchall "*") and destination types with a single space
                        converters: {
                            // Convert anything to text
                            "* text": String,
                            // Text to html (true = no transformation)
                            "text html": true,
                            // Evaluate text as a json expression
                            "text json": JSON.parse,
                            // Parse text as xml
                            "text xml": jQuery2.parseXML
                        },
                        // For options that shouldn't be deep extended:
                        // you can add your own custom options here if
                        // and when you create one that shouldn't be
                        // deep extended (see ajaxExtend)
                        flatOptions: {
                            url: true,
                            context: true
                        }
                    },
                    // Creates a full fledged settings object into target
                    // with both ajaxSettings and settings fields.
                    // If target is omitted, writes into ajaxSettings.
                    ajaxSetup: function(target, settings) {
                        return settings ? (
                            // Building a settings object
                            ajaxExtend(ajaxExtend(target, jQuery2.ajaxSettings), settings)
                        ) : (
                            // Extending ajaxSettings
                            ajaxExtend(jQuery2.ajaxSettings, target)
                        );
                    },
                    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
                    ajaxTransport: addToPrefiltersOrTransports(transports),
                    // Main method
                    ajax: function(url, options) {
                        if (typeof url === "object") {
                            options = url;
                            url = void 0;
                        }
                        options = options || {};
                        var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed2, fireGlobals, i, uncached, s = jQuery2.ajaxSetup({}, options),
                            callbackContext = s.context || s,
                            globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery2(callbackContext) : jQuery2.event,
                            deferred = jQuery2.Deferred(),
                            completeDeferred = jQuery2.Callbacks("once memory"),
                            statusCode = s.statusCode || {},
                            requestHeaders = {},
                            requestHeadersNames = {},
                            strAbort = "canceled",
                            jqXHR = {
                                readyState: 0,
                                // Builds headers hashtable if needed
                                getResponseHeader: function(key) {
                                    var match;
                                    if (completed2) {
                                        if (!responseHeaders) {
                                            responseHeaders = {};
                                            while (match = rheaders.exec(responseHeadersString)) {
                                                responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
                                            }
                                        }
                                        match = responseHeaders[key.toLowerCase() + " "];
                                    }
                                    return match == null ? null : match.join(", ");
                                },
                                // Raw string
                                getAllResponseHeaders: function() {
                                    return completed2 ? responseHeadersString : null;
                                },
                                // Caches the header
                                setRequestHeader: function(name, value) {
                                    if (completed2 == null) {
                                        name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
                                        requestHeaders[name] = value;
                                    }
                                    return this;
                                },
                                // Overrides response content-type header
                                overrideMimeType: function(type) {
                                    if (completed2 == null) {
                                        s.mimeType = type;
                                    }
                                    return this;
                                },
                                // Status-dependent callbacks
                                statusCode: function(map2) {
                                    var code;
                                    if (map2) {
                                        if (completed2) {
                                            jqXHR.always(map2[jqXHR.status]);
                                        } else {
                                            for (code in map2) {
                                                statusCode[code] = [statusCode[code], map2[code]];
                                            }
                                        }
                                    }
                                    return this;
                                },
                                // Cancel the request
                                abort: function(statusText) {
                                    var finalText = statusText || strAbort;
                                    if (transport) {
                                        transport.abort(finalText);
                                    }
                                    done(0, finalText);
                                    return this;
                                }
                            };
                        deferred.promise(jqXHR);
                        s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");
                        s.type = options.method || options.type || s.method || s.type;
                        s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
                        if (s.crossDomain == null) {
                            urlAnchor = document2.createElement("a");
                            try {
                                urlAnchor.href = s.url;
                                urlAnchor.href = urlAnchor.href;
                                s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
                            } catch (e) {
                                s.crossDomain = true;
                            }
                        }
                        if (s.data && s.processData && typeof s.data !== "string") {
                            s.data = jQuery2.param(s.data, s.traditional);
                        }
                        inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
                        if (completed2) {
                            return jqXHR;
                        }
                        fireGlobals = jQuery2.event && s.global;
                        if (fireGlobals && jQuery2.active++ === 0) {
                            jQuery2.event.trigger("ajaxStart");
                        }
                        s.type = s.type.toUpperCase();
                        s.hasContent = !rnoContent.test(s.type);
                        cacheURL = s.url.replace(rhash, "");
                        if (!s.hasContent) {
                            uncached = s.url.slice(cacheURL.length);
                            if (s.data && (s.processData || typeof s.data === "string")) {
                                cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                                delete s.data;
                            }
                            if (s.cache === false) {
                                cacheURL = cacheURL.replace(rantiCache, "$1");
                                uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
                            }
                            s.url = cacheURL + uncached;
                        } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
                            s.data = s.data.replace(r20, "+");
                        }
                        if (s.ifModified) {
                            if (jQuery2.lastModified[cacheURL]) {
                                jqXHR.setRequestHeader("If-Modified-Since", jQuery2.lastModified[cacheURL]);
                            }
                            if (jQuery2.etag[cacheURL]) {
                                jqXHR.setRequestHeader("If-None-Match", jQuery2.etag[cacheURL]);
                            }
                        }
                        if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                            jqXHR.setRequestHeader("Content-Type", s.contentType);
                        }
                        jqXHR.setRequestHeader(
                            "Accept",
                            s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]
                        );
                        for (i in s.headers) {
                            jqXHR.setRequestHeader(i, s.headers[i]);
                        }
                        if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed2)) {
                            return jqXHR.abort();
                        }
                        strAbort = "abort";
                        completeDeferred.add(s.complete);
                        jqXHR.done(s.success);
                        jqXHR.fail(s.error);
                        transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
                        if (!transport) {
                            done(-1, "No Transport");
                        } else {
                            jqXHR.readyState = 1;
                            if (fireGlobals) {
                                globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                            }
                            if (completed2) {
                                return jqXHR;
                            }
                            if (s.async && s.timeout > 0) {
                                timeoutTimer = window2.setTimeout(function() {
                                    jqXHR.abort("timeout");
                                }, s.timeout);
                            }
                            try {
                                completed2 = false;
                                transport.send(requestHeaders, done);
                            } catch (e) {
                                if (completed2) {
                                    throw e;
                                }
                                done(-1, e);
                            }
                        }

                        function done(status, nativeStatusText, responses, headers) {
                            var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                            if (completed2) {
                                return;
                            }
                            completed2 = true;
                            if (timeoutTimer) {
                                window2.clearTimeout(timeoutTimer);
                            }
                            transport = void 0;
                            responseHeadersString = headers || "";
                            jqXHR.readyState = status > 0 ? 4 : 0;
                            isSuccess = status >= 200 && status < 300 || status === 304;
                            if (responses) {
                                response = ajaxHandleResponses(s, jqXHR, responses);
                            }
                            if (!isSuccess && jQuery2.inArray("script", s.dataTypes) > -1) {
                                s.converters["text script"] = function() {};
                            }
                            response = ajaxConvert(s, response, jqXHR, isSuccess);
                            if (isSuccess) {
                                if (s.ifModified) {
                                    modified = jqXHR.getResponseHeader("Last-Modified");
                                    if (modified) {
                                        jQuery2.lastModified[cacheURL] = modified;
                                    }
                                    modified = jqXHR.getResponseHeader("etag");
                                    if (modified) {
                                        jQuery2.etag[cacheURL] = modified;
                                    }
                                }
                                if (status === 204 || s.type === "HEAD") {
                                    statusText = "nocontent";
                                } else if (status === 304) {
                                    statusText = "notmodified";
                                } else {
                                    statusText = response.state;
                                    success = response.data;
                                    error = response.error;
                                    isSuccess = !error;
                                }
                            } else {
                                error = statusText;
                                if (status || !statusText) {
                                    statusText = "error";
                                    if (status < 0) {
                                        status = 0;
                                    }
                                }
                            }
                            jqXHR.status = status;
                            jqXHR.statusText = (nativeStatusText || statusText) + "";
                            if (isSuccess) {
                                deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                            } else {
                                deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                            }
                            jqXHR.statusCode(statusCode);
                            statusCode = void 0;
                            if (fireGlobals) {
                                globalEventContext.trigger(
                                    isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]
                                );
                            }
                            completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                            if (fireGlobals) {
                                globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                                if (!--jQuery2.active) {
                                    jQuery2.event.trigger("ajaxStop");
                                }
                            }
                        }
                        return jqXHR;
                    },
                    getJSON: function(url, data, callback) {
                        return jQuery2.get(url, data, callback, "json");
                    },
                    getScript: function(url, callback) {
                        return jQuery2.get(url, void 0, callback, "script");
                    }
                });
                jQuery2.each(["get", "post"], function(_i, method) {
                    jQuery2[method] = function(url, data, callback, type) {
                        if (isFunction(data)) {
                            type = type || callback;
                            callback = data;
                            data = void 0;
                        }
                        return jQuery2.ajax(jQuery2.extend({
                            url,
                            type: method,
                            dataType: type,
                            data,
                            success: callback
                        }, jQuery2.isPlainObject(url) && url));
                    };
                });
                jQuery2.ajaxPrefilter(function(s) {
                    var i;
                    for (i in s.headers) {
                        if (i.toLowerCase() === "content-type") {
                            s.contentType = s.headers[i] || "";
                        }
                    }
                });
                jQuery2._evalUrl = function(url, options, doc) {
                    return jQuery2.ajax({
                        url,
                        // Make this explicit, since user can override this through ajaxSetup (#11264)
                        type: "GET",
                        dataType: "script",
                        cache: true,
                        async: false,
                        global: false,
                        // Only evaluate the response if it is successful (gh-4126)
                        // dataFilter is not invoked for failure responses, so using it instead
                        // of the default converter is kludgy but it works.
                        converters: {
                            "text script": function() {}
                        },
                        dataFilter: function(response) {
                            jQuery2.globalEval(response, options, doc);
                        }
                    });
                };
                jQuery2.fn.extend({
                    wrapAll: function(html) {
                        var wrap;
                        if (this[0]) {
                            if (isFunction(html)) {
                                html = html.call(this[0]);
                            }
                            wrap = jQuery2(html, this[0].ownerDocument).eq(0).clone(true);
                            if (this[0].parentNode) {
                                wrap.insertBefore(this[0]);
                            }
                            wrap.map(function() {
                                var elem = this;
                                while (elem.firstElementChild) {
                                    elem = elem.firstElementChild;
                                }
                                return elem;
                            }).append(this);
                        }
                        return this;
                    },
                    wrapInner: function(html) {
                        if (isFunction(html)) {
                            return this.each(function(i) {
                                jQuery2(this).wrapInner(html.call(this, i));
                            });
                        }
                        return this.each(function() {
                            var self = jQuery2(this),
                                contents = self.contents();
                            if (contents.length) {
                                contents.wrapAll(html);
                            } else {
                                self.append(html);
                            }
                        });
                    },
                    wrap: function(html) {
                        var htmlIsFunction = isFunction(html);
                        return this.each(function(i) {
                            jQuery2(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
                        });
                    },
                    unwrap: function(selector) {
                        this.parent(selector).not("body").each(function() {
                            jQuery2(this).replaceWith(this.childNodes);
                        });
                        return this;
                    }
                });
                jQuery2.expr.pseudos.hidden = function(elem) {
                    return !jQuery2.expr.pseudos.visible(elem);
                };
                jQuery2.expr.pseudos.visible = function(elem) {
                    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
                };
                jQuery2.ajaxSettings.xhr = function() {
                    try {
                        return new window2.XMLHttpRequest();
                    } catch (e) {}
                };
                var xhrSuccessStatus = {
                        // File protocol always yields status code 0, assume 200
                        0: 200,
                        // Support: IE <=9 only
                        // #1450: sometimes IE returns 1223 when it should be 204
                        1223: 204
                    },
                    xhrSupported = jQuery2.ajaxSettings.xhr();
                support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
                support.ajax = xhrSupported = !!xhrSupported;
                jQuery2.ajaxTransport(function(options) {
                    var callback, errorCallback;
                    if (support.cors || xhrSupported && !options.crossDomain) {
                        return {
                            send: function(headers, complete) {
                                var i, xhr = options.xhr();
                                xhr.open(
                                    options.type,
                                    options.url,
                                    options.async,
                                    options.username,
                                    options.password
                                );
                                if (options.xhrFields) {
                                    for (i in options.xhrFields) {
                                        xhr[i] = options.xhrFields[i];
                                    }
                                }
                                if (options.mimeType && xhr.overrideMimeType) {
                                    xhr.overrideMimeType(options.mimeType);
                                }
                                if (!options.crossDomain && !headers["X-Requested-With"]) {
                                    headers["X-Requested-With"] = "XMLHttpRequest";
                                }
                                for (i in headers) {
                                    xhr.setRequestHeader(i, headers[i]);
                                }
                                callback = function(type) {
                                    return function() {
                                        if (callback) {
                                            callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                                            if (type === "abort") {
                                                xhr.abort();
                                            } else if (type === "error") {
                                                if (typeof xhr.status !== "number") {
                                                    complete(0, "error");
                                                } else {
                                                    complete(
                                                        // File: protocol always yields status 0; see #8605, #14207
                                                        xhr.status,
                                                        xhr.statusText
                                                    );
                                                }
                                            } else {
                                                complete(
                                                    xhrSuccessStatus[xhr.status] || xhr.status,
                                                    xhr.statusText,
                                                    // Support: IE <=9 only
                                                    // IE9 has no XHR2 but throws on binary (trac-11426)
                                                    // For XHR2 non-text, let the caller handle it (gh-2498)
                                                    (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {
                                                        binary: xhr.response
                                                    } : {
                                                        text: xhr.responseText
                                                    },
                                                    xhr.getAllResponseHeaders()
                                                );
                                            }
                                        }
                                    };
                                };
                                xhr.onload = callback();
                                errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
                                if (xhr.onabort !== void 0) {
                                    xhr.onabort = errorCallback;
                                } else {
                                    xhr.onreadystatechange = function() {
                                        if (xhr.readyState === 4) {
                                            window2.setTimeout(function() {
                                                if (callback) {
                                                    errorCallback();
                                                }
                                            });
                                        }
                                    };
                                }
                                callback = callback("abort");
                                try {
                                    xhr.send(options.hasContent && options.data || null);
                                } catch (e) {
                                    if (callback) {
                                        throw e;
                                    }
                                }
                            },
                            abort: function() {
                                if (callback) {
                                    callback();
                                }
                            }
                        };
                    }
                });
                jQuery2.ajaxPrefilter(function(s) {
                    if (s.crossDomain) {
                        s.contents.script = false;
                    }
                });
                jQuery2.ajaxSetup({
                    accepts: {
                        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                    },
                    contents: {
                        script: /\b(?:java|ecma)script\b/
                    },
                    converters: {
                        "text script": function(text) {
                            jQuery2.globalEval(text);
                            return text;
                        }
                    }
                });
                jQuery2.ajaxPrefilter("script", function(s) {
                    if (s.cache === void 0) {
                        s.cache = false;
                    }
                    if (s.crossDomain) {
                        s.type = "GET";
                    }
                });
                jQuery2.ajaxTransport("script", function(s) {
                    if (s.crossDomain || s.scriptAttrs) {
                        var script, callback;
                        return {
                            send: function(_, complete) {
                                script = jQuery2("<script>").attr(s.scriptAttrs || {}).prop({
                                    charset: s.scriptCharset,
                                    src: s.url
                                }).on("load error", callback = function(evt) {
                                    script.remove();
                                    callback = null;
                                    if (evt) {
                                        complete(evt.type === "error" ? 404 : 200, evt.type);
                                    }
                                });
                                document2.head.appendChild(script[0]);
                            },
                            abort: function() {
                                if (callback) {
                                    callback();
                                }
                            }
                        };
                    }
                });
                var oldCallbacks = [],
                    rjsonp = /(=)\?(?=&|$)|\?\?/;
                jQuery2.ajaxSetup({
                    jsonp: "callback",
                    jsonpCallback: function() {
                        var callback = oldCallbacks.pop() || jQuery2.expando + "_" + nonce.guid++;
                        this[callback] = true;
                        return callback;
                    }
                });
                jQuery2.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
                    var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
                    if (jsonProp || s.dataTypes[0] === "jsonp") {
                        callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
                        if (jsonProp) {
                            s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
                        } else if (s.jsonp !== false) {
                            s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
                        }
                        s.converters["script json"] = function() {
                            if (!responseContainer) {
                                jQuery2.error(callbackName + " was not called");
                            }
                            return responseContainer[0];
                        };
                        s.dataTypes[0] = "json";
                        overwritten = window2[callbackName];
                        window2[callbackName] = function() {
                            responseContainer = arguments;
                        };
                        jqXHR.always(function() {
                            if (overwritten === void 0) {
                                jQuery2(window2).removeProp(callbackName);
                            } else {
                                window2[callbackName] = overwritten;
                            }
                            if (s[callbackName]) {
                                s.jsonpCallback = originalSettings.jsonpCallback;
                                oldCallbacks.push(callbackName);
                            }
                            if (responseContainer && isFunction(overwritten)) {
                                overwritten(responseContainer[0]);
                            }
                            responseContainer = overwritten = void 0;
                        });
                        return "script";
                    }
                });
                support.createHTMLDocument = function() {
                    var body = document2.implementation.createHTMLDocument("").body;
                    body.innerHTML = "<form></form><form></form>";
                    return body.childNodes.length === 2;
                }();
                jQuery2.parseHTML = function(data, context, keepScripts) {
                    if (typeof data !== "string") {
                        return [];
                    }
                    if (typeof context === "boolean") {
                        keepScripts = context;
                        context = false;
                    }
                    var base, parsed, scripts;
                    if (!context) {
                        if (support.createHTMLDocument) {
                            context = document2.implementation.createHTMLDocument("");
                            base = context.createElement("base");
                            base.href = document2.location.href;
                            context.head.appendChild(base);
                        } else {
                            context = document2;
                        }
                    }
                    parsed = rsingleTag.exec(data);
                    scripts = !keepScripts && [];
                    if (parsed) {
                        return [context.createElement(parsed[1])];
                    }
                    parsed = buildFragment([data], context, scripts);
                    if (scripts && scripts.length) {
                        jQuery2(scripts).remove();
                    }
                    return jQuery2.merge([], parsed.childNodes);
                };
                jQuery2.fn.load = function(url, params, callback) {
                    var selector, type, response, self = this,
                        off = url.indexOf(" ");
                    if (off > -1) {
                        selector = stripAndCollapse(url.slice(off));
                        url = url.slice(0, off);
                    }
                    if (isFunction(params)) {
                        callback = params;
                        params = void 0;
                    } else if (params && typeof params === "object") {
                        type = "POST";
                    }
                    if (self.length > 0) {
                        jQuery2.ajax({
                            url,
                            // If "type" variable is undefined, then "GET" method will be used.
                            // Make value of this field explicit since
                            // user can override it through ajaxSetup method
                            type: type || "GET",
                            dataType: "html",
                            data: params
                        }).done(function(responseText) {
                            response = arguments;
                            self.html(selector ? (
                                // If a selector was specified, locate the right elements in a dummy div
                                // Exclude scripts to avoid IE 'Permission Denied' errors
                                jQuery2("<div>").append(jQuery2.parseHTML(responseText)).find(selector)
                            ) : (
                                // Otherwise use the full result
                                responseText
                            ));
                        }).always(callback && function(jqXHR, status) {
                            self.each(function() {
                                callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
                            });
                        });
                    }
                    return this;
                };
                jQuery2.expr.pseudos.animated = function(elem) {
                    return jQuery2.grep(jQuery2.timers, function(fn) {
                        return elem === fn.elem;
                    }).length;
                };
                jQuery2.offset = {
                    setOffset: function(elem, options, i) {
                        var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery2.css(elem, "position"),
                            curElem = jQuery2(elem),
                            props = {};
                        if (position === "static") {
                            elem.style.position = "relative";
                        }
                        curOffset = curElem.offset();
                        curCSSTop = jQuery2.css(elem, "top");
                        curCSSLeft = jQuery2.css(elem, "left");
                        calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
                        if (calculatePosition) {
                            curPosition = curElem.position();
                            curTop = curPosition.top;
                            curLeft = curPosition.left;
                        } else {
                            curTop = parseFloat(curCSSTop) || 0;
                            curLeft = parseFloat(curCSSLeft) || 0;
                        }
                        if (isFunction(options)) {
                            options = options.call(elem, i, jQuery2.extend({}, curOffset));
                        }
                        if (options.top != null) {
                            props.top = options.top - curOffset.top + curTop;
                        }
                        if (options.left != null) {
                            props.left = options.left - curOffset.left + curLeft;
                        }
                        if ("using" in options) {
                            options.using.call(elem, props);
                        } else {
                            if (typeof props.top === "number") {
                                props.top += "px";
                            }
                            if (typeof props.left === "number") {
                                props.left += "px";
                            }
                            curElem.css(props);
                        }
                    }
                };
                jQuery2.fn.extend({
                    // offset() relates an element's border box to the document origin
                    offset: function(options) {
                        if (arguments.length) {
                            return options === void 0 ? this : this.each(function(i) {
                                jQuery2.offset.setOffset(this, options, i);
                            });
                        }
                        var rect, win, elem = this[0];
                        if (!elem) {
                            return;
                        }
                        if (!elem.getClientRects().length) {
                            return {
                                top: 0,
                                left: 0
                            };
                        }
                        rect = elem.getBoundingClientRect();
                        win = elem.ownerDocument.defaultView;
                        return {
                            top: rect.top + win.pageYOffset,
                            left: rect.left + win.pageXOffset
                        };
                    },
                    // position() relates an element's margin box to its offset parent's padding box
                    // This corresponds to the behavior of CSS absolute positioning
                    position: function() {
                        if (!this[0]) {
                            return;
                        }
                        var offsetParent, offset, doc, elem = this[0],
                            parentOffset = {
                                top: 0,
                                left: 0
                            };
                        if (jQuery2.css(elem, "position") === "fixed") {
                            offset = elem.getBoundingClientRect();
                        } else {
                            offset = this.offset();
                            doc = elem.ownerDocument;
                            offsetParent = elem.offsetParent || doc.documentElement;
                            while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery2.css(offsetParent, "position") === "static") {
                                offsetParent = offsetParent.parentNode;
                            }
                            if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
                                parentOffset = jQuery2(offsetParent).offset();
                                parentOffset.top += jQuery2.css(offsetParent, "borderTopWidth", true);
                                parentOffset.left += jQuery2.css(offsetParent, "borderLeftWidth", true);
                            }
                        }
                        return {
                            top: offset.top - parentOffset.top - jQuery2.css(elem, "marginTop", true),
                            left: offset.left - parentOffset.left - jQuery2.css(elem, "marginLeft", true)
                        };
                    },
                    // This method will return documentElement in the following cases:
                    // 1) For the element inside the iframe without offsetParent, this method will return
                    //    documentElement of the parent window
                    // 2) For the hidden or detached element
                    // 3) For body or html element, i.e. in case of the html node - it will return itself
                    //
                    // but those exceptions were never presented as a real life use-cases
                    // and might be considered as more preferable results.
                    //
                    // This logic, however, is not guaranteed and can change at any point in the future
                    offsetParent: function() {
                        return this.map(function() {
                            var offsetParent = this.offsetParent;
                            while (offsetParent && jQuery2.css(offsetParent, "position") === "static") {
                                offsetParent = offsetParent.offsetParent;
                            }
                            return offsetParent || documentElement;
                        });
                    }
                });
                jQuery2.each({
                    scrollLeft: "pageXOffset",
                    scrollTop: "pageYOffset"
                }, function(method, prop) {
                    var top = "pageYOffset" === prop;
                    jQuery2.fn[method] = function(val) {
                        return access(this, function(elem, method2, val2) {
                            var win;
                            if (isWindow(elem)) {
                                win = elem;
                            } else if (elem.nodeType === 9) {
                                win = elem.defaultView;
                            }
                            if (val2 === void 0) {
                                return win ? win[prop] : elem[method2];
                            }
                            if (win) {
                                win.scrollTo(!top ? val2 : win.pageXOffset,
                                    top ? val2 : win.pageYOffset
                                );
                            } else {
                                elem[method2] = val2;
                            }
                        }, method, val, arguments.length);
                    };
                });
                jQuery2.each(["top", "left"], function(_i, prop) {
                    jQuery2.cssHooks[prop] = addGetHookIf(
                        support.pixelPosition,
                        function(elem, computed2) {
                            if (computed2) {
                                computed2 = curCSS(elem, prop);
                                return rnumnonpx.test(computed2) ? jQuery2(elem).position()[prop] + "px" : computed2;
                            }
                        }
                    );
                });
                jQuery2.each({
                    Height: "height",
                    Width: "width"
                }, function(name, type) {
                    jQuery2.each({
                            padding: "inner" + name,
                            content: type,
                            "": "outer" + name
                        },
                        function(defaultExtra, funcName) {
                            jQuery2.fn[funcName] = function(margin, value) {
                                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                                    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                                return access(this, function(elem, type2, value2) {
                                    var doc;
                                    if (isWindow(elem)) {
                                        return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
                                    }
                                    if (elem.nodeType === 9) {
                                        doc = elem.documentElement;
                                        return Math.max(
                                            elem.body["scroll" + name],
                                            doc["scroll" + name],
                                            elem.body["offset" + name],
                                            doc["offset" + name],
                                            doc["client" + name]
                                        );
                                    }
                                    return value2 === void 0 ? (
                                        // Get width or height on the element, requesting but not forcing parseFloat
                                        jQuery2.css(elem, type2, extra)
                                    ) : (
                                        // Set width or height on the element
                                        jQuery2.style(elem, type2, value2, extra)
                                    );
                                }, type, chainable ? margin : void 0, chainable);
                            };
                        }
                    );
                });
                jQuery2.each([
                    "ajaxStart",
                    "ajaxStop",
                    "ajaxComplete",
                    "ajaxError",
                    "ajaxSuccess",
                    "ajaxSend"
                ], function(_i, type) {
                    jQuery2.fn[type] = function(fn) {
                        return this.on(type, fn);
                    };
                });
                jQuery2.fn.extend({
                    bind: function(types, data, fn) {
                        return this.on(types, null, data, fn);
                    },
                    unbind: function(types, fn) {
                        return this.off(types, null, fn);
                    },
                    delegate: function(selector, types, data, fn) {
                        return this.on(types, selector, data, fn);
                    },
                    undelegate: function(selector, types, fn) {
                        return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
                    },
                    hover: function(fnOver, fnOut) {
                        return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
                    }
                });
                jQuery2.each(
                    "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),
                    function(_i, name) {
                        jQuery2.fn[name] = function(data, fn) {
                            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
                        };
                    }
                );
                var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                jQuery2.proxy = function(fn, context) {
                    var tmp, args, proxy;
                    if (typeof context === "string") {
                        tmp = fn[context];
                        context = fn;
                        fn = tmp;
                    }
                    if (!isFunction(fn)) {
                        return void 0;
                    }
                    args = slice.call(arguments, 2);
                    proxy = function() {
                        return fn.apply(context || this, args.concat(slice.call(arguments)));
                    };
                    proxy.guid = fn.guid = fn.guid || jQuery2.guid++;
                    return proxy;
                };
                jQuery2.holdReady = function(hold) {
                    if (hold) {
                        jQuery2.readyWait++;
                    } else {
                        jQuery2.ready(true);
                    }
                };
                jQuery2.isArray = Array.isArray;
                jQuery2.parseJSON = JSON.parse;
                jQuery2.nodeName = nodeName;
                jQuery2.isFunction = isFunction;
                jQuery2.isWindow = isWindow;
                jQuery2.camelCase = camelCase;
                jQuery2.type = toType;
                jQuery2.now = Date.now;
                jQuery2.isNumeric = function(obj) {
                    var type = jQuery2.type(obj);
                    return (type === "number" || type === "string") && // parseFloat NaNs numeric-cast false positives ("")
                        // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
                        // subtraction forces infinities to NaN
                        !isNaN(obj - parseFloat(obj));
                };
                jQuery2.trim = function(text) {
                    return text == null ? "" : (text + "").replace(rtrim, "");
                };
                if (typeof define === "function" && define.amd) {
                    define("jquery", [], function() {
                        return jQuery2;
                    });
                }
                var _jQuery = window2.jQuery,
                    _$ = window2.$;
                jQuery2.noConflict = function(deep) {
                    if (window2.$ === jQuery2) {
                        window2.$ = _$;
                    }
                    if (deep && window2.jQuery === jQuery2) {
                        window2.jQuery = _jQuery;
                    }
                    return jQuery2;
                };
                if (typeof noGlobal === "undefined") {
                    window2.jQuery = window2.$ = jQuery2;
                }
                return jQuery2;
            });
        }
    });

    // projects/user_pages/app/javascript/lander/submit.ts
    var submit_exports = {};
    __export(submit_exports, {
        checkValidInputs: () => checkValidInputs,
        restoreButtonState: () => restoreButtonState,
        submitPage: () => submitPage
    });

    function restoreButtonState() {
        (0, import_jquery.default)('.elBTN a[href="#submit-form"]').each(function() {
            const $this = (0, import_jquery.default)(this);
            const $text = $this.find(".elButtonMainText");
            const $subText = $this.find(".elButtonSub");
            const previousText = $this.attr("data-before-submit-text");
            const previousSub = $this.attr("data-before-submit-sub");
            const loadingSpinner = $text.parent().find(".elButtonSpinner");
            loadingSpinner.css("display", "none");
            if (previousText) {
                $this.removeClass("cf-submitting-page");
                $text.text(previousText);
                $subText.text(previousSub);
                $this.removeAttr("data-before-submit-text");
                $this.removeAttr("data-before-submit-sub");
            }
        });
    }

    function setButtonSubmitText(text, subtext) {
        (0, import_jquery.default)('.elBTN a[href="#submit-form"]').each(function() {
            var _a3;
            const $this = (0, import_jquery.default)(this);
            const $text = $this.find(".elButtonMainText");
            const $subText = $this.find(".elButtonSub");
            const $parent = $this.parent();
            const submitText = text != null ? text : ((_a3 = $parent.attr("data-param-submittingtext")) == null ? void 0 : _a3.length) ? $parent.attr("data-param-submittingtext") : "Submitting...";
            const dataBeforeSubmit = $this.attr("data-before-submit-text");
            if (!dataBeforeSubmit) {
                $this.attr("data-before-submit-text", $text.text());
                $this.attr("data-before-submit-sub", $subText.text());
                $this.addClass("cf-submitting-page");
            }
            const loadingSpinner = $this.find(".elButtonSpinner");
            $text.text(`${submitText}`);
            $subText.text(subtext != null ? subtext : "");
            loadingSpinner.css("display", "inline-block");
        });
    }

    function sleepMs(timeMs) {
        return __async(this, null, function*() {
            return new Promise((resolve) => {
                setTimeout(resolve, timeMs);
            });
        });
    }

    function submitOrderAsync(body, maxRetries = 3, onBeforeSubmit, onRetryAfter) {
        return __async(this, null, function*() {
            let response;
            for (let i = 0; i < maxRetries; i++) {
                try {
                    onBeforeSubmit();
                    response = yield fetch(window.location.href, {
                        credentials: "same-origin",
                        method: "post",
                        body,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "X-CF2-POST-TYPE": "submit"
                        }
                    });
                    if (response.status === 429) {
                        const sleepTime = parseInt(response.headers.get("Retry-After"));
                        onRetryAfter(sleepTime);
                        console.log(`Waiting on queue, retrying after ${sleepTime}`);
                        yield sleepMs(sleepTime);
                    } else {
                        break;
                    }
                } catch (err) {
                    console.log(err);
                    yield sleepMs(5e3);
                }
            }
            return response;
        });
    }

    function submitPage() {
        var _a3, _b, _c, _d;
        const data = globalThis.processForm();
        (0, import_jquery.default)("#cfAR .purchaseInput").remove();
        (_b = (_a3 = data.purchase) == null ? void 0 : _a3.product_variants) == null ? void 0 : _b.forEach((pv) => {
            (0, import_jquery.default)("#cfAR").append(
                `<input type="text" class="purchaseInput" name="purchase[product_variants][][id]" value="${pv.id}" />`
            );
            (0, import_jquery.default)("#cfAR").append(
                `<input type="number" class="purchaseInput" name="purchase[product_variants][][quantity]" value="${pv.quantity}"/>`
            );
            (0, import_jquery.default)("#cfAR").append(
                `<input type="number" class="purchaseInput" name="purchase[product_variants][][price_id]" value="${pv.price_id}" />`
            );
        });
        (_d = (_c = data.purchase) == null ? void 0 : _c.coupon_codes) == null ? void 0 : _d.forEach((couponCode) => {
            (0, import_jquery.default)("#cfAR").append(
                `<input type="text" class="purchaseInput" name="purchase[coupon_codes][]" value="${couponCode}" />`
            );
        });
        (0, import_jquery.default)("#cfAR").append('<input type="text" class="purchaseInput" name="purchase[process_new_order]" value="true" />');
        clearBlankInputFields();
        const formData = (0, import_jquery.default)("#cfAR").serialize();
        let timer = null;
        globalThis.CFDispatchEvent(CFEvents.FORM_SUBMITTED, data);
        submitOrderAsync(
            formData,
            3,
            () => {
                clearInterval(timer);
                setButtonSubmitText();
            },
            (sleepTime) => {
                let remainingSeconds = sleepTime / 1e3;
                clearInterval(timer);
                timer = setInterval(() => {
                    remainingSeconds -= 1;
                    setButtonSubmitText("Waiting on queue", `(Retrying in ${remainingSeconds}s)`);
                }, 1e3);
            }
        ).then((response) => {
            var _a4;
            if (response.ok) {
                globalThis.CFDispatchEvent(CFEvents.FORM_SUBMITTED_OK, data);
                const rawFlashes = response.headers.get("X-CF2-FLASHES");
                const flashes = JSON.parse(rawFlashes != null ? rawFlashes : "{}");
                if (flashes.error) {
                    clearInterval(timer);
                    window.dispatchEvent(
                        new CustomEvent("checkout:order-submit-errors", {
                            detail: {
                                error: `Failed to submit: ${flashes.error}`
                            }
                        })
                    );
                    restoreButtonState();
                } else if (response.headers.get("X-CF2-APPROVAL-URL")) {
                    const approvalUrl = response.headers.get("X-CF2-APPROVAL-URL");
                    const auxWrapper = document.querySelector(".multiple-payment-aux-frame");
                    const $auxWrapper = (0, import_jquery.default)(auxWrapper);
                    const iframe = document.createElement("iframe");
                    const orderStautsIframe = "/cf_order_status?disable-dispatch=true";
                    iframe.onload = () => {
                        if (iframe.src.includes(orderStautsIframe)) {
                            $auxWrapper.css("display", "flex");
                            iframe.src = approvalUrl;
                        }
                    };
                    auxWrapper.innerHTML = "";
                    auxWrapper.appendChild(iframe);
                    iframe.src = orderStautsIframe;
                } else {
                    globalThis.CFDispatchEvent(CFEvents.FORM_SUBMITTED_FINALIZED, data);
                    window.location.href = response.headers.get("Location");
                }
            } else if (response.status === 429) {
                clearInterval(timer);
                setButtonSubmitText("Failed to submit", "Retry again in a few seconds");
                sleepMs(5e3).then(() => {
                    window.dispatchEvent(new CustomEvent("payments:submit-failed"));
                    restoreButtonState();
                });
            } else if (response.status >= 300 && response.status < 400) {
                window.location.href = (_a4 = response.headers.get("Location")) != null ? _a4 : window.location.href;
            } else {
                window.dispatchEvent(new CustomEvent("checkout:order-submit-errors"));
            }
        }).catch((err) => {
            console.log(err);
            clearInterval(timer);
            window.dispatchEvent(new CustomEvent("payments:submit-failed"));
            restoreButtonState();
        });
    }

    function clearBlankInputFields() {
        (0, import_jquery.default)("#cfAR").find("input,select,textarea").each((index, input) => {
            if (input.value == "") {
                input.remove();
            }
        });
    }

    function getPurchaseForm() {
        var _a3;
        const orderCart = (_a3 = window["OrderCart/V1"]) == null ? void 0 : _a3.default;
        if (!orderCart)
            return {};
        const products = orderCart == null ? void 0 : orderCart.productVariants;
        const formPurchaseProductVariants = products == null ? void 0 : products.map((product) => {
            return {
                id: product.id,
                price_id: product.priceId,
                quantity: product.quantity
            };
        });
        const rebillyToken = (0, import_jquery.default)('#cfAR input[data-rebilly="token"]').val();
        return {
            purchase: {
                product_variants: formPurchaseProductVariants,
                rebilly_token: rebillyToken,
                coupon_codes: [orderCart == null ? void 0 : orderCart.couponCode].filter(Boolean)
            }
        };
    }

    function getContactForm() {
        const data = {
            contact: {}
        };
        (0, import_jquery.default)('.elFormItem:not([data-prevent-submit="true"])').each(function() {
            const $this = (0, import_jquery.default)(this);
            let name = $this.attr("name");
            if (name == "" || name == "not-set")
                return;
            if (["country", "state"].includes(name)) {
                name = "shipping_" + name;
            }
            let value = $this.val();
            if (name == "phone_number" && this.iti) {
                value = this.iti.getNumber();
            }
            if (this.getAttribute("type") == "checkbox") {
                value = $this.is(":checked");
                data.contact[name] = value;
            } else if (value) {
                data.contact[name] = value;
            }
            const $contactInput = (0, import_jquery.default)("#cf_contact_" + name);
            if ($contactInput.length == 0 && name) {
                let customType = name.toLowerCase();
                customType = customType.replace(/\s+/g, "_");
                (0, import_jquery.default)("#cf_contact_" + customType).remove();
                const input = document.createElement("INPUT");
                input.id = "cf_contact_" + customType;
                input.name = customType;
                input.setAttribute("value", value);
                input.setAttribute("data-cf-form-field", customType);
                input.setAttribute("data-param", customType);
                input.setAttribute("data-storage", "false");
                (0, import_jquery.default)("#cfAR").append(input);
            } else {
                if ($this.attr("data-prevent-submit") == "true") {
                    $contactInput.val("");
                } else {
                    $contactInput.val(value);
                }
            }
        });
        return data;
    }

    function validateEmail(email) {
        email = import_jquery.default.trim(email);
        const re = /^(([^<>()[\]\\.,;:#`%\s@"]+(\.[^<>()[\]\\.,;:#`%\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function checkValidInputs() {
        const popupVisibleCheck = (0, import_jquery.default)(".modal-wrapper").is(":visible");
        let fail = false;
        let elementPathSelector;
        if (popupVisibleCheck == true) {
            elementPathSelector = "#modalPopup .elFormItem.required1";
        } else {
            elementPathSelector = ".pageRoot .elFormItem.required1";
        }
        (0, import_jquery.default)(elementPathSelector).each(function() {
            let thisInput = (0, import_jquery.default)(this);
            const visible = (0, import_jquery.default)(this).is(":visible");
            if (visible) {
                let value = thisInput.val();
                const isSelect = thisInput.is("select");
                if (isSelect) {
                    value = thisInput.find(":selected").attr("value");
                }
                const parent = thisInput.parents(".elFormItemWrapper");
                thisInput = parent.length && parent.find(".inputHolder, .borderHolder, .elCheckbox").length ? parent.find(".inputHolder, .borderHolder, .elCheckbox") : thisInput;
                if (thisInput.is(":checkbox") ? !thisInput.is(":checked") : value === null || typeof value === "undefined" || value === "") {
                    fail = true;
                    thisInput.css("border-color", "#B91517");
                    thisInput.css("border-width", "3px");
                } else {
                    if (thisInput.attr("name") == "email") {
                        if (validateEmail(value)) {
                            thisInput.css("border-color", "#4a8920");
                            thisInput.css("border-width", "3px");
                        } else {
                            fail = true;
                            thisInput.css("border-color", "#B91517");
                            thisInput.css("border-width", "3px");
                        }
                    } else {
                        thisInput.css("border-color", "#4a8920");
                        thisInput.css("border-width", "3px");
                    }
                }
            }
        });
        return fail == false;
    }

    function mailCheck() {
        const inputsSelector = Array.from(document.getElementsByName("email"));
        inputsSelector.forEach((input, index) => {
            const mailCheckNode = document.createElement("div");
            mailCheckNode.classList.add("mailcheck");
            mailCheckNode.classList.add(`index${index}`);
            input.parentElement.appendChild(mailCheckNode);
            input.addEventListener("blur", function() {
                Mailcheck.run({
                    email: this.value,
                    domains: defaultDomains,
                    secondLevelDomains: defaultSecondLevelDomains,
                    // optional
                    topLevelDomains: defaultTopLevelDomains,
                    // optional
                    suggested: function(suggestion) {
                        mailCheckNode.innerHTML = `<span>Did you mean <b>${suggestion.full}?</b></span>`;
                    },
                    empty: function() {
                        mailCheckNode.innerHTML = "";
                    }
                });
            });
        });
    }

    function handleEnterSubmit() {
        const popupVisibleCheck = (0, import_jquery.default)(".modal-wrapper").is(":visible");
        let buttonsPathSelector;
        if (popupVisibleCheck == true) {
            buttonsPathSelector = '#modalPopup .elBTN a[href="#submit-form"]:visible';
        } else {
            buttonsPathSelector = '.pageRoot .elBTN a[href="#submit-form"]:visible';
        }
        const submitButton = (0, import_jquery.default)(buttonsPathSelector).first();
        handleFormSubmit(submitButton);
    }

    function setupEnterKeySubmit() {
        const inputsPathSelector = ".elFormItem";
        (0, import_jquery.default)(inputsPathSelector).each(function() {
            const thisInput = (0, import_jquery.default)(this);
            if (thisInput.closest('[data-page-element="Checkout/V1"]').length > 0) {
                return true;
            }
            if (thisInput.closest('[data-page-element="Checkout/V2"]').length > 0) {
                return true;
            }
            thisInput.on("keypress", function(evt) {
                if (evt.key === "Enter") {
                    handleEnterSubmit();
                }
            });
        });
    }

    function setRedirectOverride($button) {
        let redirectOverride;
        if ($button.parents(".elBTN").length) {
            redirectOverride = $button.attr("data-on-submit-go-to");
        }
        if (redirectOverride) {
            (0, import_jquery.default)("#cfAR").append(`<input type="text" class="redirectParams" name="redirect_to" value="${redirectOverride}" />`);
        } else {
            (0, import_jquery.default)("#cfAR .redirectParams").remove();
        }
    }

    function handleFormSubmit($button) {
        setRedirectOverride($button);
        setButtonSubmitText();
        if ((0, import_jquery.default)(".pai-payment-methods-inner:visible").length > 0) {
            const $rebillySubmit = (0, import_jquery.default)(".pai-submit");
            const $rebillyForm = (0, import_jquery.default)(".elPAI");
            if ($rebillySubmit.length) {
                $rebillySubmit.trigger("click");
                return;
            } else if ($rebillyForm.length) {
                rebillyProcessOrder();
                return;
            } else if (!checkValidInputs()) {
                restoreButtonState();
                return;
            }
        }
        if (checkValidInputs()) {
            submitPage();
        } else {
            restoreButtonState();
        }
        return true;
    }
    var import_jquery;
    var init_submit = __esm({
        "projects/user_pages/app/javascript/lander/submit.ts" () {
            init_define_process();
            init_rebilly_element();
            init_domains();
            init_main();
            import_jquery = __toESM(require_jquery());
            globalThis.processForm = function() {
                return __spreadValues(__spreadValues({}, getPurchaseForm()), getContactForm());
            };
            globalThis.submitPage = submitPage;
            globalThis.handleFormSubmit = handleFormSubmit;
            globalThis.setButtonSubmitText = setButtonSubmitText;
            globalThis.restoreButtonState = restoreButtonState;
            globalThis.setRedirectOverride = setRedirectOverride;
            window.addEventListener("load", function() {
                mailCheck();
                setupEnterKeySubmit();
                (0, import_jquery.default)(document).on("click", '[href="#submit-form"],[data-element-link="#submit-form"]', function() {
                    const $button = (0, import_jquery.default)(this);
                    if ($button.closest('[data-page-element="Checkout/V1"]').length == 0) {
                        handleFormSubmit($button);
                    }
                });
            });
        }
    });

    // projects/user_pages/app/javascript/lander/rebilly_element.ts
    var rebilly_element_exports = {};
    __export(rebilly_element_exports, {
        rebillyProcessOrder: () => rebillyProcessOrder
    });

    function leadSourceGenerator() {
        const DEFAULT_MAX_CHARS_LENGTH = 512;
        const leadQueryParamMapping = {
            utm_source: {
                name: "source"
            },
            utm_medium: {
                name: "medium"
            },
            utm_campaign: {
                name: "campaign"
            },
            utm_term: {
                name: "term"
            },
            utm_content: {
                name: "content"
            },
            affiliate: {},
            subAffiliate: {},
            clickId: {},
            salesAgent: {}
        };
        const params = new URLSearchParams(window.location.search);
        return Array.from(params.keys()).reduce((acc, key) => {
            var _a3;
            const mappedValue = leadQueryParamMapping[key];
            if (mappedValue) {
                const paramValue = params.get(key);
                const leadSourceName = (_a3 = mappedValue.name) != null ? _a3 : key;
                acc[leadSourceName] = paramValue.substring(0, DEFAULT_MAX_CHARS_LENGTH);
            }
            return acc;
        }, {});
    }
    var scrollToForm, rebillyProcessOrder;
    var init_rebilly_element = __esm({
        "projects/user_pages/app/javascript/lander/rebilly_element.ts" () {
            init_define_process();
            init_submit();
            scrollToForm = () => {
                if (!$(".elPAI").length)
                    return;
                $([document.documentElement, document.body]).animate({
                    scrollTop: $(".elPAI").offset().top - 50
                }, 200);
            };
            globalThis.addEventListener("load", function() {
                $(document).on("change", ".elInput", function() {
                    globalThis.processForm();
                });
                window.addEventListener("payments:token-ready", () => {
                    globalThis.processForm();
                    if (!checkValidInputs()) {
                        restoreButtonState();
                        scrollToForm();
                        this.window.dispatchEvent(new CustomEvent("payments:submit-failed"));
                        return;
                    }
                    submitPage();
                });
            });
            rebillyProcessOrder = () => {
                const Rebilly = globalThis.Rebilly;
                let extraData = {
                    method: globalThis.paymentsSelectedPaymentMethod
                };
                const leadSource = leadSourceGenerator();
                if (Object.keys(leadSource).length) {
                    extraData = __spreadProps(__spreadValues({}, extraData), {
                        leadSource
                    });
                }
                const form = document.querySelector("#cfAR");
                window.dispatchEvent(new CustomEvent("payments:clear-errors"));
                globalThis.processForm();
                if (!checkValidInputs()) {
                    restoreButtonState();
                    scrollToForm();
                    window.dispatchEvent(new CustomEvent("payments:submit-failed"));
                    return;
                }
                Rebilly.createToken(form, extraData).then(function(result) {
                    console.log("Framepay success", result);
                    globalThis.parent.postMessage("success", "*");
                    submitPage();
                }).catch(function(error) {
                    console.log("Framepay error", error);
                    globalThis.parent.postMessage("error", "*");
                    form.querySelector('input[data-rebilly="token"]').value = "";
                    window.dispatchEvent(
                        new CustomEvent("payments:set-token-error", {
                            detail: {
                                error
                            }
                        })
                    );
                    restoreButtonState();
                    scrollToForm();
                    window.dispatchEvent(new CustomEvent("payments:submit-failed"));
                });
            };
            globalThis.rebillyProcessOrder = rebillyProcessOrder;
            globalThis.scrollToForm = scrollToForm;
        }
    });

    // projects/user_pages/app/javascript/lander/upsell_element.js
    var upsell_element_exports = {};
    __export(upsell_element_exports, {
        submitUpsellOrder: () => submitUpsellOrder
    });
    var submitUpsellOrder;
    var init_upsell_element = __esm({
        "projects/user_pages/app/javascript/lander/upsell_element.js" () {
            init_define_process();
            init_submit();
            (function() {
                window.addEventListener("load", function() {
                    $(document).on("click", "#upsell-submit-button", function(event) {
                        event.preventDefault();
                        submitUpsellOrder();
                    });
                });
            })();
            submitUpsellOrder = () => {
                $("#cfAR input[data-order-form]").val(true);
                submitPage();
            };
        }
    });

    // projects/user_pages/app/javascript/lander/order/main.ts
    var main_exports = {};
    var init_main2 = __esm({
        "projects/user_pages/app/javascript/lander/order/main.ts" () {
            init_define_process();
            (function() {
                window.addEventListener("load", function() {
                    var _a3;
                    const orderCart = (_a3 = window["OrderCart/V1"]) == null ? void 0 : _a3.default;
                    let previousRadioProductVariant;
                    document.querySelectorAll(".elOrderSelect").forEach(function(orderSelect) {
                        const type = orderSelect.getAttribute("data-order-select-type");
                        if (type == "single") {
                            const firstInput = orderSelect.querySelector('input[type="radio"]');
                            if (firstInput) {
                                firstInput.checked = true;
                            }
                            const newProductVariant = orderCart.getProductVariant(firstInput, "single");
                            previousRadioProductVariant = newProductVariant;
                            orderCart.updateProductVariant(newProductVariant);
                        }
                    });
                    $(document).on("change", '.elOrderSelect input[type="radio"]', function(event) {
                        const input = event.target;
                        $(`.elOrderSelect input[type="radio"][value=${input.value}]`).prop("checked", true);
                        const newProductVariant = orderCart.getProductVariant(input, "single");
                        if (previousRadioProductVariant) {
                            orderCart.incrementProductVariantQuantity(previousRadioProductVariant, -1);
                        }
                        orderCart.updateProductVariant(newProductVariant);
                        previousRadioProductVariant = newProductVariant;
                    });
                    $(document).on("change", '.elOrderSelect input[type="number"]', function(event) {
                        const input = event.target;
                        const productVariantId = input.getAttribute("data-product-variant-id");
                        const quantity = input.value;
                        $(`.elOrderSelect input[type="number"][data-product-variant-id="${productVariantId}"]`).val(quantity);
                        const productVariant = orderCart.getProductVariant(input, "multiple");
                        orderCart.updateProductVariant(productVariant);
                    });
                    $(document).on("change", ".elOrderProductOptionsPrice select", function(event) {
                        const priceSelect = event.target;
                        const productVariantId = priceSelect.getAttribute("data-product-variant-id");
                        const priceId = priceSelect.value;
                        const priceCents = priceSelect.querySelector(`option[value="${priceId}"`).getAttribute("data-product-variant-price-cents");
                        const orderSelectType = document.querySelector(".elOrderSelect").getAttribute("data-order-select-type");
                        const orderSelectInputType = orderSelectType == "single" ? "radio" : "number";
                        const productVariantInput = document.querySelector(
                            `.elOrderSelect input[type="${orderSelectInputType}"][data-product-variant-id="${productVariantId}"]`
                        );
                        productVariantInput.setAttribute("data-product-variant-price-id", priceId);
                        productVariantInput.setAttribute("data-product-variant-price-cents", priceCents);
                        if (orderSelectType == "single" && !productVariantInput.checked)
                            return;
                        const productVariant = orderCart.getProductVariant(productVariantInput, orderSelectType);
                        orderCart.updateProductVariant(productVariant);
                    });
                    $(document).on("change", ".elOrderBump input", function(event) {
                        const input = event.target;
                        const productVariant = orderCart.getProductVariant(input);
                        orderCart.updateProductVariant(productVariant);
                    });
                    $(document).on("change", ".elOrderBump select", function(event) {
                        const select = event.target;
                        const productId = select.getAttribute("data-product-id");
                        const selectedOption = select.querySelector(`option[value="${select.value}"]`);
                        const productInput = document.querySelector(
                            `.elOrderBump input[data-product-id="${productId}"]`
                        );
                        const variantAttrs = ["id", "name", "price-id", "price-cents", "price-currency"];
                        variantAttrs.forEach(function(variantAttr) {
                            productInput.setAttribute(
                                `data-product-variant-${variantAttr}`,
                                selectedOption.getAttribute(`data-product-variant-${variantAttr}`)
                            );
                        });
                        if (!productInput.checked)
                            return;
                        const productVariant = orderCart.getProductVariant(productInput);
                        orderCart.updateProductVariant(productVariant);
                    });
                    $(document).on("click", ".elOrderCoupon button", function() {
                        const input = document.querySelector(".elOrderCoupon input");
                        orderCart.updateCouponCode(input.value);
                    });
                    document.querySelectorAll(".elOrderCoupon input[readonly]").forEach(function(element) {
                        element.removeAttribute("readonly");
                    });
                });
            })();
        }
    });

    // projects/user_pages/app/javascript/lander/runtime.ts
    var runtime_exports = {};
    __export(runtime_exports, {
        CF2Component: () => CF2Component,
        ForloopDrop: () => ForloopDrop
    });

    function uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0,
                v = c == "x" ? r : r & 3 | 8;
            return v.toString(16);
        });
    }
    var styleGuideAttributes, CF2Component, ForloopDrop, _a2, CF2ComponentSingleton;
    var init_runtime = __esm({
        "projects/user_pages/app/javascript/lander/runtime.ts" () {
            init_define_process();
            styleGuideAttributes = [
                "data-style-guide-shadow",
                "data-style-guide-border",
                "data-style-guide-button",
                "data-style-guide-headline",
                "data-style-guide-subheadline",
                "data-style-guide-content",
                "data-style-guide-corner"
            ];
            CF2Component = class {
                constructor(element, runTimeSelectors) {
                    this.element = element;
                    var _a3;
                    this.subscribers = {};
                    this.id = Array.from(this.element.classList).find((c) => c.startsWith("id"));
                    for (const propertyName of Object.getOwnPropertyNames(this.constructor.prototype)) {
                        if (typeof this.constructor.prototype[propertyName] === "function") {
                            this.subscribers[propertyName] = [];
                        }
                    }
                    for (const dataName in this.element.dataset) {
                        if (!dataName.startsWith("param")) {
                            this[dataName] = this.element.dataset[dataName];
                        }
                    }
                    runTimeSelectors = runTimeSelectors == null ? void 0 : runTimeSelectors.map((selector) => {
                        const selectorName = selector[0].replace(`[data-page-element="${this.element.getAttribute("data-page-element")}"]`, "").trim();
                        return [selectorName, selector[1]];
                    });
                    const stateNodeData = CF2Component.getStateNodeData(this.element);
                    this.runtimeSelectors = [...runTimeSelectors != null ? runTimeSelectors : []];
                    if (stateNodeData) {
                        Object.assign(this, stateNodeData);
                        this.runtimeSelectors = [...this.runtimeSelectors, ...(_a3 = stateNodeData.runtimeSelectors) != null ? _a3 : []];
                    }
                    if (this.runtimeSelectors.length > 0) {
                        this.mutationOberver = new MutationObserver((mut) => this.onMutation(mut));
                        this.mutationOberver.observe(this.element, {
                            attributeOldValue: true,
                            attributeFilter: ["class"],
                            subtree: true
                        });
                    }
                }
                static getStateNodeData(element) {
                    const id = element.getAttribute("data-state-node-script-id");
                    const stateNode = id && document.getElementById(id);
                    if (id && stateNode) {
                        return JSON.parse(stateNode.textContent);
                    }
                }
                onMutation(mutations) {
                    for (const mutation of mutations) {
                        const element = mutation.target;
                        for (const styleGuideAttr of styleGuideAttributes) {
                            $(`[${styleGuideAttr}]`, element).removeAttr(styleGuideAttr);
                        }
                    }
                    this.updateRuntimeState();
                }
                updateRuntimeState() {
                    for (const [selector, attrs] of this.runtimeSelectors) {
                        const $selected = $(selector, this.element);
                        for (const attr in attrs) {
                            $selected.attr(attr, attrs[attr]);
                        }
                    }
                }
                // eslint-disable-next-line
                mount(element) {}
                getComponent(name) {
                    var _a3;
                    return (_a3 = this.element.querySelector(`[data-page-element="${name}"]`)) == null ? void 0 : _a3.cf2_instance;
                }
                getComponents(name) {
                    var _a3;
                    return (_a3 = Array.from(this.element.querySelectorAll(`[data-page-element="${name}"]`))) == null ? void 0 : _a3.map(
                        (c) => c.cf2_instance
                    );
                }
                getAllComponents() {
                    var _a3;
                    const componentList = {};
                    (_a3 = Array.from(this.element.querySelectorAll("[data-page-element]"))) == null ? void 0 : _a3.forEach((c) => {
                        const pageElement = c.getAttribute("data-page-element").replace("/", "");
                        componentList[pageElement] = c.cf2_instance;
                    });
                    return componentList;
                }
                on(eventName, eventHandler) {
                    if (this.subscribers[eventName]) {
                        this.subscribers[eventName].push(eventHandler);
                    } else {
                        console.warn(`Event ${eventName} not supported by ${this.constructor.name}`);
                    }
                }
                // NOTE: Build components by firstly building inner elements, and then walking up tree.
                // As we need to move from the leaf nodes to parent nodes. It also accepts a list of old
                // components in which you can re-use components built from an old list.
                static hydrateTree(parentNode, parentNodeRunTimeSelectors) {
                    const nodes = (parentNode != null ? parentNode : document).querySelectorAll("[data-page-element]");
                    nodes.forEach((node) => {
                        var _a3, _b;
                        const closestPageElement = $(node.parentNode).closest("[data-page-element]")[0];
                        if (closestPageElement == parentNode || closestPageElement == null) {
                            const nodeRunTimeSelectors = [
                                ...(_b = (_a3 = CF2Component.getStateNodeData(node)) == null ? void 0 : _a3.runtimeSelectors) != null ? _b : [],
                                ...parentNodeRunTimeSelectors != null ? parentNodeRunTimeSelectors : []
                            ];
                            CF2Component.hydrateTree(node, nodeRunTimeSelectors);
                            const klassName = node.getAttribute("data-page-element").replace("/", "");
                            const ComponentBuilder = window[klassName];
                            if (ComponentBuilder) {
                                node.cf2_instance = new ComponentBuilder(node, nodeRunTimeSelectors);
                                node.cf2_instance.mount();
                                node.cf2_instance.updateRuntimeState();
                            }
                        }
                    });
                }
            };
            globalThis.CF2Component = CF2Component;
            globalThis.CF2HydrateTreeInitialized = false;
            window.addEventListener("DOMContentLoaded", () => {
                if (!globalThis.CF2HydrateTreeInitialized)
                    CF2Component.hydrateTree();
                globalThis.CF2HydrateTreeInitialized = true;
            });
            ForloopDrop = class {
                constructor(length) {
                    this.i = 0;
                    this.length = length;
                }
                next() {
                    this.i++;
                }
                get index0() {
                    return this.i;
                }
                get index() {
                    return this.i + 1;
                }
                get first() {
                    return this.i === 0;
                }
                get last() {
                    return this.i === this.length - 1;
                }
                get rindex() {
                    return this.length - this.i;
                }
                get rindex0() {
                    return this.length - this.i - 1;
                }
            };
            globalThis.CF2ForloopDrop = ForloopDrop;
            globalThis.CF2Utils = (_a2 = globalThis.CF2Utils) != null ? _a2 : {};
            globalThis.CF2Utils.uuidv4 = uuidv4;
            CF2ComponentSingleton = class {
                static getInstance() {
                    if (this._instance) {
                        return this._instance;
                    }
                    this._instance = new this();
                    return this._instance;
                }
            };
            globalThis.CF2ComponentSingleton = CF2ComponentSingleton;
        }
    });

    // projects/user_pages/app/javascript/lander/action_link.ts
    var require_action_link = __commonJS({
        "projects/user_pages/app/javascript/lander/action_link.ts" () {
            init_define_process();

            function setupActionLinkListeners() {
                $(document).on("click", "a[href='#print'], [data-element-link='#print']", function() {
                    window.print();
                    return false;
                });
                $(document).on("click", "[data-element-link='#open-popup'], [href='#open-popup']", function(evt) {
                    const checkIfShowHide = evt.target.parentElement.getAttribute("data-elbuttontype");
                    if (typeof checkIfShowHide == "undefined" || !["2", "showHide"].includes(checkIfShowHide)) {
                        globalThis.CFOpenPopup();
                    }
                });
                $(document).on("click", "[data-element-link='#close-popup'], [href='#close-popup']", function() {
                    globalThis.CFClosePopup();
                });
                $(document).on("click", "a[href*='#scroll-'], [data-element-link*='#scroll-']", function(evt) {
                    var _a3;
                    const href = (_a3 = evt.currentTarget.getAttribute("href")) != null ? _a3 : "";
                    const [, id] = href == null ? void 0 : href.split("#scroll-");
                    if (id) {
                        const $el = $(`.${id}`);
                        const popupParent = $el.parents(".modal-wrapper");
                        $(popupParent.length > 0 ? popupParent : "html, body").animate({
                            scrollTop: $el.offset().top
                        }, 500);
                    }
                    return false;
                });
                const getElementsIds = (evt, type) => (evt.currentTarget.getAttribute(`data-${type}-button-ids`) || "").split(",").filter((s) => s);
                const performActionOnId = (id, action2) => {
                    const $el = $(`.${id}`);
                    $el[action2](500);
                };
                $(document).on("click", "a[href*='#show-hide'], [data-element-link*='#show-hide']", function(evt) {
                    evt.preventDefault();
                    const hideIds = getElementsIds(evt, "hide");
                    const showIds = getElementsIds(evt, "show");
                    hideIds.forEach((id) => performActionOnId(id, "fadeOut"));
                    showIds.forEach((id) => performActionOnId(id, "fadeIn"));
                    return false;
                });
            }
            window.addEventListener("load", setupActionLinkListeners);
        }
    });

    // projects/user_pages/app/javascript/lander/animation.ts
    var require_animation = __commonJS({
        "projects/user_pages/app/javascript/lander/animation.ts" () {
            init_define_process();
            var unobserve = (element, observer) => {
                observer.unobserve(element);
                if (element.getAttribute("data-animation-once") !== "true") {
                    const time = element.getAttribute("data-animation-time");
                    const delay = element.getAttribute("data-animation-delay");
                    const timeout = Number(time) + Number(delay);
                    setTimeout(() => {
                        observer.observe(element);
                    }, timeout);
                }
            };
            var startAnimation = (element) => {
                element.setAttribute("data-animation-state", "running");
            };
            $(document).ready(function() {
                const runAllAnimations = function() {
                    const scrollElements = document.querySelectorAll('[data-animation-trigger="scroll"]');
                    const loadElements = document.querySelectorAll('[data-animation-trigger="load"]');
                    const config2 = {
                        rootMargin: "50px 20px 75px 30px",
                        threshold: [0, 0.25, 0.75, 1]
                    };
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                if (entry.target.getAttribute("data-animation-state") !== "running") {
                                    unobserve(entry.target, observer);
                                    startAnimation(entry.target);
                                }
                            } else {
                                entry.target.setAttribute("data-animation-state", "off");
                            }
                        });
                    }, config2);
                    scrollElements.forEach((element) => {
                        observer.observe(element);
                    });
                    loadElements.forEach((element) => {
                        startAnimation(element);
                    });
                };
                runAllAnimations();
            });
        }
    });

    // projects/user_pages/app/javascript/lander/linkable.ts
    var require_linkable = __commonJS({
        "projects/user_pages/app/javascript/lander/linkable.ts" () {
            init_define_process();
            var internalLinks = ["#open-popup", "#close-popup", "#submit-form"];

            function setupLinkableElements() {
                document.querySelectorAll("[data-element-link]").forEach((elLinkableElement) => {
                    const dataLinkableElementLink = elLinkableElement.getAttribute("data-element-link");
                    if (dataLinkableElementLink) {
                        elLinkableElement.setAttribute("tabindex", "0");
                        if (!internalLinks.includes(dataLinkableElementLink)) {
                            elLinkableElement.addEventListener("click", () => {
                                var _a3;
                                const target = (_a3 = elLinkableElement.getAttribute("target")) != null ? _a3 : "_self";
                                if (target === "_self") {
                                    window.location.href = dataLinkableElementLink;
                                } else {
                                    window.open(dataLinkableElementLink, "_blank");
                                }
                            });
                        }
                    }
                });
            }
            window.addEventListener("load", setupLinkableElements);
        }
    });

    // projects/user_pages/app/javascript/lander/sticky.ts
    var require_sticky = __commonJS({
        "projects/user_pages/app/javascript/lander/sticky.ts" () {
            init_define_process();

            function cloneSticky(sticky) {
                const stickyClone = sticky.clone(true, true).addClass("stickyClone");
                sticky.parent().append(stickyClone);
                globalThis.CF2Component.hydrateTree(stickyClone.get(0));
            }
            $(document).ready(function() {
                const $stickyElements = $(".stickyTop");
                $stickyElements.each((_index, element) => {
                    const sticky = $(element);
                    let cloned = false;
                    let scrollTop = $(window).scrollTop();
                    let stickyTop = sticky.offset().top;
                    if (scrollTop > stickyTop) {
                        cloneSticky(sticky);
                        cloned = true;
                    }
                    document.addEventListener("scroll", () => {
                        scrollTop = $(window).scrollTop();
                        stickyTop = sticky.offset().top;
                        if (scrollTop >= stickyTop && !cloned) {
                            cloneSticky(sticky);
                            cloned = true;
                        }
                        if (scrollTop < stickyTop && cloned) {
                            sticky.parent().find("> .stickyClone").remove();
                            cloned = false;
                        }
                    });
                });
            });
        }
    });

    // node_modules/nanostores/task/index.js
    function startTask() {
        tasks += 1;
        return () => {
            tasks -= 1;
            if (tasks === 0) {
                let prevResolves = resolves;
                resolves = [];
                for (let i of prevResolves)
                    i();
            }
        };
    }

    function task(cb) {
        let endTask = startTask();
        return cb().finally(endTask);
    }

    function allTasks() {
        if (tasks === 0) {
            return Promise.resolve();
        } else {
            return new Promise((resolve) => {
                resolves.push(resolve);
            });
        }
    }

    function cleanTasks() {
        tasks = 0;
    }
    var tasks, resolves;
    var init_task = __esm({
        "node_modules/nanostores/task/index.js" () {
            init_define_process();
            tasks = 0;
            resolves = [];
        }
    });

    // node_modules/nanostores/action/index.js
    var lastAction, actionId, uid, doAction, action;
    var init_action = __esm({
        "node_modules/nanostores/action/index.js" () {
            init_define_process();
            init_task();
            lastAction = Symbol();
            actionId = Symbol();
            uid = 0;
            doAction = ($store, actionName, cb, args) => {
                let id = ++uid;
                let tracker = __spreadValues({}, $store);
                tracker.set = (...setArgs) => {
                    $store[lastAction] = actionName;
                    $store[actionId] = id;
                    $store.set(...setArgs);
                    delete $store[lastAction];
                    delete $store[actionId];
                };
                if ($store.setKey) {
                    tracker.setKey = (...setArgs) => {
                        $store[lastAction] = actionName;
                        $store[actionId] = id;
                        $store.setKey(...setArgs);
                        delete $store[lastAction];
                        delete $store[actionId];
                    };
                }
                let onError, onEnd;
                if ($store.action) {;
                    [onError, onEnd] = $store.action(id, actionName, args);
                }
                let result = cb(tracker, ...args);
                if (result instanceof Promise) {
                    let endTask = startTask();
                    return result.catch((error) => {
                        if (onError)
                            onError(error);
                        throw error;
                    }).finally(() => {
                        endTask();
                        if (onEnd)
                            onEnd();
                    });
                }
                if (onEnd)
                    onEnd();
                return result;
            };
            action = ($store, actionName, cb) => (...args) => doAction($store, actionName, cb, args);
        }
    });

    // node_modules/nanostores/clean-stores/index.js
    var clean, cleanStores;
    var init_clean_stores = __esm({
        "node_modules/nanostores/clean-stores/index.js" () {
            init_define_process();
            init_task();
            clean = Symbol("clean");
            cleanStores = (...stores) => {
                if (define_process_default.env.NODE_ENV === "production") {
                    throw new Error(
                        "cleanStores() can be used only during development or tests"
                    );
                }
                cleanTasks();
                for (let $store of stores) {
                    if ($store) {
                        if ($store.mocked)
                            delete $store.mocked;
                        if ($store[clean])
                            $store[clean]();
                    }
                }
            };
        }
    });

    // node_modules/nanostores/atom/index.js
    var listenerQueue, atom;
    var init_atom = __esm({
        "node_modules/nanostores/atom/index.js" () {
            init_define_process();
            init_clean_stores();
            listenerQueue = [];
            atom = (initialValue, level) => {
                let listeners = [];
                let $atom = {
                    get() {
                        if (!$atom.lc) {
                            $atom.listen(() => {})();
                        }
                        return $atom.value;
                    },
                    l: level || 0,
                    lc: 0,
                    listen(listener, listenerLevel) {
                        $atom.lc = listeners.push(listener, listenerLevel || $atom.l) / 2;
                        return () => {
                            let index = listeners.indexOf(listener);
                            if (~index) {
                                listeners.splice(index, 2);
                                if (!--$atom.lc)
                                    $atom.off();
                            }
                        };
                    },
                    notify(changedKey) {
                        let runListenerQueue = !listenerQueue.length;
                        for (let i = 0; i < listeners.length; i += 2) {
                            listenerQueue.push(
                                listeners[i],
                                listeners[i + 1],
                                $atom.value,
                                changedKey
                            );
                        }
                        if (runListenerQueue) {
                            for (let i = 0; i < listenerQueue.length; i += 4) {
                                let skip;
                                for (let j = i + 1; !skip && (j += 4) < listenerQueue.length;) {
                                    if (listenerQueue[j] < listenerQueue[i + 1]) {
                                        skip = listenerQueue.push(
                                            listenerQueue[i],
                                            listenerQueue[i + 1],
                                            listenerQueue[i + 2],
                                            listenerQueue[i + 3]
                                        );
                                    }
                                }
                                if (!skip) {
                                    listenerQueue[i](listenerQueue[i + 2], listenerQueue[i + 3]);
                                }
                            }
                            listenerQueue.length = 0;
                        }
                    },
                    off() {},
                    /* It will be called on last listener unsubscribing.
                       We will redefine it in onMount and onStop. */
                    set(data) {
                        if ($atom.value !== data) {
                            $atom.value = data;
                            $atom.notify();
                        }
                    },
                    subscribe(listener, listenerLevel) {
                        let unbind = $atom.listen(listener, listenerLevel);
                        listener($atom.value);
                        return unbind;
                    },
                    value: initialValue
                };
                if (define_process_default.env.NODE_ENV !== "production") {
                    $atom[clean] = () => {
                        listeners = [];
                        $atom.lc = 0;
                        $atom.off();
                    };
                }
                return $atom;
            };
        }
    });

    // node_modules/nanostores/lifecycle/index.js
    var START, STOP, SET, NOTIFY, MOUNT, UNMOUNT, ACTION, REVERT_MUTATION, on, onStart, onStop, onSet, onNotify, STORE_UNMOUNT_DELAY, onMount, onAction;
    var init_lifecycle = __esm({
        "node_modules/nanostores/lifecycle/index.js" () {
            init_define_process();
            init_clean_stores();
            START = 0;
            STOP = 1;
            SET = 2;
            NOTIFY = 3;
            MOUNT = 5;
            UNMOUNT = 6;
            ACTION = 7;
            REVERT_MUTATION = 10;
            on = (object, listener, eventKey, mutateStore) => {
                object.events = object.events || {};
                if (!object.events[eventKey + REVERT_MUTATION]) {
                    object.events[eventKey + REVERT_MUTATION] = mutateStore((eventProps) => {
                        object.events[eventKey].reduceRight((event, l) => (l(event), event), __spreadValues({
                            shared: {}
                        }, eventProps));
                    });
                }
                object.events[eventKey] = object.events[eventKey] || [];
                object.events[eventKey].push(listener);
                return () => {
                    let currentListeners = object.events[eventKey];
                    let index = currentListeners.indexOf(listener);
                    currentListeners.splice(index, 1);
                    if (!currentListeners.length) {
                        delete object.events[eventKey];
                        object.events[eventKey + REVERT_MUTATION]();
                        delete object.events[eventKey + REVERT_MUTATION];
                    }
                };
            };
            onStart = ($store, listener) => on($store, listener, START, (runListeners) => {
                let originListen = $store.listen;
                $store.listen = (arg) => {
                    if (!$store.lc && !$store.starting) {
                        $store.starting = true;
                        runListeners();
                        delete $store.starting;
                    }
                    return originListen(arg);
                };
                return () => {
                    $store.listen = originListen;
                };
            });
            onStop = ($store, listener) => on($store, listener, STOP, (runListeners) => {
                let originOff = $store.off;
                $store.off = () => {
                    runListeners();
                    originOff();
                };
                return () => {
                    $store.off = originOff;
                };
            });
            onSet = ($store, listener) => on($store, listener, SET, (runListeners) => {
                let originSet = $store.set;
                let originSetKey = $store.setKey;
                if ($store.setKey) {
                    $store.setKey = (changed, changedValue) => {
                        let isAborted;
                        let abort = () => {
                            isAborted = true;
                        };
                        runListeners({
                            abort,
                            changed,
                            newValue: __spreadProps(__spreadValues({}, $store.value), {
                                [changed]: changedValue
                            })
                        });
                        if (!isAborted)
                            return originSetKey(changed, changedValue);
                    };
                }
                $store.set = (newValue) => {
                    let isAborted;
                    let abort = () => {
                        isAborted = true;
                    };
                    runListeners({
                        abort,
                        newValue
                    });
                    if (!isAborted)
                        return originSet(newValue);
                };
                return () => {
                    $store.set = originSet;
                    $store.setKey = originSetKey;
                };
            });
            onNotify = ($store, listener) => on($store, listener, NOTIFY, (runListeners) => {
                let originNotify = $store.notify;
                $store.notify = (changed) => {
                    let isAborted;
                    let abort = () => {
                        isAborted = true;
                    };
                    runListeners({
                        abort,
                        changed
                    });
                    if (!isAborted)
                        return originNotify(changed);
                };
                return () => {
                    $store.notify = originNotify;
                };
            });
            STORE_UNMOUNT_DELAY = 1e3;
            onMount = ($store, initialize) => {
                let listener = (payload) => {
                    let destroy = initialize(payload);
                    if (destroy)
                        $store.events[UNMOUNT].push(destroy);
                };
                return on($store, listener, MOUNT, (runListeners) => {
                    let originListen = $store.listen;
                    $store.listen = (...args) => {
                        if (!$store.lc && !$store.active) {
                            $store.active = true;
                            runListeners();
                        }
                        return originListen(...args);
                    };
                    let originOff = $store.off;
                    $store.events[UNMOUNT] = [];
                    $store.off = () => {
                        originOff();
                        setTimeout(() => {
                            if ($store.active && !$store.lc) {
                                $store.active = false;
                                for (let destroy of $store.events[UNMOUNT])
                                    destroy();
                                $store.events[UNMOUNT] = [];
                            }
                        }, STORE_UNMOUNT_DELAY);
                    };
                    if (define_process_default.env.NODE_ENV !== "production") {
                        let originClean = $store[clean];
                        $store[clean] = () => {
                            for (let destroy of $store.events[UNMOUNT])
                                destroy();
                            $store.events[UNMOUNT] = [];
                            $store.active = false;
                            originClean();
                        };
                    }
                    return () => {
                        $store.listen = originListen;
                        $store.off = originOff;
                    };
                });
            };
            onAction = ($store, listener) => on($store, listener, ACTION, (runListeners) => {
                let errorListeners = {};
                let endListeners = {};
                let originAction = $store.action;
                $store.action = (id, actionName, args) => {
                    runListeners({
                        actionName,
                        args,
                        id,
                        onEnd: (l) => {
                            (endListeners[id] || (endListeners[id] = [])).push(l);
                        },
                        onError: (l) => {
                            (errorListeners[id] || (errorListeners[id] = [])).push(l);
                        }
                    });
                    return [
                        (error) => {
                            if (errorListeners[id]) {
                                for (let l of errorListeners[id])
                                    l({
                                        error
                                    });
                            }
                        },
                        () => {
                            if (endListeners[id]) {
                                for (let l of endListeners[id])
                                    l();
                                delete errorListeners[id];
                                delete endListeners[id];
                            }
                        }
                    ];
                };
                return () => {
                    $store.action = originAction;
                };
            });
        }
    });

    // node_modules/nanostores/computed/index.js
    var computed;
    var init_computed = __esm({
        "node_modules/nanostores/computed/index.js" () {
            init_define_process();
            init_atom();
            init_lifecycle();
            computed = (stores, cb) => {
                if (!Array.isArray(stores))
                    stores = [stores];
                let diamondArgs;
                let run = () => {
                    let args = stores.map(($store) => $store.get());
                    if (diamondArgs === void 0 || args.some((arg, i) => arg !== diamondArgs[i])) {
                        diamondArgs = args;
                        $computed.set(cb(...args));
                    }
                };
                let $computed = atom(void 0, Math.max(...stores.map((s) => s.l)) + 1);
                onMount($computed, () => {
                    let unbinds = stores.map(($store) => $store.listen(run, $computed.l));
                    run();
                    return () => {
                        for (let unbind of unbinds)
                            unbind();
                    };
                });
                return $computed;
            };
        }
    });

    // node_modules/nanostores/deep-map/path.js
    function getPath(obj, path) {
        let allKeys = getAllKeysFromPath(path);
        let res = obj;
        for (let key of allKeys) {
            if (res === void 0) {
                break;
            }
            res = res[key];
        }
        return res;
    }

    function setPath(obj, path, value) {
        return setByKey(obj != null ? obj : {}, getAllKeysFromPath(path), value);
    }

    function setByKey(obj, splittedKeys, value) {
        let key = splittedKeys[0];
        ensureKey(obj, key, splittedKeys[1]);
        let copy = Array.isArray(obj) ? [...obj] : __spreadValues({}, obj);
        if (splittedKeys.length === 1) {
            if (value === void 0) {
                if (Array.isArray(obj)) {
                    copy.splice(key, 1);
                } else {
                    delete copy[key];
                }
            } else {
                copy[key] = value;
            }
            return copy;
        }
        let newVal = setByKey(obj[key], splittedKeys.slice(1), value);
        obj[key] = newVal;
        return obj;
    }

    function getAllKeysFromPath(path) {
        return path.split(".").flatMap((key) => getKeyAndIndicesFromKey(key));
    }

    function getKeyAndIndicesFromKey(key) {
        if (ARRAY_INDEX.test(key)) {
            let [, keyPart, index] = key.match(ARRAY_INDEX);
            return [...getKeyAndIndicesFromKey(keyPart), index];
        }
        return [key];
    }

    function ensureKey(obj, key, nextKey) {
        if (key in obj) {
            return;
        }
        let nextKeyAsInt = parseInt(
            nextKey !== null && nextKey !== void 0 ? nextKey : ""
        );
        if (Number.isNaN(nextKeyAsInt)) {
            obj[key] = {};
        } else {
            obj[key] = Array(nextKeyAsInt + 1).fill(void 0);
        }
    }
    var ARRAY_INDEX;
    var init_path = __esm({
        "node_modules/nanostores/deep-map/path.js" () {
            init_define_process();
            ARRAY_INDEX = /(.*)\[(\d+)\]/;
        }
    });

    // node_modules/nanostores/deep-map/index.js
    function deepMap(initial = {}) {
        let $deepMap = atom(initial);
        $deepMap.setKey = (key, value) => {
            if (getPath($deepMap.value, key) !== value) {
                $deepMap.value = __spreadValues({}, setPath($deepMap.value, key, value));
                $deepMap.notify(key);
            }
        };
        return $deepMap;
    }
    var init_deep_map = __esm({
        "node_modules/nanostores/deep-map/index.js" () {
            init_define_process();
            init_atom();
            init_path();
            init_path();
        }
    });

    // node_modules/nanostores/keep-mount/index.js
    var keepMount;
    var init_keep_mount = __esm({
        "node_modules/nanostores/keep-mount/index.js" () {
            init_define_process();
            keepMount = ($store) => {
                $store.listen(() => {});
            };
        }
    });

    // node_modules/nanostores/listen-keys/index.js
    function listenKeys($store, keys, listener) {
        let keysSet = /* @__PURE__ */ new Set([...keys, void 0]);
        return $store.listen((value, changed) => {
            if (keysSet.has(changed)) {
                listener(value, changed);
            }
        });
    }
    var init_listen_keys = __esm({
        "node_modules/nanostores/listen-keys/index.js" () {
            init_define_process();
        }
    });

    // node_modules/nanostores/map/index.js
    var map;
    var init_map = __esm({
        "node_modules/nanostores/map/index.js" () {
            init_define_process();
            init_atom();
            map = (value = {}) => {
                let $map = atom(value);
                $map.setKey = function(key, newValue) {
                    if (typeof newValue === "undefined") {
                        if (key in $map.value) {
                            $map.value = __spreadValues({}, $map.value);
                            delete $map.value[key];
                            $map.notify(key);
                        }
                    } else if ($map.value[key] !== newValue) {
                        $map.value = __spreadProps(__spreadValues({}, $map.value), {
                            [key]: newValue
                        });
                        $map.notify(key);
                    }
                };
                return $map;
            };
        }
    });

    // node_modules/nanostores/index.js
    var nanostores_exports = {};
    __export(nanostores_exports, {
        STORE_UNMOUNT_DELAY: () => STORE_UNMOUNT_DELAY,
        action: () => action,
        actionId: () => actionId,
        allTasks: () => allTasks,
        atom: () => atom,
        clean: () => clean,
        cleanStores: () => cleanStores,
        cleanTasks: () => cleanTasks,
        computed: () => computed,
        deepMap: () => deepMap,
        getPath: () => getPath,
        keepMount: () => keepMount,
        lastAction: () => lastAction,
        listenKeys: () => listenKeys,
        map: () => map,
        onAction: () => onAction,
        onMount: () => onMount,
        onNotify: () => onNotify,
        onSet: () => onSet,
        onStart: () => onStart,
        onStop: () => onStop,
        setPath: () => setPath,
        startTask: () => startTask,
        task: () => task
    });
    var init_nanostores = __esm({
        "node_modules/nanostores/index.js" () {
            init_define_process();
            init_action();
            init_atom();
            init_clean_stores();
            init_computed();
            init_deep_map();
            init_keep_mount();
            init_lifecycle();
            init_listen_keys();
            init_map();
            init_task();
        }
    });

    // projects/user_pages/app/javascript/lander.js
    var require_lander = __commonJS({
        "projects/user_pages/app/javascript/lander.js" () {
            init_define_process();
            require_replace_tag();
            init_fetcher();
            require_parseurl();
            require_audio_player();
            require_garlic_cf();
            init_populate_select();
            require_runtime_events();
            init_fhl_handle_select_transformation();
            init_track_events();
            init_rebilly_element();
            init_upsell_element();
            init_main2();
            init_runtime();
            require_action_link();
            require_animation();
            require_linkable();
            init_submit();
            require_sticky();
            window.nanostores = (init_nanostores(), __toCommonJS(nanostores_exports));
            window.inflightRequests = 0;
            window.fetch = new Proxy(window.fetch, {
                apply(fetch2, that, args) {
                    window.inflightRequests++;
                    return fetch2.apply(that, args).finally(() => {
                        window.inflightRequests--;
                    });
                }
            });
            $(window).on("load", function() {
                $('.elFormItem:not([data-prevent-garlic="true"])').each(function() {
                    let onPersist = () => {};
                    if (this.getAttribute("name") == "name") {
                        onPersist = () => {
                            const value = this.value.trim();
                            const firstName = value.split(" ")[0];
                            const lastName = value.split(" ").slice(1).join(" ");
                            window.cfGarlicUtils.store("first_name", firstName);
                            window.cfGarlicUtils.store("last_name", lastName);
                        };
                    }
                    $(this).garlic({
                        onPersist,
                        onRetrieve: function(elem, retrievedValue) {
                            const elemName = elem.get(0).getAttribute("name");
                            globalThis.CFGarlicValues[elemName] = retrievedValue;
                        }
                    });
                });
            });
        }
    });

    // projects/shared/stylesheets/page-content/main.scss
    var init_ = __esm({
        "projects/shared/stylesheets/page-content/main.scss" () {}
    });

    // projects/shared/stylesheets/bootstrap-modal.min.css
    var init_2 = __esm({
        "projects/shared/stylesheets/bootstrap-modal.min.css" () {}
    });

    // projects/user_pages/app/stylesheets/core.css
    var init_3 = __esm({
        "projects/user_pages/app/stylesheets/core.css" () {}
    });

    // projects/user_pages/app/stylesheets/mediaelementplayer-custom.css
    var init_4 = __esm({
        "projects/user_pages/app/stylesheets/mediaelementplayer-custom.css" () {}
    });

    // projects/user_pages/app/stylesheets/alert_messages.scss
    var init_5 = __esm({
        "projects/user_pages/app/stylesheets/alert_messages.scss" () {}
    });

    // projects/user_pages/app/javascript/lander_styles.js
    var lander_styles_exports = {};
    var init_lander_styles = __esm({
        "projects/user_pages/app/javascript/lander_styles.js" () {
            init_define_process();
            init_();
            init_2();
            init_3();
            init_4();
            init_5();
        }
    });

    // projects/user_pages/app/packs/user_pages.js
    init_define_process();
    require_lander();
    init_lander_styles();
})();
/*! Bundled license information:

jquery/dist/jquery.js:
  (*!
   * jQuery JavaScript Library v3.5.1
   * https://jquery.com/
   *
   * Includes Sizzle.js
   * https://sizzlejs.com/
   *
   * Copyright JS Foundation and other contributors
   * Released under the MIT license
   * https://jquery.org/license
   *
   * Date: 2020-05-04T22:49Z
   *)
*/
//# sourceMappingURL=/assets/projects/user_pages/user_pages.js-e36b2e1dffa5b33fcf5c9d0f57af9a51b089df24fc47d2bd9d868da83d12d8bd.map
//!
;