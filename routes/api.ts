import { Router } from "https://deno.land/x/opine/mod.ts";
import { azlyrics, elyrics, paroles } from "./providers.ts";

export const api = new Router


// Parse inputs for lyrics search
async function parseInput(name:string) {
  const rawData = await fetch(`http://api.deezer.com/search?limit=1&q=${name.replace(/ *\([^)]*\) */g, "")}`)
  let data = await rawData.json()
  return({title:data['data'][0]['title'],artist:data['data'][0]['artist']['name']}) // 'title' can be replaced with 'title_short'

}
api.get("/lyrics/:name", async (req,res) => {

  const parsedName = await parseInput(req.params.name)

  let [aResult, bResult, cResult] = await Promise.all([paroles(parsedName['artist'],parsedName['title']), elyrics(parsedName['artist'],parsedName['title']), azlyrics(parsedName['artist'],parsedName['title'])]);

  res.send({lyrics1:aResult, lyrics2:bResult, lyrics3:cResult})

})
