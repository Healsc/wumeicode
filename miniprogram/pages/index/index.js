const app = getApp();

Page({
    data: {
        openid: '',
        naxinInfoLength:0
    },
    onLoad: function (options) {
        this.getOpenid();
    },
    // 获取用户openid
    getOpenid() {
        let that = this;
        wx.cloud.callFunction({
            name: 'login', 
            complete: res => {
                console.log(res.result)
                console.log('云函数获取到的openid: ', res.result.openid)
                var openid = res.result.openid;
                that.setData({
                    openid: openid
                })
                console.log(this.data.openid)
            }
        })
    },

 
    //跳转到报名信息页面 已提交报名信息跳转到已经提交的信息
    goIdentity(){
        const db = wx.cloud.database()
        db.collection('naxinInfo').where({
            _openid: this.data.openid // 填入当前用户 openid
        }).get({
            success: (res) => {
                console.log(res.data.length)
                console.log(this.data.openid)
                //数据库返回来的是一个数组 使用数组长度判断跳转
                if (res.data.length){
                    wx.navigateTo({
                        url: '/pages/baominginfo/baominginfo',
                    })
               }else{
                    wx.navigateTo({
                        url: '/pages/identity/identity',
                    })
               }
            }
        })  
    },
})