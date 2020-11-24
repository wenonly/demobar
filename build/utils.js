const pinyin = require("pinyin");
const glob = require("glob");
const path = require("path");
const pinyinConfig = { style: pinyin.STYLE_NORMAL };

// 获取指定路径下的入口文件
function getEntries(globPath) {
  const files = glob.sync(globPath);
  const entries = {};
  files.forEach(function (filepath) {
    const split = filepath.split("/");
    const name = split[split.length - 2];
    entries[name] = "../" + filepath;
  });
  return entries;
}

// 将入口的中文转拼音
function getFormatEntries(indexs) {
  const newIndexs = {};
  for (let key in indexs) {
    const newKey = getName(indexs[key]);
    newIndexs[newKey] = path.join(__dirname, indexs[key]);
  }
  return newIndexs;
}

// 从path中获取父子目录
function getFoldersInPath(path) {
  const arr = path.split("src")[1].split(/[\/\\]/);
  return [arr[1], arr[2]];
}

// 解析key
function getName(path) {
  const pathArr = getFoldersInPath(path);
  let pathName =
    pinyin(pathArr[0], pinyinConfig).join("") +
    "_" +
    pinyin(pathArr[1], pinyinConfig).join("");
  pathName = pathName.replace(/ /g, "_");
  return pathName;
}

// 获取模版文件需要的pageconfigs
function getPageConfigs(indexs) {
  const pageConfigs = {};
  for (let key in indexs) {
    const folders = getFoldersInPath(indexs[key]);
    const parent = folders[0];
    const child = folders[1];

    // 配置中没有则添加
    if (!pageConfigs[parent])
      pageConfigs[parent] = {
        pages: [],
        name: pinyin(parent, pinyinConfig).join(""),
      };

    /**
     * 动画 文字撕裂效果 /donghua_wenzisiliexiaoguo
        {
          title: 'canvas粒子泡泡',
          src: './canvas粒子泡泡',
          path: '/donghua_canvaslizipaopao',
          type: '动画',
          name: 'donghua_canvaslizipaopao'
        }
     */
    pageConfigs[parent].pages.push({
      title: child,
      src: "./" + child,
      path: "/" + getName(indexs[key]),
      type: parent,
      name: getName(indexs[key]),
    });
  }
  return pageConfigs;
}

module.exports = {
  getEntries,
  getName,
  getPageConfigs,
  getFormatEntries,
};
