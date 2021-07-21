import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";



export async function azlyrics(artist:string, title:string) {

  const deee = await fetch(`https://search.azlyrics.com/search.php?q=${artist}-${title}`)
  let t2 = await deee.text()
  const $1 = cheerio.load(t2)
  const f3 = $1('td > a').attr('href')


  const data = await fetch(f3!)
  const rawdat = await data.text()
  const $ = cheerio.load(rawdat)

  let t = $('div:not([class])').text()
  return(t)
}
