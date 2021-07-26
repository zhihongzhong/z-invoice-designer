
import './VerticalLineBar.less';
import { createVerticalLineStyle } from '../utils/ComponentUtil.js';
import SimpleEncoder from '../utils/SimpleEncoder.js';

export default {
  name: 'VerticalLineBar',
  
  data() {
    return {
      style: {
      },
      styles: createVerticalLineStyle(),
      isMouseDown: false,
      currentX: 0,
      offsetX: 0
    }
  },
  
  props: {
    paperHeight: Number
  },
  
  methods: {
    onMouseDown(e) {
      this.isMouseDown = true;
      this.currentX = e.clientX;
      this.style['background'] = 'yellow';
      this.style = {...this.style};
    },
    onMouseUp() {
      delete this.style['background'];
      this.style = {...this.style};
    },
    onMouseLeave() {
      this.onMouseUp();
    },
    onDragStart(e) {
      e.dataTransfer.setData('text/plain', SimpleEncoder.encode({
        styles: this.styles,
        attributes: [],
        tagName: 'verticalLine',
        componentName: 'verticalLine'
      }));
    },
    getArraySize() {
      return Math.floor( this.paperHeight / 5);
    },
    createRule(createElement) {
      const ruleNumbers = new Array(this.getArraySize()).fill(0);
      return ruleNumbers.map((item, index)=>
        createElement('span',{
          key: index,
          class: {
            'degree': true,
            'degree-important': (index % 2 === 0)
          }
        })
      );
    },
  },
  render(createElement) {
    return createElement('div',
      {
        class: {
          'vertical-line-bar-root': true
        },
        style: this.style,
        domProps: {
          draggable: true
        },
        on: {
          mousedown: this.onMouseDown,
          mouseup: this.onMouseUp,
          mouseleave: this.onMouseLeave,
          dragstart: this.onDragStart
        }
      },
      this.createRule(createElement)
    );
  },
  created() {
  
  }
}