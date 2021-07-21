
import './HorizontalLineBar.less';
import { createHorizontalLineStyle } from '../utils/ComponentUtil'
import SimpleEncoder from '../utils/SimpleEncoder'

export default {
  name: 'HorizontalLineBar',
  
  data() {
    return {
      style: {
      },
      styles: createHorizontalLineStyle(),
      isMouseDown: false,
      currentY: 0,
      offsetY: 0
    }
  },
  props: {
    paperWidth: Number
  },
  methods: {
    onMouseDown(e) {
      this.isMouseDown = true;
      this.currentY = e.clientY;
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
        tagName: 'horizontalLine',
        componentName: 'horizontalLine'
      }));
    },
    getArraySize() {
      return Math.floor( this.paperWidth / 5);
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
          'horizontal-line-bar-root': true
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
      [
        this.createRule(createElement)
      ]);
  }
}