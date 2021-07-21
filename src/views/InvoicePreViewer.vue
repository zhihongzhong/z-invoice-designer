<template>
  <div class="mn-invoice-previewer-root">
    <paper :data-source="testDataSource[0]" :field-service="getService" />
  </div>
</template>

<script>
  import Vue from 'vue';
  import Paper from '@components/MnPrintPreview/Paper';

  export default {
    name: "MnInvoicePreViewer",

    data() {
      return {
        testDataSource: [
          {
            hello: '你好',
            world: [
              {
                hello: '你好',
                greeting: '问候',
                welcome: '欢迎'
              }
            ],
            delete: [
              {
                news: '人民网',
                user: '火星用户',
                comment: '火星评论'
              },
              {
                news: 'BBC',
                user: 'jennifer',
                comment: 'Sup'
              },
              {
                news: 'CGTN',
                user: 'Alice',
                comment: 'Bad communication'
              },
              {
                news: 'CNN',
                user: 'Bob',
                comment: 'Good communication'
              }
            ]
          }
        ]
      }
    },

    components: {
      Paper
    },
    methods: {
      getService() {
        return new Promise((resolve, reject)=> {
          const treeNodes = Vue.ls.get('treeNodes');
          setTimeout(()=> {
            resolve({treeNodes  })
          }, 1000);
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .mn-invoice-previewer-root {
    width: 100vw;
    min-height: 100vh;
    background: #eaeaea;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 0;
  }
</style>