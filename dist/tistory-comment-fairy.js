"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function loadCSS(url) {
  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  head.appendChild(link);
}

// 사용 예시
loadCSS('path/to/your/styles.css');
(function () {
  var metaTag = document.querySelector('meta[property="og:site_name"]');
  var blogTitle = metaTag ? metaTag.content : null;

  // 조건부 동작을 유도
  if (typeof useCommentFairy === 'undefined' || useCommentFairy) {
    var addFairy = function addFairy(target) {
      observer.disconnect(); // 옵저버 중지

      var num = '';
      if ((typeof ReactionReqBody === "undefined" ? "undefined" : _typeof(ReactionReqBody)) === 'object') {
        num = ReactionReqBody.entryId;
      } else if (window.location.pathname.indexOf('/guestbook') > -1) {
        num = 0;
      }
      var fairyBox = document.createElement('div');
      fairyBox.setAttribute('class', 'fairy-messagebox');
      var textSpan = document.createElement('span');
      textSpan.setAttribute('class', 'fairy-message');

      // textSpan.innerHTML =
      //     '티스토리 계정으로 댓글을 쓸 수 없나요? <a class="fairy-sign-in" href="https://www.tistory.com/auth/login/?redirectUrl=' +
      //     encodeURIComponent(TistoryBlog.tistoryUrl+window.location.pathname+'#entry' + num + 'Comment') +
      //     '" rel="noopener noreferrer">다시 로그인하기</a> | <a href="https://github.com/m1nque/tistory-comment-fairy/issues" style="position: relative; right: 0;">&#129498;도움 요청하기&#129498;</a>';

      textSpan.innerHTML = message + '&nbsp;<a class="fairy-sign-in" href="https://www.tistory.com/auth/login/?redirectUrl=' + encodeURIComponent(TistoryBlog.tistoryUrl + window.location.pathname + '#entry' + num + 'Comment') + '" rel="noopener noreferrer">' + linkMessage + '</a>';
      fairyBox.appendChild(textSpan);
      target.prepend(fairyBox);
      // document.querySelector('.tt-area-reply').appendChild(fairyBox);
      observer.observe(targetNode, config); // 옵저버 재시작
    };
    var targetQuery = typeof fairyTarget === 'undefined' || fairyTarget === '' ? '.tt-box-write' : fairyTarget;
    var message = typeof fairyMessage === 'undefined' ? '티스토리 계정으로 작성하시겠어요?' : fairyMessage;
    var linkMessage = typeof fairyLinkMessage === 'undefined' ? '다시 로그인하기' : fairyLinkMessage;

    // 관찰 대상 요소와 설정
    var targetNode = document.body; // body 전체를 대상으로 설정
    var config = {
      childList: true,
      subtree: true
    }; // 자식 요소의 추가 및 제거를 관찰하기 위한 설정

    var observer = new MutationObserver(function (mutations, observer) {
      var _iterator = _createForOfIteratorHelper(mutations),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var mutation = _step.value;
          if (mutation.type === 'childList') {
            // const elementToAdd = document.querySelector(targetQuery).appendChild(fairyBox);

            document.querySelectorAll(targetQuery).forEach(function (e) {
              if (!e.querySelector('.fairy-messagebox') && e.querySelector('.tt-btn_register').disabled) {
                addFairy(e);
              }
            });
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
    observer.observe(targetNode, config);
  }
  if (typeof useShareFairy === 'undefined' || useShareFairy) {
    (function () {
      function isShortContents() {
        return window.getSelection().toString().length < 30;
      }
      function copyWithSource2(event) {
        if (isShortContents()) {
          return;
        }
        var range = window.getSelection().getRangeAt(0);
        var contents = range.cloneContents();
        var temp = document.createElement('div');
        temp.appendChild(contents);

        //var url = document.location.href;
        var host = '';
        try {
          host += TistoryBlog.url;
        } catch (e) {
          host += document.location.domainname;
        }
        var url = host + document.location.pathname;
        var decodedUrl = decodeURI(url);
        var postfix = " [" + blogTitle + ":티스토리]";
        var innerText = temp.innerText || document.title;
        event.clipboardData.setData('text/plain', innerText + '\n출처: ' + decodedUrl + postfix);
        event.clipboardData.setData('text/html', '&lt;pre data-ke-type=&quot;codeblock&quot;&gt;' + temp.innerHTML + '&lt;/pre&gt;' + '출처: &lt;a href=&quot;' + url + '&quot;&gt;' + decodedUrl + '&lt;/a&gt;' + postfix);
        event.preventDefault();
      }
      document.addEventListener('copy', copyWithSource2);
    })();
  }
})();
