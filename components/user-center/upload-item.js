const uploadItem = {
    props: {
        flag: {
            type: String,
            default: 'image'
        }
    },
    data() {
        return {
            name: '',
            image: '',
            dialogVisible: false,
            tableFormat: [{
                prop: 'img',
                label: '缩略图',
                template: 'img',
                width: '100',
            }, {
                prop: 'name',
                label: '名称',
            }, {
                prop: 'date',
                label: '时间',
                width: '160',
            }, ],
            tableData: [...Array(10)].map(() =>({
                date: '2016-05-02',
                name: '塔河岸边罗布人 沙海深处驼铃韵',
                img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593253006987&di=bf3825d2b138714a2de37e20c8343d63&imgtype=0&src=http%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F01%2F3e%2F05%2F40%2Fthe-sandbar-that-links.jpg'
            }))
        }
    },
    methods: {
        handleClick() {},
        handleSelectionChange(){}
    },
    components: {
        'z-upload': Zupload,
    },
    template: `
        <div class="upload-item">
            <div class="flex-sb-c top">
                <div class="btn-box">
                    <el-button class="btn" type="danger">删除</el-button>
                    <el-button class="btn" type="primary">编辑</el-button>
                </div>
                <el-button class="push" type="success"><i class="el-icon-plus"></i>发布照片</el-botton>
            </div>
            <el-table
                :data="tableData"
                stripe
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                    v-for="(item, idx) of tableFormat"
                    :key="item.prop"
                    :prop="item.prop"
                    :show-overflow-tooltip="true"
                    :label="item.label"
                    :width="item.width">
                    <template v-if="item.template === 'img'" #default="{row,column:col}">
                        <el-image
                            style="width: 24px; height: 16px"
                            :src="row[col.property]"
                            fit="cover"
                        />
                    </template>
                    <template v-else #default="{row,column:col}">
                        <span>{{ row[col.property]||'null' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button class="blue" @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button class="red" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
          </el-table>
          <p class="total">共3页，共30张条记录</p>
          <el-dialog
            title="发布特色图片"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            :close-on-click-modal="false"
            width="600px"
            >
            <section class="dialog-content">
                <div class="flex-baseline item">
                    <label class="label">图片标题：</label>
                    <el-input class="input" placeholder="请输入名称" v-model="name" />
                </div>
                <div class="flex item" style="align-items:flex-start;">
                    <label class="label">特色图片：</label>
                    <z-upload/>
                </div>
            </section>
            <span slot="footer" class="dialog-footer" style="display:block;text-align:left;padding-left:30px;">
                <el-button style="width: 180px;height: 40px;" type="success" class="save" @click="dialogVisible = false">保存</el-button>
            </span>
            </el-dialog>
        </div>
    `
}