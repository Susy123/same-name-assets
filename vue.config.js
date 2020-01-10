module.exports = {
    publicPath: './',
    outputDir: 'same-name-assets',
    // 由于业务需求不做hash，以免服务器滞留大量文件，至于缓存利用，由app内部的更新机制做处理；
    // 但这导致了同名资源的问题
    filenameHashing: false,
    // 修改 images 的 loader，增加 4 位 hash的方式来避免同名覆盖问题；通过 vue inpect查看是否修改正确
    chainWebpack: config => {
        config.module
        .rule('images')
        .use('url-loader')
        .tap(options => {
            options.fallback.options.name = 'img/[name].[hash:4].[ext]'
            return options
        })
    }
}