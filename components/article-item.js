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
    },
    imageStyle: {
      type: Object,
      default() {
        return {
          width: '220px',
					height: '165px'
        }
      }
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
			), h(
				'footer',
				{
					class: ['article-item-footer']
				},
				this.$slots.footer
			)]
		}
	},
	render(h) {
		const children = [h(
			'el-image',
			{
				class: {
					'article-item-left': true
				},
				style: this.imageStyle,
				props: {
					src: this.image,
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