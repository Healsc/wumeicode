const app = getApp();

Page({
    data: {
        userInfo: {},
        index: null,
        imgList: [],
        multiIndex: [0, 0],
        multiArray: [
            ['办公室', '技术部','干训部','宣传部','纪检部','外勤部','会长团'],
            ['干事', '副主任', '主任'],
        ],
        objectMultiArray: [
            [{
                id: 0,
                name: '办公室'
            },
            {
                id: 1,
                name: '技术部'
            },
            {
                id: 2,
                name: '干训部'
            },
            {
                id: 3,
                name: '宣传部'
            },
            {
                id: 4,
                name: '纪检部'
            },
            {
                id: 5,
                name: '外勤部'
                },
            {
                id: 6,
                name: '会长团'
            }],
            [{
                id: 0,
                name: '干事'
            },
            {
                id: 1,
                name: '副部长'
            },
            {
                id: 2,
                name: '部长'
            },
            {
                id: 3,
                name: '会长'
            },
            {
                id: 4,
                name: '执行会长'
            }]
        ],
        date: '1999-01-23',
        region: ['黑龙江', '哈尔滨市', '香坊区']
    },
    MultiChange(e) {
        this.setData({
            multiIndex: e.detail.value
        })
    },
    MultiColumnChange(e) {
        let data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.multiIndex[0]) {
                    case 0:
                        data.multiArray[1] = ['干事', '副主任', '主任'];           
                        break;
                    case 1:
                        data.multiArray[1] = ['干事', '副部长', '部长'];  
                        break;
                    case 1:
                        data.multiArray[1] = ['干事', '副部长', '部长'];
                        break;
                    case 2:
                        data.multiArray[1] = ['干事', '副部长', '部长'];
                        break;
                    case 3:
                        data.multiArray[1] = ['干事', '副部长', '部长'];
                        break;
                    case 4:
                        data.multiArray[1] = ['干事', '副部长', '部长'];
                        break;
                    case 5:
                        data.multiArray[1] = ['干事', '副部长', '部长'];
                        break;
                    case 6:
                        data.multiArray[1] = ['会长', '执行会长'];
                        break;
                }
                data.multiIndex[1] = 0;   
                break;
           
        }
        this.setData(data);
    },


    DateChange(e) {
        this.setData({
            date: e.detail.value
        })
    },
    RegionChange: function (e) {
        this.setData({
            region: e.detail.value
        })
    },









    //表单   //验证 提交到数据库
    formSubmit(e) {
        console.log(this.data.multiArray[0][this.data.multiIndex[0]])
        console.log(this.data.multiArray[1][this.data.multiIndex[1]])
            this.setData({
                userInfo: e.detail.value,
            })
        if (this.data.userInfo.name == "" || this.data.userInfo.sex == "" || this.data.userInfo.studentNumber =="" ||this.data.userInfo.academy == "" || this.data.userInfo.mahor == ""){
            wx.showModal({
                title: '',
                content: '信息不完整',
                cancelText: '退出',
                confirmText: '继续',
                success: res => {
                    console.log(this.data.userInfo)
                }

            })
            }else{
            wx.showModal({
                title: '',
                content: '确定提交信息',
                cancelText: '否',
                confirmText: '是',
                success: res => {
                    console.log(this.data.userInfo)
                }

            })
            }

        

    },
    //重置
    formReset() {
        console.log('form发生了reset事件')
    },




    //上传图片
    ViewImage(e) {
        wx.previewImage({
            urls: this.data.imgList,
            current: e.currentTarget.dataset.url
        });
    },
    ChooseImage() {
        wx.chooseImage({
            count: 1, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album','camera'], //从相册选择
            success: (res) => {
                if (this.data.imgList.length != 0) {
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        imgList: res.tempFilePaths
                    })
                }
            }
        });
    },
    DelImg(e) {
        wx.showModal({
            title: '',
            content: '确定要删除这张照片？',
            cancelText: '否',
            confirmText: '是',
            success: res => {
                if (res.confirm) {
                    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
                    this.setData({
                        imgList: this.data.imgList
                    })
                }
            }
        })
    },


})