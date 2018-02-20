(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderDOM = void 0;

var renderDOM = function renderDOM(state) {
  var div = document.createElement(div);
  div.innerHTML = "<p>Sorry, even at ".concat(state.date, ", ").concat(state.fruit, " are/is still a fruit.</p>");
  document.body.appendChild(div);
};

exports.renderDOM = renderDOM;

},{}],2:[function(require,module,exports){
"use strict";

var _index = require("../../index.js");

var _utils = require("./utils");

var _dom = require("./dom");

var _ref, _fromEvent, _buttonClicked, _buttonClicked2;

var buttonClicked = (_ref = (_fromEvent = (0, _index.fromEvent)(document, 'click'), (0, _index.filter)(function (event) {
  return event.target.tagName === 'BUTTON';
})(_fromEvent)), (0, _index.map)(function () {
  return {
    date: (0, _utils.getCurrentDateTime)(),
    fruit: (0, _utils.getRandomFruit)()
  };
})(_ref));
_buttonClicked = buttonClicked, (0, _index.sideEffect)(_dom.renderDOM)(_buttonClicked);
_buttonClicked2 = buttonClicked, (0, _index.sideEffect)(function (state) {
  return console.log(state);
})(_buttonClicked2);

},{"../../index.js":4,"./dom":1,"./utils":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentDateTime = exports.getRandomFruit = void 0;
var fruitArray = ["tomatoes", "cucumbers", "eggplants", "squash", "olives", "peppers", "pumpkins", "peas", "avocados", "corn"];

var getRandomFruit = function getRandomFruit() {
  return fruitArray[Math.floor(Math.random() * fruitArray.length)];
};

exports.getRandomFruit = getRandomFruit;

var getCurrentDateTime = function getCurrentDateTime() {
  return new Date(Date.now()).toLocaleString();
};

exports.getCurrentDateTime = getCurrentDateTime;

},{}],4:[function(require,module,exports){
var flatten = require('callbag-flatten');

var map = require('callbag-map');

var forEach = require('callbag-for-each');

var share = require('callbag-share');

var fromObservable = require('callbag-from-obs');

var fromIterable = require('callbag-from-iter');

var fromAsync = require('callbag-from-iter');

var fromEvent = require('callbag-from-event');

var fromPromise = require('callbag-from-promise');

module.exports = {
  // TODO: Make sure everything is multicast
  fromObservable: fromObservable,
  fromIterable: fromIterable,
  fromAsync: fromAsync,
  fromEvent: fromEvent,
  fromPromise: fromPromise,
  sideEffect: require('callbag-for-each'),
  log: function log(res) {
    return forEach(function () {
      var _console;

      return (_console = console).log.apply(_console, arguments);
    })(res);
  },
  map: map,
  accumulate: require('callbag-scan'),
  scan: function scan() {
    throw new Error('If you meant `scan` in the Reactive Stream sense, Please use `accumulate` instead.');
  },
  flatten: require('callbag-flatten'),
  take: require('callbag-take'),
  skip: require('callbag-skip'),
  filter: require('callbag-filter'),
  // switchMap: (newCallbag) => map(newCallbag)
  merge: require('callbag-merge'),
  concat: require('callbag-concat'),
  combine: require('callbag-combine')
};

},{"callbag-combine":5,"callbag-concat":6,"callbag-filter":7,"callbag-flatten":8,"callbag-for-each":9,"callbag-from-event":10,"callbag-from-iter":11,"callbag-from-obs":12,"callbag-from-promise":13,"callbag-map":14,"callbag-merge":15,"callbag-scan":16,"callbag-share":17,"callbag-skip":18,"callbag-take":19}],5:[function(require,module,exports){
const EMPTY = {};

const combine = (...sources) => (start, sink) => {
  if (start !== 0) return;
  const n = sources.length;
  if (n === 0) {
    sink(0, () => {});
    sink(1, []);
    sink(2);
    return;
  }
  let Ns = n; // start counter
  let Nd = n; // data counter
  let Ne = n; // end counter
  const vals = Array(n);
  const sourceTalkbacks = Array(n);
  const talkback = (t, d) => {
    if (t !== 2) return;
    for (let i = 0; i < n; i++) sourceTalkbacks[i](2);
  };
  sources.forEach((source, i) => {
    vals[i] = EMPTY;
    source(0, (t, d) => {
      if (t === 0) {
        sourceTalkbacks[i] = d;
        if (--Ns === 0) sink(0, talkback);
      } else if (t === 1) {
        const _Nd = !Nd ? 0 : vals[i] === EMPTY ? --Nd : Nd;
        vals[i] = d;
        if (_Nd === 0) {
          const arr = Array(n);
          for (let j = 0; j < n; ++j) arr[j] = vals[j];
          sink(1, arr);
        }
      } else if (t === 2) {
        if (--Ne === 0) sink(2);
      } else {
        sink(t, d);
      }
    });
  });
};

module.exports = combine;

},{}],6:[function(require,module,exports){
const concat = (...sources) => (start, sink) => {
  if (start !== 0) return;
  const n = sources.length;
  if (n === 0) {
    sink(0, () => {});
    sink(2);
    return;
  }
  let i = 0;
  let sourceTalkback;
  const talkback = (t, d) => {
    if (t === 1 || t === 2) {
      sourceTalkback(t, d);
    }
  };
  (function next() {
    if (i === n) {
      sink(2);
      return;
    }
    sources[i](0, (t, d) => {
      if (t === 0) {
        sourceTalkback = d;
        if (i === 0) sink(0, talkback);
        else sourceTalkback(1);
      } else if (t === 1) {
        sink(1, d);
      } else if (t === 2) {
        i++;
        next();
      }
    });
  })();
};

module.exports = concat;

},{}],7:[function(require,module,exports){
const filter = condition => source => (start, sink) => {
  if (start !== 0) return;
  let talkback;
  source(0, (t, d) => {
    if (t === 0) {
      talkback = d;
      sink(t, d);
    } else if (t === 1) {
      if (condition(d)) sink(t, d);
      else talkback(1);
    }
    else sink(t, d);
  });
};

module.exports = filter;

},{}],8:[function(require,module,exports){
const flatten = source => (start, sink) => {
  if (start !== 0) return;
  const exists = x => typeof x !== 'undefined';
  const absent = x => typeof x === 'undefined';
  const noop = () => {};
  let outerEnded = false;
  let outerTalkback;
  let innerTalkback;
  function talkback(t) {
    if (t === 1) (innerTalkback || outerTalkback || noop)(1);
    if (t === 2) {
      innerTalkback && innerTalkback(2);
      outerTalkback && outerTalkback(2);
    }
  }
  source(0, (T, D) => {
    if (T === 0) {
      outerTalkback = D;
      sink(0, talkback);
    } else if (T === 1) {
      const innerSource = D;
      if (innerTalkback) innerTalkback(2);
      innerSource(0, (t, d) => {
        if (t === 0) {
          innerTalkback = d;
          innerTalkback(1);
        } else if (t === 1) sink(1, d);
        else if (t === 2 && absent(d)) {
          if (outerEnded) sink(2);
          else {
            innerTalkback = void 0;
            outerTalkback(1);
          }
        }
        else if (t === 2 && exists(d)) sink(2, d);
      });
    } else if (T === 2 && absent(D)) {
      if (!innerTalkback) sink(2);
      else outerEnded = true;
    } else if (T === 2 && exists(D)) sink(2, D);
  });
};

module.exports = flatten;

},{}],9:[function(require,module,exports){
const forEach = operation => source => {
  let talkback;
  source(0, (t, d) => {
    if (t === 0) talkback = d;
    if (t === 1) operation(d);
    if (t === 1 || t === 0) talkback(1);
  });
};

module.exports = forEach;

},{}],10:[function(require,module,exports){
const fromEvent = (node, name) => (start, sink) => {
  if (start !== 0) return;
  const handler = ev => sink(1, ev);
  sink(0, t => {
    if (t === 2) node.removeEventListener(name, handler);
  });
  node.addEventListener(name, handler);
};

module.exports = fromEvent;

},{}],11:[function(require,module,exports){
const fromIter = iter => (start, sink) => {
  if (start !== 0) return;
  const iterator =
    typeof Symbol !== 'undefined' && iter[Symbol.iterator]
      ? iter[Symbol.iterator]()
      : iter;
  let inloop = false;
  let got1 = false;
  let res;
  function loop() {
    inloop = true;
    while (got1) {
      got1 = false;
      res = iterator.next();
      if (res.done) sink(2);
      else sink(1, res.value);
    }
    inloop = false;
  }
  sink(0, t => {
    if (t === 1) {
      got1 = true;
      if (!inloop && !(res && res.done)) loop();
    }
  });
};

module.exports = fromIter;

},{}],12:[function(require,module,exports){
const fromObs = observable => (start, sink) => {
  if (start !== 0) return;
  let dispose;
  sink(0, t => {
    if (t === 2 && dispose) {
      dispose();
    }
  });
  dispose = observable.subscribe({
    next: x => sink(1, x),
    error: e => sink(2, e),
    complete: () => sink(2)
  });
};

module.exports = fromObs;

},{}],13:[function(require,module,exports){
const fromPromise = promise => (start, sink) => {
  if (start !== 0) return;
  let ended = false;
  const onfulfilled = val => {
    if (ended) return;
    sink(1, val);
    sink(2);
  };
  const onrejected = err => {
    if (ended) return;
    sink(2, err);
  };
  promise.then(onfulfilled, onrejected);
  sink(0, t => {
    if (t === 2) ended = true;
  });
};

module.exports = fromPromise;

},{}],14:[function(require,module,exports){
const map = f => source => (start, sink) => {
  if (start !== 0) return;
  source(0, (t, d) => {
    sink(t, t === 1 ? f(d) : d)
  });
};

module.exports = map;

},{}],15:[function(require,module,exports){
function merge(...sources) {
  return (start, sink) => {
    if (start !== 0) return;
    const n = sources.length;
    const sourceTalkbacks = Array(n);
    let startCount = 0;
    let endCount = 0;
    const talkback = t => {
      if (t !== 2) return;
      for (let i = 0; i < n; i++) sourceTalkbacks[i](2);
    };
    for (let i = 0; i < n; i++) {
      sources[i](0, (t, d) => {
        if (t === 0) {
          sourceTalkbacks[i] = d;
          if (++startCount === n) sink(0, talkback);
        } else if (t === 2) {
          if (++endCount === n) sink(2);
        } else sink(t, d);
      });
    }
  };
}

module.exports = merge;

},{}],16:[function(require,module,exports){
function scan(reducer, seed) {
  let hasAcc = arguments.length === 2;
  return source => (start, sink) => {
    if (start !== 0) return;
    let acc = seed;
    source(0, (t, d) => {
      if (t === 1) {
        acc = hasAcc ? reducer(acc, d) : ((hasAcc = true), d);
        sink(1, acc);
      } else sink(t, d);
    });
  };
}

module.exports = scan;

},{}],17:[function(require,module,exports){
const share = source => {
  let sinks = [];
  let sourceTalkback;
  return function shared(start, sink) {
    if (start !== 0) return;
    sinks.push(sink);
    if (sinks.length === 1) {
      source(0, (t, d) => {
        if (t === 0) sourceTalkback = d;
        else for (let s of sinks.slice(0)) s(t, d);
        if (t === 2) sinks = [];
      });
    }
    sink(0, (t, d) => {
      if (t === 0) return;
      if (t === 2) {
        const i = sinks.indexOf(sink);
        if (i > -1) sinks.splice(i, 1);
        if (!sinks.length) sourceTalkback(2);
      } else {
        sourceTalkback(t, d);
      }
    });
  }
}

module.exports = share;

},{}],18:[function(require,module,exports){
const skip = max => source => (start, sink) => {
  if (start !== 0) return;
  let skipped = 0;
  let talkback;
  source(0, (t, d) => {
    if (t === 0) {
      talkback = d;
      sink(t, d);
    } else if (t === 1) {
      if (skipped < max) {
        skipped++;
        talkback(1);
      } else sink(t, d);
    } else {
      sink(t, d);
    }
  });
};

module.exports = skip;

},{}],19:[function(require,module,exports){
const take = max => source => (start, sink) => {
  if (start !== 0) return;
  let taken = 0;
  let sourceTalkback;
  function talkback(t, d) {
    if (taken < max) sourceTalkback(t, d);
  }
  source(0, (t, d) => {
    if (t === 0) {
      sourceTalkback = d;
      sink(0, talkback);
    } else if (t === 1) {
      if (taken < max) {
        taken++;
        sink(t, d);
        if (taken === max) {
          sink(2);
          sourceTalkback(2);
        }
      }
    } else {
      sink(t, d);
    }
  });
};

module.exports = take;

},{}]},{},[2]);
