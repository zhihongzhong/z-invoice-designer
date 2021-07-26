<template>
  <div class="previewer-paper-root" :style="style">
    <template v-if="fields !== null">
      <component
        :is="item.name"
        v-for="(item, index) in fields.containers"
        :key="index"
        :fields="item"
        :data-source="dataSource"
      />
    </template>
  </div>
</template>

<script>
  import TitleContainer from './TitleContainer.vue';
  import ReceiptContainer from './ReceiptContainer.vue';
  import DataSourceContainer from './DataSourceContainer.vue';

  export default {
    name: "Paper",
    props: {
      fieldService: {
        type: Function,
        default: ()=>Promise.resolve({})
      },
      dataSource: {
        type: Object,
        default: ()=>({})
      }
    },

    components: {
      DataSourceContainer,
      TitleContainer,
      ReceiptContainer
    },
    data() {
      return {
        fields: null,
        style: {}
      }
    },

    provide() {
      return {
        dataSource: this.dataSource
      }
    },
    methods: {
      async initApplication() {
        try {
          const root = await this.fieldService();
          console.error(root);
          this.fields = root.treeNodes;
          this.justifyPaperSize({
            width: root.treeNodes.paperWidth,
            height: root.treeNodes.paperHeight
          });
        } catch(e) {
          console.error(e);
        }
      },
      justifyPaperSize({ width, height }) {
        this.paperWidth = width;
        this.paperHeight= height;
        this.style = { width: width + 'mm', height: height + 'mm'};
      }
    },

    created() {
      this.initApplication();
    }
  }
</script>

<style scoped lang="less">
  .previewer-paper-root {
    background: white;
    box-sizing: border-box;
    padding: 15px;
    position: relative;
    width: 210mm;
    height: 297mm;
  }
</style>