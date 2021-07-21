import DraggableMixin from '../mixins/DraggableMixin'
import { style2object } from '../utils/ComponentUtil'
import { rectIn } from '../utils/GraphicUtils'
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
  mixins: [ DraggableMixin ],
  methods: {
    toTransform(offsetX, offsetY) {
      return this.lineType === 'horizontalLine' ? `translateY(${offsetY}px)` : `translateX(${offsetX}px)`
    },
    emitClick() {
      this.$emit('click');
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
    
    createDragLine(createElement) {
      const style = {
        position: 'absolute',
        transform: 'translateY(-50%)'
      }
      if(this.lineType === 'horizontalLine') {
        style['height'] = '30px';
        style['left'] = 0;
        style['width'] = '100%';
        style['transform']= 'translateY(-50%)';
      } else {
        style['width'] = '30px';
        style['height'] = '100%';
        style['top'] = 0;
        style['transform']= 'translateX(-50%)';
      }
      return createElement('div',
        {
          style,
          on: {
            mousedown: this.onMouseDown,
            mousemove: this.onMouseMove,
            mouseup: this.onMouseUp,
            mouseleave: this.onMouseLeave,
          }
        },
      )
    }
  },
  
  render(createElement) {
    const style =  style2object(this.styles);
    if(this.transform !== '') {
      style['transform'] = this.transform;
      style['z-index'] = 200;
    }
    return createElement(
      'div',
      {
        on: {
          click: this.emitClick
        },
        class: {
          'custom-line-bordered': this.showBorder,
          'custom-line-root': true
        },
        style,
        ref: 'root'
      },
      [
        createElement('div',
          {
            style: {
              position: 'relative',
              width: '100%',
              height: '100%'
            }
          },
          [
            this.createDragLine(createElement)
          ]
        )
      ]
    );
  },
  created() {
    if(this.container) {
      this.container.addLineFront(this);
    }
  },
  beforeDestroy() {
    this.container.removeLine(this);
  }
}