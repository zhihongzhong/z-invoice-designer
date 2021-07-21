<template>
  <div class="paper-size-modal-root" @click.stop>
    <div class="mask" v-if="showModal">
      <div class="modal-border">
        <div class="title">
          <span>设置纸张大小</span>
        </div>

        <div class="content">
          <div class="stage-data-binding">
            <h5>请选择纸张大小</h5>
            <select v-model="paperSize">
              <option v-for="(item, index) in paperSizeList" :key="index" :value="item.value">
                {{item.name}}
              </option>
            </select>
          </div>
          <div class="stage-data-binding">
            <h5>请选择纸张方向</h5>
            <select v-model="orientation">
              <option v-for="(item, index) in orientationList" :key="index" :value="item.value">
                {{item.name}}
              </option>
            </select>
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
    name: "PaperSizeModal",

    data() {
      return {
        callback: null,
        showModal: false,
        paperSize: '210x297',
        orientation: 'portrait',

        paperSizeList: [
          {
            name: 'A4',
            value: '210x297'
          },
          {
            name: 'A3',
            value: '297x420'
          },
          {
            name: 'A5',
            value: '148x210'
          }
        ],
        orientationList: [
          {
            name: 'portrait',
            value: 'portrait'
          },
          {
            name: 'landscape',
            value: 'landscape'
          }
        ]
      }
    },

    inject: {
      parent: {
        default: null
      }
    },
    methods: {

      // @interface
      show(callback) {
        this.callback = callback;
        this.showModal = true;
      },

      confirmDataBinding() {
        let [ width, height ] = this.paperSize.split('x');
        if(this.orientation === 'landscape') {
          const t = width ;
          width = height;
          height = t;
        }
        width = parseInt(width, 0);
        height = parseInt(height, 0);
        this.callback({
          width,
          height
        });
        this.showModal = false;
      }
    }
  }
</script>

<style scoped lang="less">
  .paper-size-modal-root {
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
        padding: 10px 20px;
        box-sizing: border-box;
        width: 100%;

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