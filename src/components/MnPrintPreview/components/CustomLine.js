import { style2object } from '../../MnPrintPreviewDesign/utils/ComponentUtil'
import './CustomLine.less';

export default {
  name: 'CustomLine',
  
  props: {
    tagName: String,
    attributes: {
      type: Array,
      default: ()=> []
    },
    styles: {
      type: Array,
      default: ()=> []
    },
    setProperties: {
      type: Function,
      default: (styles, attributes)=> {}
    },
    lineType: String, // verticalLine, horizontalLine
  },
  
  data() {
    return {
      showBorder: false,
      transform: ''
    }
  },
  methods: {
    toTransform(offsetX, offsetY) {
      return this.lineType === 'horizontalLine' ? `translateY(${offsetY}px)` : `translateX(${offsetX}px)`
    },
  },
  
  render(createElement) {
    const style =  style2object(this.styles);
    return createElement(
      'div',
      {
        class: {
          'custom-line-for-print-root': true
        },
        style,
        ref: 'root'
      },
      [
      ]
    );
  },
  created() {
  },
  beforeDestroy() {
  }
}