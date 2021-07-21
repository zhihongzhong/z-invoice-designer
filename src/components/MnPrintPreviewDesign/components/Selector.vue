<template>
  <div class="selector-root" :style="style">
    <div class="mask" @click="handleHideOptionList"/>
    <div class="selector-wrap">
      <input
        @focusin="handleShowOptionList"
        v-model="inputValue"
        @input="filterOptions"
        :placeholder="placeholder"
        ref="input"
      />
      <ul v-if="showOptionList" class="option-list">
        <li
          v-for="(item, index) in internalOptions"
          :key="index"
          @click.stop="handleSelect(item)"
        >
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Selector",
    props: {
      options: {
        type: Array,
        default: ()=> []
      },
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请选择...'
      }
    },

    watch: {
      options: {
        handler: function() {
          this.internalOptions = this.options.map(item=>item).filter(item=>!Array.isArray(item.value));
        },
        immediate: true
      }
    },
    data() {
      return {
        showOptionList: false,
        inputValue: '',
        internalOptions: [],
        style: {},
      }
    },
    methods: {
      handleShowOptionList() {
        this.showOptionList = true;
      },
      handleHideOptionList() {
        this.showOptionList = false;
      },
      handleSelect(item) {
        this.$emit('select', item.value);
        this.inputValue = item.name;
        this.handleHideOptionList();
      },
      filterOptions(e) {
        const value = e.target.value.toLowerCase();
        this.internalOptions  = this.options
          .filter(option=>!Array.isArray(option))
          .map(JSON.stringify)
          .filter(option=>option.toLowerCase().indexOf(value) !== -1)
          .map(JSON.parse);
      },
      // @interface
      setStyle(style) {
        this.style = style;
      },
      // @interface
      focus() {
        this.$refs.input.focus();
      }
    }
  }
</script>

<style scoped lang="less">
  .selector-root {
    .selector-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      border: 1px solid #333333;
      display: flex;
      align-items: center;
      input {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        -webkit-appearance: none;
      }

      .option-list {
        position: absolute;
        left: 0;
        max-height: 200px;
        width: 100%;
        list-style: none;
        z-index: 100;
        top: 100%;
        border: 1px solid #333333;
        padding: 0 10px;
        box-sizing: border-box;
        overflow: auto;
        li {
          padding: 5px 0;
          &:not(:last-of-type) {
            border-bottom: 1px solid #333333;
          }
        }
      }
    }

    .mask {
      position: fixed;
      left: 0;
      right: 0;
      width: 100vw;
      height: 100vh;
    }
  }
</style>