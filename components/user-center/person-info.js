const personInfo = {
    data() {
        return {
            avatar: '',
            form: {
                username: '1565651615',
                mobile: '15241454',
                email: ''
            },
            list: [{
                str: '用户名',
                edit: false,
                value: 'username'
            }, {
                str: '手机号码',
                edit: true,
                value: 'mobile'
            }, {
                str: '邮箱地址',
                edit: false,
                value: 'email'
            }],
        }
    },
    components: {
        'z-upload': Zupload,
    },
    template: `
        <div class="person-info flex-sb-c">
            <div class="person-left">
                <div class="person-item flex-baseline" v-for="(item, idx) of list" :key="idx">
                    <label class="person-item-label">{{item.str}}：</label>
                    <p class="person-item-p" v-if="!item.edit">{{form[item.value]}}</p>
                    <el-input
                        v-else
                        v-model="form[item.value]"
                        class="person-item-input"
                        clearable
                        :placeholder="'请输入'+item.str"></el-input>
                    <span class="person-item-action-str">{{!form[item.value]?'添加'+item.str:'修改'}}</span>
                </div>
            </div>
            <div class="person-right">
                <z-upload>
                    <div class="edit-box">
                        <el-image class="edit-default-img" :src="avatar||'./images/detail_avatar@2x.png'" />
                        <p class="edit-str">编辑头像</p>
                    </div>
                </z-upload>
            </div>
        </div>
    `
}