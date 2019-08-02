//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        userInfo: {},
        openid: '',
    },
    //事件处理函数
    onLoad: function () {
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
    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    goIdenitity(){
        const db = wx.cloud.database({
            env: 'wumei-test-37e2a6'
        })
        db.collection('wumeiInfo').where({
            _openid: this.data.openid // 填入当前用户 openid
        }).get({
            success: (res) => {
                //数据库返回来的是一个数组 使用数组长度判断跳转
                if (res.data.length && res.data[0]._isWM) {
                    wx.navigateTo({
                        url: '/pages/profile/showWMinfo/showWMinfo',
                    })
                } else if (res.data.length){
                    wx.navigateTo({
                        url:"/pages/profile/showinfo/showinfo"
                    })
                }else{
                    wx.navigateTo({
                        url: '/pages/profile/identity/identity',
                    })
                }
            }
        })  
    }
})