// pages/baominginfo/baominginfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classInfo: [],
        openid: ""
    },
    onLoad: function (options) {

    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const db = wx.cloud.database({
            env: 'wumei-test-37e2a6'
        })
        db.collection('class-week-1').get({
            //如果查询成功的话    
            success: res => {
                console.log(res.data)
                //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
                this.setData({
                    classInfo: res.data
                })
                
            }
        })
        console.log(this.data.classInfo)
       
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