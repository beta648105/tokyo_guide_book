/**
 * 다이버시티 도쿄 플라자 페이지 내용.
 * 출처: text/diceverity.txt
 */

const DIVERSITY = {
  tagline: "다양한 쇼핑 및 먹거리, 즐길 거리를 경험할 수 있는 인기 관광 명소.",
  intro: [
    "다이버시티 도쿄 플라자는 일본 도쿄의 오다이바 지역에 위치한 대형 복합 쇼핑몰이다. 쇼핑뿐만 아니라 다양한 음식과 엔터테인먼트 시설을 즐길 수 있다.",
  ],
  sections: [
    {
      title: "밖",
      desc: "건물 밖에서 볼 수 있는 것",
      blocks: [
        {
          type: "item",
          image: "images/diceverity/divercity1.png",
          name: "실물 크기의 유니콘 건담",
          text: "다이버시티 앞 광장에는 거대한 유니콘 건담 조형물이 설치되어 있어, 기념 사진을 찍기에 좋은 장소이다.",
        },
      ],
    },

    {
      title: "쇼핑",
      desc: "여러 캐릭터 상품, 먹거리 등",
      blocks: [
        {
          type: "para",
          text: "다이버시티에는 한번쯤은 봤을만한 여러 유명한 캐릭터들의 상품을 판매하고 있으며, 여러 푸드코트와 의류 상점 등이 있다. 또한, 노래방과 같은 여러 어뮤즈먼트가 6층 라운드원 스타디움에 있다.",
        },
        {
          type: "notes",
          items: ["다이버시티 공식 홈페이지: https://mitsui-shopping-park.com/ko/divercity-tokyo/"],
        },
        {
          type: "item",
          image: "images/diceverity/divercity3.png",
          name: "공식 홈페이지",
          text: "공식 홈페이지에서는 매장 안내, 푸드코트 안내, 각 층의 지도 등의 정보를 확인할 수 있다. 공식 홈페이지에 들어가서 매장 정보를 누르면 어떤 상품을 파는지, 어떤 컨셉의 매장인지를 확인하고 원하는 매장을 찾아볼 수 있다.",
        },
        {
          type: "item",
          image: "images/diceverity/divercity2.png",
          name: "푸드코트",
          text: "2층에는 여러 가게가 모인 푸드코트가 있다. 일본의 푸드코트는 실제로 운영하는 가게에서 나와서 하기 때문에 음식의 퀄리티와 맛이 굉장히 높고, 음식의 종류도 많이 있다. 배가 고프다면 식사를 하거나 간식을 먹기에 적합하다.",
        },
        {
          type: "item",
          image: "images/diceverity/divercity4.png",
          name: "패션",
          text: "대표적인 의류 상점으로는 GU와 ZARA가 있다. 다이버시티 건물 4층에 위치하며, 이 두 상점은 한 곳에 있어서 두 곳을 편하게 즐겨볼 수 있다. 세일을 자주 하므로 의상 구매를 원한다면 4층에 두 상점에 들려보는 것을 추천한다.",
        },
      ],
    },

    {
      title: "플로어 가이드",
      blocks: [
        {
          type: "grid",
          images: [
            "images/diceverity/divercity5.png",
            "images/diceverity/divercity6.png",
            "images/diceverity/divercity7.png",
            "images/diceverity/divercity8.png",
            "images/diceverity/divercity9.png",
            "images/diceverity/divercity10.png",
            "images/diceverity/divercity11.png",
            "images/diceverity/divercity12.png",
          ],
        },
      ],
    },
  ],
};

renderShowcase(DIVERSITY);
