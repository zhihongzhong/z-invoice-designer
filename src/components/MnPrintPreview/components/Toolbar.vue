<template>
  <div class="mn-print-preview-toolbar-root">
    <button class="preview-button" @click="emitPrint">打印</button>
  </div>
</template>

<script>
  export default {
    name: "Toolbar",
    methods: {
      emitPrint() {
        this.$emit('print', {});
      }
    }
  }
</script>

<style scoped lang="less">
  .mn-print-preview-toolbar-root {
    width: 100vw;
    height: 50px;
    background: white;
    border-bottom: 1px solid #eaeaea;
    z-index: 100;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 40px;

    position: sticky;
    top: 0;

    .button {
      height: 28px;
      background: #00A0E9;
      color: white;
      outline: none;
      border: none;
      font-size: 12px;
      width: 60px;
    }

    .preview-button {
      .button();
      color: #333333;
      background: white;
      border: 1px solid #dfdfdf;
    }

    .paper-size-button {
      .preview-button();
      width: 70px;
    }
  }
</style>