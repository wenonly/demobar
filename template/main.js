import './static/main.less'
import './static/icon/iconfont.css'

// 监听hash变化，设置内嵌页面
window.onhashchange = handleHashChange
function handleHashChange() {
  const pathName = window.location.hash.substr(1)
  if (pathName && pathName.length > 1) setIframeSrc(pathName);
  else {
    // 初始化页面后默认加载第一个页面
    const aList = $(".list-content a")
    if (aList && aList.length) {
      const hashpath = aList[0].getAttribute("href")
      window.location.hash = hashpath
    }
  }
}
function setAClick() {
  $(".list-content a").click(function(e){
    const pathName = $(this).attr("href")
    window.location.hash = pathName
    e.preventDefault();
  });
}
// 设置iframe标签src
function setIframeSrc(pathName) {
  if (pathName.length === 1) return
  const path = pathName.slice(-1) !== '/' ? pathName + '/' : pathName
  $('#iframe-box').attr('src', path);
}
$(document).ready(function() {
  // 进入页面根据哈希设置页面
  handleHashChange()
  // 点击a标签修改hash
  setAClick()
})