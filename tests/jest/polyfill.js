global.document.createRange = () => ({
  setStart: f => f,
  setEnd: f => f,
  commonAncestorContainer: {
    nodeName: "BODY",
    ownerDocument: document,
  },
})

global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0)
}
