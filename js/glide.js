(function () {
  'use strict';

  /*!
   * Glide.js v3.4.1
   * (c) 2013-2019 Jędrzej Chałubek <jedrzej.chalubek@gmail.com> (http://jedrzejchalubek.com/)
   * Released under the MIT License.
   */
  var defaults = {
    /**
     * Type of the movement.
     *
     * Available types:
     * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
     * `carousel` - Changes slides without starting over when it reaches the first or last slide.
     *
     * @type {String}
     */
    type: 'slider',

    /**
     * Start at specific slide number defined with zero-based index.
     *
     * @type {Number}
     */
    startAt: 0,

    /**
     * A number of slides visible on the single viewport.
     *
     * @type {Number}
     */
    perView: 1,

    /**
     * Focus currently active slide at a specified position in the track.
     *
     * Available inputs:
     * `center` - Current slide will be always focused at the center of a track.
     * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
     *
     * @type {String|Number}
     */
    focusAt: 0,

    /**
     * A size of the gap added between slides.
     *
     * @type {Number}
     */
    gap: 10,

    /**
     * Change slides after a specified interval. Use `false` for turning off autoplay.
     *
     * @type {Number|Boolean}
     */
    autoplay: false,

    /**
     * Stop autoplay on mouseover event.
     *
     * @type {Boolean}
     */
    hoverpause: true,

    /**
     * Allow for changing slides with left and right keyboard arrows.
     *
     * @type {Boolean}
     */
    keyboard: true,

    /**
     * Stop running `perView` number of slides from the end. Use this
     * option if you don't want to have an empty space after
     * a slider. Works only with `slider` type and a
     * non-centered `focusAt` setting.
     *
     * @type {Boolean}
     */
    bound: false,

    /**
     * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
     *
     * @type {Number|Boolean}
     */
    swipeThreshold: 80,

    /**
     * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
     *
     * @type {Number|Boolean}
     */
    dragThreshold: 120,

    /**
     * A maximum number of slides to which movement will be made on swiping or dragging. Use `false` for unlimited.
     *
     * @type {Number|Boolean}
     */
    perTouch: false,

    /**
     * Moving distance ratio of the slides on a swiping and dragging.
     *
     * @type {Number}
     */
    touchRatio: 0.5,

    /**
     * Angle required to activate slides moving on swiping or dragging.
     *
     * @type {Number}
     */
    touchAngle: 45,

    /**
     * Duration of the animation in milliseconds.
     *
     * @type {Number}
     */
    animationDuration: 400,

    /**
     * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
     *
     * @type {Boolean}
     */
    rewind: true,

    /**
     * Duration of the rewinding animation of the `slider` type in milliseconds.
     *
     * @type {Number}
     */
    rewindDuration: 800,

    /**
     * Easing function for the animation.
     *
     * @type {String}
     */
    animationTimingFunc: 'cubic-bezier(.165, .840, .440, 1)',

    /**
     * Throttle costly events at most once per every wait milliseconds.
     *
     * @type {Number}
     */
    throttle: 10,

    /**
     * Moving direction mode.
     *
     * Available inputs:
     * - 'ltr' - left to right movement,
     * - 'rtl' - right to left movement.
     *
     * @type {String}
     */
    direction: 'ltr',

    /**
     * The distance value of the next and previous viewports which
     * have to peek in the current view. Accepts number and
     * pixels as a string. Left and right peeking can be
     * set up separately with a directions object.
     *
     * For example:
     * `100` - Peek 100px on the both sides.
     * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
     *
     * @type {Number|String|Object}
     */
    peek: 0,

    /**
     * Collection of options applied at specified media breakpoints.
     * For example: display two slides per view under 800px.
     * `{
     *   '800px': {
     *     perView: 2
     *   }
     * }`
     */
    breakpoints: {},

    /**
     * Collection of internally used HTML classes.
     *
     * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
     * @type {Object}
     */
    classes: {
      direction: {
        ltr: 'glide--ltr',
        rtl: 'glide--rtl'
      },
      slider: 'glide--slider',
      carousel: 'glide--carousel',
      swipeable: 'glide--swipeable',
      dragging: 'glide--dragging',
      cloneSlide: 'glide__slide--clone',
      activeNav: 'glide__bullet--active',
      activeSlide: 'glide__slide--active',
      disabledArrow: 'glide__arrow--disabled'
    }
  };
  /**
   * Outputs warning message to the bowser console.
   *
   * @param  {String} msg
   * @return {Void}
   */

  function warn(msg) {
    console.error("[Glide warn]: " + msg);
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };
  /**
   * Converts value entered as number
   * or string to integer value.
   *
   * @param {String} value
   * @returns {Number}
   */


  function toInt(value) {
    return parseInt(value);
  }
  /**
   * Converts value entered as number
   * or string to flat value.
   *
   * @param {String} value
   * @returns {Number}
   */


  function toFloat(value) {
    return parseFloat(value);
  }
  /**
   * Indicates whether the specified value is a string.
   *
   * @param  {*}   value
   * @return {Boolean}
   */


  function isString(value) {
    return typeof value === 'string';
  }
  /**
   * Indicates whether the specified value is an object.
   *
   * @param  {*} value
   * @return {Boolean}
   *
   * @see https://github.com/jashkenas/underscore
   */


  function isObject(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return type === 'function' || type === 'object' && !!value; // eslint-disable-line no-mixed-operators
  }
  /**
   * Indicates whether the specified value is a number.
   *
   * @param  {*} value
   * @return {Boolean}
   */


  function isNumber(value) {
    return typeof value === 'number';
  }
  /**
   * Indicates whether the specified value is a function.
   *
   * @param  {*} value
   * @return {Boolean}
   */


  function isFunction(value) {
    return typeof value === 'function';
  }
  /**
   * Indicates whether the specified value is undefined.
   *
   * @param  {*} value
   * @return {Boolean}
   */


  function isUndefined(value) {
    return typeof value === 'undefined';
  }
  /**
   * Indicates whether the specified value is an array.
   *
   * @param  {*} value
   * @return {Boolean}
   */


  function isArray(value) {
    return value.constructor === Array;
  }
  /**
   * Creates and initializes specified collection of extensions.
   * Each extension receives access to instance of glide and rest of components.
   *
   * @param {Object} glide
   * @param {Object} extensions
   *
   * @returns {Object}
   */


  function mount(glide, extensions, events) {
    var components = {};

    for (var name in extensions) {
      if (isFunction(extensions[name])) {
        components[name] = extensions[name](glide, components, events);
      } else {
        warn('Extension must be a function');
      }
    }

    for (var _name in components) {
      if (isFunction(components[_name].mount)) {
        components[_name].mount();
      }
    }

    return components;
  }
  /**
   * Defines getter and setter property on the specified object.
   *
   * @param  {Object} obj         Object where property has to be defined.
   * @param  {String} prop        Name of the defined property.
   * @param  {Object} definition  Get and set definitions for the property.
   * @return {Void}
   */


  function define(obj, prop, definition) {
    Object.defineProperty(obj, prop, definition);
  }
  /**
   * Sorts aphabetically object keys.
   *
   * @param  {Object} obj
   * @return {Object}
   */


  function sortKeys(obj) {
    return Object.keys(obj).sort().reduce(function (r, k) {
      r[k] = obj[k];
      return r[k], r;
    }, {});
  }
  /**
   * Merges passed settings object with default options.
   *
   * @param  {Object} defaults
   * @param  {Object} settings
   * @return {Object}
   */


  function mergeOptions(defaults, settings) {
    var options = _extends({}, defaults, settings); // `Object.assign` do not deeply merge objects, so we
    // have to do it manually for every nested object
    // in options. Although it does not look smart,
    // it's smaller and faster than some fancy
    // merging deep-merge algorithm script.


    if (settings.hasOwnProperty('classes')) {
      options.classes = _extends({}, defaults.classes, settings.classes);

      if (settings.classes.hasOwnProperty('direction')) {
        options.classes.direction = _extends({}, defaults.classes.direction, settings.classes.direction);
      }
    }

    if (settings.hasOwnProperty('breakpoints')) {
      options.breakpoints = _extends({}, defaults.breakpoints, settings.breakpoints);
    }

    return options;
  }

  var EventsBus = function () {
    /**
     * Construct a EventBus instance.
     *
     * @param {Object} events
     */
    function EventsBus() {
      var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, EventsBus);
      this.events = events;
      this.hop = events.hasOwnProperty;
    }
    /**
     * Adds listener to the specifed event.
     *
     * @param {String|Array} event
     * @param {Function} handler
     */


    createClass(EventsBus, [{
      key: 'on',
      value: function on(event, handler) {
        if (isArray(event)) {
          for (var i = 0; i < event.length; i++) {
            this.on(event[i], handler);
          }
        } // Create the event's object if not yet created


        if (!this.hop.call(this.events, event)) {
          this.events[event] = [];
        } // Add the handler to queue


        var index = this.events[event].push(handler) - 1; // Provide handle back for removal of event

        return {
          remove: function remove() {
            delete this.events[event][index];
          }
        };
      }
      /**
       * Runs registered handlers for specified event.
       *
       * @param {String|Array} event
       * @param {Object=} context
       */

    }, {
      key: 'emit',
      value: function emit(event, context) {
        if (isArray(event)) {
          for (var i = 0; i < event.length; i++) {
            this.emit(event[i], context);
          }
        } // If the event doesn't exist, or there's no handlers in queue, just leave


        if (!this.hop.call(this.events, event)) {
          return;
        } // Cycle through events queue, fire!


        this.events[event].forEach(function (item) {
          item(context || {});
        });
      }
    }]);
    return EventsBus;
  }();

  var Glide = function () {
    /**
     * Construct glide.
     *
     * @param  {String} selector
     * @param  {Object} options
     */
    function Glide(selector) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      classCallCheck(this, Glide);
      this._c = {};
      this._t = [];
      this._e = new EventsBus();
      this.disabled = false;
      this.selector = selector;
      this.settings = mergeOptions(defaults, options);
      this.index = this.settings.startAt;
    }
    /**
     * Initializes glide.
     *
     * @param {Object} extensions Collection of extensions to initialize.
     * @return {Glide}
     */


    createClass(Glide, [{
      key: 'mount',
      value: function mount$$1() {
        var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        this._e.emit('mount.before');

        if (isObject(extensions)) {
          this._c = mount(this, extensions, this._e);
        } else {
          warn('You need to provide a object on `mount()`');
        }

        this._e.emit('mount.after');

        return this;
      }
      /**
       * Collects an instance `translate` transformers.
       *
       * @param  {Array} transformers Collection of transformers.
       * @return {Void}
       */

    }, {
      key: 'mutate',
      value: function mutate() {
        var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        if (isArray(transformers)) {
          this._t = transformers;
        } else {
          warn('You need to provide a array on `mutate()`');
        }

        return this;
      }
      /**
       * Updates glide with specified settings.
       *
       * @param {Object} settings
       * @return {Glide}
       */

    }, {
      key: 'update',
      value: function update() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.settings = mergeOptions(this.settings, settings);

        if (settings.hasOwnProperty('startAt')) {
          this.index = settings.startAt;
        }

        this._e.emit('update');

        return this;
      }
      /**
       * Change slide with specified pattern. A pattern must be in the special format:
       * `>` - Move one forward
       * `<` - Move one backward
       * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
       * `>>` - Rewinds to end (last slide)
       * `<<` - Rewinds to start (first slide)
       *
       * @param {String} pattern
       * @return {Glide}
       */

    }, {
      key: 'go',
      value: function go(pattern) {
        this._c.Run.make(pattern);

        return this;
      }
      /**
       * Move track by specified distance.
       *
       * @param {String} distance
       * @return {Glide}
       */

    }, {
      key: 'move',
      value: function move(distance) {
        this._c.Transition.disable();

        this._c.Move.make(distance);

        return this;
      }
      /**
       * Destroy instance and revert all changes done by this._c.
       *
       * @return {Glide}
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this._e.emit('destroy');

        return this;
      }
      /**
       * Start instance autoplaying.
       *
       * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
       * @return {Glide}
       */

    }, {
      key: 'play',
      value: function play() {
        var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (interval) {
          this.settings.autoplay = interval;
        }

        this._e.emit('play');

        return this;
      }
      /**
       * Stop instance autoplaying.
       *
       * @return {Glide}
       */

    }, {
      key: 'pause',
      value: function pause() {
        this._e.emit('pause');

        return this;
      }
      /**
       * Sets glide into a idle status.
       *
       * @return {Glide}
       */

    }, {
      key: 'disable',
      value: function disable() {
        this.disabled = true;
        return this;
      }
      /**
       * Sets glide into a active status.
       *
       * @return {Glide}
       */

    }, {
      key: 'enable',
      value: function enable() {
        this.disabled = false;
        return this;
      }
      /**
       * Adds cuutom event listener with handler.
       *
       * @param  {String|Array} event
       * @param  {Function} handler
       * @return {Glide}
       */

    }, {
      key: 'on',
      value: function on(event, handler) {
        this._e.on(event, handler);

        return this;
      }
      /**
       * Checks if glide is a precised type.
       *
       * @param  {String} name
       * @return {Boolean}
       */

    }, {
      key: 'isType',
      value: function isType(name) {
        return this.settings.type === name;
      }
      /**
       * Gets value of the core options.
       *
       * @return {Object}
       */

    }, {
      key: 'settings',
      get: function get$$1() {
        return this._o;
      }
      /**
       * Sets value of the core options.
       *
       * @param  {Object} o
       * @return {Void}
       */
      ,
      set: function set$$1(o) {
        if (isObject(o)) {
          this._o = o;
        } else {
          warn('Options must be an `object` instance.');
        }
      }
      /**
       * Gets current index of the slider.
       *
       * @return {Object}
       */

    }, {
      key: 'index',
      get: function get$$1() {
        return this._i;
      }
      /**
       * Sets current index a slider.
       *
       * @return {Object}
       */
      ,
      set: function set$$1(i) {
        this._i = toInt(i);
      }
      /**
       * Gets type name of the slider.
       *
       * @return {String}
       */

    }, {
      key: 'type',
      get: function get$$1() {
        return this.settings.type;
      }
      /**
       * Gets value of the idle status.
       *
       * @return {Boolean}
       */

    }, {
      key: 'disabled',
      get: function get$$1() {
        return this._d;
      }
      /**
       * Sets value of the idle status.
       *
       * @return {Boolean}
       */
      ,
      set: function set$$1(status) {
        this._d = !!status;
      }
    }]);
    return Glide;
  }();

  function Run(Glide, Components, Events) {
    var Run = {
      /**
       * Initializes autorunning of the glide.
       *
       * @return {Void}
       */
      mount: function mount() {
        this._o = false;
      },

      /**
       * Makes glides running based on the passed moving schema.
       *
       * @param {String} move
       */
      make: function make(move) {
        var _this = this;

        if (!Glide.disabled) {
          Glide.disable();
          this.move = move;
          Events.emit('run.before', this.move);
          this.calculate();
          Events.emit('run', this.move);
          Components.Transition.after(function () {
            if (_this.isStart()) {
              Events.emit('run.start', _this.move);
            }

            if (_this.isEnd()) {
              Events.emit('run.end', _this.move);
            }

            if (_this.isOffset('<') || _this.isOffset('>')) {
              _this._o = false;
              Events.emit('run.offset', _this.move);
            }

            Events.emit('run.after', _this.move);
            Glide.enable();
          });
        }
      },

      /**
       * Calculates current index based on defined move.
       *
       * @return {Void}
       */
      calculate: function calculate() {
        var move = this.move,
            length = this.length;
        var steps = move.steps,
            direction = move.direction;
        var countableSteps = isNumber(toInt(steps)) && toInt(steps) !== 0;

        switch (direction) {
          case '>':
            if (steps === '>') {
              Glide.index = length;
            } else if (this.isEnd()) {
              if (!(Glide.isType('slider') && !Glide.settings.rewind)) {
                this._o = true;
                Glide.index = 0;
              }
            } else if (countableSteps) {
              Glide.index += Math.min(length - Glide.index, -toInt(steps));
            } else {
              Glide.index++;
            }

            break;

          case '<':
            if (steps === '<') {
              Glide.index = 0;
            } else if (this.isStart()) {
              if (!(Glide.isType('slider') && !Glide.settings.rewind)) {
                this._o = true;
                Glide.index = length;
              }
            } else if (countableSteps) {
              Glide.index -= Math.min(Glide.index, toInt(steps));
            } else {
              Glide.index--;
            }

            break;

          case '=':
            Glide.index = steps;
            break;

          default:
            warn('Invalid direction pattern [' + direction + steps + '] has been used');
            break;
        }
      },

      /**
       * Checks if we are on the first slide.
       *
       * @return {Boolean}
       */
      isStart: function isStart() {
        return Glide.index === 0;
      },

      /**
       * Checks if we are on the last slide.
       *
       * @return {Boolean}
       */
      isEnd: function isEnd() {
        return Glide.index === this.length;
      },

      /**
       * Checks if we are making a offset run.
       *
       * @param {String} direction
       * @return {Boolean}
       */
      isOffset: function isOffset(direction) {
        return this._o && this.move.direction === direction;
      }
    };
    define(Run, 'move', {
      /**
       * Gets value of the move schema.
       *
       * @returns {Object}
       */
      get: function get() {
        return this._m;
      },

      /**
       * Sets value of the move schema.
       *
       * @returns {Object}
       */
      set: function set(value) {
        var step = value.substr(1);
        this._m = {
          direction: value.substr(0, 1),
          steps: step ? toInt(step) ? toInt(step) : step : 0
        };
      }
    });
    define(Run, 'length', {
      /**
       * Gets value of the running distance based
       * on zero-indexing number of slides.
       *
       * @return {Number}
       */
      get: function get() {
        var settings = Glide.settings;
        var length = Components.Html.slides.length; // If the `bound` option is acitve, a maximum running distance should be
        // reduced by `perView` and `focusAt` settings. Running distance
        // should end before creating an empty space after instance.

        if (Glide.isType('slider') && settings.focusAt !== 'center' && settings.bound) {
          return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
        }

        return length - 1;
      }
    });
    define(Run, 'offset', {
      /**
       * Gets status of the offsetting flag.
       *
       * @return {Boolean}
       */
      get: function get() {
        return this._o;
      }
    });
    return Run;
  }
  /**
   * Returns a current time.
   *
   * @return {Number}
   */


  function now() {
    return new Date().getTime();
  }
  /**
   * Returns a function, that, when invoked, will only be triggered
   * at most once during a given window of time.
   *
   * @param {Function} func
   * @param {Number} wait
   * @param {Object=} options
   * @return {Function}
   *
   * @see https://github.com/jashkenas/underscore
   */


  function throttle(func, wait, options) {
    var timeout = void 0,
        context = void 0,
        args = void 0,
        result = void 0;
    var previous = 0;
    if (!options) options = {};

    var later = function later() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function throttled() {
      var at = now();
      if (!previous && options.leading === false) previous = at;
      var remaining = wait - (at - previous);
      context = this;
      args = arguments;

      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        previous = at;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }

      return result;
    };

    throttled.cancel = function () {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  }

  var MARGIN_TYPE = {
    ltr: ['marginLeft', 'marginRight'],
    rtl: ['marginRight', 'marginLeft']
  };

  function Gaps(Glide, Components, Events) {
    var Gaps = {
      /**
       * Applies gaps between slides. First and last
       * slides do not receive it's edge margins.
       *
       * @param {HTMLCollection} slides
       * @return {Void}
       */
      apply: function apply(slides) {
        for (var i = 0, len = slides.length; i < len; i++) {
          var style = slides[i].style;
          var direction = Components.Direction.value;

          if (i !== 0) {
            style[MARGIN_TYPE[direction][0]] = this.value / 2 + 'px';
          } else {
            style[MARGIN_TYPE[direction][0]] = '';
          }

          if (i !== slides.length - 1) {
            style[MARGIN_TYPE[direction][1]] = this.value / 2 + 'px';
          } else {
            style[MARGIN_TYPE[direction][1]] = '';
          }
        }
      },

      /**
       * Removes gaps from the slides.
       *
       * @param {HTMLCollection} slides
       * @returns {Void}
      */
      remove: function remove(slides) {
        for (var i = 0, len = slides.length; i < len; i++) {
          var style = slides[i].style;
          style.marginLeft = '';
          style.marginRight = '';
        }
      }
    };
    define(Gaps, 'value', {
      /**
       * Gets value of the gap.
       *
       * @returns {Number}
       */
      get: function get() {
        return toInt(Glide.settings.gap);
      }
    });
    define(Gaps, 'grow', {
      /**
       * Gets additional dimentions value caused by gaps.
       * Used to increase width of the slides wrapper.
       *
       * @returns {Number}
       */
      get: function get() {
        return Gaps.value * (Components.Sizes.length - 1);
      }
    });
    define(Gaps, 'reductor', {
      /**
       * Gets reduction value caused by gaps.
       * Used to subtract width of the slides.
       *
       * @returns {Number}
       */
      get: function get() {
        var perView = Glide.settings.perView;
        return Gaps.value * (perView - 1) / perView;
      }
    });
    /**
     * Apply calculated gaps:
     * - after building, so slides (including clones) will receive proper margins
     * - on updating via API, to recalculate gaps with new options
     */

    Events.on(['build.after', 'update'], throttle(function () {
      Gaps.apply(Components.Html.wrapper.children);
    }, 30));
    /**
     * Remove gaps:
     * - on destroying to bring markup to its inital state
     */

    Events.on('destroy', function () {
      Gaps.remove(Components.Html.wrapper.children);
    });
    return Gaps;
  }
  /**
   * Finds siblings nodes of the passed node.
   *
   * @param  {Element} node
   * @return {Array}
   */


  function siblings(node) {
    if (node && node.parentNode) {
      var n = node.parentNode.firstChild;
      var matched = [];

      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== node) {
          matched.push(n);
        }
      }

      return matched;
    }

    return [];
  }
  /**
   * Checks if passed node exist and is a valid element.
   *
   * @param  {Element} node
   * @return {Boolean}
   */


  function exist(node) {
    if (node && node instanceof window.HTMLElement) {
      return true;
    }

    return false;
  }

  var TRACK_SELECTOR = '[data-glide-el="track"]';

  function Html(Glide, Components) {
    var Html = {
      /**
       * Setup slider HTML nodes.
       *
       * @param {Glide} glide
       */
      mount: function mount() {
        this.root = Glide.selector;
        this.track = this.root.querySelector(TRACK_SELECTOR);
        this.slides = Array.prototype.slice.call(this.wrapper.children).filter(function (slide) {
          return !slide.classList.contains(Glide.settings.classes.cloneSlide);
        });
      }
    };
    define(Html, 'root', {
      /**
       * Gets node of the glide main element.
       *
       * @return {Object}
       */
      get: function get() {
        return Html._r;
      },

      /**
       * Sets node of the glide main element.
       *
       * @return {Object}
       */
      set: function set(r) {
        if (isString(r)) {
          r = document.querySelector(r);
        }

        if (exist(r)) {
          Html._r = r;
        } else {
          warn('Root element must be a existing Html node');
        }
      }
    });
    define(Html, 'track', {
      /**
       * Gets node of the glide track with slides.
       *
       * @return {Object}
       */
      get: function get() {
        return Html._t;
      },

      /**
       * Sets node of the glide track with slides.
       *
       * @return {Object}
       */
      set: function set(t) {
        if (exist(t)) {
          Html._t = t;
        } else {
          warn('Could not find track element. Please use ' + TRACK_SELECTOR + ' attribute.');
        }
      }
    });
    define(Html, 'wrapper', {
      /**
       * Gets node of the slides wrapper.
       *
       * @return {Object}
       */
      get: function get() {
        return Html.track.children[0];
      }
    });
    return Html;
  }

  function Peek(Glide, Components, Events) {
    var Peek = {
      /**
       * Setups how much to peek based on settings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.value = Glide.settings.peek;
      }
    };
    define(Peek, 'value', {
      /**
       * Gets value of the peek.
       *
       * @returns {Number|Object}
       */
      get: function get() {
        return Peek._v;
      },

      /**
       * Sets value of the peek.
       *
       * @param {Number|Object} value
       * @return {Void}
       */
      set: function set(value) {
        if (isObject(value)) {
          value.before = toInt(value.before);
          value.after = toInt(value.after);
        } else {
          value = toInt(value);
        }

        Peek._v = value;
      }
    });
    define(Peek, 'reductor', {
      /**
       * Gets reduction value caused by peek.
       *
       * @returns {Number}
       */
      get: function get() {
        var value = Peek.value;
        var perView = Glide.settings.perView;

        if (isObject(value)) {
          return value.before / perView + value.after / perView;
        }

        return value * 2 / perView;
      }
    });
    /**
     * Recalculate peeking sizes on:
     * - when resizing window to update to proper percents
     */

    Events.on(['resize', 'update'], function () {
      Peek.mount();
    });
    return Peek;
  }

  function Move(Glide, Components, Events) {
    var Move = {
      /**
       * Constructs move component.
       *
       * @returns {Void}
       */
      mount: function mount() {
        this._o = 0;
      },

      /**
       * Calculates a movement value based on passed offset and currently active index.
       *
       * @param  {Number} offset
       * @return {Void}
       */
      make: function make() {
        var _this = this;

        var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        this.offset = offset;
        Events.emit('move', {
          movement: this.value
        });
        Components.Transition.after(function () {
          Events.emit('move.after', {
            movement: _this.value
          });
        });
      }
    };
    define(Move, 'offset', {
      /**
       * Gets an offset value used to modify current translate.
       *
       * @return {Object}
       */
      get: function get() {
        return Move._o;
      },

      /**
       * Sets an offset value used to modify current translate.
       *
       * @return {Object}
       */
      set: function set(value) {
        Move._o = !isUndefined(value) ? toInt(value) : 0;
      }
    });
    define(Move, 'translate', {
      /**
       * Gets a raw movement value.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Sizes.slideWidth * Glide.index;
      }
    });
    define(Move, 'value', {
      /**
       * Gets an actual movement value corrected by offset.
       *
       * @return {Number}
       */
      get: function get() {
        var offset = this.offset;
        var translate = this.translate;

        if (Components.Direction.is('rtl')) {
          return translate + offset;
        }

        return translate - offset;
      }
    });
    /**
     * Make movement to proper slide on:
     * - before build, so glide will start at `startAt` index
     * - on each standard run to move to newly calculated index
     */

    Events.on(['build.before', 'run'], function () {
      Move.make();
    });
    return Move;
  }

  function Sizes(Glide, Components, Events) {
    var Sizes = {
      /**
       * Setups dimentions of slides.
       *
       * @return {Void}
       */
      setupSlides: function setupSlides() {
        var width = this.slideWidth + 'px';
        var slides = Components.Html.slides;

        for (var i = 0; i < slides.length; i++) {
          slides[i].style.width = width;
        }
      },

      /**
       * Setups dimentions of slides wrapper.
       *
       * @return {Void}
       */
      setupWrapper: function setupWrapper(dimention) {
        Components.Html.wrapper.style.width = this.wrapperSize + 'px';
      },

      /**
       * Removes applied styles from HTML elements.
       *
       * @returns {Void}
       */
      remove: function remove() {
        var slides = Components.Html.slides;

        for (var i = 0; i < slides.length; i++) {
          slides[i].style.width = '';
        }

        Components.Html.wrapper.style.width = '';
      }
    };
    define(Sizes, 'length', {
      /**
       * Gets count number of the slides.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Html.slides.length;
      }
    });
    define(Sizes, 'width', {
      /**
       * Gets width value of the glide.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Html.root.offsetWidth;
      }
    });
    define(Sizes, 'wrapperSize', {
      /**
       * Gets size of the slides wrapper.
       *
       * @return {Number}
       */
      get: function get() {
        return Sizes.slideWidth * Sizes.length + Components.Gaps.grow + Components.Clones.grow;
      }
    });
    define(Sizes, 'slideWidth', {
      /**
       * Gets width value of the single slide.
       *
       * @return {Number}
       */
      get: function get() {
        return Sizes.width / Glide.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
      }
    });
    /**
     * Apply calculated glide's dimensions:
     * - before building, so other dimentions (e.g. translate) will be calculated propertly
     * - when resizing window to recalculate sildes dimensions
     * - on updating via API, to calculate dimensions based on new options
     */

    Events.on(['build.before', 'resize', 'update'], function () {
      Sizes.setupSlides();
      Sizes.setupWrapper();
    });
    /**
     * Remove calculated glide's dimensions:
     * - on destoting to bring markup to its inital state
     */

    Events.on('destroy', function () {
      Sizes.remove();
    });
    return Sizes;
  }

  function Build(Glide, Components, Events) {
    var Build = {
      /**
       * Init glide building. Adds classes, sets
       * dimensions and setups initial state.
       *
       * @return {Void}
       */
      mount: function mount() {
        Events.emit('build.before');
        this.typeClass();
        this.activeClass();
        Events.emit('build.after');
      },

      /**
       * Adds `type` class to the glide element.
       *
       * @return {Void}
       */
      typeClass: function typeClass() {
        Components.Html.root.classList.add(Glide.settings.classes[Glide.settings.type]);
      },

      /**
       * Sets active class to current slide.
       *
       * @return {Void}
       */
      activeClass: function activeClass() {
        var classes = Glide.settings.classes;
        var slide = Components.Html.slides[Glide.index];

        if (slide) {
          slide.classList.add(classes.activeSlide);
          siblings(slide).forEach(function (sibling) {
            sibling.classList.remove(classes.activeSlide);
          });
        }
      },

      /**
       * Removes HTML classes applied at building.
       *
       * @return {Void}
       */
      removeClasses: function removeClasses() {
        var classes = Glide.settings.classes;
        Components.Html.root.classList.remove(classes[Glide.settings.type]);
        Components.Html.slides.forEach(function (sibling) {
          sibling.classList.remove(classes.activeSlide);
        });
      }
    };
    /**
     * Clear building classes:
     * - on destroying to bring HTML to its initial state
     * - on updating to remove classes before remounting component
     */

    Events.on(['destroy', 'update'], function () {
      Build.removeClasses();
    });
    /**
     * Remount component:
     * - on resizing of the window to calculate new dimentions
     * - on updating settings via API
     */

    Events.on(['resize', 'update'], function () {
      Build.mount();
    });
    /**
     * Swap active class of current slide:
     * - after each move to the new index
     */

    Events.on('move.after', function () {
      Build.activeClass();
    });
    return Build;
  }

  function Clones(Glide, Components, Events) {
    var Clones = {
      /**
       * Create pattern map and collect slides to be cloned.
       */
      mount: function mount() {
        this.items = [];

        if (Glide.isType('carousel')) {
          this.items = this.collect();
        }
      },

      /**
       * Collect clones with pattern.
       *
       * @return {Void}
       */
      collect: function collect() {
        var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var slides = Components.Html.slides;
        var _Glide$settings = Glide.settings,
            perView = _Glide$settings.perView,
            classes = _Glide$settings.classes;
        var peekIncrementer = +!!Glide.settings.peek;
        var part = perView + peekIncrementer;
        var start = slides.slice(0, part);
        var end = slides.slice(-part);

        for (var r = 0; r < Math.max(1, Math.floor(perView / slides.length)); r++) {
          for (var i = 0; i < start.length; i++) {
            var clone = start[i].cloneNode(true);
            clone.classList.add(classes.cloneSlide);
            items.push(clone);
          }

          for (var _i = 0; _i < end.length; _i++) {
            var _clone = end[_i].cloneNode(true);

            _clone.classList.add(classes.cloneSlide);

            items.unshift(_clone);
          }
        }

        return items;
      },

      /**
       * Append cloned slides with generated pattern.
       *
       * @return {Void}
       */
      append: function append() {
        var items = this.items;
        var _Components$Html = Components.Html,
            wrapper = _Components$Html.wrapper,
            slides = _Components$Html.slides;
        var half = Math.floor(items.length / 2);
        var prepend = items.slice(0, half).reverse();
        var append = items.slice(half, items.length);
        var width = Components.Sizes.slideWidth + 'px';

        for (var i = 0; i < append.length; i++) {
          wrapper.appendChild(append[i]);
        }

        for (var _i2 = 0; _i2 < prepend.length; _i2++) {
          wrapper.insertBefore(prepend[_i2], slides[0]);
        }

        for (var _i3 = 0; _i3 < items.length; _i3++) {
          items[_i3].style.width = width;
        }
      },

      /**
       * Remove all cloned slides.
       *
       * @return {Void}
       */
      remove: function remove() {
        var items = this.items;

        for (var i = 0; i < items.length; i++) {
          Components.Html.wrapper.removeChild(items[i]);
        }
      }
    };
    define(Clones, 'grow', {
      /**
       * Gets additional dimentions value caused by clones.
       *
       * @return {Number}
       */
      get: function get() {
        return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones.items.length;
      }
    });
    /**
     * Append additional slide's clones:
     * - while glide's type is `carousel`
     */

    Events.on('update', function () {
      Clones.remove();
      Clones.mount();
      Clones.append();
    });
    /**
     * Append additional slide's clones:
     * - while glide's type is `carousel`
     */

    Events.on('build.before', function () {
      if (Glide.isType('carousel')) {
        Clones.append();
      }
    });
    /**
     * Remove clones HTMLElements:
     * - on destroying, to bring HTML to its initial state
     */

    Events.on('destroy', function () {
      Clones.remove();
    });
    return Clones;
  }

  var EventsBinder = function () {
    /**
     * Construct a EventsBinder instance.
     */
    function EventsBinder() {
      var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, EventsBinder);
      this.listeners = listeners;
    }
    /**
     * Adds events listeners to arrows HTML elements.
     *
     * @param  {String|Array} events
     * @param  {Element|Window|Document} el
     * @param  {Function} closure
     * @param  {Boolean|Object} capture
     * @return {Void}
     */


    createClass(EventsBinder, [{
      key: 'on',
      value: function on(events, el, closure) {
        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (isString(events)) {
          events = [events];
        }

        for (var i = 0; i < events.length; i++) {
          this.listeners[events[i]] = closure;
          el.addEventListener(events[i], this.listeners[events[i]], capture);
        }
      }
      /**
       * Removes event listeners from arrows HTML elements.
       *
       * @param  {String|Array} events
       * @param  {Element|Window|Document} el
       * @param  {Boolean|Object} capture
       * @return {Void}
       */

    }, {
      key: 'off',
      value: function off(events, el) {
        var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (isString(events)) {
          events = [events];
        }

        for (var i = 0; i < events.length; i++) {
          el.removeEventListener(events[i], this.listeners[events[i]], capture);
        }
      }
      /**
       * Destroy collected listeners.
       *
       * @returns {Void}
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        delete this.listeners;
      }
    }]);
    return EventsBinder;
  }();

  function Resize(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var Resize = {
      /**
       * Initializes window bindings.
       */
      mount: function mount() {
        this.bind();
      },

      /**
       * Binds `rezsize` listener to the window.
       * It's a costly event, so we are debouncing it.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('resize', window, throttle(function () {
          Events.emit('resize');
        }, Glide.settings.throttle));
      },

      /**
       * Unbinds listeners from the window.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('resize', window);
      }
    };
    /**
     * Remove bindings from window:
     * - on destroying, to remove added EventListener
     */

    Events.on('destroy', function () {
      Resize.unbind();
      Binder.destroy();
    });
    return Resize;
  }

  var VALID_DIRECTIONS = ['ltr', 'rtl'];
  var FLIPED_MOVEMENTS = {
    '>': '<',
    '<': '>',
    '=': '='
  };

  function Direction(Glide, Components, Events) {
    var Direction = {
      /**
       * Setups gap value based on settings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.value = Glide.settings.direction;
      },

      /**
       * Resolves pattern based on direction value
       *
       * @param {String} pattern
       * @returns {String}
       */
      resolve: function resolve(pattern) {
        var token = pattern.slice(0, 1);

        if (this.is('rtl')) {
          return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
        }

        return pattern;
      },

      /**
       * Checks value of direction mode.
       *
       * @param {String} direction
       * @returns {Boolean}
       */
      is: function is(direction) {
        return this.value === direction;
      },

      /**
       * Applies direction class to the root HTML element.
       *
       * @return {Void}
       */
      addClass: function addClass() {
        Components.Html.root.classList.add(Glide.settings.classes.direction[this.value]);
      },

      /**
       * Removes direction class from the root HTML element.
       *
       * @return {Void}
       */
      removeClass: function removeClass() {
        Components.Html.root.classList.remove(Glide.settings.classes.direction[this.value]);
      }
    };
    define(Direction, 'value', {
      /**
       * Gets value of the direction.
       *
       * @returns {Number}
       */
      get: function get() {
        return Direction._v;
      },

      /**
       * Sets value of the direction.
       *
       * @param {String} value
       * @return {Void}
       */
      set: function set(value) {
        if (VALID_DIRECTIONS.indexOf(value) > -1) {
          Direction._v = value;
        } else {
          warn('Direction value must be `ltr` or `rtl`');
        }
      }
    });
    /**
     * Clear direction class:
     * - on destroy to bring HTML to its initial state
     * - on update to remove class before reappling bellow
     */

    Events.on(['destroy', 'update'], function () {
      Direction.removeClass();
    });
    /**
     * Remount component:
     * - on update to reflect changes in direction value
     */

    Events.on('update', function () {
      Direction.mount();
    });
    /**
     * Apply direction class:
     * - before building to apply class for the first time
     * - on updating to reapply direction class that may changed
     */

    Events.on(['build.before', 'update'], function () {
      Direction.addClass();
    });
    return Direction;
  }
  /**
   * Reflects value of glide movement.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function Rtl(Glide, Components) {
    return {
      /**
       * Negates the passed translate if glide is in RTL option.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        if (Components.Direction.is('rtl')) {
          return -translate;
        }

        return translate;
      }
    };
  }
  /**
   * Updates glide movement with a `gap` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function Gap(Glide, Components) {
    return {
      /**
       * Modifies passed translate value with number in the `gap` settings.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        return translate + Components.Gaps.value * Glide.index;
      }
    };
  }
  /**
   * Updates glide movement with width of additional clones width.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function Grow(Glide, Components) {
    return {
      /**
       * Adds to the passed translate width of the half of clones.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        return translate + Components.Clones.grow / 2;
      }
    };
  }
  /**
   * Updates glide movement with a `peek` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function Peeking(Glide, Components) {
    return {
      /**
       * Modifies passed translate value with a `peek` setting.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        if (Glide.settings.focusAt >= 0) {
          var peek = Components.Peek.value;

          if (isObject(peek)) {
            return translate - peek.before;
          }

          return translate - peek;
        }

        return translate;
      }
    };
  }
  /**
   * Updates glide movement with a `focusAt` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function Focusing(Glide, Components) {
    return {
      /**
       * Modifies passed translate value with index in the `focusAt` setting.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        var gap = Components.Gaps.value;
        var width = Components.Sizes.width;
        var focusAt = Glide.settings.focusAt;
        var slideWidth = Components.Sizes.slideWidth;

        if (focusAt === 'center') {
          return translate - (width / 2 - slideWidth / 2);
        }

        return translate - slideWidth * focusAt - gap * focusAt;
      }
    };
  }
  /**
   * Applies diffrent transformers on translate value.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function mutator(Glide, Components, Events) {
    /**
     * Merge instance transformers with collection of default transformers.
     * It's important that the Rtl component be last on the list,
     * so it reflects all previous transformations.
     *
     * @type {Array}
     */
    var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide._t, [Rtl]);
    return {
      /**
       * Piplines translate value with registered transformers.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      mutate: function mutate(translate) {
        for (var i = 0; i < TRANSFORMERS.length; i++) {
          var transformer = TRANSFORMERS[i];

          if (isFunction(transformer) && isFunction(transformer().modify)) {
            translate = transformer(Glide, Components, Events).modify(translate);
          } else {
            warn('Transformer should be a function that returns an object with `modify()` method');
          }
        }

        return translate;
      }
    };
  }

  function Translate(Glide, Components, Events) {
    var Translate = {
      /**
       * Sets value of translate on HTML element.
       *
       * @param {Number} value
       * @return {Void}
       */
      set: function set(value) {
        var transform = mutator(Glide, Components).mutate(value);
        Components.Html.wrapper.style.transform = 'translate3d(' + -1 * transform + 'px, 0px, 0px)';
      },

      /**
       * Removes value of translate from HTML element.
       *
       * @return {Void}
       */
      remove: function remove() {
        Components.Html.wrapper.style.transform = '';
      }
    };
    /**
     * Set new translate value:
     * - on move to reflect index change
     * - on updating via API to reflect possible changes in options
     */

    Events.on('move', function (context) {
      var gap = Components.Gaps.value;
      var length = Components.Sizes.length;
      var width = Components.Sizes.slideWidth;

      if (Glide.isType('carousel') && Components.Run.isOffset('<')) {
        Components.Transition.after(function () {
          Events.emit('translate.jump');
          Translate.set(width * (length - 1));
        });
        return Translate.set(-width - gap * length);
      }

      if (Glide.isType('carousel') && Components.Run.isOffset('>')) {
        Components.Transition.after(function () {
          Events.emit('translate.jump');
          Translate.set(0);
        });
        return Translate.set(width * length + gap * length);
      }

      return Translate.set(context.movement);
    });
    /**
     * Remove translate:
     * - on destroying to bring markup to its inital state
     */

    Events.on('destroy', function () {
      Translate.remove();
    });
    return Translate;
  }

  function Transition(Glide, Components, Events) {
    /**
     * Holds inactivity status of transition.
     * When true transition is not applied.
     *
     * @type {Boolean}
     */
    var disabled = false;
    var Transition = {
      /**
       * Composes string of the CSS transition.
       *
       * @param {String} property
       * @return {String}
       */
      compose: function compose(property) {
        var settings = Glide.settings;

        if (!disabled) {
          return property + ' ' + this.duration + 'ms ' + settings.animationTimingFunc;
        }

        return property + ' 0ms ' + settings.animationTimingFunc;
      },

      /**
       * Sets value of transition on HTML element.
       *
       * @param {String=} property
       * @return {Void}
       */
      set: function set() {
        var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';
        Components.Html.wrapper.style.transition = this.compose(property);
      },

      /**
       * Removes value of transition from HTML element.
       *
       * @return {Void}
       */
      remove: function remove() {
        Components.Html.wrapper.style.transition = '';
      },

      /**
       * Runs callback after animation.
       *
       * @param  {Function} callback
       * @return {Void}
       */
      after: function after(callback) {
        setTimeout(function () {
          callback();
        }, this.duration);
      },

      /**
       * Enable transition.
       *
       * @return {Void}
       */
      enable: function enable() {
        disabled = false;
        this.set();
      },

      /**
       * Disable transition.
       *
       * @return {Void}
       */
      disable: function disable() {
        disabled = true;
        this.set();
      }
    };
    define(Transition, 'duration', {
      /**
       * Gets duration of the transition based
       * on currently running animation type.
       *
       * @return {Number}
       */
      get: function get() {
        var settings = Glide.settings;

        if (Glide.isType('slider') && Components.Run.offset) {
          return settings.rewindDuration;
        }

        return settings.animationDuration;
      }
    });
    /**
     * Set transition `style` value:
     * - on each moving, because it may be cleared by offset move
     */

    Events.on('move', function () {
      Transition.set();
    });
    /**
     * Disable transition:
     * - before initial build to avoid transitioning from `0` to `startAt` index
     * - while resizing window and recalculating dimentions
     * - on jumping from offset transition at start and end edges in `carousel` type
     */

    Events.on(['build.before', 'resize', 'translate.jump'], function () {
      Transition.disable();
    });
    /**
     * Enable transition:
     * - on each running, because it may be disabled by offset move
     */

    Events.on('run', function () {
      Transition.enable();
    });
    /**
     * Remove transition:
     * - on destroying to bring markup to its inital state
     */

    Events.on('destroy', function () {
      Transition.remove();
    });
    return Transition;
  }
  /**
   * Test via a getter in the options object to see
   * if the passive property is accessed.
   *
   * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
   */


  var supportsPassive = false;

  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassive = true;
      }
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {}

  var supportsPassive$1 = supportsPassive;
  var START_EVENTS = ['touchstart', 'mousedown'];
  var MOVE_EVENTS = ['touchmove', 'mousemove'];
  var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
  var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];

  function Swipe(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var swipeSin = 0;
    var swipeStartX = 0;
    var swipeStartY = 0;
    var disabled = false;
    var capture = supportsPassive$1 ? {
      passive: true
    } : false;
    var Swipe = {
      /**
       * Initializes swipe bindings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.bindSwipeStart();
      },

      /**
       * Handler for `swipestart` event. Calculates entry points of the user's tap.
       *
       * @param {Object} event
       * @return {Void}
       */
      start: function start(event) {
        if (!disabled && !Glide.disabled) {
          this.disable();
          var swipe = this.touches(event);
          swipeSin = null;
          swipeStartX = toInt(swipe.pageX);
          swipeStartY = toInt(swipe.pageY);
          this.bindSwipeMove();
          this.bindSwipeEnd();
          Events.emit('swipe.start');
        }
      },

      /**
       * Handler for `swipemove` event. Calculates user's tap angle and distance.
       *
       * @param {Object} event
       */
      move: function move(event) {
        if (!Glide.disabled) {
          var _Glide$settings = Glide.settings,
              touchAngle = _Glide$settings.touchAngle,
              touchRatio = _Glide$settings.touchRatio,
              classes = _Glide$settings.classes;
          var swipe = this.touches(event);
          var subExSx = toInt(swipe.pageX) - swipeStartX;
          var subEySy = toInt(swipe.pageY) - swipeStartY;
          var powEX = Math.abs(subExSx << 2);
          var powEY = Math.abs(subEySy << 2);
          var swipeHypotenuse = Math.sqrt(powEX + powEY);
          var swipeCathetus = Math.sqrt(powEY);
          swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);

          if (swipeSin * 180 / Math.PI < touchAngle) {
            event.stopPropagation();
            Components.Move.make(subExSx * toFloat(touchRatio));
            Components.Html.root.classList.add(classes.dragging);
            Events.emit('swipe.move');
          } else {
            return false;
          }
        }
      },

      /**
       * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
       *
       * @param {Object} event
       * @return {Void}
       */
      end: function end(event) {
        if (!Glide.disabled) {
          var settings = Glide.settings;
          var swipe = this.touches(event);
          var threshold = this.threshold(event);
          var swipeDistance = swipe.pageX - swipeStartX;
          var swipeDeg = swipeSin * 180 / Math.PI;
          var steps = Math.round(swipeDistance / Components.Sizes.slideWidth);
          this.enable();

          if (swipeDistance > threshold && swipeDeg < settings.touchAngle) {
            // While swipe is positive and greater than threshold move backward.
            if (settings.perTouch) {
              steps = Math.min(steps, toInt(settings.perTouch));
            }

            if (Components.Direction.is('rtl')) {
              steps = -steps;
            }

            Components.Run.make(Components.Direction.resolve('<' + steps));
          } else if (swipeDistance < -threshold && swipeDeg < settings.touchAngle) {
            // While swipe is negative and lower than negative threshold move forward.
            if (settings.perTouch) {
              steps = Math.max(steps, -toInt(settings.perTouch));
            }

            if (Components.Direction.is('rtl')) {
              steps = -steps;
            }

            Components.Run.make(Components.Direction.resolve('>' + steps));
          } else {
            // While swipe don't reach distance apply previous transform.
            Components.Move.make();
          }

          Components.Html.root.classList.remove(settings.classes.dragging);
          this.unbindSwipeMove();
          this.unbindSwipeEnd();
          Events.emit('swipe.end');
        }
      },

      /**
       * Binds swipe's starting event.
       *
       * @return {Void}
       */
      bindSwipeStart: function bindSwipeStart() {
        var _this = this;

        var settings = Glide.settings;

        if (settings.swipeThreshold) {
          Binder.on(START_EVENTS[0], Components.Html.wrapper, function (event) {
            _this.start(event);
          }, capture);
        }

        if (settings.dragThreshold) {
          Binder.on(START_EVENTS[1], Components.Html.wrapper, function (event) {
            _this.start(event);
          }, capture);
        }
      },

      /**
       * Unbinds swipe's starting event.
       *
       * @return {Void}
       */
      unbindSwipeStart: function unbindSwipeStart() {
        Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
        Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
      },

      /**
       * Binds swipe's moving event.
       *
       * @return {Void}
       */
      bindSwipeMove: function bindSwipeMove() {
        var _this2 = this;

        Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function (event) {
          _this2.move(event);
        }, Glide.settings.throttle), capture);
      },

      /**
       * Unbinds swipe's moving event.
       *
       * @return {Void}
       */
      unbindSwipeMove: function unbindSwipeMove() {
        Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
      },

      /**
       * Binds swipe's ending event.
       *
       * @return {Void}
       */
      bindSwipeEnd: function bindSwipeEnd() {
        var _this3 = this;

        Binder.on(END_EVENTS, Components.Html.wrapper, function (event) {
          _this3.end(event);
        });
      },

      /**
       * Unbinds swipe's ending event.
       *
       * @return {Void}
       */
      unbindSwipeEnd: function unbindSwipeEnd() {
        Binder.off(END_EVENTS, Components.Html.wrapper);
      },

      /**
       * Normalizes event touches points accorting to different types.
       *
       * @param {Object} event
       */
      touches: function touches(event) {
        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return event;
        }

        return event.touches[0] || event.changedTouches[0];
      },

      /**
       * Gets value of minimum swipe distance settings based on event type.
       *
       * @return {Number}
       */
      threshold: function threshold(event) {
        var settings = Glide.settings;

        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return settings.dragThreshold;
        }

        return settings.swipeThreshold;
      },

      /**
       * Enables swipe event.
       *
       * @return {self}
       */
      enable: function enable() {
        disabled = false;
        Components.Transition.enable();
        return this;
      },

      /**
       * Disables swipe event.
       *
       * @return {self}
       */
      disable: function disable() {
        disabled = true;
        Components.Transition.disable();
        return this;
      }
    };
    /**
     * Add component class:
     * - after initial building
     */

    Events.on('build.after', function () {
      Components.Html.root.classList.add(Glide.settings.classes.swipeable);
    });
    /**
     * Remove swiping bindings:
     * - on destroying, to remove added EventListeners
     */

    Events.on('destroy', function () {
      Swipe.unbindSwipeStart();
      Swipe.unbindSwipeMove();
      Swipe.unbindSwipeEnd();
      Binder.destroy();
    });
    return Swipe;
  }

  function Images(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var Images = {
      /**
       * Binds listener to glide wrapper.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.bind();
      },

      /**
       * Binds `dragstart` event on wrapper to prevent dragging images.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('dragstart', Components.Html.wrapper, this.dragstart);
      },

      /**
       * Unbinds `dragstart` event on wrapper.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('dragstart', Components.Html.wrapper);
      },

      /**
       * Event handler. Prevents dragging.
       *
       * @return {Void}
       */
      dragstart: function dragstart(event) {
        event.preventDefault();
      }
    };
    /**
     * Remove bindings from images:
     * - on destroying, to remove added EventListeners
     */

    Events.on('destroy', function () {
      Images.unbind();
      Binder.destroy();
    });
    return Images;
  }

  function Anchors(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    /**
     * Holds detaching status of anchors.
     * Prevents detaching of already detached anchors.
     *
     * @private
     * @type {Boolean}
     */

    var detached = false;
    /**
     * Holds preventing status of anchors.
     * If `true` redirection after click will be disabled.
     *
     * @private
     * @type {Boolean}
     */

    var prevented = false;
    var Anchors = {
      /**
       * Setups a initial state of anchors component.
       *
       * @returns {Void}
       */
      mount: function mount() {
        /**
         * Holds collection of anchors elements.
         *
         * @private
         * @type {HTMLCollection}
         */
        this._a = Components.Html.wrapper.querySelectorAll('a');
        this.bind();
      },

      /**
       * Binds events to anchors inside a track.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('click', Components.Html.wrapper, this.click);
      },

      /**
       * Unbinds events attached to anchors inside a track.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('click', Components.Html.wrapper);
      },

      /**
       * Handler for click event. Prevents clicks when glide is in `prevent` status.
       *
       * @param  {Object} event
       * @return {Void}
       */
      click: function click(event) {
        if (prevented) {
          event.stopPropagation();
          event.preventDefault();
        }
      },

      /**
       * Detaches anchors click event inside glide.
       *
       * @return {self}
       */
      detach: function detach() {
        prevented = true;

        if (!detached) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].draggable = false;
            this.items[i].setAttribute('data-href', this.items[i].getAttribute('href'));
            this.items[i].removeAttribute('href');
          }

          detached = true;
        }

        return this;
      },

      /**
       * Attaches anchors click events inside glide.
       *
       * @return {self}
       */
      attach: function attach() {
        prevented = false;

        if (detached) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].draggable = true;
            this.items[i].setAttribute('href', this.items[i].getAttribute('data-href'));
          }

          detached = false;
        }

        return this;
      }
    };
    define(Anchors, 'items', {
      /**
       * Gets collection of the arrows HTML elements.
       *
       * @return {HTMLElement[]}
       */
      get: function get() {
        return Anchors._a;
      }
    });
    /**
     * Detach anchors inside slides:
     * - on swiping, so they won't redirect to its `href` attributes
     */

    Events.on('swipe.move', function () {
      Anchors.detach();
    });
    /**
     * Attach anchors inside slides:
     * - after swiping and transitions ends, so they can redirect after click again
     */

    Events.on('swipe.end', function () {
      Components.Transition.after(function () {
        Anchors.attach();
      });
    });
    /**
     * Unbind anchors inside slides:
     * - on destroying, to bring anchors to its initial state
     */

    Events.on('destroy', function () {
      Anchors.attach();
      Anchors.unbind();
      Binder.destroy();
    });
    return Anchors;
  }

  var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
  var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';

  function Controls(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var capture = supportsPassive$1 ? {
      passive: true
    } : false;
    var Controls = {
      /**
       * Inits arrows. Binds events listeners
       * to the arrows HTML elements.
       *
       * @return {Void}
       */
      mount: function mount() {
        /**
         * Collection of navigation HTML elements.
         *
         * @private
         * @type {HTMLCollection}
         */
        this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);
        /**
         * Collection of controls HTML elements.
         *
         * @private
         * @type {HTMLCollection}
         */

        this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);
        this.addBindings();
      },

      /**
       * Sets active class to current slide.
       *
       * @return {Void}
       */
      setActive: function setActive() {
        for (var i = 0; i < this._n.length; i++) {
          this.addClass(this._n[i].children);
        }
      },

      /**
       * Removes active class to current slide.
       *
       * @return {Void}
       */
      removeActive: function removeActive() {
        for (var i = 0; i < this._n.length; i++) {
          this.removeClass(this._n[i].children);
        }
      },

      /**
       * Toggles active class on items inside navigation.
       *
       * @param  {HTMLElement} controls
       * @return {Void}
       */
      addClass: function addClass(controls) {
        var settings = Glide.settings;
        var item = controls[Glide.index];

        if (item) {
          item.classList.add(settings.classes.activeNav);
          siblings(item).forEach(function (sibling) {
            sibling.classList.remove(settings.classes.activeNav);
          });
        }
      },

      /**
       * Removes active class from active control.
       *
       * @param  {HTMLElement} controls
       * @return {Void}
       */
      removeClass: function removeClass(controls) {
        var item = controls[Glide.index];

        if (item) {
          item.classList.remove(Glide.settings.classes.activeNav);
        }
      },

      /**
       * Adds handles to the each group of controls.
       *
       * @return {Void}
       */
      addBindings: function addBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.bind(this._c[i].children);
        }
      },

      /**
       * Removes handles from the each group of controls.
       *
       * @return {Void}
       */
      removeBindings: function removeBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.unbind(this._c[i].children);
        }
      },

      /**
       * Binds events to arrows HTML elements.
       *
       * @param {HTMLCollection} elements
       * @return {Void}
       */
      bind: function bind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.on('click', elements[i], this.click);
          Binder.on('touchstart', elements[i], this.click, capture);
        }
      },

      /**
       * Unbinds events binded to the arrows HTML elements.
       *
       * @param {HTMLCollection} elements
       * @return {Void}
       */
      unbind: function unbind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.off(['click', 'touchstart'], elements[i]);
        }
      },

      /**
       * Handles `click` event on the arrows HTML elements.
       * Moves slider in driection precised in
       * `data-glide-dir` attribute.
       *
       * @param {Object} event
       * @return {Void}
       */
      click: function click(event) {
        event.preventDefault();
        Components.Run.make(Components.Direction.resolve(event.currentTarget.getAttribute('data-glide-dir')));
      }
    };
    define(Controls, 'items', {
      /**
       * Gets collection of the controls HTML elements.
       *
       * @return {HTMLElement[]}
       */
      get: function get() {
        return Controls._c;
      }
    });
    /**
     * Swap active class of current navigation item:
     * - after mounting to set it to initial index
     * - after each move to the new index
     */

    Events.on(['mount.after', 'move.after'], function () {
      Controls.setActive();
    });
    /**
     * Remove bindings and HTML Classes:
     * - on destroying, to bring markup to its initial state
     */

    Events.on('destroy', function () {
      Controls.removeBindings();
      Controls.removeActive();
      Binder.destroy();
    });
    return Controls;
  }

  function Keyboard(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var Keyboard = {
      /**
       * Binds keyboard events on component mount.
       *
       * @return {Void}
       */
      mount: function mount() {
        if (Glide.settings.keyboard) {
          this.bind();
        }
      },

      /**
       * Adds keyboard press events.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('keyup', document, this.press);
      },

      /**
       * Removes keyboard press events.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('keyup', document);
      },

      /**
       * Handles keyboard's arrows press and moving glide foward and backward.
       *
       * @param  {Object} event
       * @return {Void}
       */
      press: function press(event) {
        if (event.keyCode === 39) {
          Components.Run.make(Components.Direction.resolve('>'));
        }

        if (event.keyCode === 37) {
          Components.Run.make(Components.Direction.resolve('<'));
        }
      }
    };
    /**
     * Remove bindings from keyboard:
     * - on destroying to remove added events
     * - on updating to remove events before remounting
     */

    Events.on(['destroy', 'update'], function () {
      Keyboard.unbind();
    });
    /**
     * Remount component
     * - on updating to reflect potential changes in settings
     */

    Events.on('update', function () {
      Keyboard.mount();
    });
    /**
     * Destroy binder:
     * - on destroying to remove listeners
     */

    Events.on('destroy', function () {
      Binder.destroy();
    });
    return Keyboard;
  }

  function Autoplay(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var Autoplay = {
      /**
       * Initializes autoplaying and events.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.start();

        if (Glide.settings.hoverpause) {
          this.bind();
        }
      },

      /**
       * Starts autoplaying in configured interval.
       *
       * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
       * @return {Void}
       */
      start: function start() {
        var _this = this;

        if (Glide.settings.autoplay) {
          if (isUndefined(this._i)) {
            this._i = setInterval(function () {
              _this.stop();

              Components.Run.make('>');

              _this.start();
            }, this.time);
          }
        }
      },

      /**
       * Stops autorunning of the glide.
       *
       * @return {Void}
       */
      stop: function stop() {
        this._i = clearInterval(this._i);
      },

      /**
       * Stops autoplaying while mouse is over glide's area.
       *
       * @return {Void}
       */
      bind: function bind() {
        var _this2 = this;

        Binder.on('mouseover', Components.Html.root, function () {
          _this2.stop();
        });
        Binder.on('mouseout', Components.Html.root, function () {
          _this2.start();
        });
      },

      /**
       * Unbind mouseover events.
       *
       * @returns {Void}
       */
      unbind: function unbind() {
        Binder.off(['mouseover', 'mouseout'], Components.Html.root);
      }
    };
    define(Autoplay, 'time', {
      /**
       * Gets time period value for the autoplay interval. Prioritizes
       * times in `data-glide-autoplay` attrubutes over options.
       *
       * @return {Number}
       */
      get: function get() {
        var autoplay = Components.Html.slides[Glide.index].getAttribute('data-glide-autoplay');

        if (autoplay) {
          return toInt(autoplay);
        }

        return toInt(Glide.settings.autoplay);
      }
    });
    /**
     * Stop autoplaying and unbind events:
     * - on destroying, to clear defined interval
     * - on updating via API to reset interval that may changed
     */

    Events.on(['destroy', 'update'], function () {
      Autoplay.unbind();
    });
    /**
     * Stop autoplaying:
     * - before each run, to restart autoplaying
     * - on pausing via API
     * - on destroying, to clear defined interval
     * - while starting a swipe
     * - on updating via API to reset interval that may changed
     */

    Events.on(['run.before', 'pause', 'destroy', 'swipe.start', 'update'], function () {
      Autoplay.stop();
    });
    /**
     * Start autoplaying:
     * - after each run, to restart autoplaying
     * - on playing via API
     * - while ending a swipe
     */

    Events.on(['run.after', 'play', 'swipe.end'], function () {
      Autoplay.start();
    });
    /**
     * Remount autoplaying:
     * - on updating via API to reset interval that may changed
     */

    Events.on('update', function () {
      Autoplay.mount();
    });
    /**
     * Destroy a binder:
     * - on destroying glide instance to clearup listeners
     */

    Events.on('destroy', function () {
      Binder.destroy();
    });
    return Autoplay;
  }
  /**
   * Sorts keys of breakpoint object so they will be ordered from lower to bigger.
   *
   * @param {Object} points
   * @returns {Object}
   */


  function sortBreakpoints(points) {
    if (isObject(points)) {
      return sortKeys(points);
    } else {
      warn('Breakpoints option must be an object');
    }

    return {};
  }

  function Breakpoints(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    /**
     * Holds reference to settings.
     *
     * @type {Object}
     */

    var settings = Glide.settings;
    /**
     * Holds reference to breakpoints object in settings. Sorts breakpoints
     * from smaller to larger. It is required in order to proper
     * matching currently active breakpoint settings.
     *
     * @type {Object}
     */

    var points = sortBreakpoints(settings.breakpoints);
    /**
     * Cache initial settings before overwritting.
     *
     * @type {Object}
     */

    var defaults = _extends({}, settings);

    var Breakpoints = {
      /**
       * Matches settings for currectly matching media breakpoint.
       *
       * @param {Object} points
       * @returns {Object}
       */
      match: function match(points) {
        if (typeof window.matchMedia !== 'undefined') {
          for (var point in points) {
            if (points.hasOwnProperty(point)) {
              if (window.matchMedia('(max-width: ' + point + 'px)').matches) {
                return points[point];
              }
            }
          }
        }

        return defaults;
      }
    };
    /**
     * Overwrite instance settings with currently matching breakpoint settings.
     * This happens right after component initialization.
     */

    _extends(settings, Breakpoints.match(points));
    /**
     * Update glide with settings of matched brekpoint:
     * - window resize to update slider
     */


    Binder.on('resize', window, throttle(function () {
      Glide.settings = mergeOptions(settings, Breakpoints.match(points));
    }, Glide.settings.throttle));
    /**
     * Resort and update default settings:
     * - on reinit via API, so breakpoint matching will be performed with options
     */

    Events.on('update', function () {
      points = sortBreakpoints(points);
      defaults = _extends({}, settings);
    });
    /**
     * Unbind resize listener:
     * - on destroying, to bring markup to its initial state
     */

    Events.on('destroy', function () {
      Binder.off('resize', window);
    });
    return Breakpoints;
  }

  var COMPONENTS = {
    // Required
    Html: Html,
    Translate: Translate,
    Transition: Transition,
    Direction: Direction,
    Peek: Peek,
    Sizes: Sizes,
    Gaps: Gaps,
    Move: Move,
    Clones: Clones,
    Resize: Resize,
    Build: Build,
    Run: Run,
    // Optional
    Swipe: Swipe,
    Images: Images,
    Anchors: Anchors,
    Controls: Controls,
    Keyboard: Keyboard,
    Autoplay: Autoplay,
    Breakpoints: Breakpoints
  };

  var Glide$1 = function (_Core) {
    inherits(Glide$$1, _Core);

    function Glide$$1() {
      classCallCheck(this, Glide$$1);
      return possibleConstructorReturn(this, (Glide$$1.__proto__ || Object.getPrototypeOf(Glide$$1)).apply(this, arguments));
    }

    createClass(Glide$$1, [{
      key: 'mount',
      value: function mount() {
        var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return get(Glide$$1.prototype.__proto__ || Object.getPrototypeOf(Glide$$1.prototype), 'mount', this).call(this, _extends({}, COMPONENTS, extensions));
      }
    }]);
    return Glide$$1;
  }(Glide);

  const config = {
    type: "carousel",
    startAt: 1,
    perView: 3,
    autoplay: 4000,
    gap: 45,
    animationDuration: 500,
    breakpoints: {
      1300: {
        perView: 3
      },
      900: {
        perView: 2
      },
      600: {
        perView: 1
      }
    }
  };
  new Glide$1(".glide", config).mount();

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xpZGUuanMiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AZ2xpZGVqcy9nbGlkZS9kaXN0L2dsaWRlLmVzbS5qcyIsInNyYy9qcy9nbGlkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEdsaWRlLmpzIHYzLjQuMVxuICogKGMpIDIwMTMtMjAxOSBKxJlkcnplaiBDaGHFgnViZWsgPGplZHJ6ZWouY2hhbHViZWtAZ21haWwuY29tPiAoaHR0cDovL2plZHJ6ZWpjaGFsdWJlay5jb20vKVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIFR5cGUgb2YgdGhlIG1vdmVtZW50LlxuICAgKlxuICAgKiBBdmFpbGFibGUgdHlwZXM6XG4gICAqIGBzbGlkZXJgIC0gUmV3aW5kcyBzbGlkZXIgdG8gdGhlIHN0YXJ0L2VuZCB3aGVuIGl0IHJlYWNoZXMgdGhlIGZpcnN0IG9yIGxhc3Qgc2xpZGUuXG4gICAqIGBjYXJvdXNlbGAgLSBDaGFuZ2VzIHNsaWRlcyB3aXRob3V0IHN0YXJ0aW5nIG92ZXIgd2hlbiBpdCByZWFjaGVzIHRoZSBmaXJzdCBvciBsYXN0IHNsaWRlLlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgdHlwZTogJ3NsaWRlcicsXG5cbiAgLyoqXG4gICAqIFN0YXJ0IGF0IHNwZWNpZmljIHNsaWRlIG51bWJlciBkZWZpbmVkIHdpdGggemVyby1iYXNlZCBpbmRleC5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHN0YXJ0QXQ6IDAsXG5cbiAgLyoqXG4gICAqIEEgbnVtYmVyIG9mIHNsaWRlcyB2aXNpYmxlIG9uIHRoZSBzaW5nbGUgdmlld3BvcnQuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBwZXJWaWV3OiAxLFxuXG4gIC8qKlxuICAgKiBGb2N1cyBjdXJyZW50bHkgYWN0aXZlIHNsaWRlIGF0IGEgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoZSB0cmFjay5cbiAgICpcbiAgICogQXZhaWxhYmxlIGlucHV0czpcbiAgICogYGNlbnRlcmAgLSBDdXJyZW50IHNsaWRlIHdpbGwgYmUgYWx3YXlzIGZvY3VzZWQgYXQgdGhlIGNlbnRlciBvZiBhIHRyYWNrLlxuICAgKiBgMCwxLDIsMy4uLmAgLSBDdXJyZW50IHNsaWRlIHdpbGwgYmUgZm9jdXNlZCBvbiB0aGUgc3BlY2lmaWVkIHplcm8tYmFzZWQgaW5kZXguXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd8TnVtYmVyfVxuICAgKi9cbiAgZm9jdXNBdDogMCxcblxuICAvKipcbiAgICogQSBzaXplIG9mIHRoZSBnYXAgYWRkZWQgYmV0d2VlbiBzbGlkZXMuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBnYXA6IDEwLFxuXG4gIC8qKlxuICAgKiBDaGFuZ2Ugc2xpZGVzIGFmdGVyIGEgc3BlY2lmaWVkIGludGVydmFsLiBVc2UgYGZhbHNlYCBmb3IgdHVybmluZyBvZmYgYXV0b3BsYXkuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIGF1dG9wbGF5OiBmYWxzZSxcblxuICAvKipcbiAgICogU3RvcCBhdXRvcGxheSBvbiBtb3VzZW92ZXIgZXZlbnQuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgaG92ZXJwYXVzZTogdHJ1ZSxcblxuICAvKipcbiAgICogQWxsb3cgZm9yIGNoYW5naW5nIHNsaWRlcyB3aXRoIGxlZnQgYW5kIHJpZ2h0IGtleWJvYXJkIGFycm93cy5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBrZXlib2FyZDogdHJ1ZSxcblxuICAvKipcbiAgICogU3RvcCBydW5uaW5nIGBwZXJWaWV3YCBudW1iZXIgb2Ygc2xpZGVzIGZyb20gdGhlIGVuZC4gVXNlIHRoaXNcbiAgICogb3B0aW9uIGlmIHlvdSBkb24ndCB3YW50IHRvIGhhdmUgYW4gZW1wdHkgc3BhY2UgYWZ0ZXJcbiAgICogYSBzbGlkZXIuIFdvcmtzIG9ubHkgd2l0aCBgc2xpZGVyYCB0eXBlIGFuZCBhXG4gICAqIG5vbi1jZW50ZXJlZCBgZm9jdXNBdGAgc2V0dGluZy5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBib3VuZDogZmFsc2UsXG5cbiAgLyoqXG4gICAqIE1pbmltYWwgc3dpcGUgZGlzdGFuY2UgbmVlZGVkIHRvIGNoYW5nZSB0aGUgc2xpZGUuIFVzZSBgZmFsc2VgIGZvciB0dXJuaW5nIG9mZiBhIHN3aXBpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIHN3aXBlVGhyZXNob2xkOiA4MCxcblxuICAvKipcbiAgICogTWluaW1hbCBtb3VzZSBkcmFnIGRpc3RhbmNlIG5lZWRlZCB0byBjaGFuZ2UgdGhlIHNsaWRlLiBVc2UgYGZhbHNlYCBmb3IgdHVybmluZyBvZmYgYSBkcmFnZ2luZy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxCb29sZWFufVxuICAgKi9cbiAgZHJhZ1RocmVzaG9sZDogMTIwLFxuXG4gIC8qKlxuICAgKiBBIG1heGltdW0gbnVtYmVyIG9mIHNsaWRlcyB0byB3aGljaCBtb3ZlbWVudCB3aWxsIGJlIG1hZGUgb24gc3dpcGluZyBvciBkcmFnZ2luZy4gVXNlIGBmYWxzZWAgZm9yIHVubGltaXRlZC5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxCb29sZWFufVxuICAgKi9cbiAgcGVyVG91Y2g6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBNb3ZpbmcgZGlzdGFuY2UgcmF0aW8gb2YgdGhlIHNsaWRlcyBvbiBhIHN3aXBpbmcgYW5kIGRyYWdnaW5nLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgdG91Y2hSYXRpbzogMC41LFxuXG4gIC8qKlxuICAgKiBBbmdsZSByZXF1aXJlZCB0byBhY3RpdmF0ZSBzbGlkZXMgbW92aW5nIG9uIHN3aXBpbmcgb3IgZHJhZ2dpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICB0b3VjaEFuZ2xlOiA0NSxcblxuICAvKipcbiAgICogRHVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBhbmltYXRpb25EdXJhdGlvbjogNDAwLFxuXG4gIC8qKlxuICAgKiBBbGxvd3MgbG9vcGluZyB0aGUgYHNsaWRlcmAgdHlwZS4gU2xpZGVyIHdpbGwgcmV3aW5kIHRvIHRoZSBmaXJzdC9sYXN0IHNsaWRlIHdoZW4gaXQncyBhdCB0aGUgc3RhcnQvZW5kLlxuICAgKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIHJld2luZDogdHJ1ZSxcblxuICAvKipcbiAgICogRHVyYXRpb24gb2YgdGhlIHJld2luZGluZyBhbmltYXRpb24gb2YgdGhlIGBzbGlkZXJgIHR5cGUgaW4gbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgcmV3aW5kRHVyYXRpb246IDgwMCxcblxuICAvKipcbiAgICogRWFzaW5nIGZ1bmN0aW9uIGZvciB0aGUgYW5pbWF0aW9uLlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgYW5pbWF0aW9uVGltaW5nRnVuYzogJ2N1YmljLWJlemllciguMTY1LCAuODQwLCAuNDQwLCAxKScsXG5cbiAgLyoqXG4gICAqIFRocm90dGxlIGNvc3RseSBldmVudHMgYXQgbW9zdCBvbmNlIHBlciBldmVyeSB3YWl0IG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHRocm90dGxlOiAxMCxcblxuICAvKipcbiAgICogTW92aW5nIGRpcmVjdGlvbiBtb2RlLlxuICAgKlxuICAgKiBBdmFpbGFibGUgaW5wdXRzOlxuICAgKiAtICdsdHInIC0gbGVmdCB0byByaWdodCBtb3ZlbWVudCxcbiAgICogLSAncnRsJyAtIHJpZ2h0IHRvIGxlZnQgbW92ZW1lbnQuXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBkaXJlY3Rpb246ICdsdHInLFxuXG4gIC8qKlxuICAgKiBUaGUgZGlzdGFuY2UgdmFsdWUgb2YgdGhlIG5leHQgYW5kIHByZXZpb3VzIHZpZXdwb3J0cyB3aGljaFxuICAgKiBoYXZlIHRvIHBlZWsgaW4gdGhlIGN1cnJlbnQgdmlldy4gQWNjZXB0cyBudW1iZXIgYW5kXG4gICAqIHBpeGVscyBhcyBhIHN0cmluZy4gTGVmdCBhbmQgcmlnaHQgcGVla2luZyBjYW4gYmVcbiAgICogc2V0IHVwIHNlcGFyYXRlbHkgd2l0aCBhIGRpcmVjdGlvbnMgb2JqZWN0LlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZTpcbiAgICogYDEwMGAgLSBQZWVrIDEwMHB4IG9uIHRoZSBib3RoIHNpZGVzLlxuICAgKiB7IGJlZm9yZTogMTAwLCBhZnRlcjogNTAgfWAgLSBQZWVrIDEwMHB4IG9uIHRoZSBsZWZ0IHNpZGUgYW5kIDUwcHggb24gdGhlIHJpZ2h0IHNpZGUuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8U3RyaW5nfE9iamVjdH1cbiAgICovXG4gIHBlZWs6IDAsXG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2Ygb3B0aW9ucyBhcHBsaWVkIGF0IHNwZWNpZmllZCBtZWRpYSBicmVha3BvaW50cy5cbiAgICogRm9yIGV4YW1wbGU6IGRpc3BsYXkgdHdvIHNsaWRlcyBwZXIgdmlldyB1bmRlciA4MDBweC5cbiAgICogYHtcbiAgICogICAnODAwcHgnOiB7XG4gICAqICAgICBwZXJWaWV3OiAyXG4gICAqICAgfVxuICAgKiB9YFxuICAgKi9cbiAgYnJlYWtwb2ludHM6IHt9LFxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIGludGVybmFsbHkgdXNlZCBIVE1MIGNsYXNzZXMuXG4gICAqXG4gICAqIEB0b2RvIFJlZmFjdG9yIGBzbGlkZXJgIGFuZCBgY2Fyb3VzZWxgIHByb3BlcnRpZXMgdG8gc2luZ2xlIGB0eXBlOiB7IHNsaWRlcjogJycsIGNhcm91c2VsOiAnJyB9YCBvYmplY3RcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIGNsYXNzZXM6IHtcbiAgICBkaXJlY3Rpb246IHtcbiAgICAgIGx0cjogJ2dsaWRlLS1sdHInLFxuICAgICAgcnRsOiAnZ2xpZGUtLXJ0bCdcbiAgICB9LFxuICAgIHNsaWRlcjogJ2dsaWRlLS1zbGlkZXInLFxuICAgIGNhcm91c2VsOiAnZ2xpZGUtLWNhcm91c2VsJyxcbiAgICBzd2lwZWFibGU6ICdnbGlkZS0tc3dpcGVhYmxlJyxcbiAgICBkcmFnZ2luZzogJ2dsaWRlLS1kcmFnZ2luZycsXG4gICAgY2xvbmVTbGlkZTogJ2dsaWRlX19zbGlkZS0tY2xvbmUnLFxuICAgIGFjdGl2ZU5hdjogJ2dsaWRlX19idWxsZXQtLWFjdGl2ZScsXG4gICAgYWN0aXZlU2xpZGU6ICdnbGlkZV9fc2xpZGUtLWFjdGl2ZScsXG4gICAgZGlzYWJsZWRBcnJvdzogJ2dsaWRlX19hcnJvdy0tZGlzYWJsZWQnXG4gIH1cbn07XG5cbi8qKlxuICogT3V0cHV0cyB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGJvd3NlciBjb25zb2xlLlxuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gbXNnXG4gKiBAcmV0dXJuIHtWb2lkfVxuICovXG5mdW5jdGlvbiB3YXJuKG1zZykge1xuICBjb25zb2xlLmVycm9yKFwiW0dsaWRlIHdhcm5dOiBcIiArIG1zZyk7XG59XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG59O1xuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxudmFyIGdldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTtcblxuICBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpO1xuXG4gICAgaWYgKHBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7XG4gICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGdldHRlciA9IGRlc2MuZ2V0O1xuXG4gICAgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7XG4gIH1cbn07XG5cbnZhciBpbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cbnZhciBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHZhbHVlIGVudGVyZWQgYXMgbnVtYmVyXG4gKiBvciBzdHJpbmcgdG8gaW50ZWdlciB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIHRvSW50KHZhbHVlKSB7XG4gIHJldHVybiBwYXJzZUludCh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgdmFsdWUgZW50ZXJlZCBhcyBudW1iZXJcbiAqIG9yIHN0cmluZyB0byBmbGF0IHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xuZnVuY3Rpb24gdG9GbG9hdCh2YWx1ZSkge1xuICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gIHsqfSAgIHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpO1xuXG4gIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhdmFsdWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbWl4ZWQtb3BlcmF0b3JzXG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIG51bWJlci5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSAgeyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyB1bmRlZmluZWQuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYW4gYXJyYXkuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yID09PSBBcnJheTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCBpbml0aWFsaXplcyBzcGVjaWZpZWQgY29sbGVjdGlvbiBvZiBleHRlbnNpb25zLlxuICogRWFjaCBleHRlbnNpb24gcmVjZWl2ZXMgYWNjZXNzIHRvIGluc3RhbmNlIG9mIGdsaWRlIGFuZCByZXN0IG9mIGNvbXBvbmVudHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGdsaWRlXG4gKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5zaW9uc1xuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIG1vdW50KGdsaWRlLCBleHRlbnNpb25zLCBldmVudHMpIHtcbiAgdmFyIGNvbXBvbmVudHMgPSB7fTtcblxuICBmb3IgKHZhciBuYW1lIGluIGV4dGVuc2lvbnMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihleHRlbnNpb25zW25hbWVdKSkge1xuICAgICAgY29tcG9uZW50c1tuYW1lXSA9IGV4dGVuc2lvbnNbbmFtZV0oZ2xpZGUsIGNvbXBvbmVudHMsIGV2ZW50cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdhcm4oJ0V4dGVuc2lvbiBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBfbmFtZSBpbiBjb21wb25lbnRzKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29tcG9uZW50c1tfbmFtZV0ubW91bnQpKSB7XG4gICAgICBjb21wb25lbnRzW19uYW1lXS5tb3VudCgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb21wb25lbnRzO1xufVxuXG4vKipcbiAqIERlZmluZXMgZ2V0dGVyIGFuZCBzZXR0ZXIgcHJvcGVydHkgb24gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvYmogICAgICAgICBPYmplY3Qgd2hlcmUgcHJvcGVydHkgaGFzIHRvIGJlIGRlZmluZWQuXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHByb3AgICAgICAgIE5hbWUgb2YgdGhlIGRlZmluZWQgcHJvcGVydHkuXG4gKiBAcGFyYW0gIHtPYmplY3R9IGRlZmluaXRpb24gIEdldCBhbmQgc2V0IGRlZmluaXRpb25zIGZvciB0aGUgcHJvcGVydHkuXG4gKiBAcmV0dXJuIHtWb2lkfVxuICovXG5mdW5jdGlvbiBkZWZpbmUob2JqLCBwcm9wLCBkZWZpbml0aW9uKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIGRlZmluaXRpb24pO1xufVxuXG4vKipcbiAqIFNvcnRzIGFwaGFiZXRpY2FsbHkgb2JqZWN0IGtleXMuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gc29ydEtleXMob2JqKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnNvcnQoKS5yZWR1Y2UoZnVuY3Rpb24gKHIsIGspIHtcbiAgICByW2tdID0gb2JqW2tdO1xuXG4gICAgcmV0dXJuIHJba10sIHI7XG4gIH0sIHt9KTtcbn1cblxuLyoqXG4gKiBNZXJnZXMgcGFzc2VkIHNldHRpbmdzIG9iamVjdCB3aXRoIGRlZmF1bHQgb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IGRlZmF1bHRzXG4gKiBAcGFyYW0gIHtPYmplY3R9IHNldHRpbmdzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIG1lcmdlT3B0aW9ucyhkZWZhdWx0cywgc2V0dGluZ3MpIHtcbiAgdmFyIG9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgZGVmYXVsdHMsIHNldHRpbmdzKTtcblxuICAvLyBgT2JqZWN0LmFzc2lnbmAgZG8gbm90IGRlZXBseSBtZXJnZSBvYmplY3RzLCBzbyB3ZVxuICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5IGZvciBldmVyeSBuZXN0ZWQgb2JqZWN0XG4gIC8vIGluIG9wdGlvbnMuIEFsdGhvdWdoIGl0IGRvZXMgbm90IGxvb2sgc21hcnQsXG4gIC8vIGl0J3Mgc21hbGxlciBhbmQgZmFzdGVyIHRoYW4gc29tZSBmYW5jeVxuICAvLyBtZXJnaW5nIGRlZXAtbWVyZ2UgYWxnb3JpdGhtIHNjcmlwdC5cbiAgaWYgKHNldHRpbmdzLmhhc093blByb3BlcnR5KCdjbGFzc2VzJykpIHtcbiAgICBvcHRpb25zLmNsYXNzZXMgPSBfZXh0ZW5kcyh7fSwgZGVmYXVsdHMuY2xhc3Nlcywgc2V0dGluZ3MuY2xhc3Nlcyk7XG5cbiAgICBpZiAoc2V0dGluZ3MuY2xhc3Nlcy5oYXNPd25Qcm9wZXJ0eSgnZGlyZWN0aW9uJykpIHtcbiAgICAgIG9wdGlvbnMuY2xhc3Nlcy5kaXJlY3Rpb24gPSBfZXh0ZW5kcyh7fSwgZGVmYXVsdHMuY2xhc3Nlcy5kaXJlY3Rpb24sIHNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uKTtcbiAgICB9XG4gIH1cblxuICBpZiAoc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ2JyZWFrcG9pbnRzJykpIHtcbiAgICBvcHRpb25zLmJyZWFrcG9pbnRzID0gX2V4dGVuZHMoe30sIGRlZmF1bHRzLmJyZWFrcG9pbnRzLCBzZXR0aW5ncy5icmVha3BvaW50cyk7XG4gIH1cblxuICByZXR1cm4gb3B0aW9ucztcbn1cblxudmFyIEV2ZW50c0J1cyA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIEV2ZW50QnVzIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRzXG4gICAqL1xuICBmdW5jdGlvbiBFdmVudHNCdXMoKSB7XG4gICAgdmFyIGV2ZW50cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnRzQnVzKTtcblxuICAgIHRoaXMuZXZlbnRzID0gZXZlbnRzO1xuICAgIHRoaXMuaG9wID0gZXZlbnRzLmhhc093blByb3BlcnR5O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgbGlzdGVuZXIgdG8gdGhlIHNwZWNpZmVkIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cblxuXG4gIGNyZWF0ZUNsYXNzKEV2ZW50c0J1cywgW3tcbiAgICBrZXk6ICdvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICBpZiAoaXNBcnJheShldmVudCkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMub24oZXZlbnRbaV0sIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgZXZlbnQncyBvYmplY3QgaWYgbm90IHlldCBjcmVhdGVkXG4gICAgICBpZiAoIXRoaXMuaG9wLmNhbGwodGhpcy5ldmVudHMsIGV2ZW50KSkge1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHRoZSBoYW5kbGVyIHRvIHF1ZXVlXG4gICAgICB2YXIgaW5kZXggPSB0aGlzLmV2ZW50c1tldmVudF0ucHVzaChoYW5kbGVyKSAtIDE7XG5cbiAgICAgIC8vIFByb3ZpZGUgaGFuZGxlIGJhY2sgZm9yIHJlbW92YWwgb2YgZXZlbnRcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50c1tldmVudF1baW5kZXhdO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1bnMgcmVnaXN0ZXJlZCBoYW5kbGVycyBmb3Igc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGV2ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3Q9fSBjb250ZXh0XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2VtaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbWl0KGV2ZW50LCBjb250ZXh0KSB7XG4gICAgICBpZiAoaXNBcnJheShldmVudCkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuZW1pdChldmVudFtpXSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIGV2ZW50IGRvZXNuJ3QgZXhpc3QsIG9yIHRoZXJlJ3Mgbm8gaGFuZGxlcnMgaW4gcXVldWUsIGp1c3QgbGVhdmVcbiAgICAgIGlmICghdGhpcy5ob3AuY2FsbCh0aGlzLmV2ZW50cywgZXZlbnQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQ3ljbGUgdGhyb3VnaCBldmVudHMgcXVldWUsIGZpcmUhXG4gICAgICB0aGlzLmV2ZW50c1tldmVudF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpdGVtKGNvbnRleHQgfHwge30pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBFdmVudHNCdXM7XG59KCk7XG5cbnZhciBHbGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGdsaWRlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBzZWxlY3RvclxyXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xyXG4gICAqL1xuICBmdW5jdGlvbiBHbGlkZShzZWxlY3Rvcikge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBHbGlkZSk7XG5cbiAgICB0aGlzLl9jID0ge307XG4gICAgdGhpcy5fdCA9IFtdO1xuICAgIHRoaXMuX2UgPSBuZXcgRXZlbnRzQnVzKCk7XG5cbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgIHRoaXMuc2V0dGluZ3MgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIHRoaXMuaW5kZXggPSB0aGlzLnNldHRpbmdzLnN0YXJ0QXQ7XG4gIH1cblxuICAvKipcclxuICAgKiBJbml0aWFsaXplcyBnbGlkZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBleHRlbnNpb25zIENvbGxlY3Rpb24gb2YgZXh0ZW5zaW9ucyB0byBpbml0aWFsaXplLlxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xuXG5cbiAgY3JlYXRlQ2xhc3MoR2xpZGUsIFt7XG4gICAga2V5OiAnbW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtb3VudCQkMSgpIHtcbiAgICAgIHZhciBleHRlbnNpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICAgICAgdGhpcy5fZS5lbWl0KCdtb3VudC5iZWZvcmUnKTtcblxuICAgICAgaWYgKGlzT2JqZWN0KGV4dGVuc2lvbnMpKSB7XG4gICAgICAgIHRoaXMuX2MgPSBtb3VudCh0aGlzLCBleHRlbnNpb25zLCB0aGlzLl9lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oJ1lvdSBuZWVkIHRvIHByb3ZpZGUgYSBvYmplY3Qgb24gYG1vdW50KClgJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2UuZW1pdCgnbW91bnQuYWZ0ZXInKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBDb2xsZWN0cyBhbiBpbnN0YW5jZSBgdHJhbnNsYXRlYCB0cmFuc2Zvcm1lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7QXJyYXl9IHRyYW5zZm9ybWVycyBDb2xsZWN0aW9uIG9mIHRyYW5zZm9ybWVycy5cclxuICAgICAqIEByZXR1cm4ge1ZvaWR9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnbXV0YXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbXV0YXRlKCkge1xuICAgICAgdmFyIHRyYW5zZm9ybWVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG5cbiAgICAgIGlmIChpc0FycmF5KHRyYW5zZm9ybWVycykpIHtcbiAgICAgICAgdGhpcy5fdCA9IHRyYW5zZm9ybWVycztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oJ1lvdSBuZWVkIHRvIHByb3ZpZGUgYSBhcnJheSBvbiBgbXV0YXRlKClgJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBnbGlkZSB3aXRoIHNwZWNpZmllZCBzZXR0aW5ncy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2V0dGluZ3NcclxuICAgICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIHZhciBzZXR0aW5ncyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICAgIHRoaXMuc2V0dGluZ3MgPSBtZXJnZU9wdGlvbnModGhpcy5zZXR0aW5ncywgc2V0dGluZ3MpO1xuXG4gICAgICBpZiAoc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ3N0YXJ0QXQnKSkge1xuICAgICAgICB0aGlzLmluZGV4ID0gc2V0dGluZ3Muc3RhcnRBdDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZS5lbWl0KCd1cGRhdGUnKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2Ugc2xpZGUgd2l0aCBzcGVjaWZpZWQgcGF0dGVybi4gQSBwYXR0ZXJuIG11c3QgYmUgaW4gdGhlIHNwZWNpYWwgZm9ybWF0OlxyXG4gICAgICogYD5gIC0gTW92ZSBvbmUgZm9yd2FyZFxyXG4gICAgICogYDxgIC0gTW92ZSBvbmUgYmFja3dhcmRcclxuICAgICAqIGA9e2l9YCAtIEdvIHRvIHtpfSB6ZXJvLWJhc2VkIHNsaWRlIChlcS4gJz0xJywgd2lsbCBnbyB0byBzZWNvbmQgc2xpZGUpXHJcbiAgICAgKiBgPj5gIC0gUmV3aW5kcyB0byBlbmQgKGxhc3Qgc2xpZGUpXHJcbiAgICAgKiBgPDxgIC0gUmV3aW5kcyB0byBzdGFydCAoZmlyc3Qgc2xpZGUpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdHRlcm5cclxuICAgICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dvJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ28ocGF0dGVybikge1xuICAgICAgdGhpcy5fYy5SdW4ubWFrZShwYXR0ZXJuKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlIHRyYWNrIGJ5IHNwZWNpZmllZCBkaXN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlzdGFuY2VcclxuICAgICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ21vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtb3ZlKGRpc3RhbmNlKSB7XG4gICAgICB0aGlzLl9jLlRyYW5zaXRpb24uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fYy5Nb3ZlLm1ha2UoZGlzdGFuY2UpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIERlc3Ryb3kgaW5zdGFuY2UgYW5kIHJldmVydCBhbGwgY2hhbmdlcyBkb25lIGJ5IHRoaXMuX2MuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB0aGlzLl9lLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCBpbnN0YW5jZSBhdXRvcGxheWluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW58TnVtYmVyfSBpbnRlcnZhbCBSdW4gYXV0b3BsYXlpbmcgd2l0aCBwYXNzZWQgaW50ZXJ2YWwgcmVnYXJkbGVzcyBvZiBgYXV0b3BsYXlgIHNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdwbGF5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgIHZhciBpbnRlcnZhbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZmFsc2U7XG5cbiAgICAgIGlmIChpbnRlcnZhbCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzLmF1dG9wbGF5ID0gaW50ZXJ2YWw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2UuZW1pdCgncGxheScpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFN0b3AgaW5zdGFuY2UgYXV0b3BsYXlpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncGF1c2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgIHRoaXMuX2UuZW1pdCgncGF1c2UnKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGdsaWRlIGludG8gYSBpZGxlIHN0YXR1cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkaXNhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFNldHMgZ2xpZGUgaW50byBhIGFjdGl2ZSBzdGF0dXMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZW5hYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEFkZHMgY3V1dG9tIGV2ZW50IGxpc3RlbmVyIHdpdGggaGFuZGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd8QXJyYXl9IGV2ZW50XHJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG4gICAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbihldmVudCwgaGFuZGxlcikge1xuICAgICAgdGhpcy5fZS5vbihldmVudCwgaGFuZGxlcik7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGdsaWRlIGlzIGEgcHJlY2lzZWQgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWVcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNUeXBlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNUeXBlKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnR5cGUgPT09IG5hbWU7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBjb3JlIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3NldHRpbmdzJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9vO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0aGUgY29yZSBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gb1xyXG4gICAgICogQHJldHVybiB7Vm9pZH1cclxuICAgICAqL1xuICAgICxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMShvKSB7XG4gICAgICBpZiAoaXNPYmplY3QobykpIHtcbiAgICAgICAgdGhpcy5fbyA9IG87XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKCdPcHRpb25zIG11c3QgYmUgYW4gYG9iamVjdGAgaW5zdGFuY2UuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGN1cnJlbnQgaW5kZXggb2YgdGhlIHNsaWRlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaW5kZXgnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2k7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGN1cnJlbnQgaW5kZXggYSBzbGlkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICovXG4gICAgLFxuICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKGkpIHtcbiAgICAgIHRoaXMuX2kgPSB0b0ludChpKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEdldHMgdHlwZSBuYW1lIG9mIHRoZSBzbGlkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3R5cGUnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MudHlwZTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIGlkbGUgc3RhdHVzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGlzYWJsZWQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2Q7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBpZGxlIHN0YXR1cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXG4gICAgLFxuICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKHN0YXR1cykge1xuICAgICAgdGhpcy5fZCA9ICEhc3RhdHVzO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gR2xpZGU7XG59KCk7XG5cbmZ1bmN0aW9uIFJ1biAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICB2YXIgUnVuID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGF1dG9ydW5uaW5nIG9mIHRoZSBnbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy5fbyA9IGZhbHNlO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIE1ha2VzIGdsaWRlcyBydW5uaW5nIGJhc2VkIG9uIHRoZSBwYXNzZWQgbW92aW5nIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtb3ZlXG4gICAgICovXG4gICAgbWFrZTogZnVuY3Rpb24gbWFrZShtb3ZlKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpZiAoIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgIEdsaWRlLmRpc2FibGUoKTtcblxuICAgICAgICB0aGlzLm1vdmUgPSBtb3ZlO1xuXG4gICAgICAgIEV2ZW50cy5lbWl0KCdydW4uYmVmb3JlJywgdGhpcy5tb3ZlKTtcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xuXG4gICAgICAgIEV2ZW50cy5lbWl0KCdydW4nLCB0aGlzLm1vdmUpO1xuXG4gICAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKF90aGlzLmlzU3RhcnQoKSkge1xuICAgICAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5zdGFydCcsIF90aGlzLm1vdmUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfdGhpcy5pc0VuZCgpKSB7XG4gICAgICAgICAgICBFdmVudHMuZW1pdCgncnVuLmVuZCcsIF90aGlzLm1vdmUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfdGhpcy5pc09mZnNldCgnPCcpIHx8IF90aGlzLmlzT2Zmc2V0KCc+JykpIHtcbiAgICAgICAgICAgIF90aGlzLl9vID0gZmFsc2U7XG5cbiAgICAgICAgICAgIEV2ZW50cy5lbWl0KCdydW4ub2Zmc2V0JywgX3RoaXMubW92ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5hZnRlcicsIF90aGlzLm1vdmUpO1xuXG4gICAgICAgICAgR2xpZGUuZW5hYmxlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgY3VycmVudCBpbmRleCBiYXNlZCBvbiBkZWZpbmVkIG1vdmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGNhbGN1bGF0ZTogZnVuY3Rpb24gY2FsY3VsYXRlKCkge1xuICAgICAgdmFyIG1vdmUgPSB0aGlzLm1vdmUsXG4gICAgICAgICAgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gICAgICB2YXIgc3RlcHMgPSBtb3ZlLnN0ZXBzLFxuICAgICAgICAgIGRpcmVjdGlvbiA9IG1vdmUuZGlyZWN0aW9uO1xuXG5cbiAgICAgIHZhciBjb3VudGFibGVTdGVwcyA9IGlzTnVtYmVyKHRvSW50KHN0ZXBzKSkgJiYgdG9JbnQoc3RlcHMpICE9PSAwO1xuXG4gICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICBjYXNlICc+JzpcbiAgICAgICAgICBpZiAoc3RlcHMgPT09ICc+Jykge1xuICAgICAgICAgICAgR2xpZGUuaW5kZXggPSBsZW5ndGg7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRW5kKCkpIHtcbiAgICAgICAgICAgIGlmICghKEdsaWRlLmlzVHlwZSgnc2xpZGVyJykgJiYgIUdsaWRlLnNldHRpbmdzLnJld2luZCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgR2xpZGUuaW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoY291bnRhYmxlU3RlcHMpIHtcbiAgICAgICAgICAgIEdsaWRlLmluZGV4ICs9IE1hdGgubWluKGxlbmd0aCAtIEdsaWRlLmluZGV4LCAtdG9JbnQoc3RlcHMpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgR2xpZGUuaW5kZXgrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnPCc6XG4gICAgICAgICAgaWYgKHN0ZXBzID09PSAnPCcpIHtcbiAgICAgICAgICAgIEdsaWRlLmluZGV4ID0gMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNTdGFydCgpKSB7XG4gICAgICAgICAgICBpZiAoIShHbGlkZS5pc1R5cGUoJ3NsaWRlcicpICYmICFHbGlkZS5zZXR0aW5ncy5yZXdpbmQpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX28gPSB0cnVlO1xuXG4gICAgICAgICAgICAgIEdsaWRlLmluZGV4ID0gbGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoY291bnRhYmxlU3RlcHMpIHtcbiAgICAgICAgICAgIEdsaWRlLmluZGV4IC09IE1hdGgubWluKEdsaWRlLmluZGV4LCB0b0ludChzdGVwcykpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBHbGlkZS5pbmRleC0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICc9JzpcbiAgICAgICAgICBHbGlkZS5pbmRleCA9IHN0ZXBzO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgd2FybignSW52YWxpZCBkaXJlY3Rpb24gcGF0dGVybiBbJyArIGRpcmVjdGlvbiArIHN0ZXBzICsgJ10gaGFzIGJlZW4gdXNlZCcpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB3ZSBhcmUgb24gdGhlIGZpcnN0IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1N0YXJ0OiBmdW5jdGlvbiBpc1N0YXJ0KCkge1xuICAgICAgcmV0dXJuIEdsaWRlLmluZGV4ID09PSAwO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB3ZSBhcmUgb24gdGhlIGxhc3Qgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzRW5kOiBmdW5jdGlvbiBpc0VuZCgpIHtcbiAgICAgIHJldHVybiBHbGlkZS5pbmRleCA9PT0gdGhpcy5sZW5ndGg7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHdlIGFyZSBtYWtpbmcgYSBvZmZzZXQgcnVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRpcmVjdGlvblxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNPZmZzZXQ6IGZ1bmN0aW9uIGlzT2Zmc2V0KGRpcmVjdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMuX28gJiYgdGhpcy5tb3ZlLmRpcmVjdGlvbiA9PT0gZGlyZWN0aW9uO1xuICAgIH1cbiAgfTtcblxuICBkZWZpbmUoUnVuLCAnbW92ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBtb3ZlIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBtb3ZlIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIHZhciBzdGVwID0gdmFsdWUuc3Vic3RyKDEpO1xuXG4gICAgICB0aGlzLl9tID0ge1xuICAgICAgICBkaXJlY3Rpb246IHZhbHVlLnN1YnN0cigwLCAxKSxcbiAgICAgICAgc3RlcHM6IHN0ZXAgPyB0b0ludChzdGVwKSA/IHRvSW50KHN0ZXApIDogc3RlcCA6IDBcbiAgICAgIH07XG4gICAgfVxuICB9KTtcblxuICBkZWZpbmUoUnVuLCAnbGVuZ3RoJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIHJ1bm5pbmcgZGlzdGFuY2UgYmFzZWRcbiAgICAgKiBvbiB6ZXJvLWluZGV4aW5nIG51bWJlciBvZiBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5ncztcbiAgICAgIHZhciBsZW5ndGggPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzLmxlbmd0aDtcblxuICAgICAgLy8gSWYgdGhlIGBib3VuZGAgb3B0aW9uIGlzIGFjaXR2ZSwgYSBtYXhpbXVtIHJ1bm5pbmcgZGlzdGFuY2Ugc2hvdWxkIGJlXG4gICAgICAvLyByZWR1Y2VkIGJ5IGBwZXJWaWV3YCBhbmQgYGZvY3VzQXRgIHNldHRpbmdzLiBSdW5uaW5nIGRpc3RhbmNlXG4gICAgICAvLyBzaG91bGQgZW5kIGJlZm9yZSBjcmVhdGluZyBhbiBlbXB0eSBzcGFjZSBhZnRlciBpbnN0YW5jZS5cblxuICAgICAgaWYgKEdsaWRlLmlzVHlwZSgnc2xpZGVyJykgJiYgc2V0dGluZ3MuZm9jdXNBdCAhPT0gJ2NlbnRlcicgJiYgc2V0dGluZ3MuYm91bmQpIHtcbiAgICAgICAgcmV0dXJuIGxlbmd0aCAtIDEgLSAodG9JbnQoc2V0dGluZ3MucGVyVmlldykgLSAxKSArIHRvSW50KHNldHRpbmdzLmZvY3VzQXQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbGVuZ3RoIC0gMTtcbiAgICB9XG4gIH0pO1xuXG4gIGRlZmluZShSdW4sICdvZmZzZXQnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBzdGF0dXMgb2YgdGhlIG9mZnNldHRpbmcgZmxhZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbztcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBSdW47XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGN1cnJlbnQgdGltZS5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIG5vdygpIHtcbiAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgd2hlbiBpbnZva2VkLCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkXG4gKiBhdCBtb3N0IG9uY2UgZHVyaW5nIGEgZ2l2ZW4gd2luZG93IG9mIHRpbWUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY1xuICogQHBhcmFtIHtOdW1iZXJ9IHdhaXRcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmVcbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgdGltZW91dCA9IHZvaWQgMCxcbiAgICAgIGNvbnRleHQgPSB2b2lkIDAsXG4gICAgICBhcmdzID0gdm9pZCAwLFxuICAgICAgcmVzdWx0ID0gdm9pZCAwO1xuICB2YXIgcHJldmlvdXMgPSAwO1xuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcblxuICB2YXIgbGF0ZXIgPSBmdW5jdGlvbiBsYXRlcigpIHtcbiAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogbm93KCk7XG4gICAgdGltZW91dCA9IG51bGw7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgfTtcblxuICB2YXIgdGhyb3R0bGVkID0gZnVuY3Rpb24gdGhyb3R0bGVkKCkge1xuICAgIHZhciBhdCA9IG5vdygpO1xuICAgIGlmICghcHJldmlvdXMgJiYgb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSkgcHJldmlvdXMgPSBhdDtcbiAgICB2YXIgcmVtYWluaW5nID0gd2FpdCAtIChhdCAtIHByZXZpb3VzKTtcbiAgICBjb250ZXh0ID0gdGhpcztcbiAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIGlmIChyZW1haW5pbmcgPD0gMCB8fCByZW1haW5pbmcgPiB3YWl0KSB7XG4gICAgICBpZiAodGltZW91dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgfVxuICAgICAgcHJldmlvdXMgPSBhdDtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKCF0aW1lb3V0ICYmIG9wdGlvbnMudHJhaWxpbmcgIT09IGZhbHNlKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICB0aHJvdHRsZWQuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICBwcmV2aW91cyA9IDA7XG4gICAgdGltZW91dCA9IGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgfTtcblxuICByZXR1cm4gdGhyb3R0bGVkO1xufVxuXG52YXIgTUFSR0lOX1RZUEUgPSB7XG4gIGx0cjogWydtYXJnaW5MZWZ0JywgJ21hcmdpblJpZ2h0J10sXG4gIHJ0bDogWydtYXJnaW5SaWdodCcsICdtYXJnaW5MZWZ0J11cbn07XG5cbmZ1bmN0aW9uIEdhcHMgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgdmFyIEdhcHMgPSB7XG4gICAgLyoqXG4gICAgICogQXBwbGllcyBnYXBzIGJldHdlZW4gc2xpZGVzLiBGaXJzdCBhbmQgbGFzdFxuICAgICAqIHNsaWRlcyBkbyBub3QgcmVjZWl2ZSBpdCdzIGVkZ2UgbWFyZ2lucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IHNsaWRlc1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYXBwbHk6IGZ1bmN0aW9uIGFwcGx5KHNsaWRlcykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNsaWRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgc3R5bGUgPSBzbGlkZXNbaV0uc3R5bGU7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBDb21wb25lbnRzLkRpcmVjdGlvbi52YWx1ZTtcblxuICAgICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICAgIHN0eWxlW01BUkdJTl9UWVBFW2RpcmVjdGlvbl1bMF1dID0gdGhpcy52YWx1ZSAvIDIgKyAncHgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0eWxlW01BUkdJTl9UWVBFW2RpcmVjdGlvbl1bMF1dID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSAhPT0gc2xpZGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzFdXSA9IHRoaXMudmFsdWUgLyAyICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzFdXSA9ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBnYXBzIGZyb20gdGhlIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IHNsaWRlc1xuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICovXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoc2xpZGVzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc2xpZGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IHNsaWRlc1tpXS5zdHlsZTtcblxuICAgICAgICBzdHlsZS5tYXJnaW5MZWZ0ID0gJyc7XG4gICAgICAgIHN0eWxlLm1hcmdpblJpZ2h0ID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShHYXBzLCAndmFsdWUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgZ2FwLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0b0ludChHbGlkZS5zZXR0aW5ncy5nYXApO1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKEdhcHMsICdncm93Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYWRkaXRpb25hbCBkaW1lbnRpb25zIHZhbHVlIGNhdXNlZCBieSBnYXBzLlxuICAgICAqIFVzZWQgdG8gaW5jcmVhc2Ugd2lkdGggb2YgdGhlIHNsaWRlcyB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBHYXBzLnZhbHVlICogKENvbXBvbmVudHMuU2l6ZXMubGVuZ3RoIC0gMSk7XG4gICAgfVxuICB9KTtcblxuICBkZWZpbmUoR2FwcywgJ3JlZHVjdG9yJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgcmVkdWN0aW9uIHZhbHVlIGNhdXNlZCBieSBnYXBzLlxuICAgICAqIFVzZWQgdG8gc3VidHJhY3Qgd2lkdGggb2YgdGhlIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgcGVyVmlldyA9IEdsaWRlLnNldHRpbmdzLnBlclZpZXc7XG5cbiAgICAgIHJldHVybiBHYXBzLnZhbHVlICogKHBlclZpZXcgLSAxKSAvIHBlclZpZXc7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogQXBwbHkgY2FsY3VsYXRlZCBnYXBzOlxuICAgKiAtIGFmdGVyIGJ1aWxkaW5nLCBzbyBzbGlkZXMgKGluY2x1ZGluZyBjbG9uZXMpIHdpbGwgcmVjZWl2ZSBwcm9wZXIgbWFyZ2luc1xuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEksIHRvIHJlY2FsY3VsYXRlIGdhcHMgd2l0aCBuZXcgb3B0aW9uc1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYWZ0ZXInLCAndXBkYXRlJ10sIHRocm90dGxlKGZ1bmN0aW9uICgpIHtcbiAgICBHYXBzLmFwcGx5KENvbXBvbmVudHMuSHRtbC53cmFwcGVyLmNoaWxkcmVuKTtcbiAgfSwgMzApKTtcblxuICAvKipcbiAgICogUmVtb3ZlIGdhcHM6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgIEdhcHMucmVtb3ZlKENvbXBvbmVudHMuSHRtbC53cmFwcGVyLmNoaWxkcmVuKTtcbiAgfSk7XG5cbiAgcmV0dXJuIEdhcHM7XG59XG5cbi8qKlxuICogRmluZHMgc2libGluZ3Mgbm9kZXMgb2YgdGhlIHBhc3NlZCBub2RlLlxuICpcbiAqIEBwYXJhbSAge0VsZW1lbnR9IG5vZGVcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5mdW5jdGlvbiBzaWJsaW5ncyhub2RlKSB7XG4gIGlmIChub2RlICYmIG5vZGUucGFyZW50Tm9kZSkge1xuICAgIHZhciBuID0gbm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGQ7XG4gICAgdmFyIG1hdGNoZWQgPSBbXTtcblxuICAgIGZvciAoOyBuOyBuID0gbi5uZXh0U2libGluZykge1xuICAgICAgaWYgKG4ubm9kZVR5cGUgPT09IDEgJiYgbiAhPT0gbm9kZSkge1xuICAgICAgICBtYXRjaGVkLnB1c2gobik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoZWQ7XG4gIH1cblxuICByZXR1cm4gW107XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHBhc3NlZCBub2RlIGV4aXN0IGFuZCBpcyBhIHZhbGlkIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gbm9kZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZXhpc3Qobm9kZSkge1xuICBpZiAobm9kZSAmJiBub2RlIGluc3RhbmNlb2Ygd2luZG93LkhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbnZhciBUUkFDS19TRUxFQ1RPUiA9ICdbZGF0YS1nbGlkZS1lbD1cInRyYWNrXCJdJztcblxuZnVuY3Rpb24gSHRtbCAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgdmFyIEh0bWwgPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXAgc2xpZGVyIEhUTUwgbm9kZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0dsaWRlfSBnbGlkZVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMucm9vdCA9IEdsaWRlLnNlbGVjdG9yO1xuICAgICAgdGhpcy50cmFjayA9IHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yKFRSQUNLX1NFTEVDVE9SKTtcbiAgICAgIHRoaXMuc2xpZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy53cmFwcGVyLmNoaWxkcmVuKS5maWx0ZXIoZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgIHJldHVybiAhc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuY2xvbmVTbGlkZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZGVmaW5lKEh0bWwsICdyb290Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgbm9kZSBvZiB0aGUgZ2xpZGUgbWFpbiBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIEh0bWwuX3I7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyBub2RlIG9mIHRoZSBnbGlkZSBtYWluIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQocikge1xuICAgICAgaWYgKGlzU3RyaW5nKHIpKSB7XG4gICAgICAgIHIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXhpc3QocikpIHtcbiAgICAgICAgSHRtbC5fciA9IHI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKCdSb290IGVsZW1lbnQgbXVzdCBiZSBhIGV4aXN0aW5nIEh0bWwgbm9kZScpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKEh0bWwsICd0cmFjaycsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIG5vZGUgb2YgdGhlIGdsaWRlIHRyYWNrIHdpdGggc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIEh0bWwuX3Q7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyBub2RlIG9mIHRoZSBnbGlkZSB0cmFjayB3aXRoIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh0KSB7XG4gICAgICBpZiAoZXhpc3QodCkpIHtcbiAgICAgICAgSHRtbC5fdCA9IHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKCdDb3VsZCBub3QgZmluZCB0cmFjayBlbGVtZW50LiBQbGVhc2UgdXNlICcgKyBUUkFDS19TRUxFQ1RPUiArICcgYXR0cmlidXRlLicpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKEh0bWwsICd3cmFwcGVyJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgbm9kZSBvZiB0aGUgc2xpZGVzIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gSHRtbC50cmFjay5jaGlsZHJlblswXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBIdG1sO1xufVxuXG5mdW5jdGlvbiBQZWVrIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIHZhciBQZWVrID0ge1xuICAgIC8qKlxuICAgICAqIFNldHVwcyBob3cgbXVjaCB0byBwZWVrIGJhc2VkIG9uIHNldHRpbmdzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudDogZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgICB0aGlzLnZhbHVlID0gR2xpZGUuc2V0dGluZ3MucGVlaztcbiAgICB9XG4gIH07XG5cbiAgZGVmaW5lKFBlZWssICd2YWx1ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBwZWVrLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcnxPYmplY3R9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gUGVlay5fdjtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBwZWVrLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUuYmVmb3JlID0gdG9JbnQodmFsdWUuYmVmb3JlKTtcbiAgICAgICAgdmFsdWUuYWZ0ZXIgPSB0b0ludCh2YWx1ZS5hZnRlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHRvSW50KHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgUGVlay5fdiA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKFBlZWssICdyZWR1Y3RvcicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHJlZHVjdGlvbiB2YWx1ZSBjYXVzZWQgYnkgcGVlay5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBQZWVrLnZhbHVlO1xuICAgICAgdmFyIHBlclZpZXcgPSBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3O1xuXG4gICAgICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5iZWZvcmUgLyBwZXJWaWV3ICsgdmFsdWUuYWZ0ZXIgLyBwZXJWaWV3O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWUgKiAyIC8gcGVyVmlldztcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZWNhbGN1bGF0ZSBwZWVraW5nIHNpemVzIG9uOlxuICAgKiAtIHdoZW4gcmVzaXppbmcgd2luZG93IHRvIHVwZGF0ZSB0byBwcm9wZXIgcGVyY2VudHNcbiAgICovXG4gIEV2ZW50cy5vbihbJ3Jlc2l6ZScsICd1cGRhdGUnXSwgZnVuY3Rpb24gKCkge1xuICAgIFBlZWsubW91bnQoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIFBlZWs7XG59XG5cbmZ1bmN0aW9uIE1vdmUgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgdmFyIE1vdmUgPSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBtb3ZlIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMuX28gPSAwO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgYSBtb3ZlbWVudCB2YWx1ZSBiYXNlZCBvbiBwYXNzZWQgb2Zmc2V0IGFuZCBjdXJyZW50bHkgYWN0aXZlIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBvZmZzZXRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1ha2U6IGZ1bmN0aW9uIG1ha2UoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAwO1xuXG4gICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcblxuICAgICAgRXZlbnRzLmVtaXQoJ21vdmUnLCB7XG4gICAgICAgIG1vdmVtZW50OiB0aGlzLnZhbHVlXG4gICAgICB9KTtcblxuICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmFmdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgRXZlbnRzLmVtaXQoJ21vdmUuYWZ0ZXInLCB7XG4gICAgICAgICAgbW92ZW1lbnQ6IF90aGlzLnZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShNb3ZlLCAnb2Zmc2V0Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYW4gb2Zmc2V0IHZhbHVlIHVzZWQgdG8gbW9kaWZ5IGN1cnJlbnQgdHJhbnNsYXRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIE1vdmUuX287XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhbiBvZmZzZXQgdmFsdWUgdXNlZCB0byBtb2RpZnkgY3VycmVudCB0cmFuc2xhdGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIE1vdmUuX28gPSAhaXNVbmRlZmluZWQodmFsdWUpID8gdG9JbnQodmFsdWUpIDogMDtcbiAgICB9XG4gIH0pO1xuXG4gIGRlZmluZShNb3ZlLCAndHJhbnNsYXRlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYSByYXcgbW92ZW1lbnQgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICogR2xpZGUuaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBkZWZpbmUoTW92ZSwgJ3ZhbHVlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYW4gYWN0dWFsIG1vdmVtZW50IHZhbHVlIGNvcnJlY3RlZCBieSBvZmZzZXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICB2YXIgdHJhbnNsYXRlID0gdGhpcy50cmFuc2xhdGU7XG5cbiAgICAgIGlmIChDb21wb25lbnRzLkRpcmVjdGlvbi5pcygncnRsJykpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZSArIG9mZnNldDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtIG9mZnNldDtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBNYWtlIG1vdmVtZW50IHRvIHByb3BlciBzbGlkZSBvbjpcbiAgICogLSBiZWZvcmUgYnVpbGQsIHNvIGdsaWRlIHdpbGwgc3RhcnQgYXQgYHN0YXJ0QXRgIGluZGV4XG4gICAqIC0gb24gZWFjaCBzdGFuZGFyZCBydW4gdG8gbW92ZSB0byBuZXdseSBjYWxjdWxhdGVkIGluZGV4XG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAncnVuJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBNb3ZlLm1ha2UoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIE1vdmU7XG59XG5cbmZ1bmN0aW9uIFNpemVzIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIHZhciBTaXplcyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cHMgZGltZW50aW9ucyBvZiBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldHVwU2xpZGVzOiBmdW5jdGlvbiBzZXR1cFNsaWRlcygpIHtcbiAgICAgIHZhciB3aWR0aCA9IHRoaXMuc2xpZGVXaWR0aCArICdweCc7XG4gICAgICB2YXIgc2xpZGVzID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlcztcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2xpZGVzW2ldLnN0eWxlLndpZHRoID0gd2lkdGg7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0dXBzIGRpbWVudGlvbnMgb2Ygc2xpZGVzIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldHVwV3JhcHBlcjogZnVuY3Rpb24gc2V0dXBXcmFwcGVyKGRpbWVudGlvbikge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUud2lkdGggPSB0aGlzLndyYXBwZXJTaXplICsgJ3B4JztcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFwcGxpZWQgc3R5bGVzIGZyb20gSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgdmFyIHNsaWRlcyA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXM7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNsaWRlc1tpXS5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgfVxuXG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS53aWR0aCA9ICcnO1xuICAgIH1cbiAgfTtcblxuICBkZWZpbmUoU2l6ZXMsICdsZW5ndGgnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBjb3VudCBudW1iZXIgb2YgdGhlIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBDb21wb25lbnRzLkh0bWwuc2xpZGVzLmxlbmd0aDtcbiAgICB9XG4gIH0pO1xuXG4gIGRlZmluZShTaXplcywgJ3dpZHRoJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgd2lkdGggdmFsdWUgb2YgdGhlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIENvbXBvbmVudHMuSHRtbC5yb290Lm9mZnNldFdpZHRoO1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKFNpemVzLCAnd3JhcHBlclNpemUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBzaXplIG9mIHRoZSBzbGlkZXMgd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBTaXplcy5zbGlkZVdpZHRoICogU2l6ZXMubGVuZ3RoICsgQ29tcG9uZW50cy5HYXBzLmdyb3cgKyBDb21wb25lbnRzLkNsb25lcy5ncm93O1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKFNpemVzLCAnc2xpZGVXaWR0aCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHdpZHRoIHZhbHVlIG9mIHRoZSBzaW5nbGUgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gU2l6ZXMud2lkdGggLyBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3IC0gQ29tcG9uZW50cy5QZWVrLnJlZHVjdG9yIC0gQ29tcG9uZW50cy5HYXBzLnJlZHVjdG9yO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIEFwcGx5IGNhbGN1bGF0ZWQgZ2xpZGUncyBkaW1lbnNpb25zOlxuICAgKiAtIGJlZm9yZSBidWlsZGluZywgc28gb3RoZXIgZGltZW50aW9ucyAoZS5nLiB0cmFuc2xhdGUpIHdpbGwgYmUgY2FsY3VsYXRlZCBwcm9wZXJ0bHlcbiAgICogLSB3aGVuIHJlc2l6aW5nIHdpbmRvdyB0byByZWNhbGN1bGF0ZSBzaWxkZXMgZGltZW5zaW9uc1xuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEksIHRvIGNhbGN1bGF0ZSBkaW1lbnNpb25zIGJhc2VkIG9uIG5ldyBvcHRpb25zXG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAncmVzaXplJywgJ3VwZGF0ZSddLCBmdW5jdGlvbiAoKSB7XG4gICAgU2l6ZXMuc2V0dXBTbGlkZXMoKTtcbiAgICBTaXplcy5zZXR1cFdyYXBwZXIoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjYWxjdWxhdGVkIGdsaWRlJ3MgZGltZW5zaW9uczpcbiAgICogLSBvbiBkZXN0b3RpbmcgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0YWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBTaXplcy5yZW1vdmUoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIFNpemVzO1xufVxuXG5mdW5jdGlvbiBCdWlsZCAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICB2YXIgQnVpbGQgPSB7XG4gICAgLyoqXG4gICAgICogSW5pdCBnbGlkZSBidWlsZGluZy4gQWRkcyBjbGFzc2VzLCBzZXRzXG4gICAgICogZGltZW5zaW9ucyBhbmQgc2V0dXBzIGluaXRpYWwgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIEV2ZW50cy5lbWl0KCdidWlsZC5iZWZvcmUnKTtcblxuICAgICAgdGhpcy50eXBlQ2xhc3MoKTtcbiAgICAgIHRoaXMuYWN0aXZlQ2xhc3MoKTtcblxuICAgICAgRXZlbnRzLmVtaXQoJ2J1aWxkLmFmdGVyJyk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQWRkcyBgdHlwZWAgY2xhc3MgdG8gdGhlIGdsaWRlIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHR5cGVDbGFzczogZnVuY3Rpb24gdHlwZUNsYXNzKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LmFkZChHbGlkZS5zZXR0aW5ncy5jbGFzc2VzW0dsaWRlLnNldHRpbmdzLnR5cGVdKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhY3RpdmVDbGFzczogZnVuY3Rpb24gYWN0aXZlQ2xhc3MoKSB7XG4gICAgICB2YXIgY2xhc3NlcyA9IEdsaWRlLnNldHRpbmdzLmNsYXNzZXM7XG4gICAgICB2YXIgc2xpZGUgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzW0dsaWRlLmluZGV4XTtcblxuICAgICAgaWYgKHNsaWRlKSB7XG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5hY3RpdmVTbGlkZSk7XG5cbiAgICAgICAgc2libGluZ3Moc2xpZGUpLmZvckVhY2goZnVuY3Rpb24gKHNpYmxpbmcpIHtcbiAgICAgICAgICBzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlcy5hY3RpdmVTbGlkZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgSFRNTCBjbGFzc2VzIGFwcGxpZWQgYXQgYnVpbGRpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzZXM6IGZ1bmN0aW9uIHJlbW92ZUNsYXNzZXMoKSB7XG4gICAgICB2YXIgY2xhc3NlcyA9IEdsaWRlLnNldHRpbmdzLmNsYXNzZXM7XG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlc1tHbGlkZS5zZXR0aW5ncy50eXBlXSk7XG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC5zbGlkZXMuZm9yRWFjaChmdW5jdGlvbiAoc2libGluZykge1xuICAgICAgICBzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlcy5hY3RpdmVTbGlkZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsZWFyIGJ1aWxkaW5nIGNsYXNzZXM6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byBicmluZyBIVE1MIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVtb3ZlIGNsYXNzZXMgYmVmb3JlIHJlbW91bnRpbmcgY29tcG9uZW50XG4gICAqL1xuICBFdmVudHMub24oWydkZXN0cm95JywgJ3VwZGF0ZSddLCBmdW5jdGlvbiAoKSB7XG4gICAgQnVpbGQucmVtb3ZlQ2xhc3NlcygpO1xuICB9KTtcblxuICAvKipcbiAgICogUmVtb3VudCBjb21wb25lbnQ6XG4gICAqIC0gb24gcmVzaXppbmcgb2YgdGhlIHdpbmRvdyB0byBjYWxjdWxhdGUgbmV3IGRpbWVudGlvbnNcbiAgICogLSBvbiB1cGRhdGluZyBzZXR0aW5ncyB2aWEgQVBJXG4gICAqL1xuICBFdmVudHMub24oWydyZXNpemUnLCAndXBkYXRlJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBCdWlsZC5tb3VudCgpO1xuICB9KTtcblxuICAvKipcbiAgICogU3dhcCBhY3RpdmUgY2xhc3Mgb2YgY3VycmVudCBzbGlkZTpcbiAgICogLSBhZnRlciBlYWNoIG1vdmUgdG8gdGhlIG5ldyBpbmRleFxuICAgKi9cbiAgRXZlbnRzLm9uKCdtb3ZlLmFmdGVyJywgZnVuY3Rpb24gKCkge1xuICAgIEJ1aWxkLmFjdGl2ZUNsYXNzKCk7XG4gIH0pO1xuXG4gIHJldHVybiBCdWlsZDtcbn1cblxuZnVuY3Rpb24gQ2xvbmVzIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIHZhciBDbG9uZXMgPSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHBhdHRlcm4gbWFwIGFuZCBjb2xsZWN0IHNsaWRlcyB0byBiZSBjbG9uZWQuXG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuXG4gICAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmNvbGxlY3QoKTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0IGNsb25lcyB3aXRoIHBhdHRlcm4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGNvbGxlY3Q6IGZ1bmN0aW9uIGNvbGxlY3QoKSB7XG4gICAgICB2YXIgaXRlbXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgICAgdmFyIHNsaWRlcyA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXM7XG4gICAgICB2YXIgX0dsaWRlJHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3MsXG4gICAgICAgICAgcGVyVmlldyA9IF9HbGlkZSRzZXR0aW5ncy5wZXJWaWV3LFxuICAgICAgICAgIGNsYXNzZXMgPSBfR2xpZGUkc2V0dGluZ3MuY2xhc3NlcztcblxuXG4gICAgICB2YXIgcGVla0luY3JlbWVudGVyID0gKyEhR2xpZGUuc2V0dGluZ3MucGVlaztcbiAgICAgIHZhciBwYXJ0ID0gcGVyVmlldyArIHBlZWtJbmNyZW1lbnRlcjtcbiAgICAgIHZhciBzdGFydCA9IHNsaWRlcy5zbGljZSgwLCBwYXJ0KTtcbiAgICAgIHZhciBlbmQgPSBzbGlkZXMuc2xpY2UoLXBhcnQpO1xuXG4gICAgICBmb3IgKHZhciByID0gMDsgciA8IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocGVyVmlldyAvIHNsaWRlcy5sZW5ndGgpKTsgcisrKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgY2xvbmUgPSBzdGFydFtpXS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAgICAgICBjbG9uZS5jbGFzc0xpc3QuYWRkKGNsYXNzZXMuY2xvbmVTbGlkZSk7XG5cbiAgICAgICAgICBpdGVtcy5wdXNoKGNsb25lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBlbmQubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgdmFyIF9jbG9uZSA9IGVuZFtfaV0uY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICAgICAgX2Nsb25lLmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5jbG9uZVNsaWRlKTtcblxuICAgICAgICAgIGl0ZW1zLnVuc2hpZnQoX2Nsb25lKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQXBwZW5kIGNsb25lZCBzbGlkZXMgd2l0aCBnZW5lcmF0ZWQgcGF0dGVybi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYXBwZW5kOiBmdW5jdGlvbiBhcHBlbmQoKSB7XG4gICAgICB2YXIgaXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgICAgdmFyIF9Db21wb25lbnRzJEh0bWwgPSBDb21wb25lbnRzLkh0bWwsXG4gICAgICAgICAgd3JhcHBlciA9IF9Db21wb25lbnRzJEh0bWwud3JhcHBlcixcbiAgICAgICAgICBzbGlkZXMgPSBfQ29tcG9uZW50cyRIdG1sLnNsaWRlcztcblxuXG4gICAgICB2YXIgaGFsZiA9IE1hdGguZmxvb3IoaXRlbXMubGVuZ3RoIC8gMik7XG4gICAgICB2YXIgcHJlcGVuZCA9IGl0ZW1zLnNsaWNlKDAsIGhhbGYpLnJldmVyc2UoKTtcbiAgICAgIHZhciBhcHBlbmQgPSBpdGVtcy5zbGljZShoYWxmLCBpdGVtcy5sZW5ndGgpO1xuICAgICAgdmFyIHdpZHRoID0gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICsgJ3B4JztcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcHBlbmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChhcHBlbmRbaV0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBwcmVwZW5kLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgICAgd3JhcHBlci5pbnNlcnRCZWZvcmUocHJlcGVuZFtfaTJdLCBzbGlkZXNbMF0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCBpdGVtcy5sZW5ndGg7IF9pMysrKSB7XG4gICAgICAgIGl0ZW1zW19pM10uc3R5bGUud2lkdGggPSB3aWR0aDtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGNsb25lZCBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgdmFyIGl0ZW1zID0gdGhpcy5pdGVtcztcblxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnJlbW92ZUNoaWxkKGl0ZW1zW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZGVmaW5lKENsb25lcywgJ2dyb3cnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBhZGRpdGlvbmFsIGRpbWVudGlvbnMgdmFsdWUgY2F1c2VkIGJ5IGNsb25lcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiAoQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICsgQ29tcG9uZW50cy5HYXBzLnZhbHVlKSAqIENsb25lcy5pdGVtcy5sZW5ndGg7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogQXBwZW5kIGFkZGl0aW9uYWwgc2xpZGUncyBjbG9uZXM6XG4gICAqIC0gd2hpbGUgZ2xpZGUncyB0eXBlIGlzIGBjYXJvdXNlbGBcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIENsb25lcy5yZW1vdmUoKTtcbiAgICBDbG9uZXMubW91bnQoKTtcbiAgICBDbG9uZXMuYXBwZW5kKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBBcHBlbmQgYWRkaXRpb25hbCBzbGlkZSdzIGNsb25lczpcbiAgICogLSB3aGlsZSBnbGlkZSdzIHR5cGUgaXMgYGNhcm91c2VsYFxuICAgKi9cbiAgRXZlbnRzLm9uKCdidWlsZC5iZWZvcmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgQ2xvbmVzLmFwcGVuZCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjbG9uZXMgSFRNTEVsZW1lbnRzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGJyaW5nIEhUTUwgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBDbG9uZXMucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIHJldHVybiBDbG9uZXM7XG59XG5cbnZhciBFdmVudHNCaW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBFdmVudHNCaW5kZXIgaW5zdGFuY2UuXG4gICAqL1xuICBmdW5jdGlvbiBFdmVudHNCaW5kZXIoKSB7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnRzQmluZGVyKTtcblxuICAgIHRoaXMubGlzdGVuZXJzID0gbGlzdGVuZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnRzIGxpc3RlbmVycyB0byBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfEFycmF5fSBldmVudHNcbiAgICogQHBhcmFtICB7RWxlbWVudHxXaW5kb3d8RG9jdW1lbnR9IGVsXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjbG9zdXJlXG4gICAqIEBwYXJhbSAge0Jvb2xlYW58T2JqZWN0fSBjYXB0dXJlXG4gICAqIEByZXR1cm4ge1ZvaWR9XG4gICAqL1xuXG5cbiAgY3JlYXRlQ2xhc3MoRXZlbnRzQmluZGVyLCBbe1xuICAgIGtleTogJ29uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24oZXZlbnRzLCBlbCwgY2xvc3VyZSkge1xuICAgICAgdmFyIGNhcHR1cmUgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IGZhbHNlO1xuXG4gICAgICBpZiAoaXNTdHJpbmcoZXZlbnRzKSkge1xuICAgICAgICBldmVudHMgPSBbZXZlbnRzXTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRzW2ldXSA9IGNsb3N1cmU7XG5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudHNbaV0sIHRoaXMubGlzdGVuZXJzW2V2ZW50c1tpXV0sIGNhcHR1cmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzIGZyb20gYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd8QXJyYXl9IGV2ZW50c1xuICAgICAqIEBwYXJhbSAge0VsZW1lbnR8V2luZG93fERvY3VtZW50fSBlbFxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW58T2JqZWN0fSBjYXB0dXJlXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb2ZmJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb2ZmKGV2ZW50cywgZWwpIHtcbiAgICAgIHZhciBjYXB0dXJlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblxuICAgICAgaWYgKGlzU3RyaW5nKGV2ZW50cykpIHtcbiAgICAgICAgZXZlbnRzID0gW2V2ZW50c107XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzW2ldLCB0aGlzLmxpc3RlbmVyc1tldmVudHNbaV1dLCBjYXB0dXJlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95IGNvbGxlY3RlZCBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICBkZWxldGUgdGhpcy5saXN0ZW5lcnM7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBFdmVudHNCaW5kZXI7XG59KCk7XG5cbmZ1bmN0aW9uIFJlc2l6ZSAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIHZhciBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKCk7XG5cbiAgdmFyIFJlc2l6ZSA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB3aW5kb3cgYmluZGluZ3MuXG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy5iaW5kKCk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgYHJlenNpemVgIGxpc3RlbmVyIHRvIHRoZSB3aW5kb3cuXG4gICAgICogSXQncyBhIGNvc3RseSBldmVudCwgc28gd2UgYXJlIGRlYm91bmNpbmcgaXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICBCaW5kZXIub24oJ3Jlc2l6ZScsIHdpbmRvdywgdGhyb3R0bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICBFdmVudHMuZW1pdCgncmVzaXplJyk7XG4gICAgICB9LCBHbGlkZS5zZXR0aW5ncy50aHJvdHRsZSkpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgbGlzdGVuZXJzIGZyb20gdGhlIHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICBCaW5kZXIub2ZmKCdyZXNpemUnLCB3aW5kb3cpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGZyb20gd2luZG93OlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIHJlbW92ZSBhZGRlZCBFdmVudExpc3RlbmVyXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgUmVzaXplLnVuYmluZCgpO1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBSZXNpemU7XG59XG5cbnZhciBWQUxJRF9ESVJFQ1RJT05TID0gWydsdHInLCAncnRsJ107XG52YXIgRkxJUEVEX01PVkVNRU5UUyA9IHtcbiAgJz4nOiAnPCcsXG4gICc8JzogJz4nLFxuICAnPSc6ICc9J1xufTtcblxuZnVuY3Rpb24gRGlyZWN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIHZhciBEaXJlY3Rpb24gPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXBzIGdhcCB2YWx1ZSBiYXNlZCBvbiBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy52YWx1ZSA9IEdsaWRlLnNldHRpbmdzLmRpcmVjdGlvbjtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlcyBwYXR0ZXJuIGJhc2VkIG9uIGRpcmVjdGlvbiB2YWx1ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdHRlcm5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUocGF0dGVybikge1xuICAgICAgdmFyIHRva2VuID0gcGF0dGVybi5zbGljZSgwLCAxKTtcblxuICAgICAgaWYgKHRoaXMuaXMoJ3J0bCcpKSB7XG4gICAgICAgIHJldHVybiBwYXR0ZXJuLnNwbGl0KHRva2VuKS5qb2luKEZMSVBFRF9NT1ZFTUVOVFNbdG9rZW5dKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhdHRlcm47XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHZhbHVlIG9mIGRpcmVjdGlvbiBtb2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRpcmVjdGlvblxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzOiBmdW5jdGlvbiBpcyhkaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlID09PSBkaXJlY3Rpb247XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBkaXJlY3Rpb24gY2xhc3MgdG8gdGhlIHJvb3QgSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhZGRDbGFzczogZnVuY3Rpb24gYWRkQ2xhc3MoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QuYWRkKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uW3RoaXMudmFsdWVdKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGRpcmVjdGlvbiBjbGFzcyBmcm9tIHRoZSByb290IEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LnJlbW92ZShHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLmRpcmVjdGlvblt0aGlzLnZhbHVlXSk7XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShEaXJlY3Rpb24sICd2YWx1ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBkaXJlY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIERpcmVjdGlvbi5fdjtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBkaXJlY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICBpZiAoVkFMSURfRElSRUNUSU9OUy5pbmRleE9mKHZhbHVlKSA+IC0xKSB7XG4gICAgICAgIERpcmVjdGlvbi5fdiA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybignRGlyZWN0aW9uIHZhbHVlIG11c3QgYmUgYGx0cmAgb3IgYHJ0bGAnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBDbGVhciBkaXJlY3Rpb24gY2xhc3M6XG4gICAqIC0gb24gZGVzdHJveSB0byBicmluZyBIVE1MIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqIC0gb24gdXBkYXRlIHRvIHJlbW92ZSBjbGFzcyBiZWZvcmUgcmVhcHBsaW5nIGJlbGxvd1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgZnVuY3Rpb24gKCkge1xuICAgIERpcmVjdGlvbi5yZW1vdmVDbGFzcygpO1xuICB9KTtcblxuICAvKipcbiAgICogUmVtb3VudCBjb21wb25lbnQ6XG4gICAqIC0gb24gdXBkYXRlIHRvIHJlZmxlY3QgY2hhbmdlcyBpbiBkaXJlY3Rpb24gdmFsdWVcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIERpcmVjdGlvbi5tb3VudCgpO1xuICB9KTtcblxuICAvKipcbiAgICogQXBwbHkgZGlyZWN0aW9uIGNsYXNzOlxuICAgKiAtIGJlZm9yZSBidWlsZGluZyB0byBhcHBseSBjbGFzcyBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICogLSBvbiB1cGRhdGluZyB0byByZWFwcGx5IGRpcmVjdGlvbiBjbGFzcyB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAndXBkYXRlJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBEaXJlY3Rpb24uYWRkQ2xhc3MoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIERpcmVjdGlvbjtcbn1cblxuLyoqXG4gKiBSZWZsZWN0cyB2YWx1ZSBvZiBnbGlkZSBtb3ZlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gUnRsIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE5lZ2F0ZXMgdGhlIHBhc3NlZCB0cmFuc2xhdGUgaWYgZ2xpZGUgaXMgaW4gUlRMIG9wdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeTogZnVuY3Rpb24gbW9kaWZ5KHRyYW5zbGF0ZSkge1xuICAgICAgaWYgKENvbXBvbmVudHMuRGlyZWN0aW9uLmlzKCdydGwnKSkge1xuICAgICAgICByZXR1cm4gLXRyYW5zbGF0ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIGEgYGdhcGAgc2V0dGluZ3MuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIEdhcCAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBNb2RpZmllcyBwYXNzZWQgdHJhbnNsYXRlIHZhbHVlIHdpdGggbnVtYmVyIGluIHRoZSBgZ2FwYCBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeTogZnVuY3Rpb24gbW9kaWZ5KHRyYW5zbGF0ZSkge1xuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSArIENvbXBvbmVudHMuR2Fwcy52YWx1ZSAqIEdsaWRlLmluZGV4O1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIGdsaWRlIG1vdmVtZW50IHdpdGggd2lkdGggb2YgYWRkaXRpb25hbCBjbG9uZXMgd2lkdGguXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIEdyb3cgKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogQWRkcyB0byB0aGUgcGFzc2VkIHRyYW5zbGF0ZSB3aWR0aCBvZiB0aGUgaGFsZiBvZiBjbG9uZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnk6IGZ1bmN0aW9uIG1vZGlmeSh0cmFuc2xhdGUpIHtcbiAgICAgIHJldHVybiB0cmFuc2xhdGUgKyBDb21wb25lbnRzLkNsb25lcy5ncm93IC8gMjtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIGEgYHBlZWtgIHNldHRpbmdzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBQZWVraW5nIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE1vZGlmaWVzIHBhc3NlZCB0cmFuc2xhdGUgdmFsdWUgd2l0aCBhIGBwZWVrYCBzZXR0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbW9kaWZ5OiBmdW5jdGlvbiBtb2RpZnkodHJhbnNsYXRlKSB7XG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3MuZm9jdXNBdCA+PSAwKSB7XG4gICAgICAgIHZhciBwZWVrID0gQ29tcG9uZW50cy5QZWVrLnZhbHVlO1xuXG4gICAgICAgIGlmIChpc09iamVjdChwZWVrKSkge1xuICAgICAgICAgIHJldHVybiB0cmFuc2xhdGUgLSBwZWVrLmJlZm9yZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cmFuc2xhdGUgLSBwZWVrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhbnNsYXRlO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIGdsaWRlIG1vdmVtZW50IHdpdGggYSBgZm9jdXNBdGAgc2V0dGluZ3MuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIEZvY3VzaW5nIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE1vZGlmaWVzIHBhc3NlZCB0cmFuc2xhdGUgdmFsdWUgd2l0aCBpbmRleCBpbiB0aGUgYGZvY3VzQXRgIHNldHRpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnk6IGZ1bmN0aW9uIG1vZGlmeSh0cmFuc2xhdGUpIHtcbiAgICAgIHZhciBnYXAgPSBDb21wb25lbnRzLkdhcHMudmFsdWU7XG4gICAgICB2YXIgd2lkdGggPSBDb21wb25lbnRzLlNpemVzLndpZHRoO1xuICAgICAgdmFyIGZvY3VzQXQgPSBHbGlkZS5zZXR0aW5ncy5mb2N1c0F0O1xuICAgICAgdmFyIHNsaWRlV2lkdGggPSBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGg7XG5cbiAgICAgIGlmIChmb2N1c0F0ID09PSAnY2VudGVyJykge1xuICAgICAgICByZXR1cm4gdHJhbnNsYXRlIC0gKHdpZHRoIC8gMiAtIHNsaWRlV2lkdGggLyAyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtIHNsaWRlV2lkdGggKiBmb2N1c0F0IC0gZ2FwICogZm9jdXNBdDtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogQXBwbGllcyBkaWZmcmVudCB0cmFuc2Zvcm1lcnMgb24gdHJhbnNsYXRlIHZhbHVlLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBtdXRhdG9yIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBNZXJnZSBpbnN0YW5jZSB0cmFuc2Zvcm1lcnMgd2l0aCBjb2xsZWN0aW9uIG9mIGRlZmF1bHQgdHJhbnNmb3JtZXJzLlxuICAgKiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZSBSdGwgY29tcG9uZW50IGJlIGxhc3Qgb24gdGhlIGxpc3QsXG4gICAqIHNvIGl0IHJlZmxlY3RzIGFsbCBwcmV2aW91cyB0cmFuc2Zvcm1hdGlvbnMuXG4gICAqXG4gICAqIEB0eXBlIHtBcnJheX1cbiAgICovXG4gIHZhciBUUkFOU0ZPUk1FUlMgPSBbR2FwLCBHcm93LCBQZWVraW5nLCBGb2N1c2luZ10uY29uY2F0KEdsaWRlLl90LCBbUnRsXSk7XG5cbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBQaXBsaW5lcyB0cmFuc2xhdGUgdmFsdWUgd2l0aCByZWdpc3RlcmVkIHRyYW5zZm9ybWVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG11dGF0ZTogZnVuY3Rpb24gbXV0YXRlKHRyYW5zbGF0ZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBUUkFOU0ZPUk1FUlMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRyYW5zZm9ybWVyID0gVFJBTlNGT1JNRVJTW2ldO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRyYW5zZm9ybWVyKSAmJiBpc0Z1bmN0aW9uKHRyYW5zZm9ybWVyKCkubW9kaWZ5KSkge1xuICAgICAgICAgIHRyYW5zbGF0ZSA9IHRyYW5zZm9ybWVyKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpLm1vZGlmeSh0cmFuc2xhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdhcm4oJ1RyYW5zZm9ybWVyIHNob3VsZCBiZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBgbW9kaWZ5KClgIG1ldGhvZCcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGU7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBUcmFuc2xhdGUgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgdmFyIFRyYW5zbGF0ZSA9IHtcbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRyYW5zbGF0ZSBvbiBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICB2YXIgdHJhbnNmb3JtID0gbXV0YXRvcihHbGlkZSwgQ29tcG9uZW50cykubXV0YXRlKHZhbHVlKTtcblxuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyAtMSAqIHRyYW5zZm9ybSArICdweCwgMHB4LCAwcHgpJztcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHZhbHVlIG9mIHRyYW5zbGF0ZSBmcm9tIEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgdHJhbnNsYXRlIHZhbHVlOlxuICAgKiAtIG9uIG1vdmUgdG8gcmVmbGVjdCBpbmRleCBjaGFuZ2VcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJIHRvIHJlZmxlY3QgcG9zc2libGUgY2hhbmdlcyBpbiBvcHRpb25zXG4gICAqL1xuICBFdmVudHMub24oJ21vdmUnLCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHZhciBnYXAgPSBDb21wb25lbnRzLkdhcHMudmFsdWU7XG4gICAgdmFyIGxlbmd0aCA9IENvbXBvbmVudHMuU2l6ZXMubGVuZ3RoO1xuICAgIHZhciB3aWR0aCA9IENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aDtcblxuICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykgJiYgQ29tcG9uZW50cy5SdW4uaXNPZmZzZXQoJzwnKSkge1xuICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmFmdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgRXZlbnRzLmVtaXQoJ3RyYW5zbGF0ZS5qdW1wJyk7XG5cbiAgICAgICAgVHJhbnNsYXRlLnNldCh3aWR0aCAqIChsZW5ndGggLSAxKSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIFRyYW5zbGF0ZS5zZXQoLXdpZHRoIC0gZ2FwICogbGVuZ3RoKTtcbiAgICB9XG5cbiAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpICYmIENvbXBvbmVudHMuUnVuLmlzT2Zmc2V0KCc+JykpIHtcbiAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIEV2ZW50cy5lbWl0KCd0cmFuc2xhdGUuanVtcCcpO1xuXG4gICAgICAgIFRyYW5zbGF0ZS5zZXQoMCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIFRyYW5zbGF0ZS5zZXQod2lkdGggKiBsZW5ndGggKyBnYXAgKiBsZW5ndGgpO1xuICAgIH1cblxuICAgIHJldHVybiBUcmFuc2xhdGUuc2V0KGNvbnRleHQubW92ZW1lbnQpO1xuICB9KTtcblxuICAvKipcbiAgICogUmVtb3ZlIHRyYW5zbGF0ZTpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgVHJhbnNsYXRlLnJlbW92ZSgpO1xuICB9KTtcblxuICByZXR1cm4gVHJhbnNsYXRlO1xufVxuXG5mdW5jdGlvbiBUcmFuc2l0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBIb2xkcyBpbmFjdGl2aXR5IHN0YXR1cyBvZiB0cmFuc2l0aW9uLlxuICAgKiBXaGVuIHRydWUgdHJhbnNpdGlvbiBpcyBub3QgYXBwbGllZC5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICB2YXIgZGlzYWJsZWQgPSBmYWxzZTtcblxuICB2YXIgVHJhbnNpdGlvbiA9IHtcbiAgICAvKipcbiAgICAgKiBDb21wb3NlcyBzdHJpbmcgb2YgdGhlIENTUyB0cmFuc2l0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGNvbXBvc2U6IGZ1bmN0aW9uIGNvbXBvc2UocHJvcGVydHkpIHtcbiAgICAgIHZhciBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzO1xuXG4gICAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0eSArICcgJyArIHRoaXMuZHVyYXRpb24gKyAnbXMgJyArIHNldHRpbmdzLmFuaW1hdGlvblRpbWluZ0Z1bmM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9wZXJ0eSArICcgMG1zICcgKyBzZXR0aW5ncy5hbmltYXRpb25UaW1pbmdGdW5jO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgb2YgdHJhbnNpdGlvbiBvbiBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZz19IHByb3BlcnR5XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCgpIHtcbiAgICAgIHZhciBwcm9wZXJ0eSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJ3RyYW5zZm9ybSc7XG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSB0aGlzLmNvbXBvc2UocHJvcGVydHkpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdmFsdWUgb2YgdHJhbnNpdGlvbiBmcm9tIEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gJyc7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUnVucyBjYWxsYmFjayBhZnRlciBhbmltYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFmdGVyOiBmdW5jdGlvbiBhZnRlcihjYWxsYmFjaykge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9LCB0aGlzLmR1cmF0aW9uKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBFbmFibGUgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnNldCgpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIERpc2FibGUgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZGlzYWJsZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgIGRpc2FibGVkID0gdHJ1ZTtcblxuICAgICAgdGhpcy5zZXQoKTtcbiAgICB9XG4gIH07XG5cbiAgZGVmaW5lKFRyYW5zaXRpb24sICdkdXJhdGlvbicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGR1cmF0aW9uIG9mIHRoZSB0cmFuc2l0aW9uIGJhc2VkXG4gICAgICogb24gY3VycmVudGx5IHJ1bm5pbmcgYW5pbWF0aW9uIHR5cGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5ncztcblxuICAgICAgaWYgKEdsaWRlLmlzVHlwZSgnc2xpZGVyJykgJiYgQ29tcG9uZW50cy5SdW4ub2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBzZXR0aW5ncy5yZXdpbmREdXJhdGlvbjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNldHRpbmdzLmFuaW1hdGlvbkR1cmF0aW9uO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIFNldCB0cmFuc2l0aW9uIGBzdHlsZWAgdmFsdWU6XG4gICAqIC0gb24gZWFjaCBtb3ZpbmcsIGJlY2F1c2UgaXQgbWF5IGJlIGNsZWFyZWQgYnkgb2Zmc2V0IG1vdmVcbiAgICovXG4gIEV2ZW50cy5vbignbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBUcmFuc2l0aW9uLnNldCgpO1xuICB9KTtcblxuICAvKipcbiAgICogRGlzYWJsZSB0cmFuc2l0aW9uOlxuICAgKiAtIGJlZm9yZSBpbml0aWFsIGJ1aWxkIHRvIGF2b2lkIHRyYW5zaXRpb25pbmcgZnJvbSBgMGAgdG8gYHN0YXJ0QXRgIGluZGV4XG4gICAqIC0gd2hpbGUgcmVzaXppbmcgd2luZG93IGFuZCByZWNhbGN1bGF0aW5nIGRpbWVudGlvbnNcbiAgICogLSBvbiBqdW1waW5nIGZyb20gb2Zmc2V0IHRyYW5zaXRpb24gYXQgc3RhcnQgYW5kIGVuZCBlZGdlcyBpbiBgY2Fyb3VzZWxgIHR5cGVcbiAgICovXG4gIEV2ZW50cy5vbihbJ2J1aWxkLmJlZm9yZScsICdyZXNpemUnLCAndHJhbnNsYXRlLmp1bXAnXSwgZnVuY3Rpb24gKCkge1xuICAgIFRyYW5zaXRpb24uZGlzYWJsZSgpO1xuICB9KTtcblxuICAvKipcbiAgICogRW5hYmxlIHRyYW5zaXRpb246XG4gICAqIC0gb24gZWFjaCBydW5uaW5nLCBiZWNhdXNlIGl0IG1heSBiZSBkaXNhYmxlZCBieSBvZmZzZXQgbW92ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdydW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgVHJhbnNpdGlvbi5lbmFibGUoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0cmFuc2l0aW9uOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0YWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBUcmFuc2l0aW9uLnJlbW92ZSgpO1xuICB9KTtcblxuICByZXR1cm4gVHJhbnNpdGlvbjtcbn1cblxuLyoqXG4gKiBUZXN0IHZpYSBhIGdldHRlciBpbiB0aGUgb3B0aW9ucyBvYmplY3QgdG8gc2VlXG4gKiBpZiB0aGUgcGFzc2l2ZSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZC5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL0V2ZW50TGlzdGVuZXJPcHRpb25zL2Jsb2IvZ2gtcGFnZXMvZXhwbGFpbmVyLm1kI2ZlYXR1cmUtZGV0ZWN0aW9uXG4gKi9cblxudmFyIHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlJywgbnVsbCwgb3B0cyk7XG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0ZXN0UGFzc2l2ZScsIG51bGwsIG9wdHMpO1xufSBjYXRjaCAoZSkge31cblxudmFyIHN1cHBvcnRzUGFzc2l2ZSQxID0gc3VwcG9ydHNQYXNzaXZlO1xuXG52YXIgU1RBUlRfRVZFTlRTID0gWyd0b3VjaHN0YXJ0JywgJ21vdXNlZG93biddO1xudmFyIE1PVkVfRVZFTlRTID0gWyd0b3VjaG1vdmUnLCAnbW91c2Vtb3ZlJ107XG52YXIgRU5EX0VWRU5UUyA9IFsndG91Y2hlbmQnLCAndG91Y2hjYW5jZWwnLCAnbW91c2V1cCcsICdtb3VzZWxlYXZlJ107XG52YXIgTU9VU0VfRVZFTlRTID0gWydtb3VzZWRvd24nLCAnbW91c2Vtb3ZlJywgJ21vdXNldXAnLCAnbW91c2VsZWF2ZSddO1xuXG5mdW5jdGlvbiBTd2lwZSAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIHZhciBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKCk7XG5cbiAgdmFyIHN3aXBlU2luID0gMDtcbiAgdmFyIHN3aXBlU3RhcnRYID0gMDtcbiAgdmFyIHN3aXBlU3RhcnRZID0gMDtcbiAgdmFyIGRpc2FibGVkID0gZmFsc2U7XG4gIHZhciBjYXB0dXJlID0gc3VwcG9ydHNQYXNzaXZlJDEgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlO1xuXG4gIHZhciBTd2lwZSA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBzd2lwZSBiaW5kaW5ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy5iaW5kU3dpcGVTdGFydCgpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGBzd2lwZXN0YXJ0YCBldmVudC4gQ2FsY3VsYXRlcyBlbnRyeSBwb2ludHMgb2YgdGhlIHVzZXIncyB0YXAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydChldmVudCkge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiAhR2xpZGUuZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG5cbiAgICAgICAgdmFyIHN3aXBlID0gdGhpcy50b3VjaGVzKGV2ZW50KTtcblxuICAgICAgICBzd2lwZVNpbiA9IG51bGw7XG4gICAgICAgIHN3aXBlU3RhcnRYID0gdG9JbnQoc3dpcGUucGFnZVgpO1xuICAgICAgICBzd2lwZVN0YXJ0WSA9IHRvSW50KHN3aXBlLnBhZ2VZKTtcblxuICAgICAgICB0aGlzLmJpbmRTd2lwZU1vdmUoKTtcbiAgICAgICAgdGhpcy5iaW5kU3dpcGVFbmQoKTtcblxuICAgICAgICBFdmVudHMuZW1pdCgnc3dpcGUuc3RhcnQnKTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBgc3dpcGVtb3ZlYCBldmVudC4gQ2FsY3VsYXRlcyB1c2VyJ3MgdGFwIGFuZ2xlIGFuZCBkaXN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG1vdmU6IGZ1bmN0aW9uIG1vdmUoZXZlbnQpIHtcbiAgICAgIGlmICghR2xpZGUuZGlzYWJsZWQpIHtcbiAgICAgICAgdmFyIF9HbGlkZSRzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzLFxuICAgICAgICAgICAgdG91Y2hBbmdsZSA9IF9HbGlkZSRzZXR0aW5ncy50b3VjaEFuZ2xlLFxuICAgICAgICAgICAgdG91Y2hSYXRpbyA9IF9HbGlkZSRzZXR0aW5ncy50b3VjaFJhdGlvLFxuICAgICAgICAgICAgY2xhc3NlcyA9IF9HbGlkZSRzZXR0aW5ncy5jbGFzc2VzO1xuXG5cbiAgICAgICAgdmFyIHN3aXBlID0gdGhpcy50b3VjaGVzKGV2ZW50KTtcblxuICAgICAgICB2YXIgc3ViRXhTeCA9IHRvSW50KHN3aXBlLnBhZ2VYKSAtIHN3aXBlU3RhcnRYO1xuICAgICAgICB2YXIgc3ViRXlTeSA9IHRvSW50KHN3aXBlLnBhZ2VZKSAtIHN3aXBlU3RhcnRZO1xuICAgICAgICB2YXIgcG93RVggPSBNYXRoLmFicyhzdWJFeFN4IDw8IDIpO1xuICAgICAgICB2YXIgcG93RVkgPSBNYXRoLmFicyhzdWJFeVN5IDw8IDIpO1xuICAgICAgICB2YXIgc3dpcGVIeXBvdGVudXNlID0gTWF0aC5zcXJ0KHBvd0VYICsgcG93RVkpO1xuICAgICAgICB2YXIgc3dpcGVDYXRoZXR1cyA9IE1hdGguc3FydChwb3dFWSk7XG5cbiAgICAgICAgc3dpcGVTaW4gPSBNYXRoLmFzaW4oc3dpcGVDYXRoZXR1cyAvIHN3aXBlSHlwb3RlbnVzZSk7XG5cbiAgICAgICAgaWYgKHN3aXBlU2luICogMTgwIC8gTWF0aC5QSSA8IHRvdWNoQW5nbGUpIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgIENvbXBvbmVudHMuTW92ZS5tYWtlKHN1YkV4U3ggKiB0b0Zsb2F0KHRvdWNoUmF0aW8pKTtcblxuICAgICAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5kcmFnZ2luZyk7XG5cbiAgICAgICAgICBFdmVudHMuZW1pdCgnc3dpcGUubW92ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGBzd2lwZWVuZGAgZXZlbnQuIEZpbml0aWFsaXplcyB1c2VyJ3MgdGFwIGFuZCBkZWNpZGVzIGFib3V0IGdsaWRlIG1vdmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGVuZDogZnVuY3Rpb24gZW5kKGV2ZW50KSB7XG4gICAgICBpZiAoIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgIHZhciBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzO1xuXG4gICAgICAgIHZhciBzd2lwZSA9IHRoaXMudG91Y2hlcyhldmVudCk7XG4gICAgICAgIHZhciB0aHJlc2hvbGQgPSB0aGlzLnRocmVzaG9sZChldmVudCk7XG5cbiAgICAgICAgdmFyIHN3aXBlRGlzdGFuY2UgPSBzd2lwZS5wYWdlWCAtIHN3aXBlU3RhcnRYO1xuICAgICAgICB2YXIgc3dpcGVEZWcgPSBzd2lwZVNpbiAqIDE4MCAvIE1hdGguUEk7XG4gICAgICAgIHZhciBzdGVwcyA9IE1hdGgucm91bmQoc3dpcGVEaXN0YW5jZSAvIENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCk7XG5cbiAgICAgICAgdGhpcy5lbmFibGUoKTtcblxuICAgICAgICBpZiAoc3dpcGVEaXN0YW5jZSA+IHRocmVzaG9sZCAmJiBzd2lwZURlZyA8IHNldHRpbmdzLnRvdWNoQW5nbGUpIHtcbiAgICAgICAgICAvLyBXaGlsZSBzd2lwZSBpcyBwb3NpdGl2ZSBhbmQgZ3JlYXRlciB0aGFuIHRocmVzaG9sZCBtb3ZlIGJhY2t3YXJkLlxuICAgICAgICAgIGlmIChzZXR0aW5ncy5wZXJUb3VjaCkge1xuICAgICAgICAgICAgc3RlcHMgPSBNYXRoLm1pbihzdGVwcywgdG9JbnQoc2V0dGluZ3MucGVyVG91Y2gpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoQ29tcG9uZW50cy5EaXJlY3Rpb24uaXMoJ3J0bCcpKSB7XG4gICAgICAgICAgICBzdGVwcyA9IC1zdGVwcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBDb21wb25lbnRzLlJ1bi5tYWtlKENvbXBvbmVudHMuRGlyZWN0aW9uLnJlc29sdmUoJzwnICsgc3RlcHMpKTtcbiAgICAgICAgfSBlbHNlIGlmIChzd2lwZURpc3RhbmNlIDwgLXRocmVzaG9sZCAmJiBzd2lwZURlZyA8IHNldHRpbmdzLnRvdWNoQW5nbGUpIHtcbiAgICAgICAgICAvLyBXaGlsZSBzd2lwZSBpcyBuZWdhdGl2ZSBhbmQgbG93ZXIgdGhhbiBuZWdhdGl2ZSB0aHJlc2hvbGQgbW92ZSBmb3J3YXJkLlxuICAgICAgICAgIGlmIChzZXR0aW5ncy5wZXJUb3VjaCkge1xuICAgICAgICAgICAgc3RlcHMgPSBNYXRoLm1heChzdGVwcywgLXRvSW50KHNldHRpbmdzLnBlclRvdWNoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKENvbXBvbmVudHMuRGlyZWN0aW9uLmlzKCdydGwnKSkge1xuICAgICAgICAgICAgc3RlcHMgPSAtc3RlcHM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKCc+JyArIHN0ZXBzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gV2hpbGUgc3dpcGUgZG9uJ3QgcmVhY2ggZGlzdGFuY2UgYXBwbHkgcHJldmlvdXMgdHJhbnNmb3JtLlxuICAgICAgICAgIENvbXBvbmVudHMuTW92ZS5tYWtlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QucmVtb3ZlKHNldHRpbmdzLmNsYXNzZXMuZHJhZ2dpbmcpO1xuXG4gICAgICAgIHRoaXMudW5iaW5kU3dpcGVNb3ZlKCk7XG4gICAgICAgIHRoaXMudW5iaW5kU3dpcGVFbmQoKTtcblxuICAgICAgICBFdmVudHMuZW1pdCgnc3dpcGUuZW5kJyk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgc3dpcGUncyBzdGFydGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZFN3aXBlU3RhcnQ6IGZ1bmN0aW9uIGJpbmRTd2lwZVN0YXJ0KCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3M7XG5cbiAgICAgIGlmIChzZXR0aW5ncy5zd2lwZVRocmVzaG9sZCkge1xuICAgICAgICBCaW5kZXIub24oU1RBUlRfRVZFTlRTWzBdLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgX3RoaXMuc3RhcnQoZXZlbnQpO1xuICAgICAgICB9LCBjYXB0dXJlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNldHRpbmdzLmRyYWdUaHJlc2hvbGQpIHtcbiAgICAgICAgQmluZGVyLm9uKFNUQVJUX0VWRU5UU1sxXSwgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIF90aGlzLnN0YXJ0KGV2ZW50KTtcbiAgICAgICAgfSwgY2FwdHVyZSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBzd2lwZSdzIHN0YXJ0aW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmRTd2lwZVN0YXJ0OiBmdW5jdGlvbiB1bmJpbmRTd2lwZVN0YXJ0KCkge1xuICAgICAgQmluZGVyLm9mZihTVEFSVF9FVkVOVFNbMF0sIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCBjYXB0dXJlKTtcbiAgICAgIEJpbmRlci5vZmYoU1RBUlRfRVZFTlRTWzFdLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgY2FwdHVyZSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgc3dpcGUncyBtb3ZpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmRTd2lwZU1vdmU6IGZ1bmN0aW9uIGJpbmRTd2lwZU1vdmUoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgQmluZGVyLm9uKE1PVkVfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgdGhyb3R0bGUoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIF90aGlzMi5tb3ZlKGV2ZW50KTtcbiAgICAgIH0sIEdsaWRlLnNldHRpbmdzLnRocm90dGxlKSwgY2FwdHVyZSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBzd2lwZSdzIG1vdmluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kU3dpcGVNb3ZlOiBmdW5jdGlvbiB1bmJpbmRTd2lwZU1vdmUoKSB7XG4gICAgICBCaW5kZXIub2ZmKE1PVkVfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgY2FwdHVyZSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgc3dpcGUncyBlbmRpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmRTd2lwZUVuZDogZnVuY3Rpb24gYmluZFN3aXBlRW5kKCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIEJpbmRlci5vbihFTkRfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIF90aGlzMy5lbmQoZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBzd2lwZSdzIGVuZGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kU3dpcGVFbmQ6IGZ1bmN0aW9uIHVuYmluZFN3aXBlRW5kKCkge1xuICAgICAgQmluZGVyLm9mZihFTkRfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlcik7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogTm9ybWFsaXplcyBldmVudCB0b3VjaGVzIHBvaW50cyBhY2NvcnRpbmcgdG8gZGlmZmVyZW50IHR5cGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgdG91Y2hlczogZnVuY3Rpb24gdG91Y2hlcyhldmVudCkge1xuICAgICAgaWYgKE1PVVNFX0VWRU5UUy5pbmRleE9mKGV2ZW50LnR5cGUpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXZlbnQudG91Y2hlc1swXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIG1pbmltdW0gc3dpcGUgZGlzdGFuY2Ugc2V0dGluZ3MgYmFzZWQgb24gZXZlbnQgdHlwZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICB0aHJlc2hvbGQ6IGZ1bmN0aW9uIHRocmVzaG9sZChldmVudCkge1xuICAgICAgdmFyIHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3M7XG5cbiAgICAgIGlmIChNT1VTRV9FVkVOVFMuaW5kZXhPZihldmVudC50eXBlKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBzZXR0aW5ncy5kcmFnVGhyZXNob2xkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQ7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBzd2lwZSBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3NlbGZ9XG4gICAgICovXG4gICAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uZW5hYmxlKCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHN3aXBlIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBkaXNhYmxlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuXG4gICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uZGlzYWJsZSgpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBjb21wb25lbnQgY2xhc3M6XG4gICAqIC0gYWZ0ZXIgaW5pdGlhbCBidWlsZGluZ1xuICAgKi9cbiAgRXZlbnRzLm9uKCdidWlsZC5hZnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QuYWRkKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuc3dpcGVhYmxlKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBzd2lwaW5nIGJpbmRpbmdzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIHJlbW92ZSBhZGRlZCBFdmVudExpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgIFN3aXBlLnVuYmluZFN3aXBlU3RhcnQoKTtcbiAgICBTd2lwZS51bmJpbmRTd2lwZU1vdmUoKTtcbiAgICBTd2lwZS51bmJpbmRTd2lwZUVuZCgpO1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBTd2lwZTtcbn1cblxuZnVuY3Rpb24gSW1hZ2VzIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgdmFyIEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKTtcblxuICB2YXIgSW1hZ2VzID0ge1xuICAgIC8qKlxuICAgICAqIEJpbmRzIGxpc3RlbmVyIHRvIGdsaWRlIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMuYmluZCgpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEJpbmRzIGBkcmFnc3RhcnRgIGV2ZW50IG9uIHdyYXBwZXIgdG8gcHJldmVudCBkcmFnZ2luZyBpbWFnZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICBCaW5kZXIub24oJ2RyYWdzdGFydCcsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCB0aGlzLmRyYWdzdGFydCk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBgZHJhZ3N0YXJ0YCBldmVudCBvbiB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIEJpbmRlci5vZmYoJ2RyYWdzdGFydCcsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyLiBQcmV2ZW50cyBkcmFnZ2luZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZHJhZ3N0YXJ0OiBmdW5jdGlvbiBkcmFnc3RhcnQoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmluZGluZ3MgZnJvbSBpbWFnZXM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gcmVtb3ZlIGFkZGVkIEV2ZW50TGlzdGVuZXJzXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgSW1hZ2VzLnVuYmluZCgpO1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBJbWFnZXM7XG59XG5cbmZ1bmN0aW9uIEFuY2hvcnMgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICB2YXIgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpO1xuXG4gIC8qKlxuICAgKiBIb2xkcyBkZXRhY2hpbmcgc3RhdHVzIG9mIGFuY2hvcnMuXG4gICAqIFByZXZlbnRzIGRldGFjaGluZyBvZiBhbHJlYWR5IGRldGFjaGVkIGFuY2hvcnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgdmFyIGRldGFjaGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEhvbGRzIHByZXZlbnRpbmcgc3RhdHVzIG9mIGFuY2hvcnMuXG4gICAqIElmIGB0cnVlYCByZWRpcmVjdGlvbiBhZnRlciBjbGljayB3aWxsIGJlIGRpc2FibGVkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIHZhciBwcmV2ZW50ZWQgPSBmYWxzZTtcblxuICB2YXIgQW5jaG9ycyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cHMgYSBpbml0aWFsIHN0YXRlIG9mIGFuY2hvcnMgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgLyoqXG4gICAgICAgKiBIb2xkcyBjb2xsZWN0aW9uIG9mIGFuY2hvcnMgZWxlbWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIEB0eXBlIHtIVE1MQ29sbGVjdGlvbn1cbiAgICAgICAqL1xuICAgICAgdGhpcy5fYSA9IENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcblxuICAgICAgdGhpcy5iaW5kKCk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgZXZlbnRzIHRvIGFuY2hvcnMgaW5zaWRlIGEgdHJhY2suXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICBCaW5kZXIub24oJ2NsaWNrJywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIHRoaXMuY2xpY2spO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgZXZlbnRzIGF0dGFjaGVkIHRvIGFuY2hvcnMgaW5zaWRlIGEgdHJhY2suXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgQmluZGVyLm9mZignY2xpY2snLCBDb21wb25lbnRzLkh0bWwud3JhcHBlcik7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQuIFByZXZlbnRzIGNsaWNrcyB3aGVuIGdsaWRlIGlzIGluIGBwcmV2ZW50YCBzdGF0dXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBjbGljazogZnVuY3Rpb24gY2xpY2soZXZlbnQpIHtcbiAgICAgIGlmIChwcmV2ZW50ZWQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgYW5jaG9ycyBjbGljayBldmVudCBpbnNpZGUgZ2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzZWxmfVxuICAgICAqL1xuICAgIGRldGFjaDogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgcHJldmVudGVkID0gdHJ1ZTtcblxuICAgICAgaWYgKCFkZXRhY2hlZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLml0ZW1zW2ldLmRyYWdnYWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaHJlZicsIHRoaXMuaXRlbXNbaV0uZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuXG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRldGFjaGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgYW5jaG9ycyBjbGljayBldmVudHMgaW5zaWRlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBhdHRhY2g6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAoZGV0YWNoZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5kcmFnZ2FibGUgPSB0cnVlO1xuXG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB0aGlzLml0ZW1zW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1ocmVmJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGV0YWNoZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShBbmNob3JzLCAnaXRlbXMnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBjb2xsZWN0aW9uIG9mIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gQW5jaG9ycy5fYTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBEZXRhY2ggYW5jaG9ycyBpbnNpZGUgc2xpZGVzOlxuICAgKiAtIG9uIHN3aXBpbmcsIHNvIHRoZXkgd29uJ3QgcmVkaXJlY3QgdG8gaXRzIGBocmVmYCBhdHRyaWJ1dGVzXG4gICAqL1xuICBFdmVudHMub24oJ3N3aXBlLm1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgQW5jaG9ycy5kZXRhY2goKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbmNob3JzIGluc2lkZSBzbGlkZXM6XG4gICAqIC0gYWZ0ZXIgc3dpcGluZyBhbmQgdHJhbnNpdGlvbnMgZW5kcywgc28gdGhleSBjYW4gcmVkaXJlY3QgYWZ0ZXIgY2xpY2sgYWdhaW5cbiAgICovXG4gIEV2ZW50cy5vbignc3dpcGUuZW5kJywgZnVuY3Rpb24gKCkge1xuICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgICBBbmNob3JzLmF0dGFjaCgpO1xuICAgIH0pO1xuICB9KTtcblxuICAvKipcbiAgICogVW5iaW5kIGFuY2hvcnMgaW5zaWRlIHNsaWRlczpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBhbmNob3JzIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgQW5jaG9ycy5hdHRhY2goKTtcbiAgICBBbmNob3JzLnVuYmluZCgpO1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBBbmNob3JzO1xufVxuXG52YXIgTkFWX1NFTEVDVE9SID0gJ1tkYXRhLWdsaWRlLWVsPVwiY29udHJvbHNbbmF2XVwiXSc7XG52YXIgQ09OVFJPTFNfU0VMRUNUT1IgPSAnW2RhdGEtZ2xpZGUtZWxePVwiY29udHJvbHNcIl0nO1xuXG5mdW5jdGlvbiBDb250cm9scyAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIHZhciBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKCk7XG5cbiAgdmFyIGNhcHR1cmUgPSBzdXBwb3J0c1Bhc3NpdmUkMSA/IHsgcGFzc2l2ZTogdHJ1ZSB9IDogZmFsc2U7XG5cbiAgdmFyIENvbnRyb2xzID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRzIGFycm93cy4gQmluZHMgZXZlbnRzIGxpc3RlbmVyc1xuICAgICAqIHRvIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgLyoqXG4gICAgICAgKiBDb2xsZWN0aW9uIG9mIG5hdmlnYXRpb24gSFRNTCBlbGVtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0hUTUxDb2xsZWN0aW9ufVxuICAgICAgICovXG4gICAgICB0aGlzLl9uID0gQ29tcG9uZW50cy5IdG1sLnJvb3QucXVlcnlTZWxlY3RvckFsbChOQVZfU0VMRUNUT1IpO1xuXG4gICAgICAvKipcbiAgICAgICAqIENvbGxlY3Rpb24gb2YgY29udHJvbHMgSFRNTCBlbGVtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0hUTUxDb2xsZWN0aW9ufVxuICAgICAgICovXG4gICAgICB0aGlzLl9jID0gQ29tcG9uZW50cy5IdG1sLnJvb3QucXVlcnlTZWxlY3RvckFsbChDT05UUk9MU19TRUxFQ1RPUik7XG5cbiAgICAgIHRoaXMuYWRkQmluZGluZ3MoKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXRBY3RpdmU6IGZ1bmN0aW9uIHNldEFjdGl2ZSgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmFkZENsYXNzKHRoaXMuX25baV0uY2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWN0aXZlIGNsYXNzIHRvIGN1cnJlbnQgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUFjdGl2ZTogZnVuY3Rpb24gcmVtb3ZlQWN0aXZlKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3ModGhpcy5fbltpXS5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBhY3RpdmUgY2xhc3Mgb24gaXRlbXMgaW5zaWRlIG5hdmlnYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gY29udHJvbHNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFkZENsYXNzOiBmdW5jdGlvbiBhZGRDbGFzcyhjb250cm9scykge1xuICAgICAgdmFyIHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3M7XG4gICAgICB2YXIgaXRlbSA9IGNvbnRyb2xzW0dsaWRlLmluZGV4XTtcblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKHNldHRpbmdzLmNsYXNzZXMuYWN0aXZlTmF2KTtcblxuICAgICAgICBzaWJsaW5ncyhpdGVtKS5mb3JFYWNoKGZ1bmN0aW9uIChzaWJsaW5nKSB7XG4gICAgICAgICAgc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKHNldHRpbmdzLmNsYXNzZXMuYWN0aXZlTmF2KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhY3RpdmUgY2xhc3MgZnJvbSBhY3RpdmUgY29udHJvbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBjb250cm9sc1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGNvbnRyb2xzKSB7XG4gICAgICB2YXIgaXRlbSA9IGNvbnRyb2xzW0dsaWRlLmluZGV4XTtcblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuYWN0aXZlTmF2KTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGhhbmRsZXMgdG8gdGhlIGVhY2ggZ3JvdXAgb2YgY29udHJvbHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFkZEJpbmRpbmdzOiBmdW5jdGlvbiBhZGRCaW5kaW5ncygpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJpbmQodGhpcy5fY1tpXS5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBoYW5kbGVzIGZyb20gdGhlIGVhY2ggZ3JvdXAgb2YgY29udHJvbHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUJpbmRpbmdzOiBmdW5jdGlvbiByZW1vdmVCaW5kaW5ncygpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnVuYmluZCh0aGlzLl9jW2ldLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBldmVudHMgdG8gYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSBlbGVtZW50c1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZDogZnVuY3Rpb24gYmluZChlbGVtZW50cykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBCaW5kZXIub24oJ2NsaWNrJywgZWxlbWVudHNbaV0sIHRoaXMuY2xpY2spO1xuICAgICAgICBCaW5kZXIub24oJ3RvdWNoc3RhcnQnLCBlbGVtZW50c1tpXSwgdGhpcy5jbGljaywgY2FwdHVyZSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBldmVudHMgYmluZGVkIHRvIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IGVsZW1lbnRzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZChlbGVtZW50cykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBCaW5kZXIub2ZmKFsnY2xpY2snLCAndG91Y2hzdGFydCddLCBlbGVtZW50c1tpXSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBgY2xpY2tgIGV2ZW50IG9uIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKiBNb3ZlcyBzbGlkZXIgaW4gZHJpZWN0aW9uIHByZWNpc2VkIGluXG4gICAgICogYGRhdGEtZ2xpZGUtZGlyYCBhdHRyaWJ1dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGNsaWNrOiBmdW5jdGlvbiBjbGljayhldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWdsaWRlLWRpcicpKSk7XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShDb250cm9scywgJ2l0ZW1zJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgY29sbGVjdGlvbiBvZiB0aGUgY29udHJvbHMgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gQ29udHJvbHMuX2M7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogU3dhcCBhY3RpdmUgY2xhc3Mgb2YgY3VycmVudCBuYXZpZ2F0aW9uIGl0ZW06XG4gICAqIC0gYWZ0ZXIgbW91bnRpbmcgdG8gc2V0IGl0IHRvIGluaXRpYWwgaW5kZXhcbiAgICogLSBhZnRlciBlYWNoIG1vdmUgdG8gdGhlIG5ldyBpbmRleFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnbW91bnQuYWZ0ZXInLCAnbW92ZS5hZnRlciddLCBmdW5jdGlvbiAoKSB7XG4gICAgQ29udHJvbHMuc2V0QWN0aXZlKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmluZGluZ3MgYW5kIEhUTUwgQ2xhc3NlczpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBDb250cm9scy5yZW1vdmVCaW5kaW5ncygpO1xuICAgIENvbnRyb2xzLnJlbW92ZUFjdGl2ZSgpO1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBDb250cm9scztcbn1cblxuZnVuY3Rpb24gS2V5Ym9hcmQgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICB2YXIgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpO1xuXG4gIHZhciBLZXlib2FyZCA9IHtcbiAgICAvKipcbiAgICAgKiBCaW5kcyBrZXlib2FyZCBldmVudHMgb24gY29tcG9uZW50IG1vdW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudDogZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3Mua2V5Ym9hcmQpIHtcbiAgICAgICAgdGhpcy5iaW5kKCk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQWRkcyBrZXlib2FyZCBwcmVzcyBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICBCaW5kZXIub24oJ2tleXVwJywgZG9jdW1lbnQsIHRoaXMucHJlc3MpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMga2V5Ym9hcmQgcHJlc3MgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIEJpbmRlci5vZmYoJ2tleXVwJywgZG9jdW1lbnQpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMga2V5Ym9hcmQncyBhcnJvd3MgcHJlc3MgYW5kIG1vdmluZyBnbGlkZSBmb3dhcmQgYW5kIGJhY2t3YXJkLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBldmVudFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcHJlc3M6IGZ1bmN0aW9uIHByZXNzKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKCc+JykpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcpIHtcbiAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKCc8JykpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGZyb20ga2V5Ym9hcmQ6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byByZW1vdmUgYWRkZWQgZXZlbnRzXG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVtb3ZlIGV2ZW50cyBiZWZvcmUgcmVtb3VudGluZ1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgZnVuY3Rpb24gKCkge1xuICAgIEtleWJvYXJkLnVuYmluZCgpO1xuICB9KTtcblxuICAvKipcbiAgICogUmVtb3VudCBjb21wb25lbnRcbiAgICogLSBvbiB1cGRhdGluZyB0byByZWZsZWN0IHBvdGVudGlhbCBjaGFuZ2VzIGluIHNldHRpbmdzXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBLZXlib2FyZC5tb3VudCgpO1xuICB9KTtcblxuICAvKipcbiAgICogRGVzdHJveSBiaW5kZXI6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byByZW1vdmUgbGlzdGVuZXJzXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgQmluZGVyLmRlc3Ryb3koKTtcbiAgfSk7XG5cbiAgcmV0dXJuIEtleWJvYXJkO1xufVxuXG5mdW5jdGlvbiBBdXRvcGxheSAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIHZhciBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKCk7XG5cbiAgdmFyIEF1dG9wbGF5ID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGF1dG9wbGF5aW5nIGFuZCBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMuc3RhcnQoKTtcblxuICAgICAgaWYgKEdsaWRlLnNldHRpbmdzLmhvdmVycGF1c2UpIHtcbiAgICAgICAgdGhpcy5iaW5kKCk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIGF1dG9wbGF5aW5nIGluIGNvbmZpZ3VyZWQgaW50ZXJ2YWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW58TnVtYmVyfSBmb3JjZSBSdW4gYXV0b3BsYXlpbmcgd2l0aCBwYXNzZWQgaW50ZXJ2YWwgcmVnYXJkbGVzcyBvZiBgYXV0b3BsYXlgIHNldHRpbmdzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3MuYXV0b3BsYXkpIHtcbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHRoaXMuX2kpKSB7XG4gICAgICAgICAgdGhpcy5faSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLnN0b3AoKTtcblxuICAgICAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZSgnPicpO1xuXG4gICAgICAgICAgICBfdGhpcy5zdGFydCgpO1xuICAgICAgICAgIH0sIHRoaXMudGltZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBhdXRvcnVubmluZyBvZiB0aGUgZ2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICB0aGlzLl9pID0gY2xlYXJJbnRlcnZhbCh0aGlzLl9pKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBhdXRvcGxheWluZyB3aGlsZSBtb3VzZSBpcyBvdmVyIGdsaWRlJ3MgYXJlYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBCaW5kZXIub24oJ21vdXNlb3ZlcicsIENvbXBvbmVudHMuSHRtbC5yb290LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMi5zdG9wKCk7XG4gICAgICB9KTtcblxuICAgICAgQmluZGVyLm9uKCdtb3VzZW91dCcsIENvbXBvbmVudHMuSHRtbC5yb290LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMi5zdGFydCgpO1xuICAgICAgfSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kIG1vdXNlb3ZlciBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIEJpbmRlci5vZmYoWydtb3VzZW92ZXInLCAnbW91c2VvdXQnXSwgQ29tcG9uZW50cy5IdG1sLnJvb3QpO1xuICAgIH1cbiAgfTtcblxuICBkZWZpbmUoQXV0b3BsYXksICd0aW1lJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdGltZSBwZXJpb2QgdmFsdWUgZm9yIHRoZSBhdXRvcGxheSBpbnRlcnZhbC4gUHJpb3JpdGl6ZXNcbiAgICAgKiB0aW1lcyBpbiBgZGF0YS1nbGlkZS1hdXRvcGxheWAgYXR0cnVidXRlcyBvdmVyIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgYXV0b3BsYXkgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzW0dsaWRlLmluZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ2xpZGUtYXV0b3BsYXknKTtcblxuICAgICAgaWYgKGF1dG9wbGF5KSB7XG4gICAgICAgIHJldHVybiB0b0ludChhdXRvcGxheSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0b0ludChHbGlkZS5zZXR0aW5ncy5hdXRvcGxheSk7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogU3RvcCBhdXRvcGxheWluZyBhbmQgdW5iaW5kIGV2ZW50czpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBjbGVhciBkZWZpbmVkIGludGVydmFsXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSB0byByZXNldCBpbnRlcnZhbCB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oWydkZXN0cm95JywgJ3VwZGF0ZSddLCBmdW5jdGlvbiAoKSB7XG4gICAgQXV0b3BsYXkudW5iaW5kKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBTdG9wIGF1dG9wbGF5aW5nOlxuICAgKiAtIGJlZm9yZSBlYWNoIHJ1biwgdG8gcmVzdGFydCBhdXRvcGxheWluZ1xuICAgKiAtIG9uIHBhdXNpbmcgdmlhIEFQSVxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGNsZWFyIGRlZmluZWQgaW50ZXJ2YWxcbiAgICogLSB3aGlsZSBzdGFydGluZyBhIHN3aXBlXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSB0byByZXNldCBpbnRlcnZhbCB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oWydydW4uYmVmb3JlJywgJ3BhdXNlJywgJ2Rlc3Ryb3knLCAnc3dpcGUuc3RhcnQnLCAndXBkYXRlJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBBdXRvcGxheS5zdG9wKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBTdGFydCBhdXRvcGxheWluZzpcbiAgICogLSBhZnRlciBlYWNoIHJ1biwgdG8gcmVzdGFydCBhdXRvcGxheWluZ1xuICAgKiAtIG9uIHBsYXlpbmcgdmlhIEFQSVxuICAgKiAtIHdoaWxlIGVuZGluZyBhIHN3aXBlXG4gICAqL1xuICBFdmVudHMub24oWydydW4uYWZ0ZXInLCAncGxheScsICdzd2lwZS5lbmQnXSwgZnVuY3Rpb24gKCkge1xuICAgIEF1dG9wbGF5LnN0YXJ0KCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZW1vdW50IGF1dG9wbGF5aW5nOlxuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEkgdG8gcmVzZXQgaW50ZXJ2YWwgdGhhdCBtYXkgY2hhbmdlZFxuICAgKi9cbiAgRXZlbnRzLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgQXV0b3BsYXkubW91bnQoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgYSBiaW5kZXI6XG4gICAqIC0gb24gZGVzdHJveWluZyBnbGlkZSBpbnN0YW5jZSB0byBjbGVhcnVwIGxpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBBdXRvcGxheTtcbn1cblxuLyoqXG4gKiBTb3J0cyBrZXlzIG9mIGJyZWFrcG9pbnQgb2JqZWN0IHNvIHRoZXkgd2lsbCBiZSBvcmRlcmVkIGZyb20gbG93ZXIgdG8gYmlnZ2VyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludHNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIHNvcnRCcmVha3BvaW50cyhwb2ludHMpIHtcbiAgaWYgKGlzT2JqZWN0KHBvaW50cykpIHtcbiAgICByZXR1cm4gc29ydEtleXMocG9pbnRzKTtcbiAgfSBlbHNlIHtcbiAgICB3YXJuKCdCcmVha3BvaW50cyBvcHRpb24gbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIHJldHVybiB7fTtcbn1cblxuZnVuY3Rpb24gQnJlYWtwb2ludHMgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICB2YXIgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpO1xuXG4gIC8qKlxuICAgKiBIb2xkcyByZWZlcmVuY2UgdG8gc2V0dGluZ3MuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICB2YXIgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5ncztcblxuICAvKipcbiAgICogSG9sZHMgcmVmZXJlbmNlIHRvIGJyZWFrcG9pbnRzIG9iamVjdCBpbiBzZXR0aW5ncy4gU29ydHMgYnJlYWtwb2ludHNcbiAgICogZnJvbSBzbWFsbGVyIHRvIGxhcmdlci4gSXQgaXMgcmVxdWlyZWQgaW4gb3JkZXIgdG8gcHJvcGVyXG4gICAqIG1hdGNoaW5nIGN1cnJlbnRseSBhY3RpdmUgYnJlYWtwb2ludCBzZXR0aW5ncy5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHZhciBwb2ludHMgPSBzb3J0QnJlYWtwb2ludHMoc2V0dGluZ3MuYnJlYWtwb2ludHMpO1xuXG4gIC8qKlxuICAgKiBDYWNoZSBpbml0aWFsIHNldHRpbmdzIGJlZm9yZSBvdmVyd3JpdHRpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICB2YXIgZGVmYXVsdHMgPSBfZXh0ZW5kcyh7fSwgc2V0dGluZ3MpO1xuXG4gIHZhciBCcmVha3BvaW50cyA9IHtcbiAgICAvKipcbiAgICAgKiBNYXRjaGVzIHNldHRpbmdzIGZvciBjdXJyZWN0bHkgbWF0Y2hpbmcgbWVkaWEgYnJlYWtwb2ludC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludHNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIG1hdGNoOiBmdW5jdGlvbiBtYXRjaChwb2ludHMpIHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Lm1hdGNoTWVkaWEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGZvciAodmFyIHBvaW50IGluIHBvaW50cykge1xuICAgICAgICAgIGlmIChwb2ludHMuaGFzT3duUHJvcGVydHkocG9pbnQpKSB7XG4gICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoJyhtYXgtd2lkdGg6ICcgKyBwb2ludCArICdweCknKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwb2ludHNbcG9pbnRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBPdmVyd3JpdGUgaW5zdGFuY2Ugc2V0dGluZ3Mgd2l0aCBjdXJyZW50bHkgbWF0Y2hpbmcgYnJlYWtwb2ludCBzZXR0aW5ncy5cbiAgICogVGhpcyBoYXBwZW5zIHJpZ2h0IGFmdGVyIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbi5cbiAgICovXG4gIF9leHRlbmRzKHNldHRpbmdzLCBCcmVha3BvaW50cy5tYXRjaChwb2ludHMpKTtcblxuICAvKipcbiAgICogVXBkYXRlIGdsaWRlIHdpdGggc2V0dGluZ3Mgb2YgbWF0Y2hlZCBicmVrcG9pbnQ6XG4gICAqIC0gd2luZG93IHJlc2l6ZSB0byB1cGRhdGUgc2xpZGVyXG4gICAqL1xuICBCaW5kZXIub24oJ3Jlc2l6ZScsIHdpbmRvdywgdGhyb3R0bGUoZnVuY3Rpb24gKCkge1xuICAgIEdsaWRlLnNldHRpbmdzID0gbWVyZ2VPcHRpb25zKHNldHRpbmdzLCBCcmVha3BvaW50cy5tYXRjaChwb2ludHMpKTtcbiAgfSwgR2xpZGUuc2V0dGluZ3MudGhyb3R0bGUpKTtcblxuICAvKipcbiAgICogUmVzb3J0IGFuZCB1cGRhdGUgZGVmYXVsdCBzZXR0aW5nczpcbiAgICogLSBvbiByZWluaXQgdmlhIEFQSSwgc28gYnJlYWtwb2ludCBtYXRjaGluZyB3aWxsIGJlIHBlcmZvcm1lZCB3aXRoIG9wdGlvbnNcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHBvaW50cyA9IHNvcnRCcmVha3BvaW50cyhwb2ludHMpO1xuXG4gICAgZGVmYXVsdHMgPSBfZXh0ZW5kcyh7fSwgc2V0dGluZ3MpO1xuICB9KTtcblxuICAvKipcbiAgICogVW5iaW5kIHJlc2l6ZSBsaXN0ZW5lcjpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBCaW5kZXIub2ZmKCdyZXNpemUnLCB3aW5kb3cpO1xuICB9KTtcblxuICByZXR1cm4gQnJlYWtwb2ludHM7XG59XG5cbnZhciBDT01QT05FTlRTID0ge1xuICAvLyBSZXF1aXJlZFxuICBIdG1sOiBIdG1sLFxuICBUcmFuc2xhdGU6IFRyYW5zbGF0ZSxcbiAgVHJhbnNpdGlvbjogVHJhbnNpdGlvbixcbiAgRGlyZWN0aW9uOiBEaXJlY3Rpb24sXG4gIFBlZWs6IFBlZWssXG4gIFNpemVzOiBTaXplcyxcbiAgR2FwczogR2FwcyxcbiAgTW92ZTogTW92ZSxcbiAgQ2xvbmVzOiBDbG9uZXMsXG4gIFJlc2l6ZTogUmVzaXplLFxuICBCdWlsZDogQnVpbGQsXG4gIFJ1bjogUnVuLFxuXG4gIC8vIE9wdGlvbmFsXG4gIFN3aXBlOiBTd2lwZSxcbiAgSW1hZ2VzOiBJbWFnZXMsXG4gIEFuY2hvcnM6IEFuY2hvcnMsXG4gIENvbnRyb2xzOiBDb250cm9scyxcbiAgS2V5Ym9hcmQ6IEtleWJvYXJkLFxuICBBdXRvcGxheTogQXV0b3BsYXksXG4gIEJyZWFrcG9pbnRzOiBCcmVha3BvaW50c1xufTtcblxudmFyIEdsaWRlJDEgPSBmdW5jdGlvbiAoX0NvcmUpIHtcbiAgaW5oZXJpdHMoR2xpZGUkJDEsIF9Db3JlKTtcblxuICBmdW5jdGlvbiBHbGlkZSQkMSgpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBHbGlkZSQkMSk7XG4gICAgcmV0dXJuIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEdsaWRlJCQxLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoR2xpZGUkJDEpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKEdsaWRlJCQxLCBbe1xuICAgIGtleTogJ21vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgICB2YXIgZXh0ZW5zaW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICAgIHJldHVybiBnZXQoR2xpZGUkJDEucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoR2xpZGUkJDEucHJvdG90eXBlKSwgJ21vdW50JywgdGhpcykuY2FsbCh0aGlzLCBfZXh0ZW5kcyh7fSwgQ09NUE9ORU5UUywgZXh0ZW5zaW9ucykpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gR2xpZGUkJDE7XG59KEdsaWRlKTtcblxuZXhwb3J0IGRlZmF1bHQgR2xpZGUkMTtcbiIsImltcG9ydCBHbGlkZSBmcm9tIFwiQGdsaWRlanMvZ2xpZGVcIjtcbmNvbnN0IGNvbmZpZyA9IHtcbiAgdHlwZTogXCJjYXJvdXNlbFwiLFxuICBzdGFydEF0OiAxLFxuICBwZXJWaWV3OiAzLFxuICBhdXRvcGxheTogNDAwMCxcbiAgZ2FwOiA0NSxcbiAgYW5pbWF0aW9uRHVyYXRpb246IDUwMCxcbiAgYnJlYWtwb2ludHM6IHtcbiAgICAxMzAwOiB7XG4gICAgICBwZXJWaWV3OiAzLFxuICAgIH0sXG4gICAgOTAwOiB7XG4gICAgICBwZXJWaWV3OiAyLFxuICAgIH0sXG4gICAgNjAwOiB7XG4gICAgICBwZXJWaWV3OiAxLFxuICAgIH0sXG4gIH0sXG59O1xubmV3IEdsaWRlKFwiLmdsaWRlXCIsIGNvbmZpZykubW91bnQoKTtcbiJdLCJuYW1lcyI6WyJkZWZhdWx0cyIsInR5cGUiLCJzdGFydEF0IiwicGVyVmlldyIsImZvY3VzQXQiLCJnYXAiLCJhdXRvcGxheSIsImhvdmVycGF1c2UiLCJrZXlib2FyZCIsImJvdW5kIiwic3dpcGVUaHJlc2hvbGQiLCJkcmFnVGhyZXNob2xkIiwicGVyVG91Y2giLCJ0b3VjaFJhdGlvIiwidG91Y2hBbmdsZSIsImFuaW1hdGlvbkR1cmF0aW9uIiwicmV3aW5kIiwicmV3aW5kRHVyYXRpb24iLCJhbmltYXRpb25UaW1pbmdGdW5jIiwidGhyb3R0bGUiLCJkaXJlY3Rpb24iLCJwZWVrIiwiYnJlYWtwb2ludHMiLCJjbGFzc2VzIiwibHRyIiwicnRsIiwic2xpZGVyIiwiY2Fyb3VzZWwiLCJzd2lwZWFibGUiLCJkcmFnZ2luZyIsImNsb25lU2xpZGUiLCJhY3RpdmVOYXYiLCJhY3RpdmVTbGlkZSIsImRpc2FibGVkQXJyb3ciLCJ3YXJuIiwibXNnIiwiY29uc29sZSIsImVycm9yIiwiX3R5cGVvZiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwib2JqIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCJjbGFzc0NhbGxDaGVjayIsImluc3RhbmNlIiwiQ29uc3RydWN0b3IiLCJUeXBlRXJyb3IiLCJjcmVhdGVDbGFzcyIsImRlZmluZVByb3BlcnRpZXMiLCJ0YXJnZXQiLCJwcm9wcyIsImkiLCJsZW5ndGgiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJrZXkiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJfZXh0ZW5kcyIsImFzc2lnbiIsImFyZ3VtZW50cyIsInNvdXJjZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImdldCIsIm9iamVjdCIsInByb3BlcnR5IiwicmVjZWl2ZXIiLCJGdW5jdGlvbiIsImRlc2MiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJ1bmRlZmluZWQiLCJwYXJlbnQiLCJnZXRQcm90b3R5cGVPZiIsInZhbHVlIiwiZ2V0dGVyIiwiaW5oZXJpdHMiLCJzdWJDbGFzcyIsInN1cGVyQ2xhc3MiLCJjcmVhdGUiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsInBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4iLCJzZWxmIiwiUmVmZXJlbmNlRXJyb3IiLCJ0b0ludCIsInBhcnNlSW50IiwidG9GbG9hdCIsInBhcnNlRmxvYXQiLCJpc1N0cmluZyIsImlzT2JqZWN0IiwiaXNOdW1iZXIiLCJpc0Z1bmN0aW9uIiwiaXNVbmRlZmluZWQiLCJpc0FycmF5IiwiQXJyYXkiLCJtb3VudCIsImdsaWRlIiwiZXh0ZW5zaW9ucyIsImV2ZW50cyIsImNvbXBvbmVudHMiLCJuYW1lIiwiX25hbWUiLCJkZWZpbmUiLCJwcm9wIiwiZGVmaW5pdGlvbiIsInNvcnRLZXlzIiwia2V5cyIsInNvcnQiLCJyZWR1Y2UiLCJyIiwiayIsIm1lcmdlT3B0aW9ucyIsInNldHRpbmdzIiwib3B0aW9ucyIsIkV2ZW50c0J1cyIsImhvcCIsIm9uIiwiZXZlbnQiLCJoYW5kbGVyIiwiaW5kZXgiLCJwdXNoIiwicmVtb3ZlIiwiZW1pdCIsImNvbnRleHQiLCJmb3JFYWNoIiwiaXRlbSIsIkdsaWRlIiwic2VsZWN0b3IiLCJfYyIsIl90IiwiX2UiLCJkaXNhYmxlZCIsIm1vdW50JCQxIiwibXV0YXRlIiwidHJhbnNmb3JtZXJzIiwidXBkYXRlIiwiZ28iLCJwYXR0ZXJuIiwiUnVuIiwibWFrZSIsIm1vdmUiLCJkaXN0YW5jZSIsIlRyYW5zaXRpb24iLCJkaXNhYmxlIiwiTW92ZSIsImRlc3Ryb3kiLCJwbGF5IiwiaW50ZXJ2YWwiLCJwYXVzZSIsImVuYWJsZSIsImlzVHlwZSIsImdldCQkMSIsIl9vIiwic2V0Iiwic2V0JCQxIiwibyIsIl9pIiwiX2QiLCJzdGF0dXMiLCJDb21wb25lbnRzIiwiRXZlbnRzIiwiX3RoaXMiLCJjYWxjdWxhdGUiLCJhZnRlciIsImlzU3RhcnQiLCJpc0VuZCIsImlzT2Zmc2V0Iiwic3RlcHMiLCJjb3VudGFibGVTdGVwcyIsIk1hdGgiLCJtaW4iLCJfbSIsInN0ZXAiLCJzdWJzdHIiLCJIdG1sIiwic2xpZGVzIiwibm93IiwiRGF0ZSIsImdldFRpbWUiLCJmdW5jIiwid2FpdCIsInRpbWVvdXQiLCJhcmdzIiwicmVzdWx0IiwicHJldmlvdXMiLCJsYXRlciIsImxlYWRpbmciLCJhcHBseSIsInRocm90dGxlZCIsImF0IiwicmVtYWluaW5nIiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJzZXRUaW1lb3V0IiwiY2FuY2VsIiwiTUFSR0lOX1RZUEUiLCJHYXBzIiwibGVuIiwic3R5bGUiLCJEaXJlY3Rpb24iLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiLCJTaXplcyIsIndyYXBwZXIiLCJjaGlsZHJlbiIsInNpYmxpbmdzIiwibm9kZSIsInBhcmVudE5vZGUiLCJuIiwiZmlyc3RDaGlsZCIsIm1hdGNoZWQiLCJuZXh0U2libGluZyIsIm5vZGVUeXBlIiwiZXhpc3QiLCJ3aW5kb3ciLCJIVE1MRWxlbWVudCIsIlRSQUNLX1NFTEVDVE9SIiwicm9vdCIsInRyYWNrIiwicXVlcnlTZWxlY3RvciIsInNsaWNlIiwiZmlsdGVyIiwic2xpZGUiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIl9yIiwiZG9jdW1lbnQiLCJ0IiwiUGVlayIsIl92IiwiYmVmb3JlIiwib2Zmc2V0IiwibW92ZW1lbnQiLCJzbGlkZVdpZHRoIiwidHJhbnNsYXRlIiwiaXMiLCJzZXR1cFNsaWRlcyIsIndpZHRoIiwic2V0dXBXcmFwcGVyIiwiZGltZW50aW9uIiwid3JhcHBlclNpemUiLCJvZmZzZXRXaWR0aCIsImdyb3ciLCJDbG9uZXMiLCJyZWR1Y3RvciIsIkJ1aWxkIiwidHlwZUNsYXNzIiwiYWN0aXZlQ2xhc3MiLCJhZGQiLCJzaWJsaW5nIiwicmVtb3ZlQ2xhc3NlcyIsIml0ZW1zIiwiY29sbGVjdCIsIl9HbGlkZSRzZXR0aW5ncyIsInBlZWtJbmNyZW1lbnRlciIsInBhcnQiLCJzdGFydCIsImVuZCIsIm1heCIsImZsb29yIiwiY2xvbmUiLCJjbG9uZU5vZGUiLCJfY2xvbmUiLCJ1bnNoaWZ0IiwiYXBwZW5kIiwiX0NvbXBvbmVudHMkSHRtbCIsImhhbGYiLCJwcmVwZW5kIiwicmV2ZXJzZSIsImFwcGVuZENoaWxkIiwiX2kyIiwiaW5zZXJ0QmVmb3JlIiwiX2kzIiwicmVtb3ZlQ2hpbGQiLCJFdmVudHNCaW5kZXIiLCJsaXN0ZW5lcnMiLCJlbCIsImNsb3N1cmUiLCJjYXB0dXJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9mZiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJSZXNpemUiLCJCaW5kZXIiLCJiaW5kIiwidW5iaW5kIiwiVkFMSURfRElSRUNUSU9OUyIsIkZMSVBFRF9NT1ZFTUVOVFMiLCJyZXNvbHZlIiwidG9rZW4iLCJzcGxpdCIsImpvaW4iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaW5kZXhPZiIsIlJ0bCIsIm1vZGlmeSIsIkdhcCIsIkdyb3ciLCJQZWVraW5nIiwiRm9jdXNpbmciLCJtdXRhdG9yIiwiVFJBTlNGT1JNRVJTIiwiY29uY2F0IiwidHJhbnNmb3JtZXIiLCJUcmFuc2xhdGUiLCJ0cmFuc2Zvcm0iLCJjb21wb3NlIiwiZHVyYXRpb24iLCJ0cmFuc2l0aW9uIiwiY2FsbGJhY2siLCJzdXBwb3J0c1Bhc3NpdmUiLCJvcHRzIiwiZSIsInN1cHBvcnRzUGFzc2l2ZSQxIiwiU1RBUlRfRVZFTlRTIiwiTU9WRV9FVkVOVFMiLCJFTkRfRVZFTlRTIiwiTU9VU0VfRVZFTlRTIiwiU3dpcGUiLCJzd2lwZVNpbiIsInN3aXBlU3RhcnRYIiwic3dpcGVTdGFydFkiLCJwYXNzaXZlIiwiYmluZFN3aXBlU3RhcnQiLCJzd2lwZSIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiYmluZFN3aXBlTW92ZSIsImJpbmRTd2lwZUVuZCIsInN1YkV4U3giLCJzdWJFeVN5IiwicG93RVgiLCJhYnMiLCJwb3dFWSIsInN3aXBlSHlwb3RlbnVzZSIsInNxcnQiLCJzd2lwZUNhdGhldHVzIiwiYXNpbiIsIlBJIiwic3RvcFByb3BhZ2F0aW9uIiwidGhyZXNob2xkIiwic3dpcGVEaXN0YW5jZSIsInN3aXBlRGVnIiwicm91bmQiLCJ1bmJpbmRTd2lwZU1vdmUiLCJ1bmJpbmRTd2lwZUVuZCIsInVuYmluZFN3aXBlU3RhcnQiLCJfdGhpczIiLCJfdGhpczMiLCJjaGFuZ2VkVG91Y2hlcyIsIkltYWdlcyIsImRyYWdzdGFydCIsInByZXZlbnREZWZhdWx0IiwiQW5jaG9ycyIsImRldGFjaGVkIiwicHJldmVudGVkIiwiX2EiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2xpY2siLCJkZXRhY2giLCJkcmFnZ2FibGUiLCJzZXRBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJhdHRhY2giLCJOQVZfU0VMRUNUT1IiLCJDT05UUk9MU19TRUxFQ1RPUiIsIkNvbnRyb2xzIiwiX24iLCJhZGRCaW5kaW5ncyIsInNldEFjdGl2ZSIsInJlbW92ZUFjdGl2ZSIsImNvbnRyb2xzIiwicmVtb3ZlQmluZGluZ3MiLCJlbGVtZW50cyIsImN1cnJlbnRUYXJnZXQiLCJLZXlib2FyZCIsInByZXNzIiwia2V5Q29kZSIsIkF1dG9wbGF5Iiwic2V0SW50ZXJ2YWwiLCJzdG9wIiwidGltZSIsImNsZWFySW50ZXJ2YWwiLCJzb3J0QnJlYWtwb2ludHMiLCJwb2ludHMiLCJCcmVha3BvaW50cyIsIm1hdGNoIiwibWF0Y2hNZWRpYSIsInBvaW50IiwibWF0Y2hlcyIsIkNPTVBPTkVOVFMiLCJHbGlkZSQxIiwiX0NvcmUiLCJHbGlkZSQkMSIsImNvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7O0VBQUE7Ozs7O0VBTUEsSUFBSUEsUUFBUSxHQUFHO0VBQ2I7Ozs7Ozs7OztFQVNBQyxFQUFBQSxJQUFJLEVBQUUsUUFWTzs7RUFZYjs7Ozs7RUFLQUMsRUFBQUEsT0FBTyxFQUFFLENBakJJOztFQW1CYjs7Ozs7RUFLQUMsRUFBQUEsT0FBTyxFQUFFLENBeEJJOztFQTBCYjs7Ozs7Ozs7O0VBU0FDLEVBQUFBLE9BQU8sRUFBRSxDQW5DSTs7RUFxQ2I7Ozs7O0VBS0FDLEVBQUFBLEdBQUcsRUFBRSxFQTFDUTs7RUE0Q2I7Ozs7O0VBS0FDLEVBQUFBLFFBQVEsRUFB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
