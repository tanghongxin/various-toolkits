let lessNodesAppended

const updateTheme = primaryColor => {
  async function buildIt () {
    if (!window.less) {
      return
    }
    // TODO: before、after loading hook
    await window.less
      .modifyVars({
        '@primary-color': primaryColor
      })
  }
  if (!lessNodesAppended) {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link')
    const lessConfigNode = document.createElement('script')
    const lessScriptNode = document.createElement('script')
    lessStyleNode.setAttribute('rel', 'stylesheet/less')
    // TODO: configurable path
    lessStyleNode.setAttribute('href', '/static/less/Color.less')
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      }
    `
    lessScriptNode.src = 'https://cdn.bootcss.com/less.js/3.9.0/less.min.js'
    lessScriptNode.async = true
    lessScriptNode.onload = () => {
      buildIt()
      lessScriptNode.onload = null
    }
    // TODO: use fragment
    document.body.appendChild(lessStyleNode)
    document.body.appendChild(lessConfigNode)
    document.body.appendChild(lessScriptNode)
    lessNodesAppended = true
  } else {
    buildIt()
  }
}
export { updateTheme }
