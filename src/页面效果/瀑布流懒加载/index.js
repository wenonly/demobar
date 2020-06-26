import axios from 'axios'
import './main.css'

let colHeight = [0, 0, 0, 0]
let current = 1
let io

const getImageList = debounce(async function(pageIndex, pageSize = 20){
  const res = await axios.get(`https://picsum.photos/v2/list?page=${pageIndex}&limit=${pageSize}`)
  res.data.forEach(item => {
    const index = colHeight.findIndex(item => item === Math.min(...colHeight))
    appendImage(item.download_url, index)
    colHeight[index] += item.height
  });
  current += 1
}, 1000)

function appendImage(url, col = 0, selector = '.col') {
  const doms = document.querySelectorAll(selector)
  let img = document.createElement('img')
  img.src = url
  doms[col].appendChild(img)
}

function init() {
  getImageList(current, 30)
  current += 2
  
  io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      getImageList(current, 10)
    }
  }, {});
  io.observe(document.getElementById('bottom'));
}

function debounce(func, time) {
  var time = null
  return function() {
    time = setTimeout(() => {
      func(...arguments)
    }, time)
  }
}

init()