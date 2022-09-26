const baseSize = 16
function setRem() {
  //根据当前宽度缩放比例
  const scale = document.documentElement.clientWidth / 1920
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
setRem()
window.onresize = function() {
  setRem()
}
