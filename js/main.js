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
    startAt: 0,
    gap: 30,
    animationDuration: 5000
  };
  const config2 = {
    type: "carousel",
    startAt: 0,
    gap: 30,
    animationDuration: 5000,
    autoplay: 5000,
    hoverpause: true
  };
  new Glide$1(".glide", config).mount();
  new Glide$1(".glide2", config2).mount();
  var mymap = L.map("mapid").setView([40.6512, -73.8504], 13);
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoicnVkb2xmdG9sc2tpeSIsImEiOiJja2JnOHJ6OG4xMzRqMzBwOGhsa3B0bmw3In0.8itngzwV6L7DW9jnFYpqQw"
  }).addTo(mymap);
  var marker = L.marker([40.6712, -73.8504]).addTo(mymap);

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL0BnbGlkZWpzL2dsaWRlL2Rpc3QvZ2xpZGUuZXNtLmpzIiwic3JjL2pzL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBHbGlkZS5qcyB2My40LjFcbiAqIChjKSAyMDEzLTIwMTkgSsSZZHJ6ZWogQ2hhxYJ1YmVrIDxqZWRyemVqLmNoYWx1YmVrQGdtYWlsLmNvbT4gKGh0dHA6Ly9qZWRyemVqY2hhbHViZWsuY29tLylcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBUeXBlIG9mIHRoZSBtb3ZlbWVudC5cbiAgICpcbiAgICogQXZhaWxhYmxlIHR5cGVzOlxuICAgKiBgc2xpZGVyYCAtIFJld2luZHMgc2xpZGVyIHRvIHRoZSBzdGFydC9lbmQgd2hlbiBpdCByZWFjaGVzIHRoZSBmaXJzdCBvciBsYXN0IHNsaWRlLlxuICAgKiBgY2Fyb3VzZWxgIC0gQ2hhbmdlcyBzbGlkZXMgd2l0aG91dCBzdGFydGluZyBvdmVyIHdoZW4gaXQgcmVhY2hlcyB0aGUgZmlyc3Qgb3IgbGFzdCBzbGlkZS5cbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIHR5cGU6ICdzbGlkZXInLFxuXG4gIC8qKlxuICAgKiBTdGFydCBhdCBzcGVjaWZpYyBzbGlkZSBudW1iZXIgZGVmaW5lZCB3aXRoIHplcm8tYmFzZWQgaW5kZXguXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBzdGFydEF0OiAwLFxuXG4gIC8qKlxuICAgKiBBIG51bWJlciBvZiBzbGlkZXMgdmlzaWJsZSBvbiB0aGUgc2luZ2xlIHZpZXdwb3J0LlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgcGVyVmlldzogMSxcblxuICAvKipcbiAgICogRm9jdXMgY3VycmVudGx5IGFjdGl2ZSBzbGlkZSBhdCBhIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGUgdHJhY2suXG4gICAqXG4gICAqIEF2YWlsYWJsZSBpbnB1dHM6XG4gICAqIGBjZW50ZXJgIC0gQ3VycmVudCBzbGlkZSB3aWxsIGJlIGFsd2F5cyBmb2N1c2VkIGF0IHRoZSBjZW50ZXIgb2YgYSB0cmFjay5cbiAgICogYDAsMSwyLDMuLi5gIC0gQ3VycmVudCBzbGlkZSB3aWxsIGJlIGZvY3VzZWQgb24gdGhlIHNwZWNpZmllZCB6ZXJvLWJhc2VkIGluZGV4LlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfE51bWJlcn1cbiAgICovXG4gIGZvY3VzQXQ6IDAsXG5cbiAgLyoqXG4gICAqIEEgc2l6ZSBvZiB0aGUgZ2FwIGFkZGVkIGJldHdlZW4gc2xpZGVzLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgZ2FwOiAxMCxcblxuICAvKipcbiAgICogQ2hhbmdlIHNsaWRlcyBhZnRlciBhIHNwZWNpZmllZCBpbnRlcnZhbC4gVXNlIGBmYWxzZWAgZm9yIHR1cm5pbmcgb2ZmIGF1dG9wbGF5LlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfEJvb2xlYW59XG4gICAqL1xuICBhdXRvcGxheTogZmFsc2UsXG5cbiAgLyoqXG4gICAqIFN0b3AgYXV0b3BsYXkgb24gbW91c2VvdmVyIGV2ZW50LlxuICAgKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIGhvdmVycGF1c2U6IHRydWUsXG5cbiAgLyoqXG4gICAqIEFsbG93IGZvciBjaGFuZ2luZyBzbGlkZXMgd2l0aCBsZWZ0IGFuZCByaWdodCBrZXlib2FyZCBhcnJvd3MuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAga2V5Ym9hcmQ6IHRydWUsXG5cbiAgLyoqXG4gICAqIFN0b3AgcnVubmluZyBgcGVyVmlld2AgbnVtYmVyIG9mIHNsaWRlcyBmcm9tIHRoZSBlbmQuIFVzZSB0aGlzXG4gICAqIG9wdGlvbiBpZiB5b3UgZG9uJ3Qgd2FudCB0byBoYXZlIGFuIGVtcHR5IHNwYWNlIGFmdGVyXG4gICAqIGEgc2xpZGVyLiBXb3JrcyBvbmx5IHdpdGggYHNsaWRlcmAgdHlwZSBhbmQgYVxuICAgKiBub24tY2VudGVyZWQgYGZvY3VzQXRgIHNldHRpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgYm91bmQ6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBNaW5pbWFsIHN3aXBlIGRpc3RhbmNlIG5lZWRlZCB0byBjaGFuZ2UgdGhlIHNsaWRlLiBVc2UgYGZhbHNlYCBmb3IgdHVybmluZyBvZmYgYSBzd2lwaW5nLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfEJvb2xlYW59XG4gICAqL1xuICBzd2lwZVRocmVzaG9sZDogODAsXG5cbiAgLyoqXG4gICAqIE1pbmltYWwgbW91c2UgZHJhZyBkaXN0YW5jZSBuZWVkZWQgdG8gY2hhbmdlIHRoZSBzbGlkZS4gVXNlIGBmYWxzZWAgZm9yIHR1cm5pbmcgb2ZmIGEgZHJhZ2dpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIGRyYWdUaHJlc2hvbGQ6IDEyMCxcblxuICAvKipcbiAgICogQSBtYXhpbXVtIG51bWJlciBvZiBzbGlkZXMgdG8gd2hpY2ggbW92ZW1lbnQgd2lsbCBiZSBtYWRlIG9uIHN3aXBpbmcgb3IgZHJhZ2dpbmcuIFVzZSBgZmFsc2VgIGZvciB1bmxpbWl0ZWQuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIHBlclRvdWNoOiBmYWxzZSxcblxuICAvKipcbiAgICogTW92aW5nIGRpc3RhbmNlIHJhdGlvIG9mIHRoZSBzbGlkZXMgb24gYSBzd2lwaW5nIGFuZCBkcmFnZ2luZy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHRvdWNoUmF0aW86IDAuNSxcblxuICAvKipcbiAgICogQW5nbGUgcmVxdWlyZWQgdG8gYWN0aXZhdGUgc2xpZGVzIG1vdmluZyBvbiBzd2lwaW5nIG9yIGRyYWdnaW5nLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgdG91Y2hBbmdsZTogNDUsXG5cbiAgLyoqXG4gICAqIER1cmF0aW9uIG9mIHRoZSBhbmltYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgYW5pbWF0aW9uRHVyYXRpb246IDQwMCxcblxuICAvKipcbiAgICogQWxsb3dzIGxvb3BpbmcgdGhlIGBzbGlkZXJgIHR5cGUuIFNsaWRlciB3aWxsIHJld2luZCB0byB0aGUgZmlyc3QvbGFzdCBzbGlkZSB3aGVuIGl0J3MgYXQgdGhlIHN0YXJ0L2VuZC5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICByZXdpbmQ6IHRydWUsXG5cbiAgLyoqXG4gICAqIER1cmF0aW9uIG9mIHRoZSByZXdpbmRpbmcgYW5pbWF0aW9uIG9mIHRoZSBgc2xpZGVyYCB0eXBlIGluIG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHJld2luZER1cmF0aW9uOiA4MDAsXG5cbiAgLyoqXG4gICAqIEVhc2luZyBmdW5jdGlvbiBmb3IgdGhlIGFuaW1hdGlvbi5cbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGFuaW1hdGlvblRpbWluZ0Z1bmM6ICdjdWJpYy1iZXppZXIoLjE2NSwgLjg0MCwgLjQ0MCwgMSknLFxuXG4gIC8qKlxuICAgKiBUaHJvdHRsZSBjb3N0bHkgZXZlbnRzIGF0IG1vc3Qgb25jZSBwZXIgZXZlcnkgd2FpdCBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICB0aHJvdHRsZTogMTAsXG5cbiAgLyoqXG4gICAqIE1vdmluZyBkaXJlY3Rpb24gbW9kZS5cbiAgICpcbiAgICogQXZhaWxhYmxlIGlucHV0czpcbiAgICogLSAnbHRyJyAtIGxlZnQgdG8gcmlnaHQgbW92ZW1lbnQsXG4gICAqIC0gJ3J0bCcgLSByaWdodCB0byBsZWZ0IG1vdmVtZW50LlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZGlyZWN0aW9uOiAnbHRyJyxcblxuICAvKipcbiAgICogVGhlIGRpc3RhbmNlIHZhbHVlIG9mIHRoZSBuZXh0IGFuZCBwcmV2aW91cyB2aWV3cG9ydHMgd2hpY2hcbiAgICogaGF2ZSB0byBwZWVrIGluIHRoZSBjdXJyZW50IHZpZXcuIEFjY2VwdHMgbnVtYmVyIGFuZFxuICAgKiBwaXhlbHMgYXMgYSBzdHJpbmcuIExlZnQgYW5kIHJpZ2h0IHBlZWtpbmcgY2FuIGJlXG4gICAqIHNldCB1cCBzZXBhcmF0ZWx5IHdpdGggYSBkaXJlY3Rpb25zIG9iamVjdC5cbiAgICpcbiAgICogRm9yIGV4YW1wbGU6XG4gICAqIGAxMDBgIC0gUGVlayAxMDBweCBvbiB0aGUgYm90aCBzaWRlcy5cbiAgICogeyBiZWZvcmU6IDEwMCwgYWZ0ZXI6IDUwIH1gIC0gUGVlayAxMDBweCBvbiB0aGUgbGVmdCBzaWRlIGFuZCA1MHB4IG9uIHRoZSByaWdodCBzaWRlLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfFN0cmluZ3xPYmplY3R9XG4gICAqL1xuICBwZWVrOiAwLFxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG9wdGlvbnMgYXBwbGllZCBhdCBzcGVjaWZpZWQgbWVkaWEgYnJlYWtwb2ludHMuXG4gICAqIEZvciBleGFtcGxlOiBkaXNwbGF5IHR3byBzbGlkZXMgcGVyIHZpZXcgdW5kZXIgODAwcHguXG4gICAqIGB7XG4gICAqICAgJzgwMHB4Jzoge1xuICAgKiAgICAgcGVyVmlldzogMlxuICAgKiAgIH1cbiAgICogfWBcbiAgICovXG4gIGJyZWFrcG9pbnRzOiB7fSxcblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBpbnRlcm5hbGx5IHVzZWQgSFRNTCBjbGFzc2VzLlxuICAgKlxuICAgKiBAdG9kbyBSZWZhY3RvciBgc2xpZGVyYCBhbmQgYGNhcm91c2VsYCBwcm9wZXJ0aWVzIHRvIHNpbmdsZSBgdHlwZTogeyBzbGlkZXI6ICcnLCBjYXJvdXNlbDogJycgfWAgb2JqZWN0XG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBjbGFzc2VzOiB7XG4gICAgZGlyZWN0aW9uOiB7XG4gICAgICBsdHI6ICdnbGlkZS0tbHRyJyxcbiAgICAgIHJ0bDogJ2dsaWRlLS1ydGwnXG4gICAgfSxcbiAgICBzbGlkZXI6ICdnbGlkZS0tc2xpZGVyJyxcbiAgICBjYXJvdXNlbDogJ2dsaWRlLS1jYXJvdXNlbCcsXG4gICAgc3dpcGVhYmxlOiAnZ2xpZGUtLXN3aXBlYWJsZScsXG4gICAgZHJhZ2dpbmc6ICdnbGlkZS0tZHJhZ2dpbmcnLFxuICAgIGNsb25lU2xpZGU6ICdnbGlkZV9fc2xpZGUtLWNsb25lJyxcbiAgICBhY3RpdmVOYXY6ICdnbGlkZV9fYnVsbGV0LS1hY3RpdmUnLFxuICAgIGFjdGl2ZVNsaWRlOiAnZ2xpZGVfX3NsaWRlLS1hY3RpdmUnLFxuICAgIGRpc2FibGVkQXJyb3c6ICdnbGlkZV9fYXJyb3ctLWRpc2FibGVkJ1xuICB9XG59O1xuXG4vKipcbiAqIE91dHB1dHMgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBib3dzZXIgY29uc29sZS5cbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IG1zZ1xuICogQHJldHVybiB7Vm9pZH1cbiAqL1xuZnVuY3Rpb24gd2Fybihtc2cpIHtcbiAgY29uc29sZS5lcnJvcihcIltHbGlkZSB3YXJuXTogXCIgKyBtc2cpO1xufVxuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xufTtcblxudmFyIGNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbnZhciBjcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbnZhciBnZXQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcblxuICAgIGlmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykge1xuICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHZhciBnZXR0ZXIgPSBkZXNjLmdldDtcblxuICAgIGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpO1xuICB9XG59O1xuXG52YXIgaW5oZXJpdHMgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59O1xuXG52YXIgcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyB2YWx1ZSBlbnRlcmVkIGFzIG51bWJlclxuICogb3Igc3RyaW5nIHRvIGludGVnZXIgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICovXG5mdW5jdGlvbiB0b0ludCh2YWx1ZSkge1xuICByZXR1cm4gcGFyc2VJbnQodmFsdWUpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIHZhbHVlIGVudGVyZWQgYXMgbnVtYmVyXG4gKiBvciBzdHJpbmcgdG8gZmxhdCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIHRvRmxvYXQodmFsdWUpIHtcbiAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpO1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtICB7Kn0gICB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmVcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKTtcblxuICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlID09PSAnb2JqZWN0JyAmJiAhIXZhbHVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW1peGVkLW9wZXJhdG9yc1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBudW1iZXIuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgdW5kZWZpbmVkLlxuICpcbiAqIEBwYXJhbSAgeyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGFuIGFycmF5LlxuICpcbiAqIEBwYXJhbSAgeyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgaW5pdGlhbGl6ZXMgc3BlY2lmaWVkIGNvbGxlY3Rpb24gb2YgZXh0ZW5zaW9ucy5cbiAqIEVhY2ggZXh0ZW5zaW9uIHJlY2VpdmVzIGFjY2VzcyB0byBpbnN0YW5jZSBvZiBnbGlkZSBhbmQgcmVzdCBvZiBjb21wb25lbnRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBnbGlkZVxuICogQHBhcmFtIHtPYmplY3R9IGV4dGVuc2lvbnNcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBtb3VudChnbGlkZSwgZXh0ZW5zaW9ucywgZXZlbnRzKSB7XG4gIHZhciBjb21wb25lbnRzID0ge307XG5cbiAgZm9yICh2YXIgbmFtZSBpbiBleHRlbnNpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oZXh0ZW5zaW9uc1tuYW1lXSkpIHtcbiAgICAgIGNvbXBvbmVudHNbbmFtZV0gPSBleHRlbnNpb25zW25hbWVdKGdsaWRlLCBjb21wb25lbnRzLCBldmVudHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3YXJuKCdFeHRlbnNpb24gbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgX25hbWUgaW4gY29tcG9uZW50cykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbXBvbmVudHNbX25hbWVdLm1vdW50KSkge1xuICAgICAgY29tcG9uZW50c1tfbmFtZV0ubW91bnQoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29tcG9uZW50cztcbn1cblxuLyoqXG4gKiBEZWZpbmVzIGdldHRlciBhbmQgc2V0dGVyIHByb3BlcnR5IG9uIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqICAgICAgICAgT2JqZWN0IHdoZXJlIHByb3BlcnR5IGhhcyB0byBiZSBkZWZpbmVkLlxuICogQHBhcmFtICB7U3RyaW5nfSBwcm9wICAgICAgICBOYW1lIG9mIHRoZSBkZWZpbmVkIHByb3BlcnR5LlxuICogQHBhcmFtICB7T2JqZWN0fSBkZWZpbml0aW9uICBHZXQgYW5kIHNldCBkZWZpbml0aW9ucyBmb3IgdGhlIHByb3BlcnR5LlxuICogQHJldHVybiB7Vm9pZH1cbiAqL1xuZnVuY3Rpb24gZGVmaW5lKG9iaiwgcHJvcCwgZGVmaW5pdGlvbikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCBkZWZpbml0aW9uKTtcbn1cblxuLyoqXG4gKiBTb3J0cyBhcGhhYmV0aWNhbGx5IG9iamVjdCBrZXlzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIHNvcnRLZXlzKG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5zb3J0KCkucmVkdWNlKGZ1bmN0aW9uIChyLCBrKSB7XG4gICAgcltrXSA9IG9ialtrXTtcblxuICAgIHJldHVybiByW2tdLCByO1xuICB9LCB7fSk7XG59XG5cbi8qKlxuICogTWVyZ2VzIHBhc3NlZCBzZXR0aW5ncyBvYmplY3Qgd2l0aCBkZWZhdWx0IG9wdGlvbnMuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBkZWZhdWx0c1xuICogQHBhcmFtICB7T2JqZWN0fSBzZXR0aW5nc1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBtZXJnZU9wdGlvbnMoZGVmYXVsdHMsIHNldHRpbmdzKSB7XG4gIHZhciBvcHRpb25zID0gX2V4dGVuZHMoe30sIGRlZmF1bHRzLCBzZXR0aW5ncyk7XG5cbiAgLy8gYE9iamVjdC5hc3NpZ25gIGRvIG5vdCBkZWVwbHkgbWVyZ2Ugb2JqZWN0cywgc28gd2VcbiAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseSBmb3IgZXZlcnkgbmVzdGVkIG9iamVjdFxuICAvLyBpbiBvcHRpb25zLiBBbHRob3VnaCBpdCBkb2VzIG5vdCBsb29rIHNtYXJ0LFxuICAvLyBpdCdzIHNtYWxsZXIgYW5kIGZhc3RlciB0aGFuIHNvbWUgZmFuY3lcbiAgLy8gbWVyZ2luZyBkZWVwLW1lcmdlIGFsZ29yaXRobSBzY3JpcHQuXG4gIGlmIChzZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eSgnY2xhc3NlcycpKSB7XG4gICAgb3B0aW9ucy5jbGFzc2VzID0gX2V4dGVuZHMoe30sIGRlZmF1bHRzLmNsYXNzZXMsIHNldHRpbmdzLmNsYXNzZXMpO1xuXG4gICAgaWYgKHNldHRpbmdzLmNsYXNzZXMuaGFzT3duUHJvcGVydHkoJ2RpcmVjdGlvbicpKSB7XG4gICAgICBvcHRpb25zLmNsYXNzZXMuZGlyZWN0aW9uID0gX2V4dGVuZHMoe30sIGRlZmF1bHRzLmNsYXNzZXMuZGlyZWN0aW9uLCBzZXR0aW5ncy5jbGFzc2VzLmRpcmVjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgaWYgKHNldHRpbmdzLmhhc093blByb3BlcnR5KCdicmVha3BvaW50cycpKSB7XG4gICAgb3B0aW9ucy5icmVha3BvaW50cyA9IF9leHRlbmRzKHt9LCBkZWZhdWx0cy5icmVha3BvaW50cywgc2V0dGluZ3MuYnJlYWtwb2ludHMpO1xuICB9XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbnZhciBFdmVudHNCdXMgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBFdmVudEJ1cyBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50c1xuICAgKi9cbiAgZnVuY3Rpb24gRXZlbnRzQnVzKCkge1xuICAgIHZhciBldmVudHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50c0J1cyk7XG5cbiAgICB0aGlzLmV2ZW50cyA9IGV2ZW50cztcbiAgICB0aGlzLmhvcCA9IGV2ZW50cy5oYXNPd25Qcm9wZXJ0eTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGxpc3RlbmVyIHRvIHRoZSBzcGVjaWZlZCBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG5cblxuICBjcmVhdGVDbGFzcyhFdmVudHNCdXMsIFt7XG4gICAga2V5OiAnb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbihldmVudCwgaGFuZGxlcikge1xuICAgICAgaWYgKGlzQXJyYXkoZXZlbnQpKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLm9uKGV2ZW50W2ldLCBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDcmVhdGUgdGhlIGV2ZW50J3Mgb2JqZWN0IGlmIG5vdCB5ZXQgY3JlYXRlZFxuICAgICAgaWYgKCF0aGlzLmhvcC5jYWxsKHRoaXMuZXZlbnRzLCBldmVudCkpIHtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW107XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCB0aGUgaGFuZGxlciB0byBxdWV1ZVxuICAgICAgdmFyIGluZGV4ID0gdGhpcy5ldmVudHNbZXZlbnRdLnB1c2goaGFuZGxlcikgLSAxO1xuXG4gICAgICAvLyBQcm92aWRlIGhhbmRsZSBiYWNrIGZvciByZW1vdmFsIG9mIGV2ZW50XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5ldmVudHNbZXZlbnRdW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSdW5zIHJlZ2lzdGVyZWQgaGFuZGxlcnMgZm9yIHNwZWNpZmllZCBldmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBldmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0PX0gY29udGV4dFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdlbWl0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW1pdChldmVudCwgY29udGV4dCkge1xuICAgICAgaWYgKGlzQXJyYXkoZXZlbnQpKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmVtaXQoZXZlbnRbaV0sIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZSBldmVudCBkb2Vzbid0IGV4aXN0LCBvciB0aGVyZSdzIG5vIGhhbmRsZXJzIGluIHF1ZXVlLCBqdXN0IGxlYXZlXG4gICAgICBpZiAoIXRoaXMuaG9wLmNhbGwodGhpcy5ldmVudHMsIGV2ZW50KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEN5Y2xlIHRocm91Z2ggZXZlbnRzIHF1ZXVlLCBmaXJlIVxuICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaXRlbShjb250ZXh0IHx8IHt9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRXZlbnRzQnVzO1xufSgpO1xuXG52YXIgR2xpZGUgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBnbGlkZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gc2VsZWN0b3JcclxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnNcclxuICAgKi9cbiAgZnVuY3Rpb24gR2xpZGUoc2VsZWN0b3IpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgR2xpZGUpO1xuXG4gICAgdGhpcy5fYyA9IHt9O1xuICAgIHRoaXMuX3QgPSBbXTtcbiAgICB0aGlzLl9lID0gbmV3IEV2ZW50c0J1cygpO1xuXG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICB0aGlzLnNldHRpbmdzID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICB0aGlzLmluZGV4ID0gdGhpcy5zZXR0aW5ncy5zdGFydEF0O1xuICB9XG5cbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZXMgZ2xpZGUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5zaW9ucyBDb2xsZWN0aW9uIG9mIGV4dGVuc2lvbnMgdG8gaW5pdGlhbGl6ZS5cclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cblxuXG4gIGNyZWF0ZUNsYXNzKEdsaWRlLCBbe1xuICAgIGtleTogJ21vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbW91bnQkJDEoKSB7XG4gICAgICB2YXIgZXh0ZW5zaW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICAgIHRoaXMuX2UuZW1pdCgnbW91bnQuYmVmb3JlJyk7XG5cbiAgICAgIGlmIChpc09iamVjdChleHRlbnNpb25zKSkge1xuICAgICAgICB0aGlzLl9jID0gbW91bnQodGhpcywgZXh0ZW5zaW9ucywgdGhpcy5fZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKCdZb3UgbmVlZCB0byBwcm92aWRlIGEgb2JqZWN0IG9uIGBtb3VudCgpYCcpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9lLmVtaXQoJ21vdW50LmFmdGVyJyk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogQ29sbGVjdHMgYW4gaW5zdGFuY2UgYHRyYW5zbGF0ZWAgdHJhbnNmb3JtZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge0FycmF5fSB0cmFuc2Zvcm1lcnMgQ29sbGVjdGlvbiBvZiB0cmFuc2Zvcm1lcnMuXHJcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ211dGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG11dGF0ZSgpIHtcbiAgICAgIHZhciB0cmFuc2Zvcm1lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuXG4gICAgICBpZiAoaXNBcnJheSh0cmFuc2Zvcm1lcnMpKSB7XG4gICAgICAgIHRoaXMuX3QgPSB0cmFuc2Zvcm1lcnM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKCdZb3UgbmVlZCB0byBwcm92aWRlIGEgYXJyYXkgb24gYG11dGF0ZSgpYCcpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgZ2xpZGUgd2l0aCBzcGVjaWZpZWQgc2V0dGluZ3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICB2YXIgc2V0dGluZ3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gICAgICB0aGlzLnNldHRpbmdzID0gbWVyZ2VPcHRpb25zKHRoaXMuc2V0dGluZ3MsIHNldHRpbmdzKTtcblxuICAgICAgaWYgKHNldHRpbmdzLmhhc093blByb3BlcnR5KCdzdGFydEF0JykpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IHNldHRpbmdzLnN0YXJ0QXQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2UuZW1pdCgndXBkYXRlJyk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlIHNsaWRlIHdpdGggc3BlY2lmaWVkIHBhdHRlcm4uIEEgcGF0dGVybiBtdXN0IGJlIGluIHRoZSBzcGVjaWFsIGZvcm1hdDpcclxuICAgICAqIGA+YCAtIE1vdmUgb25lIGZvcndhcmRcclxuICAgICAqIGA8YCAtIE1vdmUgb25lIGJhY2t3YXJkXHJcbiAgICAgKiBgPXtpfWAgLSBHbyB0byB7aX0gemVyby1iYXNlZCBzbGlkZSAoZXEuICc9MScsIHdpbGwgZ28gdG8gc2Vjb25kIHNsaWRlKVxyXG4gICAgICogYD4+YCAtIFJld2luZHMgdG8gZW5kIChsYXN0IHNsaWRlKVxyXG4gICAgICogYDw8YCAtIFJld2luZHMgdG8gc3RhcnQgKGZpcnN0IHNsaWRlKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXR0ZXJuXHJcbiAgICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnbycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdvKHBhdHRlcm4pIHtcbiAgICAgIHRoaXMuX2MuUnVuLm1ha2UocGF0dGVybik7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogTW92ZSB0cmFjayBieSBzcGVjaWZpZWQgZGlzdGFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRpc3RhbmNlXHJcbiAgICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdtb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbW92ZShkaXN0YW5jZSkge1xuICAgICAgdGhpcy5fYy5UcmFuc2l0aW9uLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX2MuTW92ZS5tYWtlKGRpc3RhbmNlKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBEZXN0cm95IGluc3RhbmNlIGFuZCByZXZlcnQgYWxsIGNoYW5nZXMgZG9uZSBieSB0aGlzLl9jLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdGhpcy5fZS5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgaW5zdGFuY2UgYXV0b3BsYXlpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufE51bWJlcn0gaW50ZXJ2YWwgUnVuIGF1dG9wbGF5aW5nIHdpdGggcGFzc2VkIGludGVydmFsIHJlZ2FyZGxlc3Mgb2YgYGF1dG9wbGF5YCBzZXR0aW5nc1xyXG4gICAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncGxheScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICB2YXIgaW50ZXJ2YWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGZhbHNlO1xuXG4gICAgICBpZiAoaW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5hdXRvcGxheSA9IGludGVydmFsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9lLmVtaXQoJ3BsYXknKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wIGluc3RhbmNlIGF1dG9wbGF5aW5nLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3BhdXNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICB0aGlzLl9lLmVtaXQoJ3BhdXNlJyk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU2V0cyBnbGlkZSBpbnRvIGEgaWRsZSBzdGF0dXMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGlzYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGdsaWRlIGludG8gYSBhY3RpdmUgc3RhdHVzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2VuYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGN1dXRvbSBldmVudCBsaXN0ZW5lciB3aXRoIGhhbmRsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfEFycmF5fSBldmVudFxyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuICAgICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24oZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIHRoaXMuX2Uub24oZXZlbnQsIGhhbmRsZXIpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBnbGlkZSBpcyBhIHByZWNpc2VkIHR5cGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2lzVHlwZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzVHlwZShuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy50eXBlID09PSBuYW1lO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgY29yZSBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzZXR0aW5ncycsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFNldHMgdmFsdWUgb2YgdGhlIGNvcmUgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG9cclxuICAgICAqIEByZXR1cm4ge1ZvaWR9XHJcbiAgICAgKi9cbiAgICAsXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEobykge1xuICAgICAgaWYgKGlzT2JqZWN0KG8pKSB7XG4gICAgICAgIHRoaXMuX28gPSBvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybignT3B0aW9ucyBtdXN0IGJlIGFuIGBvYmplY3RgIGluc3RhbmNlLicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogR2V0cyBjdXJyZW50IGluZGV4IG9mIHRoZSBzbGlkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2luZGV4JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU2V0cyBjdXJyZW50IGluZGV4IGEgc2xpZGVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgICAqL1xuICAgICxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMShpKSB7XG4gICAgICB0aGlzLl9pID0gdG9JbnQoaSk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHR5cGUgbmFtZSBvZiB0aGUgc2xpZGVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd0eXBlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnR5cGU7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBpZGxlIHN0YXR1cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2Rpc2FibGVkJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0aGUgaWRsZSBzdGF0dXMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xuICAgICxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMShzdGF0dXMpIHtcbiAgICAgIHRoaXMuX2QgPSAhIXN0YXR1cztcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEdsaWRlO1xufSgpO1xuXG5mdW5jdGlvbiBSdW4gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgdmFyIFJ1biA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhdXRvcnVubmluZyBvZiB0aGUgZ2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMuX28gPSBmYWxzZTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyBnbGlkZXMgcnVubmluZyBiYXNlZCBvbiB0aGUgcGFzc2VkIG1vdmluZyBzY2hlbWEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbW92ZVxuICAgICAqL1xuICAgIG1ha2U6IGZ1bmN0aW9uIG1ha2UobW92ZSkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKCFHbGlkZS5kaXNhYmxlZCkge1xuICAgICAgICBHbGlkZS5kaXNhYmxlKCk7XG5cbiAgICAgICAgdGhpcy5tb3ZlID0gbW92ZTtcblxuICAgICAgICBFdmVudHMuZW1pdCgncnVuLmJlZm9yZScsIHRoaXMubW92ZSk7XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGUoKTtcblxuICAgICAgICBFdmVudHMuZW1pdCgncnVuJywgdGhpcy5tb3ZlKTtcblxuICAgICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uYWZ0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChfdGhpcy5pc1N0YXJ0KCkpIHtcbiAgICAgICAgICAgIEV2ZW50cy5lbWl0KCdydW4uc3RhcnQnLCBfdGhpcy5tb3ZlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX3RoaXMuaXNFbmQoKSkge1xuICAgICAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5lbmQnLCBfdGhpcy5tb3ZlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX3RoaXMuaXNPZmZzZXQoJzwnKSB8fCBfdGhpcy5pc09mZnNldCgnPicpKSB7XG4gICAgICAgICAgICBfdGhpcy5fbyA9IGZhbHNlO1xuXG4gICAgICAgICAgICBFdmVudHMuZW1pdCgncnVuLm9mZnNldCcsIF90aGlzLm1vdmUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIEV2ZW50cy5lbWl0KCdydW4uYWZ0ZXInLCBfdGhpcy5tb3ZlKTtcblxuICAgICAgICAgIEdsaWRlLmVuYWJsZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIGN1cnJlbnQgaW5kZXggYmFzZWQgb24gZGVmaW5lZCBtb3ZlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBjYWxjdWxhdGU6IGZ1bmN0aW9uIGNhbGN1bGF0ZSgpIHtcbiAgICAgIHZhciBtb3ZlID0gdGhpcy5tb3ZlLFxuICAgICAgICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICAgICAgdmFyIHN0ZXBzID0gbW92ZS5zdGVwcyxcbiAgICAgICAgICBkaXJlY3Rpb24gPSBtb3ZlLmRpcmVjdGlvbjtcblxuXG4gICAgICB2YXIgY291bnRhYmxlU3RlcHMgPSBpc051bWJlcih0b0ludChzdGVwcykpICYmIHRvSW50KHN0ZXBzKSAhPT0gMDtcblxuICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgY2FzZSAnPic6XG4gICAgICAgICAgaWYgKHN0ZXBzID09PSAnPicpIHtcbiAgICAgICAgICAgIEdsaWRlLmluZGV4ID0gbGVuZ3RoO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0VuZCgpKSB7XG4gICAgICAgICAgICBpZiAoIShHbGlkZS5pc1R5cGUoJ3NsaWRlcicpICYmICFHbGlkZS5zZXR0aW5ncy5yZXdpbmQpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX28gPSB0cnVlO1xuXG4gICAgICAgICAgICAgIEdsaWRlLmluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50YWJsZVN0ZXBzKSB7XG4gICAgICAgICAgICBHbGlkZS5pbmRleCArPSBNYXRoLm1pbihsZW5ndGggLSBHbGlkZS5pbmRleCwgLXRvSW50KHN0ZXBzKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEdsaWRlLmluZGV4Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJzwnOlxuICAgICAgICAgIGlmIChzdGVwcyA9PT0gJzwnKSB7XG4gICAgICAgICAgICBHbGlkZS5pbmRleCA9IDA7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzU3RhcnQoKSkge1xuICAgICAgICAgICAgaWYgKCEoR2xpZGUuaXNUeXBlKCdzbGlkZXInKSAmJiAhR2xpZGUuc2V0dGluZ3MucmV3aW5kKSkge1xuICAgICAgICAgICAgICB0aGlzLl9vID0gdHJ1ZTtcblxuICAgICAgICAgICAgICBHbGlkZS5pbmRleCA9IGxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50YWJsZVN0ZXBzKSB7XG4gICAgICAgICAgICBHbGlkZS5pbmRleCAtPSBNYXRoLm1pbihHbGlkZS5pbmRleCwgdG9JbnQoc3RlcHMpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgR2xpZGUuaW5kZXgtLTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnPSc6XG4gICAgICAgICAgR2xpZGUuaW5kZXggPSBzdGVwcztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHdhcm4oJ0ludmFsaWQgZGlyZWN0aW9uIHBhdHRlcm4gWycgKyBkaXJlY3Rpb24gKyBzdGVwcyArICddIGhhcyBiZWVuIHVzZWQnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgd2UgYXJlIG9uIHRoZSBmaXJzdCBzbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNTdGFydDogZnVuY3Rpb24gaXNTdGFydCgpIHtcbiAgICAgIHJldHVybiBHbGlkZS5pbmRleCA9PT0gMDtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgd2UgYXJlIG9uIHRoZSBsYXN0IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0VuZDogZnVuY3Rpb24gaXNFbmQoKSB7XG4gICAgICByZXR1cm4gR2xpZGUuaW5kZXggPT09IHRoaXMubGVuZ3RoO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB3ZSBhcmUgbWFraW5nIGEgb2Zmc2V0IHJ1bi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkaXJlY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzT2Zmc2V0OiBmdW5jdGlvbiBpc09mZnNldChkaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLl9vICYmIHRoaXMubW92ZS5kaXJlY3Rpb24gPT09IGRpcmVjdGlvbjtcbiAgICB9XG4gIH07XG5cbiAgZGVmaW5lKFJ1biwgJ21vdmUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgbW92ZSBzY2hlbWEuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX207XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0aGUgbW92ZSBzY2hlbWEuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICB2YXIgc3RlcCA9IHZhbHVlLnN1YnN0cigxKTtcblxuICAgICAgdGhpcy5fbSA9IHtcbiAgICAgICAgZGlyZWN0aW9uOiB2YWx1ZS5zdWJzdHIoMCwgMSksXG4gICAgICAgIHN0ZXBzOiBzdGVwID8gdG9JbnQoc3RlcCkgPyB0b0ludChzdGVwKSA6IHN0ZXAgOiAwXG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKFJ1biwgJ2xlbmd0aCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBydW5uaW5nIGRpc3RhbmNlIGJhc2VkXG4gICAgICogb24gemVyby1pbmRleGluZyBudW1iZXIgb2Ygc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3M7XG4gICAgICB2YXIgbGVuZ3RoID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlcy5sZW5ndGg7XG5cbiAgICAgIC8vIElmIHRoZSBgYm91bmRgIG9wdGlvbiBpcyBhY2l0dmUsIGEgbWF4aW11bSBydW5uaW5nIGRpc3RhbmNlIHNob3VsZCBiZVxuICAgICAgLy8gcmVkdWNlZCBieSBgcGVyVmlld2AgYW5kIGBmb2N1c0F0YCBzZXR0aW5ncy4gUnVubmluZyBkaXN0YW5jZVxuICAgICAgLy8gc2hvdWxkIGVuZCBiZWZvcmUgY3JlYXRpbmcgYW4gZW1wdHkgc3BhY2UgYWZ0ZXIgaW5zdGFuY2UuXG5cbiAgICAgIGlmIChHbGlkZS5pc1R5cGUoJ3NsaWRlcicpICYmIHNldHRpbmdzLmZvY3VzQXQgIT09ICdjZW50ZXInICYmIHNldHRpbmdzLmJvdW5kKSB7XG4gICAgICAgIHJldHVybiBsZW5ndGggLSAxIC0gKHRvSW50KHNldHRpbmdzLnBlclZpZXcpIC0gMSkgKyB0b0ludChzZXR0aW5ncy5mb2N1c0F0KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxlbmd0aCAtIDE7XG4gICAgfVxuICB9KTtcblxuICBkZWZpbmUoUnVuLCAnb2Zmc2V0Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgc3RhdHVzIG9mIHRoZSBvZmZzZXR0aW5nIGZsYWcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX287XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gUnVuO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBjdXJyZW50IHRpbWUuXG4gKlxuICogQHJldHVybiB7TnVtYmVyfVxuICovXG5mdW5jdGlvbiBub3coKSB7XG4gIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIHdoZW4gaW52b2tlZCwgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZFxuICogYXQgbW9zdCBvbmNlIGR1cmluZyBhIGdpdmVuIHdpbmRvdyBvZiB0aW1lLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmNcbiAqIEBwYXJhbSB7TnVtYmVyfSB3YWl0XG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy91bmRlcnNjb3JlXG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIHRpbWVvdXQgPSB2b2lkIDAsXG4gICAgICBjb250ZXh0ID0gdm9pZCAwLFxuICAgICAgYXJncyA9IHZvaWQgMCxcbiAgICAgIHJlc3VsdCA9IHZvaWQgMDtcbiAgdmFyIHByZXZpb3VzID0gMDtcbiAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG5cbiAgdmFyIGxhdGVyID0gZnVuY3Rpb24gbGF0ZXIoKSB7XG4gICAgcHJldmlvdXMgPSBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlID8gMCA6IG5vdygpO1xuICAgIHRpbWVvdXQgPSBudWxsO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gIH07XG5cbiAgdmFyIHRocm90dGxlZCA9IGZ1bmN0aW9uIHRocm90dGxlZCgpIHtcbiAgICB2YXIgYXQgPSBub3coKTtcbiAgICBpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gYXQ7XG4gICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAoYXQgLSBwcmV2aW91cyk7XG4gICAgY29udGV4dCA9IHRoaXM7XG4gICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICBpZiAocmVtYWluaW5nIDw9IDAgfHwgcmVtYWluaW5nID4gd2FpdCkge1xuICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHByZXZpb3VzID0gYXQ7XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgdGhyb3R0bGVkLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgcHJldmlvdXMgPSAwO1xuICAgIHRpbWVvdXQgPSBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gIH07XG5cbiAgcmV0dXJuIHRocm90dGxlZDtcbn1cblxudmFyIE1BUkdJTl9UWVBFID0ge1xuICBsdHI6IFsnbWFyZ2luTGVmdCcsICdtYXJnaW5SaWdodCddLFxuICBydGw6IFsnbWFyZ2luUmlnaHQnLCAnbWFyZ2luTGVmdCddXG59O1xuXG5mdW5jdGlvbiBHYXBzIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIHZhciBHYXBzID0ge1xuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgZ2FwcyBiZXR3ZWVuIHNsaWRlcy4gRmlyc3QgYW5kIGxhc3RcbiAgICAgKiBzbGlkZXMgZG8gbm90IHJlY2VpdmUgaXQncyBlZGdlIG1hcmdpbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSBzbGlkZXNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFwcGx5OiBmdW5jdGlvbiBhcHBseShzbGlkZXMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzbGlkZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHN0eWxlID0gc2xpZGVzW2ldLnN0eWxlO1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gQ29tcG9uZW50cy5EaXJlY3Rpb24udmFsdWU7XG5cbiAgICAgICAgaWYgKGkgIT09IDApIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzBdXSA9IHRoaXMudmFsdWUgLyAyICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzBdXSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGkgIT09IHNsaWRlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgc3R5bGVbTUFSR0lOX1RZUEVbZGlyZWN0aW9uXVsxXV0gPSB0aGlzLnZhbHVlIC8gMiArICdweCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGVbTUFSR0lOX1RZUEVbZGlyZWN0aW9uXVsxXV0gPSAnJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgZ2FwcyBmcm9tIHRoZSBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSBzbGlkZXNcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAqL1xuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKHNsaWRlcykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNsaWRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgc3R5bGUgPSBzbGlkZXNbaV0uc3R5bGU7XG5cbiAgICAgICAgc3R5bGUubWFyZ2luTGVmdCA9ICcnO1xuICAgICAgICBzdHlsZS5tYXJnaW5SaWdodCA9ICcnO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBkZWZpbmUoR2FwcywgJ3ZhbHVlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIGdhcC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdG9JbnQoR2xpZGUuc2V0dGluZ3MuZ2FwKTtcbiAgICB9XG4gIH0pO1xuXG4gIGRlZmluZShHYXBzLCAnZ3JvdycsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGFkZGl0aW9uYWwgZGltZW50aW9ucyB2YWx1ZSBjYXVzZWQgYnkgZ2Fwcy5cbiAgICAgKiBVc2VkIHRvIGluY3JlYXNlIHdpZHRoIG9mIHRoZSBzbGlkZXMgd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gR2Fwcy52YWx1ZSAqIChDb21wb25lbnRzLlNpemVzLmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKEdhcHMsICdyZWR1Y3RvcicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHJlZHVjdGlvbiB2YWx1ZSBjYXVzZWQgYnkgZ2Fwcy5cbiAgICAgKiBVc2VkIHRvIHN1YnRyYWN0IHdpZHRoIG9mIHRoZSBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIHBlclZpZXcgPSBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3O1xuXG4gICAgICByZXR1cm4gR2Fwcy52YWx1ZSAqIChwZXJWaWV3IC0gMSkgLyBwZXJWaWV3O1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIEFwcGx5IGNhbGN1bGF0ZWQgZ2FwczpcbiAgICogLSBhZnRlciBidWlsZGluZywgc28gc2xpZGVzIChpbmNsdWRpbmcgY2xvbmVzKSB3aWxsIHJlY2VpdmUgcHJvcGVyIG1hcmdpbnNcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJLCB0byByZWNhbGN1bGF0ZSBnYXBzIHdpdGggbmV3IG9wdGlvbnNcbiAgICovXG4gIEV2ZW50cy5vbihbJ2J1aWxkLmFmdGVyJywgJ3VwZGF0ZSddLCB0aHJvdHRsZShmdW5jdGlvbiAoKSB7XG4gICAgR2Fwcy5hcHBseShDb21wb25lbnRzLkh0bWwud3JhcHBlci5jaGlsZHJlbik7XG4gIH0sIDMwKSk7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBnYXBzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0YWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBHYXBzLnJlbW92ZShDb21wb25lbnRzLkh0bWwud3JhcHBlci5jaGlsZHJlbik7XG4gIH0pO1xuXG4gIHJldHVybiBHYXBzO1xufVxuXG4vKipcbiAqIEZpbmRzIHNpYmxpbmdzIG5vZGVzIG9mIHRoZSBwYXNzZWQgbm9kZS5cbiAqXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBub2RlXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gc2libGluZ3Mobm9kZSkge1xuICBpZiAobm9kZSAmJiBub2RlLnBhcmVudE5vZGUpIHtcbiAgICB2YXIgbiA9IG5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkO1xuICAgIHZhciBtYXRjaGVkID0gW107XG5cbiAgICBmb3IgKDsgbjsgbiA9IG4ubmV4dFNpYmxpbmcpIHtcbiAgICAgIGlmIChuLm5vZGVUeXBlID09PSAxICYmIG4gIT09IG5vZGUpIHtcbiAgICAgICAgbWF0Y2hlZC5wdXNoKG4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXRjaGVkO1xuICB9XG5cbiAgcmV0dXJuIFtdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBwYXNzZWQgbm9kZSBleGlzdCBhbmQgaXMgYSB2YWxpZCBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSAge0VsZW1lbnR9IG5vZGVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGV4aXN0KG5vZGUpIHtcbiAgaWYgKG5vZGUgJiYgbm9kZSBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MRWxlbWVudCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgVFJBQ0tfU0VMRUNUT1IgPSAnW2RhdGEtZ2xpZGUtZWw9XCJ0cmFja1wiXSc7XG5cbmZ1bmN0aW9uIEh0bWwgKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIHZhciBIdG1sID0ge1xuICAgIC8qKlxuICAgICAqIFNldHVwIHNsaWRlciBIVE1MIG5vZGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtHbGlkZX0gZ2xpZGVcbiAgICAgKi9cbiAgICBtb3VudDogZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgICB0aGlzLnJvb3QgPSBHbGlkZS5zZWxlY3RvcjtcbiAgICAgIHRoaXMudHJhY2sgPSB0aGlzLnJvb3QucXVlcnlTZWxlY3RvcihUUkFDS19TRUxFQ1RPUik7XG4gICAgICB0aGlzLnNsaWRlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMud3JhcHBlci5jaGlsZHJlbikuZmlsdGVyKGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICByZXR1cm4gIXNsaWRlLmNsYXNzTGlzdC5jb250YWlucyhHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLmNsb25lU2xpZGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShIdG1sLCAncm9vdCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIG5vZGUgb2YgdGhlIGdsaWRlIG1haW4gZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBIdG1sLl9yO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgbm9kZSBvZiB0aGUgZ2xpZGUgbWFpbiBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24gc2V0KHIpIHtcbiAgICAgIGlmIChpc1N0cmluZyhyKSkge1xuICAgICAgICByID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGV4aXN0KHIpKSB7XG4gICAgICAgIEh0bWwuX3IgPSByO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybignUm9vdCBlbGVtZW50IG11c3QgYmUgYSBleGlzdGluZyBIdG1sIG5vZGUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGRlZmluZShIdG1sLCAndHJhY2snLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBub2RlIG9mIHRoZSBnbGlkZSB0cmFjayB3aXRoIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBIdG1sLl90O1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgbm9kZSBvZiB0aGUgZ2xpZGUgdHJhY2sgd2l0aCBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodCkge1xuICAgICAgaWYgKGV4aXN0KHQpKSB7XG4gICAgICAgIEh0bWwuX3QgPSB0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybignQ291bGQgbm90IGZpbmQgdHJhY2sgZWxlbWVudC4gUGxlYXNlIHVzZSAnICsgVFJBQ0tfU0VMRUNUT1IgKyAnIGF0dHJpYnV0ZS4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGRlZmluZShIdG1sLCAnd3JhcHBlcicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIG5vZGUgb2YgdGhlIHNsaWRlcyB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIEh0bWwudHJhY2suY2hpbGRyZW5bMF07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gSHRtbDtcbn1cblxuZnVuY3Rpb24gUGVlayAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICB2YXIgUGVlayA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cHMgaG93IG11Y2ggdG8gcGVlayBiYXNlZCBvbiBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy52YWx1ZSA9IEdsaWRlLnNldHRpbmdzLnBlZWs7XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShQZWVrLCAndmFsdWUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgcGVlay5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ8T2JqZWN0fVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIFBlZWsuX3Y7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0aGUgcGVlay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlLmJlZm9yZSA9IHRvSW50KHZhbHVlLmJlZm9yZSk7XG4gICAgICAgIHZhbHVlLmFmdGVyID0gdG9JbnQodmFsdWUuYWZ0ZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSB0b0ludCh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIFBlZWsuX3YgPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGRlZmluZShQZWVrLCAncmVkdWN0b3InLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyByZWR1Y3Rpb24gdmFsdWUgY2F1c2VkIGJ5IHBlZWsuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIHZhbHVlID0gUGVlay52YWx1ZTtcbiAgICAgIHZhciBwZXJWaWV3ID0gR2xpZGUuc2V0dGluZ3MucGVyVmlldztcblxuICAgICAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdmFsdWUuYmVmb3JlIC8gcGVyVmlldyArIHZhbHVlLmFmdGVyIC8gcGVyVmlldztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlICogMiAvIHBlclZpZXc7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogUmVjYWxjdWxhdGUgcGVla2luZyBzaXplcyBvbjpcbiAgICogLSB3aGVuIHJlc2l6aW5nIHdpbmRvdyB0byB1cGRhdGUgdG8gcHJvcGVyIHBlcmNlbnRzXG4gICAqL1xuICBFdmVudHMub24oWydyZXNpemUnLCAndXBkYXRlJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBQZWVrLm1vdW50KCk7XG4gIH0pO1xuXG4gIHJldHVybiBQZWVrO1xufVxuXG5mdW5jdGlvbiBNb3ZlIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIHZhciBNb3ZlID0ge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgbW92ZSBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudDogZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgICB0aGlzLl9vID0gMDtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIGEgbW92ZW1lbnQgdmFsdWUgYmFzZWQgb24gcGFzc2VkIG9mZnNldCBhbmQgY3VycmVudGx5IGFjdGl2ZSBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gb2Zmc2V0XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtYWtlOiBmdW5jdGlvbiBtYWtlKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIG9mZnNldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogMDtcblxuICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG5cbiAgICAgIEV2ZW50cy5lbWl0KCdtb3ZlJywge1xuICAgICAgICBtb3ZlbWVudDogdGhpcy52YWx1ZVxuICAgICAgfSk7XG5cbiAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIEV2ZW50cy5lbWl0KCdtb3ZlLmFmdGVyJywge1xuICAgICAgICAgIG1vdmVtZW50OiBfdGhpcy52YWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBkZWZpbmUoTW92ZSwgJ29mZnNldCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGFuIG9mZnNldCB2YWx1ZSB1c2VkIHRvIG1vZGlmeSBjdXJyZW50IHRyYW5zbGF0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBNb3ZlLl9vO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgYW4gb2Zmc2V0IHZhbHVlIHVzZWQgdG8gbW9kaWZ5IGN1cnJlbnQgdHJhbnNsYXRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICBNb3ZlLl9vID0gIWlzVW5kZWZpbmVkKHZhbHVlKSA/IHRvSW50KHZhbHVlKSA6IDA7XG4gICAgfVxuICB9KTtcblxuICBkZWZpbmUoTW92ZSwgJ3RyYW5zbGF0ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcmF3IG1vdmVtZW50IHZhbHVlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCAqIEdsaWRlLmluZGV4O1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKE1vdmUsICd2YWx1ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGFuIGFjdHVhbCBtb3ZlbWVudCB2YWx1ZSBjb3JyZWN0ZWQgYnkgb2Zmc2V0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgdmFyIHRyYW5zbGF0ZSA9IHRoaXMudHJhbnNsYXRlO1xuXG4gICAgICBpZiAoQ29tcG9uZW50cy5EaXJlY3Rpb24uaXMoJ3J0bCcpKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2xhdGUgKyBvZmZzZXQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGUgLSBvZmZzZXQ7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogTWFrZSBtb3ZlbWVudCB0byBwcm9wZXIgc2xpZGUgb246XG4gICAqIC0gYmVmb3JlIGJ1aWxkLCBzbyBnbGlkZSB3aWxsIHN0YXJ0IGF0IGBzdGFydEF0YCBpbmRleFxuICAgKiAtIG9uIGVhY2ggc3RhbmRhcmQgcnVuIHRvIG1vdmUgdG8gbmV3bHkgY2FsY3VsYXRlZCBpbmRleFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYmVmb3JlJywgJ3J1biddLCBmdW5jdGlvbiAoKSB7XG4gICAgTW92ZS5tYWtlKCk7XG4gIH0pO1xuXG4gIHJldHVybiBNb3ZlO1xufVxuXG5mdW5jdGlvbiBTaXplcyAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICB2YXIgU2l6ZXMgPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXBzIGRpbWVudGlvbnMgb2Ygc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXR1cFNsaWRlczogZnVuY3Rpb24gc2V0dXBTbGlkZXMoKSB7XG4gICAgICB2YXIgd2lkdGggPSB0aGlzLnNsaWRlV2lkdGggKyAncHgnO1xuICAgICAgdmFyIHNsaWRlcyA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXM7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNsaWRlc1tpXS5zdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFNldHVwcyBkaW1lbnRpb25zIG9mIHNsaWRlcyB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXR1cFdyYXBwZXI6IGZ1bmN0aW9uIHNldHVwV3JhcHBlcihkaW1lbnRpb24pIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLndpZHRoID0gdGhpcy53cmFwcGVyU2l6ZSArICdweCc7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhcHBsaWVkIHN0eWxlcyBmcm9tIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHZhciBzbGlkZXMgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzbGlkZXNbaV0uc3R5bGUud2lkdGggPSAnJztcbiAgICAgIH1cblxuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUud2lkdGggPSAnJztcbiAgICB9XG4gIH07XG5cbiAgZGVmaW5lKFNpemVzLCAnbGVuZ3RoJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgY291bnQgbnVtYmVyIG9mIHRoZSBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gQ29tcG9uZW50cy5IdG1sLnNsaWRlcy5sZW5ndGg7XG4gICAgfVxuICB9KTtcblxuICBkZWZpbmUoU2l6ZXMsICd3aWR0aCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHdpZHRoIHZhbHVlIG9mIHRoZSBnbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBDb21wb25lbnRzLkh0bWwucm9vdC5vZmZzZXRXaWR0aDtcbiAgICB9XG4gIH0pO1xuXG4gIGRlZmluZShTaXplcywgJ3dyYXBwZXJTaXplJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgc2l6ZSBvZiB0aGUgc2xpZGVzIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gU2l6ZXMuc2xpZGVXaWR0aCAqIFNpemVzLmxlbmd0aCArIENvbXBvbmVudHMuR2Fwcy5ncm93ICsgQ29tcG9uZW50cy5DbG9uZXMuZ3JvdztcbiAgICB9XG4gIH0pO1xuXG4gIGRlZmluZShTaXplcywgJ3NsaWRlV2lkdGgnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB3aWR0aCB2YWx1ZSBvZiB0aGUgc2luZ2xlIHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIFNpemVzLndpZHRoIC8gR2xpZGUuc2V0dGluZ3MucGVyVmlldyAtIENvbXBvbmVudHMuUGVlay5yZWR1Y3RvciAtIENvbXBvbmVudHMuR2Fwcy5yZWR1Y3RvcjtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBBcHBseSBjYWxjdWxhdGVkIGdsaWRlJ3MgZGltZW5zaW9uczpcbiAgICogLSBiZWZvcmUgYnVpbGRpbmcsIHNvIG90aGVyIGRpbWVudGlvbnMgKGUuZy4gdHJhbnNsYXRlKSB3aWxsIGJlIGNhbGN1bGF0ZWQgcHJvcGVydGx5XG4gICAqIC0gd2hlbiByZXNpemluZyB3aW5kb3cgdG8gcmVjYWxjdWxhdGUgc2lsZGVzIGRpbWVuc2lvbnNcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJLCB0byBjYWxjdWxhdGUgZGltZW5zaW9ucyBiYXNlZCBvbiBuZXcgb3B0aW9uc1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYmVmb3JlJywgJ3Jlc2l6ZScsICd1cGRhdGUnXSwgZnVuY3Rpb24gKCkge1xuICAgIFNpemVzLnNldHVwU2xpZGVzKCk7XG4gICAgU2l6ZXMuc2V0dXBXcmFwcGVyKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgY2FsY3VsYXRlZCBnbGlkZSdzIGRpbWVuc2lvbnM6XG4gICAqIC0gb24gZGVzdG90aW5nIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgU2l6ZXMucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIHJldHVybiBTaXplcztcbn1cblxuZnVuY3Rpb24gQnVpbGQgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgdmFyIEJ1aWxkID0ge1xuICAgIC8qKlxuICAgICAqIEluaXQgZ2xpZGUgYnVpbGRpbmcuIEFkZHMgY2xhc3Nlcywgc2V0c1xuICAgICAqIGRpbWVuc2lvbnMgYW5kIHNldHVwcyBpbml0aWFsIHN0YXRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudDogZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgICBFdmVudHMuZW1pdCgnYnVpbGQuYmVmb3JlJyk7XG5cbiAgICAgIHRoaXMudHlwZUNsYXNzKCk7XG4gICAgICB0aGlzLmFjdGl2ZUNsYXNzKCk7XG5cbiAgICAgIEV2ZW50cy5lbWl0KCdidWlsZC5hZnRlcicpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYHR5cGVgIGNsYXNzIHRvIHRoZSBnbGlkZSBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB0eXBlQ2xhc3M6IGZ1bmN0aW9uIHR5cGVDbGFzcygpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5hZGQoR2xpZGUuc2V0dGluZ3MuY2xhc3Nlc1tHbGlkZS5zZXR0aW5ncy50eXBlXSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhY3RpdmUgY2xhc3MgdG8gY3VycmVudCBzbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYWN0aXZlQ2xhc3M6IGZ1bmN0aW9uIGFjdGl2ZUNsYXNzKCkge1xuICAgICAgdmFyIGNsYXNzZXMgPSBHbGlkZS5zZXR0aW5ncy5jbGFzc2VzO1xuICAgICAgdmFyIHNsaWRlID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlc1tHbGlkZS5pbmRleF07XG5cbiAgICAgIGlmIChzbGlkZSkge1xuICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGNsYXNzZXMuYWN0aXZlU2xpZGUpO1xuXG4gICAgICAgIHNpYmxpbmdzKHNsaWRlKS5mb3JFYWNoKGZ1bmN0aW9uIChzaWJsaW5nKSB7XG4gICAgICAgICAgc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzZXMuYWN0aXZlU2xpZGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIEhUTUwgY2xhc3NlcyBhcHBsaWVkIGF0IGJ1aWxkaW5nLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmVDbGFzc2VzOiBmdW5jdGlvbiByZW1vdmVDbGFzc2VzKCkge1xuICAgICAgdmFyIGNsYXNzZXMgPSBHbGlkZS5zZXR0aW5ncy5jbGFzc2VzO1xuXG4gICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzZXNbR2xpZGUuc2V0dGluZ3MudHlwZV0pO1xuXG4gICAgICBDb21wb25lbnRzLkh0bWwuc2xpZGVzLmZvckVhY2goZnVuY3Rpb24gKHNpYmxpbmcpIHtcbiAgICAgICAgc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzZXMuYWN0aXZlU2xpZGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbGVhciBidWlsZGluZyBjbGFzc2VzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gYnJpbmcgSFRNTCB0byBpdHMgaW5pdGlhbCBzdGF0ZVxuICAgKiAtIG9uIHVwZGF0aW5nIHRvIHJlbW92ZSBjbGFzc2VzIGJlZm9yZSByZW1vdW50aW5nIGNvbXBvbmVudFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgZnVuY3Rpb24gKCkge1xuICAgIEJ1aWxkLnJlbW92ZUNsYXNzZXMoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW91bnQgY29tcG9uZW50OlxuICAgKiAtIG9uIHJlc2l6aW5nIG9mIHRoZSB3aW5kb3cgdG8gY2FsY3VsYXRlIG5ldyBkaW1lbnRpb25zXG4gICAqIC0gb24gdXBkYXRpbmcgc2V0dGluZ3MgdmlhIEFQSVxuICAgKi9cbiAgRXZlbnRzLm9uKFsncmVzaXplJywgJ3VwZGF0ZSddLCBmdW5jdGlvbiAoKSB7XG4gICAgQnVpbGQubW91bnQoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFN3YXAgYWN0aXZlIGNsYXNzIG9mIGN1cnJlbnQgc2xpZGU6XG4gICAqIC0gYWZ0ZXIgZWFjaCBtb3ZlIHRvIHRoZSBuZXcgaW5kZXhcbiAgICovXG4gIEV2ZW50cy5vbignbW92ZS5hZnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICBCdWlsZC5hY3RpdmVDbGFzcygpO1xuICB9KTtcblxuICByZXR1cm4gQnVpbGQ7XG59XG5cbmZ1bmN0aW9uIENsb25lcyAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICB2YXIgQ2xvbmVzID0ge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBwYXR0ZXJuIG1hcCBhbmQgY29sbGVjdCBzbGlkZXMgdG8gYmUgY2xvbmVkLlxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMuaXRlbXMgPSBbXTtcblxuICAgICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5jb2xsZWN0KCk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdCBjbG9uZXMgd2l0aCBwYXR0ZXJuLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBjb2xsZWN0OiBmdW5jdGlvbiBjb2xsZWN0KCkge1xuICAgICAgdmFyIGl0ZW1zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICAgIHZhciBzbGlkZXMgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzO1xuICAgICAgdmFyIF9HbGlkZSRzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzLFxuICAgICAgICAgIHBlclZpZXcgPSBfR2xpZGUkc2V0dGluZ3MucGVyVmlldyxcbiAgICAgICAgICBjbGFzc2VzID0gX0dsaWRlJHNldHRpbmdzLmNsYXNzZXM7XG5cblxuICAgICAgdmFyIHBlZWtJbmNyZW1lbnRlciA9ICshIUdsaWRlLnNldHRpbmdzLnBlZWs7XG4gICAgICB2YXIgcGFydCA9IHBlclZpZXcgKyBwZWVrSW5jcmVtZW50ZXI7XG4gICAgICB2YXIgc3RhcnQgPSBzbGlkZXMuc2xpY2UoMCwgcGFydCk7XG4gICAgICB2YXIgZW5kID0gc2xpZGVzLnNsaWNlKC1wYXJ0KTtcblxuICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHBlclZpZXcgLyBzbGlkZXMubGVuZ3RoKSk7IHIrKykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGNsb25lID0gc3RhcnRbaV0uY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICAgICAgY2xvbmUuY2xhc3NMaXN0LmFkZChjbGFzc2VzLmNsb25lU2xpZGUpO1xuXG4gICAgICAgICAgaXRlbXMucHVzaChjbG9uZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgZW5kLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgIHZhciBfY2xvbmUgPSBlbmRbX2ldLmNsb25lTm9kZSh0cnVlKTtcblxuICAgICAgICAgIF9jbG9uZS5jbGFzc0xpc3QuYWRkKGNsYXNzZXMuY2xvbmVTbGlkZSk7XG5cbiAgICAgICAgICBpdGVtcy51bnNoaWZ0KF9jbG9uZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEFwcGVuZCBjbG9uZWQgc2xpZGVzIHdpdGggZ2VuZXJhdGVkIHBhdHRlcm4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFwcGVuZDogZnVuY3Rpb24gYXBwZW5kKCkge1xuICAgICAgdmFyIGl0ZW1zID0gdGhpcy5pdGVtcztcbiAgICAgIHZhciBfQ29tcG9uZW50cyRIdG1sID0gQ29tcG9uZW50cy5IdG1sLFxuICAgICAgICAgIHdyYXBwZXIgPSBfQ29tcG9uZW50cyRIdG1sLndyYXBwZXIsXG4gICAgICAgICAgc2xpZGVzID0gX0NvbXBvbmVudHMkSHRtbC5zbGlkZXM7XG5cblxuICAgICAgdmFyIGhhbGYgPSBNYXRoLmZsb29yKGl0ZW1zLmxlbmd0aCAvIDIpO1xuICAgICAgdmFyIHByZXBlbmQgPSBpdGVtcy5zbGljZSgwLCBoYWxmKS5yZXZlcnNlKCk7XG4gICAgICB2YXIgYXBwZW5kID0gaXRlbXMuc2xpY2UoaGFsZiwgaXRlbXMubGVuZ3RoKTtcbiAgICAgIHZhciB3aWR0aCA9IENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCArICdweCc7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXBwZW5kLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoYXBwZW5kW2ldKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgcHJlcGVuZC5sZW5ndGg7IF9pMisrKSB7XG4gICAgICAgIHdyYXBwZXIuaW5zZXJ0QmVmb3JlKHByZXBlbmRbX2kyXSwgc2xpZGVzWzBdKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2kzID0gMDsgX2kzIDwgaXRlbXMubGVuZ3RoOyBfaTMrKykge1xuICAgICAgICBpdGVtc1tfaTNdLnN0eWxlLndpZHRoID0gd2lkdGg7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBjbG9uZWQgc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHZhciBpdGVtcyA9IHRoaXMuaXRlbXM7XG5cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5yZW1vdmVDaGlsZChpdGVtc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShDbG9uZXMsICdncm93Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYWRkaXRpb25hbCBkaW1lbnRpb25zIHZhbHVlIGNhdXNlZCBieSBjbG9uZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gKENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCArIENvbXBvbmVudHMuR2Fwcy52YWx1ZSkgKiBDbG9uZXMuaXRlbXMubGVuZ3RoO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIEFwcGVuZCBhZGRpdGlvbmFsIHNsaWRlJ3MgY2xvbmVzOlxuICAgKiAtIHdoaWxlIGdsaWRlJ3MgdHlwZSBpcyBgY2Fyb3VzZWxgXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBDbG9uZXMucmVtb3ZlKCk7XG4gICAgQ2xvbmVzLm1vdW50KCk7XG4gICAgQ2xvbmVzLmFwcGVuZCgpO1xuICB9KTtcblxuICAvKipcbiAgICogQXBwZW5kIGFkZGl0aW9uYWwgc2xpZGUncyBjbG9uZXM6XG4gICAqIC0gd2hpbGUgZ2xpZGUncyB0eXBlIGlzIGBjYXJvdXNlbGBcbiAgICovXG4gIEV2ZW50cy5vbignYnVpbGQuYmVmb3JlJywgZnVuY3Rpb24gKCkge1xuICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykpIHtcbiAgICAgIENsb25lcy5hcHBlbmQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgY2xvbmVzIEhUTUxFbGVtZW50czpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBIVE1MIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgQ2xvbmVzLnJlbW92ZSgpO1xuICB9KTtcblxuICByZXR1cm4gQ2xvbmVzO1xufVxuXG52YXIgRXZlbnRzQmluZGVyID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgRXZlbnRzQmluZGVyIGluc3RhbmNlLlxuICAgKi9cbiAgZnVuY3Rpb24gRXZlbnRzQmluZGVyKCkge1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50c0JpbmRlcik7XG5cbiAgICB0aGlzLmxpc3RlbmVycyA9IGxpc3RlbmVycztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50cyBsaXN0ZW5lcnMgdG8gYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSAge1N0cmluZ3xBcnJheX0gZXZlbnRzXG4gICAqIEBwYXJhbSAge0VsZW1lbnR8V2luZG93fERvY3VtZW50fSBlbFxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2xvc3VyZVxuICAgKiBAcGFyYW0gIHtCb29sZWFufE9iamVjdH0gY2FwdHVyZVxuICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgKi9cblxuXG4gIGNyZWF0ZUNsYXNzKEV2ZW50c0JpbmRlciwgW3tcbiAgICBrZXk6ICdvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKGV2ZW50cywgZWwsIGNsb3N1cmUpIHtcbiAgICAgIHZhciBjYXB0dXJlID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBmYWxzZTtcblxuICAgICAgaWYgKGlzU3RyaW5nKGV2ZW50cykpIHtcbiAgICAgICAgZXZlbnRzID0gW2V2ZW50c107XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50c1tpXV0gPSBjbG9zdXJlO1xuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzW2ldLCB0aGlzLmxpc3RlbmVyc1tldmVudHNbaV1dLCBjYXB0dXJlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGV2ZW50IGxpc3RlbmVycyBmcm9tIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfEFycmF5fSBldmVudHNcbiAgICAgKiBAcGFyYW0gIHtFbGVtZW50fFdpbmRvd3xEb2N1bWVudH0gZWxcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufE9iamVjdH0gY2FwdHVyZVxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29mZicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mZihldmVudHMsIGVsKSB7XG4gICAgICB2YXIgY2FwdHVyZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgICAgIGlmIChpc1N0cmluZyhldmVudHMpKSB7XG4gICAgICAgIGV2ZW50cyA9IFtldmVudHNdO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50c1tpXSwgdGhpcy5saXN0ZW5lcnNbZXZlbnRzW2ldXSwgY2FwdHVyZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVzdHJveSBjb2xsZWN0ZWQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZvaWR9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRXZlbnRzQmluZGVyO1xufSgpO1xuXG5mdW5jdGlvbiBSZXNpemUgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICB2YXIgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpO1xuXG4gIHZhciBSZXNpemUgPSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgd2luZG93IGJpbmRpbmdzLlxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMuYmluZCgpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEJpbmRzIGByZXpzaXplYCBsaXN0ZW5lciB0byB0aGUgd2luZG93LlxuICAgICAqIEl0J3MgYSBjb3N0bHkgZXZlbnQsIHNvIHdlIGFyZSBkZWJvdW5jaW5nIGl0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgQmluZGVyLm9uKCdyZXNpemUnLCB3aW5kb3csIHRocm90dGxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgRXZlbnRzLmVtaXQoJ3Jlc2l6ZScpO1xuICAgICAgfSwgR2xpZGUuc2V0dGluZ3MudGhyb3R0bGUpKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIGxpc3RlbmVycyBmcm9tIHRoZSB3aW5kb3cuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgQmluZGVyLm9mZigncmVzaXplJywgd2luZG93KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBiaW5kaW5ncyBmcm9tIHdpbmRvdzpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byByZW1vdmUgYWRkZWQgRXZlbnRMaXN0ZW5lclxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgIFJlc2l6ZS51bmJpbmQoKTtcbiAgICBCaW5kZXIuZGVzdHJveSgpO1xuICB9KTtcblxuICByZXR1cm4gUmVzaXplO1xufVxuXG52YXIgVkFMSURfRElSRUNUSU9OUyA9IFsnbHRyJywgJ3J0bCddO1xudmFyIEZMSVBFRF9NT1ZFTUVOVFMgPSB7XG4gICc+JzogJzwnLFxuICAnPCc6ICc+JyxcbiAgJz0nOiAnPSdcbn07XG5cbmZ1bmN0aW9uIERpcmVjdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICB2YXIgRGlyZWN0aW9uID0ge1xuICAgIC8qKlxuICAgICAqIFNldHVwcyBnYXAgdmFsdWUgYmFzZWQgb24gc2V0dGluZ3MuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBHbGlkZS5zZXR0aW5ncy5kaXJlY3Rpb247XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVzb2x2ZXMgcGF0dGVybiBiYXNlZCBvbiBkaXJlY3Rpb24gdmFsdWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXR0ZXJuXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHBhdHRlcm4pIHtcbiAgICAgIHZhciB0b2tlbiA9IHBhdHRlcm4uc2xpY2UoMCwgMSk7XG5cbiAgICAgIGlmICh0aGlzLmlzKCdydGwnKSkge1xuICAgICAgICByZXR1cm4gcGF0dGVybi5zcGxpdCh0b2tlbikuam9pbihGTElQRURfTU9WRU1FTlRTW3Rva2VuXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXR0ZXJuO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB2YWx1ZSBvZiBkaXJlY3Rpb24gbW9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkaXJlY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpczogZnVuY3Rpb24gaXMoZGlyZWN0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gZGlyZWN0aW9uO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgZGlyZWN0aW9uIGNsYXNzIHRvIHRoZSByb290IEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYWRkQ2xhc3M6IGZ1bmN0aW9uIGFkZENsYXNzKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LmFkZChHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLmRpcmVjdGlvblt0aGlzLnZhbHVlXSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBkaXJlY3Rpb24gY2xhc3MgZnJvbSB0aGUgcm9vdCBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiByZW1vdmVDbGFzcygpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5yZW1vdmUoR2xpZGUuc2V0dGluZ3MuY2xhc3Nlcy5kaXJlY3Rpb25bdGhpcy52YWx1ZV0pO1xuICAgIH1cbiAgfTtcblxuICBkZWZpbmUoRGlyZWN0aW9uLCAndmFsdWUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgZGlyZWN0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBEaXJlY3Rpb24uX3Y7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0aGUgZGlyZWN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgaWYgKFZBTElEX0RJUkVDVElPTlMuaW5kZXhPZih2YWx1ZSkgPiAtMSkge1xuICAgICAgICBEaXJlY3Rpb24uX3YgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oJ0RpcmVjdGlvbiB2YWx1ZSBtdXN0IGJlIGBsdHJgIG9yIGBydGxgJyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogQ2xlYXIgZGlyZWN0aW9uIGNsYXNzOlxuICAgKiAtIG9uIGRlc3Ryb3kgdG8gYnJpbmcgSFRNTCB0byBpdHMgaW5pdGlhbCBzdGF0ZVxuICAgKiAtIG9uIHVwZGF0ZSB0byByZW1vdmUgY2xhc3MgYmVmb3JlIHJlYXBwbGluZyBiZWxsb3dcbiAgICovXG4gIEV2ZW50cy5vbihbJ2Rlc3Ryb3knLCAndXBkYXRlJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBEaXJlY3Rpb24ucmVtb3ZlQ2xhc3MoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW91bnQgY29tcG9uZW50OlxuICAgKiAtIG9uIHVwZGF0ZSB0byByZWZsZWN0IGNoYW5nZXMgaW4gZGlyZWN0aW9uIHZhbHVlXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBEaXJlY3Rpb24ubW91bnQoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEFwcGx5IGRpcmVjdGlvbiBjbGFzczpcbiAgICogLSBiZWZvcmUgYnVpbGRpbmcgdG8gYXBwbHkgY2xhc3MgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVhcHBseSBkaXJlY3Rpb24gY2xhc3MgdGhhdCBtYXkgY2hhbmdlZFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYmVmb3JlJywgJ3VwZGF0ZSddLCBmdW5jdGlvbiAoKSB7XG4gICAgRGlyZWN0aW9uLmFkZENsYXNzKCk7XG4gIH0pO1xuXG4gIHJldHVybiBEaXJlY3Rpb247XG59XG5cbi8qKlxuICogUmVmbGVjdHMgdmFsdWUgb2YgZ2xpZGUgbW92ZW1lbnQuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIFJ0bCAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBOZWdhdGVzIHRoZSBwYXNzZWQgdHJhbnNsYXRlIGlmIGdsaWRlIGlzIGluIFJUTCBvcHRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnk6IGZ1bmN0aW9uIG1vZGlmeSh0cmFuc2xhdGUpIHtcbiAgICAgIGlmIChDb21wb25lbnRzLkRpcmVjdGlvbi5pcygncnRsJykpIHtcbiAgICAgICAgcmV0dXJuIC10cmFuc2xhdGU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGU7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIFVwZGF0ZXMgZ2xpZGUgbW92ZW1lbnQgd2l0aCBhIGBnYXBgIHNldHRpbmdzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBHYXAgKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogTW9kaWZpZXMgcGFzc2VkIHRyYW5zbGF0ZSB2YWx1ZSB3aXRoIG51bWJlciBpbiB0aGUgYGdhcGAgc2V0dGluZ3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnk6IGZ1bmN0aW9uIG1vZGlmeSh0cmFuc2xhdGUpIHtcbiAgICAgIHJldHVybiB0cmFuc2xhdGUgKyBDb21wb25lbnRzLkdhcHMudmFsdWUgKiBHbGlkZS5pbmRleDtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIHdpZHRoIG9mIGFkZGl0aW9uYWwgY2xvbmVzIHdpZHRoLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBHcm93IChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIEFkZHMgdG8gdGhlIHBhc3NlZCB0cmFuc2xhdGUgd2lkdGggb2YgdGhlIGhhbGYgb2YgY2xvbmVzLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbW9kaWZ5OiBmdW5jdGlvbiBtb2RpZnkodHJhbnNsYXRlKSB7XG4gICAgICByZXR1cm4gdHJhbnNsYXRlICsgQ29tcG9uZW50cy5DbG9uZXMuZ3JvdyAvIDI7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIFVwZGF0ZXMgZ2xpZGUgbW92ZW1lbnQgd2l0aCBhIGBwZWVrYCBzZXR0aW5ncy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gUGVla2luZyAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBNb2RpZmllcyBwYXNzZWQgdHJhbnNsYXRlIHZhbHVlIHdpdGggYSBgcGVla2Agc2V0dGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeTogZnVuY3Rpb24gbW9kaWZ5KHRyYW5zbGF0ZSkge1xuICAgICAgaWYgKEdsaWRlLnNldHRpbmdzLmZvY3VzQXQgPj0gMCkge1xuICAgICAgICB2YXIgcGVlayA9IENvbXBvbmVudHMuUGVlay52YWx1ZTtcblxuICAgICAgICBpZiAoaXNPYmplY3QocGVlaykpIHtcbiAgICAgICAgICByZXR1cm4gdHJhbnNsYXRlIC0gcGVlay5iZWZvcmU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJhbnNsYXRlIC0gcGVlaztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIGEgYGZvY3VzQXRgIHNldHRpbmdzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBGb2N1c2luZyAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBNb2RpZmllcyBwYXNzZWQgdHJhbnNsYXRlIHZhbHVlIHdpdGggaW5kZXggaW4gdGhlIGBmb2N1c0F0YCBzZXR0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbW9kaWZ5OiBmdW5jdGlvbiBtb2RpZnkodHJhbnNsYXRlKSB7XG4gICAgICB2YXIgZ2FwID0gQ29tcG9uZW50cy5HYXBzLnZhbHVlO1xuICAgICAgdmFyIHdpZHRoID0gQ29tcG9uZW50cy5TaXplcy53aWR0aDtcbiAgICAgIHZhciBmb2N1c0F0ID0gR2xpZGUuc2V0dGluZ3MuZm9jdXNBdDtcbiAgICAgIHZhciBzbGlkZVdpZHRoID0gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoO1xuXG4gICAgICBpZiAoZm9jdXNBdCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtICh3aWR0aCAvIDIgLSBzbGlkZVdpZHRoIC8gMik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGUgLSBzbGlkZVdpZHRoICogZm9jdXNBdCAtIGdhcCAqIGZvY3VzQXQ7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIEFwcGxpZXMgZGlmZnJlbnQgdHJhbnNmb3JtZXJzIG9uIHRyYW5zbGF0ZSB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gbXV0YXRvciAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogTWVyZ2UgaW5zdGFuY2UgdHJhbnNmb3JtZXJzIHdpdGggY29sbGVjdGlvbiBvZiBkZWZhdWx0IHRyYW5zZm9ybWVycy5cbiAgICogSXQncyBpbXBvcnRhbnQgdGhhdCB0aGUgUnRsIGNvbXBvbmVudCBiZSBsYXN0IG9uIHRoZSBsaXN0LFxuICAgKiBzbyBpdCByZWZsZWN0cyBhbGwgcHJldmlvdXMgdHJhbnNmb3JtYXRpb25zLlxuICAgKlxuICAgKiBAdHlwZSB7QXJyYXl9XG4gICAqL1xuICB2YXIgVFJBTlNGT1JNRVJTID0gW0dhcCwgR3JvdywgUGVla2luZywgRm9jdXNpbmddLmNvbmNhdChHbGlkZS5fdCwgW1J0bF0pO1xuXG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogUGlwbGluZXMgdHJhbnNsYXRlIHZhbHVlIHdpdGggcmVnaXN0ZXJlZCB0cmFuc2Zvcm1lcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtdXRhdGU6IGZ1bmN0aW9uIG11dGF0ZSh0cmFuc2xhdGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVFJBTlNGT1JNRVJTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0cmFuc2Zvcm1lciA9IFRSQU5TRk9STUVSU1tpXTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0cmFuc2Zvcm1lcikgJiYgaXNGdW5jdGlvbih0cmFuc2Zvcm1lcigpLm1vZGlmeSkpIHtcbiAgICAgICAgICB0cmFuc2xhdGUgPSB0cmFuc2Zvcm1lcihHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKS5tb2RpZnkodHJhbnNsYXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3YXJuKCdUcmFuc2Zvcm1lciBzaG91bGQgYmUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gb2JqZWN0IHdpdGggYG1vZGlmeSgpYCBtZXRob2QnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhbnNsYXRlO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gVHJhbnNsYXRlIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIHZhciBUcmFuc2xhdGUgPSB7XG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0cmFuc2xhdGUgb24gSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgdmFyIHRyYW5zZm9ybSA9IG11dGF0b3IoR2xpZGUsIENvbXBvbmVudHMpLm11dGF0ZSh2YWx1ZSk7XG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgLTEgKiB0cmFuc2Zvcm0gKyAncHgsIDBweCwgMHB4KSc7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB2YWx1ZSBvZiB0cmFuc2xhdGUgZnJvbSBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJyc7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTZXQgbmV3IHRyYW5zbGF0ZSB2YWx1ZTpcbiAgICogLSBvbiBtb3ZlIHRvIHJlZmxlY3QgaW5kZXggY2hhbmdlXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSB0byByZWZsZWN0IHBvc3NpYmxlIGNoYW5nZXMgaW4gb3B0aW9uc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdtb3ZlJywgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICB2YXIgZ2FwID0gQ29tcG9uZW50cy5HYXBzLnZhbHVlO1xuICAgIHZhciBsZW5ndGggPSBDb21wb25lbnRzLlNpemVzLmxlbmd0aDtcbiAgICB2YXIgd2lkdGggPSBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGg7XG5cbiAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpICYmIENvbXBvbmVudHMuUnVuLmlzT2Zmc2V0KCc8JykpIHtcbiAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIEV2ZW50cy5lbWl0KCd0cmFuc2xhdGUuanVtcCcpO1xuXG4gICAgICAgIFRyYW5zbGF0ZS5zZXQod2lkdGggKiAobGVuZ3RoIC0gMSkpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBUcmFuc2xhdGUuc2V0KC13aWR0aCAtIGdhcCAqIGxlbmd0aCk7XG4gICAgfVxuXG4gICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSAmJiBDb21wb25lbnRzLlJ1bi5pc09mZnNldCgnPicpKSB7XG4gICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uYWZ0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICBFdmVudHMuZW1pdCgndHJhbnNsYXRlLmp1bXAnKTtcblxuICAgICAgICBUcmFuc2xhdGUuc2V0KDApO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBUcmFuc2xhdGUuc2V0KHdpZHRoICogbGVuZ3RoICsgZ2FwICogbGVuZ3RoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gVHJhbnNsYXRlLnNldChjb250ZXh0Lm1vdmVtZW50KTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0cmFuc2xhdGU6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgIFRyYW5zbGF0ZS5yZW1vdmUoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIFRyYW5zbGF0ZTtcbn1cblxuZnVuY3Rpb24gVHJhbnNpdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSG9sZHMgaW5hY3Rpdml0eSBzdGF0dXMgb2YgdHJhbnNpdGlvbi5cbiAgICogV2hlbiB0cnVlIHRyYW5zaXRpb24gaXMgbm90IGFwcGxpZWQuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgdmFyIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgdmFyIFRyYW5zaXRpb24gPSB7XG4gICAgLyoqXG4gICAgICogQ29tcG9zZXMgc3RyaW5nIG9mIHRoZSBDU1MgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBjb21wb3NlOiBmdW5jdGlvbiBjb21wb3NlKHByb3BlcnR5KSB7XG4gICAgICB2YXIgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5ncztcblxuICAgICAgaWYgKCFkaXNhYmxlZCkge1xuICAgICAgICByZXR1cm4gcHJvcGVydHkgKyAnICcgKyB0aGlzLmR1cmF0aW9uICsgJ21zICcgKyBzZXR0aW5ncy5hbmltYXRpb25UaW1pbmdGdW5jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvcGVydHkgKyAnIDBtcyAnICsgc2V0dGluZ3MuYW5pbWF0aW9uVGltaW5nRnVuYztcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRyYW5zaXRpb24gb24gSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmc9fSBwcm9wZXJ0eVxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoKSB7XG4gICAgICB2YXIgcHJvcGVydHkgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICd0cmFuc2Zvcm0nO1xuXG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gdGhpcy5jb21wb3NlKHByb3BlcnR5KTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHZhbHVlIG9mIHRyYW5zaXRpb24gZnJvbSBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUudHJhbnNpdGlvbiA9ICcnO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJ1bnMgY2FsbGJhY2sgYWZ0ZXIgYW5pbWF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhZnRlcjogZnVuY3Rpb24gYWZ0ZXIoY2FsbGJhY2spIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSwgdGhpcy5kdXJhdGlvbik7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlIHRyYW5zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGVuYWJsZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgICAgdGhpcy5zZXQoKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlIHRyYW5zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGRpc2FibGU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICBkaXNhYmxlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMuc2V0KCk7XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShUcmFuc2l0aW9uLCAnZHVyYXRpb24nLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBkdXJhdGlvbiBvZiB0aGUgdHJhbnNpdGlvbiBiYXNlZFxuICAgICAqIG9uIGN1cnJlbnRseSBydW5uaW5nIGFuaW1hdGlvbiB0eXBlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3M7XG5cbiAgICAgIGlmIChHbGlkZS5pc1R5cGUoJ3NsaWRlcicpICYmIENvbXBvbmVudHMuUnVuLm9mZnNldCkge1xuICAgICAgICByZXR1cm4gc2V0dGluZ3MucmV3aW5kRHVyYXRpb247XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZXR0aW5ncy5hbmltYXRpb25EdXJhdGlvbjtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBTZXQgdHJhbnNpdGlvbiBgc3R5bGVgIHZhbHVlOlxuICAgKiAtIG9uIGVhY2ggbW92aW5nLCBiZWNhdXNlIGl0IG1heSBiZSBjbGVhcmVkIGJ5IG9mZnNldCBtb3ZlXG4gICAqL1xuICBFdmVudHMub24oJ21vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgVHJhbnNpdGlvbi5zZXQoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIERpc2FibGUgdHJhbnNpdGlvbjpcbiAgICogLSBiZWZvcmUgaW5pdGlhbCBidWlsZCB0byBhdm9pZCB0cmFuc2l0aW9uaW5nIGZyb20gYDBgIHRvIGBzdGFydEF0YCBpbmRleFxuICAgKiAtIHdoaWxlIHJlc2l6aW5nIHdpbmRvdyBhbmQgcmVjYWxjdWxhdGluZyBkaW1lbnRpb25zXG4gICAqIC0gb24ganVtcGluZyBmcm9tIG9mZnNldCB0cmFuc2l0aW9uIGF0IHN0YXJ0IGFuZCBlbmQgZWRnZXMgaW4gYGNhcm91c2VsYCB0eXBlXG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAncmVzaXplJywgJ3RyYW5zbGF0ZS5qdW1wJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBUcmFuc2l0aW9uLmRpc2FibGUoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEVuYWJsZSB0cmFuc2l0aW9uOlxuICAgKiAtIG9uIGVhY2ggcnVubmluZywgYmVjYXVzZSBpdCBtYXkgYmUgZGlzYWJsZWQgYnkgb2Zmc2V0IG1vdmVcbiAgICovXG4gIEV2ZW50cy5vbigncnVuJywgZnVuY3Rpb24gKCkge1xuICAgIFRyYW5zaXRpb24uZW5hYmxlKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgdHJhbnNpdGlvbjpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgVHJhbnNpdGlvbi5yZW1vdmUoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIFRyYW5zaXRpb247XG59XG5cbi8qKlxuICogVGVzdCB2aWEgYSBnZXR0ZXIgaW4gdGhlIG9wdGlvbnMgb2JqZWN0IHRvIHNlZVxuICogaWYgdGhlIHBhc3NpdmUgcHJvcGVydHkgaXMgYWNjZXNzZWQuXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vV0lDRy9FdmVudExpc3RlbmVyT3B0aW9ucy9ibG9iL2doLXBhZ2VzL2V4cGxhaW5lci5tZCNmZWF0dXJlLWRldGVjdGlvblxuICovXG5cbnZhciBzdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0UGFzc2l2ZScsIG51bGwsIG9wdHMpO1xuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGVzdFBhc3NpdmUnLCBudWxsLCBvcHRzKTtcbn0gY2F0Y2ggKGUpIHt9XG5cbnZhciBzdXBwb3J0c1Bhc3NpdmUkMSA9IHN1cHBvcnRzUGFzc2l2ZTtcblxudmFyIFNUQVJUX0VWRU5UUyA9IFsndG91Y2hzdGFydCcsICdtb3VzZWRvd24nXTtcbnZhciBNT1ZFX0VWRU5UUyA9IFsndG91Y2htb3ZlJywgJ21vdXNlbW92ZSddO1xudmFyIEVORF9FVkVOVFMgPSBbJ3RvdWNoZW5kJywgJ3RvdWNoY2FuY2VsJywgJ21vdXNldXAnLCAnbW91c2VsZWF2ZSddO1xudmFyIE1PVVNFX0VWRU5UUyA9IFsnbW91c2Vkb3duJywgJ21vdXNlbW92ZScsICdtb3VzZXVwJywgJ21vdXNlbGVhdmUnXTtcblxuZnVuY3Rpb24gU3dpcGUgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICB2YXIgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpO1xuXG4gIHZhciBzd2lwZVNpbiA9IDA7XG4gIHZhciBzd2lwZVN0YXJ0WCA9IDA7XG4gIHZhciBzd2lwZVN0YXJ0WSA9IDA7XG4gIHZhciBkaXNhYmxlZCA9IGZhbHNlO1xuICB2YXIgY2FwdHVyZSA9IHN1cHBvcnRzUGFzc2l2ZSQxID8geyBwYXNzaXZlOiB0cnVlIH0gOiBmYWxzZTtcblxuICB2YXIgU3dpcGUgPSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgc3dpcGUgYmluZGluZ3MuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMuYmluZFN3aXBlU3RhcnQoKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBgc3dpcGVzdGFydGAgZXZlbnQuIENhbGN1bGF0ZXMgZW50cnkgcG9pbnRzIG9mIHRoZSB1c2VyJ3MgdGFwLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoZXZlbnQpIHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuXG4gICAgICAgIHZhciBzd2lwZSA9IHRoaXMudG91Y2hlcyhldmVudCk7XG5cbiAgICAgICAgc3dpcGVTaW4gPSBudWxsO1xuICAgICAgICBzd2lwZVN0YXJ0WCA9IHRvSW50KHN3aXBlLnBhZ2VYKTtcbiAgICAgICAgc3dpcGVTdGFydFkgPSB0b0ludChzd2lwZS5wYWdlWSk7XG5cbiAgICAgICAgdGhpcy5iaW5kU3dpcGVNb3ZlKCk7XG4gICAgICAgIHRoaXMuYmluZFN3aXBlRW5kKCk7XG5cbiAgICAgICAgRXZlbnRzLmVtaXQoJ3N3aXBlLnN0YXJ0Jyk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgYHN3aXBlbW92ZWAgZXZlbnQuIENhbGN1bGF0ZXMgdXNlcidzIHRhcCBhbmdsZSBhbmQgZGlzdGFuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBtb3ZlOiBmdW5jdGlvbiBtb3ZlKGV2ZW50KSB7XG4gICAgICBpZiAoIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgIHZhciBfR2xpZGUkc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5ncyxcbiAgICAgICAgICAgIHRvdWNoQW5nbGUgPSBfR2xpZGUkc2V0dGluZ3MudG91Y2hBbmdsZSxcbiAgICAgICAgICAgIHRvdWNoUmF0aW8gPSBfR2xpZGUkc2V0dGluZ3MudG91Y2hSYXRpbyxcbiAgICAgICAgICAgIGNsYXNzZXMgPSBfR2xpZGUkc2V0dGluZ3MuY2xhc3NlcztcblxuXG4gICAgICAgIHZhciBzd2lwZSA9IHRoaXMudG91Y2hlcyhldmVudCk7XG5cbiAgICAgICAgdmFyIHN1YkV4U3ggPSB0b0ludChzd2lwZS5wYWdlWCkgLSBzd2lwZVN0YXJ0WDtcbiAgICAgICAgdmFyIHN1YkV5U3kgPSB0b0ludChzd2lwZS5wYWdlWSkgLSBzd2lwZVN0YXJ0WTtcbiAgICAgICAgdmFyIHBvd0VYID0gTWF0aC5hYnMoc3ViRXhTeCA8PCAyKTtcbiAgICAgICAgdmFyIHBvd0VZID0gTWF0aC5hYnMoc3ViRXlTeSA8PCAyKTtcbiAgICAgICAgdmFyIHN3aXBlSHlwb3RlbnVzZSA9IE1hdGguc3FydChwb3dFWCArIHBvd0VZKTtcbiAgICAgICAgdmFyIHN3aXBlQ2F0aGV0dXMgPSBNYXRoLnNxcnQocG93RVkpO1xuXG4gICAgICAgIHN3aXBlU2luID0gTWF0aC5hc2luKHN3aXBlQ2F0aGV0dXMgLyBzd2lwZUh5cG90ZW51c2UpO1xuXG4gICAgICAgIGlmIChzd2lwZVNpbiAqIDE4MCAvIE1hdGguUEkgPCB0b3VjaEFuZ2xlKSB7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICBDb21wb25lbnRzLk1vdmUubWFrZShzdWJFeFN4ICogdG9GbG9hdCh0b3VjaFJhdGlvKSk7XG5cbiAgICAgICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QuYWRkKGNsYXNzZXMuZHJhZ2dpbmcpO1xuXG4gICAgICAgICAgRXZlbnRzLmVtaXQoJ3N3aXBlLm1vdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBgc3dpcGVlbmRgIGV2ZW50LiBGaW5pdGlhbGl6ZXMgdXNlcidzIHRhcCBhbmQgZGVjaWRlcyBhYm91dCBnbGlkZSBtb3ZlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBlbmQ6IGZ1bmN0aW9uIGVuZChldmVudCkge1xuICAgICAgaWYgKCFHbGlkZS5kaXNhYmxlZCkge1xuICAgICAgICB2YXIgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5ncztcblxuICAgICAgICB2YXIgc3dpcGUgPSB0aGlzLnRvdWNoZXMoZXZlbnQpO1xuICAgICAgICB2YXIgdGhyZXNob2xkID0gdGhpcy50aHJlc2hvbGQoZXZlbnQpO1xuXG4gICAgICAgIHZhciBzd2lwZURpc3RhbmNlID0gc3dpcGUucGFnZVggLSBzd2lwZVN0YXJ0WDtcbiAgICAgICAgdmFyIHN3aXBlRGVnID0gc3dpcGVTaW4gKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICB2YXIgc3RlcHMgPSBNYXRoLnJvdW5kKHN3aXBlRGlzdGFuY2UgLyBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGgpO1xuXG4gICAgICAgIHRoaXMuZW5hYmxlKCk7XG5cbiAgICAgICAgaWYgKHN3aXBlRGlzdGFuY2UgPiB0aHJlc2hvbGQgJiYgc3dpcGVEZWcgPCBzZXR0aW5ncy50b3VjaEFuZ2xlKSB7XG4gICAgICAgICAgLy8gV2hpbGUgc3dpcGUgaXMgcG9zaXRpdmUgYW5kIGdyZWF0ZXIgdGhhbiB0aHJlc2hvbGQgbW92ZSBiYWNrd2FyZC5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MucGVyVG91Y2gpIHtcbiAgICAgICAgICAgIHN0ZXBzID0gTWF0aC5taW4oc3RlcHMsIHRvSW50KHNldHRpbmdzLnBlclRvdWNoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKENvbXBvbmVudHMuRGlyZWN0aW9uLmlzKCdydGwnKSkge1xuICAgICAgICAgICAgc3RlcHMgPSAtc3RlcHM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKCc8JyArIHN0ZXBzKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3dpcGVEaXN0YW5jZSA8IC10aHJlc2hvbGQgJiYgc3dpcGVEZWcgPCBzZXR0aW5ncy50b3VjaEFuZ2xlKSB7XG4gICAgICAgICAgLy8gV2hpbGUgc3dpcGUgaXMgbmVnYXRpdmUgYW5kIGxvd2VyIHRoYW4gbmVnYXRpdmUgdGhyZXNob2xkIG1vdmUgZm9yd2FyZC5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MucGVyVG91Y2gpIHtcbiAgICAgICAgICAgIHN0ZXBzID0gTWF0aC5tYXgoc3RlcHMsIC10b0ludChzZXR0aW5ncy5wZXJUb3VjaCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChDb21wb25lbnRzLkRpcmVjdGlvbi5pcygncnRsJykpIHtcbiAgICAgICAgICAgIHN0ZXBzID0gLXN0ZXBzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZSgnPicgKyBzdGVwcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFdoaWxlIHN3aXBlIGRvbid0IHJlYWNoIGRpc3RhbmNlIGFwcGx5IHByZXZpb3VzIHRyYW5zZm9ybS5cbiAgICAgICAgICBDb21wb25lbnRzLk1vdmUubWFrZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LnJlbW92ZShzZXR0aW5ncy5jbGFzc2VzLmRyYWdnaW5nKTtcblxuICAgICAgICB0aGlzLnVuYmluZFN3aXBlTW92ZSgpO1xuICAgICAgICB0aGlzLnVuYmluZFN3aXBlRW5kKCk7XG5cbiAgICAgICAgRXZlbnRzLmVtaXQoJ3N3aXBlLmVuZCcpO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEJpbmRzIHN3aXBlJ3Mgc3RhcnRpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmRTd2lwZVN0YXJ0OiBmdW5jdGlvbiBiaW5kU3dpcGVTdGFydCgpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzO1xuXG4gICAgICBpZiAoc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgQmluZGVyLm9uKFNUQVJUX0VWRU5UU1swXSwgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIF90aGlzLnN0YXJ0KGV2ZW50KTtcbiAgICAgICAgfSwgY2FwdHVyZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXR0aW5ncy5kcmFnVGhyZXNob2xkKSB7XG4gICAgICAgIEJpbmRlci5vbihTVEFSVF9FVkVOVFNbMV0sIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBfdGhpcy5zdGFydChldmVudCk7XG4gICAgICAgIH0sIGNhcHR1cmUpO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgc3dpcGUncyBzdGFydGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kU3dpcGVTdGFydDogZnVuY3Rpb24gdW5iaW5kU3dpcGVTdGFydCgpIHtcbiAgICAgIEJpbmRlci5vZmYoU1RBUlRfRVZFTlRTWzBdLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgY2FwdHVyZSk7XG4gICAgICBCaW5kZXIub2ZmKFNUQVJUX0VWRU5UU1sxXSwgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIGNhcHR1cmUpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEJpbmRzIHN3aXBlJ3MgbW92aW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kU3dpcGVNb3ZlOiBmdW5jdGlvbiBiaW5kU3dpcGVNb3ZlKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIEJpbmRlci5vbihNT1ZFX0VWRU5UUywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIHRocm90dGxlKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBfdGhpczIubW92ZShldmVudCk7XG4gICAgICB9LCBHbGlkZS5zZXR0aW5ncy50aHJvdHRsZSksIGNhcHR1cmUpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgc3dpcGUncyBtb3ZpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZFN3aXBlTW92ZTogZnVuY3Rpb24gdW5iaW5kU3dpcGVNb3ZlKCkge1xuICAgICAgQmluZGVyLm9mZihNT1ZFX0VWRU5UUywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIGNhcHR1cmUpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEJpbmRzIHN3aXBlJ3MgZW5kaW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kU3dpcGVFbmQ6IGZ1bmN0aW9uIGJpbmRTd2lwZUVuZCgpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICBCaW5kZXIub24oRU5EX0VWRU5UUywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBfdGhpczMuZW5kKGV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgc3dpcGUncyBlbmRpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZFN3aXBlRW5kOiBmdW5jdGlvbiB1bmJpbmRTd2lwZUVuZCgpIHtcbiAgICAgIEJpbmRlci5vZmYoRU5EX0VWRU5UUywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZXMgZXZlbnQgdG91Y2hlcyBwb2ludHMgYWNjb3J0aW5nIHRvIGRpZmZlcmVudCB0eXBlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIHRvdWNoZXM6IGZ1bmN0aW9uIHRvdWNoZXMoZXZlbnQpIHtcbiAgICAgIGlmIChNT1VTRV9FVkVOVFMuaW5kZXhPZihldmVudC50eXBlKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV2ZW50LnRvdWNoZXNbMF0gfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiBtaW5pbXVtIHN3aXBlIGRpc3RhbmNlIHNldHRpbmdzIGJhc2VkIG9uIGV2ZW50IHR5cGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgdGhyZXNob2xkOiBmdW5jdGlvbiB0aHJlc2hvbGQoZXZlbnQpIHtcbiAgICAgIHZhciBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzO1xuXG4gICAgICBpZiAoTU9VU0VfRVZFTlRTLmluZGV4T2YoZXZlbnQudHlwZSkgPiAtMSkge1xuICAgICAgICByZXR1cm4gc2V0dGluZ3MuZHJhZ1RocmVzaG9sZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNldHRpbmdzLnN3aXBlVGhyZXNob2xkO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgc3dpcGUgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzZWxmfVxuICAgICAqL1xuICAgIGVuYWJsZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmVuYWJsZSgpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlcyBzd2lwZSBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3NlbGZ9XG4gICAgICovXG4gICAgZGlzYWJsZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgIGRpc2FibGVkID0gdHJ1ZTtcblxuICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmRpc2FibGUoKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgY29tcG9uZW50IGNsYXNzOlxuICAgKiAtIGFmdGVyIGluaXRpYWwgYnVpbGRpbmdcbiAgICovXG4gIEV2ZW50cy5vbignYnVpbGQuYWZ0ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LmFkZChHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLnN3aXBlYWJsZSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgc3dpcGluZyBiaW5kaW5nczpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byByZW1vdmUgYWRkZWQgRXZlbnRMaXN0ZW5lcnNcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBTd2lwZS51bmJpbmRTd2lwZVN0YXJ0KCk7XG4gICAgU3dpcGUudW5iaW5kU3dpcGVNb3ZlKCk7XG4gICAgU3dpcGUudW5iaW5kU3dpcGVFbmQoKTtcbiAgICBCaW5kZXIuZGVzdHJveSgpO1xuICB9KTtcblxuICByZXR1cm4gU3dpcGU7XG59XG5cbmZ1bmN0aW9uIEltYWdlcyAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIHZhciBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKCk7XG5cbiAgdmFyIEltYWdlcyA9IHtcbiAgICAvKipcbiAgICAgKiBCaW5kcyBsaXN0ZW5lciB0byBnbGlkZSB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudDogZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgICB0aGlzLmJpbmQoKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBgZHJhZ3N0YXJ0YCBldmVudCBvbiB3cmFwcGVyIHRvIHByZXZlbnQgZHJhZ2dpbmcgaW1hZ2VzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgQmluZGVyLm9uKCdkcmFnc3RhcnQnLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgdGhpcy5kcmFnc3RhcnQpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgYGRyYWdzdGFydGAgZXZlbnQgb24gd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICBCaW5kZXIub2ZmKCdkcmFnc3RhcnQnLCBDb21wb25lbnRzLkh0bWwud3JhcHBlcik7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgaGFuZGxlci4gUHJldmVudHMgZHJhZ2dpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGRyYWdzdGFydDogZnVuY3Rpb24gZHJhZ3N0YXJ0KGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGZyb20gaW1hZ2VzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIHJlbW92ZSBhZGRlZCBFdmVudExpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgIEltYWdlcy51bmJpbmQoKTtcbiAgICBCaW5kZXIuZGVzdHJveSgpO1xuICB9KTtcblxuICByZXR1cm4gSW1hZ2VzO1xufVxuXG5mdW5jdGlvbiBBbmNob3JzIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgdmFyIEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKTtcblxuICAvKipcbiAgICogSG9sZHMgZGV0YWNoaW5nIHN0YXR1cyBvZiBhbmNob3JzLlxuICAgKiBQcmV2ZW50cyBkZXRhY2hpbmcgb2YgYWxyZWFkeSBkZXRhY2hlZCBhbmNob3JzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIHZhciBkZXRhY2hlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBIb2xkcyBwcmV2ZW50aW5nIHN0YXR1cyBvZiBhbmNob3JzLlxuICAgKiBJZiBgdHJ1ZWAgcmVkaXJlY3Rpb24gYWZ0ZXIgY2xpY2sgd2lsbCBiZSBkaXNhYmxlZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICB2YXIgcHJldmVudGVkID0gZmFsc2U7XG5cbiAgdmFyIEFuY2hvcnMgPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXBzIGEgaW5pdGlhbCBzdGF0ZSBvZiBhbmNob3JzIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIC8qKlxuICAgICAgICogSG9sZHMgY29sbGVjdGlvbiBvZiBhbmNob3JzIGVsZW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwcml2YXRlXG4gICAgICAgKiBAdHlwZSB7SFRNTENvbGxlY3Rpb259XG4gICAgICAgKi9cbiAgICAgIHRoaXMuX2EgPSBDb21wb25lbnRzLkh0bWwud3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG5cbiAgICAgIHRoaXMuYmluZCgpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEJpbmRzIGV2ZW50cyB0byBhbmNob3JzIGluc2lkZSBhIHRyYWNrLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgQmluZGVyLm9uKCdjbGljaycsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCB0aGlzLmNsaWNrKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIGV2ZW50cyBhdHRhY2hlZCB0byBhbmNob3JzIGluc2lkZSBhIHRyYWNrLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIEJpbmRlci5vZmYoJ2NsaWNrJywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LiBQcmV2ZW50cyBjbGlja3Mgd2hlbiBnbGlkZSBpcyBpbiBgcHJldmVudGAgc3RhdHVzLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBldmVudFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgY2xpY2s6IGZ1bmN0aW9uIGNsaWNrKGV2ZW50KSB7XG4gICAgICBpZiAocHJldmVudGVkKSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIGFuY2hvcnMgY2xpY2sgZXZlbnQgaW5zaWRlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBkZXRhY2g6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIHByZXZlbnRlZCA9IHRydWU7XG5cbiAgICAgIGlmICghZGV0YWNoZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5kcmFnZ2FibGUgPSBmYWxzZTtcblxuICAgICAgICAgIHRoaXMuaXRlbXNbaV0uc2V0QXR0cmlidXRlKCdkYXRhLWhyZWYnLCB0aGlzLml0ZW1zW2ldLmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcblxuICAgICAgICAgIHRoaXMuaXRlbXNbaV0ucmVtb3ZlQXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkZXRhY2hlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEF0dGFjaGVzIGFuY2hvcnMgY2xpY2sgZXZlbnRzIGluc2lkZSBnbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3NlbGZ9XG4gICAgICovXG4gICAgYXR0YWNoOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICBwcmV2ZW50ZWQgPSBmYWxzZTtcblxuICAgICAgaWYgKGRldGFjaGVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZHJhZ2dhYmxlID0gdHJ1ZTtcblxuICAgICAgICAgIHRoaXMuaXRlbXNbaV0uc2V0QXR0cmlidXRlKCdocmVmJywgdGhpcy5pdGVtc1tpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaHJlZicpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRldGFjaGVkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfTtcblxuICBkZWZpbmUoQW5jaG9ycywgJ2l0ZW1zJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgY29sbGVjdGlvbiBvZiB0aGUgYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIEFuY2hvcnMuX2E7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogRGV0YWNoIGFuY2hvcnMgaW5zaWRlIHNsaWRlczpcbiAgICogLSBvbiBzd2lwaW5nLCBzbyB0aGV5IHdvbid0IHJlZGlyZWN0IHRvIGl0cyBgaHJlZmAgYXR0cmlidXRlc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdzd2lwZS5tb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgIEFuY2hvcnMuZGV0YWNoKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW5jaG9ycyBpbnNpZGUgc2xpZGVzOlxuICAgKiAtIGFmdGVyIHN3aXBpbmcgYW5kIHRyYW5zaXRpb25zIGVuZHMsIHNvIHRoZXkgY2FuIHJlZGlyZWN0IGFmdGVyIGNsaWNrIGFnYWluXG4gICAqL1xuICBFdmVudHMub24oJ3N3aXBlLmVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uYWZ0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgQW5jaG9ycy5hdHRhY2goKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFVuYmluZCBhbmNob3JzIGluc2lkZSBzbGlkZXM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gYnJpbmcgYW5jaG9ycyB0byBpdHMgaW5pdGlhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgIEFuY2hvcnMuYXR0YWNoKCk7XG4gICAgQW5jaG9ycy51bmJpbmQoKTtcbiAgICBCaW5kZXIuZGVzdHJveSgpO1xuICB9KTtcblxuICByZXR1cm4gQW5jaG9ycztcbn1cblxudmFyIE5BVl9TRUxFQ1RPUiA9ICdbZGF0YS1nbGlkZS1lbD1cImNvbnRyb2xzW25hdl1cIl0nO1xudmFyIENPTlRST0xTX1NFTEVDVE9SID0gJ1tkYXRhLWdsaWRlLWVsXj1cImNvbnRyb2xzXCJdJztcblxuZnVuY3Rpb24gQ29udHJvbHMgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICB2YXIgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpO1xuXG4gIHZhciBjYXB0dXJlID0gc3VwcG9ydHNQYXNzaXZlJDEgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlO1xuXG4gIHZhciBDb250cm9scyA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0cyBhcnJvd3MuIEJpbmRzIGV2ZW50cyBsaXN0ZW5lcnNcbiAgICAgKiB0byB0aGUgYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIC8qKlxuICAgICAgICogQ29sbGVjdGlvbiBvZiBuYXZpZ2F0aW9uIEhUTUwgZWxlbWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIEB0eXBlIHtIVE1MQ29sbGVjdGlvbn1cbiAgICAgICAqL1xuICAgICAgdGhpcy5fbiA9IENvbXBvbmVudHMuSHRtbC5yb290LnF1ZXJ5U2VsZWN0b3JBbGwoTkFWX1NFTEVDVE9SKTtcblxuICAgICAgLyoqXG4gICAgICAgKiBDb2xsZWN0aW9uIG9mIGNvbnRyb2xzIEhUTUwgZWxlbWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIEB0eXBlIHtIVE1MQ29sbGVjdGlvbn1cbiAgICAgICAqL1xuICAgICAgdGhpcy5fYyA9IENvbXBvbmVudHMuSHRtbC5yb290LnF1ZXJ5U2VsZWN0b3JBbGwoQ09OVFJPTFNfU0VMRUNUT1IpO1xuXG4gICAgICB0aGlzLmFkZEJpbmRpbmdzKCk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhY3RpdmUgY2xhc3MgdG8gY3VycmVudCBzbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0QWN0aXZlOiBmdW5jdGlvbiBzZXRBY3RpdmUoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyh0aGlzLl9uW2ldLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmVBY3RpdmU6IGZ1bmN0aW9uIHJlbW92ZUFjdGl2ZSgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKHRoaXMuX25baV0uY2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgYWN0aXZlIGNsYXNzIG9uIGl0ZW1zIGluc2lkZSBuYXZpZ2F0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGNvbnRyb2xzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhZGRDbGFzczogZnVuY3Rpb24gYWRkQ2xhc3MoY29udHJvbHMpIHtcbiAgICAgIHZhciBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzO1xuICAgICAgdmFyIGl0ZW0gPSBjb250cm9sc1tHbGlkZS5pbmRleF07XG5cbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChzZXR0aW5ncy5jbGFzc2VzLmFjdGl2ZU5hdik7XG5cbiAgICAgICAgc2libGluZ3MoaXRlbSkuZm9yRWFjaChmdW5jdGlvbiAoc2libGluZykge1xuICAgICAgICAgIHNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZShzZXR0aW5ncy5jbGFzc2VzLmFjdGl2ZU5hdik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWN0aXZlIGNsYXNzIGZyb20gYWN0aXZlIGNvbnRyb2wuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gY29udHJvbHNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiByZW1vdmVDbGFzcyhjb250cm9scykge1xuICAgICAgdmFyIGl0ZW0gPSBjb250cm9sc1tHbGlkZS5pbmRleF07XG5cbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLmFjdGl2ZU5hdik7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQWRkcyBoYW5kbGVzIHRvIHRoZSBlYWNoIGdyb3VwIG9mIGNvbnRyb2xzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhZGRCaW5kaW5nczogZnVuY3Rpb24gYWRkQmluZGluZ3MoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5iaW5kKHRoaXMuX2NbaV0uY2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgaGFuZGxlcyBmcm9tIHRoZSBlYWNoIGdyb3VwIG9mIGNvbnRyb2xzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmVCaW5kaW5nczogZnVuY3Rpb24gcmVtb3ZlQmluZGluZ3MoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy51bmJpbmQodGhpcy5fY1tpXS5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgZXZlbnRzIHRvIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbn0gZWxlbWVudHNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoZWxlbWVudHMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgQmluZGVyLm9uKCdjbGljaycsIGVsZW1lbnRzW2ldLCB0aGlzLmNsaWNrKTtcbiAgICAgICAgQmluZGVyLm9uKCd0b3VjaHN0YXJ0JywgZWxlbWVudHNbaV0sIHRoaXMuY2xpY2ssIGNhcHR1cmUpO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgZXZlbnRzIGJpbmRlZCB0byB0aGUgYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSBlbGVtZW50c1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoZWxlbWVudHMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgQmluZGVyLm9mZihbJ2NsaWNrJywgJ3RvdWNoc3RhcnQnXSwgZWxlbWVudHNbaV0pO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgYGNsaWNrYCBldmVudCBvbiB0aGUgYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICogTW92ZXMgc2xpZGVyIGluIGRyaWVjdGlvbiBwcmVjaXNlZCBpblxuICAgICAqIGBkYXRhLWdsaWRlLWRpcmAgYXR0cmlidXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBjbGljazogZnVuY3Rpb24gY2xpY2soZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZShldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1nbGlkZS1kaXInKSkpO1xuICAgIH1cbiAgfTtcblxuICBkZWZpbmUoQ29udHJvbHMsICdpdGVtcycsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGNvbGxlY3Rpb24gb2YgdGhlIGNvbnRyb2xzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIENvbnRyb2xzLl9jO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIFN3YXAgYWN0aXZlIGNsYXNzIG9mIGN1cnJlbnQgbmF2aWdhdGlvbiBpdGVtOlxuICAgKiAtIGFmdGVyIG1vdW50aW5nIHRvIHNldCBpdCB0byBpbml0aWFsIGluZGV4XG4gICAqIC0gYWZ0ZXIgZWFjaCBtb3ZlIHRvIHRoZSBuZXcgaW5kZXhcbiAgICovXG4gIEV2ZW50cy5vbihbJ21vdW50LmFmdGVyJywgJ21vdmUuYWZ0ZXInXSwgZnVuY3Rpb24gKCkge1xuICAgIENvbnRyb2xzLnNldEFjdGl2ZSgpO1xuICB9KTtcblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGFuZCBIVE1MIENsYXNzZXM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgQ29udHJvbHMucmVtb3ZlQmluZGluZ3MoKTtcbiAgICBDb250cm9scy5yZW1vdmVBY3RpdmUoKTtcbiAgICBCaW5kZXIuZGVzdHJveSgpO1xuICB9KTtcblxuICByZXR1cm4gQ29udHJvbHM7XG59XG5cbmZ1bmN0aW9uIEtleWJvYXJkIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgdmFyIEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKTtcblxuICB2YXIgS2V5Ym9hcmQgPSB7XG4gICAgLyoqXG4gICAgICogQmluZHMga2V5Ym9hcmQgZXZlbnRzIG9uIGNvbXBvbmVudCBtb3VudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgaWYgKEdsaWRlLnNldHRpbmdzLmtleWJvYXJkKSB7XG4gICAgICAgIHRoaXMuYmluZCgpO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEFkZHMga2V5Ym9hcmQgcHJlc3MgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgQmluZGVyLm9uKCdrZXl1cCcsIGRvY3VtZW50LCB0aGlzLnByZXNzKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGtleWJvYXJkIHByZXNzIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICBCaW5kZXIub2ZmKCdrZXl1cCcsIGRvY3VtZW50KTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGtleWJvYXJkJ3MgYXJyb3dzIHByZXNzIGFuZCBtb3ZpbmcgZ2xpZGUgZm93YXJkIGFuZCBiYWNrd2FyZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHByZXNzOiBmdW5jdGlvbiBwcmVzcyhldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5KSB7XG4gICAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZSgnPicpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3KSB7XG4gICAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZSgnPCcpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBiaW5kaW5ncyBmcm9tIGtleWJvYXJkOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gcmVtb3ZlIGFkZGVkIGV2ZW50c1xuICAgKiAtIG9uIHVwZGF0aW5nIHRvIHJlbW92ZSBldmVudHMgYmVmb3JlIHJlbW91bnRpbmdcbiAgICovXG4gIEV2ZW50cy5vbihbJ2Rlc3Ryb3knLCAndXBkYXRlJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBLZXlib2FyZC51bmJpbmQoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW91bnQgY29tcG9uZW50XG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVmbGVjdCBwb3RlbnRpYWwgY2hhbmdlcyBpbiBzZXR0aW5nc1xuICAgKi9cbiAgRXZlbnRzLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgS2V5Ym9hcmQubW91bnQoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgYmluZGVyOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gcmVtb3ZlIGxpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBLZXlib2FyZDtcbn1cblxuZnVuY3Rpb24gQXV0b3BsYXkgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICB2YXIgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpO1xuXG4gIHZhciBBdXRvcGxheSA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhdXRvcGxheWluZyBhbmQgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudDogZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgICB0aGlzLnN0YXJ0KCk7XG5cbiAgICAgIGlmIChHbGlkZS5zZXR0aW5ncy5ob3ZlcnBhdXNlKSB7XG4gICAgICAgIHRoaXMuYmluZCgpO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBhdXRvcGxheWluZyBpbiBjb25maWd1cmVkIGludGVydmFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufE51bWJlcn0gZm9yY2UgUnVuIGF1dG9wbGF5aW5nIHdpdGggcGFzc2VkIGludGVydmFsIHJlZ2FyZGxlc3Mgb2YgYGF1dG9wbGF5YCBzZXR0aW5nc1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKEdsaWRlLnNldHRpbmdzLmF1dG9wbGF5KSB7XG4gICAgICAgIGlmIChpc1VuZGVmaW5lZCh0aGlzLl9pKSkge1xuICAgICAgICAgIHRoaXMuX2kgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5zdG9wKCk7XG5cbiAgICAgICAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoJz4nKTtcblxuICAgICAgICAgICAgX3RoaXMuc3RhcnQoKTtcbiAgICAgICAgICB9LCB0aGlzLnRpbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgYXV0b3J1bm5pbmcgb2YgdGhlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgdGhpcy5faSA9IGNsZWFySW50ZXJ2YWwodGhpcy5faSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgYXV0b3BsYXlpbmcgd2hpbGUgbW91c2UgaXMgb3ZlciBnbGlkZSdzIGFyZWEuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgQmluZGVyLm9uKCdtb3VzZW92ZXInLCBDb21wb25lbnRzLkh0bWwucm9vdCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczIuc3RvcCgpO1xuICAgICAgfSk7XG5cbiAgICAgIEJpbmRlci5vbignbW91c2VvdXQnLCBDb21wb25lbnRzLkh0bWwucm9vdCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczIuc3RhcnQoKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFVuYmluZCBtb3VzZW92ZXIgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICBCaW5kZXIub2ZmKFsnbW91c2VvdmVyJywgJ21vdXNlb3V0J10sIENvbXBvbmVudHMuSHRtbC5yb290KTtcbiAgICB9XG4gIH07XG5cbiAgZGVmaW5lKEF1dG9wbGF5LCAndGltZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRpbWUgcGVyaW9kIHZhbHVlIGZvciB0aGUgYXV0b3BsYXkgaW50ZXJ2YWwuIFByaW9yaXRpemVzXG4gICAgICogdGltZXMgaW4gYGRhdGEtZ2xpZGUtYXV0b3BsYXlgIGF0dHJ1YnV0ZXMgb3ZlciBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIGF1dG9wbGF5ID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlc1tHbGlkZS5pbmRleF0uZ2V0QXR0cmlidXRlKCdkYXRhLWdsaWRlLWF1dG9wbGF5Jyk7XG5cbiAgICAgIGlmIChhdXRvcGxheSkge1xuICAgICAgICByZXR1cm4gdG9JbnQoYXV0b3BsYXkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdG9JbnQoR2xpZGUuc2V0dGluZ3MuYXV0b3BsYXkpO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIFN0b3AgYXV0b3BsYXlpbmcgYW5kIHVuYmluZCBldmVudHM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gY2xlYXIgZGVmaW5lZCBpbnRlcnZhbFxuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEkgdG8gcmVzZXQgaW50ZXJ2YWwgdGhhdCBtYXkgY2hhbmdlZFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgZnVuY3Rpb24gKCkge1xuICAgIEF1dG9wbGF5LnVuYmluZCgpO1xuICB9KTtcblxuICAvKipcbiAgICogU3RvcCBhdXRvcGxheWluZzpcbiAgICogLSBiZWZvcmUgZWFjaCBydW4sIHRvIHJlc3RhcnQgYXV0b3BsYXlpbmdcbiAgICogLSBvbiBwYXVzaW5nIHZpYSBBUElcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBjbGVhciBkZWZpbmVkIGludGVydmFsXG4gICAqIC0gd2hpbGUgc3RhcnRpbmcgYSBzd2lwZVxuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEkgdG8gcmVzZXQgaW50ZXJ2YWwgdGhhdCBtYXkgY2hhbmdlZFxuICAgKi9cbiAgRXZlbnRzLm9uKFsncnVuLmJlZm9yZScsICdwYXVzZScsICdkZXN0cm95JywgJ3N3aXBlLnN0YXJ0JywgJ3VwZGF0ZSddLCBmdW5jdGlvbiAoKSB7XG4gICAgQXV0b3BsYXkuc3RvcCgpO1xuICB9KTtcblxuICAvKipcbiAgICogU3RhcnQgYXV0b3BsYXlpbmc6XG4gICAqIC0gYWZ0ZXIgZWFjaCBydW4sIHRvIHJlc3RhcnQgYXV0b3BsYXlpbmdcbiAgICogLSBvbiBwbGF5aW5nIHZpYSBBUElcbiAgICogLSB3aGlsZSBlbmRpbmcgYSBzd2lwZVxuICAgKi9cbiAgRXZlbnRzLm9uKFsncnVuLmFmdGVyJywgJ3BsYXknLCAnc3dpcGUuZW5kJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBBdXRvcGxheS5zdGFydCgpO1xuICB9KTtcblxuICAvKipcbiAgICogUmVtb3VudCBhdXRvcGxheWluZzpcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJIHRvIHJlc2V0IGludGVydmFsIHRoYXQgbWF5IGNoYW5nZWRcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIEF1dG9wbGF5Lm1vdW50KCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBEZXN0cm95IGEgYmluZGVyOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgZ2xpZGUgaW5zdGFuY2UgdG8gY2xlYXJ1cCBsaXN0ZW5lcnNcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBCaW5kZXIuZGVzdHJveSgpO1xuICB9KTtcblxuICByZXR1cm4gQXV0b3BsYXk7XG59XG5cbi8qKlxuICogU29ydHMga2V5cyBvZiBicmVha3BvaW50IG9iamVjdCBzbyB0aGV5IHdpbGwgYmUgb3JkZXJlZCBmcm9tIGxvd2VyIHRvIGJpZ2dlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnRzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBzb3J0QnJlYWtwb2ludHMocG9pbnRzKSB7XG4gIGlmIChpc09iamVjdChwb2ludHMpKSB7XG4gICAgcmV0dXJuIHNvcnRLZXlzKHBvaW50cyk7XG4gIH0gZWxzZSB7XG4gICAgd2FybignQnJlYWtwb2ludHMgb3B0aW9uIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICByZXR1cm4ge307XG59XG5cbmZ1bmN0aW9uIEJyZWFrcG9pbnRzIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgdmFyIEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKTtcblxuICAvKipcbiAgICogSG9sZHMgcmVmZXJlbmNlIHRvIHNldHRpbmdzLlxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgdmFyIHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3M7XG5cbiAgLyoqXG4gICAqIEhvbGRzIHJlZmVyZW5jZSB0byBicmVha3BvaW50cyBvYmplY3QgaW4gc2V0dGluZ3MuIFNvcnRzIGJyZWFrcG9pbnRzXG4gICAqIGZyb20gc21hbGxlciB0byBsYXJnZXIuIEl0IGlzIHJlcXVpcmVkIGluIG9yZGVyIHRvIHByb3BlclxuICAgKiBtYXRjaGluZyBjdXJyZW50bHkgYWN0aXZlIGJyZWFrcG9pbnQgc2V0dGluZ3MuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICB2YXIgcG9pbnRzID0gc29ydEJyZWFrcG9pbnRzKHNldHRpbmdzLmJyZWFrcG9pbnRzKTtcblxuICAvKipcbiAgICogQ2FjaGUgaW5pdGlhbCBzZXR0aW5ncyBiZWZvcmUgb3ZlcndyaXR0aW5nLlxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgdmFyIGRlZmF1bHRzID0gX2V4dGVuZHMoe30sIHNldHRpbmdzKTtcblxuICB2YXIgQnJlYWtwb2ludHMgPSB7XG4gICAgLyoqXG4gICAgICogTWF0Y2hlcyBzZXR0aW5ncyBmb3IgY3VycmVjdGx5IG1hdGNoaW5nIG1lZGlhIGJyZWFrcG9pbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcG9pbnRzXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBtYXRjaDogZnVuY3Rpb24gbWF0Y2gocG9pbnRzKSB7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5tYXRjaE1lZGlhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBmb3IgKHZhciBwb2ludCBpbiBwb2ludHMpIHtcbiAgICAgICAgICBpZiAocG9pbnRzLmhhc093blByb3BlcnR5KHBvaW50KSkge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKCcobWF4LXdpZHRoOiAnICsgcG9pbnQgKyAncHgpJykubWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gcG9pbnRzW3BvaW50XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogT3ZlcndyaXRlIGluc3RhbmNlIHNldHRpbmdzIHdpdGggY3VycmVudGx5IG1hdGNoaW5nIGJyZWFrcG9pbnQgc2V0dGluZ3MuXG4gICAqIFRoaXMgaGFwcGVucyByaWdodCBhZnRlciBjb21wb25lbnQgaW5pdGlhbGl6YXRpb24uXG4gICAqL1xuICBfZXh0ZW5kcyhzZXR0aW5ncywgQnJlYWtwb2ludHMubWF0Y2gocG9pbnRzKSk7XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBnbGlkZSB3aXRoIHNldHRpbmdzIG9mIG1hdGNoZWQgYnJla3BvaW50OlxuICAgKiAtIHdpbmRvdyByZXNpemUgdG8gdXBkYXRlIHNsaWRlclxuICAgKi9cbiAgQmluZGVyLm9uKCdyZXNpemUnLCB3aW5kb3csIHRocm90dGxlKGZ1bmN0aW9uICgpIHtcbiAgICBHbGlkZS5zZXR0aW5ncyA9IG1lcmdlT3B0aW9ucyhzZXR0aW5ncywgQnJlYWtwb2ludHMubWF0Y2gocG9pbnRzKSk7XG4gIH0sIEdsaWRlLnNldHRpbmdzLnRocm90dGxlKSk7XG5cbiAgLyoqXG4gICAqIFJlc29ydCBhbmQgdXBkYXRlIGRlZmF1bHQgc2V0dGluZ3M6XG4gICAqIC0gb24gcmVpbml0IHZpYSBBUEksIHNvIGJyZWFrcG9pbnQgbWF0Y2hpbmcgd2lsbCBiZSBwZXJmb3JtZWQgd2l0aCBvcHRpb25zXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBwb2ludHMgPSBzb3J0QnJlYWtwb2ludHMocG9pbnRzKTtcblxuICAgIGRlZmF1bHRzID0gX2V4dGVuZHMoe30sIHNldHRpbmdzKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFVuYmluZCByZXNpemUgbGlzdGVuZXI6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgQmluZGVyLm9mZigncmVzaXplJywgd2luZG93KTtcbiAgfSk7XG5cbiAgcmV0dXJuIEJyZWFrcG9pbnRzO1xufVxuXG52YXIgQ09NUE9ORU5UUyA9IHtcbiAgLy8gUmVxdWlyZWRcbiAgSHRtbDogSHRtbCxcbiAgVHJhbnNsYXRlOiBUcmFuc2xhdGUsXG4gIFRyYW5zaXRpb246IFRyYW5zaXRpb24sXG4gIERpcmVjdGlvbjogRGlyZWN0aW9uLFxuICBQZWVrOiBQZWVrLFxuICBTaXplczogU2l6ZXMsXG4gIEdhcHM6IEdhcHMsXG4gIE1vdmU6IE1vdmUsXG4gIENsb25lczogQ2xvbmVzLFxuICBSZXNpemU6IFJlc2l6ZSxcbiAgQnVpbGQ6IEJ1aWxkLFxuICBSdW46IFJ1bixcblxuICAvLyBPcHRpb25hbFxuICBTd2lwZTogU3dpcGUsXG4gIEltYWdlczogSW1hZ2VzLFxuICBBbmNob3JzOiBBbmNob3JzLFxuICBDb250cm9sczogQ29udHJvbHMsXG4gIEtleWJvYXJkOiBLZXlib2FyZCxcbiAgQXV0b3BsYXk6IEF1dG9wbGF5LFxuICBCcmVha3BvaW50czogQnJlYWtwb2ludHNcbn07XG5cbnZhciBHbGlkZSQxID0gZnVuY3Rpb24gKF9Db3JlKSB7XG4gIGluaGVyaXRzKEdsaWRlJCQxLCBfQ29yZSk7XG5cbiAgZnVuY3Rpb24gR2xpZGUkJDEoKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgR2xpZGUkJDEpO1xuICAgIHJldHVybiBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChHbGlkZSQkMS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEdsaWRlJCQxKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBjcmVhdGVDbGFzcyhHbGlkZSQkMSwgW3tcbiAgICBrZXk6ICdtb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdmFyIGV4dGVuc2lvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gICAgICByZXR1cm4gZ2V0KEdsaWRlJCQxLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEdsaWRlJCQxLnByb3RvdHlwZSksICdtb3VudCcsIHRoaXMpLmNhbGwodGhpcywgX2V4dGVuZHMoe30sIENPTVBPTkVOVFMsIGV4dGVuc2lvbnMpKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEdsaWRlJCQxO1xufShHbGlkZSk7XG5cbmV4cG9ydCBkZWZhdWx0IEdsaWRlJDE7XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBHbGlkZSBmcm9tIFwiQGdsaWRlanMvZ2xpZGVcIjtcbmNvbnN0IGNvbmZpZyA9IHtcbiAgdHlwZTogXCJjYXJvdXNlbFwiLFxuICBzdGFydEF0OiAwLFxuICBnYXA6IDMwLFxuICBhbmltYXRpb25EdXJhdGlvbjogNTAwMCxcbn07XG5jb25zdCBjb25maWcyID0ge1xuICB0eXBlOiBcImNhcm91c2VsXCIsXG4gIHN0YXJ0QXQ6IDAsXG4gIGdhcDogMzAsXG4gIGFuaW1hdGlvbkR1cmF0aW9uOiA1MDAwLFxuICBhdXRvcGxheTogNTAwMCxcbiAgaG92ZXJwYXVzZTogdHJ1ZSxcbn07XG5uZXcgR2xpZGUoXCIuZ2xpZGVcIiwgY29uZmlnKS5tb3VudCgpO1xubmV3IEdsaWRlKFwiLmdsaWRlMlwiLCBjb25maWcyKS5tb3VudCgpO1xudmFyIG15bWFwID0gTC5tYXAoXCJtYXBpZFwiKS5zZXRWaWV3KFs0MC42NTEyLCAtNzMuODUwNF0sIDEzKTtcbkwudGlsZUxheWVyKFxuICBcImh0dHBzOi8vYXBpLm1hcGJveC5jb20vc3R5bGVzL3YxL3tpZH0vdGlsZXMve3p9L3t4fS97eX0/YWNjZXNzX3Rva2VuPXthY2Nlc3NUb2tlbn1cIixcbiAge1xuICAgIGF0dHJpYnV0aW9uOlxuICAgICAgJ01hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvXCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzLCA8YSBocmVmPVwiaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LXNhLzIuMC9cIj5DQy1CWS1TQTwvYT4sIEltYWdlcnkgwqkgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcGJveC5jb20vXCI+TWFwYm94PC9hPicsXG4gICAgbWF4Wm9vbTogMTgsXG4gICAgaWQ6IFwibWFwYm94L3N0cmVldHMtdjExXCIsXG4gICAgdGlsZVNpemU6IDUxMixcbiAgICB6b29tT2Zmc2V0OiAtMSxcbiAgICBhY2Nlc3NUb2tlbjpcbiAgICAgIFwicGsuZXlKMUlqb2ljblZrYjJ4bWRHOXNjMnRwZVNJc0ltRWlPaUpqYTJKbk9ISjZPRzR4TXpScU16QndPR2hzYTNCMGJtdzNJbjAuOGl0bmd6d1Y2TDdEVzlqbkZZcHFRd1wiLFxuICB9XG4pLmFkZFRvKG15bWFwKTtcbnZhciBtYXJrZXIgPSBMLm1hcmtlcihbNDAuNjcxMiwgLTczLjg1MDRdKS5hZGRUbyhteW1hcCk7XG4iXSwibmFtZXMiOlsiZGVmYXVsdHMiLCJ0eXBlIiwic3RhcnRBdCIsInBlclZpZXciLCJmb2N1c0F0IiwiZ2FwIiwiYXV0b3BsYXkiLCJob3ZlcnBhdXNlIiwia2V5Ym9hcmQiLCJib3VuZCIsInN3aXBlVGhyZXNob2xkIiwiZHJhZ1RocmVzaG9sZCIsInBlclRvdWNoIiwidG91Y2hSYXRpbyIsInRvdWNoQW5nbGUiLCJhbmltYXRpb25EdXJhdGlvbiIsInJld2luZCIsInJld2luZER1cmF0aW9uIiwiYW5pbWF0aW9uVGltaW5nRnVuYyIsInRocm90dGxlIiwiZGlyZWN0aW9uIiwicGVlayIsImJyZWFrcG9pbnRzIiwiY2xhc3NlcyIsImx0ciIsInJ0bCIsInNsaWRlciIsImNhcm91c2VsIiwic3dpcGVhYmxlIiwiZHJhZ2dpbmciLCJjbG9uZVNsaWRlIiwiYWN0aXZlTmF2IiwiYWN0aXZlU2xpZGUiLCJkaXNhYmxlZEFycm93Iiwid2FybiIsIm1zZyIsImNvbnNvbGUiLCJlcnJvciIsIl90eXBlb2YiLCJTeW1ib2wiLCJpdGVyYXRvciIsIm9iaiIsImNvbnN0cnVjdG9yIiwicHJvdG90eXBlIiwiY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIkNvbnN0cnVjdG9yIiwiVHlwZUVycm9yIiwiY3JlYXRlQ2xhc3MiLCJkZWZpbmVQcm9wZXJ0aWVzIiwidGFyZ2V0IiwicHJvcHMiLCJpIiwibGVuZ3RoIiwiZGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwia2V5IiwicHJvdG9Qcm9wcyIsInN0YXRpY1Byb3BzIiwiX2V4dGVuZHMiLCJhc3NpZ24iLCJhcmd1bWVudHMiLCJzb3VyY2UiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJnZXQiLCJvYmplY3QiLCJwcm9wZXJ0eSIsInJlY2VpdmVyIiwiRnVuY3Rpb24iLCJkZXNjIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwidW5kZWZpbmVkIiwicGFyZW50IiwiZ2V0UHJvdG90eXBlT2YiLCJ2YWx1ZSIsImdldHRlciIsImluaGVyaXRzIiwic3ViQ2xhc3MiLCJzdXBlckNsYXNzIiwiY3JlYXRlIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwic2VsZiIsIlJlZmVyZW5jZUVycm9yIiwidG9JbnQiLCJwYXJzZUludCIsInRvRmxvYXQiLCJwYXJzZUZsb2F0IiwiaXNTdHJpbmciLCJpc09iamVjdCIsImlzTnVtYmVyIiwiaXNGdW5jdGlvbiIsImlzVW5kZWZpbmVkIiwiaXNBcnJheSIsIkFycmF5IiwibW91bnQiLCJnbGlkZSIsImV4dGVuc2lvbnMiLCJldmVudHMiLCJjb21wb25lbnRzIiwibmFtZSIsIl9uYW1lIiwiZGVmaW5lIiwicHJvcCIsImRlZmluaXRpb24iLCJzb3J0S2V5cyIsImtleXMiLCJzb3J0IiwicmVkdWNlIiwiciIsImsiLCJtZXJnZU9wdGlvbnMiLCJzZXR0aW5ncyIsIm9wdGlvbnMiLCJFdmVudHNCdXMiLCJob3AiLCJvbiIsImV2ZW50IiwiaGFuZGxlciIsImluZGV4IiwicHVzaCIsInJlbW92ZSIsImVtaXQiLCJjb250ZXh0IiwiZm9yRWFjaCIsIml0ZW0iLCJHbGlkZSIsInNlbGVjdG9yIiwiX2MiLCJfdCIsIl9lIiwiZGlzYWJsZWQiLCJtb3VudCQkMSIsIm11dGF0ZSIsInRyYW5zZm9ybWVycyIsInVwZGF0ZSIsImdvIiwicGF0dGVybiIsIlJ1biIsIm1ha2UiLCJtb3ZlIiwiZGlzdGFuY2UiLCJUcmFuc2l0aW9uIiwiZGlzYWJsZSIsIk1vdmUiLCJkZXN0cm95IiwicGxheSIsImludGVydmFsIiwicGF1c2UiLCJlbmFibGUiLCJpc1R5cGUiLCJnZXQkJDEiLCJfbyIsInNldCIsInNldCQkMSIsIm8iLCJfaSIsIl9kIiwic3RhdHVzIiwiQ29tcG9uZW50cyIsIkV2ZW50cyIsIl90aGlzIiwiY2FsY3VsYXRlIiwiYWZ0ZXIiLCJpc1N0YXJ0IiwiaXNFbmQiLCJpc09mZnNldCIsInN0ZXBzIiwiY291bnRhYmxlU3RlcHMiLCJNYXRoIiwibWluIiwiX20iLCJzdGVwIiwic3Vic3RyIiwiSHRtbCIsInNsaWRlcyIsIm5vdyIsIkRhdGUiLCJnZXRUaW1lIiwiZnVuYyIsIndhaXQiLCJ0aW1lb3V0IiwiYXJncyIsInJlc3VsdCIsInByZXZpb3VzIiwibGF0ZXIiLCJsZWFkaW5nIiwiYXBwbHkiLCJ0aHJvdHRsZWQiLCJhdCIsInJlbWFpbmluZyIsImNsZWFyVGltZW91dCIsInRyYWlsaW5nIiwic2V0VGltZW91dCIsImNhbmNlbCIsIk1BUkdJTl9UWVBFIiwiR2FwcyIsImxlbiIsInN0eWxlIiwiRGlyZWN0aW9uIiwibWFyZ2luTGVmdCIsIm1hcmdpblJpZ2h0IiwiU2l6ZXMiLCJ3cmFwcGVyIiwiY2hpbGRyZW4iLCJzaWJsaW5ncyIsIm5vZGUiLCJwYXJlbnROb2RlIiwibiIsImZpcnN0Q2hpbGQiLCJtYXRjaGVkIiwibmV4dFNpYmxpbmciLCJub2RlVHlwZSIsImV4aXN0Iiwid2luZG93IiwiSFRNTEVsZW1lbnQiLCJUUkFDS19TRUxFQ1RPUiIsInJvb3QiLCJ0cmFjayIsInF1ZXJ5U2VsZWN0b3IiLCJzbGljZSIsImZpbHRlciIsInNsaWRlIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJfciIsImRvY3VtZW50IiwidCIsIlBlZWsiLCJfdiIsImJlZm9yZSIsIm9mZnNldCIsIm1vdmVtZW50Iiwic2xpZGVXaWR0aCIsInRyYW5zbGF0ZSIsImlzIiwic2V0dXBTbGlkZXMiLCJ3aWR0aCIsInNldHVwV3JhcHBlciIsImRpbWVudGlvbiIsIndyYXBwZXJTaXplIiwib2Zmc2V0V2lkdGgiLCJncm93IiwiQ2xvbmVzIiwicmVkdWN0b3IiLCJCdWlsZCIsInR5cGVDbGFzcyIsImFjdGl2ZUNsYXNzIiwiYWRkIiwic2libGluZyIsInJlbW92ZUNsYXNzZXMiLCJpdGVtcyIsImNvbGxlY3QiLCJfR2xpZGUkc2V0dGluZ3MiLCJwZWVrSW5jcmVtZW50ZXIiLCJwYXJ0Iiwic3RhcnQiLCJlbmQiLCJtYXgiLCJmbG9vciIsImNsb25lIiwiY2xvbmVOb2RlIiwiX2Nsb25lIiwidW5zaGlmdCIsImFwcGVuZCIsIl9Db21wb25lbnRzJEh0bWwiLCJoYWxmIiwicHJlcGVuZCIsInJldmVyc2UiLCJhcHBlbmRDaGlsZCIsIl9pMiIsImluc2VydEJlZm9yZSIsIl9pMyIsInJlbW92ZUNoaWxkIiwiRXZlbnRzQmluZGVyIiwibGlzdGVuZXJzIiwiZWwiLCJjbG9zdXJlIiwiY2FwdHVyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJvZmYiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiUmVzaXplIiwiQmluZGVyIiwiYmluZCIsInVuYmluZCIsIlZBTElEX0RJUkVDVElPTlMiLCJGTElQRURfTU9WRU1FTlRTIiwicmVzb2x2ZSIsInRva2VuIiwic3BsaXQiLCJqb2luIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImluZGV4T2YiLCJSdGwiLCJtb2RpZnkiLCJHYXAiLCJHcm93IiwiUGVla2luZyIsIkZvY3VzaW5nIiwibXV0YXRvciIsIlRSQU5TRk9STUVSUyIsImNvbmNhdCIsInRyYW5zZm9ybWVyIiwiVHJhbnNsYXRlIiwidHJhbnNmb3JtIiwiY29tcG9zZSIsImR1cmF0aW9uIiwidHJhbnNpdGlvbiIsImNhbGxiYWNrIiwic3VwcG9ydHNQYXNzaXZlIiwib3B0cyIsImUiLCJzdXBwb3J0c1Bhc3NpdmUkMSIsIlNUQVJUX0VWRU5UUyIsIk1PVkVfRVZFTlRTIiwiRU5EX0VWRU5UUyIsIk1PVVNFX0VWRU5UUyIsIlN3aXBlIiwic3dpcGVTaW4iLCJzd2lwZVN0YXJ0WCIsInN3aXBlU3RhcnRZIiwicGFzc2l2ZSIsImJpbmRTd2lwZVN0YXJ0Iiwic3dpcGUiLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsImJpbmRTd2lwZU1vdmUiLCJiaW5kU3dpcGVFbmQiLCJzdWJFeFN4Iiwic3ViRXlTeSIsInBvd0VYIiwiYWJzIiwicG93RVkiLCJzd2lwZUh5cG90ZW51c2UiLCJzcXJ0Iiwic3dpcGVDYXRoZXR1cyIsImFzaW4iLCJQSSIsInN0b3BQcm9wYWdhdGlvbiIsInRocmVzaG9sZCIsInN3aXBlRGlzdGFuY2UiLCJzd2lwZURlZyIsInJvdW5kIiwidW5iaW5kU3dpcGVNb3ZlIiwidW5iaW5kU3dpcGVFbmQiLCJ1bmJpbmRTd2lwZVN0YXJ0IiwiX3RoaXMyIiwiX3RoaXMzIiwiY2hhbmdlZFRvdWNoZXMiLCJJbWFnZXMiLCJkcmFnc3RhcnQiLCJwcmV2ZW50RGVmYXVsdCIsIkFuY2hvcnMiLCJkZXRhY2hlZCIsInByZXZlbnRlZCIsIl9hIiwicXVlcnlTZWxlY3RvckFsbCIsImNsaWNrIiwiZGV0YWNoIiwiZHJhZ2dhYmxlIiwic2V0QXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0YWNoIiwiTkFWX1NFTEVDVE9SIiwiQ09OVFJPTFNfU0VMRUNUT1IiLCJDb250cm9scyIsIl9uIiwiYWRkQmluZGluZ3MiLCJzZXRBY3RpdmUiLCJyZW1vdmVBY3RpdmUiLCJjb250cm9scyIsInJlbW92ZUJpbmRpbmdzIiwiZWxlbWVudHMiLCJjdXJyZW50VGFyZ2V0IiwiS2V5Ym9hcmQiLCJwcmVzcyIsImtleUNvZGUiLCJBdXRvcGxheSIsInNldEludGVydmFsIiwic3RvcCIsInRpbWUiLCJjbGVhckludGVydmFsIiwic29ydEJyZWFrcG9pbnRzIiwicG9pbnRzIiwiQnJlYWtwb2ludHMiLCJtYXRjaCIsIm1hdGNoTWVkaWEiLCJwb2ludCIsIm1hdGNoZXMiLCJDT01QT05FTlRTIiwiR2xpZGUkMSIsIl9Db3JlIiwiR2xpZGUkJDEiLCJjb25maWciLCJjb25maWcyIiwibXltYXAiLCJMIiwibWFwIiwic2V0VmlldyIsInRpbGVMYXllciIsImF0dHJpYnV0aW9uIiwibWF4Wm9vbSIsImlkIiwidGlsZVNpemUiLCJ6b29tT2Zmc2V0IiwiYWNjZXNzVG9rZW4iLCJhZGRUbyIsIm1hcmtlciJdLCJtYXBwaW5ncyI6Ijs7O0VBQUE7Ozs7O0VBTUEsSUFBSUEsUUFBUSxHQUFHO0VBQ2I7Ozs7Ozs7OztFQVNBQyxFQUFBQSxJQUFJLEVBQUUsUUFWTzs7RUFZYjs7Ozs7RUFLQUMsRUFBQUEsT0FBTyxFQUFFLENBakJJOztFQW1CYjs7Ozs7RUFLQUMsRUFBQUEsT0FBTyxFQUFFLENBeEJJOztFQTBCYjs7Ozs7Ozs7O0VBU0FDLEVBQUFBLE9BQU8sRUFBRSxDQW5DSTs7RUFxQ2I7Ozs7O0VBS0FDLEVBQUFBLEdBQUcsRUFBRSxFQTFDUTs7RUE0Q2I7Ozs7O0VBS0FDLEVBQUFBLFFBQVEsRUFBRSxLQWpERzs7RUFtRGI7Ozs7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
