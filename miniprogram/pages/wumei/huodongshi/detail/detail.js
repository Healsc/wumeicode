// pages/wumei/huodongshi/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        detail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
        this.getDetail();
    },
    getDetail() {
        const db = wx.cloud.database();
        db.collection('huodongshi').doc(this.data.id).get().then(res => {
            console.log(res)
            this.setData({
                detail: res.data
            })
        }).catch(err => {
            console.error(err)
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

    }
})