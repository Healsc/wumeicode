//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        openid: "",
        userInfo: '',
        isShowUserBtn: true,
        isShowUserInfo: false,
    },
    //事件处理函数
    onLoad: function () {
        this.getSetting();
        let that = this;
        wx.cloud.callFunction({
            name: 'login',
            complete: res => {
                var openid = res.result.openid;
                that.setData({
                    openid: openid
                })
                //console.log(this.data.openid)
            }
        })
    },
    goIdenitity() {
        const db = wx.cloud.database({
            //env: 'wumei-2070bb'
        })
        db.collection('wumeiInfo').where({
            _openid: this.data.openid // 填入当前用户 openid
        }).get({
            success: (res) => {
                /* 如果数据库没有记录 返回来一个空的数组 既数组的长度为0 跳转到认证信息页面 */
                if (res.data.length == 0) {
                    wx.navigateTo({
                        url: '/pages/profile/identity/identity',
                    })
                } else if (res.data.length && res.data[0]._isWM) {
                    /* 返回数据 且_isWM字段为1 既验证为舞美协会成员 跳转到认证成功页面 */
                    wx.navigateTo({
                        url: '/pages/profile/showWMinfo/showWMinfo',
                    })
                } else if (res.data.length) {
                    /* 返回数据 管理员为进行验证 跳转到审核中页面 */
                    wx.navigateTo({
                        url: '/pages/profile/showinfo/showinfo',
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '发生未知错误',
                    })
                }
            }
        })
    },
    showQrcode() {
        wx.previewImage({
            urls: ['cloud://wumei-test-37e2a6.7775-wumei-test-37e2a6/zanshang.jpg'],
            current: 'cloud://wumei-test-37e2a6.7775-wumei-test-37e2a6/zanshang.jpg' // 当前显示图片的http链接      
        })
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: 'DNWM',
            path: "/pages/profile/profile/profile"
        }
    },
    openSetting() {
        wx.openSetting({
            success(res) {
                //console.log(res.authSetting)
            },
            complete: (res) => {
                 this.getSetting();
            },
        })
    },
    bindGetUserInfo(e) {
        console.log(e)
        if (e.detail.userInfo) {
            this.setData({
                userInfo: e.detail.userInfo,
                isShowUserBtn: false,
                isShowUserInfo: true
            })
        }
    },
    getSetting() {
        const that = this;
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res) {
                            that.setData({
                                userInfo: res.userInfo,
                                isShowUserBtn: false,
                                isShowUserInfo: true
                            })
                            // console.log(res.userInfo)
                        }
                    })
                } else {
                    that.setData({
                        isShowUserBtn: true,
                        isShowUserInfo: false
                    })
                }
            }
        })
    },
})