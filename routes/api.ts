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

  if (!req.query.name) {
    res.setStatus(400).send({status:400, error:'no valid search query'})
  }

  let startTime = Date.now()
  const parsedName = await parseInput(req.query.name)

  let [aResult, bResult, cResult] = await Promise.all([paroles(parsedName['artist'],parsedName['title']), elyrics(parsedName['artist'],parsedName['title']), azlyrics(parsedName['artist'],parsedName['title'])]);
  res.send({title:parsedName['title'],artist:parsedName['artist'],cover:parsedName['cover'],lyrics:[aResult, bResult, cResult], time_taken:(Date.now() - startTime)/1000})

})
