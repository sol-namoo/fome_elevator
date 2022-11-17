# [FocusMediaKorea] 가상 광고 송출 프로그램

---

포커스미디어코리아의 광고 인프라를 바탕으로 광고 데이터를 전송받아 송출하는 가상 프로그램입니다.

받은 데이터를 바탕으로 만든 플레이리스트를 순회하며 30초마다 다음 광고를 재생합니다.

배포 없이 로컬 환경에서 테스트할 수 있도록 만들어졌습니다.

![실행예시](https://user-images.githubusercontent.com/96866819/200170330-ffcfbe25-9285-4e98-ab33-e746ed287c48.jpg)


## 시작하기

create-react-app으로 :3000 포트에 클라이언트 서버를 띄우고 json-server로 :3004 포트에 db 서버를 띄웁니다.

```jsx
npm run start // 클라이언트 서버를 3000번으로 실행
npm run server // json-server를 Samsung_A.json 파일을 바탕으로 3004번으로 실행
```

아파트 동 이름과 엘리베이터 아이디, 서버 주소는 .env 파일에 설정되어 있습니다.

## 광고 컴포넌트

서버에서 유튜브 상의 광고 링크를 전송받아 30초간 자동재생합니다.

유튜브의 정책에 따라 음소거 상태로 재생되며, 영상 길이가 30초 미만인 경우 반복 재생됩니다.
<br/>
(\*때에 따라 랜덤하게 '이 동영상은 볼 수 없습니다'라는 오류가 뜨는 것을 발견했습니다. 오류 상황의 일관성이 없어 유튜브 측 오류라고 생각하고 있습니다.)<br/>


정해진 송출 시간 전후로는 ‘지금은 광고 시간이 아닙니다’라는 안내 화면이 나타납니다.

현재 DB 상의 데이터들은 낮12시에서 18시까지 송출되도록 설정되어 있으므로, 해당시간 외의 시간에 실행하여 작동 모습을 보려면 Sansung_A.json의 'startsAt'과 'endsAt'의 속성값을 변경해야 합니다.


동시에 해당 광고에 대한 설문 페이지로 연결되는 QR코드를 생성합니다. 각 코드는 ‘/광고id/QR코드 생성시각’의 주소를 갖습니다.

코드를 휴대폰 등으로 스캔하면 설문 페이지 주소에 접근할 수 있으나, 배포되지 않았으므로 로컬 기기에서만 내용을 확인할 수 있습니다.

따라서 로컬 테스트를 위해 **QR코드 클릭을 통해서 설문 페이지로** 넘어갈 수 있도록 설정하였습니다.

## 설문 컴포넌트

설문 컴포넌트에서는 사용자의 입력값을 받고, url 파라미터를 통해 광고 id를, .env 설정값을 통해 엘리베이터 id를 읽어내어 서버로 전송합니다.

QR코드 생성시각과 페이지에 접근한 시각의 차이가 5분 30초 이하일 때만 응답을 작성할 수 있습니다.

페이지에 접근한 시각과 전송 버튼을 누른 시각의 차이가 5분 이하일 때만 응답이 전송됩니다.
