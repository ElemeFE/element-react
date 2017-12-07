// @flow
export type strOrNum = string | number;

export type Column = {
  type?: string,
  columnKey?: string,
  label?: string,
  prop?: string,
  property?: string,
  width?: number,
  minWidth?: number,
  fixed?: true | 'left' | 'right',
  render?: (row: Object, column: _Column, index: number) => Object,
  renderHeader?: () => void,
  sortable: boolean | 'custom',
  sortMethod?: (a: Object, b: Object) => boolean,
  resizable: boolean,
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
  filteredValue?: Array<strOrNum> | strOrNum,
  subColumns?: Array<Column>
};

export type _Column = {
  id: string,
  type?: string,
  columnKey: string,
  label?: string,
  prop?: string,
  property?: string,
  width?: number,
  minWidth?: number,
  fixed?: true | 'left' | 'right',
  sortable: boolean | 'custom',
  sortMethod?: (a: Object, b: Object) => boolean,
  resizable: boolean,
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
  filteredValue?: Array<strOrNum> | strOrNum,
  subColumns?: Array<Column>,
  realWidth: number,
  render: (row: Object, column: _Column, index: number) => Object,
  renderHeader: (column: _Column) => Object,
  filterable: boolean,
  filterOpened: boolean,
  rowSpan: number,
  colSpan: number,
  level: number,
  subColumns?: Array<_Column>
};

export type TableStoreProps = {
  style?: Object,
  className?: string,
  data?: Array<Object>,
  columns?: Array<Column>,
  height?: strOrNum,
  maxHeight?: strOrNum,
  stripe: boolean,
  border: boolean,
  fit: boolean,
  showHeader: boolean,
  highlightCurrentRow: boolean,
  currentRowKey?: strOrNum | Array<strOrNum>,
  rowClassName?: ((row: Object, index: number) => string) | string,
  rowStyle: ((row: Object, index: number) => Object) | Object,
  rowKey: ((row: Object) => strOrNum) | string,
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
};

export type TableStoreState = {
  sortedData: Array<Object>,
  data: Array<Object>,
  fixedColumns: Array<_Column>,
  rightFixedColumns: Array<_Column>,
  columnRows: Array<Array<_Column>>,
  columns: Array<_Column>,
  isComplex: boolean,
  defaultExpandAll: boolean,
};

export type TableLayoutProps = TableStoreProps & { store: TableStoreState, renderExpanded?: (row: Object, rowIndex: number) => Object };

export type TableLayoutState = {
  height?: strOrNum,
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


export type FilterProps = {
  visible: boolean,
  multiple: boolean,
  filters: Array<Object>,
  filteredValue: Array<any>,
  filerPlacement?: string,
  onFilterChange: (value: any) => void,
  toggleFilter: () => void
}

export type FilterState = {
  filteredValue: Array<any>,
}
