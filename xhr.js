function xhr(config) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest()
    let { method, url, data } = config

    xhr.open(method.toUpperCase(), url)

    xhr.onreadystatechange = function() {
      if(xhr.readyState !== 4) {
        return
      }

      let response = {
        data: xhr.response,
        status: xhr.status,
        statusText: xhr.statusText
      }

      resolve(response)
    }

    xhr.onerror = function() {
      reject('network error', xhr, config)
    }

    xhr.send(data)
  })
}

export default xhr