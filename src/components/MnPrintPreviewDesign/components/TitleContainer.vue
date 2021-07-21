<template>
  <div class="title-container-root">
    <div
      class="drop-area"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
      ref="dropArea"
      :style="style"
    >
      <div v-if="childrenData.length <= 0" class="default-area">
        此处添加标题
      </div>
      <div v-else class="component-wrap" @click="onContainerClick">
          <dynamic-component
            v-for="(child, index) in childrenData"
            :key="index"
            :tag-name="child.tagName"
            :styles="child.styles"
            :attributes="child.attributes"
            @click="showPropertiesOnRightHandSide(index)"
            @updatePosition="(pos)=>setPosition(index, pos)"
            :setProperties="(styles, properties)=>setProperties(index, styles, properties)"
          />
      </div>
    </div>
  </div>
</template>

<script>
  import ContainerMixin from '../mixins/ContainerMixin';
  import DynamicComponent from './DynamicComponent';
  import { createTitleComponentProperties, createDefaultContainerStyle } from '../utils/ComponentUtil';
  import { copyObj } from '../utils/ObjectUtil';
  import SimpleEncoder from '../utils/SimpleEncoder'
  import { style2object } from '../utils/ComponentUtil'

  export default {
    name: "TitleContainer",
    mixins: [ ContainerMixin ],
    methods: {
    },
    components: {
      DynamicComponent
    },
    data() {
      return {
        attributes: [],
        styles: createDefaultContainerStyle(),
      }
    },
    methods: {
      getJustifyingRule(component) {
        const componentName = component.tagName;
        return /^h[1-5]{1,1}$/.test(componentName);
      },

      // must  be implemented
      getProperties() {
        const getter = ()=> ({ tagName: 'title-container', styles: this.styles, attributes: this.attributes });
        const setter = (styles, attributes)=> {
          this.styles = styles;
          this.attributes = attributes;
          this.style = {...this.style, ...style2object(this.styles)};
        }
        return [ getter, setter];
      },
      getName() {
        return 'TitleContainer';
      },
    }
  }
</script>

<style scoped lang="less">
  .title-container-root {
    width: 100%;
    box-sizing: border-box;
    .drop-area {
      width: 100%;
      height: 50px;
      border: 1px dashed #333333;
      position: relative;
      overflow: hidden;
    }
    .drop-area .default-area {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .component-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
</style>