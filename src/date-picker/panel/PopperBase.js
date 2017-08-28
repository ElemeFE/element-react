import { PropTypes, Component } from '../../../libs';
import { PopperReactMixin } from '../../../libs/utils'

export class PopperBase extends Component{
  static get propTypes() {
    return {
      //()=>HtmlElement
      getPopperRefElement: PropTypes.func,
      popperMixinOption: PropTypes.object
    }
  }

  constructor(props) {
    super(props)

    PopperReactMixin.call(this, () => this.refs.root, props.getPopperRefElement, Object.assign({
      boundariesPadding: 0,
      gpuAcceleration: false
    }, props.popperMixinOption));
  }
}