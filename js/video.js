
/**
 * 西瓜视频 https://h5player.bytedance.com/config/#%E5%BE%AE%E4%BF%A1%E6%A8%AA%E7%AB%96%E5%B1%8F%E6%8E%A7%E5%88%B6
 * @param {domID} id 绑定dom id
 * @param {video source} url 视频源
 * @param {image } poster 封面图
 * @param {*} options 其他参数
 */
function videoPlayerInstance (id, url, poster, options = {}) {
    const player = new Player({
        id,
        url,
        poster,
        // fluid: true, // 流式布局，根据父元素宽度设定
        download: true, //设置download控件显示
        pip: true, // 画中画功能支持用户在浏览网页其它内容时继续以小窗的形式观看视频
        keyShortcut: 'on', // 开启键盘快捷键：按 → 键快进10秒， 按 ← 键后退10秒，按 ↑ 键调高音量，按 ↓ 键调低音量，按 space 键切换播放/暂停状态
        // ignores: ['i18n', 'mobile'], // 忽略功能
        ...options
    })
    return player
}