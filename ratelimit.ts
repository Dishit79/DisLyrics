

class MemoryStorage {

  storage: { [key: string]: any } = {}

  add(key:string) {
    if (this.storage[key]){
      this.storage[key]++
    }else{
      this.storage[key]=1
    }
    return(this.storage[key]);
  }
  decrement(key:string){
    if (this.storage[key]){
      this.storage[key]--
    }
  }
  resetAll(){
    console.log(this.storage);
    this.storage = {}
  }
  start(){
    console.log('started');
    setInterval(()=>{ this.resetAll() }, 10000)
  }
}



export function RateLimit() {

  let options = Object.assign({
  resetTime: 60 * 1000,
  maxReq: 5
  })
  options.store = new MemoryStorage()
  options.store.start()


  function rateLimit(req:any, res:any, next:any) {
    let key:any = req.ip

    let data = options.store.add(key)

    console.log(data);

    if (data > options.maxReq){
      options.store.decrement(key)
      return res.send("RATE LIMIT HIT")
    }
    next()

  }
  return rateLimit
}


/*let ra = RateLimit()
console.log(ra);
ra('142.32.236.321f')
ra('142.112333.232136.53')
ra('142.32.236.321f')
ra('142.112333.232136.53')
ra('142.112333.232136.53')
ra('142.112333.232136.53')
ra('142.112333.232136.53')
ra('142.112333.232136.53')*/
