const app = getApp();

Page({
    data: {
        openid: '',
        showList:[],
        iconList: [{
            icon: 'cardboardfill',
            color: 'orange',
            name: '办公室'
        }, {
            icon: 'discoverfill',
            color: 'yellow',
            name: '技术部'
        }, {
            icon: 'news',
            color: 'olive',
            name: '干训部'
            }, {    
            icon: 'picfill',
            color: 'green',
            name: '宣传部'
        }, {
            icon: 'likefill',
            color: 'red',
            name: '舞美'
            }, 
        {
            icon: 'upstagefill',
            color: 'blue',
            name: '纪检部'
        }, {
            icon: 'choiceness',
            color: 'mauve',
            name: '外勤部'
        }],
        bumenId:"",
        noticeInfo:[]
    },
    onLoad: function (options) {
        this.getOpenid();
        this.getImagesList();
        this.upLoadNoticeInfo();
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
    goIdentity(){
        const db = wx.cloud.database({
            env: 'wumei-2070bb'
        })
        db.collection('naxinInfo').where({
            _openid: this.data.openid // 填入当前用户 openid
        }).get({
            success: (res) => {
                //console.log(res.data.length)
                //console.log(this.data.openid)
                //数据库返回来的是一个数组 使用数组长度判断跳转
                if (res.data.length){
                    wx.navigateTo({
                        url: '/pages/baominginfo/baominginfo',
                    })
               }else{
                    wx.navigateTo({
                        url: '/pages/identity/identity',
                    })
               }
            }
        })  
    },

    getImagesList(e) {
        const db = wx.cloud.database({
            env: 'wumei-2070bb'
        })
        db.collection('home-swiper-images').get({
            success: res => {
                //这一步很重要，给classInfo赋值，没有这一步的话，前台就不会显示值      
                this.setData({
                    showList: res.data
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
    /* 数据库notice */
    upLoadNoticeInfo(){
        const db = wx.cloud.database({
            env: 'wumei-2070bb'
        })
        db.collection('notice-info').orderBy('_order', 'desc')
            .get({
                success:(res) =>{
                    this.setData({
                        noticeInfo:res.data
                    })
                }, 
                fail: (res) => {
                    wx.showModal({
                        title: '提示',
                        content: '请刷新',
                    })
                }
        })
    },
   
})