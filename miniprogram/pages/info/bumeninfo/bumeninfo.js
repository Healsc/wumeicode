// pages/baominginfo/baominginfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bumenInfo: {},
        id: "",
        content: "",
        name: ""
    },
    getNoticeDetail() {
        const db = wx.cloud.database();
        db.collection('departmentInfo').doc(this.data.id).get().then(res => {
            //console.log(res.data._content)
            this.setData({
                content: res.data._content,
                name: res.data._name
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
        this.getNoticeDetail();
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

        return {
            title: '东农舞美_' + this.data.name,
            path: "/pages/info/bumeninfo/bumeninfo?id=" + this.data.id
        }
    }
})