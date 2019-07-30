const app = getApp();

Page({
    data: {
        openid: '',
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

 
    //跳转到报名信息页面
    goIdentity(){
        const db = wx.cloud.database()
        const a = db.collection('naxinInfo').where({
            _openid: this.data.openid
        })
        console.log(a.name)
/*         db.collection('naxinInfo').doc("id").get({
            success: function (res) {
                wx.navigateTo({
                    url: '/pages/baominginfo/baominginfo',
                })
                // res.data 包含该记录的数据
                console.log(res.data)
                console.log("y")
            },
            fail:function(){
                wx.navigateTo({
                    url: '/pages/identity/identity',
                })
                console.log("n0")
               
            }
        }) */
      
    },
})