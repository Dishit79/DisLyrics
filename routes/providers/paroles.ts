import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";


export async function paroles(artist:string,title:string) {
  console.log(artist);

  let w = artist.replace(" ", "-")
  let y = title.replace(" ", "-")
  const data = await fetch(`https://www.paroles.net/${w}/paroles-${y}`)
  const rawdat = await data.text()
  const $ = cheerio.load(rawdat)

  let t = $(".song-text").text()
  console.log(t)
  return(t)

}
