const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/index.tsx',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'bundle.[contenthash].js' : 'bundle.js',
      clean: true,
      publicPath: '/'
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: { '@': path.resolve(__dirname, 'src') }
    },

    module: {
      rules: [
        { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },

        // SCSS-модули: *.module.scss
        {
          test: /\.module\.s[ac]ss$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { modules: { localIdentName: isProd ? '[hash:base64:6]' : '[local]__[hash:base64:4]' } } },
            'sass-loader'
          ]
        },
        // Глобальные SCSS
        { test: /\.s[ac]ss$/, exclude: /\.module\.s[ac]ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },

        // Картинки
        { test: /\.(png|jpe?g|gif|svg)$/i, type: 'asset', parser: { dataUrlCondition: { maxSize: 8 * 1024 } } }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({ template: 'public/index.html' })
    ],

    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',

    devServer: {
      static: path.join(__dirname, 'public'),
      port: 5173,
      hot: true,
      open: true,
      historyApiFallback: true
    }
  };
};
