/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [
    // tailwindcss
    require('tailwindcss'),
    // 会自动添加polyfill和前缀，功能比autoprefix更全
    require('postcss-preset-env'),
    // 生产环境压缩css
    require('cssnano'),
  ].filter(Boolean),
}
