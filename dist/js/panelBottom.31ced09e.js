(function(t){function e(e){for(var r,o,s=e[0],c=e[1],u=e[2],d=0,f=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&f.push(i[o][0]),i[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(f.length)f.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,s=1;s<n.length;s++){var c=n[s];0!==i[c]&&(r=!1)}r&&(a.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},i={panelBottom:0},a=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;a.push([1,"chunk-vendors"]),n()})({"0351":function(t,e,n){"use strict";var r=n("9a7c"),i=n.n(r);i.a},1:function(t,e,n){t.exports=n("ae1b")},"5a84":function(t,e,n){"use strict";n("99af"),n("4160"),n("d3b7"),n("159b"),n("96cf"),n("69d9");var r=n("2ef0"),i=n("d697");e["a"]={data:function(){return{isSettingsBroadcastThrow:!0,isSettingsBroadcastSet:!0,settings:{isEnabled:!1,hide:{lineTagIs:!0}}}},watch:{settings:{handler:function(t){var e=this;this.isSettingsBroadcastThrow&&(this.isSettingsBroadcastSet=!1,sessionStorage.setItem("settings",JSON.stringify(t)),miro.broadcastData(t).then((function(){e.isSettingsBroadcastSet=!0})))},deep:!0}},mounted:function(){var t=this;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:miro.onReady((function(){var e;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:e=sessionStorage.getItem("settings"),e?t.settings=JSON.parse(e):sessionStorage.setItem("settings",JSON.stringify(t.settings)),miro.addListener("DATA_BROADCASTED",t.DATA_BROADCASTED);case 3:case"end":return n.stop()}}))}));case 1:case"end":return e.stop()}}))},destroyed:function(){miro.removeListener("DATA_BROADCASTED",this.DATA_BROADCASTED)},methods:{DATA_BROADCASTED:function(t){var e=this;this.isSettingsBroadcastSet&&(this.isSettingsBroadcastThrow=!1,new Promise((function(n){e.settings=t.data,n()})).then((function(t){e.isSettingsBroadcastThrow=!0})))},log:function(){for(var t,e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];(t=console).log.apply(t,n.concat([this.$el.baseURI]))},isDevelopment:function(){return!1},getArray:function(t){switch(!0){case null===t:case void 0===t:return[];case Array.isArray(t):return t;default:return[t]}},getWidgetById:function(t){var e;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,regeneratorRuntime.awrap(miro.board.widgets.get({id:t}));case 2:if(e=n.sent,!e.length){n.next=5;break}return n.abrupt("return",e[0]);case 5:return n.abrupt("return",null);case 6:case"end":return n.stop()}}))},getWidgetSelectFirst:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(miro.board.selection.get());case 2:if(t=e.sent,!t.length){e.next=5;break}return e.abrupt("return",t[0]);case 5:return e.abrupt("return",null);case 6:case"end":return e.stop()}}))},getWidgetTagId_:function(){var t,e;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return t=[],n.next=3,regeneratorRuntime.awrap(miro.board.widgets.get({type:i["a"].widget.type.FRAME}));case 3:if(e=n.sent,e.length){n.next=6;break}return n.abrupt("return",[]);case 6:return Object(r["each"])(e,(function(e){"#"===e.title.charAt(0)&&(t=t.concat(e.childrenIds))})),n.abrupt("return",t);case 8:case"end":return n.stop()}}))},updateWidget:function(t){var e;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:if(t){n.next=2;break}return n.abrupt("return");case 2:return e=[],this.getArray(t).forEach((function(t){var n={id:t.id,clientVisible:t.clientVisible};e.push(n)})),n.next=6,regeneratorRuntime.awrap(miro.board.widgets.update(e));case 6:case"end":return n.stop()}}),null,this)}}}},"69d9":function(t,e,n){"use strict";(function(t){var n="isHotReload_";e["a"]={registerHotReload:function(e){e=n+e,t&&t.hot&&(sessionStorage.setItem(e,"false"),t.hot.addStatusHandler((function(t){sessionStorage.setItem(e,"true")})))},isHotReload:function(t){return t=n+t,"true"===sessionStorage.getItem(t)}}}).call(this,n("dd40")(t))},"9a7c":function(t,e,n){},ae1b:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=n("5c96"),a=n.n(i),o=(n("0fae"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("el-switch",{attrs:{title:"show only widget lines"},model:{value:t.settings.isEnabled,callback:function(e){t.$set(t.settings,"isEnabled",e)},expression:"settings.isEnabled"}}),n("el-button",{attrs:{size:"mini",title:"create...",icon:"el-icon-plus",circle:""},on:{click:t.openLeftSidebar}}),n("el-button",{attrs:{size:"mini",title:"show all widgets",icon:"el-icon-view",circle:""},on:{click:t.showWidgetAll}})],1)}),s=[],c=(n("4160"),n("d3b7"),n("159b"),n("96cf"),n("d697"),{name:"BottomBar",components:{},data:function(){return{}},mounted:function(){var t=this;miro.onReady((function(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:t.isDevelopment()&&t.openLeftSidebar();case 1:case"end":return e.stop()}}))}))},methods:{openLeftSidebar:function(){miro.board.ui.openLeftSidebar("left-sidebar.html",{width:180})},showWidgetAll:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(miro.board.widgets.get());case 2:t=e.sent,t.forEach((function(t){t.clientVisible=!0})),this.updateWidget(t);case 5:case"end":return e.stop()}}),null,this)}}}),u=c,l=(n("0351"),n("2877")),d=Object(l["a"])(u,o,s,!1,null,null,null),f=d.exports,p=n("69d9"),g=n("5a84");p["a"].registerHotReload(),r["default"].use(a.a),r["default"].config.productionTip=!1,r["default"].mixin(g["a"]),new r["default"]({render:function(t){return t(f)}}).$mount("#app")},d697:function(t,e,n){"use strict";e["a"]={widget:{type:{LINE:"LINE",FRAME:"FRAME",TEXT:"TEXT"}},icon:{app:'<path xmlns="http://www.w3.org/2000/svg" transform="matrix(1.0649522,0,0,1.0657413,-0.79179574,-0.82116488)" d="m 11.014246,12.038388 c 0.308522,0.518181 -0.546283,0.671534 -0.86125,0.512784 C 9.2994549,12.120971 9.4478638,10.925582 9.9886778,10.315888 10.956067,9.2252893 12.678826,9.5056897 13.597996,10.500036 14.946915,11.959279 14.52035,14.27062 13.065382,15.483388 11.126139,17.099817 8.2085378,16.521157 6.7079963,14.602309 4.8197179,12.187634 5.5530784,8.6563815 7.9375413,6.8708886 10.825445,4.7084174 14.97415,5.5978085 17.042996,8.4488994 19.481058,11.808811 18.434875,16.577188 15.116519,18.928388 11.285345,21.642941 5.8958848,20.439493 3.2629965,16.653445 0.27134146,12.351498 1.6323696,6.3399979 5.8864048,3.4258888 10.658789,0.15669878 17.293006,1.6755245 20.487995,6.397763 c 3.547044,5.24258 1.870263,12.500011 -3.32034,15.975625" id="path863" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.81897438;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:14.55179499, 3.63794874, 1.81897438, 3.63794874;stroke-dashoffset:0;paint-order:normal"/>',appDev:'<path xmlns="http://www.w3.org/2000/svg" transform="matrix(1.0649522,0,0,1.0657413,-0.79179574,-0.82116488)" d="m 11.014246,12.038388 c 0.308522,0.518181 -0.546283,0.671534 -0.86125,0.512784 C 9.2994549,12.120971 9.4478638,10.925582 9.9886778,10.315888 10.956067,9.2252893 12.678826,9.5056897 13.597996,10.500036 14.946915,11.959279 14.52035,14.27062 13.065382,15.483388 11.126139,17.099817 8.2085378,16.521157 6.7079963,14.602309 4.8197179,12.187634 5.5530784,8.6563815 7.9375413,6.8708886 10.825445,4.7084174 14.97415,5.5978085 17.042996,8.4488994 19.481058,11.808811 18.434875,16.577188 15.116519,18.928388 11.285345,21.642941 5.8958848,20.439493 3.2629965,16.653445 0.27134146,12.351498 1.6323696,6.3399979 5.8864048,3.4258888 10.658789,0.15669878 17.293006,1.6755245 20.487995,6.397763 c 3.547044,5.24258 1.870263,12.500011 -3.32034,15.975625" id="path863" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.81897438;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:14.55179499, 3.63794874000000013, 1.81897438000000000, 3.63794874000000013;stroke-dashoffset:0;paint-order:normal;opacity:0.32"/><text xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)" id="text9036" y="21.706474" x="-13.797913" style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:16.14533424px;line-height:1.25;font-family:Consolas;-inkscape-font-specification:\'Consolas, Bold\';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.40363145" xml:space="preserve"><tspan style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:16.14533424px;font-family:Consolas;-inkscape-font-specification:\'Consolas, Bold\';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;writing-mode:lr-tb;text-anchor:start;stroke-width:0.40363145" y="21.706474" x="-13.797913" id="tspan9034">dev</tspan></text>'}}}});
//# sourceMappingURL=panelBottom.31ced09e.js.map