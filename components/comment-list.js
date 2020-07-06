
const commentList = {
    props: {
        number: {
            type: [Number, String],
            default: 0
        },
        number2: {
            type: [Number, String],
            default: 0
        },
        number2Show: {
            type: Boolean,
            default: false
        },
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            activeTitle: 'dt',
            textarea: '',
        }
    },
    methods: {
        changeTitle(action) {
            this.activeTitle = action
            this.$emit('titleClick', action)
        },
        sendComment() {
            this.$emit('getTextarea', this.textarea)
        }
    },
    created() {
        console.log(this.list, 'list', this.number2Show)
    },
    template: `
        <div class="comment-list">
            <div class="comment-list-title-box flex">
                <h2 class="comment-list-title" :class="{active:activeTitle==='dt'}" @click="changeTitle('dt')">动态评论({{number}})</h2>
                <h2 v-if="number2Show" class="comment-list-title" :class="{active:activeTitle==='hot'}" @click="changeTitle('hot')">热门评价({{number2}})</h2>
            </div>
            <section class="comment-list-area">
                <div class="send-comment-area">
                    <el-input
                        class="textarea"
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 6}"
                        placeholder="写下你的评论"
                        v-model="textarea"
                        maxlength="1000"
                        show-word-limit
                    >
                </div>
                <div class="send-box flex-sb">
                    <div class="flex-align-center">
                        <slot name="action"></slot>
                    </div>
                    <el-button class="send-btn" :disabled="!textarea.length" type="success" @click="sendComment">发起评价</el-button>
                </div>
                <div class="comment-item" v-for="(comment, idx) of list" :key="idx">
                    <div class="avatar-warpper flex-align-center">
                        <el-avatar class="avatar" :size="40" :src="comment.avatar">
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                        </el-avatar>
                        <div class="base-info flex-column flex-sb">
                            <p class="name">{{comment.name}}</p>
                            <span class="time">{{comment.time}}</span>
                        </div>
                    </div>
                    <div class="content-box">
                        <p class="content">{{comment.comment_content}}</p>
                    </div>
                    <div class="reply-box" v-if="comment.reply_list&&comment.reply_list.length">
                        <div class="reply-item" v-for="(reply, j) of comment.reply_list">
                            <p>
                                <span class="bold">{{reply.reply_name}}回复：</span>
                                {{reply.reply_content}}
                            </p>
                        </div>
                    </div>
                    <div class="options flex-align-center">
                        <span style="margin-right: 20px;">回复</span>
                        <div>
                            <i></i>
                            <span>点赞12</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `,
}