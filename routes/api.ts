import { Router } from "https://deno.land/x/opine/mod.ts";
import { azlyrics, elyrics, paroles } from "./providers.ts";

export const api = new Router
// Parse inputs for lyrics search
async function parseInput(name:string) {
  const rawData = await fetch(`http://api.deezer.com/search?limit=1&q=${name.replace(/ *\([^)]*\) */g, "")}`)
  let data = await rawData.json()
  if (data['total']==0){
    return({title:'None Result',artist:'None Result',cover:'None Result'})
  }
  return({title:data['data'][0]['title'],artist:data['data'][0]['artist']['name'], cover:data['data'][0]['album']['cover']}) // 'title' can be replaced with 'title_short'

}

//main endpoint to get lyrics
api.get("/lyrics/search", async (req,res) => {

  if (!req.query.q) {
    res.setStatus(400).send({status:400, error:'no valid search query'})
  }

  let startTime = Date.now()
  const parsedName = await parseInput(req.query.q)

  let [aResult, bResult, cResult] = await Promise.all([paroles(parsedName['artist'],parsedName['title']), elyrics(parsedName['artist'],parsedName['title']), azlyrics(parsedName['artist'],parsedName['title'])]);
  res.send({title:parsedName['title'],artist:parsedName['artist'],cover:parsedName['cover'],lyrics:[aResult, bResult, cResult], time_taken:(Date.now() - startTime)/1000})
  //await logDiscord(req, parsedName.artist, parsedName.title, startTime, req.query.q)
})


async function logDiscord(req:any,  artist:string, title:string, startTime:number, originalQuery:string) {
  await fetch('https://discord.com/api/webhooks/871867199948746833/y8P440FiSohnLe7ytZfhPR0S2-0NdguMNLpZ0CnvNinGQED2TPBdBfjvphpqJ_ww0Y-A', {
    method: 'post',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify({
      username: 'DisLyrics',
      avatar_url:
        'https://media.discordapp.net/attachments/850118883088138271/873052756003405844/unknown.png', //Webhook avatar url
      content:
        `Endpoint called ${artist}-${title} (${originalQuery}), Time took ${(Date.now() - startTime)/1000}, From ${req.ip}`, //Webhook message
    })
  })

}
