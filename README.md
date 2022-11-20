# SolveIt

![](header.png)

Apollo Server와 GraphQL로 제작한 문제 공유 플랫폼 서버 입니다.

+ [SolveIt React App](https://github.com/Kihundd/solveit)
+ [SolveIt Android App](https://github.com/AlpCar/solveit0604)

## Getting Started / 어떻게 시작하나요?

아래의 명령어로 실행하시면 됩니다.

```
docker build -t solveit:1.0 . 
docker run -it -d --name solveit -p 4000:4000 solveit:1.0
nodemon start
```

### Prerequisites / 선행 조건

아래 사항들이 설치가 되어있어야합니다.

```
MySQL Server 8.0 이상의 서버, Node.js 16.13.0 이상, npm 8.1.0 이상, Docker 20 이상
```

### 모듈 설치

아래의 명령어로 필요한 모듈들을 설치합니다.

```
npm install
```

## Built With / 누구랑 만들었나요?

* [금정욱](https://github.com/urarik) - 프로젝트 설계, 프로트엔드 서버 제작
* [박세훈](https://github.com/psh3253) - 프로젝트 설계, 데이터베이스 설계, 백엔드 서버 제작
* [문빈](https://github.com/githubKudoi) - 프로젝트 설계, 백엔드 서버 제작
* [성기훈](https://github.com/Kihundd) - 프로젝트 설계, 프로트엔드 서버 제작
* [최성찬](https://github.com/AlpCar) - 프로젝트 설계, 안드로이드 앱 제작

## Function / 기능

+ 로그인 및 회원가입
+ 지필형 문제 제작 및 관리
+ 코딩테스트 문제 제작 및 관리
+ 오답노트 및 틀린 문제 모아 보기
+ 문제 신고 및 검증
+ 질문하기 및 답변하기
+ 문제 평가 및 문제 랭킹
+ 사용자 프로필 관리

## Technology / 기술

+ Apollo Server와 GraphQL을 사용하여 서버 요청 쿼리 제작
+ Judge0 온라인 코드 시스템 API 서버를 사용하여 코딩테스트 구현
+ Sequelize ORM을 사용하여 데이터베이스 접근 계층 구현
+ Docker Container를 사용한 배포

* [Judge0](https://judge0.com/)

## License / 라이센스

이 프로젝트는 MIT 라이센스로 라이센스가 부여되어 있습니다. 자세한 내용은 LICENSE 파일을 참고하세요.
