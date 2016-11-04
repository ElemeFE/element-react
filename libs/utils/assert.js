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
