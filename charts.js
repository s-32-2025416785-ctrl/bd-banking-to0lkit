(function () {
  var NS = "http://www.w3.org/2000/svg";

  function fmt(n) { return "৳" + Math.round(n).toLocaleString("en-IN"); }
  function short(n) {
    if (n >= 10000000) return "৳" + (n / 10000000).toFixed(1).replace(/\.0$/, "") + "Cr";
    if (n >= 100000) return "৳" + (n / 100000).toFixed(1).replace(/\.0$/, "") + "L";
    if (n >= 1000) return "৳" + Math.round(n / 1000) + "k";
    return "৳" + Math.round(n);
  }
  function num(id) { var e = document.getElementById(id); return e ? parseFloat(e.value) : NaN; }
  function svgEl(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function lineChart(container, series, startLabel, endLabel, desc) {
    var W = 320, H = 200, L = 48, R = 10, T = 10, B = 26;
    var max = 0;
    series.forEach(function (s) { s.pts.forEach(function (v) { if (v > max) max = v; }); });
    if (!(max > 0)) max = 1;
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, width: "100%", role: "img", "aria-label": desc });
    var i;
    for (i = 0; i <= 4; i++) {
      var y = T + (H - T - B) * (1 - i / 4);
      svg.appendChild(svgEl("line", { x1: L, x2: W - R, y1: y, y2: y, style: "stroke:var(--line);stroke-width:1" }));
      var t = svgEl("text", { x: L - 6, y: y + 3, "text-anchor": "end", style: "fill:var(--mute);font-size:10px" });
      t.textContent = short(max * i / 4);
      svg.appendChild(t);
    }
    series.forEach(function (s) {
      var n = s.pts.length;
      var pts = s.pts.map(function (v, j) {
        var x = L + (W - L - R) * (n > 1 ? j / (n - 1) : 0);
        var yy = T + (H - T - B) * (1 - v / max);
        return x.toFixed(1) + "," + yy.toFixed(1);
      }).join(" ");
      svg.appendChild(svgEl("polyline", {
        points: pts, fill: "none",
        style: "stroke:" + s.color + ";stroke-width:2.5;stroke-linejoin:round;stroke-linecap:round"
      }));
    });
    var a = svgEl("text", { x: L, y: H - 6, "text-anchor": "start", style: "fill:var(--mute);font-size:10px" });
    a.textContent = startLabel;
    var b = svgEl("text", { x: W - R, y: H - 6, "text-anchor": "end", style: "fill:var(--mute);font-size:10px" });
    b.textContent = endLabel;
    svg.appendChild(a);
    svg.appendChild(b);
    container.appendChild(svg);

    var lg = document.createElement("div");
    lg.style.cssText = "display:flex;flex-wrap:wrap;gap:6px 16px;font-size:.85rem;color:var(--mute);margin-top:4px";
    series.forEach(function (s) {
      var item = document.createElement("span");
      var sw = document.createElement("i");
      sw.style.cssText = "display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:6px;vertical-align:-1px;background:" + s.color;
      item.appendChild(sw);
      item.appendChild(document.createTextNode(s.name));
      lg.appendChild(item);
    });
    container.appendChild(lg);
  }

  function splitBar(container, aLabel, aVal, bLabel, bVal) {
    var total = aVal + bVal;
    var pa = total > 0 ? Math.round(aVal / total * 100) : 0;
    var bar = document.createElement("div");
    bar.style.cssText = "display:flex;height:16px;border-radius:8px;overflow:hidden;margin:10px 0 6px;background:var(--line)";
    var s1 = document.createElement("div");
    s1.style.cssText = "background:var(--accent);width:" + pa + "%";
    var s2 = document.createElement("div");
    s2.style.cssText = "background:var(--warm);width:" + (100 - pa) + "%";
    bar.appendChild(s1);
    bar.appendChild(s2);
    var cap = document.createElement("div");
    cap.style.cssText = "font-size:.85rem;color:var(--mute);margin-bottom:12px";
    cap.textContent = aLabel + " " + pa + "% (" + fmt(aVal) + ")  ·  " + bLabel + " " + (100 - pa) + "% (" + fmt(bVal) + ")";
    container.appendChild(bar);
    container.appendChild(cap);
  }

  function bars(container, rows, formatter) {
    var max = 0;
    rows.forEach(function (r) { if (r[1] > max) max = r[1]; });
    if (!(max > 0)) max = 1;
    rows.forEach(function (r) {
      var wrap = document.createElement("div");
      wrap.style.cssText = "margin:10px 0";
      var top = document.createElement("div");
      top.style.cssText = "display:flex;justify-content:space-between;gap:10px;font-size:.9rem";
      var l = document.createElement("span");
      l.textContent = r[0];
      var v = document.createElement("span");
      v.style.fontWeight = "700";
      v.textContent = formatter(r[1]);
      top.appendChild(l);
      top.appendChild(v);
      var track = document.createElement("div");
      track.style.cssText = "height:12px;border-radius:6px;background:var(--line);margin-top:4px;overflow:hidden";
      var fill = document.createElement("div");
      fill.style.cssText = "height:100%;background:var(--accent);width:" + Math.max(2, r[1] / max * 100) + "%";
      track.appendChild(fill);
      wrap.appendChild(top);
      wrap.appendChild(track);
      container.appendChild(wrap);
    });
  }

  window.BankCharts = { bars: bars, fmt: fmt };

  /* ---------- automatic charts on the calculator pages ---------- */
  function makeBox(title) {
    var anchor = document.getElementById("out");
    if (!anchor) return null;
    var box = document.createElement("div");
    box.className = "box";
    var h = document.createElement("strong");
    h.textContent = title;
    var body = document.createElement("div");
    box.appendChild(h);
    box.appendChild(body);
    anchor.parentNode.insertBefore(box, anchor.nextSibling);
    return body;
  }

  function emiChart(body) {
    body.innerHTML = "";
    var P = num("amt"), rate = num("rate"), yrs = num("yrs");
    if (!(P > 0) || !(rate >= 0) || !(yrs > 0)) return;
    var n = Math.max(1, Math.round(yrs * 12)), r = rate / 1200;
    var emi = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    var bal = P, cum = 0, balPts = [P], intPts = [0];
    for (var m = 1; m <= n; m++) {
      var it = bal * r;
      bal = Math.max(bal - (emi - it), 0);
      cum += it;
      balPts.push(bal);
      intPts.push(cum);
    }
    splitBar(body, "Principal", P, "Interest", Math.max(emi * n - P, 0));
    lineChart(body, [
      { name: "Loan balance left", color: "var(--accent)", pts: balPts },
      { name: "Interest paid so far", color: "var(--warm)", pts: intPts }
    ], "Month 0", "Month " + n, "Line chart of loan balance falling and interest paid rising");
  }

  function fdrChart(body) {
    body.innerHTML = "";
    var P = num("amt"), r = num("rate") / 100, t = num("yrs"), m = parseInt(document.getElementById("comp").value, 10);
    if (!(P > 0) || !(r >= 0) || !(t > 0) || !(m > 0)) return;
    var S = 24, dep = [], val = [];
    for (var j = 0; j <= S; j++) {
      dep.push(P);
      val.push(P * Math.pow(1 + r / m, m * t * j / S));
    }
    lineChart(body, [
      { name: "Your deposit", color: "var(--mute)", pts: dep },
      { name: "Value before tax", color: "var(--accent)", pts: val }
    ], "Start", t + (t === 1 ? " year" : " years"), "Line chart of FDR value growing over time");
  }

  function dpsChart(body) {
    body.innerHTML = "";
    var D = num("dep"), i = num("rate") / 1200, t = num("yrs");
    if (!(D > 0) || !(i >= 0) || !(t > 0)) return;
    var n = Math.max(1, Math.round(t * 12)), put = [], val = [];
    for (var k = 0; k <= n; k++) {
      put.push(D * k);
      val.push(i === 0 ? D * k : D * (Math.pow(1 + i, k) - 1) / i * (1 + i));
    }
    lineChart(body, [
      { name: "What you deposit", color: "var(--mute)", pts: put },
      { name: "Value with interest", color: "var(--accent)", pts: val }
    ], "Month 0", "Month " + n, "Line chart of DPS savings growing with interest");
  }

  var page = location.pathname.split("/").pop() || "index.html";
  var map = {
    "index.html": ["Where your money goes", emiChart],
    "fdr.html": ["How your deposit grows", fdrChart],
    "dps.html": ["How your savings grow", dpsChart]
  };
  if (map[page] && document.getElementById("out")) {
    var body = makeBox(map[page][0]);
    var draw = function () { map[page][1](body); };
    document.querySelectorAll("input,select").forEach(function (el) {
      el.addEventListener("input", draw);
    });
    draw();
  }
})();