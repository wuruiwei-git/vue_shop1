/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import { Button, Form, FormItem, Input, Container, Header, Aside, Main, Menu, Submenu, MenuItem, Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Switch, Tooltip, Pagination, Dialog, Tag, Tree, Select, Option, Cascader, Alert, Tabs, TabPane, Step, Steps, Checkbox, CheckboxGroup, Upload } from 'element-ui'
import { MessageBox } from 'element-ui'
// 导入弹框提示组件
import { Message } from 'element-ui'
// import Timeline from './timeline/index.js'
// import TimelineItem from './timeline-item/index'
// 将message挂载为vue原型上的属性，这样在每个组建中都可以使用this进行调用
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)

Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Step)

Vue.use(Steps)
Vue.use(Checkbox)

Vue.use(CheckboxGroup)
Vue.use(Upload)
// Vue.use(Timeline)
// Vue.use(TimelineItem)
