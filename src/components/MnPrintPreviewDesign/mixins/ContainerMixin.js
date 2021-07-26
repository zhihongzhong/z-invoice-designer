import SimpleEncoder from '../utils/SimpleEncoder.js';
import { rectIn } from '../utils/GraphicUtils.js';

export default {
  
  inject: {
    parent: {
      default: null
    }
  },
  
  provide() {
    return {
      container: this
    }
  },
  data() {
    return {
      children: [],
      selectedChild: null,
      childrenData: [],
      style: ''
    }
  },
  methods: {
    /**
     * for Index component to call.
     * return a handle on a legal position value, otherwise return null.
     * This function has side-effect, not only returns a handle, but
     * set the background of a certain element as well(on a legal position value)
     * */
    justifyContent(ev) {
      const regExp = this.getJustifyingRule();
      ev.preventDefault();
      const data = ev.dataTransfer.getData('text');
      return !!regExp.test(data);
    },
    reportError(message) {
      if (this.parent && this.parent.reportError) {
        this.parent.reportError(new Error(message));
      }
    },
    notifyChangingProperties(getProperties, setProperties) {
      if (this.parent) {
        this.parent.reconcileProperties(getProperties, setProperties);
      }
    },
  
    addChildFront(child) {
      this.children.unshift(child);
    },
    removeChild(instance) {
      this.children = this.children.filter(item => item !== instance);
    },
    addChildRear(child) {
      this.children.push(child);
    },
    strokeChild(child) {
      if (this.selectedChild !== null) {
        this.selectedChild.unStroke();
      }
      child.stroke();
      this.selectedChild = child;
    },
  
    /**
     * To determine coordinate is in which component
     * */
    onContainerClick(e) {
      const { clientX, clientY } = e;
      let found = false;
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].in(clientX, clientY)) {
          found = true;
          this.strokeChild(this.children[i]);
          return true;
        }
      }
      if (!found && this.selectedChild !== null) {
        this.selectedChild.unStroke();
        this.selectedChild = null;
      }
      if (!found) {
        if (this.in(clientX, clientY)) {
          const result = this.processLineClick(e);
          if (!result) {
            const [getter, setter] = this.getProperties();
            this.notifyChangingProperties(getter, setter);
          }
          return true;
        } else {
          return false;
        }
      }
    },
    unStrokeSelected() {
      if (this.selectedChild !== null) {
        this.selectedChild.unStroke();
        this.selectedChild = null;
      }
    },
  
    processLineClick() {
      return false;
    },
  
    in(xPosition, yPosition) {
      const { left, top, width, height } = this.getRect();
      const right = left + width;
      const bottom = top + height;
      return rectIn(xPosition, yPosition, left, right, top, bottom);
    },
    getRect() {
      return this.$refs.dropArea.getBoundingClientRect();
    },
  
    onDragOver(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      ev.dataTransfer.dropEffect = 'move';
      this.style = { ...this.style, 'background': 'rgba(255, 0, 0, 0.5)' };
    },
    onDragLeave(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      delete this.style.background;
      this.style = { ...this.style };
    },
    onDrop(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      delete this.style.background;
      this.style = { ...this.style };
      const component = SimpleEncoder.decode(ev.dataTransfer.getData('text/plain'));
      if (this.getJustifyingRule(component)) {
        this.pushData(component, ev);
      } else {
        this.reportError("标签名错误");
      }
    },
    pushData(component, event) {
      if (component.tagName === 'horizontalLine') {
        this.processHorizontalLine(component, event);
      } else if (component.tagName === 'verticalLine') {
        this.processVerticalLine(component, event);
      } else {
        const { top, left } = this.getRect();
        const { clientX, clientY } = event;
        // assume that cursor is in the component area
        // no need to be precise
        const actualLeft = Math.max(0, clientX - left - 25);
        const actualTop = Math.max(0, clientY - top - 12);
        this.setPositionForSpecificStyle(component.styles, { top: actualTop, left: actualLeft });
        this.childrenData.push(component);
      }
    },
  
    // abstract methods
    processHorizontalLine(component, event) {
    },
    // abstract methods
    processVerticalLine(component, event) {
    },
  
    setPosition(index, position) {
      const styles = this.childrenData[index].styles;
      this.setPositionForSpecificStyle(styles, position);
      this.childrenData = [...this.childrenData];
    },
  
    setPositionForSpecificStyle(styles, position) {
      let topIndex, leftIndex;
      for (let i = 0; i < styles.length; i++) {
        if (styles[i].name === 'left') leftIndex = i;
        if (styles[i].name === 'top') topIndex = i;
      }
      styles[topIndex].value = position.top;
      styles[leftIndex].value = position.left;
    },
  
    setProperties(index, styles, attributes) {
      this.childrenData[index] = {
        ...this.childrenData[index],
        styles,
        attributes
      };
      this.childrenData = [...this.childrenData];
    },
  
    showPropertiesOnRightHandSide(index) {
      const getProperties = () => this.childrenData[index];
      this.notifyChangingProperties(getProperties,
        (styles, attributes) => this.setProperties(index, styles, attributes)
      );
    },
  
    deleteSelectedLine() {
      return false;
    },
    moveSelectedLine() {
      return false;
    },
    deleteSelected() {
      const result = this.deleteSelectedLine();
      if (!result) {
        this.childrenData = this.childrenData.filter(item => item.attributes !== this.selectedChild.attributes);
      }
      this.selectedChild = null;
    },
    moveSelected(direction, amount) {
      const result = this.moveSelectedLine(direction, amount);
      if (result) return 0;
      const index = this.childrenData.findIndex(
        item => item.attributes === this.selectedChild.attributes
      );
    
      const styles = this.childrenData[index].styles;
      let leftIndex, topIndex;
      for (let i = 0; i < styles.length; i++) {
        if (styles[i].name === 'left') leftIndex = i;
        if (styles[i].name === 'top') topIndex = i;
      }
      switch (direction) {
        case 'left':
          styles[leftIndex].value = styles[leftIndex].value - amount;
          break;
        case 'right':
          styles[leftIndex].value = styles[leftIndex].value + amount;
          break;
        case 'up':
          styles[topIndex].value = styles[topIndex].value - amount;
          break;
        case 'down':
          styles[topIndex].value = styles[topIndex].value + amount;
          break;
      }
    },
    // for 'paper' component to call to save tree nodes;
    save() {
      const root = {};
      root['attributes'] = this.attributes;
      root['styles'] = this.styles;
      root['children'] = this.childrenData;
      root['name'] = this.getName();
      return root;
    },
    getName() {
      throw new Error('The method not being implemented');
    },
    resume(treeNode) {
      this['childrenData'] = treeNode.children;
      const [, setter] = this.getProperties();
      setter(treeNode.styles, treeNode.attributes);
    },
  },
  created() {
    if(this.parent) {
      this.parent.addContainer(this);
    }
  },
  beforeDestroy() {
    this.parent.removeContainer(this);
  }
}