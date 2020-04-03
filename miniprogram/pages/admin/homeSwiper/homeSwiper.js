// pages/admin/homeSwiper/homeSwiper.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgList: [],
        fileIds: [],
    },
    ViewImage(e) {
        wx.previewImage({
            urls: this.data.imgList,
            current: e.currentTarget.dataset.url
        });
    },
    ChooseImage() {
        wx.chooseImage({
            count: 8, //默认9
            sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], //从相册选择
            success: (res) => {
                if (this.data.imgList.length != 0) {
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        imgList: res.tempFilePaths
                    })
                }
            }
        });
    },
    DelImg(e) {
        wx.showModal({
            title: '提示',
            content: '确定要删除这张照片？',
            cancelText: '否',
            confirmText: '是',
            success: res => {
                if (res.confirm) {
                    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
                    this.setData({
                        imgList: this.data.imgList
                    })
                }
            }
        })
    },
    submit() {
        wx.showLoading({
            title: '提交中',
        })
        //  console.log(this.data.imgList);
        const promiseArr = [];
        let suffix = /\.[^\.]+$/.exec(this.data.imgList)[0];
        for (let i = 0; i < this.data.imgList.length; i++) {
            promiseArr.push(new Promise((resolve, reject) => {
                let item = this.data.imgList[i];
                //console.log(suffix)
                // 上传图片
                wx.cloud.uploadFile({
                    cloudPath: 'homeSwiper/' + new Date().getTime() + Math.floor(Math.random() * 1000) + suffix, // 上传至云端的路径
                    filePath: item, // 小程序临时文件路径
                    success: res => {
                        // 返回文件 ID
                        //console.log(res.fileID)
                        this.setData({
                            fileIds: this.data.fileIds.concat(res.fileID)
                        });
                        resolve();
                    },
                    fail: err => {
                        console.error
                        reject();
                    }
                })
            }));

        }
        Promise.all(promiseArr).then(res => {
            wx.cloud.callFunction({
                name: "updateHomeSwiper",
                data: {
                    url: this.data.fileIds
                },
                success: (res) => {
                    //console.log(res)
                    wx.hideLoading({
                        complete: (res) => {},
                    })
                    wx.showModal({
                        title: 'success',
                        content: '更新成功',
                    })

                    this.setData({
                            imgList: []
                        }),
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 2000)

                },
                fail: (err) => {
                    console.error(err)
                }
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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