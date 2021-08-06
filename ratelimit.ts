// Memory storage for the ratelimit key's
class MemoryStorage {
  resetTime: number
   // Object to hold the key's
  storage: { [key: string]: any } = {}

  constructor(resetTime:number){
    this.resetTime = resetTime
  }
  // Add increments to the storage
  increment(key:string) {
    if (this.storage[key]){
      this.storage[key]++
    } else {
      this.storage[key] = 1
    }
    return(this.storage[key])
  }
  // decreases incremnets to the storage
  decrement(key:string){
    if (this.storage[key]){
      this.storage[key]--
    }
  }
  // Resets the storage Object
  resetAll(){
    console.log(this.storage);
    this.storage = {}
  }
  // Starts the scheduled resets
  start(){
    setInterval(()=>{ this.resetAll() }, this.resetTime)
  }
}

export function RateLimit(option:any) {

  // Creates the settings
  let options = Object.assign({
  resetTime: 60 * 1000,
  maxReq: 5,
  statusMessage: {error: 'ratelimit reached'},
  keyGenerator: function (req:any){return req.ip},
  }, option)

  options.store = new MemoryStorage(options.resetTime) 
  options.store.start()

  function rateLimit(req:any, res:any, next:any) {
    let key = options.keyGenerator(req)
    let data = options.store.increment(key)

    if (data > options.maxReq){
      options.store.decrement(key)
      return res.send(options.statusMessage)
    }
    next()
  }
  return rateLimit
}
