export class IDGenerator {
  constructor(){
    this.id = 0
  }

  next(){
    return this.id++ & 0xffff
  }
}