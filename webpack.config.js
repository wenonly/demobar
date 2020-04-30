const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob');

const entries = getEntries('src/**/index.js');
console.log(entries)

module.exports = {
  mode: "development",
  devtool: 'cheap-module-eval-source-map',
  entry: entries,
  devServer: {
    port: 9000,
    quiet: false,
    inline: true,
    stats: "errors-only",
    overlay: false,
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(le|c)ss$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              require('autoprefixer')({
                "overrideBrowserslist": [
                  ">0.25%",
                  "not dead"
                ]
              })
            }
          }
        }, 'less-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              esModule: false,
              name: '[name]_[hash:6].[ext]',
              outputPath: 'assets/img',
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    ...Object.keys(entries).map(name => {
      return new HtmlWebpackPlugin({
        template: entries[name].replace('/index.js', '') + '/index.html',
        filename: name + '.html',
        minify: {
          removeAttributeQuotes: false,
          collapseWhitespace: false,
        },
        chunks: [name],
      })
    })
  ]
}

// 获取指定路径下的入口文件
function getEntries(globPath) {
  const files = glob.sync(globPath);
  const entries = {};
  files.forEach(function(filepath) {
      const split = filepath.split('/');
      const name = split[split.length - 2];
      entries[name] = './' + filepath;
  });
  return entries;
 }