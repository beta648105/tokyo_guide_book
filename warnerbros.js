/**
 * 워너브라더스 스튜디오 투어 도쿄 페이지 내용.
 * 출처: text/warnerbros.txt
 */

const WARNERBROS = {
  tagline: "영화 속 마법 세계를 직접 걷는 곳",
  intro: [
    "워너브라더스 스튜디오 투어 도쿄는 해리포터와 신비한 동물들 시리즈가 만들어진 과정을 직접 걸으며 볼 수 있는 시설이다. 영화 제작진이 원래 쓰던 방식으로 손수 만든 세트가 그대로 재현돼 있어서, 화면으로만 보던 장면 속에 서 있는 느낌이 드는 마법 세계다.",
    "이곳은 일반적인 테마파크보단 세트와 소품, 의상, 크리처 모형이 하나하나 놓여 있고, 어떻게 만들었는지를 보여주는 '메이킹 필름 전시'에 가깝다. 관람은 호그와트 대연회장에서 시작해 마법 세계를 따라 이어진다. 9와 3/4 승강장의 호그와트 급행열차, 다이애건 앨리, 금지된 숲을 지나고, 중간에는 빗자루를 타는 체험과 움직이는 초상화가 되어보는 코너도 있다.",
  ],
  sections: [
    {
      title: "관광",
      desc: "도쿄에서만 걸어 들어갈 수 있는 마법부, 일본에서는 여기서만 볼 수 있는 호그와트 급행열차와 대연회장.",
      items: [
        {
          image: "images/warnerbros/warnerbros3.jpg",
          side: "left",
          text: "마법부: 영화 속 마법부를 실제 크기로 재현한 세트로, 전 세계 스튜디오 투어 중 도쿄에서만 볼 수 있다. '마법이 곧 힘이다' 조각상과 함께 높이가 3m 넘는 거대한 벽난로 속 나타나는 플루 가루가 조화를 이룬다.",
        },
        {
          image: "images/warnerbros/warnerbros4.jpg",
          side: "right",
          text: "대연회장: 앞쪽에 기숙사 점수판, 분류모자, 덤브도어의 황금 연설대 같은 디테일로 반기는 첫 세트장.",
        },
      ],
    },
    {
      title: "체험",
      desc: "보기만 하는 곳이 아니다. 빗자루를 타고, 초상화가 되고, 주문을 외워봐라.",
      items: [
        {
          image: "images/warnerbros/warnerbros5.jpg",
          side: "left",
          text: "빗자루 타고 런던 상공 날기: 그린스크린 앞에서 빗자루에 올라타고 영화와 같은 방식으로 촬영하는 체험(인기 체험)",
        },
        {
          image: "images/warnerbros/warnerbros6.jpg",
          side: "right",
          text: "움직이는 초상화 속 인물 되기: 호그와트 대계단 속 초상화 중 한 액자 속 인물이 내가 되는 체험",
        },
      ],
    },
    {
      title: "샵",
      desc: "도쿄에서만 살 수 있는 머그와 과자, 내 이름이 새겨진 지팡이까지.",
      items: [
        {
          image: "images/warnerbros/warnerbros7.jpg",
          side: "left",
          text: "스튜디오 숍은 세계 최대 규모의 해리포터 숍이고, 레일웨이 숍은 9와 3/4 승강장 근처에서 호그와트 급행열차 상품만 판다.",
        },
        {
          image: "images/warnerbros/warnerbros8.png",
          side: "left",
          text: "머그: 해리포터 로고가 들어가 있고, 도쿄에서만 살 수 있는 디자인으로 가장 무난함",
        },
        {
          image: "images/warnerbros/warnerbros9.jpg",
          side: "right",
          text: "레플리카 지팡이: 영화 속 지팡이를 정교하게 재현한 상품으로, 화장 상자에 담아주고 시리즈별로 종류가 아주 많음.",
        },
      ],
    },
  ],
};

renderShowcase(WARNERBROS);
