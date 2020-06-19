const videoItem = {
    props: {
        title: {
            type: String,
            default: ''
        },
        subTitle: {
            type: String,
            default: ''
        },

        image: {
            type: String,
            default: ''
        }
    },
    render(h) {
        const { title, subTitle, image } = this;
        const children = [h(
            'el-image',
            {
                style: {
                    width: '280px',
                    height: '210px'
                },
                props: {
                    src: image,
                    fit: 'cover'
                }
            },
        ), h(
            'h2',
            {
                attrs: {
                    class: 'title'
                },
            },
            title
        ), h(
            'p',
            {
                attrs: {
                    class: 'sub-title'
                },
            },
            subTitle
        )]
        return h(
            'div',
            {
                attrs: {
                    class: 'village-item'
                },
            },
            children
        )
    },
  }