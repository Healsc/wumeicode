const app = getApp();

Page({
    data: {
        wumeiInfo: {},
        index: null,
        imgList: [],
        fileIds:[],
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
        date: '2000-06-15',
        region: ['黑龙江', '哈尔滨市', '香坊区'],
        index:null,
        picker: ['共青团员', '入党积极分子', '预备党员', '中共党员', '群众'],
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
        console.log(this.data.date)
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
    /*检验中文 */
    ischina(str) {
        var reg = /^[\u4E00-\u9FA5]{1,15}$/;   /*定义验证表达式*/
        return reg.test(str);     /*进行验证*/
    },
    /*校验学号 */
    isSNo(str) {
        var reg = /^(A([012]\d{1}[1][56789]\d{4}))$/;
        return reg.test(str);     /*进行验证*/
    },

    isTelCode(str) {
        var reg = /^(1[356789]\d{9})$/;
        return reg.test(str);
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
        if (this.data.wumeiInfo.name == "" || this.data.wumeiInfo.sex == "" || this.data.wumeiInfo.studentNumber == "" || this.data.wumeiInfo.academy == "" || this.data.wumeiInfo.major == "" || this.data.wumeiInfo.nation == "" || this.data.wumeiInfo.phone == "" || this.data.wumeiInfo.dormitory == "" ){
            wx.showModal({
                title: '',
                content: '信息不完整',
                cancelText: '退出',
                confirmText: '继续',
                success: res => {
                    
                }

            })
        } else if (!this.ischina(this.data.wumeiInfo.name)) {
            wx.showModal({
                title: '',
                content: '姓名有误！',
                cancelText: '退出',
                confirmText: '继续',
            })
        } else if (!this.isSNo(this.data.wumeiInfo.studentNumber)) {
            wx.showModal({
                title: '',
                content: '学号有误！',
                cancelText: '退出',
                confirmText: '继续',
            })
        } else if (!this.ischina(this.data.wumeiInfo.academy)) {
            wx.showModal({
                title: '',
                content: '学院有误！',
                cancelText: '退出',
                confirmText: '继续',
            })
        } else if (!this.ischina(this.data.wumeiInfo.nation)) {
            wx.showModal({
                title: '',
                content: '民族信息填写有误！',
                cancelText: '退出',
                confirmText: '继续',
            })
        } else if (!this.isTelCode(this.data.wumeiInfo.phone)) {
            wx.showModal({
                title: '',
                content: '手机号有误！',
                cancelText: '退出',
                confirmText: '继续',
            })
        } else if (this.data.imgList.length == 0){
            wx.showModal({
                title: '提示',
                content: '请提交照片！',
                cancelText: '退出',
                confirmText: '继续',
            })
        }else {
            //console.log("e", this.data.wumeiInfo)
            wx.showModal({
                title: '',
                content: '确定提交信息',
                cancelText: '否',
                confirmText: '是',
                success: res => {
                    //console.log(this.data.userInfo)
                   
                    if (res.confirm) {
                        wx.showLoading({
                            title: '提交中',
                        })
                        const promiseArr = [];
                        for (let i = 0; i < this.data.imgList.length; i++) {
                            promiseArr.push(new Promise((resolve, reject) => {
                                let item = this.data.imgList[i];
                                // 上传图片
                                wx.cloud.uploadFile({
                                    config: {
                                        //env: 'wumei-2070bb',
                                    },
                                    cloudPath: this.data.multiArray[0][this.data.multiIndex[0]] + this.data.multiArray[1][this.data.multiIndex[1]]+ this.data.wumeiInfo.name + '.png', // 上传至云端的路径
                                    filePath: item, // 小程序临时文件路径
                                    success: res => {
                                        // 返回文件 ID
                                        this.setData({
                                            fileIds: this.data.fileIds.concat(res.fileID)
                                        });
                                        
                                        resolve();
                                    },
                                    fail: err => {
                                        
                                        console.error
                                        reject();
                                    }
                                })
                            }));

                        }
                        this.setData({
                            //设置时间 数据库增加个time字段为提交时间
                            time: this.getDate()
                        })

                        // 插入到云数据库
                        Promise.all(promiseArr).then(res => {
                            const db = wx.cloud.database({
                                //env: 'wumei-2070bb'/* 当前环境ID */
                            })
                            db.collection('wumeiInfo').add({
                                data: {
                                    _id: this.data.multiArray[0][this.data.multiIndex[0]] + this.data.multiArray[1][this.data.multiIndex[1]]+  this.data.wumeiInfo.name,
                                    _fileIds: this.data.fileIds,
                                    _name: this.data.wumeiInfo.name,//协会成员姓名
                                    _sex: this.data.wumeiInfo.sex,//性别
                                    _studentNumber: this.data.wumeiInfo.studentNumber,//学号
                                    _academy: this.data.wumeiInfo.academy,//学院
                                    _major: this.data.wumeiInfo.major,//专业
                                    _phone: this.data.wumeiInfo.phone,//联系方式手机
                                    _dormitory: this.data.wumeiInfo.dormitory,//寝室
                                    _nation: this.data.wumeiInfo.nation,//民族
                                    _department: this.data.multiArray[0][this.data.multiIndex[0]],//所在部门
                                    _position: this.data.multiArray[1][this.data.multiIndex[1]],//职务
                                    _politicsFace: this.data.picker[this.data.index],//政治面貌
                                    _familyAddress: this.data.address,//家庭住址
                                    _birth: this.data.date,
                                    _isGL: 0,
                                    _isWM: 0,
                                    _time: this.data.time,//提交时间
                                    _isZB: 0,
                                    _is1:1,
                                    _is2:0,
                                }
                            }).then(res => {
                                wx.redirectTo({
                                    //前面加/ 绝对路径 否则报错
                                    url: '/pages/profile/showinfo/showinfo'
                                })
                                wx.hideLoading();
                            }).catch(err => {

                            })
                        }).catch(err => {

                        });






                        
                        /* const db = wx.cloud.database({
                            env: 'wumei-2070bb'
                        })
                        const naxinInfo = db.collection('wumeiInfo')
                        db.collection('wumeiInfo').add({
                            // data 字段表示需新增的 JSON 数据
                            data: {
                                // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                                _name: this.data.wumeiInfo.name,//协会成员姓名
                                _sex: this.data.wumeiInfo.sex,//性别
                                _studentNumber: this.data.wumeiInfo.studentNumber,//学号
                                _academy: this.data.wumeiInfo.academy,//学院
                                _major: this.data.wumeiInfo.major,//专业
                                _phone: this.data.wumeiInfo.phone,//联系方式手机
                                _dormitory: this.data.wumeiInfo.dormitory,//寝室
                                _nation: this.data.wumeiInfo.nation,//民族
                                _department: this.data.multiArray[0][this.data.multiIndex[0]],//所在部门
                                _position: this.data.multiArray[1][this.data.multiIndex[1]],//职务
                                _politicsFace: this.data.picker[this.data.index],//政治面貌
                                _familyAddress: this.data.address,//家庭住址
                                _birth: this.data.date,
                                _isGL: 0,
                                _isWM: 0,
                                _time: this.data.time,//提交时间
                                _isZB:0,
                              
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

                        }) */
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }

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