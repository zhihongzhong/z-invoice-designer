<template>
  <div
    class="data-source-container-root"
    :style="style">
    <table-component :columns="columns" :data-binding="dataBinding" :data-source="dataSource"/>
  </div>
</template>

<script>

  // properties of a column:
  // title: String
  // dataIndex: String
  // authority: String
  import { style2object } from '../../MnPrintPreviewDesign/utils/ComponentUtil.js';
  import TableComponent from './TableComponent.js';
  import { copyObj } from '../../MnPrintPreviewDesign/utils/ObjectUtil.js';

  export default {
    name: "DataSourceContainer",
    data() {
      return {
      }
    },
    components: {
      TableComponent
    },

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

    computed: {
      style: function() {
        return style2object(this.fields.styles);
      },
      columns: function() {
        return this.fields.children.map(column=> {
          const titleField = column[0];
          const dataIndexField = column[1];
          return {
            title: titleField.value,
            dataIndex: dataIndexField.value
          };
        });
      },
      attributes: function() {
        return this.fields.attributes;
      },
      dataBinding: function() {
        const index = this.attributes.findIndex(attribute=>attribute.name === 'fieldBinding');
        return this.attributes[index].value;
      }
    },

    methods: {
    }
  }
</script>

<style scoped lang="less">
  .data-source-container-root {
    width: 100%;
    border: 1px solid #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    user-select: none;
  }
</style>