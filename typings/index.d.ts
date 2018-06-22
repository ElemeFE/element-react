// TypeScript Version: 2.3

/// <reference types="react" />

declare module "element-react" {
  export import i18n = ElementReact.i18n
  export import Alert = ElementReact.Alert
  export import Button = ElementReact.Button
  export import Card = ElementReact.Card
  export import Layout = ElementReact.Layout
  export import Loading = ElementReact.Loading
  export import Message = ElementReact.Message
  export import MessageBox = ElementReact.MessageBox
  export import Notification = ElementReact.Notification
  export import Radio = ElementReact.Radio
  export import Dialog = ElementReact.Dialog
  export import Rate = ElementReact.Rate
  export import Progress = ElementReact.Progress
  export import Badge = ElementReact.Badge
  export import Tabs = ElementReact.Tabs
  export import Tree = ElementReact.Tree
  export import Input = ElementReact.Input
  export import Icon = ElementReact.Icon
  export import Menu = ElementReact.Menu
  export import Steps = ElementReact.Steps
  export import Breadcrumb = ElementReact.Breadcrumb
  export import Tooltip = ElementReact.Tooltip
  export import InputNumber = ElementReact.InputNumber
  export import Checkbox = ElementReact.Checkbox
  export import Slider = ElementReact.Slider
  export import Table = ElementReact.Table
  export import Switch = ElementReact.Switch
  export import Form = ElementReact.Form
  export import Upload = ElementReact.Upload
  export import Tag = ElementReact.Tag
  export import Select = ElementReact.Select
  export import Dropdown = ElementReact.Dropdown
  export import Popover = ElementReact.Popover
  export import Pagination = ElementReact.Pagination
  export import AutoComplete = ElementReact.AutoComplete
  export import TimeSelect = ElementReact.TimeSelect
  export import TimePicker = ElementReact.TimePicker
  export import TimeRangePicker = ElementReact.TimeRangePicker
  export import DatePicker = ElementReact.DatePicker
  export import DateRangePicker = ElementReact.DateRangePicker
  export import Carousel = ElementReact.Carousel
  export import Collapse = ElementReact.Collapse
  export import ColorPicker = ElementReact.ColorPicker
  export import Cascader = ElementReact.Cascader
  export import Transfer = ElementReact.Transfer
}

declare module "element-react/next" {
  export import i18n = ElementReact.i18n
  export import Alert = ElementReact.Alert
  export import Button = ElementReact.Button
  export import Card = ElementReact.Card
  export import Layout = ElementReact.Layout
  export import Loading = ElementReact.Loading
  export import Message = ElementReact.Message
  export import MessageBox = ElementReact.MessageBox
  export import Notification = ElementReact.Notification
  export import Radio = ElementReact.Radio
  export import Dialog = ElementReact.Dialog
  export import Rate = ElementReact.Rate
  export import Progress = ElementReact.Progress
  export import Badge = ElementReact.Badge
  export import Tabs = ElementReact.Tabs
  export import Tree = ElementReact.Tree
  export import Input = ElementReact.Input
  export import Icon = ElementReact.Icon
  export import Menu = ElementReact.Menu
  export import Steps = ElementReact.Steps
  export import Breadcrumb = ElementReact.Breadcrumb
  export import Tooltip = ElementReact.Tooltip
  export import InputNumber = ElementReact.InputNumber
  export import Checkbox = ElementReact.Checkbox
  export import Slider = ElementReact.Slider
  export import Table = ElementReact.Table
  export import Switch = ElementReact.Switch
  export import Form = ElementReact.Form
  export import Upload = ElementReact.Upload
  export import Tag = ElementReact.Tag
  export import Select = ElementReact.Select
  export import Dropdown = ElementReact.Dropdown
  export import Popover = ElementReact.Popover
  export import Pagination = ElementReact.Pagination
  export import AutoComplete = ElementReact.AutoComplete
  export import TimeSelect = ElementReact.TimeSelect
  export import TimePicker = ElementReact.TimePicker
  export import TimeRangePicker = ElementReact.TimeRangePicker
  export import DatePicker = ElementReact.DatePicker
  export import DateRangePicker = ElementReact.DateRangePicker
  export import Carousel = ElementReact.Carousel
  export import Collapse = ElementReact.Collapse
  export import ColorPicker = ElementReact.ColorPicker
  export import Cascader = ElementReact.Cascader
  export import Transfer = ElementReact.Transfer
}

