import { Modal } from 'ant-design-vue'
import { removeSession } from 'utils/storage'
import { user } from 'utils/constant'

export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    $axios.setHeader('Content-Type', 'application/json', ['post'])
  })

  $axios.onError(error => {
    redirect('/error')
  })

  $axios.onResponse(response => {
    const { data } = response
    const result = jsonResult(data)

    const { code, message } = result

    // code == 0 则无任何错误，有 message 也不显示
    if (result.isSuccess()) {
      return Promise.resolve(data)
    }

    // CODE_UNAUTHORIZED 未授权（认证）错误代码
    // 跳转到登录页面
    if (result.isUnauthorized()) {
      reLogin()
      return data
    }

    // CODE_KICKED_OUT 账号在另外一台机器登录错误代码
    // 跳转到 指定错误页面
    if (result.isKickedOut()) {
      console.log('need login again....')
      reLogin()
      return data
    }

    // CODE_SYS_REDIRECT 特殊代码
    if (result.isRedirect()) {
      sys_redirect()
      return data
    }

    return Promise.resolve(data)

    function sys_redirect() {
      if (!message) {
        doRedirect()
        return
      }

      // 如果有信息，则显示信息后再跳转
      alert(message).then(doRedirect)

      function doRedirect() {
        // const arg = { uri: r.redirectTo, cancel: false }
        // $rootScope.$broadcast('before-json-redirect', arg)
        // if (!arg.cancel) {
        //   const uri = arg.uri
        //   if (uri.indexOf('http') === 0) {
        //     location.href = uri
        //   } else {
        //     $location.path(r.redirectTo)
        //   }
        // }
      }
    }

    function reLogin() {
      removeSession(user.token)
      doAlert(() => redirect('/login'))
    }

    function doAlert(callback) {
      console.error('interceptor#doAlert:', code, message)

      Modal.error({
        title: '警告',
        content: message || '系统出现未知错误',
        onOk() {
          return new Promise(resolve => {
            resolve(callback())
          })
        }
      })
    }
  })
}

/**
 * 对后端 JsonResult 进行帮助包装
 */
function jsonResult(r) {
  const { code } = r
  return Object.assign(
    {
      isSuccess() {
        return code === '0' || !code
      },
      isRedirect() {
        return code === 'SYS_REDIRECT'
      },
      isUnauthorized() {
        return code === 'SYS_UNAUTHORIZED'
      },
      isKickedOut() {
        return code === 'SYS_KICKED_OUT'
      }
    },
    r
  )
}
