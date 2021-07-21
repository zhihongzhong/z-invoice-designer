<template>
  <div class="mn-print-preview-design-root">
    <tool-bar
      @save="saveTreeNodes"
      @preview="previewInvoice"
      @paper-size="showAlterPaperSizeModal"
    />
    <div class="mn-container-wrap ">
      <left-hand-side-container :component-list="availableComponents"/>
      <paper
        :render-properties-callback="rightHandSideContainerEditProperties"
        :mute-property-editor="mutePropertyEditor"
        :show-data-binding-modal="showDataBindingModal"
        ref="paper"
      />
      <data-binding-modal ref="dataBindingModal" />
      <paper-size-modal ref="paperSizeModal" />
      <right-hand-side-container
        ref="rightHandSideContainer"
        :data-source="dataSource"
      />
    </div>
  </div>
</template>

<script>
  import LeftHandSideContainer from './components/LeftHandSideContainer.vue';
  import RightHandSideContainer from './components/RightHandSidePropertyContainer.vue';
  import DataBindingModal from './components/DataBindingModal.vue';
  import ToolBar from './components/ToolBar.vue';
  import Paper from './components/Paper.vue';
  import PaperSizeModal from './components/PaperSizeModal.vue';

  import {
    createAbsoluteStyle,
    createAttributes,
    createLabelComponentAttributes,
    createAttributesWithDataSourceOfItsValue,
    createLabelComponentAttributesWIthDataSourceAndAuthorityOfItsValue,
    createLabelComponentAttributesWithDataSourceOfItsValue, createDefaultContainerStyle
  } from './utils/ComponentUtil'

  import { printById } from './utils/PrintUtil';

  export default {
    name: "index",
    components: {
      LeftHandSideContainer,
      Paper,
      RightHandSideContainer,
      DataBindingModal,
      ToolBar,
      PaperSizeModal
    },
    props: {
      saveService: {
        type: Function,
        default: (tree) => Promise.resolve()
      },
      getService: {
        type: Function,
        default: ()=> Promise.resolve({ treeNodes: {} })
      },
      dataSource: {
        type: Array,
        default: ()=>[
          {
            name: 'hello',
            value: 'hello'
          },
          {
            name: 'world',
            value: [
              {
                name: 'hello',
                value: 'hello'
              },
              {
                name: 'greeting',
                value: 'greeting'
              },
              {
                name: 'welcome',
                value: 'welcome'
              }
            ]
          },
          {
            name: 'delete',
            value: [
              {
                name: 'news',
                value: 'news'
              },
              {
                name: 'comment',
                value: 'comment'
              },
              {
                name: 'user',
                value: 'user'
              }
            ]
          }
        ]
      }
    },
    methods: {
      rightHandSideContainerEditProperties(getProperties, setProperties) {
        this.$refs.rightHandSideContainer.editProperties(getProperties, setProperties);
      },
      mutePropertyEditor() {
        this.$refs.rightHandSideContainer.mute();
      },
      showDataBindingModal(getProperties, setProperties) {
        this.$refs.dataBindingModal.show(this.dataSource, getProperties, setProperties);
      },
      showAlterPaperSizeModal() {
        const callback = (props)=>  {
          this.$refs.paper.justifyPaperSize(props)
        }
        this.$refs.paperSizeModal.show(callback);
      },
      saveTreeNodes() {
        const treeNodes = this.$refs.paper.save();
        this.saveService(treeNodes).then(result=> {
          console.error(result);
        }).catch(e=> {
          console.error(e);
        });
      },
      previewInvoice() {
        printById('paper');
      },
      async initApplication() {
        try {
          const result = await this.getService();
          const root = result.treeNodes;
          this.$refs.paper.restoreNodes(root);
        } catch(e) {
          console.error(e);
        }
      }
    },
    data() {
      return {
        availableComponents: [
          {
            componentName: 'title',
            nameForShow: '标题控件',
            children: [
              {
                tagName: 'h5',
                nameForShow: 'h5',
                componentType: 2,
                styles: createAbsoluteStyle(),
                attributes: createAttributes('点击更改名称')
              },
              {
                tagName: 'h4',
                nameForShow: 'h4',
                componentType: 2,
                styles: createAbsoluteStyle(),
                attributes: createAttributes('点击更改名称')
              },
              {
                tagName: 'h3',
                nameForShow: 'h3',
                componentType: 2,
                styles: createAbsoluteStyle(),
                attributes: createAttributes('点击更改名称')
              },
            ],
            componentType: 1
          },
          {
            componentName: 'dataSourceTitle',
            nameForShow: '数据源标题',
            componentType: 1,
            children: [
              {
                tagName: 'h5',
                nameForShow: 'h5',
                componentType: 2,
                styles: createAbsoluteStyle(),
                attributes: createAttributesWithDataSourceOfItsValue('点击选择数据源')
              },
              {
                tagName: 'h3',
                nameForShow: 'h3',
                componentType: 2,
                styles: createAbsoluteStyle(),
                attributes: createAttributesWithDataSourceOfItsValue('点击选择数据源')
              }
            ]
          },
          {
            componentName: 'label',
            nameForShow: '标签组件',
            children: [
              {
                componentName: 'label',
                tagName: 'div',
                nameForShow: '标签控件',
                componentType: 2,
                styles: createAbsoluteStyle(),
                attributes: createLabelComponentAttributes('标签控件', '')
              }
            ]
          },
          {
            componentName: 'dataSourceLabel',
            nameForShow: '数据标签组件',
            componentType: 1,
            children: [
              {
                componentName: 'dataSourceLabel',
                tagName: 'div',
                nameForShow: '数据标签控件',
                componentType: 2,
                styles: createAbsoluteStyle(),
                attributes: createLabelComponentAttributesWithDataSourceOfItsValue('数据标签控件', '请选择字段')
              },
              {
                componentName: 'authorityLabel',
                nameForShow: '权限数据标签',
                componentType: 2,
                tagName: 'div',
                styles: createAbsoluteStyle(),
                attributes: createLabelComponentAttributesWIthDataSourceAndAuthorityOfItsValue('权限数据标签', '请选择字段')
              }
            ]
          },
          {
            componentName: 'container',
            nameForShow: '容器',
            componentType: 1,
            children: [
              {
                componentName: 'TitleContainer',
                tagName: 'div',
                nameForShow: '标题容器',
                componentType: 3,
                styles: createDefaultContainerStyle(),
                attributes: []
              },
              {
                componentName: 'ReceiptContainer',
                tagName: 'div',
                nameForShow: '单据容器',
                componentType: 3,
                styles: createDefaultContainerStyle(),
                attributes: []
              },
              {
                componentName: 'DataSourceContainer',
                tagName: 'div',
                nameForShow: '数据源组件',
                componentType: 3,
                styles: createDefaultContainerStyle(),
                attributes: []
              }
            ]
          }
        ]
      }
    },

    created() {
      this.initApplication();
    }
  }
</script>

<style scoped lang="less">
  .mn-print-preview-design-root {
    width: 100%;
    min-height: 100vh;
    user-select: none;
  }

  .mn-container-wrap {
    display: flex;
    background: #eaeaea;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow-y: scroll;
  }
</style>
