module.exports = [
  {
    test: /\.(png|jpg|jpeg|gif|svg)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/images/[hash][ext][query]',
    },
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/fonts/[hash][ext][query]',
    },
  },
  {
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader',
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
      test: /\.jsx?$/,
    use: {
      loader: 'babel-loader',
      options: { 
        exclude: ["node_modules"],
        presets: ['@babel/preset-react']

      }
    }
    }

];
