function InterceptorsManager() {
  this.handlers = []
}

InterceptorsManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled,
    rejected
  })

  return this.handlers.length - 1
}

InterceptorsManager.prototype.reject = function reject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null
  }
}

InterceptorsManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach((h) => {
    if (h !== null) {
      fn(h)
    }
  })
}

export default InterceptorsManager