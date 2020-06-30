const videoItem = {
    props: {
        item: {
            type: Object,
            default() {
                return {}
            }
        },
        id: {
            type: String,
            default: ''
        }
    },
    methods: {
        createdVideoBox (h) {
            const e = this.item.url ? h(
                'div',
                { attrs: { id: this.id, class: 'video' }, style: {
                    width: '380px',
                    height: '260px',
                },}
            ) : h(
                'el-image',
                { attrs: { class: 'video' }, style: {
                    width: '380px',
                    height: '260px',
                }, props: { fit: 'cover', src: this.item.url, } }
            )
            return h(
                'div',
                { attrs: { class: 'video-box' } },
                [
                    e,
                    h(
                        'span',
                        { attrs: { class: 'video-num' }},
                        `${this.item.num||0}人播放`
                    )
                ]
            )
        }
    },
    render(h) {
        return h(
            'div',
            {
                attrs: {
                    class: 'video-wrapper'
                },
            },
            [
                this.createdVideoBox(h),
                h('p', { attrs: { class: 'video-title' } }, this.item.title)
            ]
        )
    },
  }