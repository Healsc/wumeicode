Page({
    data: {
        openid: "",
        wumeiInfo: {}
    },
    onLoad: function (options) {
        this.getOpenid();
    },
    goToClass(){
        const db = wx.cloud.database({
            env: 'wumei-test-37e2a6'/* 当前环境ID */
        })
        db.collection('class-week-1').where({
            _openid: this.data.openid,  /* 填入当前用户 openid */
        }).get({
            success: (res) => {
                console.log(res.data)
                console.log(res.data.length)
                /* 判断是否提交过 */
                if (res.data.length) {
                   /*  wx.navigateTo({
                        url: '/pages/wumei/showinfo/showinfo',
                    }) */
                    wx.showModal({
                        title: '提示',
                        content: '你已提交课表信息',
                        success(res) {
                            if (res.confirm) {
                                //console.log('用户点击确定')
                            } else if (res.cancel) {
                                //console.log('用户点击取消')
                            }
                        }
                    })
                } else {
                    const db = wx.cloud.database({
                        env: 'wumei-test-37e2a6'/* 当前环境ID */
                    })
                    db.collection('wumeiInfo').where({
                        _openid: this.data.openid,  /* 填入当前用户 openid */
                        _isWM: 1 /* 判断是否为舞美成员 */
                    }).get({
                        success: (res) => {
                            /* if判断数据库返回数组 找到所查找集合 返回数组为空既数组长度为0 */
                            if (res.data.length) {
                                wx.navigateTo({
                                    url: '/pages/wumei/getclass/getclass',
                                })
                            }else{
                                wx.showModal({
                                    title: '抱歉',
                                    content: '尚未进行舞美认证或认证审核中',
                                })
                            }
                        },
                        fail: (res) => {
                            wx.showModal({
                                title: '提示',
                                content: '请刷新',
                            })
                       
                        }
                    })
                    
                }
            },
        })
    },
    // 获取用户openid
    getOpenid() {
        let that = this;
        wx.cloud.callFunction({
            name: 'login',
            complete: res => {
                //console.log(res.result)
                //console.log('云函数获取到的openid: ', res.result.openid)
                var openid = res.result.openid;
                that.setData({
                    openid: openid
                })
                //console.log(this.data.openid)
            }
        })
    },
    goShowClass(){
        wx.navigateTo({
            url: '/pages/wumei/showclass/showclass',
        })
    },
})