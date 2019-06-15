if( window.StaticNodeList && !StaticNodeList.prototype.hasOwnProperty ) {
    StaticNodeList.prototype.hasOwnProperty = function hasOwnProperty( obj ) {
      return obj != 'length';
  }
}

(function () {
  var spThumbUl = null;
  var AttributionImage, ContactViewController, GalleryController, MobileMenu, match, namespace, regex, str = "", scriptSrc,
    __slice = Array.prototype.slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  var doc = document;
  var spDocType = doc.doctype;
  var spVer = 1401290566; //version date
  this.ts = doc.getElementsByTagName("script");
  this.isIEBool = /MSIE (\d+\.\d+);/.test(navigator.userAgent) || /Trident/.test(navigator.userAgent);
  this.isFFBool = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent);
  this.isIE7Bool = (/MSIE (\d+\.\d+);/.test(navigator.userAgent) && Number(RegExp.$1) <= 7) ? true : false;
  this.isIE8Bool = (/MSIE (\d+\.\d+);/.test(navigator.userAgent) && Number(RegExp.$1) <= 8) ? true : false;
  this.isIE9Bool = (/MSIE (\d+\.\d+);/.test(navigator.userAgent) && Number(RegExp.$1) >= 9) ? true : false;
  this.spDocHTML5Bool = false;
  if(spDocType){
      var spDocTypeID = spDocType.publicId == null ?  "" : spDocType.publicId.toLowerCase();
      if (spDocTypeID.indexOf("strict") > 0 || spDocTypeID == "" ||  (spDocType.publicId == "" && spDocType.systemId == ""))
          this.spDocHTML5Bool = true;
  }
  this.spOnloadBool = false;
  this.spIframeBool = false;
  this.spResizeIframe = false;
  this.spApiKey = "";
  this.spIframeDoc;
  this.spBaseFontSize = null;
  this.spHideDisplayOptionPhotos = false;
  for(var iCnt = 0;iCnt < this.ts.length;iCnt++){
      scriptSrc = this.ts[iCnt].src;
      if(scriptSrc.indexOf("menus.singleplatform") > 0 || scriptSrc.indexOf("/apps/singlepage/legacy/full-menu.js") > 0 ||
              scriptSrc.indexOf("/businesses/storefront/?apiKey") > 0){
          str = scriptSrc;
          var regex = new RegExp("[\\?&]apiKey=([^&#]*)");
          regex = regex.exec(str);
          if(regex)
              this.spApiKey = regex.length > 0 ? regex[1] : "";
      }
   }

  this.spApiExclusionList = {
    'kvc4bpjczozkz6syd63jrupvj':true,
    'kj60kdn3uqkkqy7hwluk1lf59':true,
    'k7c7vw9s8mqti16eg5h8y6qok':true,
    'cdpd2qoyluep0rphg41a22add':true,
    'k6elf5thfruv3z81dfggfdo96':true,
    'ksch7sukgvj9j0nglk9xxpx4x':true,
    'ksch7sukgvj9j0nglk9xxpx4x.js':true,
    'kpi0uhgqn73wrx5d2vhbgh2n8':true //Menuism
  };
  this.spMenuTemplate = spApiExclusionList[ spApiKey ] ? "1" : "2";

  str = str === "" ?  this.ts[this.ts.length - 1].src : str;
  if (str === "") str = this.ts[this.ts.length - 2].src;
  regex = /^(.*:\/\/.*?)\//;
  match = regex.exec(str);
  this.sp_host_name = match[1];
  this.menuApi = [];
  this.Signal = (function() {
    Signal.registryAlways;
    Signal.registryOnce;
    function Signal() {
      this.registryAlways = [];
      this.registryOnce = [];
    }
    Signal.prototype.connectAlways = function(observer) {
      return this.registryAlways.push(observer);
    };
    Signal.prototype.connectOnce = function(observer) {
      return this.registryOnce.push(observer);
    };
    Signal.prototype.notify = function() {
      var observer, regAlways, regOnce, vars, _i, _j, _len, _len2, _results;
      vars = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      regOnce = this.registryOnce;
      regAlways = this.registryAlways.slice();
      this.registryOnce = [];
      for (_i = 0, _len = regAlways.length; _i < _len; _i++) {
        observer = regAlways[_i];
        observer.apply(null, vars);
      }
      _results = [];
      for (_j = 0, _len2 = regOnce.length; _j < _len2; _j++) {
        observer = regOnce[_j];
        _results.push(observer.apply(null, vars));
      }
      return _results;
    };
    return Signal;
  })();

  namespace = function(target, name, block) {
    var item, top, _i, _len, _ref, _ref2;
    if (arguments.length < 3) {
      _ref = [(typeof exports !== 'undefined' ? exports : window)].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];
    }
    top = target;
    _ref2 = name.split('.');
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      item = _ref2[_i];
      target = target[item] || (target[item] = {});
    }
    return block(target, top);
  };
  if(!String.prototype.trim) {
      String.prototype.trim = function(){
          return this.replace(/^\s+|\s+$/g,'');
      };
  }
  namespace("Util", function(exports) {
    exports.isOn = function(v) {
      var _ref;
      switch (typeof v) {
        case "boolean":
          return v;
        case "number":
          return v >= 1;
        case "object":
          return v !== null;
        case "string":
          return !((_ref = v.toLowerCase()) === "false" || _ref === "off" || _ref === "no" || _ref === "null" || _ref === "nil" || _ref === "");
        case "undefined":
          return false;
        default:
          return false;
      }
    };
    exports.callGoogleAnalytics = function() {
      var e, s, doc;
      doc = document;
      s = doc.createElement('script');
      s.async = true;
      s.src = ('http:' === doc.location.protocol ? 'http://www' : 'https://ssl') + '.google-analytics.com/ga.js';
      e = (doc.getElementsByTagName('script')[0]);
      return e.parentNode.insertBefore(s, e);
    };
  exports.importWedge = function() {
    var script = doc.createElement('script');
    script.async = false;
  script.src = sp_host_name + "/static/js/lib/wedge/wedge-0.0.0.min.js";
        return doc.getElementsByTagName('head')[0].appendChild(script);
  }
    exports.importScript = function(href) {
        var e, s, doc;
        doc = document;
        s = doc.createElement('script');
        s.async = true;
        s.src = href;
        return doc.getElementsByTagName('head')[0].appendChild(s);
    };
    exports.importStylesheets = function(href) {
        var e, s, doc;
        doc = document;
        s = doc.createElement('link');
        s.async = true;
        s.rel  = 'stylesheet';
        s.type = 'text/css';
        s.href = href;
        if (spIframeBool){
            iframeBody = spIframeDoc.body;
            iframeBody.appendChild(s);
        }
        else
            return doc.getElementsByTagName('head')[0].appendChild(s);
    };
    exports.getByClass = function(className) {
      var allElements, el, _i, _len, _results, doc;
      doc = document;
      if (doc.all) {
        allElements = doc.all;
      } else {
        allElements = doc.getElementsByTagName("*");
      }
      _results = [];
      for (_i = 0, _len = allElements.length; _i < _len; _i++) {
        el = allElements[_i];
        if (el.className === className) _results.push(el);
      }
      return _results;
    };
    exports.removeSPClass = function (elem, c) {
        return elem.className=elem.className.replace(c,'').replace('  ',' ').trim();
    };
    exports.addSPClass = function (elem, c) {
        return elem.className=elem.className+=' '+c;
    };
    exports.toggleSPClass = function (elem, addC, removeC) {
        elem.className=elem.className.replace(removeC,'').replace('  ',' ').trim();
        elem.className=elem.className+=' '+addC;
        return elem;
    };
    exports.getPublisherName = function(){
        return document.getElementById("sp_publisher") ? document.getElementById("sp_publisher").innerHTML : '';
    };
    exports.resizeMenu = function(){
        var doc = document;
        var spMainHeight = doc.getElementById("sp_main").offsetHeight;
        var spPhotoHeight = doc.getElementById("sp_photo_cover") ? doc.getElementById("sp_photo_cover").offsetHeight : 0 ;
        var spAnnounceHeight = doc.getElementById("specials_and_events") ? doc.getElementById("specials_and_events").offsetHeight : 0;
        var spMenuDropHeight = doc.getElementById("sp_menu_drop").offsetHeight + 110 + spPhotoHeight + spAnnounceHeight;
        if (spMenuDropHeight > spMainHeight){
            spMenuDropHeight += 20;
            return doc.getElementById("sp_main").style.height = spMenuDropHeight + "px";
        } else
            return doc.getElementById("sp_main").style.height = "100%";
    };
    return exports.getParameterByName = function(name) {
      var regexS, results;
      name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
      regexS = "[\\?&]" + name + "=([^&#]*)";
      regex = new RegExp(regexS);
      results = regex.exec(window.location.href);
      if (results === null) {
        return "";
      } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
      }
    };
  });

  namespace("SPIframe", function(exports) {
       exports.createIframe = function(targetId){
          var doc = document;
          if (doc.getElementById("sp_iframe") === null){
              var spIframe = doc.createElement("iframe");
              spIframe.id = "sp_iframe";
              spIframe.style.width = "100px";
              spIframe.style.minWidth = "100%";
              spIframe.style.height = "500px";
              spIframe.style.border = "none";
              spIframe.frameBorder = "no";
              spIframe.scrolling = "no";
              doc.getElementById(targetId).appendChild(spIframe);
              var spIframeHTML = '<!DOCTYPE html><html><head></head><body><div id="sp_iframe_container" >';
              spIframeHTML += '</div></body></html>'
              spIframeDoc = spIframe.contentDocument || spIframe.contentWindow.document;
              spIframeDoc.open();
              spIframeDoc.write(spIframeHTML);
              spIframeDoc.close();
          }
          return spIframe;
      };
      return exports.resize = function(targetId){
          setTimeout(function(){
              var doc = document;
              if (typeof spIframeDoc == "undefined"){
                  spIframeDoc = window.parent.document.getElementById("sp_iframe");
              }
        if( spIframeDoc ) {
          var iframeHeight = doc.getElementById("sp_main").offsetHeight + 20;
          return spIframeDoc.style.height =  iframeHeight + "px";
        }
          }, 100);
      };
   });

  if (typeof window !== "undefined" && window !== null) {
    window.log = function() {
      if (this.console) return console.log(Array.prototype.slice.call(arguments));
    };
  }

  Util.importWedge();

  this.spRestaurantsApi = (function() {
    spRestaurantsApi.prototype.$ = null;
    function spRestaurantsApi(method, options, nspace) {
      if (!options) options = {};

      var templateName = 'menu2'; //default

      if (options.mobileMenu) {
          templateName = 'menu-mobile';
      }
      else if (options.shortMenu) {
          templateName = 'menu-short';
          spMenuTemplate = menuApi.menuFormatter.menuTemplate = options.menuTemplate = '1';
      }
      else if (options.shortMobileMenu) {
          templateName = 'menu-mobile-short';
      }
      else if (spMenuTemplate == 1 || options.menuTemplate == 1){
          templateName = 'menu';
      }

      var transformUrl = sp_host_name + "/storefront/xsl/" + templateName + ".xsl.js?callback=" + nspace + ".transformCallResponseHandler";

      if (options.menuIntegrate){
          transformUrl += "&menuIntegrate=" + options.menuTemplate;
      }

      this.defaultApiCall(transformUrl, nspace, options);
    }

    var ctr = 0;
    spRestaurantsApi.prototype.defaultApiCall = function(transformFile, nspace, options) {
      var that = this;
      var location = options.location;
      /*
      if (typeof businessView === 'undefined' && ctr < 20){
          return setTimeout((function() {
            ctr++;
            return that.defaultApiCall(transformFile, nspace, options);
          }), 20);
      } // I don't think we need this anymore - Alex S. */
      var done, head, localthis, script, scriptsrc, doc = document;
      script = doc.createElement("script");
      script.type = "text/javascript";
      scriptsrc = sp_host_name + "/storefront/menus/" + location + ".js?callback=" + nspace + ".defaultApiCallResponseHandler&ref=" + Util.getParameterByName('ref');
      if (MenuFormatter.prototype.hideDisplayOptionAnnouncements === false) {
        scriptsrc += "&current_announcement=1";
      }
      if (MenuFormatter.prototype.hideDisplayOptionPhotos === false) {
        scriptsrc += "&photos=1";
      }
      if (options.displayMenu) {
        scriptsrc += "&display_menu=" + options.displayMenu ;
      }
      if (options.menuIntegrate){
          if (options.menuTemplate == 1)
              scriptsrc += "&menuIntegrate=1";
          else
              scriptsrc += "&menuIntegrate=" + encodeURI(options.menuTemplate);
      }
      if (options.shortMenu)
          scriptsrc += "&short=true";
      if (options.draftId)
          scriptsrc += "&draft_id=" + options.draftId;
      else if (options.menuId)
          scriptsrc += "&menu_id=" + options.menuId;
      if (options.previewToken)
          scriptsrc += "&token=" + options.previewToken;
      scriptsrc += "&apiKey=" + spApiKey;
      done = false;
      script.src = scriptsrc;
      head = doc.getElementsByTagName("head")[0] || doc.documentElement;
      localthis = this;
      script.onload = script.onreadystatechange = function() {
        if (!done && (this.readyState === 'loaded' || this.readyState === 'complete' || !this.readyState || (this.readyState === 4 && (this.status === 200 || this.status === 304)))) {
          done = true;
          localthis.getTransform(transformFile);
          if (head && script.parentNode) {
            return head.removeChild(script);
          } else if (!done && (this.readyState === 4 && this.status === 404)) {
            return done = true;
          }
        }
      };
      script.onerror = function() {
        menuApi.defaultApiCallResponseHandler('<?xml version="1.0" encoding="ISO-8859-1"?><storefront><attribution><image>'
        + (location.protocol === 'file:'?'http:':location.protocol)
        + '//a' + (location.protocol === 'https:'?'s':'')
        + '.singleplatform.com/provided_by.png</image><link>http://places.singleplatform.com/menu?ref=FIXME</link></attribution><menus></menus></storefront>');
        return localthis.getTransform(transformFile);
      };
      return head.insertBefore(script, head.firstChild);
    };

    spRestaurantsApi.prototype.getTransform = function(transformFile) {
      var s, doc = document;
      s = doc.createElement("script");
      s.type = "text/javascript";
      s.src = transformFile;
      return doc.getElementsByTagName("head")[0].appendChild(s);
    };
    return spRestaurantsApi;
  })();

  namespace("Conf", function(exports) {
    exports.getQaGaAccount = function() {
      return "UA-24036766-1";
    };
    exports.getProdGaAccount = function() {
      return "UA-18767921-3";
    };
    exports.getMenusHostname = function() {
        return "menus.singleplatform.co";
    };
    return exports.getStaticFileHostname = function() {
        return "static.singleplatform.co";
    };
    return exports.getSecureMenusHostname = function(){
        return "imenus.singleplatform.com";
    };
    return exports.getStaticFileHostname = function(){
        return "static.singleplatform.co";
    }
  });

  ContactViewController = (function() {
    ContactViewController.prototype.hostname = null;
    function ContactViewController(apiKey, locationId, isHidden) {
      this.hideFeedbackForm = __bind(this.hideFeedbackForm, this);
      this.setupSubmitCancel = __bind(this.setupSubmitCancel, this);
      this.setupFooterEdit = __bind(this.setupFooterEdit, this);
      this.hostname = Conf.getMenusHostname();
      this.apiKey = apiKey;
      this.locationId = locationId;
      this.isHidden = isHidden;
    }

    ContactViewController.prototype.run = function() {
      if (this.isHidden === "true") {
        return this.hideFeedbackForm();
      } else {
        this.setupFooterEdit();
        return this.setupSubmitCancel();
      }
    };

    ContactViewController.prototype.clickCancel = function() {
      var countdown, el, elJ, elems, field_type, i, _i, _len,
        doc = document;
      elJ = doc.getElementById("sp_contact");
      elems = elJ.elements;
      countdown = (function() {
        var _ref, _results;
        _results = [];
        for (el = _ref = elems.length - 1; _ref <= 0 ? el <= 0 : el >= 0; _ref <= 0 ? el++ : el--) {
          _results.push(el);
        }
        return _results;
      })();
      for (_i = 0, _len = countdown.length; _i < _len; _i++) {
        i = countdown[_i];
        field_type = elems[i].type;
        if (field_type === "text") {
          elems[i].value = "";
        } else if (field_type === "textarea") {
          elems[i].value = "";
        } else if (field_type === "select-one") {
          elems[i].selectedIndex = 0;
        }
      }
      if (doc.getElementById("sp_arr")) {
        doc.getElementById("sp_contact").style.display = "none";
        doc.getElementById("sp_arr").innerHTML = "&#9654;";
      }
      return false;
    };

    ContactViewController.prototype.clickSubmit = function() {
      var countdown, el, elems, esForm, i, myid, myval, postarray, poststring, xmlhttp, _i, _len
        doc = document;
      esForm = doc.getElementById("sp_contact");
      if (doc.getElementById('sp_stat').selectedIndex < 1) {
        alert('Please set the I am a: field');
        return false;
      }
      myid = doc.getElementById("sp_stat");
      myval = myid.options[myid.selectedIndex].text;
      if (doc.getElementById('sp_sub').selectedIndex < 1) {
        alert('Please set the subject');
        return false;
      }
      postarray = new Array();
      elems = esForm.elements;
      countdown = (function() {
        var _ref, _results;
        _results = [];
        for (el = _ref = elems.length - 1; _ref <= 0 ? el <= 0 : el >= 0; _ref <= 0 ? el++ : el--) {
          _results.push(el);
        }
        return _results;
      })();
      for (_i = 0, _len = countdown.length; _i < _len; _i++) {
        i = countdown[_i];
        postarray.push(elems[i].name + "=" + elems[i].value.substring(0, 1500));
      }
      poststring = postarray.join("&");
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          return alert("Information submitted successfully.");
        }
      };
      xmlhttp.open("POST", sp_host_name + "/" + document.getElementById("sp_cl").value + "/feedback", true);
      xmlhttp.send(poststring);
      return false;
    };

    ContactViewController.prototype.toggleFormVisibility = function() {
      var localArrow, menuContactHolder,
        doc = document;
      localArrow = doc.getElementById("sp_arr");
      menuContactHolder = doc.getElementById("sp_contact");
      if (menuContactHolder.style.display === "none") {
        if (localArrow) localArrow.innerHTML = "&#9660;";
        menuContactHolder.style.display = "block";
        return _gaq.push(['sp._trackEvent', 'Menu', 'Suggest a Change - Open']);
      } else {
        if (localArrow) localArrow.innerHTML = "&#9654;";
        menuContactHolder.style.display = "none";
        return _gaq.push(['sp._trackEvent', 'Menu', 'Suggest a Change - Close']);
      }
    };

    ContactViewController.prototype.setupFooterEdit = function() {
      var el,
        doc = document;
      if (doc.getElementById("sp_ck")) {
        doc.getElementById("sp_ck").value = this.apiKey;
      }
      if (doc.getElementById("sp_cl")) {
        doc.getElementById("sp_cl").value = this.locationId;
      }
      if (doc.getElementById("sp_arr")) {
        doc.getElementById("sp_arr").innerHTML = "&#9654;";
        doc.getElementById("sp_contact").style.display = "none";
      }
      el = doc.getElementById("sp_chg");
      if (el) {
          return el.addEventListener('click', this.toggleFormVisibility, false);
      }
    };

    ContactViewController.prototype.setupSubmitCancel = function() {
      var cancel, locationId, submit;
      locationId = "",
      doc = document;
      if (doc.getElementById("sp_cl")) {
        locationId = doc.getElementById("sp_cl").value;
      }
      submit = doc.getElementById("sp_cs");
      cancel = doc.getElementById("sp_cc");
      if (window.location['href'].indexOf("https" >= 0)) {
        this.hostname = "https://" + this.hostname;
      } else {
        this.hostname = "http://" + this.hostname;
      }
      if (cancel) {
          cancel.addEventListener('click', this.clickCancel, false);
      }
      if (submit) {
          return submit.addEventListener('click', this.clickSubmit, false);
      }
    };

    ContactViewController.prototype.hideFeedbackForm = function() {
      var doc = document;
      var $sp_chg = doc.getElementById("sp_chg");
      var $sp_contact = doc.getElementById("sp_contact");
      if ($sp_chg)
          doc.getElementById("sp_chg").style.display = "none";
      if ($sp_contact)
          doc.getElementById("sp_contact").style.display = "none";
      return;
    };
    return ContactViewController;
  })();

  AttributionImage = (function() {
    function AttributionImage(apiKey) {
        this.apiKey = apiKey ? apiKey : false;
    }
    AttributionImage.prototype.run = function() {
      var at_img, at_link, at_src, doc = document;
      at_link = doc.getElementById("bottom_attribution_image");
      if (at_link) {
        at_src = doc.getElementById("at_src").innerHTML;
        at_img = document.createElement("img");
        at_img.src = at_src; //(location.protocol === 'file:'?'http:':location.protocol) + at_src.substr( 5 );
        return at_link.appendChild(at_img);
      }
    };
  var x=document.getElementsByTagName("body");
  if (x.length > 0){
     if(document.getElementsByTagName("body")[0].className.match(/page_main/)){
    }else{
      return AttributionImage;
    }
  }else{
    return AttributionImage;
  }
  })();

  GalleryController = (function() {
    GalleryController.prototype.current = 0;
    GalleryController.prototype.anim = false;

    function GalleryController(isHidden, menuTemplate, targetId) {
      this.closePop = __bind(this.closePop, this);
      this.slideRight = __bind(this.slideRight, this);
      this.slideLeft = __bind(this.slideLeft, this);
      this.elastislide = __bind(this.elastislide, this);
      this.showTab = __bind(this.showTab, this);
      this.isHidden = isHidden;
      this.menuTemplate = menuTemplate;
      this.targetId = targetId;
      this.menuIntegration = new MenuIntegration(targetId);
    }

    GalleryController.prototype.run = function(args) {
      if (this.isHidden === "true") {} else {
        this.init(args);

        var $body, $closico, $esCarousel, $images, $items, $sp_menu_drop, $menu_drop_icon, $tabsouterouter, $nav_left, $sp_nav_more, $nav_right, $sp_photo_cover_container, $rgGallery, $scrolltabs, $sp_tabs, $thumbul, countdown, el, elJ,
         itemsCount, leftMarg, mya, num, sp_photo_cover_height, sp_photo_cover_width, phototab, tabLeft, tabsW, tabsouterouter, tempHTML, temptabs, totalW, total_tabs, visibleWindow, x, _i, _j, _k, _len, _len2, _len3, doc, hideDisplayOptionsPhotos,
        _this = this,
        doc = document;

        if (doc.getElementById('sp_main')) {
            totalW = doc.getElementById('sp_main').offsetWidth;
        } else {
            totalW = 500;
        }

        $sp_tabs = doc.getElementById('tabsouter');
        if (!$sp_tabs) $sp_tabs = doc.getElementById('tabsouter2');
        $sp_menu_drop = doc.getElementById('sp_menu_drop');
        if ($sp_tabs) {
            elJ = $sp_tabs.getElementsByTagName('li');
            tabsW = 0;
            countdown = (function() {
                var _ref, _results;
                _results = [];
                for (num = _ref = elJ.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
                    _results.push(num);
                }
                return _results;
            })();
            for (_j = 0, _len2 = countdown.length; _j < _len2; _j++) {
                mya = countdown[_j];
                el = $sp_tabs.getElementsByTagName('li')[mya].getElementsByTagName('span')[0];
                if (el) {
                    if (mya > 0) {
                        if (spBaseFontSize != null && spMenuTemplate == "2"){
                            el.style.fontSize = spBaseFontSize;
                            doc.getElementById("menu_drop_down_icon").style.fontSize = spBaseFontSize;
                        }
                        tabsW += (el.offsetWidth) * 1.3 + 64;
                    } else {
                        leftMarg = el.offsetWidth + 4;
                    }
                    if (el.id !== "sp_nav_more") {
                        el.addEventListener('click', function(e) {
                            var showtab;
                            showtab = e.currentTarget.id.replace('tab_', '');
                            if (showtab === 'photos') {
                                _gaq.push(['sp._trackEvent', 'Menu', 'Click', 'Photos Tab']);
                            }
                            return _this.showTab(e.currentTarget);
                        });
                    }
                }
            }
            if ($sp_menu_drop) {
                elJ = $sp_menu_drop.getElementsByTagName('li');
                countdown = (function() {
                    var _ref, _results;
                    _results = [];
                    for (num = _ref = elJ.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
                        _results.push(num);
                    }
                    return _results;
                })();
                for (_k = 0, _len3 = countdown.length; _k < _len3; _k++) {
                    mya = countdown[_k];
                    el = $sp_menu_drop.getElementsByTagName('li')[mya];
                    if (el) {
                        el.addEventListener('click', function(e) {
                            if (typeof e.currentTarget.getElementsByTagName('span')[0] === 'undefined') {
                                _this.showTab(e.currentTarget);
                            } else {
                                _this.showTab(e.currentTarget.getElementsByTagName('span')[0]);
                            }
                            if ($sp_menu_drop) {
                                if (doc.getElementById("sp_more_photos").className == "sp_more_photos_icon")
                            doc.getElementById("tabsouter").className = "borderTop";
                                else
                            doc.getElementById("tabsouter").className = "";
                        return $sp_menu_drop.style.visibility = "hidden";
                            }
                        });
                    }
                }
            }
            var currentTab = doc.querySelector( '#sp_tabs .current' );
            this.showTab(doc.getElementById(currentTab ? currentTab.id : 'tab_menus0'));
            phototab = doc.getElementById('tab_p_cont');
            tabsouterouter = doc.getElementById('tabsouterouter');
            hideDisplayOptionsPhotos =  spHideDisplayOptionPhotos;
            if (phototab && !tabsouterouter) {
                if (phototab.style.display == "" && (hideDisplayOptionsPhotos !== 'true')) {
                    tabLeft = 130;
                } else {
                    tabLeft = 0;
                }
            } else {
                tabLeft = 0;
            }
            if (doc.getElementById('tabsouter')) {
                $scrolltabs = doc.getElementById('sp_tabs');
                $scrolltabs.style.marginLeft = tabLeft + 'px';
                $nav_left = doc.getElementById('nav_left');
                $nav_right = doc.getElementById('nav_right');
                visibleWindow = totalW - (54 + parseFloat($scrolltabs.style.marginLeft));
                if (tabsW > visibleWindow) {
                    total_tabs = doc.getElementById("sp_tabs").getElementsByTagName("span").length - 3;
                    if (doc.getElementById("menu_drop_down_icon") != null){
                        doc.getElementById("menu_drop_down_icon").style.display = "inline-block";
                        doc.getElementById("sp_nav_more").style.display = "inline-block";
                    }
                    doc.getElementById("tab_menus0").style.marginLeft = "0px";
                    if ($nav_left !== null){
                        $nav_left.addEventListener('click', function(e) {
                            var mLeft = parseInt(doc.getElementById("sp_tabs").style.marginLeft);
                            if (doc.getElementById("tab_p_cont").offsetWidth > 0){
                                if (mLeft < 130)
                            doc.getElementById("sp_tabs").style.marginLeft = (mLeft + 130) + "px";
                            } else {
                                if (mLeft < 0)
                            doc.getElementById("sp_tabs").style.marginLeft = (mLeft + 130) + "px";
                            }
                        });
                        $nav_right.addEventListener('click', function(e) {
                            var mLeft = parseInt(doc.getElementById("sp_tabs").style.marginLeft);
                            if (mLeft < tabsW)
                            doc.getElementById("sp_tabs").style.marginLeft = (mLeft - 130) + "px";
                        });
                    }
                    if (doc.getElementById("menu_drop_down_icon") !== null){
                        for (x = 1; 1 <= total_tabs ? x <= total_tabs : x >= total_tabs; 1 <= total_tabs ? x++ : x--) {
                            var thisMenuTab = doc.getElementById('tab_menus' + x);
                            if(thisMenuTab){
                                thisMenuTab.style.display = "none";
                                thisMenuTab.style.border = "none";
                            }
                        }
                    }
                } else {
                    if (doc.getElementById('tab_nav')) {
                        doc.getElementById('tab_nav').style.display = "none";
                    }
                    if ($nav_left) $nav_left.style.display = "none";
                    if ($nav_right) $nav_right.style.display = "none";
                    if (doc.getElementById('sp_tabs')) {
                        doc.getElementById('sp_tabs').style.paddingLeft = "0";
                    }
                }
            }

        }
        //return this.init(document.querySelector('#sp_item_thumb_ul[menu-item-id="8"]'));
      }
    };

    GalleryController.prototype.elastislide = function(options, element) {

      var countdown, elJ, i, num, _i, _j, _len, _len2, doc;
      doc = document;
      this.$el = doc.getElementById('es-carousel-wrapper');
      this.$slider = spThumbUl;
      this.$items = spThumbUl.getElementsByTagName('li');
      this.itemsCount = this.$items.length;
      this.$esCarousel = doc.getElementById('es-carousel');
      this.current = 0;
      this.visibleWidth = 576;
      this.itemW = 116;
      this.sliderW = this.itemW * this.itemsCount;
      this.fitCount = Math.floor(this.visibleWidth / this.itemW);
      this.$slider.style.width = this.sliderW;
      this.$navNext = Util.getByClass("es-nav-next")[0];
      this.$navPrev = Util.getByClass("es-nav-prev")[0];
      this.$el += '<div class="es-nav">' + this.$navPrev + this.$navNext + '</div>';
      elJ = Util.getByClass("es-nav-next");
      if (elJ) {
        countdown = (function() {
          var _ref, _results;
          _results = [];
          for (num = _ref = elJ.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
            _results.push(num);
          }
          return _results;
        })();
        for (_i = 0, _len = countdown.length; _i < _len; _i++) {
          i = countdown[_i];
          if (elJ[i]) {
              elJ[i].addEventListener('click', this.slideRight, false);
          }
        }
      }
      elJ = Util.getByClass("es-nav-prev");
      if (elJ) {
        countdown = (function() {
          var _ref, _results;
          _results = [];
          for (num = _ref = elJ.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
            _results.push(num);
          }
          return _results;
        })();
        for (_j = 0, _len2 = countdown.length; _j < _len2; _j++) {
          i = countdown[_j];
          if (elJ[i]) {
              elJ[i].addEventListener('click', this.slideLeft, false);
          }
        }
      }
      this.$slider.style.display = 'block';
      this.$slider.style.width = '10000px';
      return this.slideToCurrent(false);
    };

    GalleryController.prototype.slide = function(dir, val, anim, callback) {
      var amount, countdown, elJ, fml, i, ml, num, scroll, toscroll, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _m,
      doc = document;
      ml = parseFloat(spThumbUl.style.marginLeft);
      if (val === void 0) {
        amount = this.fitCount * this.itemW;
        if (amount < 0) return false;
        if (dir === 'right' && this.sliderW - (Math.abs(ml) + amount) < this.visibleWidth) {
          amount = this.sliderW - (Math.abs(ml) + this.visibleWidth) - 10;
        } else if (dir === 'left' && Math.abs(ml) - amount < 0) {
          amount = Math.abs(ml);
        } else {
          if (dir === 'right') {
            fml = Math.abs(ml) + 10 + Math.abs(amount);
          } else {
            fml = Math.abs(ml) - 10 - Math.abs(amount);
          }
        }
        toscroll = (this.fitCount * this.itemW) + (this.fitCount * 10);
        if (dir === 'right') {
          if ((ml - toscroll) > (this.sliderW * -1)) {
            val = ml - toscroll;
            scroll = true;
          } else {
            scroll = false;
          }
        } else {
          if (ml + toscroll <= 0) {
            val = ml + toscroll;
            scroll = true;
          } else {
            scroll = false;
          }
        }
      } else {
        scroll = true;
        fml = Math.abs(val);
        if (Math.max(this.sliderW, this.visibleWidth) - fml < this.visibleWidth) {
          val = -(Math.max(this.sliderW, this.visibleWidth) - this.visibleWidth);
          if (val !== 0) val += 10;
          fml = Math.abs(val);
        }
      }
      if (scroll === true) {
        if (val === 0) {
          elJ = Util.getByClass("es-nav-prev");
          countdown = (function() {
            var _ref, _results;
            _results = [];
            for (num = _ref = elJ.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
              _results.push(num);
            }
            return _results;
          })();
          for (_i = 0, _len = countdown.length; _i < _len; _i++) {
            i = countdown[_i];
            if (elJ[i]) elJ[i].style.opacity = .2;
          }
        } else {
          elJ = Util.getByClass("es-nav-prev");
          countdown = (function() {
            var _ref, _results;
            _results = [];
            for (num = _ref = elJ.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
              _results.push(num);
            }
            return _results;
          })();
          for (_j = 0, _len2 = countdown.length; _j < _len2; _j++) {
            i = countdown[_j];
            if (elJ[i]) elJ[i].style.opacity = 1;
          }
        }
        if (((ml - (toscroll * 2)) < (this.itemsCount * this.itemW * -1)) || (this.fitCount > this.itemsCount)) {
          elJ = Util.getByClass("es-nav-next");
          countdown = (function() {
            var _ref, _results;
            _results = [];
            for (num = _ref = elJ.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
              _results.push(num);
            }
            return _results;
          })();
          for (_k = 0, _len3 = countdown.length; _k < _len3; _k++) {
            i = countdown[_k];
            if (elJ[i]) elJ[i].style.opacity = .2;
          }
        } else {
          elJ = Util.getByClass("es-nav-next");
          countdown = (function() {
            var _ref, _results;
            _results = [];
            for (num = _ref = elJ.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
              _results.push(num);
            }
            return _results;
          })();
          for (_l = 0, _len4 = countdown.length; _l < _len4; _l++) {
            i = countdown[_l];
            if (elJ[i]) elJ[i].style.opacity = 1;
          }
        }
        if (dir === "left") {
          elJ = Util.getByClass("es-nav-next");
          countdown = (function() {
            var _ref, _results;
            _results = [];
            for (num = _ref = elJ.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
              _results.push(num);
            }
            return _results;
          })();
          for (_m = 0, _len5 = countdown.length; _m < _len5; _m++) {
            i = countdown[_m];
            if (elJ[i]) elJ[i].style.opacity = 1;
          }
        }
        val += 'px';
        return spThumbUl.style.marginLeft = val;
      }
    };

    GalleryController.prototype.slideToCurrent = function(anim) {
      var amount;
      amount = this.current * this.itemW;
      return this.slide('', -amount, anim);
    };

    GalleryController.prototype.slideLeft = function() {
      return this.slide('left');
    };

    GalleryController.prototype.slideRight = function() {
      return this.slide('right');
    };

    GalleryController.prototype.showImage = function($item) {

      // If iframed, scroll into view; otherwise nothing to scroll, so no check needed.
       var imageWrapper = document.getElementById( 'rg-image-wrapper' );
      setTimeout( function() { imageWrapper.scrollIntoView() }, 0 );

      var $thumbul2, $prevImg, $nextImg, $mainImg, anim, countdown2, el2, largesrc, lefta, mya2, num2, righta, title, _i, _len, photoHTML, $tempParNode,
        doc = document,
        _this = this;
      $thumbul2 = spThumbUl;
      el2 = $thumbul2.getElementsByTagName('a');
      countdown2 = (function() {
        var _ref, _results;
        _results = [];
        for (num2 = _ref = el2.length - 1; _ref <= 0 ? num2 <= 0 : num2 >= 0; _ref <= 0 ? num2++ : num2--) {
          _results.push(num2);
        }
        return _results;
      })();

      for (_i = 0, _len = countdown2.length; _i < _len; _i++) {
        mya2 = countdown2[_i];
        if (el2[mya2]) el2[mya2].className = "";
      }

      doc.getElementById('rg-loading').style.display = "block";
      if ($item) largesrc = $item.getAttribute('data-large');
      if ($item) var tags = $item.getAttribute('tags');
      if ($item) title = $item.getAttribute('alt');
      doc.getElementById('rg-loading').style.display = "none";
      $tempParNode = $item.parentElement.parentElement;
      $prevImg = typeof $tempParNode.previousElementSibling != "undefined" ? $tempParNode.previousElementSibling : $tempParNode.previousSibling;
      $nextImg = typeof $tempParNode.nextElementSibling != "undefined" ? $tempParNode.nextElementSibling : $tempParNode.nextSibling;
      photoHTML = "";
      $mainImg = doc.getElementById('mainimg');

      if ($item && largesrc) {
        doc.getElementById('rg-image').innerHTML = "";
        if($prevImg)
          photoHTML = '<div class="photo_l icon-carrotLeft" id ="photo_l">&nbsp;</div>';
        photoHTML += '<div>';
        photoHTML += '<img id="mainimg" src="' + largesrc + '"/>';
        photoHTML += '<div>';
        photoHTML += '<div style="color: #F1F1F1; font-family: Roboto; line-height: 25px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">';
        photoHTML += title;
        photoHTML += '</div>';
        photoHTML += '<div style="color: #F1F1F1; font-family: Roboto; line-height: 25px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">';
        photoHTML += tags;
        photoHTML += '</div>';
        photoHTML += '</div>';
        photoHTML += '</div>';
        if($nextImg)
          photoHTML += '<div class="photo_r icon-carrotRight" id="photo_r">&nbsp;</div>';
        doc.getElementById('rg-image').innerHTML = photoHTML;
      }
      if (title.indexOf("fs_image") !== -1 && $mainImg.height > 0) {
        var foursqHeight = ($mainImg.height) + ((420 - $mainImg.height) / 2);
        doc.getElementById('rg-image').innerHTML += '<div style="height:420px;width:100%;margin-top:-420px;position:relative;z-index:-2;"><div class="foursq" style="height:' + foursqHeight + 'px;width:' + ($mainImg.width) + 'px;"></div></div>';
      }
      if (title.indexOf("fs_image") !== -1 && $mainImg.height < 1) {
        doc.getElementById('rg-image').innerHTML += '<div style="height:420px;width:100%;margin-top:-420px;position:relative;z-index:-2;"><div class="foursq" style="height:420px;width:420px;"></div></div>';
      }
      _gaq.push(['sp._trackEvent', 'Menu', 'Click', 'Photos']);
      if (doc.getElementById('sp_photos')) {
        doc.getElementById('sp_photos').className = "active";
      }
      var $modalBackdrop = doc.getElementById('modal-backdrop');
      if ($modalBackdrop)
        $modalBackdrop.style.display = "block";

      if($prevImg){
        lefta = doc.getElementById('photo_l');
        lefta.addEventListener('click', function(e) {
          var prev, parNode;
          parNode = Util.getByClass('selected')[0].parentNode;
          prev = typeof parNode.previousElementSibling != "undefined" ? parNode.previousElementSibling : parNode.previousSibling;
          if (prev && prev.nodeType === 3 && /^\s*$/.test(prev.data)) {
            prev = prev.previousSibling;
          }
          if (prev) return prev.getElementsByTagName('a')[0].click();
        });
      }
      if($nextImg){
        righta = doc.getElementById('photo_r');
        righta.addEventListener('click', function(e) {
          var next, parNode;
          parNode = Util.getByClass('selected')[0].parentNode;
          next = typeof parNode.nextElementSibling != "undefined" ? parNode.nextElementSibling : parNode.nextSibling;
          if (next && next.nodeType === 3 && /^\s*$/.test(next.data)) {
            next = next.previousSibling;
          }
          if (next) return next.getElementsByTagName('a')[0].click();
        });
      }
      return anim = false;
    };

    GalleryController.prototype.showTab = function(tab) {
      var $sp_menu_drop, $sp_tabs, $menu_drop_icon, countdown, elJ, mya, num, showpane, showtab, _i, _j, _len, _len2, doc,
        _this = this;
      doc = document;
      $sp_menu_drop = doc.getElementById('sp_menu_drop');
      if ($sp_menu_drop) $sp_menu_drop.style.visibility = "hidden";
      $sp_tabs = doc.getElementById('tabsouter');
      if (!$sp_tabs) $sp_tabs = doc.getElementById('tabsouter2');
      elJ = doc.getElementById('sp_panes').childNodes;
      countdown = (function() {
        var _ref, _results;
        _results = [];
        for (num = _ref = elJ.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
          _results.push(num);
        }
        return _results;
      })();
      for (_i = 0, _len = countdown.length; _i < _len; _i++) {
        mya = countdown[_i];
        if (doc.getElementById('sp_panes').childNodes[mya].style) {
          doc.getElementById('sp_panes').childNodes[mya].style.display = "none";
        }
      }
      elJ = $sp_tabs.getElementsByTagName("span");
      countdown = (function() {
        var _ref, _results;
        _results = [];
        for (num = _ref = elJ.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
          _results.push(num);
        }
        return _results;
      })();
      var $tabsSpan = $sp_tabs.getElementsByTagName("span");
      var navMore = $tabsSpan[0].id == "sp_nav_more" ?  $tabsSpan[0] : $tabsSpan[1];
      $menu_drop_icon = doc.getElementById("menu_drop_down_icon");
      if (navMore.style.display != "inline-block"){
        for (_j = 0, _len2 = countdown.length; _j < _len2; _j++) {
          mya = countdown[_j]
          $tabsSpan[mya].className = "menuNameSpan";
        }
      }
      else{
        for (_j = 0, _len2 = countdown.length; _j < _len2; _j++) {
          mya = countdown[_j]
          $tabsSpan[mya].className = "menuNameSpan";
          if (($tabsSpan[mya].id != "sp_nav_more") && ($tabsSpan[mya].id != "menu_drop_down_icon"))
            $tabsSpan[mya].style.display = "none";
        }
      };
      if ($menu_drop_icon) {
        $menu_drop_icon.className = "icon-expand";

        var $sp_nav_more = doc.getElementById("sp_nav_more");
        if ($sp_nav_more.innerHTML.indexOf('Less') > -1) {
          $sp_nav_more.innerHTML = $sp_nav_more.innerHTML.replace('Less', 'More');
        }
      }
      showtab = tab.id.replace('tab_', '');
      showtab = showtab.replace('_drop', '');
      showpane = 'sp_' + showtab;
      showtab = 'tab_' + showtab;
      doc.getElementById(showpane).style.display = "block";
      doc.getElementById(showtab).className = "current";
      doc.getElementById("sp_main").querySelectorAll("#sp_tabs")[0].className = "sp_tabs";
      if (spMenuTemplate == "2")
        doc.getElementById("tabsouter").querySelectorAll(".sp_navLi")[0].className = "sp_navLi";
      doc.getElementById(showtab).style.display = "block";
      if (showtab === 'photos' && spThumbUl) {
        doc.getElementById("sp_photos").style.display = "block";
        this.showImage(spThumbUl.getElementsByTagName('li')[0].getElementsByTagName('img')[0]);
      }
      if (showtab === 'tab_photos' && spThumbUl) {
        return setTimeout((function() {
          return _this.showImage(spThumbUl.getElementsByTagName('li')[0].getElementsByTagName('img')[0]);
        }), 500);
      }
      else{
        if (spMenuTemplate == "2")
          Util.resizeMenu();
        this.menuIntegration.run(showpane);
      }
    };

    GalleryController.prototype.closePop = function() {
    var selected = Util.getByClass('selected')[0];
    if(selected) selected.className = "";
      var doc = document;
      doc.getElementById('modal-backdrop').style.display = "none";
      doc.getElementById('sp_photos').className = "";
      return spThumbUl.style.marginLeft = "0";
    };

    GalleryController.prototype.init = function( photoSet ) {
      spThumbUl = photoSet || document.getElementById('sp_thumb_ul');

      var $body, $closico, $esCarousel, $images, $items, $sp_menu_drop, $menu_drop_icon, $tabsouterouter, $nav_left, $sp_nav_more, $nav_right, $sp_photo_cover_container, $rgGallery, $scrolltabs, $sp_tabs, $thumbul, countdown, el, elJ,
         itemsCount, leftMarg, mya, num, sp_photo_cover_height, sp_photo_cover_width, phototab, tabLeft, tabsW, tabsouterouter, tempHTML, temptabs, totalW, total_tabs, visibleWindow, x, _i, _j, _k, _len, _len2, _len3, doc, hideDisplayOptionsPhotos,
        _this = this;
      doc = document;
      $sp_photo_cover_container = doc.getElementById("sp_photo_cover_container");

      if ($sp_photo_cover_container){
        $sp_photo_cover_container.onload = function(){
          $sp_photo_cover_container.style.visibility = "visible";
        }
        if (spMenuTemplate == "1"){
          $sp_photo_cover_container.addEventListener('click', function(e) {
            doc.getElementById("tab_photos").click();
          });
        }
      }

      if (doc.getElementById("tabsouter")) {
        if(!doc.getElementById('tab_p_cont')) {
          var newEl = document.createElement('div');
          newEl.innerHTML = '<ul id="tab_p_cont" class="sp_tabs"><li><span class="" id="tab_photos" href="#photos">PHOTOS</span></li></ul>';
          doc.getElementById("tabsouter").insertBefore(newEl.childNodes[0], doc.getElementById("tabsouter").childNodes[0]);
        }
      }
      $rgGallery = doc.getElementById('sp_photos');
      $esCarousel = doc.getElementById('es-carousel-wrapper');
      if ($esCarousel) {
        $items = spThumbUl.getElementsByTagName('li');
        $images = spThumbUl.getElementsByTagName('img');
      }
      if ($rgGallery) tempHTML = $rgGallery.innerHTML;
      if ($items) itemsCount = $items.length;

      if (itemsCount > 0) {
        if(!($rgGallery.querySelectorAll('.rg-image-wrapper').length)) {
          $rgGallery.innerHTML = '<div class="rg-image-wrapper" id="rg-image-wrapper"><span id="close_icon">&nbsp;</span><div class="rg-image" id="rg-image"><img id="mainimg" src=""/></div><div class="rg-loading" id="rg-loading"></div></div>' + tempHTML;
        }
        spThumbUl = photoSet || document.getElementById('sp_thumb_ul');
        //spThumbUl = document.querySelector('#sp_item_thumb_ul[menu-item-id="8"]');
        if ($esCarousel) $esCarousel.style.display = "block";
        $thumbul = spThumbUl;
        $closico = doc.getElementById('close_icon');
        $closico.addEventListener('click', this.closePop, false);

        elJ = $thumbul.getElementsByTagName('a');
        countdown = (function() {
          var _ref, _results;
          _results = [];
          for (num = _ref = elJ.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
            _results.push(num);
          }
          return _results;
        })();

        for (_i = 0, _len = countdown.length; _i < _len; _i++) {
          mya = countdown[_i];
          if ($thumbul.getElementsByTagName('a')[mya]) {
            $thumbul.getElementsByTagName('a')[mya].addEventListener('click', function(e) {
              e.preDefault;
              _this.showImage(e.currentTarget.getElementsByTagName('img')[0]);
              return e.currentTarget.className = "selected";
            });
          }
        }

        this.elastislide('setCurrent', 0);
      } else {
        tempHTML = '<div id="no_out_wrap"><div id="no_wrap"><div id="no_photos">';
        if (doc.getElementById('no_image')) {
          tempHTML += '<img src="' + doc.getElementById('no_image').src + '" id="no_img_photo" />';
        }
        tempHTML += '<div id="no_text_wrapper"><span id="no_text">This location has not uploaded any photos.  Click below to request photos from the owner.</span>';
        tempHTML += '<a id="request_photos" class="request_photos">Request Photos</a></div></div></div></div>';
        if ($rgGallery) $rgGallery.innerHTML = tempHTML;
        if (doc.getElementById('sp_photos')) {
          doc.getElementById('sp_photos').style.height = "436px";
        }
        if (doc.getElementById('request_photos')) {
          doc.getElementById('request_photos').addEventListener('click', function(e) {
            var $request_photos = doc.getElementById('request_photos');
            e.preDefault;
            $request_photos.innerHTML = 'Request Sent';
            $request_photos.className = 'requested_photos';
            return _gaq.push(['sp._trackEvent', 'Menu', 'Click', 'Request Photos']);
          });
        }
      }

    };
    return GalleryController;
  })();

  (function() {})();
  MobileMenu = (function() {
    function MobileMenu() {}
    MobileMenu.prototype.toggleSectionVisibility = function() {
      var nextdisplay;
      nextdisplay = this.nextElementSibling.className;
      if (nextdisplay === "expanded") {
        this.nextElementSibling.className = "collapsed";
        this.childNodes[1].className = "plus";
        return this.childNodes[1].innerHTML = "+";
      } else {
        this.nextElementSibling.className = "expanded";
        this.childNodes[1].className = "minus";
        return this.childNodes[1].innerHTML = "-";
      }
    };

    MobileMenu.prototype.toggleMoreButtonClass = function() {
      var countdown, currentClass, el, multiMenu, num, _i, _j, _len, _len2, _results, _results2, doc;
      doc = document;
      currentClass = doc.getElementById("menu_more").className;
      multiMenu = Util.getByClass("multiple_menu");
      if (currentClass === "more_clicked") {
        doc.getElementById("menu_more").className = "grey_grdnt_buttons";
        doc.getElementById("menu_more").innerHTML = "More +";
        countdown = (function() {
          var _ref, _results;
          _results = [];
          for (num = _ref = multiMenu.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
            _results.push(num);
          }
          return _results;
        })();
        _results = [];
        for (_i = 0, _len = countdown.length; _i < _len; _i++) {
          el = countdown[_i];
          _results.push(multiMenu[el].style.display = "none");
        }
        return _results;
      } else {
        doc.getElementById("menu_more").className = "more_clicked";
        doc.getElementById("menu_more").innerHTML = "More -";
        countdown = (function() {
          var _ref, _results2;
          _results2 = [];
          for (num = _ref = multiMenu.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
            _results2.push(num);
          }
          return _results2;
        })();
        _results2 = [];
        for (_j = 0, _len2 = countdown.length; _j < _len2; _j++) {
          el = countdown[_j];
          _results2.push(multiMenu[el].style.display = "block");
        }
        return _results2;
      }
    };

    MobileMenu.prototype.selectMenu = function(toSelect) {
      var countdown, el, index, menuList, num, _i, _len, doc;
      doc = document;
      index = toSelect.id.replace("nav_", "");
      menuList = Util.getByClass("hstorefront");
      countdown = (function() {
        var _ref, _results;
        _results = [];
        for (num = _ref = menuList.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
          _results.push(num);
        }
        return _results;
      })();
      for (_i = 0, _len = countdown.length; _i < _len; _i++) {
        el = countdown[_i];
        menuList[el].style.display = "none";
      }
      if (menuList[index - 1]) menuList[index - 1].style.display = "block";
      doc.getElementById('menu_name').innerHTML = toSelect.getAttribute("name");
      return doc.getElementById("menu_more").click();
    };

    MobileMenu.prototype.run = function() {
		return;
      var countdown, el, menu_nav, num, plusminus, _i, _j, _len, _len2, _results, doc;
        _this = this;
      doc = document;
      if (doc.getElementById("menu_more")) {
          doc.getElementById("menu_more").addEventListener('click', this.toggleMoreButtonClass);
      }
      plusminus = Util.getByClass("plusminus");
      countdown = (function() {
        var _ref, _results;
        _results = [];
        for (num = _ref = plusminus.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
          _results.push(num);
        }
        return _results;
      })();
      for (_i = 0, _len = countdown.length; _i < _len; _i++) {
        el = countdown[_i];
          plusminus[el].addEventListener('click', this.toggleSectionVisibility);
      }
      menu_nav = Util.getByClass("multiple_menu");
      countdown = (function() {
        var _ref, _results;
        _results = [];
        for (num = _ref = menu_nav.length - 1; _ref <= 0 ? num <= 0 : num >= 0; _ref <= 0 ? num++ : num--) {
          _results.push(num);
        }
        return _results;
      })();
      _results = [];
      for (_j = 0, _len2 = countdown.length; _j < _len2; _j++) {
        el = countdown[_j];
          _results.push(menu_nav[el].addEventListener('click', function(e) {
            return _this.selectMenu(e.currentTarget);
          }));
      }
      return _results;
    };
    return MobileMenu;
  })();


