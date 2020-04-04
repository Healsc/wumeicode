// pages/admin/dahuoList/dahuoList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dahuoList: [],
        count: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getDahuoList();
        this.getCount();
    },
    getDahuoList() {
        wx.cloud.callFunction({
            name: 'getDahuoList',
            data: {
                skip: this.data.dahuoList.length
            },
            success: (res) => {
               // console.log(res)
                this.setData({
                    dahuoList: this.data.dahuoList.concat(res.result.data),

                })
            },
            fail: (err) => {
                console.error(err)
            }
        })
    },
    getCount() {
        const db = wx.cloud.database();
        db.collection('dahuo').count().then(res => {
            //console.log(res)
            this.setData({
                count: res.total
            })
        })
    },
    delDahuo(e) {
        wx.cloud.callFunction({
            name: 'delDahuo',
            data: {
                id: e.target.dataset.id
            },
            success: (res) => {
                let that = this;
                that.setData({
                    dahuoList: []
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
       // console.log(this.data.count)
        //console.log(this.data.dahuoList.length)
        if (this.data.total != this.data.dahuoList.length) {
            this.getDahuoList();
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})