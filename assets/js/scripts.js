!function(root,factory){"use strict";"undefined"!=typeof module&&module.exports?module.exports=factory(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],function($){return factory($)}):factory(root.jQuery)}(this,function($){"use strict";var Typeahead=function(element,options){this.$element=$(element),this.options=$.extend({},Typeahead.defaults,options),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.select=this.options.select||this.select,this.autoSelect="boolean"!=typeof this.options.autoSelect||this.options.autoSelect,this.highlighter=this.options.highlighter||this.highlighter,this.render=this.options.render||this.render,this.updater=this.options.updater||this.updater,this.displayText=this.options.displayText||this.displayText,this.itemLink=this.options.itemLink||this.itemLink,this.itemTitle=this.options.itemTitle||this.itemTitle,this.followLinkOnSelect=this.options.followLinkOnSelect||this.followLinkOnSelect,this.source=this.options.source,this.delay=this.options.delay,this.theme=this.options.theme&&this.options.themes&&this.options.themes[this.options.theme]||Typeahead.defaults.themes[Typeahead.defaults.theme],this.$menu=$(this.options.menu||this.theme.menu),this.$appendTo=this.options.appendTo?$(this.options.appendTo):null,this.fitToElement="boolean"==typeof this.options.fitToElement&&this.options.fitToElement,this.shown=!1,this.listen(),this.showHintOnFocus=("boolean"==typeof this.options.showHintOnFocus||"all"===this.options.showHintOnFocus)&&this.options.showHintOnFocus,this.afterSelect=this.options.afterSelect,this.afterEmptySelect=this.options.afterEmptySelect,this.addItem=!1,this.value=this.$element.val()||this.$element.text(),this.keyPressed=!1,this.focused=this.$element.is(":focus")};Typeahead.prototype={constructor:Typeahead,setDefault:function(val){if(this.$element.data("active",val),this.autoSelect||val){var newVal=this.updater(val);newVal||(newVal=""),this.$element.val(this.displayText(newVal)||newVal).text(this.displayText(newVal)||newVal).change(),this.afterSelect(newVal)}return this.hide()},select:function(){var val=this.$menu.find(".active").data("value");if(this.$element.data("active",val),this.autoSelect||val){var newVal=this.updater(val);newVal||(newVal=""),this.$element.val(this.displayText(newVal)||newVal).text(this.displayText(newVal)||newVal).change(),this.afterSelect(newVal),this.followLinkOnSelect&&this.itemLink(val)?(document.location=this.itemLink(val),this.afterSelect(newVal)):this.followLinkOnSelect&&!this.itemLink(val)?this.afterEmptySelect(newVal):this.afterSelect(newVal)}else this.afterEmptySelect(newVal);return this.hide()},updater:function(item){return item},setSource:function(source){this.source=source},show:function(){var element,pos=$.extend({},this.$element.position(),{height:this.$element[0].offsetHeight}),scrollHeight="function"==typeof this.options.scrollHeight?this.options.scrollHeight.call():this.options.scrollHeight;if(this.shown?element=this.$menu:this.$appendTo?(element=this.$menu.appendTo(this.$appendTo),this.hasSameParent=this.$appendTo.is(this.$element.parent())):(element=this.$menu.insertAfter(this.$element),this.hasSameParent=!0),!this.hasSameParent){element.css("position","fixed");var offset=this.$element.offset();pos.top=offset.top,pos.left=offset.left}var newTop=$(element).parent().hasClass("dropup")?"auto":pos.top+pos.height+scrollHeight,newLeft=$(element).hasClass("dropdown-menu-right")?"auto":pos.left;return element.css({top:newTop,left:newLeft}).show(),!0===this.options.fitToElement&&element.css("width",this.$element.outerWidth()+"px"),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(query){if(this.query=void 0!==query&&null!==query?query:this.$element.val(),this.query.length<this.options.minLength&&!this.options.showHintOnFocus)return this.shown?this.hide():this;var worker=$.proxy(function(){$.isFunction(this.source)&&3===this.source.length?this.source(this.query,$.proxy(this.process,this),$.proxy(this.process,this)):$.isFunction(this.source)?this.source(this.query,$.proxy(this.process,this)):this.source&&this.process(this.source)},this);clearTimeout(this.lookupWorker),this.lookupWorker=setTimeout(worker,this.delay)},process:function(items){var that=this;return items=$.grep(items,function(item){return that.matcher(item)}),(items=this.sorter(items)).length||this.options.addItem?(items.length>0?this.$element.data("active",items[0]):this.$element.data("active",null),"all"!=this.options.items&&(items=items.slice(0,this.options.items)),this.options.addItem&&items.push(this.options.addItem),this.render(items).show()):this.shown?this.hide():this},matcher:function(item){return~this.displayText(item).toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(items){for(var item,beginswith=[],caseSensitive=[],caseInsensitive=[];item=items.shift();){var it=this.displayText(item);it.toLowerCase().indexOf(this.query.toLowerCase())?~it.indexOf(this.query)?caseSensitive.push(item):caseInsensitive.push(item):beginswith.push(item)}return beginswith.concat(caseSensitive,caseInsensitive)},highlighter:function(item){var text=this.query;if(""===text)return item;var i,matches=item.match(/(>)([^<]*)(<)/g),first=[],second=[];if(matches&&matches.length)for(i=0;i<matches.length;++i)matches[i].length>2&&first.push(matches[i]);else(first=[]).push(item);text=text.replace(/[\(\)\/\.\*\+\?\[\]]/g,function(mat){return"\\"+mat});var m,reg=new RegExp(text,"g");for(i=0;i<first.length;++i)(m=first[i].match(reg))&&m.length>0&&second.push(first[i]);for(i=0;i<second.length;++i)item=item.replace(second[i],second[i].replace(reg,"<strong>$&</strong>"));return item},render:function(items){var that=this,self=this,activeFound=!1,data=[],_category=that.options.separator;return $.each(items,function(key,value){key>0&&value[_category]!==items[key-1][_category]&&data.push({__type:"divider"}),!value[_category]||0!==key&&value[_category]===items[key-1][_category]||data.push({__type:"category",name:value[_category]}),data.push(value)}),items=$(data).map(function(i,item){if("category"==(item.__type||!1))return $(that.options.headerHtml||that.theme.headerHtml).text(item.name)[0];if("divider"==(item.__type||!1))return $(that.options.headerDivider||that.theme.headerDivider)[0];var text=self.displayText(item);return(i=$(that.options.item||that.theme.item).data("value",item)).find(that.options.itemContentSelector||that.theme.itemContentSelector).addBack(that.options.itemContentSelector||that.theme.itemContentSelector).html(that.highlighter(text,item)),this.followLinkOnSelect&&i.find("a").attr("href",self.itemLink(item)),i.find("a").attr("title",self.itemTitle(item)),text==self.$element.val()&&(i.addClass("active"),self.$element.data("active",item),activeFound=!0),i[0]}),this.autoSelect&&!activeFound&&(items.filter(":not(.dropdown-header)").first().addClass("active"),this.$element.data("active",items.first().data("value"))),this.$menu.html(items),this},displayText:function(item){return void 0!==item&&void 0!==item.name?item.name:item},itemLink:function(item){return null},itemTitle:function(item){return null},next:function(event){var next=this.$menu.find(".active").removeClass("active").next();next.length||(next=$(this.$menu.find($(this.options.item||this.theme.item).prop("tagName"))[0])),next.addClass("active");var newVal=this.updater(next.data("value"));this.$element.val(this.displayText(newVal)||newVal)},prev:function(event){var prev=this.$menu.find(".active").removeClass("active").prev();prev.length||(prev=this.$menu.find($(this.options.item||this.theme.item).prop("tagName")).last()),prev.addClass("active");var newVal=this.updater(prev.data("value"));this.$element.val(this.displayText(newVal)||newVal)},listen:function(){this.$element.on("focus.bootstrap3Typeahead",$.proxy(this.focus,this)).on("blur.bootstrap3Typeahead",$.proxy(this.blur,this)).on("keypress.bootstrap3Typeahead",$.proxy(this.keypress,this)).on("propertychange.bootstrap3Typeahead input.bootstrap3Typeahead",$.proxy(this.input,this)).on("keyup.bootstrap3Typeahead",$.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown.bootstrap3Typeahead",$.proxy(this.keydown,this));var itemTagName=$(this.options.item||this.theme.item).prop("tagName");"ontouchstart"in document.documentElement?this.$menu.on("touchstart",itemTagName,$.proxy(this.touchstart,this)).on("touchend",itemTagName,$.proxy(this.click,this)):this.$menu.on("click",$.proxy(this.click,this)).on("mouseenter",itemTagName,$.proxy(this.mouseenter,this)).on("mouseleave",itemTagName,$.proxy(this.mouseleave,this)).on("mousedown",$.proxy(this.mousedown,this))},destroy:function(){this.$element.data("typeahead",null),this.$element.data("active",null),this.$element.unbind("focus.bootstrap3Typeahead").unbind("blur.bootstrap3Typeahead").unbind("keypress.bootstrap3Typeahead").unbind("propertychange.bootstrap3Typeahead input.bootstrap3Typeahead").unbind("keyup.bootstrap3Typeahead"),this.eventSupported("keydown")&&this.$element.unbind("keydown.bootstrap3-typeahead"),this.$menu.remove(),this.destroyed=!0},eventSupported:function(eventName){var isSupported=eventName in this.$element;return isSupported||(this.$element.setAttribute(eventName,"return;"),isSupported="function"==typeof this.$element[eventName]),isSupported},move:function(e){if(this.shown)switch(e.keyCode){case 9:case 13:case 27:e.preventDefault();break;case 38:if(e.shiftKey)return;e.preventDefault(),this.prev();break;case 40:if(e.shiftKey)return;e.preventDefault(),this.next()}},keydown:function(e){17!==e.keyCode&&(this.keyPressed=!0,this.suppressKeyPressRepeat=~$.inArray(e.keyCode,[40,38,9,13,27]),this.shown||40!=e.keyCode?this.move(e):this.lookup())},keypress:function(e){this.suppressKeyPressRepeat||this.move(e)},input:function(e){var currentValue=this.$element.val()||this.$element.text();this.value!==currentValue&&(this.value=currentValue,this.lookup())},keyup:function(e){if(!this.destroyed)switch(e.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:if(!this.shown||this.showHintOnFocus&&!this.keyPressed)return;this.select();break;case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide()}},focus:function(e){this.focused||(this.focused=!0,this.keyPressed=!1,this.options.showHintOnFocus&&!0!==this.skipShowHintOnFocus&&("all"===this.options.showHintOnFocus?this.lookup(""):this.lookup())),this.skipShowHintOnFocus&&(this.skipShowHintOnFocus=!1)},blur:function(e){this.mousedover||this.mouseddown||!this.shown?this.mouseddown&&(this.skipShowHintOnFocus=!0,this.$element.focus(),this.mouseddown=!1):(this.select(),this.hide(),this.focused=!1,this.keyPressed=!1)},click:function(e){e.preventDefault(),this.skipShowHintOnFocus=!0,this.select(),this.$element.focus(),this.hide()},mouseenter:function(e){this.mousedover=!0,this.$menu.find(".active").removeClass("active"),$(e.currentTarget).addClass("active")},mouseleave:function(e){this.mousedover=!1,!this.focused&&this.shown&&this.hide()},mousedown:function(e){this.mouseddown=!0,this.$menu.one("mouseup",function(e){this.mouseddown=!1}.bind(this))},touchstart:function(e){e.preventDefault(),this.$menu.find(".active").removeClass("active"),$(e.currentTarget).addClass("active")},touchend:function(e){e.preventDefault(),this.select(),this.$element.focus()}};var old=$.fn.typeahead;$.fn.typeahead=function(option){var arg=arguments;return"string"==typeof option&&"getActive"==option?this.data("active"):this.each(function(){var $this=$(this),data=$this.data("typeahead"),options="object"==typeof option&&option;data||$this.data("typeahead",data=new Typeahead(this,options)),"string"==typeof option&&data[option]&&(arg.length>1?data[option].apply(data,Array.prototype.slice.call(arg,1)):data[option]())})},Typeahead.defaults={source:[],items:8,minLength:1,scrollHeight:0,autoSelect:!0,afterSelect:$.noop,afterEmptySelect:$.noop,addItem:!1,followLinkOnSelect:!1,delay:0,separator:"category",theme:"bootstrap3",themes:{bootstrap3:{menu:'<ul class="typeahead dropdown-menu" role="listbox"></ul>',item:'<li><a class="dropdown-item" href="#" role="option"></a></li>',itemContentSelector:"a",headerHtml:'<li class="dropdown-header"></li>',headerDivider:'<li class="divider" role="separator"></li>'},bootstrap4:{menu:'<div class="typeahead dropdown-menu" role="listbox"></div>',item:'<button class="dropdown-item" role="option"></button>',itemContentSelector:".dropdown-item",headerHtml:'<h6 class="dropdown-header"></h6>',headerDivider:'<div class="dropdown-divider"></div>'}}},$.fn.typeahead.Constructor=Typeahead,$.fn.typeahead.noConflict=function(){return $.fn.typeahead=old,this},$(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(e){var $this=$(this);$this.data("typeahead")||$this.typeahead($this.data())})});;/* jquery.scrollex v0.2.1 | (c) @ajlkn | github.com/ajlkn/jquery.scrollex | MIT licensed */
!function(t){function e(t,e,n){return"string"==typeof t&&("%"==t.slice(-1)?t=parseInt(t.substring(0,t.length-1))/100*e:"vh"==t.slice(-2)?t=parseInt(t.substring(0,t.length-2))/100*n:"px"==t.slice(-2)&&(t=parseInt(t.substring(0,t.length-2)))),t}var n=t(window),i=1,o={};n.on("scroll",function(){var e=n.scrollTop();t.map(o,function(t){window.clearTimeout(t.timeoutId),t.timeoutId=window.setTimeout(function(){t.handler(e)},t.options.delay)})}).on("load",function(){n.trigger("scroll")}),jQuery.fn.scrollex=function(l){var s=t(this);if(0==this.length)return s;if(this.length>1){for(var r=0;r<this.length;r++)t(this[r]).scrollex(l);return s}if(s.data("_scrollexId"))return s;var a,u,h,c,p;switch(a=i++,u=jQuery.extend({top:0,bottom:0,delay:0,mode:"default",enter:null,leave:null,initialize:null,terminate:null,scroll:null},l),u.mode){case"top":h=function(t,e,n,i,o){return t>=i&&o>=t};break;case"bottom":h=function(t,e,n,i,o){return n>=i&&o>=n};break;case"middle":h=function(t,e,n,i,o){return e>=i&&o>=e};break;case"top-only":h=function(t,e,n,i,o){return i>=t&&n>=i};break;case"bottom-only":h=function(t,e,n,i,o){return n>=o&&o>=t};break;default:case"default":h=function(t,e,n,i,o){return n>=i&&o>=t}}return c=function(t){var i,o,l,s,r,a,u=this.state,h=!1,c=this.$element.offset();i=n.height(),o=t+i/2,l=t+i,s=this.$element.outerHeight(),r=c.top+e(this.options.top,s,i),a=c.top+s-e(this.options.bottom,s,i),h=this.test(t,o,l,r,a),h!=u&&(this.state=h,h?this.options.enter&&this.options.enter.apply(this.element):this.options.leave&&this.options.leave.apply(this.element)),this.options.scroll&&this.options.scroll.apply(this.element,[(o-r)/(a-r)])},p={id:a,options:u,test:h,handler:c,state:null,element:this,$element:s,timeoutId:null},o[a]=p,s.data("_scrollexId",p.id),p.options.initialize&&p.options.initialize.apply(this),s},jQuery.fn.unscrollex=function(){var e=t(this);if(0==this.length)return e;if(this.length>1){for(var n=0;n<this.length;n++)t(this[n]).unscrollex();return e}var i,l;return(i=e.data("_scrollexId"))?(l=o[i],window.clearTimeout(l.timeoutId),delete o[i],e.removeData("_scrollexId"),l.options.terminate&&l.options.terminate.apply(this),e):e}}(jQuery);;/* jquery.scrolly v1.0.0-dev | (c) @ajlkn | MIT licensed */
(function(e){function u(s,o){var u,a,f;if((u=e(s))[t]==0)return n;a=u[i]()[r];switch(o.anchor){case"middle":f=a-(e(window).height()-u.outerHeight())/2;break;default:case r:f=Math.max(a,0)}return typeof o[i]=="function"?f-=o[i]():f-=o[i],f}var t="length",n=null,r="top",i="offset",s="click.scrolly",o=e(window);e.fn.scrolly=function(i){var o,a,f,l,c=e(this);if(this[t]==0)return c;if(this[t]>1){for(o=0;o<this[t];o++)e(this[o]).scrolly(i);return c}l=n,f=c.attr("href");if(f.charAt(0)!="#"||f[t]<2)return c;a=jQuery.extend({anchor:r,easing:"swing",offset:0,parent:e("body,html"),pollOnce:!1,speed:1e3},i),a.pollOnce&&(l=u(f,a)),c.off(s).on(s,function(e){var t=l!==n?l:u(f,a);t!==n&&(e.preventDefault(),a.parent.stop().animate({scrollTop:t},a.speed,a.easing))})}})(jQuery);;/* skel.js v3.0.1 | (c) skel.io | MIT licensed */
var skel=function(){"use strict";var t={breakpointIds:null,events:{},isInit:!1,obj:{attachments:{},breakpoints:{},head:null,states:{}},sd:"/",state:null,stateHandlers:{},stateId:"",vars:{},DOMReady:null,indexOf:null,isArray:null,iterate:null,matchesMedia:null,extend:function(e,n){t.iterate(n,function(i){t.isArray(n[i])?(t.isArray(e[i])||(e[i]=[]),t.extend(e[i],n[i])):"object"==typeof n[i]?("object"!=typeof e[i]&&(e[i]={}),t.extend(e[i],n[i])):e[i]=n[i]})},newStyle:function(t){var e=document.createElement("style");return e.type="text/css",e.innerHTML=t,e},_canUse:null,canUse:function(e){t._canUse||(t._canUse=document.createElement("div"));var n=t._canUse.style,i=e.charAt(0).toUpperCase()+e.slice(1);return e in n||"Moz"+i in n||"Webkit"+i in n||"O"+i in n||"ms"+i in n},on:function(e,n){var i=e.split(/[\s]+/);return t.iterate(i,function(e){var a=i[e];if(t.isInit){if("init"==a)return void n();if("change"==a)n();else{var r=a.charAt(0);if("+"==r||"!"==r){var o=a.substring(1);if(o in t.obj.breakpoints)if("+"==r&&t.obj.breakpoints[o].active)n();else if("!"==r&&!t.obj.breakpoints[o].active)return void n()}}}t.events[a]||(t.events[a]=[]),t.events[a].push(n)}),t},trigger:function(e){return t.events[e]&&0!=t.events[e].length?(t.iterate(t.events[e],function(n){t.events[e][n]()}),t):void 0},breakpoint:function(e){return t.obj.breakpoints[e]},breakpoints:function(e){function n(t,e){this.name=this.id=t,this.media=e,this.active=!1,this.wasActive=!1}return n.prototype.matches=function(){return t.matchesMedia(this.media)},n.prototype.sync=function(){this.wasActive=this.active,this.active=this.matches()},t.iterate(e,function(i){t.obj.breakpoints[i]=new n(i,e[i])}),window.setTimeout(function(){t.poll()},0),t},addStateHandler:function(e,n){t.stateHandlers[e]=n},callStateHandler:function(e){var n=t.stateHandlers[e]();t.iterate(n,function(e){t.state.attachments.push(n[e])})},changeState:function(e){t.iterate(t.obj.breakpoints,function(e){t.obj.breakpoints[e].sync()}),t.vars.lastStateId=t.stateId,t.stateId=e,t.breakpointIds=t.stateId===t.sd?[]:t.stateId.substring(1).split(t.sd),t.obj.states[t.stateId]?t.state=t.obj.states[t.stateId]:(t.obj.states[t.stateId]={attachments:[]},t.state=t.obj.states[t.stateId],t.iterate(t.stateHandlers,t.callStateHandler)),t.detachAll(t.state.attachments),t.attachAll(t.state.attachments),t.vars.stateId=t.stateId,t.vars.state=t.state,t.trigger("change"),t.iterate(t.obj.breakpoints,function(e){t.obj.breakpoints[e].active?t.obj.breakpoints[e].wasActive||t.trigger("+"+e):t.obj.breakpoints[e].wasActive&&t.trigger("-"+e)})},generateStateConfig:function(e,n){var i={};return t.extend(i,e),t.iterate(t.breakpointIds,function(e){t.extend(i,n[t.breakpointIds[e]])}),i},getStateId:function(){var e="";return t.iterate(t.obj.breakpoints,function(n){var i=t.obj.breakpoints[n];i.matches()&&(e+=t.sd+i.id)}),e},poll:function(){var e="";e=t.getStateId(),""===e&&(e=t.sd),e!==t.stateId&&t.changeState(e)},_attach:null,attach:function(e){var n=t.obj.head,i=e.element;return i.parentNode&&i.parentNode.tagName?!1:(t._attach||(t._attach=n.firstChild),n.insertBefore(i,t._attach.nextSibling),e.permanent&&(t._attach=i),!0)},attachAll:function(e){var n=[];t.iterate(e,function(t){n[e[t].priority]||(n[e[t].priority]=[]),n[e[t].priority].push(e[t])}),n.reverse(),t.iterate(n,function(e){t.iterate(n[e],function(i){t.attach(n[e][i])})})},detach:function(t){var e=t.element;return t.permanent||!e.parentNode||e.parentNode&&!e.parentNode.tagName?!1:(e.parentNode.removeChild(e),!0)},detachAll:function(e){var n={};t.iterate(e,function(t){n[e[t].id]=!0}),t.iterate(t.obj.attachments,function(e){e in n||t.detach(t.obj.attachments[e])})},attachment:function(e){return e in t.obj.attachments?t.obj.attachments[e]:null},newAttachment:function(e,n,i,a){return t.obj.attachments[e]={id:e,element:n,priority:i,permanent:a}},init:function(){t.initMethods(),t.initVars(),t.initEvents(),t.obj.head=document.getElementsByTagName("head")[0],t.isInit=!0,t.trigger("init")},initEvents:function(){t.on("resize",function(){t.poll()}),t.on("orientationChange",function(){t.poll()}),t.DOMReady(function(){t.trigger("ready")}),window.onload&&t.on("load",window.onload),window.onload=function(){t.trigger("load")},window.onresize&&t.on("resize",window.onresize),window.onresize=function(){t.trigger("resize")},window.onorientationchange&&t.on("orientationChange",window.onorientationchange),window.onorientationchange=function(){t.trigger("orientationChange")}},initMethods:function(){document.addEventListener?!function(e,n){t.DOMReady=n()}("domready",function(){function t(t){for(r=1;t=n.shift();)t()}var e,n=[],i=document,a="DOMContentLoaded",r=/^loaded|^c/.test(i.readyState);return i.addEventListener(a,e=function(){i.removeEventListener(a,e),t()}),function(t){r?t():n.push(t)}}):!function(e,n){t.DOMReady=n()}("domready",function(t){function e(t){for(h=1;t=i.shift();)t()}var n,i=[],a=!1,r=document,o=r.documentElement,s=o.doScroll,c="DOMContentLoaded",d="addEventListener",u="onreadystatechange",l="readyState",f=s?/^loaded|^c/:/^loaded|c/,h=f.test(r[l]);return r[d]&&r[d](c,n=function(){r.removeEventListener(c,n,a),e()},a),s&&r.attachEvent(u,n=function(){/^c/.test(r[l])&&(r.detachEvent(u,n),e())}),t=s?function(e){self!=top?h?e():i.push(e):function(){try{o.doScroll("left")}catch(n){return setTimeout(function(){t(e)},50)}e()}()}:function(t){h?t():i.push(t)}}),Array.prototype.indexOf?t.indexOf=function(t,e){return t.indexOf(e)}:t.indexOf=function(t,e){if("string"==typeof t)return t.indexOf(e);var n,i,a=e?e:0;if(!this)throw new TypeError;if(i=this.length,0===i||a>=i)return-1;for(0>a&&(a=i-Math.abs(a)),n=a;i>n;n++)if(this[n]===t)return n;return-1},Array.isArray?t.isArray=function(t){return Array.isArray(t)}:t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},Object.keys?t.iterate=function(t,e){if(!t)return[];var n,i=Object.keys(t);for(n=0;i[n]&&e(i[n],t[i[n]])!==!1;n++);}:t.iterate=function(t,e){if(!t)return[];var n;for(n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])===!1)break},window.matchMedia?t.matchesMedia=function(t){return""==t?!0:window.matchMedia(t).matches}:window.styleMedia||window.media?t.matchesMedia=function(t){if(""==t)return!0;var e=window.styleMedia||window.media;return e.matchMedium(t||"all")}:window.getComputedStyle?t.matchesMedia=function(t){if(""==t)return!0;var e=document.createElement("style"),n=document.getElementsByTagName("script")[0],i=null;e.type="text/css",e.id="matchmediajs-test",n.parentNode.insertBefore(e,n),i="getComputedStyle"in window&&window.getComputedStyle(e,null)||e.currentStyle;var a="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return e.styleSheet?e.styleSheet.cssText=a:e.textContent=a,"1px"===i.width}:t.matchesMedia=function(t){if(""==t)return!0;var e,n,i,a,r={"min-width":null,"max-width":null},o=!1;for(i=t.split(/\s+and\s+/),e=0;e<i.length;e++)n=i[e],"("==n.charAt(0)&&(n=n.substring(1,n.length-1),a=n.split(/:\s+/),2==a.length&&(r[a[0].replace(/^\s+|\s+$/g,"")]=parseInt(a[1]),o=!0));if(!o)return!1;var s=document.documentElement.clientWidth,c=document.documentElement.clientHeight;return null!==r["min-width"]&&s<r["min-width"]||null!==r["max-width"]&&s>r["max-width"]||null!==r["min-height"]&&c<r["min-height"]||null!==r["max-height"]&&c>r["max-height"]?!1:!0},navigator.userAgent.match(/MSIE ([0-9]+)/)&&RegExp.$1<9&&(t.newStyle=function(t){var e=document.createElement("span");return e.innerHTML='&nbsp;<style type="text/css">'+t+"</style>",e})},initVars:function(){var e,n,i,a=navigator.userAgent;e="other",n=0,i=[["firefox",/Firefox\/([0-9\.]+)/],["bb",/BlackBerry.+Version\/([0-9\.]+)/],["bb",/BB[0-9]+.+Version\/([0-9\.]+)/],["opera",/OPR\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)/],["edge",/Edge\/([0-9\.]+)/],["safari",/Version\/([0-9\.]+).+Safari/],["chrome",/Chrome\/([0-9\.]+)/],["ie",/MSIE ([0-9]+)/],["ie",/Trident\/.+rv:([0-9]+)/]],t.iterate(i,function(t,i){return a.match(i[1])?(e=i[0],n=parseFloat(RegExp.$1),!1):void 0}),t.vars.browser=e,t.vars.browserVersion=n,e="other",n=0,i=[["ios",/([0-9_]+) like Mac OS X/,function(t){return t.replace("_",".").replace("_","")}],["ios",/CPU like Mac OS X/,function(t){return 0}],["wp",/Windows Phone ([0-9\.]+)/,null],["android",/Android ([0-9\.]+)/,null],["mac",/Macintosh.+Mac OS X ([0-9_]+)/,function(t){return t.replace("_",".").replace("_","")}],["windows",/Windows NT ([0-9\.]+)/,null],["bb",/BlackBerry.+Version\/([0-9\.]+)/,null],["bb",/BB[0-9]+.+Version\/([0-9\.]+)/,null]],t.iterate(i,function(t,i){return a.match(i[1])?(e=i[0],n=parseFloat(i[2]?i[2](RegExp.$1):RegExp.$1),!1):void 0}),t.vars.os=e,t.vars.osVersion=n,t.vars.IEVersion="ie"==t.vars.browser?t.vars.browserVersion:99,t.vars.touch="wp"==t.vars.os?navigator.msMaxTouchPoints>0:!!("ontouchstart"in window),t.vars.mobile="wp"==t.vars.os||"android"==t.vars.os||"ios"==t.vars.os||"bb"==t.vars.os}};return t.init(),t}();!function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.skel=e()}(this,function(){return skel});
;/* Jquery Util.js */
!function(t){t.fn.navList=function(){var e=t(this);return $a=e.find("a"),b=[],$a.each(function(){var e=t(this),a=Math.max(0,e.parents("li").length-1),l=e.attr("href"),i=e.attr("target");b.push('<a class="link depth-'+a+'"'+(void 0!==i&&""!=i?' target="'+i+'"':"")+(void 0!==l&&""!=l?' href="'+l+'"':"")+'><span class="indent-'+a+'"></span>'+e.text()+"</a>")}),b.join("")},t.fn.panel=function(e){if(0==this.length)return i;if(this.length>1){for(var a=0;a<this.length;a++)t(this[a]).panel(e);return i}var l,i=t(this),r=t("body"),o=t(window),n=i.attr("id");return"jQuery"!=typeof(l=t.extend({delay:0,hideOnClick:!1,hideOnEscape:!1,hideOnSwipe:!1,resetScroll:!1,resetForms:!1,side:null,target:i,visibleClass:"visible"},e)).target&&(l.target=t(l.target)),i._hide=function(t){l.target.hasClass(l.visibleClass)&&(t&&(t.preventDefault(),t.stopPropagation()),l.target.removeClass(l.visibleClass),window.setTimeout(function(){l.resetScroll&&i.scrollTop(0),l.resetForms&&i.find("form").each(function(){this.reset()})},l.delay))},i.css("-ms-overflow-style","-ms-autohiding-scrollbar").css("-webkit-overflow-scrolling","touch"),l.hideOnClick&&(i.find("a").css("-webkit-tap-highlight-color","rgba(0,0,0,0)"),i.on("click","a",function(e){var a=t(this),r=a.attr("href"),o=a.attr("target");r&&"#"!=r&&""!=r&&r!="#"+n&&(e.preventDefault(),e.stopPropagation(),i._hide(),window.setTimeout(function(){"_blank"==o?window.open(r):window.location.href=r},l.delay+10))})),i.on("touchstart",function(t){i.touchPosX=t.originalEvent.touches[0].pageX,i.touchPosY=t.originalEvent.touches[0].pageY}),i.on("touchmove",function(t){if(null!==i.touchPosX&&null!==i.touchPosY){var e=i.touchPosX-t.originalEvent.touches[0].pageX,a=i.touchPosY-t.originalEvent.touches[0].pageY,r=i.outerHeight(),o=i.get(0).scrollHeight-i.scrollTop();if(l.hideOnSwipe){var n=!1,s=20;switch(l.side){case"left":n=a<s&&a>-20&&e>50;break;case"right":n=a<s&&a>-20&&e<-50;break;case"top":n=e<s&&e>-20&&a>50;break;case"bottom":n=e<s&&e>-20&&a<-50}if(n)return i.touchPosX=null,i.touchPosY=null,i._hide(),!1}(i.scrollTop()<0&&a<0||o>r-2&&o<r+2&&a>0)&&(t.preventDefault(),t.stopPropagation())}}),i.on("click touchend touchstart touchmove",function(t){t.stopPropagation()}),i.on("click",'a[href="#'+n+'"]',function(t){t.preventDefault(),t.stopPropagation(),l.target.removeClass(l.visibleClass)}),r.on("click touchend",function(t){i._hide(t)}),r.on("click",'a[href="#'+n+'"]',function(t){t.preventDefault(),t.stopPropagation(),l.target.toggleClass(l.visibleClass)}),l.hideOnEscape&&o.on("keydown",function(t){27==t.keyCode&&i._hide(t)}),i},t.fn.placeholder=function(){if(void 0!==document.createElement("input").placeholder)return t(this);if(0==this.length)return a;if(this.length>1){for(var e=0;e<this.length;e++)t(this[e]).placeholder();return a}var a=t(this);return a.find("input[type=text],textarea").each(function(){var e=t(this);""!=e.val()&&e.val()!=e.attr("placeholder")||e.addClass("polyfill-placeholder").val(e.attr("placeholder"))}).on("blur",function(){var e=t(this);e.attr("name").match(/-polyfill-field$/)||""==e.val()&&e.addClass("polyfill-placeholder").val(e.attr("placeholder"))}).on("focus",function(){var e=t(this);e.attr("name").match(/-polyfill-field$/)||e.val()==e.attr("placeholder")&&e.removeClass("polyfill-placeholder").val("")}),a.find("input[type=password]").each(function(){var e=t(this),a=t(t("<div>").append(e.clone()).remove().html().replace(/type="password"/i,'type="text"').replace(/type=password/i,"type=text"));""!=e.attr("id")&&a.attr("id",e.attr("id")+"-polyfill-field"),""!=e.attr("name")&&a.attr("name",e.attr("name")+"-polyfill-field"),a.addClass("polyfill-placeholder").val(a.attr("placeholder")).insertAfter(e),""==e.val()?e.hide():a.hide(),e.on("blur",function(t){t.preventDefault();var a=e.parent().find("input[name="+e.attr("name")+"-polyfill-field]");""==e.val()&&(e.hide(),a.show())}),a.on("focus",function(t){t.preventDefault();var e=a.parent().find("input[name="+a.attr("name").replace("-polyfill-field","")+"]");a.hide(),e.show().focus()}).on("keypress",function(t){t.preventDefault(),a.val("")})}),a.on("submit",function(){a.find("input[type=text],input[type=password],textarea").each(function(e){var a=t(this);a.attr("name").match(/-polyfill-field$/)&&a.attr("name",""),a.val()==a.attr("placeholder")&&(a.removeClass("polyfill-placeholder"),a.val(""))})}).on("reset",function(e){e.preventDefault(),a.find("select").val(t("option:first").val()),a.find("input,textarea").each(function(){var e,a=t(this);switch(a.removeClass("polyfill-placeholder"),this.type){case"submit":case"reset":break;case"password":a.val(a.attr("defaultValue")),e=a.parent().find("input[name="+a.attr("name")+"-polyfill-field]"),""==a.val()?(a.hide(),e.show()):(a.show(),e.hide());break;case"checkbox":case"radio":a.attr("checked",a.attr("defaultValue"));break;case"text":case"textarea":a.val(a.attr("defaultValue")),""==a.val()&&(a.addClass("polyfill-placeholder"),a.val(a.attr("placeholder")));break;default:a.val(a.attr("defaultValue"))}})}),a},t.prioritize=function(e,a){var l="__prioritize";"jQuery"!=typeof e&&(e=t(e)),e.each(function(){var e,i=t(this),r=i.parent();if(0!=r.length)if(i.data(l)){if(a)return;e=i.data(l),i.insertAfter(e),i.removeData(l)}else{if(!a)return;if(0==(e=i.prev()).length)return;i.prependTo(r),i.data(l,e)}})}}(jQuery);
;/* Massively Html5up theme js */
!function(e){skel.breakpoints({xlarge:"(max-width: 1680px)",large:"(max-width: 1280px)",medium:"(max-width: 980px)",small:"(max-width: 736px)",xsmall:"(max-width: 480px)",xxsmall:"(max-width: 360px)"}),e.fn._parallax=function(a){var n=e(window),i=e(this);if(0==this.length||0===a)return i;if(this.length>1){for(var l=0;l<this.length;l++)e(this[l])._parallax(a);return i}return a||(a=.25),i.each(function(){var i,l,s=e(this),o=e('<div class="bg"></div>').appendTo(s);i=function(){o.removeClass("fixed").css("transform","matrix(1,0,0,1,0,0)"),n.on("scroll._parallax",function(){var e=parseInt(n.scrollTop())-parseInt(s.position().top);o.css("transform","matrix(1,0,0,1,0,"+e*a+")")})},l=function(){o.addClass("fixed").css("transform","none"),n.off("scroll._parallax")},"ie"==skel.vars.browser||"edge"==skel.vars.browser||window.devicePixelRatio>1||skel.vars.mobile?l():(skel.on("!large -large",i),skel.on("+large",l))}),n.off("load._parallax resize._parallax").on("load._parallax resize._parallax",function(){n.trigger("scroll")}),e(this)},e(function(){var a,n,i,l=e(window),s=e("body"),o=e("#wrapper"),r=e("#header"),t=e("#nav"),d=e("#main");l.on("load",function(){window.setTimeout(function(){s.removeClass("is-loading")},100)}),skel.on("+medium -medium",function(){e.prioritize(".important\\28 medium\\29",skel.breakpoint("medium").active)}),e(".scrolly").scrolly(),o._parallax(.925),a=e('<a href="#navPanel" id="navPanelToggle">Menu</a>').appendTo(o),r.scrollex({bottom:"5vh",enter:function(){a.removeClass("alt")},leave:function(){a.addClass("alt")}}),n=e('<div id="navPanel"><nav></nav><a href="#navPanel" class="close"></a></div>').appendTo(s).panel({delay:500,hideOnClick:!0,hideOnSwipe:!0,resetScroll:!0,resetForms:!0,side:"right",target:s,visibleClass:"is-navPanel-visible"}),i=n.children("nav");var c=t.children();skel.on("!medium -medium",function(){c.appendTo(t),t.find(".icons, .icon").removeClass("alt")}),skel.on("+medium",function(){c.appendTo(i),i.find(".icons, .icon").addClass("alt")}),"wp"==skel.vars.os&&skel.vars.osVersion<10&&n.css("transition","none");var m=e("#intro");m.length>0&&("ie"==skel.vars.browser&&l.on("resize.ie-intro-fix",function(){var e=m.height();e>l.height()?m.css("height","auto"):m.css("height",e)}).trigger("resize.ie-intro-fix"),skel.on("!small -small",function(){d.unscrollex(),d.scrollex({mode:"bottom",top:"25vh",bottom:"-50vh",enter:function(){m.addClass("hidden")},leave:function(){m.removeClass("hidden")}})}),skel.on("+small",function(){d.unscrollex(),d.scrollex({mode:"middle",top:"15vh",bottom:"-15vh",enter:function(){m.addClass("hidden")},leave:function(){m.removeClass("hidden")}})}))})}(jQuery);
/* End of theme.js */
;function listenForWaitingServiceWorker(e,n){function r(){e.installing.addEventListener("statechange",function(){"installed"===this.state&&n(e)})}if(e)return e.waiting?n(e):void(e.installing?r():e.addEventListener("updatefound",r))}var refreshing;function promptUserToRefresh(e){window.confirm("Updates are available!\nClick OK to refresh")&&e.waiting.postMessage("skipWaiting")}"serviceWorker"in navigator?window.addEventListener("load",function(){navigator.serviceWorker.register("/service-worker.js").then(function(e){listenForWaitingServiceWorker(e,promptUserToRefresh)}).catch(function(e){console.error("[SW] Error during service worker registration: ",e)})}):console.log("Ahh! Your browser does not support Service Workers"),navigator.serviceWorker.addEventListener("controllerchange",function(){refreshing||(refreshing=!0,window.location.reload(!0))}),$("#contact-form").submit(function(e){e.preventDefault();var n=$(this);$.post(n.attr("action"),n.serialize()).then(function(){alert("Your response has been recorded!"),document.getElementById("contact-form").reset()})}),$(function(){var e=function(e){!e;var n=e?"block":"none";$("#search-content").val(""),$(".search-tool").css("display",n)};$("#close-btn").click(function(){e(!1)}),$("#search-btn").click(function(){e(!0)}),$.getJSON("/search.json").done(function(e){0==e.code&&$("#search-content").typeahead({source:e.data,displayText:function(e){return e.title},afterSelect:function(e){window.location.href=e.url}})})});