declare module 'classnames' {
  declare export default function classnames(): any
}

declare module 'react-click-outside' {
  declare export default function enhanceWithClickOutside(module: any): any
}

declare module 'throttle-debounce/throttle' {
  declare export default function throttle(...args: Array<any>): any
}

declare module 'throttle-debounce/debounce' {
  declare export default function debounce(...args: Array<any>): any
}

declare module 'async-validator' {
  declare class AsyncValidator {
    constructor(options: Object): void;
    validate(...args: Array<any>): void;
  }
  declare export default typeof AsyncValidator;
}
