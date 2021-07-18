import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";
//import { stringify } from "https://deno.land/std@0.101.0/encoding/csv.ts";


export async function elyrics(artist:string,title:string) {

  let w = artist.replace(/ /g,"-")
  let y = title.replace(/ /g,"-")
  const data = await fetch(`https://www.elyrics.net/read/${w[0]}/${w}-lyrics/${y}-lyrics.html`)
  const rawdat = await data.text()
  const $ = cheerio.load(rawdat)
  let t = $("#inlyr").text()
  return(t)

}
