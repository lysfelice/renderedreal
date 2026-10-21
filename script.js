/* ===== NỘI DUNG: DATA[số chapter], đếm từ 0 (0 = chapter 01 ... 9 = chapter 10) ===== */
const NAMES = { mc: "MC", xavier: "Xavier" };
const DATA = {
  0: {
    title: "Khối Cầu Thủy Tinh",
    lines: [
      ["mc", "Sao tự nhiên trước mắt em lóe lên nhiều hình ảnh xa lạ thế... "],
      ["xavier", "Anh cũng thấy nè. Chắc do tụi mình chạm vào mấy quả cầu thủy tinh này đấy."],
      ["mc", "Ôi thảo nào. Hiệp hội nói đây là vật có thể lưu trữ ký ức và cần tụi mình mang trả lại."],
      ["xavier", "Dao động năng lượng mà đồng hồ tụi mình ghi nhận cũng là do chúng."],
      ["mc", "Vậy tụi mình mang chúng theo có mạo hiểm quá không...?"],
      ["mc", "Á, Xavier! Anh cẩn thận, khoan chạm vào chúng—"],
      ["xavier", "Không nguy hiểm gì đâu mà."],
      ["xavier", "Anh chỉ hơi tò mò thế giới chỗ mấy quả cầu thủy tinh này trông như thế nào thôi."],
      ["mc", "Cho em thử nữa. Nhân tiện cùng tìm lại vị chủ nhân thất lạc rồi đưa mấy quả cầu nhỏ này về nhà."],
    ],
  },
  1: {
    title: "Một Thành Phố Khác",
    lines: [
      ["mc", "Cửa sổ vát góc, tủ lưu trữ màu xám, rồi cả mấy cỗ máy không rõ tên nữa..."],
      ["mc", "Nơi được tái hiện trong khối cầu ký ức này là ở đâu vậy nhỉ?"],
      ["xavier", "Chắc là một văn phòng."],
      ["xavier", "Khung cửa sổ chữ L kết hợp với độ cao của tòa nhà có thể quan sát rộng hơn."],
      ["xavier", "Còn về phần mấy món vũ khí đặt trên bàn và dãy tủ lưu trữ lớn dọc theo tường..."],
      ["xavier", "Văn phòng này khả năng cao là của lực lượng hành pháp của thành phố."],
      ["mc", "Anh quan sát tỉ mỉ thật đó. Ngay cả vụ góc nhìn rộng mà anh cũng để ý tới nữa!"],
      ["xavier", "Góc nhìn đắc địa không chỉ giúp ích để truy bắt tội phạm thôi đâu."],
      ["xavier", "Nó còn rất hợp để tăm tia xem tan làm nên đi ăn khuya ở đâu nữa."],
    ],
  },
  2: {
    title: "Bản Sao",
    lines: [
      ["mc", "Cách thức thực thi pháp luật ở đây đáng sợ thật đấy. Sao lại có thể đánh ngất người ta ngay giữa đường thế kia..."],
      ["mc", "Hình như em nghe thấy mấy sĩ quan truy bắt nói là anh ta 'di cư trái phép' đến Trái Đất phải không?"],
      ["xavier", "Ừm, người bị bắt vốn không phải là cư dân của hành tinh này."],
      ["xavier", "Phạm vi hoạt động hợp pháp của bọn họ có lẽ chỉ giới hạn ở một vài hành tinh vùng rìa mà thôi."],
      ["mc", "Ngay cả chuyện này mà anh cũng biết sao?"],
      ["xavier", "Người ngoài hành tinh đến Trái Đất trước tiên đều phải học cách ẩn mình thật kỹ."],
      ["xavier", "Bởi vì con người sẽ không cho phép một tồn tại chưa được công nhận đặt chân vào lãnh thổ của mình đâu."],
      ["xavier", "Kịch bản phim hay diễn như vậy mà."],
    ],
  },
  // 3: { title: "...", lines: [["xavier","..."],["mc","..."]] },
};

const $ = s => document.querySelector(s);
const overlay = $("#overlay"), menu = $("#menu"), nums = $("#nums");
const titleEl = $("#title"), content = $("#content"), prev = $("#prev"), next = $("#next");
let chap = 0;

// tạo 10 nút số
for (let i = 0; i < 10; i++) {
  const b = document.createElement("button");
  b.className = "num";
  b.innerHTML = "<span>" + String(i + 1).padStart(2, "0") + "</span>";
  b.onclick = () => { chap = i; render(); };
  nums.appendChild(b);
}

function render() {
  const d = DATA[chap] || { title: "Chapter " + String(chap + 1).padStart(2, "0"), lines: [] };
  titleEl.textContent = d.title;
  content.innerHTML = d.lines.length
    ? d.lines.map(([w, t]) => `<div class="msg ${w}"><span class="who">${NAMES[w]}</span><p>${t}</p></div>`).join("")
    : '<p class="empty">Nội dung sẽ được cập nhật.</p>';
  content.scrollTop = 0;
  [...nums.children].forEach((b, i) => b.classList.toggle("active", i === chap));
}

