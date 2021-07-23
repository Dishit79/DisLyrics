import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";



function parseArtistTitle(artist:string, title:string) {
  let w = artist.replace(/ /g,"-")
  let y = title.replace(/ /g,"-")
  return [w, y]
}

function test(params:string) {
  let f3 = params.replace(/\n\n/g,"\n")
  f3 = f3.replace(/\n\n/g,"\n")
  return(f3);
}

export async function paroles(artist:string,title:string) {

  let [parsedArtist, parsedTitle] = parseArtistTitle(artist, title)
  const rawHtml = await fetch(`https://www.paroles.net/${parsedArtist}/paroles-${parsedTitle}`)
  const readableHtml = await rawHtml.text()
  const $ = cheerio.load(readableHtml)
  let t = $(".song-text").text()
  let f3 = test(t)
  return(f3)
}

export async function elyrics(artist:string,title:string) {

  let [parsedArtist, parsedTitle] = parseArtistTitle(artist, title)
  const rawHtml = await fetch(`https://www.elyrics.net/read/${parsedArtist[0]}/${parsedArtist}-lyrics/${parsedTitle}-lyrics.html`)
  const readableHtml = await rawHtml.text()
  const $ = cheerio.load(readableHtml)
  let t = $("#inlyr").text()
  return(t)
}

export async function azlyrics(artist:string, title:string) {

  const rawHtml = await fetch(`https://search.azlyrics.com/search.php?q=${artist}-${title}`)
  let readableHtml = await rawHtml.text()
  const $ = cheerio.load(readableHtml)
  const songUrl = $('td > a').attr('href')

  if (!songUrl) {
    return {lyrics:'non'}
  }

  const rawHtml1 = await fetch(songUrl!)
  const readableHtml1 = await rawHtml1.text()
  const $1 = cheerio.load(readableHtml1)
  let t = $1('div:not([class])').text()
  return(t)
}
