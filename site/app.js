const resources = [
  {id:"988",name:"988 Suicide & Crisis Lifeline",audience:["general","medical-student","resident","physician"],type:"crisis-support",topics:["suicide-prevention","crisis-support","mental-health"],region:"US",cost:"free",access:"phone / text / chat",emergency:true,url:"https://988lifeline.org/",description:"National crisis-support entry point."},
  {id:"physician-support",name:"Physician Support Line",audience:["medical-student","resident","physician"],type:"peer-support",topics:["physician-wellbeing","peer-support","stress"],region:"US",cost:"free",access:"phone",emergency:false,url:"https://www.physiciansupportline.com/",description:"Clinician-oriented peer support resource."},
  {id:"fsphp",name:"Federation of State Physician Health Programs",audience:["physician","resident","fellow"],type:"physician-health-program",topics:["physician-wellbeing","mental-health","substance-use"],region:"US",cost:"varies",access:"web / referral",emergency:false,url:"https://www.fsphp.org/",description:"Directory and federation information for state physician health programs."},
  {id:"nami-hcp",name:"NAMI Peer Support Resources for Health Care Professionals",audience:["medical-student","resident","physician"],type:"peer-support",topics:["peer-support","mental-health","help-seeking"],region:"US",cost:"free",access:"web",emergency:false,url:"https://www.nami.org/frontline-professionals/health-care-professionals/peer-support-resources/",description:"Peer-support pathways and organizations relevant to health care professionals."},
  {id:"stanford-pfi",name:"Stanford Professional Fulfillment Index",audience:["physician","resident","fellow","educator","researcher"],type:"assessment",topics:["burnout","professional-fulfillment","measurement"],region:"Global",cost:"varies",access:"web",emergency:false,url:"https://wellmd.stanford.edu/wellbeing-toolkit/professional-fulfillment-index.html",description:"Instrument for assessing burnout and professional fulfillment."},
  {id:"joint-commission",name:"Joint Commission Workforce Safety & Well-Being Resource Center",audience:["physician","resident","educator","institution"],type:"policy",topics:["workforce-wellbeing","burnout","organizational-change"],region:"US",cost:"free",access:"web",emergency:false,url:"https://www.jointcommission.org/en-us/knowledge-library/workforce-safety-and-well-being-resource-center/worker-well-being",description:"Organizational workforce wellbeing resources."}
];

const $=id=>document.getElementById(id);
const uniq=a=>[...new Set(a)].sort();
const fill=(el,vals)=>vals.forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v.replaceAll("-"," ");el.appendChild(o)});
fill($("audience"),uniq(resources.flatMap(r=>r.audience)));
fill($("topic"),uniq(resources.flatMap(r=>r.topics)));
fill($("type"),uniq(resources.map(r=>r.type)));

function render(){
 const q=$("search").value.toLowerCase();
 const a=$("audience").value,t=$("topic").value,y=$("type").value;
 const rows=resources.filter(r=>(!a||r.audience.includes(a))&&(!t||r.topics.includes(t))&&(!y||r.type===y)&&(!q||(r.name+" "+r.description+" "+r.topics.join(" ")).toLowerCase().includes(q)));
 $("count").textContent=rows.length+" resources";
 $("resources").innerHTML=rows.map(r=>`<article class="card ${r.emergency?"emergency":""}"><h3>${r.name}</h3><p>${r.description}</p><div class="tags">${r.topics.map(x=>`<span class="tag">${x.replaceAll("-"," ")}</span>`).join("")}</div><p class="meta"><strong>Audience:</strong> ${r.audience.join(", ")}<br><strong>Access:</strong> ${r.access}<br><strong>Cost:</strong> ${r.cost}<br><strong>Region:</strong> ${r.region}</p><a href="${r.url}" target="_blank" rel="noopener noreferrer">Official resource →</a></article>`).join("")||"<p>No matching resources yet. Try another filter.</p>";
}
["audience","topic","type","search"].forEach(id=>$(id).addEventListener(id==="search"?"input":"change",render));render();
