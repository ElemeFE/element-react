import { ExtendableError } from './errors'

class ErrorConditionFailed extends ExtendableError {
  constructor(...args) {
    super(args)
  }
}

export function require_condition(condition, msg = 'pre-condition failed') {
  if (!condition) {
    throw new ErrorConditionFailed(msg)
  }
}
