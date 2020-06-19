const articleItem = {
    props: {
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },

        image: {
            type: String,
            default: ''
        }
    },
    methods: {
        renderRight(h) {
            const { content, title } = this
            return [h(
                'h4',
                {
                    attrs: {
                        class: 'article-item-right-title'
                    },
                },
                title
            ), h(
                'p',
                {
                    attrs: {
                        class: 'article-item-right-content'
                    },
                },
                content
            )]
        }
    },
    render(h) {
        const { image } = this;
        const children = [h(
            'el-image',
            {
                class: {
                    'article-item-left': true
                },
                style: {
                    width: '220px',
                    height: '165px'
                },
                props: {
                    src: image,
                    fit: 'cover'
                }
            },
        ), h(
            'div',
            {
                attrs: {
                    class: 'article-item-right flex1'
                },
            },
            this.renderRight(h)
        )]
        return h(
            'div',
            {
                attrs: {
                    class: 'article-item flex'
                },
            },
            children
        )
    },
  }