declare namespace ElementReact {
  type typeColor = 'success' | 'info' | 'warning'
  type I18nLang = any
  // i18n
  interface I18n {
    // TODO: set lang type
    use(lang: I18nLang): void
    // TODO: set options type
    t(path: string, options: any): string
  }
  export const i18n: I18n

  // Alert
  interface AlertProps extends ElementReactLibs.ComponentProps<{}> {
    onClose?(): void
    title: string
    description?: string
    type?: typeColor | 'error'
    closable?: boolean
    closeText?: string
    showIcon?: boolean
  }
  export class Alert extends ElementReactLibs.Component<AlertProps, {}> { }

  // Button
  interface ButtonProps extends ElementReactLibs.ComponentProps<{}> {
    onClick?(e: React.SyntheticEvent<HTMLButtonElement>): void
    type?: typeColor | 'danger' | 'primary' | 'text'
    size?: 'large' | 'small' | 'mini'
    icon?: string
    nativeType?: 'button' | 'submit' | 'reset'
    loading?: boolean
    disabled?: boolean
    plain?: boolean
  }
  class ButtonGroup extends ElementReactLibs.Component<{}, {}> { }
  export class Button extends ElementReactLibs.Component<ButtonProps, {}> {
    static Group: typeof ButtonGroup
  }

  // Card
  interface CardProps extends ElementReactLibs.ComponentProps<{}> {
    header?: string | React.ReactElement<any>
    bodyStyle?: React.CSSProperties
  }
  export class Card extends ElementReactLibs.Component<CardProps, {}> { }

  // Layout
  interface RowProps extends ElementReactLibs.ComponentProps<{}> {
    gutter?: number | string
    type?: 'flex'
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
    align?: 'top' | 'middle' | 'bottom'
  }
  class Row extends ElementReactLibs.Component<RowProps, {}> { }
  interface ColProps extends ElementReactLibs.ComponentProps<{}> {
    span: number | string
    offset?: number | string
    pull?: number | string
    push?: number | string
    // the next props are not on https://eleme.github.io/element-react/#/zh-CN/layout
    xs?: number | string | Object
    sm?: number | string | Object
    md?: number | string | Object
    lg?: number | string | Object
  }
  class Col extends ElementReactLibs.Component<ColProps, {}> { }
  export const Layout: {
    Row: typeof Row
    Col: typeof Col
  }

  // Loading
  interface LoadingProps extends ElementReactLibs.ComponentProps<{}> {
    loading?: boolean
    fullscreen?: boolean
    text?: string
  }
  export class Loading extends ElementReactLibs.Component<LoadingProps, {}> { }

  // Message
  type Message = any
  interface MessageOptions {
    message: string
    type?: typeColor | 'error'
    iconClass?: string
    customClass?: string
    duration?: number
    showClose?: boolean
    onClose?(message?: Message): void
  }
  type MessageFunction = (options: string | MessageOptions, type?: typeColor | 'error') => void
  type MessageObject = {
    success(options: string | MessageOptions): void
    info(options: string | MessageOptions): void
    warning(options: string | MessageOptions): void
    error(options: string | MessageOptions): void
    close(): void
  }
  export const Message: MessageFunction & MessageObject

  // MessageBox
  interface NextOptions {
    modal?: 'alert' | 'confirm' | 'prompt'
    type?: typeColor | 'error'
    title?: string
    message?: string
    showInput?: boolean
    showClose?: boolean
    showCancelButton?: boolean
    showConfirmButton?: boolean
    confirmButtonText?: string
    cancelButtonText?: string
    cancelButtonClass?: string
    confirmButtonClass?: string
    inputPlaceholder?: string
    inputPattern?: RegExp
    inputValidator?(): string | boolean
    inputErrorMessage?: string
  }
  export const MessageBox: {
    alert(message: string, props?: NextOptions): Promise<void>
    alert(message: string, title?: string, props?: NextOptions): Promise<void>
    confirm(message: string, props?: NextOptions): Promise<void>
    confirm(message: string, title?: string, props?: NextOptions): Promise<void>
    prompt(message: string, props?: NextOptions): Promise<void>
    prompt(message: string, title?: string, props?: NextOptions): Promise<void>
    msgbox(options?: NextOptions): Promise<void>
  }

