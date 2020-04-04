// pages/admin/zhibanList/zhibanList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: []
    },
    getList() {
        wx.cloud.callFunction({
            name: 'getZhibanList',
            data: {
                skip: this.data.list.length
            },
            success: (res) => {
                console.log(res)
                this.setData({
                    list: this.data.list.concat(res.result.data)
                })
            },
            fail: (err) => {
                console.error(err)
            }
        })
    },
    delZhiban(e) {
        wx.cloud.callFunction({
            name: 'delZhiban',
            data: {
                id: e.target.dataset.id
            },
            success: (res) => {
                let that = this;
                that.setData({
                    list: []
                })
               that.getList();
                //console.log(res)
            },
            fail: (err) => {
                console.error(err)
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getList();
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
        this.getList();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})