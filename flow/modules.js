declare module 'popper.js' {
  declare var exports: any
}

declare module 'classnames' {
  declare var exports: {
    (): any
  }
}

declare module 'react-click-outside' {
  declare var exports: {
    (module: any): any
  }
}

declare module 'throttle-debounce/throttle' {
  declare var exports: {
    (...args: Array<any>): any
  }
}

declare module 'throttle-debounce/debounce' {
  declare var exports: {
    (...args: Array<any>): any
  }
}

declare module 'async-validator' {
  declare class AsyncValidator {
    constructor(options: Object): void;
    validate(...args: Array<any>): void;
  }
  declare var exports: typeof AsyncValidator;
}
