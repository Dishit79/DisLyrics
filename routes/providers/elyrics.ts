import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";
//import { stringify } from "https://deno.land/std@0.101.0/encoding/csv.ts";

let songname = "Don't Say Goodbye (feat. Tove Lo)"

let t = JSON.stringify({q: songname})
const data = await fetch('https://www.elyrics.net/find.php', {
  method: "POST",
  body: t
})

const rawdat = await data.text()
const $ = cheerio.load(rawdat)
const $1 = $('#col-xl-6 inner_right p-0 mb-2').text()
console.log($1)
console.log(rawdat)

//const data = await fetch('https://www.elyrics.net/read/a/alok-&-ilkay-sencan-lyrics/don_t-say-goodbye-(feat.-tove-lo)-lyrics.html')
//const rawdat = await data.text()
//const $ = cheerio.load(rawdat)
//let t = $("#inlyr").text()
//console.log(t)
