<template>
  <div class="tool-bar-root">
    <button @click="emitSave" class="button">保存</button>
    <button @click="emitPreview" class="preview-button" style="margin-left: 12px;" >预览</button>
    <button @click="emitAlterPaperSize" class="paper-size-button" style="margin-left: 12px;">纸张大小</button>
  </div>
</template>

<script>
  export default {
    name: "ToolBar",

    methods: {
      emitSave() {
        this.$emit('save', {} );
      },
      emitPreview() {
        this.$emit('preview', {});
      },
      emitAlterPaperSize() {
        this.$emit('paper-size', {});
      }
    }
  }
</script>

<style scoped lang="less">
  .tool-bar-root {
    /*position: fixed;*/
    width: 100vw;
    height: 50px;
    /*left: 0;*/
    /*top: 0;*/
    background: white;
    border-bottom: 1px solid #eaeaea;
    z-index: 100;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 40px;

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