// pages/admin/departmentList/departmentList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        departmentList: [{
                id: 'bangongshi',
                name: "办公室"
            }, {
                id: 'jishubu',
                name: "技术部"
            },
            {
                id: 'ganxunbu',
                name: "干训部"
            },
            {
                id: 'xuanchuanbu',
                name: "宣传部"
            },
            {
                id: 'jijianbu',
                name: "纪检部"
            },
            {
                id: 'waiqinbu',
                name: "外勤部"
            },
            {
                id: 'wumei',
                name: "舞美"
            }
        ]
    },

    /*   getDepartmentList() {
          const db = wx.cloud.database();
          db.collection('departmentList').get().then(res => {
              this.setData({
                  departmentList: res.data
              })
              console.log(res)
          }).catch(err => {
              console.error(err)
          })
      }, */
    goDepartmentDetail(e) {
        console.log(e.target.dataset.id)
        wx.navigateTo({
            url: '/pages/admin/updateDepartment/updateDepartment?id=' + e.target.dataset.id,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /*  this.getDepartmentList(); */
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