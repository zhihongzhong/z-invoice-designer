<template>
  <div class="right-hand-side-property-container-root">
    <div v-if="showProperties">
      <h3>属性编辑</h3>
      <div class="row">
        <span>组件名</span>
        <span>{{tagName}}</span>
      </div>
      <div>
        <h4>组件样式</h4>
        <div class="row" v-for="(style, index) in styles" :key="index">
          <span>{{style.name}}</span>
          <span @dblclick="e=>moveInputField(e, index, 'styles')">{{style.value}}</span>
        </div>
      </div>
      <div>
        <h4>属性值</h4>
        <div class="row" v-for="(attr, index) in attributes" :key="index">
          <span>{{attr.name}}</span>
          <span @dblclick="e=>moveInputField(e, index, 'attributes')">{{attr.value}}</span>
        </div>
      </div>
    </div>
    <input
      ref="propertyInput"
      class="property-input"
      @focusout="setProperty"
      @keydown.enter="setProperty"
    />
    <selector
      placeholder="请选择"
      :options="dataSource"
      ref="propertySelector"
      @select="selectorSetProperty"
    />
  </div>
</template>

<script>
  import { setStyles } from '../utils/CSSUtils.js';
  import Selector from './Selector.vue';

  export default {
    name: "RightHandSidePropertyContainer",
    data() {
      return {
        showProperties: false,
        tagName: '',
        styles: [],
        attributes: [],
        value: '',
        setProperties: null,
        selectedProperty: 0,
        propertySetter: null
      }
    },

    components: {
      Selector
    },

    props: {
      dataSource: {
        type: Array,
        default: ()=> []
      }
    },
    methods: {
      editProperties(getProperties, setProperties) {
        const {
          tagName,
          styles,
          attributes,
        } = getProperties();
        this.tagName = tagName;
        this.styles = styles;
        this.attributes = attributes;
        this.showProperties = true;
        this.setProperties = setProperties;
      },
      mute() {
        this.showProperties = false;
      },
      moveInputField(e, property, propertyType) {
        if(!this.isPropertyEditable(propertyType, property)) return 0;
        const {left, top, width, height } = e.target.getBoundingClientRect();
        this.selectedProperty =  property;
        const styleWithDisplay = {
          left,
          top,
          width,
          height,
          display: 'block'
        };
        let reference;
        if(propertyType === 'attributes' && this.attributes[property].fromDataSource) {
          reference = this.$refs.propertySelector;
        } else {
          reference = this.$refs.propertyInput;
        }
        // important notice:
        // to call set style for custom reference
        // method <ref>.setStyle is needed to be implemented
        setStyles(reference, styleWithDisplay);
        // method <ref>.focus is needed to be implemented
        reference.focus();
        this.propertySetter = this.createPropertySetter(property, propertyType);
      },
      isPropertyEditable(propertyType, index) {
        return this[propertyType][index].editable !== false;
      },
      createPropertySetter(index, propertyType) {
        if(propertyType === 'styles') {
          return function(value) {
            this.styles[index].value = value;
            return this.styles;
          }
        } else {
          return function(value) {
            this.attributes[index].value = value;
            return this.attributes;
          }
        }
      },
      setProperty(e) {
        const value = e.target.value;
        this.triggerSetProperty(value);
        e.target.value = '';
        this.$refs.propertyInput.style.display = 'none';
      },
      triggerSetProperty(value) {
        if(value !== '') {
          this.propertySetter(value);
          /* notify paper to set properties */
          this.setProperties(this.styles, this.attributes);
        }
      },
      selectorSetProperty(value) {
        const genValue = `{{${value}}}`;
        this.triggerSetProperty(genValue);
        this.$refs.propertySelector.setStyle({ display: 'none'});
      }
    }
  }
</script>

<style scoped lang="less">
  .right-hand-side-property-container-root {
    width: 350px;
    height: 100%;
    background: white;
    position: absolute;
    top: 0;
    right: 0;
    padding: 40px 50px 40px 10px;
  }

  .row {
    display: flex;
    width: 100%;
    font-size: 12px;
    span {
      flex: 1;
      height: 30px;
      box-sizing: border-box;
      border: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &>span:nth-child(2) {
      cursor: pointer;
    }
  }

  h4 {
    margin-top: 20px;
  }

  .property-input {
    position: fixed;
    display: none;
  }

  .selector-root {
    position: fixed;
    display: none;
  }

  @media screen and (max-width: 800px) {
    .right-hand-side-property-container-root {
      display: none;
    }
  }
</style>