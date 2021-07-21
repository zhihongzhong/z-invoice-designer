<template>
  <div class="title-container-root">
    <div
      class="drop-area"
      ref="dropArea"
      :style="style"
    >
      <div class="component-wrap">
          <dynamic-component
            v-for="(child, index) in childrenData"
            :key="index"
            :tag-name="child.tagName"
            :styles="child.styles"
            :attributes="child.attributes"
          />
      </div>
    </div>
  </div>
</template>

<script>
  import DynamicComponent from './DynamicComponent';
  import { copyObj } from '../../MnPrintPreviewDesign/utils/ObjectUtil';
  import SimpleEncoder from '../../MnPrintPreviewDesign/utils/SimpleEncoder'
  import { style2object } from '../../MnPrintPreviewDesign/utils/ComponentUtil'

  export default {
    name: "TitleContainer",
    methods: {
    },
    components: {
      DynamicComponent
    },
    props: {
      fields: {
        type: Object,
        default: ()=> ({
          styles: [],
          attributes: [],
          childrenData: [],
          lineData: []
        })
      }
    },

    computed: {
      style: function() {
        return style2object(this.fields.styles);
      },
      childrenData: function() {
        return this.fields.children;
      },
      attributes: function() {
        return this.fields.attributes;
      }
    },
    inject: {
      dataSource: {
        default: {}
      }
    },
    methods: {
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
      border: 1px solid #333333;
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