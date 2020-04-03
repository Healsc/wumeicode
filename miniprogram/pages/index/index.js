const app = getApp();

Page({
    data: {
        openid: '',
        showList: [],
        iconList: [{
                icon: 'cardboardfill',
                color: 'orange',
                name: '办公室',
                id:"bangongshi"
            }, {
                icon: 'discoverfill',
                color: 'yellow',
                name: '技术部',
                id:"jishubu"
            }, {
                icon: 'news',
                color: 'olive',
                name: '干训部',
                id:"ganxunbu"
            }, {
                icon: 'picfill',
                color: 'green',
                name: '宣传部',
                id:"xuanchuanbu"
            }, {
                icon: 'likefill',
                color: 'red',
                name: '舞美',
                id:"wumei"
            },
            {
                icon: 'upstagefill',
                color: 'blue',
                name: '纪检部',
                id:"jijianbu"
            }, {
                icon: 'choiceness',
                color: 'mauve',
                name: '外勤部',
                id:"waiqinbu"
            }
        ],
        bumenId: "",
        noticeInfo: [],
        noticeList: []
    },
    onLoad: function (options) {
        this.getOpenid();
        this.getImagesList();
        //this.upLoadNoticeInfo();
        this.getNoticeList();
    },
    goNoticeList() {
        wx.navigateTo({
            url: '/pages/info/noticeList/noticeList',
        })
    },
    // 获取用户openid
    getOpenid() {
        let that = this;
        wx.cloud.callFunction({
            name: 'login',
            complete: res => {
                var openid = res.result.openid;
                that.setData({
                    openid: openid
                })
            }
        })
    },

    //跳转到报名信息页面 已提交报名信息跳转到已经提交的信息
    goIdentity() {
        const db = wx.cloud.database({
            // env: 'wumei-2070bb'
        })
        db.collection('naxinInfo').where({
            _openid: this.data.openid // 填入当前用户 openid
        }).get({
            success: (res) => {
                //console.log(res.data.length)
                //console.log(this.data.openid)
                //数据库返回来的是一个数组 使用数组长度判断跳转
                if (res.data.length) {
                    wx.navigateTo({
                        url: '/pages/baominginfo/baominginfo',
                    })
                } else {
                    wx.navigateTo({
                        url: '/pages/identity/identity',
                    })
                }
            }
        })
    },

    getImagesList(e) {
        const db = wx.cloud.database({
            //env: 'wumei-2070bb'
        })
        db.collection('home-swiper-images').doc('4ac6beb8-eba6-4ddf-8899-5661a0b13557').get({
            success: res => {
                //console.log(res)
                //这一步很重要，给classInfo赋值，没有这一步的话，前台就不会显示值      
                this.setData({
                    showList: res.data._url
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
    showQrcode() {
        wx.previewImage({
            urls: ['cloud://wumei-test-37e2a6.7775-wumei-test-37e2a6/gongzhonghao.png'],
            current: 'cloud://wumei-test-37e2a6.7775-wumei-test-37e2a6/gongzhonghao.png' // 当前显示图片的http链接      
        })
    },
    getNoticeList() {
        const db = wx.cloud.database();
        db.collection('notice').orderBy('_createTime', 'desc').limit(6).get().then(res => {
            //console.log(res)
            this.setData({
                noticeList: res.data
            })
        }).catch(err => {
            console.error(err)
            wx.showModal({
                title: '提示',
                content: '请刷新',
            })
        })
    },
    goToDetail(e) {
        console.log(1)
        console.log(e.target.dataset.id)
        wx.navigateTo({
            url: '/pages/info/noticeDetail/noticeDetail?id=' + e.target.dataset.id,
        })
    },
    onPullDownRefresh: function () {
        this.onLoad();
    },
    onShareAppMessage: function () {
       
        return {
            title: '东农舞美',
            path:  "/pages/index/index"
        }
    }
})