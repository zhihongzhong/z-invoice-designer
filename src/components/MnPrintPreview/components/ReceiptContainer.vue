<template>
    <div
      class="receipt-container-root"
      ref="dropArea"
      :style="style">
      <label-component
        v-for="(child, index) in childrenData"
        :key="index"
        :tag-name="child.tagName"
        :styles="child.styles"
        :attributes="child.attributes"
        :data-source="dataSource"
      />
      <div>
        <receipt-line
          v-for="(child, index) in lineData"
          :key="index"
          :tag-name="child.tagName"
          :styles="child.styles"
          :attributes="child.attributes"
          :line-type="child.tagName"
        />
      </div>
    </div>
</template>

<script>
  import { style2object } from '../../MnPrintPreviewDesign/utils/ComponentUtil.js';
  import LabelComponent from './LabelComponent.js';
  import CustomLine from './CustomLine.js';

  export default {
    name: "ReceiptContainer",

    props: {
      fields: {
        type: Object,
        default: ()=> ({
          styles: [],
          attributes: [],
          childrenData: []
        })
      },
      dataSource: {
        type: Object,
        default: ()=> ({})
      }
    },
    components: {
      LabelComponent,
      ReceiptLine: CustomLine
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
      },
      lineData: function() {
        return this.fields.lineData;
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="less">
  .receipt-container-root {
    height: 50px;
    width: 100%;
    border: 1px solid #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
</style>