
class ErrorConditionFailed extends Error{
  constructor(...args){
    super(args)
  }
}


export function require_condition(condition, msg = 'pre-condition failed'){
  if (!condition){
    throw new ErrorConditionFailed(msg)
  }
}


export function watchPropertyChange(target, property, cb) {
  require_condition(
    target != null && 
    typeof property === 'string' && 
    typeof cb === 'function', 'invalid arguments')

  let cache = null
  if (!target.__watch_cache){
    target.__watch_cache = {}
  }
  cache = target.__watch_cache

  require_condition(cache[property] == null, `duplicated watch on ${target} 's ${property}`)
  cache[property] = cb
  
  let origin = target[property]

  Object.defineProperty(target, property, {
    get() {
      return origin
    },

    set(value) {
      origin = value
      if (cache[property]){
        console.debug('trigger change: ', property, origin)
        cache[property](origin)
      }
    }
  })

  return ()=>{
    if (target.__watch_cache && target.__watch_cache[property]){
      delete target.__watch_cache[property]
    }
  }
}