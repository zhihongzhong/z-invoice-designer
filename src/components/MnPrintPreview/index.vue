<template>
  <div class="mn-print-preview-root">
    <tool-bar @print="printPages"/>
    <div id="papers">
      <div
        v-for="(item, index) in dataSources"
        :key="index"
        style="margin-top: 20px;"
        class="paper"
      >
        <paper
          :data-source="item"
          :field-service="columnService"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import ToolBar from './components/Toolbar.vue';
  import Paper from './components/Paper.vue';
  import { printById } from '../MnPrintPreviewDesign/utils/PrintUtil.js';

  export default {
    name: "index",
    components: {
      Paper,
      ToolBar
    },

    props: {
      dataSources: {
        type: Array,
        default: ()=> []
      },
      fieldService: {
        type: Function,
        default: ()=> []
      }
    },
    data() {
      return {
        treeNodes: null
      }
    },
    methods: {
      async columnService() {
        if(this.treeNodes !== null) return this.treeNodes;
        this.treeNodes = await this.fieldService();
        return this.treeNodes;
      },
      printPages() {
        printById('papers');
      }
    }
  }
</script>

<style scoped lang="less">
  .mn-print-preview-root {
    width: 100vw;
    min-height: 100vh;
    background: #eaeaea;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

  }

  @media print {
    .paper {
      page-break-after: always;
    }
  }
</style>