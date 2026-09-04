import { chromium } from '@playwright/test';
import fs from 'node:fs';
const out='/mnt/d/01 Main Work/Boots/Agentic AI/mission-control/manual-assets'; fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const routes=[
 ['cms-dashboard','http://127.0.0.1:3100/dashboard'],
 ['cms-users','http://127.0.0.1:3100/dashboard/users'],
 ['cms-data','http://127.0.0.1:3100/dashboard/data'],
 ['cms-settings','http://127.0.0.1:3100/dashboard/settings'],
 ['cms-page-builder','http://127.0.0.1:3100/dashboard/page-builder'],
 ['cms-agents','http://127.0.0.1:3100/dashboard/agents'],
];
for(const [name,url] of routes){const p=await browser.newPage({viewport:{width:1440,height:1000}});try{const r=await p.goto(url,{waitUntil:'networkidle',timeout:180000});await p.screenshot({path:`${out}/${name}.png`,fullPage:true});console.log(JSON.stringify({name,status:r?.status()??null,title:await p.title(),url:p.url()}));}catch(e){await p.screenshot({path:`${out}/${name}.png`,fullPage:true}).catch(()=>{});console.log(JSON.stringify({name,error:String(e),url:p.url()}));}await p.close();}await browser.close();
