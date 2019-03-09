export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    $axios.setHeader('Content-Type', 'application/json', ['post'])
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)

    if (code !== 200) redirect('/error')
  })

  $axios.onResponse(response => {
    return Promise.resolve(response.data)
  })
}

/**
 * 对后端 JsonResult 进行帮助包装
 */
function jsonResult() {
  return function(r) {
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
}

// function interceptor() {
//   return function(r, response) {
//     const { code, message } = r
//
//     // CODE_UNAUTHORIZED 未授权（认证）错误代码
//     // 跳转到登录页面
//     if (r.isUnauthorized() && !option.intercept.unauth) {
//       session.authorized = false
//       return promise
//     }
//
//     // CODE_KICKED_OUT 账号在另外一台机器登录错误代码
//     // 跳转到 指定错误页面
//     if (r.isKickedOut()) {
//       console.log('need login again....')
//       session.authorized = false
//       return promise
//     }
//
//     // CODE_SYS_REDIRECT 特殊代码
//     if (r.isRedirect() && !option.intercept.redirect) {
//       redirect()
//       return promise
//     }
//
//     return Promise.resolve(response)
//
//     function redirect() {
//       if (!message) {
//         doRedirect()
//         return
//       }
//
//       // 如果有信息，则显示信息后再跳转
//       alert(message).then(doRedirect)
//
//       function doRedirect() {
//         const arg = { uri: r.redirectTo, cancel: false }
//         $rootScope.$broadcast('before-json-redirect', arg)
//         if (!arg.cancel) {
//           const uri = arg.uri
//           if (uri.indexOf('http') === 0) {
//             location.href = uri
//           } else {
//             $location.path(r.redirectTo)
//           }
//         }
//       }
//     }
//
//     function doAlert() {
//       console.error('interceptor#doAlert:', code, message, r)
//       alert('警告', message || '系统出现未知错误')
//     }
//   }
// }
