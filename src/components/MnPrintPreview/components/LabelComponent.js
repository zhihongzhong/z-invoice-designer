import { array2object, style2object } from '../../MnPrintPreviewDesign/utils/ComponentUtil.js';
import './LabelComponent.less';

export default {
  name: 'LabelComponent',
  
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
  methods: {
    attr2object() {
      return array2object(this.attributes);
    },
    emitClick() {
      this.$emit('click');
    },
    getValue() {
      const value = this.attributes.filter(attr=>attr.name === 'value')[0].value;
      const regExp = /{{(.*?)}}/;
      if(regExp.test(value)) {
        const actualValue = regExp.exec(value)[1];
        return this.dataSource[actualValue];
      }
      return value;
    },
    getLabelName() {
      return this.attributes.filter(attr=>attr.name === 'label')[0].value + ':';
    },
  },
  render(createElement) {
    const style =  style2object(this.styles);
    return createElement('div',
      {
        on: {
        },
        ref: 'root',
        class: {
          'label-component-root': true
        },
        style
      },
      [
        createElement('span', {
          domProps: {
            innerHTML: this.getLabelName()
          }
        }),
        createElement('span', {
          domProps: {
            innerHTML: this.getValue()
          }
        })
      ]);
  },
  created() {
  },
  beforeDestroy() {
  }
}