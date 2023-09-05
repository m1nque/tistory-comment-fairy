let targetQuery = '';
let message = '';
let linkMessage = '';

try {
    targetQuery = fairyTarget;
} catch (e) {
    targetQuery = '.tt-box-write';
}
try {
  message = fairyMessage; // 다른 공간에 정의되어 있다고 가정하고 try-catch를 실행
} catch (e) {
  message = '티스토리 계정으로 작성하시겠어요?';
}

try {
  linkMessage = fairyLinkMessage;
} catch (e) {
  linkMessage = '다시 로그인하기'
}

const observer = new MutationObserver((mutations, observer) => {
  for (let mutation of mutations) {
      if (mutation.type === 'childList') {
          // const elementToAdd = document.querySelector(targetQuery).appendChild(fairyBox);

          document.querySelectorAll(targetQuery).forEach(e => {
            if (!e.querySelector('.fairy-messagebox') && e.querySelector('.tt-btn_register').disabled) {
              addFairy(e);
            }
          });
      }
  }
})

function addFairy (target) {
  observer.disconnect();  // 옵저버 중지

  let num='';
  if(typeof ReactionReqBody === 'object'){
      num= ReactionReqBody.entryId
  } else if(window.location.pathname.indexOf('/guestbook') > -1){
      num= 0
  }
  
  const fairyBox = document.createElement('div');
  fairyBox.setAttribute('class', 'fairy-messagebox');
  
  const textSpan = document.createElement('span');
  textSpan.setAttribute('class', 'fairy-message');
  
  // textSpan.innerHTML = 
  //     '티스토리 계정으로 댓글을 쓸 수 없나요? <a class="fairy-sign-in" href="https://www.tistory.com/auth/login/?redirectUrl=' + 
  //     encodeURIComponent(TistoryBlog.tistoryUrl+window.location.pathname+'#entry' + num + 'Comment') + 
  //     '" rel="noopener noreferrer">다시 로그인하기</a> | <a href="https://github.com/m1nque/tistory-comment-fairy/issues" style="position: relative; right: 0;">&#129498;도움 요청하기&#129498;</a>';
  
  textSpan.innerHTML = message +
    '&nbsp;<a class="fairy-sign-in" href="https://www.tistory.com/auth/login/?redirectUrl=' + 
    encodeURIComponent(TistoryBlog.tistoryUrl+window.location.pathname+'#entry' + num + 'Comment') + 
    '" rel="noopener noreferrer">' + linkMessage + '</a>';

  fairyBox.appendChild(textSpan);
  
  
  let targetQuery = '.tt-area-reply';
  try {
      targetQuery = fairyTarget;
  } catch (e) {
      // ignore error, use default target query
  }
  document.querySelector(targetQuery);
  
  target.prepend(fairyBox)
  // document.querySelector('.tt-area-reply').appendChild(fairyBox);
  observer.observe(targetNode, config);  // 옵저버 재시작
}

// 관찰 대상 요소와 설정
const targetNode = document.body;  // body 전체를 대상으로 설정
const config = { childList: true, subtree: true };  // 자식 요소의 추가 및 제거를 관찰하기 위한 설정

observer.observe(targetNode, config);