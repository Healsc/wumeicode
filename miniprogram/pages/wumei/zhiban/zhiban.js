// pages/wumei/zhiban/zhiban.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        images:[],
        fileIds:[],
        content:"",
        showList:[],
        isBGS:0
    },
  
    uPLoadImage(){
        // 选择图片
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: res => { // 箭头函数，作用是改变this指向
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                /* console.log(tempFilePaths) */
                this.setData({
                    images: this.data.images.concat(tempFilePaths)
                });
            }
        })
    },
    submit(e){
        wx.showLoading({
            title: '提交中',
        })    
        this.setData({
            content: e.detail.value.content
        })
        // 上传多张图片到云存储
        const promiseArr = [];
        for (let i = 0; i < this.data.images.length; i++) {
            promiseArr.push(new Promise((resolve, reject) => {
                let item = this.data.images[i];
                // 上传图片
                wx.cloud.uploadFile({
                    env: 'wumei-test-37e2a6',
                    cloudPath: new Date().getTime() + '.png', // 上传至云端的路径
                    filePath: item, // 小程序临时文件路径
                    success: res => {
                        // 返回文件 ID
                        this.setData({
                            fileIds: this.data.fileIds.concat(res.fileID)
                        });
                        wx.hideLoading();
                        resolve();
                    },
                    fail: err => {
                        wx.hideLoading();
                        console.error
                        reject();
                    }
                })
            }));

        }
        // 插入到云数据库
        Promise.all(promiseArr).then(res => {
            const db = wx.cloud.database({
                env: 'wumei-test-37e2a6'/* 当前环境ID */
            })
            db.collection('zhibanInfo').add({
                data: {
                    content: this.data.content,
                    fileIds: this.data.fileIds
                }
            }).then(res => {
                wx.showToast({
                    title: '提交成功',
                })
                this.onLoad();
                wx.navigateBack({
                    delta: 1
                })
            }).catch(err => {
                wx.showToast({
                    title: '提交失败',
                })
            })
        }).catch(err => {

        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    upLoadData(e){
        const db = wx.cloud.database({
            env: 'wumei-test-37e2a6'
        })
        db.collection('zhibanInfo').get({
            success: res => {
                //这一步很重要，给classInfo赋值，没有这一步的话，前台就不会显示值      
                this.setData({
                    showList:res.data
                })
                //console.log(this.data.showList)
            },
            fail: (res) => {
                wx.showModal({
                    title: '提示',
                    content: '请刷新',
                })
            }
        })
    },
    isBGS(){
        const db = wx.cloud.database({
            env: 'wumei-test-37e2a6'
        })
        db.collection('wumeiInfo').where({
            _department:"办公室",
            _isBGS:"1"
        }).get({
            success: res => {
                if(res.data.length){
                    this.setData({
                        isBGS: 1
                    })
                }    
                console.log(this.data.isBGS)
            },
            fail: (res) => {
                wx.showModal({
                    title: '提示',
                    content: '请刷新',
                })
            }
        })
    },
    onLoad: function (options) {
        this.upLoadData();
        this.isBGS();
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