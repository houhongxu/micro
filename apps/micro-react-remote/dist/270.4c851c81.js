/*! For license information please see 270.4c851c81.js.LICENSE.txt */
(window["webpackJsonp_micro-react-remote"]=window["webpackJsonp_micro-react-remote"]||[]).push([[270],{4270:function(t){t.exports=function(){"use strict";function t(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function e(e){for(var i=1;i<arguments.length;i++){var n=null!=arguments[i]?arguments[i]:{};i%2?t(Object(n),!0).forEach((function(t){var i,s,a;i=e,s=t,a=n[t],(s=o(s))in i?Object.defineProperty(i,s,{value:a,enumerable:!0,configurable:!0,writable:!0}):i[s]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):t(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(t){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,o(n.key),n)}}function o(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var n=i.call(t,e||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:String(e)}var s={backdrop:!0,button:!0,navbar:!0,title:!0,toolbar:!0,className:"",container:"body",filter:null,fullscreen:!0,inheritedAttributes:["crossOrigin","decoding","isMap","loading","referrerPolicy","sizes","srcset","useMap"],initialCoverage:.9,initialViewIndex:0,inline:!1,interval:5e3,keyboard:!0,focus:!0,loading:!0,loop:!0,minWidth:200,minHeight:100,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,slideOnTouch:!0,toggleOnDblclick:!0,tooltip:!0,transition:!0,zIndex:2015,zIndexInline:0,zoomRatio:.1,minZoomRatio:.01,maxZoomRatio:100,url:"src",ready:null,show:null,shown:null,hide:null,hidden:null,view:null,viewed:null,move:null,moved:null,rotate:null,rotated:null,scale:null,scaled:null,zoom:null,zoomed:null,play:null,stop:null},a="undefined"!=typeof window&&void 0!==window.document,r=a?window:{},l=!(!a||!r.document.documentElement)&&"ontouchstart"in r.document.documentElement,h=!!a&&"PointerEvent"in r,c="viewer",u="move",d="switch",m="zoom",g="".concat(c,"-active"),f="".concat(c,"-close"),v="".concat(c,"-fade"),p="".concat(c,"-fixed"),b="".concat(c,"-fullscreen"),w="".concat(c,"-fullscreen-exit"),y="".concat(c,"-hide"),x="".concat(c,"-hide-md-down"),k="".concat(c,"-hide-sm-down"),z="".concat(c,"-hide-xs-down"),T="".concat(c,"-in"),E="".concat(c,"-invisible"),D="".concat(c,"-loading"),S="".concat(c,"-move"),I="".concat(c,"-open"),A="".concat(c,"-show"),O="".concat(c,"-transition"),C="click",L="dblclick",R="dragstart",M="focusin",F="keydown",N="load",Y="error",X=h?"pointerdown":l?"touchstart":"mousedown",q=h?"pointermove":l?"touchmove":"mousemove",P=h?"pointerup pointercancel":l?"touchend touchcancel":"mouseup",W="resize",j="transitionend",H="wheel",B="ready",V="show",U="shown",K="hide",Z="hidden",$="view",_="viewed",J="move",G="moved",Q="rotate",tt="rotated",et="scale",it="scaled",nt="zoom",ot="zoomed",st="play",at="stop",rt="".concat(c,"Action"),lt=/\s\s*/,ht=["zoom-in","zoom-out","one-to-one","reset","prev","play","next","rotate-left","rotate-right","flip-horizontal","flip-vertical"];function ct(t){return"string"==typeof t}var ut=Number.isNaN||r.isNaN;function dt(t){return"number"==typeof t&&!ut(t)}function mt(t){return void 0===t}function gt(t){return"object"===i(t)&&null!==t}var ft=Object.prototype.hasOwnProperty;function vt(t){if(!gt(t))return!1;try{var e=t.constructor,i=e.prototype;return e&&i&&ft.call(i,"isPrototypeOf")}catch(t){return!1}}function pt(t){return"function"==typeof t}function bt(t,e){if(t&&pt(e))if(Array.isArray(t)||dt(t.length)){var i,n=t.length;for(i=0;i<n&&!1!==e.call(t,t[i],i,t);i+=1);}else gt(t)&&Object.keys(t).forEach((function(i){e.call(t,t[i],i,t)}));return t}var wt=Object.assign||function(t){for(var e=arguments.length,i=new Array(e>1?e-1:0),n=1;n<e;n++)i[n-1]=arguments[n];return gt(t)&&i.length>0&&i.forEach((function(e){gt(e)&&Object.keys(e).forEach((function(i){t[i]=e[i]}))})),t},yt=/^(?:width|height|left|top|marginLeft|marginTop)$/;function xt(t,e){var i=t.style;bt(e,(function(t,e){yt.test(e)&&dt(t)&&(t+="px"),i[e]=t}))}function kt(t,e){return!(!t||!e)&&(t.classList?t.classList.contains(e):t.className.indexOf(e)>-1)}function zt(t,e){if(t&&e)if(dt(t.length))bt(t,(function(t){zt(t,e)}));else if(t.classList)t.classList.add(e);else{var i=t.className.trim();i?i.indexOf(e)<0&&(t.className="".concat(i," ").concat(e)):t.className=e}}function Tt(t,e){t&&e&&(dt(t.length)?bt(t,(function(t){Tt(t,e)})):t.classList?t.classList.remove(e):t.className.indexOf(e)>=0&&(t.className=t.className.replace(e,"")))}function Et(t,e,i){e&&(dt(t.length)?bt(t,(function(t){Et(t,e,i)})):i?zt(t,e):Tt(t,e))}var Dt=/([a-z\d])([A-Z])/g;function St(t){return t.replace(Dt,"$1-$2").toLowerCase()}function It(t,e){return gt(t[e])?t[e]:t.dataset?t.dataset[e]:t.getAttribute("data-".concat(St(e)))}function At(t,e,i){gt(i)?t[e]=i:t.dataset?t.dataset[e]=i:t.setAttribute("data-".concat(St(e)),i)}var Ot=function(){var t=!1;if(a){var e=!1,i=function(){},n=Object.defineProperty({},"once",{get:function(){return t=!0,e},set:function(t){e=t}});r.addEventListener("test",i,n),r.removeEventListener("test",i,n)}return t}();function Ct(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=i;e.trim().split(lt).forEach((function(e){if(!Ot){var s=t.listeners;s&&s[e]&&s[e][i]&&(o=s[e][i],delete s[e][i],0===Object.keys(s[e]).length&&delete s[e],0===Object.keys(s).length&&delete t.listeners)}t.removeEventListener(e,o,n)}))}function Lt(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=i;e.trim().split(lt).forEach((function(e){if(n.once&&!Ot){var s=t.listeners,a=void 0===s?{}:s;o=function(){delete a[e][i],t.removeEventListener(e,o,n);for(var s=arguments.length,r=new Array(s),l=0;l<s;l++)r[l]=arguments[l];i.apply(t,r)},a[e]||(a[e]={}),a[e][i]&&t.removeEventListener(e,a[e][i],n),a[e][i]=o,t.listeners=a}t.addEventListener(e,o,n)}))}function Rt(t,i,n,o){var s;return pt(Event)&&pt(CustomEvent)?s=new CustomEvent(i,e({bubbles:!0,cancelable:!0,detail:n},o)):(s=document.createEvent("CustomEvent")).initCustomEvent(i,!0,!0,n),t.dispatchEvent(s)}function Mt(t){var e=t.rotate,i=t.scaleX,n=t.scaleY,o=t.translateX,s=t.translateY,a=[];dt(o)&&0!==o&&a.push("translateX(".concat(o,"px)")),dt(s)&&0!==s&&a.push("translateY(".concat(s,"px)")),dt(e)&&0!==e&&a.push("rotate(".concat(e,"deg)")),dt(i)&&1!==i&&a.push("scaleX(".concat(i,")")),dt(n)&&1!==n&&a.push("scaleY(".concat(n,")"));var r=a.length?a.join(" "):"none";return{WebkitTransform:r,msTransform:r,transform:r}}var Ft=r.navigator&&/Version\/\d+(\.\d+)+?\s+Safari/i.test(r.navigator.userAgent);function Nt(t,e,i){var n=document.createElement("img");if(t.naturalWidth&&!Ft)return i(t.naturalWidth,t.naturalHeight),n;var o=document.body||document.documentElement;return n.onload=function(){i(n.width,n.height),Ft||o.removeChild(n)},bt(e.inheritedAttributes,(function(e){var i=t.getAttribute(e);null!==i&&n.setAttribute(e,i)})),n.src=t.src,Ft||(n.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",o.appendChild(n)),n}function Yt(t){switch(t){case 2:return z;case 3:return k;case 4:return x;default:return""}}function Xt(t,i){var n=t.pageX,o=t.pageY,s={endX:n,endY:o};return i?s:e({timeStamp:Date.now(),startX:n,startY:o},s)}var qt,Pt={render:function(){this.initContainer(),this.initViewer(),this.initList(),this.renderViewer()},initBody:function(){var t=this.element.ownerDocument,e=t.body||t.documentElement;this.body=e,this.scrollbarWidth=window.innerWidth-t.documentElement.clientWidth,this.initialBodyPaddingRight=e.style.paddingRight,this.initialBodyComputedPaddingRight=window.getComputedStyle(e).paddingRight},initContainer:function(){this.containerData={width:window.innerWidth,height:window.innerHeight}},initViewer:function(){var t,e=this.options,i=this.parent;e.inline&&(t={width:Math.max(i.offsetWidth,e.minWidth),height:Math.max(i.offsetHeight,e.minHeight)},this.parentData=t),!this.fulled&&t||(t=this.containerData),this.viewerData=wt({},t)},renderViewer:function(){this.options.inline&&!this.fulled&&xt(this.viewer,this.viewerData)},initList:function(){var t=this,e=this.element,i=this.options,n=this.list,o=[];n.innerHTML="",bt(this.images,(function(e,s){var a=e.src,r=e.alt||function(t){return ct(t)?decodeURIComponent(t.replace(/^.*\//,"").replace(/[?&#].*$/,"")):""}(a),l=t.getImageURL(e);if(a||l){var h=document.createElement("li"),c=document.createElement("img");bt(i.inheritedAttributes,(function(t){var i=e.getAttribute(t);null!==i&&c.setAttribute(t,i)})),i.navbar&&(c.src=a||l),c.alt=r,c.setAttribute("data-original-url",l||a),h.setAttribute("data-index",s),h.setAttribute("data-viewer-action","view"),h.setAttribute("role","button"),i.keyboard&&h.setAttribute("tabindex",0),h.appendChild(c),n.appendChild(h),o.push(h)}})),this.items=o,bt(o,(function(e){var n,o,s=e.firstElementChild;At(s,"filled",!0),i.loading&&zt(e,D),Lt(s,N,n=function(n){Ct(s,Y,o),i.loading&&Tt(e,D),t.loadImage(n)},{once:!0}),Lt(s,Y,o=function(){Ct(s,N,n),i.loading&&Tt(e,D)},{once:!0})})),i.transition&&Lt(e,_,(function(){zt(n,O)}),{once:!0})},renderList:function(){var t=this.index,e=this.items[t];if(e){var i=e.nextElementSibling,n=parseInt(window.getComputedStyle(i||e).marginLeft,10),o=e.offsetWidth,s=o+n;xt(this.list,wt({width:s*this.length-n},Mt({translateX:(this.viewerData.width-o)/2-s*t})))}},resetList:function(){var t=this.list;t.innerHTML="",Tt(t,O),xt(t,Mt({translateX:0}))},initImage:function(t){var e,i=this,n=this.options,o=this.image,s=this.viewerData,a=this.footer.offsetHeight,r=s.width,l=Math.max(s.height-a,a),h=this.imageData||{};this.imageInitializing={abort:function(){e.onload=null}},e=Nt(o,n,(function(e,o){var s=e/o,a=Math.max(0,Math.min(1,n.initialCoverage)),c=r,u=l;i.imageInitializing=!1,l*s>r?u=r/s:c=l*s,a=dt(a)?a:.9,c=Math.min(c*a,e),u=Math.min(u*a,o);var d=(r-c)/2,m=(l-u)/2,g={left:d,top:m,x:d,y:m,width:c,height:u,oldRatio:1,ratio:c/e,aspectRatio:s,naturalWidth:e,naturalHeight:o},f=wt({},g);n.rotatable&&(g.rotate=h.rotate||0,f.rotate=0),n.scalable&&(g.scaleX=h.scaleX||1,g.scaleY=h.scaleY||1,f.scaleX=1,f.scaleY=1),i.imageData=g,i.initialImageData=f,t&&t()}))},renderImage:function(t){var e=this,i=this.image,n=this.imageData;if(xt(i,wt({width:n.width,height:n.height,marginLeft:n.x,marginTop:n.y},Mt(n))),t)if((this.viewing||this.moving||this.rotating||this.scaling||this.zooming)&&this.options.transition&&kt(i,O)){var o=function(){e.imageRendering=!1,t()};this.imageRendering={abort:function(){Ct(i,j,o)}},Lt(i,j,o,{once:!0})}else t()},resetImage:function(){var t=this.image;t&&(this.viewing&&this.viewing.abort(),t.parentNode.removeChild(t),this.image=null,this.title.innerHTML="")}},Wt={bind:function(){var t=this.options,e=this.viewer,i=this.canvas,n=this.element.ownerDocument;Lt(e,C,this.onClick=this.click.bind(this)),Lt(e,R,this.onDragStart=this.dragstart.bind(this)),Lt(i,X,this.onPointerDown=this.pointerdown.bind(this)),Lt(n,q,this.onPointerMove=this.pointermove.bind(this)),Lt(n,P,this.onPointerUp=this.pointerup.bind(this)),Lt(n,F,this.onKeyDown=this.keydown.bind(this)),Lt(window,W,this.onResize=this.resize.bind(this)),t.zoomable&&t.zoomOnWheel&&Lt(e,H,this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),t.toggleOnDblclick&&Lt(i,L,this.onDblclick=this.dblclick.bind(this))},unbind:function(){var t=this.options,e=this.viewer,i=this.canvas,n=this.element.ownerDocument;Ct(e,C,this.onClick),Ct(e,R,this.onDragStart),Ct(i,X,this.onPointerDown),Ct(n,q,this.onPointerMove),Ct(n,P,this.onPointerUp),Ct(n,F,this.onKeyDown),Ct(window,W,this.onResize),t.zoomable&&t.zoomOnWheel&&Ct(e,H,this.onWheel,{passive:!1,capture:!0}),t.toggleOnDblclick&&Ct(i,L,this.onDblclick)}},jt={click:function(t){var e=this.options,i=this.imageData,n=t.target,o=It(n,rt);switch(o||"img"!==n.localName||"li"!==n.parentElement.localName||(o=It(n=n.parentElement,rt)),l&&t.isTrusted&&n===this.canvas&&clearTimeout(this.clickCanvasTimeout),o){case"mix":this.played?this.stop():e.inline?this.fulled?this.exit():this.full():this.hide();break;case"hide":this.pointerMoved||this.hide();break;case"view":this.view(It(n,"index"));break;case"zoom-in":this.zoom(.1,!0);break;case"zoom-out":this.zoom(-.1,!0);break;case"one-to-one":this.toggle();break;case"reset":this.reset();break;case"prev":this.prev(e.loop);break;case"play":this.play(e.fullscreen);break;case"next":this.next(e.loop);break;case"rotate-left":this.rotate(-90);break;case"rotate-right":this.rotate(90);break;case"flip-horizontal":this.scaleX(-i.scaleX||-1);break;case"flip-vertical":this.scaleY(-i.scaleY||-1);break;default:this.played&&this.stop()}},dblclick:function(t){t.preventDefault(),this.viewed&&t.target===this.image&&(l&&t.isTrusted&&clearTimeout(this.doubleClickImageTimeout),this.toggle(t.isTrusted?t:t.detail&&t.detail.originalEvent))},load:function(){var t=this;this.timeout&&(clearTimeout(this.timeout),this.timeout=!1);var e=this.element,i=this.options,n=this.image,o=this.index,s=this.viewerData;Tt(n,E),i.loading&&Tt(this.canvas,D),n.style.cssText="height:0;"+"margin-left:".concat(s.width/2,"px;")+"margin-top:".concat(s.height/2,"px;")+"max-width:none!important;position:relative;width:0;",this.initImage((function(){Et(n,S,i.movable),Et(n,O,i.transition),t.renderImage((function(){t.viewed=!0,t.viewing=!1,pt(i.viewed)&&Lt(e,_,i.viewed,{once:!0}),Rt(e,_,{originalImage:t.images[o],index:o,image:n},{cancelable:!1})}))}))},loadImage:function(t){var e=t.target,i=e.parentNode,n=i.offsetWidth||30,o=i.offsetHeight||50,s=!!It(e,"filled");Nt(e,this.options,(function(t,i){var a=t/i,r=n,l=o;o*a>n?s?r=o*a:l=n/a:s?l=n/a:r=o*a,xt(e,wt({width:r,height:l},Mt({translateX:(n-r)/2,translateY:(o-l)/2})))}))},keydown:function(t){var e=this.options;if(e.keyboard){var i=t.keyCode||t.which||t.charCode;if(13===i&&this.viewer.contains(t.target)&&this.click(t),this.fulled)switch(i){case 27:this.played?this.stop():e.inline?this.fulled&&this.exit():this.hide();break;case 32:this.played&&this.stop();break;case 37:this.played&&this.playing?this.playing.prev():this.prev(e.loop);break;case 38:t.preventDefault(),this.zoom(e.zoomRatio,!0);break;case 39:this.played&&this.playing?this.playing.next():this.next(e.loop);break;case 40:t.preventDefault(),this.zoom(-e.zoomRatio,!0);break;case 48:case 49:t.ctrlKey&&(t.preventDefault(),this.toggle())}}},dragstart:function(t){"img"===t.target.localName&&t.preventDefault()},pointerdown:function(t){var e=this.options,i=this.pointers,n=t.buttons,o=t.button;if(this.pointerMoved=!1,!(!this.viewed||this.showing||this.viewing||this.hiding||("mousedown"===t.type||"pointerdown"===t.type&&"mouse"===t.pointerType)&&(dt(n)&&1!==n||dt(o)&&0!==o||t.ctrlKey))){t.preventDefault(),t.changedTouches?bt(t.changedTouches,(function(t){i[t.identifier]=Xt(t)})):i[t.pointerId||0]=Xt(t);var s=!!e.movable&&u;e.zoomOnTouch&&e.zoomable&&Object.keys(i).length>1?s=m:e.slideOnTouch&&("touch"===t.pointerType||"touchstart"===t.type)&&this.isSwitchable()&&(s=d),!e.transition||s!==u&&s!==m||Tt(this.image,O),this.action=s}},pointermove:function(t){var e=this.pointers,i=this.action;this.viewed&&i&&(t.preventDefault(),t.changedTouches?bt(t.changedTouches,(function(t){wt(e[t.identifier]||{},Xt(t,!0))})):wt(e[t.pointerId||0]||{},Xt(t,!0)),this.change(t))},pointerup:function(t){var e,i=this,n=this.options,o=this.action,s=this.pointers;t.changedTouches?bt(t.changedTouches,(function(t){e=s[t.identifier],delete s[t.identifier]})):(e=s[t.pointerId||0],delete s[t.pointerId||0]),o&&(t.preventDefault(),!n.transition||o!==u&&o!==m||zt(this.image,O),this.action=!1,l&&o!==m&&e&&Date.now()-e.timeStamp<500&&(clearTimeout(this.clickCanvasTimeout),clearTimeout(this.doubleClickImageTimeout),n.toggleOnDblclick&&this.viewed&&t.target===this.image?this.imageClicked?(this.imageClicked=!1,this.doubleClickImageTimeout=setTimeout((function(){Rt(i.image,L,{originalEvent:t})}),50)):(this.imageClicked=!0,this.doubleClickImageTimeout=setTimeout((function(){i.imageClicked=!1}),500)):(this.imageClicked=!1,n.backdrop&&"static"!==n.backdrop&&t.target===this.canvas&&(this.clickCanvasTimeout=setTimeout((function(){Rt(i.canvas,C,{originalEvent:t})}),50)))))},resize:function(){var t=this;if(this.isShown&&!this.hiding&&(this.fulled&&(this.close(),this.initBody(),this.open()),this.initContainer(),this.initViewer(),this.renderViewer(),this.renderList(),this.viewed&&this.initImage((function(){t.renderImage()})),this.played)){if(this.options.fullscreen&&this.fulled&&!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement))return void this.stop();bt(this.player.getElementsByTagName("img"),(function(e){Lt(e,N,t.loadImage.bind(t),{once:!0}),Rt(e,N)}))}},wheel:function(t){var e=this;if(this.viewed&&(t.preventDefault(),!this.wheeling)){this.wheeling=!0,setTimeout((function(){e.wheeling=!1}),50);var i=Number(this.options.zoomRatio)||.1,n=1;t.deltaY?n=t.deltaY>0?1:-1:t.wheelDelta?n=-t.wheelDelta/120:t.detail&&(n=t.detail>0?1:-1),this.zoom(-n*i,!0,null,t)}}},Ht={show:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.element,i=this.options;if(i.inline||this.showing||this.isShown||this.showing)return this;if(!this.ready)return this.build(),this.ready&&this.show(t),this;if(pt(i.show)&&Lt(e,V,i.show,{once:!0}),!1===Rt(e,V)||!this.ready)return this;this.hiding&&this.transitioning.abort(),this.showing=!0,this.open();var n=this.viewer;if(Tt(n,y),n.setAttribute("role","dialog"),n.setAttribute("aria-labelledby",this.title.id),n.setAttribute("aria-modal",!0),n.removeAttribute("aria-hidden"),i.transition&&!t){var o=this.shown.bind(this);this.transitioning={abort:function(){Ct(n,j,o),Tt(n,T)}},zt(n,O),n.initialOffsetWidth=n.offsetWidth,Lt(n,j,o,{once:!0}),zt(n,T)}else zt(n,T),this.shown();return this},hide:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],i=this.element,n=this.options;if(n.inline||this.hiding||!this.isShown&&!this.showing)return this;if(pt(n.hide)&&Lt(i,K,n.hide,{once:!0}),!1===Rt(i,K))return this;this.showing&&this.transitioning.abort(),this.hiding=!0,this.played?this.stop():this.viewing&&this.viewing.abort();var o=this.viewer,s=this.image,a=function(){Tt(o,T),t.hidden()};if(n.transition&&!e){var r=function e(i){i&&i.target===o&&(Ct(o,j,e),t.hidden())},l=function(){kt(o,O)?(Lt(o,j,r),Tt(o,T)):a()};this.transitioning={abort:function(){t.viewed&&kt(s,O)?Ct(s,j,l):kt(o,O)&&Ct(o,j,r)}},this.viewed&&kt(s,O)?(Lt(s,j,l,{once:!0}),this.zoomTo(0,!1,null,null,!0)):l()}else a();return this},view:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.options.initialViewIndex;if(e=Number(e)||0,this.hiding||this.played||e<0||e>=this.length||this.viewed&&e===this.index)return this;if(!this.isShown)return this.index=e,this.show();this.viewing&&this.viewing.abort();var i=this.element,n=this.options,o=this.title,s=this.canvas,a=this.items[e],r=a.querySelector("img"),l=It(r,"originalUrl"),h=r.getAttribute("alt"),c=document.createElement("img");if(bt(n.inheritedAttributes,(function(t){var e=r.getAttribute(t);null!==e&&c.setAttribute(t,e)})),c.src=l,c.alt=h,pt(n.view)&&Lt(i,$,n.view,{once:!0}),!1===Rt(i,$,{originalImage:this.images[e],index:e,image:c})||!this.isShown||this.hiding||this.played)return this;var u=this.items[this.index];u&&(Tt(u,g),u.removeAttribute("aria-selected")),zt(a,g),a.setAttribute("aria-selected",!0),n.focus&&a.focus(),this.image=c,this.viewed=!1,this.index=e,this.imageData={},zt(c,E),n.loading&&zt(s,D),s.innerHTML="",s.appendChild(c),this.renderList(),o.innerHTML="";var d,m,f=function(){var e,i=t.imageData,s=Array.isArray(n.title)?n.title[1]:n.title;o.innerHTML=ct(e=pt(s)?s.call(t,c,i):"".concat(h," (").concat(i.naturalWidth," × ").concat(i.naturalHeight,")"))?e.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):e};return Lt(i,_,f,{once:!0}),this.viewing={abort:function(){Ct(i,_,f),c.complete?t.imageRendering?t.imageRendering.abort():t.imageInitializing&&t.imageInitializing.abort():(c.src="",Ct(c,N,d),t.timeout&&clearTimeout(t.timeout))}},c.complete?this.load():(Lt(c,N,d=function(){Ct(c,Y,m),t.load()},{once:!0}),Lt(c,Y,m=function(){Ct(c,N,d),t.timeout&&(clearTimeout(t.timeout),t.timeout=!1),Tt(c,E),n.loading&&Tt(t.canvas,D)},{once:!0}),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout((function(){Tt(c,E),t.timeout=!1}),1e3)),this},prev:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.index-1;return e<0&&(e=t?this.length-1:0),this.view(e),this},next:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.length-1,i=this.index+1;return i>e&&(i=t?0:e),this.view(i),this},move:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,i=this.imageData;return this.moveTo(mt(t)?t:i.x+Number(t),mt(e)?e:i.y+Number(e)),this},moveTo:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=this.element,s=this.options,a=this.imageData;if(t=Number(t),i=Number(i),this.viewed&&!this.played&&s.movable){var r=a.x,l=a.y,h=!1;if(dt(t)?h=!0:t=r,dt(i)?h=!0:i=l,h){if(pt(s.move)&&Lt(o,J,s.move,{once:!0}),!1===Rt(o,J,{x:t,y:i,oldX:r,oldY:l,originalEvent:n}))return this;a.x=t,a.y=i,a.left=t,a.top=i,this.moving=!0,this.renderImage((function(){e.moving=!1,pt(s.moved)&&Lt(o,G,s.moved,{once:!0}),Rt(o,G,{x:t,y:i,oldX:r,oldY:l,originalEvent:n},{cancelable:!1})}))}}return this},rotate:function(t){return this.rotateTo((this.imageData.rotate||0)+Number(t)),this},rotateTo:function(t){var e=this,i=this.element,n=this.options,o=this.imageData;if(dt(t=Number(t))&&this.viewed&&!this.played&&n.rotatable){var s=o.rotate;if(pt(n.rotate)&&Lt(i,Q,n.rotate,{once:!0}),!1===Rt(i,Q,{degree:t,oldDegree:s}))return this;o.rotate=t,this.rotating=!0,this.renderImage((function(){e.rotating=!1,pt(n.rotated)&&Lt(i,tt,n.rotated,{once:!0}),Rt(i,tt,{degree:t,oldDegree:s},{cancelable:!1})}))}return this},scaleX:function(t){return this.scale(t,this.imageData.scaleY),this},scaleY:function(t){return this.scale(this.imageData.scaleX,t),this},scale:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,n=this.element,o=this.options,s=this.imageData;if(t=Number(t),i=Number(i),this.viewed&&!this.played&&o.scalable){var a=s.scaleX,r=s.scaleY,l=!1;if(dt(t)?l=!0:t=a,dt(i)?l=!0:i=r,l){if(pt(o.scale)&&Lt(n,et,o.scale,{once:!0}),!1===Rt(n,et,{scaleX:t,scaleY:i,oldScaleX:a,oldScaleY:r}))return this;s.scaleX=t,s.scaleY=i,this.scaling=!0,this.renderImage((function(){e.scaling=!1,pt(o.scaled)&&Lt(n,it,o.scaled,{once:!0}),Rt(n,it,{scaleX:t,scaleY:i,oldScaleX:a,oldScaleY:r},{cancelable:!1})}))}}return this},zoom:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=this.imageData;return t=(t=Number(t))<0?1/(1-t):1+t,this.zoomTo(o.width*t/o.naturalWidth,e,i,n),this},zoomTo:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,s=arguments.length>4&&void 0!==arguments[4]&&arguments[4],a=this.element,r=this.options,l=this.pointers,h=this.imageData,c=h.x,u=h.y,d=h.width,m=h.height,g=h.naturalWidth,f=h.naturalHeight;if(dt(t=Math.max(0,t))&&this.viewed&&!this.played&&(s||r.zoomable)){if(!s){var v=Math.max(.01,r.minZoomRatio),p=Math.min(100,r.maxZoomRatio);t=Math.min(Math.max(t,v),p)}if(o)switch(o.type){case"wheel":r.zoomRatio>=.055&&t>.95&&t<1.05&&(t=1);break;case"pointermove":case"touchmove":case"mousemove":t>.99&&t<1.01&&(t=1)}var b=g*t,w=f*t,y=b-d,x=w-m,k=h.ratio;if(pt(r.zoom)&&Lt(a,nt,r.zoom,{once:!0}),!1===Rt(a,nt,{ratio:t,oldRatio:k,originalEvent:o}))return this;if(this.zooming=!0,o){var z=function(t){var e=t.getBoundingClientRect();return{left:e.left+(window.pageXOffset-document.documentElement.clientLeft),top:e.top+(window.pageYOffset-document.documentElement.clientTop)}}(this.viewer),T=l&&Object.keys(l).length>0?function(t){var e=0,i=0,n=0;return bt(t,(function(t){var o=t.startX,s=t.startY;e+=o,i+=s,n+=1})),{pageX:e/=n,pageY:i/=n}}(l):{pageX:o.pageX,pageY:o.pageY};h.x-=y*((T.pageX-z.left-c)/d),h.y-=x*((T.pageY-z.top-u)/m)}else vt(n)&&dt(n.x)&&dt(n.y)?(h.x-=y*((n.x-c)/d),h.y-=x*((n.y-u)/m)):(h.x-=y/2,h.y-=x/2);h.left=h.x,h.top=h.y,h.width=b,h.height=w,h.oldRatio=k,h.ratio=t,this.renderImage((function(){e.zooming=!1,pt(r.zoomed)&&Lt(a,ot,r.zoomed,{once:!0}),Rt(a,ot,{ratio:t,oldRatio:k,originalEvent:o},{cancelable:!1})})),i&&this.tooltip()}return this},play:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!this.isShown||this.played)return this;var i=this.element,n=this.options;if(pt(n.play)&&Lt(i,st,n.play,{once:!0}),!1===Rt(i,st))return this;var o=this.player,s=this.loadImage.bind(this),a=[],r=0,l=0;if(this.played=!0,this.onLoadWhenPlay=s,e&&this.requestFullscreen(e),zt(o,A),bt(this.items,(function(t,e){var i=t.querySelector("img"),h=document.createElement("img");h.src=It(i,"originalUrl"),h.alt=i.getAttribute("alt"),h.referrerPolicy=i.referrerPolicy,r+=1,zt(h,v),Et(h,O,n.transition),kt(t,g)&&(zt(h,T),l=e),a.push(h),Lt(h,N,s,{once:!0}),o.appendChild(h)})),dt(n.interval)&&n.interval>0){var h=function e(){clearTimeout(t.playing.timeout),Tt(a[l],T),zt(a[l=(l+=1)<r?l:0],T),t.playing.timeout=setTimeout(e,n.interval)};r>1&&(this.playing={prev:function e(){clearTimeout(t.playing.timeout),Tt(a[l],T),zt(a[l=(l-=1)>=0?l:r-1],T),t.playing.timeout=setTimeout(e,n.interval)},next:h,timeout:setTimeout(h,n.interval)})}return this},stop:function(){var t=this;if(!this.played)return this;var e=this.element,i=this.options;if(pt(i.stop)&&Lt(e,at,i.stop,{once:!0}),!1===Rt(e,at))return this;var n=this.player;return clearTimeout(this.playing.timeout),this.playing=!1,this.played=!1,bt(n.getElementsByTagName("img"),(function(e){Ct(e,N,t.onLoadWhenPlay)})),Tt(n,A),n.innerHTML="",this.exitFullscreen(),this},full:function(){var t=this,e=this.options,i=this.viewer,n=this.image,o=this.list;return!this.isShown||this.played||this.fulled||!e.inline||(this.fulled=!0,this.open(),zt(this.button,w),e.transition&&(Tt(o,O),this.viewed&&Tt(n,O)),zt(i,p),i.setAttribute("role","dialog"),i.setAttribute("aria-labelledby",this.title.id),i.setAttribute("aria-modal",!0),i.removeAttribute("style"),xt(i,{zIndex:e.zIndex}),e.focus&&this.enforceFocus(),this.initContainer(),this.viewerData=wt({},this.containerData),this.renderList(),this.viewed&&this.initImage((function(){t.renderImage((function(){e.transition&&setTimeout((function(){zt(n,O),zt(o,O)}),0)}))}))),this},exit:function(){var t=this,e=this.options,i=this.viewer,n=this.image,o=this.list;return this.isShown&&!this.played&&this.fulled&&e.inline?(this.fulled=!1,this.close(),Tt(this.button,w),e.transition&&(Tt(o,O),this.viewed&&Tt(n,O)),e.focus&&this.clearEnforceFocus(),i.removeAttribute("role"),i.removeAttribute("aria-labelledby"),i.removeAttribute("aria-modal"),Tt(i,p),xt(i,{zIndex:e.zIndexInline}),this.viewerData=wt({},this.parentData),this.renderViewer(),this.renderList(),this.viewed&&this.initImage((function(){t.renderImage((function(){e.transition&&setTimeout((function(){zt(n,O),zt(o,O)}),0)}))})),this):this},tooltip:function(){var t=this,e=this.options,i=this.tooltipBox,n=this.imageData;return this.viewed&&!this.played&&e.tooltip?(i.textContent="".concat(Math.round(100*n.ratio),"%"),this.tooltipping?clearTimeout(this.tooltipping):e.transition?(this.fading&&Rt(i,j),zt(i,A),zt(i,v),zt(i,O),i.removeAttribute("aria-hidden"),i.initialOffsetWidth=i.offsetWidth,zt(i,T)):(zt(i,A),i.removeAttribute("aria-hidden")),this.tooltipping=setTimeout((function(){e.transition?(Lt(i,j,(function(){Tt(i,A),Tt(i,v),Tt(i,O),i.setAttribute("aria-hidden",!0),t.fading=!1}),{once:!0}),Tt(i,T),t.fading=!0):(Tt(i,A),i.setAttribute("aria-hidden",!0)),t.tooltipping=!1}),1e3),this):this},toggle:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return 1===this.imageData.ratio?this.zoomTo(this.imageData.oldRatio,!0,null,t):this.zoomTo(1,!0,null,t),this},reset:function(){return this.viewed&&!this.played&&(this.imageData=wt({},this.initialImageData),this.renderImage()),this},update:function(){var t=this,e=this.element,i=this.options,n=this.isImg;if(n&&!e.parentNode)return this.destroy();var o=[];if(bt(n?[e]:e.querySelectorAll("img"),(function(e){pt(i.filter)?i.filter.call(t,e)&&o.push(e):t.getImageURL(e)&&o.push(e)})),!o.length)return this;if(this.images=o,this.length=o.length,this.ready){var s=[];if(bt(this.items,(function(t,e){var i=t.querySelector("img"),n=o[e];n&&i&&n.src===i.src&&n.alt===i.alt||s.push(e)})),xt(this.list,{width:"auto"}),this.initList(),this.isShown)if(this.length){if(this.viewed){var a=s.indexOf(this.index);if(a>=0)this.viewed=!1,this.view(Math.max(Math.min(this.index-a,this.length-1),0));else{var r=this.items[this.index];zt(r,g),r.setAttribute("aria-selected",!0)}}}else this.image=null,this.viewed=!1,this.index=0,this.imageData={},this.canvas.innerHTML="",this.title.innerHTML=""}else this.build();return this},destroy:function(){var t=this.element,e=this.options;return t[c]?(this.destroyed=!0,this.ready?(this.played&&this.stop(),e.inline?(this.fulled&&this.exit(),this.unbind()):this.isShown?(this.viewing&&(this.imageRendering?this.imageRendering.abort():this.imageInitializing&&this.imageInitializing.abort()),this.hiding&&this.transitioning.abort(),this.hidden()):this.showing&&(this.transitioning.abort(),this.hidden()),this.ready=!1,this.viewer.parentNode.removeChild(this.viewer)):e.inline&&(this.delaying?this.delaying.abort():this.initializing&&this.initializing.abort()),e.inline||Ct(t,C,this.onStart),t[c]=void 0,this):this}},Bt={getImageURL:function(t){var e=this.options.url;return ct(e)?t.getAttribute(e):pt(e)?e.call(this,t):""},enforceFocus:function(){var t=this;this.clearEnforceFocus(),Lt(document,M,this.onFocusin=function(e){var i=t.viewer,n=e.target;if(n!==document&&n!==i&&!i.contains(n)){for(;n;){if(null!==n.getAttribute("tabindex")||"true"===n.getAttribute("aria-modal"))return;n=n.parentElement}i.focus()}})},clearEnforceFocus:function(){this.onFocusin&&(Ct(document,M,this.onFocusin),this.onFocusin=null)},open:function(){var t=this.body;zt(t,I),this.scrollbarWidth>0&&(t.style.paddingRight="".concat(this.scrollbarWidth+(parseFloat(this.initialBodyComputedPaddingRight)||0),"px"))},close:function(){var t=this.body;Tt(t,I),this.scrollbarWidth>0&&(t.style.paddingRight=this.initialBodyPaddingRight)},shown:function(){var t=this.element,e=this.options,i=this.viewer;this.fulled=!0,this.isShown=!0,this.render(),this.bind(),this.showing=!1,e.focus&&(i.focus(),this.enforceFocus()),pt(e.shown)&&Lt(t,U,e.shown,{once:!0}),!1!==Rt(t,U)&&this.ready&&this.isShown&&!this.hiding&&this.view(this.index)},hidden:function(){var t=this.element,e=this.options,i=this.viewer;e.fucus&&this.clearEnforceFocus(),this.close(),this.unbind(),zt(i,y),i.removeAttribute("role"),i.removeAttribute("aria-labelledby"),i.removeAttribute("aria-modal"),i.setAttribute("aria-hidden",!0),this.resetList(),this.resetImage(),this.fulled=!1,this.viewed=!1,this.isShown=!1,this.hiding=!1,this.destroyed||(pt(e.hidden)&&Lt(t,Z,e.hidden,{once:!0}),Rt(t,Z,null,{cancelable:!1}))},requestFullscreen:function(t){var e=this.element.ownerDocument;if(this.fulled&&!(e.fullscreenElement||e.webkitFullscreenElement||e.mozFullScreenElement||e.msFullscreenElement)){var i=e.documentElement;i.requestFullscreen?vt(t)?i.requestFullscreen(t):i.requestFullscreen():i.webkitRequestFullscreen?i.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):i.mozRequestFullScreen?i.mozRequestFullScreen():i.msRequestFullscreen&&i.msRequestFullscreen()}},exitFullscreen:function(){var t=this.element.ownerDocument;this.fulled&&(t.fullscreenElement||t.webkitFullscreenElement||t.mozFullScreenElement||t.msFullscreenElement)&&(t.exitFullscreen?t.exitFullscreen():t.webkitExitFullscreen?t.webkitExitFullscreen():t.mozCancelFullScreen?t.mozCancelFullScreen():t.msExitFullscreen&&t.msExitFullscreen())},change:function(t){var i=this.options,n=this.pointers,o=n[Object.keys(n)[0]];if(o){var s=o.endX-o.startX,a=o.endY-o.startY;switch(this.action){case u:0===s&&0===a||(this.pointerMoved=!0,this.move(s,a,t));break;case m:this.zoom(function(t){var i=e({},t),n=[];return bt(t,(function(t,e){delete i[e],bt(i,(function(e){var i=Math.abs(t.startX-e.startX),o=Math.abs(t.startY-e.startY),s=Math.abs(t.endX-e.endX),a=Math.abs(t.endY-e.endY),r=Math.sqrt(i*i+o*o),l=(Math.sqrt(s*s+a*a)-r)/r;n.push(l)}))})),n.sort((function(t,e){return Math.abs(t)<Math.abs(e)})),n[0]}(n),!1,null,t);break;case d:this.action="switched";var r=Math.abs(s);r>1&&r>Math.abs(a)&&(this.pointers={},s>1?this.prev(i.loop):s<-1&&this.next(i.loop))}bt(n,(function(t){t.startX=t.endX,t.startY=t.endY}))}},isSwitchable:function(){var t=this.imageData,e=this.viewerData;return this.length>1&&t.x>=0&&t.y>=0&&t.width<=e.width&&t.height<=e.height}},Vt=r.Viewer,Ut=(qt=-1,function(){return qt+=1}),Kt=function(){function t(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),!e||1!==e.nodeType)throw new Error("The first argument is required and must be an element.");this.element=e,this.options=wt({},s,vt(i)&&i),this.action=!1,this.fading=!1,this.fulled=!1,this.hiding=!1,this.imageClicked=!1,this.imageData={},this.index=this.options.initialViewIndex,this.isImg=!1,this.isShown=!1,this.length=0,this.moving=!1,this.played=!1,this.playing=!1,this.pointers={},this.ready=!1,this.rotating=!1,this.scaling=!1,this.showing=!1,this.timeout=!1,this.tooltipping=!1,this.viewed=!1,this.viewing=!1,this.wheeling=!1,this.zooming=!1,this.pointerMoved=!1,this.id=Ut(),this.init()}return e=t,o=[{key:"noConflict",value:function(){return window.Viewer=Vt,t}},{key:"setDefaults",value:function(t){wt(s,vt(t)&&t)}}],(i=[{key:"init",value:function(){var t=this,e=this.element,i=this.options;if(!e[c]){e[c]=this,i.focus&&!i.keyboard&&(i.focus=!1);var n="img"===e.localName,o=[];if(bt(n?[e]:e.querySelectorAll("img"),(function(e){pt(i.filter)?i.filter.call(t,e)&&o.push(e):t.getImageURL(e)&&o.push(e)})),this.isImg=n,this.length=o.length,this.images=o,this.initBody(),mt(document.createElement(c).style.transition)&&(i.transition=!1),i.inline){var s=0,a=function(){var e;(s+=1)===t.length&&(t.initializing=!1,t.delaying={abort:function(){clearTimeout(e)}},e=setTimeout((function(){t.delaying=!1,t.build()}),0))};this.initializing={abort:function(){bt(o,(function(t){t.complete||(Ct(t,N,a),Ct(t,Y,a))}))}},bt(o,(function(t){var e,i;t.complete?a():(Lt(t,N,e=function(){Ct(t,Y,i),a()},{once:!0}),Lt(t,Y,i=function(){Ct(t,N,e),a()},{once:!0}))}))}else Lt(e,C,this.onStart=function(e){var n=e.target;"img"!==n.localName||pt(i.filter)&&!i.filter.call(t,n)||t.view(t.images.indexOf(n))})}}},{key:"build",value:function(){if(!this.ready){var t=this.element,e=this.options,i=t.parentNode,n=document.createElement("div");n.innerHTML='<div class="viewer-container" tabindex="-1" touch-action="none"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><div class="viewer-toolbar"></div><div class="viewer-navbar"><ul class="viewer-list" role="navigation"></ul></div></div><div class="viewer-tooltip" role="alert" aria-hidden="true"></div><div class="viewer-button" data-viewer-action="mix" role="button"></div><div class="viewer-player"></div></div>';var o=n.querySelector(".".concat(c,"-container")),s=o.querySelector(".".concat(c,"-title")),a=o.querySelector(".".concat(c,"-toolbar")),r=o.querySelector(".".concat(c,"-navbar")),l=o.querySelector(".".concat(c,"-button")),h=o.querySelector(".".concat(c,"-canvas"));if(this.parent=i,this.viewer=o,this.title=s,this.toolbar=a,this.navbar=r,this.button=l,this.canvas=h,this.footer=o.querySelector(".".concat(c,"-footer")),this.tooltipBox=o.querySelector(".".concat(c,"-tooltip")),this.player=o.querySelector(".".concat(c,"-player")),this.list=o.querySelector(".".concat(c,"-list")),o.id="".concat(c).concat(this.id),s.id="".concat(c,"Title").concat(this.id),zt(s,e.title?Yt(Array.isArray(e.title)?e.title[0]:e.title):y),zt(r,e.navbar?Yt(e.navbar):y),Et(l,y,!e.button),e.keyboard&&l.setAttribute("tabindex",0),e.backdrop&&(zt(o,"".concat(c,"-backdrop")),e.inline||"static"===e.backdrop||At(h,rt,"hide")),ct(e.className)&&e.className&&e.className.split(lt).forEach((function(t){zt(o,t)})),e.toolbar){var u=document.createElement("ul"),d=vt(e.toolbar),m=ht.slice(0,3),g=ht.slice(7,9),w=ht.slice(9);d||zt(a,Yt(e.toolbar)),bt(d?e.toolbar:ht,(function(t,i){var n=d&&vt(t),o=d?St(i):t,s=n&&!mt(t.show)?t.show:t;if(s&&(e.zoomable||-1===m.indexOf(o))&&(e.rotatable||-1===g.indexOf(o))&&(e.scalable||-1===w.indexOf(o))){var a=n&&!mt(t.size)?t.size:t,r=n&&!mt(t.click)?t.click:t,l=document.createElement("li");e.keyboard&&l.setAttribute("tabindex",0),l.setAttribute("role","button"),zt(l,"".concat(c,"-").concat(o)),pt(r)||At(l,rt,o),dt(s)&&zt(l,Yt(s)),-1!==["small","large"].indexOf(a)?zt(l,"".concat(c,"-").concat(a)):"play"===o&&zt(l,"".concat(c,"-large")),pt(r)&&Lt(l,C,r),u.appendChild(l)}})),a.appendChild(u)}else zt(a,y);if(!e.rotatable){var x=a.querySelectorAll('li[class*="rotate"]');zt(x,E),bt(x,(function(t){a.appendChild(t)}))}if(e.inline)zt(l,b),xt(o,{zIndex:e.zIndexInline}),"static"===window.getComputedStyle(i).position&&xt(i,{position:"relative"}),i.insertBefore(o,t.nextSibling);else{zt(l,f),zt(o,p),zt(o,v),zt(o,y),xt(o,{zIndex:e.zIndex});var k=e.container;ct(k)&&(k=t.ownerDocument.querySelector(k)),k||(k=this.body),k.appendChild(o)}e.inline&&(this.render(),this.bind(),this.isShown=!0),this.ready=!0,pt(e.ready)&&Lt(t,B,e.ready,{once:!0}),!1!==Rt(t,B)?this.ready&&e.inline&&this.view(this.index):this.ready=!1}}}])&&n(e.prototype,i),o&&n(e,o),Object.defineProperty(e,"prototype",{writable:!1}),t;var e,i,o}();return wt(Kt.prototype,Pt,Wt,jt,Ht,Bt),Kt}()}}]);