import './DynamicComponent.less';
import { array2object, style2object } from '../../MnPrintPreviewDesign/utils/ComponentUtil.js';
import { rectIn } from '../../MnPrintPreviewDesign/utils/GraphicUtils.js';

export default {
  name: 'DynamicComponent',
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
    dataSource: {
      type: Object,
      default: ()=> ({})
    }
  },
  data() {
    return {
      showBorder: false,
      isMouseDown: false,
      transform: '',
    }
  },
  methods: {
    attr2object() {
      return array2object(this.attributes);
    },
    getValue() {
      const value = this.attributes.filter(attr=>attr.name === 'value')[0].value;
      const regExp = /{{(.*?)}}/;
      let actualValue;
      
      if(regExp.test(value)) {
        actualValue = regExp.exec(value)[1];
        actualValue = this.dataSource[actualValue];
      } else {
        actualValue = value;
      }
      return this.getPrefix() + actualValue + this.getSuffix();
    },
    
    getPrefix() {
      const prefix = this.attributes.filter(attr=>attr.name === 'prefix');
      if(prefix.length > 0) return prefix[0].value;
      return '';
    },
    getSuffix() {
      const suffix = this.attributes.filter(attr=>attr.name === 'suffix');
      if(suffix.length > 0) return suffix[0].value;
      return '';
    },
    in(xPos, yPos) {
      if(!this.$refs.root) return false;
      const {left, top, width, height } = this.$refs.root.getBoundingClientRect();
      const right = left + width;
      const bottom = top + height;
      return rectIn(xPos, yPos, left, right, top, bottom);
    },
    
    stroke() {
      this.showBorder = true;
    },
    unStroke() {
      this.showBorder = false;
    },
  },
 
  render(createElement) {
    const style =  style2object(this.styles);
    
    return createElement(
      this.tagName,
      {
        attrs: this.attr2object(),
        style,
        class: {
          'dynamic-component-root': true,
          'dynamic-component-bordered': this.showBorder
        },
        domProps: {
          innerHTML: this.getValue(),
        },
        ref: 'root'
      },
    );
  },
  
  created() {
  },
  beforeDestroy() {
  }
}