this.GoogleAnalytics = (function() {
    function GoogleAnalytics() {}
    GoogleAnalytics.prototype.run = function(jsonobject, menutype, menuOptions) {
      var e, menupagetype, prevvar, refvar, s, trackview, doc;
      doc = document;
      if (doc.getElementById('singlepage')) {
        menupagetype = "singlepage";
      } else {
        menupagetype = "menusapi";
      }
      s = doc.createElement('script');
      if ((sp_host_name.search(/qaplatform/) > -1) || (sp_host_name.search(/menuplatform/) > -1) || (sp_host_name.search(/localhost/) > -1)) {
        s.text = "var _gaq = _gaq || [];_gaq.push(['sp._setAccount', '" + Conf.getQaGaAccount() + "']);";
      } else {
        s.text = "var _gaq = _gaq || [];_gaq.push(['sp._setAccount', '" + Conf.getProdGaAccount() + "']);";
      }
      if (jsonobject.location_data) {
        s.text += "_gaq.push(['sp._setCustomVar', 1, 'i', '" + jsonobject.location_data.ga_location_id + "']);";
      }
      s.text += "_gaq.push(['sp._setCustomVar', 2, 'n', '"  + jsonobject.location_data.ga_parent_id + "']);";
      s.text += "_gaq.push(['sp._setCustomVar', 3, 'r', '" + Util.getPublisherName() + "']);";
      s.text += "_gaq.push(['sp._setCustomVar', 4, 'uses-iframe', '" + (menuOptions.menuIframe === undefined ? "no" : "yes") + "']);";
      s.text += "_gaq.push(['sp._setCustomVar', 5, 'primary-font', '" + (menuOptions.primaryFontFamily || "") + "']);";

      // Leaving custom 4 and 5 blank for now 1/2/14
      /*
      s.text += "_gaq.push(['sp._setCustomVar', 4, 'd', '" + jsonobject.location_data.ga_location_data + "']);";
      if (typeof email_collection !== 'undefined' && email_collection === 1) {
          local_e = 1;
        } else {
          local_e = 0;
        }
        if (typeof coupon !== 'undefined' && coupon === 1) {
          local_c = 1;
        } else {
          local_c = 0;
        }
        if (typeof transaction !== 'undefined' && transaction === 1) {
          local_t = 1;
        } else {
          local_t = 0;
        }
        if (local_e === 1 && local_c === 0 && local_t === 0) {
          s.text += "_gaq.push(['sp._setCustomVar', 5, 't', 'email only']);";
        } else if (local_e === 1 && local_c === 1 && local_t === 0) {
          s.text += "_gaq.push(['sp._setCustomVar', 5, 't', 'email coupon']);";
        } else if (local_e === 1 && local_t === 1) {
          s.text += "_gaq.push(['sp._setCustomVar', 5, 't', 'email transaction']);";
        } else if (local_e === 0 && local_c === 0 && local_t === 1) {
          s.text += "_gaq.push(['sp._setCustomVar', 5, 't', 'transaction only']);";
        } else {
          s.text += "_gaq.push(['sp._setCustomVar', 5, 't', 'none']);";
      }
      */
      trackview = "_gaq.push(['sp._trackPageview', '" + menutype + "-menu-" + menupagetype + "']);";
      s.text += trackview;
      prevvar = Util.getParameterByName('prev');
      if (prevvar === 'sm') {
        _gaq.push(['sp._trackEvent', 'Short Menu', 'Click', 'View Full Menu']);
      }
      e = (doc.getElementsByTagName('script')[0]);
      e.parentNode.insertBefore(s, e);
      return Util.callGoogleAnalytics();
    };
    return GoogleAnalytics;
  })();

  this.MenuFormatter = (function() {
    function MenuFormatter(targetId) {
        this.targetId = targetId ? targetId : "menusContainer";
    }
    MenuFormatter.prototype.cssOverrides = null;
    MenuFormatter.prototype.primaryBackgroundColor = null;
    MenuFormatter.prototype.secondaryBackgroundColor = null;
    MenuFormatter.prototype.tertiaryBackgroundColor = null;
    MenuFormatter.prototype.primaryFontColor = null;
    MenuFormatter.prototype.primaryFontFamily = null;
    MenuFormatter.prototype.secondaryFontColor = null;
    MenuFormatter.prototype.menuDescBackgroundColor = null;
    MenuFormatter.prototype.menuDescFontColor = null;
    MenuFormatter.prototype.menuDescFontFamily = null;
    MenuFormatter.prototype.sectionTitleBackgroundColor = null;
    MenuFormatter.prototype.sectionTitleFontColor = null;
    MenuFormatter.prototype.sectionTitleFontFamily = null;
    MenuFormatter.prototype.sectionDescBackgroundColor = null;
    MenuFormatter.prototype.menuDropDownBackgroundColor = null;
    MenuFormatter.prototype.sectionDescFontColor = null;
    MenuFormatter.prototype.sectionDescFontFamily = null;
    MenuFormatter.prototype.itemBackgroundColor = null;
    MenuFormatter.prototype.itemTitleFontColor = null;
    MenuFormatter.prototype.itemTitleFontFamily = null;
    MenuFormatter.prototype.itemDescFontColor = null;
    MenuFormatter.prototype.itemDescFontFamily = null;
    MenuFormatter.prototype.itemPriceFontColor = null;
    MenuFormatter.prototype.itemPriceFontFamily = null;
    MenuFormatter.prototype.feedbackFontFamily = null;
    MenuFormatter.prototype.feedbackFontColor = null;
    MenuFormatter.prototype.feedbackBackgroundColor = null;
    MenuFormatter.prototype.feedbackFieldBackgroundColor = null;
    MenuFormatter.prototype.feedbackSubmitBackgroundColor = null;
    MenuFormatter.prototype.feedbackCancelBackgroundColor = null;
    MenuFormatter.prototype.feedbackSubmitFontColor = null;
    MenuFormatter.prototype.feedbackCancelFontColor = null;
    MenuFormatter.prototype.feedbackSubmitFontFamily = null;
    MenuFormatter.prototype.feedbackCancelFontFamily = null;
    MenuFormatter.prototype.feedbackFieldFontColor = null;
    MenuFormatter.prototype.feedbackFieldFontFamily = null;
    MenuFormatter.prototype.displayMenuismCTA = null;
    MenuFormatter.prototype.entireMenuClickable = null;
    MenuFormatter.prototype.horizontalRuleColor = null;
    MenuFormatter.prototype.baseFontSize = null;
    MenuFormatter.prototype.fontCasing = null;
    MenuFormatter.prototype.attributionImageLink = null;
    MenuFormatter.prototype.hideDisplayOptionAnnouncements = false;
    MenuFormatter.prototype.hideDisplayOptionAttribution = false;
    MenuFormatter.prototype.hideDisplayOptionThumbs = false;
    MenuFormatter.prototype.hideDisplayOptionPhotos = false;
    MenuFormatter.prototype.hideDisplayOptionPrice = false;
    MenuFormatter.prototype.hideDisplayOptionFeedback = false;
    MenuFormatter.prototype.hideDisplayOptionDisclaimer = false;
    MenuFormatter.prototype.hideDisplayOptionClaim = false;
    MenuFormatter.prototype.hideDisplayOptionDollarSign = false;
    MenuFormatter.prototype.menuTemplate = window.spMenuTemplate;
    MenuFormatter.prototype.displayMenu = false;

    MenuFormatter.prototype.assignStyles = function(element) {
      var localElem, stylestring, e, s, mTemp;
      var doc = document;
      var thisTargetID = targetId ? targetId : this.targetId;
      if (spIframeBool){
          thisTargetID = "sp_main";
      }
      mTemp = this.menuTemplate;
      localElem = doc.getElementById(element);
      if (this.cssOverrides !== null) return;
      stylestring = "";
      if (this.hideDisplayOptionPrice === 'true') {
        stylestring += "#sp_main .multiPrice, #sp_main ul.single, #sp_main .sp_mobile_display, #sp_main .sp_option ul.sp_priceLine, #sp_main .detailsDiv .item_addon_container ul.sp_priceLine {display:none !important;} #sp_main .sp_menu .sp_it{width:100%}";
      }
      if (this.hideDisplayOptionDisclaimer === 'true') {
        stylestring += "#sp_main .sp_dw{display:none}";
      }
      if (this.hideDisplayOptionClaim === 'true') {
          stylestring += "#sp_main .manage_this_location,#sp_main #manage_top{display:none}";
      }
      if (this.hideDisplayOptionDollarSign === "true") {
          stylestring += "#sp_main .sp_dollar_sign, #sp_main .sp_euro_sign{display:none !important;}";
      }
      if (this.hideDisplayOptionAnnouncements === "true") {
          stylestring += "#sp_main #specials_and_events{display:none !important;}";
      }
      if (this.hideDisplayOptionAttribution === "true") {
          stylestring += "#sp_main #bottom_attribution_image{display:none !important;}";
      }
      if(mTemp == 2){
          var tertFontColor;
          if (this.tertiaryFontColor){
             tertFontColor = this.tertiaryFontColor;
          } else if(this.itemTitleFontColor){
              tertFontColor = this.itemTitleFontColor;
          } else if(this.itemDescFontColor){
              tertFontColor = this.itemDescFontColor;
          } else if(this.itemPriceFontColor){
              tertFontColor = this.itemPriceFontColor;
          } else{tertFontColor = null;}
           if (isIEBool){
              stylestring += "#sp_main .icon-spice{margin-right:5px;}";
           }
           if (this.hideDisplayOptionPhotos === 'true') {
              stylestring += "#sp_main #sp_photo_cover, #sp_main #sp_more_photos{display:none}\n";
             // stylestring += "#sp_main .sp_tabs{padding-top:0px !important}\n";
           } else{
               stylestring += "#sp_main #sp_photo_cover{display:block !important;}";
               stylestring += "#sp_main #sp_more_photos{display:block;}"
           }
           if((this.hideDisplayOptionPhotos === 'true' && this.hideDisplayOptionAnnouncements === 'true') ||
                   (this.hideDisplayOptionPhotos === 'true' && doc.getElementById("specials_and_events") == null)){
               stylestring += "#sp_main #tabsouterouter{border-top:20px solid #D9D9D9;}";
           }
           if(this.itemDescFontColor){
               stylestring += "#sp_main .hproduct .sp_description,#sp_main .hproduct .detailsDiv {color:" + this.itemDescFontColor + " !important;}";
           }
           if(this.itemTitleFontColor){
               stylestring += "#sp_main .sp_option span.addon_title, #sp_main .detailsDiv .item_addon_container,"
               stylestring += "#sp_main .span_leaders, #sp_main .sp_priceUnit,";
               stylestring += "#sp_main .hstorefrontproduct .fn,";
               stylestring += "#sp_main .sp_option ul.sp_priceLine:before{color:"+ this.itemTitleFontColor + " !important;}";
           }
           if(this.itemPriceFontColor){
               stylestring += "#sp_main .sp_price{color:" + this.itemPriceFontColor + " !important;}";
           }
           if (this.menuDescFontColor){
               stylestring += "#sp_main .sp_md{color:" + this.menuDescFontColor + " !important;}\n";
           }
           if (this.sectionTitleFontColor){
               stylestring += "#sp_main .sp_st,#sp_main .sub_copy_title{color:" + this.sectionTitleFontColor + " !important;}\n";
           }
           if (this.sectionDescFontColor){
               stylestring += "#sp_main .sp_menu .sp_sd{color:" + this.sectionDescFontColor + " !important;}\n";
           }
           if (this.primaryBackgroundColor){
               stylestring += "#sp_main .sp_mt, #sp_main .sp_mf{background-color:" + this.primaryBackgroundColor + " !important}\n";
               stylestring += "#sp_main #sp_nophotos.no_announce,#sp_main .sp_main, #sp_main #sp_foot #sp_contact #sp_cs, #sp_main #tabsouterouter{border-color:" + this.primaryBackgroundColor + "}\n";
               stylestring += "#sp_main .sp_menu, #sp_main #tabsouter, #sp_main #tabsouter.borderTop, #sp_main #specials_and_events{border-color:" +  this.primaryBackgroundColor + " !important;}";
               stylestring += "@media screen and (max-width: 500px) {#sp_main ul.sp_tabs, #sp_main .sp_tabs .t_first,#sp_main .sp_md, #sp_main .sp_tabs .sp_menus_li  {background-color:" +  this.primaryBackgroundColor + " !important;} }";
               stylestring += "@media screen and (min-width: 501px) {#sp_main ul.sp_tabs,  #sp_main .sp_tabs .t_first, #sp_main .sp_md{background: none !important;} }";
           }
           if (this.tertiaryBackgroundColor){
               stylestring += "#sp_main #tabsouterouter{background-color:" + this.tertiaryBackgroundColor + "}\n";
            }
           if (this.secondaryBackgroundColor){
               stylestring += "#sp_main .sp_st.fn{background-color:" + this.secondaryBackgroundColor + " !important;}\n";
            }
           if (this.sectionTitleBackgroundColor){
               stylestring += "#sp_main #sp_menu_drop .sp_menu_drop_down:hover,#sp_main #sp_menu_drop .sp_menu_drop_down .selectedMenu, #sp_main .sp_st.fn {background-color:";
               stylestring += this.sectionTitleBackgroundColor + ";}\n";
               stylestring += "@media screen and (max-width: 500px) {#sp_main ul.tabs_mobile, #sp_main .sp_tabs li.sp_navLi, #sp_main .menu_drop_mobile ul.sp_tabs{background-color:" +this.sectionTitleBackgroundColor + " !important;}}\n";
            }
           if(this.sectionTitleFontColor){
               stylestring += "#sp_main .sp_st.fn{color:" + this.sectionTitleFontColor + " !important;}\n";
           }
           if (this.primaryFontFamily){
               stylestring += "#sp_main .sp_menu,#sp_main .hproduct .fn, #sp_main .hproduct .sp_details, #sp_main .hproduct .sp_description,#sp_main #sp_menu_drop ul li.sp_menu_drop_down,";
               stylestring += "#sp_main #sp_foot #sp_contact textarea, #sp_main #sp_foot #sp_contact input,#sp_main #specials_and_events,#sp_main .hproduct .detailsDiv,";
               stylestring += "#sp_main #sp_foot #sp_contact select, #sp_main .es-nav, #sp_main #manage_top .sub_text, #sp_main #sp_foot .sp_dw,#sp_main #specials_and_events .sub_text,";
               stylestring += "sp_main #sp_menu_drop, #sp_main #tabsouterouter, #sp_main #specials_and_events, #sp_main #specials_and_events .sub_text, #sp_main #specials_and_events #sp_announcement, #sp_main #manage_top #sp_announcement{font-family:" + this.primaryFontFamily + " !important;}\n";
            }
           if (this.primaryFontColor){
               stylestring += "#sp_main #sp_announcement, #sp_main #manage_top, #sp_menu_drop .sp_menu_drop_down:hover,#sp_main .hproduct .detailsDiv,";
               stylestring += "#sp_menu_drop .sp_menu_drop_down .selectedMenu, #sp_main .hproduct .fn, #sp_main .sp_mt,#sp_main .sp_mf,#sp_main #specials_and_events,#sp_main .icon-camera, #sp_main #sp_more_photos .icon-carrotRight,";
               stylestring += "#sp_main .hproduct .sp_details,#sp_main .sp_md, #sp_main .sp_price,#sp_main #sp_menu_drop ul li.sp_menu_drop_down:hover, #sp_main .mobileExpandItem{color:";
               stylestring += this.primaryFontColor + ";}\n";
            }
           if (this.secondaryFontColor){
               stylestring += "#sp_main .sp_tabs span, #sp_main #specials_and_events .sub_text, #sp_main .hproduct .sp_description, ul.leaders li:after,";
               stylestring += "#sp_main .sp_option ul, #sp_main .sp_tabs span#menu_drop_down_icon,#sp_main #sp_menu_drop ul li.sp_menu_drop_down{color:";
               stylestring +=  this.secondaryFontColor + " !important;}\n";
               stylestring += "#sp_main #specials_and_events #sp_announcement, #sp_main .sp_tabs span{border-color:" + this.secondaryFontColor + ";}\n";
           }
           if (this.itemBackgroundColor){
               stylestring += "#sp_main .span_leaders, #sp_main .f_right span,";
               stylestring += "#sp_main .sp_menu_mason,ul.leaders span:first-child, #sp_main .sp_menu.hstorefrontcategory, #sp_main .sp_option ul.sp_priceLine,#sp_main #tabsouterouter,";
               stylestring += "#sp_main #specials_and_events,#sp_main #specials_and_events, #sp_main .sp_tabs li.sp_navLi.navLi_mobile span#sp_nav_more, #sp_main .sp_menu .sp_sd{background-color:";
               stylestring += this.itemBackgroundColor + ";}\n";
               stylestring += "#sp_main .sp_option ul.sp_priceLine span,";
               stylestring += "#sp_main .sp_option .leaders, #sp_main .detailsDiv .item_addon_container,";
               stylestring += "#sp_main .sp_option ul.sp_option_ul span, #sp_main .sp_option ul.sp_priceLine span, #sp_main .detailsDiv .item_addon_container ul.sp_priceLine span,";
               stylestring += "#sp_main .sp_tabs, #sp_main .sp_tabs li, #sp_main #specials_and_events,#sp_main #specials_and_events{background-color:";
               stylestring += this.itemBackgroundColor + " !important;}\n";
               stylestring += "#sp_main #specials_and_events{border-color:"+ this.itemBackgroundColor + " !important}\n";
               if(!this.menuDropDownBackgroundColor || this.menuDropDownBackgroundColor == null) {
                   stylestring += "#sp_main #sp_menu_drop{background-color:" + this.itemBackgroundColor + " !important;}\n";
               }
           }
           if (this.tertiaryBackgroundColor){
               stylestring += "#sp_main .sp_menu_mason,ul.leaders span:first-child, #sp_main .sp_menu.hstorefrontcategory, #sp_main .sp_option ul.sp_priceLine,";
               stylestring += "#sp_main .sp_tabs, #sp_main .sp_tabs li, #sp_main #specials_and_events,#sp_main #sp_menu_drop,#sp_main #specials_and_events{background-color:" + this.itemBackgroundColor + "}\n";
               stylestring += "#sp_main #specials_and_events{border-color:"+ this.itemBackgroundColor + " !important}\n";

           }
           if (!this.menuDropDownBackgroundColor) {
               if( this.itemBackgroundColor && this.itemBackgroundColor !== 'transparent' ) this.menuDropDownBackgroundColor = this.itemBackgroundColor;
               else {
                   var opts = this;

                   // Dropdown color override will attempt to get the actual menu background color after it renders
                   if( window.innerWidth > 500 ) {
                       setTimeout( function() {
                           var accessibleBackgroundColor = window.getComputedStyle( document.querySelector("#sp_main .sp_menu"), null).backgroundColor;
                           if( !accessibleBackgroundColor || accessibleBackgroundColor === 'transparent' || accessibleBackgroundColor === 'rgba(0, 0, 0, 0)' ) {
                               accessibleBackgroundColor = window.getComputedStyle( document.body ).backgroundColor;
                           }
                           if( accessibleBackgroundColor && accessibleBackgroundColor !== 'transparent' && accessibleBackgroundColor !== 'rgba(0, 0, 0, 0)' ) {
                               document.querySelector( "#sp_menu_drop" ).style.setProperty( 'background-color', accessibleBackgroundColor, 'important' );
                           }
                       }, 500 );
                   }
                   if( this.primaryBackgroundColor && this.primaryBackgroundColor !== 'transparent' ) this.menuDropDownBackgroundColor = this.primaryBackgroundColor;
                   else if( this.secondaryBackgroundColor && this.secondaryBackgroundColor !== 'transparent' ) this.menuDropDownBackgroundColor = this.secondaryBackgroundColor;
                   else if( this.tertiaryBackgroundColor && this.tertiaryBackgroundColor !== 'transparent' ) this.menuDropDownBackgroundColor = this.tertiaryBackgroundColor;
                   else if( this.sectionTitleBackgroundColor && this.sectionTitleBackgroundColor !== 'transparent' ) this.menuDropDownBackgroundColor = this.sectionTitleBackgroundColor;
                   else if( this.itemBackgroundColor === 'transparent' ) this.menuDropDownBackgroundColor = '#888888';
               }

           }
           if(this.menuDropDownBackgroundColor){
               stylestring += "#sp_main #sp_menu_drop{background-color:" + this.menuDropDownBackgroundColor + " !important}\n";
           }
           if (tertFontColor){
               stylestring += "#sp_main .span_leaders, ul.leaders li:after, #sp_main .sp_menu .sp_sd, #sp_main .sp_tabs span, #sp_main .hproduct .sp_description, #sp_main #specials_and_events .sub_text,";
               stylestring += "#sp_main .sp_tabs span#sp_nav_more,#sp_main .hproduct .detailsDiv, #sp_main .sp_tabs span#menu_drop_down_icon, #sp_main #sp_menu_drop{color:" + tertFontColor + ";}\n";
               stylestring += "#sp_main .sp_tabs span,#sp_main .hr, #sp_main #specials_and_events #sp_announcement, #sp_main .mobileExpandItem, #sp_main .mobileExpandItem.icon-expand,";
               stylestring += "#sp_main .menuItemClosure,#sp_main .mobileExpandItem.icon-collapse,#sp_main .hstorefrontproduct.hproduct, #sp_main .sp_st.fn, #sp_main .sp_st.fn:first-child, #sp_main .sp_md{border-color:" + tertFontColor + " !important;}\n";
               stylestring += "#sp_main .spheaderContainer{border-bottom-color:" + tertFontColor + " !important;}\n";
               stylestring += "#sp_main .menuItemClosure{opacity:.5}";
           }
           if (this.baseFontSize){
               stylestring += "#sp_main .sp_menu, #sp_main .sp_md, #sp_main .sp_option, #sp_main #sp_foot #sp_contact textarea, #sp_main #sp_foot #sp_contact input,#sp_main #sp_menu_drop ul li.sp_menu_drop_down,";
               stylestring += "#sp_main #sp_foot #sp_contact select, #sp_main #sp_foot .sp_dw,#sp_main #specials_and_events .sub_text, #sp_main #sp_announcement,#sp_main #specials_and_events .sub_text,";
               stylestring += "#sp_main .sp_option ul li,#sp_main .sp_more_photos_icon{font-size:" + this.baseFontSize + " !important;}\n";
               var baseFontSize = parseInt(this.baseFontSize);
               if(typeof baseFontSize == 'number'){
                   var marginTop = (baseFontSize * 1.6) - 2;
                   var marginBottom = baseFontSize/2;
                   stylestring += "#sp_main .hproduct .sp_details{margin-bottom:" + marginBottom + "px !important}\n";
               }
               stylestring += "@media screen and (max-device-width: 640px) {#sp_main .sp_menu, #sp_main .sp_md, #sp_main .sp_option, #sp_main #sp_foot #sp_contact textarea, #sp_main #sp_foot #sp_contact input,#sp_main #sp_menu_drop ul li.sp_menu_drop_down,";
               stylestring += "#sp_main #sp_foot #sp_contact select, #sp_main #sp_foot .sp_dw,#sp_main #specials_and_events .sub_text, #sp_main #sp_announcement,#sp_main #specials_and_events .sub_text,";
               stylestring += "#sp_main .sp_option ul li,#sp_main .sp_more_photos_icon{font-size: 1em !important;}\n";
               stylestring += "#sp_main .hproduct .sp_details{margin-bottom: 1em !important}}\n";
           }
           if (this.fontCasing){
               stylestring += "#sp_main .hproduct .fn,#sp_main .sp_description,#sp_main .hproduct .detailsDiv{text-transform:" + this.fontCasing + " !important;}\n";
           }
      }
      else{
          if (isIE8Bool && spIframeBool){
            //  stylestring += "#sp_main #sp_tabs li{width:50px !important;}";
          }
          if (this.displayMenuismCTA === "true") {
              stylestring += "#menuism_cta{display:block !important;}#manage_top{display:none !important;}";
          }
          if (this.hideDisplayOptionPhotos === 'true') {
             stylestring += "#sp_main #tab_photos, #sp_main #tab_p_cont, #sp_main #sp_photos{display:none;}";
              stylestring += "#sp_main #tabsouter{margin-left:-4px}";
          }
          if (this.primaryBackgroundColor){
             stylestring += "#sp_main .sp_mt.sp_pb, #sp_main .sp_mf.sp_pb,#sp_main .sp_mt, #sp_main .sp_md, #sp_main .rg-image-wrapper,";
             stylestring += "#sp_main .sp_tabs .current,#sp_main .sp_tabs .current:hover,#sp_main .es-carousel-wrapper{background-color:" + this.primaryBackgroundColor + " !important;}\n";
             stylestring += "#sp_main .sp_menu{border-color:" + this.primaryBackgroundColor + " !important;}\n";
             stylestring += "#sp_main #sp_contact, #sp_main #sp_contact_submit{border:1px solid " + this.primaryBackgroundColor + " !important;}\n";
             stylestring += "#sp_main .hstorefrontproduct{border-top:1px solid " + this.primaryBackgroundColor + " !important;}\n";
          }
          if (this.secondaryBackgroundColor){
              stylestring += "#sp_main .sp_sb,#sp_main .sp_menu.hstorefrontcategory, #sp_main #sp_foot{background-color:" + this.secondaryBackgroundColor + " !important;}\n";
          }
          if (this.sectionTitleBackgroundColor){
             stylestring += "#sp_main .sp_st, #sp_main #specials_and_events, #sp_main .tab_span, #sp_main #specials_and_events,";
             stylestring += "#sp_main #tab_nav_li, #sp_main #sp_announcement, #sp_main .sp_st, #sp_main .sp_sd{background-color:" + this.sectionTitleBackgroundColor + " !important;}\n";
          }
          if (this.sectionTitleFontColor){
              stylestring += "#sp_main .sp_st,#sp_main .sub_copy_title,#sp_main .sub_text{color:" + this.sectionTitleFontColor + " !important;}\n";
          }
          if (this.sectionTitleFontFamily){
              stylestring += "#sp_main .sp_st,#sp_main .sub_copy_title,#sp_main .sub_text{font-family:" + this.sectionTitleFontFamily + " !important;}\n";
          }
          if (this.sectionDescBackgroundColor){
              stylestring += "#sp_main .sp_sd,#sp_main .sp_tabs span,#sp_main #tab_nav li{background-color:" + this.sectionDescBackgroundColor + " !important;}\n";
          }
          if (this.sectionDescFontColor){
              stylestring += "#sp_main .sp_sd{color:" + this.sectionDescFontColor + " !important;}\n";
          }
          if (this.sectionDescFontFamily){
              stylestring += "#sp_main .sp_sd{font-family:" + this.sectionDescFontFamily + " !important;}\n";
          }
          if (this.menuDescBackgroundColor){
              stylestring += "#sp_main .sp_md{background-color:" + this.menuDescBackgroundColor + " !important;}\n";
          }
          if (this.menuDescFontColor){
              stylestring += "#sp_main .sp_md{color:" + this.menuDescFontColor + " !important;}\n";
          }
          if (this.menuDescFontFamily){
              stylestring += "#sp_main .sp_md{font-family:" + this.menuDescFontFamily + " !important;}\n";
          }
          if (this.itemBackgroundColor){
              stylestring += "#sp_main .sp_i,#sp_main .sp_i ul,#sp_main .sp_menu{background-color:" + this.itemBackgroundColor + " !important;}\n";
          }
          if (this.primaryFontColor){
              stylestring += "#sp_main .sp_pf,#sp_main .sp_pb,#sp_main .tab_span, #sp_main .sp_mt, #sp_main #tab_nav_li,#sp_main .sp_tabs span{color:";
              stylestring += this.primaryFontColor + " !important;}\n";
          }
          if (this.primaryFontFamily){
              stylestring += "#sp_main .sp_pf,#sp_main .sp_pb,#sp_main .tab_span, #sp_main .sp_it,#sp_main .sp_menu,#sp_main #sp_foot .sp_dw,#sp_main #specials_and_events .sub_text,";
              stylestring += "#sp_main .sp_tabs span.menuNameSpan, #sp_main .sp_tabs .current,#sp_main #specials_and_events #sp_announcement{font-family:";
              stylestring += this.primaryFontFamily +  " !important}\n";
          }
          if (this.baseFontSize){
              stylestring += "#sp_main .sub_copy_title,#sp_main .sub_text, #sp_main .sp_it .fn, #sp_main .sp_description,#sp_main #sp_top_links, ";
              stylestring += "#sp_main .sp_menu,#sp_main #sp_foot .sp_dw,#sp_main .sp_details{font-size:" + this.baseFontSize + " !important;}\n";
          }
          if (this.fontCasing){
              stylestring += "#sp_main .sp_it .fn, #sp_main .sp_description{text-transform:" + this.fontCasing + " !important;}\n";
          }
          if (this.itemTitleFontColor){
              stylestring += "#sp_main .sp_it .fn,#sp_main .sp_option p{color:" + this.itemTitleFontColor + " !important;}\n";
          }
          if (this.itemTitleFontFamily){
              stylestring += "#sp_main .sp_it .fn{font-family:" + this.itemTitleFontFamily + " !important;}\n";
          }
          if (this.itemDescFontColor){
              stylestring += "#sp_main .sp_description, #sp_main .sp_details{color:" + this.itemDescFontColor + " !important;}\n";
          }
          if (this.itemDescFontFamily){
              stylestring += "#sp_main .sp_description{font-family:" + this.itemDescFontFamily + " !important;}\n";
          }
          if (this.itemPriceFontColor){
              stylestring += "#sp_main .sp_price,#sp_main .sp_itemPriceFont{color:" + this.itemPriceFontColor + " !important;}\n";
          }
          if (this.itemPriceFontFamily){
              stylestring += "#sp_main .sp_price,#sp_main .sp_itemPriceFont{font-family:" + this.itemPriceFontFamily + " !important;}\n";
          }
          if (this.feedbackBackgroundColor){
              stylestring += "#sp_main #sp_contact{background-color:" + this.feedbackBackgroundColor + " !important;}\n";
          }
          if (this.feedbackBackgroundColor){
              stylestring += "#sp_main #sp_contact{background-color:" + this.feedbackBackgroundColor + " !important;}\n";
          }
      }
      s = document.createElement('style');
      s.type = "text/css";
      if(s.styleSheet){
          s.styleSheet.cssText = stylestring;
      }else{
          s.appendChild(document.createTextNode(stylestring));
      }
      return doc.getElementById(thisTargetID).appendChild(s);
    };

    MenuFormatter.prototype.setCssOverrides = function() {
      var css;
      css = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.cssOverrides = css;
    };
    return MenuFormatter;
  })();

  this.MenusApi = (function() {
    MenusApi.prototype.apiKey = null;
    MenusApi.prototype.menusHostname = null;
    MenusApi.prototype.staticHostname = null;
    MenusApi.prototype.menuFormatter = null;
    MenusApi.prototype.idForBlankLocation = null;
    MenusApi.prototype.attributionImageLink = null;

    function MenusApi(apiKey, ns, targetId) {
      if (ns == null) ns = "menuApi";
      if (typeof options != "undefined")
          this.menuTemplate = options["MenuTemplate"];
      else{
          this.menuTemplate = window.spMenuTemplate;
          this.options = {};
          this.options.menuTemplate = window.spMenuTemplate;
      }
      this.apiKey = apiKey;
      spApiKey = apiKey;
      this.menusHostname = Conf.getMenusHostname();
      this.staticHostname = Conf.getStaticFileHostname();
      this.menuFormatter = new MenuFormatter(targetId);
      this.idForBlankLocation = "gghhwet2b2ing23223siwl";
      this.attributionImageLink = true;
      this.targetId = targetId ? targetId : "menusContainer";
      this.galleryController = new GalleryController(false, this.menuTemplate, this.targetId);
      this.locationId = null;
      this.options = null;
      this.fullMenuCallback = null;
      this.xml = null;
      this.xsl = null;
      this.json = null;
      this.draftId = null;
      this.menuId = null;
      this.previewToken = null;
      this.ns = ns;
      menuApi = this;
    }

    MenusApi.prototype.loadMenusForLocation = function(locationId, targetId, menuIntegrate, menuTemplate, displayMenu) {
      this.targetId = targetId;
      this.locationId = locationId;
      this.menuIntegrate = menuIntegrate ? menuIntegrate : false;
      this.menuTemplate = menuTemplate ? menuTemplate : false;
      this.displayMenu = displayMenu ? displayMenu : false;

      this.options = {
        use_host: true,
        location: locationId,
        menuTemplate: this.menuTemplate,
        menuIntegrate: this.menuIntegrate,
        targetId: this.targetId,
        displayMenu: this.displayMenu,
        draftId: this.draftId,
        menuId: this.menuId,
        previewToken: this.previewToken
      };

      if (!locationId || locationId.length < 1) {
        this.options['blankMenu'] = true;
      } else {
        this.options['menu'] = true;
      }
      return new spRestaurantsApi("GET", this.options, this.ns);
    };

    MenusApi.prototype.loadMobileMenusForLocation = function(locationId, targetId) {
      /* Todo: fix this copypasta */
      this.targetId = targetId;
      this.locationId = locationId;
      this.menuIntegrate = false;
      this.menuTemplate = false;
      this.displayMenu = false;
      if (!locationId || locationId.length < 1) {
        this.options = {
          use_host: true,
          location: locationId,
          blankMenu: true,
          menuTemplate: this.menuTemplate,
          menuIntegrate: this.menuIntegrate,
          targetId: this.targetId,
          displayMenu: this.displayMenu
        };
      } else {
        this.options = {
          use_host: true,
          location: locationId,
          menu: true,
          menuTemplate: this.menuTemplate,
          menuIntegrate: this.menuIntegrate,
          targetId: this.targetId,
          displayMenu: this.displayMenu
        };
      }
      return new spRestaurantsApi("GET", this.options, this.ns);
    };

    MenusApi.prototype.loadMobileShortMenusForLocation =  function(locationId, targetId, menuIntegrate, menuTemplate, displayMenu) {
        this.targetId = targetId;
        this.locationId = locationId;
        this.menuIntegrate = menuIntegrate ? menuIntegrate : false;
        this.menuTemplate = menuTemplate ? menuTemplate : false;
        this.displayMenu = displayMenu ? displayMenu : false;
        if (!locationId || locationId.length < 1) {
            this.options = {
                use_host: true,
                location: locationId,
                blankMenu: true,
                menuTemplate: this.menuTemplate,
                menuIntegrate: this.menuIntegrate,
                targetId: this.targetId,
                displayMenu: this.displayMenu,
                shortMobileMenu: true
            };
        } else {
            this.options = {
                use_host: true,
                location: locationId,
                menu: true,
                menuTemplate: this.menuTemplate,
                menuIntegrate: this.menuIntegrate,
                targetId: this.targetId,
                displayMenu: this.displayMenu,
                shortMobileMenu: true
            };
        }
        return new spRestaurantsApi("GET", this.options, this.ns);
    };

    MenusApi.prototype.loadShortMenuForLocation = function(locationId, targetId, fullMenuCallback) {
      if (fullMenuCallback == null) fullMenuCallback = null;
      this.targetId = targetId;
      this.locationId = locationId;
      this.fullMenuCallback = fullMenuCallback;
      this.options = {
        use_host: true,
        location: locationId,
        shortMenu: true
      };
      return new spRestaurantsApi("GET", this.options, this.ns);
    };

    MenusApi.prototype.createMSXMLDocumentObject = function() {
        var countdown, mya, num, progIDs, _i, _len;
        progIDs = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.5.0", "Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0", "MSXML2.DOMDocument", "MSXML.DOMDocument"];
        countdown = (function() {
          var _ref, _results;
          _results = [];
          for (num = 0, _ref = progIDs.length - 1; 0 <= _ref ? num <= _ref : num >= _ref; 0 <= _ref ? num++ : num--) {
            _results.push(num);
          }
          return _results;
        })();
        for (_i = 0, _len = countdown.length; _i < _len; _i++) {
          mya = countdown[_i];
          try {
            return new ActiveXObject(progIDs[mya]);
          } catch (e) {

          }
        }
    }

    MenusApi.prototype.buildXMLFromString = function(text) {
      var parser, xmlDoc;
      if (!isIEBool) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(text, "text/xml");
      } else {
        xmlDoc = this.createMSXMLDocumentObject();
        xmlDoc.loadXML(text);
      }
      return xmlDoc;
    };

    MenusApi.prototype.fullMenuCallbackClick = function(toSelect) {
      var fullMenu;
      fullMenu = this.fullMenuCallback;
      if (typeof fullMenu === 'function') fullMenu();
      if (typeof fullMenu === 'string' && fullMenu.match(/^https?:\/\//)) {
        return window.top.location.href = fullMenu;
      } else if (!fullMenu) {
        return window.top.open("http://places.singleplatform.com/" + this.locationId + "/menu?prev=sm");
      }
    };

    MenusApi.prototype.addParameterToURL = function(url, param) {
      var _ref;
      url += ((_ref = url.split('?')[1]) != null ? _ref : {
        '&': '?'
      }) + param;
      return url;
    };

    MenusApi.prototype.generateAtLink = function(ref, href, location_id) {
      var newHref = "http://www.singleplatform.com/partner-lp",
          appendParams = true;

      if (ref === "singleplatform") {
        // no ref in url
        newHref = "http://www.singleplatform.com/menu-lp";
      } else if (ref === 'facebook') {
        // ref in url
        newHref = "http://www.singleplatform.com?ref=facebookattribution";
        appendParams = false;
      }

      if (appendParams) {
        newHref = newHref + "?ref=" + ref + "&sp_source=publisher&sp_campaign=" + ref + "&sp_channel=viral";
      }

      return newHref;
    };

    MenusApi.prototype.transformXML = function(xml, xsl, json, nspace) {
      var linkat, linkbot, linktop, location_id, menu, menutype, mobileMenu, newcontent, newel, ref, resultDocument, shortMenu, shortMobileMenu, x, xmlDoc, xslDoc, xslProc, xslt, xsltProcessor, _i, _len, _ref, doc, spIframe,
        _this = this;
      doc = document;
      xml = this.buildXMLFromString(xml);
      x = xml.getElementsByTagName("storefront")[0];
      newel = xml.createElement("location");
      newcontent = xml.createTextNode(this.locationId);
      newel.appendChild(newcontent);
      if (x) x.appendChild(newel);
      if (this.json.location_data.is_location_a_customer && this.json.location_data.is_location_a_customer > 0) {
        newel = xml.createElement("isCustomer");
        if (x) x.appendChild(newel);
      }
      xsl = this.buildXMLFromString(xsl);
      if (!spIframeBool){
          doc.getElementById(this.targetId).innerHTML = "";
      }
      if (doc.implementation && doc.implementation.createDocument && typeof XSLTProcessor != 'undefined') {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        xsltProcessor.setParameter( null, 'baseURL', sp_host_name );
        resultDocument = xsltProcessor.transformToFragment(xml, document);
        if (spIframeBool){
            iframeBody = spIframeDoc.body;
            iframeBody.appendChild(resultDocument);
        } else {
            doc.getElementById(this.targetId).appendChild(resultDocument);
        }
      } else {
          xslt = new ActiveXObject("Msxml2.XSLTemplate.6.0");
          xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.6.0");
          xslDoc.async = false;
          xslDoc.load(xsl);
          xslt.stylesheet = xslDoc;
          xmlDoc = new ActiveXObject("Msxml2.DOMDocument.6.0");
          xmlDoc.async = false;
          xmlDoc.load(xml);
          xslProc = xslt.createProcessor();
          xslProc.input = xmlDoc;
          xslProc.addParameter( 'baseURL', sp_host_name );
          xslProc.transform();
          if (spIframeBool){
              spIframeDoc.open();
              var frag = document.createDocumentFragment();
              spIframeDoc.write(xslProc.output);
              spIframeDoc.close();
          } else {
            doc.getElementById(this.targetId).innerHTML = xslProc.output;
          }
      }
      
      doc.getElementById(this.targetId).style.fontSize = "100%";
      this.insertBaseStyles();
      this.menuFormatter.assignStyles(null);
      menu = this.options.menu === void 0 ? false : this.options.menu;
      mobileMenu = this.options.mobileMenu === void 0 ? false : this.options.mobileMenu;
      shortMenu = this.options.shortMenu === void 0 ? false : this.options.shortMenu;
      shortMobileMenu = this.options.shortMobileMenu === void 0 ? false : this.options.shortMobileMenu;
      if (menu) {
        ref = Util.getParameterByName('ref');
        location_id = this.json.location_data.ga_location_id;
        if (ref !== '') {
          ref = ref.toLowerCase();
        } else if (window.location.href.indexOf('show_menu') > -1 || window.location.href.indexOf('preview_menu') > -1 ) {
          // show_menu is part of the new FB app's URL (local/dev/prod) when showing the customer-facing iframe
          // preview_menu is part of the new FB app's canvas app (admin view)
          ref = 'facebook';
        } else {
          ref = 'singleplatform';
        }

        new ContactViewController(this.apiKey, this.locationId, this.menuFormatter.hideDisplayOptionFeedback).run();
        this.galleryController.run();

          if (doc.getElementById("sp_photo_cover")) {
            doc.getElementById("sp_photo_cover").addEventListener('click', function() {
              if (spMenuTemplate == "2") {
                _this.galleryController.init();
                _this.galleryController.showImage(spThumbUl.getElementsByTagName('li')[0].getElementsByTagName('img')[0]);
                spThumbUl.getElementsByTagName('li')[0].getElementsByTagName('a')[0].className = "selected";
              } else {
                _this.galleryController.showTab(doc.getElementById("tab_photos"));
              }
              return _gaq.push(['sp._trackEvent', 'Menu', 'Click', 'Click Location with Cover Photo']);
            });
          }
          if (doc.getElementById("sp_more_photos")){

              doc.getElementById("sp_more_photos").addEventListener('click', function() {
                  if (spMenuTemplate == "2") {
                    _this.galleryController.init();
                    _this.galleryController.showImage(spThumbUl.getElementsByTagName('li')[0].getElementsByTagName('img')[0]);
                    spThumbUl.getElementsByTagName('li')[0].getElementsByTagName('a')[0].className = "selected";
                  } else {
                    _this.galleryController.showTab(doc.getElementById("tab_photos"));
                  }
                  return _gaq.push(['sp._trackEvent', 'Menu', 'Click', 'Click Location with Cover Photo']);
                });
          }

        itemLevelPhotoIcons = document.querySelectorAll('#sp_panes .sp_option_li span[menu-item-id]');
        for(var i in itemLevelPhotoIcons) {
            if(itemLevelPhotoIcons.hasOwnProperty(i) && i != 'length' ) {
                var itemLevelPhotoIcon = itemLevelPhotoIcons[i];
                var menuItemId = itemLevelPhotoIcon.getAttribute('menu-item-id');
                var click = function( menuItemId ) {
                    return function() {
                        _gaq.push( ['sp._trackEvent', 'Menu', 'Click', 'Item level photo'] );
                        var spItemThumbUl = document.querySelector('#sp_item_thumb_ul[menu-item-id="' + menuItemId + '"]');
                        _this.galleryController.init(spItemThumbUl);
                        _this.galleryController.showImage(spThumbUl.getElementsByTagName('li')[0].getElementsByTagName('img')[0]);
                        spThumbUl.getElementsByTagName('li')[0].getElementsByTagName('a')[0].className = "selected";
                    };
                }( menuItemId );

                itemLevelPhotoIcon.addEventListener('click', click );
            }
        }

        $sp_nav_more = doc.getElementById('sp_nav_more');
        $body = doc.getElementsByTagName("body")[0];
        $menu_drop_icon = doc.getElementById('menu_drop_down_icon');
        if ($sp_nav_more) {
          $sp_menu_drop = doc.getElementById('sp_menu_drop');
            $body.addEventListener('click', function(e) {
              var sp_main = document.getElementById('sp_main');
              if (sp_main &&
                !(e.target.className === "sp_menu_drop_down" || e.target.id === "sp_nav_more" || e.target.id === "menu_drop_down_icon")) {
                var doc = document;
                var $tabsouter = doc.getElementById("tabsouter");
                var $current = $tabsouter.querySelectorAll(".current")[0];
                var $sp_nav_more = doc.getElementById("sp_nav_more");
                var $sp_tabs = doc.getElementById("sp_main").querySelectorAll("#sp_tabs")[0];
                var $sp_navLi = doc.getElementById("tabsouter").querySelectorAll(".sp_navLi")[0];
                var $sp_more_photos = doc.getElementById("sp_more_photos");
                doc.getElementById("menu_drop_down_icon").className = "icon-expand";
                if($sp_more_photos){
                    if ($sp_more_photos.className == "sp_more_photos_icon")
                        $tabsouter.className = "borderTop";
                    else
                        $tabsouter.className = "";
                }
                $current.className = "current";
                $sp_nav_more.className = "menuNameSpan";
                $sp_navLi.className = "sp_navLi";
                $sp_tabs.className = "sp_tabs";
                return doc.getElementById('sp_menu_drop').style.visibility = "hidden";
              }
            });
            $sp_nav_more.addEventListener('click', function(e) {
                var doc = document;
                var $sp_menu_drop = doc.getElementById("sp_menu_drop");
                var $menu_drop_icon = doc.getElementById("menu_drop_down_icon");
                var $tabsouter = doc.getElementById("tabsouter");
                var $current = $tabsouter.querySelectorAll(".current")[0];
                var $sp_nav_more = doc.getElementById("sp_nav_more");
                var $sp_tabs = doc.getElementById("sp_main").querySelectorAll("#sp_tabs")[0];
                var $sp_navLi = doc.getElementById("tabsouter").querySelectorAll(".sp_navLi")[0];
                var $sp_more_photos = doc.getElementById("sp_more_photos");
                if ($sp_menu_drop.style.visibility === "visible") {
                    $menu_drop_icon.className = "icon-expand";

                    if ($sp_nav_more.innerHTML.indexOf('Less') > -1) {
                      $sp_nav_more.innerHTML = $sp_nav_more.innerHTML.replace('Less', 'More');
                    }

                    if($sp_more_photos){
                        if (doc.getElementById("sp_more_photos").className == "sp_more_photos_icon")
                            $tabsouter.className = "borderTop";
                        else
                            $tabsouter.className = "";
                    }
                    $current.className = "current";
                    Util.removeSPClass($sp_nav_more, "sp_border_none");
                    $current.className = "current";
                    $sp_nav_more.className = "menuNameSpan";
                    $sp_tabs.className = "sp_tabs";
                    $sp_navLi.className = "sp_navLi";
                    return $sp_menu_drop.style.visibility = "hidden";
                  } else {
                      $menu_drop_icon.className = "icon-collapse";

                      if ($sp_nav_more.innerHTML.indexOf('More') > -1) {
                        $sp_nav_more.innerHTML = $sp_nav_more.innerHTML.replace('More', 'Less');
                      }

                      if($sp_more_photos){
                          if (doc.getElementById("sp_more_photos").className == "sp_more_photos_icon")
                              $tabsouter.className = "borderTop menu_drop_mobile";
                          else
                              $tabsouter.className = "menu_drop_mobile";
                      }
                      Util.addSPClass($current,"sp_hide");
                      Util.addSPClass($sp_nav_more,"sp_border_none");
                      Util.addSPClass($sp_tabs,"tabs_mobile");
                      // Util.addSPClass($sp_navLi,"navLi_mobile");
                      return $sp_menu_drop.style.visibility = "visible";
                  }
                });

        }

        //this.galleryController.run(document.querySelector('#sp_item_thumb_ul[menu-item-id="8"]'));
        if(document.getElementsByTagName("body")[0].className.match(/page_main/)){
        }
        else{
          new AttributionImage(this.apiKey).run();
        }
        linktop = doc.getElementById("manage_top_lnk");
        linkbot = doc.getElementById("manage_bot");
        if (linktop) {
          linktop.href = this.generateAtLink(ref, linktop.href, location_id);
            linktop.addEventListener('click', function() {
              return _gaq.push(['_trackEvent', 'Claim Here Atttribution Links', 'Click', 'Top Placement']);
            });
        }
        if (linkbot) {
          linkbot.href = this.generateAtLink(ref, linkbot.href, location_id);
            linkbot.addEventListener('click', function() {
              return _gaq.push(['_trackEvent', 'Claim Here Atttribution Links', 'Click', 'Bottom Placement']);
            });
        }
        _ref = Util.getByClass("at_link");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          linkat = _ref[_i];
          linkat.href = this.generateAtLink(ref, linkat.href, location_id);
            linkat.addEventListener('click', function() {
              return _gaq.push(['_trackEvent', 'Claim Here Atttribution Links', 'Click', 'Atttribution Provided By Image']);
            });
        }
        menutype = "web";
      }
      if (shortMenu || shortMobileMenu) {
        if (shortMenu) {
          new AttributionImage(this.apiKey).run();
          if (doc.getElementById("full_link")) {
              doc.getElementById("full_link").addEventListener('click', function(e) {
                e.preDefault;
                return _this.fullMenuCallbackClick(e.currentTarget);
              });
            if (doc.getElementById("sp_arr")) {
              doc.getElementById("sp_arr").innerHTML = "&#9654;";
            }
          }
        }
        if (shortMobileMenu) {
          menutype = "mobile";
        } else {
          menutype = "web";
        }
      }
      if (mobileMenu || shortMobileMenu) {
        new MobileMenu().run();
        menutype = "mobile";
      }
      if(spMenuTemplate == "2" || this.options.menuTemplate == 2){
          var menuIntegrate = new MenuIntegration(this.targetId);
          menuIntegrate.init();
      }
      return new GoogleAnalytics().run(this.json, menutype, this.menuFormatter);
    };

    MenusApi.prototype.insertBaseStyles = function() {
      var defhref, menu, mobileMenu, shortMenu, shortMobileMenu, doc, oldTemplate, thisHtmlContent, s,
      doc = document;
      this.staticHostname = Conf.getStaticFileHostname();
      menu = this.options.menu === void 0 ? false : this.options.menu;
      mobileMenu = this.options.mobileMenu === void 0 ? false : this.options.mobileMenu;
      shortMenu = this.options.shortMenu === void 0 ? false : this.options.shortMenu;
      shortMobileMenu = this.options.shortMobileMenu === void 0 ? false : this.options.shortMobileMenu;
      menuTemplate = this.options.menuTemplate === void 0 ? false : this.options.menuTemplate;
      menuIntegrate = this.options.menuIntegrate === void 0 ? false : this.options.menuIntegrate;
      targetId = this.options.targetId === void 0 ? false : this.options.targetId;
      blankMenu = this.options.blankMenu === void 0 ? false : this.options.blankMenu;
      defhref = sp_host_name + "/static/css/menu/menu_v3.css?ver=" + spVer;
      responsiveHref = sp_host_name + "/static/css/menu/menu2_v3_responsive.css?ver=" + spVer;
      thisHtmlContent = doc.getElementById(this.targetId).innerHTML;
      if (isFFBool){
          Util.importStylesheets(sp_host_name + "/static/css/font/Roboto/GoogleRobotoIE9.css?ver=" + spVer);
	  Util.importStylesheets((location.protocol === 'file:'?'http:':location.protocol) + "//fonts.googleapis.com/css?family=Open+Sans")
	  Util.importStylesheets((location.protocol === 'file:'?'http:':location.protocol) + "//fonts.googleapis.com/css?family=Roboto:400,400italic,700,700italic,500");
      } else{
          Util.importStylesheets((location.protocol === 'file:'?'http:':location.protocol) + "//fonts.googleapis.com/css?family=Roboto:400,400italic,700,700italic,500");
          Util.importStylesheets(sp_host_name + "/static/css/font/Roboto/GoogleRobotoIE9.css?ver=" + spVer);
          Util.importStylesheets((location.protocol === 'file:'?'http:':location.protocol) + "//fonts.googleapis.com/css?family=Enriqueta:400,700");
	  Util.importStylesheets((location.protocol === 'file:'?'http:':location.protocol) + "//fonts.googleapis.com/css?family=Open+Sans");
      }
      if (menuTemplate == 2 || spMenuTemplate == "2") {
          defhref = sp_host_name + "/static/css/menu/menu2_v3.css?ver=" + spVer;
          Util.importStylesheets(sp_host_name + "/static/css/font/style-sp.css?ver=" + spVer);
          Util.importStylesheets(sp_host_name + "/static/css/menu/menu2_v3_responsive.css?ver=" + spVer);
      } else if (mobileMenu || shortMobileMenu) {
        defhref = sp_host_name + "/static/css/menu/menu_mobile_v3.css?ver=" + spVer;
      } else if (shortMenu) {
        defhref = sp_host_name + "/static/css/menu/short_menu_v3.css?ver=" + spVer;
      } else if (blankMenu) {
        defhref = sp_host_name + "/static/css/menu/menu2_v3.css?ver=" + spVer;
      }
      return Util.importStylesheets(defhref);
    };

    MenusApi.prototype.defaultApiCallResponseHandler = function(response, json) {
      if (this.xsl) {
        return this.transformXML(response, this.xsl, json);
      } else if(json) {
        this.xml = response;
        return this.json = JSON.parse(json);
      }
      else{
          this.xml = response;
      }
      return;
    };

    MenusApi.prototype.transformCallResponseHandler = function(response, nspace) {
      if (this.xml) {
        if (nspace === "undefined")
            nspace = "";
        return this.transformXML(this.xml, response, this.json, nspace);
      } else {
        return this.xsl = response;
      }
    };


  /*
   * Legacy customization definitions
  */
  for( var i in MenuFormatter.prototype ) {
    var initVal = MenuFormatter.prototype[i];
    if( initVal === null || initVal === false ) {
      var funcName = 'set' + i.charAt( 0 ).toUpperCase() + i.substr( 1 );
      (function( prop ) {
        MenusApi.prototype[ funcName ] = function( val ) {
          this.menuFormatter[ prop ] = val;
          return this;
        }
      })( i );
    }
  }

  MenusApi.prototype.setMenuTemplate = function(p) {
    this.menuFormatter.menuTemplate = p;
    spMenuTemplate = p;
    return this;
  };
  MenusApi.prototype.setHideDisplayOptionPhotos = function(p) {
    this.menuFormatter.hideDisplayOptionPhotos = p;
    spHideDisplayOptionPhotos = p;
    return this;
  };

    /* Noops for backcompat */
    MenusApi.prototype.setWaitForStyledMenu = function(p) {
      return this;
    };

    MenusApi.prototype.setEntireMenuClickable = function(p) {
      return this;
    };
    /* end noops */

    MenusApi.prototype.setCssOverrides = function() {
      var css;
      css = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.menuFormatter.setCssOverrides(css);
      return this;
    };
    return MenusApi;
  })();

  this.MenuIntegration = (function() {
    function MenuIntegration(targetId) {
        this.targetId = targetId ? targetId:"menusContainer";
    }
    MenuIntegration.prototype.onloadFunc = function(counter, thisMsnry) {
        var counter = typeof counter == 'number' ? counter:1;
        var doc = document;
        var $menusContainer = doc.getElementById(targetId);
        if (counter == 1) {
            var sp_container, leaderPrice, $icon_spiceicon_alt, $temp_menu;
      /*
			if (!isIE7Bool){
				var $sp_menu_mason = doc.getElementById("sp_menus0").querySelectorAll(".sp_menu_mason");
				for(var iCnt = 0; iCnt < $sp_menu_mason.length; iCnt++){
					sp_container = $sp_menu_mason[iCnt];

					console.log( 'arrange them! (msnry was here, inside onloadFunc)' );
				}
			}
			*/
            var $sp_menus = doc.getElementById("sp_main").querySelectorAll(".sp_menu");
            for (var iCnt = 0; iCnt < $sp_menus.length; iCnt ++){
                $temp_menu = doc.getElementById("sp_menus" + iCnt);
                $icon_spiceicon_alt = $temp_menu.querySelectorAll(".icon-spice");
                if ($icon_spiceicon_alt.length > 1)
                    $temp_menu.querySelectorAll(".spiceWarning")[0].style.display = "block";
            }

            var $sp_menus0 = doc.getElementById("sp_menus0");
            var $leaders = ($sp_menus0 === null) ? '' : $sp_menus0.querySelectorAll(".sp_singleItem");
            if ($leaders.length > 0){
                for(var aCnt=$leaders.length-1; aCnt < 0; aCnt--){
                    var $leadersPrice = $leaders[aCnt].querySelectorAll(".leaders");
                    if($leadersPrice.length > 0){
                        for(var bCnt=0; bCnt <= $leadersPrice.length-1; bCnt++){
                            $leadersPrice[bCnt].className = $leadersPrice[bCnt].className.replace( /priceTitleDiv/g , 'priceTitleOneItem');
                        }
                    }
                }
            }
            var $modalBackdrop = doc.createElement('div');
            $modalBackdrop.setAttribute('id', "modal-backdrop");
            if($menusContainer)
                $menusContainer.appendChild($modalBackdrop);

            var $mobileExpandItem = doc.querySelectorAll(".mobileExpandItem");
            for (var i = 0, length = $mobileExpandItem.length; i < length; i++){
                $mobileExpandItem[i].addEventListener('click', function(e){
                    var thisNode = e.currentTarget;
                    var $parNode = thisNode.parentNode.parentNode.parentNode;
                    var thisClass = thisNode.className;
                    if (thisClass.indexOf("singleLineExpand") >= 0)
                        $parNode = $parNode.parentNode;
                    var $description, $mainPrice, $detailsDiv, $detailsDiv2, $sp_details, $sp_option, $pricePreview;
                    $description = $parNode.querySelectorAll(".sp_description")[0];
                    $mainPrice = $parNode.querySelectorAll(".mainPrice")[0];
                    $detailsDiv = $parNode.querySelectorAll(".detailsDiv")[0];
                    $detailsDiv2 = $parNode.querySelectorAll(".detailsDiv")[1];
                    $sp_details = $parNode.querySelectorAll(".sp_details")[0];
                    $sp_option = $parNode.querySelectorAll(".sp_option")[0];
                    $pricePreview = $parNode.querySelectorAll(".pricePreview")[0];
                    if(thisClass.indexOf("icon-collapse") >= 0){
                        Util.toggleSPClass(thisNode,"icon-expand", "icon-collapse");
                        // if($sp_option){Util.toggleSPClass($sp_option,"sp_hide", "sp_show");}
                        if($description){Util.toggleSPClass($description,"sp_hide", "sp_show");}
                        if($pricePreview){Util.toggleSPClass($pricePreview, "sp_show", "sp_hide");}
                        if($mainPrice){Util.toggleSPClass($mainPrice,"sp_show", "sp_hide");}
                        if($detailsDiv){Util.toggleSPClass($detailsDiv,"sp_hide", "sp_show");}
                        if($detailsDiv2){Util.toggleSPClass($detailsDiv2,"sp_hide","sp_show");}
                        if($sp_details){Util.toggleSPClass($sp_details,"sp_hide","sp_show");}

                    } else{
                        Util.toggleSPClass(thisNode,"icon-collapse","icon-expand");
                        // if($sp_option){Util.toggleSPClass($sp_option,"sp_show", "sp_hide");}
                        if($description){Util.toggleSPClass($description,"sp_show","sp_hide");}
                        if($pricePreview){Util.toggleSPClass($pricePreview,"sp_hide","sp_show");}
                        if($detailsDiv){Util.toggleSPClass($detailsDiv,"sp_show","sp_hide");}
                        if($detailsDiv2){Util.toggleSPClass($detailsDiv2,"sp_show","sp_hide");}
                        if($sp_details){Util.toggleSPClass($sp_details,"sp_show","sp_hide");}
                    }
                });
            }
            var $mobileExpandSection = doc.querySelectorAll(".mobileExpandSection");
            for (var i = 0, length = $mobileExpandSection.length; i < length; i++){
                if (window.addEventListener) {
                    $mobileExpandSection[i].addEventListener('click', function(e){
                        var thisNode = e.currentTarget;
                        var containerDiv = thisNode.parentNode;
                        var $parNode= thisNode.parentNode.nextElementSibling;

                        if ((" " + containerDiv.className + " ").replace(/[\n\t]/g, " ").indexOf('last') > -1 &&
                            (" " + containerDiv.className + " ").replace(/[\n\t]/g, " ").indexOf('last-placeholder') == -1) {
                          Util.toggleSPClass(containerDiv,"last-placeholder","last");
                        } else if ((" " + containerDiv.className + " ").replace(/[\n\t]/g, " ").indexOf('last-placeholder') > -1) {
                          Util.toggleSPClass(containerDiv,"last","last-placeholder");
                        }

                        var thisClass = $parNode.className;
                        // var $spheaderContainer;
                        // $spheaderContainer = $parNode.querySelectorAll(".spheaderContainer")[0];
                        if(thisClass.indexOf("sp_show") >= 0){
                            Util.toggleSPClass(thisNode,"icon-carrotDown", "icon-carrotUp");
                            Util.toggleSPClass($parNode,"sp_hide","sp_show");
                        } else{
                            Util.toggleSPClass(thisNode,"icon-carrotUp","icon-carrotDown");
                            Util.toggleSPClass($parNode,"sp_show","sp_hide");
                        }
                        // @todo - update these two click handlers so we do not need to stop propagation
                        e.cancelBubble = true;
                    });
                } else if (window.attachEvent){
                    $spheaderContainer[i].attachEvent('onclick', function(e){
                        var thisNode = e.currentTarget;
                        var $parNode = thisNode.parentNode.parentNode.parentNode;
                        var thisClass = thisNode.className;
                        var $spheaderContainer = $parNode.querySelectorAll(".spheaderContainer")[0];
                        if(thisClass.indexOf("icon-carrotUp") >= 0){
                            thisNode.className = "icon-carrotDown mobileExpandSection";
                            if($spheaderContainer){Util.toggleSPClass($spheaderContainer,"sp_hide","sp_show");}
                        } else{
                            thisNode.className = "icon-carrotUp mobileExpandSection";
                            if($spheaderContainer){Util.toggleSPClass($spheaderContainer,"sp_show","sp_hide");}
                        }
                        // @todo - update these two click handlers so we do not need to stop propagation
                        e.cancelBubble = true;
                    });
                }
            }
            var $mobileExpandSectionContainer = doc.querySelectorAll(".mobileExpandSectionContainer");
            for (var i = 0, length = $mobileExpandSectionContainer.length; i < length; i++) {
                if (window.addEventListener) {
                    $mobileExpandSectionContainer[i].addEventListener('click', function(e){
                        var thisNode = e.currentTarget;
                        thisNode.childNodes.forEach(function(childNode) {
                          if ((" " + childNode.className + " ").replace(/[\n\t]/g, " ").indexOf('mobileExpandSection') > -1) {
                            // We create an event for Samsung S3 and other mobile devices
                              // that don't have native click events thanks to swipe/touch events
                            event = document.createEvent( 'HTMLEvents' );
                            event.initEvent( 'click', true, true );
                            childNode.dispatchEvent( event );
                          }
                        });
                    });
                } else if (window.attachEvent){
                    $mobileExpandSectionContainer[i].attachEvent('onclick', function(e){
                        var thisNode = e.currentTarget;
                        thisNode.childNodes.forEach(function(childNode) {
                          if ((" " + childNode.className + " ").replace(/[\n\t]/g, " ").indexOf('mobileExpandSection') > -1) {
                            event = document.createEvent( 'HTMLEvents' );
                            event.initEvent( 'click', true, true );
                            childNode.dispatchEvent( event );
                          }
                        });
                    });
                }
            }
            if (isIEBool || spOnloadBool){
                counter++;
                spOnloadBool = true;
                setTimeout(function(){
                    var menuIntegrate = new MenuIntegration(this.targetId);
                    menuIntegrate.rearrange( 'sp_menus0' );
                }, 50);
            }
        }
        if (counter < 10){
            counter++;
            setTimeout(function(){
                var menuIntegrate = new MenuIntegration(this.targetId);
                menuIntegrate.rearrange( 'sp_menus0' );
            }, 450);
        }
    }

    MenuIntegration.prototype.init = function() {
        var doc = document;
        if (isIEBool)
           this.onloadFunc();
        else{
            spOnloadBool = true;
            var tempOnload = window.onload;
            if(window.onload == null){
                window.onload = this.onloadFunc();
            } else{
                this.onloadFunc();
            }
        }
    };
    MenuIntegration.prototype.run = function(menuId) {
        var doc = document;
        var sp_container, thisMenuId;
        if (menuId) {
            thisMenuId = menuId;
            this.rearrange(menuId);
        }
        else
            return;

    };
  MenuIntegration.prototype.rearrange = function(thisMenuId) {
      if(!isIE7Bool){
        var $thisMenuId = doc.getElementById(thisMenuId);
        var $sp_menu_mason = ($thisMenuId === null) ? '' : $thisMenuId.querySelectorAll(".sp_menu_mason");
        sp_container = $sp_menu_mason;
        var forEach = Wedge.Collections.forEach;
        var leftOffset = null;
        forEach( function( menu, idx ) {
          forEach( function( menuItem, idx ) {
            //console.log( menuItem, menuItem.offsetLeft, leftOffset );
            if( menuItem.offsetLeft != undefined ) {
              if( leftOffset === null ) leftOffset = menuItem.offsetLeft;

              if( menuItem.offsetLeft === leftOffset ) {
                menuItem.removeClass( 'right' );
                menuItem.addClass( 'left' );
              }
              else {
                menuItem.removeClass( 'left' );
                menuItem.addClass( 'right' );
              }
            }
          }, menu.childNodes );
        }, sp_container );
        SPIframe.resize();
      }
    }
    return MenuIntegration;
  })();

  this.BusinessView = (function() {
      function BusinessView(locationId, targetId, options){
          this.locationId = locationId;
          this.targetId = targetId;
          this.options = options;
          this.setIframe = __bind(this.setIframe, this);
          var busiApiKey = "ke09z8icq4xu8uiiccighy1bw";
          var useIframeOnload = false;
          /*
          //disabled to track faulty integration
          if (spApiKey == "")
              spApiKey = busiApiKey;
          */
          if(this.options['isIE7Bool'])
              isIE7Bool = true;
          if (this.options['ResizeIframe'])
              spResizeIframe = true;
          if (!this.options['PassIframe'] && !spDocHTML5Bool){
              if (isIE7Bool)
                  this.options['isIE7Bool'] = true;
              spIframeBool = true;
          } else if (this.options['MenuIframe']) {
              spIframeBool = this.options['MenuIframe'] == 'false' ? false : true;
          } else if (spApiKey == busiApiKey) {
              spIframeBool = true;
          }
          if (spIframeBool) {
              var thisBusinessView = this;
              var tempOnload = window.onload;
              if(tempOnload == null){
                  window.onload = function(){
                      return thisBusinessView.setIframe(thisBusinessView.locationId, thisBusinessView.targetId, thisBusinessView.options);
                  };
              } else{
                  return thisBusinessView.setIframe(thisBusinessView.locationId, thisBusinessView.targetId, thisBusinessView.options, 1);
              }
          }
          else
              return businessView = new MenuIntegrationView(locationId,targetId,options);
      };

      BusinessView.prototype.setIframe = function(locationId, targetId, options, iframeCnt, iframeCreated) {
          var e, s, doc = document;
          var that = this;
          iframeCnt = iframeCnt ? iframeCnt : 10;
          iframeCreated = iframeCreated ? iframeCreated : false;
          if (iframeCreated){
              if (typeof doc.getElementById("sp_iframe").contentWindow.BusinessView === "undefined" && iframeCnt < 10){
                  iframeCnt++;
                  return setTimeout(function(){that.setIframe(locationId, targetId, options, iframeCnt, iframeCreated);
                  }, 300);
              } else{
                  return doc.getElementById("sp_iframe").contentWindow.BusinessView(locationId, "sp_iframe_container", options);
              }
          } else {
              if (iframeCnt < 10 && doc.getElementById(targetId) === null){
                  iframeCnt++;
                  setTimeout(function(){that.setIframe(locationId, targetId, options, iframeCnt);
                      }, 300);
                  return;
              }
              SPIframe.createIframe(targetId);
              options['MenuIframe'] = 'false';
              options['PassIframe'] = 'true';
              options['ResizeIframe'] = 'true';
              s = doc.createElement('script');
              s.async = true;
              if ((sp_host_name.search(/qaplatform/) > -1) || (sp_host_name.search(/menuplatform/) > -1) || (sp_host_name.search(/8000/) > -1))
                  s.src = sp_host_name + "/static/js/apps/singlepage/legacy/full-menu.js?apiKey=" + spApiKey;
              else
                  s.src = sp_host_name + "/businesses/storefront/?apiKey=" + spApiKey;
              iframeBody= spIframeDoc.body;
              iframeBody.appendChild(s);
              iframeCreated = true;
          }
          if (typeof doc.getElementById("sp_iframe").contentWindow.BusinessView === "undefined"){
              iframeCnt = 1;
              return setTimeout(function(){that.setIframe(locationId, targetId, options, iframeCnt, iframeCreated);
              }, 300);
          } else{
              doc.getElementById("sp_iframe").contentWindow.BusinessView(locationId, "sp_iframe_container", options);
          }
          return;
      };
      return BusinessView;
  })();

  this.MenuIntegrationView = (function() {
      function MenuIntegrationView(locationId, targetId, options) {
          var _this = this;
          var checkWedge = setInterval( function() {
              if( window.Wedge ) {
                  clearInterval( checkWedge );

                  _this.locationId = locationId;
                  _this.targetId = targetId;
                  _this.options = options;
                  _this.menuApi = new MenusApi(spApiKey, "businessView", targetId);

                  var menuFormatter = _this.menuApi.menuFormatter;
                  var forEach = Wedge.Collections.forEach;
                  forEach( function( option, idx ) {
                      var mappedProp = idx.substr( 0, 1 ).toLowerCase() + idx.substr( 1 );
                      menuFormatter[ mappedProp ] = option;
                  }, _this.options );

                  if (_this.options['HideDisplayOptionPhotos']) {
                      spHideDisplayOptionPhotos = _this.options['HideDisplayOptionPhotos'];
                  }
                  var displayMenu = false;
                  if (_this.options['DisplayMenu']) {
                      displayMenu = _this.options['DisplayMenu'];
                  }
                  var menusContainerHTML = doc.getElementById(targetId).innerHTML;
                  if (spApiKey == "ke09z8icq4xu8uiiccighy1bw" && menusContainerHTML == ""){
                      var spSpinner = doc.createElement("div");
                      spSpinner.id = "sp_spinner";
                      spSpinner.style.maxWidth = "920px";
                      spSpinner.style.textAlign = "center";
                      spSpinner.innerHTML = '<img style="position:relative;top:50px;" src="' + sp_host_name + "/static/images/sp_loader.gif?ver=" + spVer + '" />';
                      doc.getElementById(targetId).appendChild(spSpinner);
                  }
                  else
                      doc.getElementById(_this.targetId).innerHTML = "";

                  if (_this.options['MenuIframe']) {
                      if (spIframeBool){
                          SPIframe.createIframe(_this.targetId);
                      }
                  } else if (spIframeBool){
                      SPIframe.createIframe(_this.targetId);
                  }
                  var menuTemplate = false;
                  if (_this.options['MenuTemplate']) {
                      menuTemplate = _this.options['MenuTemplate'];
                      spMenuTemplate = menuTemplate;
                      if (_this.options['MenuTemplate'] == 2){
                          spMenuTemplate = "2";
                      }
                  }
                  _this.menuApi.loadMenusForLocation(_this.locationId, _this.targetId, true, menuTemplate, displayMenu);
              }
          }, 0 );
      }

    MenuIntegrationView.prototype.defaultApiCallResponseHandler = function(response, json) {
      return this.menuApi.defaultApiCallResponseHandler(response, json);
    };

    MenuIntegrationView.prototype.transformCallResponseHandler = function(response) {
      return this.menuApi.transformCallResponseHandler(response, "businessView");
    };
    return MenuIntegrationView;
  })();
}).call(this);
