const collectVillage = {
    data() {
        return {
            list: [{
                url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                title: '岳阳县张谷英镇张谷英村',
                addr: '岳阳县-张谷英镇-张谷英村'
            }, {
                url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                title: '岳阳县张谷英镇张谷英村',
                addr: '岳阳县-张谷英镇-张谷英村'
            }]
        }
    },
    template: `
        <div class="collect-village">
            <div class="collect-item flex-sb-c" v-for="(item,idx) of list" :key="idx">
                <div class="collect-item-left flex">
                    <el-image class="collect-item-image" :src="item.url" fit="cover" :lazy="true" />
                    <div class="collect-item-str">
                        <h3 class="collect-item-title">{{item.title}}</h3>
                        <p class="collect-item-addr">{{item.addr}}</p>
                    </div>
                </div>
                <p class="collect-item-right">查看房源<i class="el-icon-arrow-right"></i></p>
            </div>
        </div>
    `
}