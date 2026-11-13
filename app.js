var MEDIA = [
  ['m1-lineup', '早期渲染', '人物模型：发型、衣服可换', 'm1-lineup-m'],
  ['m2-faces', '早期渲染', '捏脸：几种脸、胡子、刀疤'],
  ['m3-dispatch', '界面样张', '手机里的接单页：合法、不合法订单都在这接'],
  ['m4-bank', '界面样张', '银行：公司账户、个人账户、现金分开算'],
  ['m5-crew', '界面样张', '员工：在手机上给员工派活'],
  ['m6-map', '界面样张', 'Port Mercer 城市地图'],
  ['m7-cars', '概念设定图', '车：第一批 8 辆'],
  ['m8-street', '早期渲染', '街角场景，最终画面会调整']
];

var cur = 0;
var narrow = window.matchMedia('(max-width: 760px)');
var img = document.getElementById('mainimg');
var kind = document.getElementById('kind');
var cap = document.getElementById('caption');
var strip = document.getElementById('strip');

MEDIA.forEach(function (m, i) {
  var b = document.createElement('button');
  b.className = 'thumb';
  b.setAttribute('aria-label', m[1] + '：' + m[2]);
  b.innerHTML = '<img src="img/' + m[0] + '-t.jpg" alt="" width="232" height="130">';
  b.onclick = function () { show(i); };
  strip.appendChild(b);
  new Image().src = 'img/' + m[0] + '.jpg';
});

function show(i) {
  cur = (i + MEDIA.length) % MEDIA.length;
  var m = MEDIA[cur];
  img.src = 'img/' + (narrow.matches && m[3] ? m[3] : m[0]) + '.jpg';
  kind.textContent = m[1];
  cap.textContent = m[1] + ' · ' + m[2];
  var t = strip.children;
  for (var k = 0; k < t.length; k++) t[k].classList.toggle('on', k === cur);
  var el = t[cur];
  strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
}

document.getElementById('prev').onclick = function () { show(cur - 1); };
document.getElementById('next').onclick = function () { show(cur + 1); };
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') show(cur - 1);
  if (e.key === 'ArrowRight') show(cur + 1);
});

var x0 = null;
img.parentNode.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
img.parentNode.addEventListener('touchend', function (e) {
  if (x0 === null) return;
  var dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
  x0 = null;
});

narrow.addEventListener('change', function () { show(cur); });
show(0);
