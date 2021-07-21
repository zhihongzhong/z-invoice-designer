<template>
  <div
    class="data-source-container-root"
    @dblclick="showColumnsModal"
    @click="onContainerClick"
    :style="style"
    ref="dropArea"
  >
    <table-component :columns="columns" />
  </div>
</template>

<script>

  // properties of a column:
  // title: String
  // dataIndex: String
  // authority: String
  import ContainerMixin from '../mixins/ContainerMixin';
  import { createDefaultContainerStyle, style2object } from '../utils/ComponentUtil'
  import TableComponent from './TableComponent';
  import { copyObj } from '../utils/ObjectUtil'
  export default {
    name: "DataSourceContainer",

    data() {
      return {
        styles: createDefaultContainerStyle(),
        attributes: [
          {
          name: 'fieldBinding',
          value: '',
          editable: false
          },
          {
            name: 'authorityPrefix',
            value: ''
          }
        ],
        columns: [],

        fieldBinding: '',
        authorityPrefix: '',
        style: {}
      }
    },

    mixins: [ ContainerMixin ],

    components: {
      TableComponent
    },

    props: {
      notifyingChangeColumns: {
        type: Function,
        default: (getColumns, setColumns) => {}
      }
    },

    methods: {
      showColumnsModal() {
        const getColumns = ()=> ({
          columns: copyObj(this.columns),
          fieldBinding: this.fieldBinding,
          genColumnDefinition: this.genColumnDefinition,
          authorityPrefix: this.authorityPrefix,
        });
        const setColumns = (data)=> {
          this.columns = data.columns;
          this.authorityPrefix = data.authorityPrefix;
          this.fieldBinding = data.fieldBinding;

          const authorityPrefixIndex = this.getAuthorityPrefixIndex();
          const fieldBindingIndex = this.getFieldBindingIndex();
          this.attributes[fieldBindingIndex].value = data.fieldBinding;
          this.attributes[authorityPrefixIndex].value = data.authorityPrefix;
          this.attributes = [...this.attributes];
        }
        this.notifyingChangeColumns(getColumns, setColumns);
      },
      getFieldBindingIndex() {
        return this.getAttributeIndex('fieldBinding');
      },
      getAuthorityPrefixIndex() {
        return this.getAttributeIndex('authorityPrefix');
      },
      getAttributeIndex(fieldName) {
        return this.attributes.findIndex(item=>item.name === fieldName);
      },
      genColumnDefinition() {
        return [
          {
            name: 'title',
            value: '',
            type: 'input'
          },
          {
            name: 'dataIndex',
            value: '',
            type: 'select'
          }
        ];
      },
      getProperties() {
        const getter = ()=> ({
          tagName: 'data-source-container',
          styles: this.styles,
          attributes: this.attributes
        });
        const setter = (styles, attributes)=> {
          this.styles = styles;
          this.attributes = attributes;
          const authorityPrefixIndex = this.getAuthorityPrefixIndex();
          this.authorityPrefix = this.attributes[authorityPrefixIndex].value;
          this.style = {...this.style, ...style2object(this.styles)};
        }
        return [ getter, setter];
      },

      getName() {
        return 'DataSourceContainer';
      },

      // @override
      save() {
        const root = {};
        root['attributes'] = this.attributes;
        root['styles'] = this.styles;
        root['children'] = this.columns;
        root['name'] = this.getName();
        return root;
      },
      // @override
      resume(treeNode) {
        this['columns'] = treeNode.children;
        const [, setter] = this.getProperties();
        setter(treeNode.styles, treeNode.attributes);

        const authorityPrefixIndex = this.getAuthorityPrefixIndex();
        const fieldBindingIndex = this.getFieldBindingIndex();
        this.authorityPrefix = this.attributes[authorityPrefixIndex].value;
        this.fieldBinding = this.attributes[fieldBindingIndex].value;
      }
    }
  }
</script>

<style scoped lang="less">
  .data-source-container-root {
    height: 50px;
    width: 100%;
    border: 1px dashed #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    user-select: none;
  }
</style>