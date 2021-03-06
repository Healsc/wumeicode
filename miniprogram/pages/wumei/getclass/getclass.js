Page({
    data: {
        openid: "",
        listData: [
            { "code": "第一节", "one": "Mon1", "two": "Tue1", "three": "Wed1", "four": "Thu1", "five": "Fri1" },
            { "code": "第二节", "one": "Mon2", "two": "Tue2", "three": "Wed2", "four": "Thu2", "five": "Fri2" },
            { "code": "第三节", "one": "Mon3", "two": "Tue3", "three": "Wed3", "four": "Thu3", "five": "Fri3" },
            { "code": "第四节", "one": "Mon4", "two": "Tue4", "three": "Wed4", "four": "Thu4", "five": "Fri4" }
        ],
        wumeiInfo: {},
        classInfo:{},
        weekId:""
    },
    onLoad: function (options) {
        this.setData({
            weekId:options.weekid
        })
        console.log("weekid",this.data.weekId)
        this.getOpenid();
    },
    // 获取用户openid
    getOpenid() {
        let that = this;
        wx.cloud.callFunction({
            name: 'login',
            complete: res => {
                var openid = res.result.openid;
                that.setData({
                    openid: openid
                })
            }
        })
    },

    change(e) {
       
    },
    formSubmit(e) {
        this.setData({
            classInfo: e.detail.value,
        })
        const db = wx.cloud.database({
           // env: 'wumei-2070bb'
        })
        db.collection('wumeiInfo').where({
            _openid: this.data.openid // 填入当前用户 openid
        }).get({
            success: (res) => {
                this.setData({
                    wumeiInfo:res.data[0]
                })   
            },
            fail: (res) => {
                wx.showModal({
                    title: '提示',
                    content: '请刷新',
                })
            } 
        })
        wx.showModal({
            title: '',
            content: '确定提交课表信息',
            cancelText: '否',
            confirmText: '是',
            success: res => {
                if (res.confirm) {
                    //console.log('用户点击确定')
                    this.setData({
                        //设置时间 数据库增加个time字段为提交时间
                        time: this.getDate()
                    })
                    const db = wx.cloud.database({
                        //env: 'wumei-2070bb'
                    })
                    db.collection('class-week-' +this.data.weekId).add({
                        // data 字段表示需新增的 JSON 数据
                        data: {
                            _id: this.data.wumeiInfo._department + this.data.wumeiInfo._name, 
                            _name: this.data.wumeiInfo._name,//姓名
                            _department: this.data.wumeiInfo._department,//部门
                            _position: this.data.wumeiInfo._position,
                            _time: this.data.time,//提交时间
                            _isTJ: 1,
                            _Mon1: this.data.classInfo.Mon1,/* 周一 */
                            _Mon2: this.data.classInfo.Mon2,
                            _Mon3: this.data.classInfo.Mon3,
                            _Mon4: this.data.classInfo.Mon4,
                            _Tue1: this.data.classInfo.Tue1,/* 周二 */
                            _Tue2: this.data.classInfo.Tue2,
                            _Tue3: this.data.classInfo.Tue3,
                            _Tue4: this.data.classInfo.Tue4,
                            _Wed1: this.data.classInfo.Wed1,/* 周三 */
                            _Wed2: this.data.classInfo.Wed2,
                            _Wed3: this.data.classInfo.Wed3,
                            _Wed4: this.data.classInfo.Wed4,
                            _Thu1: this.data.classInfo.Thu1,/* 周四 */
                            _Thu2: this.data.classInfo.Thu2,
                            _Thu3: this.data.classInfo.Thu3,
                            _Thu4: this.data.classInfo.Thu4,
                            _Fri1: this.data.classInfo.Fri1,/* 周五 */
                            _Fri2: this.data.classInfo.Fri2,
                            _Fri3: this.data.classInfo.Fri3,
                            _Fri4: this.data.classInfo.Fri4,
                        },
                        success: function (res) {
                            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                            wx.showToast({
                                title: '提交成功',
                                icon: 'success',
                                duration: 3000
                            })
                        },
                        complete: function (res) {
                            wx.navigateBack({
                                delta: 1
                            })
                            //console.log("complete 跳转到显示所填写信息")
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    /* 获取系统时间 */
    getDate() {
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
    }
    
})