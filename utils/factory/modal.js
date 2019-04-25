import { Modal } from 'ant-design-vue'

function showModal(type, title, content) {
  Modal[type]({ title, content })
}

export function successModal(content, title) {
  showModal('success', title || '成功', content)
}

export function errorModal(content, title) {
  showModal('error', title || '失败', content)
}

export function infoModal(content, title) {
  showModal('info', title || '提示', content)
}

export function warningModal(content, title) {
  showModal('warning', title || '警告', content)
}
