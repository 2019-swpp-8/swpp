# SWPP 8조 Repository

[![Build Status](https://travis-ci.com/2019-swpp-8/swpp.svg?branch=master)](https://travis-ci.com/2019-swpp-8/swpp)
[![Coverage Status](https://coveralls.io/repos/github/2019-swpp-8/swpp/badge.svg?branch=master)](https://coveralls.io/github/2019-swpp-8/swpp?branch=master)

자세한 정보는 frontend, backend 디렉토리에 있습니다.

API 프로토타이핑: https://next.stoplight.io/swpp8/swpp-8-project

참고: #nogit으로 시작하는 comment가 있는 line은 git에서 제외하는 방법
```bash
git config --global filter.nogit.clean "sed '/#nogit$/'d"
git config --global filter.nogit.smudge cat
```

테스트 시의 주의사항: localhost로 테스트중이라면, CORS header를 수정해야 할 수도 있습니다.
파이어폭스의 CORS-Everywhere 같은 플러그인을 사용하면 편리합니다.
