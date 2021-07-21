
import './TableComponent.less';

export default {
  
  name: 'TableComponent',
  
  props: {
    columns: {
      type: Array,
      default: ()=>[]
    },
    dataBinding: {
      type: String,
      default: ''
    }
  },
  inject: {
    dataSource: {
      default: null
    }
  },
  computed: {
    rows() {
      const actualData = this.dataSource[this.dataBinding].map(row=> {
        return this.columns.map(column=> {
          return row[column.dataIndex];
        });
      });
      const titles = this.columns.map(item=>item.title);
      actualData.unshift(titles);
      return actualData;
    },
  },
  methods: {
    createTR(createElement, rows) {
      return rows.map(row =>
        createElement('tr',
          {
          },
          this.createTD(createElement, row)
          )
      );
    },
    createTD(createElement, columns) {
      return columns.map(column=>
        createElement('td',
          {
            domProps: {
              innerHTML: column
            }
          },
          [
          
          ])
      );
    }
  },
  render(createElement) {
    return createElement(
      'table',
      {
        class: {
          'table-component-root': true
        },
        domProps: {
          border: '1'
        }
      },
      this.createTR(createElement, this.rows)
    );
  }
}