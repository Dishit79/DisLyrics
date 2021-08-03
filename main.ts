import { opine, serveStatic, urlencoded, Router } from "https://deno.land/x/opine/mod.ts";
import { dirname, join } from "https://deno.land/x/opine/deps.ts";
import { api } from "./routes/api.ts"
import { RateLimit } from "./ratelimit.ts"


const app = opine()
const port = 5000
app.set("view cache", false)
const __dirname = dirname(import.meta.url)
app.use("/api", api)

app.get("/", (req,res)=> {
  res.send('Hello world')
})


const rr = RateLimit()

app.get("/test", rr, async (req,res)=> {
  res.sendFile(join(__dirname,'./public/index.html'))
})




app.listen(port);
console.log(`Opine started on localhost:${port}`)
