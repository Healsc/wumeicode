// pages/wumei/huodongshi/hdsweek/hdsweek.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        weekId:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const db = wx.cloud.database({

        })
        db.collection('show-hds-week').get({
            success: (res) => {
                
                this.setData({
                    weekId:res.data
                    /* weekId: res.data[0]._showList */
                })
                //console.log(this.data.weekId)
            },
            fail: (res) => {
                wx.showModal({
                    title: '错误提示',
                    content: '请刷新重试',
                })
            }
        })
    },
    /* goDetail(event) {
        //console.log(event)
        wx.navigateTo({
            url: '/pages/wumei/huodongshi/hdsdetail/hdsdetail?weekId=' + event.target.dataset.weekid + '&dayId=' + event.target.dataset.dayid,
        })
    }, */
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