<template>
  <div class="data-binding-modal-root" @click.stop>
    <div class="mask" v-if="showModal">
      <div class="modal-border">
        <div class="title">
          <span>数据绑定</span>
        </div>

        <div class="content">
          <div class="stage-data-binding">
            <h5>请绑定一个数组</h5>
            <select @change="changeDataBinding" v-model="fieldBinding" :disabled="columns.length > 0">
              <option v-for="(item, index) in dataDefinition" :key="index" :value="item.name">
                {{item.name}}
              </option>
            </select>
          </div>
          <div class="stage-data-binding">
            <h5>请输入权限前缀</h5>
            <input v-model="authorityPrefix"/>
          </div>
          <div class="stage-data-source-binding" v-if="selectedDataSource.length > 0">
            <div v-for="(column, index) in columns" :key="index" class="column-definition">
              <div v-for="(def, idx) in column" :key="idx" class="row">
                <span>{{def.name}}</span>
                <span>
                  <input v-if="def.type === 'input'" :value="def.value" @blur="e=>changeFieldBinding(e, index, idx)"/>
                  <select v-if="def.type === 'select'" @change="e=>changeFieldBinding(e, index, idx)" v-model="def.value">
                    <option
                      v-for="(it, i) in selectedDataSource"
                      :value="it.value"
                    >{{it.name}}</option>
                  </select>
                </span>
              </div>
            </div>
            <button @click="addColumnDefinition">添加一列</button>
            <button @click="removeColumnDefinition" style="margin-top: 10px; background: white; color: #333333; border: 1px solid #333333;">删除一列</button>
          </div>
        </div>

        <div class="footer">
          <div class="button-wrap">
            <button @click="confirmDataBinding">确定</button>
            <button
              style="margin-right: 20px; background: white; color: #333333; border: 1px solid #bababa"
              @click="showModal = false"
            >返回</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DataBindingModal",

    data() {
      return {
        columns: [],
        fieldBinding: '',
        dataDefinition: [],
        selectedDataSource: [],
        showModal: false,
        genColumnDefinition: null,
        setProperties: null,
        authorityPrefix: ''
      }
    },

    inject: {
      parent: {
        default: null
      }
    },
    methods: {

      // @interface
      show(dataDefinition, getProperties, setProperties) {
        const {
          genColumnDefinition,
          columns,
          fieldBinding,
          authorityPrefix
        } = getProperties();
        this.genColumnDefinition = genColumnDefinition;
        this.columns = columns;
        this.fieldBinding = fieldBinding;
        this.dataDefinition = dataDefinition;
        this.setProperties = setProperties;
        this.authorityPrefix = authorityPrefix;

        if(this.isValid(fieldBinding)) {
          const index = this.getFieldBindingIndex(fieldBinding, dataDefinition);
          this.selectedDataSource = this.dataDefinition[index].value;
        }
        this.showModal = true;
      },

      isValid(value) {
        return value !== '' && value !== null && value !== undefined;
      },

      getFieldBindingIndex(fieldBinding, dataDefinition) {
        return dataDefinition.findIndex(item=>item.name === fieldBinding);
      },

      changeDataBinding(e) {
        const value = e.target.value;
        const index = this.getFieldBindingIndex(value, this.dataDefinition);
        if(!Array.isArray(this.dataDefinition[index].value)) {
          this.selectedDataSource = []; // inform vue not to show data-source selector
          this.columns = [];
          this.parent.reportError('invalid value');
          return 0;
        }
        this.columns = [];
        // it certainly is a valid value
        this.selectedDataSource = this.dataDefinition[index].value;
      },

      addColumnDefinition() {
        this.columns.push(this.genColumnDefinition());
        this.columns = [...this.columns];
      },
      removeColumnDefinition() {
        this.columns.pop();
        this.columns = [...this.columns];
      },
      changeFieldBinding(event, columnIndex, fieldIndex) {
        const value = event.target.value;
        this.columns[columnIndex][fieldIndex].value = value;
        this.columns = [...this.columns];
      },
      confirmDataBinding() {
        this.setProperties({
          columns: this.columns,
          fieldBinding: this.fieldBinding,
          authorityPrefix: this.authorityPrefix
        });
        this.showModal = false;
      }
    }
  }
</script>

<style scoped lang="less">
  .data-binding-modal-root {
    user-select: none;

    .mask {
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background: rgba(0,0,0, 0.7);
      z-index: 1000;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-border {
      width: 400px;
      height: 600px;
      background: white;
      border-radius: 8px;
      box-sizing: border-box;
      position: relative;

      .title {
        font-size: 20px;
        font-weight: bold;
        height: 50px;
        padding: 10px 20px;
        position: relative;
        width: 100%;
        &:after {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background: #efefef;
        }
      }

      .content {
        padding: 10px 20px 40px 20px;
        box-sizing: border-box;
        width: 100%;
        max-height: 500px;
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
          background: transparent;
          border: none;
        }
        .stage-data-binding {
          margin-bottom: 30px;
          width: 100%;
          h5 {
            font-size: 16px;
          }
          select {
            width: 100%;
            border: 1px dashed #bababa;
            outline: none;
            height: 30px;
            display: flex;
            align-items: center;
          }

          input {
            width: 100%;
            outline: none;
            border: none;
            border-bottom: 1px solid #bababa;
          }
        }

        .stage-data-source-binding {
          width: 100%;
          button {
            width: 100%;
            background: #0c8fcf;
            color: white;
            border: none;
            height: 30px;
            border-radius: 5px;
            font-size: 12px;
          }

          .column-definition {
            margin-bottom: 20px;
            width: 100%;
            border: 1px solid #666666;
            .row {
              height: 30px;
              display: flex;
              align-items: center;
              box-sizing: border-box;
              span {
                display: block;
                width: 50%;
                box-sizing: border-box;
                padding: 0 10px;
              }

              input,select {
                border: none;
                outline: none;
                width: 100%;
              }

              &>span:nth-child(1) {
                border-right: 1px solid #666666;
              }
            }
            .row:not(:last-of-type) {
              border-bottom: 1px solid #666666;
            }
          }
        }
      }

      .footer {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background: white;
        
        .button-wrap {
          width: 100%;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          padding: 10px 20px;
          box-sizing: border-box;

          &:before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 1px;
            background: #efefef;
          }
        }

        button {
          width: 70px;
          height: 28px;
          background: #0c8fcf;
          color: white;
          border: none;
        }
      }
    }
  }
</style>