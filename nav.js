(function () {
  var pages = [
    ["index.html", "EMI"],
    ["payoff.html", "Payoff"],
    ["fdr.html", "FDR"],
    ["dps.html", "DPS"],
    ["savings.html", "Savings"],
    ["compare.html", "Compare"],
    ["banks.html", "Banks"],
    ["real.html", "Inflation"],
    ["cards.html", "Flashcards"],
    ["dashboard.html", "Dashboard"],
    ["sql.html", "SQL"]
  ];
  var here = location.pathname.split("/").pop() || "index.html";
  var nav = document.getElementById("nav");
  if (!nav) return;
  nav.style.cssText = "display:flex;flex-wrap:wrap;gap:6px 16px;padding-bottom:12px;margin-bottom:16px;border-bottom:1px solid var(--line)";
  pages.forEach(function (p) {
    var a = document.createElement("a");
    a.href = p[0];
    a.textContent = p[1];
    a.style.cssText = "color:var(--accent);font-weight:600;text-decoration:none";
    if (p[0] === here) {
      a.style.textDecoration = "underline";
      a.setAttribute("aria-current", "page");
    }
    nav.appendChild(a);
  });
})();