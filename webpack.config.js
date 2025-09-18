const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    context: __dirname,

    entry: './src/index.tsx',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'assets/js/[name].[contenthash:8].js' : 'assets/js/[name].js',
      assetModuleFilename: 'assets/[hash][ext][query]',
      clean: true,
      publicPath: '/'
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: { '@': path.resolve(__dirname, 'src') }
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          use: 'ts-loader',
          exclude: /node_modules/
        },

        // ЕДИНОЕ правило для SCSS: модули включаются только для *.module.scss
        {
          test: /\.s[ac]ss$/i,
          use: [
            { loader: 'style-loader', options: { esModule: true } },
            {
              loader: 'css-loader',
              options: {
                esModule: true,
                importLoaders: 1,
                modules: {
                  auto: (resourcePath) => /\.module\.(s[ac]ss|css)$/i.test(resourcePath),
                  localIdentName: isProd ? '[hash:base64:6]' : '[local]__[hash:base64:4]'
                }
              }
            },
            'sass-loader'
          ]
        },

        // Картинки / SVG
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset',
          parser: { dataUrlCondition: { maxSize: 8 * 1024 } }
        },

        // Шрифты
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource'
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        scriptLoading: 'defer'
      })
    ],

    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',

    devServer: {
      static: { directory: path.resolve(__dirname, 'public') },
      port: 5173,
      hot: true,
      open: true,
      historyApiFallback: true
    }
  };
};
