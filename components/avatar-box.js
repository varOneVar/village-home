const avatarBox = {
    props: {
        avatar: {
            type: String,
            default: ''
        },
        avatarStyle: {
            type: Object,
            default() {
                return {
                    width: '60px',
                    height: '60px'
                }
            }
        },
        name: {
            type: String,
            default: ''
        }, rightStr: {
            type: String,
            default: ''
        }
    },
    methods: {
        createdrightInfo (h) {
            return h(
                'div',
                { attrs: { class: 'right-box flex1' } },
                [
                    h(
                        'p',
                        { attrs: { class: 'right-name' }},
                        (this.name|| '游客')
                    ),
                    h(
                        'p',
                        { attrs: { class: 'right-bottom' }},
                        this.rightStr
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
                    class: 'avatar-wrapper flex'
                },
            },
            [
                h(
                    'el-image',
                    {
                        style: this.avatarStyle,
                        class: {
                            'comment-avatar': true
                        },
                        props: {
                            src: image,
                            fit: 'cover'
                        }
                    },
                ),
                this.createdrightInfo(h)
            ]
        )
    },
  }