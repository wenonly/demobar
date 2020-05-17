import './static/css/main.less'
import './static/css/scroll.less'
import './static/icon/iconfont.css'
import './static/js/iframeLoading'
import { pageChange, setNavItemClickEvent } from './static/js/page'
import { setToggleEvent, setNavActive } from './static/js/nav'


window.onhashchange = () => {
  // 设置nav活跃效果
  initActive()
}

$(document).ready(function() {
  // 设置nav活跃效果
  initActive()
  // 点击a标签修改hash
  setNavItemClickEvent()
  // 设置目录的展开收起
  setToggleEvent()
})

// * 设置nav活跃效果
function initActive() {
  const pathName = pageChange()
  // 设置动态颜色
  if(pathName) { setNavActive(pathName.slice(1)) }
}