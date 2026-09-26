/**
 * 지역 페이지 공통 동작.
 * 화면은 각 HTML 에 그대로 들어 있고, 여기서는 공통 기능만 켠다.
 */

initViews();
registerServiceWorker();
initPageTransitions();
initMenu();
initPortraitLock();
