<template>
  <div class="component-item-root" draggable="true" @dragstart="setTransferData">
    <span>{{component.nameForShow}}</span>
  </div>
</template>

<script>
  import SimpleEncoder from '../utils/SimpleEncoder'
  export default {
    name: "ComponentItem",
    props: {
      component: Object,
      //icon: String,
      // componentName: String,
      // nameForShow: String,
      // styles: Array,
      // attributes: Array
    },
    methods: {
      setTransferData(e) {
        e.dataTransfer.setData('text/plain', this.encodeStylesAndAttributes());
        e.dataTransfer.effectAllowed = "move";
      },
      encodeStylesAndAttributes() {
        return SimpleEncoder.encode(this.component);
      }
    }
  }
</script>

<style scoped lang="less">
  .component-item-root {
    width: 100px;
    height: 30px;
    font-size: 12px;
    color: #333333;
    border: 1px solid #eaeaea;

    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      border: 1px solid #13c2c2;
      color: #13c2c2;
    }
  }
</style>