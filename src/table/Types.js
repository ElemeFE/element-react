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
  render?: (row: Object, column: _Column, index: number) => React.Element,
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
  selectable?: (row: Object, index: number) => boolean,
  reserveSelection: boolean,
  filters?: Array<{ text: any, value: any }>,
  filterPlacement?: string,
  filterMultiple: boolean,
  filterMethod?: (value: any, row: Object) => boolean,
  filteredValue?: Array<any>,
  subColumns?: Array<Column>
};

export type _Column = Column & {
  realWidth: number,
  render: (row: Object, column: _Column, index: number) => React.Element<any>,
  renderHeader: (column: _Column) => React.Element<any>,
};

export type TableStoreProps = {
  style?: Object,
  className?: string,
  data?: Array<Object>,
  columns?: Array<Column>,
  height?: string | number,
  maxHeight?: string | number,
  stripe: boolean,
  border: boolean,
  fit: boolean,
  showHeader: boolean,
  highlightCurrentRow: boolean,
  currentRowKey?: string | number | Array<string | number>,
  rowClassName?: ((row: Object, index: number) => string) | string,
  rowStyle: ((row: Object, index: number) => Object) | Object,
  rowKey: ((row: Object) => string | number) | string,
  emptyText: string,
  defaultExpandAll: boolean,
  expandRowKeys?: Array<number | string>,
  defaultSort?: {
    prop: string,
    order?: 'ascending' | 'descending',
  },
  tooltipEffect?: 'dark' | 'light',
  showSummary: boolean,
  sumText: string,
  summaryMethod?: ({ column: Array<Column>, data: Array<Object> }) => any,

  //Event
  onCurrentChange: ()=>void,
  onSelectAll: ()=>void,
  onSelectChange: ()=>void
};

export type TableStoreState = {
  sortedData: Array<Object>,
  data: Array<Object>,
  _columns: Array<_Column>,
  fixedColumns: Array<_Column>,
  rightFixedColumns: Array<_Column>,
  originColumns: Array<_Column>,
  columns: Array<_Column>,
  isComplex: boolean,
  defaultExpandAll: boolean,
};

export type TableLayoutProps = TableStoreProps & { store: TableStoreState, renderExpanded?: (row: Object, rowIndex: number) => React.Element };

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

export type TableProps = TableLayoutProps & { layout: TableLayoutState };

export type TableState = {};

export type TableHeaderProps = TableProps & { fixed: true | 'left' | 'right' };
export type TableBodyProps = TableHeaderProps;
export type TableFooterProps = TableHeaderProps;

// export type FilterProps = {
//   defaultCondi: null | Array<Object>,
//   filters: Array<Object>,
//   onFilter: (any)=>void,
//   onClose: ()=>void,
//   visible: boolean,
//   position: Object,
//   popper: any,
//   ower: Object
// };
//
// export type FilterState = {
//   visible: boolean,
//   defaultStyle: Object,
//   checked: Array<Object>
// };
//
// export type FilterDefaultProps = {
//   filters: Array<Object>,
//   onFilter: ()=>void
// }

export type FilterProps = {
  visible: boolean,
  multiple: boolean,
  placement: string,
  filters: Array<Object>,
  filteredValue: Array<any>,
  onFilterChange: (value: any) => void
}

export type FilterState = {
  filteredValue: Array<any>,
}
