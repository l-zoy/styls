var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import * as React from "react";
import React__default, { useState, useEffect, Profiler } from "react";
import ReactDOMServer from "react-dom/server.js";
import { StaticRouter } from "react-router-dom/server.mjs";
import { useTranslation, initReactI18next, I18nextProvider } from "react-i18next";
import { NavLink, useLocation, useNavigate, Outlet, useSearchParams, Link as Link$1, Routes, Route } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.js";
import styled$2 from "@emotion/styled";
import { styled as styled$3 } from "@stitches/react";
import styled$4 from "styled-components";
import { stringify } from "@stitches/stringify";
import { interpolateRdPu, interpolateBuPu, interpolatePurples } from "d3-scale-chromatic";
import i18n from "i18next";
function createSelector(styles) {
  let stringify2 = "";
  const stack = [{
    ...styles
  }];
  while (stack.length !== 0) {
    const node = stack.shift();
    const keys = Object.keys(node);
    const {
      length
    } = keys;
    for (let i = length - 1; i >= 0; i--) {
      const key = keys[i];
      if (typeof node[key] === "object") {
        stack.push(node[key]);
        stringify2 += key;
        continue;
      }
      stringify2 += `${key}${node[key]}`;
    }
  }
  let index = 0;
  let value = 11;
  while (index < stringify2.length) {
    value = 101 * value + stringify2.charCodeAt(index++) >>> 0;
  }
  return value;
}
class StyleSheet {
  constructor(options) {
    __publicField(this, "alreadyInsertedOrderInsensitiveRule", false);
    __publicField(this, "insertIndex", 0);
    __publicField(this, "speedy");
    __publicField(this, "tags", []);
    __publicField(this, "container");
    __publicField(this, "nonce");
    __publicField(this, "key");
    __publicField(this, "ssrData", "");
    __publicField(this, "ssrGlobalData", "");
    this.speedy = options.speedy;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
  }
  insertTag(tag) {
    let before = null;
    if (this.tags.length !== 0) {
      before = this.tags[this.tags.length - 1].nextSibling;
    }
    this.container.insertBefore(tag, before);
    this.tags.push(tag);
  }
  insertStyle({
    ruleCode,
    segmentRuleCode
  }, global2 = false) {
    if (this.container) {
      if (this.speedy) {
        const ruleIndexs = [];
        for (let index = 0; index < segmentRuleCode.length; index++) {
          ruleIndexs.push(this.insert(segmentRuleCode[index]));
        }
        return ruleIndexs;
      }
      return [this.insert(ruleCode)];
    }
    this[global2 ? "ssrGlobalData" : "ssrData"] += ruleCode;
  }
  insert(rule) {
    if (this.insertIndex % (this.speedy ? 65e3 : 1) === 0) {
      const tag2 = document.createElement("style");
      tag2.setAttribute("data-styils", this.key);
      if (this.nonce !== void 0) {
        tag2.setAttribute("nonce", this.nonce);
      }
      tag2.appendChild(document.createTextNode(""));
      this.insertTag(tag2);
    }
    const tagIndex = this.tags.length - 1;
    const tag = this.tags[tagIndex];
    let oldRule;
    if (this.speedy) {
      try {
        oldRule = {
          tag,
          index: tag.sheet.insertRule(rule, tag.sheet.cssRules.length),
          tagIndex
        };
      } catch (error) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
      oldRule = {
        tag,
        index: tagIndex
      };
    }
    this.insertIndex++;
    return oldRule;
  }
  flushSingle({
    tag,
    index
  }) {
    if (this.speedy) {
      tag.sheet.deleteRule(index);
    } else {
      this.container.removeChild(tag);
      this.tags.splice(index, 1);
    }
  }
  flush(type = "all") {
    this.tags.forEach((tag) => tag.parentNode && tag.parentNode.removeChild(tag));
    if (type !== "global") {
      this.ssrGlobalData = "";
    }
    this.ssrData = "";
    this.tags = [];
    this.insertIndex = 0;
  }
}
const unitProps = /* @__PURE__ */ new Set(["animationDelay", "animationDuration", "backgroundSize", "blockSize", "border", "borderBlock", "borderBlockEnd", "borderBlockEndWidth", "borderBlockStart", "borderBlockStartWidth", "borderBlockWidth", "borderBottom", "borderBottomLeftRadius", "borderBottomRightRadius", "borderBottomWidth", "borderEndEndRadius", "borderEndStartRadius", "borderInlineEnd", "borderInlineEndWidth", "borderInlineStart", "borderInlineStartWidth", "borderInlineWidth", "borderLeft", "borderLeftWidth", "borderRadius", "borderRight", "borderRightWidth", "borderSpacing", "borderStartEndRadius", "borderStartStartRadius", "borderTop", "borderTopLeftRadius", "borderTopRightRadius", "borderTopWidth", "borderWidth", "bottom", "columnGap", "columnRule", "columnRuleWidth", "columnWidth", "containIntrinsicSize", "flexBasis", "fontSize", "gap", "gridAutoColumns", "gridAutoRows", "gridTemplateColumns", "gridTemplateRows", "height", "inlineSize", "inset", "insetBlock", "insetBlockEnd", "insetBlockStart", "insetInline", "insetInlineEnd", "insetInlineStart", "left", "letterSpacing", "margin", "marginBlock", "marginBlockEnd", "marginBlockStart", "marginBottom", "marginInline", "marginInlineEnd", "marginInlineStart", "marginLeft", "marginRight", "marginTop", "maxBlockSize", "maxHeight", "maxInlineSize", "maxWidth", "minBlockSize", "minHeight", "minInlineSize", "minWidth", "offsetDistance", "offsetRotate", "outline", "outlineOffset", "outlineWidth", "overflowClipMargin", "padding", "paddingBlock", "paddingBlockEnd", "paddingBlockStart", "paddingBottom", "paddingInline", "paddingInlineEnd", "paddingInlineStart", "paddingLeft", "paddingRight", "paddingTop", "perspective", "right", "rowGap", "scrollMargin", "scrollMarginBlock", "scrollMarginBlockEnd", "scrollMarginBlockStart", "scrollMarginBottom", "scrollMarginInline", "scrollMarginInlineEnd", "scrollMarginInlineStart", "scrollMarginLeft", "scrollMarginRight", "scrollMarginTop", "scrollPadding", "scrollPaddingBlock", "scrollPaddingBlockEnd", "scrollPaddingBlockStart", "scrollPaddingBottom", "scrollPaddingInline", "scrollPaddingInlineEnd", "scrollPaddingInlineStart", "scrollPaddingLeft", "scrollPaddingRight", "scrollPaddingTop", "shapeMargin", "textDecoration", "textDecorationThickness", "textIndent", "textUnderlineOffset", "top", "transitionDelay", "transitionDuration", "verticalAlign", "width", "wordSpacing"]);
const contentValuePattern = /(var|attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
const contentValues = {
  normal: "normal",
  none: "none",
  initial: "initial",
  inherit: "inherit",
  unset: "unset"
};
function ruleToNative(key, value) {
  if (unitProps.has(key) && typeof value === "number") {
    value = `${value}px`;
  }
  key = /^--/.test(key) ? key : key.replace(/[A-Z]/g, "-$&").toLowerCase();
  if (key === "content" && !contentValuePattern.test(value) && !contentValues[value]) {
    try {
      value = JSON.stringify(value).replace(/\\\\/g, "\\");
    } catch {
    }
  }
  return `${key}:${value};`;
}
function transformKey(property, selector = "") {
  if (property === ":global") {
    return "";
  }
  return selector ? selector.replace(/([^,])+/g, (sel) => {
    return property.replace(/(^:.*)|([^,])+/g, (key) => {
      return /&/.test(key) ? key.replace(/&/g, sel) : `${sel} ${key}`;
    });
  }) : property;
}
function transformSpecial(atRule, selector) {
  let blocks = "";
  let rule = "";
  const keys = Object.keys(atRule);
  const {
    length
  } = keys;
  for (let index = 0; index < length; index++) {
    const key = keys[index];
    const value = atRule[key];
    if (typeof value === "object") {
      blocks += key.charCodeAt(0) === 64 ? `${key}{${transformSpecial(value, selector)}}` : transformSpecial(value, transformKey(key, selector));
    } else if (value !== void 0) {
      rule += ruleToNative(key, value);
    }
  }
  rule = selector && rule ? `${selector}{${rule}}` : rule;
  return `${rule}${blocks}`;
}
function parseRules(node, rootSelector = "") {
  const nodes = [rootSelector];
  const stack = [{
    ...node
  }];
  const commonRules = [];
  const frontRules = [];
  const rearRules = [];
  while (stack.length) {
    const item = stack.shift();
    const selector = nodes.shift();
    const keys = Object.keys(item);
    const {
      length
    } = keys;
    let rule = "";
    let insertsNumber = 0;
    for (let num = 0; num < length; num++) {
      const key = keys[num];
      const value = item[key];
      if (key.charCodeAt(0) === 64) {
        switch (key.charCodeAt(1)) {
          case 110:
          case 105:
            frontRules.push(`${key} ${value};`);
            continue;
          case 102:
            frontRules.push(transformSpecial({
              [key]: value
            }));
            continue;
          case 115:
          case 109:
            rearRules.push(transformSpecial({
              [key]: value
            }, selector));
            continue;
          default:
            rearRules.push(transformSpecial({
              [key]: value
            }));
            continue;
        }
      } else if (value !== null && typeof value === "object" && value.constructor === Object) {
        const currentKey = transformKey(key, selector);
        stack.splice(insertsNumber, 0, value);
        nodes.splice(insertsNumber, 0, currentKey);
        insertsNumber++;
      } else if (value !== void 0 && value !== null) {
        rule += ruleToNative(key, value);
      }
    }
    if (rule) {
      const block = selector ? `${selector}{${rule}}` : rule;
      commonRules.push(block);
    }
  }
  const segmentRuleCode = [.../* @__PURE__ */ new Set([...frontRules, ...commonRules, ...rearRules])];
  return {
    segmentRuleCode,
    ruleCode: segmentRuleCode.join("")
  };
}
function createSystem(options = {}) {
  const splitSymbol = "|";
  const isBrowser = !!globalThis.document;
  const selectorCache = /* @__PURE__ */ new Set([]);
  const globalCache = {};
  const {
    theme: inputTheme = () => ({}),
    defaultMode = "none",
    sheetOptions = {}
  } = options;
  const {
    key = "css",
    container,
    speedy,
    nonce
  } = sheetOptions;
  const globalMode = {
    mode: defaultMode
  };
  const metaHtml = isBrowser ? document.querySelector(`meta[name="styils-cache"]`) : null;
  if (isBrowser && !selectorCache.size && metaHtml) {
    metaHtml.content.split(splitSymbol).forEach((name) => {
      selectorCache.add(name);
    });
  }
  const sheet = new StyleSheet({
    key,
    speedy: speedy === void 0 ? true : speedy,
    container: isBrowser ? container != null ? container : document.head : null,
    nonce
  });
  const themeContent = React.createContext(
    {}
  );
  const SystemProvider2 = (props) => {
    const [mode, setMode] = React.useState(defaultMode);
    const updataMode = (value) => {
      setMode(value);
      globalMode.mode = value;
    };
    return React.createElement(themeContent.Provider, {
      value: {
        mode,
        setMode: updataMode,
        theme: inputTheme(mode)
      }
    }, props.children);
  };
  const useSystem2 = () => React.useContext(themeContent);
  let modeIdentifier = [];
  let withIndex = 0;
  const styled2 = (tag, styles, interpolation) => {
    var _a;
    let inputTag = tag;
    const inputNamespace = (_a = tag.namespace) != null ? _a : "";
    if (typeof tag === "object" && tag.tag) {
      inputTag = tag.tag;
    }
    const currentWithIndex = withIndex;
    function createRule(mode, inputTargetInfo) {
      var _a2;
      const identifier = (_a2 = modeIdentifier[currentWithIndex]) == null ? void 0 : _a2[mode];
      if (identifier) {
        const {
          namespaceJoiner: namespaceJoiner2,
          targetClassName: targetClassName2
        } = identifier;
        inputTargetInfo.namespaceJoiner = namespaceJoiner2;
        inputTargetInfo.targetClassName = targetClassName2;
        return;
      }
      const theme2 = inputTheme(mode);
      const style = typeof styles === "function" ? styles(theme2, mode) : styles;
      const variants = typeof interpolation === "function" ? interpolation(theme2, mode) : interpolation;
      const selector = `${key}-${createSelector(style)}`;
      let targetClassName = selector;
      let namespaceJoiner = "";
      if (inputNamespace) {
        targetClassName = `${inputNamespace}-${selector}`;
        namespaceJoiner = `${inputNamespace}-`;
      }
      const rules = {
        segmentRuleCode: [],
        ruleCode: ""
      };
      if (!selectorCache.has(targetClassName)) {
        selectorCache.add(targetClassName);
        const {
          segmentRuleCode,
          ruleCode
        } = parseRules(style, `.${targetClassName}`);
        rules.ruleCode = ruleCode;
        rules.segmentRuleCode = segmentRuleCode;
      }
      if (variants) {
        const variantsKeys = Object.keys(variants);
        let variantsIndex = variantsKeys.length;
        while (variantsIndex--) {
          const variantsKey = variantsKeys[variantsIndex];
          const variantsValue = variants[variantsKey];
          const variantsChildKeys = Object.keys(variantsValue);
          let variantsChildIndex = variantsChildKeys.length;
          while (variantsChildIndex--) {
            const key2 = variantsChildKeys[variantsChildIndex];
            const value = variantsValue[key2];
            const variantsClassName = `${targetClassName}.${namespaceJoiner}${variantsKey}-${key2}`;
            if (!selectorCache.has(variantsClassName)) {
              selectorCache.add(variantsClassName);
              const {
                segmentRuleCode,
                ruleCode
              } = parseRules(value, `.${variantsClassName}`);
              rules.ruleCode += ruleCode;
              rules.segmentRuleCode.push(...segmentRuleCode);
            }
          }
        }
      }
      if (rules.ruleCode || rules.segmentRuleCode.length) {
        sheet.insertStyle(rules);
      }
      inputTargetInfo.targetClassName = targetClassName;
      inputTargetInfo.namespaceJoiner = namespaceJoiner;
      if (!modeIdentifier[currentWithIndex]) {
        modeIdentifier[currentWithIndex] = {};
      }
      modeIdentifier[currentWithIndex][mode] = {
        targetClassName,
        namespaceJoiner
      };
      withIndex++;
    }
    const targetInfo = {
      targetClassName: "",
      namespaceJoiner: ""
    };
    createRule(defaultMode, targetInfo);
    const styledComponent = React.forwardRef((props, ref) => {
      const {
        as = inputTag,
        className = "",
        variants: variantsProps,
        ...rest
      } = props;
      let variantsClassName = "";
      const {
        mode
      } = useSystem2();
      if (mode !== void 0) {
        createRule(mode, targetInfo);
      }
      if (variantsProps) {
        const variantsPropsKeys = Object.keys(variantsProps);
        let variantsPropsIndex = variantsPropsKeys.length;
        while (variantsPropsIndex--) {
          const key2 = variantsPropsKeys[variantsPropsIndex];
          const value = variantsProps[key2];
          if (value !== void 0 && value !== null) {
            variantsClassName += ` ${targetInfo.namespaceJoiner}${key2}-${value}`;
          }
        }
      }
      return React.createElement(as, {
        className: `${className ? className + " " : className}${targetInfo.targetClassName}${variantsClassName}`,
        ref,
        ...rest
      });
    });
    Object.defineProperty(styledComponent, "toString", {
      value() {
        createRule(globalMode.mode, targetInfo);
        return `.${targetInfo.targetClassName}`;
      }
    });
    return styledComponent;
  };
  function createExtracts2() {
    var _a, _b;
    const styleHtml = isBrowser ? document.querySelector(`style[data-styils="${sheet.key}-ssr"]`) : null;
    const styleGlobalHtml = isBrowser ? document.querySelector(`style[data-styils="${sheet.key}-ssr-global"]`) : null;
    const ssrGlobalData = sheet.ssrGlobalData || ((_a = styleGlobalHtml == null ? void 0 : styleGlobalHtml.textContent) != null ? _a : "");
    const ssrData = sheet.ssrData || ((_b = styleHtml == null ? void 0 : styleHtml.textContent) != null ? _b : "");
    const selectorCacheString = [...selectorCache].join(splitSymbol);
    const extractHtml = `<meta name="styils-cache" mode="${globalMode.mode}" content="${selectorCacheString}">
     <style data-styils="${sheet.key}-ssr-global">${ssrGlobalData}</style>
     <style data-styils="${sheet.key}-ssr">${ssrData}</style>`;
    const extractElement = React.createElement(React.Fragment, {}, React.createElement("meta", {
      name: "styils-cache",
      mode: globalMode.mode,
      content: selectorCacheString
    }), React.createElement("style", {
      "data-styils": `${sheet.key}-ssr-global`,
      dangerouslySetInnerHTML: {
        __html: ssrGlobalData
      }
    }), React.createElement("style", {
      "data-styils": `${sheet.key}-ssr`,
      dangerouslySetInnerHTML: {
        __html: ssrData
      }
    }));
    return {
      extractHtml,
      extractElement
    };
  }
  const keyframes2 = (style) => {
    const selector = `${key}-${createSelector(style)}`;
    if (!selectorCache.has(selector)) {
      selectorCache.add(selector);
      const rules = parseRules({
        [`@keyframes ${selector}`]: style
      });
      sheet.insertStyle(rules, true);
    }
    return selector;
  };
  const global2 = (styles) => {
    let oldRule;
    function createGlobRules(mode) {
      if (oldRule) {
        const tagIndex = [];
        oldRule.forEach((rule) => {
          if (!tagIndex[rule.tagIndex])
            tagIndex[rule.tagIndex] = 0;
          sheet.flushSingle({
            tag: rule.tag,
            index: sheet.speedy ? rule.index - tagIndex[rule.tagIndex] : rule.index
          });
          tagIndex[rule.tagIndex]++;
        });
        oldRule = void 0;
      }
      if (isBrowser && metaHtml && mode === metaHtml.getAttribute("mode")) {
        return;
      }
      let rules;
      const cache = globalCache[mode];
      if (globalCache[mode]) {
        rules = cache;
      } else {
        const style = typeof styles === "function" ? styles(inputTheme(mode), mode) : styles;
        rules = parseRules(style);
        globalCache[mode] = rules;
      }
      oldRule = sheet.insertStyle(rules, true);
    }
    createGlobRules(globalMode.mode);
    Object.defineProperty(globalMode, "mode", {
      set(value) {
        this.value = value;
        createGlobRules(value);
      },
      get() {
        var _a;
        return (_a = this.value) != null ? _a : defaultMode;
      }
    });
  };
  function flush2(type = "all") {
    sheet.flush(type);
    selectorCache.clear();
    modeIdentifier = [];
  }
  return {
    styled: styled2,
    SystemProvider: SystemProvider2,
    useSystem: useSystem2,
    createExtracts: createExtracts2,
    flush: flush2,
    global: global2,
    keyframes: keyframes2
  };
}
const {
  styled: styled$1,
  createExtracts: createExtracts$1,
  flush: flush$1,
  global: global$1,
  keyframes: keyframes$1
} = createSystem();
const {
  styled,
  SystemProvider,
  createExtracts,
  global,
  useSystem,
  flush,
  keyframes
} = createSystem({
  theme: (mode) => {
    return {
      dark: {
        codeBg: "#36344943",
        bgColor: "#242424",
        bgSecondColor: "rgba(255, 255, 255, 0.05)",
        mainColor: "#fff",
        secondColor: "rgba(235, 235, 235, 0.6)",
        boxShadow: "0 2px 8px 2px rgb(104 112 118 / 0.07), 0 2px 4px -1px rgb(104 112 118 / 0.04)"
      },
      light: {
        codeBg: "#363449",
        bgColor: "#fff",
        mainColor: "rgb(33, 53, 71)",
        secondColor: "#687076",
        bgSecondColor: "rgba(255, 255, 255, 0.05)",
        boxShadow: "0 2px 8px 2px rgb(104 112 118 / 0.07), 0 2px 4px -1px rgb(104 112 118 / 0.04)"
      }
    }[mode];
  },
  defaultMode: "light"
});
const LogoSvg = "/styils/assets/logo.20634932.svg";
const StyilSvg = "/styils/assets/styils.63e6c146.svg";
const quickSvg = "/styils/assets/quick.1d72984f.svg";
const copySvg = "/styils/assets/copy.a9c4b378.svg";
const sizeSvg = "/styils/assets/size.132f07ad.svg";
const themeSvg = "/styils/assets/theme.a471f129.svg";
const okSvg = "/styils/assets/ok.788c6d4f.svg";
const tyoeSvg = "/styils/assets/tyoe.81ff625a.svg";
const reactSvg = "/styils/assets/react.96fb259d.svg";
const vueSvg = "/styils/assets/vue.9af44452.svg";
const htmlSvg = "/styils/assets/html.f50ec28c.svg";
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String("abc");
    test1[5] = "de";
    if (Object.getOwnPropertyNames(test1)[0] === "5") {
      return false;
    }
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2["_" + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
      return test2[n2];
    });
    if (order2.join("") !== "0123456789") {
      return false;
    }
    var test3 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
