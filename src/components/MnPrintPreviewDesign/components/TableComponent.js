
import './TableComponent.less';

export default {
  
  name: 'TableComponent',
  
  props: {
    columns: {
      type: Array,
      default: ()=>[]
    }
  },
  computed: {
    rows() {
      const captions = [];
      const values = [];
      this.columns.forEach(column => {
        captions.push(column[0].value);
        values.push(`{{${column[1].value}}}`);
      });
      return [captions, values];
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