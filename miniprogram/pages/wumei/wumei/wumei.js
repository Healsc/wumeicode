Page({
    data: {
        openid: "",
    },
    onLoad: function (options) {
        this.getOpenid();
    },
    goToWeekClass(){
        const db = wx.cloud.database({
            env: 'wumei-test-37e2a6'
        })
        db.collection('wumeiInfo').where({
            _openid: this.data.openid,// 填入当前用户 openid
            _isWM:1 //验证是否为舞美成员
        }).get({
            success: (res) => {
                if(res.data.length){
                    wx.navigateTo({
                        url: '/pages/wumei/getweekclass/getweekclass',
                    })
                }else{
                    wx.showModal({
                        title: '抱歉',
                        content: '您尚未进行舞美认证或认证审核中',
                    })
                }
            }
        })
        
    },
    goShowClass() {
        const db = wx.cloud.database({
            env: 'wumei-test-37e2a6'
        })
        db.collection('wumeiInfo').where({
            _openid: this.data.openid,// 填入当前用户 openid
            _isWM: 1 //验证是否为舞美成员
        }).get({
            success: (res) => {
                if (res.data.length) {
                    wx.navigateTo({
                        url: '/pages/wumei/showclass/showclass',
                    })
                } else {
                    wx.showModal({
                        title: '抱歉',
                        content: '您尚未进行舞美认证或认证审核中',
                    })
                }
            }
        })
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
})