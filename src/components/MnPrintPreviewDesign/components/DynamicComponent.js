import './DynamicComponent.less';
import { array2object, style2object } from '../utils/ComponentUtil.js';
import { rectIn } from '../utils/GraphicUtils.js';
import DraggableMixin from '../mixins/DraggableMixin.js';

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
  },
  data() {
    return {
      showBorder: false,
      isMouseDown: false,
      transform: '',
    }
  },
  mixins: [ DraggableMixin ],
  methods: {
    attr2object() {
      return array2object(this.attributes);
    },
    emitClick() {
      this.$emit('click');
    },
    getValue() {
      const value = this.attributes.filter(attr=>attr.name === 'value')[0].value;
      return this.getPrefix() + value + this.getSuffix();
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
    
    if(this.transform !== '') {
      style['transform'] = this.transform;
      style['z-index'] = 200;
    }
    
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
        on: {
          click: this.emitClick,
          mousedown: this.onMouseDown,
          mousemove: this.onMouseMove,
          mouseup: this.onMouseUp,
          mouseleave: this.onMouseLeave
        },
        ref: 'root'
      },
    );
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