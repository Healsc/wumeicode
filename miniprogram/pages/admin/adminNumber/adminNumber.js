// pages/admin/adminNumber/adminNumber.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        adminNumber: [],
        WMNumber: [],
        adminCount: '',
        WMCount: ''
    },
    getAdminCount() {
        let db = wx.cloud.database();
        db.collection('wumeiInfo').where({
            _isWM: 1,
            _isAdmin: true
        }).count().then(res => {
            this.setData({
                WMCount: res.total
            })
        })
    },
    getWMCount() {
        let db = wx.cloud.database();
        db.collection('wumeiInfo').where({
            _isWM: 1,
            _isAdmin: false
        }).count().then(res => {
            this.setData({
                adminCount: res.total
            })
        })
    },
    getWMNuber() {
        wx.cloud.callFunction({
            name: "getAdminNumber",
            data: {
                isAdmin: false,
                skip: this.data.WMNumber.length
            },
            success: (res) => {
                console.log(res)
                this.setData({
                    WMNumber: this.data.WMNumber.concat(res.result.data)
                })
            },
            fail: (err) => {
                console.error(err)
            }
        })
    },
    getAdminNumber() {
        wx.cloud.callFunction({
            name: "getAdminNumber",
            data: {
                skip: this.data.adminNumber.length,
                isAdmin: true
            },
            success: (res) => {
                // console.log(res)
                this.setData({
                    adminNumber: this.data.adminNumber.concat(res.result.data)
                })
            },
            fail: (err) => {
                console.error(err)
            }
        })

    },
    delAdmin(e) {
        //console.log(e.target.dataset.id)
        wx.cloud.callFunction({
            name: 'updataAdmin',
            data: {
                id: e.target.dataset.id,
                isAdmin: false
            },
            success: (res) => {

                let that = this;
                that.setData({
                    adminNumber: [],
                    WMNumber: [],
                    adminCount: '',
                    WMCount: ''
                })
                that.onLoad();
            },
            fail: (err) => {
                console.error(err)
            }
        })
    },
    addAdmin(e) {
        //console.log(e.target.dataset.id)
        wx.cloud.callFunction({
            name: 'updataAdmin',
            data: {
                id: e.target.dataset.id,
                isAdmin: true
            },
            success: (res) => {

                let that = this;
                that.setData({
                    adminNumber: [],
                    WMNumber: [],
                    adminCount: '',
                    WMCount: ''
                })
                that.onLoad();

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
        this.getAdminNumber();
        this.getWMNuber();
        this.getAdminCount();
        this.getWMCount();
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
            adminNumber: [],
            WMNumber: [],
            adminCount: '',
            WMCount: ''
        })
        that.onLoad();

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.adminCount != this.data.adminNumber.length) {
            this.getWMNuber();
            this.getWMCount();
        }

        if (this.data.WMCount != this.data.WMNumber.length) {
            this.getWMNuber();
            this.getAdminCount();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})