  // Notification
  interface NotificationOptions {
    message?: string | React.ReactElement<any>
    title?: string
    type?: typeColor | 'error'
    iconClass?: string
    duration?: number
    onClick?(): void
    onClose?(): void
    offset?: number
  }
  type NotificationFunction = (options: string | NotificationOptions, type?: typeColor | 'error') => void
  type NotificationObject = {
    success(options: string | NotificationOptions): void
    info(options: string | NotificationOptions): void
    warning(options: string | NotificationOptions): void
    error(options: string | NotificationOptions): void
    close(): void
  }
  export const Notification: NotificationFunction & NotificationObject

  // Radio
  interface RadioProps extends ElementReactLibs.ComponentProps<{}> {
    value: string | number | boolean
    onChange?(value?: string | number | boolean): void
    disabled?: boolean
    checked?: boolean
    name?: string
  }
  interface RadioGroupProps extends ElementReactLibs.ComponentProps<{}> {
    value?: string | number
    disabled?: boolean
    size?: 'large' | 'small'
    textColor?: string
    fill?: string
    onChange?(value?: string | number): void
  }
  interface RadioButtonProps extends ElementReactLibs.ComponentProps<{}> {
    value: string | number
    disabled?: boolean
    name?: string
  }
  class RadioGroup extends ElementReactLibs.Component<RadioGroupProps, {}> { }
  class RadioButton extends ElementReactLibs.Component<RadioButtonProps, {}> { }
  export class Radio extends ElementReactLibs.Component<RadioProps, {}> {
    static Group: typeof RadioGroup
    static Button: typeof RadioButton
  }

  // Dialog
  interface DialogProps extends ElementReactLibs.ComponentProps<{}> {
    visible: boolean
    title?: string
    size?: 'tiny' | 'small' | 'large' | 'full'
    top?: string
    modal?: boolean
    customClass?: string
    lockScroll?: boolean
    closeOnClickModal?: boolean
    closeOnPressEscape?: boolean
    onCancel?(): void
    onOpen?(...args): any
    opClose?(...args): any
  }
  interface DialogBodyProps extends ElementReactLibs.ComponentProps<{}> { }
  interface DialogFooterProps extends ElementReactLibs.ComponentProps<{}> { }
  class DialogBody extends ElementReactLibs.Component<DialogBodyProps, {}> { }
  class DialogFooter extends ElementReactLibs.Component<DialogFooterProps, {}> { }
  export class Dialog extends ElementReactLibs.Component<DialogProps, {}> {
    static Body: typeof DialogBody
    static Footer: typeof DialogFooter
  }

  // Rate
  interface RateProps extends ElementReactLibs.ComponentProps<{}> {
    colors?: string[]
    texts?: string[]
    showText?: boolean
    textColor?: string
    disabled?: boolean
    value?: number
    onChange?(value?: number): void
    textTemplate?: string
    lowThreshold?: number
    highThreshold?: number
    max?: number
    voidColor?: string
    disabledVoidColor?: string
    iconClasses?: string[]
    voidIconClass?: string
    disabledVoidIconClass?: string
    allowHalf?: boolean
  }
  export class Rate extends ElementReactLibs.Component<RateProps, {}> { }

  // Progress
  interface ProgressProps extends ElementReactLibs.ComponentProps<{}> {
    type?: 'line' | 'circle'
    percentage: number
    status?: 'success' | 'exception'
    strokeWidth?: number
    width?: number
    textInside?: boolean
    showText?: boolean
  }
  export class Progress extends ElementReactLibs.Component<ProgressProps, {}> { }

  // Badge
  interface BadgeProps extends ElementReactLibs.ComponentProps<{}> {
    value?: number | string
    max?: number
    isDot?: boolean
  }
  export class Badge extends ElementReactLibs.Component<BadgeProps, {}> { }

  // Tabs
  interface TabsProps extends ElementReactLibs.ComponentProps<{}> {
    type?: 'card' | 'border-card'
    activeName?: string
    value?: string
    closable?: boolean
    addable?: boolean
    editable?: boolean
    // TODO: add tab type
    onTabClick?(tab?: any): void
    onTabRemove?(name?: string): void
    onTabAdd?(): void
    onTabEdit?(targetName?: string, action?: string): void
  }
  interface TabsPaneProps extends ElementReactLibs.ComponentProps<{}> {
    label?: string | React.ReactElement<any>
    name?: string
    disabled?: boolean
    closable?: boolean
  }
  class TabsPane extends ElementReactLibs.Component<TabsPaneProps, {}> { }
  export class Tabs extends ElementReactLibs.Component<TabsProps, {}> {
    static Pane: typeof TabsPane
  }

