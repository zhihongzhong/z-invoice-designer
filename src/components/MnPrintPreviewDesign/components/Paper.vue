<template>
  <div class="paper-root" @click="dispatchClickEvent" id="paper">
    <div
      class="paper"
      @drop="onContainerDropDown"
      @dragover="onDragOver"
      :style="style"
    >
      <horizontal-line-bar :paperWidth="paperWidth" />
      <vertical-line-bar :paperHeight="paperHeight" />
      <component
        :is="item.componentName"
        v-for="(item, index) in containerData"
        :key="index"
        :notifying-change-columns="notifyingShowDataBindingModal"
      />
    </div>
  </div>
</template>

<script>
  import TitleContainer from './TitleContainer';
  import ReceiptContainer from './ReceiptContainer';
  import HorizontalLineBar from './HorizontalLineBar';
  import VerticalLineBar from './VerticalLineBar';
  import DataBindingModal from './DataBindingModal';
  import DataSourceContainer from './DataSourceContainer';
  import SimpleEncoder from '../utils/SimpleEncoder';
  export default {
    name: "Paper",
    props: {
      /**
       * callback to call right-hand-side container to show properties
       * prototype:
       * function renderPropertiesCallback(getProperties, setProperty);
       * param getProperties: return an array that contains properties
       * interface property {
       *   name: String,
       *   nameForShow: String,
       *   value: String | Number
       * }
       *
       * param setProperty: A function to set a certain property,
       * The function's prototype:
       * function setProperty(name \/*property name*\/, value \/* property value *\/);
       * */
      renderPropertiesCallback: {
        type: Function,
        default: (getProperties, setProperty)=> {}
      },
      mutePropertyEditor: {
        type: Function,
        default: ()=>{}
      },
      showDataBindingModal: {
        type: Function,
        default: (getProperties, setProperties)=> {}
      }
    },

    provide() {
      return {
        parent: this
      }
    },

    components: {
      TitleContainer,
      ReceiptContainer,
      HorizontalLineBar,
      VerticalLineBar,
      DataSourceContainer
    },

    data() {
      return {
        containers: [],
        containerData: [],
        selectedContainer: null,
        style: {},

        paperWidth: 210,
        paperHeight: 297
      }
    },

    methods: {

      onContainerDropDown(e) {
        const container = SimpleEncoder.decode(e.dataTransfer.getData('text/plain'));
        const regExp = /container|Container$/;
        if(regExp.test(container.componentName)) {
          this.containerData.push(container);
        } else {
          this.reportError(new Error('请先拖动容器'));
        }
      },
      onDragOver(ev) {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move';
      },

      reconcileProperties(getProperties, setProperties) {
        this.renderPropertiesCallback(getProperties, setProperties);
      },
      dispatchKeyPressEvent(e) {
        if(this.selectedContainer === null) return 0;
        let shouldPrevent = false;
        switch (e.code) {
          case 'Delete':
            shouldPrevent = true;
            this.selectedContainer.deleteSelected();
            this.mutePropertyEditor();
            break;
          case 'ArrowLeft':
            shouldPrevent = true;
            this.selectedContainer.moveSelected('left', 1);
            break;
          case 'ArrowRight':
            shouldPrevent = true;
            this.selectedContainer.moveSelected('right', 1);
            break;
          case 'ArrowUp':
            shouldPrevent = true;
            this.selectedContainer.moveSelected('up', 1);
            break;
          case 'ArrowDown':
            shouldPrevent = true;
            this.selectedContainer.moveSelected('down', 1);
            break;
          default:
            break;
        }
        if(shouldPrevent) {
          e.preventDefault();
        }
      },
      dispatchClickEvent(e) {
        let found = false;
        for(let container of this.containers) {
          if (container.onContainerClick(e)) {
            this.selectedContainer = container;
            found = true;
          } else {
            container.unStrokeSelected();
          }
        }
        if(!found) {
          this.selectedContainer = null;
          this.mutePropertyEditor();
        }
      },
      addContainer(container) {
        this.containers.push(container);
        this.notifySetContainerProperty();
      },
      notifyingShowDataBindingModal(getProperties, setProperties) {
        this.showDataBindingModal(getProperties, setProperties);
      },
      removeContainer(container) {
        this.containers = this.containers.filter(c => c !== container);
      },
      reportError(message) {
        console.error(message);
      },

      save() {
        const root = {};
        const children = this.containers.map(container=> container.save());
        root['containers'] = children;
        root['containerData'] = this.containerData;
        root['paperWidth'] = this.paperWidth;
        root['paperHeight'] = this.paperHeight;
        return root;
      },
      notifySetContainerProperty() {
        if(this.containersInited === true) return;
        if(this.rootNode === undefined || this.rootNode === null) return ;
        if(this.containers.length !== this.containerData.length) return ;
        const containers = this.rootNode.containers;
        if(!Array.isArray(containers)) return;
        if(containers.length !== this.containerData.length) return;

        this.containers.forEach((container, index)=> {
          container.resume(containers[index]);
        });
        this.containersInited = true;
      },
      restoreNodes(rootNode) {
        this.rootNode = rootNode;
        if(rootNode !== null && rootNode !== undefined) {
          this.containerData = this.rootNode.containerData;
          this.justifyPaperSize({ width: rootNode.paperWidth, height: rootNode.paperHeight });
        }
        // no need to call `notifySetContainerProperty` method
        // containerData is used to generate containers
        // so the containers' creation and `notifySetContainerProperty` are
        // synchronized
        // this.notifySetContainerProperty();
      },

      justifyPaperSize({ width, height }) {
        this.paperWidth = width;
        this.paperHeight= height;
        this.style = { width: width + 'mm', height: height + 'mm'};
      }
    },

    created() {
      window.addEventListener('keydown', this.dispatchKeyPressEvent);
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.dispatchKeyPressEvent);
    }
  }
</script>

<style scoped lang="less">
  .paper-root {
    /*width: 494px;*/
    /*height: 700px;*/
    padding-top: 50px;
    padding-bottom: 50px;

    .paper {
      background: white;
      box-sizing: border-box;
      padding: 15px;
      position: relative;
      width: 210mm;
      height: 297mm;
    }
  }
</style>