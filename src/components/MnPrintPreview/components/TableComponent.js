
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
    },
    dataSource: {
      type: Object,
      default: ()=> ({})
    }
  },
  computed: {
    rows() {
      if(!this.dataSource || !this.dataSource[this.dataBinding]) return [];
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
      return columns.map(column=> {
        const c = (typeof column === 'string') ? column : "";
        const splits = c.split('||');
        if(splits.length > 1) {
          return createElement('td',
            {
            },
            [
              this.createDIV(createElement, splits)
            ])
        } else {
          return createElement('td',
            {
              domProps: {
                innerHTML: column
              }
          })
        }
      }
      );
    },
    createDIV(createElement, array) {
      return array.map(text=>
        createElement('div', {
          domProps: {
            innerHTML: text
          }
        })
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