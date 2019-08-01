// pages/baominginfo/baominginfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        naxinInfo: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const db = wx.cloud.database({
            env: 'wumei-test-37e2a6'
        })
        db.collection('naxinInfo').where({
            _openid: '' // 填入当前用户 openid
        }).get({
            success: (res) => {
                //console.log(res.data[0])
                this.setData({
                    naxinInfo: res.data[0]
                })
                //console.log(this.data.name)
                //console.log(123)
                console.log("naxinInfo:", this.data.naxinInfo)

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

    }
})