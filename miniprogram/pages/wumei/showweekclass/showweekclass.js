// pages/wumei/getweekclass/getweekclass.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        weekList:[],
        openid:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOpenid();
        const db = wx.cloud.database({
            //env: 'wumei-2070bb'/* 当前环境ID */
        })
        db.collection('show-week-class').get({
            success: (res) => {
                this.setData({
                    weekList:res.data[0].weekid
                })
                //console.log("a",this.data.weekList)
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
   
})
