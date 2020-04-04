// pages/admin/wumeiInfo/wumeiInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        wumeiInfo: [],
        count: []
    },

    getWumeiInfo() {
        wx.cloud.callFunction({
            name: "getWumeiInfo",
            data: {
                skip: this.data.wumeiInfo.length,
                isWM: 1
            },
            success: (res) => {
                console.log(res)
                this.setData({
                    wumeiInfo: this.data.wumeiInfo.concat(res.result.data)
                })
            }
        })
    },
    delNumber(e) {
        wx.cloud.callFunction({
            name: "updateIsWM",
            data: {
                id: e.target.dataset.id,
                isWM: 0
            },
            success: (res) => {
                let that = this;
                that.setData({
                    wumeiInfo: [],
                    count: ""
                })
                that.getWumeiInfo();
                that.getCount();
            },
            fail: (err) => {
                console.error(err)
            }
        })
    },
    getCount() {
        let db = wx.cloud.database();
        db.collection('wumeiInfo').where({
            _isWM: 0
        }).count().then(res => {
            this.setData({
                count: res.total
            })
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCount();
        this.getWumeiInfo();
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
        let that = this;
        that.setData({
            wumeiInfo: [],
            count: ""
        })
        that.getWumeiInfo();
        that.getCount();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.count != this.data.wumeiInfo.length) {
            this.getWumeiInfo();
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})