  // Tree
  interface TreeProps extends ElementReactLibs.ComponentProps<{}> {
    autoExpandParent?: boolean
    checkStrictly?: boolean
    currentNodeKey?: any
    defaultCheckedKeys?: any[]
    defaultExpandedKeys?: any[]
    defaultExpandAll?: boolean
    data?: any[]
    emptyText?: string
    expandOnClickNode?: boolean
    filterNodeMethod?(value?, data?, node?): boolean
    renderContent?(nodeModel?, data?, store?): React.ReactElement<any>
    isShowCheckbox?: boolean
    accordion?: boolean
    indent?: number,
    nodeKey?: string
    options?: {
      children?: string
      label?: string
      icon?: string
    },
    lazy?: boolean
    highlightCurrent?: boolean
    load?(node?, resolve?): void
    onCheckChange?(data?, checked?: boolean, indeterminate?): void
    onNodeClicked?(data?, node?): void
    onCurrentChange?(data?, node?): void
    onNodeExpand?(data?, nodeModel?, node?): void
    onNodeCollapse?(data?, nodeModel?, node?): void
  }
  export class Tree extends ElementReactLibs.Component<TreeProps, {}> {
    filter(...args): void
    getCheckedNodes(leafOnly?: boolean): any[]
    setCheckedNodes(nodes: any[], leafOnly?: boolean): void
    getCheckedKeys(leafOnly?: boolean): any[]
    setCheckedKeys(keys: any[], leafOnly?: boolean): void
    setChecked(data: any, checked: boolean, deep?: boolean): void
  }

  interface InputProps extends ElementReactLibs.ComponentProps<{}>
  {
    type?: string // valid value are 'text' & 'textarea'
    icon?: string | React.ReactElement<any>
    disabled?: boolean
    name?: string
    placeholder?: string
    readOnly?: boolean
    autoFocus?: boolean
    maxLength?: number
    minLength?: number
    defaultValue?: any
    value?: any

    // type !== 'textarea'
    size?: 'large' | 'small' | 'mini'
    prepend?: any
    append?: any

    // type === 'textarea'
    autosize?: boolean | Object
    rows?: number

    // event
    onFocus?(e?: React.SyntheticEvent<HTMLInputElement>): void
    onBlur?(e?: React.SyntheticEvent<HTMLInputElement>): void
    onChange?(e?: React.SyntheticEvent<HTMLInputElement>): void
    onIconClick?(): void
    onMouseEnter?(e?: React.SyntheticEvent<HTMLDivElement>): void
    onMouseLeave?(e?: React.SyntheticEvent<HTMLDivElement>): void

    // autoComplete
    autoComplete?: string
    inputSelect?(item?): void

    // form related
    form?: string
    validating?: boolean

    max?: string | number
    min?: string | number
    step?: string | number
    resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  }
  export class Input extends ElementReactLibs.Component<InputProps, {}> { }

  // Icon
  interface IconProps extends ElementReactLibs.ComponentProps<{}> {
    name: string
  }
  export class Icon extends ElementReactLibs.Component<IconProps, {}> { }

  // Menu
  type menuIndex = string // 这里代码里面标注的 flowtype 是 number
  interface MenuProps extends ElementReactLibs.ComponentProps<{}> {
    mode?: 'horizontal' | 'vertical'
    defaultActive?: menuIndex
    defaultOpeneds?: menuIndex[]
    theme?: 'light' | 'dark'
    uniqueOpened?: boolean
    menuTrigger?: string
    onSelect?(index?: menuIndex, indexPath?: menuIndex[]): void
    onOpen?(index?: menuIndex, indexPath?: menuIndex[]): void
    onClose?(index?: menuIndex, indexPath?: menuIndex[]): void
  }
  interface SubMenuProps extends ElementReactLibs.ComponentProps<{}> {
    index: menuIndex
    title?: React.ReactElement<any> | string
  }
  interface MenuItemProps extends ElementReactLibs.ComponentProps<{}> {
    index: menuIndex
    disabled?: boolean
  }
  interface MenuItemGroupProps extends ElementReactLibs.ComponentProps<{}> {
    title: string
  }
  class SubMenu extends ElementReactLibs.Component<SubMenuProps, {}> { }
  class MenuItem extends ElementReactLibs.Component<MenuItemProps, {}> { }
  class MenuItemGroup extends ElementReactLibs.Component<MenuItemGroupProps, {}> { }
  export class Menu extends ElementReactLibs.Component<MenuProps, {}> {
    static SubMenu: typeof SubMenu
    static Item: typeof MenuItem
    static ItemGroup: typeof MenuItemGroup
  }

