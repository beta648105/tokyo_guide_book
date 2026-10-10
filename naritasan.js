/**
 * 나리타산 신승사 페이지 내용.
 * 출처: text/naritasan.txt
 */

const NARITASAN = {
  tagline: "천 년이 넘는 역사를 간직한 일본의 사찰",
  intro: [
    "신승사의 정식 명칭은 '나리타산 신쇼지'이며 한국어로는 보통 '나리타산 신승사'라고 표기한다.",
    "1940년에 창건되어 부동명왕을 모시는 사찰로 유명하며, 대본당과 화려한 삼중탑 등 일본의 전통 건축물과 불교문화를 살펴볼 수 있다.",
    "사찰 뒤편에는 연못과 폭포가 어우러진 '나리타산 공원'도 있어 역사뿐이 아닌 자연까지 즐길 수 있는 일본의 관광 명소 중 하나이다.",
  ],
  sections: [
    {
      title: "방문 안내",
      blocks: [
        {
          type: "notes",
          items: [
            "(1) 주소: 일본 지바현 나리타시 나리타 1번지",
            "(2) 교통: JR 나리타역 또는 게이세이 나리타역에서 도보 약 10분",
            "(2-1) 주차: 사찰 주변에 유료 주차장이 있다. 단체 버스를 이용하는 경우에는 일반 승용차 주차장과 조건이 다를 수 있으므로 사전에 확인해야 한다.",
            "(3) 운영 정보: 사찰 경내는 연중 참배할 수 있다. 다만 대본당 등 각 시설의 이용 시간과 불교 의식 일정은 별도로 확인하는 것이 좋다.",
            "(4) 문의 전화: +81-476-22-2111",
            "(5) 공식 홈페이지: https://www.naritasan.or.jp/",
            "(6) 지도: https://www.google.com/maps/search/?api=1&query=成田山新勝寺",
          ],
        },
      ],
    },
    {
      blocks: [
        {
          type: "item",
          wide: true,
          image: "images/naritasan/main_hall.png",
          name: "대본당",
          lines: [
            "한국 사찰의 대웅전에 해당하는 신승사의 중심 건물로, 일본에서는 대본당이라고 부른다.",
            "이 사찰에서 가장 중요한 불교 의식인 호마 기도가 진행되는 곳으로, 현재의 대본당은 1968년에 건립되었으며 진언종에서 중요하게 여기는 부동명왕을 본존으로 모시고 있다.",
          ],
        },
        { type: "label", text: "주요 볼거리" },
        {
          type: "item",
          image: "images/naritasan/fudo_myoo.png",
          name: "부동명왕",
          text: "번뇌를 끊고 중생을 올바른 길로 이끈다고 여겨지는 불교의 중요한 존재이다.",
        },
        {
          type: "item",
          image: "images/naritasan/homa_prayer.png",
          name: "호마 기도",
          text: "불을 피우고 호마목이라는 나무 조각을 태우며 소원을 빌고 마음의 번뇌를 없애고자 하는 의식이다.",
        },
        {
          type: "item",
          image: "images/naritasan/main_hall_architecture.png",
          name: "대본당 건축",
          text: "신승사의 종교적 중심지로서 웅장한 규모와 전통적 불교 건축의 특징을 살펴볼 수 있다.",
        },
      ],
    },
    {
      blocks: [
        {
          type: "item",
          wide: true,
          image: "images/naritasan/pagoda.png",
          name: "삼중탑",
          lines: [
            "삼중탑은 나리타산 신승사 경내에 자리한 3층 목조 탑으로, 1712년에 건립된 일본의 중요문화재이다.",
            "탑에는 불교의 다섯 부처를 뜻하는 오지여래가 모셔져 있으며, 화려한 색채와 정교한 조각 장식이 특징이다.",
            "특히 탑 주변의 십육나한 조각과 처마 아래의 세밀한 장식은 일본 전통 건축의 아름다움을 보여준다.",
          ],
        },
        {
          type: "item",
          plainName: true,        // 이름을 본문 폰트 검정으로
          image: "images/naritasan/pagoda_carving.png",
          name: "정교한 조각 장식",
          lines: [
            "삼중탑의 가장 큰 특징 중 하나는 처마와 기둥 주변을 장식하는 화려하고 정교한 조각이다.",
            "탑의 각 층에는 구름과 물결을 표현한 장식이 있으며, 탑 주변에는 석가모니의 제자이자 수행자인 십육나한을 표현한 조각이 배치되어 있다. 이러한 장식은 탑의 아름다움을 더할 뿐만 아니라 불교의 가르침과 신앙을 시각적으로 보여준다.",
          ],
        },
      ],
    },
    {
      blocks: [
        {
          type: "item",
          wide: true,
          image: "images/naritasan/nio_gate.png",
          name: "인왕문",
          lines: [
            "인왕문은 나리타산 신승사의 경내로 들어가는 주요 문으로, 1830년에 재건된 일본의 중요문화재이다.",
            "문 양쪽에는 사찰을 지키는 금강역사상이 자리하고 있으며, 문 중앙에는 '魚がし(우오가시)'라는 글자가 적힌 커다란 붉은 등이 걸려 있다.",
            "전통적인 목조 건축과 수호신상, 거대한 등이 어우러져 신승사의 역사와 불교문화를 보여주는 건축물이다.",
          ],
        },
        {
          type: "notes",
          items: [
            "魚がし(우오가시)에 대하여: 魚がし(우오가시)는 생선 시장을 뜻하는 말로, 쓰키지의 생선 시장 상인들이 봉납한 등이라 이 글자가 적혀 있다. 무게는 약 800kg에 달한다.",
          ],
        },
        { type: "label", text: "주요 볼거리" },
        {
          type: "item",
          image: "images/naritasan/nio_statue.png",
          name: "금강역사상",
          text: "사찰을 외부의 악한 기운으로부터 지키는 수호신을 표현한 조각상이다.",
        },
        {
          type: "item",
          image: "images/naritasan/red_lantern.png",
          name: "붉은 대등",
          text: "'魚がし'라는 글자가 적혀 있어 인왕문의 특징적인 볼거리로 꼽힌다.",
        },
      ],
    },
    {
      blocks: [
        {
          type: "item",
          wide: true,
          image: "images/naritasan/park.png",
          name: "나리타산 공원",
          lines: [
            "나리타산 공원은 나리타산 신승사 대본당 뒤편에 펼쳐진 넓은 일본식 정원으로, 약 16만 5,000㎡의 면적을 자랑한다.",
            "공원에는 문수·용수·용지라는 세 연못과 숲, 폭포 등이 조성되어 있어 일본의 아름다운 자연경관을 감상할 수 있다.",
            "봄에는 매화와 벚꽃이 피고 가을에는 단풍이 물들어 계절마다 색다른 풍경을 보여준다.",
            "사찰의 역사적인 건축물과는 또 다른 매력을 느끼며 여유롭게 산책하기 좋은 장소이다.",
          ],
        },
        { type: "label", text: "주요 볼거리" },
        {
          type: "item",
          image: "images/naritasan/pavilion.png",
          name: "부유당",
          text: "용지 연못 안에 자리한 정자로, 연못과 주변 나무가 어우러진 풍경을 감상할 수 있는 인기 촬영 명소이다.",
        },
        {
          type: "item",
          image: "images/naritasan/waterfall.png",
          name: "웅비의 폭포",
          text: "숲속의 바위 사이로 물이 흐르는 폭포로, 자연의 소리를 들으며 고요한 분위기를 느낄 수 있다.",
        },
        {
          type: "item",
          image: "images/naritasan/suikinkutsu.png",
          name: "수금굴",
          text: "땅속에 묻힌 큰 항아리에 물방울이 떨어지며 맑은 울림을 만들어 내는 일본 정원의 전통적인 장치이다.",
        },
      ],
    },
  ],
};

renderShowcase(NARITASAN);
