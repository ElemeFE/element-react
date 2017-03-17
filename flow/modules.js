declare module 'classnames' {
  declare var exports: {
    (): any
  }
}

declare module 'react-click-outside' {
  declare var exports: {
    (): any
  }
}

declare module 'throttle-debounce/throttle' {
  declare var exports: {
    (): any
  }
}

declare module 'throttle-debounce/debounce' {
  declare var exports: {
    (): any
  }
}

declare module 'async-validator' {
  declare class AsyncValidator {
    constructor(options: Object): void;
    validate(param?: any): void;
  }
  declare var exports: typeof AsyncValidator;
}
