const Zupload = {
    props: {
        value: {
            type: Array,
            default() {
                return []
            }
        },
        fileType: {
            type: String,
            default: 'file'
        },
        img: {
            type: String,
            default: ''
        },
        limitSize: { // 限制大小，单位MB
            type: Number,
            default: 6
        },
        isLimitImgWidthHeight: { // 是否限制分辨率，如果限制传一个宽高的数据
            type: [Boolean, Array],
            default: false
        }
    },
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            blobUrl: '',
            showImg: ''
        }
    },
    methods: {
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        fileChange(file, fileList) {
            if (this.fileType === 'zip' && file.raw.type !== 'application/zip') {
                this.$message.error('上传文件格式不对，只能上传zip文件')
                this.$emit('input', [])
                return
            }
            if ((file.size / 1024 / 1024) > this.limitSize) {
                this.$message.error(`上传文件大小不能超过${this.limitSize}MB!`)
                this.$emit('input', [])
                return
            }
            if (this.fileType === 'img') {
                if (!['image/jpeg', 'image/png'].includes(file.raw.type)) {
                this.$message.error('上传文件格式不对，只能上传jpeg/png文件')
                this.$emit('input', [])
                return
                }
                this.blobUrl && this.revokeObjectURL(this.blobUrl)
                this.blobUrl = this.createObjectURL(file.raw)
                if (this.isLimitImgWidthHeight) {
                    setTimeout(() => {
                        const { offsetWidth, offsetHeight } = this.$refs.client
                        const [width, height] = this.isLimitImgWidthHeight
                        console.log(offsetWidth, offsetHeight)
                        if (offsetWidth !== width || offsetHeight !== height) {
                        this.$message.error(`上传文件分辨率不对，只能上传${width} * ${height} 大小的文件`)
                        this.blobUrl && this.revokeObjectURL(this.blobUrl)
                        this.$emit('input', [])
                        return
                        }
                        this.showImg = this.blobUrl
                    }, 20)
                }
            }
            console.log(file, 123)
            this.$emit('input', fileList)
        },
        createObjectURL(object) {
            return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object)
        },
        revokeObjectURL(objectURL) {
            return (window.URL) ? window.URL.revokeObjectURL(objectURL) : window.webkitURL.revokeObjectURL(objectURL)
        },
        exceedHandler(file, fileList) {
            this.$message.warning('最多上传一个文件！')
        },
        uploadFile() {
            this.$refs.upload.submit()
        },
        async upload(fn) {
            const file = this.value[0]
            const data = new FormData()
            data.append('file', file.raw)
            fn && fn()
        }
    },
    computed: {
        accept() {
            const obj = {
                zip: 'application/zip',
                file: '*',
                img: 'image/jpeg, image/png',
                excel: '.xlsx'
            }
            return obj[this.fileType]
        },
        params() {
            const obj = {
            zip: ['zip'],
            file: ['任意'],
            img: ['jpeg/png'],
            excel: ['xlsx']
        }
        return obj[this.fileType]
        }
    },
    beforeDestroy() {
        this.showImg && this.revokeObjectURL(this.showImg)
        this.blobUrl && this.revokeObjectURL(this.blobUrl)
    },
    template: `
        <div class="z-upload">
        <el-upload
            ref="upload"
            class="upload-demo"
            :list-type="fileType==='img'?'picture-card':'text'"
            :drag="fileType!=='img'"
            :accept="accept"
            :show-file-list="fileType!=='img'"
            :file-list="value"
            :auto-upload="false"
            :http-request="upload"
            :on-change="fileChange"
            :on-exceed="exceedHandler"
            action=""
            :on-preview="handlePictureCardPreview"
            >
            <slot>
                <i class="el-icon-plus"></i>
            </slot>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        </div>
    `
}