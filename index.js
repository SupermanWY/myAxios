import xhr from './xhr'
import InterceptorsManager from './InterceptorManager'

function Axios() {
  this.interceptors = {
    request: new InterceptorsManager(),
    response: new InterceptorsManager()
  }
}

Axios.prototype.request = function(config) {
  let promise = Promise.resolve(config)
  let chain = [xhr, undefined]

  this.interceptors.request.forEach(interceptor => {
    chain.unshift(interceptor.fulfilled, interceptor.rejected)
  })

  this.interceptors.response.forEach(interceptor => {
    chain.push(interceptor.fulfilled, interceptor.rejected)
  })

  while(chain.length) {
    promise = promise.then(chain.shift(), chain.shift())
  }

  return promise
}

let axios = new Axios()
axios.interceptors.request.use(config => {
  config.data = JSON.stringify({a:1})
  return config
})
axios.interceptors.response.use(response => {
  response.statusText = 'asdf'
  return response
})
axios.request({
  url: 'get',
  method: 'post'
}).then(res => console.log(res))
  .catch(err => console.log(err))
