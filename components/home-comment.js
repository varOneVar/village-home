const homeComment = {
    props: {
        item: {
            type: String,
            default() {
                return {}
            }
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
                        (this.item.name|| '游客')
                    ),
                    h(
                        'p',
                        { attrs: { class: 'right-bottom' }},
                        this.item.sign
                    )
                ]
            )
        },
        createStar(h, score) {
            const grade = Math.round(score)
            const children = [...Array(5)].map((v, i) => {
                if (i + 1 <= grade) {
                    return 'home_star1'
                }
                return 'home_star2'
            })
            return h(
                'div',
                { attrs: { class: 'star' } },
                children.map(v => (h(
                    'el-image',
                    {
                        style: {
                            width: '20px',
                            height: '20px'
                        },
                        props: {
                            src: `./images/${v}@2x.png`,
                            fit: 'cover'
                        }
                    }
                )))
            )
        },
        createdbottomInfo (h) {
            return [h(
                'div',
                { attrs: { class: 'star-box flex-align-center' } },
                [
                    h(
                        'span',
                        { attrs: { class: 'star-label' }},
                        '综合评分'
                    ),
                    this.createStar(h, this.item.score)
                ]
            ), h(
                'div',
                { attrs: { class: 'comment-box' } },
                [h(
                    'p',
                    { attrs: { class: 'comment' }},
                    this.item.comment
                )],
            )]
        }
    },
    render(h) {
        return h(
            'div',
            {
                class: ['home-comment']
            },
            [
                h(
                    'div',
                    {
                        attrs: {
                            class: 'avatar-wrapper flex'
                        },
                    },
                    [
                        h(
                            'el-avatar',
                            {
                                class: {
                                    'comment-avatar': true
                                },
                                props: {
                                    src: this.item.avatar,
                                    shape: 'circle',
                                    size: '60px',
                                    fit: 'cover',
                                    alt: this.item.name
                                }
                            },
                        ),
                        this.createdrightInfo(h)
                    ]
                ),
                this.createdbottomInfo(h)
            ]
        )
    }
  }