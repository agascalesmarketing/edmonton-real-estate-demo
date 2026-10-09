import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {properties,neighbourhoods} from '../src/data.mjs';
const manifest=JSON.parse(fs.readFileSync('site-manifest.json','utf8'));
const required=['/','/about/','/buy/','/sell/','/properties/','/properties/sample-home-1/','/neighbourhoods/','/neighbourhoods/glenora/','/resources/','/contact/'];
for(const route of required)assert(manifest.some(p=>p.route===route),`Missing required route ${route}`);
assert.equal(properties.length,6);assert.equal(neighbourhoods.length,5);
assert.equal(new Set(manifest.map(p=>p.title)).size,manifest.length,'Titles must be unique');
assert.equal(new Set(manifest.map(p=>p.description)).size,manifest.length,'Descriptions must be unique');
let files=0,links=0;
for(const directory of ['offline-preview','netlify-deploy']){
 for(const p of manifest){
  const file=path.resolve(directory,p.route==='/'?'index.html':p.route.slice(1)+'index.html');
  const html=fs.readFileSync(file,'utf8');files++;
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${file}: expected one H1`);
  assert(html.includes('<meta name="description"'),`${file}: meta description`);
  assert(html.includes('<main id="main"'),`${file}: semantic main`);
  assert(html.includes('fictional'),`${file}: clear demo disclosure`);
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
   const target=match[1];if(target.startsWith('https://'))continue;if(target.startsWith('#')){assert(html.includes(`id="${target.slice(1)}"`),`${file}: broken anchor ${target}`);continue;}
   assert(!target.startsWith('/'),`${file}: expected relative path ${target}`);
   let resolved=path.resolve(path.dirname(file),target.split('#')[0]);
   assert(fs.existsSync(resolved),`${file}: missing ${target}`);
   if(fs.statSync(resolved).isDirectory()){assert.equal(directory,'netlify-deploy',`${file}: offline links must specify index.html`);resolved=path.join(resolved,'index.html');assert(fs.existsSync(resolved));}
   links++;
  }
  for(const match of html.matchAll(/<img\b[^>]*>/g))assert(/alt="[^"]+"/.test(match[0]),`${file}: missing image description`);
  if(html.includes('data-demo-form')){assert(html.includes('<fieldset class="demo-form" disabled>'),'Forms disabled without JavaScript');assert(!html.includes('data-netlify'),'No Netlify form handling');}
 }
 const css=fs.readFileSync(directory+'/assets/style.css','utf8');for(const match of css.matchAll(/url\('([^']+)'\)/g))assert(fs.existsSync(path.join(directory,'assets',match[1])),'Missing font');
}
const script=fs.readFileSync('src/assets/site.js','utf8');
assert(!/fetch\(|XMLHttpRequest|localStorage|sessionStorage|sendBeacon|document\.cookie/.test(script),'No network or storage in demo');
assert(!fs.existsSync('netlify-deploy/_redirects'),'Directory pages require no SPA fallback');
console.log(`PASS: ${files} generated HTML pages, ${links} local links/assets, required routes, unique SEO metadata, disclosures, images, fonts, and form safeguards.`);
