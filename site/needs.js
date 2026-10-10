let needs = [];
let resourcesById = {};

const $ = id => document.getElementById(id);
const uniq = a => [...new Set(a)].sort();
const esc = s => String(s ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

function fill(el, vals) {
  vals.forEach(v => {
    const o = document.createElement("option");
    o.value = v;
    o.textContent = v.replaceAll("-", " ").replaceAll("/", " / ");
    el.appendChild(o);
  });
}

function relatedList(ids) {
  const items = (ids || [])
    .map(id => resourcesById[id])
    .filter(Boolean);
  if (!items.length) return "";
  return '<p class="meta"><strong>While you wait, these exist:</strong></p><ul>' +
    items.map(r =>
      '<li><a href="' + esc(r.official_url) + '" target="_blank" rel="noopener noreferrer">' +
      esc(r.name) + "</a></li>"
    ).join("") + "</ul>";
}

function render() {
  const q = $("search").value.toLowerCase().trim();
  const a = $("audience").value;
  const d = $("domain").value;
  const s = $("status").value;

  const rows = needs.filter(n =>
    (!a || (n.audience || []).includes(a)) &&
    (!d || (n.domains || []).includes(d)) &&
    (!s || n.status === s) &&
    (!q || JSON.stringify(n).toLowerCase().includes(q))
  );

  $("count").textContent = rows.length + (rows.length === 1 ? " need" : " needs");
  $("needs").innerHTML = rows.map(n => [
    '<article class="card">',
    '<p class="tag">' + esc((n.status || "submitted").replaceAll("-", " ")) + "</p>",
    "<h3>" + esc(n.title) + "</h3>",
    "<p>" + esc(n.description) + "</p>",
    "<p><strong>Why it matters:</strong> " + esc(n.why_it_matters) + "</p>",
    '<div class="tags">' + (n.domains || []).map(x => '<span class="tag">' + esc(x.replaceAll("/", " / ")) + "</span>").join("") + "</div>",
    '<p class="meta"><strong>Audience:</strong> ' + esc((n.audience || []).join(", ")) +
      '<br><strong>Shared via:</strong> ' + esc(n.submitted_via || "not recorded") +
      '<br><strong>Recorded:</strong> ' + esc(n.created_date || "not recorded") + "</p>",
    relatedList(n.related_resources),
    n.submitted_ref
      ? '<p class="source"><strong>Source:</strong> <a href="' + esc(n.submitted_ref) + '" target="_blank" rel="noopener noreferrer">provenance</a></p>'
      : "",
    "</article>"
  ].join("")).join("") ||
    '<p>No needs recorded yet. <a href="https://github.com/Luisv8181/DocTalk/discussions">Share one in the discussion</a>.</p>';
}

async function init() {
  try {
    const [needsRes, resourcesRes] = await Promise.all([
      fetch("generated/needs.json", { cache: "no-store" }),
      fetch("generated/resources.json", { cache: "no-store" })
    ]);
    if (!needsRes.ok) throw new Error("Needs could not be loaded");
    needs = await needsRes.json();
    if (resourcesRes.ok) {
      const resources = await resourcesRes.json();
      resources.forEach(r => { if (r.id) resourcesById[r.id] = r; });
    }

    fill($("audience"), uniq(needs.flatMap(n => n.audience || [])));
    fill($("domain"), uniq(needs.flatMap(n => n.domains || [])));
    fill($("status"), uniq(needs.map(n => n.status).filter(Boolean)));

    ["audience", "domain", "status", "search"].forEach(id =>
      $(id).addEventListener(id === "search" ? "input" : "change", render)
    );

    render();
  } catch (error) {
    $("count").textContent = "Needs unavailable";
    $("needs").innerHTML = "<p>DocTalk could not load the Needs Wall. Please try again later.</p>";
    console.error(error);
  }
}

init();
