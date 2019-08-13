(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["index"] = factory(require("vue"));
	else
		root["index"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0068":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Utilities
//



function _class(obj) { return Object.prototype.toString.call(obj); }

function isString(obj) { return _class(obj) === '[object String]'; }

var _hasOwnProperty = Object.prototype.hasOwnProperty;

function has(object, key) {
  return _hasOwnProperty.call(object, key);
}

// Merge objects
//
function assign(obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be object');
    }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj;
}

// Remove element from array and put another array at those position.
// Useful for some operations with tokens
function arrayReplaceAt(src, pos, newElements) {
  return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
}

////////////////////////////////////////////////////////////////////////////////

function isValidEntityCode(c) {
  /*eslint no-bitwise:0*/
  // broken sequence
  if (c >= 0xD800 && c <= 0xDFFF) { return false; }
  // never used
  if (c >= 0xFDD0 && c <= 0xFDEF) { return false; }
  if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) { return false; }
  // control codes
  if (c >= 0x00 && c <= 0x08) { return false; }
  if (c === 0x0B) { return false; }
  if (c >= 0x0E && c <= 0x1F) { return false; }
  if (c >= 0x7F && c <= 0x9F) { return false; }
  // out of range
  if (c > 0x10FFFF) { return false; }
  return true;
}

function fromCodePoint(c) {
  /*eslint no-bitwise:0*/
  if (c > 0xffff) {
    c -= 0x10000;
    var surrogate1 = 0xd800 + (c >> 10),
        surrogate2 = 0xdc00 + (c & 0x3ff);

    return String.fromCharCode(surrogate1, surrogate2);
  }
  return String.fromCharCode(c);
}


var UNESCAPE_MD_RE  = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g;
var ENTITY_RE       = /&([a-z#][a-z0-9]{1,31});/gi;
var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + '|' + ENTITY_RE.source, 'gi');

var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;

var entities = __webpack_require__("bd68");

function replaceEntityPattern(match, name) {
  var code = 0;

  if (has(entities, name)) {
    return entities[name];
  }

  if (name.charCodeAt(0) === 0x23/* # */ && DIGITAL_ENTITY_TEST_RE.test(name)) {
    code = name[1].toLowerCase() === 'x' ?
      parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);

    if (isValidEntityCode(code)) {
      return fromCodePoint(code);
    }
  }

  return match;
}

/*function replaceEntities(str) {
  if (str.indexOf('&') < 0) { return str; }

  return str.replace(ENTITY_RE, replaceEntityPattern);
}*/

function unescapeMd(str) {
  if (str.indexOf('\\') < 0) { return str; }
  return str.replace(UNESCAPE_MD_RE, '$1');
}

function unescapeAll(str) {
  if (str.indexOf('\\') < 0 && str.indexOf('&') < 0) { return str; }

  return str.replace(UNESCAPE_ALL_RE, function (match, escaped, entity) {
    if (escaped) { return escaped; }
    return replaceEntityPattern(match, entity);
  });
}

////////////////////////////////////////////////////////////////////////////////

var HTML_ESCAPE_TEST_RE = /[&<>"]/;
var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
var HTML_REPLACEMENTS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};

function replaceUnsafeChar(ch) {
  return HTML_REPLACEMENTS[ch];
}

function escapeHtml(str) {
  if (HTML_ESCAPE_TEST_RE.test(str)) {
    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
  }
  return str;
}

////////////////////////////////////////////////////////////////////////////////

var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;

function escapeRE(str) {
  return str.replace(REGEXP_ESCAPE_RE, '\\$&');
}

////////////////////////////////////////////////////////////////////////////////

function isSpace(code) {
  switch (code) {
    case 0x09:
    case 0x20:
      return true;
  }
  return false;
}

// Zs (unicode class) || [\t\f\v\r\n]
function isWhiteSpace(code) {
  if (code >= 0x2000 && code <= 0x200A) { return true; }
  switch (code) {
    case 0x09: // \t
    case 0x0A: // \n
    case 0x0B: // \v
    case 0x0C: // \f
    case 0x0D: // \r
    case 0x20:
    case 0xA0:
    case 0x1680:
    case 0x202F:
    case 0x205F:
    case 0x3000:
      return true;
  }
  return false;
}

////////////////////////////////////////////////////////////////////////////////

/*eslint-disable max-len*/
var UNICODE_PUNCT_RE = __webpack_require__("7ca0");

// Currently without astral characters support.
function isPunctChar(ch) {
  return UNICODE_PUNCT_RE.test(ch);
}


// Markdown ASCII punctuation characters.
//
// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
// http://spec.commonmark.org/0.15/#ascii-punctuation-character
//
// Don't confuse with unicode punctuation !!! It lacks some chars in ascii range.
//
function isMdAsciiPunct(ch) {
  switch (ch) {
    case 0x21/* ! */:
    case 0x22/* " */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x27/* ' */:
    case 0x28/* ( */:
    case 0x29/* ) */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2C/* , */:
    case 0x2D/* - */:
    case 0x2E/* . */:
    case 0x2F/* / */:
    case 0x3A/* : */:
    case 0x3B/* ; */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x3F/* ? */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7C/* | */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true;
    default:
      return false;
  }
}

// Hepler to unify [reference labels].
//
function normalizeReference(str) {
  // Trim and collapse whitespace
  //
  str = str.trim().replace(/\s+/g, ' ');

  // In node v10 'ẞ'.toLowerCase() === 'Ṿ', which is presumed to be a bug
  // fixed in v12 (couldn't find any details).
  //
  // So treat this one as a special case
  // (remove this when node v10 is no longer supported).
  //
  if ('ẞ'.toLowerCase() === 'Ṿ') {
    str = str.replace(/ẞ/g, 'ß');
  }

  // .toLowerCase().toUpperCase() should get rid of all differences
  // between letter variants.
  //
  // Simple .toLowerCase() doesn't normalize 125 code points correctly,
  // and .toUpperCase doesn't normalize 6 of them (list of exceptions:
  // İ, ϴ, ẞ, Ω, K, Å - those are already uppercased, but have differently
  // uppercased versions).
  //
  // Here's an example showing how it happens. Lets take greek letter omega:
  // uppercase U+0398 (Θ), U+03f4 (ϴ) and lowercase U+03b8 (θ), U+03d1 (ϑ)
  //
  // Unicode entries:
  // 0398;GREEK CAPITAL LETTER THETA;Lu;0;L;;;;;N;;;;03B8;
  // 03B8;GREEK SMALL LETTER THETA;Ll;0;L;;;;;N;;;0398;;0398
  // 03D1;GREEK THETA SYMBOL;Ll;0;L;<compat> 03B8;;;;N;GREEK SMALL LETTER SCRIPT THETA;;0398;;0398
  // 03F4;GREEK CAPITAL THETA SYMBOL;Lu;0;L;<compat> 0398;;;;N;;;;03B8;
  //
  // Case-insensitive comparison should treat all of them as equivalent.
  //
  // But .toLowerCase() doesn't change ϑ (it's already lowercase),
  // and .toUpperCase() doesn't change ϴ (already uppercase).
  //
  // Applying first lower then upper case normalizes any character:
  // '\u0398\u03f4\u03b8\u03d1'.toLowerCase().toUpperCase() === '\u0398\u0398\u0398\u0398'
  //
  // Note: this is equivalent to unicode case folding; unicode normalization
  // is a different step that is not required here.
  //
  // Final result should be uppercased, because it's later stored in an object
  // (this avoid a conflict with Object.prototype members,
  // most notably, `__proto__`)
  //
  return str.toLowerCase().toUpperCase();
}

////////////////////////////////////////////////////////////////////////////////

// Re-export libraries commonly used in both markdown-it and its plugins,
// so plugins won't have to depend on them explicitly, which reduces their
// bundled size (e.g. a browser build).
//
exports.lib                 = {};
exports.lib.mdurl           = __webpack_require__("d8a6");
exports.lib.ucmicro         = __webpack_require__("d5d1");

exports.assign              = assign;
exports.isString            = isString;
exports.has                 = has;
exports.unescapeMd          = unescapeMd;
exports.unescapeAll         = unescapeAll;
exports.isValidEntityCode   = isValidEntityCode;
exports.fromCodePoint       = fromCodePoint;
// exports.replaceEntities     = replaceEntities;
exports.escapeHtml          = escapeHtml;
exports.arrayReplaceAt      = arrayReplaceAt;
exports.isSpace             = isSpace;
exports.isWhiteSpace        = isWhiteSpace;
exports.isMdAsciiPunct      = isMdAsciiPunct;
exports.isPunctChar         = isPunctChar;
exports.escapeRE            = escapeRE;
exports.normalizeReference  = normalizeReference;


/***/ }),

/***/ "0758":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// heading (#, ##, ...)



var isSpace = __webpack_require__("0068").isSpace;


module.exports = function heading(state, startLine, endLine, silent) {
  var ch, level, tmp, token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  ch  = state.src.charCodeAt(pos);

  if (ch !== 0x23/* # */ || pos >= max) { return false; }

  // count heading level
  level = 1;
  ch = state.src.charCodeAt(++pos);
  while (ch === 0x23/* # */ && pos < max && level <= 6) {
    level++;
    ch = state.src.charCodeAt(++pos);
  }

  if (level > 6 || (pos < max && !isSpace(ch))) { return false; }

  if (silent) { return true; }

  // Let's cut tails like '    ###  ' from the end of string

  max = state.skipSpacesBack(max, pos);
  tmp = state.skipCharsBack(max, 0x23, pos); // #
  if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
    max = tmp;
  }

  state.line = startLine + 1;

  token        = state.push('heading_open', 'h' + String(level), 1);
  token.markup = '########'.slice(0, level);
  token.map    = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = state.src.slice(pos, max).trim();
  token.map      = [ startLine, state.line ];
  token.children = [];

  token        = state.push('heading_close', 'h' + String(level), -1);
  token.markup = '########'.slice(0, level);

  return true;
};


/***/ }),

/***/ "08ae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Main parser class




var utils        = __webpack_require__("0068");
var helpers      = __webpack_require__("565b");
var Renderer     = __webpack_require__("7cc2");
var ParserCore   = __webpack_require__("a915");
var ParserBlock  = __webpack_require__("7696");
var ParserInline = __webpack_require__("4cb4");
var LinkifyIt    = __webpack_require__("fbcd");
var mdurl        = __webpack_require__("d8a6");
var punycode     = __webpack_require__("1985");


var config = {
  'default': __webpack_require__("8a31"),
  zero: __webpack_require__("1caa"),
  commonmark: __webpack_require__("428d")
};

////////////////////////////////////////////////////////////////////////////////
//
// This validator can prohibit more than really needed to prevent XSS. It's a
// tradeoff to keep code simple and to be secure by default.
//
// If you need different setup - override validator method as you wish. Or
// replace it with dummy function and use external sanitizer.
//

var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

function validateLink(url) {
  // url should be normalized at this point, and existing entities are decoded
  var str = url.trim().toLowerCase();

  return BAD_PROTO_RE.test(str) ? (GOOD_DATA_RE.test(str) ? true : false) : true;
}

////////////////////////////////////////////////////////////////////////////////


var RECODE_HOSTNAME_FOR = [ 'http:', 'https:', 'mailto:' ];

function normalizeLink(url) {
  var parsed = mdurl.parse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode.toASCII(parsed.hostname);
      } catch (er) { /**/ }
    }
  }

  return mdurl.encode(mdurl.format(parsed));
}

function normalizeLinkText(url) {
  var parsed = mdurl.parse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode.toUnicode(parsed.hostname);
      } catch (er) { /**/ }
    }
  }

  return mdurl.decode(mdurl.format(parsed));
}


/**
 * class MarkdownIt
 *
 * Main parser/renderer class.
 *
 * ##### Usage
 *
 * ```javascript
 * // node.js, "classic" way:
 * var MarkdownIt = require('markdown-it'),
 *     md = new MarkdownIt();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // node.js, the same, but with sugar:
 * var md = require('markdown-it')();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // browser without AMD, added to "window" on script load
 * // Note, there are no dash.
 * var md = window.markdownit();
 * var result = md.render('# markdown-it rulezz!');
 * ```
 *
 * Single line rendering, without paragraph wrap:
 *
 * ```javascript
 * var md = require('markdown-it')();
 * var result = md.renderInline('__markdown-it__ rulezz!');
 * ```
 **/

/**
 * new MarkdownIt([presetName, options])
 * - presetName (String): optional, `commonmark` / `zero`
 * - options (Object)
 *
 * Creates parser instanse with given config. Can be called without `new`.
 *
 * ##### presetName
 *
 * MarkdownIt provides named presets as a convenience to quickly
 * enable/disable active syntax rules and options for common use cases.
 *
 * - ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.js) -
 *   configures parser to strict [CommonMark](http://commonmark.org/) mode.
 * - [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.js) -
 *   similar to GFM, used when no preset name given. Enables all available rules,
 *   but still without html, typographer & autolinker.
 * - ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.js) -
 *   all rules disabled. Useful to quickly setup your config via `.enable()`.
 *   For example, when you need only `bold` and `italic` markup and nothing else.
 *
 * ##### options:
 *
 * - __html__ - `false`. Set `true` to enable HTML tags in source. Be careful!
 *   That's not safe! You may need external sanitizer to protect output from XSS.
 *   It's better to extend features via plugins, instead of enabling HTML.
 * - __xhtmlOut__ - `false`. Set `true` to add '/' when closing single tags
 *   (`<br />`). This is needed only for full CommonMark compatibility. In real
 *   world you will need HTML output.
 * - __breaks__ - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
 * - __langPrefix__ - `language-`. CSS language class prefix for fenced blocks.
 *   Can be useful for external highlighters.
 * - __linkify__ - `false`. Set `true` to autoconvert URL-like text to links.
 * - __typographer__  - `false`. Set `true` to enable [some language-neutral
 *   replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js) +
 *   quotes beautification (smartquotes).
 * - __quotes__ - `“”‘’`, String or Array. Double + single quotes replacement
 *   pairs, when typographer enabled and smartquotes on. For example, you can
 *   use `'«»„“'` for Russian, `'„“‚‘'` for German, and
 *   `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
 * - __highlight__ - `null`. Highlighter function for fenced code blocks.
 *   Highlighter `function (str, lang)` should return escaped HTML. It can also
 *   return empty string if the source was not changed and should be escaped
 *   externaly. If result starts with <pre... internal wrapper is skipped.
 *
 * ##### Example
 *
 * ```javascript
 * // commonmark mode
 * var md = require('markdown-it')('commonmark');
 *
 * // default mode
 * var md = require('markdown-it')();
 *
 * // enable everything
 * var md = require('markdown-it')({
 *   html: true,
 *   linkify: true,
 *   typographer: true
 * });
 * ```
 *
 * ##### Syntax highlighting
 *
 * ```js
 * var hljs = require('highlight.js') // https://highlightjs.org/
 *
 * var md = require('markdown-it')({
 *   highlight: function (str, lang) {
 *     if (lang && hljs.getLanguage(lang)) {
 *       try {
 *         return hljs.highlight(lang, str, true).value;
 *       } catch (__) {}
 *     }
 *
 *     return ''; // use external default escaping
 *   }
 * });
 * ```
 *
 * Or with full wrapper override (if you need assign class to `<pre>`):
 *
 * ```javascript
 * var hljs = require('highlight.js') // https://highlightjs.org/
 *
 * // Actual default values
 * var md = require('markdown-it')({
 *   highlight: function (str, lang) {
 *     if (lang && hljs.getLanguage(lang)) {
 *       try {
 *         return '<pre class="hljs"><code>' +
 *                hljs.highlight(lang, str, true).value +
 *                '</code></pre>';
 *       } catch (__) {}
 *     }
 *
 *     return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
 *   }
 * });
 * ```
 *
 **/
function MarkdownIt(presetName, options) {
  if (!(this instanceof MarkdownIt)) {
    return new MarkdownIt(presetName, options);
  }

  if (!options) {
    if (!utils.isString(presetName)) {
      options = presetName || {};
      presetName = 'default';
    }
  }

  /**
   * MarkdownIt#inline -> ParserInline
   *
   * Instance of [[ParserInline]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.inline = new ParserInline();

  /**
   * MarkdownIt#block -> ParserBlock
   *
   * Instance of [[ParserBlock]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.block = new ParserBlock();

  /**
   * MarkdownIt#core -> Core
   *
   * Instance of [[Core]] chain executor. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.core = new ParserCore();

  /**
   * MarkdownIt#renderer -> Renderer
   *
   * Instance of [[Renderer]]. Use it to modify output look. Or to add rendering
   * rules for new token types, generated by plugins.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * function myToken(tokens, idx, options, env, self) {
   *   //...
   *   return result;
   * };
   *
   * md.renderer.rules['my_token'] = myToken
   * ```
   *
   * See [[Renderer]] docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js).
   **/
  this.renderer = new Renderer();

  /**
   * MarkdownIt#linkify -> LinkifyIt
   *
   * [linkify-it](https://github.com/markdown-it/linkify-it) instance.
   * Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.js)
   * rule.
   **/
  this.linkify = new LinkifyIt();

  /**
   * MarkdownIt#validateLink(url) -> Boolean
   *
   * Link validation function. CommonMark allows too much in links. By default
   * we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas
   * except some embedded image types.
   *
   * You can change this behaviour:
   *
   * ```javascript
   * var md = require('markdown-it')();
   * // enable everything
   * md.validateLink = function () { return true; }
   * ```
   **/
  this.validateLink = validateLink;

  /**
   * MarkdownIt#normalizeLink(url) -> String
   *
   * Function used to encode link url to a machine-readable format,
   * which includes url-encoding, punycode, etc.
   **/
  this.normalizeLink = normalizeLink;

  /**
   * MarkdownIt#normalizeLinkText(url) -> String
   *
   * Function used to decode link url to a human-readable format`
   **/
  this.normalizeLinkText = normalizeLinkText;


  // Expose utils & helpers for easy acces from plugins

  /**
   * MarkdownIt#utils -> utils
   *
   * Assorted utility functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.js).
   **/
  this.utils = utils;

  /**
   * MarkdownIt#helpers -> helpers
   *
   * Link components parser functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).
   **/
  this.helpers = utils.assign({}, helpers);


  this.options = {};
  this.configure(presetName);

  if (options) { this.set(options); }
}


/** chainable
 * MarkdownIt.set(options)
 *
 * Set parser options (in the same format as in constructor). Probably, you
 * will never need it, but you can change options after constructor call.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .set({ html: true, breaks: true })
 *             .set({ typographer, true });
 * ```
 *
 * __Note:__ To achieve the best possible performance, don't modify a
 * `markdown-it` instance options on the fly. If you need multiple configurations
 * it's best to create multiple instances and initialize each with separate
 * config.
 **/
MarkdownIt.prototype.set = function (options) {
  utils.assign(this.options, options);
  return this;
};


/** chainable, internal
 * MarkdownIt.configure(presets)
 *
 * Batch load of all options and compenent settings. This is internal method,
 * and you probably will not need it. But if you with - see available presets
 * and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)
 *
 * We strongly recommend to use presets instead of direct config loads. That
 * will give better compatibility with next versions.
 **/
MarkdownIt.prototype.configure = function (presets) {
  var self = this, presetName;

  if (utils.isString(presets)) {
    presetName = presets;
    presets = config[presetName];
    if (!presets) { throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name'); }
  }

  if (!presets) { throw new Error('Wrong `markdown-it` preset, can\'t be empty'); }

  if (presets.options) { self.set(presets.options); }

  if (presets.components) {
    Object.keys(presets.components).forEach(function (name) {
      if (presets.components[name].rules) {
        self[name].ruler.enableOnly(presets.components[name].rules);
      }
      if (presets.components[name].rules2) {
        self[name].ruler2.enableOnly(presets.components[name].rules2);
      }
    });
  }
  return this;
};


/** chainable
 * MarkdownIt.enable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to enable
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable list or rules. It will automatically find appropriate components,
 * containing rules with given names. If rule not found, and `ignoreInvalid`
 * not set - throws exception.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .enable(['sub', 'sup'])
 *             .disable('smartquotes');
 * ```
 **/
MarkdownIt.prototype.enable = function (list, ignoreInvalid) {
  var result = [];

  if (!Array.isArray(list)) { list = [ list ]; }

  [ 'core', 'block', 'inline' ].forEach(function (chain) {
    result = result.concat(this[chain].ruler.enable(list, true));
  }, this);

  result = result.concat(this.inline.ruler2.enable(list, true));

  var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to enable unknown rule(s): ' + missed);
  }

  return this;
};


/** chainable
 * MarkdownIt.disable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * The same as [[MarkdownIt.enable]], but turn specified rules off.
 **/
MarkdownIt.prototype.disable = function (list, ignoreInvalid) {
  var result = [];

  if (!Array.isArray(list)) { list = [ list ]; }

  [ 'core', 'block', 'inline' ].forEach(function (chain) {
    result = result.concat(this[chain].ruler.disable(list, true));
  }, this);

  result = result.concat(this.inline.ruler2.disable(list, true));

  var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to disable unknown rule(s): ' + missed);
  }
  return this;
};


/** chainable
 * MarkdownIt.use(plugin, params)
 *
 * Load specified plugin with given params into current parser instance.
 * It's just a sugar to call `plugin(md, params)` with curring.
 *
 * ##### Example
 *
 * ```javascript
 * var iterator = require('markdown-it-for-inline');
 * var md = require('markdown-it')()
 *             .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
 *               tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
 *             });
 * ```
 **/
MarkdownIt.prototype.use = function (plugin /*, params, ... */) {
  var args = [ this ].concat(Array.prototype.slice.call(arguments, 1));
  plugin.apply(plugin, args);
  return this;
};


/** internal
 * MarkdownIt.parse(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Parse input string and returns list of block tokens (special token type
 * "inline" will contain list of inline tokens). You should not call this
 * method directly, until you write custom renderer (for example, to produce
 * AST).
 *
 * `env` is used to pass data between "distributed" rules and return additional
 * metadata like reference info, needed for the renderer. It also can be used to
 * inject data in specific cases. Usually, you will be ok to pass `{}`,
 * and then pass updated object to renderer.
 **/
MarkdownIt.prototype.parse = function (src, env) {
  if (typeof src !== 'string') {
    throw new Error('Input data should be a String');
  }

  var state = new this.core.State(src, this, env);

  this.core.process(state);

  return state.tokens;
};


/**
 * MarkdownIt.render(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Render markdown string into html. It does all magic for you :).
 *
 * `env` can be used to inject additional metadata (`{}` by default).
 * But you will not need it with high probability. See also comment
 * in [[MarkdownIt.parse]].
 **/
MarkdownIt.prototype.render = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parse(src, env), this.options, env);
};


/** internal
 * MarkdownIt.parseInline(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * The same as [[MarkdownIt.parse]] but skip all block rules. It returns the
 * block tokens list with the single `inline` element, containing parsed inline
 * tokens in `children` property. Also updates `env` object.
 **/
MarkdownIt.prototype.parseInline = function (src, env) {
  var state = new this.core.State(src, this, env);

  state.inlineMode = true;
  this.core.process(state);

  return state.tokens;
};


/**
 * MarkdownIt.renderInline(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Similar to [[MarkdownIt.render]] but for single paragraph content. Result
 * will NOT be wrapped into `<p>` tags.
 **/
MarkdownIt.prototype.renderInline = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parseInline(src, env), this.options, env);
};


module.exports = MarkdownIt;


/***/ }),

/***/ "096b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Token class




/**
 * class Token
 **/

/**
 * new Token(type, tag, nesting)
 *
 * Create new token and fill passed properties.
 **/
function Token(type, tag, nesting) {
  /**
   * Token#type -> String
   *
   * Type of the token (string, e.g. "paragraph_open")
   **/
  this.type     = type;

  /**
   * Token#tag -> String
   *
   * html tag name, e.g. "p"
   **/
  this.tag      = tag;

  /**
   * Token#attrs -> Array
   *
   * Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
   **/
  this.attrs    = null;

  /**
   * Token#map -> Array
   *
   * Source map info. Format: `[ line_begin, line_end ]`
   **/
  this.map      = null;

  /**
   * Token#nesting -> Number
   *
   * Level change (number in {-1, 0, 1} set), where:
   *
   * -  `1` means the tag is opening
   * -  `0` means the tag is self-closing
   * - `-1` means the tag is closing
   **/
  this.nesting  = nesting;

  /**
   * Token#level -> Number
   *
   * nesting level, the same as `state.level`
   **/
  this.level    = 0;

  /**
   * Token#children -> Array
   *
   * An array of child nodes (inline and img tokens)
   **/
  this.children = null;

  /**
   * Token#content -> String
   *
   * In a case of self-closing tag (code, html, fence, etc.),
   * it has contents of this tag.
   **/
  this.content  = '';

  /**
   * Token#markup -> String
   *
   * '*' or '_' for emphasis, fence string for fence, etc.
   **/
  this.markup   = '';

  /**
   * Token#info -> String
   *
   * fence infostring
   **/
  this.info     = '';

  /**
   * Token#meta -> Object
   *
   * A place for plugins to store an arbitrary data
   **/
  this.meta     = null;

  /**
   * Token#block -> Boolean
   *
   * True for block-level tokens, false for inline tokens.
   * Used in renderer to calculate line breaks
   **/
  this.block    = false;

  /**
   * Token#hidden -> Boolean
   *
   * If it's true, ignore this element when rendering. Used for tight lists
   * to hide paragraphs.
   **/
  this.hidden   = false;
}


/**
 * Token.attrIndex(name) -> Number
 *
 * Search attribute index by name.
 **/
Token.prototype.attrIndex = function attrIndex(name) {
  var attrs, i, len;

  if (!this.attrs) { return -1; }

  attrs = this.attrs;

  for (i = 0, len = attrs.length; i < len; i++) {
    if (attrs[i][0] === name) { return i; }
  }
  return -1;
};


/**
 * Token.attrPush(attrData)
 *
 * Add `[ name, value ]` attribute to list. Init attrs if necessary
 **/
Token.prototype.attrPush = function attrPush(attrData) {
  if (this.attrs) {
    this.attrs.push(attrData);
  } else {
    this.attrs = [ attrData ];
  }
};


/**
 * Token.attrSet(name, value)
 *
 * Set `name` attribute to `value`. Override old value if exists.
 **/
Token.prototype.attrSet = function attrSet(name, value) {
  var idx = this.attrIndex(name),
      attrData = [ name, value ];

  if (idx < 0) {
    this.attrPush(attrData);
  } else {
    this.attrs[idx] = attrData;
  }
};


/**
 * Token.attrGet(name)
 *
 * Get the value of attribute `name`, or null if it does not exist.
 **/
Token.prototype.attrGet = function attrGet(name) {
  var idx = this.attrIndex(name), value = null;
  if (idx >= 0) {
    value = this.attrs[idx][1];
  }
  return value;
};


/**
 * Token.attrJoin(name, value)
 *
 * Join value to existing attribute via space. Or create new attribute if not
 * exists. Useful to operate with token classes.
 **/
Token.prototype.attrJoin = function attrJoin(name, value) {
  var idx = this.attrIndex(name);

  if (idx < 0) {
    this.attrPush([ name, value ]);
  } else {
    this.attrs[idx][1] = this.attrs[idx][1] + ' ' + value;
  }
};


module.exports = Token;


/***/ }),

/***/ "097b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Inline parser state




var Token          = __webpack_require__("096b");
var isWhiteSpace   = __webpack_require__("0068").isWhiteSpace;
var isPunctChar    = __webpack_require__("0068").isPunctChar;
var isMdAsciiPunct = __webpack_require__("0068").isMdAsciiPunct;


function StateInline(src, md, env, outTokens) {
  this.src = src;
  this.env = env;
  this.md = md;
  this.tokens = outTokens;

  this.pos = 0;
  this.posMax = this.src.length;
  this.level = 0;
  this.pending = '';
  this.pendingLevel = 0;

  this.cache = {};        // Stores { start: end } pairs. Useful for backtrack
                          // optimization of pairs parse (emphasis, strikes).

  this.delimiters = [];   // Emphasis-like delimiters
}


// Flush pending text
//
StateInline.prototype.pushPending = function () {
  var token = new Token('text', '', 0);
  token.content = this.pending;
  token.level = this.pendingLevel;
  this.tokens.push(token);
  this.pending = '';
  return token;
};


// Push new token to "stream".
// If pending text exists - flush it as text token
//
StateInline.prototype.push = function (type, tag, nesting) {
  if (this.pending) {
    this.pushPending();
  }

  var token = new Token(type, tag, nesting);

  if (nesting < 0) this.level--; // closing tag
  token.level = this.level;
  if (nesting > 0) this.level++; // opening tag

  this.pendingLevel = this.level;
  this.tokens.push(token);
  return token;
};


// Scan a sequence of emphasis-like markers, and determine whether
// it can start an emphasis sequence or end an emphasis sequence.
//
//  - start - position to scan from (it should point at a valid marker);
//  - canSplitWord - determine if these markers can be found inside a word
//
StateInline.prototype.scanDelims = function (start, canSplitWord) {
  var pos = start, lastChar, nextChar, count, can_open, can_close,
      isLastWhiteSpace, isLastPunctChar,
      isNextWhiteSpace, isNextPunctChar,
      left_flanking = true,
      right_flanking = true,
      max = this.posMax,
      marker = this.src.charCodeAt(start);

  // treat beginning of the line as a whitespace
  lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 0x20;

  while (pos < max && this.src.charCodeAt(pos) === marker) { pos++; }

  count = pos - start;

  // treat end of the line as a whitespace
  nextChar = pos < max ? this.src.charCodeAt(pos) : 0x20;

  isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
  isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

  isLastWhiteSpace = isWhiteSpace(lastChar);
  isNextWhiteSpace = isWhiteSpace(nextChar);

  if (isNextWhiteSpace) {
    left_flanking = false;
  } else if (isNextPunctChar) {
    if (!(isLastWhiteSpace || isLastPunctChar)) {
      left_flanking = false;
    }
  }

  if (isLastWhiteSpace) {
    right_flanking = false;
  } else if (isLastPunctChar) {
    if (!(isNextWhiteSpace || isNextPunctChar)) {
      right_flanking = false;
    }
  }

  if (!canSplitWord) {
    can_open  = left_flanking  && (!right_flanking || isLastPunctChar);
    can_close = right_flanking && (!left_flanking  || isNextPunctChar);
  } else {
    can_open  = left_flanking;
    can_close = right_flanking;
  }

  return {
    can_open:  can_open,
    can_close: can_close,
    length:    count
  };
};


// re-export Token class to use in block rules
StateInline.prototype.Token = Token;


module.exports = StateInline;


/***/ }),

/***/ "1985":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("62e4")(module), __webpack_require__("c8ba")))

/***/ }),

/***/ "199e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// lheading (---, ===)




module.exports = function lheading(state, startLine, endLine/*, silent*/) {
  var content, terminate, i, l, token, pos, max, level, marker,
      nextLine = startLine + 1, oldParentType,
      terminatorRules = state.md.block.ruler.getRules('paragraph');

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  oldParentType = state.parentType;
  state.parentType = 'paragraph'; // use paragraph to match terminatorRules

  // jump line-by-line until empty one or EOF
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

    //
    // Check for underline in setext header
    //
    if (state.sCount[nextLine] >= state.blkIndent) {
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (pos < max) {
        marker = state.src.charCodeAt(pos);

        if (marker === 0x2D/* - */ || marker === 0x3D/* = */) {
          pos = state.skipChars(pos, marker);
          pos = state.skipSpaces(pos);

          if (pos >= max) {
            level = (marker === 0x3D/* = */ ? 1 : 2);
            break;
          }
        }
      }
    }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue; }

    // Some tags can terminate paragraph without empty line.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }
  }

  if (!level) {
    // Didn't find valid underline
    return false;
  }

  content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

  state.line = nextLine + 1;

  token          = state.push('heading_open', 'h' + String(level), 1);
  token.markup   = String.fromCharCode(marker);
  token.map      = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = content;
  token.map      = [ startLine, state.line - 1 ];
  token.children = [];

  token          = state.push('heading_close', 'h' + String(level), -1);
  token.markup   = String.fromCharCode(marker);

  state.parentType = oldParentType;

  return true;
};


/***/ }),

/***/ "1c78":
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var n={false:"push",true:"unshift"},e=Object.prototype.hasOwnProperty,r=function(n,t){t=Object.assign({},r.defaults,t),n.core.ruler.push("anchor",function(n){var r,i={},u=n.tokens,o=Array.isArray(t.level)?(r=t.level,function(n){return r.includes(n)}):function(n){return function(e){return e>=n}}(t.level);u.filter(function(n){return"heading_open"===n.type}).filter(function(n){return o(Number(n.tag.substr(1)))}).forEach(function(r){var o=u[u.indexOf(r)+1].children.filter(function(n){return"text"===n.type||"code_inline"===n.type}).reduce(function(n,e){return n+e.content},""),c=r.attrGet("id");null==c&&(c=function(n,r){for(var t=n,i=2;e.call(r,t);)t=n+"-"+i++;return r[t]=!0,t}(t.slugify(o),i),r.attrPush(["id",c])),t.permalink&&t.renderPermalink(c,t,n,u.indexOf(r)),t.callback&&t.callback(r,{slug:c,title:o})})})};r.defaults={level:1,slugify:function(n){return encodeURIComponent(String(n).trim().toLowerCase().replace(/\s+/g,"-"))},permalink:!1,renderPermalink:function(e,r,t,i){var u,o=[Object.assign(new t.Token("link_open","a",1),{attrs:[["class",r.permalinkClass],["href",r.permalinkHref(e,t)],["aria-hidden","true"]]}),Object.assign(new t.Token("html_block","",0),{content:r.permalinkSymbol}),new t.Token("link_close","a",-1)];r.permalinkSpace&&o[n[!r.permalinkBefore]](Object.assign(new t.Token("text","",0),{content:" "})),(u=t.tokens[i+1].children)[n[r.permalinkBefore]].apply(u,o)},permalinkClass:"header-anchor",permalinkSpace:!0,permalinkSymbol:"¶",permalinkBefore:!1,permalinkHref:function(n){return"#"+n}};/* harmony default export */ __webpack_exports__["default"] = (r);
//# sourceMappingURL=markdownItAnchor.mjs.map


/***/ }),

/***/ "1caa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// "Zero" preset, with nothing enabled. Useful for manual configuring of simple
// modes. For example, to parse bold/italic only.




module.exports = {
  options: {
    html:         false,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // autoconvert URL-like texts to links

    // Enable some language-neutral replacements + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting:   20            // Internal protection, recursion limit
  },

  components: {

    core: {
      rules: [
        'normalize',
        'block',
        'inline'
      ]
    },

    block: {
      rules: [
        'paragraph'
      ]
    },

    inline: {
      rules: [
        'text'
      ],
      rules2: [
        'balance_pairs',
        'text_collapse'
      ]
    }
  }
};


/***/ }),

/***/ "2085":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Clean up tokens after emphasis and strikethrough postprocessing:
// merge adjacent text nodes into one and re-calculate all token levels
//
// This is necessary because initially emphasis delimiter markers (*, _, ~)
// are treated as their own separate text tokens. Then emphasis rule either
// leaves them as text (needed to merge with adjacent text) or turns them
// into opening/closing tags (which messes up levels inside).
//



module.exports = function text_collapse(state) {
  var curr, last,
      level = 0,
      tokens = state.tokens,
      max = state.tokens.length;

  for (curr = last = 0; curr < max; curr++) {
    // re-calculate levels after emphasis/strikethrough turns some text nodes
    // into opening/closing tags
    if (tokens[curr].nesting < 0) level--; // closing tag
    tokens[curr].level = level;
    if (tokens[curr].nesting > 0) level++; // opening tag

    if (tokens[curr].type === 'text' &&
        curr + 1 < max &&
        tokens[curr + 1].type === 'text') {

      // collapse two adjacent text nodes
      tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
    } else {
      if (curr !== last) { tokens[last] = tokens[curr]; }

      last++;
    }
  }

  if (curr !== last) {
    tokens.length = last;
  }
};


/***/ }),

/***/ "20f6":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "24ef":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleCard_vue_vue_type_style_index_0_id_4ffc4abd_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("acaf");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleCard_vue_vue_type_style_index_0_id_4ffc4abd_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleCard_vue_vue_type_style_index_0_id_4ffc4abd_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleCard_vue_vue_type_style_index_0_id_4ffc4abd_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "25a8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "269a":
/***/ (function(module, exports) {

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function installDirectives (component, directives) {
  var options = typeof component.exports === 'function'
    ? component.exports.extendOptions
    : component.options

  if (typeof component.exports === 'function') {
    options.directives = component.exports.options.directives
  }

  options.directives = options.directives || {}

  for (var i in directives) {
    options.directives[i] = options.directives[i] || directives[i]
  }
}


/***/ }),

/***/ "28ec":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process autolinks '<protocol:...>'




/*eslint max-len:0*/
var EMAIL_RE    = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
var AUTOLINK_RE = /^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;


module.exports = function autolink(state, silent) {
  var tail, linkMatch, emailMatch, url, fullUrl, token,
      pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

  tail = state.src.slice(pos);

  if (tail.indexOf('>') < 0) { return false; }

  if (AUTOLINK_RE.test(tail)) {
    linkMatch = tail.match(AUTOLINK_RE);

    url = linkMatch[0].slice(1, -1);
    fullUrl = state.md.normalizeLink(url);
    if (!state.md.validateLink(fullUrl)) { return false; }

    if (!silent) {
      token         = state.push('link_open', 'a', 1);
      token.attrs   = [ [ 'href', fullUrl ] ];
      token.markup  = 'autolink';
      token.info    = 'auto';

      token         = state.push('text', '', 0);
      token.content = state.md.normalizeLinkText(url);

      token         = state.push('link_close', 'a', -1);
      token.markup  = 'autolink';
      token.info    = 'auto';
    }

    state.pos += linkMatch[0].length;
    return true;
  }

  if (EMAIL_RE.test(tail)) {
    emailMatch = tail.match(EMAIL_RE);

    url = emailMatch[0].slice(1, -1);
    fullUrl = state.md.normalizeLink('mailto:' + url);
    if (!state.md.validateLink(fullUrl)) { return false; }

    if (!silent) {
      token         = state.push('link_open', 'a', 1);
      token.attrs   = [ [ 'href', fullUrl ] ];
      token.markup  = 'autolink';
      token.info    = 'auto';

      token         = state.push('text', '', 0);
      token.content = state.md.normalizeLinkText(url);

      token         = state.push('link_close', 'a', -1);
      token.markup  = 'autolink';
      token.info    = 'auto';
    }

    state.pos += emailMatch[0].length;
    return true;
  }

  return false;
};


/***/ }),

/***/ "3408":
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = function block(state) {
  var token;

  if (state.inlineMode) {
    token          = new state.Token('inline', '', 0);
    token.content  = state.src;
    token.map      = [ 0, 1 ];
    token.children = [];
    state.tokens.push(token);
  } else {
    state.md.block.parse(state.src, state.md, state.env, state.tokens);
  }
};


/***/ }),

/***/ "368e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "36a7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3a9b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleTOC_vue_vue_type_style_index_0_id_7c13fb44_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5d12");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleTOC_vue_vue_type_style_index_0_id_7c13fb44_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleTOC_vue_vue_type_style_index_0_id_7c13fb44_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleTOC_vue_vue_type_style_index_0_id_7c13fb44_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "3ad0":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3c93":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4236":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Proceess '\n'



var isSpace = __webpack_require__("0068").isSpace;


module.exports = function newline(state, silent) {
  var pmax, max, pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x0A/* \n */) { return false; }

  pmax = state.pending.length - 1;
  max = state.posMax;

  // '  \n' -> hardbreak
  // Lookup in pending chars is bad practice! Don't copy to other rules!
  // Pending string is stored in concat mode, indexed lookups will cause
  // convertion to flat mode.
  if (!silent) {
    if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
      if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
        state.pending = state.pending.replace(/ +$/, '');
        state.push('hardbreak', 'br', 0);
      } else {
        state.pending = state.pending.slice(0, -1);
        state.push('softbreak', 'br', 0);
      }

    } else {
      state.push('softbreak', 'br', 0);
    }
  }

  pos++;

  // skip heading spaces for next line
  while (pos < max && isSpace(state.src.charCodeAt(pos))) { pos++; }

  state.pos = pos;
  return true;
};


/***/ }),

/***/ "428d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Commonmark default options




module.exports = {
  options: {
    html:         true,         // Enable HTML tags in source
    xhtmlOut:     true,         // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // autoconvert URL-like texts to links

    // Enable some language-neutral replacements + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting:   20            // Internal protection, recursion limit
  },

  components: {

    core: {
      rules: [
        'normalize',
        'block',
        'inline'
      ]
    },

    block: {
      rules: [
        'blockquote',
        'code',
        'fence',
        'heading',
        'hr',
        'html_block',
        'lheading',
        'list',
        'reference',
        'paragraph'
      ]
    },

    inline: {
      rules: [
        'autolink',
        'backticks',
        'emphasis',
        'entity',
        'escape',
        'html_inline',
        'image',
        'link',
        'newline',
        'text'
      ],
      rules2: [
        'balance_pairs',
        'emphasis',
        'text_collapse'
      ]
    }
  }
};


/***/ }),

/***/ "43e0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";




module.exports = function format(url) {
  var result = '';

  result += url.protocol || '';
  result += url.slashes ? '//' : '';
  result += url.auth ? url.auth + '@' : '';

  if (url.hostname && url.hostname.indexOf(':') !== -1) {
    // ipv6 address
    result += '[' + url.hostname + ']';
  } else {
    result += url.hostname || '';
  }

  result += url.port ? ':' + url.port : '';
  result += url.pathname || '';
  result += url.search || '';
  result += url.hash || '';

  return result;
};


/***/ }),

/***/ "44a8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Paragraph




module.exports = function paragraph(state, startLine/*, endLine*/) {
  var content, terminate, i, l, token, oldParentType,
      nextLine = startLine + 1,
      terminatorRules = state.md.block.ruler.getRules('paragraph'),
      endLine = state.lineMax;

  oldParentType = state.parentType;
  state.parentType = 'paragraph';

  // jump line-by-line until empty one or EOF
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue; }

    // Some tags can terminate paragraph without empty line.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }
  }

  content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

  state.line = nextLine;

  token          = state.push('paragraph_open', 'p', 1);
  token.map      = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = content;
  token.map      = [ startLine, state.line ];
  token.children = [];

  token          = state.push('paragraph_close', 'p', -1);

  state.parentType = oldParentType;

  return true;
};


/***/ }),

/***/ "4804":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4883":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * class Ruler
 *
 * Helper class, used by [[MarkdownIt#core]], [[MarkdownIt#block]] and
 * [[MarkdownIt#inline]] to manage sequences of functions (rules):
 *
 * - keep rules in defined order
 * - assign the name to each rule
 * - enable/disable rules
 * - add/replace rules
 * - allow assign rules to additional named chains (in the same)
 * - cacheing lists of active rules
 *
 * You will not need use this class directly until write plugins. For simple
 * rules control use [[MarkdownIt.disable]], [[MarkdownIt.enable]] and
 * [[MarkdownIt.use]].
 **/



/**
 * new Ruler()
 **/
function Ruler() {
  // List of added rules. Each element is:
  //
  // {
  //   name: XXX,
  //   enabled: Boolean,
  //   fn: Function(),
  //   alt: [ name2, name3 ]
  // }
  //
  this.__rules__ = [];

  // Cached rule chains.
  //
  // First level - chain name, '' for default.
  // Second level - diginal anchor for fast filtering by charcodes.
  //
  this.__cache__ = null;
}

////////////////////////////////////////////////////////////////////////////////
// Helper methods, should not be used directly


// Find rule index by name
//
Ruler.prototype.__find__ = function (name) {
  for (var i = 0; i < this.__rules__.length; i++) {
    if (this.__rules__[i].name === name) {
      return i;
    }
  }
  return -1;
};


// Build rules lookup cache
//
Ruler.prototype.__compile__ = function () {
  var self = this;
  var chains = [ '' ];

  // collect unique names
  self.__rules__.forEach(function (rule) {
    if (!rule.enabled) { return; }

    rule.alt.forEach(function (altName) {
      if (chains.indexOf(altName) < 0) {
        chains.push(altName);
      }
    });
  });

  self.__cache__ = {};

  chains.forEach(function (chain) {
    self.__cache__[chain] = [];
    self.__rules__.forEach(function (rule) {
      if (!rule.enabled) { return; }

      if (chain && rule.alt.indexOf(chain) < 0) { return; }

      self.__cache__[chain].push(rule.fn);
    });
  });
};


/**
 * Ruler.at(name, fn [, options])
 * - name (String): rule name to replace.
 * - fn (Function): new rule function.
 * - options (Object): new rule options (not mandatory).
 *
 * Replace rule by name with new function & options. Throws error if name not
 * found.
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * Replace existing typographer replacement rule with new one:
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.at('replacements', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.at = function (name, fn, options) {
  var index = this.__find__(name);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + name); }

  this.__rules__[index].fn = fn;
  this.__rules__[index].alt = opt.alt || [];
  this.__cache__ = null;
};


/**
 * Ruler.before(beforeName, ruleName, fn [, options])
 * - beforeName (String): new rule will be added before this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain before one with given name. See also
 * [[Ruler.after]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.before = function (beforeName, ruleName, fn, options) {
  var index = this.__find__(beforeName);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + beforeName); }

  this.__rules__.splice(index, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};


/**
 * Ruler.after(afterName, ruleName, fn [, options])
 * - afterName (String): new rule will be added after this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain after one with given name. See also
 * [[Ruler.before]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.inline.ruler.after('text', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.after = function (afterName, ruleName, fn, options) {
  var index = this.__find__(afterName);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + afterName); }

  this.__rules__.splice(index + 1, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};

/**
 * Ruler.push(ruleName, fn [, options])
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Push new rule to the end of chain. See also
 * [[Ruler.before]], [[Ruler.after]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.push('my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.push = function (ruleName, fn, options) {
  var opt = options || {};

  this.__rules__.push({
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};


/**
 * Ruler.enable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to enable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.disable]], [[Ruler.enableOnly]].
 **/
Ruler.prototype.enable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  var result = [];

  // Search by name and enable
  list.forEach(function (name) {
    var idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) { return; }
      throw new Error('Rules manager: invalid rule name ' + name);
    }
    this.__rules__[idx].enabled = true;
    result.push(name);
  }, this);

  this.__cache__ = null;
  return result;
};


/**
 * Ruler.enableOnly(list [, ignoreInvalid])
 * - list (String|Array): list of rule names to enable (whitelist).
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names, and disable everything else. If any rule name
 * not found - throw Error. Errors can be disabled by second param.
 *
 * See also [[Ruler.disable]], [[Ruler.enable]].
 **/
Ruler.prototype.enableOnly = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  this.__rules__.forEach(function (rule) { rule.enabled = false; });

  this.enable(list, ignoreInvalid);
};


/**
 * Ruler.disable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Disable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.enable]], [[Ruler.enableOnly]].
 **/
Ruler.prototype.disable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  var result = [];

  // Search by name and disable
  list.forEach(function (name) {
    var idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) { return; }
      throw new Error('Rules manager: invalid rule name ' + name);
    }
    this.__rules__[idx].enabled = false;
    result.push(name);
  }, this);

  this.__cache__ = null;
  return result;
};


/**
 * Ruler.getRules(chainName) -> Array
 *
 * Return array of active functions (rules) for given chain name. It analyzes
 * rules configuration, compiles caches if not exists and returns result.
 *
 * Default chain name is `''` (empty string). It can't be skipped. That's
 * done intentionally, to keep signature monomorphic for high speed.
 **/
Ruler.prototype.getRules = function (chainName) {
  if (this.__cache__ === null) {
    this.__compile__();
  }

  // Chain can be empty, if rules disabled. But we still have to return Array.
  return this.__cache__[chainName] || [];
};

module.exports = Ruler;


/***/ }),

/***/ "4a94":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Parse backticks



module.exports = function backtick(state, silent) {
  var start, max, marker, matchStart, matchEnd, token,
      pos = state.pos,
      ch = state.src.charCodeAt(pos);

  if (ch !== 0x60/* ` */) { return false; }

  start = pos;
  pos++;
  max = state.posMax;

  while (pos < max && state.src.charCodeAt(pos) === 0x60/* ` */) { pos++; }

  marker = state.src.slice(start, pos);

  matchStart = matchEnd = pos;

  while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
    matchEnd = matchStart + 1;

    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60/* ` */) { matchEnd++; }

    if (matchEnd - matchStart === marker.length) {
      if (!silent) {
        token         = state.push('code_inline', 'code', 0);
        token.markup  = marker;
        token.content = state.src.slice(pos, matchStart)
          .replace(/\n/g, ' ')
          .replace(/^ (.+) $/, '$1');
      }
      state.pos = matchEnd;
      return true;
    }
  }

  if (!silent) { state.pending += marker; }
  state.pos += marker.length;
  return true;
};


/***/ }),

/***/ "4b3e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Lists



var isSpace = __webpack_require__("0068").isSpace;


// Search `[-+*][\n ]`, returns next pos after marker on success
// or -1 on fail.
function skipBulletListMarker(state, startLine) {
  var marker, pos, max, ch;

  pos = state.bMarks[startLine] + state.tShift[startLine];
  max = state.eMarks[startLine];

  marker = state.src.charCodeAt(pos++);
  // Check bullet
  if (marker !== 0x2A/* * */ &&
      marker !== 0x2D/* - */ &&
      marker !== 0x2B/* + */) {
    return -1;
  }

  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (!isSpace(ch)) {
      // " -test " - is not a list item
      return -1;
    }
  }

  return pos;
}

// Search `\d+[.)][\n ]`, returns next pos after marker on success
// or -1 on fail.
function skipOrderedListMarker(state, startLine) {
  var ch,
      start = state.bMarks[startLine] + state.tShift[startLine],
      pos = start,
      max = state.eMarks[startLine];

  // List marker should have at least 2 chars (digit + dot)
  if (pos + 1 >= max) { return -1; }

  ch = state.src.charCodeAt(pos++);

  if (ch < 0x30/* 0 */ || ch > 0x39/* 9 */) { return -1; }

  for (;;) {
    // EOL -> fail
    if (pos >= max) { return -1; }

    ch = state.src.charCodeAt(pos++);

    if (ch >= 0x30/* 0 */ && ch <= 0x39/* 9 */) {

      // List marker should have no more than 9 digits
      // (prevents integer overflow in browsers)
      if (pos - start >= 10) { return -1; }

      continue;
    }

    // found valid marker
    if (ch === 0x29/* ) */ || ch === 0x2e/* . */) {
      break;
    }

    return -1;
  }


  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (!isSpace(ch)) {
      // " 1.test " - is not a list item
      return -1;
    }
  }
  return pos;
}

function markTightParagraphs(state, idx) {
  var i, l,
      level = state.level + 2;

  for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
    if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
      state.tokens[i + 2].hidden = true;
      state.tokens[i].hidden = true;
      i += 2;
    }
  }
}


module.exports = function list(state, startLine, endLine, silent) {
  var ch,
      contentStart,
      i,
      indent,
      indentAfterMarker,
      initial,
      isOrdered,
      itemLines,
      l,
      listLines,
      listTokIdx,
      markerCharCode,
      markerValue,
      max,
      nextLine,
      offset,
      oldListIndent,
      oldParentType,
      oldSCount,
      oldTShift,
      oldTight,
      pos,
      posAfterMarker,
      prevEmptyEnd,
      start,
      terminate,
      terminatorRules,
      token,
      isTerminatingParagraph = false,
      tight = true;

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  // Special case:
  //  - item 1
  //   - item 2
  //    - item 3
  //     - item 4
  //      - this one is a paragraph continuation
  if (state.listIndent >= 0 &&
      state.sCount[startLine] - state.listIndent >= 4 &&
      state.sCount[startLine] < state.blkIndent) {
    return false;
  }

  // limit conditions when list can interrupt
  // a paragraph (validation mode only)
  if (silent && state.parentType === 'paragraph') {
    // Next list item should still terminate previous list item;
    //
    // This code can fail if plugins use blkIndent as well as lists,
    // but I hope the spec gets fixed long before that happens.
    //
    if (state.tShift[startLine] >= state.blkIndent) {
      isTerminatingParagraph = true;
    }
  }

  // Detect list type and position after marker
  if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
    isOrdered = true;
    start = state.bMarks[startLine] + state.tShift[startLine];
    markerValue = Number(state.src.substr(start, posAfterMarker - start - 1));

    // If we're starting a new ordered list right after
    // a paragraph, it should start with 1.
    if (isTerminatingParagraph && markerValue !== 1) return false;

  } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
    isOrdered = false;

  } else {
    return false;
  }

  // If we're starting a new unordered list right after
  // a paragraph, first line should not be empty.
  if (isTerminatingParagraph) {
    if (state.skipSpaces(posAfterMarker) >= state.eMarks[startLine]) return false;
  }

  // We should terminate list on style change. Remember first one to compare.
  markerCharCode = state.src.charCodeAt(posAfterMarker - 1);

  // For validation mode we can terminate immediately
  if (silent) { return true; }

  // Start list
  listTokIdx = state.tokens.length;

  if (isOrdered) {
    token       = state.push('ordered_list_open', 'ol', 1);
    if (markerValue !== 1) {
      token.attrs = [ [ 'start', markerValue ] ];
    }

  } else {
    token       = state.push('bullet_list_open', 'ul', 1);
  }

  token.map    = listLines = [ startLine, 0 ];
  token.markup = String.fromCharCode(markerCharCode);

  //
  // Iterate list items
  //

  nextLine = startLine;
  prevEmptyEnd = false;
  terminatorRules = state.md.block.ruler.getRules('list');

  oldParentType = state.parentType;
  state.parentType = 'list';

  while (nextLine < endLine) {
    pos = posAfterMarker;
    max = state.eMarks[nextLine];

    initial = offset = state.sCount[nextLine] + posAfterMarker - (state.bMarks[startLine] + state.tShift[startLine]);

    while (pos < max) {
      ch = state.src.charCodeAt(pos);

      if (ch === 0x09) {
        offset += 4 - (offset + state.bsCount[nextLine]) % 4;
      } else if (ch === 0x20) {
        offset++;
      } else {
        break;
      }

      pos++;
    }

    contentStart = pos;

    if (contentStart >= max) {
      // trimming space in "-    \n  3" case, indent is 1 here
      indentAfterMarker = 1;
    } else {
      indentAfterMarker = offset - initial;
    }

    // If we have more than 4 spaces, the indent is 1
    // (the rest is just indented code block)
    if (indentAfterMarker > 4) { indentAfterMarker = 1; }

    // "  -  test"
    //  ^^^^^ - calculating total length of this thing
    indent = initial + indentAfterMarker;

    // Run subparser & write tokens
    token        = state.push('list_item_open', 'li', 1);
    token.markup = String.fromCharCode(markerCharCode);
    token.map    = itemLines = [ startLine, 0 ];

    // change current state, then restore it after parser subcall
    oldTight = state.tight;
    oldTShift = state.tShift[startLine];
    oldSCount = state.sCount[startLine];

    //  - example list
    // ^ listIndent position will be here
    //   ^ blkIndent position will be here
    //
    oldListIndent = state.listIndent;
    state.listIndent = state.blkIndent;
    state.blkIndent = indent;

    state.tight = true;
    state.tShift[startLine] = contentStart - state.bMarks[startLine];
    state.sCount[startLine] = offset;

    if (contentStart >= max && state.isEmpty(startLine + 1)) {
      // workaround for this case
      // (list item is empty, list terminates before "foo"):
      // ~~~~~~~~
      //   -
      //
      //     foo
      // ~~~~~~~~
      state.line = Math.min(state.line + 2, endLine);
    } else {
      state.md.block.tokenize(state, startLine, endLine, true);
    }

    // If any of list item is tight, mark list as tight
    if (!state.tight || prevEmptyEnd) {
      tight = false;
    }
    // Item become loose if finish with empty line,
    // but we should filter last element, because it means list finish
    prevEmptyEnd = (state.line - startLine) > 1 && state.isEmpty(state.line - 1);

    state.blkIndent = state.listIndent;
    state.listIndent = oldListIndent;
    state.tShift[startLine] = oldTShift;
    state.sCount[startLine] = oldSCount;
    state.tight = oldTight;

    token        = state.push('list_item_close', 'li', -1);
    token.markup = String.fromCharCode(markerCharCode);

    nextLine = startLine = state.line;
    itemLines[1] = nextLine;
    contentStart = state.bMarks[startLine];

    if (nextLine >= endLine) { break; }

    //
    // Try to check if list is terminated or continued.
    //
    if (state.sCount[nextLine] < state.blkIndent) { break; }

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { break; }

    // fail if terminating block found
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }

    // fail if list has another type
    if (isOrdered) {
      posAfterMarker = skipOrderedListMarker(state, nextLine);
      if (posAfterMarker < 0) { break; }
    } else {
      posAfterMarker = skipBulletListMarker(state, nextLine);
      if (posAfterMarker < 0) { break; }
    }

    if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) { break; }
  }

  // Finalize list
  if (isOrdered) {
    token = state.push('ordered_list_close', 'ol', -1);
  } else {
    token = state.push('bullet_list_close', 'ul', -1);
  }
  token.markup = String.fromCharCode(markerCharCode);

  listLines[1] = nextLine;
  state.line = nextLine;

  state.parentType = oldParentType;

  // mark paragraphs tight if needed
  if (tight) {
    markTightParagraphs(state, listTokIdx);
  }

  return true;
};


/***/ }),

/***/ "4b85":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4c26":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Normalize input string




var NEWLINES_RE  = /\r[\n\u0085]?|[\u2424\u2028\u0085]/g;
var NULL_RE      = /\u0000/g;


module.exports = function normalize(state) {
  var str;

  // Normalize newlines
  str = state.src.replace(NEWLINES_RE, '\n');

  // Replace NULL characters
  str = str.replace(NULL_RE, '\uFFFD');

  state.src = str;
};


/***/ }),

/***/ "4cb4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** internal
 * class ParserInline
 *
 * Tokenizes paragraph content.
 **/



var Ruler           = __webpack_require__("4883");


////////////////////////////////////////////////////////////////////////////////
// Parser rules

var _rules = [
  [ 'text',            __webpack_require__("baca") ],
  [ 'newline',         __webpack_require__("4236") ],
  [ 'escape',          __webpack_require__("6e00") ],
  [ 'backticks',       __webpack_require__("4a94") ],
  [ 'strikethrough',   __webpack_require__("922c").tokenize ],
  [ 'emphasis',        __webpack_require__("c8a9").tokenize ],
  [ 'link',            __webpack_require__("cd0f") ],
  [ 'image',           __webpack_require__("932d") ],
  [ 'autolink',        __webpack_require__("28ec") ],
  [ 'html_inline',     __webpack_require__("c2d8") ],
  [ 'entity',          __webpack_require__("5b54") ]
];

var _rules2 = [
  [ 'balance_pairs',   __webpack_require__("838d") ],
  [ 'strikethrough',   __webpack_require__("922c").postProcess ],
  [ 'emphasis',        __webpack_require__("c8a9").postProcess ],
  [ 'text_collapse',   __webpack_require__("2085") ]
];


/**
 * new ParserInline()
 **/
function ParserInline() {
  var i;

  /**
   * ParserInline#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of inline rules.
   **/
  this.ruler = new Ruler();

  for (i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }

  /**
   * ParserInline#ruler2 -> Ruler
   *
   * [[Ruler]] instance. Second ruler used for post-processing
   * (e.g. in emphasis-like rules).
   **/
  this.ruler2 = new Ruler();

  for (i = 0; i < _rules2.length; i++) {
    this.ruler2.push(_rules2[i][0], _rules2[i][1]);
  }
}


// Skip single token by running all rules in validation mode;
// returns `true` if any rule reported success
//
ParserInline.prototype.skipToken = function (state) {
  var ok, i, pos = state.pos,
      rules = this.ruler.getRules(''),
      len = rules.length,
      maxNesting = state.md.options.maxNesting,
      cache = state.cache;


  if (typeof cache[pos] !== 'undefined') {
    state.pos = cache[pos];
    return;
  }

  if (state.level < maxNesting) {
    for (i = 0; i < len; i++) {
      // Increment state.level and decrement it later to limit recursion.
      // It's harmless to do here, because no tokens are created. But ideally,
      // we'd need a separate private state variable for this purpose.
      //
      state.level++;
      ok = rules[i](state, true);
      state.level--;

      if (ok) { break; }
    }
  } else {
    // Too much nesting, just skip until the end of the paragraph.
    //
    // NOTE: this will cause links to behave incorrectly in the following case,
    //       when an amount of `[` is exactly equal to `maxNesting + 1`:
    //
    //       [[[[[[[[[[[[[[[[[[[[[foo]()
    //
    // TODO: remove this workaround when CM standard will allow nested links
    //       (we can replace it by preventing links from being parsed in
    //       validation mode)
    //
    state.pos = state.posMax;
  }

  if (!ok) { state.pos++; }
  cache[pos] = state.pos;
};


// Generate tokens for input range
//
ParserInline.prototype.tokenize = function (state) {
  var ok, i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      end = state.posMax,
      maxNesting = state.md.options.maxNesting;

  while (state.pos < end) {
    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.pos`
    // - update `state.tokens`
    // - return true

    if (state.level < maxNesting) {
      for (i = 0; i < len; i++) {
        ok = rules[i](state, false);
        if (ok) { break; }
      }
    }

    if (ok) {
      if (state.pos >= end) { break; }
      continue;
    }

    state.pending += state.src[state.pos++];
  }

  if (state.pending) {
    state.pushPending();
  }
};


/**
 * ParserInline.parse(str, md, env, outTokens)
 *
 * Process input string and push inline tokens into `outTokens`
 **/
ParserInline.prototype.parse = function (str, md, env, outTokens) {
  var i, rules, len;
  var state = new this.State(str, md, env, outTokens);

  this.tokenize(state);

  rules = this.ruler2.getRules('');
  len = rules.length;

  for (i = 0; i < len; i++) {
    rules[i](state);
  }
};


ParserInline.prototype.State = __webpack_require__("097b");


module.exports = ParserInline;


/***/ }),

/***/ "4fc2":
/***/ (function(module, exports) {

module.exports=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/

/***/ }),

/***/ "53ff":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ExternalContribution_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c449");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ExternalContribution_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ExternalContribution_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ExternalContribution_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "545c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "554a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "565b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Just a shortcut for bulk export



exports.parseLinkLabel       = __webpack_require__("df56");
exports.parseLinkDestination = __webpack_require__("e4ca");
exports.parseLinkTitle       = __webpack_require__("7d91");


/***/ }),

/***/ "5706":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Regexps to match html elements



var attr_name     = '[a-zA-Z_:][a-zA-Z0-9:._-]*';

var unquoted      = '[^"\'=<>`\\x00-\\x20]+';
var single_quoted = "'[^']*'";
var double_quoted = '"[^"]*"';

var attr_value  = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')';

var attribute   = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)';

var open_tag    = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';

var close_tag   = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
var comment     = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
var processing  = '<[?].*?[?]>';
var declaration = '<![A-Z]+\\s+[^>]*>';
var cdata       = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

var HTML_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + '|' + comment +
                        '|' + processing + '|' + declaration + '|' + cdata + ')');
var HTML_OPEN_CLOSE_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + ')');

module.exports.HTML_TAG_RE = HTML_TAG_RE;
module.exports.HTML_OPEN_CLOSE_TAG_RE = HTML_OPEN_CLOSE_TAG_RE;


/***/ }),

/***/ "5b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process html entity - &#123;, &#xAF;, &quot;, ...



var entities          = __webpack_require__("bd68");
var has               = __webpack_require__("0068").has;
var isValidEntityCode = __webpack_require__("0068").isValidEntityCode;
var fromCodePoint     = __webpack_require__("0068").fromCodePoint;


var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
var NAMED_RE   = /^&([a-z][a-z0-9]{1,31});/i;


module.exports = function entity(state, silent) {
  var ch, code, match, pos = state.pos, max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x26/* & */) { return false; }

  if (pos + 1 < max) {
    ch = state.src.charCodeAt(pos + 1);

    if (ch === 0x23 /* # */) {
      match = state.src.slice(pos).match(DIGITAL_RE);
      if (match) {
        if (!silent) {
          code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
          state.pending += isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(0xFFFD);
        }
        state.pos += match[0].length;
        return true;
      }
    } else {
      match = state.src.slice(pos).match(NAMED_RE);
      if (match) {
        if (has(entities, match[1])) {
          if (!silent) { state.pending += entities[match[1]]; }
          state.pos += match[0].length;
          return true;
        }
      }
    }
  }

  if (!silent) { state.pending += '&'; }
  state.pos++;
  return true;
};


/***/ }),

/***/ "5d12":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "5e23":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "5ea5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Stefan Goessner - 2017-19. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


function texmath(md,options) {
    let delimiters = options && options.delimiters || 'dollars',
        macros = options && options.macros;

    if (delimiters in texmath.rules) {
        for (let rule of texmath.rules[delimiters].inline) {
            md.inline.ruler.before('escape', rule.name, texmath.inline(rule));  // ! important
            md.renderer.rules[rule.name] = (tokens, idx) => rule.tmpl.replace(/\$1/,texmath.render(tokens[idx].content,false,macros));
        }

        for (let rule of texmath.rules[delimiters].block) {
            md.block.ruler.before('fence', rule.name, texmath.block(rule));
            md.renderer.rules[rule.name] = (tokens, idx) => rule.tmpl.replace(/\$2/,tokens[idx].info)  // equation number .. ?
                                                                     .replace(/\$1/,texmath.render(tokens[idx].content,true,macros));
        }
    }
}

texmath.applyRule = function(rule, str, beg, inBlockquote) {
    let pre, match, post;
    rule.rex.lastIndex = beg;

    pre = str.startsWith(rule.tag,beg) && (!rule.pre || rule.pre(str,beg));
    match = pre && rule.rex.exec(str);
    if (match) {
        match.lastIndex = rule.rex.lastIndex;
        post = (!rule.post || rule.post(str, match.lastIndex-1))  // valid post-condition
            && (!inBlockquote || !match[1].includes('\n'));       // remove evil blockquote bug (https://github.com/goessner/mdmath/issues/50)
    }
    rule.rex.lastIndex = 0;

    return post && match;
}

// texmath.inline = (rule) => dollar;  // just for testing ..

texmath.inline = (rule) => 
    function(state, silent) {
        let res = texmath.applyRule(rule, state.src, state.pos);
        if (res) {
            if (!silent) {
                let token = state.push(rule.name, 'math', 0);
                token.content = res[1];  // group 1 from regex ..
                token.markup = rule.tag;
            }
            state.pos = res.lastIndex;
        }
        return !!res;
    }

texmath.block = (rule) => 
    function(state, begLine, endLine, silent) {
        let res = texmath.applyRule(rule, state.src, state.bMarks[begLine] + state.tShift[begLine], state.parentType==='blockquote');
        if (res) {
            if (!silent) {
                let token = state.push(rule.name, 'math', 0);
                token.block = true;
                token.content = res[1];
                token.info = res[res.length-1];
                token.markup = rule.tag;
            }
            for (let line=begLine, endpos=res.lastIndex-1; line < endLine; line++)
                if (endpos >= state.bMarks[line] && endpos <= state.eMarks[line]) { // line for end of block math found ...
                    state.line = line+1;
                    break;
                }
            state.pos = res.lastIndex;
        }
        return !!res;
    }

texmath.render = function(tex,displayMode,macros) {
    let res;
    try {
        res = texmath.katex.renderToString(tex,{throwOnError:false,displayMode,macros});
    }
    catch(err) {
        res = tex+": "+err.message.replace("<","&lt;");
    }
    return res;
}

texmath.use = function(katex) {  // math renderer used ...
    texmath.katex = katex;       // ... katex solely at current ...
    return texmath;
}

/*
function dollar(state, silent) {
  var start, max, marker, matchStart, matchEnd, token,
      pos = state.pos,
      ch = state.src.charCodeAt(pos);

  if (ch !== 0x24) { return false; }  // $

  start = pos;
  pos++;
  max = state.posMax;

  while (pos < max && state.src.charCodeAt(pos) === 0x24) { pos++; }

  marker = state.src.slice(start, pos);

  matchStart = matchEnd = pos;

  while ((matchStart = state.src.indexOf('$', matchEnd)) !== -1) {
    matchEnd = matchStart + 1;

    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x24) { matchEnd++; }

    if (matchEnd - matchStart === marker.length) {
      if (!silent) {
        token         = state.push('math_inline', 'math', 0);
        token.markup  = marker;
        token.content = state.src.slice(pos, matchStart)
                                 .replace(/[ \n]+/g, ' ')
                                 .trim();
      }
      state.pos = matchEnd;
      return true;
    }
  }

  if (!silent) { state.pending += marker; }
  state.pos += marker.length;
  return true;
};
*/

texmath.$_pre = (str,beg) => {
    let prv = beg > 0 ? str[beg-1].charCodeAt(0) : false;
    return !prv || prv !== 0x5c                // no backslash,
                && (prv < 0x30 || prv > 0x39); // no decimal digit .. before opening '$'
}
texmath.$_post = (str,end) => {
    let nxt = str[end+1] && str[end+1].charCodeAt(0);
    return !nxt || nxt < 0x30 || nxt > 0x39;   // no decimal digit .. after closing '$'
}

texmath.rules = {
    brackets: {
        inline: [ 
            {   name: 'math_inline',
                rex: /\\\((.+?)\\\)/gy,
                tmpl: '<eq>$1</eq>',
                tag: '\\('
            }
        ],
        block: [
            {   name: 'math_block_eqno',
                rex: /\\\[(((?!\\\]|\\\[)[\s\S])+?)\\\]\s*?\(([^)$\r\n]+?)\)/gmy,
                tmpl: '<section class="eqno"><eqn>$1</eqn><span>($2)</span></section>',
                tag: '\\['
            },
            {   name: 'math_block',
                rex: /\\\[([\s\S]+?)\\\]/gmy,
                tmpl: '<section><eqn>$1</eqn></section>',
                tag: '\\['
            }
        ]
    },
    gitlab: {
        inline: [ 
            {   name: 'math_inline',
                rex: /\$`(.+?)`\$/gy,
                tmpl: '<eq>$1</eq>',
                tag: '$`'
            }
        ],
        block: [ 
            {   name: 'math_block_eqno',
                rex: /`{3}math\s+?([^`]+?)\s+?`{3}\s*?\(([^)$\r\n]+?)\)/gmy,
                tmpl: '<section class="eqno"><eqn>$1</eqn><span>($2)</span></section>',
                tag: '```math'
            },
            {   name: 'math_block',
                rex: /`{3}math\s+?([^`]+?)\s+?`{3}/gmy,
                tmpl: '<section><eqn>$1</eqn></section>',
                tag: '```math'
            }
        ]
    },
    kramdown: {
        inline: [ 
            {   name: 'math_inline', 
                rex: /\${2}([^$\r\n]*?)\${2}/gy,
                tmpl: '<eq>$1</eq>',
                tag: '$$'
            }
        ],
        block: [
            {   name: 'math_block_eqno',
                rex: /\${2}([^$]*?)\${2}\s*?\(([^)$\r\n]+?)\)/gmy,
                tmpl: '<section class="eqno"><eqn>$1</eqn><span>($2)</span></section>',
                tag: '$$'
            },
            {   name: 'math_block',
                rex: /\${2}([^$]*?)\${2}/gmy,
                tmpl: '<section><eqn>$1</eqn></section>',
                tag: '$$'
            }
        ]
    },
    dollars: {
        inline: [ 
            {   name: 'math_inline', 
                rex: /\$(\S[^$\r\n]*?[^\s\\]{1}?)\$/gy,
                tmpl: '<eq>$1</eq>',
                tag: '$',
                pre: texmath.$_pre,
                post: texmath.$_post
            },
            {   name: 'math_single',
                rex: /\$([^$\s\\]{1}?)\$/gy,
                tmpl: '<eq>$1</eq>',
                tag: '$',
                pre: texmath.$_pre,
                post: texmath.$_post
            }
        ],
        block: [
            {   name: 'math_block_eqno',
                rex: /\${2}([^$]*?)\${2}\s*?\(([^)$\r\n]+?)\)/gmy,
                tmpl: '<section class="eqno"><eqn>$1</eqn><span>($2)</span></section>',
                tag: '$$'
            },
            {   name: 'math_block',
                rex: /\${2}([^$]*?)\${2}/gmy,
                tmpl: '<section><eqn>$1</eqn></section>',
                tag: '$$'
            }
        ]
    }
};

if ( true && module.exports)
   module.exports = texmath;

/***/ }),

/***/ "5fbd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// HTML block




var block_names = __webpack_require__("e1f3");
var HTML_OPEN_CLOSE_TAG_RE = __webpack_require__("5706").HTML_OPEN_CLOSE_TAG_RE;

// An array of opening and corresponding closing sequences for html tags,
// last argument defines whether it can terminate a paragraph or not
//
var HTML_SEQUENCES = [
  [ /^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true ],
  [ /^<!--/,        /-->/,   true ],
  [ /^<\?/,         /\?>/,   true ],
  [ /^<![A-Z]/,     />/,     true ],
  [ /^<!\[CDATA\[/, /\]\]>/, true ],
  [ new RegExp('^</?(' + block_names.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true ],
  [ new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + '\\s*$'),  /^$/, false ]
];


module.exports = function html_block(state, startLine, endLine, silent) {
  var i, nextLine, token, lineText,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  if (!state.md.options.html) { return false; }

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

  lineText = state.src.slice(pos, max);

  for (i = 0; i < HTML_SEQUENCES.length; i++) {
    if (HTML_SEQUENCES[i][0].test(lineText)) { break; }
  }

  if (i === HTML_SEQUENCES.length) { return false; }

  if (silent) {
    // true if this sequence can be a terminator, false otherwise
    return HTML_SEQUENCES[i][2];
  }

  nextLine = startLine + 1;

  // If we are here - we detected HTML block.
  // Let's roll down till block end.
  if (!HTML_SEQUENCES[i][1].test(lineText)) {
    for (; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) { break; }

      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      lineText = state.src.slice(pos, max);

      if (HTML_SEQUENCES[i][1].test(lineText)) {
        if (lineText.length !== 0) { nextLine++; }
        break;
      }
    }
  }

  state.line = nextLine;

  token         = state.push('html_block', '', 0);
  token.map     = [ startLine, nextLine ];
  token.content = state.getLines(startLine, nextLine, state.blkIndent, true);

  return true;
};


/***/ }),

/***/ "615b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "62e4":
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "6544":
/***/ (function(module, exports) {

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function installComponents (component, components) {
  var options = typeof component.exports === 'function'
    ? component.exports.extendOptions
    : component.options

  if (typeof component.exports === 'function') {
    options.components = component.exports.options.components
  }

  options.components = options.components || {}

  for (var i in components) {
    options.components[i] = options.components[i] || components[i]
  }
}


/***/ }),

/***/ "655d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "65bb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DatasetView_vue_vue_type_style_index_0_id_1373d41d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a656");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DatasetView_vue_vue_type_style_index_0_id_1373d41d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DatasetView_vue_vue_type_style_index_0_id_1373d41d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DatasetView_vue_vue_type_style_index_0_id_1373d41d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6e00":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process escaped chars and hardbreaks



var isSpace = __webpack_require__("0068").isSpace;

var ESCAPED = [];

for (var i = 0; i < 256; i++) { ESCAPED.push(0); }

'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'
  .split('').forEach(function (ch) { ESCAPED[ch.charCodeAt(0)] = 1; });


module.exports = function escape(state, silent) {
  var ch, pos = state.pos, max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x5C/* \ */) { return false; }

  pos++;

  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (ch < 256 && ESCAPED[ch] !== 0) {
      if (!silent) { state.pending += state.src[pos]; }
      state.pos += 2;
      return true;
    }

    if (ch === 0x0A) {
      if (!silent) {
        state.push('hardbreak', 'br', 0);
      }

      pos++;
      // skip leading whitespaces from next line
      while (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (!isSpace(ch)) { break; }
        pos++;
      }

      state.pos = pos;
      return true;
    }
  }

  if (!silent) { state.pending += '\\'; }
  state.pos++;
  return true;
};


/***/ }),

/***/ "6ece":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6fd1":
/***/ (function(module, exports) {

module.exports=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/

/***/ }),

/***/ "7133":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Core state object
//


var Token = __webpack_require__("096b");


function StateCore(src, md, env) {
  this.src = src;
  this.env = env;
  this.tokens = [];
  this.inlineMode = false;
  this.md = md; // link to parser instance
}

// re-export Token class to use in core rules
StateCore.prototype.Token = Token;


module.exports = StateCore;


/***/ }),

/***/ "7435":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7696":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** internal
 * class ParserBlock
 *
 * Block-level tokenizer.
 **/



var Ruler           = __webpack_require__("4883");


var _rules = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  [ 'table',      __webpack_require__("80d3"),      [ 'paragraph', 'reference' ] ],
  [ 'code',       __webpack_require__("9c12") ],
  [ 'fence',      __webpack_require__("bf2b"),      [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'blockquote', __webpack_require__("e80e"), [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'hr',         __webpack_require__("fdfe"),         [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'list',       __webpack_require__("4b3e"),       [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'reference',  __webpack_require__("d670") ],
  [ 'heading',    __webpack_require__("0758"),    [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'lheading',   __webpack_require__("199e") ],
  [ 'html_block', __webpack_require__("5fbd"), [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'paragraph',  __webpack_require__("44a8") ]
];


/**
 * new ParserBlock()
 **/
function ParserBlock() {
  /**
   * ParserBlock#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of block rules.
   **/
  this.ruler = new Ruler();

  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1], { alt: (_rules[i][2] || []).slice() });
  }
}


// Generate tokens for input range
//
ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
  var ok, i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      line = startLine,
      hasEmptyLines = false,
      maxNesting = state.md.options.maxNesting;

  while (line < endLine) {
    state.line = line = state.skipEmptyLines(line);
    if (line >= endLine) { break; }

    // Termination condition for nested calls.
    // Nested calls currently used for blockquotes & lists
    if (state.sCount[line] < state.blkIndent) { break; }

    // If nesting level exceeded - skip tail to the end. That's not ordinary
    // situation and we should not care about content.
    if (state.level >= maxNesting) {
      state.line = endLine;
      break;
    }

    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.line`
    // - update `state.tokens`
    // - return true

    for (i = 0; i < len; i++) {
      ok = rules[i](state, line, endLine, false);
      if (ok) { break; }
    }

    // set state.tight if we had an empty line before current tag
    // i.e. latest empty line should not count
    state.tight = !hasEmptyLines;

    // paragraph might "eat" one newline after it in nested lists
    if (state.isEmpty(state.line - 1)) {
      hasEmptyLines = true;
    }

    line = state.line;

    if (line < endLine && state.isEmpty(line)) {
      hasEmptyLines = true;
      line++;
      state.line = line;
    }
  }
};


/**
 * ParserBlock.parse(str, md, env, outTokens)
 *
 * Process input string and push block tokens into `outTokens`
 **/
ParserBlock.prototype.parse = function (src, md, env, outTokens) {
  var state;

  if (!src) { return; }

  state = new this.State(src, md, env, outTokens);

  this.tokenize(state, state.line, state.lineMax);
};


ParserBlock.prototype.State = __webpack_require__("834f");


module.exports = ParserBlock;


/***/ }),

/***/ "7958":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7ca0":
/***/ (function(module, exports) {

module.exports=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/

/***/ }),

/***/ "7cc2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * class Renderer
 *
 * Generates HTML from parsed token stream. Each instance has independent
 * copy of rules. Those can be rewritten with ease. Also, you can add new
 * rules if you create plugin and adds new token types.
 **/



var assign          = __webpack_require__("0068").assign;
var unescapeAll     = __webpack_require__("0068").unescapeAll;
var escapeHtml      = __webpack_require__("0068").escapeHtml;


////////////////////////////////////////////////////////////////////////////////

var default_rules = {};


default_rules.code_inline = function (tokens, idx, options, env, slf) {
  var token = tokens[idx];

  return  '<code' + slf.renderAttrs(token) + '>' +
          escapeHtml(tokens[idx].content) +
          '</code>';
};


default_rules.code_block = function (tokens, idx, options, env, slf) {
  var token = tokens[idx];

  return  '<pre' + slf.renderAttrs(token) + '><code>' +
          escapeHtml(tokens[idx].content) +
          '</code></pre>\n';
};


default_rules.fence = function (tokens, idx, options, env, slf) {
  var token = tokens[idx],
      info = token.info ? unescapeAll(token.info).trim() : '',
      langName = '',
      highlighted, i, tmpAttrs, tmpToken;

  if (info) {
    langName = info.split(/\s+/g)[0];
  }

  if (options.highlight) {
    highlighted = options.highlight(token.content, langName) || escapeHtml(token.content);
  } else {
    highlighted = escapeHtml(token.content);
  }

  if (highlighted.indexOf('<pre') === 0) {
    return highlighted + '\n';
  }

  // If language exists, inject class gently, without modifying original token.
  // May be, one day we will add .clone() for token and simplify this part, but
  // now we prefer to keep things local.
  if (info) {
    i        = token.attrIndex('class');
    tmpAttrs = token.attrs ? token.attrs.slice() : [];

    if (i < 0) {
      tmpAttrs.push([ 'class', options.langPrefix + langName ]);
    } else {
      tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
    }

    // Fake token just to render attributes
    tmpToken = {
      attrs: tmpAttrs
    };

    return  '<pre><code' + slf.renderAttrs(tmpToken) + '>'
          + highlighted
          + '</code></pre>\n';
  }


  return  '<pre><code' + slf.renderAttrs(token) + '>'
        + highlighted
        + '</code></pre>\n';
};


default_rules.image = function (tokens, idx, options, env, slf) {
  var token = tokens[idx];

  // "alt" attr MUST be set, even if empty. Because it's mandatory and
  // should be placed on proper position for tests.
  //
  // Replace content with actual value

  token.attrs[token.attrIndex('alt')][1] =
    slf.renderInlineAsText(token.children, options, env);

  return slf.renderToken(tokens, idx, options);
};


default_rules.hardbreak = function (tokens, idx, options /*, env */) {
  return options.xhtmlOut ? '<br />\n' : '<br>\n';
};
default_rules.softbreak = function (tokens, idx, options /*, env */) {
  return options.breaks ? (options.xhtmlOut ? '<br />\n' : '<br>\n') : '\n';
};


default_rules.text = function (tokens, idx /*, options, env */) {
  return escapeHtml(tokens[idx].content);
};


default_rules.html_block = function (tokens, idx /*, options, env */) {
  return tokens[idx].content;
};
default_rules.html_inline = function (tokens, idx /*, options, env */) {
  return tokens[idx].content;
};


/**
 * new Renderer()
 *
 * Creates new [[Renderer]] instance and fill [[Renderer#rules]] with defaults.
 **/
function Renderer() {

  /**
   * Renderer#rules -> Object
   *
   * Contains render rules for tokens. Can be updated and extended.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * md.renderer.rules.strong_open  = function () { return '<b>'; };
   * md.renderer.rules.strong_close = function () { return '</b>'; };
   *
   * var result = md.renderInline(...);
   * ```
   *
   * Each rule is called as independent static function with fixed signature:
   *
   * ```javascript
   * function my_token_render(tokens, idx, options, env, renderer) {
   *   // ...
   *   return renderedHTML;
   * }
   * ```
   *
   * See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js)
   * for more details and examples.
   **/
  this.rules = assign({}, default_rules);
}


/**
 * Renderer.renderAttrs(token) -> String
 *
 * Render token attributes to string.
 **/
Renderer.prototype.renderAttrs = function renderAttrs(token) {
  var i, l, result;

  if (!token.attrs) { return ''; }

  result = '';

  for (i = 0, l = token.attrs.length; i < l; i++) {
    result += ' ' + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
  }

  return result;
};


/**
 * Renderer.renderToken(tokens, idx, options) -> String
 * - tokens (Array): list of tokens
 * - idx (Numbed): token index to render
 * - options (Object): params of parser instance
 *
 * Default token renderer. Can be overriden by custom function
 * in [[Renderer#rules]].
 **/
Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
  var nextToken,
      result = '',
      needLf = false,
      token = tokens[idx];

  // Tight list paragraphs
  if (token.hidden) {
    return '';
  }

  // Insert a newline between hidden paragraph and subsequent opening
  // block-level tag.
  //
  // For example, here we should insert a newline before blockquote:
  //  - a
  //    >
  //
  if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
    result += '\n';
  }

  // Add token name, e.g. `<img`
  result += (token.nesting === -1 ? '</' : '<') + token.tag;

  // Encode attributes, e.g. `<img src="foo"`
  result += this.renderAttrs(token);

  // Add a slash for self-closing tags, e.g. `<img src="foo" /`
  if (token.nesting === 0 && options.xhtmlOut) {
    result += ' /';
  }

  // Check if we need to add a newline after this tag
  if (token.block) {
    needLf = true;

    if (token.nesting === 1) {
      if (idx + 1 < tokens.length) {
        nextToken = tokens[idx + 1];

        if (nextToken.type === 'inline' || nextToken.hidden) {
          // Block-level tag containing an inline tag.
          //
          needLf = false;

        } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
          // Opening tag + closing tag of the same type. E.g. `<li></li>`.
          //
          needLf = false;
        }
      }
    }
  }

  result += needLf ? '>\n' : '>';

  return result;
};


/**
 * Renderer.renderInline(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to renter
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * The same as [[Renderer.render]], but for single token of `inline` type.
 **/
Renderer.prototype.renderInline = function (tokens, options, env) {
  var type,
      result = '',
      rules = this.rules;

  for (var i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (typeof rules[type] !== 'undefined') {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options);
    }
  }

  return result;
};


/** internal
 * Renderer.renderInlineAsText(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to renter
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Special kludge for image `alt` attributes to conform CommonMark spec.
 * Don't try to use it! Spec requires to show `alt` content with stripped markup,
 * instead of simple escaping.
 **/
Renderer.prototype.renderInlineAsText = function (tokens, options, env) {
  var result = '';

  for (var i = 0, len = tokens.length; i < len; i++) {
    if (tokens[i].type === 'text') {
      result += tokens[i].content;
    } else if (tokens[i].type === 'image') {
      result += this.renderInlineAsText(tokens[i].children, options, env);
    }
  }

  return result;
};


/**
 * Renderer.render(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to renter
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Takes token stream and generates HTML. Probably, you will never need to call
 * this method directly.
 **/
Renderer.prototype.render = function (tokens, options, env) {
  var i, len, type,
      result = '',
      rules = this.rules;

  for (i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (type === 'inline') {
      result += this.renderInline(tokens[i].children, options, env);
    } else if (typeof rules[type] !== 'undefined') {
      result += rules[tokens[i].type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options, env);
    }
  }

  return result;
};

module.exports = Renderer;


/***/ }),

/***/ "7d05":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7d91":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Parse link title
//



var unescapeAll = __webpack_require__("0068").unescapeAll;


module.exports = function parseLinkTitle(str, pos, max) {
  var code,
      marker,
      lines = 0,
      start = pos,
      result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ''
      };

  if (pos >= max) { return result; }

  marker = str.charCodeAt(pos);

  if (marker !== 0x22 /* " */ && marker !== 0x27 /* ' */ && marker !== 0x28 /* ( */) { return result; }

  pos++;

  // if opening marker is "(", switch it to closing marker ")"
  if (marker === 0x28) { marker = 0x29; }

  while (pos < max) {
    code = str.charCodeAt(pos);
    if (code === marker) {
      result.pos = pos + 1;
      result.lines = lines;
      result.str = unescapeAll(str.slice(start + 1, pos));
      result.ok = true;
      return result;
    } else if (code === 0x0A) {
      lines++;
    } else if (code === 0x5C /* \ */ && pos + 1 < max) {
      pos++;
      if (str.charCodeAt(pos) === 0x0A) {
        lines++;
      }
    }

    pos++;
  }

  return result;
};


/***/ }),

/***/ "80d3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// GFM table, non-standard



var isSpace = __webpack_require__("0068").isSpace;


function getLine(state, line) {
  var pos = state.bMarks[line] + state.blkIndent,
      max = state.eMarks[line];

  return state.src.substr(pos, max - pos);
}

function escapedSplit(str) {
  var result = [],
      pos = 0,
      max = str.length,
      ch,
      escapes = 0,
      lastPos = 0,
      backTicked = false,
      lastBackTick = 0;

  ch  = str.charCodeAt(pos);

  while (pos < max) {
    if (ch === 0x60/* ` */) {
      if (backTicked) {
        // make \` close code sequence, but not open it;
        // the reason is: `\` is correct code block
        backTicked = false;
        lastBackTick = pos;
      } else if (escapes % 2 === 0) {
        backTicked = true;
        lastBackTick = pos;
      }
    } else if (ch === 0x7c/* | */ && (escapes % 2 === 0) && !backTicked) {
      result.push(str.substring(lastPos, pos));
      lastPos = pos + 1;
    }

    if (ch === 0x5c/* \ */) {
      escapes++;
    } else {
      escapes = 0;
    }

    pos++;

    // If there was an un-closed backtick, go back to just after
    // the last backtick, but as if it was a normal character
    if (pos === max && backTicked) {
      backTicked = false;
      pos = lastBackTick + 1;
    }

    ch = str.charCodeAt(pos);
  }

  result.push(str.substring(lastPos));

  return result;
}


module.exports = function table(state, startLine, endLine, silent) {
  var ch, lineText, pos, i, nextLine, columns, columnCount, token,
      aligns, t, tableLines, tbodyLines;

  // should have at least two lines
  if (startLine + 2 > endLine) { return false; }

  nextLine = startLine + 1;

  if (state.sCount[nextLine] < state.blkIndent) { return false; }

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[nextLine] - state.blkIndent >= 4) { return false; }

  // first character of the second line should be '|', '-', ':',
  // and no other characters are allowed but spaces;
  // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp

  pos = state.bMarks[nextLine] + state.tShift[nextLine];
  if (pos >= state.eMarks[nextLine]) { return false; }

  ch = state.src.charCodeAt(pos++);
  if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */) { return false; }

  while (pos < state.eMarks[nextLine]) {
    ch = state.src.charCodeAt(pos);

    if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */ && !isSpace(ch)) { return false; }

    pos++;
  }

  lineText = getLine(state, startLine + 1);

  columns = lineText.split('|');
  aligns = [];
  for (i = 0; i < columns.length; i++) {
    t = columns[i].trim();
    if (!t) {
      // allow empty columns before and after table, but not in between columns;
      // e.g. allow ` |---| `, disallow ` ---||--- `
      if (i === 0 || i === columns.length - 1) {
        continue;
      } else {
        return false;
      }
    }

    if (!/^:?-+:?$/.test(t)) { return false; }
    if (t.charCodeAt(t.length - 1) === 0x3A/* : */) {
      aligns.push(t.charCodeAt(0) === 0x3A/* : */ ? 'center' : 'right');
    } else if (t.charCodeAt(0) === 0x3A/* : */) {
      aligns.push('left');
    } else {
      aligns.push('');
    }
  }

  lineText = getLine(state, startLine).trim();
  if (lineText.indexOf('|') === -1) { return false; }
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }
  columns = escapedSplit(lineText.replace(/^\||\|$/g, ''));

  // header row will define an amount of columns in the entire table,
  // and align row shouldn't be smaller than that (the rest of the rows can)
  columnCount = columns.length;
  if (columnCount > aligns.length) { return false; }

  if (silent) { return true; }

  token     = state.push('table_open', 'table', 1);
  token.map = tableLines = [ startLine, 0 ];

  token     = state.push('thead_open', 'thead', 1);
  token.map = [ startLine, startLine + 1 ];

  token     = state.push('tr_open', 'tr', 1);
  token.map = [ startLine, startLine + 1 ];

  for (i = 0; i < columns.length; i++) {
    token          = state.push('th_open', 'th', 1);
    token.map      = [ startLine, startLine + 1 ];
    if (aligns[i]) {
      token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
    }

    token          = state.push('inline', '', 0);
    token.content  = columns[i].trim();
    token.map      = [ startLine, startLine + 1 ];
    token.children = [];

    token          = state.push('th_close', 'th', -1);
  }

  token     = state.push('tr_close', 'tr', -1);
  token     = state.push('thead_close', 'thead', -1);

  token     = state.push('tbody_open', 'tbody', 1);
  token.map = tbodyLines = [ startLine + 2, 0 ];

  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
    if (state.sCount[nextLine] < state.blkIndent) { break; }

    lineText = getLine(state, nextLine).trim();
    if (lineText.indexOf('|') === -1) { break; }
    if (state.sCount[nextLine] - state.blkIndent >= 4) { break; }
    columns = escapedSplit(lineText.replace(/^\||\|$/g, ''));

    token = state.push('tr_open', 'tr', 1);
    for (i = 0; i < columnCount; i++) {
      token          = state.push('td_open', 'td', 1);
      if (aligns[i]) {
        token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
      }

      token          = state.push('inline', '', 0);
      token.content  = columns[i] ? columns[i].trim() : '';
      token.children = [];

      token          = state.push('td_close', 'td', -1);
    }
    token = state.push('tr_close', 'tr', -1);
  }
  token = state.push('tbody_close', 'tbody', -1);
  token = state.push('table_close', 'table', -1);

  tableLines[1] = tbodyLines[1] = nextLine;
  state.line = nextLine;
  return true;
};


/***/ }),

/***/ "8244":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_5db74bb4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("82f1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_5db74bb4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_5db74bb4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_5db74bb4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "82f1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "834f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Parser state class



var Token = __webpack_require__("096b");
var isSpace = __webpack_require__("0068").isSpace;


function StateBlock(src, md, env, tokens) {
  var ch, s, start, pos, len, indent, offset, indent_found;

  this.src = src;

  // link to parser instance
  this.md     = md;

  this.env = env;

  //
  // Internal state vartiables
  //

  this.tokens = tokens;

  this.bMarks = [];  // line begin offsets for fast jumps
  this.eMarks = [];  // line end offsets for fast jumps
  this.tShift = [];  // offsets of the first non-space characters (tabs not expanded)
  this.sCount = [];  // indents for each line (tabs expanded)

  // An amount of virtual spaces (tabs expanded) between beginning
  // of each line (bMarks) and real beginning of that line.
  //
  // It exists only as a hack because blockquotes override bMarks
  // losing information in the process.
  //
  // It's used only when expanding tabs, you can think about it as
  // an initial tab length, e.g. bsCount=21 applied to string `\t123`
  // means first tab should be expanded to 4-21%4 === 3 spaces.
  //
  this.bsCount = [];

  // block parser variables
  this.blkIndent  = 0; // required block content indent (for example, if we are
                       // inside a list, it would be positioned after list marker)
  this.line       = 0; // line index in src
  this.lineMax    = 0; // lines count
  this.tight      = false;  // loose/tight mode for lists
  this.ddIndent   = -1; // indent of the current dd block (-1 if there isn't any)
  this.listIndent = -1; // indent of the current list block (-1 if there isn't any)

  // can be 'blockquote', 'list', 'root', 'paragraph' or 'reference'
  // used in lists to determine if they interrupt a paragraph
  this.parentType = 'root';

  this.level = 0;

  // renderer
  this.result = '';

  // Create caches
  // Generate markers.
  s = this.src;
  indent_found = false;

  for (start = pos = indent = offset = 0, len = s.length; pos < len; pos++) {
    ch = s.charCodeAt(pos);

    if (!indent_found) {
      if (isSpace(ch)) {
        indent++;

        if (ch === 0x09) {
          offset += 4 - offset % 4;
        } else {
          offset++;
        }
        continue;
      } else {
        indent_found = true;
      }
    }

    if (ch === 0x0A || pos === len - 1) {
      if (ch !== 0x0A) { pos++; }
      this.bMarks.push(start);
      this.eMarks.push(pos);
      this.tShift.push(indent);
      this.sCount.push(offset);
      this.bsCount.push(0);

      indent_found = false;
      indent = 0;
      offset = 0;
      start = pos + 1;
    }
  }

  // Push fake entry to simplify cache bounds checks
  this.bMarks.push(s.length);
  this.eMarks.push(s.length);
  this.tShift.push(0);
  this.sCount.push(0);
  this.bsCount.push(0);

  this.lineMax = this.bMarks.length - 1; // don't count last fake line
}

// Push new token to "stream".
//
StateBlock.prototype.push = function (type, tag, nesting) {
  var token = new Token(type, tag, nesting);
  token.block = true;

  if (nesting < 0) this.level--; // closing tag
  token.level = this.level;
  if (nesting > 0) this.level++; // opening tag

  this.tokens.push(token);
  return token;
};

StateBlock.prototype.isEmpty = function isEmpty(line) {
  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
};

StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
  for (var max = this.lineMax; from < max; from++) {
    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
      break;
    }
  }
  return from;
};

// Skip spaces from given position.
StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
  var ch;

  for (var max = this.src.length; pos < max; pos++) {
    ch = this.src.charCodeAt(pos);
    if (!isSpace(ch)) { break; }
  }
  return pos;
};

// Skip spaces from given position in reverse.
StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
  if (pos <= min) { return pos; }

  while (pos > min) {
    if (!isSpace(this.src.charCodeAt(--pos))) { return pos + 1; }
  }
  return pos;
};

// Skip char codes from given position
StateBlock.prototype.skipChars = function skipChars(pos, code) {
  for (var max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== code) { break; }
  }
  return pos;
};

// Skip char codes reverse from given position - 1
StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
  if (pos <= min) { return pos; }

  while (pos > min) {
    if (code !== this.src.charCodeAt(--pos)) { return pos + 1; }
  }
  return pos;
};

// cut lines range from source.
StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
  var i, lineIndent, ch, first, last, queue, lineStart,
      line = begin;

  if (begin >= end) {
    return '';
  }

  queue = new Array(end - begin);

  for (i = 0; line < end; line++, i++) {
    lineIndent = 0;
    lineStart = first = this.bMarks[line];

    if (line + 1 < end || keepLastLF) {
      // No need for bounds check because we have fake entry on tail.
      last = this.eMarks[line] + 1;
    } else {
      last = this.eMarks[line];
    }

    while (first < last && lineIndent < indent) {
      ch = this.src.charCodeAt(first);

      if (isSpace(ch)) {
        if (ch === 0x09) {
          lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
        } else {
          lineIndent++;
        }
      } else if (first - lineStart < this.tShift[line]) {
        // patched tShift masked characters to look like spaces (blockquotes, list markers)
        lineIndent++;
      } else {
        break;
      }

      first++;
    }

    if (lineIndent > indent) {
      // partially expanding tabs in code blocks, e.g '\t\tfoobar'
      // with indent=2 becomes '  \tfoobar'
      queue[i] = new Array(lineIndent - indent + 1).join(' ') + this.src.slice(first, last);
    } else {
      queue[i] = this.src.slice(first, last);
    }
  }

  return queue.join('');
};

// re-export Token class to use in block rules
StateBlock.prototype.Token = Token;


module.exports = StateBlock;


/***/ }),

/***/ "838d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// For each opening emphasis-like marker find a matching closing one
//



module.exports = function link_pairs(state) {
  var i, j, lastDelim, currDelim,
      delimiters = state.delimiters,
      max = state.delimiters.length;

  for (i = 0; i < max; i++) {
    lastDelim = delimiters[i];

    if (!lastDelim.close) { continue; }

    j = i - lastDelim.jump - 1;

    while (j >= 0) {
      currDelim = delimiters[j];

      if (currDelim.open &&
          currDelim.marker === lastDelim.marker &&
          currDelim.end < 0 &&
          currDelim.level === lastDelim.level) {

        var odd_match = false;

        // typeofs are for backward compatibility with plugins
        if ((currDelim.close || lastDelim.open) &&
            typeof currDelim.length !== 'undefined' &&
            typeof lastDelim.length !== 'undefined') {

          // from spec:
          // sum of the lengths [...] must not be a multiple of 3
          // unless both lengths are multiples of 3
          if ((currDelim.length + lastDelim.length) % 3 === 0) {
            if (currDelim.length % 3 !== 0 || lastDelim.length % 3 !== 0) {
              odd_match = true;
            }
          }
        }

        if (!odd_match) {
          lastDelim.jump = i - j;
          lastDelim.open = false;
          currDelim.end  = i;
          currDelim.jump = 0;
          break;
        }
      }

      j -= currDelim.jump + 1;
    }
  }
};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8a31":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// markdown-it default options




module.exports = {
  options: {
    html:         false,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // autoconvert URL-like texts to links

    // Enable some language-neutral replacements + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting:   100            // Internal protection, recursion limit
  },

  components: {

    core: {},
    block: {},
    inline: {}
  }
};


/***/ }),

/***/ "8b0d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "8ce9":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8d4f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8efc":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8f37":
/***/ (function(module, exports, __webpack_require__) {

"use strict";




/* eslint-disable no-bitwise */

var decodeCache = {};

function getDecodeCache(exclude) {
  var i, ch, cache = decodeCache[exclude];
  if (cache) { return cache; }

  cache = decodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);
    cache.push(ch);
  }

  for (i = 0; i < exclude.length; i++) {
    ch = exclude.charCodeAt(i);
    cache[ch] = '%' + ('0' + ch.toString(16).toUpperCase()).slice(-2);
  }

  return cache;
}


// Decode percent-encoded string.
//
function decode(string, exclude) {
  var cache;

  if (typeof exclude !== 'string') {
    exclude = decode.defaultChars;
  }

  cache = getDecodeCache(exclude);

  return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
    var i, l, b1, b2, b3, b4, chr,
        result = '';

    for (i = 0, l = seq.length; i < l; i += 3) {
      b1 = parseInt(seq.slice(i + 1, i + 3), 16);

      if (b1 < 0x80) {
        result += cache[b1];
        continue;
      }

      if ((b1 & 0xE0) === 0xC0 && (i + 3 < l)) {
        // 110xxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);

        if ((b2 & 0xC0) === 0x80) {
          chr = ((b1 << 6) & 0x7C0) | (b2 & 0x3F);

          if (chr < 0x80) {
            result += '\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 3;
          continue;
        }
      }

      if ((b1 & 0xF0) === 0xE0 && (i + 6 < l)) {
        // 1110xxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
          chr = ((b1 << 12) & 0xF000) | ((b2 << 6) & 0xFC0) | (b3 & 0x3F);

          if (chr < 0x800 || (chr >= 0xD800 && chr <= 0xDFFF)) {
            result += '\ufffd\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 6;
          continue;
        }
      }

      if ((b1 & 0xF8) === 0xF0 && (i + 9 < l)) {
        // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);
        b4 = parseInt(seq.slice(i + 10, i + 12), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80 && (b4 & 0xC0) === 0x80) {
          chr = ((b1 << 18) & 0x1C0000) | ((b2 << 12) & 0x3F000) | ((b3 << 6) & 0xFC0) | (b4 & 0x3F);

          if (chr < 0x10000 || chr > 0x10FFFF) {
            result += '\ufffd\ufffd\ufffd\ufffd';
          } else {
            chr -= 0x10000;
            result += String.fromCharCode(0xD800 + (chr >> 10), 0xDC00 + (chr & 0x3FF));
          }

          i += 9;
          continue;
        }
      }

      result += '\ufffd';
    }

    return result;
  });
}


decode.defaultChars   = ';/?:@&=+$,#';
decode.componentChars = '';


module.exports = decode;


/***/ }),

/***/ "922c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// ~~strike through~~
//



// Insert each marker as a separate text token, and add it to delimiter list
//
module.exports.tokenize = function strikethrough(state, silent) {
  var i, scanned, token, len, ch,
      start = state.pos,
      marker = state.src.charCodeAt(start);

  if (silent) { return false; }

  if (marker !== 0x7E/* ~ */) { return false; }

  scanned = state.scanDelims(state.pos, true);
  len = scanned.length;
  ch = String.fromCharCode(marker);

  if (len < 2) { return false; }

  if (len % 2) {
    token         = state.push('text', '', 0);
    token.content = ch;
    len--;
  }

  for (i = 0; i < len; i += 2) {
    token         = state.push('text', '', 0);
    token.content = ch + ch;

    state.delimiters.push({
      marker: marker,
      jump:   i,
      token:  state.tokens.length - 1,
      level:  state.level,
      end:    -1,
      open:   scanned.can_open,
      close:  scanned.can_close
    });
  }

  state.pos += scanned.length;

  return true;
};


// Walk through delimiter list and replace text tokens with tags
//
module.exports.postProcess = function strikethrough(state) {
  var i, j,
      startDelim,
      endDelim,
      token,
      loneMarkers = [],
      delimiters = state.delimiters,
      max = state.delimiters.length;

  for (i = 0; i < max; i++) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x7E/* ~ */) {
      continue;
    }

    if (startDelim.end === -1) {
      continue;
    }

    endDelim = delimiters[startDelim.end];

    token         = state.tokens[startDelim.token];
    token.type    = 's_open';
    token.tag     = 's';
    token.nesting = 1;
    token.markup  = '~~';
    token.content = '';

    token         = state.tokens[endDelim.token];
    token.type    = 's_close';
    token.tag     = 's';
    token.nesting = -1;
    token.markup  = '~~';
    token.content = '';

    if (state.tokens[endDelim.token - 1].type === 'text' &&
        state.tokens[endDelim.token - 1].content === '~') {

      loneMarkers.push(endDelim.token - 1);
    }
  }

  // If a marker sequence has an odd number of characters, it's splitted
  // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
  // start of the sequence.
  //
  // So, we have to move all those markers after subsequent s_close tags.
  //
  while (loneMarkers.length) {
    i = loneMarkers.pop();
    j = i + 1;

    while (j < state.tokens.length && state.tokens[j].type === 's_close') {
      j++;
    }

    j--;

    if (i !== j) {
      token = state.tokens[j];
      state.tokens[j] = state.tokens[i];
      state.tokens[i] = token;
    }
  }
};


/***/ }),

/***/ "932d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process ![image](<src> "title")



var normalizeReference   = __webpack_require__("0068").normalizeReference;
var isSpace              = __webpack_require__("0068").isSpace;


module.exports = function image(state, silent) {
  var attrs,
      code,
      content,
      label,
      labelEnd,
      labelStart,
      pos,
      ref,
      res,
      title,
      token,
      tokens,
      start,
      href = '',
      oldPos = state.pos,
      max = state.posMax;

  if (state.src.charCodeAt(state.pos) !== 0x21/* ! */) { return false; }
  if (state.src.charCodeAt(state.pos + 1) !== 0x5B/* [ */) { return false; }

  labelStart = state.pos + 2;
  labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) { return false; }

  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
    //
    // Inline link
    //

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) { break; }
    }
    if (pos >= max) { return false; }

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }
    }

    // [link](  <href>  "title"  )
    //                ^^ skipping these spaces
    start = pos;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) { break; }
    }

    // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title
    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;

      // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace(code) && code !== 0x0A) { break; }
      }
    } else {
      title = '';
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      state.pos = oldPos;
      return false;
    }
    pos++;
  } else {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') { return false; }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) { label = state.src.slice(labelStart, labelEnd); }

    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    content = state.src.slice(labelStart, labelEnd);

    state.md.inline.parse(
      content,
      state.md,
      state.env,
      tokens = []
    );

    token          = state.push('image', 'img', 0);
    token.attrs    = attrs = [ [ 'src', href ], [ 'alt', '' ] ];
    token.children = tokens;
    token.content  = content;

    if (title) {
      attrs.push([ 'title', title ]);
    }
  }

  state.pos = pos;
  state.posMax = max;
  return true;
};


/***/ }),

/***/ "9406":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleView_vue_vue_type_style_index_0_id_ba66fb58_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("545c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleView_vue_vue_type_style_index_0_id_ba66fb58_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleView_vue_vue_type_style_index_0_id_ba66fb58_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ArticleView_vue_vue_type_style_index_0_id_ba66fb58_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "95ed":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9921":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Replace link-like texts with link nodes.
//
// Currently restricted by `md.validateLink()` to http/https/ftp
//



var arrayReplaceAt = __webpack_require__("0068").arrayReplaceAt;


function isLinkOpen(str) {
  return /^<a[>\s]/i.test(str);
}
function isLinkClose(str) {
  return /^<\/a\s*>/i.test(str);
}


module.exports = function linkify(state) {
  var i, j, l, tokens, token, currentToken, nodes, ln, text, pos, lastPos,
      level, htmlLinkLevel, url, fullUrl, urlText,
      blockTokens = state.tokens,
      links;

  if (!state.md.options.linkify) { return; }

  for (j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== 'inline' ||
        !state.md.linkify.pretest(blockTokens[j].content)) {
      continue;
    }

    tokens = blockTokens[j].children;

    htmlLinkLevel = 0;

    // We scan from the end, to keep position when new tags added.
    // Use reversed logic in links start/end match
    for (i = tokens.length - 1; i >= 0; i--) {
      currentToken = tokens[i];

      // Skip content of markdown links
      if (currentToken.type === 'link_close') {
        i--;
        while (tokens[i].level !== currentToken.level && tokens[i].type !== 'link_open') {
          i--;
        }
        continue;
      }

      // Skip content of html tag links
      if (currentToken.type === 'html_inline') {
        if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
          htmlLinkLevel--;
        }
        if (isLinkClose(currentToken.content)) {
          htmlLinkLevel++;
        }
      }
      if (htmlLinkLevel > 0) { continue; }

      if (currentToken.type === 'text' && state.md.linkify.test(currentToken.content)) {

        text = currentToken.content;
        links = state.md.linkify.match(text);

        // Now split string to nodes
        nodes = [];
        level = currentToken.level;
        lastPos = 0;

        for (ln = 0; ln < links.length; ln++) {

          url = links[ln].url;
          fullUrl = state.md.normalizeLink(url);
          if (!state.md.validateLink(fullUrl)) { continue; }

          urlText = links[ln].text;

          // Linkifier might send raw hostnames like "example.com", where url
          // starts with domain name. So we prepend http:// in those cases,
          // and remove it afterwards.
          //
          if (!links[ln].schema) {
            urlText = state.md.normalizeLinkText('http://' + urlText).replace(/^http:\/\//, '');
          } else if (links[ln].schema === 'mailto:' && !/^mailto:/i.test(urlText)) {
            urlText = state.md.normalizeLinkText('mailto:' + urlText).replace(/^mailto:/, '');
          } else {
            urlText = state.md.normalizeLinkText(urlText);
          }

          pos = links[ln].index;

          if (pos > lastPos) {
            token         = new state.Token('text', '', 0);
            token.content = text.slice(lastPos, pos);
            token.level   = level;
            nodes.push(token);
          }

          token         = new state.Token('link_open', 'a', 1);
          token.attrs   = [ [ 'href', fullUrl ] ];
          token.level   = level++;
          token.markup  = 'linkify';
          token.info    = 'auto';
          nodes.push(token);

          token         = new state.Token('text', '', 0);
          token.content = urlText;
          token.level   = level;
          nodes.push(token);

          token         = new state.Token('link_close', 'a', -1);
          token.level   = --level;
          token.markup  = 'linkify';
          token.info    = 'auto';
          nodes.push(token);

          lastPos = links[ln].lastIndex;
        }
        if (lastPos < text.length) {
          token         = new state.Token('text', '', 0);
          token.content = text.slice(lastPos);
          token.level   = level;
          nodes.push(token);
        }

        // replace current node
        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
      }
    }
  }
};


/***/ }),

/***/ "9c12":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Code block (4 spaces padded)




module.exports = function code(state, startLine, endLine/*, silent*/) {
  var nextLine, last, token;

  if (state.sCount[startLine] - state.blkIndent < 4) { return false; }

  last = nextLine = startLine + 1;

  while (nextLine < endLine) {
    if (state.isEmpty(nextLine)) {
      nextLine++;
      continue;
    }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      nextLine++;
      last = nextLine;
      continue;
    }
    break;
  }

  state.line = last;

  token         = state.push('code_block', 'code', 0);
  token.content = state.getLines(startLine, last, 4 + state.blkIndent, true);
  token.map     = [ startLine, state.line ];

  return true;
};


/***/ }),

/***/ "a124":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function inline(state) {
  var tokens = state.tokens, tok, i, l;

  // Parse inlines
  for (i = 0, l = tokens.length; i < l; i++) {
    tok = tokens[i];
    if (tok.type === 'inline') {
      state.md.inline.parse(tok.content, state.md, state.env, tok.children);
    }
  }
};


/***/ }),

/***/ "a656":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a7bc":
/***/ (function(module, exports) {

module.exports=/[\0-\x1F\x7F-\x9F]/

/***/ }),

/***/ "a915":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** internal
 * class Core
 *
 * Top-level rules executor. Glues block/inline parsers and does intermediate
 * transformations.
 **/



var Ruler  = __webpack_require__("4883");


var _rules = [
  [ 'normalize',      __webpack_require__("4c26")      ],
  [ 'block',          __webpack_require__("3408")          ],
  [ 'inline',         __webpack_require__("a124")         ],
  [ 'linkify',        __webpack_require__("9921")        ],
  [ 'replacements',   __webpack_require__("bb4a")   ],
  [ 'smartquotes',    __webpack_require__("af30")    ]
];


/**
 * new Core()
 **/
function Core() {
  /**
   * Core#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of core rules.
   **/
  this.ruler = new Ruler();

  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }
}


/**
 * Core.process(state)
 *
 * Executes core chain rules.
 **/
Core.prototype.process = function (state) {
  var i, l, rules;

  rules = this.ruler.getRules('');

  for (i = 0, l = rules.length; i < l; i++) {
    rules[i](state);
  }
};

Core.prototype.State = __webpack_require__("7133");


module.exports = Core;


/***/ }),

/***/ "acaf":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "af30":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Convert straight quotation marks to typographic ones
//



var isWhiteSpace   = __webpack_require__("0068").isWhiteSpace;
var isPunctChar    = __webpack_require__("0068").isPunctChar;
var isMdAsciiPunct = __webpack_require__("0068").isMdAsciiPunct;

var QUOTE_TEST_RE = /['"]/;
var QUOTE_RE = /['"]/g;
var APOSTROPHE = '\u2019'; /* ’ */


function replaceAt(str, index, ch) {
  return str.substr(0, index) + ch + str.substr(index + 1);
}

function process_inlines(tokens, state) {
  var i, token, text, t, pos, max, thisLevel, item, lastChar, nextChar,
      isLastPunctChar, isNextPunctChar, isLastWhiteSpace, isNextWhiteSpace,
      canOpen, canClose, j, isSingle, stack, openQuote, closeQuote;

  stack = [];

  for (i = 0; i < tokens.length; i++) {
    token = tokens[i];

    thisLevel = tokens[i].level;

    for (j = stack.length - 1; j >= 0; j--) {
      if (stack[j].level <= thisLevel) { break; }
    }
    stack.length = j + 1;

    if (token.type !== 'text') { continue; }

    text = token.content;
    pos = 0;
    max = text.length;

    /*eslint no-labels:0,block-scoped-var:0*/
    OUTER:
    while (pos < max) {
      QUOTE_RE.lastIndex = pos;
      t = QUOTE_RE.exec(text);
      if (!t) { break; }

      canOpen = canClose = true;
      pos = t.index + 1;
      isSingle = (t[0] === "'");

      // Find previous character,
      // default to space if it's the beginning of the line
      //
      lastChar = 0x20;

      if (t.index - 1 >= 0) {
        lastChar = text.charCodeAt(t.index - 1);
      } else {
        for (j = i - 1; j >= 0; j--) {
          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // lastChar defaults to 0x20
          if (tokens[j].type !== 'text') continue;

          lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
          break;
        }
      }

      // Find next character,
      // default to space if it's the end of the line
      //
      nextChar = 0x20;

      if (pos < max) {
        nextChar = text.charCodeAt(pos);
      } else {
        for (j = i + 1; j < tokens.length; j++) {
          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // nextChar defaults to 0x20
          if (tokens[j].type !== 'text') continue;

          nextChar = tokens[j].content.charCodeAt(0);
          break;
        }
      }

      isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
      isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

      isLastWhiteSpace = isWhiteSpace(lastChar);
      isNextWhiteSpace = isWhiteSpace(nextChar);

      if (isNextWhiteSpace) {
        canOpen = false;
      } else if (isNextPunctChar) {
        if (!(isLastWhiteSpace || isLastPunctChar)) {
          canOpen = false;
        }
      }

      if (isLastWhiteSpace) {
        canClose = false;
      } else if (isLastPunctChar) {
        if (!(isNextWhiteSpace || isNextPunctChar)) {
          canClose = false;
        }
      }

      if (nextChar === 0x22 /* " */ && t[0] === '"') {
        if (lastChar >= 0x30 /* 0 */ && lastChar <= 0x39 /* 9 */) {
          // special case: 1"" - count first quote as an inch
          canClose = canOpen = false;
        }
      }

      if (canOpen && canClose) {
        // treat this as the middle of the word
        canOpen = false;
        canClose = isNextPunctChar;
      }

      if (!canOpen && !canClose) {
        // middle of word
        if (isSingle) {
          token.content = replaceAt(token.content, t.index, APOSTROPHE);
        }
        continue;
      }

      if (canClose) {
        // this could be a closing quote, rewind the stack to get a match
        for (j = stack.length - 1; j >= 0; j--) {
          item = stack[j];
          if (stack[j].level < thisLevel) { break; }
          if (item.single === isSingle && stack[j].level === thisLevel) {
            item = stack[j];

            if (isSingle) {
              openQuote = state.md.options.quotes[2];
              closeQuote = state.md.options.quotes[3];
            } else {
              openQuote = state.md.options.quotes[0];
              closeQuote = state.md.options.quotes[1];
            }

            // replace token.content *before* tokens[item.token].content,
            // because, if they are pointing at the same token, replaceAt
            // could mess up indices when quote length != 1
            token.content = replaceAt(token.content, t.index, closeQuote);
            tokens[item.token].content = replaceAt(
              tokens[item.token].content, item.pos, openQuote);

            pos += closeQuote.length - 1;
            if (item.token === i) { pos += openQuote.length - 1; }

            text = token.content;
            max = text.length;

            stack.length = j;
            continue OUTER;
          }
        }
      }

      if (canOpen) {
        stack.push({
          token: i,
          pos: t.index,
          single: isSingle,
          level: thisLevel
        });
      } else if (canClose && isSingle) {
        token.content = replaceAt(token.content, t.index, APOSTROPHE);
      }
    }
  }
}


module.exports = function smartquotes(state) {
  /*eslint max-depth:0*/
  var blkIdx;

  if (!state.md.options.typographer) { return; }

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

    if (state.tokens[blkIdx].type !== 'inline' ||
        !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
      continue;
    }

    process_inlines(state.tokens[blkIdx].children, state);
  }
};


/***/ }),

/***/ "b117":
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = function (opts) {
  var re = {};

  // Use direct extract instead of `regenerate` to reduse browserified size
  re.src_Any = __webpack_require__("cbc7").source;
  re.src_Cc  = __webpack_require__("a7bc").source;
  re.src_Z   = __webpack_require__("4fc2").source;
  re.src_P   = __webpack_require__("7ca0").source;

  // \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)
  re.src_ZPCc = [ re.src_Z, re.src_P, re.src_Cc ].join('|');

  // \p{\Z\Cc} (white spaces + control)
  re.src_ZCc = [ re.src_Z, re.src_Cc ].join('|');

  // Experimental. List of chars, completely prohibited in links
  // because can separate it from other part of text
  var text_separators = '[><\uff5c]';

  // All possible word characters (everything without punctuation, spaces & controls)
  // Defined via punctuation & spaces to save space
  // Should be something like \p{\L\N\S\M} (\w but without `_`)
  re.src_pseudo_letter       = '(?:(?!' + text_separators + '|' + re.src_ZPCc + ')' + re.src_Any + ')';
  // The same as abothe but without [0-9]
  // var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';

  ////////////////////////////////////////////////////////////////////////////////

  re.src_ip4 =

    '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

  // Prohibit any of "@/[]()" in user/pass to avoid wrong domain fetch.
  re.src_auth    = '(?:(?:(?!' + re.src_ZCc + '|[@/\\[\\]()]).)+@)?';

  re.src_port =

    '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';

  re.src_host_terminator =

    '(?=$|' + text_separators + '|' + re.src_ZPCc + ')(?!-|_|:\\d|\\.-|\\.(?!$|' + re.src_ZPCc + '))';

  re.src_path =

    '(?:' +
      '[/?#]' +
        '(?:' +
          '(?!' + re.src_ZCc + '|' + text_separators + '|[()[\\]{}.,"\'?!\\-]).|' +
          '\\[(?:(?!' + re.src_ZCc + '|\\]).)*\\]|' +
          '\\((?:(?!' + re.src_ZCc + '|[)]).)*\\)|' +
          '\\{(?:(?!' + re.src_ZCc + '|[}]).)*\\}|' +
          '\\"(?:(?!' + re.src_ZCc + '|["]).)+\\"|' +
          "\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|" +
          "\\'(?=" + re.src_pseudo_letter + '|[-]).|' +  // allow `I'm_king` if no pair found
          '\\.{2,4}[a-zA-Z0-9%/]|' + // github has ... in commit range links,
                                     // google has .... in links (issue #66)
                                     // Restrict to
                                     // - english
                                     // - percent-encoded
                                     // - parts of file path
                                     // until more examples found.
          '\\.(?!' + re.src_ZCc + '|[.]).|' +
          (opts && opts['---'] ?
            '\\-(?!--(?:[^-]|$))(?:-*)|' // `---` => long dash, terminate
            :
            '\\-+|'
          ) +
          '\\,(?!' + re.src_ZCc + ').|' +      // allow `,,,` in paths
          '\\!(?!' + re.src_ZCc + '|[!]).|' +
          '\\?(?!' + re.src_ZCc + '|[?]).' +
        ')+' +
      '|\\/' +
    ')?';

  // Allow anything in markdown spec, forbid quote (") at the first position
  // because emails enclosed in quotes are far more common
  re.src_email_name =

    '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';

  re.src_xn =

    'xn--[a-z0-9\\-]{1,59}';

  // More to read about domain names
  // http://serverfault.com/questions/638260/

  re.src_domain_root =

    // Allow letters & digits (http://test1)
    '(?:' +
      re.src_xn +
      '|' +
      re.src_pseudo_letter + '{1,63}' +
    ')';

  re.src_domain =

    '(?:' +
      re.src_xn +
      '|' +
      '(?:' + re.src_pseudo_letter + ')' +
      '|' +
      '(?:' + re.src_pseudo_letter + '(?:-|' + re.src_pseudo_letter + '){0,61}' + re.src_pseudo_letter + ')' +
    ')';

  re.src_host =

    '(?:' +
    // Don't need IP check, because digits are already allowed in normal domain names
    //   src_ip4 +
    // '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)*' + re.src_domain/*_root*/ + ')' +
    ')';

  re.tpl_host_fuzzy =

    '(?:' +
      re.src_ip4 +
    '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))' +
    ')';

  re.tpl_host_no_ip_fuzzy =

    '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))';

  re.src_host_strict =

    re.src_host + re.src_host_terminator;

  re.tpl_host_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_host_terminator;

  re.src_host_port_strict =

    re.src_host + re.src_port + re.src_host_terminator;

  re.tpl_host_port_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;

  re.tpl_host_port_no_ip_fuzzy_strict =

    re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;


  ////////////////////////////////////////////////////////////////////////////////
  // Main rules

  // Rude test fuzzy links by host, for quick deny
  re.tpl_host_fuzzy_test =

    'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + re.src_ZPCc + '|>|$))';

  re.tpl_email_fuzzy =

      '(^|' + text_separators + '|"|\\(|' + re.src_ZCc + ')' +
      '(' + re.src_email_name + '@' + re.tpl_host_fuzzy_strict + ')';

  re.tpl_link_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_fuzzy_strict + re.src_path + ')';

  re.tpl_link_no_ip_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ')';

  return re;
};


/***/ }),

/***/ "b5b6":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "baca":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Skip text characters for text token, place those to pending buffer
// and increment current pos




// Rule to skip pure text
// '{}$%@~+=:' reserved for extentions

// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~

// !!!! Don't confuse with "Markdown ASCII Punctuation" chars
// http://spec.commonmark.org/0.15/#ascii-punctuation-character
function isTerminatorChar(ch) {
  switch (ch) {
    case 0x0A/* \n */:
    case 0x21/* ! */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2D/* - */:
    case 0x3A/* : */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true;
    default:
      return false;
  }
}

module.exports = function text(state, silent) {
  var pos = state.pos;

  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
    pos++;
  }

  if (pos === state.pos) { return false; }

  if (!silent) { state.pending += state.src.slice(state.pos, pos); }

  state.pos = pos;

  return true;
};

// Alternative implementation, for memory.
//
// It costs 10% of performance, but allows extend terminators list, if place it
// to `ParcerInline` property. Probably, will switch to it sometime, such
// flexibility required.

/*
var TERMINATOR_RE = /[\n!#$%&*+\-:<=>@[\\\]^_`{}~]/;

module.exports = function text(state, silent) {
  var pos = state.pos,
      idx = state.src.slice(pos).search(TERMINATOR_RE);

  // first char is terminator -> empty text
  if (idx === 0) { return false; }

  // no terminator -> text till end of string
  if (idx < 0) {
    if (!silent) { state.pending += state.src.slice(pos); }
    state.pos = state.src.length;
    return true;
  }

  if (!silent) { state.pending += state.src.slice(pos, pos + idx); }

  state.pos += idx;

  return true;
};*/


/***/ }),

/***/ "bb4a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Simple typographic replacements
//
// (c) (C) → ©
// (tm) (TM) → ™
// (r) (R) → ®
// +- → ±
// (p) (P) -> §
// ... → … (also ?.... → ?.., !.... → !..)
// ???????? → ???, !!!!! → !!!, `,,` → `,`
// -- → &ndash;, --- → &mdash;
//


// TODO:
// - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
// - miltiplication 2 x 4 -> 2 × 4

var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;

// Workaround for phantomjs - need regex without /g flag,
// or root check will fail every second time
var SCOPED_ABBR_TEST_RE = /\((c|tm|r|p)\)/i;

var SCOPED_ABBR_RE = /\((c|tm|r|p)\)/ig;
var SCOPED_ABBR = {
  c: '©',
  r: '®',
  p: '§',
  tm: '™'
};

function replaceFn(match, name) {
  return SCOPED_ABBR[name.toLowerCase()];
}

function replace_scoped(inlineTokens) {
  var i, token, inside_autolink = 0;

  for (i = inlineTokens.length - 1; i >= 0; i--) {
    token = inlineTokens[i];

    if (token.type === 'text' && !inside_autolink) {
      token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
    }

    if (token.type === 'link_open' && token.info === 'auto') {
      inside_autolink--;
    }

    if (token.type === 'link_close' && token.info === 'auto') {
      inside_autolink++;
    }
  }
}

function replace_rare(inlineTokens) {
  var i, token, inside_autolink = 0;

  for (i = inlineTokens.length - 1; i >= 0; i--) {
    token = inlineTokens[i];

    if (token.type === 'text' && !inside_autolink) {
      if (RARE_RE.test(token.content)) {
        token.content = token.content
          .replace(/\+-/g, '±')
          // .., ..., ....... -> …
          // but ?..... & !..... -> ?.. & !..
          .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..')
          .replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',')
          // em-dash
          .replace(/(^|[^-])---([^-]|$)/mg, '$1\u2014$2')
          // en-dash
          .replace(/(^|\s)--(\s|$)/mg, '$1\u2013$2')
          .replace(/(^|[^-\s])--([^-\s]|$)/mg, '$1\u2013$2');
      }
    }

    if (token.type === 'link_open' && token.info === 'auto') {
      inside_autolink--;
    }

    if (token.type === 'link_close' && token.info === 'auto') {
      inside_autolink++;
    }
  }
}


module.exports = function replace(state) {
  var blkIdx;

  if (!state.md.options.typographer) { return; }

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

    if (state.tokens[blkIdx].type !== 'inline') { continue; }

    if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
      replace_scoped(state.tokens[blkIdx].children);
    }

    if (RARE_RE.test(state.tokens[blkIdx].content)) {
      replace_rare(state.tokens[blkIdx].children);
    }

  }
};


/***/ }),

/***/ "bd68":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// HTML5 entities map: { name -> utf16string }
//


/*eslint quotes:0*/
module.exports = __webpack_require__("f0f2");


/***/ }),

/***/ "bf2b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// fences (``` lang, ~~~ lang)




module.exports = function fence(state, startLine, endLine, silent) {
  var marker, len, params, nextLine, mem, token, markup,
      haveEndMarker = false,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  if (pos + 3 > max) { return false; }

  marker = state.src.charCodeAt(pos);

  if (marker !== 0x7E/* ~ */ && marker !== 0x60 /* ` */) {
    return false;
  }

  // scan marker length
  mem = pos;
  pos = state.skipChars(pos, marker);

  len = pos - mem;

  if (len < 3) { return false; }

  markup = state.src.slice(mem, pos);
  params = state.src.slice(pos, max);

  if (marker === 0x60 /* ` */) {
    if (params.indexOf(String.fromCharCode(marker)) >= 0) {
      return false;
    }
  }

  // Since start is found, we can report success here in validation mode
  if (silent) { return true; }

  // search end of block
  nextLine = startLine;

  for (;;) {
    nextLine++;
    if (nextLine >= endLine) {
      // unclosed block should be autoclosed by end of document.
      // also block seems to be autoclosed by end of parent
      break;
    }

    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos < max && state.sCount[nextLine] < state.blkIndent) {
      // non-empty line with negative indent should stop the list:
      // - ```
      //  test
      break;
    }

    if (state.src.charCodeAt(pos) !== marker) { continue; }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      // closing fence should be indented less than 4 spaces
      continue;
    }

    pos = state.skipChars(pos, marker);

    // closing code fence must be at least as long as the opening one
    if (pos - mem < len) { continue; }

    // make sure tail has spaces only
    pos = state.skipSpaces(pos);

    if (pos < max) { continue; }

    haveEndMarker = true;
    // found!
    break;
  }

  // If a fence has heading spaces, they should be removed from its inner block
  len = state.sCount[startLine];

  state.line = nextLine + (haveEndMarker ? 1 : 0);

  token         = state.push('fence', 'code', 0);
  token.info    = params;
  token.content = state.getLines(startLine + 1, nextLine, len, true);
  token.markup  = markup;
  token.map     = [ startLine, state.line ];

  return true;
};


/***/ }),

/***/ "c2d8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process html tags




var HTML_TAG_RE = __webpack_require__("5706").HTML_TAG_RE;


function isLetter(ch) {
  /*eslint no-bitwise:0*/
  var lc = ch | 0x20; // to lower case
  return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */);
}


module.exports = function html_inline(state, silent) {
  var ch, match, max, token,
      pos = state.pos;

  if (!state.md.options.html) { return false; }

  // Check start
  max = state.posMax;
  if (state.src.charCodeAt(pos) !== 0x3C/* < */ ||
      pos + 2 >= max) {
    return false;
  }

  // Quick fail on second char
  ch = state.src.charCodeAt(pos + 1);
  if (ch !== 0x21/* ! */ &&
      ch !== 0x3F/* ? */ &&
      ch !== 0x2F/* / */ &&
      !isLetter(ch)) {
    return false;
  }

  match = state.src.slice(pos).match(HTML_TAG_RE);
  if (!match) { return false; }

  if (!silent) {
    token         = state.push('html_inline', '', 0);
    token.content = state.src.slice(pos, pos + match[0].length);
  }
  state.pos += match[0].length;
  return true;
};


/***/ }),

/***/ "c449":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c464":
/***/ (function(module, exports, __webpack_require__) {

"use strict";




var encodeCache = {};


// Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//
function getEncodeCache(exclude) {
  var i, ch, cache = encodeCache[exclude];
  if (cache) { return cache; }

  cache = encodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache;
}


// Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//
function encode(string, exclude, keepEscaped) {
  var i, l, code, nextCode, cache,
      result = '';

  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped  = exclude;
    exclude = encode.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  cache = getEncodeCache(exclude);

  for (i = 0, l = string.length; i < l; i++) {
    code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }

    if (code < 128) {
      result += cache[code];
      continue;
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        nextCode = string.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }
      result += '%EF%BF%BD';
      continue;
    }

    result += encodeURIComponent(string[i]);
  }

  return result;
}

encode.defaultChars   = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";


module.exports = encode;


/***/ }),

/***/ "c8a9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process *this* and _that_
//



// Insert each marker as a separate text token, and add it to delimiter list
//
module.exports.tokenize = function emphasis(state, silent) {
  var i, scanned, token,
      start = state.pos,
      marker = state.src.charCodeAt(start);

  if (silent) { return false; }

  if (marker !== 0x5F /* _ */ && marker !== 0x2A /* * */) { return false; }

  scanned = state.scanDelims(state.pos, marker === 0x2A);

  for (i = 0; i < scanned.length; i++) {
    token         = state.push('text', '', 0);
    token.content = String.fromCharCode(marker);

    state.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: marker,

      // Total length of these series of delimiters.
      //
      length: scanned.length,

      // An amount of characters before this one that's equivalent to
      // current one. In plain English: if this delimiter does not open
      // an emphasis, neither do previous `jump` characters.
      //
      // Used to skip sequences like "*****" in one step, for 1st asterisk
      // value will be 0, for 2nd it's 1 and so on.
      //
      jump:   i,

      // A position of the token this delimiter corresponds to.
      //
      token:  state.tokens.length - 1,

      // Token level.
      //
      level:  state.level,

      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end:    -1,

      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open:   scanned.can_open,
      close:  scanned.can_close
    });
  }

  state.pos += scanned.length;

  return true;
};


// Walk through delimiter list and replace text tokens with tags
//
module.exports.postProcess = function emphasis(state) {
  var i,
      startDelim,
      endDelim,
      token,
      ch,
      isStrong,
      delimiters = state.delimiters,
      max = state.delimiters.length;

  for (i = max - 1; i >= 0; i--) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x5F/* _ */ && startDelim.marker !== 0x2A/* * */) {
      continue;
    }

    // Process only opening markers
    if (startDelim.end === -1) {
      continue;
    }

    endDelim = delimiters[startDelim.end];

    // If the previous delimiter has the same marker and is adjacent to this one,
    // merge those into one strong delimiter.
    //
    // `<em><em>whatever</em></em>` -> `<strong>whatever</strong>`
    //
    isStrong = i > 0 &&
               delimiters[i - 1].end === startDelim.end + 1 &&
               delimiters[i - 1].token === startDelim.token - 1 &&
               delimiters[startDelim.end + 1].token === endDelim.token + 1 &&
               delimiters[i - 1].marker === startDelim.marker;

    ch = String.fromCharCode(startDelim.marker);

    token         = state.tokens[startDelim.token];
    token.type    = isStrong ? 'strong_open' : 'em_open';
    token.tag     = isStrong ? 'strong' : 'em';
    token.nesting = 1;
    token.markup  = isStrong ? ch + ch : ch;
    token.content = '';

    token         = state.tokens[endDelim.token];
    token.type    = isStrong ? 'strong_close' : 'em_close';
    token.tag     = isStrong ? 'strong' : 'em';
    token.nesting = -1;
    token.markup  = isStrong ? ch + ch : ch;
    token.content = '';

    if (isStrong) {
      state.tokens[delimiters[i - 1].token].content = '';
      state.tokens[delimiters[startDelim.end + 1].token].content = '';
      i--;
    }
  }
};


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "cbc7":
/***/ (function(module, exports) {

module.exports=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/

/***/ }),

/***/ "cd0f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process [link](<to> "stuff")



var normalizeReference   = __webpack_require__("0068").normalizeReference;
var isSpace              = __webpack_require__("0068").isSpace;


module.exports = function link(state, silent) {
  var attrs,
      code,
      label,
      labelEnd,
      labelStart,
      pos,
      res,
      ref,
      title,
      token,
      href = '',
      oldPos = state.pos,
      max = state.posMax,
      start = state.pos,
      parseReference = true;

  if (state.src.charCodeAt(state.pos) !== 0x5B/* [ */) { return false; }

  labelStart = state.pos + 1;
  labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) { return false; }

  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
    //
    // Inline link
    //

    // might have found a valid shortcut link, disable reference parsing
    parseReference = false;

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) { break; }
    }
    if (pos >= max) { return false; }

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }
    }

    // [link](  <href>  "title"  )
    //                ^^ skipping these spaces
    start = pos;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) { break; }
    }

    // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title
    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;

      // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace(code) && code !== 0x0A) { break; }
      }
    } else {
      title = '';
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      // parsing a valid shortcut link failed, fallback to reference
      parseReference = true;
    }
    pos++;
  }

  if (parseReference) {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') { return false; }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) { label = state.src.slice(labelStart, labelEnd); }

    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;

    token        = state.push('link_open', 'a', 1);
    token.attrs  = attrs = [ [ 'href', href ] ];
    if (title) {
      attrs.push([ 'title', title ]);
    }

    state.md.inline.tokenize(state);

    token        = state.push('link_close', 'a', -1);
  }

  state.pos = pos;
  state.posMax = max;
  return true;
};


/***/ }),

/***/ "d3cc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseToolbar_vue_vue_type_style_index_0_id_4c47c81b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("554a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseToolbar_vue_vue_type_style_index_0_id_4c47c81b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseToolbar_vue_vue_type_style_index_0_id_4c47c81b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseToolbar_vue_vue_type_style_index_0_id_4c47c81b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "d4cd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = __webpack_require__("08ae");


/***/ }),

/***/ "d5d1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.Any = __webpack_require__("cbc7");
exports.Cc  = __webpack_require__("a7bc");
exports.Cf  = __webpack_require__("6fd1");
exports.P   = __webpack_require__("7ca0");
exports.Z   = __webpack_require__("4fc2");


/***/ }),

/***/ "d670":
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var normalizeReference   = __webpack_require__("0068").normalizeReference;
var isSpace              = __webpack_require__("0068").isSpace;


module.exports = function reference(state, startLine, _endLine, silent) {
  var ch,
      destEndPos,
      destEndLineNo,
      endLine,
      href,
      i,
      l,
      label,
      labelEnd,
      oldParentType,
      res,
      start,
      str,
      terminate,
      terminatorRules,
      title,
      lines = 0,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine],
      nextLine = startLine + 1;

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  if (state.src.charCodeAt(pos) !== 0x5B/* [ */) { return false; }

  // Simple check to quickly interrupt scan on [link](url) at the start of line.
  // Can be useful on practice: https://github.com/markdown-it/markdown-it/issues/54
  while (++pos < max) {
    if (state.src.charCodeAt(pos) === 0x5D /* ] */ &&
        state.src.charCodeAt(pos - 1) !== 0x5C/* \ */) {
      if (pos + 1 === max) { return false; }
      if (state.src.charCodeAt(pos + 1) !== 0x3A/* : */) { return false; }
      break;
    }
  }

  endLine = state.lineMax;

  // jump line-by-line until empty one or EOF
  terminatorRules = state.md.block.ruler.getRules('reference');

  oldParentType = state.parentType;
  state.parentType = 'reference';

  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue; }

    // Some tags can terminate paragraph without empty line.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }
  }

  str = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  max = str.length;

  for (pos = 1; pos < max; pos++) {
    ch = str.charCodeAt(pos);
    if (ch === 0x5B /* [ */) {
      return false;
    } else if (ch === 0x5D /* ] */) {
      labelEnd = pos;
      break;
    } else if (ch === 0x0A /* \n */) {
      lines++;
    } else if (ch === 0x5C /* \ */) {
      pos++;
      if (pos < max && str.charCodeAt(pos) === 0x0A) {
        lines++;
      }
    }
  }

  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A/* : */) { return false; }

  // [label]:   destination   'title'
  //         ^^^ skip optional whitespace here
  for (pos = labelEnd + 2; pos < max; pos++) {
    ch = str.charCodeAt(pos);
    if (ch === 0x0A) {
      lines++;
    } else if (isSpace(ch)) {
      /*eslint no-empty:0*/
    } else {
      break;
    }
  }

  // [label]:   destination   'title'
  //            ^^^^^^^^^^^ parse this
  res = state.md.helpers.parseLinkDestination(str, pos, max);
  if (!res.ok) { return false; }

  href = state.md.normalizeLink(res.str);
  if (!state.md.validateLink(href)) { return false; }

  pos = res.pos;
  lines += res.lines;

  // save cursor state, we could require to rollback later
  destEndPos = pos;
  destEndLineNo = lines;

  // [label]:   destination   'title'
  //                       ^^^ skipping those spaces
  start = pos;
  for (; pos < max; pos++) {
    ch = str.charCodeAt(pos);
    if (ch === 0x0A) {
      lines++;
    } else if (isSpace(ch)) {
      /*eslint no-empty:0*/
    } else {
      break;
    }
  }

  // [label]:   destination   'title'
  //                          ^^^^^^^ parse this
  res = state.md.helpers.parseLinkTitle(str, pos, max);
  if (pos < max && start !== pos && res.ok) {
    title = res.str;
    pos = res.pos;
    lines += res.lines;
  } else {
    title = '';
    pos = destEndPos;
    lines = destEndLineNo;
  }

  // skip trailing spaces until the rest of the line
  while (pos < max) {
    ch = str.charCodeAt(pos);
    if (!isSpace(ch)) { break; }
    pos++;
  }

  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
    if (title) {
      // garbage at the end of the line after title,
      // but it could still be a valid reference if we roll back
      title = '';
      pos = destEndPos;
      lines = destEndLineNo;
      while (pos < max) {
        ch = str.charCodeAt(pos);
        if (!isSpace(ch)) { break; }
        pos++;
      }
    }
  }

  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
    // garbage at the end of the line
    return false;
  }

  label = normalizeReference(str.slice(1, labelEnd));
  if (!label) {
    // CommonMark 0.20 disallows empty labels
    return false;
  }

  // Reference can not terminate anything. This check is for safety only.
  /*istanbul ignore if*/
  if (silent) { return true; }

  if (typeof state.env.references === 'undefined') {
    state.env.references = {};
  }
  if (typeof state.env.references[label] === 'undefined') {
    state.env.references[label] = { title: title, href: href };
  }

  state.parentType = oldParentType;

  state.line = startLine + lines + 1;
  return true;
};


/***/ }),

/***/ "d8a6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports.encode = __webpack_require__("c464");
module.exports.decode = __webpack_require__("8f37");
module.exports.format = __webpack_require__("43e0");
module.exports.parse  = __webpack_require__("da5f");


/***/ }),

/***/ "d925":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BasePropChip_vue_vue_type_style_index_0_id_458a3e12_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("655d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BasePropChip_vue_vue_type_style_index_0_id_458a3e12_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BasePropChip_vue_vue_type_style_index_0_id_458a3e12_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_build_utils_global_vue_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BasePropChip_vue_vue_type_style_index_0_id_458a3e12_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "da5f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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



//
// Changes from joyent/node:
//
// 1. No leading slash in paths,
//    e.g. in `url.parse('http://foo?bar')` pathname is ``, not `/`
//
// 2. Backslashes are not replaced with slashes,
//    so `http:\\example.org\` is treated like a relative path
//
// 3. Trailing colon is treated like a part of the path,
//    i.e. in `http://example.org:foo` pathname is `:foo`
//
// 4. Nothing is URL-encoded in the resulting object,
//    (in joyent/node some chars in auth and paths are encoded)
//
// 5. `url.parse()` does not have `parseQueryString` argument
//
// 6. Removed extraneous result properties: `host`, `path`, `query`, etc.,
//    which can be constructed using other parts of the url.
//


function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.pathname = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = [ '<', '>', '"', '`', ' ', '\r', '\n', '\t' ],

    // RFC 2396: characters not allowed for various reasons.
    unwise = [ '{', '}', '|', '\\', '^', '`' ].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = [ '\'' ].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = [ '%', '/', '?', ';', '#' ].concat(autoEscape),
    hostEndingChars = [ '/', '?', '#' ],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    /* eslint-disable no-script-url */
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    };
    /* eslint-enable no-script-url */

function urlParse(url, slashesDenoteHost) {
  if (url && url instanceof Url) { return url; }

  var u = new Url();
  u.parse(url, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, slashesDenoteHost) {
  var i, l, lowerProto, hec, slashes,
      rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    lowerProto = proto.toLowerCase();
    this.protocol = proto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (i = 0; i < hostEndingChars.length; i++) {
      hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = auth;
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (i = 0; i < nonHostChars.length; i++) {
      hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1) {
      hostEnd = rest.length;
    }

    if (rest[hostEnd - 1] === ':') { hostEnd--; }
    var host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost(host);

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) { continue; }
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    }

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
    }
  }

  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    rest = rest.slice(0, qm);
  }
  if (rest) { this.pathname = rest; }
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '';
  }

  return this;
};

Url.prototype.parseHost = function(host) {
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) { this.hostname = host; }
};

module.exports = urlParse;


/***/ }),

/***/ "df56":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Parse link label
//
// this function assumes that first character ("[") already matches;
// returns the end of the label
//


module.exports = function parseLinkLabel(state, start, disableNested) {
  var level, found, marker, prevPos,
      labelEnd = -1,
      max = state.posMax,
      oldPos = state.pos;

  state.pos = start + 1;
  level = 1;

  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 0x5D /* ] */) {
      level--;
      if (level === 0) {
        found = true;
        break;
      }
    }

    prevPos = state.pos;
    state.md.inline.skipToken(state);
    if (marker === 0x5B /* [ */) {
      if (prevPos === state.pos - 1) {
        // increase level if we find text `[`, which is not a part of any token
        level++;
      } else if (disableNested) {
        state.pos = oldPos;
        return -1;
      }
    }
  }

  if (found) {
    labelEnd = state.pos;
  }

  // restore old state
  state.pos = oldPos;

  return labelEnd;
};


/***/ }),

/***/ "e1f3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// List of valid html blocks names, accorting to commonmark spec
// http://jgm.github.io/CommonMark/spec.html#html-blocks




module.exports = [
  'address',
  'article',
  'aside',
  'base',
  'basefont',
  'blockquote',
  'body',
  'caption',
  'center',
  'col',
  'colgroup',
  'dd',
  'details',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'iframe',
  'legend',
  'li',
  'link',
  'main',
  'menu',
  'menuitem',
  'meta',
  'nav',
  'noframes',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'section',
  'source',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'ul'
];


/***/ }),

/***/ "e4ca":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Parse link destination
//



var unescapeAll = __webpack_require__("0068").unescapeAll;


module.exports = function parseLinkDestination(str, pos, max) {
  var code, level,
      lines = 0,
      start = pos,
      result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ''
      };

  if (str.charCodeAt(pos) === 0x3C /* < */) {
    pos++;
    while (pos < max) {
      code = str.charCodeAt(pos);
      if (code === 0x0A /* \n */) { return result; }
      if (code === 0x3E /* > */) {
        result.pos = pos + 1;
        result.str = unescapeAll(str.slice(start + 1, pos));
        result.ok = true;
        return result;
      }
      if (code === 0x5C /* \ */ && pos + 1 < max) {
        pos += 2;
        continue;
      }

      pos++;
    }

    // no closing '>'
    return result;
  }

  // this should be ... } else { ... branch

  level = 0;
  while (pos < max) {
    code = str.charCodeAt(pos);

    if (code === 0x20) { break; }

    // ascii control characters
    if (code < 0x20 || code === 0x7F) { break; }

    if (code === 0x5C /* \ */ && pos + 1 < max) {
      pos += 2;
      continue;
    }

    if (code === 0x28 /* ( */) {
      level++;
    }

    if (code === 0x29 /* ) */) {
      if (level === 0) { break; }
      level--;
    }

    pos++;
  }

  if (start === pos) { return result; }
  if (level !== 0) { return result; }

  result.str = unescapeAll(str.slice(start, pos));
  result.lines = lines;
  result.pos = pos;
  result.ok = true;
  return result;
};


/***/ }),

/***/ "e6f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process footnotes
//


////////////////////////////////////////////////////////////////////////////////
// Renderer partials

function render_footnote_anchor_name(tokens, idx, options, env/*, slf*/) {
  var n = Number(tokens[idx].meta.id + 1).toString();
  var prefix = '';

  if (typeof env.docId === 'string') {
    prefix = '-' + env.docId + '-';
  }

  return prefix + n;
}

function render_footnote_caption(tokens, idx/*, options, env, slf*/) {
  var n = Number(tokens[idx].meta.id + 1).toString();

  if (tokens[idx].meta.subId > 0) {
    n += ':' + tokens[idx].meta.subId;
  }

  return '[' + n + ']';
}

function render_footnote_ref(tokens, idx, options, env, slf) {
  var id      = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
  var caption = slf.rules.footnote_caption(tokens, idx, options, env, slf);
  var refid   = id;

  if (tokens[idx].meta.subId > 0) {
    refid += ':' + tokens[idx].meta.subId;
  }

  return '<sup class="footnote-ref"><a href="#fn' + id + '" id="fnref' + refid + '">' + caption + '</a></sup>';
}

function render_footnote_block_open(tokens, idx, options) {
  return (options.xhtmlOut ? '<hr class="footnotes-sep" />\n' : '<hr class="footnotes-sep">\n') +
         '<section class="footnotes">\n' +
         '<ol class="footnotes-list">\n';
}

function render_footnote_block_close() {
  return '</ol>\n</section>\n';
}

function render_footnote_open(tokens, idx, options, env, slf) {
  var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);

  if (tokens[idx].meta.subId > 0) {
    id += ':' + tokens[idx].meta.subId;
  }

  return '<li id="fn' + id + '" class="footnote-item">';
}

function render_footnote_close() {
  return '</li>\n';
}

function render_footnote_anchor(tokens, idx, options, env, slf) {
  var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);

  if (tokens[idx].meta.subId > 0) {
    id += ':' + tokens[idx].meta.subId;
  }

  /* ↩ with escape code to prevent display as Apple Emoji on iOS */
  return ' <a href="#fnref' + id + '" class="footnote-backref">\u21a9\uFE0E</a>';
}


module.exports = function footnote_plugin(md) {
  var parseLinkLabel = md.helpers.parseLinkLabel,
      isSpace = md.utils.isSpace;

  md.renderer.rules.footnote_ref          = render_footnote_ref;
  md.renderer.rules.footnote_block_open   = render_footnote_block_open;
  md.renderer.rules.footnote_block_close  = render_footnote_block_close;
  md.renderer.rules.footnote_open         = render_footnote_open;
  md.renderer.rules.footnote_close        = render_footnote_close;
  md.renderer.rules.footnote_anchor       = render_footnote_anchor;

  // helpers (only used in other rules, no tokens are attached to those)
  md.renderer.rules.footnote_caption      = render_footnote_caption;
  md.renderer.rules.footnote_anchor_name  = render_footnote_anchor_name;

  // Process footnote block definition
  function footnote_def(state, startLine, endLine, silent) {
    var oldBMark, oldTShift, oldSCount, oldParentType, pos, label, token,
        initial, offset, ch, posAfterColon,
        start = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    // line should be at least 5 chars - "[^x]:"
    if (start + 4 > max) { return false; }

    if (state.src.charCodeAt(start) !== 0x5B/* [ */) { return false; }
    if (state.src.charCodeAt(start + 1) !== 0x5E/* ^ */) { return false; }

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) { return false; }
      if (state.src.charCodeAt(pos) === 0x5D /* ] */) {
        break;
      }
    }

    if (pos === start + 2) { return false; } // no empty footnote labels
    if (pos + 1 >= max || state.src.charCodeAt(++pos) !== 0x3A /* : */) { return false; }
    if (silent) { return true; }
    pos++;

    if (!state.env.footnotes) { state.env.footnotes = {}; }
    if (!state.env.footnotes.refs) { state.env.footnotes.refs = {}; }
    label = state.src.slice(start + 2, pos - 2);
    state.env.footnotes.refs[':' + label] = -1;

    token       = new state.Token('footnote_reference_open', '', 1);
    token.meta  = { label: label };
    token.level = state.level++;
    state.tokens.push(token);

    oldBMark = state.bMarks[startLine];
    oldTShift = state.tShift[startLine];
    oldSCount = state.sCount[startLine];
    oldParentType = state.parentType;

    posAfterColon = pos;
    initial = offset = state.sCount[startLine] + pos - (state.bMarks[startLine] + state.tShift[startLine]);

    while (pos < max) {
      ch = state.src.charCodeAt(pos);

      if (isSpace(ch)) {
        if (ch === 0x09) {
          offset += 4 - offset % 4;
        } else {
          offset++;
        }
      } else {
        break;
      }

      pos++;
    }

    state.tShift[startLine] = pos - posAfterColon;
    state.sCount[startLine] = offset - initial;

    state.bMarks[startLine] = posAfterColon;
    state.blkIndent += 4;
    state.parentType = 'footnote';

    if (state.sCount[startLine] < state.blkIndent) {
      state.sCount[startLine] += state.blkIndent;
    }

    state.md.block.tokenize(state, startLine, endLine, true);

    state.parentType = oldParentType;
    state.blkIndent -= 4;
    state.tShift[startLine] = oldTShift;
    state.sCount[startLine] = oldSCount;
    state.bMarks[startLine] = oldBMark;

    token       = new state.Token('footnote_reference_close', '', -1);
    token.level = --state.level;
    state.tokens.push(token);

    return true;
  }

  // Process inline footnotes (^[...])
  function footnote_inline(state, silent) {
    var labelStart,
        labelEnd,
        footnoteId,
        token,
        tokens,
        max = state.posMax,
        start = state.pos;

    if (start + 2 >= max) { return false; }
    if (state.src.charCodeAt(start) !== 0x5E/* ^ */) { return false; }
    if (state.src.charCodeAt(start + 1) !== 0x5B/* [ */) { return false; }

    labelStart = start + 2;
    labelEnd = parseLinkLabel(state, start + 1);

    // parser failed to find ']', so it's not a valid note
    if (labelEnd < 0) { return false; }

    // We found the end of the link, and know for a fact it's a valid link;
    // so all that's left to do is to call tokenizer.
    //
    if (!silent) {
      if (!state.env.footnotes) { state.env.footnotes = {}; }
      if (!state.env.footnotes.list) { state.env.footnotes.list = []; }
      footnoteId = state.env.footnotes.list.length;

      state.md.inline.parse(
        state.src.slice(labelStart, labelEnd),
        state.md,
        state.env,
        tokens = []
      );

      token      = state.push('footnote_ref', '', 0);
      token.meta = { id: footnoteId };

      state.env.footnotes.list[footnoteId] = {
        content: state.src.slice(labelStart, labelEnd),
        tokens: tokens
      };
    }

    state.pos = labelEnd + 1;
    state.posMax = max;
    return true;
  }

  // Process footnote references ([^...])
  function footnote_ref(state, silent) {
    var label,
        pos,
        footnoteId,
        footnoteSubId,
        token,
        max = state.posMax,
        start = state.pos;

    // should be at least 4 chars - "[^x]"
    if (start + 3 > max) { return false; }

    if (!state.env.footnotes || !state.env.footnotes.refs) { return false; }
    if (state.src.charCodeAt(start) !== 0x5B/* [ */) { return false; }
    if (state.src.charCodeAt(start + 1) !== 0x5E/* ^ */) { return false; }

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) { return false; }
      if (state.src.charCodeAt(pos) === 0x0A) { return false; }
      if (state.src.charCodeAt(pos) === 0x5D /* ] */) {
        break;
      }
    }

    if (pos === start + 2) { return false; } // no empty footnote labels
    if (pos >= max) { return false; }
    pos++;

    label = state.src.slice(start + 2, pos - 1);
    if (typeof state.env.footnotes.refs[':' + label] === 'undefined') { return false; }

    if (!silent) {
      if (!state.env.footnotes.list) { state.env.footnotes.list = []; }

      if (state.env.footnotes.refs[':' + label] < 0) {
        footnoteId = state.env.footnotes.list.length;
        state.env.footnotes.list[footnoteId] = { label: label, count: 0 };
        state.env.footnotes.refs[':' + label] = footnoteId;
      } else {
        footnoteId = state.env.footnotes.refs[':' + label];
      }

      footnoteSubId = state.env.footnotes.list[footnoteId].count;
      state.env.footnotes.list[footnoteId].count++;

      token      = state.push('footnote_ref', '', 0);
      token.meta = { id: footnoteId, subId: footnoteSubId, label: label };
    }

    state.pos = pos;
    state.posMax = max;
    return true;
  }

  // Glue footnote tokens to end of token stream
  function footnote_tail(state) {
    var i, l, j, t, lastParagraph, list, token, tokens, current, currentLabel,
        insideRef = false,
        refTokens = {};

    if (!state.env.footnotes) { return; }

    state.tokens = state.tokens.filter(function (tok) {
      if (tok.type === 'footnote_reference_open') {
        insideRef = true;
        current = [];
        currentLabel = tok.meta.label;
        return false;
      }
      if (tok.type === 'footnote_reference_close') {
        insideRef = false;
        // prepend ':' to avoid conflict with Object.prototype members
        refTokens[':' + currentLabel] = current;
        return false;
      }
      if (insideRef) { current.push(tok); }
      return !insideRef;
    });

    if (!state.env.footnotes.list) { return; }
    list = state.env.footnotes.list;

    token = new state.Token('footnote_block_open', '', 1);
    state.tokens.push(token);

    for (i = 0, l = list.length; i < l; i++) {
      token      = new state.Token('footnote_open', '', 1);
      token.meta = { id: i, label: list[i].label };
      state.tokens.push(token);

      if (list[i].tokens) {
        tokens = [];

        token          = new state.Token('paragraph_open', 'p', 1);
        token.block    = true;
        tokens.push(token);

        token          = new state.Token('inline', '', 0);
        token.children = list[i].tokens;
        token.content  = list[i].content;
        tokens.push(token);

        token          = new state.Token('paragraph_close', 'p', -1);
        token.block    = true;
        tokens.push(token);

      } else if (list[i].label) {
        tokens = refTokens[':' + list[i].label];
      }

      state.tokens = state.tokens.concat(tokens);
      if (state.tokens[state.tokens.length - 1].type === 'paragraph_close') {
        lastParagraph = state.tokens.pop();
      } else {
        lastParagraph = null;
      }

      t = list[i].count > 0 ? list[i].count : 1;
      for (j = 0; j < t; j++) {
        token      = new state.Token('footnote_anchor', '', 0);
        token.meta = { id: i, subId: j, label: list[i].label };
        state.tokens.push(token);
      }

      if (lastParagraph) {
        state.tokens.push(lastParagraph);
      }

      token = new state.Token('footnote_close', '', -1);
      state.tokens.push(token);
    }

    token = new state.Token('footnote_block_close', '', -1);
    state.tokens.push(token);
  }

  md.block.ruler.before('reference', 'footnote_def', footnote_def, { alt: [ 'paragraph', 'reference' ] });
  md.inline.ruler.after('image', 'footnote_inline', footnote_inline);
  md.inline.ruler.after('footnote_inline', 'footnote_ref', footnote_ref);
  md.core.ruler.after('inline', 'footnote_tail', footnote_tail);
};


/***/ }),

/***/ "e80e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Block quotes



var isSpace = __webpack_require__("0068").isSpace;


module.exports = function blockquote(state, startLine, endLine, silent) {
  var adjustTab,
      ch,
      i,
      initial,
      l,
      lastLineEmpty,
      lines,
      nextLine,
      offset,
      oldBMarks,
      oldBSCount,
      oldIndent,
      oldParentType,
      oldSCount,
      oldTShift,
      spaceAfterMarker,
      terminate,
      terminatorRules,
      token,
      wasOutdented,
      oldLineMax = state.lineMax,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  // check the block quote marker
  if (state.src.charCodeAt(pos++) !== 0x3E/* > */) { return false; }

  // we know that it's going to be a valid blockquote,
  // so no point trying to find the end of it in silent mode
  if (silent) { return true; }

  // skip spaces after ">" and re-calculate offset
  initial = offset = state.sCount[startLine] + pos - (state.bMarks[startLine] + state.tShift[startLine]);

  // skip one optional space after '>'
  if (state.src.charCodeAt(pos) === 0x20 /* space */) {
    // ' >   test '
    //     ^ -- position start of line here:
    pos++;
    initial++;
    offset++;
    adjustTab = false;
    spaceAfterMarker = true;
  } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
    spaceAfterMarker = true;

    if ((state.bsCount[startLine] + offset) % 4 === 3) {
      // '  >\t  test '
      //       ^ -- position start of line here (tab has width===1)
      pos++;
      initial++;
      offset++;
      adjustTab = false;
    } else {
      // ' >\t  test '
      //    ^ -- position start of line here + shift bsCount slightly
      //         to make extra space appear
      adjustTab = true;
    }
  } else {
    spaceAfterMarker = false;
  }

  oldBMarks = [ state.bMarks[startLine] ];
  state.bMarks[startLine] = pos;

  while (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (isSpace(ch)) {
      if (ch === 0x09) {
        offset += 4 - (offset + state.bsCount[startLine] + (adjustTab ? 1 : 0)) % 4;
      } else {
        offset++;
      }
    } else {
      break;
    }

    pos++;
  }

  oldBSCount = [ state.bsCount[startLine] ];
  state.bsCount[startLine] = state.sCount[startLine] + 1 + (spaceAfterMarker ? 1 : 0);

  lastLineEmpty = pos >= max;

  oldSCount = [ state.sCount[startLine] ];
  state.sCount[startLine] = offset - initial;

  oldTShift = [ state.tShift[startLine] ];
  state.tShift[startLine] = pos - state.bMarks[startLine];

  terminatorRules = state.md.block.ruler.getRules('blockquote');

  oldParentType = state.parentType;
  state.parentType = 'blockquote';
  wasOutdented = false;

  // Search the end of the block
  //
  // Block ends with either:
  //  1. an empty line outside:
  //     ```
  //     > test
  //
  //     ```
  //  2. an empty line inside:
  //     ```
  //     >
  //     test
  //     ```
  //  3. another tag:
  //     ```
  //     > test
  //      - - -
  //     ```
  for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
    // check if it's outdented, i.e. it's inside list item and indented
    // less than said list item:
    //
    // ```
    // 1. anything
    //    > current blockquote
    // 2. checking this line
    // ```
    if (state.sCount[nextLine] < state.blkIndent) wasOutdented = true;

    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos >= max) {
      // Case 1: line is not inside the blockquote, and this line is empty.
      break;
    }

    if (state.src.charCodeAt(pos++) === 0x3E/* > */ && !wasOutdented) {
      // This line is inside the blockquote.

      // skip spaces after ">" and re-calculate offset
      initial = offset = state.sCount[nextLine] + pos - (state.bMarks[nextLine] + state.tShift[nextLine]);

      // skip one optional space after '>'
      if (state.src.charCodeAt(pos) === 0x20 /* space */) {
        // ' >   test '
        //     ^ -- position start of line here:
        pos++;
        initial++;
        offset++;
        adjustTab = false;
        spaceAfterMarker = true;
      } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
        spaceAfterMarker = true;

        if ((state.bsCount[nextLine] + offset) % 4 === 3) {
          // '  >\t  test '
          //       ^ -- position start of line here (tab has width===1)
          pos++;
          initial++;
          offset++;
          adjustTab = false;
        } else {
          // ' >\t  test '
          //    ^ -- position start of line here + shift bsCount slightly
          //         to make extra space appear
          adjustTab = true;
        }
      } else {
        spaceAfterMarker = false;
      }

      oldBMarks.push(state.bMarks[nextLine]);
      state.bMarks[nextLine] = pos;

      while (pos < max) {
        ch = state.src.charCodeAt(pos);

        if (isSpace(ch)) {
          if (ch === 0x09) {
            offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
          } else {
            offset++;
          }
        } else {
          break;
        }

        pos++;
      }

      lastLineEmpty = pos >= max;

      oldBSCount.push(state.bsCount[nextLine]);
      state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);

      oldSCount.push(state.sCount[nextLine]);
      state.sCount[nextLine] = offset - initial;

      oldTShift.push(state.tShift[nextLine]);
      state.tShift[nextLine] = pos - state.bMarks[nextLine];
      continue;
    }

    // Case 2: line is not inside the blockquote, and the last line was empty.
    if (lastLineEmpty) { break; }

    // Case 3: another tag found.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }

    if (terminate) {
      // Quirk to enforce "hard termination mode" for paragraphs;
      // normally if you call `tokenize(state, startLine, nextLine)`,
      // paragraphs will look below nextLine for paragraph continuation,
      // but if blockquote is terminated by another tag, they shouldn't
      state.lineMax = nextLine;

      if (state.blkIndent !== 0) {
        // state.blkIndent was non-zero, we now set it to zero,
        // so we need to re-calculate all offsets to appear as
        // if indent wasn't changed
        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] -= state.blkIndent;
      }

      break;
    }

    oldBMarks.push(state.bMarks[nextLine]);
    oldBSCount.push(state.bsCount[nextLine]);
    oldTShift.push(state.tShift[nextLine]);
    oldSCount.push(state.sCount[nextLine]);

    // A negative indentation means that this is a paragraph continuation
    //
    state.sCount[nextLine] = -1;
  }

  oldIndent = state.blkIndent;
  state.blkIndent = 0;

  token        = state.push('blockquote_open', 'blockquote', 1);
  token.markup = '>';
  token.map    = lines = [ startLine, 0 ];

  state.md.block.tokenize(state, startLine, nextLine);

  token        = state.push('blockquote_close', 'blockquote', -1);
  token.markup = '>';

  state.lineMax = oldLineMax;
  state.parentType = oldParentType;
  lines[1] = state.line;

  // Restore original tShift; this might not be necessary since the parser
  // has already been here, but just to make sure we can do that.
  for (i = 0; i < oldTShift.length; i++) {
    state.bMarks[i + startLine] = oldBMarks[i];
    state.tShift[i + startLine] = oldTShift[i];
    state.sCount[i + startLine] = oldSCount[i];
    state.bsCount[i + startLine] = oldBSCount[i];
  }
  state.blkIndent = oldIndent;

  return true;
};


/***/ }),

/***/ "f0f2":
/***/ (function(module) {

module.exports = {"Aacute":"Á","aacute":"á","Abreve":"Ă","abreve":"ă","ac":"∾","acd":"∿","acE":"∾̳","Acirc":"Â","acirc":"â","acute":"´","Acy":"А","acy":"а","AElig":"Æ","aelig":"æ","af":"⁡","Afr":"𝔄","afr":"𝔞","Agrave":"À","agrave":"à","alefsym":"ℵ","aleph":"ℵ","Alpha":"Α","alpha":"α","Amacr":"Ā","amacr":"ā","amalg":"⨿","amp":"&","AMP":"&","andand":"⩕","And":"⩓","and":"∧","andd":"⩜","andslope":"⩘","andv":"⩚","ang":"∠","ange":"⦤","angle":"∠","angmsdaa":"⦨","angmsdab":"⦩","angmsdac":"⦪","angmsdad":"⦫","angmsdae":"⦬","angmsdaf":"⦭","angmsdag":"⦮","angmsdah":"⦯","angmsd":"∡","angrt":"∟","angrtvb":"⊾","angrtvbd":"⦝","angsph":"∢","angst":"Å","angzarr":"⍼","Aogon":"Ą","aogon":"ą","Aopf":"𝔸","aopf":"𝕒","apacir":"⩯","ap":"≈","apE":"⩰","ape":"≊","apid":"≋","apos":"'","ApplyFunction":"⁡","approx":"≈","approxeq":"≊","Aring":"Å","aring":"å","Ascr":"𝒜","ascr":"𝒶","Assign":"≔","ast":"*","asymp":"≈","asympeq":"≍","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","awconint":"∳","awint":"⨑","backcong":"≌","backepsilon":"϶","backprime":"‵","backsim":"∽","backsimeq":"⋍","Backslash":"∖","Barv":"⫧","barvee":"⊽","barwed":"⌅","Barwed":"⌆","barwedge":"⌅","bbrk":"⎵","bbrktbrk":"⎶","bcong":"≌","Bcy":"Б","bcy":"б","bdquo":"„","becaus":"∵","because":"∵","Because":"∵","bemptyv":"⦰","bepsi":"϶","bernou":"ℬ","Bernoullis":"ℬ","Beta":"Β","beta":"β","beth":"ℶ","between":"≬","Bfr":"𝔅","bfr":"𝔟","bigcap":"⋂","bigcirc":"◯","bigcup":"⋃","bigodot":"⨀","bigoplus":"⨁","bigotimes":"⨂","bigsqcup":"⨆","bigstar":"★","bigtriangledown":"▽","bigtriangleup":"△","biguplus":"⨄","bigvee":"⋁","bigwedge":"⋀","bkarow":"⤍","blacklozenge":"⧫","blacksquare":"▪","blacktriangle":"▴","blacktriangledown":"▾","blacktriangleleft":"◂","blacktriangleright":"▸","blank":"␣","blk12":"▒","blk14":"░","blk34":"▓","block":"█","bne":"=⃥","bnequiv":"≡⃥","bNot":"⫭","bnot":"⌐","Bopf":"𝔹","bopf":"𝕓","bot":"⊥","bottom":"⊥","bowtie":"⋈","boxbox":"⧉","boxdl":"┐","boxdL":"╕","boxDl":"╖","boxDL":"╗","boxdr":"┌","boxdR":"╒","boxDr":"╓","boxDR":"╔","boxh":"─","boxH":"═","boxhd":"┬","boxHd":"╤","boxhD":"╥","boxHD":"╦","boxhu":"┴","boxHu":"╧","boxhU":"╨","boxHU":"╩","boxminus":"⊟","boxplus":"⊞","boxtimes":"⊠","boxul":"┘","boxuL":"╛","boxUl":"╜","boxUL":"╝","boxur":"└","boxuR":"╘","boxUr":"╙","boxUR":"╚","boxv":"│","boxV":"║","boxvh":"┼","boxvH":"╪","boxVh":"╫","boxVH":"╬","boxvl":"┤","boxvL":"╡","boxVl":"╢","boxVL":"╣","boxvr":"├","boxvR":"╞","boxVr":"╟","boxVR":"╠","bprime":"‵","breve":"˘","Breve":"˘","brvbar":"¦","bscr":"𝒷","Bscr":"ℬ","bsemi":"⁏","bsim":"∽","bsime":"⋍","bsolb":"⧅","bsol":"\\","bsolhsub":"⟈","bull":"•","bullet":"•","bump":"≎","bumpE":"⪮","bumpe":"≏","Bumpeq":"≎","bumpeq":"≏","Cacute":"Ć","cacute":"ć","capand":"⩄","capbrcup":"⩉","capcap":"⩋","cap":"∩","Cap":"⋒","capcup":"⩇","capdot":"⩀","CapitalDifferentialD":"ⅅ","caps":"∩︀","caret":"⁁","caron":"ˇ","Cayleys":"ℭ","ccaps":"⩍","Ccaron":"Č","ccaron":"č","Ccedil":"Ç","ccedil":"ç","Ccirc":"Ĉ","ccirc":"ĉ","Cconint":"∰","ccups":"⩌","ccupssm":"⩐","Cdot":"Ċ","cdot":"ċ","cedil":"¸","Cedilla":"¸","cemptyv":"⦲","cent":"¢","centerdot":"·","CenterDot":"·","cfr":"𝔠","Cfr":"ℭ","CHcy":"Ч","chcy":"ч","check":"✓","checkmark":"✓","Chi":"Χ","chi":"χ","circ":"ˆ","circeq":"≗","circlearrowleft":"↺","circlearrowright":"↻","circledast":"⊛","circledcirc":"⊚","circleddash":"⊝","CircleDot":"⊙","circledR":"®","circledS":"Ⓢ","CircleMinus":"⊖","CirclePlus":"⊕","CircleTimes":"⊗","cir":"○","cirE":"⧃","cire":"≗","cirfnint":"⨐","cirmid":"⫯","cirscir":"⧂","ClockwiseContourIntegral":"∲","CloseCurlyDoubleQuote":"”","CloseCurlyQuote":"’","clubs":"♣","clubsuit":"♣","colon":":","Colon":"∷","Colone":"⩴","colone":"≔","coloneq":"≔","comma":",","commat":"@","comp":"∁","compfn":"∘","complement":"∁","complexes":"ℂ","cong":"≅","congdot":"⩭","Congruent":"≡","conint":"∮","Conint":"∯","ContourIntegral":"∮","copf":"𝕔","Copf":"ℂ","coprod":"∐","Coproduct":"∐","copy":"©","COPY":"©","copysr":"℗","CounterClockwiseContourIntegral":"∳","crarr":"↵","cross":"✗","Cross":"⨯","Cscr":"𝒞","cscr":"𝒸","csub":"⫏","csube":"⫑","csup":"⫐","csupe":"⫒","ctdot":"⋯","cudarrl":"⤸","cudarrr":"⤵","cuepr":"⋞","cuesc":"⋟","cularr":"↶","cularrp":"⤽","cupbrcap":"⩈","cupcap":"⩆","CupCap":"≍","cup":"∪","Cup":"⋓","cupcup":"⩊","cupdot":"⊍","cupor":"⩅","cups":"∪︀","curarr":"↷","curarrm":"⤼","curlyeqprec":"⋞","curlyeqsucc":"⋟","curlyvee":"⋎","curlywedge":"⋏","curren":"¤","curvearrowleft":"↶","curvearrowright":"↷","cuvee":"⋎","cuwed":"⋏","cwconint":"∲","cwint":"∱","cylcty":"⌭","dagger":"†","Dagger":"‡","daleth":"ℸ","darr":"↓","Darr":"↡","dArr":"⇓","dash":"‐","Dashv":"⫤","dashv":"⊣","dbkarow":"⤏","dblac":"˝","Dcaron":"Ď","dcaron":"ď","Dcy":"Д","dcy":"д","ddagger":"‡","ddarr":"⇊","DD":"ⅅ","dd":"ⅆ","DDotrahd":"⤑","ddotseq":"⩷","deg":"°","Del":"∇","Delta":"Δ","delta":"δ","demptyv":"⦱","dfisht":"⥿","Dfr":"𝔇","dfr":"𝔡","dHar":"⥥","dharl":"⇃","dharr":"⇂","DiacriticalAcute":"´","DiacriticalDot":"˙","DiacriticalDoubleAcute":"˝","DiacriticalGrave":"`","DiacriticalTilde":"˜","diam":"⋄","diamond":"⋄","Diamond":"⋄","diamondsuit":"♦","diams":"♦","die":"¨","DifferentialD":"ⅆ","digamma":"ϝ","disin":"⋲","div":"÷","divide":"÷","divideontimes":"⋇","divonx":"⋇","DJcy":"Ђ","djcy":"ђ","dlcorn":"⌞","dlcrop":"⌍","dollar":"$","Dopf":"𝔻","dopf":"𝕕","Dot":"¨","dot":"˙","DotDot":"⃜","doteq":"≐","doteqdot":"≑","DotEqual":"≐","dotminus":"∸","dotplus":"∔","dotsquare":"⊡","doublebarwedge":"⌆","DoubleContourIntegral":"∯","DoubleDot":"¨","DoubleDownArrow":"⇓","DoubleLeftArrow":"⇐","DoubleLeftRightArrow":"⇔","DoubleLeftTee":"⫤","DoubleLongLeftArrow":"⟸","DoubleLongLeftRightArrow":"⟺","DoubleLongRightArrow":"⟹","DoubleRightArrow":"⇒","DoubleRightTee":"⊨","DoubleUpArrow":"⇑","DoubleUpDownArrow":"⇕","DoubleVerticalBar":"∥","DownArrowBar":"⤓","downarrow":"↓","DownArrow":"↓","Downarrow":"⇓","DownArrowUpArrow":"⇵","DownBreve":"̑","downdownarrows":"⇊","downharpoonleft":"⇃","downharpoonright":"⇂","DownLeftRightVector":"⥐","DownLeftTeeVector":"⥞","DownLeftVectorBar":"⥖","DownLeftVector":"↽","DownRightTeeVector":"⥟","DownRightVectorBar":"⥗","DownRightVector":"⇁","DownTeeArrow":"↧","DownTee":"⊤","drbkarow":"⤐","drcorn":"⌟","drcrop":"⌌","Dscr":"𝒟","dscr":"𝒹","DScy":"Ѕ","dscy":"ѕ","dsol":"⧶","Dstrok":"Đ","dstrok":"đ","dtdot":"⋱","dtri":"▿","dtrif":"▾","duarr":"⇵","duhar":"⥯","dwangle":"⦦","DZcy":"Џ","dzcy":"џ","dzigrarr":"⟿","Eacute":"É","eacute":"é","easter":"⩮","Ecaron":"Ě","ecaron":"ě","Ecirc":"Ê","ecirc":"ê","ecir":"≖","ecolon":"≕","Ecy":"Э","ecy":"э","eDDot":"⩷","Edot":"Ė","edot":"ė","eDot":"≑","ee":"ⅇ","efDot":"≒","Efr":"𝔈","efr":"𝔢","eg":"⪚","Egrave":"È","egrave":"è","egs":"⪖","egsdot":"⪘","el":"⪙","Element":"∈","elinters":"⏧","ell":"ℓ","els":"⪕","elsdot":"⪗","Emacr":"Ē","emacr":"ē","empty":"∅","emptyset":"∅","EmptySmallSquare":"◻","emptyv":"∅","EmptyVerySmallSquare":"▫","emsp13":" ","emsp14":" ","emsp":" ","ENG":"Ŋ","eng":"ŋ","ensp":" ","Eogon":"Ę","eogon":"ę","Eopf":"𝔼","eopf":"𝕖","epar":"⋕","eparsl":"⧣","eplus":"⩱","epsi":"ε","Epsilon":"Ε","epsilon":"ε","epsiv":"ϵ","eqcirc":"≖","eqcolon":"≕","eqsim":"≂","eqslantgtr":"⪖","eqslantless":"⪕","Equal":"⩵","equals":"=","EqualTilde":"≂","equest":"≟","Equilibrium":"⇌","equiv":"≡","equivDD":"⩸","eqvparsl":"⧥","erarr":"⥱","erDot":"≓","escr":"ℯ","Escr":"ℰ","esdot":"≐","Esim":"⩳","esim":"≂","Eta":"Η","eta":"η","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","euro":"€","excl":"!","exist":"∃","Exists":"∃","expectation":"ℰ","exponentiale":"ⅇ","ExponentialE":"ⅇ","fallingdotseq":"≒","Fcy":"Ф","fcy":"ф","female":"♀","ffilig":"ﬃ","fflig":"ﬀ","ffllig":"ﬄ","Ffr":"𝔉","ffr":"𝔣","filig":"ﬁ","FilledSmallSquare":"◼","FilledVerySmallSquare":"▪","fjlig":"fj","flat":"♭","fllig":"ﬂ","fltns":"▱","fnof":"ƒ","Fopf":"𝔽","fopf":"𝕗","forall":"∀","ForAll":"∀","fork":"⋔","forkv":"⫙","Fouriertrf":"ℱ","fpartint":"⨍","frac12":"½","frac13":"⅓","frac14":"¼","frac15":"⅕","frac16":"⅙","frac18":"⅛","frac23":"⅔","frac25":"⅖","frac34":"¾","frac35":"⅗","frac38":"⅜","frac45":"⅘","frac56":"⅚","frac58":"⅝","frac78":"⅞","frasl":"⁄","frown":"⌢","fscr":"𝒻","Fscr":"ℱ","gacute":"ǵ","Gamma":"Γ","gamma":"γ","Gammad":"Ϝ","gammad":"ϝ","gap":"⪆","Gbreve":"Ğ","gbreve":"ğ","Gcedil":"Ģ","Gcirc":"Ĝ","gcirc":"ĝ","Gcy":"Г","gcy":"г","Gdot":"Ġ","gdot":"ġ","ge":"≥","gE":"≧","gEl":"⪌","gel":"⋛","geq":"≥","geqq":"≧","geqslant":"⩾","gescc":"⪩","ges":"⩾","gesdot":"⪀","gesdoto":"⪂","gesdotol":"⪄","gesl":"⋛︀","gesles":"⪔","Gfr":"𝔊","gfr":"𝔤","gg":"≫","Gg":"⋙","ggg":"⋙","gimel":"ℷ","GJcy":"Ѓ","gjcy":"ѓ","gla":"⪥","gl":"≷","glE":"⪒","glj":"⪤","gnap":"⪊","gnapprox":"⪊","gne":"⪈","gnE":"≩","gneq":"⪈","gneqq":"≩","gnsim":"⋧","Gopf":"𝔾","gopf":"𝕘","grave":"`","GreaterEqual":"≥","GreaterEqualLess":"⋛","GreaterFullEqual":"≧","GreaterGreater":"⪢","GreaterLess":"≷","GreaterSlantEqual":"⩾","GreaterTilde":"≳","Gscr":"𝒢","gscr":"ℊ","gsim":"≳","gsime":"⪎","gsiml":"⪐","gtcc":"⪧","gtcir":"⩺","gt":">","GT":">","Gt":"≫","gtdot":"⋗","gtlPar":"⦕","gtquest":"⩼","gtrapprox":"⪆","gtrarr":"⥸","gtrdot":"⋗","gtreqless":"⋛","gtreqqless":"⪌","gtrless":"≷","gtrsim":"≳","gvertneqq":"≩︀","gvnE":"≩︀","Hacek":"ˇ","hairsp":" ","half":"½","hamilt":"ℋ","HARDcy":"Ъ","hardcy":"ъ","harrcir":"⥈","harr":"↔","hArr":"⇔","harrw":"↭","Hat":"^","hbar":"ℏ","Hcirc":"Ĥ","hcirc":"ĥ","hearts":"♥","heartsuit":"♥","hellip":"…","hercon":"⊹","hfr":"𝔥","Hfr":"ℌ","HilbertSpace":"ℋ","hksearow":"⤥","hkswarow":"⤦","hoarr":"⇿","homtht":"∻","hookleftarrow":"↩","hookrightarrow":"↪","hopf":"𝕙","Hopf":"ℍ","horbar":"―","HorizontalLine":"─","hscr":"𝒽","Hscr":"ℋ","hslash":"ℏ","Hstrok":"Ħ","hstrok":"ħ","HumpDownHump":"≎","HumpEqual":"≏","hybull":"⁃","hyphen":"‐","Iacute":"Í","iacute":"í","ic":"⁣","Icirc":"Î","icirc":"î","Icy":"И","icy":"и","Idot":"İ","IEcy":"Е","iecy":"е","iexcl":"¡","iff":"⇔","ifr":"𝔦","Ifr":"ℑ","Igrave":"Ì","igrave":"ì","ii":"ⅈ","iiiint":"⨌","iiint":"∭","iinfin":"⧜","iiota":"℩","IJlig":"Ĳ","ijlig":"ĳ","Imacr":"Ī","imacr":"ī","image":"ℑ","ImaginaryI":"ⅈ","imagline":"ℐ","imagpart":"ℑ","imath":"ı","Im":"ℑ","imof":"⊷","imped":"Ƶ","Implies":"⇒","incare":"℅","in":"∈","infin":"∞","infintie":"⧝","inodot":"ı","intcal":"⊺","int":"∫","Int":"∬","integers":"ℤ","Integral":"∫","intercal":"⊺","Intersection":"⋂","intlarhk":"⨗","intprod":"⨼","InvisibleComma":"⁣","InvisibleTimes":"⁢","IOcy":"Ё","iocy":"ё","Iogon":"Į","iogon":"į","Iopf":"𝕀","iopf":"𝕚","Iota":"Ι","iota":"ι","iprod":"⨼","iquest":"¿","iscr":"𝒾","Iscr":"ℐ","isin":"∈","isindot":"⋵","isinE":"⋹","isins":"⋴","isinsv":"⋳","isinv":"∈","it":"⁢","Itilde":"Ĩ","itilde":"ĩ","Iukcy":"І","iukcy":"і","Iuml":"Ï","iuml":"ï","Jcirc":"Ĵ","jcirc":"ĵ","Jcy":"Й","jcy":"й","Jfr":"𝔍","jfr":"𝔧","jmath":"ȷ","Jopf":"𝕁","jopf":"𝕛","Jscr":"𝒥","jscr":"𝒿","Jsercy":"Ј","jsercy":"ј","Jukcy":"Є","jukcy":"є","Kappa":"Κ","kappa":"κ","kappav":"ϰ","Kcedil":"Ķ","kcedil":"ķ","Kcy":"К","kcy":"к","Kfr":"𝔎","kfr":"𝔨","kgreen":"ĸ","KHcy":"Х","khcy":"х","KJcy":"Ќ","kjcy":"ќ","Kopf":"𝕂","kopf":"𝕜","Kscr":"𝒦","kscr":"𝓀","lAarr":"⇚","Lacute":"Ĺ","lacute":"ĺ","laemptyv":"⦴","lagran":"ℒ","Lambda":"Λ","lambda":"λ","lang":"⟨","Lang":"⟪","langd":"⦑","langle":"⟨","lap":"⪅","Laplacetrf":"ℒ","laquo":"«","larrb":"⇤","larrbfs":"⤟","larr":"←","Larr":"↞","lArr":"⇐","larrfs":"⤝","larrhk":"↩","larrlp":"↫","larrpl":"⤹","larrsim":"⥳","larrtl":"↢","latail":"⤙","lAtail":"⤛","lat":"⪫","late":"⪭","lates":"⪭︀","lbarr":"⤌","lBarr":"⤎","lbbrk":"❲","lbrace":"{","lbrack":"[","lbrke":"⦋","lbrksld":"⦏","lbrkslu":"⦍","Lcaron":"Ľ","lcaron":"ľ","Lcedil":"Ļ","lcedil":"ļ","lceil":"⌈","lcub":"{","Lcy":"Л","lcy":"л","ldca":"⤶","ldquo":"“","ldquor":"„","ldrdhar":"⥧","ldrushar":"⥋","ldsh":"↲","le":"≤","lE":"≦","LeftAngleBracket":"⟨","LeftArrowBar":"⇤","leftarrow":"←","LeftArrow":"←","Leftarrow":"⇐","LeftArrowRightArrow":"⇆","leftarrowtail":"↢","LeftCeiling":"⌈","LeftDoubleBracket":"⟦","LeftDownTeeVector":"⥡","LeftDownVectorBar":"⥙","LeftDownVector":"⇃","LeftFloor":"⌊","leftharpoondown":"↽","leftharpoonup":"↼","leftleftarrows":"⇇","leftrightarrow":"↔","LeftRightArrow":"↔","Leftrightarrow":"⇔","leftrightarrows":"⇆","leftrightharpoons":"⇋","leftrightsquigarrow":"↭","LeftRightVector":"⥎","LeftTeeArrow":"↤","LeftTee":"⊣","LeftTeeVector":"⥚","leftthreetimes":"⋋","LeftTriangleBar":"⧏","LeftTriangle":"⊲","LeftTriangleEqual":"⊴","LeftUpDownVector":"⥑","LeftUpTeeVector":"⥠","LeftUpVectorBar":"⥘","LeftUpVector":"↿","LeftVectorBar":"⥒","LeftVector":"↼","lEg":"⪋","leg":"⋚","leq":"≤","leqq":"≦","leqslant":"⩽","lescc":"⪨","les":"⩽","lesdot":"⩿","lesdoto":"⪁","lesdotor":"⪃","lesg":"⋚︀","lesges":"⪓","lessapprox":"⪅","lessdot":"⋖","lesseqgtr":"⋚","lesseqqgtr":"⪋","LessEqualGreater":"⋚","LessFullEqual":"≦","LessGreater":"≶","lessgtr":"≶","LessLess":"⪡","lesssim":"≲","LessSlantEqual":"⩽","LessTilde":"≲","lfisht":"⥼","lfloor":"⌊","Lfr":"𝔏","lfr":"𝔩","lg":"≶","lgE":"⪑","lHar":"⥢","lhard":"↽","lharu":"↼","lharul":"⥪","lhblk":"▄","LJcy":"Љ","ljcy":"љ","llarr":"⇇","ll":"≪","Ll":"⋘","llcorner":"⌞","Lleftarrow":"⇚","llhard":"⥫","lltri":"◺","Lmidot":"Ŀ","lmidot":"ŀ","lmoustache":"⎰","lmoust":"⎰","lnap":"⪉","lnapprox":"⪉","lne":"⪇","lnE":"≨","lneq":"⪇","lneqq":"≨","lnsim":"⋦","loang":"⟬","loarr":"⇽","lobrk":"⟦","longleftarrow":"⟵","LongLeftArrow":"⟵","Longleftarrow":"⟸","longleftrightarrow":"⟷","LongLeftRightArrow":"⟷","Longleftrightarrow":"⟺","longmapsto":"⟼","longrightarrow":"⟶","LongRightArrow":"⟶","Longrightarrow":"⟹","looparrowleft":"↫","looparrowright":"↬","lopar":"⦅","Lopf":"𝕃","lopf":"𝕝","loplus":"⨭","lotimes":"⨴","lowast":"∗","lowbar":"_","LowerLeftArrow":"↙","LowerRightArrow":"↘","loz":"◊","lozenge":"◊","lozf":"⧫","lpar":"(","lparlt":"⦓","lrarr":"⇆","lrcorner":"⌟","lrhar":"⇋","lrhard":"⥭","lrm":"‎","lrtri":"⊿","lsaquo":"‹","lscr":"𝓁","Lscr":"ℒ","lsh":"↰","Lsh":"↰","lsim":"≲","lsime":"⪍","lsimg":"⪏","lsqb":"[","lsquo":"‘","lsquor":"‚","Lstrok":"Ł","lstrok":"ł","ltcc":"⪦","ltcir":"⩹","lt":"<","LT":"<","Lt":"≪","ltdot":"⋖","lthree":"⋋","ltimes":"⋉","ltlarr":"⥶","ltquest":"⩻","ltri":"◃","ltrie":"⊴","ltrif":"◂","ltrPar":"⦖","lurdshar":"⥊","luruhar":"⥦","lvertneqq":"≨︀","lvnE":"≨︀","macr":"¯","male":"♂","malt":"✠","maltese":"✠","Map":"⤅","map":"↦","mapsto":"↦","mapstodown":"↧","mapstoleft":"↤","mapstoup":"↥","marker":"▮","mcomma":"⨩","Mcy":"М","mcy":"м","mdash":"—","mDDot":"∺","measuredangle":"∡","MediumSpace":" ","Mellintrf":"ℳ","Mfr":"𝔐","mfr":"𝔪","mho":"℧","micro":"µ","midast":"*","midcir":"⫰","mid":"∣","middot":"·","minusb":"⊟","minus":"−","minusd":"∸","minusdu":"⨪","MinusPlus":"∓","mlcp":"⫛","mldr":"…","mnplus":"∓","models":"⊧","Mopf":"𝕄","mopf":"𝕞","mp":"∓","mscr":"𝓂","Mscr":"ℳ","mstpos":"∾","Mu":"Μ","mu":"μ","multimap":"⊸","mumap":"⊸","nabla":"∇","Nacute":"Ń","nacute":"ń","nang":"∠⃒","nap":"≉","napE":"⩰̸","napid":"≋̸","napos":"ŉ","napprox":"≉","natural":"♮","naturals":"ℕ","natur":"♮","nbsp":" ","nbump":"≎̸","nbumpe":"≏̸","ncap":"⩃","Ncaron":"Ň","ncaron":"ň","Ncedil":"Ņ","ncedil":"ņ","ncong":"≇","ncongdot":"⩭̸","ncup":"⩂","Ncy":"Н","ncy":"н","ndash":"–","nearhk":"⤤","nearr":"↗","neArr":"⇗","nearrow":"↗","ne":"≠","nedot":"≐̸","NegativeMediumSpace":"​","NegativeThickSpace":"​","NegativeThinSpace":"​","NegativeVeryThinSpace":"​","nequiv":"≢","nesear":"⤨","nesim":"≂̸","NestedGreaterGreater":"≫","NestedLessLess":"≪","NewLine":"\n","nexist":"∄","nexists":"∄","Nfr":"𝔑","nfr":"𝔫","ngE":"≧̸","nge":"≱","ngeq":"≱","ngeqq":"≧̸","ngeqslant":"⩾̸","nges":"⩾̸","nGg":"⋙̸","ngsim":"≵","nGt":"≫⃒","ngt":"≯","ngtr":"≯","nGtv":"≫̸","nharr":"↮","nhArr":"⇎","nhpar":"⫲","ni":"∋","nis":"⋼","nisd":"⋺","niv":"∋","NJcy":"Њ","njcy":"њ","nlarr":"↚","nlArr":"⇍","nldr":"‥","nlE":"≦̸","nle":"≰","nleftarrow":"↚","nLeftarrow":"⇍","nleftrightarrow":"↮","nLeftrightarrow":"⇎","nleq":"≰","nleqq":"≦̸","nleqslant":"⩽̸","nles":"⩽̸","nless":"≮","nLl":"⋘̸","nlsim":"≴","nLt":"≪⃒","nlt":"≮","nltri":"⋪","nltrie":"⋬","nLtv":"≪̸","nmid":"∤","NoBreak":"⁠","NonBreakingSpace":" ","nopf":"𝕟","Nopf":"ℕ","Not":"⫬","not":"¬","NotCongruent":"≢","NotCupCap":"≭","NotDoubleVerticalBar":"∦","NotElement":"∉","NotEqual":"≠","NotEqualTilde":"≂̸","NotExists":"∄","NotGreater":"≯","NotGreaterEqual":"≱","NotGreaterFullEqual":"≧̸","NotGreaterGreater":"≫̸","NotGreaterLess":"≹","NotGreaterSlantEqual":"⩾̸","NotGreaterTilde":"≵","NotHumpDownHump":"≎̸","NotHumpEqual":"≏̸","notin":"∉","notindot":"⋵̸","notinE":"⋹̸","notinva":"∉","notinvb":"⋷","notinvc":"⋶","NotLeftTriangleBar":"⧏̸","NotLeftTriangle":"⋪","NotLeftTriangleEqual":"⋬","NotLess":"≮","NotLessEqual":"≰","NotLessGreater":"≸","NotLessLess":"≪̸","NotLessSlantEqual":"⩽̸","NotLessTilde":"≴","NotNestedGreaterGreater":"⪢̸","NotNestedLessLess":"⪡̸","notni":"∌","notniva":"∌","notnivb":"⋾","notnivc":"⋽","NotPrecedes":"⊀","NotPrecedesEqual":"⪯̸","NotPrecedesSlantEqual":"⋠","NotReverseElement":"∌","NotRightTriangleBar":"⧐̸","NotRightTriangle":"⋫","NotRightTriangleEqual":"⋭","NotSquareSubset":"⊏̸","NotSquareSubsetEqual":"⋢","NotSquareSuperset":"⊐̸","NotSquareSupersetEqual":"⋣","NotSubset":"⊂⃒","NotSubsetEqual":"⊈","NotSucceeds":"⊁","NotSucceedsEqual":"⪰̸","NotSucceedsSlantEqual":"⋡","NotSucceedsTilde":"≿̸","NotSuperset":"⊃⃒","NotSupersetEqual":"⊉","NotTilde":"≁","NotTildeEqual":"≄","NotTildeFullEqual":"≇","NotTildeTilde":"≉","NotVerticalBar":"∤","nparallel":"∦","npar":"∦","nparsl":"⫽⃥","npart":"∂̸","npolint":"⨔","npr":"⊀","nprcue":"⋠","nprec":"⊀","npreceq":"⪯̸","npre":"⪯̸","nrarrc":"⤳̸","nrarr":"↛","nrArr":"⇏","nrarrw":"↝̸","nrightarrow":"↛","nRightarrow":"⇏","nrtri":"⋫","nrtrie":"⋭","nsc":"⊁","nsccue":"⋡","nsce":"⪰̸","Nscr":"𝒩","nscr":"𝓃","nshortmid":"∤","nshortparallel":"∦","nsim":"≁","nsime":"≄","nsimeq":"≄","nsmid":"∤","nspar":"∦","nsqsube":"⋢","nsqsupe":"⋣","nsub":"⊄","nsubE":"⫅̸","nsube":"⊈","nsubset":"⊂⃒","nsubseteq":"⊈","nsubseteqq":"⫅̸","nsucc":"⊁","nsucceq":"⪰̸","nsup":"⊅","nsupE":"⫆̸","nsupe":"⊉","nsupset":"⊃⃒","nsupseteq":"⊉","nsupseteqq":"⫆̸","ntgl":"≹","Ntilde":"Ñ","ntilde":"ñ","ntlg":"≸","ntriangleleft":"⋪","ntrianglelefteq":"⋬","ntriangleright":"⋫","ntrianglerighteq":"⋭","Nu":"Ν","nu":"ν","num":"#","numero":"№","numsp":" ","nvap":"≍⃒","nvdash":"⊬","nvDash":"⊭","nVdash":"⊮","nVDash":"⊯","nvge":"≥⃒","nvgt":">⃒","nvHarr":"⤄","nvinfin":"⧞","nvlArr":"⤂","nvle":"≤⃒","nvlt":"<⃒","nvltrie":"⊴⃒","nvrArr":"⤃","nvrtrie":"⊵⃒","nvsim":"∼⃒","nwarhk":"⤣","nwarr":"↖","nwArr":"⇖","nwarrow":"↖","nwnear":"⤧","Oacute":"Ó","oacute":"ó","oast":"⊛","Ocirc":"Ô","ocirc":"ô","ocir":"⊚","Ocy":"О","ocy":"о","odash":"⊝","Odblac":"Ő","odblac":"ő","odiv":"⨸","odot":"⊙","odsold":"⦼","OElig":"Œ","oelig":"œ","ofcir":"⦿","Ofr":"𝔒","ofr":"𝔬","ogon":"˛","Ograve":"Ò","ograve":"ò","ogt":"⧁","ohbar":"⦵","ohm":"Ω","oint":"∮","olarr":"↺","olcir":"⦾","olcross":"⦻","oline":"‾","olt":"⧀","Omacr":"Ō","omacr":"ō","Omega":"Ω","omega":"ω","Omicron":"Ο","omicron":"ο","omid":"⦶","ominus":"⊖","Oopf":"𝕆","oopf":"𝕠","opar":"⦷","OpenCurlyDoubleQuote":"“","OpenCurlyQuote":"‘","operp":"⦹","oplus":"⊕","orarr":"↻","Or":"⩔","or":"∨","ord":"⩝","order":"ℴ","orderof":"ℴ","ordf":"ª","ordm":"º","origof":"⊶","oror":"⩖","orslope":"⩗","orv":"⩛","oS":"Ⓢ","Oscr":"𝒪","oscr":"ℴ","Oslash":"Ø","oslash":"ø","osol":"⊘","Otilde":"Õ","otilde":"õ","otimesas":"⨶","Otimes":"⨷","otimes":"⊗","Ouml":"Ö","ouml":"ö","ovbar":"⌽","OverBar":"‾","OverBrace":"⏞","OverBracket":"⎴","OverParenthesis":"⏜","para":"¶","parallel":"∥","par":"∥","parsim":"⫳","parsl":"⫽","part":"∂","PartialD":"∂","Pcy":"П","pcy":"п","percnt":"%","period":".","permil":"‰","perp":"⊥","pertenk":"‱","Pfr":"𝔓","pfr":"𝔭","Phi":"Φ","phi":"φ","phiv":"ϕ","phmmat":"ℳ","phone":"☎","Pi":"Π","pi":"π","pitchfork":"⋔","piv":"ϖ","planck":"ℏ","planckh":"ℎ","plankv":"ℏ","plusacir":"⨣","plusb":"⊞","pluscir":"⨢","plus":"+","plusdo":"∔","plusdu":"⨥","pluse":"⩲","PlusMinus":"±","plusmn":"±","plussim":"⨦","plustwo":"⨧","pm":"±","Poincareplane":"ℌ","pointint":"⨕","popf":"𝕡","Popf":"ℙ","pound":"£","prap":"⪷","Pr":"⪻","pr":"≺","prcue":"≼","precapprox":"⪷","prec":"≺","preccurlyeq":"≼","Precedes":"≺","PrecedesEqual":"⪯","PrecedesSlantEqual":"≼","PrecedesTilde":"≾","preceq":"⪯","precnapprox":"⪹","precneqq":"⪵","precnsim":"⋨","pre":"⪯","prE":"⪳","precsim":"≾","prime":"′","Prime":"″","primes":"ℙ","prnap":"⪹","prnE":"⪵","prnsim":"⋨","prod":"∏","Product":"∏","profalar":"⌮","profline":"⌒","profsurf":"⌓","prop":"∝","Proportional":"∝","Proportion":"∷","propto":"∝","prsim":"≾","prurel":"⊰","Pscr":"𝒫","pscr":"𝓅","Psi":"Ψ","psi":"ψ","puncsp":" ","Qfr":"𝔔","qfr":"𝔮","qint":"⨌","qopf":"𝕢","Qopf":"ℚ","qprime":"⁗","Qscr":"𝒬","qscr":"𝓆","quaternions":"ℍ","quatint":"⨖","quest":"?","questeq":"≟","quot":"\"","QUOT":"\"","rAarr":"⇛","race":"∽̱","Racute":"Ŕ","racute":"ŕ","radic":"√","raemptyv":"⦳","rang":"⟩","Rang":"⟫","rangd":"⦒","range":"⦥","rangle":"⟩","raquo":"»","rarrap":"⥵","rarrb":"⇥","rarrbfs":"⤠","rarrc":"⤳","rarr":"→","Rarr":"↠","rArr":"⇒","rarrfs":"⤞","rarrhk":"↪","rarrlp":"↬","rarrpl":"⥅","rarrsim":"⥴","Rarrtl":"⤖","rarrtl":"↣","rarrw":"↝","ratail":"⤚","rAtail":"⤜","ratio":"∶","rationals":"ℚ","rbarr":"⤍","rBarr":"⤏","RBarr":"⤐","rbbrk":"❳","rbrace":"}","rbrack":"]","rbrke":"⦌","rbrksld":"⦎","rbrkslu":"⦐","Rcaron":"Ř","rcaron":"ř","Rcedil":"Ŗ","rcedil":"ŗ","rceil":"⌉","rcub":"}","Rcy":"Р","rcy":"р","rdca":"⤷","rdldhar":"⥩","rdquo":"”","rdquor":"”","rdsh":"↳","real":"ℜ","realine":"ℛ","realpart":"ℜ","reals":"ℝ","Re":"ℜ","rect":"▭","reg":"®","REG":"®","ReverseElement":"∋","ReverseEquilibrium":"⇋","ReverseUpEquilibrium":"⥯","rfisht":"⥽","rfloor":"⌋","rfr":"𝔯","Rfr":"ℜ","rHar":"⥤","rhard":"⇁","rharu":"⇀","rharul":"⥬","Rho":"Ρ","rho":"ρ","rhov":"ϱ","RightAngleBracket":"⟩","RightArrowBar":"⇥","rightarrow":"→","RightArrow":"→","Rightarrow":"⇒","RightArrowLeftArrow":"⇄","rightarrowtail":"↣","RightCeiling":"⌉","RightDoubleBracket":"⟧","RightDownTeeVector":"⥝","RightDownVectorBar":"⥕","RightDownVector":"⇂","RightFloor":"⌋","rightharpoondown":"⇁","rightharpoonup":"⇀","rightleftarrows":"⇄","rightleftharpoons":"⇌","rightrightarrows":"⇉","rightsquigarrow":"↝","RightTeeArrow":"↦","RightTee":"⊢","RightTeeVector":"⥛","rightthreetimes":"⋌","RightTriangleBar":"⧐","RightTriangle":"⊳","RightTriangleEqual":"⊵","RightUpDownVector":"⥏","RightUpTeeVector":"⥜","RightUpVectorBar":"⥔","RightUpVector":"↾","RightVectorBar":"⥓","RightVector":"⇀","ring":"˚","risingdotseq":"≓","rlarr":"⇄","rlhar":"⇌","rlm":"‏","rmoustache":"⎱","rmoust":"⎱","rnmid":"⫮","roang":"⟭","roarr":"⇾","robrk":"⟧","ropar":"⦆","ropf":"𝕣","Ropf":"ℝ","roplus":"⨮","rotimes":"⨵","RoundImplies":"⥰","rpar":")","rpargt":"⦔","rppolint":"⨒","rrarr":"⇉","Rrightarrow":"⇛","rsaquo":"›","rscr":"𝓇","Rscr":"ℛ","rsh":"↱","Rsh":"↱","rsqb":"]","rsquo":"’","rsquor":"’","rthree":"⋌","rtimes":"⋊","rtri":"▹","rtrie":"⊵","rtrif":"▸","rtriltri":"⧎","RuleDelayed":"⧴","ruluhar":"⥨","rx":"℞","Sacute":"Ś","sacute":"ś","sbquo":"‚","scap":"⪸","Scaron":"Š","scaron":"š","Sc":"⪼","sc":"≻","sccue":"≽","sce":"⪰","scE":"⪴","Scedil":"Ş","scedil":"ş","Scirc":"Ŝ","scirc":"ŝ","scnap":"⪺","scnE":"⪶","scnsim":"⋩","scpolint":"⨓","scsim":"≿","Scy":"С","scy":"с","sdotb":"⊡","sdot":"⋅","sdote":"⩦","searhk":"⤥","searr":"↘","seArr":"⇘","searrow":"↘","sect":"§","semi":";","seswar":"⤩","setminus":"∖","setmn":"∖","sext":"✶","Sfr":"𝔖","sfr":"𝔰","sfrown":"⌢","sharp":"♯","SHCHcy":"Щ","shchcy":"щ","SHcy":"Ш","shcy":"ш","ShortDownArrow":"↓","ShortLeftArrow":"←","shortmid":"∣","shortparallel":"∥","ShortRightArrow":"→","ShortUpArrow":"↑","shy":"­","Sigma":"Σ","sigma":"σ","sigmaf":"ς","sigmav":"ς","sim":"∼","simdot":"⩪","sime":"≃","simeq":"≃","simg":"⪞","simgE":"⪠","siml":"⪝","simlE":"⪟","simne":"≆","simplus":"⨤","simrarr":"⥲","slarr":"←","SmallCircle":"∘","smallsetminus":"∖","smashp":"⨳","smeparsl":"⧤","smid":"∣","smile":"⌣","smt":"⪪","smte":"⪬","smtes":"⪬︀","SOFTcy":"Ь","softcy":"ь","solbar":"⌿","solb":"⧄","sol":"/","Sopf":"𝕊","sopf":"𝕤","spades":"♠","spadesuit":"♠","spar":"∥","sqcap":"⊓","sqcaps":"⊓︀","sqcup":"⊔","sqcups":"⊔︀","Sqrt":"√","sqsub":"⊏","sqsube":"⊑","sqsubset":"⊏","sqsubseteq":"⊑","sqsup":"⊐","sqsupe":"⊒","sqsupset":"⊐","sqsupseteq":"⊒","square":"□","Square":"□","SquareIntersection":"⊓","SquareSubset":"⊏","SquareSubsetEqual":"⊑","SquareSuperset":"⊐","SquareSupersetEqual":"⊒","SquareUnion":"⊔","squarf":"▪","squ":"□","squf":"▪","srarr":"→","Sscr":"𝒮","sscr":"𝓈","ssetmn":"∖","ssmile":"⌣","sstarf":"⋆","Star":"⋆","star":"☆","starf":"★","straightepsilon":"ϵ","straightphi":"ϕ","strns":"¯","sub":"⊂","Sub":"⋐","subdot":"⪽","subE":"⫅","sube":"⊆","subedot":"⫃","submult":"⫁","subnE":"⫋","subne":"⊊","subplus":"⪿","subrarr":"⥹","subset":"⊂","Subset":"⋐","subseteq":"⊆","subseteqq":"⫅","SubsetEqual":"⊆","subsetneq":"⊊","subsetneqq":"⫋","subsim":"⫇","subsub":"⫕","subsup":"⫓","succapprox":"⪸","succ":"≻","succcurlyeq":"≽","Succeeds":"≻","SucceedsEqual":"⪰","SucceedsSlantEqual":"≽","SucceedsTilde":"≿","succeq":"⪰","succnapprox":"⪺","succneqq":"⪶","succnsim":"⋩","succsim":"≿","SuchThat":"∋","sum":"∑","Sum":"∑","sung":"♪","sup1":"¹","sup2":"²","sup3":"³","sup":"⊃","Sup":"⋑","supdot":"⪾","supdsub":"⫘","supE":"⫆","supe":"⊇","supedot":"⫄","Superset":"⊃","SupersetEqual":"⊇","suphsol":"⟉","suphsub":"⫗","suplarr":"⥻","supmult":"⫂","supnE":"⫌","supne":"⊋","supplus":"⫀","supset":"⊃","Supset":"⋑","supseteq":"⊇","supseteqq":"⫆","supsetneq":"⊋","supsetneqq":"⫌","supsim":"⫈","supsub":"⫔","supsup":"⫖","swarhk":"⤦","swarr":"↙","swArr":"⇙","swarrow":"↙","swnwar":"⤪","szlig":"ß","Tab":"\t","target":"⌖","Tau":"Τ","tau":"τ","tbrk":"⎴","Tcaron":"Ť","tcaron":"ť","Tcedil":"Ţ","tcedil":"ţ","Tcy":"Т","tcy":"т","tdot":"⃛","telrec":"⌕","Tfr":"𝔗","tfr":"𝔱","there4":"∴","therefore":"∴","Therefore":"∴","Theta":"Θ","theta":"θ","thetasym":"ϑ","thetav":"ϑ","thickapprox":"≈","thicksim":"∼","ThickSpace":"  ","ThinSpace":" ","thinsp":" ","thkap":"≈","thksim":"∼","THORN":"Þ","thorn":"þ","tilde":"˜","Tilde":"∼","TildeEqual":"≃","TildeFullEqual":"≅","TildeTilde":"≈","timesbar":"⨱","timesb":"⊠","times":"×","timesd":"⨰","tint":"∭","toea":"⤨","topbot":"⌶","topcir":"⫱","top":"⊤","Topf":"𝕋","topf":"𝕥","topfork":"⫚","tosa":"⤩","tprime":"‴","trade":"™","TRADE":"™","triangle":"▵","triangledown":"▿","triangleleft":"◃","trianglelefteq":"⊴","triangleq":"≜","triangleright":"▹","trianglerighteq":"⊵","tridot":"◬","trie":"≜","triminus":"⨺","TripleDot":"⃛","triplus":"⨹","trisb":"⧍","tritime":"⨻","trpezium":"⏢","Tscr":"𝒯","tscr":"𝓉","TScy":"Ц","tscy":"ц","TSHcy":"Ћ","tshcy":"ћ","Tstrok":"Ŧ","tstrok":"ŧ","twixt":"≬","twoheadleftarrow":"↞","twoheadrightarrow":"↠","Uacute":"Ú","uacute":"ú","uarr":"↑","Uarr":"↟","uArr":"⇑","Uarrocir":"⥉","Ubrcy":"Ў","ubrcy":"ў","Ubreve":"Ŭ","ubreve":"ŭ","Ucirc":"Û","ucirc":"û","Ucy":"У","ucy":"у","udarr":"⇅","Udblac":"Ű","udblac":"ű","udhar":"⥮","ufisht":"⥾","Ufr":"𝔘","ufr":"𝔲","Ugrave":"Ù","ugrave":"ù","uHar":"⥣","uharl":"↿","uharr":"↾","uhblk":"▀","ulcorn":"⌜","ulcorner":"⌜","ulcrop":"⌏","ultri":"◸","Umacr":"Ū","umacr":"ū","uml":"¨","UnderBar":"_","UnderBrace":"⏟","UnderBracket":"⎵","UnderParenthesis":"⏝","Union":"⋃","UnionPlus":"⊎","Uogon":"Ų","uogon":"ų","Uopf":"𝕌","uopf":"𝕦","UpArrowBar":"⤒","uparrow":"↑","UpArrow":"↑","Uparrow":"⇑","UpArrowDownArrow":"⇅","updownarrow":"↕","UpDownArrow":"↕","Updownarrow":"⇕","UpEquilibrium":"⥮","upharpoonleft":"↿","upharpoonright":"↾","uplus":"⊎","UpperLeftArrow":"↖","UpperRightArrow":"↗","upsi":"υ","Upsi":"ϒ","upsih":"ϒ","Upsilon":"Υ","upsilon":"υ","UpTeeArrow":"↥","UpTee":"⊥","upuparrows":"⇈","urcorn":"⌝","urcorner":"⌝","urcrop":"⌎","Uring":"Ů","uring":"ů","urtri":"◹","Uscr":"𝒰","uscr":"𝓊","utdot":"⋰","Utilde":"Ũ","utilde":"ũ","utri":"▵","utrif":"▴","uuarr":"⇈","Uuml":"Ü","uuml":"ü","uwangle":"⦧","vangrt":"⦜","varepsilon":"ϵ","varkappa":"ϰ","varnothing":"∅","varphi":"ϕ","varpi":"ϖ","varpropto":"∝","varr":"↕","vArr":"⇕","varrho":"ϱ","varsigma":"ς","varsubsetneq":"⊊︀","varsubsetneqq":"⫋︀","varsupsetneq":"⊋︀","varsupsetneqq":"⫌︀","vartheta":"ϑ","vartriangleleft":"⊲","vartriangleright":"⊳","vBar":"⫨","Vbar":"⫫","vBarv":"⫩","Vcy":"В","vcy":"в","vdash":"⊢","vDash":"⊨","Vdash":"⊩","VDash":"⊫","Vdashl":"⫦","veebar":"⊻","vee":"∨","Vee":"⋁","veeeq":"≚","vellip":"⋮","verbar":"|","Verbar":"‖","vert":"|","Vert":"‖","VerticalBar":"∣","VerticalLine":"|","VerticalSeparator":"❘","VerticalTilde":"≀","VeryThinSpace":" ","Vfr":"𝔙","vfr":"𝔳","vltri":"⊲","vnsub":"⊂⃒","vnsup":"⊃⃒","Vopf":"𝕍","vopf":"𝕧","vprop":"∝","vrtri":"⊳","Vscr":"𝒱","vscr":"𝓋","vsubnE":"⫋︀","vsubne":"⊊︀","vsupnE":"⫌︀","vsupne":"⊋︀","Vvdash":"⊪","vzigzag":"⦚","Wcirc":"Ŵ","wcirc":"ŵ","wedbar":"⩟","wedge":"∧","Wedge":"⋀","wedgeq":"≙","weierp":"℘","Wfr":"𝔚","wfr":"𝔴","Wopf":"𝕎","wopf":"𝕨","wp":"℘","wr":"≀","wreath":"≀","Wscr":"𝒲","wscr":"𝓌","xcap":"⋂","xcirc":"◯","xcup":"⋃","xdtri":"▽","Xfr":"𝔛","xfr":"𝔵","xharr":"⟷","xhArr":"⟺","Xi":"Ξ","xi":"ξ","xlarr":"⟵","xlArr":"⟸","xmap":"⟼","xnis":"⋻","xodot":"⨀","Xopf":"𝕏","xopf":"𝕩","xoplus":"⨁","xotime":"⨂","xrarr":"⟶","xrArr":"⟹","Xscr":"𝒳","xscr":"𝓍","xsqcup":"⨆","xuplus":"⨄","xutri":"△","xvee":"⋁","xwedge":"⋀","Yacute":"Ý","yacute":"ý","YAcy":"Я","yacy":"я","Ycirc":"Ŷ","ycirc":"ŷ","Ycy":"Ы","ycy":"ы","yen":"¥","Yfr":"𝔜","yfr":"𝔶","YIcy":"Ї","yicy":"ї","Yopf":"𝕐","yopf":"𝕪","Yscr":"𝒴","yscr":"𝓎","YUcy":"Ю","yucy":"ю","yuml":"ÿ","Yuml":"Ÿ","Zacute":"Ź","zacute":"ź","Zcaron":"Ž","zcaron":"ž","Zcy":"З","zcy":"з","Zdot":"Ż","zdot":"ż","zeetrf":"ℨ","ZeroWidthSpace":"​","Zeta":"Ζ","zeta":"ζ","zfr":"𝔷","Zfr":"ℨ","ZHcy":"Ж","zhcy":"ж","zigrarr":"⇝","zopf":"𝕫","Zopf":"ℤ","Zscr":"𝒵","zscr":"𝓏","zwj":"‍","zwnj":"‌"};

/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var easing_patterns_namespaceObject = {};
__webpack_require__.r(easing_patterns_namespaceObject);
__webpack_require__.d(easing_patterns_namespaceObject, "linear", function() { return linear; });
__webpack_require__.d(easing_patterns_namespaceObject, "easeInQuad", function() { return easeInQuad; });
__webpack_require__.d(easing_patterns_namespaceObject, "easeOutQuad", function() { return easeOutQuad; });
__webpack_require__.d(easing_patterns_namespaceObject, "easeInOutQuad", function() { return easeInOutQuad; });
__webpack_require__.d(easing_patterns_namespaceObject, "easeInCubic", function() { return easeInCubic; });
__webpack_require__.d(easing_patterns_namespaceObject, "easeOutCubic", function() { return easeOutCubic; });
__webpack_require__.d(easing_patterns_namespaceObject, "easeInOutCubic", function() { return easeInOutCubic; });
__webpack_require__.d(easing_patterns_namespaceObject, "easeInQuart", function() { return easeInQuart; });
__webpack_require__.d(easing_patterns_namespaceObject, "easeOutQuart", function() { return easeOutQuart; });
__webpack_require__.d(easing_patterns_namespaceObject, "easeInOutQuart", function() { return easeInOutQuart; });
__webpack_require__.d(easing_patterns_namespaceObject, "easeInQuint", function() { return easeInQuint; });
__webpack_require__.d(easing_patterns_namespaceObject, "easeOutQuint", function() { return easeOutQuint; });
__webpack_require__.d(easing_patterns_namespaceObject, "easeInOutQuint", function() { return easeInOutQuint; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/util/console.js
function createMessage(message, vm, parent) {
  if (parent) {
    vm = {
      _isVue: true,
      $parent: parent,
      $options: vm
    };
  }

  if (vm) {
    // Only show each message once per instance
    vm.$_alreadyWarned = vm.$_alreadyWarned || [];
    if (vm.$_alreadyWarned.includes(message)) return;
    vm.$_alreadyWarned.push(message);
  }

  return `[Vuetify] ${message}` + (vm ? generateComponentTrace(vm) : '');
}

function consoleInfo(message, vm, parent) {
  const newMessage = createMessage(message, vm, parent);
  newMessage != null && console.info(newMessage);
}
function consoleWarn(message, vm, parent) {
  const newMessage = createMessage(message, vm, parent);
  newMessage != null && console.warn(newMessage);
}
function consoleError(message, vm, parent) {
  const newMessage = createMessage(message, vm, parent);
  newMessage != null && console.error(newMessage);
}
function deprecate(original, replacement, vm, parent) {
  consoleWarn(`[UPGRADE] '${original}' is deprecated, use '${replacement}' instead.`, vm, parent);
}
function breaking(original, replacement, vm, parent) {
  consoleError(`[BREAKING] '${original}' has been removed, use '${replacement}' instead. For more information, see the upgrade guide https://github.com/vuetifyjs/vuetify/releases/tag/v2.0.0#user-content-upgrade-guide`, vm, parent);
}
function removed(original, vm, parent) {
  consoleWarn(`[REMOVED] '${original}' has been removed. You can safely omit it.`, vm, parent);
}
/**
 * Shamelessly stolen from vuejs/vue/blob/dev/src/core/util/debug.js
 */

const classifyRE = /(?:^|[-_])(\w)/g;

const classify = str => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');

function formatComponentName(vm, includeFile) {
  if (vm.$root === vm) {
    return '<Root>';
  }

  const options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
  let name = options.name || options._componentTag;
  const file = options.__file;

  if (!name && file) {
    const match = file.match(/([^/\\]+)\.vue$/);
    name = match && match[1];
  }

  return (name ? `<${classify(name)}>` : `<Anonymous>`) + (file && includeFile !== false ? ` at ${file}` : '');
}

function generateComponentTrace(vm) {
  if (vm._isVue && vm.$parent) {
    const tree = [];
    let currentRecursiveSequence = 0;

    while (vm) {
      if (tree.length > 0) {
        const last = tree[tree.length - 1];

        if (last.constructor === vm.constructor) {
          currentRecursiveSequence++;
          vm = vm.$parent;
          continue;
        } else if (currentRecursiveSequence > 0) {
          tree[tree.length - 1] = [last, currentRecursiveSequence];
          currentRecursiveSequence = 0;
        }
      }

      tree.push(vm);
      vm = vm.$parent;
    }

    return '\n\nfound in\n\n' + tree.map((vm, i) => `${i === 0 ? '---> ' : ' '.repeat(5 + i * 2)}${Array.isArray(vm) ? `${formatComponentName(vm[0])}... (${vm[1]} recursive calls)` : formatComponentName(vm)}`).join('\n');
  } else {
    return `\n\n(found in ${formatComponentName(vm)})`;
  }
}
//# sourceMappingURL=console.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/install.js


function install(Vue, args = {}) {
  if (install.installed) return;
  install.installed = true;

  if (external_commonjs_vue_commonjs2_vue_root_Vue_default.a !== Vue) {
    consoleError('Multiple instances of Vue detected\nSee https://github.com/vuetifyjs/vuetify/issues/4068\n\nIf you\'re seeing "$attrs is readonly", it\'s caused by this');
  }

  const components = args.components || {};
  const directives = args.directives || {};

  for (const name in directives) {
    const directive = directives[name];
    Vue.directive(name, directive);
  }

  (function registerComponents(components) {
    if (components) {
      for (const key in components) {
        const component = components[key];

        if (component && !registerComponents(component.$_vuetify_subcomponents)) {
          Vue.component(key, component);
        }
      }

      return true;
    }

    return false;
  })(components); // Used to avoid multiple mixins being setup
  // when in dev mode and hot module reload
  // https://github.com/vuejs/vue/issues/5089#issuecomment-284260111


  if (Vue.$_vuetify_installed) return;
  Vue.$_vuetify_installed = true;
  Vue.mixin({
    beforeCreate() {
      const options = this.$options;

      if (options.vuetify) {
        options.vuetify.init(this, options.ssrContext);
        this.$vuetify = Vue.observable(options.vuetify.framework);
      } else {
        this.$vuetify = options.parent && options.parent.$vuetify || this;
      }
    }

  });
}
//# sourceMappingURL=install.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/service/index.js
class Service {
  constructor() {
    this.framework = {};
  }

  init(root, ssrContext) {}

}
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/application/index.js
// Extensions

class application_Application extends Service {
  constructor() {
    super(...arguments);
    this.bar = 0;
    this.top = 0;
    this.left = 0;
    this.insetFooter = 0;
    this.right = 0;
    this.bottom = 0;
    this.footer = 0;
    this.application = {
      bar: {},
      top: {},
      left: {},
      insetFooter: {},
      right: {},
      bottom: {},
      footer: {}
    };
  }

  register(uid, location, size) {
    this.application[location][uid] = size;
    this.update(location);
  }

  unregister(uid, location) {
    if (this.application[location][uid] == null) return;
    delete this.application[location][uid];
    this.update(location);
  }

  update(location) {
    this[location] = Object.values(this.application[location]).reduce((acc, cur) => acc + cur, 0);
  }

}
application_Application.property = 'application';
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/breakpoint/index.js
// Extensions

class breakpoint_Breakpoint extends Service {
  constructor(options = {}) {
    super(); // Public

    this.xs = false;
    this.sm = false;
    this.md = false;
    this.lg = false;
    this.xl = false;
    this.xsOnly = false;
    this.smOnly = false;
    this.smAndDown = false;
    this.smAndUp = false;
    this.mdOnly = false;
    this.mdAndDown = false;
    this.mdAndUp = false;
    this.lgOnly = false;
    this.lgAndDown = false;
    this.lgAndUp = false;
    this.xlOnly = false;
    this.name = '';
    this.height = 0;
    this.width = 0;
    this.thresholds = {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920
    };
    this.scrollbarWidth = 16;
    this.resizeTimeout = 0;
    this.thresholds = { ...this.thresholds,
      ...options.thresholds
    };
    this.scrollbarWidth = options.scrollBarWidth || this.scrollbarWidth;
    this.init();
  }

  init() {
    /* istanbul ignore if */
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', this.onResize.bind(this), {
      passive: true
    });
    this.update();
  }

  onResize() {
    clearTimeout(this.resizeTimeout); // Added debounce to match what
    // v-resize used to do but was
    // removed due to a memory leak
    // https://github.com/vuetifyjs/vuetify/pull/2997

    this.resizeTimeout = window.setTimeout(this.update.bind(this), 200);
  }
  /* eslint-disable-next-line max-statements */


  update() {
    const height = this.getClientHeight();
    const width = this.getClientWidth();
    const xs = width < this.thresholds.xs;
    const sm = width < this.thresholds.sm && !xs;
    const md = width < this.thresholds.md - this.scrollbarWidth && !(sm || xs);
    const lg = width < this.thresholds.lg - this.scrollbarWidth && !(md || sm || xs);
    const xl = width >= this.thresholds.lg - this.scrollbarWidth;
    this.height = height;
    this.width = width;
    this.xs = xs;
    this.sm = sm;
    this.md = md;
    this.lg = lg;
    this.xl = xl;
    this.xsOnly = xs;
    this.smOnly = sm;
    this.smAndDown = (xs || sm) && !(md || lg || xl);
    this.smAndUp = !xs && (sm || md || lg || xl);
    this.mdOnly = md;
    this.mdAndDown = (xs || sm || md) && !(lg || xl);
    this.mdAndUp = !(xs || sm) && (md || lg || xl);
    this.lgOnly = lg;
    this.lgAndDown = (xs || sm || md || lg) && !xl;
    this.lgAndUp = !(xs || sm || md) && (lg || xl);
    this.xlOnly = xl;

    switch (true) {
      case xs:
        this.name = 'xs';
        break;

      case sm:
        this.name = 'sm';
        break;

      case md:
        this.name = 'md';
        break;

      case lg:
        this.name = 'lg';
        break;

      default:
        this.name = 'xl';
        break;
    }
  } // Cross-browser support as described in:
  // https://stackoverflow.com/questions/1248081


  getClientWidth() {
    /* istanbul ignore if */
    if (typeof document === 'undefined') return 0; // SSR

    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }

  getClientHeight() {
    /* istanbul ignore if */
    if (typeof document === 'undefined') return 0; // SSR

    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

}
breakpoint_Breakpoint.property = 'breakpoint';
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/goto/easing-patterns.js
// linear
const linear = t => t; // accelerating from zero velocity

const easeInQuad = t => t ** 2; // decelerating to zero velocity

const easeOutQuad = t => t * (2 - t); // acceleration until halfway, then deceleration

const easeInOutQuad = t => t < 0.5 ? 2 * t ** 2 : -1 + (4 - 2 * t) * t; // accelerating from zero velocity

const easeInCubic = t => t ** 3; // decelerating to zero velocity

const easeOutCubic = t => --t ** 3 + 1; // acceleration until halfway, then deceleration

const easeInOutCubic = t => t < 0.5 ? 4 * t ** 3 : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; // accelerating from zero velocity

const easeInQuart = t => t ** 4; // decelerating to zero velocity

const easeOutQuart = t => 1 - --t ** 4; // acceleration until halfway, then deceleration

const easeInOutQuart = t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t; // accelerating from zero velocity

const easeInQuint = t => t ** 5; // decelerating to zero velocity

const easeOutQuint = t => 1 + --t ** 5; // acceleration until halfway, then deceleration

const easeInOutQuint = t => t < 0.5 ? 16 * t ** 5 : 1 + 16 * --t ** 5;
//# sourceMappingURL=easing-patterns.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/goto/util.js
// Return target's cumulative offset from the top
function getOffset(target) {
  if (typeof target === 'number') {
    return target;
  }

  let el = $(target);

  if (!el) {
    throw typeof target === 'string' ? new Error(`Target element "${target}" not found.`) : new TypeError(`Target must be a Number/Selector/HTMLElement/VueComponent, received ${type(target)} instead.`);
  }

  let totalOffset = 0;

  while (el) {
    totalOffset += el.offsetTop;
    el = el.offsetParent;
  }

  return totalOffset;
}
function getContainer(container) {
  const el = $(container);
  if (el) return el;
  throw typeof container === 'string' ? new Error(`Container element "${container}" not found.`) : new TypeError(`Container must be a Selector/HTMLElement/VueComponent, received ${type(container)} instead.`);
}

function type(el) {
  return el == null ? el : el.constructor.name;
}

function $(el) {
  if (typeof el === 'string') {
    return document.querySelector(el);
  } else if (el && el._isVue) {
    return el.$el;
  } else if (el instanceof HTMLElement) {
    return el;
  } else {
    return null;
  }
}
//# sourceMappingURL=util.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/goto/index.js
// Extensions
 // Utilities



function goTo(_target, _settings = {}) {
  const settings = {
    container: document.scrollingElement || document.body || document.documentElement,
    duration: 500,
    offset: 0,
    easing: 'easeInOutCubic',
    appOffset: true,
    ..._settings
  };
  const container = getContainer(settings.container);
  /* istanbul ignore else */

  if (settings.appOffset && goTo.framework.application) {
    const isDrawer = container.classList.contains('v-navigation-drawer');
    const isClipped = container.classList.contains('v-navigation-drawer--clipped');
    const {
      bar,
      top
    } = goTo.framework.application;
    settings.offset += bar;
    /* istanbul ignore else */

    if (!isDrawer || isClipped) settings.offset += top;
  }

  const startTime = performance.now();
  const targetLocation = getOffset(_target) - settings.offset;
  const startLocation = container.scrollTop;
  if (targetLocation === startLocation) return Promise.resolve(targetLocation);
  const ease = typeof settings.easing === 'function' ? settings.easing : easing_patterns_namespaceObject[settings.easing];
  /* istanbul ignore else */

  if (!ease) throw new TypeError(`Easing function "${settings.easing}" not found.`); // Cannot be tested properly in jsdom
  // tslint:disable-next-line:promise-must-complete

  /* istanbul ignore next */

  return new Promise(resolve => requestAnimationFrame(function step(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.abs(settings.duration ? Math.min(timeElapsed / settings.duration, 1) : 1);
    container.scrollTop = Math.floor(startLocation + (targetLocation - startLocation) * ease(progress));
    const clientHeight = container === document.body ? document.documentElement.clientHeight : container.clientHeight;

    if (progress === 1 || clientHeight + container.scrollTop === container.scrollHeight) {
      return resolve(targetLocation);
    }

    requestAnimationFrame(step);
  }));
}
goTo.framework = {};

goTo.init = () => {};

class goto_Goto extends Service {
  constructor() {
    super();
    return goTo;
  }

}
goto_Goto.property = 'goTo';
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/icons/presets/mdi-svg.js
const icons = {
  complete: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
  cancel: 'M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z',
  close: 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z',
  delete: 'M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z',
  clear: 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z',
  success: 'M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z',
  info: 'M13,9H11V7H13M13,17H11V11H13M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z',
  warning: 'M11,4.5H13V15.5H11V4.5M13,17.5V19.5H11V17.5H13Z',
  error: 'M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z',
  prev: 'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z',
  next: 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z',
  checkboxOn: 'M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z',
  checkboxOff: 'M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z',
  checkboxIndeterminate: 'M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z',
  delimiter: 'M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z',
  sort: 'M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z',
  expand: 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z',
  menu: 'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z',
  subgroup: 'M7,10L12,15L17,10H7Z',
  dropdown: 'M7,10L12,15L17,10H7Z',
  radioOn: 'M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,7C9.24,7 7,9.24 7,12C7,14.76 9.24,17 12,17C14.76,17 17,14.76 17,12C17,9.24 14.76,7 12,7Z',
  radioOff: 'M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z',
  edit: 'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z',
  ratingEmpty: 'M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z',
  ratingFull: 'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z',
  ratingHalf: 'M12,15.4V6.1L13.71,10.13L18.09,10.5L14.77,13.39L15.76,17.67M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z',
  loading: 'M19,8L15,12H18C18,15.31 15.31,18 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20C16.42,20 20,16.42 20,12H23M6,12C6,8.69 8.69,6 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4C7.58,4 4,7.58 4,12H1L5,16L9,12',
  first: 'M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z',
  last: 'M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z',
  unfold: 'M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z',
  file: 'M16.5,6V17.5C16.5,19.71 14.71,21.5 12.5,21.5C10.29,21.5 8.5,19.71 8.5,17.5V5C8.5,3.62 9.62,2.5 11,2.5C12.38,2.5 13.5,3.62 13.5,5V15.5C13.5,16.05 13.05,16.5 12.5,16.5C11.95,16.5 11.5,16.05 11.5,15.5V6H10V15.5C10,16.88 11.12,18 12.5,18C13.88,18 15,16.88 15,15.5V5C15,2.79 13.21,1 11,1C8.79,1 7,2.79 7,5V17.5C7,20.54 9.46,23 12.5,23C15.54,23 18,20.54 18,17.5V6H16.5Z'
};
/* harmony default export */ var mdi_svg = (icons);
//# sourceMappingURL=mdi-svg.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/icons/presets/md.js
const md_icons = {
  complete: 'check',
  cancel: 'cancel',
  close: 'close',
  delete: 'cancel',
  clear: 'clear',
  success: 'check_circle',
  info: 'info',
  warning: 'priority_high',
  error: 'warning',
  prev: 'chevron_left',
  next: 'chevron_right',
  checkboxOn: 'check_box',
  checkboxOff: 'check_box_outline_blank',
  checkboxIndeterminate: 'indeterminate_check_box',
  delimiter: 'fiber_manual_record',
  sort: 'arrow_upward',
  expand: 'keyboard_arrow_down',
  menu: 'menu',
  subgroup: 'arrow_drop_down',
  dropdown: 'arrow_drop_down',
  radioOn: 'radio_button_checked',
  radioOff: 'radio_button_unchecked',
  edit: 'edit',
  ratingEmpty: 'star_border',
  ratingFull: 'star',
  ratingHalf: 'star_half',
  loading: 'cached',
  first: 'first_page',
  last: 'last_page',
  unfold: 'unfold_more',
  file: 'attach_file'
};
/* harmony default export */ var presets_md = (md_icons);
//# sourceMappingURL=md.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/icons/presets/mdi.js
const mdi_icons = {
  complete: 'mdi-check',
  cancel: 'mdi-close-circle',
  close: 'mdi-close',
  delete: 'mdi-close-circle',
  clear: 'mdi-close',
  success: 'mdi-check-circle',
  info: 'mdi-information',
  warning: 'mdi-exclamation',
  error: 'mdi-alert',
  prev: 'mdi-chevron-left',
  next: 'mdi-chevron-right',
  checkboxOn: 'mdi-checkbox-marked',
  checkboxOff: 'mdi-checkbox-blank-outline',
  checkboxIndeterminate: 'mdi-minus-box',
  delimiter: 'mdi-circle',
  sort: 'mdi-arrow-up',
  expand: 'mdi-chevron-down',
  menu: 'mdi-menu',
  subgroup: 'mdi-menu-down',
  dropdown: 'mdi-menu-down',
  radioOn: 'mdi-radiobox-marked',
  radioOff: 'mdi-radiobox-blank',
  edit: 'mdi-pencil',
  ratingEmpty: 'mdi-star-outline',
  ratingFull: 'mdi-star',
  ratingHalf: 'mdi-star-half',
  loading: 'mdi-cached',
  first: 'mdi-page-first',
  last: 'mdi-page-last',
  unfold: 'mdi-unfold-more-horizontal',
  file: 'mdi-paperclip'
};
/* harmony default export */ var mdi = (mdi_icons);
//# sourceMappingURL=mdi.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/icons/presets/fa.js
const fa_icons = {
  complete: 'fas fa-check',
  cancel: 'fas fa-times-circle',
  close: 'fas fa-times',
  delete: 'fas fa-times-circle',
  clear: 'fas fa-times-circle',
  success: 'fas fa-check-circle',
  info: 'fas fa-info-circle',
  warning: 'fas fa-exclamation',
  error: 'fas fa-exclamation-triangle',
  prev: 'fas fa-chevron-left',
  next: 'fas fa-chevron-right',
  checkboxOn: 'fas fa-check-square',
  checkboxOff: 'far fa-square',
  checkboxIndeterminate: 'fas fa-minus-square',
  delimiter: 'fas fa-circle',
  sort: 'fas fa-sort-up',
  expand: 'fas fa-chevron-down',
  menu: 'fas fa-bars',
  subgroup: 'fas fa-caret-down',
  dropdown: 'fas fa-caret-down',
  radioOn: 'far fa-dot-circle',
  radioOff: 'far fa-circle',
  edit: 'fas fa-edit',
  ratingEmpty: 'far fa-star',
  ratingFull: 'fas fa-star',
  ratingHalf: 'fas fa-star-half',
  loading: 'fas fa-sync',
  first: 'fas fa-step-backward',
  last: 'fas fa-step-forward',
  unfold: 'fas fa-arrows-alt-v',
  file: 'fas fa-paperclip'
};
/* harmony default export */ var fa = (fa_icons);
//# sourceMappingURL=fa.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/icons/presets/fa4.js
const fa4_icons = {
  complete: 'fa fa-check',
  cancel: 'fa fa-times-circle',
  close: 'fa fa-times',
  delete: 'fa fa-times-circle',
  clear: 'fa fa-times-circle',
  success: 'fa fa-check-circle',
  info: 'fa fa-info-circle',
  warning: 'fa fa-exclamation',
  error: 'fa fa-exclamation-triangle',
  prev: 'fa fa-chevron-left',
  next: 'fa fa-chevron-right',
  checkboxOn: 'fa fa-check-square',
  checkboxOff: 'fa fa-square-o',
  checkboxIndeterminate: 'fa fa-minus-square',
  delimiter: 'fa fa-circle',
  sort: 'fa fa-sort-up',
  expand: 'fa fa-chevron-down',
  menu: 'fa fa-bars',
  subgroup: 'fa fa-caret-down',
  dropdown: 'fa fa-caret-down',
  radioOn: 'fa fa-dot-circle-o',
  radioOff: 'fa fa-circle-o',
  edit: 'fa fa-pencil',
  ratingEmpty: 'fa fa-star-o',
  ratingFull: 'fa fa-star',
  ratingHalf: 'fa fa-star-half-o',
  loading: 'fa fa-refresh',
  first: 'fa fa-step-backward',
  last: 'fa fa-step-forward',
  unfold: 'fa fa-angle-double-down',
  file: 'fa fa-paperclip'
};
/* harmony default export */ var fa4 = (fa4_icons);
//# sourceMappingURL=fa4.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/icons/presets/index.js





/* harmony default export */ var presets = (Object.freeze({
  mdiSvg: mdi_svg,
  md: presets_md,
  mdi: mdi,
  fa: fa,
  fa4: fa4
}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/icons/index.js
// Extensions
 // Presets


class icons_Icons extends Service {
  constructor(options = {}) {
    super();
    this.iconfont = 'mdi';
    this.values = presets[this.iconfont];
    if (options.iconfont) this.iconfont = options.iconfont;
    this.values = { ...presets[this.iconfont],
      ...(options.values || {})
    };
  }

}
icons_Icons.property = 'icons';
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/locale/en.js
/* harmony default export */ var en = ({
  close: 'Close',
  dataIterator: {
    pageText: '{0}-{1} of {2}',
    noResultsText: 'No matching records found',
    loadingText: 'Loading items...'
  },
  dataTable: {
    itemsPerPageText: 'Rows per page:',
    ariaLabel: {
      sortDescending: ': Sorted descending. Activate to remove sorting.',
      sortAscending: ': Sorted ascending. Activate to sort descending.',
      sortNone: ': Not sorted. Activate to sort ascending.'
    },
    sortBy: 'Sort by'
  },
  dataFooter: {
    itemsPerPageText: 'Items per page:',
    itemsPerPageAll: 'All',
    nextPage: 'Next page',
    prevPage: 'Previous page',
    firstPage: 'First page',
    lastPage: 'Last page'
  },
  datePicker: {
    itemsSelected: '{0} selected'
  },
  noDataText: 'No data available',
  carousel: {
    prev: 'Previous visual',
    next: 'Next visual'
  },
  calendar: {
    moreEvents: '{0} more'
  },
  fileInput: {
    counter: '{0} files',
    counterSize: '{0} files ({1} in total)'
  }
});
//# sourceMappingURL=en.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/util/helpers.js

function createSimpleFunctional(c, el = 'div', name) {
  return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: name || c.replace(/__/g, '-'),
    functional: true,

    render(h, {
      data,
      children
    }) {
      data.staticClass = `${c} ${data.staticClass || ''}`.trim();
      return h(el, data, children);
    }

  });
}

function mergeTransitions(transitions, array) {
  if (Array.isArray(transitions)) return transitions.concat(array);
  if (transitions) array.push(transitions);
  return array;
}

function createSimpleTransition(name, origin = 'top center 0', mode) {
  return {
    name,
    functional: true,
    props: {
      group: {
        type: Boolean,
        default: false
      },
      hideOnLeave: {
        type: Boolean,
        default: false
      },
      leaveAbsolute: {
        type: Boolean,
        default: false
      },
      mode: {
        type: String,
        default: mode
      },
      origin: {
        type: String,
        default: origin
      }
    },

    render(h, context) {
      const tag = `transition${context.props.group ? '-group' : ''}`;
      context.data = context.data || {};
      context.data.props = {
        name,
        mode: context.props.mode
      };
      context.data.on = context.data.on || {};

      if (!Object.isExtensible(context.data.on)) {
        context.data.on = { ...context.data.on
        };
      }

      const ourBeforeEnter = [];
      const ourLeave = [];

      const absolute = el => el.style.position = 'absolute';

      ourBeforeEnter.push(el => {
        el.style.transformOrigin = context.props.origin;
        el.style.webkitTransformOrigin = context.props.origin;
      });
      if (context.props.leaveAbsolute) ourLeave.push(absolute);

      if (context.props.hideOnLeave) {
        ourLeave.push(el => el.style.display = 'none');
      }

      const {
        beforeEnter,
        leave
      } = context.data.on; // Type says Function | Function[] but
      // will only work if provided a function

      context.data.on.beforeEnter = () => mergeTransitions(beforeEnter, ourBeforeEnter);

      context.data.on.leave = mergeTransitions(leave, ourLeave);
      return h(tag, context.data, context.children);
    }

  };
}
function createJavaScriptTransition(name, functions, mode = 'in-out') {
  return {
    name,
    functional: true,
    props: {
      mode: {
        type: String,
        default: mode
      }
    },

    render(h, context) {
      const data = {
        props: { ...context.props,
          name
        },
        on: functions
      };
      return h('transition', data, context.children);
    }

  };
}
function directiveConfig(binding, defaults = {}) {
  return { ...defaults,
    ...binding.modifiers,
    value: binding.arg,
    ...(binding.value || {})
  };
}
function addOnceEventListener(el, eventName, cb, options = false) {
  var once = event => {
    cb(event);
    el.removeEventListener(eventName, once, options);
  };

  el.addEventListener(eventName, once, options);
}
let passiveSupported = false;

try {
  if (typeof window !== 'undefined') {
    const testListenerOpts = Object.defineProperty({}, 'passive', {
      get: () => {
        passiveSupported = true;
      }
    });
    window.addEventListener('testListener', testListenerOpts, testListenerOpts);
    window.removeEventListener('testListener', testListenerOpts, testListenerOpts);
  }
} catch (e) {
  console.warn(e);
}


function addPassiveEventListener(el, event, cb, options) {
  el.addEventListener(event, cb, passiveSupported ? options : false);
}
function getNestedValue(obj, path, fallback) {
  const last = path.length - 1;
  if (last < 0) return obj === undefined ? fallback : obj;

  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback;
    }

    obj = obj[path[i]];
  }

  if (obj == null) return fallback;
  return obj[path[last]] === undefined ? fallback : obj[path[last]];
}
function deepEqual(a, b) {
  if (a === b) return true;

  if (a instanceof Date && b instanceof Date) {
    // If the values are Date, they were convert to timestamp with getTime and compare it
    if (a.getTime() !== b.getTime()) return false;
  }

  if (a !== Object(a) || b !== Object(b)) {
    // If the values aren't objects, they were already checked for equality
    return false;
  }

  const props = Object.keys(a);

  if (props.length !== Object.keys(b).length) {
    // Different number of props, don't bother to check
    return false;
  }

  return props.every(p => deepEqual(a[p], b[p]));
}
function getObjectValueByPath(obj, path, fallback) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (obj == null || !path || typeof path !== 'string') return fallback;
  if (obj[path] !== undefined) return obj[path];
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties

  path = path.replace(/^\./, ''); // strip a leading dot

  return getNestedValue(obj, path.split('.'), fallback);
}
function getPropertyFromItem(item, property, fallback) {
  if (property == null) return item === undefined ? fallback : item;
  if (item !== Object(item)) return fallback === undefined ? item : fallback;
  if (typeof property === 'string') return getObjectValueByPath(item, property, fallback);
  if (Array.isArray(property)) return getNestedValue(item, property, fallback);
  if (typeof property !== 'function') return fallback;
  const value = property(item, fallback);
  return typeof value === 'undefined' ? fallback : value;
}
function createRange(length) {
  return Array.from({
    length
  }, (v, k) => k);
}
function getZIndex(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0;
  const index = +window.getComputedStyle(el).getPropertyValue('z-index');
  if (!index) return getZIndex(el.parentNode);
  return index;
}
const tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};
function escapeHTML(str) {
  return str.replace(/[&<>]/g, tag => tagsToReplace[tag] || tag);
}
function filterObjectOnKeys(obj, keys) {
  const filtered = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (typeof obj[key] !== 'undefined') {
      filtered[key] = obj[key];
    }
  }

  return filtered;
}
function convertToUnit(str, unit = 'px') {
  if (str == null || str === '') {
    return undefined;
  } else if (isNaN(+str)) {
    return String(str);
  } else {
    return `${Number(str)}${unit}`;
  }
}
function kebabCase(str) {
  return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function isObject(obj) {
  return obj !== null && typeof obj === 'object';
} // KeyboardEvent.keyCode aliases

const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34
});
const ICONS_PREFIX = '$vuetify.'; // This remaps internal names like '$vuetify.icons.cancel'
// to the current name or component for that icon.

function remapInternalIcon(vm, iconName) {
  if (!iconName.startsWith(ICONS_PREFIX)) {
    return iconName;
  } // Get the target icon name


  const iconPath = `$vuetify.icons.values.${iconName.split('.').pop()}`; // Now look up icon indirection name,
  // e.g. '$vuetify.icons.values.cancel'

  return getObjectValueByPath(vm, iconPath, iconName);
}
function keys(o) {
  return Object.keys(o);
}
/**
 * Camelize a hyphen-delimited string.
 */

const camelizeRE = /-(\w)/g;
const camelize = str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');
};
/**
 * Returns the set difference of B and A, i.e. the set of elements in B but not in A
 */

function arrayDiff(a, b) {
  const diff = [];

  for (let i = 0; i < b.length; i++) {
    if (a.indexOf(b[i]) < 0) diff.push(b[i]);
  }

  return diff;
}
/**
 * Makes the first character of a string uppercase
 */

function upperFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function groupByProperty(xs, key) {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
function wrapInArray(v) {
  return v != null ? Array.isArray(v) ? v : [v] : [];
}
function sortItems(items, sortBy, sortDesc, locale, customSorters) {
  if (sortBy === null || !sortBy.length) return items;
  return items.sort((a, b) => {
    for (let i = 0; i < sortBy.length; i++) {
      const sortKey = sortBy[i];
      let sortA = getObjectValueByPath(a, sortKey);
      let sortB = getObjectValueByPath(b, sortKey);

      if (sortDesc[i]) {
        [sortA, sortB] = [sortB, sortA];
      }

      if (customSorters && customSorters[sortKey]) return customSorters[sortKey](sortA, sortB); // Check if both cannot be evaluated

      if (sortA === null && sortB === null) {
        return 0;
      }

      [sortA, sortB] = [sortA, sortB].map(s => (s || '').toString().toLocaleLowerCase());

      if (sortA !== sortB) {
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB);
        return sortA.localeCompare(sortB, locale);
      }
    }

    return 0;
  });
}
function defaultFilter(value, search, item) {
  return value != null && search != null && typeof value !== 'boolean' && value.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
}
function searchItems(items, search) {
  if (!search) return items;
  search = search.toString().toLowerCase();
  if (search.trim() === '') return items;
  return items.filter(item => Object.keys(item).some(key => defaultFilter(getObjectValueByPath(item, key), search, item)));
}
/**
 * Returns:
 *  - 'normal' for old style slots - `<template slot="default">`
 *  - 'scoped' for old style scoped slots (`<template slot="default" slot-scope="data">`) or bound v-slot (`#default="data"`)
 *  - 'v-slot' for unbound v-slot (`#default`) - only if the third param is true, otherwise counts as scoped
 */

function getSlotType(vm, name, split) {
  if (vm.$slots[name] && vm.$scopedSlots[name] && vm.$scopedSlots[name].name) {
    return split ? 'v-slot' : 'scoped';
  }

  if (vm.$slots[name]) return 'normal';
  if (vm.$scopedSlots[name]) return 'scoped';
}
function debounce(fn, delay) {
  let timeoutId = 0;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
function getPrefixedScopedSlots(prefix, scopedSlots) {
  return Object.keys(scopedSlots).filter(k => k.startsWith(prefix)).reduce((obj, k) => {
    obj[k.replace(prefix, '')] = scopedSlots[k];
    return obj;
  }, {});
}
function getSlot(vm, name = 'default', data, optional = false) {
  if (vm.$scopedSlots[name]) {
    return vm.$scopedSlots[name](data);
  } else if (vm.$slots[name] && (!data || optional)) {
    return vm.$slots[name];
  }

  return undefined;
}
function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}
function padEnd(str, length, char = '0') {
  return str + char.repeat(Math.max(0, length - str.length));
}
function chunk(str, size = 1) {
  const chunked = [];
  let index = 0;

  while (index < str.length) {
    chunked.push(str.substr(index, size));
    index += size;
  }

  return chunked;
}
function humanReadableFileSize(bytes, binary = false) {
  const base = binary ? 1024 : 1000;

  if (bytes < base) {
    return `${bytes} B`;
  }

  const prefix = binary ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G'];
  let unit = -1;

  while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
    bytes /= base;
    ++unit;
  }

  return `${bytes.toFixed(1)} ${prefix[unit]}B`;
}
//# sourceMappingURL=helpers.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/lang/index.js
// Extensions
 // Language

 // Utilities



const LANG_PREFIX = '$vuetify.';
const fallback = Symbol('Lang fallback');

function getTranslation(locale, key, usingFallback = false) {
  const shortKey = key.replace(LANG_PREFIX, '');
  let translation = getObjectValueByPath(locale, shortKey, fallback);

  if (translation === fallback) {
    if (usingFallback) {
      consoleError(`Translation key "${shortKey}" not found in fallback`);
      translation = key;
    } else {
      consoleWarn(`Translation key "${shortKey}" not found, falling back to default`);
      translation = getTranslation(en, key, true);
    }
  }

  return translation;
}

class lang_Lang extends Service {
  constructor(options = {}) {
    super();
    this.current = options.current || 'en';
    this.locales = Object.assign({
      en: en
    }, options.locales);
    this.translator = options.t;
  }

  t(key, ...params) {
    if (!key.startsWith(LANG_PREFIX)) return key;
    if (this.translator) return this.translator(key, ...params);
    const translation = getTranslation(this.locales[this.current], key);
    return translation.replace(/\{(\d+)\}/g, (match, index) => {
      /* istanbul ignore next */
      return String(params[+index]);
    });
  }

}
lang_Lang.property = 'lang';
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/util/color/transformSRGB.js
 // For converting XYZ to sRGB

const srgbForwardMatrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]]; // Forward gamma adjust

const srgbForwardTransform = C => C <= 0.0031308 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - 0.055; // For converting sRGB to XYZ


const srgbReverseMatrix = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]]; // Reverse gamma adjust

const srgbReverseTransform = C => C <= 0.04045 ? C / 12.92 : ((C + 0.055) / 1.055) ** 2.4;

function fromXYZ(xyz) {
  const rgb = Array(3);
  const transform = srgbForwardTransform;
  const matrix = srgbForwardMatrix; // Matrix transform, then gamma adjustment

  for (let i = 0; i < 3; ++i) {
    rgb[i] = Math.round(clamp(transform(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
  } // Rescale back to [0, 255]


  return (rgb[0] << 16) + (rgb[1] << 8) + (rgb[2] << 0);
}
function toXYZ(rgb) {
  const xyz = [0, 0, 0];
  const transform = srgbReverseTransform;
  const matrix = srgbReverseMatrix; // Rescale from [0, 255] to [0, 1] then adjust sRGB gamma to linear RGB

  const r = transform((rgb >> 16 & 0xff) / 255);
  const g = transform((rgb >> 8 & 0xff) / 255);
  const b = transform((rgb >> 0 & 0xff) / 255); // Matrix color space transform

  for (let i = 0; i < 3; ++i) {
    xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
  }

  return xyz;
}
//# sourceMappingURL=transformSRGB.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/util/colorUtils.js



function colorToInt(color) {
  let rgb;

  if (typeof color === 'number') {
    rgb = color;
  } else if (typeof color === 'string') {
    let c = color[0] === '#' ? color.substring(1) : color;

    if (c.length === 3) {
      c = c.split('').map(char => char + char).join('');
    }

    if (c.length !== 6) {
      consoleWarn(`'${color}' is not a valid rgb color`);
    }

    rgb = parseInt(c, 16);
  } else {
    throw new TypeError(`Colors can only be numbers or strings, recieved ${color == null ? color : color.constructor.name} instead`);
  }

  if (rgb < 0) {
    consoleWarn(`Colors cannot be negative: '${color}'`);
    rgb = 0;
  } else if (rgb > 0xffffff || isNaN(rgb)) {
    consoleWarn(`'${color}' is not a valid rgb color`);
    rgb = 0xffffff;
  }

  return rgb;
}
function intToHex(color) {
  let hexColor = color.toString(16);
  if (hexColor.length < 6) hexColor = '0'.repeat(6 - hexColor.length) + hexColor;
  return '#' + hexColor;
}
function colorToHex(color) {
  return intToHex(colorToInt(color));
}
/**
 * Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV
 *
 * @param color HSVA color as an array [0-360, 0-1, 0-1, 0-1]
 */

function HSVAtoRGBA(hsva) {
  const {
    h,
    s,
    v,
    a
  } = hsva;

  const f = n => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  };

  const rgb = [f(5), f(3), f(1)].map(v => Math.round(v * 255));
  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
    a
  };
}
/**
 * Converts RGBA to HSVA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV
 *
 * @param color RGBA color as an array [0-255, 0-255, 0-255, 0-1]
 */

function RGBAtoHSVA(rgba) {
  if (!rgba) return {
    h: 0,
    s: 1,
    v: 1,
    a: 1
  };
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;

  if (max !== min) {
    if (max === r) {
      h = 60 * (0 + (g - b) / (max - min));
    } else if (max === g) {
      h = 60 * (2 + (b - r) / (max - min));
    } else if (max === b) {
      h = 60 * (4 + (r - g) / (max - min));
    }
  }

  if (h < 0) h = h + 360;
  const s = max === 0 ? 0 : (max - min) / max;
  const hsv = [h, s, max];
  return {
    h: hsv[0],
    s: hsv[1],
    v: hsv[2],
    a: rgba.a
  };
}
function HSVAtoHSLA(hsva) {
  const {
    h,
    s,
    v,
    a
  } = hsva;
  const l = v - v * s / 2;
  const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l);
  return {
    h,
    s: sprime,
    l,
    a
  };
}
function HSLAtoHSVA(hsl) {
  const {
    h,
    s,
    l,
    a
  } = hsl;
  const v = l + s * Math.min(l, 1 - l);
  const sprime = v === 0 ? 0 : 2 - 2 * l / v;
  return {
    h,
    s: sprime,
    v,
    a
  };
}
function RGBAtoCSS(rgba) {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}
function RGBtoCSS(rgba) {
  return RGBAtoCSS({ ...rgba,
    a: 1
  });
}
function RGBAtoHex(rgba) {
  const toHex = v => {
    const h = Math.round(v).toString(16);
    return ('00'.substr(0, 2 - h.length) + h).toUpperCase();
  };

  return `#${[toHex(rgba.r), toHex(rgba.g), toHex(rgba.b), toHex(Math.round(rgba.a * 255))].join('')}`;
}
function HexToRGBA(hex) {
  const rgba = chunk(hex.slice(1), 2).map(c => parseInt(c, 16));
  return {
    r: rgba[0],
    g: rgba[1],
    b: rgba[2],
    a: Math.round(rgba[3] / 255 * 100) / 100
  };
}
function HexToHSVA(hex) {
  const rgb = HexToRGBA(hex);
  return RGBAtoHSVA(rgb);
}
function HSVAtoHex(hsva) {
  return RGBAtoHex(HSVAtoRGBA(hsva));
}
function parseHex(hex) {
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }

  hex = hex.replace(/([^0-9a-f])/gi, 'F');

  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('');
  }

  if (hex.length === 6) {
    hex = padEnd(hex, 8, 'F');
  } else {
    hex = padEnd(padEnd(hex, 6), 8, 'F');
  }

  return `#${hex}`.toUpperCase().substr(0, 9);
}
function RGBtoInt(rgba) {
  return (rgba.r << 16) + (rgba.g << 8) + rgba.b;
}
/**
 * Returns the contrast ratio (1-21) between two colors.
 *
 * @param c1 First color
 * @param c2 Second color
 */

function contrastRatio(c1, c2) {
  const [, y1] = toXYZ(RGBtoInt(c1));
  const [, y2] = toXYZ(RGBtoInt(c2));
  return (Math.max(y1, y2) + 0.05) / (Math.min(y1, y2) + 0.05);
}
//# sourceMappingURL=colorUtils.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/util/color/transformCIELAB.js
const delta = 0.20689655172413793; // 6÷29

const cielabForwardTransform = t => t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;

const cielabReverseTransform = t => t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29);

function transformCIELAB_fromXYZ(xyz) {
  const transform = cielabForwardTransform;
  const transformedY = transform(xyz[1]);
  return [116 * transformedY - 16, 500 * (transform(xyz[0] / 0.95047) - transformedY), 200 * (transformedY - transform(xyz[2] / 1.08883))];
}
function transformCIELAB_toXYZ(lab) {
  const transform = cielabReverseTransform;
  const Ln = (lab[0] + 16) / 116;
  return [transform(Ln + lab[1] / 500) * 0.95047, transform(Ln), transform(Ln - lab[2] / 200) * 1.08883];
}
//# sourceMappingURL=transformCIELAB.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/theme/utils.js



function parse(theme, isItem = false) {
  const {
    anchor,
    ...variant
  } = theme;
  const colors = Object.keys(variant);
  const parsedTheme = {};

  for (let i = 0; i < colors.length; ++i) {
    const name = colors[i];
    const value = theme[name];
    if (value == null) continue;

    if (isItem) {
      /* istanbul ignore else */
      if (name === 'base' || name.startsWith('lighten') || name.startsWith('darken')) {
        parsedTheme[name] = colorToHex(value);
      }
    } else if (typeof value === 'object') {
      parsedTheme[name] = parse(value, true);
    } else {
      parsedTheme[name] = genVariations(name, colorToInt(value));
    }
  }

  if (!isItem) {
    parsedTheme.anchor = anchor || parsedTheme.base || parsedTheme.primary.base;
  }

  return parsedTheme;
}
/**
 * Generate the CSS for a base color (.primary)
 */

const genBaseColor = (name, value) => {
  return `
.v-application .${name} {
  background-color: ${value} !important;
  border-color: ${value} !important;
}
.v-application .${name}--text {
  color: ${value} !important;
  caret-color: ${value} !important;
}`;
};
/**
 * Generate the CSS for a variant color (.primary.darken-2)
 */


const genVariantColor = (name, variant, value) => {
  const [type, n] = variant.split(/(\d)/, 2);
  return `
.v-application .${name}.${type}-${n} {
  background-color: ${value} !important;
  border-color: ${value} !important;
}
.v-application .${name}--text.text--${type}-${n} {
  color: ${value} !important;
  caret-color: ${value} !important;
}`;
};

const genColorVariableName = (name, variant = 'base') => `--v-${name}-${variant}`;

const genColorVariable = (name, variant = 'base') => `var(${genColorVariableName(name, variant)})`;

function genStyles(theme, cssVar = false) {
  const {
    anchor,
    ...variant
  } = theme;
  const colors = Object.keys(variant);
  if (!colors.length) return '';
  let variablesCss = '';
  let css = '';
  const aColor = cssVar ? genColorVariable('anchor') : anchor;
  css += `.v-application a { color: ${aColor}; }`;
  cssVar && (variablesCss += `  ${genColorVariableName('anchor')}: ${anchor};\n`);

  for (let i = 0; i < colors.length; ++i) {
    const name = colors[i];
    const value = theme[name];
    css += genBaseColor(name, cssVar ? genColorVariable(name) : value.base);
    cssVar && (variablesCss += `  ${genColorVariableName(name)}: ${value.base};\n`);
    const variants = Object.keys(value);

    for (let i = 0; i < variants.length; ++i) {
      const variant = variants[i];
      const variantValue = value[variant];
      if (variant === 'base') continue;
      css += genVariantColor(name, variant, cssVar ? genColorVariable(name, variant) : variantValue);
      cssVar && (variablesCss += `  ${genColorVariableName(name, variant)}: ${variantValue};\n`);
    }
  }

  if (cssVar) {
    variablesCss = `:root {\n${variablesCss}}\n\n`;
  }

  return variablesCss + css;
}
function genVariations(name, value) {
  const values = {
    base: intToHex(value)
  };

  for (let i = 5; i > 0; --i) {
    values[`lighten${i}`] = intToHex(lighten(value, i));
  }

  for (let i = 1; i <= 4; ++i) {
    values[`darken${i}`] = intToHex(darken(value, i));
  }

  return values;
}

function lighten(value, amount) {
  const lab = transformCIELAB_fromXYZ(toXYZ(value));
  lab[0] = lab[0] + amount * 10;
  return fromXYZ(transformCIELAB_toXYZ(lab));
}

function darken(value, amount) {
  const lab = transformCIELAB_fromXYZ(toXYZ(value));
  lab[0] = lab[0] - amount * 10;
  return fromXYZ(transformCIELAB_toXYZ(lab));
}
//# sourceMappingURL=utils.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/services/theme/index.js
/* eslint-disable no-multi-spaces */
// Extensions
 // Utilities

 // Types


class theme_Theme extends Service {
  constructor(options = {}) {
    super();
    this.disabled = false;
    this.themes = {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00'
      },
      dark: {
        primary: '#2196F3',
        secondary: '#424242',
        accent: '#FF4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00'
      }
    };
    this.defaults = this.themes;
    this.isDark = null;
    this.vueInstance = null;

    if (options.disable) {
      this.disabled = true;
      return;
    }

    this.options = { ...this.options,
      ...options.options
    };
    this.dark = Boolean(options.dark);
    const themes = options.themes || {};
    this.themes = {
      dark: this.fillVariant(themes.dark, true),
      light: this.fillVariant(themes.light, false)
    };
  } // When setting css, check for element
  // and apply new values


  set css(val) {
    this.checkOrCreateStyleElement() && (this.styleEl.innerHTML = val);
  }

  set dark(val) {
    const oldDark = this.isDark;
    this.isDark = val; // Only apply theme after dark
    // has already been set before

    oldDark != null && this.applyTheme();
  }

  get dark() {
    return Boolean(this.isDark);
  } // Apply current theme default
  // only called on client side


  applyTheme() {
    if (this.disabled) return this.clearCss();
    this.css = this.generatedStyles;
  }

  clearCss() {
    this.css = '';
  } // Initialize theme for SSR and SPA
  // Attach to ssrContext head or
  // apply new theme to document


  init(root, ssrContext) {
    if (this.disabled) return;
    /* istanbul ignore else */

    if (root.$meta) {
      this.initVueMeta(root);
    } else if (ssrContext) {
      this.initSSR(ssrContext);
    }

    this.initTheme();
  } // Allows for you to set target theme


  setTheme(theme, value) {
    this.themes[theme] = Object.assign(this.themes[theme], value);
    this.applyTheme();
  } // Reset theme defaults


  resetThemes() {
    this.themes.light = Object.assign({}, this.defaults.light);
    this.themes.dark = Object.assign({}, this.defaults.dark);
    this.applyTheme();
  } // Check for existence of style element


  checkOrCreateStyleElement() {
    this.styleEl = document.getElementById('vuetify-theme-stylesheet');
    /* istanbul ignore next */

    if (this.styleEl) return true;
    this.genStyleElement(); // If doesn't have it, create it

    return Boolean(this.styleEl);
  }

  fillVariant(theme = {}, dark) {
    const defaultTheme = this.themes[dark ? 'dark' : 'light'];
    return Object.assign({}, defaultTheme, theme);
  } // Generate the style element
  // if applicable


  genStyleElement() {
    if (typeof document === 'undefined') return;
    /* istanbul ignore next */

    const options = this.options || {};
    this.styleEl = document.createElement('style');
    this.styleEl.type = 'text/css';
    this.styleEl.id = 'vuetify-theme-stylesheet';

    if (options.cspNonce) {
      this.styleEl.setAttribute('nonce', options.cspNonce);
    }

    document.head.appendChild(this.styleEl);
  }

  initVueMeta(root) {
    const options = this.options || {};
    root.$children.push(new external_commonjs_vue_commonjs2_vue_root_Vue_default.a({
      head: () => {
        return {
          style: [{
            cssText: this.generatedStyles,
            type: 'text/css',
            id: 'vuetify-theme-stylesheet',
            nonce: options.cspNonce
          }]
        };
      }
    }));
  }

  initSSR(ssrContext) {
    const options = this.options || {}; // SSR

    const nonce = options.cspNonce ? ` nonce="${options.cspNonce}"` : '';
    ssrContext.head = ssrContext.head || '';
    ssrContext.head += `<style type="text/css" id="vuetify-theme-stylesheet"${nonce}>${this.generatedStyles}</style>`;
  }

  initTheme() {
    // Only watch for reactivity on client side
    if (typeof document === 'undefined') return; // If we get here somehow, ensure
    // existing instance is removed

    if (this.vueInstance) this.vueInstance.$destroy(); // Use Vue instance to track reactivity
    // TODO: Update to use RFC if merged
    // https://github.com/vuejs/rfcs/blob/advanced-reactivity-api/active-rfcs/0000-advanced-reactivity-api.md

    this.vueInstance = new external_commonjs_vue_commonjs2_vue_root_Vue_default.a({
      data: {
        themes: this.themes
      },
      watch: {
        themes: {
          immediate: true,
          deep: true,
          handler: () => this.applyTheme()
        }
      }
    });
  }

  get currentTheme() {
    const target = this.dark ? 'dark' : 'light';
    return this.themes[target];
  }

  get generatedStyles() {
    const theme = this.parsedTheme;
    /* istanbul ignore next */

    const options = this.options || {};
    let css;

    if (options.themeCache != null) {
      css = options.themeCache.get(theme);
      /* istanbul ignore if */

      if (css != null) return css;
    }

    css = genStyles(theme, options.customProperties);

    if (options.minifyTheme != null) {
      css = options.minifyTheme(css);
    }

    if (options.themeCache != null) {
      options.themeCache.set(theme, css);
    }

    return css;
  }

  get parsedTheme() {
    /* istanbul ignore next */
    const theme = this.currentTheme || {};
    return parse(theme);
  }

}
theme_Theme.property = 'theme';
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/vuetify/src/styles/main.sass
var main = __webpack_require__("95ed");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/framework.js
 // Services

 // Styles


class framework_Vuetify {
  constructor(preset = {}) {
    this.framework = {};
    this.installed = [];
    this.preset = {};
    this.preset = preset;
    this.use(application_Application);
    this.use(breakpoint_Breakpoint);
    this.use(goto_Goto);
    this.use(icons_Icons);
    this.use(lang_Lang);
    this.use(theme_Theme);
  } // Called on the new vuetify instance
  // bootstrap in install beforeCreate
  // Exposes ssrContext if available


  init(root, ssrContext) {
    this.installed.forEach(property => {
      const service = this.framework[property];
      service.framework = this.framework;
      service.init(root, ssrContext);
    }); // rtl is not installed and
    // will never be called by
    // the init process

    this.framework.rtl = Boolean(this.preset.rtl);
  } // Instantiate a VuetifyService


  use(Service) {
    const property = Service.property;
    if (this.installed.includes(property)) return;
    this.framework[property] = new Service(this.preset[property]);
    this.installed.push(property);
  }

}
framework_Vuetify.install = install;
framework_Vuetify.installed = false;
framework_Vuetify.version = "2.0.5";
//# sourceMappingURL=framework.js.map
// EXTERNAL MODULE: ./src/assets/style.css
var assets_style = __webpack_require__("7d05");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/AppCard.vue?vue&type=template&id=b08c5624&
var AppCardvue_type_template_id_b08c5624_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('BaseCard',{ref:"card",attrs:{"external":_vm.app.external}},[_c('v-img',{staticClass:"hidden-sm-and-down",attrs:{"src":_vm.app.image,"aspect-ratio":"2"},scopedSlots:_vm._u([{key:"placeholder",fn:function(){return [_c('v-row',{staticClass:"fill-height",attrs:{"align":"center","justify":"center"}},[_c('v-progress-circular',{attrs:{"indeterminate":""}})],1)]},proxy:true}])}),_c('div',{staticClass:"px-6",class:_vm.app.external ? 'pt-0' : 'pt-6'},[(_vm.app.external)?_c('ExternalContribution'):_vm._e(),_c('v-row',{staticClass:"py-0 mx-0"},[_c('BaseTitleDisplay',{attrs:{"to":_vm.preview ? '' : ("/apps/" + (_vm.app.slug))}},[[_vm._v(_vm._s(_vm.app.title))]],2),(_vm.app.tags)?_c('div',_vm._l((_vm.app.tags),function(tag){return _c('BasePropChip',{key:tag,on:{"chip-click":function($event){return _vm.$emit('tag-click', $event)}}},[[_vm._v(_vm._s(tag))]],2)}),1):_vm._e()],1)],1),_c('div',{staticClass:"pt-4 px-6"},[_c('BasePropDisplay',{attrs:{"name":"Contributors"}},[(_vm.app.contributors)?_vm._l((_vm.app.contributors),function(contributor,i){return _c('span',{key:i},[(i > 1)?[_vm._v(_vm._s(_vm.app.contributors.length > i + 1 ? ', ' : ' and '))]:_vm._e(),(contributor.url)?_c('a',{attrs:{"href":contributor.url,"target":"_blank","rel":"noreferrer"}},[[_vm._v(_vm._s(contributor.title))]],2):[_vm._v(_vm._s(contributor.title))]],2)}):[_vm._v(_vm._s('ICJIA R&A staff'))]],2),(_vm.app.categories)?_c('BasePropDisplay',{attrs:{"name":"Categories"}},_vm._l((_vm.app.categories),function(category,i){return _c('span',{key:i},[(i > 0)?[_vm._v(_vm._s(', '))]:_vm._e(),[_vm._v(_vm._s(_vm._f("capitalize")(category)))]],2)}),0):_vm._e()],1),_c('v-row',{staticClass:"ma-0 px-2 pb-2",attrs:{"justify":"end"}},[_c('BaseButton',{attrs:{"label":"More","to":_vm.preview ? null : ("/apps/" + (_vm.app.slug)),"icon":"mdi-dots-horizontal"}},[[_vm._v(_vm._s('more'))]],2)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/AppCard.vue?vue&type=template&id=b08c5624&

// CONCATENATED MODULE: ./src/mixins/contentMixin.js
const baseFilters = {
  filters: {
    capitalize(str) {
      return `${str[0].toUpperCase()}${str.slice(1)}`
    },
    formatDate(date) {
      return date ? date.slice(0, 10) : ''
    },
    path(slug, type) {
      return `/${type}/${slug}`
    }
  }
}

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BaseButton.vue?vue&type=template&id=e89e2056&
var BaseButtonvue_type_template_id_e89e2056_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-btn',{attrs:{"text":"","exact":"","aria-label":_vm.label,"to":_vm.to,"href":_vm.href,"target":_vm.href ? '_blank' : ''}},[_vm._t("default"),(_vm.icon)?_c('v-icon',[_vm._v(_vm._s(_vm.icon))]):_vm._e()],2)}
var BaseButtonvue_type_template_id_e89e2056_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/BaseButton.vue?vue&type=template&id=e89e2056&

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BaseButton.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('BaseButton', component.exports)
}
/* harmony default export */ var BaseButtonvue_type_script_lang_js_ = ({
  props: {
    label: String,
    href: String,
    icon: String,
    to: String
  }
});

// CONCATENATED MODULE: ./src/components/BaseButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_BaseButtonvue_type_script_lang_js_ = (BaseButtonvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__("6544");
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VBtn/VBtn.sass
var VBtn = __webpack_require__("86cc");

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VSheet/VSheet.sass
var VSheet = __webpack_require__("25a8");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/colorable/index.js



function isCssColor(color) {
  return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/);
}

/* harmony default export */ var colorable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
  name: 'colorable',
  props: {
    color: String
  },
  methods: {
    setBackgroundColor(color, data = {}) {
      if (typeof data.style === 'string') {
        // istanbul ignore next
        consoleError('style must be an object', this); // istanbul ignore next

        return data;
      }

      if (typeof data.class === 'string') {
        // istanbul ignore next
        consoleError('class must be an object', this); // istanbul ignore next

        return data;
      }

      if (isCssColor(color)) {
        data.style = { ...data.style,
          'background-color': `${color}`,
          'border-color': `${color}`
        };
      } else if (color) {
        data.class = { ...data.class,
          [color]: true
        };
      }

      return data;
    },

    setTextColor(color, data = {}) {
      if (typeof data.style === 'string') {
        // istanbul ignore next
        consoleError('style must be an object', this); // istanbul ignore next

        return data;
      }

      if (typeof data.class === 'string') {
        // istanbul ignore next
        consoleError('class must be an object', this); // istanbul ignore next

        return data;
      }

      if (isCssColor(color)) {
        data.style = { ...data.style,
          color: `${color}`,
          'caret-color': `${color}`
        };
      } else if (color) {
        const [colorName, colorModifier] = color.toString().trim().split(' ', 2);
        data.class = { ...data.class,
          [colorName + '--text']: true
        };

        if (colorModifier) {
          data.class['text--' + colorModifier] = true;
        }
      }

      return data;
    }

  }
}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/elevatable/index.js

/* harmony default export */ var elevatable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
  name: 'elevatable',
  props: {
    elevation: [Number, String]
  },
  computed: {
    computedElevation() {
      return this.elevation;
    },

    elevationClasses() {
      const elevation = this.computedElevation;
      if (elevation == null) return {};
      if (isNaN(parseInt(elevation))) return {};
      return {
        [`elevation-${this.elevation}`]: true
      };
    }

  }
}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/measurable/index.js
// Helpers
 // Types


/* harmony default export */ var measurable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
  name: 'measurable',
  props: {
    height: [Number, String],
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    minHeight: [Number, String],
    minWidth: [Number, String],
    width: [Number, String]
  },
  computed: {
    measurableStyles() {
      const styles = {};
      const height = convertToUnit(this.height);
      const minHeight = convertToUnit(this.minHeight);
      const minWidth = convertToUnit(this.minWidth);
      const maxHeight = convertToUnit(this.maxHeight);
      const maxWidth = convertToUnit(this.maxWidth);
      const width = convertToUnit(this.width);
      if (height) styles.height = height;
      if (minHeight) styles.minHeight = minHeight;
      if (minWidth) styles.minWidth = minWidth;
      if (maxHeight) styles.maxHeight = maxHeight;
      if (maxWidth) styles.maxWidth = maxWidth;
      if (width) styles.width = width;
      return styles;
    }

  }
}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/themeable/index.js

function functionalThemeClasses(context) {
  const vm = { ...context.props,
    ...context.injections
  };
  const isDark = Themeable.options.computed.isDark.call(vm);
  return Themeable.options.computed.themeClasses.call({
    isDark
  });
}
/* @vue/component */

const Themeable = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend().extend({
  name: 'themeable',

  provide() {
    return {
      theme: this.themeableProvide
    };
  },

  inject: {
    theme: {
      default: {
        isDark: false
      }
    }
  },
  props: {
    dark: {
      type: Boolean,
      default: null
    },
    light: {
      type: Boolean,
      default: null
    }
  },

  data() {
    return {
      themeableProvide: {
        isDark: false
      }
    };
  },

  computed: {
    appIsDark() {
      return this.$vuetify.theme.dark || false;
    },

    isDark() {
      if (this.dark === true) {
        // explicitly dark
        return true;
      } else if (this.light === true) {
        // explicitly light
        return false;
      } else {
        // inherit from parent, or default false if there is none
        return this.theme.isDark;
      }
    },

    themeClasses() {
      return {
        'theme--dark': this.isDark,
        'theme--light': !this.isDark
      };
    },

    /** Used by menus and dialogs, inherits from v-app instead of the parent */
    rootIsDark() {
      if (this.dark === true) {
        // explicitly dark
        return true;
      } else if (this.light === true) {
        // explicitly light
        return false;
      } else {
        // inherit from v-app
        return this.appIsDark;
      }
    },

    rootThemeClasses() {
      return {
        'theme--dark': this.rootIsDark,
        'theme--light': !this.rootIsDark
      };
    }

  },
  watch: {
    isDark: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.themeableProvide.isDark = this.isDark;
        }
      },

      immediate: true
    }
  }
});
/* harmony default export */ var themeable = (Themeable);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/util/mixins.js
/* eslint-disable max-len, import/export, no-use-before-define */

function mixins(...args) {
  return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    mixins: args
  });
}
//# sourceMappingURL=mixins.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VSheet/VSheet.js
// Styles
 // Mixins




 // Helpers


/* @vue/component */

/* harmony default export */ var VSheet_VSheet = (mixins(colorable, elevatable, measurable, themeable).extend({
  name: 'v-sheet',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    tile: Boolean
  },
  computed: {
    classes() {
      return {
        'v-sheet': true,
        'v-sheet--tile': this.tile,
        ...this.themeClasses,
        ...this.elevationClasses
      };
    },

    styles() {
      return this.measurableStyles;
    }

  },

  render(h) {
    const data = {
      class: this.classes,
      style: this.styles,
      on: this.$listeners
    };
    return h(this.tag, this.setBackgroundColor(this.color, data), this.$slots.default);
  }

}));
//# sourceMappingURL=VSheet.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VSheet/index.js


/* harmony default export */ var components_VSheet = (VSheet_VSheet);
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VProgressCircular/VProgressCircular.sass
var VProgressCircular = __webpack_require__("8d4f");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VProgressCircular/VProgressCircular.js
// Styles
 // Mixins

 // Utils


/* @vue/component */

/* harmony default export */ var VProgressCircular_VProgressCircular = (colorable.extend({
  name: 'v-progress-circular',
  props: {
    button: Boolean,
    indeterminate: Boolean,
    rotate: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: [Number, String],
      default: 32
    },
    width: {
      type: [Number, String],
      default: 4
    },
    value: {
      type: [Number, String],
      default: 0
    }
  },
  data: () => ({
    radius: 20
  }),
  computed: {
    calculatedSize() {
      return Number(this.size) + (this.button ? 8 : 0);
    },

    circumference() {
      return 2 * Math.PI * this.radius;
    },

    classes() {
      return {
        'v-progress-circular--indeterminate': this.indeterminate,
        'v-progress-circular--button': this.button
      };
    },

    normalizedValue() {
      if (this.value < 0) {
        return 0;
      }

      if (this.value > 100) {
        return 100;
      }

      return parseFloat(this.value);
    },

    strokeDashArray() {
      return Math.round(this.circumference * 1000) / 1000;
    },

    strokeDashOffset() {
      return (100 - this.normalizedValue) / 100 * this.circumference + 'px';
    },

    strokeWidth() {
      return Number(this.width) / +this.size * this.viewBoxSize * 2;
    },

    styles() {
      return {
        height: convertToUnit(this.calculatedSize),
        width: convertToUnit(this.calculatedSize)
      };
    },

    svgStyles() {
      return {
        transform: `rotate(${Number(this.rotate)}deg)`
      };
    },

    viewBoxSize() {
      return this.radius / (1 - Number(this.width) / +this.size);
    }

  },
  methods: {
    genCircle(name, offset) {
      return this.$createElement('circle', {
        class: `v-progress-circular__${name}`,
        attrs: {
          fill: 'transparent',
          cx: 2 * this.viewBoxSize,
          cy: 2 * this.viewBoxSize,
          r: this.radius,
          'stroke-width': this.strokeWidth,
          'stroke-dasharray': this.strokeDashArray,
          'stroke-dashoffset': offset
        }
      });
    },

    genSvg() {
      const children = [this.indeterminate || this.genCircle('underlay', 0), this.genCircle('overlay', this.strokeDashOffset)];
      return this.$createElement('svg', {
        style: this.svgStyles,
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: `${this.viewBoxSize} ${this.viewBoxSize} ${2 * this.viewBoxSize} ${2 * this.viewBoxSize}`
        }
      }, children);
    },

    genInfo() {
      return this.$createElement('div', {
        staticClass: 'v-progress-circular__info'
      }, this.$slots.default);
    }

  },

  render(h) {
    return h('div', this.setTextColor(this.color, {
      staticClass: 'v-progress-circular',
      attrs: {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': this.indeterminate ? undefined : this.normalizedValue
      },
      class: this.classes,
      style: this.styles,
      on: this.$listeners
    }), [this.genSvg(), this.genInfo()]);
  }

}));
//# sourceMappingURL=VProgressCircular.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VProgressCircular/index.js


/* harmony default export */ var components_VProgressCircular = (VProgressCircular_VProgressCircular);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/registrable/index.js



function generateWarning(child, parent) {
  return () => consoleWarn(`The ${child} component must be used inside a ${parent}`);
}

function inject(namespace, child, parent) {
  const defaultImpl = child && parent ? {
    register: generateWarning(child, parent),
    unregister: generateWarning(child, parent)
  } : null;
  return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'registrable-inject',
    inject: {
      [namespace]: {
        default: defaultImpl
      }
    }
  });
}
function provide(namespace, self = false) {
  return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'registrable-provide',
    methods: self ? {} : {
      register: null,
      unregister: null
    },

    provide() {
      return {
        [namespace]: self ? this : {
          register: this.register,
          unregister: this.unregister
        }
      };
    }

  });
}
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/groupable/index.js
// Mixins

function factory(namespace, child, parent) {
  // TODO: ts 3.4 broke directly returning this
  const R = inject(namespace, child, parent).extend({
    name: 'groupable',
    props: {
      activeClass: {
        type: String,

        default() {
          if (!this[namespace]) return undefined;
          return this[namespace].activeClass;
        }

      },
      disabled: Boolean
    },

    data() {
      return {
        isActive: false
      };
    },

    computed: {
      groupClasses() {
        if (!this.activeClass) return {};
        return {
          [this.activeClass]: this.isActive
        };
      }

    },

    created() {
      this[namespace] && this[namespace].register(this);
    },

    beforeDestroy() {
      this[namespace] && this[namespace].unregister(this);
    },

    methods: {
      toggle() {
        this.$emit('change');
      }

    }
  });
  return R;
}
/* eslint-disable-next-line no-redeclare */

const Groupable = factory('itemGroup');
/* harmony default export */ var groupable = (Groupable);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/toggleable/index.js

function toggleable_factory(prop = 'value', event = 'input') {
  return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'toggleable',
    model: {
      prop,
      event
    },
    props: {
      [prop]: {
        required: false
      }
    },

    data() {
      return {
        isActive: !!this[prop]
      };
    },

    watch: {
      [prop](val) {
        this.isActive = !!val;
      },

      isActive(val) {
        !!val !== this[prop] && this.$emit(event, val);
      }

    }
  });
}
/* eslint-disable-next-line no-redeclare */

const Toggleable = toggleable_factory();
/* harmony default export */ var toggleable = (Toggleable);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/positionable/index.js


const availableProps = {
  absolute: Boolean,
  bottom: Boolean,
  fixed: Boolean,
  left: Boolean,
  right: Boolean,
  top: Boolean
};
function positionable_factory(selected = []) {
  return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'positionable',
    props: selected.length ? filterObjectOnKeys(availableProps, selected) : availableProps
  });
}
/* harmony default export */ var positionable = (positionable_factory()); // Add a `*` before the second `/`

/* Tests /
let single = factory(['top']).extend({
  created () {
    this.top
    this.bottom
    this.absolute
  }
})

let some = factory(['top', 'bottom']).extend({
  created () {
    this.top
    this.bottom
    this.absolute
  }
})

let all = factory().extend({
  created () {
    this.top
    this.bottom
    this.absolute
    this.foobar
  }
})
/**/
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/vuetify/src/directives/ripple/VRipple.sass
var VRipple = __webpack_require__("7435");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/directives/ripple/index.js
// Styles



function ripple_transform(el, value) {
  el.style['transform'] = value;
  el.style['webkitTransform'] = value;
}

function opacity(el, value) {
  el.style['opacity'] = value.toString();
}

function isTouchEvent(e) {
  return e.constructor.name === 'TouchEvent';
}

const calculate = (e, el, value = {}) => {
  const offset = el.getBoundingClientRect();
  const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
  const localX = target.clientX - offset.left;
  const localY = target.clientY - offset.top;
  let radius = 0;
  let scale = 0.3;

  if (el._ripple && el._ripple.circle) {
    scale = 0.15;
    radius = el.clientWidth / 2;
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
  }

  const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
  const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
  const x = value.center ? centerX : `${localX - radius}px`;
  const y = value.center ? centerY : `${localY - radius}px`;
  return {
    radius,
    scale,
    x,
    y,
    centerX,
    centerY
  };
};

const ripples = {
  /* eslint-disable max-statements */
  show(e, el, value = {}) {
    if (!el._ripple || !el._ripple.enabled) {
      return;
    }

    const container = document.createElement('span');
    const animation = document.createElement('span');
    container.appendChild(animation);
    container.className = 'v-ripple__container';

    if (value.class) {
      container.className += ` ${value.class}`;
    }

    const {
      radius,
      scale,
      x,
      y,
      centerX,
      centerY
    } = calculate(e, el, value);
    const size = `${radius * 2}px`;
    animation.className = 'v-ripple__animation';
    animation.style.width = size;
    animation.style.height = size;
    el.appendChild(container);
    const computed = window.getComputedStyle(el);

    if (computed && computed.position === 'static') {
      el.style.position = 'relative';
      el.dataset.previousPosition = 'static';
    }

    animation.classList.add('v-ripple__animation--enter');
    animation.classList.add('v-ripple__animation--visible');
    ripple_transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
    opacity(animation, 0);
    animation.dataset.activated = String(performance.now());
    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--enter');
      animation.classList.add('v-ripple__animation--in');
      ripple_transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
      opacity(animation, 0.25);
    }, 0);
  },

  hide(el) {
    if (!el || !el._ripple || !el._ripple.enabled) return;
    const ripples = el.getElementsByClassName('v-ripple__animation');
    if (ripples.length === 0) return;
    const animation = ripples[ripples.length - 1];
    if (animation.dataset.isHiding) return;else animation.dataset.isHiding = 'true';
    const diff = performance.now() - Number(animation.dataset.activated);
    const delay = Math.max(250 - diff, 0);
    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--in');
      animation.classList.add('v-ripple__animation--out');
      opacity(animation, 0);
      setTimeout(() => {
        const ripples = el.getElementsByClassName('v-ripple__animation');

        if (ripples.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition;
          delete el.dataset.previousPosition;
        }

        animation.parentNode && el.removeChild(animation.parentNode);
      }, 300);
    }, delay);
  }

};

function isRippleEnabled(value) {
  return typeof value === 'undefined' || !!value;
}

function rippleShow(e) {
  const value = {};
  const element = e.currentTarget;
  if (!element || !element._ripple || element._ripple.touched) return;

  if (isTouchEvent(e)) {
    element._ripple.touched = true;
    element._ripple.isTouch = true;
  } else {
    // It's possible for touch events to fire
    // as mouse events on Android/iOS, this
    // will skip the event call if it has
    // already been registered as touch
    if (element._ripple.isTouch) return;
  }

  value.center = element._ripple.centered;

  if (element._ripple.class) {
    value.class = element._ripple.class;
  }

  ripples.show(e, element, value);
}

function rippleHide(e) {
  const element = e.currentTarget;
  if (!element) return;
  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false;
    }
  });
  ripples.hide(element);
}

function updateRipple(el, binding, wasEnabled) {
  const enabled = isRippleEnabled(binding.value);

  if (!enabled) {
    ripples.hide(el);
  }

  el._ripple = el._ripple || {};
  el._ripple.enabled = enabled;
  const value = binding.value || {};

  if (value.center) {
    el._ripple.centered = true;
  }

  if (value.class) {
    el._ripple.class = binding.value.class;
  }

  if (value.circle) {
    el._ripple.circle = value.circle;
  }

  if (enabled && !wasEnabled) {
    el.addEventListener('touchstart', rippleShow, {
      passive: true
    });
    el.addEventListener('touchend', rippleHide, {
      passive: true
    });
    el.addEventListener('touchcancel', rippleHide);
    el.addEventListener('mousedown', rippleShow);
    el.addEventListener('mouseup', rippleHide);
    el.addEventListener('mouseleave', rippleHide); // Anchor tags can be dragged, causes other hides to fail - #1537

    el.addEventListener('dragstart', rippleHide, {
      passive: true
    });
  } else if (!enabled && wasEnabled) {
    removeListeners(el);
  }
}

function removeListeners(el) {
  el.removeEventListener('mousedown', rippleShow);
  el.removeEventListener('touchstart', rippleHide);
  el.removeEventListener('touchend', rippleHide);
  el.removeEventListener('touchcancel', rippleHide);
  el.removeEventListener('mouseup', rippleHide);
  el.removeEventListener('mouseleave', rippleHide);
  el.removeEventListener('dragstart', rippleHide);
}

function directive(el, binding, node) {
  updateRipple(el, binding, false);

  if (false) {}
}

function unbind(el) {
  delete el._ripple;
  removeListeners(el);
}

function update(el, binding) {
  if (binding.value === binding.oldValue) {
    return;
  }

  const wasEnabled = isRippleEnabled(binding.oldValue);
  updateRipple(el, binding, wasEnabled);
}

const Ripple = {
  bind: directive,
  unbind,
  update
};
/* harmony default export */ var ripple = (Ripple);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/routable/index.js
 // Directives

 // Utilities


/* harmony default export */ var routable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
  name: 'routable',
  directives: {
    Ripple: ripple
  },
  props: {
    activeClass: String,
    append: Boolean,
    disabled: Boolean,
    exact: {
      type: Boolean,
      default: undefined
    },
    exactActiveClass: String,
    link: Boolean,
    href: [String, Object],
    to: [String, Object],
    nuxt: Boolean,
    replace: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: null
    },
    tag: String,
    target: String
  },
  data: () => ({
    isActive: false,
    proxyClass: ''
  }),
  computed: {
    classes() {
      const classes = {};
      if (this.to) return classes;
      if (this.activeClass) classes[this.activeClass] = this.isActive;
      if (this.proxyClass) classes[this.proxyClass] = this.isActive;
      return classes;
    },

    computedRipple() {
      return this.ripple != null ? this.ripple : !this.disabled && this.isClickable;
    },

    isClickable() {
      if (this.disabled) return false;
      return Boolean(this.isLink || this.$listeners.click || this.$listeners['!click'] || this.$attrs.tabindex);
    },

    isLink() {
      return this.to || this.href || this.link;
    },

    styles: () => ({})
  },
  watch: {
    $route: 'onRouteChange'
  },
  methods: {
    click(e) {
      this.$emit('click', e);
    },

    generateRouteLink() {
      let exact = this.exact;
      let tag;
      const data = {
        attrs: {
          tabindex: 'tabindex' in this.$attrs ? this.$attrs.tabindex : undefined
        },
        class: this.classes,
        style: this.styles,
        props: {},
        directives: [{
          name: 'ripple',
          value: this.computedRipple
        }],
        [this.to ? 'nativeOn' : 'on']: { ...this.$listeners,
          click: this.click
        },
        ref: 'link'
      };

      if (typeof this.exact === 'undefined') {
        exact = this.to === '/' || this.to === Object(this.to) && this.to.path === '/';
      }

      if (this.to) {
        // Add a special activeClass hook
        // for component level styles
        let activeClass = this.activeClass;
        let exactActiveClass = this.exactActiveClass || activeClass;

        if (this.proxyClass) {
          activeClass = `${activeClass} ${this.proxyClass}`.trim();
          exactActiveClass = `${exactActiveClass} ${this.proxyClass}`.trim();
        }

        tag = this.nuxt ? 'nuxt-link' : 'router-link';
        Object.assign(data.props, {
          to: this.to,
          exact,
          activeClass,
          exactActiveClass,
          append: this.append,
          replace: this.replace
        });
      } else {
        tag = this.href && 'a' || this.tag || 'div';
        if (tag === 'a' && this.href) data.attrs.href = this.href;
      }

      if (this.target) data.attrs.target = this.target;
      return {
        tag,
        data
      };
    },

    onRouteChange() {
      if (!this.to || !this.$refs.link || !this.$route) return;
      const activeClass = `${this.activeClass} ${this.proxyClass || ''}`.trim();
      const path = `_vnode.data.class.${activeClass}`;
      this.$nextTick(() => {
        /* istanbul ignore else */
        if (getObjectValueByPath(this.$refs.link, path)) {
          this.toggle();
        }
      });
    },

    toggle: () => {}
  }
}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/sizeable/index.js

/* harmony default export */ var sizeable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
  name: 'sizeable',
  props: {
    large: Boolean,
    small: Boolean,
    xLarge: Boolean,
    xSmall: Boolean
  },
  computed: {
    medium() {
      return Boolean(!this.xSmall && !this.small && !this.large && !this.xLarge);
    },

    sizeableClasses() {
      return {
        'v-size--x-small': this.xSmall,
        'v-size--small': this.small,
        'v-size--default': this.medium,
        'v-size--large': this.large,
        'v-size--x-large': this.xLarge
      };
    }

  }
}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
// Styles
 // Extensions

 // Components

 // Mixins





 // Utilities



const baseMixins = mixins(components_VSheet, routable, positionable, sizeable, factory('btnToggle'), toggleable_factory('inputValue')
/* @vue/component */
);
/* harmony default export */ var VBtn_VBtn = (baseMixins.extend().extend({
  name: 'v-btn',
  props: {
    activeClass: {
      type: String,

      default() {
        if (!this.btnToggle) return '';
        return this.btnToggle.activeClass;
      }

    },
    block: Boolean,
    depressed: Boolean,
    fab: Boolean,
    icon: Boolean,
    loading: Boolean,
    outlined: Boolean,
    rounded: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    text: Boolean,
    type: {
      type: String,
      default: 'button'
    },
    value: null
  },
  data: () => ({
    proxyClass: 'v-btn--active'
  }),
  computed: {
    classes() {
      return {
        'v-btn': true,
        ...routable.options.computed.classes.call(this),
        'v-btn--absolute': this.absolute,
        'v-btn--block': this.block,
        'v-btn--bottom': this.bottom,
        'v-btn--contained': this.contained,
        'v-btn--depressed': this.depressed || this.outlined,
        'v-btn--disabled': this.disabled,
        'v-btn--fab': this.isRound,
        'v-btn--fixed': this.fixed,
        'v-btn--flat': this.isFlat,
        'v-btn--icon': this.icon,
        'v-btn--left': this.left,
        'v-btn--loading': this.loading,
        'v-btn--outlined': this.outlined,
        'v-btn--right': this.right,
        'v-btn--round': this.isRound,
        'v-btn--rounded': this.rounded,
        'v-btn--router': this.to,
        'v-btn--text': this.text,
        'v-btn--tile': this.tile,
        'v-btn--top': this.top,
        ...this.themeClasses,
        ...this.groupClasses,
        ...this.elevationClasses,
        ...this.sizeableClasses
      };
    },

    contained() {
      return Boolean(!this.isFlat && !this.depressed && // Contained class only adds elevation
      // is not needed if user provides value
      !this.elevation);
    },

    computedRipple() {
      const defaultRipple = this.icon || this.fab ? {
        circle: true
      } : true;
      if (this.disabled) return false;else return this.ripple != null ? this.ripple : defaultRipple;
    },

    isFlat() {
      return Boolean(this.icon || this.text || this.outlined);
    },

    isRound() {
      return Boolean(this.icon || this.fab);
    },

    styles() {
      return { ...this.measurableStyles
      };
    }

  },

  created() {
    const breakingProps = [['flat', 'text'], ['outline', 'outlined'], ['round', 'rounded']];
    /* istanbul ignore next */

    breakingProps.forEach(([original, replacement]) => {
      if (this.$attrs.hasOwnProperty(original)) breaking(original, replacement, this);
    });
  },

  methods: {
    click(e) {
      this.$emit('click', e);
      this.btnToggle && this.toggle();
    },

    genContent() {
      return this.$createElement('span', {
        staticClass: 'v-btn__content'
      }, this.$slots.default);
    },

    genLoader() {
      return this.$createElement('span', {
        class: 'v-btn__loader'
      }, this.$slots.loader || [this.$createElement(components_VProgressCircular, {
        props: {
          indeterminate: true,
          size: 23,
          width: 2
        }
      })]);
    }

  },

  render(h) {
    const children = [this.genContent(), this.loading && this.genLoader()];
    const setColor = !this.isFlat ? this.setBackgroundColor : this.setTextColor;
    const {
      tag,
      data
    } = this.generateRouteLink();

    if (tag === 'button') {
      data.attrs.type = this.type;
      data.attrs.disabled = this.disabled;
    }

    data.attrs.value = ['string', 'number'].includes(typeof this.value) ? this.value : JSON.stringify(this.value);
    return h(tag, setColor(this.color, data), children);
  }

}));
//# sourceMappingURL=VBtn.js.map
// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VIcon/VIcon.sass
var VIcon = __webpack_require__("4804");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
 // Mixins



 // Util

 // Types



var SIZE_MAP;

(function (SIZE_MAP) {
  SIZE_MAP["xSmall"] = "12px";
  SIZE_MAP["small"] = "16px";
  SIZE_MAP["default"] = "24px";
  SIZE_MAP["medium"] = "28px";
  SIZE_MAP["large"] = "36px";
  SIZE_MAP["xLarge"] = "40px";
})(SIZE_MAP || (SIZE_MAP = {}));

function isFontAwesome5(iconType) {
  return ['fas', 'far', 'fal', 'fab'].some(val => iconType.includes(val));
}

function isSvgPath(icon) {
  return /^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(icon) && /[\dz]$/i.test(icon) && icon.length > 4;
}

const VIcon_VIcon = mixins(colorable, sizeable, themeable
/* @vue/component */
).extend({
  name: 'v-icon',
  props: {
    dense: Boolean,
    disabled: Boolean,
    left: Boolean,
    right: Boolean,
    size: [Number, String],
    tag: {
      type: String,
      required: false,
      default: 'i'
    }
  },
  computed: {
    medium() {
      return false;
    }

  },
  methods: {
    getIcon() {
      let iconName = '';
      if (this.$slots.default) iconName = this.$slots.default[0].text.trim();
      return remapInternalIcon(this, iconName);
    },

    getSize() {
      const sizes = {
        xSmall: this.xSmall,
        small: this.small,
        medium: this.medium,
        large: this.large,
        xLarge: this.xLarge
      };
      const explicitSize = keys(sizes).find(key => sizes[key]);
      return explicitSize && SIZE_MAP[explicitSize] || convertToUnit(this.size);
    },

    // Component data for both font and svg icon.
    getDefaultData() {
      const hasClickListener = Boolean(this.$listeners.click || this.$listeners['!click']);
      const data = {
        staticClass: 'v-icon notranslate',
        class: {
          'v-icon--disabled': this.disabled,
          'v-icon--left': this.left,
          'v-icon--link': hasClickListener,
          'v-icon--right': this.right,
          'v-icon--dense': this.dense
        },
        attrs: {
          'aria-hidden': !hasClickListener,
          role: hasClickListener ? 'button' : null,
          ...this.$attrs
        },
        on: this.$listeners
      };
      return data;
    },

    applyColors(data) {
      data.class = { ...data.class,
        ...this.themeClasses
      };
      this.setTextColor(this.color, data);
    },

    renderFontIcon(icon, h) {
      const newChildren = [];
      const data = this.getDefaultData();
      let iconType = 'material-icons'; // Material Icon delimiter is _
      // https://material.io/icons/

      const delimiterIndex = icon.indexOf('-');
      const isMaterialIcon = delimiterIndex <= -1;

      if (isMaterialIcon) {
        // Material icon uses ligatures.
        newChildren.push(icon);
      } else {
        iconType = icon.slice(0, delimiterIndex);
        if (isFontAwesome5(iconType)) iconType = '';
      }

      data.class[iconType] = true;
      data.class[icon] = !isMaterialIcon;
      const fontSize = this.getSize();
      if (fontSize) data.style = {
        fontSize
      };
      this.applyColors(data);
      return h(this.tag, data, newChildren);
    },

    renderSvgIcon(icon, h) {
      const data = this.getDefaultData();
      data.class['v-icon--svg'] = true;
      data.attrs = {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        height: '24',
        width: '24',
        role: 'img',
        'aria-hidden': !this.$attrs['aria-label'],
        'aria-label': this.$attrs['aria-label']
      };
      const fontSize = this.getSize();

      if (fontSize) {
        data.style = {
          fontSize,
          height: fontSize,
          width: fontSize
        };
        data.attrs.height = fontSize;
        data.attrs.width = fontSize;
      }

      this.applyColors(data);
      return h('svg', data, [h('path', {
        attrs: {
          d: icon
        }
      })]);
    },

    renderSvgIconComponent(icon, h) {
      const data = this.getDefaultData();
      data.class['v-icon--is-component'] = true;
      const size = this.getSize();

      if (size) {
        data.style = {
          fontSize: size,
          height: size
        };
      }

      this.applyColors(data);
      const component = icon.component;
      data.props = icon.props;
      data.nativeOn = data.on;
      return h(component, data);
    }

  },

  render(h) {
    const icon = this.getIcon();

    if (typeof icon === 'string') {
      if (isSvgPath(icon)) {
        return this.renderSvgIcon(icon, h);
      }

      return this.renderFontIcon(icon, h);
    }

    return this.renderSvgIconComponent(icon, h);
  }

});
/* harmony default export */ var components_VIcon_VIcon = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
  name: 'v-icon',
  $_wrapperFor: VIcon_VIcon,
  functional: true,

  render(h, {
    data,
    children
  }) {
    let iconName = ''; // Support usage of v-text and v-html

    if (data.domProps) {
      iconName = data.domProps.textContent || data.domProps.innerHTML || iconName; // Remove nodes so it doesn't
      // overwrite our changes

      delete data.domProps.textContent;
      delete data.domProps.innerHTML;
    }

    return h(VIcon_VIcon, data, iconName ? [iconName] : children);
  }

}));
//# sourceMappingURL=VIcon.js.map
// CONCATENATED MODULE: ./src/components/BaseButton.vue





/* normalize component */

var BaseButton_component = normalizeComponent(
  components_BaseButtonvue_type_script_lang_js_,
  BaseButtonvue_type_template_id_e89e2056_render,
  BaseButtonvue_type_template_id_e89e2056_staticRenderFns,
  false,
  null,
  null,
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('BaseButton', BaseButton_component.exports)
}
/* harmony default export */ var BaseButton = (BaseButton_component.exports);

/* vuetify-loader */



installComponents_default()(BaseButton_component, {VBtn: VBtn_VBtn,VIcon: components_VIcon_VIcon})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BaseCard.vue?vue&type=template&id=06038c6a&
var BaseCardvue_type_template_id_06038c6a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-sheet',{attrs:{"elevation":2,"color":_vm.external ? 'rgb(255, 252, 245)' : ''}},[_vm._t("default")],2)}
var BaseCardvue_type_template_id_06038c6a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/BaseCard.vue?vue&type=template&id=06038c6a&

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BaseCard.vue?vue&type=script&lang=js&
//
//
//
//
//
//

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('BaseCard', component.exports)
}
/* harmony default export */ var BaseCardvue_type_script_lang_js_ = ({
  props: {
    external: {
      type: Boolean,
      default: false
    }
  }
});

// CONCATENATED MODULE: ./src/components/BaseCard.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_BaseCardvue_type_script_lang_js_ = (BaseCardvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/BaseCard.vue





/* normalize component */

var BaseCard_component = normalizeComponent(
  components_BaseCardvue_type_script_lang_js_,
  BaseCardvue_type_template_id_06038c6a_render,
  BaseCardvue_type_template_id_06038c6a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('BaseCard', BaseCard_component.exports)
}
/* harmony default export */ var BaseCard = (BaseCard_component.exports);

/* vuetify-loader */


installComponents_default()(BaseCard_component, {VSheet: VSheet_VSheet})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasePropChip.vue?vue&type=template&id=458a3e12&scoped=true&
var BasePropChipvue_type_template_id_458a3e12_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-btn',{staticClass:"chip",attrs:{"small":"","depressed":"","rounded":""},on:{"click":function($event){return _vm.$emit('chip-click', $event)}}},[_vm._t("default")],2)}
var BasePropChipvue_type_template_id_458a3e12_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/BasePropChip.vue?vue&type=template&id=458a3e12&scoped=true&

// EXTERNAL MODULE: ./src/components/BasePropChip.vue?vue&type=style&index=0&id=458a3e12&scoped=true&lang=css&
var BasePropChipvue_type_style_index_0_id_458a3e12_scoped_true_lang_css_ = __webpack_require__("d925");

// CONCATENATED MODULE: ./src/components/BasePropChip.vue

var script = {}



/* normalize component */

var BasePropChip_component = normalizeComponent(
  script,
  BasePropChipvue_type_template_id_458a3e12_scoped_true_render,
  BasePropChipvue_type_template_id_458a3e12_scoped_true_staticRenderFns,
  false,
  null,
  "458a3e12",
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('BasePropChip', BasePropChip_component.exports)
}
/* harmony default export */ var BasePropChip = (BasePropChip_component.exports);

/* vuetify-loader */


installComponents_default()(BasePropChip_component, {VBtn: VBtn_VBtn})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasePropDisplay.vue?vue&type=template&id=67b51244&functional=true&
var BasePropDisplayvue_type_template_id_67b51244_functional_true_render = function (_h,_vm) {var _c=_vm._c;return _c('div',{staticClass:"py-1 font-lato small"},[(_vm.props.name)?_c('span',{staticClass:"bold pr-2"},[_vm._v(_vm._s(_vm.props.name))]):_vm._e(),_vm._t("default")],2)}
var BasePropDisplayvue_type_template_id_67b51244_functional_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/BasePropDisplay.vue?vue&type=template&id=67b51244&functional=true&

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasePropDisplay.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('BasePropDisplay', component.exports)
}
/* harmony default export */ var BasePropDisplayvue_type_script_lang_js_ = ({
  props: {
    name: {
      type: String,
      default: ''
    }
  }
});

// CONCATENATED MODULE: ./src/components/BasePropDisplay.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_BasePropDisplayvue_type_script_lang_js_ = (BasePropDisplayvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/BasePropDisplay.vue





/* normalize component */

var BasePropDisplay_component = normalizeComponent(
  components_BasePropDisplayvue_type_script_lang_js_,
  BasePropDisplayvue_type_template_id_67b51244_functional_true_render,
  BasePropDisplayvue_type_template_id_67b51244_functional_true_staticRenderFns,
  true,
  null,
  null,
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('BasePropDisplay', BasePropDisplay_component.exports)
}
/* harmony default export */ var BasePropDisplay = (BasePropDisplay_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BaseTitleDisplay.vue?vue&type=template&id=265f70c0&functional=true&
var BaseTitleDisplayvue_type_template_id_265f70c0_functional_true_render = function (_h,_vm) {var _c=_vm._c;return _c('h3',{staticStyle:{"padding-top":".15em"}},[_c('router-link',{attrs:{"to":_vm.props.to}},[_vm._t("default")],2)],1)}
var BaseTitleDisplayvue_type_template_id_265f70c0_functional_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/BaseTitleDisplay.vue?vue&type=template&id=265f70c0&functional=true&

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BaseTitleDisplay.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('BaseTitleDisplay', component.exports)
}
/* harmony default export */ var BaseTitleDisplayvue_type_script_lang_js_ = ({
  props: {
    to: String
  }
});

// CONCATENATED MODULE: ./src/components/BaseTitleDisplay.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_BaseTitleDisplayvue_type_script_lang_js_ = (BaseTitleDisplayvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/BaseTitleDisplay.vue





/* normalize component */

var BaseTitleDisplay_component = normalizeComponent(
  components_BaseTitleDisplayvue_type_script_lang_js_,
  BaseTitleDisplayvue_type_template_id_265f70c0_functional_true_render,
  BaseTitleDisplayvue_type_template_id_265f70c0_functional_true_staticRenderFns,
  true,
  null,
  null,
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('BaseTitleDisplay', BaseTitleDisplay_component.exports)
}
/* harmony default export */ var BaseTitleDisplay = (BaseTitleDisplay_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ExternalContribution.vue?vue&type=template&id=2a392b5d&
var ExternalContributionvue_type_template_id_2a392b5d_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('BasePropDisplay',[_c('v-icon',{staticClass:"external",attrs:{"small":""}},[_vm._v("mdi-heart")]),_c('span',{staticClass:"external"},[_vm._v("This is an external contribution")])],1)}
var ExternalContributionvue_type_template_id_2a392b5d_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ExternalContribution.vue?vue&type=template&id=2a392b5d&

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ExternalContribution.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//



if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('ExternalContribution', component.exports)
}
/* harmony default export */ var ExternalContributionvue_type_script_lang_js_ = ({
  components: {
    BasePropDisplay: BasePropDisplay
  }
});

// CONCATENATED MODULE: ./src/components/ExternalContribution.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ExternalContributionvue_type_script_lang_js_ = (ExternalContributionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ExternalContribution.vue?vue&type=style&index=0&lang=css&
var ExternalContributionvue_type_style_index_0_lang_css_ = __webpack_require__("53ff");

// CONCATENATED MODULE: ./src/components/ExternalContribution.vue






/* normalize component */

var ExternalContribution_component = normalizeComponent(
  components_ExternalContributionvue_type_script_lang_js_,
  ExternalContributionvue_type_template_id_2a392b5d_render,
  ExternalContributionvue_type_template_id_2a392b5d_staticRenderFns,
  false,
  null,
  null,
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('ExternalContribution', ExternalContribution_component.exports)
}
/* harmony default export */ var ExternalContribution = (ExternalContribution_component.exports);

/* vuetify-loader */


installComponents_default()(ExternalContribution_component, {VIcon: components_VIcon_VIcon})

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/AppCard.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('AppCard', component.exports)
}
/* harmony default export */ var AppCardvue_type_script_lang_js_ = ({
  components: {
    BaseButton: BaseButton,
    BaseCard: BaseCard,
    BasePropChip: BasePropChip,
    BasePropDisplay: BasePropDisplay,
    BaseTitleDisplay: BaseTitleDisplay,
    ExternalContribution: ExternalContribution
  },
  mixins: [baseFilters],
  props: {
    item: Object,
    preview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    app() {
      return this.item
    }
  }
});

// CONCATENATED MODULE: ./src/AppCard.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_AppCardvue_type_script_lang_js_ = (AppCardvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VImg/VImg.sass
var VImg = __webpack_require__("8efc");

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VResponsive/VResponsive.sass
var VResponsive = __webpack_require__("36a7");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VResponsive/VResponsive.js
 // Mixins

 // Utils


/* @vue/component */

/* harmony default export */ var VResponsive_VResponsive = (mixins(measurable).extend({
  name: 'v-responsive',
  props: {
    aspectRatio: [String, Number]
  },
  computed: {
    computedAspectRatio() {
      return Number(this.aspectRatio);
    },

    aspectStyle() {
      return this.computedAspectRatio ? {
        paddingBottom: 1 / this.computedAspectRatio * 100 + '%'
      } : undefined;
    },

    __cachedSizer() {
      if (!this.aspectStyle) return [];
      return this.$createElement('div', {
        style: this.aspectStyle,
        staticClass: 'v-responsive__sizer'
      });
    }

  },
  methods: {
    genContent() {
      return this.$createElement('div', {
        staticClass: 'v-responsive__content'
      }, this.$slots.default);
    }

  },

  render(h) {
    return h('div', {
      staticClass: 'v-responsive',
      style: this.measurableStyles,
      on: this.$listeners
    }, [this.__cachedSizer, this.genContent()]);
  }

}));
//# sourceMappingURL=VResponsive.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VResponsive/index.js


/* harmony default export */ var components_VResponsive = (VResponsive_VResponsive);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VImg/VImg.js
 // Components

 // Utils


/* @vue/component */

/* harmony default export */ var VImg_VImg = (components_VResponsive.extend({
  name: 'v-img',
  props: {
    alt: String,
    contain: Boolean,
    gradient: String,
    lazySrc: String,
    position: {
      type: String,
      default: 'center center'
    },
    sizes: String,
    src: {
      type: [String, Object],
      default: ''
    },
    srcset: String,
    transition: {
      type: [Boolean, String],
      default: 'fade-transition'
    }
  },

  data() {
    return {
      currentSrc: '',
      image: null,
      isLoading: true,
      calculatedAspectRatio: undefined,
      naturalWidth: undefined
    };
  },

  computed: {
    computedAspectRatio() {
      return Number(this.normalisedSrc.aspect || this.calculatedAspectRatio);
    },

    normalisedSrc() {
      return typeof this.src === 'string' ? {
        src: this.src,
        srcset: this.srcset,
        lazySrc: this.lazySrc,
        aspect: Number(this.aspectRatio)
      } : {
        src: this.src.src,
        srcset: this.srcset || this.src.srcset,
        lazySrc: this.lazySrc || this.src.lazySrc,
        aspect: Number(this.aspectRatio || this.src.aspect)
      };
    },

    __cachedImage() {
      if (!(this.normalisedSrc.src || this.normalisedSrc.lazySrc)) return [];
      const backgroundImage = [];
      const src = this.isLoading ? this.normalisedSrc.lazySrc : this.currentSrc;
      if (this.gradient) backgroundImage.push(`linear-gradient(${this.gradient})`);
      if (src) backgroundImage.push(`url("${src}")`);
      const image = this.$createElement('div', {
        staticClass: 'v-image__image',
        class: {
          'v-image__image--preload': this.isLoading,
          'v-image__image--contain': this.contain,
          'v-image__image--cover': !this.contain
        },
        style: {
          backgroundImage: backgroundImage.join(', '),
          backgroundPosition: this.position
        },
        key: +this.isLoading
      });
      if (!this.transition) return image;
      return this.$createElement('transition', {
        attrs: {
          name: this.transition,
          mode: 'in-out'
        }
      }, [image]);
    }

  },
  watch: {
    src() {
      if (!this.isLoading) this.init();else this.loadImage();
    },

    '$vuetify.breakpoint.width': 'getSrc'
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      if (this.normalisedSrc.lazySrc) {
        const lazyImg = new Image();
        lazyImg.src = this.normalisedSrc.lazySrc;
        this.pollForSize(lazyImg, null);
      }
      /* istanbul ignore else */


      if (this.normalisedSrc.src) this.loadImage();
    },

    onLoad() {
      this.getSrc();
      this.isLoading = false;
      this.$emit('load', this.src);
    },

    onError() {
      consoleError(`Image load failed\n\n` + `src: ${this.normalisedSrc.src}`, this);
      this.$emit('error', this.src);
    },

    getSrc() {
      /* istanbul ignore else */
      if (this.image) this.currentSrc = this.image.currentSrc || this.image.src;
    },

    loadImage() {
      const image = new Image();
      this.image = image;

      image.onload = () => {
        /* istanbul ignore if */
        if (image.decode) {
          image.decode().catch(err => {
            consoleWarn(`Failed to decode image, trying to render anyway\n\n` + `src: ${this.normalisedSrc.src}` + (err.message ? `\nOriginal error: ${err.message}` : ''), this);
          }).then(this.onLoad);
        } else {
          this.onLoad();
        }
      };

      image.onerror = this.onError;
      image.src = this.normalisedSrc.src;
      this.sizes && (image.sizes = this.sizes);
      this.normalisedSrc.srcset && (image.srcset = this.normalisedSrc.srcset);
      this.aspectRatio || this.pollForSize(image);
      this.getSrc();
    },

    pollForSize(img, timeout = 100) {
      const poll = () => {
        const {
          naturalHeight,
          naturalWidth
        } = img;

        if (naturalHeight || naturalWidth) {
          this.naturalWidth = naturalWidth;
          this.calculatedAspectRatio = naturalWidth / naturalHeight;
        } else {
          timeout != null && setTimeout(poll, timeout);
        }
      };

      poll();
    },

    genContent() {
      const content = components_VResponsive.options.methods.genContent.call(this);

      if (this.naturalWidth) {
        this._b(content.data, 'div', {
          style: {
            width: `${this.naturalWidth}px`
          }
        });
      }

      return content;
    },

    __genPlaceholder() {
      if (this.$slots.placeholder) {
        const placeholder = this.isLoading ? [this.$createElement('div', {
          staticClass: 'v-image__placeholder'
        }, this.$slots.placeholder)] : [];
        if (!this.transition) return placeholder[0];
        return this.$createElement('transition', {
          attrs: {
            name: this.transition
          }
        }, placeholder);
      }
    }

  },

  render(h) {
    const node = components_VResponsive.options.render.call(this, h);
    node.data.staticClass += ' v-image';
    node.data.attrs = {
      role: this.alt ? 'img' : undefined,
      'aria-label': this.alt
    };
    node.children = [this.__cachedSizer, this.__cachedImage, this.__genPlaceholder(), this.genContent()];
    return h(node.tag, node.data, node.children);
  }

}));
//# sourceMappingURL=VImg.js.map
// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VGrid/VGrid.sass
var VGrid = __webpack_require__("4b85");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/util/mergeData.js
/**
 * @copyright 2017 Alex Regan
 * @license MIT
 * @see https://github.com/alexsasharegan/vue-functional-data-merge
 */
function mergeData() {
  const mergeTarget = {};
  let i = arguments.length;
  let prop;
  let event; // Allow for variadic argument length.

  while (i--) {
    // Iterate through the data properties and execute merge strategies
    // Object.keys eliminates need for hasOwnProperty call
    for (prop of Object.keys(arguments[i])) {
      switch (prop) {
        // Array merge strategy (array concatenation)
        case 'class':
        case 'style':
        case 'directives':
          if (!Array.isArray(mergeTarget[prop])) {
            mergeTarget[prop] = [];
          } // Repackaging in an array allows Vue runtime
          // to merge class/style bindings regardless of type.


          mergeTarget[prop] = mergeTarget[prop].concat(arguments[i][prop]);
          break;
        // Space delimited string concatenation strategy

        case 'staticClass':
          if (!arguments[i][prop]) {
            break;
          }

          if (mergeTarget[prop] === undefined) {
            mergeTarget[prop] = '';
          }

          if (mergeTarget[prop]) {
            // Not an empty string, so concatenate
            mergeTarget[prop] += ' ';
          }

          mergeTarget[prop] += arguments[i][prop].trim();
          break;
        // Object, the properties of which to merge via array merge strategy (array concatenation).
        // Callback merge strategy merges callbacks to the beginning of the array,
        // so that the last defined callback will be invoked first.
        // This is done since to mimic how Object.assign merging
        // uses the last given value to assign.

        case 'on':
        case 'nativeOn':
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = {};
          }

          const listeners = mergeTarget[prop];

          for (event of Object.keys(arguments[i][prop] || {})) {
            // Concat function to array of functions if callback present.
            if (listeners[event]) {
              // Insert current iteration data in beginning of merged array.
              listeners[event] = Array().concat( // eslint-disable-line
              listeners[event], arguments[i][prop][event]);
            } else {
              // Straight assign.
              listeners[event] = arguments[i][prop][event];
            }
          }

          break;
        // Object merge strategy

        case 'attrs':
        case 'props':
        case 'domProps':
        case 'scopedSlots':
        case 'staticStyle':
        case 'hook':
        case 'transition':
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = {};
          }

          mergeTarget[prop] = { ...arguments[i][prop],
            ...mergeTarget[prop]
          };
          break;
        // Reassignment strategy (no merge)

        case 'slot':
        case 'key':
        case 'ref':
        case 'tag':
        case 'show':
        case 'keepAlive':
        default:
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = arguments[i][prop];
          }

      }
    }
  }

  return mergeTarget;
}
//# sourceMappingURL=mergeData.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js



 // no xs

const breakpoints = ['sm', 'md', 'lg', 'xl'];
const ALIGNMENT = ['start', 'end', 'center'];

function makeProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    props[prefix + upperFirst(val)] = def();
    return props;
  }, {});
}

const alignValidator = str => [...ALIGNMENT, 'baseline', 'stretch'].includes(str);

const alignProps = makeProps('align', () => ({
  type: String,
  default: null,
  validator: alignValidator
}));

const justifyValidator = str => [...ALIGNMENT, 'space-between', 'space-around'].includes(str);

const justifyProps = makeProps('justify', () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));

const alignContentValidator = str => [...ALIGNMENT, 'space-between', 'space-around', 'stretch'].includes(str);

const alignContentProps = makeProps('alignContent', () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: 'align',
  justify: 'justify',
  alignContent: 'align-content'
};

function breakpointClass(type, prop, val) {
  let className = classMap[type];

  if (val == null) {
    return undefined;
  }

  if (prop) {
    // alignSm -> Sm
    const breakpoint = prop.replace(type, '');
    className += `-${breakpoint}`;
  } // .align-items-sm-center


  className += `-${val}`;
  return className.toLowerCase();
}

const cache = new Map();
/* harmony default export */ var VRow = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
  name: 'v-row',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    dense: Boolean,
    noGutters: Boolean,
    align: {
      type: String,
      default: null,
      validator: alignValidator
    },
    ...alignProps,
    justify: {
      type: String,
      default: null,
      validator: justifyValidator
    },
    ...justifyProps,
    alignContent: {
      type: String,
      default: null,
      validator: alignContentValidator
    },
    ...alignContentProps
  },

  render(h, {
    props,
    data,
    children
  }) {
    // Super-fast memoization based on props, 5x faster than JSON.stringify
    let cacheKey = '';

    for (const prop in props) {
      cacheKey += String(props[prop]);
    }

    let classList = cache.get(cacheKey);

    if (!classList) {
      classList = []; // Loop through `align`, `justify`, `alignContent` breakpoint props

      let type;

      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }

      classList.push({
        'no-gutters': props.noGutters,
        'row--dense': props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      cache.set(cacheKey, classList);
    }

    return h(props.tag, mergeData(data, {
      staticClass: 'row',
      class: classList
    }), children);
  }

}));
//# sourceMappingURL=VRow.js.map
// CONCATENATED MODULE: ./src/AppCard.vue





/* normalize component */

var AppCard_component = normalizeComponent(
  src_AppCardvue_type_script_lang_js_,
  AppCardvue_type_template_id_b08c5624_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('AppCard', AppCard_component.exports)
}
/* harmony default export */ var AppCard = (AppCard_component.exports);

/* vuetify-loader */




installComponents_default()(AppCard_component, {VImg: VImg_VImg,VProgressCircular: VProgressCircular_VProgressCircular,VRow: VRow})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/AppView.vue?vue&type=template&id=1d38b6cb&
var AppViewvue_type_template_id_1d38b6cb_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('BaseCard',{attrs:{"external":_vm.app.external}},[_c('v-row',{staticClass:"mx-0 px-6 py-4"},[_c('h2',[_c('span',{staticClass:"small pl-2",staticStyle:{"color":"#666"}},[_vm._v("Apps")]),_c('v-icon',[_vm._v("mdi-chevron-right")]),[_vm._v(_vm._s(_vm.app.title))]],2),_c('v-spacer'),_c('BaseButton',{attrs:{"label":"Launch","href":_vm.app.url,"icon":"mdi-play"}},[[_vm._v(_vm._s('Launch'))]],2),(_vm.app.src)?_c('BaseButton',{attrs:{"label":"Source code","href":_vm.app.src,"icon":"code"}},[[_vm._v(_vm._s('Source code'))]],2):_vm._e(),_c('BaseButton',{attrs:{"label":"Back","to":_vm.preview ? '' : '/apps'}},[_vm._v("back")])],1),_c('v-divider'),_c('v-row',{staticClass:"mx-0",attrs:{"no-gutters":""}},[_c('v-col',{attrs:{"cols":"3"}},[_c('v-img',{attrs:{"src":_vm.app.image},scopedSlots:_vm._u([{key:"placeholder",fn:function(){return [_c('v-row',{staticClass:"fill-height",attrs:{"align":"center","justify":"center"}},[_c('v-progress-circular',{attrs:{"indeterminate":""}})],1)]},proxy:true}])})],1),_c('v-col',{staticClass:"px-6 pb-6",class:_vm.app.external ? 'pt-0' : 'pt-6',attrs:{"cols":"9"}},[(_vm.app.external)?_c('ExternalContribution'):_vm._e(),_c('h2',{staticClass:"pb-4 light"},[_vm._v("About this app")]),_c('BasePropDisplay',{attrs:{"name":"Updated"}},[[_vm._v(_vm._s(_vm._f("formatDate")(_vm.app.date)))]],2),_c('BasePropDisplay',{attrs:{"name":"Contributors"}},[(_vm.app.contributors)?_vm._l((_vm.app.contributors),function(contributor,i){return _c('span',{key:i},[(i > 1)?[_vm._v(_vm._s(_vm.app.contributors.length > i + 1 ? ', ' : ' and '))]:_vm._e(),(contributor.url)?_c('a',{attrs:{"href":contributor.url,"target":"_blank","rel":"noreferrer"}},[[_vm._v(_vm._s(contributor.title))]],2):[_vm._v(_vm._s(contributor.title))]],2)}):[_vm._v(_vm._s('ICJIA R&A staff'))]],2),(_vm.app.categories)?_c('BasePropDisplay',{attrs:{"name":"Categories"}},_vm._l((_vm.app.categories),function(category,i){return _c('span',{key:i},[(i > 0)?[_vm._v(_vm._s(', '))]:_vm._e(),[_vm._v(_vm._s(_vm._f("capitalize")(category)))]],2)}),0):_vm._e(),(_vm.app.tags)?_c('BasePropDisplay',{attrs:{"name":"Tags"}},_vm._l((_vm.app.tags),function(tag){return _c('BasePropChip',{key:tag,on:{"chip-click":function($event){return _vm.$emit('tag-click', $event)}}},[[_vm._v(_vm._s(tag))]],2)}),1):_vm._e(),_c('BasePropDisplay',{attrs:{"name":"Description"}},[[_vm._v(_vm._s(_vm.app.description))]],2),(_vm.app.funding)?_c('BaseInfoBlock',{scopedSlots:_vm._u([{key:"title",fn:function(){return [_vm._v(_vm._s('Funding acknowledgment'))]},proxy:true},{key:"text",fn:function(){return [_vm._v(_vm._s(_vm.app.funding))]},proxy:true}],null,false,115272060)}):_vm._e(),(_vm.app.citation)?_c('BaseInfoBlock',{scopedSlots:_vm._u([{key:"title",fn:function(){return [_vm._v(_vm._s('Suggested citation'))]},proxy:true},{key:"text",fn:function(){return [_c('span',{domProps:{"innerHTML":_vm._s(_vm.app.citation)}})]},proxy:true}],null,false,200981760)}):_vm._e(),(_vm.hasRelated)?_c('BaseInfoBlock',{scopedSlots:_vm._u([{key:"title",fn:function(){return [_vm._v(_vm._s('Related contents'))]},proxy:true},{key:"text",fn:function(){return [_c('ul',{staticClass:"font-lato"},[_vm._l((_vm.app.articles),function(article,i){return _c('li',{key:("article" + i)},[_c('router-link',{attrs:{"to":_vm.preview ? '' : ("/articles/" + (article.slug))}},[[_vm._v(_vm._s(("[ARTICLE] " + (article.title))))]],2)],1)}),_vm._l((_vm.app.datasets),function(dataset,i){return _c('li',{key:("dataset" + i)},[_c('router-link',{attrs:{"to":_vm.preview ? '' : ("/datasets/" + (dataset.slug))}},[[_vm._v(_vm._s(("[DATASET] " + (dataset.title))))]],2)],1)})],2)]},proxy:true}],null,false,110840128)}):_vm._e()],1)],1)],1)}
var AppViewvue_type_template_id_1d38b6cb_staticRenderFns = []


// CONCATENATED MODULE: ./src/AppView.vue?vue&type=template&id=1d38b6cb&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BaseInfoBlock.vue?vue&type=template&id=1c849f55&functional=true&
var BaseInfoBlockvue_type_template_id_1c849f55_functional_true_render = function (_h,_vm) {var _c=_vm._c;return _c('div',{staticClass:"info-block",class:_vm.props.large ? '' : 'small'},[_c('div',{staticClass:"info-block-title"},[_vm._t("title")],2),_vm._t("text")],2)}
var BaseInfoBlockvue_type_template_id_1c849f55_functional_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/BaseInfoBlock.vue?vue&type=template&id=1c849f55&functional=true&

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BaseInfoBlock.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('BaseInfoBlock', component.exports)
}
/* harmony default export */ var BaseInfoBlockvue_type_script_lang_js_ = ({
  props: {
    large: {
      type: Boolean,
      default: false
    }
  }
});

// CONCATENATED MODULE: ./src/components/BaseInfoBlock.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_BaseInfoBlockvue_type_script_lang_js_ = (BaseInfoBlockvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/BaseInfoBlock.vue





/* normalize component */

var BaseInfoBlock_component = normalizeComponent(
  components_BaseInfoBlockvue_type_script_lang_js_,
  BaseInfoBlockvue_type_template_id_1c849f55_functional_true_render,
  BaseInfoBlockvue_type_template_id_1c849f55_functional_true_staticRenderFns,
  true,
  null,
  null,
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('BaseInfoBlock', BaseInfoBlock_component.exports)
}
/* harmony default export */ var BaseInfoBlock = (BaseInfoBlock_component.exports);
// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/AppView.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('AppView', component.exports)
}
/* harmony default export */ var AppViewvue_type_script_lang_js_ = ({
  components: {
    BaseButton: BaseButton,
    BaseCard: BaseCard,
    BasePropChip: BasePropChip,
    BasePropDisplay: BasePropDisplay,
    ExternalContribution: ExternalContribution,
    BaseInfoBlock: BaseInfoBlock
  },
  mixins: [baseFilters],
  props: {
    item: Object,
    preview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    app() {
      return this.item
    },
    hasRelated() {
      const { articles, datasets } = this.item
      return (articles && articles.length) || (datasets && datasets.length)
    }
  }
});

// CONCATENATED MODULE: ./src/AppView.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_AppViewvue_type_script_lang_js_ = (AppViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js



 // no xs

const VCol_breakpoints = ['sm', 'md', 'lg', 'xl'];

const breakpointProps = (() => {
  return VCol_breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();

const offsetProps = (() => {
  return VCol_breakpoints.reduce((props, val) => {
    props['offset' + upperFirst(val)] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();

const orderProps = (() => {
  return VCol_breakpoints.reduce((props, val) => {
    props['order' + upperFirst(val)] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();

const VCol_propMap = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};

function VCol_breakpointClass(type, prop, val) {
  let className = type;

  if (val == null || val === false) {
    return undefined;
  }

  if (prop) {
    const breakpoint = prop.replace(type, '');
    className += `-${breakpoint}`;
  } // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <v-col sm></v-col> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.


  if (type === 'col' && (val === '' || val === true)) {
    // .col-md
    return className.toLowerCase();
  } // .order-md-6


  className += `-${val}`;
  return className.toLowerCase();
}

const VCol_cache = new Map();
/* harmony default export */ var VCol = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
  name: 'v-col',
  functional: true,
  props: {
    cols: {
      type: [Boolean, String, Number],
      default: false
    },
    ...breakpointProps,
    offset: {
      type: [String, Number],
      default: null
    },
    ...offsetProps,
    order: {
      type: [String, Number],
      default: null
    },
    ...orderProps,
    alignSelf: {
      type: String,
      default: null,
      validator: str => ['auto', 'start', 'end', 'center', 'baseline', 'stretch'].includes(str)
    },
    tag: {
      type: String,
      default: 'div'
    }
  },

  render(h, {
    props,
    data,
    children,
    parent
  }) {
    // Super-fast memoization based on props, 5x faster than JSON.stringify
    let cacheKey = '';

    for (const prop in props) {
      cacheKey += String(props[prop]);
    }

    let classList = VCol_cache.get(cacheKey);

    if (!classList) {
      classList = []; // Loop through `col`, `offset`, `order` breakpoint props

      let type;

      for (type in VCol_propMap) {
        VCol_propMap[type].forEach(prop => {
          const value = props[prop];
          const className = VCol_breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }

      const hasColClasses = classList.some(className => className.startsWith('col-'));
      classList.push({
        // Default to .col if no other col-{bp}-* classes generated nor `cols` specified.
        col: !hasColClasses || !props.cols,
        [`col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      VCol_cache.set(cacheKey, classList);
    }

    return h(props.tag, mergeData(data, {
      class: classList
    }), children);
  }

}));
//# sourceMappingURL=VCol.js.map
// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VDivider/VDivider.sass
var VDivider = __webpack_require__("8ce9");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VDivider/VDivider.js
// Styles
 // Mixins


/* harmony default export */ var VDivider_VDivider = (themeable.extend({
  name: 'v-divider',
  props: {
    inset: Boolean,
    vertical: Boolean
  },

  render(h) {
    // WAI-ARIA attributes
    let orientation;

    if (!this.$attrs.role || this.$attrs.role === 'separator') {
      orientation = this.vertical ? 'vertical' : 'horizontal';
    }

    return h('hr', {
      class: {
        'v-divider': true,
        'v-divider--inset': this.inset,
        'v-divider--vertical': this.vertical,
        ...this.themeClasses
      },
      attrs: {
        role: 'separator',
        'aria-orientation': orientation,
        ...this.$attrs
      },
      on: this.$listeners
    });
  }

}));
//# sourceMappingURL=VDivider.js.map
// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VGrid/_grid.sass
var _grid = __webpack_require__("20f6");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js


/* harmony default export */ var VSpacer = (createSimpleFunctional('spacer', 'div', 'v-spacer'));
//# sourceMappingURL=VSpacer.js.map
// CONCATENATED MODULE: ./src/AppView.vue





/* normalize component */

var AppView_component = normalizeComponent(
  src_AppViewvue_type_script_lang_js_,
  AppViewvue_type_template_id_1d38b6cb_render,
  AppViewvue_type_template_id_1d38b6cb_staticRenderFns,
  false,
  null,
  null,
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('AppView', AppView_component.exports)
}
/* harmony default export */ var AppView = (AppView_component.exports);

/* vuetify-loader */








installComponents_default()(AppView_component, {VCol: VCol,VDivider: VDivider_VDivider,VIcon: components_VIcon_VIcon,VImg: VImg_VImg,VProgressCircular: VProgressCircular_VProgressCircular,VRow: VRow,VSpacer: VSpacer})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/ArticleCard.vue?vue&type=template&id=4ffc4abd&scoped=true&
var ArticleCardvue_type_template_id_4ffc4abd_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('BaseCard',{ref:"card",attrs:{"external":_vm.article.external}},[_c('v-row',{staticClass:"mx-0"},[_c('v-img',{staticClass:"hidden-sm-and-down",attrs:{"src":_vm.article.thumbnail,"max-width":"200"},scopedSlots:_vm._u([{key:"placeholder",fn:function(){return [_c('v-row',{staticClass:"fill-height",attrs:{"align":"center","justify":"center"}},[_c('v-progress-circular',{attrs:{"indeterminate":""}})],1)]},proxy:true}])}),_c('v-col',{staticClass:"mx-0 pa-0",attrs:{"align-self":"end"}},[_c('div',{staticClass:"px-6",class:_vm.article.external ? 'pt-0' : 'pt-6'},[(_vm.article.external)?_c('ExternalContribution'):_vm._e(),_c('v-row',{staticClass:"py-0 mx-0"},[_c('BaseTitleDisplay',{attrs:{"to":_vm.preview ? '' : ("/articles/" + (_vm.article.slug))}},[[_vm._v(_vm._s(_vm.article.title))]],2),(_vm.article.tags)?_c('div',_vm._l((_vm.article.tags),function(tag){return _c('BasePropChip',{key:tag,on:{"chip-click":function($event){return _vm.$emit('tag-click', $event)}}},[[_vm._v(_vm._s(tag))]],2)}),1):_vm._e()],1)],1),_c('div',{staticClass:"pt-4 px-6"},[(_vm.article.date)?_c('BasePropDisplay',{attrs:{"name":"Updated"}},[[_vm._v(_vm._s(_vm._f("formatDate")(_vm.article.date)))]],2):_vm._e(),(_vm.article.authors)?_c('BasePropDisplay',{attrs:{"name":"Authors"}},_vm._l((_vm.article.authors),function(author,i){return _c('span',{key:author.title},[(i > 0)?[_vm._v(_vm._s(_vm.article.authors.length > i + 1 ? ', ' : ' and '))]:_vm._e(),_c('a',{on:{"click":function($event){return _vm.$emit('author-click', $event)}}},[_vm._v(_vm._s(author.title))])],2)}),0):_vm._e(),(_vm.article.categories)?_c('BasePropDisplay',{attrs:{"name":"Categories"}},_vm._l((_vm.article.categories),function(category,i){return _c('span',{key:category},[(i > 0)?[_vm._v(_vm._s(', '))]:_vm._e(),[_vm._v(_vm._s(_vm._f("capitalize")(category)))]],2)}),0):_vm._e()],1),_c('v-row',{staticClass:"ma-0 px-2 pb-2",attrs:{"justify":"end"}},[(_vm.article.abstract)?_c('v-btn',{attrs:{"aria-label":_vm.showAbstract ? 'Hide abstract' : 'Show abstract',"text":""},on:{"click":function($event){_vm.showAbstract = !_vm.showAbstract}}},[[_vm._v(_vm._s('abstract'))],_c('v-icon',[_vm._v(_vm._s(_vm.abstractIcon))])],2):_vm._e(),_c('BaseButton',{attrs:{"label":"More","to":_vm.preview ? null : ("/articles/" + (_vm.article.slug)),"icon":"mdi-dots-horizontal"}},[[_vm._v(_vm._s('more'))]],2)],1),_c('v-slide-y-transition',[(_vm.showAbstract)?_c('v-card-text',[_vm._v(_vm._s(_vm.article.abstract))]):_vm._e()],1)],1)],1)],1)}
var ArticleCardvue_type_template_id_4ffc4abd_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/ArticleCard.vue?vue&type=template&id=4ffc4abd&scoped=true&

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/ArticleCard.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('ArticleCard', component.exports)
}
/* harmony default export */ var ArticleCardvue_type_script_lang_js_ = ({
  components: {
    BaseButton: BaseButton,
    BaseCard: BaseCard,
    BasePropChip: BasePropChip,
    BasePropDisplay: BasePropDisplay,
    BaseTitleDisplay: BaseTitleDisplay,
    ExternalContribution: ExternalContribution
  },
  mixins: [baseFilters],
  props: {
    item: Object,
    onTagClick: Function,
    preview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showAbstract: false
    }
  },
  computed: {
    article() {
      return this.item
    },
    abstractIcon() {
      return this.showAbstract ? 'mdi-chevron-down' : 'mdi-chevron-up'
    },
    cardHeight() {
      console.log(this.$refs)
      return this.$refs.card.$el.clientHeight
    }
  }
});

// CONCATENATED MODULE: ./src/ArticleCard.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_ArticleCardvue_type_script_lang_js_ = (ArticleCardvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/ArticleCard.vue?vue&type=style&index=0&id=4ffc4abd&scoped=true&lang=css&
var ArticleCardvue_type_style_index_0_id_4ffc4abd_scoped_true_lang_css_ = __webpack_require__("24ef");

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VCard/VCard.sass
var VCard = __webpack_require__("615b");

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VProgressLinear/VProgressLinear.sass
var VProgressLinear = __webpack_require__("6ece");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/transitions/expand-transition.js

/* harmony default export */ var expand_transition = (function (expandedParentClass = '', x = false) {
  const sizeProperty = x ? 'width' : 'height';
  const offsetProperty = `offset${upperFirst(sizeProperty)}`;
  return {
    beforeEnter(el) {
      el._parent = el.parentNode;
      el._initialStyle = {
        transition: el.style.transition,
        visibility: el.style.visibility,
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
    },

    enter(el) {
      const initialStyle = el._initialStyle;
      const offset = `${el[offsetProperty]}px`;
      el.style.setProperty('transition', 'none', 'important');
      el.style.visibility = 'hidden';
      el.style.visibility = initialStyle.visibility;
      el.style.overflow = 'hidden';
      el.style[sizeProperty] = '0';
      void el.offsetHeight; // force reflow

      el.style.transition = initialStyle.transition;

      if (expandedParentClass && el._parent) {
        el._parent.classList.add(expandedParentClass);
      }

      requestAnimationFrame(() => {
        el.style[sizeProperty] = offset;
      });
    },

    afterEnter: resetStyles,
    enterCancelled: resetStyles,

    leave(el) {
      el._initialStyle = {
        transition: '',
        visibility: '',
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
      el.style.overflow = 'hidden';
      el.style[sizeProperty] = `${el[offsetProperty]}px`;
      void el.offsetHeight; // force reflow

      requestAnimationFrame(() => el.style[sizeProperty] = '0');
    },

    afterLeave,
    leaveCancelled: afterLeave
  };

  function afterLeave(el) {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass);
    }

    resetStyles(el);
  }

  function resetStyles(el) {
    const size = el._initialStyle[sizeProperty];
    el.style.overflow = el._initialStyle.overflow;
    if (size != null) el.style[sizeProperty] = size;
    delete el._initialStyle;
  }
});
//# sourceMappingURL=expand-transition.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/transitions/index.js

 // Component specific transitions

const VCarouselTransition = createSimpleTransition('carousel-transition');
const VCarouselReverseTransition = createSimpleTransition('carousel-reverse-transition');
const VTabTransition = createSimpleTransition('tab-transition');
const VTabReverseTransition = createSimpleTransition('tab-reverse-transition');
const VMenuTransition = createSimpleTransition('menu-transition');
const VFabTransition = createSimpleTransition('fab-transition', 'center center', 'out-in'); // Generic transitions

const VDialogTransition = createSimpleTransition('dialog-transition');
const VDialogBottomTransition = createSimpleTransition('dialog-bottom-transition');
const VFadeTransition = createSimpleTransition('fade-transition');
const VScaleTransition = createSimpleTransition('scale-transition');
const VScrollXTransition = createSimpleTransition('scroll-x-transition');
const VScrollXReverseTransition = createSimpleTransition('scroll-x-reverse-transition');
const VScrollYTransition = createSimpleTransition('scroll-y-transition');
const VScrollYReverseTransition = createSimpleTransition('scroll-y-reverse-transition');
const VSlideXTransition = createSimpleTransition('slide-x-transition');
const VSlideXReverseTransition = createSimpleTransition('slide-x-reverse-transition');
const VSlideYTransition = createSimpleTransition('slide-y-transition');
const VSlideYReverseTransition = createSimpleTransition('slide-y-reverse-transition'); // JavaScript transitions

const VExpandTransition = createJavaScriptTransition('expand-transition', expand_transition());
const VExpandXTransition = createJavaScriptTransition('expand-x-transition', expand_transition('', true));
/* harmony default export */ var transitions = ({
  $_vuetify_subcomponents: {
    VCarouselTransition,
    VCarouselReverseTransition,
    VDialogTransition,
    VDialogBottomTransition,
    VFabTransition,
    VFadeTransition,
    VMenuTransition,
    VScaleTransition,
    VScrollXTransition,
    VScrollXReverseTransition,
    VScrollYTransition,
    VScrollYReverseTransition,
    VSlideXTransition,
    VSlideXReverseTransition,
    VSlideYTransition,
    VSlideYReverseTransition,
    VTabReverseTransition,
    VTabTransition,
    VExpandTransition,
    VExpandXTransition
  }
});
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/proxyable/index.js

function proxyable_factory(prop = 'value', event = 'change') {
  return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: 'proxyable',
    model: {
      prop,
      event
    },
    props: {
      [prop]: {
        required: false
      }
    },

    data() {
      return {
        internalLazyValue: this[prop]
      };
    },

    computed: {
      internalValue: {
        get() {
          return this.internalLazyValue;
        },

        set(val) {
          if (val === this.internalLazyValue) return;
          this.internalLazyValue = val;
          this.$emit(event, val);
        }

      }
    },
    watch: {
      [prop](val) {
        this.internalLazyValue = val;
      }

    }
  });
}
/* eslint-disable-next-line no-redeclare */

const Proxyable = proxyable_factory();
/* harmony default export */ var proxyable = (Proxyable);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VProgressLinear/VProgressLinear.js
 // Components

 // Mixins




 // Utilities



const VProgressLinear_baseMixins = mixins(colorable, positionable_factory(['absolute', 'fixed', 'top', 'bottom']), proxyable, themeable);
/* @vue/component */

/* harmony default export */ var VProgressLinear_VProgressLinear = (VProgressLinear_baseMixins.extend({
  name: 'v-progress-linear',
  props: {
    active: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: null
    },
    backgroundOpacity: {
      type: [Number, String],
      default: null
    },
    bufferValue: {
      type: [Number, String],
      default: 100
    },
    color: {
      type: String,
      default: 'primary'
    },
    height: {
      type: [Number, String],
      default: 4
    },
    indeterminate: Boolean,
    query: Boolean,
    rounded: Boolean,
    stream: Boolean,
    striped: Boolean,
    value: {
      type: [Number, String],
      default: 0
    }
  },

  data() {
    return {
      internalLazyValue: this.value || 0
    };
  },

  computed: {
    __cachedBackground() {
      return this.$createElement('div', this.setBackgroundColor(this.backgroundColor || this.color, {
        staticClass: 'v-progress-linear__background',
        style: this.backgroundStyle
      }));
    },

    __cachedBar() {
      return this.$createElement(this.computedTransition, [this.__cachedBarType]);
    },

    __cachedBarType() {
      return this.indeterminate ? this.__cachedIndeterminate : this.__cachedDeterminate;
    },

    __cachedBuffer() {
      return this.$createElement('div', {
        staticClass: 'v-progress-linear__buffer',
        style: this.styles
      });
    },

    __cachedDeterminate() {
      return this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: `v-progress-linear__determinate`,
        style: {
          width: convertToUnit(this.normalizedValue, '%')
        }
      }));
    },

    __cachedIndeterminate() {
      return this.$createElement('div', {
        staticClass: 'v-progress-linear__indeterminate',
        class: {
          'v-progress-linear__indeterminate--active': this.active
        }
      }, [this.genProgressBar('long'), this.genProgressBar('short')]);
    },

    __cachedStream() {
      if (!this.stream) return null;
      return this.$createElement('div', this.setTextColor(this.color, {
        staticClass: 'v-progress-linear__stream',
        style: {
          width: convertToUnit(100 - this.normalizedBuffer, '%')
        }
      }));
    },

    backgroundStyle() {
      const backgroundOpacity = this.backgroundOpacity == null ? this.backgroundColor ? 1 : 0.3 : parseFloat(this.backgroundOpacity);
      return {
        opacity: backgroundOpacity,
        left: convertToUnit(this.normalizedValue, '%'),
        width: convertToUnit(this.normalizedBuffer - this.normalizedValue, '%')
      };
    },

    classes() {
      return {
        'v-progress-linear--absolute': this.absolute,
        'v-progress-linear--fixed': this.fixed,
        'v-progress-linear--query': this.query,
        'v-progress-linear--reactive': this.reactive,
        'v-progress-linear--rounded': this.rounded,
        'v-progress-linear--striped': this.striped,
        ...this.themeClasses
      };
    },

    computedTransition() {
      return this.indeterminate ? VFadeTransition : VSlideXTransition;
    },

    normalizedBuffer() {
      return this.normalize(this.bufferValue);
    },

    normalizedValue() {
      return this.normalize(this.internalLazyValue);
    },

    reactive() {
      return Boolean(this.$listeners.change);
    },

    styles() {
      const styles = {};

      if (!this.active) {
        styles.height = 0;
      }

      if (!this.indeterminate && parseFloat(this.normalizedBuffer) !== 100) {
        styles.width = convertToUnit(this.normalizedBuffer, '%');
      }

      return styles;
    }

  },
  methods: {
    genContent() {
      const slot = getSlot(this, 'default', {
        value: this.internalLazyValue
      });
      if (!slot) return null;
      return this.$createElement('div', {
        staticClass: 'v-progress-linear__content'
      }, slot);
    },

    genListeners() {
      const listeners = this.$listeners;

      if (this.reactive) {
        listeners.click = this.onClick;
      }

      return listeners;
    },

    genProgressBar(name) {
      return this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: 'v-progress-linear__indeterminate',
        class: {
          [name]: true
        }
      }));
    },

    onClick(e) {
      if (!this.reactive) return;
      const {
        width
      } = this.$el.getBoundingClientRect();
      this.internalValue = e.offsetX / width * 100;
    },

    normalize(value) {
      if (value < 0) return 0;
      if (value > 100) return 100;
      return parseFloat(value);
    }

  },

  render(h) {
    const data = {
      staticClass: 'v-progress-linear',
      attrs: {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': this.normalizedBuffer,
        'aria-valuenow': this.indeterminate ? undefined : this.normalizedValue
      },
      class: this.classes,
      style: {
        bottom: this.bottom ? 0 : undefined,
        height: this.active ? convertToUnit(this.height) : 0,
        top: this.top ? 0 : undefined
      },
      on: this.genListeners()
    };
    return h('div', data, [this.__cachedStream, this.__cachedBackground, this.__cachedBuffer, this.__cachedBar, this.genContent()]);
  }

}));
//# sourceMappingURL=VProgressLinear.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VProgressLinear/index.js


/* harmony default export */ var components_VProgressLinear = (VProgressLinear_VProgressLinear);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/loadable/index.js


/**
 * Loadable
 *
 * @mixin
 *
 * Used to add linear progress bar to components
 * Can use a default bar with a specific color
 * or designate a custom progress linear bar
 */

/* @vue/component */

/* harmony default export */ var loadable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend().extend({
  name: 'loadable',
  props: {
    loading: {
      type: [Boolean, String],
      default: false
    },
    loaderHeight: {
      type: [Number, String],
      default: 2
    }
  },
  methods: {
    genProgress() {
      if (this.loading === false) return null;
      return this.$slots.progress || this.$createElement(components_VProgressLinear, {
        props: {
          absolute: true,
          color: this.loading === true || this.loading === '' ? this.color || 'primary' : this.loading,
          height: this.loaderHeight,
          indeterminate: true
        }
      });
    }

  }
}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
// Styles
 // Extensions

 // Mixins


 // Helpers


/* @vue/component */

/* harmony default export */ var VCard_VCard = (mixins(loadable, routable, components_VSheet).extend({
  name: 'v-card',
  props: {
    flat: Boolean,
    hover: Boolean,
    img: String,
    link: Boolean,
    loaderHeight: {
      type: [Number, String],
      default: 4
    },
    outlined: Boolean,
    raised: Boolean
  },
  computed: {
    classes() {
      return {
        'v-card': true,
        ...routable.options.computed.classes.call(this),
        'v-card--flat': this.flat,
        'v-card--hover': this.hover,
        'v-card--link': this.isClickable,
        'v-card--loading': this.loading,
        'v-card--disabled': this.loading || this.disabled,
        'v-card--outlined': this.outlined,
        'v-card--raised': this.raised,
        ...components_VSheet.options.computed.classes.call(this)
      };
    },

    styles() {
      const style = { ...components_VSheet.options.computed.styles.call(this)
      };

      if (this.img) {
        style.background = `url("${this.img}") center center / cover no-repeat`;
      }

      return style;
    }

  },
  methods: {
    genProgress() {
      const render = loadable.options.methods.genProgress.call(this);
      if (!render) return null;
      return this.$createElement('div', {
        staticClass: 'v-card__progress'
      }, [render]);
    }

  },

  render(h) {
    const {
      tag,
      data
    } = this.generateRouteLink();
    data.style = this.styles;

    if (this.isClickable) {
      data.attrs = data.attrs || {};
      data.attrs.tabindex = 0;
    }

    return h(tag, this.setBackgroundColor(this.color, data), [this.genProgress(), this.$slots.default]);
  }

}));
//# sourceMappingURL=VCard.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VCard/index.js


const VCardActions = createSimpleFunctional('v-card__actions');
const VCardText = createSimpleFunctional('v-card__text');
const VCardTitle = createSimpleFunctional('v-card__title');

/* harmony default export */ var components_VCard = ({
  $_vuetify_subcomponents: {
    VCard: VCard_VCard,
    VCardTitle,
    VCardActions,
    VCardText
  }
});
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./src/ArticleCard.vue






/* normalize component */

var ArticleCard_component = normalizeComponent(
  src_ArticleCardvue_type_script_lang_js_,
  ArticleCardvue_type_template_id_4ffc4abd_scoped_true_render,
  ArticleCardvue_type_template_id_4ffc4abd_scoped_true_staticRenderFns,
  false,
  null,
  "4ffc4abd",
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('ArticleCard', ArticleCard_component.exports)
}
/* harmony default export */ var ArticleCard = (ArticleCard_component.exports);

/* vuetify-loader */









installComponents_default()(ArticleCard_component, {VBtn: VBtn_VBtn,VCardText: VCardText,VCol: VCol,VIcon: components_VIcon_VIcon,VImg: VImg_VImg,VProgressCircular: VProgressCircular_VProgressCircular,VRow: VRow,VSlideYTransition: VSlideYTransition})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/ArticleView.vue?vue&type=template&id=ba66fb58&scoped=true&
var ArticleViewvue_type_template_id_ba66fb58_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mb-12"},[_c('v-img',{attrs:{"height":_vm.splashHeight,"src":_vm.article.splash},scopedSlots:_vm._u([{key:"placeholder",fn:function(){return [_c('v-row',{staticClass:"fill-height",attrs:{"align":"center","justify":"center"}},[_c('v-progress-circular',{attrs:{"indeterminate":""}})],1)]},proxy:true}])}),_c('v-row',[_c('v-col',{staticClass:"hidden-sm-and-down",attrs:{"md":"4","lg":"3"}},[_c('div',{staticClass:"article-toc",class:{ 'article-toc-sticky': _vm.isTOCSticky }},[(_vm.headings)?_c('ArticleTOC',{directives:[{name:"scroll",rawName:"v-scroll",value:(_vm.onScrollTOC),expression:"onScrollTOC"}],staticClass:"mb-12",attrs:{"headings":_vm.headings,"activeHeading":_vm.activeHeading}}):_vm._e(),(_vm.article.mainfile)?_c('v-btn',{staticClass:"article-download",attrs:{"block":"","outlined":""},on:{"click":function($event){return _vm.downloadHelper('main')}}},[[_vm._v(_vm._s(_vm.article.mainfiletype))],_c('v-icon',[_vm._v("mdi-download")])],2):_vm._e(),(_vm.article.extrafile)?_c('v-btn',{staticClass:"article-download",attrs:{"block":"","outlined":""},on:{"click":function($event){return _vm.downloadHelper('extra')}}},[[_vm._v(_vm._s('appendix'))],_c('v-icon',[_vm._v("mdi-download")])],2):_vm._e()],1)]),_c('v-col',{attrs:{"md":"8","lg":"9"}},[_c('v-row',{attrs:{"id":"article-view"}},[_c('v-col',{staticClass:"pt-6",attrs:{"cols":"12","sm":"10","lg":"9","offset-sm":"1","offset-md":"0"}},[_c('v-row',{attrs:{"align":"center","justify":"space-between"}},[_c('div',[_vm._l((_vm.article.categories),function(category,i){return _c('span',{key:category,staticClass:"font-lato uppercase"},[(i > 0)?[_vm._v(_vm._s(', '))]:_vm._e(),[_vm._v(_vm._s(category))]],2)}),(_vm.article.tags)?[_c('span',{staticClass:"mx-2"},[_vm._v("|")]),_vm._l((_vm.article.tags),function(tag){return _c('BasePropChip',{key:tag,on:{"chip-click":function($event){return _vm.$emit('tag-click', $event)}}},[[_vm._v(_vm._s(tag))]],2)})]:_vm._e()],2),_c('BaseButton',{attrs:{"label":"Back","to":_vm.preview ? '' : '/articles'}},[[_vm._v(_vm._s('back'))]],2)],1),(_vm.article.external)?_c('ExternalContribution'):_vm._e(),_c('h1',{staticClass:"article-title"},[_vm._v(_vm._s(_vm.article.title))]),_c('div',{staticClass:"article-abstract my-6"},[_vm._v(_vm._s(_vm.article.abstract))]),_c('div',{staticClass:"mb-4 uppercase font-oswald"},[_vm._l((_vm.article.authors),function(author,i){return _c('span',{key:i},[(i > 0)?[_vm._v(_vm._s(_vm.article.authors.length > i + 1 ? ', ' : ' and '))]:_vm._e(),_c('a',{on:{"click":function($event){return _vm.$emit('author-click', $event)}}},[_vm._v(_vm._s(author.title))])],2)}),(_vm.article.date)?_c('span',[_c('span',{staticClass:"mx-2"},[_vm._v("|")]),[_vm._v(_vm._s(_vm._f("formatDate")(_vm.article.date)))]],2):_vm._e(),_c('span',{staticClass:"mx-2"},[_vm._v("|")]),_c('v-icon',{attrs:{"id":"article-print"},on:{"click":_vm.printArticle}},[_vm._v("\n              mdi-printer\n            ")])],2),(_vm.hasAuthorInfo)?_c('BaseInfoBlock',{attrs:{"large":true},scopedSlots:_vm._u([{key:"title",fn:function(){return [_vm._v(_vm._s(("About the author" + (_vm.article.authors.length > 1 ? 's' : ''))))]},proxy:true},{key:"text",fn:function(){return _vm._l((_vm.article.authors),function(author,i){return _c('p',{key:("authorinfo" + i)},[[_vm._v(_vm._s(author.description))]],2)})},proxy:true}],null,false,827237455)}):_vm._e(),_c('v-divider'),_c('div',{directives:[{name:"scroll",rawName:"v-scroll",value:(_vm.onScroll),expression:"onScroll"}],staticClass:"article-body",domProps:{"innerHTML":_vm._s(_vm.articleBody.main)}}),_c('div',{staticClass:"my-12"},[(_vm.article.funding)?_c('BaseInfoBlock',{attrs:{"large":true},scopedSlots:_vm._u([{key:"title",fn:function(){return [_vm._v(_vm._s('Funding acknowledgment'))]},proxy:true},{key:"text",fn:function(){return [_vm._v(_vm._s(_vm.article.funding))]},proxy:true}],null,false,3678925913)}):_vm._e(),(_vm.article.citation)?_c('BaseInfoBlock',{attrs:{"large":true},scopedSlots:_vm._u([{key:"title",fn:function(){return [_vm._v(_vm._s('Suggested citation'))]},proxy:true},{key:"text",fn:function(){return [_c('span',{domProps:{"innerHTML":_vm._s(_vm.article.citation)}}),(_vm.article.doi)?_c('a',{attrs:{"href":_vm.article.doi,"target":"_blank","rel":"noreferrer"}},[[_vm._v(_vm._s((" " + (_vm.article.doi))))]],2):_vm._e()]},proxy:true}],null,false,4211647647)}):_vm._e(),(_vm.hasRelated)?_c('BaseInfoBlock',{attrs:{"large":true},scopedSlots:_vm._u([{key:"title",fn:function(){return [_vm._v(_vm._s('Related contents'))]},proxy:true},{key:"text",fn:function(){return [_c('ul',[_vm._l((_vm.article.apps),function(app,i){return _c('li',{key:("app" + i)},[_c('router-link',{attrs:{"to":_vm.preview ? '' : ("/apps/" + (app.slug))}},[[_vm._v(_vm._s(("[APP] " + (app.title))))]],2)],1)}),_vm._l((_vm.article.datasets),function(dataset,i){return _c('li',{key:("dataset" + i)},[_c('router-link',{attrs:{"to":_vm.preview ? '' : ("/datasets/" + (dataset.slug))}},[[_vm._v(_vm._s(("[DATASET] " + (dataset.title))))]],2)],1)})],2)]},proxy:true}],null,false,3285117611)}):_vm._e()],1),(_vm.articleBody.footer)?[_c('v-divider'),_c('div',{directives:[{name:"scroll",rawName:"v-scroll",value:(_vm.onScroll),expression:"onScroll"}],staticClass:"article-body",domProps:{"innerHTML":_vm._s(_vm.articleBody.footer)}})]:_vm._e()],2)],1)],1)],1)],1)}
var ArticleViewvue_type_template_id_ba66fb58_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/ArticleView.vue?vue&type=template&id=ba66fb58&scoped=true&

// EXTERNAL MODULE: ./node_modules/markdown-it-texmath/texmath.js
var texmath = __webpack_require__("5ea5");
var texmath_default = /*#__PURE__*/__webpack_require__.n(texmath);

// CONCATENATED MODULE: ./src/utils/markdownIt.js


const createMarkdownUtils = md => ({
  addImages(images, markdown) {
    return `${markdown}${images.map(i => `\n\n[${i.title}]: ${i.src}`)}`
  },
  parseHeadings(markdown) {
    return new DOMParser()
      .parseFromString(md.render(markdown), 'text/html')
      .querySelectorAll('h2')
  },
  renderMarkdown(markdown) {
    return md.render(markdown)
  }
})

const initMarkdownIt = () =>
  __webpack_require__("d4cd")(mdOpts)
    .use(__webpack_require__("1c78").default, mdAnchorOpts)
    .use(__webpack_require__("e6f9"))

const mdOpts = {
  html: true,
  linkify: true,
  typographer: true
}

const mdAnchorOpts = {
  level: 2,
  slugify: s =>
    String(s)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-_]/g, '')
}

// CONCATENATED MODULE: ./src/utils/katex.js


const initKatex = async () => {
  if (!document.head.querySelector('#katexCSS'))
    await loadFromCDN('link', {
      id: 'katexCSS',
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.css',
      integrity:
        'sha384-yFRtMMDnQtDRO8rLpMIKrtPCD5jdktao2TV19YiZYWMDkUR5GQZR/NOVTdquEx1j',
      crossorigin: 'anonymous'
    })

  if (!document.head.querySelector('#katexJS'))
    await loadFromCDN('script', {
      id: 'katexJS',
      src: 'https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.js',
      integrity:
        'sha384-9Nhn55MVVN0/4OFx7EE5kpFBPsEMZxKTCnA+4fqDmg12eCTqGi6+BB2LjY8brQxJ',
      crossorigin: 'anonymous'
    })
}

const loadFromCDN = (tagName, attrs) => {
  const el = document.createElement(tagName)
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]))
  document.head.appendChild(el)

  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => el.addEventListener('load', resolve))
}

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ArticleTOC.vue?vue&type=template&id=7c13fb44&scoped=true&
var ArticleTOCvue_type_template_id_7c13fb44_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"toc"}},[_c('h3',{staticClass:"uppercase font-oswald mb-2"},[_vm._v("Table of contents")]),_c('v-divider'),_c('v-list',[_vm._l((_vm.headings),function(heading){return [_c('router-link',{key:heading.id,attrs:{"to":("#" + (heading.id))}},[_c('div',{staticClass:"large font-lato toc-item py-2 pl-6",class:{ 'toc-item-active': heading.id === _vm.activeHeading }},[[_vm._v(_vm._s(heading.innerText))]],2)])]})],2)],1)}
var ArticleTOCvue_type_template_id_7c13fb44_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ArticleTOC.vue?vue&type=template&id=7c13fb44&scoped=true&

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ArticleTOC.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('ArticleTOC', component.exports)
}
/* harmony default export */ var ArticleTOCvue_type_script_lang_js_ = ({
  props: {
    headings: NodeList,
    activeHeading: String
  }
});

// CONCATENATED MODULE: ./src/components/ArticleTOC.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ArticleTOCvue_type_script_lang_js_ = (ArticleTOCvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ArticleTOC.vue?vue&type=style&index=0&id=7c13fb44&scoped=true&lang=css&
var ArticleTOCvue_type_style_index_0_id_7c13fb44_scoped_true_lang_css_ = __webpack_require__("3a9b");

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VList/VList.sass
var VList = __webpack_require__("3ad0");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VList/VList.js
// Styles
 // Components


/* @vue/component */

/* harmony default export */ var VList_VList = (VSheet_VSheet.extend().extend({
  name: 'v-list',

  provide() {
    return {
      isInList: true,
      list: this
    };
  },

  inject: {
    isInMenu: {
      default: false
    },
    isInNav: {
      default: false
    }
  },
  props: {
    dense: Boolean,
    disabled: Boolean,
    expand: Boolean,
    flat: Boolean,
    nav: Boolean,
    rounded: Boolean,
    shaped: Boolean,
    subheader: Boolean,
    threeLine: Boolean,
    tile: {
      type: Boolean,
      default: true
    },
    twoLine: Boolean
  },
  data: () => ({
    groups: []
  }),
  computed: {
    classes() {
      return { ...VSheet_VSheet.options.computed.classes.call(this),
        'v-list--dense': this.dense,
        'v-list--disabled': this.disabled,
        'v-list--flat': this.flat,
        'v-list--nav': this.nav,
        'v-list--rounded': this.rounded,
        'v-list--shaped': this.shaped,
        'v-list--subheader': this.subheader,
        'v-list--two-line': this.twoLine,
        'v-list--three-line': this.threeLine
      };
    }

  },
  methods: {
    register(content) {
      this.groups.push(content);
    },

    unregister(content) {
      const index = this.groups.findIndex(g => g._uid === content._uid);
      if (index > -1) this.groups.splice(index, 1);
    },

    listClick(uid) {
      if (this.expand) return;

      for (const group of this.groups) {
        group.toggle(uid);
      }
    }

  },

  render(h) {
    const data = {
      staticClass: 'v-list',
      class: this.classes,
      style: this.styles,
      attrs: {
        role: this.isInNav || this.isInMenu ? undefined : 'list',
        ...this.$attrs
      }
    };
    return h('div', this.setBackgroundColor(this.color, data), [this.$slots.default]);
  }

}));
//# sourceMappingURL=VList.js.map
// CONCATENATED MODULE: ./src/components/ArticleTOC.vue






/* normalize component */

var ArticleTOC_component = normalizeComponent(
  components_ArticleTOCvue_type_script_lang_js_,
  ArticleTOCvue_type_template_id_7c13fb44_scoped_true_render,
  ArticleTOCvue_type_template_id_7c13fb44_scoped_true_staticRenderFns,
  false,
  null,
  "7c13fb44",
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('ArticleTOC', ArticleTOC_component.exports)
}
/* harmony default export */ var ArticleTOC = (ArticleTOC_component.exports);

/* vuetify-loader */



installComponents_default()(ArticleTOC_component, {VDivider: VDivider_VDivider,VList: VList_VList})

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/ArticleView.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//












if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('ArticleView', component.exports)
}
/* harmony default export */ var ArticleViewvue_type_script_lang_js_ = ({
  components: {
    ArticleTOC: ArticleTOC,
    BaseButton: BaseButton,
    BaseInfoBlock: BaseInfoBlock,
    BasePropChip: BasePropChip,
    ExternalContribution: ExternalContribution
  },
  mixins: [baseFilters],
  props: {
    item: Object,
    downloader: Function,
    preview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeHeading: 'introduction',
      baseUrl: 'localhost:8080/',
      isTOCSticky: false,
      markdownUtils: {},
      viewTitleHeight: 60 + 80
    }
  },
  computed: {
    article() {
      return this.item
    },
    articleBody() {
      const { markdown, images } = this.item
      const { renderMarkdown, addImages } = this.markdownUtils
      const body =
        markdown && renderMarkdown && addImages
          ? renderMarkdown(images ? addImages(images, markdown) : markdown)
          : ''
      const [main, footer] = body.split('<hr class="footnotes-sep">')
      return { main, footer }
    },
    hasAuthorInfo() {
      const { authors } = this.item
      return authors.filter(el => el.description).length > 0
    },
    hasRelated() {
      const { apps, datasets } = this.item
      return (apps && apps.length) || (datasets && datasets.length)
    },
    headings() {
      const { markdown } = this.item
      const { parseHeadings } = this.markdownUtils
      return markdown && parseHeadings ? parseHeadings(markdown) : null
    },
    splashHeight() {
      const { xs, sm } = this.$vuetify.breakpoint

      if (xs) return 240
      else if (sm) return 360
      else return 480
    }
  },
  async created() {
    await initKatex()
    // eslint-disable-next-line no-undef
    const md = initMarkdownIt().use(texmath_default.a.use(katex))
    this.markdownUtils = createMarkdownUtils(md)
  },
  methods: {
    async downloadHelper(type) {
      await this.downloader(type)
    },
    onScroll(e) {
      if (typeof window === 'undefined') return

      const top = window.pageYOffset || e.target.scrollTop || 0
      const headings = this.headings

      if (top === 0) {
        this.activeHeading = headings[0].id
      } else if (headings) {
        headings.forEach(heading => {
          let elHeading = this.$el.querySelector(`#${heading.id}`)
          let rect = elHeading.getBoundingClientRect()
          if (rect.top < 91 && this.activeHeading !== heading.id) {
            this.activeHeading = heading.id
          }
        })
      }
    },
    onScrollTOC(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      const threshold = this.splashHeight + this.viewTitleHeight

      this.isTOCSticky = top > threshold
    },
    printArticle() {
      const content = document.getElementById('article-view').innerHTML
      const styleSelector = 'link[rel="stylesheet"], style'
      const style = [...document.querySelectorAll(styleSelector)]
        .map(el => el.outerHTML)
        .join('')

      this.printWindow({ head: style, body: content })
    },
    printWindow({ head, body }) {
      const win = window.open('', '')
      win.document.write(`<head>${head}</head><body>${body}</body>`)
      win.document.write('<script>window.print(); window.close()<' + '/script>')
      win.document.close()
      win.focus()
    }
  }
});

// CONCATENATED MODULE: ./src/ArticleView.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_ArticleViewvue_type_script_lang_js_ = (ArticleViewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/ArticleView.vue?vue&type=style&index=0&id=ba66fb58&scoped=true&lang=css&
var ArticleViewvue_type_style_index_0_id_ba66fb58_scoped_true_lang_css_ = __webpack_require__("9406");

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installDirectives.js
var installDirectives = __webpack_require__("269a");
var installDirectives_default = /*#__PURE__*/__webpack_require__.n(installDirectives);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/directives/scroll/index.js
function inserted(el, binding) {
  const callback = binding.value;
  const options = binding.options || {
    passive: true
  };
  const target = binding.arg ? document.querySelector(binding.arg) : window;
  if (!target) return;
  target.addEventListener('scroll', callback, options);
  el._onScroll = {
    callback,
    options,
    target
  };
}

function scroll_unbind(el) {
  if (!el._onScroll) return;
  const {
    callback,
    options,
    target
  } = el._onScroll;
  target.removeEventListener('scroll', callback, options);
  delete el._onScroll;
}

const Scroll = {
  inserted,
  unbind: scroll_unbind
};
/* harmony default export */ var directives_scroll = (Scroll);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./src/ArticleView.vue






/* normalize component */

var ArticleView_component = normalizeComponent(
  src_ArticleViewvue_type_script_lang_js_,
  ArticleViewvue_type_template_id_ba66fb58_scoped_true_render,
  ArticleViewvue_type_template_id_ba66fb58_scoped_true_staticRenderFns,
  false,
  null,
  "ba66fb58",
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('ArticleView', ArticleView_component.exports)
}
/* harmony default export */ var ArticleView = (ArticleView_component.exports);

/* vuetify-loader */








installComponents_default()(ArticleView_component, {VBtn: VBtn_VBtn,VCol: VCol,VDivider: VDivider_VDivider,VIcon: components_VIcon_VIcon,VImg: VImg_VImg,VProgressCircular: VProgressCircular_VProgressCircular,VRow: VRow})


/* vuetify-loader */


installDirectives_default()(ArticleView_component, {Scroll: directives_scroll})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/BaseToolbar.vue?vue&type=template&id=4c47c81b&scoped=true&
var BaseToolbarvue_type_template_id_4c47c81b_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-app-bar',{attrs:{"id":"toolbar","height":_vm.hpixel,"fixed":"","scroll-off-screen":""}},[_c('a',{staticClass:"hidden-xs-only",attrs:{"href":"http://www.icjia.state.il.us","target":"_blank","rel":"noreferrer"}},[_c('img',{attrs:{"src":_vm.logoSrc,"height":_vm.logoHpixel,"alt":"logo"}})]),_c('router-link',{attrs:{"to":"/"}},[_c('v-toolbar-title',[_c('span',{staticStyle:{"letter-spacing":"0.03em"}},[_vm._v("RESEARCH HUB")]),_vm._t("titleExtra")],2)],1),_c('v-spacer'),_c('v-toolbar-items',{staticClass:"hidden-sm-and-down"},[_vm._t("toolbarItems")],2),(_vm.menu)?_c('v-btn',{staticClass:"hidden-md-and-up",attrs:{"text":"","icon":""},on:{"click":function($event){_vm.drawer = !_vm.drawer}}},[_c('v-icon',[_vm._v("mdi-menu")])],1):_vm._e()],1),_c('div',{style:({ height: _vm.hpixel, backgroundColor: '#466c8c' })}),_c('v-navigation-drawer',{attrs:{"temporary":"","right":"","app":"","width":"175"},model:{value:(_vm.drawer),callback:function ($$v) {_vm.drawer=$$v},expression:"drawer"}},[_c('v-list',{staticClass:"slot"},[_vm._t("toolbarDrawerItems")],2)],1)],1)}
var BaseToolbarvue_type_template_id_4c47c81b_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/BaseToolbar.vue?vue&type=template&id=4c47c81b&scoped=true&

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/BaseToolbar.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('BaseToolbar', component.exports)
}
/* harmony default export */ var BaseToolbarvue_type_script_lang_js_ = ({
  props: {
    menu: Boolean,
    logoPath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      height: 60,
      drawer: null
    }
  },
  computed: {
    hpixel() {
      return `${this.height}px`
    },
    logoHpixel() {
      return `${this.height * 0.6}px`
    },
    logoSrc() {
      return this.logoPath ? this.logoPath : "https://raw.githubusercontent.com/ICJIA/icjia-public-website/master/_themes/icjia/img/logo-icjia-small-blue-3.png"
    }
  }
});

// CONCATENATED MODULE: ./src/BaseToolbar.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_BaseToolbarvue_type_script_lang_js_ = (BaseToolbarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/BaseToolbar.vue?vue&type=style&index=0&id=4c47c81b&scoped=true&lang=css&
var BaseToolbarvue_type_style_index_0_id_4c47c81b_scoped_true_lang_css_ = __webpack_require__("d3cc");

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VAppBar/VAppBar.sass
var VAppBar = __webpack_require__("8b0d");

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VToolbar/VToolbar.sass
var VToolbar = __webpack_require__("5e23");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VToolbar/VToolbar.js
// Styles
 // Extensions

 // Components

 // Utilities



/* @vue/component */

/* harmony default export */ var VToolbar_VToolbar = (VSheet_VSheet.extend({
  name: 'v-toolbar',
  props: {
    absolute: Boolean,
    bottom: Boolean,
    collapse: Boolean,
    dense: Boolean,
    extended: Boolean,
    extensionHeight: {
      default: 48,
      type: [Number, String]
    },
    flat: Boolean,
    floating: Boolean,
    prominent: Boolean,
    short: Boolean,
    src: {
      type: [String, Object],
      default: ''
    },
    tag: {
      type: String,
      default: 'header'
    },
    tile: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    isExtended: false
  }),
  computed: {
    computedHeight() {
      const height = this.computedContentHeight;
      if (!this.isExtended) return height;
      const extensionHeight = parseInt(this.extensionHeight);
      return this.isCollapsed ? height : height + (!isNaN(extensionHeight) ? extensionHeight : 0);
    },

    computedContentHeight() {
      if (this.height) return parseInt(this.height);
      if (this.isProminent && this.dense) return 96;
      if (this.isProminent && this.short) return 112;
      if (this.isProminent) return 128;
      if (this.dense) return 48;
      if (this.short || this.$vuetify.breakpoint.smAndDown) return 56;
      return 64;
    },

    classes() {
      return { ...VSheet_VSheet.options.computed.classes.call(this),
        'v-toolbar': true,
        'v-toolbar--absolute': this.absolute,
        'v-toolbar--bottom': this.bottom,
        'v-toolbar--collapse': this.collapse,
        'v-toolbar--collapsed': this.isCollapsed,
        'v-toolbar--dense': this.dense,
        'v-toolbar--extended': this.isExtended,
        'v-toolbar--flat': this.flat,
        'v-toolbar--floating': this.floating,
        'v-toolbar--prominent': this.isProminent
      };
    },

    isCollapsed() {
      return this.collapse;
    },

    isProminent() {
      return this.prominent;
    },

    styles() {
      return this.measurableStyles;
    }

  },

  created() {
    const breakingProps = [['app', '<v-app-bar app>'], ['manual-scroll', '<v-app-bar :value="false">'], ['clipped-left', '<v-app-bar clipped-left>'], ['clipped-right', '<v-app-bar clipped-right>'], ['inverted-scroll', '<v-app-bar inverted-scroll>'], ['scroll-off-screen', '<v-app-bar scroll-off-screen>'], ['scroll-target', '<v-app-bar scroll-target>'], ['scroll-threshold', '<v-app-bar scroll-threshold>'], ['card', '<v-app-bar flat>']];
    /* istanbul ignore next */

    breakingProps.forEach(([original, replacement]) => {
      if (this.$attrs.hasOwnProperty(original)) breaking(original, replacement, this);
    });
  },

  methods: {
    genBackground() {
      const props = {
        height: convertToUnit(this.computedHeight),
        src: this.src
      };
      const image = this.$scopedSlots.img ? this.$scopedSlots.img({
        props
      }) : this.$createElement(VImg_VImg, {
        props
      });
      return this.$createElement('div', {
        staticClass: 'v-toolbar__image'
      }, [image]);
    },

    genContent() {
      return this.$createElement('div', {
        staticClass: 'v-toolbar__content',
        style: {
          height: convertToUnit(this.computedContentHeight)
        }
      }, getSlot(this));
    },

    genExtension() {
      return this.$createElement('div', {
        staticClass: 'v-toolbar__extension',
        style: {
          height: convertToUnit(this.extensionHeight)
        }
      }, getSlot(this, 'extension'));
    }

  },

  render(h) {
    this.isExtended = this.extended || !!this.$scopedSlots.extension;
    const children = [this.genContent()];
    const data = this.setBackgroundColor(this.color, {
      class: this.classes,
      style: this.styles,
      on: this.$listeners
    });
    if (this.isExtended) children.push(this.genExtension());
    if (this.src || this.$scopedSlots.img) children.unshift(this.genBackground());
    return h(this.tag, data, children);
  }

}));
//# sourceMappingURL=VToolbar.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/applicationable/index.js
 // Util


function applicationable(value, events = []) {
  /* @vue/component */
  return mixins(positionable_factory(['absolute', 'fixed'])).extend({
    name: 'applicationable',
    props: {
      app: Boolean
    },
    computed: {
      applicationProperty() {
        return value;
      }

    },
    watch: {
      // If previous value was app
      // reset the provided prop
      app(x, prev) {
        prev ? this.removeApplication(true) : this.callUpdate();
      },

      applicationProperty(newVal, oldVal) {
        this.$vuetify.application.unregister(this._uid, oldVal);
      }

    },

    activated() {
      this.callUpdate();
    },

    created() {
      for (let i = 0, length = events.length; i < length; i++) {
        this.$watch(events[i], this.callUpdate);
      }

      this.callUpdate();
    },

    mounted() {
      this.callUpdate();
    },

    deactivated() {
      this.removeApplication();
    },

    destroyed() {
      this.removeApplication();
    },

    methods: {
      callUpdate() {
        if (!this.app) return;
        this.$vuetify.application.register(this._uid, this.applicationProperty, this.updateApplication());
      },

      removeApplication(force = false) {
        if (!force && !this.app) return;
        this.$vuetify.application.unregister(this._uid, this.applicationProperty);
      },

      updateApplication: () => 0
    }
  });
}
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/scrollable/index.js
// Directives
 // Utilities

 // Types


/**
 * Scrollable
 *
 * Used for monitoring scrolling and
 * invoking functions based upon
 * scrolling thresholds being
 * met.
 */

/* @vue/component */

/* harmony default export */ var scrollable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
  name: 'scrollable',
  directives: {
    Scroll: directives_scroll
  },
  props: {
    scrollTarget: String,
    scrollThreshold: [String, Number]
  },
  data: () => ({
    currentScroll: 0,
    currentThreshold: 0,
    isActive: false,
    isScrollingUp: false,
    previousScroll: 0,
    savedScroll: 0,
    target: null
  }),
  computed: {
    /**
     * A computed property that returns
     * whether scrolling features are
     * enabled or disabled
     */
    canScroll() {
      return typeof window !== 'undefined';
    },

    /**
     * The threshold that must be met before
     * thresholdMet function is invoked
     */
    computedScrollThreshold() {
      return this.scrollThreshold ? Number(this.scrollThreshold) : 300;
    }

  },
  watch: {
    isScrollingUp() {
      this.savedScroll = this.savedScroll || this.currentScroll;
    },

    isActive() {
      this.savedScroll = 0;
    }

  },

  mounted() {
    if (this.scrollTarget) {
      this.target = document.querySelector(this.scrollTarget);

      if (!this.target) {
        consoleWarn(`Unable to locate element with identifier ${this.scrollTarget}`, this);
      }
    }
  },

  methods: {
    onScroll() {
      if (!this.canScroll) return;
      this.previousScroll = this.currentScroll;
      this.currentScroll = this.target ? this.target.scrollTop : window.pageYOffset;
      this.isScrollingUp = this.currentScroll < this.previousScroll;
      this.currentThreshold = Math.abs(this.currentScroll - this.computedScrollThreshold);
      this.$nextTick(() => {
        if (Math.abs(this.currentScroll - this.savedScroll) > this.computedScrollThreshold) this.thresholdMet();
      });
    },

    /**
     * The method invoked when
     * scrolling in any direction
     * has exceeded the threshold
     */
    thresholdMet() {}

  }
}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/ssr-bootable/index.js

/**
 * SSRBootable
 *
 * @mixin
 *
 * Used in layout components (drawer, toolbar, content)
 * to avoid an entry animation when using SSR
 */

/* harmony default export */ var ssr_bootable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
  name: 'ssr-bootable',
  data: () => ({
    isBooted: false
  }),

  mounted() {
    // Use setAttribute instead of dataset
    // because dataset does not work well
    // with unit tests
    window.requestAnimationFrame(() => {
      this.$el.setAttribute('data-booted', 'true');
      this.isBooted = true;
    });
  }

}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VAppBar/VAppBar.js
// Styles
 // Extensions

 // Directives

 // Mixins




 // Utilities



const VAppBar_baseMixins = mixins(VToolbar_VToolbar, scrollable, ssr_bootable, toggleable, applicationable('top', ['clippedLeft', 'clippedRight', 'computedHeight', 'computedTransform', 'invertedScroll', 'isExtended', 'isProminent', 'value']));
/* @vue/component */

/* harmony default export */ var VAppBar_VAppBar = (VAppBar_baseMixins.extend({
  name: 'v-app-bar',
  directives: {
    Scroll: directives_scroll
  },
  props: {
    clippedLeft: Boolean,
    clippedRight: Boolean,
    collapseOnScroll: Boolean,
    elevateOnScroll: Boolean,
    fadeImgOnScroll: Boolean,
    hideOnScroll: Boolean,
    invertedScroll: Boolean,
    scrollOffScreen: Boolean,
    shrinkOnScroll: Boolean,
    value: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      isActive: this.value
    };
  },

  computed: {
    applicationProperty() {
      return !this.bottom ? 'top' : 'bottom';
    },

    canScroll() {
      return scrollable.options.computed.canScroll.call(this) && (this.invertedScroll || this.elevateOnScroll || this.hideOnScroll || this.collapseOnScroll || this.isBooted || // If falsey, user has provided an
      // explicit value which should
      // overwrite anything we do
      !this.value);
    },

    classes() {
      return { ...VToolbar_VToolbar.options.computed.classes.call(this),
        'v-toolbar--collapse': this.collapse || this.collapseOnScroll,
        'v-app-bar': true,
        'v-app-bar--clipped': this.clippedLeft || this.clippedRight,
        'v-app-bar--fade-img-on-scroll': this.fadeImgOnScroll,
        'v-app-bar--elevate-on-scroll': this.elevateOnScroll,
        'v-app-bar--fixed': !this.absolute && (this.app || this.fixed),
        'v-app-bar--hide-shadow': this.hideShadow,
        'v-app-bar--is-scrolled': this.currentScroll > 0,
        'v-app-bar--shrink-on-scroll': this.shrinkOnScroll
      };
    },

    computedContentHeight() {
      if (!this.shrinkOnScroll) return VToolbar_VToolbar.options.computed.computedContentHeight.call(this);
      const height = this.computedOriginalHeight;
      const min = this.dense ? 48 : 56;
      const max = height;
      const difference = max - min;
      const iteration = difference / this.computedScrollThreshold;
      const offset = this.currentScroll * iteration;
      return Math.max(min, max - offset);
    },

    computedFontSize() {
      if (!this.isProminent) return undefined;
      const max = this.dense ? 96 : 128;
      const difference = max - this.computedContentHeight;
      const increment = 0.00347; // 1.5rem to a minimum of 1.25rem

      return Number((1.50 - difference * increment).toFixed(2));
    },

    computedLeft() {
      if (!this.app || this.clippedLeft) return 0;
      return this.$vuetify.application.left;
    },

    computedMarginTop() {
      if (!this.app) return 0;
      return this.$vuetify.application.bar;
    },

    computedOpacity() {
      if (!this.fadeImgOnScroll) return undefined;
      const opacity = Math.max((this.computedScrollThreshold - this.currentScroll) / this.computedScrollThreshold, 0);
      return Number(parseFloat(opacity).toFixed(2));
    },

    computedOriginalHeight() {
      let height = VToolbar_VToolbar.options.computed.computedContentHeight.call(this);
      if (this.isExtended) height += parseInt(this.extensionHeight);
      return height;
    },

    computedRight() {
      if (!this.app || this.clippedRight) return 0;
      return this.$vuetify.application.right;
    },

    computedScrollThreshold() {
      if (this.scrollThreshold) return Number(this.scrollThreshold);
      return this.computedOriginalHeight - (this.dense ? 48 : 56);
    },

    computedTransform() {
      if (!this.canScroll || this.elevateOnScroll && this.currentScroll === 0) return 0;
      if (this.isActive) return 0;
      return this.scrollOffScreen ? -this.computedHeight : -this.computedContentHeight;
    },

    hideShadow() {
      if (this.elevateOnScroll) {
        return this.currentScroll === 0 || this.computedTransform < 0;
      }

      return (!this.isExtended || this.scrollOffScreen) && this.computedTransform !== 0;
    },

    isCollapsed() {
      if (!this.collapseOnScroll) {
        return VToolbar_VToolbar.options.computed.isCollapsed.call(this);
      }

      return this.currentScroll > 0;
    },

    isProminent() {
      return VToolbar_VToolbar.options.computed.isProminent.call(this) || this.shrinkOnScroll;
    },

    styles() {
      return { ...VToolbar_VToolbar.options.computed.styles.call(this),
        fontSize: convertToUnit(this.computedFontSize, 'rem'),
        marginTop: convertToUnit(this.computedMarginTop),
        transform: `translateY(${convertToUnit(this.computedTransform)})`,
        left: convertToUnit(this.computedLeft),
        right: convertToUnit(this.computedRight)
      };
    }

  },
  watch: {
    canScroll: 'onScroll',

    invertedScroll(val) {
      this.isActive = !val;
    }

  },

  created() {
    if (this.invertedScroll) this.isActive = false;
  },

  methods: {
    genBackground() {
      const render = VToolbar_VToolbar.options.methods.genBackground.call(this);
      render.data = this._b(render.data || {}, render.tag, {
        style: {
          opacity: this.computedOpacity
        }
      });
      return render;
    },

    updateApplication() {
      return this.invertedScroll ? 0 : this.computedHeight + this.computedTransform;
    },

    thresholdMet() {
      if (this.invertedScroll) {
        this.isActive = this.currentScroll > this.computedScrollThreshold;
        return;
      }

      if (this.currentThreshold < this.computedScrollThreshold) return;

      if (this.hideOnScroll) {
        this.isActive = this.isScrollingUp;
      }

      this.savedScroll = this.currentScroll;
    }

  },

  render(h) {
    const render = VToolbar_VToolbar.options.render.call(this, h);
    render.data = render.data || {};

    if (this.canScroll) {
      render.data.directives = render.data.directives || [];
      render.data.directives.push({
        arg: this.scrollTarget,
        name: 'scroll',
        value: this.onScroll
      });
    }

    return render;
  }

}));
//# sourceMappingURL=VAppBar.js.map
// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VNavigationDrawer/VNavigationDrawer.sass
var VNavigationDrawer = __webpack_require__("7958");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/dependent/index.js


function searchChildren(children) {
  const results = [];

  for (let index = 0; index < children.length; index++) {
    const child = children[index];

    if (child.isActive && child.isDependent) {
      results.push(child);
    } else {
      results.push(...searchChildren(child.$children));
    }
  }

  return results;
}
/* @vue/component */


/* harmony default export */ var dependent = (mixins().extend({
  name: 'dependent',

  data() {
    return {
      closeDependents: true,
      isActive: false,
      isDependent: true
    };
  },

  watch: {
    isActive(val) {
      if (val) return;
      const openDependents = this.getOpenDependents();

      for (let index = 0; index < openDependents.length; index++) {
        openDependents[index].isActive = false;
      }
    }

  },
  methods: {
    getOpenDependents() {
      if (this.closeDependents) return searchChildren(this.$children);
      return [];
    },

    getOpenDependentElements() {
      const result = [];
      const openDependents = this.getOpenDependents();

      for (let index = 0; index < openDependents.length; index++) {
        result.push(...openDependents[index].getClickableDependentElements());
      }

      return result;
    },

    getClickableDependentElements() {
      const result = [this.$el];
      if (this.$refs.content) result.push(this.$refs.content);
      if (this.overlay) result.push(this.overlay.$el);
      result.push(...this.getOpenDependentElements());
      return result;
    }

  }
}));
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VOverlay/VOverlay.sass
var VOverlay = __webpack_require__("3c93");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VOverlay/VOverlay.js
// Styles
 // Mixins



 // Utilities


/* @vue/component */

/* harmony default export */ var VOverlay_VOverlay = (mixins(colorable, themeable, toggleable).extend({
  name: 'v-overlay',
  props: {
    absolute: Boolean,
    color: {
      type: String,
      default: '#212121'
    },
    dark: {
      type: Boolean,
      default: true
    },
    opacity: {
      type: [Number, String],
      default: 0.46
    },
    value: {
      default: true
    },
    zIndex: {
      type: [Number, String],
      default: 5
    }
  },
  computed: {
    __scrim() {
      const data = this.setBackgroundColor(this.color, {
        staticClass: 'v-overlay__scrim',
        style: {
          opacity: this.computedOpacity
        }
      });
      return this.$createElement('div', data);
    },

    classes() {
      return {
        'v-overlay--absolute': this.absolute,
        'v-overlay--active': this.isActive,
        ...this.themeClasses
      };
    },

    computedOpacity() {
      return Number(this.isActive ? this.opacity : 0);
    },

    styles() {
      return {
        zIndex: this.zIndex
      };
    }

  },
  methods: {
    genContent() {
      return this.$createElement('div', {
        staticClass: 'v-overlay__content'
      }, this.$slots.default);
    }

  },

  render(h) {
    const children = [this.__scrim];
    if (this.isActive) children.push(this.genContent());
    return h('div', {
      staticClass: 'v-overlay',
      class: this.classes,
      style: this.styles
    }, children);
  }

}));
//# sourceMappingURL=VOverlay.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VOverlay/index.js


/* harmony default export */ var components_VOverlay = (VOverlay_VOverlay);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/overlayable/index.js
// Components
 // Utilities

 // Types


/* @vue/component */

/* harmony default export */ var overlayable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend().extend({
  name: 'overlayable',
  props: {
    hideOverlay: Boolean
  },

  data() {
    return {
      overlay: null
    };
  },

  watch: {
    hideOverlay(value) {
      if (value) this.removeOverlay();else this.genOverlay();
    }

  },

  beforeDestroy() {
    this.removeOverlay();
  },

  methods: {
    createOverlay() {
      const overlay = new components_VOverlay({
        propsData: {
          absolute: this.absolute,
          value: false
        }
      });
      overlay.$mount();
      const parent = this.absolute ? this.$el.parentNode : document.querySelector('[data-app]');
      parent && parent.insertBefore(overlay.$el, parent.firstChild);
      this.overlay = overlay;
    },

    genOverlay() {
      this.hideScroll();
      if (this.hideOverlay) return;
      if (!this.overlay) this.createOverlay();
      requestAnimationFrame(() => {
        if (!this.overlay) return;

        if (this.activeZIndex !== undefined) {
          this.overlay.zIndex = String(this.activeZIndex - 1);
        }

        this.overlay.value = true;
      });
      return true;
    },

    /** removeOverlay(false) will not restore the scollbar afterwards */
    removeOverlay(showScroll = true) {
      if (this.overlay) {
        addOnceEventListener(this.overlay.$el, 'transitionend', () => {
          if (!this.overlay || !this.overlay.$el || !this.overlay.$el.parentNode || this.overlay.value) return;
          this.overlay.$el.parentNode.removeChild(this.overlay.$el);
          this.overlay.$destroy();
          this.overlay = null;
        });
        this.overlay.value = false;
      }

      showScroll && this.showScroll();
    },

    scrollListener(e) {
      if (e.type === 'keydown') {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || // https://github.com/vuetifyjs/vuetify/issues/4715
        e.target.isContentEditable) return;
        const up = [keyCodes.up, keyCodes.pageup];
        const down = [keyCodes.down, keyCodes.pagedown];

        if (up.includes(e.keyCode)) {
          e.deltaY = -1;
        } else if (down.includes(e.keyCode)) {
          e.deltaY = 1;
        } else {
          return;
        }
      }

      if (e.target === this.overlay || e.type !== 'keydown' && e.target === document.body || this.checkPath(e)) e.preventDefault();
    },

    hasScrollbar(el) {
      if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
      const style = window.getComputedStyle(el);
      return ['auto', 'scroll'].includes(style.overflowY) && el.scrollHeight > el.clientHeight;
    },

    shouldScroll(el, delta) {
      if (el.scrollTop === 0 && delta < 0) return true;
      return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0;
    },

    isInside(el, parent) {
      if (el === parent) {
        return true;
      } else if (el === null || el === document.body) {
        return false;
      } else {
        return this.isInside(el.parentNode, parent);
      }
    },

    checkPath(e) {
      const path = e.path || this.composedPath(e);
      const delta = e.deltaY;

      if (e.type === 'keydown' && path[0] === document.body) {
        const dialog = this.$refs.dialog; // getSelection returns null in firefox in some edge cases, can be ignored

        const selected = window.getSelection().anchorNode;

        if (dialog && this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
          return this.shouldScroll(dialog, delta);
        }

        return true;
      }

      for (let index = 0; index < path.length; index++) {
        const el = path[index];
        if (el === document) return true;
        if (el === document.documentElement) return true;
        if (el === this.$refs.content) return true;
        if (this.hasScrollbar(el)) return this.shouldScroll(el, delta);
      }

      return true;
    },

    /**
     * Polyfill for Event.prototype.composedPath
     */
    composedPath(e) {
      if (e.composedPath) return e.composedPath();
      const path = [];
      let el = e.target;

      while (el) {
        path.push(el);

        if (el.tagName === 'HTML') {
          path.push(document);
          path.push(window);
          return path;
        }

        el = el.parentElement;
      }

      return path;
    },

    hideScroll() {
      if (this.$vuetify.breakpoint.smAndDown) {
        document.documentElement.classList.add('overflow-y-hidden');
      } else {
        addPassiveEventListener(window, 'wheel', this.scrollListener, {
          passive: false
        });
        window.addEventListener('keydown', this.scrollListener);
      }
    },

    showScroll() {
      document.documentElement.classList.remove('overflow-y-hidden');
      window.removeEventListener('wheel', this.scrollListener);
      window.removeEventListener('keydown', this.scrollListener);
    }

  }
}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/directives/click-outside/index.js
function closeConditional() {
  return false;
}

function click_outside_directive(e, el, binding) {
  // Args may not always be supplied
  binding.args = binding.args || {}; // If no closeConditional was supplied assign a default

  const isActive = binding.args.closeConditional || closeConditional; // The include element callbacks below can be expensive
  // so we should avoid calling them when we're not active.
  // Explicitly check for false to allow fallback compatibility
  // with non-toggleable components

  if (!e || isActive(e) === false) return; // If click was triggered programmaticaly (domEl.click()) then
  // it shouldn't be treated as click-outside
  // Chrome/Firefox support isTrusted property
  // IE/Edge support pointerType property (empty if not triggered
  // by pointing device)

  if ('isTrusted' in e && !e.isTrusted || 'pointerType' in e && !e.pointerType) return; // Check if additional elements were passed to be included in check
  // (click must be outside all included elements, if any)

  const elements = (binding.args.include || (() => []))(); // Add the root element for the component this directive was defined on


  elements.push(el); // Check if it's a click outside our elements, and then if our callback returns true.
  // Non-toggleable components should take action in their callback and return falsy.
  // Toggleable can return true if it wants to deactivate.
  // Note that, because we're in the capture phase, this callback will occur before
  // the bubbling click event on any outside elements.

  !elements.some(el => el.contains(e.target)) && setTimeout(() => {
    isActive(e) && binding.value && binding.value(e);
  }, 0);
}

const ClickOutside = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  inserted(el, binding) {
    const onClick = e => click_outside_directive(e, el, binding); // iOS does not recognize click events on document
    // or body, this is the entire purpose of the v-app
    // component and [data-app], stop removing this


    const app = document.querySelector('[data-app]') || document.body; // This is only for unit tests

    app.addEventListener('click', onClick, true);
    el._clickOutside = onClick;
  },

  unbind(el) {
    if (!el._clickOutside) return;
    const app = document.querySelector('[data-app]') || document.body; // This is only for unit tests

    app && app.removeEventListener('click', el._clickOutside, true);
    delete el._clickOutside;
  }

};
/* harmony default export */ var click_outside = (ClickOutside);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/directives/resize/index.js
function resize_inserted(el, binding) {
  const callback = binding.value;
  const options = binding.options || {
    passive: true
  };
  window.addEventListener('resize', callback, options);
  el._onResize = {
    callback,
    options
  };

  if (!binding.modifiers || !binding.modifiers.quiet) {
    callback();
  }
}

function resize_unbind(el) {
  if (!el._onResize) return;
  const {
    callback,
    options
  } = el._onResize;
  window.removeEventListener('resize', callback, options);
  delete el._onResize;
}

const Resize = {
  inserted: resize_inserted,
  unbind: resize_unbind
};
/* harmony default export */ var resize = (Resize);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/directives/touch/index.js


const handleGesture = wrapper => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;

  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }

  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};

function touchstart(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  wrapper.start && wrapper.start(Object.assign(event, wrapper));
}

function touchend(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  wrapper.end && wrapper.end(Object.assign(event, wrapper));
  handleGesture(wrapper);
}

function touchmove(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  wrapper.move && wrapper.move(Object.assign(event, wrapper));
}

function createHandlers(value) {
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: e => touchstart(e, wrapper),
    touchend: e => touchend(e, wrapper),
    touchmove: e => touchmove(e, wrapper)
  };
}

function touch_inserted(el, binding, vnode) {
  const value = binding.value;
  const target = value.parent ? el.parentElement : el;
  const options = value.options || {
    passive: true
  }; // Needed to pass unit tests

  if (!target) return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = Object(target._touchHandlers);
  target._touchHandlers[vnode.context._uid] = handlers;
  keys(handlers).forEach(eventName => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}

function touch_unbind(el, binding, vnode) {
  const target = binding.value.parent ? el.parentElement : el;
  if (!target || !target._touchHandlers) return;
  const handlers = target._touchHandlers[vnode.context._uid];
  keys(handlers).forEach(eventName => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[vnode.context._uid];
}

const Touch = {
  inserted: touch_inserted,
  unbind: touch_unbind
};
/* harmony default export */ var touch = (Touch);
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VNavigationDrawer/VNavigationDrawer.js
// Styles
 // Components

 // Mixins






 // Directives



 // Utilities



const VNavigationDrawer_baseMixins = mixins(applicationable('left', ['isActive', 'isMobile', 'miniVariant', 'expandOnHover', 'permanent', 'right', 'temporary', 'width']), colorable, dependent, overlayable, ssr_bootable, themeable);
/* @vue/component */

/* harmony default export */ var VNavigationDrawer_VNavigationDrawer = (VNavigationDrawer_baseMixins.extend({
  name: 'v-navigation-drawer',

  provide() {
    return {
      isInNav: this.tag === 'nav'
    };
  },

  directives: {
    ClickOutside: click_outside,
    Resize: resize,
    Touch: touch
  },
  props: {
    bottom: Boolean,
    clipped: Boolean,
    disableResizeWatcher: Boolean,
    disableRouteWatcher: Boolean,
    expandOnHover: Boolean,
    floating: Boolean,
    height: {
      type: [Number, String],

      default() {
        return this.app ? '100vh' : '100%';
      }

    },
    miniVariant: Boolean,
    miniVariantWidth: {
      type: [Number, String],
      default: 80
    },
    mobileBreakPoint: {
      type: [Number, String],
      default: 1264
    },
    permanent: Boolean,
    right: Boolean,
    src: {
      type: [String, Object],
      default: ''
    },
    stateless: Boolean,
    tag: {
      type: String,

      default() {
        return this.app ? 'nav' : 'aside';
      }

    },
    temporary: Boolean,
    touchless: Boolean,
    width: {
      type: [Number, String],
      default: 256
    },
    value: {
      required: false
    }
  },
  data: () => ({
    isMouseover: false,
    touchArea: {
      left: 0,
      right: 0
    },
    stackMinZIndex: 6
  }),
  computed: {
    /**
     * Used for setting an app value from a dynamic
     * property. Called from applicationable.js
     */
    applicationProperty() {
      return this.right ? 'right' : 'left';
    },

    classes() {
      return {
        'v-navigation-drawer': true,
        'v-navigation-drawer--absolute': this.absolute,
        'v-navigation-drawer--bottom': this.bottom,
        'v-navigation-drawer--clipped': this.clipped,
        'v-navigation-drawer--close': !this.isActive,
        'v-navigation-drawer--fixed': !this.absolute && (this.app || this.fixed),
        'v-navigation-drawer--floating': this.floating,
        'v-navigation-drawer--is-mobile': this.isMobile,
        'v-navigation-drawer--is-mouseover': this.isMouseover,
        'v-navigation-drawer--mini-variant': this.miniVariant || this.expandOnHover && !this.isMouseover,
        'v-navigation-drawer--open': this.isActive,
        'v-navigation-drawer--open-on-hover': this.expandOnHover,
        'v-navigation-drawer--right': this.right,
        'v-navigation-drawer--temporary': this.temporary,
        ...this.themeClasses
      };
    },

    computedMaxHeight() {
      if (!this.hasApp) return null;
      const computedMaxHeight = this.$vuetify.application.bottom + this.$vuetify.application.footer + this.$vuetify.application.bar;
      if (!this.clipped) return computedMaxHeight;
      return computedMaxHeight + this.$vuetify.application.top;
    },

    computedTop() {
      if (!this.hasApp) return 0;
      let computedTop = this.$vuetify.application.bar;
      computedTop += this.clipped ? this.$vuetify.application.top : 0;
      return computedTop;
    },

    computedTransform() {
      if (this.isActive) return 0;
      if (this.isBottom) return 100;
      return this.right ? 100 : -100;
    },

    computedWidth() {
      if (this.expandOnHover && !this.isMouseover || this.miniVariant) return this.miniVariantWidth;
      return this.width;
    },

    hasApp() {
      return this.app && !this.isMobile && !this.temporary;
    },

    isBottom() {
      return this.bottom && this.isMobile;
    },

    isMobile() {
      return !this.stateless && !this.permanent && this.$vuetify.breakpoint.width < parseInt(this.mobileBreakPoint, 10);
    },

    reactsToClick() {
      return !this.stateless && !this.permanent && (this.isMobile || this.temporary);
    },

    reactsToMobile() {
      return this.app && !this.disableResizeWatcher && !this.permanent && !this.stateless && !this.temporary;
    },

    reactsToResize() {
      return !this.disableResizeWatcher && !this.stateless;
    },

    reactsToRoute() {
      return !this.disableRouteWatcher && !this.stateless && (this.temporary || this.isMobile);
    },

    showOverlay() {
      return this.isActive && (this.isMobile || this.temporary);
    },

    styles() {
      const translate = this.isBottom ? 'translateY' : 'translateX';
      const styles = {
        height: convertToUnit(this.height),
        top: !this.isBottom ? convertToUnit(this.computedTop) : 'auto',
        maxHeight: this.computedMaxHeight != null ? `calc(100% - ${convertToUnit(this.computedMaxHeight)})` : undefined,
        transform: `${translate}(${convertToUnit(this.computedTransform, '%')})`,
        width: convertToUnit(this.computedWidth)
      };
      return styles;
    }

  },
  watch: {
    $route: 'onRouteChange',

    isActive(val) {
      this.$emit('input', val);
    },

    /**
     * When mobile changes, adjust the active state
     * only when there has been a previous value
     */
    isMobile(val, prev) {
      !val && this.isActive && !this.temporary && this.removeOverlay();
      if (prev == null || !this.reactsToResize || !this.reactsToMobile) return;
      this.isActive = !val;
    },

    permanent(val) {
      // If enabling prop enable the drawer
      if (val) this.isActive = true;
    },

    showOverlay(val) {
      if (val) this.genOverlay();else this.removeOverlay();
    },

    value(val) {
      if (this.permanent) return;

      if (val == null) {
        this.init();
        return;
      }

      if (val !== this.isActive) this.isActive = val;
    }

  },

  beforeMount() {
    this.init();
  },

  methods: {
    calculateTouchArea() {
      const parent = this.$el.parentNode;
      if (!parent) return;
      const parentRect = parent.getBoundingClientRect();
      this.touchArea = {
        left: parentRect.left + 50,
        right: parentRect.right - 50
      };
    },

    closeConditional() {
      return this.isActive && this.reactsToClick;
    },

    genAppend() {
      return this.genPosition('append');
    },

    genBackground() {
      const props = {
        height: '100%',
        width: '100%',
        src: this.src
      };
      const image = this.$scopedSlots.img ? this.$scopedSlots.img(props) : this.$createElement(VImg_VImg, {
        props
      });
      return this.$createElement('div', {
        staticClass: 'v-navigation-drawer__image'
      }, [image]);
    },

    genDirectives() {
      const directives = [{
        name: 'click-outside',
        value: () => this.isActive = false,
        args: {
          closeConditional: this.closeConditional,
          include: this.getOpenDependentElements
        }
      }];

      if (!this.touchless && !this.stateless) {
        directives.push({
          name: 'touch',
          value: {
            parent: true,
            left: this.swipeLeft,
            right: this.swipeRight
          }
        });
      }

      return directives;
    },

    genListeners() {
      const on = {
        transitionend: e => {
          if (e.target !== e.currentTarget) return;
          this.$emit('transitionend', e); // IE11 does not support new Event('resize')

          const resizeEvent = document.createEvent('UIEvents');
          resizeEvent.initUIEvent('resize', true, false, window, 0);
          window.dispatchEvent(resizeEvent);
        }
      };

      if (this.miniVariant) {
        on.click = () => this.$emit('update:mini-variant', false);
      }

      if (this.expandOnHover) {
        on.mouseenter = () => this.isMouseover = true;

        on.mouseleave = () => this.isMouseover = false;
      }

      return on;
    },

    genPosition(name) {
      const slot = getSlot(this, name);
      if (!slot) return slot;
      return this.$createElement('div', {
        staticClass: `v-navigation-drawer__${name}`
      }, slot);
    },

    genPrepend() {
      return this.genPosition('prepend');
    },

    genContent() {
      return this.$createElement('div', {
        staticClass: 'v-navigation-drawer__content'
      }, this.$slots.default);
    },

    genBorder() {
      return this.$createElement('div', {
        staticClass: 'v-navigation-drawer__border'
      });
    },

    init() {
      if (this.permanent) {
        this.isActive = true;
      } else if (this.stateless || this.value != null) {
        this.isActive = this.value;
      } else if (!this.temporary) {
        this.isActive = !this.isMobile;
      }
    },

    onRouteChange() {
      if (this.reactsToRoute && this.closeConditional()) {
        this.isActive = false;
      }
    },

    swipeLeft(e) {
      if (this.isActive && this.right) return;
      this.calculateTouchArea();
      if (Math.abs(e.touchendX - e.touchstartX) < 100) return;
      if (this.right && e.touchstartX >= this.touchArea.right) this.isActive = true;else if (!this.right && this.isActive) this.isActive = false;
    },

    swipeRight(e) {
      if (this.isActive && !this.right) return;
      this.calculateTouchArea();
      if (Math.abs(e.touchendX - e.touchstartX) < 100) return;
      if (!this.right && e.touchstartX <= this.touchArea.left) this.isActive = true;else if (this.right && this.isActive) this.isActive = false;
    },

    /**
     * Update the application layout
     */
    updateApplication() {
      if (!this.isActive || this.isMobile || this.temporary || !this.$el) return 0;
      const width = Number(this.computedWidth);
      return isNaN(width) ? this.$el.clientWidth : width;
    }

  },

  render(h) {
    const children = [this.genPrepend(), this.genContent(), this.genAppend(), this.genBorder()];
    if (this.src || getSlot(this, 'img')) children.unshift(this.genBackground());
    return h(this.tag, this.setBackgroundColor(this.color, {
      class: this.classes,
      style: this.styles,
      directives: this.genDirectives(),
      on: this.genListeners()
    }), children);
  }

}));
//# sourceMappingURL=VNavigationDrawer.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VToolbar/index.js
// Components
 // Utilities


const VToolbarTitle = createSimpleFunctional('v-toolbar__title');
const VToolbarItems = createSimpleFunctional('v-toolbar__items');

/* harmony default export */ var components_VToolbar = ({
  $_vuetify_subcomponents: {
    VToolbar: VToolbar_VToolbar,
    VToolbarItems,
    VToolbarTitle
  }
});
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./src/BaseToolbar.vue






/* normalize component */

var BaseToolbar_component = normalizeComponent(
  src_BaseToolbarvue_type_script_lang_js_,
  BaseToolbarvue_type_template_id_4c47c81b_scoped_true_render,
  BaseToolbarvue_type_template_id_4c47c81b_scoped_true_staticRenderFns,
  false,
  null,
  "4c47c81b",
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('BaseToolbar', BaseToolbar_component.exports)
}
/* harmony default export */ var BaseToolbar = (BaseToolbar_component.exports);

/* vuetify-loader */









installComponents_default()(BaseToolbar_component, {VAppBar: VAppBar_VAppBar,VBtn: VBtn_VBtn,VIcon: components_VIcon_VIcon,VList: VList_VList,VNavigationDrawer: VNavigationDrawer_VNavigationDrawer,VSpacer: VSpacer,VToolbarItems: VToolbarItems,VToolbarTitle: VToolbarTitle})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/DatasetCard.vue?vue&type=template&id=4934b085&
var DatasetCardvue_type_template_id_4934b085_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('BaseCard',{attrs:{"external":_vm.dataset.external}},[_c('div',{staticClass:"px-6",class:_vm.dataset.external ? 'pt-0' : 'pt-6'},[(_vm.dataset.external)?_c('ExternalContribution'):_vm._e(),_c('v-row',{staticClass:"py-0 mx-0"},[_c('BaseTitleDisplay',{attrs:{"to":_vm.preview ? '' : ("/datasets/" + (_vm.dataset.slug))}},[[_vm._v(_vm._s(_vm.dataset.title))]],2),(_vm.dataset.tags)?_c('div',_vm._l((_vm.dataset.tags),function(tag){return _c('BasePropChip',{key:tag,on:{"chip-click":function($event){return _vm.$emit('tag-click', $event)}}},[[_vm._v(_vm._s(tag))]],2)}),1):_vm._e()],1)],1),_c('div',{staticClass:"pt-4 px-6"},[_c('BasePropDisplay',{attrs:{"name":"Updated"}},[[_vm._v(_vm._s(_vm._f("formatDate")(_vm.dataset.date)))]],2),(_vm.dataset.sources)?_c('BasePropDisplay',{attrs:{"name":"Sources"}},_vm._l((_vm.dataset.sources),function(source,i){return _c('span',{key:i},[(i > 0)?[_vm._v(_vm._s(_vm.dataset.sources.length > i + 1 ? ', ' : ' and '))]:_vm._e(),(source.url)?_c('a',{attrs:{"href":source.url,"target":"_blank","rel":"noreferrer"}},[[_vm._v(_vm._s(source.title))]],2):[_vm._v(_vm._s(source.title))]],2)}),0):_vm._e(),(_vm.dataset.categories)?_c('BasePropDisplay',{attrs:{"name":"Categories"}},_vm._l((_vm.dataset.categories),function(category,i){return _c('span',{key:i},[(i > 0)?[_vm._v(_vm._s(', '))]:_vm._e(),[_vm._v(_vm._s(_vm._f("capitalize")(category)))]],2)}),0):_vm._e()],1),_c('v-row',{staticClass:"ma-0 px-2 pb-2",attrs:{"justify":"end"}},[_c('BaseButton',{attrs:{"label":"More","to":_vm.preview ? null : ("/datasets/" + (_vm.dataset.slug)),"icon":"mdi-dots-horizontal"}},[[_vm._v(_vm._s('more'))]],2)],1)],1)}
var DatasetCardvue_type_template_id_4934b085_staticRenderFns = []


// CONCATENATED MODULE: ./src/DatasetCard.vue?vue&type=template&id=4934b085&

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/DatasetCard.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('DatasetCard', component.exports)
}
/* harmony default export */ var DatasetCardvue_type_script_lang_js_ = ({
  components: {
    BaseButton: BaseButton,
    BaseCard: BaseCard,
    BasePropChip: BasePropChip,
    BasePropDisplay: BasePropDisplay,
    BaseTitleDisplay: BaseTitleDisplay,
    ExternalContribution: ExternalContribution
  },
  mixins: [baseFilters],
  props: {
    item: Object,
    preview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dataset() {
      return this.item
    }
  }
});

// CONCATENATED MODULE: ./src/DatasetCard.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_DatasetCardvue_type_script_lang_js_ = (DatasetCardvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/DatasetCard.vue





/* normalize component */

var DatasetCard_component = normalizeComponent(
  src_DatasetCardvue_type_script_lang_js_,
  DatasetCardvue_type_template_id_4934b085_render,
  DatasetCardvue_type_template_id_4934b085_staticRenderFns,
  false,
  null,
  null,
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('DatasetCard', DatasetCard_component.exports)
}
/* harmony default export */ var DatasetCard = (DatasetCard_component.exports);

/* vuetify-loader */


installComponents_default()(DatasetCard_component, {VRow: VRow})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/DatasetView.vue?vue&type=template&id=1373d41d&scoped=true&
var DatasetViewvue_type_template_id_1373d41d_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('BaseCard',{attrs:{"external":_vm.dataset.external}},[_c('v-row',{staticClass:"mx-0 px-6 py-4"},[_c('h2',[_c('span',{staticClass:"small pl-2",staticStyle:{"color":"#666"}},[_vm._v("Datasets")]),_c('v-icon',[_vm._v("mdi-chevron-right")]),[_vm._v(_vm._s(_vm.dataset.title))]],2),_c('v-spacer'),_c('div',{staticClass:"text-center"},[_c('v-dialog',{attrs:{"persistent":"","width":"500"},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-btn',_vm._g({staticClass:"mr-0",attrs:{"text":""}},on),[[_vm._v(_vm._s('Download'))],_c('v-icon',[_vm._v("mdi-download")])],2)]}}]),model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_c('v-sheet',{staticClass:"font-lato"},[_c('v-container',{staticClass:"pa-6"},[_c('h3',{staticClass:"pb-6"},[_vm._v("Did you read the metadata?")]),[_vm._v(_vm._s(_vm.msgDialog))]],2),_c('v-row',{staticClass:"mx-0 px-3 pb-3",attrs:{"justify":"end"}},[_c('v-btn',{staticClass:"mr-0",attrs:{"text":""},on:{"click":_vm.downloadHelper}},[[_vm._v(_vm._s('Yes, download'))]],2),_c('v-btn',{staticClass:"mr-0",attrs:{"text":""},on:{"click":function($event){_vm.dialog = false}}},[_vm._v("Back")])],1)],1)],1)],1),_c('BaseButton',{attrs:{"label":"Back","to":_vm.preview ? '' : '/datasets'}},[[_vm._v(_vm._s('back'))]],2)],1),_c('v-divider'),_c('div',{staticClass:"px-6 pb-6",class:_vm.dataset.external ? 'pt-0' : 'pt-6'},[(_vm.dataset.external)?_c('ExternalContribution'):_vm._e(),_c('h2',{staticClass:"mb-4 light"},[_vm._v("About this dataset")]),_c('v-row',{staticClass:"mx-0"},[_c('v-col',{staticClass:"py-0",attrs:{"cols":"12","md":"6","lg":"4"}},[_c('BasePropDisplay',{attrs:{"name":"Updated"}},[[_vm._v(_vm._s(_vm._f("formatDate")(_vm.dataset.date)))]],2),_c('BasePropDisplay',{attrs:{"name":"Sources"}},_vm._l((_vm.dataset.sources),function(source,i){return _c('span',{key:i},[(i > 0)?[_vm._v(_vm._s(_vm.dataset.sources.length > i + 1 ? ', ' : ' and '))]:_vm._e(),(source.url)?_c('a',{attrs:{"href":source.url,"target":"_blank","rel":"noreferrer"}},[_vm._v("\n              "+_vm._s(source.title)+"\n            ")]):[_vm._v(_vm._s(source.title))]],2)}),0),(_vm.dataset.categories)?_c('BasePropDisplay',{attrs:{"name":"Categories"}},_vm._l((_vm.dataset.categories),function(category,i){return _c('span',{key:i},[(i > 0)?[_vm._v(_vm._s(', '))]:_vm._e(),[_vm._v(_vm._s(_vm._f("capitalize")(category)))]],2)}),0):_vm._e(),(_vm.dataset.tags)?_c('BasePropDisplay',{attrs:{"name":"Tags"}},_vm._l((_vm.dataset.tags),function(tag){return _c('BasePropChip',{key:tag,on:{"chip-click":function($event){return _vm.$emit('tag-click', $event)}}},[[_vm._v(_vm._s(tag))]],2)}),1):_vm._e(),(_vm.dataset.timeperiod)?_c('BasePropDisplay',{attrs:{"name":"Time period"}},[[_vm._v(_vm._s(_vm._f("formatTimeperiod")(_vm.dataset.timeperiod)))]],2):_vm._e()],1),_c('v-col',{staticClass:"py-0",attrs:{"cols":"12","md":"6","lg":"4"}},[(_vm.dataset.unit)?_c('BasePropDisplay',{attrs:{"name":"Unit of analysis"}},[[_vm._v(_vm._s(_vm._f("capitalize")(_vm.dataset.unit)))]],2):_vm._e(),(_vm.dataset.description)?_c('BasePropDisplay',{attrs:{"name":"Description"}},[[_vm._v(_vm._s(_vm.dataset.description))]],2):_vm._e(),(_vm.dataset.notes)?_c('BasePropDisplay',{attrs:{"name":"Notes"}},[_c('ul',_vm._l((_vm.dataset.notes),function(note){return _c('li',{key:note},[_vm._v(_vm._s(note))])}),0)]):_vm._e()],1)],1),(_vm.dataset.variables)?_c('div',{staticClass:"hidden-sm-and-down py-6"},[_c('h2',{staticClass:"mb-4 light"},[_vm._v("Variables")]),_c('div',{ref:"variables",staticClass:"variables-table font-lato small"})]):_vm._e(),(_vm.dataset.funding)?_c('BaseInfoBlock',{scopedSlots:_vm._u([{key:"title",fn:function(){return [_vm._v(_vm._s('Funding acknowledgment'))]},proxy:true},{key:"text",fn:function(){return [_vm._v(_vm._s(_vm.dataset.funding))]},proxy:true}],null,false,1322487311)}):_vm._e(),(_vm.dataset.citation)?_c('BaseInfoBlock',{scopedSlots:_vm._u([{key:"title",fn:function(){return [_vm._v(_vm._s('Suggested citation'))]},proxy:true},{key:"text",fn:function(){return [_c('span',{domProps:{"innerHTML":_vm._s(_vm.dataset.citation)}})]},proxy:true}],null,false,1351201267)}):_vm._e(),(_vm.hasRelated)?_c('BaseInfoBlock',{scopedSlots:_vm._u([{key:"title",fn:function(){return [_vm._v(_vm._s('Related contents'))]},proxy:true},{key:"text",fn:function(){return [_c('ul',{staticClass:"font-lato"},[_vm._l((_vm.dataset.apps),function(app,i){return _c('li',{key:("app" + i)},[_c('router-link',{attrs:{"to":_vm.preview ? '' : ("/apps/" + (app.slug))}},[[_vm._v(_vm._s(("[APP] " + (app.title))))]],2)],1)}),_vm._l((_vm.dataset.articles),function(article,i){return _c('li',{key:("article" + i)},[_c('router-link',{attrs:{"to":_vm.preview ? '' : ("/articles/" + (article.slug))}},[[_vm._v(_vm._s(("[ARTICLE] " + (article.title))))]],2)],1)})],2)]},proxy:true}],null,false,2336433651)}):_vm._e()],1)],1)}
var DatasetViewvue_type_template_id_1373d41d_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/DatasetView.vue?vue&type=template&id=1373d41d&scoped=true&

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/DatasetView.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









const arr2table = ({ arr, cols = ['name', 'type', 'definition', 'values'] }) =>
  `<table>${getThead({ cols })}${getTbody({ cols, rows: arr })}</table>`

const getRow = (row, cols) =>
  `<tr>${cols.map(col => `<td>${row[col] ? row[col] : ''}</td>`).join('')}</tr>`

const getTbody = ({ rows, cols }) =>
  `<tbody>${rows.map(row => getRow(row, cols)).join('')}</tbody>`

const getThead = ({ cols }) =>
  `<thead><tr>${cols
    .map(col => `<th>${col[0].toUpperCase()}${col.slice(1)}</th>`)
    .join('')}</tr></tbody>`

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('DatasetView', component.exports)
}
/* harmony default export */ var DatasetViewvue_type_script_lang_js_ = ({
  components: {
    BaseButton: BaseButton,
    BaseCard: BaseCard,
    BaseInfoBlock: BaseInfoBlock,
    BasePropChip: BasePropChip,
    BasePropDisplay: BasePropDisplay,
    ExternalContribution: ExternalContribution
  },
  filters: {
    formatTimeperiod({ yearmin, yearmax, yeartype }) {
      return `${yearmin}-${yearmax} (${yeartype})`
    }
  },
  mixins: [baseFilters],
  props: {
    item: Object,
    downloader: Function,
    preview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      msgDialog:
        'It is important for you to know the context of the dataset you are about to download. Make sure you have read and understand the metatdata shown in this page before using the dataset.'
    }
  },
  computed: {
    dataset() {
      return this.item
    },
    hasRelated() {
      const { apps, articles } = this.item
      return (apps && apps.length) || (articles && articles.length)
    }
  },
  mounted() {
    const { variables } = this.item
    if (variables)
      this.$refs.variables.innerHTML = arr2table({ arr: variables })
  },
  methods: {
    async downloadHelper() {
      await this.downloader()
      this.dialog = false
    }
  }
});

// CONCATENATED MODULE: ./src/DatasetView.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_DatasetViewvue_type_script_lang_js_ = (DatasetViewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/DatasetView.vue?vue&type=style&index=0&id=1373d41d&scoped=true&lang=css&
var DatasetViewvue_type_style_index_0_id_1373d41d_scoped_true_lang_css_ = __webpack_require__("65bb");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VGrid/grid.js
// Types

function grid_VGrid(name) {
  /* @vue/component */
  return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: `v-${name}`,
    functional: true,
    props: {
      id: String,
      tag: {
        type: String,
        default: 'div'
      }
    },

    render(h, {
      props,
      data,
      children
    }) {
      data.staticClass = `${name} ${data.staticClass || ''}`.trim();
      const {
        attrs
      } = data;

      if (attrs) {
        // reset attrs to extract utility clases like pa-3
        data.attrs = {};
        const classes = Object.keys(attrs).filter(key => {
          // TODO: Remove once resolved
          // https://github.com/vuejs/vue/issues/7841
          if (key === 'slot') return false;
          const value = attrs[key]; // add back data attributes like data-test="foo" but do not
          // add them as classes

          if (key.startsWith('data-')) {
            data.attrs[key] = value;
            return false;
          }

          return value || typeof value === 'string';
        });
        if (classes.length) data.staticClass += ` ${classes.join(' ')}`;
      }

      if (props.id) {
        data.domProps = data.domProps || {};
        data.domProps.id = props.id;
      }

      return h(props.tag, data, children);
    }

  });
}
//# sourceMappingURL=grid.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js




/* @vue/component */

/* harmony default export */ var VContainer = (grid_VGrid('container').extend({
  name: 'v-container',
  functional: true,
  props: {
    id: String,
    tag: {
      type: String,
      default: 'div'
    },
    fluid: {
      type: Boolean,
      default: false
    }
  },

  render(h, {
    props,
    data,
    children
  }) {
    let classes;
    const {
      attrs
    } = data;

    if (attrs) {
      // reset attrs to extract utility clases like pa-3
      data.attrs = {};
      classes = Object.keys(attrs).filter(key => {
        // TODO: Remove once resolved
        // https://github.com/vuejs/vue/issues/7841
        if (key === 'slot') return false;
        const value = attrs[key]; // add back data attributes like data-test="foo" but do not
        // add them as classes

        if (key.startsWith('data-')) {
          data.attrs[key] = value;
          return false;
        }

        return value || typeof value === 'string';
      });
    }

    if (props.id) {
      data.domProps = data.domProps || {};
      data.domProps.id = props.id;
    }

    return h(props.tag, mergeData(data, {
      staticClass: 'container',
      class: Array({
        'container--fluid': props.fluid
      }).concat(classes || [])
    }), children);
  }

}));
//# sourceMappingURL=VContainer.js.map
// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VDialog/VDialog.sass
var VDialog = __webpack_require__("368e");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/delayable/index.js

/**
 * Delayable
 *
 * @mixin
 *
 * Changes the open or close delay time for elements
 */

/* harmony default export */ var delayable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend().extend({
  name: 'delayable',
  props: {
    openDelay: {
      type: [Number, String],
      default: 0
    },
    closeDelay: {
      type: [Number, String],
      default: 0
    }
  },
  data: () => ({
    openTimeout: undefined,
    closeTimeout: undefined
  }),
  methods: {
    /**
     * Clear any pending delay timers from executing
     */
    clearDelay() {
      clearTimeout(this.openTimeout);
      clearTimeout(this.closeTimeout);
    },

    /**
     * Runs callback after a specified delay
     */
    runDelay(type, cb) {
      this.clearDelay();
      const delay = parseInt(this[`${type}Delay`], 10);
      this[`${type}Timeout`] = setTimeout(cb || (() => {
        this.isActive = {
          open: true,
          close: false
        }[type];
      }), delay);
    }

  }
}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/activatable/index.js
// Mixins

 // Utilities




const activatable_baseMixins = mixins(delayable, toggleable);
/* @vue/component */

/* harmony default export */ var activatable = (activatable_baseMixins.extend({
  name: 'activatable',
  props: {
    activator: {
      default: null,
      validator: val => {
        return ['string', 'object'].includes(typeof val);
      }
    },
    disabled: Boolean,
    internalActivator: Boolean,
    openOnHover: Boolean
  },
  data: () => ({
    activatorElement: null,
    activatorNode: []
  }),
  watch: {
    activator() {
      this.activatorElement = null;
      this.getActivator();
    }

  },

  mounted() {
    const slotType = getSlotType(this, 'activator', true);

    if (slotType && ['v-slot', 'normal'].includes(slotType)) {
      consoleError(`The activator slot must be bound, try '<template v-slot:activator="{ on }"><v-btn v-on="on">'`, this);
    }
  },

  methods: {
    getValueProxy() {
      const self = this;
      return {
        get value() {
          return self.isActive;
        },

        set value(isActive) {
          self.isActive = isActive;
        }

      };
    },

    genActivator() {
      const node = getSlot(this, 'activator', Object.assign(this.getValueProxy(), {
        on: this.genActivatorListeners(),
        attrs: this.genActivatorAttributes()
      })) || [];
      this.activatorNode = node;
      return node;
    },

    getContentSlot() {
      return getSlot(this, 'default', this.getValueProxy(), true);
    },

    genActivatorAttributes() {
      return {
        role: 'button',
        'aria-haspopup': true,
        'aria-expanded': String(this.isActive)
      };
    },

    genActivatorListeners() {
      if (this.disabled) return {};
      const listeners = {};

      if (this.openOnHover) {
        listeners.mouseenter = e => {
          this.getActivator(e);
          this.runDelay('open');
        };

        listeners.mouseleave = e => {
          this.getActivator(e);
          this.runDelay('close');
        };
      } else {
        listeners.click = e => {
          const activator = this.getActivator(e);
          if (activator) activator.focus();
          this.isActive = !this.isActive;
        };
      }

      return listeners;
    },

    getActivator(e) {
      // If we've already fetched the activator, re-use
      if (this.activatorElement) return this.activatorElement;
      let activator = null;

      if (this.activator) {
        const target = this.internalActivator ? this.$el : document;
        activator = typeof this.activator === 'string' ? target.querySelector(this.activator) : this.activator;
      } else if (e) {
        activator = e.currentTarget || e.target;
      } else if (this.activatorNode.length) {
        activator = this.activatorNode[0].elm;
      }

      this.activatorElement = activator;
      return this.activatorElement;
    }

  }
}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/bootable/index.js
// Utilities
 // Types


/**
 * Bootable
 * @mixin
 *
 * Used to add lazy content functionality to components
 * Looks for change in "isActive" to automatically boot
 * Otherwise can be set manually
 */

/* @vue/component */

/* harmony default export */ var bootable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend().extend({
  name: 'bootable',
  props: {
    eager: Boolean
  },
  data: () => ({
    isBooted: false
  }),
  computed: {
    hasContent() {
      return this.isBooted || this.eager || this.isActive;
    }

  },
  watch: {
    isActive() {
      this.isBooted = true;
    }

  },

  created() {
    /* istanbul ignore next */
    if ('lazy' in this.$attrs) {
      removed('lazy', this);
    }
  },

  methods: {
    showLazyContent(content) {
      return this.hasContent ? content : undefined;
    }

  }
}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/detachable/index.js
// Mixins
 // Utilities





function validateAttachTarget(val) {
  const type = typeof val;
  if (type === 'boolean' || type === 'string') return true;
  return val.nodeType === Node.ELEMENT_NODE;
}
/* @vue/component */


/* harmony default export */ var detachable = (mixins(bootable).extend({
  name: 'detachable',
  props: {
    attach: {
      default: false,
      validator: validateAttachTarget
    },
    contentClass: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    activatorNode: null,
    hasDetached: false
  }),
  watch: {
    attach() {
      this.hasDetached = false;
      this.initDetach();
    },

    hasContent: 'initDetach'
  },

  beforeMount() {
    this.$nextTick(() => {
      if (this.activatorNode) {
        const activator = Array.isArray(this.activatorNode) ? this.activatorNode : [this.activatorNode];
        activator.forEach(node => {
          if (!node.elm) return;
          if (!this.$el.parentNode) return;
          const target = this.$el === this.$el.parentNode.firstChild ? this.$el : this.$el.nextSibling;
          this.$el.parentNode.insertBefore(node.elm, target);
        });
      }
    });
  },

  mounted() {
    this.eager && this.initDetach();
  },

  deactivated() {
    this.isActive = false;
  },

  beforeDestroy() {
    // IE11 Fix
    try {
      if (this.$refs.content && this.$refs.content.parentNode) {
        this.$refs.content.parentNode.removeChild(this.$refs.content);
      }

      if (this.activatorNode) {
        const activator = Array.isArray(this.activatorNode) ? this.activatorNode : [this.activatorNode];
        activator.forEach(node => {
          node.elm && node.elm.parentNode && node.elm.parentNode.removeChild(node.elm);
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  methods: {
    getScopeIdAttrs() {
      const scopeId = getObjectValueByPath(this.$vnode, 'context.$options._scopeId');
      return scopeId && {
        [scopeId]: ''
      };
    },

    initDetach() {
      if (this._isDestroyed || !this.$refs.content || this.hasDetached || // Leave menu in place if attached
      // and dev has not changed target
      this.attach === '' || // If used as a boolean prop (<v-menu attach>)
      this.attach === true || // If bound to a boolean (<v-menu :attach="true">)
      this.attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
      ) return;
      let target;

      if (this.attach === false) {
        // Default, detach to app
        target = document.querySelector('[data-app]');
      } else if (typeof this.attach === 'string') {
        // CSS selector
        target = document.querySelector(this.attach);
      } else {
        // DOM Element
        target = this.attach;
      }

      if (!target) {
        consoleWarn(`Unable to locate target ${this.attach || '[data-app]'}`, this);
        return;
      }

      target.insertBefore(this.$refs.content, target.firstChild);
      this.hasDetached = true;
    }

  }
}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/returnable/index.js

/* @vue/component */

/* harmony default export */ var returnable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
  name: 'returnable',
  props: {
    returnValue: null
  },
  data: () => ({
    isActive: false,
    originalValue: null
  }),
  watch: {
    isActive(val) {
      if (val) {
        this.originalValue = this.returnValue;
      } else {
        this.$emit('update:return-value', this.originalValue);
      }
    }

  },
  methods: {
    save(value) {
      this.originalValue = value;
      setTimeout(() => {
        this.isActive = false;
      });
    }

  }
}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/stackable/index.js


/* @vue/component */

/* harmony default export */ var stackable = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend().extend({
  name: 'stackable',

  data() {
    return {
      stackElement: null,
      stackExclude: null,
      stackMinZIndex: 0,
      isActive: false
    };
  },

  computed: {
    activeZIndex() {
      if (typeof window === 'undefined') return 0;
      const content = this.stackElement || this.$refs.content; // Return current zindex if not active

      const index = !this.isActive ? getZIndex(content) : this.getMaxZIndex(this.stackExclude || [content]) + 2;
      if (index == null) return index; // Return max current z-index (excluding self) + 2
      // (2 to leave room for an overlay below, if needed)

      return parseInt(index);
    }

  },
  methods: {
    getMaxZIndex(exclude = []) {
      const base = this.$el; // Start with lowest allowed z-index or z-index of
      // base component's element, whichever is greater

      const zis = [this.stackMinZIndex, getZIndex(base)]; // Convert the NodeList to an array to
      // prevent an Edge bug with Symbol.iterator
      // https://github.com/vuetifyjs/vuetify/issues/2146

      const activeElements = [...document.getElementsByClassName('v-menu__content--active'), ...document.getElementsByClassName('v-dialog__content--active')]; // Get z-index for all active dialogs

      for (let index = 0; index < activeElements.length; index++) {
        if (!exclude.includes(activeElements[index])) {
          zis.push(getZIndex(activeElements[index]));
        }
      }

      return Math.max(...zis);
    }

  }
}));
//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/util/ThemeProvider.js


/* @vue/component */

/* harmony default export */ var ThemeProvider = (mixins(themeable).extend({
  name: 'theme-provider',
  props: {
    root: Boolean
  },
  computed: {
    isDark() {
      return this.root ? this.rootIsDark : themeable.options.computed.isDark.call(this);
    }

  },

  render() {
    return this.$slots.default && this.$slots.default.find(node => !node.isComment && node.text !== ' ');
  }

}));
//# sourceMappingURL=ThemeProvider.js.map
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VDialog/VDialog.js
 // Mixins







 // Directives

 // Helpers




const VDialog_baseMixins = mixins(activatable, dependent, detachable, overlayable, returnable, stackable, toggleable);
/* @vue/component */

/* harmony default export */ var VDialog_VDialog = (VDialog_baseMixins.extend({
  name: 'v-dialog',
  directives: {
    ClickOutside: click_outside
  },
  props: {
    dark: Boolean,
    disabled: Boolean,
    fullscreen: Boolean,
    fullWidth: Boolean,
    light: Boolean,
    maxWidth: {
      type: [String, Number],
      default: 'none'
    },
    noClickAnimation: Boolean,
    origin: {
      type: String,
      default: 'center center'
    },
    persistent: Boolean,
    retainFocus: {
      type: Boolean,
      default: true
    },
    scrollable: Boolean,
    transition: {
      type: [String, Boolean],
      default: 'dialog-transition'
    },
    width: {
      type: [String, Number],
      default: 'auto'
    }
  },

  data() {
    return {
      activatedBy: null,
      animate: false,
      animateTimeout: -1,
      isActive: !!this.value,
      stackMinZIndex: 200
    };
  },

  computed: {
    classes() {
      return {
        [`v-dialog ${this.contentClass}`.trim()]: true,
        'v-dialog--active': this.isActive,
        'v-dialog--persistent': this.persistent,
        'v-dialog--fullscreen': this.fullscreen,
        'v-dialog--scrollable': this.scrollable,
        'v-dialog--animated': this.animate
      };
    },

    contentClasses() {
      return {
        'v-dialog__content': true,
        'v-dialog__content--active': this.isActive
      };
    },

    hasActivator() {
      return Boolean(!!this.$slots.activator || !!this.$scopedSlots.activator);
    }

  },
  watch: {
    isActive(val) {
      if (val) {
        this.show();
        this.hideScroll();
      } else {
        this.removeOverlay();
        this.unbind();
      }
    },

    fullscreen(val) {
      if (!this.isActive) return;

      if (val) {
        this.hideScroll();
        this.removeOverlay(false);
      } else {
        this.showScroll();
        this.genOverlay();
      }
    }

  },

  beforeMount() {
    this.$nextTick(() => {
      this.isBooted = this.isActive;
      this.isActive && this.show();
    });
  },

  beforeDestroy() {
    if (typeof window !== 'undefined') this.unbind();
  },

  methods: {
    animateClick() {
      this.animate = false; // Needed for when clicking very fast
      // outside of the dialog

      this.$nextTick(() => {
        this.animate = true;
        window.clearTimeout(this.animateTimeout);
        this.animateTimeout = window.setTimeout(() => this.animate = false, 150);
      });
    },

    closeConditional(e) {
      const target = e.target; // If the dialog content contains
      // the click event, or if the
      // dialog is not active

      if (!this.isActive || this.$refs.content.contains(target)) return false; // If we made it here, the click is outside
      // and is active. If persistent, and the
      // click is on the overlay, animate

      this.$emit('click:outside');

      if (this.persistent) {
        if (!this.noClickAnimation && this.overlay === target) this.animateClick();
        return false;
      } // close dialog if !persistent, clicked outside and we're the topmost dialog.
      // Since this should only be called in a capture event (bottom up), we shouldn't need to stop propagation


      return this.activeZIndex >= this.getMaxZIndex();
    },

    hideScroll() {
      if (this.fullscreen) {
        document.documentElement.classList.add('overflow-y-hidden');
      } else {
        overlayable.options.methods.hideScroll.call(this);
      }
    },

    show() {
      !this.fullscreen && !this.hideOverlay && this.genOverlay();
      this.$refs.content.focus();
      this.bind();
    },

    bind() {
      window.addEventListener('focusin', this.onFocusin);
    },

    unbind() {
      window.removeEventListener('focusin', this.onFocusin);
    },

    onKeydown(e) {
      if (e.keyCode === keyCodes.esc && !this.getOpenDependents().length) {
        if (!this.persistent) {
          this.isActive = false;
          const activator = this.getActivator();
          this.$nextTick(() => activator && activator.focus());
        } else if (!this.noClickAnimation) {
          this.animateClick();
        }
      }

      this.$emit('keydown', e);
    },

    onFocusin(e) {
      if (!e || !this.retainFocus) return;
      const target = e.target;

      if (!!target && // It isn't the document or the dialog body
      ![document, this.$refs.content].includes(target) && // It isn't inside the dialog body
      !this.$refs.content.contains(target) && // We're the topmost dialog
      this.activeZIndex >= this.getMaxZIndex() && // It isn't inside a dependent element (like a menu)
      !this.getOpenDependentElements().some(el => el.contains(target)) // So we must have focused something outside the dialog and its children
      ) {
          // Find and focus the first available element inside the dialog
          const focusable = this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          focusable.length && focusable[0].focus();
        }
    }

  },

  render(h) {
    const children = [];
    const data = {
      class: this.classes,
      ref: 'dialog',
      directives: [{
        name: 'click-outside',
        value: () => {
          this.isActive = false;
        },
        args: {
          closeConditional: this.closeConditional,
          include: this.getOpenDependentElements
        }
      }, {
        name: 'show',
        value: this.isActive
      }],
      on: {
        click: e => {
          e.stopPropagation();
        }
      },
      style: {}
    };

    if (!this.fullscreen) {
      data.style = {
        maxWidth: this.maxWidth === 'none' ? undefined : convertToUnit(this.maxWidth),
        width: this.width === 'auto' ? undefined : convertToUnit(this.width)
      };
    }

    children.push(this.genActivator());
    let dialog = h('div', data, this.showLazyContent(this.getContentSlot()));

    if (this.transition) {
      dialog = h('transition', {
        props: {
          name: this.transition,
          origin: this.origin
        }
      }, [dialog]);
    }

    children.push(h('div', {
      class: this.contentClasses,
      attrs: {
        role: 'document',
        tabindex: 0,
        ...this.getScopeIdAttrs()
      },
      on: {
        keydown: this.onKeydown
      },
      style: {
        zIndex: this.activeZIndex
      },
      ref: 'content'
    }, [this.$createElement(ThemeProvider, {
      props: {
        root: true,
        light: this.light,
        dark: this.dark
      }
    }, [dialog])]));
    return h('div', {
      staticClass: 'v-dialog__container',
      attrs: {
        role: 'dialog'
      },
      style: {
        display: !this.hasActivator || this.fullWidth ? 'block' : 'inline-block'
      }
    }, children);
  }

}));
//# sourceMappingURL=VDialog.js.map
// CONCATENATED MODULE: ./src/DatasetView.vue






/* normalize component */

var DatasetView_component = normalizeComponent(
  src_DatasetViewvue_type_script_lang_js_,
  DatasetViewvue_type_template_id_1373d41d_scoped_true_render,
  DatasetViewvue_type_template_id_1373d41d_scoped_true_staticRenderFns,
  false,
  null,
  "1373d41d",
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('DatasetView', DatasetView_component.exports)
}
/* harmony default export */ var DatasetView = (DatasetView_component.exports);

/* vuetify-loader */










installComponents_default()(DatasetView_component, {VBtn: VBtn_VBtn,VCol: VCol,VContainer: VContainer,VDialog: VDialog_VDialog,VDivider: VDivider_VDivider,VIcon: components_VIcon_VIcon,VRow: VRow,VSheet: VSheet_VSheet,VSpacer: VSpacer})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2a566cca-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/Footer.vue?vue&type=template&id=5db74bb4&scoped=true&
var Footervue_type_template_id_5db74bb4_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-footer',{attrs:{"height":"auto"}},[_c('div',{staticClass:"footer-content"},[[_vm._v(_vm._s('© ' + _vm.year + ' '))],_c('a',{attrs:{"href":_vm.agency.url,"target":"_blank","rel":"noreferrer"}},[[_vm._v(_vm._s(_vm.agency.name))]],2),[_vm._v(_vm._s(' | '))],_c('a',{attrs:{"href":_vm.github.url,"target":"_blank","rel":"noreferrer"}},[[_vm._v(_vm._s(_vm.github.version + ' '))],_c('v-icon',[_vm._v("mdi-github-circle")])],2)],2)])}
var Footervue_type_template_id_5db74bb4_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/Footer.vue?vue&type=template&id=5db74bb4&scoped=true&

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/Footer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('Footer', component.exports)
}
/* harmony default export */ var Footervue_type_script_lang_js_ = ({
  props: {
    agency: Object,
    github: Object
  },
  data() {
    return {
      year: new Date().getFullYear(),
      fullname: 'Illinois Criminal Justice Information Authority'
    }
  }
});

// CONCATENATED MODULE: ./src/Footer.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Footervue_type_script_lang_js_ = (Footervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/Footer.vue?vue&type=style&index=0&id=5db74bb4&scoped=true&lang=css&
var Footervue_type_style_index_0_id_5db74bb4_scoped_true_lang_css_ = __webpack_require__("8244");

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VFooter/VFooter.sass
var VFooter = __webpack_require__("b5b6");

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VFooter/VFooter.js
// Styles
 // Mixins



 // Utilities



/* @vue/component */

/* harmony default export */ var VFooter_VFooter = (mixins(VSheet_VSheet, applicationable('footer', ['height', 'inset']), ssr_bootable).extend({
  name: 'v-footer',
  props: {
    height: {
      default: 'auto',
      type: [Number, String]
    },
    inset: Boolean,
    padless: Boolean,
    tile: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    applicationProperty() {
      return this.inset ? 'insetFooter' : 'footer';
    },

    classes() {
      return { ...VSheet_VSheet.options.computed.classes.call(this),
        'v-footer--absolute': this.absolute,
        'v-footer--fixed': !this.absolute && (this.app || this.fixed),
        'v-footer--padless': this.padless,
        'v-footer--inset': this.inset
      };
    },

    computedBottom() {
      if (!this.isPositioned) return undefined;
      return this.app ? this.$vuetify.application.bottom : 0;
    },

    computedLeft() {
      if (!this.isPositioned) return undefined;
      return this.app && this.inset ? this.$vuetify.application.left : 0;
    },

    computedRight() {
      if (!this.isPositioned) return undefined;
      return this.app && this.inset ? this.$vuetify.application.right : 0;
    },

    isPositioned() {
      return Boolean(this.absolute || this.fixed || this.app);
    },

    styles() {
      const height = parseInt(this.height);
      return { ...VSheet_VSheet.options.computed.styles.call(this),
        height: isNaN(height) ? height : convertToUnit(height),
        left: convertToUnit(this.computedLeft),
        right: convertToUnit(this.computedRight),
        bottom: convertToUnit(this.computedBottom)
      };
    }

  },
  methods: {
    updateApplication() {
      const height = parseInt(this.height);
      return isNaN(height) ? this.$el ? this.$el.clientHeight : 0 : height;
    }

  },

  render(h) {
    const data = this.setBackgroundColor(this.color, {
      staticClass: 'v-footer',
      class: this.classes,
      style: this.styles
    });
    return h('footer', data, this.$slots.default);
  }

}));
//# sourceMappingURL=VFooter.js.map
// CONCATENATED MODULE: ./src/Footer.vue






/* normalize component */

var Footer_component = normalizeComponent(
  src_Footervue_type_script_lang_js_,
  Footervue_type_template_id_5db74bb4_scoped_true_render,
  Footervue_type_template_id_5db74bb4_scoped_true_staticRenderFns,
  false,
  null,
  "5db74bb4",
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('Footer', Footer_component.exports)
}
/* harmony default export */ var Footer = (Footer_component.exports);

/* vuetify-loader */



installComponents_default()(Footer_component, {VFooter: VFooter_VFooter,VIcon: components_VIcon_VIcon})

// CONCATENATED MODULE: ./src/index.js
// THIS FILE IS AUTOMATICALLY GENERATED IN:
//
//   build-utils/update-file-index.js
//
// YOU SHOULD NEVER UPDATE THIS FILE DIRECTLY





external_commonjs_vue_commonjs2_vue_root_Vue_default.a.use(framework_Vuetify)










// Export components individually


// What should happen if the user installs the library as a plugin
function src_install(Vue) {
  Vue.component('AppCard', AppCard)
  Vue.component('AppView', AppView)
  Vue.component('ArticleCard', ArticleCard)
  Vue.component('ArticleView', ArticleView)
  Vue.component('BaseToolbar', BaseToolbar)
  Vue.component('DatasetCard', DatasetCard)
  Vue.component('DatasetView', DatasetView)
  Vue.component('Footer', Footer)
}

// Export the library as a plugin
/* harmony default export */ var src = ({ install: src_install });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport AppCard */__webpack_require__.d(__webpack_exports__, "AppCard", function() { return AppCard; });
/* concated harmony reexport AppView */__webpack_require__.d(__webpack_exports__, "AppView", function() { return AppView; });
/* concated harmony reexport ArticleCard */__webpack_require__.d(__webpack_exports__, "ArticleCard", function() { return ArticleCard; });
/* concated harmony reexport ArticleView */__webpack_require__.d(__webpack_exports__, "ArticleView", function() { return ArticleView; });
/* concated harmony reexport BaseToolbar */__webpack_require__.d(__webpack_exports__, "BaseToolbar", function() { return BaseToolbar; });
/* concated harmony reexport DatasetCard */__webpack_require__.d(__webpack_exports__, "DatasetCard", function() { return DatasetCard; });
/* concated harmony reexport DatasetView */__webpack_require__.d(__webpack_exports__, "DatasetView", function() { return DatasetView; });
/* concated harmony reexport Footer */__webpack_require__.d(__webpack_exports__, "Footer", function() { return Footer; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ }),

/***/ "fbcd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";



////////////////////////////////////////////////////////////////////////////////
// Helpers

// Merge objects
//
function assign(obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return; }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj;
}

function _class(obj) { return Object.prototype.toString.call(obj); }
function isString(obj) { return _class(obj) === '[object String]'; }
function isObject(obj) { return _class(obj) === '[object Object]'; }
function isRegExp(obj) { return _class(obj) === '[object RegExp]'; }
function isFunction(obj) { return _class(obj) === '[object Function]'; }


function escapeRE(str) { return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'); }

////////////////////////////////////////////////////////////////////////////////


var defaultOptions = {
  fuzzyLink: true,
  fuzzyEmail: true,
  fuzzyIP: false
};


function isOptionsObj(obj) {
  return Object.keys(obj || {}).reduce(function (acc, k) {
    return acc || defaultOptions.hasOwnProperty(k);
  }, false);
}


var defaultSchemas = {
  'http:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.http) {
        // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.http =  new RegExp(
          '^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i'
        );
      }
      if (self.re.http.test(tail)) {
        return tail.match(self.re.http)[0].length;
      }
      return 0;
    }
  },
  'https:':  'http:',
  'ftp:':    'http:',
  '//':      {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.no_http) {
      // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.no_http =  new RegExp(
          '^' +
          self.re.src_auth +
          // Don't allow single-level domains, because of false positives like '//test'
          // with code comments
          '(?:localhost|(?:(?:' + self.re.src_domain + ')\\.)+' + self.re.src_domain_root + ')' +
          self.re.src_port +
          self.re.src_host_terminator +
          self.re.src_path,

          'i'
        );
      }

      if (self.re.no_http.test(tail)) {
        // should not be `://` & `///`, that protects from errors in protocol name
        if (pos >= 3 && text[pos - 3] === ':') { return 0; }
        if (pos >= 3 && text[pos - 3] === '/') { return 0; }
        return tail.match(self.re.no_http)[0].length;
      }
      return 0;
    }
  },
  'mailto:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.mailto) {
        self.re.mailto =  new RegExp(
          '^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i'
        );
      }
      if (self.re.mailto.test(tail)) {
        return tail.match(self.re.mailto)[0].length;
      }
      return 0;
    }
  }
};

/*eslint-disable max-len*/

// RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)
var tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';

// DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead
var tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');

/*eslint-enable max-len*/

////////////////////////////////////////////////////////////////////////////////

function resetScanCache(self) {
  self.__index__ = -1;
  self.__text_cache__   = '';
}

function createValidator(re) {
  return function (text, pos) {
    var tail = text.slice(pos);

    if (re.test(tail)) {
      return tail.match(re)[0].length;
    }
    return 0;
  };
}

function createNormalizer() {
  return function (match, self) {
    self.normalize(match);
  };
}

// Schemas compiler. Build regexps.
//
function compile(self) {

  // Load & clone RE patterns.
  var re = self.re = __webpack_require__("b117")(self.__opts__);

  // Define dynamic patterns
  var tlds = self.__tlds__.slice();

  self.onCompile();

  if (!self.__tlds_replaced__) {
    tlds.push(tlds_2ch_src_re);
  }
  tlds.push(re.src_xn);

  re.src_tlds = tlds.join('|');

  function untpl(tpl) { return tpl.replace('%TLDS%', re.src_tlds); }

  re.email_fuzzy      = RegExp(untpl(re.tpl_email_fuzzy), 'i');
  re.link_fuzzy       = RegExp(untpl(re.tpl_link_fuzzy), 'i');
  re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), 'i');
  re.host_fuzzy_test  = RegExp(untpl(re.tpl_host_fuzzy_test), 'i');

  //
  // Compile each schema
  //

  var aliases = [];

  self.__compiled__ = {}; // Reset compiled data

  function schemaError(name, val) {
    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
  }

  Object.keys(self.__schemas__).forEach(function (name) {
    var val = self.__schemas__[name];

    // skip disabled methods
    if (val === null) { return; }

    var compiled = { validate: null, link: null };

    self.__compiled__[name] = compiled;

    if (isObject(val)) {
      if (isRegExp(val.validate)) {
        compiled.validate = createValidator(val.validate);
      } else if (isFunction(val.validate)) {
        compiled.validate = val.validate;
      } else {
        schemaError(name, val);
      }

      if (isFunction(val.normalize)) {
        compiled.normalize = val.normalize;
      } else if (!val.normalize) {
        compiled.normalize = createNormalizer();
      } else {
        schemaError(name, val);
      }

      return;
    }

    if (isString(val)) {
      aliases.push(name);
      return;
    }

    schemaError(name, val);
  });

  //
  // Compile postponed aliases
  //

  aliases.forEach(function (alias) {
    if (!self.__compiled__[self.__schemas__[alias]]) {
      // Silently fail on missed schemas to avoid errons on disable.
      // schemaError(alias, self.__schemas__[alias]);
      return;
    }

    self.__compiled__[alias].validate =
      self.__compiled__[self.__schemas__[alias]].validate;
    self.__compiled__[alias].normalize =
      self.__compiled__[self.__schemas__[alias]].normalize;
  });

  //
  // Fake record for guessed links
  //
  self.__compiled__[''] = { validate: null, normalize: createNormalizer() };

  //
  // Build schema condition
  //
  var slist = Object.keys(self.__compiled__)
                      .filter(function (name) {
                        // Filter disabled & fake schemas
                        return name.length > 0 && self.__compiled__[name];
                      })
                      .map(escapeRE)
                      .join('|');
  // (?!_) cause 1.5x slowdown
  self.re.schema_test   = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'i');
  self.re.schema_search = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'ig');

  self.re.pretest = RegExp(
    '(' + self.re.schema_test.source + ')|(' + self.re.host_fuzzy_test.source + ')|@',
    'i'
  );

  //
  // Cleanup
  //

  resetScanCache(self);
}

/**
 * class Match
 *
 * Match result. Single element of array, returned by [[LinkifyIt#match]]
 **/
function Match(self, shift) {
  var start = self.__index__,
      end   = self.__last_index__,
      text  = self.__text_cache__.slice(start, end);

  /**
   * Match#schema -> String
   *
   * Prefix (protocol) for matched string.
   **/
  this.schema    = self.__schema__.toLowerCase();
  /**
   * Match#index -> Number
   *
   * First position of matched string.
   **/
  this.index     = start + shift;
  /**
   * Match#lastIndex -> Number
   *
   * Next position after matched string.
   **/
  this.lastIndex = end + shift;
  /**
   * Match#raw -> String
   *
   * Matched string.
   **/
  this.raw       = text;
  /**
   * Match#text -> String
   *
   * Notmalized text of matched string.
   **/
  this.text      = text;
  /**
   * Match#url -> String
   *
   * Normalized url of matched string.
   **/
  this.url       = text;
}

function createMatch(self, shift) {
  var match = new Match(self, shift);

  self.__compiled__[match.schema].normalize(match, self);

  return match;
}


/**
 * class LinkifyIt
 **/

/**
 * new LinkifyIt(schemas, options)
 * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Creates new linkifier instance with optional additional schemas.
 * Can be called without `new` keyword for convenience.
 *
 * By default understands:
 *
 * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
 * - "fuzzy" links and emails (example.com, foo@bar.com).
 *
 * `schemas` is an object, where each key/value describes protocol/rule:
 *
 * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
 *   for example). `linkify-it` makes shure that prefix is not preceeded with
 *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
 * - __value__ - rule to check tail after link prefix
 *   - _String_ - just alias to existing rule
 *   - _Object_
 *     - _validate_ - validator function (should return matched length on success),
 *       or `RegExp`.
 *     - _normalize_ - optional function to normalize text & url of matched result
 *       (for example, for @twitter mentions).
 *
 * `options`:
 *
 * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
 * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
 *   like version numbers. Default `false`.
 * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
 *
 **/
function LinkifyIt(schemas, options) {
  if (!(this instanceof LinkifyIt)) {
    return new LinkifyIt(schemas, options);
  }

  if (!options) {
    if (isOptionsObj(schemas)) {
      options = schemas;
      schemas = {};
    }
  }

  this.__opts__           = assign({}, defaultOptions, options);

  // Cache last tested result. Used to skip repeating steps on next `match` call.
  this.__index__          = -1;
  this.__last_index__     = -1; // Next scan position
  this.__schema__         = '';
  this.__text_cache__     = '';

  this.__schemas__        = assign({}, defaultSchemas, schemas);
  this.__compiled__       = {};

  this.__tlds__           = tlds_default;
  this.__tlds_replaced__  = false;

  this.re = {};

  compile(this);
}


/** chainable
 * LinkifyIt#add(schema, definition)
 * - schema (String): rule name (fixed pattern prefix)
 * - definition (String|RegExp|Object): schema definition
 *
 * Add new rule definition. See constructor description for details.
 **/
LinkifyIt.prototype.add = function add(schema, definition) {
  this.__schemas__[schema] = definition;
  compile(this);
  return this;
};


/** chainable
 * LinkifyIt#set(options)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Set recognition options for links without schema.
 **/
LinkifyIt.prototype.set = function set(options) {
  this.__opts__ = assign(this.__opts__, options);
  return this;
};


/**
 * LinkifyIt#test(text) -> Boolean
 *
 * Searches linkifiable pattern and returns `true` on success or `false` on fail.
 **/
LinkifyIt.prototype.test = function test(text) {
  // Reset scan cache
  this.__text_cache__ = text;
  this.__index__      = -1;

  if (!text.length) { return false; }

  var m, ml, me, len, shift, next, re, tld_pos, at_pos;

  // try to scan for link with schema - that's the most simple rule
  if (this.re.schema_test.test(text)) {
    re = this.re.schema_search;
    re.lastIndex = 0;
    while ((m = re.exec(text)) !== null) {
      len = this.testSchemaAt(text, m[2], re.lastIndex);
      if (len) {
        this.__schema__     = m[2];
        this.__index__      = m.index + m[1].length;
        this.__last_index__ = m.index + m[0].length + len;
        break;
      }
    }
  }

  if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
    // guess schemaless links
    tld_pos = text.search(this.re.host_fuzzy_test);
    if (tld_pos >= 0) {
      // if tld is located after found link - no need to check fuzzy pattern
      if (this.__index__ < 0 || tld_pos < this.__index__) {
        if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {

          shift = ml.index + ml[1].length;

          if (this.__index__ < 0 || shift < this.__index__) {
            this.__schema__     = '';
            this.__index__      = shift;
            this.__last_index__ = ml.index + ml[0].length;
          }
        }
      }
    }
  }

  if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
    // guess schemaless emails
    at_pos = text.indexOf('@');
    if (at_pos >= 0) {
      // We can't skip this check, because this cases are possible:
      // 192.168.1.1@gmail.com, my.in@example.com
      if ((me = text.match(this.re.email_fuzzy)) !== null) {

        shift = me.index + me[1].length;
        next  = me.index + me[0].length;

        if (this.__index__ < 0 || shift < this.__index__ ||
            (shift === this.__index__ && next > this.__last_index__)) {
          this.__schema__     = 'mailto:';
          this.__index__      = shift;
          this.__last_index__ = next;
        }
      }
    }
  }

  return this.__index__ >= 0;
};


/**
 * LinkifyIt#pretest(text) -> Boolean
 *
 * Very quick check, that can give false positives. Returns true if link MAY BE
 * can exists. Can be used for speed optimization, when you need to check that
 * link NOT exists.
 **/
LinkifyIt.prototype.pretest = function pretest(text) {
  return this.re.pretest.test(text);
};


/**
 * LinkifyIt#testSchemaAt(text, name, position) -> Number
 * - text (String): text to scan
 * - name (String): rule (schema) name
 * - position (Number): text offset to check from
 *
 * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
 * at given position. Returns length of found pattern (0 on fail).
 **/
LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
  // If not supported schema check requested - terminate
  if (!this.__compiled__[schema.toLowerCase()]) {
    return 0;
  }
  return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
};


/**
 * LinkifyIt#match(text) -> Array|null
 *
 * Returns array of found link descriptions or `null` on fail. We strongly
 * recommend to use [[LinkifyIt#test]] first, for best speed.
 *
 * ##### Result match description
 *
 * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
 *   protocol-neutral  links.
 * - __index__ - offset of matched text
 * - __lastIndex__ - index of next char after mathch end
 * - __raw__ - matched text
 * - __text__ - normalized text
 * - __url__ - link, generated from matched text
 **/
LinkifyIt.prototype.match = function match(text) {
  var shift = 0, result = [];

  // Try to take previous element from cache, if .test() called before
  if (this.__index__ >= 0 && this.__text_cache__ === text) {
    result.push(createMatch(this, shift));
    shift = this.__last_index__;
  }

  // Cut head if cache was used
  var tail = shift ? text.slice(shift) : text;

  // Scan string until end reached
  while (this.test(tail)) {
    result.push(createMatch(this, shift));

    tail = tail.slice(this.__last_index__);
    shift += this.__last_index__;
  }

  if (result.length) {
    return result;
  }

  return null;
};


/** chainable
 * LinkifyIt#tlds(list [, keepOld]) -> this
 * - list (Array): list of tlds
 * - keepOld (Boolean): merge with current list if `true` (`false` by default)
 *
 * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
 * to avoid false positives. By default this algorythm used:
 *
 * - hostname with any 2-letter root zones are ok.
 * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
 *   are ok.
 * - encoded (`xn--...`) root zones are ok.
 *
 * If list is replaced, then exact match for 2-chars root zones will be checked.
 **/
LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
  list = Array.isArray(list) ? list : [ list ];

  if (!keepOld) {
    this.__tlds__ = list.slice();
    this.__tlds_replaced__ = true;
    compile(this);
    return this;
  }

  this.__tlds__ = this.__tlds__.concat(list)
                                  .sort()
                                  .filter(function (el, idx, arr) {
                                    return el !== arr[idx - 1];
                                  })
                                  .reverse();

  compile(this);
  return this;
};

/**
 * LinkifyIt#normalize(match)
 *
 * Default normalizer (if schema does not define it's own).
 **/
LinkifyIt.prototype.normalize = function normalize(match) {

  // Do minimal possible changes by default. Need to collect feedback prior
  // to move forward https://github.com/markdown-it/linkify-it/issues/1

  if (!match.schema) { match.url = 'http://' + match.url; }

  if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
    match.url = 'mailto:' + match.url;
  }
};


/**
 * LinkifyIt#onCompile()
 *
 * Override to modify basic RegExp-s.
 **/
LinkifyIt.prototype.onCompile = function onCompile() {
};


module.exports = LinkifyIt;


/***/ }),

/***/ "fdfe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Horizontal rule



var isSpace = __webpack_require__("0068").isSpace;


module.exports = function hr(state, startLine, endLine, silent) {
  var marker, cnt, ch, token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  marker = state.src.charCodeAt(pos++);

  // Check hr marker
  if (marker !== 0x2A/* * */ &&
      marker !== 0x2D/* - */ &&
      marker !== 0x5F/* _ */) {
    return false;
  }

  // markers can be mixed with spaces, but there should be at least 3 of them

  cnt = 1;
  while (pos < max) {
    ch = state.src.charCodeAt(pos++);
    if (ch !== marker && !isSpace(ch)) { return false; }
    if (ch === marker) { cnt++; }
  }

  if (cnt < 3) { return false; }

  if (silent) { return true; }

  state.line = startLine + 1;

  token        = state.push('hr', 'hr', 0);
  token.map    = [ startLine, state.line ];
  token.markup = Array(cnt + 1).join(String.fromCharCode(marker));

  return true;
};


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map