// mũi tên: trái hiện khi số 01 bị khuất, phải ẩn khi tới số 10
function arrows() {
  prev.hidden = nums.scrollLeft < nums.children[0].offsetWidth * 0.5;
  next.hidden = nums.scrollLeft + nums.clientWidth >= nums.scrollWidth - 4;
}
nums.addEventListener("scroll", arrows, { passive: true });
prev.onclick = () => nums.scrollBy({ left: -nums.clientWidth * 0.8 });
next.onclick = () => nums.scrollBy({ left: nums.clientWidth * 0.8 });

// cỡ chữ tỉ lệ theo bề rộng khung
new ResizeObserver(() => { menu.style.setProperty("--u", menu.clientWidth / 100 + "px"); arrows(); }).observe(menu);

// mở / đóng popup
const close = () => overlay.classList.remove("open");
$("#btn-record").onclick = () => overlay.classList.add("open");
overlay.addEventListener("click", e => { if (!e.target.closest("#menu")) close(); });
addEventListener("keydown", e => e.key === "Escape" && close());


render();

/* ===== HIỆU ỨNG ===== */
const stage = $(".stage"), logo = $("#logo");
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const rnd = (a, b) => a + Math.random() * (b - a);
const flash = (el, cls, ms) => { el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms); };

// bật màn hình CRT khi tải xong, kèm glitch nhẹ
function boot() {
  if (calm) return stage.classList.add("live");
  stage.classList.add("boot");
}
stage.addEventListener("animationend", e => { if (e.animationName === "crt") stage.classList.replace("boot", "live"); });
document.readyState === "complete" ? boot() : addEventListener("load", boot);

// thỉnh thoảng glitch ở màn hình chính; glitch logo khi popup mở
(function loop() {
  setTimeout(() => { if (!calm && stage.classList.contains("live") && !overlay.classList.contains("open")) flash(stage, "glitch", 400); loop(); }, rnd(10000, 25000));
})();
(function loopLogo() {
  setTimeout(() => { if (!calm && overlay.classList.contains("open")) flash(logo, "g", 320); loopLogo(); }, rnd(2200, 5000));
})();

// đốm sáng nhỏ trôi nhẹ như đom đóm; thêm đốm cyan/hồng quanh logo khi popup mở
const cv = $("#fx"), cx = cv.getContext("2d"), P = [];
let W, H, D;
const fit = () => { D = Math.min(devicePixelRatio || 1, 2); W = cv.width = innerWidth * D; H = cv.height = innerHeight * D; };
addEventListener("resize", fit); fit();
function dot(x, y, hot) {
  P.push({ x, y, hot, t: 0, r: rnd(.8, 2.4) * D * (hot ? 1.3 : 1), vx: rnd(-.12, .12) * D, vy: rnd(-.25, -.03) * D,
    ph: rnd(0, 6.28), sp: rnd(.6, 1.8), life: hot ? rnd(180, 360) : rnd(500, 1100),
    c: hot ? (Math.random() < .5 ? "120,235,255" : "255,120,215") : "255,225,255" });
}
function tick(now) {
  cx.clearRect(0, 0, W, H); cx.globalCompositeOperation = "lighter";
  const open = overlay.classList.contains("open");
  const want = Math.min(46, Math.max(18, (innerWidth * innerHeight / 24000) | 0));
  if (P.filter(p => !p.hot).length < want && Math.random() < .3) dot(rnd(0, W), rnd(0, H), false);
  if (open && P.filter(p => p.hot).length < 26 && Math.random() < .5) {
    const r = logo.getBoundingClientRect();
    dot(rnd(r.left - 30, r.right + 30) * D, rnd(r.top - 30, r.bottom + 30) * D, true);
  }
  for (let i = P.length - 1; i >= 0; i--) {
    const p = P[i]; p.t++;
    p.x += p.vx + Math.sin(now / 1000 * p.sp + p.ph) * .15 * D; p.y += p.vy;
    const k = p.t / p.life;
    if (k >= 1 || p.y < -20) { P.splice(i, 1); continue; }
    const a = Math.sin(k * Math.PI) * (.45 + .45 * Math.sin(now / 400 * p.sp + p.ph));
    const g = cx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
    g.addColorStop(0, `rgba(${p.c},${a})`); g.addColorStop(1, `rgba(${p.c},0)`);
    cx.fillStyle = g; cx.beginPath(); cx.arc(p.x, p.y, p.r * 4, 0, 6.283); cx.fill();
  }
  requestAnimationFrame(tick);
}
if (!calm) requestAnimationFrame(tick);

// nhạc nền (assets/music.mp3) + nút bật/tắt. Trình duyệt thường chặn tự phát nên sẽ phát ở lần chạm đầu tiên.
function music() {
  const bgm = new Audio("assets/music.mp3"), snd = $("#snd");
  let userOff = false;
  bgm.loop = true; bgm.volume = .7;
  bgm.addEventListener("play", () => snd.classList.add("on"));
  bgm.addEventListener("pause", () => snd.classList.remove("on"));
  snd.onclick = () => { if (bgm.paused) { userOff = false; bgm.play().catch(() => {}); } else { userOff = true; bgm.pause(); } };
  const go = () => { if (!userOff && bgm.paused) bgm.play().catch(() => {}); };
  go();
  ["pointerdown", "keydown"].forEach(ev => addEventListener(ev, e => { if (!e.target.closest?.("#snd")) go(); }, { passive: true }));
}
document.readyState === "complete" ? music() : addEventListener("load", music);
