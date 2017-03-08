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
  [fixed:string]:boolean,
  filterMethod: ()=>void,
  filters: Array<Object>,
  render: ()=>void
};

export type TableProps = {
  columns: Array<Column>,
  data: Array<Object>,
  height: number,
  stripe: boolean,
  border: boolean,
  fit: boolean,
  rowClassName: ()=>void,
  style: Object,
  highlightCurrentRow: boolean,

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
  isScrollY: boolean
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
  fixed: string
};

export type TableBodyState = {
  highlightRows: Array<Object>,
  selected: Array<Object>
};

export type TableBodyItemProps = {
  columns: Array<Column>,
  itemData: Object,
  fixed: string,
  onSelected: ()=>void,
  selected: boolean,
  isHiglight: boolean,
  rowIndex: number,
  rowClassName: ()=>void
};

export type TableBodyItemState = {
  hover: boolean
};

export type FilterProps = {
  defaultCondi: null | Array<Object>,
  filters: Array<Object>,
  onFilter: ()=>void,
  onClose: ()=>void,
  visible: boolean,
  position: Object,
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