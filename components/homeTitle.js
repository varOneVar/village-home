const homeTitle = {
    props: {
        title: {
            type: String,
            default: ''
        },
        titleStyle: {
            type: Object,
            default() {
                return {}
            }
        },
        subTitle: {
            type: String,
            default: ''
        },
        btnStr: {
            type: String,
            default: ''
        }
    },
    render(h) {
        const { title, subTitle, btnStr } = this;
        const children = [h(
            'h2',
            {
                style: this.titleStyle,
                attrs: {
                    class: 'title'
                },
            },
            title
        )]
        if (subTitle) {
            children.push(h(
                'p',
                {
                    attrs: {
                        class: 'sub-title'
                    },
                },
                subTitle
            ))
        }
        children.push(this.$slots.default)
        return h(
            'div',
            {
                attrs: {
                    class: 'home-title'
                },
            },
            children
        )
    },
  }