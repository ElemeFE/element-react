// @flow
type Column = {
  type?: string,
  columnKey?: string,
  label?: string,
  prop?: string,
  property?: string,
  width?: number,
  minWidth?: number,
  fixed?: true | 'left' | 'right',
  render?: ()=>void,
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

export type TableProps = {
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
  currentRowKey?: string | number,
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

type _Column = Column & {
  realWidth: number
};

export type TableStoreState = {
  rowKey: string | () => string,
  defaultExpandAll: boolean,
  _columns: Array<_Column>,
  fixedColumns: Array<_Column>,
  rightFixedColumns: Array<_Column>,
  originColumns: Array<_Column>,
  columns: Array<_Column>,
  isComplex: boolean,
};

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

// export type TableProps = TableLayoutProps & { layout: TableLayoutState };

export type TableState = {

};

// export type DefaultTableProps = {
//   columns: Array<Column>,
//   data: Array<Object>,
//   stripe: boolean,
//   border: boolean,
//   fit: boolean,
//   highlightCurrentRow: boolean
// };


export type TableHeaderProps = {
  store: TableStoreState,
  layout: TableLayoutState,
  border: boolean,
  fixed?: true | 'left' | 'right'
};

export type TableHeaderState = {
  allChecked: boolean,
  dragging: boolean,
  dragState: Object,
  sortStatus: number,
  sortPropertyName: string,
  filterParams: Object
};

export type TableBodyProps = {
  store: TableStoreState,
  layout: TableLayoutState,
  border: boolean,
  fixed?: true | 'left' | 'right'
}

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

export type TableFooterProps = {
  leafColumns: Array<Object>,
  sumText: string,
  data: Array<Object>,
  getSummaries: (any, any) => mixed
};

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
