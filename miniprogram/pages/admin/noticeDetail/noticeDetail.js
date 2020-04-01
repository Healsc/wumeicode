// pages/admin/noticeDetail/noticeDetail.js
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        noticeDetail: {}
    },
    getNoticeDetail() {
        let that = this;
        console.log(that.data.id)
        wx.cloud.callFunction({
            name: "getNoticeDetail",
            data: {
                id: that.data.id
            },
            success: (res) => {
                console.log(res)
                that.setData({
                    noticeDetail: res.result.data
                })
            },
            fail: (err) => {
                console.log(err)
                wx.showToast({
                    title: '失败！请重试',
                    icon: 'fail',
                    duration: 2000
                })
            }
        })
        /*  db.collection('notice').doc(this.data.id).get().then(res => {
             //console.log(res)
             this.setData({
                 noticeDetail: res.data
             })

         }).catch(err => {

             console.error(err)
             wx.showToast({
                 title: '失败！请重试',
                 icon: 'fail',
                 duration: 2000
             })
         }) */
    },
    delNotice() {
        let that = this;
        wx.showModal({
            title: '提示',
            content: '确定删除？',
            success(res) {
                if (res.confirm) {
                    wx.cloud.callFunction({
                        name: 'delNotice',
                        data: {
                            id: that.data.id
                        },
                        success: (res) => {
                            wx.showToast({
                                title: '成功',
                                icon: 'success',
                                duration: 1000
                            })
                            wx.navigateBack({
                                delta: 2
                            })
                            //console.log(res)
                        },
                        fail: () => {
                            wx.showToast({
                                title: '失败',
                                icon: 'fail',
                                duration: 2000
                            })
                        }
                    })
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })


        /*  let that = this;
         wx.showModal({
             title: '提示',
             content: '确定删除么？',
             success(res) {
                 if (res.confirm) {
                     //console.log('用户点击确定')
                     db.collection('notice').doc(that.data.id).remove().then(res => {
                         wx.showToast({
                             title: '成功',
                             icon: 'success',
                             duration: 1000
                         })
                         setTimeout(() => {
                             wx.navigateBack({
                                 delta: 2
                             })
                         }, 1500)
                     }).catch(err => {
                         wx.showToast({
                             title: '失败',
                             icon: 'fail',
                             duration: 2000
                         })
                         console.log(err)
                     })
                 } else if (res.cancel) {
                     //console.log('用户点击取消')
                 }
             }
         }) */

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
        this.getNoticeDetail();
        // console.log(options.id)
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