  // Steps
  type statusMap = 'wait' | 'process' | 'finish' | 'error' | 'success'
  interface StepsProps extends ElementReactLibs.ComponentProps<{}> {
    space?: number
    active?: number
    direction?: 'vertical' | 'horizontal'
    finishStatus?: statusMap
    processStatus?: statusMap
  }
  interface StepProps extends ElementReactLibs.ComponentProps<{}> {
    title?: string
    icon?: string
    description?: string | React.ReactElement<any>
    status?: statusMap
    direction?: 'vertical' | 'horizontal'
    style?: React.CSSProperties
    lineStyle?: React.CSSProperties
    stepNumber?: number
  }
  class Step extends ElementReactLibs.Component<StepProps, {}> { }
  export class Steps extends ElementReactLibs.Component<StepsProps, {}> {
    static Step: typeof Step
  }

  // Breadcrumb
  interface BreadcrumbProps extends ElementReactLibs.ComponentProps<{}> {
    separator?: string
  }
  interface BreadcrumbItemProps extends ElementReactLibs.ComponentProps<{}> { }
  class BreadcrumbItem extends ElementReactLibs.Component<BreadcrumbItemProps, {}> { }
  export class Breadcrumb extends ElementReactLibs.Component<BreadcrumbProps, {}> {
    static Item: typeof BreadcrumbItem
  }

  // Tooltip
  interface TooltipProps extends ElementReactLibs.ComponentProps<{}> {
    effect?: 'dark' | 'light'
    content?: string | React.ReactElement<any>
    placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
    disabled?: boolean
    transition?: string
    visibleArrow?: boolean
    openDelay?: number
    manual?: boolean
    visible?: boolean
  }
  export class Tooltip extends ElementReactLibs.Component<TooltipProps, {}> { }

  // InputNumber
  interface InputNumberProps extends ElementReactLibs.ComponentProps<{}> {
    defaultValue?: number
    value?: number
    step?: number | string
    max?: number | string
    min?: number | string
    disabled?: boolean
    controls?: boolean
    size?: 'large' | 'small'
    onChange?(value?: number): void
  }
  export class InputNumber extends ElementReactLibs.Component<InputNumberProps, {}> { }

  // Checkbox
  interface CheckboxProps extends ElementReactLibs.ComponentProps<{}> {
    label?: string
    trueLabel?: string | number
    falseLabel?: string | number
    disabled?: boolean
    checked?: boolean
    indeterminate?: boolean
    focus?: boolean
    onChange?(value?): void
  }
  interface CheckboxGroupProps extends ElementReactLibs.ComponentProps<{}> {
    min?: number | string
    max?: number | string
    size?: 'large' | 'small'
    fill?: string
    textColor?: string
    value?: any
    onChange?(value?): void
  }
  interface CheckboxButtonProps extends ElementReactLibs.ComponentProps<{}> { }
  class CheckboxGroup extends ElementReactLibs.Component<CheckboxGroupProps, {}> { }
  class CheckboxButton extends ElementReactLibs.Component<CheckboxButtonProps, {}> { }
  export class Checkbox extends ElementReactLibs.Component<CheckboxProps, {}> {
    static Group: typeof CheckboxGroup
    static Button: typeof CheckboxButton
  }

  // Slider
  interface SliderProps extends ElementReactLibs.ComponentProps<{}> {
    min?: number | string
    max?: number | string
    step?: number | string
    value?: number | number[]
    showInput?: boolean
    showInputControls?: boolean
    showTooltip?: boolean
    showStops?: boolean
    disabled?: boolean
    range?: boolean
    vertical?: boolean
    height?: string
    formatTooltip?(): void
    onChange?(value): void
  }
  export class Slider extends ElementReactLibs.Component<SliderProps, {}> { }

  // Table
  interface TableColumn {
    label?: string
    prop?: string
    property?: string
    type?: string
    minWidth?: number
    width?: number
    align?: string
    sortable?: boolean
    sortMethod?: () => void
    resizable?: boolean
    formatter?: () => void
    selectable?: boolean
    fixed?: boolean | string
    filterMethod?: () => void
    filters?: Object[]
    render?: () => void
  }
  interface TableProps extends ElementReactLibs.ComponentProps<{}> {
    columns?: TableColumn[]
    data?: Object[]
    height?: number
    stripe?: boolean
    border?: boolean
    fit?: boolean
    rowClassName?(row?, index?): void
    style?: Object
    highlightCurrentRow?: boolean
    onCurrentChange?(): void
    onSelectAll?(): void
    onSelectChange?(): void
  }
  export class Table extends ElementReactLibs.Component<TableProps, {}> { }

