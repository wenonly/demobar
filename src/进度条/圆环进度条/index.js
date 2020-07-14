import './main.less'

// 设置进度条进度
function setPercent(percent) {
  let box = document.getElementsByClassName('box')[0]
  let left = document.getElementsByClassName('left')[0]
  let right = document.getElementsByClassName('right')[0]

  left.style.transform = `rotate(${percent * 3.6}deg)`
  if (percent < 50) {
    right.style.display = 'none'
    box.classList.add('box-hidden')
  } else {
    right.style.display = ''
    box.classList.remove('box-hidden')
  }
}

let percent = 0
let num = document.getElementsByClassName('num')[0]
setInterval(() => {
  percent += 1
  if (percent > 100) percent = 0
  num.innerHTML = `${percent}%`
  setPercent(percent)
}, 100)