(function(e){function t(t){for(var r,o,s=t[0],c=t[1],u=t[2],d=0,p=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&p.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(p.length)p.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(r=!1)}r&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},a={index:0},i=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var l=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("e7b2")},"5a84":function(e,t,n){"use strict";n("99af"),n("4160"),n("caad"),n("d3b7"),n("2532"),n("159b"),n("96cf"),n("69d9");var r=n("2ef0"),a=n("d697");t["a"]={data:function(){return{isSettingsBroadcastThrow:!0,isSettingsBroadcastSet:!0,settings:{isEnabled:!1,hide:{lineTagIs:!0}}}},watch:{settings:{handler:function(e){var t=this;this.isSettingsBroadcastThrow&&(this.isSettingsBroadcastSet=!1,sessionStorage.setItem("settings",JSON.stringify(e)),miro.broadcastData(e).then((function(){t.isSettingsBroadcastSet=!0})))},deep:!0}},mounted:function(){var e=this;return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:miro.onReady((function(){var t;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:t=sessionStorage.getItem("settings"),t?e.settings=JSON.parse(t):sessionStorage.setItem("settings",JSON.stringify(e.settings)),miro.addListener("DATA_BROADCASTED",e.DATA_BROADCASTED);case 3:case"end":return n.stop()}}))}));case 1:case"end":return t.stop()}}))},destroyed:function(){miro.removeListener("DATA_BROADCASTED",this.DATA_BROADCASTED)},methods:{DATA_BROADCASTED:function(e){var t=this;this.isSettingsBroadcastSet&&(this.isSettingsBroadcastThrow=!1,new Promise((function(n){t.settings=e.data,n()})).then((function(e){t.isSettingsBroadcastThrow=!0})))},log:function(){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];(e=console).log.apply(e,n.concat([this.$el.baseURI]))},sleep:function(e){return new Promise((function(t){return setTimeout(t,e)}))},isDevelopment:function(){return!1},getArray:function(e){switch(!0){case null===e:case void 0===e:return[];case Array.isArray(e):return e;default:return[e]}},getWidgetById:function(e){var t;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,regeneratorRuntime.awrap(miro.board.widgets.get({id:e}));case 2:if(t=n.sent,!t.length){n.next=5;break}return n.abrupt("return",t[0]);case 5:return n.abrupt("return",null);case 6:case"end":return n.stop()}}))},getWidgetSelectFirst:function(){var e;return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,regeneratorRuntime.awrap(miro.board.selection.get());case 2:if(e=t.sent,!e.length){t.next=5;break}return t.abrupt("return",e[0]);case 5:return t.abrupt("return",null);case 6:case"end":return t.stop()}}))},getWidgetTagId_:function(){var e,t;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return e=[],n.next=3,regeneratorRuntime.awrap(miro.board.widgets.get({type:a["a"].widget.type.FRAME}));case 3:if(t=n.sent,t.length){n.next=6;break}return n.abrupt("return",[]);case 6:return Object(r["each"])(t,(function(t){"#"===t.title.charAt(0)&&(e=e.concat(t.childrenIds))})),n.abrupt("return",e);case 8:case"end":return n.stop()}}))},isWidgetTagById:function(e){var t;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,regeneratorRuntime.awrap(this.getWidgetTagId_());case 2:return t=n.sent,n.abrupt("return",t.includes(e));case 4:case"end":return n.stop()}}),null,this)},updateWidget:function(e){var t;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:if(e){n.next=2;break}return n.abrupt("return");case 2:return t=[],this.getArray(e).forEach((function(e){var n={id:e.id,clientVisible:e.clientVisible};t.push(n)})),n.next=6,regeneratorRuntime.awrap(miro.board.widgets.update(t));case 6:case"end":return n.stop()}}),null,this)}}}},"69d9":function(e,t,n){"use strict";(function(e){var n="isHotReload_";t["a"]={registerHotReload:function(t){t=n+t,e&&e.hot&&(sessionStorage.setItem(t,"false"),e.hot.addStatusHandler((function(e){sessionStorage.setItem(t,"true")})))},isHotReload:function(e){return e=n+e,"true"===sessionStorage.getItem(e)}}}).call(this,n("dd40")(e))},d697:function(e,t,n){"use strict";t["a"]={widget:{type:{LINE:"LINE",FRAME:"FRAME",TEXT:"TEXT",IMAGE:"IMAGE",STICKER:"STICKER",SHAPE:"SHAPE",WEBSCREEN:"WEBSCREEN",CURVE:"CURVE",EMBED:"EMBED",PREVIEW:"PREVIEW",CARD:"CARD",DOCUMENT:"DOCUMENT",MOCKUP:"MOCKUP",COMMENT:"COMMENT"}},viewport:{padding:{top:60,left:80,right:80,bottom:70}},icon:{app:'<path transform="matrix(1.065 0 0 1.0657 -.7918 -.82116)" d="m11.014 12.038c0.30852 0.51818-0.54628 0.67153-0.86125 0.51278-0.85354-0.4302-0.70513-1.6256-0.16432-2.2353 0.96739-1.0906 2.6901-0.8102 3.6093 0.18415 1.3489 1.4592 0.92235 3.7706-0.53261 4.9834-1.9392 1.6164-4.8568 1.0378-6.3574-0.88108-1.8883-2.4147-1.1549-5.9459 1.2295-7.7314 2.8879-2.1625 7.0366-1.2731 9.1055 1.578 2.4381 3.3599 1.3919 8.1283-1.9265 10.479-3.8312 2.7146-9.2206 1.5111-11.854-2.2749-2.9917-4.3019-1.6306-10.313 2.6234-13.228 4.7724-3.2692 11.407-1.7504 14.602 2.9719 3.547 5.2426 1.8703 12.5-3.3203 15.976" fill="none" stroke="#000" stroke-dasharray="14.55179499, 3.63794874, 1.81897438, 3.63794874" stroke-linecap="round" stroke-linejoin="bevel" stroke-width="1.819" style="paint-order:normal"/>',appDev:'<path opacity=".32" transform="matrix(1.065 0 0 1.0657 -.7918 -.82116)" d="m11.014 12.038c0.30852 0.51818-0.54628 0.67153-0.86125 0.51278-0.85354-0.4302-0.70513-1.6256-0.16432-2.2353 0.96739-1.0906 2.6901-0.8102 3.6093 0.18415 1.3489 1.4592 0.92235 3.7706-0.53261 4.9834-1.9392 1.6164-4.8568 1.0378-6.3574-0.88108-1.8883-2.4147-1.1549-5.9459 1.2295-7.7314 2.8879-2.1625 7.0366-1.2731 9.1055 1.578 2.4381 3.3599 1.3919 8.1283-1.9265 10.479-3.8312 2.7146-9.2206 1.5111-11.854-2.2749-2.9917-4.3019-1.6306-10.313 2.6234-13.228 4.7724-3.2692 11.407-1.7504 14.602 2.9719 3.547 5.2426 1.8703 12.5-3.3203 15.976" fill="none" stroke="#000" stroke-dasharray="14.55179499, 3.63794874, 1.81897438, 3.63794874" stroke-linecap="round" stroke-linejoin="bevel" stroke-width="1.819" style="paint-order:normal"/><g xmlns="http://www.w3.org/2000/svg" aria-label="dev" transform="rotate(-45)"><path d="m -7.6645776,21.706474 -0.047301,-1.182519 q -0.2522708,0.307455 -0.5203086,0.559726 -0.2680378,0.25227 -0.5754929,0.43359 -0.3074551,0.173436 -0.662211,0.268038 -0.3468724,0.102485 -0.7725789,0.102485 -0.709512,0 -1.261355,-0.283805 -0.551842,-0.283804 -0.930248,-0.804113 -0.370523,-0.528192 -0.56761,-1.277121 -0.197086,-0.748929 -0.197086,-1.671295 0,-1.103685 0.307455,-1.907798 0.315338,-0.811997 0.867181,-1.340189 0.551842,-0.536075 1.308655,-0.788346 0.7568122,-0.260154 1.6476436,-0.260154 0.2995716,0 0.5991433,0.03942 0.3074551,0.03942 0.543959,0.102485 V 10.56714 h 1.9235652 v 11.139334 z m -3.5160254,-3.941732 q 0,0.662211 0.08672,1.135219 0.0946,0.465125 0.268037,0.764696 0.18132,0.299572 0.441474,0.441474 0.260155,0.134019 0.5912601,0.134019 0.4887748,0 0.9302488,-0.394173 0.4414739,-0.394173 0.9381322,-1.080035 v -3.500258 q -0.2286205,-0.08672 -0.5676094,-0.141902 -0.3311055,-0.05518 -0.6700945,-0.05518 -0.4651243,0 -0.8356472,0.189203 -0.370523,0.189203 -0.638561,0.536075 -0.260154,0.346873 -0.402056,0.851414 -0.141903,0.496659 -0.141903,1.119452 z" style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:16.14533424px;font-family:Consolas;-inkscape-font-specification:\'Consolas, Bold\';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;writing-mode:lr-tb;text-anchor:start;stroke-width:0.40363145" id="path1152" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" inkscape:connector-curvature="0"/><path d="m 3.1673021,17.086764 q 0,0.197087 -0.015767,0.512426 -0.00788,0.315338 -0.031534,0.591259 h -5.2661539 q 0,0.528192 0.1576693,0.930249 0.1655527,0.402057 0.4572409,0.677978 0.2995716,0.268038 0.70951175,0.40994 0.4178236,0.141902 0.92236529,0.141902 0.58337634,0 1.24558736,-0.08672 0.6700944,-0.0946 1.3874896,-0.299571 v 1.529392 q -0.3074551,0.08672 -0.6700944,0.157669 -0.3626394,0.07095 -0.7410456,0.126135 -0.37840631,0.05518 -0.76469605,0.07883 -0.38628973,0.03153 -0.74892908,0.03153 -0.91448177,0 -1.63976047,-0.260154 -0.7252787,-0.260155 -1.2298204,-0.764696 -0.5045417,-0.512426 -0.7725795,-1.261355 -0.2680378,-0.748929 -0.2680378,-1.734362 0,-0.977549 0.2680378,-1.773779 0.2680378,-0.804113 0.7568126,-1.371723 0.4887747,-0.575493 1.1825196,-0.882948 0.7016282,-0.315338 1.56092582,-0.315338 0.85141411,0 1.50574158,0.268037 0.6543276,0.260155 1.0958015,0.733163 0.441474,0.473007 0.6700945,1.127335 0.2286204,0.654327 0.2286204,1.43479 z m -1.955099,-0.275921 q 0.00788,-0.473008 -0.118252,-0.81988 -0.12613542,-0.354756 -0.34687241,-0.583376 -0.21285353,-0.228621 -0.5045417,-0.338989 -0.2838047,-0.110369 -0.61491019,-0.110369 -0.7252787,0 -1.1904031,0.488775 -0.4651243,0.480891 -0.5518424,1.363839 z" style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:16.14533424px;font-family:Consolas;-inkscape-font-specification:\'Consolas, Bold\';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;writing-mode:lr-tb;text-anchor:start;stroke-width:0.40363145" id="path1154" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" inkscape:connector-curvature="0"/><path d="M 9.5607917,21.706474 H 7.3455383 l -3.177036,-8.009599 h 2.1443022 l 1.6634109,4.540875 0.4966582,1.466324 0.4887748,-1.403256 1.6791776,-4.603943 h 2.065468 z" style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:16.14533424px;font-family:Consolas;-inkscape-font-specification:\'Consolas, Bold\';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;writing-mode:lr-tb;text-anchor:start;stroke-width:0.40363145" id="path1156" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" inkscape:connector-curvature="0"/></g>'},lineDirection:{OUT:1,IN:2}}},e7b2:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}})},i=[],o=(n("99af"),n("4160"),n("caad"),n("d3b7"),n("2532"),n("159b"),n("96cf"),n("2ef0"),n("69d9")),s=n("d697"),c={name:"Index",components:{},data:function(){return{}},mounted:function(){this.init()},destroyed:function(){miro.removeListener("SELECTION_UPDATED",this.showHideLine)},methods:{init:function(){var e=this;return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:miro.onReady((function(){var t,n;return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:if(t=e.isDevelopment()?s["a"].icon.appDev:s["a"].icon.app,n=e,o["a"].isHotReload()){r.next=5;break}return r.next=5,regeneratorRuntime.awrap(miro.initialize({extensionPoints:{bottomBar:{title:"AnimeRUles",svgIcon:t,onClick:function(){n.openBottomPanel()}}}}));case 5:miro.addListener("SELECTION_UPDATED",e.showHideLine),e.isDevelopment()&&e.openBottomPanel();case 7:case"end":return r.stop()}}))}));case 1:case"end":return t.stop()}}))},openBottomPanel:function(){miro.board.ui.openBottomPanel("bottom-bar.html",{width:140})},showHideLine:function(e){var t,n,r;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:if(!this.settings.isEnabled){a.next=29;break}if(e.data.length){a.next=5;break}return a.next=4,regeneratorRuntime.awrap(this.showWidget());case 4:return a.abrupt("return");case 5:t=[],n=0;case 7:if(!(n<e.data.length)){a.next=28;break}if(r=e.data[n],r.type!==s["a"].widget.type.LINE){a.next=17;break}return a.t0=t,a.next=13,regeneratorRuntime.awrap(miro.board.widgets.get({id:r.id}));case 13:a.t1=a.sent,t=a.t0.concat.call(a.t0,a.t1),a.next=25;break;case 17:return a.t2=t,a.next=20,regeneratorRuntime.awrap(miro.board.widgets.get({endWidgetId:r.id}));case 20:return a.t3=a.sent,a.next=23,regeneratorRuntime.awrap(miro.board.widgets.get({startWidgetId:r.id}));case 23:a.t4=a.sent,t=a.t2.concat.call(a.t2,a.t3,a.t4);case 25:n++,a.next=7;break;case 28:this.hideWidget(t);case 29:case"end":return a.stop()}}),null,this)},hideWidget:function(e){var t,n,r=this;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,regeneratorRuntime.awrap(this.getWidgetTagId_());case 2:return t=a.sent,a.next=5,regeneratorRuntime.awrap(miro.board.widgets.get({type:s["a"].widget.type.LINE}));case 5:n=a.sent,n.forEach((function(n){n.clientVisible=!1,r.settings.hide.lineTagIs&&(t.includes(n.startWidgetId)||t.includes(n.endWidgetId))?n.clientVisible=!1:e.forEach((function(e){n.id!==e.id||(n.clientVisible=!0)}))})),this.updateWidget(n);case 8:case"end":return a.stop()}}),null,this)},showWidget:function(){var e,t,n=this;return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,regeneratorRuntime.awrap(this.getWidgetTagId_());case 2:return e=r.sent,r.next=5,regeneratorRuntime.awrap(miro.board.widgets.get({type:s["a"].widget.type.LINE}));case 5:t=r.sent,t.forEach((function(t){n.settings.hide.lineTagIs&&(e.includes(t.startWidgetId)||e.includes(t.endWidgetId))?t.clientVisible=!1:t.clientVisible=!0})),this.updateWidget(t);case 8:case"end":return r.stop()}}),null,this)}}},u=c,l=n("2877"),d=Object(l["a"])(u,a,i,!1,null,null,null),p=d.exports,f=n("5a84");o["a"].registerHotReload(),r["default"].config.productionTip=!1,r["default"].mixin(f["a"]),new r["default"]({render:function(e){return e(p)}}).$mount("#app")}});
//# sourceMappingURL=index.c87562c6.js.map