  // Switch
  interface SwitchProps extends ElementReactLibs.ComponentProps<{}> {
    value?: number | string | boolean
    disabled?: boolean
    width?: number
    onIconClass?: string
    offIconClass?: string
    onText?: string
    offText?: string
    onColor?: string
    offColor?: string
    onValue?: number | string | boolean
    offValue?: number | string | boolean
    name?: string
    onChange?(value: number | string | boolean): void
  }
  export class Switch extends ElementReactLibs.Component<SwitchProps, {}> { }

  // Form
  interface FormProps extends ElementReactLibs.ComponentProps<{}> {
    model?: Object
    rules?: Object
    labelPosition?: 'right' | 'left' | 'top'
    labelWidth?: string | number
    labelSuffix?: string
    inline?: boolean
  }
  interface FormItemProps extends ElementReactLibs.ComponentProps<{}> {
    label?: string
    labelWidth?: string | number
    prop?: string
    required?: boolean
    rules?: Object | any[]
  }
  class FormItem extends ElementReactLibs.Component<FormItemProps, {}> { }
  export class Form extends ElementReactLibs.Component<FormProps, {}> {
    static Item: typeof FormItem
    validate(cb?: (valid: boolean) => void): void
    validateField(prop: string, cb?: () => void): void
    resetFields(): void
  }

  // Upload
  interface UploadProps extends ElementReactLibs.ComponentProps<{}> {
    action: string
    headers?: Object
    data?: Object
    multiple?: boolean
    name?: string
    withCredentials?: boolean
    showFileList?: boolean
    fileList?: any[]
    autoUpload?: boolean
    accept?: string
    drag?: boolean
    listType?: 'text' | 'picture' | 'picture-card'
    tip?: React.ReactElement<any>
    trigger?: React.ReactElement<any>
    beforeUpload?(file?): boolean | Promise<any>
    onRemove?(file?, fileList?: any[]): void
    onPreview?(file?): void
    onProgress?(event?, file?, fileList?: any[]): void
    onSuccess?(response?, file?, fileList?: any[]): void
    onError?(err?, response?, file?): void
    onChange?(file?, fileList?: any[]): void
    className?: string
  }
  export class Upload extends ElementReactLibs.Component<UploadProps, {}> { }

  // Tag
  interface TagProps extends ElementReactLibs.ComponentProps<{}> {
    closable?: boolean
    type?: 'primary' | 'gray' | 'success' | 'warning' | 'danger'
    hit?: boolean,
    color?: string,
    closeTransition?: boolean
    onClose?(): void
  }
  export class Tag extends ElementReactLibs.Component<TagProps, {}> { }

  // Select
  interface SelectProps extends ElementReactLibs.ComponentProps<{}> {
    value?: any
    size?: string
    disabled?: boolean
    clearable?: boolean
    filterable?: boolean
    loading?: boolean
    remote?: boolean
    remoteMethod?(): void
    filterMethod?(): void
    multiple?: boolean
    placeholder?: string
    onChange?(value?): void
  }
  interface SelectOptionProps extends ElementReactLibs.ComponentProps<{}> {
    value: any
    label?: string | number
    selected?: boolean
    disabled?: boolean
  }
  interface SelectOptionGroupProps extends ElementReactLibs.ComponentProps<{}> {
    // disabled?: boolean
    label?: string
  }
  class SelectOption extends ElementReactLibs.Component<SelectOptionProps, {}> { }
  class SelectOptionGroup extends ElementReactLibs.Component<SelectOptionGroupProps, {}> { }
  export class Select extends ElementReactLibs.Component<SelectProps, {}> {
    static Option: typeof SelectOption
    static OptionGroup: typeof SelectOptionGroup
  }

  // Dropdown
  interface DropdownProps extends ElementReactLibs.ComponentProps<{}> {
    menu: React.ReactElement<any>
    type?: typeColor | 'danger' | 'primary' | 'text'
    size?: 'large' | 'small' | 'mini'
    trigger?: 'hover' | 'click'
    menuAlign?: 'start' | 'end'
    splitButton?: boolean
    hideOnClick?: boolean
    onClick?(): void
    onCommand?(command?: string, instance?): void
  }
  interface DropdownMenuProps extends ElementReactLibs.ComponentProps<{}> { }
  interface DropdownItemProps extends ElementReactLibs.ComponentProps<{}> {
    command?: string
    disabled?: boolean
    divided?: boolean
  }
  class DropdownMenu extends ElementReactLibs.Component<DropdownMenuProps, {}> { }
  class DropdownItem extends ElementReactLibs.Component<DropdownItemProps, {}> { }
  export class Dropdown extends ElementReactLibs.Component<DropdownProps, {}> {
    static Menu: typeof DropdownMenu
    static Item: typeof DropdownItem
  }

