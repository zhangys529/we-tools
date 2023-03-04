import { Notification } from 'element-ui'

export function showMsg(response) {
  if (response.code === 200) {
    Notification({ type: 'success', message: '操作成功' })
  } else {
    Notification({ type: 'error', message: response.message })
  }
}

