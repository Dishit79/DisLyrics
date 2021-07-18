import { Router } from "https://deno.land/x/opine/mod.ts";
import { paroles } from "./providers/paroles.ts";
import { elyrics } from "./providers/elyrics.ts";

export const api = new Router


// Parse inputs for lyrics search
async function parseInput(name:string) {
  const rawData = await fetch(`http://api.deezer.com/search?limit=1&q=${name.replace(/ *\([^)]*\) */g, "")}`)
  let y = await rawData.json()
  return({title:y['data'][0]['title'],artist:y['data'][0]['artist']['name']}) // 'title' can be replaced with 'title_short'

}

api.get("/rip/:id", async function r(req, res) {
  let data = await parseInput(req.params.id)

  let lyrics = await paroles(data['artist'], data['title'])
  res.send({lyrics:lyrics})
})


api.get("/rip2/:id", async function r(req, res) {
  let data = await parseInput(req.params.id)

  let lyrics = await elyrics(data['artist'], data['title'])
  res.send({lyrics:lyrics})
})
