(function () {
  var pages = [
    ["home.html", "Home"],
    ["index.html", "EMI"],
    ["payoff.html", "Payoff"],
    ["fdr.html", "FDR"],
    ["dps.html", "DPS"],
    ["savings.html", "Savings"],
    ["compare.html", "Compare"],
    ["banks.html", "Banks"],
    ["real.html", "Inflation"],
    ["budget.html", "Budget"],
    ["currency.html", "Currency"],
    ["credit.html", "Credit"],
    ["cards.html", "Flashcards"],
    ["dashboard.html", "Dashboard"],
    ["sql.html", "SQL"]
  ];
  var here = location.pathname.split("/").pop() || "index.html";
  var nav = document.getElementById("nav");
  if (!nav) return;
  nav.style.cssText = "display:flex;flex-wrap:wrap;align-items:center;gap:6px 16px;padding-bottom:12px;margin-bottom:16px;border-bottom:1px solid var(--line)";
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

  /* ---------- Bangla switch ---------- */
  var KEY = "site-lang";
  var lang = "en";
  try { if (localStorage.getItem(KEY) === "bn") lang = "bn"; } catch (e) {}

  var NAV = {
    "Home": "হোম", "EMI": "ইএমআই", "Payoff": "আগাম পরিশোধ", "FDR": "এফডিআর", "DPS": "ডিপিএস",
    "Savings": "সঞ্চয় লক্ষ্য", "Compare": "ঋণ তুলনা", "Banks": "ব্যাংক রেট", "Inflation": "মূল্যস্ফীতি",
    "Budget": "বাজেট", "Currency": "মুদ্রা", "Credit": "ক্রেডিট স্কোর", "Flashcards": "ফ্ল্যাশকার্ড",
    "Dashboard": "ড্যাশবোর্ড"
  };

  var BN = {
    "BD Banking Toolkit": "বিডি ব্যাংকিং টুলকিট",
    "Calculators, practice tools and a SQL playground for banking students.": "ব্যাংকিং শিক্ষার্থীদের জন্য ক্যালকুলেটর, অনুশীলন টুল ও SQL প্লেগ্রাউন্ড।",
    "Loans": "ঋণ", "Saving and deposits": "সঞ্চয় ও আমানত", "Money sense": "অর্থ সচেতনতা", "Learn": "শিখুন",

    "Loan EMI Calculator": "ঋণের ইএমআই ক্যালকুলেটর",
    "See your monthly payment, total interest and full repayment schedule in taka.": "আপনার মাসিক কিস্তি, মোট সুদ এবং পুরো পরিশোধের তালিকা টাকায় দেখুন।",
    "Loan amount (৳)": "ঋণের পরিমাণ (৳)",
    "Yearly interest rate (%)": "বার্ষিক সুদের হার (%)",
    "Loan period (years)": "ঋণের মেয়াদ (বছর)",
    "Calculate EMI": "ইএমআই হিসাব করুন",
    "Repayment schedule": "পরিশোধের তালিকা",
    "Loan amount": "ঋণের পরিমাণ",
    "Total interest": "মোট সুদ",
    "Total payable": "মোট পরিশোধযোগ্য",
    "Month": "মাস", "Principal": "আসল", "Interest": "সুদ", "Balance": "বাকি",
    "Where your money goes": "আপনার টাকা কোথায় যায়",
    "Loan balance left": "বাকি ঋণ",
    "Interest paid so far": "এ পর্যন্ত পরিশোধিত সুদ",

    "FDR Maturity Calculator": "এফডিআর মেয়াদপূর্তি ক্যালকুলেটর",
    "See what your fixed deposit grows to, before and after tax.": "আপনার স্থায়ী আমানত কত হবে, করের আগে ও পরে দেখুন।",
    "Deposit amount (৳)": "জমার পরিমাণ (৳)",
    "Period (years)": "মেয়াদ (বছর)",
    "Interest added": "সুদ যোগ হয়",
    "Monthly": "মাসিক", "Quarterly": "ত্রৈমাসিক", "Half-yearly": "ষাণ্মাসিক", "Yearly": "বার্ষিক",
    "Tax on interest (%)": "সুদের উপর কর (%)",
    "you receive at maturity, after tax": "মেয়াদ শেষে করের পর আপনি পাবেন",
    "Deposit": "জমা",
    "Interest earned": "অর্জিত সুদ",
    "Tax on interest": "সুদের উপর কর",
    "Value before tax": "করের আগে মোট মূল্য",
    "How your deposit grows": "আপনার আমানত কীভাবে বাড়ে",
    "Your deposit": "আপনার জমা",

    "DPS Calculator": "ডিপিএস ক্যালকুলেটর",
    "See what a monthly deposit scheme (DPS) gives you at maturity.": "মাসিক সঞ্চয় প্রকল্প (ডিপিএস) মেয়াদ শেষে কত দেয় দেখুন।",
    "Monthly deposit (৳)": "মাসিক জমা (৳)",
    "Total you deposit": "মোট জমা",
    "How your savings grow": "আপনার সঞ্চয় কীভাবে বাড়ে",
    "What you deposit": "আপনি যা জমা দেন",
    "Value with interest": "সুদসহ মূল্য",

    "Savings Goal Planner": "সঞ্চয় লক্ষ্য পরিকল্পনা",
    "Find out how much to save every month to reach your goal.": "লক্ষ্যে পৌঁছাতে প্রতি মাসে কত সঞ্চয় করতে হবে জেনে নিন।",
    "Goal amount (৳)": "লক্ষ্যের পরিমাণ (৳)",
    "Time to reach it (years)": "লক্ষ্যে পৌঁছানোর সময় (বছর)",
    "Yearly interest on your savings (%)": "সঞ্চয়ের বার্ষিক সুদ (%)",
    "Already saved (৳)": "ইতিমধ্যে জমা (৳)",
    "Your goal": "আপনার লক্ষ্য",
    "Total you put in": "আপনার মোট জমা",
    "Interest you earn": "আপনার অর্জিত সুদ",

    "Early Loan Payoff": "আগাম ঋণ পরিশোধ",
    "See how much interest and time you save by paying extra every month.": "প্রতি মাসে বেশি দিলে কত সুদ ও সময় বাঁচে দেখুন।",
    "Extra payment each month (৳)": "প্রতি মাসে অতিরিক্ত পরিশোধ (৳)",
    "Monthly EMI": "মাসিক ইএমআই",
    "With extra payment": "অতিরিক্তসহ কিস্তি",

    "Budget Planner": "বাজেট পরিকল্পনা",
    "Compare your monthly spending with the 50/30/20 rule: 50% needs, 30% wants, 20% savings.": "৫০/৩০/২০ নিয়মের সাথে মাসিক খরচ মেলান: ৫০% প্রয়োজন, ৩০% চাহিদা, ২০% সঞ্চয়।",
    "Monthly income (৳)": "মাসিক আয় (৳)",
    "Needs: rent, food, transport, bills (৳)": "প্রয়োজন: ভাড়া, খাবার, যাতায়াত, বিল (৳)",
    "Wants: eating out, shopping, fun (৳)": "চাহিদা: বাইরে খাওয়া, কেনাকাটা, বিনোদন (৳)",
    "Savings (৳)": "সঞ্চয় (৳)",
    "Needs (50% target)": "প্রয়োজন (৫০% লক্ষ্য)",
    "Wants (30% target)": "চাহিদা (৩০% লক্ষ্য)",
    "Savings (20% target)": "সঞ্চয় (২০% লক্ষ্য)",

    "Loan Comparison": "ঋণ তুলনা",
    "Put two loan offers side by side and see which one costs less.": "দুটি ঋণ প্রস্তাব পাশাপাশি রেখে দেখুন কোনটি কম খরচের।",
    "Bank Rate Comparison": "ব্যাংক রেট তুলনা",
    "Doubling and Inflation": "দ্বিগুণ হওয়া ও মূল্যস্ফীতি",
    "Currency Converter": "মুদ্রা কনভার্টার",
    "Credit Score Simulator": "ক্রেডিট স্কোর সিমুলেটর",
    "Finance Flashcards": "ফিন্যান্স ফ্ল্যাশকার্ড",
    "Bank Dashboard": "ব্যাংক ড্যাশবোর্ড",
    "SQL Practice: BD Bank": "SQL প্র্যাকটিস: বিডি ব্যাংক",
    "Practice": "অনুশীলন", "Quiz": "কুইজ", "My queries": "আমার কুয়েরি",

    "Monthly payment and full repayment table.": "মাসিক কিস্তি ও পুরো পরিশোধের তালিকা।",
    "See what extra payments save you.": "অতিরিক্ত পরিশোধে কত বাঁচে দেখুন।",
    "Two loan offers, side by side.": "দুটি ঋণ প্রস্তাব পাশাপাশি।",
    "Fixed deposit maturity after tax.": "করের পর এফডিআর মেয়াদপূর্তির টাকা।",
    "Monthly deposit scheme maturity.": "মাসিক সঞ্চয় প্রকল্পের মেয়াদপূর্তি।",
    "How much to save each month.": "প্রতি মাসে কত সঞ্চয় করবেন।",
    "The 50/30/20 rule for your income.": "আপনার আয়ের জন্য ৫০/৩০/২০ নিয়ম।",
    "Rule of 72 and real FDR returns.": "৭২-এর নিয়ম ও এফডিআরের প্রকৃত রিটার্ন।",
    "Convert taka with your own rate.": "নিজের দেওয়া রেটে টাকা রূপান্তর।",
    "A made-up score and how to improve it.": "কাল্পনিক স্কোর ও উন্নতির উপায়।",
    "Compare FDR and loan rates.": "এফডিআর ও ঋণের রেট তুলনা।",
    "Banking terms to flip and learn.": "ব্যাংকিং শব্দ ওল্টান ও শিখুন।",
    "Practice, quiz and save your queries.": "অনুশীলন করুন, কুইজ দিন, কুয়েরি সেভ করুন।",
    "Charts drawn from SQL queries.": "SQL কুয়েরি থেকে আঁকা চার্ট।"
  };

  var rec = new WeakMap();
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, TD: 1, PRE: 1, CODE: 1 };
  var has = Object.prototype.hasOwnProperty;

  function skip(node) {
    for (var p = node.parentNode; p && p.nodeType === 1; p = p.parentNode) {
      if (SKIP[p.tagName]) return true;
    }
    return false;
  }

  function tr(node) {
    var r = rec.get(node);
    if (r && node.nodeValue === r.t) return;
    var s = node.nodeValue, k = s.trim();
    if (!k || skip(node)) return;
    var d = nav.contains(node) ? NAV : BN;
    if (has.call(d, k)) {
      var t = s.replace(k, function () { return d[k]; });
      rec.set(node, { o: s, t: t });
      node.nodeValue = t;
    }
  }

  function walk(root) {
    if (root.nodeType === 3) { tr(root); return; }
    if (root.nodeType !== 1) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = w.nextNode())) tr(n);
  }

  function restore() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = w.nextNode())) {
      var r = rec.get(n);
      if (r) {
        if (n.nodeValue === r.t) n.nodeValue = r.o;
        rec.delete(n);
      }
    }
  }

  var obs = new MutationObserver(function (list) {
    if (lang !== "bn") return;
    list.forEach(function (m) {
      if (m.type === "characterData") tr(m.target);
      else m.addedNodes.forEach(walk);
    });
  });
  obs.observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  var btn = document.createElement("button");
  btn.type = "button";
  btn.setAttribute("aria-label", "Switch language between English and Bangla");
  btn.style.cssText = "margin-left:auto;font:inherit;font-weight:600;padding:2px 12px;border:1px solid var(--accent);border-radius:999px;background:transparent;color:var(--accent);cursor:pointer";
  nav.appendChild(btn);

  function setLang(l) {
    lang = l;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    document.documentElement.lang = l;
    btn.textContent = l === "bn" ? "English" : "বাংলা";
    if (l === "bn") walk(document.body); else restore();
  }
  btn.addEventListener("click", function () { setLang(lang === "bn" ? "en" : "bn"); });
  setLang(lang);
})();