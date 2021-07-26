<template>
  <div class="left-hand-side-container-root">
    <div v-for="item in componentList" class="top-component-wrap">
      <label>{{item.nameForShow}}</label>
      <div class="children-wrap">
        <template v-for="child in item.children" >
          <component-item :component="child" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>

  import ComponentItem from './ComponentItem.vue';
  export default {
    name: "LeftHandSideContainer",
    props: {
      componentList: Array,
      default: ()=> []
    },
    components: {
      ComponentItem
    },
    data() {
      return {
        componentOnPaper: []
      }
    }
  }
</script>

<style scoped lang="less">
  .left-hand-side-container-root {
    width: 250px;
    height: 100%;
    background: white;
    padding: 40px 10px;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    .children-wrap {
      display: flex;
      flex-wrap: wrap;
    }

    .top-component-wrap {
      padding-bottom: 40px;
      &>label:nth-child(1) {
        margin-bottom: 10px;
        display: block;
      }
    }
  }
  @media screen and (max-width: 800px) {
    .left-hand-side-container-root {
      display: none;
    }
  }

  @media print {
    .left-hand-side-container-root {
      display: none;
    }
  }
</style>