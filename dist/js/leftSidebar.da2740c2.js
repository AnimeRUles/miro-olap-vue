(function(t){function e(e){for(var n,s,o=e[0],u=e[1],c=e[2],d=0,g=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&g.push(a[s][0]),a[s]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(t[n]=u[n]);l&&l(e);while(g.length)g.shift()();return i.push.apply(i,c||[]),r()}function r(){for(var t,e=0;e<i.length;e++){for(var r=i[e],n=!0,o=1;o<r.length;o++){var u=r[o];0!==a[u]&&(n=!1)}n&&(i.splice(e--,1),t=s(s.s=r[0]))}return t}var n={},a={leftSidebar:0},i=[];function s(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=n,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(r,n,function(e){return t[e]}.bind(null,n));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var l=u;i.push([2,"chunk-vendors"]),r()})({"037b":function(t,e,r){"use strict";var n=r("3235"),a=r.n(n);a.a},"0d9c":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=r("5c96"),i=r.n(a),s=(r("0fae"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("el-row",{attrs:{gutter:8}},[r("el-col",{staticStyle:{height:"36pt"}}),r("el-col",{staticStyle:{"text-align":"right"}},[t._v("Create line")]),r("el-col",{staticStyle:{"text-align":"right"}},[r("el-dropdown",{attrs:{"split-button":"",type:t.wStartSelect?"info":""},on:{click:t.selectWidgetStart_begin}},[t._v(t._s(t.wStartSelect?t.wStartSelect.name:"Choose a start widget")+" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.wStart_,(function(e){return r("el-dropdown-item",{key:e.id,nativeOn:{click:function(r){t.wStartSelect=t.getWidgetStartById(e.id)}}},[t._v(t._s(e.name)+" ")])})),1)],1)],1),r("el-col",{staticStyle:{"text-align":"right"}},[r("el-button",{on:{click:t.selectWidgetEnd_begin}},[t._v("Create line")])],1)],1)],1)}),o=[],u=(r("7db0"),r("d3b7"),r("96cf"),r("2ef0")),c={name:"LeftSidebar",components:{},data:function(){return{wStart_:[],wStartSelect:null}},mounted:function(){var t=this;miro.onReady((function(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(t.getTagObj_());case 2:t.wStart_=e.sent;case 3:case"end":return e.stop()}}))}))},methods:{selectWidgetStart_begin:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(this.getWidgetSelectFirst());case 2:if(t=e.sent,!t){e.next=6;break}return this.selectWidgetStart(t.id),e.abrupt("return");case 6:case"end":return e.stop()}}),null,this)},selectWidgetStart:function(t){var e,r;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,regeneratorRuntime.awrap(this.getWidgetById(t));case 2:e=n.sent,r=this.getWidgetStartById(e.id),r||(r=this.getWidgetObjCustom(e),this.wStart_.push(r)),this.wStartSelect=r;case 6:case"end":return n.stop()}}),null,this)},selectWidgetEnd_begin:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:if(this.wStartSelect){e.next=3;break}return miro.showErrorNotification("Choose a start widget"),e.abrupt("return");case 3:return e.next=5,regeneratorRuntime.awrap(this.getWidgetSelectFirst());case 5:if(t=e.sent,t){e.next=9;break}return miro.showErrorNotification("Choose a end widget"),e.abrupt("return");case 9:if(!t){e.next=12;break}return this.selectWidgetEnd(t.id),e.abrupt("return");case 12:case"end":return e.stop()}}),null,this)},selectWidgetEnd:function(t){var e,r;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return n.t0=this,n.next=3,regeneratorRuntime.awrap(this.getWidgetById(t));case 3:return n.t1=n.sent,e=n.t0.getWidgetObjCustom.call(n.t0,n.t1),n.next=7,regeneratorRuntime.awrap(miro.board.widgets.create({type:"LINE",startWidgetId:this.wStartSelect.id,endWidgetId:e.id,style:{lineEndStyle:1,lineType:2}}));case 7:return r=n.sent,n.next=10,regeneratorRuntime.awrap(miro.board.selection.selectWidgets(r));case 10:case"end":return n.stop()}}),null,this)},getWidgetObjCustom:function(t){return t?{id:t.id,name:t.plainText}:null},getWidgetStartById:function(t){return this.wStart_.find((function(e){return e.id===t}))||null},getTagId_:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(miro.board.widgets.get({type:"FRAME",title:"#"}));case 2:if(t=e.sent,t.length){e.next=5;break}return e.abrupt("return",[]);case 5:return e.abrupt("return",t[0].childrenIds);case 6:case"end":return e.stop()}}))},getTagObj_:function(){var t,e=this;return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:return t=[],r.t0=u["each"],r.next=4,regeneratorRuntime.awrap(this.getTagId_());case 4:return r.t1=r.sent,r.t2=function(r){return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return n.t0=t,n.t1=e,n.next=4,regeneratorRuntime.awrap(e.getWidgetById(r));case 4:n.t2=n.sent,n.t3=n.t1.getWidgetObjCustom.call(n.t1,n.t2),n.t0.push.call(n.t0,n.t3);case 7:case"end":return n.stop()}}))},(0,r.t0)(r.t1,r.t2),r.abrupt("return",t);case 8:case"end":return r.stop()}}),null,this)}}},l=c,d=(r("037b"),r("2877")),g=Object(d["a"])(l,s,o,!1,null,null,null),f=g.exports,p=r("69d9"),h=r("5a84");p["a"].registerHotReload(),n["default"].use(i.a),n["default"].config.productionTip=!1,n["default"].mixin(h["a"]),new n["default"]({render:function(t){return t(f)}}).$mount("#app")},2:function(t,e,r){t.exports=r("0d9c")},3235:function(t,e,r){},"5a84":function(t,e,r){"use strict";r("99af"),r("d3b7"),r("96cf"),r("69d9");var n=r("2ef0");e["a"]={data:function(){return{isSettingsBroadcastThrow:!0,isSettingsBroadcastSet:!0,settings:{isEnabled:!1}}},watch:{settings:{handler:function(t){var e=this;this.isSettingsBroadcastThrow&&(this.isSettingsBroadcastSet=!1,miro.__setRuntimeState(t),miro.broadcastData(t).then((function(){e.isSettingsBroadcastSet=!0})))},deep:!0}},mounted:function(){var t=this;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:miro.onReady((function(){var e;return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,regeneratorRuntime.awrap(miro.__getRuntimeState());case 2:if(e=r.sent,!Object(n["isEmpty"])(e)){r.next=8;break}return r.next=6,regeneratorRuntime.awrap(miro.__setRuntimeState(t.settings));case 6:r.next=9;break;case 8:t.settings=e;case 9:miro.addListener("DATA_BROADCASTED",t.DATA_BROADCASTED);case 10:case"end":return r.stop()}}))}));case 1:case"end":return e.stop()}}))},destroyed:function(){miro.removeListener("DATA_BROADCASTED",this.DATA_BROADCASTED)},methods:{DATA_BROADCASTED:function(t){var e=this;this.isSettingsBroadcastSet&&(this.isSettingsBroadcastThrow=!1,new Promise((function(r){e.settings=t.data,r()})).then((function(t){e.isSettingsBroadcastThrow=!0})))},log:function(){for(var t,e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];(t=console).log.apply(t,r.concat([this.$el.baseURI]))},isDevelopment:function(){return!1},getArray:function(t){switch(!0){case null===t:case void 0===t:return[];case Array.isArray(t):return t;default:return[t]}},getWidgetById:function(t){var e;return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,regeneratorRuntime.awrap(miro.board.widgets.get({id:t}));case 2:if(e=r.sent,!e.length){r.next=5;break}return r.abrupt("return",e[0]);case 5:return r.abrupt("return",null);case 6:case"end":return r.stop()}}))},getWidgetSelectFirst:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(miro.board.selection.get());case 2:if(t=e.sent,!t.length){e.next=5;break}return e.abrupt("return",t[0]);case 5:return e.abrupt("return",null);case 6:case"end":return e.stop()}}))}}}},"69d9":function(t,e,r){"use strict";(function(t){var r="isHotReload_";e["a"]={registerHotReload:function(e){e=r+e,t&&t.hot&&(sessionStorage.setItem(e,"false"),t.hot.addStatusHandler((function(t){sessionStorage.setItem(e,"true")})))},isHotReload:function(t){return t=r+t,"true"===sessionStorage.getItem(t)}}}).call(this,r("dd40")(t))}});
//# sourceMappingURL=leftSidebar.da2740c2.js.map