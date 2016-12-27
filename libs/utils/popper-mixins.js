import PopperJS from 'popper.js';
import {require_condition} from './assert'

const MixinMethods = {
    //---------- start: public methods
    /**
     * @param {HTMLElement} popupElement - The reference element used to position the popper.
     * @param {HTMLElement} refElement - The HTML element used as popper, or a configuration used to generate the popper.
     * @param {object} popperOptions, PopperJS options
     */
  createPopper(popupElement, refElement, popperOptions) {
    require_condition(popupElement && refElement)
    if (!popperOptions) {
      popperOptions = {}
    }

    const {visibleArrow, placement, zIndex, offset} = this._popper_config
    if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(placement)) {
      return;
    }

    const popper = popupElement
    const reference = refElement

    if (!popper || !reference) return;
    if (visibleArrow) this._appendArrow(popper);
    if (this._poperJS) {
      this._poperJS.destroy();
    }

    // these options are perserved only for smooth the migiration from eleme/element
    if (!popperOptions.placement) {
      popperOptions.placement = placement;
    }
    if (!popperOptions.offset) {
      popperOptions.offset = offset;
    }

    this._poperJS = new PopperJS(reference, popper, popperOptions);

    this._poperJS.onCreate(() => {
      this._resetTransformOrigin();
      this._popper_state.isCreated = true
      this._poperJS._popper.style.zIndex = zIndex
    });
  },

  destroyPopper () {
    if (this._poperJS && this._popper_state.isCreated) {
      this._poperJS.destroy();
      this._poperJS = null;
      this._popper_state = {}
      this._popper_config = {}
    }
  },

  updatePopper() {
    if (!this._poperJS && this._popper_state.isCreated) return;
    this._poperJS.update();
  },

  //---------- end: public methods

  _resetTransformOrigin() {
    let placementMap = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
    let placement = this._poperJS._popper.getAttribute('x-placement').split('-')[0];
    let origin = placementMap[placement];
    this._poperJS._popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1
      ? `center ${origin}`
      : `${origin} center`;
  },

  _appendArrow(element) {
    if (this._popper_state.appended) {
      return;
    }
    this._popper_state.appended = true;
    const arrow = document.createElement('div');
    arrow.setAttribute('x-arrow', '');
    arrow.className = 'popper__arrow';
    element.appendChild(arrow);
  }
}

/**
 * @param {object} config
    * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -right), left(-start, -end)
    * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
    * @param {Number} [boundariesPadding=5]
    * @param {Boolean} [visibleArrow=false] Visibility of the arrow, no style.
*/
export function PopperMixin(config) {
  this._popper_config = Object.assign(
    {}, {
      zIndex: 100,
      offset: 0,
      placement: 'bottom',
      boundariesPadding: 5,
      visibleArrow: false,
    }, config)
  this._popper_state = {}

  for (const m in MixinMethods){
    this[m] = MixinMethods[m]
  }
}


const PopperReactMixinMethods = {
  hookReactLifeCycle(getPopperRootDom, getRefDom) {

    const componentDidMount = this.componentDidMount
    const componentWillUnmount = this.componentWillUnmount

    this.componentDidMount = function (...args) {
      const root = getPopperRootDom()
      const ref = getRefDom()
      require_condition(root, 'method `getPopperRootDom()` require a HTMLElement instance when componentDidMount is called')
      require_condition(ref, 'method `getRefDom()` require a HTMLElement instance when componentDidMount is called')

      this.createPopper(root, ref)
      this._animateRef = window.requestAnimationFrame(this.updatePopper.bind(this));

      if (typeof componentDidMount === 'function') {
        componentDidMount.apply(this, args)
      }
    }

    this.componentWillUnmount = function (...args) {
      window.cancelAnimationFrame(this._animateRef);
      this.destroyPopper()

      if (typeof componentWillUnmount === 'function') {
        componentWillUnmount.apply(this, args)
      }
    }

  }
}

/**
 * this Mixin provide utility method to hook reactjs component lifecycle
 *
 * @param getPopperRootDom: ()=>HTMLElement, return your popper root HTMLElement when componentDidMout is called
 * @param {args} @see PopperMixin
 */
export function PopperReactMixin(getPopperRootDom, getRefDom, ...args) {
  require_condition(typeof getPopperRootDom === 'function', '`getPopperRootDom` func is required!')
  require_condition(typeof getRefDom === 'function', '`getRefDom` func is required!')

  PopperMixin.apply(this, args)

  for (const m in PopperReactMixinMethods) {
    this[m] = PopperReactMixinMethods[m]
  }

  this.hookReactLifeCycle(getPopperRootDom, getRefDom)

  return this
}

PopperReactMixin.prototype = PopperMixin.prototype