  // Popover
  interface PopoverProps extends ElementReactLibs.ComponentProps<{}> {
    width?: number | string
    placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
    trigger?: 'click' | 'focus' | 'hover'
    title?: string
    content?: React.ReactElement<any> | string
    popperClass?: string
    transition?: string
    visible?: boolean
    visibleArrow?: boolean
  }
  export class Popover extends ElementReactLibs.Component<PopoverProps, {}> { }

  // Pagination
  interface PaginationProps extends ElementReactLibs.ComponentProps<{}> {
    pageSize?: number
    small?: boolean
    total?: number
    pageCount?: number
    currentPage?: number
    layout?: string,
    pageSizes?: number[]
    onCurrentChange?(currentPage?: number): void
    onSizeChange?(size?: number): void
  }
  export class Pagination extends ElementReactLibs.Component<PaginationProps, {}> { }

  // AutoComplete
  interface AutoCompleteProps extends ElementReactLibs.ComponentProps<{}> {
    popperClass?: string
    placeholder?: string
    disabled?: boolean
    name?: string
    size?: 'large' | 'small' | 'mini'
    value?: string
    triggerOnFocus?: boolean
    fetchSuggestions?(queryString?: string, callback?: (data?: any[]) => void): void
    onSelect?(item?): void
    onIconClick?(): void
    icon?: React.ReactElement<any> | string
    append?: React.ReactElement<any>
    prepend?: React.ReactElement<any>
  }
  export class AutoComplete extends ElementReactLibs.Component<AutoCompleteProps, {}> { }

  // TimeSelect
  interface TimeSelectProps extends ElementReactLibs.DatePickerBaseProps {
    start?: string
    end?: string
    step?: string
    minTime?: ElementReactLibs.dateType
    maxTime?: ElementReactLibs.dateType
    value?: ElementReactLibs.dateType
  }
  export class TimeSelect extends ElementReactLibs.DatePickerBaseComponet<TimeSelectProps, {}> { }

  // TimePicker
  interface TimePickerProps extends ElementReactLibs.DatePickerBaseProps {
    selectableRange?: string | string[]
    value?: ElementReactLibs.dateType
  }
  export class TimePicker extends ElementReactLibs.DatePickerBaseComponet<TimePickerProps, {}> { }

  // TimeRangePicker
  interface TimeRangePickerProps extends ElementReactLibs.DatePickerBaseProps {
    selectableRange?: string | string[]
    value?: ElementReactLibs.dateType[]
    rangeSeparator?: string
  }
  export class TimeRangePicker extends ElementReactLibs.DatePickerBaseComponet<TimeRangePickerProps, {}> { }

  // DatePicker
  interface DatePickerProps extends ElementReactLibs.DatePanelProps {
    value?: ElementReactLibs.dateType
  }
  export class DatePicker extends ElementReactLibs.DatePickerBaseComponet<DatePickerProps, {}> { }

  // DateRangePicker
  interface DateRangePickerProps extends ElementReactLibs.DatePanelProps {
    value?: ElementReactLibs.dateType[]
    rangeSeparator?: string,
  }
  export class DateRangePicker extends ElementReactLibs.DatePickerBaseComponet<DateRangePickerProps, {}> { }

  // Carousel
  interface CarouselProps extends ElementReactLibs.ComponentProps<{}> {
    initialIndex?: number
    height?: string
    trigger?: 'click'
    autoplay?: boolean
    interval?: number | string
    indicatorPosition?: 'outside' | 'none'
    indicator?: boolean
    arrow?: 'always' | 'hover' | 'never'
    type?: 'card'
    onChange?(current?: number, prev?: number): void
  }
  interface CarouselItemProps extends ElementReactLibs.ComponentProps<{}> {
    name?: string
  }
  class CarouselItem extends ElementReactLibs.Component<CarouselItemProps, {}> { }
  export class Carousel extends ElementReactLibs.Component<CarouselProps, {}> {
    static Item: typeof CarouselItem
    setActiveItem(index: number): void
    prev(): void
    next(): void
  }

