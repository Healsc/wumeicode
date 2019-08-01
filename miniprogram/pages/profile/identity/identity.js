const app = getApp();

Page({
    data: {
        wumeiInfo: {},
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
        region: ['黑龙江', '哈尔滨市', '香坊区'],
        index:null,
        picker: ['共青团员', '入党积极分子', '预备党员', '共产党员', '群众'],
        address:""
    },

    //所属部门
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

    //出生日期
    DateChange(e) {
        this.setData({
            date: e.detail.value
        })
        //console.log(e)
        //console.log(e.detail.value)
    },
    //家庭所在地
    RegionChange: function (e) {
        this.setData({
            region: e.detail.value,
            address: e.detail.value[0] + e.detail.value[1] + e.detail.value[2]
        })
        //console.log(e)
        //console.log(e.detail.value)
        //console.log(this.data.region)
        //console.log(this.data.address)
    },

    //政治面貌
    PickerChange(e) {
        //console.log(e);
        this.setData({
            index: e.detail.value,
        })
    },


    //表单   //验证 提交到数据库
    formSubmit(e) {
        //console.log("b",this.data.picker[this.data.index])//政治面貌
        //console.log("c",this.data.multiArray[0][this.data.multiIndex[0]])//部门
        //console.log("d",this.data.multiArray[1][this.data.multiIndex[1]])//职务
            this.setData({
                wumeiInfo: e.detail.value,
            })

        //console.log("0",e.detail.value)
        //console.log("1",this.data.wumeiInfo)
        if (this.data.wumeiInfo.name == "" || this.data.wumeiInfo.sex == "" || this.data.wumeiInfo.studentNumber == "" || this.data.wumeiInfo.academy == "" || this.data.wumeiInfo.mahor == "" || this.data.wumeiInfo.minzu == "" || this.data.wumeiInfo.phone == "" || this.data.wumeiInfo.qinshi == ""){
            wx.showModal({
                title: '',
                content: '信息不完整',
                cancelText: '退出',
                confirmText: '继续',
                success: res => {
                    
                }

            })
        } else {
            //console.log("e", this.data.wumeiInfo)
            wx.showModal({
                title: '',
                content: '确定提交信息',
                cancelText: '否',
                confirmText: '是',
                success: res => {
                    //console.log(this.data.userInfo)
                    this.setData({
                        //设置时间 数据库增加个time字段为提交时间
                        time: this.getDate()
                    })
                    const db = wx.cloud.database({
                        env: 'wumei-test-37e2a6'
                    })
                    const naxinInfo = db.collection('wumeiInfo')
                    db.collection('wumeiInfo').add({
                        // data 字段表示需新增的 JSON 数据
                        data: {
                            // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                            name: this.data.wumeiInfo.name,//协会成员姓名
                            sex: this.data.wumeiInfo.sex,//性别
                            studentNumber: this.data.wumeiInfo.studentNumber,//学号
                            academy: this.data.wumeiInfo.academy,//学院
                            major: this.data.wumeiInfo.major,//专业
                            phone: this.data.wumeiInfo.phone,//联系方式手机
                            dormitory: this.data.wumeiInfo.dormitory,//寝室
                            nation:this.data.wumeiInfo.nation,//民族
                            department: this.data.multiArray[0][this.data.multiIndex[0]],//所在部门
                            postion: this.data.multiArray[1][this.data.multiIndex[1]],//职务
                            politicsFace: this.data.picker[this.data.index],//政治面貌
                            familyAddress:this.data.address,//家庭住址
                            isGL:0,
                            isWM:0,
                            time: this.data.time,//提交时间
                        },
                        success: function (res) {
                            wx.showToast({
                                title: '成功',
                                icon: 'success',
                                duration: 3000
                            })
                        },
                        complete: function (res) {
                            console.log("complete gotoshowInfo")
                            wx.redirectTo({
                                //前面加/ 绝对路径 否则报错
                                url: '/pages/profile/showinfo/showinfo'
                            })
                        }

                    })
                }

            })
        }

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

     onLoad: function (options) {
        
    }, 
    //获取系统时间
    getDate(){
        var date = new Date();
        //年
        var Y = date.getFullYear();
        //月
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        //日
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        //时
        var h = date.getHours();
        //分
        var m = date.getMinutes();
        //秒
        var s = date.getSeconds();
        return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
        //console.log("当前时间：" + Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s);
    }
})