# 티스토리 댓글요정 &#129498;

디스토리 2차 도메인 사용자를 위한 플러그인, 댓글요정입니다.

2차 도메인을 활용하는 티스토리 블로그에서는 댓글을 작성할 수 없습니다.
댓글을 달기 위해서 '로그인' 하라는 안내가 계속 나오는데요.

댓글요정이 여러분의 소중한 블로그에 댓글이 작성될 수 있도록 도와줍니다.


## 알려진 스크립트와의 차이점

1. 댓글요정은 사용자 UI/UX를 중요시 여깁니다.

	댓글 등록 버튼 옆에 두어, 전체적인 레이아웃을 해치지 않고, 깔끔합니다.

	![image](https://github.com/m1nque/tistory-comment-fairy/assets/3124496/0707284d-769c-48de-9fe8-e49ba8f106ca)

	또한, 대댓글 달기에도 노출되어 사용자를 배려합니다.

	![image](https://github.com/m1nque/tistory-comment-fairy/assets/3124496/50367d3c-5be0-437f-9608-ecf499108778)

3. 댓글요정은 조금 더 자유롭습니다.

   	몇가지 가이드라인 범위 내에서 자유롭게 문장과 위치 변경이 가능합니다.
   	
	![image](https://github.com/m1nque/tistory-comment-fairy/assets/3124496/3083f3e9-9851-46b7-90ca-006d15fc8f21)

4. 원래 티스토리 도메인으로 바뀌더라도 사용자의 2차 도메인을 우선시합니다. 그리고 티스토리 공유 기능 내부의 버그도 수정되었습니다.

	예시.

원래 방식(버그가 있던 상태)

 	> 티스토리 블로그 댓글요정과 공유요정!
https://사용자2차도메인.입니다/entry/%ED%8B%B0%EC%8A%A4%ED%86%A0%EB%A6%AC-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%8C%93%EA%B8%80%EC%9A%94%EC%A0%95-%EA%B3%B5%EC%9C%A0%EC%9A%94%EC%A0%95

버그가 수정된 방식

 	> 티스토리 블로그 댓글요정과 공유요정!
출처: https://사용자2차도메인.입니다/entry/티스토리-블로그-댓글요정-공유요정 [블로그사용자명: 티스토리 블로그]
 	


## 사용법

### 설치 가이드

테마 수정 화면에서 아래 코드를 삽입합니다.

```html
<script src="https://cdn.jsdelivr.net/gh/m1nque/tistory-comment-fairy@latest/dist/tistory-comment-fairy.min.js"></script>
```

댓글요정은 어디에 스크립트를 달아 놓아도 알아서 날아 옵니다. 저는 `body` 끝에 붙였습니다.
```html
(...)

<script src="https://cdn.jsdelivr.net/gh/m1nque/tistory-comment-fairy@latest/dist/tistory-comment-fairy.min.js"></script>
</body>
</html>
```


### 스타일 가이드

테마 수정 화면에서 아래 클래스를 만들어 주고 수정해줍니다. 더 필요한 스타일이 있을 경우 아래 클래스를 바탕으로 수정해 줍니다.

```

.fairy-messagebox { /* 요정의 안내가 나오는 박스 영역 */
	padding: 4px;
	text-align: right;
	flex: 1;
}
.fairy-message {  /* 요정의 안내 메시지 */
	margin-right: 8px;
}
a.fairy-sign-in { /* 요정이 안내해주는 링크 */
	text-decoration: none;
	color: #FA9C1B;
}

a.fairy-sign-in:visited {
	text-decoration: none;
	color: #FA9C1B;
}

```


### 메시지 내용 변경
아래와 같이 `<script></script>` 를 윗 줄에 생성하고 변수 `fairyMessage`를 선언하고, 메시지를 작성해 줍니다.

**안내문구 수정**
```html
<script>
var fairyMessage = '티스토리 계정으로 작성하시겠어요?'; // 모르시겠다면 이 문장만 수정하면 됩니다. 메시지를 없애고 싶다면 ''로 남겨둡니다.
</script>
<script src="https://cdn.jsdelivr.net/gh/m1nque/tistory-comment-fairy@latest/dist/tistory-comment-fairy.min.js"></script>
```

**링크문구 수정**
```html
<script>
var fairyLinkMessage = '다시 로그인하기'; // 모르시겠다면 이 문장만 수정하면 됩니다.
</script>
<script src="https://cdn.jsdelivr.net/gh/m1nque/tistory-comment-fairy@latest/dist/tistory-comment-fairy.min.js"></script>
```

**요정의 위치 변경하기**

> 주의사항: 요정의 위치를 변화에 따라 대댓글에 노출되지 않을 수 있습니다.

```html
<script>
var fairyTarget = '.tt-area-reply'; // 대상 클래스 또는 아이디(예, #acc-nav)지정해 줍니다. 하위에 다른 HTML 요소가 있을 경우, 가장 앞쪽에 생성됩니다.
</script>
<script src="https://cdn.jsdelivr.net/gh/m1nque/tistory-comment-fairy@latest/dist/tistory-comment-fairy.min.js"></script>
```

### 요정 비활성화
댓글요정과 공유요정을 각각 비활성화 하는 기능이 추가되었습니다.
아래와 같은 변수를 선언하고, false로 값을 지정하면 해당 요정은 잠을 자게 됩니다.

```html
<script>
var useCommentFairy = true;
var useShareFairy = true;
</script>
<script src="https://cdn.jsdelivr.net/gh/m1nque/tistory-comment-fairy@latest/dist/tistory-comment-fairy.min.js"></script>
```

## 알려진 문제점



## 추후 계획

추가적으로 개발 계획은 이렇습니다.

* 기본 스타일 제공

추가적으로 개선되어야 하거나, 만들어지면 좋겠다 싶은 기능이 있다면 
[Velog](https://velog.io/@m1nque) 또는 [깃허브 이슈](https://github.com/m1nque/tistory-comment-fairy/issues)에 작성해주세요.