shouldUseNative() ? Object.assign : function(target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
};
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = React__default, g = 60103;
reactJsxRuntime_production_min.Fragment = 60107;
if ("function" === typeof Symbol && Symbol.for) {
  var h = Symbol.for;
  g = h("react.element");
  reactJsxRuntime_production_min.Fragment = h("react.fragment");
}
var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, k) {
  var b, d = {}, e = null, l = null;
  void 0 !== k && (e = "" + k);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (l = a.ref);
  for (b in a)
    n.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: g, type: c, key: e, ref: l, props: d, _owner: m.current };
}
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
(function(module) {
  {
    module.exports = reactJsxRuntime_production_min;
  }
})(jsxRuntime);
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const Fragment = jsxRuntime.exports.Fragment;
const SwitchWapper = styled("label", (theme2) => ({
  zIndex: 2,
  position: "relative",
  borderRadius: 28,
  overflow: "hidden",
  backdropFilter: "saturate(180%) blur(14px)",
  boxShadow: theme2.boxShadow,
  "& input": {
    cursor: "pointer",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0,
    width: "100%",
    height: "100%",
    zIndex: 2,
    border: "none",
    appearance: "none"
  }
}));
const SwitchChecked = styled("div", () => ({
  position: "relative",
  width: 68,
  height: 38,
  background: "#e6e8eb8d",
  zIndex: 0,
  margin: 0,
  padding: 0,
  appearance: "none",
  border: 0,
  transition: "all 0.3s",
  "&::after": {
    position: "absolute",
    left: 6,
    top: 6,
    width: 26,
    height: 26,
    borderRadius: "50%",
    transition: "all 0.3s",
    lineHeight: "26px",
    textAlign: "center"
  }
}), (theme2) => {
  return {
    checked: {
      true: {
        backgroundColor: theme2.bgSecondColor,
        "&::after": {
          transform: "translateX(30px)",
          content: "\u{1F31B}",
          backgroundColor: theme2.bgSecondColor
        }
      },
      false: {
        "&::after": {
          backgroundColor: "#fff",
          content: "\u2600\uFE0F"
        }
      }
    }
  };
});
function Switch({
  checked,
  onChange
}) {
  const [isChecked, setIsChecked] = useState(checked);
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);
  function onInputChange(e) {
    const value = e.target.checked;
    setIsChecked(value);
    if (!onChange) {
      return;
    }
    onChange(value);
  }
  return /* @__PURE__ */ jsxs(SwitchWapper, {
    children: [/* @__PURE__ */ jsx("input", {
      type: "checkbox",
      checked: isChecked,
      onChange: onInputChange
    }), /* @__PURE__ */ jsx(SwitchChecked, {
      variants: {
        checked: `${isChecked}`
      }
    })]
  });
}
const CardBox = styled("div", (theme2) => ({
  backdropFilter: "saturate(180%) blur(14px)",
  background: "rgba(255, 255, 255, 0.05)",
  boxShadow: "0 2px 8px 2px rgb(104 112 118 / 0.07), 0 2px 4px -1px rgb(104 112 118 / 0.04);",
  borderRadius: "14px",
  display: "flex",
  flexDirection: "column",
  padding: 24,
  color: theme2.secondColor
}));
const CardHeader = styled("section", (theme2) => ({
  display: "flex",
  alignItems: "center",
  paddingBottom: 16,
  "& div": {
    width: 40,
    height: 40,
    flexShrink: 0,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF0FB",
    "& img": {
      height: "60%",
      width: "60%"
    }
  },
  "& span": {
    marginLeft: 16,
    fontWeight: 500,
    color: theme2.mainColor
  }
}));
function Card(props) {
  const {
    icon,
    name,
    children
  } = props;
  return /* @__PURE__ */ jsxs(CardBox, {
    children: [/* @__PURE__ */ jsxs(CardHeader, {
      children: [/* @__PURE__ */ jsx("div", {
        children: icon
      }), /* @__PURE__ */ jsx("span", {
        children: name
      })]
    }), children]
  });
}
const CodeRoot = styled("div", () => ({
  maxWidth: 1280,
  width: "55%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  paddingBottom: 64,
  transition: "width .3s",
  "@media screen and (max-width: 1080px)": {
    width: "100%"
  }
}), {
  padding: {
    false: {
      paddingBottom: 14
    }
  }
});
const Code = styled("div", (theme2) => ({
  display: "inline-block",
  borderRadius: 14,
  fontSize: 14,
  padding: "15px 20px 20px",
  margin: 0,
  wordBreak: "normal",
  overflowX: "auto",
  color: "#fff",
  background: theme2.codeBg
}));
const CodeHeader = styled("div", () => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 16,
  "& section:first-child": {
    display: "flex",
    alignItems: "center",
    "& div": {
      width: 14,
      height: 14,
      borderRadius: "50%",
      marginRight: 10
    },
    "& div:nth-child(1)": {
      backgroundColor: "#F31260"
    },
    "& div:nth-child(2)": {
      backgroundColor: "#F5A524"
    },
    "& div:nth-child(3)": {
      backgroundColor: "#17C964"
    }
  },
  "& section:last-child": {
    "& > img": {
      float: "left",
      padding: "4px 8px",
      borderRadius: 6,
      margin: "0 10px",
      width: 18,
      height: 18,
      backgroundColor: "rgba(0,0,0,0.1)"
    }
  }
}));
const CodeWeapper = styled("div", () => ({
  paddingBottom: 14,
  "& h2": {
    marginBottom: 6
  },
  "& strong": {
    color: "#fb304f",
    padding: 4
  },
  "& a": {
    padding: "2px 12px",
    margin: "0 8px",
    backgroundColor: "rgba(117, 63, 131, 0.07)",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: "bold"
  },
  "& p": {
    lineHeight: 1.75,
    "&::before": {
      content: "-",
      padding: "0 8px"
    }
  }
}));
const StyilCode = ({
  children,
  code,
  disabledType,
  variants = {
    padding: void 0
  }
}) => {
  const {
    t
  } = useTranslation();
  const variantsCode2 = `import { styled } from '@styils/react'

const Button = styled(
  'button',
  {
    fontSize: 14
  },
  // ${t("variantsCode")}
  {
    size: {
      small: {
        fontSize: 12
      },
      large: {
        fontSize: 16
      }
    }
  }
)

render(<Button variants={{ size: 'small' }}>Button</Button>)
`;
  const themeCode2 = `import { createSystem } from '@styils/react'

const { styled, SystemProvider, useSystem } = createSystem({
  theme(mode) {
    return {
      color: mode === 'light' ? '#333' : '#fff',
      ...other // ${t("themeCode")}
    }
  }
})

const Button = styled('div', (theme) => {
  return {
    color: theme.color
  }
})

render(() => {
  const { mode, setMode, theme } = useSystem()

  return (
    <SystemProvider>
      <Button onClick={() => setMode('dark')}>hello styils {mode}</Button>
    </SystemProvider>
  )
})`;
  const errorCode2 = `const Side = styled('div', () => ({
  transform: translateX(\`\${props.move}px\`);
}))

function foo() {
  // ${t("errorCode")}
  const [move, setMove] = useState(0)
  return <Side move={move} />
}`;
  const baseCode2 = `import { styled } from '@styils/react';

// ${t("baseCode.1")}
const Image = styled({tag:'img',namespce:'label'},{ ... })

const Button = styled('button', {
  // ${t("baseCode.2")}
  ':global':{
    body:{
      ...
    },
  }
  fontSize: '13px',
  padding: '10px 15px',
  '&:hover': {
    fontSize: 18, // ${t("baseCode.3")}
  },
  '& .foo':{
    ...
  },
  [\`& \${Image}\`]:{
    ...
  }
});

render(<Button as="a" href="google.com"><Image/></Button>)
`;
  const ssrBaseCode = `import React from 'react'
import { createExtracts } from '@styils/react'
// or import { createExtracts } from 'yours-path'

const app = renderToString(
  <App />
)

const { extractHtml } = createExtracts()

res
  .status(200)
  .header('Content-Type', 'text/html')
  .send(\`<!DOCTYPE html>
<html lang="en">
  <head>
      \${extractHtml}
      ...other
  </head>
  <body>
    ...app
  </body>
</html>\`);
`;
  const ssrCode = `import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { createExtracts } from '@styils/react'
// or import { createExtracts } from 'yours-path'

export default class Document extends NextDocument {
  const { extractElement } = createExtracts()

  render() {
    return (
      <Html lang="en">
        <Head>
          {extractElement}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

`;
  const keyframesCode = `const Foo = styled('div',{
  '@keyframes superAnimation': {
    '11.1%': {
      opacity: '0.9999'
    },
    '111%': {
      opacity: '1'
    }
  }
})
// or
import { keyframes } from '@styils/react'

const out = keyframes({
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
})

const Foo = styled('div',{
  animation: \`13s ease 1.5s infinite none running \${out}\`
})
,
`;
  const globalCode2 = `import { global, SystemProvider } from '@styils/react'

global({
  body: {
    backgroundColor: 'red'
  }
})
// or
global((theme) => ({
  body: {
    backgroundColor: theme.color
  }
}))
// or
const Foo = styled('div',{
  // ${t("globalCode")}
  ':global':{
    body: { backgroundColor: 'red' }
  }
}
`;
  const mediaCode = `const Root = styled('div', {
  maxWidth: 1280,
  margin: '0 auto',
  minHeight: '100vh',
  padding: '0 64px',
  transition: 'padding .3s',
  '@media screen and (max-width: 900px)': {
    padding: '0 28px'
  }
})
`;
  const codes = {
    ssrBaseCode,
    mediaCode,
    globalCode: globalCode2,
    baseCode: baseCode2,
    ssrCode,
    keyframesCode,
    errorCode: errorCode2,
    themeCode: themeCode2,
    variantsCode: variantsCode2
  };
  const codeRef = React__default.createRef();
  React__default.useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [codeRef]);
  return /* @__PURE__ */ jsxs(CodeRoot, {
    variants,
    children: [/* @__PURE__ */ jsx(CodeWeapper, {
      children
    }), /* @__PURE__ */ jsxs(Code, {
      children: [/* @__PURE__ */ jsxs(CodeHeader, {
        children: [/* @__PURE__ */ jsxs("section", {
          children: [/* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsx("div", {})]
        }), !disabledType && /* @__PURE__ */ jsxs("section", {
          children: [/* @__PURE__ */ jsx("img", {
            src: htmlSvg,
            alt: "html"
          }), /* @__PURE__ */ jsx("img", {
            src: reactSvg,
            alt: "react"
          }), /* @__PURE__ */ jsx("img", {
            src: vueSvg,
            alt: "vue"
          })]
        })]
      }), /* @__PURE__ */ jsx("pre", {
        children: /* @__PURE__ */ jsx("code", {
          className: "language-jsx",
          ref: codeRef,
          children: codes[code]
        })
      })]
    })]
  });
};
const complex = keyframes({
  "0%": {
    transform: "translateY(0px)"
  },
  "30%": {
    transform: "translateY(-10px)"
  },
  "50%": {
    transform: "translateY(4px)"
  },
  "70%": {
    transform: "translateY(-15px)"
  },
  "100%": {
    transform: "translateY(0px)"
  }
});
const Logo = styled("img", {
  zIndex: 1,
  width: 200,
  height: 240,
  transition: "all .3s",
  filter: "drop-shadow(0px 8px 6px rgba(26,58,70,0.8))"
});
const Styils = styled("img", {
  display: "block",
  height: 65,
  width: 295,
  marginRight: 8,
  marginBottom: 12,
  "@media screen and (max-width: 1000px)": {
    height: 50,
    width: 220
  }
});
const SupportLabel = styled("section", (theme2) => {
  return {
    zIndex: 2,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    marginRight: 32,
    color: theme2.secondColor,
    borderRadius: 12,
    padding: "10px 15px",
    backdropFilter: "saturate(180%) blur(84px)",
    backgroundColor: theme2.bgSecondColor,
    "& img": {
      height: 30,
      width: 30
    },
    "& span": {
      paddingLeft: 6
    }
  };
});
const LogoWapper = styled("section", (theme2) => ({
  position: "relative",
  width: "46%",
  height: 399,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:after": {
    position: "absolute",
    borderRadius: "51%",
    height: "65%",
    width: "80%",
    left: "50%",
    transform: "translateX(-50%)",
    content: "",
    backgroundImage: "linear-gradient(-45deg, #fb304f 50%,#00e155 50% )",
    filter: "blur(62px)",
    opacity: 0.6
  },
  "& > *": {
    userSelect: "none"
  },
  [`& ${Logo}`]: {
    animation: `10s ease 0s infinite none running ${complex}`
  },
  [`& ${SwitchWapper}`]: {
    animation: `13s ease 1s infinite reverse none running ${complex}`,
    position: "absolute",
    right: "20%",
    boxShadow: theme2.boxShadow,
    top: 0
  },
  [`& ${SupportLabel}[datatype="react"]`]: {
    animation: `13s ease 1.5s infinite none running ${complex}`,
    boxShadow: theme2.boxShadow,
    top: 40,
    left: 40,
    "@media screen and (max-width: 580px)": {
      left: 20
    }
  },
  [`& ${SupportLabel}[datatype="html"]`]: {
    animation: `13s ease 0.5s infinite none running ${complex}`,
    boxShadow: theme2.boxShadow,
    left: 20,
    bottom: 70,
    fontSize: 24,
    "@media screen and (max-width: 580px)": {
      left: 0
    },
    "& img": {
      width: 40,
      height: 40
    }
  },
  [`& ${SupportLabel}[datatype="vue"]`]: {
    boxShadow: theme2.boxShadow,
    bottom: 0,
    right: 20,
    "@media screen and (max-width: 580px)": {
      right: 0
    }
  }
}));
const SloganWapper = styled("section", () => ({
  width: "50%"
}));
const PrimaryWapper = styled("section", () => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "48px 0 96px 0",
  "@media screen and (max-width: 1000px)": {
    flexWrap: "wrap",
    flexDirection: "column-reverse",
    alignItems: "center",
    padding: "48px 0 48px 0",
    [`& ${SloganWapper}`]: {
      width: "100%"
    },
    [`& ${LogoWapper}`]: {
      width: "100%",
      marginBottom: 36
    }
  }
}));
const CodeContent = styled("section", () => ({
  position: "relative"
}));
const Slogan = styled("section", () => ({
  fontSize: 36,
  fontWeight: 600,
  "@media screen and (max-width: 1000px)": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: 28,
    maxWidth: 600,
    margin: "0 auto"
  }
}));
const Introduce = styled("section", () => ({
  display: "flex",
  flexWrap: "wrap",
  margin: "0 -12px",
  [`& ${CardBox}`]: {
    margin: 12,
    width: "calc(100% / 4 - 72px)",
    "@media screen and (max-width: 1000px)": {
      width: "calc(100% / 2 - 72px)"
    },
    "@media screen and (max-width: 600px)": {
      width: "calc(100% - 72px)"
    }
  }
}));
const Button$8 = styled("button", (theme2) => ({
  textDecoration: "none",
  display: "inline-block",
  border: "none",
  textAlign: "center",
  fontWeight: 500,
  whiteSpace: "nowrap",
  transition: "color .25s,border-color .25s,background-color .25s",
  borderRadius: "12px",
  padding: "0 20px",
  lineHeight: "40px",
  fontSize: "14px",
  cursor: "pointer",
  color: theme2.secondColor,
  boxShadow: theme2.boxShadow,
  backgroundColor: theme2.bgSecondColor,
  "&:hover": {
    color: "#333",
    backgroundColor: "#e6e8eb"
  }
}));
const ButtonGroup = styled("section", () => ({
  paddingTop: 62,
  "@media screen and (max-width: 1000px)": {
    textAlign: "center",
    "& > div": {
      margin: "20px auto 0 auto"
    }
  },
  [`& ${Button$8}`]: {
    marginRight: 16,
    "&:first-child": {
      backgroundColor: "#fb304f",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#f90428"
      }
    }
  }
}));
const InstallBox = styled("div", (theme2) => ({
  width: "fit-content",
  padding: "0 20px",
  lineHeight: "40px",
  marginTop: 20,
  color: theme2.secondColor,
  backdropFilter: "saturate(180%) blur(10px)",
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  boxShadow: theme2.boxShadow,
  strong: {
    paddingRight: 10
  },
  "& img": {
    cursor: "pointer",
    display: "block",
    height: 18,
    width: 18,
    paddingLeft: 10
  }
}));
const Author = styled("section", (theme2) => ({
  position: "absolute",
  height: "100%",
  "@media screen and (max-width: 1080px)": {
    display: "none"
  },
  "& a": {
    fontSize: "14px",
    borderRadius: "12px",
    marginBottom: 14,
    display: "block",
    lineHeight: "40px",
    padding: "0 20px",
    textAlign: "center",
    color: theme2.secondColor,
    backgroundColor: theme2.bgSecondColor,
    boxShadow: theme2.boxShadow,
    transition: "all .3s",
    fontWeight: 500,
    "&:hover": {
      color: "#333",
      backgroundColor: "#e6e8eb"
    }
  },
  "& div": {
    top: 86,
    position: "sticky"
  }
}));
const Title = styled("h1", () => ({
  textAlign: "center",
  padding: 48
}));
function Home$6() {
  const installRef = React__default.useRef(null);
  const [copyCssIcon, setCopyCssIcon] = React__default.useState(copySvg);
  const [copyReactIcon, setCopyReactIcon] = React__default.useState(copySvg);
  const copyCss = React__default.useCallback(() => {
    navigator.clipboard.writeText(installRef.current.innerText).then(() => {
      setCopyCssIcon(okSvg);
      const timer = setTimeout(() => {
        setCopyCssIcon(copySvg);
        clearTimeout(timer);
      }, 1e3);
    });
  }, []);
  const copyReact = React__default.useCallback(() => {
    navigator.clipboard.writeText(installRef.current.innerText).then(() => {
      setCopyReactIcon(okSvg);
      const timer = setTimeout(() => {
        setCopyReactIcon(copySvg);
        clearTimeout(timer);
      }, 1e3);
    });
  }, []);
  const {
    t
  } = useTranslation();
  const {
    setMode,
    mode
  } = useSystem();
  const [check, setCheck] = React__default.useState(mode !== "light");
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs(PrimaryWapper, {
      children: [/* @__PURE__ */ jsxs(SloganWapper, {
        children: [/* @__PURE__ */ jsxs(Slogan, {
          children: [/* @__PURE__ */ jsx(Styils, {
            alt: "styils",
            src: StyilSvg
          }), /* @__PURE__ */ jsx("span", {
            children: t("slogan")
          })]
        }), /* @__PURE__ */ jsxs(ButtonGroup, {
          children: [/* @__PURE__ */ jsx(Button$8, {
            as: "a",
            href: "#quick",
            children: t("quick")
          }), /* @__PURE__ */ jsx(Button$8, {
            as: "a",
            href: "https://github.com/styils/styils",
            target: "_blank",
            children: t("github")
          }), /* @__PURE__ */ jsxs(InstallBox, {
            children: [/* @__PURE__ */ jsx("strong", {
              children: "$"
            }), /* @__PURE__ */ jsx("pre", {
              ref: installRef,
              children: "npm install @styils/react"
            }), /* @__PURE__ */ jsx("img", {
              src: copyReactIcon,
              alt: "copy",
              onClick: () => copyReact(),
              "aria-hidden": "true"
            })]
          }), /* @__PURE__ */ jsxs(InstallBox, {
            children: [/* @__PURE__ */ jsx("strong", {
              children: "$"
            }), /* @__PURE__ */ jsx("pre", {
              ref: installRef,
              children: "npm install @styils/css"
            }), /* @__PURE__ */ jsx("img", {
              src: copyCssIcon,
              alt: "copy",
              onClick: () => copyCss(),
              "aria-hidden": "true"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs(LogoWapper, {
        children: [/* @__PURE__ */ jsx(Logo, {
          alt: "styils-logo",
          src: LogoSvg
        }), /* @__PURE__ */ jsx(Switch, {
          checked: check,
          onChange: (value) => {
            const mode2 = value ? "dark" : "light";
            setCheck(value);
            setMode(mode2);
            localStorage.setItem("styils-theme-mode", mode2);
          }
        }), /* @__PURE__ */ jsxs(SupportLabel, {
          datatype: "html",
          children: [/* @__PURE__ */ jsx("img", {
            src: htmlSvg,
            alt: "html"
          }), /* @__PURE__ */ jsx("span", {
            children: "Html"
          })]
        }), /* @__PURE__ */ jsxs(SupportLabel, {
          datatype: "react",
          children: [/* @__PURE__ */ jsx("img", {
            src: reactSvg,
            alt: "react"
          }), /* @__PURE__ */ jsx("span", {
            children: "React"
          })]
        }), /* @__PURE__ */ jsxs(SupportLabel, {
          datatype: "vue",
          children: [/* @__PURE__ */ jsx("img", {
            src: vueSvg,
            alt: "vue"
          }), /* @__PURE__ */ jsxs("span", {
            children: ["Vue (", t("plan"), ")"]
          })]
        })]
      })]
    }), /* @__PURE__ */ jsxs(Introduce, {
      children: [/* @__PURE__ */ jsx(Card, {
        icon: /* @__PURE__ */ jsx("img", {
          src: quickSvg,
          alt: "quick"
        }),
        name: t("fast"),
        children: t("fastDesc")
      }), /* @__PURE__ */ jsx(Card, {
        icon: /* @__PURE__ */ jsx("img", {
          src: tyoeSvg,
          alt: "type"
        }),
        name: t("typescript"),
        children: t("typescriptDesc")
      }), /* @__PURE__ */ jsx(Card, {
        icon: /* @__PURE__ */ jsx("img", {
          src: themeSvg,
          alt: "theme"
        }),
        name: t("theme"),
        children: t("themeDesc")
      }), /* @__PURE__ */ jsx(Card, {
        icon: /* @__PURE__ */ jsx("img", {
          src: sizeSvg,
          alt: "size"
        }),
        name: t("small"),
        children: t("smallDesc")
      })]
    }), /* @__PURE__ */ jsx(Title, {
      id: "quick",
      children: t("quick")
    }), /* @__PURE__ */ jsxs(CodeContent, {
      children: [/* @__PURE__ */ jsx(Author, {
        children: /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("a", {
            href: "#base",
            children: t("withBase")
          }), /* @__PURE__ */ jsx("a", {
            href: "#variants",
            children: t("withVariants")
          }), /* @__PURE__ */ jsx("a", {
            href: "#theme",
            children: t("withTheme")
          }), /* @__PURE__ */ jsx("a", {
            href: "#ssr",
            children: t("withSSR")
          }), /* @__PURE__ */ jsx("a", {
            href: "#keyframes",
            children: t("withKeyframes")
          }), /* @__PURE__ */ jsx("a", {
            href: "#global",
            children: t("withGlobal")
          }), /* @__PURE__ */ jsx("a", {
            href: "#media",
            children: t("withMedia")
          })]
        })
      }), /* @__PURE__ */ jsxs(StyilCode, {
        code: "baseCode",
        children: [/* @__PURE__ */ jsx("h2", {
          id: "base",
          children: t("withBase")
        }), /* @__PURE__ */ jsx("p", {
          children: /* @__PURE__ */ jsx("span", {
            dangerouslySetInnerHTML: {
              __html: t("withBaseDesc.1")
            }
          })
        }), /* @__PURE__ */ jsx("p", {
          children: /* @__PURE__ */ jsx("span", {
            dangerouslySetInnerHTML: {
              __html: t("withBaseDesc.2")
            }
          })
        }), /* @__PURE__ */ jsx("p", {
          children: /* @__PURE__ */ jsx("span", {
            dangerouslySetInnerHTML: {
              __html: t("withBaseDesc.3")
            }
          })
        })]
      }), /* @__PURE__ */ jsxs(StyilCode, {
        code: "variantsCode",
        variants: {
          padding: "false"
        },
        children: [/* @__PURE__ */ jsx("h2", {
          id: "variants",
          children: t("withVariants")
        }), /* @__PURE__ */ jsx("p", {
          children: /* @__PURE__ */ jsx("span", {
            dangerouslySetInnerHTML: {
              __html: t("withVariantsDesc.1")
            }
          })
        }), /* @__PURE__ */ jsx("p", {
          children: t("withVariantsDesc.2")
        })]
      }), /* @__PURE__ */ jsx(StyilCode, {
        code: "errorCode",
        disabledType: true,
        children: /* @__PURE__ */ jsx("p", {
          children: t("withVariantsDesc.3")
        })
      }), /* @__PURE__ */ jsxs(StyilCode, {
        code: "themeCode",
        children: [/* @__PURE__ */ jsx("h2", {
          id: "theme",
          children: t("withTheme")
        }), /* @__PURE__ */ jsx("p", {
          children: /* @__PURE__ */ jsx("span", {
            dangerouslySetInnerHTML: {
              __html: t("withThemeDesc")
            }
          })
        })]
      }), /* @__PURE__ */ jsxs(StyilCode, {
        code: "ssrCode",
        variants: {
          padding: "false"
        },
        children: [/* @__PURE__ */ jsx("h2", {
          id: "ssr",
          children: t("withSSR")
        }), /* @__PURE__ */ jsx("p", {
          children: /* @__PURE__ */ jsx("span", {
            dangerouslySetInnerHTML: {
              __html: t("withSSRDesc.1")
            }
          })
        }), /* @__PURE__ */ jsx("p", {
          children: /* @__PURE__ */ jsx("span", {
            dangerouslySetInnerHTML: {
              __html: t("withSSRDesc.2")
            }
          })
        }), /* @__PURE__ */ jsx("p", {
          children: /* @__PURE__ */ jsx("span", {
            dangerouslySetInnerHTML: {
              __html: t("withSSRDesc.3")
            }
          })
        })]
      }), /* @__PURE__ */ jsx(StyilCode, {
        code: "ssrBaseCode",
        children: /* @__PURE__ */ jsx("p", {
          children: /* @__PURE__ */ jsx("span", {
            dangerouslySetInnerHTML: {
              __html: t("withSSRDesc.4")
            }
          })
        })
      }), /* @__PURE__ */ jsxs(StyilCode, {
        code: "keyframesCode",
        children: [/* @__PURE__ */ jsx("h2", {
          id: "keyframes",
          children: t("withKeyframes")
        }), /* @__PURE__ */ jsx("p", {
          children: /* @__PURE__ */ jsx("span", {
            dangerouslySetInnerHTML: {
              __html: t("withKeyframesDesc")
            }
          })
        })]
      }), /* @__PURE__ */ jsxs(StyilCode, {
        code: "globalCode",
        children: [/* @__PURE__ */ jsx("h2", {
          id: "global",
          children: t("withGlobal")
        }), /* @__PURE__ */ jsx("p", {
          children: /* @__PURE__ */ jsx("span", {
            dangerouslySetInnerHTML: {
              __html: t("withGlobalDesc")
            }
          })
        })]
      }), /* @__PURE__ */ jsxs(StyilCode, {
        code: "mediaCode",
        variants: {
          padding: "false"
        },
        children: [/* @__PURE__ */ jsx("h2", {
          id: "media",
          children: t("withMedia")
        }), /* @__PURE__ */ jsx("p", {
          children: /* @__PURE__ */ jsx("span", {
            dangerouslySetInnerHTML: {
              __html: t("withMediaDesc")
            }
          })
        })]
      })]
    })]
  });
}
const activeStyle = {
  color: "#333",
  backgroundColor: "#e6e8eb"
};
function Link({
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsx(NavLink, {
    style: ({
      isActive
    }) => isActive ? activeStyle : {},
    ...rest,
    children
  });
}
const BenchmarkRoot = styled("div", (theme2) => ({
  minHeight: "calc(100vh - 100px)",
  display: "flex",
  paddingTop: 20,
  ".start-test": {
    display: "inline-block",
    color: "#fff",
    backgroundColor: "#fb304f",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    margin: "0 20px",
    float: "right",
    padding: "10px 15px"
  },
  "& > div": {
    flex: 1,
    padding: "0 60px",
    "& >ul": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      marginBottom: 20,
      "& li": {
        marginRight: 20
      },
      "& a": {
        display: "block",
        borderRadius: "12px",
        lineHeight: "40px",
        padding: "0 20px",
        color: theme2.secondColor,
        backgroundColor: theme2.bgSecondColor,
        boxShadow: theme2.boxShadow,
        "&:hover": {
          color: "#333",
          backgroundColor: "#e6e8eb"
        }
      }
    }
  },
  "& > ul": {
    flexShrink: 0,
    "& li": {
      marginBottom: 14
    },
    "& a": {
      flexShrink: 0,
      display: "block",
      fontSize: "14px",
      borderRadius: "12px",
      lineHeight: "40px",
      width: "210px",
      textAlign: "center",
      color: theme2.secondColor,
      backgroundColor: theme2.bgSecondColor,
      boxShadow: theme2.boxShadow,
      fontWeight: 500,
      "&:hover": {
        color: "#333",
        backgroundColor: "#e6e8eb"
      }
    }
  }
}));
function Benchmark() {
  const {
    t
  } = useTranslation();
  const {
    pathname
  } = useLocation();
  const router = useNavigate();
  useEffect(() => {
    if (pathname === "/styils/benchmark") {
      router("create-and-mount-button");
    }
  }, [pathname, router]);
  return /* @__PURE__ */ jsxs(BenchmarkRoot, {
    children: [/* @__PURE__ */ jsxs("ul", {
      children: [/* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "create-and-mount-button",
          children: t("create-and-mount-button")
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "change-variant",
          children: t("change-a-variant")
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "change-css-prop",
          children: t("change-css-prop")
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "sierpinski-triangle",
          children: t("sierpinski-triangle")
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "mount-deep-tree",
          children: t("mount-deep-tree")
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "mount-wide-tree",
          children: t("mount-wide-tree")
        })
      })]
    }), /* @__PURE__ */ jsx(Outlet, {})]
  });
}
const Header$1 = styled("section", () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  button: {
    color: "#fff",
    backgroundColor: "#fb304f",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    padding: "10px 15px",
    marginRight: 20
  },
  "div span": {
    paddingRight: 10
  }
}));
const calculateAverage = (results, key, numberOfRuns) => {
  let total = 0;
  [...Array(numberOfRuns)].forEach((_, index) => {
    total += results[index][key];
  });
  return total / numberOfRuns;
};
const TestResults = ({
  testInfo,
  onRetest
}) => {
  const averageInfo = {
    firstIteration: calculateAverage(testInfo.results, "firstIteration", testInfo.numberOfRuns),
    lastIteration: calculateAverage(testInfo.results, "lastIteration", testInfo.numberOfRuns),
    fastestIteration: calculateAverage(testInfo.results, "fastestIteration", testInfo.numberOfRuns),
    slowestIteration: calculateAverage(testInfo.results, "slowestIteration", testInfo.numberOfRuns),
    meanIteration: calculateAverage(testInfo.results, "meanIteration", testInfo.numberOfRuns),
    medianIteration: calculateAverage(testInfo.results, "medianIteration", testInfo.numberOfRuns),
    variance: calculateAverage(testInfo.results, "variance", testInfo.numberOfRuns)
  };
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ jsxs("div", {
    style: {
      width: "100%"
    },
    children: [/* @__PURE__ */ jsx("style", {
      dangerouslySetInnerHTML: {
        __html: `
            th, td {
              padding: 10px;
              text-align: center;
            }
        `
      }
    }), /* @__PURE__ */ jsxs(Header$1, {
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsxs("span", {
          children: [t("testResults.count"), ": ", testInfo.N]
        }), /* @__PURE__ */ jsxs("span", {
          children: [t("testResults.frequency"), ": ", testInfo.numberOfRuns]
        })]
      }), /* @__PURE__ */ jsx("button", {
        onClick: onRetest,
        children: t("retest")
      })]
    }), /* @__PURE__ */ jsxs("table", {
      style: {
        width: "100%",
        marginTop: "20px"
      },
      children: [/* @__PURE__ */ jsx("thead", {
        children: /* @__PURE__ */ jsxs("tr", {
          children: [/* @__PURE__ */ jsx("th", {}), /* @__PURE__ */ jsx("th", {
            children: t("testResults.th1")
          }), /* @__PURE__ */ jsx("th", {
            children: t("testResults.th2")
          }), /* @__PURE__ */ jsx("th", {
            children: t("testResults.th3")
          }), /* @__PURE__ */ jsx("th", {
            children: t("testResults.th4")
          }), /* @__PURE__ */ jsx("th", {
            children: t("testResults.th5")
          }), /* @__PURE__ */ jsx("th", {
            children: t("testResults.th6")
          }), /* @__PURE__ */ jsx("th", {
            children: t("testResults.th7")
          })]
        })
      }), /* @__PURE__ */ jsx("tbody", {
        children: [...Array(testInfo.numberOfRuns)].map((_val, runIndex) => {
          return /* @__PURE__ */ jsxs("tr", {
            children: [/* @__PURE__ */ jsxs("th", {
              children: ["Test ", runIndex + 1]
            }), /* @__PURE__ */ jsx(ResultCells, {
              result: testInfo.results[runIndex]
            })]
          }, runIndex);
        })
      }), /* @__PURE__ */ jsx("tfoot", {
        children: /* @__PURE__ */ jsxs("tr", {
          children: [/* @__PURE__ */ jsx("th", {
            children: t("testResults.th8")
          }), /* @__PURE__ */ jsx(ResultCells, {
            result: averageInfo
          })]
        })
      })]
    }), /* @__PURE__ */ jsx("hr", {}), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsxs("ul", {
      children: [/* @__PURE__ */ jsxs("li", {
        children: ["- ", t("testResults.desc1")]
      }), /* @__PURE__ */ jsxs("li", {
        children: ["- ", t("testResults.desc2")]
      }), /* @__PURE__ */ jsxs("li", {
        children: ["- ", t("benchmarkDesc")]
      })]
    })]
  });
};
function ResultCells({
  result
}) {
  const {
    firstIteration,
    lastIteration,
    meanIteration,
    medianIteration,
    variance,
    slowestIteration,
    fastestIteration
  } = result;
  const alertLastRender = lastIteration > firstIteration * 1.1 ? {
    color: "orange"
  } : void 0;
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("td", {
      children: firstIteration.toFixed(6)
    }), /* @__PURE__ */ jsx("td", {
      style: alertLastRender,
      children: lastIteration.toFixed(6)
    }), /* @__PURE__ */ jsx("td", {
      children: meanIteration.toFixed(6)
    }), /* @__PURE__ */ jsx("td", {
      children: medianIteration.toFixed(6)
    }), /* @__PURE__ */ jsx("td", {
      children: fastestIteration.toFixed(6)
    }), /* @__PURE__ */ jsx("td", {
      children: slowestIteration.toFixed(6)
    }), /* @__PURE__ */ jsx("td", {
      children: Math.sqrt(variance).toFixed(6)
    })]
  });
}
const TestAndRefresh = ({
  runIndex,
  testInfo,
  TestComponent
}) => {
  const iterationResults = [];
  const router = useNavigate();
  useEffect(() => {
    if (iterationResults.length !== testInfo.N) {
      throw new Error(`Did not calculate N: ${testInfo.N} results (received ${iterationResults.length} results)`);
    }
    const firstIteration = iterationResults[0];
    const lastIteration = iterationResults[iterationResults.length - 1];
    const sortedResults = iterationResults.sort((a, b) => Number(a) > Number(b) ? 1 : -1);
    const medianIteration = sortedResults[Math.round(sortedResults.length / 2)];
    const fastestIteration = sortedResults[0];
    const slowestIteration = sortedResults[sortedResults.length - 1];
    let sumOfIterationTime = 0;
    for (let i = 0; i < iterationResults.length; i++) {
      sumOfIterationTime += iterationResults[i];
    }
    const meanIteration = sumOfIterationTime / iterationResults.length;
    let sumOfSquaredDifferences = 0;
    for (let i = 0; i < iterationResults.length; i++) {
      const difference = meanIteration - iterationResults[i];
      const squaredDifference = difference ** 2;
      sumOfSquaredDifferences += squaredDifference;
    }
    const variance = sumOfSquaredDifferences / iterationResults.length;
    testInfo.results[runIndex] = {
      N: testInfo.N,
      firstIteration,
      lastIteration,
      fastestIteration,
      slowestIteration,
      medianIteration,
      meanIteration,
      variance
    };
    localStorage.setItem(testInfo.testId, JSON.stringify(testInfo));
    if (runIndex === testInfo.numberOfRuns - 1) {
      router(`?testId=${testInfo.testId}&finished=true`);
      location.reload();
    } else {
      router(`?testId=${testInfo.testId}&runIndex=${runIndex + 1}`);
    }
  });
  function handleProfilerData(_id, _phase, actualDuration, _baseDuration, _startTime, _commitTime, _interactions) {
    iterationResults.push(actualDuration);
  }
  const loops = [...Array(testInfo.N)];
  return /* @__PURE__ */ jsx(Fragment, {
    children: loops.map((_value, index) => {
      return /* @__PURE__ */ jsx(Profiler, {
        id: testInfo.testId,
        onRender: handleProfilerData,
        children: /* @__PURE__ */ jsx(TestComponent, {
          testIndex: index
        })
      }, index);
    })
  });
};
const TestRunner = ({
  testIdentifier,
  TestComponent,
  numberOfRuns,
  iterationN
}) => {
  const {
    t
  } = useTranslation();
  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const testId = searchParams.get("testId");
  const finished = searchParams.get("finished");
  const runIndex = searchParams.get("runIndex");
  if (typeof window === "undefined") {
    return null;
  }
  const onRetest = () => {
    const old = JSON.parse(localStorage.getItem(testIdentifier));
    old.results = {};
    localStorage.setItem(testIdentifier, JSON.stringify(old));
    router(`?testId=${testIdentifier}&runIndex=0`);
  };
  if (!testId) {
    try {
      const old = JSON.parse(localStorage.getItem(testIdentifier));
      if (Object.keys(old.results).length) {
        return /* @__PURE__ */ jsx(TestResults, {
          testInfo: old,
          onRetest
        });
      }
    } catch {
    }
    const testInfo = {
      testId: testIdentifier,
      N: iterationN,
      numberOfRuns,
      results: {}
    };
    localStorage.setItem(testIdentifier, JSON.stringify(testInfo));
    return /* @__PURE__ */ jsx("button", {
      className: "start-test",
      onClick: () => {
        router(`?testId=${testIdentifier}&runIndex=0`);
      },
      children: t("testResults.start-test")
    });
  }
  if (typeof testId === "string") {
    if (finished !== null) {
      const testInfo = JSON.parse(localStorage.getItem(testId));
      return /* @__PURE__ */ jsx(TestResults, {
        testInfo,
        onRetest
      });
    }
    const runNumber = typeof runIndex === "string" ? Number(runIndex) : 0;
    try {
      const testInfo = JSON.parse(localStorage.getItem(testId));
      return /* @__PURE__ */ jsx(TestAndRefresh, {
        runIndex: runNumber,
        testInfo,
        TestComponent
      });
    } catch (err) {
      console.error(err);
    }
  }
  return null;
};
const buttonStyles = {
  all: "unset",
  alignItems: "center",
  boxSizing: "border-box",
  userSelect: "none",
  "&::before": {
    boxSizing: "border-box"
  },
  "&::after": {
    boxSizing: "border-box"
  },
  display: "inline-flex",
  flexShrink: 0,
  justifyContent: "center",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",
  fontFamily: "system-ui",
  fontWeight: 500,
  fontVariantNumeric: "tabular-nums",
  "&:disabled": {
    backgroundColor: "gray",
    boxShadow: "inset 0 0 0 1px gray",
    color: "gray",
    pointerEvents: "none"
  },
  backgroundColor: "white",
  boxShadow: "inset 0 0 0 1px gray",
  color: "black",
  "&:hover": {
    boxShadow: "inset 0 0 0 1px gray"
  },
  "&:active": {
    backgroundColor: "gray",
    boxShadow: "inset 0 0 0 1px gray"
  },
  "&:focus": {
    boxShadow: "inset 0 0 0 1px gray, 0 0 0 1px gray"
  },
  '&[data-radix-popover-trigger][data-state="open"]': {
    backgroundColor: "gray",
    boxShadow: "inset 0 0 0 1px gray"
  },
  borderRadius: "3px",
  height: "25px",
  paddingLeft: "10px",
  paddingRight: "10px",
  fontSize: "13px",
  lineHeight: "25px"
};
const buttonVariants = {
  variants: {
    size: {
      1: {
        borderRadius: "2",
        height: "25px",
        px: "10px",
        fontSize: "13px",
        lineHeight: "1"
      },
      2: {
        borderRadius: "3",
        height: "35px",
        px: "15px",
        fontSize: "15px",
        lineHeight: "1"
      }
    },
    variant: {
      blue: {
        backgroundColor: "blue",
        boxShadow: "inset 0 0 0 1px black",
        color: "black",
        "&:hover": {
          boxShadow: "inset 0 0 0 1px black"
        },
        "&:active": {
          backgroundColor: "black",
          boxShadow: "inset 0 0 0 1px black"
        },
        "&:focus": {
          boxShadow: "inset 0 0 0 1px black, 0 0 0 1px black"
        },
        '&[data-radix-popover-trigger][data-state="open"]': {
          backgroundColor: "black",
          boxShadow: "inset 0 0 0 1px black"
        }
      },
      red: {
        backgroundColor: "red",
        boxShadow: "inset 0 0 0 1px black",
        color: "black",
        "&:hover": {
          boxShadow: "inset 0 0 0 1px black"
        },
        "&:active": {
          backgroundColor: "black",
          boxShadow: "inset 0 0 0 1px black"
        },
        "&:focus": {
          boxShadow: "inset 0 0 0 1px black, 0 0 0 1px black"
        },
        '&[data-radix-popover-trigger][data-state="open"]': {
          backgroundColor: "black",
          boxShadow: "inset 0 0 0 1px black"
        }
      }
    }
  }
};
const buttonInterpolatedVariants = (props) => ({
  ...props.size === "1" ? buttonVariants.variants.size["1"] : {},
  ...props.size === "2" ? buttonVariants.variants.size["2"] : {},
  ...props.variant === "blue" ? buttonVariants.variants.variant.blue : {},
  ...props.variant === "red" ? buttonVariants.variants.variant.red : {}
});
const Button$7 = styled$2.default("button")((props) => ({
  ...buttonStyles,
  ...buttonInterpolatedVariants(props)
}));
const TestBase$n = ({
  testIndex
}) => {
  const variants = {
    variant: testIndex % 2 === 0 ? "red" : "blue",
    size: testIndex % 2 === 0 ? "1" : "2"
  };
  return /* @__PURE__ */ jsx(Button$7, {
    ...variants,
    children: "testing"
  });
};
const Test$q = () => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(TestRunner, {
      testIdentifier: "change-variant-button-emotion",
      numberOfRuns: 3,
      iterationN: 1e3,
      TestComponent: TestBase$n
    }), /* @__PURE__ */ jsx("div", {
      style: {
        opacity: 0,
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ jsx(Button$7, {
        children: "\u5C06\u6309\u94AE\u5B89\u88C5\u5728\u6D4B\u8BD5\u4E4B\u5916\uFF0C\u4EE5\u786E\u4FDD\u6CA1\u6709\u8BA1\u65F6\u4EFB\u4F55\u5B89\u88C5\u65F6\u95F4"
      })
    })]
  });
};
const __vite_glob_0_0$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Test$q
}, Symbol.toStringTag, { value: "Module" }));
const Button$6 = styled$3("button", {
  ...buttonStyles,
  ...buttonVariants
});
const TestBase$m = ({
  testIndex
}) => {
  const variants = {
    variant: testIndex % 2 === 0 ? "red" : "blue",
    size: testIndex % 2 === 0 ? "1" : "2"
  };
  return /* @__PURE__ */ jsx(Button$6, {
    ...variants,
    children: "testing"
  });
};
const Test$p = () => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(TestRunner, {
      testIdentifier: "change-variant-stitches",
      numberOfRuns: 3,
      iterationN: 1e3,
      TestComponent: TestBase$m
    }), /* @__PURE__ */ jsx("div", {
      style: {
        opacity: 0,
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ jsx(Button$6, {
        children: "\u5C06\u6309\u94AE\u5B89\u88C5\u5728\u6D4B\u8BD5\u4E4B\u5916\uFF0C\u4EE5\u786E\u4FDD\u6CA1\u6709\u8BA1\u65F6\u4EFB\u4F55\u5B89\u88C5\u65F6\u95F4"
      })
    })]
  });
};
const __vite_glob_0_1$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Test$p
}, Symbol.toStringTag, { value: "Module" }));
const Button$5 = styled$1("button", {
  ...buttonStyles
}, buttonVariants.variants);
const TestBase$l = ({
  testIndex
}) => {
  return /* @__PURE__ */ jsxs(Button$5, {
    variants: {
      variant: testIndex % 2 === 0 ? "red" : "blue",
      size: testIndex % 2 === 0 ? "1" : "2"
    },
    children: ["styils ", testIndex]
  });
};
const Test$o = () => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(TestRunner, {
      testIdentifier: "change-variant-styils-react",
      numberOfRuns: 3,
      iterationN: 1e3,
      TestComponent: TestBase$l
    }), /* @__PURE__ */ jsx("div", {
      style: {
        opacity: 0,
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ jsx(Button$5, {
        children: "\u5C06\u6309\u94AE\u5B89\u88C5\u5728\u6D4B\u8BD5\u4E4B\u5916\uFF0C\u4EE5\u786E\u4FDD\u6CA1\u6709\u8BA1\u65F6\u4EFB\u4F55\u5B89\u88C5\u65F6\u95F4"
      })
    })]
  });
};
const __vite_glob_0_2$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Test$o
}, Symbol.toStringTag, { value: "Module" }));
const Button$4 = styled$4.default("button")((props) => ({
  ...buttonStyles,
  ...buttonInterpolatedVariants(props)
}));
const TestBase$k = ({
  testIndex
}) => {
  const variants = {
    variant: testIndex % 2 === 0 ? "red" : "blue",
    size: testIndex % 2 === 0 ? "1" : "2"
  };
  return /* @__PURE__ */ jsx(Button$4, {
    ...variants,
    children: "testing"
  });
};
const Test$n = () => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(TestRunner, {
      testIdentifier: "change-variant-styled-components",
      numberOfRuns: 3,
      iterationN: 1e3,
      TestComponent: TestBase$k
    }), /* @__PURE__ */ jsx("div", {
      style: {
        opacity: 0,
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ jsx(Button$4, {
        children: "\u5C06\u6309\u94AE\u5B89\u88C5\u5728\u6D4B\u8BD5\u4E4B\u5916\uFF0C\u4EE5\u786E\u4FDD\u6CA1\u6709\u8BA1\u65F6\u4EFB\u4F55\u5B89\u88C5\u65F6\u95F4"
      })
    })]
  });
};
const __vite_glob_0_3$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Test$n
}, Symbol.toStringTag, { value: "Module" }));
const changeVariant = Object.assign({ "./bench/change-variant/emotion.tsx": __vite_glob_0_0$5, "./bench/change-variant/stitches-react.tsx": __vite_glob_0_1$5, "./bench/change-variant/styils-react.tsx": __vite_glob_0_2$5, "./bench/change-variant/styled-components.tsx": __vite_glob_0_3$5 });
function Home$5() {
  const {
    pathname
  } = useLocation();
  const router = useNavigate();
  useEffect(() => {
    if (pathname === "/styils/benchmark/change-variant") {
      router("stitches-react");
    }
  }, [pathname, router]);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsxs("ul", {
      children: [/* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "stitches-react",
          children: "Stitches React"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "styled-components",
          children: "Styled Components"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "styils-react",
          children: "styils-react"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "emotion",
          children: "Emotion"
        })
      })]
    }), /* @__PURE__ */ jsx(Outlet, {})]
  });
}
const TestBase$j = ({
  testIndex
}) => {
  return /* @__PURE__ */ jsx("button", {
    className: "static-button-styles",
    style: {
      "--test-index": testIndex,
      backgroundColor: `hsl(${Math.floor(Math.random() * 360)} 80% 80%)`
    },
    children: "testing"
  });
};
const Test$m = () => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(TestRunner, {
      testIdentifier: "change-css-prop-baseline",
      numberOfRuns: 3,
      iterationN: 1e3,
      TestComponent: TestBase$j
    }), /* @__PURE__ */ jsx("style", {
      dangerouslySetInnerHTML: {
        __html: stringify({
          ".static-button-styles": {
            ...buttonStyles,
            padding: "20px"
          }
        })
      }
    })]
  });
};
const __vite_glob_0_0$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Test$m
}, Symbol.toStringTag, { value: "Module" }));
const Button$3 = styled$2.default("button")((props) => ({
  ...buttonStyles,
  ...props.css
}));
const TestBase$i = ({
  testIndex
}) => {
  return /* @__PURE__ */ jsx(Button$3, {
    css: {
      "--test-index": testIndex,
      backgroundColor: `hsl(${Math.floor(Math.random() * 360)} 80% 80%)`,
      padding: "20px"
    },
    children: "testing"
  });
};
const Test$l = () => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(TestRunner, {
      testIdentifier: "change-css-prop-emotion",
      numberOfRuns: 3,
      iterationN: 1e3,
      TestComponent: TestBase$i
    }), /* @__PURE__ */ jsx("div", {
      style: {
        opacity: 0,
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ jsx(Button$3, {
        children: "\u5C06\u6309\u94AE\u5B89\u88C5\u5728\u6D4B\u8BD5\u4E4B\u5916\uFF0C\u4EE5\u786E\u4FDD\u6CA1\u6709\u8BA1\u65F6\u4EFB\u4F55\u5B89\u88C5\u65F6\u95F4"
      })
    })]
  });
};
const __vite_glob_0_1$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Test$l
}, Symbol.toStringTag, { value: "Module" }));
const Button$2 = styled$3("button", {
  ...buttonStyles
});
const TestBase$h = ({
  testIndex
}) => {
  return /* @__PURE__ */ jsx(Button$2, {
    css: {
      "--test-index": testIndex,
      backgroundColor: `hsl(${Math.floor(Math.random() * 360)} 80% 80%)`,
      padding: "20px"
    },
    children: "testing"
  });
};
const Test$k = () => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(TestRunner, {
      testIdentifier: "change-css-prop-stitches",
      numberOfRuns: 3,
      iterationN: 1e3,
      TestComponent: TestBase$h
    }), /* @__PURE__ */ jsx("div", {
      style: {
        opacity: 0,
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ jsx(Button$2, {
        children: "\u5C06\u6309\u94AE\u5B89\u88C5\u5728\u6D4B\u8BD5\u4E4B\u5916\uFF0C\u4EE5\u786E\u4FDD\u6CA1\u6709\u8BA1\u65F6\u4EFB\u4F55\u5B89\u88C5\u65F6\u95F4"
      })
    })]
  });
};
const __vite_glob_0_2$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Test$k
}, Symbol.toStringTag, { value: "Module" }));
const Button$1 = styled$1("button", {
  ...buttonStyles
});
const TestBase$g = ({
  testIndex
}) => {
  return /* @__PURE__ */ jsx(Button$1, {
    style: {
      "--test-index": testIndex,
      backgroundColor: `hsl(${Math.floor(Math.random() * 360)} 80% 80%)`,
      padding: "20px"
    },
    children: "testing"
  });
};
const StyilTest$1 = () => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(TestRunner, {
      testIdentifier: "change-css-prop-styils-react",
      numberOfRuns: 3,
      iterationN: 1e3,
      TestComponent: TestBase$g
    }), /* @__PURE__ */ jsx("div", {
      style: {
        opacity: 0,
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ jsx(Button$1, {
        children: "\u5C06\u6309\u94AE\u5B89\u88C5\u5728\u6D4B\u8BD5\u4E4B\u5916\uFF0C\u4EE5\u786E\u4FDD\u6CA1\u6709\u8BA1\u65F6\u4EFB\u4F55\u5B89\u88C5\u65F6\u95F4"
      })
    })]
  });
};
const __vite_glob_0_3$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StyilTest$1
}, Symbol.toStringTag, { value: "Module" }));
const Button = styled$4.default("button")((props) => ({
  ...buttonStyles,
  ...props.css
}));
const TestBase$f = ({
  testIndex
}) => {
  return /* @__PURE__ */ jsx(Button, {
    css: {
      "--test-index": testIndex,
      backgroundColor: `hsl(${Math.floor(Math.random() * 360)} 80% 80%)`,
      padding: "20px"
    },
    children: "testing"
  });
};
const Test$j = () => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(TestRunner, {
      testIdentifier: "change-css-prop-styled-components",
      numberOfRuns: 3,
      iterationN: 1e3,
      TestComponent: TestBase$f
    }), /* @__PURE__ */ jsx("div", {
      style: {
        opacity: 0,
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ jsx(Button, {
        children: "\u5C06\u6309\u94AE\u5B89\u88C5\u5728\u6D4B\u8BD5\u4E4B\u5916\uFF0C\u4EE5\u786E\u4FDD\u6CA1\u6709\u8BA1\u65F6\u4EFB\u4F55\u5B89\u88C5\u65F6\u95F4"
      })
    })]
  });
};
const __vite_glob_0_4$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Test$j
}, Symbol.toStringTag, { value: "Module" }));
const changeCssProp = Object.assign({ "./bench/change-css-prop/baseline.tsx": __vite_glob_0_0$4, "./bench/change-css-prop/emotion.tsx": __vite_glob_0_1$4, "./bench/change-css-prop/stitches-react.tsx": __vite_glob_0_2$4, "./bench/change-css-prop/styils-react.tsx": __vite_glob_0_3$4, "./bench/change-css-prop/styled-components.tsx": __vite_glob_0_4$4 });
function Home$4() {
  const {
    pathname
  } = useLocation();
  const router = useNavigate();
  useEffect(() => {
    if (pathname === "/styils/benchmark/change-css-prop") {
      router("stitches-react");
    }
  }, [pathname, router]);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsxs("ul", {
      children: [/* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "stitches-react",
          children: "Stitches React"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "styled-components",
          children: "Styled Components"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "emotion",
          children: "Emotion"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "styils-react",
          children: "Styils-react"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "baseline",
          children: "Baseline"
        })
      })]
    }), /* @__PURE__ */ jsx(Outlet, {})]
  });
}
const TestBase$e = ({
  testIndex
}) => {
  return /* @__PURE__ */ jsx("button", {
    style: {
      "--test-index": testIndex,
      ...buttonStyles
    },
    children: "testing"
  });
};
const Test$i = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "create-and-mount-button-baseline",
    numberOfRuns: 3,
    iterationN: 1e3,
    TestComponent: TestBase$e
  });
};
const __vite_glob_0_0$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Test$i
}, Symbol.toStringTag, { value: "Module" }));
const TestBase$d = ({
  testIndex
}) => {
  const Button2 = styled$2.default("button")({
    "--test-index": testIndex,
    ...buttonStyles
  });
  return /* @__PURE__ */ jsx(Button2, {
    children: "testing"
  });
};
const Test$h = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "create-and-mount-button-emotion",
    numberOfRuns: 3,
    iterationN: 1e3,
    TestComponent: TestBase$d
  });
};
const __vite_glob_0_1$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Test$h
}, Symbol.toStringTag, { value: "Module" }));
const TestBase$c = ({
  testIndex
}) => {
  const Button2 = styled$3("button", {
    "--test-index": testIndex,
    ...buttonStyles
  });
  return /* @__PURE__ */ jsx(Button2, {
    children: "testing"
  });
};
const Test$g = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "create-and-mount-button-stitches",
    numberOfRuns: 3,
    iterationN: 1e3,
    TestComponent: TestBase$c
  });
};
const __vite_glob_0_2$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Test$g
}, Symbol.toStringTag, { value: "Module" }));
const TestBase$b = ({
  testIndex
}) => {
  const Button2 = styled$1("button", {
    "--test-index": testIndex,
    ...buttonStyles
  });
  return /* @__PURE__ */ jsx(Button2, {
    children: "styils"
  });
};
const StyilTest = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "create-and-mount-button-styils-react",
    numberOfRuns: 3,
    iterationN: 1e3,
    TestComponent: TestBase$b
  });
};
const __vite_glob_0_3$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StyilTest
}, Symbol.toStringTag, { value: "Module" }));
const TestBase$a = ({
  testIndex
}) => {
  const Button2 = styled$4.default("button")({
    "--test-index": testIndex,
    ...buttonStyles
  });
  return /* @__PURE__ */ jsx(Button2, {
    children: "testing"
  });
};
const Test$f = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "create-and-mount-button-styled-components",
    numberOfRuns: 3,
    iterationN: 1e3,
    TestComponent: TestBase$a
  });
};
const __vite_glob_0_4$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Test$f
}, Symbol.toStringTag, { value: "Module" }));
const createMountButton = Object.assign({ "./bench/create-and-mount-button/baseline.tsx": __vite_glob_0_0$3, "./bench/create-and-mount-button/emotion.tsx": __vite_glob_0_1$3, "./bench/create-and-mount-button/stitches-react.tsx": __vite_glob_0_2$3, "./bench/create-and-mount-button/styils-react.tsx": __vite_glob_0_3$3, "./bench/create-and-mount-button/styled-components.tsx": __vite_glob_0_4$3 });
function Home$3() {
  const {
    pathname
  } = useLocation();
  const router = useNavigate();
  useEffect(() => {
    if (pathname === "/styils/benchmark/create-and-mount-button") {
      router("stitches-react");
    }
  }, [pathname, router]);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsxs("ul", {
      children: [/* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "stitches-react",
          children: "Stitches React"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "styled-components",
          children: "Styled Components"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "emotion",
          children: "Emotion"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "styils-react",
          children: "styils-react"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "baseline",
          children: "Baseline"
        })
      })]
    }), /* @__PURE__ */ jsx(Outlet, {})]
  });
}
/*
 * @license MIT License
 * Copyright (c) 2021-present, Pedro Duarte.
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
function Tree({
  breadth,
  depth,
  id,
  wrap,
  box: Box
}) {
  let result = /* @__PURE__ */ jsxs(Box, {
    color: id % 3,
    layout: depth % 2 === 0 ? "column" : "row",
    outer: true,
    variants: {
      color: id % 3,
      layout: depth % 2 === 0 ? "column" : "row",
      outer: true
    },
    children: [depth === 0 && /* @__PURE__ */ jsx(Box, {
      color: id % 3 + 3,
      fixed: true,
      variants: {
        color: id % 3 + 3,
        fixed: true
      }
    }), depth !== 0 && Array.from({
      length: breadth
    }).map((el, i) => /* @__PURE__ */ jsx(Tree, {
      breadth,
      depth: depth - 1,
      id: i,
      wrap,
      box: Box
    }, i))]
  });
  for (let i = 0; i < wrap; i++) {
    result = /* @__PURE__ */ jsx(Box, {
      children: result
    });
  }
  return result;
}
const TestBase$9 = () => {
  const Box = ({
    color,
    layout,
    outer,
    fixed,
    ...props
  }) => {
    const s1 = {
      0: {
        backgroundColor: "#14171A"
      },
      1: {
        backgroundColor: "#AAB8C2"
      },
      2: {
        backgroundColor: "#E6ECF0"
      },
      3: {
        backgroundColor: "#FFAD1F"
      },
      4: {
        backgroundColor: "#F45D22"
      },
      5: {
        backgroundColor: "#E0245E"
      }
    }[color];
    const s2 = {
      column: {
        flexDirection: "column"
      },
      row: {
        flexDirection: "row"
      }
    }[layout];
    const s3 = {
      true: {
        padding: "4px"
      }
    }[outer];
    const s4 = {
      true: {
        width: "6px",
        height: "6px"
      }
    }[fixed];
    return /* @__PURE__ */ jsx("div", {
      style: {
        alignItems: "stretch",
        borderWidth: "0",
        borderStyle: "solid",
        boxSizing: "border-box",
        display: "flex",
        flexBasis: "auto",
        flexDirection: "column",
        flexShrink: 0,
        margin: "0",
        padding: "0",
        position: "relative",
        minHeight: "0",
        minWidth: "0",
        alignSelf: "flex-start",
        backgroundColor: "transparent",
        ...s1,
        ...s2,
        ...s3,
        ...s4
      },
      children: props.children
    });
  };
  return /* @__PURE__ */ jsx(Tree, {
    breadth: 2,
    depth: 7,
    id: 0,
    wrap: 1,
    box: Box
  });
};
const Test$e = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "mount-deep-tree-base-line",
    numberOfRuns: 3,
    iterationN: 50,
    TestComponent: TestBase$9
  });
};
const __vite_glob_0_0$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TestBase: TestBase$9,
  default: Test$e
}, Symbol.toStringTag, { value: "Module" }));
const TestBase$8 = () => {
  const getColor = (color) => {
    switch (color) {
      case 0:
        return "#14171A";
      case 1:
        return "#AAB8C2";
      case 2:
        return "#E6ECF0";
      case 3:
        return "#FFAD1F";
      case 4:
        return "#F45D22";
      case 5:
        return "#E0245E";
      default:
        return "transparent";
    }
  };
  const View2 = styled$2.default("div")({
    alignItems: "stretch",
    borderWidth: "0",
    borderStyle: "solid",
    boxSizing: "border-box",
    display: "flex",
    flexBasis: "auto",
    flexDirection: "column",
    flexShrink: 0,
    margin: "0",
    padding: "0",
    position: "relative",
    minHeight: "0",
    minWidth: "0"
  });
  const Box = styled$2.default(View2)((props) => ({
    alignSelf: "flex-start",
    flexDirection: props.layout === "column" ? "column" : "row",
    padding: props.outer ? "4px" : "0",
    ...props.fixed ? {
      height: "6px",
      width: "6px"
    } : {},
    backgroundColor: getColor(props.color)
  }));
  return /* @__PURE__ */ jsx(Tree, {
    breadth: 2,
    depth: 7,
    id: 0,
    wrap: 1,
    box: Box
  });
};
const Test$d = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "mount-deep-tree-emotion",
    numberOfRuns: 3,
    iterationN: 50,
    TestComponent: TestBase$8
  });
};
const __vite_glob_0_1$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TestBase: TestBase$8,
  default: Test$d
}, Symbol.toStringTag, { value: "Module" }));
const TestBase$7 = () => {
  const View2 = styled$3("div", {
    alignItems: "stretch",
    borderWidth: "0",
    borderStyle: "solid",
    boxSizing: "border-box",
    display: "flex",
    flexBasis: "auto",
    flexDirection: "column",
    flexShrink: 0,
    margin: "0",
    padding: "0",
    position: "relative",
    minHeight: "0",
    minWidth: "0"
  });
  const Box = styled$3(View2, {
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    variants: {
      color: {
        0: {
          backgroundColor: "#14171A"
        },
        1: {
          backgroundColor: "#AAB8C2"
        },
        2: {
          backgroundColor: "#E6ECF0"
        },
        3: {
          backgroundColor: "#FFAD1F"
        },
        4: {
          backgroundColor: "#F45D22"
        },
        5: {
          backgroundColor: "#E0245E"
        }
      },
      layout: {
        column: {
          flexDirection: "column"
        },
        row: {
          flexDirection: "row"
        }
      },
      outer: {
        true: {
          padding: "4px"
        }
      },
      fixed: {
        true: {
          width: "6px",
          height: "6px"
        }
      }
    }
  });
  return /* @__PURE__ */ jsx(Tree, {
    breadth: 2,
    depth: 7,
    id: 0,
    wrap: 1,
    box: Box
  });
};
const Test$c = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "mount-deep-tree-stitches",
    numberOfRuns: 3,
    iterationN: 50,
    TestComponent: TestBase$7
  });
};
const __vite_glob_0_2$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TestBase: TestBase$7,
  default: Test$c
}, Symbol.toStringTag, { value: "Module" }));
const TestBase$6 = () => {
  const View2 = styled$1("div", {
    alignItems: "stretch",
    borderWidth: "0",
    borderStyle: "solid",
    boxSizing: "border-box",
    display: "flex",
    flexBasis: "auto",
    flexDirection: "column",
    flexShrink: 0,
    margin: "0",
    padding: "0",
    position: "relative",
    minHeight: "0",
    minWidth: "0"
  });
  const Box = styled$1(View2, {
    alignSelf: "flex-start",
    backgroundColor: "transparent"
  }, {
    color: {
      0: {
        backgroundColor: "#14171A"
      },
      1: {
        backgroundColor: "#AAB8C2"
      },
      2: {
        backgroundColor: "#E6ECF0"
      },
      3: {
        backgroundColor: "#FFAD1F"
      },
      4: {
        backgroundColor: "#F45D22"
      },
      5: {
        backgroundColor: "#E0245E"
      }
    },
    layout: {
      column: {
        flexDirection: "column"
      },
      row: {
        flexDirection: "row"
      }
    },
    outer: {
      true: {
        padding: "4px"
      }
    },
    fixed: {
      true: {
        width: "6px",
        height: "6px"
      }
    }
  });
  return /* @__PURE__ */ jsx(Tree, {
    breadth: 2,
    depth: 7,
    id: 0,
    wrap: 1,
    box: Box
  });
};
const Test$b = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "mount-deep-tree-styils-react",
    numberOfRuns: 3,
    iterationN: 50,
    TestComponent: TestBase$6
  });
};
const __vite_glob_0_3$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TestBase: TestBase$6,
  default: Test$b
}, Symbol.toStringTag, { value: "Module" }));
const TestBase$5 = () => {
  const getColor = (color) => {
    switch (color) {
      case 0:
        return "#14171A";
      case 1:
        return "#AAB8C2";
      case 2:
        return "#E6ECF0";
      case 3:
        return "#FFAD1F";
      case 4:
        return "#F45D22";
      case 5:
        return "#E0245E";
      default:
        return "transparent";
    }
  };
  const View2 = styled$4.default("div")({
    alignItems: "stretch",
    borderWidth: "0",
    borderStyle: "solid",
    boxSizing: "border-box",
    display: "flex",
    flexBasis: "auto",
    flexDirection: "column",
    flexShrink: 0,
    margin: "0",
    padding: "0",
    position: "relative",
    minHeight: "0",
    minWidth: "0"
  });
  const Box = styled$4.default(View2)((props) => ({
    alignSelf: "flex-start",
    flexDirection: props.layout === "column" ? "column" : "row",
    padding: props.outer ? "4px" : "0",
    ...props.fixed ? {
      height: "6px",
      width: "6px"
    } : {},
    backgroundColor: getColor(props.color)
  }));
  return /* @__PURE__ */ jsx(Tree, {
    breadth: 2,
    depth: 7,
    id: 0,
    wrap: 1,
    box: Box
  });
};
const Test$a = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "mount-deep-tree-styled-components",
    numberOfRuns: 3,
    iterationN: 50,
    TestComponent: TestBase$5
  });
};
const __vite_glob_0_4$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TestBase: TestBase$5,
  default: Test$a
}, Symbol.toStringTag, { value: "Module" }));
const mountDeepTree = Object.assign({ "./bench/mount-deep-tree/baseline.tsx": __vite_glob_0_0$2, "./bench/mount-deep-tree/emotion.tsx": __vite_glob_0_1$2, "./bench/mount-deep-tree/stitches-react.tsx": __vite_glob_0_2$2, "./bench/mount-deep-tree/styils-react.tsx": __vite_glob_0_3$2, "./bench/mount-deep-tree/styled-components.tsx": __vite_glob_0_4$2 });
function Home$2() {
  const {
    pathname
  } = useLocation();
  const router = useNavigate();
  useEffect(() => {
    if (pathname === "/styils/benchmark/mount-deep-tree") {
      router("stitches-react");
    }
  }, [pathname, router]);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsxs("ul", {
      children: [/* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "stitches-react",
          children: "Stitches React"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "styled-components",
          children: "Styled components"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "emotion",
          children: "Emotion"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "styils-react",
          children: "styils-react"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "baseline",
          children: "baseline"
        })
      })]
    }), /* @__PURE__ */ jsx(Outlet, {})]
  });
}
const TestBase$4 = () => {
  const Box = ({
    color,
    layout,
    outer,
    fixed,
    ...props
  }) => {
    const s1 = {
      0: {
        backgroundColor: "#14171A"
      },
      1: {
        backgroundColor: "#AAB8C2"
      },
      2: {
        backgroundColor: "#E6ECF0"
      },
      3: {
        backgroundColor: "#FFAD1F"
      },
      4: {
        backgroundColor: "#F45D22"
      },
      5: {
        backgroundColor: "#E0245E"
      }
    }[color];
    const s2 = {
      column: {
        flexDirection: "column"
      },
      row: {
        flexDirection: "row"
      }
    }[layout];
    const s3 = {
      true: {
        padding: "4px"
      }
    }[outer];
    const s4 = {
      true: {
        width: "6px",
        height: "6px"
      }
    }[fixed];
    return /* @__PURE__ */ jsx("div", {
      style: {
        alignItems: "stretch",
        borderWidth: "0",
        borderStyle: "solid",
        boxSizing: "border-box",
        display: "flex",
        flexBasis: "auto",
        flexDirection: "column",
        flexShrink: 0,
        margin: "0",
        padding: "0",
        position: "relative",
        minHeight: "0",
        minWidth: "0",
        alignSelf: "flex-start",
        backgroundColor: "transparent",
        ...s1,
        ...s2,
        ...s3,
        ...s4
      },
      children: props.children
    });
  };
  return /* @__PURE__ */ jsx(Tree, {
    breadth: 6,
    depth: 3,
    id: 0,
    wrap: 2,
    box: Box
  });
};
const Test$9 = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "mount-wide-tree-base-line",
    numberOfRuns: 3,
    iterationN: 50,
    TestComponent: TestBase$4
  });
};
const __vite_glob_0_0$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TestBase: TestBase$4,
  default: Test$9
}, Symbol.toStringTag, { value: "Module" }));
const TestBase$3 = () => {
  const getColor = (color) => {
    switch (color) {
      case 0:
        return "#14171A";
      case 1:
        return "#AAB8C2";
      case 2:
        return "#E6ECF0";
      case 3:
        return "#FFAD1F";
      case 4:
        return "#F45D22";
      case 5:
        return "#E0245E";
      default:
        return "transparent";
    }
  };
  const View2 = styled$2.default("div")({
    alignItems: "stretch",
    borderWidth: "0",
    borderStyle: "solid",
    boxSizing: "border-box",
    display: "flex",
    flexBasis: "auto",
    flexDirection: "column",
    flexShrink: 0,
    margin: "0",
    padding: "0",
    position: "relative",
    minHeight: "0",
    minWidth: "0"
  });
  const Box = styled$2.default(View2)((props) => ({
    alignSelf: "flex-start",
    flexDirection: props.layout === "column" ? "column" : "row",
    padding: props.outer ? "4px" : "0",
    ...props.fixed ? {
      height: "6px",
      width: "6px"
    } : {},
    backgroundColor: getColor(props.color)
  }));
  return /* @__PURE__ */ jsx(Tree, {
    breadth: 6,
    depth: 3,
    id: 0,
    wrap: 2,
    box: Box
  });
};
const Test$8 = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "mount-wide-tree-emotion",
    numberOfRuns: 3,
    iterationN: 50,
    TestComponent: TestBase$3
  });
};
const __vite_glob_0_1$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TestBase: TestBase$3,
  default: Test$8
}, Symbol.toStringTag, { value: "Module" }));
const TestBase$2 = () => {
  const View2 = styled$3("div", {
    alignItems: "stretch",
    borderWidth: "0",
    borderStyle: "solid",
    boxSizing: "border-box",
    display: "flex",
    flexBasis: "auto",
    flexDirection: "column",
    flexShrink: 0,
    margin: "0",
    padding: "0",
    position: "relative",
    minHeight: "0",
    minWidth: "0"
  });
  const Box = styled$3(View2, {
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    variants: {
      color: {
        0: {
          backgroundColor: "#14171A"
        },
        1: {
          backgroundColor: "#AAB8C2"
        },
        2: {
          backgroundColor: "#E6ECF0"
        },
        3: {
          backgroundColor: "#FFAD1F"
        },
        4: {
          backgroundColor: "#F45D22"
        },
        5: {
          backgroundColor: "#E0245E"
        }
      },
      layout: {
        column: {
          flexDirection: "column"
        },
        row: {
          flexDirection: "row"
        }
      },
      outer: {
        true: {
          padding: "4px"
        }
      },
      fixed: {
        true: {
          width: "6px",
          height: "6px"
        }
      }
    }
  });
  return /* @__PURE__ */ jsx(Tree, {
    breadth: 6,
    depth: 3,
    id: 0,
    wrap: 2,
    box: Box
  });
};
const Test$7 = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "mount-wide-tree-stitches",
    numberOfRuns: 3,
    iterationN: 50,
    TestComponent: TestBase$2
  });
};
const __vite_glob_0_2$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TestBase: TestBase$2,
  default: Test$7
}, Symbol.toStringTag, { value: "Module" }));
const TestBase$1 = () => {
  const View2 = styled$1("div", {
    alignItems: "stretch",
    borderWidth: "0",
    borderStyle: "solid",
    boxSizing: "border-box",
    display: "flex",
    flexBasis: "auto",
    flexDirection: "column",
    flexShrink: 0,
    margin: "0",
    padding: "0",
    position: "relative",
    minHeight: "0",
    minWidth: "0"
  });
  const Box = styled$1(View2, {
    alignSelf: "flex-start",
    backgroundColor: "transparent"
  }, {
    color: {
      0: {
        backgroundColor: "#14171A"
      },
      1: {
        backgroundColor: "#AAB8C2"
      },
      2: {
        backgroundColor: "#E6ECF0"
      },
      3: {
        backgroundColor: "#FFAD1F"
      },
      4: {
        backgroundColor: "#F45D22"
      },
      5: {
        backgroundColor: "#E0245E"
      }
    },
    layout: {
      column: {
        flexDirection: "column"
      },
      row: {
        flexDirection: "row"
      }
    },
    outer: {
      true: {
        padding: "4px"
      }
    },
    fixed: {
      true: {
        width: "6px",
        height: "6px"
      }
    }
  });
  return /* @__PURE__ */ jsx(Tree, {
    breadth: 6,
    depth: 3,
    id: 0,
    wrap: 2,
    box: Box
  });
};
const Test$6 = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "mount-wide-tree-styils-react",
    numberOfRuns: 3,
    iterationN: 50,
    TestComponent: TestBase$1
  });
};
const __vite_glob_0_3$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TestBase: TestBase$1,
  default: Test$6
}, Symbol.toStringTag, { value: "Module" }));
const TestBase = () => {
  const getColor = (color) => {
    switch (color) {
      case 0:
        return "#14171A";
      case 1:
        return "#AAB8C2";
      case 2:
        return "#E6ECF0";
      case 3:
        return "#FFAD1F";
      case 4:
        return "#F45D22";
      case 5:
        return "#E0245E";
      default:
        return "transparent";
    }
  };
  const View2 = styled$4.default("div")({
    alignItems: "stretch",
    borderWidth: "0",
    borderStyle: "solid",
    boxSizing: "border-box",
    display: "flex",
    flexBasis: "auto",
    flexDirection: "column",
    flexShrink: 0,
    margin: "0",
    padding: "0",
    position: "relative",
    minHeight: "0",
    minWidth: "0"
  });
  const Box = styled$4.default(View2)((props) => ({
    alignSelf: "flex-start",
    flexDirection: props.layout === "column" ? "column" : "row",
    padding: props.outer ? "4px" : "0",
    ...props.fixed ? {
      height: "6px",
      width: "6px"
    } : {},
    backgroundColor: getColor(props.color)
  }));
  return /* @__PURE__ */ jsx(Tree, {
    breadth: 6,
    depth: 3,
    id: 0,
    wrap: 2,
    box: Box
  });
};
const Test$5 = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "mount-wide-tree-styled-components",
    numberOfRuns: 3,
    iterationN: 50,
    TestComponent: TestBase
  });
};
const __vite_glob_0_4$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TestBase,
  default: Test$5
}, Symbol.toStringTag, { value: "Module" }));
const mountWideTree = Object.assign({ "./bench/mount-wide-tree/baseline.tsx": __vite_glob_0_0$1, "./bench/mount-wide-tree/emotion.tsx": __vite_glob_0_1$1, "./bench/mount-wide-tree/stitches-react.tsx": __vite_glob_0_2$1, "./bench/mount-wide-tree/styils-react.tsx": __vite_glob_0_3$1, "./bench/mount-wide-tree/styled-components.tsx": __vite_glob_0_4$1 });
function Home$1() {
  const {
    pathname
  } = useLocation();
  const router = useNavigate();
  useEffect(() => {
    if (pathname === "/styils/benchmark/mount-wide-tree") {
      router("stitches-react");
    }
  }, [pathname, router]);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsxs("ul", {
      children: [/* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "stitches-react",
          children: "Stitches React"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "styled-components",
          children: "Styled components"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "emotion",
          children: "Emotion"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "styils-react",
          children: "styils-react"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "baseline",
          children: "baseline"
        })
      })]
    }), /* @__PURE__ */ jsx(Outlet, {})]
  });
}
const targetSize$4 = 10;
function SierpinskiTriangle$4({
  testIndex,
  x = 0,
  y = 0,
  depth = 0,
  s: _s = 200
}) {
  let s = _s;
  if (s <= targetSize$4) {
    let fn;
    switch (depth) {
      case 1:
        fn = interpolatePurples;
        break;
      case 2:
        fn = interpolateBuPu;
        break;
      case 3:
      default:
        fn = interpolateRdPu;
    }
    const color = fn(testIndex * Math.random() / 20);
    return /* @__PURE__ */ jsx("div", {
      style: {
        borderBottomColor: color,
        borderRightWidth: targetSize$4 / 2,
        borderBottomWidth: targetSize$4 / 2,
        borderLeftWidth: targetSize$4 / 2,
        marginLeft: x - targetSize$4 / 2,
        marginTop: y - targetSize$4 / 2,
        position: "absolute",
        cursor: "pointer",
        width: "0",
        height: "0",
        borderColor: "transparent",
        borderStyle: "solid",
        borderTopWidth: 0,
        transform: "translate(3000%, 3000%)",
        alignItems: "stretch",
        boxSizing: "border-box",
        display: "flex",
        flexBasis: "auto",
        flexDirection: "column",
        flexShrink: 0,
        padding: "0",
        minHeight: "0",
        minWidth: "0"
      }
    });
  }
  s /= 2;
  return /* @__PURE__ */ jsxs(React__default.Fragment, {
    children: [/* @__PURE__ */ jsx(SierpinskiTriangle$4, {
      depth: 1,
      testIndex,
      s,
      x,
      y: y - s / 2
    }), /* @__PURE__ */ jsx(SierpinskiTriangle$4, {
      depth: 2,
      testIndex,
      s,
      x: x - s,
      y: y + s / 2
    }), /* @__PURE__ */ jsx(SierpinskiTriangle$4, {
      depth: 3,
      testIndex,
      s,
      x: x + s,
      y: y + s / 2
    })]
  });
}
const Test$4 = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "sierpinski-triangle-baseline",
    numberOfRuns: 3,
    iterationN: 50,
    TestComponent: SierpinskiTriangle$4
  });
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SierpinskiTriangle: SierpinskiTriangle$4,
  default: Test$4
}, Symbol.toStringTag, { value: "Module" }));
/*
 * @license MIT License
 * Copyright (c) 2021-present, Pedro Duarte.
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const View$3 = styled$2.default("div")({
  alignItems: "stretch",
  borderWidth: "0",
  borderStyle: "solid",
  boxSizing: "border-box",
  display: "flex",
  flexBasis: "auto",
  flexDirection: "column",
  flexShrink: 0,
  margin: "0",
  padding: "0",
  position: "relative",
  minHeight: "0",
  minWidth: "0"
});
const Dot$3 = styled$2.default(View$3)((props) => ({
  position: "absolute",
  cursor: "pointer",
  width: "0",
  height: "0",
  borderColor: "transparent",
  borderStyle: "solid",
  borderTopWidth: "0",
  transform: "translate(3000%, 3000%)",
  marginLeft: `${props.x}px`,
  marginTop: `${props.y}px`,
  borderRightWidth: `${props.size / 2}px`,
  borderBottomWidth: `${props.size / 2}px`,
  borderLeftWidth: `${props.size / 2}px`,
  ...props.css
}));
const targetSize$3 = 10;
function SierpinskiTriangle$3({
  testIndex,
  x = 0,
  y = 0,
  depth = 0,
  s: _s = 200
}) {
  let s = _s;
  if (s <= targetSize$3) {
    let fn;
    switch (depth) {
      case 1:
        fn = interpolatePurples;
        break;
      case 2:
        fn = interpolateBuPu;
        break;
      case 3:
      default:
        fn = interpolateRdPu;
    }
    const color = fn(testIndex * Math.random() / 20);
    return /* @__PURE__ */ jsx(Dot$3, {
      size: targetSize$3,
      x: x - targetSize$3 / 2,
      y: y - targetSize$3 / 2,
      css: {
        borderBottomColor: color
      }
    });
  }
  s /= 2;
  return /* @__PURE__ */ jsxs(React__default.Fragment, {
    children: [/* @__PURE__ */ jsx(SierpinskiTriangle$3, {
      depth: 1,
      testIndex,
      s,
      x,
      y: y - s / 2
    }), /* @__PURE__ */ jsx(SierpinskiTriangle$3, {
      depth: 2,
      testIndex,
      s,
      x: x - s,
      y: y + s / 2
    }), /* @__PURE__ */ jsx(SierpinskiTriangle$3, {
      depth: 3,
      testIndex,
      s,
      x: x + s,
      y: y + s / 2
    })]
  });
}
const Test$3 = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "sierpinski-triangle-emotion",
    numberOfRuns: 3,
    iterationN: 50,
    TestComponent: SierpinskiTriangle$3
  });
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Test$3
}, Symbol.toStringTag, { value: "Module" }));
/*
 * @license MIT License
 * Copyright (c) 2021-present, Pedro Duarte.
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const View$2 = styled$3("div", {
  alignItems: "stretch",
  borderWidth: "0",
  borderStyle: "solid",
  boxSizing: "border-box",
  display: "flex",
  flexBasis: "auto",
  flexDirection: "column",
  flexShrink: 0,
  margin: "0",
  padding: "0",
  position: "relative",
  minHeight: "0",
  minWidth: "0"
});
const Dot$2 = styled$3(View$2, {
  position: "absolute",
  cursor: "pointer",
  width: "0",
  height: "0",
  borderColor: "transparent",
  borderStyle: "solid",
  borderTopWidth: 0,
  transform: "translate(3000%, 3000%)"
});
const targetSize$2 = 10;
function SierpinskiTriangle$2({
  testIndex,
  x = 0,
  y = 0,
  depth = 0,
  s: _s = 200
}) {
  let s = _s;
  if (s <= targetSize$2) {
    let fn;
    switch (depth) {
      case 1:
        fn = interpolatePurples;
        break;
      case 2:
        fn = interpolateBuPu;
        break;
      case 3:
      default:
        fn = interpolateRdPu;
    }
    const color = fn(testIndex * Math.random() / 20);
    return /* @__PURE__ */ jsx(Dot$2, {
      css: {
        borderBottomColor: color,
        borderRightWidth: targetSize$2 / 2,
        borderBottomWidth: targetSize$2 / 2,
        borderLeftWidth: targetSize$2 / 2,
        marginLeft: x - targetSize$2 / 2,
        marginTop: y - targetSize$2 / 2
      }
    });
  }
  s /= 2;
  return /* @__PURE__ */ jsxs(React__default.Fragment, {
    children: [/* @__PURE__ */ jsx(SierpinskiTriangle$2, {
      depth: 1,
      testIndex,
      s,
      x,
      y: y - s / 2
    }), /* @__PURE__ */ jsx(SierpinskiTriangle$2, {
      depth: 2,
      testIndex,
      s,
      x: x - s,
      y: y + s / 2
    }), /* @__PURE__ */ jsx(SierpinskiTriangle$2, {
      depth: 3,
      testIndex,
      s,
      x: x + s,
      y: y + s / 2
    })]
  });
}
const Test$2 = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "sierpinski-triangle-stitches",
    numberOfRuns: 3,
    iterationN: 50,
    TestComponent: SierpinskiTriangle$2
  });
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SierpinskiTriangle: SierpinskiTriangle$2,
  default: Test$2
}, Symbol.toStringTag, { value: "Module" }));
/*
 * @license MIT License
 * Copyright (c) 2021-present, Pedro Duarte.
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const View$1 = styled$1("div", {
  alignItems: "stretch",
  borderWidth: "0",
  borderStyle: "solid",
  boxSizing: "border-box",
  display: "flex",
  flexBasis: "auto",
  flexDirection: "column",
  flexShrink: 0,
  margin: "0",
  padding: "0",
  position: "relative",
  minHeight: "0",
  minWidth: "0"
});
const Dot$1 = styled$1(View$1, {
  position: "absolute",
  cursor: "pointer",
  width: "0",
  height: "0",
  borderColor: "transparent",
  borderStyle: "solid",
  borderTopWidth: 0,
  transform: "translate(3000%, 3000%)"
});
const targetSize$1 = 10;
function SierpinskiTriangle$1({
  testIndex,
  x = 0,
  y = 0,
  depth = 0,
  s: _s = 200
}) {
  let s = _s;
  if (s <= targetSize$1) {
    let fn;
    switch (depth) {
      case 1:
        fn = interpolatePurples;
        break;
      case 2:
        fn = interpolateBuPu;
        break;
      case 3:
      default:
        fn = interpolateRdPu;
    }
    const color = fn(testIndex * Math.random() / 20);
    return /* @__PURE__ */ jsx(Dot$1, {
      style: {
        borderBottomColor: color,
        borderRightWidth: targetSize$1 / 2,
        borderBottomWidth: targetSize$1 / 2,
        borderLeftWidth: targetSize$1 / 2,
        marginLeft: x - targetSize$1 / 2,
        marginTop: y - targetSize$1 / 2
      }
    });
  }
  s /= 2;
  return /* @__PURE__ */ jsxs(React__default.Fragment, {
    children: [/* @__PURE__ */ jsx(SierpinskiTriangle$1, {
      depth: 1,
      testIndex,
      s,
      x,
      y: y - s / 2
    }), /* @__PURE__ */ jsx(SierpinskiTriangle$1, {
      depth: 2,
      testIndex,
      s,
      x: x - s,
      y: y + s / 2
    }), /* @__PURE__ */ jsx(SierpinskiTriangle$1, {
      depth: 3,
      testIndex,
      s,
      x: x + s,
      y: y + s / 2
    })]
  });
}
const Test$1 = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    testIdentifier: "sierpinski-triangle-styils-react",
    numberOfRuns: 3,
    iterationN: 50,
    TestComponent: SierpinskiTriangle$1
  });
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SierpinskiTriangle: SierpinskiTriangle$1,
  default: Test$1
}, Symbol.toStringTag, { value: "Module" }));
/*
 * @license MIT License
 * Copyright (c) 2021-present, Pedro Duarte.
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const View = styled$4.default("div")({
  alignItems: "stretch",
  borderWidth: "0",
  borderStyle: "solid",
  boxSizing: "border-box",
  display: "flex",
  flexBasis: "auto",
  flexDirection: "column",
  flexShrink: 0,
  margin: "0",
  padding: "0",
  position: "relative",
  minHeight: "0",
  minWidth: "0"
});
const Dot = styled$4.default(View)((props) => ({
  position: "absolute",
  cursor: "pointer",
  width: "0",
  height: "0",
  borderColor: "transparent",
  borderStyle: "solid",
  borderTopWidth: "0",
  transform: "translate(3000%, 3000%)",
  marginLeft: `${props.x}px`,
  marginTop: `${props.y}px`,
  borderRightWidth: `${props.size / 2}px`,
  borderBottomWidth: `${props.size / 2}px`,
  borderLeftWidth: `${props.size / 2}px`,
  ...props.css
}));
const targetSize = 10;
function SierpinskiTriangle({
  testIndex,
  x = 0,
  y = 0,
  depth = 0,
  s: _s = 200
}) {
  let s = _s;
  if (s <= targetSize) {
    let fn;
    switch (depth) {
      case 1:
        fn = interpolatePurples;
        break;
      case 2:
        fn = interpolateBuPu;
        break;
      case 3:
      default:
        fn = interpolateRdPu;
    }
    const color = fn(testIndex * Math.random() / 20);
    return /* @__PURE__ */ jsx(Dot, {
      size: targetSize,
      x: x - targetSize / 2,
      y: y - targetSize / 2,
      css: {
        borderBottomColor: color
      }
    });
  }
  s /= 2;
  return /* @__PURE__ */ jsxs(React__default.Fragment, {
    children: [/* @__PURE__ */ jsx(SierpinskiTriangle, {
      depth: 1,
      testIndex,
      s,
      x,
      y: y - s / 2
    }), /* @__PURE__ */ jsx(SierpinskiTriangle, {
      depth: 2,
      testIndex,
      s,
      x: x - s,
      y: y + s / 2
    }), /* @__PURE__ */ jsx(SierpinskiTriangle, {
      depth: 3,
      testIndex,
      s,
      x: x + s,
      y: y + s / 2
    })]
  });
}
const Test = () => {
  return /* @__PURE__ */ jsx(TestRunner, {
    numberOfRuns: 3,
    testIdentifier: "sierpinski-triangle-styled-components",
    iterationN: 50,
    TestComponent: SierpinskiTriangle
  });
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Test
}, Symbol.toStringTag, { value: "Module" }));
const sierpinskiTriangle = Object.assign({ "./bench/sierpinski-triangle/baseline.tsx": __vite_glob_0_0, "./bench/sierpinski-triangle/emotion.tsx": __vite_glob_0_1, "./bench/sierpinski-triangle/stitches-react.tsx": __vite_glob_0_2, "./bench/sierpinski-triangle/styils-react.tsx": __vite_glob_0_3, "./bench/sierpinski-triangle/styled-components.tsx": __vite_glob_0_4 });
function Home() {
  const {
    pathname
  } = useLocation();
  const router = useNavigate();
  useEffect(() => {
    if (pathname === "/styils/benchmark/sierpinski-triangle") {
      router("stitches-react");
    }
  }, [pathname, router]);
  return /* @__PURE__ */ jsxs("div", {
    style: {
      position: "relative"
    },
    children: [/* @__PURE__ */ jsxs("ul", {
      children: [/* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "stitches-react",
          children: "Stitches React"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "styled-components",
          children: "Styled components"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "styils-react",
          children: "styils-react"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "emotion",
          children: "Emotion"
        })
      }), /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "baseline",
          children: "baseline"
        })
      })]
    }), /* @__PURE__ */ jsx(Outlet, {})]
  });
}
const license$1 = "\u6839\u636E MIT \u8BB8\u53EF\u8BC1\u53D1\u5E03";
const copyright$1 = "\u7248\u6743\u6240\u6709 \xA9 2022-\u81F3\u4ECA Zoy-l";
const variantsCode$1 = "variants \u4E3A styled \u7684\u7B2C\u4E09\u4E2A\u53C2\u6570";
const themeCode$1 = "\u4EFB\u4F55";
const errorCode$1 = "\u6BCF\u6B21 setMove \u5C06\u521B\u5EFA\u591A\u4E2A\u51E0\u4E4E\u5B8C\u5168\u76F8\u540C\u7684CSS\u89C4\u5219\uFF0C\u8FD9\u79CD\u60C5\u51B5\u6211\u4EEC\u5E94\u8BE5\u4F7F\u7528 style";
const baseCode$1 = {
  "1": "\u6211\u4EEC\u53EF\u4EE5\u6DFB\u52A0 namespce \u5728\u5F00\u53D1\u7C7B\u5E93\u7684\u65F6\u5019\u8FD9\u53EF\u80FD\u5F88\u6709\u7528",
  "2": ":global \u5185\u7684\u6837\u5F0F\u5C06\u751F\u6210\u5168\u5C40\u6837\u5F0F",
  "3": "\u9ED8\u8BA4\u5355\u4F4D\u662F px"
};
const globalCode$1 = "\u5728styled\u5185\u4F7F\u7528";
const slogan$1 = "\u8F7B\u91CF\u7EA7\u548C\u5FEB\u901F\u7684 css-in-js \u89E3\u51B3\u65B9\u6848\uFF0C\u8FD0\u884C\u65F6\u63A5\u8FD1\u4E8E\u96F6\u3002\u652F\u6301\u4E3B\u9898\u3001SSR\u3001Sourcemap";
const quick$1 = "\u5FEB\u901F\u5F00\u59CB";
const github$1 = "\u5728Github\u4E0A\u67E5\u770B";
const plan$1 = "\u8BA1\u5212\u4E2D";
const fast$1 = "\u5FEB\u901F\u7684";
const fastDesc$1 = "\u5728\u8FD0\u884C\u65F6\u907F\u514D\u4E0D\u5FC5\u8981\u7684\u6837\u5F0F\u9053\u5177\uFF0C\u907F\u514D\u91CD\u590D\u8BA1\u7B97\u6E32\u67D3\u3002";
const typescript$1 = "\u5B8C\u5168\u7C7B\u578B\u5316";
const typescriptDesc$1 = "\u7075\u6D3B\u7684 API \u548C\u5B8C\u6574 TypeScript \u7C7B\u578B\u3002";
const theme$1 = "\u4E3B\u9898\u5316";
const themeDesc$1 = "\u63D0\u4F9B\u4E00\u79CD\u81EA\u5B9A\u4E49\u4E3B\u9898\u7684\u7B80\u5355\u65B9\u6CD5\uFF0C\u60A8\u53EF\u4EE5\u66F4\u6539\u989C\u8272\u3001\u5B57\u4F53\u3001\u65AD\u70B9\u548C\u60A8\u9700\u8981\u7684\u4E00\u5207\u3002";
const small$1 = "\u8D85\u5C0F\u7684";
const smallDesc$1 = "\u63D0\u4F9B\u5B8C\u6574\u7684\u529F\u80FD\u7684\u540C\u65F6\uFF0C\u53EA\u67094kb\u7684\u5927\u5C0F\u5F00\u9500\u3002";
const withBase$1 = "\u57FA\u7840\u4F7F\u7528";
const withVariants$1 = "\u52A8\u6001\u6E32\u67D3";
const withTheme$1 = "\u4F7F\u7528\u4E3B\u9898";
const withSSR$1 = "\u670D\u52A1\u7AEF\u6E32\u67D3";
const withKeyframes$1 = "\u52A8\u753B Keyframes";
const withGlobal$1 = "\u5168\u5C40 Global";
const withMedia$1 = "\u67E5\u8BE2 Media";
const withBaseDesc$1 = {
  "1": "\u5728\u7528\u6CD5\u4E0A\u548C\u5176\u5B83\u4E0A\u7684 <strong>CSS In JS</strong> \u6846\u67B6\u51E0\u4E4E\u6CA1\u6709\u533A\u522B",
  "2": "\u652F\u6301\u7279\u6B8A\u5D4C\u5957\u9009\u62E9\u5668<strong>&</strong>\u53CA<strong>CSS</strong>\u6240\u6709\u539F\u751F\u9009\u62E9\u5668,\u8FD8\u63D0\u4F9B\u4E86\u4E00\u4E2A\u591A\u6001<strong>as</strong>\u5C5E\u6027\uFF0C\u7528\u4E8E\u5B9A\u4E49\u7EC4\u4EF6\u6E32\u67D3\u7684\u6807\u7B7E",
  "3": "\u6B64\u5916\uFF0C\u5982\u679C\u4F7F\u7528<strong>Typescript</strong>\uFF0C\u6DFB\u52A0<strong>as</strong>\u9053\u5177\u65F6\uFF0C\u9053\u5177\u5B9A\u4E49\u4F1A\u66F4\u65B0"
};
const withVariantsDesc$1 = {
  "1": "\u521B\u5EFA\u7684\u6837\u5F0F\u7EC4\u4EF6\u90FD\u5E26\u6709\u4E00\u4E2A<strong>variants</strong>\u5C5E\u6027",
  "2": "\u53EF\u4EE5\u5B9A\u4E49\u5355\u4E2A\u52A8\u6001\u89C4\u5219\u3001\u591A\u4E2A\u52A8\u6001\u89C4\u5219\uFF0C\u751A\u81F3\u662F\u590D\u5408\u52A8\u6001\u89C4\u5219",
  "3": "\u52A8\u6001\u63D2\u503C\u4EE3\u66FF props \u9053\u5177\u4F20\u9012\uFF0C\u56E0\u4E3A\u901A\u8FC7props\u4F20\u503C\u4F1A\u5E26\u6765\u8F83\u5927\u7684\u6027\u80FD\u5F00\u9500\uFF0C\u6B64\u5916\u6211\u4EEC\u53EF\u80FD\u5199\u51FA\u4E0B\u9762\u8FD9\u6BB5\u4EE3\u7801\u3002"
};
const withThemeDesc$1 = "<strong>Styils</strong>\u63D0\u4F9B\u5B8C\u5168\u81EA\u7531\u7684\u4E3B\u9898\u4F53\u9A8C\u3002\u6839\u636E\u9700\u8981\u53EF\u4EE5\u5C06\u5B83\u4EEC\u5E94\u7528\u5230\u4EFB\u4F55\u4F60\u60F3\u8981\u7684\u5730\u65B9\u3002";
const withSSRDesc$1 = {
  "1": "<strong>Styils</strong>\u652F\u6301<strong>ssr</strong>\u5E76\u4E14\u5F88\u5BB9\u6613\u96C6\u6210\u5728\u5E38\u7528\u6846\u67B6\u4E2D",
  "2": "\u5982\u679C\u4F7F\u7528\u4E3B\u9898<strong>createExtracts</strong>\u5E94\u8BE5\u4ECE<strong>createSystem</strong>\u5BFC\u51FA",
  "3": "\u67E5\u770B\u793A\u4F8B:<a href='https://github.com/styils/styils-examples/tree/main/next'>Next</a>\u548C<a href='https://github.com/styils/styils-examples/tree/main/remix'>Remix</a>",
  "4": "\u4E0D\u662F\u7528\u6846\u67B6,<strong>createExtracts</strong>\u8FD4\u56DE\u7684\u5BF9\u8C61\u91CC\u6709\u4E00\u4E2A<strong>extractHtml</strong>\u5C5E\u6027, \u5B83\u8FD4\u56DE\u5B57\u7B26\u4E32\u628A\u5B83\u52A0\u5165\u5230<strong>html</strong>\u4E2D\u5373\u53EF"
};
const withKeyframesDesc$1 = "<strong>Styils</strong>\u63D0\u4F9B\u4E24\u79CD\u65B9\u5F0F\u5B9A\u4E49, \u4EFB\u4F60\u559C\u6B22\u3002";
const withGlobalDesc$1 = "<strong>Styils</strong>\u63D0\u4F9B\u4E24\u79CD\u65B9\u5F0F\u5B9A\u4E49, \u4EFB\u4F60\u559C\u6B22\u3002";
const withMediaDesc$1 = "\u5C31\u50CF\u5728\u5E38\u89C4<strong>CSS</strong>\u4E2D\u4F7F\u7528\u5A92\u4F53\u67E5\u8BE2\u4E00\u6837\uFF0C\u53EF\u4EE5\u5C06<strong>@media</strong>\u76F4\u63A5\u653E\u5728<strong>CSS</strong>\u5757\u4E2D\u3002";
const back$1 = "\u8FD4\u56DE";
const bench$1 = "\u57FA\u51C6";
const benchmarkDesc$1 = "\u6BCF\u6B21\u6D4B\u8BD5\u7ED3\u675F,\u9875\u9762\u90FD\u4F1A reload \u5237\u65B0\u7F13\u5B58";
const testResults$1 = {
  "start-test": "\u5F00\u59CB\u6D4B\u8BD5",
  count: "\u4E2A\u6570",
  frequency: "\u6B21\u6570",
  th1: "\u7B2C\u4E00\u6B21\u8FD0\u884C",
  th2: "\u6700\u540E\u4E00\u6B21\u8FD0\u884C",
  th3: "\u5E73\u5747\u503C",
  th4: "\u4E2D\u4F4D\u503C",
  th5: "\u6700\u5FEB\u503C",
  th6: "\u6700\u6162\u503C",
  th7: "\u6807\u51C6\u504F\u5DEE",
  th8: "\u5E73\u5747",
  desc1: "\u6700\u540E\u4E00\u6B21\u8FD0\u884C\u5E94\u8BE5\u4E0E\u7B2C\u4E00\u6B21\u8FD0\u884C\u76F8\u5DEE\u4E0D\u591A\u6216\u66F4\u5FEB",
  desc2: "\u6807\u51C6\u504F\u5DEE\u5E94\u8BE5\u53EA\u6709\u51E0\u6BEB\u79D2"
};
const retest$1 = "\u91CD\u65B0\u6D4B\u8BD5";
const cn = {
  license: license$1,
  copyright: copyright$1,
  variantsCode: variantsCode$1,
  themeCode: themeCode$1,
  errorCode: errorCode$1,
  baseCode: baseCode$1,
  globalCode: globalCode$1,
  slogan: slogan$1,
  quick: quick$1,
  github: github$1,
  plan: plan$1,
  fast: fast$1,
  fastDesc: fastDesc$1,
  typescript: typescript$1,
  typescriptDesc: typescriptDesc$1,
  theme: theme$1,
  themeDesc: themeDesc$1,
  small: small$1,
  smallDesc: smallDesc$1,
  withBase: withBase$1,
  withVariants: withVariants$1,
  withTheme: withTheme$1,
  withSSR: withSSR$1,
  withKeyframes: withKeyframes$1,
  withGlobal: withGlobal$1,
  withMedia: withMedia$1,
  withBaseDesc: withBaseDesc$1,
  withVariantsDesc: withVariantsDesc$1,
  withThemeDesc: withThemeDesc$1,
  withSSRDesc: withSSRDesc$1,
  withKeyframesDesc: withKeyframesDesc$1,
  withGlobalDesc: withGlobalDesc$1,
  withMediaDesc: withMediaDesc$1,
  back: back$1,
  bench: bench$1,
  "create-and-mount-button": "\u521B\u5EFA\u5E76\u6302\u8F7D\u6309\u94AE",
  "change-a-variant": "\u66F4\u6539\u7EC4\u4EF6\u7684\u53D8\u4F53",
  "change-css-prop": "\u66F4\u6539\u9053\u5177\u4E2D\u7684\u503C",
  "sierpinski-triangle": "\u8C22\u5C14\u5BBE\u65AF\u57FA\u4E09\u89D2",
  "mount-deep-tree": "\u6302\u8F7D\u6DF1\u5EA6\u6837\u5F0F",
  "mount-wide-tree": "\u6302\u8F7D\u5E7F\u5EA6\u6837\u5F0F",
  benchmarkDesc: benchmarkDesc$1,
  testResults: testResults$1,
  retest: retest$1
};
const license = "Released under the MIT License";
const copyright = "Copyright \xA9 2022-present Zoy-l";
const variantsCode = "variants is the third parameter of styled";
const themeCode = "any";
const errorCode = "Each setMove will create multiple almost identical CSS rules\n  // in this case we should use style";
const baseCode = {
  "1": "We can add namespce which may be useful when developing class libraries",
  "2": ":Styles inside global will generate global styles",
  "3": "The default unit is px"
};
const globalCode = "Use in styled";
const slogan = "Lightweight and fast css-in-js solution with near zero runtime. Support Themes\u3001SSR\u3001Sourcemap";
const quick = "Quick Start";
const github = "View on Github";
const plan = "Planning";
const fast = "Fast";
const fastDesc = "Avoid unnecessary style props at runtime and avoid double-computing rendering.";
const typescript = "Fully Typed";
const typescriptDesc = "Flexible API and full TypeScript types.";
const theme = "Theming";
const themeDesc = "Provides an easy way to customize the theme, you can change colors, fonts, breakpoints and everything you need.";
const small = "Super small";
const smallDesc = "Only 4kb overhead while providing full functionality.";
const withBase = "Base use";
const withVariants = "Dynamic rendering";
const withTheme = "Use Theme";
const withSSR = "Server-side rendering";
const withKeyframes = "Animation Keyframes";
const withGlobal = "Global Global";
const withMedia = "Query Media";
const withBaseDesc = {
  "1": "The usage is almost the same as other<strong>CSS In JS</strong>frameworks",
  "2": "Supports special nested selectors<strong>`&`</strong>and<strong>CSS</strong>all native selectors, and also provides a polymorphic<strong>`as`</strong>property, used to define the label that the component renders",
  "3": "Also, if using<strong>Typescript</strong>, prop definitions are updated when<strong>`as`</strong>props are added"
};
const withVariantsDesc = {
  "1": "Style components are created with a<strong>variants</strong>attribute",
  "2": "You can define a single dynamic rule, multiple dynamic rules, or even compound dynamic rules",
  "3": "Dynamic interpolation replaces props props passing, because passing values through props will bring a large performance overhead, in addition, we may write the following code."
};
const withThemeDesc = "<strong>Styils</strong>provides a completely free theme experience. Apply them wherever you want as needed.";
const withSSRDesc = {
  "1": "<strong>Styils</strong>supports<strong>ssr</strong>and is easy to integrate into commonly used frameworks",
  "2": "If using theme<strong>createExtracts</strong>should be exported from<strong>createSystem</strong>",
  "3": "View examples:<a href='https://github.com/styils/styils-examples/tree/main/next'>Next</a>and<a href='https://github.com/styils/styils-examples/tree/main/remix'>Remix</a>",
  "4": "Instead of using the framework,<strong>createExtracts returns</strong> an object with an <strong>extractHtml</strong> attribute, it returns a string and adds it to the <strong>html</strong>"
};
const withKeyframesDesc = "<strong>Styils</strong>provides two ways to define as you like.";
const withGlobalDesc = "<strong>Styils</strong>provides two ways to define as you like.";
const withMediaDesc = "Just like using media queries in regular<strong>CSS</strong>,<strong>@media</strong>can be placed directly in the<strong>CSS</strong>block.";
const back = "Back";
const bench = "Bench";
const benchmarkDesc = "After each test, the page will be reloaded to refresh the cache";
const testResults = {
  "start-test": "Start test",
  count: "Count",
  frequency: "Frequency",
  th1: "First run",
  th2: "Last run",
  th3: "Average",
  th4: "Median",
  th5: "Fastest",
  th6: "Slowest",
  th7: "SD",
  th8: "Average",
  desc1: "The last run should be about the same or faster than the first",
  desc2: "Standard deviation should be only a few milliseconds"
};
const retest = "Retest";
const en = {
  license,
  copyright,
  variantsCode,
  themeCode,
  errorCode,
  baseCode,
  globalCode,
  slogan,
  quick,
  github,
  plan,
  fast,
  fastDesc,
  typescript,
  typescriptDesc,
  theme,
  themeDesc,
  small,
  smallDesc,
  withBase,
  withVariants,
  withTheme,
  withSSR,
  withKeyframes,
  withGlobal,
  withMedia,
  withBaseDesc,
  withVariantsDesc,
  withThemeDesc,
  withSSRDesc,
  withKeyframesDesc,
  withGlobalDesc,
  withMediaDesc,
  back,
  bench,
  "create-and-mount-button": "Create and mount button",
  "change-a-variant": "Change the variant",
  "change-css-prop": "Change the value in prop",
  "sierpinski-triangle": "Sierpinski triangle",
  "mount-deep-tree": "Mount depth style",
  "mount-wide-tree": "Mount wide-tree",
  benchmarkDesc,
  testResults,
  retest
};
const resources = {
  Zh: {
    translation: cn
  },
  En: {
    translation: en
  }
};
i18n.use(initReactI18next).init({
  resources,
  lng: "En",
  debug: false,
  interpolation: {
    escapeValue: false
  },
  detection: {
    caches: ["localStorage", "sessionStorage", "cookie"]
  }
});
function getPathElement(modules, base) {
  const child = [];
  Object.keys(modules).forEach((path) => {
    child.push({
      path: path.replace(".tsx", "").replace(`./bench/${base}/`, ""),
      Element: modules[path].default
    });
  });
  return child;
}
global((theme2) => ({
  html: {
    "scroll-behavior": "smooth"
  },
  a: {
    textDecoration: "none"
  },
  body: {
    fontSize: 16,
    backgroundColor: theme2.bgColor,
    fontDisplay: "optional",
    fontFamily: `PingFang SC,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  "*:not(pre *)": {
    color: theme2.mainColor,
    listStyle: "none",
    margin: 0,
    padding: 0
  }
}));
const Root = styled("div", () => ({
  maxWidth: 1280,
  margin: "0 auto",
  minHeight: "100vh",
  padding: "0 64px",
  transition: "padding .3s",
  "@media screen and (max-width: 900px)": {
    padding: "0 28px"
  }
}));
const Footer = styled("footer", () => ({
  textAlign: "center",
  padding: "20px 0",
  "& span": {
    display: "block",
    color: "rgb(100, 116, 139)",
    fontSize: "0.875rem"
  }
}));
const Header = styled("header", (theme2) => ({
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  top: "10%",
  right: 0,
  height: 32,
  zIndex: "99",
  position: "absolute",
  display: "flex",
  alignItems: "flex-end",
  flexDirection: "column",
  "& >*": {
    backdropFilter: "saturate(180%) blur(84px)",
    backgroundColor: theme2.bgSecondColor,
    marginBottom: 16,
    padding: "8px 15px",
    cursor: "pointer",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    fontWeight: 500,
    userSelect: "none",
    boxShadow: theme2.boxShadow
  }
}));
const Translate = styled("div", {
  display: "flex",
  alignItems: "center",
  "&:active svg": {
    transform: "scale(1.5)"
  },
  "& svg": {
    transition: "all .3s",
    paddingRight: 8
  }
});
function App() {
  const {
    t
  } = useTranslation();
  const {
    pathname
  } = useLocation();
  const isBench = pathname.indexOf("benchmark") >= 0;
  return /* @__PURE__ */ jsx(I18nextProvider, {
    i18n,
    children: /* @__PURE__ */ jsxs(Root, {
      children: [/* @__PURE__ */ jsxs(Header, {
        children: [/* @__PURE__ */ jsxs(Translate, {
          onClick: () => {
            const currentLanguage = i18n.language === "Zh" ? "En" : "Zh";
            localStorage.setItem("styils-doc-key", currentLanguage);
            i18n.changeLanguage(currentLanguage);
          },
          children: [/* @__PURE__ */ jsx("svg", {
            fill: "currentColor",
            viewBox: "0 0 24 24",
            height: "1.5em",
            width: "1.5em",
            children: /* @__PURE__ */ jsx("path", {
              d: "M5 15v2a2 2 0 0 0 1.85 1.995L7 19h3v2H7a4 4 0 0 1-4-4v-2h2zm13-5l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16 10h2zm-1 2.885L15.753 16h2.492L17 12.885zM8 2v2h4v7H8v3H6v-3H2V4h4V2h2zm9 1a4 4 0 0 1 4 4v2h-2V7a2 2 0 0 0-2-2h-3V3h3zM6 6H4v3h2V6zm4 0H8v3h2V6z"
            })
          }), i18n.language]
        }), isBench ? /* @__PURE__ */ jsx(Link$1, {
          to: "/styils",
          children: t("back")
        }) : /* @__PURE__ */ jsx(Link$1, {
          to: "/styils/benchmark",
          children: t("bench")
        })]
      }), /* @__PURE__ */ jsxs(Routes, {
        children: [/* @__PURE__ */ jsx(Route, {
          path: "/styils",
          element: /* @__PURE__ */ jsx(Home$6, {})
        }), /* @__PURE__ */ jsxs(Route, {
          path: "/styils/benchmark",
          element: /* @__PURE__ */ jsx(Benchmark, {}),
          children: [/* @__PURE__ */ jsx(Route, {
            path: "change-variant",
            element: /* @__PURE__ */ jsx(Home$5, {}),
            children: getPathElement(changeVariant, "change-variant").map(({
              path,
              Element
            }) => {
              return /* @__PURE__ */ jsx(Route, {
                path,
                element: /* @__PURE__ */ jsx(Element, {})
              }, path);
            })
          }), /* @__PURE__ */ jsx(Route, {
            path: "change-css-prop",
            element: /* @__PURE__ */ jsx(Home$4, {}),
            children: getPathElement(changeCssProp, "change-css-prop").map(({
              path,
              Element
            }) => {
              return /* @__PURE__ */ jsx(Route, {
                path,
                element: /* @__PURE__ */ jsx(Element, {})
              }, path);
            })
          }), /* @__PURE__ */ jsx(Route, {
            path: "create-and-mount-button",
            element: /* @__PURE__ */ jsx(Home$3, {}),
            children: getPathElement(createMountButton, "create-and-mount-button").map(({
              path,
              Element
            }) => {
              return /* @__PURE__ */ jsx(Route, {
                path,
                element: /* @__PURE__ */ jsx(Element, {})
              }, path);
            })
          }), /* @__PURE__ */ jsx(Route, {
            path: "mount-deep-tree",
            element: /* @__PURE__ */ jsx(Home$2, {}),
            children: getPathElement(mountDeepTree, "mount-deep-tree").map(({
              path,
              Element
            }) => {
              return /* @__PURE__ */ jsx(Route, {
                path,
                element: /* @__PURE__ */ jsx(Element, {})
              }, path);
            })
          }), /* @__PURE__ */ jsx(Route, {
            path: "mount-wide-tree",
            element: /* @__PURE__ */ jsx(Home$1, {}),
            children: getPathElement(mountWideTree, "mount-wide-tree").map(({
              path,
              Element
            }) => {
              return /* @__PURE__ */ jsx(Route, {
                path,
                element: /* @__PURE__ */ jsx(Element, {})
              }, path);
            })
          }), /* @__PURE__ */ jsx(Route, {
            path: "sierpinski-triangle",
            element: /* @__PURE__ */ jsx(Home, {}),
            children: getPathElement(sierpinskiTriangle, "sierpinski-triangle").map(({
              path,
              Element
            }) => {
              return /* @__PURE__ */ jsx(Route, {
                path,
                element: /* @__PURE__ */ jsx(Element, {})
              }, path);
            })
          })]
        })]
      }), /* @__PURE__ */ jsxs(Footer, {
        children: [/* @__PURE__ */ jsx("span", {
          children: t("license")
        }), /* @__PURE__ */ jsx("span", {
          children: t("copyright")
        })]
      })]
    })
  });
}
function render(url) {
  const appHtml = ReactDOMServer.renderToString(/* @__PURE__ */ jsx(SystemProvider, {
    children: /* @__PURE__ */ jsx(StaticRouter, {
      location: "/styils" + url,
      children: /* @__PURE__ */ jsx(App, {})
    })
  }));
  const {
    extractHtml
  } = createExtracts();
  flush("global");
  return {
    appHtml,
    style: extractHtml
  };
}
export {
  render
};
