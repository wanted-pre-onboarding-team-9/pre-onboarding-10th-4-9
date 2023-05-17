![header](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=300&section=header&text=원티드%20프리온보딩%209팀%204차%20과제&fontSize=50)

<br/>

# 🗓️ 프로젝트 기간

## 2023.5.14 ~ 2023.5.17 (4일)

<br/>

# 📌 프로젝트 실행 방법

1. Clone the repo

```javascript
$ git clone https://github.com/wanted-pre-onboarding-team-9/pre-onboarding-10th-4-9.git
```

2. Install Yarn packages

```javascript
$ yarn install
```

3. Getting Started

```javascript
$ yarn start
```

<br/>

# 🛠️ 기술스택

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
</p>

<br />

# 👀 과제 결과물 프리뷰

<br/>

# 🚀 배포 페이지

### [원티드 프리온보딩 인턴십 4주차 과제 - 9팀 배포 링크](https://main--pre-onboarding-10th-4-9.netlify.app/)

<br/>

# ✨ 세부 구현 방법

## 1. 리팩토링

#### 1-1. [추천 관련 Context 적용](https://github.com/wanted-pre-onboarding-team-9/pre-onboarding-10th-4-9/issues/4)

- search context를 사용한 이유는 병렬적 구조로 배열되는 Dropdown 컴포넌트와 InputTodo 컴포넌트에서 사용하기 위함입니다.
- 단일 책임 원칙을 위해서 search Context 에서 상태(state)와 수정함수(modify function)을 분리하여 구현했습니다.

#### 1-2. [Todo 관련 Context 적용](https://github.com/wanted-pre-onboarding-team-9/pre-onboarding-10th-4-9/issues/8)

- Todo Context에 있는 todos로 투두 리스트를 컨트롤합니다.

#### 1-3. [불필요한 state 사용 제거](https://github.com/wanted-pre-onboarding-team-9/pre-onboarding-10th-4-9/issues/22)

