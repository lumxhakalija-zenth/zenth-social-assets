// ZENTH post template (approved by the team 24 Nov 2026).
// Headlines: Geist 600, -0.035em, line-height 1.02. NEVER Syne: the team rejected it twice (Z3, Z4) because it looks stretched.
// Body: Geist 400 in #b4b4ae. Labels: Geist Mono uppercase, tracked .16em. Wordmark: Space Grotesk 600, tracked .18em.
// Background #0A0A0A, text #F2F2EF, crop-mark crosses in the corners. 1080x1350.
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
// npm i playwright @fontsource/geist-sans @fontsource/geist-mono @fontsource/space-grotesk
const NM=path.dirname(path.dirname(require.resolve('@fontsource/geist-sans/package.json')));
const f=(p)=>'file://'+path.join(NM,p);
const css=`
@font-face{font-family:G;font-weight:400;src:url(${f('geist-sans/files/geist-sans-latin-400-normal.woff2')})}
@font-face{font-family:G;font-weight:500;src:url(${f('geist-sans/files/geist-sans-latin-500-normal.woff2')})}
@font-face{font-family:G;font-weight:600;src:url(${f('geist-sans/files/geist-sans-latin-600-normal.woff2')})}
@font-face{font-family:GM;font-weight:400;src:url(${f('geist-mono/files/geist-mono-latin-400-normal.woff2')})}
@font-face{font-family:SG;font-weight:600;src:url(${f('space-grotesk/files/space-grotesk-latin-600-normal.woff2')})}
*{box-sizing:border-box;margin:0}
body{width:1080px;height:1350px;background:#0A0A0A;color:#F2F2EF;font-family:G;position:relative;overflow:hidden}
.x{position:absolute;width:28px;height:28px}.x:before,.x:after{content:"";position:absolute;background:#4a4a46}
.x:before{left:13px;top:0;width:2px;height:28px}.x:after{top:13px;left:0;height:2px;width:28px}
.tl{left:46px;top:46px}.tr{right:46px;top:46px}.bl{left:46px;bottom:46px}.br{right:46px;bottom:46px}
.top,.foot{position:absolute;left:96px;right:96px;display:flex;justify-content:space-between;align-items:center}
.top{top:84px}.foot{bottom:84px}
.mono{font-family:GM;font-size:21px;letter-spacing:.16em;text-transform:uppercase;color:#9a9a94}
.word{font-family:SG;font-weight:600;font-size:30px;letter-spacing:.18em}
.main{position:absolute;left:96px;right:96px;top:200px;bottom:200px;display:flex;flex-direction:column;justify-content:center}
.h{font-weight:600;font-size:96px;line-height:1.02;letter-spacing:-0.035em}
.rule{width:96px;height:2px;background:#F2F2EF;opacity:.5;margin:56px 0 44px}
.p{font-size:34px;line-height:1.45;color:#b4b4ae;max-width:820px}
.rows{margin-top:52px;border-top:1px solid #2c2c29}
.row{display:flex;gap:36px;align-items:baseline;padding:26px 0;border-bottom:1px solid #2c2c29;font-size:34px}
.row .mono{min-width:40px;font-size:20px}
`;
const page=(tl,tr,body)=>`<!doctype html><html><head><meta charset=utf-8><style>${css}</style></head><body>
<i class="x tl"></i><i class="x tr"></i><i class="x bl"></i><i class="x br"></i>
<div class="top"><span class="mono">${tl}</span><span class="mono">${tr}</span></div>
<div class="main">${body}</div>
<div class="foot"><span class="word">ZENTH</span><span class="mono">zenth360.com</span></div></body></html>`;
// ---- edit the posts below: page(topLeftLabel, topRightLabel, bodyHtml) ----
const P={
 zl_shipped: page('Case study · SparkleDomain','Shipped',`<div class="h">SparkleDomain<br>is live.<br>Payments and all.</div><div class="rule"></div><div class="p">Product, design, code, checkout and the demand around it. Built end to end by our team, for ourselves first.</div>`),
 z4_boring_path_v3: page('Build notes','Launch',`<div class="h">Before launch,<br>walk the<br>boring path.</div>
  <div class="rows">${['Sign up with a fresh email','Find the welcome email','Reset the password','Open it all on a phone','Delete the account'].map((t,i)=>`<div class="row"><span class="mono">0${i+1}</span><span>${t}</span></div>`).join('')}</div>`),
 z5_demand_v2: page('Build notes','Grow',`<div class="h">Demand doesn’t<br>start on<br>launch day.</div><div class="rule"></div><div class="p">Start talking while you build. On day one, there should already be people waiting for it.</div>`),
};
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1080,height:1350}});fs.mkdirSync('out',{recursive:true});
for(const [n,h] of Object.entries(P)){const fp=path.resolve('out/'+n+'.html');fs.writeFileSync(fp,h);await pg.goto('file://'+fp);await pg.evaluate(()=>document.fonts.ready);await pg.screenshot({path:'out/'+n+'.png'});}
await b.close();console.log('ok');})();
