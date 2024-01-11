## Getting Started

First, run the JSON server:

```bash

npm run server

# port 3001

```

Second, run the development server:

```bash

npm run dev

# port 3000

```

## Project Detail

1. 주문내역을 볼 수 있는 페이지 구현.

자재를 선택 후 "주문하기" 버튼을 누르면 주문 성공 여부에 따라서 "/complete" 또는 "/error" 페이지로 이동합니다.
이 과정을 좀더 자세하게 구현하고자, JSON Server에 Orders를 추가하고, POST 요청을 통해 새로운 주문들을 추가하는것을 구현했습니다.

추가로, "/order" 페이지 상단 오른쪽에 "/orderlist"로 이동하는 버튼이 있습니다.
"/orderlist" 페이지에서는 주문했던 내역을 최근 주문한 순서로 불러오고, 각각의 주문내역은 삭제할 수 있습니다.
