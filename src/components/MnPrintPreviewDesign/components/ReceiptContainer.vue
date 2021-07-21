<template>
    <div
      class="receipt-container-root"
      @click="onContainerClick"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
      ref="dropArea"
      :style="style">
      <label-component
        v-for="(child, index) in childrenData"
        :key="index"
        :tag-name="child.tagName"
        :styles="child.styles"
        :attributes="child.attributes"
        @click="showPropertiesOnRightHandSide(index)"
        @updatePosition="(pos)=>setPosition(index, pos)"
        :setProperties="(styles, properties)=>setProperties(index, styles, properties)"
      />
      <div>
        <receipt-line
          v-for="(child, index) in lineData"
          :key="index"
          :tag-name="child.tagName"
          :styles="child.styles"
          :attributes="child.attributes"
          :line-type="child.tagName"
          :setProperties="(styles, properties)=>setLineProperties(index, styles, properties)"
          @updatePosition="(pos)=>setLinePosition(index, pos)"
          @click="showLinePropertiesOnRightHandSide(index)"
        />
      </div>
    </div>
</template>

<script>
  import ContainerMixin from '../mixins/ContainerMixin';
  import { createDefaultContainerStyle, style2object } from '../utils/ComponentUtil'
  import LabelComponent from './LabelComponent';
  import CustomLine from './CustomLine';

  export default {
    name: "ReceiptContainer",
    mixins: [ ContainerMixin ],

    data() {
      return {
        attributes: [],
        styles: createDefaultContainerStyle(),
        lineData: [],
        lineChildren: []
      }
    },

    components: {
      LabelComponent,
      ReceiptLine: CustomLine
    },
    methods: {
      getProperties() {
        const getter = ()=> ({ tagName: 'receipt-container', styles: this.styles, attributes: this.attributes });
        const setter = (styles, attributes)=> {
          this.styles = styles;
          this.attributes = attributes;
          this.style = {...this.style, ...style2object(this.styles)};
        }
        return [ getter, setter];
      },
      getJustifyingRule(component) {
        const componentName = component.componentName;
        const regEx = /Label|label|line|Line$/;
        return regEx.test(componentName);
      },

      processHorizontalLine(component, event) {
        // alter component's top
        const topIndex = component.styles.findIndex(style=>style.name === 'top');
        const clientY = event.clientY;
        const  { top }= this.getRect();
        component.styles[topIndex].value = clientY - top - 1;
        this.lineData.push(component);
      },

      processVerticalLine(component, event) {
        const leftIndex = component.styles.findIndex(style=>style.name ==='left');
        const clientX = event.clientX;
        const { left } = this.getRect();
        component.styles[leftIndex].value = clientX - left - 1;
        this.lineData.push(component);
      },

      setLinePosition(index, position) {
        const styles = this.lineData[index].styles;
        let topIndex, leftIndex;
        for(let i = 0; i < styles.length; i++) {
          if(styles[i].name === 'left') leftIndex = i;
          if(styles[i].name === 'top' ) topIndex = i;
        }
        styles[topIndex].value  = position.top;
        styles[leftIndex].value = position.left;
        this.lineData = [...this.lineData];
      },
      showLinePropertiesOnRightHandSide(index) {
        const getProperties = ()=> this.lineData[index];
        const setProperties = (styles, attributes) => {
          this.lineData[index] = {
            ...this.lineData[index],
            styles,
            attributes
          }
        }
        this.notifyChangingProperties(getProperties, setProperties);
      },
      addLineFront(line) {
        this.lineChildren.unshift(line);
      },
      removeLine(instance) {
        this.lineChildren = this.lineChildren.filter(item=>item !== instance);
      },
      processLineClick(e) {
        let found = false;
        const { clientX, clientY } = e;
        for(let i = 0; i < this.lineChildren.length; i++) {
          if(this.lineChildren[i].in(clientX, clientY)) {
            found = true;
            this.strokeChild(this.lineChildren[i]);
            break;
          }
        }
        return found;
      },
      deleteSelectedLine() {
        const lineDataLen = this.lineData.length;
        this.lineData = this.lineData.filter(item=> item.attributes !== this.selectedChild.attributes);
        return lineDataLen !== this.lineData.length;
      },
      moveSelectedLine(direction, amount) {
        const index = this.childrenData.findIndex(
          item=> item.attributes === this.selectedChild.attributes
        );
        if(index === -1) return false;
        return false;
      },

      getName() {
        return 'ReceiptContainer';
      },
      // @override
      save() {
        const root = {};
        root['attributes'] = this.attributes;
        root['styles'] = this.styles;
        root['children'] = this.childrenData;
        root['lineData'] = this.lineData;
        root['name'] = this.getName();
        return root;
      },
      // @override
      resume(treeNode) {
        this['childrenData'] = treeNode.children;
        const lineData = treeNode.lineData;
        if(lineData !== undefined && lineData !== null) {
          this['lineData'] = lineData;
        }
        const [, setter] = this.getProperties();
        setter(treeNode.styles, treeNode.attributes);
      },
    }
  }
</script>

<style scoped lang="less">
  .receipt-container-root {
    height: 50px;
    width: 100%;
    border: 1px dashed #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
</style>