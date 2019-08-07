const app = getApp();

Page({
    data: {
        openid: '',
        showList:[],
        iconList: [{
            icon: 'cardboardfill',
            color: 'red',
            name: '办公室'
        }, {
            icon: 'discoverfill',
            color: 'orange',
            name: '技术部'
        }, {
            icon: 'news',
            color: 'yellow',
            name: '干训部'
            }, {    
            icon: 'picfill',
            color: 'olive',
            name: '宣传部'
        }, {
            icon: 'upstagefill',
            color: 'cyan',
            name: '纪检部'
        }, {
            icon: 'choiceness',
            color: 'blue',
            name: '外勤部'
        }],
        bumenId:""
    },
    onLoad: function (options) {
        this.getOpenid();
        this.getImagesList();
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
                console.log(this.data.openid)
            }
        })
    },
 
    //跳转到报名信息页面 已提交报名信息跳转到已经提交的信息
    goIdentity(){
        const db = wx.cloud.database({
            env: 'wumei-test-37e2a6'
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
            env: 'wumei-test-37e2a6'
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
})