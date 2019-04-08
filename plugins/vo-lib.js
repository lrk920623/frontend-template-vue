import Vue from 'vue'

import Col from 'packages/base/col'
import Input from 'packages/base/input'
import Select from 'packages/base/select'
import Card from 'packages/base/card'
import Modal from 'packages/base/modal'
import Pager from 'packages/base/pager'
import Spin from 'packages/base/spin'
import CategoryModal from 'packages/business/categoryModal'
import ClassModal from 'packages/business/classModal'
import CommonModal from 'packages/business/commonModal'
import ParamShow from 'packages/business/paramShow'
import SearchBox from 'packages/business/searchBox'
import SingleControl from 'packages/business/singleControl'

import SearchReset from 'components/business/SearchReset'
import Table from 'components/table/RenderTable'
import PageLayout from 'components/layout/PageLayout'
import PageHeader from 'components/layout/PageHeader'

Vue.component(Col.name, Col)
Vue.component(Input.name, Input)
Vue.component(Select.name, Select)
Vue.component(Card.name, Card)
Vue.component(Modal.name, Modal)
Vue.component(Pager.name, Pager)
Vue.component(Spin.name, Spin)
Vue.component(CategoryModal.name, CategoryModal)
Vue.component(ClassModal.name, ClassModal)
Vue.component(CommonModal.name, CommonModal)
Vue.component(ParamShow.name, ParamShow)
Vue.component(SearchBox.name, SearchBox)
Vue.component(SingleControl.name, SingleControl)

Vue.component(SearchReset.name, SearchReset)
Vue.component(Table.name, Table)
Vue.component(PageLayout.name, PageLayout)
Vue.component(PageHeader.name, PageHeader)
