// pages/wumei/getweekclass/getweekclass.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        weekList:[],
        openid:"",
        weekId:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOpenid();
        const db = wx.cloud.database({
            env: 'wumei-test-37e2a6'/* 当前环境ID */
        })
        db.collection('get-week-class').get({
            success: (res) => {
                this.setData({
                    weekList:res.data[0].weekid
                })
                console.log("a",this.data.weekList)
            },
            fail: (res) => {
                wx.showModal({
                    title: '错误提示',
                    content: '请刷新重试',
                })
            }
        })
    },
    getOpenid() {
        let that = this;
        wx.cloud.callFunction({
            name: 'login',
            complete: res => {
                var openid = res.result.openid;
                that.setData({
                    openid: openid
                })
                console.log(this.data.openid)
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    goGetClass(event) {
        this.setData({
            weekId:event.target.dataset.weekid
        })
        const db = wx.cloud.database({
            env: 'wumei-test-37e2a6'/* 当前环境ID */
        })
        db.collection('class-week-'+this.data.weekId).where({
            _openid: this.data.openid,  /* 填入当前用户 openid */
        }).get({
            success: (res) => {
                /* 判断是否提交过 */
                if (res.data.length) {
                    wx.showModal({
                        title: '提示',
                        content: '你已提交第'+event.target.dataset.weekid+'周课表信息',
                        success(res) {
                            if (res.confirm) {
                                //console.log('用户点击确定')
                            } else if (res.cancel) {
                                //console.log('用户点击取消')
                            }
                        }
                    })
                } else {
                    wx.navigateTo({
                        url: '/pages/wumei/getclass/getclass?weekid=' + event.target.dataset.weekid,
                    })
                }
            },
        })
    },
})
