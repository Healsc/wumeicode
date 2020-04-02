// pages/admin/applyInfo/applyInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        applyInfo: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getApplyInfo();
    },
    getApplyInfo() {
        wx.cloud.callFunction({
            name: "getApplyInfo",
            data: {
                skip: this.data.applyInfo.length
            },
            success: (res) => {
                this.setData({
                    applyInfo: this.data.applyInfo.concat(res.result.data)
                })
                console.log(res)
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
        this.getApplyInfo();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})