  // Collapse
  interface CollapseProps extends ElementReactLibs.ComponentProps<{}> {
    accordion?: boolean
    value?: string | any[]
    onChange?(activeNames?: string | any[]): void
  }
  interface CollapseItemProps extends ElementReactLibs.ComponentProps<{}> {
    onClick?(item?): void
    isActive?: boolean
    title?: string | React.ReactElement<any>
    name?: string | number
  }
  class CollapseItem extends ElementReactLibs.Component<CollapseItemProps, {}> { }
  export class Collapse extends ElementReactLibs.Component<CollapseProps, {}> {
    static Item: typeof CollapseItem
  }

  // ColorPicker
  interface ColorPickerProps extends ElementReactLibs.ComponentProps<{}> {
    value?: string
    showAlpha?: boolean
    colorFormat?: 'hsl' | 'hsv' | 'hex' | 'rgb'
    onChange?(color?: string): void
  }
  export class ColorPicker extends ElementReactLibs.Component<ColorPickerProps, {}> { }

  // Cascader
  interface CascaderProps extends ElementReactLibs.ComponentProps<{}> {
    options: any[]
    props?: {
      value?: string
      label?: string
      children?: string
      disabled?: string
    }
    value?: any[]
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    changeOnSelect?: boolean
    popperClass?: string
    expandTrigger?: 'click' | 'hover'
    filterable?: boolean
    size?: 'large' | 'small' | 'mini'
    showAllLevels?: boolean
    debounce?: number
    activeItemChange?(param?: any[]): void
    onChange?(value?): void
  }
  export class Cascader extends ElementReactLibs.Component<CascaderProps, {}> { }

  // Transfer
  interface TransferProps extends ElementReactLibs.ComponentProps<{}> {
    data?: { key: string, label: string, disabled: boolean }[]
    titles?: string[]
    buttonTexts?: string[]
    filterPlaceholder?: string
    filterMethod?(): void
    leftDefaultChecked?: any[]
    rightDefaultChecked?: any[]
    renderContent?(h?, option?): void
    value?: any[]
    footerFormat?: {
      noChecked?: string
      hasChecked?: string
    }
    filterable?: boolean
    propsAlias?: {
      key?: string
      label?: string
      disabled?: boolean
    }
    onChange?(value?, drection?: string, movedKeys?: any[]): void
    leftFooter?: React.ReactElement<any>
    rightFooter?: React.ReactElement<any>
  }
  export class Transfer extends ElementReactLibs.Component<TransferProps, {}> { }
}

declare namespace ElementReactLibs {
  type dateType = Date | string | null 
  type SelectionMode = 'year' | 'month' | 'week' | 'day'
  interface ComponentProps<T> {
    className?: string
    style?: React.CSSProperties
  }
  class Component<P, S> extends React.Component<P, S> {
    classNames?(...args): any
    className?(...args): any
    style?(agrs?): any
  }
  interface DatePickerBaseProps extends ComponentProps<{}> {
    align?: 'left' | 'center' | 'right'
    format?: string
    isShowTrigger?: boolean
    isReadOnly?: boolean
    isDisabled?: boolean
    placeholder?: string
    onFocus?(self?: any): void
    onBlur?(self?: any): void
    onChange?(value?): void
    value?: dateType | dateType[]
  }
  interface DatePanelProps extends DatePickerBaseProps {
    value?: dateType | dateType[]
    onPick?: (date: Date) => void
    isShowTime?: boolean
    showWeekNumber?: boolean
    format?: string
    shortcuts?: any[]
    selectionMode?: SelectionMode
    disabledDate?(date?: Date, type?: SelectionMode): boolean
    firstDayOfWeek?: number
    getPopperRefElement?: any
    popperMixinOption?: any
  }
  class DatePickerBaseComponet<P, S> extends React.Component<P, S> { }
}

declare module "element-react/src/locale/lang/bg" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/ca" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/cz" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/da" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/de" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/el" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/en" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/es" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/fa" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/fi" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/fr" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/id" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/it" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/ja" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/ko" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/nb-NO" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/nl" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/pl" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/pt-br" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/pt" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/ru-RU" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/sk" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/sv-SE" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/th" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/tk" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/tr-TR" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/ua" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/vi" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/zh-CN" {
  const lang: ElementReact.I18nLang
  export default lang
}
declare module "element-react/src/locale/lang/zh-TW" {
  const lang: ElementReact.I18nLang
  export default lang
}
