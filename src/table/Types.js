// @flow
import * as React from 'react';

export type Column = {
  type?: string,
  columnKey?: string,
  label?: string,
  prop?: string,
  property?: string,
  width?: number,
  minWidth?: number,
  fixed?: true | 'left' | 'right',
  render?: (row: Object, column: _Column, index: number) => React.Node,
  renderHeader?: () => void,
  sortable: boolean | 'custom',
  sortMethod?: ()=>void,
  resizable: boolean,
  formatter?: ()=>void,
  showOverflowTooltip: boolean,
  align: 'left' | 'center' | 'right',
  headerAlign: 'left' | 'center' | 'right',
  className?: string,
  labelClassName?: string,
  selectable?: boolean,
  reserveSelection: boolean,
  filters?: Array<{ text: any, value: any }>,
  filterPlacement?: string,
  filterMultiple: boolean,
  filterMethod?: (value: any, row: Object) => boolean,
  subColumns?: Array<Column>
};

export type _Column = Column & {
  realWidth: number,
  render: (row: Object, column: _Column, index: number) => React.Element<any>,
  renderHeader: (column: _Column) => React.Element<any>,
};

export type TableStoreProps = {
  data?: Array<Object>,
  columns?: Array<Column>,
  style?: Object,
  height?: string | number,
  maxHeight?: string | number,
  stripe: boolean,
  border: boolean,
  fit: boolean,
  showHeader: boolean,
  highlightCurrentRow?: boolean,
  currentRowKey?: string | number | Array<string | number>,
  rowClassName?: ((row: Object, index: number) => string) | string,
  rowStyle: ((row: Object, index: number) => Object) | Object,
  rowKey: ((row: Object) => string | number) | string,
  emptyText: string,
  defaultExpandAll: boolean,
  expandRowKeys: Array<number | string>,
  defaultSort: {
    prop: string,
    order?: 'ascending' | 'descending',
  },
  tooltipEffect: 'dark' | 'light',
  showSummary: boolean,
  sumText: string,
  summaryMethod: ({ column: Array<Column>, data: Array<Object> }) => any,

  //Event
  onCurrentChange: ()=>void,
  onSelectAll: ()=>void,
  onSelectChange: ()=>void
};

export type TableStoreState = {
  _data: Array<Object>,
  data: Array<Object>,
  _columns: Array<_Column>,
  fixedColumns: Array<_Column>,
  rightFixedColumns: Array<_Column>,
  originColumns: Array<_Column>,
  columns: Array<_Column>,
  isComplex: boolean,
  defaultExpandAll: boolean,
};

export type TableLayoutProps = TableStoreProps & { store: TableStoreState };

export type TableLayoutState = {
  height?: string | number,
  gutterWidth: number,
  tableHeight?: number,
  headerHeight?: number,
  bodyHeight?: number,
  footerHeight?: number,
  fixedBodyHeight?: number,
  viewportHeight?: number,
  scrollX?: boolean,
  scrollY?: boolean,
};

export type TableProps = TableStoreProps & { layout: TableLayoutState };

export type TableState = {

};

export type compositiveTableProps = TableStoreProps & { store: TableStoreState } & { layout: TableLayoutState };

export type TableHeaderProps = TableProps & { fixed: true | 'left' | 'right' };
export type TableBodyProps = TableHeaderProps;
export type TableFooterProps = TableHeaderProps;

// export type TableHeaderProps = {
//   store: TableStoreState,
//   layout: TableLayoutState,
//   fixed?: true | 'left' | 'right'
// };

export type TableHeaderState = {
  allChecked: boolean,
  dragging: boolean,
  dragState: Object,
  sortStatus: number,
  sortPropertyName: string,
  filterParams: Object
};

// export type TableBodyProps = {
//   store: TableStoreState,
//   layout: TableLayoutState,
//   fixed?: true | 'left' | 'right'
// }

export type TableBodyState = {
  highlightRows: Array<Object>,
  selected: Array<Object>
};

export type TableBodyItemProps = {
  columns: Array<Column>,
  itemData: Object,
  fixed: string,
  onSelected: (boolean, any)=>void,
  selected: boolean,
  isHiglight: boolean,
  rowIndex: number,
  rowClassName: (any, any)=>string,
  leafColumns: Array<Object>
};

export type TableBodyItemState = {
  hover: boolean,
  expand: boolean
};

export type TableFooterState = {
  dataList: Array<mixed>
};

// export type TableFooterProps = {
//   leafColumns: Array<Object>,
//   sumText: string,
//   data: Array<Object>,
//   getSummaries: (any, any) => mixed
// };

export type FilterProps = {
  defaultCondi: null | Array<Object>,
  filters: Array<Object>,
  onFilter: (any)=>void,
  onClose: ()=>void,
  visible: boolean,
  position: Object,
  popper: any,
  ower: Object
};

export type FilterState = {
  visible: boolean,
  defaultStyle: Object,
  checked: Array<Object>
};

export type FilterDefaultProps = {
  filters: Array<Object>,
  onFilter: ()=>void
}
