// pages/admin/juchang/juchang.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        juchangList: [],
        count: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCount();
        this.getJuchang();
    },
    getCount() {
        const db = wx.cloud.database();
        db.collection('juchang').count().then(res => {
            this.setData({
                count: res.total
            })
        })
    },
    getJuchang() {
        wx.cloud.callFunction({
            name: "getJuchang",
            data: {
                skip: this.data.juchangList.length
            },
            success: (res) => {
               // console.log(res)
                this.setData({
                    juchangList: this.data.juchangList.concat(res.result.data)
                })
            },
            fail: (err) => {
                console.error(err)
            }
        })
    },
    delJuchang(e) {
        console.log(e)
        wx.cloud.callFunction({
            name: 'delJuchang',
            data: {
                id: e.target.dataset.id
            },
            success: (res) => {
                let that = this;
                that.setData({
                    juchangList: [],
                    count: ''
                })
                that.onLoad();
                console.log(res)
            },
            fail: (err) => {
                console.error(err)
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
        if (this.data.count != this.data.juchangList.length) {
            this.getJuchang();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})