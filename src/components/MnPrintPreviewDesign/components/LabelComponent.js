import { rectIn } from '../utils/GraphicUtils'
import { array2object, style2object } from '../utils/ComponentUtil'
import DraggableMixin from '../mixins/DraggableMixin'

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
  },
  mixins: [ DraggableMixin ],
  data() {
    return {
      currentX: 0,
      currentY: 0,
      showBorder: false,
      isMouseDown: false,
      transform: '',
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
      return this.attributes.filter(attr=>attr.name === 'value')[0].value;
    },
    getLabelName() {
      return this.attributes.filter(attr=>attr.name === 'label')[0].value + ':';
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
  
    if(this.transform !== '') {
      style['transform'] = this.transform;
      style['z-index'] = 200;
    }
    
    return createElement('div',
      {
        on: {
          click: this.emitClick,
          mousedown: this.onMouseDown,
          mousemove: this.onMouseMove,
          mouseleave: this.onMouseLeave,
          mouseup: this.onMouseUp
        },
        ref: 'root',
        class: {
          'label-component-root': true,
          'label-component-bordered': this.showBorder
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
    if(this.container) {
      this.container.addChildFront(this);
    }
  },
  beforeDestroy() {
    this.container.removeChild(this);
  }
}