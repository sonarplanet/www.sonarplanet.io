const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const configurations = require('./src/properties.json');
const env = process.env.WEBPACK_ENV_MODE;
const configuration = configurations[env];

const path = require('path');
const outputPath = 'dist';

module.exports = {
  entry: {
    main: ['./src/ts/main.ts', './src/ts/eMailForm.ts', './src/styles/main.scss'],
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, outputPath),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  mode: configuration.mode,
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'ts-loader' },
          {
            loader: 'string-replace-loader',
            options: {
              multiple: [
                // {
                //   search: "%%SONAR_BACK_URL%%",
                //   replace: configuration.sonarplanetBackendUrl
                // }
              ],
            },
          },
        ],
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: 'json-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]_[hash:7].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  plugins: getPlugins(env),
  devServer: configuration.devServer,
};

function getPlugins(env) {
  var commonPlugins = [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      //favicon: "./src/images/favicon.ico",
      title: 'Sonarplanet',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/suggest.json',
        to: './suggest.json'
      }
    ])
  ];

  // Create CNAME file for Github Pages deployment
  if (configuration.cname) {
    console.log('Will generate CNAME file with content: ' + configuration.cname);
    const CreateFileWebpack = require('create-file-webpack');
    let createFilePlugin = new CreateFileWebpack({
      path: outputPath,
      fileName: 'CNAME',
      content: configuration.cname,
    });

    commonPlugins.push(createFilePlugin);
  }

  let uglifyPlugin;

  switch (env) {
    case 'development':
    case 'integration':
      uglifyPlugin = new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        sourceMap: true,
        uglifyOptions: {
          compress: false,
          mangle: false,
        },
      });
      break;

    case 'production':
    default:
      uglifyPlugin = new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        sourceMap: true,
      });
  }
  commonPlugins.push(uglifyPlugin);

  return commonPlugins;
}
