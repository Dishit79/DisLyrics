import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";


const data = await fetch('https://www.paroles.net/juice-wrld/paroles-bandit')
const rawdat = await data.text()
const $ = cheerio.load(rawdat)

let t = $(".song-text").text()
console.log(t)
