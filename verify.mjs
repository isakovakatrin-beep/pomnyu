import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const buttons=Array.from({length:10},(_,i)=>({dataset:{step:String(i%5)},attrs:{},setAttribute(k,v){this.attrs[k]=v},addEventListener(_,f){this.click=f}}));
const dots=Array.from({length:10},(_,i)=>({dataset:{dot:String(i%5)},on:false,classList:{toggle(_,v){dots[i].on=v}}}));
const canvas=()=>({style:{},setAttribute(){}});const els={'.desktop':canvas(),'.mobile':canvas(),longread:canvas(),status:{textContent:''}};let mobile=false;let resize;
vm.runInNewContext(fs.readFileSync('dist/app.js','utf8'),{document:{querySelectorAll:s=>s==='[data-step]'?buttons:dots,querySelector:s=>els[s],getElementById:s=>els[s]},matchMedia:()=>({matches:mobile}),innerWidth:1440,addEventListener:(_,fn)=>resize=fn});
for(const i of [0,1,2,4]){buttons[i].click();assert.equal(buttons[i].attrs['aria-pressed'],'true');assert.equal(buttons[i+5].attrs['aria-pressed'],'true');assert.equal(dots[i].on,true)}
buttons[3].click();assert.equal(dots[2].on,false);assert.equal(dots[3].on,true);buttons[3].click();assert.equal(dots[3].on,false);
assert.equal(els.longread.style.height,'6373px');
const html=fs.readFileSync('dist/index.html','utf8');for(const [,url]of html.matchAll(/(?:src|href)="([^"]+)"/g)){if(!/^https?:/.test(url))assert(fs.statSync('dist/'+url).size>0,url)}assert(!html.includes('figma.com/api'));assert.equal((html.match(/data-step=/g)||[]).length,10);
console.log('PASS: five actions, exclusive choice, toggle-off, mirrored responsive states, desktop sizing, and all asset references.');
