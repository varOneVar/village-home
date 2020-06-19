const homeTitle = {
    props: {
        title: {
            type: String,
            default: ''
        },
        titleStyle: {
            type: String,
            default: ''
        },
        subTitle: {
            type: String,
            default: ''
        }
    },
    render(h) {
        const { title, subTitle } = this;
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
                    style: this.titleStyle,
                    attrs: {
                        class: 'sub-title'
                    },
                },
                subTitle
            ))
        }
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