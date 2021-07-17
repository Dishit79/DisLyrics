import { opine, serveStatic, urlencoded, Router } from "https://deno.land/x/opine/mod.ts";
import { api } from "./routes/api.ts"


const app = opine();
const port = 5000
app.set("view cache", false);
app.use("/api", api)

app.get("/", (req,res)=> {
  res.send('Hello world')
})



app.listen(port);
console.log(`Opine started on localhost:${port}`);
