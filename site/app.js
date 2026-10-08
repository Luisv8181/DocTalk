let resources = [];

const $ = id => document.getElementById(id);
const uniq = a => [...new Set(a)].sort();

function fill(el, vals) {
  vals.forEach(v => {
    const o = document.createElement("option");
    o.value = v;
    o.textContent = v.replaceAll("-", " ");
    el.appendChild(o);
  });
}

function render() {
  const q = $("search").value.toLowerCase().trim();
  const a = $("audience").value;
  const t = $("topic").value;
  const y = $("type").value;

  const rows = resources.filter(r =>
    (!a || (r.audience || []).includes(a)) &&
    (!t || (r.topics || []).includes(t)) &&
    (!y || r.type === y) &&
    (!q || JSON.stringify(r).toLowerCase().includes(q))
  );

  $("count").textContent = rows.length + " resources";
  $("resources").innerHTML = rows.map(r => [
    '<article class="card ' + (r.emergency_resource ? "emergency" : "") + '">',
    r.emergency_resource ? '<p class="badge">Emergency / crisis resource</p>' : "",
    "<h3>" + r.name + "</h3>",
    "<p>" + (r.description || "") + "</p>",
    '<div class="tags">' + (r.topics || []).map(x => '<span class="tag">' + x.replaceAll("-", " ") + "</span>").join("") + "</div>",
    '<p class="meta"><strong>Audience:</strong> ' + (r.audience || []).join(", ") +
      '<br><strong>Access:</strong> ' + (r.access || []).join(" / ") +
      '<br><strong>Cost:</strong> ' + (r.cost || "verify") +
      '<br><strong>Region:</strong> ' + (r.region || []).join(", ") +
      '<br><strong>Evidence:</strong> ' + (r.evidence_level || "not classified") +
      '<br><strong>Reviewed:</strong> ' + (r.last_reviewed || "not recorded") + "</p>",
    '<p class="source"><strong>Source:</strong> ' + (r.source_organization || "not recorded") + "</p>",
    '<p class="limitation">' + (r.limitations || "") + "</p>",
    '<a href="' + r.official_url + '" target="_blank" rel="noopener noreferrer">Official resource →</a>',
    "</article>"
  ].join("")).join("") || "<p>No matching resources yet. Try another filter.</p>";
}

async function init() {
  try {
    const response = await fetch("generated/resources.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Catalog could not be loaded");
    resources = await response.json();

    fill($("audience"), uniq(resources.flatMap(r => r.audience || [])));
    fill($("topic"), uniq(resources.flatMap(r => r.topics || [])));
    fill($("type"), uniq(resources.map(r => r.type).filter(Boolean)));

    ["audience", "topic", "type", "search"].forEach(id =>
      $(id).addEventListener(id === "search" ? "input" : "change", render)
    );

    render();
  } catch (error) {
    $("count").textContent = "Catalog unavailable";
    $("resources").innerHTML = "<p>DocTalk could not load the current catalog. Please try again later.</p>";
    console.error(error);
  }
}

init();
