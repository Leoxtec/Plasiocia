/**
 * bluebird build version 1.0.8
 * Features enabled: core, timers, race, any, call_get, filter, generators, map, nodeify, promisify, props, reduce, settle, some, progress, cancel, synchronous_inspection
*/
/**
 * @preserve Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.Promise=e():"undefined"!=typeof global?global.Promise=e():"undefined"!=typeof self&&(self.Promise=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise, Promise$_CreatePromiseArray, PromiseArray) {

    var SomePromiseArray = require("./some_promise_array.js")(PromiseArray);
    var ASSERT = require("./assert.js");

    function Promise$_Any(promises, useBound, caller) {
        var ret = Promise$_CreatePromiseArray(
            promises,
            SomePromiseArray,
            caller,
            useBound === true && promises._isBound()
                ? promises._boundTo
                : void 0
       );
        var promise = ret.promise();
        if (promise.isRejected()) {
            return promise;
        }
        ret.setHowMany(1);
        ret.setUnwrap();
        ret.init();
        return promise;
    }

    Promise.any = function Promise$Any(promises) {
        return Promise$_Any(promises, false, Promise.any);
    };

    Promise.prototype.any = function Promise$any() {
        return Promise$_Any(this, true, this.any);
    };

};

},{"./assert.js":2,"./some_promise_array.js":35}],2:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = (function(){
    var AssertionError = (function() {
        function AssertionError(a) {
            this.constructor$(a);
            this.message = a;
            this.name = "AssertionError";
        }
        AssertionError.prototype = new Error();
        AssertionError.prototype.constructor = AssertionError;
        AssertionError.prototype.constructor$ = Error;
        return AssertionError;
    })();

    return function assert(boolExpr, message) {
        if (boolExpr === true) return;

        var ret = new AssertionError(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(ret, assert);
        }
        if (console && console.error) {
            console.error(ret.stack + "");
        }
        throw ret;

    };
})();

},{}],3:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
var ASSERT = require("./assert.js");
var schedule = require("./schedule.js");
var Queue = require("./queue.js");
var errorObj = require("./util.js").errorObj;
var tryCatch1 = require("./util.js").tryCatch1;

function Async() {
    this._isTickUsed = false;
    this._length = 0;
    this._lateBuffer = new Queue();
    this._functionBuffer = new Queue(25000 * 3);
    var self = this;
    this.consumeFunctionBuffer = function Async$consumeFunctionBuffer() {
        self._consumeFunctionBuffer();
    };
}

Async.prototype.haveItemsQueued = function Async$haveItemsQueued() {
    return this._length > 0;
};

Async.prototype.invokeLater = function Async$invokeLater(fn, receiver, arg) {
    this._lateBuffer.push(fn, receiver, arg);
    this._queueTick();
};

Async.prototype.invoke = function Async$invoke(fn, receiver, arg) {
    var functionBuffer = this._functionBuffer;
    functionBuffer.push(fn, receiver, arg);
    this._length = functionBuffer.length();
    this._queueTick();
};

Async.prototype._consumeFunctionBuffer =
function Async$_consumeFunctionBuffer() {
    var functionBuffer = this._functionBuffer;
    while(functionBuffer.length() > 0) {
        var fn = functionBuffer.shift();
        var receiver = functionBuffer.shift();
        var arg = functionBuffer.shift();
        fn.call(receiver, arg);
    }
    this._reset();
    this._consumeLateBuffer();
};

Async.prototype._consumeLateBuffer = function Async$_consumeLateBuffer() {
    var buffer = this._lateBuffer;
    while(buffer.length() > 0) {
        var fn = buffer.shift();
        var receiver = buffer.shift();
        var arg = buffer.shift();
        var res = tryCatch1(fn, receiver, arg);
        if (res === errorObj) {
            this._queueTick();
            throw res.e;
        }
    }
};

Async.prototype._queueTick = function Async$_queue() {
    if (!this._isTickUsed) {
        schedule(this.consumeFunctionBuffer);
        this._isTickUsed = true;
    }
};

Async.prototype._reset = function Async$_reset() {
    this._isTickUsed = false;
    this._length = 0;
};

module.exports = new Async();

},{"./assert.js":2,"./queue.js":28,"./schedule.js":31,"./util.js":39}],4:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
var Promise = require("./promise.js")();
module.exports = Promise;
},{"./promise.js":20}],5:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise) {
    Promise.prototype.call = function Promise$call(propertyName) {
        var $_len = arguments.length;var args = new Array($_len - 1); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}

        return this._then(function(obj) {
                return obj[propertyName].apply(obj, args);
            },
            void 0,
            void 0,
            void 0,
            void 0,
            this.call
       );
    };

    function Promise$getter(obj) {
        var prop = typeof this === "string"
            ? this
            : ("" + this);
        return obj[prop];
    }
    Promise.prototype.get = function Promise$get(propertyName) {
        return this._then(
            Promise$getter,
            void 0,
            void 0,
            propertyName,
            void 0,
            this.get
       );
    };
};

},{}],6:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise, INTERNAL) {
    var errors = require("./errors.js");
    var async = require("./async.js");
    var ASSERT = require("./assert.js");
    var CancellationError = errors.CancellationError;
    var SYNC_TOKEN = {};

    Promise.prototype._cancel = function Promise$_cancel() {
        if (!this.isCancellable()) return this;
        var parent;
        if ((parent = this._cancellationParent) !== void 0 &&
			parent.isCancellable()) {
            parent.cancel(SYNC_TOKEN);
            return;
        }
        var err = new CancellationError();
        this._attachExtraTrace(err);
        this._rejectUnchecked(err);
    };

    Promise.prototype.cancel = function Promise$cancel(token) {
        if (!this.isCancellable()) return this;
        if (token === SYNC_TOKEN) {
            this._cancel();
            return this;
        }
        async.invokeLater(this._cancel, this, void 0);
        return this;
    };

    Promise.prototype.cancellable = function Promise$cancellable() {
        if (this._cancellable()) return this;
        this._setCancellable();
        this._cancellationParent = void 0;
        return this;
    };

    Promise.prototype.uncancellable = function Promise$uncancellable() {
        var ret = new Promise(INTERNAL);
        ret._setTrace(this.uncancellable, this);
        ret._follow(this);
        ret._unsetCancellable();
        if (this._isBound()) ret._setBoundTo(this._boundTo);
        return ret;
    };

    Promise.prototype.fork =
    function Promise$fork(didFulfill, didReject, didProgress) {
        var ret = this._then(didFulfill, didReject, didProgress,
            void 0, void 0, this.fork);

        ret._setCancellable();
        ret._cancellationParent = void 0;
        return ret;
    };
};

},{"./assert.js":2,"./async.js":3,"./errors.js":10}],7:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function() {
var ASSERT = require("./assert.js");
var inherits = require("./util.js").inherits;
var defineProperty = require("./es5.js").defineProperty;

var rignore = new RegExp(
    "\\b(?:[\\w.]*Promise(?:Array|Spawn)?\\$_\\w+|" +
    "tryCatch(?:1|2|Apply)|new \\w*PromiseArray|" +
    "\\w*PromiseArray\\.\\w*PromiseArray|" +
    "setTimeout|CatchFilter\\$_\\w+|makeNodePromisified|processImmediate|" +
    "process._tickCallback|nextTick|Async\\$\\w+)\\b"
);

var rtraceline = null;
var formatStack = null;
var areNamesMangled = false;

function formatNonError(obj) {
    var str;
    if (typeof obj === "function") {
        str = "[function " +
            (obj.name || "anonymous") +
            "]";
    }
    else {
        str = obj.toString();
        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
        if (ruselessToString.test(str)) {
            try {
                var newStr = JSON.stringify(obj);
                str = newStr;
            }
            catch(e) {

            }
        }
        if (str.length === 0) {
            str = "(empty array)";
        }
    }
    return ("(<" + snip(str) + ">, no stack trace)");
}

function snip(str) {
    var maxChars = 41;
    if (str.length < maxChars) {
        return str;
    }
    return str.substr(0, maxChars - 3) + "...";
}

function CapturedTrace(ignoreUntil, isTopLevel) {
    if (!areNamesMangled) {
    }
    this.captureStackTrace(ignoreUntil, isTopLevel);

}
inherits(CapturedTrace, Error);

CapturedTrace.prototype.captureStackTrace =
function CapturedTrace$captureStackTrace(ignoreUntil, isTopLevel) {
    captureStackTrace(this, ignoreUntil, isTopLevel);
};

CapturedTrace.possiblyUnhandledRejection =
function CapturedTrace$PossiblyUnhandledRejection(reason) {
    if (typeof console === "object") {
        var message;
        if (typeof reason === "object" || typeof reason === "function") {
            var stack = reason.stack;
            message = "Possibly unhandled " + formatStack(stack, reason);
        }
        else {
            message = "Possibly unhandled " + String(reason);
        }
        if (typeof console.error === "function" ||
            typeof console.error === "object") {
            console.error(message);
        }
        else if (typeof console.log === "function" ||
            typeof console.error === "object") {
            console.log(message);
        }
    }
};

areNamesMangled = CapturedTrace.prototype.captureStackTrace.name !==
    "CapturedTrace$captureStackTrace";

CapturedTrace.combine = function CapturedTrace$Combine(current, prev) {
    var curLast = current.length - 1;
    for (var i = prev.length - 1; i >= 0; --i) {
        var line = prev[i];
        if (current[curLast] === line) {
            current.pop();
            curLast--;
        }
        else {
            break;
        }
    }

    current.push("From previous event:");
    var lines = current.concat(prev);

    var ret = [];


    for (var i = 0, len = lines.length; i < len; ++i) {

        if ((rignore.test(lines[i]) ||
            (i > 0 && !rtraceline.test(lines[i])) &&
            lines[i] !== "From previous event:")
       ) {
            continue;
        }
        ret.push(lines[i]);
    }
    return ret;
};

CapturedTrace.isSupported = function CapturedTrace$IsSupported() {
    return typeof captureStackTrace === "function";
};

var captureStackTrace = (function stackDetection() {
    if (typeof Error.stackTraceLimit === "number" &&
        typeof Error.captureStackTrace === "function") {
        rtraceline = /^\s*at\s*/;
        formatStack = function(stack, error) {
            if (typeof stack === "string") return stack;

            if (error.name !== void 0 &&
                error.message !== void 0) {
                return error.name + ". " + error.message;
            }
            return formatNonError(error);


        };
        var captureStackTrace = Error.captureStackTrace;
        return function CapturedTrace$_captureStackTrace(
            receiver, ignoreUntil) {
            captureStackTrace(receiver, ignoreUntil);
        };
    }
    var err = new Error();

    if (!areNamesMangled && typeof err.stack === "string" &&
        typeof "".startsWith === "function" &&
        (err.stack.startsWith("stackDetection@")) &&
        stackDetection.name === "stackDetection") {

        defineProperty(Error, "stackTraceLimit", {
            writable: true,
            enumerable: false,
            configurable: false,
            value: 25
        });
        rtraceline = /@/;
        var rline = /[@\n]/;

        formatStack = function(stack, error) {
            if (typeof stack === "string") {
                return (error.name + ". " + error.message + "\n" + stack);
            }

            if (error.name !== void 0 &&
                error.message !== void 0) {
                return error.name + ". " + error.message;
            }
            return formatNonError(error);
        };

        return function captureStackTrace(o, fn) {
            var name = fn.name;
            var stack = new Error().stack;
            var split = stack.split(rline);
            var i, len = split.length;
            for (i = 0; i < len; i += 2) {
                if (split[i] === name) {
                    break;
                }
            }
            split = split.slice(i + 2);
            len = split.length - 2;
            var ret = "";
            for (i = 0; i < len; i += 2) {
                ret += split[i];
                ret += "@";
                ret += split[i + 1];
                ret += "\n";
            }
            o.stack = ret;
        };
    }
    else {
        formatStack = function(stack, error) {
            if (typeof stack === "string") return stack;

            if ((typeof error === "object" ||
                typeof error === "function") &&
                error.name !== void 0 &&
                error.message !== void 0) {
                return error.name + ". " + error.message;
            }
            return formatNonError(error);
        };

        return null;
    }
})();

return CapturedTrace;
};

},{"./assert.js":2,"./es5.js":12,"./util.js":39}],8:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(NEXT_FILTER) {
var util = require("./util.js");
var errors = require("./errors.js");
var tryCatch1 = util.tryCatch1;
var errorObj = util.errorObj;
var keys = require("./es5.js").keys;

function CatchFilter(instances, callback, promise) {
    this._instances = instances;
    this._callback = callback;
    this._promise = promise;
}

function CatchFilter$_safePredicate(predicate, e) {
    var safeObject = {};
    var retfilter = tryCatch1(predicate, safeObject, e);

    if (retfilter === errorObj) return retfilter;

    var safeKeys = keys(safeObject);
    if (safeKeys.length) {
        errorObj.e = new TypeError(
            "Catch filter must inherit from Error "
          + "or be a simple predicate function");
        return errorObj;
    }
    return retfilter;
}

CatchFilter.prototype.doFilter = function CatchFilter$_doFilter(e) {
    var cb = this._callback;
    var promise = this._promise;
    var boundTo = promise._isBound() ? promise._boundTo : void 0;
    for (var i = 0, len = this._instances.length; i < len; ++i) {
        var item = this._instances[i];
        var itemIsErrorType = item === Error ||
            (item != null && item.prototype instanceof Error);

        if (itemIsErrorType && e instanceof item) {
            var ret = tryCatch1(cb, boundTo, e);
            if (ret === errorObj) {
                NEXT_FILTER.e = ret.e;
                return NEXT_FILTER;
            }
            return ret;
        } else if (typeof item === "function" && !itemIsErrorType) {
            var shouldHandle = CatchFilter$_safePredicate(item, e);
            if (shouldHandle === errorObj) {
                var trace = errors.canAttach(errorObj.e)
                    ? errorObj.e
                    : new Error(errorObj.e + "");
                this._promise._attachExtraTrace(trace);
                e = errorObj.e;
                break;
            } else if (shouldHandle) {
                var ret = tryCatch1(cb, boundTo, e);
                if (ret === errorObj) {
                    NEXT_FILTER.e = ret.e;
                    return NEXT_FILTER;
                }
                return ret;
            }
        }
    }
    NEXT_FILTER.e = e;
    return NEXT_FILTER;
};

return CatchFilter;
};

},{"./errors.js":10,"./es5.js":12,"./util.js":39}],9:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
var util = require("./util.js");
var ASSERT = require("./assert.js");
var isPrimitive = util.isPrimitive;
var wrapsPrimitiveReceiver = util.wrapsPrimitiveReceiver;

module.exports = function(Promise) {
var returner = function Promise$_returner() {
    return this;
};
var thrower = function Promise$_thrower() {
    throw this;
};

var wrapper = function Promise$_wrapper(value, action) {
    if (action === 1) {
        return function Promise$_thrower() {
            throw value;
        };
    }
    else if (action === 2) {
        return function Promise$_returner() {
            return value;
        };
    }
};


Promise.prototype["return"] =
Promise.prototype.thenReturn =
function Promise$thenReturn(value) {
    if (wrapsPrimitiveReceiver && isPrimitive(value)) {
        return this._then(
            wrapper(value, 2),
            void 0,
            void 0,
            void 0,
            void 0,
            this.thenReturn
       );
    }
    return this._then(returner, void 0, void 0,
                        value, void 0, this.thenReturn);
};

Promise.prototype["throw"] =
Promise.prototype.thenThrow =
function Promise$thenThrow(reason) {
    if (wrapsPrimitiveReceiver && isPrimitive(reason)) {
        return this._then(
            wrapper(reason, 1),
            void 0,
            void 0,
            void 0,
            void 0,
            this.thenThrow
       );
    }
    return this._then(thrower, void 0, void 0,
                        reason, void 0, this.thenThrow);
};
};

},{"./assert.js":2,"./util.js":39}],10:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
var global = require("./global.js");
var Objectfreeze = require("./es5.js").freeze;
var util = require("./util.js");
var inherits = util.inherits;
var notEnumerableProp = util.notEnumerableProp;
var Error = global.Error;

function markAsOriginatingFromRejection(e) {
    try {
        notEnumerableProp(e, "isAsync", true);
    }
    catch(ignore) {}
}

function originatesFromRejection(e) {
    if (e == null) return false;
    return ((e instanceof RejectionError) ||
        e["isAsync"] === true);
}

function isError(obj) {
    return obj instanceof Error;
}

function canAttach(obj) {
    return isError(obj);
}

function subError(nameProperty, defaultMessage) {
    function SubError(message) {
        if (!(this instanceof SubError)) return new SubError(message);
        this.message = typeof message === "string" ? message : defaultMessage;
        this.name = nameProperty;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    inherits(SubError, Error);
    return SubError;
}

var TypeError = global.TypeError;
if (typeof TypeError !== "function") {
    TypeError = subError("TypeError", "type error");
}
var RangeError = global.RangeError;
if (typeof RangeError !== "function") {
    RangeError = subError("RangeError", "range error");
}
var CancellationError = subError("CancellationError", "cancellation error");
var TimeoutError = subError("TimeoutError", "timeout error");

function RejectionError(message) {
    this.name = "RejectionError";
    this.message = message;
    this.cause = message;
    this.isAsync = true;

    if (message instanceof Error) {
        this.message = message.message;
        this.stack = message.stack;
    }
    else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }

}
inherits(RejectionError, Error);

var key = "__BluebirdErrorTypes__";
var errorTypes = global[key];
if (!errorTypes) {
    errorTypes = Objectfreeze({
        CancellationError: CancellationError,
        TimeoutError: TimeoutError,
        RejectionError: RejectionError
    });
    notEnumerableProp(global, key, errorTypes);
}

module.exports = {
    Error: Error,
    TypeError: TypeError,
    RangeError: RangeError,
    CancellationError: errorTypes.CancellationError,
    RejectionError: errorTypes.RejectionError,
    TimeoutError: errorTypes.TimeoutError,
    originatesFromRejection: originatesFromRejection,
    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
    canAttach: canAttach
};

},{"./es5.js":12,"./global.js":16,"./util.js":39}],11:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise) {
var TypeError = require('./errors.js').TypeError;

function apiRejection(msg) {
    var error = new TypeError(msg);
    var ret = Promise.rejected(error);
    var parent = ret._peekContext();
    if (parent != null) {
        parent._attachExtraTrace(error);
    }
    return ret;
}

return apiRejection;
};

},{"./errors.js":10}],12:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
var isES5 = (function(){
    "use strict";
    return this === void 0;
})();

if (isES5) {
    module.exports = {
        freeze: Object.freeze,
        defineProperty: Object.defineProperty,
        keys: Object.keys,
        getPrototypeOf: Object.getPrototypeOf,
        isArray: Array.isArray,
        isES5: isES5
    };
}

else {
    var has = {}.hasOwnProperty;
    var str = {}.toString;
    var proto = {}.constructor.prototype;

    function ObjectKeys(o) {
        var ret = [];
        for (var key in o) {
            if (has.call(o, key)) {
                ret.push(key);
            }
        }
        return ret;
    }

    function ObjectDefineProperty(o, key, desc) {
        o[key] = desc.value;
        return o;
    }

    function ObjectFreeze(obj) {
        return obj;
    }

    function ObjectGetPrototypeOf(obj) {
        try {
            return Object(obj).constructor.prototype;
        }
        catch (e) {
            return proto;
        }
    }

    function ArrayIsArray(obj) {
        try {
            return str.call(obj) === "[object Array]";
        }
        catch(e) {
            return false;
        }
    }

    module.exports = {
        isArray: ArrayIsArray,
        keys: ObjectKeys,
        defineProperty: ObjectDefineProperty,
        freeze: ObjectFreeze,
        getPrototypeOf: ObjectGetPrototypeOf,
        isES5: isES5
    };
}

},{}],13:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise) {
    var ASSERT = require("./assert.js");
    var isArray = require("./util.js").isArray;

    function Promise$_filter(booleans) {
        var values = this._settledValue;
        var len = values.length;
        var ret = new Array(len);
        var j = 0;

        for (var i = 0; i < len; ++i) {
            if (booleans[i]) ret[j++] = values[i];

        }
        ret.length = j;
        return ret;
    }

    var ref = {ref: null};
    Promise.filter = function Promise$Filter(promises, fn) {
        return Promise.map(promises, fn, ref)
            ._then(Promise$_filter, void 0, void 0,
                    ref.ref, void 0, Promise.filter);
    };

    Promise.prototype.filter = function Promise$filter(fn) {
        return this.map(fn, ref)
            ._then(Promise$_filter, void 0, void 0,
                    ref.ref, void 0, this.filter);
    };
};

},{"./assert.js":2,"./util.js":39}],14:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
module.exports = function(Promise, NEXT_FILTER) {
    var util = require("./util.js");
    var wrapsPrimitiveReceiver = util.wrapsPrimitiveReceiver;
    var isPrimitive = util.isPrimitive;
    var thrower = util.thrower;


    function returnThis() {
        return this;
    }
    function throwThis() {
        throw this;
    }
    function makeReturner(r) {
        return function Promise$_returner() {
            return r;
        };
    }
    function makeThrower(r) {
        return function Promise$_thrower() {
            throw r;
        };
    }
    function promisedFinally(ret, reasonOrValue, isFulfilled) {
        var useConstantFunction =
                        wrapsPrimitiveReceiver && isPrimitive(reasonOrValue);

        if (isFulfilled) {
            return ret._then(
                useConstantFunction
                    ? returnThis
                    : makeReturner(reasonOrValue),
                thrower, void 0, reasonOrValue, void 0, promisedFinally);
        }
        else {
            return ret._then(
                useConstantFunction
                    ? throwThis
                    : makeThrower(reasonOrValue),
                thrower, void 0, reasonOrValue, void 0, promisedFinally);
        }
    }

    function finallyHandler(reasonOrValue) {
        var promise = this.promise;
        var handler = this.handler;

        var ret = promise._isBound()
                        ? handler.call(promise._boundTo)
                        : handler();

        if (ret !== void 0) {
            var maybePromise = Promise._cast(ret, finallyHandler, void 0);
            if (Promise.is(maybePromise)) {
                return promisedFinally(maybePromise, reasonOrValue,
                                        promise.isFulfilled());
            }
        }

        if (promise.isRejected()) {
            NEXT_FILTER.e = reasonOrValue;
            return NEXT_FILTER;
        }
        else {
            return reasonOrValue;
        }
    }

    Promise.prototype.lastly = Promise.prototype["finally"] =
    function Promise$finally(handler) {
        if (typeof handler !== "function") return this.then();

        var promiseAndHandler = {
            promise: this,
            handler: handler
        };

        return this._then(finallyHandler, finallyHandler, void 0,
                promiseAndHandler, void 0, this.lastly);
    };
};

},{"./util.js":39}],15:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise, apiRejection, INTERNAL) {
    var PromiseSpawn = require("./promise_spawn.js")(Promise, INTERNAL);
    var errors = require("./errors.js");
    var TypeError = errors.TypeError;
    var deprecated = require("./util.js").deprecated;

    Promise.coroutine = function Promise$Coroutine(generatorFunction) {
        if (typeof generatorFunction !== "function") {
            throw new TypeError("generatorFunction must be a function");
        }
        var PromiseSpawn$ = PromiseSpawn;
        return function anonymous() {
            var generator = generatorFunction.apply(this, arguments);
            var spawn = new PromiseSpawn$(void 0, void 0, anonymous);
            spawn._generator = generator;
            spawn._next(void 0);
            return spawn.promise();
        };
    };

    Promise.coroutine.addYieldHandler = PromiseSpawn.addYieldHandler;

    Promise.spawn = function Promise$Spawn(generatorFunction) {
        deprecated("Promise.spawn is deprecated. Use Promise.coroutine instead.");
        if (typeof generatorFunction !== "function") {
            return apiRejection("generatorFunction must be a function");
        }
        var spawn = new PromiseSpawn(generatorFunction, this, Promise.spawn);
        var ret = spawn.promise();
        spawn._run(Promise.spawn);
        return ret;
    };
};

},{"./errors.js":10,"./promise_spawn.js":24,"./util.js":39}],16:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = (function(){
    if (typeof this !== "undefined") {
        return this;
    }
    if (typeof process !== "undefined" &&
        typeof global !== "undefined" &&
        typeof process.execPath === "string") {
        return global;
    }
    if (typeof window !== "undefined" &&
        typeof document !== "undefined" &&
        typeof navigator !== "undefined" && navigator !== null &&
        typeof navigator.appName === "string") {
            if(window.wrappedJSObject !== undefined){
                return window.wrappedJSObject;
            }
        return window;
    }
})();

},{}],17:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(
    Promise, Promise$_CreatePromiseArray, PromiseArray, apiRejection) {

    var ASSERT = require("./assert.js");

    function Promise$_mapper(values) {
        var fn = this;
        var receiver = void 0;

        if (typeof fn !== "function")  {
            receiver = fn.receiver;
            fn = fn.fn;
        }
        var shouldDefer = false;

        var ret = new Array(values.length);

        if (receiver === void 0) {
            for (var i = 0, len = values.length; i < len; ++i) {
                var value = fn(values[i], i, len);
                if (!shouldDefer) {
                    var maybePromise = Promise._cast(value,
                            Promise$_mapper, void 0);
                    if (maybePromise instanceof Promise) {
                        if (maybePromise.isFulfilled()) {
                            ret[i] = maybePromise._settledValue;
                            continue;
                        }
                        else {
                            shouldDefer = true;
                        }
                        value = maybePromise;
                    }
                }
                ret[i] = value;
            }
        }
        else {
            for (var i = 0, len = values.length; i < len; ++i) {
                var value = fn.call(receiver, values[i], i, len);
                if (!shouldDefer) {
                    var maybePromise = Promise._cast(value,
                            Promise$_mapper, void 0);
                    if (maybePromise instanceof Promise) {
                        if (maybePromise.isFulfilled()) {
                            ret[i] = maybePromise._settledValue;
                            continue;
                        }
                        else {
                            shouldDefer = true;
                        }
                        value = maybePromise;
                    }
                }
                ret[i] = value;
            }
        }
        return shouldDefer
            ? Promise$_CreatePromiseArray(ret, PromiseArray,
                Promise$_mapper, void 0).promise()
            : ret;
    }

    function Promise$_Map(promises, fn, useBound, caller, ref) {
        if (typeof fn !== "function") {
            return apiRejection("fn must be a function");
        }

        if (useBound === true && promises._isBound()) {
            fn = {
                fn: fn,
                receiver: promises._boundTo
            };
        }

        var ret = Promise$_CreatePromiseArray(
            promises,
            PromiseArray,
            caller,
            useBound === true && promises._isBound()
                ? promises._boundTo
                : void 0
       ).promise();

        if (ref !== void 0) {
            ref.ref = ret;
        }

        return ret._then(
            Promise$_mapper,
            void 0,
            void 0,
            fn,
            void 0,
            caller
       );
    }

    Promise.prototype.map = function Promise$map(fn, ref) {
        return Promise$_Map(this, fn, true, this.map, ref);
    };

    Promise.map = function Promise$Map(promises, fn, ref) {
        return Promise$_Map(promises, fn, false, Promise.map, ref);
    };
};

},{"./assert.js":2}],18:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise) {
    var util = require("./util.js");
    var async = require("./async.js");
    var ASSERT = require("./assert.js");
    var tryCatch2 = util.tryCatch2;
    var tryCatch1 = util.tryCatch1;
    var errorObj = util.errorObj;

    function thrower(r) {
        throw r;
    }

    function Promise$_successAdapter(val, receiver) {
        var nodeback = this;
        var ret = tryCatch2(nodeback, receiver, null, val);
        if (ret === errorObj) {
            async.invokeLater(thrower, void 0, ret.e);
        }
    }
    function Promise$_errorAdapter(reason, receiver) {
        var nodeback = this;
        var ret = tryCatch1(nodeback, receiver, reason);
        if (ret === errorObj) {
            async.invokeLater(thrower, void 0, ret.e);
        }
    }

    Promise.prototype.nodeify = function Promise$nodeify(nodeback) {
        if (typeof nodeback == "function") {
            this._then(
                Promise$_successAdapter,
                Promise$_errorAdapter,
                void 0,
                nodeback,
                this._isBound() ? this._boundTo : null,
                this.nodeify
           );
        }
        return this;
    };
};

},{"./assert.js":2,"./async.js":3,"./util.js":39}],19:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise, isPromiseArrayProxy) {
    var ASSERT = require("./assert.js");
    var util = require("./util.js");
    var async = require("./async.js");
    var errors = require("./errors.js");
    var tryCatch1 = util.tryCatch1;
    var errorObj = util.errorObj;

    Promise.prototype.progressed = function Promise$progressed(handler) {
        return this._then(void 0, void 0, handler,
                            void 0, void 0, this.progressed);
    };

    Promise.prototype._progress = function Promise$_progress(progressValue) {
        if (this._isFollowingOrFulfilledOrRejected()) return;
        this._progressUnchecked(progressValue);

    };

    Promise.prototype._progressHandlerAt =
    function Promise$_progressHandlerAt(index) {
        if (index === 0) return this._progressHandler0;
        return this[index + 2 - 5];
    };

    Promise.prototype._doProgressWith =
    function Promise$_doProgressWith(progression) {
        var progressValue = progression.value;
        var handler = progression.handler;
        var promise = progression.promise;
        var receiver = progression.receiver;

        this._pushContext();
        var ret = tryCatch1(handler, receiver, progressValue);
        this._popContext();

        if (ret === errorObj) {
            if (ret.e != null &&
                ret.e.name !== "StopProgressPropagation") {
                var trace = errors.canAttach(ret.e)
                    ? ret.e : new Error(ret.e + "");
                promise._attachExtraTrace(trace);
                promise._progress(ret.e);
            }
        }
        else if (Promise.is(ret)) {
            ret._then(promise._progress, null, null, promise, void 0,
                this._progress);
        }
        else {
            promise._progress(ret);
        }
    };


    Promise.prototype._progressUnchecked =
    function Promise$_progressUnchecked(progressValue) {
        if (!this.isPending()) return;
        var len = this._length();

        for (var i = 0; i < len; i += 5) {
            var handler = this._progressHandlerAt(i);
            var promise = this._promiseAt(i);
            if (!Promise.is(promise)) {
                var receiver = this._receiverAt(i);
                if (typeof handler === "function") {
                    handler.call(receiver, progressValue, promise);
                }
                else if (Promise.is(receiver) && receiver._isProxied()) {
                    receiver._progressUnchecked(progressValue);
                }
                else if (isPromiseArrayProxy(receiver, promise)) {
                    receiver._promiseProgressed(progressValue, promise);
                }
                continue;
            }

            if (typeof handler === "function") {
                async.invoke(this._doProgressWith, this, {
                    handler: handler,
                    promise: promise,
                    receiver: this._receiverAt(i),
                    value: progressValue
                });
            }
            else {
                async.invoke(promise._progress, promise, progressValue);
            }
        }
    };
};

},{"./assert.js":2,"./async.js":3,"./errors.js":10,"./util.js":39}],20:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function() {
var global = require("./global.js");
var ASSERT = require("./assert.js");
var util = require("./util.js");
var async = require("./async.js");
var errors = require("./errors.js");

var INTERNAL = function(){};
var APPLY = {};
var NEXT_FILTER = {e: null};

var PromiseArray = require("./promise_array.js")(Promise, INTERNAL);
var CapturedTrace = require("./captured_trace.js")();
var CatchFilter = require("./catch_filter.js")(NEXT_FILTER);
var PromiseResolver = require("./promise_resolver.js");

var isArray = util.isArray;

var errorObj = util.errorObj;
var tryCatch1 = util.tryCatch1;
var tryCatch2 = util.tryCatch2;
var tryCatchApply = util.tryCatchApply;
var RangeError = errors.RangeError;
var TypeError = errors.TypeError;
var CancellationError = errors.CancellationError;
var TimeoutError = errors.TimeoutError;
var RejectionError = errors.RejectionError;
var originatesFromRejection = errors.originatesFromRejection;
var markAsOriginatingFromRejection = errors.markAsOriginatingFromRejection;
var canAttach = errors.canAttach;
var thrower = util.thrower;
var apiRejection = require("./errors_api_rejection")(Promise);


var makeSelfResolutionError = function Promise$_makeSelfResolutionError() {
    return new TypeError("circular promise resolution chain");
};

function isPromise(obj) {
    if (obj === void 0) return false;
    return obj instanceof Promise;
}

function isPromiseArrayProxy(receiver, promiseSlotValue) {
    if (receiver instanceof PromiseArray) {
        return promiseSlotValue >= 0;
    }
    return false;
}

function Promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("the promise constructor requires a resolver function");
    }
    if (this.constructor !== Promise) {
        throw new TypeError("the promise constructor cannot be invoked directly");
    }
    this._bitField = 0;
    this._fulfillmentHandler0 = void 0;
    this._rejectionHandler0 = void 0;
    this._promise0 = void 0;
    this._receiver0 = void 0;
    this._settledValue = void 0;
    this._boundTo = void 0;
    if (resolver !== INTERNAL) this._resolveFromResolver(resolver);
}

Promise.prototype.bind = function Promise$bind(thisArg) {
    var ret = new Promise(INTERNAL);
    if (debugging) ret._setTrace(this.bind, this);
    ret._follow(this);
    ret._setBoundTo(thisArg);
    if (this._cancellable()) {
        ret._setCancellable();
        ret._cancellationParent = this;
    }
    return ret;
};

Promise.prototype.toString = function Promise$toString() {
    return "[object Promise]";
};

Promise.prototype.caught = Promise.prototype["catch"] =
function Promise$catch(fn) {
    var len = arguments.length;
    if (len > 1) {
        var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (typeof item === "function") {
                catchInstances[j++] = item;
            }
            else {
                var catchFilterTypeError =
                    new TypeError(
                        "A catch filter must be an error constructor "
                        + "or a filter function");

                this._attachExtraTrace(catchFilterTypeError);
                async.invoke(this._reject, this, catchFilterTypeError);
                return;
            }
        }
        catchInstances.length = j;
        fn = arguments[i];

        this._resetTrace(this.caught);
        var catchFilter = new CatchFilter(catchInstances, fn, this);
        return this._then(void 0, catchFilter.doFilter, void 0,
            catchFilter, void 0, this.caught);
    }
    return this._then(void 0, fn, void 0, void 0, void 0, this.caught);
};

Promise.prototype.then =
function Promise$then(didFulfill, didReject, didProgress) {
    return this._then(didFulfill, didReject, didProgress,
        void 0, void 0, this.then);
};


Promise.prototype.done =
function Promise$done(didFulfill, didReject, didProgress) {
    var promise = this._then(didFulfill, didReject, didProgress,
        void 0, void 0, this.done);
    promise._setIsFinal();
};

Promise.prototype.spread = function Promise$spread(didFulfill, didReject) {
    return this._then(didFulfill, didReject, void 0,
        APPLY, void 0, this.spread);
};

Promise.prototype.isFulfilled = function Promise$isFulfilled() {
    return (this._bitField & 268435456) > 0;
};


Promise.prototype.isRejected = function Promise$isRejected() {
    return (this._bitField & 134217728) > 0;
};

Promise.prototype.isPending = function Promise$isPending() {
    return !this.isResolved();
};


Promise.prototype.isResolved = function Promise$isResolved() {
    return (this._bitField & 402653184) > 0;
};


Promise.prototype.isCancellable = function Promise$isCancellable() {
    return !this.isResolved() &&
        this._cancellable();
};

Promise.prototype.toJSON = function Promise$toJSON() {
    var ret = {
        isFulfilled: false,
        isRejected: false,
        fulfillmentValue: void 0,
        rejectionReason: void 0
    };
    if (this.isFulfilled()) {
        ret.fulfillmentValue = this._settledValue;
        ret.isFulfilled = true;
    }
    else if (this.isRejected()) {
        ret.rejectionReason = this._settledValue;
        ret.isRejected = true;
    }
    return ret;
};

Promise.prototype.all = function Promise$all() {
    return Promise$_all(this, true, this.all);
};


Promise.is = isPromise;

function Promise$_all(promises, useBound, caller) {
    return Promise$_CreatePromiseArray(
        promises,
        PromiseArray,
        caller,
        useBound === true && promises._isBound()
            ? promises._boundTo
            : void 0
   ).promise();
}
Promise.all = function Promise$All(promises) {
    return Promise$_all(promises, false, Promise.all);
};

Promise.join = function Promise$Join() {
    var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];}
    return Promise$_CreatePromiseArray(
        args, PromiseArray, Promise.join, void 0).promise();
};

Promise.resolve = Promise.fulfilled =
function Promise$Resolve(value, caller) {
    var ret = new Promise(INTERNAL);
    if (debugging) ret._setTrace(typeof caller === "function"
        ? caller
        : Promise.resolve, void 0);
    if (ret._tryFollow(value)) {
        return ret;
    }
    ret._cleanValues();
    ret._setFulfilled();
    ret._settledValue = value;
    return ret;
};

Promise.reject = Promise.rejected = function Promise$Reject(reason) {
    var ret = new Promise(INTERNAL);
    if (debugging) ret._setTrace(Promise.reject, void 0);
    markAsOriginatingFromRejection(reason);
    ret._cleanValues();
    ret._setRejected();
    ret._settledValue = reason;
    if (!canAttach(reason)) {
        var trace = new Error(reason + "");
        ret._setCarriedStackTrace(trace);
    }
    ret._ensurePossibleRejectionHandled();
    return ret;
};

Promise.prototype.error = function Promise$_error(fn) {
    return this.caught(originatesFromRejection, fn);
};

Promise.prototype._resolveFromSyncValue =
function Promise$_resolveFromSyncValue(value, caller) {
    if (value === errorObj) {
        this._cleanValues();
        this._setRejected();
        this._settledValue = value.e;
        this._ensurePossibleRejectionHandled();
    }
    else {
        var maybePromise = Promise._cast(value, caller, void 0);
        if (maybePromise instanceof Promise) {
            this._follow(maybePromise);
        }
        else {
            this._cleanValues();
            this._setFulfilled();
            this._settledValue = value;
        }
    }
};

Promise.method = function Promise$_Method(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("fn must be a function");
    }
    return function Promise$_method() {
        var value;
        switch(arguments.length) {
        case 0: value = tryCatch1(fn, this, void 0); break;
        case 1: value = tryCatch1(fn, this, arguments[0]); break;
        case 2: value = tryCatch2(fn, this, arguments[0], arguments[1]); break;
        default:
            var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];}
            value = tryCatchApply(fn, args, this); break;
        }
        var ret = new Promise(INTERNAL);
        if (debugging) ret._setTrace(Promise$_method, void 0);
        ret._resolveFromSyncValue(value, Promise$_method);
        return ret;
    };
};

Promise.attempt = Promise["try"] = function Promise$_Try(fn, args, ctx) {

    if (typeof fn !== "function") {
        return apiRejection("fn must be a function");
    }
    var value = isArray(args)
        ? tryCatchApply(fn, args, ctx)
        : tryCatch1(fn, ctx, args);

    var ret = new Promise(INTERNAL);
    if (debugging) ret._setTrace(Promise.attempt, void 0);
    ret._resolveFromSyncValue(value, Promise.attempt);
    return ret;
};

Promise.defer = Promise.pending = function Promise$Defer(caller) {
    var promise = new Promise(INTERNAL);
    if (debugging) promise._setTrace(typeof caller === "function"
                              ? caller : Promise.defer, void 0);
    return new PromiseResolver(promise);
};

Promise.bind = function Promise$Bind(thisArg) {
    var ret = new Promise(INTERNAL);
    if (debugging) ret._setTrace(Promise.bind, void 0);
    ret._setFulfilled();
    ret._setBoundTo(thisArg);
    return ret;
};

Promise.cast = function Promise$_Cast(obj, caller) {
    if (typeof caller !== "function") {
        caller = Promise.cast;
    }
    var ret = Promise._cast(obj, caller, void 0);
    if (!(ret instanceof Promise)) {
        return Promise.resolve(ret, caller);
    }
    return ret;
};

Promise.onPossiblyUnhandledRejection =
function Promise$OnPossiblyUnhandledRejection(fn) {
    if (typeof fn === "function") {
        CapturedTrace.possiblyUnhandledRejection = fn;
    }
    else {
        CapturedTrace.possiblyUnhandledRejection = void 0;
    }
};

var debugging = false || !!(
    typeof process !== "undefined" &&
    typeof process.execPath === "string" &&
    typeof process.env === "object" &&
    (process.env["BLUEBIRD_DEBUG"] ||
        process.env["NODE_ENV"] === "development")
);


Promise.longStackTraces = function Promise$LongStackTraces() {
    if (async.haveItemsQueued() &&
        debugging === false
   ) {
        throw new Error("cannot enable long stack traces after promises have been created");
    }
    debugging = CapturedTrace.isSupported();
};

Promise.hasLongStackTraces = function Promise$HasLongStackTraces() {
    return debugging && CapturedTrace.isSupported();
};

Promise.prototype._setProxyHandlers =
function Promise$_setProxyHandlers(receiver, promiseSlotValue) {
    var index = this._length();

    if (index >= 1048575 - 5) {
        index = 0;
        this._setLength(0);
    }
    if (index === 0) {
        this._promise0 = promiseSlotValue;
        this._receiver0 = receiver;
    }
    else {
        var i = index - 5;
        this[i + 3] = promiseSlotValue;
        this[i + 4] = receiver;
        this[i + 0] =
        this[i + 1] =
        this[i + 2] = void 0;
    }
    this._setLength(index + 5);
};

Promise.prototype._proxyPromiseArray =
function Promise$_proxyPromiseArray(promiseArray, index) {
    this._setProxyHandlers(promiseArray, index);
};

Promise.prototype._proxyPromise = function Promise$_proxyPromise(promise) {
    promise._setProxied();
    this._setProxyHandlers(promise, -1);
};

Promise.prototype._then =
function Promise$_then(
    didFulfill,
    didReject,
    didProgress,
    receiver,
    internalData,
    caller
) {
    var haveInternalData = internalData !== void 0;
    var ret = haveInternalData ? internalData : new Promise(INTERNAL);

    if (debugging && !haveInternalData) {
        var haveSameContext = this._peekContext() === this._traceParent;
        ret._traceParent = haveSameContext ? this._traceParent : this;
        ret._setTrace(typeof caller === "function"
                ? caller
                : this._then, this);
    }

    if (!haveInternalData && this._isBound()) {
        ret._setBoundTo(this._boundTo);
    }

    var callbackIndex =
        this._addCallbacks(didFulfill, didReject, didProgress, ret, receiver);

    if (!haveInternalData && this._cancellable()) {
        ret._setCancellable();
        ret._cancellationParent = this;
    }

    if (this.isResolved()) {
        async.invoke(this._queueSettleAt, this, callbackIndex);
    }

    return ret;
};

Promise.prototype._length = function Promise$_length() {
    return this._bitField & 1048575;
};

Promise.prototype._isFollowingOrFulfilledOrRejected =
function Promise$_isFollowingOrFulfilledOrRejected() {
    return (this._bitField & 939524096) > 0;
};

Promise.prototype._isFollowing = function Promise$_isFollowing() {
    return (this._bitField & 536870912) === 536870912;
};

Promise.prototype._setLength = function Promise$_setLength(len) {
    this._bitField = (this._bitField & -1048576) |
        (len & 1048575);
};

Promise.prototype._setFulfilled = function Promise$_setFulfilled() {
    this._bitField = this._bitField | 268435456;
};

Promise.prototype._setRejected = function Promise$_setRejected() {
    this._bitField = this._bitField | 134217728;
};

Promise.prototype._setFollowing = function Promise$_setFollowing() {
    this._bitField = this._bitField | 536870912;
};

Promise.prototype._setIsFinal = function Promise$_setIsFinal() {
    this._bitField = this._bitField | 33554432;
};

Promise.prototype._isFinal = function Promise$_isFinal() {
    return (this._bitField & 33554432) > 0;
};

Promise.prototype._cancellable = function Promise$_cancellable() {
    return (this._bitField & 67108864) > 0;
};

Promise.prototype._setCancellable = function Promise$_setCancellable() {
    this._bitField = this._bitField | 67108864;
};

Promise.prototype._unsetCancellable = function Promise$_unsetCancellable() {
    this._bitField = this._bitField & (~67108864);
};

Promise.prototype._setRejectionIsUnhandled =
function Promise$_setRejectionIsUnhandled() {
    this._bitField = this._bitField | 2097152;
};

Promise.prototype._unsetRejectionIsUnhandled =
function Promise$_unsetRejectionIsUnhandled() {
    this._bitField = this._bitField & (~2097152);
};

Promise.prototype._isRejectionUnhandled =
function Promise$_isRejectionUnhandled() {
    return (this._bitField & 2097152) > 0;
};

Promise.prototype._setCarriedStackTrace =
function Promise$_setCarriedStackTrace(capturedTrace) {
    this._bitField = this._bitField | 1048576;
    this._fulfillmentHandler0 = capturedTrace;
};

Promise.prototype._unsetCarriedStackTrace =
function Promise$_unsetCarriedStackTrace() {
    this._bitField = this._bitField & (~1048576);
    this._fulfillmentHandler0 = void 0;
};

Promise.prototype._isCarryingStackTrace =
function Promise$_isCarryingStackTrace() {
    return (this._bitField & 1048576) > 0;
};

Promise.prototype._getCarriedStackTrace =
function Promise$_getCarriedStackTrace() {
    return this._isCarryingStackTrace()
        ? this._fulfillmentHandler0
        : void 0;
};

Promise.prototype._receiverAt = function Promise$_receiverAt(index) {
    var ret;
    if (index === 0) {
        ret = this._receiver0;
    }
    else {
        ret = this[index + 4 - 5];
    }
    if (this._isBound() && ret === void 0) {
        return this._boundTo;
    }
    return ret;
};

Promise.prototype._promiseAt = function Promise$_promiseAt(index) {
    if (index === 0) return this._promise0;
    return this[index + 3 - 5];
};

Promise.prototype._fulfillmentHandlerAt =
function Promise$_fulfillmentHandlerAt(index) {
    if (index === 0) return this._fulfillmentHandler0;
    return this[index + 0 - 5];
};

Promise.prototype._rejectionHandlerAt =
function Promise$_rejectionHandlerAt(index) {
    if (index === 0) return this._rejectionHandler0;
    return this[index + 1 - 5];
};

Promise.prototype._unsetAt = function Promise$_unsetAt(index) {
     if (index === 0) {
        this._rejectionHandler0 =
        this._progressHandler0 =
        this._promise0 =
        this._receiver0 = void 0;
        if (!this._isCarryingStackTrace()) {
            this._fulfillmentHandler0 = void 0;
        }
    }
    else {
        this[index - 5 + 0] =
        this[index - 5 + 1] =
        this[index - 5 + 2] =
        this[index - 5 + 3] =
        this[index - 5 + 4] = void 0;
    }
};

Promise.prototype._resolveFromResolver =
function Promise$_resolveFromResolver(resolver) {
    var promise = this;
    var localDebugging = debugging;
    if (localDebugging) {
        this._setTrace(this._resolveFromResolver, void 0);
        this._pushContext();
    }
    function Promise$_resolver(val) {
        if (promise._tryFollow(val)) {
            return;
        }
        promise._fulfill(val);
    }
    function Promise$_rejecter(val) {
        var trace = canAttach(val) ? val : new Error(val + "");
        promise._attachExtraTrace(trace);
        markAsOriginatingFromRejection(val);
        promise._reject(val, trace === val ? void 0 : trace);
    }
    var r = tryCatch2(resolver, void 0, Promise$_resolver, Promise$_rejecter);
    if (localDebugging) this._popContext();

    if (r !== void 0 && r === errorObj) {
        var trace = canAttach(r.e) ? r.e : new Error(r.e + "");
        promise._reject(r.e, trace);
    }
};

Promise.prototype._addCallbacks = function Promise$_addCallbacks(
    fulfill,
    reject,
    progress,
    promise,
    receiver
) {
    var index = this._length();

    if (index >= 1048575 - 5) {
        index = 0;
        this._setLength(0);
    }

    if (index === 0) {
        this._promise0 = promise;
        if (receiver !== void 0) this._receiver0 = receiver;
        if (typeof fulfill === "function" && !this._isCarryingStackTrace())
            this._fulfillmentHandler0 = fulfill;
        if (typeof reject === "function") this._rejectionHandler0 = reject;
        if (typeof progress === "function") this._progressHandler0 = progress;
    }
    else {
        var i = index - 5;
        this[i + 3] = promise;
        this[i + 4] = receiver;
        this[i + 0] = typeof fulfill === "function"
                                            ? fulfill : void 0;
        this[i + 1] = typeof reject === "function"
                                            ? reject : void 0;
        this[i + 2] = typeof progress === "function"
                                            ? progress : void 0;
    }
    this._setLength(index + 5);
    return index;
};



Promise.prototype._setBoundTo = function Promise$_setBoundTo(obj) {
    if (obj !== void 0) {
        this._bitField = this._bitField | 8388608;
        this._boundTo = obj;
    }
    else {
        this._bitField = this._bitField & (~8388608);
    }
};

Promise.prototype._isBound = function Promise$_isBound() {
    return (this._bitField & 8388608) === 8388608;
};

Promise.prototype._spreadSlowCase =
function Promise$_spreadSlowCase(targetFn, promise, values, boundTo) {
    var promiseForAll =
            Promise$_CreatePromiseArray
                (values, PromiseArray, this._spreadSlowCase, boundTo)
            .promise()
            ._then(function() {
                return targetFn.apply(boundTo, arguments);
            }, void 0, void 0, APPLY, void 0, this._spreadSlowCase);

    promise._follow(promiseForAll);
};

Promise.prototype._callSpread =
function Promise$_callSpread(handler, promise, value, localDebugging) {
    var boundTo = this._isBound() ? this._boundTo : void 0;
    if (isArray(value)) {
        var caller = this._settlePromiseFromHandler;
        for (var i = 0, len = value.length; i < len; ++i) {
            if (isPromise(Promise._cast(value[i], caller, void 0))) {
                this._spreadSlowCase(handler, promise, value, boundTo);
                return;
            }
        }
    }
    if (localDebugging) promise._pushContext();
    return tryCatchApply(handler, value, boundTo);
};

Promise.prototype._callHandler =
function Promise$_callHandler(
    handler, receiver, promise, value, localDebugging) {
    var x;
    if (receiver === APPLY && !this.isRejected()) {
        x = this._callSpread(handler, promise, value, localDebugging);
    }
    else {
        if (localDebugging) promise._pushContext();
        x = tryCatch1(handler, receiver, value);
    }
    if (localDebugging) promise._popContext();
    return x;
};

Promise.prototype._settlePromiseFromHandler =
function Promise$_settlePromiseFromHandler(
    handler, receiver, value, promise
) {
    if (!isPromise(promise)) {
        handler.call(receiver, value, promise);
        return;
    }

    var localDebugging = debugging;
    var x = this._callHandler(handler, receiver,
                                promise, value, localDebugging);

    if (promise._isFollowing()) return;

    if (x === errorObj || x === promise || x === NEXT_FILTER) {
        var err = x === promise
                    ? makeSelfResolutionError()
                    : x.e;
        var trace = canAttach(err) ? err : new Error(err + "");
        if (x !== NEXT_FILTER) promise._attachExtraTrace(trace);
        promise._rejectUnchecked(err, trace);
    }
    else {
        var castValue = Promise._cast(x,
                    localDebugging ? this._settlePromiseFromHandler : void 0,
                    promise);

        if (isPromise(castValue)) {
            if (castValue.isRejected() &&
                !castValue._isCarryingStackTrace() &&
                !canAttach(castValue._settledValue)) {
                var trace = new Error(castValue._settledValue + "");
                promise._attachExtraTrace(trace);
                castValue._setCarriedStackTrace(trace);
            }
            promise._follow(castValue);
            if (castValue._cancellable()) {
                promise._cancellationParent = castValue;
                promise._setCancellable();
            }
        }
        else {
            promise._fulfillUnchecked(x);
        }
    }
};

Promise.prototype._follow =
function Promise$_follow(promise) {
    this._setFollowing();

    if (promise.isPending()) {
        if (promise._cancellable() ) {
            this._cancellationParent = promise;
            this._setCancellable();
        }
        promise._proxyPromise(this);
    }
    else if (promise.isFulfilled()) {
        this._fulfillUnchecked(promise._settledValue);
    }
    else {
        this._rejectUnchecked(promise._settledValue,
            promise._getCarriedStackTrace());
    }

    if (promise._isRejectionUnhandled()) promise._unsetRejectionIsUnhandled();

    if (debugging &&
        promise._traceParent == null) {
        promise._traceParent = this;
    }
};

Promise.prototype._tryFollow =
function Promise$_tryFollow(value) {
    if (this._isFollowingOrFulfilledOrRejected() ||
        value === this) {
        return false;
    }
    var maybePromise = Promise._cast(value, this._tryFollow, void 0);
    if (!isPromise(maybePromise)) {
        return false;
    }
    this._follow(maybePromise);
    return true;
};

Promise.prototype._resetTrace = function Promise$_resetTrace(caller) {
    if (debugging) {
        var context = this._peekContext();
        var isTopLevel = context === void 0;
        this._trace = new CapturedTrace(
            typeof caller === "function"
            ? caller
            : this._resetTrace,
            isTopLevel
       );
    }
};

Promise.prototype._setTrace = function Promise$_setTrace(caller, parent) {
    if (debugging) {
        var context = this._peekContext();
        this._traceParent = context;
        var isTopLevel = context === void 0;
        if (parent !== void 0 &&
            parent._traceParent === context) {
            this._trace = parent._trace;
        }
        else {
            this._trace = new CapturedTrace(
                typeof caller === "function"
                ? caller
                : this._setTrace,
                isTopLevel
           );
        }
    }
    return this;
};

Promise.prototype._attachExtraTrace =
function Promise$_attachExtraTrace(error) {
    if (debugging) {
        var promise = this;
        var stack = error.stack;
        stack = typeof stack === "string"
            ? stack.split("\n") : [];
        var headerLineCount = 1;

        while(promise != null &&
            promise._trace != null) {
            stack = CapturedTrace.combine(
                stack,
                promise._trace.stack.split("\n")
           );
            promise = promise._traceParent;
        }

        var max = Error.stackTraceLimit + headerLineCount;
        var len = stack.length;
        if (len  > max) {
            stack.length = max;
        }
        if (stack.length <= headerLineCount) {
            error.stack = "(No stack trace)";
        }
        else {
            error.stack = stack.join("\n");
        }
    }
};

Promise.prototype._cleanValues = function Promise$_cleanValues() {
    if (this._cancellable()) {
        this._cancellationParent = void 0;
    }
};

Promise.prototype._fulfill = function Promise$_fulfill(value) {
    if (this._isFollowingOrFulfilledOrRejected()) return;
    this._fulfillUnchecked(value);
};

Promise.prototype._reject =
function Promise$_reject(reason, carriedStackTrace) {
    if (this._isFollowingOrFulfilledOrRejected()) return;
    this._rejectUnchecked(reason, carriedStackTrace);
};

Promise.prototype._settlePromiseAt = function Promise$_settlePromiseAt(index) {
    var handler = this.isFulfilled()
        ? this._fulfillmentHandlerAt(index)
        : this._rejectionHandlerAt(index);

    var value = this._settledValue;
    var receiver = this._receiverAt(index);
    var promise = this._promiseAt(index);

    if (typeof handler === "function") {
        this._settlePromiseFromHandler(handler, receiver, value, promise);
    }
    else {
        var done = false;
        var isFulfilled = this.isFulfilled();
        if (receiver !== void 0) {
            if (receiver instanceof Promise &&
                receiver._isProxied()) {
                receiver._unsetProxied();

                if (isFulfilled) receiver._fulfillUnchecked(value);
                else receiver._rejectUnchecked(value,
                    this._getCarriedStackTrace());
                done = true;
            }
            else if (isPromiseArrayProxy(receiver, promise)) {

                if (isFulfilled) receiver._promiseFulfilled(value, promise);
                else receiver._promiseRejected(value, promise);

                done = true;
            }
        }

        if (!done) {

            if (isFulfilled) promise._fulfill(value);
            else promise._reject(value, this._getCarriedStackTrace());

        }
    }

    if (index >= 256) {
        this._queueGC();
    }
};

Promise.prototype._isProxied = function Promise$_isProxied() {
    return (this._bitField & 4194304) === 4194304;
};

Promise.prototype._setProxied = function Promise$_setProxied() {
    this._bitField = this._bitField | 4194304;
};

Promise.prototype._unsetProxied = function Promise$_unsetProxied() {
    this._bitField = this._bitField & (~4194304);
};

Promise.prototype._isGcQueued = function Promise$_isGcQueued() {
    return (this._bitField & -1073741824) === -1073741824;
};

Promise.prototype._setGcQueued = function Promise$_setGcQueued() {
    this._bitField = this._bitField | -1073741824;
};

Promise.prototype._unsetGcQueued = function Promise$_unsetGcQueued() {
    this._bitField = this._bitField & (~-1073741824);
};

Promise.prototype._queueGC = function Promise$_queueGC() {
    if (this._isGcQueued()) return;
    this._setGcQueued();
    async.invokeLater(this._gc, this, void 0);
};

Promise.prototype._gc = function Promise$gc() {
    var len = this._length();
    this._unsetAt(0);
    for (var i = 0; i < len; i++) {
        delete this[i];
    }
    this._setLength(0);
    this._unsetGcQueued();
};

Promise.prototype._queueSettleAt = function Promise$_queueSettleAt(index) {
    if (this._isRejectionUnhandled()) this._unsetRejectionIsUnhandled();
    async.invoke(this._settlePromiseAt, this, index);
};

Promise.prototype._fulfillUnchecked =
function Promise$_fulfillUnchecked(value) {
    if (!this.isPending()) return;
    if (value === this) {
        var err = makeSelfResolutionError();
        this._attachExtraTrace(err);
        return this._rejectUnchecked(err, void 0);
    }
    this._cleanValues();
    this._setFulfilled();
    this._settledValue = value;
    var len = this._length();

    if (len > 0) {
        async.invoke(this._fulfillPromises, this, len);
    }
};

Promise.prototype._rejectUncheckedCheckError =
function Promise$_rejectUncheckedCheckError(reason) {
    var trace = canAttach(reason) ? reason : new Error(reason + "");
    this._rejectUnchecked(reason, trace === reason ? void 0 : trace);
};

Promise.prototype._rejectUnchecked =
function Promise$_rejectUnchecked(reason, trace) {
    if (!this.isPending()) return;
    if (reason === this) {
        var err = makeSelfResolutionError();
        this._attachExtraTrace(err);
        return this._rejectUnchecked(err);
    }
    this._cleanValues();
    this._setRejected();
    this._settledValue = reason;

    if (this._isFinal()) {
        async.invokeLater(thrower, void 0, trace === void 0 ? reason : trace);
        return;
    }
    var len = this._length();

    if (trace !== void 0) this._setCarriedStackTrace(trace);

    if (len > 0) {
        async.invoke(this._rejectPromises, this, len);
    }
    else {
        this._ensurePossibleRejectionHandled();
    }
};

Promise.prototype._rejectPromises = function Promise$_rejectPromises(len) {
    len = this._length();
    for (var i = 0; i < len; i+= 5) {
        this._settlePromiseAt(i);
    }
    this._unsetCarriedStackTrace();
};

Promise.prototype._fulfillPromises = function Promise$_fulfillPromises(len) {
    len = this._length();
    for (var i = 0; i < len; i+= 5) {
        this._settlePromiseAt(i);
    }
};

Promise.prototype._ensurePossibleRejectionHandled =
function Promise$_ensurePossibleRejectionHandled() {
    this._setRejectionIsUnhandled();
    if (CapturedTrace.possiblyUnhandledRejection !== void 0) {
        async.invokeLater(this._notifyUnhandledRejection, this, void 0);
    }
};

Promise.prototype._notifyUnhandledRejection =
function Promise$_notifyUnhandledRejection() {
    if (this._isRejectionUnhandled()) {
        var reason = this._settledValue;
        var trace = this._getCarriedStackTrace();

        this._unsetRejectionIsUnhandled();

        if (trace !== void 0) {
            this._unsetCarriedStackTrace();
            reason = trace;
        }
        if (typeof CapturedTrace.possiblyUnhandledRejection === "function") {
            CapturedTrace.possiblyUnhandledRejection(reason, this);
        }
    }
};

var contextStack = [];
Promise.prototype._peekContext = function Promise$_peekContext() {
    var lastIndex = contextStack.length - 1;
    if (lastIndex >= 0) {
        return contextStack[lastIndex];
    }
    return void 0;

};

Promise.prototype._pushContext = function Promise$_pushContext() {
    if (!debugging) return;
    contextStack.push(this);
};

Promise.prototype._popContext = function Promise$_popContext() {
    if (!debugging) return;
    contextStack.pop();
};

function Promise$_CreatePromiseArray(
    promises, PromiseArrayConstructor, caller, boundTo) {

    var list = null;
    if (isArray(promises)) {
        list = promises;
    }
    else {
        list = Promise._cast(promises, caller, void 0);
        if (list !== promises) {
            list._setBoundTo(boundTo);
        }
        else if (!isPromise(list)) {
            list = null;
        }
    }
    if (list !== null) {
        return new PromiseArrayConstructor(
            list,
            typeof caller === "function"
                ? caller
                : Promise$_CreatePromiseArray,
            boundTo
       );
    }
    return {
        promise: function() {return apiRejection("expecting an array, a promise or a thenable");}
    };
}

var old = global.Promise;

Promise.noConflict = function() {
    if (global.Promise === Promise) {
        global.Promise = old;
    }
    return Promise;
};

if (!CapturedTrace.isSupported()) {
    Promise.longStackTraces = function(){};
    debugging = false;
}

Promise._makeSelfResolutionError = makeSelfResolutionError;
require("./finally.js")(Promise, NEXT_FILTER);
require("./direct_resolve.js")(Promise);
require("./thenables.js")(Promise, INTERNAL);
Promise.RangeError = RangeError;
Promise.CancellationError = CancellationError;
Promise.TimeoutError = TimeoutError;
Promise.TypeError = TypeError;
Promise.RejectionError = RejectionError;
require('./timers.js')(Promise,INTERNAL);
require('./synchronous_inspection.js')(Promise);
require('./any.js')(Promise,Promise$_CreatePromiseArray,PromiseArray);
require('./race.js')(Promise,INTERNAL);
require('./call_get.js')(Promise);
require('./filter.js')(Promise,Promise$_CreatePromiseArray,PromiseArray,apiRejection);
require('./generators.js')(Promise,apiRejection,INTERNAL);
require('./map.js')(Promise,Promise$_CreatePromiseArray,PromiseArray,apiRejection);
require('./nodeify.js')(Promise);
require('./promisify.js')(Promise,INTERNAL);
require('./props.js')(Promise,PromiseArray);
require('./reduce.js')(Promise,Promise$_CreatePromiseArray,PromiseArray,apiRejection,INTERNAL);
require('./settle.js')(Promise,Promise$_CreatePromiseArray,PromiseArray);
require('./some.js')(Promise,Promise$_CreatePromiseArray,PromiseArray,apiRejection);
require('./progress.js')(Promise,isPromiseArrayProxy);
require('./cancel.js')(Promise,INTERNAL);

Promise.prototype = Promise.prototype;
return Promise;

};

},{"./any.js":1,"./assert.js":2,"./async.js":3,"./call_get.js":5,"./cancel.js":6,"./captured_trace.js":7,"./catch_filter.js":8,"./direct_resolve.js":9,"./errors.js":10,"./errors_api_rejection":11,"./filter.js":13,"./finally.js":14,"./generators.js":15,"./global.js":16,"./map.js":17,"./nodeify.js":18,"./progress.js":19,"./promise_array.js":21,"./promise_resolver.js":23,"./promisify.js":25,"./props.js":27,"./race.js":29,"./reduce.js":30,"./settle.js":32,"./some.js":34,"./synchronous_inspection.js":36,"./thenables.js":37,"./timers.js":38,"./util.js":39}],21:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise, INTERNAL) {
var ASSERT = require("./assert.js");
var canAttach = require("./errors.js").canAttach;
var util = require("./util.js");
var async = require("./async.js");
var hasOwn = {}.hasOwnProperty;
var isArray = util.isArray;

function toResolutionValue(val) {
    switch(val) {
    case -1: return void 0;
    case -2: return [];
    case -3: return {};
    }
}

function PromiseArray(values, caller, boundTo) {
    var promise = this._promise = new Promise(INTERNAL);
    var parent = void 0;
    if (Promise.is(values)) {
        parent = values;
        if (values._cancellable()) {
            promise._setCancellable();
            promise._cancellationParent = values;
        }
        if (values._isBound()) {
            promise._setBoundTo(boundTo);
        }
    }
    promise._setTrace(caller, parent);
    this._values = values;
    this._length = 0;
    this._totalResolved = 0;
    this._init(void 0, -2);
}
PromiseArray.PropertiesPromiseArray = function() {};

PromiseArray.prototype.length = function PromiseArray$length() {
    return this._length;
};

PromiseArray.prototype.promise = function PromiseArray$promise() {
    return this._promise;
};

PromiseArray.prototype._init =
function PromiseArray$_init(_, resolveValueIfEmpty) {
    var values = this._values;
    if (Promise.is(values)) {
        if (values.isFulfilled()) {
            values = values._settledValue;
            if (!isArray(values)) {
                var err = new Promise.TypeError("expecting an array, a promise or a thenable");
                this.__hardReject__(err);
                return;
            }
            this._values = values;
        }
        else if (values.isPending()) {
            values._then(
                this._init,
                this._reject,
                void 0,
                this,
                resolveValueIfEmpty,
                this.constructor
           );
            return;
        }
        else {
            this._reject(values._settledValue);
            return;
        }
    }

    if (values.length === 0) {
        this._resolve(toResolutionValue(resolveValueIfEmpty));
        return;
    }
    var len = values.length;
    var newLen = len;
    var newValues;
    if (this instanceof PromiseArray.PropertiesPromiseArray) {
        newValues = this._values;
    }
    else {
        newValues = new Array(len);
    }
    var isDirectScanNeeded = false;
    for (var i = 0; i < len; ++i) {
        var promise = values[i];
        if (promise === void 0 && !hasOwn.call(values, i)) {
            newLen--;
            continue;
        }
        var maybePromise = Promise._cast(promise, void 0, void 0);
        if (maybePromise instanceof Promise &&
            maybePromise.isPending()) {
            maybePromise._proxyPromiseArray(this, i);
        }
        else {
            isDirectScanNeeded = true;
        }
        newValues[i] = maybePromise;
    }
    if (newLen === 0) {
        if (resolveValueIfEmpty === -2) {
            this._resolve(newValues);
        }
        else {
            this._resolve(toResolutionValue(resolveValueIfEmpty));
        }
        return;
    }
    this._values = newValues;
    this._length = newLen;
    if (isDirectScanNeeded) {
        var scanMethod = newLen === len
            ? this._scanDirectValues
            : this._scanDirectValuesHoled;
        async.invoke(scanMethod, this, len);
    }
};

PromiseArray.prototype._settlePromiseAt =
function PromiseArray$_settlePromiseAt(index) {
    var value = this._values[index];
    if (!Promise.is(value)) {
        this._promiseFulfilled(value, index);
    }
    else if (value.isFulfilled()) {
        this._promiseFulfilled(value._settledValue, index);
    }
    else if (value.isRejected()) {
        this._promiseRejected(value._settledValue, index);
    }
};

PromiseArray.prototype._scanDirectValuesHoled =
function PromiseArray$_scanDirectValuesHoled(len) {
    for (var i = 0; i < len; ++i) {
        if (this._isResolved()) {
            break;
        }
        if (hasOwn.call(this._values, i)) {
            this._settlePromiseAt(i);
        }
    }
};

PromiseArray.prototype._scanDirectValues =
function PromiseArray$_scanDirectValues(len) {
    for (var i = 0; i < len; ++i) {
        if (this._isResolved()) {
            break;
        }
        this._settlePromiseAt(i);
    }
};

PromiseArray.prototype._isResolved = function PromiseArray$_isResolved() {
    return this._values === null;
};

PromiseArray.prototype._resolve = function PromiseArray$_resolve(value) {
    this._values = null;
    this._promise._fulfill(value);
};

PromiseArray.prototype.__hardReject__ =
PromiseArray.prototype._reject = function PromiseArray$_reject(reason) {
    this._values = null;
    var trace = canAttach(reason) ? reason : new Error(reason + "");
    this._promise._attachExtraTrace(trace);
    this._promise._reject(reason, trace);
};

PromiseArray.prototype._promiseProgressed =
function PromiseArray$_promiseProgressed(progressValue, index) {
    if (this._isResolved()) return;
    this._promise._progress({
        index: index,
        value: progressValue
    });
};


PromiseArray.prototype._promiseFulfilled =
function PromiseArray$_promiseFulfilled(value, index) {
    if (this._isResolved()) return;
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
    }
};

PromiseArray.prototype._promiseRejected =
function PromiseArray$_promiseRejected(reason, index) {
    if (this._isResolved()) return;
    this._totalResolved++;
    this._reject(reason);
};

return PromiseArray;
};

},{"./assert.js":2,"./async.js":3,"./errors.js":10,"./util.js":39}],22:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
var TypeError = require("./errors.js").TypeError;

function PromiseInspection(promise) {
    if (promise !== void 0) {
        this._bitField = promise._bitField;
        this._settledValue = promise.isResolved()
            ? promise._settledValue
            : void 0;
    }
    else {
        this._bitField = 0;
        this._settledValue = void 0;
    }
}
PromiseInspection.prototype.isFulfilled =
function PromiseInspection$isFulfilled() {
    return (this._bitField & 268435456) > 0;
};

PromiseInspection.prototype.isRejected =
function PromiseInspection$isRejected() {
    return (this._bitField & 134217728) > 0;
};

PromiseInspection.prototype.isPending = function PromiseInspection$isPending() {
    return (this._bitField & 402653184) === 0;
};

PromiseInspection.prototype.value = function PromiseInspection$value() {
    if (!this.isFulfilled()) {
        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise");
    }
    return this._settledValue;
};

PromiseInspection.prototype.error = function PromiseInspection$error() {
    if (!this.isRejected()) {
        throw new TypeError("cannot get rejection reason of a non-rejected promise");
    }
    return this._settledValue;
};

module.exports = PromiseInspection;

},{"./errors.js":10}],23:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
var util = require("./util.js");
var maybeWrapAsError = util.maybeWrapAsError;
var errors = require("./errors.js");
var TimeoutError = errors.TimeoutError;
var RejectionError = errors.RejectionError;
var async = require("./async.js");
var haveGetters = util.haveGetters;
var es5 = require("./es5.js");

function isUntypedError(obj) {
    return obj instanceof Error &&
        es5.getPrototypeOf(obj) === Error.prototype;
}

function wrapAsRejectionError(obj) {
    var ret;
    if (isUntypedError(obj)) {
        ret = new RejectionError(obj);
    }
    else {
        ret = obj;
    }
    errors.markAsOriginatingFromRejection(ret);
    return ret;
}

function nodebackForPromise(promise) {
    function PromiseResolver$_callback(err, value) {
        if (promise === null) return;

        if (err) {
            var wrapped = wrapAsRejectionError(maybeWrapAsError(err));
            promise._attachExtraTrace(wrapped);
            promise._reject(wrapped);
        }
        else {
            if (arguments.length > 2) {
                var $_len = arguments.length;var args = new Array($_len - 1); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}
                promise._fulfill(args);
            }
            else {
                promise._fulfill(value);
            }
        }

        promise = null;
    }
    return PromiseResolver$_callback;
}


var PromiseResolver;
if (!haveGetters) {
    PromiseResolver = function PromiseResolver(promise) {
        this.promise = promise;
        this.asCallback = nodebackForPromise(promise);
        this.callback = this.asCallback;
    };
}
else {
    PromiseResolver = function PromiseResolver(promise) {
        this.promise = promise;
    };
}
if (haveGetters) {
    var prop = {
        get: function() {
            return nodebackForPromise(this.promise);
        }
    };
    es5.defineProperty(PromiseResolver.prototype, "asCallback", prop);
    es5.defineProperty(PromiseResolver.prototype, "callback", prop);
}

PromiseResolver._nodebackForPromise = nodebackForPromise;

PromiseResolver.prototype.toString = function PromiseResolver$toString() {
    return "[object PromiseResolver]";
};

PromiseResolver.prototype.resolve =
PromiseResolver.prototype.fulfill = function PromiseResolver$resolve(value) {
    var promise = this.promise;
    if (promise._tryFollow(value)) {
        return;
    }
    async.invoke(promise._fulfill, promise, value);
};

PromiseResolver.prototype.reject = function PromiseResolver$reject(reason) {
    var promise = this.promise;
    errors.markAsOriginatingFromRejection(reason);
    var trace = errors.canAttach(reason) ? reason : new Error(reason + "");
    promise._attachExtraTrace(trace);
    async.invoke(promise._reject, promise, reason);
    if (trace !== reason) {
        async.invoke(this._setCarriedStackTrace, this, trace);
    }
};

PromiseResolver.prototype.progress =
function PromiseResolver$progress(value) {
    async.invoke(this.promise._progress, this.promise, value);
};

PromiseResolver.prototype.cancel = function PromiseResolver$cancel() {
    async.invoke(this.promise.cancel, this.promise, void 0);
};

PromiseResolver.prototype.timeout = function PromiseResolver$timeout() {
    this.reject(new TimeoutError("timeout"));
};

PromiseResolver.prototype.isResolved = function PromiseResolver$isResolved() {
    return this.promise.isResolved();
};

PromiseResolver.prototype.toJSON = function PromiseResolver$toJSON() {
    return this.promise.toJSON();
};

PromiseResolver.prototype._setCarriedStackTrace =
function PromiseResolver$_setCarriedStackTrace(trace) {
    if (this.promise.isRejected()) {
        this.promise._setCarriedStackTrace(trace);
    }
};

module.exports = PromiseResolver;

},{"./async.js":3,"./errors.js":10,"./es5.js":12,"./util.js":39}],24:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise, INTERNAL) {
var errors = require("./errors.js");
var ASSERT = require("./assert.js");
var TypeError = errors.TypeError;
var util = require("./util.js");
var isArray = util.isArray;
var errorObj = util.errorObj;
var tryCatch1 = util.tryCatch1;
var yieldHandlers = [];

function promiseFromYieldHandler(value) {
    var _yieldHandlers = yieldHandlers;
    var _errorObj = errorObj;
    var _Promise = Promise;
    var len = _yieldHandlers.length;
    for (var i = 0; i < len; ++i) {
        var result = tryCatch1(_yieldHandlers[i], void 0, value);
        if (result === _errorObj) {
            return _Promise.reject(_errorObj.e);
        }
        var maybePromise = _Promise._cast(result,
            promiseFromYieldHandler, void 0);
        if (maybePromise instanceof _Promise) return maybePromise;
    }
    return null;
}

function PromiseSpawn(generatorFunction, receiver, caller) {
    var promise = this._promise = new Promise(INTERNAL);
    promise._setTrace(caller, void 0);
    this._generatorFunction = generatorFunction;
    this._receiver = receiver;
    this._generator = void 0;
}

PromiseSpawn.prototype.promise = function PromiseSpawn$promise() {
    return this._promise;
};

PromiseSpawn.prototype._run = function PromiseSpawn$_run() {
    this._generator = this._generatorFunction.call(this._receiver);
    this._receiver =
        this._generatorFunction = void 0;
    this._next(void 0);
};

PromiseSpawn.prototype._continue = function PromiseSpawn$_continue(result) {
    if (result === errorObj) {
        this._generator = void 0;
        var trace = errors.canAttach(result.e)
            ? result.e : new Error(result.e + "");
        this._promise._attachExtraTrace(trace);
        this._promise._reject(result.e, trace);
        return;
    }

    var value = result.value;
    if (result.done === true) {
        this._generator = void 0;
        if (!this._promise._tryFollow(value)) {
            this._promise._fulfill(value);
        }
    }
    else {
        var maybePromise = Promise._cast(value, PromiseSpawn$_continue, void 0);
        if (!(maybePromise instanceof Promise)) {
            if (isArray(maybePromise)) {
                maybePromise = Promise.all(maybePromise);
            }
            else {
                maybePromise = promiseFromYieldHandler(maybePromise);
            }
            if (maybePromise === null) {
                this._throw(new TypeError("A value was yielded that could not be treated as a promise"));
                return;
            }
        }
        maybePromise._then(
            this._next,
            this._throw,
            void 0,
            this,
            null,
            void 0
       );
    }
};

PromiseSpawn.prototype._throw = function PromiseSpawn$_throw(reason) {
    if (errors.canAttach(reason))
        this._promise._attachExtraTrace(reason);
    this._continue(
        tryCatch1(this._generator["throw"], this._generator, reason)
   );
};

PromiseSpawn.prototype._next = function PromiseSpawn$_next(value) {
    this._continue(
        tryCatch1(this._generator.next, this._generator, value)
   );
};

PromiseSpawn.addYieldHandler = function PromiseSpawn$AddYieldHandler(fn) {
    if (typeof fn !== "function") throw new TypeError("fn must be a function");
    yieldHandlers.push(fn);
};

return PromiseSpawn;
};

},{"./assert.js":2,"./errors.js":10,"./util.js":39}],25:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise, INTERNAL) {
var THIS = {};
var util = require("./util.js");
var es5 = require("./es5.js");
var nodebackForPromise = require("./promise_resolver.js")
    ._nodebackForPromise;
var withAppended = util.withAppended;
var maybeWrapAsError = util.maybeWrapAsError;
var canEvaluate = util.canEvaluate;
var notEnumerableProp = util.notEnumerableProp;
var deprecated = util.deprecated;
var ASSERT = require("./assert.js");


var roriginal = new RegExp("__beforePromisified__" + "$");
var hasProp = {}.hasOwnProperty;
function isPromisified(fn) {
    return fn.__isPromisified__ === true;
}
var inheritedMethods = (function() {
    if (es5.isES5) {
        var create = Object.create;
        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        return function(cur) {
            var original = cur;
            var ret = [];
            var visitedKeys = create(null);
            while (cur !== null) {
                var keys = es5.keys(cur);
                for (var i = 0, len = keys.length; i < len; ++i) {
                    var key = keys[i];
                    if (visitedKeys[key] ||
                        roriginal.test(key) ||
                        hasProp.call(original, key + "__beforePromisified__")
                   ) {
                        continue;
                    }
                    visitedKeys[key] = true;
                    var desc = getOwnPropertyDescriptor(cur, key);
                    if (desc != null &&
                        typeof desc.value === "function" &&
                        !isPromisified(desc.value)) {
                        ret.push(key, desc.value);
                    }
                }
                cur = es5.getPrototypeOf(cur);
            }
            return ret;
        };
    }
    else {
        return function(obj) {
            var ret = [];
            /*jshint forin:false */
            for (var key in obj) {
                if (roriginal.test(key) ||
                    hasProp.call(obj, key + "__beforePromisified__")) {
                    continue;
                }
                var fn = obj[key];
                if (typeof fn === "function" &&
                    !isPromisified(fn)) {
                    ret.push(key, fn);
                }
            }
            return ret;
        };
    }
})();

function switchCaseArgumentOrder(likelyArgumentCount) {
    var ret = [likelyArgumentCount];
    var min = Math.max(0, likelyArgumentCount - 1 - 5);
    for(var i = likelyArgumentCount - 1; i >= min; --i) {
        if (i === likelyArgumentCount) continue;
        ret.push(i);
    }
    for(var i = likelyArgumentCount + 1; i <= 5; ++i) {
        ret.push(i);
    }
    return ret;
}

function parameterDeclaration(parameterCount) {
    var ret = new Array(parameterCount);
    for(var i = 0; i < ret.length; ++i) {
        ret[i] = "_arg" + i;
    }
    return ret.join(", ");
}

function parameterCount(fn) {
    if (typeof fn.length === "number") {
        return Math.max(Math.min(fn.length, 1023 + 1), 0);
    }
    return 0;
}

function propertyAccess(id) {
    var rident = /^[a-z$_][a-z$_0-9]*$/i;

    if (rident.test(id)) {
        return "." + id;
    }
    else return "['" + id.replace(/(['\\])/g, "\\$1") + "']";
}

function makeNodePromisifiedEval(callback, receiver, originalName, fn) {
    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
    var argumentOrder = switchCaseArgumentOrder(newParameterCount);

    var callbackName = (typeof originalName === "string" ?
        originalName + "Async" :
        "promisified");

    function generateCallForArgumentCount(count) {
        var args = new Array(count);
        for (var i = 0, len = args.length; i < len; ++i) {
            args[i] = "arguments[" + i + "]";
        }
        var comma = count > 0 ? "," : "";

        if (typeof callback === "string" &&
            receiver === THIS) {
            return "this" + propertyAccess(callback) + "("+args.join(",") +
                comma +" fn);"+
                "break;";
        }
        return (receiver === void 0
            ? "callback("+args.join(",")+ comma +" fn);"
            : "callback.call("+(receiver === THIS
                ? "this"
                : "receiver")+", "+args.join(",") + comma + " fn);") +
        "break;";
    }

    function generateArgumentSwitchCase() {
        var ret = "";
        for(var i = 0; i < argumentOrder.length; ++i) {
            ret += "case " + argumentOrder[i] +":" +
                generateCallForArgumentCount(argumentOrder[i]);
        }
        ret += "default: var args = new Array(len + 1);" +
            "var i = 0;" +
            "for (var i = 0; i < len; ++i) { " +
            "   args[i] = arguments[i];" +
            "}" +
            "args[i] = fn;" +

            (typeof callback === "string"
            ? "this" + propertyAccess(callback) + ".apply("
            : "callback.apply(") +

            (receiver === THIS ? "this" : "receiver") +
            ", args); break;";
        return ret;
    }

    return new Function("Promise", "callback", "receiver",
            "withAppended", "maybeWrapAsError", "nodebackForPromise",
            "INTERNAL",
        "var ret = function " + callbackName +
        "(" + parameterDeclaration(newParameterCount) + ") {\"use strict\";" +
        "var len = arguments.length;" +
        "var promise = new Promise(INTERNAL);"+
        "promise._setTrace(" + callbackName + ", void 0);" +
        "var fn = nodebackForPromise(promise);"+
        "try {" +
        "switch(len) {" +
        generateArgumentSwitchCase() +
        "}" +
        "}" +
        "catch(e){ " +
        "var wrapped = maybeWrapAsError(e);" +
        "promise._attachExtraTrace(wrapped);" +
        "promise._reject(wrapped);" +
        "}" +
        "return promise;" +
        "" +
        "}; ret.__isPromisified__ = true; return ret;"
   )(Promise, callback, receiver, withAppended,
        maybeWrapAsError, nodebackForPromise, INTERNAL);
}

function makeNodePromisifiedClosure(callback, receiver) {
    function promisified() {
        var _receiver = receiver;
        if (receiver === THIS) _receiver = this;
        if (typeof callback === "string") {
            callback = _receiver[callback];
        }
        var promise = new Promise(INTERNAL);
        promise._setTrace(promisified, void 0);
        var fn = nodebackForPromise(promise);
        try {
            callback.apply(_receiver, withAppended(arguments, fn));
        }
        catch(e) {
            var wrapped = maybeWrapAsError(e);
            promise._attachExtraTrace(wrapped);
            promise._reject(wrapped);
        }
        return promise;
    }
    promisified.__isPromisified__ = true;
    return promisified;
}

var makeNodePromisified = canEvaluate
    ? makeNodePromisifiedEval
    : makeNodePromisifiedClosure;

function f(){}
function _promisify(callback, receiver, isAll) {
    if (isAll) {
        var methods = inheritedMethods(callback);
        for (var i = 0, len = methods.length; i < len; i+= 2) {
            var key = methods[i];
            var fn = methods[i+1];
            var originalKey = key + "__beforePromisified__";
            var promisifiedKey = key + "Async";
            notEnumerableProp(callback, originalKey, fn);
            callback[promisifiedKey] =
                makeNodePromisified(originalKey, THIS,
                    key, fn);
        }
        if (methods.length > 16) f.prototype = callback;
        return callback;
    }
    else {
        return makeNodePromisified(callback, receiver, void 0, callback);
    }
}

Promise.promisify = function Promise$Promisify(fn, receiver) {
    if (typeof fn === "object" && fn !== null) {
        deprecated("Promise.promisify for promisifying entire objects is deprecated. Use Promise.promisifyAll instead.");
        return _promisify(fn, receiver, true);
    }
    if (typeof fn !== "function") {
        throw new TypeError("fn must be a function");
    }
    if (isPromisified(fn)) {
        return fn;
    }
    return _promisify(
        fn,
        arguments.length < 2 ? THIS : receiver,
        false);
};

Promise.promisifyAll = function Promise$PromisifyAll(target) {
    if (typeof target !== "function" && typeof target !== "object") {
        throw new TypeError("the target of promisifyAll must be an object or a function");
    }
    return _promisify(target, void 0, true);
};
};


},{"./assert.js":2,"./es5.js":12,"./promise_resolver.js":23,"./util.js":39}],26:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise, PromiseArray) {
var ASSERT = require("./assert.js");
var util = require("./util.js");
var inherits = util.inherits;
var es5 = require("./es5.js");

function PropertiesPromiseArray(obj, caller, boundTo) {
    var keys = es5.keys(obj);
    var values = new Array(keys.length);
    for (var i = 0, len = values.length; i < len; ++i) {
        values[i] = obj[keys[i]];
    }
    this.constructor$(values, caller, boundTo);
    if (!this._isResolved()) {
        for (var i = 0, len = keys.length; i < len; ++i) {
            values.push(keys[i]);
        }
    }
}
inherits(PropertiesPromiseArray, PromiseArray);

PropertiesPromiseArray.prototype._init =
function PropertiesPromiseArray$_init() {
    this._init$(void 0, -3) ;
};

PropertiesPromiseArray.prototype._promiseFulfilled =
function PropertiesPromiseArray$_promiseFulfilled(value, index) {
    if (this._isResolved()) return;
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        var val = {};
        var keyOffset = this.length();
        for (var i = 0, len = this.length(); i < len; ++i) {
            val[this._values[i + keyOffset]] = this._values[i];
        }
        this._resolve(val);
    }
};

PropertiesPromiseArray.prototype._promiseProgressed =
function PropertiesPromiseArray$_promiseProgressed(value, index) {
    if (this._isResolved()) return;

    this._promise._progress({
        key: this._values[index + this.length()],
        value: value
    });
};

PromiseArray.PropertiesPromiseArray = PropertiesPromiseArray;

return PropertiesPromiseArray;
};

},{"./assert.js":2,"./es5.js":12,"./util.js":39}],27:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise, PromiseArray) {
    var PropertiesPromiseArray = require("./properties_promise_array.js")(
        Promise, PromiseArray);
    var util = require("./util.js");
    var apiRejection = require("./errors_api_rejection")(Promise);
    var isObject = util.isObject;

    function Promise$_Props(promises, useBound, caller) {
        var ret;
        var castValue = Promise._cast(promises, caller, void 0);

        if (!isObject(castValue)) {
            return apiRejection("cannot await properties of a non-object");
        }
        else if (Promise.is(castValue)) {
            ret = castValue._then(Promise.props, void 0, void 0,
                            void 0, void 0, caller);
        }
        else {
            ret = new PropertiesPromiseArray(
                castValue,
                caller,
                useBound === true && castValue._isBound()
                            ? castValue._boundTo
                            : void 0
           ).promise();
            useBound = false;
        }
        if (useBound === true && castValue._isBound()) {
            ret._setBoundTo(castValue._boundTo);
        }
        return ret;
    }

    Promise.prototype.props = function Promise$props() {
        return Promise$_Props(this, true, this.props);
    };

    Promise.props = function Promise$Props(promises) {
        return Promise$_Props(promises, false, Promise.props);
    };
};

},{"./errors_api_rejection":11,"./properties_promise_array.js":26,"./util.js":39}],28:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
var ASSERT = require("./assert.js");
function arrayCopy(src, srcIndex, dst, dstIndex, len) {
    for (var j = 0; j < len; ++j) {
        dst[j + dstIndex] = src[j + srcIndex];
    }
}

function pow2AtLeast(n) {
    n = n >>> 0;
    n = n - 1;
    n = n | (n >> 1);
    n = n | (n >> 2);
    n = n | (n >> 4);
    n = n | (n >> 8);
    n = n | (n >> 16);
    return n + 1;
}

function getCapacity(capacity) {
    if (typeof capacity !== "number") return 16;
    return pow2AtLeast(
        Math.min(
            Math.max(16, capacity), 1073741824)
   );
}

function Queue(capacity) {
    this._capacity = getCapacity(capacity);
    this._length = 0;
    this._front = 0;
    this._makeCapacity();
}

Queue.prototype._willBeOverCapacity =
function Queue$_willBeOverCapacity(size) {
    return this._capacity < size;
};

Queue.prototype._pushOne = function Queue$_pushOne(arg) {
    var length = this.length();
    this._checkCapacity(length + 1);
    var i = (this._front + length) & (this._capacity - 1);
    this[i] = arg;
    this._length = length + 1;
};

Queue.prototype.push = function Queue$push(fn, receiver, arg) {
    var length = this.length() + 3;
    if (this._willBeOverCapacity(length)) {
        this._pushOne(fn);
        this._pushOne(receiver);
        this._pushOne(arg);
        return;
    }
    var j = this._front + length - 3;
    this._checkCapacity(length);
    var wrapMask = this._capacity - 1;
    this[(j + 0) & wrapMask] = fn;
    this[(j + 1) & wrapMask] = receiver;
    this[(j + 2) & wrapMask] = arg;
    this._length = length;
};

Queue.prototype.shift = function Queue$shift() {
    var front = this._front,
        ret = this[front];

    this[front] = void 0;
    this._front = (front + 1) & (this._capacity - 1);
    this._length--;
    return ret;
};

Queue.prototype.length = function Queue$length() {
    return this._length;
};

Queue.prototype._makeCapacity = function Queue$_makeCapacity() {
    var len = this._capacity;
    for (var i = 0; i < len; ++i) {
        this[i] = void 0;
    }
};

Queue.prototype._checkCapacity = function Queue$_checkCapacity(size) {
    if (this._capacity < size) {
        this._resizeTo(this._capacity << 3);
    }
};

Queue.prototype._resizeTo = function Queue$_resizeTo(capacity) {
    var oldFront = this._front;
    var oldCapacity = this._capacity;
    var oldQueue = new Array(oldCapacity);
    var length = this.length();

    arrayCopy(this, 0, oldQueue, 0, oldCapacity);
    this._capacity = capacity;
    this._makeCapacity();
    this._front = 0;
    if (oldFront + length <= oldCapacity) {
        arrayCopy(oldQueue, oldFront, this, 0, length);
    }
    else {        var lengthBeforeWrapping =
            length - ((oldFront + length) & (oldCapacity - 1));

        arrayCopy(oldQueue, oldFront, this, 0, lengthBeforeWrapping);
        arrayCopy(oldQueue, 0, this, lengthBeforeWrapping,
                    length - lengthBeforeWrapping);
    }
};

module.exports = Queue;

},{"./assert.js":2}],29:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise, INTERNAL) {
    var apiRejection = require("./errors_api_rejection.js")(Promise);
    var isArray = require("./util.js").isArray;

    var raceLater = function Promise$_raceLater(promise) {
        return promise.then(function Promise$_lateRacer(array) {
            return Promise$_Race(array, Promise$_lateRacer, promise);
        });
    };

    var hasOwn = {}.hasOwnProperty;
    function Promise$_Race(promises, caller, parent) {
        var maybePromise = Promise._cast(promises, caller, void 0);

        if (Promise.is(maybePromise)) {
            return raceLater(maybePromise);
        }
        else if (!isArray(promises)) {
            return apiRejection("expecting an array, a promise or a thenable");
        }

        var ret = new Promise(INTERNAL);
        ret._setTrace(caller, parent);
        if (parent !== void 0) {
            if (parent._isBound()) {
                ret._setBoundTo(parent._boundTo);
            }
            if (parent._cancellable()) {
                ret._setCancellable();
                ret._cancellationParent = parent;
            }
        }
        var fulfill = ret._fulfill;
        var reject = ret._reject;
        for (var i = 0, len = promises.length; i < len; ++i) {
            var val = promises[i];

            if (val === void 0 && !(hasOwn.call(promises, i))) {
                continue;
            }

            Promise.cast(val)._then(
                fulfill,
                reject,
                void 0,
                ret,
                null,
                caller
           );
        }
        return ret;
    }

    Promise.race = function Promise$Race(promises) {
        return Promise$_Race(promises, Promise.race, void 0);
    };

    Promise.prototype.race = function Promise$race() {
        return Promise$_Race(this, this.race, void 0);
    };

};

},{"./errors_api_rejection.js":11,"./util.js":39}],30:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(
    Promise, Promise$_CreatePromiseArray,
    PromiseArray, apiRejection, INTERNAL) {

    var ASSERT = require("./assert.js");

    function Reduction(callback, index, accum, items, receiver) {
        this.promise = new Promise(INTERNAL);
        this.index = index;
        this.length = items.length;
        this.items = items;
        this.callback = callback;
        this.receiver = receiver;
        this.accum = accum;
    }

    Reduction.prototype.reject = function Reduction$reject(e) {
        this.promise._reject(e);
    };

    Reduction.prototype.fulfill = function Reduction$fulfill(value, index) {
        this.accum = value;
        this.index = index + 1;
        this.iterate();
    };

    Reduction.prototype.iterate = function Reduction$iterate() {
        var i = this.index;
        var len = this.length;
        var items = this.items;
        var result = this.accum;
        var receiver = this.receiver;
        var callback = this.callback;
        var iterate = this.iterate;

        for(; i < len; ++i) {
            result = Promise._cast(
                callback.call(
                    receiver,
                    result,
                    items[i],
                    i,
                    len
                ),
                iterate,
                void 0
            );

            if (result instanceof Promise) {
                result._then(
                    this.fulfill, this.reject, void 0, this, i, iterate);
                return;
            }
        }
        this.promise._fulfill(result);
    };

    function Promise$_reducer(fulfilleds, initialValue) {
        var fn = this;
        var receiver = void 0;
        if (typeof fn !== "function")  {
            receiver = fn.receiver;
            fn = fn.fn;
        }
        var len = fulfilleds.length;
        var accum = void 0;
        var startIndex = 0;

        if (initialValue !== void 0) {
            accum = initialValue;
            startIndex = 0;
        }
        else {
            startIndex = 1;
            if (len > 0) accum = fulfilleds[0];
        }
        var i = startIndex;

        if (i >= len) {
            return accum;
        }

        var reduction = new Reduction(fn, i, accum, fulfilleds, receiver);
        reduction.iterate();
        return reduction.promise;
    }

    function Promise$_unpackReducer(fulfilleds) {
        var fn = this.fn;
        var initialValue = this.initialValue;
        return Promise$_reducer.call(fn, fulfilleds, initialValue);
    }

    function Promise$_slowReduce(
        promises, fn, initialValue, useBound, caller) {
        return initialValue._then(function callee(initialValue) {
            return Promise$_Reduce(
                promises, fn, initialValue, useBound, callee);
        }, void 0, void 0, void 0, void 0, caller);
    }

    function Promise$_Reduce(promises, fn, initialValue, useBound, caller) {
        if (typeof fn !== "function") {
            return apiRejection("fn must be a function");
        }

        if (useBound === true && promises._isBound()) {
            fn = {
                fn: fn,
                receiver: promises._boundTo
            };
        }

        if (initialValue !== void 0) {
            if (Promise.is(initialValue)) {
                if (initialValue.isFulfilled()) {
                    initialValue = initialValue._settledValue;
                }
                else {
                    return Promise$_slowReduce(promises,
                        fn, initialValue, useBound, caller);
                }
            }

            return Promise$_CreatePromiseArray(promises, PromiseArray, caller,
                useBound === true && promises._isBound()
                    ? promises._boundTo
                    : void 0)
                .promise()
                ._then(Promise$_unpackReducer, void 0, void 0, {
                    fn: fn,
                    initialValue: initialValue
                }, void 0, Promise.reduce);
        }
        return Promise$_CreatePromiseArray(promises, PromiseArray, caller,
                useBound === true && promises._isBound()
                    ? promises._boundTo
                    : void 0).promise()
            ._then(Promise$_reducer, void 0, void 0, fn, void 0, caller);
    }


    Promise.reduce = function Promise$Reduce(promises, fn, initialValue) {
        return Promise$_Reduce(promises, fn,
            initialValue, false, Promise.reduce);
    };

    Promise.prototype.reduce = function Promise$reduce(fn, initialValue) {
        return Promise$_Reduce(this, fn, initialValue,
                                true, this.reduce);
    };
};

},{"./assert.js":2}],31:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
var global = require("./global.js");
var ASSERT = require("./assert.js");
var schedule;
if (typeof process !== "undefined" && process !== null &&
    typeof process.cwd === "function" &&
    typeof process.nextTick === "function" &&
    typeof process.version === "string") {
    schedule = function Promise$_Scheduler(fn) {
        process.nextTick(fn);
    };
}
else if ((typeof global.MutationObserver === "function" ||
        typeof global.WebkitMutationObserver === "function" ||
        typeof global.WebKitMutationObserver === "function") &&
        typeof document !== "undefined" &&
        typeof document.createElement === "function") {


    schedule = (function(){
        var MutationObserver = global.MutationObserver ||
            global.WebkitMutationObserver ||
            global.WebKitMutationObserver;
        var div = document.createElement("div");
        var queuedFn = void 0;
        var observer = new MutationObserver(
            function Promise$_Scheduler() {
                var fn = queuedFn;
                queuedFn = void 0;
                fn();
            }
       );
        observer.observe(div, {
            attributes: true
        });
        return function Promise$_Scheduler(fn) {
            queuedFn = fn;
            div.setAttribute("class", "foo");
        };

    })();
}
else if (typeof global.postMessage === "function" &&
    typeof global.importScripts !== "function" &&
    typeof global.addEventListener === "function" &&
    typeof global.removeEventListener === "function") {

    var MESSAGE_KEY = "bluebird_message_key_" + Math.random();
    schedule = (function(){
        var queuedFn = void 0;

        function Promise$_Scheduler(e) {
            if (e.source === global &&
                e.data === MESSAGE_KEY) {
                var fn = queuedFn;
                queuedFn = void 0;
                fn();
            }
        }

        global.addEventListener("message", Promise$_Scheduler, false);

        return function Promise$_Scheduler(fn) {
            queuedFn = fn;
            global.postMessage(
                MESSAGE_KEY, "*"
           );
        };

    })();
}
else if (typeof global.MessageChannel === "function") {
    schedule = (function(){
        var queuedFn = void 0;

        var channel = new global.MessageChannel();
        channel.port1.onmessage = function Promise$_Scheduler() {
                var fn = queuedFn;
                queuedFn = void 0;
                fn();
        };

        return function Promise$_Scheduler(fn) {
            queuedFn = fn;
            channel.port2.postMessage(null);
        };
    })();
}
else if (global.setTimeout) {
    schedule = function Promise$_Scheduler(fn) {
        setTimeout(fn, 4);
    };
}
else {
    schedule = function Promise$_Scheduler(fn) {
        fn();
    };
}

module.exports = schedule;

},{"./assert.js":2,"./global.js":16}],32:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports =
    function(Promise, Promise$_CreatePromiseArray, PromiseArray) {

    var SettledPromiseArray = require("./settled_promise_array.js")(
        Promise, PromiseArray);

    function Promise$_Settle(promises, useBound, caller) {
        return Promise$_CreatePromiseArray(
            promises,
            SettledPromiseArray,
            caller,
            useBound === true && promises._isBound()
                ? promises._boundTo
                : void 0
       ).promise();
    }

    Promise.settle = function Promise$Settle(promises) {
        return Promise$_Settle(promises, false, Promise.settle);
    };

    Promise.prototype.settle = function Promise$settle() {
        return Promise$_Settle(this, true, this.settle);
    };

};

},{"./settled_promise_array.js":33}],33:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise, PromiseArray) {
var ASSERT = require("./assert.js");
var PromiseInspection = require("./promise_inspection.js");
var util = require("./util.js");
var inherits = util.inherits;
function SettledPromiseArray(values, caller, boundTo) {
    this.constructor$(values, caller, boundTo);
}
inherits(SettledPromiseArray, PromiseArray);

SettledPromiseArray.prototype._promiseResolved =
function SettledPromiseArray$_promiseResolved(index, inspection) {
    this._values[index] = inspection;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
    }
};

SettledPromiseArray.prototype._promiseFulfilled =
function SettledPromiseArray$_promiseFulfilled(value, index) {
    if (this._isResolved()) return;
    var ret = new PromiseInspection();
    ret._bitField = 268435456;
    ret._settledValue = value;
    this._promiseResolved(index, ret);
};
SettledPromiseArray.prototype._promiseRejected =
function SettledPromiseArray$_promiseRejected(reason, index) {
    if (this._isResolved()) return;
    var ret = new PromiseInspection();
    ret._bitField = 134217728;
    ret._settledValue = reason;
    this._promiseResolved(index, ret);
};

return SettledPromiseArray;
};

},{"./assert.js":2,"./promise_inspection.js":22,"./util.js":39}],34:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports =
function(Promise, Promise$_CreatePromiseArray, PromiseArray, apiRejection) {

    var SomePromiseArray = require("./some_promise_array.js")(PromiseArray);
    var ASSERT = require("./assert.js");

    function Promise$_Some(promises, howMany, useBound, caller) {
        if ((howMany | 0) !== howMany || howMany < 0) {
            return apiRejection("expecting a positive integer");
        }
        var ret = Promise$_CreatePromiseArray(
            promises,
            SomePromiseArray,
            caller,
            useBound === true && promises._isBound()
                ? promises._boundTo
                : void 0
       );
        var promise = ret.promise();
        if (promise.isRejected()) {
            return promise;
        }
        ret.setHowMany(howMany);
        ret.init();
        return promise;
    }

    Promise.some = function Promise$Some(promises, howMany) {
        return Promise$_Some(promises, howMany, false, Promise.some);
    };

    Promise.prototype.some = function Promise$some(count) {
        return Promise$_Some(this, count, true, this.some);
    };

};

},{"./assert.js":2,"./some_promise_array.js":35}],35:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function (PromiseArray) {
var util = require("./util.js");
var RangeError = require("./errors.js").RangeError;
var inherits = util.inherits;
var isArray = util.isArray;

function SomePromiseArray(values, caller, boundTo) {
    this.constructor$(values, caller, boundTo);
    this._howMany = 0;
    this._unwrap = false;
    this._initialized = false;
}
inherits(SomePromiseArray, PromiseArray);

SomePromiseArray.prototype._init = function SomePromiseArray$_init() {
    if (!this._initialized) {
        return;
    }
    if (this._howMany === 0) {
        this._resolve([]);
        return;
    }
    this._init$(void 0, -2);
    var isArrayResolved = isArray(this._values);
    this._holes = isArrayResolved ? this._values.length - this.length() : 0;

    if (!this._isResolved() &&
        isArrayResolved &&
        this._howMany > this._canPossiblyFulfill()) {
        var message = "(Promise.some) input array contains less than " +
                        this._howMany  + " promises";
        this._reject(new RangeError(message));
    }
};

SomePromiseArray.prototype.init = function SomePromiseArray$init() {
    this._initialized = true;
    this._init();
};

SomePromiseArray.prototype.setUnwrap = function SomePromiseArray$setUnwrap() {
    this._unwrap = true;
};

SomePromiseArray.prototype.howMany = function SomePromiseArray$howMany() {
    return this._howMany;
};

SomePromiseArray.prototype.setHowMany =
function SomePromiseArray$setHowMany(count) {
    if (this._isResolved()) return;
    this._howMany = count;
};

SomePromiseArray.prototype._promiseFulfilled =
function SomePromiseArray$_promiseFulfilled(value) {
    if (this._isResolved()) return;
    this._addFulfilled(value);
    if (this._fulfilled() === this.howMany()) {
        this._values.length = this.howMany();
        if (this.howMany() === 1 && this._unwrap) {
            this._resolve(this._values[0]);
        }
        else {
            this._resolve(this._values);
        }
    }

};
SomePromiseArray.prototype._promiseRejected =
function SomePromiseArray$_promiseRejected(reason) {
    if (this._isResolved()) return;
    this._addRejected(reason);
    if (this.howMany() > this._canPossiblyFulfill()) {
        if (this._values.length === this.length()) {
            this._reject([]);
        }
        else {
            this._reject(this._values.slice(this.length() + this._holes));
        }
    }
};

SomePromiseArray.prototype._fulfilled = function SomePromiseArray$_fulfilled() {
    return this._totalResolved;
};

SomePromiseArray.prototype._rejected = function SomePromiseArray$_rejected() {
    return this._values.length - this.length() - this._holes;
};

SomePromiseArray.prototype._addRejected =
function SomePromiseArray$_addRejected(reason) {
    this._values.push(reason);
};

SomePromiseArray.prototype._addFulfilled =
function SomePromiseArray$_addFulfilled(value) {
    this._values[this._totalResolved++] = value;
};

SomePromiseArray.prototype._canPossiblyFulfill =
function SomePromiseArray$_canPossiblyFulfill() {
    return this.length() - this._rejected();
};

return SomePromiseArray;
};

},{"./errors.js":10,"./util.js":39}],36:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise) {
    var PromiseInspection = require("./promise_inspection.js");

    Promise.prototype.inspect = function Promise$inspect() {
        return new PromiseInspection(this);
    };
};

},{"./promise_inspection.js":22}],37:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
module.exports = function(Promise, INTERNAL) {
    var ASSERT = require("./assert.js");
    var util = require("./util.js");
    var canAttach = require("./errors.js").canAttach;
    var errorObj = util.errorObj;
    var isObject = util.isObject;

    function getThen(obj) {
        try {
            return obj.then;
        }
        catch(e) {
            errorObj.e = e;
            return errorObj;
        }
    }

    function Promise$_Cast(obj, caller, originalPromise) {
        if (isObject(obj)) {
            if (obj instanceof Promise) {
                return obj;
            }
            else if (isAnyBluebirdPromise(obj)) {
                var ret = new Promise(INTERNAL);
                ret._setTrace(caller, void 0);
                obj._then(
                    ret._fulfillUnchecked,
                    ret._rejectUncheckedCheckError,
                    ret._progressUnchecked,
                    ret,
                    null,
                    void 0
                );
                ret._setFollowing();
                return ret;
            }
            var then = getThen(obj);
            if (then === errorObj) {
                caller = typeof caller === "function" ? caller : Promise$_Cast;
                if (originalPromise !== void 0 && canAttach(then.e)) {
                    originalPromise._attachExtraTrace(then.e);
                }
                return Promise.reject(then.e, caller);
            }
            else if (typeof then === "function") {
                caller = typeof caller === "function" ? caller : Promise$_Cast;
                return Promise$_doThenable(obj, then, caller, originalPromise);
            }
        }
        return obj;
    }

    var hasProp = {}.hasOwnProperty;
    function isAnyBluebirdPromise(obj) {
        return hasProp.call(obj, "_promise0");
    }

    function Promise$_doThenable(x, then, caller, originalPromise) {
        var resolver = Promise.defer(caller);
        var called = false;
        try {
            then.call(
                x,
                Promise$_resolveFromThenable,
                Promise$_rejectFromThenable,
                Promise$_progressFromThenable
            );
        }
        catch(e) {
            if (!called) {
                called = true;
                var trace = canAttach(e) ? e : new Error(e + "");
                if (originalPromise !== void 0) {
                    originalPromise._attachExtraTrace(trace);
                }
                resolver.promise._reject(e, trace);
            }
        }
        return resolver.promise;

        function Promise$_resolveFromThenable(y) {
            if (called) return;
            called = true;

            if (x === y) {
                var e = Promise._makeSelfResolutionError();
                if (originalPromise !== void 0) {
                    originalPromise._attachExtraTrace(e);
                }
                resolver.promise._reject(e, void 0);
                return;
            }
            resolver.resolve(y);
        }

        function Promise$_rejectFromThenable(r) {
            if (called) return;
            called = true;
            var trace = canAttach(r) ? r : new Error(r + "");
            if (originalPromise !== void 0) {
                originalPromise._attachExtraTrace(trace);
            }
            resolver.promise._reject(r, trace);
        }

        function Promise$_progressFromThenable(v) {
            if (called) return;
            var promise = resolver.promise;
            if (typeof promise._progress === "function") {
                promise._progress(v);
            }
        }
    }

    Promise._cast = Promise$_Cast;
};

},{"./assert.js":2,"./errors.js":10,"./util.js":39}],38:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";

var global = require("./global.js");
var setTimeout = function(fn, time) {
    var $_len = arguments.length;var args = new Array($_len - 2); for(var $_i = 2; $_i < $_len; ++$_i) {args[$_i - 2] = arguments[$_i];}
    global.setTimeout(function() {
        fn.apply(void 0, args);
    }, time);
};

var pass = {};
global.setTimeout( function(_) {
    if(_ === pass) {
        setTimeout = global.setTimeout;
    }
}, 1, pass);

module.exports = function(Promise, INTERNAL) {
    var util = require("./util.js");
    var ASSERT = require("./assert.js");
    var errors = require("./errors.js");
    var apiRejection = require("./errors_api_rejection")(Promise);
    var TimeoutError = Promise.TimeoutError;

    var afterTimeout = function Promise$_afterTimeout(promise, message, ms) {
        if (!promise.isPending()) return;
        if (typeof message !== "string") {
            message = "operation timed out after" + " " + ms + " ms"
        }
        var err = new TimeoutError(message);
        errors.markAsOriginatingFromRejection(err);
        promise._attachExtraTrace(err);
        promise._rejectUnchecked(err);
    };

    var afterDelay = function Promise$_afterDelay(value, promise) {
        promise._fulfill(value);
    };

    Promise.delay = function Promise$Delay(value, ms, caller) {
        if (ms === void 0) {
            ms = value;
            value = void 0;
        }
        ms = +ms;
        if (typeof caller !== "function") {
            caller = Promise.delay;
        }
        var maybePromise = Promise._cast(value, caller, void 0);
        var promise = new Promise(INTERNAL);

        if (Promise.is(maybePromise)) {
            if (maybePromise._isBound()) {
                promise._setBoundTo(maybePromise._boundTo);
            }
            if (maybePromise._cancellable()) {
                promise._setCancellable();
                promise._cancellationParent = maybePromise;
            }
            promise._setTrace(caller, maybePromise);
            promise._follow(maybePromise);
            return promise.then(function(value) {
                return Promise.delay(value, ms);
            });
        }
        else {
            promise._setTrace(caller, void 0);
            setTimeout(afterDelay, ms, value, promise);
        }
        return promise;
    };

    Promise.prototype.delay = function Promise$delay(ms) {
        return Promise.delay(this, ms, this.delay);
    };

    Promise.prototype.timeout = function Promise$timeout(ms, message) {
        ms = +ms;

        var ret = new Promise(INTERNAL);
        ret._setTrace(this.timeout, this);

        if (this._isBound()) ret._setBoundTo(this._boundTo);
        if (this._cancellable()) {
            ret._setCancellable();
            ret._cancellationParent = this;
        }
        ret._follow(this);
        setTimeout(afterTimeout, ms, ret, message, ms);
        return ret;
    };

};

},{"./assert.js":2,"./errors.js":10,"./errors_api_rejection":11,"./global.js":16,"./util.js":39}],39:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
var global = require("./global.js");
var ASSERT = require("./assert.js");
var es5 = require("./es5.js");
var haveGetters = (function(){
    try {
        var o = {};
        es5.defineProperty(o, "f", {
            get: function () {
                return 3;
            }
        });
        return o.f === 3;
    }
    catch (e) {
        return false;
    }

})();

var canEvaluate = (function() {
    if (typeof window !== "undefined" && window !== null &&
        typeof window.document !== "undefined" &&
        typeof navigator !== "undefined" && navigator !== null &&
        typeof navigator.appName === "string" &&
        window === global) {
        return false;
    }
    return true;
})();

function deprecated(msg) {
    if (typeof console !== "undefined" && console !== null &&
        typeof console.warn === "function") {
        console.warn("Bluebird: " + msg);
    }
}

var errorObj = {e: {}};
function tryCatch1(fn, receiver, arg) {
    try {
        return fn.call(receiver, arg);
    }
    catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

function tryCatch2(fn, receiver, arg, arg2) {
    try {
        return fn.call(receiver, arg, arg2);
    }
    catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

function tryCatchApply(fn, args, receiver) {
    try {
        return fn.apply(receiver, args);
    }
    catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

var inherits = function(Child, Parent) {
    var hasProp = {}.hasOwnProperty;

    function T() {
        this.constructor = Child;
        this.constructor$ = Parent;
        for (var propertyName in Parent.prototype) {
            if (hasProp.call(Parent.prototype, propertyName) &&
                propertyName.charAt(propertyName.length-1) !== "$"
           ) {
                this[propertyName + "$"] = Parent.prototype[propertyName];
            }
        }
    }
    T.prototype = Parent.prototype;
    Child.prototype = new T();
    return Child.prototype;
};

function asString(val) {
    return typeof val === "string" ? val : ("" + val);
}

function isPrimitive(val) {
    return val == null || val === true || val === false ||
        typeof val === "string" || typeof val === "number";

}

function isObject(value) {
    return !isPrimitive(value);
}

function maybeWrapAsError(maybeError) {
    if (!isPrimitive(maybeError)) return maybeError;

    return new Error(asString(maybeError));
}

function withAppended(target, appendee) {
    var len = target.length;
    var ret = new Array(len + 1);
    var i;
    for (i = 0; i < len; ++i) {
        ret[i] = target[i];
    }
    ret[i] = appendee;
    return ret;
}


function notEnumerableProp(obj, name, value) {
    var descriptor = {
        value: value,
        configurable: true,
        enumerable: false,
        writable: true
    };
    es5.defineProperty(obj, name, descriptor);
    return obj;
}


var wrapsPrimitiveReceiver = (function() {
    return this !== "string";
}).call("string");

function thrower(r) {
    throw r;
}


var ret = {
    thrower: thrower,
    isArray: es5.isArray,
    haveGetters: haveGetters,
    notEnumerableProp: notEnumerableProp,
    isPrimitive: isPrimitive,
    isObject: isObject,
    canEvaluate: canEvaluate,
    deprecated: deprecated,
    errorObj: errorObj,
    tryCatch1: tryCatch1,
    tryCatch2: tryCatch2,
    tryCatchApply: tryCatchApply,
    inherits: inherits,
    withAppended: withAppended,
    asString: asString,
    maybeWrapAsError: maybeWrapAsError,
    wrapsPrimitiveReceiver: wrapsPrimitiveReceiver
};

module.exports = ret;

},{"./assert.js":2,"./es5.js":12,"./global.js":16}]},{},[4])
(4)
});
;

var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};var moduleOverrides={};for(var key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof require==="function";var ENVIRONMENT_IS_WEB=typeof window==="object";var ENVIRONMENT_IS_WORKER=typeof importScripts==="function";var ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;if(ENVIRONMENT_IS_NODE){if(!Module["print"])Module["print"]=function print(x){process["stdout"].write(x+"\n")};if(!Module["printErr"])Module["printErr"]=function printErr(x){process["stderr"].write(x+"\n")};var nodeFS=require("fs");var nodePath=require("path");Module["read"]=function read(filename,binary){filename=nodePath["normalize"](filename);var ret=nodeFS["readFileSync"](filename);if(!ret&&filename!=nodePath["resolve"](filename)){filename=path.join(__dirname,"..","src",filename);ret=nodeFS["readFileSync"](filename)}if(ret&&!binary)ret=ret.toString();return ret};Module["readBinary"]=function readBinary(filename){return Module["read"](filename,true)};Module["load"]=function load(f){globalEval(read(f))};if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}else{Module["thisProgram"]="unknown-program"}Module["arguments"]=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}process["on"]("uncaughtException",(function(ex){if(!(ex instanceof ExitStatus)){throw ex}}))}else if(ENVIRONMENT_IS_SHELL){if(!Module["print"])Module["print"]=print;if(typeof printErr!="undefined")Module["printErr"]=printErr;if(typeof read!="undefined"){Module["read"]=read}else{Module["read"]=function read(){throw"no read() available (jsc?)"}}Module["readBinary"]=function readBinary(f){if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}var data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}this["Module"]=Module}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){Module["read"]=function read(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof console!=="undefined"){if(!Module["print"])Module["print"]=function print(x){console.log(x)};if(!Module["printErr"])Module["printErr"]=function printErr(x){console.log(x)}}else{var TRY_USE_DUMP=false;if(!Module["print"])Module["print"]=TRY_USE_DUMP&&typeof dump!=="undefined"?(function(x){dump(x)}):(function(x){})}if(ENVIRONMENT_IS_WEB){window["Module"]=Module}else{Module["load"]=importScripts}}else{throw"Unknown runtime environment. Where are we?"}function globalEval(x){eval.call(null,x)}if(!Module["load"]&&Module["read"]){Module["load"]=function load(f){globalEval(Module["read"](f))}}if(!Module["print"]){Module["print"]=(function(){})}if(!Module["printErr"]){Module["printErr"]=Module["print"]}if(!Module["arguments"]){Module["arguments"]=[]}if(!Module["thisProgram"]){Module["thisProgram"]="./this.program"}Module.print=Module["print"];Module.printErr=Module["printErr"];Module["preRun"]=[];Module["postRun"]=[];for(var key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}var Runtime={setTempRet0:(function(value){tempRet0=value}),getTempRet0:(function(){return tempRet0}),stackSave:(function(){return STACKTOP}),stackRestore:(function(stackTop){STACKTOP=stackTop}),getNativeTypeSize:(function(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return Runtime.QUANTUM_SIZE}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8}else{return 0}}}}),getNativeFieldSize:(function(type){return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE)}),STACK_ALIGN:16,getAlignSize:(function(type,size,vararg){if(!vararg&&(type=="i64"||type=="double"))return 8;if(!type)return Math.min(size,8);return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE)}),dynCall:(function(sig,ptr,args){if(args&&args.length){if(!args.splice)args=Array.prototype.slice.call(args);args.splice(0,0,ptr);return Module["dynCall_"+sig].apply(null,args)}else{return Module["dynCall_"+sig].call(null,ptr)}}),functionPointers:[],addFunction:(function(func){for(var i=0;i<Runtime.functionPointers.length;i++){if(!Runtime.functionPointers[i]){Runtime.functionPointers[i]=func;return 2*(1+i)}}throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."}),removeFunction:(function(index){Runtime.functionPointers[(index-2)/2]=null}),getAsmConst:(function(code,numArgs){if(!Runtime.asmConstCache)Runtime.asmConstCache={};var func=Runtime.asmConstCache[code];if(func)return func;var args=[];for(var i=0;i<numArgs;i++){args.push(String.fromCharCode(36)+i)}var source=Pointer_stringify(code);if(source[0]==='"'){if(source.indexOf('"',1)===source.length-1){source=source.substr(1,source.length-2)}else{abort("invalid EM_ASM input |"+source+"|. Please use EM_ASM(..code..) (no quotes) or EM_ASM({ ..code($0).. }, input) (to input values)")}}try{var evalled=eval("(function(Module, FS) { return function("+args.join(",")+"){ "+source+" } })")(Module,typeof FS!=="undefined"?FS:null)}catch(e){Module.printErr("error in executing inline EM_ASM code: "+e+" on: \n\n"+source+"\n\nwith args |"+args+"| (make sure to use the right one out of EM_ASM, EM_ASM_ARGS, etc.)");throw e}return Runtime.asmConstCache[code]=evalled}),warnOnce:(function(text){if(!Runtime.warnOnce.shown)Runtime.warnOnce.shown={};if(!Runtime.warnOnce.shown[text]){Runtime.warnOnce.shown[text]=1;Module.printErr(text)}}),funcWrappers:{},getFuncWrapper:(function(func,sig){assert(sig);if(!Runtime.funcWrappers[sig]){Runtime.funcWrappers[sig]={}}var sigCache=Runtime.funcWrappers[sig];if(!sigCache[func]){sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func,arguments)}}return sigCache[func]}),UTF8Processor:(function(){var buffer=[];var needed=0;this.processCChar=(function(code){code=code&255;if(buffer.length==0){if((code&128)==0){return String.fromCharCode(code)}buffer.push(code);if((code&224)==192){needed=1}else if((code&240)==224){needed=2}else{needed=3}return""}if(needed){buffer.push(code);needed--;if(needed>0)return""}var c1=buffer[0];var c2=buffer[1];var c3=buffer[2];var c4=buffer[3];var ret;if(buffer.length==2){ret=String.fromCharCode((c1&31)<<6|c2&63)}else if(buffer.length==3){ret=String.fromCharCode((c1&15)<<12|(c2&63)<<6|c3&63)}else{var codePoint=(c1&7)<<18|(c2&63)<<12|(c3&63)<<6|c4&63;ret=String.fromCharCode(((codePoint-65536)/1024|0)+55296,(codePoint-65536)%1024+56320)}buffer.length=0;return ret});this.processJSString=function processJSString(string){string=unescape(encodeURIComponent(string));var ret=[];for(var i=0;i<string.length;i++){ret.push(string.charCodeAt(i))}return ret}}),getCompilerSetting:(function(name){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work"}),stackAlloc:(function(size){var ret=STACKTOP;STACKTOP=STACKTOP+size|0;STACKTOP=STACKTOP+15&-16;return ret}),staticAlloc:(function(size){var ret=STATICTOP;STATICTOP=STATICTOP+size|0;STATICTOP=STATICTOP+15&-16;return ret}),dynamicAlloc:(function(size){var ret=DYNAMICTOP;DYNAMICTOP=DYNAMICTOP+size|0;DYNAMICTOP=DYNAMICTOP+15&-16;if(DYNAMICTOP>=TOTAL_MEMORY)enlargeMemory();return ret}),alignMemory:(function(size,quantum){var ret=size=Math.ceil(size/(quantum?quantum:16))*(quantum?quantum:16);return ret}),makeBigInt:(function(low,high,unsigned){var ret=unsigned?+(low>>>0)+ +(high>>>0)*+4294967296:+(low>>>0)+ +(high|0)*+4294967296;return ret}),GLOBAL_BASE:8,QUANTUM_SIZE:4,__dummy__:0};Module["Runtime"]=Runtime;var __THREW__=0;var ABORT=false;var EXITSTATUS=0;var undef=0;var tempValue,tempInt,tempBigInt,tempInt2,tempBigInt2,tempPair,tempBigIntI,tempBigIntR,tempBigIntS,tempBigIntP,tempBigIntD,tempDouble,tempFloat;var tempI64,tempI64b;var tempRet0,tempRet1,tempRet2,tempRet3,tempRet4,tempRet5,tempRet6,tempRet7,tempRet8,tempRet9;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}var globalScope=this;function getCFunc(ident){var func=Module["_"+ident];if(!func){try{func=eval("_"+ident)}catch(e){}}assert(func,"Cannot call unknown function "+ident+" (perhaps LLVM optimizations or closure removed it?)");return func}var cwrap,ccall;((function(){var stack=0;var JSfuncs={"stackSave":(function(){stack=Runtime.stackSave()}),"stackRestore":(function(){Runtime.stackRestore(stack)}),"arrayToC":(function(arr){var ret=Runtime.stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}),"stringToC":(function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){ret=Runtime.stackAlloc((str.length<<2)+1);writeStringToMemory(str,ret)}return ret})};var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};ccall=function ccallFunc(ident,returnType,argTypes,args){var func=getCFunc(ident);var cArgs=[];if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=Runtime.stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);if(returnType==="string")ret=Pointer_stringify(ret);if(stack!==0)JSfuncs["stackRestore"]();return ret};var sourceRegex=/^function\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;function parseJSFunc(jsfunc){var parsed=jsfunc.toString().match(sourceRegex).slice(1);return{arguments:parsed[0],body:parsed[1],returnValue:parsed[2]}}var JSsource={};for(var fun in JSfuncs){if(JSfuncs.hasOwnProperty(fun)){JSsource[fun]=parseJSFunc(JSfuncs[fun])}}cwrap=function cwrap(ident,returnType,argTypes){argTypes=argTypes||[];var cfunc=getCFunc(ident);var numericArgs=argTypes.every((function(type){return type==="number"}));var numericRet=returnType!=="string";if(numericRet&&numericArgs){return cfunc}var argNames=argTypes.map((function(x,i){return"$"+i}));var funcstr="(function("+argNames.join(",")+") {";var nargs=argTypes.length;if(!numericArgs){funcstr+=JSsource["stackSave"].body+";";for(var i=0;i<nargs;i++){var arg=argNames[i],type=argTypes[i];if(type==="number")continue;var convertCode=JSsource[type+"ToC"];funcstr+="var "+convertCode.arguments+" = "+arg+";";funcstr+=convertCode.body+";";funcstr+=arg+"="+convertCode.returnValue+";"}}var cfuncname=parseJSFunc((function(){return cfunc})).returnValue;funcstr+="var ret = "+cfuncname+"("+argNames.join(",")+");";if(!numericRet){var strgfy=parseJSFunc((function(){return Pointer_stringify})).returnValue;funcstr+="ret = "+strgfy+"(ret);"}if(!numericArgs){funcstr+=JSsource["stackRestore"].body+";"}funcstr+="return ret})";return eval(funcstr)}}))();Module["cwrap"]=cwrap;Module["ccall"]=ccall;function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}Module["setValue"]=setValue;function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for setValue: "+type)}return null}Module["getValue"]=getValue;var ALLOC_NORMAL=0;var ALLOC_STACK=1;var ALLOC_STATIC=2;var ALLOC_DYNAMIC=3;var ALLOC_NONE=4;Module["ALLOC_NORMAL"]=ALLOC_NORMAL;Module["ALLOC_STACK"]=ALLOC_STACK;Module["ALLOC_STATIC"]=ALLOC_STATIC;Module["ALLOC_DYNAMIC"]=ALLOC_DYNAMIC;Module["ALLOC_NONE"]=ALLOC_NONE;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab}else{zeroinit=false;size=slab.length}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr}else{ret=[_malloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length))}if(zeroinit){var ptr=ret,stop;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0}return ret}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret)}else{HEAPU8.set(new Uint8Array(slab),ret)}return ret}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];if(typeof curr==="function"){curr=Runtime.getFunctionIndex(curr)}type=singleType||types[i];if(type===0){i++;continue}if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=Runtime.getNativeTypeSize(type);previousType=type}i+=typeSize}return ret}Module["allocate"]=allocate;function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=false;var t;var i=0;while(1){t=HEAPU8[ptr+i>>0];if(t>=128)hasUtf=true;else if(t==0&&!length)break;i++;if(length&&i==length)break}if(!length)length=i;var ret="";if(!hasUtf){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK}return ret}var utf8=new Runtime.UTF8Processor;for(i=0;i<length;i++){t=HEAPU8[ptr+i>>0];ret+=utf8.processCChar(t)}return ret}Module["Pointer_stringify"]=Pointer_stringify;function UTF16ToString(ptr){var i=0;var str="";while(1){var codeUnit=HEAP16[ptr+i*2>>1];if(codeUnit==0)return str;++i;str+=String.fromCharCode(codeUnit)}}Module["UTF16ToString"]=UTF16ToString;function stringToUTF16(str,outPtr){for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);HEAP16[outPtr+i*2>>1]=codeUnit}HEAP16[outPtr+str.length*2>>1]=0}Module["stringToUTF16"]=stringToUTF16;function UTF32ToString(ptr){var i=0;var str="";while(1){var utf32=HEAP32[ptr+i*4>>2];if(utf32==0)return str;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}else{str+=String.fromCharCode(utf32)}}}Module["UTF32ToString"]=UTF32ToString;function stringToUTF32(str,outPtr){var iChar=0;for(var iCodeUnit=0;iCodeUnit<str.length;++iCodeUnit){var codeUnit=str.charCodeAt(iCodeUnit);if(codeUnit>=55296&&codeUnit<=57343){var trailSurrogate=str.charCodeAt(++iCodeUnit);codeUnit=65536+((codeUnit&1023)<<10)|trailSurrogate&1023}HEAP32[outPtr+iChar*4>>2]=codeUnit;++iChar}HEAP32[outPtr+iChar*4>>2]=0}Module["stringToUTF32"]=stringToUTF32;function demangle(func){var hasLibcxxabi=!!Module["___cxa_demangle"];if(hasLibcxxabi){try{var buf=_malloc(func.length);writeStringToMemory(func.substr(1),buf);var status=_malloc(4);var ret=Module["___cxa_demangle"](buf,0,0,status);if(getValue(status,"i32")===0&&ret){return Pointer_stringify(ret)}}catch(e){}finally{if(buf)_free(buf);if(status)_free(status);if(ret)_free(ret)}}var i=3;var basicTypes={"v":"void","b":"bool","c":"char","s":"short","i":"int","l":"long","f":"float","d":"double","w":"wchar_t","a":"signed char","h":"unsigned char","t":"unsigned short","j":"unsigned int","m":"unsigned long","x":"long long","y":"unsigned long long","z":"..."};var subs=[];var first=true;function dump(x){if(x)Module.print(x);Module.print(func);var pre="";for(var a=0;a<i;a++)pre+=" ";Module.print(pre+"^")}function parseNested(){i++;if(func[i]==="K")i++;var parts=[];while(func[i]!=="E"){if(func[i]==="S"){i++;var next=func.indexOf("_",i);var num=func.substring(i,next)||0;parts.push(subs[num]||"?");i=next+1;continue}if(func[i]==="C"){parts.push(parts[parts.length-1]);i+=2;continue}var size=parseInt(func.substr(i));var pre=size.toString().length;if(!size||!pre){i--;break}var curr=func.substr(i+pre,size);parts.push(curr);subs.push(curr);i+=pre+size}i++;return parts}function parse(rawList,limit,allowVoid){limit=limit||Infinity;var ret="",list=[];function flushList(){return"("+list.join(", ")+")"}var name;if(func[i]==="N"){name=parseNested().join("::");limit--;if(limit===0)return rawList?[name]:name}else{if(func[i]==="K"||first&&func[i]==="L")i++;var size=parseInt(func.substr(i));if(size){var pre=size.toString().length;name=func.substr(i+pre,size);i+=pre+size}}first=false;if(func[i]==="I"){i++;var iList=parse(true);var iRet=parse(true,1,true);ret+=iRet[0]+" "+name+"<"+iList.join(", ")+">"}else{ret=name}paramLoop:while(i<func.length&&limit-->0){var c=func[i++];if(c in basicTypes){list.push(basicTypes[c])}else{switch(c){case"P":list.push(parse(true,1,true)[0]+"*");break;case"R":list.push(parse(true,1,true)[0]+"&");break;case"L":{i++;var end=func.indexOf("E",i);var size=end-i;list.push(func.substr(i,size));i+=size+2;break};case"A":{var size=parseInt(func.substr(i));i+=size.toString().length;if(func[i]!=="_")throw"?";i++;list.push(parse(true,1,true)[0]+" ["+size+"]");break};case"E":break paramLoop;default:ret+="?"+c;break paramLoop}}}if(!allowVoid&&list.length===1&&list[0]==="void")list=[];if(rawList){if(ret){list.push(ret+"?")}return list}else{return ret+flushList()}}var final=func;try{if(func=="Object._main"||func=="_main"){return"main()"}if(typeof func==="number")func=Pointer_stringify(func);if(func[0]!=="_")return func;if(func[1]!=="_")return func;if(func[2]!=="Z")return func;switch(func[3]){case"n":return"operator new()";case"d":return"operator delete()"}final=parse()}catch(e){final+="?"}if(final.indexOf("?")>=0&&!hasLibcxxabi){Runtime.warnOnce("warning: a problem occurred in builtin C++ name demangling; build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling")}return final}function demangleAll(text){return text.replace(/__Z[\w\d_]+/g,(function(x){var y=demangle(x);return x===y?x:x+" ["+y+"]"}))}function jsStackTrace(){var err=new Error;if(!err.stack){try{throw new Error(0)}catch(e){err=e}if(!err.stack){return"(no stack trace available)"}}return err.stack.toString()}function stackTrace(){return demangleAll(jsStackTrace())}Module["stackTrace"]=stackTrace;var PAGE_SIZE=4096;function alignMemoryPage(x){return x+4095&-4096}var HEAP;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;var STATIC_BASE=0,STATICTOP=0,staticSealed=false;var STACK_BASE=0,STACKTOP=0,STACK_MAX=0;var DYNAMIC_BASE=0,DYNAMICTOP=0;function enlargeMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value "+TOTAL_MEMORY+", (2) compile with ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.")}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||117440512;var FAST_MEMORY=Module["FAST_MEMORY"]||2097152;var totalMemory=64*1024;while(totalMemory<TOTAL_MEMORY||totalMemory<2*TOTAL_STACK){if(totalMemory<16*1024*1024){totalMemory*=2}else{totalMemory+=16*1024*1024}}if(totalMemory!==TOTAL_MEMORY){Module.printErr("increasing TOTAL_MEMORY to "+totalMemory+" to be compliant with the asm.js spec");TOTAL_MEMORY=totalMemory}assert(typeof Int32Array!=="undefined"&&typeof Float64Array!=="undefined"&&!!(new Int32Array(1))["subarray"]&&!!(new Int32Array(1))["set"],"JS engine does not provide full typed array support");var buffer=new ArrayBuffer(TOTAL_MEMORY);HEAP8=new Int8Array(buffer);HEAP16=new Int16Array(buffer);HEAP32=new Int32Array(buffer);HEAPU8=new Uint8Array(buffer);HEAPU16=new Uint16Array(buffer);HEAPU32=new Uint32Array(buffer);HEAPF32=new Float32Array(buffer);HEAPF64=new Float64Array(buffer);HEAP32[0]=255;assert(HEAPU8[0]===255&&HEAPU8[3]===0,"Typed arrays 2 must be run on a little-endian system");Module["HEAP"]=HEAP;Module["buffer"]=buffer;Module["HEAP8"]=HEAP8;Module["HEAP16"]=HEAP16;Module["HEAP32"]=HEAP32;Module["HEAPU8"]=HEAPU8;Module["HEAPU16"]=HEAPU16;Module["HEAPU32"]=HEAPU32;Module["HEAPF32"]=HEAPF32;Module["HEAPF64"]=HEAPF64;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Runtime.dynCall("v",func)}else{Runtime.dynCall("vi",func,[callback.arg])}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}Module["addOnPreRun"]=Module.addOnPreRun=addOnPreRun;function addOnInit(cb){__ATINIT__.unshift(cb)}Module["addOnInit"]=Module.addOnInit=addOnInit;function addOnPreMain(cb){__ATMAIN__.unshift(cb)}Module["addOnPreMain"]=Module.addOnPreMain=addOnPreMain;function addOnExit(cb){__ATEXIT__.unshift(cb)}Module["addOnExit"]=Module.addOnExit=addOnExit;function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}Module["addOnPostRun"]=Module.addOnPostRun=addOnPostRun;function intArrayFromString(stringy,dontAddNull,length){var ret=(new Runtime.UTF8Processor).processJSString(stringy);if(length){ret.length=length}if(!dontAddNull){ret.push(0)}return ret}Module["intArrayFromString"]=intArrayFromString;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}Module["intArrayToString"]=intArrayToString;function writeStringToMemory(string,buffer,dontAddNull){var array=intArrayFromString(string,dontAddNull);var i=0;while(i<array.length){var chr=array[i];HEAP8[buffer+i>>0]=chr;i=i+1}}Module["writeStringToMemory"]=writeStringToMemory;function writeArrayToMemory(array,buffer){for(var i=0;i<array.length;i++){HEAP8[buffer+i>>0]=array[i]}}Module["writeArrayToMemory"]=writeArrayToMemory;function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;i++){HEAP8[buffer+i>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer+str.length>>0]=0}Module["writeAsciiToMemory"]=writeAsciiToMemory;function unSign(value,bits,ignore){if(value>=0){return value}return bits<=32?2*Math.abs(1<<bits-1)+value:Math.pow(2,bits)+value}function reSign(value,bits,ignore){if(value<=0){return value}var half=bits<=32?Math.abs(1<<bits-1):Math.pow(2,bits-1);if(value>=half&&(bits<=32||value>half)){value=-2*half+value}return value}if(!Math["imul"]||Math["imul"](4294967295,5)!==-5)Math["imul"]=function imul(a,b){var ah=a>>>16;var al=a&65535;var bh=b>>>16;var bl=b&65535;return al*bl+(ah*bl+al*bh<<16)|0};Math.imul=Math["imul"];var Math_abs=Math.abs;var Math_cos=Math.cos;var Math_sin=Math.sin;var Math_tan=Math.tan;var Math_acos=Math.acos;var Math_asin=Math.asin;var Math_atan=Math.atan;var Math_atan2=Math.atan2;var Math_exp=Math.exp;var Math_log=Math.log;var Math_sqrt=Math.sqrt;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_pow=Math.pow;var Math_imul=Math.imul;var Math_fround=Math.fround;var Math_min=Math.min;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}Module["addRunDependency"]=addRunDependency;function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["removeRunDependency"]=removeRunDependency;Module["preloadedImages"]={};Module["preloadedAudios"]={};var memoryInitializer=null;STATIC_BASE=8;STATICTOP=STATIC_BASE+30128;__ATINIT__.push({func:(function(){__GLOBAL__I_a()})},{func:(function(){__GLOBAL__I_a64()})},{func:(function(){__GLOBAL__I_a117()})});allocate([76,65,83,90,105,112,0,0,111,112,101,110,0,0,0,0,103,101,116,80,111,105,110,116,0,0,0,0,0,0,0,0,103,101,116,67,111,117,110,116,0,0,0,0,0,0,0,0,68,121,110,97,109,105,99,76,65,83,90,105,112,0,0,0,97,100,100,70,105,101,108,100,70,108,111,97,116,105,110,103,0,0,0,0,0,0,0,0,97,100,100,70,105,101,108,100,83,105,103,110,101,100,0,0,97,100,100,70,105,101,108,100,85,110,115,105,103,110,101,100,0,0,0,0,0,0,0,0,118,105,105,105,0,0,0,0,64,110,0,0,208,0,0,0,176,110,0,0,0,0,0,0,80,49,51,68,121,110,97,109,105,99,76,65,83,90,105,112,0,0,0,0,0,0,0,0,49,51,68,121,110,97,109,105,99,76,65,83,90,105,112,0,160,109,0,0,184,0,0,0,200,109,0,0,160,0,0,0,0,0,0,0,200,0,0,0,118,105,105,105,0,0,0,0,64,110,0,0,208,0,0,0,192,110,0,0,0,0,0,0,118,105,105,105,105,0,0,0,64,110,0,0,208,0,0,0,192,110,0,0,192,110,0,0,105,105,0,0,0,0,0,0,208,0,0,0,0,0,0,0,118,105,0,0,0,0,0,0,105,105,0,0,0,0,0,0,80,75,49,51,68,121,110,97,109,105,99,76,65,83,90,105,112,0,0,0,0,0,0,0,200,109,0,0,48,1,0,0,1,0,0,0,200,0,0,0,105,105,105,0,0,0,0,0,192,110,0,0,136,1,0,0,80,54,76,65,83,90,105,112,0,0,0,0,0,0,0,0,54,76,65,83,90,105,112,0,160,109,0,0,120,1,0,0,200,109,0,0,104,1,0,0,0,0,0,0,128,1,0,0,118,105,105,105,0,0,0,0,64,110,0,0,136,1,0,0,176,110,0,0,0,0,0,0,118,105,105,105,105,0,0,0,64,110,0,0,136,1,0,0,192,110,0,0,192,110,0,0,105,105,0,0,0,0,0,0,136,1,0,0,0,0,0,0,118,105,0,0,0,0,0,0,105,105,0,0,0,0,0,0,80,75,54,76,65,83,90,105,112,0,0,0,0,0,0,0,200,109,0,0,232,1,0,0,1,0,0,0,128,1,0,0,0,0,0,0,216,2,0,0,1,0,0,0,2,0,0,0,1,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,48,95,53,102,105,101,108,100,73,106,78,83,48,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,106,69,69,69,69,69,69,0,0,0,0,0,0,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,49,48,98,97,115,101,95,102,105,101,108,100,69,0,0,0,160,109,0,0,176,2,0,0,8,111,0,0,40,2,0,0,208,2,0,0,0,0,0,0,73,110,118,97,108,105,100,32,110,117,109,98,101,114,32,111,102,32,115,121,109,98,111,108,115,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,3,0,0,0,4,0,0,0,5,0,0,0,1,0,0,0,6,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,50,95,53,102,105,101,108,100,73,106,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,106,69,69,69,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,67,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,67,95,69,69,69,69,0,0,0,0,0,0,0,0,8,111,0,0,40,3,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,50,95,53,102,105,101,108,100,73,106,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,106,69,69,69,69,69,69,69,69,0,0,0,0,0,0,0,88,5,0,0,7,0,0,0,8,0,0,0,2,0,0,0,1,0,0,0,3,0,0,0,0,0,0,0,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,48,95,53,102,105,101,108,100,73,116,78,83,48,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,116,69,69,69,69,69,69,0,0,0,0,0,0,8,111,0,0,208,4,0,0,208,2,0,0,0,0,0,0,0,0,0,0,96,6,0,0,9,0,0,0,10,0,0,0,11,0,0,0,2,0,0,0,12,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,50,95,53,102,105,101,108,100,73,116,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,116,69,69,69,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,67,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,67,95,69,69,69,69,0,0,0,0,0,0,0,0,8,111,0,0,136,5,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,50,95,53,102,105,101,108,100,73,116,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,116,69,69,69,69,69,69,69,69,0,0,0,0,0,0,0,184,7,0,0,13,0,0,0,14,0,0,0,3,0,0,0,1,0,0,0,4,0,0,0,0,0,0,0,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,48,95,53,102,105,101,108,100,73,104,78,83,48,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,104,69,69,69,69,69,69,0,0,0,0,0,0,8,111,0,0,48,7,0,0,208,2,0,0,0,0,0,0,0,0,0,0,192,8,0,0,15,0,0,0,16,0,0,0,17,0,0,0,3,0,0,0,18,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,50,95,53,102,105,101,108,100,73,104,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,104,69,69,69,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,67,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,67,95,69,69,69,69,0,0,0,0,0,0,0,0,8,111,0,0,232,7,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,50,95,53,102,105,101,108,100,73,104,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,104,69,69,69,69,69,69,69,69,0,0,0,0,0,0,0,24,10,0,0,19,0,0,0,20,0,0,0,4,0,0,0,1,0,0,0,5,0,0,0,0,0,0,0,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,48,95,53,102,105,101,108,100,73,105,78,83,48,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,105,69,69,69,69,69,69,0,0,0,0,0,0,8,111,0,0,144,9,0,0,208,2,0,0,0,0,0,0,0,0,0,0,32,11,0,0,21,0,0,0,22,0,0,0,23,0,0,0,4,0,0,0,24,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,50,95,53,102,105,101,108,100,73,105,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,105,69,69,69,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,67,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,67,95,69,69,69,69,0,0,0,0,0,0,0,0,8,111,0,0,72,10,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,50,95,53,102,105,101,108,100,73,105,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,105,69,69,69,69,69,69,69,69,0,0,0,0,0,0,0,120,12,0,0,25,0,0,0,26,0,0,0,5,0,0,0,1,0,0,0,6,0,0,0,0,0,0,0,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,48,95,53,102,105,101,108,100,73,115,78,83,48,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,115,69,69,69,69,69,69,0,0,0,0,0,0,8,111,0,0,240,11,0,0,208,2,0,0,0,0,0,0,0,0,0,0,128,13,0,0,27,0,0,0,28,0,0,0,29,0,0,0,5,0,0,0,30,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,50,95,53,102,105,101,108,100,73,115,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,115,69,69,69,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,67,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,67,95,69,69,69,69,0,0,0,0,0,0,0,0,8,111,0,0,168,12,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,50,95,53,102,105,101,108,100,73,115,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,115,69,69,69,69,69,69,69,69,0,0,0,0,0,0,0,216,14,0,0,31,0,0,0,32,0,0,0,6,0,0,0,1,0,0,0,7,0,0,0,0,0,0,0,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,48,95,53,102,105,101,108,100,73,97,78,83,48,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,97,69,69,69,69,69,69,0,0,0,0,0,0,8,111,0,0,80,14,0,0,208,2,0,0,0,0,0,0,0,0,0,0,224,15,0,0,33,0,0,0,34,0,0,0,35,0,0,0,6,0,0,0,36,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,50,95,53,102,105,101,108,100,73,97,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,97,69,69,69,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,67,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,67,95,69,69,69,69,0,0,0,0,0,0,0,0,8,111,0,0,8,15,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,95,102,105,101,108,100,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,50,95,53,102,105,101,108,100,73,97,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,97,69,69,69,69,69,69,69,69,0,0,0,0,0,0,0,48,17,0,0,8,0,0,0,37,0,0,0,38,0,0,0,0,0,0,0,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,102,105,101,108,100,95,100,101,99,111,109,112,114,101,115,115,111,114,73,78,83,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,69,69,0,0,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,48,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,69,0,160,109,0,0,0,17,0,0,8,111,0,0,168,16,0,0,40,17,0,0,0,0,0,0,0,0,0,0,8,18,0,0,39,0,0,0,40,0,0,0,41,0,0,0,7,0,0,0,42,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,102,105,101,108,100,95,100,101,99,111,109,112,114,101,115,115,111,114,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,56,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,56,95,69,69,69,69,0,0,0,0,8,111,0,0,96,17,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,54,100,121,110,97,109,105,99,95,102,105,101,108,100,95,100,101,99,111,109,112,114,101,115,115,111,114,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,69,69,69,69,0,0,0,0,0,0,0,0,0,0,0,48,19,0,0,43,0,0,0,44,0,0,0,45,0,0,0,8,0,0,0,46,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,54,108,97,115,122,105,112,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,53,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,53,95,69,69,69,69,0,0,0,0,0,0,0,8,111,0,0,176,18,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,54,108,97,115,122,105,112,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,69,69,0,0,0,0,0,0,8,20,0,0,47,0,0,0,48,0,0,0,49,0,0,0,9,0,0,0,50,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,49,48,98,117,102,95,115,116,114,101,97,109,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,49,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,49,95,69,69,69,69,0,0,0,0,0,0,0,8,111,0,0,168,19,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,49,48,98,117,102,95,115,116,114,101,97,109,69,69,0,0,118,50,116,54,115,50,48,0,118,50,116,54,115,50,48,118,50,116,55,115,56,0,0,0,118,50,116,54,115,50,48,118,50,116,56,115,54,0,0,0,118,50,116,54,115,50,48,118,50,116,55,115,56,118,50,116,56,115,54,0,0,0,0,0,78,54,108,97,115,122,105,112,49,57,117,110,107,110,111,119,110,95,115,99,104,101,109,97,95,116,121,112,101,69,0,0,8,111,0,0,128,20,0,0,72,108,0,0,0,0,0,0,84,104,101,32,76,65,90,32,115,99,104,101,109,97,32,105,115,32,110,111,116,32,114,101,99,111,103,110,105,122,101,100,0,0,0,0,0,0,0,0,0,0,0,0,160,20,0,0,51,0,0,0,52,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,32,22,0,0,9,0,0,0,53,0,0,0,54,0,0,0,0,0,0,0,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,49,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,49,73,78,83,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,78,83,95,50,105,111,49,56,95,95,105,102,115,116,114,101,97,109,95,119,114,97,112,112,101,114,73,78,83,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,69,69,78,83,48,95,49,57,114,101,99,111,114,100,95,100,101,99,111,109,112,114,101,115,115,111,114,73,74,78,83,48,95,53,102,105,101,108,100,73,78,83,48,95,51,108,97,115,55,112,111,105,110,116,49,48,69,78,83,48,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,83,68,95,69,69,69,69,78,83,66,95,73,78,83,67,95,55,103,112,115,116,105,109,101,69,78,83,69,95,73,83,72,95,69,69,69,69,78,83,66,95,73,78,83,67,95,51,114,103,98,69,78,83,69,95,73,83,75,95,69,69,69,69,69,69,69,69,69,0,0,0,0,0,0,0,8,111,0,0,8,21,0,0,40,17,0,0,0,0,0,0,78,54,108,97,115,122,105,112,49,49,101,110,100,95,111,102,95,102,105,108,101,69,0,0,8,111,0,0,48,22,0,0,72,108,0,0,0,0,0,0,82,101,97,99,104,101,100,32,69,110,100,32,111,102,32,102,105,108,101,0,0,0,0,0,0,0,0,0,72,22,0,0,55,0,0,0,56,0,0,0,7,0,0,0,0,0,0,0,15,14,13,12,11,10,9,8,14,0,1,3,6,10,10,9,13,1,2,4,7,11,11,10,12,3,4,5,8,12,12,11,11,6,7,8,9,13,13,12,10,10,11,12,13,14,14,13,9,10,11,12,13,14,15,14,8,9,10,11,12,13,14,15,0,1,2,3,4,5,6,7,1,0,1,2,3,4,5,6,2,1,0,1,2,3,4,5,3,2,1,0,1,2,3,4,4,3,2,1,0,1,2,3,5,4,3,2,1,0,1,2,6,5,4,3,2,1,0,1,7,6,5,4,3,2,1,0,0,0,0,0,144,24,0,0,57,0,0,0,58,0,0,0,59,0,0,0,10,0,0,0,60,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,49,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,49,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,78,83,49,95,50,105,111,49,56,95,95,105,102,115,116,114,101,97,109,95,119,114,97,112,112,101,114,73,78,83,49,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,69,69,78,83,50,95,49,57,114,101,99,111,114,100,95,100,101,99,111,109,112,114,101,115,115,111,114,73,74,78,83,50,95,53,102,105,101,108,100,73,78,83,50,95,51,108,97,115,55,112,111,105,110,116,49,48,69,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,83,70,95,69,69,69,69,78,83,68,95,73,78,83,69,95,55,103,112,115,116,105,109,101,69,78,83,71,95,73,83,74,95,69,69,69,69,78,83,68,95,73,78,83,69,95,51,114,103,98,69,78,83,71,95,73,83,77,95,69,69,69,69,69,69,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,81,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,81,95,69,69,69,69,0,0,0,0,0,0,0,8,111,0,0,40,23,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,49,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,49,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,78,83,49,95,50,105,111,49,56,95,95,105,102,115,116,114,101,97,109,95,119,114,97,112,112,101,114,73,78,83,49,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,69,69,78,83,50,95,49,57,114,101,99,111,114,100,95,100,101,99,111,109,112,114,101,115,115,111,114,73,74,78,83,50,95,53,102,105,101,108,100,73,78,83,50,95,51,108,97,115,55,112,111,105,110,116,49,48,69,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,83,70,95,69,69,69,69,78,83,68,95,73,78,83,69,95,55,103,112,115,116,105,109,101,69,78,83,71,95,73,83,74,95,69,69,69,69,78,83,68,95,73,78,83,69,95,51,114,103,98,69,78,83,71,95,73,83,77,95,69,69,69,69,69,69,69,69,69,69,69,0,0,0,0,0,0,224,26,0,0,10,0,0,0,61,0,0,0,62,0,0,0,0,0,0,0,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,49,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,49,73,78,83,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,78,83,95,50,105,111,49,56,95,95,105,102,115,116,114,101,97,109,95,119,114,97,112,112,101,114,73,78,83,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,69,69,78,83,48,95,49,57,114,101,99,111,114,100,95,100,101,99,111,109,112,114,101,115,115,111,114,73,74,78,83,48,95,53,102,105,101,108,100,73,78,83,48,95,51,108,97,115,55,112,111,105,110,116,49,48,69,78,83,48,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,83,68,95,69,69,69,69,78,83,66,95,73,78,83,67,95,51,114,103,98,69,78,83,69,95,73,83,72,95,69,69,69,69,69,69,69,69,69,0,0,0,0,0,8,111,0,0,232,25,0,0,40,17,0,0,0,0,0,0,0,0,0,0,88,28,0,0,63,0,0,0,64,0,0,0,65,0,0,0,11,0,0,0,66,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,49,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,49,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,78,83,49,95,50,105,111,49,56,95,95,105,102,115,116,114,101,97,109,95,119,114,97,112,112,101,114,73,78,83,49,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,69,69,78,83,50,95,49,57,114,101,99,111,114,100,95,100,101,99,111,109,112,114,101,115,115,111,114,73,74,78,83,50,95,53,102,105,101,108,100,73,78,83,50,95,51,108,97,115,55,112,111,105,110,116,49,48,69,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,83,70,95,69,69,69,69,78,83,68,95,73,78,83,69,95,51,114,103,98,69,78,83,71,95,73,83,74,95,69,69,69,69,69,69,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,78,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,78,95,69,69,69,69,0,0,0,0,0,8,111,0,0,16,27,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,49,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,49,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,78,83,49,95,50,105,111,49,56,95,95,105,102,115,116,114,101,97,109,95,119,114,97,112,112,101,114,73,78,83,49,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,69,69,78,83,50,95,49,57,114,101,99,111,114,100,95,100,101,99,111,109,112,114,101,115,115,111,114,73,74,78,83,50,95,53,102,105,101,108,100,73,78,83,50,95,51,108,97,115,55,112,111,105,110,116,49,48,69,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,83,70,95,69,69,69,69,78,83,68,95,73,78,83,69,95,51,114,103,98,69,78,83,71,95,73,83,74,95,69,69,69,69,69,69,69,69,69,69,69,0,0,0,0,0,0,0,0,0,0,0,0,144,30,0,0,11,0,0,0,67,0,0,0,68,0,0,0,0,0,0,0,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,49,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,49,73,78,83,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,78,83,95,50,105,111,49,56,95,95,105,102,115,116,114,101,97,109,95,119,114,97,112,112,101,114,73,78,83,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,69,69,78,83,48,95,49,57,114,101,99,111,114,100,95,100,101,99,111,109,112,114,101,115,115,111,114,73,74,78,83,48,95,53,102,105,101,108,100,73,78,83,48,95,51,108,97,115,55,112,111,105,110,116,49,48,69,78,83,48,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,83,68,95,69,69,69,69,78,83,66,95,73,78,83,67,95,55,103,112,115,116,105,109,101,69,78,83,69,95,73,83,72,95,69,69,69,69,69,69,69,69,69,0,8,111,0,0,152,29,0,0,40,17,0,0,0,0,0,0,0,0,0,0,8,32,0,0,69,0,0,0,70,0,0,0,71,0,0,0,12,0,0,0,72,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,49,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,49,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,78,83,49,95,50,105,111,49,56,95,95,105,102,115,116,114,101,97,109,95,119,114,97,112,112,101,114,73,78,83,49,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,69,69,78,83,50,95,49,57,114,101,99,111,114,100,95,100,101,99,111,109,112,114,101,115,115,111,114,73,74,78,83,50,95,53,102,105,101,108,100,73,78,83,50,95,51,108,97,115,55,112,111,105,110,116,49,48,69,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,83,70,95,69,69,69,69,78,83,68,95,73,78,83,69,95,55,103,112,115,116,105,109,101,69,78,83,71,95,73,83,74,95,69,69,69,69,69,69,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,78,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,78,95,69,69,69,69,0,8,111,0,0,192,30,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,49,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,49,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,78,83,49,95,50,105,111,49,56,95,95,105,102,115,116,114,101,97,109,95,119,114,97,112,112,101,114,73,78,83,49,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,69,69,78,83,50,95,49,57,114,101,99,111,114,100,95,100,101,99,111,109,112,114,101,115,115,111,114,73,74,78,83,50,95,53,102,105,101,108,100,73,78,83,50,95,51,108,97,115,55,112,111,105,110,116,49,48,69,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,83,70,95,69,69,69,69,78,83,68,95,73,78,83,69,95,55,103,112,115,116,105,109,101,69,78,83,71,95,73,83,74,95,69,69,69,69,69,69,69,69,69,69,69,0,0,0,0,0,0,0,0,40,34,0,0,12,0,0,0,73,0,0,0,74,0,0,0,0,0,0,0,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,49,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,49,73,78,83,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,78,83,95,50,105,111,49,56,95,95,105,102,115,116,114,101,97,109,95,119,114,97,112,112,101,114,73,78,83,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,69,69,78,83,48,95,49,57,114,101,99,111,114,100,95,100,101,99,111,109,112,114,101,115,115,111,114,73,74,78,83,48,95,53,102,105,101,108,100,73,78,83,48,95,51,108,97,115,55,112,111,105,110,116,49,48,69,78,83,48,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,83,68,95,69,69,69,69,69,69,69,69,69,0,0,0,0,0,0,0,8,111,0,0,72,33,0,0,40,17,0,0,0,0,0,0,0,0,0,0,136,35,0,0,75,0,0,0,76,0,0,0,77,0,0,0,13,0,0,0,78,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,49,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,49,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,78,83,49,95,50,105,111,49,56,95,95,105,102,115,116,114,101,97,109,95,119,114,97,112,112,101,114,73,78,83,49,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,69,69,78,83,50,95,49,57,114,101,99,111,114,100,95,100,101,99,111,109,112,114,101,115,115,111,114,73,74,78,83,50,95,53,102,105,101,108,100,73,78,83,50,95,51,108,97,115,55,112,111,105,110,116,49,48,69,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,83,70,95,69,69,69,69,69,69,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,75,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,75,95,69,69,69,69,0,0,0,0,0,0,0,8,111,0,0,88,34,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,54,108,97,115,122,105,112,55,102,111,114,109,97,116,115,50,49,100,121,110,97,109,105,99,95,100,101,99,111,109,112,114,101,115,115,111,114,49,73,78,83,49,95,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,78,83,49,95,50,105,111,49,56,95,95,105,102,115,116,114,101,97,109,95,119,114,97,112,112,101,114,73,78,83,49,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,69,69,78,83,50,95,49,57,114,101,99,111,114,100,95,100,101,99,111,109,112,114,101,115,115,111,114,73,74,78,83,50,95,53,102,105,101,108,100,73,78,83,50,95,51,108,97,115,55,112,111,105,110,116,49,48,69,78,83,50,95,50,48,115,116,97,110,100,97,114,100,95,100,105,102,102,95,109,101,116,104,111,100,73,83,70,95,69,69,69,69,69,69,69,69,69,69,69,0,0,118,0,0,0,0,0,0,0,116,0,0,0,0,0,0,0,115,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,48,37,0,0,79,0,0,0,80,0,0,0,56,0,0,0,248,255,255,255,48,37,0,0,81,0,0,0,82,0,0,0,192,255,255,255,192,255,255,255,48,37,0,0,83,0,0,0,84,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,56,98,97,115,105,99,95,115,116,114,105,110,103,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,99,69,69,69,69,0,0,0,0,8,111,0,0,232,36,0,0,176,67,0,0,0,0,0,0,64,0,0,0,0,0,0,0,144,66,0,0,85,0,0,0,86,0,0,0,192,255,255,255,192,255,255,255,144,66,0,0,87,0,0,0,88,0,0,0,0,0,0,0,240,37,0,0,89,0,0,0,90,0,0,0,13,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,8,0,0,0,9,0,0,0,2,0,0,0,10,0,0,0,11,0,0,0,14,0,0,0,3,0,0,0,15,0,0,0,78,83,116,51,95,95,49,49,53,98,97,115,105,99,95,115,116,114,105,110,103,98,117,102,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,99,69,69,69,69,0,0,0,0,0,0,0,8,111,0,0,168,37,0,0,24,66,0,0,0,0,0,0,0,0,0,0,200,38,0,0,91,0,0,0,92,0,0,0,93,0,0,0,16,0,0,0,94,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,54,108,97,115,122,105,112,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,78,83,49,95,50,105,111,49,56,95,95,105,102,115,116,114,101,97,109,95,119,114,97,112,112,101,114,73,78,83,49,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,57,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,57,95,69,69,69,69,0,8,111,0,0,32,38,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,54,108,97,115,122,105,112,56,100,101,99,111,100,101,114,115,49,48,97,114,105,116,104,109,101,116,105,99,73,78,83,49,95,50,105,111,49,56,95,95,105,102,115,116,114,101,97,109,95,119,114,97,112,112,101,114,73,78,83,49,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,69,69,69,69,0,0,0,0,71,111,116,32,100,97,116,97,32,0,0,0,0,0,0,0,32,98,121,116,101,115,0,0,76,65,83,70,0,0,0,0,78,54,108,97,115,122,105,112,49,51,105,110,118,97,108,105,100,95,109,97,103,105,99,69,0,0,0,0,0,0,0,0,8,111,0,0,112,39,0,0,72,108,0,0,0,0,0,0,78,54,108,97,115,122,105,112,50,50,99,104,117,110,107,95,116,97,98,108,101,95,114,101,97,100,95,101,114,114,111,114,69,0,0,0,0,0,0,0,8,111,0,0,160,39,0,0,72,108,0,0,0,0,0,0,67,104,117,110,107,32,116,97,98,108,101,32,111,102,102,115,101,116,32,61,61,32,45,49,32,105,115,32,110,111,116,32,115,117,112,112,111,114,116,101,100,32,97,116,32,116,104,105],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE);allocate([115,32,116,105,109,101,0,0,78,54,108,97,115,122,105,112,49,51,110,111,116,95,115,117,112,112,111,114,116,101,100,69,0,0,0,0,0,0,0,0,8,111,0,0,16,40,0,0,72,108,0,0,0,0,0,0,78,54,108,97,115,122,105,112,50,54,117,110,107,110,111,119,110,95,99,104,117,110,107,95,116,97,98,108,101,95,102,111,114,109,97,116,69,0,0,0,8,111,0,0,64,40,0,0,72,108,0,0,0,0,0,0,99,104,117,110,107,95,115,105,122,101,32,61,61,32,117,105,110,116,46,109,97,120,32,105,115,32,110,111,116,32,115,117,112,112,111,114,116,101,100,32,97,116,32,116,104,105,115,32,116,105,109,101,44,32,99,97,108,108,32,49,45,56,48,48,45,68,65,70,85,81,32,102,111,114,32,115,117,112,112,111,114,116,46,0,0,0,0,0,84,104,101,32,99,104,117,110,107,32,116,97,98,108,101,32,118,101,114,115,105,111,110,32,110,117,109,98,101,114,32,105,115,32,117,110,107,110,111,119,110,0,0,0,0,0,0,0,0,0,0,0,104,40,0,0,95,0,0,0,96,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,48,40,0,0,97,0,0,0,98,0,0,0,7,0,0,0,0,0,0,0,84,104,101,114,101,32,119,97,115,32,97,32,112,114,111,98,108,101,109,32,114,101,97,100,105,110,103,32,116,104,101,32,99,104,117,110,107,32,116,97,98,108,101,0,0,0,0,0,0,0,0,0,200,39,0,0,99,0,0,0,100,0,0,0,7,0,0,0,0,0,0,0,108,97,115,122,105,112,32,101,110,99,111,100,101,100,0,0,78,54,108,97,115,122,105,112,49,51,110,111,95,108,97,115,122,105,112,95,118,108,114,69,0,0,0,0,0,0,0,0,8,111,0,0,136,41,0,0,72,108,0,0,0,0,0,0,78,111,32,76,65,83,122,105,112,32,86,76,82,32,119,97,115,32,102,111,117,110,100,32,105,110,32,116,104,101,32,86,76,82,115,32,115,101,99,116,105,111,110,0,0,0,0,0,0,0,0,0,168,41,0,0,101,0,0,0,102,0,0,0,7,0,0,0,0,0,0,0,78,54,108,97,115,122,105,112,50,53,108,97,115,122,105,112,95,102,111,114,109,97,116,95,117,110,115,117,112,112,111,114,116,101,100,69,0,0,0,0,8,111,0,0,0,42,0,0,72,108,0,0,0,0,0,0,79,110,108,121,32,76,65,83,122,105,112,32,80,79,73,78,84,87,73,83,69,32,67,72,85,78,75,69,68,32,100,101,99,111,109,112,114,101,115,115,111,114,32,105,115,32,115,117,112,112,111,114,116,101,100,0,0,0,0,0,40,42,0,0,103,0,0,0,104,0,0,0,7,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,55,98,97,100,95,102,117,110,99,116,105,111,110,95,99,97,108,108,69,0,0,0,0,0,8,111,0,0,136,42,0,0,88,107,0,0,0,0,0,0,0,0,0,0,168,42,0,0,105,0,0,0,106,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,44,0,0,107,0,0,0,108,0,0,0,13,0,0,0,14,0,0,0,109,0,0,0,110,0,0,0,15,0,0,0,17,0,0,0,14,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,54,108,97,115,122,105,112,50,105,111,54,114,101,97,100,101,114,49,48,98,97,115,105,99,95,102,105,108,101,73,78,83,50,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,49,49,95,118,97,108,105,100,97,116,111,114,115,69,118,69,85,108,82,78,83,51,95,54,104,101,97,100,101,114,69,69,95,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,66,95,69,69,70,118,83,65,95,69,69,69,0,0,0,0,78,83,116,51,95,95,49,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,98,97,115,101,73,70,118,82,78,54,108,97,115,122,105,112,50,105,111,54,104,101,97,100,101,114,69,69,69,69,0,0,0,0,160,109,0,0,208,43,0,0,8,111,0,0,56,43,0,0,8,44,0,0,0,0,0,0,90,78,54,108,97,115,122,105,112,50,105,111,54,114,101,97,100,101,114,49,48,98,97,115,105,99,95,102,105,108,101,73,78,83,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,49,49,95,118,97,108,105,100,97,116,111,114,115,69,118,69,85,108,82,78,83,48,95,54,104,101,97,100,101,114,69,69,95,0,0,0,160,109,0,0,32,44,0,0,78,54,108,97,115,122,105,112,50,49,111,108,100,95,115,116,121,108,101,95,99,111,109,112,114,101,115,115,105,111,110,69,0,0,0,0,0,0,0,0,8,111,0,0,136,44,0,0,72,108,0,0,0,0,0,0,78,54,108,97,115,122,105,112,49,52,110,111,116,95,99,111,109,112,114,101,115,115,101,100,69,0,0,0,0,0,0,0,8,111,0,0,192,44,0,0,72,108,0,0,0,0,0,0,84,104,101,32,102,105,108,101,32,100,111,101,115,110,39,116,32,115,101,101,109,32,116,111,32,98,101,32,99,111,109,112,114,101,115,115,101,100,0,0,0,0,0,0,224,44,0,0,111,0,0,0,112,0,0,0,7,0,0,0,0,0,0,0,84,104,101,32,102,105,108,101,32,115,101,101,109,115,32,116,111,32,104,97,118,101,32,111,108,100,32,115,116,121,108,101,32,99,111,109,112,114,101,115,115,105,111,110,32,119,104,105,99,104,32,105,115,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,0,0,0,0,0,0,0,0,176,44,0,0,113,0,0,0,114,0,0,0,7,0,0,0,0,0,0,0,70,105,108,101,32,109,97,103,105,99,32,105,115,32,110,111,116,32,118,97,108,105,100,0,0,0,0,0,144,39,0,0,115,0,0,0,116,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,112,46,0,0,117,0,0,0,118,0,0,0,119,0,0,0,18,0,0,0,120,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,54,108,97,115,122,105,112,50,105,111,54,114,101,97,100,101,114,49,48,98,97,115,105,99,95,102,105,108,101,73,78,83,49,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,55,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,55,95,69,69,69,69,0,0,0,0,0,0,8,111,0,0,224,45,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,54,108,97,115,122,105,112,50,105,111,54,114,101,97,100,101,114,49,48,98,97,115,105,99,95,102,105,108,101,73,78,83,49,95,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,69,69,0,0,0,0,0,104,47,0,0,121,0,0,0,122,0,0,0,123,0,0,0,19,0,0,0,124,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,54,108,97,115,122,105,112,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,51,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,0,0,0,8,111,0,0,248,46,0,0,184,60,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,54,108,97,115,122,105,112,55,115,116,114,101,97,109,115,49,51,109,101,109,111,114,121,95,115,116,114,101,97,109,69,69,69,0,0,0,0,0,0,118,111,105,100,0,0,0,0,98,111,111,108,0,0,0,0,99,104,97,114,0,0,0,0,115,105,103,110,101,100,32,99,104,97,114,0,0,0,0,0,117,110,115,105,103,110,101,100,32,99,104,97,114,0,0,0,115,104,111,114,116,0,0,0,117,110,115,105,103,110,101,100,32,115,104,111,114,116,0,0,105,110,116,0,0,0,0,0,117,110,115,105,103,110,101,100,32,105,110,116,0,0,0,0,108,111,110,103,0,0,0,0,117,110,115,105,103,110,101,100,32,108,111,110,103,0,0,0,102,108,111,97,116,0,0,0,100,111,117,98,108,101,0,0,115,116,100,58,58,115,116,114,105,110,103,0,0,0,0,0,115,116,100,58,58,98,97,115,105,99,95,115,116,114,105,110,103,60,117,110,115,105,103,110,101,100,32,99,104,97,114,62,0,0,0,0,0,0,0,0,115,116,100,58,58,119,115,116,114,105,110,103,0,0,0,0,101,109,115,99,114,105,112,116,101,110,58,58,118,97,108,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,99,104,97,114,62,0,0,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,115,105,103,110,101,100,32,99,104,97,114,62,0,0,0,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,99,104,97,114,62,0,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,115,104,111,114,116,62,0,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,115,104,111,114,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,62,0,0,0,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,105,110,116,62,0,0,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,108,111,110,103,62,0,0,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,108,111,110,103,62,0,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,56,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,105,110,116,56,95,116,62,0,0,0,0,0,0,0,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,49,54,95,116,62,0,0,0,0,0,0,0,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,105,110,116,49,54,95,116,62,0,0,0,0,0,0,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,51,50,95,116,62,0,0,0,0,0,0,0,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,105,110,116,51,50,95,116,62,0,0,0,0,0,0,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,102,108,111,97,116,62,0,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,100,111,117,98,108,101,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,108,111,110,103,32,100,111,117,98,108,101,62,0,0,0,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,101,69,69,0,0,160,109,0,0,56,51,0,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,100,69,69,0,0,160,109,0,0,96,51,0,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,102,69,69,0,0,160,109,0,0,136,51,0,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,109,69,69,0,0,160,109,0,0,176,51,0,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,108,69,69,0,0,160,109,0,0,216,51,0,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,106,69,69,0,0,160,109,0,0,0,52,0,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,105,69,69,0,0,160,109,0,0,40,52,0,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,116,69,69,0,0,160,109,0,0,80,52,0,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,115,69,69,0,0,160,109,0,0,120,52,0,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,104,69,69,0,0,160,109,0,0,160,52,0,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,97,69,69,0,0,160,109,0,0,200,52,0,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,99,69,69,0,0,160,109,0,0,240,52,0,0,78,49,48,101,109,115,99,114,105,112,116,101,110,51,118,97,108,69,0,0,0,0,0,0,160,109,0,0,24,53,0,0,78,83,116,51,95,95,49,49,50,98,97,115,105,99,95,115,116,114,105,110,103,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,119,69,69,69,69,0,0,78,83,116,51,95,95,49,50,49,95,95,98,97,115,105,99,95,115,116,114,105,110,103,95,99,111,109,109,111,110,73,76,98,49,69,69,69,0,0,0,160,109,0,0,120,53,0,0,104,111,0,0,56,53,0,0,0,0,0,0,1,0,0,0,160,53,0,0,0,0,0,0,78,83,116,51,95,95,49,49,50,98,97,115,105,99,95,115,116,114,105,110,103,73,104,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,104,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,104,69,69,69,69,0,0,104,111,0,0,192,53,0,0,0,0,0,0,1,0,0,0,160,53,0,0,0,0,0,0,78,83,116,51,95,95,49,49,50,98,97,115,105,99,95,115,116,114,105,110,103,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,99,69,69,69,69,0,0,104,111,0,0,24,54,0,0,0,0,0,0,1,0,0,0,160,53],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+10240);allocate([248,58,0,0,125,0,0,0,126,0,0,0,16,0,0,0,4,0,0,0,2,0,0,0,2,0,0,0,15,0,0,0,16,0,0,0,5,0,0,0,17,0,0,0,18,0,0,0,20,0,0,0,6,0,0,0,21,0,0,0,78,83,116,51,95,95,49,49,49,95,95,115,116,100,111,117,116,98,117,102,73,119,69,69,0,0,0,0,0,0,0,0,8,111,0,0,216,58,0,0,88,66,0,0,0,0,0,0,0,0,0,0,96,59,0,0,127,0,0,0,128,0,0,0,17,0,0,0,4,0,0,0,2,0,0,0,2,0,0,0,19,0,0,0,16,0,0,0,5,0,0,0,20,0,0,0,21,0,0,0,22,0,0,0,7,0,0,0,23,0,0,0,78,83,116,51,95,95,49,49,48,95,95,115,116,100,105,110,98,117,102,73,119,69,69,0,8,111,0,0,72,59,0,0,88,66,0,0,0,0,0,0,117,110,115,117,112,112,111,114,116,101,100,32,108,111,99,97,108,101,32,102,111,114,32,115,116,97,110,100,97,114,100,32,105,110,112,117,116,0,0,0,0,0,0,0,248,59,0,0,129,0,0,0,130,0,0,0,18,0,0,0,1,0,0,0,3,0,0,0,3,0,0,0,22,0,0,0,9,0,0,0,2,0,0,0,23,0,0,0,11,0,0,0,24,0,0,0,8,0,0,0,25,0,0,0,78,83,116,51,95,95,49,49,49,95,95,115,116,100,111,117,116,98,117,102,73,99,69,69,0,0,0,0,0,0,0,0,8,111,0,0,216,59,0,0,24,66,0,0,0,0,0,0,0,0,0,0,96,60,0,0,131,0,0,0,132,0,0,0,19,0,0,0,1,0,0,0,3,0,0,0,3,0,0,0,8,0,0,0,9,0,0,0,2,0,0,0,24,0,0,0,25,0,0,0,26,0,0,0,3,0,0,0,27,0,0,0,78,83,116,51,95,95,49,49,48,95,95,115,116,100,105,110,98,117,102,73,99,69,69,0,8,111,0,0,72,60,0,0,24,66,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,95,95,115,104,97,114,101,100,95,99,111,117,110,116,69,0,0,0,0,0,0,0,0,160,109,0,0,112,60,0,0,78,83,116,51,95,95,49,49,57,95,95,115,104,97,114,101,100,95,119,101,97,107,95,99,111,117,110,116,69,0,0,0,104,111,0,0,152,60,0,0,0,0,0,0,1,0,0,0,144,60,0,0,0,0,0,0,103,101,110,101,114,105,99,0,117,110,115,112,101,99,105,102,105,101,100,32,103,101,110,101,114,105,99,95,99,97,116,101,103,111,114,121,32,101,114,114,111,114,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,115,121,115,116,101,109,0,0,117,110,115,112,101,99,105,102,105,101,100,32,115,121,115,116,101,109,95,99,97,116,101,103,111,114,121,32,101,114,114,111,114,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,58,32,0,0,0,0,0,0,0,0,0,0,136,61,0,0,133,0,0,0,134,0,0,0,7,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,50,115,121,115,116,101,109,95,101,114,114,111,114,69,0,0,8,111,0,0,112,61,0,0,72,108,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,101,114,114,111,114,95,99,97,116,101,103,111,114,121,69,0,0,0,0,0,0,0,0,160,109,0,0,152,61,0,0,78,83,116,51,95,95,49,49,50,95,95,100,111,95,109,101,115,115,97,103,101,69,0,0,8,111,0,0,192,61,0,0,184,61,0,0,0,0,0,0,0,0,0,0,56,62,0,0,135,0,0,0,136,0,0,0,26,0,0,0,1,0,0,0,9,0,0,0,10,0,0,0,2,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,52,95,95,103,101,110,101,114,105,99,95,101,114,114,111,114,95,99,97,116,101,103,111,114,121,69,0,0,0,0,0,0,8,111,0,0,16,62,0,0,216,61,0,0,0,0,0,0,0,0,0,0,152,62,0,0,137,0,0,0,138,0,0,0,27,0,0,0,3,0,0,0,9,0,0,0,10,0,0,0,4,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,51,95,95,115,121,115,116,101,109,95,101,114,114,111,114,95,99,97,116,101,103,111,114,121,69,0,0,0,0,0,0,0,8,111,0,0,112,62,0,0,216,61,0,0,0,0,0,0,109,117,116,101,120,32,108,111,99,107,32,102,97,105,108,101,100,0,0,0,0,0,0,0,101,99,32,61,61,32,48,0,47,85,115,101,114,115,47,118,101,114,109,97,47,116,109,112,47,101,109,115,100,107,47,101,109,115,99,114,105,112,116,101,110,47,49,46,50,55,46,48,47,115,121,115,116,101,109,47,108,105,98,47,108,105,98,99,120,120,47,109,117,116,101,120,46,99,112,112,0,0,0,0,117,110,108,111,99,107,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,98,97,115,105,99,95,115,116,114,105,110,103,0,0,0,0,0,0,0,0,24,66,0,0,139,0,0,0,140,0,0,0,13,0,0,0,1,0,0,0,3,0,0,0,3,0,0,0,8,0,0,0,9,0,0,0,2,0,0,0,23,0,0,0,11,0,0,0,24,0,0,0,3,0,0,0,27,0,0,0,0,0,0,0,88,66,0,0,141,0,0,0,142,0,0,0,20,0,0,0,4,0,0,0,2,0,0,0,2,0,0,0,19,0,0,0,16,0,0,0,5,0,0,0,17,0,0,0,18,0,0,0,20,0,0,0,7,0,0,0,23,0,0,0,8,0,0,0,0,0,0,0,144,66,0,0,85,0,0,0,86,0,0,0,248,255,255,255,248,255,255,255,144,66,0,0,87,0,0,0,88,0,0,0,8,0,0,0,0,0,0,0,216,66,0,0,143,0,0,0,144,0,0,0,248,255,255,255,248,255,255,255,216,66,0,0,145,0,0,0,146,0,0,0,4,0,0,0,0,0,0,0,32,67,0,0,147,0,0,0,148,0,0,0,252,255,255,255,252,255,255,255,32,67,0,0,149,0,0,0,150,0,0,0,4,0,0,0,0,0,0,0,104,67,0,0,151,0,0,0,152,0,0,0,252,255,255,255,252,255,255,255,104,67,0,0,153,0,0,0,154,0,0,0,105,111,115,116,114,101,97,109,0,0,0,0,0,0,0,0,117,110,115,112,101,99,105,102,105,101,100,32,105,111,115,116,114,101,97,109,95,99,97,116,101,103,111,114,121,32,101,114,114,111,114,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,65,0,0,155,0,0,0,156,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,88,65,0,0,157,0,0,0,158,0,0,0,105,111,115,95,98,97,115,101,58,58,99,108,101,97,114,0,78,83,116,51,95,95,49,56,105,111,115,95,98,97,115,101,55,102,97,105,108,117,114,101,69,0,0,0,0,0,0,0,8,111,0,0,16,65,0,0,136,61,0,0,0,0,0,0,78,83,116,51,95,95,49,56,105,111,115,95,98,97,115,101,69,0,0,0,0,0,0,0,160,109,0,0,64,65,0,0,78,83,116,51,95,95,49,57,98,97,115,105,99,95,105,111,115,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,0,0,0,0,0,8,111,0,0,96,65,0,0,88,65,0,0,0,0,0,0,78,83,116,51,95,95,49,57,98,97,115,105,99,95,105,111,115,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,0,0,0,0,0,8,111,0,0,160,65,0,0,88,65,0,0,0,0,0,0,78,83,116,51,95,95,49,49,53,98,97,115,105,99,95,115,116,114,101,97,109,98,117,102,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,0,0,0,0,0,0,160,109,0,0,224,65,0,0,78,83,116,51,95,95,49,49,53,98,97,115,105,99,95,115,116,114,101,97,109,98,117,102,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,0,0,0,0,0,0,160,109,0,0,32,66,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,105,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,104,111,0,0,96,66,0,0,0,0,0,0,1,0,0,0,144,65,0,0,3,244,255,255,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,105,115,116,114,101,97,109,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,104,111,0,0,168,66,0,0,0,0,0,0,1,0,0,0,208,65,0,0,3,244,255,255,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,111,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,104,111,0,0,240,66,0,0,0,0,0,0,1,0,0,0,144,65,0,0,3,244,255,255,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,111,115,116,114,101,97,109,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,104,111,0,0,56,67,0,0,0,0,0,0,1,0,0,0,208,65,0,0,3,244,255,255,78,83,116,51,95,95,49,49,52,98,97,115,105,99,95,105,111,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,104,111,0,0,128,67,0,0,3,0,0,0,2,0,0,0,144,66,0,0,2,0,0,0,32,67,0,0,2,8,0,0,0,0,0,0,24,68,0,0,159,0,0,0,160,0,0,0,28,0,0,0,1,0,0,0,9,0,0,0,10,0,0,0,5,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,57,95,95,105,111,115,116,114,101,97,109,95,99,97,116,101,103,111,114,121,69,0,0,0,8,111,0,0,248,67,0,0,216,61,0,0,0,0,0,0,0,0,0,0,40,82,0,0,161,0,0,0,162,0,0,0,163,0,0,0,1,0,0,0,4,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,82,0,0,164,0,0,0,165,0,0,0,163,0,0,0,2,0,0,0,5,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,87,0,0,166,0,0,0,167,0,0,0,163,0,0,0,1,0,0,0,2,0,0,0,3,0,0,0,4,0,0,0,5,0,0,0,6,0,0,0,7,0,0,0,8,0,0,0,9,0,0,0,10,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,65,66,67,68,69,70,120,88,43,45,112,80,105,73,110,78,0,0,0,0,0,0,0,0,37,112,0,0,0,0,0,0,0,0,0,0,152,87,0,0,168,0,0,0,169,0,0,0,163,0,0,0,12,0,0,0,13,0,0,0,14,0,0,0,15,0,0,0,16,0,0,0,17,0,0,0,18,0,0,0,19,0,0,0,20,0,0,0,21,0,0,0,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,88,0,0,170,0,0,0,171,0,0,0,163,0,0,0,4,0,0,0,5,0,0,0,23,0,0,0,6,0,0,0,24,0,0,0,1,0,0,0,2,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,108,0,0,0,0,0,0,0,108,108,0,0,0,0,0,0,0,0,0,0,0,0,0,0,76,0,0,0,0,0,0,0,0,0,0,0,240,88,0,0,172,0,0,0,173,0,0,0,163,0,0,0,8,0,0,0,9,0,0,0,25,0,0,0,10,0,0,0,26,0,0,0,3,0,0,0,4,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,0,0,0,0,37,112,0,0,0,0,0,0,0,0,0,0,24,84,0,0,174,0,0,0,175,0,0,0,163,0,0,0,29,0,0,0,27,0,0,0,28,0,0,0,29,0,0,0,30,0,0,0,31,0,0,0,1,0,0,0,248,255,255,255,24,84,0,0,30,0,0,0,31,0,0,0,32,0,0,0,33,0,0,0,34,0,0,0,35,0,0,0,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,72,58,37,77,58,37,83,37,109,47,37,100,47,37,121,37,89,45,37,109,45,37,100,37,73,58,37,77,58,37,83,32,37,112,0,0,0,0,0,37,72,58,37,77,0,0,0,37,72,58,37,77,58,37,83,0,0,0,0,184,84,0,0,176,0,0,0,177,0,0,0,163,0,0,0,37,0,0,0,32,0,0,0,33,0,0,0,34,0,0,0,35,0,0,0,36,0,0,0,2,0,0,0,248,255,255,255,184,84,0,0,38,0,0,0,39,0,0,0,40,0,0,0,41,0,0,0,42,0,0,0,43,0,0,0,44,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,37,0,0,0,109,0,0,0,47,0,0,0,37,0,0,0,100,0,0,0,47,0,0,0,37,0,0,0,121,0,0,0,37,0,0,0,89,0,0,0,45,0,0,0,37,0,0,0,109,0,0,0,45,0,0,0,37,0,0,0,100,0,0,0,37,0,0,0,73,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,112,0,0,0,0,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,0,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,0,0,0,0,72,85,0,0,178,0,0,0,179,0,0,0,163,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,176,85,0,0,180,0,0,0,181,0,0,0,163,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,82,0,0,182,0,0,0,183,0,0,0,163,0,0,0,45,0,0,0,46,0,0,0,21,0,0,0,22,0,0,0,23,0,0,0,24,0,0,0,47,0,0,0,25,0,0,0,26,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,224,82,0,0,184,0,0,0,185,0,0,0,163,0,0,0,48,0,0,0,49,0,0,0,27,0,0,0,28,0,0,0,29,0,0,0,30,0,0,0,50,0,0,0,31,0,0,0,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,83,0,0,186,0,0,0,187,0,0,0,163,0,0,0,51,0,0,0,52,0,0,0,33,0,0,0,34,0,0,0,35,0,0,0,36,0,0,0,53,0,0,0,37,0,0,0,38,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,83,0,0,188,0,0,0,189,0,0,0,163,0,0,0,54,0,0,0,55,0,0,0,39,0,0,0,40,0,0,0,41,0,0,0,42,0,0,0,56,0,0,0,43,0,0,0,44,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,89,0,0,190,0,0,0,191,0,0,0,163,0,0,0,3,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,0,0,0,0,0,0,37,76,102,0,0,0,0,0,109,111,110,101,121,95,103,101,116,32,101,114,114,111,114,0,0,0,0,0,16,90,0,0,192,0,0,0,193,0,0,0,163,0,0,0,5,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,0,0,0,0,0,0,0,0,0,0,160,90,0,0,194,0,0,0,195,0,0,0,163,0,0,0,1,0,0,0,37,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,46,48,76,102,0,0,0,0,0,0,0,48,91,0,0,196,0,0,0,197,0,0,0,163,0,0,0,2,0,0,0,38,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,86,0,0,198,0,0,0,199,0,0,0,163,0,0,0,13,0,0,0,12,0,0,0,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,86,0,0,200,0,0,0,201,0,0,0,163,0,0,0,14,0,0,0,13,0,0,0,46,0,0,0,0,0,0,0,0,0,0,0,118,101,99,116,111,114,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,67,0,0,0,0,0,0,0,0,0,0,0,0,82,0,0,202,0,0,0,203,0,0,0,163,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,216,78,0,0,204,0,0,0,205,0,0,0,163,0,0,0,28,0,0,0,15,0,0,0,29,0,0,0,16,0,0,0,30,0,0,0,1,0,0,0,17,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,79,0,0,206,0,0,0,207,0,0,0,163,0,0,0,1,0,0,0,2,0,0,0,4,0,0,0,57,0,0,0,58,0,0,0,5,0,0,0,59,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,176,81,0,0,208,0,0,0,209,0,0,0,163,0,0,0,60,0,0,0,61,0,0,0,47,0,0,0,48,0,0,0,49,0,0,0,0,0,0,0,216,81,0,0,210,0,0,0,211,0,0,0,163,0,0,0,62,0,0,0,63,0,0,0,50,0,0,0,51,0,0,0,52,0,0,0,116,0,0,0,114,0,0,0,117,0,0,0,101,0,0,0,0,0,0,0,0,0,0,0,102,97,108,115,101,0,0,0,102,0,0,0,97,0,0,0,108,0,0,0,115,0,0,0,101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,109,0,0,0,47,0,0,0,37,0,0,0,100,0,0,0,47,0,0,0,37,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,97,32,37,98,32,37,100,32,37,72,58,37,77,58,37,83,32,37,89,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,97,0,0,0,32,0,0,0,37,0,0,0,98,0,0,0,32,0,0,0,37,0,0,0,100,0,0,0,32,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,89,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,73,58,37,77,58,37,83,32,37,112,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,73,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,112,0,0,0,0,0,0,0,108,111,99,97,108,101,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,0,0,0,0,0,0,0,16,78,0,0,212,0,0,0,213,0,0,0,163,0,0,0,0,0,0,0,78,83,116,51,95,95,49,54,108,111,99,97,108,101,53,102,97,99,101,116,69,0,0,0,8,111,0,0,248,77,0,0,144,60,0,0,0,0,0,0,0,0,0,0,160,78,0,0,212,0,0,0,214,0,0,0,163,0,0,0,18,0,0,0,2,0,0,0,3,0,0,0,4,0,0,0,31,0,0,0,19,0,0,0,32,0,0,0,20,0,0,0,33,0,0,0,5,0,0,0,21,0,0,0,6,0,0,0,0,0,0,0,78,83,116,51,95,95,49,53,99,116,121,112,101,73,119,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,48,99,116,121,112,101,95,98,97,115,101,69,0,0,0,0,160,109,0,0,128,78,0,0,104,111,0,0,104,78,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,152,78,0,0,2,0,0,0,78,83,116,51,95,95,49,53,99,116,121,112,101,73,99,69,69,0,0,0,0,0,0,0,104,111,0,0,192,78,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,152,78,0,0,2,0,0,0,0,0,0,0,112,79,0,0,212,0,0,0,215,0,0,0,163,0,0,0,3,0,0,0,4,0,0,0,7,0,0,0,64,0,0,0,65,0,0,0,8,0,0,0,66,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,99,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,50,99,111,100,101,99,118,116,95,98,97,115,101,69,0,0,160,109,0,0,80,79,0,0,104,111,0,0,40,79,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,104,79,0,0,2,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,119,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,0,104,111,0,0,144,79,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,104,79,0,0,2,0,0,0,0,0,0,0,48,80,0,0,212,0,0,0,216,0,0,0,163,0,0,0,5,0,0,0,6,0,0,0,9,0,0,0,67,0,0,0,68,0,0,0,10,0,0,0,69,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,68,115,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,104,111,0,0,8,80,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,104,79,0,0,2,0,0,0,0,0,0,0,168,80,0,0,212,0,0,0,217,0,0,0,163,0,0,0,7,0,0,0,8,0,0,0,11,0,0,0,70,0,0,0,71,0,0,0,12,0,0,0,72,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,68,105,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,104,111,0,0,128,80,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,104,79,0,0,2,0,0,0,0,0,0,0,32,81,0,0,212,0,0,0,218,0,0,0,163,0,0,0,7,0,0,0,8,0,0,0,11,0,0,0,70,0,0,0,71,0,0,0,12,0,0,0,72,0,0,0,78,83,116,51,95,95,49,49,54,95,95,110,97,114,114,111,119,95,116,111,95,117,116,102,56,73,76,106,51,50,69,69,69,0,0,0,0,0,0,0,8,111,0,0,248,80,0,0,168,80,0,0,0,0,0,0,0,0,0,0,136,81,0,0,212,0,0,0,219,0,0,0,163,0,0,0,7,0,0,0,8,0,0,0,11,0,0,0,70,0,0,0,71,0,0,0,12,0,0,0,72,0,0,0,78,83,116,51,95,95,49,49,55,95,95,119,105,100,101,110,95,102,114,111,109,95,117,116,102,56,73,76,106,51,50,69,69,69,0,0,0,0,0,0,8,111,0,0,96,81,0,0,168,80,0,0,0,0,0,0,78,83,116,51,95,95,49,56,110,117,109,112,117,110,99,116,73,99,69,69,0,0,0,0,8,111,0,0,152,81,0,0,16,78,0,0,0,0,0,0,78,83,116,51,95,95,49,56,110,117,109,112,117,110,99,116,73,119,69,69,0,0,0,0,8,111,0,0,192,81,0,0,16,78,0,0,0,0,0,0,78,83,116,51,95,95,49,54,108,111,99,97,108,101,53,95,95,105,109,112,69,0,0,0,8,111,0,0,232,81,0,0,16,78,0,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,108,108,97,116,101,73,99,69,69,0,0,0,0,0,8,111,0,0,16,82,0,0,16,78,0,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,108,108,97,116,101,73,119,69,69,0,0,0,0,0,8,111,0,0,56,82,0,0,16,78,0,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,99,76,98,48,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,95,98,97,115,101,69,0,0,0,0,160,109,0,0,128,82,0,0,104,111,0,0,96,82,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,152,82,0,0,2,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,99,76,98,49,69,69,69,0,0,0,0,0,104,111,0,0,192,82,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,152,82,0,0,2,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,119,76,98,48,69,69,69,0,0,0,0,0,104,111,0,0,0,83,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,152,82,0,0,2,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,119,76,98,49,69,69,69,0,0,0,0,0,104,111,0,0,64,83,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,152,82,0,0,2,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,57,116,105,109,101,95,98,97,115,101,69,0,0,0,0,0,0,160,109,0,0,200,83,0,0,78,83,116,51,95,95,49,50,48,95,95,116,105,109,101,95,103,101,116,95,99,95,115,116,111,114,97,103,101,73,99,69,69,0,0,0,0,0,0,0,160,109,0,0,232,83,0,0,104,111,0,0,128,83,0,0,0,0,0,0,3,0,0,0,16,78,0,0,2,0,0,0,224,83,0,0,2,0,0,0,16,84,0,0,0,8,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,116,105,109,101,95,103,101,116,95,99,95,115,116,111,114,97,103,101,73,119,69,69,0,0,0,0,0,0,0,160,109,0,0,136,84,0,0,104,111,0,0,64,84,0,0,0,0,0,0,3,0,0,0,16,78,0,0,2,0,0,0,224,83,0,0,2,0,0,0,176,84,0,0,0,8,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,49,48,95,95,116,105,109,101,95,112,117,116,69,0,0,0,0,160,109,0,0,40,85,0,0,104,111,0,0,224,84,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,64,85,0,0,0,8,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,104,111,0,0,104,85,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,64,85,0,0,0,8,0,0,78,83,116,51,95,95,49,56,109,101,115,115,97,103,101,115,73,99,69,69,0,0,0,0,78,83,116,51,95,95,49,49,51,109,101,115,115,97,103,101,115,95,98,97,115,101,69,0,160,109,0,0,232,85,0,0,104,111,0,0,208,85,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,0,86,0,0,2,0,0,0,78,83,116,51,95,95,49,56,109,101,115,115,97,103,101,115,73,119,69,69,0,0,0,0,104,111,0,0,40,86,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,0,86,0,0,2,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,103,101,116,73,99,69,69,0,0,0,78,83,116,51,95,95,49,49,52,95,95,110,117,109,95,103,101,116,95,98,97,115,101,69,0,0,0,0,0,0,0,0,160,109,0,0,192,86,0,0,104,111,0,0,168,86,0,0,0,0,0,0,1,0,0,0,224,86,0,0,0,0,0,0,104,111,0,0,96,86,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,232,86,0,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,103,101,116,73,119,69,69,0,0,0,104,111,0,0,104,87,0,0,0,0,0,0,1,0,0,0,224,86,0,0,0,0,0,0,104,111,0,0,32,87,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,128,87,0,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,112,117,116,73,99,69,69,0,0,0,78,83,116,51,95,95,49,49,52,95,95,110,117,109,95,112,117,116,95,98,97,115,101,69,0,0,0,0,0,0,0,0,160,109,0,0,24,88,0,0,104,111,0,0,0,88,0,0,0,0,0,0,1,0,0,0,56,88,0,0,0,0,0,0,104,111,0,0,184,87,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,64,88,0,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,112,117,116,73,119,69,69,0,0,0,104,111,0,0,192,88,0,0,0,0,0,0,1,0,0,0,56,88,0,0,0,0,0,0,104,111,0,0,120,88,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,216,88,0,0,0,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,103,101,116,73,99,69,69,0,0,0,0,0,0,0,0,160,109,0,0,88,89,0,0,104,111,0,0,16,89,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,120,89,0,0,0,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,103,101,116,73,119,69,69,0,0,0,0,0,0,0,0,160,109,0,0,232,89,0,0,104,111,0,0,160,89,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,8,90,0,0,0,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,112,117,116,73,99,69,69,0,0,0,0,0,0,0,0,160,109,0,0,120,90,0,0,104,111,0,0,48,90,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,152,90,0,0,0,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,112,117,116,73,119,69,69,0,0,0,0,0,0,0,0,160,109,0,0,8,91,0,0,104,111,0,0,192,90,0,0,0,0,0,0,2,0,0,0,16,78,0,0,2,0,0,0,40,91,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,65,0,0,0,77,0,0,0,0,0,0,0,0,0,0,0,80,0,0,0,77,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,65,77,0,0,0,0,0,0,80,77,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,74,0,0,0,97,0,0,0,110,0,0,0,117,0,0,0,97,0,0,0,114,0,0,0,121,0,0,0,0,0,0,0,70,0,0,0,101,0,0,0,98,0,0,0,114,0,0,0,117,0,0,0,97,0,0,0,114,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,77,0,0,0,97,0,0,0,114,0,0,0,99,0,0,0,104,0,0,0,0,0,0,0,65,0,0,0,112,0,0,0,114,0,0,0,105,0,0,0,108,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,110,0,0,0,101,0,0,0,0,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,108,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,65,0,0,0,117,0,0,0,103,0,0,0,117,0,0,0,115,0,0,0,116,0,0,0,0,0,0,0,0,0,0,0,83,0,0,0,101,0,0,0,112,0,0,0,116,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,79,0,0,0,99,0,0,0,116,0,0,0,111,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,78,0,0,0,111,0,0,0,118,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,0,0,0,0,68,0,0,0,101,0,0,0,99,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,0,0,0,0,74,0,0,0,97,0,0,0,110,0,0,0,0,0,0,0,70,0,0,0,101,0,0,0,98,0,0,0,0,0,0,0,77,0,0,0,97,0,0,0,114,0,0,0,0,0,0,0,65,0,0,0,112,0,0,0,114,0,0,0,0,0,0,0,77,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,110,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,108],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+14996);allocate([65,0,0,0,117,0,0,0,103,0,0,0,0,0,0,0,83,0,0,0,101,0,0,0,112,0,0,0,0,0,0,0,79,0,0,0,99,0,0,0,116,0,0,0,0,0,0,0,78,0,0,0,111,0,0,0,118,0,0,0,0,0,0,0,68,0,0,0,101,0,0,0,99,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,74,97,110,117,97,114,121,0,70,101,98,114,117,97,114,121,0,0,0,0,0,0,0,0,77,97,114,99,104,0,0,0,65,112,114,105,108,0,0,0,77,97,121,0,0,0,0,0,74,117,110,101,0,0,0,0,74,117,108,121,0,0,0,0,65,117,103,117,115,116,0,0,83,101,112,116,101,109,98,101,114,0,0,0,0,0,0,0,79,99,116,111,98,101,114,0,78,111,118,101,109,98,101,114,0,0,0,0,0,0,0,0,68,101,99,101,109,98,101,114,0,0,0,0,0,0,0,0,74,97,110,0,0,0,0,0,70,101,98,0,0,0,0,0,77,97,114,0,0,0,0,0,65,112,114,0,0,0,0,0,74,117,110,0,0,0,0,0,74,117,108,0,0,0,0,0,65,117,103,0,0,0,0,0,83,101,112,0,0,0,0,0,79,99,116,0,0,0,0,0,78,111,118,0,0,0,0,0,68,101,99,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,83,0,0,0,117,0,0,0,110,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,77,0,0,0,111,0,0,0,110,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,84,0,0,0,117,0,0,0,101,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,87,0,0,0,101,0,0,0,100,0,0,0,110,0,0,0,101,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,84,0,0,0,104,0,0,0,117,0,0,0,114,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,70,0,0,0,114,0,0,0,105,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,83,0,0,0,97,0,0,0,116,0,0,0,117,0,0,0,114,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,83,0,0,0,117,0,0,0,110,0,0,0,0,0,0,0,77,0,0,0,111,0,0,0,110,0,0,0,0,0,0,0,84,0,0,0,117,0,0,0,101,0,0,0,0,0,0,0,87,0,0,0,101,0,0,0,100,0,0,0,0,0,0,0,84,0,0,0,104,0,0,0,117,0,0,0,0,0,0,0,70,0,0,0,114,0,0,0,105,0,0,0,0,0,0,0,83,0,0,0,97,0,0,0,116,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,83,117,110,100,97,121,0,0,77,111,110,100,97,121,0,0,84,117,101,115,100,97,121,0,87,101,100,110,101,115,100,97,121,0,0,0,0,0,0,0,84,104,117,114,115,100,97,121,0,0,0,0,0,0,0,0,70,114,105,100,97,121,0,0,83,97,116,117,114,100,97,121,0,0,0,0,0,0,0,0,83,117,110,0,0,0,0,0,77,111,110,0,0,0,0,0,84,117,101,0,0,0,0,0,87,101,100,0,0,0,0,0,84,104,117,0,0,0,0,0,70,114,105,0,0,0,0,0,83,97,116,0,0,0,0,0,2,0,0,192,3,0,0,192,4,0,0,192,5,0,0,192,6,0,0,192,7,0,0,192,8,0,0,192,9,0,0,192,10,0,0,192,11,0,0,192,12,0,0,192,13,0,0,192,14,0,0,192,15,0,0,192,16,0,0,192,17,0,0,192,18,0,0,192,19,0,0,192,20,0,0,192,21,0,0,192,22,0,0,192,23,0,0,192,24,0,0,192,25,0,0,192,26,0,0,192,27,0,0,192,28,0,0,192,29,0,0,192,30,0,0,192,31,0,0,192,0,0,0,179,1,0,0,195,2,0,0,195,3,0,0,195,4,0,0,195,5,0,0,195,6,0,0,195,7,0,0,195,8,0,0,195,9,0,0,195,10,0,0,195,11,0,0,195,12,0,0,195,13,0,0,211,14,0,0,195,15,0,0,195,0,0,12,187,1,0,12,195,2,0,12,195,3,0,12,195,4,0,12,211,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,117,110,99,97,117,103,104,116,0,0,0,0,0,0,0,0,116,101,114,109,105,110,97,116,105,110,103,32,119,105,116,104,32,37,115,32,101,120,99,101,112,116,105,111,110,32,111,102,32,116,121,112,101,32,37,115,58,32,37,115,0,0,0,0,116,101,114,109,105,110,97,116,105,110,103,32,119,105,116,104,32,37,115,32,101,120,99,101,112,116,105,111,110,32,111,102,32,116,121,112,101,32,37,115,0,0,0,0,0,0,0,0,116,101,114,109,105,110,97,116,105,110,103,32,119,105,116,104,32,37,115,32,102,111,114,101,105,103,110,32,101,120,99,101,112,116,105,111,110,0,0,0,116,101,114,109,105,110,97,116,105,110,103,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,116,104,114,101,97,100,95,111,110,99,101,32,102,97,105,108,117,114,101,32,105,110,32,95,95,99,120,97,95,103,101,116,95,103,108,111,98,97,108,115,95,102,97,115,116,40,41,0,0,0,0,0,0,0,0,99,97,110,110,111,116,32,99,114,101,97,116,101,32,112,116,104,114,101,97,100,32,107,101,121,32,102,111,114,32,95,95,99,120,97,95,103,101,116,95,103,108,111,98,97,108,115,40,41,0,0,0,0,0,0,0,99,97,110,110,111,116,32,122,101,114,111,32,111,117,116,32,116,104,114,101,97,100,32,118,97,108,117,101,32,102,111,114,32,95,95,99,120,97,95,103,101,116,95,103,108,111,98,97,108,115,40,41,0,0,0,0,0,0,0,0,192,106,0,0,220,0,0,0,221,0,0,0,73,0,0,0,0,0,0,0,115,116,100,58,58,98,97,100,95,97,108,108,111,99,0,0,83,116,57,98,97,100,95,97,108,108,111,99,0,0,0,0,8,111,0,0,176,106,0,0,88,107,0,0,0,0,0,0,116,101,114,109,105,110,97,116,101,95,104,97,110,100,108,101,114,32,117,110,101,120,112,101,99,116,101,100,108,121,32,114,101,116,117,114,110,101,100,0,116,101,114,109,105,110,97,116,101,95,104,97,110,100,108,101,114,32,117,110,101,120,112,101,99,116,101,100,108,121,32,116,104,114,101,119,32,97,110,32,101,120,99,101,112,116,105,111,110,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,115,116,100,58,58,101,120,99,101,112,116,105,111,110,0,0,83,116,57,101,120,99,101,112,116,105,111,110,0,0,0,0,160,109,0,0,72,107,0,0,0,0,0,0,160,107,0,0,222,0,0,0,223,0,0,0,74,0,0,0,0,0,0,0,0,0,0,0,72,108,0,0,224,0,0,0,225,0,0,0,7,0,0,0,0,0,0,0,83,116,49,49,108,111,103,105,99,95,101,114,114,111,114,0,8,111,0,0,144,107,0,0,88,107,0,0,0,0,0,0,0,0,0,0,224,107,0,0,222,0,0,0,226,0,0,0,74,0,0,0,0,0,0,0,83,116,49,50,108,101,110,103,116,104,95,101,114,114,111,114,0,0,0,0,0,0,0,0,8,111,0,0,200,107,0,0,160,107,0,0,0,0,0,0,0,0,0,0,32,108,0,0,222,0,0,0,227,0,0,0,74,0,0,0,0,0,0,0,83,116,49,50,111,117,116,95,111,102,95,114,97,110,103,101,0,0,0,0,0,0,0,0,8,111,0,0,8,108,0,0,160,107,0,0,0,0,0,0,83,116,49,51,114,117,110,116,105,109,101,95,101,114,114,111,114,0,0,0,0,0,0,0,8,111,0,0,48,108,0,0,88,107,0,0,0,0,0,0,0,0,0,0,168,108,0,0,228,0,0,0,229,0,0,0,75,0,0,0,0,0,0,0,115,116,100,58,58,98,97,100,95,99,97,115,116,0,0,0,83,116,57,116,121,112,101,95,105,110,102,111,0,0,0,0,160,109,0,0,128,108,0,0,83,116,56,98,97,100,95,99,97,115,116,0,0,0,0,0,8,111,0,0,152,108,0,0,88,107,0,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,0,8,111,0,0,184,108,0,0,144,108,0,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,8,111,0,0,240,108,0,0,224,108,0,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,57,95,95,112,111,105,110,116,101,114,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,112,98,97,115,101,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,8,111,0,0,80,109,0,0,224,108,0,0,0,0,0,0,8,111,0,0,40,109,0,0,120,109,0,0,0,0,0,0,0,0,0,0,24,109,0,0,230,0,0,0,231,0,0,0,232,0,0,0,233,0,0,0,22,0,0,0,14,0,0,0,1,0,0,0,6,0,0,0,0,0,0,0,136,109,0,0,230,0,0,0,234,0,0,0,232,0,0,0,233,0,0,0,23,0,0,0,0,0,0,0,0,0,0,0,40,110,0,0,230,0,0,0,235,0,0,0,232,0,0,0,233,0,0,0,24,0,0,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,51,95,95,102,117,110,100,97,109,101,110,116,97,108,95,116,121,112,101,95,105,110,102,111,69,0,8,111,0,0,0,110,0,0,224,108,0,0,0,0,0,0,118,0,0,0,0,0,0,0,232,109,0,0,56,110,0,0,68,110,0,0,0,0,0,0,232,109,0,0,72,110,0,0,98,0,0,0,0,0,0,0,232,109,0,0,88,110,0,0,99,0,0,0,0,0,0,0,232,109,0,0,104,110,0,0,104,0,0,0,0,0,0,0,232,109,0,0,120,110,0,0,97,0,0,0,0,0,0,0,232,109,0,0,136,110,0,0,232,109,0,0,160,36,0,0,232,109,0,0,152,36,0,0,105,0,0,0,0,0,0,0,232,109,0,0,168,110,0,0,106,0,0,0,0,0,0,0,232,109,0,0,184,110,0,0,232,109,0,0,120,69,0,0,109,0,0,0,0,0,0,0,232,109,0,0,208,110,0,0,102,0,0,0,0,0,0,0,232,109,0,0,224,110,0,0,100,0,0,0,0,0,0,0,232,109,0,0,240,110,0,0,0,0,0,0,80,111,0,0,230,0,0,0,236,0,0,0,232,0,0,0,233,0,0,0,22,0,0,0,15,0,0,0,2,0,0,0,7,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,8,111,0,0,40,111,0,0,24,109,0,0,0,0,0,0,0,0,0,0,176,111,0,0,230,0,0,0,237,0,0,0,232,0,0,0,233,0,0,0,22,0,0,0,16,0,0,0,3,0,0,0,8,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,49,95,95,118,109,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,8,111,0,0,136,111,0,0,24,109,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,1,2,3,4,5,6,7,8,9,255,255,255,255,255,255,255,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,255,255,255,255,255,255,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,0,0,0,0,0,0,0,1,2,4,7,3,6,5,0,0,0,0,0,0,0,0,105,110,102,105,110,105,116,121,0,0,0,0,0,0,0,0,95,112,137,0,255,9,47,15,10,0,0,0,100,0,0,0,232,3,0,0,16,39,0,0,160,134,1,0,64,66,15,0,128,150,152,0,0,225,245,5,17,0,10,0,17,17,17,0,0,0,0,5,0,0,0,0,0,0,9,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,15,10,17,17,17,3,10,7,0,1,19,9,11,11,0,0,9,6,11,0,0,11,0,6,17,0,0,0,17,17,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,10,10,17,17,17,0,10,0,0,2,0,9,11,0,0,0,9,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,4,13,0,0,0,0,9,14,0,0,0,0,0,14,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,15,0,0,0,0,9,16,0,0,0,0,0,16,0,0,16,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,10,0,0,0,0,9,11,0,0,0,0,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,45,43,32,32,32,48,88,48,120,0,0,0,0,0,0,0,40,110,117,108,108,41,0,0,45,48,88,43,48,88,32,48,88,45,48,120,43,48,120,32,48,120,0,0,0,0,0,0,105,110,102,0,0,0,0,0,73,78,70,0,0,0,0,0,110,97,110,0,0,0,0,0,78,65,78,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,46,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+25240);var tempDoublePtr=Runtime.alignMemory(allocate(12,"i8",ALLOC_STATIC),8);assert(tempDoublePtr%8==0);function copyTempFloat(ptr){HEAP8[tempDoublePtr]=HEAP8[ptr];HEAP8[tempDoublePtr+1]=HEAP8[ptr+1];HEAP8[tempDoublePtr+2]=HEAP8[ptr+2];HEAP8[tempDoublePtr+3]=HEAP8[ptr+3]}function copyTempDouble(ptr){HEAP8[tempDoublePtr]=HEAP8[ptr];HEAP8[tempDoublePtr+1]=HEAP8[ptr+1];HEAP8[tempDoublePtr+2]=HEAP8[ptr+2];HEAP8[tempDoublePtr+3]=HEAP8[ptr+3];HEAP8[tempDoublePtr+4]=HEAP8[ptr+4];HEAP8[tempDoublePtr+5]=HEAP8[ptr+5];HEAP8[tempDoublePtr+6]=HEAP8[ptr+6];HEAP8[tempDoublePtr+7]=HEAP8[ptr+7]}function _atexit(func,arg){__ATEXIT__.unshift({func:func,arg:arg})}function ___cxa_atexit(){return _atexit.apply(null,arguments)}Module["_i64Subtract"]=_i64Subtract;Module["_i64Add"]=_i64Add;function __ZSt18uncaught_exceptionv(){return!!__ZSt18uncaught_exceptionv.uncaught_exception}var EXCEPTIONS={last:0,caught:[],infos:{},deAdjust:(function(adjusted){if(!adjusted||EXCEPTIONS.infos[adjusted])return adjusted;for(var ptr in EXCEPTIONS.infos){var info=EXCEPTIONS.infos[ptr];if(info.adjusted===adjusted){return ptr}}return adjusted}),addRef:(function(ptr){if(!ptr)return;var info=EXCEPTIONS.infos[ptr];info.refcount++}),decRef:(function(ptr){if(!ptr)return;var info=EXCEPTIONS.infos[ptr];assert(info.refcount>0);info.refcount--;if(info.refcount===0){if(info.destructor){Runtime.dynCall("vi",info.destructor,[ptr])}delete EXCEPTIONS.infos[ptr];___cxa_free_exception(ptr)}}),clearRef:(function(ptr){if(!ptr)return;var info=EXCEPTIONS.infos[ptr];info.refcount=0})};function ___resumeException(ptr){if(!EXCEPTIONS.last){EXCEPTIONS.last=ptr}EXCEPTIONS.clearRef(EXCEPTIONS.deAdjust(ptr));throw ptr}function ___cxa_find_matching_catch(){var thrown=EXCEPTIONS.last;if(!thrown){return(asm["setTempRet0"](0),0)|0}var info=EXCEPTIONS.infos[thrown];var throwntype=info.type;if(!throwntype){return(asm["setTempRet0"](0),thrown)|0}var typeArray=Array.prototype.slice.call(arguments);var pointer=Module["___cxa_is_pointer_type"](throwntype);if(!___cxa_find_matching_catch.buffer)___cxa_find_matching_catch.buffer=_malloc(4);HEAP32[___cxa_find_matching_catch.buffer>>2]=thrown;thrown=___cxa_find_matching_catch.buffer;for(var i=0;i<typeArray.length;i++){if(typeArray[i]&&Module["___cxa_can_catch"](typeArray[i],throwntype,thrown)){thrown=HEAP32[thrown>>2];info.adjusted=thrown;return(asm["setTempRet0"](typeArray[i]),thrown)|0}}thrown=HEAP32[thrown>>2];return(asm["setTempRet0"](throwntype),thrown)|0}function ___cxa_throw(ptr,type,destructor){EXCEPTIONS.infos[ptr]={ptr:ptr,adjusted:ptr,type:type,destructor:destructor,refcount:0};EXCEPTIONS.last=ptr;if(!("uncaught_exception"in __ZSt18uncaught_exceptionv)){__ZSt18uncaught_exceptionv.uncaught_exception=1}else{__ZSt18uncaught_exceptionv.uncaught_exception++}throw ptr}function getShiftFromSize(size){switch(size){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+size)}}function embind_init_charCodes(){var codes=new Array(256);for(var i=0;i<256;++i){codes[i]=String.fromCharCode(i)}embind_charCodes=codes}var embind_charCodes=undefined;function readLatin1String(ptr){var ret="";var c=ptr;while(HEAPU8[c]){ret+=embind_charCodes[HEAPU8[c++]]}return ret}var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var char_0=48;var char_9=57;function makeLegalFunctionName(name){if(undefined===name){return"_unknown"}name=name.replace(/[^a-zA-Z0-9_]/g,"$");var f=name.charCodeAt(0);if(f>=char_0&&f<=char_9){return"_"+name}else{return name}}function createNamedFunction(name,body){name=makeLegalFunctionName(name);return(new Function("body","return function "+name+"() {\n"+'    "use strict";'+"    return body.apply(this, arguments);\n"+"};\n"))(body)}function extendError(baseErrorType,errorName){var errorClass=createNamedFunction(errorName,(function(message){this.name=errorName;this.message=message;var stack=(new Error(message)).stack;if(stack!==undefined){this.stack=this.toString()+"\n"+stack.replace(/^Error(:[^\n]*)?\n/,"")}}));errorClass.prototype=Object.create(baseErrorType.prototype);errorClass.prototype.constructor=errorClass;errorClass.prototype.toString=(function(){if(this.message===undefined){return this.name}else{return this.name+": "+this.message}});return errorClass}var BindingError=undefined;function throwBindingError(message){throw new BindingError(message)}var InternalError=undefined;function throwInternalError(message){throw new InternalError(message)}function whenDependentTypesAreResolved(myTypes,dependentTypes,getTypeConverters){myTypes.forEach((function(type){typeDependencies[type]=dependentTypes}));function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length){throwInternalError("Mismatched type converter count")}for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i])}}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;dependentTypes.forEach((function(dt,i){if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt]}else{unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[]}awaitingDependencies[dt].push((function(){typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length){onComplete(typeConverters)}}))}}));if(0===unregisteredTypes.length){onComplete(typeConverters)}}function registerType(rawType,registeredInstance,options){options=options||{};if(!("argPackAdvance"in registeredInstance)){throw new TypeError("registerType registeredInstance requires argPackAdvance")}var name=registeredInstance.name;if(!rawType){throwBindingError('type "'+name+'" must have a positive integer typeid pointer')}if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return}else{throwBindingError("Cannot register type '"+name+"' twice")}}registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach((function(cb){cb()}))}}function __embind_register_bool(rawType,name,size,trueValue,falseValue){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":(function(wt){return!!wt}),"toWireType":(function(destructors,o){return o?trueValue:falseValue}),"argPackAdvance":8,"readValueFromPointer":(function(pointer){var heap;if(size===1){heap=HEAP8}else if(size===2){heap=HEAP16}else if(size===4){heap=HEAP32}else{throw new TypeError("Unknown boolean type size: "+name)}return this["fromWireType"](heap[pointer>>shift])}),destructorFunction:null})}function _pthread_mutex_lock(){}function _free(){}Module["_free"]=_free;function _malloc(bytes){var ptr=Runtime.dynamicAlloc(bytes+8);return ptr+8&4294967288}Module["_malloc"]=_malloc;function simpleReadValueFromPointer(pointer){return this["fromWireType"](HEAPU32[pointer>>2])}function __embind_register_std_string(rawType,name){name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":(function(value){var length=HEAPU32[value>>2];var a=new Array(length);for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAPU8[value+4+i])}_free(value);return a.join("")}),"toWireType":(function(destructors,value){if(value instanceof ArrayBuffer){value=new Uint8Array(value)}function getTAElement(ta,index){return ta[index]}function getStringElement(string,index){return string.charCodeAt(index)}var getElement;if(value instanceof Uint8Array){getElement=getTAElement}else if(value instanceof Int8Array){getElement=getTAElement}else if(typeof value==="string"){getElement=getStringElement}else{throwBindingError("Cannot pass non-string to std::string")}var length=value.length;var ptr=_malloc(4+length);HEAPU32[ptr>>2]=length;for(var i=0;i<length;++i){var charCode=getElement(value,i);if(charCode>255){_free(ptr);throwBindingError("String has UTF-16 code units that do not fit in 8 bits")}HEAPU8[ptr+4+i]=charCode}if(destructors!==null){destructors.push(_free,ptr)}return ptr}),"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:(function(ptr){_free(ptr)})})}function __embind_register_std_wstring(rawType,charSize,name){name=readLatin1String(name);var HEAP,shift;if(charSize===2){HEAP=HEAPU16;shift=1}else if(charSize===4){HEAP=HEAPU32;shift=2}registerType(rawType,{name:name,"fromWireType":(function(value){var length=HEAPU32[value>>2];var a=new Array(length);var start=value+4>>shift;for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAP[start+i])}_free(value);return a.join("")}),"toWireType":(function(destructors,value){var length=value.length;var ptr=_malloc(4+length*charSize);HEAPU32[ptr>>2]=length;var start=ptr+4>>shift;for(var i=0;i<length;++i){HEAP[start+i]=value.charCodeAt(i)}if(destructors!==null){destructors.push(_free,ptr)}return ptr}),"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:(function(ptr){_free(ptr)})})}var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};var ___errno_state=0;function ___setErrNo(value){HEAP32[___errno_state>>2]=value;return value}var PATH={splitPath:(function(filename){var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;return splitPathRe.exec(filename).slice(1)}),normalizeArray:(function(parts,allowAboveRoot){var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==="."){parts.splice(i,1)}else if(last===".."){parts.splice(i,1);up++}else if(up){parts.splice(i,1);up--}}if(allowAboveRoot){for(;up--;up){parts.unshift("..")}}return parts}),normalize:(function(path){var isAbsolute=path.charAt(0)==="/",trailingSlash=path.substr(-1)==="/";path=PATH.normalizeArray(path.split("/").filter((function(p){return!!p})),!isAbsolute).join("/");if(!path&&!isAbsolute){path="."}if(path&&trailingSlash){path+="/"}return(isAbsolute?"/":"")+path}),dirname:(function(path){var result=PATH.splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){return"."}if(dir){dir=dir.substr(0,dir.length-1)}return root+dir}),basename:(function(path){if(path==="/")return"/";var lastSlash=path.lastIndexOf("/");if(lastSlash===-1)return path;return path.substr(lastSlash+1)}),extname:(function(path){return PATH.splitPath(path)[3]}),join:(function(){var paths=Array.prototype.slice.call(arguments,0);return PATH.normalize(paths.join("/"))}),join2:(function(l,r){return PATH.normalize(l+"/"+r)}),resolve:(function(){var resolvedPath="",resolvedAbsolute=false;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path=i>=0?arguments[i]:FS.cwd();if(typeof path!=="string"){throw new TypeError("Arguments to path.resolve must be strings")}else if(!path){return""}resolvedPath=path+"/"+resolvedPath;resolvedAbsolute=path.charAt(0)==="/"}resolvedPath=PATH.normalizeArray(resolvedPath.split("/").filter((function(p){return!!p})),!resolvedAbsolute).join("/");return(resolvedAbsolute?"/":"")+resolvedPath||"."}),relative:(function(from,to){from=PATH.resolve(from).substr(1);to=PATH.resolve(to).substr(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!=="")break}var end=arr.length-1;for(;end>=0;end--){if(arr[end]!=="")break}if(start>end)return[];return arr.slice(start,end-start+1)}var fromParts=trim(from.split("/"));var toParts=trim(to.split("/"));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break}}var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push("..")}outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join("/")})};var TTY={ttys:[],init:(function(){}),shutdown:(function(){}),register:(function(dev,ops){TTY.ttys[dev]={input:[],output:[],ops:ops};FS.registerDevice(dev,TTY.stream_ops)}),stream_ops:{open:(function(stream){var tty=TTY.ttys[stream.node.rdev];if(!tty){throw new FS.ErrnoError(ERRNO_CODES.ENODEV)}stream.tty=tty;stream.seekable=false}),close:(function(stream){if(stream.tty.output.length){stream.tty.ops.put_char(stream.tty,10)}}),read:(function(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.get_char){throw new FS.ErrnoError(ERRNO_CODES.ENXIO)}var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=stream.tty.ops.get_char(stream.tty)}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EIO)}if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)}if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result}if(bytesRead){stream.node.timestamp=Date.now()}return bytesRead}),write:(function(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.put_char){throw new FS.ErrnoError(ERRNO_CODES.ENXIO)}for(var i=0;i<length;i++){try{stream.tty.ops.put_char(stream.tty,buffer[offset+i])}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EIO)}}if(length){stream.node.timestamp=Date.now()}return i})},default_tty_ops:{get_char:(function(tty){if(!tty.input.length){var result=null;if(ENVIRONMENT_IS_NODE){result=process["stdin"]["read"]();if(!result){if(process["stdin"]["_readableState"]&&process["stdin"]["_readableState"]["ended"]){return null}return undefined}}else if(typeof window!="undefined"&&typeof window.prompt=="function"){result=window.prompt("Input: ");if(result!==null){result+="\n"}}else if(typeof readline=="function"){result=readline();if(result!==null){result+="\n"}}if(!result){return null}tty.input=intArrayFromString(result,true)}return tty.input.shift()}),put_char:(function(tty,val){if(val===null||val===10){Module["print"](tty.output.join(""));tty.output=[]}else{tty.output.push(TTY.utf8.processCChar(val))}})},default_tty1_ops:{put_char:(function(tty,val){if(val===null||val===10){Module["printErr"](tty.output.join(""));tty.output=[]}else{tty.output.push(TTY.utf8.processCChar(val))}})}};var MEMFS={ops_table:null,mount:(function(mount){return MEMFS.createNode(null,"/",16384|511,0)}),createNode:(function(parent,name,mode,dev){if(FS.isBlkdev(mode)||FS.isFIFO(mode)){throw new FS.ErrnoError(ERRNO_CODES.EPERM)}if(!MEMFS.ops_table){MEMFS.ops_table={dir:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,lookup:MEMFS.node_ops.lookup,mknod:MEMFS.node_ops.mknod,rename:MEMFS.node_ops.rename,unlink:MEMFS.node_ops.unlink,rmdir:MEMFS.node_ops.rmdir,readdir:MEMFS.node_ops.readdir,symlink:MEMFS.node_ops.symlink},stream:{llseek:MEMFS.stream_ops.llseek}},file:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr},stream:{llseek:MEMFS.stream_ops.llseek,read:MEMFS.stream_ops.read,write:MEMFS.stream_ops.write,allocate:MEMFS.stream_ops.allocate,mmap:MEMFS.stream_ops.mmap}},link:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,readlink:MEMFS.node_ops.readlink},stream:{}},chrdev:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr},stream:FS.chrdev_stream_ops}}}var node=FS.createNode(parent,name,mode,dev);if(FS.isDir(node.mode)){node.node_ops=MEMFS.ops_table.dir.node;node.stream_ops=MEMFS.ops_table.dir.stream;node.contents={}}else if(FS.isFile(node.mode)){node.node_ops=MEMFS.ops_table.file.node;node.stream_ops=MEMFS.ops_table.file.stream;node.usedBytes=0;node.contents=null}else if(FS.isLink(node.mode)){node.node_ops=MEMFS.ops_table.link.node;node.stream_ops=MEMFS.ops_table.link.stream}else if(FS.isChrdev(node.mode)){node.node_ops=MEMFS.ops_table.chrdev.node;node.stream_ops=MEMFS.ops_table.chrdev.stream}node.timestamp=Date.now();if(parent){parent.contents[name]=node}return node}),getFileDataAsRegularArray:(function(node){if(node.contents&&node.contents.subarray){var arr=[];for(var i=0;i<node.usedBytes;++i)arr.push(node.contents[i]);return arr}return node.contents}),getFileDataAsTypedArray:(function(node){if(!node.contents)return new Uint8Array;if(node.contents.subarray)return node.contents.subarray(0,node.usedBytes);return new Uint8Array(node.contents)}),expandFileStorage:(function(node,newCapacity){if(node.contents&&node.contents.subarray&&newCapacity>node.contents.length){node.contents=MEMFS.getFileDataAsRegularArray(node);node.usedBytes=node.contents.length}if(!node.contents||node.contents.subarray){var prevCapacity=node.contents?node.contents.buffer.byteLength:0;if(prevCapacity>=newCapacity)return;var CAPACITY_DOUBLING_MAX=1024*1024;newCapacity=Math.max(newCapacity,prevCapacity*(prevCapacity<CAPACITY_DOUBLING_MAX?2:1.125)|0);if(prevCapacity!=0)newCapacity=Math.max(newCapacity,256);var oldContents=node.contents;node.contents=new Uint8Array(newCapacity);if(node.usedBytes>0)node.contents.set(oldContents.subarray(0,node.usedBytes),0);return}if(!node.contents&&newCapacity>0)node.contents=[];while(node.contents.length<newCapacity)node.contents.push(0)}),resizeFileStorage:(function(node,newSize){if(node.usedBytes==newSize)return;if(newSize==0){node.contents=null;node.usedBytes=0;return}if(!node.contents||node.contents.subarray){var oldContents=node.contents;node.contents=new Uint8Array(new ArrayBuffer(newSize));if(oldContents){node.contents.set(oldContents.subarray(0,Math.min(newSize,node.usedBytes)))}node.usedBytes=newSize;return}if(!node.contents)node.contents=[];if(node.contents.length>newSize)node.contents.length=newSize;else while(node.contents.length<newSize)node.contents.push(0);node.usedBytes=newSize}),node_ops:{getattr:(function(node){var attr={};attr.dev=FS.isChrdev(node.mode)?node.id:1;attr.ino=node.id;attr.mode=node.mode;attr.nlink=1;attr.uid=0;attr.gid=0;attr.rdev=node.rdev;if(FS.isDir(node.mode)){attr.size=4096}else if(FS.isFile(node.mode)){attr.size=node.usedBytes}else if(FS.isLink(node.mode)){attr.size=node.link.length}else{attr.size=0}attr.atime=new Date(node.timestamp);attr.mtime=new Date(node.timestamp);attr.ctime=new Date(node.timestamp);attr.blksize=4096;attr.blocks=Math.ceil(attr.size/attr.blksize);return attr}),setattr:(function(node,attr){if(attr.mode!==undefined){node.mode=attr.mode}if(attr.timestamp!==undefined){node.timestamp=attr.timestamp}if(attr.size!==undefined){MEMFS.resizeFileStorage(node,attr.size)}}),lookup:(function(parent,name){throw FS.genericErrors[ERRNO_CODES.ENOENT]}),mknod:(function(parent,name,mode,dev){return MEMFS.createNode(parent,name,mode,dev)}),rename:(function(old_node,new_dir,new_name){if(FS.isDir(old_node.mode)){var new_node;try{new_node=FS.lookupNode(new_dir,new_name)}catch(e){}if(new_node){for(var i in new_node.contents){throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY)}}}delete old_node.parent.contents[old_node.name];old_node.name=new_name;new_dir.contents[new_name]=old_node;old_node.parent=new_dir}),unlink:(function(parent,name){delete parent.contents[name]}),rmdir:(function(parent,name){var node=FS.lookupNode(parent,name);for(var i in node.contents){throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY)}delete parent.contents[name]}),readdir:(function(node){var entries=[".",".."];for(var key in node.contents){if(!node.contents.hasOwnProperty(key)){continue}entries.push(key)}return entries}),symlink:(function(parent,newname,oldpath){var node=MEMFS.createNode(parent,newname,511|40960,0);node.link=oldpath;return node}),readlink:(function(node){if(!FS.isLink(node.mode)){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}return node.link})},stream_ops:{read:(function(stream,buffer,offset,length,position){var contents=stream.node.contents;if(position>=stream.node.usedBytes)return 0;var size=Math.min(stream.node.usedBytes-position,length);assert(size>=0);if(size>8&&contents.subarray){buffer.set(contents.subarray(position,position+size),offset)}else{for(var i=0;i<size;i++)buffer[offset+i]=contents[position+i]}return size}),write:(function(stream,buffer,offset,length,position,canOwn){if(!length)return 0;var node=stream.node;node.timestamp=Date.now();if(buffer.subarray&&(!node.contents||node.contents.subarray)){if(canOwn){node.contents=buffer.subarray(offset,offset+length);node.usedBytes=length;return length}else if(node.usedBytes===0&&position===0){node.contents=new Uint8Array(buffer.subarray(offset,offset+length));node.usedBytes=length;return length}else if(position+length<=node.usedBytes){node.contents.set(buffer.subarray(offset,offset+length),position);return length}}MEMFS.expandFileStorage(node,position+length);if(node.contents.subarray&&buffer.subarray)node.contents.set(buffer.subarray(offset,offset+length),position);else for(var i=0;i<length;i++){node.contents[position+i]=buffer[offset+i]}node.usedBytes=Math.max(node.usedBytes,position+length);return length}),llseek:(function(stream,offset,whence){var position=offset;if(whence===1){position+=stream.position}else if(whence===2){if(FS.isFile(stream.node.mode)){position+=stream.node.usedBytes}}if(position<0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}return position}),allocate:(function(stream,offset,length){MEMFS.expandFileStorage(stream.node,offset+length);stream.node.usedBytes=Math.max(stream.node.usedBytes,offset+length)}),mmap:(function(stream,buffer,offset,length,position,prot,flags){if(!FS.isFile(stream.node.mode)){throw new FS.ErrnoError(ERRNO_CODES.ENODEV)}var ptr;var allocated;var contents=stream.node.contents;if(!(flags&2)&&(contents.buffer===buffer||contents.buffer===buffer.buffer)){allocated=false;ptr=contents.byteOffset}else{if(position>0||position+length<stream.node.usedBytes){if(contents.subarray){contents=contents.subarray(position,position+length)}else{contents=Array.prototype.slice.call(contents,position,position+length)}}allocated=true;ptr=_malloc(length);if(!ptr){throw new FS.ErrnoError(ERRNO_CODES.ENOMEM)}buffer.set(contents,ptr)}return{ptr:ptr,allocated:allocated}})}};var IDBFS={dbs:{},indexedDB:(function(){if(typeof indexedDB!=="undefined")return indexedDB;var ret=null;if(typeof window==="object")ret=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;assert(ret,"IDBFS used, but indexedDB not supported");return ret}),DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:(function(mount){return MEMFS.mount.apply(null,arguments)}),syncfs:(function(mount,populate,callback){IDBFS.getLocalSet(mount,(function(err,local){if(err)return callback(err);IDBFS.getRemoteSet(mount,(function(err,remote){if(err)return callback(err);var src=populate?remote:local;var dst=populate?local:remote;IDBFS.reconcile(src,dst,callback)}))}))}),getDB:(function(name,callback){var db=IDBFS.dbs[name];if(db){return callback(null,db)}var req;try{req=IDBFS.indexedDB().open(name,IDBFS.DB_VERSION)}catch(e){return callback(e)}req.onupgradeneeded=(function(e){var db=e.target.result;var transaction=e.target.transaction;var fileStore;if(db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)){fileStore=transaction.objectStore(IDBFS.DB_STORE_NAME)}else{fileStore=db.createObjectStore(IDBFS.DB_STORE_NAME)}fileStore.createIndex("timestamp","timestamp",{unique:false})});req.onsuccess=(function(){db=req.result;IDBFS.dbs[name]=db;callback(null,db)});req.onerror=(function(){callback(this.error)})}),getLocalSet:(function(mount,callback){var entries={};function isRealDir(p){return p!=="."&&p!==".."}function toAbsolute(root){return(function(p){return PATH.join2(root,p)})}var check=FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));while(check.length){var path=check.pop();var stat;try{stat=FS.stat(path)}catch(e){return callback(e)}if(FS.isDir(stat.mode)){check.push.apply(check,FS.readdir(path).filter(isRealDir).map(toAbsolute(path)))}entries[path]={timestamp:stat.mtime}}return callback(null,{type:"local",entries:entries})}),getRemoteSet:(function(mount,callback){var entries={};IDBFS.getDB(mount.mountpoint,(function(err,db){if(err)return callback(err);var transaction=db.transaction([IDBFS.DB_STORE_NAME],"readonly");transaction.onerror=(function(){callback(this.error)});var store=transaction.objectStore(IDBFS.DB_STORE_NAME);var index=store.index("timestamp");index.openKeyCursor().onsuccess=(function(event){var cursor=event.target.result;if(!cursor){return callback(null,{type:"remote",db:db,entries:entries})}entries[cursor.primaryKey]={timestamp:cursor.key};cursor.continue()})}))}),loadLocalEntry:(function(path,callback){var stat,node;try{var lookup=FS.lookupPath(path);node=lookup.node;stat=FS.stat(path)}catch(e){return callback(e)}if(FS.isDir(stat.mode)){return callback(null,{timestamp:stat.mtime,mode:stat.mode})}else if(FS.isFile(stat.mode)){node.contents=MEMFS.getFileDataAsTypedArray(node);return callback(null,{timestamp:stat.mtime,mode:stat.mode,contents:node.contents})}else{return callback(new Error("node type not supported"))}}),storeLocalEntry:(function(path,entry,callback){try{if(FS.isDir(entry.mode)){FS.mkdir(path,entry.mode)}else if(FS.isFile(entry.mode)){FS.writeFile(path,entry.contents,{encoding:"binary",canOwn:true})}else{return callback(new Error("node type not supported"))}FS.chmod(path,entry.mode);FS.utime(path,entry.timestamp,entry.timestamp)}catch(e){return callback(e)}callback(null)}),removeLocalEntry:(function(path,callback){try{var lookup=FS.lookupPath(path);var stat=FS.stat(path);if(FS.isDir(stat.mode)){FS.rmdir(path)}else if(FS.isFile(stat.mode)){FS.unlink(path)}}catch(e){return callback(e)}callback(null)}),loadRemoteEntry:(function(store,path,callback){var req=store.get(path);req.onsuccess=(function(event){callback(null,event.target.result)});req.onerror=(function(){callback(this.error)})}),storeRemoteEntry:(function(store,path,entry,callback){var req=store.put(entry,path);req.onsuccess=(function(){callback(null)});req.onerror=(function(){callback(this.error)})}),removeRemoteEntry:(function(store,path,callback){var req=store.delete(path);req.onsuccess=(function(){callback(null)});req.onerror=(function(){callback(this.error)})}),reconcile:(function(src,dst,callback){var total=0;var create=[];Object.keys(src.entries).forEach((function(key){var e=src.entries[key];var e2=dst.entries[key];if(!e2||e.timestamp>e2.timestamp){create.push(key);total++}}));var remove=[];Object.keys(dst.entries).forEach((function(key){var e=dst.entries[key];var e2=src.entries[key];if(!e2){remove.push(key);total++}}));if(!total){return callback(null)}var errored=false;var completed=0;var db=src.type==="remote"?src.db:dst.db;var transaction=db.transaction([IDBFS.DB_STORE_NAME],"readwrite");var store=transaction.objectStore(IDBFS.DB_STORE_NAME);function done(err){if(err){if(!done.errored){done.errored=true;return callback(err)}return}if(++completed>=total){return callback(null)}}transaction.onerror=(function(){done(this.error)});create.sort().forEach((function(path){if(dst.type==="local"){IDBFS.loadRemoteEntry(store,path,(function(err,entry){if(err)return done(err);IDBFS.storeLocalEntry(path,entry,done)}))}else{IDBFS.loadLocalEntry(path,(function(err,entry){if(err)return done(err);IDBFS.storeRemoteEntry(store,path,entry,done)}))}}));remove.sort().reverse().forEach((function(path){if(dst.type==="local"){IDBFS.removeLocalEntry(path,done)}else{IDBFS.removeRemoteEntry(store,path,done)}}))})};var NODEFS={isWindows:false,staticInit:(function(){NODEFS.isWindows=!!process.platform.match(/^win/)}),mount:(function(mount){assert(ENVIRONMENT_IS_NODE);return NODEFS.createNode(null,"/",NODEFS.getMode(mount.opts.root),0)}),createNode:(function(parent,name,mode,dev){if(!FS.isDir(mode)&&!FS.isFile(mode)&&!FS.isLink(mode)){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}var node=FS.createNode(parent,name,mode);node.node_ops=NODEFS.node_ops;node.stream_ops=NODEFS.stream_ops;return node}),getMode:(function(path){var stat;try{stat=fs.lstatSync(path);if(NODEFS.isWindows){stat.mode=stat.mode|(stat.mode&146)>>1}}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}return stat.mode}),realPath:(function(node){var parts=[];while(node.parent!==node){parts.push(node.name);node=node.parent}parts.push(node.mount.opts.root);parts.reverse();return PATH.join.apply(null,parts)}),flagsToPermissionStringMap:{0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},flagsToPermissionString:(function(flags){if(flags in NODEFS.flagsToPermissionStringMap){return NODEFS.flagsToPermissionStringMap[flags]}else{return flags}}),node_ops:{getattr:(function(node){var path=NODEFS.realPath(node);var stat;try{stat=fs.lstatSync(path)}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}if(NODEFS.isWindows&&!stat.blksize){stat.blksize=4096}if(NODEFS.isWindows&&!stat.blocks){stat.blocks=(stat.size+stat.blksize-1)/stat.blksize|0}return{dev:stat.dev,ino:stat.ino,mode:stat.mode,nlink:stat.nlink,uid:stat.uid,gid:stat.gid,rdev:stat.rdev,size:stat.size,atime:stat.atime,mtime:stat.mtime,ctime:stat.ctime,blksize:stat.blksize,blocks:stat.blocks}}),setattr:(function(node,attr){var path=NODEFS.realPath(node);try{if(attr.mode!==undefined){fs.chmodSync(path,attr.mode);node.mode=attr.mode}if(attr.timestamp!==undefined){var date=new Date(attr.timestamp);fs.utimesSync(path,date,date)}if(attr.size!==undefined){fs.truncateSync(path,attr.size)}}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),lookup:(function(parent,name){var path=PATH.join2(NODEFS.realPath(parent),name);var mode=NODEFS.getMode(path);return NODEFS.createNode(parent,name,mode)}),mknod:(function(parent,name,mode,dev){var node=NODEFS.createNode(parent,name,mode,dev);var path=NODEFS.realPath(node);try{if(FS.isDir(node.mode)){fs.mkdirSync(path,node.mode)}else{fs.writeFileSync(path,"",{mode:node.mode})}}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}return node}),rename:(function(oldNode,newDir,newName){var oldPath=NODEFS.realPath(oldNode);var newPath=PATH.join2(NODEFS.realPath(newDir),newName);try{fs.renameSync(oldPath,newPath)}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),unlink:(function(parent,name){var path=PATH.join2(NODEFS.realPath(parent),name);try{fs.unlinkSync(path)}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),rmdir:(function(parent,name){var path=PATH.join2(NODEFS.realPath(parent),name);try{fs.rmdirSync(path)}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),readdir:(function(node){var path=NODEFS.realPath(node);try{return fs.readdirSync(path)}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),symlink:(function(parent,newName,oldPath){var newPath=PATH.join2(NODEFS.realPath(parent),newName);try{fs.symlinkSync(oldPath,newPath)}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),readlink:(function(node){var path=NODEFS.realPath(node);try{return fs.readlinkSync(path)}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}})},stream_ops:{open:(function(stream){var path=NODEFS.realPath(stream.node);try{if(FS.isFile(stream.node.mode)){stream.nfd=fs.openSync(path,NODEFS.flagsToPermissionString(stream.flags))}}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),close:(function(stream){try{if(FS.isFile(stream.node.mode)&&stream.nfd){fs.closeSync(stream.nfd)}}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(ERRNO_CODES[e.code])}}),read:(function(stream,buffer,offset,length,position){if(length===0)return 0;var nbuffer=new Buffer(length);var res;try{res=fs.readSync(stream.nfd,nbuffer,0,length,position)}catch(e){throw new FS.ErrnoError(ERRNO_CODES[e.code])}if(res>0){for(var i=0;i<res;i++){buffer[offset+i]=nbuffer[i]}}return res}),write:(function(stream,buffer,offset,length,position){var nbuffer=new Buffer(buffer.subarray(offset,offset+length));var res;try{res=fs.writeSync(stream.nfd,nbuffer,0,length,position)}catch(e){throw new FS.ErrnoError(ERRNO_CODES[e.code])}return res}),llseek:(function(stream,offset,whence){var position=offset;if(whence===1){position+=stream.position}else if(whence===2){if(FS.isFile(stream.node.mode)){try{var stat=fs.fstatSync(stream.nfd);position+=stat.size}catch(e){throw new FS.ErrnoError(ERRNO_CODES[e.code])}}}if(position<0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}return position})}};var _stdin=allocate(1,"i32*",ALLOC_STATIC);var _stdout=allocate(1,"i32*",ALLOC_STATIC);var _stderr=allocate(1,"i32*",ALLOC_STATIC);var FS={root:null,mounts:[],devices:[null],streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,trackingDelegate:{},tracking:{openFlags:{READ:1,WRITE:2}},ErrnoError:null,genericErrors:{},handleFSError:(function(e){if(!(e instanceof FS.ErrnoError))throw e+" : "+stackTrace();return ___setErrNo(e.errno)}),lookupPath:(function(path,opts){path=PATH.resolve(FS.cwd(),path);opts=opts||{};if(!path)return{path:"",node:null};var defaults={follow_mount:true,recurse_count:0};for(var key in defaults){if(opts[key]===undefined){opts[key]=defaults[key]}}if(opts.recurse_count>8){throw new FS.ErrnoError(ERRNO_CODES.ELOOP)}var parts=PATH.normalizeArray(path.split("/").filter((function(p){return!!p})),false);var current=FS.root;var current_path="/";for(var i=0;i<parts.length;i++){var islast=i===parts.length-1;if(islast&&opts.parent){break}current=FS.lookupNode(current,parts[i]);current_path=PATH.join2(current_path,parts[i]);if(FS.isMountpoint(current)){if(!islast||islast&&opts.follow_mount){current=current.mounted.root}}if(!islast||opts.follow){var count=0;while(FS.isLink(current.mode)){var link=FS.readlink(current_path);current_path=PATH.resolve(PATH.dirname(current_path),link);var lookup=FS.lookupPath(current_path,{recurse_count:opts.recurse_count});current=lookup.node;if(count++>40){throw new FS.ErrnoError(ERRNO_CODES.ELOOP)}}}}return{path:current_path,node:current}}),getPath:(function(node){var path;while(true){if(FS.isRoot(node)){var mount=node.mount.mountpoint;if(!path)return mount;return mount[mount.length-1]!=="/"?mount+"/"+path:mount+path}path=path?node.name+"/"+path:node.name;node=node.parent}}),hashName:(function(parentid,name){var hash=0;for(var i=0;i<name.length;i++){hash=(hash<<5)-hash+name.charCodeAt(i)|0}return(parentid+hash>>>0)%FS.nameTable.length}),hashAddNode:(function(node){var hash=FS.hashName(node.parent.id,node.name);node.name_next=FS.nameTable[hash];FS.nameTable[hash]=node}),hashRemoveNode:(function(node){var hash=FS.hashName(node.parent.id,node.name);if(FS.nameTable[hash]===node){FS.nameTable[hash]=node.name_next}else{var current=FS.nameTable[hash];while(current){if(current.name_next===node){current.name_next=node.name_next;break}current=current.name_next}}}),lookupNode:(function(parent,name){var err=FS.mayLookup(parent);if(err){throw new FS.ErrnoError(err,parent)}var hash=FS.hashName(parent.id,name);for(var node=FS.nameTable[hash];node;node=node.name_next){var nodeName=node.name;if(node.parent.id===parent.id&&nodeName===name){return node}}return FS.lookup(parent,name)}),createNode:(function(parent,name,mode,rdev){if(!FS.FSNode){FS.FSNode=(function(parent,name,mode,rdev){if(!parent){parent=this}this.parent=parent;this.mount=parent.mount;this.mounted=null;this.id=FS.nextInode++;this.name=name;this.mode=mode;this.node_ops={};this.stream_ops={};this.rdev=rdev});FS.FSNode.prototype={};var readMode=292|73;var writeMode=146;Object.defineProperties(FS.FSNode.prototype,{read:{get:(function(){return(this.mode&readMode)===readMode}),set:(function(val){val?this.mode|=readMode:this.mode&=~readMode})},write:{get:(function(){return(this.mode&writeMode)===writeMode}),set:(function(val){val?this.mode|=writeMode:this.mode&=~writeMode})},isFolder:{get:(function(){return FS.isDir(this.mode)})},isDevice:{get:(function(){return FS.isChrdev(this.mode)})}})}var node=new FS.FSNode(parent,name,mode,rdev);FS.hashAddNode(node);return node}),destroyNode:(function(node){FS.hashRemoveNode(node)}),isRoot:(function(node){return node===node.parent}),isMountpoint:(function(node){return!!node.mounted}),isFile:(function(mode){return(mode&61440)===32768}),isDir:(function(mode){return(mode&61440)===16384}),isLink:(function(mode){return(mode&61440)===40960}),isChrdev:(function(mode){return(mode&61440)===8192}),isBlkdev:(function(mode){return(mode&61440)===24576}),isFIFO:(function(mode){return(mode&61440)===4096}),isSocket:(function(mode){return(mode&49152)===49152}),flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:(function(str){var flags=FS.flagModes[str];if(typeof flags==="undefined"){throw new Error("Unknown file open mode: "+str)}return flags}),flagsToPermissionString:(function(flag){var accmode=flag&2097155;var perms=["r","w","rw"][accmode];if(flag&512){perms+="w"}return perms}),nodePermissions:(function(node,perms){if(FS.ignorePermissions){return 0}if(perms.indexOf("r")!==-1&&!(node.mode&292)){return ERRNO_CODES.EACCES}else if(perms.indexOf("w")!==-1&&!(node.mode&146)){return ERRNO_CODES.EACCES}else if(perms.indexOf("x")!==-1&&!(node.mode&73)){return ERRNO_CODES.EACCES}return 0}),mayLookup:(function(dir){var err=FS.nodePermissions(dir,"x");if(err)return err;if(!dir.node_ops.lookup)return ERRNO_CODES.EACCES;return 0}),mayCreate:(function(dir,name){try{var node=FS.lookupNode(dir,name);return ERRNO_CODES.EEXIST}catch(e){}return FS.nodePermissions(dir,"wx")}),mayDelete:(function(dir,name,isdir){var node;try{node=FS.lookupNode(dir,name)}catch(e){return e.errno}var err=FS.nodePermissions(dir,"wx");if(err){return err}if(isdir){if(!FS.isDir(node.mode)){return ERRNO_CODES.ENOTDIR}if(FS.isRoot(node)||FS.getPath(node)===FS.cwd()){return ERRNO_CODES.EBUSY}}else{if(FS.isDir(node.mode)){return ERRNO_CODES.EISDIR}}return 0}),mayOpen:(function(node,flags){if(!node){return ERRNO_CODES.ENOENT}if(FS.isLink(node.mode)){return ERRNO_CODES.ELOOP}else if(FS.isDir(node.mode)){if((flags&2097155)!==0||flags&512){return ERRNO_CODES.EISDIR}}return FS.nodePermissions(node,FS.flagsToPermissionString(flags))}),MAX_OPEN_FDS:4096,nextfd:(function(fd_start,fd_end){fd_start=fd_start||0;fd_end=fd_end||FS.MAX_OPEN_FDS;for(var fd=fd_start;fd<=fd_end;fd++){if(!FS.streams[fd]){return fd}}throw new FS.ErrnoError(ERRNO_CODES.EMFILE)}),getStream:(function(fd){return FS.streams[fd]}),createStream:(function(stream,fd_start,fd_end){if(!FS.FSStream){FS.FSStream=(function(){});FS.FSStream.prototype={};Object.defineProperties(FS.FSStream.prototype,{object:{get:(function(){return this.node}),set:(function(val){this.node=val})},isRead:{get:(function(){return(this.flags&2097155)!==1})},isWrite:{get:(function(){return(this.flags&2097155)!==0})},isAppend:{get:(function(){return this.flags&1024})}})}var newStream=new FS.FSStream;for(var p in stream){newStream[p]=stream[p]}stream=newStream;var fd=FS.nextfd(fd_start,fd_end);stream.fd=fd;FS.streams[fd]=stream;return stream}),closeStream:(function(fd){FS.streams[fd]=null}),getStreamFromPtr:(function(ptr){return FS.streams[ptr-1]}),getPtrForStream:(function(stream){return stream?stream.fd+1:0}),chrdev_stream_ops:{open:(function(stream){var device=FS.getDevice(stream.node.rdev);stream.stream_ops=device.stream_ops;if(stream.stream_ops.open){stream.stream_ops.open(stream)}}),llseek:(function(){throw new FS.ErrnoError(ERRNO_CODES.ESPIPE)})},major:(function(dev){return dev>>8}),minor:(function(dev){return dev&255}),makedev:(function(ma,mi){return ma<<8|mi}),registerDevice:(function(dev,ops){FS.devices[dev]={stream_ops:ops}}),getDevice:(function(dev){return FS.devices[dev]}),getMounts:(function(mount){var mounts=[];var check=[mount];while(check.length){var m=check.pop();mounts.push(m);check.push.apply(check,m.mounts)}return mounts}),syncfs:(function(populate,callback){if(typeof populate==="function"){callback=populate;populate=false}var mounts=FS.getMounts(FS.root.mount);var completed=0;function done(err){if(err){if(!done.errored){done.errored=true;return callback(err)}return}if(++completed>=mounts.length){callback(null)}}mounts.forEach((function(mount){if(!mount.type.syncfs){return done(null)}mount.type.syncfs(mount,populate,done)}))}),mount:(function(type,opts,mountpoint){var root=mountpoint==="/";var pseudo=!mountpoint;var node;if(root&&FS.root){throw new FS.ErrnoError(ERRNO_CODES.EBUSY)}else if(!root&&!pseudo){var lookup=FS.lookupPath(mountpoint,{follow_mount:false});mountpoint=lookup.path;node=lookup.node;if(FS.isMountpoint(node)){throw new FS.ErrnoError(ERRNO_CODES.EBUSY)}if(!FS.isDir(node.mode)){throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR)}}var mount={type:type,opts:opts,mountpoint:mountpoint,mounts:[]};var mountRoot=type.mount(mount);mountRoot.mount=mount;mount.root=mountRoot;if(root){FS.root=mountRoot}else if(node){node.mounted=mount;if(node.mount){node.mount.mounts.push(mount)}}return mountRoot}),unmount:(function(mountpoint){var lookup=FS.lookupPath(mountpoint,{follow_mount:false});if(!FS.isMountpoint(lookup.node)){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}var node=lookup.node;var mount=node.mounted;var mounts=FS.getMounts(mount);Object.keys(FS.nameTable).forEach((function(hash){var current=FS.nameTable[hash];while(current){var next=current.name_next;if(mounts.indexOf(current.mount)!==-1){FS.destroyNode(current)}current=next}}));node.mounted=null;var idx=node.mount.mounts.indexOf(mount);assert(idx!==-1);node.mount.mounts.splice(idx,1)}),lookup:(function(parent,name){return parent.node_ops.lookup(parent,name)}),mknod:(function(path,mode,dev){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);if(!name||name==="."||name===".."){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}var err=FS.mayCreate(parent,name);if(err){throw new FS.ErrnoError(err)}if(!parent.node_ops.mknod){throw new FS.ErrnoError(ERRNO_CODES.EPERM)}return parent.node_ops.mknod(parent,name,mode,dev)}),create:(function(path,mode){mode=mode!==undefined?mode:438;mode&=4095;mode|=32768;return FS.mknod(path,mode,0)}),mkdir:(function(path,mode){mode=mode!==undefined?mode:511;mode&=511|512;mode|=16384;return FS.mknod(path,mode,0)}),mkdev:(function(path,mode,dev){if(typeof dev==="undefined"){dev=mode;mode=438}mode|=8192;return FS.mknod(path,mode,dev)}),symlink:(function(oldpath,newpath){if(!PATH.resolve(oldpath)){throw new FS.ErrnoError(ERRNO_CODES.ENOENT)}var lookup=FS.lookupPath(newpath,{parent:true});var parent=lookup.node;if(!parent){throw new FS.ErrnoError(ERRNO_CODES.ENOENT)}var newname=PATH.basename(newpath);var err=FS.mayCreate(parent,newname);if(err){throw new FS.ErrnoError(err)}if(!parent.node_ops.symlink){throw new FS.ErrnoError(ERRNO_CODES.EPERM)}return parent.node_ops.symlink(parent,newname,oldpath)}),rename:(function(old_path,new_path){var old_dirname=PATH.dirname(old_path);var new_dirname=PATH.dirname(new_path);var old_name=PATH.basename(old_path);var new_name=PATH.basename(new_path);var lookup,old_dir,new_dir;try{lookup=FS.lookupPath(old_path,{parent:true});old_dir=lookup.node;lookup=FS.lookupPath(new_path,{parent:true});new_dir=lookup.node}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EBUSY)}if(!old_dir||!new_dir)throw new FS.ErrnoError(ERRNO_CODES.ENOENT);if(old_dir.mount!==new_dir.mount){throw new FS.ErrnoError(ERRNO_CODES.EXDEV)}var old_node=FS.lookupNode(old_dir,old_name);var relative=PATH.relative(old_path,new_dirname);if(relative.charAt(0)!=="."){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}relative=PATH.relative(new_path,old_dirname);if(relative.charAt(0)!=="."){throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY)}var new_node;try{new_node=FS.lookupNode(new_dir,new_name)}catch(e){}if(old_node===new_node){return}var isdir=FS.isDir(old_node.mode);var err=FS.mayDelete(old_dir,old_name,isdir);if(err){throw new FS.ErrnoError(err)}err=new_node?FS.mayDelete(new_dir,new_name,isdir):FS.mayCreate(new_dir,new_name);if(err){throw new FS.ErrnoError(err)}if(!old_dir.node_ops.rename){throw new FS.ErrnoError(ERRNO_CODES.EPERM)}if(FS.isMountpoint(old_node)||new_node&&FS.isMountpoint(new_node)){throw new FS.ErrnoError(ERRNO_CODES.EBUSY)}if(new_dir!==old_dir){err=FS.nodePermissions(old_dir,"w");if(err){throw new FS.ErrnoError(err)}}try{if(FS.trackingDelegate["willMovePath"]){FS.trackingDelegate["willMovePath"](old_path,new_path)}}catch(e){console.log("FS.trackingDelegate['willMovePath']('"+old_path+"', '"+new_path+"') threw an exception: "+e.message)}FS.hashRemoveNode(old_node);try{old_dir.node_ops.rename(old_node,new_dir,new_name)}catch(e){throw e}finally{FS.hashAddNode(old_node)}try{if(FS.trackingDelegate["onMovePath"])FS.trackingDelegate["onMovePath"](old_path,new_path)}catch(e){console.log("FS.trackingDelegate['onMovePath']('"+old_path+"', '"+new_path+"') threw an exception: "+e.message)}}),rmdir:(function(path){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var err=FS.mayDelete(parent,name,true);if(err){throw new FS.ErrnoError(err)}if(!parent.node_ops.rmdir){throw new FS.ErrnoError(ERRNO_CODES.EPERM)}if(FS.isMountpoint(node)){throw new FS.ErrnoError(ERRNO_CODES.EBUSY)}try{if(FS.trackingDelegate["willDeletePath"]){FS.trackingDelegate["willDeletePath"](path)}}catch(e){console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: "+e.message)}parent.node_ops.rmdir(parent,name);FS.destroyNode(node);try{if(FS.trackingDelegate["onDeletePath"])FS.trackingDelegate["onDeletePath"](path)}catch(e){console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: "+e.message)}}),readdir:(function(path){var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;if(!node.node_ops.readdir){throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR)}return node.node_ops.readdir(node)}),unlink:(function(path){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var err=FS.mayDelete(parent,name,false);if(err){if(err===ERRNO_CODES.EISDIR)err=ERRNO_CODES.EPERM;throw new FS.ErrnoError(err)}if(!parent.node_ops.unlink){throw new FS.ErrnoError(ERRNO_CODES.EPERM)}if(FS.isMountpoint(node)){throw new FS.ErrnoError(ERRNO_CODES.EBUSY)}try{if(FS.trackingDelegate["willDeletePath"]){FS.trackingDelegate["willDeletePath"](path)}}catch(e){console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: "+e.message)}parent.node_ops.unlink(parent,name);FS.destroyNode(node);try{if(FS.trackingDelegate["onDeletePath"])FS.trackingDelegate["onDeletePath"](path)}catch(e){console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: "+e.message)}}),readlink:(function(path){var lookup=FS.lookupPath(path);var link=lookup.node;if(!link){throw new FS.ErrnoError(ERRNO_CODES.ENOENT)}if(!link.node_ops.readlink){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}return link.node_ops.readlink(link)}),stat:(function(path,dontFollow){var lookup=FS.lookupPath(path,{follow:!dontFollow});var node=lookup.node;if(!node){throw new FS.ErrnoError(ERRNO_CODES.ENOENT)}if(!node.node_ops.getattr){throw new FS.ErrnoError(ERRNO_CODES.EPERM)}return node.node_ops.getattr(node)}),lstat:(function(path){return FS.stat(path,true)}),chmod:(function(path,mode,dontFollow){var node;if(typeof path==="string"){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node}else{node=path}if(!node.node_ops.setattr){throw new FS.ErrnoError(ERRNO_CODES.EPERM)}node.node_ops.setattr(node,{mode:mode&4095|node.mode&~4095,timestamp:Date.now()})}),lchmod:(function(path,mode){FS.chmod(path,mode,true)}),fchmod:(function(fd,mode){var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(ERRNO_CODES.EBADF)}FS.chmod(stream.node,mode)}),chown:(function(path,uid,gid,dontFollow){var node;if(typeof path==="string"){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node}else{node=path}if(!node.node_ops.setattr){throw new FS.ErrnoError(ERRNO_CODES.EPERM)}node.node_ops.setattr(node,{timestamp:Date.now()})}),lchown:(function(path,uid,gid){FS.chown(path,uid,gid,true)}),fchown:(function(fd,uid,gid){var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(ERRNO_CODES.EBADF)}FS.chown(stream.node,uid,gid)}),truncate:(function(path,len){if(len<0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}var node;if(typeof path==="string"){var lookup=FS.lookupPath(path,{follow:true});node=lookup.node}else{node=path}if(!node.node_ops.setattr){throw new FS.ErrnoError(ERRNO_CODES.EPERM)}if(FS.isDir(node.mode)){throw new FS.ErrnoError(ERRNO_CODES.EISDIR)}if(!FS.isFile(node.mode)){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}var err=FS.nodePermissions(node,"w");if(err){throw new FS.ErrnoError(err)}node.node_ops.setattr(node,{size:len,timestamp:Date.now()})}),ftruncate:(function(fd,len){var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(ERRNO_CODES.EBADF)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}FS.truncate(stream.node,len)}),utime:(function(path,atime,mtime){var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;node.node_ops.setattr(node,{timestamp:Math.max(atime,mtime)})}),open:(function(path,flags,mode,fd_start,fd_end){if(path===""){throw new FS.ErrnoError(ERRNO_CODES.ENOENT)}flags=typeof flags==="string"?FS.modeStringToFlags(flags):flags;mode=typeof mode==="undefined"?438:mode;if(flags&64){mode=mode&4095|32768}else{mode=0}var node;if(typeof path==="object"){node=path}else{path=PATH.normalize(path);try{var lookup=FS.lookupPath(path,{follow:!(flags&131072)});node=lookup.node}catch(e){}}var created=false;if(flags&64){if(node){if(flags&128){throw new FS.ErrnoError(ERRNO_CODES.EEXIST)}}else{node=FS.mknod(path,mode,0);created=true}}if(!node){throw new FS.ErrnoError(ERRNO_CODES.ENOENT)}if(FS.isChrdev(node.mode)){flags&=~512}if(!created){var err=FS.mayOpen(node,flags);if(err){throw new FS.ErrnoError(err)}}if(flags&512){FS.truncate(node,0)}flags&=~(128|512);var stream=FS.createStream({node:node,path:FS.getPath(node),flags:flags,seekable:true,position:0,stream_ops:node.stream_ops,ungotten:[],error:false},fd_start,fd_end);if(stream.stream_ops.open){stream.stream_ops.open(stream)}if(Module["logReadFiles"]&&!(flags&1)){if(!FS.readFiles)FS.readFiles={};if(!(path in FS.readFiles)){FS.readFiles[path]=1;Module["printErr"]("read file: "+path)}}try{if(FS.trackingDelegate["onOpenFile"]){var trackingFlags=0;if((flags&2097155)!==1){trackingFlags|=FS.tracking.openFlags.READ}if((flags&2097155)!==0){trackingFlags|=FS.tracking.openFlags.WRITE}FS.trackingDelegate["onOpenFile"](path,trackingFlags)}}catch(e){console.log("FS.trackingDelegate['onOpenFile']('"+path+"', flags) threw an exception: "+e.message)}return stream}),close:(function(stream){try{if(stream.stream_ops.close){stream.stream_ops.close(stream)}}catch(e){throw e}finally{FS.closeStream(stream.fd)}}),llseek:(function(stream,offset,whence){if(!stream.seekable||!stream.stream_ops.llseek){throw new FS.ErrnoError(ERRNO_CODES.ESPIPE)}stream.position=stream.stream_ops.llseek(stream,offset,whence);stream.ungotten=[];return stream.position}),read:(function(stream,buffer,offset,length,position){if(length<0||position<0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}if((stream.flags&2097155)===1){throw new FS.ErrnoError(ERRNO_CODES.EBADF)}if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(ERRNO_CODES.EISDIR)}if(!stream.stream_ops.read){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}var seeking=true;if(typeof position==="undefined"){position=stream.position;seeking=false}else if(!stream.seekable){throw new FS.ErrnoError(ERRNO_CODES.ESPIPE)}var bytesRead=stream.stream_ops.read(stream,buffer,offset,length,position);if(!seeking)stream.position+=bytesRead;return bytesRead}),write:(function(stream,buffer,offset,length,position,canOwn){if(length<0||position<0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(ERRNO_CODES.EBADF)}if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(ERRNO_CODES.EISDIR)}if(!stream.stream_ops.write){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}if(stream.flags&1024){FS.llseek(stream,0,2)}var seeking=true;if(typeof position==="undefined"){position=stream.position;seeking=false}else if(!stream.seekable){throw new FS.ErrnoError(ERRNO_CODES.ESPIPE)}var bytesWritten=stream.stream_ops.write(stream,buffer,offset,length,position,canOwn);if(!seeking)stream.position+=bytesWritten;try{if(stream.path&&FS.trackingDelegate["onWriteToFile"])FS.trackingDelegate["onWriteToFile"](stream.path)}catch(e){console.log("FS.trackingDelegate['onWriteToFile']('"+path+"') threw an exception: "+e.message)}return bytesWritten}),allocate:(function(stream,offset,length){if(offset<0||length<=0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(ERRNO_CODES.EBADF)}if(!FS.isFile(stream.node.mode)&&!FS.isDir(node.mode)){throw new FS.ErrnoError(ERRNO_CODES.ENODEV)}if(!stream.stream_ops.allocate){throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP)}stream.stream_ops.allocate(stream,offset,length)}),mmap:(function(stream,buffer,offset,length,position,prot,flags){if((stream.flags&2097155)===1){throw new FS.ErrnoError(ERRNO_CODES.EACCES)}if(!stream.stream_ops.mmap){throw new FS.ErrnoError(ERRNO_CODES.ENODEV)}return stream.stream_ops.mmap(stream,buffer,offset,length,position,prot,flags)}),ioctl:(function(stream,cmd,arg){if(!stream.stream_ops.ioctl){throw new FS.ErrnoError(ERRNO_CODES.ENOTTY)}return stream.stream_ops.ioctl(stream,cmd,arg)}),readFile:(function(path,opts){opts=opts||{};opts.flags=opts.flags||"r";opts.encoding=opts.encoding||"binary";if(opts.encoding!=="utf8"&&opts.encoding!=="binary"){throw new Error('Invalid encoding type "'+opts.encoding+'"')}var ret;var stream=FS.open(path,opts.flags);var stat=FS.stat(path);var length=stat.size;var buf=new Uint8Array(length);FS.read(stream,buf,0,length,0);if(opts.encoding==="utf8"){ret="";var utf8=new Runtime.UTF8Processor;for(var i=0;i<length;i++){ret+=utf8.processCChar(buf[i])}}else if(opts.encoding==="binary"){ret=buf}FS.close(stream);return ret}),writeFile:(function(path,data,opts){opts=opts||{};opts.flags=opts.flags||"w";opts.encoding=opts.encoding||"utf8";if(opts.encoding!=="utf8"&&opts.encoding!=="binary"){throw new Error('Invalid encoding type "'+opts.encoding+'"')}var stream=FS.open(path,opts.flags,opts.mode);if(opts.encoding==="utf8"){var utf8=new Runtime.UTF8Processor;var buf=new Uint8Array(utf8.processJSString(data));FS.write(stream,buf,0,buf.length,0,opts.canOwn)}else if(opts.encoding==="binary"){FS.write(stream,data,0,data.length,0,opts.canOwn)}FS.close(stream)}),cwd:(function(){return FS.currentPath}),chdir:(function(path){var lookup=FS.lookupPath(path,{follow:true});if(!FS.isDir(lookup.node.mode)){throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR)}var err=FS.nodePermissions(lookup.node,"x");if(err){throw new FS.ErrnoError(err)}FS.currentPath=lookup.path}),createDefaultDirectories:(function(){FS.mkdir("/tmp");FS.mkdir("/home");FS.mkdir("/home/web_user")}),createDefaultDevices:(function(){FS.mkdir("/dev");FS.registerDevice(FS.makedev(1,3),{read:(function(){return 0}),write:(function(){return 0})});FS.mkdev("/dev/null",FS.makedev(1,3));TTY.register(FS.makedev(5,0),TTY.default_tty_ops);TTY.register(FS.makedev(6,0),TTY.default_tty1_ops);FS.mkdev("/dev/tty",FS.makedev(5,0));FS.mkdev("/dev/tty1",FS.makedev(6,0));var random_device;if(typeof crypto!=="undefined"){var randomBuffer=new Uint8Array(1);random_device=(function(){crypto.getRandomValues(randomBuffer);return randomBuffer[0]})}else if(ENVIRONMENT_IS_NODE){random_device=(function(){return require("crypto").randomBytes(1)[0]})}else{random_device=(function(){return Math.random()*256|0})}FS.createDevice("/dev","random",random_device);FS.createDevice("/dev","urandom",random_device);FS.mkdir("/dev/shm");FS.mkdir("/dev/shm/tmp")}),createStandardStreams:(function(){if(Module["stdin"]){FS.createDevice("/dev","stdin",Module["stdin"])}else{FS.symlink("/dev/tty","/dev/stdin")}if(Module["stdout"]){FS.createDevice("/dev","stdout",null,Module["stdout"])}else{FS.symlink("/dev/tty","/dev/stdout")}if(Module["stderr"]){FS.createDevice("/dev","stderr",null,Module["stderr"])}else{FS.symlink("/dev/tty1","/dev/stderr")}var stdin=FS.open("/dev/stdin","r");HEAP32[_stdin>>2]=FS.getPtrForStream(stdin);assert(stdin.fd===0,"invalid handle for stdin ("+stdin.fd+")");var stdout=FS.open("/dev/stdout","w");HEAP32[_stdout>>2]=FS.getPtrForStream(stdout);assert(stdout.fd===1,"invalid handle for stdout ("+stdout.fd+")");var stderr=FS.open("/dev/stderr","w");HEAP32[_stderr>>2]=FS.getPtrForStream(stderr);assert(stderr.fd===2,"invalid handle for stderr ("+stderr.fd+")")}),ensureErrnoError:(function(){if(FS.ErrnoError)return;FS.ErrnoError=function ErrnoError(errno,node){this.node=node;this.setErrno=(function(errno){this.errno=errno;for(var key in ERRNO_CODES){if(ERRNO_CODES[key]===errno){this.code=key;break}}});this.setErrno(errno);this.message=ERRNO_MESSAGES[errno]};FS.ErrnoError.prototype=new Error;FS.ErrnoError.prototype.constructor=FS.ErrnoError;[ERRNO_CODES.ENOENT].forEach((function(code){FS.genericErrors[code]=new FS.ErrnoError(code);FS.genericErrors[code].stack="<generic error, no stack>"}))}),staticInit:(function(){FS.ensureErrnoError();FS.nameTable=new Array(4096);FS.mount(MEMFS,{},"/");FS.createDefaultDirectories();FS.createDefaultDevices()}),init:(function(input,output,error){assert(!FS.init.initialized,"FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");FS.init.initialized=true;FS.ensureErrnoError();Module["stdin"]=input||Module["stdin"];Module["stdout"]=output||Module["stdout"];Module["stderr"]=error||Module["stderr"];FS.createStandardStreams()}),quit:(function(){FS.init.initialized=false;for(var i=0;i<FS.streams.length;i++){var stream=FS.streams[i];if(!stream){continue}FS.close(stream)}}),getMode:(function(canRead,canWrite){var mode=0;if(canRead)mode|=292|73;if(canWrite)mode|=146;return mode}),joinPath:(function(parts,forceRelative){var path=PATH.join.apply(null,parts);if(forceRelative&&path[0]=="/")path=path.substr(1);return path}),absolutePath:(function(relative,base){return PATH.resolve(base,relative)}),standardizePath:(function(path){return PATH.normalize(path)}),findObject:(function(path,dontResolveLastLink){var ret=FS.analyzePath(path,dontResolveLastLink);if(ret.exists){return ret.object}else{___setErrNo(ret.error);return null}}),analyzePath:(function(path,dontResolveLastLink){try{var lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});path=lookup.path}catch(e){}var ret={isRoot:false,exists:false,error:0,name:null,path:null,object:null,parentExists:false,parentPath:null,parentObject:null};try{var lookup=FS.lookupPath(path,{parent:true});ret.parentExists=true;ret.parentPath=lookup.path;ret.parentObject=lookup.node;ret.name=PATH.basename(path);lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});ret.exists=true;ret.path=lookup.path;ret.object=lookup.node;ret.name=lookup.node.name;ret.isRoot=lookup.path==="/"}catch(e){ret.error=e.errno}return ret}),createFolder:(function(parent,name,canRead,canWrite){var path=PATH.join2(typeof parent==="string"?parent:FS.getPath(parent),name);var mode=FS.getMode(canRead,canWrite);return FS.mkdir(path,mode)}),createPath:(function(parent,path,canRead,canWrite){parent=typeof parent==="string"?parent:FS.getPath(parent);var parts=path.split("/").reverse();while(parts.length){var part=parts.pop();if(!part)continue;var current=PATH.join2(parent,part);try{FS.mkdir(current)}catch(e){}parent=current}return current}),createFile:(function(parent,name,properties,canRead,canWrite){var path=PATH.join2(typeof parent==="string"?parent:FS.getPath(parent),name);var mode=FS.getMode(canRead,canWrite);return FS.create(path,mode)}),createDataFile:(function(parent,name,data,canRead,canWrite,canOwn){var path=name?PATH.join2(typeof parent==="string"?parent:FS.getPath(parent),name):parent;var mode=FS.getMode(canRead,canWrite);var node=FS.create(path,mode);if(data){if(typeof data==="string"){var arr=new Array(data.length);for(var i=0,len=data.length;i<len;++i)arr[i]=data.charCodeAt(i);data=arr}FS.chmod(node,mode|146);var stream=FS.open(node,"w");FS.write(stream,data,0,data.length,0,canOwn);FS.close(stream);FS.chmod(node,mode)}return node}),createDevice:(function(parent,name,input,output){var path=PATH.join2(typeof parent==="string"?parent:FS.getPath(parent),name);var mode=FS.getMode(!!input,!!output);if(!FS.createDevice.major)FS.createDevice.major=64;var dev=FS.makedev(FS.createDevice.major++,0);FS.registerDevice(dev,{open:(function(stream){stream.seekable=false}),close:(function(stream){if(output&&output.buffer&&output.buffer.length){output(10)}}),read:(function(stream,buffer,offset,length,pos){var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=input()}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EIO)}if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)}if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result}if(bytesRead){stream.node.timestamp=Date.now()}return bytesRead}),write:(function(stream,buffer,offset,length,pos){for(var i=0;i<length;i++){try{output(buffer[offset+i])}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EIO)}}if(length){stream.node.timestamp=Date.now()}return i})});return FS.mkdev(path,mode,dev)}),createLink:(function(parent,name,target,canRead,canWrite){var path=PATH.join2(typeof parent==="string"?parent:FS.getPath(parent),name);return FS.symlink(target,path)}),forceLoadFile:(function(obj){if(obj.isDevice||obj.isFolder||obj.link||obj.contents)return true;var success=true;if(typeof XMLHttpRequest!=="undefined"){throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.")}else if(Module["read"]){try{obj.contents=intArrayFromString(Module["read"](obj.url),true);obj.usedBytes=obj.contents.length}catch(e){success=false}}else{throw new Error("Cannot load without read() or XMLHttpRequest.")}if(!success)___setErrNo(ERRNO_CODES.EIO);return success}),createLazyFile:(function(parent,name,url,canRead,canWrite){function LazyUint8Array(){this.lengthKnown=false;this.chunks=[]}LazyUint8Array.prototype.get=function LazyUint8Array_get(idx){if(idx>this.length-1||idx<0){return undefined}var chunkOffset=idx%this.chunkSize;var chunkNum=idx/this.chunkSize|0;return this.getter(chunkNum)[chunkOffset]};LazyUint8Array.prototype.setDataGetter=function LazyUint8Array_setDataGetter(getter){this.getter=getter};LazyUint8Array.prototype.cacheLength=function LazyUint8Array_cacheLength(){var xhr=new XMLHttpRequest;xhr.open("HEAD",url,false);xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error("Couldn't load "+url+". Status: "+xhr.status);var datalength=Number(xhr.getResponseHeader("Content-length"));var header;var hasByteServing=(header=xhr.getResponseHeader("Accept-Ranges"))&&header==="bytes";var chunkSize=1024*1024;if(!hasByteServing)chunkSize=datalength;var doXHR=(function(from,to){if(from>to)throw new Error("invalid range ("+from+", "+to+") or no bytes requested!");if(to>datalength-1)throw new Error("only "+datalength+" bytes available! programmer error!");var xhr=new XMLHttpRequest;xhr.open("GET",url,false);if(datalength!==chunkSize)xhr.setRequestHeader("Range","bytes="+from+"-"+to);if(typeof Uint8Array!="undefined")xhr.responseType="arraybuffer";if(xhr.overrideMimeType){xhr.overrideMimeType("text/plain; charset=x-user-defined")}xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error("Couldn't load "+url+". Status: "+xhr.status);if(xhr.response!==undefined){return new Uint8Array(xhr.response||[])}else{return intArrayFromString(xhr.responseText||"",true)}});var lazyArray=this;lazyArray.setDataGetter((function(chunkNum){var start=chunkNum*chunkSize;var end=(chunkNum+1)*chunkSize-1;end=Math.min(end,datalength-1);if(typeof lazyArray.chunks[chunkNum]==="undefined"){lazyArray.chunks[chunkNum]=doXHR(start,end)}if(typeof lazyArray.chunks[chunkNum]==="undefined")throw new Error("doXHR failed!");return lazyArray.chunks[chunkNum]}));this._length=datalength;this._chunkSize=chunkSize;this.lengthKnown=true};if(typeof XMLHttpRequest!=="undefined"){if(!ENVIRONMENT_IS_WORKER)throw"Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";var lazyArray=new LazyUint8Array;Object.defineProperty(lazyArray,"length",{get:(function(){if(!this.lengthKnown){this.cacheLength()}return this._length})});Object.defineProperty(lazyArray,"chunkSize",{get:(function(){if(!this.lengthKnown){this.cacheLength()}return this._chunkSize})});var properties={isDevice:false,contents:lazyArray}}else{var properties={isDevice:false,url:url}}var node=FS.createFile(parent,name,properties,canRead,canWrite);if(properties.contents){node.contents=properties.contents}else if(properties.url){node.contents=null;node.url=properties.url}Object.defineProperty(node,"usedBytes",{get:(function(){return this.contents.length})});var stream_ops={};var keys=Object.keys(node.stream_ops);keys.forEach((function(key){var fn=node.stream_ops[key];stream_ops[key]=function forceLoadLazyFile(){if(!FS.forceLoadFile(node)){throw new FS.ErrnoError(ERRNO_CODES.EIO)}return fn.apply(null,arguments)}}));stream_ops.read=function stream_ops_read(stream,buffer,offset,length,position){if(!FS.forceLoadFile(node)){throw new FS.ErrnoError(ERRNO_CODES.EIO)}var contents=stream.node.contents;if(position>=contents.length)return 0;var size=Math.min(contents.length-position,length);assert(size>=0);if(contents.slice){for(var i=0;i<size;i++){buffer[offset+i]=contents[position+i]}}else{for(var i=0;i<size;i++){buffer[offset+i]=contents.get(position+i)}}return size};node.stream_ops=stream_ops;return node}),createPreloadedFile:(function(parent,name,url,canRead,canWrite,onload,onerror,dontCreateFile,canOwn){Browser.init();var fullname=name?PATH.resolve(PATH.join2(parent,name)):parent;function processData(byteArray){function finish(byteArray){if(!dontCreateFile){FS.createDataFile(parent,name,byteArray,canRead,canWrite,canOwn)}if(onload)onload();removeRunDependency("cp "+fullname)}var handled=false;Module["preloadPlugins"].forEach((function(plugin){if(handled)return;if(plugin["canHandle"](fullname)){plugin["handle"](byteArray,fullname,finish,(function(){if(onerror)onerror();removeRunDependency("cp "+fullname)}));handled=true}}));if(!handled)finish(byteArray)}addRunDependency("cp "+fullname);if(typeof url=="string"){Browser.asyncLoad(url,(function(byteArray){processData(byteArray)}),onerror)}else{processData(url)}}),indexedDB:(function(){return window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB}),DB_NAME:(function(){return"EM_FS_"+window.location.pathname}),DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:(function(paths,onload,onerror){onload=onload||(function(){});onerror=onerror||(function(){});var indexedDB=FS.indexedDB();try{var openRequest=indexedDB.open(FS.DB_NAME(),FS.DB_VERSION)}catch(e){return onerror(e)}openRequest.onupgradeneeded=function openRequest_onupgradeneeded(){console.log("creating db");var db=openRequest.result;db.createObjectStore(FS.DB_STORE_NAME)};openRequest.onsuccess=function openRequest_onsuccess(){var db=openRequest.result;var transaction=db.transaction([FS.DB_STORE_NAME],"readwrite");var files=transaction.objectStore(FS.DB_STORE_NAME);var ok=0,fail=0,total=paths.length;function finish(){if(fail==0)onload();else onerror()}paths.forEach((function(path){var putRequest=files.put(FS.analyzePath(path).object.contents,path);putRequest.onsuccess=function putRequest_onsuccess(){ok++;if(ok+fail==total)finish()};putRequest.onerror=function putRequest_onerror(){fail++;if(ok+fail==total)finish()}}));transaction.onerror=onerror};openRequest.onerror=onerror}),loadFilesFromDB:(function(paths,onload,onerror){onload=onload||(function(){});onerror=onerror||(function(){});var indexedDB=FS.indexedDB();try{var openRequest=indexedDB.open(FS.DB_NAME(),FS.DB_VERSION)}catch(e){return onerror(e)}openRequest.onupgradeneeded=onerror;openRequest.onsuccess=function openRequest_onsuccess(){var db=openRequest.result;try{var transaction=db.transaction([FS.DB_STORE_NAME],"readonly")}catch(e){onerror(e);return}var files=transaction.objectStore(FS.DB_STORE_NAME);var ok=0,fail=0,total=paths.length;function finish(){if(fail==0)onload();else onerror()}paths.forEach((function(path){var getRequest=files.get(path);getRequest.onsuccess=function getRequest_onsuccess(){if(FS.analyzePath(path).exists){FS.unlink(path)}FS.createDataFile(PATH.dirname(path),PATH.basename(path),getRequest.result,true,true,true);ok++;if(ok+fail==total)finish()};getRequest.onerror=function getRequest_onerror(){fail++;if(ok+fail==total)finish()}}));transaction.onerror=onerror};openRequest.onerror=onerror})};function _fflush(stream){}function _mkport(){throw"TODO"}var SOCKFS={mount:(function(mount){Module["websocket"]=Module["websocket"]&&"object"===typeof Module["websocket"]?Module["websocket"]:{};Module["websocket"]._callbacks={};Module["websocket"]["on"]=(function(event,callback){if("function"===typeof callback){this._callbacks[event]=callback}return this});Module["websocket"].emit=(function(event,param){if("function"===typeof this._callbacks[event]){this._callbacks[event].call(this,param)}});return FS.createNode(null,"/",16384|511,0)}),createSocket:(function(family,type,protocol){var streaming=type==1;if(protocol){assert(streaming==(protocol==6))}var sock={family:family,type:type,protocol:protocol,server:null,error:null,peers:{},pending:[],recv_queue:[],sock_ops:SOCKFS.websocket_sock_ops};var name=SOCKFS.nextname();var node=FS.createNode(SOCKFS.root,name,49152,0);node.sock=sock;var stream=FS.createStream({path:name,node:node,flags:FS.modeStringToFlags("r+"),seekable:false,stream_ops:SOCKFS.stream_ops});sock.stream=stream;return sock}),getSocket:(function(fd){var stream=FS.getStream(fd);if(!stream||!FS.isSocket(stream.node.mode)){return null}return stream.node.sock}),stream_ops:{poll:(function(stream){var sock=stream.node.sock;return sock.sock_ops.poll(sock)}),ioctl:(function(stream,request,varargs){var sock=stream.node.sock;return sock.sock_ops.ioctl(sock,request,varargs)}),read:(function(stream,buffer,offset,length,position){var sock=stream.node.sock;var msg=sock.sock_ops.recvmsg(sock,length);if(!msg){return 0}buffer.set(msg.buffer,offset);return msg.buffer.length}),write:(function(stream,buffer,offset,length,position){var sock=stream.node.sock;return sock.sock_ops.sendmsg(sock,buffer,offset,length)}),close:(function(stream){var sock=stream.node.sock;sock.sock_ops.close(sock)})},nextname:(function(){if(!SOCKFS.nextname.current){SOCKFS.nextname.current=0}return"socket["+SOCKFS.nextname.current++ +"]"}),websocket_sock_ops:{createPeer:(function(sock,addr,port){var ws;if(typeof addr==="object"){ws=addr;addr=null;port=null}if(ws){if(ws._socket){addr=ws._socket.remoteAddress;port=ws._socket.remotePort}else{var result=/ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);if(!result){throw new Error("WebSocket URL must be in the format ws(s)://address:port")}addr=result[1];port=parseInt(result[2],10)}}else{try{var runtimeConfig=Module["websocket"]&&"object"===typeof Module["websocket"];var url="ws:#".replace("#","//");if(runtimeConfig){if("string"===typeof Module["websocket"]["url"]){url=Module["websocket"]["url"]}}if(url==="ws://"||url==="wss://"){var parts=addr.split("/");url=url+parts[0]+":"+port+"/"+parts.slice(1).join("/")}var subProtocols="binary";if(runtimeConfig){if("string"===typeof Module["websocket"]["subprotocol"]){subProtocols=Module["websocket"]["subprotocol"]}}subProtocols=subProtocols.replace(/^ +| +$/g,"").split(/ *, */);var opts=ENVIRONMENT_IS_NODE?{"protocol":subProtocols.toString()}:subProtocols;var WebSocket=ENVIRONMENT_IS_NODE?require("ws"):window["WebSocket"];ws=new WebSocket(url,opts);ws.binaryType="arraybuffer"}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH)}}var peer={addr:addr,port:port,socket:ws,dgram_send_queue:[]};SOCKFS.websocket_sock_ops.addPeer(sock,peer);SOCKFS.websocket_sock_ops.handlePeerEvents(sock,peer);if(sock.type===2&&typeof sock.sport!=="undefined"){peer.dgram_send_queue.push(new Uint8Array([255,255,255,255,"p".charCodeAt(0),"o".charCodeAt(0),"r".charCodeAt(0),"t".charCodeAt(0),(sock.sport&65280)>>8,sock.sport&255]))}return peer}),getPeer:(function(sock,addr,port){return sock.peers[addr+":"+port]}),addPeer:(function(sock,peer){sock.peers[peer.addr+":"+peer.port]=peer}),removePeer:(function(sock,peer){delete sock.peers[peer.addr+":"+peer.port]}),handlePeerEvents:(function(sock,peer){var first=true;var handleOpen=(function(){Module["websocket"].emit("open",sock.stream.fd);try{var queued=peer.dgram_send_queue.shift();while(queued){peer.socket.send(queued);queued=peer.dgram_send_queue.shift()}}catch(e){peer.socket.close()}});function handleMessage(data){assert(typeof data!=="string"&&data.byteLength!==undefined);data=new Uint8Array(data);var wasfirst=first;first=false;if(wasfirst&&data.length===10&&data[0]===255&&data[1]===255&&data[2]===255&&data[3]===255&&data[4]==="p".charCodeAt(0)&&data[5]==="o".charCodeAt(0)&&data[6]==="r".charCodeAt(0)&&data[7]==="t".charCodeAt(0)){var newport=data[8]<<8|data[9];SOCKFS.websocket_sock_ops.removePeer(sock,peer);peer.port=newport;SOCKFS.websocket_sock_ops.addPeer(sock,peer);return}sock.recv_queue.push({addr:peer.addr,port:peer.port,data:data});Module["websocket"].emit("message",sock.stream.fd)}if(ENVIRONMENT_IS_NODE){peer.socket.on("open",handleOpen);peer.socket.on("message",(function(data,flags){if(!flags.binary){return}handleMessage((new Uint8Array(data)).buffer)}));peer.socket.on("close",(function(){Module["websocket"].emit("close",sock.stream.fd)}));peer.socket.on("error",(function(error){sock.error=ERRNO_CODES.ECONNREFUSED;Module["websocket"].emit("error",[sock.stream.fd,sock.error,"ECONNREFUSED: Connection refused"])}))}else{peer.socket.onopen=handleOpen;peer.socket.onclose=(function(){Module["websocket"].emit("close",sock.stream.fd)});peer.socket.onmessage=function peer_socket_onmessage(event){handleMessage(event.data)};peer.socket.onerror=(function(error){sock.error=ERRNO_CODES.ECONNREFUSED;Module["websocket"].emit("error",[sock.stream.fd,sock.error,"ECONNREFUSED: Connection refused"])})}}),poll:(function(sock){if(sock.type===1&&sock.server){return sock.pending.length?64|1:0}var mask=0;var dest=sock.type===1?SOCKFS.websocket_sock_ops.getPeer(sock,sock.daddr,sock.dport):null;if(sock.recv_queue.length||!dest||dest&&dest.socket.readyState===dest.socket.CLOSING||dest&&dest.socket.readyState===dest.socket.CLOSED){mask|=64|1}if(!dest||dest&&dest.socket.readyState===dest.socket.OPEN){mask|=4}if(dest&&dest.socket.readyState===dest.socket.CLOSING||dest&&dest.socket.readyState===dest.socket.CLOSED){mask|=16}return mask}),ioctl:(function(sock,request,arg){switch(request){case 21531:var bytes=0;if(sock.recv_queue.length){bytes=sock.recv_queue[0].data.length}HEAP32[arg>>2]=bytes;return 0;default:return ERRNO_CODES.EINVAL}}),close:(function(sock){if(sock.server){try{sock.server.close()}catch(e){}sock.server=null}var peers=Object.keys(sock.peers);for(var i=0;i<peers.length;i++){var peer=sock.peers[peers[i]];try{peer.socket.close()}catch(e){}SOCKFS.websocket_sock_ops.removePeer(sock,peer)}return 0}),bind:(function(sock,addr,port){if(typeof sock.saddr!=="undefined"||typeof sock.sport!=="undefined"){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}sock.saddr=addr;sock.sport=port||_mkport();if(sock.type===2){if(sock.server){sock.server.close();sock.server=null}try{sock.sock_ops.listen(sock,0)}catch(e){if(!(e instanceof FS.ErrnoError))throw e;if(e.errno!==ERRNO_CODES.EOPNOTSUPP)throw e}}}),connect:(function(sock,addr,port){if(sock.server){throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP)}if(typeof sock.daddr!=="undefined"&&typeof sock.dport!=="undefined"){var dest=SOCKFS.websocket_sock_ops.getPeer(sock,sock.daddr,sock.dport);if(dest){if(dest.socket.readyState===dest.socket.CONNECTING){throw new FS.ErrnoError(ERRNO_CODES.EALREADY)}else{throw new FS.ErrnoError(ERRNO_CODES.EISCONN)}}}var peer=SOCKFS.websocket_sock_ops.createPeer(sock,addr,port);sock.daddr=peer.addr;sock.dport=peer.port;throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS)}),listen:(function(sock,backlog){if(!ENVIRONMENT_IS_NODE){throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP)}if(sock.server){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}var WebSocketServer=require("ws").Server;var host=sock.saddr;sock.server=new WebSocketServer({host:host,port:sock.sport});Module["websocket"].emit("listen",sock.stream.fd);sock.server.on("connection",(function(ws){if(sock.type===1){var newsock=SOCKFS.createSocket(sock.family,sock.type,sock.protocol);var peer=SOCKFS.websocket_sock_ops.createPeer(newsock,ws);newsock.daddr=peer.addr;newsock.dport=peer.port;sock.pending.push(newsock);Module["websocket"].emit("connection",newsock.stream.fd)}else{SOCKFS.websocket_sock_ops.createPeer(sock,ws);Module["websocket"].emit("connection",sock.stream.fd)}}));sock.server.on("closed",(function(){Module["websocket"].emit("close",sock.stream.fd);sock.server=null}));sock.server.on("error",(function(error){sock.error=ERRNO_CODES.EHOSTUNREACH;Module["websocket"].emit("error",[sock.stream.fd,sock.error,"EHOSTUNREACH: Host is unreachable"])}))}),accept:(function(listensock){if(!listensock.server){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}var newsock=listensock.pending.shift();newsock.stream.flags=listensock.stream.flags;return newsock}),getname:(function(sock,peer){var addr,port;if(peer){if(sock.daddr===undefined||sock.dport===undefined){throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)}addr=sock.daddr;port=sock.dport}else{addr=sock.saddr||0;port=sock.sport||0}return{addr:addr,port:port}}),sendmsg:(function(sock,buffer,offset,length,addr,port){if(sock.type===2){if(addr===undefined||port===undefined){addr=sock.daddr;port=sock.dport}if(addr===undefined||port===undefined){throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ)}}else{addr=sock.daddr;port=sock.dport}var dest=SOCKFS.websocket_sock_ops.getPeer(sock,addr,port);if(sock.type===1){if(!dest||dest.socket.readyState===dest.socket.CLOSING||dest.socket.readyState===dest.socket.CLOSED){throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)}else if(dest.socket.readyState===dest.socket.CONNECTING){throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)}}var data;if(buffer instanceof Array||buffer instanceof ArrayBuffer){data=buffer.slice(offset,offset+length)}else{data=buffer.buffer.slice(buffer.byteOffset+offset,buffer.byteOffset+offset+length)}if(sock.type===2){if(!dest||dest.socket.readyState!==dest.socket.OPEN){if(!dest||dest.socket.readyState===dest.socket.CLOSING||dest.socket.readyState===dest.socket.CLOSED){dest=SOCKFS.websocket_sock_ops.createPeer(sock,addr,port)}dest.dgram_send_queue.push(data);return length}}try{dest.socket.send(data);return length}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EINVAL)}}),recvmsg:(function(sock,length){if(sock.type===1&&sock.server){throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)}var queued=sock.recv_queue.shift();if(!queued){if(sock.type===1){var dest=SOCKFS.websocket_sock_ops.getPeer(sock,sock.daddr,sock.dport);if(!dest){throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)}else if(dest.socket.readyState===dest.socket.CLOSING||dest.socket.readyState===dest.socket.CLOSED){return null}else{throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)}}else{throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)}}var queuedLength=queued.data.byteLength||queued.data.length;var queuedOffset=queued.data.byteOffset||0;var queuedBuffer=queued.data.buffer||queued.data;var bytesRead=Math.min(length,queuedLength);var res={buffer:new Uint8Array(queuedBuffer,queuedOffset,bytesRead),addr:queued.addr,port:queued.port};if(sock.type===1&&bytesRead<queuedLength){var bytesRemaining=queuedLength-bytesRead;queued.data=new Uint8Array(queuedBuffer,queuedOffset+bytesRead,bytesRemaining);sock.recv_queue.unshift(queued)}return res})}};function _send(fd,buf,len,flags){var sock=SOCKFS.getSocket(fd);if(!sock){___setErrNo(ERRNO_CODES.EBADF);return-1}return _write(fd,buf,len)}function _pwrite(fildes,buf,nbyte,offset){var stream=FS.getStream(fildes);if(!stream){___setErrNo(ERRNO_CODES.EBADF);return-1}try{var slab=HEAP8;return FS.write(stream,slab,buf,nbyte,offset)}catch(e){FS.handleFSError(e);return-1}}function _write(fildes,buf,nbyte){var stream=FS.getStream(fildes);if(!stream){___setErrNo(ERRNO_CODES.EBADF);return-1}try{var slab=HEAP8;return FS.write(stream,slab,buf,nbyte)}catch(e){FS.handleFSError(e);return-1}}function _fileno(stream){stream=FS.getStreamFromPtr(stream);if(!stream)return-1;return stream.fd}function _fputc(c,stream){var chr=unSign(c&255);HEAP8[_fputc.ret>>0]=chr;var fd=_fileno(stream);var ret=_write(fd,_fputc.ret,1);if(ret==-1){var streamObj=FS.getStreamFromPtr(stream);if(streamObj)streamObj.error=true;return-1}else{return chr}}function _sysconf(name){switch(name){case 30:return PAGE_SIZE;case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 79:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:return 200809;case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;case 74:case 60:case 69:case 70:case 4:return 1024;case 31:case 42:case 72:return 32;case 87:case 26:case 33:return 2147483647;case 34:case 1:return 47839;case 38:case 36:return 99;case 43:case 37:return 2048;case 0:return 2097152;case 3:return 65536;case 28:return 32768;case 44:return 32767;case 75:return 16384;case 39:return 1e3;case 89:return 700;case 71:return 256;case 40:return 255;case 2:return 100;case 180:return 64;case 25:return 20;case 5:return 16;case 6:return 6;case 73:return 4;case 84:{if(typeof navigator==="object")return navigator["hardwareConcurrency"]||1;return 1}}___setErrNo(ERRNO_CODES.EINVAL);return-1}function _fwrite(ptr,size,nitems,stream){var bytesToWrite=nitems*size;if(bytesToWrite==0)return 0;var fd=_fileno(stream);var bytesWritten=_write(fd,ptr,bytesToWrite);if(bytesWritten==-1){var streamObj=FS.getStreamFromPtr(stream);if(streamObj)streamObj.error=true;return 0}else{return bytesWritten/size|0}}var emval_free_list=[];var emval_handle_array=[{},{value:undefined},{value:null},{value:true},{value:false}];function __emval_decref(handle){if(handle>4&&0===--emval_handle_array[handle].refcount){emval_handle_array[handle]=undefined;emval_free_list.push(handle)}}function count_emval_handles(){var count=0;for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){++count}}return count}function get_first_emval(){for(var i=1;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){return emval_handle_array[i]}}return null}function init_emval(){Module["count_emval_handles"]=count_emval_handles;Module["get_first_emval"]=get_first_emval}function __emval_register(value){switch(value){case undefined:{return 1};case null:{return 2};case true:{return 3};case false:{return 4};default:{var handle=emval_free_list.length?emval_free_list.pop():emval_handle_array.length;emval_handle_array[handle]={refcount:1,value:value};return handle}}}function __embind_register_emval(rawType,name){name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":(function(handle){var rv=emval_handle_array[handle].value;__emval_decref(handle);return rv}),"toWireType":(function(destructors,value){return __emval_register(value)}),"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:null})}function ___gxx_personality_v0(){}Module["_bitshift64Lshr"]=_bitshift64Lshr;var _BDtoIHigh=true;function _pthread_cond_broadcast(){return 0}Module["_strlen"]=_strlen;function __reallyNegative(x){return x<0||x===0&&1/x===-Infinity}function __formatString(format,varargs){var textIndex=format;var argIndex=0;function getNextArg(type){var ret;if(type==="double"){ret=(HEAP32[tempDoublePtr>>2]=HEAP32[varargs+argIndex>>2],HEAP32[tempDoublePtr+4>>2]=HEAP32[varargs+(argIndex+4)>>2],+HEAPF64[tempDoublePtr>>3])}else if(type=="i64"){ret=[HEAP32[varargs+argIndex>>2],HEAP32[varargs+(argIndex+4)>>2]]}else{type="i32";ret=HEAP32[varargs+argIndex>>2]}argIndex+=Runtime.getNativeFieldSize(type);return ret}var ret=[];var curr,next,currArg;while(1){var startTextIndex=textIndex;curr=HEAP8[textIndex>>0];if(curr===0)break;next=HEAP8[textIndex+1>>0];if(curr==37){var flagAlwaysSigned=false;var flagLeftAlign=false;var flagAlternative=false;var flagZeroPad=false;var flagPadSign=false;flagsLoop:while(1){switch(next){case 43:flagAlwaysSigned=true;break;case 45:flagLeftAlign=true;break;case 35:flagAlternative=true;break;case 48:if(flagZeroPad){break flagsLoop}else{flagZeroPad=true;break};case 32:flagPadSign=true;break;default:break flagsLoop}textIndex++;next=HEAP8[textIndex+1>>0]}var width=0;if(next==42){width=getNextArg("i32");textIndex++;next=HEAP8[textIndex+1>>0]}else{while(next>=48&&next<=57){width=width*10+(next-48);textIndex++;next=HEAP8[textIndex+1>>0]}}var precisionSet=false,precision=-1;if(next==46){precision=0;precisionSet=true;textIndex++;next=HEAP8[textIndex+1>>0];if(next==42){precision=getNextArg("i32");textIndex++}else{while(1){var precisionChr=HEAP8[textIndex+1>>0];if(precisionChr<48||precisionChr>57)break;precision=precision*10+(precisionChr-48);textIndex++}}next=HEAP8[textIndex+1>>0]}if(precision<0){precision=6;precisionSet=false}var argSize;switch(String.fromCharCode(next)){case"h":var nextNext=HEAP8[textIndex+2>>0];if(nextNext==104){textIndex++;argSize=1}else{argSize=2}break;case"l":var nextNext=HEAP8[textIndex+2>>0];if(nextNext==108){textIndex++;argSize=8}else{argSize=4}break;case"L":case"q":case"j":argSize=8;break;case"z":case"t":case"I":argSize=4;break;default:argSize=null}if(argSize)textIndex++;next=HEAP8[textIndex+1>>0];switch(String.fromCharCode(next)){case"d":case"i":case"u":case"o":case"x":case"X":case"p":{var signed=next==100||next==105;argSize=argSize||4;var currArg=getNextArg("i"+argSize*8);var origArg=currArg;var argText;if(argSize==8){currArg=Runtime.makeBigInt(currArg[0],currArg[1],next==117)}if(argSize<=4){var limit=Math.pow(256,argSize)-1;currArg=(signed?reSign:unSign)(currArg&limit,argSize*8)}var currAbsArg=Math.abs(currArg);var prefix="";if(next==100||next==105){if(argSize==8&&i64Math)argText=i64Math.stringify(origArg[0],origArg[1],null);else argText=reSign(currArg,8*argSize,1).toString(10)}else if(next==117){if(argSize==8&&i64Math)argText=i64Math.stringify(origArg[0],origArg[1],true);else argText=unSign(currArg,8*argSize,1).toString(10);currArg=Math.abs(currArg)}else if(next==111){argText=(flagAlternative?"0":"")+currAbsArg.toString(8)}else if(next==120||next==88){prefix=flagAlternative&&currArg!=0?"0x":"";if(argSize==8&&i64Math){if(origArg[1]){argText=(origArg[1]>>>0).toString(16);var lower=(origArg[0]>>>0).toString(16);while(lower.length<8)lower="0"+lower;argText+=lower}else{argText=(origArg[0]>>>0).toString(16)}}else if(currArg<0){currArg=-currArg;argText=(currAbsArg-1).toString(16);var buffer=[];for(var i=0;i<argText.length;i++){buffer.push((15-parseInt(argText[i],16)).toString(16))}argText=buffer.join("");while(argText.length<argSize*2)argText="f"+argText}else{argText=currAbsArg.toString(16)}if(next==88){prefix=prefix.toUpperCase();argText=argText.toUpperCase()}}else if(next==112){if(currAbsArg===0){argText="(nil)"}else{prefix="0x";argText=currAbsArg.toString(16)}}if(precisionSet){while(argText.length<precision){argText="0"+argText}}if(currArg>=0){if(flagAlwaysSigned){prefix="+"+prefix}else if(flagPadSign){prefix=" "+prefix}}if(argText.charAt(0)=="-"){prefix="-"+prefix;argText=argText.substr(1)}while(prefix.length+argText.length<width){if(flagLeftAlign){argText+=" "}else{if(flagZeroPad){argText="0"+argText}else{prefix=" "+prefix}}}argText=prefix+argText;argText.split("").forEach((function(chr){ret.push(chr.charCodeAt(0))}));break};case"f":case"F":case"e":case"E":case"g":case"G":{var currArg=getNextArg("double");var argText;if(isNaN(currArg)){argText="nan";flagZeroPad=false}else if(!isFinite(currArg)){argText=(currArg<0?"-":"")+"inf";flagZeroPad=false}else{var isGeneral=false;var effectivePrecision=Math.min(precision,20);if(next==103||next==71){isGeneral=true;precision=precision||1;var exponent=parseInt(currArg.toExponential(effectivePrecision).split("e")[1],10);if(precision>exponent&&exponent>=-4){next=(next==103?"f":"F").charCodeAt(0);precision-=exponent+1}else{next=(next==103?"e":"E").charCodeAt(0);precision--}effectivePrecision=Math.min(precision,20)}if(next==101||next==69){argText=currArg.toExponential(effectivePrecision);if(/[eE][-+]\d$/.test(argText)){argText=argText.slice(0,-1)+"0"+argText.slice(-1)}}else if(next==102||next==70){argText=currArg.toFixed(effectivePrecision);if(currArg===0&&__reallyNegative(currArg)){argText="-"+argText}}var parts=argText.split("e");if(isGeneral&&!flagAlternative){while(parts[0].length>1&&parts[0].indexOf(".")!=-1&&(parts[0].slice(-1)=="0"||parts[0].slice(-1)==".")){parts[0]=parts[0].slice(0,-1)}}else{if(flagAlternative&&argText.indexOf(".")==-1)parts[0]+=".";while(precision>effectivePrecision++)parts[0]+="0"}argText=parts[0]+(parts.length>1?"e"+parts[1]:"");if(next==69)argText=argText.toUpperCase();if(currArg>=0){if(flagAlwaysSigned){argText="+"+argText}else if(flagPadSign){argText=" "+argText}}}while(argText.length<width){if(flagLeftAlign){argText+=" "}else{if(flagZeroPad&&(argText[0]=="-"||argText[0]=="+")){argText=argText[0]+"0"+argText.slice(1)}else{argText=(flagZeroPad?"0":" ")+argText}}}if(next<97)argText=argText.toUpperCase();argText.split("").forEach((function(chr){ret.push(chr.charCodeAt(0))}));break};case"s":{var arg=getNextArg("i8*");var argLength=arg?_strlen(arg):"(null)".length;if(precisionSet)argLength=Math.min(argLength,precision);if(!flagLeftAlign){while(argLength<width--){ret.push(32)}}if(arg){for(var i=0;i<argLength;i++){ret.push(HEAPU8[arg++>>0])}}else{ret=ret.concat(intArrayFromString("(null)".substr(0,argLength),true))}if(flagLeftAlign){while(argLength<width--){ret.push(32)}}break};case"c":{if(flagLeftAlign)ret.push(getNextArg("i8"));while(--width>0){ret.push(32)}if(!flagLeftAlign)ret.push(getNextArg("i8"));break};case"n":{var ptr=getNextArg("i32*");HEAP32[ptr>>2]=ret.length;break};case"%":{ret.push(curr);break};default:{for(var i=startTextIndex;i<textIndex+2;i++){ret.push(HEAP8[i>>0])}}}textIndex+=2}else{ret.push(curr);textIndex+=1}}return ret}function _fprintf(stream,format,varargs){var result=__formatString(format,varargs);var stack=Runtime.stackSave();var ret=_fwrite(allocate(result,"i8",ALLOC_STACK),1,result.length,stream);Runtime.stackRestore(stack);return ret}function _vfprintf(s,f,va_arg){return _fprintf(s,f,HEAP32[va_arg>>2])}function _pthread_mutex_unlock(){}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest}Module["_memcpy"]=_memcpy;function _sbrk(bytes){var self=_sbrk;if(!self.called){DYNAMICTOP=alignMemoryPage(DYNAMICTOP);self.called=true;assert(Runtime.dynamicAlloc);self.alloc=Runtime.dynamicAlloc;Runtime.dynamicAlloc=(function(){abort("cannot dynamically allocate, sbrk now has control")})}var ret=DYNAMICTOP;if(bytes!=0)self.alloc(bytes);return ret}Module["_bitshift64Shl"]=_bitshift64Shl;var LOCALE={curr:0,check:(function(locale){if(locale)locale=Pointer_stringify(locale);return locale==="C"||locale==="POSIX"||!locale})};function _calloc(n,s){var ret=_malloc(n*s);_memset(ret,0,n*s);return ret}Module["_calloc"]=_calloc;function _newlocale(mask,locale,base){if(!LOCALE.check(locale)){___setErrNo(ERRNO_CODES.ENOENT);return 0}if(!base)base=_calloc(1,4);return base}Module["_memmove"]=_memmove;function ___errno_location(){return ___errno_state}function _strerror_r(errnum,strerrbuf,buflen){if(errnum in ERRNO_MESSAGES){if(ERRNO_MESSAGES[errnum].length>buflen-1){return ___setErrNo(ERRNO_CODES.ERANGE)}else{var msg=ERRNO_MESSAGES[errnum];writeAsciiToMemory(msg,strerrbuf);return 0}}else{return ___setErrNo(ERRNO_CODES.EINVAL)}}function _strerror(errnum){if(!_strerror.buffer)_strerror.buffer=_malloc(256);_strerror_r(errnum,_strerror.buffer,256);return _strerror.buffer}function _pthread_mutex_destroy(){}function _catclose(catd){return 0}function __embind_register_memory_view(rawType,dataTypeIndex,name){var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];var TA=typeMapping[dataTypeIndex];function decodeMemoryView(handle){handle=handle>>2;var heap=HEAPU32;var size=heap[handle];var data=heap[handle+1];return new TA(heap["buffer"],data,size)}name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":decodeMemoryView,"argPackAdvance":8,"readValueFromPointer":decodeMemoryView},{ignoreDuplicateRegistrations:true})}function ___cxa_guard_release(){}function _ungetc(c,stream){stream=FS.getStreamFromPtr(stream);if(!stream){return-1}if(c===-1){return c}c=unSign(c&255);stream.ungotten.push(c);stream.eof=false;return c}function _uselocale(locale){var old=LOCALE.curr;if(locale)LOCALE.curr=locale;return old}function ___assert_fail(condition,filename,line,func){ABORT=true;throw"Assertion failed: "+Pointer_stringify(condition)+", at: "+[filename?Pointer_stringify(filename):"unknown filename",line,func?Pointer_stringify(func):"unknown function"]+" at "+stackTrace()}function __embind_register_void(rawType,name){name=readLatin1String(name);registerType(rawType,{isVoid:true,name:name,"argPackAdvance":0,"fromWireType":(function(){return undefined}),"toWireType":(function(destructors,o){return undefined})})}Module["_memset"]=_memset;var _BDtoILow=true;var _BItoD=true;function __isLeapYear(year){return year%4===0&&(year%100!==0||year%400===0)}function __arraySum(array,index){var sum=0;for(var i=0;i<=index;sum+=array[i++]);return sum}var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];function __addDays(date,days){var newDate=new Date(date.getTime());while(days>0){var leap=__isLeapYear(newDate.getFullYear());var currentMonth=newDate.getMonth();var daysInCurrentMonth=(leap?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR)[currentMonth];if(days>daysInCurrentMonth-newDate.getDate()){days-=daysInCurrentMonth-newDate.getDate()+1;newDate.setDate(1);if(currentMonth<11){newDate.setMonth(currentMonth+1)}else{newDate.setMonth(0);newDate.setFullYear(newDate.getFullYear()+1)}}else{newDate.setDate(newDate.getDate()+days);return newDate}}return newDate}function _strftime(s,maxsize,format,tm){var tm_zone=HEAP32[tm+40>>2];var date={tm_sec:HEAP32[tm>>2],tm_min:HEAP32[tm+4>>2],tm_hour:HEAP32[tm+8>>2],tm_mday:HEAP32[tm+12>>2],tm_mon:HEAP32[tm+16>>2],tm_year:HEAP32[tm+20>>2],tm_wday:HEAP32[tm+24>>2],tm_yday:HEAP32[tm+28>>2],tm_isdst:HEAP32[tm+32>>2],tm_gmtoff:HEAP32[tm+36>>2],tm_zone:tm_zone?Pointer_stringify(tm_zone):""};var pattern=Pointer_stringify(format);var EXPANSION_RULES_1={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S"};for(var rule in EXPANSION_RULES_1){pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_1[rule])}var WEEKDAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];function leadingSomething(value,digits,character){var str=typeof value==="number"?value.toString():value||"";while(str.length<digits){str=character[0]+str}return str}function leadingNulls(value,digits){return leadingSomething(value,digits,"0")}function compareByDay(date1,date2){function sgn(value){return value<0?-1:value>0?1:0}var compare;if((compare=sgn(date1.getFullYear()-date2.getFullYear()))===0){if((compare=sgn(date1.getMonth()-date2.getMonth()))===0){compare=sgn(date1.getDate()-date2.getDate())}}return compare}function getFirstWeekStartDate(janFourth){switch(janFourth.getDay()){case 0:return new Date(janFourth.getFullYear()-1,11,29);case 1:return janFourth;case 2:return new Date(janFourth.getFullYear(),0,3);case 3:return new Date(janFourth.getFullYear(),0,2);case 4:return new Date(janFourth.getFullYear(),0,1);case 5:return new Date(janFourth.getFullYear()-1,11,31);case 6:return new Date(janFourth.getFullYear()-1,11,30)}}function getWeekBasedYear(date){var thisDate=__addDays(new Date(date.tm_year+1900,0,1),date.tm_yday);var janFourthThisYear=new Date(thisDate.getFullYear(),0,4);var janFourthNextYear=new Date(thisDate.getFullYear()+1,0,4);var firstWeekStartThisYear=getFirstWeekStartDate(janFourthThisYear);var firstWeekStartNextYear=getFirstWeekStartDate(janFourthNextYear);if(compareByDay(firstWeekStartThisYear,thisDate)<=0){if(compareByDay(firstWeekStartNextYear,thisDate)<=0){return thisDate.getFullYear()+1}else{return thisDate.getFullYear()}}else{return thisDate.getFullYear()-1}}var EXPANSION_RULES_2={"%a":(function(date){return WEEKDAYS[date.tm_wday].substring(0,3)}),"%A":(function(date){return WEEKDAYS[date.tm_wday]}),"%b":(function(date){return MONTHS[date.tm_mon].substring(0,3)}),"%B":(function(date){return MONTHS[date.tm_mon]}),"%C":(function(date){var year=date.tm_year+1900;return leadingNulls(year/100|0,2)}),"%d":(function(date){return leadingNulls(date.tm_mday,2)}),"%e":(function(date){return leadingSomething(date.tm_mday,2," ")}),"%g":(function(date){return getWeekBasedYear(date).toString().substring(2)}),"%G":(function(date){return getWeekBasedYear(date)}),"%H":(function(date){return leadingNulls(date.tm_hour,2)}),"%I":(function(date){return leadingNulls(date.tm_hour<13?date.tm_hour:date.tm_hour-12,2)}),"%j":(function(date){return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900)?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,date.tm_mon-1),3)}),"%m":(function(date){return leadingNulls(date.tm_mon+1,2)}),"%M":(function(date){return leadingNulls(date.tm_min,2)}),"%n":(function(){return"\n"}),"%p":(function(date){if(date.tm_hour>0&&date.tm_hour<13){return"AM"}else{return"PM"}}),"%S":(function(date){return leadingNulls(date.tm_sec,2)}),"%t":(function(){return"\t"}),"%u":(function(date){var day=new Date(date.tm_year+1900,date.tm_mon+1,date.tm_mday,0,0,0,0);return day.getDay()||7}),"%U":(function(date){var janFirst=new Date(date.tm_year+1900,0,1);var firstSunday=janFirst.getDay()===0?janFirst:__addDays(janFirst,7-janFirst.getDay());var endDate=new Date(date.tm_year+1900,date.tm_mon,date.tm_mday);if(compareByDay(firstSunday,endDate)<0){var februaryFirstUntilEndMonth=__arraySum(__isLeapYear(endDate.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,endDate.getMonth()-1)-31;var firstSundayUntilEndJanuary=31-firstSunday.getDate();var days=firstSundayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();return leadingNulls(Math.ceil(days/7),2)}return compareByDay(firstSunday,janFirst)===0?"01":"00"}),"%V":(function(date){var janFourthThisYear=new Date(date.tm_year+1900,0,4);var janFourthNextYear=new Date(date.tm_year+1901,0,4);var firstWeekStartThisYear=getFirstWeekStartDate(janFourthThisYear);var firstWeekStartNextYear=getFirstWeekStartDate(janFourthNextYear);var endDate=__addDays(new Date(date.tm_year+1900,0,1),date.tm_yday);if(compareByDay(endDate,firstWeekStartThisYear)<0){return"53"}if(compareByDay(firstWeekStartNextYear,endDate)<=0){return"01"}var daysDifference;if(firstWeekStartThisYear.getFullYear()<date.tm_year+1900){daysDifference=date.tm_yday+32-firstWeekStartThisYear.getDate()}else{daysDifference=date.tm_yday+1-firstWeekStartThisYear.getDate()}return leadingNulls(Math.ceil(daysDifference/7),2)}),"%w":(function(date){var day=new Date(date.tm_year+1900,date.tm_mon+1,date.tm_mday,0,0,0,0);return day.getDay()}),"%W":(function(date){var janFirst=new Date(date.tm_year,0,1);var firstMonday=janFirst.getDay()===1?janFirst:__addDays(janFirst,janFirst.getDay()===0?1:7-janFirst.getDay()+1);var endDate=new Date(date.tm_year+1900,date.tm_mon,date.tm_mday);if(compareByDay(firstMonday,endDate)<0){var februaryFirstUntilEndMonth=__arraySum(__isLeapYear(endDate.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,endDate.getMonth()-1)-31;var firstMondayUntilEndJanuary=31-firstMonday.getDate();var days=firstMondayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();return leadingNulls(Math.ceil(days/7),2)}return compareByDay(firstMonday,janFirst)===0?"01":"00"}),"%y":(function(date){return(date.tm_year+1900).toString().substring(2)}),"%Y":(function(date){return date.tm_year+1900}),"%z":(function(date){var off=date.tm_gmtoff;var ahead=off>=0;off=Math.abs(off)/60;off=off/60*100+off%60;return(ahead?"+":"-")+String("0000"+off).slice(-4)}),"%Z":(function(date){return date.tm_zone}),"%%":(function(){return"%"})};for(var rule in EXPANSION_RULES_2){if(pattern.indexOf(rule)>=0){pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_2[rule](date))}}var bytes=intArrayFromString(pattern,false);if(bytes.length>maxsize){return 0}writeArrayToMemory(bytes,s);return bytes.length-1}function _strftime_l(s,maxsize,format,tm){return _strftime(s,maxsize,format,tm)}function _abort(){Module["abort"]()}function _pthread_once(ptr,func){if(!_pthread_once.seen)_pthread_once.seen={};if(ptr in _pthread_once.seen)return;Runtime.dynCall("v",func);_pthread_once.seen[ptr]=1}function ClassHandle_isAliasOf(other){if(!(this instanceof ClassHandle)){return false}if(!(other instanceof ClassHandle)){return false}var leftClass=this.$$.ptrType.registeredClass;var left=this.$$.ptr;var rightClass=other.$$.ptrType.registeredClass;var right=other.$$.ptr;while(leftClass.baseClass){left=leftClass.upcast(left);leftClass=leftClass.baseClass}while(rightClass.baseClass){right=rightClass.upcast(right);rightClass=rightClass.baseClass}return leftClass===rightClass&&left===right}function shallowCopyInternalPointer(o){return{count:o.count,deleteScheduled:o.deleteScheduled,preservePointerOnDelete:o.preservePointerOnDelete,ptr:o.ptr,ptrType:o.ptrType,smartPtr:o.smartPtr,smartPtrType:o.smartPtrType}}function throwInstanceAlreadyDeleted(obj){function getInstanceTypeName(handle){return handle.$$.ptrType.registeredClass.name}throwBindingError(getInstanceTypeName(obj)+" instance already deleted")}function ClassHandle_clone(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}if(this.$$.preservePointerOnDelete){this.$$.count.value+=1;return this}else{var clone=Object.create(Object.getPrototypeOf(this),{$$:{value:shallowCopyInternalPointer(this.$$)}});clone.$$.count.value+=1;clone.$$.deleteScheduled=false;return clone}}function runDestructor(handle){var $$=handle.$$;if($$.smartPtr){$$.smartPtrType.rawDestructor($$.smartPtr)}else{$$.ptrType.registeredClass.rawDestructor($$.ptr)}}function ClassHandle_delete(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion")}this.$$.count.value-=1;var toDelete=0===this.$$.count.value;if(toDelete){runDestructor(this)}if(!this.$$.preservePointerOnDelete){this.$$.smartPtr=undefined;this.$$.ptr=undefined}}function ClassHandle_isDeleted(){return!this.$$.ptr}var delayFunction=undefined;var deletionQueue=[];function flushPendingDeletes(){while(deletionQueue.length){var obj=deletionQueue.pop();obj.$$.deleteScheduled=false;obj["delete"]()}}function ClassHandle_deleteLater(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion")}deletionQueue.push(this);if(deletionQueue.length===1&&delayFunction){delayFunction(flushPendingDeletes)}this.$$.deleteScheduled=true;return this}function init_ClassHandle(){ClassHandle.prototype["isAliasOf"]=ClassHandle_isAliasOf;ClassHandle.prototype["clone"]=ClassHandle_clone;ClassHandle.prototype["delete"]=ClassHandle_delete;ClassHandle.prototype["isDeleted"]=ClassHandle_isDeleted;ClassHandle.prototype["deleteLater"]=ClassHandle_deleteLater}function ClassHandle(){}var registeredPointers={};function ensureOverloadTable(proto,methodName,humanName){if(undefined===proto[methodName].overloadTable){var prevFunc=proto[methodName];proto[methodName]=(function(){if(!proto[methodName].overloadTable.hasOwnProperty(arguments.length)){throwBindingError("Function '"+humanName+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+proto[methodName].overloadTable+")!")}return proto[methodName].overloadTable[arguments.length].apply(this,arguments)});proto[methodName].overloadTable=[];proto[methodName].overloadTable[prevFunc.argCount]=prevFunc}}function exposePublicSymbol(name,value,numArguments){if(Module.hasOwnProperty(name)){if(undefined===numArguments||undefined!==Module[name].overloadTable&&undefined!==Module[name].overloadTable[numArguments]){throwBindingError("Cannot register public name '"+name+"' twice")}ensureOverloadTable(Module,name,name);if(Module.hasOwnProperty(numArguments)){throwBindingError("Cannot register multiple overloads of a function with the same number of arguments ("+numArguments+")!")}Module[name].overloadTable[numArguments]=value}else{Module[name]=value;if(undefined!==numArguments){Module[name].numArguments=numArguments}}}function RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast){this.name=name;this.constructor=constructor;this.instancePrototype=instancePrototype;this.rawDestructor=rawDestructor;this.baseClass=baseClass;this.getActualType=getActualType;this.upcast=upcast;this.downcast=downcast;this.pureVirtualFunctions=[]}function upcastPointer(ptr,ptrClass,desiredClass){while(ptrClass!==desiredClass){if(!ptrClass.upcast){throwBindingError("Expected null or instance of "+desiredClass.name+", got an instance of "+ptrClass.name)}ptr=ptrClass.upcast(ptr);ptrClass=ptrClass.baseClass}return ptr}function constNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name)}return 0}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name)}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name)}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function genericPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name)}if(this.isSmartPointer){var ptr=this.rawConstructor();if(destructors!==null){destructors.push(this.rawDestructor,ptr)}return ptr}else{return 0}}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name)}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name)}if(!this.isConst&&handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+" to parameter type "+this.name)}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);if(this.isSmartPointer){if(undefined===handle.$$.smartPtr){throwBindingError("Passing raw pointer to smart pointer is illegal")}switch(this.sharingPolicy){case 0:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr}else{throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+" to parameter type "+this.name)}break;case 1:ptr=handle.$$.smartPtr;break;case 2:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr}else{var clonedHandle=handle["clone"]();ptr=this.rawShare(ptr,__emval_register((function(){clonedHandle["delete"]()})));if(destructors!==null){destructors.push(this.rawDestructor,ptr)}}break;default:throwBindingError("Unsupporting sharing policy")}}return ptr}function nonConstNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name)}return 0}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name)}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name)}if(handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+handle.$$.ptrType.name+" to parameter type "+this.name)}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function RegisteredPointer_getPointee(ptr){if(this.rawGetPointee){ptr=this.rawGetPointee(ptr)}return ptr}function RegisteredPointer_destructor(ptr){if(this.rawDestructor){this.rawDestructor(ptr)}}function RegisteredPointer_deleteObject(handle){if(handle!==null){handle["delete"]()}}function downcastPointer(ptr,ptrClass,desiredClass){if(ptrClass===desiredClass){return ptr}if(undefined===desiredClass.baseClass){return null}var rv=downcastPointer(ptr,ptrClass,desiredClass.baseClass);if(rv===null){return null}return desiredClass.downcast(rv)}function getInheritedInstanceCount(){return Object.keys(registeredInstances).length}function getLiveInheritedInstances(){var rv=[];for(var k in registeredInstances){if(registeredInstances.hasOwnProperty(k)){rv.push(registeredInstances[k])}}return rv}function setDelayFunction(fn){delayFunction=fn;if(deletionQueue.length&&delayFunction){delayFunction(flushPendingDeletes)}}function init_embind(){Module["getInheritedInstanceCount"]=getInheritedInstanceCount;Module["getLiveInheritedInstances"]=getLiveInheritedInstances;Module["flushPendingDeletes"]=flushPendingDeletes;Module["setDelayFunction"]=setDelayFunction}var registeredInstances={};function getBasestPointer(class_,ptr){if(ptr===undefined){throwBindingError("ptr should not be undefined")}while(class_.baseClass){ptr=class_.upcast(ptr);class_=class_.baseClass}return ptr}function getInheritedInstance(class_,ptr){ptr=getBasestPointer(class_,ptr);return registeredInstances[ptr]}var _throwInternalError=undefined;function makeClassHandle(prototype,record){if(!record.ptrType||!record.ptr){throwInternalError("makeClassHandle requires ptr and ptrType")}var hasSmartPtrType=!!record.smartPtrType;var hasSmartPtr=!!record.smartPtr;if(hasSmartPtrType!==hasSmartPtr){throwInternalError("Both smartPtrType and smartPtr must be specified")}record.count={value:1};return Object.create(prototype,{$$:{value:record}})}function RegisteredPointer_fromWireType(ptr){var rawPointer=this.getPointee(ptr);if(!rawPointer){this.destructor(ptr);return null}var registeredInstance=getInheritedInstance(this.registeredClass,rawPointer);if(undefined!==registeredInstance){if(0===registeredInstance.$$.count.value){registeredInstance.$$.ptr=rawPointer;registeredInstance.$$.smartPtr=ptr;return registeredInstance["clone"]()}else{var rv=registeredInstance["clone"]();this.destructor(ptr);return rv}}function makeDefaultHandle(){if(this.isSmartPointer){return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:rawPointer,smartPtrType:this,smartPtr:ptr})}else{return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this,ptr:ptr})}}var actualType=this.registeredClass.getActualType(rawPointer);var registeredPointerRecord=registeredPointers[actualType];if(!registeredPointerRecord){return makeDefaultHandle.call(this)}var toType;if(this.isConst){toType=registeredPointerRecord.constPointerType}else{toType=registeredPointerRecord.pointerType}var dp=downcastPointer(rawPointer,this.registeredClass,toType.registeredClass);if(dp===null){return makeDefaultHandle.call(this)}if(this.isSmartPointer){return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp,smartPtrType:this,smartPtr:ptr})}else{return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp})}}function init_RegisteredPointer(){RegisteredPointer.prototype.getPointee=RegisteredPointer_getPointee;RegisteredPointer.prototype.destructor=RegisteredPointer_destructor;RegisteredPointer.prototype["argPackAdvance"]=8;RegisteredPointer.prototype["readValueFromPointer"]=simpleReadValueFromPointer;RegisteredPointer.prototype["deleteObject"]=RegisteredPointer_deleteObject;RegisteredPointer.prototype["fromWireType"]=RegisteredPointer_fromWireType}function RegisteredPointer(name,registeredClass,isReference,isConst,isSmartPointer,pointeeType,sharingPolicy,rawGetPointee,rawConstructor,rawShare,rawDestructor){this.name=name;this.registeredClass=registeredClass;this.isReference=isReference;this.isConst=isConst;this.isSmartPointer=isSmartPointer;this.pointeeType=pointeeType;this.sharingPolicy=sharingPolicy;this.rawGetPointee=rawGetPointee;this.rawConstructor=rawConstructor;this.rawShare=rawShare;this.rawDestructor=rawDestructor;if(!isSmartPointer&&registeredClass.baseClass===undefined){if(isConst){this["toWireType"]=constNoSmartPtrRawPointerToWireType;this.destructorFunction=null}else{this["toWireType"]=nonConstNoSmartPtrRawPointerToWireType;this.destructorFunction=null}}else{this["toWireType"]=genericPointerToWireType}}function replacePublicSymbol(name,value,numArguments){if(!Module.hasOwnProperty(name)){throwInternalError("Replacing nonexistant public symbol")}if(undefined!==Module[name].overloadTable&&undefined!==numArguments){Module[name].overloadTable[numArguments]=value}else{Module[name]=value}}function requireFunction(signature,rawFunction){signature=readLatin1String(signature);function makeDynCaller(dynCall){var args=[];for(var i=1;i<signature.length;++i){args.push("a"+i)}var name="dynCall_"+signature+"_"+rawFunction;var body="return function "+name+"("+args.join(", ")+") {\n";body+="    return dynCall(rawFunction"+(args.length?", ":"")+args.join(", ")+");\n";body+="};\n";return(new Function("dynCall","rawFunction",body))(dynCall,rawFunction)}var fp;if(Module["FUNCTION_TABLE_"+signature]!==undefined){fp=Module["FUNCTION_TABLE_"+signature][rawFunction]}else if(typeof FUNCTION_TABLE!=="undefined"){fp=FUNCTION_TABLE[rawFunction]}else{var dc=asm["dynCall_"+signature];if(dc===undefined){dc=asm["dynCall_"+signature.replace(/f/g,"d")];if(dc===undefined){throwBindingError("No dynCall invoker for signature: "+signature)}}fp=makeDynCaller(dc)}if(typeof fp!=="function"){throwBindingError("unknown function pointer with signature "+signature+": "+rawFunction)}return fp}var UnboundTypeError=undefined;function throwUnboundTypeError(message,types){var unboundTypes=[];var seen={};function visit(type){if(seen[type]){return}if(registeredTypes[type]){return}if(typeDependencies[type]){typeDependencies[type].forEach(visit);return}unboundTypes.push(type);seen[type]=true}types.forEach(visit);throw new UnboundTypeError(message+": "+unboundTypes.map(getTypeName).join([", "]))}function __embind_register_class(rawType,rawPointerType,rawConstPointerType,baseClassRawType,getActualTypeSignature,getActualType,upcastSignature,upcast,downcastSignature,downcast,name,destructorSignature,rawDestructor){name=readLatin1String(name);getActualType=requireFunction(getActualTypeSignature,getActualType);if(upcast){upcast=requireFunction(upcastSignature,upcast)}if(downcast){downcast=requireFunction(downcastSignature,downcast)}rawDestructor=requireFunction(destructorSignature,rawDestructor);var legalFunctionName=makeLegalFunctionName(name);exposePublicSymbol(legalFunctionName,(function(){throwUnboundTypeError("Cannot construct "+name+" due to unbound types",[baseClassRawType])}));whenDependentTypesAreResolved([rawType,rawPointerType,rawConstPointerType],baseClassRawType?[baseClassRawType]:[],(function(base){base=base[0];var baseClass;var basePrototype;if(baseClassRawType){baseClass=base.registeredClass;basePrototype=baseClass.instancePrototype}else{basePrototype=ClassHandle.prototype}var constructor=createNamedFunction(legalFunctionName,(function(){if(Object.getPrototypeOf(this)!==instancePrototype){throw new BindingError("Use 'new' to construct "+name)}if(undefined===registeredClass.constructor_body){throw new BindingError(name+" has no accessible constructor")}var body=registeredClass.constructor_body[arguments.length];if(undefined===body){throw new BindingError("Tried to invoke ctor of "+name+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(registeredClass.constructor_body).toString()+") parameters instead!")}return body.apply(this,arguments)}));var instancePrototype=Object.create(basePrototype,{constructor:{value:constructor}});constructor.prototype=instancePrototype;var registeredClass=new RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast);var referenceConverter=new RegisteredPointer(name,registeredClass,true,false,false);var pointerConverter=new RegisteredPointer(name+"*",registeredClass,false,false,false);var constPointerConverter=new RegisteredPointer(name+" const*",registeredClass,false,true,false);registeredPointers[rawType]={pointerType:pointerConverter,constPointerType:constPointerConverter};replacePublicSymbol(legalFunctionName,constructor);return[referenceConverter,pointerConverter,constPointerConverter]}))}function _pthread_cond_wait(){return 0}var PTHREAD_SPECIFIC={};function _pthread_getspecific(key){return PTHREAD_SPECIFIC[key]||0}var _fabs=Math_abs;function _recv(fd,buf,len,flags){var sock=SOCKFS.getSocket(fd);if(!sock){___setErrNo(ERRNO_CODES.EBADF);return-1}return _read(fd,buf,len)}function _pread(fildes,buf,nbyte,offset){var stream=FS.getStream(fildes);if(!stream){___setErrNo(ERRNO_CODES.EBADF);return-1}try{var slab=HEAP8;return FS.read(stream,slab,buf,nbyte,offset)}catch(e){FS.handleFSError(e);return-1}}function _read(fildes,buf,nbyte){var stream=FS.getStream(fildes);if(!stream){___setErrNo(ERRNO_CODES.EBADF);return-1}try{var slab=HEAP8;return FS.read(stream,slab,buf,nbyte)}catch(e){FS.handleFSError(e);return-1}}function _fread(ptr,size,nitems,stream){var bytesToRead=nitems*size;if(bytesToRead==0){return 0}var bytesRead=0;var streamObj=FS.getStreamFromPtr(stream);if(!streamObj){___setErrNo(ERRNO_CODES.EBADF);return 0}while(streamObj.ungotten.length&&bytesToRead>0){HEAP8[ptr++>>0]=streamObj.ungotten.pop();bytesToRead--;bytesRead++}var err=_read(streamObj.fd,ptr,bytesToRead);if(err==-1){if(streamObj)streamObj.error=true;return 0}bytesRead+=err;if(bytesRead<bytesToRead)streamObj.eof=true;return bytesRead/size|0}function _fgetc(stream){var streamObj=FS.getStreamFromPtr(stream);if(!streamObj)return-1;if(streamObj.eof||streamObj.error)return-1;var ret=_fread(_fgetc.ret,1,1,stream);if(ret==0){return-1}else if(ret==-1){streamObj.error=true;return-1}else{return HEAPU8[_fgetc.ret>>0]}}function _getc(){return _fgetc.apply(null,arguments)}function _embind_repr(v){if(v===null){return"null"}var t=typeof v;if(t==="object"||t==="array"||t==="function"){return v.toString()}else{return""+v}}function integerReadValueFromPointer(name,shift,signed){switch(shift){case 0:return signed?function readS8FromPointer(pointer){return HEAP8[pointer]}:function readU8FromPointer(pointer){return HEAPU8[pointer]};case 1:return signed?function readS16FromPointer(pointer){return HEAP16[pointer>>1]}:function readU16FromPointer(pointer){return HEAPU16[pointer>>1]};case 2:return signed?function readS32FromPointer(pointer){return HEAP32[pointer>>2]}:function readU32FromPointer(pointer){return HEAPU32[pointer>>2]};default:throw new TypeError("Unknown integer type: "+name)}}function __embind_register_integer(primitiveType,name,size,minRange,maxRange){name=readLatin1String(name);if(maxRange===-1){maxRange=4294967295}var shift=getShiftFromSize(size);registerType(primitiveType,{name:name,"fromWireType":(function(value){return value}),"toWireType":(function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}if(value<minRange||value>maxRange){throw new TypeError('Passing a number "'+_embind_repr(value)+'" from JS side to C/C++ side to an argument of type "'+name+'", which is outside the valid range ['+minRange+", "+maxRange+"]!")}return value|0}),"argPackAdvance":8,"readValueFromPointer":integerReadValueFromPointer(name,shift,minRange!==0),destructorFunction:null})}function _emscripten_set_main_loop_timing(mode,value){Browser.mainLoop.timingMode=mode;Browser.mainLoop.timingValue=value;if(!Browser.mainLoop.func){return 1}if(mode==0){Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler(){setTimeout(Browser.mainLoop.runner,value)};Browser.mainLoop.method="timeout"}else if(mode==1){Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler(){Browser.requestAnimationFrame(Browser.mainLoop.runner)};Browser.mainLoop.method="rAF"}return 0}function _emscripten_set_main_loop(func,fps,simulateInfiniteLoop,arg){Module["noExitRuntime"]=true;assert(!Browser.mainLoop.func,"emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");Browser.mainLoop.func=func;Browser.mainLoop.arg=arg;var thisMainLoopId=Browser.mainLoop.currentlyRunningMainloop;Browser.mainLoop.runner=function Browser_mainLoop_runner(){if(ABORT)return;if(Browser.mainLoop.queue.length>0){var start=Date.now();var blocker=Browser.mainLoop.queue.shift();blocker.func(blocker.arg);if(Browser.mainLoop.remainingBlockers){var remaining=Browser.mainLoop.remainingBlockers;var next=remaining%1==0?remaining-1:Math.floor(remaining);if(blocker.counted){Browser.mainLoop.remainingBlockers=next}else{next=next+.5;Browser.mainLoop.remainingBlockers=(8*remaining+next)/9}}console.log('main loop blocker "'+blocker.name+'" took '+(Date.now()-start)+" ms");Browser.mainLoop.updateStatus();setTimeout(Browser.mainLoop.runner,0);return}if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop)return;Browser.mainLoop.currentFrameNumber=Browser.mainLoop.currentFrameNumber+1|0;if(Browser.mainLoop.timingMode==1&&Browser.mainLoop.timingValue>1&&Browser.mainLoop.currentFrameNumber%Browser.mainLoop.timingValue!=0){Browser.mainLoop.scheduler();return}if(Browser.mainLoop.method==="timeout"&&Module.ctx){Module.printErr("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!");Browser.mainLoop.method=""}Browser.mainLoop.runIter((function(){if(typeof arg!=="undefined"){Runtime.dynCall("vi",func,[arg])}else{Runtime.dynCall("v",func)}}));if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop)return;if(typeof SDL==="object"&&SDL.audio&&SDL.audio.queueNewAudioData)SDL.audio.queueNewAudioData();Browser.mainLoop.scheduler()};if(fps&&fps>0)_emscripten_set_main_loop_timing(0,1e3/fps);else _emscripten_set_main_loop_timing(1,1);Browser.mainLoop.scheduler();if(simulateInfiniteLoop){throw"SimulateInfiniteLoop"}}var Browser={mainLoop:{scheduler:null,method:"",currentlyRunningMainloop:0,func:null,arg:0,timingMode:0,timingValue:0,currentFrameNumber:0,queue:[],pause:(function(){Browser.mainLoop.scheduler=null;Browser.mainLoop.currentlyRunningMainloop++}),resume:(function(){Browser.mainLoop.currentlyRunningMainloop++;var timingMode=Browser.mainLoop.timingMode;var timingValue=Browser.mainLoop.timingValue;var func=Browser.mainLoop.func;Browser.mainLoop.func=null;_emscripten_set_main_loop(func,0,false,Browser.mainLoop.arg);_emscripten_set_main_loop_timing(timingMode,timingValue)}),updateStatus:(function(){if(Module["setStatus"]){var message=Module["statusMessage"]||"Please wait...";var remaining=Browser.mainLoop.remainingBlockers;var expected=Browser.mainLoop.expectedBlockers;if(remaining){if(remaining<expected){Module["setStatus"](message+" ("+(expected-remaining)+"/"+expected+")")}else{Module["setStatus"](message)}}else{Module["setStatus"]("")}}}),runIter:(function(func){if(ABORT)return;if(Module["preMainLoop"]){var preRet=Module["preMainLoop"]();if(preRet===false){return}}try{func()}catch(e){if(e instanceof ExitStatus){return}else{if(e&&typeof e==="object"&&e.stack)Module.printErr("exception thrown: "+[e,e.stack]);throw e}}if(Module["postMainLoop"])Module["postMainLoop"]()})},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:(function(){if(!Module["preloadPlugins"])Module["preloadPlugins"]=[];if(Browser.initted)return;Browser.initted=true;try{new Blob;Browser.hasBlobConstructor=true}catch(e){Browser.hasBlobConstructor=false;console.log("warning: no blob constructor, cannot create blobs with mimetypes")}Browser.BlobBuilder=typeof MozBlobBuilder!="undefined"?MozBlobBuilder:typeof WebKitBlobBuilder!="undefined"?WebKitBlobBuilder:!Browser.hasBlobConstructor?console.log("warning: no BlobBuilder"):null;Browser.URLObject=typeof window!="undefined"?window.URL?window.URL:window.webkitURL:undefined;if(!Module.noImageDecoding&&typeof Browser.URLObject==="undefined"){console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");Module.noImageDecoding=true}var imagePlugin={};imagePlugin["canHandle"]=function imagePlugin_canHandle(name){return!Module.noImageDecoding&&/\.(jpg|jpeg|png|bmp)$/i.test(name)};imagePlugin["handle"]=function imagePlugin_handle(byteArray,name,onload,onerror){var b=null;if(Browser.hasBlobConstructor){try{b=new Blob([byteArray],{type:Browser.getMimetype(name)});if(b.size!==byteArray.length){b=new Blob([(new Uint8Array(byteArray)).buffer],{type:Browser.getMimetype(name)})}}catch(e){Runtime.warnOnce("Blob constructor present but fails: "+e+"; falling back to blob builder")}}if(!b){var bb=new Browser.BlobBuilder;bb.append((new Uint8Array(byteArray)).buffer);b=bb.getBlob()}var url=Browser.URLObject.createObjectURL(b);var img=new Image;img.onload=function img_onload(){assert(img.complete,"Image "+name+" could not be decoded");var canvas=document.createElement("canvas");canvas.width=img.width;canvas.height=img.height;var ctx=canvas.getContext("2d");ctx.drawImage(img,0,0);Module["preloadedImages"][name]=canvas;Browser.URLObject.revokeObjectURL(url);if(onload)onload(byteArray)};img.onerror=function img_onerror(event){console.log("Image "+url+" could not be decoded");if(onerror)onerror()};img.src=url};Module["preloadPlugins"].push(imagePlugin);var audioPlugin={};audioPlugin["canHandle"]=function audioPlugin_canHandle(name){return!Module.noAudioDecoding&&name.substr(-4)in{".ogg":1,".wav":1,".mp3":1}};audioPlugin["handle"]=function audioPlugin_handle(byteArray,name,onload,onerror){var done=false;function finish(audio){if(done)return;done=true;Module["preloadedAudios"][name]=audio;if(onload)onload(byteArray)}function fail(){if(done)return;done=true;Module["preloadedAudios"][name]=new Audio;if(onerror)onerror()}if(Browser.hasBlobConstructor){try{var b=new Blob([byteArray],{type:Browser.getMimetype(name)})}catch(e){return fail()}var url=Browser.URLObject.createObjectURL(b);var audio=new Audio;audio.addEventListener("canplaythrough",(function(){finish(audio)}),false);audio.onerror=function audio_onerror(event){if(done)return;console.log("warning: browser could not fully decode audio "+name+", trying slower base64 approach");function encode64(data){var BASE="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var PAD="=";var ret="";var leftchar=0;var leftbits=0;for(var i=0;i<data.length;i++){leftchar=leftchar<<8|data[i];leftbits+=8;while(leftbits>=6){var curr=leftchar>>leftbits-6&63;leftbits-=6;ret+=BASE[curr]}}if(leftbits==2){ret+=BASE[(leftchar&3)<<4];ret+=PAD+PAD}else if(leftbits==4){ret+=BASE[(leftchar&15)<<2];ret+=PAD}return ret}audio.src="data:audio/x-"+name.substr(-3)+";base64,"+encode64(byteArray);finish(audio)};audio.src=url;Browser.safeSetTimeout((function(){finish(audio)}),1e4)}else{return fail()}};Module["preloadPlugins"].push(audioPlugin);var canvas=Module["canvas"];function pointerLockChange(){Browser.pointerLock=document["pointerLockElement"]===canvas||document["mozPointerLockElement"]===canvas||document["webkitPointerLockElement"]===canvas||document["msPointerLockElement"]===canvas}if(canvas){canvas.requestPointerLock=canvas["requestPointerLock"]||canvas["mozRequestPointerLock"]||canvas["webkitRequestPointerLock"]||canvas["msRequestPointerLock"]||(function(){});canvas.exitPointerLock=document["exitPointerLock"]||document["mozExitPointerLock"]||document["webkitExitPointerLock"]||document["msExitPointerLock"]||(function(){});canvas.exitPointerLock=canvas.exitPointerLock.bind(document);document.addEventListener("pointerlockchange",pointerLockChange,false);document.addEventListener("mozpointerlockchange",pointerLockChange,false);document.addEventListener("webkitpointerlockchange",pointerLockChange,false);document.addEventListener("mspointerlockchange",pointerLockChange,false);if(Module["elementPointerLock"]){canvas.addEventListener("click",(function(ev){if(!Browser.pointerLock&&canvas.requestPointerLock){canvas.requestPointerLock();ev.preventDefault()}}),false)}}}),createContext:(function(canvas,useWebGL,setInModule,webGLContextAttributes){if(useWebGL&&Module.ctx&&canvas==Module.canvas)return Module.ctx;var ctx;var contextHandle;if(useWebGL){var contextAttributes={antialias:false,alpha:false};if(webGLContextAttributes){for(var attribute in webGLContextAttributes){contextAttributes[attribute]=webGLContextAttributes[attribute]}}contextHandle=GL.createContext(canvas,contextAttributes);if(contextHandle){ctx=GL.getContext(contextHandle).GLctx}canvas.style.backgroundColor="black"}else{ctx=canvas.getContext("2d")}if(!ctx)return null;if(setInModule){if(!useWebGL)assert(typeof GLctx==="undefined","cannot set in module if GLctx is used, but we are a non-GL context that would replace it");Module.ctx=ctx;if(useWebGL)GL.makeContextCurrent(contextHandle);Module.useWebGL=useWebGL;Browser.moduleContextCreatedCallbacks.forEach((function(callback){callback()}));Browser.init()}return ctx}),destroyContext:(function(canvas,useWebGL,setInModule){}),fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:(function(lockPointer,resizeCanvas){Browser.lockPointer=lockPointer;Browser.resizeCanvas=resizeCanvas;if(typeof Browser.lockPointer==="undefined")Browser.lockPointer=true;if(typeof Browser.resizeCanvas==="undefined")Browser.resizeCanvas=false;var canvas=Module["canvas"];function fullScreenChange(){Browser.isFullScreen=false;var canvasContainer=canvas.parentNode;if((document["webkitFullScreenElement"]||document["webkitFullscreenElement"]||document["mozFullScreenElement"]||document["mozFullscreenElement"]||document["fullScreenElement"]||document["fullscreenElement"]||document["msFullScreenElement"]||document["msFullscreenElement"]||document["webkitCurrentFullScreenElement"])===canvasContainer){canvas.cancelFullScreen=document["cancelFullScreen"]||document["mozCancelFullScreen"]||document["webkitCancelFullScreen"]||document["msExitFullscreen"]||document["exitFullscreen"]||(function(){});canvas.cancelFullScreen=canvas.cancelFullScreen.bind(document);if(Browser.lockPointer)canvas.requestPointerLock();Browser.isFullScreen=true;if(Browser.resizeCanvas)Browser.setFullScreenCanvasSize()}else{canvasContainer.parentNode.insertBefore(canvas,canvasContainer);canvasContainer.parentNode.removeChild(canvasContainer);if(Browser.resizeCanvas)Browser.setWindowedCanvasSize()}if(Module["onFullScreen"])Module["onFullScreen"](Browser.isFullScreen);Browser.updateCanvasDimensions(canvas)}if(!Browser.fullScreenHandlersInstalled){Browser.fullScreenHandlersInstalled=true;document.addEventListener("fullscreenchange",fullScreenChange,false);document.addEventListener("mozfullscreenchange",fullScreenChange,false);document.addEventListener("webkitfullscreenchange",fullScreenChange,false);document.addEventListener("MSFullscreenChange",fullScreenChange,false)}var canvasContainer=document.createElement("div");canvas.parentNode.insertBefore(canvasContainer,canvas);canvasContainer.appendChild(canvas);canvasContainer.requestFullScreen=canvasContainer["requestFullScreen"]||canvasContainer["mozRequestFullScreen"]||canvasContainer["msRequestFullscreen"]||(canvasContainer["webkitRequestFullScreen"]?(function(){canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"])}):null);canvasContainer.requestFullScreen()}),nextRAF:0,fakeRequestAnimationFrame:(function(func){var now=Date.now();if(Browser.nextRAF===0){Browser.nextRAF=now+1e3/60}else{while(now+2>=Browser.nextRAF){Browser.nextRAF+=1e3/60}}var delay=Math.max(Browser.nextRAF-now,0);setTimeout(func,delay)}),requestAnimationFrame:function requestAnimationFrame(func){if(typeof window==="undefined"){Browser.fakeRequestAnimationFrame(func)}else{if(!window.requestAnimationFrame){window.requestAnimationFrame=window["requestAnimationFrame"]||window["mozRequestAnimationFrame"]||window["webkitRequestAnimationFrame"]||window["msRequestAnimationFrame"]||window["oRequestAnimationFrame"]||Browser.fakeRequestAnimationFrame}window.requestAnimationFrame(func)}},safeCallback:(function(func){return(function(){if(!ABORT)return func.apply(null,arguments)})}),safeRequestAnimationFrame:(function(func){return Browser.requestAnimationFrame((function(){if(!ABORT)func()}))}),safeSetTimeout:(function(func,timeout){Module["noExitRuntime"]=true;return setTimeout((function(){if(!ABORT)func()}),timeout)}),safeSetInterval:(function(func,timeout){Module["noExitRuntime"]=true;return setInterval((function(){if(!ABORT)func()}),timeout)}),getMimetype:(function(name){return{"jpg":"image/jpeg","jpeg":"image/jpeg","png":"image/png","bmp":"image/bmp","ogg":"audio/ogg","wav":"audio/wav","mp3":"audio/mpeg"}[name.substr(name.lastIndexOf(".")+1)]}),getUserMedia:(function(func){if(!window.getUserMedia){window.getUserMedia=navigator["getUserMedia"]||navigator["mozGetUserMedia"]}window.getUserMedia(func)}),getMovementX:(function(event){return event["movementX"]||event["mozMovementX"]||event["webkitMovementX"]||0}),getMovementY:(function(event){return event["movementY"]||event["mozMovementY"]||event["webkitMovementY"]||0}),getMouseWheelDelta:(function(event){var delta=0;switch(event.type){case"DOMMouseScroll":delta=event.detail;break;case"mousewheel":delta=event.wheelDelta;break;case"wheel":delta=event["deltaY"];break;default:throw"unrecognized mouse wheel event: "+event.type}return delta}),mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,touches:{},lastTouches:{},calculateMouseEvent:(function(event){if(Browser.pointerLock){if(event.type!="mousemove"&&"mozMovementX"in event){Browser.mouseMovementX=Browser.mouseMovementY=0}else{Browser.mouseMovementX=Browser.getMovementX(event);Browser.mouseMovementY=Browser.getMovementY(event)}if(typeof SDL!="undefined"){Browser.mouseX=SDL.mouseX+Browser.mouseMovementX;Browser.mouseY=SDL.mouseY+Browser.mouseMovementY}else{Browser.mouseX+=Browser.mouseMovementX;Browser.mouseY+=Browser.mouseMovementY}}else{var rect=Module["canvas"].getBoundingClientRect();var cw=Module["canvas"].width;var ch=Module["canvas"].height;var scrollX=typeof window.scrollX!=="undefined"?window.scrollX:window.pageXOffset;var scrollY=typeof window.scrollY!=="undefined"?window.scrollY:window.pageYOffset;if(event.type==="touchstart"||event.type==="touchend"||event.type==="touchmove"){var touch=event.touch;if(touch===undefined){return}var adjustedX=touch.pageX-(scrollX+rect.left);var adjustedY=touch.pageY-(scrollY+rect.top);adjustedX=adjustedX*(cw/rect.width);adjustedY=adjustedY*(ch/rect.height);var coords={x:adjustedX,y:adjustedY};if(event.type==="touchstart"){Browser.lastTouches[touch.identifier]=coords;Browser.touches[touch.identifier]=coords}else if(event.type==="touchend"||event.type==="touchmove"){Browser.lastTouches[touch.identifier]=Browser.touches[touch.identifier];Browser.touches[touch.identifier]={x:adjustedX,y:adjustedY}}return}var x=event.pageX-(scrollX+rect.left);var y=event.pageY-(scrollY+rect.top);x=x*(cw/rect.width);y=y*(ch/rect.height);Browser.mouseMovementX=x-Browser.mouseX;Browser.mouseMovementY=y-Browser.mouseY;Browser.mouseX=x;Browser.mouseY=y}}),xhrLoad:(function(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response)}else{onerror()}};xhr.onerror=onerror;xhr.send(null)}),asyncLoad:(function(url,onload,onerror,noRunDep){Browser.xhrLoad(url,(function(arrayBuffer){assert(arrayBuffer,'Loading data file "'+url+'" failed (no arrayBuffer).');onload(new Uint8Array(arrayBuffer));if(!noRunDep)removeRunDependency("al "+url)}),(function(event){if(onerror){onerror()}else{throw'Loading data file "'+url+'" failed.'}}));if(!noRunDep)addRunDependency("al "+url)}),resizeListeners:[],updateResizeListeners:(function(){var canvas=Module["canvas"];Browser.resizeListeners.forEach((function(listener){listener(canvas.width,canvas.height)}))}),setCanvasSize:(function(width,height,noUpdates){var canvas=Module["canvas"];Browser.updateCanvasDimensions(canvas,width,height);if(!noUpdates)Browser.updateResizeListeners()}),windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:(function(){if(typeof SDL!="undefined"){var flags=HEAPU32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2];flags=flags|8388608;HEAP32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2]=flags}Browser.updateResizeListeners()}),setWindowedCanvasSize:(function(){if(typeof SDL!="undefined"){var flags=HEAPU32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2];flags=flags&~8388608;HEAP32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2]=flags}Browser.updateResizeListeners()}),updateCanvasDimensions:(function(canvas,wNative,hNative){if(wNative&&hNative){canvas.widthNative=wNative;canvas.heightNative=hNative}else{wNative=canvas.widthNative;hNative=canvas.heightNative}var w=wNative;var h=hNative;if(Module["forcedAspectRatio"]&&Module["forcedAspectRatio"]>0){if(w/h<Module["forcedAspectRatio"]){w=Math.round(h*Module["forcedAspectRatio"])}else{h=Math.round(w/Module["forcedAspectRatio"])}}if((document["webkitFullScreenElement"]||document["webkitFullscreenElement"]||document["mozFullScreenElement"]||document["mozFullscreenElement"]||document["fullScreenElement"]||document["fullscreenElement"]||document["msFullScreenElement"]||document["msFullscreenElement"]||document["webkitCurrentFullScreenElement"])===canvas.parentNode&&typeof screen!="undefined"){var factor=Math.min(screen.width/w,screen.height/h);w=Math.round(w*factor);h=Math.round(h*factor)}if(Browser.resizeCanvas){if(canvas.width!=w)canvas.width=w;if(canvas.height!=h)canvas.height=h;if(typeof canvas.style!="undefined"){canvas.style.removeProperty("width");canvas.style.removeProperty("height")}}else{if(canvas.width!=wNative)canvas.width=wNative;if(canvas.height!=hNative)canvas.height=hNative;if(typeof canvas.style!="undefined"){if(w!=wNative||h!=hNative){canvas.style.setProperty("width",w+"px","important");canvas.style.setProperty("height",h+"px","important")}else{canvas.style.removeProperty("width");canvas.style.removeProperty("height")}}}}),wgetRequests:{},nextWgetRequestHandle:0,getNextWgetRequestHandle:(function(){var handle=Browser.nextWgetRequestHandle;Browser.nextWgetRequestHandle++;return handle})};function _pthread_setspecific(key,value){if(!(key in PTHREAD_SPECIFIC)){return ERRNO_CODES.EINVAL}PTHREAD_SPECIFIC[key]=value;return 0}function ___ctype_b_loc(){var me=___ctype_b_loc;if(!me.ret){var values=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,8195,8194,8194,8194,8194,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,24577,49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,55304,55304,55304,55304,55304,55304,55304,55304,55304,55304,49156,49156,49156,49156,49156,49156,49156,54536,54536,54536,54536,54536,54536,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,49156,49156,49156,49156,49156,49156,54792,54792,54792,54792,54792,54792,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,49156,49156,49156,49156,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];var i16size=2;var arr=_malloc(values.length*i16size);for(var i=0;i<values.length;i++){HEAP16[arr+i*i16size>>1]=values[i]}me.ret=allocate([arr+128*i16size],"i16*",ALLOC_NORMAL)}return me.ret}function _freelocale(locale){_free(locale)}function ___cxa_allocate_exception(size){return _malloc(size)}function _fmod(x,y){return x%y}function _fmodl(){return _fmod.apply(null,arguments)}function _catopen(name,oflag){return-1}function _catgets(catd,set_id,msg_id,s){return s}function floatReadValueFromPointer(name,shift){switch(shift){case 2:return(function(pointer){return this["fromWireType"](HEAPF32[pointer>>2])});case 3:return(function(pointer){return this["fromWireType"](HEAPF64[pointer>>3])});default:throw new TypeError("Unknown float type: "+name)}}function __embind_register_float(rawType,name,size){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":(function(value){return value}),"toWireType":(function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}return value}),"argPackAdvance":8,"readValueFromPointer":floatReadValueFromPointer(name,shift),destructorFunction:null})}function _time(ptr){var ret=Date.now()/1e3|0;if(ptr){HEAP32[ptr>>2]=ret}return ret}function ___ctype_toupper_loc(){var me=___ctype_toupper_loc;if(!me.ret){var values=[128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255];var i32size=4;var arr=_malloc(values.length*i32size);for(var i=0;i<values.length;i++){HEAP32[arr+i*i32size>>2]=values[i]}me.ret=allocate([arr+128*i32size],"i32*",ALLOC_NORMAL)}return me.ret}function ___cxa_guard_acquire(variable){if(!HEAP8[variable>>0]){HEAP8[variable>>0]=1;return 1}return 0}function ___ctype_tolower_loc(){var me=___ctype_tolower_loc;if(!me.ret){var values=[128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255];var i32size=4;var arr=_malloc(values.length*i32size);for(var i=0;i<values.length;i++){HEAP32[arr+i*i32size>>2]=values[i]}me.ret=allocate([arr+128*i32size],"i32*",ALLOC_NORMAL)}return me.ret}function ___cxa_begin_catch(ptr){__ZSt18uncaught_exceptionv.uncaught_exception--;EXCEPTIONS.caught.push(ptr);EXCEPTIONS.addRef(EXCEPTIONS.deAdjust(ptr));return ptr}var PTHREAD_SPECIFIC_NEXT_KEY=1;function _pthread_key_create(key,destructor){if(key==0){return ERRNO_CODES.EINVAL}HEAP32[key>>2]=PTHREAD_SPECIFIC_NEXT_KEY;PTHREAD_SPECIFIC[PTHREAD_SPECIFIC_NEXT_KEY]=0;PTHREAD_SPECIFIC_NEXT_KEY++;return 0}function heap32VectorToArray(count,firstElement){var array=[];for(var i=0;i<count;i++){array.push(HEAP32[(firstElement>>2)+i])}return array}function runDestructors(destructors){while(destructors.length){var ptr=destructors.pop();var del=destructors.pop();del(ptr)}}function __embind_register_class_constructor(rawClassType,argCount,rawArgTypesAddr,invokerSignature,invoker,rawConstructor){var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);invoker=requireFunction(invokerSignature,invoker);whenDependentTypesAreResolved([],[rawClassType],(function(classType){classType=classType[0];var humanName="constructor "+classType.name;if(undefined===classType.registeredClass.constructor_body){classType.registeredClass.constructor_body=[]}if(undefined!==classType.registeredClass.constructor_body[argCount-1]){throw new BindingError("Cannot register multiple constructors with identical number of parameters ("+(argCount-1)+") for class '"+classType.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!")}classType.registeredClass.constructor_body[argCount-1]=function unboundTypeHandler(){throwUnboundTypeError("Cannot construct "+classType.name+" due to unbound types",rawArgTypes)};whenDependentTypesAreResolved([],rawArgTypes,(function(argTypes){classType.registeredClass.constructor_body[argCount-1]=function constructor_body(){if(arguments.length!==argCount-1){throwBindingError(humanName+" called with "+arguments.length+" arguments, expected "+(argCount-1))}var destructors=[];var args=new Array(argCount);args[0]=rawConstructor;for(var i=1;i<argCount;++i){args[i]=argTypes[i]["toWireType"](destructors,arguments[i-1])}var ptr=invoker.apply(null,args);runDestructors(destructors);return argTypes[0]["fromWireType"](ptr)};return[]}));return[]}))}function _copysign(a,b){return __reallyNegative(a)===__reallyNegative(b)?a:-a}function _copysignl(){return _copysign.apply(null,arguments)}function new_(constructor,argumentList){if(!(constructor instanceof Function)){throw new TypeError("new_ called with constructor type "+typeof constructor+" which is not a function")}var dummy=createNamedFunction(constructor.name||"unknownFunctionName",(function(){}));dummy.prototype=constructor.prototype;var obj=new dummy;var r=constructor.apply(obj,argumentList);return r instanceof Object?r:obj}function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc){var argCount=argTypes.length;if(argCount<2){throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!")}var isClassMethodFunc=argTypes[1]!==null&&classType!==null;var argsList="";var argsListWired="";for(var i=0;i<argCount-2;++i){argsList+=(i!==0?", ":"")+"arg"+i;argsListWired+=(i!==0?", ":"")+"arg"+i+"Wired"}var invokerFnBody="return function "+makeLegalFunctionName(humanName)+"("+argsList+") {\n"+"if (arguments.length !== "+(argCount-2)+") {\n"+"throwBindingError('function "+humanName+" called with ' + arguments.length + ' arguments, expected "+(argCount-2)+" args!');\n"+"}\n";var needsDestructorStack=false;for(var i=1;i<argTypes.length;++i){if(argTypes[i]!==null&&argTypes[i].destructorFunction===undefined){needsDestructorStack=true;break}}if(needsDestructorStack){invokerFnBody+="var destructors = [];\n"}var dtorStack=needsDestructorStack?"destructors":"null";var args1=["throwBindingError","invoker","fn","runDestructors","retType","classParam"];var args2=[throwBindingError,cppInvokerFunc,cppTargetFunc,runDestructors,argTypes[0],argTypes[1]];if(isClassMethodFunc){invokerFnBody+="var thisWired = classParam.toWireType("+dtorStack+", this);\n"}for(var i=0;i<argCount-2;++i){invokerFnBody+="var arg"+i+"Wired = argType"+i+".toWireType("+dtorStack+", arg"+i+"); // "+argTypes[i+2].name+"\n";args1.push("argType"+i);args2.push(argTypes[i+2])}if(isClassMethodFunc){argsListWired="thisWired"+(argsListWired.length>0?", ":"")+argsListWired}var returns=argTypes[0].name!=="void";invokerFnBody+=(returns?"var rv = ":"")+"invoker(fn"+(argsListWired.length>0?", ":"")+argsListWired+");\n";if(needsDestructorStack){invokerFnBody+="runDestructors(destructors);\n"}else{for(var i=isClassMethodFunc?1:2;i<argTypes.length;++i){var paramName=i===1?"thisWired":"arg"+(i-2)+"Wired";if(argTypes[i].destructorFunction!==null){invokerFnBody+=paramName+"_dtor("+paramName+"); // "+argTypes[i].name+"\n";args1.push(paramName+"_dtor");args2.push(argTypes[i].destructorFunction)}}}if(returns){invokerFnBody+="var ret = retType.fromWireType(rv);\n"+"return ret;\n"}else{}invokerFnBody+="}\n";args1.push(invokerFnBody);var invokerFunction=new_(Function,args1).apply(null,args2);return invokerFunction}function __embind_register_class_function(rawClassType,methodName,argCount,rawArgTypesAddr,invokerSignature,rawInvoker,context,isPureVirtual){var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);methodName=readLatin1String(methodName);rawInvoker=requireFunction(invokerSignature,rawInvoker);whenDependentTypesAreResolved([],[rawClassType],(function(classType){classType=classType[0];var humanName=classType.name+"."+methodName;if(isPureVirtual){classType.registeredClass.pureVirtualFunctions.push(methodName)}function unboundTypesHandler(){throwUnboundTypeError("Cannot call "+humanName+" due to unbound types",rawArgTypes)}var proto=classType.registeredClass.instancePrototype;var method=proto[methodName];if(undefined===method||undefined===method.overloadTable&&method.className!==classType.name&&method.argCount===argCount-2){unboundTypesHandler.argCount=argCount-2;unboundTypesHandler.className=classType.name;proto[methodName]=unboundTypesHandler}else{ensureOverloadTable(proto,methodName,humanName);proto[methodName].overloadTable[argCount-2]=unboundTypesHandler}whenDependentTypesAreResolved([],rawArgTypes,(function(argTypes){var memberFunction=craftInvokerFunction(humanName,argTypes,classType,rawInvoker,context);if(undefined===proto[methodName].overloadTable){proto[methodName]=memberFunction}else{proto[methodName].overloadTable[argCount-2]=memberFunction}return[]}));return[]}))}var ___dso_handle=allocate(1,"i32*",ALLOC_STATIC);embind_init_charCodes();BindingError=Module["BindingError"]=extendError(Error,"BindingError");InternalError=Module["InternalError"]=extendError(Error,"InternalError");FS.staticInit();__ATINIT__.unshift({func:(function(){if(!Module["noFSInit"]&&!FS.init.initialized)FS.init()})});__ATMAIN__.push({func:(function(){FS.ignorePermissions=false})});__ATEXIT__.push({func:(function(){FS.quit()})});Module["FS_createFolder"]=FS.createFolder;Module["FS_createPath"]=FS.createPath;Module["FS_createDataFile"]=FS.createDataFile;Module["FS_createPreloadedFile"]=FS.createPreloadedFile;Module["FS_createLazyFile"]=FS.createLazyFile;Module["FS_createLink"]=FS.createLink;Module["FS_createDevice"]=FS.createDevice;___errno_state=Runtime.staticAlloc(4);HEAP32[___errno_state>>2]=0;__ATINIT__.unshift({func:(function(){TTY.init()})});__ATEXIT__.push({func:(function(){TTY.shutdown()})});TTY.utf8=new Runtime.UTF8Processor;if(ENVIRONMENT_IS_NODE){var fs=require("fs");NODEFS.staticInit()}_fputc.ret=allocate([0],"i8",ALLOC_STATIC);__ATINIT__.push({func:(function(){SOCKFS.root=FS.mount(SOCKFS,{},null)})});init_emval();init_ClassHandle();init_RegisteredPointer();init_embind();UnboundTypeError=Module["UnboundTypeError"]=extendError(Error,"UnboundTypeError");_fgetc.ret=allocate([0],"i8",ALLOC_STATIC);Module["requestFullScreen"]=function Module_requestFullScreen(lockPointer,resizeCanvas){Browser.requestFullScreen(lockPointer,resizeCanvas)};Module["requestAnimationFrame"]=function Module_requestAnimationFrame(func){Browser.requestAnimationFrame(func)};Module["setCanvasSize"]=function Module_setCanvasSize(width,height,noUpdates){Browser.setCanvasSize(width,height,noUpdates)};Module["pauseMainLoop"]=function Module_pauseMainLoop(){Browser.mainLoop.pause()};Module["resumeMainLoop"]=function Module_resumeMainLoop(){Browser.mainLoop.resume()};Module["getUserMedia"]=function Module_getUserMedia(){Browser.getUserMedia()};STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);staticSealed=true;STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=DYNAMICTOP=Runtime.alignMemory(STACK_MAX);assert(DYNAMIC_BASE<TOTAL_MEMORY,"TOTAL_MEMORY not big enough for stack");var ctlz_i8=allocate([8,7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"i8",ALLOC_DYNAMIC);var cttz_i8=allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],"i8",ALLOC_DYNAMIC);function invoke_iiii(index,a1,a2,a3){try{return Module["dynCall_iiii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7){try{Module["dynCall_viiiiiii"](index,a1,a2,a3,a4,a5,a6,a7)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viiiii(index,a1,a2,a3,a4,a5){try{Module["dynCall_viiiii"](index,a1,a2,a3,a4,a5)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_i(index){try{return Module["dynCall_i"](index)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_vi(index,a1){try{Module["dynCall_vi"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_vii(index,a1,a2){try{Module["dynCall_vii"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9){try{Module["dynCall_viiiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8,a9)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_ii(index,a1){try{return Module["dynCall_ii"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viiiiiid(index,a1,a2,a3,a4,a5,a6,a7){try{Module["dynCall_viiiiiid"](index,a1,a2,a3,a4,a5,a6,a7)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viii(index,a1,a2,a3){try{Module["dynCall_viii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viiiiid(index,a1,a2,a3,a4,a5,a6){try{Module["dynCall_viiiiid"](index,a1,a2,a3,a4,a5,a6)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_v(index){try{Module["dynCall_v"](index)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_iiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8){try{return Module["dynCall_iiiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_iiiii(index,a1,a2,a3,a4){try{return Module["dynCall_iiiii"](index,a1,a2,a3,a4)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8){try{Module["dynCall_viiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6){try{Module["dynCall_viiiiii"](index,a1,a2,a3,a4,a5,a6)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_iii(index,a1,a2){try{return Module["dynCall_iii"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_iiiiii(index,a1,a2,a3,a4,a5){try{return Module["dynCall_iiiiii"](index,a1,a2,a3,a4,a5)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viiii(index,a1,a2,a3,a4){try{Module["dynCall_viiii"](index,a1,a2,a3,a4)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}Module.asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int16Array":Int16Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array,"Uint16Array":Uint16Array,"Uint32Array":Uint32Array,"Float32Array":Float32Array,"Float64Array":Float64Array};Module.asmLibraryArg={"abort":abort,"assert":assert,"min":Math_min,"invoke_iiii":invoke_iiii,"invoke_viiiiiii":invoke_viiiiiii,"invoke_viiiii":invoke_viiiii,"invoke_i":invoke_i,"invoke_vi":invoke_vi,"invoke_vii":invoke_vii,"invoke_viiiiiiiii":invoke_viiiiiiiii,"invoke_ii":invoke_ii,"invoke_viiiiiid":invoke_viiiiiid,"invoke_viii":invoke_viii,"invoke_viiiiid":invoke_viiiiid,"invoke_v":invoke_v,"invoke_iiiiiiiii":invoke_iiiiiiiii,"invoke_iiiii":invoke_iiiii,"invoke_viiiiiiii":invoke_viiiiiiii,"invoke_viiiiii":invoke_viiiiii,"invoke_iii":invoke_iii,"invoke_iiiiii":invoke_iiiiii,"invoke_viiii":invoke_viiii,"_fabs":_fabs,"floatReadValueFromPointer":floatReadValueFromPointer,"simpleReadValueFromPointer":simpleReadValueFromPointer,"throwInternalError":throwInternalError,"get_first_emval":get_first_emval,"___cxa_guard_acquire":___cxa_guard_acquire,"_fmodl":_fmodl,"___assert_fail":___assert_fail,"__ZSt18uncaught_exceptionv":__ZSt18uncaught_exceptionv,"ClassHandle":ClassHandle,"getShiftFromSize":getShiftFromSize,"__addDays":__addDays,"_emscripten_set_main_loop_timing":_emscripten_set_main_loop_timing,"_sbrk":_sbrk,"___cxa_begin_catch":___cxa_begin_catch,"_emscripten_memcpy_big":_emscripten_memcpy_big,"runDestructor":runDestructor,"_sysconf":_sysconf,"throwInstanceAlreadyDeleted":throwInstanceAlreadyDeleted,"__embind_register_std_string":__embind_register_std_string,"genericPointerToWireType":genericPointerToWireType,"init_RegisteredPointer":init_RegisteredPointer,"ClassHandle_isAliasOf":ClassHandle_isAliasOf,"_fileno":_fileno,"flushPendingDeletes":flushPendingDeletes,"_fread":_fread,"makeClassHandle":makeClassHandle,"whenDependentTypesAreResolved":whenDependentTypesAreResolved,"_write":_write,"__isLeapYear":__isLeapYear,"__embind_register_class_constructor":__embind_register_class_constructor,"RegisteredPointer_deleteObject":RegisteredPointer_deleteObject,"___cxa_atexit":___cxa_atexit,"init_ClassHandle":init_ClassHandle,"_catclose":_catclose,"constNoSmartPtrRawPointerToWireType":constNoSmartPtrRawPointerToWireType,"getLiveInheritedInstances":getLiveInheritedInstances,"_send":_send,"RegisteredClass":RegisteredClass,"___cxa_find_matching_catch":___cxa_find_matching_catch,"__embind_register_emval":__embind_register_emval,"_strerror_r":_strerror_r,"__reallyNegative":__reallyNegative,"___setErrNo":___setErrNo,"___ctype_tolower_loc":___ctype_tolower_loc,"_newlocale":_newlocale,"__embind_register_bool":__embind_register_bool,"___resumeException":___resumeException,"_freelocale":_freelocale,"createNamedFunction":createNamedFunction,"embind_init_charCodes":embind_init_charCodes,"__emval_decref":__emval_decref,"_pthread_once":_pthread_once,"_pthread_mutex_unlock":_pthread_mutex_unlock,"___ctype_toupper_loc":___ctype_toupper_loc,"init_embind":init_embind,"ClassHandle_clone":ClassHandle_clone,"heap32VectorToArray":heap32VectorToArray,"ClassHandle_delete":ClassHandle_delete,"_mkport":_mkport,"_read":_read,"RegisteredPointer_destructor":RegisteredPointer_destructor,"_fwrite":_fwrite,"_time":_time,"_fprintf":_fprintf,"new_":new_,"downcastPointer":downcastPointer,"_catopen":_catopen,"replacePublicSymbol":replacePublicSymbol,"__embind_register_class":__embind_register_class,"ClassHandle_deleteLater":ClassHandle_deleteLater,"___ctype_b_loc":___ctype_b_loc,"_fmod":_fmod,"ClassHandle_isDeleted":ClassHandle_isDeleted,"_vfprintf":_vfprintf,"__embind_register_integer":__embind_register_integer,"___cxa_allocate_exception":___cxa_allocate_exception,"_pwrite":_pwrite,"_uselocale":_uselocale,"_embind_repr":_embind_repr,"_strftime":_strftime,"RegisteredPointer":RegisteredPointer,"_pthread_mutex_destroy":_pthread_mutex_destroy,"runDestructors":runDestructors,"makeLegalFunctionName":makeLegalFunctionName,"_pthread_key_create":_pthread_key_create,"upcastPointer":upcastPointer,"init_emval":init_emval,"_pthread_cond_broadcast":_pthread_cond_broadcast,"shallowCopyInternalPointer":shallowCopyInternalPointer,"nonConstNoSmartPtrRawPointerToWireType":nonConstNoSmartPtrRawPointerToWireType,"_recv":_recv,"_copysign":_copysign,"registerType":registerType,"_abort":_abort,"throwBindingError":throwBindingError,"exposePublicSymbol":exposePublicSymbol,"RegisteredPointer_fromWireType":RegisteredPointer_fromWireType,"_pthread_getspecific":_pthread_getspecific,"_pthread_cond_wait":_pthread_cond_wait,"__embind_register_memory_view":__embind_register_memory_view,"getInheritedInstance":getInheritedInstance,"setDelayFunction":setDelayFunction,"___gxx_personality_v0":___gxx_personality_v0,"extendError":extendError,"_ungetc":_ungetc,"ensureOverloadTable":ensureOverloadTable,"__embind_register_void":__embind_register_void,"_fflush":_fflush,"_strftime_l":_strftime_l,"_pthread_mutex_lock":_pthread_mutex_lock,"RegisteredPointer_getPointee":RegisteredPointer_getPointee,"__emval_register":__emval_register,"_catgets":_catgets,"__embind_register_std_wstring":__embind_register_std_wstring,"__embind_register_class_function":__embind_register_class_function,"throwUnboundTypeError":throwUnboundTypeError,"__arraySum":__arraySum,"_calloc":_calloc,"readLatin1String":readLatin1String,"craftInvokerFunction":craftInvokerFunction,"getBasestPointer":getBasestPointer,"_pread":_pread,"getInheritedInstanceCount":getInheritedInstanceCount,"__embind_register_float":__embind_register_float,"integerReadValueFromPointer":integerReadValueFromPointer,"_getc":_getc,"_emscripten_set_main_loop":_emscripten_set_main_loop,"___errno_location":___errno_location,"___cxa_guard_release":___cxa_guard_release,"_pthread_setspecific":_pthread_setspecific,"_fgetc":_fgetc,"_fputc":_fputc,"___cxa_throw":___cxa_throw,"_copysignl":_copysignl,"count_emval_handles":count_emval_handles,"requireFunction":requireFunction,"_strerror":_strerror,"__formatString":__formatString,"_atexit":_atexit,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX,"tempDoublePtr":tempDoublePtr,"ABORT":ABORT,"cttz_i8":cttz_i8,"ctlz_i8":ctlz_i8,"NaN":NaN,"Infinity":Infinity,"___dso_handle":___dso_handle,"_stderr":_stderr,"_stdin":_stdin,"_stdout":_stdout};// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer) {
"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.cttz_i8|0;var n=env.ctlz_i8|0;var o=env.___dso_handle|0;var p=env._stderr|0;var q=env._stdin|0;var r=env._stdout|0;var s=0;var t=0;var u=0;var v=0;var w=+env.NaN,x=+env.Infinity;var y=0,z=0,A=0,B=0,C=0.0,D=0,E=0,F=0,G=0.0;var H=0;var I=0;var J=0;var K=0;var L=0;var M=0;var N=0;var O=0;var P=0;var Q=0;var R=global.Math.floor;var S=global.Math.abs;var T=global.Math.sqrt;var U=global.Math.pow;var V=global.Math.cos;var W=global.Math.sin;var X=global.Math.tan;var Y=global.Math.acos;var Z=global.Math.asin;var _=global.Math.atan;var $=global.Math.atan2;var aa=global.Math.exp;var ba=global.Math.log;var ca=global.Math.ceil;var da=global.Math.imul;var ea=env.abort;var fa=env.assert;var ga=env.min;var ha=env.invoke_iiii;var ia=env.invoke_viiiiiii;var ja=env.invoke_viiiii;var ka=env.invoke_i;var la=env.invoke_vi;var ma=env.invoke_vii;var na=env.invoke_viiiiiiiii;var oa=env.invoke_ii;var pa=env.invoke_viiiiiid;var qa=env.invoke_viii;var ra=env.invoke_viiiiid;var sa=env.invoke_v;var ta=env.invoke_iiiiiiiii;var ua=env.invoke_iiiii;var va=env.invoke_viiiiiiii;var wa=env.invoke_viiiiii;var xa=env.invoke_iii;var ya=env.invoke_iiiiii;var za=env.invoke_viiii;var Aa=env._fabs;var Ba=env.floatReadValueFromPointer;var Ca=env.simpleReadValueFromPointer;var Da=env.throwInternalError;var Ea=env.get_first_emval;var Fa=env.___cxa_guard_acquire;var Ga=env._fmodl;var Ha=env.___assert_fail;var Ia=env.__ZSt18uncaught_exceptionv;var Ja=env.ClassHandle;var Ka=env.getShiftFromSize;var La=env.__addDays;var Ma=env._emscripten_set_main_loop_timing;var Na=env._sbrk;var Oa=env.___cxa_begin_catch;var Pa=env._emscripten_memcpy_big;var Qa=env.runDestructor;var Ra=env._sysconf;var Sa=env.throwInstanceAlreadyDeleted;var Ta=env.__embind_register_std_string;var Ua=env.genericPointerToWireType;var Va=env.init_RegisteredPointer;var Wa=env.ClassHandle_isAliasOf;var Xa=env._fileno;var Ya=env.flushPendingDeletes;var Za=env._fread;var _a=env.makeClassHandle;var $a=env.whenDependentTypesAreResolved;var ab=env._write;var bb=env.__isLeapYear;var cb=env.__embind_register_class_constructor;var db=env.RegisteredPointer_deleteObject;var eb=env.___cxa_atexit;var fb=env.init_ClassHandle;var gb=env._catclose;var hb=env.constNoSmartPtrRawPointerToWireType;var ib=env.getLiveInheritedInstances;var jb=env._send;var kb=env.RegisteredClass;var lb=env.___cxa_find_matching_catch;var mb=env.__embind_register_emval;var nb=env._strerror_r;var ob=env.__reallyNegative;var pb=env.___setErrNo;var qb=env.___ctype_tolower_loc;var rb=env._newlocale;var sb=env.__embind_register_bool;var tb=env.___resumeException;var ub=env._freelocale;var vb=env.createNamedFunction;var wb=env.embind_init_charCodes;var xb=env.__emval_decref;var yb=env._pthread_once;var zb=env._pthread_mutex_unlock;var Ab=env.___ctype_toupper_loc;var Bb=env.init_embind;var Cb=env.ClassHandle_clone;var Db=env.heap32VectorToArray;var Eb=env.ClassHandle_delete;var Fb=env._mkport;var Gb=env._read;var Hb=env.RegisteredPointer_destructor;var Ib=env._fwrite;var Jb=env._time;var Kb=env._fprintf;var Lb=env.new_;var Mb=env.downcastPointer;var Nb=env._catopen;var Ob=env.replacePublicSymbol;var Pb=env.__embind_register_class;var Qb=env.ClassHandle_deleteLater;var Rb=env.___ctype_b_loc;var Sb=env._fmod;var Tb=env.ClassHandle_isDeleted;var Ub=env._vfprintf;var Vb=env.__embind_register_integer;var Wb=env.___cxa_allocate_exception;var Xb=env._pwrite;var Yb=env._uselocale;var Zb=env._embind_repr;var _b=env._strftime;var $b=env.RegisteredPointer;var ac=env._pthread_mutex_destroy;var bc=env.runDestructors;var cc=env.makeLegalFunctionName;var dc=env._pthread_key_create;var ec=env.upcastPointer;var fc=env.init_emval;var gc=env._pthread_cond_broadcast;var hc=env.shallowCopyInternalPointer;var ic=env.nonConstNoSmartPtrRawPointerToWireType;var jc=env._recv;var kc=env._copysign;var lc=env.registerType;var mc=env._abort;var nc=env.throwBindingError;var oc=env.exposePublicSymbol;var pc=env.RegisteredPointer_fromWireType;var qc=env._pthread_getspecific;var rc=env._pthread_cond_wait;var sc=env.__embind_register_memory_view;var tc=env.getInheritedInstance;var uc=env.setDelayFunction;var vc=env.___gxx_personality_v0;var wc=env.extendError;var xc=env._ungetc;var yc=env.ensureOverloadTable;var zc=env.__embind_register_void;var Ac=env._fflush;var Bc=env._strftime_l;var Cc=env._pthread_mutex_lock;var Dc=env.RegisteredPointer_getPointee;var Ec=env.__emval_register;var Fc=env._catgets;var Gc=env.__embind_register_std_wstring;var Hc=env.__embind_register_class_function;var Ic=env.throwUnboundTypeError;var Jc=env.__arraySum;var Kc=env._calloc;var Lc=env.readLatin1String;var Mc=env.craftInvokerFunction;var Nc=env.getBasestPointer;var Oc=env._pread;var Pc=env.getInheritedInstanceCount;var Qc=env.__embind_register_float;var Rc=env.integerReadValueFromPointer;var Sc=env._getc;var Tc=env._emscripten_set_main_loop;var Uc=env.___errno_location;var Vc=env.___cxa_guard_release;var Wc=env._pthread_setspecific;var Xc=env._fgetc;var Yc=env._fputc;var Zc=env.___cxa_throw;var _c=env._copysignl;var $c=env.count_emval_handles;var ad=env.requireFunction;var bd=env._strerror;var cd=env.__formatString;var dd=env._atexit;var ed=0.0;
// EMSCRIPTEN_START_FUNCS
function Oh(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=16312;a=c[a+4>>2]|0;e=a+4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if(d){i=b;return}jd[c[(c[a>>2]|0)+8>>2]&255](a);i=b;return}function Ph(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=16312;d=c[a+4>>2]|0;f=d+4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if(e){Uq(a);i=b;return}jd[c[(c[d>>2]|0)+8>>2]&255](d);Uq(a);i=b;return}function Qh(b,d){b=b|0;d=d|0;var e=0;e=i;md[c[(c[b>>2]|0)+24>>2]&127](b)|0;d=Sn(c[d>>2]|0,19144)|0;c[b+36>>2]=d;a[b+44>>0]=(md[c[(c[d>>2]|0)+28>>2]&127](d)|0)&1;i=e;return}function Rh(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0;b=i;i=i+16|0;g=b+8|0;d=b;e=a+36|0;f=a+40|0;h=g+8|0;j=g;a=a+32|0;while(1){k=c[e>>2]|0;k=wd[c[(c[k>>2]|0)+20>>2]&15](k,c[f>>2]|0,g,h,d)|0;l=(c[d>>2]|0)-j|0;if((Ib(g|0,1,l|0,c[a>>2]|0)|0)!=(l|0)){e=-1;d=5;break}if((k|0)==2){e=-1;d=5;break}else if((k|0)!=1){d=4;break}}if((d|0)==4){l=((Ac(c[a>>2]|0)|0)!=0)<<31>>31;i=b;return l|0}else if((d|0)==5){i=b;return e|0}return 0}function Sh(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;if(a[b+44>>0]|0){g=Ib(d|0,4,e|0,c[b+32>>2]|0)|0;i=f;return g|0}if((e|0)>0)g=0;else{g=0;i=f;return g|0}while(1){if((vd[c[(c[b>>2]|0)+52>>2]&63](b,c[d>>2]|0)|0)==-1){e=6;break}g=g+1|0;if((g|0)<(e|0))d=d+4|0;else{e=6;break}}if((e|0)==6){i=f;return g|0}return 0}function Th(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;e=i;i=i+32|0;k=e+16|0;p=e+8|0;j=e+4|0;h=e;f=(d|0)==-1;a:do if(!f){c[p>>2]=d;if(a[b+44>>0]|0){if((Ib(p|0,4,1,c[b+32>>2]|0)|0)==1)break;else d=-1;i=e;return d|0}c[j>>2]=k;l=p+4|0;n=b+36|0;o=b+40|0;g=k+8|0;m=k;b=b+32|0;while(1){q=c[n>>2]|0;q=rd[c[(c[q>>2]|0)+12>>2]&15](q,c[o>>2]|0,p,l,h,k,g,j)|0;if((c[h>>2]|0)==(p|0)){d=-1;g=12;break}if((q|0)==3){g=7;break}r=(q|0)==1;if(q>>>0>=2){d=-1;g=12;break}q=(c[j>>2]|0)-m|0;if((Ib(k|0,1,q|0,c[b>>2]|0)|0)!=(q|0)){d=-1;g=12;break}if(r)p=r?c[h>>2]|0:p;else break a}if((g|0)==7){if((Ib(p|0,1,1,c[b>>2]|0)|0)==1)break;else d=-1;i=e;return d|0}else if((g|0)==12){i=e;return d|0}}while(0);r=f?0:d;i=e;return r|0}function Uh(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=16312;a=c[a+4>>2]|0;e=a+4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if(d){i=b;return}jd[c[(c[a>>2]|0)+8>>2]&255](a);i=b;return}function Vh(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=16312;d=c[a+4>>2]|0;f=d+4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if(e){Uq(a);i=b;return}jd[c[(c[d>>2]|0)+8>>2]&255](d);Uq(a);i=b;return}function Wh(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;e=i;g=Sn(c[d>>2]|0,19144)|0;f=b+36|0;c[f>>2]=g;d=b+44|0;c[d>>2]=md[c[(c[g>>2]|0)+24>>2]&127](g)|0;f=c[f>>2]|0;a[b+53>>0]=(md[c[(c[f>>2]|0)+28>>2]&127](f)|0)&1;if((c[d>>2]|0)>8)dn(15216);else{i=e;return}}function Xh(a){a=a|0;var b=0;b=i;a=_h(a,0)|0;i=b;return a|0}function Yh(a){a=a|0;var b=0;b=i;a=_h(a,1)|0;i=b;return a|0}function Zh(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;i=i+32|0;j=e+16|0;f=e+8|0;l=e+4|0;k=e;g=b+52|0;m=(a[g>>0]|0)!=0;if((d|0)==-1){if(m){m=-1;i=e;return m|0}m=c[b+48>>2]|0;a[g>>0]=(m|0)!=-1&1;i=e;return m|0}h=b+48|0;a:do if(m){c[l>>2]=c[h>>2];m=c[b+36>>2]|0;k=rd[c[(c[m>>2]|0)+12>>2]&15](m,c[b+40>>2]|0,l,l+4|0,k,j,j+8|0,f)|0;if((k|0)==1|(k|0)==2){m=-1;i=e;return m|0}else if((k|0)==3){a[j>>0]=c[h>>2];c[f>>2]=j+1}b=b+32|0;while(1){k=c[f>>2]|0;if(k>>>0<=j>>>0)break a;m=k+ -1|0;c[f>>2]=m;if((xc(a[m>>0]|0,c[b>>2]|0)|0)==-1){f=-1;break}}i=e;return f|0}while(0);c[h>>2]=d;a[g>>0]=1;m=d;i=e;return m|0}function _h(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;e=i;i=i+32|0;g=e+16|0;j=e+8|0;m=e+4|0;l=e;n=b+52|0;if(a[n>>0]|0){f=b+48|0;g=c[f>>2]|0;if(!d){v=g;i=e;return v|0}c[f>>2]=-1;a[n>>0]=0;v=g;i=e;return v|0}s=c[b+44>>2]|0;s=(s|0)>1?s:1;a:do if((s|0)>0){p=b+32|0;n=0;while(1){o=Sc(c[p>>2]|0)|0;if((o|0)==-1){h=-1;break}a[g+n>>0]=o;n=n+1|0;if((n|0)>=(s|0))break a}i=e;return h|0}while(0);b:do if(!(a[b+53>>0]|0)){p=b+40|0;q=b+36|0;n=j+4|0;o=b+32|0;while(1){v=c[p>>2]|0;u=v;t=c[u>>2]|0;u=c[u+4>>2]|0;w=c[q>>2]|0;r=g+s|0;v=rd[c[(c[w>>2]|0)+16>>2]&15](w,v,g,r,m,j,n,l)|0;if((v|0)==3){f=14;break}else if((v|0)==2){h=-1;f=22;break}else if((v|0)!=1){k=s;break b}w=c[p>>2]|0;c[w>>2]=t;c[w+4>>2]=u;if((s|0)==8){h=-1;f=22;break}t=Sc(c[o>>2]|0)|0;if((t|0)==-1){h=-1;f=22;break}a[r>>0]=t;s=s+1|0}if((f|0)==14){c[j>>2]=a[g>>0];k=s;break}else if((f|0)==22){i=e;return h|0}}else{c[j>>2]=a[g>>0];k=s}while(0);if(d){w=c[j>>2]|0;c[b+48>>2]=w;i=e;return w|0}d=b+32|0;while(1){if((k|0)<=0)break;k=k+ -1|0;if((xc(a[g+k>>0]|0,c[d>>2]|0)|0)==-1){h=-1;f=22;break}}if((f|0)==22){i=e;return h|0}w=c[j>>2]|0;i=e;return w|0}function $h(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;c[b>>2]=16248;Qn(b+4|0);g=b+8|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;c[g+20>>2]=0;c[b>>2]=15264;c[b+32>>2]=d;g=c[b+4>>2]|0;j=g+4|0;c[j>>2]=(c[j>>2]|0)+1;d=Sn(g,19136)|0;h=c[j>>2]|0;c[j>>2]=h+ -1;if(!h)jd[c[(c[g>>2]|0)+8>>2]&255](g);c[b+36>>2]=d;c[b+40>>2]=e;a[b+44>>0]=(md[c[(c[d>>2]|0)+28>>2]&127](d)|0)&1;i=f;return}function ai(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=16248;a=c[a+4>>2]|0;e=a+4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if(d){i=b;return}jd[c[(c[a>>2]|0)+8>>2]&255](a);i=b;return}function bi(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=16248;d=c[a+4>>2]|0;f=d+4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if(e){Uq(a);i=b;return}jd[c[(c[d>>2]|0)+8>>2]&255](d);Uq(a);i=b;return}function ci(b,d){b=b|0;d=d|0;var e=0;e=i;md[c[(c[b>>2]|0)+24>>2]&127](b)|0;d=Sn(c[d>>2]|0,19136)|0;c[b+36>>2]=d;a[b+44>>0]=(md[c[(c[d>>2]|0)+28>>2]&127](d)|0)&1;i=e;return}function di(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0;b=i;i=i+16|0;g=b+8|0;d=b;e=a+36|0;f=a+40|0;h=g+8|0;j=g;a=a+32|0;while(1){k=c[e>>2]|0;k=wd[c[(c[k>>2]|0)+20>>2]&15](k,c[f>>2]|0,g,h,d)|0;l=(c[d>>2]|0)-j|0;if((Ib(g|0,1,l|0,c[a>>2]|0)|0)!=(l|0)){e=-1;d=5;break}if((k|0)==2){e=-1;d=5;break}else if((k|0)!=1){d=4;break}}if((d|0)==4){l=((Ac(c[a>>2]|0)|0)!=0)<<31>>31;i=b;return l|0}else if((d|0)==5){i=b;return e|0}return 0}function ei(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0;g=i;if(a[b+44>>0]|0){h=Ib(e|0,1,f|0,c[b+32>>2]|0)|0;i=g;return h|0}if((f|0)>0)h=0;else{h=0;i=g;return h|0}while(1){if((vd[c[(c[b>>2]|0)+52>>2]&63](b,d[e>>0]|0)|0)==-1){f=6;break}h=h+1|0;if((h|0)<(f|0))e=e+1|0;else{f=6;break}}if((f|0)==6){i=g;return h|0}return 0}function fi(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;e=i;i=i+32|0;k=e+16|0;p=e+8|0;j=e+4|0;h=e;f=(d|0)==-1;a:do if(!f){a[p>>0]=d;if(a[b+44>>0]|0){if((Ib(p|0,1,1,c[b+32>>2]|0)|0)==1)break;else d=-1;i=e;return d|0}c[j>>2]=k;l=p+1|0;n=b+36|0;o=b+40|0;g=k+8|0;m=k;b=b+32|0;while(1){q=c[n>>2]|0;q=rd[c[(c[q>>2]|0)+12>>2]&15](q,c[o>>2]|0,p,l,h,k,g,j)|0;if((c[h>>2]|0)==(p|0)){d=-1;g=12;break}if((q|0)==3){g=7;break}r=(q|0)==1;if(q>>>0>=2){d=-1;g=12;break}q=(c[j>>2]|0)-m|0;if((Ib(k|0,1,q|0,c[b>>2]|0)|0)!=(q|0)){d=-1;g=12;break}if(r)p=r?c[h>>2]|0:p;else break a}if((g|0)==7){if((Ib(p|0,1,1,c[b>>2]|0)|0)==1)break;else d=-1;i=e;return d|0}else if((g|0)==12){i=e;return d|0}}while(0);r=f?0:d;i=e;return r|0}function gi(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=16248;a=c[a+4>>2]|0;e=a+4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if(d){i=b;return}jd[c[(c[a>>2]|0)+8>>2]&255](a);i=b;return}function hi(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=16248;d=c[a+4>>2]|0;f=d+4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if(e){Uq(a);i=b;return}jd[c[(c[d>>2]|0)+8>>2]&255](d);Uq(a);i=b;return}function ii(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;e=i;g=Sn(c[d>>2]|0,19136)|0;f=b+36|0;c[f>>2]=g;d=b+44|0;c[d>>2]=md[c[(c[g>>2]|0)+24>>2]&127](g)|0;f=c[f>>2]|0;a[b+53>>0]=(md[c[(c[f>>2]|0)+28>>2]&127](f)|0)&1;if((c[d>>2]|0)>8)dn(15216);else{i=e;return}}function ji(a){a=a|0;var b=0;b=i;a=mi(a,0)|0;i=b;return a|0}function ki(a){a=a|0;var b=0;b=i;a=mi(a,1)|0;i=b;return a|0}function li(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;i=i+32|0;j=e+16|0;f=e+4|0;l=e+8|0;k=e;g=b+52|0;m=(a[g>>0]|0)!=0;if((d|0)==-1){if(m){m=-1;i=e;return m|0}m=c[b+48>>2]|0;a[g>>0]=(m|0)!=-1&1;i=e;return m|0}h=b+48|0;a:do if(m){a[l>>0]=c[h>>2];m=c[b+36>>2]|0;k=rd[c[(c[m>>2]|0)+12>>2]&15](m,c[b+40>>2]|0,l,l+1|0,k,j,j+8|0,f)|0;if((k|0)==1|(k|0)==2){m=-1;i=e;return m|0}else if((k|0)==3){a[j>>0]=c[h>>2];c[f>>2]=j+1}b=b+32|0;while(1){k=c[f>>2]|0;if(k>>>0<=j>>>0)break a;m=k+ -1|0;c[f>>2]=m;if((xc(a[m>>0]|0,c[b>>2]|0)|0)==-1){f=-1;break}}i=e;return f|0}while(0);c[h>>2]=d;a[g>>0]=1;m=d;i=e;return m|0}function mi(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;f=i;i=i+32|0;h=f+16|0;j=f+8|0;n=f+4|0;m=f;o=b+52|0;if(a[o>>0]|0){g=b+48|0;h=c[g>>2]|0;if(!e){w=h;i=f;return w|0}c[g>>2]=-1;a[o>>0]=0;w=h;i=f;return w|0}p=c[b+44>>2]|0;p=(p|0)>1?p:1;a:do if((p|0)>0){r=b+32|0;o=0;while(1){q=Sc(c[r>>2]|0)|0;if((q|0)==-1){k=-1;break}a[h+o>>0]=q;o=o+1|0;if((o|0)>=(p|0))break a}i=f;return k|0}while(0);b:do if(!(a[b+53>>0]|0)){r=b+40|0;s=b+36|0;o=j+1|0;q=b+32|0;while(1){w=c[r>>2]|0;v=w;u=c[v>>2]|0;v=c[v+4>>2]|0;x=c[s>>2]|0;t=h+p|0;w=rd[c[(c[x>>2]|0)+16>>2]&15](x,w,h,t,n,j,o,m)|0;if((w|0)==2){k=-1;m=23;break}else if((w|0)==3){m=14;break}else if((w|0)!=1){l=p;break b}x=c[r>>2]|0;c[x>>2]=u;c[x+4>>2]=v;if((p|0)==8){k=-1;m=23;break}u=Sc(c[q>>2]|0)|0;if((u|0)==-1){k=-1;m=23;break}a[t>>0]=u;p=p+1|0}if((m|0)==14){a[j>>0]=a[h>>0]|0;l=p;break}else if((m|0)==23){i=f;return k|0}}else{a[j>>0]=a[h>>0]|0;l=p}while(0);do if(!e){e=b+32|0;while(1){if((l|0)<=0){m=21;break}l=l+ -1|0;if((xc(d[h+l>>0]|0,c[e>>2]|0)|0)==-1){k=-1;m=23;break}}if((m|0)==21){g=a[j>>0]|0;break}else if((m|0)==23){i=f;return k|0}}else{g=a[j>>0]|0;c[b+48>>2]=g&255}while(0);x=g&255;i=f;return x|0}function ni(){var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0;d=i;e=c[q>>2]|0;c[3662]=16248;Qn(14652|0);c[3664]=0;c[3665]=0;c[3666]=0;c[3667]=0;c[3668]=0;c[3669]=0;c[3662]=15376;c[3670]=e;c[3672]=14704;c[3674]=-1;a[14700]=0;j=c[3663]|0;k=j+4|0;c[k>>2]=(c[k>>2]|0)+1;f=Rn(19136)|0;g=c[j+8>>2]|0;if((c[j+12>>2]|0)-g>>2>>>0>f>>>0?(h=c[g+(f<<2)>>2]|0,(h|0)!=0):0){c[3671]=h;c[3673]=md[c[(c[h>>2]|0)+24>>2]&127](h)|0;h=c[3671]|0;a[14701]=(md[c[(c[h>>2]|0)+28>>2]&127](h)|0)&1;if((c[3673]|0)>8)dn(15216);h=c[k>>2]|0;c[k>>2]=h+ -1;if(!h)jd[c[(c[j>>2]|0)+8>>2]&255](j);c[3484]=16380;c[3486]=16400;c[3485]=0;c[3492]=14648;c[3490]=0;c[3491]=0;c[3487]=4098;c[3489]=0;c[3488]=6;h=13976|0;j=h+40|0;do{c[h>>2]=0;h=h+4|0}while((h|0)<(j|0));Qn(13972|0);c[3504]=0;c[3505]=-1;f=c[r>>2]|0;$h(14752,f,14712|0);c[3506]=16460;c[3507]=16480;c[3513]=14752;c[3511]=0;c[3512]=0;c[3508]=4098;c[3510]=0;c[3509]=6;h=14060|0;j=h+40|0;do{c[h>>2]=0;h=h+4|0}while((h|0)<(j|0));Qn(14056|0);c[3525]=0;c[3526]=-1;g=c[p>>2]|0;$h(14800,g,14720|0);c[3528]=16460;c[3529]=16480;c[3535]=14800;c[3533]=0;c[3534]=0;c[3530]=4098;c[3532]=0;c[3531]=6;h=14148|0;j=h+40|0;do{c[h>>2]=0;h=h+4|0}while((h|0)<(j|0));Qn(14144|0);c[3547]=0;c[3548]=-1;h=c[(c[(c[3528]|0)+ -12>>2]|0)+14136>>2]|0;c[3550]=16460;c[3551]=16480;c[3557]=h;c[3555]=(h|0)==0&1;c[3556]=0;c[3552]=4098;c[3554]=0;c[3553]=6;h=14236|0;j=h+40|0;do{c[h>>2]=0;h=h+4|0}while((h|0)<(j|0));Qn(14232|0);c[3569]=0;c[3570]=-1;c[(c[(c[3484]|0)+ -12>>2]|0)+14008>>2]=14024;j=(c[(c[3528]|0)+ -12>>2]|0)+14116|0;c[j>>2]=c[j>>2]|8192;c[(c[(c[3528]|0)+ -12>>2]|0)+14184>>2]=14024;c[3712]=16312;Qn(14852|0);c[3714]=0;c[3715]=0;c[3716]=0;c[3717]=0;c[3718]=0;c[3719]=0;c[3712]=15120;c[3720]=e;c[3722]=14728;c[3724]=-1;a[14900]=0;j=c[3713]|0;k=j+4|0;c[k>>2]=(c[k>>2]|0)+1;h=Rn(19144)|0;e=c[j+8>>2]|0;if((c[j+12>>2]|0)-e>>2>>>0>h>>>0?(b=c[e+(h<<2)>>2]|0,(b|0)!=0):0){c[3721]=b;c[3723]=md[c[(c[b>>2]|0)+24>>2]&127](b)|0;h=c[3721]|0;a[14901]=(md[c[(c[h>>2]|0)+28>>2]&127](h)|0)&1;if((c[3723]|0)>8)dn(15216);h=c[k>>2]|0;c[k>>2]=h+ -1;if(!h)jd[c[(c[j>>2]|0)+8>>2]&255](j);c[3572]=16420;c[3574]=16440;c[3573]=0;c[3580]=14848;c[3578]=0;c[3579]=0;c[3575]=4098;c[3577]=0;c[3576]=6;h=14328|0;j=h+40|0;do{c[h>>2]=0;h=h+4|0}while((h|0)<(j|0));Qn(14324|0);c[3592]=0;c[3593]=-1;Nh(14904,f,14736|0);c[3594]=16500;c[3595]=16520;c[3601]=14904;c[3599]=0;c[3600]=0;c[3596]=4098;c[3598]=0;c[3597]=6;h=14412|0;j=h+40|0;do{c[h>>2]=0;h=h+4|0}while((h|0)<(j|0));Qn(14408|0);c[3613]=0;c[3614]=-1;Nh(14952,g,14744|0);c[3616]=16500;c[3617]=16520;c[3623]=14952;c[3621]=0;c[3622]=0;c[3618]=4098;c[3620]=0;c[3619]=6;h=14500|0;j=h+40|0;do{c[h>>2]=0;h=h+4|0}while((h|0)<(j|0));Qn(14496|0);c[3635]=0;c[3636]=-1;h=c[(c[(c[3616]|0)+ -12>>2]|0)+14488>>2]|0;c[3638]=16500;c[3639]=16520;c[3645]=h;c[3643]=(h|0)==0&1;c[3644]=0;c[3640]=4098;c[3642]=0;c[3641]=6;h=14588|0;j=h+40|0;do{c[h>>2]=0;h=h+4|0}while((h|0)<(j|0));Qn(14584|0);c[3657]=0;c[3658]=-1;c[(c[(c[3572]|0)+ -12>>2]|0)+14360>>2]=14376;k=(c[(c[3616]|0)+ -12>>2]|0)+14468|0;c[k>>2]=c[k>>2]|8192;c[(c[(c[3616]|0)+ -12>>2]|0)+14536>>2]=14376;eb(242,14640,o|0)|0;i=d;return}k=Wb(4)|0;c[k>>2]=27744;Zc(k|0,27816,228)}k=Wb(4)|0;c[k>>2]=27744;Zc(k|0,27816,228)}function oi(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=d;c[a+4>>2]=b;return}function pi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;i=i+16|0;f=e;od[c[(c[a>>2]|0)+12>>2]&15](f,a,b);if((c[f+4>>2]|0)!=(c[d+4>>2]|0)){a=0;i=e;return a|0}a=(c[f>>2]|0)==(c[d>>2]|0);i=e;return a|0}function qi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=i;if((c[b+4>>2]|0)!=(a|0)){a=0;i=e;return a|0}a=(c[b>>2]|0)==(d|0);i=e;return a|0}function ri(a){a=a|0;return 15568}function si(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;d=i;if((e|0)>256){e=$p(48)|0;c[b+8>>2]=e;c[b>>2]=49;c[b+4>>2]=34;g=e+0|0;f=15576|0;b=g+34|0;do{a[g>>0]=a[f>>0]|0;g=g+1|0;f=f+1|0}while((g|0)<(b|0));a[e+34>>0]=0;i=d;return}else{g=bd(e|0)|0;Gi(b,g,mr(g|0)|0);i=d;return}}function ti(a){a=a|0;return}function ui(a){a=a|0;return 15632}function vi(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;d=i;if((e|0)>256){e=$p(48)|0;c[b+8>>2]=e;c[b>>2]=49;c[b+4>>2]=33;g=e+0|0;f=15640|0;b=g+33|0;do{a[g>>0]=a[f>>0]|0;g=g+1|0;f=f+1|0}while((g|0)<(b|0));a[e+33>>0]=0;i=d;return}else{g=bd(e|0)|0;Gi(b,g,mr(g|0)|0);i=d;return}}function wi(b,d,e){b=b|0;d=d|0;e=e|0;d=i;if((e|0)>256){if((a[15688]|0)==0?(Fa(15688)|0)!=0:0){c[3920]=15952;Vc(15688)}c[b>>2]=e;c[b+4>>2]=15680;i=d;return}else{if((a[15624]|0)==0?(Fa(15624)|0)!=0:0){c[3904]=15856;Vc(15624)}c[b>>2]=e;c[b+4>>2]=15616;i=d;return}}function xi(a){a=a|0;return}function yi(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;j=i;i=i+48|0;k=j+24|0;h=j+12|0;g=j;Gi(g,f,mr(f|0)|0);if(d){f=a[g>>0]|0;if(!(f&1))f=(f&255)>>>1;else f=c[g+4>>2]|0;if(f)Ni(g,15696,2);od[c[(c[e>>2]|0)+24>>2]&15](k,e,d);l=a[k>>0]|0;if(!(l&1)){f=k+1|0;l=(l&255)>>>1}else{f=c[k+8>>2]|0;l=c[k+4>>2]|0}Ni(g,f,l);if(a[k>>0]&1)Uq(c[k+8>>2]|0)}c[h+0>>2]=c[g+0>>2];c[h+4>>2]=c[g+4>>2];c[h+8>>2]=c[g+8>>2];c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[b>>2]=27520;f=(a[h>>0]&1)==0;if(f)k=h+1|0;else k=c[h+8>>2]|0;m=mr(k|0)|0;l=$p(m+13|0)|0;c[l>>2]=m;c[l+4>>2]=m;c[l+8>>2]=0;l=l+12|0;nr(l|0,k|0,m+1|0)|0;c[b+4>>2]=l;if(!f)Uq(c[h+8>>2]|0);if(!(a[g>>0]&1)){c[b>>2]=15712;m=b+8|0;l=e;f=m;c[f>>2]=d;m=m+4|0;c[m>>2]=l;i=j;return}Uq(c[g+8>>2]|0);c[b>>2]=15712;m=b+8|0;l=e;f=m;c[f>>2]=d;m=m+4|0;c[m>>2]=l;i=j;return}function zi(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27520;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function Ai(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=27520;a=a+4|0;e=(c[a>>2]|0)+ -4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if((d+ -1|0)>=0){i=b;return}Uq((c[a>>2]|0)+ -12|0);i=b;return}function Bi(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Ci(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Di(a){a=a|0;var b=0;b=i;ac(a|0)|0;i=b;return}function Ei(){var b=0,d=0,e=0,f=0,g=0,h=0;f=Wb(8)|0;c[f>>2]=27496;d=$p(25)|0;e=f+4|0;c[d>>2]=12;c[d+4>>2]=12;c[d+8>>2]=0;d=d+12|0;h=d+0|0;g=16224|0;b=h+13|0;do{a[h>>0]=a[g>>0]|0;h=h+1|0;g=g+1|0}while((h|0)<(b|0));c[e>>2]=d;c[f>>2]=27576;Zc(f|0,27616,222)}function Fi(b,d){b=b|0;d=d|0;var e=0;e=i;if(!(a[d>>0]&1)){c[b+0>>2]=c[d+0>>2];c[b+4>>2]=c[d+4>>2];c[b+8>>2]=c[d+8>>2];i=e;return}else{Gi(b,c[d+8>>2]|0,c[d+4>>2]|0);i=e;return}}function Gi(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;if(e>>>0>4294967279)Ei();if(e>>>0<11){a[b>>0]=e<<1;b=b+1|0}else{h=e+16&-16;g=$p(h)|0;c[b+8>>2]=g;c[b>>2]=h|1;c[b+4>>2]=e;b=g}nr(b|0,d|0,e|0)|0;a[b+e>>0]=0;i=f;return}function Hi(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;h=d;g=e-h|0;if(g>>>0>4294967279)Ei();if(g>>>0<11){a[b>>0]=g<<1;g=b+1|0}else{k=g+16&-16;j=$p(k)|0;c[b+8>>2]=j;c[b>>2]=k|1;c[b+4>>2]=g;g=j}if((d|0)==(e|0)){k=g;a[k>>0]=0;i=f;return}h=e+(0-h)|0;b=g;while(1){a[b>>0]=a[d>>0]|0;d=d+1|0;if((d|0)==(e|0))break;else b=b+1|0}k=g+h|0;a[k>>0]=0;i=f;return}function Ii(b){b=b|0;var d=0;d=i;if(!(a[b>>0]&1)){i=d;return}Uq(c[b+8>>2]|0);i=d;return}function Ji(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;h=a[b>>0]|0;if(!(h&1))g=10;else{h=c[b>>2]|0;g=(h&-2)+ -1|0;h=h&255}j=(h&1)==0;if(g>>>0<e>>>0){if(j)h=(h&255)>>>1;else h=c[b+4>>2]|0;Oi(b,g,e-g|0,h,0,h,e,d);i=f;return}if(j)g=b+1|0;else g=c[b+8>>2]|0;pr(g|0,d|0,e|0)|0;a[g+e>>0]=0;if(!(a[b>>0]&1)){a[b>>0]=e<<1;i=f;return}else{c[b+4>>2]=e;i=f;return}}function Ki(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;g=a[b>>0]|0;j=(g&1)==0;if(j)h=(g&255)>>>1;else h=c[b+4>>2]|0;if(h>>>0>=d>>>0)if(j){a[b+d+1>>0]=0;a[b>>0]=d<<1;i=e;return}else{a[(c[b+8>>2]|0)+d>>0]=0;c[b+4>>2]=d;i=e;return}f=d-h|0;if((h|0)==(d|0)){i=e;return}if(j){h=g;d=10}else{d=c[b>>2]|0;h=d&255;d=(d&-2)+ -1|0}if(!(h&1))g=(h&255)>>>1;else g=c[b+4>>2]|0;if((d-g|0)>>>0<f>>>0){Pi(b,d,f-d+g|0,g,g,0);h=a[b>>0]|0}if(!(h&1))d=b+1|0;else d=c[b+8>>2]|0;qr(d+g|0,0,f|0)|0;f=g+f|0;if(!(a[b>>0]&1))a[b>>0]=f<<1;else c[b+4>>2]=f;a[d+f>>0]=0;i=e;return}function Li(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0;d=i;g=a[b>>0]|0;if(!(g&1))j=10;else{g=c[b>>2]|0;j=(g&-2)+ -1|0;g=g&255}h=(g&1)==0;if(h)e=(g&255)>>>1;else e=c[b+4>>2]|0;if(e>>>0<11)f=10;else f=(e+16&-16)+ -1|0;if((f|0)==(j|0)){i=d;return}do if((f|0)==10){k=b+1|0;j=c[b+8>>2]|0;if(h){nr(k|0,j|0,((g&255)>>>1)+1|0)|0;Uq(j);h=20}else{g=0;h=18}}else{k=f+1|0;if(f>>>0>j>>>0)k=$p(k)|0;else k=$p(k)|0;if(h){nr(k|0,b+1|0,((g&255)>>>1)+1|0)|0;h=19;break}else{g=1;j=c[b+8>>2]|0;h=18;break}}while(0);if((h|0)==18){nr(k|0,j|0,(c[b+4>>2]|0)+1|0)|0;Uq(j);if(g)h=19;else h=20}if((h|0)==19){c[b>>2]=f+1|1;c[b+4>>2]=e;c[b+8>>2]=k;i=d;return}else if((h|0)==20){a[b>>0]=e<<1;i=d;return}}function Mi(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;g=a[b>>0]|0;f=(g&1)!=0;if(f){h=(c[b>>2]&-2)+ -1|0;g=c[b+4>>2]|0}else{h=10;g=(g&255)>>>1}if((g|0)==(h|0)){Pi(b,h,1,h,h,0);if(!(a[b>>0]&1))f=7;else f=8}else if(f)f=8;else f=7;if((f|0)==7){a[b>>0]=(g<<1)+2;f=b+1|0;h=g+1|0;g=f+g|0;a[g>>0]=d;h=f+h|0;a[h>>0]=0;i=e;return}else if((f|0)==8){f=c[b+8>>2]|0;h=g+1|0;c[b+4>>2]=h;g=f+g|0;a[g>>0]=d;h=f+h|0;a[h>>0]=0;i=e;return}}function Ni(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;j=a[b>>0]|0;if(!(j&1))g=10;else{j=c[b>>2]|0;g=(j&-2)+ -1|0;j=j&255}h=(j&1)==0;if(h)j=(j&255)>>>1;else j=c[b+4>>2]|0;if((g-j|0)>>>0<e>>>0){Oi(b,g,e-g+j|0,j,j,0,e,d);i=f;return}if(!e){i=f;return}if(h)g=b+1|0;else g=c[b+8>>2]|0;nr(g+j|0,d|0,e|0)|0;e=j+e|0;if(!(a[b>>0]&1))a[b>>0]=e<<1;else c[b+4>>2]=e;a[g+e>>0]=0;i=f;return}function Oi(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0;l=i;if((-18-d|0)>>>0<e>>>0)Ei();if(!(a[b>>0]&1))m=b+1|0;else m=c[b+8>>2]|0;if(d>>>0<2147483623){e=e+d|0;n=d<<1;e=e>>>0<n>>>0?n:e;if(e>>>0<11)e=11;else e=e+16&-16}else e=-17;n=$p(e)|0;if(g)nr(n|0,m|0,g|0)|0;if(j)nr(n+g|0,k|0,j|0)|0;k=f-h|0;if((k|0)!=(g|0))nr(n+(j+g)|0,m+(h+g)|0,k-g|0)|0;if((d|0)==10){f=b+8|0;c[f>>2]=n;e=e|1;c[b>>2]=e;e=k+j|0;f=b+4|0;c[f>>2]=e;n=n+e|0;a[n>>0]=0;i=l;return}Uq(m);f=b+8|0;c[f>>2]=n;e=e|1;c[b>>2]=e;e=k+j|0;f=b+4|0;c[f>>2]=e;n=n+e|0;a[n>>0]=0;i=l;return}function Pi(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0;j=i;if((-17-d|0)>>>0<e>>>0)Ei();if(!(a[b>>0]&1))k=b+1|0;else k=c[b+8>>2]|0;if(d>>>0<2147483623){e=e+d|0;l=d<<1;e=e>>>0<l>>>0?l:e;if(e>>>0<11)l=11;else l=e+16&-16}else l=-17;e=$p(l)|0;if(g)nr(e|0,k|0,g|0)|0;if((f|0)!=(g|0))nr(e+(h+g)|0,k+g|0,f-g|0)|0;if((d|0)==10){k=b+8|0;c[k>>2]=e;l=l|1;c[b>>2]=l;i=j;return}Uq(k);k=b+8|0;c[k>>2]=e;l=l|1;c[b>>2]=l;i=j;return}function Qi(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;g=mr(d|0)|0;h=a[b>>0]|0;j=(h&1)==0;if(j)h=(h&255)>>>1;else h=c[b+4>>2]|0;if((g|0)==-1){b=Wb(8)|0;c[b>>2]=27496;d=$p(25)|0;h=b+4|0;c[d>>2]=12;c[d+4>>2]=12;c[d+8>>2]=0;d=d+12|0;g=d+0|0;e=16224|0;f=g+13|0;do{a[g>>0]=a[e>>0]|0;g=g+1|0;e=e+1|0}while((g|0)<(f|0));c[h>>2]=d;c[b>>2]=27640;Zc(b|0,27680,222)}if(j)k=b+1|0;else k=c[b+8>>2]|0;b=h>>>0>g>>>0;j=b?g:h;if(!j){l=h>>>0<g>>>0;m=b&1;m=l?-1:m;i=f;return m|0}while(1){l=a[k>>0]|0;m=a[d>>0]|0;if(l<<24>>24!=m<<24>>24)break;j=j+ -1|0;if(!j){e=15;break}else{k=k+1|0;d=d+1|0}}if((e|0)==15){l=h>>>0<g>>>0;m=b&1;m=l?-1:m;i=f;return m|0}if(l<<24>>24==m<<24>>24){l=h>>>0<g>>>0;m=b&1;m=l?-1:m;i=f;return m|0}else{i=f;return(l&255)-(m&255)|0}return 0}function Ri(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;if(e>>>0>1073741807)Ei();if(e>>>0<2){a[b>>0]=e<<1;b=b+4|0}else{g=e+4&-4;h=$p(g<<2)|0;c[b+8>>2]=h;c[b>>2]=g|1;c[b+4>>2]=e;b=h}if(!e){h=b+(e<<2)|0;c[h>>2]=0;i=f;return}else{g=e;h=b}while(1){g=g+ -1|0;c[h>>2]=c[d>>2];if(!g)break;else{d=d+4|0;h=h+4|0}}h=b+(e<<2)|0;c[h>>2]=0;i=f;return}function Si(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;if(d>>>0>1073741807)Ei();if(d>>>0<2){a[b>>0]=d<<1;b=b+4|0}else{g=d+4&-4;h=$p(g<<2)|0;c[b+8>>2]=h;c[b>>2]=g|1;c[b+4>>2]=d;b=h}if(!d){h=b+(d<<2)|0;c[h>>2]=0;i=f;return}else{h=d;g=b}while(1){h=h+ -1|0;c[g>>2]=e;if(!h)break;else g=g+4|0}h=b+(d<<2)|0;c[h>>2]=0;i=f;return}function Ti(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;g=d;h=e-g|0;j=h>>2;if(j>>>0>1073741807)Ei();if(j>>>0<2){a[b>>0]=h>>>1;h=b+4|0}else{k=j+4&-4;h=$p(k<<2)|0;c[b+8>>2]=h;c[b>>2]=k|1;c[b+4>>2]=j}if((d|0)==(e|0)){k=h;c[k>>2]=0;i=f;return}g=((e+ -4+(0-g)|0)>>>2)+1|0;j=h;while(1){c[j>>2]=c[d>>2];d=d+4|0;if((d|0)==(e|0))break;else j=j+4|0}k=h+(g<<2)|0;c[k>>2]=0;i=f;return}function Ui(b){b=b|0;var d=0;d=i;if(!(a[b>>0]&1)){i=d;return}Uq(c[b+8>>2]|0);i=d;return}function Vi(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;f=d;while(1)if(!(c[f>>2]|0))break;else f=f+4|0;j=d;h=f-j|0;f=h>>2;k=a[b>>0]|0;if(!(k&1))g=1;else{k=c[b>>2]|0;g=(k&-2)+ -1|0;k=k&255}if(g>>>0>=f>>>0){if(!(k&1))g=b+4|0;else g=c[b+8>>2]|0;k=(f|0)==0;if(g-j>>2>>>0<f>>>0){if(!k){j=f;do{j=j+ -1|0;c[g+(j<<2)>>2]=c[d+(j<<2)>>2]}while((j|0)!=0)}}else if(!k){j=g;k=f;while(1){k=k+ -1|0;c[j>>2]=c[d>>2];if(!k)break;else{d=d+4|0;j=j+4|0}}}c[g+(f<<2)>>2]=0;if(!(a[b>>0]&1)){a[b>>0]=h>>>1;i=e;return}else{c[b+4>>2]=f;i=e;return}}if((1073741806-g|0)>>>0<(f-g|0)>>>0)Ei();if(!(k&1))h=b+4|0;else h=c[b+8>>2]|0;if(g>>>0<536870887){j=g<<1;j=f>>>0<j>>>0?j:f;if(j>>>0<2)k=2;else k=j+4&-4}else k=1073741807;j=$p(k<<2)|0;if(f){l=f;m=j;while(1){l=l+ -1|0;c[m>>2]=c[d>>2];if(!l)break;else{d=d+4|0;m=m+4|0}}}if((g|0)!=1)Uq(h);c[b+8>>2]=j;c[b>>2]=k|1;c[b+4>>2]=f;c[j+(f<<2)>>2]=0;i=e;return}function Wi(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;d=i;j=a[b>>0]|0;if(!(j&1))g=1;else{j=c[b>>2]|0;g=(j&-2)+ -1|0;j=j&255}h=(j&1)==0;if(h)e=(j&255)>>>1;else e=c[b+4>>2]|0;if(e>>>0<2)f=1;else f=(e+4&-4)+ -1|0;if((f|0)==(g|0)){i=d;return}do if((f|0)==1){g=b+4|0;l=c[b+8>>2]|0;if(h){k=0;m=1;h=18}else{k=0;m=1;h=17}}else{k=(f<<2)+4|0;if(f>>>0>g>>>0)g=$p(k)|0;else g=$p(k)|0;if(h){k=1;l=b+4|0;m=0;h=18;break}else{k=1;l=c[b+8>>2]|0;m=1;h=17;break}}while(0);if((h|0)==17)j=c[b+4>>2]|0;else if((h|0)==18)j=(j&255)>>>1;j=j+1|0;if(j){n=l;h=g;while(1){j=j+ -1|0;c[h>>2]=c[n>>2];if(!j)break;else{n=n+4|0;h=h+4|0}}}if(m)Uq(l);if(k){c[b>>2]=f+1|1;c[b+4>>2]=e;c[b+8>>2]=g;i=d;return}else{a[b>>0]=e<<1;i=d;return}}function Xi(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;g=a[b>>0]|0;f=(g&1)!=0;if(f){h=(c[b>>2]&-2)+ -1|0;g=c[b+4>>2]|0}else{h=1;g=(g&255)>>>1}if((g|0)==(h|0)){Yi(b,h,1,h,h,0,0);if(!(a[b>>0]&1))f=7;else f=8}else if(f)f=8;else f=7;if((f|0)==7){a[b>>0]=(g<<1)+2;f=b+4|0;h=g+1|0;g=f+(g<<2)|0;c[g>>2]=d;h=f+(h<<2)|0;c[h>>2]=0;i=e;return}else if((f|0)==8){f=c[b+8>>2]|0;h=g+1|0;c[b+4>>2]=h;g=f+(g<<2)|0;c[g>>2]=d;h=f+(h<<2)|0;c[h>>2]=0;i=e;return}}function Yi(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0;k=i;if((1073741807-d|0)>>>0<e>>>0)Ei();if(!(a[b>>0]&1))l=b+4|0;else l=c[b+8>>2]|0;if(d>>>0<536870887){e=e+d|0;p=d<<1;e=e>>>0<p>>>0?p:e;if(e>>>0<2)e=2;else e=e+4&-4}else e=1073741807;m=$p(e<<2)|0;if(g){n=g;o=l;p=m;while(1){n=n+ -1|0;c[p>>2]=c[o>>2];if(!n)break;else{o=o+4|0;p=p+4|0}}}f=f-h|0;if((f|0)!=(g|0)){f=f-g|0;h=l+(h+g<<2)|0;j=m+(j+g<<2)|0;while(1){f=f+ -1|0;c[j>>2]=c[h>>2];if(!f)break;else{h=h+4|0;j=j+4|0}}}if((d|0)==1){p=b+8|0;c[p>>2]=m;p=e|1;c[b>>2]=p;i=k;return}Uq(l);p=b+8|0;c[p>>2]=m;p=e|1;c[b>>2]=p;i=k;return}function Zi(b,d){b=b|0;d=d|0;var e=0;e=(c[b+24>>2]|0)==0;if(e)c[b+16>>2]=d|1;else c[b+16>>2]=d;if(!((e&1|d)&c[b+20>>2]))return;d=Wb(16)|0;if((a[16592]|0)==0?(Fa(16592)|0)!=0:0){c[4146]=17368;Vc(16592)}yi(d,1,16584,16640);c[d>>2]=16608;Zc(d|0,16688,155)}function _i(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=16632;f=c[a+40>>2]|0;if(f){d=a+32|0;e=a+36|0;do{f=f+ -1|0;od[c[(c[d>>2]|0)+(f<<2)>>2]&15](0,a,c[(c[e>>2]|0)+(f<<2)>>2]|0)}while((f|0)!=0)}d=c[a+28>>2]|0;e=d+4|0;f=c[e>>2]|0;c[e>>2]=f+ -1;if(!f)jd[c[(c[d>>2]|0)+8>>2]&255](d);Uq(c[a+32>>2]|0);Uq(c[a+36>>2]|0);Uq(c[a+48>>2]|0);Uq(c[a+60>>2]|0);i=b;return}function $i(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=16248;d=c[a+4>>2]|0;f=d+4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if(e){Uq(a);i=b;return}jd[c[(c[d>>2]|0)+8>>2]&255](d);Uq(a);i=b;return}function aj(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=16248;a=c[a+4>>2]|0;e=a+4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if(d){i=b;return}jd[c[(c[a>>2]|0)+8>>2]&255](a);i=b;return}function bj(a,b){a=a|0;b=b|0;return}function cj(a,b,c){a=a|0;b=b|0;c=c|0;return a|0}function dj(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;g=a;c[g>>2]=0;c[g+4>>2]=0;g=a+8|0;c[g>>2]=-1;c[g+4>>2]=-1;return}function ej(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=a;c[e>>2]=0;c[e+4>>2]=0;e=a+8|0;c[e>>2]=-1;c[e+4>>2]=-1;return}function fj(a){a=a|0;return 0}function gj(a){a=a|0;return 0}function hj(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;if((e|0)<=0){k=0;i=f;return k|0}g=b+12|0;h=b+16|0;j=0;while(1){k=c[g>>2]|0;if(k>>>0<(c[h>>2]|0)>>>0){c[g>>2]=k+1;k=a[k>>0]|0}else{k=md[c[(c[b>>2]|0)+40>>2]&127](b)|0;if((k|0)==-1){e=8;break}k=k&255}a[d>>0]=k;j=j+1|0;if((j|0)<(e|0))d=d+1|0;else{e=8;break}}if((e|0)==8){i=f;return j|0}return 0}function ij(a){a=a|0;return-1}function jj(a){a=a|0;var b=0,e=0;b=i;if((md[c[(c[a>>2]|0)+36>>2]&127](a)|0)==-1){a=-1;i=b;return a|0}e=a+12|0;a=c[e>>2]|0;c[e>>2]=a+1;a=d[a>>0]|0;i=b;return a|0}function kj(a,b){a=a|0;b=b|0;return-1}function lj(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;if((f|0)<=0){l=0;i=g;return l|0}j=b+24|0;h=b+28|0;k=0;while(1){l=c[j>>2]|0;if(l>>>0>=(c[h>>2]|0)>>>0){if((vd[c[(c[b>>2]|0)+52>>2]&63](b,d[e>>0]|0)|0)==-1){h=7;break}}else{m=a[e>>0]|0;c[j>>2]=l+1;a[l>>0]=m}k=k+1|0;if((k|0)<(f|0))e=e+1|0;else{h=7;break}}if((h|0)==7){i=g;return k|0}return 0}function mj(a,b){a=a|0;b=b|0;return-1}function nj(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=16312;d=c[a+4>>2]|0;f=d+4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if(e){Uq(a);i=b;return}jd[c[(c[d>>2]|0)+8>>2]&255](d);Uq(a);i=b;return}function oj(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=16312;a=c[a+4>>2]|0;e=a+4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if(d){i=b;return}jd[c[(c[a>>2]|0)+8>>2]&255](a);i=b;return}function pj(a,b){a=a|0;b=b|0;return}function qj(a,b,c){a=a|0;b=b|0;c=c|0;return a|0}function rj(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;g=a;c[g>>2]=0;c[g+4>>2]=0;g=a+8|0;c[g>>2]=-1;c[g+4>>2]=-1;return}function sj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=a;c[e>>2]=0;c[e+4>>2]=0;e=a+8|0;c[e>>2]=-1;c[e+4>>2]=-1;return}function tj(a){a=a|0;return 0}function uj(a){a=a|0;return 0}function vj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;if((d|0)<=0){j=0;i=e;return j|0}g=a+12|0;f=a+16|0;h=0;while(1){j=c[g>>2]|0;if(j>>>0>=(c[f>>2]|0)>>>0){j=md[c[(c[a>>2]|0)+40>>2]&127](a)|0;if((j|0)==-1){a=8;break}}else{c[g>>2]=j+4;j=c[j>>2]|0}c[b>>2]=j;h=h+1|0;if((h|0)>=(d|0)){a=8;break}b=b+4|0}if((a|0)==8){i=e;return h|0}return 0}function wj(a){a=a|0;return-1}function xj(a){a=a|0;var b=0,d=0;b=i;if((md[c[(c[a>>2]|0)+36>>2]&127](a)|0)==-1){a=-1;i=b;return a|0}d=a+12|0;a=c[d>>2]|0;c[d>>2]=a+4;a=c[a>>2]|0;i=b;return a|0}function yj(a,b){a=a|0;b=b|0;return-1}function zj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;if((d|0)<=0){j=0;i=e;return j|0}g=a+24|0;f=a+28|0;h=0;while(1){j=c[g>>2]|0;if(j>>>0>=(c[f>>2]|0)>>>0){if((vd[c[(c[a>>2]|0)+52>>2]&63](a,c[b>>2]|0)|0)==-1){f=8;break}}else{k=c[b>>2]|0;c[g>>2]=j+4;c[j>>2]=k}h=h+1|0;if((h|0)>=(d|0)){f=8;break}b=b+4|0}if((f|0)==8){i=e;return h|0}return 0}function Aj(a,b){a=a|0;b=b|0;return-1}function Bj(a){a=a|0;var b=0;b=i;_i(a+8|0);Uq(a);i=b;return}function Cj(a){a=a|0;var b=0;b=i;_i(a+8|0);i=b;return}function Dj(a){a=a|0;var b=0,d=0;b=i;d=c[(c[a>>2]|0)+ -12>>2]|0;_i(a+(d+8)|0);Uq(a+d|0);i=b;return}function Ej(a){a=a|0;var b=0;b=i;_i(a+((c[(c[a>>2]|0)+ -12>>2]|0)+8)|0);i=b;return}function Fj(b){b=b|0;var d=0,e=0,f=0;d=i;i=i+16|0;e=d;if(!(c[b+((c[(c[b>>2]|0)+ -12>>2]|0)+24)>>2]|0)){i=d;return}Pj(e,b);if((a[e>>0]|0)!=0?(f=c[b+((c[(c[b>>2]|0)+ -12>>2]|0)+24)>>2]|0,(md[c[(c[f>>2]|0)+24>>2]&127](f)|0)==-1):0){f=c[(c[b>>2]|0)+ -12>>2]|0;Zi(b+f|0,c[b+(f+16)>>2]|1)}Qj(e);i=d;return}function Gj(a){a=a|0;var b=0;b=i;_i(a+8|0);Uq(a);i=b;return}function Hj(a){a=a|0;var b=0;b=i;_i(a+8|0);i=b;return}function Ij(a){a=a|0;var b=0,d=0;b=i;d=c[(c[a>>2]|0)+ -12>>2]|0;_i(a+(d+8)|0);Uq(a+d|0);i=b;return}function Jj(a){a=a|0;var b=0;b=i;_i(a+((c[(c[a>>2]|0)+ -12>>2]|0)+8)|0);i=b;return}function Kj(b){b=b|0;var d=0,e=0,f=0;d=i;i=i+16|0;e=d;f=c[(c[b>>2]|0)+ -12>>2]|0;if(!(c[b+(f+24)>>2]|0)){i=d;return}a[e>>0]=0;c[e+4>>2]=b;if(!(c[b+(f+16)>>2]|0)){f=c[b+(f+72)>>2]|0;if(f)Kj(f);a[e>>0]=1;f=c[b+((c[(c[b>>2]|0)+ -12>>2]|0)+24)>>2]|0;if((md[c[(c[f>>2]|0)+24>>2]&127](f)|0)==-1){f=c[(c[b>>2]|0)+ -12>>2]|0;Zi(b+f|0,c[b+(f+16)>>2]|1)}}Wj(e);i=d;return}function Lj(a){a=a|0;var b=0;b=i;_i(a+4|0);Uq(a);i=b;return}function Mj(a){a=a|0;var b=0;b=i;_i(a+4|0);i=b;return}function Nj(a){a=a|0;var b=0,d=0;b=i;d=c[(c[a>>2]|0)+ -12>>2]|0;_i(a+(d+4)|0);Uq(a+d|0);i=b;return}function Oj(a){a=a|0;var b=0;b=i;_i(a+((c[(c[a>>2]|0)+ -12>>2]|0)+4)|0);i=b;return}function Pj(b,d){b=b|0;d=d|0;var e=0,f=0;e=i;a[b>>0]=0;c[b+4>>2]=d;f=c[(c[d>>2]|0)+ -12>>2]|0;if(c[d+(f+16)>>2]|0){i=e;return}f=c[d+(f+72)>>2]|0;if(f)Fj(f);a[b>>0]=1;i=e;return}function Qj(a){a=a|0;var b=0,d=0,e=0;b=i;a=a+4|0;d=c[a>>2]|0;e=c[(c[d>>2]|0)+ -12>>2]|0;if(!(c[d+(e+24)>>2]|0)){i=b;return}if(c[d+(e+16)>>2]|0){i=b;return}if(!(c[d+(e+4)>>2]&8192)){i=b;return}if(Ia()|0){i=b;return}e=c[a>>2]|0;e=c[e+((c[(c[e>>2]|0)+ -12>>2]|0)+24)>>2]|0;if((md[c[(c[e>>2]|0)+24>>2]&127](e)|0)!=-1){i=b;return}d=c[a>>2]|0;e=c[(c[d>>2]|0)+ -12>>2]|0;Zi(d+e|0,c[d+(e+16)>>2]|1);i=b;return}function Rj(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;h=i;i=i+32|0;k=h+20|0;e=h+16|0;g=h+8|0;f=h;Pj(g,b);if(a[g>>0]|0){l=c[b+((c[(c[b>>2]|0)+ -12>>2]|0)+28)>>2]|0;o=l+4|0;c[o>>2]=(c[o>>2]|0)+1;j=Sn(l,17776)|0;p=c[o>>2]|0;c[o>>2]=p+ -1;if(!p)jd[c[(c[l>>2]|0)+8>>2]&255](l);o=c[(c[b>>2]|0)+ -12>>2]|0;l=c[b+(o+24)>>2]|0;m=b+o|0;n=b+(o+76)|0;p=c[n>>2]|0;if((p|0)==-1){p=c[b+(o+28)>>2]|0;r=p+4|0;c[r>>2]=(c[r>>2]|0)+1;o=Sn(p,19072)|0;o=vd[c[(c[o>>2]|0)+28>>2]&63](o,32)|0;q=c[r>>2]|0;c[r>>2]=q+ -1;if(!q)jd[c[(c[p>>2]|0)+8>>2]&255](p);p=o<<24>>24;c[n>>2]=p}r=p&255;q=c[(c[j>>2]|0)+16>>2]|0;c[e>>2]=l;c[k+0>>2]=c[e+0>>2];ud[q&31](f,j,k,m,r,d);if(!(c[f>>2]|0)){r=c[(c[b>>2]|0)+ -12>>2]|0;Zi(b+r|0,c[b+(r+16)>>2]|5)}}Qj(g);i=h;return b|0}function Sj(a){a=a|0;var b=0;b=i;_i(a+4|0);Uq(a);i=b;return}function Tj(a){a=a|0;var b=0;b=i;_i(a+4|0);i=b;return}function Uj(a){a=a|0;var b=0,d=0;b=i;d=c[(c[a>>2]|0)+ -12>>2]|0;_i(a+(d+4)|0);Uq(a+d|0);i=b;return}function Vj(a){a=a|0;var b=0;b=i;_i(a+((c[(c[a>>2]|0)+ -12>>2]|0)+4)|0);i=b;return}function Wj(a){a=a|0;var b=0,d=0,e=0;b=i;a=a+4|0;d=c[a>>2]|0;e=c[(c[d>>2]|0)+ -12>>2]|0;if(!(c[d+(e+24)>>2]|0)){i=b;return}if(c[d+(e+16)>>2]|0){i=b;return}if(!(c[d+(e+4)>>2]&8192)){i=b;return}if(Ia()|0){i=b;return}e=c[a>>2]|0;e=c[e+((c[(c[e>>2]|0)+ -12>>2]|0)+24)>>2]|0;if((md[c[(c[e>>2]|0)+24>>2]&127](e)|0)!=-1){i=b;return}d=c[a>>2]|0;e=c[(c[d>>2]|0)+ -12>>2]|0;Zi(d+e|0,c[d+(e+16)>>2]|1);i=b;return}function Xj(a){a=a|0;return 16528}function Yj(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;d=i;if((e|0)!=1&(e|0)<257){g=bd(e|0)|0;Gi(b,g,mr(g|0)|0);i=d;return}else{e=$p(48)|0;c[b+8>>2]=e;c[b>>2]=49;c[b+4>>2]=35;g=e+0|0;f=16544|0;b=g+35|0;do{a[g>>0]=a[f>>0]|0;g=g+1|0;f=f+1|0}while((g|0)<(b|0));a[e+35>>0]=0;i=d;return}}function Zj(a){a=a|0;return}function _j(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27520;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function $j(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=27520;a=a+4|0;e=(c[a>>2]|0)+ -4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if((d+ -1|0)>=0){i=b;return}Uq((c[a>>2]|0)+ -12|0);i=b;return}function ak(a){a=a|0;var b=0;b=i;_i(a);Uq(a);i=b;return}function bk(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function ck(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function dk(a){a=a|0;return}function ek(a){a=a|0;return}function fk(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0;b=i;a:do if((e|0)==(f|0))g=6;else while(1){if((c|0)==(d|0)){d=-1;break a}h=a[c>>0]|0;j=a[e>>0]|0;if(h<<24>>24<j<<24>>24){d=-1;break a}if(j<<24>>24<h<<24>>24){d=1;break a}c=c+1|0;e=e+1|0;if((e|0)==(f|0)){g=6;break}}while(0);if((g|0)==6)d=(c|0)!=(d|0)&1;i=b;return d|0}function gk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;b=i;Hi(a,c,d);i=b;return}function hk(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0;b=i;if((c|0)==(d|0)){e=0;i=b;return e|0}else e=0;do{e=(a[c>>0]|0)+(e<<4)|0;f=e&-268435456;e=(f>>>24|f)^e;c=c+1|0}while((c|0)!=(d|0));i=b;return e|0}function ik(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function jk(a){a=a|0;return}function kk(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0;a=i;a:do if((e|0)==(f|0))g=6;else while(1){if((b|0)==(d|0)){d=-1;break a}h=c[b>>2]|0;j=c[e>>2]|0;if((h|0)<(j|0)){d=-1;break a}if((j|0)<(h|0)){d=1;break a}b=b+4|0;e=e+4|0;if((e|0)==(f|0)){g=6;break}}while(0);if((g|0)==6)d=(b|0)!=(d|0)&1;i=a;return d|0}function lk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;b=i;Ti(a,c,d);i=b;return}function mk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;a=i;if((b|0)==(d|0)){e=0;i=a;return e|0}else e=0;do{e=(c[b>>2]|0)+(e<<4)|0;f=e&-268435456;e=(f>>>24|f)^e;b=b+4|0}while((b|0)!=(d|0));i=a;return e|0}function nk(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function ok(a){a=a|0;return}function pk(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;k=i;i=i+64|0;o=k+8|0;p=k+40|0;m=k+44|0;n=k+48|0;r=k+4|0;q=k;l=k+16|0;if(!(c[g+4>>2]&1)){c[m>>2]=-1;l=c[(c[d>>2]|0)+16>>2]|0;c[r>>2]=c[e>>2];c[q>>2]=c[f>>2];c[p+0>>2]=c[r+0>>2];c[o+0>>2]=c[q+0>>2];gd[l&63](n,d,p,o,g,h,m);l=c[n>>2]|0;c[e>>2]=l;e=c[m>>2]|0;if(!e)a[j>>0]=0;else if((e|0)==1)a[j>>0]=1;else{a[j>>0]=1;c[h>>2]=4}c[b>>2]=l;i=k;return}d=g+28|0;n=c[d>>2]|0;m=n+4|0;c[m>>2]=(c[m>>2]|0)+1;m=Sn(n,19072)|0;r=n+4|0;g=c[r>>2]|0;c[r>>2]=g+ -1;if(!g)jd[c[(c[n>>2]|0)+8>>2]&255](n);n=c[d>>2]|0;d=n+4|0;c[d>>2]=(c[d>>2]|0)+1;d=Sn(n,19216)|0;r=n+4|0;g=c[r>>2]|0;c[r>>2]=g+ -1;if(!g)jd[c[(c[n>>2]|0)+8>>2]&255](n);kd[c[(c[d>>2]|0)+24>>2]&63](l,d);g=l+12|0;kd[c[(c[d>>2]|0)+28>>2]&63](g,d);a[j>>0]=(qk(e,c[f>>2]|0,l,l+24|0,m,h,1)|0)==(l|0)&1;c[b>>2]=c[e>>2];if(a[g>>0]&1)Uq(c[l+20>>2]|0);if(!(a[l>>0]&1)){i=k;return}Uq(c[l+8>>2]|0);i=k;return}function qk(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;n=i;i=i+112|0;o=n;s=(g-f|0)/12|0;if(s>>>0>100){o=Tq(s)|0;if(!o){y=Wb(4)|0;c[y>>2]=27280;Zc(y|0,27328,220)}else l=o}else l=0;p=(f|0)==(g|0);if(p)t=0;else{q=f;t=0;r=o;while(1){u=a[q>>0]|0;if(!(u&1))u=(u&255)>>>1;else u=c[q+4>>2]|0;if(!u){a[r>>0]=2;t=t+1|0;s=s+ -1|0}else a[r>>0]=1;q=q+12|0;if((q|0)==(g|0))break;else r=r+1|0}}q=0;a:while(1){v=(s|0)!=0;r=q;while(1){q=c[b>>2]|0;do if(q){if((c[q+12>>2]|0)==(c[q+16>>2]|0))if((md[c[(c[q>>2]|0)+36>>2]&127](q)|0)==-1){c[b>>2]=0;q=0;break}else{q=c[b>>2]|0;break}}else q=0;while(0);x=(q|0)==0;if(e)if((c[e+12>>2]|0)==(c[e+16>>2]|0)){y=(md[c[(c[e>>2]|0)+36>>2]&127](e)|0)==-1;q=y?0:e;e=y?0:e}else q=e;else{q=0;e=0}u=(q|0)==0;w=c[b>>2]|0;if(!((x^u)&v))break a;q=c[w+12>>2]|0;if((q|0)==(c[w+16>>2]|0))q=md[c[(c[w>>2]|0)+36>>2]&127](w)|0;else q=d[q>>0]|0;u=q&255;if(!k)u=vd[c[(c[h>>2]|0)+12>>2]&63](h,u)|0;q=r+1|0;if(p)r=q;else{x=0;v=f;w=o;break}}while(1){do if((a[w>>0]|0)==1){if(!(a[v>>0]&1))y=v+1|0;else y=c[v+8>>2]|0;y=a[y+r>>0]|0;if(!k)y=vd[c[(c[h>>2]|0)+12>>2]&63](h,y)|0;if(u<<24>>24!=y<<24>>24){a[w>>0]=0;s=s+ -1|0;break}x=a[v>>0]|0;if(!(x&1))x=(x&255)>>>1;else x=c[v+4>>2]|0;if((x|0)==(q|0)){a[w>>0]=2;x=1;t=t+1|0;s=s+ -1|0}else x=1}while(0);v=v+12|0;if((v|0)==(g|0))break;w=w+1|0}if(!x)continue;r=c[b>>2]|0;u=r+12|0;v=c[u>>2]|0;if((v|0)==(c[r+16>>2]|0))md[c[(c[r>>2]|0)+40>>2]&127](r)|0;else c[u>>2]=v+1;if((t+s|0)>>>0<2)continue;else{r=f;u=o}while(1){if((a[u>>0]|0)==2){v=a[r>>0]|0;if(!(v&1))v=(v&255)>>>1;else v=c[r+4>>2]|0;if((v|0)!=(q|0)){a[u>>0]=0;t=t+ -1|0}}r=r+12|0;if((r|0)==(g|0))continue a;else u=u+1|0}}do if(w){if((c[w+12>>2]|0)==(c[w+16>>2]|0))if((md[c[(c[w>>2]|0)+36>>2]&127](w)|0)==-1){c[b>>2]=0;w=0;break}else{w=c[b>>2]|0;break}}else w=0;while(0);k=(w|0)==0;do if(!u){if((c[q+12>>2]|0)!=(c[q+16>>2]|0))if(k)break;else{m=72;break}if((md[c[(c[q>>2]|0)+36>>2]&127](q)|0)!=-1){if(!k)m=72}else m=70}else m=70;while(0);if((m|0)==70?k:0)m=72;if((m|0)==72)c[j>>2]=c[j>>2]|2;b:do if(!p)if((a[o>>0]|0)==2)g=f;else while(1){f=f+12|0;o=o+1|0;if((f|0)==(g|0)){m=77;break b}if((a[o>>0]|0)==2){g=f;break}}else m=77;while(0);if((m|0)==77)c[j>>2]=c[j>>2]|4;if(!l){i=n;return g|0}Uq(l);i=n;return g|0}function rk(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;m=i;i=i+224|0;t=m+198|0;w=m+196|0;e=m+16|0;n=m+4|0;r=m+192|0;s=m+32|0;p=m;q=m+28|0;v=c[f>>2]|0;y=c[g>>2]|0;g=c[h+4>>2]&74;if((g|0)==8)g=16;else if(!g)g=0;else if((g|0)==64)g=8;else g=10;Tk(e,h,t,w);c[n+0>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;Ki(n,10);if(!(a[n>>0]&1)){z=n+1|0;h=z;u=n+8|0}else{z=n+8|0;h=n+1|0;u=z;z=c[z>>2]|0}c[r>>2]=z;c[p>>2]=s;c[q>>2]=0;f=n+4|0;w=a[w>>0]|0;a:while(1){if(v){if((c[v+12>>2]|0)==(c[v+16>>2]|0)){C=(md[c[(c[v>>2]|0)+36>>2]&127](v)|0)==-1;v=C?0:v}}else v=0;x=(v|0)==0;do if(y){if((c[y+12>>2]|0)!=(c[y+16>>2]|0))if(x)break;else break a;if((md[c[(c[y>>2]|0)+36>>2]&127](y)|0)!=-1){if(!x)break a}else l=19}else l=19;while(0);if((l|0)==19){l=0;if(x){y=0;break}else y=0}C=a[n>>0]|0;B=(C&1)==0;if(B)A=(C&255)>>>1;else A=c[f>>2]|0;if((c[r>>2]|0)==(z+A|0)){if(B)A=(C&255)>>>1;else A=c[f>>2]|0;Ki(n,A<<1);if(!(a[n>>0]&1))z=10;else z=(c[n>>2]&-2)+ -1|0;Ki(n,z);if(!(a[n>>0]&1))z=h;else z=c[u>>2]|0;c[r>>2]=z+A}A=v+12|0;C=c[A>>2]|0;B=v+16|0;if((C|0)==(c[B>>2]|0))C=md[c[(c[v>>2]|0)+36>>2]&127](v)|0;else C=d[C>>0]|0;if(Bk(C&255,g,z,r,q,w,e,s,p,t)|0)break;x=c[A>>2]|0;if((x|0)==(c[B>>2]|0)){md[c[(c[v>>2]|0)+40>>2]&127](v)|0;continue}else{c[A>>2]=x+1;continue}}t=a[e>>0]|0;if(!(t&1))t=(t&255)>>>1;else t=c[e+4>>2]|0;if((t|0)!=0?(o=c[p>>2]|0,(o-s|0)<160):0){C=c[q>>2]|0;c[p>>2]=o+4;c[o>>2]=C}c[k>>2]=Ip(z,c[r>>2]|0,j,g)|0;hn(e,s,c[p>>2]|0,j);if(!x){if((c[v+12>>2]|0)==(c[v+16>>2]|0)){C=(md[c[(c[v>>2]|0)+36>>2]&127](v)|0)==-1;v=C?0:v}}else v=0;k=(v|0)==0;do if(y){if((c[y+12>>2]|0)!=(c[y+16>>2]|0))if(k)break;else{l=60;break}if((md[c[(c[y>>2]|0)+36>>2]&127](y)|0)!=-1){if(!k)l=60}else l=58}else l=58;while(0);if((l|0)==58?k:0)l=60;if((l|0)==60)c[j>>2]=c[j>>2]|2;c[b>>2]=v;if(a[n>>0]&1)Uq(c[n+8>>2]|0);if(!(a[e>>0]&1)){i=m;return}Uq(c[e+8>>2]|0);i=m;return}function sk(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;m=i;i=i+224|0;t=m+198|0;w=m+196|0;e=m+16|0;n=m+4|0;r=m+192|0;s=m+32|0;p=m;q=m+28|0;v=c[f>>2]|0;y=c[g>>2]|0;g=c[h+4>>2]&74;if((g|0)==64)g=8;else if(!g)g=0;else if((g|0)==8)g=16;else g=10;Tk(e,h,t,w);c[n+0>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;Ki(n,10);if(!(a[n>>0]&1)){z=n+1|0;h=z;u=n+8|0}else{z=n+8|0;h=n+1|0;u=z;z=c[z>>2]|0}c[r>>2]=z;c[p>>2]=s;c[q>>2]=0;f=n+4|0;w=a[w>>0]|0;a:while(1){if(v){if((c[v+12>>2]|0)==(c[v+16>>2]|0)){C=(md[c[(c[v>>2]|0)+36>>2]&127](v)|0)==-1;v=C?0:v}}else v=0;x=(v|0)==0;do if(y){if((c[y+12>>2]|0)!=(c[y+16>>2]|0))if(x)break;else break a;if((md[c[(c[y>>2]|0)+36>>2]&127](y)|0)!=-1){if(!x)break a}else l=19}else l=19;while(0);if((l|0)==19){l=0;if(x){y=0;break}else y=0}C=a[n>>0]|0;B=(C&1)==0;if(B)A=(C&255)>>>1;else A=c[f>>2]|0;if((c[r>>2]|0)==(z+A|0)){if(B)A=(C&255)>>>1;else A=c[f>>2]|0;Ki(n,A<<1);if(!(a[n>>0]&1))z=10;else z=(c[n>>2]&-2)+ -1|0;Ki(n,z);if(!(a[n>>0]&1))z=h;else z=c[u>>2]|0;c[r>>2]=z+A}A=v+12|0;C=c[A>>2]|0;B=v+16|0;if((C|0)==(c[B>>2]|0))C=md[c[(c[v>>2]|0)+36>>2]&127](v)|0;else C=d[C>>0]|0;if(Bk(C&255,g,z,r,q,w,e,s,p,t)|0)break;x=c[A>>2]|0;if((x|0)==(c[B>>2]|0)){md[c[(c[v>>2]|0)+40>>2]&127](v)|0;continue}else{c[A>>2]=x+1;continue}}t=a[e>>0]|0;if(!(t&1))t=(t&255)>>>1;else t=c[e+4>>2]|0;if((t|0)!=0?(o=c[p>>2]|0,(o-s|0)<160):0){C=c[q>>2]|0;c[p>>2]=o+4;c[o>>2]=C}B=Hp(z,c[r>>2]|0,j,g)|0;C=k;c[C>>2]=B;c[C+4>>2]=H;hn(e,s,c[p>>2]|0,j);if(!x){if((c[v+12>>2]|0)==(c[v+16>>2]|0)){C=(md[c[(c[v>>2]|0)+36>>2]&127](v)|0)==-1;v=C?0:v}}else v=0;k=(v|0)==0;do if(y){if((c[y+12>>2]|0)!=(c[y+16>>2]|0))if(k)break;else{l=60;break}if((md[c[(c[y>>2]|0)+36>>2]&127](y)|0)!=-1){if(!k)l=60}else l=58}else l=58;while(0);if((l|0)==58?k:0)l=60;if((l|0)==60)c[j>>2]=c[j>>2]|2;c[b>>2]=v;if(a[n>>0]&1)Uq(c[n+8>>2]|0);if(!(a[e>>0]&1)){i=m;return}Uq(c[e+8>>2]|0);i=m;return}function tk(e,f,g,h,j,k,l){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;n=i;i=i+224|0;u=n+198|0;x=n+196|0;f=n+16|0;o=n+4|0;s=n+192|0;t=n+32|0;q=n;r=n+28|0;w=c[g>>2]|0;z=c[h>>2]|0;h=c[j+4>>2]&74;if((h|0)==8)h=16;else if((h|0)==64)h=8;else if(!h)h=0;else h=10;Tk(f,j,u,x);c[o+0>>2]=0;c[o+4>>2]=0;c[o+8>>2]=0;Ki(o,10);if(!(a[o>>0]&1)){A=o+1|0;j=A;v=o+8|0}else{A=o+8|0;j=o+1|0;v=A;A=c[A>>2]|0}c[s>>2]=A;c[q>>2]=t;c[r>>2]=0;g=o+4|0;x=a[x>>0]|0;a:while(1){if(w){if((c[w+12>>2]|0)==(c[w+16>>2]|0)){D=(md[c[(c[w>>2]|0)+36>>2]&127](w)|0)==-1;w=D?0:w}}else w=0;y=(w|0)==0;do if(z){if((c[z+12>>2]|0)!=(c[z+16>>2]|0))if(y)break;else break a;if((md[c[(c[z>>2]|0)+36>>2]&127](z)|0)!=-1){if(!y)break a}else m=19}else m=19;while(0);if((m|0)==19){m=0;if(y){z=0;break}else z=0}D=a[o>>0]|0;C=(D&1)==0;if(C)B=(D&255)>>>1;else B=c[g>>2]|0;if((c[s>>2]|0)==(A+B|0)){if(C)B=(D&255)>>>1;else B=c[g>>2]|0;Ki(o,B<<1);if(!(a[o>>0]&1))A=10;else A=(c[o>>2]&-2)+ -1|0;Ki(o,A);if(!(a[o>>0]&1))A=j;else A=c[v>>2]|0;c[s>>2]=A+B}B=w+12|0;D=c[B>>2]|0;C=w+16|0;if((D|0)==(c[C>>2]|0))D=md[c[(c[w>>2]|0)+36>>2]&127](w)|0;else D=d[D>>0]|0;if(Bk(D&255,h,A,s,r,x,f,t,q,u)|0)break;y=c[B>>2]|0;if((y|0)==(c[C>>2]|0)){md[c[(c[w>>2]|0)+40>>2]&127](w)|0;continue}else{c[B>>2]=y+1;continue}}u=a[f>>0]|0;if(!(u&1))u=(u&255)>>>1;else u=c[f+4>>2]|0;if((u|0)!=0?(p=c[q>>2]|0,(p-t|0)<160):0){D=c[r>>2]|0;c[q>>2]=p+4;c[p>>2]=D}b[l>>1]=Gp(A,c[s>>2]|0,k,h)|0;hn(f,t,c[q>>2]|0,k);if(!y){if((c[w+12>>2]|0)==(c[w+16>>2]|0)){D=(md[c[(c[w>>2]|0)+36>>2]&127](w)|0)==-1;w=D?0:w}}else w=0;l=(w|0)==0;do if(z){if((c[z+12>>2]|0)!=(c[z+16>>2]|0))if(l)break;else{m=60;break}if((md[c[(c[z>>2]|0)+36>>2]&127](z)|0)!=-1){if(!l)m=60}else m=58}else m=58;while(0);if((m|0)==58?l:0)m=60;if((m|0)==60)c[k>>2]=c[k>>2]|2;c[e>>2]=w;if(a[o>>0]&1)Uq(c[o+8>>2]|0);if(!(a[f>>0]&1)){i=n;return}Uq(c[f+8>>2]|0);i=n;return}function uk(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;m=i;i=i+224|0;t=m+198|0;w=m+196|0;e=m+16|0;n=m+4|0;r=m+192|0;s=m+32|0;p=m;q=m+28|0;v=c[f>>2]|0;y=c[g>>2]|0;g=c[h+4>>2]&74;if((g|0)==64)g=8;else if(!g)g=0;else if((g|0)==8)g=16;else g=10;Tk(e,h,t,w);c[n+0>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;Ki(n,10);if(!(a[n>>0]&1)){z=n+1|0;h=z;u=n+8|0}else{z=n+8|0;h=n+1|0;u=z;z=c[z>>2]|0}c[r>>2]=z;c[p>>2]=s;c[q>>2]=0;f=n+4|0;w=a[w>>0]|0;a:while(1){if(v){if((c[v+12>>2]|0)==(c[v+16>>2]|0)){C=(md[c[(c[v>>2]|0)+36>>2]&127](v)|0)==-1;v=C?0:v}}else v=0;x=(v|0)==0;do if(y){if((c[y+12>>2]|0)!=(c[y+16>>2]|0))if(x)break;else break a;if((md[c[(c[y>>2]|0)+36>>2]&127](y)|0)!=-1){if(!x)break a}else l=19}else l=19;while(0);if((l|0)==19){l=0;if(x){y=0;break}else y=0}C=a[n>>0]|0;B=(C&1)==0;if(B)A=(C&255)>>>1;else A=c[f>>2]|0;if((c[r>>2]|0)==(z+A|0)){if(B)A=(C&255)>>>1;else A=c[f>>2]|0;Ki(n,A<<1);if(!(a[n>>0]&1))z=10;else z=(c[n>>2]&-2)+ -1|0;Ki(n,z);if(!(a[n>>0]&1))z=h;else z=c[u>>2]|0;c[r>>2]=z+A}A=v+12|0;C=c[A>>2]|0;B=v+16|0;if((C|0)==(c[B>>2]|0))C=md[c[(c[v>>2]|0)+36>>2]&127](v)|0;else C=d[C>>0]|0;if(Bk(C&255,g,z,r,q,w,e,s,p,t)|0)break;x=c[A>>2]|0;if((x|0)==(c[B>>2]|0)){md[c[(c[v>>2]|0)+40>>2]&127](v)|0;continue}else{c[A>>2]=x+1;continue}}t=a[e>>0]|0;if(!(t&1))t=(t&255)>>>1;else t=c[e+4>>2]|0;if((t|0)!=0?(o=c[p>>2]|0,(o-s|0)<160):0){C=c[q>>2]|0;c[p>>2]=o+4;c[o>>2]=C}c[k>>2]=Fp(z,c[r>>2]|0,j,g)|0;hn(e,s,c[p>>2]|0,j);if(!x){if((c[v+12>>2]|0)==(c[v+16>>2]|0)){C=(md[c[(c[v>>2]|0)+36>>2]&127](v)|0)==-1;v=C?0:v}}else v=0;k=(v|0)==0;do if(y){if((c[y+12>>2]|0)!=(c[y+16>>2]|0))if(k)break;else{l=60;break}if((md[c[(c[y>>2]|0)+36>>2]&127](y)|0)!=-1){if(!k)l=60}else l=58}else l=58;while(0);if((l|0)==58?k:0)l=60;if((l|0)==60)c[j>>2]=c[j>>2]|2;c[b>>2]=v;if(a[n>>0]&1)Uq(c[n+8>>2]|0);if(!(a[e>>0]&1)){i=m;return}Uq(c[e+8>>2]|0);i=m;return}function vk(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;m=i;i=i+224|0;t=m+198|0;w=m+196|0;e=m+16|0;n=m+4|0;r=m+192|0;s=m+32|0;p=m;q=m+28|0;v=c[f>>2]|0;y=c[g>>2]|0;g=c[h+4>>2]&74;if((g|0)==8)g=16;else if((g|0)==64)g=8;else if(!g)g=0;else g=10;Tk(e,h,t,w);c[n+0>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;Ki(n,10);if(!(a[n>>0]&1)){z=n+1|0;h=z;u=n+8|0}else{z=n+8|0;h=n+1|0;u=z;z=c[z>>2]|0}c[r>>2]=z;c[p>>2]=s;c[q>>2]=0;f=n+4|0;w=a[w>>0]|0;a:while(1){if(v){if((c[v+12>>2]|0)==(c[v+16>>2]|0)){C=(md[c[(c[v>>2]|0)+36>>2]&127](v)|0)==-1;v=C?0:v}}else v=0;x=(v|0)==0;do if(y){if((c[y+12>>2]|0)!=(c[y+16>>2]|0))if(x)break;else break a;if((md[c[(c[y>>2]|0)+36>>2]&127](y)|0)!=-1){if(!x)break a}else l=19}else l=19;while(0);if((l|0)==19){l=0;if(x){y=0;break}else y=0}C=a[n>>0]|0;B=(C&1)==0;if(B)A=(C&255)>>>1;else A=c[f>>2]|0;if((c[r>>2]|0)==(z+A|0)){if(B)A=(C&255)>>>1;else A=c[f>>2]|0;Ki(n,A<<1);if(!(a[n>>0]&1))z=10;else z=(c[n>>2]&-2)+ -1|0;Ki(n,z);if(!(a[n>>0]&1))z=h;else z=c[u>>2]|0;c[r>>2]=z+A}A=v+12|0;C=c[A>>2]|0;B=v+16|0;if((C|0)==(c[B>>2]|0))C=md[c[(c[v>>2]|0)+36>>2]&127](v)|0;else C=d[C>>0]|0;if(Bk(C&255,g,z,r,q,w,e,s,p,t)|0)break;x=c[A>>2]|0;if((x|0)==(c[B>>2]|0)){md[c[(c[v>>2]|0)+40>>2]&127](v)|0;continue}else{c[A>>2]=x+1;continue}}t=a[e>>0]|0;if(!(t&1))t=(t&255)>>>1;else t=c[e+4>>2]|0;if((t|0)!=0?(o=c[p>>2]|0,(o-s|0)<160):0){C=c[q>>2]|0;c[p>>2]=o+4;c[o>>2]=C}c[k>>2]=Ep(z,c[r>>2]|0,j,g)|0;hn(e,s,c[p>>2]|0,j);if(!x){if((c[v+12>>2]|0)==(c[v+16>>2]|0)){C=(md[c[(c[v>>2]|0)+36>>2]&127](v)|0)==-1;v=C?0:v}}else v=0;k=(v|0)==0;do if(y){if((c[y+12>>2]|0)!=(c[y+16>>2]|0))if(k)break;else{l=60;break}if((md[c[(c[y>>2]|0)+36>>2]&127](y)|0)!=-1){if(!k)l=60}else l=58}else l=58;while(0);if((l|0)==58?k:0)l=60;if((l|0)==60)c[j>>2]=c[j>>2]|2;c[b>>2]=v;if(a[n>>0]&1)Uq(c[n+8>>2]|0);if(!(a[e>>0]&1)){i=m;return}Uq(c[e+8>>2]|0);i=m;return}function wk(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;m=i;i=i+224|0;t=m+198|0;w=m+196|0;e=m+16|0;n=m+4|0;r=m+192|0;s=m+32|0;p=m;q=m+28|0;v=c[f>>2]|0;y=c[g>>2]|0;g=c[h+4>>2]&74;if((g|0)==64)g=8;else if(!g)g=0;else if((g|0)==8)g=16;else g=10;Tk(e,h,t,w);c[n+0>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;Ki(n,10);if(!(a[n>>0]&1)){z=n+1|0;h=z;u=n+8|0}else{z=n+8|0;h=n+1|0;u=z;z=c[z>>2]|0}c[r>>2]=z;c[p>>2]=s;c[q>>2]=0;f=n+4|0;w=a[w>>0]|0;a:while(1){if(v){if((c[v+12>>2]|0)==(c[v+16>>2]|0)){C=(md[c[(c[v>>2]|0)+36>>2]&127](v)|0)==-1;v=C?0:v}}else v=0;x=(v|0)==0;do if(y){if((c[y+12>>2]|0)!=(c[y+16>>2]|0))if(x)break;else break a;if((md[c[(c[y>>2]|0)+36>>2]&127](y)|0)!=-1){if(!x)break a}else l=19}else l=19;while(0);if((l|0)==19){l=0;if(x){y=0;break}else y=0}C=a[n>>0]|0;B=(C&1)==0;if(B)A=(C&255)>>>1;else A=c[f>>2]|0;if((c[r>>2]|0)==(z+A|0)){if(B)A=(C&255)>>>1;else A=c[f>>2]|0;Ki(n,A<<1);if(!(a[n>>0]&1))z=10;else z=(c[n>>2]&-2)+ -1|0;Ki(n,z);if(!(a[n>>0]&1))z=h;else z=c[u>>2]|0;c[r>>2]=z+A}A=v+12|0;C=c[A>>2]|0;B=v+16|0;if((C|0)==(c[B>>2]|0))C=md[c[(c[v>>2]|0)+36>>2]&127](v)|0;else C=d[C>>0]|0;if(Bk(C&255,g,z,r,q,w,e,s,p,t)|0)break;x=c[A>>2]|0;if((x|0)==(c[B>>2]|0)){md[c[(c[v>>2]|0)+40>>2]&127](v)|0;continue}else{c[A>>2]=x+1;continue}}t=a[e>>0]|0;if(!(t&1))t=(t&255)>>>1;else t=c[e+4>>2]|0;if((t|0)!=0?(o=c[p>>2]|0,(o-s|0)<160):0){C=c[q>>2]|0;c[p>>2]=o+4;c[o>>2]=C}B=Dp(z,c[r>>2]|0,j,g)|0;C=k;c[C>>2]=B;c[C+4>>2]=H;hn(e,s,c[p>>2]|0,j);if(!x){if((c[v+12>>2]|0)==(c[v+16>>2]|0)){C=(md[c[(c[v>>2]|0)+36>>2]&127](v)|0)==-1;v=C?0:v}}else v=0;k=(v|0)==0;do if(y){if((c[y+12>>2]|0)!=(c[y+16>>2]|0))if(k)break;else{l=60;break}if((md[c[(c[y>>2]|0)+36>>2]&127](y)|0)!=-1){if(!k)l=60}else l=58}else l=58;while(0);if((l|0)==58?k:0)l=60;if((l|0)==60)c[j>>2]=c[j>>2]|2;c[b>>2]=v;if(a[n>>0]&1)Uq(c[n+8>>2]|0);if(!(a[e>>0]&1)){i=m;return}Uq(c[e+8>>2]|0);i=m;return}function xk(b,e,f,h,j,k,l){b=b|0;e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;o=i;i=i+256|0;v=o+208|0;x=o+200|0;y=o+240|0;e=o;n=o+188|0;s=o+184|0;u=o+16|0;q=o+176|0;r=o+180|0;t=o+241|0;w=o+242|0;z=c[f>>2]|0;B=c[h>>2]|0;Uk(e,j,v,x,y);c[n+0>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;Ki(n,10);if(!(a[n>>0]&1)){C=n+1|0;h=C;j=n+8|0}else{C=n+8|0;h=n+1|0;j=C;C=c[C>>2]|0}c[s>>2]=C;c[q>>2]=u;c[r>>2]=0;a[t>>0]=1;a[w>>0]=69;f=n+4|0;x=a[x>>0]|0;y=a[y>>0]|0;a:while(1){if(z){if((c[z+12>>2]|0)==(c[z+16>>2]|0)){F=(md[c[(c[z>>2]|0)+36>>2]&127](z)|0)==-1;z=F?0:z}}else z=0;A=(z|0)==0;do if(B){if((c[B+12>>2]|0)!=(c[B+16>>2]|0))if(A)break;else break a;if((md[c[(c[B>>2]|0)+36>>2]&127](B)|0)!=-1){if(!A)break a}else m=15}else m=15;while(0);if((m|0)==15){m=0;if(A){B=0;break}else B=0}E=a[n>>0]|0;F=(E&1)==0;if(F)D=(E&255)>>>1;else D=c[f>>2]|0;if((c[s>>2]|0)==(C+D|0)){if(F)D=(E&255)>>>1;else D=c[f>>2]|0;Ki(n,D<<1);if(!(a[n>>0]&1))C=10;else C=(c[n>>2]&-2)+ -1|0;Ki(n,C);if(!(a[n>>0]&1))C=h;else C=c[j>>2]|0;c[s>>2]=C+D}E=z+12|0;F=c[E>>2]|0;D=z+16|0;if((F|0)==(c[D>>2]|0))F=md[c[(c[z>>2]|0)+36>>2]&127](z)|0;else F=d[F>>0]|0;if(Vk(F&255,t,w,C,s,x,y,e,u,q,r,v)|0)break;A=c[E>>2]|0;if((A|0)==(c[D>>2]|0)){md[c[(c[z>>2]|0)+40>>2]&127](z)|0;continue}else{c[E>>2]=A+1;continue}}v=a[e>>0]|0;if(!(v&1))v=(v&255)>>>1;else v=c[e+4>>2]|0;if(((v|0)!=0?(a[t>>0]|0)!=0:0)?(p=c[q>>2]|0,(p-u|0)<160):0){F=c[r>>2]|0;c[q>>2]=p+4;c[p>>2]=F}g[l>>2]=+Cp(C,c[s>>2]|0,k);hn(e,u,c[q>>2]|0,k);if(!A){if((c[z+12>>2]|0)==(c[z+16>>2]|0)){F=(md[c[(c[z>>2]|0)+36>>2]&127](z)|0)==-1;z=F?0:z}}else z=0;p=(z|0)==0;do if(B){if((c[B+12>>2]|0)!=(c[B+16>>2]|0))if(p)break;else{m=57;break}if((md[c[(c[B>>2]|0)+36>>2]&127](B)|0)!=-1){if(!p)m=57}else m=55}else m=55;while(0);if((m|0)==55?p:0)m=57;if((m|0)==57)c[k>>2]=c[k>>2]|2;c[b>>2]=z;if(a[n>>0]&1)Uq(c[n+8>>2]|0);if(!(a[e>>0]&1)){i=o;return}Uq(c[e+8>>2]|0);i=o;return}function yk(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;o=i;i=i+256|0;v=o+208|0;x=o+200|0;y=o+240|0;e=o;n=o+188|0;s=o+184|0;u=o+16|0;q=o+176|0;r=o+180|0;t=o+241|0;w=o+242|0;z=c[f>>2]|0;B=c[g>>2]|0;Uk(e,j,v,x,y);c[n+0>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;Ki(n,10);if(!(a[n>>0]&1)){C=n+1|0;g=C;j=n+8|0}else{C=n+8|0;g=n+1|0;j=C;C=c[C>>2]|0}c[s>>2]=C;c[q>>2]=u;c[r>>2]=0;a[t>>0]=1;a[w>>0]=69;f=n+4|0;x=a[x>>0]|0;y=a[y>>0]|0;a:while(1){if(z){if((c[z+12>>2]|0)==(c[z+16>>2]|0)){F=(md[c[(c[z>>2]|0)+36>>2]&127](z)|0)==-1;z=F?0:z}}else z=0;A=(z|0)==0;do if(B){if((c[B+12>>2]|0)!=(c[B+16>>2]|0))if(A)break;else break a;if((md[c[(c[B>>2]|0)+36>>2]&127](B)|0)!=-1){if(!A)break a}else m=15}else m=15;while(0);if((m|0)==15){m=0;if(A){B=0;break}else B=0}E=a[n>>0]|0;F=(E&1)==0;if(F)D=(E&255)>>>1;else D=c[f>>2]|0;if((c[s>>2]|0)==(C+D|0)){if(F)D=(E&255)>>>1;else D=c[f>>2]|0;Ki(n,D<<1);if(!(a[n>>0]&1))C=10;else C=(c[n>>2]&-2)+ -1|0;Ki(n,C);if(!(a[n>>0]&1))C=g;else C=c[j>>2]|0;c[s>>2]=C+D}E=z+12|0;F=c[E>>2]|0;D=z+16|0;if((F|0)==(c[D>>2]|0))F=md[c[(c[z>>2]|0)+36>>2]&127](z)|0;else F=d[F>>0]|0;if(Vk(F&255,t,w,C,s,x,y,e,u,q,r,v)|0)break;A=c[E>>2]|0;if((A|0)==(c[D>>2]|0)){md[c[(c[z>>2]|0)+40>>2]&127](z)|0;continue}else{c[E>>2]=A+1;continue}}v=a[e>>0]|0;if(!(v&1))v=(v&255)>>>1;else v=c[e+4>>2]|0;if(((v|0)!=0?(a[t>>0]|0)!=0:0)?(p=c[q>>2]|0,(p-u|0)<160):0){F=c[r>>2]|0;c[q>>2]=p+4;c[p>>2]=F}h[l>>3]=+Bp(C,c[s>>2]|0,k);hn(e,u,c[q>>2]|0,k);if(!A){if((c[z+12>>2]|0)==(c[z+16>>2]|0)){F=(md[c[(c[z>>2]|0)+36>>2]&127](z)|0)==-1;z=F?0:z}}else z=0;p=(z|0)==0;do if(B){if((c[B+12>>2]|0)!=(c[B+16>>2]|0))if(p)break;else{m=57;break}if((md[c[(c[B>>2]|0)+36>>2]&127](B)|0)!=-1){if(!p)m=57}else m=55}else m=55;while(0);if((m|0)==55?p:0)m=57;if((m|0)==57)c[k>>2]=c[k>>2]|2;c[b>>2]=z;if(a[n>>0]&1)Uq(c[n+8>>2]|0);if(!(a[e>>0]&1)){i=o;return}Uq(c[e+8>>2]|0);i=o;return}function zk(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;o=i;i=i+256|0;v=o+208|0;x=o+200|0;y=o+240|0;e=o;n=o+188|0;s=o+184|0;u=o+16|0;q=o+176|0;r=o+180|0;t=o+241|0;w=o+242|0;z=c[f>>2]|0;B=c[g>>2]|0;Uk(e,j,v,x,y);c[n+0>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;Ki(n,10);if(!(a[n>>0]&1)){C=n+1|0;g=C;j=n+8|0}else{C=n+8|0;g=n+1|0;j=C;C=c[C>>2]|0}c[s>>2]=C;c[q>>2]=u;c[r>>2]=0;a[t>>0]=1;a[w>>0]=69;f=n+4|0;x=a[x>>0]|0;y=a[y>>0]|0;a:while(1){if(z){if((c[z+12>>2]|0)==(c[z+16>>2]|0)){F=(md[c[(c[z>>2]|0)+36>>2]&127](z)|0)==-1;z=F?0:z}}else z=0;A=(z|0)==0;do if(B){if((c[B+12>>2]|0)!=(c[B+16>>2]|0))if(A)break;else break a;if((md[c[(c[B>>2]|0)+36>>2]&127](B)|0)!=-1){if(!A)break a}else m=15}else m=15;while(0);if((m|0)==15){m=0;if(A){B=0;break}else B=0}E=a[n>>0]|0;F=(E&1)==0;if(F)D=(E&255)>>>1;else D=c[f>>2]|0;if((c[s>>2]|0)==(C+D|0)){if(F)D=(E&255)>>>1;else D=c[f>>2]|0;Ki(n,D<<1);if(!(a[n>>0]&1))C=10;else C=(c[n>>2]&-2)+ -1|0;Ki(n,C);if(!(a[n>>0]&1))C=g;else C=c[j>>2]|0;c[s>>2]=C+D}E=z+12|0;F=c[E>>2]|0;D=z+16|0;if((F|0)==(c[D>>2]|0))F=md[c[(c[z>>2]|0)+36>>2]&127](z)|0;else F=d[F>>0]|0;if(Vk(F&255,t,w,C,s,x,y,e,u,q,r,v)|0)break;A=c[E>>2]|0;if((A|0)==(c[D>>2]|0)){md[c[(c[z>>2]|0)+40>>2]&127](z)|0;continue}else{c[E>>2]=A+1;continue}}v=a[e>>0]|0;if(!(v&1))v=(v&255)>>>1;else v=c[e+4>>2]|0;if(((v|0)!=0?(a[t>>0]|0)!=0:0)?(p=c[q>>2]|0,(p-u|0)<160):0){F=c[r>>2]|0;c[q>>2]=p+4;c[p>>2]=F}h[l>>3]=+Ap(C,c[s>>2]|0,k);hn(e,u,c[q>>2]|0,k);if(!A){if((c[z+12>>2]|0)==(c[z+16>>2]|0)){F=(md[c[(c[z>>2]|0)+36>>2]&127](z)|0)==-1;z=F?0:z}}else z=0;p=(z|0)==0;do if(B){if((c[B+12>>2]|0)!=(c[B+16>>2]|0))if(p)break;else{m=57;break}if((md[c[(c[B>>2]|0)+36>>2]&127](B)|0)!=-1){if(!p)m=57}else m=55}else m=55;while(0);if((m|0)==55?p:0)m=57;if((m|0)==57)c[k>>2]=c[k>>2]|2;c[b>>2]=z;if(a[n>>0]&1)Uq(c[n+8>>2]|0);if(!(a[e>>0]&1)){i=o;return}Uq(c[e+8>>2]|0);i=o;return}function Ak(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;n=i;i=i+240|0;o=n;s=n+204|0;e=n+184|0;m=n+172|0;p=n+168|0;r=n+8|0;t=n+196|0;q=n+200|0;c[e+0>>2]=0;c[e+4>>2]=0;c[e+8>>2]=0;h=c[h+28>>2]|0;B=h+4|0;c[B>>2]=(c[B>>2]|0)+1;B=Sn(h,19072)|0;sd[c[(c[B>>2]|0)+32>>2]&7](B,17600,17626|0,s)|0;B=h+4|0;C=c[B>>2]|0;c[B>>2]=C+ -1;if(!C)jd[c[(c[h>>2]|0)+8>>2]&255](h);c[m+0>>2]=0;c[m+4>>2]=0;c[m+8>>2]=0;Ki(m,10);if(!(a[m>>0]&1)){z=m+1|0;u=z;h=m+8|0}else{z=m+8|0;u=m+1|0;h=z;z=c[z>>2]|0}c[p>>2]=z;c[t>>2]=r;c[q>>2]=0;x=m+4|0;v=c[f>>2]|0;a:while(1){if(v){if((c[v+12>>2]|0)==(c[v+16>>2]|0)?(md[c[(c[v>>2]|0)+36>>2]&127](v)|0)==-1:0){c[f>>2]=0;v=0}}else v=0;w=(v|0)==0;y=c[g>>2]|0;do if(y){if((c[y+12>>2]|0)!=(c[y+16>>2]|0))if(w)break;else break a;if((md[c[(c[y>>2]|0)+36>>2]&127](y)|0)!=-1)if(w)break;else break a;else{c[g>>2]=0;l=21;break}}else l=21;while(0);if((l|0)==21){l=0;if(w){y=0;break}else y=0}C=a[m>>0]|0;B=(C&1)==0;if(B)A=(C&255)>>>1;else A=c[x>>2]|0;if((c[p>>2]|0)==(z+A|0)){if(B)A=(C&255)>>>1;else A=c[x>>2]|0;Ki(m,A<<1);if(!(a[m>>0]&1))z=10;else z=(c[m>>2]&-2)+ -1|0;Ki(m,z);if(!(a[m>>0]&1))z=u;else z=c[h>>2]|0;c[p>>2]=z+A}A=v+12|0;C=c[A>>2]|0;B=v+16|0;if((C|0)==(c[B>>2]|0))C=md[c[(c[v>>2]|0)+36>>2]&127](v)|0;else C=d[C>>0]|0;if(Bk(C&255,16,z,p,q,0,e,r,t,s)|0)break;w=c[A>>2]|0;if((w|0)==(c[B>>2]|0)){md[c[(c[v>>2]|0)+40>>2]&127](v)|0;continue}else{c[A>>2]=w+1;continue}}Ki(m,(c[p>>2]|0)-z|0);if(a[m>>0]&1)u=c[h>>2]|0;C=Dk()|0;c[o>>2]=k;if((Ck(u,C,o)|0)!=1)c[j>>2]=4;if(!w){if((c[v+12>>2]|0)==(c[v+16>>2]|0)?(md[c[(c[v>>2]|0)+36>>2]&127](v)|0)==-1:0){c[f>>2]=0;v=0}}else v=0;k=(v|0)==0;do if(y){if((c[y+12>>2]|0)!=(c[y+16>>2]|0))if(k)break;else{l=64;break}if((md[c[(c[y>>2]|0)+36>>2]&127](y)|0)!=-1)if(k)break;else{l=64;break}else{c[g>>2]=0;l=62;break}}else l=62;while(0);if((l|0)==62?k:0)l=64;if((l|0)==64)c[j>>2]=c[j>>2]|2;c[b>>2]=v;if(a[m>>0]&1)Uq(c[m+8>>2]|0);if(!(a[e>>0]&1)){i=n;return}Uq(c[e+8>>2]|0);i=n;return}function Bk(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0;n=i;p=c[f>>2]|0;o=(p|0)==(e|0);do if(o){q=(a[m+24>>0]|0)==b<<24>>24;if(!q?(a[m+25>>0]|0)!=b<<24>>24:0)break;c[f>>2]=e+1;a[e>>0]=q?43:45;c[g>>2]=0;q=0;i=n;return q|0}while(0);q=a[j>>0]|0;if(!(q&1))j=(q&255)>>>1;else j=c[j+4>>2]|0;if((j|0)!=0?b<<24>>24==h<<24>>24:0){o=c[l>>2]|0;if((o-k|0)>=160){q=0;i=n;return q|0}q=c[g>>2]|0;c[l>>2]=o+4;c[o>>2]=q;c[g>>2]=0;q=0;i=n;return q|0}l=m+26|0;k=m;while(1){if((a[k>>0]|0)==b<<24>>24)break;k=k+1|0;if((k|0)==(l|0)){k=l;break}}m=k-m|0;if((m|0)>23){q=-1;i=n;return q|0}if((d|0)==16){if((m|0)>=22){if(o){q=-1;i=n;return q|0}if((p-e|0)>=3){q=-1;i=n;return q|0}if((a[p+ -1>>0]|0)!=48){q=-1;i=n;return q|0}c[g>>2]=0;q=a[17600+m>>0]|0;c[f>>2]=p+1;a[p>>0]=q;q=0;i=n;return q|0}}else if((d|0)==10|(d|0)==8?(m|0)>=(d|0):0){q=-1;i=n;return q|0}q=a[17600+m>>0]|0;c[f>>2]=p+1;a[p>>0]=q;c[g>>2]=(c[g>>2]|0)+1;q=0;i=n;return q|0}function Ck(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;i=i+16|0;f=e;c[f>>2]=d;b=Yb(b|0)|0;a=Vp(a,17640,f)|0;if(!b){i=e;return a|0}Yb(b|0)|0;i=e;return a|0}function Dk(){var b=0;b=i;if((a[18984]|0)==0?(Fa(18984)|0)!=0:0){c[4744]=rb(2147483647,18992,0)|0;Vc(18984)}i=b;return c[4744]|0}function Ek(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Fk(a){a=a|0;return}function Gk(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;k=i;i=i+64|0;o=k+8|0;p=k+40|0;m=k+44|0;n=k+48|0;r=k+4|0;q=k;l=k+16|0;if(!(c[g+4>>2]&1)){c[m>>2]=-1;l=c[(c[d>>2]|0)+16>>2]|0;c[r>>2]=c[e>>2];c[q>>2]=c[f>>2];c[p+0>>2]=c[r+0>>2];c[o+0>>2]=c[q+0>>2];gd[l&63](n,d,p,o,g,h,m);l=c[n>>2]|0;c[e>>2]=l;e=c[m>>2]|0;if((e|0)==1)a[j>>0]=1;else if(!e)a[j>>0]=0;else{a[j>>0]=1;c[h>>2]=4}c[b>>2]=l;i=k;return}d=g+28|0;n=c[d>>2]|0;m=n+4|0;c[m>>2]=(c[m>>2]|0)+1;m=Sn(n,19064)|0;r=n+4|0;g=c[r>>2]|0;c[r>>2]=g+ -1;if(!g)jd[c[(c[n>>2]|0)+8>>2]&255](n);n=c[d>>2]|0;d=n+4|0;c[d>>2]=(c[d>>2]|0)+1;d=Sn(n,19224)|0;r=n+4|0;g=c[r>>2]|0;c[r>>2]=g+ -1;if(!g)jd[c[(c[n>>2]|0)+8>>2]&255](n);kd[c[(c[d>>2]|0)+24>>2]&63](l,d);g=l+12|0;kd[c[(c[d>>2]|0)+28>>2]&63](g,d);a[j>>0]=(Hk(e,c[f>>2]|0,l,l+24|0,m,h,1)|0)==(l|0)&1;c[b>>2]=c[e>>2];if(a[g>>0]&1)Uq(c[l+20>>2]|0);if(!(a[l>>0]&1)){i=k;return}Uq(c[l+8>>2]|0);i=k;return}function Hk(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;m=i;i=i+112|0;n=m;s=(f-e|0)/12|0;if(s>>>0>100){n=Tq(s)|0;if(!n){x=Wb(4)|0;c[x>>2]=27280;Zc(x|0,27328,220)}else l=n}else l=0;o=(e|0)==(f|0);if(o)r=0;else{p=e;r=0;q=n;while(1){t=a[p>>0]|0;if(!(t&1))t=(t&255)>>>1;else t=c[p+4>>2]|0;if(!t){a[q>>0]=2;r=r+1|0;s=s+ -1|0}else a[q>>0]=1;p=p+12|0;if((p|0)==(f|0))break;else q=q+1|0}}p=0;a:while(1){t=(s|0)!=0;q=p;while(1){p=c[b>>2]|0;do if(p){u=c[p+12>>2]|0;if((u|0)==(c[p+16>>2]|0))p=md[c[(c[p>>2]|0)+36>>2]&127](p)|0;else p=c[u>>2]|0;if((p|0)==-1){c[b>>2]=0;u=1;break}else{u=(c[b>>2]|0)==0;break}}else u=1;while(0);if(!d){p=0;w=1;d=0}else{p=c[d+12>>2]|0;if((p|0)==(c[d+16>>2]|0))p=md[c[(c[d>>2]|0)+36>>2]&127](d)|0;else p=c[p>>2]|0;x=(p|0)==-1;p=x?0:d;w=x?1:0;d=x?0:d}v=c[b>>2]|0;if(!((u^w)&t))break a;p=c[v+12>>2]|0;if((p|0)==(c[v+16>>2]|0))u=md[c[(c[v>>2]|0)+36>>2]&127](v)|0;else u=c[p>>2]|0;if(!j)u=vd[c[(c[g>>2]|0)+28>>2]&63](g,u)|0;p=q+1|0;if(o)q=p;else{w=0;t=e;v=n;break}}while(1){do if((a[v>>0]|0)==1){if(!(a[t>>0]&1))x=t+4|0;else x=c[t+8>>2]|0;x=c[x+(q<<2)>>2]|0;if(!j)x=vd[c[(c[g>>2]|0)+28>>2]&63](g,x)|0;if((u|0)!=(x|0)){a[v>>0]=0;s=s+ -1|0;break}w=a[t>>0]|0;if(!(w&1))w=(w&255)>>>1;else w=c[t+4>>2]|0;if((w|0)==(p|0)){a[v>>0]=2;w=1;r=r+1|0;s=s+ -1|0}else w=1}while(0);t=t+12|0;if((t|0)==(f|0))break;v=v+1|0}if(!w)continue;u=c[b>>2]|0;q=u+12|0;t=c[q>>2]|0;if((t|0)==(c[u+16>>2]|0))md[c[(c[u>>2]|0)+40>>2]&127](u)|0;else c[q>>2]=t+4;if((r+s|0)>>>0<2)continue;else{q=e;t=n}while(1){if((a[t>>0]|0)==2){u=a[q>>0]|0;if(!(u&1))u=(u&255)>>>1;else u=c[q+4>>2]|0;if((u|0)!=(p|0)){a[t>>0]=0;r=r+ -1|0}}q=q+12|0;if((q|0)==(f|0))continue a;else t=t+1|0}}do if(v){j=c[v+12>>2]|0;if((j|0)==(c[v+16>>2]|0))j=md[c[(c[v>>2]|0)+36>>2]&127](v)|0;else j=c[j>>2]|0;if((j|0)==-1){c[b>>2]=0;b=1;break}else{b=(c[b>>2]|0)==0;break}}else b=1;while(0);if(p){j=c[p+12>>2]|0;if((j|0)==(c[p+16>>2]|0))j=md[c[(c[p>>2]|0)+36>>2]&127](p)|0;else j=c[j>>2]|0;if((j|0)!=-1){if(!b)k=75}else k=73}else k=73;if((k|0)==73?b:0)k=75;if((k|0)==75)c[h>>2]=c[h>>2]|2;b:do if(!o)if((a[n>>0]|0)==2)f=e;else while(1){e=e+12|0;n=n+1|0;if((e|0)==(f|0)){k=80;break b}if((a[n>>0]|0)==2){f=e;break}}else k=80;while(0);if((k|0)==80)c[h>>2]=c[h>>2]|4;if(!l){i=m;return f|0}Uq(l);i=m;return f|0}function Ik(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;m=i;i=i+304|0;s=m+160|0;v=m+280|0;l=m+264|0;d=m+284|0;p=m+300|0;r=m;q=m+276|0;o=m+296|0;u=c[e>>2]|0;w=c[f>>2]|0;f=c[g+4>>2]&74;if(!f)f=0;else if((f|0)==8)f=16;else if((f|0)==64)f=8;else f=10;Wk(l,g,s,v);c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;Ki(d,10);if(!(a[d>>0]&1)){x=d+1|0;e=x;t=d+8|0}else{x=d+8|0;e=d+1|0;t=x;x=c[x>>2]|0}c[p>>2]=x;c[q>>2]=r;c[o>>2]=0;g=d+4|0;v=c[v>>2]|0;while(1){if(!u){y=1;u=0}else{y=c[u+12>>2]|0;if((y|0)==(c[u+16>>2]|0))y=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else y=c[y>>2]|0;A=(y|0)==-1;y=A?1:0;u=A?0:u}if(w){z=c[w+12>>2]|0;if((z|0)==(c[w+16>>2]|0))z=md[c[(c[w>>2]|0)+36>>2]&127](w)|0;else z=c[z>>2]|0;if((z|0)!=-1){if(!y)break}else k=20}else k=20;if((k|0)==20){k=0;if(y){w=0;break}else w=0}A=a[d>>0]|0;y=(A&1)==0;if(y)z=(A&255)>>>1;else z=c[g>>2]|0;if((c[p>>2]|0)==(x+z|0)){if(y)y=(A&255)>>>1;else y=c[g>>2]|0;Ki(d,y<<1);if(!(a[d>>0]&1))x=10;else x=(c[d>>2]&-2)+ -1|0;Ki(d,x);if(!(a[d>>0]&1))x=e;else x=c[t>>2]|0;c[p>>2]=x+y}z=u+12|0;A=c[z>>2]|0;y=u+16|0;if((A|0)==(c[y>>2]|0))A=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else A=c[A>>2]|0;if(Sk(A,f,x,p,o,v,l,r,q,s)|0)break;A=c[z>>2]|0;if((A|0)==(c[y>>2]|0)){md[c[(c[u>>2]|0)+40>>2]&127](u)|0;continue}else{c[z>>2]=A+4;continue}}s=a[l>>0]|0;if(!(s&1))s=(s&255)>>>1;else s=c[l+4>>2]|0;if((s|0)!=0?(n=c[q>>2]|0,(n-r|0)<160):0){A=c[o>>2]|0;c[q>>2]=n+4;c[n>>2]=A}c[j>>2]=Ip(x,c[p>>2]|0,h,f)|0;hn(l,r,c[q>>2]|0,h);if(!u){j=0;n=1}else{j=c[u+12>>2]|0;if((j|0)==(c[u+16>>2]|0))j=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else j=c[j>>2]|0;n=(j|0)==-1;j=n?0:u;n=n?1:0}if(w){o=c[w+12>>2]|0;if((o|0)==(c[w+16>>2]|0))o=md[c[(c[w>>2]|0)+36>>2]&127](w)|0;else o=c[o>>2]|0;if((o|0)!=-1){if(!n)k=62}else k=60}else k=60;if((k|0)==60?n:0)k=62;if((k|0)==62)c[h>>2]=c[h>>2]|2;c[b>>2]=j;if(a[d>>0]&1)Uq(c[d+8>>2]|0);if(!(a[l>>0]&1)){i=m;return}Uq(c[l+8>>2]|0);i=m;return}function Jk(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;m=i;i=i+304|0;s=m+160|0;v=m+280|0;l=m+264|0;d=m+284|0;p=m+300|0;r=m;q=m+276|0;o=m+296|0;u=c[e>>2]|0;w=c[f>>2]|0;f=c[g+4>>2]&74;if((f|0)==64)f=8;else if((f|0)==8)f=16;else if(!f)f=0;else f=10;Wk(l,g,s,v);c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;Ki(d,10);if(!(a[d>>0]&1)){x=d+1|0;e=x;t=d+8|0}else{x=d+8|0;e=d+1|0;t=x;x=c[x>>2]|0}c[p>>2]=x;c[q>>2]=r;c[o>>2]=0;g=d+4|0;v=c[v>>2]|0;while(1){if(!u){y=1;u=0}else{y=c[u+12>>2]|0;if((y|0)==(c[u+16>>2]|0))y=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else y=c[y>>2]|0;A=(y|0)==-1;y=A?1:0;u=A?0:u}if(w){z=c[w+12>>2]|0;if((z|0)==(c[w+16>>2]|0))z=md[c[(c[w>>2]|0)+36>>2]&127](w)|0;else z=c[z>>2]|0;if((z|0)!=-1){if(!y)break}else k=20}else k=20;if((k|0)==20){k=0;if(y){w=0;break}else w=0}A=a[d>>0]|0;y=(A&1)==0;if(y)z=(A&255)>>>1;else z=c[g>>2]|0;if((c[p>>2]|0)==(x+z|0)){if(y)y=(A&255)>>>1;else y=c[g>>2]|0;Ki(d,y<<1);if(!(a[d>>0]&1))x=10;else x=(c[d>>2]&-2)+ -1|0;Ki(d,x);if(!(a[d>>0]&1))x=e;else x=c[t>>2]|0;c[p>>2]=x+y}z=u+12|0;A=c[z>>2]|0;y=u+16|0;if((A|0)==(c[y>>2]|0))A=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else A=c[A>>2]|0;if(Sk(A,f,x,p,o,v,l,r,q,s)|0)break;A=c[z>>2]|0;if((A|0)==(c[y>>2]|0)){md[c[(c[u>>2]|0)+40>>2]&127](u)|0;continue}else{c[z>>2]=A+4;continue}}s=a[l>>0]|0;if(!(s&1))s=(s&255)>>>1;else s=c[l+4>>2]|0;if((s|0)!=0?(n=c[q>>2]|0,(n-r|0)<160):0){A=c[o>>2]|0;c[q>>2]=n+4;c[n>>2]=A}z=Hp(x,c[p>>2]|0,h,f)|0;A=j;c[A>>2]=z;c[A+4>>2]=H;hn(l,r,c[q>>2]|0,h);if(!u){j=0;n=1}else{j=c[u+12>>2]|0;if((j|0)==(c[u+16>>2]|0))j=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else j=c[j>>2]|0;n=(j|0)==-1;j=n?0:u;n=n?1:0}if(w){o=c[w+12>>2]|0;if((o|0)==(c[w+16>>2]|0))o=md[c[(c[w>>2]|0)+36>>2]&127](w)|0;else o=c[o>>2]|0;if((o|0)!=-1){if(!n)k=62}else k=60}else k=60;if((k|0)==60?n:0)k=62;if((k|0)==62)c[h>>2]=c[h>>2]|2;c[b>>2]=j;if(a[d>>0]&1)Uq(c[d+8>>2]|0);if(!(a[l>>0]&1)){i=m;return}Uq(c[l+8>>2]|0);i=m;return}function Kk(d,e,f,g,h,j,k){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;n=i;i=i+304|0;t=n+160|0;w=n+280|0;m=n+264|0;e=n+284|0;q=n+300|0;s=n;r=n+276|0;p=n+296|0;v=c[f>>2]|0;x=c[g>>2]|0;g=c[h+4>>2]&74;if((g|0)==8)g=16;else if(!g)g=0;else if((g|0)==64)g=8;else g=10;Wk(m,h,t,w);c[e+0>>2]=0;c[e+4>>2]=0;c[e+8>>2]=0;Ki(e,10);if(!(a[e>>0]&1)){y=e+1|0;f=y;u=e+8|0}else{y=e+8|0;f=e+1|0;u=y;y=c[y>>2]|0}c[q>>2]=y;c[r>>2]=s;c[p>>2]=0;h=e+4|0;w=c[w>>2]|0;while(1){if(!v){z=1;v=0}else{z=c[v+12>>2]|0;if((z|0)==(c[v+16>>2]|0))z=md[c[(c[v>>2]|0)+36>>2]&127](v)|0;else z=c[z>>2]|0;B=(z|0)==-1;z=B?1:0;v=B?0:v}if(x){A=c[x+12>>2]|0;if((A|0)==(c[x+16>>2]|0))A=md[c[(c[x>>2]|0)+36>>2]&127](x)|0;else A=c[A>>2]|0;if((A|0)!=-1){if(!z)break}else l=20}else l=20;if((l|0)==20){l=0;if(z){x=0;break}else x=0}B=a[e>>0]|0;z=(B&1)==0;if(z)A=(B&255)>>>1;else A=c[h>>2]|0;if((c[q>>2]|0)==(y+A|0)){if(z)z=(B&255)>>>1;else z=c[h>>2]|0;Ki(e,z<<1);if(!(a[e>>0]&1))y=10;else y=(c[e>>2]&-2)+ -1|0;Ki(e,y);if(!(a[e>>0]&1))y=f;else y=c[u>>2]|0;c[q>>2]=y+z}A=v+12|0;B=c[A>>2]|0;z=v+16|0;if((B|0)==(c[z>>2]|0))B=md[c[(c[v>>2]|0)+36>>2]&127](v)|0;else B=c[B>>2]|0;if(Sk(B,g,y,q,p,w,m,s,r,t)|0)break;B=c[A>>2]|0;if((B|0)==(c[z>>2]|0)){md[c[(c[v>>2]|0)+40>>2]&127](v)|0;continue}else{c[A>>2]=B+4;continue}}t=a[m>>0]|0;if(!(t&1))t=(t&255)>>>1;else t=c[m+4>>2]|0;if((t|0)!=0?(o=c[r>>2]|0,(o-s|0)<160):0){B=c[p>>2]|0;c[r>>2]=o+4;c[o>>2]=B}b[k>>1]=Gp(y,c[q>>2]|0,j,g)|0;hn(m,s,c[r>>2]|0,j);if(!v){k=0;o=1}else{k=c[v+12>>2]|0;if((k|0)==(c[v+16>>2]|0))k=md[c[(c[v>>2]|0)+36>>2]&127](v)|0;else k=c[k>>2]|0;o=(k|0)==-1;k=o?0:v;o=o?1:0}if(x){p=c[x+12>>2]|0;if((p|0)==(c[x+16>>2]|0))p=md[c[(c[x>>2]|0)+36>>2]&127](x)|0;else p=c[p>>2]|0;if((p|0)!=-1){if(!o)l=62}else l=60}else l=60;if((l|0)==60?o:0)l=62;if((l|0)==62)c[j>>2]=c[j>>2]|2;c[d>>2]=k;if(a[e>>0]&1)Uq(c[e+8>>2]|0);if(!(a[m>>0]&1)){i=n;return}Uq(c[m+8>>2]|0);i=n;return}function Lk(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;m=i;i=i+304|0;s=m+160|0;v=m+280|0;l=m+264|0;d=m+284|0;p=m+300|0;r=m;q=m+276|0;o=m+296|0;u=c[e>>2]|0;w=c[f>>2]|0;f=c[g+4>>2]&74;if((f|0)==64)f=8;else if((f|0)==8)f=16;else if(!f)f=0;else f=10;Wk(l,g,s,v);c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;Ki(d,10);if(!(a[d>>0]&1)){x=d+1|0;e=x;t=d+8|0}else{x=d+8|0;e=d+1|0;t=x;x=c[x>>2]|0}c[p>>2]=x;c[q>>2]=r;c[o>>2]=0;g=d+4|0;v=c[v>>2]|0;while(1){if(!u){y=1;u=0}else{y=c[u+12>>2]|0;if((y|0)==(c[u+16>>2]|0))y=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else y=c[y>>2]|0;A=(y|0)==-1;y=A?1:0;u=A?0:u}if(w){z=c[w+12>>2]|0;if((z|0)==(c[w+16>>2]|0))z=md[c[(c[w>>2]|0)+36>>2]&127](w)|0;else z=c[z>>2]|0;if((z|0)!=-1){if(!y)break}else k=20}else k=20;if((k|0)==20){k=0;if(y){w=0;break}else w=0}A=a[d>>0]|0;y=(A&1)==0;if(y)z=(A&255)>>>1;else z=c[g>>2]|0;if((c[p>>2]|0)==(x+z|0)){if(y)y=(A&255)>>>1;else y=c[g>>2]|0;Ki(d,y<<1);if(!(a[d>>0]&1))x=10;else x=(c[d>>2]&-2)+ -1|0;Ki(d,x);if(!(a[d>>0]&1))x=e;else x=c[t>>2]|0;c[p>>2]=x+y}z=u+12|0;A=c[z>>2]|0;y=u+16|0;if((A|0)==(c[y>>2]|0))A=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else A=c[A>>2]|0;if(Sk(A,f,x,p,o,v,l,r,q,s)|0)break;A=c[z>>2]|0;if((A|0)==(c[y>>2]|0)){md[c[(c[u>>2]|0)+40>>2]&127](u)|0;continue}else{c[z>>2]=A+4;continue}}s=a[l>>0]|0;if(!(s&1))s=(s&255)>>>1;else s=c[l+4>>2]|0;if((s|0)!=0?(n=c[q>>2]|0,(n-r|0)<160):0){A=c[o>>2]|0;c[q>>2]=n+4;c[n>>2]=A}c[j>>2]=Fp(x,c[p>>2]|0,h,f)|0;hn(l,r,c[q>>2]|0,h);if(!u){j=0;n=1}else{j=c[u+12>>2]|0;if((j|0)==(c[u+16>>2]|0))j=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else j=c[j>>2]|0;n=(j|0)==-1;j=n?0:u;n=n?1:0}if(w){o=c[w+12>>2]|0;if((o|0)==(c[w+16>>2]|0))o=md[c[(c[w>>2]|0)+36>>2]&127](w)|0;else o=c[o>>2]|0;if((o|0)!=-1){if(!n)k=62}else k=60}else k=60;if((k|0)==60?n:0)k=62;if((k|0)==62)c[h>>2]=c[h>>2]|2;c[b>>2]=j;if(a[d>>0]&1)Uq(c[d+8>>2]|0);if(!(a[l>>0]&1)){i=m;return}Uq(c[l+8>>2]|0);i=m;return}function Mk(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;m=i;i=i+304|0;s=m+160|0;v=m+280|0;l=m+264|0;d=m+284|0;p=m+300|0;r=m;q=m+276|0;o=m+296|0;u=c[e>>2]|0;w=c[f>>2]|0;f=c[g+4>>2]&74;if((f|0)==8)f=16;else if(!f)f=0;else if((f|0)==64)f=8;else f=10;Wk(l,g,s,v);c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;Ki(d,10);if(!(a[d>>0]&1)){x=d+1|0;e=x;t=d+8|0}else{x=d+8|0;e=d+1|0;t=x;x=c[x>>2]|0}c[p>>2]=x;c[q>>2]=r;c[o>>2]=0;g=d+4|0;v=c[v>>2]|0;while(1){if(!u){y=1;u=0}else{y=c[u+12>>2]|0;if((y|0)==(c[u+16>>2]|0))y=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else y=c[y>>2]|0;A=(y|0)==-1;y=A?1:0;u=A?0:u}if(w){z=c[w+12>>2]|0;if((z|0)==(c[w+16>>2]|0))z=md[c[(c[w>>2]|0)+36>>2]&127](w)|0;else z=c[z>>2]|0;if((z|0)!=-1){if(!y)break}else k=20}else k=20;if((k|0)==20){k=0;if(y){w=0;break}else w=0}A=a[d>>0]|0;y=(A&1)==0;if(y)z=(A&255)>>>1;else z=c[g>>2]|0;if((c[p>>2]|0)==(x+z|0)){if(y)y=(A&255)>>>1;else y=c[g>>2]|0;Ki(d,y<<1);if(!(a[d>>0]&1))x=10;else x=(c[d>>2]&-2)+ -1|0;Ki(d,x);if(!(a[d>>0]&1))x=e;else x=c[t>>2]|0;c[p>>2]=x+y}z=u+12|0;A=c[z>>2]|0;y=u+16|0;if((A|0)==(c[y>>2]|0))A=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else A=c[A>>2]|0;if(Sk(A,f,x,p,o,v,l,r,q,s)|0)break;A=c[z>>2]|0;if((A|0)==(c[y>>2]|0)){md[c[(c[u>>2]|0)+40>>2]&127](u)|0;continue}else{c[z>>2]=A+4;continue}}s=a[l>>0]|0;if(!(s&1))s=(s&255)>>>1;else s=c[l+4>>2]|0;if((s|0)!=0?(n=c[q>>2]|0,(n-r|0)<160):0){A=c[o>>2]|0;c[q>>2]=n+4;c[n>>2]=A}c[j>>2]=Ep(x,c[p>>2]|0,h,f)|0;hn(l,r,c[q>>2]|0,h);if(!u){j=0;n=1}else{j=c[u+12>>2]|0;if((j|0)==(c[u+16>>2]|0))j=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else j=c[j>>2]|0;n=(j|0)==-1;j=n?0:u;n=n?1:0}if(w){o=c[w+12>>2]|0;if((o|0)==(c[w+16>>2]|0))o=md[c[(c[w>>2]|0)+36>>2]&127](w)|0;else o=c[o>>2]|0;if((o|0)!=-1){if(!n)k=62}else k=60}else k=60;if((k|0)==60?n:0)k=62;if((k|0)==62)c[h>>2]=c[h>>2]|2;c[b>>2]=j;if(a[d>>0]&1)Uq(c[d+8>>2]|0);if(!(a[l>>0]&1)){i=m;return}Uq(c[l+8>>2]|0);i=m;return}function Nk(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;m=i;i=i+304|0;s=m+160|0;v=m+280|0;l=m+264|0;d=m+284|0;p=m+300|0;r=m;q=m+276|0;o=m+296|0;u=c[e>>2]|0;w=c[f>>2]|0;f=c[g+4>>2]&74;if((f|0)==64)f=8;else if((f|0)==8)f=16;else if(!f)f=0;else f=10;Wk(l,g,s,v);c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;Ki(d,10);if(!(a[d>>0]&1)){x=d+1|0;e=x;t=d+8|0}else{x=d+8|0;e=d+1|0;t=x;x=c[x>>2]|0}c[p>>2]=x;c[q>>2]=r;c[o>>2]=0;g=d+4|0;v=c[v>>2]|0;while(1){if(!u){y=1;u=0}else{y=c[u+12>>2]|0;if((y|0)==(c[u+16>>2]|0))y=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else y=c[y>>2]|0;A=(y|0)==-1;y=A?1:0;u=A?0:u}if(w){z=c[w+12>>2]|0;if((z|0)==(c[w+16>>2]|0))z=md[c[(c[w>>2]|0)+36>>2]&127](w)|0;else z=c[z>>2]|0;if((z|0)!=-1){if(!y)break}else k=20}else k=20;if((k|0)==20){k=0;if(y){w=0;break}else w=0}A=a[d>>0]|0;y=(A&1)==0;if(y)z=(A&255)>>>1;else z=c[g>>2]|0;if((c[p>>2]|0)==(x+z|0)){if(y)y=(A&255)>>>1;else y=c[g>>2]|0;Ki(d,y<<1);if(!(a[d>>0]&1))x=10;else x=(c[d>>2]&-2)+ -1|0;Ki(d,x);if(!(a[d>>0]&1))x=e;else x=c[t>>2]|0;c[p>>2]=x+y}z=u+12|0;A=c[z>>2]|0;y=u+16|0;if((A|0)==(c[y>>2]|0))A=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else A=c[A>>2]|0;if(Sk(A,f,x,p,o,v,l,r,q,s)|0)break;A=c[z>>2]|0;if((A|0)==(c[y>>2]|0)){md[c[(c[u>>2]|0)+40>>2]&127](u)|0;continue}else{c[z>>2]=A+4;continue}}s=a[l>>0]|0;if(!(s&1))s=(s&255)>>>1;else s=c[l+4>>2]|0;if((s|0)!=0?(n=c[q>>2]|0,(n-r|0)<160):0){A=c[o>>2]|0;c[q>>2]=n+4;c[n>>2]=A}z=Dp(x,c[p>>2]|0,h,f)|0;A=j;c[A>>2]=z;c[A+4>>2]=H;hn(l,r,c[q>>2]|0,h);if(!u){j=0;n=1}else{j=c[u+12>>2]|0;if((j|0)==(c[u+16>>2]|0))j=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else j=c[j>>2]|0;n=(j|0)==-1;j=n?0:u;n=n?1:0}if(w){o=c[w+12>>2]|0;if((o|0)==(c[w+16>>2]|0))o=md[c[(c[w>>2]|0)+36>>2]&127](w)|0;else o=c[o>>2]|0;if((o|0)!=-1){if(!n)k=62}else k=60}else k=60;if((k|0)==60?n:0)k=62;if((k|0)==62)c[h>>2]=c[h>>2]|2;c[b>>2]=j;if(a[d>>0]&1)Uq(c[d+8>>2]|0);if(!(a[l>>0]&1)){i=m;return}Uq(c[l+8>>2]|0);i=m;return}function Ok(b,d,e,f,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;m=i;i=i+352|0;v=m+208|0;w=m+184|0;x=m+4|0;n=m+8|0;d=m+196|0;p=m;t=m+24|0;s=m+192|0;r=m+188|0;q=m+337|0;u=m+336|0;y=c[e>>2]|0;z=c[f>>2]|0;Xk(n,h,v,w,x);c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;Ki(d,10);if(!(a[d>>0]&1)){A=d+1|0;f=A;h=d+8|0}else{A=d+8|0;f=d+1|0;h=A;A=c[A>>2]|0}c[p>>2]=A;c[s>>2]=t;c[r>>2]=0;a[q>>0]=1;a[u>>0]=69;e=d+4|0;w=c[w>>2]|0;x=c[x>>2]|0;while(1){if(!y){B=1;y=0}else{B=c[y+12>>2]|0;if((B|0)==(c[y+16>>2]|0))B=md[c[(c[y>>2]|0)+36>>2]&127](y)|0;else B=c[B>>2]|0;D=(B|0)==-1;B=D?1:0;y=D?0:y}if(z){C=c[z+12>>2]|0;if((C|0)==(c[z+16>>2]|0))C=md[c[(c[z>>2]|0)+36>>2]&127](z)|0;else C=c[C>>2]|0;if((C|0)!=-1){if(!B)break}else l=16}else l=16;if((l|0)==16){l=0;if(B){z=0;break}else z=0}D=a[d>>0]|0;B=(D&1)==0;if(B)C=(D&255)>>>1;else C=c[e>>2]|0;if((c[p>>2]|0)==(A+C|0)){if(B)B=(D&255)>>>1;else B=c[e>>2]|0;Ki(d,B<<1);if(!(a[d>>0]&1))A=10;else A=(c[d>>2]&-2)+ -1|0;Ki(d,A);if(!(a[d>>0]&1))A=f;else A=c[h>>2]|0;c[p>>2]=A+B}C=y+12|0;D=c[C>>2]|0;B=y+16|0;if((D|0)==(c[B>>2]|0))D=md[c[(c[y>>2]|0)+36>>2]&127](y)|0;else D=c[D>>2]|0;if(Yk(D,q,u,A,p,w,x,n,t,s,r,v)|0)break;D=c[C>>2]|0;if((D|0)==(c[B>>2]|0)){md[c[(c[y>>2]|0)+40>>2]&127](y)|0;continue}else{c[C>>2]=D+4;continue}}u=a[n>>0]|0;if(!(u&1))u=(u&255)>>>1;else u=c[n+4>>2]|0;if(((u|0)!=0?(a[q>>0]|0)!=0:0)?(o=c[s>>2]|0,(o-t|0)<160):0){D=c[r>>2]|0;c[s>>2]=o+4;c[o>>2]=D}g[k>>2]=+Cp(A,c[p>>2]|0,j);hn(n,t,c[s>>2]|0,j);if(!y){k=0;o=1}else{k=c[y+12>>2]|0;if((k|0)==(c[y+16>>2]|0))k=md[c[(c[y>>2]|0)+36>>2]&127](y)|0;else k=c[k>>2]|0;o=(k|0)==-1;k=o?0:y;o=o?1:0}if(z){p=c[z+12>>2]|0;if((p|0)==(c[z+16>>2]|0))p=md[c[(c[z>>2]|0)+36>>2]&127](z)|0;else p=c[p>>2]|0;if((p|0)!=-1){if(!o)l=59}else l=57}else l=57;if((l|0)==57?o:0)l=59;if((l|0)==59)c[j>>2]=c[j>>2]|2;c[b>>2]=k;if(a[d>>0]&1)Uq(c[d+8>>2]|0);if(!(a[n>>0]&1)){i=m;return}Uq(c[n+8>>2]|0);i=m;return}function Pk(b,d,e,f,g,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;m=i;i=i+352|0;v=m+208|0;w=m+184|0;x=m+4|0;n=m+8|0;d=m+196|0;p=m;t=m+24|0;s=m+192|0;r=m+188|0;q=m+337|0;u=m+336|0;y=c[e>>2]|0;z=c[f>>2]|0;Xk(n,g,v,w,x);c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;Ki(d,10);if(!(a[d>>0]&1)){A=d+1|0;f=A;g=d+8|0}else{A=d+8|0;f=d+1|0;g=A;A=c[A>>2]|0}c[p>>2]=A;c[s>>2]=t;c[r>>2]=0;a[q>>0]=1;a[u>>0]=69;e=d+4|0;w=c[w>>2]|0;x=c[x>>2]|0;while(1){if(!y){B=1;y=0}else{B=c[y+12>>2]|0;if((B|0)==(c[y+16>>2]|0))B=md[c[(c[y>>2]|0)+36>>2]&127](y)|0;else B=c[B>>2]|0;D=(B|0)==-1;B=D?1:0;y=D?0:y}if(z){C=c[z+12>>2]|0;if((C|0)==(c[z+16>>2]|0))C=md[c[(c[z>>2]|0)+36>>2]&127](z)|0;else C=c[C>>2]|0;if((C|0)!=-1){if(!B)break}else l=16}else l=16;if((l|0)==16){l=0;if(B){z=0;break}else z=0}D=a[d>>0]|0;B=(D&1)==0;if(B)C=(D&255)>>>1;else C=c[e>>2]|0;if((c[p>>2]|0)==(A+C|0)){if(B)B=(D&255)>>>1;else B=c[e>>2]|0;Ki(d,B<<1);if(!(a[d>>0]&1))A=10;else A=(c[d>>2]&-2)+ -1|0;Ki(d,A);if(!(a[d>>0]&1))A=f;else A=c[g>>2]|0;c[p>>2]=A+B}C=y+12|0;D=c[C>>2]|0;B=y+16|0;if((D|0)==(c[B>>2]|0))D=md[c[(c[y>>2]|0)+36>>2]&127](y)|0;else D=c[D>>2]|0;if(Yk(D,q,u,A,p,w,x,n,t,s,r,v)|0)break;D=c[C>>2]|0;if((D|0)==(c[B>>2]|0)){md[c[(c[y>>2]|0)+40>>2]&127](y)|0;continue}else{c[C>>2]=D+4;continue}}u=a[n>>0]|0;if(!(u&1))u=(u&255)>>>1;else u=c[n+4>>2]|0;if(((u|0)!=0?(a[q>>0]|0)!=0:0)?(o=c[s>>2]|0,(o-t|0)<160):0){D=c[r>>2]|0;c[s>>2]=o+4;c[o>>2]=D}h[k>>3]=+Bp(A,c[p>>2]|0,j);hn(n,t,c[s>>2]|0,j);if(!y){k=0;o=1}else{k=c[y+12>>2]|0;if((k|0)==(c[y+16>>2]|0))k=md[c[(c[y>>2]|0)+36>>2]&127](y)|0;else k=c[k>>2]|0;o=(k|0)==-1;k=o?0:y;o=o?1:0}if(z){p=c[z+12>>2]|0;if((p|0)==(c[z+16>>2]|0))p=md[c[(c[z>>2]|0)+36>>2]&127](z)|0;else p=c[p>>2]|0;if((p|0)!=-1){if(!o)l=59}else l=57}else l=57;if((l|0)==57?o:0)l=59;if((l|0)==59)c[j>>2]=c[j>>2]|2;c[b>>2]=k;if(a[d>>0]&1)Uq(c[d+8>>2]|0);if(!(a[n>>0]&1)){i=m;return}Uq(c[n+8>>2]|0);i=m;return}function Qk(b,d,e,f,g,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;m=i;i=i+352|0;v=m+208|0;w=m+184|0;x=m+4|0;n=m+8|0;d=m+196|0;p=m;t=m+24|0;s=m+192|0;r=m+188|0;q=m+337|0;u=m+336|0;y=c[e>>2]|0;z=c[f>>2]|0;Xk(n,g,v,w,x);c[d+0>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;Ki(d,10);if(!(a[d>>0]&1)){A=d+1|0;f=A;g=d+8|0}else{A=d+8|0;f=d+1|0;g=A;A=c[A>>2]|0}c[p>>2]=A;c[s>>2]=t;c[r>>2]=0;a[q>>0]=1;a[u>>0]=69;e=d+4|0;w=c[w>>2]|0;x=c[x>>2]|0;while(1){if(!y){B=1;y=0}else{B=c[y+12>>2]|0;if((B|0)==(c[y+16>>2]|0))B=md[c[(c[y>>2]|0)+36>>2]&127](y)|0;else B=c[B>>2]|0;D=(B|0)==-1;B=D?1:0;y=D?0:y}if(z){C=c[z+12>>2]|0;if((C|0)==(c[z+16>>2]|0))C=md[c[(c[z>>2]|0)+36>>2]&127](z)|0;else C=c[C>>2]|0;if((C|0)!=-1){if(!B)break}else l=16}else l=16;if((l|0)==16){l=0;if(B){z=0;break}else z=0}D=a[d>>0]|0;B=(D&1)==0;if(B)C=(D&255)>>>1;else C=c[e>>2]|0;if((c[p>>2]|0)==(A+C|0)){if(B)B=(D&255)>>>1;else B=c[e>>2]|0;Ki(d,B<<1);if(!(a[d>>0]&1))A=10;else A=(c[d>>2]&-2)+ -1|0;Ki(d,A);if(!(a[d>>0]&1))A=f;else A=c[g>>2]|0;c[p>>2]=A+B}C=y+12|0;D=c[C>>2]|0;B=y+16|0;if((D|0)==(c[B>>2]|0))D=md[c[(c[y>>2]|0)+36>>2]&127](y)|0;else D=c[D>>2]|0;if(Yk(D,q,u,A,p,w,x,n,t,s,r,v)|0)break;D=c[C>>2]|0;if((D|0)==(c[B>>2]|0)){md[c[(c[y>>2]|0)+40>>2]&127](y)|0;continue}else{c[C>>2]=D+4;continue}}u=a[n>>0]|0;if(!(u&1))u=(u&255)>>>1;else u=c[n+4>>2]|0;if(((u|0)!=0?(a[q>>0]|0)!=0:0)?(o=c[s>>2]|0,(o-t|0)<160):0){D=c[r>>2]|0;c[s>>2]=o+4;c[o>>2]=D}h[k>>3]=+Ap(A,c[p>>2]|0,j);hn(n,t,c[s>>2]|0,j);if(!y){k=0;o=1}else{k=c[y+12>>2]|0;if((k|0)==(c[y+16>>2]|0))k=md[c[(c[y>>2]|0)+36>>2]&127](y)|0;else k=c[k>>2]|0;o=(k|0)==-1;k=o?0:y;o=o?1:0}if(z){p=c[z+12>>2]|0;if((p|0)==(c[z+16>>2]|0))p=md[c[(c[z>>2]|0)+36>>2]&127](z)|0;else p=c[p>>2]|0;if((p|0)!=-1){if(!o)l=59}else l=57}else l=57;if((l|0)==57?o:0)l=59;if((l|0)==59)c[j>>2]=c[j>>2]|2;c[b>>2]=k;if(a[d>>0]&1)Uq(c[d+8>>2]|0);if(!(a[n>>0]&1)){i=m;return}Uq(c[n+8>>2]|0);i=m;return}function Rk(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;d=i;i=i+320|0;n=d;p=d+168|0;l=d+288|0;m=d+276|0;o=d+300|0;q=d+8|0;s=d+272|0;r=d+304|0;c[l+0>>2]=0;c[l+4>>2]=0;c[l+8>>2]=0;g=c[g+28>>2]|0;z=g+4|0;c[z>>2]=(c[z>>2]|0)+1;z=Sn(g,19064)|0;sd[c[(c[z>>2]|0)+48>>2]&7](z,17600,17626|0,p)|0;z=g+4|0;A=c[z>>2]|0;c[z>>2]=A+ -1;if(!A)jd[c[(c[g>>2]|0)+8>>2]&255](g);c[m+0>>2]=0;c[m+4>>2]=0;c[m+8>>2]=0;Ki(m,10);if(!(a[m>>0]&1)){w=m+1|0;g=w;t=m+8|0}else{w=m+8|0;g=m+1|0;t=w;w=c[w>>2]|0}c[o>>2]=w;c[s>>2]=q;c[r>>2]=0;v=m+4|0;u=c[e>>2]|0;a:while(1){if(u){x=c[u+12>>2]|0;if((x|0)==(c[u+16>>2]|0))x=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else x=c[x>>2]|0;if((x|0)==-1){c[e>>2]=0;y=1;u=0}else y=0}else{y=1;u=0}x=c[f>>2]|0;do if(x){z=c[x+12>>2]|0;if((z|0)==(c[x+16>>2]|0))z=md[c[(c[x>>2]|0)+36>>2]&127](x)|0;else z=c[z>>2]|0;if((z|0)!=-1)if(y)break;else break a;else{c[f>>2]=0;k=22;break}}else k=22;while(0);if((k|0)==22){k=0;if(y){x=0;break}else x=0}A=a[m>>0]|0;z=(A&1)==0;if(z)y=(A&255)>>>1;else y=c[v>>2]|0;if((c[o>>2]|0)==(w+y|0)){if(z)y=(A&255)>>>1;else y=c[v>>2]|0;Ki(m,y<<1);if(!(a[m>>0]&1))w=10;else w=(c[m>>2]&-2)+ -1|0;Ki(m,w);if(!(a[m>>0]&1))w=g;else w=c[t>>2]|0;c[o>>2]=w+y}z=u+12|0;A=c[z>>2]|0;y=u+16|0;if((A|0)==(c[y>>2]|0))A=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else A=c[A>>2]|0;if(Sk(A,16,w,o,r,0,l,q,s,p)|0)break;x=c[z>>2]|0;if((x|0)==(c[y>>2]|0)){md[c[(c[u>>2]|0)+40>>2]&127](u)|0;continue}else{c[z>>2]=x+4;continue}}Ki(m,(c[o>>2]|0)-w|0);if(a[m>>0]&1)g=c[t>>2]|0;A=Dk()|0;c[n>>2]=j;if((Ck(g,A,n)|0)!=1)c[h>>2]=4;if(u){j=c[u+12>>2]|0;if((j|0)==(c[u+16>>2]|0))j=md[c[(c[u>>2]|0)+36>>2]&127](u)|0;else j=c[j>>2]|0;if((j|0)==-1){c[e>>2]=0;u=0;e=1}else e=0}else{u=0;e=1}do if(x){j=c[x+12>>2]|0;if((j|0)==(c[x+16>>2]|0))j=md[c[(c[x>>2]|0)+36>>2]&127](x)|0;else j=c[j>>2]|0;if((j|0)!=-1)if(e)break;else{k=66;break}else{c[f>>2]=0;k=64;break}}else k=64;while(0);if((k|0)==64?e:0)k=66;if((k|0)==66)c[h>>2]=c[h>>2]|2;c[b>>2]=u;if(a[m>>0]&1)Uq(c[m+8>>2]|0);if(!(a[l>>0]&1)){i=d;return}Uq(c[l+8>>2]|0);i=d;return}function Sk(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0;n=i;p=c[f>>2]|0;o=(p|0)==(e|0);do if(o){q=(c[m+96>>2]|0)==(b|0);if(!q?(c[m+100>>2]|0)!=(b|0):0)break;c[f>>2]=e+1;a[e>>0]=q?43:45;c[g>>2]=0;q=0;i=n;return q|0}while(0);q=a[j>>0]|0;if(!(q&1))j=(q&255)>>>1;else j=c[j+4>>2]|0;if((j|0)!=0&(b|0)==(h|0)){o=c[l>>2]|0;if((o-k|0)>=160){q=0;i=n;return q|0}q=c[g>>2]|0;c[l>>2]=o+4;c[o>>2]=q;c[g>>2]=0;q=0;i=n;return q|0}l=m+104|0;k=m;while(1){if((c[k>>2]|0)==(b|0))break;k=k+4|0;if((k|0)==(l|0)){k=l;break}}b=k-m|0;m=b>>2;if((b|0)>92){q=-1;i=n;return q|0}if((d|0)==10|(d|0)==8){if((m|0)>=(d|0)){q=-1;i=n;return q|0}}else if((d|0)==16?(b|0)>=88:0){if(o){q=-1;i=n;return q|0}if((p-e|0)>=3){q=-1;i=n;return q|0}if((a[p+ -1>>0]|0)!=48){q=-1;i=n;return q|0}c[g>>2]=0;q=a[17600+m>>0]|0;c[f>>2]=p+1;a[p>>0]=q;q=0;i=n;return q|0}q=a[17600+m>>0]|0;c[f>>2]=p+1;a[p>>0]=q;c[g>>2]=(c[g>>2]|0)+1;q=0;i=n;return q|0}function Tk(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;d=c[d+28>>2]|0;h=d+4|0;c[h>>2]=(c[h>>2]|0)+1;h=Sn(d,19072)|0;sd[c[(c[h>>2]|0)+32>>2]&7](h,17600,17626|0,e)|0;e=Sn(d,19216)|0;a[f>>0]=md[c[(c[e>>2]|0)+16>>2]&127](e)|0;kd[c[(c[e>>2]|0)+20>>2]&63](b,e);f=d+4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if(e){i=g;return}jd[c[(c[d>>2]|0)+8>>2]&255](d);i=g;return}function Uk(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;h=i;d=c[d+28>>2]|0;j=d+4|0;c[j>>2]=(c[j>>2]|0)+1;j=Sn(d,19072)|0;sd[c[(c[j>>2]|0)+32>>2]&7](j,17600,17632|0,e)|0;e=Sn(d,19216)|0;a[f>>0]=md[c[(c[e>>2]|0)+12>>2]&127](e)|0;a[g>>0]=md[c[(c[e>>2]|0)+16>>2]&127](e)|0;kd[c[(c[e>>2]|0)+20>>2]&63](b,e);f=d+4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if(e){i=h;return}jd[c[(c[d>>2]|0)+8>>2]&255](d);i=h;return}function Vk(b,e,f,g,h,j,k,l,m,n,o,p){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;var q=0,r=0;q=i;if(b<<24>>24==j<<24>>24){if(!(a[e>>0]|0)){k=-1;i=q;return k|0}a[e>>0]=0;k=c[h>>2]|0;c[h>>2]=k+1;a[k>>0]=46;h=a[l>>0]|0;if(!(h&1))h=(h&255)>>>1;else h=c[l+4>>2]|0;if(!h){k=0;i=q;return k|0}h=c[n>>2]|0;if((h-m|0)>=160){k=0;i=q;return k|0}k=c[o>>2]|0;c[n>>2]=h+4;c[h>>2]=k;k=0;i=q;return k|0}if(b<<24>>24==k<<24>>24){j=a[l>>0]|0;if(!(j&1))j=(j&255)>>>1;else j=c[l+4>>2]|0;if(j){if(!(a[e>>0]|0)){k=-1;i=q;return k|0}h=c[n>>2]|0;if((h-m|0)>=160){k=0;i=q;return k|0}k=c[o>>2]|0;c[n>>2]=h+4;c[h>>2]=k;c[o>>2]=0;k=0;i=q;return k|0}}j=p+32|0;k=p;do{if((a[k>>0]|0)==b<<24>>24){j=k;break}k=k+1|0}while((k|0)!=(j|0));b=j-p|0;if((b|0)>31){k=-1;i=q;return k|0}p=a[17600+b>>0]|0;if((b|0)==23|(b|0)==22){a[f>>0]=80;k=c[h>>2]|0;c[h>>2]=k+1;a[k>>0]=p;k=0;i=q;return k|0}else if((b|0)==24|(b|0)==25){o=c[h>>2]|0;if((o|0)!=(g|0)?(d[o+ -1>>0]&95|0)!=(d[f>>0]&127|0):0){k=-1;i=q;return k|0}c[h>>2]=o+1;a[o>>0]=p;k=0;i=q;return k|0}else{g=p&95;if((g|0)==(a[f>>0]|0)?(a[f>>0]=g|128,(a[e>>0]|0)!=0):0){a[e>>0]=0;f=a[l>>0]|0;if(!(f&1))l=(f&255)>>>1;else l=c[l+4>>2]|0;if((l|0)!=0?(r=c[n>>2]|0,(r-m|0)<160):0){k=c[o>>2]|0;c[n>>2]=r+4;c[r>>2]=k}}k=c[h>>2]|0;c[h>>2]=k+1;a[k>>0]=p;if((b|0)>21){k=0;i=q;return k|0}c[o>>2]=(c[o>>2]|0)+1;k=0;i=q;return k|0}return 0}function Wk(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;b=c[b+28>>2]|0;g=b+4|0;c[g>>2]=(c[g>>2]|0)+1;g=Sn(b,19064)|0;sd[c[(c[g>>2]|0)+48>>2]&7](g,17600,17626|0,d)|0;d=Sn(b,19224)|0;c[e>>2]=md[c[(c[d>>2]|0)+16>>2]&127](d)|0;kd[c[(c[d>>2]|0)+20>>2]&63](a,d);e=b+4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if(d){i=f;return}jd[c[(c[b>>2]|0)+8>>2]&255](b);i=f;return}function Xk(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;b=c[b+28>>2]|0;h=b+4|0;c[h>>2]=(c[h>>2]|0)+1;h=Sn(b,19064)|0;sd[c[(c[h>>2]|0)+48>>2]&7](h,17600,17632|0,d)|0;d=Sn(b,19224)|0;c[e>>2]=md[c[(c[d>>2]|0)+12>>2]&127](d)|0;c[f>>2]=md[c[(c[d>>2]|0)+16>>2]&127](d)|0;kd[c[(c[d>>2]|0)+20>>2]&63](a,d);e=b+4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if(d){i=g;return}jd[c[(c[b>>2]|0)+8>>2]&255](b);i=g;return}function Yk(b,e,f,g,h,j,k,l,m,n,o,p){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;var q=0,r=0;q=i;if((b|0)==(j|0)){if(!(a[e>>0]|0)){k=-1;i=q;return k|0}a[e>>0]=0;k=c[h>>2]|0;c[h>>2]=k+1;a[k>>0]=46;h=a[l>>0]|0;if(!(h&1))h=(h&255)>>>1;else h=c[l+4>>2]|0;if(!h){k=0;i=q;return k|0}h=c[n>>2]|0;if((h-m|0)>=160){k=0;i=q;return k|0}k=c[o>>2]|0;c[n>>2]=h+4;c[h>>2]=k;k=0;i=q;return k|0}if((b|0)==(k|0)){j=a[l>>0]|0;if(!(j&1))j=(j&255)>>>1;else j=c[l+4>>2]|0;if(j){if(!(a[e>>0]|0)){k=-1;i=q;return k|0}h=c[n>>2]|0;if((h-m|0)>=160){k=0;i=q;return k|0}k=c[o>>2]|0;c[n>>2]=h+4;c[h>>2]=k;c[o>>2]=0;k=0;i=q;return k|0}}j=p+128|0;k=p;do{if((c[k>>2]|0)==(b|0)){j=k;break}k=k+4|0}while((k|0)!=(j|0));b=j-p|0;j=b>>2;if((b|0)>124){k=-1;i=q;return k|0}p=a[17600+j>>0]|0;if((j|0)==23|(j|0)==22)a[f>>0]=80;else if(!((j|0)==24|(j|0)==25)){g=p&95;if((g|0)==(a[f>>0]|0)?(a[f>>0]=g|128,(a[e>>0]|0)!=0):0){a[e>>0]=0;f=a[l>>0]|0;if(!(f&1))l=(f&255)>>>1;else l=c[l+4>>2]|0;if((l|0)!=0?(r=c[n>>2]|0,(r-m|0)<160):0){k=c[o>>2]|0;c[n>>2]=r+4;c[r>>2]=k}}}else{o=c[h>>2]|0;if((o|0)!=(g|0)?(d[o+ -1>>0]&95|0)!=(d[f>>0]&127|0):0){k=-1;i=q;return k|0}c[h>>2]=o+1;a[o>>0]=p;k=0;i=q;return k|0}k=c[h>>2]|0;c[h>>2]=k+1;a[k>>0]=p;if((b|0)>84){k=0;i=q;return k|0}c[o>>2]=(c[o>>2]|0)+1;k=0;i=q;return k|0}function Zk(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function _k(a){a=a|0;return}function $k(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0;j=i;i=i+32|0;l=j+16|0;m=j+12|0;k=j;if(!(c[f+4>>2]&1)){n=c[(c[d>>2]|0)+24>>2]|0;c[m>>2]=c[e>>2];o=h&1;c[l+0>>2]=c[m+0>>2];ud[n&31](b,d,l,f,g,o);i=j;return}l=c[f+28>>2]|0;d=l+4|0;c[d>>2]=(c[d>>2]|0)+1;d=Sn(l,19216)|0;n=l+4|0;o=c[n>>2]|0;c[n>>2]=o+ -1;if(!o)jd[c[(c[l>>2]|0)+8>>2]&255](l);l=c[d>>2]|0;if(h)kd[c[l+24>>2]&63](k,d);else kd[c[l+28>>2]&63](k,d);g=a[k>>0]|0;if(!(g&1)){h=k+1|0;m=h;d=k+8|0}else{d=k+8|0;m=c[d>>2]|0;h=k+1|0}l=k+4|0;while(1){f=(g&1)==0;if(f){n=h;g=(g&255)>>>1}else{n=c[d>>2]|0;g=c[l>>2]|0}if((m|0)==(n+g|0))break;n=a[m>>0]|0;f=c[e>>2]|0;do if(f){o=f+24|0;g=c[o>>2]|0;if((g|0)!=(c[f+28>>2]|0)){c[o>>2]=g+1;a[g>>0]=n;break}if((vd[c[(c[f>>2]|0)+52>>2]&63](f,n&255)|0)==-1)c[e>>2]=0}while(0);g=a[k>>0]|0;m=m+1|0}c[b>>2]=c[e>>2];if(f){i=j;return}Uq(c[k+8>>2]|0);i=j;return}function al(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;l=i;i=i+64|0;p=l;r=l+16|0;n=l+24|0;d=l+36|0;m=l+8|0;k=l+4|0;o=l+12|0;a[r+0>>0]=a[17880]|0;a[r+1>>0]=a[17881]|0;a[r+2>>0]=a[17882]|0;a[r+3>>0]=a[17883]|0;a[r+4>>0]=a[17884]|0;a[r+5>>0]=a[17885]|0;q=f+4|0;bl(r+1|0,17784,1,c[q>>2]|0);s=Dk()|0;c[p>>2]=h;p=cl(n,12,s,r,p)|0;h=n+p|0;q=c[q>>2]&176;do if((q|0)==16){q=a[n>>0]|0;if(q<<24>>24==43|q<<24>>24==45){p=n+1|0;break}if((p|0)>1&q<<24>>24==48?(s=a[n+1>>0]|0,s<<24>>24==88|s<<24>>24==120):0)p=n+2|0;else j=7}else if((q|0)==32)p=h;else j=7;while(0);if((j|0)==7)p=n;j=c[f+28>>2]|0;c[o>>2]=j;j=j+4|0;c[j>>2]=(c[j>>2]|0)+1;dl(n,p,h,d,m,k,o);j=c[o>>2]|0;r=j+4|0;s=c[r>>2]|0;c[r>>2]=s+ -1;if(s){q=c[e>>2]|0;r=c[m>>2]|0;s=c[k>>2]|0;Sg(b,q,d,r,s,f,g);i=l;return}jd[c[(c[j>>2]|0)+8>>2]&255](j);q=c[e>>2]|0;r=c[m>>2]|0;s=c[k>>2]|0;Sg(b,q,d,r,s,f,g);i=l;return}function bl(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;if(e&2048){a[b>>0]=43;b=b+1|0}if(e&512){a[b>>0]=35;b=b+1|0}g=a[c>>0]|0;if(g<<24>>24)while(1){c=c+1|0;h=b+1|0;a[b>>0]=g;g=a[c>>0]|0;if(!(g<<24>>24)){b=h;break}else b=h}c=e&74;if((c|0)==64){a[b>>0]=111;i=f;return}else if((c|0)==8)if(!(e&16384)){a[b>>0]=120;i=f;return}else{a[b>>0]=88;i=f;return}else if(d){a[b>>0]=100;i=f;return}else{a[b>>0]=117;i=f;return}}function cl(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;i=i+16|0;h=g;c[h>>2]=f;d=Yb(d|0)|0;e=fr(a,b,e,h)|0;if(!d){i=g;return e|0}Yb(d|0)|0;i=g;return e|0}function dl(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;l=i;i=i+16|0;k=l;n=Sn(c[j>>2]|0,19072)|0;o=Sn(c[j>>2]|0,19216)|0;kd[c[(c[o>>2]|0)+20>>2]&63](k,o);j=a[k>>0]|0;if(!(j&1))j=(j&255)>>>1;else j=c[k+4>>2]|0;if(j){c[h>>2]=f;j=a[b>>0]|0;if(j<<24>>24==43|j<<24>>24==45){v=vd[c[(c[n>>2]|0)+28>>2]&63](n,j)|0;j=c[h>>2]|0;c[h>>2]=j+1;a[j>>0]=v;j=b+1|0}else j=b;if(((e-j|0)>1?(a[j>>0]|0)==48:0)?(q=j+1|0,v=a[q>>0]|0,v<<24>>24==88|v<<24>>24==120):0){v=vd[c[(c[n>>2]|0)+28>>2]&63](n,48)|0;u=c[h>>2]|0;c[h>>2]=u+1;a[u>>0]=v;u=vd[c[(c[n>>2]|0)+28>>2]&63](n,a[q>>0]|0)|0;v=c[h>>2]|0;c[h>>2]=v+1;a[v>>0]=u;j=j+2|0}if((j|0)!=(e|0)?(p=e+ -1|0,p>>>0>j>>>0):0){q=j;do{v=a[q>>0]|0;a[q>>0]=a[p>>0]|0;a[p>>0]=v;q=q+1|0;p=p+ -1|0}while(q>>>0<p>>>0)}s=md[c[(c[o>>2]|0)+16>>2]&127](o)|0;if(j>>>0<e>>>0){o=k+1|0;r=k+4|0;p=k+8|0;u=0;t=0;q=j;while(1){v=a[((a[k>>0]&1)==0?o:c[p>>2]|0)+t>>0]|0;if(v<<24>>24!=0&(u|0)==(v<<24>>24|0)){u=c[h>>2]|0;c[h>>2]=u+1;a[u>>0]=s;u=a[k>>0]|0;if(!(u&1))v=(u&255)>>>1;else v=c[r>>2]|0;u=0;t=(t>>>0<(v+ -1|0)>>>0&1)+t|0}w=vd[c[(c[n>>2]|0)+28>>2]&63](n,a[q>>0]|0)|0;v=c[h>>2]|0;c[h>>2]=v+1;a[v>>0]=w;q=q+1|0;if(q>>>0>=e>>>0)break;else u=u+1|0}}j=f+(j-b)|0;n=c[h>>2]|0;if((j|0)!=(n|0)?(m=n+ -1|0,m>>>0>j>>>0):0)do{w=a[j>>0]|0;a[j>>0]=a[m>>0]|0;a[m>>0]=w;j=j+1|0;m=m+ -1|0}while(j>>>0<m>>>0)}else{sd[c[(c[n>>2]|0)+32>>2]&7](n,b,e,f)|0;c[h>>2]=f+(e-b)}if((d|0)==(e|0))f=c[h>>2]|0;else f=f+(d-b)|0;c[g>>2]=f;if(!(a[k>>0]&1)){i=l;return}Uq(c[k+8>>2]|0);i=l;return}function el(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;k=i;i=i+96|0;m=k+8|0;r=k;p=k+64|0;n=k+60|0;d=k+56|0;o=k+52|0;q=r;c[q>>2]=37;c[q+4>>2]=0;q=f+4|0;bl(r+1|0,17792,1,c[q>>2]|0);s=Dk()|0;t=m;c[t>>2]=h;c[t+4>>2]=j;h=cl(p,22,s,r,m)|0;j=p+h|0;q=c[q>>2]&176;do if((q|0)==32)h=j;else if((q|0)==16){q=a[p>>0]|0;if(q<<24>>24==43|q<<24>>24==45){h=p+1|0;break}if((h|0)>1&q<<24>>24==48?(t=a[p+1>>0]|0,t<<24>>24==88|t<<24>>24==120):0)h=p+2|0;else l=7}else l=7;while(0);if((l|0)==7)h=p;l=c[f+28>>2]|0;c[o>>2]=l;l=l+4|0;c[l>>2]=(c[l>>2]|0)+1;dl(p,h,j,m,n,d,o);l=c[o>>2]|0;s=l+4|0;t=c[s>>2]|0;c[s>>2]=t+ -1;if(t){r=c[e>>2]|0;s=c[n>>2]|0;t=c[d>>2]|0;Sg(b,r,m,s,t,f,g);i=k;return}jd[c[(c[l>>2]|0)+8>>2]&255](l);r=c[e>>2]|0;s=c[n>>2]|0;t=c[d>>2]|0;Sg(b,r,m,s,t,f,g);i=k;return}function fl(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;l=i;i=i+64|0;p=l;r=l+16|0;n=l+24|0;d=l+36|0;m=l+8|0;k=l+4|0;o=l+12|0;a[r+0>>0]=a[17880]|0;a[r+1>>0]=a[17881]|0;a[r+2>>0]=a[17882]|0;a[r+3>>0]=a[17883]|0;a[r+4>>0]=a[17884]|0;a[r+5>>0]=a[17885]|0;q=f+4|0;bl(r+1|0,17784,0,c[q>>2]|0);s=Dk()|0;c[p>>2]=h;p=cl(n,12,s,r,p)|0;h=n+p|0;q=c[q>>2]&176;do if((q|0)==16){q=a[n>>0]|0;if(q<<24>>24==43|q<<24>>24==45){p=n+1|0;break}if((p|0)>1&q<<24>>24==48?(s=a[n+1>>0]|0,s<<24>>24==88|s<<24>>24==120):0)p=n+2|0;else j=7}else if((q|0)==32)p=h;else j=7;while(0);if((j|0)==7)p=n;j=c[f+28>>2]|0;c[o>>2]=j;j=j+4|0;c[j>>2]=(c[j>>2]|0)+1;dl(n,p,h,d,m,k,o);j=c[o>>2]|0;r=j+4|0;s=c[r>>2]|0;c[r>>2]=s+ -1;if(s){q=c[e>>2]|0;r=c[m>>2]|0;s=c[k>>2]|0;Sg(b,q,d,r,s,f,g);i=l;return}jd[c[(c[j>>2]|0)+8>>2]&255](j);q=c[e>>2]|0;r=c[m>>2]|0;s=c[k>>2]|0;Sg(b,q,d,r,s,f,g);i=l;return}function gl(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;k=i;i=i+96|0;m=k+8|0;r=k;p=k+64|0;n=k+60|0;d=k+56|0;o=k+52|0;q=r;c[q>>2]=37;c[q+4>>2]=0;q=f+4|0;bl(r+1|0,17792,0,c[q>>2]|0);s=Dk()|0;t=m;c[t>>2]=h;c[t+4>>2]=j;h=cl(p,23,s,r,m)|0;j=p+h|0;q=c[q>>2]&176;do if((q|0)==32)h=j;else if((q|0)==16){q=a[p>>0]|0;if(q<<24>>24==43|q<<24>>24==45){h=p+1|0;break}if((h|0)>1&q<<24>>24==48?(t=a[p+1>>0]|0,t<<24>>24==88|t<<24>>24==120):0)h=p+2|0;else l=7}else l=7;while(0);if((l|0)==7)h=p;l=c[f+28>>2]|0;c[o>>2]=l;l=l+4|0;c[l>>2]=(c[l>>2]|0)+1;dl(p,h,j,m,n,d,o);l=c[o>>2]|0;s=l+4|0;t=c[s>>2]|0;c[s>>2]=t+ -1;if(t){r=c[e>>2]|0;s=c[n>>2]|0;t=c[d>>2]|0;Sg(b,r,m,s,t,f,g);i=k;return}jd[c[(c[l>>2]|0)+8>>2]&255](l);r=c[e>>2]|0;s=c[n>>2]|0;t=c[d>>2]|0;Sg(b,r,m,s,t,f,g);i=k;return}function hl(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;m=i;i=i+128|0;p=m;u=m+64|0;r=m+92|0;s=m+80|0;l=m+76|0;d=m+72|0;o=m+84|0;n=m+88|0;t=u;c[t>>2]=37;c[t+4>>2]=0;t=f+4|0;v=il(u+1|0,17800,c[t>>2]|0)|0;c[s>>2]=r;w=Dk()|0;if(v){c[p>>2]=c[f+8>>2];x=p+4|0;h[k>>3]=j;c[x>>2]=c[k>>2];c[x+4>>2]=c[k+4>>2];w=cl(r,30,w,u,p)|0}else{h[k>>3]=j;c[p>>2]=c[k>>2];c[p+4>>2]=c[k+4>>2];w=cl(r,30,w,u,p)|0}if((w|0)>29){if(v){w=Dk()|0;c[p>>2]=c[f+8>>2];x=p+4|0;h[k>>3]=j;c[x>>2]=c[k>>2];c[x+4>>2]=c[k+4>>2];w=jl(s,w,u,p)|0}else{w=Dk()|0;c[p>>2]=c[f+8>>2];x=p+4|0;h[k>>3]=j;c[x>>2]=c[k>>2];c[x+4>>2]=c[k+4>>2];w=jl(s,w,u,p)|0}s=c[s>>2]|0;if(!s){x=Wb(4)|0;c[x>>2]=27280;Zc(x|0,27328,220)}else u=s}else{u=r;s=0}v=u+w|0;t=c[t>>2]&176;do if((t|0)==32)t=v;else if((t|0)==16){t=a[u>>0]|0;if(t<<24>>24==43|t<<24>>24==45){t=u+1|0;break}if((w|0)>1&t<<24>>24==48?(x=a[u+1>>0]|0,x<<24>>24==88|x<<24>>24==120):0)t=u+2|0;else q=19}else q=19;while(0);if((q|0)==19)t=u;if((u|0)!=(r|0)){p=Tq(w<<1)|0;if(!p){x=Wb(4)|0;c[x>>2]=27280;Zc(x|0,27328,220)}else{r=u;q=p}}else q=0;w=c[f+28>>2]|0;c[o>>2]=w;w=w+4|0;c[w>>2]=(c[w>>2]|0)+1;kl(r,t,v,p,l,d,o);o=c[o>>2]|0;w=o+4|0;x=c[w>>2]|0;c[w>>2]=x+ -1;if(!x)jd[c[(c[o>>2]|0)+8>>2]&255](o);Sg(n,c[e>>2]|0,p,c[l>>2]|0,c[d>>2]|0,f,g);x=c[n>>2]|0;c[e>>2]=x;c[b>>2]=x;if(q)Uq(q);if(!s){i=m;return}Uq(s);i=m;return}function il(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;if(d&2048){a[b>>0]=43;b=b+1|0}if(d&1024){a[b>>0]=35;b=b+1|0}f=d&260;h=d>>>14;d=(f|0)==260;if(d)g=0;else{a[b>>0]=46;a[b+1>>0]=42;b=b+2|0;g=1}j=a[c>>0]|0;if(j<<24>>24)while(1){c=c+1|0;k=b+1|0;a[b>>0]=j;j=a[c>>0]|0;if(!(j<<24>>24)){b=k;break}else b=k}do if((f|0)==256)if(!(h&1)){a[b>>0]=101;break}else{a[b>>0]=69;break}else if((f|0)==4)if(!(h&1)){a[b>>0]=102;break}else{a[b>>0]=70;break}else{f=(h&1|0)!=0;if(d)if(f){a[b>>0]=65;break}else{a[b>>0]=97;break}else if(f){a[b>>0]=71;break}else{a[b>>0]=103;break}}while(0);i=e;return g|0}function jl(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;i=i+32|0;k=f+16|0;j=f;c[j>>2]=e;b=Yb(b|0)|0;e=Tq(240)|0;do if(e){c[k>>2]=c[j>>2];k=fr(e,240,d,k)|0;if(k>>>0<240){j=Vq(e,k+1|0)|0;c[a>>2]=(j|0)!=0?j:e;break}Uq(e);if((k|0)>=0?(g=k+1|0,h=Tq(g)|0,c[a>>2]=h,(h|0)!=0):0)k=fr(h,g,d,j)|0;else k=-1}else k=-1;while(0);if(!b){i=f;return k|0}Yb(b|0)|0;i=f;return k|0}function kl(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;k=i;i=i+16|0;l=k;m=Sn(c[j>>2]|0,19072)|0;j=Sn(c[j>>2]|0,19216)|0;kd[c[(c[j>>2]|0)+20>>2]&63](l,j);c[h>>2]=f;n=a[b>>0]|0;if(n<<24>>24==43|n<<24>>24==45){y=vd[c[(c[m>>2]|0)+28>>2]&63](m,n)|0;t=c[h>>2]|0;c[h>>2]=t+1;a[t>>0]=y;t=b+1|0}else t=b;n=e;a:do if(((n-t|0)>1?(a[t>>0]|0)==48:0)?(p=t+1|0,y=a[p>>0]|0,y<<24>>24==88|y<<24>>24==120):0){y=vd[c[(c[m>>2]|0)+28>>2]&63](m,48)|0;x=c[h>>2]|0;c[h>>2]=x+1;a[x>>0]=y;t=t+2|0;x=vd[c[(c[m>>2]|0)+28>>2]&63](m,a[p>>0]|0)|0;y=c[h>>2]|0;c[h>>2]=y+1;a[y>>0]=x;if(t>>>0<e>>>0){q=t;while(1){y=a[q>>0]|0;Dk()|0;y=y<<24>>24;if((y+ -48|0)>>>0>=10?((y|32)+ -97|0)>>>0>=6:0){p=t;break a}q=q+1|0;if(q>>>0>=e>>>0){p=t;break}}}else{p=t;q=t}}else s=5;while(0);b:do if((s|0)==5)if(t>>>0<e>>>0){q=t;while(1){y=a[q>>0]|0;Dk()|0;s=q+1|0;if(((y<<24>>24)+ -48|0)>>>0>=10){p=t;break b}if(s>>>0<e>>>0)q=s;else{p=t;q=s;break}}}else{p=t;q=t}while(0);s=a[l>>0]|0;if(!(s&1))s=(s&255)>>>1;else s=c[l+4>>2]|0;if(s){if((p|0)!=(q|0)?(r=q+ -1|0,r>>>0>p>>>0):0){s=p;do{y=a[s>>0]|0;a[s>>0]=a[r>>0]|0;a[r>>0]=y;s=s+1|0;r=r+ -1|0}while(s>>>0<r>>>0)}u=md[c[(c[j>>2]|0)+16>>2]&127](j)|0;if(p>>>0<q>>>0){r=l+1|0;s=l+4|0;t=l+8|0;x=0;w=0;v=p;while(1){y=a[((a[l>>0]&1)==0?r:c[t>>2]|0)+w>>0]|0;if(y<<24>>24>0&(x|0)==(y<<24>>24|0)){x=c[h>>2]|0;c[h>>2]=x+1;a[x>>0]=u;x=a[l>>0]|0;if(!(x&1))y=(x&255)>>>1;else y=c[s>>2]|0;x=0;w=(w>>>0<(y+ -1|0)>>>0&1)+w|0}z=vd[c[(c[m>>2]|0)+28>>2]&63](m,a[v>>0]|0)|0;y=c[h>>2]|0;c[h>>2]=y+1;a[y>>0]=z;v=v+1|0;if(v>>>0>=q>>>0)break;else x=x+1|0}}r=f+(p-b)|0;p=c[h>>2]|0;if((r|0)!=(p|0)?(o=p+ -1|0,o>>>0>r>>>0):0)do{z=a[r>>0]|0;a[r>>0]=a[o>>0]|0;a[o>>0]=z;r=r+1|0;o=o+ -1|0}while(r>>>0<o>>>0)}else{sd[c[(c[m>>2]|0)+32>>2]&7](m,p,q,c[h>>2]|0)|0;c[h>>2]=(c[h>>2]|0)+(q-p)}c:do if(q>>>0<e>>>0){while(1){o=a[q>>0]|0;if(o<<24>>24==46)break;y=vd[c[(c[m>>2]|0)+28>>2]&63](m,o)|0;z=c[h>>2]|0;c[h>>2]=z+1;a[z>>0]=y;q=q+1|0;if(q>>>0>=e>>>0)break c}y=md[c[(c[j>>2]|0)+12>>2]&127](j)|0;z=c[h>>2]|0;c[h>>2]=z+1;a[z>>0]=y;q=q+1|0}while(0);sd[c[(c[m>>2]|0)+32>>2]&7](m,q,e,c[h>>2]|0)|0;m=(c[h>>2]|0)+(n-q)|0;c[h>>2]=m;if((d|0)!=(e|0))m=f+(d-b)|0;c[g>>2]=m;if(!(a[l>>0]&1)){i=k;return}Uq(c[l+8>>2]|0);i=k;return}function ll(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;l=i;i=i+128|0;p=l;u=l+64|0;r=l+92|0;s=l+80|0;m=l+76|0;n=l+72|0;o=l+84|0;d=l+88|0;t=u;c[t>>2]=37;c[t+4>>2]=0;t=f+4|0;v=il(u+1|0,17808,c[t>>2]|0)|0;c[s>>2]=r;w=Dk()|0;if(v){c[p>>2]=c[f+8>>2];x=p+4|0;h[k>>3]=j;c[x>>2]=c[k>>2];c[x+4>>2]=c[k+4>>2];w=cl(r,30,w,u,p)|0}else{h[k>>3]=j;c[p>>2]=c[k>>2];c[p+4>>2]=c[k+4>>2];w=cl(r,30,w,u,p)|0}if((w|0)>29){if(v){w=Dk()|0;c[p>>2]=c[f+8>>2];x=p+4|0;h[k>>3]=j;c[x>>2]=c[k>>2];c[x+4>>2]=c[k+4>>2];w=jl(s,w,u,p)|0}else{w=Dk()|0;h[k>>3]=j;c[p>>2]=c[k>>2];c[p+4>>2]=c[k+4>>2];w=jl(s,w,u,p)|0}s=c[s>>2]|0;if(!s){x=Wb(4)|0;c[x>>2]=27280;Zc(x|0,27328,220)}else v=s}else{v=r;s=0}u=v+w|0;t=c[t>>2]&176;do if((t|0)==32)t=u;else if((t|0)==16){t=a[v>>0]|0;if(t<<24>>24==43|t<<24>>24==45){t=v+1|0;break}if((w|0)>1&t<<24>>24==48?(x=a[v+1>>0]|0,x<<24>>24==88|x<<24>>24==120):0)t=v+2|0;else q=19}else q=19;while(0);if((q|0)==19)t=v;if((v|0)!=(r|0)){p=Tq(w<<1)|0;if(!p){x=Wb(4)|0;c[x>>2]=27280;Zc(x|0,27328,220)}else{r=v;q=p}}else q=0;w=c[f+28>>2]|0;c[o>>2]=w;w=w+4|0;c[w>>2]=(c[w>>2]|0)+1;kl(r,t,u,p,m,n,o);o=c[o>>2]|0;w=o+4|0;x=c[w>>2]|0;c[w>>2]=x+ -1;if(!x)jd[c[(c[o>>2]|0)+8>>2]&255](o);Sg(d,c[e>>2]|0,p,c[m>>2]|0,c[n>>2]|0,f,g);c[b>>2]=c[d>>2];Uq(q);Uq(s);i=l;return}function ml(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;j=i;i=i+80|0;k=j;m=j+60|0;d=j+40|0;a[m+0>>0]=a[17888]|0;a[m+1>>0]=a[17889]|0;a[m+2>>0]=a[17890]|0;a[m+3>>0]=a[17891]|0;a[m+4>>0]=a[17892]|0;a[m+5>>0]=a[17893]|0;n=Dk()|0;c[k>>2]=h;m=cl(d,20,n,m,k)|0;h=d+m|0;n=c[f+4>>2]&176;do if((n|0)==32)n=h;else if((n|0)==16){n=a[d>>0]|0;if(n<<24>>24==43|n<<24>>24==45){n=d+1|0;break}if((m|0)>1&n<<24>>24==48?(o=a[d+1>>0]|0,o<<24>>24==88|o<<24>>24==120):0)n=d+2|0;else l=7}else l=7;while(0);if((l|0)==7)n=d;l=c[f+28>>2]|0;o=l+4|0;c[o>>2]=(c[o>>2]|0)+1;o=Sn(l,19072)|0;q=l+4|0;p=c[q>>2]|0;c[q>>2]=p+ -1;if(!p)jd[c[(c[l>>2]|0)+8>>2]&255](l);sd[c[(c[o>>2]|0)+32>>2]&7](o,d,h,k)|0;l=k+m|0;if((n|0)==(h|0)){q=l;p=c[e>>2]|0;Sg(b,p,k,q,l,f,g);i=j;return}q=k+(n-d)|0;p=c[e>>2]|0;Sg(b,p,k,q,l,f,g);i=j;return}function nl(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function ol(a){a=a|0;return}function pl(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0;j=i;i=i+32|0;l=j+16|0;m=j+12|0;k=j;if(!(c[f+4>>2]&1)){k=c[(c[d>>2]|0)+24>>2]|0;c[m>>2]=c[e>>2];n=h&1;c[l+0>>2]=c[m+0>>2];ud[k&31](b,d,l,f,g,n);i=j;return}d=c[f+28>>2]|0;l=d+4|0;c[l>>2]=(c[l>>2]|0)+1;l=Sn(d,19224)|0;g=d+4|0;n=c[g>>2]|0;c[g>>2]=n+ -1;if(!n)jd[c[(c[d>>2]|0)+8>>2]&255](d);d=c[l>>2]|0;if(h)kd[c[d+24>>2]&63](k,l);else kd[c[d+28>>2]&63](k,l);m=a[k>>0]|0;if(!(m&1)){h=k+4|0;d=h;l=k+8|0}else{l=k+8|0;d=c[l>>2]|0;h=k+4|0}while(1){g=(m&1)==0;if(g){f=h;m=(m&255)>>>1}else{f=c[l>>2]|0;m=c[h>>2]|0}if((d|0)==(f+(m<<2)|0))break;n=c[d>>2]|0;g=c[e>>2]|0;if(g){f=g+24|0;m=c[f>>2]|0;if((m|0)==(c[g+28>>2]|0))n=vd[c[(c[g>>2]|0)+52>>2]&63](g,n)|0;else{c[f>>2]=m+4;c[m>>2]=n}if((n|0)==-1)c[e>>2]=0}m=a[k>>0]|0;d=d+4|0}c[b>>2]=c[e>>2];if(g){i=j;return}Uq(c[k+8>>2]|0);i=j;return}function ql(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;l=i;i=i+128|0;d=l;p=l+108|0;n=l+96|0;m=l+92|0;k=l+88|0;o=l+84|0;a[p+0>>0]=a[17880]|0;a[p+1>>0]=a[17881]|0;a[p+2>>0]=a[17882]|0;a[p+3>>0]=a[17883]|0;a[p+4>>0]=a[17884]|0;a[p+5>>0]=a[17885]|0;q=f+4|0;bl(p+1|0,17784,1,c[q>>2]|0);r=Dk()|0;c[d>>2]=h;p=cl(n,12,r,p,d)|0;h=n+p|0;q=c[q>>2]&176;do if((q|0)==16){q=a[n>>0]|0;if(q<<24>>24==43|q<<24>>24==45){p=n+1|0;break}if((p|0)>1&q<<24>>24==48?(r=a[n+1>>0]|0,r<<24>>24==88|r<<24>>24==120):0)p=n+2|0;else j=7}else if((q|0)==32)p=h;else j=7;while(0);if((j|0)==7)p=n;j=c[f+28>>2]|0;c[o>>2]=j;j=j+4|0;c[j>>2]=(c[j>>2]|0)+1;rl(n,p,h,d,m,k,o);j=c[o>>2]|0;q=j+4|0;r=c[q>>2]|0;c[q>>2]=r+ -1;if(r){p=c[e>>2]|0;q=c[m>>2]|0;r=c[k>>2]|0;sl(b,p,d,q,r,f,g);i=l;return}jd[c[(c[j>>2]|0)+8>>2]&255](j);p=c[e>>2]|0;q=c[m>>2]|0;r=c[k>>2]|0;sl(b,p,d,q,r,f,g);i=l;return}function rl(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;l=i;i=i+16|0;k=l;n=Sn(c[j>>2]|0,19064)|0;p=Sn(c[j>>2]|0,19224)|0;kd[c[(c[p>>2]|0)+20>>2]&63](k,p);j=a[k>>0]|0;if(!(j&1))j=(j&255)>>>1;else j=c[k+4>>2]|0;if(j){c[h>>2]=f;j=a[b>>0]|0;if(j<<24>>24==43|j<<24>>24==45){v=vd[c[(c[n>>2]|0)+44>>2]&63](n,j)|0;j=c[h>>2]|0;c[h>>2]=j+4;c[j>>2]=v;j=b+1|0}else j=b;if(((e-j|0)>1?(a[j>>0]|0)==48:0)?(q=j+1|0,v=a[q>>0]|0,v<<24>>24==88|v<<24>>24==120):0){v=vd[c[(c[n>>2]|0)+44>>2]&63](n,48)|0;u=c[h>>2]|0;c[h>>2]=u+4;c[u>>2]=v;u=vd[c[(c[n>>2]|0)+44>>2]&63](n,a[q>>0]|0)|0;v=c[h>>2]|0;c[h>>2]=v+4;c[v>>2]=u;j=j+2|0}if((j|0)!=(e|0)?(o=e+ -1|0,o>>>0>j>>>0):0){q=j;do{v=a[q>>0]|0;a[q>>0]=a[o>>0]|0;a[o>>0]=v;q=q+1|0;o=o+ -1|0}while(q>>>0<o>>>0)}s=md[c[(c[p>>2]|0)+16>>2]&127](p)|0;if(j>>>0<e>>>0){o=k+1|0;r=k+4|0;p=k+8|0;u=0;t=0;q=j;while(1){v=a[((a[k>>0]&1)==0?o:c[p>>2]|0)+t>>0]|0;if(v<<24>>24!=0&(u|0)==(v<<24>>24|0)){u=c[h>>2]|0;c[h>>2]=u+4;c[u>>2]=s;u=a[k>>0]|0;if(!(u&1))v=(u&255)>>>1;else v=c[r>>2]|0;u=0;t=(t>>>0<(v+ -1|0)>>>0&1)+t|0}x=vd[c[(c[n>>2]|0)+44>>2]&63](n,a[q>>0]|0)|0;w=c[h>>2]|0;v=w+4|0;c[h>>2]=v;c[w>>2]=x;q=q+1|0;if(q>>>0>=e>>>0)break;else u=u+1|0}}else v=c[h>>2]|0;n=f+(j-b<<2)|0;if((n|0)!=(v|0)?(m=v+ -4|0,m>>>0>n>>>0):0)do{x=c[n>>2]|0;c[n>>2]=c[m>>2];c[m>>2]=x;n=n+4|0;m=m+ -4|0}while(n>>>0<m>>>0)}else{sd[c[(c[n>>2]|0)+48>>2]&7](n,b,e,f)|0;v=f+(e-b<<2)|0;c[h>>2]=v}if((d|0)!=(e|0))v=f+(d-b<<2)|0;c[g>>2]=v;if(!(a[k>>0]&1)){i=l;return}Uq(c[k+8>>2]|0);i=l;return}function sl(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0;k=i;i=i+16|0;l=k;if(!d){c[b>>2]=0;i=k;return}p=e;n=g-p>>2;h=h+12|0;m=c[h>>2]|0;n=(m|0)>(n|0)?m-n|0:0;m=f;p=m-p|0;o=p>>2;if((p|0)>0?(fd[c[(c[d>>2]|0)+48>>2]&31](d,e,o)|0)!=(o|0):0){c[b>>2]=0;i=k;return}do if((n|0)>0){Si(l,n,j);if(!(a[l>>0]&1))e=l+4|0;else e=c[l+8>>2]|0;if((fd[c[(c[d>>2]|0)+48>>2]&31](d,e,n)|0)==(n|0)){if(!(a[l>>0]&1))break;Uq(c[l+8>>2]|0);break}c[b>>2]=0;if(!(a[l>>0]&1)){i=k;return}Uq(c[l+8>>2]|0);i=k;return}while(0);p=g-m|0;l=p>>2;if((p|0)>0?(fd[c[(c[d>>2]|0)+48>>2]&31](d,f,l)|0)!=(l|0):0){c[b>>2]=0;i=k;return}c[h>>2]=0;c[b>>2]=d;i=k;return}function tl(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;k=i;i=i+208|0;m=k+8|0;r=k;p=k+184|0;n=k+180|0;d=k+176|0;o=k+172|0;q=r;c[q>>2]=37;c[q+4>>2]=0;q=f+4|0;bl(r+1|0,17792,1,c[q>>2]|0);s=Dk()|0;t=m;c[t>>2]=h;c[t+4>>2]=j;h=cl(p,22,s,r,m)|0;j=p+h|0;q=c[q>>2]&176;do if((q|0)==16){q=a[p>>0]|0;if(q<<24>>24==43|q<<24>>24==45){h=p+1|0;break}if((h|0)>1&q<<24>>24==48?(t=a[p+1>>0]|0,t<<24>>24==88|t<<24>>24==120):0)h=p+2|0;else l=7}else if((q|0)==32)h=j;else l=7;while(0);if((l|0)==7)h=p;l=c[f+28>>2]|0;c[o>>2]=l;l=l+4|0;c[l>>2]=(c[l>>2]|0)+1;rl(p,h,j,m,n,d,o);l=c[o>>2]|0;s=l+4|0;t=c[s>>2]|0;c[s>>2]=t+ -1;if(t){r=c[e>>2]|0;s=c[n>>2]|0;t=c[d>>2]|0;sl(b,r,m,s,t,f,g);i=k;return}jd[c[(c[l>>2]|0)+8>>2]&255](l);r=c[e>>2]|0;s=c[n>>2]|0;t=c[d>>2]|0;sl(b,r,m,s,t,f,g);i=k;return}function ul(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;l=i;i=i+128|0;d=l;p=l+108|0;n=l+96|0;m=l+92|0;k=l+88|0;o=l+84|0;a[p+0>>0]=a[17880]|0;a[p+1>>0]=a[17881]|0;a[p+2>>0]=a[17882]|0;a[p+3>>0]=a[17883]|0;a[p+4>>0]=a[17884]|0;a[p+5>>0]=a[17885]|0;q=f+4|0;bl(p+1|0,17784,0,c[q>>2]|0);r=Dk()|0;c[d>>2]=h;p=cl(n,12,r,p,d)|0;h=n+p|0;q=c[q>>2]&176;do if((q|0)==16){q=a[n>>0]|0;if(q<<24>>24==43|q<<24>>24==45){p=n+1|0;break}if((p|0)>1&q<<24>>24==48?(r=a[n+1>>0]|0,r<<24>>24==88|r<<24>>24==120):0)p=n+2|0;else j=7}else if((q|0)==32)p=h;else j=7;while(0);if((j|0)==7)p=n;j=c[f+28>>2]|0;c[o>>2]=j;j=j+4|0;c[j>>2]=(c[j>>2]|0)+1;rl(n,p,h,d,m,k,o);j=c[o>>2]|0;q=j+4|0;r=c[q>>2]|0;c[q>>2]=r+ -1;if(r){p=c[e>>2]|0;q=c[m>>2]|0;r=c[k>>2]|0;sl(b,p,d,q,r,f,g);i=l;return}jd[c[(c[j>>2]|0)+8>>2]&255](j);p=c[e>>2]|0;q=c[m>>2]|0;r=c[k>>2]|0;sl(b,p,d,q,r,f,g);i=l;return}function vl(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;k=i;i=i+224|0;m=k+8|0;r=k;p=k+192|0;n=k+188|0;d=k+184|0;o=k+180|0;q=r;c[q>>2]=37;c[q+4>>2]=0;q=f+4|0;bl(r+1|0,17792,0,c[q>>2]|0);s=Dk()|0;t=m;c[t>>2]=h;c[t+4>>2]=j;h=cl(p,23,s,r,m)|0;j=p+h|0;q=c[q>>2]&176;do if((q|0)==16){q=a[p>>0]|0;if(q<<24>>24==43|q<<24>>24==45){h=p+1|0;break}if((h|0)>1&q<<24>>24==48?(t=a[p+1>>0]|0,t<<24>>24==88|t<<24>>24==120):0)h=p+2|0;else l=7}else if((q|0)==32)h=j;else l=7;while(0);if((l|0)==7)h=p;l=c[f+28>>2]|0;c[o>>2]=l;l=l+4|0;c[l>>2]=(c[l>>2]|0)+1;rl(p,h,j,m,n,d,o);l=c[o>>2]|0;s=l+4|0;t=c[s>>2]|0;c[s>>2]=t+ -1;if(t){r=c[e>>2]|0;s=c[n>>2]|0;t=c[d>>2]|0;sl(b,r,m,s,t,f,g);i=k;return}jd[c[(c[l>>2]|0)+8>>2]&255](l);r=c[e>>2]|0;s=c[n>>2]|0;t=c[d>>2]|0;sl(b,r,m,s,t,f,g);i=k;return}function wl(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;m=i;i=i+304|0;p=m;u=m+232|0;r=m+260|0;s=m+248|0;n=m+244|0;l=m+240|0;o=m+252|0;d=m+256|0;t=u;c[t>>2]=37;c[t+4>>2]=0;t=f+4|0;v=il(u+1|0,17800,c[t>>2]|0)|0;c[s>>2]=r;w=Dk()|0;if(v){c[p>>2]=c[f+8>>2];x=p+4|0;h[k>>3]=j;c[x>>2]=c[k>>2];c[x+4>>2]=c[k+4>>2];w=cl(r,30,w,u,p)|0}else{h[k>>3]=j;c[p>>2]=c[k>>2];c[p+4>>2]=c[k+4>>2];w=cl(r,30,w,u,p)|0}if((w|0)>29){if(v){w=Dk()|0;c[p>>2]=c[f+8>>2];x=p+4|0;h[k>>3]=j;c[x>>2]=c[k>>2];c[x+4>>2]=c[k+4>>2];w=jl(s,w,u,p)|0}else{w=Dk()|0;c[p>>2]=c[f+8>>2];x=p+4|0;h[k>>3]=j;c[x>>2]=c[k>>2];c[x+4>>2]=c[k+4>>2];w=jl(s,w,u,p)|0}s=c[s>>2]|0;if(!s){x=Wb(4)|0;c[x>>2]=27280;Zc(x|0,27328,220)}else u=s}else{u=r;s=0}v=u+w|0;t=c[t>>2]&176;do if((t|0)==16){t=a[u>>0]|0;if(t<<24>>24==43|t<<24>>24==45){t=u+1|0;break}if((w|0)>1&t<<24>>24==48?(x=a[u+1>>0]|0,x<<24>>24==88|x<<24>>24==120):0)t=u+2|0;else q=19}else if((t|0)==32)t=v;else q=19;while(0);if((q|0)==19)t=u;if((u|0)!=(r|0)){p=Tq(w<<3)|0;if(!p){x=Wb(4)|0;c[x>>2]=27280;Zc(x|0,27328,220)}else{r=u;q=p}}else q=0;w=c[f+28>>2]|0;c[o>>2]=w;w=w+4|0;c[w>>2]=(c[w>>2]|0)+1;xl(r,t,v,p,n,l,o);o=c[o>>2]|0;w=o+4|0;x=c[w>>2]|0;c[w>>2]=x+ -1;if(!x)jd[c[(c[o>>2]|0)+8>>2]&255](o);sl(d,c[e>>2]|0,p,c[n>>2]|0,c[l>>2]|0,f,g);x=c[d>>2]|0;c[e>>2]=x;c[b>>2]=x;if(!q){Uq(s);i=m;return}Uq(q);Uq(s);i=m;return}function xl(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;l=i;i=i+16|0;k=l;m=Sn(c[j>>2]|0,19064)|0;n=Sn(c[j>>2]|0,19224)|0;kd[c[(c[n>>2]|0)+20>>2]&63](k,n);c[h>>2]=f;j=a[b>>0]|0;if(j<<24>>24==43|j<<24>>24==45){y=vd[c[(c[m>>2]|0)+44>>2]&63](m,j)|0;t=c[h>>2]|0;c[h>>2]=t+4;c[t>>2]=y;t=b+1|0}else t=b;j=e;a:do if(((j-t|0)>1?(a[t>>0]|0)==48:0)?(p=t+1|0,y=a[p>>0]|0,y<<24>>24==88|y<<24>>24==120):0){y=vd[c[(c[m>>2]|0)+44>>2]&63](m,48)|0;x=c[h>>2]|0;c[h>>2]=x+4;c[x>>2]=y;t=t+2|0;x=vd[c[(c[m>>2]|0)+44>>2]&63](m,a[p>>0]|0)|0;y=c[h>>2]|0;c[h>>2]=y+4;c[y>>2]=x;if(t>>>0<e>>>0){q=t;while(1){y=a[q>>0]|0;Dk()|0;y=y<<24>>24;if((y+ -48|0)>>>0>=10?((y|32)+ -97|0)>>>0>=6:0){p=t;break a}q=q+1|0;if(q>>>0>=e>>>0){p=t;break}}}else{p=t;q=t}}else s=5;while(0);b:do if((s|0)==5)if(t>>>0<e>>>0){q=t;while(1){y=a[q>>0]|0;Dk()|0;s=q+1|0;if(((y<<24>>24)+ -48|0)>>>0>=10){p=t;break b}if(s>>>0<e>>>0)q=s;else{p=t;q=s;break}}}else{p=t;q=t}while(0);s=a[k>>0]|0;if(!(s&1))s=(s&255)>>>1;else s=c[k+4>>2]|0;if(s){if((p|0)!=(q|0)?(r=q+ -1|0,r>>>0>p>>>0):0){s=p;do{y=a[s>>0]|0;a[s>>0]=a[r>>0]|0;a[r>>0]=y;s=s+1|0;r=r+ -1|0}while(s>>>0<r>>>0)}t=md[c[(c[n>>2]|0)+16>>2]&127](n)|0;if(p>>>0<q>>>0){r=k+1|0;s=k+4|0;v=k+8|0;x=0;w=0;u=p;while(1){y=a[((a[k>>0]&1)==0?r:c[v>>2]|0)+w>>0]|0;if(y<<24>>24>0&(x|0)==(y<<24>>24|0)){x=c[h>>2]|0;c[h>>2]=x+4;c[x>>2]=t;x=a[k>>0]|0;if(!(x&1))y=(x&255)>>>1;else y=c[s>>2]|0;x=0;w=(w>>>0<(y+ -1|0)>>>0&1)+w|0}A=vd[c[(c[m>>2]|0)+44>>2]&63](m,a[u>>0]|0)|0;z=c[h>>2]|0;y=z+4|0;c[h>>2]=y;c[z>>2]=A;u=u+1|0;if(u>>>0>=q>>>0)break;else x=x+1|0}}else y=c[h>>2]|0;p=f+(p-b<<2)|0;if((p|0)!=(y|0)?(o=y+ -4|0,o>>>0>p>>>0):0)do{A=c[p>>2]|0;c[p>>2]=c[o>>2];c[o>>2]=A;p=p+4|0;o=o+ -4|0}while(p>>>0<o>>>0)}else{sd[c[(c[m>>2]|0)+48>>2]&7](m,p,q,c[h>>2]|0)|0;y=(c[h>>2]|0)+(q-p<<2)|0;c[h>>2]=y}c:do if(q>>>0<e>>>0){while(1){o=a[q>>0]|0;if(o<<24>>24==46)break;z=vd[c[(c[m>>2]|0)+44>>2]&63](m,o)|0;A=c[h>>2]|0;y=A+4|0;c[h>>2]=y;c[A>>2]=z;q=q+1|0;if(q>>>0>=e>>>0)break c}z=md[c[(c[n>>2]|0)+12>>2]&127](n)|0;A=c[h>>2]|0;y=A+4|0;c[h>>2]=y;c[A>>2]=z;q=q+1|0}while(0);sd[c[(c[m>>2]|0)+48>>2]&7](m,q,e,y)|0;m=(c[h>>2]|0)+(j-q<<2)|0;c[h>>2]=m;if((d|0)!=(e|0))m=f+(d-b<<2)|0;c[g>>2]=m;if(!(a[k>>0]&1)){i=l;return}Uq(c[k+8>>2]|0);i=l;return}function yl(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;m=i;i=i+304|0;p=m;u=m+232|0;r=m+260|0;s=m+248|0;n=m+244|0;l=m+240|0;o=m+252|0;d=m+256|0;t=u;c[t>>2]=37;c[t+4>>2]=0;t=f+4|0;v=il(u+1|0,17808,c[t>>2]|0)|0;c[s>>2]=r;w=Dk()|0;if(v){c[p>>2]=c[f+8>>2];x=p+4|0;h[k>>3]=j;c[x>>2]=c[k>>2];c[x+4>>2]=c[k+4>>2];w=cl(r,30,w,u,p)|0}else{h[k>>3]=j;c[p>>2]=c[k>>2];c[p+4>>2]=c[k+4>>2];w=cl(r,30,w,u,p)|0}if((w|0)>29){if(v){w=Dk()|0;c[p>>2]=c[f+8>>2];x=p+4|0;h[k>>3]=j;c[x>>2]=c[k>>2];c[x+4>>2]=c[k+4>>2];w=jl(s,w,u,p)|0}else{w=Dk()|0;h[k>>3]=j;c[p>>2]=c[k>>2];c[p+4>>2]=c[k+4>>2];w=jl(s,w,u,p)|0}s=c[s>>2]|0;if(!s){x=Wb(4)|0;c[x>>2]=27280;Zc(x|0,27328,220)}else u=s}else{u=r;s=0}v=u+w|0;t=c[t>>2]&176;do if((t|0)==16){t=a[u>>0]|0;if(t<<24>>24==43|t<<24>>24==45){t=u+1|0;break}if((w|0)>1&t<<24>>24==48?(x=a[u+1>>0]|0,x<<24>>24==88|x<<24>>24==120):0)t=u+2|0;else q=19}else if((t|0)==32)t=v;else q=19;while(0);if((q|0)==19)t=u;if((u|0)!=(r|0)){p=Tq(w<<3)|0;if(!p){x=Wb(4)|0;c[x>>2]=27280;Zc(x|0,27328,220)}else{r=u;q=p}}else q=0;w=c[f+28>>2]|0;c[o>>2]=w;w=w+4|0;c[w>>2]=(c[w>>2]|0)+1;xl(r,t,v,p,n,l,o);o=c[o>>2]|0;w=o+4|0;x=c[w>>2]|0;c[w>>2]=x+ -1;if(!x)jd[c[(c[o>>2]|0)+8>>2]&255](o);sl(d,c[e>>2]|0,p,c[n>>2]|0,c[l>>2]|0,f,g);x=c[d>>2]|0;c[e>>2]=x;c[b>>2]=x;if(!q){Uq(s);i=m;return}Uq(q);Uq(s);i=m;return}function zl(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;j=i;i=i+176|0;k=j;m=j+168|0;d=j+148|0;a[m+0>>0]=a[17888]|0;a[m+1>>0]=a[17889]|0;a[m+2>>0]=a[17890]|0;a[m+3>>0]=a[17891]|0;a[m+4>>0]=a[17892]|0;a[m+5>>0]=a[17893]|0;n=Dk()|0;c[k>>2]=h;m=cl(d,20,n,m,k)|0;h=d+m|0;n=c[f+4>>2]&176;do if((n|0)==16){n=a[d>>0]|0;if(n<<24>>24==43|n<<24>>24==45){n=d+1|0;break}if((m|0)>1&n<<24>>24==48?(o=a[d+1>>0]|0,o<<24>>24==88|o<<24>>24==120):0)n=d+2|0;else l=7}else if((n|0)==32)n=h;else l=7;while(0);if((l|0)==7)n=d;l=c[f+28>>2]|0;o=l+4|0;c[o>>2]=(c[o>>2]|0)+1;o=Sn(l,19064)|0;q=l+4|0;p=c[q>>2]|0;c[q>>2]=p+ -1;if(!p)jd[c[(c[l>>2]|0)+8>>2]&255](l);sd[c[(c[o>>2]|0)+48>>2]&7](o,d,h,k)|0;l=k+(m<<2)|0;if((n|0)==(h|0)){q=l;p=c[e>>2]|0;sl(b,p,k,q,l,f,g);i=j;return}q=k+(n-d<<2)|0;p=c[e>>2]|0;sl(b,p,k,q,l,f,g);i=j;return}function Al(e,f,g,h,j,k,l,m,n){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;var o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;o=i;i=i+32|0;t=o+16|0;q=o+12|0;w=o+8|0;s=o+4|0;r=o;x=c[j+28>>2]|0;v=x+4|0;c[v>>2]=(c[v>>2]|0)+1;v=Sn(x,19072)|0;C=x+4|0;D=c[C>>2]|0;c[C>>2]=D+ -1;if(!D)jd[c[(c[x>>2]|0)+8>>2]&255](x);c[k>>2]=0;a:do if((m|0)!=(n|0)){x=v+8|0;y=0;b:while(1){z=y;y=g;while(1){if(z){g=y;break a}if(y)if((c[y+12>>2]|0)==(c[y+16>>2]|0)){D=(md[c[(c[y>>2]|0)+36>>2]&127](y)|0)==-1;g=D?0:y;y=D?0:y}else g=y;else{g=0;y=0}z=(g|0)==0;do if(h){if((c[h+12>>2]|0)==(c[h+16>>2]|0)?(md[c[(c[h>>2]|0)+36>>2]&127](h)|0)==-1:0){p=15;break}if(!z){p=16;break b}}else p=15;while(0);if((p|0)==15){p=0;if(z){h=0;p=16;break b}else h=0}if((fd[c[(c[v>>2]|0)+36>>2]&31](v,a[m>>0]|0,0)|0)<<24>>24==37){p=18;break}z=a[m>>0]|0;if(z<<24>>24>-1?(u=c[x>>2]|0,(b[u+(z<<24>>24<<1)>>1]&8192)!=0):0){p=29;break}A=g+12|0;B=c[A>>2]|0;z=g+16|0;if((B|0)==(c[z>>2]|0))B=md[c[(c[g>>2]|0)+36>>2]&127](g)|0;else B=d[B>>0]|0;D=vd[c[(c[v>>2]|0)+12>>2]&63](v,B&255)|0;if(D<<24>>24==(vd[c[(c[v>>2]|0)+12>>2]&63](v,a[m>>0]|0)|0)<<24>>24){p=54;break}c[k>>2]=4;z=4}c:do if((p|0)==18){p=0;z=m+1|0;if((z|0)==(n|0)){p=19;break b}y=fd[c[(c[v>>2]|0)+36>>2]&31](v,a[z>>0]|0,0)|0;if(y<<24>>24==48|y<<24>>24==69){z=m+2|0;if((z|0)==(n|0)){p=22;break b}m=z;z=fd[c[(c[v>>2]|0)+36>>2]&31](v,a[z>>0]|0,0)|0}else{m=z;z=y;y=0}D=c[(c[f>>2]|0)+36>>2]|0;c[s>>2]=g;c[r>>2]=h;c[q+0>>2]=c[s+0>>2];c[t+0>>2]=c[r+0>>2];ld[D&3](w,f,q,t,j,k,l,z,y);m=m+1|0;g=c[w>>2]|0}else if((p|0)==29){while(1){p=0;m=m+1|0;if((m|0)==(n|0)){m=n;break}z=a[m>>0]|0;if(z<<24>>24<=-1)break;if(!(b[u+(z<<24>>24<<1)>>1]&8192))break;else p=29}B=h;A=h;while(1){if(g){if((c[g+12>>2]|0)==(c[g+16>>2]|0)){D=(md[c[(c[g>>2]|0)+36>>2]&127](g)|0)==-1;g=D?0:g;y=D?0:y}}else g=0;C=(g|0)==0;do if(A){if((c[A+12>>2]|0)!=(c[A+16>>2]|0))if(C){z=B;break}else{g=y;break c}if((md[c[(c[A>>2]|0)+36>>2]&127](A)|0)!=-1)if(C^(B|0)==0){z=B;A=B}else{g=y;break c}else{z=0;h=0;p=40}}else{z=B;p=40}while(0);if((p|0)==40){p=0;if(C){g=y;break c}else A=0}C=g+12|0;D=c[C>>2]|0;B=g+16|0;if((D|0)==(c[B>>2]|0))D=md[c[(c[g>>2]|0)+36>>2]&127](g)|0;else D=d[D>>0]|0;if((D&255)<<24>>24<=-1){g=y;break c}if(!(b[(c[x>>2]|0)+(D<<24>>24<<1)>>1]&8192)){g=y;break c}D=c[C>>2]|0;if((D|0)==(c[B>>2]|0)){md[c[(c[g>>2]|0)+40>>2]&127](g)|0;B=z;continue}else{c[C>>2]=D+1;B=z;continue}}}else if((p|0)==54){p=0;B=c[A>>2]|0;if((B|0)==(c[z>>2]|0))md[c[(c[g>>2]|0)+40>>2]&127](g)|0;else c[A>>2]=B+1;m=m+1|0;g=y}while(0);if((m|0)==(n|0))break a;y=c[k>>2]|0}if((p|0)==16){c[k>>2]=4;break}else if((p|0)==19){c[k>>2]=4;break}else if((p|0)==22){c[k>>2]=4;break}}while(0);if(g){if((c[g+12>>2]|0)==(c[g+16>>2]|0)){D=(md[c[(c[g>>2]|0)+36>>2]&127](g)|0)==-1;g=D?0:g}}else g=0;l=(g|0)==0;do if(h){if((c[h+12>>2]|0)==(c[h+16>>2]|0)?(md[c[(c[h>>2]|0)+36>>2]&127](h)|0)==-1:0){p=66;break}if(l){c[e>>2]=g;i=o;return}}else p=66;while(0);if((p|0)==66?!l:0){c[e>>2]=g;i=o;return}c[k>>2]=c[k>>2]|2;c[e>>2]=g;i=o;return}function Bl(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Cl(a){a=a|0;return}function Dl(a){a=a|0;return 2}function El(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0;j=i;Al(a,b,c[d>>2]|0,c[e>>2]|0,f,g,h,17992,18e3|0);i=j;return}function Fl(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0;k=i;m=d+8|0;m=md[c[(c[m>>2]|0)+20>>2]&127](m)|0;n=a[m>>0]|0;if(!(n&1)){l=m+1|0;m=(n&255)>>>1}else{l=c[m+8>>2]|0;m=c[m+4>>2]|0}Al(b,d,c[e>>2]|0,c[f>>2]|0,g,h,j,l,l+m|0);i=k;return}function Gl(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;j=i;k=c[f+28>>2]|0;f=k+4|0;c[f>>2]=(c[f>>2]|0)+1;f=Sn(k,19072)|0;m=k+4|0;l=c[m>>2]|0;c[m>>2]=l+ -1;if(!l)jd[c[(c[k>>2]|0)+8>>2]&255](k);Hl(b,h+24|0,d,c[e>>2]|0,g,f);c[a>>2]=c[d>>2];i=j;return}function Hl(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;h=i;a=a+8|0;a=md[c[c[a>>2]>>2]&127](a)|0;f=(qk(d,e,a,a+168|0,g,f,0)|0)-a|0;if((f|0)>=168){i=h;return}c[b>>2]=((f|0)/12|0|0)%7|0;i=h;return}function Il(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;j=i;k=c[f+28>>2]|0;f=k+4|0;c[f>>2]=(c[f>>2]|0)+1;f=Sn(k,19072)|0;m=k+4|0;l=c[m>>2]|0;c[m>>2]=l+ -1;if(!l)jd[c[(c[k>>2]|0)+8>>2]&255](k);Jl(b,h+16|0,d,c[e>>2]|0,g,f);c[a>>2]=c[d>>2];i=j;return}function Jl(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;h=i;a=a+8|0;a=md[c[(c[a>>2]|0)+4>>2]&127](a)|0;f=(qk(d,e,a,a+288|0,g,f,0)|0)-a|0;if((f|0)>=288){i=h;return}c[b>>2]=((f|0)/12|0|0)%12|0;i=h;return}function Kl(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0;b=i;j=c[f+28>>2]|0;f=j+4|0;c[f>>2]=(c[f>>2]|0)+1;f=Sn(j,19072)|0;l=j+4|0;k=c[l>>2]|0;c[l>>2]=k+ -1;if(!k)jd[c[(c[j>>2]|0)+8>>2]&255](j);Ll(h+20|0,d,c[e>>2]|0,g,f);c[a>>2]=c[d>>2];i=b;return}function Ll(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0;g=i;f=Nl(b,d,e,f,4)|0;if(c[e>>2]&4){i=g;return}if((f|0)<69)e=f+2e3|0;else e=(f+ -69|0)>>>0<31?f+1900|0:f;c[a>>2]=e+ -1900;i=g;return}



function yd(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+15&-16;return b|0}function zd(){return i|0}function Ad(a){a=a|0;i=a}function Bd(a,b){a=a|0;b=b|0;if(!s){s=a;t=b}}function Cd(b){b=b|0;a[k>>0]=a[b>>0];a[k+1>>0]=a[b+1>>0];a[k+2>>0]=a[b+2>>0];a[k+3>>0]=a[b+3>>0]}function Dd(b){b=b|0;a[k>>0]=a[b>>0];a[k+1>>0]=a[b+1>>0];a[k+2>>0]=a[b+2>>0];a[k+3>>0]=a[b+3>>0];a[k+4>>0]=a[b+4>>0];a[k+5>>0]=a[b+5>>0];a[k+6>>0]=a[b+6>>0];a[k+7>>0]=a[b+7>>0]}function Ed(a){a=a|0;H=a}function Fd(){return H|0}function Gd(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,j=0,l=0,m=0,n=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,I=0,J=0,K=0,L=0,M=0.0,N=0.0,O=0.0,P=0.0,Q=0.0,R=0.0;g=i;i=i+224|0;s=g+24|0;q=g+80|0;m=g+200|0;j=g+184|0;l=g+104|0;C=g+216|0;B=g+88|0;y=g;t=Rg(14024,10064,9)|0;a[m>>0]=0;c[m+4>>2]=t;v=c[(c[t>>2]|0)+ -12>>2]|0;do if(!(c[t+(v+16)>>2]|0)){v=c[t+(v+72)>>2]|0;if(v)Fj(v);a[m>>0]=1;D=c[t+((c[(c[t>>2]|0)+ -12>>2]|0)+28)>>2]|0;x=D+4|0;c[x>>2]=(c[x>>2]|0)+1;w=Rn(17776)|0;v=c[D+8>>2]|0;if((c[D+12>>2]|0)-v>>2>>>0>w>>>0?(r=c[v+(w<<2)>>2]|0,(r|0)!=0):0){L=c[x>>2]|0;c[x>>2]=L+ -1;if(!L)jd[c[(c[D>>2]|0)+8>>2]&255](D);E=c[(c[t>>2]|0)+ -12>>2]|0;w=c[t+(E+24)>>2]|0;v=t+E|0;x=t+(E+76)|0;D=c[x>>2]|0;do if((D|0)==-1){D=c[t+(E+28)>>2]|0;E=D+4|0;c[E>>2]=(c[E>>2]|0)+1;F=Rn(19072)|0;G=c[D+8>>2]|0;if((c[D+12>>2]|0)-G>>2>>>0>F>>>0?(u=c[G+(F<<2)>>2]|0,(u|0)!=0):0){u=vd[c[(c[u>>2]|0)+28>>2]&63](u,32)|0;L=c[E>>2]|0;c[E>>2]=L+ -1;if(!L)jd[c[(c[D>>2]|0)+8>>2]&255](D);D=u<<24>>24;c[x>>2]=D;break}L=Wb(4)|0;c[L>>2]=27744;Zc(L|0,27816,228)}while(0);L=D&255;K=c[(c[r>>2]|0)+24>>2]|0;c[q>>2]=w;c[s+0>>2]=c[q+0>>2];ud[K&31](j,r,s,v,L,f);if(c[j>>2]|0)break;L=c[(c[t>>2]|0)+ -12>>2]|0;Zi(t+L|0,c[t+(L+16)>>2]|5);break}L=Wb(4)|0;c[L>>2]=27744;Zc(L|0,27816,228)}while(0);Qj(m);r=Rg(t,10080,6)|0;t=c[r+((c[(c[r>>2]|0)+ -12>>2]|0)+28)>>2]|0;u=t+4|0;c[u>>2]=(c[u>>2]|0)+1;w=Rn(19072)|0;v=c[t+8>>2]|0;if((c[t+12>>2]|0)-v>>2>>>0>w>>>0?(p=c[v+(w<<2)>>2]|0,(p|0)!=0):0){p=vd[c[(c[p>>2]|0)+28>>2]&63](p,10)|0;L=c[u>>2]|0;c[u>>2]=L+ -1;if(!L)jd[c[(c[t>>2]|0)+8>>2]&255](t);a[s>>0]=0;c[s+4>>2]=r;t=c[(c[r>>2]|0)+ -12>>2]|0;do if(!(c[r+(t+16)>>2]|0)){t=c[r+(t+72)>>2]|0;if(t)Fj(t);a[s>>0]=1;u=c[(c[r>>2]|0)+ -12>>2]|0;t=c[r+(u+24)>>2]|0;if(t){u=t+24|0;v=c[u>>2]|0;if((v|0)!=(c[t+28>>2]|0)){c[u>>2]=v+1;a[v>>0]=p;break}if((vd[c[(c[t>>2]|0)+52>>2]&63](t,p&255)|0)!=-1)break;u=c[(c[r>>2]|0)+ -12>>2]|0}Zi(r+u|0,c[r+(u+16)>>2]|1)}while(0);Qj(s);Fj(r);p=Tq(20)|0;a:do if(!p){while(1){p=c[6860]|0;c[6860]=p+0;if(!p)break;qd[p&3]();p=Tq(20)|0;if(p)break a}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);c[p>>2]=e;c[p+4>>2]=f;c[p+8>>2]=0;a[p+12>>0]=0;a[p+13>>0]=0;c[p+16>>2]=0;e=Tq(16)|0;b:do if(!e){while(1){f=c[6860]|0;c[6860]=f+0;if(!f)break;qd[f&3]();e=Tq(16)|0;if(e)break b}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);c[e+4>>2]=0;c[e+8>>2]=0;c[e>>2]=12e3;c[e+12>>2]=p;c[b>>2]=p;L=b+4|0;f=c[L>>2]|0;c[L>>2]=e;if(f){K=f+4|0;L=c[K>>2]|0;c[K>>2]=L+ -1;if((L|0)==0?(jd[c[(c[f>>2]|0)+8>>2]&255](f),K=f+8|0,L=c[K>>2]|0,c[K>>2]=L+ -1,(L|0)==0):0)jd[c[(c[f>>2]|0)+16>>2]&255](f);p=c[b>>2]|0}f=Tq(352)|0;c:do if(!f){while(1){f=c[6860]|0;c[6860]=f+0;if(!f)break;qd[f&3]();f=Tq(352)|0;if(f)break c}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);c[f>>2]=p;c[f+4>>2]=p;e=f+8|0;c[e>>2]=0;p=f+12|0;c[p>>2]=0;w=Tq(1048644)|0;x=w+68&-64;c[x+ -4>>2]=w;c[f+16>>2]=x;x=f+279|0;a[x>>0]=0;a[x+1>>0]=0;w=f+281|0;a[w>>0]=0;a[w+1>>0]=0;a[w+2>>0]=0;a[w+3>>0]=0;t=f+288|0;r=f+292|0;v=f+300|0;u=f+304|0;F=f+344|0;D=t+0|0;E=D+56|0;do{c[D>>2]=0;D=D+4|0}while((D|0)<(E|0));D=F;c[D>>2]=-1;c[D+4>>2]=-1;D=c[f>>2]|0;E=D+13|0;if(!(a[E>>0]|0)){L=D+4|0;I=D+8|0;K=c[I>>2]|0;J=(c[L>>2]|0)-K|0;J=(J|0)<4?J:4;pr(C|0,(c[D>>2]|0)+K|0,J|0)|0;K=(c[I>>2]|0)+J|0;c[I>>2]=K;c[D+16>>2]=J;if((K|0)>=(c[L>>2]|0))a[E>>0]=1}else a[D+12>>0]=1;a[B>>0]=8;a[B+1>>0]=a[C>>0]|0;a[B+2>>0]=a[C+1>>0]|0;a[B+3>>0]=a[C+2>>0]|0;a[B+4>>0]=a[C+3>>0]|0;a[B+(C+(4-C))+1>>0]=0;C=(Qi(B,10088)|0)==0;if(a[B>>0]&1)Uq(c[B+8>>2]|0);if(!C){b=Wb(8)|0;c[b>>2]=27520;g=b+4|0;j=Tq(36)|0;d:do if(!j){while(1){j=c[6860]|0;c[6860]=j+0;if(!j)break;qd[j&3]();j=Tq(36)|0;if(j)break d}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);c[j>>2]=23;c[j+4>>2]=23;c[j+8>>2]=0;j=j+12|0;D=j+0|0;y=11664;E=D+24|0;do{a[D>>0]=a[y>>0]|0;D=D+1|0;y=y+1|0}while((D|0)<(E|0));c[g>>2]=j;c[b>>2]=11696;Zc(b|0,10128,115)}B=c[f>>2]|0;if((c[B+4>>2]|0)>0)c[B+8>>2]=0;else a[B+12>>0]=1;D=c[f>>2]|0;B=f+20|0;C=D+13|0;if(!(a[C>>0]|0)){L=D+4|0;I=D+8|0;K=c[I>>2]|0;J=(c[L>>2]|0)-K|0;J=(J|0)<227?J:227;pr(B|0,(c[D>>2]|0)+K|0,J|0)|0;K=(c[I>>2]|0)+J|0;c[I>>2]=K;c[D+16>>2]=J;if((K|0)>=(c[L>>2]|0))a[C>>0]=1}else a[D+12>>0]=1;F=f+199|0;a[k>>0]=a[F>>0];a[k+1>>0]=a[F+1>>0];a[k+2>>0]=a[F+2>>0];a[k+3>>0]=a[F+3>>0];a[k+4>>0]=a[F+4>>0];a[k+5>>0]=a[F+5>>0];a[k+6>>0]=a[F+6>>0];a[k+7>>0]=a[F+7>>0];Q=+h[k>>3];I=f+207|0;a[k>>0]=a[I>>0];a[k+1>>0]=a[I+1>>0];a[k+2>>0]=a[I+2>>0];a[k+3>>0]=a[I+3>>0];a[k+4>>0]=a[I+4>>0];a[k+5>>0]=a[I+5>>0];a[k+6>>0]=a[I+6>>0];a[k+7>>0]=a[I+7>>0];R=+h[k>>3];K=f+215|0;a[k>>0]=a[K>>0];a[k+1>>0]=a[K+1>>0];a[k+2>>0]=a[K+2>>0];a[k+3>>0]=a[K+3>>0];a[k+4>>0]=a[K+4>>0];a[k+5>>0]=a[K+5>>0];a[k+6>>0]=a[K+6>>0];a[k+7>>0]=a[K+7>>0];O=+h[k>>3];G=f+223|0;a[k>>0]=a[G>>0];a[k+1>>0]=a[G+1>>0];a[k+2>>0]=a[G+2>>0];a[k+3>>0]=a[G+3>>0];a[k+4>>0]=a[G+4>>0];a[k+5>>0]=a[G+5>>0];a[k+6>>0]=a[G+6>>0];a[k+7>>0]=a[G+7>>0];P=+h[k>>3];J=f+231|0;a[k>>0]=a[J>>0];a[k+1>>0]=a[J+1>>0];a[k+2>>0]=a[J+2>>0];a[k+3>>0]=a[J+3>>0];a[k+4>>0]=a[J+4>>0];a[k+5>>0]=a[J+5>>0];a[k+6>>0]=a[J+6>>0];a[k+7>>0]=a[J+7>>0];M=+h[k>>3];L=f+239|0;a[k>>0]=a[L>>0];a[k+1>>0]=a[L+1>>0];a[k+2>>0]=a[L+2>>0];a[k+3>>0]=a[L+3>>0];a[k+4>>0]=a[L+4>>0];a[k+5>>0]=a[L+5>>0];a[k+6>>0]=a[L+6>>0];a[k+7>>0]=a[L+7>>0];N=+h[k>>3];h[k>>3]=R;a[F>>0]=a[k>>0];a[F+1>>0]=a[k+1>>0];a[F+2>>0]=a[k+2>>0];a[F+3>>0]=a[k+3>>0];a[F+4>>0]=a[k+4>>0];a[F+5>>0]=a[k+5>>0];a[F+6>>0]=a[k+6>>0];a[F+7>>0]=a[k+7>>0];h[k>>3]=Q;a[G>>0]=a[k>>0];a[G+1>>0]=a[k+1>>0];a[G+2>>0]=a[k+2>>0];a[G+3>>0]=a[k+3>>0];a[G+4>>0]=a[k+4>>0];a[G+5>>0]=a[k+5>>0];a[G+6>>0]=a[k+6>>0];a[G+7>>0]=a[k+7>>0];h[k>>3]=P;a[I>>0]=a[k>>0];a[I+1>>0]=a[k+1>>0];a[I+2>>0]=a[k+2>>0];a[I+3>>0]=a[k+3>>0];a[I+4>>0]=a[k+4>>0];a[I+5>>0]=a[k+5>>0];a[I+6>>0]=a[k+6>>0];a[I+7>>0]=a[k+7>>0];h[k>>3]=O;a[J>>0]=a[k>>0];a[J+1>>0]=a[k+1>>0];a[J+2>>0]=a[k+2>>0];a[J+3>>0]=a[k+3>>0];a[J+4>>0]=a[k+4>>0];a[J+5>>0]=a[k+5>>0];a[J+6>>0]=a[k+6>>0];a[J+7>>0]=a[k+7>>0];h[k>>3]=N;a[K>>0]=a[k>>0];a[K+1>>0]=a[k+1>>0];a[K+2>>0]=a[k+2>>0];a[K+3>>0]=a[k+3>>0];a[K+4>>0]=a[k+4>>0];a[K+5>>0]=a[k+5>>0];a[K+6>>0]=a[k+6>>0];a[K+7>>0]=a[k+7>>0];h[k>>3]=M;a[L>>0]=a[k>>0];a[L+1>>0]=a[k+1>>0];a[L+2>>0]=a[k+2>>0];a[L+3>>0]=a[k+3>>0];a[L+4>>0]=a[k+4>>0];a[L+5>>0]=a[k+5>>0];a[L+6>>0]=a[k+6>>0];a[L+7>>0]=a[k+7>>0];if((a[10976]|0)==0?(Fa(10976)|0)!=0:0){c[2740]=0;c[2741]=0;c[2742]=0;eb(238,10960,o|0)|0;Vc(10976)}if((a[11008]|0)==0?(Fa(11008)|0)!=0:0){eb(239,10984,o|0)|0;Vc(11008)}D=c[2740]|0;C=c[2741]|0;do if((D|0)==(C|0)){C=Cc(10984)|0;if(C){g=Wb(16)|0;do if(!(a[15688]|0)){if(!(Fa(15688)|0))break;c[3920]=15952;Vc(15688)}while(0);yi(g,C,15680,16040);Zc(g|0,15752,133)}D=c[2740]|0;do if((D|0)==(c[2741]|0)){C=s+16|0;c[C>>2]=s;c[s>>2]=11024;E=c[2742]|0;do if(D>>>0<E>>>0){if(!D)D=0;else{c[D+16>>2]=D;L=c[C>>2]|0;kd[c[(c[L>>2]|0)+12>>2]&63](L,D);D=c[2741]|0}c[2741]=D+24}else{D=(E-D|0)/24|0;if(D>>>0<89478485){D=D<<1;D=(D|0)==0?1:D}else D=178956970;E=D*24|0;E=(E|0)==0?1:E;F=Tq(E)|0;e:do if(!F){while(1){F=c[6860]|0;c[6860]=F+0;if(!F)break;qd[F&3]();F=Tq(E)|0;if(F)break e}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);D=F+(D*24|0)|0;do if(F){E=c[C>>2]|0;if(!E){c[F+16>>2]=0;break}if((E|0)==(s|0)){c[F+16>>2]=F;kd[c[(c[s>>2]|0)+12>>2]&63](s,F);break}else{c[F+16>>2]=E;c[C>>2]=0;break}}while(0);E=F+24|0;G=c[2740]|0;I=c[2741]|0;do if((I|0)==(G|0)){c[2740]=F;c[2741]=E;c[2742]=D}else{do{J=F;F=F+ -24|0;K=I+ -8|0;I=I+ -24|0;L=c[K>>2]|0;do if(L)if((L|0)==(I|0)){c[J+ -8>>2]=F;L=c[K>>2]|0;kd[c[(c[L>>2]|0)+12>>2]&63](L,F);break}else{c[J+ -8>>2]=L;c[K>>2]=0;break}else c[J+ -8>>2]=0;while(0)}while((I|0)!=(G|0));G=c[2740]|0;I=c[2741]|0;c[2740]=F;c[2741]=E;c[2742]=D;if((I|0)==(G|0))break;do{D=c[I+ -8>>2]|0;I=I+ -24|0;do if((D|0)==(I|0))jd[c[(c[D>>2]|0)+16>>2]&255](D);else{if(!D)break;jd[c[(c[D>>2]|0)+20>>2]&255](D)}while(0)}while((I|0)!=(G|0))}while(0);if(!G)break;Uq(G)}while(0);C=c[C>>2]|0;if((C|0)==(s|0)){jd[c[(c[s>>2]|0)+16>>2]&255](s);break}if(!C)break;jd[c[(c[C>>2]|0)+20>>2]&255](C)}while(0);if(!(zb(10984)|0)){A=c[2740]|0;z=c[2741]|0;break}Ha(16064,16072,47,16144)}else{A=D;z=C}while(0);f:do if((A|0)!=(z|0)){C=y+16|0;while(1){D=A+16|0;E=c[D>>2]|0;if(!E){n=148;break}if((E|0)==(A|0)){c[C>>2]=y;D=c[D>>2]|0;kd[c[(c[D>>2]|0)+12>>2]&63](D,y);D=c[C>>2]|0}else{D=md[c[(c[E>>2]|0)+8>>2]&127](E)|0;c[C>>2]=D}if(!D)break;kd[c[(c[D>>2]|0)+24>>2]&63](D,B);D=c[C>>2]|0;do if((D|0)==(y|0))jd[c[(c[y>>2]|0)+16>>2]&255](y);else{if(!D)break;jd[c[(c[D>>2]|0)+20>>2]&255](D)}while(0);A=A+24|0;if((A|0)==(z|0))break f}if((n|0)==148)c[C>>2]=0;L=Wb(4)|0;c[L>>2]=10944;Zc(L|0,10920,105)}while(0);y=c[f>>2]|0;z=f+114|0;z=d[z>>0]|d[z+1>>0]<<8;L=c[y+4>>2]|0;K=((L|0)<0)<<31>>31;if(0<(K|0)|0==(K|0)&(z&65535)>>>0<L>>>0)c[y+8>>2]=z&65535;else a[y+12>>0]=1;A=f+120|0;g:do if(d[A>>0]|d[A+1>>0]<<8|d[A+2>>0]<<16|d[A+3>>0]<<24){z=s+2|0;D=s+16|0;C=s+18|0;B=s+20|0;y=0;while(1){K=(c[f>>2]|0)+12|0;L=a[K>>0]|0;a[K>>0]=0;if(L<<24>>24)break g;F=c[f>>2]|0;E=F+13|0;if(a[E>>0]|0)break g;L=F+4|0;I=F+8|0;K=c[I>>2]|0;J=(c[L>>2]|0)-K|0;J=(J|0)<54?J:54;pr(s|0,(c[F>>2]|0)+K|0,J|0)|0;K=(c[I>>2]|0)+J|0;c[I>>2]=K;c[F+16>>2]=J;if((K|0)<(c[L>>2]|0)){F=z;E=10616}else{a[E>>0]=1;F=z;E=10616}while(1){if((a[F>>0]|0)!=(a[E>>0]|0))break;F=F+1|0;if((F|0)==(D|0)){n=174;break}else E=E+1|0}if((n|0)==174?(n=0,(d[C>>0]|d[C+1>>0]<<8)<<16>>16==22204):0)break;E=c[f>>2]|0;G=E+8|0;F=c[G>>2]|0;F=kr(F|0,((F|0)<0)<<31>>31|0,(d[B>>0]|d[B+1>>0]<<8)&65535|0,0)|0;L=H;K=c[E+4>>2]|0;J=((K|0)<0)<<31>>31;E=E+12|0;if((L|0)>(J|0)|(L|0)==(J|0)&F>>>0>=K>>>0|(L|0)<0)a[E>>0]=1;else{a[E>>0]=0;c[G>>2]=F}y=y+1|0;if(y>>>0>=(d[A>>0]|d[A+1>>0]<<8|d[A+2>>0]<<16|d[A+3>>0]<<24)>>>0)break g}A=d[B>>0]|d[B+1>>0]<<8;y=A&65535;A=A<<16>>16==0?1:y;z=Tq(A)|0;h:do if(!z){while(1){z=c[6860]|0;c[6860]=z+0;if(!z)break;qd[z&3]();z=Tq(A)|0;if(z)break h}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);A=c[f>>2]|0;B=A+13|0;do if(!(a[B>>0]|0)){L=A+4|0;I=A+8|0;K=c[I>>2]|0;J=(c[L>>2]|0)-K|0;J=(J|0)<(y|0)?J:y;pr(z|0,(c[A>>2]|0)+K|0,J|0)|0;K=(c[I>>2]|0)+J|0;c[I>>2]=K;c[A+16>>2]=J;if((K|0)<(c[L>>2]|0))break;a[B>>0]=1}else a[A+12>>0]=1;while(0);A=f+247|0;D=A+0|0;y=z+0|0;E=D+34|0;do{a[D>>0]=a[y>>0]|0;D=D+1|0;y=y+1|0}while((D|0)<(E|0));if((d[A>>0]|d[A+1>>0]<<8)<<16>>16!=2){b=Wb(8)|0;c[b>>2]=27520;g=b+4|0;j=Tq(68)|0;i:do if(!j){while(1){j=c[6860]|0;c[6860]=j+0;if(!j)break;qd[j&3]();j=Tq(68)|0;if(j)break i}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);c[j>>2]=55;c[j+4>>2]=55;c[j+8>>2]=0;j=j+12|0;D=j+0|0;y=10808;E=D+56|0;do{a[D>>0]=a[y>>0]|0;D=D+1|0;y=y+1|0}while((D|0)<(E|0));c[g>>2]=j;c[b>>2]=10872;Zc(b|0,10792,103)}y=d[x>>0]|d[x+1>>0]<<8;A=(y&65535)*6|0;A=(A|0)==0?1:A;B=Tq(A)|0;j:do if(!B){while(1){B=c[6860]|0;c[6860]=B+0;if(!B)break;qd[B&3]();B=Tq(A)|0;if(B)break j}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);a[w>>0]=B;a[w+1>>0]=B>>8;a[w+2>>0]=B>>16;a[w+3>>0]=B>>24;k:do if(!(y<<16>>16))B=0;else{A=z+34|0;a[B+0>>0]=a[A+0>>0]|0;a[B+1>>0]=a[A+1>>0]|0;a[B+2>>0]=a[A+2>>0]|0;a[B+3>>0]=a[A+3>>0]|0;a[B+4>>0]=a[A+4>>0]|0;a[B+5>>0]=a[A+5>>0]|0;if((y&65535)>1)y=1;else{B=1;break}while(1){A=A+6|0;pr(B+(y*6|0)|0,A|0,6)|0;y=y+1|0;B=d[x>>0]|d[x+1>>0]<<8;if((y|0)>=(B&65535|0))break k;B=d[w>>0]|d[w+1>>0]<<8|d[w+2>>0]<<16|d[w+3>>0]<<24}}while(0);if(z){Uq(z);B=d[x>>0]|d[x+1>>0]<<8}l:do if(B<<16>>16){y=f+308|0;z=0;m:while(1){D=d[w>>0]|d[w+1>>0]<<8|d[w+2>>0]<<16|d[w+3>>0]<<24;C=D+(z*6|0)|0;C=(d[C>>0]|d[C+1>>0]<<8)&65535;A=D+(z*6|0)+2|0;A=(d[A>>0]|d[A+1>>0]<<8)&65535;D=D+(z*6|0)+4|0;D=(d[D>>0]|d[D+1>>0]<<8)&65535;E=c[u>>2]|0;do if((E|0)==(c[y>>2]|0)){B=c[v>>2]|0;F=E-B|0;G=(F|0)/12|0;E=G+1|0;if(E>>>0>357913941){n=225;break m}if(G>>>0<178956970){I=G<<1;I=I>>>0<E>>>0?E:I;if(!I){I=0;K=0}else n=229}else{I=357913941;n=229}if((n|0)==229){n=0;J=I*12|0;J=(J|0)==0?1:J;K=Tq(J)|0;if(!K)do{K=c[6860]|0;c[6860]=K+0;if(!K){n=233;break m}qd[K&3]();K=Tq(J)|0}while((K|0)==0)}J=K+(G*12|0)|0;if(J){c[J>>2]=C;c[K+(G*12|0)+4>>2]=A;c[K+(G*12|0)+8>>2]=D}L=K+((((F|0)/-12|0)+G|0)*12|0)|0;nr(L|0,B|0,F|0)|0;c[v>>2]=L;c[u>>2]=K+(E*12|0);c[y>>2]=K+(I*12|0);if(!B)break;Uq(B)}else{if(!E)A=0;else{c[E>>2]=C;c[E+4>>2]=A;c[E+8>>2]=D;A=c[u>>2]|0}c[u>>2]=A+12}while(0);z=z+1|0;if((z|0)>=((d[x>>0]|d[x+1>>0]<<8)&65535|0))break l}if((n|0)==225)Mn();else if((n|0)==233){L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}}while(0);w=c[f>>2]|0;u=f+116|0;v=d[u>>0]|d[u+1>>0]<<8|d[u+2>>0]<<16|d[u+3>>0]<<24;L=c[w+4>>2]|0;K=((L|0)<0)<<31>>31;if(0<(K|0)|0==(K|0)&v>>>0<L>>>0)c[w+8>>2]=v;else a[w+12>>0]=1;w=s;c[w>>2]=0;c[w+4>>2]=0;w=c[f>>2]|0;v=w+13|0;do if(!(a[v>>0]|0)){L=c[w+4>>2]|0;I=w+8|0;K=c[I>>2]|0;J=L-K|0;J=(J|0)<8?J:8;nr(s|0,(c[w>>2]|0)+K|0,J|0)|0;K=K+J|0;c[I>>2]=K;c[w+16>>2]=J;if((K|0)<(L|0))break;a[v>>0]=1}else a[w+12>>0]=1;while(0);K=(c[f>>2]|0)+12|0;L=a[K>>0]|0;a[K>>0]=0;if(L<<24>>24){g=Wb(8)|0;c[g>>2]=27520;b=g+4|0;j=Tq(56)|0;n:do if(!j){while(1){j=c[6860]|0;c[6860]=j+0;if(!j)break;qd[j&3]();j=Tq(56)|0;if(j)break n}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);c[j>>2]=43;c[j+4>>2]=43;c[j+8>>2]=0;j=j+12|0;D=j+0|0;y=10544;E=D+44|0;do{a[D>>0]=a[y>>0]|0;D=D+1|0;y=y+1|0}while((D|0)<(E|0));c[b>>2]=j;c[g>>2]=10600;Zc(g|0,10184,99)}v=s;w=c[v>>2]|0;v=c[v+4>>2]|0;if((w|0)==-1&(v|0)==-1){g=Wb(8)|0;c[g>>2]=27520;b=g+4|0;j=Tq(67)|0;o:do if(!j){while(1){j=c[6860]|0;c[6860]=j+0;if(!j)break;qd[j&3]();j=Tq(67)|0;if(j)break o}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);c[j>>2]=54;c[j+4>>2]=54;c[j+8>>2]=0;j=j+12|0;D=j+0|0;y=10200;E=D+55|0;do{a[D>>0]=a[y>>0]|0;D=D+1|0;y=y+1|0}while((D|0)<(E|0));c[b>>2]=j;c[g>>2]=10528;Zc(g|0,10288,97)}s=c[f>>2]|0;L=c[s+4>>2]|0;K=((L|0)<0)<<31>>31;if((v|0)<(K|0)|(v|0)==(K|0)&w>>>0<L>>>0)c[s+8>>2]=w;else a[s+12>>0]=1;K=(c[f>>2]|0)+12|0;L=a[K>>0]|0;a[K>>0]=0;if(L<<24>>24){g=Wb(8)|0;c[g>>2]=27520;b=g+4|0;j=Tq(56)|0;p:do if(!j){while(1){j=c[6860]|0;c[6860]=j+0;if(!j)break;qd[j&3]();j=Tq(56)|0;if(j)break p}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);c[j>>2]=43;c[j+4>>2]=43;c[j+8>>2]=0;j=j+12|0;D=j+0|0;y=10544;E=D+44|0;do{a[D>>0]=a[y>>0]|0;D=D+1|0;y=y+1|0}while((D|0)<(E|0));c[b>>2]=j;c[g>>2]=10600;Zc(g|0,10184,99)}s=c[f>>2]|0;v=s+13|0;do if(!(a[v>>0]|0)){L=c[s+4>>2]|0;I=s+8|0;K=c[I>>2]|0;J=L-K|0;J=(J|0)<8?J:8;nr(q|0,(c[s>>2]|0)+K|0,J|0)|0;K=K+J|0;c[I>>2]=K;c[s+16>>2]=J;if((K|0)<(L|0))break;a[v>>0]=1}else a[s+12>>0]=1;while(0);K=(c[f>>2]|0)+12|0;L=a[K>>0]|0;a[K>>0]=0;if(L<<24>>24){b=Wb(8)|0;c[b>>2]=27520;g=b+4|0;j=Tq(56)|0;q:do if(!j){while(1){j=c[6860]|0;c[6860]=j+0;if(!j)break;qd[j&3]();j=Tq(56)|0;if(j)break q}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);c[j>>2]=43;c[j+4>>2]=43;c[j+8>>2]=0;j=j+12|0;D=j+0|0;y=10544;E=D+44|0;do{a[D>>0]=a[y>>0]|0;D=D+1|0;y=y+1|0}while((D|0)<(E|0));c[g>>2]=j;c[b>>2]=10600;Zc(b|0,10184,99)}if(c[q>>2]|0){g=Wb(8)|0;c[g>>2]=27520;b=g+4|0;j=Tq(54)|0;r:do if(!j){while(1){j=c[6860]|0;c[6860]=j+0;if(!j)break;qd[j&3]();j=Tq(54)|0;if(j)break r}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);c[j>>2]=41;c[j+4>>2]=41;c[j+8>>2]=0;j=j+12|0;D=j+0|0;y=10448;E=D+42|0;do{a[D>>0]=a[y>>0]|0;D=D+1|0;y=y+1|0}while((D|0)<(E|0));c[b>>2]=j;c[g>>2]=10504;Zc(g|0,10344,95)}s=c[t>>2]|0;v=c[r>>2]|0;if((v|0)==(s|0))y=s;else{y=v+(~((v+ -8+(0-s)|0)>>>3)<<3)|0;c[r>>2]=y}L=f+259|0;if((d[L>>0]|d[L+1>>0]<<8|d[L+2>>0]<<16|d[L+3>>0]<<24|0)==-1){b=Wb(8)|0;c[b>>2]=27520;g=b+4|0;j=Tq(96)|0;s:do if(!j){while(1){j=c[6860]|0;c[6860]=j+0;if(!j)break;qd[j&3]();j=Tq(96)|0;if(j)break s}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);c[j>>2]=83;c[j+4>>2]=83;c[j+8>>2]=0;j=j+12|0;D=j+0|0;y=10360;E=D+84|0;do{a[D>>0]=a[y>>0]|0;D=D+1|0;y=y+1|0}while((D|0)<(E|0));c[g>>2]=j;c[b>>2]=10528;Zc(b|0,10288,97)}q=q+4|0;v=c[q>>2]|0;w=v+1|0;B=s;x=y-B>>3;do if(x>>>0<w>>>0){x=w-x|0;w=f+296|0;C=c[w>>2]|0;z=y;if(C-z>>3>>>0>=x>>>0){n=x;w=y;while(1){if(w){L=w;c[L>>2]=0;c[L+4>>2]=0}n=n+ -1|0;if(!n)break;else w=w+8|0}c[r>>2]=y+(x<<3);break}z=z-B|0;A=z>>3;y=A+x|0;if(y>>>0>536870911)Mn();B=C-B|0;if(B>>3>>>0<268435455){B=B>>2;B=B>>>0<y>>>0?y:B;if(!B){B=0;C=0}else n=322}else{B=536870911;n=322}if((n|0)==322){n=B<<3;n=(n|0)==0?1:n;C=Tq(n)|0;t:do if(!C){while(1){C=c[6860]|0;c[6860]=C+0;if(!C)break;qd[C&3]();C=Tq(n)|0;if(C)break t}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0)}n=C+(A<<3)|0;while(1){if(n){L=n;c[L>>2]=0;c[L+4>>2]=0}x=x+ -1|0;if(!x)break;else n=n+8|0}nr(C|0,s|0,z|0)|0;c[t>>2]=C;c[r>>2]=C+(y<<3);c[w>>2]=C+(B<<3);if(!s){s=C;break}Uq(s);s=c[t>>2]|0}else{if(x>>>0<=w>>>0)break;n=s+(w<<3)|0;if((y|0)==(n|0))break;c[r>>2]=y+(~((y+ -8+(0-n)|0)>>>3)<<3)}while(0);L=s;c[L>>2]=(d[u>>0]|d[u+1>>0]<<8|d[u+2>>0]<<16|d[u+3>>0]<<24)+8;c[L+4>>2]=0;if(v>>>0>1){c[m>>2]=c[f>>2];c[m+4>>2]=0;c[m+8>>2]=0;n=m+12|0;v=Tq(1048644)|0;L=v+68&-64;c[L+ -4>>2]=v;c[n>>2]=L;c[j>>2]=m;L=j+4|0;c[L>>2]=0;c[j+8>>2]=-1;c[l+4>>2]=32;c[l+8>>2]=2;c[l+12>>2]=8;c[l+16>>2]=0;v=l+36|0;c[v>>2]=0;s=l+40|0;c[s>>2]=0;c[l+44>>2]=0;c[l+60>>2]=1;c[l+64>>2]=2;c[l+56>>2]=4096;c[l+52>>2]=4;c[l+48>>2]=4;w=l+68|0;c[w>>2]=0;x=l+72|0;c[x>>2]=0;c[l+76>>2]=0;c[l+20>>2]=32;y=l+24|0;c[y>>2]=0;c[l+28>>2]=-2147483648;c[l+32>>2]=2147483647;c[l>>2]=0;J=Wf(m)|0;I=Wf(m)|0;K=Wf(m)|0;c[L>>2]=(I&255)<<16|(J&255)<<24|(K&255)<<8|(Wf(m)|0)&255;ge(l);m=c[q>>2]|0;if(!m)A=c[t>>2]|0;else{q=1;do{if(q>>>0>1)z=c[(c[t>>2]|0)+(q+ -1<<3)>>2]|0;else z=0;A=($f(l,j,(c[v>>2]|0)+44|0)|0)+z|0;z=c[y>>2]|0;if((A|0)<0)z=z+A|0;else z=A-(A>>>0<z>>>0?0:z)|0;A=c[t>>2]|0;L=A+(q<<3)|0;c[L>>2]=z;c[L+4>>2]=((z|0)<0)<<31>>31;q=q+1|0}while(q>>>0<=m>>>0)}j=(c[r>>2]|0)-A>>3;if(j>>>0>1){m=A;l=c[m>>2]|0;m=c[m+4>>2]|0;q=1;do{L=A+(q<<3)|0;K=L;l=kr(c[K>>2]|0,c[K+4>>2]|0,l|0,m|0)|0;m=H;c[L>>2]=l;c[L+4>>2]=m;q=q+1|0}while(q>>>0<j>>>0)}j=c[w>>2]|0;if(j){l=c[x>>2]|0;if((l|0)!=(j|0)){do{c[x>>2]=l+ -44;m=c[l+ -36>>2]|0;if(m)Uq(c[m+ -4>>2]|0);m=c[l+ -32>>2]|0;if(m)Uq(c[m+ -4>>2]|0);l=c[l+ -28>>2]|0;if(l)Uq(c[l+ -4>>2]|0);l=c[x>>2]|0}while((l|0)!=(j|0));j=c[w>>2]|0}Uq(j)}j=c[v>>2]|0;if(j){l=c[s>>2]|0;if((l|0)!=(j|0)){do{c[s>>2]=l+ -44;m=c[l+ -36>>2]|0;if(m)Uq(c[m+ -4>>2]|0);m=c[l+ -32>>2]|0;if(m)Uq(c[m+ -4>>2]|0);l=c[l+ -28>>2]|0;if(l)Uq(c[l+ -4>>2]|0);l=c[s>>2]|0}while((l|0)!=(j|0));j=c[v>>2]|0}Uq(j)}Uq(c[(c[n>>2]|0)+ -4>>2]|0)}j=c[f>>2]|0;a[j+12>>0]=0;a[j+13>>0]=0;j=c[f>>2]|0;l=(d[u>>0]|d[u+1>>0]<<8|d[u+2>>0]<<16|d[u+3>>0]<<24)+8|0;L=c[j+4>>2]|0;K=((L|0)<0)<<31>>31;if(0<(K|0)|0==(K|0)&l>>>0<L>>>0)c[j+8>>2]=l;else a[j+12>>0]=1;c[p>>2]=0;c[e>>2]=0;j=Tq(16)|0;u:do if(!j){while(1){j=c[6860]|0;c[6860]=j+0;if(!j)break;qd[j&3]();j=Tq(16)|0;if(j)break u}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);c[j+4>>2]=0;c[j+8>>2]=0;c[j>>2]=11720;c[j+12>>2]=f;c[b+8>>2]=f;L=b+12|0;b=c[L>>2]|0;c[L>>2]=j;if(!b){i=g;return}K=b+4|0;L=c[K>>2]|0;c[K>>2]=L+ -1;if(L){i=g;return}jd[c[(c[b>>2]|0)+8>>2]&255](b);K=b+8|0;L=c[K>>2]|0;c[K>>2]=L+ -1;if(L){i=g;return}jd[c[(c[b>>2]|0)+16>>2]&255](b);i=g;return}while(0);g=Wb(8)|0;c[g>>2]=27520;b=g+4|0;j=Tq(56)|0;v:do if(!j){while(1){j=c[6860]|0;c[6860]=j+0;if(!j)break;qd[j&3]();j=Tq(56)|0;if(j)break v}L=Wb(4)|0;c[L>>2]=27280;Zc(L|0,27328,220)}while(0);c[j>>2]=43;c[j+4>>2]=43;c[j+8>>2]=0;j=j+12|0;D=j+0|0;y=10680;E=D+44|0;do{a[D>>0]=a[y>>0]|0;D=D+1|0;y=y+1|0}while((D|0)<(E|0));c[b>>2]=j;c[g>>2]=10736;Zc(g|0,10664,101)}L=Wb(4)|0;c[L>>2]=27744;Zc(L|0,27816,228)}function Hd(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;f=i;i=i+176|0;r=f+160|0;m=f+16|0;g=f;b=c[b+8>>2]|0;j=b+336|0;x=j;y=b+259|0;h=b+320|0;if((!((c[x+4>>2]|0)==0?(c[x>>2]|0)==(d[y>>0]|d[y+1>>0]<<8|d[y+2>>0]<<16|d[y+3>>0]<<24|0):0)?(k=c[h>>2]|0,(k|0)!=0):0)?(c[b+312>>2]|0)!=0:0){v=k;x=c[v>>2]|0;x=c[x>>2]|0;kd[x&63](v,e);v=j;x=v;x=c[x>>2]|0;v=v+4|0;v=c[v>>2]|0;v=kr(x|0,v|0,1,0)|0;x=H;y=j;w=y;c[w>>2]=v;y=y+4|0;c[y>>2]=x;i=f;return}c[h>>2]=0;k=b+324|0;l=c[k>>2]|0;c[k>>2]=0;if(((l|0)!=0?(x=l+4|0,y=c[x>>2]|0,c[x>>2]=y+ -1,(y|0)==0):0)?(jd[c[(c[l>>2]|0)+8>>2]&255](l),x=l+8|0,y=c[x>>2]|0,c[x>>2]=y+ -1,(y|0)==0):0)jd[c[(c[l>>2]|0)+16>>2]&255](l);n=b+312|0;c[n>>2]=0;o=b+316|0;l=c[o>>2]|0;c[o>>2]=0;if(((l|0)!=0?(x=l+4|0,y=c[x>>2]|0,c[x>>2]=y+ -1,(y|0)==0):0)?(jd[c[(c[l>>2]|0)+8>>2]&255](l),x=l+8|0,y=c[x>>2]|0,c[x>>2]=y+ -1,(y|0)==0):0)jd[c[(c[l>>2]|0)+16>>2]&255](l);l=Tq(12)|0;a:do if(!l){while(1){l=c[6860]|0;c[6860]=l+0;if(!l)break;qd[l&3]();l=Tq(12)|0;if(l)break a}y=Wb(4)|0;c[y>>2]=27280;Zc(y|0,27328,220)}while(0);c[l>>2]=b+4;c[l+4>>2]=0;c[l+8>>2]=-1;q=Tq(16)|0;b:do if(!q){while(1){p=c[6860]|0;c[6860]=p+0;if(!p)break;qd[p&3]();q=Tq(16)|0;if(q)break b}y=Wb(4)|0;c[y>>2]=27280;Zc(y|0,27328,220)}while(0);c[q+4>>2]=0;c[q+8>>2]=0;c[q>>2]=9736;c[q+12>>2]=l;c[n>>2]=l;p=c[o>>2]|0;c[o>>2]=q;if(p){x=p+4|0;y=c[x>>2]|0;c[x>>2]=y+ -1;if((y|0)==0?(jd[c[(c[p>>2]|0)+8>>2]&255](p),x=p+8|0,y=c[x>>2]|0,c[x>>2]=y+ -1,(y|0)==0):0)jd[c[(c[p>>2]|0)+16>>2]&255](p);l=c[n>>2]|0}n=m+64|0;o=m+8|0;c[o>>2]=9416;p=m+12|0;c[m>>2]=9548;c[n>>2]=9568;c[m+4>>2]=0;c[m+88>>2]=p;c[m+80>>2]=0;c[m+84>>2]=0;c[m+68>>2]=4098;c[m+76>>2]=0;c[m+72>>2]=6;t=m+92|0;q=m+96|0;s=q+40|0;do{c[q>>2]=0;q=q+4|0}while((q|0)<(s|0));Qn(t);c[m+136>>2]=0;c[m+140>>2]=-1;c[m>>2]=9396;c[n>>2]=9436;c[o>>2]=9416;c[p>>2]=16248;Qn(m+16|0);t=m+20|0;c[t+0>>2]=0;c[t+4>>2]=0;c[t+8>>2]=0;c[t+12>>2]=0;c[t+16>>2]=0;c[t+20>>2]=0;c[p>>2]=9584;q=m+44|0;u=m+60|0;c[q+0>>2]=0;c[q+4>>2]=0;c[q+8>>2]=0;c[q+12>>2]=0;c[u>>2]=24;c[r+0>>2]=0;c[r+4>>2]=0;c[r+8>>2]=0;Ji(q,r+1|0,0);s=m+56|0;c[s>>2]=0;v=c[u>>2]|0;if(v&8){w=a[q>>0]|0;if(!(w&1)){w=q+((w&255)>>>1)+1|0;c[s>>2]=w;x=q+1|0}else{x=c[m+52>>2]|0;w=x+(c[m+48>>2]|0)|0;c[s>>2]=w}c[t>>2]=x;c[m+24>>2]=x;c[m+28>>2]=w}if(v&16){v=a[q>>0]|0;if(!(v&1)){v=(v&255)>>>1;c[s>>2]=q+v+1;w=10}else{v=c[m+48>>2]|0;c[s>>2]=(c[m+52>>2]|0)+v;w=(c[q>>2]&-2)+ -1|0}Ki(q,w);x=a[q>>0]|0;if(!(x&1)){w=q+1|0;x=(x&255)>>>1}else{w=c[m+52>>2]|0;x=c[m+48>>2]|0}y=m+36|0;c[y>>2]=w;c[m+32>>2]=w;c[m+40>>2]=w+x;if(c[u>>2]&3)c[y>>2]=w+v}if(a[r>>0]&1)Uq(c[r+8>>2]|0);w=c[b+300>>2]|0;r=c[b+304>>2]|0;if((w|0)!=(r|0)){v=m+8|0;do{x=c[w>>2]|0;y=c[w+4>>2]|0;z=c[w+8>>2]|0;Rj(Rg(Rj(Rg(Rj(Rg(v,9360,1)|0,z)|0,9368,1)|0,x)|0,9376,1)|0,y)|0;w=w+12|0}while((w|0)!=(r|0))}r=c[u>>2]|0;do if(!(r&16)){if(!(r&8)){c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;break}t=c[t>>2]|0;s=c[m+28>>2]|0;r=t;v=s-r|0;if(v>>>0>4294967279)Ei();if(v>>>0<11){a[g>>0]=v<<1;x=g+1|0}else{u=v+16&-16;w=(u|0)==0?1:u;x=Tq(w)|0;c:do if(!x){while(1){x=c[6860]|0;c[6860]=x+0;if(!x)break;qd[x&3]();x=Tq(w)|0;if(x)break c}z=Wb(4)|0;c[z>>2]=27280;Zc(z|0,27328,220)}while(0);c[g+8>>2]=x;c[g>>2]=u|1;c[g+4>>2]=v}if((t|0)!=(s|0)){u=x;while(1){a[u>>0]=a[t>>0]|0;t=t+1|0;if((t|0)==(s|0))break;else u=u+1|0}x=x+(s+(0-r))|0}a[x>>0]=0}else{t=c[s>>2]|0;r=c[m+36>>2]|0;if(t>>>0<r>>>0)c[s>>2]=r;else r=t;t=c[m+32>>2]|0;s=t;v=r-s|0;if(v>>>0>4294967279)Ei();if(v>>>0<11){a[g>>0]=v<<1;x=g+1|0}else{u=v+16&-16;w=(u|0)==0?1:u;x=Tq(w)|0;d:do if(!x){while(1){x=c[6860]|0;c[6860]=x+0;if(!x)break;qd[x&3]();x=Tq(w)|0;if(x)break d}z=Wb(4)|0;c[z>>2]=27280;Zc(z|0,27328,220)}while(0);c[g+8>>2]=x;c[g>>2]=u|1;c[g+4>>2]=v}if((t|0)!=(r|0)){u=x;while(1){a[u>>0]=a[t>>0]|0;t=t+1|0;if((t|0)==(r|0))break;else u=u+1|0}x=x+(r+(0-s))|0}a[x>>0]=0}while(0);c[m>>2]=9396;c[m+64>>2]=9436;c[o>>2]=9416;c[p>>2]=9584;if(a[q>>0]&1)Uq(c[m+52>>2]|0);c[p>>2]=16248;m=c[m+16>>2]|0;y=m+4|0;z=c[y>>2]|0;c[y>>2]=z+ -1;if(!z)jd[c[(c[m>>2]|0)+8>>2]&255](m);_i(n);do if(!(Qi(g,5184)|0)){n=Tq(4788)|0;e:do if(!n){while(1){m=c[6860]|0;c[6860]=m+0;if(!m)break;qd[m&3]();n=Tq(4788)|0;if(n)break e}z=Wb(4)|0;c[z>>2]=27280;Zc(z|0,27328,220)}while(0);Pf(n);a[n+4784>>0]=1;m=Tq(12)|0;f:do if(!m){while(1){m=c[6860]|0;c[6860]=m+0;if(!m)break;qd[m&3]();m=Tq(12)|0;if(m)break f}z=Wb(4)|0;c[z>>2]=27280;Zc(z|0,27328,220)}while(0);c[m>>2]=8504;c[m+4>>2]=l;c[m+8>>2]=n;l=Tq(16)|0;g:do if(!l){while(1){l=c[6860]|0;c[6860]=l+0;if(!l)break;qd[l&3]();l=Tq(16)|0;if(l)break g}z=Wb(4)|0;c[z>>2]=27280;Zc(z|0,27328,220)}while(0);c[l+4>>2]=0;c[l+8>>2]=0;c[l>>2]=8768;c[l+12>>2]=m}else{if(!(Qi(g,5192)|0)){n=Tq(5116)|0;h:do if(!n){while(1){m=c[6860]|0;c[6860]=m+0;if(!m)break;qd[m&3]();n=Tq(5116)|0;if(n)break h}z=Wb(4)|0;c[z>>2]=27280;Zc(z|0,27328,220)}while(0);Pf(n);Of(n+4784|0);c[n+4952>>2]=32;c[n+4956>>2]=9;c[n+4960>>2]=8;c[n+4964>>2]=0;c[n+4984>>2]=0;c[n+4988>>2]=0;c[n+4992>>2]=0;c[n+5008>>2]=1;c[n+5012>>2]=2;c[n+5004>>2]=4096;c[n+5e3>>2]=4;c[n+4996>>2]=4;c[n+5016>>2]=0;c[n+5020>>2]=0;c[n+5024>>2]=0;c[n+4968>>2]=32;c[n+4972>>2]=0;c[n+4976>>2]=-2147483648;c[n+4980>>2]=2147483647;c[n+4948>>2]=0;c[n+5032>>2]=32;c[n+5036>>2]=9;c[n+5040>>2]=8;c[n+5044>>2]=0;c[n+5064>>2]=0;c[n+5068>>2]=0;c[n+5072>>2]=0;c[n+5088>>2]=1;c[n+5092>>2]=2;c[n+5084>>2]=4096;c[n+5080>>2]=4;c[n+5076>>2]=4;c[n+5096>>2]=0;c[n+5100>>2]=0;c[n+5104>>2]=0;c[n+5048>>2]=32;c[n+5052>>2]=0;c[n+5056>>2]=-2147483648;c[n+5060>>2]=2147483647;c[n+5028>>2]=0;a[n+5108>>0]=0;a[n+5109>>0]=0;a[n+5112>>0]=1;m=Tq(12)|0;i:do if(!m){while(1){m=c[6860]|0;c[6860]=m+0;if(!m)break;qd[m&3]();m=Tq(12)|0;if(m)break i}z=Wb(4)|0;c[z>>2]=27280;Zc(z|0,27328,220)}while(0);c[m>>2]=7560;c[m+4>>2]=l;c[m+8>>2]=n;l=Tq(16)|0;j:do if(!l){while(1){l=c[6860]|0;c[6860]=l+0;if(!l)break;qd[l&3]();l=Tq(16)|0;if(l)break j}z=Wb(4)|0;c[z>>2]=27280;Zc(z|0,27328,220)}while(0);c[l+4>>2]=0;c[l+8>>2]=0;c[l>>2]=7848;c[l+12>>2]=m;break}if(!(Qi(g,5208)|0)){n=Tq(5104)|0;k:do if(!n){while(1){m=c[6860]|0;c[6860]=m+0;if(!m)break;qd[m&3]();n=Tq(5104)|0;if(n)break k}z=Wb(4)|0;c[z>>2]=27280;Zc(z|0,27328,220)}while(0);Pf(n);Nf(n+4784|0);a[n+5100>>0]=1;m=Tq(12)|0;l:do if(!m){while(1){m=c[6860]|0;c[6860]=m+0;if(!m)break;qd[m&3]();m=Tq(12)|0;if(m)break l}z=Wb(4)|0;c[z>>2]=27280;Zc(z|0,27328,220)}while(0);c[m>>2]=6616;c[m+4>>2]=l;c[m+8>>2]=n;l=Tq(16)|0;m:do if(!l){while(1){l=c[6860]|0;c[6860]=l+0;if(!l)break;qd[l&3]();l=Tq(16)|0;if(l)break m}z=Wb(4)|0;c[z>>2]=27280;Zc(z|0,27328,220)}while(0);c[l+4>>2]=0;c[l+8>>2]=0;c[l>>2]=6904;c[l+12>>2]=m;break}if(Qi(g,5224)|0){g=Wb(8)|0;c[g>>2]=27520;f=g+4|0;e=Tq(45)|0;n:do if(!e){while(1){e=c[6860]|0;c[6860]=e+0;if(!e)break;qd[e&3]();e=Tq(45)|0;if(e)break n}z=Wb(4)|0;c[z>>2]=27280;Zc(z|0,27328,220)}while(0);c[e>>2]=32;c[e+4>>2]=32;c[e+8>>2]=0;b=e+12|0;q=b+0|0;e=5296|0;s=q+33|0;do{a[q>>0]=a[e>>0]|0;q=q+1|0;e=e+1|0}while((q|0)<(s|0));c[f>>2]=b;c[g>>2]=5344;Zc(g|0,5280,51)}n=Tq(5432)|0;o:do if(!n){while(1){m=c[6860]|0;c[6860]=m+0;if(!m)break;qd[m&3]();n=Tq(5432)|0;if(n)break o}z=Wb(4)|0;c[z>>2]=27280;Zc(z|0,27328,220)}while(0);Pf(n);Of(n+4784|0);c[n+4952>>2]=32;c[n+4956>>2]=9;c[n+4960>>2]=8;c[n+4964>>2]=0;c[n+4984>>2]=0;c[n+4988>>2]=0;c[n+4992>>2]=0;c[n+5008>>2]=1;c[n+5012>>2]=2;c[n+5004>>2]=4096;c[n+5e3>>2]=4;c[n+4996>>2]=4;c[n+5016>>2]=0;c[n+5020>>2]=0;c[n+5024>>2]=0;c[n+4968>>2]=32;c[n+4972>>2]=0;c[n+4976>>2]=-2147483648;c[n+4980>>2]=2147483647;c[n+4948>>2]=0;c[n+5032>>2]=32;c[n+5036>>2]=9;c[n+5040>>2]=8;c[n+5044>>2]=0;c[n+5064>>2]=0;c[n+5068>>2]=0;c[n+5072>>2]=0;c[n+5088>>2]=1;c[n+5092>>2]=2;c[n+5084>>2]=4096;c[n+5080>>2]=4;c[n+5076>>2]=4;c[n+5096>>2]=0;c[n+5100>>2]=0;c[n+5104>>2]=0;c[n+5048>>2]=32;c[n+5052>>2]=0;c[n+5056>>2]=-2147483648;c[n+5060>>2]=2147483647;c[n+5028>>2]=0;a[n+5108>>0]=0;a[n+5109>>0]=0;Nf(n+5112|0);a[n+5428>>0]=1;m=Tq(12)|0;p:do if(!m){while(1){m=c[6860]|0;c[6860]=m+0;if(!m)break;qd[m&3]();m=Tq(12)|0;if(m)break p}z=Wb(4)|0;c[z>>2]=27280;Zc(z|0,27328,220)}while(0);c[m>>2]=5368;c[m+4>>2]=l;c[m+8>>2]=n;l=Tq(16)|0;q:do if(!l){while(1){l=c[6860]|0;c[6860]=l+0;if(!l)break;qd[l&3]();l=Tq(16)|0;if(l)break q}z=Wb(4)|0;c[z>>2]=27280;Zc(z|0,27328,220)}while(0);c[l+4>>2]=0;c[l+8>>2]=0;c[l>>2]=5904;c[l+12>>2]=m}while(0);if(a[g>>0]&1)Uq(c[g+8>>2]|0);c[h>>2]=m;g=c[k>>2]|0;c[k>>2]=l;if(((g|0)!=0?(y=g+4|0,z=c[y>>2]|0,c[y>>2]=z+ -1,(z|0)==0):0)?(jd[c[(c[g>>2]|0)+8>>2]&255](g),y=g+8|0,z=c[y>>2]|0,c[y>>2]=z+ -1,(z|0)==0):0)jd[c[(c[g>>2]|0)+16>>2]&255](g);w=b+328|0;y=w;y=kr(c[y>>2]|0,c[y+4>>2]|0,1,0)|0;c[w>>2]=y;c[w+4>>2]=H;w=j;c[w>>2]=0;c[w+4>>2]=0;w=c[h>>2]|0;y=c[w>>2]|0;y=c[y>>2]|0;kd[y&63](w,e);w=j;y=w;y=c[y>>2]|0;w=w+4|0;w=c[w>>2]|0;w=kr(y|0,w|0,1,0)|0;y=H;z=j;x=z;c[x>>2]=w;z=z+4|0;c[z>>2]=y;i=f;return}function Id(a){a=a|0;a=(c[a+8>>2]|0)+127|0;return d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24|0}function Jd(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;g=Tq(12)|0;a:do if(!g){while(1){g=c[6860]|0;c[6860]=g+0;if(!g)break;qd[g&3]();g=Tq(12)|0;if(g)break a}h=Wb(4)|0;c[h>>2]=27280;Zc(h|0,27328,220)}while(0);c[g>>2]=d;c[g+4>>2]=e;c[g+8>>2]=0;d=Tq(16)|0;b:do if(!d){while(1){e=c[6860]|0;c[6860]=e+0;if(!e)break;qd[e&3]();d=Tq(16)|0;if(d)break b}h=Wb(4)|0;c[h>>2]=27280;Zc(h|0,27328,220)}while(0);c[d+4>>2]=0;c[d+8>>2]=0;c[d>>2]=5008;c[d+12>>2]=g;c[b>>2]=g;h=b+4|0;e=c[h>>2]|0;c[h>>2]=d;if(!e)e=g;else{d=e+4|0;h=c[d>>2]|0;c[d>>2]=h+ -1;if((h|0)==0?(jd[c[(c[e>>2]|0)+8>>2]&255](e),d=e+8|0,h=c[d>>2]|0,c[d>>2]=h+ -1,(h|0)==0):0)jd[c[(c[e>>2]|0)+16>>2]&255](e);e=c[b>>2]|0}g=Tq(12)|0;c:do if(!g){while(1){g=c[6860]|0;c[6860]=g+0;if(!g)break;qd[g&3]();g=Tq(12)|0;if(g)break c}h=Wb(4)|0;c[h>>2]=27280;Zc(h|0,27328,220)}while(0);c[g>>2]=e;c[g+4>>2]=0;c[g+8>>2]=-1;h=Tq(16)|0;d:do if(!h){while(1){e=c[6860]|0;c[6860]=e+0;if(!e)break;qd[e&3]();h=Tq(16)|0;if(h)break d}h=Wb(4)|0;c[h>>2]=27280;Zc(h|0,27328,220)}while(0);c[h+4>>2]=0;c[h+8>>2]=0;c[h>>2]=4760;c[h+12>>2]=g;e=b+8|0;c[e>>2]=g;j=b+12|0;d=c[j>>2]|0;c[j>>2]=h;if(d){h=d+4|0;j=c[h>>2]|0;c[h>>2]=j+ -1;if((j|0)==0?(jd[c[(c[d>>2]|0)+8>>2]&255](d),h=d+8|0,j=c[h>>2]|0,c[h>>2]=j+ -1,(j|0)==0):0)jd[c[(c[d>>2]|0)+16>>2]&255](d);g=c[e>>2]|0}e=Tq(24)|0;e:do if(!e){while(1){e=c[6860]|0;c[6860]=e+0;if(!e)break;qd[e&3]();e=Tq(24)|0;if(e)break e}j=Wb(4)|0;c[j>>2]=27280;Zc(j|0,27328,220)}while(0);c[e>>2]=4248;c[e+4>>2]=g;c[e+8>>2]=0;c[e+12>>2]=0;c[e+16>>2]=0;a[e+20>>0]=1;g=Tq(16)|0;f:do if(!g){while(1){g=c[6860]|0;c[6860]=g+0;if(!g)break;qd[g&3]();g=Tq(16)|0;if(g)break f}j=Wb(4)|0;c[j>>2]=27280;Zc(j|0,27328,220)}while(0);c[g+4>>2]=0;c[g+8>>2]=0;c[g>>2]=4424;c[g+12>>2]=e;c[b+16>>2]=e;j=b+20|0;b=c[j>>2]|0;c[j>>2]=g;if(!b){i=f;return}h=b+4|0;j=c[h>>2]|0;c[h>>2]=j+ -1;if(j){i=f;return}jd[c[(c[b>>2]|0)+8>>2]&255](b);h=b+8|0;j=c[h>>2]|0;c[h>>2]=j+ -1;if(j){i=f;return}jd[c[(c[b>>2]|0)+16>>2]&255](b);i=f;return}function Kd(a,b){a=a|0;b=b|0;var d=0,e=0;d=i;e=a+16|0;a=c[e>>2]|0;if(!a){i=d;return}if((b|0)==4){Oe(a);i=d;return}else if((b|0)==8){ae(a);ae(c[e>>2]|0);i=d;return}else{i=d;return}}function Ld(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;i=i+16|0;f=e+8|0;g=e;h=b+16|0;b=c[h>>2]|0;if(!b){i=e;return}if((d|0)==1){d=Tq(172)|0;a:do if(!d){while(1){f=c[6860]|0;c[6860]=f+0;if(!f)break;qd[f&3]();d=Tq(172)|0;if(d)break a}l=Wb(4)|0;c[l>>2]=27280;Zc(l|0,27328,220)}while(0);f=c[b+4>>2]|0;c[d>>2]=3640;c[d+4>>2]=f;c[d+12>>2]=8;c[d+16>>2]=1;c[d+20>>2]=8;c[d+24>>2]=0;c[d+44>>2]=0;c[d+48>>2]=0;c[d+52>>2]=0;c[d+68>>2]=1;c[d+72>>2]=2;c[d+64>>2]=4096;c[d+60>>2]=4;c[d+56>>2]=4;c[d+76>>2]=0;c[d+80>>2]=0;c[d+84>>2]=0;c[d+28>>2]=8;c[d+32>>2]=256;c[d+36>>2]=-128;c[d+40>>2]=127;c[d+8>>2]=0;c[d+92>>2]=8;c[d+96>>2]=1;c[d+100>>2]=8;c[d+104>>2]=0;c[d+124>>2]=0;c[d+128>>2]=0;c[d+132>>2]=0;c[d+148>>2]=1;c[d+152>>2]=2;c[d+144>>2]=4096;c[d+140>>2]=4;c[d+136>>2]=4;c[d+156>>2]=0;c[d+160>>2]=0;c[d+164>>2]=0;c[d+108>>2]=8;c[d+112>>2]=256;c[d+116>>2]=-128;c[d+120>>2]=127;c[d+88>>2]=0;a[d+168>>0]=0;a[d+169>>0]=0;a[d+171>>0]=0;f=b+8|0;c[g>>2]=d;k=Tq(16)|0;b:do if(!k){while(1){h=c[6860]|0;c[6860]=h+0;if(!h)break;qd[h&3]();k=Tq(16)|0;if(k)break b}l=Wb(4)|0;c[l>>2]=27280;Zc(l|0,27328,220)}while(0);c[k+4>>2]=0;c[k+8>>2]=0;c[k>>2]=3824;c[k+12>>2]=d;j=g+4|0;c[j>>2]=k;h=b+12|0;l=c[h>>2]|0;if(l>>>0<(c[b+16>>2]|0)>>>0){if(!l)b=0;else{c[l>>2]=d;c[l+4>>2]=k;c[g>>2]=0;c[j>>2]=0;k=0;b=c[h>>2]|0}c[h>>2]=b+8}else{ve(f,g);k=c[j>>2]|0}if(!k){i=e;return}j=k+4|0;l=c[j>>2]|0;c[j>>2]=l+ -1;if(l){i=e;return}jd[c[(c[k>>2]|0)+8>>2]&255](k);j=k+8|0;l=c[j>>2]|0;c[j>>2]=l+ -1;if(l){i=e;return}jd[c[(c[k>>2]|0)+16>>2]&255](k);i=e;return}else if((d|0)==8){Oe(b);b=c[h>>2]|0}else if((d|0)!=4)if((d|0)==2){g=Tq(176)|0;c:do if(!g){while(1){g=c[6860]|0;c[6860]=g+0;if(!g)break;qd[g&3]();g=Tq(176)|0;if(g)break c}l=Wb(4)|0;c[l>>2]=27280;Zc(l|0,27328,220)}while(0);d=c[b+4>>2]|0;c[g>>2]=3032;c[g+4>>2]=d;c[g+12>>2]=16;c[g+16>>2]=1;c[g+20>>2]=8;c[g+24>>2]=0;c[g+44>>2]=0;c[g+48>>2]=0;c[g+52>>2]=0;c[g+68>>2]=1;c[g+72>>2]=2;c[g+64>>2]=4096;c[g+60>>2]=4;c[g+56>>2]=4;c[g+76>>2]=0;c[g+80>>2]=0;c[g+84>>2]=0;c[g+28>>2]=16;c[g+32>>2]=65536;c[g+36>>2]=-32768;c[g+40>>2]=32767;c[g+8>>2]=0;c[g+92>>2]=16;c[g+96>>2]=1;c[g+100>>2]=8;c[g+104>>2]=0;c[g+124>>2]=0;c[g+128>>2]=0;c[g+132>>2]=0;c[g+148>>2]=1;c[g+152>>2]=2;c[g+144>>2]=4096;c[g+140>>2]=4;c[g+136>>2]=4;c[g+156>>2]=0;c[g+160>>2]=0;c[g+164>>2]=0;c[g+108>>2]=16;c[g+112>>2]=65536;c[g+116>>2]=-32768;c[g+120>>2]=32767;c[g+88>>2]=0;a[g+168>>0]=0;a[g+169>>0]=0;a[g+172>>0]=0;d=b+8|0;c[f>>2]=g;j=Tq(16)|0;d:do if(!j){while(1){h=c[6860]|0;c[6860]=h+0;if(!h)break;qd[h&3]();j=Tq(16)|0;if(j)break d}l=Wb(4)|0;c[l>>2]=27280;Zc(l|0,27328,220)}while(0);c[j+4>>2]=0;c[j+8>>2]=0;c[j>>2]=3216;c[j+12>>2]=g;l=f+4|0;c[l>>2]=j;h=b+12|0;k=c[h>>2]|0;if(k>>>0<(c[b+16>>2]|0)>>>0){if(!k)b=0;else{c[k>>2]=g;c[k+4>>2]=j;c[f>>2]=0;c[l>>2]=0;b=c[h>>2]|0;j=0}c[h>>2]=b+8}else{ve(d,f);j=c[l>>2]|0}if(!j){i=e;return}k=j+4|0;l=c[k>>2]|0;c[k>>2]=l+ -1;if(l){i=e;return}jd[c[(c[j>>2]|0)+8>>2]&255](j);k=j+8|0;l=c[k>>2]|0;c[k>>2]=l+ -1;if(l){i=e;return}jd[c[(c[j>>2]|0)+16>>2]&255](j);i=e;return}else{i=e;return}Oe(b);i=e;return}function Md(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;i=i+16|0;f=e+8|0;g=e;h=b+16|0;b=c[h>>2]|0;if(!b){i=e;return}if((d|0)==2){d=Tq(176)|0;a:do if(!d){while(1){g=c[6860]|0;c[6860]=g+0;if(!g)break;qd[g&3]();d=Tq(176)|0;if(d)break a}l=Wb(4)|0;c[l>>2]=27280;Zc(l|0,27328,220)}while(0);g=c[b+4>>2]|0;c[d>>2]=1208;c[d+4>>2]=g;c[d+12>>2]=16;c[d+16>>2]=1;c[d+20>>2]=8;c[d+24>>2]=0;c[d+44>>2]=0;c[d+48>>2]=0;c[d+52>>2]=0;c[d+68>>2]=1;c[d+72>>2]=2;c[d+64>>2]=4096;c[d+60>>2]=4;c[d+56>>2]=4;c[d+76>>2]=0;c[d+80>>2]=0;c[d+84>>2]=0;c[d+28>>2]=16;c[d+32>>2]=65536;c[d+36>>2]=-32768;c[d+40>>2]=32767;c[d+8>>2]=0;c[d+92>>2]=16;c[d+96>>2]=1;c[d+100>>2]=8;c[d+104>>2]=0;c[d+124>>2]=0;c[d+128>>2]=0;c[d+132>>2]=0;c[d+148>>2]=1;c[d+152>>2]=2;c[d+144>>2]=4096;c[d+140>>2]=4;c[d+136>>2]=4;c[d+156>>2]=0;c[d+160>>2]=0;c[d+164>>2]=0;c[d+108>>2]=16;c[d+112>>2]=65536;c[d+116>>2]=-32768;c[d+120>>2]=32767;c[d+88>>2]=0;a[d+168>>0]=0;a[d+169>>0]=0;a[d+172>>0]=0;g=b+8|0;c[f>>2]=d;j=Tq(16)|0;b:do if(!j){while(1){h=c[6860]|0;c[6860]=h+0;if(!h)break;qd[h&3]();j=Tq(16)|0;if(j)break b}l=Wb(4)|0;c[l>>2]=27280;Zc(l|0,27328,220)}while(0);c[j+4>>2]=0;c[j+8>>2]=0;c[j>>2]=1392;c[j+12>>2]=d;k=f+4|0;c[k>>2]=j;h=b+12|0;l=c[h>>2]|0;if(l>>>0<(c[b+16>>2]|0)>>>0){if(!l)b=0;else{c[l>>2]=d;c[l+4>>2]=j;c[f>>2]=0;c[k>>2]=0;b=c[h>>2]|0;j=0}c[h>>2]=b+8}else{ve(g,f);j=c[k>>2]|0}if(!j){i=e;return}k=j+4|0;l=c[k>>2]|0;c[k>>2]=l+ -1;if(l){i=e;return}jd[c[(c[j>>2]|0)+8>>2]&255](j);k=j+8|0;l=c[k>>2]|0;c[k>>2]=l+ -1;if(l){i=e;return}jd[c[(c[j>>2]|0)+16>>2]&255](j);i=e;return}else if((d|0)==8){ae(b);b=c[h>>2]|0}else if((d|0)!=4)if((d|0)==1){f=Tq(172)|0;c:do if(!f){while(1){f=c[6860]|0;c[6860]=f+0;if(!f)break;qd[f&3]();f=Tq(172)|0;if(f)break c}l=Wb(4)|0;c[l>>2]=27280;Zc(l|0,27328,220)}while(0);d=c[b+4>>2]|0;c[f>>2]=1816;c[f+4>>2]=d;c[f+12>>2]=8;c[f+16>>2]=1;c[f+20>>2]=8;c[f+24>>2]=0;c[f+44>>2]=0;c[f+48>>2]=0;c[f+52>>2]=0;c[f+68>>2]=1;c[f+72>>2]=2;c[f+64>>2]=4096;c[f+60>>2]=4;c[f+56>>2]=4;c[f+76>>2]=0;c[f+80>>2]=0;c[f+84>>2]=0;c[f+28>>2]=8;c[f+32>>2]=256;c[f+36>>2]=-128;c[f+40>>2]=127;c[f+8>>2]=0;c[f+92>>2]=8;c[f+96>>2]=1;c[f+100>>2]=8;c[f+104>>2]=0;c[f+124>>2]=0;c[f+128>>2]=0;c[f+132>>2]=0;c[f+148>>2]=1;c[f+152>>2]=2;c[f+144>>2]=4096;c[f+140>>2]=4;c[f+136>>2]=4;c[f+156>>2]=0;c[f+160>>2]=0;c[f+164>>2]=0;c[f+108>>2]=8;c[f+112>>2]=256;c[f+116>>2]=-128;c[f+120>>2]=127;c[f+88>>2]=0;a[f+168>>0]=0;a[f+169>>0]=0;a[f+171>>0]=0;d=b+8|0;c[g>>2]=f;l=Tq(16)|0;d:do if(!l){while(1){h=c[6860]|0;c[6860]=h+0;if(!h)break;qd[h&3]();l=Tq(16)|0;if(l)break d}l=Wb(4)|0;c[l>>2]=27280;Zc(l|0,27328,220)}while(0);c[l+4>>2]=0;c[l+8>>2]=0;c[l>>2]=2e3;c[l+12>>2]=f;j=g+4|0;c[j>>2]=l;h=b+12|0;k=c[h>>2]|0;if(k>>>0<(c[b+16>>2]|0)>>>0){if(!k)b=0;else{c[k>>2]=f;c[k+4>>2]=l;c[g>>2]=0;c[j>>2]=0;l=0;b=c[h>>2]|0}c[h>>2]=b+8}else{ve(d,g);l=c[j>>2]|0}if(!l){i=e;return}j=l+4|0;k=c[j>>2]|0;c[j>>2]=k+ -1;if(k){i=e;return}jd[c[(c[l>>2]|0)+8>>2]&255](l);j=l+8|0;k=c[j>>2]|0;c[j>>2]=k+ -1;if(k){i=e;return}jd[c[(c[l>>2]|0)+16>>2]&255](l);i=e;return}else{i=e;return}ae(b);i=e;return}function Nd(a,b){a=a|0;b=b|0;var d=0;d=i;a=c[a+16>>2]|0;if(!a){i=d;return}kd[c[c[a>>2]>>2]&63](a,b);i=d;return}function Od(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0;f=i;g=d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24;a=a+4|0;a=d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24;b=b+(a>>1)|0;if(!(a&1)){a=g;kd[a&63](b,e);i=f;return}else{a=c[(c[b>>2]|0)+g>>2]|0;kd[a&63](b,e);i=f;return}}function Pd(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0;f=i;g=d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24;a=a+4|0;a=d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24;b=b+(a>>1)|0;if(!(a&1)){a=g;kd[a&63](b,e);i=f;return}else{a=c[(c[b>>2]|0)+g>>2]|0;kd[a&63](b,e);i=f;return}}function Qd(a,b,e,f){a=a|0;b=b|0;e=e|0;f=f|0;var g=0,h=0;g=i;h=d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24;a=a+4|0;a=d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24;b=b+(a>>1)|0;if(!(a&1)){a=h;od[a&15](b,e,f);i=g;return}else{a=c[(c[b>>2]|0)+h>>2]|0;od[a&15](b,e,f);i=g;return}}function Rd(){var a=0,b=0;a=i;b=Tq(24)|0;a:do if(!b){while(1){b=c[6860]|0;c[6860]=b+0;if(!b)break;qd[b&3]();b=Tq(24)|0;if(b)break a}b=Wb(4)|0;c[b>>2]=27280;Zc(b|0,27328,220)}while(0);c[b+0>>2]=0;c[b+4>>2]=0;c[b+8>>2]=0;c[b+12>>2]=0;c[b+16>>2]=0;c[b+20>>2]=0;i=a;return b|0}function Sd(a){a=a|0;var b=0;b=i;a=id[a&3]()|0;i=b;return a|0}function Td(a){a=a|0;return 200}function Ud(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0;b=i;if(!a){i=b;return}c[a>>2]=0;d=a+4|0;e=c[d>>2]|0;c[d>>2]=0;if(((e|0)!=0?(f=e+4|0,g=c[f>>2]|0,c[f>>2]=g+ -1,(g|0)==0):0)?(jd[c[(c[e>>2]|0)+8>>2]&255](e),f=e+8|0,g=c[f>>2]|0,c[f>>2]=g+ -1,(g|0)==0):0)jd[c[(c[e>>2]|0)+16>>2]&255](e);e=a+16|0;c[e>>2]=0;f=a+20|0;g=c[f>>2]|0;c[f>>2]=0;if(g){j=g+4|0;h=c[j>>2]|0;c[j>>2]=h+ -1;if((h|0)==0?(jd[c[(c[g>>2]|0)+8>>2]&255](g),h=g+8|0,j=c[h>>2]|0,c[h>>2]=j+ -1,(j|0)==0):0)jd[c[(c[g>>2]|0)+16>>2]&255](g);g=c[f>>2]|0;c[e>>2]=0;c[f>>2]=0;if(g){h=g+4|0;j=c[h>>2]|0;c[h>>2]=j+ -1;if((j|0)==0?(jd[c[(c[g>>2]|0)+8>>2]&255](g),h=g+8|0,j=c[h>>2]|0,c[h>>2]=j+ -1,(j|0)==0):0)jd[c[(c[g>>2]|0)+16>>2]&255](g);e=c[f>>2]|0;if(((e|0)!=0?(h=e+4|0,j=c[h>>2]|0,c[h>>2]=j+ -1,(j|0)==0):0)?(jd[c[(c[e>>2]|0)+8>>2]&255](e),h=e+8|0,j=c[h>>2]|0,c[h>>2]=j+ -1,(j|0)==0):0)jd[c[(c[e>>2]|0)+16>>2]&255](e)}}else{c[e>>2]=0;c[f>>2]=0}e=c[a+12>>2]|0;if(((e|0)!=0?(h=e+4|0,j=c[h>>2]|0,c[h>>2]=j+ -1,(j|0)==0):0)?(jd[c[(c[e>>2]|0)+8>>2]&255](e),h=e+8|0,j=c[h>>2]|0,c[h>>2]=j+ -1,(j|0)==0):0)jd[c[(c[e>>2]|0)+16>>2]&255](e);d=c[d>>2]|0;if(((d|0)!=0?(h=d+4|0,j=c[h>>2]|0,c[h>>2]=j+ -1,(j|0)==0):0)?(jd[c[(c[d>>2]|0)+8>>2]&255](d),h=d+8|0,j=c[h>>2]|0,c[h>>2]=j+ -1,(j|0)==0):0)jd[c[(c[d>>2]|0)+16>>2]&255](d);Uq(a);i=b;return}function Vd(a,b){a=a|0;b=b|0;var e=0,f=0;e=i;f=d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24;a=a+4|0;a=d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24;b=b+(a>>1)|0;if(!(a&1)){a=f;a=md[a&127](b)|0;i=e;return a|0}else{a=c[(c[b>>2]|0)+f>>2]|0;a=md[a&127](b)|0;i=e;return a|0}return 0}function Wd(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0;f=i;g=d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24;a=a+4|0;a=d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24;b=b+(a>>1)|0;if(!(a&1)){a=g;kd[a&63](b,e);i=f;return}else{a=c[(c[b>>2]|0)+g>>2]|0;kd[a&63](b,e);i=f;return}}function Xd(a,b,e,f){a=a|0;b=b|0;e=e|0;f=f|0;var g=0,h=0;g=i;h=d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24;a=a+4|0;a=d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24;b=b+(a>>1)|0;if(!(a&1)){a=h;od[a&15](b,e,f);i=g;return}else{a=c[(c[b>>2]|0)+h>>2]|0;od[a&15](b,e,f);i=g;return}}function Yd(){var a=0,b=0;a=i;b=Tq(16)|0;a:do if(!b){while(1){b=c[6860]|0;c[6860]=b+0;if(!b)break;qd[b&3]();b=Tq(16)|0;if(b)break a}b=Wb(4)|0;c[b>>2]=27280;Zc(b|0,27328,220)}while(0);c[b+0>>2]=0;c[b+4>>2]=0;c[b+8>>2]=0;c[b+12>>2]=0;i=a;return b|0}function Zd(a){a=a|0;var b=0;b=i;a=id[a&3]()|0;i=b;return a|0}function _d(a){a=a|0;return 384}function $d(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;b=i;if(!a){i=b;return}c[a>>2]=0;d=a+4|0;e=c[d>>2]|0;c[d>>2]=0;if(((e|0)!=0?(g=e+4|0,f=c[g>>2]|0,c[g>>2]=f+ -1,(f|0)==0):0)?(jd[c[(c[e>>2]|0)+8>>2]&255](e),f=e+8|0,g=c[f>>2]|0,c[f>>2]=g+ -1,(g|0)==0):0)jd[c[(c[e>>2]|0)+16>>2]&255](e);c[a+8>>2]=0;e=a+12|0;f=c[e>>2]|0;c[e>>2]=0;if(f){h=f+4|0;g=c[h>>2]|0;c[h>>2]=g+ -1;if((g|0)==0?(jd[c[(c[f>>2]|0)+8>>2]&255](f),g=f+8|0,h=c[g>>2]|0,c[g>>2]=h+ -1,(h|0)==0):0)jd[c[(c[f>>2]|0)+16>>2]&255](f);e=c[e>>2]|0;if(((e|0)!=0?(g=e+4|0,h=c[g>>2]|0,c[g>>2]=h+ -1,(h|0)==0):0)?(jd[c[(c[e>>2]|0)+8>>2]&255](e),g=e+8|0,h=c[g>>2]|0,c[g>>2]=h+ -1,(h|0)==0):0)jd[c[(c[e>>2]|0)+16>>2]&255](e)}d=c[d>>2]|0;if(((d|0)!=0?(g=d+4|0,h=c[g>>2]|0,c[g>>2]=h+ -1,(h|0)==0):0)?(jd[c[(c[d>>2]|0)+8>>2]&255](d),g=d+8|0,h=c[g>>2]|0,c[g>>2]=h+ -1,(h|0)==0):0)jd[c[(c[d>>2]|0)+16>>2]&255](d);Uq(a);i=b;return}function ae(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0;d=i;i=i+16|0;e=d;f=Tq(180)|0;a:do if(!f){while(1){f=c[6860]|0;c[6860]=f+0;if(!f)break;qd[f&3]();f=Tq(180)|0;if(f)break a}l=Wb(4)|0;c[l>>2]=27280;Zc(l|0,27328,220)}while(0);g=c[b+4>>2]|0;c[f>>2]=528;c[f+4>>2]=g;c[f+12>>2]=32;c[f+16>>2]=1;c[f+20>>2]=8;c[f+24>>2]=0;c[f+44>>2]=0;c[f+48>>2]=0;c[f+52>>2]=0;c[f+68>>2]=1;c[f+72>>2]=2;c[f+64>>2]=4096;c[f+60>>2]=4;c[f+56>>2]=4;c[f+76>>2]=0;c[f+80>>2]=0;c[f+84>>2]=0;c[f+28>>2]=32;c[f+32>>2]=0;c[f+36>>2]=-2147483648;c[f+40>>2]=2147483647;c[f+8>>2]=0;c[f+92>>2]=32;c[f+96>>2]=1;c[f+100>>2]=8;c[f+104>>2]=0;c[f+124>>2]=0;c[f+128>>2]=0;c[f+132>>2]=0;c[f+148>>2]=1;c[f+152>>2]=2;c[f+144>>2]=4096;c[f+140>>2]=4;c[f+136>>2]=4;c[f+156>>2]=0;c[f+160>>2]=0;c[f+164>>2]=0;c[f+108>>2]=32;c[f+112>>2]=0;c[f+116>>2]=-2147483648;c[f+120>>2]=2147483647;c[f+88>>2]=0;a[f+168>>0]=0;a[f+169>>0]=0;a[f+176>>0]=0;g=b+8|0;c[e>>2]=f;j=Tq(16)|0;b:do if(!j){while(1){h=c[6860]|0;c[6860]=h+0;if(!h)break;qd[h&3]();j=Tq(16)|0;if(j)break b}l=Wb(4)|0;c[l>>2]=27280;Zc(l|0,27328,220)}while(0);c[j+4>>2]=0;c[j+8>>2]=0;c[j>>2]=784;c[j+12>>2]=f;l=e+4|0;c[l>>2]=j;h=b+12|0;k=c[h>>2]|0;if(k>>>0<(c[b+16>>2]|0)>>>0){if(!k)b=0;else{c[k>>2]=f;c[k+4>>2]=j;c[e>>2]=0;c[l>>2]=0;b=c[h>>2]|0;j=0}c[h>>2]=b+8}else{ve(g,e);j=c[l>>2]|0}if(!j){i=d;return}k=j+4|0;l=c[k>>2]|0;c[k>>2]=l+ -1;if(l){i=d;return}jd[c[(c[j>>2]|0)+8>>2]&255](j);k=j+8|0;l=c[k>>2]|0;c[k>>2]=l+ -1;if(l){i=d;return}jd[c[(c[j>>2]|0)+16>>2]&255](j);i=d;return}function be(a){a=a|0;var b=0;b=i;c[a>>2]=528;pe(a+156|0);pe(a+124|0);oe(a+8|0);i=b;return}function ce(a){a=a|0;var b=0;b=i;c[a>>2]=528;pe(a+156|0);pe(a+124|0);oe(a+8|0);Uq(a);i=b;return}function de(a){a=a|0;return 4}function ee(a,b){a=a|0;b=b|0;return}function fe(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;j=c[b+4>>2]|0;if(!(a[b+169>>0]|0))ge(b+88|0);g=b+172|0;h=b+176|0;do if(a[h>>0]|0){k=c[g>>2]|0;j=(he(b+88|0,j,c[b+124>>2]|0)|0)+k|0;b=c[b+112>>2]|0;if((j|0)<0){b=j+b|0;break}else{b=j-(j>>>0<b>>>0?0:b)|0;break}}else{k=c[j>>2]|0;n=k+8|0;o=c[n>>2]|0;m=o+1|0;c[n>>2]=m;k=c[k>>2]|0;l=a[k+o>>0]|0;j=o+2|0;c[n>>2]=j;m=a[k+m>>0]|0;b=o+3|0;c[n>>2]=b;j=a[k+j>>0]|0;c[n>>2]=o+4;b=(m&255)<<8|l&255|(j&255)<<16|d[k+b>>0]<<24}while(0);if(!(a[h>>0]|0))a[h>>0]=1;c[g>>2]=b;a[e+3>>0]=b>>>24;a[e+2>>0]=b>>>16;a[e+1>>0]=b>>>8;a[e>>0]=b;i=f;return}function ge(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;f=i;i=i+96|0;h=f+44|0;d=f;w=b+36|0;u=b+40|0;if((c[w>>2]|0)!=(c[u>>2]|0)){i=f;return}j=b+8|0;e=b+20|0;if(c[j>>2]|0){g=b+44|0;n=h+4|0;m=h+8|0;l=h+12|0;k=h+16|0;o=h+20|0;p=h+24|0;q=h+28|0;r=h+32|0;s=h+36|0;t=h+40|0;v=0;do{me(h,(c[e>>2]|0)+1|0);x=c[u>>2]|0;if(x>>>0<(c[g>>2]|0)>>>0){if(!x)x=0;else{c[x>>2]=c[h>>2];a[x+4>>0]=a[n>>0]|0;c[x+8>>2]=c[m>>2];c[x+12>>2]=c[l>>2];c[x+16>>2]=c[k>>2];c[x+20>>2]=c[o>>2];c[x+24>>2]=c[p>>2];c[x+28>>2]=c[q>>2];c[x+32>>2]=c[r>>2];c[x+36>>2]=c[s>>2];c[x+40>>2]=c[t>>2];c[m+0>>2]=0;c[m+4>>2]=0;c[m+8>>2]=0;x=c[u>>2]|0}c[u>>2]=x+44}else ne(w,h);x=c[m>>2]|0;if(x)Uq(c[x+ -4>>2]|0);x=c[l>>2]|0;if(x)Uq(c[x+ -4>>2]|0);x=c[k>>2]|0;if(x)Uq(c[x+ -4>>2]|0);v=v+1|0}while(v>>>0<(c[j>>2]|0)>>>0)}if(!(c[e>>2]|0)){i=f;return}t=b+12|0;k=b+72|0;s=b+76|0;l=d+4|0;j=d+8|0;o=d+12|0;h=d+16|0;m=d+20|0;n=d+24|0;g=d+28|0;p=d+32|0;q=d+36|0;r=d+40|0;b=b+68|0;u=1;do{v=c[t>>2]|0;me(d,1<<(u>>>0>v>>>0?v:u));v=c[k>>2]|0;if(v>>>0<(c[s>>2]|0)>>>0){if(!v)v=0;else{c[v>>2]=c[d>>2];a[v+4>>0]=a[l>>0]|0;c[v+8>>2]=c[j>>2];c[v+12>>2]=c[o>>2];c[v+16>>2]=c[h>>2];c[v+20>>2]=c[m>>2];c[v+24>>2]=c[n>>2];c[v+28>>2]=c[g>>2];c[v+32>>2]=c[p>>2];c[v+36>>2]=c[q>>2];c[v+40>>2]=c[r>>2];c[j+0>>2]=0;c[j+4>>2]=0;c[j+8>>2]=0;v=c[k>>2]|0}c[k>>2]=v+44}else ne(b,d);v=c[j>>2]|0;if(v)Uq(c[v+ -4>>2]|0);v=c[o>>2]|0;if(v)Uq(c[v+ -4>>2]|0);v=c[h>>2]|0;if(v)Uq(c[v+ -4>>2]|0);u=u+1|0}while(u>>>0<=(c[e>>2]|0)>>>0);i=f;return}function he(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;f=i;g=ie(b,e)|0;c[a>>2]=g;if(g){if(g>>>0>=32){m=c[a+28>>2]|0;i=f;return m|0}e=c[a+12>>2]|0;if(g>>>0>e>>>0){e=g-e|0;m=ie(b,(c[a+68>>2]|0)+((g+ -1|0)*44|0)|0)|0;e=m<<e|(je(b,e)|0)}else e=ie(b,(c[a+68>>2]|0)+((g+ -1|0)*44|0)|0)|0;a=c[a>>2]|0;if((e|0)<(1<<a+ -1|0)){m=e+1+(-1<<a)|0;i=f;return m|0}else{m=e+1|0;i=f;return m|0}}g=a+56|0;j=b+8|0;m=c[j>>2]|0;k=da(m>>>13,c[g>>2]|0)|0;h=b+4|0;l=c[h>>2]|0;n=l>>>0>=k>>>0;e=n&1;if(n){c[h>>2]=l-k;k=m-k|0;c[j>>2]=k}else{c[j>>2]=k;k=a+60|0;c[k>>2]=(c[k>>2]|0)+1;k=c[j>>2]|0}if(k>>>0<16777216){k=c[h>>2]|0;do{m=c[b>>2]|0;l=m+8|0;n=c[l>>2]|0;c[l>>2]=n+1;k=d[(c[m>>2]|0)+n>>0]|0|k<<8;c[h>>2]=k;n=c[j>>2]<<8;c[j>>2]=n}while(n>>>0<16777216)}j=a+52|0;n=(c[j>>2]|0)+ -1|0;c[j>>2]=n;if(n){n=e;i=f;return n|0}b=a+48|0;h=c[b>>2]|0;k=a+64|0;l=(c[k>>2]|0)+h|0;c[k>>2]=l;if(l>>>0>8192){l=(l+1|0)>>>1;c[k>>2]=l;n=a+60|0;a=((c[n>>2]|0)+1|0)>>>1;c[n>>2]=a;if((a|0)==(l|0)){n=l+1|0;c[k>>2]=n;k=n}else{k=l;l=a}}else{k=l;l=c[a+60>>2]|0}c[g>>2]=(da(2147483648/(k>>>0)|0,l)|0)>>>18;n=h*5|0;n=n>>>0>259?64:n>>>2;c[b>>2]=n;c[j>>2]=n;n=e;i=f;return n|0}function ie(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;f=i;e=a+8|0;g=c[e>>2]|0;j=c[b+16>>2]|0;if(j){k=c[a+4>>2]|0;h=g>>>15;c[e>>2]=h;m=(k>>>0)/(h>>>0)|0;n=m>>>(c[b+40>>2]|0);l=c[j+(n<<2)>>2]|0;n=(c[j+(n+1<<2)>>2]|0)+1|0;o=l+1|0;j=c[b+8>>2]|0;if(n>>>0>o>>>0){do{o=(n+l|0)>>>1;p=(c[j+(o<<2)>>2]|0)>>>0>m>>>0;l=p?l:o;n=p?o:n;o=l+1|0}while(n>>>0>o>>>0);m=o}else m=o;o=da(h,c[j+(l<<2)>>2]|0)|0;if((l|0)!=(c[b+32>>2]|0))g=da(c[j+(m<<2)>>2]|0,h)|0}else{j=g>>>15;c[e>>2]=j;m=c[b>>2]|0;h=c[b+8>>2]|0;k=c[a+4>>2]|0;n=m>>>1;l=0;o=0;do{q=da(c[h+(n<<2)>>2]|0,j)|0;p=q>>>0>k>>>0;g=p?q:g;o=p?o:q;l=p?l:n;m=p?n:m;n=(l+m|0)>>>1}while((n|0)!=(l|0))}h=a+4|0;j=k-o|0;c[h>>2]=j;q=g-o|0;c[e>>2]=q;if(q>>>0<16777216)do{p=c[a>>2]|0;o=p+8|0;q=c[o>>2]|0;c[o>>2]=q+1;j=d[(c[p>>2]|0)+q>>0]|0|j<<8;c[h>>2]=j;q=c[e>>2]<<8;c[e>>2]=q}while(q>>>0<16777216);p=(c[b+12>>2]|0)+(l<<2)|0;c[p>>2]=(c[p>>2]|0)+1;p=b+28|0;q=(c[p>>2]|0)+ -1|0;c[p>>2]=q;if(q){i=f;return l|0}ke(b);i=f;return l|0}function je(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;g=i;e=a+4|0;h=c[e>>2]|0;f=a+8|0;j=c[f>>2]|0;if(b>>>0>19){k=j>>>16;c[f>>2]=k;j=(h>>>0)/(k>>>0)|0;h=h-(da(j,k)|0)|0;c[e>>2]=h;do{l=c[a>>2]|0;m=l+8|0;k=c[m>>2]|0;c[m>>2]=k+1;h=d[(c[l>>2]|0)+k>>0]|0|h<<8;c[e>>2]=h;k=c[f>>2]<<8;c[f>>2]=k}while(k>>>0<16777216);m=(je(a,b+ -16|0)|0)<<16|j&65535;i=g;return m|0}m=j>>>b;c[f>>2]=m;b=(h>>>0)/(m>>>0)|0;h=h-(da(b,m)|0)|0;c[e>>2]=h;if(m>>>0>=16777216){i=g;return b|0}do{l=c[a>>2]|0;k=l+8|0;m=c[k>>2]|0;c[k>>2]=m+1;h=d[(c[l>>2]|0)+m>>0]|0|h<<8;c[e>>2]=h;m=c[f>>2]<<8;c[f>>2]=m}while(m>>>0<16777216);i=g;return b|0}function ke(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;d=i;e=b+24|0;h=b+20|0;k=(c[h>>2]|0)+(c[e>>2]|0)|0;c[h>>2]=k;if(k>>>0>32768){c[h>>2]=0;if(!(c[b>>2]|0))k=0;else{l=c[b+12>>2]|0;j=0;do{s=l+(j<<2)|0;k=((c[s>>2]|0)+1|0)>>>1;c[s>>2]=k;k=k+(c[h>>2]|0)|0;c[h>>2]=k;j=j+1|0}while(j>>>0<(c[b>>2]|0)>>>0)}}h=2147483648/(k>>>0)|0;if((a[b+4>>0]|0)==0?(f=b+36|0,(c[f>>2]|0)!=0):0){if(c[b>>2]|0){o=c[b+8>>2]|0;m=c[b+12>>2]|0;k=b+40|0;n=b+16|0;j=0;s=0;l=0;while(1){r=(da(l,h)|0)>>>16;c[o+(j<<2)>>2]=r;l=(c[m+(j<<2)>>2]|0)+l|0;r=r>>>(c[k>>2]|0);if(s>>>0<r>>>0){p=j+ -1|0;q=c[n>>2]|0;do{s=s+1|0;c[q+(s<<2)>>2]=p}while((s|0)!=(r|0))}else r=s;j=j+1|0;if(j>>>0>=(c[b>>2]|0)>>>0)break;else s=r}h=c[n>>2]|0;c[h>>2]=0;if(r>>>0<=(c[f>>2]|0)>>>0)g=18}else{h=c[b+16>>2]|0;c[h>>2]=0;r=0;g=18}if((g|0)==18)do{r=r+1|0;c[h+(r<<2)>>2]=(c[b>>2]|0)+ -1}while(r>>>0<=(c[f>>2]|0)>>>0);s=c[b>>2]|0;r=c[e>>2]|0;r=r*5|0;r=r>>>2;s=s<<3;s=s+48|0;q=r>>>0>s>>>0;r=q?s:r;c[e>>2]=r;s=b+28|0;c[s>>2]=r;i=d;return}if(!(c[b>>2]|0)){s=0;r=c[e>>2]|0;r=r*5|0;r=r>>>2;s=s<<3;s=s+48|0;q=r>>>0>s>>>0;r=q?s:r;c[e>>2]=r;s=b+28|0;c[s>>2]=r;i=d;return}j=c[b+8>>2]|0;k=c[b+12>>2]|0;l=0;g=0;do{c[j+(l<<2)>>2]=(da(g,h)|0)>>>16;g=(c[k+(l<<2)>>2]|0)+g|0;l=l+1|0;f=c[b>>2]|0}while(l>>>0<f>>>0);r=c[e>>2]|0;r=r*5|0;r=r>>>2;s=f<<3;s=s+48|0;q=r>>>0>s>>>0;r=q?s:r;c[e>>2]=r;s=b+28|0;c[s>>2]=r;i=d;return}function le(a){a=a|0;Oa(a|0)|0;eq()}function me(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;f=i;c[b>>2]=d;a[b+4>>0]=0;j=b+8|0;c[j>>2]=0;g=b+12|0;c[g>>2]=0;h=b+16|0;c[h>>2]=0;if((d+ -2|0)>>>0>2046){b=Wb(8)|0;c[b>>2]=27520;f=b+4|0;d=Tq(38)|0;if(d){e=d;c[e>>2]=25;g=e+4|0;c[g>>2]=25;g=e+8|0;c[g>>2]=0;e=e+12|0;g=e+0|0;d=744|0;h=g+26|0;do{a[g>>0]=a[d>>0]|0;g=g+1|0;d=d+1|0}while((g|0)<(h|0));c[f>>2]=e;Zc(b|0,27720,224)}while(1){d=c[6860]|0;c[6860]=d+0;if(!d)break;qd[d&3]();d=Tq(38)|0;if(d){e=8;break}}if((e|0)==8){c[d>>2]=25;e=d+4|0;c[e>>2]=25;e=d+8|0;c[e>>2]=0;e=d+12|0;g=e+0|0;d=744|0;h=g+26|0;do{a[g>>0]=a[d>>0]|0;g=g+1|0;d=d+1|0}while((g|0)<(h|0));c[f>>2]=e;Zc(b|0,27720,224)}j=Wb(4)|0;c[j>>2]=27280;Zc(j|0,27328,220)}else{c[b+32>>2]=d+ -1;if(d>>>0>16){e=3;while(1)if(1<<e+2>>>0<d>>>0)e=e+1|0;else break;k=1<<e;c[b+36>>2]=k;c[b+40>>2]=15-e;k=Tq((k<<2)+76|0)|0;e=k+68&-64;c[e+ -4>>2]=k;c[h>>2]=e}else{c[h>>2]=0;c[b+40>>2]=0;c[b+36>>2]=0}k=(d<<2)+68|0;h=Tq(k)|0;e=h+68&-64;c[e+ -4>>2]=h;c[j>>2]=e;k=Tq(k)|0;e=k+68&-64;c[e+ -4>>2]=k;c[g>>2]=e;c[b+20>>2]=0;g=b+24|0;c[g>>2]=d;if(!d){ke(b);j=c[b>>2]|0;j=j+6|0;j=j>>>1;c[g>>2]=j;k=b+28|0;c[k>>2]=j;i=f;return}else d=0;do{c[e+(d<<2)>>2]=1;d=d+1|0}while(d>>>0<(c[b>>2]|0)>>>0);ke(b);j=c[b>>2]|0;j=j+6|0;j=j>>>1;c[g>>2]=j;k=b+28|0;c[k>>2]=j;i=f;return}}function ne(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;e=i;f=b+4|0;l=c[f>>2]|0;k=c[b>>2]|0;m=k;h=(l-m|0)/44|0;j=h+1|0;if(j>>>0>97612893)Mn();g=b+8|0;m=((c[g>>2]|0)-m|0)/44|0;if(m>>>0<48806446){o=m<<1;o=o>>>0<j>>>0?j:o;if(!o){p=0;m=0}else n=5}else{o=97612893;n=5}if((n|0)==5){n=o*44|0;n=(n|0)==0?1:n;m=Tq(n)|0;a:do if(!m){while(1){m=c[6860]|0;c[6860]=m+0;if(!m)break;qd[m&3]();m=Tq(n)|0;if(m)break a}p=Wb(4)|0;c[p>>2]=27280;Zc(p|0,27328,220)}while(0);p=o}o=m+(h*44|0)|0;n=m+(p*44|0)|0;if(o){c[o>>2]=c[d>>2];a[m+(h*44|0)+4>>0]=a[d+4>>0]|0;l=d+8|0;c[m+(h*44|0)+8>>2]=c[l>>2];c[m+(h*44|0)+12>>2]=c[d+12>>2];c[m+(h*44|0)+16>>2]=c[d+16>>2];c[m+(h*44|0)+20>>2]=c[d+20>>2];c[m+(h*44|0)+24>>2]=c[d+24>>2];c[m+(h*44|0)+28>>2]=c[d+28>>2];c[m+(h*44|0)+32>>2]=c[d+32>>2];c[m+(h*44|0)+36>>2]=c[d+36>>2];c[m+(h*44|0)+40>>2]=c[d+40>>2];c[l+0>>2]=0;c[l+4>>2]=0;c[l+8>>2]=0;l=c[f>>2]|0;k=c[b>>2]|0}j=m+(j*44|0)|0;if((l|0)!=(k|0)){h=h+ -1-(((l+ -44+(0-k)|0)>>>0)/44|0)|0;while(1){d=l;l=l+ -44|0;c[o+ -44>>2]=c[l>>2];a[o+ -40>>0]=a[d+ -40>>0]|0;p=d+ -36|0;c[o+ -36>>2]=c[p>>2];c[o+ -32>>2]=c[d+ -32>>2];c[o+ -28>>2]=c[d+ -28>>2];c[o+ -24>>2]=c[d+ -24>>2];c[o+ -20>>2]=c[d+ -20>>2];c[o+ -16>>2]=c[d+ -16>>2];c[o+ -12>>2]=c[d+ -12>>2];c[o+ -8>>2]=c[d+ -8>>2];c[o+ -4>>2]=c[d+ -4>>2];c[p+0>>2]=0;c[p+4>>2]=0;c[p+8>>2]=0;if((l|0)==(k|0))break;else o=o+ -44|0}l=c[b>>2]|0;k=c[f>>2]|0;c[b>>2]=m+(h*44|0);c[f>>2]=j;c[g>>2]=n;if((k|0)!=(l|0))do{b=c[k+ -36>>2]|0;if(b)Uq(c[b+ -4>>2]|0);b=c[k+ -32>>2]|0;if(b)Uq(c[b+ -4>>2]|0);b=c[k+ -28>>2]|0;k=k+ -44|0;if(b)Uq(c[b+ -4>>2]|0)}while((k|0)!=(l|0))}else{c[b>>2]=o;c[f>>2]=j;c[g>>2]=n}if(!l){i=e;return}Uq(l);i=e;return}function oe(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;b=i;d=a+36|0;e=c[d>>2]|0;f=a+40|0;g=c[f>>2]|0;if((g|0)!=(e|0))do{c[f>>2]=g+ -44;h=c[g+ -36>>2]|0;if(h)Uq(c[h+ -4>>2]|0);h=c[g+ -32>>2]|0;if(h)Uq(c[h+ -4>>2]|0);g=c[g+ -28>>2]|0;if(g)Uq(c[g+ -4>>2]|0);g=c[f>>2]|0}while((g|0)!=(e|0));f=a+68|0;e=c[f>>2]|0;a=a+72|0;g=c[a>>2]|0;if((g|0)==(e|0)){pe(f);pe(d);i=b;return}do{c[a>>2]=g+ -44;h=c[g+ -36>>2]|0;if(h)Uq(c[h+ -4>>2]|0);h=c[g+ -32>>2]|0;if(h)Uq(c[h+ -4>>2]|0);g=c[g+ -28>>2]|0;if(g)Uq(c[g+ -4>>2]|0);g=c[a>>2]|0}while((g|0)!=(e|0));pe(f);pe(d);i=b;return}function pe(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;b=i;d=c[a>>2]|0;if(!d){i=b;return}e=a+4|0;f=c[e>>2]|0;if((f|0)!=(d|0)){do{c[e>>2]=f+ -44;g=c[f+ -36>>2]|0;if(g)Uq(c[g+ -4>>2]|0);g=c[f+ -32>>2]|0;if(g)Uq(c[g+ -4>>2]|0);f=c[f+ -28>>2]|0;if(f)Uq(c[f+ -4>>2]|0);f=c[e>>2]|0}while((f|0)!=(d|0));d=c[a>>2]|0}Uq(d);i=b;return}function qe(a){a=a|0;return}function re(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function se(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(!a){i=b;return}jd[c[(c[a>>2]|0)+4>>2]&255](a);i=b;return}function te(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==1040)a=a+12|0;else a=0;return a|0}function ue(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function ve(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;d=i;f=a+4|0;k=c[f>>2]|0;j=c[a>>2]|0;l=j;g=k-l>>3;h=g+1|0;if(h>>>0>536870911)Mn();e=a+8|0;l=(c[e>>2]|0)-l|0;if(l>>3>>>0<268435455){n=l>>2;n=n>>>0<h>>>0?h:n;if(!n){o=0;l=0}else m=5}else{n=536870911;m=5}if((m|0)==5){m=n<<3;m=(m|0)==0?1:m;l=Tq(m)|0;a:do if(!l){while(1){l=c[6860]|0;c[6860]=l+0;if(!l)break;qd[l&3]();l=Tq(m)|0;if(l)break a}o=Wb(4)|0;c[o>>2]=27280;Zc(o|0,27328,220)}while(0);o=n}n=l+(g<<3)|0;m=l+(o<<3)|0;if(n){c[n>>2]=c[b>>2];k=b+4|0;c[l+(g<<3)+4>>2]=c[k>>2];c[b>>2]=0;c[k>>2]=0;k=c[f>>2]|0;j=c[a>>2]|0}h=l+(h<<3)|0;if((k|0)!=(j|0)){g=g+ -1-((k+ -8+(0-j)|0)>>>3)|0;while(1){o=k;k=k+ -8|0;c[n+ -8>>2]=c[k>>2];o=o+ -4|0;c[n+ -4>>2]=c[o>>2];c[k>>2]=0;c[o>>2]=0;if((k|0)==(j|0))break;else n=n+ -8|0}k=c[a>>2]|0;j=c[f>>2]|0;c[a>>2]=l+(g<<3);c[f>>2]=h;c[e>>2]=m;if((j|0)!=(k|0))do{a=c[j+ -4>>2]|0;j=j+ -8|0;if(((a|0)!=0?(n=a+4|0,o=c[n>>2]|0,c[n>>2]=o+ -1,(o|0)==0):0)?(jd[c[(c[a>>2]|0)+8>>2]&255](a),n=a+8|0,o=c[n>>2]|0,c[n>>2]=o+ -1,(o|0)==0):0)jd[c[(c[a>>2]|0)+16>>2]&255](a)}while((j|0)!=(k|0))}else{c[a>>2]=n;c[f>>2]=h;c[e>>2]=m}if(!k){i=d;return}Uq(k);i=d;return}function we(a){a=a|0;var b=0;b=i;c[a>>2]=1208;pe(a+156|0);pe(a+124|0);oe(a+8|0);i=b;return}function xe(a){a=a|0;var b=0;b=i;c[a>>2]=1208;pe(a+156|0);pe(a+124|0);oe(a+8|0);Uq(a);i=b;return}function ye(a){a=a|0;return 2}function ze(d,f){d=d|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;g=i;k=c[d+4>>2]|0;if(!(a[d+169>>0]|0))ge(d+88|0);h=d+170|0;j=d+172|0;do if(a[j>>0]|0){l=e[h>>1]|0;k=(he(d+88|0,k,c[d+124>>2]|0)|0)+l|0;d=c[d+112>>2]|0;if((k|0)<0){k=k+d|0;break}else{k=k-(k>>>0<d>>>0?0:d)|0;break}}else{d=c[k>>2]|0;m=d+8|0;n=c[m>>2]|0;l=n+1|0;c[m>>2]=l;d=c[d>>2]|0;k=a[d+n>>0]|0;c[m>>2]=n+2;k=a[d+l>>0]<<8|k&255}while(0);d=k&65535;if(a[j>>0]|0){b[h>>1]=d;m=(d&65535)>>>8;m=m&255;n=f+1|0;a[n>>0]=m;n=k&255;a[f>>0]=n;i=g;return}a[j>>0]=1;b[h>>1]=d;m=(d&65535)>>>8;m=m&255;n=f+1|0;a[n>>0]=m;n=k&255;a[f>>0]=n;i=g;return}function Ae(a){a=a|0;return}function Be(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Ce(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(!a){i=b;return}jd[c[(c[a>>2]|0)+4>>2]&255](a);i=b;return}function De(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==1648)a=a+12|0;else a=0;return a|0}function Ee(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Fe(a){a=a|0;var b=0;b=i;c[a>>2]=1816;pe(a+156|0);pe(a+124|0);oe(a+8|0);i=b;return}function Ge(a){a=a|0;var b=0;b=i;c[a>>2]=1816;pe(a+156|0);pe(a+124|0);oe(a+8|0);Uq(a);i=b;return}function He(a){a=a|0;return 1}function Ie(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;j=c[b+4>>2]|0;if(!(a[b+169>>0]|0))ge(b+88|0);h=b+170|0;g=b+171|0;if(a[g>>0]|0){k=d[h>>0]|0;j=(he(b+88|0,j,c[b+124>>2]|0)|0)+k|0;b=c[b+112>>2]|0;if((j|0)<0)b=j+b|0;else b=j-(j>>>0<b>>>0?0:b)|0;b=b&255;if(a[g>>0]|0){j=h;k=b;a[j>>0]=k;a[e>>0]=k;i=f;return}}else{k=c[j>>2]|0;j=k+8|0;b=c[j>>2]|0;c[j>>2]=b+1;b=a[(c[k>>2]|0)+b>>0]|0}a[g>>0]=1;j=h;k=b;a[j>>0]=k;a[e>>0]=k;i=f;return}function Je(a){a=a|0;return}function Ke(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Le(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(!a){i=b;return}jd[c[(c[a>>2]|0)+4>>2]&255](a);i=b;return}function Me(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==2256)a=a+12|0;else a=0;return a|0}function Ne(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Oe(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0;d=i;i=i+16|0;e=d;f=Tq(180)|0;a:do if(!f){while(1){f=c[6860]|0;c[6860]=f+0;if(!f)break;qd[f&3]();f=Tq(180)|0;if(f)break a}l=Wb(4)|0;c[l>>2]=27280;Zc(l|0,27328,220)}while(0);g=c[b+4>>2]|0;c[f>>2]=2424;c[f+4>>2]=g;c[f+12>>2]=32;c[f+16>>2]=1;c[f+20>>2]=8;c[f+24>>2]=0;c[f+44>>2]=0;c[f+48>>2]=0;c[f+52>>2]=0;c[f+68>>2]=1;c[f+72>>2]=2;c[f+64>>2]=4096;c[f+60>>2]=4;c[f+56>>2]=4;c[f+76>>2]=0;c[f+80>>2]=0;c[f+84>>2]=0;c[f+28>>2]=32;c[f+32>>2]=0;c[f+36>>2]=-2147483648;c[f+40>>2]=2147483647;c[f+8>>2]=0;c[f+92>>2]=32;c[f+96>>2]=1;c[f+100>>2]=8;c[f+104>>2]=0;c[f+124>>2]=0;c[f+128>>2]=0;c[f+132>>2]=0;c[f+148>>2]=1;c[f+152>>2]=2;c[f+144>>2]=4096;c[f+140>>2]=4;c[f+136>>2]=4;c[f+156>>2]=0;c[f+160>>2]=0;c[f+164>>2]=0;c[f+108>>2]=32;c[f+112>>2]=0;c[f+116>>2]=-2147483648;c[f+120>>2]=2147483647;c[f+88>>2]=0;a[f+168>>0]=0;a[f+169>>0]=0;a[f+176>>0]=0;g=b+8|0;c[e>>2]=f;j=Tq(16)|0;b:do if(!j){while(1){h=c[6860]|0;c[6860]=h+0;if(!h)break;qd[h&3]();j=Tq(16)|0;if(j)break b}l=Wb(4)|0;c[l>>2]=27280;Zc(l|0,27328,220)}while(0);c[j+4>>2]=0;c[j+8>>2]=0;c[j>>2]=2608;c[j+12>>2]=f;l=e+4|0;c[l>>2]=j;h=b+12|0;k=c[h>>2]|0;if(k>>>0<(c[b+16>>2]|0)>>>0){if(!k)b=0;else{c[k>>2]=f;c[k+4>>2]=j;c[e>>2]=0;c[l>>2]=0;b=c[h>>2]|0;j=0}c[h>>2]=b+8}else{ve(g,e);j=c[l>>2]|0}if(!j){i=d;return}k=j+4|0;l=c[k>>2]|0;c[k>>2]=l+ -1;if(l){i=d;return}jd[c[(c[j>>2]|0)+8>>2]&255](j);k=j+8|0;l=c[k>>2]|0;c[k>>2]=l+ -1;if(l){i=d;return}jd[c[(c[j>>2]|0)+16>>2]&255](j);i=d;return}function Pe(a){a=a|0;var b=0;b=i;c[a>>2]=2424;pe(a+156|0);pe(a+124|0);oe(a+8|0);i=b;return}function Qe(a){a=a|0;var b=0;b=i;c[a>>2]=2424;pe(a+156|0);pe(a+124|0);oe(a+8|0);Uq(a);i=b;return}function Re(a){a=a|0;return 4}function Se(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;j=c[b+4>>2]|0;if(!(a[b+169>>0]|0))ge(b+88|0);g=b+172|0;h=b+176|0;do if(a[h>>0]|0){k=c[g>>2]|0;j=(he(b+88|0,j,c[b+124>>2]|0)|0)+k|0;b=c[b+112>>2]|0;if((j|0)<0){b=j+b|0;break}else{b=j-(j>>>0<b>>>0?0:b)|0;break}}else{k=c[j>>2]|0;n=k+8|0;o=c[n>>2]|0;m=o+1|0;c[n>>2]=m;k=c[k>>2]|0;l=a[k+o>>0]|0;j=o+2|0;c[n>>2]=j;m=a[k+m>>0]|0;b=o+3|0;c[n>>2]=b;j=a[k+j>>0]|0;c[n>>2]=o+4;b=(m&255)<<8|l&255|(j&255)<<16|d[k+b>>0]<<24}while(0);if(!(a[h>>0]|0))a[h>>0]=1;c[g>>2]=b;a[e+3>>0]=b>>>24;a[e+2>>0]=b>>>16;a[e+1>>0]=b>>>8;a[e>>0]=b;i=f;return}function Te(a){a=a|0;return}function Ue(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Ve(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(!a){i=b;return}jd[c[(c[a>>2]|0)+4>>2]&255](a);i=b;return}function We(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==2864)a=a+12|0;else a=0;return a|0}function Xe(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Ye(a){a=a|0;var b=0;b=i;c[a>>2]=3032;pe(a+156|0);pe(a+124|0);oe(a+8|0);i=b;return}function Ze(a){a=a|0;var b=0;b=i;c[a>>2]=3032;pe(a+156|0);pe(a+124|0);oe(a+8|0);Uq(a);i=b;return}function _e(a){a=a|0;return 2}function $e(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;j=c[d+4>>2]|0;if(!(a[d+169>>0]|0))ge(d+88|0);g=d+170|0;h=d+172|0;do if(a[h>>0]|0){k=b[g>>1]|0;j=(he(d+88|0,j,c[d+124>>2]|0)|0)+k|0;d=c[d+112>>2]|0;if((j|0)<0){j=j+d|0;break}else{j=j-(j>>>0<d>>>0?0:d)|0;break}}else{d=c[j>>2]|0;l=d+8|0;m=c[l>>2]|0;k=m+1|0;c[l>>2]=k;d=c[d>>2]|0;j=a[d+m>>0]|0;c[l>>2]=m+2;j=a[d+k>>0]<<8|j&255}while(0);d=j&65535;if(a[h>>0]|0){b[g>>1]=d;l=(d&65535)>>>8;l=l&255;m=e+1|0;a[m>>0]=l;m=j&255;a[e>>0]=m;i=f;return}a[h>>0]=1;b[g>>1]=d;l=(d&65535)>>>8;l=l&255;m=e+1|0;a[m>>0]=l;m=j&255;a[e>>0]=m;i=f;return}function af(a){a=a|0;return}function bf(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function cf(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(!a){i=b;return}jd[c[(c[a>>2]|0)+4>>2]&255](a);i=b;return}function df(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==3472)a=a+12|0;else a=0;return a|0}function ef(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function ff(a){a=a|0;var b=0;b=i;c[a>>2]=3640;pe(a+156|0);pe(a+124|0);oe(a+8|0);i=b;return}function gf(a){a=a|0;var b=0;b=i;c[a>>2]=3640;pe(a+156|0);pe(a+124|0);oe(a+8|0);Uq(a);i=b;return}function hf(a){a=a|0;return 1}function jf(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;h=c[b+4>>2]|0;if(!(a[b+169>>0]|0))ge(b+88|0);g=b+170|0;f=b+171|0;if(a[f>>0]|0){j=a[g>>0]|0;h=(he(b+88|0,h,c[b+124>>2]|0)|0)+j|0;b=c[b+112>>2]|0;if((h|0)<0)b=h+b|0;else b=h-(h>>>0<b>>>0?0:b)|0;b=b&255;if(a[f>>0]|0){h=g;j=b;a[h>>0]=j;a[d>>0]=j;i=e;return}}else{j=c[h>>2]|0;h=j+8|0;b=c[h>>2]|0;c[h>>2]=b+1;b=a[(c[j>>2]|0)+b>>0]|0}a[f>>0]=1;h=g;j=b;a[h>>0]=j;a[d>>0]=j;i=e;return}function kf(a){a=a|0;return}function lf(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function mf(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(!a){i=b;return}jd[c[(c[a>>2]|0)+4>>2]&255](a);i=b;return}function nf(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==4080)a=a+12|0;else a=0;return a|0}function of(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function pf(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;f=i;m=c[b+8>>2]|0;g=c[b+12>>2]|0;if((m|0)!=(g|0)){k=0;do{j=c[m>>2]|0;l=c[m+4>>2]|0;h=(l|0)==0;if(!h){n=l+4|0;c[n>>2]=(c[n>>2]|0)+1}kd[c[(c[j>>2]|0)+16>>2]&63](j,e+k|0);k=(md[c[(c[j>>2]|0)+8>>2]&127](j)|0)+k|0;if((!h?(j=l+4|0,n=c[j>>2]|0,c[j>>2]=n+ -1,(n|0)==0):0)?(jd[c[(c[l>>2]|0)+8>>2]&255](l),j=l+8|0,n=c[j>>2]|0,c[j>>2]=n+ -1,(n|0)==0):0)jd[c[(c[l>>2]|0)+16>>2]&255](l);m=m+8|0}while((m|0)!=(g|0))}g=b+20|0;if(!(a[g>>0]|0)){i=f;return}a[g>>0]=0;n=c[b+4>>2]|0;m=c[n>>2]|0;k=m+8|0;j=c[k>>2]|0;c[k>>2]=j+1;j=d[(c[m>>2]|0)+j>>0]<<24;m=c[n>>2]|0;k=m+8|0;l=c[k>>2]|0;c[k>>2]=l+1;j=d[(c[m>>2]|0)+l>>0]<<16|j;l=c[n>>2]|0;m=l+8|0;k=c[m>>2]|0;c[m>>2]=k+1;k=j|d[(c[l>>2]|0)+k>>0]<<8;l=c[n>>2]|0;j=l+8|0;m=c[j>>2]|0;c[j>>2]=m+1;c[n+4>>2]=k|d[(c[l>>2]|0)+m>>0];i=f;return}function qf(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;b=i;c[a>>2]=4248;e=a+8|0;d=c[e>>2]|0;if(!d){i=b;return}a=a+12|0;g=c[a>>2]|0;if((g|0)!=(d|0)){while(1){f=g+ -8|0;c[a>>2]=f;g=c[g+ -4>>2]|0;if(g){h=g+4|0;f=c[h>>2]|0;c[h>>2]=f+ -1;if((f|0)==0?(jd[c[(c[g>>2]|0)+8>>2]&255](g),f=g+8|0,h=c[f>>2]|0,c[f>>2]=h+ -1,(h|0)==0):0)jd[c[(c[g>>2]|0)+16>>2]&255](g);f=c[a>>2]|0}if((f|0)==(d|0))break;else g=f}d=c[e>>2]|0}Uq(d);i=b;return}function rf(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0;b=i;c[a>>2]=4248;e=a+8|0;d=c[e>>2]|0;if(!d){Uq(a);i=b;return}f=a+12|0;h=c[f>>2]|0;if((h|0)!=(d|0)){while(1){g=h+ -8|0;c[f>>2]=g;h=c[h+ -4>>2]|0;if(h){j=h+4|0;g=c[j>>2]|0;c[j>>2]=g+ -1;if((g|0)==0?(jd[c[(c[h>>2]|0)+8>>2]&255](h),g=h+8|0,j=c[g>>2]|0,c[g>>2]=j+ -1,(j|0)==0):0)jd[c[(c[h>>2]|0)+16>>2]&255](h);g=c[f>>2]|0}if((g|0)==(d|0))break;else h=g}d=c[e>>2]|0}Uq(d);Uq(a);i=b;return}function sf(a){a=a|0;return}function tf(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function uf(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(!a){i=b;return}jd[c[(c[a>>2]|0)+8>>2]&255](a);i=b;return}function vf(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==4632)a=a+12|0;else a=0;return a|0}function wf(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function xf(a){a=a|0;return}function yf(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function zf(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(a)Uq(a);i=b;return}function Af(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==4928)a=a+12|0;else a=0;return a|0}function Bf(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Cf(a){a=a|0;return}function Df(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Ef(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(a)Uq(a);i=b;return}function Ff(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==5144)a=a+12|0;else a=0;return a|0}function Gf(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Hf(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=27520;a=a+4|0;e=(c[a>>2]|0)+ -4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if((d+ -1|0)>=0){i=b;return}Uq((c[a>>2]|0)+ -12|0);i=b;return}function If(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27520;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function Jf(a){a=a|0;var b=0;b=i;pe(a+4768|0);pe(a+4736|0);pe(a+4688|0);pe(a+4656|0);pe(a+4608|0);pe(a+4576|0);pe(a+4528|0);pe(a+4496|0);pe(a+4448|0);pe(a+4416|0);oe(a+4300|0);oe(a+4220|0);oe(a+4140|0);oe(a+4060|0);oe(a+3980|0);Kf(a);i=b;return}function Kf(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;d=c[a+896>>2]|0;if(d){e=c[d+8>>2]|0;if(e)Uq(c[e+ -4>>2]|0);e=c[d+12>>2]|0;if(e)Uq(c[e+ -4>>2]|0);e=c[d+16>>2]|0;if(e)Uq(c[e+ -4>>2]|0);Uq(d)}d=c[a+900>>2]|0;if(!d)d=0;else{e=c[d+8>>2]|0;if(e)Uq(c[e+ -4>>2]|0);e=c[d+12>>2]|0;if(e)Uq(c[e+ -4>>2]|0);e=c[d+16>>2]|0;if(e)Uq(c[e+ -4>>2]|0);Uq(d);d=0}do{e=c[a+(d<<2)+904>>2]|0;if(e){f=c[e+8>>2]|0;if(f)Uq(c[f+ -4>>2]|0);f=c[e+12>>2]|0;if(f)Uq(c[f+ -4>>2]|0);f=c[e+16>>2]|0;if(f)Uq(c[f+ -4>>2]|0);Uq(e)}e=c[a+(d<<2)+1928>>2]|0;if(e){f=c[e+8>>2]|0;if(f)Uq(c[f+ -4>>2]|0);f=c[e+12>>2]|0;if(f)Uq(c[f+ -4>>2]|0);f=c[e+16>>2]|0;if(f)Uq(c[f+ -4>>2]|0);Uq(e)}e=c[a+(d<<2)+2952>>2]|0;if(e){f=c[e+8>>2]|0;if(f)Uq(c[f+ -4>>2]|0);f=c[e+12>>2]|0;if(f)Uq(c[f+ -4>>2]|0);f=c[e+16>>2]|0;if(f)Uq(c[f+ -4>>2]|0);Uq(e)}d=d+1|0}while((d|0)!=256);d=c[a+860>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+864>>2]|0;if(d)Uq(c[d+ -4>>2]|0);a=c[a+868>>2]|0;if(!a){i=b;return}Uq(c[a+ -4>>2]|0);i=b;return}function Lf(a){a=a|0;var b=0,d=0;b=i;d=c[a+56>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+60>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+64>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+12>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+16>>2]|0;if(d)Uq(c[d+ -4>>2]|0);a=c[a+20>>2]|0;if(!a){i=b;return}Uq(c[a+ -4>>2]|0);i=b;return}function Mf(a){a=a|0;var b=0,d=0;b=i;d=c[a+280>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+284>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+288>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+236>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+240>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+244>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+192>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+196>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+200>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+148>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+152>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+156>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+104>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+108>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+112>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+60>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+64>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+68>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+16>>2]|0;if(d)Uq(c[d+ -4>>2]|0);d=c[a+20>>2]|0;if(d)Uq(c[d+ -4>>2]|0);a=c[a+24>>2]|0;if(!a){i=b;return}Uq(c[a+ -4>>2]|0);i=b;return}function Nf(b){b=b|0;var c=0,d=0;c=i;d=b+8|0;a[b+0>>0]=0;a[b+1>>0]=0;a[b+2>>0]=0;a[b+3>>0]=0;a[b+4>>0]=0;a[b+5>>0]=0;a[b+6>>0]=0;me(d,128);me(b+52|0,256);me(b+96|0,256);me(b+140|0,256);me(b+184|0,256);me(b+228|0,256);me(b+272|0,256);i=c;return}function Of(b){b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;a[b>>0]=0;me(b+4|0,516);e=b+48|0;c[e>>2]=6;a[b+52>>0]=0;c[b+80>>2]=5;c[b+64>>2]=0;c[b+88>>2]=0;c[b+84>>2]=0;g=Tq(92)|0;f=g+68&-64;c[f+ -4>>2]=g;c[b+56>>2]=f;f=Tq(92)|0;g=f+68&-64;c[g+ -4>>2]=f;c[b+60>>2]=g;c[b+68>>2]=0;f=b+72|0;c[f>>2]=6;h=0;do{c[g+(h<<2)>>2]=1;h=h+1|0}while(h>>>0<(c[e>>2]|0)>>>0);ke(e);e=((c[e>>2]|0)+6|0)>>>1;c[f>>2]=e;c[b+76>>2]=e;e=b+92|0;b=e+72|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(b|0));i=d;return}function Pf(d){d=d|0;var e=0,f=0,g=0;e=i;f=d+52|0;g=d+72|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+76|0;f=d+96|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;f=d+100|0;g=d+120|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+124|0;f=d+144|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;f=d+148|0;g=d+168|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+172|0;f=d+192|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;f=d+196|0;g=d+216|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+220|0;f=d+240|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;f=d+244|0;g=d+264|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+268|0;f=d+288|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;f=d+292|0;g=d+312|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+316|0;f=d+336|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;f=d+340|0;g=d+360|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+364|0;f=d+384|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;f=d+388|0;g=d+408|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+412|0;f=d+432|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;f=d+436|0;g=d+456|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+460|0;f=d+480|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;f=d+484|0;g=d+504|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+508|0;f=d+528|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;f=d+532|0;g=d+552|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+556|0;f=d+576|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;f=d+580|0;g=d+600|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+604|0;f=d+624|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;f=d+628|0;g=d+648|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+652|0;f=d+672|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;f=d+676|0;g=d+696|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+700|0;f=d+720|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;f=d+724|0;g=d+744|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+748|0;f=d+768|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;f=d+772|0;g=d+792|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a[g>>0]=1;g=d+796|0;f=d+816|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;a[f>>0]=1;me(d+852|0,64);a[d+3976>>0]=0;f=d+20|0;g=f+32|0;do{b[f>>1]=0;f=f+2|0}while((f|0)<(g|0));f=Tq(44)|0;a:do if(!f){while(1){f=c[6860]|0;c[6860]=f+0;if(!f)break;qd[f&3]();f=Tq(44)|0;if(f)break a}g=Wb(4)|0;c[g>>2]=27280;Zc(g|0,27328,220)}while(0);me(f,256);c[d+896>>2]=f;f=Tq(44)|0;b:do if(!f){while(1){f=c[6860]|0;c[6860]=f+0;if(!f)break;qd[f&3]();f=Tq(44)|0;if(f)break b}g=Wb(4)|0;c[g>>2]=27280;Zc(g|0,27328,220)}while(0);me(f,256);c[d+900>>2]=f;f=d+820|0;c[f+0>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;c[f+20>>2]=0;c[f+24>>2]=0;c[f+28>>2]=0;f=0;c:while(1){g=Tq(44)|0;if(!g)do{g=c[6860]|0;c[6860]=g+0;if(!g){f=20;break c}qd[g&3]();g=Tq(44)|0}while((g|0)==0);me(g,256);c[d+(f<<2)+904>>2]=g;g=Tq(44)|0;if(!g)do{g=c[6860]|0;c[6860]=g+0;if(!g){f=27;break c}qd[g&3]();g=Tq(44)|0}while((g|0)==0);me(g,256);c[d+(f<<2)+1928>>2]=g;g=Tq(44)|0;if(!g)do{g=c[6860]|0;c[6860]=g+0;if(!g){f=34;break c}qd[g&3]();g=Tq(44)|0}while((g|0)==0);me(g,256);c[d+(f<<2)+2952>>2]=g;f=f+1|0;if((f|0)>=256){f=38;break}}if((f|0)==20){g=Wb(4)|0;c[g>>2]=27280;Zc(g|0,27328,220)}else if((f|0)==27){g=Wb(4)|0;c[g>>2]=27280;Zc(g|0,27328,220)}else if((f|0)==34){g=Wb(4)|0;c[g>>2]=27280;Zc(g|0,27328,220)}else if((f|0)==38){c[d+3984>>2]=16;c[d+3988>>2]=4;c[d+3992>>2]=8;c[d+3996>>2]=0;c[d+4016>>2]=0;c[d+4020>>2]=0;c[d+4024>>2]=0;c[d+4040>>2]=1;c[d+4044>>2]=2;c[d+4036>>2]=4096;c[d+4032>>2]=4;c[d+4028>>2]=4;c[d+4048>>2]=0;c[d+4052>>2]=0;c[d+4056>>2]=0;c[d+4e3>>2]=16;c[d+4004>>2]=65536;c[d+4008>>2]=-32768;c[d+4012>>2]=32767;c[d+3980>>2]=0;c[d+4064>>2]=16;c[d+4068>>2]=1;c[d+4072>>2]=8;c[d+4076>>2]=0;c[d+4096>>2]=0;c[d+4100>>2]=0;c[d+4104>>2]=0;c[d+4120>>2]=1;c[d+4124>>2]=2;c[d+4116>>2]=4096;c[d+4112>>2]=4;c[d+4108>>2]=4;c[d+4128>>2]=0;c[d+4132>>2]=0;c[d+4136>>2]=0;c[d+4080>>2]=16;c[d+4084>>2]=65536;c[d+4088>>2]=-32768;c[d+4092>>2]=32767;c[d+4060>>2]=0;c[d+4144>>2]=32;c[d+4148>>2]=2;c[d+4152>>2]=8;c[d+4156>>2]=0;c[d+4176>>2]=0;c[d+4180>>2]=0;c[d+4184>>2]=0;c[d+4200>>2]=1;c[d+4204>>2]=2;c[d+4196>>2]=4096;c[d+4192>>2]=4;c[d+4188>>2]=4;c[d+4208>>2]=0;c[d+4212>>2]=0;c[d+4216>>2]=0;c[d+4160>>2]=32;c[d+4164>>2]=0;c[d+4168>>2]=-2147483648;c[d+4172>>2]=2147483647;c[d+4140>>2]=0;c[d+4224>>2]=32;c[d+4228>>2]=22;c[d+4232>>2]=8;c[d+4236>>2]=0;c[d+4256>>2]=0;c[d+4260>>2]=0;c[d+4264>>2]=0;c[d+4280>>2]=1;c[d+4284>>2]=2;c[d+4276>>2]=4096;c[d+4272>>2]=4;c[d+4268>>2]=4;c[d+4288>>2]=0;c[d+4292>>2]=0;c[d+4296>>2]=0;c[d+4240>>2]=32;c[d+4244>>2]=0;c[d+4248>>2]=-2147483648;c[d+4252>>2]=2147483647;c[d+4220>>2]=0;c[d+4304>>2]=32;c[d+4308>>2]=20;c[d+4312>>2]=8;c[d+4316>>2]=0;c[d+4336>>2]=0;c[d+4340>>2]=0;c[d+4344>>2]=0;c[d+4360>>2]=1;c[d+4364>>2]=2;c[d+4356>>2]=4096;c[d+4352>>2]=4;c[d+4348>>2]=4;c[d+4368>>2]=0;c[d+4372>>2]=0;c[d+4376>>2]=0;c[d+4320>>2]=32;c[d+4324>>2]=0;c[d+4328>>2]=-2147483648;c[d+4332>>2]=2147483647;c[d+4300>>2]=0;c[d+4384>>2]=16;c[d+4388>>2]=4;c[d+4392>>2]=8;c[d+4396>>2]=0;c[d+4416>>2]=0;c[d+4420>>2]=0;c[d+4424>>2]=0;c[d+4440>>2]=1;c[d+4444>>2]=2;c[d+4436>>2]=4096;c[d+4432>>2]=4;c[d+4428>>2]=4;c[d+4448>>2]=0;c[d+4452>>2]=0;c[d+4456>>2]=0;c[d+4400>>2]=16;c[d+4404>>2]=65536;c[d+4408>>2]=-32768;c[d+4412>>2]=32767;c[d+4380>>2]=0;c[d+4464>>2]=16;c[d+4468>>2]=1;c[d+4472>>2]=8;c[d+4476>>2]=0;c[d+4496>>2]=0;c[d+4500>>2]=0;c[d+4504>>2]=0;c[d+4520>>2]=1;c[d+4524>>2]=2;c[d+4516>>2]=4096;c[d+4512>>2]=4;c[d+4508>>2]=4;c[d+4528>>2]=0;c[d+4532>>2]=0;c[d+4536>>2]=0;c[d+4480>>2]=16;c[d+4484>>2]=65536;c[d+4488>>2]=-32768;c[d+4492>>2]=32767;c[d+4460>>2]=0;c[d+4544>>2]=32;c[d+4548>>2]=2;c[d+4552>>2]=8;c[d+4556>>2]=0;c[d+4576>>2]=0;c[d+4580>>2]=0;c[d+4584>>2]=0;c[d+4600>>2]=1;c[d+4604>>2]=2;c[d+4596>>2]=4096;c[d+4592>>2]=4;c[d+4588>>2]=4;c[d+4608>>2]=0;c[d+4612>>2]=0;c[d+4616>>2]=0;c[d+4560>>2]=32;c[d+4564>>2]=0;c[d+4568>>2]=-2147483648;c[d+4572>>2]=2147483647;c[d+4540>>2]=0;c[d+4624>>2]=32;c[d+4628>>2]=22;c[d+4632>>2]=8;c[d+4636>>2]=0;c[d+4656>>2]=0;c[d+4660>>2]=0;c[d+4664>>2]=0;c[d+4680>>2]=1;c[d+4684>>2]=2;c[d+4676>>2]=4096;c[d+4672>>2]=4;c[d+4668>>2]=4;c[d+4688>>2]=0;c[d+4692>>2]=0;c[d+4696>>2]=0;c[d+4640>>2]=32;c[d+4644>>2]=0;c[d+4648>>2]=-2147483648;c[d+4652>>2]=2147483647;c[d+4620>>2]=0;c[d+4704>>2]=32;c[d+4708>>2]=20;c[d+4712>>2]=8;c[d+4716>>2]=0;c[d+4736>>2]=0;c[d+4740>>2]=0;c[d+4744>>2]=0;c[d+4760>>2]=1;c[d+4764>>2]=2;c[d+4756>>2]=4096;c[d+4752>>2]=4;c[d+4748>>2]=4;c[d+4768>>2]=0;c[d+4772>>2]=0;c[d+4776>>2]=0;c[d+4720>>2]=32;c[d+4724>>2]=0;c[d+4728>>2]=-2147483648;c[d+4732>>2]=2147483647;c[d+4700>>2]=0;a[d+4780>>0]=0;a[d+4781>>0]=0;i=e;return}}function Qf(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+32|0;h=e;f=c[b+8>>2]|0;b=c[b+4>>2]|0;Tf(h,f,b);g=c[h>>2]|0;a[d+3>>0]=g>>>24;a[d+2>>0]=g>>>16;a[d+1>>0]=g>>>8;a[d>>0]=g;g=c[h+4>>2]|0;a[d+7>>0]=g>>>24;a[d+6>>0]=g>>>16;a[d+5>>0]=g>>>8;a[d+4>>0]=g;g=c[h+8>>2]|0;a[d+11>>0]=g>>>24;a[d+10>>0]=g>>>16;a[d+9>>0]=g>>>8;a[d+8>>0]=g;g=c[h+12>>2]|0;a[d+13>>0]=(g&65535)>>>8;a[d+12>>0]=g;a[d+14>>0]=g>>>16;a[d+15>>0]=g>>>24;h=c[h+16>>2]|0;a[d+16>>0]=h;a[d+17>>0]=(h&65535)>>>8;a[d+19>>0]=h>>>24;a[d+18>>0]=h>>>16;h=Uf(f+4784|0,b)|0;g=H;a[d+23>>0]=h>>>24;a[d+22>>0]=h>>>16;a[d+21>>0]=h>>>8;a[d+20>>0]=h;j=lr(h|0,g|0,56)|0;a[d+27>>0]=j;j=lr(h|0,g|0,48)|0;a[d+26>>0]=j;h=lr(h|0,g|0,40)|0;a[d+25>>0]=h;a[d+24>>0]=g;Vf(f+5112|0,b,d+28|0);i=e;return}function Rf(a){a=a|0;var b=0;b=i;c[a>>2]=5368;a=c[a+8>>2]|0;if(!a){i=b;return}Mf(a+5112|0);pe(a+5096|0);pe(a+5064|0);oe(a+4948|0);Lf(a+4784|0);Jf(a);Uq(a);i=b;return}function Sf(a){a=a|0;var b=0,d=0;b=i;c[a>>2]=5368;d=c[a+8>>2]|0;if(!d){Uq(a);i=b;return}Mf(d+5112|0);pe(d+5096|0);pe(d+5064|0);oe(d+4948|0);Lf(d+4784|0);Jf(d);Uq(d);Uq(a);i=b;return}function Tf(f,g,h){f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;j=i;i=i+32|0;k=j;l=g+4781|0;if(!(a[l>>0]|0)){ge(g+4380|0);ge(g+4460|0);ge(g+4540|0);ge(g+4620|0);ge(g+4700|0);a[l>>0]=1}l=g+3976|0;if(!(a[l>>0]|0)){a[l>>0]=1;Zf(c[h>>2]|0,k,20);r=d[k+1>>0]<<8|d[k>>0]|d[k+2>>0]<<16|d[k+3>>0]<<24;o=d[k+5>>0]<<8|d[k+4>>0]|d[k+6>>0]<<16|d[k+7>>0]<<24;p=d[k+9>>0]<<8|d[k+8>>0]|d[k+10>>0]<<16|d[k+11>>0]<<24;q=(a[k+13>>0]<<8|d[k+12>>0])&65535;s=a[k+14>>0]|0;t=a[k+15>>0]|0;u=a[k+16>>0]|0;h=a[k+17>>0]|0;v=(a[k+19>>0]<<8|d[k+18>>0])&65535;a[g>>0]=r;a[g+1>>0]=r>>8;a[g+2>>0]=r>>16;a[g+3>>0]=r>>24;r=g+4|0;a[r>>0]=o;a[r+1>>0]=o>>8;a[r+2>>0]=o>>16;a[r+3>>0]=o>>24;r=g+8|0;a[r>>0]=p;a[r+1>>0]=p>>8;a[r+2>>0]=p>>16;a[r+3>>0]=p>>24;r=g+12|0;a[r>>0]=q;a[r+1>>0]=q>>8;a[g+14>>0]=s;a[g+15>>0]=t;a[g+16>>0]=u;a[g+17>>0]=h;h=g+18|0;a[h>>0]=v;a[h+1>>0]=v>>8;f=f+0|0;h=g+0|0;g=f+20|0;do{a[f>>0]=a[h>>0]|0;f=f+1|0;h=h+1|0}while((f|0)<(g|0));i=j;return}m=_f(h,g+852|0)|0;if(m){o=g+14|0;k=a[o>>0]|0;if(m&32){k=(_f(h,c[g+((((k&255)>>>7&255)<<7|k&7|((k&255)>>>6&255)<<6&64|((k&255)>>>3&255)<<3&56)<<2)+904>>2]|0)|0)&255;a[o>>0]=k}l=k&7;k=(k&255)>>>3&7;n=d[5768+(k<<3)+l>>0]|0;l=d[5832+(k<<3)+l>>0]|0;if(!(m&16)){u=b[g+(n<<1)+20>>1]|0;v=g+12|0;a[v>>0]=u;a[v+1>>0]=u>>8}else{p=g+(n<<1)+20|0;q=e[p>>1]|0;q=($f(g+4380|0,h,(c[g+4416>>2]|0)+((n>>>0<3?n:3)*44|0)|0)|0)+q|0;r=c[g+4404>>2]|0;if((q|0)<0)q=q+r|0;else q=q-(q>>>0<r>>>0?0:r)|0;v=q&65535;u=g+12|0;a[u>>0]=v;a[u+1>>0]=v>>8;b[p>>1]=v}if(m&8){v=g+15|0;a[v>>0]=_f(h,c[g+(d[v>>0]<<2)+1928>>2]|0)|0}if(m&4){p=_f(h,c[g+(((d[o>>0]|0)>>>6&1)<<2)+896>>2]|0)|0;o=g+16|0;p=(a[o>>0]|0)+p|0;if((p|0)<0)p=p+256|0;else p=(p|0)>255?p+ -256|0:p;a[o>>0]=p}if(m&2){v=g+17|0;a[v>>0]=_f(h,c[g+(d[v>>0]<<2)+2952>>2]|0)|0}if(m&1){m=g+18|0;p=(d[m>>0]|d[m+1>>0]<<8)&65535;p=($f(g+4460|0,h,c[g+4496>>2]|0)|0)+p|0;o=c[g+4484>>2]|0;if((p|0)<0)o=p+o|0;else o=p-(p>>>0<o>>>0?0:o)|0;v=o&65535;a[m>>0]=v;a[m+1>>0]=v>>8}}else{k=a[g+14>>0]|0;n=k&7;k=(k&255)>>>3&7;l=d[5832+(k<<3)+n>>0]|0;n=d[5768+(k<<3)+n>>0]|0}q=g+(n*24|0)+52|0;o=g+(n*24|0)+60|0;p=c[o>>2]|0;m=g+4540|0;k=(k|0)==1&1;p=($f(m,h,(c[g+4576>>2]|0)+(k*44|0)|0)|0)+p|0;r=c[g+4564>>2]|0;if((p|0)<0)p=p+r|0;else p=p-(p>>>0<r>>>0?0:r)|0;r=(d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24)+p|0;a[g>>0]=r;a[g+1>>0]=r>>8;a[g+2>>0]=r>>16;a[g+3>>0]=r>>24;r=g+(n*24|0)+72|0;s=c[o>>2]|0;do if(!(a[r>>0]|0)){u=g+(n*24|0)+56|0;t=c[u>>2]|0;if((s|0)>=(p|0)){if((t|0)<(p|0)){c[q>>2]=t;c[u>>2]=p}else c[q>>2]=p;a[r>>0]=1;break}c[q>>2]=t;c[u>>2]=s;t=g+(n*24|0)+68|0;q=c[t>>2]|0;s=g+(n*24|0)+64|0;r=c[s>>2]|0;if((q|0)<(p|0)){c[o>>2]=r;c[s>>2]=q;c[t>>2]=p;break}if((r|0)<(p|0)){c[o>>2]=r;c[s>>2]=p;break}else{c[o>>2]=p;break}}else{t=g+(n*24|0)+64|0;u=c[t>>2]|0;if((p|0)>=(s|0)){o=g+(n*24|0)+68|0;if((p|0)<(u|0)){c[o>>2]=u;c[t>>2]=p}else c[o>>2]=p;a[r>>0]=0;break}c[g+(n*24|0)+68>>2]=u;c[t>>2]=s;s=c[q>>2]|0;t=g+(n*24|0)+56|0;r=c[t>>2]|0;if((p|0)<(s|0)){c[o>>2]=r;c[t>>2]=s;c[q>>2]=p;break}if((p|0)<(r|0)){c[o>>2]=r;c[t>>2]=p;break}else{c[o>>2]=p;break}}while(0);r=g+(n*24|0)+436|0;p=g+(n*24|0)+444|0;q=c[p>>2]|0;s=c[m>>2]|0;o=g+4620|0;q=($f(o,h,(c[g+4656>>2]|0)+(((s>>>0<20?s&-2:20)|k)*44|0)|0)|0)+q|0;s=c[g+4644>>2]|0;if((q|0)<0)q=q+s|0;else q=q-(q>>>0<s>>>0?0:s)|0;s=g+4|0;t=(d[s>>0]|d[s+1>>0]<<8|d[s+2>>0]<<16|d[s+3>>0]<<24)+q|0;a[s>>0]=t;a[s+1>>0]=t>>8;a[s+2>>0]=t>>16;a[s+3>>0]=t>>24;s=g+(n*24|0)+456|0;t=c[p>>2]|0;do if(!(a[s>>0]|0)){u=g+(n*24|0)+440|0;v=c[u>>2]|0;if((t|0)>=(q|0)){if((v|0)<(q|0)){c[r>>2]=v;c[u>>2]=q}else c[r>>2]=q;a[s>>0]=1;break}c[r>>2]=v;c[u>>2]=t;s=g+(n*24|0)+452|0;r=c[s>>2]|0;n=g+(n*24|0)+448|0;t=c[n>>2]|0;if((r|0)<(q|0)){c[p>>2]=t;c[n>>2]=r;c[s>>2]=q;break}if((t|0)<(q|0)){c[p>>2]=t;c[n>>2]=q;break}else{c[p>>2]=q;break}}else{u=g+(n*24|0)+448|0;v=c[u>>2]|0;if((q|0)>=(t|0)){n=g+(n*24|0)+452|0;if((q|0)<(v|0)){c[n>>2]=v;c[u>>2]=q}else c[n>>2]=q;a[s>>0]=0;break}c[g+(n*24|0)+452>>2]=v;c[u>>2]=t;s=c[r>>2]|0;n=g+(n*24|0)+440|0;t=c[n>>2]|0;if((q|0)<(s|0)){c[p>>2]=t;c[n>>2]=s;c[r>>2]=q;break}if((q|0)<(t|0)){c[p>>2]=t;c[n>>2]=q;break}else{c[p>>2]=q;break}}while(0);m=(c[o>>2]|0)+(c[m>>2]|0)|0;l=g+(l<<2)+820|0;n=c[l>>2]|0;if(m>>>0<36)m=m>>>1&2147483646;else m=18;k=($f(g+4700|0,h,(c[g+4736>>2]|0)+((m|k)*44|0)|0)|0)+n|0;h=c[g+4724>>2]|0;if((k|0)<0)h=k+h|0;else h=k-(k>>>0<h>>>0?0:h)|0;v=g+8|0;a[v>>0]=h;a[v+1>>0]=h>>8;a[v+2>>0]=h>>16;a[v+3>>0]=h>>24;c[l>>2]=h;f=f+0|0;h=g+0|0;g=f+20|0;do{a[f>>0]=a[h>>0]|0;f=f+1|0;h=h+1|0}while((f|0)<(g|0));i=j;return}function Uf(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;i=i+16|0;g=f;h=b+325|0;if(!(a[h>>0]|0)){ge(b+244|0);a[h>>0]=1}if(!(a[b>>0]|0)){a[b>>0]=1;Zf(c[e>>2]|0,g,8);n=d[g+1>>0]<<8|d[g>>0]|d[g+2>>0]<<16|d[g+3>>0]<<24;m=d[g+5>>0]<<8|d[g+4>>0]|d[g+6>>0]<<16|d[g+7>>0]<<24;l=b+100|0;k=l;a[k>>0]=n;a[k+1>>0]=n>>8;a[k+2>>0]=n>>16;a[k+3>>0]=n>>24;l=l+4|0;a[l>>0]=m;a[l+1>>0]=m>>8;a[l+2>>0]=m>>16;a[l+3>>0]=m>>24;H=m;i=f;return n|0}g=b+92|0;do if(!(c[b+(c[g>>2]<<2)+132>>2]|0)){h=_f(e,b+48|0)|0;if((h|0)==2){h=b+96|0;c[h>>2]=(c[h>>2]|0)+1&3;j=b+(c[g>>2]<<3)+104|0;j=d[j>>0]|d[j+1>>0]<<8|d[j+2>>0]<<16|d[j+3>>0]<<24;j=($f(b+244|0,e,(c[b+280>>2]|0)+352|0)|0)+j|0;k=c[b+268>>2]|0;if((j|0)<0)j=j+k|0;else j=j-(j>>>0<k>>>0?0:k)|0;m=((j|0)<0)<<31>>31;k=b+(c[h>>2]<<3)+100|0;n=k;a[n>>0]=j;a[n+1>>0]=j>>8;a[n+2>>0]=j>>16;a[n+3>>0]=j>>24;k=k+4|0;a[k>>0]=m;a[k+1>>0]=m>>8;a[k+2>>0]=m>>16;a[k+3>>0]=m>>24;k=b+(c[h>>2]<<3)+100|0;m=k;m=d[m>>0]|d[m+1>>0]<<8|d[m+2>>0]<<16|d[m+3>>0]<<24;j=k;a[j>>0]=0;a[j+1>>0]=0;a[j+2>>0]=0;a[j+3>>0]=0;k=k+4|0;a[k>>0]=m;a[k+1>>0]=m>>8;a[k+2>>0]=m>>16;a[k+3>>0]=m>>24;k=e+4|0;m=c[k>>2]|0;j=e+8|0;n=(c[j>>2]|0)>>>16;c[j>>2]=n;l=(m>>>0)/(n>>>0)|0;n=m-(da(n,l)|0)|0;c[k>>2]=n;do{n=(Wf(c[e>>2]|0)|0)&255|n<<8;c[k>>2]=n;m=c[j>>2]|0;o=m<<8;c[j>>2]=o}while(o>>>0<16777216);o=m>>>8&65535;c[j>>2]=o;m=(n>>>0)/(o>>>0)|0;n=n-(da(m,o)|0)|0;c[k>>2]=n;do{n=(Wf(c[e>>2]|0)|0)&255|n<<8;c[k>>2]=n;o=c[j>>2]<<8;c[j>>2]=o}while(o>>>0<16777216);o=b+(c[h>>2]<<3)+100|0;n=o;k=n;n=n+4|0;n=d[n>>0]|d[n+1>>0]<<8|d[n+2>>0]<<16|d[n+3>>0]<<24;l=d[k>>0]|d[k+1>>0]<<8|d[k+2>>0]<<16|d[k+3>>0]<<24|(m<<16|l&65535);m=o;a[m>>0]=l;a[m+1>>0]=l>>8;a[m+2>>0]=l>>16;a[m+3>>0]=l>>24;o=o+4|0;a[o>>0]=n;a[o+1>>0]=n>>8;a[o+2>>0]=n>>16;a[o+3>>0]=n>>24;o=c[h>>2]|0;c[g>>2]=o;c[b+(o<<2)+132>>2]=0;c[b+(c[g>>2]<<2)+148>>2]=0;break}else if((h|0)==1){e=$f(b+244|0,e,c[b+280>>2]|0)|0;h=c[b+268>>2]|0;if((e|0)<0)e=h+e|0;else e=e-(e>>>0<h>>>0?0:h)|0;c[b+(c[g>>2]<<2)+132>>2]=e;o=c[g>>2]|0;l=c[b+(o<<2)+132>>2]|0;o=b+(o<<3)+100|0;n=o;m=n;n=n+4|0;l=kr(d[m>>0]|d[m+1>>0]<<8|d[m+2>>0]<<16|d[m+3>>0]<<24|0,d[n>>0]|d[n+1>>0]<<8|d[n+2>>0]<<16|d[n+3>>0]<<24|0,l|0,((l|0)<0)<<31>>31|0)|0;n=H;m=o;a[m>>0]=l;a[m+1>>0]=l>>8;a[m+2>>0]=l>>16;a[m+3>>0]=l>>24;o=o+4|0;a[o>>0]=n;a[o+1>>0]=n>>8;a[o+2>>0]=n>>16;a[o+3>>0]=n>>24;c[b+(c[g>>2]<<2)+148>>2]=0;break}else{if((h|0)<=2)break;c[g>>2]=h+2+(c[g>>2]|0)&3;Uf(b,e)|0;break}}else{h=_f(e,b+4|0)|0;if((h|0)==1){h=c[b+(c[g>>2]<<2)+132>>2]|0;e=($f(b+244|0,e,(c[b+280>>2]|0)+44|0)|0)+h|0;h=c[b+268>>2]|0;if((e|0)<0)e=e+h|0;else e=e-(e>>>0<h>>>0?0:h)|0;o=b+(c[g>>2]<<3)+100|0;l=o;n=l;l=l+4|0;l=kr(d[n>>0]|d[n+1>>0]<<8|d[n+2>>0]<<16|d[n+3>>0]<<24|0,d[l>>0]|d[l+1>>0]<<8|d[l+2>>0]<<16|d[l+3>>0]<<24|0,e|0,((e|0)<0)<<31>>31|0)|0;n=H;m=o;a[m>>0]=l;a[m+1>>0]=l>>8;a[m+2>>0]=l>>16;a[m+3>>0]=l>>24;o=o+4|0;a[o>>0]=n;a[o+1>>0]=n>>8;a[o+2>>0]=n>>16;a[o+3>>0]=n>>24;c[b+(c[g>>2]<<2)+148>>2]=0;break}if((h|0)>=511){if((h|0)!=512){if((h|0)<=511)break;c[g>>2]=(c[g>>2]|0)+h&3;Uf(b,e)|0;break}h=b+96|0;c[h>>2]=(c[h>>2]|0)+1&3;k=b+(c[g>>2]<<3)+104|0;k=d[k>>0]|d[k+1>>0]<<8|d[k+2>>0]<<16|d[k+3>>0]<<24;k=($f(b+244|0,e,(c[b+280>>2]|0)+352|0)|0)+k|0;j=c[b+268>>2]|0;if((k|0)<0)j=k+j|0;else j=k-(k>>>0<j>>>0?0:j)|0;o=((j|0)<0)<<31>>31;k=b+(c[h>>2]<<3)+100|0;l=k;a[l>>0]=j;a[l+1>>0]=j>>8;a[l+2>>0]=j>>16;a[l+3>>0]=j>>24;k=k+4|0;a[k>>0]=o;a[k+1>>0]=o>>8;a[k+2>>0]=o>>16;a[k+3>>0]=o>>24;k=b+(c[h>>2]<<3)+100|0;o=k;o=d[o>>0]|d[o+1>>0]<<8|d[o+2>>0]<<16|d[o+3>>0]<<24;l=k;a[l>>0]=0;a[l+1>>0]=0;a[l+2>>0]=0;a[l+3>>0]=0;k=k+4|0;a[k>>0]=o;a[k+1>>0]=o>>8;a[k+2>>0]=o>>16;a[k+3>>0]=o>>24;k=e+4|0;o=c[k>>2]|0;l=e+8|0;m=(c[l>>2]|0)>>>16;c[l>>2]=m;j=(o>>>0)/(m>>>0)|0;m=o-(da(m,j)|0)|0;c[k>>2]=m;do{m=(Wf(c[e>>2]|0)|0)&255|m<<8;c[k>>2]=m;n=c[l>>2]|0;o=n<<8;c[l>>2]=o}while(o>>>0<16777216);o=n>>>8&65535;c[l>>2]=o;n=(m>>>0)/(o>>>0)|0;m=m-(da(n,o)|0)|0;c[k>>2]=m;do{m=(Wf(c[e>>2]|0)|0)&255|m<<8;c[k>>2]=m;o=c[l>>2]<<8;c[l>>2]=o}while(o>>>0<16777216);o=b+(c[h>>2]<<3)+100|0;m=o;l=m;m=m+4|0;m=d[m>>0]|d[m+1>>0]<<8|d[m+2>>0]<<16|d[m+3>>0]<<24;l=d[l>>0]|d[l+1>>0]<<8|d[l+2>>0]<<16|d[l+3>>0]<<24|(n<<16|j&65535);n=o;a[n>>0]=l;a[n+1>>0]=l>>8;a[n+2>>0]=l>>16;a[n+3>>0]=l>>24;o=o+4|0;a[o>>0]=m;a[o+1>>0]=m>>8;a[o+2>>0]=m>>16;a[o+3>>0]=m>>24;o=c[h>>2]|0;c[g>>2]=o;c[b+(o<<2)+132>>2]=0;c[b+(c[g>>2]<<2)+148>>2]=0;break}do if(!h){e=$f(b+244|0,e,(c[b+280>>2]|0)+308|0)|0;h=c[b+268>>2]|0;if((e|0)<0)e=h+e|0;else e=e-(e>>>0<h>>>0?0:h)|0;h=b+(c[g>>2]<<2)+148|0;c[h>>2]=(c[h>>2]|0)+1;h=c[g>>2]|0;if((c[b+(h<<2)+148>>2]|0)>3){c[b+(h<<2)+132>>2]=e;c[b+(c[g>>2]<<2)+148>>2]=0}}else{if((h|0)<500){l=b+244|0;j=da(c[b+(c[g>>2]<<2)+132>>2]|0,h)|0;k=c[b+280>>2]|0;if((h|0)<10){h=($f(l,e,k+88|0)|0)+j|0;e=c[b+268>>2]|0;if((h|0)<0){e=h+e|0;break}else{e=h-(h>>>0<e>>>0?0:e)|0;break}}else{h=($f(l,e,k+132|0)|0)+j|0;e=c[b+268>>2]|0;if((h|0)<0){e=h+e|0;break}else{e=h-(h>>>0<e>>>0?0:e)|0;break}}}if((h|0)==500){h=(c[b+(c[g>>2]<<2)+132>>2]|0)*500|0;h=($f(b+244|0,e,(c[b+280>>2]|0)+176|0)|0)+h|0;e=c[b+268>>2]|0;if((h|0)<0)e=h+e|0;else e=h-(h>>>0<e>>>0?0:e)|0;h=b+(c[g>>2]<<2)+148|0;c[h>>2]=(c[h>>2]|0)+1;h=c[g>>2]|0;if((c[b+(h<<2)+148>>2]|0)<=3)break;c[b+(h<<2)+132>>2]=e;c[b+(c[g>>2]<<2)+148>>2]=0;break}h=500-h|0;k=b+244|0;j=c[b+(c[g>>2]<<2)+132>>2]|0;if((h|0)>-10){h=da(j,h)|0;h=($f(k,e,(c[b+280>>2]|0)+220|0)|0)+h|0;e=c[b+268>>2]|0;if((h|0)<0){e=h+e|0;break}else{e=h-(h>>>0<e>>>0?0:e)|0;break}}h=da(j,-10)|0;e=($f(k,e,(c[b+280>>2]|0)+264|0)|0)+h|0;h=c[b+268>>2]|0;if((e|0)<0)h=e+h|0;else h=e-(e>>>0<h>>>0?0:h)|0;e=b+(c[g>>2]<<2)+148|0;c[e>>2]=(c[e>>2]|0)+1;e=c[g>>2]|0;if((c[b+(e<<2)+148>>2]|0)>3){c[b+(e<<2)+132>>2]=h;c[b+(c[g>>2]<<2)+148>>2]=0;e=h}else e=h}while(0);o=b+(c[g>>2]<<3)+100|0;l=o;n=l;l=l+4|0;l=kr(d[n>>0]|d[n+1>>0]<<8|d[n+2>>0]<<16|d[n+3>>0]<<24|0,d[l>>0]|d[l+1>>0]<<8|d[l+2>>0]<<16|d[l+3>>0]<<24|0,e|0,((e|0)<0)<<31>>31|0)|0;n=H;m=o;a[m>>0]=l;a[m+1>>0]=l>>8;a[m+2>>0]=l>>16;a[m+3>>0]=l>>24;o=o+4|0;a[o>>0]=n;a[o+1>>0]=n>>8;a[o+2>>0]=n>>16;a[o+3>>0]=n>>24}while(0);n=b+(c[g>>2]<<3)+100|0;o=n;n=n+4|0;n=d[n>>0]|d[n+1>>0]<<8|d[n+2>>0]<<16|d[n+3>>0]<<24;o=d[o>>0]|d[o+1>>0]<<8|d[o+2>>0]<<16|d[o+3>>0]<<24;H=n;i=f;return o|0}function Vf(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;g=i;i=i+16|0;h=g;if(!(a[b>>0]|0)){a[b>>0]=1;Zf(c[e>>2]|0,h,6);u=a[h+1>>0]<<8|d[h>>0];j=u&65535;l=a[h+2>>0]|0;k=(a[h+3>>0]<<8|l&255)&65535;n=a[h+4>>0]|0;m=(a[h+5>>0]<<8|n&255)&65535;h=b+1|0;a[h>>0]=j;a[h+1>>0]=j>>8;h=b+3|0;a[h>>0]=k;a[h+1>>0]=k>>8;h=b+5|0;a[h>>0]=m;a[h+1>>0]=m>>8;h=u;m=(m&65535)>>>8&255}else{l=_f(e,b+8|0)|0;if(!(l&1)){m=b+1|0;m=d[m>>0]|d[m+1>>0]<<8;h=m&255}else{h=(_f(e,b+52|0)|0)&255;m=b+1|0;m=d[m>>0]|d[m+1>>0]<<8;h=(m&255)+h|0;h=(h|0)>255?h+65280|0:h}if(!(l&2))h=m&65280|h&65535;else{u=(_f(e,b+96|0)|0)&255;m=b+1|0;m=d[m>>0]|d[m+1>>0]<<8;u=((m&65535)>>>8)+u|0;h=((u|0)>255?u+65280|0:u)<<8|h&65535}j=h&65535;do if(!(l&64)){k=b+1|0;l=b+5|0;n=j;m=j}else{k=b+1|0;m=(h&255)-(m&255)|0;do if(l&4){p=_f(e,b+140|0)|0;n=p&255;o=b+3|0;o=d[o>>0]|d[o+1>>0]<<8;q=o&65535;r=(q&255)+m|0;s=(r|0)<1;if((r+ -1|0)>>>0>253)t=s?0:255;else t=q+m&255;if((t+n|0)>255){if(!s)if((r|0)>254)n=255;else n=q+m&255;else n=0;n=(p|-256)+n|0;break}else{if(!s)if((r|0)>254)p=255;else p=q+m&255;else p=0;n=p+n|0;break}}else{o=b+3|0;o=d[o>>0]|d[o+1>>0]<<8;n=o&255}while(0);do if(l&16){p=_f(e,b+228|0)|0;o=b+3|0;o=d[o>>0]|d[o+1>>0]<<8;r=((n&255)+m-(o&255)|0)/2|0;m=p&255;t=b+5|0;t=(d[t>>0]|d[t+1>>0]<<8)&65535;u=(t&255)+r|0;s=(u|0)<1;if((u+ -1|0)>>>0>253)q=s?0:255;else q=t+r&255;if((q+m|0)>255){if(!s)if((u|0)>254)m=255;else m=t+r&255;else m=0;m=(p|-256)+m|0;p=o;break}else{if(!s)if((u|0)>254)p=255;else p=t+r&255;else p=0;m=p+m|0;p=o;break}}else{m=b+5|0;m=(d[m>>0]|d[m+1>>0]<<8)&255;p=o}while(0);o=(h>>>8&255)-(((d[k>>0]|d[k+1>>0]<<8)&65535)>>>8)|0;if(!(l&8))r=p&65280|n&65535;else{p=_f(e,b+184|0)|0;q=p&255;t=b+3|0;t=(((d[t>>0]|d[t+1>>0]<<8)&65535)>>>8)+o|0;r=(t|0)<1;if(r)s=0;else s=(t|0)>254?255:t&255;if((s+q|0)>255){if(r)q=0;else q=(t|0)>254?255:t&255;p=(p|-256)+q|0}else{if(r)p=0;else p=(t|0)>254?255:t&255;p=p+q|0}r=p<<8|n&65535}n=r&65535;if(!(l&32)){u=b+5|0;l=u;m=((d[u>>0]|d[u+1>>0]<<8)&65280|m)&65535;break}q=_f(e,b+272|0)|0;u=b+3|0;p=q&255;l=b+5|0;r=(((d[l>>0]|d[l+1>>0]<<8)&65535)>>>8)+(((r>>>8&255)+o-(((d[u>>0]|d[u+1>>0]<<8)&65535)>>>8)|0)/2|0)|0;o=(r|0)<1;if(o)s=0;else s=(r|0)>254?255:r&255;if((s+p|0)>255){if(o)o=0;else o=(r|0)>254?255:r&255;o=(q|-256)+o|0}else{if(o)o=0;else o=(r|0)>254?255:r&255;o=o+p|0}m=(o<<8|m)&65535}while(0);a[k>>0]=j;a[k+1>>0]=j>>8;k=b+3|0;a[k>>0]=n;a[k+1>>0]=n>>8;a[l>>0]=m;a[l+1>>0]=m>>8;k=n;l=n&255;n=m&255;m=(m&65535)>>>8&255}a[f+1>>0]=(j&65535)>>>8;a[f>>0]=h;a[f+3>>0]=(k&65535)>>>8;a[f+2>>0]=l;a[f+5>>0]=m;a[f+4>>0]=n;f=b+316|0;if(!(a[f>>0]|0)){i=g;return}u=((Wf(c[e>>2]|0)|0)&255)<<24;u=((Wf(c[e>>2]|0)|0)&255)<<16|u;u=u|((Wf(c[e>>2]|0)|0)&255)<<8;c[e+4>>2]=u|(Wf(c[e>>2]|0)|0)&255;a[f>>0]=0;i=g;return}function Wf(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;d=b+4|0;g=c[d>>2]|0;e=b+8|0;if((g|0)<(c[e>>2]|0)){h=g;g=h+1|0;c[d>>2]=g;g=b+12|0;g=c[g>>2]|0;h=g+h|0;h=a[h>>0]|0;i=f;return h|0}c[d>>2]=0;g=c[b>>2]|0;h=g+13|0;if(!(a[h>>0]|0)){j=g+4|0;m=g+8|0;k=c[m>>2]|0;l=(c[j>>2]|0)-k|0;l=(l|0)<1048576?l:1048576;pr(c[b+12>>2]|0,(c[g>>2]|0)+k|0,l|0)|0;k=(c[m>>2]|0)+l|0;c[m>>2]=k;c[g+16>>2]=l;if((k|0)>=(c[j>>2]|0))a[h>>0]=1}else a[g+12>>0]=1;m=c[(c[b>>2]|0)+16>>2]|0;c[e>>2]=m;if(m){m=c[d>>2]|0;l=m+1|0;c[d>>2]=l;l=b+12|0;l=c[l>>2]|0;m=l+m|0;m=a[m>>0]|0;i=f;return m|0}b=Wb(8)|0;c[b>>2]=27520;d=b+4|0;e=Tq(32)|0;a:do if(!e){while(1){e=c[6860]|0;c[6860]=e+0;if(!e)break;qd[e&3]();e=Tq(32)|0;if(e)break a}m=Wb(4)|0;c[m>>2]=27280;Zc(m|0,27328,220)}while(0);c[e>>2]=19;c[e+4>>2]=19;c[e+8>>2]=0;f=e+12|0;h=f+0|0;g=5720;e=h+20|0;do{a[h>>0]=a[g>>0]|0;h=h+1|0;g=g+1|0}while((h|0)<(e|0));c[d>>2]=f;c[b>>2]=5752;Zc(b|0,5704,55);return 0}function Xf(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=27520;a=a+4|0;e=(c[a>>2]|0)+ -4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if((d+ -1|0)>=0){i=b;return}Uq((c[a>>2]|0)+ -12|0);i=b;return}function Yf(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27520;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function Zf(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;g=i;h=b+4|0;k=c[h>>2]|0;j=b+8|0;do if((k|0)<(c[j>>2]|0))j=k;else{c[h>>2]=0;k=c[b>>2]|0;l=k+13|0;if(!(a[l>>0]|0)){m=k+4|0;p=k+8|0;n=c[p>>2]|0;o=(c[m>>2]|0)-n|0;o=(o|0)<1048576?o:1048576;pr(c[b+12>>2]|0,(c[k>>2]|0)+n|0,o|0)|0;n=(c[p>>2]|0)+o|0;c[p>>2]=n;c[k+16>>2]=o;if((n|0)>=(c[m>>2]|0))a[l>>0]=1}else a[k+12>>0]=1;p=c[(c[b>>2]|0)+16>>2]|0;c[j>>2]=p;if(p){j=c[h>>2]|0;break}e=Wb(8)|0;c[e>>2]=27520;g=e+4|0;h=Tq(32)|0;if(h){c[h>>2]=19;d=h+4|0;c[d>>2]=19;d=h+8|0;c[d>>2]=0;h=h+12|0;d=h+0|0;b=5720;f=d+20|0;do{a[d>>0]=a[b>>0]|0;d=d+1|0;b=b+1|0}while((d|0)<(f|0));c[g>>2]=h;c[e>>2]=5752;Zc(e|0,5704,55)}while(1){h=c[6860]|0;c[6860]=h+0;if(!h)break;qd[h&3]();h=Tq(32)|0;if(h){f=14;break}}if((f|0)==14){c[h>>2]=19;d=h+4|0;c[d>>2]=19;d=h+8|0;c[d>>2]=0;h=h+12|0;d=h+0|0;b=5720;f=d+20|0;do{a[d>>0]=a[b>>0]|0;d=d+1|0;b=b+1|0}while((d|0)<(f|0));c[g>>2]=h;c[e>>2]=5752;Zc(e|0,5704,55)}p=Wb(4)|0;c[p>>2]=27280;Zc(p|0,27328,220)}while(0);b=c[b+12>>2]|0;f=b+(j+e)|0;if(!e){p=j;p=p+e|0;c[h>>2]=p;i=g;return}b=b+j|0;while(1){a[d>>0]=a[b>>0]|0;b=b+1|0;if((b|0)==(f|0))break;else d=d+1|0}p=c[h>>2]|0;p=p+e|0;c[h>>2]=p;i=g;return}function _f(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;e=i;d=a+8|0;f=c[d>>2]|0;h=c[b+16>>2]|0;if(h){j=c[a+4>>2]|0;g=f>>>15;c[d>>2]=g;l=(j>>>0)/(g>>>0)|0;m=l>>>(c[b+40>>2]|0);k=c[h+(m<<2)>>2]|0;m=(c[h+(m+1<<2)>>2]|0)+1|0;n=k+1|0;h=c[b+8>>2]|0;if(m>>>0>n>>>0){do{n=(m+k|0)>>>1;o=(c[h+(n<<2)>>2]|0)>>>0>l>>>0;k=o?k:n;m=o?n:m;n=k+1|0}while(m>>>0>n>>>0);l=n}else l=n;n=da(g,c[h+(k<<2)>>2]|0)|0;if((k|0)!=(c[b+32>>2]|0))f=da(c[h+(l<<2)>>2]|0,g)|0}else{h=f>>>15;c[d>>2]=h;l=c[b>>2]|0;g=c[b+8>>2]|0;j=c[a+4>>2]|0;m=l>>>1;k=0;n=0;do{p=da(c[g+(m<<2)>>2]|0,h)|0;o=p>>>0>j>>>0;f=o?p:f;n=o?n:p;k=o?k:m;l=o?m:l;m=(k+l|0)>>>1}while((m|0)!=(k|0))}g=a+4|0;h=j-n|0;c[g>>2]=h;p=f-n|0;c[d>>2]=p;if(p>>>0<16777216)do{h=(Wf(c[a>>2]|0)|0)&255|h<<8;c[g>>2]=h;p=c[d>>2]<<8;c[d>>2]=p}while(p>>>0<16777216);o=(c[b+12>>2]|0)+(k<<2)|0;c[o>>2]=(c[o>>2]|0)+1;o=b+28|0;p=(c[o>>2]|0)+ -1|0;c[o>>2]=p;if(p){i=e;return k|0}ke(b);i=e;return k|0}function $f(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;f=_f(b,d)|0;c[a>>2]=f;if(f){if(f>>>0>=32){l=c[a+28>>2]|0;i=e;return l|0}d=c[a+12>>2]|0;if(f>>>0>d>>>0){d=f-d|0;l=_f(b,(c[a+68>>2]|0)+((f+ -1|0)*44|0)|0)|0;d=l<<d|(ag(b,d)|0)}else d=_f(b,(c[a+68>>2]|0)+((f+ -1|0)*44|0)|0)|0;a=c[a>>2]|0;if((d|0)<(1<<a+ -1|0)){l=d+1+(-1<<a)|0;i=e;return l|0}else{l=d+1|0;i=e;return l|0}}f=a+56|0;h=b+8|0;l=c[h>>2]|0;j=da(l>>>13,c[f>>2]|0)|0;g=b+4|0;k=c[g>>2]|0;m=k>>>0>=j>>>0;d=m&1;if(m){c[g>>2]=k-j;j=l-j|0;c[h>>2]=j}else{c[h>>2]=j;j=a+60|0;c[j>>2]=(c[j>>2]|0)+1;j=c[h>>2]|0}if(j>>>0<16777216){j=c[g>>2]|0;do{j=(Wf(c[b>>2]|0)|0)&255|j<<8;c[g>>2]=j;m=c[h>>2]<<8;c[h>>2]=m}while(m>>>0<16777216)}h=a+52|0;m=(c[h>>2]|0)+ -1|0;c[h>>2]=m;if(m){m=d;i=e;return m|0}b=a+48|0;g=c[b>>2]|0;j=a+64|0;k=(c[j>>2]|0)+g|0;c[j>>2]=k;if(k>>>0>8192){k=(k+1|0)>>>1;c[j>>2]=k;m=a+60|0;a=((c[m>>2]|0)+1|0)>>>1;c[m>>2]=a;if((a|0)==(k|0)){m=k+1|0;c[j>>2]=m;j=m}else{j=k;k=a}}else{j=k;k=c[a+60>>2]|0}c[f>>2]=(da(2147483648/(j>>>0)|0,k)|0)>>>18;m=g*5|0;m=m>>>0>259?64:m>>>2;c[b>>2]=m;c[h>>2]=m;m=d;i=e;return m|0}function ag(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0;f=i;d=a+4|0;g=c[d>>2]|0;e=a+8|0;h=c[e>>2]|0;if(b>>>0>19){j=h>>>16;c[e>>2]=j;h=(g>>>0)/(j>>>0)|0;g=g-(da(h,j)|0)|0;c[d>>2]=g;do{g=(Wf(c[a>>2]|0)|0)&255|g<<8;c[d>>2]=g;j=c[e>>2]<<8;c[e>>2]=j}while(j>>>0<16777216);j=(ag(a,b+ -16|0)|0)<<16|h&65535;i=f;return j|0}j=h>>>b;c[e>>2]=j;b=(g>>>0)/(j>>>0)|0;g=g-(da(b,j)|0)|0;c[d>>2]=g;if(j>>>0>=16777216){i=f;return b|0}do{g=(Wf(c[a>>2]|0)|0)&255|g<<8;c[d>>2]=g;j=c[e>>2]<<8;c[e>>2]=j}while(j>>>0<16777216);i=f;return b|0}function bg(a){a=a|0;return}function cg(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function dg(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(!a){i=b;return}jd[c[(c[a>>2]|0)+8>>2]&255](a);i=b;return}function eg(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==6304)a=a+12|0;else a=0;return a|0}function fg(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function gg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+32|0;g=e;f=c[b+8>>2]|0;b=c[b+4>>2]|0;Tf(g,f,b);h=c[g>>2]|0;a[d+3>>0]=h>>>24;a[d+2>>0]=h>>>16;a[d+1>>0]=h>>>8;a[d>>0]=h;h=c[g+4>>2]|0;a[d+7>>0]=h>>>24;a[d+6>>0]=h>>>16;a[d+5>>0]=h>>>8;a[d+4>>0]=h;h=c[g+8>>2]|0;a[d+11>>0]=h>>>24;a[d+10>>0]=h>>>16;a[d+9>>0]=h>>>8;a[d+8>>0]=h;h=c[g+12>>2]|0;a[d+13>>0]=(h&65535)>>>8;a[d+12>>0]=h;a[d+14>>0]=h>>>16;a[d+15>>0]=h>>>24;g=c[g+16>>2]|0;a[d+16>>0]=g;a[d+17>>0]=(g&65535)>>>8;a[d+19>>0]=g>>>24;a[d+18>>0]=g>>>16;Vf(f+4784|0,b,d+20|0);i=e;return}function hg(a){a=a|0;var b=0;b=i;c[a>>2]=6616;a=c[a+8>>2]|0;if(!a){i=b;return}Mf(a+4784|0);Jf(a);Uq(a);i=b;return}function ig(a){a=a|0;var b=0,d=0;b=i;c[a>>2]=6616;d=c[a+8>>2]|0;if(!d){Uq(a);i=b;return}Mf(d+4784|0);Jf(d);Uq(d);Uq(a);i=b;return}function jg(a){a=a|0;return}function kg(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function lg(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(!a){i=b;return}jd[c[(c[a>>2]|0)+8>>2]&255](a);i=b;return}function mg(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==7272)a=a+12|0;else a=0;return a|0}function ng(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function og(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+32|0;h=e;f=c[b+8>>2]|0;b=c[b+4>>2]|0;Tf(h,f,b);g=c[h>>2]|0;a[d+3>>0]=g>>>24;a[d+2>>0]=g>>>16;a[d+1>>0]=g>>>8;a[d>>0]=g;g=c[h+4>>2]|0;a[d+7>>0]=g>>>24;a[d+6>>0]=g>>>16;a[d+5>>0]=g>>>8;a[d+4>>0]=g;g=c[h+8>>2]|0;a[d+11>>0]=g>>>24;a[d+10>>0]=g>>>16;a[d+9>>0]=g>>>8;a[d+8>>0]=g;g=c[h+12>>2]|0;a[d+13>>0]=(g&65535)>>>8;a[d+12>>0]=g;a[d+14>>0]=g>>>16;a[d+15>>0]=g>>>24;h=c[h+16>>2]|0;a[d+16>>0]=h;a[d+17>>0]=(h&65535)>>>8;a[d+19>>0]=h>>>24;a[d+18>>0]=h>>>16;h=Uf(f+4784|0,b)|0;g=H;a[d+23>>0]=h>>>24;a[d+22>>0]=h>>>16;a[d+21>>0]=h>>>8;a[d+20>>0]=h;j=lr(h|0,g|0,56)|0;a[d+27>>0]=j;j=lr(h|0,g|0,48)|0;a[d+26>>0]=j;h=lr(h|0,g|0,40)|0;a[d+25>>0]=h;a[d+24>>0]=g;d=f+5112|0;if(!(a[d>>0]|0)){i=e;return}j=((Wf(c[b>>2]|0)|0)&255)<<24;j=((Wf(c[b>>2]|0)|0)&255)<<16|j;j=j|((Wf(c[b>>2]|0)|0)&255)<<8;c[b+4>>2]=j|(Wf(c[b>>2]|0)|0)&255;a[d>>0]=0;i=e;return}function pg(a){a=a|0;var b=0;b=i;c[a>>2]=7560;a=c[a+8>>2]|0;if(!a){i=b;return}pe(a+5096|0);pe(a+5064|0);oe(a+4948|0);Lf(a+4784|0);Jf(a);Uq(a);i=b;return}function qg(a){a=a|0;var b=0,d=0;b=i;c[a>>2]=7560;d=c[a+8>>2]|0;if(!d){Uq(a);i=b;return}pe(d+5096|0);pe(d+5064|0);oe(d+4948|0);Lf(d+4784|0);Jf(d);Uq(d);Uq(a);i=b;return}function rg(a){a=a|0;return}function sg(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function tg(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(!a){i=b;return}jd[c[(c[a>>2]|0)+8>>2]&255](a);i=b;return}function ug(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==8216)a=a+12|0;else a=0;return a|0}function vg(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function wg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+32|0;g=e;f=c[b+8>>2]|0;b=c[b+4>>2]|0;Tf(g,f,b);h=c[g>>2]|0;a[d+3>>0]=h>>>24;a[d+2>>0]=h>>>16;a[d+1>>0]=h>>>8;a[d>>0]=h;h=c[g+4>>2]|0;a[d+7>>0]=h>>>24;a[d+6>>0]=h>>>16;a[d+5>>0]=h>>>8;a[d+4>>0]=h;h=c[g+8>>2]|0;a[d+11>>0]=h>>>24;a[d+10>>0]=h>>>16;a[d+9>>0]=h>>>8;a[d+8>>0]=h;h=c[g+12>>2]|0;a[d+13>>0]=(h&65535)>>>8;a[d+12>>0]=h;a[d+14>>0]=h>>>16;a[d+15>>0]=h>>>24;g=c[g+16>>2]|0;a[d+16>>0]=g;a[d+17>>0]=(g&65535)>>>8;a[d+19>>0]=g>>>24;a[d+18>>0]=g>>>16;d=f+4784|0;if(!(a[d>>0]|0)){i=e;return}h=((Wf(c[b>>2]|0)|0)&255)<<24;h=((Wf(c[b>>2]|0)|0)&255)<<16|h;h=h|((Wf(c[b>>2]|0)|0)&255)<<8;c[b+4>>2]=h|(Wf(c[b>>2]|0)|0)&255;a[d>>0]=0;i=e;return}function xg(a){a=a|0;var b=0;b=i;c[a>>2]=8504;a=c[a+8>>2]|0;if(!a){i=b;return}Jf(a);Uq(a);i=b;return}function yg(a){a=a|0;var b=0,d=0;b=i;c[a>>2]=8504;d=c[a+8>>2]|0;if(!d){Uq(a);i=b;return}Jf(d);Uq(d);Uq(a);i=b;return}function zg(a){a=a|0;return}function Ag(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Bg(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(!a){i=b;return}jd[c[(c[a>>2]|0)+8>>2]&255](a);i=b;return}function Cg(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==9112)a=a+12|0;else a=0;return a|0}function Dg(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Eg(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;c[b>>2]=9396;c[b+64>>2]=9436;c[b+8>>2]=9416;e=b+12|0;c[e>>2]=9584;if(a[b+44>>0]&1)Uq(c[b+52>>2]|0);c[e>>2]=16248;e=c[b+16>>2]|0;g=e+4|0;f=c[g>>2]|0;c[g>>2]=f+ -1;if(f){g=b+64|0;_i(g);i=d;return}jd[c[(c[e>>2]|0)+8>>2]&255](e);g=b+64|0;_i(g);i=d;return}function Fg(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;f=b+ -8|0;c[f>>2]=9396;b=f+64|0;c[b>>2]=9436;c[f+8>>2]=9416;e=f+12|0;c[e>>2]=9584;if(a[f+44>>0]&1)Uq(c[f+52>>2]|0);c[e>>2]=16248;e=c[f+16>>2]|0;g=e+4|0;f=c[g>>2]|0;c[g>>2]=f+ -1;if(f){_i(b);i=d;return}jd[c[(c[e>>2]|0)+8>>2]&255](e);_i(b);i=d;return}function Gg(b){b=b|0;var d=0,e=0,f=0,g=0;e=i;g=c[(c[b>>2]|0)+ -12>>2]|0;c[b+g>>2]=9396;d=b+(g+64)|0;c[d>>2]=9436;c[b+(g+8)>>2]=9416;f=b+(g+12)|0;c[f>>2]=9584;if(a[b+(g+44)>>0]&1)Uq(c[b+(g+52)>>2]|0);c[f>>2]=16248;b=c[b+(g+16)>>2]|0;f=b+4|0;g=c[f>>2]|0;c[f>>2]=g+ -1;if(g){_i(d);i=e;return}jd[c[(c[b>>2]|0)+8>>2]&255](b);_i(d);i=e;return}function Hg(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;c[b>>2]=9396;c[b+64>>2]=9436;c[b+8>>2]=9416;e=b+12|0;c[e>>2]=9584;if(a[b+44>>0]&1)Uq(c[b+52>>2]|0);c[e>>2]=16248;e=c[b+16>>2]|0;g=e+4|0;f=c[g>>2]|0;c[g>>2]=f+ -1;if(f){g=b+64|0;_i(g);Uq(b);i=d;return}jd[c[(c[e>>2]|0)+8>>2]&255](e);g=b+64|0;_i(g);Uq(b);i=d;return}function Ig(b){b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;e=b+ -8|0;c[e>>2]=9396;b=e+64|0;c[b>>2]=9436;c[e+8>>2]=9416;f=e+12|0;c[f>>2]=9584;if(a[e+44>>0]&1)Uq(c[e+52>>2]|0);c[f>>2]=16248;f=c[e+16>>2]|0;h=f+4|0;g=c[h>>2]|0;c[h>>2]=g+ -1;if(g){_i(b);Uq(e);i=d;return}jd[c[(c[f>>2]|0)+8>>2]&255](f);_i(b);Uq(e);i=d;return}function Jg(b){b=b|0;var d=0,e=0,f=0,g=0,h=0;f=i;h=c[(c[b>>2]|0)+ -12>>2]|0;e=b+h|0;c[e>>2]=9396;d=b+(h+64)|0;c[d>>2]=9436;c[b+(h+8)>>2]=9416;g=b+(h+12)|0;c[g>>2]=9584;if(a[b+(h+44)>>0]&1)Uq(c[b+(h+52)>>2]|0);c[g>>2]=16248;b=c[b+(h+16)>>2]|0;g=b+4|0;h=c[g>>2]|0;c[g>>2]=h+ -1;if(h){_i(d);Uq(e);i=f;return}jd[c[(c[b>>2]|0)+8>>2]&255](b);_i(d);Uq(e);i=f;return}function Kg(b){b=b|0;var d=0,e=0,f=0;d=i;c[b>>2]=9584;if(a[b+32>>0]&1)Uq(c[b+40>>2]|0);c[b>>2]=16248;b=c[b+4>>2]|0;f=b+4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if(e){i=d;return}jd[c[(c[b>>2]|0)+8>>2]&255](b);i=d;return}function Lg(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;c[b>>2]=9584;if(a[b+32>>0]&1)Uq(c[b+40>>2]|0);c[b>>2]=16248;e=c[b+4>>2]|0;g=e+4|0;f=c[g>>2]|0;c[g>>2]=f+ -1;if(f){Uq(b);i=d;return}jd[c[(c[e>>2]|0)+8>>2]&255](e);Uq(b);i=d;return}function Mg(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0;l=i;o=d+44|0;m=c[o>>2]|0;k=d+24|0;j=c[k>>2]|0;if(m>>>0<j>>>0){c[o>>2]=j;m=j}o=h&24;do if(!o){o=b;c[o>>2]=0;c[o+4>>2]=0;o=b+8|0;c[o>>2]=-1;c[o+4>>2]=-1;i=l;return}else if((o|0)!=24){if(!g){g=0;o=0;break}else if((g|0)==2){n=11;break}else if((g|0)!=1){n=15;break}if(!(h&8)){o=j-(c[d+20>>2]|0)|0;g=o;o=((o|0)<0)<<31>>31;break}else{o=(c[d+12>>2]|0)-(c[d+8>>2]|0)|0;g=o;o=((o|0)<0)<<31>>31;break}}else{if(!g){g=0;o=0;break}else if((g|0)==2){n=11;break}else if((g|0)!=1){n=15;break}o=b;c[o>>2]=0;c[o+4>>2]=0;o=b+8|0;c[o>>2]=-1;c[o+4>>2]=-1;i=l;return}while(0);if((n|0)==15){o=b;c[o>>2]=0;c[o+4>>2]=0;o=b+8|0;c[o>>2]=-1;c[o+4>>2]=-1;i=l;return}if((n|0)==11){n=d+32|0;if(!(a[n>>0]&1))n=n+1|0;else n=c[d+40>>2]|0;o=m-n|0;g=o;o=((o|0)<0)<<31>>31}f=kr(g|0,o|0,e|0,f|0)|0;e=H;if((e|0)>=0){n=d+32|0;if(!(a[n>>0]&1))n=n+1|0;else n=c[d+40>>2]|0;o=m-n|0;g=((o|0)<0)<<31>>31;if(!((g|0)<(e|0)|(g|0)==(e|0)&o>>>0<f>>>0)){n=h&8;if(!((f|0)==0&(e|0)==0)){if((n|0)!=0?(c[d+12>>2]|0)==0:0){o=b;c[o>>2]=0;c[o+4>>2]=0;o=b+8|0;c[o>>2]=-1;c[o+4>>2]=-1;i=l;return}if((h&16|0)!=0&(j|0)==0){o=b;c[o>>2]=0;c[o+4>>2]=0;o=b+8|0;c[o>>2]=-1;c[o+4>>2]=-1;i=l;return}}if(n){c[d+12>>2]=(c[d+8>>2]|0)+f;c[d+16>>2]=m}if(h&16)c[k>>2]=(c[d+20>>2]|0)+f;o=b;c[o>>2]=0;c[o+4>>2]=0;o=b+8|0;c[o>>2]=f;c[o+4>>2]=e;i=l;return}}o=b;c[o>>2]=0;c[o+4>>2]=0;o=b+8|0;c[o>>2]=-1;c[o+4>>2]=-1;i=l;return}function Ng(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=i;d=d+8|0;ud[c[(c[b>>2]|0)+16>>2]&31](a,b,c[d>>2]|0,c[d+4>>2]|0,0,e);i=f;return}function Og(a){a=a|0;var b=0,e=0,f=0,g=0;b=i;f=a+44|0;g=c[f>>2]|0;e=c[a+24>>2]|0;if(g>>>0<e>>>0)c[f>>2]=e;else e=g;if(!(c[a+48>>2]&8)){g=-1;i=b;return g|0}f=a+16|0;g=c[f>>2]|0;a=c[a+12>>2]|0;if(g>>>0<e>>>0)c[f>>2]=e;else e=g;if(a>>>0>=e>>>0){g=-1;i=b;return g|0}g=d[a>>0]|0;i=b;return g|0}function Pg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;g=b+44|0;f=c[g>>2]|0;j=c[b+24>>2]|0;if(f>>>0<j>>>0)c[g>>2]=j;else j=f;f=b+8|0;g=c[f>>2]|0;h=b+12|0;l=c[h>>2]|0;if(g>>>0>=l>>>0){l=-1;i=e;return l|0}if((d|0)==-1){c[f>>2]=g;c[h>>2]=l+ -1;c[b+16>>2]=j;l=0;i=e;return l|0}if(!(c[b+48>>2]&16)){k=d&255;l=l+ -1|0;if(k<<24>>24!=(a[l>>0]|0)){l=-1;i=e;return l|0}}else{k=d&255;l=l+ -1|0}c[f>>2]=g;c[h>>2]=l;c[b+16>>2]=j;a[l>>0]=k;l=d;i=e;return l|0}function Qg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;e=i;if((d|0)==-1){u=0;i=e;return u|0}h=b+12|0;f=b+8|0;g=(c[h>>2]|0)-(c[f>>2]|0)|0;j=b+24|0;o=c[j>>2]|0;k=b+28|0;n=c[k>>2]|0;if((o|0)==(n|0)){l=b+48|0;if(!(c[l>>2]&16)){u=-1;i=e;return u|0}m=b+20|0;q=c[m>>2]|0;p=o-q|0;n=b+44|0;o=(c[n>>2]|0)-q|0;q=b+32|0;r=a[q>>0]|0;t=(r&1)!=0;if(t){s=(c[q>>2]&-2)+ -1|0;r=c[b+36>>2]|0}else{s=10;r=(r&255)>>>1}if((r|0)==(s|0)){Pi(q,s,1,s,s,0);if(!(a[q>>0]&1))s=12;else s=13}else if(t)s=13;else s=12;if((s|0)==12){a[q>>0]=(r<<1)+2;u=q+1|0;t=r+1|0}else if((s|0)==13){u=c[b+40>>2]|0;t=r+1|0;c[b+36>>2]=t}a[u+r>>0]=0;a[u+t>>0]=0;if(!(a[q>>0]&1))r=10;else r=(c[q>>2]&-2)+ -1|0;Ki(q,r);r=a[q>>0]|0;if(!(r&1)){q=q+1|0;r=(r&255)>>>1}else{q=c[b+40>>2]|0;r=c[b+36>>2]|0}u=q+r|0;c[m>>2]=q;c[k>>2]=u;k=q+p|0;c[j>>2]=k;o=q+o|0;c[n>>2]=o;n=u}else{l=b+48|0;k=o;o=c[b+44>>2]|0}m=k+1|0;o=m>>>0<o>>>0?o:m;c[b+44>>2]=o;if(c[l>>2]&8){l=b+32|0;if(!(a[l>>0]&1))l=l+1|0;else l=c[b+40>>2]|0;c[f>>2]=l;c[h>>2]=l+g;c[b+16>>2]=o}if((k|0)==(n|0)){u=vd[c[(c[b>>2]|0)+52>>2]&63](b,d&255)|0;i=e;return u|0}else{c[j>>2]=m;a[k>>0]=d;u=d&255;i=e;return u|0}return 0}function Rg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;h=i;i=i+16|0;f=h+8|0;g=h;a[f>>0]=0;c[f+4>>2]=b;j=c[(c[b>>2]|0)+ -12>>2]|0;if(!(c[b+(j+16)>>2]|0)){j=c[b+(j+72)>>2]|0;if(j)Fj(j);a[f>>0]=1;p=c[(c[b>>2]|0)+ -12>>2]|0;j=c[b+(p+24)>>2]|0;if((c[b+(p+4)>>2]&176|0)==32)l=d+e|0;else l=d;m=b+p|0;n=b+(p+76)|0;o=c[n>>2]|0;do if((o|0)==-1){p=c[b+(p+28)>>2]|0;o=p+4|0;c[o>>2]=(c[o>>2]|0)+1;r=Rn(19072)|0;q=c[p+8>>2]|0;if((c[p+12>>2]|0)-q>>2>>>0>r>>>0?(k=c[q+(r<<2)>>2]|0,(k|0)!=0):0){k=vd[c[(c[k>>2]|0)+28>>2]&63](k,32)|0;r=c[o>>2]|0;c[o>>2]=r+ -1;if(!r)jd[c[(c[p>>2]|0)+8>>2]&255](p);o=k<<24>>24;c[n>>2]=o;break}r=Wb(4)|0;c[r>>2]=27744;Zc(r|0,27816,228)}while(0);Sg(g,j,d,l,d+e|0,m,o&255);if(!(c[g>>2]|0)){r=c[(c[b>>2]|0)+ -12>>2]|0;Zi(b+r|0,c[b+(r+16)>>2]|5)}}Qj(f);i=h;return b|0}function Sg(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0;k=i;i=i+16|0;l=k;if(!d){c[b>>2]=0;i=k;return}o=e;m=g-o|0;h=h+12|0;n=c[h>>2]|0;m=(n|0)>(m|0)?n-m|0:0;n=f;o=n-o|0;if((o|0)>0?(fd[c[(c[d>>2]|0)+48>>2]&31](d,e,o)|0)!=(o|0):0){c[b>>2]=0;i=k;return}do if((m|0)>0){if(m>>>0<11){a[l>>0]=m<<1;e=l;o=l+1|0}else{e=m+16&-16;o=(e|0)==0?1:e;p=Tq(o)|0;a:do if(!p){while(1){p=c[6860]|0;c[6860]=p+0;if(!p)break;qd[p&3]();p=Tq(o)|0;if(p){o=p;break a}}p=Wb(4)|0;c[p>>2]=27280;Zc(p|0,27328,220)}else o=p;while(0);c[l+8>>2]=o;c[l>>2]=e|1;c[l+4>>2]=m;e=l}qr(o|0,j|0,m|0)|0;a[o+m>>0]=0;if(!(a[e>>0]&1))j=l+1|0;else j=c[l+8>>2]|0;if((fd[c[(c[d>>2]|0)+48>>2]&31](d,j,m)|0)==(m|0)){if(!(a[e>>0]&1))break;Uq(c[l+8>>2]|0);break}c[b>>2]=0;if(!(a[e>>0]&1)){i=k;return}Uq(c[l+8>>2]|0);i=k;return}while(0);l=g-n|0;if((l|0)>0?(fd[c[(c[d>>2]|0)+48>>2]&31](d,f,l)|0)!=(l|0):0){c[b>>2]=0;i=k;return}c[h>>2]=0;c[b>>2]=d;i=k;return}function Tg(a){a=a|0;return}function Ug(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Vg(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(a)Uq(a);i=b;return}function Wg(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==9944)a=a+12|0;else a=0;return a|0}function Xg(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Yg(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=27520;a=a+4|0;e=(c[a>>2]|0)+ -4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if((d+ -1|0)>=0){i=b;return}Uq((c[a>>2]|0)+ -12|0);i=b;return}function Zg(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=27520;a=a+4|0;e=(c[a>>2]|0)+ -4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if((d+ -1|0)>=0){i=b;return}Uq((c[a>>2]|0)+ -12|0);i=b;return}function _g(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=27520;a=a+4|0;e=(c[a>>2]|0)+ -4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if((d+ -1|0)>=0){i=b;return}Uq((c[a>>2]|0)+ -12|0);i=b;return}function $g(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=27520;a=a+4|0;e=(c[a>>2]|0)+ -4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if((d+ -1|0)>=0){i=b;return}Uq((c[a>>2]|0)+ -12|0);i=b;return}function ah(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27520;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function bh(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27520;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function ch(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27520;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function dh(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=27520;a=a+4|0;e=(c[a>>2]|0)+ -4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if((d+ -1|0)>=0){i=b;return}Uq((c[a>>2]|0)+ -12|0);i=b;return}function eh(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27520;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function fh(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=27520;a=a+4|0;e=(c[a>>2]|0)+ -4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if((d+ -1|0)>=0){i=b;return}Uq((c[a>>2]|0)+ -12|0);i=b;return}function gh(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27520;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function hh(a){a=a|0;return}function ih(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function jh(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;b=i;d=c[a>>2]|0;if(!d){i=b;return}e=a+4|0;f=c[e>>2]|0;if((f|0)!=(d|0)){do{g=f+ -24|0;c[e>>2]=g;f=c[f+ -8>>2]|0;if((f|0)!=(g|0)){if(f)jd[c[(c[f>>2]|0)+20>>2]&255](f)}else jd[c[(c[f>>2]|0)+16>>2]&255](f);f=c[e>>2]|0}while((f|0)!=(d|0));d=c[a>>2]|0}Uq(d);i=b;return}function kh(a){a=a|0;return}function lh(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function mh(a){a=a|0;var b=0;a=i;b=Tq(8)|0;a:do if(!b){while(1){b=c[6860]|0;c[6860]=b+0;if(!b)break;qd[b&3]();b=Tq(8)|0;if(b)break a}b=Wb(4)|0;c[b>>2]=27280;Zc(b|0,27328,220)}while(0);c[b>>2]=11024;i=a;return b|0}function nh(a,b){a=a|0;b=b|0;if(b)c[b>>2]=11024;return}function oh(a){a=a|0;return}function ph(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function qh(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0;b=i;h=e+104|0;g=d[h>>0]|0;f=g>>>7;e=g>>>6&1;if(!((f|0)!=1|(e|0)==0)){b=Wb(8)|0;c[b>>2]=27520;e=b+4|0;f=Tq(80)|0;a:do if(!f){while(1){f=c[6860]|0;c[6860]=f+0;if(!f)break;qd[f&3]();f=Tq(80)|0;if(f)break a}j=Wb(4)|0;c[j>>2]=27280;Zc(j|0,27328,220)}while(0);c[f>>2]=67;c[f+4>>2]=67;c[f+8>>2]=0;j=f+12|0;h=j+0|0;g=11568|0;f=h+68|0;do{a[h>>0]=a[g>>0]|0;h=h+1|0;g=g+1|0}while((h|0)<(f|0));c[e>>2]=j;c[b>>2]=11648;Zc(b|0,11440,113)}if((f|0)!=(e|0)){a[h>>0]=g&63;i=b;return}b=Wb(8)|0;c[b>>2]=27520;e=b+4|0;f=Tq(51)|0;b:do if(!f){while(1){f=c[6860]|0;c[6860]=f+0;if(!f)break;qd[f&3]();f=Tq(51)|0;if(f)break b}j=Wb(4)|0;c[j>>2]=27280;Zc(j|0,27328,220)}while(0);c[f>>2]=38;c[f+4>>2]=38;c[f+8>>2]=0;j=f+12|0;h=j+0|0;g=11504|0;f=h+39|0;do{a[h>>0]=a[g>>0]|0;h=h+1|0;g=g+1|0}while((h|0)<(f|0));c[e>>2]=j;c[b>>2]=11552;Zc(b|0,11488,111)}function rh(a,b){a=a|0;b=b|0;return((c[b+4>>2]|0)==11296?a+4|0:0)|0}function sh(a){a=a|0;return 11392}function th(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=27520;a=a+4|0;e=(c[a>>2]|0)+ -4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if((d+ -1|0)>=0){i=b;return}Uq((c[a>>2]|0)+ -12|0);i=b;return}function uh(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=27520;a=a+4|0;e=(c[a>>2]|0)+ -4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if((d+ -1|0)>=0){i=b;return}Uq((c[a>>2]|0)+ -12|0);i=b;return}function vh(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27520;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function wh(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27520;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function xh(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27520;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function yh(a){a=a|0;var b=0,e=0,f=0,g=0;b=i;e=c[a+324>>2]|0;if(((e|0)!=0?(f=e+4|0,g=c[f>>2]|0,c[f>>2]=g+ -1,(g|0)==0):0)?(jd[c[(c[e>>2]|0)+8>>2]&255](e),f=e+8|0,g=c[f>>2]|0,c[f>>2]=g+ -1,(g|0)==0):0)jd[c[(c[e>>2]|0)+16>>2]&255](e);e=c[a+316>>2]|0;if(((e|0)!=0?(f=e+4|0,g=c[f>>2]|0,c[f>>2]=g+ -1,(g|0)==0):0)?(jd[c[(c[e>>2]|0)+8>>2]&255](e),f=e+8|0,g=c[f>>2]|0,c[f>>2]=g+ -1,(g|0)==0):0)jd[c[(c[e>>2]|0)+16>>2]&255](e);e=c[a+300>>2]|0;if(e){f=a+304|0;g=c[f>>2]|0;if((g|0)!=(e|0))c[f>>2]=g+(~(((g+ -12+(0-e)|0)>>>0)/12|0)*12|0);Uq(e)}g=c[a+288>>2]|0;if(g){f=a+292|0;e=c[f>>2]|0;if((e|0)!=(g|0))c[f>>2]=e+(~((e+ -8+(0-g)|0)>>>3)<<3);Uq(g)}e=a+281|0;e=d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24;if(!e){g=a+16|0;g=c[g>>2]|0;g=g+ -4|0;g=c[g>>2]|0;Uq(g);i=b;return}Uq(e);g=a+16|0;g=c[g>>2]|0;g=g+ -4|0;g=c[g>>2]|0;Uq(g);i=b;return}function zh(a){a=a|0;return}function Ah(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Bh(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(!a){i=b;return}yh(a);Uq(a);i=b;return}function Ch(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==11904)a=a+12|0;else a=0;return a|0}function Dh(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Eh(a){a=a|0;return}function Fh(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Gh(a){a=a|0;var b=0;b=i;a=c[a+12>>2]|0;if(a)Uq(a);i=b;return}function Hh(a,b){a=a|0;b=b|0;if((c[b+4>>2]|0)==12152)a=a+12|0;else a=0;return a|0}function Ih(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Jh(){var b=0,d=0,e=0;b=i;Pb(384,392,504,0,480,76,9360,0,9360,0,8,472,240);cb(384,1,464,456,77,1);d=Tq(8)|0;a:do if(!d){while(1){d=c[6860]|0;c[6860]=d+0;if(!d)break;qd[d&3]();d=Tq(8)|0;if(d)break a}e=Wb(4)|0;c[e>>2]=27280;Zc(e|0,27328,220)}while(0);a[d>>0]=6;a[d+1>>0]=0;a[d+2>>0]=0;a[d+3>>0]=0;e=d+4|0;a[e>>0]=0;a[e+1>>0]=0;a[e+2>>0]=0;a[e+3>>0]=0;Hc(384,16,4,440,432,9,d|0,0);d=Tq(8)|0;b:do if(!d){while(1){d=c[6860]|0;c[6860]=d+0;if(!d)break;qd[d&3]();d=Tq(8)|0;if(d)break b}e=Wb(4)|0;c[e>>2]=27280;Zc(e|0,27328,220)}while(0);a[d>>0]=53;a[d+1>>0]=0;a[d+2>>0]=0;a[d+3>>0]=0;e=d+4|0;a[e>>0]=0;a[e+1>>0]=0;a[e+2>>0]=0;a[e+3>>0]=0;Hc(384,24,3,416,408,7,d|0,0);d=Tq(8)|0;c:do if(!d){while(1){d=c[6860]|0;c[6860]=d+0;if(!d)break;qd[d&3]();d=Tq(8)|0;if(d)break c}e=Wb(4)|0;c[e>>2]=27280;Zc(e|0,27328,220)}while(0);a[d>>0]=78;a[d+1>>0]=0;a[d+2>>0]=0;a[d+3>>0]=0;e=d+4|0;a[e>>0]=0;a[e+1>>0]=0;a[e+2>>0]=0;a[e+3>>0]=0;Hc(384,40,2,352,344,34,d|0,0);Pb(200,208,328,0,296,79,9360,0,9360,0,56,288,241);cb(200,1,280,272,80,2);d=Tq(8)|0;d:do if(!d){while(1){d=c[6860]|0;c[6860]=d+0;if(!d)break;qd[d&3]();d=Tq(8)|0;if(d)break d}e=Wb(4)|0;c[e>>2]=27280;Zc(e|0,27328,220)}while(0);a[d>>0]=8;a[d+1>>0]=0;a[d+2>>0]=0;a[d+3>>0]=0;e=d+4|0;a[e>>0]=0;a[e+1>>0]=0;a[e+2>>0]=0;a[e+3>>0]=0;Hc(200,16,4,256,248,10,d|0,0);d=Tq(8)|0;e:do if(!d){while(1){d=c[6860]|0;c[6860]=d+0;if(!d)break;qd[d&3]();d=Tq(8)|0;if(d)break e}e=Wb(4)|0;c[e>>2]=27280;Zc(e|0,27328,220)}while(0);a[d>>0]=54;a[d+1>>0]=0;a[d+2>>0]=0;a[d+3>>0]=0;e=d+4|0;a[e>>0]=0;a[e+1>>0]=0;a[e+2>>0]=0;a[e+3>>0]=0;Hc(200,72,3,232,224,9,d|0,0);d=Tq(8)|0;f:do if(!d){while(1){d=c[6860]|0;c[6860]=d+0;if(!d)break;qd[d&3]();d=Tq(8)|0;if(d)break f}e=Wb(4)|0;c[e>>2]=27280;Zc(e|0,27328,220)}while(0);a[d>>0]=55;a[d+1>>0]=0;a[d+2>>0]=0;a[d+3>>0]=0;e=d+4|0;a[e>>0]=0;a[e+1>>0]=0;a[e+2>>0]=0;a[e+3>>0]=0;Hc(200,96,3,232,224,9,d|0,0);d=Tq(8)|0;g:do if(!d){while(1){d=c[6860]|0;c[6860]=d+0;if(!d)break;qd[d&3]();d=Tq(8)|0;if(d)break g}e=Wb(4)|0;c[e>>2]=27280;Zc(e|0,27328,220)}while(0);a[d>>0]=56;a[d+1>>0]=0;a[d+2>>0]=0;a[d+3>>0]=0;e=d+4|0;a[e>>0]=0;a[e+1>>0]=0;a[e+2>>0]=0;a[e+3>>0]=0;Hc(200,112,3,232,224,9,d|0,0);d=Tq(8)|0;if(d){e=d;a[e>>0]=57;a[e+1>>0]=0;a[e+2>>0]=0;a[e+3>>0]=0;d=e+4|0;a[d>>0]=0;a[d+1>>0]=0;a[d+2>>0]=0;a[d+3>>0]=0;Hc(200,24,3,144,136,10,e|0,0);i=b;return}while(1){d=c[6860]|0;c[6860]=d+0;if(!d){e=32;break}qd[d&3]();d=Tq(8)|0;if(d){e=33;break}}if((e|0)==32){e=Wb(4)|0;c[e>>2]=27280;Zc(e|0,27328,220)}else if((e|0)==33){a[d>>0]=57;a[d+1>>0]=0;a[d+2>>0]=0;a[d+3>>0]=0;e=d+4|0;a[e>>0]=0;a[e+1>>0]=0;a[e+2>>0]=0;a[e+3>>0]=0;Hc(200,24,3,144,136,10,d|0,0);i=b;return}}function Kh(a){a=a|0;var b=0,d=0,e=0;b=i;d=c[a+4>>2]|0;e=(mr(d|0)|0)+1|0;a=Tq(e)|0;if(!a){e=0;i=b;return e|0}nr(a|0,d|0,e|0)|0;e=a;i=b;return e|0}function Lh(){var a=0;a=i;zc(28224,12216);sb(28256,12224,1,1,0);Vb(28272,12232,1,-128,127);Vb(28304,12240,1,-128,127);Vb(28288,12256,1,0,255);Vb(28312,12272,2,-32768,32767);Vb(28320,12280,2,0,65535);Vb(28336,12296,4,-2147483648,2147483647);Vb(28352,12304,4,0,-1);Vb(28360,12320,4,-2147483648,2147483647);Vb(28376,12328,4,0,-1);Qc(28392,12344,4);Qc(28408,12352,8);Ta(13912,12360);Ta(13824,12376);Gc(13736,4,12416);mb(13616,12432);sc(13584,0,12448);sc(13544,0,12480);sc(13504,1,12520);sc(13464,2,12560);sc(13424,3,12592);sc(13384,4,12632);sc(13344,5,12664);sc(13304,4,12704);sc(13264,5,12736);sc(13544,0,12776);sc(13504,1,12808);sc(13464,2,12848);sc(13424,3,12888);sc(13384,4,12928);sc(13344,5,12968);sc(13224,6,13008);sc(13184,7,13040);sc(13144,7,13072);i=a;return}function Mh(a){a=a|0;a=i;Fj(14024);Fj(14200);Kj(14376);Kj(14552);i=a;return}function Nh(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;c[b>>2]=16312;Qn(b+4|0);g=b+8|0;c[g+0>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+16>>2]=0;c[g+20>>2]=0;c[b>>2]=15008;c[b+32>>2]=d;g=c[b+4>>2]|0;j=g+4|0;c[j>>2]=(c[j>>2]|0)+1;d=Sn(g,19144)|0;h=c[j>>2]|0;c[j>>2]=h+ -1;if(!h)jd[c[(c[g>>2]|0)+8>>2]&255](g);c[b+36>>2]=d;c[b+40>>2]=e;a[b+44>>0]=(md[c[(c[d>>2]|0)+28>>2]&127](d)|0)&1;i=f;return}



function Ml(e,f,g,h,j,k,l,m,n){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;var o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0;n=i;i=i+48|0;x=n+36|0;w=n+16|0;r=n;y=n+28|0;z=n+32|0;t=n+40|0;A=n+12|0;B=n+24|0;u=n+20|0;v=n+8|0;s=n+4|0;c[k>>2]=0;C=c[j+28>>2]|0;p=C+4|0;c[p>>2]=(c[p>>2]|0)+1;p=Sn(C,19072)|0;E=C+4|0;D=c[E>>2]|0;c[E>>2]=D+ -1;if(!D)jd[c[(c[C>>2]|0)+8>>2]&255](C);a:do switch(m<<24>>24|0){case 89:{o=Nl(g,c[h>>2]|0,k,p,4)|0;if(!(c[k>>2]&4))c[l+20>>2]=o+ -1900;break};case 37:{l=c[h>>2]|0;h=c[g>>2]|0;do if(h){if((c[h+12>>2]|0)==(c[h+16>>2]|0))if((md[c[(c[h>>2]|0)+36>>2]&127](h)|0)==-1){c[g>>2]=0;h=0;break}else{h=c[g>>2]|0;break}}else h=0;while(0);h=(h|0)==0;do if(l){if((c[l+12>>2]|0)==(c[l+16>>2]|0)?(md[c[(c[l>>2]|0)+36>>2]&127](l)|0)==-1:0){o=104;break}if(!h)o=105}else o=104;while(0);if((o|0)==104)if(h)o=105;else l=0;if((o|0)==105){c[k>>2]=c[k>>2]|6;break a}h=c[g>>2]|0;f=c[h+12>>2]|0;if((f|0)==(c[h+16>>2]|0))h=md[c[(c[h>>2]|0)+36>>2]&127](h)|0;else h=d[f>>0]|0;if((fd[c[(c[p>>2]|0)+36>>2]&31](p,h&255,0)|0)<<24>>24!=37){c[k>>2]=c[k>>2]|4;break a}f=c[g>>2]|0;p=f+12|0;h=c[p>>2]|0;if((h|0)==(c[f+16>>2]|0))md[c[(c[f>>2]|0)+40>>2]&127](f)|0;else c[p>>2]=h+1;p=c[g>>2]|0;do if(p){if((c[p+12>>2]|0)==(c[p+16>>2]|0))if((md[c[(c[p>>2]|0)+36>>2]&127](p)|0)==-1){c[g>>2]=0;p=0;break}else{p=c[g>>2]|0;break}}else p=0;while(0);p=(p|0)==0;do if(l){if((c[l+12>>2]|0)==(c[l+16>>2]|0)?(md[c[(c[l>>2]|0)+36>>2]&127](l)|0)==-1:0){o=123;break}if(p)break a}else o=123;while(0);if((o|0)==123?!p:0)break a;c[k>>2]=c[k>>2]|2;break};case 109:{o=Nl(g,c[h>>2]|0,k,p,2)|0;p=c[k>>2]|0;if((p&4|0)==0&(o|0)<13){c[l+16>>2]=o+ -1;break a}else{c[k>>2]=p|4;break a}};case 72:{p=Nl(g,c[h>>2]|0,k,p,2)|0;o=c[k>>2]|0;if((o&4|0)==0&(p|0)<24){c[l+8>>2]=p;break a}else{c[k>>2]=o|4;break a}};case 70:{Al(z,f,c[g>>2]|0,c[h>>2]|0,j,k,l,18008,18016|0);c[g>>2]=c[z>>2];break};case 104:case 66:case 98:{Jl(f,l+16|0,g,c[h>>2]|0,k,p);break};case 77:{p=Nl(g,c[h>>2]|0,k,p,2)|0;o=c[k>>2]|0;if((o&4|0)==0&(p|0)<60){c[l+4>>2]=p;break a}else{c[k>>2]=o|4;break a}};case 99:{p=f+8|0;p=md[c[(c[p>>2]|0)+12>>2]&127](p)|0;q=a[p>>0]|0;if(!(q&1)){o=p+1|0;p=(q&255)>>>1}else{o=c[p+8>>2]|0;p=c[p+4>>2]|0}Al(r,f,c[g>>2]|0,c[h>>2]|0,j,k,l,o,o+p|0);c[g>>2]=c[r>>2];break};case 112:{o=l+8|0;h=c[h>>2]|0;l=f+8|0;l=md[c[(c[l>>2]|0)+8>>2]&127](l)|0;f=a[l>>0]|0;if(!(f&1))f=(f&255)>>>1;else f=c[l+4>>2]|0;j=a[l+12>>0]|0;if(!(j&1))j=(j&255)>>>1;else j=c[l+16>>2]|0;if((f|0)==(0-j|0)){c[k>>2]=c[k>>2]|4;break a}E=qk(g,h,l,l+24|0,p,k,0)|0;k=E-l|0;if((E|0)==(l|0)?(c[o>>2]|0)==12:0){c[o>>2]=0;break a}if((k|0)==12?(q=c[o>>2]|0,(q|0)<12):0)c[o>>2]=q+12;break};case 116:case 110:{l=p+8|0;p=c[h>>2]|0;b:while(1){h=c[g>>2]|0;do if(h){if((c[h+12>>2]|0)==(c[h+16>>2]|0))if((md[c[(c[h>>2]|0)+36>>2]&127](h)|0)==-1){c[g>>2]=0;h=0;break}else{h=c[g>>2]|0;break}}else h=0;while(0);h=(h|0)==0;do if(p){if((c[p+12>>2]|0)!=(c[p+16>>2]|0))if(h)break;else break b;if((md[c[(c[p>>2]|0)+36>>2]&127](p)|0)!=-1){if(!h)break b}else o=43}else o=43;while(0);if((o|0)==43){o=0;if(h){p=0;break}else p=0}f=c[g>>2]|0;h=c[f+12>>2]|0;if((h|0)==(c[f+16>>2]|0))h=md[c[(c[f>>2]|0)+36>>2]&127](f)|0;else h=d[h>>0]|0;if((h&255)<<24>>24<=-1)break;if(!(b[(c[l>>2]|0)+(h<<24>>24<<1)>>1]&8192))break;f=c[g>>2]|0;j=f+12|0;h=c[j>>2]|0;if((h|0)==(c[f+16>>2]|0)){md[c[(c[f>>2]|0)+40>>2]&127](f)|0;continue}else{c[j>>2]=h+1;continue}}l=c[g>>2]|0;do if(l){if((c[l+12>>2]|0)==(c[l+16>>2]|0))if((md[c[(c[l>>2]|0)+36>>2]&127](l)|0)==-1){c[g>>2]=0;l=0;break}else{l=c[g>>2]|0;break}}else l=0;while(0);l=(l|0)==0;do if(p){if((c[p+12>>2]|0)==(c[p+16>>2]|0)?(md[c[(c[p>>2]|0)+36>>2]&127](p)|0)==-1:0){o=62;break}if(l)break a}else o=62;while(0);if((o|0)==62?!l:0)break a;c[k>>2]=c[k>>2]|2;break};case 83:{o=Nl(g,c[h>>2]|0,k,p,2)|0;p=c[k>>2]|0;if((p&4|0)==0&(o|0)<61){c[l>>2]=o;break a}else{c[k>>2]=p|4;break a}};case 121:{Ll(l+20|0,g,c[h>>2]|0,k,p);break};case 65:case 97:{Hl(f,l+24|0,g,c[h>>2]|0,k,p);break};case 101:case 100:{o=l+12|0;p=Nl(g,c[h>>2]|0,k,p,2)|0;l=c[k>>2]|0;if((l&4|0)==0?(p+ -1|0)>>>0<31:0){c[o>>2]=p;break a}c[k>>2]=l|4;break};case 114:{Al(t,f,c[g>>2]|0,c[h>>2]|0,j,k,l,18016,18027|0);c[g>>2]=c[t>>2];break};case 120:{E=c[(c[f>>2]|0)+20>>2]|0;c[u>>2]=c[g>>2];c[v>>2]=c[h>>2];c[w+0>>2]=c[u+0>>2];c[x+0>>2]=c[v+0>>2];gd[E&63](e,f,w,x,j,k,l);i=n;return};case 106:{o=Nl(g,c[h>>2]|0,k,p,3)|0;p=c[k>>2]|0;if((p&4|0)==0&(o|0)<366){c[l+28>>2]=o;break a}else{c[k>>2]=p|4;break a}};case 68:{Al(y,f,c[g>>2]|0,c[h>>2]|0,j,k,l,18e3,18008|0);c[g>>2]=c[y>>2];break};case 88:{q=f+8|0;q=md[c[(c[q>>2]|0)+24>>2]&127](q)|0;p=a[q>>0]|0;if(!(p&1)){o=q+1|0;p=(p&255)>>>1}else{o=c[q+8>>2]|0;p=c[q+4>>2]|0}Al(s,f,c[g>>2]|0,c[h>>2]|0,j,k,l,o,o+p|0);c[g>>2]=c[s>>2];break};case 82:{Al(A,f,c[g>>2]|0,c[h>>2]|0,j,k,l,18032,18037|0);c[g>>2]=c[A>>2];break};case 119:{o=Nl(g,c[h>>2]|0,k,p,1)|0;p=c[k>>2]|0;if((p&4|0)==0&(o|0)<7){c[l+24>>2]=o;break a}else{c[k>>2]=p|4;break a}};case 84:{Al(B,f,c[g>>2]|0,c[h>>2]|0,j,k,l,18040,18048|0);c[g>>2]=c[B>>2];break};case 73:{o=l+8|0;l=Nl(g,c[h>>2]|0,k,p,2)|0;p=c[k>>2]|0;if((p&4|0)==0?(l+ -1|0)>>>0<12:0){c[o>>2]=l;break a}c[k>>2]=p|4;break};default:c[k>>2]=c[k>>2]|4}while(0);c[e>>2]=c[g>>2];i=n;return}function Nl(a,e,f,g,h){a=a|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0;j=i;l=c[a>>2]|0;do if(l){if((c[l+12>>2]|0)==(c[l+16>>2]|0))if((md[c[(c[l>>2]|0)+36>>2]&127](l)|0)==-1){c[a>>2]=0;l=0;break}else{l=c[a>>2]|0;break}}else l=0;while(0);l=(l|0)==0;do if(e){if((c[e+12>>2]|0)==(c[e+16>>2]|0)?(md[c[(c[e>>2]|0)+36>>2]&127](e)|0)==-1:0){m=10;break}if(!l)m=11}else m=10;while(0);if((m|0)==10)if(l)m=11;else e=0;if((m|0)==11){c[f>>2]=c[f>>2]|6;p=0;i=j;return p|0}m=c[a>>2]|0;l=c[m+12>>2]|0;if((l|0)==(c[m+16>>2]|0))m=md[c[(c[m>>2]|0)+36>>2]&127](m)|0;else m=d[l>>0]|0;l=m&255;if(l<<24>>24>-1?(k=g+8|0,(b[(c[k>>2]|0)+(m<<24>>24<<1)>>1]&2048)!=0):0){l=(fd[c[(c[g>>2]|0)+36>>2]&31](g,l,0)|0)<<24>>24;o=c[a>>2]|0;m=o+12|0;n=c[m>>2]|0;if((n|0)==(c[o+16>>2]|0)){md[c[(c[o>>2]|0)+40>>2]&127](o)|0;n=e;m=e}else{c[m>>2]=n+1;n=e;m=e}while(1){l=l+ -48|0;h=h+ -1|0;e=c[a>>2]|0;do if(e){if((c[e+12>>2]|0)==(c[e+16>>2]|0))if((md[c[(c[e>>2]|0)+36>>2]&127](e)|0)==-1){c[a>>2]=0;e=0;break}else{e=c[a>>2]|0;break}}else e=0;while(0);o=(e|0)==0;if(m)if((c[m+12>>2]|0)==(c[m+16>>2]|0)){m=(md[c[(c[m>>2]|0)+36>>2]&127](m)|0)==-1;e=m?0:n;m=m?0:n}else e=n;else{e=n;m=0}n=c[a>>2]|0;if(!((o^(m|0)==0)&(h|0)>0)){m=38;break}o=c[n+12>>2]|0;if((o|0)==(c[n+16>>2]|0))n=md[c[(c[n>>2]|0)+36>>2]&127](n)|0;else n=d[o>>0]|0;o=n&255;if(o<<24>>24<=-1){m=49;break}if(!(b[(c[k>>2]|0)+(n<<24>>24<<1)>>1]&2048)){m=49;break}l=((fd[c[(c[g>>2]|0)+36>>2]&31](g,o,0)|0)<<24>>24)+(l*10|0)|0;n=c[a>>2]|0;p=n+12|0;o=c[p>>2]|0;if((o|0)==(c[n+16>>2]|0)){md[c[(c[n>>2]|0)+40>>2]&127](n)|0;n=e;continue}else{c[p>>2]=o+1;n=e;continue}}if((m|0)==38){do if(n){if((c[n+12>>2]|0)==(c[n+16>>2]|0))if((md[c[(c[n>>2]|0)+36>>2]&127](n)|0)==-1){c[a>>2]=0;n=0;break}else{n=c[a>>2]|0;break}}else n=0;while(0);g=(n|0)==0;do if(e){if((c[e+12>>2]|0)==(c[e+16>>2]|0)?(md[c[(c[e>>2]|0)+36>>2]&127](e)|0)==-1:0){m=47;break}if(g){p=l;i=j;return p|0}}else m=47;while(0);if((m|0)==47?!g:0){p=l;i=j;return p|0}c[f>>2]=c[f>>2]|2;p=l;i=j;return p|0}else if((m|0)==49){i=j;return l|0}}c[f>>2]=c[f>>2]|4;p=0;i=j;return p|0}function Ol(a,b,d,e,f,g,h,j,k){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;l=i;i=i+32|0;r=l+16|0;n=l+12|0;q=l+8|0;o=l+4|0;p=l;t=c[f+28>>2]|0;s=t+4|0;c[s>>2]=(c[s>>2]|0)+1;s=Sn(t,19064)|0;x=t+4|0;y=c[x>>2]|0;c[x>>2]=y+ -1;if(!y)jd[c[(c[t>>2]|0)+8>>2]&255](t);c[g>>2]=0;a:do if((j|0)!=(k|0)){t=0;b:while(1){u=t;t=d;while(1){if(u){d=t;break a}if(!t){u=1;d=0;t=0}else{d=c[t+12>>2]|0;if((d|0)==(c[t+16>>2]|0))d=md[c[(c[t>>2]|0)+36>>2]&127](t)|0;else d=c[d>>2]|0;y=(d|0)==-1;u=y?1:0;d=y?0:t;t=y?0:t}if(e){v=c[e+12>>2]|0;if((v|0)==(c[e+16>>2]|0))v=md[c[(c[e>>2]|0)+36>>2]&127](e)|0;else v=c[v>>2]|0;if((v|0)!=-1){if(!u){m=20;break b}}else m=18}else m=18;if((m|0)==18){m=0;if(u){e=0;m=20;break b}else e=0}if((fd[c[(c[s>>2]|0)+52>>2]&31](s,c[j>>2]|0,0)|0)<<24>>24==37){m=22;break}if(fd[c[(c[s>>2]|0)+12>>2]&31](s,8192,c[j>>2]|0)|0){m=32;break}u=d+12|0;w=c[u>>2]|0;v=d+16|0;if((w|0)==(c[v>>2]|0))w=md[c[(c[d>>2]|0)+36>>2]&127](d)|0;else w=c[w>>2]|0;y=vd[c[(c[s>>2]|0)+28>>2]&63](s,w)|0;if((y|0)==(vd[c[(c[s>>2]|0)+28>>2]&63](s,c[j>>2]|0)|0)){m=58;break}c[g>>2]=4;u=4}c:do if((m|0)==22){m=0;u=j+4|0;if((u|0)==(k|0)){m=23;break b}t=fd[c[(c[s>>2]|0)+52>>2]&31](s,c[u>>2]|0,0)|0;if(t<<24>>24==48|t<<24>>24==69){u=j+8|0;if((u|0)==(k|0)){m=26;break b}j=u;u=fd[c[(c[s>>2]|0)+52>>2]&31](s,c[u>>2]|0,0)|0}else{j=u;u=t;t=0}y=c[(c[b>>2]|0)+36>>2]|0;c[o>>2]=d;c[p>>2]=e;c[n+0>>2]=c[o+0>>2];c[r+0>>2]=c[p+0>>2];ld[y&3](q,b,n,r,f,g,h,u,t);j=j+4|0;d=c[q>>2]|0}else if((m|0)==32){while(1){m=0;j=j+4|0;if((j|0)==(k|0)){j=k;break}if(fd[c[(c[s>>2]|0)+12>>2]&31](s,8192,c[j>>2]|0)|0)m=32;else break}u=e;v=e;while(1){if(!d){w=1;d=0}else{w=c[d+12>>2]|0;if((w|0)==(c[d+16>>2]|0))w=md[c[(c[d>>2]|0)+36>>2]&127](d)|0;else w=c[w>>2]|0;y=(w|0)==-1;w=y?1:0;d=y?0:d;t=y?0:t}if(v){x=c[v+12>>2]|0;if((x|0)==(c[v+16>>2]|0))v=md[c[(c[v>>2]|0)+36>>2]&127](v)|0;else v=c[x>>2]|0;if((v|0)!=-1)if(w^(u|0)==0){w=u;v=u}else{d=t;break c}else{u=0;e=0;m=45}}else m=45;if((m|0)==45){m=0;if(w){d=t;break c}else{w=u;v=0}}u=d+12|0;y=c[u>>2]|0;x=d+16|0;if((y|0)==(c[x>>2]|0))y=md[c[(c[d>>2]|0)+36>>2]&127](d)|0;else y=c[y>>2]|0;if(!(fd[c[(c[s>>2]|0)+12>>2]&31](s,8192,y)|0)){d=t;break c}y=c[u>>2]|0;if((y|0)==(c[x>>2]|0)){md[c[(c[d>>2]|0)+40>>2]&127](d)|0;u=w;continue}else{c[u>>2]=y+4;u=w;continue}}}else if((m|0)==58){m=0;w=c[u>>2]|0;if((w|0)==(c[v>>2]|0))md[c[(c[d>>2]|0)+40>>2]&127](d)|0;else c[u>>2]=w+4;j=j+4|0;d=t}while(0);if((j|0)==(k|0))break a;t=c[g>>2]|0}if((m|0)==20){c[g>>2]=4;break}else if((m|0)==23){c[g>>2]=4;break}else if((m|0)==26){c[g>>2]=4;break}}while(0);if(!d){f=0;n=1}else{f=c[d+12>>2]|0;if((f|0)==(c[d+16>>2]|0))f=md[c[(c[d>>2]|0)+36>>2]&127](d)|0;else f=c[f>>2]|0;n=(f|0)==-1;f=n?0:d;n=n?1:0}if(e){o=c[e+12>>2]|0;if((o|0)==(c[e+16>>2]|0))o=md[c[(c[e>>2]|0)+36>>2]&127](e)|0;else o=c[o>>2]|0;if((o|0)!=-1){if(n){c[a>>2]=f;i=l;return}}else m=73}else m=73;if((m|0)==73?!n:0){c[a>>2]=f;i=l;return}c[g>>2]=c[g>>2]|2;c[a>>2]=f;i=l;return}function Pl(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Ql(a){a=a|0;return}function Rl(a){a=a|0;return 2}function Sl(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0;j=i;Ol(a,b,c[d>>2]|0,c[e>>2]|0,f,g,h,18144,18176|0);i=j;return}function Tl(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0;k=i;m=d+8|0;m=md[c[(c[m>>2]|0)+20>>2]&127](m)|0;n=a[m>>0]|0;if(!(n&1)){l=m+4|0;m=(n&255)>>>1}else{l=c[m+8>>2]|0;m=c[m+4>>2]|0}Ol(b,d,c[e>>2]|0,c[f>>2]|0,g,h,j,l,l+(m<<2)|0);i=k;return}function Ul(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;j=i;k=c[f+28>>2]|0;f=k+4|0;c[f>>2]=(c[f>>2]|0)+1;f=Sn(k,19064)|0;m=k+4|0;l=c[m>>2]|0;c[m>>2]=l+ -1;if(!l)jd[c[(c[k>>2]|0)+8>>2]&255](k);Vl(b,h+24|0,d,c[e>>2]|0,g,f);c[a>>2]=c[d>>2];i=j;return}function Vl(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;h=i;a=a+8|0;a=md[c[c[a>>2]>>2]&127](a)|0;f=(Hk(d,e,a,a+168|0,g,f,0)|0)-a|0;if((f|0)>=168){i=h;return}c[b>>2]=((f|0)/12|0|0)%7|0;i=h;return}function Wl(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;j=i;k=c[f+28>>2]|0;f=k+4|0;c[f>>2]=(c[f>>2]|0)+1;f=Sn(k,19064)|0;m=k+4|0;l=c[m>>2]|0;c[m>>2]=l+ -1;if(!l)jd[c[(c[k>>2]|0)+8>>2]&255](k);Xl(b,h+16|0,d,c[e>>2]|0,g,f);c[a>>2]=c[d>>2];i=j;return}function Xl(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;h=i;a=a+8|0;a=md[c[(c[a>>2]|0)+4>>2]&127](a)|0;f=(Hk(d,e,a,a+288|0,g,f,0)|0)-a|0;if((f|0)>=288){i=h;return}c[b>>2]=((f|0)/12|0|0)%12|0;i=h;return}function Yl(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0;b=i;j=c[f+28>>2]|0;f=j+4|0;c[f>>2]=(c[f>>2]|0)+1;f=Sn(j,19064)|0;l=j+4|0;k=c[l>>2]|0;c[l>>2]=k+ -1;if(!k)jd[c[(c[j>>2]|0)+8>>2]&255](j);Zl(h+20|0,d,c[e>>2]|0,g,f);c[a>>2]=c[d>>2];i=b;return}function Zl(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0;g=i;f=$l(b,d,e,f,4)|0;if(c[e>>2]&4){i=g;return}if((f|0)<69)e=f+2e3|0;else e=(f+ -69|0)>>>0<31?f+1900|0:f;c[a>>2]=e+ -1900;i=g;return}function _l(b,d,e,f,g,h,j,k,l){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;l=i;i=i+48|0;x=l+36|0;w=l+16|0;q=l;r=l+28|0;t=l+32|0;y=l+40|0;s=l+12|0;z=l+24|0;u=l+20|0;v=l+8|0;p=l+4|0;c[h>>2]=0;A=c[g+28>>2]|0;n=A+4|0;c[n>>2]=(c[n>>2]|0)+1;n=Sn(A,19064)|0;C=A+4|0;B=c[C>>2]|0;c[C>>2]=B+ -1;if(!B)jd[c[(c[A>>2]|0)+8>>2]&255](A);a:do switch(k<<24>>24|0){case 89:{m=$l(e,c[f>>2]|0,h,n,4)|0;if(!(c[h>>2]&4))c[j+20>>2]=m+ -1900;break};case 37:{j=c[f>>2]|0;d=c[e>>2]|0;do if(d){f=c[d+12>>2]|0;if((f|0)==(c[d+16>>2]|0))f=md[c[(c[d>>2]|0)+36>>2]&127](d)|0;else f=c[f>>2]|0;if((f|0)==-1){c[e>>2]=0;f=1;break}else{f=(c[e>>2]|0)==0;break}}else f=1;while(0);if(j){d=c[j+12>>2]|0;if((d|0)==(c[j+16>>2]|0))d=md[c[(c[j>>2]|0)+36>>2]&127](j)|0;else d=c[d>>2]|0;if((d|0)!=-1){if(!f)m=115}else m=113}else m=113;if((m|0)==113)if(f)m=115;else j=0;if((m|0)==115){c[h>>2]=c[h>>2]|6;break a}f=c[e>>2]|0;d=c[f+12>>2]|0;if((d|0)==(c[f+16>>2]|0))f=md[c[(c[f>>2]|0)+36>>2]&127](f)|0;else f=c[d>>2]|0;if((fd[c[(c[n>>2]|0)+52>>2]&31](n,f,0)|0)<<24>>24!=37){c[h>>2]=c[h>>2]|4;break a}n=c[e>>2]|0;f=n+12|0;d=c[f>>2]|0;if((d|0)==(c[n+16>>2]|0))md[c[(c[n>>2]|0)+40>>2]&127](n)|0;else c[f>>2]=d+4;f=c[e>>2]|0;do if(f){n=c[f+12>>2]|0;if((n|0)==(c[f+16>>2]|0))n=md[c[(c[f>>2]|0)+36>>2]&127](f)|0;else n=c[n>>2]|0;if((n|0)==-1){c[e>>2]=0;n=1;break}else{n=(c[e>>2]|0)==0;break}}else n=1;while(0);if(j){f=c[j+12>>2]|0;if((f|0)==(c[j+16>>2]|0))j=md[c[(c[j>>2]|0)+36>>2]&127](j)|0;else j=c[f>>2]|0;if((j|0)!=-1){if(n)break a}else m=136}else m=136;if((m|0)==136?!n:0)break a;c[h>>2]=c[h>>2]|2;break};case 65:case 97:{Vl(d,j+24|0,e,c[f>>2]|0,h,n);break};case 101:case 100:{m=j+12|0;n=$l(e,c[f>>2]|0,h,n,2)|0;j=c[h>>2]|0;if((j&4|0)==0?(n+ -1|0)>>>0<31:0){c[m>>2]=n;break a}c[h>>2]=j|4;break};case 70:{Ol(t,d,c[e>>2]|0,c[f>>2]|0,g,h,j,18208,18240|0);c[e>>2]=c[t>>2];break};case 77:{m=$l(e,c[f>>2]|0,h,n,2)|0;n=c[h>>2]|0;if((n&4|0)==0&(m|0)<60){c[j+4>>2]=m;break a}else{c[h>>2]=n|4;break a}};case 73:{m=j+8|0;j=$l(e,c[f>>2]|0,h,n,2)|0;n=c[h>>2]|0;if((n&4|0)==0?(j+ -1|0)>>>0<12:0){c[m>>2]=j;break a}c[h>>2]=n|4;break};case 112:{m=j+8|0;f=c[f>>2]|0;j=d+8|0;j=md[c[(c[j>>2]|0)+8>>2]&127](j)|0;d=a[j>>0]|0;if(!(d&1))d=(d&255)>>>1;else d=c[j+4>>2]|0;g=a[j+12>>0]|0;if(!(g&1))g=(g&255)>>>1;else g=c[j+16>>2]|0;if((d|0)==(0-g|0)){c[h>>2]=c[h>>2]|4;break a}C=Hk(e,f,j,j+24|0,n,h,0)|0;h=C-j|0;if((C|0)==(j|0)?(c[m>>2]|0)==12:0){c[m>>2]=0;break a}if((h|0)==12?(o=c[m>>2]|0,(o|0)<12):0)c[m>>2]=o+12;break};case 82:{Ol(s,d,c[e>>2]|0,c[f>>2]|0,g,h,j,18288,18308|0);c[e>>2]=c[s>>2];break};case 104:case 66:case 98:{Xl(d,j+16|0,e,c[f>>2]|0,h,n);break};case 84:{Ol(z,d,c[e>>2]|0,c[f>>2]|0,g,h,j,18312,18344|0);c[e>>2]=c[z>>2];break};case 68:{Ol(r,d,c[e>>2]|0,c[f>>2]|0,g,h,j,18176,18208|0);c[e>>2]=c[r>>2];break};case 121:{Zl(j+20|0,e,c[f>>2]|0,h,n);break};case 109:{n=$l(e,c[f>>2]|0,h,n,2)|0;m=c[h>>2]|0;if((m&4|0)==0&(n|0)<13){c[j+16>>2]=n+ -1;break a}else{c[h>>2]=m|4;break a}};case 99:{n=d+8|0;n=md[c[(c[n>>2]|0)+12>>2]&127](n)|0;o=a[n>>0]|0;if(!(o&1)){m=n+4|0;n=(o&255)>>>1}else{m=c[n+8>>2]|0;n=c[n+4>>2]|0}Ol(q,d,c[e>>2]|0,c[f>>2]|0,g,h,j,m,m+(n<<2)|0);c[e>>2]=c[q>>2];break};case 72:{n=$l(e,c[f>>2]|0,h,n,2)|0;m=c[h>>2]|0;if((m&4|0)==0&(n|0)<24){c[j+8>>2]=n;break a}else{c[h>>2]=m|4;break a}};case 106:{m=$l(e,c[f>>2]|0,h,n,3)|0;n=c[h>>2]|0;if((n&4|0)==0&(m|0)<366){c[j+28>>2]=m;break a}else{c[h>>2]=n|4;break a}};case 120:{C=c[(c[d>>2]|0)+20>>2]|0;c[u>>2]=c[e>>2];c[v>>2]=c[f>>2];c[w+0>>2]=c[u+0>>2];c[x+0>>2]=c[v+0>>2];gd[C&63](b,d,w,x,g,h,j);i=l;return};case 114:{Ol(y,d,c[e>>2]|0,c[f>>2]|0,g,h,j,18240,18284|0);c[e>>2]=c[y>>2];break};case 116:case 110:{j=c[f>>2]|0;while(1){f=c[e>>2]|0;do if(f){d=c[f+12>>2]|0;if((d|0)==(c[f+16>>2]|0))f=md[c[(c[f>>2]|0)+36>>2]&127](f)|0;else f=c[d>>2]|0;if((f|0)==-1){c[e>>2]=0;f=1;break}else{f=(c[e>>2]|0)==0;break}}else f=1;while(0);if(j){d=c[j+12>>2]|0;if((d|0)==(c[j+16>>2]|0))d=md[c[(c[j>>2]|0)+36>>2]&127](j)|0;else d=c[d>>2]|0;if((d|0)!=-1){if(!f)break}else m=46}else m=46;if((m|0)==46){m=0;if(f){j=0;break}else j=0}f=c[e>>2]|0;d=c[f+12>>2]|0;if((d|0)==(c[f+16>>2]|0))f=md[c[(c[f>>2]|0)+36>>2]&127](f)|0;else f=c[d>>2]|0;if(!(fd[c[(c[n>>2]|0)+12>>2]&31](n,8192,f)|0))break;g=c[e>>2]|0;d=g+12|0;f=c[d>>2]|0;if((f|0)==(c[g+16>>2]|0)){md[c[(c[g>>2]|0)+40>>2]&127](g)|0;continue}else{c[d>>2]=f+4;continue}}f=c[e>>2]|0;do if(f){n=c[f+12>>2]|0;if((n|0)==(c[f+16>>2]|0))n=md[c[(c[f>>2]|0)+36>>2]&127](f)|0;else n=c[n>>2]|0;if((n|0)==-1){c[e>>2]=0;n=1;break}else{n=(c[e>>2]|0)==0;break}}else n=1;while(0);if(j){f=c[j+12>>2]|0;if((f|0)==(c[j+16>>2]|0))j=md[c[(c[j>>2]|0)+36>>2]&127](j)|0;else j=c[f>>2]|0;if((j|0)!=-1){if(n)break a}else m=67}else m=67;if((m|0)==67?!n:0)break a;c[h>>2]=c[h>>2]|2;break};case 88:{n=d+8|0;n=md[c[(c[n>>2]|0)+24>>2]&127](n)|0;o=a[n>>0]|0;if(!(o&1)){m=n+4|0;n=(o&255)>>>1}else{m=c[n+8>>2]|0;n=c[n+4>>2]|0}Ol(p,d,c[e>>2]|0,c[f>>2]|0,g,h,j,m,m+(n<<2)|0);c[e>>2]=c[p>>2];break};case 83:{n=$l(e,c[f>>2]|0,h,n,2)|0;m=c[h>>2]|0;if((m&4|0)==0&(n|0)<61){c[j>>2]=n;break a}else{c[h>>2]=m|4;break a}};case 119:{m=$l(e,c[f>>2]|0,h,n,1)|0;n=c[h>>2]|0;if((n&4|0)==0&(m|0)<7){c[j+24>>2]=m;break a}else{c[h>>2]=n|4;break a}};default:c[h>>2]=c[h>>2]|4}while(0);c[b>>2]=c[e>>2];i=l;return}function $l(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;h=i;k=c[a>>2]|0;do if(k){j=c[k+12>>2]|0;if((j|0)==(c[k+16>>2]|0))j=md[c[(c[k>>2]|0)+36>>2]&127](k)|0;else j=c[j>>2]|0;if((j|0)==-1){c[a>>2]=0;j=1;break}else{j=(c[a>>2]|0)==0;break}}else j=1;while(0);if(b){k=c[b+12>>2]|0;if((k|0)==(c[b+16>>2]|0))k=md[c[(c[b>>2]|0)+36>>2]&127](b)|0;else k=c[k>>2]|0;if((k|0)!=-1){if(!j)g=15}else g=13}else g=13;if((g|0)==13)if(j)g=15;else b=0;if((g|0)==15){c[d>>2]=c[d>>2]|6;n=0;i=h;return n|0}j=c[a>>2]|0;k=c[j+12>>2]|0;if((k|0)==(c[j+16>>2]|0))j=md[c[(c[j>>2]|0)+36>>2]&127](j)|0;else j=c[k>>2]|0;if(!(fd[c[(c[e>>2]|0)+12>>2]&31](e,2048,j)|0)){c[d>>2]=c[d>>2]|4;n=0;i=h;return n|0}j=(fd[c[(c[e>>2]|0)+52>>2]&31](e,j,0)|0)<<24>>24;l=c[a>>2]|0;k=l+12|0;m=c[k>>2]|0;if((m|0)==(c[l+16>>2]|0)){md[c[(c[l>>2]|0)+40>>2]&127](l)|0;k=b;l=b;b=j}else{c[k>>2]=m+4;k=b;l=b;b=j}while(1){b=b+ -48|0;f=f+ -1|0;j=c[a>>2]|0;do if(j){m=c[j+12>>2]|0;if((m|0)==(c[j+16>>2]|0))j=md[c[(c[j>>2]|0)+36>>2]&127](j)|0;else j=c[m>>2]|0;if((j|0)==-1){c[a>>2]=0;m=1;break}else{m=(c[a>>2]|0)==0;break}}else m=1;while(0);if(!l){j=k;l=0;n=1}else{j=c[l+12>>2]|0;if((j|0)==(c[l+16>>2]|0))j=md[c[(c[l>>2]|0)+36>>2]&127](l)|0;else j=c[j>>2]|0;n=(j|0)==-1;j=n?0:k;l=n?0:k;n=n?1:(k|0)==0}k=c[a>>2]|0;if(!((m^n)&(f|0)>0))break;m=c[k+12>>2]|0;if((m|0)==(c[k+16>>2]|0))k=md[c[(c[k>>2]|0)+36>>2]&127](k)|0;else k=c[m>>2]|0;if(!(fd[c[(c[e>>2]|0)+12>>2]&31](e,2048,k)|0)){g=59;break}b=((fd[c[(c[e>>2]|0)+52>>2]&31](e,k,0)|0)<<24>>24)+(b*10|0)|0;m=c[a>>2]|0;n=m+12|0;k=c[n>>2]|0;if((k|0)==(c[m+16>>2]|0)){md[c[(c[m>>2]|0)+40>>2]&127](m)|0;k=j;continue}else{c[n>>2]=k+4;k=j;continue}}if((g|0)==59){i=h;return b|0}do if(k){e=c[k+12>>2]|0;if((e|0)==(c[k+16>>2]|0))e=md[c[(c[k>>2]|0)+36>>2]&127](k)|0;else e=c[e>>2]|0;if((e|0)==-1){c[a>>2]=0;a=1;break}else{a=(c[a>>2]|0)==0;break}}else a=1;while(0);if(j){e=c[j+12>>2]|0;if((e|0)==(c[j+16>>2]|0))e=md[c[(c[j>>2]|0)+36>>2]&127](j)|0;else e=c[e>>2]|0;if((e|0)!=-1){if(a){n=b;i=h;return n|0}}else g=56}else g=56;if((g|0)==56?!a:0){n=b;i=h;return n|0}c[d>>2]=c[d>>2]|2;n=b;i=h;return n|0}function am(a){a=a|0;var b=0;b=i;cm(a+8|0);Uq(a);i=b;return}function bm(a){a=a|0;var b=0;b=i;cm(a+8|0);i=b;return}function cm(a){a=a|0;var b=0,d=0;b=i;d=c[a>>2]|0;if((d|0)==(Dk()|0)){i=b;return}ub(c[a>>2]|0);i=b;return}function dm(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0;g=i;i=i+112|0;f=g+4|0;l=g;c[l>>2]=f+100;em(d+8|0,f,l,h,j,k);j=c[l>>2]|0;d=c[e>>2]|0;if((f|0)==(j|0)){l=d;c[b>>2]=l;i=g;return}else e=d;do{l=a[f>>0]|0;do if(d){k=d+24|0;h=c[k>>2]|0;if((h|0)==(c[d+28>>2]|0)){l=(vd[c[(c[d>>2]|0)+52>>2]&63](d,l&255)|0)==-1;e=l?0:e;d=l?0:d;break}else{c[k>>2]=h+1;a[h>>0]=l;break}}else d=0;while(0);f=f+1|0}while((f|0)!=(j|0));c[b>>2]=e;i=g;return}function em(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;j=i;i=i+16|0;k=j;a[k>>0]=37;m=k+1|0;a[m>>0]=g;l=k+2|0;a[l>>0]=h;a[k+3>>0]=0;if(h<<24>>24){a[m>>0]=h;a[l>>0]=g}c[e>>2]=d+(Bc(d|0,(c[e>>2]|0)-d|0,k|0,f|0,c[b>>2]|0)|0);i=j;return}function fm(a){a=a|0;var b=0;b=i;cm(a+8|0);Uq(a);i=b;return}function gm(a){a=a|0;var b=0;b=i;cm(a+8|0);i=b;return}function hm(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0;f=i;i=i+528|0;m=f+416|0;n=f+412|0;k=f;l=f+408|0;e=f+8|0;b=b+8|0;c[n>>2]=m+100;em(b,m,n,g,h,j);h=k;c[h>>2]=0;c[h+4>>2]=0;c[l>>2]=m;b=Yb(c[b>>2]|0)|0;h=Tp(e,l,100,k)|0;if(b)Yb(b|0)|0;if((h|0)==-1)dn(19912);b=e+(h<<2)|0;j=c[d>>2]|0;if(!h){n=j;c[a>>2]=n;i=f;return}else{d=e;e=j}do{g=c[d>>2]|0;if(!e)e=0;else{h=e+24|0;k=c[h>>2]|0;if((k|0)==(c[e+28>>2]|0))g=vd[c[(c[e>>2]|0)+52>>2]&63](e,g)|0;else{c[h>>2]=k+4;c[k>>2]=g}n=(g|0)==-1;j=n?0:j;e=n?0:e}d=d+4|0}while((d|0)!=(b|0));c[a>>2]=j;i=f;return}function im(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function jm(a){a=a|0;return}function km(a){a=a|0;return 127}function lm(a){a=a|0;return 127}function mm(a,b){a=a|0;b=b|0;b=i;c[a+0>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;i=b;return}function nm(a,b){a=a|0;b=b|0;b=i;c[a+0>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;i=b;return}function om(a,b){a=a|0;b=b|0;b=i;c[a+0>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;i=b;return}function pm(b,c){b=b|0;c=c|0;a[b>>0]=2;a[b+1>>0]=45;a[b+2>>0]=0;return}function qm(a){a=a|0;return 0}function rm(b,c){b=b|0;c=c|0;a[b>>0]=2;a[b+1>>0]=3;a[b+2>>0]=0;a[b+3>>0]=4;return}function sm(b,c){b=b|0;c=c|0;a[b>>0]=2;a[b+1>>0]=3;a[b+2>>0]=0;a[b+3>>0]=4;return}function tm(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function um(a){a=a|0;return}function vm(a){a=a|0;return 127}function wm(a){a=a|0;return 127}function xm(a,b){a=a|0;b=b|0;b=i;c[a+0>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;i=b;return}function ym(a,b){a=a|0;b=b|0;b=i;c[a+0>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;i=b;return}function zm(a,b){a=a|0;b=b|0;b=i;c[a+0>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;i=b;return}function Am(b,c){b=b|0;c=c|0;a[b>>0]=2;a[b+1>>0]=45;a[b+2>>0]=0;return}function Bm(a){a=a|0;return 0}function Cm(b,c){b=b|0;c=c|0;a[b>>0]=2;a[b+1>>0]=3;a[b+2>>0]=0;a[b+3>>0]=4;return}function Dm(b,c){b=b|0;c=c|0;a[b>>0]=2;a[b+1>>0]=3;a[b+2>>0]=0;a[b+3>>0]=4;return}function Em(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Fm(a){a=a|0;return}function Gm(a){a=a|0;return 2147483647}function Hm(a){a=a|0;return 2147483647}function Im(a,b){a=a|0;b=b|0;b=i;c[a+0>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;i=b;return}function Jm(a,b){a=a|0;b=b|0;b=i;c[a+0>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;i=b;return}function Km(a,b){a=a|0;b=b|0;b=i;c[a+0>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;i=b;return}function Lm(b,d){b=b|0;d=d|0;var e=0,f=0;d=i;a[b>>0]=2;b=b+4|0;f=1;e=b;while(1){f=f+ -1|0;c[e>>2]=45;if(!f)break;else e=e+4|0}c[b+4>>2]=0;i=d;return}function Mm(a){a=a|0;return 0}function Nm(b,c){b=b|0;c=c|0;a[b>>0]=2;a[b+1>>0]=3;a[b+2>>0]=0;a[b+3>>0]=4;return}function Om(b,c){b=b|0;c=c|0;a[b>>0]=2;a[b+1>>0]=3;a[b+2>>0]=0;a[b+3>>0]=4;return}function Pm(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Qm(a){a=a|0;return}function Rm(a){a=a|0;return 2147483647}function Sm(a){a=a|0;return 2147483647}function Tm(a,b){a=a|0;b=b|0;b=i;c[a+0>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;i=b;return}function Um(a,b){a=a|0;b=b|0;b=i;c[a+0>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;i=b;return}function Vm(a,b){a=a|0;b=b|0;b=i;c[a+0>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;i=b;return}function Wm(b,d){b=b|0;d=d|0;var e=0,f=0;d=i;a[b>>0]=2;b=b+4|0;f=1;e=b;while(1){f=f+ -1|0;c[e>>2]=45;if(!f)break;else e=e+4|0}c[b+4>>2]=0;i=d;return}function Xm(a){a=a|0;return 0}function Ym(b,c){b=b|0;c=c|0;a[b>>0]=2;a[b+1>>0]=3;a[b+2>>0]=0;a[b+3>>0]=4;return}function Zm(b,c){b=b|0;c=c|0;a[b>>0]=2;a[b+1>>0]=3;a[b+2>>0]=0;a[b+3>>0]=4;return}function _m(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function $m(a){a=a|0;return}function an(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+240|0;q=d;x=d+132|0;n=d+8|0;s=d+16|0;t=d+130|0;r=d+120|0;p=d+20|0;c[n>>2]=x;m=n+4|0;c[m>>2]=243;o=c[h+28>>2]|0;u=o+4|0;c[u>>2]=(c[u>>2]|0)+1;u=Sn(o,19072)|0;a[t>>0]=0;if(cn(e,c[f>>2]|0,g,o,c[h+4>>2]|0,j,t,u,n,s,x+100|0)|0){sd[c[(c[u>>2]|0)+32>>2]&7](u,18704,18714,r)|0;g=c[s>>2]|0;u=c[n>>2]|0;h=g-u|0;if((h|0)>98){v=Tq(h+2|0)|0;if(!v){x=Wb(4)|0;c[x>>2]=27280;Zc(x|0,27328,220)}else h=v}else{h=0;v=p}if(a[t>>0]|0){a[v>>0]=45;v=v+1|0}if(u>>>0<g>>>0){t=r+10|0;g=r;do{w=a[u>>0]|0;x=r;while(1){if((a[x>>0]|0)==w<<24>>24)break;x=x+1|0;if((x|0)==(t|0)){x=t;break}}a[v>>0]=a[18704+(x-g)>>0]|0;u=u+1|0;v=v+1|0}while(u>>>0<(c[s>>2]|0)>>>0)}a[v>>0]=0;c[q>>2]=k;if((Up(p,18720,q)|0)!=1)dn(18728);Uq(h)}k=c[e>>2]|0;if(k){if((c[k+12>>2]|0)==(c[k+16>>2]|0)?(md[c[(c[k>>2]|0)+36>>2]&127](k)|0)==-1:0){c[e>>2]=0;k=0}}else k=0;p=(k|0)==0;e=c[f>>2]|0;do if(e){if((c[e+12>>2]|0)!=(c[e+16>>2]|0))if(p)break;else{l=33;break}if((md[c[(c[e>>2]|0)+36>>2]&127](e)|0)!=-1)if(p)break;else{l=33;break}else{c[f>>2]=0;l=31;break}}else l=31;while(0);if((l|0)==31?p:0)l=33;if((l|0)==33)c[j>>2]=c[j>>2]|2;c[b>>2]=k;w=o+4|0;x=c[w>>2]|0;c[w>>2]=x+ -1;if(!x)jd[c[(c[o>>2]|0)+8>>2]&255](o);l=c[n>>2]|0;c[n>>2]=0;if(!l){i=d;return}jd[c[m>>2]&255](l);i=d;return}function bn(a){a=a|0;return}function cn(e,f,g,h,j,k,l,m,n,o,p){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;var q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0;r=i;i=i+592|0;F=r+76|0;G=r+112|0;J=r;A=r+176|0;H=r+64|0;M=r+24|0;K=r+28|0;L=r+124|0;I=r+148|0;z=r+164|0;B=r+188|0;U=r+192|0;q=r+80|0;E=r+88|0;D=r+104|0;C=r+108|0;u=r+92|0;w=r+40|0;t=r+136|0;v=r+12|0;s=r+52|0;x=r+160|0;c[B>>2]=p;c[q>>2]=U;p=q+4|0;c[p>>2]=243;c[E>>2]=U;c[D>>2]=U+400;c[C>>2]=0;c[u+0>>2]=0;c[u+4>>2]=0;c[u+8>>2]=0;c[w+0>>2]=0;c[w+4>>2]=0;c[w+8>>2]=0;c[t+0>>2]=0;c[t+4>>2]=0;c[t+8>>2]=0;c[v+0>>2]=0;c[v+4>>2]=0;c[v+8>>2]=0;c[s+0>>2]=0;c[s+4>>2]=0;c[s+8>>2]=0;if(g){z=Sn(h,18528)|0;kd[c[(c[z>>2]|0)+44>>2]&63](F,z);c[C>>2]=c[F>>2];kd[c[(c[z>>2]|0)+32>>2]&63](G,z);if(!(a[v>>0]&1)){a[v+1>>0]=0;a[v>>0]=0}else{a[c[v+8>>2]>>0]=0;c[v+4>>2]=0}Li(v);c[v+0>>2]=c[G+0>>2];c[v+4>>2]=c[G+4>>2];c[v+8>>2]=c[G+8>>2];c[G+0>>2]=0;c[G+4>>2]=0;c[G+8>>2]=0;kd[c[(c[z>>2]|0)+28>>2]&63](J,z);if(!(a[t>>0]&1)){a[t+1>>0]=0;a[t>>0]=0}else{a[c[t+8>>2]>>0]=0;c[t+4>>2]=0}Li(t);c[t+0>>2]=c[J+0>>2];c[t+4>>2]=c[J+4>>2];c[t+8>>2]=c[J+8>>2];c[J+0>>2]=0;c[J+4>>2]=0;c[J+8>>2]=0;F=md[c[(c[z>>2]|0)+12>>2]&127](z)|0;G=md[c[(c[z>>2]|0)+16>>2]&127](z)|0;kd[c[(c[z>>2]|0)+20>>2]&63](A,z);if(!(a[u>>0]&1)){a[u+1>>0]=0;a[u>>0]=0}else{a[c[u+8>>2]>>0]=0;c[u+4>>2]=0}Li(u);c[u+0>>2]=c[A+0>>2];c[u+4>>2]=c[A+4>>2];c[u+8>>2]=c[A+8>>2];c[A+0>>2]=0;c[A+4>>2]=0;c[A+8>>2]=0;kd[c[(c[z>>2]|0)+24>>2]&63](H,z);if(!(a[w>>0]&1)){a[w+1>>0]=0;a[w>>0]=0}else{a[c[w+8>>2]>>0]=0;c[w+4>>2]=0}Li(w);c[w+0>>2]=c[H+0>>2];c[w+4>>2]=c[H+4>>2];c[w+8>>2]=c[H+8>>2];c[H+0>>2]=0;c[H+4>>2]=0;c[H+8>>2]=0;T=md[c[(c[z>>2]|0)+36>>2]&127](z)|0}else{A=Sn(h,18464)|0;kd[c[(c[A>>2]|0)+44>>2]&63](M,A);c[C>>2]=c[M>>2];kd[c[(c[A>>2]|0)+32>>2]&63](K,A);if(!(a[v>>0]&1)){a[v+1>>0]=0;a[v>>0]=0}else{a[c[v+8>>2]>>0]=0;c[v+4>>2]=0}Li(v);c[v+0>>2]=c[K+0>>2];c[v+4>>2]=c[K+4>>2];c[v+8>>2]=c[K+8>>2];c[K+0>>2]=0;c[K+4>>2]=0;c[K+8>>2]=0;kd[c[(c[A>>2]|0)+28>>2]&63](L,A);if(!(a[t>>0]&1)){a[t+1>>0]=0;a[t>>0]=0}else{a[c[t+8>>2]>>0]=0;c[t+4>>2]=0}Li(t);c[t+0>>2]=c[L+0>>2];c[t+4>>2]=c[L+4>>2];c[t+8>>2]=c[L+8>>2];c[L+0>>2]=0;c[L+4>>2]=0;c[L+8>>2]=0;F=md[c[(c[A>>2]|0)+12>>2]&127](A)|0;G=md[c[(c[A>>2]|0)+16>>2]&127](A)|0;kd[c[(c[A>>2]|0)+20>>2]&63](I,A);if(!(a[u>>0]&1)){a[u+1>>0]=0;a[u>>0]=0}else{a[c[u+8>>2]>>0]=0;c[u+4>>2]=0}Li(u);c[u+0>>2]=c[I+0>>2];c[u+4>>2]=c[I+4>>2];c[u+8>>2]=c[I+8>>2];c[I+0>>2]=0;c[I+4>>2]=0;c[I+8>>2]=0;kd[c[(c[A>>2]|0)+24>>2]&63](z,A);if(!(a[w>>0]&1)){a[w+1>>0]=0;a[w>>0]=0}else{a[c[w+8>>2]>>0]=0;c[w+4>>2]=0}Li(w);c[w+0>>2]=c[z+0>>2];c[w+4>>2]=c[z+4>>2];c[w+8>>2]=c[z+8>>2];c[z+0>>2]=0;c[z+4>>2]=0;c[z+8>>2]=0;T=md[c[(c[A>>2]|0)+36>>2]&127](A)|0}c[o>>2]=c[n>>2];L=m+8|0;J=v+1|0;I=v+4|0;m=v+8|0;H=t+1|0;K=t+4|0;z=t+8|0;P=(j&512|0)!=0;Q=w+1|0;A=w+8|0;h=w+4|0;g=s+1|0;j=s+8|0;M=s+4|0;N=C+3|0;O=u+4|0;S=0;R=0;a:while(1){V=c[e>>2]|0;do if(V){if((c[V+12>>2]|0)==(c[V+16>>2]|0))if((md[c[(c[V>>2]|0)+36>>2]&127](V)|0)==-1){c[e>>2]=0;V=0;break}else{V=c[e>>2]|0;break}}else V=0;while(0);V=(V|0)==0;do if(f){if((c[f+12>>2]|0)!=(c[f+16>>2]|0))if(V)break;else{y=311;break a}if((md[c[(c[f>>2]|0)+36>>2]&127](f)|0)!=-1){if(!V){y=311;break a}}else y=64}else y=64;while(0);if((y|0)==64){y=0;if(V){f=0;y=311;break}else f=0}b:do switch(a[C+S>>0]|0){case 2:{if(!((R|0)!=0|S>>>0<2)){if((S|0)==2)V=(a[N>>0]|0)!=0;else V=0;if(!(P|V)){W=f;R=0;break b}}Y=a[w>>0]|0;W=(Y&1)==0;V=W?Q:c[A>>2]|0;c:do if((S|0)!=0?(d[C+(S+ -1)>>0]|0)<2:0){W=V+(W?(Y&255)>>>1:c[h>>2]|0)|0;X=V;while(1){if((X|0)==(W|0))break;Z=a[X>>0]|0;if(Z<<24>>24<=-1)break;if(!(b[(c[L>>2]|0)+(Z<<24>>24<<1)>>1]&8192))break;else X=X+1|0}W=X-V|0;_=a[s>>0]|0;$=(_&1)==0;if($)Z=(_&255)>>>1;else Z=c[M>>2]|0;if(W>>>0<=Z>>>0){if($){$=(_&255)>>>1;_=g;Z=$;W=s+($-W)+1|0}else{aa=c[j>>2]|0;$=c[M>>2]|0;_=aa;Z=$;W=aa+($-W)|0}Z=_+Z|0;if((W|0)==(Z|0)){W=f;V=X;X=f}else{_=V;while(1){if((a[W>>0]|0)!=(a[_>>0]|0)){W=f;X=f;break c}W=W+1|0;if((W|0)==(Z|0)){W=f;V=X;X=f;break}else _=_+1|0}}}else{W=f;X=f}}else{W=f;X=f}while(0);d:while(1){if(!(Y&1)){Z=Q;Y=(Y&255)>>>1}else{Z=c[A>>2]|0;Y=c[h>>2]|0}if((V|0)==(Z+Y|0))break;Y=c[e>>2]|0;do if(Y){if((c[Y+12>>2]|0)==(c[Y+16>>2]|0))if((md[c[(c[Y>>2]|0)+36>>2]&127](Y)|0)==-1){c[e>>2]=0;Y=0;break}else{Y=c[e>>2]|0;break}}else Y=0;while(0);Y=(Y|0)==0;do if(X){if((c[X+12>>2]|0)!=(c[X+16>>2]|0))if(Y){Y=W;break}else break d;if((md[c[(c[X>>2]|0)+36>>2]&127](X)|0)!=-1)if(Y^(W|0)==0){Y=W;X=W}else break d;else{W=0;f=0;y=204}}else y=204;while(0);if((y|0)==204){y=0;if(Y)break;else{Y=W;X=0}}Z=c[e>>2]|0;W=c[Z+12>>2]|0;if((W|0)==(c[Z+16>>2]|0))W=md[c[(c[Z>>2]|0)+36>>2]&127](Z)|0;else W=d[W>>0]|0;if((W&255)<<24>>24!=(a[V>>0]|0)){W=Y;break}W=c[e>>2]|0;Z=W+12|0;_=c[Z>>2]|0;if((_|0)==(c[W+16>>2]|0))md[c[(c[W>>2]|0)+40>>2]&127](W)|0;else c[Z>>2]=_+1;W=Y;Y=a[w>>0]|0;V=V+1|0}if(P){Y=a[w>>0]|0;if(!(Y&1)){X=Q;Y=(Y&255)>>>1}else{X=c[A>>2]|0;Y=c[h>>2]|0}if((V|0)!=(X+Y|0)){y=219;break a}}break};case 3:{V=a[t>>0]|0;X=(V&1)==0;if(X)_=(V&255)>>>1;else _=c[K>>2]|0;W=a[v>>0]|0;Y=(W&1)==0;if(Y)Z=(W&255)>>>1;else Z=c[I>>2]|0;if((_|0)==(0-Z|0))W=f;else{if(X)Z=(V&255)>>>1;else Z=c[K>>2]|0;if(Z){if(Y)Y=(W&255)>>>1;else Y=c[I>>2]|0;if(Y){X=c[e>>2]|0;Z=c[X+12>>2]|0;Y=c[X+16>>2]|0;if((Z|0)==(Y|0)){W=md[c[(c[X>>2]|0)+36>>2]&127](X)|0;Y=c[e>>2]|0;V=a[t>>0]|0;X=Y;Z=c[Y+12>>2]|0;Y=c[Y+16>>2]|0}else W=d[Z>>0]|0;_=X+12|0;Y=(Z|0)==(Y|0);if((W&255)<<24>>24==(a[((V&1)==0?H:c[z>>2]|0)>>0]|0)){if(Y)md[c[(c[X>>2]|0)+40>>2]&127](X)|0;else c[_>>2]=Z+1;V=a[t>>0]|0;if(!(V&1))V=(V&255)>>>1;else V=c[K>>2]|0;W=f;R=V>>>0>1?t:R;break b}if(Y)V=md[c[(c[X>>2]|0)+36>>2]&127](X)|0;else V=d[Z>>0]|0;if((V&255)<<24>>24!=(a[((a[v>>0]&1)==0?J:c[m>>2]|0)>>0]|0)){y=168;break a}X=c[e>>2]|0;W=X+12|0;V=c[W>>2]|0;if((V|0)==(c[X+16>>2]|0))md[c[(c[X>>2]|0)+40>>2]&127](X)|0;else c[W>>2]=V+1;a[l>>0]=1;V=a[v>>0]|0;if(!(V&1))V=(V&255)>>>1;else V=c[I>>2]|0;W=f;R=V>>>0>1?v:R;break b}}if(X)_=(V&255)>>>1;else _=c[K>>2]|0;Z=c[e>>2]|0;Y=c[Z+12>>2]|0;X=(Y|0)==(c[Z+16>>2]|0);if(!_){if(X){V=md[c[(c[Z>>2]|0)+36>>2]&127](Z)|0;W=a[v>>0]|0}else V=d[Y>>0]|0;if((V&255)<<24>>24!=(a[((W&1)==0?J:c[m>>2]|0)>>0]|0)){W=f;break b}X=c[e>>2]|0;W=X+12|0;V=c[W>>2]|0;if((V|0)==(c[X+16>>2]|0))md[c[(c[X>>2]|0)+40>>2]&127](X)|0;else c[W>>2]=V+1;a[l>>0]=1;V=a[v>>0]|0;if(!(V&1))V=(V&255)>>>1;else V=c[I>>2]|0;W=f;R=V>>>0>1?v:R;break b}if(X){W=md[c[(c[Z>>2]|0)+36>>2]&127](Z)|0;V=a[t>>0]|0}else W=d[Y>>0]|0;if((W&255)<<24>>24!=(a[((V&1)==0?H:c[z>>2]|0)>>0]|0)){a[l>>0]=1;W=f;break b}X=c[e>>2]|0;W=X+12|0;V=c[W>>2]|0;if((V|0)==(c[X+16>>2]|0))md[c[(c[X>>2]|0)+40>>2]&127](X)|0;else c[W>>2]=V+1;V=a[t>>0]|0;if(!(V&1))V=(V&255)>>>1;else V=c[K>>2]|0;W=f;R=V>>>0>1?t:R}break};case 4:{Y=f;X=f;V=0;e:while(1){W=c[e>>2]|0;do if(W){if((c[W+12>>2]|0)==(c[W+16>>2]|0))if((md[c[(c[W>>2]|0)+36>>2]&127](W)|0)==-1){c[e>>2]=0;W=0;break}else{W=c[e>>2]|0;break}}else W=0;while(0);Z=(W|0)==0;do if(X){if((c[X+12>>2]|0)!=(c[X+16>>2]|0))if(Z){W=Y;break}else{W=Y;break e}if((md[c[(c[X>>2]|0)+36>>2]&127](X)|0)!=-1)if(Z^(Y|0)==0){W=Y;X=Y}else{W=Y;break e}else{W=0;f=0;y=231}}else{W=Y;y=231}while(0);if((y|0)==231){y=0;if(Z)break;else X=0}Y=c[e>>2]|0;Z=c[Y+12>>2]|0;if((Z|0)==(c[Y+16>>2]|0))Z=md[c[(c[Y>>2]|0)+36>>2]&127](Y)|0;else Z=d[Z>>0]|0;Y=Z&255;if(Y<<24>>24>-1?(b[(c[L>>2]|0)+(Z<<24>>24<<1)>>1]&2048)!=0:0){Z=c[o>>2]|0;if((Z|0)==(c[B>>2]|0)){fn(n,o,B);Z=c[o>>2]|0}c[o>>2]=Z+1;a[Z>>0]=Y;V=V+1|0}else{Z=a[u>>0]|0;if(!(Z&1))Z=(Z&255)>>>1;else Z=c[O>>2]|0;if(!((V|0)!=0&(Z|0)!=0&Y<<24>>24==G<<24>>24))break;if((U|0)==(c[D>>2]|0)){gn(q,E,D);U=c[E>>2]|0}aa=U+4|0;c[E>>2]=aa;c[U>>2]=V;U=aa;V=0}Z=c[e>>2]|0;_=Z+12|0;Y=c[_>>2]|0;if((Y|0)==(c[Z+16>>2]|0)){md[c[(c[Z>>2]|0)+40>>2]&127](Z)|0;Y=W;continue}else{c[_>>2]=Y+1;Y=W;continue}}if(!((V|0)==0?1:(c[q>>2]|0)==(U|0))){if((U|0)==(c[D>>2]|0)){gn(q,E,D);U=c[E>>2]|0}aa=U+4|0;c[E>>2]=aa;c[U>>2]=V;U=aa}if((T|0)>0){V=c[e>>2]|0;do if(V){if((c[V+12>>2]|0)==(c[V+16>>2]|0))if((md[c[(c[V>>2]|0)+36>>2]&127](V)|0)==-1){c[e>>2]=0;V=0;break}else{V=c[e>>2]|0;break}}else V=0;while(0);V=(V|0)==0;do if(W){if((c[W+12>>2]|0)!=(c[W+16>>2]|0))if(V)break;else{y=276;break a}if((md[c[(c[W>>2]|0)+36>>2]&127](W)|0)!=-1){if(!V){y=276;break a}}else{f=0;y=270}}else y=270;while(0);if((y|0)==270){y=0;if(V){y=276;break a}else W=0}V=c[e>>2]|0;X=c[V+12>>2]|0;if((X|0)==(c[V+16>>2]|0))V=md[c[(c[V>>2]|0)+36>>2]&127](V)|0;else V=d[X>>0]|0;if((V&255)<<24>>24!=F<<24>>24){y=276;break a}Y=c[e>>2]|0;X=Y+12|0;V=c[X>>2]|0;if((V|0)==(c[Y+16>>2]|0)){md[c[(c[Y>>2]|0)+40>>2]&127](Y)|0;X=W;V=W}else{c[X>>2]=V+1;X=W;V=W}while(1){W=c[e>>2]|0;do if(W){if((c[W+12>>2]|0)==(c[W+16>>2]|0))if((md[c[(c[W>>2]|0)+36>>2]&127](W)|0)==-1){c[e>>2]=0;W=0;break}else{W=c[e>>2]|0;break}}else W=0;while(0);Y=(W|0)==0;do if(V){if((c[V+12>>2]|0)!=(c[V+16>>2]|0))if(Y){W=X;break}else{y=298;break a}if((md[c[(c[V>>2]|0)+36>>2]&127](V)|0)!=-1)if(Y^(X|0)==0){W=X;V=X}else{y=298;break a}else{W=0;f=0;y=291}}else{W=X;y=291}while(0);if((y|0)==291){y=0;if(Y){y=298;break a}else V=0}X=c[e>>2]|0;Y=c[X+12>>2]|0;if((Y|0)==(c[X+16>>2]|0))X=md[c[(c[X>>2]|0)+36>>2]&127](X)|0;else X=d[Y>>0]|0;if((X&255)<<24>>24<=-1){y=298;break a}if(!(b[(c[L>>2]|0)+(X<<24>>24<<1)>>1]&2048)){y=298;break a}if((c[o>>2]|0)==(c[B>>2]|0))fn(n,o,B);Y=c[e>>2]|0;X=c[Y+12>>2]|0;if((X|0)==(c[Y+16>>2]|0))X=md[c[(c[Y>>2]|0)+36>>2]&127](Y)|0;else X=d[X>>0]|0;Y=c[o>>2]|0;c[o>>2]=Y+1;a[Y>>0]=X;T=T+ -1|0;X=c[e>>2]|0;Y=X+12|0;Z=c[Y>>2]|0;if((Z|0)==(c[X+16>>2]|0))md[c[(c[X>>2]|0)+40>>2]&127](X)|0;else c[Y>>2]=Z+1;if((T|0)>0)X=W;else break}}if((c[o>>2]|0)==(c[n>>2]|0)){y=309;break a}break};case 0:{y=78;break};case 1:{if((S|0)==3){y=311;break a}y=c[e>>2]|0;V=c[y+12>>2]|0;if((V|0)==(c[y+16>>2]|0))y=md[c[(c[y>>2]|0)+36>>2]&127](y)|0;else y=d[V>>0]|0;if((y&255)<<24>>24<=-1){y=77;break a}if(!(b[(c[L>>2]|0)+(y<<24>>24<<1)>>1]&8192)){y=77;break a}V=c[e>>2]|0;y=V+12|0;W=c[y>>2]|0;if((W|0)==(c[V+16>>2]|0))y=md[c[(c[V>>2]|0)+40>>2]&127](V)|0;else{c[y>>2]=W+1;y=d[W>>0]|0}Mi(s,y&255);y=78;break};default:W=f}while(0);f:do if((y|0)==78){y=0;if((S|0)==3){y=311;break a}else{W=f;X=f}while(1){V=c[e>>2]|0;do if(V){if((c[V+12>>2]|0)==(c[V+16>>2]|0))if((md[c[(c[V>>2]|0)+36>>2]&127](V)|0)==-1){c[e>>2]=0;V=0;break}else{V=c[e>>2]|0;break}}else V=0;while(0);V=(V|0)==0;do if(X){if((c[X+12>>2]|0)!=(c[X+16>>2]|0))if(V){V=W;break}else break f;if((md[c[(c[X>>2]|0)+36>>2]&127](X)|0)!=-1)if(V^(W|0)==0){V=W;X=W}else break f;else{W=0;f=0;y=90}}else y=90;while(0);if((y|0)==90){y=0;if(V)break f;else{V=W;X=0}}Y=c[e>>2]|0;W=c[Y+12>>2]|0;if((W|0)==(c[Y+16>>2]|0))W=md[c[(c[Y>>2]|0)+36>>2]&127](Y)|0;else W=d[W>>0]|0;if((W&255)<<24>>24<=-1){W=V;break f}if(!(b[(c[L>>2]|0)+(W<<24>>24<<1)>>1]&8192)){W=V;break f}W=c[e>>2]|0;Z=W+12|0;Y=c[Z>>2]|0;if((Y|0)==(c[W+16>>2]|0))W=md[c[(c[W>>2]|0)+40>>2]&127](W)|0;else{c[Z>>2]=Y+1;W=d[Y>>0]|0}Mi(s,W&255);W=V}}while(0);S=S+1|0;if(S>>>0>=4){f=W;y=311;break}}g:do if((y|0)==77){c[k>>2]=c[k>>2]|4;k=0}else if((y|0)==168){c[k>>2]=c[k>>2]|4;k=0}else if((y|0)==219){c[k>>2]=c[k>>2]|4;k=0}else if((y|0)==276){c[k>>2]=c[k>>2]|4;k=0}else if((y|0)==298){c[k>>2]=c[k>>2]|4;k=0}else if((y|0)==309){c[k>>2]=c[k>>2]|4;k=0}else if((y|0)==311){h:do if(R){B=R+1|0;C=R+8|0;D=R+4|0;n=f;E=f;l=1;i:while(1){o=a[R>>0]|0;if(!(o&1))o=(o&255)>>>1;else o=c[D>>2]|0;if(l>>>0>=o>>>0)break h;o=c[e>>2]|0;do if(o){if((c[o+12>>2]|0)==(c[o+16>>2]|0))if((md[c[(c[o>>2]|0)+36>>2]&127](o)|0)==-1){c[e>>2]=0;o=0;break}else{o=c[e>>2]|0;break}}else o=0;while(0);F=(o|0)==0;do if(E){if((c[E+12>>2]|0)!=(c[E+16>>2]|0))if(F){o=n;break}else break i;if((md[c[(c[E>>2]|0)+36>>2]&127](E)|0)!=-1)if(F^(n|0)==0){o=n;E=n}else break i;else{o=0;y=328}}else{o=n;y=328}while(0);if((y|0)==328){y=0;if(F)break;else E=0}n=c[e>>2]|0;F=c[n+12>>2]|0;if((F|0)==(c[n+16>>2]|0))n=md[c[(c[n>>2]|0)+36>>2]&127](n)|0;else n=d[F>>0]|0;if(!(a[R>>0]&1))F=B;else F=c[C>>2]|0;if((n&255)<<24>>24!=(a[F+l>>0]|0))break;l=l+1|0;G=c[e>>2]|0;F=G+12|0;n=c[F>>2]|0;if((n|0)==(c[G+16>>2]|0)){md[c[(c[G>>2]|0)+40>>2]&127](G)|0;n=o;continue}else{c[F>>2]=n+1;n=o;continue}}c[k>>2]=c[k>>2]|4;k=0;break g}while(0);e=c[q>>2]|0;if((e|0)!=(U|0)?(c[x>>2]=0,hn(u,e,U,x),(c[x>>2]|0)!=0):0){c[k>>2]=c[k>>2]|4;k=0}else k=1}while(0);if(a[s>>0]&1)Uq(c[j>>2]|0);if(a[v>>0]&1)Uq(c[m>>2]|0);if(a[t>>0]&1)Uq(c[z>>2]|0);if(a[w>>0]&1)Uq(c[A>>2]|0);if(a[u>>0]&1)Uq(c[u+8>>2]|0);s=c[q>>2]|0;c[q>>2]=0;if(!s){i=r;return k|0}jd[c[p>>2]&255](s);i=r;return k|0}function dn(a){a=a|0;var b=0,d=0,e=0;b=Wb(8)|0;c[b>>2]=27520;e=mr(a|0)|0;d=$p(e+13|0)|0;c[d>>2]=e;c[d+4>>2]=e;c[d+8>>2]=0;d=d+12|0;nr(d|0,a|0,e+1|0)|0;c[b+4>>2]=d;Zc(b|0,27720,224)}function en(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;d=i;i=i+128|0;u=d+20|0;n=d+8|0;q=d;s=d+16|0;c[n>>2]=u;l=n+4|0;c[l>>2]=243;p=c[h+28>>2]|0;r=p+4|0;c[r>>2]=(c[r>>2]|0)+1;r=Sn(p,19072)|0;a[s>>0]=0;o=c[f>>2]|0;do if(cn(e,o,g,p,c[h+4>>2]|0,j,s,r,n,q,u+100|0)|0){if(!(a[k>>0]&1)){a[k+1>>0]=0;a[k>>0]=0}else{a[c[k+8>>2]>>0]=0;c[k+4>>2]=0}if(a[s>>0]|0)Mi(k,vd[c[(c[r>>2]|0)+28>>2]&63](r,45)|0);g=vd[c[(c[r>>2]|0)+28>>2]&63](r,48)|0;r=c[n>>2]|0;q=c[q>>2]|0;h=q+ -1|0;a:do if(r>>>0<h>>>0)while(1){s=r+1|0;if((a[r>>0]|0)!=g<<24>>24)break a;if(s>>>0<h>>>0)r=s;else{r=s;break}}while(0);t=r;g=a[k>>0]|0;if(!(g&1)){s=g;u=10;g=(g&255)>>>1}else{u=c[k>>2]|0;s=u&255;u=(u&-2)+ -1|0;g=c[k+4>>2]|0}h=q-t|0;if((q|0)!=(r|0)){if((u-g|0)>>>0<h>>>0){Pi(k,u,g+h-u|0,g,g,0);s=a[k>>0]|0}if(!(s&1))s=k+1|0;else s=c[k+8>>2]|0;t=q+(g-t)|0;u=s+g|0;while(1){a[u>>0]=a[r>>0]|0;r=r+1|0;if((r|0)==(q|0))break;u=u+1|0}a[s+t>>0]=0;q=g+h|0;if(!(a[k>>0]&1)){a[k>>0]=q<<1;break}else{c[k+4>>2]=q;break}}}while(0);k=c[e>>2]|0;if(k){if((c[k+12>>2]|0)==(c[k+16>>2]|0)?(md[c[(c[k>>2]|0)+36>>2]&127](k)|0)==-1:0){c[e>>2]=0;k=0}}else k=0;e=(k|0)==0;do if(o){if((c[o+12>>2]|0)!=(c[o+16>>2]|0))if(e)break;else{m=43;break}if((md[c[(c[o>>2]|0)+36>>2]&127](o)|0)!=-1)if(e)break;else{m=43;break}else{c[f>>2]=0;m=41;break}}else m=41;while(0);if((m|0)==41?e:0)m=43;if((m|0)==43)c[j>>2]=c[j>>2]|2;c[b>>2]=k;t=p+4|0;u=c[t>>2]|0;c[t>>2]=u+ -1;if(!u)jd[c[(c[p>>2]|0)+8>>2]&255](p);b=c[n>>2]|0;c[n>>2]=0;if(!b){i=d;return}jd[c[l>>2]&255](b);i=d;return}function fn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;f=a+4|0;k=(c[f>>2]|0)!=243;j=c[a>>2]|0;g=j;h=(c[d>>2]|0)-g|0;h=h>>>0<2147483647?h<<1:-1;g=(c[b>>2]|0)-g|0;j=Vq(k?j:0,h)|0;if(!j){k=Wb(4)|0;c[k>>2]=27280;Zc(k|0,27328,220)}if(!k){k=c[a>>2]|0;c[a>>2]=j;if(k){jd[c[f>>2]&255](k);j=c[a>>2]|0}}else c[a>>2]=j;c[f>>2]=244;c[b>>2]=j+g;c[d>>2]=(c[a>>2]|0)+h;i=e;return}function gn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;g=i;h=a+4|0;j=(c[h>>2]|0)!=243;k=c[a>>2]|0;e=k;f=(c[d>>2]|0)-e|0;f=f>>>0<2147483647?f<<1:-1;e=(c[b>>2]|0)-e>>2;if(!j)k=0;k=Vq(k,f)|0;if(!k){k=Wb(4)|0;c[k>>2]=27280;Zc(k|0,27328,220)}if(!j){j=c[a>>2]|0;c[a>>2]=k;if(j){jd[c[h>>2]&255](j);k=c[a>>2]|0}}else c[a>>2]=k;c[h>>2]=244;c[b>>2]=k+(e<<2);c[d>>2]=(c[a>>2]|0)+(f>>>2<<2);i=g;return}function hn(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0;g=i;k=a[b>>0]|0;if(!(k&1))j=(k&255)>>>1;else j=c[b+4>>2]|0;if(!j){i=g;return}if((d|0)!=(e|0)?(h=e+ -4|0,h>>>0>d>>>0):0){j=d;do{k=c[j>>2]|0;c[j>>2]=c[h>>2];c[h>>2]=k;j=j+4|0;h=h+ -4|0}while(j>>>0<h>>>0);k=a[b>>0]|0}if(!(k&1)){h=b+1|0;b=(k&255)>>>1}else{h=c[b+8>>2]|0;b=c[b+4>>2]|0}e=e+ -4|0;k=a[h>>0]|0;j=k<<24>>24<1|k<<24>>24==127;a:do if(e>>>0>d>>>0){b=h+b|0;while(1){if(!j?(k<<24>>24|0)!=(c[d>>2]|0):0)break;h=(b-h|0)>1?h+1|0:h;d=d+4|0;k=a[h>>0]|0;j=k<<24>>24<1|k<<24>>24==127;if(d>>>0>=e>>>0)break a}c[f>>2]=4;i=g;return}while(0);if(j){i=g;return}j=c[e>>2]|0;if(!(k<<24>>24>>>0<j>>>0|(j|0)==0)){i=g;return}c[f>>2]=4;i=g;return}function jn(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function kn(a){a=a|0;return}function ln(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;n=i;i=i+576|0;q=n;x=n+16|0;m=n+8|0;r=n+456|0;t=n+560|0;s=n+416|0;p=n+460|0;c[m>>2]=x;d=m+4|0;c[d>>2]=243;o=c[h+28>>2]|0;u=o+4|0;c[u>>2]=(c[u>>2]|0)+1;u=Sn(o,19064)|0;a[t>>0]=0;if(mn(e,c[f>>2]|0,g,o,c[h+4>>2]|0,j,t,u,m,r,x+400|0)|0){sd[c[(c[u>>2]|0)+48>>2]&7](u,18784,18794,s)|0;u=c[r>>2]|0;g=c[m>>2]|0;h=u-g|0;if((h|0)>392){v=Tq((h>>2)+2|0)|0;if(!v){x=Wb(4)|0;c[x>>2]=27280;Zc(x|0,27328,220)}else h=v}else{h=0;v=p}if(a[t>>0]|0){a[v>>0]=45;v=v+1|0}if(g>>>0<u>>>0){t=s+40|0;u=s;do{x=c[g>>2]|0;w=s;while(1){if((c[w>>2]|0)==(x|0))break;w=w+4|0;if((w|0)==(t|0)){w=t;break}}a[v>>0]=a[18784+(w-u>>2)>>0]|0;g=g+4|0;v=v+1|0}while(g>>>0<(c[r>>2]|0)>>>0)}a[v>>0]=0;c[q>>2]=k;if((Up(p,18720,q)|0)!=1)dn(18728);Uq(h)}k=c[e>>2]|0;if(k){p=c[k+12>>2]|0;if((p|0)==(c[k+16>>2]|0))p=md[c[(c[k>>2]|0)+36>>2]&127](k)|0;else p=c[p>>2]|0;if((p|0)==-1){c[e>>2]=0;e=0;k=1}else{e=k;k=0}}else{e=0;k=1}p=c[f>>2]|0;do if(p){q=c[p+12>>2]|0;if((q|0)==(c[p+16>>2]|0))p=md[c[(c[p>>2]|0)+36>>2]&127](p)|0;else p=c[q>>2]|0;if((p|0)!=-1)if(k)break;else{l=34;break}else{c[f>>2]=0;l=32;break}}else l=32;while(0);if((l|0)==32?k:0)l=34;if((l|0)==34)c[j>>2]=c[j>>2]|2;c[b>>2]=e;w=o+4|0;x=c[w>>2]|0;c[w>>2]=x+ -1;if(!x)jd[c[(c[o>>2]|0)+8>>2]&255](o);f=c[m>>2]|0;c[m>>2]=0;if(!f){i=n;return}jd[c[d>>2]&255](f);i=n;return}function mn(b,e,f,g,h,j,k,l,m,n,o){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;p=i;i=i+592|0;L=p+76|0;I=p+112|0;G=p;z=p+176|0;y=p+64|0;F=p+24|0;K=p+28|0;J=p+124|0;H=p+148|0;A=p+164|0;C=p+188|0;P=p+192|0;q=p+80|0;E=p+88|0;D=p+104|0;B=p+108|0;s=p+92|0;r=p+40|0;t=p+136|0;u=p+12|0;v=p+52|0;w=p+160|0;c[C>>2]=o;c[q>>2]=P;o=q+4|0;c[o>>2]=243;c[E>>2]=P;c[D>>2]=P+400;c[B>>2]=0;c[s+0>>2]=0;c[s+4>>2]=0;c[s+8>>2]=0;c[r+0>>2]=0;c[r+4>>2]=0;c[r+8>>2]=0;c[t+0>>2]=0;c[t+4>>2]=0;c[t+8>>2]=0;c[u+0>>2]=0;c[u+4>>2]=0;c[u+8>>2]=0;c[v+0>>2]=0;c[v+4>>2]=0;c[v+8>>2]=0;if(f){A=Sn(g,18656)|0;kd[c[(c[A>>2]|0)+44>>2]&63](L,A);c[B>>2]=c[L>>2];kd[c[(c[A>>2]|0)+32>>2]&63](I,A);if(!(a[u>>0]&1)){c[u+4>>2]=0;a[u>>0]=0}else{c[c[u+8>>2]>>2]=0;c[u+4>>2]=0}Wi(u);c[u+0>>2]=c[I+0>>2];c[u+4>>2]=c[I+4>>2];c[u+8>>2]=c[I+8>>2];c[I+0>>2]=0;c[I+4>>2]=0;c[I+8>>2]=0;kd[c[(c[A>>2]|0)+28>>2]&63](G,A);if(!(a[t>>0]&1)){c[t+4>>2]=0;a[t>>0]=0}else{c[c[t+8>>2]>>2]=0;c[t+4>>2]=0}Wi(t);c[t+0>>2]=c[G+0>>2];c[t+4>>2]=c[G+4>>2];c[t+8>>2]=c[G+8>>2];c[G+0>>2]=0;c[G+4>>2]=0;c[G+8>>2]=0;F=md[c[(c[A>>2]|0)+12>>2]&127](A)|0;G=md[c[(c[A>>2]|0)+16>>2]&127](A)|0;kd[c[(c[A>>2]|0)+20>>2]&63](z,A);if(!(a[s>>0]&1)){a[s+1>>0]=0;a[s>>0]=0}else{a[c[s+8>>2]>>0]=0;c[s+4>>2]=0}Li(s);c[s+0>>2]=c[z+0>>2];c[s+4>>2]=c[z+4>>2];c[s+8>>2]=c[z+8>>2];c[z+0>>2]=0;c[z+4>>2]=0;c[z+8>>2]=0;kd[c[(c[A>>2]|0)+24>>2]&63](y,A);if(!(a[r>>0]&1)){c[r+4>>2]=0;a[r>>0]=0}else{c[c[r+8>>2]>>2]=0;c[r+4>>2]=0}Wi(r);c[r+0>>2]=c[y+0>>2];c[r+4>>2]=c[y+4>>2];c[r+8>>2]=c[y+8>>2];c[y+0>>2]=0;c[y+4>>2]=0;c[y+8>>2]=0;O=md[c[(c[A>>2]|0)+36>>2]&127](A)|0}else{y=Sn(g,18592)|0;kd[c[(c[y>>2]|0)+44>>2]&63](F,y);c[B>>2]=c[F>>2];kd[c[(c[y>>2]|0)+32>>2]&63](K,y);if(!(a[u>>0]&1)){c[u+4>>2]=0;a[u>>0]=0}else{c[c[u+8>>2]>>2]=0;c[u+4>>2]=0}Wi(u);c[u+0>>2]=c[K+0>>2];c[u+4>>2]=c[K+4>>2];c[u+8>>2]=c[K+8>>2];c[K+0>>2]=0;c[K+4>>2]=0;c[K+8>>2]=0;kd[c[(c[y>>2]|0)+28>>2]&63](J,y);if(!(a[t>>0]&1)){c[t+4>>2]=0;a[t>>0]=0}else{c[c[t+8>>2]>>2]=0;c[t+4>>2]=0}Wi(t);c[t+0>>2]=c[J+0>>2];c[t+4>>2]=c[J+4>>2];c[t+8>>2]=c[J+8>>2];c[J+0>>2]=0;c[J+4>>2]=0;c[J+8>>2]=0;F=md[c[(c[y>>2]|0)+12>>2]&127](y)|0;G=md[c[(c[y>>2]|0)+16>>2]&127](y)|0;kd[c[(c[y>>2]|0)+20>>2]&63](H,y);if(!(a[s>>0]&1)){a[s+1>>0]=0;a[s>>0]=0}else{a[c[s+8>>2]>>0]=0;c[s+4>>2]=0}Li(s);c[s+0>>2]=c[H+0>>2];c[s+4>>2]=c[H+4>>2];c[s+8>>2]=c[H+8>>2];c[H+0>>2]=0;c[H+4>>2]=0;c[H+8>>2]=0;kd[c[(c[y>>2]|0)+24>>2]&63](A,y);if(!(a[r>>0]&1)){c[r+4>>2]=0;a[r>>0]=0}else{c[c[r+8>>2]>>2]=0;c[r+4>>2]=0}Wi(r);c[r+0>>2]=c[A+0>>2];c[r+4>>2]=c[A+4>>2];c[r+8>>2]=c[A+8>>2];c[A+0>>2]=0;c[A+4>>2]=0;c[A+8>>2]=0;O=md[c[(c[y>>2]|0)+36>>2]&127](y)|0}c[n>>2]=c[m>>2];H=u+4|0;z=u+8|0;I=t+4|0;y=t+8|0;L=(h&512|0)!=0;f=r+4|0;A=r+8|0;K=v+4|0;h=v+8|0;J=B+3|0;g=s+4|0;N=0;M=0;a:while(1){R=c[b>>2]|0;do if(R){Q=c[R+12>>2]|0;if((Q|0)==(c[R+16>>2]|0))Q=md[c[(c[R>>2]|0)+36>>2]&127](R)|0;else Q=c[Q>>2]|0;if((Q|0)==-1){c[b>>2]=0;Q=1;break}else{Q=(c[b>>2]|0)==0;break}}else Q=1;while(0);if(e){R=c[e+12>>2]|0;if((R|0)==(c[e+16>>2]|0))R=md[c[(c[e>>2]|0)+36>>2]&127](e)|0;else R=c[R>>2]|0;if((R|0)!=-1){if(!Q){x=322;break}}else x=65}else x=65;if((x|0)==65){x=0;if(Q){e=0;x=322;break}else e=0}b:do switch(a[B+N>>0]|0){case 2:{if(!((M|0)!=0|N>>>0<2)){if((N|0)==2)Q=(a[J>>0]|0)!=0;else Q=0;if(!(L|Q)){R=e;M=0;break b}}T=a[r>>0]|0;Q=(T&1)==0?f:c[A>>2]|0;c:do if((N|0)!=0?(d[B+(N+ -1)>>0]|0)<2:0){while(1){if(!(T&1)){R=f;S=(T&255)>>>1}else{R=c[A>>2]|0;S=c[f>>2]|0}if((Q|0)==(R+(S<<2)|0))break;if(!(fd[c[(c[l>>2]|0)+12>>2]&31](l,8192,c[Q>>2]|0)|0)){x=184;break}T=a[r>>0]|0;Q=Q+4|0}if((x|0)==184){x=0;T=a[r>>0]|0}S=(T&1)==0?f:c[A>>2]|0;R=Q-S>>2;U=a[v>>0]|0;V=(U&1)==0;if(V)W=(U&255)>>>1;else W=c[K>>2]|0;if(R>>>0<=W>>>0){if(V){U=(U&255)>>>1;W=K;V=U;U=K+(U-R<<2)|0}else{X=c[h>>2]|0;U=c[K>>2]|0;W=X;V=U;U=X+(U-R<<2)|0}R=W+(V<<2)|0;if((U|0)==(R|0)){R=e;S=e}else{V=U;U=S;while(1){if((c[V>>2]|0)!=(c[U>>2]|0)){R=e;Q=S;S=e;break c}V=V+4|0;if((V|0)==(R|0)){R=e;S=e;break c}U=U+4|0}}}else{R=e;Q=S;S=e}}else{R=e;S=e}while(0);while(1){if(!(T&1)){U=f;T=(T&255)>>>1}else{U=c[A>>2]|0;T=c[f>>2]|0}if((Q|0)==(U+(T<<2)|0))break;T=c[b>>2]|0;do if(T){U=c[T+12>>2]|0;if((U|0)==(c[T+16>>2]|0))T=md[c[(c[T>>2]|0)+36>>2]&127](T)|0;else T=c[U>>2]|0;if((T|0)==-1){c[b>>2]=0;T=1;break}else{T=(c[b>>2]|0)==0;break}}else T=1;while(0);if(S){U=c[S+12>>2]|0;if((U|0)==(c[S+16>>2]|0))S=md[c[(c[S>>2]|0)+36>>2]&127](S)|0;else S=c[U>>2]|0;if((S|0)!=-1)if(T^(R|0)==0){T=R;S=R}else break;else{R=0;e=0;x=212}}else x=212;if((x|0)==212){x=0;if(T)break;else{T=R;S=0}}R=c[b>>2]|0;U=c[R+12>>2]|0;if((U|0)==(c[R+16>>2]|0))R=md[c[(c[R>>2]|0)+36>>2]&127](R)|0;else R=c[U>>2]|0;if((R|0)!=(c[Q>>2]|0)){R=T;break}V=c[b>>2]|0;U=V+12|0;R=c[U>>2]|0;if((R|0)==(c[V+16>>2]|0))md[c[(c[V>>2]|0)+40>>2]&127](V)|0;else c[U>>2]=R+4;R=T;T=a[r>>0]|0;Q=Q+4|0}if(L){T=a[r>>0]|0;if(!(T&1)){S=f;T=(T&255)>>>1}else{S=c[A>>2]|0;T=c[f>>2]|0}if((Q|0)!=(S+(T<<2)|0)){x=227;break a}}break};case 4:{R=e;T=e;Q=0;while(1){U=c[b>>2]|0;do if(U){S=c[U+12>>2]|0;if((S|0)==(c[U+16>>2]|0))S=md[c[(c[U>>2]|0)+36>>2]&127](U)|0;else S=c[S>>2]|0;if((S|0)==-1){c[b>>2]=0;S=1;break}else{S=(c[b>>2]|0)==0;break}}else S=1;while(0);if(T){U=c[T+12>>2]|0;if((U|0)==(c[T+16>>2]|0))T=md[c[(c[T>>2]|0)+36>>2]&127](T)|0;else T=c[U>>2]|0;if((T|0)!=-1)if(S^(R|0)==0){S=R;T=R}else break;else{R=0;e=0;x=240}}else x=240;if((x|0)==240){x=0;if(S)break;else{S=R;T=0}}R=c[b>>2]|0;U=c[R+12>>2]|0;if((U|0)==(c[R+16>>2]|0))R=md[c[(c[R>>2]|0)+36>>2]&127](R)|0;else R=c[U>>2]|0;if(fd[c[(c[l>>2]|0)+12>>2]&31](l,2048,R)|0){U=c[n>>2]|0;if((U|0)==(c[C>>2]|0)){on(m,n,C);U=c[n>>2]|0}c[n>>2]=U+4;c[U>>2]=R;Q=Q+1|0}else{U=a[s>>0]|0;if(!(U&1))U=(U&255)>>>1;else U=c[g>>2]|0;if(!((Q|0)!=0&(U|0)!=0&(R|0)==(G|0))){R=S;break}if((P|0)==(c[D>>2]|0)){gn(q,E,D);P=c[E>>2]|0}X=P+4|0;c[E>>2]=X;c[P>>2]=Q;P=X;Q=0}R=c[b>>2]|0;U=R+12|0;V=c[U>>2]|0;if((V|0)==(c[R+16>>2]|0)){md[c[(c[R>>2]|0)+40>>2]&127](R)|0;R=S;continue}else{c[U>>2]=V+4;R=S;continue}}if(!((Q|0)==0?1:(c[q>>2]|0)==(P|0))){if((P|0)==(c[D>>2]|0)){gn(q,E,D);P=c[E>>2]|0}X=P+4|0;c[E>>2]=X;c[P>>2]=Q;P=X}if((O|0)>0){S=c[b>>2]|0;do if(S){Q=c[S+12>>2]|0;if((Q|0)==(c[S+16>>2]|0))Q=md[c[(c[S>>2]|0)+36>>2]&127](S)|0;else Q=c[Q>>2]|0;if((Q|0)==-1){c[b>>2]=0;Q=1;break}else{Q=(c[b>>2]|0)==0;break}}else Q=1;while(0);if(R){S=c[R+12>>2]|0;if((S|0)==(c[R+16>>2]|0))S=md[c[(c[R>>2]|0)+36>>2]&127](R)|0;else S=c[S>>2]|0;if((S|0)!=-1){if(!Q){x=286;break a}}else{e=0;x=280}}else x=280;if((x|0)==280){x=0;if(Q){x=286;break a}else R=0}S=c[b>>2]|0;Q=c[S+12>>2]|0;if((Q|0)==(c[S+16>>2]|0))Q=md[c[(c[S>>2]|0)+36>>2]&127](S)|0;else Q=c[Q>>2]|0;if((Q|0)!=(F|0)){x=286;break a}T=c[b>>2]|0;S=T+12|0;Q=c[S>>2]|0;if((Q|0)==(c[T+16>>2]|0)){md[c[(c[T>>2]|0)+40>>2]&127](T)|0;Q=R;S=R}else{c[S>>2]=Q+4;Q=R;S=R}while(1){R=c[b>>2]|0;do if(R){T=c[R+12>>2]|0;if((T|0)==(c[R+16>>2]|0))R=md[c[(c[R>>2]|0)+36>>2]&127](R)|0;else R=c[T>>2]|0;if((R|0)==-1){c[b>>2]=0;T=1;break}else{T=(c[b>>2]|0)==0;break}}else T=1;while(0);if(S){R=c[S+12>>2]|0;if((R|0)==(c[S+16>>2]|0))R=md[c[(c[S>>2]|0)+36>>2]&127](S)|0;else R=c[R>>2]|0;if((R|0)!=-1)if(T^(Q|0)==0){R=Q;S=Q}else{x=309;break a}else{R=0;e=0;x=302}}else{R=Q;x=302}if((x|0)==302){x=0;if(T){x=309;break a}else S=0}Q=c[b>>2]|0;T=c[Q+12>>2]|0;if((T|0)==(c[Q+16>>2]|0))Q=md[c[(c[Q>>2]|0)+36>>2]&127](Q)|0;else Q=c[T>>2]|0;if(!(fd[c[(c[l>>2]|0)+12>>2]&31](l,2048,Q)|0)){x=309;break a}if((c[n>>2]|0)==(c[C>>2]|0))on(m,n,C);Q=c[b>>2]|0;T=c[Q+12>>2]|0;if((T|0)==(c[Q+16>>2]|0))Q=md[c[(c[Q>>2]|0)+36>>2]&127](Q)|0;else Q=c[T>>2]|0;U=c[n>>2]|0;c[n>>2]=U+4;c[U>>2]=Q;O=O+ -1|0;Q=c[b>>2]|0;U=Q+12|0;T=c[U>>2]|0;if((T|0)==(c[Q+16>>2]|0))md[c[(c[Q>>2]|0)+40>>2]&127](Q)|0;else c[U>>2]=T+4;if((O|0)>0)Q=R;else break}}if((c[n>>2]|0)==(c[m>>2]|0)){x=320;break a}break};case 0:{x=79;break};case 1:{if((N|0)==3){x=322;break a}x=c[b>>2]|0;Q=c[x+12>>2]|0;if((Q|0)==(c[x+16>>2]|0))x=md[c[(c[x>>2]|0)+36>>2]&127](x)|0;else x=c[Q>>2]|0;if(!(fd[c[(c[l>>2]|0)+12>>2]&31](l,8192,x)|0)){x=78;break a}x=c[b>>2]|0;R=x+12|0;Q=c[R>>2]|0;if((Q|0)==(c[x+16>>2]|0))x=md[c[(c[x>>2]|0)+40>>2]&127](x)|0;else{c[R>>2]=Q+4;x=c[Q>>2]|0}Xi(v,x);x=79;break};case 3:{Q=a[t>>0]|0;S=(Q&1)==0;if(S)U=(Q&255)>>>1;else U=c[I>>2]|0;R=a[u>>0]|0;T=(R&1)==0;if(T)V=(R&255)>>>1;else V=c[H>>2]|0;if((U|0)==(0-V|0))R=e;else{if(S)U=(Q&255)>>>1;else U=c[I>>2]|0;if(U){if(T)T=(R&255)>>>1;else T=c[H>>2]|0;if(T){S=c[b>>2]|0;T=c[S+12>>2]|0;U=c[S+16>>2]|0;if((T|0)==(U|0)){R=md[c[(c[S>>2]|0)+36>>2]&127](S)|0;U=c[b>>2]|0;Q=a[t>>0]|0;S=U;T=c[U+12>>2]|0;U=c[U+16>>2]|0}else R=c[T>>2]|0;V=S+12|0;U=(T|0)==(U|0);if((R|0)==(c[((Q&1)==0?I:c[y>>2]|0)>>2]|0)){if(U)md[c[(c[S>>2]|0)+40>>2]&127](S)|0;else c[V>>2]=T+4;Q=a[t>>0]|0;if(!(Q&1))Q=(Q&255)>>>1;else Q=c[I>>2]|0;R=e;M=Q>>>0>1?t:M;break b}if(U)Q=md[c[(c[S>>2]|0)+36>>2]&127](S)|0;else Q=c[T>>2]|0;if((Q|0)!=(c[((a[u>>0]&1)==0?H:c[z>>2]|0)>>2]|0)){x=170;break a}Q=c[b>>2]|0;R=Q+12|0;S=c[R>>2]|0;if((S|0)==(c[Q+16>>2]|0))md[c[(c[Q>>2]|0)+40>>2]&127](Q)|0;else c[R>>2]=S+4;a[k>>0]=1;Q=a[u>>0]|0;if(!(Q&1))Q=(Q&255)>>>1;else Q=c[H>>2]|0;R=e;M=Q>>>0>1?u:M;break b}}if(S)V=(Q&255)>>>1;else V=c[I>>2]|0;T=c[b>>2]|0;S=c[T+12>>2]|0;U=(S|0)==(c[T+16>>2]|0);if(!V){if(U){Q=md[c[(c[T>>2]|0)+36>>2]&127](T)|0;R=a[u>>0]|0}else Q=c[S>>2]|0;if((Q|0)!=(c[((R&1)==0?H:c[z>>2]|0)>>2]|0)){R=e;break b}Q=c[b>>2]|0;R=Q+12|0;S=c[R>>2]|0;if((S|0)==(c[Q+16>>2]|0))md[c[(c[Q>>2]|0)+40>>2]&127](Q)|0;else c[R>>2]=S+4;a[k>>0]=1;Q=a[u>>0]|0;if(!(Q&1))Q=(Q&255)>>>1;else Q=c[H>>2]|0;R=e;M=Q>>>0>1?u:M;break b}if(U){R=md[c[(c[T>>2]|0)+36>>2]&127](T)|0;Q=a[t>>0]|0}else R=c[S>>2]|0;if((R|0)!=(c[((Q&1)==0?I:c[y>>2]|0)>>2]|0)){a[k>>0]=1;R=e;break b}S=c[b>>2]|0;R=S+12|0;Q=c[R>>2]|0;if((Q|0)==(c[S+16>>2]|0))md[c[(c[S>>2]|0)+40>>2]&127](S)|0;else c[R>>2]=Q+4;Q=a[t>>0]|0;if(!(Q&1))Q=(Q&255)>>>1;else Q=c[I>>2]|0;R=e;M=Q>>>0>1?t:M}break};default:R=e}while(0);d:do if((x|0)==79){x=0;if((N|0)==3){x=322;break a}else{R=e;S=e}while(1){T=c[b>>2]|0;do if(T){Q=c[T+12>>2]|0;if((Q|0)==(c[T+16>>2]|0))Q=md[c[(c[T>>2]|0)+36>>2]&127](T)|0;else Q=c[Q>>2]|0;if((Q|0)==-1){c[b>>2]=0;Q=1;break}else{Q=(c[b>>2]|0)==0;break}}else Q=1;while(0);if(S){T=c[S+12>>2]|0;if((T|0)==(c[S+16>>2]|0))S=md[c[(c[S>>2]|0)+36>>2]&127](S)|0;else S=c[T>>2]|0;if((S|0)!=-1)if(Q^(R|0)==0){Q=R;S=R}else break d;else{R=0;e=0;x=92}}else x=92;if((x|0)==92){x=0;if(Q)break d;else{Q=R;S=0}}R=c[b>>2]|0;T=c[R+12>>2]|0;if((T|0)==(c[R+16>>2]|0))R=md[c[(c[R>>2]|0)+36>>2]&127](R)|0;else R=c[T>>2]|0;if(!(fd[c[(c[l>>2]|0)+12>>2]&31](l,8192,R)|0)){R=Q;break d}T=c[b>>2]|0;U=T+12|0;R=c[U>>2]|0;if((R|0)==(c[T+16>>2]|0))R=md[c[(c[T>>2]|0)+40>>2]&127](T)|0;else{c[U>>2]=R+4;R=c[R>>2]|0}Xi(v,R);R=Q}}while(0);N=N+1|0;if(N>>>0>=4){e=R;x=322;break}}e:do if((x|0)==78){c[j>>2]=c[j>>2]|4;w=0}else if((x|0)==170){c[j>>2]=c[j>>2]|4;w=0}else if((x|0)==227){c[j>>2]=c[j>>2]|4;w=0}else if((x|0)==286){c[j>>2]=c[j>>2]|4;w=0}else if((x|0)==309){c[j>>2]=c[j>>2]|4;w=0}else if((x|0)==320){c[j>>2]=c[j>>2]|4;w=0}else if((x|0)==322){f:do if(M){l=M+4|0;B=M+8|0;n=e;m=e;C=1;while(1){k=a[M>>0]|0;if(!(k&1))k=(k&255)>>>1;else k=c[l>>2]|0;if(C>>>0>=k>>>0)break f;k=c[b>>2]|0;do if(k){D=c[k+12>>2]|0;if((D|0)==(c[k+16>>2]|0))k=md[c[(c[k>>2]|0)+36>>2]&127](k)|0;else k=c[D>>2]|0;if((k|0)==-1){c[b>>2]=0;k=1;break}else{k=(c[b>>2]|0)==0;break}}else k=1;while(0);if(m){D=c[m+12>>2]|0;if((D|0)==(c[m+16>>2]|0))m=md[c[(c[m>>2]|0)+36>>2]&127](m)|0;else m=c[D>>2]|0;if((m|0)!=-1)if(k^(n|0)==0){k=n;m=n}else break;else{n=0;x=340}}else x=340;if((x|0)==340){x=0;if(k)break;else{k=n;m=0}}n=c[b>>2]|0;D=c[n+12>>2]|0;if((D|0)==(c[n+16>>2]|0))D=md[c[(c[n>>2]|0)+36>>2]&127](n)|0;else D=c[D>>2]|0;if(!(a[M>>0]&1))n=l;else n=c[B>>2]|0;if((D|0)!=(c[n+(C<<2)>>2]|0))break;C=C+1|0;E=c[b>>2]|0;n=E+12|0;D=c[n>>2]|0;if((D|0)==(c[E+16>>2]|0)){md[c[(c[E>>2]|0)+40>>2]&127](E)|0;n=k;continue}else{c[n>>2]=D+4;n=k;continue}}c[j>>2]=c[j>>2]|4;w=0;break e}while(0);b=c[q>>2]|0;if((b|0)!=(P|0)?(c[w>>2]=0,hn(s,b,P,w),(c[w>>2]|0)!=0):0){c[j>>2]=c[j>>2]|4;w=0}else w=1}while(0);if(a[v>>0]&1)Uq(c[h>>2]|0);if(a[u>>0]&1)Uq(c[z>>2]|0);if(a[t>>0]&1)Uq(c[y>>2]|0);if(a[r>>0]&1)Uq(c[A>>2]|0);if(a[s>>0]&1)Uq(c[s+8>>2]|0);r=c[q>>2]|0;c[q>>2]=0;if(!r){i=p;return w|0}jd[c[o>>2]&255](r);i=p;return w|0}function nn(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;d=i;i=i+432|0;v=d+16|0;n=d+8|0;q=d;s=d+416|0;c[n>>2]=v;m=n+4|0;c[m>>2]=243;o=c[h+28>>2]|0;r=o+4|0;c[r>>2]=(c[r>>2]|0)+1;r=Sn(o,19064)|0;a[s>>0]=0;p=c[f>>2]|0;do if(mn(e,p,g,o,c[h+4>>2]|0,j,s,r,n,q,v+400|0)|0){if(!(a[k>>0]&1)){c[k+4>>2]=0;a[k>>0]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}if(a[s>>0]|0)Xi(k,vd[c[(c[r>>2]|0)+44>>2]&63](r,45)|0);h=vd[c[(c[r>>2]|0)+44>>2]&63](r,48)|0;s=c[n>>2]|0;q=c[q>>2]|0;r=q+ -4|0;a:do if(s>>>0<r>>>0)while(1){g=s+4|0;if((c[s>>2]|0)!=(h|0))break a;if(g>>>0<r>>>0)s=g;else{s=g;break}}while(0);t=s;h=a[k>>0]|0;if(!(h&1)){u=h;v=1;h=(h&255)>>>1}else{v=c[k>>2]|0;u=v&255;v=(v&-2)+ -1|0;h=c[k+4>>2]|0}g=q-t>>2;if(g){if((v-h|0)>>>0<g>>>0){Yi(k,v,h+g-v|0,h,h,0,0);u=a[k>>0]|0}if(!(u&1))u=k+4|0;else u=c[k+8>>2]|0;v=u+(h<<2)|0;if((s|0)!=(q|0)){r=h+((r+(0-t)|0)>>>2)+1|0;while(1){c[v>>2]=c[s>>2];s=s+4|0;if((s|0)==(q|0))break;v=v+4|0}v=u+(r<<2)|0}c[v>>2]=0;q=h+g|0;if(!(a[k>>0]&1)){a[k>>0]=q<<1;break}else{c[k+4>>2]=q;break}}}while(0);k=c[e>>2]|0;if(k){q=c[k+12>>2]|0;if((q|0)==(c[k+16>>2]|0))q=md[c[(c[k>>2]|0)+36>>2]&127](k)|0;else q=c[q>>2]|0;if((q|0)==-1){c[e>>2]=0;k=0;e=1}else e=0}else{k=0;e=1}do if(p){q=c[p+12>>2]|0;if((q|0)==(c[p+16>>2]|0))p=md[c[(c[p>>2]|0)+36>>2]&127](p)|0;else p=c[q>>2]|0;if((p|0)!=-1)if(e)break;else{l=46;break}else{c[f>>2]=0;l=44;break}}else l=44;while(0);if((l|0)==44?e:0)l=46;if((l|0)==46)c[j>>2]=c[j>>2]|2;c[b>>2]=k;u=o+4|0;v=c[u>>2]|0;c[u>>2]=v+ -1;if(!v)jd[c[(c[o>>2]|0)+8>>2]&255](o);j=c[n>>2]|0;c[n>>2]=0;if(!j){i=d;return}jd[c[m>>2]&255](j);i=d;return}function on(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;g=i;h=a+4|0;j=(c[h>>2]|0)!=243;k=c[a>>2]|0;e=k;f=(c[d>>2]|0)-e|0;f=f>>>0<2147483647?f<<1:-1;e=(c[b>>2]|0)-e>>2;if(!j)k=0;k=Vq(k,f)|0;if(!k){k=Wb(4)|0;c[k>>2]=27280;Zc(k|0,27328,220)}if(!j){j=c[a>>2]|0;c[a>>2]=k;if(j){jd[c[h>>2]&255](j);k=c[a>>2]|0}}else c[a>>2]=k;c[h>>2]=244;c[b>>2]=k+(e<<2);c[d>>2]=(c[a>>2]|0)+(f>>>2<<2);i=g;return}function pn(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function qn(a){a=a|0;return}function rn(b,d,e,f,g,j,l){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=j|0;l=+l;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;p=i;i=i+368|0;v=p;A=p+156|0;B=p+132|0;x=p+256|0;t=p+148|0;s=p+356|0;d=p+357|0;q=p+136|0;m=p+104|0;n=p+116|0;C=p+100|0;r=p+128|0;o=p+152|0;c[B>>2]=A;h[k>>3]=l;c[v>>2]=c[k>>2];c[v+4>>2]=c[k+4>>2];A=dr(A,100,18840,v)|0;if(A>>>0>99){A=Dk()|0;h[k>>3]=l;c[v>>2]=c[k>>2];c[v+4>>2]=c[k+4>>2];A=jl(B,A,18840,v)|0;w=c[B>>2]|0;if(!w){D=Wb(4)|0;c[D>>2]=27280;Zc(D|0,27328,220)}x=Tq(A)|0;if(!x){D=Wb(4)|0;c[D>>2]=27280;Zc(D|0,27328,220)}else u=x}else{u=0;w=0}y=c[g+28>>2]|0;z=y+4|0;c[z>>2]=(c[z>>2]|0)+1;z=Sn(y,19072)|0;B=c[B>>2]|0;sd[c[(c[z>>2]|0)+32>>2]&7](z,B,B+A|0,x)|0;if(!A)B=0;else B=(a[B>>0]|0)==45;c[t>>2]=0;c[q+0>>2]=0;c[q+4>>2]=0;c[q+8>>2]=0;c[m+0>>2]=0;c[m+4>>2]=0;c[m+8>>2]=0;c[n+0>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;sn(f,B,y,t,s,d,q,m,n,C);f=c[C>>2]|0;if((A|0)>(f|0)){C=a[n>>0]|0;if(!(C&1))C=(C&255)>>>1;else C=c[n+4>>2]|0;D=a[m>>0]|0;if(!(D&1))D=(D&255)>>>1;else D=c[m+4>>2]|0;C=C+(A-f<<1|1)+D|0}else{C=a[n>>0]|0;if(!(C&1))C=(C&255)>>>1;else C=c[n+4>>2]|0;D=a[m>>0]|0;if(!(D&1))D=(D&255)>>>1;else D=c[m+4>>2]|0;C=C+2+D|0}C=C+f|0;if(C>>>0>100){v=Tq(C)|0;if(!v){D=Wb(4)|0;c[D>>2]=27280;Zc(D|0,27328,220)}else C=v}else C=0;tn(v,r,o,c[g+4>>2]|0,x,x+A|0,z,B,t,a[s>>0]|0,a[d>>0]|0,q,m,n,f);Sg(b,c[e>>2]|0,v,c[r>>2]|0,c[o>>2]|0,g,j);Uq(C);if(a[n>>0]&1)Uq(c[n+8>>2]|0);if(a[m>>0]&1)Uq(c[m+8>>2]|0);if(a[q>>0]&1)Uq(c[q+8>>2]|0);C=y+4|0;D=c[C>>2]|0;c[C>>2]=D+ -1;if(D){Uq(u);Uq(w);i=p;return}jd[c[(c[y>>2]|0)+8>>2]&255](y);Uq(u);Uq(w);i=p;return}function sn(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;n=i;i=i+112|0;w=n;v=n+16|0;y=n+92|0;x=n+40|0;u=n+80|0;s=n+96|0;q=n+108|0;p=n+56|0;t=n+52|0;r=n+28|0;o=n+4|0;z=n+68|0;if(b){o=Sn(e,18528)|0;p=c[o>>2]|0;if(d){kd[c[p+44>>2]&63](w,o);b=c[w>>2]|0;a[f>>0]=b;a[f+1>>0]=b>>8;a[f+2>>0]=b>>16;a[f+3>>0]=b>>24;kd[c[(c[o>>2]|0)+32>>2]&63](v,o);if(!(a[l>>0]&1)){a[l+1>>0]=0;a[l>>0]=0}else{a[c[l+8>>2]>>0]=0;c[l+4>>2]=0}Li(l);c[l+0>>2]=c[v+0>>2];c[l+4>>2]=c[v+4>>2];c[l+8>>2]=c[v+8>>2];c[v+0>>2]=0;c[v+4>>2]=0;c[v+8>>2]=0}else{kd[c[p+40>>2]&63](y,o);b=c[y>>2]|0;a[f>>0]=b;a[f+1>>0]=b>>8;a[f+2>>0]=b>>16;a[f+3>>0]=b>>24;kd[c[(c[o>>2]|0)+28>>2]&63](x,o);if(!(a[l>>0]&1)){a[l+1>>0]=0;a[l>>0]=0}else{a[c[l+8>>2]>>0]=0;c[l+4>>2]=0}Li(l);c[l+0>>2]=c[x+0>>2];c[l+4>>2]=c[x+4>>2];c[l+8>>2]=c[x+8>>2];c[x+0>>2]=0;c[x+4>>2]=0;c[x+8>>2]=0}a[g>>0]=md[c[(c[o>>2]|0)+12>>2]&127](o)|0;a[h>>0]=md[c[(c[o>>2]|0)+16>>2]&127](o)|0;kd[c[(c[o>>2]|0)+20>>2]&63](u,o);if(!(a[j>>0]&1)){a[j+1>>0]=0;a[j>>0]=0}else{a[c[j+8>>2]>>0]=0;c[j+4>>2]=0}Li(j);c[j+0>>2]=c[u+0>>2];c[j+4>>2]=c[u+4>>2];c[j+8>>2]=c[u+8>>2];c[u+0>>2]=0;c[u+4>>2]=0;c[u+8>>2]=0;kd[c[(c[o>>2]|0)+24>>2]&63](s,o);if(!(a[k>>0]&1)){a[k+1>>0]=0;a[k>>0]=0}else{a[c[k+8>>2]>>0]=0;c[k+4>>2]=0}Li(k);c[k+0>>2]=c[s+0>>2];c[k+4>>2]=c[s+4>>2];c[k+8>>2]=c[s+8>>2];c[s+0>>2]=0;c[s+4>>2]=0;c[s+8>>2]=0;b=md[c[(c[o>>2]|0)+36>>2]&127](o)|0;c[m>>2]=b;i=n;return}else{s=Sn(e,18464)|0;u=c[s>>2]|0;if(d){kd[c[u+44>>2]&63](q,s);b=c[q>>2]|0;a[f>>0]=b;a[f+1>>0]=b>>8;a[f+2>>0]=b>>16;a[f+3>>0]=b>>24;kd[c[(c[s>>2]|0)+32>>2]&63](p,s);if(!(a[l>>0]&1)){a[l+1>>0]=0;a[l>>0]=0}else{a[c[l+8>>2]>>0]=0;c[l+4>>2]=0}Li(l);c[l+0>>2]=c[p+0>>2];c[l+4>>2]=c[p+4>>2];c[l+8>>2]=c[p+8>>2];c[p+0>>2]=0;c[p+4>>2]=0;c[p+8>>2]=0}else{kd[c[u+40>>2]&63](t,s);b=c[t>>2]|0;a[f>>0]=b;a[f+1>>0]=b>>8;a[f+2>>0]=b>>16;a[f+3>>0]=b>>24;kd[c[(c[s>>2]|0)+28>>2]&63](r,s);if(!(a[l>>0]&1)){a[l+1>>0]=0;a[l>>0]=0}else{a[c[l+8>>2]>>0]=0;c[l+4>>2]=0}Li(l);c[l+0>>2]=c[r+0>>2];c[l+4>>2]=c[r+4>>2];c[l+8>>2]=c[r+8>>2];c[r+0>>2]=0;c[r+4>>2]=0;c[r+8>>2]=0}a[g>>0]=md[c[(c[s>>2]|0)+12>>2]&127](s)|0;a[h>>0]=md[c[(c[s>>2]|0)+16>>2]&127](s)|0;kd[c[(c[s>>2]|0)+20>>2]&63](o,s);if(!(a[j>>0]&1)){a[j+1>>0]=0;a[j>>0]=0}else{a[c[j+8>>2]>>0]=0;c[j+4>>2]=0}Li(j);c[j+0>>2]=c[o+0>>2];c[j+4>>2]=c[o+4>>2];c[j+8>>2]=c[o+8>>2];c[o+0>>2]=0;c[o+4>>2]=0;c[o+8>>2]=0;kd[c[(c[s>>2]|0)+24>>2]&63](z,s);if(!(a[k>>0]&1)){a[k+1>>0]=0;a[k>>0]=0}else{a[c[k+8>>2]>>0]=0;c[k+4>>2]=0}Li(k);c[k+0>>2]=c[z+0>>2];c[k+4>>2]=c[z+4>>2];c[k+8>>2]=c[z+8>>2];c[z+0>>2]=0;c[z+4>>2]=0;c[z+8>>2]=0;b=md[c[(c[s>>2]|0)+36>>2]&127](s)|0;c[m>>2]=b;i=n;return}}function tn(d,e,f,g,h,j,k,l,m,n,o,p,q,r,s){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;q=q|0;r=r|0;s=s|0;var t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0;t=i;c[f>>2]=d;v=r+1|0;w=r+8|0;u=r+4|0;A=(g&512|0)==0;x=q+1|0;y=q+8|0;z=q+4|0;B=(s|0)>0;C=p+1|0;E=p+8|0;H=p+4|0;D=k+8|0;I=0-s|0;J=0;do{switch(a[m+J>>0]|0){case 4:{K=c[f>>2]|0;h=l?h+1|0:h;a:do if(h>>>0<j>>>0){L=h;while(1){M=a[L>>0]|0;if(M<<24>>24<=-1)break a;N=L+1|0;if(!(b[(c[D>>2]|0)+(M<<24>>24<<1)>>1]&2048))break a;if(N>>>0<j>>>0)L=N;else{L=N;break}}}else L=h;while(0);M=L;if(B){if(L>>>0>h>>>0){N=h+(0-M)|0;N=N>>>0<I>>>0?I:N;M=N+s|0;Q=K;P=L;O=s;while(1){P=P+ -1|0;R=a[P>>0]|0;c[f>>2]=Q+1;a[Q>>0]=R;O=O+ -1|0;Q=(O|0)>0;if(!(P>>>0>h>>>0&Q))break;Q=c[f>>2]|0}L=L+N|0;if(Q)F=32;else N=0}else{M=s;F=32}if((F|0)==32){F=0;N=vd[c[(c[k>>2]|0)+28>>2]&63](k,48)|0}O=c[f>>2]|0;c[f>>2]=O+1;if((M|0)>0)do{a[O>>0]=N;M=M+ -1|0;O=c[f>>2]|0;c[f>>2]=O+1}while((M|0)>0);a[O>>0]=n}if((L|0)==(h|0)){Q=vd[c[(c[k>>2]|0)+28>>2]&63](k,48)|0;R=c[f>>2]|0;c[f>>2]=R+1;a[R>>0]=Q}else{N=a[p>>0]|0;M=(N&1)==0;if(M)N=(N&255)>>>1;else N=c[H>>2]|0;if(!N){M=-1;N=0;O=0}else{if(M)M=C;else M=c[E>>2]|0;M=a[M>>0]|0;N=0;O=0}while(1){if((O|0)==(M|0)){P=c[f>>2]|0;c[f>>2]=P+1;a[P>>0]=o;N=N+1|0;P=a[p>>0]|0;O=(P&1)==0;if(O)P=(P&255)>>>1;else P=c[H>>2]|0;if(N>>>0<P>>>0){if(O)M=C;else M=c[E>>2]|0;if((a[M+N>>0]|0)==127){M=-1;O=0}else{if(O)M=C;else M=c[E>>2]|0;M=a[M+N>>0]|0;O=0}}else O=0}L=L+ -1|0;Q=a[L>>0]|0;R=c[f>>2]|0;c[f>>2]=R+1;a[R>>0]=Q;if((L|0)==(h|0))break;else O=O+1|0}}L=c[f>>2]|0;if((K|0)!=(L|0)?(G=L+ -1|0,G>>>0>K>>>0):0){L=G;do{R=a[K>>0]|0;a[K>>0]=a[L>>0]|0;a[L>>0]=R;K=K+1|0;L=L+ -1|0}while(K>>>0<L>>>0)}break};case 1:{c[e>>2]=c[f>>2];Q=vd[c[(c[k>>2]|0)+28>>2]&63](k,32)|0;R=c[f>>2]|0;c[f>>2]=R+1;a[R>>0]=Q;break};case 3:{L=a[r>>0]|0;K=(L&1)==0;if(K)L=(L&255)>>>1;else L=c[u>>2]|0;if(L){if(K)K=v;else K=c[w>>2]|0;Q=a[K>>0]|0;R=c[f>>2]|0;c[f>>2]=R+1;a[R>>0]=Q}break};case 2:{L=a[q>>0]|0;K=(L&1)==0;if(K)M=(L&255)>>>1;else M=c[z>>2]|0;if(!((M|0)==0|A)){if(K){K=x;L=(L&255)>>>1}else{K=c[y>>2]|0;L=c[z>>2]|0}L=K+L|0;M=c[f>>2]|0;if((K|0)!=(L|0))do{a[M>>0]=a[K>>0]|0;K=K+1|0;M=M+1|0}while((K|0)!=(L|0));c[f>>2]=M}break};case 0:{c[e>>2]=c[f>>2];break};default:{}}J=J+1|0}while((J|0)!=4);o=a[r>>0]|0;x=(o&1)==0;if(x)y=(o&255)>>>1;else y=c[u>>2]|0;if(y>>>0>1){if(x)u=(o&255)>>>1;else{v=c[w>>2]|0;u=c[u>>2]|0}w=v+1|0;u=v+u|0;v=c[f>>2]|0;if((w|0)!=(u|0))do{a[v>>0]=a[w>>0]|0;w=w+1|0;v=v+1|0}while((w|0)!=(u|0));c[f>>2]=v}g=g&176;if((g|0)==32){c[e>>2]=c[f>>2];i=t;return}else if((g|0)==16){i=t;return}else{c[e>>2]=d;i=t;return}}function un(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;q=i;i=i+160|0;s=q;k=q+52|0;r=q+53|0;l=q+16|0;m=q+4|0;n=q+40|0;w=q+36|0;u=q+56|0;p=q+28|0;t=q+32|0;o=c[g+28>>2]|0;d=o+4|0;c[d>>2]=(c[d>>2]|0)+1;d=Sn(o,19072)|0;x=a[j>>0]|0;v=(x&1)==0;if(v)x=(x&255)>>>1;else x=c[j+4>>2]|0;if(!x)v=0;else{if(v)v=j+1|0;else v=c[j+8>>2]|0;v=a[v>>0]|0;v=v<<24>>24==(vd[c[(c[d>>2]|0)+28>>2]&63](d,45)|0)<<24>>24}c[s>>2]=0;c[l+0>>2]=0;c[l+4>>2]=0;c[l+8>>2]=0;c[m+0>>2]=0;c[m+4>>2]=0;c[m+8>>2]=0;c[n+0>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;sn(f,v,o,s,k,r,l,m,n,w);f=a[j>>0]|0;x=(f&1)==0;if(x)y=(f&255)>>>1;else y=c[j+4>>2]|0;w=c[w>>2]|0;if((y|0)>(w|0)){if(x)y=(f&255)>>>1;else y=c[j+4>>2]|0;z=a[n>>0]|0;if(!(z&1))z=(z&255)>>>1;else z=c[n+4>>2]|0;A=a[m>>0]|0;if(!(A&1))A=(A&255)>>>1;else A=c[m+4>>2]|0;y=z+(y-w<<1|1)+A|0}else{y=a[n>>0]|0;if(!(y&1))y=(y&255)>>>1;else y=c[n+4>>2]|0;z=a[m>>0]|0;if(!(z&1))z=(z&255)>>>1;else z=c[m+4>>2]|0;y=y+2+z|0}y=y+w|0;if(y>>>0>100){u=Tq(y)|0;if(!u){A=Wb(4)|0;c[A>>2]=27280;Zc(A|0,27328,220)}else y=u}else y=0;if(x){x=j+1|0;j=(f&255)>>>1}else{x=c[j+8>>2]|0;j=c[j+4>>2]|0}tn(u,p,t,c[g+4>>2]|0,x,x+j|0,d,v,s,a[k>>0]|0,a[r>>0]|0,l,m,n,w);Sg(b,c[e>>2]|0,u,c[p>>2]|0,c[t>>2]|0,g,h);Uq(y);if(a[n>>0]&1)Uq(c[n+8>>2]|0);if(a[m>>0]&1)Uq(c[m+8>>2]|0);if(a[l>>0]&1)Uq(c[l+8>>2]|0);z=o+4|0;A=c[z>>2]|0;c[z>>2]=A+ -1;if(A){i=q;return}jd[c[(c[o>>2]|0)+8>>2]&255](o);i=q;return}function vn(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function wn(a){a=a|0;return}function xn(b,d,e,f,g,j,l){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=j|0;l=+l;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;p=i;i=i+976|0;v=p;A=p+868|0;B=p+816|0;x=p+416|0;q=p+408|0;m=p+860|0;n=p+400|0;r=p+824|0;o=p+836|0;t=p+848|0;C=p+820|0;s=p+404|0;d=p+864|0;c[B>>2]=A;h[k>>3]=l;c[v>>2]=c[k>>2];c[v+4>>2]=c[k+4>>2];A=dr(A,100,18840,v)|0;if(A>>>0>99){A=Dk()|0;h[k>>3]=l;c[v>>2]=c[k>>2];c[v+4>>2]=c[k+4>>2];A=jl(B,A,18840,v)|0;w=c[B>>2]|0;if(!w){D=Wb(4)|0;c[D>>2]=27280;Zc(D|0,27328,220)}x=Tq(A<<2)|0;if(!x){D=Wb(4)|0;c[D>>2]=27280;Zc(D|0,27328,220)}else u=x}else{u=0;w=0}z=c[g+28>>2]|0;y=z+4|0;c[y>>2]=(c[y>>2]|0)+1;y=Sn(z,19064)|0;B=c[B>>2]|0;sd[c[(c[y>>2]|0)+48>>2]&7](y,B,B+A|0,x)|0;if(!A)B=0;else B=(a[B>>0]|0)==45;c[q>>2]=0;c[r+0>>2]=0;c[r+4>>2]=0;c[r+8>>2]=0;c[o+0>>2]=0;c[o+4>>2]=0;c[o+8>>2]=0;c[t+0>>2]=0;c[t+4>>2]=0;c[t+8>>2]=0;yn(f,B,z,q,m,n,r,o,t,C);f=c[C>>2]|0;if((A|0)>(f|0)){C=a[t>>0]|0;if(!(C&1))C=(C&255)>>>1;else C=c[t+4>>2]|0;D=a[o>>0]|0;if(!(D&1))D=(D&255)>>>1;else D=c[o+4>>2]|0;C=C+(A-f<<1|1)+D|0}else{C=a[t>>0]|0;if(!(C&1))C=(C&255)>>>1;else C=c[t+4>>2]|0;D=a[o>>0]|0;if(!(D&1))D=(D&255)>>>1;else D=c[o+4>>2]|0;C=C+2+D|0}C=C+f|0;if(C>>>0>100){v=Tq(C<<2)|0;if(!v){D=Wb(4)|0;c[D>>2]=27280;Zc(D|0,27328,220)}else C=v}else C=0;zn(v,s,d,c[g+4>>2]|0,x,x+(A<<2)|0,y,B,q,c[m>>2]|0,c[n>>2]|0,r,o,t,f);sl(b,c[e>>2]|0,v,c[s>>2]|0,c[d>>2]|0,g,j);if(C)Uq(C);if(a[t>>0]&1)Uq(c[t+8>>2]|0);if(a[o>>0]&1)Uq(c[o+8>>2]|0);if(a[r>>0]&1)Uq(c[r+8>>2]|0);C=z+4|0;D=c[C>>2]|0;c[C>>2]=D+ -1;if(!D)jd[c[(c[z>>2]|0)+8>>2]&255](z);if(!u){Uq(w);i=p;return}Uq(u);Uq(w);i=p;return}function yn(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;n=i;i=i+112|0;w=n;v=n+16|0;y=n+92|0;x=n+40|0;u=n+80|0;s=n+96|0;q=n+108|0;p=n+56|0;t=n+52|0;r=n+28|0;o=n+4|0;z=n+68|0;if(b){o=Sn(e,18656)|0;p=c[o>>2]|0;if(d){kd[c[p+44>>2]&63](w,o);b=c[w>>2]|0;a[f>>0]=b;a[f+1>>0]=b>>8;a[f+2>>0]=b>>16;a[f+3>>0]=b>>24;kd[c[(c[o>>2]|0)+32>>2]&63](v,o);if(!(a[l>>0]&1)){c[l+4>>2]=0;a[l>>0]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}Wi(l);c[l+0>>2]=c[v+0>>2];c[l+4>>2]=c[v+4>>2];c[l+8>>2]=c[v+8>>2];c[v+0>>2]=0;c[v+4>>2]=0;c[v+8>>2]=0}else{kd[c[p+40>>2]&63](y,o);b=c[y>>2]|0;a[f>>0]=b;a[f+1>>0]=b>>8;a[f+2>>0]=b>>16;a[f+3>>0]=b>>24;kd[c[(c[o>>2]|0)+28>>2]&63](x,o);if(!(a[l>>0]&1)){c[l+4>>2]=0;a[l>>0]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}Wi(l);c[l+0>>2]=c[x+0>>2];c[l+4>>2]=c[x+4>>2];c[l+8>>2]=c[x+8>>2];c[x+0>>2]=0;c[x+4>>2]=0;c[x+8>>2]=0}c[g>>2]=md[c[(c[o>>2]|0)+12>>2]&127](o)|0;c[h>>2]=md[c[(c[o>>2]|0)+16>>2]&127](o)|0;kd[c[(c[o>>2]|0)+20>>2]&63](u,o);if(!(a[j>>0]&1)){a[j+1>>0]=0;a[j>>0]=0}else{a[c[j+8>>2]>>0]=0;c[j+4>>2]=0}Li(j);c[j+0>>2]=c[u+0>>2];c[j+4>>2]=c[u+4>>2];c[j+8>>2]=c[u+8>>2];c[u+0>>2]=0;c[u+4>>2]=0;c[u+8>>2]=0;kd[c[(c[o>>2]|0)+24>>2]&63](s,o);if(!(a[k>>0]&1)){c[k+4>>2]=0;a[k>>0]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}Wi(k);c[k+0>>2]=c[s+0>>2];c[k+4>>2]=c[s+4>>2];c[k+8>>2]=c[s+8>>2];c[s+0>>2]=0;c[s+4>>2]=0;c[s+8>>2]=0;b=md[c[(c[o>>2]|0)+36>>2]&127](o)|0;c[m>>2]=b;i=n;return}else{s=Sn(e,18592)|0;u=c[s>>2]|0;if(d){kd[c[u+44>>2]&63](q,s);b=c[q>>2]|0;a[f>>0]=b;a[f+1>>0]=b>>8;a[f+2>>0]=b>>16;a[f+3>>0]=b>>24;kd[c[(c[s>>2]|0)+32>>2]&63](p,s);if(!(a[l>>0]&1)){c[l+4>>2]=0;a[l>>0]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}Wi(l);c[l+0>>2]=c[p+0>>2];c[l+4>>2]=c[p+4>>2];c[l+8>>2]=c[p+8>>2];c[p+0>>2]=0;c[p+4>>2]=0;c[p+8>>2]=0}else{kd[c[u+40>>2]&63](t,s);b=c[t>>2]|0;a[f>>0]=b;a[f+1>>0]=b>>8;a[f+2>>0]=b>>16;a[f+3>>0]=b>>24;kd[c[(c[s>>2]|0)+28>>2]&63](r,s);if(!(a[l>>0]&1)){c[l+4>>2]=0;a[l>>0]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}Wi(l);c[l+0>>2]=c[r+0>>2];c[l+4>>2]=c[r+4>>2];c[l+8>>2]=c[r+8>>2];c[r+0>>2]=0;c[r+4>>2]=0;c[r+8>>2]=0}c[g>>2]=md[c[(c[s>>2]|0)+12>>2]&127](s)|0;c[h>>2]=md[c[(c[s>>2]|0)+16>>2]&127](s)|0;kd[c[(c[s>>2]|0)+20>>2]&63](o,s);if(!(a[j>>0]&1)){a[j+1>>0]=0;a[j>>0]=0}else{a[c[j+8>>2]>>0]=0;c[j+4>>2]=0}Li(j);c[j+0>>2]=c[o+0>>2];c[j+4>>2]=c[o+4>>2];c[j+8>>2]=c[o+8>>2];c[o+0>>2]=0;c[o+4>>2]=0;c[o+8>>2]=0;kd[c[(c[s>>2]|0)+24>>2]&63](z,s);if(!(a[k>>0]&1)){c[k+4>>2]=0;a[k>>0]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}Wi(k);c[k+0>>2]=c[z+0>>2];c[k+4>>2]=c[z+4>>2];c[k+8>>2]=c[z+8>>2];c[z+0>>2]=0;c[z+4>>2]=0;c[z+8>>2]=0;b=md[c[(c[s>>2]|0)+36>>2]&127](s)|0;c[m>>2]=b;i=n;return}}function zn(b,d,e,f,g,h,j,k,l,m,n,o,p,q,r){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;q=q|0;r=r|0;var s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;s=i;c[e>>2]=b;t=q+4|0;u=q+8|0;x=(f&512|0)==0;w=p+4|0;A=p+8|0;v=(r|0)>0;y=o+1|0;C=o+8|0;D=o+4|0;E=0;do{switch(a[l+E>>0]|0){case 2:{F=a[p>>0]|0;H=(F&1)==0;if(H)G=(F&255)>>>1;else G=c[w>>2]|0;if(!((G|0)==0|x)){if(H){H=w;I=(F&255)>>>1}else{H=c[A>>2]|0;I=c[w>>2]|0}G=H+(I<<2)|0;F=c[e>>2]|0;if((H|0)!=(G|0)){J=(H+(I+ -1<<2)+(0-H)|0)>>>2;I=F;while(1){c[I>>2]=c[H>>2];H=H+4|0;if((H|0)==(G|0))break;I=I+4|0}F=F+(J+1<<2)|0}c[e>>2]=F}break};case 0:{c[d>>2]=c[e>>2];break};case 3:{G=a[q>>0]|0;F=(G&1)==0;if(F)G=(G&255)>>>1;else G=c[t>>2]|0;if(G){if(F)F=t;else F=c[u>>2]|0;L=c[F>>2]|0;M=c[e>>2]|0;c[e>>2]=M+4;c[M>>2]=L}break};case 4:{F=c[e>>2]|0;g=k?g+4|0:g;a:do if(g>>>0<h>>>0){G=g;while(1){H=G+4|0;if(!(fd[c[(c[j>>2]|0)+12>>2]&31](j,2048,c[G>>2]|0)|0))break a;if(H>>>0<h>>>0)G=H;else{G=H;break}}}else G=g;while(0);if(v){if(G>>>0>g>>>0){H=c[e>>2]|0;I=r;while(1){G=G+ -4|0;K=H+4|0;c[H>>2]=c[G>>2];I=I+ -1|0;J=(I|0)>0;if(!(G>>>0>g>>>0&J))break;else H=K}c[e>>2]=K;if(J)z=34;else c[e>>2]=H+8}else{I=r;z=34}if((z|0)==34){z=0;J=vd[c[(c[j>>2]|0)+44>>2]&63](j,48)|0;K=c[e>>2]|0;M=K+4|0;c[e>>2]=M;if((I|0)>0){H=K;L=I;while(1){c[H>>2]=J;L=L+ -1|0;if((L|0)<=0)break;else{H=M;M=M+4|0}}c[e>>2]=K+(I+1<<2);K=K+(I<<2)|0}}c[K>>2]=m}if((G|0)==(g|0)){K=vd[c[(c[j>>2]|0)+44>>2]&63](j,48)|0;M=c[e>>2]|0;L=M+4|0;c[e>>2]=L;c[M>>2]=K}else{I=a[o>>0]|0;H=(I&1)==0;if(H)I=(I&255)>>>1;else I=c[D>>2]|0;if(!I)H=-1;else{if(H)H=y;else H=c[C>>2]|0;H=a[H>>0]|0}I=c[e>>2]|0;K=0;J=0;while(1){if((J|0)==(H|0)){J=I+4|0;c[e>>2]=J;c[I>>2]=n;K=K+1|0;L=a[o>>0]|0;I=(L&1)==0;if(I)L=(L&255)>>>1;else L=c[D>>2]|0;if(K>>>0<L>>>0){if(I)H=y;else H=c[C>>2]|0;if((a[H+K>>0]|0)==127){I=J;H=-1;J=0}else{if(I)H=y;else H=c[C>>2]|0;I=J;H=a[H+K>>0]|0;J=0}}else{I=J;J=0}}G=G+ -4|0;M=c[G>>2]|0;L=I+4|0;c[e>>2]=L;c[I>>2]=M;if((G|0)==(g|0))break;else{I=L;J=J+1|0}}}if((F|0)!=(L|0)?(B=L+ -4|0,B>>>0>F>>>0):0){G=B;do{M=c[F>>2]|0;c[F>>2]=c[G>>2];c[G>>2]=M;F=F+4|0;G=G+ -4|0}while(F>>>0<G>>>0)}break};case 1:{c[d>>2]=c[e>>2];L=vd[c[(c[j>>2]|0)+44>>2]&63](j,32)|0;M=c[e>>2]|0;c[e>>2]=M+4;c[M>>2]=L;break};default:{}}E=E+1|0}while((E|0)!=4);v=a[q>>0]|0;h=(v&1)==0;if(h)q=(v&255)>>>1;else q=c[t>>2]|0;if(q>>>0>1){if(h){h=t;q=(v&255)>>>1}else{h=c[u>>2]|0;q=c[t>>2]|0}v=h+4|0;u=h+(q<<2)|0;t=c[e>>2]|0;if((v|0)!=(u|0)){q=(h+(q+ -1<<2)+(0-v)|0)>>>2;h=t;while(1){c[h>>2]=c[v>>2];v=v+4|0;if((v|0)==(u|0))break;else h=h+4|0}t=t+(q+1<<2)|0}c[e>>2]=t}f=f&176;if((f|0)==16){i=s;return}else if((f|0)==32){c[d>>2]=c[e>>2];i=s;return}else{c[d>>2]=b;i=s;return}}function An(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;q=i;i=i+464|0;s=q;k=q+24|0;r=q+432|0;l=q+4|0;m=q+436|0;n=q+448|0;w=q+20|0;u=q+32|0;p=q+28|0;t=q+16|0;o=c[g+28>>2]|0;d=o+4|0;c[d>>2]=(c[d>>2]|0)+1;d=Sn(o,19064)|0;x=a[j>>0]|0;v=(x&1)==0;if(v)x=(x&255)>>>1;else x=c[j+4>>2]|0;if(!x)v=0;else{if(v)v=j+4|0;else v=c[j+8>>2]|0;v=c[v>>2]|0;v=(v|0)==(vd[c[(c[d>>2]|0)+44>>2]&63](d,45)|0)}c[s>>2]=0;c[l+0>>2]=0;c[l+4>>2]=0;c[l+8>>2]=0;c[m+0>>2]=0;c[m+4>>2]=0;c[m+8>>2]=0;c[n+0>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;yn(f,v,o,s,k,r,l,m,n,w);f=a[j>>0]|0;x=(f&1)==0;if(x)y=(f&255)>>>1;else y=c[j+4>>2]|0;w=c[w>>2]|0;if((y|0)>(w|0)){if(x)y=(f&255)>>>1;else y=c[j+4>>2]|0;z=a[n>>0]|0;if(!(z&1))z=(z&255)>>>1;else z=c[n+4>>2]|0;A=a[m>>0]|0;if(!(A&1))A=(A&255)>>>1;else A=c[m+4>>2]|0;y=z+(y-w<<1|1)+A|0}else{y=a[n>>0]|0;if(!(y&1))y=(y&255)>>>1;else y=c[n+4>>2]|0;z=a[m>>0]|0;if(!(z&1))z=(z&255)>>>1;else z=c[m+4>>2]|0;y=y+2+z|0}y=y+w|0;if(y>>>0>100){u=Tq(y<<2)|0;if(!u){A=Wb(4)|0;c[A>>2]=27280;Zc(A|0,27328,220)}else y=u}else y=0;if(x){x=j+4|0;j=(f&255)>>>1}else{x=c[j+8>>2]|0;j=c[j+4>>2]|0}zn(u,p,t,c[g+4>>2]|0,x,x+(j<<2)|0,d,v,s,c[k>>2]|0,c[r>>2]|0,l,m,n,w);sl(b,c[e>>2]|0,u,c[p>>2]|0,c[t>>2]|0,g,h);if(y)Uq(y);if(a[n>>0]&1)Uq(c[n+8>>2]|0);if(a[m>>0]&1)Uq(c[m+8>>2]|0);if(a[l>>0]&1)Uq(c[l+8>>2]|0);z=o+4|0;A=c[z>>2]|0;c[z>>2]=A+ -1;if(A){i=q;return}jd[c[(c[o>>2]|0)+8>>2]&255](o);i=q;return}function Bn(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Cn(a){a=a|0;return}function Dn(b,d,e){b=b|0;d=d|0;e=e|0;b=i;if(!(a[d>>0]&1))d=d+1|0;else d=c[d+8>>2]|0;e=Nb(d|0,1)|0;i=b;return e>>>((e|0)!=(-1|0)&1)|0}function En(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;d=i;i=i+16|0;j=d;c[j+0>>2]=0;c[j+4>>2]=0;c[j+8>>2]=0;m=a[h>>0]|0;if(!(m&1)){l=h+1|0;h=(m&255)>>>1}else{l=c[h+8>>2]|0;h=c[h+4>>2]|0}h=l+h|0;if(l>>>0<h>>>0){do{Mi(j,a[l>>0]|0);l=l+1|0}while((l|0)!=(h|0));e=(e|0)==-1?-1:e<<1;if(!(a[j>>0]&1))k=10;else l=c[j+8>>2]|0}else{e=(e|0)==-1?-1:e<<1;k=10}if((k|0)==10)l=j+1|0;g=Fc(e|0,f|0,g|0,l|0)|0;c[b+0>>2]=0;c[b+4>>2]=0;c[b+8>>2]=0;m=mr(g|0)|0;f=g+m|0;if((m|0)>0)do{Mi(b,a[g>>0]|0);g=g+1|0}while((g|0)!=(f|0));if(!(a[j>>0]&1)){i=d;return}Uq(c[j+8>>2]|0);i=d;return}function Fn(a,b){a=a|0;b=b|0;a=i;gb(((b|0)==-1?-1:b<<1)|0)|0;i=a;return}function Gn(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Hn(a){a=a|0;return}function In(b,d,e){b=b|0;d=d|0;e=e|0;b=i;if(!(a[d>>0]&1))d=d+1|0;else d=c[d+8>>2]|0;e=Nb(d|0,1)|0;i=b;return e>>>((e|0)!=(-1|0)&1)|0}function Jn(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;n=i;i=i+176|0;o=n;l=n+40|0;k=n+168|0;j=n+172|0;m=n+16|0;r=n+8|0;d=n+32|0;c[m+0>>2]=0;c[m+4>>2]=0;c[m+8>>2]=0;c[r+4>>2]=0;c[r>>2]=20688;s=a[h>>0]|0;if(!(s&1)){t=h+4|0;h=(s&255)>>>1}else{t=c[h+8>>2]|0;h=c[h+4>>2]|0}h=t+(h<<2)|0;u=o;c[u>>2]=0;c[u+4>>2]=0;do if(t>>>0<h>>>0){s=l+32|0;u=20688|0;while(1){c[j>>2]=t;v=(rd[c[u+12>>2]&15](r,o,t,h,j,l,s,k)|0)==2;u=c[j>>2]|0;if(v|(u|0)==(t|0))break;if(l>>>0<(c[k>>2]|0)>>>0){t=l;do{Mi(m,a[t>>0]|0);t=t+1|0}while(t>>>0<(c[k>>2]|0)>>>0);t=c[j>>2]|0}else t=u;if(t>>>0>=h>>>0){p=16;break}u=c[r>>2]|0}if((p|0)==16){q=(a[m>>0]&1)==0;break}dn(19912)}else q=1;while(0);if(q)p=m+1|0;else p=c[m+8>>2]|0;p=Fc(((e|0)==-1?-1:e<<1)|0,f|0,g|0,p|0)|0;c[b+0>>2]=0;c[b+4>>2]=0;c[b+8>>2]=0;c[d+4>>2]=0;c[d>>2]=20792;v=mr(p|0)|0;e=p+v|0;u=o;c[u>>2]=0;c[u+4>>2]=0;a:do if((v|0)>0){g=e;f=l+128|0;q=20792|0;while(1){c[j>>2]=p;v=(rd[c[q+16>>2]&15](d,o,p,(g-p|0)>32?p+32|0:e,j,l,f,k)|0)==2;q=c[j>>2]|0;if(v|(q|0)==(p|0))break;if(l>>>0<(c[k>>2]|0)>>>0){p=l;do{Xi(b,c[p>>2]|0);p=p+4|0}while(p>>>0<(c[k>>2]|0)>>>0);p=c[j>>2]|0}else p=q;if(p>>>0>=e>>>0)break a;q=c[d>>2]|0}dn(19912)}while(0);if(!(a[m>>0]&1)){i=n;return}Uq(c[m+8>>2]|0);i=n;return}function Kn(a,b){a=a|0;b=b|0;a=i;gb(((b|0)==-1?-1:b<<1)|0)|0;i=a;return}function Ln(a){a=a|0;var b=0,d=0;b=i;c[a>>2]=19160;a=a+8|0;d=c[a>>2]|0;if((d|0)==(Dk()|0)){i=b;return}ub(c[a>>2]|0);i=b;return}function Mn(){var b=0,d=0,e=0;b=Wb(8)|0;c[b>>2]=27496;e=$p(19)|0;d=b+4|0;c[e>>2]=6;c[e+4>>2]=6;c[e+8>>2]=0;e=e+12|0;a[e+0>>0]=a[18968]|0;a[e+1>>0]=a[18969]|0;a[e+2>>0]=a[18970]|0;a[e+3>>0]=a[18971]|0;a[e+4>>0]=a[18972]|0;a[e+5>>0]=a[18973]|0;a[e+6>>0]=a[18974]|0;c[d>>2]=e;c[b>>2]=27576;Zc(b|0,27616,222)}function Nn(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;f=i;i=i+16|0;j=f;h=d+4|0;c[h>>2]=(c[h>>2]|0)+1;h=b+12|0;m=c[h>>2]|0;g=b+8|0;k=c[g>>2]|0;r=m;q=k;l=r-q>>2;do if(l>>>0<=e>>>0){p=e+1|0;if(l>>>0>=p>>>0){if(l>>>0<=p>>>0)break;j=k+(p<<2)|0;if((m|0)==(j|0))break;c[h>>2]=m+(~((m+ -4+(0-j)|0)>>>2)<<2);break}o=p-l|0;k=b+16|0;s=c[k>>2]|0;do if(s-r>>2>>>0<o>>>0){m=b+24|0;if(p>>>0>1073741823)Mn();q=s-q|0;if(q>>2>>>0<536870911){q=q>>1;q=q>>>0<p>>>0?p:q;c[j>>2]=0;if(q){p=b+136|0;if((a[p>>0]|0)==0&q>>>0<29){a[p>>0]=1;p=m}else{p=q;n=15}}else{q=0;p=0}}else{c[j>>2]=0;p=1073741823;n=15}if((n|0)==15){q=p;p=$p(p<<2)|0}c[j>>2]=p+(q<<2);n=p+(l<<2)|0;do{if(!n)n=0;else c[n>>2]=0;n=n+4|0;o=o+ -1|0}while((o|0)!=0);q=c[g>>2]|0;r=(c[h>>2]|0)-q|0;s=p+(l-(r>>2)<<2)|0;nr(s|0,q|0,r|0)|0;l=c[g>>2]|0;c[g>>2]=s;c[h>>2]=n;s=c[k>>2]|0;c[k>>2]=c[j>>2];c[j>>2]=s;if(l)if((m|0)==(l|0)){a[b+136>>0]=0;break}else{Uq(l);break}}else do{if(!m)j=0;else{c[m>>2]=0;j=c[h>>2]|0}m=j+4|0;c[h>>2]=m;o=o+ -1|0}while((o|0)!=0);while(0);k=c[g>>2]|0}while(0);h=c[k+(e<<2)>>2]|0;if(!h){s=k;s=s+(e<<2)|0;c[s>>2]=d;i=f;return}r=h+4|0;s=c[r>>2]|0;c[r>>2]=s+ -1;if(!s)jd[c[(c[h>>2]|0)+8>>2]&255](h);s=c[g>>2]|0;s=s+(e<<2)|0;c[s>>2]=d;i=f;return}function On(a){a=a|0;var b=0;b=i;Pn(a);Uq(a);i=b;return}function Pn(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0;d=i;c[b>>2]=19008;f=b+8|0;e=b+12|0;g=c[e>>2]|0;j=c[f>>2]|0;if((g|0)!=(j|0)){h=0;do{k=c[j+(h<<2)>>2]|0;if(k){g=k+4|0;j=c[g>>2]|0;c[g>>2]=j+ -1;if(!j)jd[c[(c[k>>2]|0)+8>>2]&255](k);g=c[e>>2]|0;j=c[f>>2]|0}h=h+1|0}while(h>>>0<g-j>>2>>>0)}if(!(a[b+144>>0]&1)){Jp(f);i=d;return}Uq(c[b+152>>2]|0);Jp(f);i=d;return}function Qn(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;if(a[19048]|0){g=c[4760]|0;c[b>>2]=g;g=g+4|0;f=c[g>>2]|0;c[g>>2]=f+1;i=d;return}if(!(Fa(19048)|0)){g=c[4760]|0;c[b>>2]=g;g=g+4|0;f=c[g>>2]|0;c[g>>2]=f+1;i=d;return}if((a[19032]|0)==0?(Fa(19032)|0)!=0:0){c[5845]=0;c[5844]=19008;a[23512]=1;c[5847]=23400;c[5846]=23400;c[5848]=23512;g=28;e=23400;do{c[e>>2]=0;f=c[5847]|0;e=f+4|0;c[5847]=e;g=g+ -1|0}while((g|0)!=0);a[23520]=2;a[23521]=67;a[23522]=0;g=c[5846]|0;if((e|0)!=(g|0))c[5847]=f+(0-((f+(0-g)|0)>>>2)<<2);c[5961]=0;c[5960]=17456;Nn(23376,23840,Rn(17480)|0);c[5959]=0;c[5958]=17496;Nn(23376,23832,Rn(17520)|0);c[5955]=0;c[5954]=19088;c[5956]=0;a[23828]=0;c[5956]=c[(Rb()|0)>>2];Nn(23376,23816,Rn(19072)|0);c[5953]=0;c[5952]=20008;Nn(23376,23808,Rn(19064)|0);c[5951]=0;c[5950]=20224;Nn(23376,23800,Rn(19136)|0);c[5947]=0;c[5946]=19160;c[5948]=Dk()|0;Nn(23376,23784,Rn(19144)|0);c[5945]=0;c[5944]=20448;Nn(23376,23776,Rn(19200)|0);c[5943]=0;c[5942]=20568;Nn(23376,23768,Rn(19208)|0);c[5937]=0;c[5936]=19240;a[23752]=46;a[23753]=44;c[5939]=0;c[5940]=0;c[5941]=0;Nn(23376,23744,Rn(19216)|0);c[5929]=0;c[5928]=19280;c[5930]=46;c[5931]=44;c[5932]=0;c[5933]=0;c[5934]=0;Nn(23376,23712,Rn(19224)|0);c[5927]=0;c[5926]=17536;Nn(23376,23704,Rn(17592)|0);c[5925]=0;c[5924]=17656;Nn(23376,23696,Rn(17712)|0);c[5923]=0;c[5922]=17728;Nn(23376,23688,Rn(17776)|0);c[5921]=0;c[5920]=17824;Nn(23376,23680,Rn(17872)|0);c[5919]=0;c[5918]=18416;Nn(23376,23672,Rn(18464)|0);c[5917]=0;c[5916]=18480;Nn(23376,23664,Rn(18528)|0);c[5915]=0;c[5914]=18544;Nn(23376,23656,Rn(18592)|0);c[5913]=0;c[5912]=18608;Nn(23376,23648,Rn(18656)|0);c[5911]=0;c[5910]=18672;Nn(23376,23640,Rn(18696)|0);c[5909]=0;c[5908]=18752;Nn(23376,23632,Rn(18776)|0);c[5907]=0;c[5906]=18808;Nn(23376,23624,Rn(18832)|0);c[5905]=0;c[5904]=18856;Nn(23376,23616,Rn(18880)|0);c[5901]=0;c[5900]=17904;c[5902]=17952;Nn(23376,23600,Rn(17984)|0);c[5897]=0;c[5896]=18056;c[5898]=18104;Nn(23376,23584,Rn(18136)|0);c[5893]=0;c[5892]=19944;c[5894]=Dk()|0;c[5892]=18352;Nn(23376,23568,Rn(18368)|0);c[5889]=0;c[5888]=19944;c[5890]=Dk()|0;c[5888]=18384;Nn(23376,23552,Rn(18400)|0);c[5887]=0;c[5886]=18896;Nn(23376,23544,Rn(18920)|0);c[5885]=0;c[5884]=18936;Nn(23376,23536,Rn(18960)|0);c[4756]=23376;Vc(19032)}g=c[4756]|0;c[4760]=g;g=g+4|0;c[g>>2]=(c[g>>2]|0)+1;Vc(19048);g=c[4760]|0;c[b>>2]=g;g=g+4|0;f=c[g>>2]|0;c[g>>2]=f+1;i=d;return}function Rn(a){a=a|0;var b=0;b=i;do if((c[a>>2]|0)!=-1){Cc(16152)|0;if((c[a>>2]|0)==1)do rc(16176,16152)|0;while((c[a>>2]|0)==1);if(c[a>>2]|0){zb(16152)|0;break}c[a>>2]=1;zb(16152)|0;Vn(a);Cc(16152)|0;c[a>>2]=-1;zb(16152)|0;gc(16176)|0}while(0);i=b;return(c[a+4>>2]|0)+ -1|0}function Sn(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;e=i;b=Rn(b)|0;f=c[a+8>>2]|0;if((c[a+12>>2]|0)-f>>2>>>0>b>>>0?(d=c[f+(b<<2)>>2]|0,(d|0)!=0):0){i=e;return d|0}f=Wb(4)|0;c[f>>2]=27744;Zc(f|0,27816,228);return 0}function Tn(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Un(a){a=a|0;var b=0;b=i;if(!a){i=b;return}jd[c[(c[a>>2]|0)+4>>2]&255](a);i=b;return}function Vn(a){a=a|0;var b=0;b=c[4764]|0;c[4764]=b+1;c[a+4>>2]=b+1;return}function Wn(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Xn(a,d,e){a=a|0;d=d|0;e=e|0;a=i;if(e>>>0>=128){d=0;i=a;return d|0}d=(b[(c[(Rb()|0)>>2]|0)+(e<<1)>>1]&d)<<16>>16!=0;i=a;return d|0}function Yn(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0;a=i;if((d|0)==(e|0)){j=d;i=a;return j|0}g=((e+ -4+(0-d)|0)>>>2)+1|0;h=d;while(1){j=c[h>>2]|0;if(j>>>0<128)j=b[(c[(Rb()|0)>>2]|0)+(j<<1)>>1]|0;else j=0;b[f>>1]=j;h=h+4|0;if((h|0)==(e|0))break;else f=f+2|0}j=d+(g<<2)|0;i=a;return j|0}function Zn(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0;a=i;a:do if((e|0)==(f|0))f=e;else do{g=c[e>>2]|0;if(g>>>0<128?(b[(c[(Rb()|0)>>2]|0)+(g<<1)>>1]&d)<<16>>16!=0:0){f=e;break a}e=e+4|0}while((e|0)!=(f|0));while(0);i=a;return f|0}function _n(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0;a=i;a:do if((e|0)==(f|0))f=e;else do{g=c[e>>2]|0;if(g>>>0>=128){f=e;break a}if(!((b[(c[(Rb()|0)>>2]|0)+(g<<1)>>1]&d)<<16>>16)){f=e;break a}e=e+4|0}while((e|0)!=(f|0));while(0);i=a;return f|0}function $n(a,b){a=a|0;b=b|0;a=i;if(b>>>0>=128){i=a;return b|0}b=c[(c[(Ab()|0)>>2]|0)+(b<<2)>>2]|0;i=a;return b|0}function ao(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;a=i;if((b|0)==(d|0)){g=b;i=a;return g|0}e=((d+ -4+(0-b)|0)>>>2)+1|0;f=b;do{g=c[f>>2]|0;if(g>>>0<128)g=c[(c[(Ab()|0)>>2]|0)+(g<<2)>>2]|0;c[f>>2]=g;f=f+4|0}while((f|0)!=(d|0));g=b+(e<<2)|0;i=a;return g|0}function bo(a,b){a=a|0;b=b|0;a=i;if(b>>>0>=128){i=a;return b|0}b=c[(c[(qb()|0)>>2]|0)+(b<<2)>>2]|0;i=a;return b|0}function co(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;a=i;if((b|0)==(d|0)){g=b;i=a;return g|0}e=((d+ -4+(0-b)|0)>>>2)+1|0;f=b;do{g=c[f>>2]|0;if(g>>>0<128)g=c[(c[(qb()|0)>>2]|0)+(g<<2)>>2]|0;c[f>>2]=g;f=f+4|0}while((f|0)!=(d|0));g=b+(e<<2)|0;i=a;return g|0}function eo(a,b){a=a|0;b=b|0;return b<<24>>24|0}function fo(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;b=i;if((d|0)==(e|0)){i=b;return d|0}while(1){c[f>>2]=a[d>>0];d=d+1|0;if((d|0)==(e|0))break;else f=f+4|0}i=b;return e|0}function go(a,b,c){a=a|0;b=b|0;c=c|0;return(b>>>0<128?b&255:c)|0}function ho(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0;b=i;if((d|0)==(e|0)){j=d;i=b;return j|0}h=((e+ -4+(0-d)|0)>>>2)+1|0;j=d;while(1){k=c[j>>2]|0;a[g>>0]=k>>>0<128?k&255:f;j=j+4|0;if((j|0)==(e|0))break;else g=g+1|0}k=d+(h<<2)|0;i=b;return k|0}function io(b){b=b|0;var d=0,e=0;d=i;c[b>>2]=19088;e=c[b+8>>2]|0;if((e|0)!=0?(a[b+12>>0]|0)!=0:0)Uq(e);Uq(b);i=d;return}function jo(b){b=b|0;var d=0,e=0;d=i;c[b>>2]=19088;e=c[b+8>>2]|0;if((e|0)!=0?(a[b+12>>0]|0)!=0:0)Uq(e);i=d;return}function ko(a,b){a=a|0;b=b|0;a=i;if(b<<24>>24<=-1){i=a;return b|0}b=c[(c[(Ab()|0)>>2]|0)+((b&255)<<2)>>2]&255;i=a;return b|0}function lo(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;b=i;if((d|0)==(e|0)){f=d;i=b;return f|0}do{f=a[d>>0]|0;if(f<<24>>24>-1)f=c[(c[(Ab()|0)>>2]|0)+(f<<24>>24<<2)>>2]&255;a[d>>0]=f;d=d+1|0}while((d|0)!=(e|0));i=b;return e|0}function mo(a,b){a=a|0;b=b|0;a=i;if(b<<24>>24<=-1){i=a;return b|0}b=c[(c[(qb()|0)>>2]|0)+(b<<24>>24<<2)>>2]&255;i=a;return b|0}function no(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;b=i;if((d|0)==(e|0)){f=d;i=b;return f|0}do{f=a[d>>0]|0;if(f<<24>>24>-1)f=c[(c[(qb()|0)>>2]|0)+(f<<24>>24<<2)>>2]&255;a[d>>0]=f;d=d+1|0}while((d|0)!=(e|0));i=b;return e|0}function oo(a,b){a=a|0;b=b|0;return b|0}function po(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;b=i;if((c|0)==(d|0))d=c;else while(1){a[e>>0]=a[c>>0]|0;c=c+1|0;if((c|0)==(d|0))break;else e=e+1|0}i=b;return d|0}function qo(a,b,c){a=a|0;b=b|0;c=c|0;return(b<<24>>24>-1?b:c)|0}function ro(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0;b=i;if((c|0)==(d|0)){i=b;return c|0}while(1){g=a[c>>0]|0;a[f>>0]=g<<24>>24>-1?g:e;c=c+1|0;if((c|0)==(d|0))break;else f=f+1|0}i=b;return d|0}function so(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function to(a,b,d,e,f,g,h,i){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;c[f>>2]=d;c[i>>2]=g;return 3}function uo(a,b,d,e,f,g,h,i){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;c[f>>2]=d;c[i>>2]=g;return 3}function vo(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;return 3}function wo(a){a=a|0;return 1}function xo(a){a=a|0;return 1}function yo(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;b=d-c|0;return(b>>>0<e>>>0?b:e)|0}function zo(a){a=a|0;return 1}function Ao(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=19160;d=a+8|0;e=c[d>>2]|0;if((e|0)==(Dk()|0)){Uq(a);i=b;return}ub(c[d>>2]|0);Uq(a);i=b;return}function Bo(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;d=i;i=i+272|0;o=d+264|0;n=d+8|0;m=d;a:do if((e|0)!=(f|0)){q=e;while(1){if(!(c[q>>2]|0))break;q=q+4|0;if((q|0)==(f|0)){q=f;break}}c[k>>2]=h;c[g>>2]=e;if((h|0)!=(j|0)){p=j;b=b+8|0;while(1){w=q-e>>2;r=Yb(c[b>>2]|0)|0;y=c[g>>2]|0;s=(h|0)!=0;u=s?p-h|0:256;v=s?h:n;b:do if((y|0)==0|(u|0)==0)t=0;else{t=0;do{x=w>>>0>=u>>>0;if(!(x|w>>>0>32))break b;x=x?u:w;w=w-x|0;c:do if(!v){A=c[y>>2]|0;if(!A)x=0;else{x=0;z=y;while(1){if(A>>>0>127){A=ar(o,A)|0;if((A|0)==-1){u=0;t=-1;break b}}else A=1;x=A+x|0;z=z+4|0;A=c[z>>2]|0;if(!A){l=32;break}}}}else{d:do if(x>>>0>3){z=v;A=x;while(1){B=c[y>>2]|0;if((B+ -1|0)>>>0>126){if(!B)break;B=ar(z,B)|0;if((B|0)==-1){u=0;t=-1;break b}z=z+B|0;A=A-B|0}else{a[z>>0]=B;z=z+1|0;A=A+ -1|0}y=y+4|0;if(A>>>0<=3)break d}a[z>>0]=0;x=x-A|0;y=0;l=32;break c}else{z=v;A=x}while(0);if(A){while(1){B=c[y>>2]|0;if((B+ -1|0)>>>0>126){if(!B){l=25;break}B=ar(o,B)|0;if((B|0)==-1){u=0;t=-1;break b}if(B>>>0>A>>>0){l=28;break}ar(z,c[y>>2]|0)|0;z=z+B|0;A=A-B|0}else{a[z>>0]=B;z=z+1|0;A=A+ -1|0}y=y+4|0;if(!A){l=32;break c}}if((l|0)==25){a[z>>0]=0;x=x-A|0;y=0;l=32;break}else if((l|0)==28){x=x-A|0;l=32;break}}else l=32}while(0);if((l|0)==32){l=0;if((x|0)==-1){u=0;t=-1;break b}}if((v|0)==(n|0))v=n;else{u=u-x|0;v=v+x|0}t=x+t|0}while(!((y|0)==0|(u|0)==0))}while(0);e:do if((y|0)!=0?!((u|0)==0|(w|0)==0):0){while(1){x=ar(v,c[y>>2]|0)|0;if((x+1|0)>>>0<2)break;y=y+4|0;w=w+ -1|0;t=t+1|0;if((u|0)==(x|0)|(w|0)==0)break e;else{u=u-x|0;v=v+x|0}}B=(x|0)==0;t=B?t:-1;y=B?0:y}while(0);if(s)c[g>>2]=y;if(r)Yb(r|0)|0;if(!t){g=1;l=67;break}else if((t|0)==-1){l=46;break}h=(c[k>>2]|0)+t|0;c[k>>2]=h;if((h|0)==(j|0)){l=65;break}if((q|0)==(f|0)){e=c[g>>2]|0;q=f}else{e=Yb(c[b>>2]|0)|0;a[m>>0]=0;if(e)Yb(e|0)|0;r=c[k>>2]|0;if((r|0)==(j|0)){g=1;l=67;break}else{q=0;h=0;e=m}while(1){c[k>>2]=r+1;a[r>>0]=q;if(!h)break;B=e+1|0;r=c[k>>2]|0;q=a[B>>0]|0;h=h+ -1|0;e=B}e=(c[g>>2]|0)+4|0;c[g>>2]=e;f:do if((e|0)==(f|0))q=f;else{q=e;while(1){if(!(c[q>>2]|0))break f;q=q+4|0;if((q|0)==(f|0)){q=f;break}}}while(0);h=c[k>>2]|0}if((e|0)==(f|0)|(h|0)==(j|0))break a}if((l|0)==46){c[k>>2]=h;g:do if((e|0)!=(c[g>>2]|0))do{f=c[e>>2]|0;l=Yb(c[b>>2]|0)|0;f=ar(h,f)|0;if(l)Yb(l|0)|0;if((f|0)==-1)break g;h=(c[k>>2]|0)+f|0;c[k>>2]=h;e=e+4|0}while((e|0)!=(c[g>>2]|0));while(0);c[g>>2]=e;B=2;i=d;return B|0}else if((l|0)==65){e=c[g>>2]|0;break}else if((l|0)==67){i=d;return g|0}}}else{c[k>>2]=h;c[g>>2]=e}while(0);B=(e|0)!=(f|0)&1;i=d;return B|0}function Co(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;l=i;i=i+1040|0;n=l+16|0;o=l+8|0;m=l;a:do if((e|0)!=(f|0)){r=e;while(1){if(!(a[r>>0]|0))break;r=r+1|0;if((r|0)==(f|0)){r=f;break}}c[k>>2]=h;c[g>>2]=e;if((h|0)!=(j|0)){p=j;b=b+8|0;while(1){t=d;u=c[t+4>>2]|0;q=m;c[q>>2]=c[t>>2];c[q+4>>2]=u;q=r;u=q-e|0;t=Yb(c[b>>2]|0)|0;y=c[g>>2]|0;c[o>>2]=y;s=(h|0)!=0;w=s?p-h>>2:256;x=s?h:n;b:do if((y|0)==0|(w|0)==0)v=0;else{v=0;while(1){z=u>>>2;A=z>>>0>=w>>>0;if(!(A|u>>>0>131))break b;y=A?w:z;u=u-y|0;y=Tp(x,o,y,d)|0;if((y|0)==-1)break;if((x|0)==(n|0))x=n;else{w=w-y|0;x=x+(y<<2)|0}v=y+v|0;y=c[o>>2]|0;if((y|0)==0|(w|0)==0)break b}w=0;y=c[o>>2]|0;v=-1}while(0);c:do if(y){if(!((w|0)==0|(u|0)==0)){while(1){z=Sp(x,y,u,d)|0;if((z+2|0)>>>0<3)break;y=y+z|0;c[o>>2]=y;w=w+ -1|0;v=v+1|0;if((w|0)==0|(u|0)==(z|0))break c;else{u=u-z|0;x=x+4|0}}if(!z){c[o>>2]=0;y=0;break}else if((z|0)==-1){v=-1;break}else{c[d>>2]=0;break}}}else y=0;while(0);if(s)c[g>>2]=y;if(t)Yb(t|0)|0;if(!v){f=2;d=48;break}else if((v|0)==-1){d=26;break}h=(c[k>>2]|0)+(v<<2)|0;c[k>>2]=h;if((h|0)==(j|0)){d=46;break}e=c[g>>2]|0;if((r|0)==(f|0))r=f;else{q=Yb(c[b>>2]|0)|0;e=Sp(h,e,1,d)|0;if(q)Yb(q|0)|0;if(e){f=2;d=48;break}c[k>>2]=(c[k>>2]|0)+4;e=(c[g>>2]|0)+1|0;c[g>>2]=e;d:do if((e|0)==(f|0))r=f;else{r=e;while(1){if(!(a[r>>0]|0))break d;r=r+1|0;if((r|0)==(f|0)){r=f;break}}}while(0);h=c[k>>2]|0}if((e|0)==(f|0)|(h|0)==(j|0))break a}if((d|0)==26){c[k>>2]=h;e:do if((e|0)!=(c[g>>2]|0)){while(1){d=Yb(c[b>>2]|0)|0;n=Sp(h,e,q-e|0,m)|0;if(d)Yb(d|0)|0;if(!n)e=e+1|0;else if((n|0)==-1){d=31;break}else if((n|0)==-2){d=32;break}else e=e+n|0;h=(c[k>>2]|0)+4|0;c[k>>2]=h;if((e|0)==(c[g>>2]|0))break e}if((d|0)==31){c[g>>2]=e;A=2;i=l;return A|0}else if((d|0)==32){c[g>>2]=e;A=1;i=l;return A|0}}while(0);c[g>>2]=e;A=(e|0)!=(f|0)&1;i=l;return A|0}else if((d|0)==46){e=c[g>>2]|0;break}else if((d|0)==48){i=l;return f|0}}}else{c[k>>2]=h;c[g>>2]=e}while(0);A=(e|0)!=(f|0)&1;i=l;return A|0}function Do(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;b=i;c[f>>2]=d;a=Yb(c[a+8>>2]|0)|0;if(!a){i=b;return 0}Yb(a|0)|0;i=b;return 0}function Eo(a){a=a|0;var b=0,d=0;b=i;a=a+8|0;d=Yb(c[a>>2]|0)|0;if(d)Yb(d|0)|0;a=c[a>>2]|0;if(a){a=Yb(a|0)|0;if(!a)a=0;else{Yb(a|0)|0;a=0}}else a=1;i=b;return a|0}function Fo(a){a=a|0;return 0}function Go(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;if((f|0)==0|(d|0)==(e|0)){m=0;i=g;return m|0}h=e;a=a+8|0;b=(b|0)!=0?b:26896;k=0;j=0;while(1){m=Yb(c[a>>2]|0)|0;l=Sp(0,d,h-d|0,b)|0;if(m)Yb(m|0)|0;if(!l){d=d+1|0;l=1}else if((l|0)==-2|(l|0)==-1){f=9;break}else d=d+l|0;k=l+k|0;j=j+1|0;if(j>>>0>=f>>>0|(d|0)==(e|0)){f=9;break}}if((f|0)==9){i=g;return k|0}return 0}function Ho(a){a=a|0;var b=0;b=i;a=c[a+8>>2]|0;if(a){a=Yb(a|0)|0;if(!a)a=4;else{Yb(a|0)|0;a=4}}else a=1;i=b;return a|0}function Io(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Jo(d,f,g,h,j,k,l,m){d=d|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0;f=i;d=h;a:do if(g>>>0<h>>>0){o=g;n=k;while(1){q=b[o>>1]|0;p=q&65535;do if((q&65535)<128){if((l-n|0)<1){h=1;break a}a[n>>0]=q;n=n+1|0}else{if((q&65535)<2048){if((l-n|0)<2){h=1;break a}a[n>>0]=p>>>6|192;a[n+1>>0]=p&63|128;n=n+2|0;break}if((q&65535)<55296){if((l-n|0)<3){h=1;break a}a[n>>0]=p>>>12|224;a[n+1>>0]=p>>>6&63|128;a[n+2>>0]=p&63|128;n=n+3|0;break}if((q&65535)>=56320){if((q&65535)<57344){h=2;break a}if((l-n|0)<3){h=1;break a}a[n>>0]=p>>>12|224;a[n+1>>0]=p>>>6&63|128;a[n+2>>0]=p&63|128;n=n+3|0;break}if((d-o|0)<4){h=1;break a}q=o+2|0;r=e[q>>1]|0;if((r&64512|0)!=56320){h=2;break a}if((l-n|0)<4){h=1;break a}s=p&960;if(((s<<10)+65536|0)>>>0>1114111){h=2;break a}o=(s>>>6)+1|0;a[n>>0]=o>>>2|240;a[n+1>>0]=p>>>2&15|o<<4&48|128;a[n+2>>0]=p<<4&48|r>>>6&15|128;a[n+3>>0]=r&63|128;o=q;n=n+4|0}while(0);o=o+2|0;if(o>>>0>=h>>>0){h=0;break}}}else{h=0;o=g;n=k}while(0);c[j>>2]=g+(o-g>>1<<1);c[m>>2]=k+(n-k);i=f;return h|0}function Ko(e,f,g,h,j,k,l,m){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;f=i;a:do if(g>>>0<h>>>0){o=h;p=l;q=g;e=k;while(1){if(e>>>0>=l>>>0){n=31;break a}s=a[q>>0]|0;r=s&255;do if(s<<24>>24>-1){b[e>>1]=s&255;q=q+1|0}else{if((s&255)<194){h=2;break a}if((s&255)<224){if((o-q|0)<2){h=1;break a}s=d[q+1>>0]|0;if((s&192|0)!=128){h=2;break a}b[e>>1]=s&63|r<<6&1984;q=q+2|0;break}if((s&255)<240){if((o-q|0)<3){h=1;break a}s=a[q+1>>0]|0;t=a[q+2>>0]|0;if((r|0)==237){if((s&-32)<<24>>24!=-128){h=2;break a}}else if((r|0)==224){if((s&-32)<<24>>24!=-96){h=2;break a}}else if((s&-64)<<24>>24!=-128){h=2;break a}t=t&255;if((t&192|0)!=128){h=2;break a}b[e>>1]=(s&255)<<6&4032|r<<12|t&63;q=q+3|0;break}if((s&255)>=245){h=2;break a}if((o-q|0)<4){h=1;break a}s=a[q+1>>0]|0;t=a[q+2>>0]|0;u=a[q+3>>0]|0;if((r|0)==244){if((s&-16)<<24>>24!=-128){h=2;break a}}else if((r|0)==240){if((s+112<<24>>24&255)>=48){h=2;break a}}else if((s&-64)<<24>>24!=-128){h=2;break a}t=t&255;if((t&192|0)!=128){h=2;break a}u=u&255;if((u&192|0)!=128){h=2;break a}if((p-e|0)<4){h=1;break a}r=r&7;s=s&255;if((s<<12&196608|r<<18)>>>0>1114111){h=2;break a}b[e>>1]=s<<2&60|t>>>4&3|((s>>>4&3|r<<2)<<6)+16320|55296;e=e+2|0;b[e>>1]=u&63|t<<6&960|56320;q=q+4|0}while(0);e=e+2|0;if(q>>>0>=h>>>0){n=31;break}}}else{q=g;e=k;n=31}while(0);if((n|0)==31)h=q>>>0<h>>>0&1;c[j>>2]=g+(q-g);c[m>>2]=k+(e-k>>1<<1);i=f;return h|0}function Lo(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;return 3}function Mo(a){a=a|0;return 0}function No(a){a=a|0;return 0}function Oo(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;c=i;a:do if(d>>>0<e>>>0&(f|0)!=0){b=e;h=d;g=0;b:while(1){k=a[h>>0]|0;j=k&255;do if(k<<24>>24>-1)h=h+1|0;else{if((k&255)<194)break a;if((k&255)<224){if((b-h|0)<2)break a;if((a[h+1>>0]&-64)<<24>>24!=-128)break a;h=h+2|0;break}if((k&255)<240){k=h;if((b-k|0)<3)break a;m=a[h+1>>0]|0;l=a[h+2>>0]|0;if((j|0)==237){if((m&-32)<<24>>24!=-128){e=16;break b}}else if((j|0)==224){if((m&-32)<<24>>24!=-96){e=14;break b}}else if((m&-64)<<24>>24!=-128){e=18;break b}if((l&-64)<<24>>24!=-128)break a;h=h+3|0;break}if((k&255)>=245)break a;k=h;if((b-k|0)<4)break a;if((f-g|0)>>>0<2)break a;n=a[h+1>>0]|0;l=a[h+2>>0]|0;m=a[h+3>>0]|0;if((j|0)==240){if((n+112<<24>>24&255)>=48){e=26;break b}}else if((j|0)==244){if((n&-16)<<24>>24!=-128){e=28;break b}}else if((n&-64)<<24>>24!=-128){e=30;break b}if((l&-64)<<24>>24!=-128)break a;if((m&-64)<<24>>24!=-128)break a;if(((n&255)<<12&196608|j<<18&1835008)>>>0>1114111)break a;h=h+4|0;g=g+1|0}while(0);g=g+1|0;if(!(h>>>0<e>>>0&g>>>0<f>>>0))break a}if((e|0)==14){n=k-d|0;i=c;return n|0}else if((e|0)==16){n=k-d|0;i=c;return n|0}else if((e|0)==18){n=k-d|0;i=c;return n|0}else if((e|0)==26){n=k-d|0;i=c;return n|0}else if((e|0)==28){n=k-d|0;i=c;return n|0}else if((e|0)==30){n=k-d|0;i=c;return n|0}}else h=d;while(0);n=h-d|0;i=c;return n|0}function Po(a){a=a|0;return 4}function Qo(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Ro(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0;d=i;a:do if(e>>>0<f>>>0){b=e;l=h;while(1){m=c[b>>2]|0;if((m&-2048|0)==55296|m>>>0>1114111){f=2;break a}do if(m>>>0>=128){if(m>>>0<2048){if((j-l|0)<2){f=1;break a}a[l>>0]=m>>>6|192;a[l+1>>0]=m&63|128;l=l+2|0;break}n=j-l|0;if(m>>>0<65536){if((n|0)<3){f=1;break a}a[l>>0]=m>>>12|224;a[l+1>>0]=m>>>6&63|128;a[l+2>>0]=m&63|128;l=l+3|0;break}else{if((n|0)<4){f=1;break a}a[l>>0]=m>>>18|240;a[l+1>>0]=m>>>12&63|128;a[l+2>>0]=m>>>6&63|128;a[l+3>>0]=m&63|128;l=l+4|0;break}}else{if((j-l|0)<1){f=1;break a}a[l>>0]=m;l=l+1|0}while(0);b=b+4|0;if(b>>>0>=f>>>0){f=0;break}}}else{f=0;b=e;l=h}while(0);c[g>>2]=e+(b-e>>2<<2);c[k>>2]=h+(l-h);i=d;return f|0}function So(b,e,f,g,h,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0;e=i;a:do if(f>>>0<g>>>0){o=g;n=f;b=j;while(1){if(b>>>0>=k>>>0){m=30;break a}q=a[n>>0]|0;p=q&255;do if(q<<24>>24>-1){c[b>>2]=p;n=n+1|0}else{if((q&255)<194){g=2;break a}if((q&255)<224){if((o-n|0)<2){g=1;break a}q=d[n+1>>0]|0;if((q&192|0)!=128){g=2;break a}c[b>>2]=q&63|p<<6&1984;n=n+2|0;break}if((q&255)<240){if((o-n|0)<3){g=1;break a}q=a[n+1>>0]|0;r=a[n+2>>0]|0;if((p|0)==237){if((q&-32)<<24>>24!=-128){g=2;break a}}else if((p|0)==224){if((q&-32)<<24>>24!=-96){g=2;break a}}else if((q&-64)<<24>>24!=-128){g=2;break a}r=r&255;if((r&192|0)!=128){g=2;break a}c[b>>2]=(q&255)<<6&4032|p<<12&61440|r&63;n=n+3|0;break}if((q&255)>=245){g=2;break a}if((o-n|0)<4){g=1;break a}q=a[n+1>>0]|0;r=a[n+2>>0]|0;s=a[n+3>>0]|0;if((p|0)==240){if((q+112<<24>>24&255)>=48){g=2;break a}}else if((p|0)==244){if((q&-16)<<24>>24!=-128){g=2;break a}}else if((q&-64)<<24>>24!=-128){g=2;break a}r=r&255;if((r&192|0)!=128){g=2;break a}s=s&255;if((s&192|0)!=128){g=2;break a}p=(q&255)<<12&258048|p<<18&1835008|r<<6&4032|s&63;if(p>>>0>1114111){g=2;break a}c[b>>2]=p;n=n+4|0}while(0);b=b+4|0;if(n>>>0>=g>>>0){m=30;break}}}else{n=f;b=j;m=30}while(0);if((m|0)==30)g=n>>>0<g>>>0&1;c[h>>2]=f+(n-f);c[l>>2]=j+(b-j>>2<<2);i=e;return g|0}function To(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;return 3}function Uo(a){a=a|0;return 0}function Vo(a){a=a|0;return 0}function Wo(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;c=i;a:do if(d>>>0<e>>>0&(f|0)!=0){g=e;j=d;b=1;b:while(1){k=a[j>>0]|0;h=k&255;do if(k<<24>>24>-1)j=j+1|0;else{if((k&255)<194)break a;if((k&255)<224){if((g-j|0)<2)break a;if((a[j+1>>0]&-64)<<24>>24!=-128)break a;j=j+2|0;break}if((k&255)<240){k=j;if((g-k|0)<3)break a;m=a[j+1>>0]|0;l=a[j+2>>0]|0;if((h|0)==237){if((m&-32)<<24>>24!=-128){e=16;break b}}else if((h|0)==224){if((m&-32)<<24>>24!=-96){e=14;break b}}else if((m&-64)<<24>>24!=-128){e=18;break b}if((l&-64)<<24>>24!=-128)break a;j=j+3|0;break}if((k&255)>=245)break a;k=j;if((g-k|0)<4)break a;m=a[j+1>>0]|0;n=a[j+2>>0]|0;l=a[j+3>>0]|0;if((h|0)==240){if((m+112<<24>>24&255)>=48){e=25;break b}}else if((h|0)==244){if((m&-16)<<24>>24!=-128){e=27;break b}}else if((m&-64)<<24>>24!=-128){e=29;break b}if((n&-64)<<24>>24!=-128)break a;if((l&-64)<<24>>24!=-128)break a;if(((m&255)<<12&196608|h<<18&1835008)>>>0>1114111)break a;j=j+4|0}while(0);if(!(j>>>0<e>>>0&b>>>0<f>>>0))break a;b=b+1|0}if((e|0)==14){n=k-d|0;i=c;return n|0}else if((e|0)==16){n=k-d|0;i=c;return n|0}else if((e|0)==18){n=k-d|0;i=c;return n|0}else if((e|0)==25){n=k-d|0;i=c;return n|0}else if((e|0)==27){n=k-d|0;i=c;return n|0}else if((e|0)==29){n=k-d|0;i=c;return n|0}}else j=d;while(0);n=j-d|0;i=c;return n|0}function Xo(a){a=a|0;return 4}function Yo(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function Zo(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function _o(b){b=b|0;var d=0;d=i;c[b>>2]=19240;if(!(a[b+12>>0]&1)){Uq(b);i=d;return}Uq(c[b+20>>2]|0);Uq(b);i=d;return}function $o(b){b=b|0;var d=0;d=i;c[b>>2]=19240;if(!(a[b+12>>0]&1)){i=d;return}Uq(c[b+20>>2]|0);i=d;return}function ap(b){b=b|0;var d=0;d=i;c[b>>2]=19280;if(!(a[b+16>>0]&1)){Uq(b);i=d;return}Uq(c[b+24>>2]|0);Uq(b);i=d;return}function bp(b){b=b|0;var d=0;d=i;c[b>>2]=19280;if(!(a[b+16>>0]&1)){i=d;return}Uq(c[b+24>>2]|0);i=d;return}function cp(b){b=b|0;return a[b+8>>0]|0}function dp(a){a=a|0;return c[a+8>>2]|0}function ep(b){b=b|0;return a[b+9>>0]|0}function fp(a){a=a|0;return c[a+12>>2]|0}function gp(a,b){a=a|0;b=b|0;var c=0;c=i;Fi(a,b+12|0);i=c;return}function hp(a,b){a=a|0;b=b|0;var c=0;c=i;Fi(a,b+16|0);i=c;return}function ip(b,c){b=b|0;c=c|0;a[b>>0]=8;c=b+1|0;a[c>>0]=116;a[c+1>>0]=114;a[c+2>>0]=117;a[c+3>>0]=101;a[b+5>>0]=0;return}function jp(a,b){a=a|0;b=b|0;var d=0;d=i;b=19312;while(1)if(!(c[b>>2]|0))break;else b=b+4|0;Ri(a,19312,b-19312>>2);i=d;return}function kp(b,c){b=b|0;c=c|0;var d=0;c=i;a[b>>0]=10;d=b+1|0;a[d+0>>0]=a[19336]|0;a[d+1>>0]=a[19337]|0;a[d+2>>0]=a[19338]|0;a[d+3>>0]=a[19339]|0;a[d+4>>0]=a[19340]|0;a[b+6>>0]=0;i=c;return}function lp(a,b){a=a|0;b=b|0;var d=0;d=i;b=19344;while(1)if(!(c[b>>2]|0))break;else b=b+4|0;Ri(a,19344,b-19344>>2);i=d;return}function mp(b){b=b|0;var d=0;b=i;if(a[19376]|0){d=c[4842]|0;i=b;return d|0}if(!(Fa(19376)|0)){d=c[4842]|0;i=b;return d|0}if((a[26544]|0)==0?(Fa(26544)|0)!=0:0){qr(26376,0,168)|0;eb(245,0,o|0)|0;Vc(26544)}Ji(26376,26552,6);Ji(26388,26560,6);Ji(26400,26568,7);Ji(26412,26576,9);Ji(26424,26592,8);Ji(26436,26608,6);Ji(26448,26616,8);Ji(26460,26632,3);Ji(26472,26640,3);Ji(26484,26648,3);Ji(26496,26656,3);Ji(26508,26664,3);Ji(26520,26672,3);Ji(26532,26680,3);c[4842]=26376;Vc(19376);d=c[4842]|0;i=b;return d|0}function np(b){b=b|0;var d=0;b=i;if(a[19392]|0){d=c[4846]|0;i=b;return d|0}if(!(Fa(19392)|0)){d=c[4846]|0;i=b;return d|0}if((a[26008]|0)==0?(Fa(26008)|0)!=0:0){qr(25840,0,168)|0;eb(246,0,o|0)|0;Vc(26008)}Vi(25840,26016);Vi(25852,26048);Vi(25864,26080);Vi(25876,26112);Vi(25888,26152);Vi(25900,26192);Vi(25912,26224);Vi(25924,26264);Vi(25936,26280);Vi(25948,26296);Vi(25960,26312);Vi(25972,26328);Vi(25984,26344);Vi(25996,26360);c[4846]=25840;Vc(19392);d=c[4846]|0;i=b;return d|0}function op(b){b=b|0;var d=0;b=i;if(a[19408]|0){d=c[4850]|0;i=b;return d|0}if(!(Fa(19408)|0)){d=c[4850]|0;i=b;return d|0}if((a[25616]|0)==0?(Fa(25616)|0)!=0:0){qr(25328,0,288)|0;eb(247,0,o|0)|0;Vc(25616)}Ji(25328,25624,7);Ji(25340,25632,8);Ji(25352,25648,5);Ji(25364,25656,5);Ji(25376,25664,3);Ji(25388,25672,4);Ji(25400,25680,4);Ji(25412,25688,6);Ji(25424,25696,9);Ji(25436,25712,7);Ji(25448,25720,8);Ji(25460,25736,8);Ji(25472,25752,3);Ji(25484,25760,3);Ji(25496,25768,3);Ji(25508,25776,3);Ji(25520,25664,3);Ji(25532,25784,3);Ji(25544,25792,3);Ji(25556,25800,3);Ji(25568,25808,3);Ji(25580,25816,3);Ji(25592,25824,3);Ji(25604,25832,3);c[4850]=25328;Vc(19408);d=c[4850]|0;i=b;return d|0}function pp(b){b=b|0;var d=0;b=i;if(a[19424]|0){d=c[4854]|0;i=b;return d|0}if(!(Fa(19424)|0)){d=c[4854]|0;i=b;return d|0}if((a[24776]|0)==0?(Fa(24776)|0)!=0:0){qr(24488,0,288)|0;eb(248,0,o|0)|0;Vc(24776)}Vi(24488,24784);Vi(24500,24816);Vi(24512,24856);Vi(24524,24880);Vi(24536,25200);Vi(24548,24904);Vi(24560,24928);Vi(24572,24952);Vi(24584,24984);Vi(24596,25024);Vi(24608,25056);Vi(24620,25096);Vi(24632,25136);Vi(24644,25152);Vi(24656,25168);Vi(24668,25184);Vi(24680,25200);Vi(24692,25216);Vi(24704,25232);Vi(24716,25248);Vi(24728,25264);Vi(24740,25280);Vi(24752,25296);Vi(24764,25312);c[4854]=24488;Vc(19424);d=c[4854]|0;i=b;return d|0}function qp(b){b=b|0;var d=0;b=i;if(a[19440]|0){d=c[4858]|0;i=b;return d|0}if(!(Fa(19440)|0)){d=c[4858]|0;i=b;return d|0}if((a[24464]|0)==0?(Fa(24464)|0)!=0:0){qr(24176,0,288)|0;eb(249,0,o|0)|0;Vc(24464)}Ji(24176,24472,2);Ji(24188,24480,2);c[4858]=24176;Vc(19440);d=c[4858]|0;i=b;return d|0}function rp(b){b=b|0;var d=0;b=i;if(a[19456]|0){d=c[4862]|0;i=b;return d|0}if(!(Fa(19456)|0)){d=c[4862]|0;i=b;return d|0}if((a[24136]|0)==0?(Fa(24136)|0)!=0:0){qr(23848,0,288)|0;eb(250,0,o|0)|0;Vc(24136)}Vi(23848,24144);Vi(23860,24160);c[4862]=23848;Vc(19456);d=c[4862]|0;i=b;return d|0}function sp(b){b=b|0;var c=0,d=0;b=i;if(a[19480]|0){i=b;return 19464}if(!(Fa(19480)|0)){i=b;return 19464}a[19464]=16;c=19465;d=c;a[d>>0]=37;a[d+1>>0]=109;a[d+2>>0]=47;a[d+3>>0]=37;c=c+4|0;a[c>>0]=100;a[c+1>>0]=47;a[c+2>>0]=37;a[c+3>>0]=121;a[19473]=0;eb(251,19464,o|0)|0;Vc(19480);i=b;return 19464}function tp(b){b=b|0;var d=0;b=i;if(a[19504]|0){i=b;return 19488}if(!(Fa(19504)|0)){i=b;return 19488}else d=19512;while(1)if(!(c[d>>2]|0))break;else d=d+4|0;Ri(19488,19512,d-19512>>2);eb(252,19488,o|0)|0;Vc(19504);i=b;return 19488}function up(b){b=b|0;var c=0,d=0;b=i;if(a[19568]|0){i=b;return 19552}if(!(Fa(19568)|0)){i=b;return 19552}a[19552]=16;c=19553;d=c;a[d>>0]=37;a[d+1>>0]=72;a[d+2>>0]=58;a[d+3>>0]=37;c=c+4|0;a[c>>0]=77;a[c+1>>0]=58;a[c+2>>0]=37;a[c+3>>0]=83;a[19561]=0;eb(251,19552,o|0)|0;Vc(19568);i=b;return 19552}function vp(b){b=b|0;var d=0;b=i;if(a[19592]|0){i=b;return 19576}if(!(Fa(19592)|0)){i=b;return 19576}else d=19600;while(1)if(!(c[d>>2]|0))break;else d=d+4|0;Ri(19576,19600,d-19600>>2);eb(252,19576,o|0)|0;Vc(19592);i=b;return 19576}function wp(b){b=b|0;var d=0,e=0,f=0,g=0;b=i;if(a[19656]|0){i=b;return 19640}if(!(Fa(19656)|0)){i=b;return 19640}e=$p(32)|0;c[4912]=e;c[4910]=33;c[4911]=20;g=e+0|0;f=19664;d=g+20|0;do{a[g>>0]=a[f>>0]|0;g=g+1|0;f=f+1|0}while((g|0)<(d|0));a[e+20>>0]=0;eb(251,19640,o|0)|0;Vc(19656);i=b;return 19640}function xp(b){b=b|0;var d=0;b=i;if(a[19704]|0){i=b;return 19688}if(!(Fa(19704)|0)){i=b;return 19688}else d=19712;while(1)if(!(c[d>>2]|0))break;else d=d+4|0;Ri(19688,19712,d-19712>>2);eb(252,19688,o|0)|0;Vc(19704);i=b;return 19688}function yp(b){b=b|0;var d=0,e=0,f=0,g=0;b=i;if(a[19816]|0){i=b;return 19800}if(!(Fa(19816)|0)){i=b;return 19800}e=$p(16)|0;c[4952]=e;c[4950]=17;c[4951]=11;g=e+0|0;f=19824;d=g+11|0;do{a[g>>0]=a[f>>0]|0;g=g+1|0;f=f+1|0}while((g|0)<(d|0));a[e+11>>0]=0;eb(251,19800,o|0)|0;Vc(19816);i=b;return 19800}function zp(b){b=b|0;var d=0;b=i;if(a[19856]|0){i=b;return 19840}if(!(Fa(19856)|0)){i=b;return 19840}else d=19864;while(1)if(!(c[d>>2]|0))break;else d=d+4|0;Ri(19840,19864,d-19864>>2);eb(252,19840,o|0)|0;Vc(19856);i=b;return 19840}function Ap(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0.0;e=i;i=i+16|0;f=e;do if((a|0)!=(b|0)){g=Uc()|0;h=c[g>>2]|0;c[g>>2]=0;Dk()|0;j=+hr(a,f);a=c[g>>2]|0;if(!a)c[g>>2]=h;if((c[f>>2]|0)!=(b|0)){c[d>>2]=4;j=0.0;break}if((a|0)==34)c[d>>2]=4}else{c[d>>2]=4;j=0.0}while(0);i=e;return+j}function Bp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0.0;e=i;i=i+16|0;f=e;do if((a|0)!=(b|0)){g=Uc()|0;h=c[g>>2]|0;c[g>>2]=0;Dk()|0;j=+hr(a,f);a=c[g>>2]|0;if(!a)c[g>>2]=h;if((c[f>>2]|0)!=(b|0)){c[d>>2]=4;j=0.0;break}if((a|0)==34)c[d>>2]=4}else{c[d>>2]=4;j=0.0}while(0);i=e;return+j}function Cp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0.0;e=i;i=i+16|0;f=e;if((a|0)==(b|0)){c[d>>2]=4;j=0.0;i=e;return+j}g=Uc()|0;h=c[g>>2]|0;c[g>>2]=0;Dk()|0;j=+hr(a,f);a=c[g>>2]|0;if(!a)c[g>>2]=h;if((c[f>>2]|0)!=(b|0)){c[d>>2]=4;j=0.0;i=e;return+j}if((a|0)==34)c[d>>2]=4;i=e;return+j}function Dp(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0;g=i;i=i+16|0;h=g;do if((b|0)!=(d|0)){if((a[b>>0]|0)==45){c[e>>2]=4;e=0;f=0;break}j=Uc()|0;k=c[j>>2]|0;c[j>>2]=0;Dk()|0;f=Qp(b,h,f)|0;b=c[j>>2]|0;if(!b)c[j>>2]=k;if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;e=0;f=0;break}if((b|0)==34){c[e>>2]=4;e=-1;f=-1}else e=H}else{c[e>>2]=4;e=0;f=0}while(0);H=e;i=g;return f|0}function Ep(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0;k=i;i=i+16|0;h=k;if((b|0)==(d|0)){c[e>>2]=4;l=0;i=k;return l|0}if((a[b>>0]|0)==45){c[e>>2]=4;l=0;i=k;return l|0}j=Uc()|0;g=c[j>>2]|0;c[j>>2]=0;Dk()|0;l=Qp(b,h,f)|0;f=H;b=c[j>>2]|0;if(!b)c[j>>2]=g;if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;l=0;i=k;return l|0}if((b|0)==34|(f>>>0>0|(f|0)==0&l>>>0>4294967295)){c[e>>2]=4;l=-1;i=k;return l|0}else{i=k;return l|0}return 0}function Fp(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0;k=i;i=i+16|0;h=k;if((b|0)==(d|0)){c[e>>2]=4;l=0;i=k;return l|0}if((a[b>>0]|0)==45){c[e>>2]=4;l=0;i=k;return l|0}j=Uc()|0;g=c[j>>2]|0;c[j>>2]=0;Dk()|0;l=Qp(b,h,f)|0;f=H;b=c[j>>2]|0;if(!b)c[j>>2]=g;if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;l=0;i=k;return l|0}if((b|0)==34|(f>>>0>0|(f|0)==0&l>>>0>4294967295)){c[e>>2]=4;l=-1;i=k;return l|0}else{i=k;return l|0}return 0}function Gp(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0;k=i;i=i+16|0;h=k;if((b|0)==(d|0)){c[e>>2]=4;l=0;i=k;return l|0}if((a[b>>0]|0)==45){c[e>>2]=4;l=0;i=k;return l|0}j=Uc()|0;g=c[j>>2]|0;c[j>>2]=0;Dk()|0;l=Qp(b,h,f)|0;f=H;b=c[j>>2]|0;if(!b)c[j>>2]=g;if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;l=0;i=k;return l|0}if((b|0)==34|(f>>>0>0|(f|0)==0&l>>>0>65535)){c[e>>2]=4;l=-1;i=k;return l|0}else{l=l&65535;i=k;return l|0}return 0}function Hp(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;j=i;i=i+16|0;g=j;if((a|0)==(b|0)){c[d>>2]=4;e=0;k=0;H=e;i=j;return k|0}h=Uc()|0;f=c[h>>2]|0;c[h>>2]=0;Dk()|0;e=Rp(a,g,e)|0;a=H;k=c[h>>2]|0;if(!k)c[h>>2]=f;if((c[g>>2]|0)!=(b|0)){c[d>>2]=4;e=0;k=0;H=e;i=j;return k|0}if((k|0)==34){c[d>>2]=4;k=(a|0)>0|(a|0)==0&e>>>0>0;H=k?2147483647:-2147483648;i=j;return(k?-1:0)|0}else{k=e;H=a;i=j;return k|0}return 0}function Ip(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;j=i;i=i+16|0;g=j;if((a|0)==(b|0)){c[d>>2]=4;k=0;i=j;return k|0}h=Uc()|0;f=c[h>>2]|0;c[h>>2]=0;Dk()|0;e=Rp(a,g,e)|0;a=H;k=c[h>>2]|0;if(!k)c[h>>2]=f;if((c[g>>2]|0)!=(b|0)){c[d>>2]=4;k=0;i=j;return k|0}do if((k|0)==34){c[d>>2]=4;if((a|0)>0|(a|0)==0&e>>>0>0){k=2147483647;i=j;return k|0}}else{if((a|0)<-1|(a|0)==-1&e>>>0<2147483648){c[d>>2]=4;break}if((a|0)>0|(a|0)==0&e>>>0>2147483647){c[d>>2]=4;k=2147483647;i=j;return k|0}else{k=e;i=j;return k|0}}while(0);k=-2147483648;i=j;return k|0}function Jp(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;e=c[b>>2]|0;if(!e){i=d;return}f=b+4|0;g=c[f>>2]|0;if((g|0)!=(e|0))c[f>>2]=g+(~((g+ -4+(0-e)|0)>>>2)<<2);if((b+16|0)==(e|0)){a[b+128>>0]=0;i=d;return}else{Uq(e);i=d;return}}function Kp(b){b=b|0;b=i;if(a[24124]&1)Uq(c[6033]|0);if(a[24112]&1)Uq(c[6030]|0);if(a[24100]&1)Uq(c[6027]|0);if(a[24088]&1)Uq(c[6024]|0);if(a[24076]&1)Uq(c[6021]|0);if(a[24064]&1)Uq(c[6018]|0);if(a[24052]&1)Uq(c[6015]|0);if(a[24040]&1)Uq(c[6012]|0);if(a[24028]&1)Uq(c[6009]|0);if(a[24016]&1)Uq(c[6006]|0);if(a[24004]&1)Uq(c[6003]|0);if(a[23992]&1)Uq(c[6e3]|0);if(a[23980]&1)Uq(c[5997]|0);if(a[23968]&1)Uq(c[5994]|0);if(a[23956]&1)Uq(c[5991]|0);if(a[23944]&1)Uq(c[5988]|0);if(a[23932]&1)Uq(c[5985]|0);if(a[23920]&1)Uq(c[5982]|0);if(a[23908]&1)Uq(c[5979]|0);if(a[23896]&1)Uq(c[5976]|0);if(a[23884]&1)Uq(c[5973]|0);if(a[23872]&1)Uq(c[5970]|0);if(a[23860]&1)Uq(c[5967]|0);if(!(a[23848]&1)){i=b;return}Uq(c[5964]|0);i=b;return}function Lp(b){b=b|0;b=i;if(a[24452]&1)Uq(c[6115]|0);if(a[24440]&1)Uq(c[6112]|0);if(a[24428]&1)Uq(c[6109]|0);if(a[24416]&1)Uq(c[6106]|0);if(a[24404]&1)Uq(c[6103]|0);if(a[24392]&1)Uq(c[6100]|0);if(a[24380]&1)Uq(c[6097]|0);if(a[24368]&1)Uq(c[6094]|0);if(a[24356]&1)Uq(c[6091]|0);if(a[24344]&1)Uq(c[6088]|0);if(a[24332]&1)Uq(c[6085]|0);if(a[24320]&1)Uq(c[6082]|0);if(a[24308]&1)Uq(c[6079]|0);if(a[24296]&1)Uq(c[6076]|0);if(a[24284]&1)Uq(c[6073]|0);if(a[24272]&1)Uq(c[6070]|0);if(a[24260]&1)Uq(c[6067]|0);if(a[24248]&1)Uq(c[6064]|0);if(a[24236]&1)Uq(c[6061]|0);if(a[24224]&1)Uq(c[6058]|0);if(a[24212]&1)Uq(c[6055]|0);if(a[24200]&1)Uq(c[6052]|0);if(a[24188]&1)Uq(c[6049]|0);if(!(a[24176]&1)){i=b;return}Uq(c[6046]|0);i=b;return}



function Mp(b){b=b|0;b=i;if(a[24764]&1)Uq(c[6193]|0);if(a[24752]&1)Uq(c[6190]|0);if(a[24740]&1)Uq(c[6187]|0);if(a[24728]&1)Uq(c[6184]|0);if(a[24716]&1)Uq(c[6181]|0);if(a[24704]&1)Uq(c[6178]|0);if(a[24692]&1)Uq(c[6175]|0);if(a[24680]&1)Uq(c[6172]|0);if(a[24668]&1)Uq(c[6169]|0);if(a[24656]&1)Uq(c[6166]|0);if(a[24644]&1)Uq(c[6163]|0);if(a[24632]&1)Uq(c[6160]|0);if(a[24620]&1)Uq(c[6157]|0);if(a[24608]&1)Uq(c[6154]|0);if(a[24596]&1)Uq(c[6151]|0);if(a[24584]&1)Uq(c[6148]|0);if(a[24572]&1)Uq(c[6145]|0);if(a[24560]&1)Uq(c[6142]|0);if(a[24548]&1)Uq(c[6139]|0);if(a[24536]&1)Uq(c[6136]|0);if(a[24524]&1)Uq(c[6133]|0);if(a[24512]&1)Uq(c[6130]|0);if(a[24500]&1)Uq(c[6127]|0);if(!(a[24488]&1)){i=b;return}Uq(c[6124]|0);i=b;return}function Np(b){b=b|0;b=i;if(a[25604]&1)Uq(c[6403]|0);if(a[25592]&1)Uq(c[6400]|0);if(a[25580]&1)Uq(c[6397]|0);if(a[25568]&1)Uq(c[6394]|0);if(a[25556]&1)Uq(c[6391]|0);if(a[25544]&1)Uq(c[6388]|0);if(a[25532]&1)Uq(c[6385]|0);if(a[25520]&1)Uq(c[6382]|0);if(a[25508]&1)Uq(c[6379]|0);if(a[25496]&1)Uq(c[6376]|0);if(a[25484]&1)Uq(c[6373]|0);if(a[25472]&1)Uq(c[6370]|0);if(a[25460]&1)Uq(c[6367]|0);if(a[25448]&1)Uq(c[6364]|0);if(a[25436]&1)Uq(c[6361]|0);if(a[25424]&1)Uq(c[6358]|0);if(a[25412]&1)Uq(c[6355]|0);if(a[25400]&1)Uq(c[6352]|0);if(a[25388]&1)Uq(c[6349]|0);if(a[25376]&1)Uq(c[6346]|0);if(a[25364]&1)Uq(c[6343]|0);if(a[25352]&1)Uq(c[6340]|0);if(a[25340]&1)Uq(c[6337]|0);if(!(a[25328]&1)){i=b;return}Uq(c[6334]|0);i=b;return}function Op(b){b=b|0;b=i;if(a[25996]&1)Uq(c[6501]|0);if(a[25984]&1)Uq(c[6498]|0);if(a[25972]&1)Uq(c[6495]|0);if(a[25960]&1)Uq(c[6492]|0);if(a[25948]&1)Uq(c[6489]|0);if(a[25936]&1)Uq(c[6486]|0);if(a[25924]&1)Uq(c[6483]|0);if(a[25912]&1)Uq(c[6480]|0);if(a[25900]&1)Uq(c[6477]|0);if(a[25888]&1)Uq(c[6474]|0);if(a[25876]&1)Uq(c[6471]|0);if(a[25864]&1)Uq(c[6468]|0);if(a[25852]&1)Uq(c[6465]|0);if(!(a[25840]&1)){i=b;return}Uq(c[6462]|0);i=b;return}function Pp(b){b=b|0;b=i;if(a[26532]&1)Uq(c[6635]|0);if(a[26520]&1)Uq(c[6632]|0);if(a[26508]&1)Uq(c[6629]|0);if(a[26496]&1)Uq(c[6626]|0);if(a[26484]&1)Uq(c[6623]|0);if(a[26472]&1)Uq(c[6620]|0);if(a[26460]&1)Uq(c[6617]|0);if(a[26448]&1)Uq(c[6614]|0);if(a[26436]&1)Uq(c[6611]|0);if(a[26424]&1)Uq(c[6608]|0);if(a[26412]&1)Uq(c[6605]|0);if(a[26400]&1)Uq(c[6602]|0);if(a[26388]&1)Uq(c[6599]|0);if(!(a[26376]&1)){i=b;return}Uq(c[6596]|0);i=b;return}function Qp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+112|0;g=e;c[g>>2]=0;f=g+4|0;c[f>>2]=a;c[g+44>>2]=a;if((a|0)<0){c[g+8>>2]=-1;j=-1}else{j=a+2147483647|0;c[g+8>>2]=j}c[g+76>>2]=-1;c[g+104>>2]=0;h=g+108|0;c[h>>2]=j-a;c[g+100>>2]=j;d=Xq(g,d,1,-1,-1)|0;j=H;if(!b){H=j;i=e;return d|0}c[b>>2]=a+((c[f>>2]|0)+(c[h>>2]|0)-(c[g+8>>2]|0));H=j;i=e;return d|0}function Rp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+112|0;g=e;c[g>>2]=0;f=g+4|0;c[f>>2]=a;c[g+44>>2]=a;if((a|0)<0){c[g+8>>2]=-1;j=-1}else{j=a+2147483647|0;c[g+8>>2]=j}c[g+76>>2]=-1;c[g+104>>2]=0;h=g+108|0;c[h>>2]=j-a;c[g+100>>2]=j;d=Xq(g,d,1,0,-2147483648)|0;j=H;if(!b){H=j;i=e;return d|0}c[b>>2]=a+((c[f>>2]|0)+(c[h>>2]|0)-(c[g+8>>2]|0));H=j;i=e;return d|0}function Sp(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0;g=i;i=i+16|0;h=g;c[h>>2]=b;f=(f|0)==0?26904:f;j=c[f>>2]|0;a:do if(!d){if(!j){k=0;i=g;return k|0}}else{if(!b)c[h>>2]=h;else h=b;if(!e){k=-2;i=g;return k|0}do if(!j){b=a[d>>0]|0;j=b&255;if(b<<24>>24>-1){c[h>>2]=j;k=b<<24>>24!=0&1;i=g;return k|0}else{j=j+ -194|0;if(j>>>0>50)break a;b=e+ -1|0;j=c[26688+(j<<2)>>2]|0;d=d+1|0;break}}else b=e;while(0);b:do if(b){k=a[d>>0]|0;l=(k&255)>>>3;if((l+ -16|l+(j>>26))>>>0>7)break a;while(1){d=d+1|0;j=(k&255)+ -128|j<<6;b=b+ -1|0;if((j|0)>=0)break;if(!b)break b;k=a[d>>0]|0;if(((k&255)+ -128|0)>>>0>63)break a}c[f>>2]=0;c[h>>2]=j;l=e-b|0;i=g;return l|0}while(0);c[f>>2]=j;l=-2;i=g;return l|0}while(0);c[f>>2]=0;c[(Uc()|0)>>2]=84;l=-1;i=g;return l|0}function Tp(b,e,f,g){b=b|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0;h=i;k=c[e>>2]|0;if((g|0)!=0?(l=c[g>>2]|0,(l|0)!=0):0)if(!b){j=f;g=16}else{c[g>>2]=0;j=f;g=36}else if(!b){j=f;g=7}else{j=f;g=6}a:while(1)if((g|0)==6){if(!j){g=26;break}while(1){g=a[k>>0]|0;b:do if(((g&255)+ -1|0)>>>0<127?(k&3|0)==0&j>>>0>4:0){do{g=c[k>>2]|0;if((g+ -16843009|g)&-2139062144){g=g&255;break b}c[b>>2]=g&255;c[b+4>>2]=d[k+1>>0];c[b+8>>2]=d[k+2>>0];l=k;k=k+4|0;m=b;b=b+16|0;c[m+12>>2]=d[l+3>>0];j=j+ -4|0}while(j>>>0>4);g=a[k>>0]|0}while(0);l=g&255;if((l+ -1|0)>>>0>=127)break;k=k+1|0;c[b>>2]=l;j=j+ -1|0;if(!j){g=26;break a}else b=b+4|0}l=l+ -194|0;if(l>>>0>50){l=g;g=48;break}l=c[26688+(l<<2)>>2]|0;k=k+1|0;g=36;continue}else if((g|0)==7){l=a[k>>0]|0;if(((l&255)+ -1|0)>>>0<127?(k&3|0)==0:0){l=c[k>>2]|0;if(!((l+ -16843009|l)&-2139062144))do{k=k+4|0;j=j+ -4|0;l=c[k>>2]|0}while(((l+ -16843009|l)&-2139062144|0)==0);g=l&255;l=l&255}else g=l;l=l&255;if((l+ -1|0)>>>0<127){j=j+ -1|0;k=k+1|0;g=7;continue}l=l+ -194|0;if(l>>>0>50){l=g;g=48;break}l=c[26688+(l<<2)>>2]|0;k=k+1|0;g=16;continue}else if((g|0)==16){m=(d[k>>0]|0)>>>3;if((m+ -16|m+(l>>26))>>>0>7){g=17;break}g=k+1|0;if(l&33554432){if(((d[g>>0]|0)+ -128|0)>>>0>63){g=20;break}g=k+2|0;if(!(l&524288))k=g;else{if(((d[g>>0]|0)+ -128|0)>>>0>63){g=23;break}k=k+3|0}}else k=g;j=j+ -1|0;g=7;continue}else if((g|0)==36){m=d[k>>0]|0;g=m>>>3;if((g+ -16|g+(l>>26))>>>0>7){g=37;break}g=k+1|0;l=m+ -128|l<<6;if((l|0)<0){m=(d[g>>0]|0)+ -128|0;if(m>>>0>63){g=40;break}g=k+2|0;l=m|l<<6;if((l|0)<0){g=(d[g>>0]|0)+ -128|0;if(g>>>0>63){g=43;break}l=g|l<<6;k=k+3|0}else k=g}else k=g;c[b>>2]=l;b=b+4|0;j=j+ -1|0;g=6;continue}if((g|0)==17){k=k+ -1|0;g=46}else if((g|0)==20){k=k+ -1|0;g=46}else if((g|0)==23){k=k+ -1|0;g=46}else if((g|0)==26){c[e>>2]=k;m=f;i=h;return m|0}else if((g|0)==37){k=k+ -1|0;g=46}else if((g|0)==40){k=k+ -1|0;g=46}else if((g|0)==43){k=k+ -1|0;g=46}if((g|0)==46)if(!l){l=a[k>>0]|0;g=48}if((g|0)==48)if(!(l<<24>>24)){if(b){c[b>>2]=0;c[e>>2]=0}m=f-j|0;i=h;return m|0}c[(Uc()|0)>>2]=84;if(!b){m=-1;i=h;return m|0}c[e>>2]=k;m=-1;i=h;return m|0}function Up(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;i=i+16|0;f=e;c[f>>2]=d;d=Vp(a,b,f)|0;i=e;return d|0}function Vp(e,f,j){e=e|0;f=f|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0.0;l=i;i=i+416|0;q=l+128|0;o=l+120|0;m=l+145|0;n=l+112|0;p=l+144|0;r=l;s=r+0|0;t=s+112|0;do{c[s>>2]=0;s=s+4|0}while((s|0)<(t|0));c[r+32>>2]=26;c[r+44>>2]=e;c[r+76>>2]=-1;c[r+84>>2]=e;C=a[f>>0]|0;if(!(C<<24>>24)){O=0;i=l;return O|0}A=r+4|0;e=r+100|0;z=r+108|0;B=r+8|0;v=m+10|0;u=m+33|0;t=o+4|0;x=m+46|0;w=m+94|0;y=r+104|0;s=0;D=0;J=0;I=0;a:while(1){b:do if(C<<24>>24!=32?((C&255)+ -9|0)>>>0>=5:0){C=C<<24>>24==37;c:do if(C){G=f+1|0;E=a[G>>0]|0;do if(E<<24>>24==42){C=0;G=f+2|0}else if(E<<24>>24==37)break c;else{E=(E&255)+ -48|0;if(E>>>0<10?(a[f+2>>0]|0)==36:0){c[q>>2]=c[j>>2];while(1){O=c[q>>2]|0;C=c[O>>2]|0;c[q>>2]=O+4;if(E>>>0>1)E=E+ -1|0;else break}G=f+3|0;break}O=c[j>>2]|0;C=c[O>>2]|0;c[j>>2]=O+4}while(0);F=a[G>>0]|0;f=F&255;if((f+ -48|0)>>>0<10){E=0;do{E=(E*10|0)+ -48+f|0;G=G+1|0;F=a[G>>0]|0;f=F&255}while((f+ -48|0)>>>0<10)}else E=0;if(F<<24>>24==109){G=G+1|0;F=a[G>>0]|0;f=(C|0)!=0&1;J=0;I=0}else f=0;K=G+1|0;switch(F&255|0){case 110:case 112:case 67:case 83:case 91:case 99:case 115:case 88:case 71:case 70:case 69:case 65:case 103:case 102:case 101:case 97:case 120:case 117:case 111:case 105:case 100:{F=0;break};case 106:{G=K;F=3;break};case 108:{F=(a[K>>0]|0)==108;G=F?G+2|0:K;F=F?3:1;break};case 116:case 122:{G=K;F=1;break};case 104:{F=(a[K>>0]|0)==104;G=F?G+2|0:K;F=F?-2:-1;break};case 76:{G=K;F=2;break};default:{k=169;break a}}M=d[G>>0]|0;K=(M&47|0)==3;M=K?M|32:M;K=K?1:F;if((M|0)==110){if(!C)break b;switch(K|0){case 1:{c[C>>2]=D;break b};case-2:{a[C>>0]=D;break b};case 3:{O=C;c[O>>2]=D;c[O+4>>2]=((D|0)<0)<<31>>31;break b};case-1:{b[C>>1]=D;break b};case 0:{c[C>>2]=D;break b};default:break b}}else if((M|0)==99)E=(E|0)<1?1:E;else if((M|0)!=91){c[y>>2]=0;F=c[B>>2]|0;L=c[A>>2]|0;c[z>>2]=F-L;c[e>>2]=F;while(1){if(L>>>0<F>>>0){c[A>>2]=L+1;F=d[L>>0]|0}else F=_q(r)|0;if(!((F|0)==32|(F+ -9|0)>>>0<5))break;L=c[A>>2]|0;F=c[e>>2]|0}F=c[A>>2]|0;if(c[e>>2]|0){F=F+ -1|0;c[A>>2]=F}D=(c[z>>2]|0)+D+F-(c[B>>2]|0)|0}c[y>>2]=E;L=c[B>>2]|0;F=c[A>>2]|0;O=L-F|0;c[z>>2]=O;if((E|0)!=0&(O|0)>(E|0))L=F+E|0;c[e>>2]=L;if(F>>>0<L>>>0)c[A>>2]=F+1;else{if((_q(r)|0)<0){k=169;break a}L=c[e>>2]|0}if(L)c[A>>2]=(c[A>>2]|0)+ -1;d:do switch(M|0){case 111:{E=8;k=151;break};case 117:case 100:{E=10;k=151;break};case 105:{E=0;k=151;break};case 71:case 103:case 70:case 102:case 69:case 101:case 65:case 97:{P=+Yq(r,K,0);if((c[z>>2]|0)==((c[B>>2]|0)-(c[A>>2]|0)|0))break a;if(C)if(!K){g[C>>2]=P;break d}else if((K|0)==1){h[C>>3]=P;break d}else if((K|0)==2){h[C>>3]=P;break d}else break d;break};case 120:case 88:case 112:{E=16;k=151;break};case 91:case 99:case 115:{F=(M|0)==99;e:do if((M&239|0)==99){qr(m|0,-1,257)|0;a[m>>0]=0;if((M|0)==115){a[u>>0]=0;a[v+0>>0]=0;a[v+1>>0]=0;a[v+2>>0]=0;a[v+3>>0]=0;a[v+4>>0]=0}}else{O=G+1|0;N=(a[O>>0]|0)==94;M=N&1;G=N?G+2|0:O;qr(m|0,N&1|0,257)|0;a[m>>0]=0;N=a[G>>0]|0;if(N<<24>>24==93){M=(M^1)&255;a[w>>0]=M;G=G+1|0}else if(N<<24>>24==45){M=(M^1)&255;a[x>>0]=M;G=G+1|0}else M=(M^1)&255;while(1){O=a[G>>0]|0;if(O<<24>>24==93)break e;else if(!(O<<24>>24)){k=169;break a}else if(O<<24>>24==45){N=G+1|0;O=a[N>>0]|0;if(!(O<<24>>24==93|O<<24>>24==0)){G=a[G+ -1>>0]|0;if((G&255)<(O&255)){G=G&255;do{G=G+1|0;a[m+G>>0]=M;O=a[N>>0]|0}while((G|0)<(O&255|0));G=N}else G=N}else O=45}a[m+((O&255)+1)>>0]=M;G=G+1|0}}while(0);N=F?E+1|0:31;J=(K|0)==1;I=(f|0)!=0;f:do if(J){if(I){K=Tq(N<<2)|0;if(!K){J=0;I=K;k=169;break a}}else K=C;c[o>>2]=0;c[t>>2]=0;M=0;L=N;g:while(1){if(!K){N=I&(M|0)==(L|0);while(1){O=c[A>>2]|0;if(O>>>0<(c[e>>2]|0)>>>0){c[A>>2]=O+1;O=d[O>>0]|0}else O=_q(r)|0;if(!(a[m+(O+1)>>0]|0)){K=0;break g}a[p>>0]=O;O=Sp(n,p,1,o)|0;if((O|0)==-1){J=0;I=0;k=169;break a}else if((O|0)==-2)continue;if(N)break}}else{if(!I){k=105;break}while(1){while(1){N=c[A>>2]|0;if(N>>>0<(c[e>>2]|0)>>>0){c[A>>2]=N+1;N=d[N>>0]|0}else N=_q(r)|0;if(!(a[m+(N+1)>>0]|0))break g;a[p>>0]=N;N=Sp(n,p,1,o)|0;if((N|0)==-1){J=0;I=K;k=169;break a}else if((N|0)!=-2)break}c[K+(M<<2)>>2]=c[n>>2];M=M+1|0;if((M|0)==(L|0)){M=L;break}}}L=L<<1|1;N=Vq(K,L<<2)|0;if(!N){J=0;I=K;k=169;break a}K=N}h:do if((k|0)==105)while(1){k=0;while(1){L=c[A>>2]|0;if(L>>>0<(c[e>>2]|0)>>>0){c[A>>2]=L+1;L=d[L>>0]|0}else L=_q(r)|0;if(!(a[m+(L+1)>>0]|0))break h;a[p>>0]=L;L=Sp(n,p,1,o)|0;if((L|0)==-1){f=0;J=0;I=K;k=169;break a}else if((L|0)!=-2)break}c[K+(M<<2)>>2]=c[n>>2];M=M+1|0;k=105}while(0);if(!(c[o>>2]|0))L=0;else{J=0;I=K;k=169;break a}}else{if(I){L=Tq(N)|0;if(!L){J=0;I=0;k=169;break a}else{M=0;K=N}while(1){do{N=c[A>>2]|0;if(N>>>0<(c[e>>2]|0)>>>0){c[A>>2]=N+1;N=d[N>>0]|0}else N=_q(r)|0;if(!(a[m+(N+1)>>0]|0)){K=0;break f}a[L+M>>0]=N;M=M+1|0}while((M|0)!=(K|0));M=K<<1|1;N=Vq(L,M)|0;if(!N){J=L;I=0;k=169;break a}else{O=K;K=M;L=N;M=O}}}if(!C)while(1){K=c[A>>2]|0;if(K>>>0<L>>>0){c[A>>2]=K+1;K=d[K>>0]|0}else K=_q(r)|0;if(!(a[m+(K+1)>>0]|0)){M=0;L=0;K=0;break f}L=c[e>>2]|0}else{M=0;while(1){K=c[A>>2]|0;if(K>>>0<L>>>0){c[A>>2]=K+1;K=d[K>>0]|0}else K=_q(r)|0;if(!(a[m+(K+1)>>0]|0)){L=C;K=0;break f}a[C+M>>0]=K;L=c[e>>2]|0;M=M+1|0}}}while(0);N=c[A>>2]|0;if(c[e>>2]|0){N=N+ -1|0;c[A>>2]=N}N=N-(c[B>>2]|0)+(c[z>>2]|0)|0;if(!N){J=L;I=K;break a}if(!((N|0)==(E|0)|F^1)){J=L;I=K;break a}do if(I)if(J){c[C>>2]=K;break}else{c[C>>2]=L;break}while(0);if(F){J=L;I=K}else{if(K)c[K+(M<<2)>>2]=0;if(!L){J=0;I=K;break d}a[L+M>>0]=0;J=L;I=K}break};default:{}}while(0);i:do if((k|0)==151){k=0;E=Xq(r,E,0,-1,-1)|0;if((c[z>>2]|0)==((c[B>>2]|0)-(c[A>>2]|0)|0))break a;f=(C|0)==0;if(!((M|0)!=112|f)){c[C>>2]=E;break}if(!f)switch(K|0){case-2:{a[C>>0]=E;break i};case-1:{b[C>>1]=E;break i};case 0:{c[C>>2]=E;break i};case 1:{c[C>>2]=E;break i};case 3:{O=C;c[O>>2]=E;c[O+4>>2]=H;break i};default:break i}}while(0);s=((C|0)!=0&1)+s|0;D=(c[z>>2]|0)+D+(c[A>>2]|0)-(c[B>>2]|0)|0;break b}while(0);G=f+(C&1)|0;c[y>>2]=0;O=c[B>>2]|0;C=c[A>>2]|0;c[z>>2]=O-C;c[e>>2]=O;if(C>>>0<O>>>0){c[A>>2]=C+1;C=d[C>>0]|0}else C=_q(r)|0;if((C|0)!=(d[G>>0]|0)){k=22;break a}D=D+1|0}else{G=f;k=5}while(0);if((k|0)==5){while(1){k=0;f=G+1|0;C=a[f>>0]|0;if(C<<24>>24==32){G=f;k=5;continue}if(((C&255)+ -9|0)>>>0<5){G=f;k=5}else break}c[y>>2]=0;f=c[B>>2]|0;C=c[A>>2]|0;c[z>>2]=f-C;c[e>>2]=f;while(1){if(C>>>0<f>>>0){c[A>>2]=C+1;C=d[C>>0]|0}else C=_q(r)|0;if(!((C|0)==32|(C+ -9|0)>>>0<5))break;C=c[A>>2]|0;f=c[e>>2]|0}C=c[A>>2]|0;if(c[e>>2]|0){C=C+ -1|0;c[A>>2]=C}D=(c[z>>2]|0)+D+C-(c[B>>2]|0)|0}f=G+1|0;C=a[f>>0]|0;if(!(C<<24>>24)){k=172;break}}if((k|0)==172){i=l;return s|0}if((k|0)==22){if(c[e>>2]|0)c[A>>2]=(c[A>>2]|0)+ -1;if((C|0)<0){f=0;k=169}else{O=s;i=l;return O|0}}if((k|0)==169)s=(((s|0)==0)<<31>>31)+s|0;if(!f){O=s;i=l;return O|0}Uq(J);Uq(I);O=s;i=l;return O|0}function Wp(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;h=i;g=b+84|0;f=c[g>>2]|0;k=e+256|0;j=f;o=(k|0)==0;a:do if((j&3|0)==0|o){m=k;n=f;l=4}else{m=k;n=f;while(1){if(!(a[n>>0]|0))break a;n=n+1|0;m=m+ -1|0;o=(m|0)==0;if((n&3|0)==0|o){l=4;break}}}while(0);b:do if((l|0)==4)if(!o){if(a[n>>0]|0){c:do if(m>>>0>3)do{o=c[n>>2]|0;if((o&-2139062144^-2139062144)&o+ -16843009)break c;n=n+4|0;m=m+ -4|0}while(m>>>0>3);while(0);if(!m)m=0;else while(1){if(!(a[n>>0]|0))break b;n=n+1|0;m=m+ -1|0;if(!m){m=0;break}}}}else m=0;while(0);l=(m|0)!=0?n:0;if(l)k=l-j|0;o=k>>>0<e>>>0?k:e;nr(d|0,f|0,o|0)|0;c[b+4>>2]=f+o;n=f+k|0;c[b+8>>2]=n;c[g>>2]=n;i=h;return o|0}function Xp(a,b){a=a|0;b=b|0;var d=0;d=i;i=i+16|0;c[d>>2]=b;b=c[p>>2]|0;Ub(b|0,a|0,d|0)|0;Yc(10,b|0)|0;mc()}function Yp(){var a=0,b=0,d=0,e=0,f=0;a=i;i=i+16|0;b=a;a=a+12|0;if(yb(27096,2)|0)Xp(27104,b);d=qc(c[6772]|0)|0;if(!d)Xp(27072,b);d=c[d>>2]|0;if(!d)Xp(27072,b);f=d+48|0;e=c[f>>2]|0;f=c[f+4>>2]|0;if(!((e&-256|0)==1126902528&(f|0)==1129074247)){c[b>>2]=26920;Xp(27032,b)}if((e|0)==1126902529&(f|0)==1129074247)e=c[d+44>>2]|0;else e=d+80|0;c[a>>2]=e;f=c[d>>2]|0;d=c[f+4>>2]|0;if(Aq(27480,f,a)|0){f=c[a>>2]|0;f=md[c[(c[f>>2]|0)+8>>2]&127](f)|0;c[b>>2]=26920;c[b+4>>2]=d;c[b+8>>2]=f;Xp(26936,b)}else{c[b>>2]=26920;c[b+4>>2]=d;Xp(26984,b)}}function Zp(){var a=0;a=i;i=i+16|0;if(!(dc(27088,253)|0)){i=a;return}else Xp(27160,a)}function _p(a){a=a|0;var b=0;b=i;i=i+16|0;Uq(a);if(!(Wc(c[6772]|0,0)|0)){i=b;return}else Xp(27216,b)}function $p(a){a=a|0;var b=0,d=0;b=i;a=(a|0)==0?1:a;d=Tq(a)|0;if(d){i=b;return d|0}while(1){d=c[6860]|0;c[6860]=d+0;if(!d){a=4;break}qd[d&3]();d=Tq(a)|0;if(d){a=5;break}}if((a|0)==4){d=Wb(4)|0;c[d>>2]=27280;Zc(d|0,27328,220)}else if((a|0)==5){i=b;return d|0}return 0}function aq(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function bq(a){a=a|0;return}function cq(a){a=a|0;return 27296}function dq(a){a=a|0;var b=0;b=i;i=i+16|0;qd[a&3]();Xp(27344,b)}function eq(){var a=0,b=0;b=i;i=i+16|0;if(yb(27096,2)|0)Xp(27104,b);b=qc(c[6772]|0)|0;if(((b|0)!=0?(a=c[b>>2]|0,(a|0)!=0):0)?(b=a+48|0,(c[b>>2]&-256|0)==1126902528?(c[b+4>>2]|0)==1129074247:0):0)dq(c[a+12>>2]|0);b=c[6728]|0;c[6728]=b+0;dq(b)}function fq(a){a=a|0;return 27448}function gq(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27496;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function hq(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=27496;a=a+4|0;e=(c[a>>2]|0)+ -4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if((d+ -1|0)>=0){i=b;return}Uq((c[a>>2]|0)+ -12|0);i=b;return}function iq(a){a=a|0;return c[a+4>>2]|0}function jq(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27520;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function kq(a){a=a|0;var b=0,d=0,e=0;b=i;c[a>>2]=27520;a=a+4|0;e=(c[a>>2]|0)+ -4|0;d=c[e>>2]|0;c[e>>2]=d+ -1;if((d+ -1|0)>=0){i=b;return}Uq((c[a>>2]|0)+ -12|0);i=b;return}function lq(a){a=a|0;return c[a+4>>2]|0}function mq(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27496;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function nq(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a>>2]=27496;d=a+4|0;f=(c[d>>2]|0)+ -4|0;e=c[f>>2]|0;c[f>>2]=e+ -1;if((e+ -1|0)>=0){Uq(a);i=b;return}Uq((c[d>>2]|0)+ -12|0);Uq(a);i=b;return}function oq(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function pq(a){a=a|0;return}function qq(a){a=a|0;return 27760}function rq(a){a=a|0;return}function sq(a){a=a|0;return}function tq(a){a=a|0;return}function uq(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function vq(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function wq(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function xq(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function yq(a){a=a|0;var b=0;b=i;Uq(a);i=b;return}function zq(a,b,c){a=a|0;b=b|0;c=c|0;return(a|0)==(b|0)|0}function Aq(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+64|0;f=e;if((a|0)==(b|0)){h=1;i=e;return h|0}if(!b){h=0;i=e;return h|0}b=Hq(b,27928)|0;if(!b){h=0;i=e;return h|0}h=f+0|0;g=h+56|0;do{c[h>>2]=0;h=h+4|0}while((h|0)<(g|0));c[f>>2]=b;c[f+8>>2]=a;c[f+12>>2]=-1;c[f+48>>2]=1;xd[c[(c[b>>2]|0)+28>>2]&15](b,f,c[d>>2]|0,1);if((c[f+24>>2]|0)!=1){h=0;i=e;return h|0}c[d>>2]=c[f+16>>2];h=1;i=e;return h|0}function Bq(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;g=b+16|0;h=c[g>>2]|0;if(!h){c[g>>2]=d;c[b+24>>2]=e;c[b+36>>2]=1;i=f;return}if((h|0)!=(d|0)){h=b+36|0;c[h>>2]=(c[h>>2]|0)+1;c[b+24>>2]=2;a[b+54>>0]=1;i=f;return}d=b+24|0;if((c[d>>2]|0)!=2){i=f;return}c[d>>2]=e;i=f;return}function Cq(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=i;if((c[b+8>>2]|0)!=(a|0)){i=f;return}Bq(b,d,e);i=f;return}function Dq(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=i;if((a|0)==(c[b+8>>2]|0)){Bq(b,d,e);i=f;return}else{a=c[a+8>>2]|0;xd[c[(c[a>>2]|0)+28>>2]&15](a,b,d,e);i=f;return}}function Eq(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;g=c[a+4>>2]|0;h=g>>8;if(g&1)h=c[(c[d>>2]|0)+h>>2]|0;a=c[a>>2]|0;xd[c[(c[a>>2]|0)+28>>2]&15](a,b,d+h|0,(g&2|0)!=0?e:2);i=f;return}function Fq(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0;g=i;if((b|0)==(c[d+8>>2]|0)){Bq(d,e,f);i=g;return}j=c[b+12>>2]|0;h=b+(j<<3)+16|0;Eq(b+16|0,d,e,f);if((j|0)<=1){i=g;return}j=d+54|0;b=b+24|0;while(1){Eq(b,d,e,f);if(a[j>>0]|0){f=7;break}b=b+8|0;if(b>>>0>=h>>>0){f=7;break}}if((f|0)==7){i=g;return}}function Gq(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;i=i+64|0;h=e;c[d>>2]=c[c[d>>2]>>2];if(!((a|0)==(b|0)|(b|0)==28240))if(((b|0)!=0?(k=Hq(b,28040)|0,(k|0)!=0):0)?(c[k+8>>2]&~c[a+8>>2]|0)==0:0){b=c[a+12>>2]|0;k=k+12|0;if(!((b|0)==28224?1:(b|0)==(c[k>>2]|0)))if((((b|0)!=0?(g=Hq(b,27928)|0,(g|0)!=0):0)?(j=c[k>>2]|0,(j|0)!=0):0)?(f=Hq(j,27928)|0,(f|0)!=0):0){k=h+0|0;j=k+56|0;do{c[k>>2]=0;k=k+4|0}while((k|0)<(j|0));c[h>>2]=f;c[h+8>>2]=g;c[h+12>>2]=-1;c[h+48>>2]=1;xd[c[(c[f>>2]|0)+28>>2]&15](f,h,c[d>>2]|0,1);if((c[h+24>>2]|0)==1){c[d>>2]=c[h+16>>2];d=1}else d=0}else d=0;else d=1}else d=0;else d=1;i=e;return d|0}function Hq(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=i;i=i+64|0;m=f;g=c[d>>2]|0;h=d+(c[g+ -8>>2]|0)|0;g=c[g+ -4>>2]|0;c[m>>2]=e;c[m+4>>2]=d;c[m+8>>2]=27872;p=m+12|0;n=m+16|0;o=m+20|0;j=m+24|0;d=m+28|0;k=m+32|0;l=m+40|0;r=(g|0)==(e|0);e=p+0|0;q=e+40|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(q|0));b[p+40>>1]=0;a[p+42>>0]=0;do if(r){c[m+48>>2]=1;ud[c[(c[g>>2]|0)+20>>2]&31](g,m,h,h,1,0);d=(c[j>>2]|0)==1?h:0}else{hd[c[(c[g>>2]|0)+24>>2]&3](g,m,h,1,0);g=c[m+36>>2]|0;if(!g){if((c[l>>2]|0)!=1){d=0;break}if((c[d>>2]|0)!=1){d=0;break}d=(c[k>>2]|0)==1?c[o>>2]|0:0;break}else if((g|0)!=1){d=0;break}if((c[j>>2]|0)!=1){if(c[l>>2]|0){d=0;break}if((c[d>>2]|0)!=1){d=0;break}if((c[k>>2]|0)!=1){d=0;break}}d=c[n>>2]|0}while(0);i=f;return d|0}function Iq(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;a[b+53>>0]=1;if((c[b+4>>2]|0)!=(e|0)){i=g;return}a[b+52>>0]=1;e=b+16|0;h=c[e>>2]|0;if(!h){c[e>>2]=d;c[b+24>>2]=f;c[b+36>>2]=1;if(!((f|0)==1?(c[b+48>>2]|0)==1:0)){i=g;return}a[b+54>>0]=1;i=g;return}if((h|0)!=(d|0)){h=b+36|0;c[h>>2]=(c[h>>2]|0)+1;a[b+54>>0]=1;i=g;return}d=b+24|0;e=c[d>>2]|0;if((e|0)==2)c[d>>2]=f;else f=e;if(!((f|0)==1?(c[b+48>>2]|0)==1:0)){i=g;return}a[b+54>>0]=1;i=g;return}function Jq(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;h=i;if((b|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)!=(e|0)){i=h;return}e=d+28|0;if((c[e>>2]|0)==1){i=h;return}c[e>>2]=f;i=h;return}if((b|0)!=(c[d>>2]|0)){u=c[b+12>>2]|0;m=b+(u<<3)+16|0;Lq(b+16|0,d,e,f,g);n=b+24|0;if((u|0)<=1){i=h;return}p=c[b+8>>2]|0;if((p&2|0)==0?(o=d+36|0,(c[o>>2]|0)!=1):0){if(!(p&1)){q=d+54|0;p=n;while(1){if(a[q>>0]|0){p=43;break}if((c[o>>2]|0)==1){p=43;break}Lq(p,d,e,f,g);p=p+8|0;if(p>>>0>=m>>>0){p=43;break}}if((p|0)==43){i=h;return}}p=d+24|0;q=d+54|0;r=n;while(1){if(a[q>>0]|0){p=43;break}if((c[o>>2]|0)==1?(c[p>>2]|0)==1:0){p=43;break}Lq(r,d,e,f,g);r=r+8|0;if(r>>>0>=m>>>0){p=43;break}}if((p|0)==43){i=h;return}}o=d+54|0;while(1){if(a[o>>0]|0){p=43;break}Lq(n,d,e,f,g);n=n+8|0;if(n>>>0>=m>>>0){p=43;break}}if((p|0)==43){i=h;return}}if((c[d+16>>2]|0)!=(e|0)?(j=d+20|0,(c[j>>2]|0)!=(e|0)):0){c[d+32>>2]=f;m=d+44|0;if((c[m>>2]|0)==4){i=h;return}u=c[b+12>>2]|0;t=b+(u<<3)+16|0;a:do if((u|0)>0){o=d+52|0;n=d+53|0;r=d+54|0;q=b+8|0;p=d+24|0;u=0;s=0;b=b+16|0;b:do{a[o>>0]=0;a[n>>0]=0;Kq(b,d,e,e,1,g);if(a[r>>0]|0)break;do if(a[n>>0]|0){if(!(a[o>>0]|0))if(!(c[q>>2]&1)){s=1;break b}else{s=1;break}if((c[p>>2]|0)==1){p=25;break a}if(!(c[q>>2]&2)){p=25;break a}else{u=1;s=1}}while(0);b=b+8|0}while(b>>>0<t>>>0);if(u){l=s;p=24}else{k=s;p=21}}else{k=0;p=21}while(0);if((p|0)==21){c[j>>2]=e;u=d+40|0;c[u>>2]=(c[u>>2]|0)+1;if((c[d+36>>2]|0)==1?(c[d+24>>2]|0)==2:0){a[d+54>>0]=1;if(k)p=25;else p=26}else{l=k;p=24}}if((p|0)==24)if(l)p=25;else p=26;if((p|0)==25){c[m>>2]=3;i=h;return}else if((p|0)==26){c[m>>2]=4;i=h;return}}if((f|0)!=1){i=h;return}c[d+32>>2]=1;i=h;return}function Kq(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0;h=i;j=c[a+4>>2]|0;k=j>>8;if(j&1)k=c[(c[e>>2]|0)+k>>2]|0;a=c[a>>2]|0;ud[c[(c[a>>2]|0)+20>>2]&31](a,b,d,e+k|0,(j&2|0)!=0?f:2,g);i=h;return}function Lq(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0;g=i;h=c[a+4>>2]|0;j=h>>8;if(h&1)j=c[(c[d>>2]|0)+j>>2]|0;a=c[a>>2]|0;hd[c[(c[a>>2]|0)+24>>2]&3](a,b,d+j|0,(h&2|0)!=0?e:2,f);i=g;return}function Mq(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0;h=i;if((b|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)!=(e|0)){i=h;return}j=d+28|0;if((c[j>>2]|0)==1){i=h;return}c[j>>2]=f;i=h;return}if((b|0)!=(c[d>>2]|0)){l=c[b+8>>2]|0;hd[c[(c[l>>2]|0)+24>>2]&3](l,d,e,f,g);i=h;return}if((c[d+16>>2]|0)!=(e|0)?(k=d+20|0,(c[k>>2]|0)!=(e|0)):0){c[d+32>>2]=f;f=d+44|0;if((c[f>>2]|0)==4){i=h;return}l=d+52|0;a[l>>0]=0;m=d+53|0;a[m>>0]=0;b=c[b+8>>2]|0;ud[c[(c[b>>2]|0)+20>>2]&31](b,d,e,e,1,g);if(a[m>>0]|0){if(!(a[l>>0]|0)){b=1;j=13}}else{b=0;j=13}do if((j|0)==13){c[k>>2]=e;m=d+40|0;c[m>>2]=(c[m>>2]|0)+1;if((c[d+36>>2]|0)==1?(c[d+24>>2]|0)==2:0){a[d+54>>0]=1;if(b)break}else j=16;if((j|0)==16?b:0)break;c[f>>2]=4;i=h;return}while(0);c[f>>2]=3;i=h;return}if((f|0)!=1){i=h;return}c[d+32>>2]=1;i=h;return}function Nq(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;g=i;if((c[d+8>>2]|0)==(b|0)){if((c[d+4>>2]|0)!=(e|0)){i=g;return}d=d+28|0;if((c[d>>2]|0)==1){i=g;return}c[d>>2]=f;i=g;return}if((c[d>>2]|0)!=(b|0)){i=g;return}if((c[d+16>>2]|0)!=(e|0)?(h=d+20|0,(c[h>>2]|0)!=(e|0)):0){c[d+32>>2]=f;c[h>>2]=e;b=d+40|0;c[b>>2]=(c[b>>2]|0)+1;if((c[d+36>>2]|0)==1?(c[d+24>>2]|0)==2:0)a[d+54>>0]=1;c[d+44>>2]=4;i=g;return}if((f|0)!=1){i=g;return}c[d+32>>2]=1;i=g;return}function Oq(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;m=i;if((b|0)==(c[d+8>>2]|0)){Iq(d,e,f,g);i=m;return}j=d+52|0;l=a[j>>0]|0;o=d+53|0;n=a[o>>0]|0;r=c[b+12>>2]|0;p=b+(r<<3)+16|0;a[j>>0]=0;a[o>>0]=0;Kq(b+16|0,d,e,f,g,h);a:do if((r|0)>1){k=d+24|0;q=b+8|0;r=d+54|0;b=b+24|0;do{if(a[r>>0]|0)break a;if(!(a[j>>0]|0)){if((a[o>>0]|0)!=0?(c[q>>2]&1|0)==0:0)break a}else{if((c[k>>2]|0)==1)break a;if(!(c[q>>2]&2))break a}a[j>>0]=0;a[o>>0]=0;Kq(b,d,e,f,g,h);b=b+8|0}while(b>>>0<p>>>0)}while(0);a[j>>0]=l;a[o>>0]=n;i=m;return}function Pq(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;h=i;if((a|0)==(c[b+8>>2]|0)){Iq(b,d,e,f);i=h;return}else{a=c[a+8>>2]|0;ud[c[(c[a>>2]|0)+20>>2]&31](a,b,d,e,f,g);i=h;return}}function Qq(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;g=i;if((c[b+8>>2]|0)!=(a|0)){i=g;return}Iq(b,d,e,f);i=g;return}function Rq(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;i=i+16|0;f=e;c[f>>2]=c[d>>2];a=fd[c[(c[a>>2]|0)+16>>2]&31](a,b,f)|0;b=a&1;if(!a){i=e;return b|0}c[d>>2]=c[f>>2];i=e;return b|0}function Sq(a){a=a|0;var b=0;b=i;if(!a)a=0;else a=(Hq(a,28040)|0)!=0;i=b;return a&1|0}function Tq(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;b=i;do if(a>>>0<245){if(a>>>0<11)a=16;else a=a+11&-8;v=a>>>3;p=c[7152]|0;w=p>>>v;if(w&3){h=(w&1^1)+v|0;g=h<<1;e=28648+(g<<2)|0;g=28648+(g+2<<2)|0;j=c[g>>2]|0;d=j+8|0;f=c[d>>2]|0;do if((e|0)!=(f|0)){if(f>>>0<(c[7156]|0)>>>0)mc();k=f+12|0;if((c[k>>2]|0)==(j|0)){c[k>>2]=e;c[g>>2]=f;break}else mc()}else c[7152]=p&~(1<<h);while(0);H=h<<3;c[j+4>>2]=H|3;H=j+(H|4)|0;c[H>>2]=c[H>>2]|1;H=d;i=b;return H|0}if(a>>>0>(c[7154]|0)>>>0){if(w){h=2<<v;h=w<<v&(h|0-h);h=(h&0-h)+ -1|0;d=h>>>12&16;h=h>>>d;f=h>>>5&8;h=h>>>f;g=h>>>2&4;h=h>>>g;e=h>>>1&2;h=h>>>e;j=h>>>1&1;j=(f|d|g|e|j)+(h>>>j)|0;h=j<<1;e=28648+(h<<2)|0;h=28648+(h+2<<2)|0;g=c[h>>2]|0;d=g+8|0;f=c[d>>2]|0;do if((e|0)!=(f|0)){if(f>>>0<(c[7156]|0)>>>0)mc();k=f+12|0;if((c[k>>2]|0)==(g|0)){c[k>>2]=e;c[h>>2]=f;break}else mc()}else c[7152]=p&~(1<<j);while(0);h=j<<3;f=h-a|0;c[g+4>>2]=a|3;e=g+a|0;c[g+(a|4)>>2]=f|1;c[g+h>>2]=f;h=c[7154]|0;if(h){g=c[7157]|0;k=h>>>3;j=k<<1;h=28648+(j<<2)|0;l=c[7152]|0;k=1<<k;if(l&k){j=28648+(j+2<<2)|0;k=c[j>>2]|0;if(k>>>0<(c[7156]|0)>>>0)mc();else{D=j;C=k}}else{c[7152]=l|k;D=28648+(j+2<<2)|0;C=h}c[D>>2]=g;c[C+12>>2]=g;c[g+8>>2]=C;c[g+12>>2]=h}c[7154]=f;c[7157]=e;H=d;i=b;return H|0}p=c[7153]|0;if(p){e=(p&0-p)+ -1|0;G=e>>>12&16;e=e>>>G;F=e>>>5&8;e=e>>>F;H=e>>>2&4;e=e>>>H;f=e>>>1&2;e=e>>>f;d=e>>>1&1;d=c[28912+((F|G|H|f|d)+(e>>>d)<<2)>>2]|0;e=(c[d+4>>2]&-8)-a|0;f=d;while(1){g=c[f+16>>2]|0;if(!g){g=c[f+20>>2]|0;if(!g)break}f=(c[g+4>>2]&-8)-a|0;H=f>>>0<e>>>0;e=H?f:e;f=g;d=H?g:d}h=c[7156]|0;if(d>>>0<h>>>0)mc();f=d+a|0;if(d>>>0>=f>>>0)mc();g=c[d+24>>2]|0;k=c[d+12>>2]|0;do if((k|0)==(d|0)){k=d+20|0;j=c[k>>2]|0;if(!j){k=d+16|0;j=c[k>>2]|0;if(!j){B=0;break}}while(1){l=j+20|0;m=c[l>>2]|0;if(m){j=m;k=l;continue}m=j+16|0;l=c[m>>2]|0;if(!l)break;else{j=l;k=m}}if(k>>>0<h>>>0)mc();else{c[k>>2]=0;B=j;break}}else{j=c[d+8>>2]|0;if(j>>>0<h>>>0)mc();h=j+12|0;if((c[h>>2]|0)!=(d|0))mc();l=k+8|0;if((c[l>>2]|0)==(d|0)){c[h>>2]=k;c[l>>2]=j;B=k;break}else mc()}while(0);do if(g){h=c[d+28>>2]|0;j=28912+(h<<2)|0;if((d|0)==(c[j>>2]|0)){c[j>>2]=B;if(!B){c[7153]=c[7153]&~(1<<h);break}}else{if(g>>>0<(c[7156]|0)>>>0)mc();h=g+16|0;if((c[h>>2]|0)==(d|0))c[h>>2]=B;else c[g+20>>2]=B;if(!B)break}if(B>>>0<(c[7156]|0)>>>0)mc();c[B+24>>2]=g;g=c[d+16>>2]|0;do if(g)if(g>>>0<(c[7156]|0)>>>0)mc();else{c[B+16>>2]=g;c[g+24>>2]=B;break}while(0);g=c[d+20>>2]|0;if(g)if(g>>>0<(c[7156]|0)>>>0)mc();else{c[B+20>>2]=g;c[g+24>>2]=B;break}}while(0);if(e>>>0<16){H=e+a|0;c[d+4>>2]=H|3;H=d+(H+4)|0;c[H>>2]=c[H>>2]|1}else{c[d+4>>2]=a|3;c[d+(a|4)>>2]=e|1;c[d+(e+a)>>2]=e;h=c[7154]|0;if(h){g=c[7157]|0;l=h>>>3;j=l<<1;h=28648+(j<<2)|0;k=c[7152]|0;l=1<<l;if(k&l){j=28648+(j+2<<2)|0;k=c[j>>2]|0;if(k>>>0<(c[7156]|0)>>>0)mc();else{A=j;z=k}}else{c[7152]=k|l;A=28648+(j+2<<2)|0;z=h}c[A>>2]=g;c[z+12>>2]=g;c[g+8>>2]=z;c[g+12>>2]=h}c[7154]=e;c[7157]=f}H=d+8|0;i=b;return H|0}}}else if(a>>>0<=4294967231){z=a+11|0;a=z&-8;B=c[7153]|0;if(B){A=0-a|0;z=z>>>8;if(z)if(a>>>0>16777215)C=31;else{G=(z+1048320|0)>>>16&8;H=z<<G;F=(H+520192|0)>>>16&4;H=H<<F;C=(H+245760|0)>>>16&2;C=14-(F|G|C)+(H<<C>>>15)|0;C=a>>>(C+7|0)&1|C<<1}else C=0;D=c[28912+(C<<2)>>2]|0;a:do if(!D){F=0;z=0}else{if((C|0)==31)z=0;else z=25-(C>>>1)|0;F=0;E=a<<z;z=0;while(1){H=c[D+4>>2]&-8;G=H-a|0;if(G>>>0<A>>>0)if((H|0)==(a|0)){A=G;F=D;z=D;break a}else{A=G;z=D}H=c[D+20>>2]|0;D=c[D+(E>>>31<<2)+16>>2]|0;F=(H|0)==0|(H|0)==(D|0)?F:H;if(!D)break;else E=E<<1}}while(0);if((F|0)==0&(z|0)==0){H=2<<C;B=B&(H|0-H);if(!B)break;H=(B&0-B)+ -1|0;D=H>>>12&16;H=H>>>D;C=H>>>5&8;H=H>>>C;E=H>>>2&4;H=H>>>E;G=H>>>1&2;H=H>>>G;F=H>>>1&1;F=c[28912+((C|D|E|G|F)+(H>>>F)<<2)>>2]|0}if(F)while(1){H=(c[F+4>>2]&-8)-a|0;B=H>>>0<A>>>0;A=B?H:A;z=B?F:z;B=c[F+16>>2]|0;if(B){F=B;continue}F=c[F+20>>2]|0;if(!F)break}if((z|0)!=0?A>>>0<((c[7154]|0)-a|0)>>>0:0){f=c[7156]|0;if(z>>>0<f>>>0)mc();d=z+a|0;if(z>>>0>=d>>>0)mc();e=c[z+24>>2]|0;h=c[z+12>>2]|0;do if((h|0)==(z|0)){h=z+20|0;g=c[h>>2]|0;if(!g){h=z+16|0;g=c[h>>2]|0;if(!g){x=0;break}}while(1){j=g+20|0;k=c[j>>2]|0;if(k){g=k;h=j;continue}j=g+16|0;k=c[j>>2]|0;if(!k)break;else{g=k;h=j}}if(h>>>0<f>>>0)mc();else{c[h>>2]=0;x=g;break}}else{g=c[z+8>>2]|0;if(g>>>0<f>>>0)mc();f=g+12|0;if((c[f>>2]|0)!=(z|0))mc();j=h+8|0;if((c[j>>2]|0)==(z|0)){c[f>>2]=h;c[j>>2]=g;x=h;break}else mc()}while(0);do if(e){g=c[z+28>>2]|0;f=28912+(g<<2)|0;if((z|0)==(c[f>>2]|0)){c[f>>2]=x;if(!x){c[7153]=c[7153]&~(1<<g);break}}else{if(e>>>0<(c[7156]|0)>>>0)mc();f=e+16|0;if((c[f>>2]|0)==(z|0))c[f>>2]=x;else c[e+20>>2]=x;if(!x)break}if(x>>>0<(c[7156]|0)>>>0)mc();c[x+24>>2]=e;e=c[z+16>>2]|0;do if(e)if(e>>>0<(c[7156]|0)>>>0)mc();else{c[x+16>>2]=e;c[e+24>>2]=x;break}while(0);e=c[z+20>>2]|0;if(e)if(e>>>0<(c[7156]|0)>>>0)mc();else{c[x+20>>2]=e;c[e+24>>2]=x;break}}while(0);b:do if(A>>>0>=16){c[z+4>>2]=a|3;c[z+(a|4)>>2]=A|1;c[z+(A+a)>>2]=A;f=A>>>3;if(A>>>0<256){h=f<<1;e=28648+(h<<2)|0;g=c[7152]|0;f=1<<f;do if(!(g&f)){c[7152]=g|f;w=28648+(h+2<<2)|0;v=e}else{f=28648+(h+2<<2)|0;g=c[f>>2]|0;if(g>>>0>=(c[7156]|0)>>>0){w=f;v=g;break}mc()}while(0);c[w>>2]=d;c[v+12>>2]=d;c[z+(a+8)>>2]=v;c[z+(a+12)>>2]=e;break}e=A>>>8;if(e)if(A>>>0>16777215)e=31;else{G=(e+1048320|0)>>>16&8;H=e<<G;F=(H+520192|0)>>>16&4;H=H<<F;e=(H+245760|0)>>>16&2;e=14-(F|G|e)+(H<<e>>>15)|0;e=A>>>(e+7|0)&1|e<<1}else e=0;f=28912+(e<<2)|0;c[z+(a+28)>>2]=e;c[z+(a+20)>>2]=0;c[z+(a+16)>>2]=0;h=c[7153]|0;g=1<<e;if(!(h&g)){c[7153]=h|g;c[f>>2]=d;c[z+(a+24)>>2]=f;c[z+(a+12)>>2]=d;c[z+(a+8)>>2]=d;break}f=c[f>>2]|0;if((e|0)==31)e=0;else e=25-(e>>>1)|0;c:do if((c[f+4>>2]&-8|0)!=(A|0)){e=A<<e;while(1){g=f+(e>>>31<<2)+16|0;h=c[g>>2]|0;if(!h)break;if((c[h+4>>2]&-8|0)==(A|0)){p=h;break c}else{e=e<<1;f=h}}if(g>>>0<(c[7156]|0)>>>0)mc();else{c[g>>2]=d;c[z+(a+24)>>2]=f;c[z+(a+12)>>2]=d;c[z+(a+8)>>2]=d;break b}}else p=f;while(0);f=p+8|0;e=c[f>>2]|0;g=c[7156]|0;if(p>>>0<g>>>0)mc();if(e>>>0<g>>>0)mc();else{c[e+12>>2]=d;c[f>>2]=d;c[z+(a+8)>>2]=e;c[z+(a+12)>>2]=p;c[z+(a+24)>>2]=0;break}}else{H=A+a|0;c[z+4>>2]=H|3;H=z+(H+4)|0;c[H>>2]=c[H>>2]|1}while(0);H=z+8|0;i=b;return H|0}}}else a=-1;while(0);p=c[7154]|0;if(a>>>0<=p>>>0){e=p-a|0;d=c[7157]|0;if(e>>>0>15){c[7157]=d+a;c[7154]=e;c[d+(a+4)>>2]=e|1;c[d+p>>2]=e;c[d+4>>2]=a|3}else{c[7154]=0;c[7157]=0;c[d+4>>2]=p|3;H=d+(p+4)|0;c[H>>2]=c[H>>2]|1}H=d+8|0;i=b;return H|0}p=c[7155]|0;if(a>>>0<p>>>0){G=p-a|0;c[7155]=G;H=c[7158]|0;c[7158]=H+a;c[H+(a+4)>>2]=G|1;c[H+4>>2]=a|3;H=H+8|0;i=b;return H|0}do if(!(c[7270]|0)){p=Ra(30)|0;if(!(p+ -1&p)){c[7272]=p;c[7271]=p;c[7273]=-1;c[7274]=-1;c[7275]=0;c[7263]=0;c[7270]=(Jb(0)|0)&-16^1431655768;break}else mc()}while(0);w=a+48|0;p=c[7272]|0;x=a+47|0;z=p+x|0;p=0-p|0;v=z&p;if(v>>>0<=a>>>0){H=0;i=b;return H|0}A=c[7262]|0;if((A|0)!=0?(G=c[7260]|0,H=G+v|0,H>>>0<=G>>>0|H>>>0>A>>>0):0){H=0;i=b;return H|0}d:do if(!(c[7263]&4)){B=c[7158]|0;e:do if(B){A=29056|0;while(1){C=c[A>>2]|0;if(C>>>0<=B>>>0?(y=A+4|0,(C+(c[y>>2]|0)|0)>>>0>B>>>0):0)break;A=c[A+8>>2]|0;if(!A){o=182;break e}}if(A){B=z-(c[7155]|0)&p;if(B>>>0<2147483647){p=Na(B|0)|0;A=(p|0)==((c[A>>2]|0)+(c[y>>2]|0)|0);y=p;z=B;p=A?p:-1;A=A?B:0;o=191}else A=0}else o=182}else o=182;while(0);do if((o|0)==182){p=Na(0)|0;if((p|0)!=(-1|0)){z=p;A=c[7271]|0;y=A+ -1|0;if(!(y&z))A=v;else A=v-z+(y+z&0-A)|0;y=c[7260]|0;z=y+A|0;if(A>>>0>a>>>0&A>>>0<2147483647){H=c[7262]|0;if((H|0)!=0?z>>>0<=y>>>0|z>>>0>H>>>0:0){A=0;break}y=Na(A|0)|0;o=(y|0)==(p|0);z=A;p=o?p:-1;A=o?A:0;o=191}else A=0}else A=0}while(0);f:do if((o|0)==191){o=0-z|0;if((p|0)!=(-1|0)){q=A;o=202;break d}do if((y|0)!=(-1|0)&z>>>0<2147483647&z>>>0<w>>>0?(u=c[7272]|0,u=x-z+u&0-u,u>>>0<2147483647):0)if((Na(u|0)|0)==(-1|0)){Na(o|0)|0;break f}else{z=u+z|0;break}while(0);if((y|0)!=(-1|0)){p=y;q=z;o=202;break d}}while(0);c[7263]=c[7263]|4;o=199}else{A=0;o=199}while(0);if((((o|0)==199?v>>>0<2147483647:0)?(t=Na(v|0)|0,s=Na(0)|0,(s|0)!=(-1|0)&(t|0)!=(-1|0)&t>>>0<s>>>0):0)?(r=s-t|0,q=r>>>0>(a+40|0)>>>0,q):0){p=t;q=q?r:A;o=202}if((o|0)==202){r=(c[7260]|0)+q|0;c[7260]=r;if(r>>>0>(c[7261]|0)>>>0)c[7261]=r;r=c[7158]|0;g:do if(r){v=29056|0;while(1){t=c[v>>2]|0;u=v+4|0;s=c[u>>2]|0;if((p|0)==(t+s|0)){o=214;break}w=c[v+8>>2]|0;if(!w)break;else v=w}if(((o|0)==214?(c[v+12>>2]&8|0)==0:0)?r>>>0>=t>>>0&r>>>0<p>>>0:0){c[u>>2]=s+q;d=(c[7155]|0)+q|0;e=r+8|0;if(!(e&7))e=0;else e=0-e&7;H=d-e|0;c[7158]=r+e;c[7155]=H;c[r+(e+4)>>2]=H|1;c[r+(d+4)>>2]=40;c[7159]=c[7274];break}if(p>>>0<(c[7156]|0)>>>0)c[7156]=p;t=p+q|0;s=29056|0;while(1){if((c[s>>2]|0)==(t|0)){o=224;break}u=c[s+8>>2]|0;if(!u)break;else s=u}if((o|0)==224?(c[s+12>>2]&8|0)==0:0){c[s>>2]=p;h=s+4|0;c[h>>2]=(c[h>>2]|0)+q;h=p+8|0;if(!(h&7))h=0;else h=0-h&7;j=p+(q+8)|0;if(!(j&7))n=0;else n=0-j&7;o=p+(n+q)|0;j=h+a|0;k=p+j|0;m=o-(p+h)-a|0;c[p+(h+4)>>2]=a|3;h:do if((o|0)!=(c[7158]|0)){if((o|0)==(c[7157]|0)){H=(c[7154]|0)+m|0;c[7154]=H;c[7157]=k;c[p+(j+4)>>2]=H|1;c[p+(H+j)>>2]=H;break}r=q+4|0;t=c[p+(r+n)>>2]|0;if((t&3|0)==1){a=t&-8;s=t>>>3;i:do if(t>>>0>=256){l=c[p+((n|24)+q)>>2]|0;u=c[p+(q+12+n)>>2]|0;do if((u|0)==(o|0)){u=n|16;t=p+(r+u)|0;s=c[t>>2]|0;if(!s){t=p+(u+q)|0;s=c[t>>2]|0;if(!s){g=0;break}}while(1){u=s+20|0;v=c[u>>2]|0;if(v){s=v;t=u;continue}u=s+16|0;v=c[u>>2]|0;if(!v)break;else{s=v;t=u}}if(t>>>0<(c[7156]|0)>>>0)mc();else{c[t>>2]=0;g=s;break}}else{t=c[p+((n|8)+q)>>2]|0;if(t>>>0<(c[7156]|0)>>>0)mc();v=t+12|0;if((c[v>>2]|0)!=(o|0))mc();s=u+8|0;if((c[s>>2]|0)==(o|0)){c[v>>2]=u;c[s>>2]=t;g=u;break}else mc()}while(0);if(!l)break;t=c[p+(q+28+n)>>2]|0;s=28912+(t<<2)|0;do if((o|0)!=(c[s>>2]|0)){if(l>>>0<(c[7156]|0)>>>0)mc();s=l+16|0;if((c[s>>2]|0)==(o|0))c[s>>2]=g;else c[l+20>>2]=g;if(!g)break i}else{c[s>>2]=g;if(g)break;c[7153]=c[7153]&~(1<<t);break i}while(0);if(g>>>0<(c[7156]|0)>>>0)mc();c[g+24>>2]=l;l=n|16;o=c[p+(l+q)>>2]|0;do if(o)if(o>>>0<(c[7156]|0)>>>0)mc();else{c[g+16>>2]=o;c[o+24>>2]=g;break}while(0);l=c[p+(r+l)>>2]|0;if(!l)break;if(l>>>0<(c[7156]|0)>>>0)mc();else{c[g+20>>2]=l;c[l+24>>2]=g;break}}else{r=c[p+((n|8)+q)>>2]|0;g=c[p+(q+12+n)>>2]|0;t=28648+(s<<1<<2)|0;do if((r|0)!=(t|0)){if(r>>>0<(c[7156]|0)>>>0)mc();if((c[r+12>>2]|0)==(o|0))break;mc()}while(0);if((g|0)==(r|0)){c[7152]=c[7152]&~(1<<s);break}do if((g|0)==(t|0))l=g+8|0;else{if(g>>>0<(c[7156]|0)>>>0)mc();s=g+8|0;if((c[s>>2]|0)==(o|0)){l=s;break}mc()}while(0);c[r+12>>2]=g;c[l>>2]=r}while(0);o=p+((a|n)+q)|0;m=a+m|0}g=o+4|0;c[g>>2]=c[g>>2]&-2;c[p+(j+4)>>2]=m|1;c[p+(m+j)>>2]=m;g=m>>>3;if(m>>>0<256){m=g<<1;d=28648+(m<<2)|0;l=c[7152]|0;g=1<<g;do if(!(l&g)){c[7152]=l|g;f=28648+(m+2<<2)|0;e=d}else{l=28648+(m+2<<2)|0;g=c[l>>2]|0;if(g>>>0>=(c[7156]|0)>>>0){f=l;e=g;break}mc()}while(0);c[f>>2]=k;c[e+12>>2]=k;c[p+(j+8)>>2]=e;c[p+(j+12)>>2]=d;break}e=m>>>8;do if(!e)e=0;else{if(m>>>0>16777215){e=31;break}G=(e+1048320|0)>>>16&8;H=e<<G;F=(H+520192|0)>>>16&4;H=H<<F;e=(H+245760|0)>>>16&2;e=14-(F|G|e)+(H<<e>>>15)|0;e=m>>>(e+7|0)&1|e<<1}while(0);l=28912+(e<<2)|0;c[p+(j+28)>>2]=e;c[p+(j+20)>>2]=0;c[p+(j+16)>>2]=0;f=c[7153]|0;g=1<<e;if(!(f&g)){c[7153]=f|g;c[l>>2]=k;c[p+(j+24)>>2]=l;c[p+(j+12)>>2]=k;c[p+(j+8)>>2]=k;break}l=c[l>>2]|0;if((e|0)==31)e=0;else e=25-(e>>>1)|0;j:do if((c[l+4>>2]&-8|0)!=(m|0)){e=m<<e;while(1){g=l+(e>>>31<<2)+16|0;f=c[g>>2]|0;if(!f)break;if((c[f+4>>2]&-8|0)==(m|0)){d=f;break j}else{e=e<<1;l=f}}if(g>>>0<(c[7156]|0)>>>0)mc();else{c[g>>2]=k;c[p+(j+24)>>2]=l;c[p+(j+12)>>2]=k;c[p+(j+8)>>2]=k;break h}}else d=l;while(0);f=d+8|0;e=c[f>>2]|0;g=c[7156]|0;if(d>>>0<g>>>0)mc();if(e>>>0<g>>>0)mc();else{c[e+12>>2]=k;c[f>>2]=k;c[p+(j+8)>>2]=e;c[p+(j+12)>>2]=d;c[p+(j+24)>>2]=0;break}}else{H=(c[7155]|0)+m|0;c[7155]=H;c[7158]=k;c[p+(j+4)>>2]=H|1}while(0);H=p+(h|8)|0;i=b;return H|0}e=29056|0;while(1){d=c[e>>2]|0;if(d>>>0<=r>>>0?(n=c[e+4>>2]|0,m=d+n|0,m>>>0>r>>>0):0)break;e=c[e+8>>2]|0}e=d+(n+ -39)|0;if(!(e&7))e=0;else e=0-e&7;d=d+(n+ -47+e)|0;d=d>>>0<(r+16|0)>>>0?r:d;e=d+8|0;f=p+8|0;if(!(f&7))f=0;else f=0-f&7;H=q+ -40-f|0;c[7158]=p+f;c[7155]=H;c[p+(f+4)>>2]=H|1;c[p+(q+ -36)>>2]=40;c[7159]=c[7274];c[d+4>>2]=27;c[e+0>>2]=c[7264];c[e+4>>2]=c[7265];c[e+8>>2]=c[7266];c[e+12>>2]=c[7267];c[7264]=p;c[7265]=q;c[7267]=0;c[7266]=e;e=d+28|0;c[e>>2]=7;if((d+32|0)>>>0<m>>>0)do{H=e;e=e+4|0;c[e>>2]=7}while((H+8|0)>>>0<m>>>0);if((d|0)!=(r|0)){d=d-r|0;e=r+(d+4)|0;c[e>>2]=c[e>>2]&-2;c[r+4>>2]=d|1;c[r+d>>2]=d;e=d>>>3;if(d>>>0<256){g=e<<1;d=28648+(g<<2)|0;f=c[7152]|0;e=1<<e;do if(!(f&e)){c[7152]=f|e;k=28648+(g+2<<2)|0;j=d}else{f=28648+(g+2<<2)|0;e=c[f>>2]|0;if(e>>>0>=(c[7156]|0)>>>0){k=f;j=e;break}mc()}while(0);c[k>>2]=r;c[j+12>>2]=r;c[r+8>>2]=j;c[r+12>>2]=d;break}e=d>>>8;if(e)if(d>>>0>16777215)e=31;else{G=(e+1048320|0)>>>16&8;H=e<<G;F=(H+520192|0)>>>16&4;H=H<<F;e=(H+245760|0)>>>16&2;e=14-(F|G|e)+(H<<e>>>15)|0;e=d>>>(e+7|0)&1|e<<1}else e=0;j=28912+(e<<2)|0;c[r+28>>2]=e;c[r+20>>2]=0;c[r+16>>2]=0;f=c[7153]|0;g=1<<e;if(!(f&g)){c[7153]=f|g;c[j>>2]=r;c[r+24>>2]=j;c[r+12>>2]=r;c[r+8>>2]=r;break}f=c[j>>2]|0;if((e|0)==31)e=0;else e=25-(e>>>1)|0;k:do if((c[f+4>>2]&-8|0)!=(d|0)){e=d<<e;while(1){j=f+(e>>>31<<2)+16|0;g=c[j>>2]|0;if(!g)break;if((c[g+4>>2]&-8|0)==(d|0)){h=g;break k}else{e=e<<1;f=g}}if(j>>>0<(c[7156]|0)>>>0)mc();else{c[j>>2]=r;c[r+24>>2]=f;c[r+12>>2]=r;c[r+8>>2]=r;break g}}else h=f;while(0);f=h+8|0;e=c[f>>2]|0;d=c[7156]|0;if(h>>>0<d>>>0)mc();if(e>>>0<d>>>0)mc();else{c[e+12>>2]=r;c[f>>2]=r;c[r+8>>2]=e;c[r+12>>2]=h;c[r+24>>2]=0;break}}}else{H=c[7156]|0;if((H|0)==0|p>>>0<H>>>0)c[7156]=p;c[7264]=p;c[7265]=q;c[7267]=0;c[7161]=c[7270];c[7160]=-1;d=0;do{H=d<<1;G=28648+(H<<2)|0;c[28648+(H+3<<2)>>2]=G;c[28648+(H+2<<2)>>2]=G;d=d+1|0}while((d|0)!=32);d=p+8|0;if(!(d&7))d=0;else d=0-d&7;H=q+ -40-d|0;c[7158]=p+d;c[7155]=H;c[p+(d+4)>>2]=H|1;c[p+(q+ -36)>>2]=40;c[7159]=c[7274]}while(0);d=c[7155]|0;if(d>>>0>a>>>0){G=d-a|0;c[7155]=G;H=c[7158]|0;c[7158]=H+a;c[H+(a+4)>>2]=G|1;c[H+4>>2]=a|3;H=H+8|0;i=b;return H|0}}c[(Uc()|0)>>2]=12;H=0;i=b;return H|0}function Uq(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;b=i;if(!a){i=b;return}q=a+ -8|0;r=c[7156]|0;if(q>>>0<r>>>0)mc();o=c[a+ -4>>2]|0;n=o&3;if((n|0)==1)mc();j=o&-8;h=a+(j+ -8)|0;do if(!(o&1)){u=c[q>>2]|0;if(!n){i=b;return}q=-8-u|0;o=a+q|0;n=u+j|0;if(o>>>0<r>>>0)mc();if((o|0)==(c[7157]|0)){d=a+(j+ -4)|0;if((c[d>>2]&3|0)!=3){d=o;m=n;break}c[7154]=n;c[d>>2]=c[d>>2]&-2;c[a+(q+4)>>2]=n|1;c[h>>2]=n;i=b;return}t=u>>>3;if(u>>>0<256){d=c[a+(q+8)>>2]|0;m=c[a+(q+12)>>2]|0;p=28648+(t<<1<<2)|0;if((d|0)!=(p|0)){if(d>>>0<r>>>0)mc();if((c[d+12>>2]|0)!=(o|0))mc()}if((m|0)==(d|0)){c[7152]=c[7152]&~(1<<t);d=o;m=n;break}if((m|0)!=(p|0)){if(m>>>0<r>>>0)mc();p=m+8|0;if((c[p>>2]|0)==(o|0))s=p;else mc()}else s=m+8|0;c[d+12>>2]=m;c[s>>2]=d;d=o;m=n;break}s=c[a+(q+24)>>2]|0;t=c[a+(q+12)>>2]|0;do if((t|0)==(o|0)){u=a+(q+20)|0;t=c[u>>2]|0;if(!t){u=a+(q+16)|0;t=c[u>>2]|0;if(!t){p=0;break}}while(1){w=t+20|0;v=c[w>>2]|0;if(v){t=v;u=w;continue}v=t+16|0;w=c[v>>2]|0;if(!w)break;else{t=w;u=v}}if(u>>>0<r>>>0)mc();else{c[u>>2]=0;p=t;break}}else{u=c[a+(q+8)>>2]|0;if(u>>>0<r>>>0)mc();r=u+12|0;if((c[r>>2]|0)!=(o|0))mc();v=t+8|0;if((c[v>>2]|0)==(o|0)){c[r>>2]=t;c[v>>2]=u;p=t;break}else mc()}while(0);if(s){t=c[a+(q+28)>>2]|0;r=28912+(t<<2)|0;if((o|0)==(c[r>>2]|0)){c[r>>2]=p;if(!p){c[7153]=c[7153]&~(1<<t);d=o;m=n;break}}else{if(s>>>0<(c[7156]|0)>>>0)mc();r=s+16|0;if((c[r>>2]|0)==(o|0))c[r>>2]=p;else c[s+20>>2]=p;if(!p){d=o;m=n;break}}if(p>>>0<(c[7156]|0)>>>0)mc();c[p+24>>2]=s;r=c[a+(q+16)>>2]|0;do if(r)if(r>>>0<(c[7156]|0)>>>0)mc();else{c[p+16>>2]=r;c[r+24>>2]=p;break}while(0);q=c[a+(q+20)>>2]|0;if(q)if(q>>>0<(c[7156]|0)>>>0)mc();else{c[p+20>>2]=q;c[q+24>>2]=p;d=o;m=n;break}else{d=o;m=n}}else{d=o;m=n}}else{d=q;m=j}while(0);if(d>>>0>=h>>>0)mc();n=a+(j+ -4)|0;o=c[n>>2]|0;if(!(o&1))mc();if(!(o&2)){if((h|0)==(c[7158]|0)){w=(c[7155]|0)+m|0;c[7155]=w;c[7158]=d;c[d+4>>2]=w|1;if((d|0)!=(c[7157]|0)){i=b;return}c[7157]=0;c[7154]=0;i=b;return}if((h|0)==(c[7157]|0)){w=(c[7154]|0)+m|0;c[7154]=w;c[7157]=d;c[d+4>>2]=w|1;c[d+w>>2]=w;i=b;return}m=(o&-8)+m|0;n=o>>>3;do if(o>>>0>=256){l=c[a+(j+16)>>2]|0;q=c[a+(j|4)>>2]|0;do if((q|0)==(h|0)){o=a+(j+12)|0;n=c[o>>2]|0;if(!n){o=a+(j+8)|0;n=c[o>>2]|0;if(!n){k=0;break}}while(1){p=n+20|0;q=c[p>>2]|0;if(q){n=q;o=p;continue}p=n+16|0;q=c[p>>2]|0;if(!q)break;else{n=q;o=p}}if(o>>>0<(c[7156]|0)>>>0)mc();else{c[o>>2]=0;k=n;break}}else{o=c[a+j>>2]|0;if(o>>>0<(c[7156]|0)>>>0)mc();p=o+12|0;if((c[p>>2]|0)!=(h|0))mc();n=q+8|0;if((c[n>>2]|0)==(h|0)){c[p>>2]=q;c[n>>2]=o;k=q;break}else mc()}while(0);if(l){n=c[a+(j+20)>>2]|0;o=28912+(n<<2)|0;if((h|0)==(c[o>>2]|0)){c[o>>2]=k;if(!k){c[7153]=c[7153]&~(1<<n);break}}else{if(l>>>0<(c[7156]|0)>>>0)mc();n=l+16|0;if((c[n>>2]|0)==(h|0))c[n>>2]=k;else c[l+20>>2]=k;if(!k)break}if(k>>>0<(c[7156]|0)>>>0)mc();c[k+24>>2]=l;h=c[a+(j+8)>>2]|0;do if(h)if(h>>>0<(c[7156]|0)>>>0)mc();else{c[k+16>>2]=h;c[h+24>>2]=k;break}while(0);h=c[a+(j+12)>>2]|0;if(h)if(h>>>0<(c[7156]|0)>>>0)mc();else{c[k+20>>2]=h;c[h+24>>2]=k;break}}}else{k=c[a+j>>2]|0;a=c[a+(j|4)>>2]|0;j=28648+(n<<1<<2)|0;if((k|0)!=(j|0)){if(k>>>0<(c[7156]|0)>>>0)mc();if((c[k+12>>2]|0)!=(h|0))mc()}if((a|0)==(k|0)){c[7152]=c[7152]&~(1<<n);break}if((a|0)!=(j|0)){if(a>>>0<(c[7156]|0)>>>0)mc();j=a+8|0;if((c[j>>2]|0)==(h|0))l=j;else mc()}else l=a+8|0;c[k+12>>2]=a;c[l>>2]=k}while(0);c[d+4>>2]=m|1;c[d+m>>2]=m;if((d|0)==(c[7157]|0)){c[7154]=m;i=b;return}}else{c[n>>2]=o&-2;c[d+4>>2]=m|1;c[d+m>>2]=m}h=m>>>3;if(m>>>0<256){a=h<<1;e=28648+(a<<2)|0;j=c[7152]|0;h=1<<h;if(j&h){h=28648+(a+2<<2)|0;a=c[h>>2]|0;if(a>>>0<(c[7156]|0)>>>0)mc();else{f=h;g=a}}else{c[7152]=j|h;f=28648+(a+2<<2)|0;g=e}c[f>>2]=d;c[g+12>>2]=d;c[d+8>>2]=g;c[d+12>>2]=e;i=b;return}f=m>>>8;if(f)if(m>>>0>16777215)f=31;else{v=(f+1048320|0)>>>16&8;w=f<<v;u=(w+520192|0)>>>16&4;w=w<<u;f=(w+245760|0)>>>16&2;f=14-(u|v|f)+(w<<f>>>15)|0;f=m>>>(f+7|0)&1|f<<1}else f=0;g=28912+(f<<2)|0;c[d+28>>2]=f;c[d+20>>2]=0;c[d+16>>2]=0;a=c[7153]|0;h=1<<f;a:do if(a&h){g=c[g>>2]|0;if((f|0)==31)f=0;else f=25-(f>>>1)|0;b:do if((c[g+4>>2]&-8|0)!=(m|0)){f=m<<f;a=g;while(1){h=a+(f>>>31<<2)+16|0;g=c[h>>2]|0;if(!g)break;if((c[g+4>>2]&-8|0)==(m|0)){e=g;break b}else{f=f<<1;a=g}}if(h>>>0<(c[7156]|0)>>>0)mc();else{c[h>>2]=d;c[d+24>>2]=a;c[d+12>>2]=d;c[d+8>>2]=d;break a}}else e=g;while(0);g=e+8|0;f=c[g>>2]|0;h=c[7156]|0;if(e>>>0<h>>>0)mc();if(f>>>0<h>>>0)mc();else{c[f+12>>2]=d;c[g>>2]=d;c[d+8>>2]=f;c[d+12>>2]=e;c[d+24>>2]=0;break}}else{c[7153]=a|h;c[g>>2]=d;c[d+24>>2]=g;c[d+12>>2]=d;c[d+8>>2]=d}while(0);w=(c[7160]|0)+ -1|0;c[7160]=w;if(!w)d=29064|0;else{i=b;return}while(1){d=c[d>>2]|0;if(!d)break;else d=d+8|0}c[7160]=-1;i=b;return}function Vq(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;d=i;if(!a){r=Tq(b)|0;i=d;return r|0}if(b>>>0>4294967231){c[(Uc()|0)>>2]=12;r=0;i=d;return r|0}if(b>>>0<11)f=16;else f=b+11&-8;e=a+ -4|0;k=c[e>>2]|0;l=k&-8;o=l+ -8|0;h=a+o|0;m=c[7156]|0;if((a+ -8|0)>>>0<m>>>0)mc();r=k&3;if(!((r|0)!=1&(o|0)>-8))mc();o=l|4;q=a+(o+ -8)|0;p=c[q>>2]|0;if(!(p&1))mc();do if(!r){if(!(f>>>0<256|l>>>0<(f|4)>>>0)?(l-f|0)>>>0<=c[7272]<<1>>>0:0){r=a;i=d;return r|0}}else{if(l>>>0>=f>>>0){g=l-f|0;if(g>>>0<=15){r=a;i=d;return r|0}c[e>>2]=k&1|f|2;c[a+((f|4)+ -8)>>2]=g|3;c[q>>2]=c[q>>2]|1;Wq(a+(f+ -8)|0,g);r=a;i=d;return r|0}if((h|0)==(c[7158]|0)){g=(c[7155]|0)+l|0;if(g>>>0<=f>>>0)break;r=g-f|0;c[e>>2]=k&1|f|2;c[a+((f|4)+ -8)>>2]=r|1;c[7158]=a+(f+ -8);c[7155]=r;r=a;i=d;return r|0}if((h|0)==(c[7157]|0)){g=(c[7154]|0)+l|0;if(g>>>0<f>>>0)break;h=g-f|0;if(h>>>0>15){c[e>>2]=k&1|f|2;c[a+((f|4)+ -8)>>2]=h|1;c[a+(g+ -8)>>2]=h;e=a+(g+ -4)|0;c[e>>2]=c[e>>2]&-2;e=a+(f+ -8)|0}else{c[e>>2]=k&1|g|2;e=a+(g+ -4)|0;c[e>>2]=c[e>>2]|1;e=0;h=0}c[7154]=h;c[7157]=e;r=a;i=d;return r|0}if((p&2|0)==0?(g=(p&-8)+l|0,g>>>0>=f>>>0):0){k=g-f|0;b=p>>>3;do if(p>>>0>=256){n=c[a+(l+16)>>2]|0;o=c[a+o>>2]|0;do if((o|0)==(h|0)){b=a+(l+12)|0;o=c[b>>2]|0;if(!o){b=a+(l+8)|0;o=c[b>>2]|0;if(!o){j=0;break}}while(1){q=o+20|0;p=c[q>>2]|0;if(p){o=p;b=q;continue}p=o+16|0;q=c[p>>2]|0;if(!q)break;else{o=q;b=p}}if(b>>>0<m>>>0)mc();else{c[b>>2]=0;j=o;break}}else{b=c[a+l>>2]|0;if(b>>>0<m>>>0)mc();p=b+12|0;if((c[p>>2]|0)!=(h|0))mc();m=o+8|0;if((c[m>>2]|0)==(h|0)){c[p>>2]=o;c[m>>2]=b;j=o;break}else mc()}while(0);if(n){o=c[a+(l+20)>>2]|0;m=28912+(o<<2)|0;if((h|0)==(c[m>>2]|0)){c[m>>2]=j;if(!j){c[7153]=c[7153]&~(1<<o);break}}else{if(n>>>0<(c[7156]|0)>>>0)mc();m=n+16|0;if((c[m>>2]|0)==(h|0))c[m>>2]=j;else c[n+20>>2]=j;if(!j)break}if(j>>>0<(c[7156]|0)>>>0)mc();c[j+24>>2]=n;h=c[a+(l+8)>>2]|0;do if(h)if(h>>>0<(c[7156]|0)>>>0)mc();else{c[j+16>>2]=h;c[h+24>>2]=j;break}while(0);h=c[a+(l+12)>>2]|0;if(!h)break;if(h>>>0<(c[7156]|0)>>>0)mc();else{c[j+20>>2]=h;c[h+24>>2]=j;break}}}else{j=c[a+l>>2]|0;l=c[a+o>>2]|0;o=28648+(b<<1<<2)|0;if((j|0)!=(o|0)){if(j>>>0<m>>>0)mc();if((c[j+12>>2]|0)!=(h|0))mc()}if((l|0)==(j|0)){c[7152]=c[7152]&~(1<<b);break}do if((l|0)==(o|0))n=l+8|0;else{if(l>>>0<m>>>0)mc();m=l+8|0;if((c[m>>2]|0)==(h|0)){n=m;break}mc()}while(0);c[j+12>>2]=l;c[n>>2]=j}while(0);if(k>>>0<16){c[e>>2]=g|c[e>>2]&1|2;r=a+((g|4)+ -8)|0;c[r>>2]=c[r>>2]|1;r=a;i=d;return r|0}else{c[e>>2]=c[e>>2]&1|f|2;c[a+((f|4)+ -8)>>2]=k|3;r=a+((g|4)+ -8)|0;c[r>>2]=c[r>>2]|1;Wq(a+(f+ -8)|0,k);r=a;i=d;return r|0}}}while(0);f=Tq(b)|0;if(!f){r=0;i=d;return r|0}r=c[e>>2]|0;r=(r&-8)-((r&3|0)==0?8:4)|0;nr(f|0,a|0,(r>>>0<b>>>0?r:b)|0)|0;Uq(a);r=f;i=d;return r|0}function Wq(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;d=i;h=a+b|0;l=c[a+4>>2]|0;do if(!(l&1)){p=c[a>>2]|0;if(!(l&3)){i=d;return}l=a+(0-p)|0;m=p+b|0;q=c[7156]|0;if(l>>>0<q>>>0)mc();if((l|0)==(c[7157]|0)){e=a+(b+4)|0;if((c[e>>2]&3|0)!=3){e=l;n=m;break}c[7154]=m;c[e>>2]=c[e>>2]&-2;c[a+(4-p)>>2]=m|1;c[h>>2]=m;i=d;return}s=p>>>3;if(p>>>0<256){e=c[a+(8-p)>>2]|0;n=c[a+(12-p)>>2]|0;o=28648+(s<<1<<2)|0;if((e|0)!=(o|0)){if(e>>>0<q>>>0)mc();if((c[e+12>>2]|0)!=(l|0))mc()}if((n|0)==(e|0)){c[7152]=c[7152]&~(1<<s);e=l;n=m;break}if((n|0)!=(o|0)){if(n>>>0<q>>>0)mc();o=n+8|0;if((c[o>>2]|0)==(l|0))r=o;else mc()}else r=n+8|0;c[e+12>>2]=n;c[r>>2]=e;e=l;n=m;break}r=c[a+(24-p)>>2]|0;t=c[a+(12-p)>>2]|0;do if((t|0)==(l|0)){u=16-p|0;t=a+(u+4)|0;s=c[t>>2]|0;if(!s){t=a+u|0;s=c[t>>2]|0;if(!s){o=0;break}}while(1){u=s+20|0;v=c[u>>2]|0;if(v){s=v;t=u;continue}v=s+16|0;u=c[v>>2]|0;if(!u)break;else{s=u;t=v}}if(t>>>0<q>>>0)mc();else{c[t>>2]=0;o=s;break}}else{s=c[a+(8-p)>>2]|0;if(s>>>0<q>>>0)mc();u=s+12|0;if((c[u>>2]|0)!=(l|0))mc();q=t+8|0;if((c[q>>2]|0)==(l|0)){c[u>>2]=t;c[q>>2]=s;o=t;break}else mc()}while(0);if(r){q=c[a+(28-p)>>2]|0;s=28912+(q<<2)|0;if((l|0)==(c[s>>2]|0)){c[s>>2]=o;if(!o){c[7153]=c[7153]&~(1<<q);e=l;n=m;break}}else{if(r>>>0<(c[7156]|0)>>>0)mc();q=r+16|0;if((c[q>>2]|0)==(l|0))c[q>>2]=o;else c[r+20>>2]=o;if(!o){e=l;n=m;break}}if(o>>>0<(c[7156]|0)>>>0)mc();c[o+24>>2]=r;p=16-p|0;q=c[a+p>>2]|0;do if(q)if(q>>>0<(c[7156]|0)>>>0)mc();else{c[o+16>>2]=q;c[q+24>>2]=o;break}while(0);p=c[a+(p+4)>>2]|0;if(p)if(p>>>0<(c[7156]|0)>>>0)mc();else{c[o+20>>2]=p;c[p+24>>2]=o;e=l;n=m;break}else{e=l;n=m}}else{e=l;n=m}}else{e=a;n=b}while(0);l=c[7156]|0;if(h>>>0<l>>>0)mc();m=a+(b+4)|0;o=c[m>>2]|0;if(!(o&2)){if((h|0)==(c[7158]|0)){v=(c[7155]|0)+n|0;c[7155]=v;c[7158]=e;c[e+4>>2]=v|1;if((e|0)!=(c[7157]|0)){i=d;return}c[7157]=0;c[7154]=0;i=d;return}if((h|0)==(c[7157]|0)){v=(c[7154]|0)+n|0;c[7154]=v;c[7157]=e;c[e+4>>2]=v|1;c[e+v>>2]=v;i=d;return}n=(o&-8)+n|0;m=o>>>3;do if(o>>>0>=256){k=c[a+(b+24)>>2]|0;m=c[a+(b+12)>>2]|0;do if((m|0)==(h|0)){o=a+(b+20)|0;m=c[o>>2]|0;if(!m){o=a+(b+16)|0;m=c[o>>2]|0;if(!m){j=0;break}}while(1){q=m+20|0;p=c[q>>2]|0;if(p){m=p;o=q;continue}p=m+16|0;q=c[p>>2]|0;if(!q)break;else{m=q;o=p}}if(o>>>0<l>>>0)mc();else{c[o>>2]=0;j=m;break}}else{o=c[a+(b+8)>>2]|0;if(o>>>0<l>>>0)mc();l=o+12|0;if((c[l>>2]|0)!=(h|0))mc();p=m+8|0;if((c[p>>2]|0)==(h|0)){c[l>>2]=m;c[p>>2]=o;j=m;break}else mc()}while(0);if(k){l=c[a+(b+28)>>2]|0;m=28912+(l<<2)|0;if((h|0)==(c[m>>2]|0)){c[m>>2]=j;if(!j){c[7153]=c[7153]&~(1<<l);break}}else{if(k>>>0<(c[7156]|0)>>>0)mc();l=k+16|0;if((c[l>>2]|0)==(h|0))c[l>>2]=j;else c[k+20>>2]=j;if(!j)break}if(j>>>0<(c[7156]|0)>>>0)mc();c[j+24>>2]=k;h=c[a+(b+16)>>2]|0;do if(h)if(h>>>0<(c[7156]|0)>>>0)mc();else{c[j+16>>2]=h;c[h+24>>2]=j;break}while(0);h=c[a+(b+20)>>2]|0;if(h)if(h>>>0<(c[7156]|0)>>>0)mc();else{c[j+20>>2]=h;c[h+24>>2]=j;break}}}else{j=c[a+(b+8)>>2]|0;a=c[a+(b+12)>>2]|0;b=28648+(m<<1<<2)|0;if((j|0)!=(b|0)){if(j>>>0<l>>>0)mc();if((c[j+12>>2]|0)!=(h|0))mc()}if((a|0)==(j|0)){c[7152]=c[7152]&~(1<<m);break}if((a|0)!=(b|0)){if(a>>>0<l>>>0)mc();b=a+8|0;if((c[b>>2]|0)==(h|0))k=b;else mc()}else k=a+8|0;c[j+12>>2]=a;c[k>>2]=j}while(0);c[e+4>>2]=n|1;c[e+n>>2]=n;if((e|0)==(c[7157]|0)){c[7154]=n;i=d;return}}else{c[m>>2]=o&-2;c[e+4>>2]=n|1;c[e+n>>2]=n}a=n>>>3;if(n>>>0<256){b=a<<1;h=28648+(b<<2)|0;j=c[7152]|0;a=1<<a;if(j&a){b=28648+(b+2<<2)|0;a=c[b>>2]|0;if(a>>>0<(c[7156]|0)>>>0)mc();else{g=b;f=a}}else{c[7152]=j|a;g=28648+(b+2<<2)|0;f=h}c[g>>2]=e;c[f+12>>2]=e;c[e+8>>2]=f;c[e+12>>2]=h;i=d;return}f=n>>>8;if(f)if(n>>>0>16777215)f=31;else{u=(f+1048320|0)>>>16&8;v=f<<u;t=(v+520192|0)>>>16&4;v=v<<t;f=(v+245760|0)>>>16&2;f=14-(t|u|f)+(v<<f>>>15)|0;f=n>>>(f+7|0)&1|f<<1}else f=0;a=28912+(f<<2)|0;c[e+28>>2]=f;c[e+20>>2]=0;c[e+16>>2]=0;h=c[7153]|0;g=1<<f;if(!(h&g)){c[7153]=h|g;c[a>>2]=e;c[e+24>>2]=a;c[e+12>>2]=e;c[e+8>>2]=e;i=d;return}g=c[a>>2]|0;if((f|0)==31)f=0;else f=25-(f>>>1)|0;a:do if((c[g+4>>2]&-8|0)!=(n|0)){f=n<<f;a=g;while(1){h=a+(f>>>31<<2)+16|0;g=c[h>>2]|0;if(!g)break;if((c[g+4>>2]&-8|0)==(n|0))break a;else{f=f<<1;a=g}}if(h>>>0<(c[7156]|0)>>>0)mc();c[h>>2]=e;c[e+24>>2]=a;c[e+12>>2]=e;c[e+8>>2]=e;i=d;return}while(0);f=g+8|0;a=c[f>>2]|0;h=c[7156]|0;if(g>>>0<h>>>0)mc();if(a>>>0<h>>>0)mc();c[a+12>>2]=e;c[f>>2]=e;c[e+8>>2]=a;c[e+12>>2]=g;c[e+24>>2]=0;i=d;return}function Xq(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;j=i;if(e>>>0>36){c[(Uc()|0)>>2]=22;s=0;t=0;H=s;i=j;return t|0}l=b+4|0;k=b+100|0;do{m=c[l>>2]|0;if(m>>>0<(c[k>>2]|0)>>>0){c[l>>2]=m+1;o=d[m>>0]|0}else o=_q(b)|0}while((o|0)==32|(o+ -9|0)>>>0<5);do if((o|0)==43|(o|0)==45){m=((o|0)==45)<<31>>31;n=c[l>>2]|0;if(n>>>0<(c[k>>2]|0)>>>0){c[l>>2]=n+1;o=d[n>>0]|0;break}else{o=_q(b)|0;break}}else m=0;while(0);n=(e|0)==0;do if((e&-17|0)==0&(o|0)==48){o=c[l>>2]|0;if(o>>>0<(c[k>>2]|0)>>>0){c[l>>2]=o+1;o=d[o>>0]|0}else o=_q(b)|0;if((o|32|0)!=120){f=n?8:e;e=32;break}e=c[l>>2]|0;if(e>>>0<(c[k>>2]|0)>>>0){c[l>>2]=e+1;o=d[e>>0]|0}else o=_q(b)|0;if((d[o+29105>>0]|0)>15){g=(c[k>>2]|0)==0;if(!g)c[l>>2]=(c[l>>2]|0)+ -1;if(!f){c[b+104>>2]=0;s=c[b+8>>2]|0;c[b+108>>2]=s-(c[l>>2]|0);c[k>>2]=s;s=0;t=0;H=s;i=j;return t|0}if(g){s=0;t=0;H=s;i=j;return t|0}c[l>>2]=(c[l>>2]|0)+ -1;s=0;t=0;H=s;i=j;return t|0}else{f=16;e=47}}else{f=n?10:e;if((d[o+29105>>0]|0)>>>0<f>>>0)e=32;else{g=c[l>>2]|0;if(c[k>>2]|0){g=g+ -1|0;c[l>>2]=g}c[b+104>>2]=0;s=c[b+8>>2]|0;c[b+108>>2]=s-g;c[k>>2]=s;c[(Uc()|0)>>2]=22;s=0;t=0;H=s;i=j;return t|0}}while(0);if((e|0)==32)if((f|0)==10){f=o+ -48|0;if(f>>>0<10){n=0;while(1){n=n+f|0;f=c[l>>2]|0;if(f>>>0<(c[k>>2]|0)>>>0){c[l>>2]=f+1;o=d[f>>0]|0}else o=_q(b)|0;f=o+ -48|0;if(!(f>>>0<10&n>>>0<429496729))break;n=n*10|0}p=0}else{n=0;p=0}f=o+ -48|0;if(f>>>0<10){do{r=xr(n|0,p|0,10,0)|0;q=H;s=((f|0)<0)<<31>>31;t=~s;if(q>>>0>t>>>0|(q|0)==(t|0)&r>>>0>~f>>>0)break;n=kr(r|0,q|0,f|0,s|0)|0;p=H;f=c[l>>2]|0;if(f>>>0<(c[k>>2]|0)>>>0){c[l>>2]=f+1;o=d[f>>0]|0}else o=_q(b)|0;f=o+ -48|0}while(f>>>0<10&(p>>>0<429496729|(p|0)==429496729&n>>>0<2576980378));if(f>>>0<=9){f=10;e=73}}}else e=47;a:do if((e|0)==47){if(!(f+ -1&f)){e=a[29368+((f*23|0)>>>5&7)>>0]|0;r=a[o+29105>>0]|0;n=r&255;if(n>>>0<f>>>0){o=n;n=0;do{n=o|n<<e;o=c[l>>2]|0;if(o>>>0<(c[k>>2]|0)>>>0){c[l>>2]=o+1;s=d[o>>0]|0}else s=_q(b)|0;r=a[s+29105>>0]|0;o=r&255}while(o>>>0<f>>>0&n>>>0<134217728);p=0}else{p=0;n=0;s=o}q=lr(-1,-1,e|0)|0;o=H;if((r&255)>>>0>=f>>>0|(p>>>0>o>>>0|(p|0)==(o|0)&n>>>0>q>>>0)){o=s;e=73;break}while(1){n=or(n|0,p|0,e|0)|0;p=H;n=r&255|n;r=c[l>>2]|0;if(r>>>0<(c[k>>2]|0)>>>0){c[l>>2]=r+1;s=d[r>>0]|0}else s=_q(b)|0;r=a[s+29105>>0]|0;if((r&255)>>>0>=f>>>0|(p>>>0>o>>>0|(p|0)==(o|0)&n>>>0>q>>>0)){o=s;e=73;break a}}}r=a[o+29105>>0]|0;e=r&255;if(e>>>0<f>>>0){n=0;do{n=e+(da(n,f)|0)|0;e=c[l>>2]|0;if(e>>>0<(c[k>>2]|0)>>>0){c[l>>2]=e+1;q=d[e>>0]|0}else q=_q(b)|0;r=a[q+29105>>0]|0;e=r&255}while(e>>>0<f>>>0&n>>>0<119304647);p=0}else{n=0;p=0;q=o}if((r&255)>>>0<f>>>0){e=yr(-1,-1,f|0,0)|0;o=H;while(1){if(p>>>0>o>>>0|(p|0)==(o|0)&n>>>0>e>>>0){o=q;e=73;break a}s=xr(n|0,p|0,f|0,0)|0;t=H;r=r&255;if(t>>>0>4294967295|(t|0)==-1&s>>>0>~r>>>0){o=q;e=73;break a}n=kr(r|0,0,s|0,t|0)|0;p=H;q=c[l>>2]|0;if(q>>>0<(c[k>>2]|0)>>>0){c[l>>2]=q+1;q=d[q>>0]|0}else q=_q(b)|0;r=a[q+29105>>0]|0;if((r&255)>>>0>=f>>>0){o=q;e=73;break}}}else{o=q;e=73}}while(0);if((e|0)==73)if((d[o+29105>>0]|0)>>>0<f>>>0){do{e=c[l>>2]|0;if(e>>>0<(c[k>>2]|0)>>>0){c[l>>2]=e+1;e=d[e>>0]|0}else e=_q(b)|0}while((d[e+29105>>0]|0)>>>0<f>>>0);c[(Uc()|0)>>2]=34;p=h;n=g}if(c[k>>2]|0)c[l>>2]=(c[l>>2]|0)+ -1;if(!(p>>>0<h>>>0|(p|0)==(h|0)&n>>>0<g>>>0)){if((g&1|0)==0&0==0&(m|0)==0){c[(Uc()|0)>>2]=34;t=kr(g|0,h|0,-1,-1)|0;s=H;H=s;i=j;return t|0}if(p>>>0>h>>>0|(p|0)==(h|0)&n>>>0>g>>>0){c[(Uc()|0)>>2]=34;s=h;t=g;H=s;i=j;return t|0}}t=((m|0)<0)<<31>>31;t=jr(n^m|0,p^t|0,m|0,t|0)|0;s=H;H=s;i=j;return t|0}function Yq(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0.0,u=0,v=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,I=0,J=0,K=0.0,L=0,M=0.0,N=0.0,O=0.0,P=0.0;g=i;i=i+512|0;m=g;if((e|0)==1){j=53;l=-1074}else if(!e){j=24;l=-149}else if((e|0)==2){j=53;l=-1074}else{O=0.0;i=g;return+O}p=b+4|0;q=b+100|0;do{e=c[p>>2]|0;if(e>>>0<(c[q>>2]|0)>>>0){c[p>>2]=e+1;A=d[e>>0]|0}else A=_q(b)|0}while((A|0)==32|(A+ -9|0)>>>0<5);do if((A|0)==43|(A|0)==45){e=1-(((A|0)==45&1)<<1)|0;r=c[p>>2]|0;if(r>>>0<(c[q>>2]|0)>>>0){c[p>>2]=r+1;A=d[r>>0]|0;break}else{A=_q(b)|0;break}}else e=1;while(0);u=0;do{if((A|32|0)!=(a[29384+u>>0]|0))break;do if(u>>>0<7){r=c[p>>2]|0;if(r>>>0<(c[q>>2]|0)>>>0){c[p>>2]=r+1;A=d[r>>0]|0;break}else{A=_q(b)|0;break}}while(0);u=u+1|0}while(u>>>0<8);do if((u|0)==3)s=23;else if((u|0)!=8){r=(f|0)==0;if(!(u>>>0<4|r))if((u|0)==8)break;else{s=23;break}a:do if(!u){u=0;do{if((A|32|0)!=(a[29968+u>>0]|0))break a;do if(u>>>0<2){o=c[p>>2]|0;if(o>>>0<(c[q>>2]|0)>>>0){c[p>>2]=o+1;A=d[o>>0]|0;break}else{A=_q(b)|0;break}}while(0);u=u+1|0}while(u>>>0<3)}while(0);if(!u){do if((A|0)==48){o=c[p>>2]|0;if(o>>>0<(c[q>>2]|0)>>>0){c[p>>2]=o+1;o=d[o>>0]|0}else o=_q(b)|0;if((o|32|0)!=120){if(!(c[q>>2]|0)){A=48;break}c[p>>2]=(c[p>>2]|0)+ -1;A=48;break}m=c[p>>2]|0;if(m>>>0<(c[q>>2]|0)>>>0){c[p>>2]=m+1;C=d[m>>0]|0;A=0}else{C=_q(b)|0;A=0}while(1){if((C|0)==46){s=71;break}else if((C|0)!=48){m=0;o=0;u=0;v=0;z=0;B=0;K=1.0;y=0;t=0.0;break}m=c[p>>2]|0;if(m>>>0<(c[q>>2]|0)>>>0){c[p>>2]=m+1;C=d[m>>0]|0;A=1;continue}else{C=_q(b)|0;A=1;continue}}b:do if((s|0)==71){m=c[p>>2]|0;if(m>>>0<(c[q>>2]|0)>>>0){c[p>>2]=m+1;C=d[m>>0]|0}else C=_q(b)|0;if((C|0)==48){u=-1;v=-1;while(1){m=c[p>>2]|0;if(m>>>0<(c[q>>2]|0)>>>0){c[p>>2]=m+1;C=d[m>>0]|0}else C=_q(b)|0;if((C|0)!=48){m=0;o=0;A=1;z=1;B=0;K=1.0;y=0;t=0.0;break b}L=kr(u|0,v|0,-1,-1)|0;u=L;v=H}}else{m=0;o=0;u=0;v=0;z=1;B=0;K=1.0;y=0;t=0.0}}while(0);c:while(1){F=C+ -48|0;do if(F>>>0>=10){E=C|32;D=(C|0)==46;if(!((E+ -97|0)>>>0<6|D))break c;if(D)if(!z){u=o;v=m;z=1;break}else{C=46;break c}else{F=(C|0)>57?E+ -87|0:F;s=85;break}}else s=85;while(0);if((s|0)==85){s=0;do if(!((m|0)<0|(m|0)==0&o>>>0<8)){if((m|0)<0|(m|0)==0&o>>>0<14){O=K*.0625;M=O;t=t+O*+(F|0);break}if((F|0)!=0&(B|0)==0){B=1;M=K;t=t+K*.5}else M=K}else{M=K;y=F+(y<<4)|0}while(0);o=kr(o|0,m|0,1,0)|0;m=H;A=1;K=M}C=c[p>>2]|0;if(C>>>0<(c[q>>2]|0)>>>0){c[p>>2]=C+1;C=d[C>>0]|0;continue}else{C=_q(b)|0;continue}}if(!A){j=(c[q>>2]|0)==0;if(!j)c[p>>2]=(c[p>>2]|0)+ -1;if(!r){if(!j?(n=c[p>>2]|0,c[p>>2]=n+ -1,(z|0)!=0):0)c[p>>2]=n+ -2}else{c[b+104>>2]=0;L=c[b+8>>2]|0;c[b+108>>2]=L-(c[p>>2]|0);c[q>>2]=L}O=+(e|0)*0.0;i=g;return+O}s=(z|0)==0;n=s?o:u;s=s?m:v;if((m|0)<0|(m|0)==0&o>>>0<8)do{y=y<<4;o=kr(o|0,m|0,1,0)|0;m=H}while((m|0)<0|(m|0)==0&o>>>0<8);do if((C|32|0)==112){o=Zq(b,f)|0;m=H;if((o|0)==0&(m|0)==-2147483648)if(r){c[b+104>>2]=0;L=c[b+8>>2]|0;c[b+108>>2]=L-(c[p>>2]|0);c[q>>2]=L;O=0.0;i=g;return+O}else{if(!(c[q>>2]|0)){o=0;m=0;break}c[p>>2]=(c[p>>2]|0)+ -1;o=0;m=0;break}}else if(!(c[q>>2]|0)){o=0;m=0}else{c[p>>2]=(c[p>>2]|0)+ -1;o=0;m=0}while(0);n=or(n|0,s|0,2)|0;n=kr(n|0,H|0,-32,-1)|0;m=kr(n|0,H|0,o|0,m|0)|0;n=H;if(!y){O=+(e|0)*0.0;i=g;return+O}if((n|0)>0|(n|0)==0&m>>>0>(0-l|0)>>>0){c[(Uc()|0)>>2]=34;O=+(e|0)*1.7976931348623157e+308*1.7976931348623157e+308;i=g;return+O}L=l+ -106|0;J=((L|0)<0)<<31>>31;if((n|0)<(J|0)|(n|0)==(J|0)&m>>>0<L>>>0){c[(Uc()|0)>>2]=34;O=+(e|0)*2.2250738585072014e-308*2.2250738585072014e-308;i=g;return+O}if((y|0)>-1)do{y=y<<1;if(!(t>=.5))K=t;else{K=t+-1.0;y=y|1}t=t+K;m=kr(m|0,n|0,-1,-1)|0;n=H}while((y|0)>-1);l=jr(32,0,l|0,((l|0)<0)<<31>>31|0)|0;l=kr(m|0,n|0,l|0,H|0)|0;L=H;if(0>(L|0)|0==(L|0)&j>>>0>l>>>0)j=(l|0)<0?0:l;do if((j|0)<53){l=84-j|0;do if((l|0)>1023){n=l+ -1023|0;if((n|0)<=1023){l=n;M=8.98846567431158e+307;break}l=l+ -2046|0;l=(l|0)>1023?1023:l;M=x}else{if((l|0)>=-1022){M=1.0;break}n=l+1022|0;if((n|0)>=-1022){l=n;M=2.2250738585072014e-308;break}l=l+2044|0;l=(l|0)<-1022?-1022:l;M=0.0}while(0);J=or(l+1023|0,0,52)|0;L=H;c[k>>2]=J;c[k+4>>2]=L;K=+(e|0);M=+_c(+(M*+h[k>>3]),+K);if(!((j|0)<32&t!=0.0))break;L=y&1;y=(L^1)+y|0;t=(L|0)==0?0.0:t}else{K=+(e|0);M=0.0}while(0);t=K*t+(M+K*+(y>>>0))-M;if(!(t!=0.0))c[(Uc()|0)>>2]=34;do if((m|0)>1023){t=t*8.98846567431158e+307;e=m+ -1023|0;if((e|0)<=1023){m=e;break}m=m+ -2046|0;m=(m|0)>1023?1023:m;t=t*8.98846567431158e+307}else{if((m|0)>=-1022)break;t=t*2.2250738585072014e-308;e=m+1022|0;if((e|0)>=-1022){m=e;break}m=m+2044|0;m=(m|0)<-1022?-1022:m;t=t*2.2250738585072014e-308}while(0);J=or(m+1023|0,0,52)|0;L=H;c[k>>2]=J;c[k+4>>2]=L;O=t*+h[k>>3];i=g;return+O}while(0);o=l+j|0;n=0-o|0;F=0;while(1){if((A|0)==46){s=152;break}else if((A|0)!=48){J=0;G=0;B=0;break}u=c[p>>2]|0;if(u>>>0<(c[q>>2]|0)>>>0){c[p>>2]=u+1;A=d[u>>0]|0;F=1;continue}else{A=_q(b)|0;F=1;continue}}d:do if((s|0)==152){u=c[p>>2]|0;if(u>>>0<(c[q>>2]|0)>>>0){c[p>>2]=u+1;A=d[u>>0]|0}else A=_q(b)|0;if((A|0)==48){J=-1;G=-1;while(1){u=c[p>>2]|0;if(u>>>0<(c[q>>2]|0)>>>0){c[p>>2]=u+1;A=d[u>>0]|0}else A=_q(b)|0;if((A|0)!=48){F=1;B=1;break d}L=kr(J|0,G|0,-1,-1)|0;J=L;G=H}}else{J=0;G=0;B=1}}while(0);c[m>>2]=0;D=A+ -48|0;I=(A|0)==46;e:do if(D>>>0<10|I){u=m+496|0;E=0;C=0;z=0;y=0;v=0;while(1){do if(I)if(!B){J=E;G=C;B=1}else break e;else{L=kr(E|0,C|0,1,0)|0;C=H;I=(A|0)!=48;if((y|0)>=125){if(!I){E=L;break}c[u>>2]=c[u>>2]|1;E=L;break}E=m+(y<<2)|0;if(z)D=A+ -48+((c[E>>2]|0)*10|0)|0;c[E>>2]=D;z=z+1|0;D=(z|0)==9;E=L;F=1;z=D?0:z;y=(D&1)+y|0;v=I?L:v}while(0);A=c[p>>2]|0;if(A>>>0<(c[q>>2]|0)>>>0){c[p>>2]=A+1;A=d[A>>0]|0}else A=_q(b)|0;D=A+ -48|0;I=(A|0)==46;if(!(D>>>0<10|I)){s=175;break}}}else{E=0;C=0;z=0;y=0;v=0;s=175}while(0);if((s|0)==175){L=(B|0)==0;J=L?E:J;G=L?C:G}s=(F|0)!=0;if(s?(A|32|0)==101:0){u=Zq(b,f)|0;f=H;do if((u|0)==0&(f|0)==-2147483648)if(r){c[b+104>>2]=0;L=c[b+8>>2]|0;c[b+108>>2]=L-(c[p>>2]|0);c[q>>2]=L;O=0.0;i=g;return+O}else{if(!(c[q>>2]|0)){r=0;f=0;break}c[p>>2]=(c[p>>2]|0)+ -1;r=0;f=0;break}else r=u;while(0);J=kr(r|0,f|0,J|0,G|0)|0;G=H}else if((A|0)>-1?(c[q>>2]|0)!=0:0)c[p>>2]=(c[p>>2]|0)+ -1;if(!s){c[(Uc()|0)>>2]=22;c[b+104>>2]=0;L=c[b+8>>2]|0;c[b+108>>2]=L-(c[p>>2]|0);c[q>>2]=L;O=0.0;i=g;return+O}p=c[m>>2]|0;if(!p){O=+(e|0)*0.0;i=g;return+O}do if((J|0)==(E|0)&(G|0)==(C|0)&((C|0)<0|(C|0)==0&E>>>0<10)){if(j>>>0<=30?(p>>>j|0)!=0:0)break;O=+(e|0)*+(p>>>0);i=g;return+O}while(0);L=(l|0)/-2|0;I=((L|0)<0)<<31>>31;if((G|0)>(I|0)|(G|0)==(I|0)&J>>>0>L>>>0){c[(Uc()|0)>>2]=34;O=+(e|0)*1.7976931348623157e+308*1.7976931348623157e+308;i=g;return+O}L=l+ -106|0;I=((L|0)<0)<<31>>31;if((G|0)<(I|0)|(G|0)==(I|0)&J>>>0<L>>>0){c[(Uc()|0)>>2]=34;O=+(e|0)*2.2250738585072014e-308*2.2250738585072014e-308;i=g;return+O}if(z){if((z|0)<9){p=m+(y<<2)|0;b=c[p>>2]|0;do{b=b*10|0;z=z+1|0}while((z|0)!=9);c[p>>2]=b}y=y+1|0}do if((v|0)<9?(v|0)<=(J|0)&(J|0)<18:0){if((J|0)==9){O=+(e|0)*+((c[m>>2]|0)>>>0);i=g;return+O}if((J|0)<9){O=+(e|0)*+((c[m>>2]|0)>>>0)/+(c[29408+(8-J<<2)>>2]|0);i=g;return+O}L=j+27+(da(J,-3)|0)|0;p=c[m>>2]|0;if((L|0)<=30?(p>>>L|0)!=0:0)break;O=+(e|0)*+(p>>>0)*+(c[29408+(J+ -10<<2)>>2]|0);i=g;return+O}while(0);p=(J|0)%9|0;if(!p){p=0;b=0;q=J}else{q=(J|0)>-1?p:p+9|0;s=c[29408+(8-q<<2)>>2]|0;if(y){f=1e9/(s|0)|0;p=0;b=0;r=0;do{G=m+(r<<2)|0;I=c[G>>2]|0;L=((I>>>0)/(s>>>0)|0)+b|0;c[G>>2]=L;b=da((I>>>0)%(s>>>0)|0,f)|0;I=r;r=r+1|0;if((I|0)==(p|0)&(L|0)==0){p=r&127;J=J+ -9|0}}while((r|0)!=(y|0));if(b){c[m+(y<<2)>>2]=b;y=y+1|0}}else{p=0;y=0}b=0;q=9-q+J|0}f:while(1){r=m+(p<<2)|0;if((q|0)<18){do{s=0;r=y+127|0;while(1){r=r&127;f=m+(r<<2)|0;u=or(c[f>>2]|0,0,29)|0;u=kr(u|0,H|0,s|0,0)|0;s=H;if(s>>>0>0|(s|0)==0&u>>>0>1e9){L=yr(u|0,s|0,1e9,0)|0;u=zr(u|0,s|0,1e9,0)|0;s=L}else s=0;c[f>>2]=u;f=(r|0)==(p|0);if(!((r|0)!=(y+127&127|0)|f))y=(u|0)==0?r:y;if(f)break;else r=r+ -1|0}b=b+ -29|0}while((s|0)==0)}else{if((q|0)!=18)break;do{if((c[r>>2]|0)>>>0>=9007199){q=18;break f}s=0;f=y+127|0;while(1){f=f&127;u=m+(f<<2)|0;v=or(c[u>>2]|0,0,29)|0;v=kr(v|0,H|0,s|0,0)|0;s=H;if(s>>>0>0|(s|0)==0&v>>>0>1e9){L=yr(v|0,s|0,1e9,0)|0;v=zr(v|0,s|0,1e9,0)|0;s=L}else s=0;c[u>>2]=v;u=(f|0)==(p|0);if(!((f|0)!=(y+127&127|0)|u))y=(v|0)==0?f:y;if(u)break;else f=f+ -1|0}b=b+ -29|0}while((s|0)==0)}p=p+127&127;if((p|0)==(y|0)){L=y+127&127;y=m+((y+126&127)<<2)|0;c[y>>2]=c[y>>2]|c[m+(L<<2)>>2];y=L}c[m+(p<<2)>>2]=s;q=q+9|0}g:while(1){r=y+1&127;f=m+((y+127&127)<<2)|0;while(1){u=(q|0)==18;s=(q|0)>27?9:1;while(1){v=0;while(1){z=v+p&127;if((z|0)==(y|0)){v=2;break}z=c[m+(z<<2)>>2]|0;A=c[29400+(v<<2)>>2]|0;if(z>>>0<A>>>0){v=2;break}B=v+1|0;if(z>>>0>A>>>0)break;if((B|0)<2)v=B;else{v=B;break}}if((v|0)==2&u)break g;b=s+b|0;if((p|0)==(y|0))p=y;else break}v=(1<<s)+ -1|0;z=1e9>>>s;A=p;u=0;do{I=m+(p<<2)|0;J=c[I>>2]|0;L=(J>>>s)+u|0;c[I>>2]=L;u=da(J&v,z)|0;L=(p|0)==(A|0)&(L|0)==0;p=p+1&127;q=L?q+ -9|0:q;A=L?p:A}while((p|0)!=(y|0));if(!u){p=A;continue}if((r|0)!=(A|0))break;c[f>>2]=c[f>>2]|1;p=A}c[m+(y<<2)>>2]=u;p=A;y=r}q=p&127;if((q|0)==(y|0)){c[m+(r+ -1<<2)>>2]=0;y=r}K=+((c[m+(q<<2)>>2]|0)>>>0);q=p+1&127;if((q|0)==(y|0)){y=y+1&127;c[m+(y+ -1<<2)>>2]=0}t=+(e|0);K=t*(K*1.0e9+ +((c[m+(q<<2)>>2]|0)>>>0));e=b+53|0;l=e-l|0;if((l|0)<(j|0)){j=(l|0)<0?0:l;q=1}else q=0;if((j|0)<53){r=105-j|0;do if((r|0)>1023){f=r+ -1023|0;if((f|0)<=1023){r=f;M=8.98846567431158e+307;break}r=r+ -2046|0;r=(r|0)>1023?1023:r;M=x}else{if((r|0)>=-1022){M=1.0;break}f=r+1022|0;if((f|0)>=-1022){r=f;M=2.2250738585072014e-308;break}r=r+2044|0;r=(r|0)<-1022?-1022:r;M=0.0}while(0);L=or(r+1023|0,0,52)|0;r=H;c[k>>2]=L;c[k+4>>2]=r;N=+_c(+(M*+h[k>>3]),+K);r=53-j|0;do if((r|0)>1023){f=r+ -1023|0;if((f|0)<=1023){r=f;M=8.98846567431158e+307;break}r=r+ -2046|0;r=(r|0)>1023?1023:r;M=x}else{if((r|0)>=-1022){M=1.0;break}f=r+1022|0;if((f|0)>=-1022){r=f;M=2.2250738585072014e-308;break}r=r+2044|0;r=(r|0)<-1022?-1022:r;M=0.0}while(0);J=or(r+1023|0,0,52)|0;L=H;c[k>>2]=J;c[k+4>>2]=L;P=+Ga(+K,+(M*+h[k>>3]));M=N;O=P;K=N+(K-P)}else{M=0.0;O=0.0}r=p+2&127;do if((r|0)!=(y|0)){m=c[m+(r<<2)>>2]|0;do if(m>>>0>=5e8){if(m>>>0>5e8){O=t*.75+O;break}if((p+3&127|0)==(y|0)){O=t*.5+O;break}else{O=t*.75+O;break}}else{if((m|0)==0?(p+3&127|0)==(y|0):0)break;O=t*.25+O}while(0);if((53-j|0)<=1)break;if(+Ga(+O,1.0)!=0.0)break;O=O+1.0}while(0);t=K+O-M;do if((e&2147483647|0)>(-2-o|0)){if(+S(+t)>=9007199254740992.0){q=(q|0)!=0&(j|0)==(l|0)?0:q;b=b+1|0;t=t*.5}if((b+50|0)<=(n|0)?!((q|0)!=0&O!=0.0):0)break;c[(Uc()|0)>>2]=34}while(0);do if((b|0)>1023){t=t*8.98846567431158e+307;e=b+ -1023|0;if((e|0)<=1023){b=e;break}b=b+ -2046|0;b=(b|0)>1023?1023:b;t=t*8.98846567431158e+307}else{if((b|0)>=-1022)break;t=t*2.2250738585072014e-308;e=b+1022|0;if((e|0)>=-1022){b=e;break}b=b+2044|0;b=(b|0)<-1022?-1022:b;t=t*2.2250738585072014e-308}while(0);J=or(b+1023|0,0,52)|0;L=H;c[k>>2]=J;c[k+4>>2]=L;P=t*+h[k>>3];i=g;return+P}else if((u|0)==3){e=c[p>>2]|0;if(e>>>0<(c[q>>2]|0)>>>0){c[p>>2]=e+1;e=d[e>>0]|0}else e=_q(b)|0;if((e|0)==40)e=1;else{if(!(c[q>>2]|0)){P=w;i=g;return+P}c[p>>2]=(c[p>>2]|0)+ -1;P=w;i=g;return+P}while(1){j=c[p>>2]|0;if(j>>>0<(c[q>>2]|0)>>>0){c[p>>2]=j+1;j=d[j>>0]|0}else j=_q(b)|0;if(!((j+ -48|0)>>>0<10|(j+ -65|0)>>>0<26)?!((j+ -97|0)>>>0<26|(j|0)==95):0)break;e=e+1|0}if((j|0)==41){P=w;i=g;return+P}j=(c[q>>2]|0)==0;if(!j)c[p>>2]=(c[p>>2]|0)+ -1;if(r){c[(Uc()|0)>>2]=22;c[b+104>>2]=0;L=c[b+8>>2]|0;c[b+108>>2]=L-(c[p>>2]|0);c[q>>2]=L;P=0.0;i=g;return+P}if((e|0)==0|j){P=w;i=g;return+P}j=c[p>>2]|0;do{e=e+ -1|0;j=j+ -1|0}while((e|0)!=0);c[p>>2]=j;P=w;i=g;return+P}else{e=c[p>>2]|0;if(c[q>>2]|0){e=e+ -1|0;c[p>>2]=e}c[(Uc()|0)>>2]=22;c[b+104>>2]=0;L=c[b+8>>2]|0;c[b+108>>2]=L-e;c[q>>2]=L;P=0.0;i=g;return+P}}while(0);if(((s|0)==23?(c[q>>2]|0)!=0:0)?(o=(c[p>>2]|0)+ -1|0,c[p>>2]=o,!(u>>>0<4|(f|0)==0)):0){do{o=o+ -1|0;u=u+ -1|0}while(u>>>0>3);c[p>>2]=o}P=+(e|0)*x;i=g;return+P}function Zq(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;g=a+4|0;h=c[g>>2]|0;f=a+100|0;if(h>>>0<(c[f>>2]|0)>>>0){c[g>>2]=h+1;j=d[h>>0]|0}else j=_q(a)|0;if((j|0)==43|(j|0)==45){h=(j|0)==45&1;j=c[g>>2]|0;if(j>>>0<(c[f>>2]|0)>>>0){c[g>>2]=j+1;j=d[j>>0]|0}else j=_q(a)|0;if(!((j+ -48|0)>>>0<10|(b|0)==0)?(c[f>>2]|0)!=0:0)c[g>>2]=(c[g>>2]|0)+ -1}else h=0;if((j+ -48|0)>>>0>9){if(!(c[f>>2]|0)){k=-2147483648;l=0;H=k;i=e;return l|0}c[g>>2]=(c[g>>2]|0)+ -1;k=-2147483648;l=0;H=k;i=e;return l|0}else b=0;while(1){b=j+ -48+b|0;j=c[g>>2]|0;if(j>>>0<(c[f>>2]|0)>>>0){c[g>>2]=j+1;j=d[j>>0]|0}else j=_q(a)|0;l=(j+ -48|0)>>>0<10;if(!(l&(b|0)<214748364))break;b=b*10|0}k=((b|0)<0)<<31>>31;if(l)do{k=xr(b|0,k|0,10,0)|0;b=H;j=kr(j|0,((j|0)<0)<<31>>31|0,-48,-1)|0;b=kr(j|0,H|0,k|0,b|0)|0;k=H;j=c[g>>2]|0;if(j>>>0<(c[f>>2]|0)>>>0){c[g>>2]=j+1;j=d[j>>0]|0}else j=_q(a)|0}while((j+ -48|0)>>>0<10&((k|0)<21474836|(k|0)==21474836&b>>>0<2061584302));if((j+ -48|0)>>>0<10)do{j=c[g>>2]|0;if(j>>>0<(c[f>>2]|0)>>>0){c[g>>2]=j+1;j=d[j>>0]|0}else j=_q(a)|0}while((j+ -48|0)>>>0<10);if(c[f>>2]|0)c[g>>2]=(c[g>>2]|0)+ -1;j=(h|0)!=0;l=jr(0,0,b|0,k|0)|0;k=j?H:k;l=j?l:b;H=k;i=e;return l|0}function _q(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;h=b+104|0;l=c[h>>2]|0;if(!((l|0)!=0?(c[b+108>>2]|0)>=(l|0):0))g=3;if((g|0)==3?(f=br(b)|0,(f|0)>=0):0){l=c[h>>2]|0;h=c[b+8>>2]|0;k=c[b+4>>2]|0;if((l|0)!=0?(j=l-(c[b+108>>2]|0)+ -1|0,(h-k|0)>(j|0)):0)c[b+100>>2]=k+j;else g=8;if((g|0)==8)c[b+100>>2]=h;if(h){l=b+108|0;c[l>>2]=h+1-k+(c[l>>2]|0)}b=k+ -1|0;if((d[b>>0]|0|0)==(f|0)){l=f;i=e;return l|0}a[b>>0]=f;l=f;i=e;return l|0}c[b+100>>2]=0;l=-1;i=e;return l|0}function $q(a,b){a=+a;b=b|0;var d=0,e=0,f=0,g=0;d=i;h[k>>3]=a;f=c[k>>2]|0;e=c[k+4>>2]|0;g=lr(f|0,e|0,52)|0;g=g&2047;if(!g){if(a!=0.0){a=+$q(a*18446744073709552000.0,b);e=(c[b>>2]|0)+ -64|0}else e=0;c[b>>2]=e;i=d;return+a}else if((g|0)==2047){i=d;return+a}else{c[b>>2]=g+ -1022;c[k>>2]=f;c[k+4>>2]=e&-2146435073|1071644672;a=+h[k>>3];i=d;return+a}return 0.0}function ar(b,d){b=b|0;d=d|0;var e=0;e=i;if(!b){b=1;i=e;return b|0}if(d>>>0<128){a[b>>0]=d;b=1;i=e;return b|0}if(d>>>0<2048){a[b>>0]=d>>>6|192;a[b+1>>0]=d&63|128;b=2;i=e;return b|0}if(d>>>0<55296|(d+ -57344|0)>>>0<8192){a[b>>0]=d>>>12|224;a[b+1>>0]=d>>>6&63|128;a[b+2>>0]=d&63|128;b=3;i=e;return b|0}if((d+ -65536|0)>>>0<1048576){a[b>>0]=d>>>18|240;a[b+1>>0]=d>>>12&63|128;a[b+2>>0]=d>>>6&63|128;a[b+3>>0]=d&63|128;b=4;i=e;return b|0}else{c[(Uc()|0)>>2]=84;b=-1;i=e;return b|0}return 0}function br(b){b=b|0;var e=0,f=0,g=0,h=0,j=0;g=i;i=i+16|0;e=g;f=b+8|0;do if(!(c[f>>2]|0)){j=b+74|0;h=a[j>>0]|0;a[j>>0]=h+255|h;j=b+20|0;h=b+44|0;if((c[j>>2]|0)>>>0>(c[h>>2]|0)>>>0)fd[c[b+36>>2]&31](b,0,0)|0;c[b+16>>2]=0;c[b+28>>2]=0;c[j>>2]=0;j=c[b>>2]|0;if(!(j&20)){j=c[h>>2]|0;c[f>>2]=j;c[b+4>>2]=j;break}if(!(j&4)){j=-1;i=g;return j|0}c[b>>2]=j|32;j=-1;i=g;return j|0}while(0);if((fd[c[b+32>>2]&31](b,e,1)|0)!=1){j=-1;i=g;return j|0}j=d[e>>0]|0;i=g;return j|0}function cr(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;g=e+16|0;j=c[g>>2]|0;do if(!j){h=e+74|0;k=a[h>>0]|0;a[h>>0]=k+255|k;h=c[e>>2]|0;if(!(h&8)){c[e+8>>2]=0;c[e+4>>2]=0;h=c[e+44>>2]|0;c[e+28>>2]=h;c[e+20>>2]=h;j=h+(c[e+48>>2]|0)|0;c[g>>2]=j;break}c[e>>2]=h|32;i=f;return}else h=c[e+20>>2]|0;while(0);g=e+20|0;if((j-h|0)>>>0<d>>>0){fd[c[e+36>>2]&31](e,b,d)|0;i=f;return}a:do if((a[e+75>>0]|0)>-1){j=d;while(1){if(!j)break a;k=j+ -1|0;if((a[b+k>>0]|0)==10)break;else j=k}if((fd[c[e+36>>2]&31](e,b,j)|0)>>>0<j>>>0){i=f;return}else{d=d-j|0;b=b+j|0;h=c[g>>2]|0;break}}while(0);nr(h|0,b|0,d|0)|0;c[g>>2]=(c[g>>2]|0)+d;i=f;return}function dr(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+16|0;g=f;c[g>>2]=e;e=fr(a,b,d,g)|0;i=f;return e|0}function er(e,f,g,j,l){e=e|0;f=f|0;g=g|0;j=j|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0.0,fb=0,gb=0.0,hb=0;m=i;i=i+864|0;B=m+16|0;r=m+8|0;v=m+560|0;w=v;u=m+840|0;s=m+584|0;J=m+520|0;N=m;G=m+852|0;L=(e|0)!=0;Y=J+40|0;I=Y;J=J+39|0;M=N+4|0;t=u+12|0;u=u+11|0;A=t;z=A-w|0;x=-2-w|0;y=A+2|0;C=B+288|0;D=v+9|0;E=D;F=v+8|0;Ra=0;Ua=0;pa=0;Va=0;Sa=0;a:while(1){do if((pa|0)>-1)if((Va|0)>(2147483647-pa|0)){c[(Uc()|0)>>2]=75;pa=-1;break}else{pa=Va+pa|0;break}while(0);Pa=a[f>>0]|0;if(!(Pa<<24>>24)){Na=357;break}else Oa=f;while(1){if(Pa<<24>>24==37){O=Oa;K=Oa;Na=9;break}else if(!(Pa<<24>>24)){ma=Oa;oa=Oa;break}fb=Oa+1|0;Pa=a[fb>>0]|0;Oa=fb}b:do if((Na|0)==9)while(1){Na=0;if((a[O+1>>0]|0)!=37){ma=O;oa=K;break b}oa=K+1|0;ma=O+2|0;if((a[ma>>0]|0)==37){O=ma;K=oa}else break}while(0);Va=oa-f|0;if(L)cr(f,Va,e);if((oa|0)!=(f|0)){f=ma;continue}Qa=ma+1|0;Ta=a[Qa>>0]|0;Wa=(Ta<<24>>24)+ -48|0;if(Wa>>>0<10?(a[ma+2>>0]|0)==36:0){Qa=ma+3|0;Ta=a[Qa>>0]|0;Oa=1}else{Wa=-1;Oa=Sa}Pa=Ta<<24>>24;c:do if((Pa+ -32|0)>>>0<32){Xa=0;while(1){if(!(1<<Pa+ -32&75913)){Pa=Ta;break c}Xa=1<<(Ta<<24>>24)+ -32|Xa;Qa=Qa+1|0;Ta=a[Qa>>0]|0;Pa=Ta<<24>>24;if((Pa+ -32|0)>>>0>=32){Pa=Ta;break}}}else{Pa=Ta;Xa=0}while(0);do if(Pa<<24>>24==42){Pa=Qa+1|0;Ta=(a[Pa>>0]|0)+ -48|0;if(Ta>>>0<10?(a[Qa+2>>0]|0)==36:0){c[l+(Ta<<2)>>2]=10;Oa=1;Ta=Qa+3|0;Qa=c[j+((a[Pa>>0]|0)+ -48<<3)>>2]|0}else{if(Oa){p=-1;Na=376;break a}if(!L){Oa=0;Qa=0;break}Oa=c[g>>2]|0;Qa=c[Oa>>2]|0;c[g>>2]=Oa+4;Oa=0;Ta=Pa}if((Qa|0)<0){Pa=Ta;Xa=Xa|8192;Qa=0-Qa|0}else Pa=Ta}else{Ta=Pa<<24>>24;if((Ta+ -48|0)>>>0<10){Pa=Qa;Qa=0;do{Qa=Ta+ -48+(Qa*10|0)|0;Pa=Pa+1|0;Ta=a[Pa>>0]|0}while((Ta+ -48|0)>>>0<10);if((Qa|0)<0){p=-1;Na=376;break a}}else{Pa=Qa;Qa=0}}while(0);d:do if((a[Pa>>0]|0)==46){Ta=Pa+1|0;Ya=a[Ta>>0]|0;if(Ya<<24>>24!=42){Ya=Ya<<24>>24;if((Ya+ -48|0)>>>0<10){Pa=Ta;Ta=0}else{Pa=Ta;Ta=0;break}while(1){Ta=Ya+ -48+(Ta*10|0)|0;Pa=Pa+1|0;Ya=a[Pa>>0]|0;if((Ya+ -48|0)>>>0>=10)break d}}Ta=Pa+2|0;Ya=(a[Ta>>0]|0)+ -48|0;if(Ya>>>0<10?(a[Pa+3>>0]|0)==36:0){c[l+(Ya<<2)>>2]=10;Pa=Pa+4|0;Ta=c[j+((a[Ta>>0]|0)+ -48<<3)>>2]|0;break}if(Oa){p=-1;Na=376;break a}if(L){Pa=c[g>>2]|0;fb=c[Pa>>2]|0;c[g>>2]=Pa+4;Pa=Ta;Ta=fb}else{Pa=Ta;Ta=0}}else Ta=-1;while(0);Za=Pa;Ya=0;while(1){_a=a[Za>>0]|0;$a=(_a<<24>>24)+ -65|0;if($a>>>0>57){p=-1;Na=376;break a}Pa=Za+1|0;ab=a[29440+(Ya*58|0)+$a>>0]|0;$a=ab&255;if(($a+ -1|0)>>>0<8){Za=Pa;Ya=$a}else break}if(!(ab<<24>>24)){p=-1;Na=376;break}bb=(Wa|0)>-1;e:do if(ab<<24>>24==19)if(bb){p=-1;Na=376;break a}else{Q=Ra;P=Ua;Na=63}else{if(bb){c[l+(Wa<<2)>>2]=$a;P=j+(Wa<<3)|0;Q=c[P+4>>2]|0;P=c[P>>2]|0;Na=63;break}if(!L){p=0;Na=376;break a}if((ab&255)>20){T=_a;U=Ua;V=Ra}else do switch($a|0){case 11:{S=c[g>>2]|0;R=c[S>>2]|0;c[g>>2]=S+4;S=0;Na=64;break e};case 14:{S=c[g>>2]|0;R=c[S>>2]|0;c[g>>2]=S+4;R=R&65535;S=0;Na=64;break e};case 12:{Na=c[g>>2]|0;S=Na;R=c[S>>2]|0;S=c[S+4>>2]|0;c[g>>2]=Na+8;Na=64;break e};case 16:{S=c[g>>2]|0;R=c[S>>2]|0;c[g>>2]=S+4;R=R&255;S=0;Na=64;break e};case 15:{R=c[g>>2]|0;S=c[R>>2]|0;c[g>>2]=R+4;R=S<<24>>24;S=(((S&255)<<24>>24|0)<0)<<31>>31;Na=64;break e};case 17:{R=c[g>>2]|0;c[k>>2]=c[R>>2];c[k+4>>2]=c[R+4>>2];gb=+h[k>>3];c[g>>2]=R+8;h[k>>3]=gb;R=c[k>>2]|0;S=c[k+4>>2]|0;Na=64;break e};case 9:{S=c[g>>2]|0;R=c[S>>2]|0;c[g>>2]=S+4;S=Ra;Na=64;break e};case 10:{R=c[g>>2]|0;S=c[R>>2]|0;c[g>>2]=R+4;R=S;S=((S|0)<0)<<31>>31;Na=64;break e};case 13:{R=c[g>>2]|0;S=c[R>>2]|0;c[g>>2]=R+4;R=S<<16>>16;S=(((S&65535)<<16>>16|0)<0)<<31>>31;Na=64;break e};case 18:{R=c[g>>2]|0;c[k>>2]=c[R>>2];c[k+4>>2]=c[R+4>>2];gb=+h[k>>3];c[g>>2]=R+8;h[k>>3]=gb;R=c[k>>2]|0;S=c[k+4>>2]|0;Na=64;break e};default:{R=Ua;S=Ra;Na=64;break e}}while(0)}while(0);if((Na|0)==63){Na=0;if(L){R=P;S=Q;Na=64}else{Ra=Q;Ua=P;f=Pa;Sa=Oa;continue}}if((Na|0)==64){Na=0;T=a[Za>>0]|0;U=R;V=S}Ua=T<<24>>24;if(Ya)Ua=(Ua&15|0)==3?Ua&-33:Ua;Wa=Xa&-65537;Ra=(Xa&8192|0)==0?Xa:Wa;f:do switch(Ua|0){case 111:{Ba=U;Ma=(Ba|0)==0&(V|0)==0;if(Ma)Ja=Y;else{Ja=Y;xa=V;do{Ja=Ja+ -1|0;a[Ja>>0]=Ba&7|48;Ba=lr(Ba|0,xa|0,3)|0;xa=H}while(!((Ba|0)==0&(xa|0)==0))}if(!(Ra&8)){xa=U;Ba=V;La=Ra;Ia=Ta;Ka=0;Ma=29904;Na=94}else{xa=U;Ba=V;La=Ra;Ia=Ta;Ka=Ma&1^1;Ma=Ma?29904:29909;Na=94}break};case 67:{c[N>>2]=U;c[M>>2]=0;Z=N;X=N;q=-1;Na=115;break};case 83:{if(!Ta){sa=U;qa=U;ta=0;Na=122}else{Z=U;X=U;q=Ta;Na=115}break};case 109:{ja=bd(c[(Uc()|0)>>2]|0)|0;Na=99;break};case 65:case 71:case 70:case 69:case 97:case 103:case 102:case 101:{c[k>>2]=U;c[k+4>>2]=V;eb=+h[k>>3];c[r>>2]=0;if((V|0)>=0)if(!(Ra&2048)){Sa=Ra&1;f=Sa;Sa=(Sa|0)==0?29929:29934}else{f=1;Sa=29931}else{eb=-eb;f=1;Sa=29928}h[k>>3]=eb;fb=c[k+4>>2]&2146435072;if(!(fb>>>0<2146435072|(fb|0)==2146435072&0<0)){Ta=(Ua&32|0)!=0;if(eb!=eb|0.0!=0.0){f=0;Ua=Ta?29968:29976}else Ua=Ta?29952:29960;Va=f+3|0;Ta=(Va|0)<(Qa|0);if((Ra&8192|0)==0&Ta){Wa=Qa-Va|0;qr(s|0,32,(Wa>>>0>256?256:Wa)|0)|0;if(Wa>>>0>255)do{cr(s,256,e);Wa=Wa+ -256|0}while(Wa>>>0>255);cr(s,Wa,e)}cr(Sa,f,e);cr(Ua,3,e);if((Ra&73728|0)==8192&Ta){Ra=Qa-Va|0;qr(s|0,32,(Ra>>>0>256?256:Ra)|0)|0;if(Ra>>>0>255)do{cr(s,256,e);Ra=Ra+ -256|0}while(Ra>>>0>255);cr(s,Ra,e)}Ra=V;Ua=U;f=Pa;Va=Ta?Qa:Va;Sa=Oa;continue a}eb=+$q(eb,r)*2.0;Wa=eb!=0.0;if(Wa)c[r>>2]=(c[r>>2]|0)+ -1;Ya=Ua|32;if((Ya|0)==97){Wa=Ua&32;Sa=(Wa|0)==0?Sa:Sa+9|0;f=f|2;Va=Ta>>>0>11?0:12-Ta|0;do if(Va){gb=8.0;do{Va=Va+ -1|0;gb=gb*16.0}while((Va|0)!=0);if((a[Sa>>0]|0)==45){eb=-(gb+(-eb-gb));break}else{eb=eb+gb-gb;break}}while(0);Ya=c[r>>2]|0;Ya=(Ya|0)<0?0-Ya|0:Ya;if((Ya|0)<0){Xa=t;Va=Ya;Ya=((Ya|0)<0)<<31>>31;while(1){fb=zr(Va|0,Ya|0,10,0)|0;Xa=Xa+ -1|0;a[Xa>>0]=fb|48;fb=Va;Va=yr(Va|0,Ya|0,10,0)|0;if(!(Ya>>>0>9|(Ya|0)==9&fb>>>0>4294967295))break;else Ya=H}}else{Xa=t;Va=Ya}if(Va)while(1){Xa=Xa+ -1|0;a[Xa>>0]=(Va>>>0)%10|0|48;if(Va>>>0<10)break;else Va=(Va>>>0)/10|0}if((Xa|0)==(t|0)){a[u>>0]=48;Xa=u}a[Xa+ -1>>0]=(c[r>>2]>>31&2)+43;Va=Xa+ -2|0;a[Va>>0]=Ua+15;Ua=(Ra&8|0)==0;if((Ta|0)>0)if(Ua){Xa=v;while(1){fb=~~eb;Ua=Xa+1|0;a[Xa>>0]=d[29984+fb>>0]|Wa;eb=(eb- +(fb|0))*16.0;if((Ua-w|0)==1){a[Ua>>0]=46;Ua=Xa+2|0}if(!(eb!=0.0))break;else Xa=Ua}}else{Xa=v;while(1){fb=~~eb;Ua=Xa+1|0;a[Xa>>0]=d[29984+fb>>0]|Wa;eb=(eb- +(fb|0))*16.0;if((Ua-w|0)==1){a[Ua>>0]=46;Ua=Xa+2|0}if(!(eb!=0.0))break;else Xa=Ua}}else if(Ua){Ya=v;while(1){Xa=~~eb;Ua=Ya+1|0;a[Ya>>0]=d[29984+Xa>>0]|Wa;eb=(eb- +(Xa|0))*16.0;Xa=eb!=0.0;if((Ua-w|0)==1&Xa){a[Ua>>0]=46;Ua=Ya+2|0}if(!Xa)break;else Ya=Ua}}else{Xa=v;while(1){fb=~~eb;Ua=Xa+1|0;a[Xa>>0]=d[29984+fb>>0]|Wa;eb=(eb- +(fb|0))*16.0;if((Ua-w|0)==1){a[Ua>>0]=46;Ua=Xa+2|0}if(!(eb!=0.0))break;else Xa=Ua}}do if(!Ta)Na=186;else{if((x+Ua|0)>=(Ta|0)){Na=186;break}W=y+Ta-Va|0}while(0);if((Na|0)==186){Na=0;W=z-Va+Ua|0}Ta=W+f|0;Ra=Ra&73728;Wa=(Ta|0)<(Qa|0);if((Ra|0)==0&Wa){Xa=Qa-Ta|0;qr(s|0,32,(Xa>>>0>256?256:Xa)|0)|0;if(Xa>>>0>255)do{cr(s,256,e);Xa=Xa+ -256|0}while(Xa>>>0>255);cr(s,Xa,e)}cr(Sa,f,e);if((Ra|0)==65536&Wa){Sa=Qa-Ta|0;qr(s|0,48,(Sa>>>0>256?256:Sa)|0)|0;if(Sa>>>0>255)do{cr(s,256,e);Sa=Sa+ -256|0}while(Sa>>>0>255);cr(s,Sa,e)}f=Ua-w|0;cr(v,f,e);Sa=A-Va|0;f=W-Sa-f|0;if((f|0)>0){qr(s|0,48,(f>>>0>256?256:f)|0)|0;if(f>>>0>255)do{cr(s,256,e);f=f+ -256|0}while(f>>>0>255);cr(s,f,e)}cr(Va,Sa,e);if((Ra|0)==8192&Wa){Ra=Qa-Ta|0;qr(s|0,32,(Ra>>>0>256?256:Ra)|0)|0;if(Ra>>>0>255)do{cr(s,256,e);Ra=Ra+ -256|0}while(Ra>>>0>255);cr(s,Ra,e)}Ra=V;Ua=U;f=Pa;Va=Wa?Qa:Ta;Sa=Oa;continue a}Va=(Ta|0)<0?6:Ta;if(Wa){Ta=(c[r>>2]|0)+ -28|0;c[r>>2]=Ta;eb=eb*268435456.0}else Ta=c[r>>2]|0;Ta=(Ta|0)<0?B:C;Wa=Ta;do{fb=~~eb>>>0;c[Wa>>2]=fb;Wa=Wa+4|0;eb=(eb- +(fb>>>0))*1.0e9}while(eb!=0.0);ab=c[r>>2]|0;if((ab|0)>0){Xa=Ta;do{Za=(ab|0)>29?29:ab;$a=Wa+ -4|0;do if($a>>>0>=Xa>>>0){_a=0;do{db=or(c[$a>>2]|0,0,Za|0)|0;db=kr(db|0,H|0,_a|0,0)|0;fb=H;cb=zr(db|0,fb|0,1e9,0)|0;c[$a>>2]=cb;_a=yr(db|0,fb|0,1e9,0)|0;$a=$a+ -4|0}while($a>>>0>=Xa>>>0);if(!_a)break;Xa=Xa+ -4|0;c[Xa>>2]=_a}while(0);while(1){if(Wa>>>0<=Xa>>>0)break;_a=Wa+ -4|0;if(!(c[_a>>2]|0))Wa=_a;else break}ab=(c[r>>2]|0)-Za|0;c[r>>2]=ab}while((ab|0)>0)}else Xa=Ta;g:do if((ab|0)<0){Za=((Va+25|0)/9|0)+1|0;if((Ya|0)==102){_a=Ta;$a=Ta+(Za<<2)|0;while(1){ab=0-ab|0;ab=(ab|0)>9?9:ab;do if(Xa>>>0<Wa>>>0){cb=(1<<ab)+ -1|0;db=1e9>>>ab;bb=0;fb=Xa;do{hb=c[fb>>2]|0;c[fb>>2]=(hb>>>ab)+bb;bb=da(hb&cb,db)|0;fb=fb+4|0}while(fb>>>0<Wa>>>0);Xa=(c[Xa>>2]|0)==0?Xa+4|0:Xa;if(!bb)break;c[Wa>>2]=bb;Wa=Wa+4|0}else Xa=(c[Xa>>2]|0)==0?Xa+4|0:Xa;while(0);Wa=(Wa-_a>>2|0)>(Za|0)?$a:Wa;ab=(c[r>>2]|0)+ab|0;c[r>>2]=ab;if((ab|0)>=0)break g}}do{_a=0-ab|0;_a=(_a|0)>9?9:_a;do if(Xa>>>0<Wa>>>0){cb=(1<<_a)+ -1|0;ab=1e9>>>_a;$a=0;bb=Xa;do{hb=c[bb>>2]|0;c[bb>>2]=(hb>>>_a)+$a;$a=da(hb&cb,ab)|0;bb=bb+4|0}while(bb>>>0<Wa>>>0);Xa=(c[Xa>>2]|0)==0?Xa+4|0:Xa;if(!$a)break;c[Wa>>2]=$a;Wa=Wa+4|0}else Xa=(c[Xa>>2]|0)==0?Xa+4|0:Xa;while(0);if((Wa-Xa>>2|0)>(Za|0))Wa=Xa+(Za<<2)|0;ab=(c[r>>2]|0)+_a|0;c[r>>2]=ab}while((ab|0)<0)}while(0);Za=Ta;do if(Xa>>>0<Wa>>>0){_a=(Za-Xa>>2)*9|0;$a=c[Xa>>2]|0;if($a>>>0<10)break;else ab=10;do{ab=ab*10|0;_a=_a+1|0}while($a>>>0>=ab>>>0)}else _a=0;while(0);$a=(Ya|0)==103;Ya=Va-((Ya|0)!=102?_a:0)+(($a&(Va|0)!=0)<<31>>31)|0;if((Ya|0)<(((Wa-Za>>2)*9|0)+ -9|0)){cb=Ya+9216|0;bb=(cb|0)/9|0;Ya=Ta+(bb+ -1023<<2)|0;cb=((cb|0)%9|0)+1|0;if((cb|0)<9){ab=10;do{ab=ab*10|0;cb=cb+1|0}while((cb|0)!=9)}else ab=10;db=c[Ya>>2]|0;cb=(db>>>0)%(ab>>>0)|0;if((cb|0)==0?(Ta+(bb+ -1022<<2)|0)==(Wa|0):0){va=Xa;wa=Ya;Da=_a}else Na=246;do if((Na|0)==246){Na=0;eb=(((db>>>0)/(ab>>>0)|0)&1|0)==0?9007199254740992.0:9007199254740994.0;va=(ab|0)/2|0;do if(cb>>>0<va>>>0)gb=.5;else{if((cb|0)==(va|0)?(Ta+(bb+ -1022<<2)|0)==(Wa|0):0){gb=1.0;break}gb=1.5}while(0);do if(f){if((a[Sa>>0]|0)!=45)break;eb=eb*-1.0;gb=gb*-1.0}while(0);va=db-cb|0;c[Ya>>2]=va;if(!(eb+gb!=eb)){va=Xa;wa=Ya;Da=_a;break}hb=va+ab|0;c[Ya>>2]=hb;if(hb>>>0>999999999){va=Xa;while(1){wa=Ya+ -4|0;c[Ya>>2]=0;if(wa>>>0<va>>>0){va=va+ -4|0;c[va>>2]=0}hb=(c[wa>>2]|0)+1|0;c[wa>>2]=hb;if(hb>>>0>999999999)Ya=wa;else break}}else{va=Xa;wa=Ya}Da=(Za-va>>2)*9|0;Xa=c[va>>2]|0;if(Xa>>>0<10)break;else Ya=10;do{Ya=Ya*10|0;Da=Da+1|0}while(Xa>>>0>=Ya>>>0)}while(0);hb=wa+4|0;Xa=va;Ya=Da;Wa=Wa>>>0>hb>>>0?hb:Wa}else Ya=_a;bb=0-Ya|0;while(1){if(Wa>>>0<=Xa>>>0){_a=0;break}_a=Wa+ -4|0;if(!(c[_a>>2]|0))Wa=_a;else{_a=1;break}}do if($a){Va=((Va|0)==0&1)+Va|0;if((Va|0)>(Ya|0)&(Ya|0)>-5){Ua=Ua+ -1|0;Va=Va+ -1-Ya|0}else{Ua=Ua+ -2|0;Va=Va+ -1|0}if(Ra&8)break;do if(_a){ab=c[Wa+ -4>>2]|0;if(!ab){cb=9;break}if(!((ab>>>0)%10|0)){$a=10;cb=0}else{cb=0;break}do{$a=$a*10|0;cb=cb+1|0}while(((ab>>>0)%($a>>>0)|0|0)==0)}else cb=9;while(0);Za=((Wa-Za>>2)*9|0)+ -9|0;if((Ua|32|0)==102){hb=Za-cb|0;hb=(hb|0)<0?0:hb;Va=(Va|0)<(hb|0)?Va:hb;break}else{hb=Za+Ya-cb|0;hb=(hb|0)<0?0:hb;Va=(Va|0)<(hb|0)?Va:hb;break}}while(0);$a=(Va|0)!=0;if($a)Za=1;else Za=(Ra&8|0)!=0;Za=Za&1;ab=(Ua|32|0)==102;if(ab){Ua=(Ya|0)>0?Ya:0;bb=0}else{cb=(Ya|0)<0?bb:Ya;if((cb|0)<0){db=t;bb=cb;cb=((cb|0)<0)<<31>>31;while(1){hb=zr(bb|0,cb|0,10,0)|0;db=db+ -1|0;a[db>>0]=hb|48;hb=bb;bb=yr(bb|0,cb|0,10,0)|0;if(!(cb>>>0>9|(cb|0)==9&hb>>>0>4294967295))break;else cb=H}}else{db=t;bb=cb}if(bb)while(1){db=db+ -1|0;a[db>>0]=(bb>>>0)%10|0|48;if(bb>>>0<10)break;else bb=(bb>>>0)/10|0}if((A-db|0)<2)do{db=db+ -1|0;a[db>>0]=48}while((A-db|0)<2);a[db+ -1>>0]=(Ya>>31&2)+43;bb=db+ -2|0;a[bb>>0]=Ua;Ua=A-bb|0}Ya=f+1+Va+Za+Ua|0;Ua=Ra&73728;Za=(Ya|0)<(Qa|0);if((Ua|0)==0&Za){cb=Qa-Ya|0;qr(s|0,32,(cb>>>0>256?256:cb)|0)|0;if(cb>>>0>255)do{cr(s,256,e);cb=cb+ -256|0}while(cb>>>0>255);cr(s,cb,e)}cr(Sa,f,e);if((Ua|0)==65536&Za){Sa=Qa-Ya|0;qr(s|0,48,(Sa>>>0>256?256:Sa)|0)|0;if(Sa>>>0>255)do{cr(s,256,e);Sa=Sa+ -256|0}while(Sa>>>0>255);cr(s,Sa,e)}do if(ab){f=Xa>>>0>Ta>>>0?Ta:Xa;Sa=f;do{_a=c[Sa>>2]|0;if(!_a)Xa=D;else{Xa=D;while(1){Xa=Xa+ -1|0;a[Xa>>0]=(_a>>>0)%10|0|48;if(_a>>>0<10)break;else _a=(_a>>>0)/10|0}}do if((Sa|0)==(f|0)){if((Xa|0)!=(D|0))break;a[F>>0]=48;Xa=F}else{if(Xa>>>0<=v>>>0)break;do{Xa=Xa+ -1|0;a[Xa>>0]=48}while(Xa>>>0>v>>>0)}while(0);cr(Xa,E-Xa|0,e);Sa=Sa+4|0}while(Sa>>>0<=Ta>>>0);if(!$a?(Ra&8|0)==0:0)break;cr(3e4,1,e);if(Sa>>>0<Wa>>>0&(Va|0)>0)do{Ta=c[Sa>>2]|0;if(Ta){Ra=D;while(1){Ra=Ra+ -1|0;a[Ra>>0]=(Ta>>>0)%10|0|48;if(Ta>>>0<10)break;else Ta=(Ta>>>0)/10|0}if(Ra>>>0>v>>>0){$=Ra;Na=313}else na=Ra}else{$=D;Na=313}if((Na|0)==313)while(1){Na=0;na=$+ -1|0;a[na>>0]=48;if(na>>>0>v>>>0)$=na;else break}cr(na,(Va|0)>9?9:Va,e);Sa=Sa+4|0;Va=Va+ -9|0}while(Sa>>>0<Wa>>>0&(Va|0)>0);if((Va|0)<=0)break;qr(s|0,48,(Va>>>0>256?256:Va)|0)|0;if(Va>>>0>255)do{cr(s,256,e);Va=Va+ -256|0}while(Va>>>0>255);cr(s,Va,e)}else{Sa=_a?Wa:Xa+4|0;do if((Va|0)>-1){Ra=(Ra&8|0)!=0;Ta=Xa;do{Wa=c[Ta>>2]|0;if(Wa){f=D;while(1){f=f+ -1|0;a[f>>0]=(Wa>>>0)%10|0|48;if(Wa>>>0<10)break;else Wa=(Wa>>>0)/10|0}if((f|0)!=(D|0))aa=f;else Na=324}else Na=324;if((Na|0)==324){Na=0;a[F>>0]=48;aa=F}do if((Ta|0)==(Xa|0)){f=aa+1|0;cr(aa,1,e);if(!((Va|0)>0|Ra))break;cr(3e4,1,e)}else{if(aa>>>0>v>>>0)f=aa;else{f=aa;break}do{f=f+ -1|0;a[f>>0]=48}while(f>>>0>v>>>0)}while(0);hb=E-f|0;cr(f,(hb|0)<(Va|0)?hb:Va,e);Va=Va-hb|0;Ta=Ta+4|0}while(Ta>>>0<Sa>>>0&(Va|0)>-1);if((Va|0)<=0)break;qr(s|0,48,(Va>>>0>256?256:Va)|0)|0;if(Va>>>0>255)do{cr(s,256,e);Va=Va+ -256|0}while(Va>>>0>255);cr(s,Va,e)}while(0);cr(bb,A-bb|0,e)}while(0);if((Ua|0)==8192&Za){Ra=Qa-Ya|0;qr(s|0,32,(Ra>>>0>256?256:Ra)|0)|0;if(Ra>>>0>255)do{cr(s,256,e);Ra=Ra+ -256|0}while(Ra>>>0>255);cr(s,Ra,e)}Ra=V;Ua=U;f=Pa;Va=Za?Qa:Ya;Sa=Oa;continue a};case 88:case 120:{ca=Ra;ea=Ta;ba=Ua;Na=77;break};case 105:case 100:{if((V|0)<0){fa=jr(0,0,U|0,V|0)|0;ga=H;ha=1;ia=29904;Na=89;break f}if(!(Ra&2048)){ia=Ra&1;fa=U;ga=V;ha=ia;ia=(ia|0)==0?29904:29906;Na=89}else{fa=U;ga=V;ha=1;ia=29905;Na=89}break};case 117:{fa=U;ga=V;ha=0;ia=29904;Na=89;break};case 99:{a[J>>0]=U;Aa=V;za=U;ya=J;Ca=Wa;Ga=1;Fa=0;Ea=29904;Ha=Y;break};case 110:switch(Ya|0){case 7:{Ra=U;c[Ra>>2]=pa;c[Ra+4>>2]=((pa|0)<0)<<31>>31;Ra=V;Ua=U;f=Pa;Sa=Oa;continue a};case 0:{c[U>>2]=pa;Ra=V;Ua=U;f=Pa;Sa=Oa;continue a};case 2:{Ra=U;c[Ra>>2]=pa;c[Ra+4>>2]=((pa|0)<0)<<31>>31;Ra=V;Ua=U;f=Pa;Sa=Oa;continue a};case 6:{c[U>>2]=pa;Ra=V;Ua=U;f=Pa;Sa=Oa;continue a};case 1:{c[U>>2]=pa;Ra=V;Ua=U;f=Pa;Sa=Oa;continue a};case 3:{b[U>>1]=pa;Ra=V;Ua=U;f=Pa;Sa=Oa;continue a};case 4:{a[U>>0]=pa;Ra=V;Ua=U;f=Pa;Sa=Oa;continue a};default:{Ra=V;Ua=U;f=Pa;Sa=Oa;continue a}};case 112:{ca=Ra|8;ea=Ta>>>0>8?Ta:8;ba=120;Na=77;break};case 115:{ja=(U|0)==0?29920:U;Na=99;break};default:{Aa=V;za=U;ya=f;Ca=Ra;Ga=Ta;Fa=0;Ea=29904;Ha=Y}}while(0);h:do if((Na|0)==77){Ba=U;xa=ba&32;if(!((Ba|0)==0&(V|0)==0)){Ja=Y;Ia=V;do{Ja=Ja+ -1|0;a[Ja>>0]=d[29984+(Ba&15)>>0]|xa;Ba=lr(Ba|0,Ia|0,4)|0;Ia=H}while(!((Ba|0)==0&(Ia|0)==0));if(!(ca&8)){xa=U;Ba=V;La=ca;Ia=ea;Ka=0;Ma=29904;Na=94}else{xa=U;Ba=V;La=ca;Ia=ea;Ka=2;Ma=29904+(ba>>4)|0;Na=94}}else{xa=U;Ba=V;Ja=Y;La=ca;Ia=ea;Ka=0;Ma=29904;Na=94}}else if((Na|0)==89){xa=fa;if(ga>>>0>0|(ga|0)==0&xa>>>0>4294967295){Ja=Y;Ba=ga;while(1){hb=zr(xa|0,Ba|0,10,0)|0;Ja=Ja+ -1|0;a[Ja>>0]=hb|48;hb=xa;xa=yr(xa|0,Ba|0,10,0)|0;if(!(Ba>>>0>9|(Ba|0)==9&hb>>>0>4294967295))break;else Ba=H}}else Ja=Y;if(!xa){xa=fa;Ba=ga;La=Ra;Ia=Ta;Ka=ha;Ma=ia;Na=94}else while(1){Ja=Ja+ -1|0;a[Ja>>0]=(xa>>>0)%10|0|48;if(xa>>>0<10){xa=fa;Ba=ga;La=Ra;Ia=Ta;Ka=ha;Ma=ia;Na=94;break}else xa=(xa>>>0)/10|0}}else if((Na|0)==99){Na=0;Ea=ja;ya=(Ta|0)==0;i:do if((Ea&3|0)==0|ya){_=Ta;ka=ya;la=ja;Na=102}else{za=Ta;ya=ja;while(1){if(!(a[ya>>0]|0)){ra=za;ua=ya;break i}ya=ya+1|0;za=za+ -1|0;Aa=(za|0)==0;if((ya&3|0)==0|Aa){_=za;ka=Aa;la=ya;Na=102;break}}}while(0);j:do if((Na|0)==102){Na=0;if(!ka)if(a[la>>0]|0){k:do if(_>>>0>3){ra=_;ua=la;do{hb=c[ua>>2]|0;if((hb&-2139062144^-2139062144)&hb+ -16843009)break k;ua=ua+4|0;ra=ra+ -4|0}while(ra>>>0>3)}else{ra=_;ua=la}while(0);if(!ra)ra=0;else while(1){if(!(a[ua>>0]|0))break j;ua=ua+1|0;ra=ra+ -1|0;if(!ra){ra=0;break}}}else{ra=_;ua=la}else{ra=0;ua=la}}while(0);Ha=(ra|0)!=0?ua:0;if(!Ha){Aa=V;za=U;ya=ja;Ca=Wa;Ga=Ta;Fa=0;Ea=29904;Ha=ja+Ta|0;break}else{Aa=V;za=U;ya=ja;Ca=Wa;Ga=Ha-Ea|0;Fa=0;Ea=29904;break}}else if((Na|0)==115){ta=0;sa=0;qa=Z;while(1){Na=c[qa>>2]|0;if(!Na)break;sa=ar(G,Na)|0;if((sa|0)<=-1){p=-1;Na=376;break a}Na=sa+ta|0;if(sa>>>0>(q-ta|0)>>>0){sa=Z;qa=X;Na=122;break h}if(Na>>>0>=q>>>0){ta=Na;break}ta=Na;qa=qa+4|0}if((sa|0)<0){p=-1;Na=376;break a}else{sa=Z;qa=X;Na=122}}while(0);if((Na|0)==94){Na=0;Ca=(Ia|0)>-1?La&-65537:La;ya=(xa|0)==0&(Ba|0)==0;if(ya&(Ia|0)==0){Aa=Ba;za=xa;ya=Y;Ga=0;Fa=Ka;Ea=Ma;Ha=Y}else{Ga=(ya&1)+(I-Ja)|0;Aa=Ba;za=xa;ya=Ja;Ga=(Ia|0)>(Ga|0)?Ia:Ga;Fa=Ka;Ea=Ma;Ha=Y}}else if((Na|0)==122){Na=0;Ra=Ra&73728;Sa=(ta|0)<(Qa|0);if((Ra|0)==0&Sa){Ta=Qa-ta|0;qr(s|0,32,(Ta>>>0>256?256:Ta)|0)|0;if(Ta>>>0>255)do{cr(s,256,e);Ta=Ta+ -256|0}while(Ta>>>0>255);cr(s,Ta,e)}l:do if(ta){f=0;Ta=sa;while(1){Ua=c[Ta>>2]|0;if(!Ua)break l;Ua=ar(G,Ua)|0;f=Ua+f|0;if((f|0)>(ta|0))break l;cr(G,Ua,e);if(f>>>0>=ta>>>0)break l;Ta=Ta+4|0}}while(0);if((Ra|0)==8192&Sa){Ra=Qa-ta|0;qr(s|0,32,(Ra>>>0>256?256:Ra)|0)|0;if(Ra>>>0>255)do{cr(s,256,e);Ra=Ra+ -256|0}while(Ra>>>0>255);cr(s,Ra,e)}Ra=V;Ua=qa;f=Pa;Va=Sa?Qa:ta;Sa=Oa;continue}Ra=Ha-ya|0;f=(Ga|0)<(Ra|0)?Ra:Ga;Sa=Fa+f|0;Va=(Qa|0)<(Sa|0)?Sa:Qa;Ta=Ca&73728;Qa=(Sa|0)<(Va|0);if((Ta|0)==0&Qa){Ua=Va-Sa|0;qr(s|0,32,(Ua>>>0>256?256:Ua)|0)|0;if(Ua>>>0>255)do{cr(s,256,e);Ua=Ua+ -256|0}while(Ua>>>0>255);cr(s,Ua,e)}cr(Ea,Fa,e);if((Ta|0)==65536&Qa){Ua=Va-Sa|0;qr(s|0,48,(Ua>>>0>256?256:Ua)|0)|0;if(Ua>>>0>255)do{cr(s,256,e);Ua=Ua+ -256|0}while(Ua>>>0>255);cr(s,Ua,e)}if((Ra|0)<(f|0)){f=f-Ra|0;qr(s|0,48,(f>>>0>256?256:f)|0)|0;if(f>>>0>255)do{cr(s,256,e);f=f+ -256|0}while(f>>>0>255);cr(s,f,e)}cr(ya,Ra,e);if(!((Ta|0)==8192&Qa)){Ra=Aa;Ua=za;f=Pa;Sa=Oa;continue}Qa=Va-Sa|0;qr(s|0,32,(Qa>>>0>256?256:Qa)|0)|0;if(Qa>>>0>255)do{cr(s,256,e);Qa=Qa+ -256|0}while(Qa>>>0>255);cr(s,Qa,e);Ra=Aa;Ua=za;f=Pa;Sa=Oa}if((Na|0)==357){if(e){hb=pa;i=m;return hb|0}if(!Sa){hb=0;i=m;return hb|0}else q=1;while(1){r=c[l+(q<<2)>>2]|0;if(!r){n=1;o=q;break}s=j+(q<<3)|0;m:do if(r>>>0<=20)do switch(r|0){case 10:{hb=c[g>>2]|0;fb=c[hb>>2]|0;c[g>>2]=hb+4;hb=s;c[hb>>2]=fb;c[hb+4>>2]=((fb|0)<0)<<31>>31;break m};case 11:{hb=c[g>>2]|0;fb=c[hb>>2]|0;c[g>>2]=hb+4;hb=s;c[hb>>2]=fb;c[hb+4>>2]=0;break m};case 12:{hb=c[g>>2]|0;fb=hb;db=c[fb>>2]|0;fb=c[fb+4>>2]|0;c[g>>2]=hb+8;hb=s;c[hb>>2]=db;c[hb+4>>2]=fb;break m};case 13:{hb=c[g>>2]|0;fb=c[hb>>2]|0;c[g>>2]=hb+4;fb=(fb&65535)<<16>>16;hb=s;c[hb>>2]=fb;c[hb+4>>2]=((fb|0)<0)<<31>>31;break m};case 14:{hb=c[g>>2]|0;fb=c[hb>>2]|0;c[g>>2]=hb+4;hb=s;c[hb>>2]=fb&65535;c[hb+4>>2]=0;break m};case 15:{hb=c[g>>2]|0;fb=c[hb>>2]|0;c[g>>2]=hb+4;fb=(fb&255)<<24>>24;hb=s;c[hb>>2]=fb;c[hb+4>>2]=((fb|0)<0)<<31>>31;break m};case 16:{hb=c[g>>2]|0;fb=c[hb>>2]|0;c[g>>2]=hb+4;hb=s;c[hb>>2]=fb&255;c[hb+4>>2]=0;break m};case 17:{hb=c[g>>2]|0;c[k>>2]=c[hb>>2];c[k+4>>2]=c[hb+4>>2];gb=+h[k>>3];c[g>>2]=hb+8;h[s>>3]=gb;break m};case 18:{hb=c[g>>2]|0;c[k>>2]=c[hb>>2];c[k+4>>2]=c[hb+4>>2];gb=+h[k>>3];c[g>>2]=hb+8;h[s>>3]=gb;break m};case 9:{fb=c[g>>2]|0;hb=c[fb>>2]|0;c[g>>2]=fb+4;c[s>>2]=hb;break m};default:break m}while(0);while(0);q=q+1|0;if((q|0)>=10){p=1;Na=376;break}}if((Na|0)==376){i=m;return p|0}while(1){o=o+1|0;if(!n){p=-1;Na=376;break}if((o|0)>=10){p=1;Na=376;break}n=(c[l+(o<<2)>>2]|0)==0}if((Na|0)==376){i=m;return p|0}}else if((Na|0)==376){i=m;return p|0}return 0}function fr(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;g=i;i=i+336|0;k=g+232|0;j=g+192|0;l=g;m=g+256|0;q=g+248|0;h=g+80|0;n=h+0|0;p=30008|0;o=n+112|0;do{c[n>>2]=c[p>>2];n=n+4|0;p=p+4|0}while((n|0)<(o|0));if((d+ -1|0)>>>0>2147483646)if(!d){n=q;d=1}else{c[(Uc()|0)>>2]=75;s=-1;i=g;return s|0}else n=b;b=-2-n|0;b=d>>>0>b>>>0?b:d;q=h+48|0;c[q>>2]=b;d=h+20|0;c[d>>2]=n;r=h+44|0;c[r>>2]=n;n=n+b|0;p=h+16|0;c[p>>2]=n;s=h+28|0;c[s>>2]=n;n=j+0|0;o=n+40|0;do{c[n>>2]=0;n=n+4|0}while((n|0)<(o|0));c[k>>2]=c[f>>2];if((er(0,e,k,l,j)|0)<0)e=-1;else if(!(c[q>>2]|0)){f=c[r>>2]|0;c[r>>2]=m;c[s>>2]=m;c[d>>2]=m;c[q>>2]=80;c[p>>2]=m+80;e=er(h,e,k,l,j)|0;if(f){fd[c[h+36>>2]&31](h,0,0)|0;e=(c[d>>2]|0)==0?-1:e;c[r>>2]=f;c[q>>2]=0;c[p>>2]=0;c[s>>2]=0;c[d>>2]=0}}else e=er(h,e,k,l,j)|0;if(!b){s=e;i=g;return s|0}s=c[d>>2]|0;a[s+(((s|0)==(c[p>>2]|0))<<31>>31)>>0]=0;s=e;i=g;return s|0}function gr(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;f=a+20|0;g=c[f>>2]|0;a=(c[a+16>>2]|0)-g|0;a=a>>>0>d>>>0?d:a;nr(g|0,b|0,a|0)|0;c[f>>2]=(c[f>>2]|0)+a;i=e;return d|0}function hr(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0.0,j=0;d=i;i=i+112|0;f=d;g=f+0|0;e=g+108|0;do{c[g>>2]=0;g=g+4|0}while((g|0)<(e|0));j=f+4|0;c[j>>2]=a;g=f+8|0;c[g>>2]=-1;c[f+44>>2]=a;c[f+76>>2]=-1;c[f+104>>2]=0;e=f+108|0;c[e>>2]=~a;c[f+100>>2]=-1;h=+Yq(f,2,1);e=(c[j>>2]|0)-(c[g>>2]|0)+(c[e>>2]|0)|0;if(!b){i=d;return+h}if(e)a=a+e|0;c[b>>2]=a;i=d;return+h}function ir(){}function jr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;b=b-d-(c>>>0>a>>>0|0)>>>0;return(H=b,a-c>>>0|0)|0}function kr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;c=a+c>>>0;return(H=b+d+(c>>>0<a>>>0|0)>>>0,c|0)|0}function lr(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){H=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}H=0;return b>>>c-32|0}function mr(b){b=b|0;var c=0;c=b;while(a[c>>0]|0)c=c+1|0;return c-b|0}function nr(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((e|0)>=4096)return Pa(b|0,d|0,e|0)|0;f=b|0;if((b&3)==(d&3)){while(b&3){if(!e)return f|0;a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function or(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){H=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}H=a<<c-32;return 0}function pr(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;if((c|0)<(b|0)&(b|0)<(c+d|0)){e=b;c=c+d|0;b=b+d|0;while((d|0)>0){b=b-1|0;c=c-1|0;d=d-1|0;a[b>>0]=a[c>>0]|0}b=e}else nr(b,c,d)|0;return b|0}function qr(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b+e|0;if((e|0)>=20){d=d&255;i=b&3;h=d|d<<8|d<<16|d<<24;g=f&~3;if(i){i=b+4-i|0;while((b|0)<(i|0)){a[b>>0]=d;b=b+1|0}}while((b|0)<(g|0)){c[b>>2]=h;b=b+4|0}}while((b|0)<(f|0)){a[b>>0]=d;b=b+1|0}return b-e|0}function rr(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){H=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}H=(b|0)<0?-1:0;return b>>c-32|0}function sr(b){b=b|0;var c=0;c=a[n+(b>>>24)>>0]|0;if((c|0)<8)return c|0;c=a[n+(b>>16&255)>>0]|0;if((c|0)<8)return c+8|0;c=a[n+(b>>8&255)>>0]|0;if((c|0)<8)return c+16|0;return(a[n+(b&255)>>0]|0)+24|0}function tr(b){b=b|0;var c=0;c=a[m+(b&255)>>0]|0;if((c|0)<8)return c|0;c=a[m+(b>>8&255)>>0]|0;if((c|0)<8)return c+8|0;c=a[m+(b>>16&255)>>0]|0;if((c|0)<8)return c+16|0;return(a[m+(b>>>24)>>0]|0)+24|0}function ur(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=a&65535;d=b&65535;c=da(d,f)|0;e=a>>>16;d=(c>>>16)+(da(d,e)|0)|0;b=b>>>16;a=da(b,f)|0;return(H=(d>>>16)+(da(b,e)|0)+(((d&65535)+a|0)>>>16)|0,d+a<<16|c&65535|0)|0}function vr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0;j=b>>31|((b|0)<0?-1:0)<<1;i=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;f=d>>31|((d|0)<0?-1:0)<<1;e=((d|0)<0?-1:0)>>31|((d|0)<0?-1:0)<<1;h=jr(j^a,i^b,j,i)|0;g=H;b=f^j;a=e^i;a=jr((Ar(h,g,jr(f^c,e^d,f,e)|0,H,0)|0)^b,H^a,b,a)|0;return a|0}function wr(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;f=i;i=i+8|0;j=f|0;h=b>>31|((b|0)<0?-1:0)<<1;g=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;l=e>>31|((e|0)<0?-1:0)<<1;k=((e|0)<0?-1:0)>>31|((e|0)<0?-1:0)<<1;b=jr(h^a,g^b,h,g)|0;a=H;Ar(b,a,jr(l^d,k^e,l,k)|0,H,j)|0;a=jr(c[j>>2]^h,c[j+4>>2]^g,h,g)|0;b=H;i=f;return(H=b,a)|0}function xr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=a;f=c;a=ur(e,f)|0;c=H;return(H=(da(b,f)|0)+(da(d,e)|0)+c|c&0,a|0|0)|0}function yr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;a=Ar(a,b,c,d,0)|0;return a|0}function zr(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=i;i=i+8|0;f=g|0;Ar(a,b,d,e,f)|0;i=g;return(H=c[f+4>>2]|0,c[f>>2]|0)|0}function Ar(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;h=a;j=b;i=j;l=d;g=e;k=g;if(!i){g=(f|0)!=0;if(!k){if(g){c[f>>2]=(h>>>0)%(l>>>0);c[f+4>>2]=0}k=0;m=(h>>>0)/(l>>>0)>>>0;return(H=k,m)|0}else{if(!g){l=0;m=0;return(H=l,m)|0}c[f>>2]=a|0;c[f+4>>2]=b&0;l=0;m=0;return(H=l,m)|0}}m=(k|0)==0;do if(l){if(!m){k=(sr(k|0)|0)-(sr(i|0)|0)|0;if(k>>>0<=31){m=k+1|0;l=31-k|0;a=k-31>>31;j=m;b=h>>>(m>>>0)&a|i<<l;a=i>>>(m>>>0)&a;k=0;l=h<<l;break}if(!f){l=0;m=0;return(H=l,m)|0}c[f>>2]=a|0;c[f+4>>2]=j|b&0;l=0;m=0;return(H=l,m)|0}k=l-1|0;if(k&l){l=(sr(l|0)|0)+33-(sr(i|0)|0)|0;p=64-l|0;m=32-l|0;n=m>>31;o=l-32|0;a=o>>31;j=l;b=m-1>>31&i>>>(o>>>0)|(i<<m|h>>>(l>>>0))&a;a=a&i>>>(l>>>0);k=h<<p&n;l=(i<<p|h>>>(o>>>0))&n|h<<m&l-33>>31;break}if(f){c[f>>2]=k&h;c[f+4>>2]=0}if((l|0)==1){o=j|b&0;p=a|0|0;return(H=o,p)|0}else{p=tr(l|0)|0;o=i>>>(p>>>0)|0;p=i<<32-p|h>>>(p>>>0)|0;return(H=o,p)|0}}else{if(m){if(f){c[f>>2]=(i>>>0)%(l>>>0);c[f+4>>2]=0}o=0;p=(i>>>0)/(l>>>0)>>>0;return(H=o,p)|0}if(!h){if(f){c[f>>2]=0;c[f+4>>2]=(i>>>0)%(k>>>0)}o=0;p=(i>>>0)/(k>>>0)>>>0;return(H=o,p)|0}l=k-1|0;if(!(l&k)){if(f){c[f>>2]=a|0;c[f+4>>2]=l&i|b&0}o=0;p=i>>>((tr(k|0)|0)>>>0);return(H=o,p)|0}k=(sr(k|0)|0)-(sr(i|0)|0)|0;if(k>>>0<=30){a=k+1|0;l=31-k|0;j=a;b=i<<l|h>>>(a>>>0);a=i>>>(a>>>0);k=0;l=h<<l;break}if(!f){o=0;p=0;return(H=o,p)|0}c[f>>2]=a|0;c[f+4>>2]=j|b&0;o=0;p=0;return(H=o,p)|0}while(0);if(!j){g=l;e=0;i=0}else{h=d|0|0;g=g|e&0;e=kr(h,g,-1,-1)|0;d=H;i=0;do{m=l;l=k>>>31|l<<1;k=i|k<<1;m=b<<1|m>>>31|0;n=b>>>31|a<<1|0;jr(e,d,m,n)|0;p=H;o=p>>31|((p|0)<0?-1:0)<<1;i=o&1;b=jr(m,n,o&h,(((p|0)<0?-1:0)>>31|((p|0)<0?-1:0)<<1)&g)|0;a=H;j=j-1|0}while((j|0)!=0);g=l;e=0}h=0;if(f){c[f>>2]=b;c[f+4>>2]=a}o=(k|0)>>>31|(g|h)<<1|(h<<1|k>>>31)&0|e;p=(k<<1|0>>>31)&-2|i;return(H=o,p)|0}function Br(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return fd[a&31](b|0,c|0,d|0)|0}function Cr(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;gd[a&63](b|0,c|0,d|0,e|0,f|0,g|0,h|0)}function Dr(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;hd[a&3](b|0,c|0,d|0,e|0,f|0)}function Er(a){a=a|0;return id[a&3]()|0}function Fr(a,b){a=a|0;b=b|0;jd[a&255](b|0)}function Gr(a,b,c){a=a|0;b=b|0;c=c|0;kd[a&63](b|0,c|0)}function Hr(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;ld[a&3](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0,j|0)}function Ir(a,b){a=a|0;b=b|0;return md[a&127](b|0)|0}function Jr(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=+h;nd[a&3](b|0,c|0,d|0,e|0,f|0,g|0,+h)}function Kr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;od[a&15](b|0,c|0,d|0)}function Lr(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=+g;pd[a&7](b|0,c|0,d|0,e|0,f|0,+g)}function Mr(a){a=a|0;qd[a&3]()}function Nr(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;return rd[a&15](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0)|0}function Or(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return sd[a&7](b|0,c|0,d|0,e|0)|0}function Pr(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;td[a&7](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0)}function Qr(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;ud[a&31](b|0,c|0,d|0,e|0,f|0,g|0)}function Rr(a,b,c){a=a|0;b=b|0;c=c|0;return vd[a&63](b|0,c|0)|0}function Sr(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return wd[a&15](b|0,c|0,d|0,e|0,f|0)|0}function Tr(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;xd[a&15](b|0,c|0,d|0,e|0)}function Ur(a,b,c){a=a|0;b=b|0;c=c|0;ea(0);return 0}function Vr(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;ea(1)}function Wr(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ea(2)}function Xr(){ea(3);return 0}function Yr(a){a=a|0;ea(4)}function Zr(a,b){a=a|0;b=b|0;ea(5)}function _r(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;ea(6)}function $r(a){a=a|0;ea(7);return 0}function as(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=+g;ea(8)}function bs(a,b,c){a=a|0;b=b|0;c=c|0;ea(9)}function cs(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=+f;ea(10)}function ds(){ea(11)}function es(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;ea(12);return 0}function fs(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ea(13);return 0}function gs(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;ea(14)}function hs(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;ea(15)}function is(a,b){a=a|0;b=b|0;ea(16);return 0}function js(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ea(17);return 0}function ks(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ea(18)}




// EMSCRIPTEN_END_FUNCS
var fd=[Ur,cj,hj,lj,qj,vj,Sh,zj,ei,pi,qi,hk,mk,Dn,In,lo,no,qo,Xn,ao,co,go,Aq,Gq,zq,gr,Wp,Ur,Ur,Ur,Ur,Ur];var gd=[Vr,pk,rk,sk,tk,uk,vk,wk,xk,yk,zk,Ak,Gk,Ik,Jk,Kk,Lk,Mk,Nk,Ok,Pk,Qk,Rk,el,gl,tl,vl,El,Fl,Gl,Il,Kl,Sl,Tl,Ul,Wl,Yl,un,An,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr];var hd=[Wr,Nq,Mq,Jq];var id=[Xr,Yd,Rd,Xr];var jd=[Yr,be,ce,qe,re,se,ue,we,xe,Ae,Be,Ce,Ee,Fe,Ge,Je,Ke,Le,Ne,Pe,Qe,Te,Ue,Ve,Xe,Ye,Ze,af,bf,cf,ef,ff,gf,kf,lf,mf,of,qf,rf,sf,tf,uf,wf,xf,yf,zf,Bf,Cf,Df,Ef,Gf,Hf,If,Rf,Sf,Xf,Yf,bg,cg,dg,fg,hg,ig,jg,kg,lg,ng,pg,qg,rg,sg,tg,vg,xg,yg,zg,Ag,Bg,Dg,Eg,Hg,Fg,Ig,Gg,Jg,Cj,Bj,Ej,Dj,Kg,Lg,Tg,Ug,Vg,Xg,$g,ah,_g,bh,Zg,ch,dh,eh,fh,gh,hh,ih,kh,lh,oh,ph,uh,vh,th,wh,Yg,xh,zh,Ah,Bh,Dh,Eh,Fh,Gh,Ih,Oh,Ph,Uh,Vh,ai,bi,gi,hi,Ai,zi,ti,Bi,xi,Ci,aj,$i,oj,nj,Hj,Gj,Jj,Ij,Mj,Lj,Oj,Nj,Tj,Sj,Vj,Uj,$j,_j,_i,ak,Zj,bk,dk,ck,Un,jk,ik,ok,nk,Fk,Ek,_k,Zk,ol,nl,Cl,Bl,Ql,Pl,bm,am,gm,fm,jm,im,um,tm,Fm,Em,Qm,Pm,$m,_m,kn,jn,qn,pn,wn,vn,Cn,Bn,Hn,Gn,Pn,On,jo,io,Ln,Ao,$o,_o,bp,ap,ek,Tn,Wn,so,Io,Qo,Yo,Zo,bq,aq,hq,gq,kq,jq,mq,nq,pq,oq,rq,vq,sq,tq,yq,uq,wq,xq,jh,Di,$d,Ud,Mh,bn,Uq,Pp,Op,Np,Mp,Lp,Kp,Ii,Ui,_p,Yr,Yr];var kd=[Zr,ee,fe,ze,Ie,Se,$e,jf,pf,Qf,gg,og,wg,bj,nh,qh,Qh,Wh,ci,ii,pj,mm,nm,om,pm,rm,sm,xm,ym,zm,Am,Cm,Dm,Im,Jm,Km,Lm,Nm,Om,Tm,Um,Vm,Wm,Ym,Zm,Fn,Kn,gp,ip,kp,hp,jp,lp,Hd,Kd,Ld,Md,Nd,Zr,Zr,Zr,Zr,Zr,Zr];var ld=[_r,Ml,_l,_r];var md=[$r,de,ye,He,Re,_e,hf,lq,fj,gj,Og,jj,fq,mh,sh,Rh,uj,wj,xj,tj,Xh,Yh,di,ij,ji,ki,ri,ui,Xj,Dl,mp,op,qp,wp,yp,sp,up,Rl,np,pp,rp,xp,zp,tp,vp,km,lm,qm,vm,wm,Bm,Gm,Hm,Mm,Rm,Sm,Xm,Eo,Fo,Ho,cp,ep,dp,fp,wo,xo,zo,Mo,No,Po,Uo,Vo,Xo,cq,iq,qq,_d,Zd,Id,Td,Sd,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r,$r];var nd=[as,rn,xn,as];var od=[bs,oi,si,wi,vi,Yj,Gd,Wd,Jd,Pd,Od,bs,bs,bs,bs,bs];var pd=[cs,hl,ll,wl,yl,cs,cs,cs];var qd=[ds,Yp,Zp,ds];var rd=[es,Bo,Co,to,uo,Jo,Ko,Ro,So,es,es,es,es,es,es,es];var sd=[fs,po,Yn,Zn,_n,fo,fs,fs];var td=[gs,dm,hm,an,en,ln,nn,gs];var ud=[hs,Mg,rj,dj,$k,al,fl,ml,pl,ql,ul,zl,En,Jn,Qq,Pq,Oq,hs,hs,hs,hs,hs,hs,hs,hs,hs,hs,hs,hs,hs,hs,hs];var vd=[is,te,De,Me,We,df,nf,vf,Af,Ff,eg,mg,ug,Cg,Pg,Qg,Wg,rh,Ch,Hh,yj,Th,Zh,Aj,kj,fi,li,mj,ko,mo,oo,$n,bo,eo,Vd,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is,is];var wd=[js,fk,kk,ro,Do,Go,ho,vo,yo,Lo,Oo,To,Wo,js,js,js];var xd=[ks,Ng,sj,ej,gk,lk,Cq,Dq,Fq,Xd,Qd,ks,ks,ks,ks,ks];return{___cxa_can_catch:Rq,_free:Uq,_memset:qr,_realloc:Vq,_i64Add:kr,_memmove:pr,___cxa_is_pointer_type:Sq,_i64Subtract:jr,_strlen:mr,_malloc:Tq,_memcpy:nr,___getTypeName:Kh,_bitshift64Lshr:lr,_bitshift64Shl:or,__GLOBAL__I_a:Jh,__GLOBAL__I_a64:Lh,__GLOBAL__I_a117:ni,runPostSets:ir,stackAlloc:yd,stackSave:zd,stackRestore:Ad,setThrew:Bd,setTempRet0:Ed,getTempRet0:Fd,dynCall_iiii:Br,dynCall_viiiiiii:Cr,dynCall_viiiii:Dr,dynCall_i:Er,dynCall_vi:Fr,dynCall_vii:Gr,dynCall_viiiiiiiii:Hr,dynCall_ii:Ir,dynCall_viiiiiid:Jr,dynCall_viii:Kr,dynCall_viiiiid:Lr,dynCall_v:Mr,dynCall_iiiiiiiii:Nr,dynCall_iiiii:Or,dynCall_viiiiiiii:Pr,dynCall_viiiiii:Qr,dynCall_iii:Rr,dynCall_iiiiii:Sr,dynCall_viiii:Tr}})


// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg,Module.asmLibraryArg,buffer);var ___cxa_can_catch=Module["___cxa_can_catch"]=asm["___cxa_can_catch"];var _free=Module["_free"]=asm["_free"];var _memset=Module["_memset"]=asm["_memset"];var _realloc=Module["_realloc"]=asm["_realloc"];var _i64Add=Module["_i64Add"]=asm["_i64Add"];var _memmove=Module["_memmove"]=asm["_memmove"];var ___cxa_is_pointer_type=Module["___cxa_is_pointer_type"]=asm["___cxa_is_pointer_type"];var _i64Subtract=Module["_i64Subtract"]=asm["_i64Subtract"];var _strlen=Module["_strlen"]=asm["_strlen"];var _malloc=Module["_malloc"]=asm["_malloc"];var _memcpy=Module["_memcpy"]=asm["_memcpy"];var ___getTypeName=Module["___getTypeName"]=asm["___getTypeName"];var _bitshift64Lshr=Module["_bitshift64Lshr"]=asm["_bitshift64Lshr"];var _bitshift64Shl=Module["_bitshift64Shl"]=asm["_bitshift64Shl"];var __GLOBAL__I_a=Module["__GLOBAL__I_a"]=asm["__GLOBAL__I_a"];var __GLOBAL__I_a64=Module["__GLOBAL__I_a64"]=asm["__GLOBAL__I_a64"];var __GLOBAL__I_a117=Module["__GLOBAL__I_a117"]=asm["__GLOBAL__I_a117"];var runPostSets=Module["runPostSets"]=asm["runPostSets"];var dynCall_iiii=Module["dynCall_iiii"]=asm["dynCall_iiii"];var dynCall_viiiiiii=Module["dynCall_viiiiiii"]=asm["dynCall_viiiiiii"];var dynCall_viiiii=Module["dynCall_viiiii"]=asm["dynCall_viiiii"];var dynCall_i=Module["dynCall_i"]=asm["dynCall_i"];var dynCall_vi=Module["dynCall_vi"]=asm["dynCall_vi"];var dynCall_vii=Module["dynCall_vii"]=asm["dynCall_vii"];var dynCall_viiiiiiiii=Module["dynCall_viiiiiiiii"]=asm["dynCall_viiiiiiiii"];var dynCall_ii=Module["dynCall_ii"]=asm["dynCall_ii"];var dynCall_viiiiiid=Module["dynCall_viiiiiid"]=asm["dynCall_viiiiiid"];var dynCall_viii=Module["dynCall_viii"]=asm["dynCall_viii"];var dynCall_viiiiid=Module["dynCall_viiiiid"]=asm["dynCall_viiiiid"];var dynCall_v=Module["dynCall_v"]=asm["dynCall_v"];var dynCall_iiiiiiiii=Module["dynCall_iiiiiiiii"]=asm["dynCall_iiiiiiiii"];var dynCall_iiiii=Module["dynCall_iiiii"]=asm["dynCall_iiiii"];var dynCall_viiiiiiii=Module["dynCall_viiiiiiii"]=asm["dynCall_viiiiiiii"];var dynCall_viiiiii=Module["dynCall_viiiiii"]=asm["dynCall_viiiiii"];var dynCall_iii=Module["dynCall_iii"]=asm["dynCall_iii"];var dynCall_iiiiii=Module["dynCall_iiiiii"]=asm["dynCall_iiiiii"];var dynCall_viiii=Module["dynCall_viiii"]=asm["dynCall_viiii"];Runtime.stackAlloc=asm["stackAlloc"];Runtime.stackSave=asm["stackSave"];Runtime.stackRestore=asm["stackRestore"];Runtime.setTempRet0=asm["setTempRet0"];Runtime.getTempRet0=asm["getTempRet0"];var i64Math=(function(){var goog={math:{}};goog.math.Long=(function(low,high){this.low_=low|0;this.high_=high|0});goog.math.Long.IntCache_={};goog.math.Long.fromInt=(function(value){if(-128<=value&&value<128){var cachedObj=goog.math.Long.IntCache_[value];if(cachedObj){return cachedObj}}var obj=new goog.math.Long(value|0,value<0?-1:0);if(-128<=value&&value<128){goog.math.Long.IntCache_[value]=obj}return obj});goog.math.Long.fromNumber=(function(value){if(isNaN(value)||!isFinite(value)){return goog.math.Long.ZERO}else if(value<=-goog.math.Long.TWO_PWR_63_DBL_){return goog.math.Long.MIN_VALUE}else if(value+1>=goog.math.Long.TWO_PWR_63_DBL_){return goog.math.Long.MAX_VALUE}else if(value<0){return goog.math.Long.fromNumber(-value).negate()}else{return new goog.math.Long(value%goog.math.Long.TWO_PWR_32_DBL_|0,value/goog.math.Long.TWO_PWR_32_DBL_|0)}});goog.math.Long.fromBits=(function(lowBits,highBits){return new goog.math.Long(lowBits,highBits)});goog.math.Long.fromString=(function(str,opt_radix){if(str.length==0){throw Error("number format error: empty string")}var radix=opt_radix||10;if(radix<2||36<radix){throw Error("radix out of range: "+radix)}if(str.charAt(0)=="-"){return goog.math.Long.fromString(str.substring(1),radix).negate()}else if(str.indexOf("-")>=0){throw Error('number format error: interior "-" character: '+str)}var radixToPower=goog.math.Long.fromNumber(Math.pow(radix,8));var result=goog.math.Long.ZERO;for(var i=0;i<str.length;i+=8){var size=Math.min(8,str.length-i);var value=parseInt(str.substring(i,i+size),radix);if(size<8){var power=goog.math.Long.fromNumber(Math.pow(radix,size));result=result.multiply(power).add(goog.math.Long.fromNumber(value))}else{result=result.multiply(radixToPower);result=result.add(goog.math.Long.fromNumber(value))}}return result});goog.math.Long.TWO_PWR_16_DBL_=1<<16;goog.math.Long.TWO_PWR_24_DBL_=1<<24;goog.math.Long.TWO_PWR_32_DBL_=goog.math.Long.TWO_PWR_16_DBL_*goog.math.Long.TWO_PWR_16_DBL_;goog.math.Long.TWO_PWR_31_DBL_=goog.math.Long.TWO_PWR_32_DBL_/2;goog.math.Long.TWO_PWR_48_DBL_=goog.math.Long.TWO_PWR_32_DBL_*goog.math.Long.TWO_PWR_16_DBL_;goog.math.Long.TWO_PWR_64_DBL_=goog.math.Long.TWO_PWR_32_DBL_*goog.math.Long.TWO_PWR_32_DBL_;goog.math.Long.TWO_PWR_63_DBL_=goog.math.Long.TWO_PWR_64_DBL_/2;goog.math.Long.ZERO=goog.math.Long.fromInt(0);goog.math.Long.ONE=goog.math.Long.fromInt(1);goog.math.Long.NEG_ONE=goog.math.Long.fromInt(-1);goog.math.Long.MAX_VALUE=goog.math.Long.fromBits(4294967295|0,2147483647|0);goog.math.Long.MIN_VALUE=goog.math.Long.fromBits(0,2147483648|0);goog.math.Long.TWO_PWR_24_=goog.math.Long.fromInt(1<<24);goog.math.Long.prototype.toInt=(function(){return this.low_});goog.math.Long.prototype.toNumber=(function(){return this.high_*goog.math.Long.TWO_PWR_32_DBL_+this.getLowBitsUnsigned()});goog.math.Long.prototype.toString=(function(opt_radix){var radix=opt_radix||10;if(radix<2||36<radix){throw Error("radix out of range: "+radix)}if(this.isZero()){return"0"}if(this.isNegative()){if(this.equals(goog.math.Long.MIN_VALUE)){var radixLong=goog.math.Long.fromNumber(radix);var div=this.div(radixLong);var rem=div.multiply(radixLong).subtract(this);return div.toString(radix)+rem.toInt().toString(radix)}else{return"-"+this.negate().toString(radix)}}var radixToPower=goog.math.Long.fromNumber(Math.pow(radix,6));var rem=this;var result="";while(true){var remDiv=rem.div(radixToPower);var intval=rem.subtract(remDiv.multiply(radixToPower)).toInt();var digits=intval.toString(radix);rem=remDiv;if(rem.isZero()){return digits+result}else{while(digits.length<6){digits="0"+digits}result=""+digits+result}}});goog.math.Long.prototype.getHighBits=(function(){return this.high_});goog.math.Long.prototype.getLowBits=(function(){return this.low_});goog.math.Long.prototype.getLowBitsUnsigned=(function(){return this.low_>=0?this.low_:goog.math.Long.TWO_PWR_32_DBL_+this.low_});goog.math.Long.prototype.getNumBitsAbs=(function(){if(this.isNegative()){if(this.equals(goog.math.Long.MIN_VALUE)){return 64}else{return this.negate().getNumBitsAbs()}}else{var val=this.high_!=0?this.high_:this.low_;for(var bit=31;bit>0;bit--){if((val&1<<bit)!=0){break}}return this.high_!=0?bit+33:bit+1}});goog.math.Long.prototype.isZero=(function(){return this.high_==0&&this.low_==0});goog.math.Long.prototype.isNegative=(function(){return this.high_<0});goog.math.Long.prototype.isOdd=(function(){return(this.low_&1)==1});goog.math.Long.prototype.equals=(function(other){return this.high_==other.high_&&this.low_==other.low_});goog.math.Long.prototype.notEquals=(function(other){return this.high_!=other.high_||this.low_!=other.low_});goog.math.Long.prototype.lessThan=(function(other){return this.compare(other)<0});goog.math.Long.prototype.lessThanOrEqual=(function(other){return this.compare(other)<=0});goog.math.Long.prototype.greaterThan=(function(other){return this.compare(other)>0});goog.math.Long.prototype.greaterThanOrEqual=(function(other){return this.compare(other)>=0});goog.math.Long.prototype.compare=(function(other){if(this.equals(other)){return 0}var thisNeg=this.isNegative();var otherNeg=other.isNegative();if(thisNeg&&!otherNeg){return-1}if(!thisNeg&&otherNeg){return 1}if(this.subtract(other).isNegative()){return-1}else{return 1}});goog.math.Long.prototype.negate=(function(){if(this.equals(goog.math.Long.MIN_VALUE)){return goog.math.Long.MIN_VALUE}else{return this.not().add(goog.math.Long.ONE)}});goog.math.Long.prototype.add=(function(other){var a48=this.high_>>>16;var a32=this.high_&65535;var a16=this.low_>>>16;var a00=this.low_&65535;var b48=other.high_>>>16;var b32=other.high_&65535;var b16=other.low_>>>16;var b00=other.low_&65535;var c48=0,c32=0,c16=0,c00=0;c00+=a00+b00;c16+=c00>>>16;c00&=65535;c16+=a16+b16;c32+=c16>>>16;c16&=65535;c32+=a32+b32;c48+=c32>>>16;c32&=65535;c48+=a48+b48;c48&=65535;return goog.math.Long.fromBits(c16<<16|c00,c48<<16|c32)});goog.math.Long.prototype.subtract=(function(other){return this.add(other.negate())});goog.math.Long.prototype.multiply=(function(other){if(this.isZero()){return goog.math.Long.ZERO}else if(other.isZero()){return goog.math.Long.ZERO}if(this.equals(goog.math.Long.MIN_VALUE)){return other.isOdd()?goog.math.Long.MIN_VALUE:goog.math.Long.ZERO}else if(other.equals(goog.math.Long.MIN_VALUE)){return this.isOdd()?goog.math.Long.MIN_VALUE:goog.math.Long.ZERO}if(this.isNegative()){if(other.isNegative()){return this.negate().multiply(other.negate())}else{return this.negate().multiply(other).negate()}}else if(other.isNegative()){return this.multiply(other.negate()).negate()}if(this.lessThan(goog.math.Long.TWO_PWR_24_)&&other.lessThan(goog.math.Long.TWO_PWR_24_)){return goog.math.Long.fromNumber(this.toNumber()*other.toNumber())}var a48=this.high_>>>16;var a32=this.high_&65535;var a16=this.low_>>>16;var a00=this.low_&65535;var b48=other.high_>>>16;var b32=other.high_&65535;var b16=other.low_>>>16;var b00=other.low_&65535;var c48=0,c32=0,c16=0,c00=0;c00+=a00*b00;c16+=c00>>>16;c00&=65535;c16+=a16*b00;c32+=c16>>>16;c16&=65535;c16+=a00*b16;c32+=c16>>>16;c16&=65535;c32+=a32*b00;c48+=c32>>>16;c32&=65535;c32+=a16*b16;c48+=c32>>>16;c32&=65535;c32+=a00*b32;c48+=c32>>>16;c32&=65535;c48+=a48*b00+a32*b16+a16*b32+a00*b48;c48&=65535;return goog.math.Long.fromBits(c16<<16|c00,c48<<16|c32)});goog.math.Long.prototype.div=(function(other){if(other.isZero()){throw Error("division by zero")}else if(this.isZero()){return goog.math.Long.ZERO}if(this.equals(goog.math.Long.MIN_VALUE)){if(other.equals(goog.math.Long.ONE)||other.equals(goog.math.Long.NEG_ONE)){return goog.math.Long.MIN_VALUE}else if(other.equals(goog.math.Long.MIN_VALUE)){return goog.math.Long.ONE}else{var halfThis=this.shiftRight(1);var approx=halfThis.div(other).shiftLeft(1);if(approx.equals(goog.math.Long.ZERO)){return other.isNegative()?goog.math.Long.ONE:goog.math.Long.NEG_ONE}else{var rem=this.subtract(other.multiply(approx));var result=approx.add(rem.div(other));return result}}}else if(other.equals(goog.math.Long.MIN_VALUE)){return goog.math.Long.ZERO}if(this.isNegative()){if(other.isNegative()){return this.negate().div(other.negate())}else{return this.negate().div(other).negate()}}else if(other.isNegative()){return this.div(other.negate()).negate()}var res=goog.math.Long.ZERO;var rem=this;while(rem.greaterThanOrEqual(other)){var approx=Math.max(1,Math.floor(rem.toNumber()/other.toNumber()));var log2=Math.ceil(Math.log(approx)/Math.LN2);var delta=log2<=48?1:Math.pow(2,log2-48);var approxRes=goog.math.Long.fromNumber(approx);var approxRem=approxRes.multiply(other);while(approxRem.isNegative()||approxRem.greaterThan(rem)){approx-=delta;approxRes=goog.math.Long.fromNumber(approx);approxRem=approxRes.multiply(other)}if(approxRes.isZero()){approxRes=goog.math.Long.ONE}res=res.add(approxRes);rem=rem.subtract(approxRem)}return res});goog.math.Long.prototype.modulo=(function(other){return this.subtract(this.div(other).multiply(other))});goog.math.Long.prototype.not=(function(){return goog.math.Long.fromBits(~this.low_,~this.high_)});goog.math.Long.prototype.and=(function(other){return goog.math.Long.fromBits(this.low_&other.low_,this.high_&other.high_)});goog.math.Long.prototype.or=(function(other){return goog.math.Long.fromBits(this.low_|other.low_,this.high_|other.high_)});goog.math.Long.prototype.xor=(function(other){return goog.math.Long.fromBits(this.low_^other.low_,this.high_^other.high_)});goog.math.Long.prototype.shiftLeft=(function(numBits){numBits&=63;if(numBits==0){return this}else{var low=this.low_;if(numBits<32){var high=this.high_;return goog.math.Long.fromBits(low<<numBits,high<<numBits|low>>>32-numBits)}else{return goog.math.Long.fromBits(0,low<<numBits-32)}}});goog.math.Long.prototype.shiftRight=(function(numBits){numBits&=63;if(numBits==0){return this}else{var high=this.high_;if(numBits<32){var low=this.low_;return goog.math.Long.fromBits(low>>>numBits|high<<32-numBits,high>>numBits)}else{return goog.math.Long.fromBits(high>>numBits-32,high>=0?0:-1)}}});goog.math.Long.prototype.shiftRightUnsigned=(function(numBits){numBits&=63;if(numBits==0){return this}else{var high=this.high_;if(numBits<32){var low=this.low_;return goog.math.Long.fromBits(low>>>numBits|high<<32-numBits,high>>>numBits)}else if(numBits==32){return goog.math.Long.fromBits(high,0)}else{return goog.math.Long.fromBits(high>>>numBits-32,0)}}});var navigator={appName:"Modern Browser"};var dbits;var canary=0xdeadbeefcafe;var j_lm=(canary&16777215)==15715070;function BigInteger(a,b,c){if(a!=null)if("number"==typeof a)this.fromNumber(a,b,c);else if(b==null&&"string"!=typeof a)this.fromString(a,256);else this.fromString(a,b)}function nbi(){return new BigInteger(null)}function am1(i,x,w,j,c,n){while(--n>=0){var v=x*this[i++]+w[j]+c;c=Math.floor(v/67108864);w[j++]=v&67108863}return c}function am2(i,x,w,j,c,n){var xl=x&32767,xh=x>>15;while(--n>=0){var l=this[i]&32767;var h=this[i++]>>15;var m=xh*l+h*xl;l=xl*l+((m&32767)<<15)+w[j]+(c&1073741823);c=(l>>>30)+(m>>>15)+xh*h+(c>>>30);w[j++]=l&1073741823}return c}function am3(i,x,w,j,c,n){var xl=x&16383,xh=x>>14;while(--n>=0){var l=this[i]&16383;var h=this[i++]>>14;var m=xh*l+h*xl;l=xl*l+((m&16383)<<14)+w[j]+c;c=(l>>28)+(m>>14)+xh*h;w[j++]=l&268435455}return c}if(j_lm&&navigator.appName=="Microsoft Internet Explorer"){BigInteger.prototype.am=am2;dbits=30}else if(j_lm&&navigator.appName!="Netscape"){BigInteger.prototype.am=am1;dbits=26}else{BigInteger.prototype.am=am3;dbits=28}BigInteger.prototype.DB=dbits;BigInteger.prototype.DM=(1<<dbits)-1;BigInteger.prototype.DV=1<<dbits;var BI_FP=52;BigInteger.prototype.FV=Math.pow(2,BI_FP);BigInteger.prototype.F1=BI_FP-dbits;BigInteger.prototype.F2=2*dbits-BI_FP;var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz";var BI_RC=new Array;var rr,vv;rr="0".charCodeAt(0);for(vv=0;vv<=9;++vv)BI_RC[rr++]=vv;rr="a".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;rr="A".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;function int2char(n){return BI_RM.charAt(n)}function intAt(s,i){var c=BI_RC[s.charCodeAt(i)];return c==null?-1:c}function bnpCopyTo(r){for(var i=this.t-1;i>=0;--i)r[i]=this[i];r.t=this.t;r.s=this.s}function bnpFromInt(x){this.t=1;this.s=x<0?-1:0;if(x>0)this[0]=x;else if(x<-1)this[0]=x+DV;else this.t=0}function nbv(i){var r=nbi();r.fromInt(i);return r}function bnpFromString(s,b){var k;if(b==16)k=4;else if(b==8)k=3;else if(b==256)k=8;else if(b==2)k=1;else if(b==32)k=5;else if(b==4)k=2;else{this.fromRadix(s,b);return}this.t=0;this.s=0;var i=s.length,mi=false,sh=0;while(--i>=0){var x=k==8?s[i]&255:intAt(s,i);if(x<0){if(s.charAt(i)=="-")mi=true;continue}mi=false;if(sh==0)this[this.t++]=x;else if(sh+k>this.DB){this[this.t-1]|=(x&(1<<this.DB-sh)-1)<<sh;this[this.t++]=x>>this.DB-sh}else this[this.t-1]|=x<<sh;sh+=k;if(sh>=this.DB)sh-=this.DB}if(k==8&&(s[0]&128)!=0){this.s=-1;if(sh>0)this[this.t-1]|=(1<<this.DB-sh)-1<<sh}this.clamp();if(mi)BigInteger.ZERO.subTo(this,this)}function bnpClamp(){var c=this.s&this.DM;while(this.t>0&&this[this.t-1]==c)--this.t}function bnToString(b){if(this.s<0)return"-"+this.negate().toString(b);var k;if(b==16)k=4;else if(b==8)k=3;else if(b==2)k=1;else if(b==32)k=5;else if(b==4)k=2;else return this.toRadix(b);var km=(1<<k)-1,d,m=false,r="",i=this.t;var p=this.DB-i*this.DB%k;if(i-->0){if(p<this.DB&&(d=this[i]>>p)>0){m=true;r=int2char(d)}while(i>=0){if(p<k){d=(this[i]&(1<<p)-1)<<k-p;d|=this[--i]>>(p+=this.DB-k)}else{d=this[i]>>(p-=k)&km;if(p<=0){p+=this.DB;--i}}if(d>0)m=true;if(m)r+=int2char(d)}}return m?r:"0"}function bnNegate(){var r=nbi();BigInteger.ZERO.subTo(this,r);return r}function bnAbs(){return this.s<0?this.negate():this}function bnCompareTo(a){var r=this.s-a.s;if(r!=0)return r;var i=this.t;r=i-a.t;if(r!=0)return this.s<0?-r:r;while(--i>=0)if((r=this[i]-a[i])!=0)return r;return 0}function nbits(x){var r=1,t;if((t=x>>>16)!=0){x=t;r+=16}if((t=x>>8)!=0){x=t;r+=8}if((t=x>>4)!=0){x=t;r+=4}if((t=x>>2)!=0){x=t;r+=2}if((t=x>>1)!=0){x=t;r+=1}return r}function bnBitLength(){if(this.t<=0)return 0;return this.DB*(this.t-1)+nbits(this[this.t-1]^this.s&this.DM)}function bnpDLShiftTo(n,r){var i;for(i=this.t-1;i>=0;--i)r[i+n]=this[i];for(i=n-1;i>=0;--i)r[i]=0;r.t=this.t+n;r.s=this.s}function bnpDRShiftTo(n,r){for(var i=n;i<this.t;++i)r[i-n]=this[i];r.t=Math.max(this.t-n,0);r.s=this.s}function bnpLShiftTo(n,r){var bs=n%this.DB;var cbs=this.DB-bs;var bm=(1<<cbs)-1;var ds=Math.floor(n/this.DB),c=this.s<<bs&this.DM,i;for(i=this.t-1;i>=0;--i){r[i+ds+1]=this[i]>>cbs|c;c=(this[i]&bm)<<bs}for(i=ds-1;i>=0;--i)r[i]=0;r[ds]=c;r.t=this.t+ds+1;r.s=this.s;r.clamp()}function bnpRShiftTo(n,r){r.s=this.s;var ds=Math.floor(n/this.DB);if(ds>=this.t){r.t=0;return}var bs=n%this.DB;var cbs=this.DB-bs;var bm=(1<<bs)-1;r[0]=this[ds]>>bs;for(var i=ds+1;i<this.t;++i){r[i-ds-1]|=(this[i]&bm)<<cbs;r[i-ds]=this[i]>>bs}if(bs>0)r[this.t-ds-1]|=(this.s&bm)<<cbs;r.t=this.t-ds;r.clamp()}function bnpSubTo(a,r){var i=0,c=0,m=Math.min(a.t,this.t);while(i<m){c+=this[i]-a[i];r[i++]=c&this.DM;c>>=this.DB}if(a.t<this.t){c-=a.s;while(i<this.t){c+=this[i];r[i++]=c&this.DM;c>>=this.DB}c+=this.s}else{c+=this.s;while(i<a.t){c-=a[i];r[i++]=c&this.DM;c>>=this.DB}c-=a.s}r.s=c<0?-1:0;if(c<-1)r[i++]=this.DV+c;else if(c>0)r[i++]=c;r.t=i;r.clamp()}function bnpMultiplyTo(a,r){var x=this.abs(),y=a.abs();var i=x.t;r.t=i+y.t;while(--i>=0)r[i]=0;for(i=0;i<y.t;++i)r[i+x.t]=x.am(0,y[i],r,i,0,x.t);r.s=0;r.clamp();if(this.s!=a.s)BigInteger.ZERO.subTo(r,r)}function bnpSquareTo(r){var x=this.abs();var i=r.t=2*x.t;while(--i>=0)r[i]=0;for(i=0;i<x.t-1;++i){var c=x.am(i,x[i],r,2*i,0,1);if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1))>=x.DV){r[i+x.t]-=x.DV;r[i+x.t+1]=1}}if(r.t>0)r[r.t-1]+=x.am(i,x[i],r,2*i,0,1);r.s=0;r.clamp()}function bnpDivRemTo(m,q,r){var pm=m.abs();if(pm.t<=0)return;var pt=this.abs();if(pt.t<pm.t){if(q!=null)q.fromInt(0);if(r!=null)this.copyTo(r);return}if(r==null)r=nbi();var y=nbi(),ts=this.s,ms=m.s;var nsh=this.DB-nbits(pm[pm.t-1]);if(nsh>0){pm.lShiftTo(nsh,y);pt.lShiftTo(nsh,r)}else{pm.copyTo(y);pt.copyTo(r)}var ys=y.t;var y0=y[ys-1];if(y0==0)return;var yt=y0*(1<<this.F1)+(ys>1?y[ys-2]>>this.F2:0);var d1=this.FV/yt,d2=(1<<this.F1)/yt,e=1<<this.F2;var i=r.t,j=i-ys,t=q==null?nbi():q;y.dlShiftTo(j,t);if(r.compareTo(t)>=0){r[r.t++]=1;r.subTo(t,r)}BigInteger.ONE.dlShiftTo(ys,t);t.subTo(y,y);while(y.t<ys)y[y.t++]=0;while(--j>=0){var qd=r[--i]==y0?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);if((r[i]+=y.am(0,qd,r,j,0,ys))<qd){y.dlShiftTo(j,t);r.subTo(t,r);while(r[i]<--qd)r.subTo(t,r)}}if(q!=null){r.drShiftTo(ys,q);if(ts!=ms)BigInteger.ZERO.subTo(q,q)}r.t=ys;r.clamp();if(nsh>0)r.rShiftTo(nsh,r);if(ts<0)BigInteger.ZERO.subTo(r,r)}function bnMod(a){var r=nbi();this.abs().divRemTo(a,null,r);if(this.s<0&&r.compareTo(BigInteger.ZERO)>0)a.subTo(r,r);return r}function Classic(m){this.m=m}function cConvert(x){if(x.s<0||x.compareTo(this.m)>=0)return x.mod(this.m);else return x}function cRevert(x){return x}function cReduce(x){x.divRemTo(this.m,null,x)}function cMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r)}function cSqrTo(x,r){x.squareTo(r);this.reduce(r)}Classic.prototype.convert=cConvert;Classic.prototype.revert=cRevert;Classic.prototype.reduce=cReduce;Classic.prototype.mulTo=cMulTo;Classic.prototype.sqrTo=cSqrTo;function bnpInvDigit(){if(this.t<1)return 0;var x=this[0];if((x&1)==0)return 0;var y=x&3;y=y*(2-(x&15)*y)&15;y=y*(2-(x&255)*y)&255;y=y*(2-((x&65535)*y&65535))&65535;y=y*(2-x*y%this.DV)%this.DV;return y>0?this.DV-y:-y}function Montgomery(m){this.m=m;this.mp=m.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<m.DB-15)-1;this.mt2=2*m.t}function montConvert(x){var r=nbi();x.abs().dlShiftTo(this.m.t,r);r.divRemTo(this.m,null,r);if(x.s<0&&r.compareTo(BigInteger.ZERO)>0)this.m.subTo(r,r);return r}function montRevert(x){var r=nbi();x.copyTo(r);this.reduce(r);return r}function montReduce(x){while(x.t<=this.mt2)x[x.t++]=0;for(var i=0;i<this.m.t;++i){var j=x[i]&32767;var u0=j*this.mpl+((j*this.mph+(x[i]>>15)*this.mpl&this.um)<<15)&x.DM;j=i+this.m.t;x[j]+=this.m.am(0,u0,x,i,0,this.m.t);while(x[j]>=x.DV){x[j]-=x.DV;x[++j]++}}x.clamp();x.drShiftTo(this.m.t,x);if(x.compareTo(this.m)>=0)x.subTo(this.m,x)}function montSqrTo(x,r){x.squareTo(r);this.reduce(r)}function montMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r)}Montgomery.prototype.convert=montConvert;Montgomery.prototype.revert=montRevert;Montgomery.prototype.reduce=montReduce;Montgomery.prototype.mulTo=montMulTo;Montgomery.prototype.sqrTo=montSqrTo;function bnpIsEven(){return(this.t>0?this[0]&1:this.s)==0}function bnpExp(e,z){if(e>4294967295||e<1)return BigInteger.ONE;var r=nbi(),r2=nbi(),g=z.convert(this),i=nbits(e)-1;g.copyTo(r);while(--i>=0){z.sqrTo(r,r2);if((e&1<<i)>0)z.mulTo(r2,g,r);else{var t=r;r=r2;r2=t}}return z.revert(r)}function bnModPowInt(e,m){var z;if(e<256||m.isEven())z=new Classic(m);else z=new Montgomery(m);return this.exp(e,z)}BigInteger.prototype.copyTo=bnpCopyTo;BigInteger.prototype.fromInt=bnpFromInt;BigInteger.prototype.fromString=bnpFromString;BigInteger.prototype.clamp=bnpClamp;BigInteger.prototype.dlShiftTo=bnpDLShiftTo;BigInteger.prototype.drShiftTo=bnpDRShiftTo;BigInteger.prototype.lShiftTo=bnpLShiftTo;BigInteger.prototype.rShiftTo=bnpRShiftTo;BigInteger.prototype.subTo=bnpSubTo;BigInteger.prototype.multiplyTo=bnpMultiplyTo;BigInteger.prototype.squareTo=bnpSquareTo;BigInteger.prototype.divRemTo=bnpDivRemTo;BigInteger.prototype.invDigit=bnpInvDigit;BigInteger.prototype.isEven=bnpIsEven;BigInteger.prototype.exp=bnpExp;BigInteger.prototype.toString=bnToString;BigInteger.prototype.negate=bnNegate;BigInteger.prototype.abs=bnAbs;BigInteger.prototype.compareTo=bnCompareTo;BigInteger.prototype.bitLength=bnBitLength;BigInteger.prototype.mod=bnMod;BigInteger.prototype.modPowInt=bnModPowInt;BigInteger.ZERO=nbv(0);BigInteger.ONE=nbv(1);function bnpFromRadix(s,b){this.fromInt(0);if(b==null)b=10;var cs=this.chunkSize(b);var d=Math.pow(b,cs),mi=false,j=0,w=0;for(var i=0;i<s.length;++i){var x=intAt(s,i);if(x<0){if(s.charAt(i)=="-"&&this.signum()==0)mi=true;continue}w=b*w+x;if(++j>=cs){this.dMultiply(d);this.dAddOffset(w,0);j=0;w=0}}if(j>0){this.dMultiply(Math.pow(b,j));this.dAddOffset(w,0)}if(mi)BigInteger.ZERO.subTo(this,this)}function bnpChunkSize(r){return Math.floor(Math.LN2*this.DB/Math.log(r))}function bnSigNum(){if(this.s<0)return-1;else if(this.t<=0||this.t==1&&this[0]<=0)return 0;else return 1}function bnpDMultiply(n){this[this.t]=this.am(0,n-1,this,0,0,this.t);++this.t;this.clamp()}function bnpDAddOffset(n,w){if(n==0)return;while(this.t<=w)this[this.t++]=0;this[w]+=n;while(this[w]>=this.DV){this[w]-=this.DV;if(++w>=this.t)this[this.t++]=0;++this[w]}}function bnpToRadix(b){if(b==null)b=10;if(this.signum()==0||b<2||b>36)return"0";var cs=this.chunkSize(b);var a=Math.pow(b,cs);var d=nbv(a),y=nbi(),z=nbi(),r="";this.divRemTo(d,y,z);while(y.signum()>0){r=(a+z.intValue()).toString(b).substr(1)+r;y.divRemTo(d,y,z)}return z.intValue().toString(b)+r}function bnIntValue(){if(this.s<0){if(this.t==1)return this[0]-this.DV;else if(this.t==0)return-1}else if(this.t==1)return this[0];else if(this.t==0)return 0;return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]}function bnpAddTo(a,r){var i=0,c=0,m=Math.min(a.t,this.t);while(i<m){c+=this[i]+a[i];r[i++]=c&this.DM;c>>=this.DB}if(a.t<this.t){c+=a.s;while(i<this.t){c+=this[i];r[i++]=c&this.DM;c>>=this.DB}c+=this.s}else{c+=this.s;while(i<a.t){c+=a[i];r[i++]=c&this.DM;c>>=this.DB}c+=a.s}r.s=c<0?-1:0;if(c>0)r[i++]=c;else if(c<-1)r[i++]=this.DV+c;r.t=i;r.clamp()}BigInteger.prototype.fromRadix=bnpFromRadix;BigInteger.prototype.chunkSize=bnpChunkSize;BigInteger.prototype.signum=bnSigNum;BigInteger.prototype.dMultiply=bnpDMultiply;BigInteger.prototype.dAddOffset=bnpDAddOffset;BigInteger.prototype.toRadix=bnpToRadix;BigInteger.prototype.intValue=bnIntValue;BigInteger.prototype.addTo=bnpAddTo;var Wrapper={abs:(function(l,h){var x=new goog.math.Long(l,h);var ret;if(x.isNegative()){ret=x.negate()}else{ret=x}HEAP32[tempDoublePtr>>2]=ret.low_;HEAP32[tempDoublePtr+4>>2]=ret.high_}),ensureTemps:(function(){if(Wrapper.ensuredTemps)return;Wrapper.ensuredTemps=true;Wrapper.two32=new BigInteger;Wrapper.two32.fromString("4294967296",10);Wrapper.two64=new BigInteger;Wrapper.two64.fromString("18446744073709551616",10);Wrapper.temp1=new BigInteger;Wrapper.temp2=new BigInteger}),lh2bignum:(function(l,h){var a=new BigInteger;a.fromString(h.toString(),10);var b=new BigInteger;a.multiplyTo(Wrapper.two32,b);var c=new BigInteger;c.fromString(l.toString(),10);var d=new BigInteger;c.addTo(b,d);return d}),stringify:(function(l,h,unsigned){var ret=(new goog.math.Long(l,h)).toString();if(unsigned&&ret[0]=="-"){Wrapper.ensureTemps();var bignum=new BigInteger;bignum.fromString(ret,10);ret=new BigInteger;Wrapper.two64.addTo(bignum,ret);ret=ret.toString(10)}return ret}),fromString:(function(str,base,min,max,unsigned){Wrapper.ensureTemps();var bignum=new BigInteger;bignum.fromString(str,base);var bigmin=new BigInteger;bigmin.fromString(min,10);var bigmax=new BigInteger;bigmax.fromString(max,10);if(unsigned&&bignum.compareTo(BigInteger.ZERO)<0){var temp=new BigInteger;bignum.addTo(Wrapper.two64,temp);bignum=temp}var error=false;if(bignum.compareTo(bigmin)<0){bignum=bigmin;error=true}else if(bignum.compareTo(bigmax)>0){bignum=bigmax;error=true}var ret=goog.math.Long.fromString(bignum.toString());HEAP32[tempDoublePtr>>2]=ret.low_;HEAP32[tempDoublePtr+4>>2]=ret.high_;if(error)throw"range error"})};return Wrapper})();if(memoryInitializer){if(typeof Module["locateFile"]==="function"){memoryInitializer=Module["locateFile"](memoryInitializer)}else if(Module["memoryInitializerPrefixURL"]){memoryInitializer=Module["memoryInitializerPrefixURL"]+memoryInitializer}if(ENVIRONMENT_IS_NODE||ENVIRONMENT_IS_SHELL){var data=Module["readBinary"](memoryInitializer);HEAPU8.set(data,STATIC_BASE)}else{addRunDependency("memory initializer");Browser.asyncLoad(memoryInitializer,(function(data){HEAPU8.set(data,STATIC_BASE);removeRunDependency("memory initializer")}),(function(data){throw"could not load memory initializer "+memoryInitializer}))}}function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;var initialStackTop;var preloadStartTime=null;var calledMain=false;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"]&&shouldRunNow)run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};Module["callMain"]=Module.callMain=function callMain(args){assert(runDependencies==0,"cannot call main when async dependencies remain! (listen on __ATMAIN__)");assert(__ATPRERUN__.length==0,"cannot call main when preRun functions remain to be called");args=args||[];ensureInitRuntime();var argc=args.length+1;function pad(){for(var i=0;i<4-1;i++){argv.push(0)}}var argv=[allocate(intArrayFromString(Module["thisProgram"]),"i8",ALLOC_NORMAL)];pad();for(var i=0;i<argc-1;i=i+1){argv.push(allocate(intArrayFromString(args[i]),"i8",ALLOC_NORMAL));pad()}argv.push(0);argv=allocate(argv,"i32",ALLOC_NORMAL);initialStackTop=STACKTOP;try{var ret=Module["_main"](argc,argv,0);exit(ret)}catch(e){if(e instanceof ExitStatus){return}else if(e=="SimulateInfiniteLoop"){Module["noExitRuntime"]=true;return}else{if(e&&typeof e==="object"&&e.stack)Module.printErr("exception thrown: "+[e,e.stack]);throw e}}finally{calledMain=true}};function run(args){args=args||Module["arguments"];if(preloadStartTime===null)preloadStartTime=Date.now();if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(ENVIRONMENT_IS_WEB&&preloadStartTime!==null){Module.printErr("pre-main prep time: "+(Date.now()-preloadStartTime)+" ms")}if(Module["_main"]&&shouldRunNow){Module["callMain"](args)}postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout((function(){setTimeout((function(){Module["setStatus"]("")}),1);doRun()}),1)}else{doRun()}}Module["run"]=Module.run=run;function exit(status){if(Module["noExitRuntime"]){return}ABORT=true;EXITSTATUS=status;STACKTOP=initialStackTop;exitRuntime();if(ENVIRONMENT_IS_NODE){process["stdout"]["once"]("drain",(function(){process["exit"](status)}));console.log(" ");setTimeout((function(){process["exit"](status)}),500)}else if(ENVIRONMENT_IS_SHELL&&typeof quit==="function"){quit(status)}throw new ExitStatus(status)}Module["exit"]=Module.exit=exit;function abort(text){if(text){Module.print(text);Module.printErr(text)}ABORT=true;EXITSTATUS=1;var extra="\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";throw"abort() at "+stackTrace()+extra}Module["abort"]=Module.abort=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"]){shouldRunNow=false}run()