- [[commit](https://github.com/wanted-pre-onboarding-team-9/pre-onboarding-10th-4-9/commit/9217b64fa230210f255285c70f1e9fab3e2fdacc)] `useSuggestions`에 불필요하게 존재하던 `moreSuggestion` 함수를 없애기 위해, q와 page를 인자로 받아 useEffect dependency array에 설정하고 변경될 경우 데이터를 불러오는 방식으로 변경했습니다.
- [[commit](https://github.com/wanted-pre-onboarding-team-9/pre-onboarding-10th-4-9/pull/24/commits/85801f2900290285952cfb952896479db7c24662)] Context에서 Provider에 value를 넘길 때 사용하던 useMemo의 필요성에 의문을 가져 제거하였습니다.
- [[commit](https://github.com/wanted-pre-onboarding-team-9/pre-onboarding-10th-4-9/pull/24/commits/c2356f17012813dc4ea77e0e33db0504a39be00b)] 검색 바에서 input value는 `SearchContext`에서 관리하고, `TodoContext`에서는 TODO list 관련 상태만 관리하도록 변경하였습니다. 따라서 사용하지 않는 state인 `todoText` 제거하였습니다.
  <br/>

## 2. [무한스크롤](https://github.com/wanted-pre-onboarding-team-9/pre-onboarding-10th-4-9/pull/33)

- 결과가 10개보다 많을때 more 아이콘이 보이고, 하단까지 스크롤 했을때 다음 결과를 추가하며, `IntersectionObserver`를 이용해 뷰 포트에 ref로 지정한 element가 표시됐는지 확인하여 API를 불러와 무한스크롤을 구현했습니다.
- 추가 검색도중 debounce를 적용하고, 로딩 스피너 아이콘이 표시됩니다.

  <br/>

## 3. [테스트 코드](https://github.com/wanted-pre-onboarding-team-9/pre-onboarding-10th-4-9/issues/14)

- 코드 작업 시 빠른 피드백을 받고 휴먼에러를 피하기 위해 Jest와 RTL을 사용한 테스트 코드를 추가했습니다.
- context와 같은 종속성은 Jest를 이용해 mocking하여 처리했습니다.
- GitHub Actions를 통해 main branch로 PR시 test code 통과 여부를 검사하도록 자동화함으로써 버그를 일으키는 코드가 merge되는 것을 방지했습니다.
  <br/>

## 4. [에러 처리](https://github.com/wanted-pre-onboarding-team-9/pre-onboarding-10th-4-9/issues/13)

- ui상의 에러와 api 요청에서 발생하는 에러를 모두 감싸는 방법으로 context api를 적용했습니다.
- view에서 사용자에게 에러를 표시할 수 있도록 구현했습니다.
  <br/>

## 5. [타입스크립트 적용](https://github.com/wanted-pre-onboarding-team-9/pre-onboarding-10th-4-9/issues/2)

- 기존에 자바스크립트로 작성된 과제코드를 타입스크립트로 마이그레이션 했습니다.
  <br/>

## 6. [CSS 분리 과정](https://github.com/wanted-pre-onboarding-team-9/pre-onboarding-10th-4-9/issues/10)

- 스타일 관련 코드를 styles 폴더로 따로 분리하여 관리함으로써 디렉토리 구조를 개선했습니다.
  <br/>

# 💡 Best Practice 선정 과정

Best Practice 선정 과정은 레포지토리 Wiki에 정리되어 있습니다. [Wiki 바로가기](https://github.com/wanted-pre-onboarding-team-9/pre-onboarding-10th-4-9/wiki/%F0%9F%93%9D-Pre-Onboarding-10th-9%ED%8C%80-%EA%B3%BC%EC%A0%9C-3#3-best-practice-%EB%8F%84%EC%B6%9C)
<br/>

# 📂 폴더 구조

```javascript
📦src
 ┣ 📂@types
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜suggestion.ts
 ┃ ┗ 📜todo.ts
 ┣ 📂api
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜search.ts
 ┃ ┗ 📜todo.ts
 ┣ 📂components
 ┃ ┣ 📜Dropdown.tsx
 ┃ ┣ 📜DropdownItem.tsx
 ┃ ┣ 📜ErrorModal.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜InputTodo.tsx
 ┃ ┣ 📜TodoItem.test.tsx
 ┃ ┣ 📜TodoItem.tsx
 ┃ ┣ 📜TodoList.test.tsx
 ┃ ┗ 📜TodoList.tsx
 ┣ 📂contexts
 ┃ ┣ 📜ErrorContext.tsx
 ┃ ┣ 📜SearchContext.tsx
 ┃ ┗ 📜TodoContext.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useDebounce.ts
 ┃ ┣ 📜useElementInViewport.tsx
 ┃ ┣ 📜useFocus.ts
 ┃ ┗ 📜useSuggestions.ts
 ┣ 📂pages
 ┃ ┗ 📜Main.tsx
 ┣ 📂styles
 ┃ ┣ 📜App.css
 ┃ ┣ 📜Dropdown.css
 ┃ ┣ 📜DropdownItem.css
 ┃ ┣ 📜ErrorModal.css
 ┃ ┣ 📜Header.css
 ┃ ┣ 📜InputTodo.css
 ┃ ┣ 📜Main.css
 ┃ ┣ 📜TodoItem.css
 ┃ ┗ 📜TodoList.css
 ┣ 📂utils
 ┃ ┗ 📜debounce.ts
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┗ 📜setupTests.ts
```

<br/>

# ⭐️ 팀원 소개

|                          박상우                           |                           장소진                           |                          이아영                           |
| :-------------------------------------------------------: | :--------------------------------------------------------: | :-------------------------------------------------------: |
|       [SangWoo9734](https://github.com/SangWoo9734)       |         [sojinjang](https://github.com/sojinjang)          |          [ARONGLEE](https://github.com/ARONGLEE)          |
| ![](https://avatars.githubusercontent.com/u/49917043?v=4) | ![](https://avatars.githubusercontent.com/u/111125577?v=4) | ![](https://avatars.githubusercontent.com/u/74637336?v=4) |

|                          이지현                           |                          김성현                           |                          이한나                           |
| :-------------------------------------------------------: | :-------------------------------------------------------: | :-------------------------------------------------------: |
|          [j2h30728](https://github.com/j2h30728)          |       [kimisadev27](https://github.com/kimisadev27)       |      [Han-Na-05-22](https://github.com/Han-Na-05-22)      |
| ![](https://avatars.githubusercontent.com/u/60846068?v=4) | ![](https://avatars.githubusercontent.com/u/34756233?v=4) | ![](https://avatars.githubusercontent.com/u/97869178?v=4) |

|                           전민지                           |                          조하닮                           |                           김현정                           |
| :--------------------------------------------------------: | :-------------------------------------------------------: | :--------------------------------------------------------: |
|        [mjjeon2645](https://github.com/mjjeon2645)         |          [ohcmadah](https://github.com/ohcmadah)          |           [sena-22](https://github.com/sena-22)            |
| ![](https://avatars.githubusercontent.com/u/104840243?v=4) | ![](https://avatars.githubusercontent.com/u/52340070?v=4) | ![](https://avatars.githubusercontent.com/u/110877564?v=4) |
