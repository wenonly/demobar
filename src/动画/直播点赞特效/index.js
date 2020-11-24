import './main.css'

const bubble = document.getElementById('praise_bubble')
const heart = document.getElementById('heart')
const baseImgs = document.getElementsByClassName('base-img')

heart.addEventListener('click', addPraise)

function addPraise() {
  const b =Math.floor(Math.random() * 6) + 1;
  const bl =Math.floor(Math.random() * 11) + 1; // bl1~bl11
  const imgIndex = Math.floor(Math.random() * 1000) % 4
  
  let child = document.createElement('div')
  child.className = `bubble b${b} bl${bl}`
  let imgDom = document.createElement('img')
  imgDom.setAttribute('src', baseImgs[imgIndex].getAttribute('src'))
  child.appendChild(imgDom)

  bubble.appendChild(child)

  // 三秒后移除
  setTimeout(() => {
    bubble.removeChild(child)
  }, 3000)
}