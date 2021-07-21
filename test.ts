import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";



const deee = await fetch('https://search.azlyrics.com/search.php?q=Eminem+-+Venom')
let t2 = await deee.text()
//console.log(t);

const $1 = cheerio.load(t2)

const f3 = $1('td > a').attr('href')

console.log(f3);

const data = await fetch(f3!)
const rawdat = await data.text()
const $ = cheerio.load(rawdat)
let t = $('body > div').next().html()
console.log(t);
