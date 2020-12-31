#!/usr/bin/env node

const program = require('commander')
const shell = require('shelljs');
const log = require('tracer').colorConsole()
const path = require('path')
const fs = require('fs');

const GITURL = 'https://github.com/iwowen/demobar.git'
const SRCPATH = './'

// 检验命令是否完整
const shellList = ['git', 'npm']
shellList.forEach((item) => {
  if (!shell.which(item)) {
    shell.echo(`Sorry, this script requires ${item}`);
    shell.exit(1);
  }
})

program
    .version('1.0.0')
    .description('demobar是使用webpack构建方便编写demo的多页面框架')
    // .option('-t, --type', `page's type`)

program
    .command('init <project>')
    .action(function(project) {
        newProject(project)
    })

program
    .command('build')
    .action(function(project) {
      shell.exec(`node `)
    })

program
    .command('add <pageName>')
    .alias('a')
    .option('-t, --type <typeName>', '新增页面的分类')
    .action(function(pageName, other) {
      if (other.type) {
        createPage(pageName, other.type)
      } else {
        log.error('命令格式: dm new/n <pageName> -t/--type <typeNmae>')
      }
    })

program
    .command('del <pageName>')
    .alias('d')
    .option('-t, --type <typeName>', '新增页面的分类')
    .action(function(pageName, other) {
      if (other.type) {
        deletePage(pageName, other.type)
      } else {
        log.error('命令格式: dm del/d <pageName> -t/--type <typeNmae>')
      }
    })

program.parse(process.argv)

/**
 * * 从远端拉取项目
 * @param {String} project
 */
function newProject(project) {
  if (project) {
      log.info(`正在拉取模板代码...`)
      log.info(`下载位置：${path.join(__dirname, project)}`)
      shell.exec(`git clone ${GITURL} ${project} --progress`)
      console.log(`        `)
      console.log(`        `)
      console.log(`        cd ${project}`)
      console.log('        npm install')
    } else {
      log.error('正确命令例子：dm init myproject')
  }
}

/**
 * 创建新的页面
 * @param {String} pageName
 * @param {String} typeName
 */
function createPage(pageName, typeName, type = 'simple') {
  const folderPath = path.join(SRCPATH, `src/${typeName}`)
  const configPath = path.join(folderPath, 'config.json')
  const resourcePath = path.join(SRCPATH, `template/resource/${type}`)

  // * 查看是否有当前分类, 没有就创建
  let configJSON = readJson(configPath)
  if (!configJSON) {
    createType(typeName)
    configJSON = readJson(configPath)
  }

  // * 复制指定类型模板到目录
  if (!fs.existsSync(path.join(folderPath, pageName))) {
    shell.cp('-R', resourcePath, path.join(folderPath, pageName))

    // * 将新内容加入 JSON
    const obj = {
      title: pageName,
      src: `./${pageName}`
    }
    const paths = configJSON.path
    const index = paths.findIndex(item => item.src === obj.src)
    if (index === -1) paths.push(obj)
    else paths.splice(index, 1, obj)

    writeJson(configPath, configJSON)
  }
}

/**
 * * 创建分类
 * @param {String} typeName
 */
function createType(typeName) {
  const folderPath = path.join(SRCPATH, `src/${typeName}`)
  const configPath = path.join(folderPath, 'config.json')
  shell.mkdir('-p', folderPath)
  const configTemplete = {
    path: []
  }
  writeJson(configPath, configTemplete)
}

/**
 * 写json
 * @param {String} filePath
 * @param {Object} json
 */
function writeJson(filePath, json) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(json))
    return true
  } catch (error) {
    return false
  }
}

/**
 * 读json
 * @param {String} filePath
 */
function readJson(filePath) {
  try {
    const file = fs.readFileSync(filePath)
    return JSON.parse(file)
  } catch (error) {
    return false
  }
}
