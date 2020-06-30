const villageManager = {
    data() {
        return {
            tag: '',
            tags: [],
            villageDesc: '',
            dialogVisible: false,
            dialogImageUrl: '',
            center: { lng: 116.404, lat: 39.915 },
            zoom: 15,
            addr: '',
            pictures: [],
        }
    },
    methods: {
        handleChange() {},
        markerDragend(event) {
            console.log(event)
        },
        searchcomplete(result) {
            console.log(result)
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    },
    components: {
        'z-upload': Zupload,
        'z-city': Zcity
    },
    template: `
        <div class="village-manager">
            <div class="user-info-item flex">
                <label class="user-info-item-label">乡村名称：</label>
                <p class="user-info-item-p">梦里花落知多少村</p>
            </div>
            <div class="user-info-item flex-baseline">
                <label class="user-info-item-label">村标签：</label>
                <div class="user-info-item-right">
                    <div class="flex-align-center">
                        <el-input class="user-info-item-input" v-model="tag" placeholder="请输入村标签" />
                        <el-button class="add-tag" type="success">添加标签</el-button>
                    </div>
                    <div class="tags">
                        <span class="tag" v-for="(tag,idx) of tags" :key="idx">{{tag}}</span>
                    </div>
                </div>
            </div>
            <div class="user-info-item flex">
                <label class="user-info-item-label">乡村简介：</label>
                <el-input class="user-info-item-textarea" type="textarea" show-word-limit maxlength="1000" :autosize="{ minRows: 6, maxRows: 8 }" v-model="villageDesc" placeholder="写下你乡村简介" />
            </div>
            <div class="user-info-item flex">
                <label class="user-info-item-label">乡村图片：</label>
                <z-upload v-model="pictures" fileType="img" />
            </div>
            <div class="user-info-item flex">
                <label class="user-info-item-label">乡村视频：</label>
                <z-upload v-model="pictures" fileType="img" />
            </div>
            <div class="user-info-item flex-baseline">
                <label class="user-info-item-label">乡村位置：</label>
                <div>
                    <z-city class="z-city" />
                    <div class="map">
                        <baidu-map style="height: 100%;" :center="center" :zoom="zoom" >
                            <bm-marker :position="{lng: 116.404, lat: 39.915}" @dragend="markerDragend" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                            <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
                            </bm-marker>
                            <bm-local-search :keyword="addr" @searchcomplete="searchcomplete" :panel="false" :select-first-result="true" :auto-viewport="true"></bm-local-search>
                        </baidu-map>
                    </div>
                </div>
            </div>
            <div class="submit-box">
                <el-button class="submit" type="success">保存</elbutton>
            </div>
        </div>
    `
}