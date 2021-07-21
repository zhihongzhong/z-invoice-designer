<template>
    <div class="mn-invoice-designer-root">
      <mn-print-preview-design :save-service="saveService" :get-service="getService"/>
    </div>
</template>

<script>
  import MnPrintPreviewDesign from '../components/MnPrintPreviewDesign/index.vue';
  import Vue from 'vue';

  export default {
    name: "MnInvoiceDesigner",
    components: {
      MnPrintPreviewDesign
    },
    methods: {
      saveService(treeNodes) {
        Vue.ls.set('treeNodes', treeNodes);
        return Promise.resolve();
        // return Promise.reject(new Error("The task fails"));
      },
      getService() {
        const treeNodes = Vue.ls.get('treeNodes');
        return Promise.resolve({ treeNodes });
      }
    }
  }
</script>

<style scoped lang="less">
  .mn-invoice-designer-root {
    width: 100vw;
    height: 100vh;
  }
</style>
