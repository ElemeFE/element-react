// @flow
export type Column = {
  label: string,
  prop: string,
  property: string,
  type: string,
  minWidth: number,
  width: number,
  align: string,
  sortable: boolean,
  sortMethod: ()=>void,
  resizable: boolean,
  formatter: ()=>void,
  selectable: boolean,
  fixed: boolean | string,
  filterMethod: ()=>void,
  filters: Array<Object>,
  expandPannel: (any)=>any,
  render: ()=>void
};

export type TableProps = {
  columns: Array<Column>,
  data: Array<Object>,
  height: number,
  maxHeight: number,
  stripe: boolean,
  border: boolean,
  fit: boolean,
  rowClassName: ()=>void,
  style: Object,
  highlightCurrentRow: boolean,
  sumText: string,
  emptyText: string,
  showSummary: boolean,
  getSummaries: ()=>void,

  //Event
  onCurrentChange: ()=>void,
  onSelectAll: ()=>void,
  onSelectChange: ()=>void
};

export type TableState = {
  columns: Array<Column>,
  _columns: Array<Object>,
  fixedLeftColumns: Array<Object>,
  fixedRightColumns: Array<Object>,
  data: Array<Object>,
  sortList: null | Array<Object>,
  filterList: null | Array<Object>,

  bodyWidth: '' | number,
  bodyHeight: '' | number,
  headerHeight: '' | number,
  realTableHeaderHeight: '' | number,
  realTableHeight: '' | number,
  realTableWidth: '' | number,
  resizeProxyVisible: boolean,

  scrollY: boolean,
  scrollX: boolean
};

export type DefaultTableProps = {
  columns: Array<Column>,
  data: Array<Object>,
  stripe: boolean,
  border: boolean,
  fit: boolean,
  highlightCurrentRow: boolean
};


export type TableHeaderProps = {
  columns: Array<Column>,
  fixed: string,
  border: string,
  style: Object,
  isScrollY: boolean,
  flettenColumns: Object
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
  columns: Array<Column>,
  data: Array<Object>,
  rowClassName: ()=>void,
  highlightCurrentRow: boolean,
  style: Object,
  fixed: string,
  flettenColumns: Object
};

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
