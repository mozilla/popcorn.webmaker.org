(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Browser Request
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var XHR = XMLHttpRequest
if (!XHR) throw new Error('missing XMLHttpRequest')
request.log = {
  'trace': noop, 'debug': noop, 'info': noop, 'warn': noop, 'error': noop
}

var DEFAULT_TIMEOUT = 3 * 60 * 1000 // 3 minutes

//
// request
//

function request(options, callback) {
  // The entry-point to the API: prep the options object and pass the real work to run_xhr.
  if(typeof callback !== 'function')
    throw new Error('Bad callback given: ' + callback)

  if(!options)
    throw new Error('No options given')

  var options_onResponse = options.onResponse; // Save this for later.

  if(typeof options === 'string')
    options = {'uri':options};
  else
    options = JSON.parse(JSON.stringify(options)); // Use a duplicate for mutating.

  options.onResponse = options_onResponse // And put it back.

  if (options.verbose) request.log = getLogger();

  if(options.url) {
    options.uri = options.url;
    delete options.url;
  }

  if(!options.uri && options.uri !== "")
    throw new Error("options.uri is a required argument");

  if(typeof options.uri != "string")
    throw new Error("options.uri must be a string");

  var unsupported_options = ['proxy', '_redirectsFollowed', 'maxRedirects', 'followRedirect']
  for (var i = 0; i < unsupported_options.length; i++)
    if(options[ unsupported_options[i] ])
      throw new Error("options." + unsupported_options[i] + " is not supported")

  options.callback = callback
  options.method = options.method || 'GET';
  options.headers = options.headers || {};
  options.body    = options.body || null
  options.timeout = options.timeout || request.DEFAULT_TIMEOUT

  if(options.headers.host)
    throw new Error("Options.headers.host is not supported");

  if(options.json) {
    options.headers.accept = options.headers.accept || 'application/json'
    if(options.method !== 'GET')
      options.headers['content-type'] = 'application/json'

    if(typeof options.json !== 'boolean')
      options.body = JSON.stringify(options.json)
    else if(typeof options.body !== 'string')
      options.body = JSON.stringify(options.body)
  }
  
  //BEGIN QS Hack
  var serialize = function(obj) {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  
  if(options.qs){
    var qs = (typeof options.qs == 'string')? options.qs : serialize(options.qs);
    if(options.uri.indexOf('?') !== -1){ //no get params
        options.uri = options.uri+'&'+qs;
    }else{ //existing get params
        options.uri = options.uri+'?'+qs;
    }
  }
  //END QS Hack
  
  //BEGIN FORM Hack
  var multipart = function(obj) {
    //todo: support file type (useful?)
    var result = {};
    result.boundry = '-------------------------------'+Math.floor(Math.random()*1000000000);
    var lines = [];
    for(var p in obj){
        if (obj.hasOwnProperty(p)) {
            lines.push(
                '--'+result.boundry+"\n"+
                'Content-Disposition: form-data; name="'+p+'"'+"\n"+
                "\n"+
                obj[p]+"\n"
            );
        }
    }
    lines.push( '--'+result.boundry+'--' );
    result.body = lines.join('');
    result.length = result.body.length;
    result.type = 'multipart/form-data; boundary='+result.boundry;
    return result;
  }
  
  if(options.form){
    if(typeof options.form == 'string') throw('form name unsupported');
    if(options.method === 'POST'){
        var encoding = (options.encoding || 'application/x-www-form-urlencoded').toLowerCase();
        options.headers['content-type'] = encoding;
        switch(encoding){
            case 'application/x-www-form-urlencoded':
                options.body = serialize(options.form).replace(/%20/g, "+");
                break;
            case 'multipart/form-data':
                var multi = multipart(options.form);
                //options.headers['content-length'] = multi.length;
                options.body = multi.body;
                options.headers['content-type'] = multi.type;
                break;
            default : throw new Error('unsupported encoding:'+encoding);
        }
    }
  }
  //END FORM Hack

  // If onResponse is boolean true, call back immediately when the response is known,
  // not when the full request is complete.
  options.onResponse = options.onResponse || noop
  if(options.onResponse === true) {
    options.onResponse = callback
    options.callback = noop
  }

  // XXX Browsers do not like this.
  //if(options.body)
  //  options.headers['content-length'] = options.body.length;

  // HTTP basic authentication
  if(!options.headers.authorization && options.auth)
    options.headers.authorization = 'Basic ' + b64_enc(options.auth.username + ':' + options.auth.password);

  return run_xhr(options)
}

var req_seq = 0
function run_xhr(options) {
  var xhr = new XHR
    , timed_out = false
    , is_cors = is_crossDomain(options.uri)
    , supports_cors = ('withCredentials' in xhr)

  req_seq += 1
  xhr.seq_id = req_seq
  xhr.id = req_seq + ': ' + options.method + ' ' + options.uri
  xhr._id = xhr.id // I know I will type "_id" from habit all the time.

  if(is_cors && !supports_cors) {
    var cors_err = new Error('Browser does not support cross-origin request: ' + options.uri)
    cors_err.cors = 'unsupported'
    return options.callback(cors_err, xhr)
  }

  xhr.timeoutTimer = setTimeout(too_late, options.timeout)
  function too_late() {
    timed_out = true
    var er = new Error('ETIMEDOUT')
    er.code = 'ETIMEDOUT'
    er.duration = options.timeout

    request.log.error('Timeout', { 'id':xhr._id, 'milliseconds':options.timeout })
    return options.callback(er, xhr)
  }

  // Some states can be skipped over, so remember what is still incomplete.
  var did = {'response':false, 'loading':false, 'end':false}

  xhr.onreadystatechange = on_state_change
  xhr.open(options.method, options.uri, true) // asynchronous
  if(is_cors)
    xhr.withCredentials = !! options.withCredentials
  xhr.send(options.body)
  return xhr

  function on_state_change(event) {
    if(timed_out)
      return request.log.debug('Ignoring timed out state change', {'state':xhr.readyState, 'id':xhr.id})

    request.log.debug('State change', {'state':xhr.readyState, 'id':xhr.id, 'timed_out':timed_out})

    if(xhr.readyState === XHR.OPENED) {
      request.log.debug('Request started', {'id':xhr.id})
      for (var key in options.headers)
        xhr.setRequestHeader(key, options.headers[key])
    }

    else if(xhr.readyState === XHR.HEADERS_RECEIVED)
      on_response()

    else if(xhr.readyState === XHR.LOADING) {
      on_response()
      on_loading()
    }

    else if(xhr.readyState === XHR.DONE) {
      on_response()
      on_loading()
      on_end()
    }
  }

  function on_response() {
    if(did.response)
      return

    did.response = true
    request.log.debug('Got response', {'id':xhr.id, 'status':xhr.status})
    clearTimeout(xhr.timeoutTimer)
    xhr.statusCode = xhr.status // Node request compatibility

    // Detect failed CORS requests.
    if(is_cors && xhr.statusCode == 0) {
      var cors_err = new Error('CORS request rejected: ' + options.uri)
      cors_err.cors = 'rejected'

      // Do not process this request further.
      did.loading = true
      did.end = true

      return options.callback(cors_err, xhr)
    }

    options.onResponse(null, xhr)
  }

  function on_loading() {
    if(did.loading)
      return

    did.loading = true
    request.log.debug('Response body loading', {'id':xhr.id})
    // TODO: Maybe simulate "data" events by watching xhr.responseText
  }

  function on_end() {
    if(did.end)
      return

    did.end = true
    request.log.debug('Request done', {'id':xhr.id})

    xhr.body = xhr.responseText
    if(options.json) {
      try        { xhr.body = JSON.parse(xhr.responseText) }
      catch (er) { return options.callback(er, xhr)        }
    }

    options.callback(null, xhr, xhr.body)
  }

} // request

request.withCredentials = false;
request.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;

//
// defaults
//

request.defaults = function(options, requester) {
  var def = function (method) {
    var d = function (params, callback) {
      if(typeof params === 'string')
        params = {'uri': params};
      else {
        params = JSON.parse(JSON.stringify(params));
      }
      for (var i in options) {
        if (params[i] === undefined) params[i] = options[i]
      }
      return method(params, callback)
    }
    return d
  }
  var de = def(request)
  de.get = def(request.get)
  de.post = def(request.post)
  de.put = def(request.put)
  de.head = def(request.head)
  return de
}

//
// HTTP method shortcuts
//

var shortcuts = [ 'get', 'put', 'post', 'head' ];
shortcuts.forEach(function(shortcut) {
  var method = shortcut.toUpperCase();
  var func   = shortcut.toLowerCase();

  request[func] = function(opts) {
    if(typeof opts === 'string')
      opts = {'method':method, 'uri':opts};
    else {
      opts = JSON.parse(JSON.stringify(opts));
      opts.method = method;
    }

    var args = [opts].concat(Array.prototype.slice.apply(arguments, [1]));
    return request.apply(this, args);
  }
})

//
// CouchDB shortcut
//

request.couch = function(options, callback) {
  if(typeof options === 'string')
    options = {'uri':options}

  // Just use the request API to do JSON.
  options.json = true
  if(options.body)
    options.json = options.body
  delete options.body

  callback = callback || noop

  var xhr = request(options, couch_handler)
  return xhr

  function couch_handler(er, resp, body) {
    if(er)
      return callback(er, resp, body)

    if((resp.statusCode < 200 || resp.statusCode > 299) && body.error) {
      // The body is a Couch JSON object indicating the error.
      er = new Error('CouchDB error: ' + (body.error.reason || body.error.error))
      for (var key in body)
        er[key] = body[key]
      return callback(er, resp, body);
    }

    return callback(er, resp, body);
  }
}

//
// Utility
//

function noop() {}

function getLogger() {
  var logger = {}
    , levels = ['trace', 'debug', 'info', 'warn', 'error']
    , level, i

  for(i = 0; i < levels.length; i++) {
    level = levels[i]

    logger[level] = noop
    if(typeof console !== 'undefined' && console && console[level])
      logger[level] = formatted(console, level)
  }

  return logger
}

function formatted(obj, method) {
  return formatted_logger

  function formatted_logger(str, context) {
    if(typeof context === 'object')
      str += ' ' + JSON.stringify(context)

    return obj[method].call(obj, str)
  }
}

// Return whether a URL is a cross-domain request.
function is_crossDomain(url) {
  var rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/

  // jQuery #8138, IE may throw an exception when accessing
  // a field from window.location if document.domain has been set
  var ajaxLocation
  try { ajaxLocation = location.href }
  catch (e) {
    // Use the href attribute of an A element since IE will modify it given document.location
    ajaxLocation = document.createElement( "a" );
    ajaxLocation.href = "";
    ajaxLocation = ajaxLocation.href;
  }

  var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || []
    , parts = rurl.exec(url.toLowerCase() )

  var result = !!(
    parts &&
    (  parts[1] != ajaxLocParts[1]
    || parts[2] != ajaxLocParts[2]
    || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))
    )
  )

  //console.debug('is_crossDomain('+url+') -> ' + result)
  return result
}

