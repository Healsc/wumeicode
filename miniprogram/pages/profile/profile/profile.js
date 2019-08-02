//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        motto: 'Hi 欢迎使用！',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        openid: '',
    },
    //事件处理函数

    onLoad: function () {
        this.getOpenid();
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
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
                console.log(this.data.openid)
            }
        })
    },
    getUserInfo: function (e) {
        console.log(e)
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
                //console.log("011",this.data.wumeiInfo)
                //console.log(this.data.wumeiInfo._isWM)
                //console.log(res.data[0]._isWM)
                //console,log(res.data[0]._isWM)
                //console.log(res.data.length)
                //console.log(this.data.openid)
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