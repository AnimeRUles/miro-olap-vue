(function(t){function e(e){for(var r,s,o=e[0],c=e[1],l=e[2],d=0,g=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&g.push(a[s][0]),a[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);u&&u(e);while(g.length)g.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},a={leftSidebar:0},i=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;i.push([2,"chunk-vendors"]),n()})({2:function(t,e,n){t.exports=n("d97c")},"4fa8":function(t,e,n){"use strict";var r=n("88b5"),a=n.n(r);a.a},"5a84":function(t,e,n){"use strict";n("99af"),n("d3b7"),n("96cf"),n("69d9");var r=n("2ef0"),a=n("d697");e["a"]={data:function(){return{isSettingsBroadcastThrow:!0,isSettingsBroadcastSet:!0,settings:{isEnabled:!1,hide:{lineTagIs:!0}}}},watch:{settings:{handler:function(t){var e=this;this.isSettingsBroadcastThrow&&(this.isSettingsBroadcastSet=!1,sessionStorage.setItem("settings",JSON.stringify(t)),miro.broadcastData(t).then((function(){e.isSettingsBroadcastSet=!0})))},deep:!0}},mounted:function(){var t=this;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:miro.onReady((function(){var e;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:e=sessionStorage.getItem("settings"),e?t.settings=JSON.parse(e):sessionStorage.setItem("settings",JSON.stringify(t.settings)),miro.addListener("DATA_BROADCASTED",t.DATA_BROADCASTED);case 3:case"end":return n.stop()}}))}));case 1:case"end":return e.stop()}}))},destroyed:function(){miro.removeListener("DATA_BROADCASTED",this.DATA_BROADCASTED)},methods:{DATA_BROADCASTED:function(t){var e=this;this.isSettingsBroadcastSet&&(this.isSettingsBroadcastThrow=!1,new Promise((function(n){e.settings=t.data,n()})).then((function(t){e.isSettingsBroadcastThrow=!0})))},log:function(){for(var t,e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];(t=console).log.apply(t,n.concat([this.$el.baseURI]))},isDevelopment:function(){return!1},getArray:function(t){switch(!0){case null===t:case void 0===t:return[];case Array.isArray(t):return t;default:return[t]}},getWidgetById:function(t){var e;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,regeneratorRuntime.awrap(miro.board.widgets.get({id:t}));case 2:if(e=n.sent,!e.length){n.next=5;break}return n.abrupt("return",e[0]);case 5:return n.abrupt("return",null);case 6:case"end":return n.stop()}}))},getWidgetSelectFirst:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(miro.board.selection.get());case 2:if(t=e.sent,!t.length){e.next=5;break}return e.abrupt("return",t[0]);case 5:return e.abrupt("return",null);case 6:case"end":return e.stop()}}))},getWidgetTagId_:function(){var t,e;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return t=[],n.next=3,regeneratorRuntime.awrap(miro.board.widgets.get({type:a["a"].widget.type.FRAME}));case 3:if(e=n.sent,e.length){n.next=6;break}return n.abrupt("return",[]);case 6:return Object(r["each"])(e,(function(e){"#"===e.title.charAt(0)&&(t=t.concat(e.childrenIds))})),n.abrupt("return",t);case 8:case"end":return n.stop()}}))}}}},"69d9":function(t,e,n){"use strict";(function(t){var n="isHotReload_";e["a"]={registerHotReload:function(e){e=n+e,t&&t.hot&&(sessionStorage.setItem(e,"false"),t.hot.addStatusHandler((function(t){sessionStorage.setItem(e,"true")})))},isHotReload:function(t){return t=n+t,"true"===sessionStorage.getItem(t)}}}).call(this,n("dd40")(t))},"88b5":function(t,e,n){},d697:function(t,e,n){"use strict";e["a"]={widget:{type:{LINE:"LINE",FRAME:"FRAME"}},icon:{app:'<path xmlns="http://www.w3.org/2000/svg" transform="matrix(1.0649522,0,0,1.0657413,-0.79179574,-0.82116488)" d="m 11.014246,12.038388 c 0.308522,0.518181 -0.546283,0.671534 -0.86125,0.512784 C 9.2994549,12.120971 9.4478638,10.925582 9.9886778,10.315888 10.956067,9.2252893 12.678826,9.5056897 13.597996,10.500036 14.946915,11.959279 14.52035,14.27062 13.065382,15.483388 11.126139,17.099817 8.2085378,16.521157 6.7079963,14.602309 4.8197179,12.187634 5.5530784,8.6563815 7.9375413,6.8708886 10.825445,4.7084174 14.97415,5.5978085 17.042996,8.4488994 19.481058,11.808811 18.434875,16.577188 15.116519,18.928388 11.285345,21.642941 5.8958848,20.439493 3.2629965,16.653445 0.27134146,12.351498 1.6323696,6.3399979 5.8864048,3.4258888 10.658789,0.15669878 17.293006,1.6755245 20.487995,6.397763 c 3.547044,5.24258 1.870263,12.500011 -3.32034,15.975625" id="path863" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.81897438;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:14.55179499, 3.63794874, 1.81897438, 3.63794874;stroke-dashoffset:0;paint-order:normal"/>',appDev:'<path xmlns="http://www.w3.org/2000/svg" transform="matrix(1.0649522,0,0,1.0657413,-0.79179574,-0.82116488)" d="m 11.014246,12.038388 c 0.308522,0.518181 -0.546283,0.671534 -0.86125,0.512784 C 9.2994549,12.120971 9.4478638,10.925582 9.9886778,10.315888 10.956067,9.2252893 12.678826,9.5056897 13.597996,10.500036 14.946915,11.959279 14.52035,14.27062 13.065382,15.483388 11.126139,17.099817 8.2085378,16.521157 6.7079963,14.602309 4.8197179,12.187634 5.5530784,8.6563815 7.9375413,6.8708886 10.825445,4.7084174 14.97415,5.5978085 17.042996,8.4488994 19.481058,11.808811 18.434875,16.577188 15.116519,18.928388 11.285345,21.642941 5.8958848,20.439493 3.2629965,16.653445 0.27134146,12.351498 1.6323696,6.3399979 5.8864048,3.4258888 10.658789,0.15669878 17.293006,1.6755245 20.487995,6.397763 c 3.547044,5.24258 1.870263,12.500011 -3.32034,15.975625" id="path863" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.81897438;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:14.55179499, 3.63794874000000013, 1.81897438000000000, 3.63794874000000013;stroke-dashoffset:0;paint-order:normal;opacity:0.32"/><text xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)" id="text9036" y="21.706474" x="-13.797913" style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:16.14533424px;line-height:1.25;font-family:Consolas;-inkscape-font-specification:\'Consolas, Bold\';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.40363145" xml:space="preserve"><tspan style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:16.14533424px;font-family:Consolas;-inkscape-font-specification:\'Consolas, Bold\';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;writing-mode:lr-tb;text-anchor:start;stroke-width:0.40363145" y="21.706474" x="-13.797913" id="tspan9034">dev</tspan></text>'}}},d97c:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=n("5c96"),i=n.n(a),s=(n("0fae"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("el-row",{attrs:{gutter:8}},[n("el-col",{staticStyle:{height:"36pt"}}),n("el-col",[n("el-collapse",{model:{value:t.activeTab_,callback:function(e){t.activeTab_=e},expression:"activeTab_"}},[n("el-collapse-item",{attrs:{title:"Create line",name:"CreateLine"}},[n("CreateLine")],1),n("el-collapse-item",{attrs:{title:"Hide",name:"Hide"}},[n("Hide")],1),n("el-collapse-item",{attrs:{title:"Other",name:"Other"}})],1)],1)],1)],1)}),o=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-row",{attrs:{gutter:8}},[n("el-col",[n("el-dropdown",{attrs:{"split-button":"",type:t.wStartSelect?"info":""},on:{click:t.selectWidgetStart_begin}},[t._v(t._s(t.wStartSelect?t.wStartSelect.name:"Choose a start widget")+" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.wStart_,(function(e){return n("el-dropdown-item",{key:e.id,nativeOn:{click:function(n){t.wStartSelect=t.getWidgetStartById(e.id)}}},[t._v(t._s(e.name)+" ")])})),1)],1)],1),n("el-col",{staticStyle:{"text-align":"right"}},[n("el-button",{on:{click:t.selectWidgetEnd_begin}},[t._v("Create line")])],1)],1)},l=[],u=(n("99af"),n("7db0"),n("d3b7"),n("96cf"),n("2ef0")),d=n("d697"),g={name:"CreateLine",components:{},data:function(){return{wStart_:[],wStartSelect:null}},mounted:function(){var t=this;miro.onReady((function(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(t.getTagObj_());case 2:t.wStart_=e.sent;case 3:case"end":return e.stop()}}))}))},methods:{selectWidgetStart_begin:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(this.getWidgetSelectFirst());case 2:if(t=e.sent,!t){e.next=6;break}return this.selectWidgetStart(t.id),e.abrupt("return");case 6:case"end":return e.stop()}}),null,this)},selectWidgetStart:function(t){var e,n;return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,regeneratorRuntime.awrap(this.getWidgetById(t));case 2:e=r.sent,n=this.getWidgetStartById(e.id),n||(n=this.getWidgetObjCustom(e),this.wStart_.push(n)),this.wStartSelect=n;case 6:case"end":return r.stop()}}),null,this)},selectWidgetEnd_begin:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:if(this.wStartSelect){e.next=3;break}return miro.showErrorNotification("Choose a start widget"),e.abrupt("return");case 3:return e.next=5,regeneratorRuntime.awrap(this.getWidgetSelectFirst());case 5:if(t=e.sent,t){e.next=9;break}return miro.showErrorNotification("Choose a end widget"),e.abrupt("return");case 9:if(!t){e.next=12;break}return this.selectWidgetEnd(t),e.abrupt("return");case 12:case"end":return e.stop()}}),null,this)},selectWidgetEnd:function(t){var e,n,r;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,regeneratorRuntime.awrap(miro.board.widgets.create({type:d["a"].widget.type.LINE,startWidgetId:this.wStartSelect.id,endWidgetId:t.id,style:{lineEndStyle:5,lineType:2,lineColor:"#808080"}}));case 2:return e=a.sent,n=document.createElement("html"),n.innerHTML="<html><head><title>temp</title></head><body>"+t.text+"</body></html>",a.next=7,regeneratorRuntime.awrap(this.getWidgetById(this.wStartSelect.id));case 7:return r=a.sent,t.text+=this.createTagHtmlElement(r).outerHTML,a.next=11,regeneratorRuntime.awrap(miro.board.widgets.update(t));case 11:return a.next=13,regeneratorRuntime.awrap(miro.board.widgets.sendBackward(e));case 13:case"end":return a.stop()}}),null,this)},createTagHtmlElement:function(t){var e=document.createElement("p"),n=document.createElement("span");return n.style.backgroundColor=t.style.borderColor,n.textContent=" #"+t.plainText+" ",e.appendChild(n),e},getWidgetObjCustom:function(t){return t?{id:t.id,name:t.plainText}:null},getWidgetStartById:function(t){return this.wStart_.find((function(e){return e.id===t}))||null},getTagId_:function(){var t,e;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return t=[],n.next=3,regeneratorRuntime.awrap(miro.board.widgets.get({type:d["a"].widget.type.FRAME}));case 3:if(e=n.sent,e.length){n.next=6;break}return n.abrupt("return",[]);case 6:return Object(u["each"])(e,(function(e){"#"===e.title.charAt(0)&&(t=t.concat(e.childrenIds))})),n.abrupt("return",t);case 8:case"end":return n.stop()}}))},getTagObj_:function(){var t,e=this;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return t=[],n.t0=u["each"],n.next=4,regeneratorRuntime.awrap(this.getTagId_());case 4:return n.t1=n.sent,n.t2=function(n){return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:return r.t0=t,r.t1=e,r.next=4,regeneratorRuntime.awrap(e.getWidgetById(n));case 4:r.t2=r.sent,r.t3=r.t1.getWidgetObjCustom.call(r.t1,r.t2),r.t0.push.call(r.t0,r.t3);case 7:case"end":return r.stop()}}))},(0,n.t0)(n.t1,n.t2),n.abrupt("return",t);case 8:case"end":return n.stop()}}),null,this)}}},f=g,p=n("2877"),h=Object(p["a"])(f,c,l,!1,null,null,null),m=h.exports,w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-row",{attrs:{gutter:8}},[n("el-col",[n("el-checkbox",{attrs:{label:"Hide tag line",border:""},model:{value:t.settings.hide.lineTagIs,callback:function(e){t.$set(t.settings.hide,"lineTagIs",e)},expression:"settings.hide.lineTagIs"}})],1)],1)},b=[],v={name:"Hide",components:{},data:function(){return{}},mounted:function(){},methods:{}},y=v,x=Object(p["a"])(y,w,b,!1,null,null,null),S=x.exports,R={name:"LeftSidebar",components:{CreateLine:m,Hide:S},data:function(){return{activeTab_:["CreateLine","Hide","Other"]}}},_=R,k=(n("4fa8"),Object(p["a"])(_,s,o,!1,null,null,null)),T=k.exports,O=n("69d9"),A=n("5a84");O["a"].registerHotReload(),r["default"].use(i.a),r["default"].config.productionTip=!1,r["default"].mixin(A["a"]),new r["default"]({render:function(t){return t(T)}}).$mount("#app")}});
//# sourceMappingURL=leftSidebar.5eb7c16e.js.map