// MIT License from http://phpjs.org/functions/base64_encode:358
function b64_enc (data) {
    // Encodes string using MIME base64 algorithm
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc="", tmp_arr = [];

    if (!data) {
        return data;
    }

    // assume utf8 data
    // data = this.utf8_encode(data+'');

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1<<16 | o2<<8 | o3;

        h1 = bits>>18 & 0x3f;
        h2 = bits>>12 & 0x3f;
        h3 = bits>>6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    switch (data.length % 3) {
        case 1:
            enc = enc.slice(0, -2) + '==';
        break;
        case 2:
            enc = enc.slice(0, -1) + '=';
        break;
    }

    return enc;
}
module.exports = request;

},{}],2:[function(require,module,exports){
(function() {

  var cookiejs = {
    /// Serialize the a name value pair into a cookie string suitable for
    /// http headers. An optional options object specified cookie parameters
    ///
    /// serialize('foo', 'bar', { httpOnly: true })
    ///   => "foo=bar; httpOnly"
    ///
    /// @param {String} name
    /// @param {String} val
    /// @param {Object} options
    /// @return {String}
    serialize: function(name, val, opt){
      opt = opt || {};
      var enc = opt.encode || encode;
      var pairs = [name + '=' + enc(val)];

      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
        pairs.push('Max-Age=' + maxAge);
      }

      if (opt.domain) pairs.push('Domain=' + opt.domain);
      if (opt.path) pairs.push('Path=' + opt.path);
      if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
      if (opt.httpOnly) pairs.push('HttpOnly');
      if (opt.secure) pairs.push('Secure');

      return pairs.join('; ');
    },

    /// Parse the given cookie header string into an object
    /// The object has the various cookies as keys(names) => values
    /// @param {String} str
    /// @return {Object}
    parse: function(str, opt) {
      opt = opt || {};
      var obj = {}
      var pairs = str.split(/; */);
      var dec = opt.decode || decode;

      pairs.forEach(function(pair) {
        var eq_idx = pair.indexOf('=')

        // skip things that don't look like key=value
        if (eq_idx < 0) {
          return;
        }

        var key = pair.substr(0, eq_idx).trim()
        var val = pair.substr(++eq_idx, pair.length).trim();

        // quoted values
        if ('"' == val[0]) {
          val = val.slice(1, -1);
        }

        // only assign once
        if (undefined == obj[key]) {
          try {
            obj[key] = dec(val);
          } catch (e) {
            obj[key] = val;
          }
        }
      });

      return obj;
    }
  };

  var encode = encodeURIComponent;
  var decode = decodeURIComponent;

  // export in node environments for testing purposes.
  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = cookiejs;
  } else {
    if ( typeof define === "function" && define.amd ) {
      // Support for requirejs
      define(function() {
        return cookiejs;
      });
    } else {
      // Support for include on individual pages.
      window.cookiejs = cookiejs;
    }
  }

}());

},{}],3:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],4:[function(require,module,exports){
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  }
  else if (typeof module === "object" && module && typeof module.exports === "object") {
    module.exports = factory();
  } else {
    global.analytics = factory();
  }
}(this, function() {

  // Make sure _gaq is on the global so we don't die trying to access it
  if(!this._gaq) {
    this._gaq = [];
  }

  // Make sure optimizely is on the global so we don't die trying to access it
  if(!this.optimizely) {
    this.optimizely = [];
  }

  // Use hostname for GA Category
  var _category = location.hostname,
      _redacted = "REDACTED (Potential Email Address)";

  /**
   * To Title Case 2.1 - http://individed.com/code/to-title-case/
   * Copyright 2008-2013 David Gouch. Licensed under the MIT License.
   * https://github.com/gouch/to-title-case
   */
  function toTitleCase(s){
    var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
    s = trim(s);

    return s.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
      if (index > 0 &&
          index + match.length !== title.length &&
          match.search(smallWords) > -1 &&
          title.charAt(index - 2) !== ":" &&
          (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
          title.charAt(index - 1).search(/[^\s-]/) < 0) {
        return match.toLowerCase();
      }

      if (match.substr(1).search(/[A-Z]|\../) > -1) {
        return match;
      }

      return match.charAt(0).toUpperCase() + match.substr(1);
    });
  }

  // GA strings need to have leading/trailing whitespace trimmed, and not all
  // browsers have String.prototoype.trim().
  function trim(s) {
    return s.replace(/^\s+|\s+$/g, '');
  }

  // See if s could be an email address. We don't want to send personal data like email.
  function mightBeEmail(s) {
    // There's no point trying to validate rfc822 fully, just look for ...@...
    return (/[^@]+@[^@]+/).test(s);
  }

  function warn(msg) {
    console.warn("[analytics] " + msg);
  }

  // Support both types of Google Analytics Event Tracking, see:
  // ga.js - https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
  // analytics.js - https://developers.google.com/analytics/devguides/collection/analyticsjs/events
  function _gaEvent(options) {
    // If the new analytics.js API is present, fire this event using ga().
    if(typeof ga === "function") {
      // Transform the argument array to match the expected call signature for ga(), see:
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/events#overview
      var fieldObject = {
        'hitType': 'event',
        'eventCategory': _category,
        'eventAction': options.action
      };
      if(options.label) {
        fieldObject['eventLabel'] = options.label;
      }
      if(options.value || options.value === 0) {
        fieldObject['eventValue'] = options.value;
      }
      if(options.nonInteraction === true) {
        fieldObject['nonInteraction'] = 1;
      }
      ga('send', fieldObject);
    }

    // Also support the old API. Google suggests firing data at both to be the right thing.
    var eventArgs = ['_trackEvent', _category, options.action];
    if(options.label) {
      eventArgs[3] = options.label;
    }
    if(options.value || options.value === 0) {
      eventArgs[4] = options.value;
    }
    if(options.nonInteraction === true) {
      eventArgs[5] = true;
    }
    _gaq.push(eventArgs);
  }

  function event(action, options) {
    options = options || {};
    var eventOptions = {},
        label = options.label,
        value = options.value,
        // Support both forms to deal with typos between the 2 APIs
        nonInteraction = options.noninteraction || options.nonInteraction;

    if(!action) {
      warn("Expected `action` arg.");
      return;
    }
    if(mightBeEmail(action)) {
      warn("`action` arg looks like an email address, redacting.");
      action = _redacted;
    }
    eventOptions.action = toTitleCase(action);

    // label: An optional string to provide additional dimensions to the event data.
    if(label) {
      if(typeof label !== "string") {
        warn("Expected `label` arg to be a String.");
      } else {
        if(mightBeEmail(label)) {
          warn("`label` arg looks like an email address, redacting.");
          label = _redacted;
        }
        eventOptions.label = trim(label);
      }
    }

    // value: An optional integer that you can use to provide numerical data about
    // the user event.
    if(value || value === 0) {
      if(typeof value !== "number") {
        warn("Expected `value` arg to be a Number.");
      } else {
        // Force value to int
        eventOptions.value = value|0;
      }
    }

    // noninteraction: An optional boolean that when set to true, indicates that
    // the event hit will not be used in bounce-rate calculation.
    if(nonInteraction) {
      if(typeof nonInteraction !== "boolean") {
        warn("Expected `noninteraction` arg to be a Boolean.");
      } else {
        eventOptions.nonInteraction = nonInteraction === true;
      }
    }

    _gaEvent(eventOptions);
  }

  // Use a consistent prefix and check if arg starts with a forward slash
  function prefixVirtualPageview(s) {
    // Bail if s is already prefixed.
    if(/^\/virtual\//.test(s)) {
      return s;
    }
    // Make sure s has a leading / then add prefix and return
    s = s.replace(/^[/]?/, '/');
    return '/virtual' + s;
  }

  // Support both types of Google Analytics Tracking, see:
  // ga.js - https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration#_gat.GA_Tracker_._trackPageview
  // analytics.js - https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
  function _gaVirtualPageView(options) {
    // If the new analytics.js API is present, fire this event using ga().
    if(typeof ga === "function") {
      // Transform the argument array to match the expected call signature for ga():
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
      var fieldObject = {
        'hitType': 'pageview',
        'page': options.virtualPagePath
      };
      ga('send', fieldObject);
    }

    // Also support the old API. Google suggests firing data at both to be the right thing.
    var eventArgs = ['_trackPageview', options.virtualPagePath];
    _gaq.push(eventArgs);
  }

  function virtualPageview(virtualPagePath) {
    if(!virtualPagePath) {
      warn("Expected `virtualPagePath` arg.");
      return;
    }
    virtualPagePath = trim(virtualPagePath);

    var eventOptions = {};
    eventOptions.virtualPagePath = prefixVirtualPageview(virtualPagePath);

    _gaVirtualPageView(eventOptions);
  }


  function _optimizely(options) {
    var eventArgs = ['trackEvent', options.action];

    // check if we are giving this conversion financial value
    if (options.revenue) {
      var args = {
        revenue: options.revenue
      };
      eventArgs[2] = args;
    }

    optimizely.push(eventArgs);
  }

  function conversionGoal(action, options) {
    options = options || {};
    var eventOptions = {},
        valueInCents = options.valueInCents;

    if(!action) {
      warn("Expected `action` arg.");
      return;
    }
    eventOptions.action = trim(action);

    // valueInCents: An optional integer to track revenue - for example from fundraising appeal.
    if(valueInCents) {
      if((typeof valueInCents === 'number') && (valueInCents % 1 === 0)) {
        eventOptions.revenue = valueInCents;
      } else {
        warn("Expected `valueInCents` arg to be an integer.");
      }
    }

    _optimizely(eventOptions);
  }

  return {
    event: event,
    virtualPageview: virtualPageview,
    conversionGoal: conversionGoal
  };

}));

},{}],5:[function(require,module,exports){
var ngModule = angular.module('ngWebmakerLogin', ['templates-ngWebmakerLogin']);

ngModule.factory('loginOptions', ['$rootScope',
  function ($rootScope) {
    // Webmaker apps don't use a single method for configuration, yay!
    if (window.angularConfig) {
      // Webmaker.org
      return {
        csrfToken: window.angularConfig.csrf,
        paths: window.angularConfig.loginPaths
      };
    } else if (window.eventsConfig) {
      // Webmaker Events (2)
      return {
        csrfToken: window.eventsConfig.csrf,
        paths: window.eventsConfig.loginPaths
      };
    } else if ($rootScope.WMP.config) {
      // Webmaker Profile
      return {
        csrfToken: $rootScope.WMP.config.csrf,
        paths: $rootScope.WMP.config.loginPaths
      };
    }
    console.warn('Could not locate a config on window.angularConfig, window.eventsConfig or $rootScope.WMP.config');
    return {};
  }
]);

ngModule.factory('focus', ['$timeout',
  function ($timeout) {
    return function (selector) {
      // Timeout used to ensure that the DOM has the input that needs to be focused on
      $timeout(function () {
        var el = angular.element(selector);
        if (!el || !el[0]) {
          return;
        }
        el[0].focus();
      }, 0);
    };
  }
]);

ngModule.directive('bindTrustedHtml', ['$compile',
  function ($compile) {
    return function (scope, element, attrs) {
      scope.$watch(
        function (scope) {
          // watch the 'bindUnsafeHtml' expression for changes
          return scope.$eval(attrs.bindTrustedHtml);
        },
        function (value) {
          // when the 'bindUnsafeHtml' expression changes
          // assign it into the current DOM
          element.html(value);

          // compile the new DOM and link it to the current
          // scope.
          // NOTE: we only compile .childNodes so that
          // we don't get into infinite loop compiling ourselves
          $compile(element.contents())(scope);
        }
      );
    };
  }
]);

ngModule.factory('wmLoginCore', ['$rootScope', '$location', '$timeout', 'loginOptions',
  function ($rootScope, $location, $timeout, loginOptions) {
    var LoginCore = require('../core');

    var core = new LoginCore(loginOptions);

    var searchObj = $location.search();

    $rootScope._user = {};

    function scrubSearch() {
      $location.search('uid', null);
      $location.search('token', null);
      $location.search('validFor', null);
    }

    // see if we can try to instantly log in with an OTP
    if (searchObj.uid && searchObj.token) {
      core.on('signedIn', function (user) {
        $timeout(function () {
          scrubSearch();
          $rootScope._user = user;
        }, 0);
      });
      core.on('signinFailed', function (uid) {
        // TODO: design?
        $timeout(function () {
          console.error('login failed for uid: ' + uid);
          scrubSearch();
          $rootScope.expiredLoginLink = true;
          $rootScope.signin(uid);
        }, 0);
      });
      core.instantLogin(searchObj.uid, searchObj.token, searchObj.validFor);
    }

    core.on('verified', function (user) {
      $timeout(function () {
        $rootScope._user = user ? user : {};
        $rootScope.$broadcast('verified', user);
      }, 0);
    });

    core.verify();

    return core;
  }
]);

ngModule.directive('wmJoinWebmaker', [
  function () {
    return {
      restrict: 'A',
      scope: {
        showCTA: '=showcta'
      },
      link: function ($scope, $element) {
        $element.on('click', function () {
          $scope.joinWebmaker();
        });
      },
      controller: ['$rootScope', '$scope', '$modal', '$timeout', 'focus', 'wmLoginCore',
        function ($rootScope, $scope, $modal, $timeout, focus, wmLoginCore) {
          $scope.joinWebmaker = $rootScope.joinWebmaker = function (email, username, agreeToTerms) {
            $modal.open({
              templateUrl: 'join-webmaker-modal.html',
              controller: ['$scope', '$modalInstance', 'email', 'username', 'showCTA', 'agreeToTerms', joinModalController],
              resolve: {
                email: function () {
                  return email;
                },
                username: function () {
                  return username;
                },
                showCTA: function () {
                  return !!$scope.showCTA;
                },
                agreeToTerms: function () {
                  return agreeToTerms;
                }
              }
            });
          };

          function joinModalController($scope, $modalInstance, email, username, showCTA, agreeToTerms) {

            var MODALSTATE = {
              inputEmail: 0,
              inputUsername: 1,
              welcome: 2
            };

            $scope.MODALSTATE = MODALSTATE;
            $scope.currentState = MODALSTATE.inputEmail;

            $scope.form = {};
            $scope.user = {};
            $scope.sendingRequest = false;

            var joinController = wmLoginCore.joinWebmaker(showCTA);

            if (email) {
              $scope.user.email = email;
            }
            if (username) {
              $scope.user.username = username;
            }

            $scope.user.agree = agreeToTerms;

            joinController.on('sendingRequest', function (state) {
              $timeout(function () {
                $scope.sendingRequest = state;
              }, 0);
            });

            joinController.on('displayEmailInput', function () {
              $timeout(function () {
                $scope.currentState = MODALSTATE.inputEmail;
                focus('input[focus-on="create-user-email"]');
                if ($scope.user.email !== undefined && joinController.validateEmail($scope.user.email) && $scope.user.agree !== undefined) {
                  joinController.submitEmail($scope.user.agree);
                  if ($scope.user.agree) {
                    $scope.skippedEmail = true;
                    joinController.validateUsername(username);
                  }
                }
              }, 0);
            });

            joinController.on('displayUsernameInput', function () {
              $timeout(function () {
                $scope.currentState = MODALSTATE.inputUsername;
                focus('input[focus-on="create-user-username"]');
              }, 0);
            });

            joinController.on('displayWelcome', function (user, showCTA) {
              $timeout(function () {
                $rootScope._user = user;
                if (showCTA) {
                  $scope.welcomeModalIdx = Math.floor(Math.random() * 2);
                } else {
                  $scope.simpleCTA = true;
                }
                $scope.currentState = MODALSTATE.welcome;
              }, 0);
            });

            joinController.on('displayAlert', function (alertId) {
              $timeout(function () {
                $scope.form.user.$setValidity(alertId, false);
              }, 0);
            });

            joinController.on('hideAlert', function (alertId) {
              $timeout(function () {
                $scope.form.user.$setValidity(alertId, true);
              }, 0);
            });

            $scope.validateEmail = function () {
              if (!$scope.user.email) {
                return;
              }

              joinController.validateEmail($scope.user.email);
            };

            $scope.submitEmail = function () {
              joinController.submitEmail($scope.user.agree);
            };

            $scope.agreeToTermsChanged = function () {
              joinController.agreeToTermsChanged($scope.user.agree);
            };

            $scope.validateUsername = function () {
              joinController.validateUsername($scope.user.username);
            };

            $scope.submitUser = function () {
              joinController.submitUser($scope.user);
            };

            $scope.close = function () {
              $modalInstance.close();
            };

            $scope.switchToSignin = function () {
              $modalInstance.close();
              $rootScope.signin($scope.user.email);
            };

            joinController.start();
          }
        }
      ]
    };
  }
]);

ngModule.directive('wmSignin', [
  function () {
    return {
      restrict: 'A',
      scope: {
        disablePersona: '=disablepersona'
      },
      link: function ($scope, $element) {
        $element.on('click', function () {
          $scope.signin();
        });
      },
      controller: ['$rootScope', '$scope', '$modal', '$timeout', '$location', 'focus', 'wmLoginCore',
        function ($rootScope, $scope, $modal, $timeout, $location, focus, wmLoginCore) {
          function signinModalController($scope, $modalInstance, uid, passwordWasReset, disablePersona) {
            var MODALSTATE = {
              enterUid: 0,
              checkEmail: 1,
              enterKey: 2,
              enterPassword: 3,
              resetRequestSent: 4
            };

            $scope.MODALSTATE = MODALSTATE;
            $scope.currentState = MODALSTATE.enterUid;
            $scope.passwordWasReset = passwordWasReset;
            $scope.sendingRequest = false;
            $scope.disablePersona = disablePersona;

            $scope.form = {};
            $scope.user = {};

            if (uid) {
              $scope.user.uid = uid;
            }

            var signinController = wmLoginCore.signIn();

            signinController.on('sendingRequest', function (state) {
              $timeout(function () {
                $scope.sendingRequest = state;
              }, 0);
            });

            signinController.on('displayEnterUid', function () {
              $timeout(function () {
                $scope.currentState = MODALSTATE.enterUid;
                focus('input[focus-on="login-uid"]');
              }, 0);
            });

            signinController.on('displayEnterPassword', function () {
              $timeout(function () {
                $scope.currentState = MODALSTATE.enterPassword;
                focus('input[focus-on="enter-password"]');
              }, 0);
            });

            signinController.on('displayEnterKey', function (verified) {
              $timeout(function () {
                $scope.verified = verified;
                $scope.currentState = MODALSTATE.enterKey;
                focus('input[focus-on="enter-key"]');
              }, 0);
            });

            signinController.on('displayCheckEmail', function () {
              $timeout(function () {
                $scope.currentState = MODALSTATE.checkEmail;
              }, 0);
            });

            signinController.on('displayResetSent', function () {
              $timeout(function () {
                $scope.currentState = MODALSTATE.resetRequestSent;
              }, 0);
            });

            signinController.on('displayAlert', function (alertId) {
              $timeout(function () {
                $scope.form.user.$setValidity(alertId, false);
              }, 0);
            });

            signinController.on('hideAlert', function (alertId) {
              $timeout(function () {
                $scope.form.user.$setValidity(alertId, true);
              }, 0);
            });

            signinController.on('signedIn', function (user) {
              $rootScope._user = user;
              $modalInstance.close();
              $rootScope.$broadcast('login', user);
            });

            $scope.submitUid = function () {
              signinController.submitUid($scope.user.uid, $location.path());
            };

            $scope.enterKey = function () {
              signinController.displayEnterKey();
            };

            $scope.submitKey = function () {
              signinController.verifyKey($scope.user.uid, $scope.user.key, $scope.user.rememberMe);
            };

            $scope.submitPassword = function () {
              signinController.verifyPassword($scope.user.uid, $scope.user.password, $scope.user.rememberMe);
            };

            $scope.requestReset = function () {
              signinController.requestReset($scope.user.uid);
            };

            $scope.close = function () {
              $scope.user = {};
              $modalInstance.close();
            };

            $scope.switchToSignup = function () {
              var uid = $scope.user.uid,
                type = signinController.getUidType(uid),
                email = type === 'email' ? uid : '',
                username = type === 'username' ? uid : '';

              $modalInstance.close();
              $rootScope.joinWebmaker(email, username);
            };

            $scope.usePersona = function () {
              $rootScope.personaLogin();

              // the modal code calls scope.$apply, which can throw.
              // dropping it in this timeout fixes the race condition.
              $timeout($modalInstance.dismiss, 0);
            };

            signinController.start();

          }

          $scope.signin = $rootScope.signin = function (uid, passwordWasReset) {
            $modal.open({
              templateUrl: 'signin-modal.html',
              controller: ['$scope', '$modalInstance', 'uid', 'passwordWasReset', signinModalController],
              resolve: {
                uid: function () {
                  return uid;
                },
                passwordWasReset: function () {
                  return passwordWasReset;
                },
                disablePersona: function () {
                  return $scope.disablePersona;
                }
              }
            });
          };
        }
      ]
    };
  }
]);

ngModule.directive('wmPasswordReset', [
  function () {
    // Prevent multiple dialogs
    var triggered = false;
    return {
      restrict: 'A',
      controller: ['$rootScope', '$scope', '$location', '$timeout', '$modal', 'wmLoginCore',
        function ($rootScope, $scope, $location, $timeout, $modal, wmLoginCore) {

          var searchObj = $location.search();

          if (!searchObj.resetCode || !searchObj.uid || triggered) {
            return;
          }

          triggered = true;

          function passwordResetModalController($scope, $modalInstance, resetCode, uid) {
            $scope.form = {};
            $scope.password = {};
            $scope.sendingRequest = false;

            $scope.eightChars = angular.element('li.eight-chars');
            $scope.oneEachCase = angular.element('li.one-each-case');
            $scope.oneNumber = angular.element('li.one-number');

            function clearSearch() {
              $location.search('uid', null);
              $location.search('resetCode', null);
              $modalInstance.close();
            }

            var resetController = wmLoginCore.resetPassword();

            resetController.on('sendingRequest', function (state) {
              $timeout(function () {
                $scope.sendingRequest = state;
              }, 0);
            });

            resetController.on('displayAlert', function (alertId) {
              $timeout(function () {
                $scope.form.password.$setValidity(alertId, false);
              }, 0);
            });

            resetController.on('hideAlert', function (alertId) {
              $timeout(function () {
                $scope.form.password.$setValidity(alertId, true);
              }, 0);
            });

            resetController.on('checkConfirmPassword', function (status) {
              $timeout(function () {
                $scope.passwordsMatch = status;
              }, 0);

            });

            resetController.on('passwordCheckResult', function (result, blur) {
              $timeout(function () {
                // set to default statue
                if (!result) {
                  $scope.eightCharsState = $scope.oneEachCaseState = $scope.oneNumberState = 'default';
                  $scope.isValidPassword = false;
                  return;
                }

                $scope.eightCharsState = !result.lengthValid ? 'invalid' : blur ? 'valid' : '';
                $scope.oneEachCaseState = !result.caseValid ? 'invalid' : blur ? 'valid' : '';
                $scope.oneNumberState = !result.digitValid ? 'invalid' : blur ? 'valid' : '';
                $scope.isValidPassword = result.lengthValid && result.caseValid && result.digitValid;
              }, 0);
            });

            resetController.on('resetSucceeded', function () {
              $timeout(function () {
                clearSearch();
                $rootScope.signin(uid, true);
              }, 0);
            });

            $scope.checkPasswordStrength = function (blur) {
              resetController.checkPasswordStrength($scope.password.value, blur);
            };

            $scope.checkPasswordsMatch = function (blur) {
              if (!$scope.password.confirmValue) {
                return;
              }
              resetController.passwordsMatch($scope.password.value, $scope.password.confirmValue, blur);
            };

            $scope.submitResetRequest = function () {
              resetController.submitResetRequest(uid, resetCode, $scope.password.value);
            };

            $scope.close = function () {
              clearSearch();
              $modalInstance.close();
            };
          }

          $modal.open({
            templateUrl: 'reset-modal.html',
            controller: ['$scope', '$modalInstance', 'resetCode', 'uid', passwordResetModalController],
            resolve: {
              resetCode: function () {
                return searchObj.resetCode;
              },
              uid: function () {
                return searchObj.uid;
              }
            }
          });
        }
      ]
    };
  }
]);

// Legacy Persona login
ngModule.factory('wmPersona', ['$rootScope', 'wmLoginCore',
  function ($rootScope, wmLoginCore) {
    var personaController = wmLoginCore.personaLogin();

    $rootScope.personaLogin = function () {
      personaController.authenticate();
    };

    personaController.on('signedIn', function (user) {
      $rootScope._user = user;
    });

    personaController.on('newUser', function (email) {
      $rootScope.joinWebmaker(email);
    });
  }
]);

ngModule.directive('wmPersonaLogin', ['wmPersona',
  function () {
    return {
      restrict: 'A',
      link: function ($scope, $element) {
        $element.on('click', function () {
          $scope.personaLogin();
        });
      }
    };
  }
]);

ngModule.directive('wmLogout', ['$timeout', 'wmLoginCore',
  function ($timeout) {
    return {
      restrict: 'A',
      link: function ($rootScope, $element) {
        $element.on('click', function () {
          $rootScope.logout();
        });
      },
      controller: ['$rootScope', 'wmLoginCore',
        function ($rootScope, wmLoginCore) {
          var logoutController = wmLoginCore.logout();

          logoutController.on('loggedOut', function () {
            $timeout(function () {
              $rootScope._user = {};
              $rootScope.$broadcast('logout');
            }, 0);
          });

          $rootScope.logout = function () {
            logoutController.logout();
          };
        }
      ]
    };
  }
]);

},{"../core":6}],6:[function(require,module,exports){
var state = require('./state');
var LoginAPI = require('./loginAPI');
var Emitter = require('./state/emitter');

module.exports = function WebmakerLoginCore(options) {
  var loginAPI = new LoginAPI(options);
  var emitter = new Emitter();

  function verify() {
    loginAPI.verify(function (err, resp, body) {
      if (err) {
        return emitter.emit('error', err);
      }

      try {
        body = JSON.parse(body);
      } catch (ex) {
        return emitter.emit('error', 'could not parse json from verify route');
      }

      emitter.emit('verified', body.user);
    });
  }

  window.addEventListener('focus', verify);

  return {
    on: function (event, listener) {
      emitter.on(event, listener);
    },
    off: function (event, listener) {
      emitter.off(event, listener);
    },
    joinWebmaker: function (showCTA) {
      return new state.JoinController(loginAPI, !! showCTA);
    },
    signIn: function () {
      return new state.SignInController(loginAPI);
    },
    resetPassword: function () {
      return new state.ResetController(loginAPI);
    },
    personaLogin: function () {
      return new state.PersonaController(loginAPI);
    },
    logout: function () {
      return new state.LogoutController(loginAPI);
    },
    instantLogin: function (uid, password, validFor) {
      loginAPI.verifyKey(uid, password, validFor, function (err, resp, body) {
        if (err || resp.status !== 200 || !body.user) {
          return emitter.emit('signinFailed', uid);
        }

        emitter.emit('signedIn', body.user);
      });
    },
    verify: verify
  };
};

},{"./loginAPI":7,"./state":11,"./state/emitter":10}],7:[function(require,module,exports){
var request = require('browser-request');

module.exports = function LoginAPI(options) {
  options = options || {};
  options.paths = options.paths || {};

  var refferals = require('./referrals.js')();
  var loginUrls = require('./loginUrls.js')(options);

  var withCredentials = options.withCredentials === false ? false : true;
  var timeout = (options.timeout || 10) * 1000;
  var headers = {
    'X-CSRF-Token': options.csrfToken
  };
  var audience = options.audience || (window.location.protocol + '//' + window.location.host);

  function doRequest(uri, payload, callback) {
    request({
      method: 'post',
      uri: uri,
      timeout: timeout,
      withCredentials: withCredentials,
      headers: headers,
      json: payload
    }, callback);
  }

  function uidExists(uid, callback) {
    doRequest(loginUrls.uidExists, {
      uid: uid
    }, callback);
  }

  function checkUsername(username, callback) {
    doRequest(loginUrls.checkUsername, {
      username: username
    }, callback);
  }

  function createUser(user, callback) {
    user.referrer = refferals.refValue();
    doRequest(loginUrls.createUser, {
      user: user,
      audience: audience
    }, function () {
      refferals.clearReferrerCookie();
      callback.apply(null, arguments);
    });
  }

  function sendLoginKey(uid, path, callback) {
    doRequest(loginUrls.request, {
      uid: uid,
      path: path
    }, callback);
  }

  function verifyKey(uid, key, validFor, callback) {
    doRequest(loginUrls.authenticateToken, {
      uid: uid,
      token: key,
      validFor: validFor,
      user: {
        referrer: refferals.refValue()
      }
    }, function () {
      refferals.clearReferrerCookie();
      callback.apply(null, arguments);
    });
  }

  function verifyPassword(uid, password, validFor, callback) {
    doRequest(loginUrls.verifyPassword, {
      uid: uid,
      password: password,
      validFor: validFor,
      user: {
        referrer: refferals.refValue()
      }
    }, function () {
      refferals.clearReferrerCookie();
      callback.apply(null, arguments);
    });
  }

  function requestReset(uid, callback) {
    doRequest(loginUrls.requestResetCode, {
      uid: uid
    }, callback);
  }

  function resetPassword(uid, resetCode, password, callback) {
    doRequest(loginUrls.resetPassword, {
      uid: uid,
      resetCode: resetCode,
      newPassword: password
    }, callback);
  }

  function personaLogin(assertion, callback) {
    doRequest(loginUrls.authenticate, {
      assertion: assertion,
      audience: audience,
      user: {
        referrer: refferals.refValue()
      }
    }, callback);
  }

  function logout(callback) {
    doRequest(loginUrls.logout, null, callback);
  }

  function verify(callback) {
    doRequest(loginUrls.verify, null, callback);
  }

  return {
    uidExists: uidExists,
    checkUsername: checkUsername,
    createUser: createUser,
    sendLoginKey: sendLoginKey,
    verifyKey: verifyKey,
    verifyPassword: verifyPassword,
    requestReset: requestReset,
    resetPassword: resetPassword,
    personaLogin: personaLogin,
    logout: logout,
    verify: verify
  };
};

},{"./loginUrls.js":8,"./referrals.js":9,"browser-request":1}],8:[function(require,module,exports){
module.exports = function (options) {

  var paths = {},
    host = options.host || '';

  paths = options.paths || {};
  paths.authenticate = options.paths.authenticate || '/authenticate';
  paths.legacyCreate = options.paths.legacyCreate || '/create';
  paths.verify = options.paths.verify || '/verify';
  paths.logout = options.paths.logout || '/logout';
  paths.checkUsername = options.paths.checkUsername || '/check-username';
  paths.request = options.paths.request || '/auth/v2/request';
  paths.uidExists = options.paths.uidExists || '/auth/v2/uid-exists';
  paths.createUser = options.paths.createUser || '/auth/v2/create';
  paths.authenticateToken = options.paths.authenticateToken || '/auth/v2/authenticateToken';
  paths.verifyPassword = options.paths.verifyPassword || '/auth/v2/verify-password';
  paths.requestResetCode = options.paths.requestResetCode || '/auth/v2/request-reset-code';
  paths.removePassword = options.paths.removePassword || '/auth/v2/remove-password';
  paths.enablePasswords = options.paths.enablePasswords || '/auth/v2/enable-passwords';
  paths.resetPassword = options.paths.resetPassword || '/auth/v2/reset-password';

  return {
    request: host + paths.request,
    authenticateToken: host + paths.authenticateToken,
    authenticate: host + paths.authenticate,
    legacyCreate: host + paths.legacyCreate,
    createUser: host + paths.createUser,
    verify: host + paths.verify,
    logout: host + paths.logout,
    uidExists: host + paths.uidExists,
    checkUsername: host + paths.checkUsername,
    verifyPassword: host + paths.verifyPassword,
    requestResetCode: host + paths.requestResetCode,
    removePassword: host + paths.removePassword,
    enablePasswords: host + paths.enablePasswords,
    resetPassword: host + paths.resetPassword
  };
};

},{}],9:[function(require,module,exports){
var cookiejs = require('cookie-js');

module.exports = function referrals() {
  var referralCookieSettings = {
    // grab only the first two parts of the hostname
    domain: location.hostname.split('.').slice(-2).join('.'),
    path: '/',
    // secure cookie if connection uses TLS
    secure: location.protocol === 'https:',
    // expire in one week
    expires: new Date((Date.now() + 60 * 1000 * 60 * 24 * 7))
  };
  var refValue = /ref=((?:\w|-)+)/.exec(window.location.search);
  var cookieRefValue = cookiejs.parse(document.cookie).webmakerReferral;

  if (refValue) {
    refValue = refValue[1];
    if (cookieRefValue !== refValue) {
      document.cookie = cookiejs.serialize('webmakerReferral', refValue, referralCookieSettings);
      cookieRefValue = refValue;
    }
  }

  return {
    clearReferrerCookie: function () {
      referralCookieSettings.expires = new Date((Date.now() - 10000));
      document.cookie = cookiejs.serialize('webmakerReferral', 'expire', referralCookieSettings);
      referralCookieSettings.expires = new Date((Date.now() + 60 * 1000 * 60 * 24 * 7));
    },
    refValue: function () {
      return cookieRefValue;
    }
  };
};

},{"cookie-js":2}],10:[function(require,module,exports){
var EventEmitter = require('events').EventEmitter;

module.exports = function Emitter() {

  var emitter = new EventEmitter();

  return {
    on: function (event, listener) {
      emitter.addListener(event, listener);
    },
    off: function (event, listener) {
      if (!listener) {
        emitter.removeAllListeners(event);
        return;
      }
      emitter.removeListener(event, listener);
    },
    emit: function () {
      emitter.emit.apply(emitter, arguments);
    }
  };
};

},{"events":3}],11:[function(require,module,exports){
module.exports = {
  JoinController: require('./join.js'),
  SignInController: require('./signin.js'),
  ResetController: require('./reset.js'),
  PersonaController: require('./persona.js'),
  LogoutController: require('./logout.js')
};

},{"./join.js":12,"./logout.js":13,"./persona.js":14,"./reset.js":15,"./signin.js":16}],12:[function(require,module,exports){
var Emitter = require('./emitter.js');
var validation = require('../validation');
var analytics = require('webmaker-analytics');

module.exports = function JoinController(loginApi, showCTA) {

  var emitter = new Emitter();

  var JOIN_ALERTS = {
    agreeToTerms: 'agreeToTerms',
    accountExists: 'accountExists',
    invalidEmail: 'invalidEmail',
    invalidUsername: 'invalidUsername',
    usernameTaken: 'usernameTaken',
    serverError: 'serverError'
  };

  var JOIN_EVENTS = {
    sendingRequest: 'sendingRequest',
    displayAlert: 'displayAlert',
    hideAlert: 'hideAlert',
    displayUsernameInput: 'displayUsernameInput',
    displayEmailInput: 'displayEmailInput',
    displayWelcome: 'displayWelcome'
  };

  function emit() {
    emitter.emit.apply(emitter, arguments);
  }

  function setRequestState(state) {
    emit(JOIN_EVENTS.sendingRequest, state, !state ? true : false);
  }

  function displayAlert(alertId, forceUpdate) {
    emit(JOIN_EVENTS.displayAlert, alertId, forceUpdate);
  }

  function clearAlerts(alerts) {
    alerts = Array.isArray(alerts) ? alerts : [alerts];
    alerts.forEach(function (alert) {
      emit(JOIN_EVENTS.hideAlert, alert);
    });
  }

  function validateEmailCallback(err, resp, body) {
    setRequestState(false);
    if (err || resp.status !== 200) {
      return displayAlert(JOIN_ALERTS.serverError, true);
    }

    if (body.exists) {
      return displayAlert(JOIN_ALERTS.accountExists, true);
    }
  }

  function usernameExistsCallback(err, resp, body) {
    setRequestState(false);

    if (err || resp.status !== 200) {
      return displayAlert(JOIN_ALERTS.serverError, true);
    }

    if (body.exists) {
      return displayAlert(JOIN_ALERTS.usernameTaken, true);
    }

    emit(JOIN_EVENTS.displayUsernameInput);

  }

  return {
    on: function (event, listener) {
      emitter.on(event, listener);
    },
    off: function (event, listener) {
      if (!listener) {
        return emitter.off(event);
      }
      emitter.removeListener(event, listener);
    },
    start: function () {
      emit(JOIN_EVENTS.displayEmailInput);
    },
    validateEmail: function (email) {
      clearAlerts([
        JOIN_ALERTS.invalidEmail,
        JOIN_ALERTS.accountExists,
        JOIN_ALERTS.serverError
      ]);

      var valid = validation.isEmail(email);

      if (!valid) {
        displayAlert(JOIN_ALERTS.invalidEmail);
        return false;
      }

      setRequestState(true);

      loginApi.uidExists(email, validateEmailCallback);
      return true;
    },
    submitEmail: function (agreeToTerms) {
      if (!agreeToTerms) {
        return displayAlert(JOIN_ALERTS.agreeToTerms);
      }
      emit(JOIN_EVENTS.displayUsernameInput);
    },
    agreeToTermsChanged: function (agree) {
      if (agree) {
        emit(JOIN_EVENTS.hideAlert, JOIN_ALERTS.agreeToTerms);
      }
    },
    validateUsername: function (username) {
      clearAlerts([
        JOIN_ALERTS.invalidUsername,
        JOIN_ALERTS.usernameTaken,
        JOIN_ALERTS.serverError
      ]);

      if (!username) {
        return;
      }

      var valid = validation.isUsername(username);

      if (!valid) {
        return displayAlert(JOIN_ALERTS.invalidUsername);
      }

      setRequestState(true);

      loginApi.uidExists(username, usernameExistsCallback);
    },
    submitUser: function (formData) {
      clearAlerts([
        JOIN_ALERTS.agreeToTerms,
        JOIN_ALERTS.serverError,
      ]);

      var lang = 'en-US';
      var html = document.querySelector('html');

      if (html.lang) {
        lang = html.lang;
      }

      setRequestState(true);
      loginApi.createUser({
        email: formData.email,
        username: formData.username,
        mailingList: formData.subscribeToList,
        prefLocale: lang
      }, function (err, resp, body) {
        setRequestState(false);
        if (err || resp.status !== 200) {
          return displayAlert(JOIN_ALERTS.serverError);
        }
        analytics.event('Webmaker New User Created', {
          nonInteraction: true
        });
        analytics.conversionGoal('WebmakerNewUserCreated');
        emit(JOIN_EVENTS.displayWelcome, body.user, showCTA);
      });
    }
  };
};

},{"../validation":17,"./emitter.js":10,"webmaker-analytics":4}],13:[function(require,module,exports){
var Emitter = require('./emitter.js');
var analytics = require('webmaker-analytics');

module.exports = function (loginAPI) {
  var emitter = new Emitter();

  function emit() {
    emitter.emit.apply(emitter, arguments);
  }

  return {
    on: function (event, listener) {
      emitter.on(event, listener);
    },
    off: function (event, listener) {
      emitter.off(event, listener);
    },
    logout: function () {
      loginAPI.logout(function (err, resp, body) {
        if (err || resp.status !== 200) {
          return emit('logoutFailed');
        }
        analytics.event('Webmaker Logout Clicked');
        emit('loggedOut');
      });
    }
  };
};

},{"./emitter.js":10,"webmaker-analytics":4}],14:[function(require,module,exports){
var Emitter = require('./emitter.js');
var analytics = require('webmaker-analytics');

module.exports = function PersonaController(loginApi) {
  var emitter = new Emitter();

  var PERSONA_EVENTS = {
    signedIn: 'signedIn',
    newUser: 'newUser'
  };

  var analyticsLabel = {
    label: 'persona'
  };

  function emit() {
    emitter.emit.apply(emitter, arguments);
  }

  return {
    on: function (event, listener) {
      emitter.on(event, listener);
    },
    off: function (event, listener) {
      emitter.off(event, listener);
    },
    authenticate: function () {
      if (!window.navigator.id) {
        return console.error('No persona found. Did you load include.js?');
      }

      analytics.event('Persona Login Clicked');

      window.navigator.id.get(function (assertion) {
        if (!assertion) {
          analytics.event('Webmaker Login Cancelled', analyticsLabel);
          return;
        }

        loginApi.personaLogin(assertion, function (err, resp, body) {
          if (err || resp.status !== 200) {
            analytics.event('Webmaker Login Failed', analyticsLabel);
            return;
          }

          analytics.event('Webmaker Login Succeeded', analyticsLabel);

          if (body.user) {
            emit(PERSONA_EVENTS.signedIn, body.user);
          } else if (body.email) {
            analytics.event('Webmaker New User Started', analyticsLabel);
            emit(PERSONA_EVENTS.newUser, body.email);
          }
        });
      });
    }
  };
};

},{"./emitter.js":10,"webmaker-analytics":4}],15:[function(require,module,exports){
var Emitter = require('./emitter.js');
var validation = require('../validation');
var analytics = require('webmaker-analytics');

module.exports = function ResetController(loginApi) {
  var emitter = new Emitter();

  var RESET_ALERTS = {
    passwordsMustMatch: 'passwordsMustMatch',
    weakPassword: 'weakPassword',
    serverError: 'serverError'
  };

  var RESET_EVENTS = {
    sendingRequest: 'sendingRequest',
    displayAlert: 'displayAlert',
    hideAlert: 'hideAlert',
    resetSucceeded: 'resetSucceeded',
    passwordCheckResult: 'passwordCheckResult',
    checkConfirmPassword: 'checkConfirmPassword'
  };

  function emit() {
    emitter.emit.apply(emitter, arguments);
  }

  function setRequestState(state) {
    emit(RESET_EVENTS.sendingRequest, state);
  }

  function displayAlert(alertId) {
    emit(RESET_EVENTS.displayAlert, alertId);
  }

  function hideAlert(alertId) {
    emit(RESET_EVENTS.hideAlert, alertId);
  }

  return {
    on: function (event, listener) {
      emitter.on(event, listener);
    },
    off: function (event, listener) {
      emitter.off(event, listener);
    },
    passwordsMatch: function (password, confimValue, blur) {
      if (validation.passwordsMatch(password, confimValue)) {
        hideAlert(RESET_ALERTS.passwordsMustMatch);
        emit(RESET_EVENTS.checkConfirmPassword, true);
      } else {
        if (blur) {
          displayAlert(RESET_ALERTS.passwordsMustMatch);
        }
        emit(RESET_EVENTS.checkConfirmPassword, false);
      }
    },
    checkPasswordStrength: function (password, blur) {
      emit(RESET_EVENTS.passwordCheckResult, validation.checkPasswordStrength(password), blur);
    },
    submitResetRequest: function (uid, resetCode, password) {
      hideAlert(RESET_ALERTS.serverError);
      hideAlert(RESET_ALERTS.weakPassword);
      setRequestState(true);
      loginApi.resetPassword(uid, resetCode, password, function (err, resp, body) {
        setRequestState(false);
        if (err || resp.status !== 200) {
          if (resp.status === 400) {
            return displayAlert(RESET_ALERTS.weakPassword);
          }
          return displayAlert(RESET_ALERTS.serverError);
        }

        analytics.event('Webmaker Password Reset Succeeded');

        emit(RESET_EVENTS.resetSucceeded);
      });
    }
  };
};

},{"../validation":17,"./emitter.js":10,"webmaker-analytics":4}],16:[function(require,module,exports){
var Emitter = require('./emitter.js');
var validation = require('../validation');
var analytics = require('webmaker-analytics');

module.exports = function SignInController(loginApi) {

  var emitter = new Emitter();

  var SIGNIN_ALERTS = {
    paswordReset: 'paswordReset',
    noAccount: 'noAccount',
    invalidUid: 'invalidUid',
    serverError: 'serverError',
    invalidKey: 'invalidKey',
    passwordSigninFailed: 'passwordSigninFailed',
    resetRequestFailed: 'resetRequestFailed'
  };

  var SIGNIN_EVENTS = {
    sendingRequest: 'sendingRequest',
    displayAlert: 'displayAlert',
    hideAlert: 'hideAlert',
    displayEnterUid: 'displayEnterUid',
    displayEnterPassword: 'displayEnterPassword',
    displayEnterKey: 'displayEnterKey',
    displayCheckEmail: 'displayCheckEmail',
    displayResetSent: 'displayResetSent',
    signedIn: 'signedIn'
  };

  function emit() {
    emitter.emit.apply(emitter, arguments);
  }

  function setRequestState(state) {
    emit(SIGNIN_EVENTS.sendingRequest, state);
  }

  function displayAlert(alertId) {
    emit(SIGNIN_EVENTS.displayAlert, alertId);
  }

  function hideAlert(alertId) {
    emit(SIGNIN_EVENTS.hideAlert, alertId);
  }

  function clearAlerts(alerts) {
    alerts = Array.isArray(alerts) ? alerts : [alerts];
    alerts.forEach(function (alertId) {
      hideAlert(alertId);
    });
  }

  return {
    on: function (event, listener) {
      emitter.on(event, listener);
    },
    off: function (event, listener) {
      emitter.off(event, listener);
    },
    start: function () {
      emit(SIGNIN_EVENTS.displayEnterUid);
    },
    submitUid: function (uid, path) {
      clearAlerts([
        SIGNIN_ALERTS.invalidUid,
        SIGNIN_ALERTS.serverError,
        SIGNIN_ALERTS.noAccount
      ]);

      var valid = validation.isEmail(uid) || validation.isUsername(uid);

      if (!valid) {
        return displayAlert(SIGNIN_ALERTS.invalidUid);
      }

      setRequestState(true);
      loginApi.uidExists(uid, function uidExistsCallback(err, resp, body) {
        setRequestState(false);

        if (err || resp.status !== 200) {
          return displayAlert(SIGNIN_ALERTS.serverError);
        }

        var isVerified = body.verified;

        if (!body.exists) {
          return displayAlert(SIGNIN_ALERTS.noAccount);
        }

        if (body.usePasswordLogin) {
          return emit(SIGNIN_EVENTS.displayEnterPassword);
        }

        loginApi.sendLoginKey(uid, path, function sendLoginKeyCallback(err, resp, body) {
          if (err) {
            return displayAlert(SIGNIN_ALERTS.serverError);
          }

          if (isVerified) {
            emit(SIGNIN_EVENTS.displayEnterKey, false);
          } else {
            emit(SIGNIN_EVENTS.displayCheckEmail);
          }
        });
      });
    },
    displayEnterKey: function () {
      emit(SIGNIN_EVENTS.displayEnterKey, true);
    },
    verifyKey: function (uid, key, rememberMe) {
      clearAlerts([
        SIGNIN_ALERTS.serverError,
        SIGNIN_ALERTS.invalidKey
      ]);

      setRequestState(true);
      var validFor = rememberMe ? 'one-year' : '';
      loginApi.verifyKey(uid, key, validFor, function verifyKeyCallback(err, resp, body) {
        setRequestState(false);
        if (err) {
          return displayAlert(SIGNIN_ALERTS.serverError);
        }

        if (!body.user) {
          return displayAlert(SIGNIN_ALERTS.invalidKey);
        }

        analytics.event('Webmaker Login Succeeded', {
          label: 'key'
        });

        emit(SIGNIN_EVENTS.signedIn, body.user);

      });
    },
    verifyPassword: function (uid, password, rememberMe) {
      setRequestState(true);
      var validFor = rememberMe ? 'one-year' : '';
      loginApi.verifyPassword(uid, password, validFor, function verifyPasswordCallback(err, resp, body) {
        setRequestState(false);
        if (err) {
          return displayAlert(SIGNIN_ALERTS.serverError);
        }

        if (!body.user) {
          return displayAlert(SIGNIN_ALERTS.passwordSigninFailed);
        }

        analytics.event('Webmaker Login Succeeded', {
          label: 'password'
        });

        emit(SIGNIN_EVENTS.signedIn, body.user);
      });
    },
    requestReset: function (uid) {
      setRequestState(true);
      loginApi.requestReset(uid, function requestResetCallback(err, resp, body) {
        setRequestState(false);
        if (err) {
          return displayAlert(SIGNIN_ALERTS.serverError);
        }

        if (!body.status) {
          return displayAlert(SIGNIN_ALERTS.resetRequestFailed);
        }

        analytics.event('Webmaker Password Reset Requested');

        emit(SIGNIN_EVENTS.displayResetSent);
      });
    },
    getUidType: function (uid) {
      return validation.isEmail(uid) ? 'email' : validation.isUsername(uid) ? 'username' : null;
    }
  };
};

},{"../validation":17,"./emitter.js":10,"webmaker-analytics":4}],17:[function(require,module,exports){
var usernameRegex = /^[a-zA-Z0-9\-]{1,20}$/,
  emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  containsBothCases = /^.*(?=.*[a-z])(?=.*[A-Z]).*$/,
  containsDigit = /\d/;

var MIN_PASSWORD_LEN = 8;

module.exports = {
  isEmail: function (email) {
    return emailRegex.test(email);
  },
  isUsername: function (username) {
    return usernameRegex.test(username);
  },
  passwordsMatch: function (password, confirmation) {
    return password === confirmation;
  },
  checkPasswordStrength: function (password) {
    if (!password) {
      return false;
    }

    var lengthValid = password.length >= MIN_PASSWORD_LEN,
      caseValid = !! password.match(containsBothCases),
      digitValid = !! password.match(containsDigit);

    return {
      lengthValid: lengthValid,
      caseValid: caseValid,
      digitValid: digitValid
    };
  }
};

},{}]},{},[5]);
