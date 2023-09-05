(function () {
  const metaTag = document.querySelector('meta[property="og:site_name"]');
  const blogTitle = metaTag ? metaTag.content : null;

  
  // 조건부 동작을 유도
  if (typeof useCommentFairy === 'undefined' || useCommentFairy) {

    const targetQuery =
      typeof fairyTarget === 'undefined' || fairyTarget === ''
        ? '.tt-box-write'
        : fairyTarget;
    const message =
      typeof fairyMessage === 'undefined'
        ? '티스토리 계정으로 작성하시겠어요?'
        : fairyMessage;
    const linkMessage =
      typeof fairyLinkMessage === 'undefined'
        ? '다시 로그인하기'
        : fairyLinkMessage;
    
    // 관찰 대상 요소와 설정
    const targetNode = document.body; // body 전체를 대상으로 설정
    const config = { childList: true, subtree: true }; // 자식 요소의 추가 및 제거를 관찰하기 위한 설정

    const observer = new MutationObserver((mutations, observer) => {
      for (let mutation of mutations) {
        if (mutation.type === 'childList') {
          // const elementToAdd = document.querySelector(targetQuery).appendChild(fairyBox);

          document.querySelectorAll(targetQuery).forEach((e) => {
            if (
              !e.querySelector('.fairy-messagebox') &&
              e.querySelector('.tt-btn_register').disabled
            ) {
              addFairy(e);
            }
          });
        }
      }
    });

    function addFairy(target) {
      observer.disconnect(); // 옵저버 중지

      let num = '';
      if (typeof ReactionReqBody === 'object') {
        num = ReactionReqBody.entryId;
      } else if (window.location.pathname.indexOf('/guestbook') > -1) {
        num = 0;
      }

      const fairyBox = document.createElement('div');
      fairyBox.setAttribute('class', 'fairy-messagebox');

      const textSpan = document.createElement('span');
      textSpan.setAttribute('class', 'fairy-message');

      // textSpan.innerHTML =
      //     '티스토리 계정으로 댓글을 쓸 수 없나요? <a class="fairy-sign-in" href="https://www.tistory.com/auth/login/?redirectUrl=' +
      //     encodeURIComponent(TistoryBlog.tistoryUrl+window.location.pathname+'#entry' + num + 'Comment') +
      //     '" rel="noopener noreferrer">다시 로그인하기</a> | <a href="https://github.com/m1nque/tistory-comment-fairy/issues" style="position: relative; right: 0;">&#129498;도움 요청하기&#129498;</a>';

      textSpan.innerHTML =
        message +
        '&nbsp;<a class="fairy-sign-in" href="https://www.tistory.com/auth/login/?redirectUrl=' +
        encodeURIComponent(
          TistoryBlog.tistoryUrl +
            window.location.pathname +
            '#entry' +
            num +
            'Comment'
        ) +
        '" rel="noopener noreferrer">' +
        linkMessage +
        '</a>';

      fairyBox.appendChild(textSpan);

      target.prepend(fairyBox);
      // document.querySelector('.tt-area-reply').appendChild(fairyBox);
      observer.observe(targetNode, config); // 옵저버 재시작
    }
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
        let host = '';
  
        try {
          host += TistoryBlog.url;
        } catch (e) {
          host += document.location.domainname;
        }
  
        var url = host + document.location.pathname;
        var decodedUrl = decodeURI(url);
        var postfix =  " [" + blogTitle + ":티스토리]";
        
        const innerText = temp.innerText || document.title;
        event.clipboardData.setData(
          'text/plain',
          innerText + '\n출처: ' + decodedUrl + postfix
        );
        event.clipboardData.setData(
          'text/html',
          '&lt;pre data-ke-type=&quot;codeblock&quot;&gt;' +
            temp.innerHTML +
            '&lt;/pre&gt;' +
            '출처: &lt;a href=&quot;' +
            url +
            '&quot;&gt;' +
            decodedUrl +
            '&lt;/a&gt;' +
            postfix
        );
        event.preventDefault();
      }
  
      document.addEventListener('copy', copyWithSource2);
    })();
  }
})();
