const app = getApp();

Page({
    data: {
        userInfo: {},
        naxinInfo:{},
        index: null,
        index2:null,
        name:"",
        picker: ['办公室', '技术部', '宣传部', '干训部', '纪检部', '外勤部'],
        picker2: ['办公室', '技术部', '宣传部', '干训部', '纪检部', '外勤部'],
        time:null
    },

    onLoad: function (options) {

    },
    /*检验中文 */
    ischina(str) {
        var reg = /^[\u4E00-\u9FA5]{2,4}$/;   /*定义验证表达式*/
        return reg.test(str);     /*进行验证*/
    },
    /*校验学号 */
    isSNo(str) {
        var reg = /^(A([012]\d{1}[1][9]\d{4}))$/;
        return reg.test(str);     /*进行验证*/
    },

    isTelCode(str) {
        var reg = /^(1[356789]\d{9})$/;
        return reg.test(str);
    },
    PickerChange(e) {
        this.setData({
            index: e.detail.value,
        })
    },
    PickerChange2(e) {
        //console.log(e);
        this.setData({
            index2: e.detail.value,
            
        })
    },
    //表单   //验证 提交到数据库
    formSubmit(e) {
        this.setData({
            userInfo: e.detail.value,
        })
        if (this.data.userInfo.name == "" || this.data.userInfo.sex == "" || this.data.userInfo.studentNumber == "" || this.data.userInfo.academy == "" || this.data.userInfo.major == "" || this.data.userInfo.phone == "") {
            wx.showModal({
                title: '',
                content: '信息不完整',
                cancelText: '退出',
                confirmText: '继续',
                success: res => {
                }

            })
        } else if (!this.ischina(this.data.userInfo.name)){
            wx.showModal({
                title: '',
                content: '姓名有误！',
                cancelText: '退出',
                confirmText: '继续',
            })
        } else if (!this.isSNo(this.data.userInfo.studentNumber)){
            wx.showModal({
                title: '',
                content: '学号有误！',
                cancelText: '退出',
                confirmText: '继续',
            })
        } else if (!this.ischina(this.data.userInfo.academy)){
            wx.showModal({
                title: '',
                content: '学院有误！',
                cancelText: '退出',
                confirmText: '继续',
            })
        } else if (!this.isTelCode(this.data.userInfo.phone)) {
            wx.showModal({
                title: '',
                content: '手机号有误！',
                cancelText: '退出',
                confirmText: '继续',
            })
        }  else {
            wx.showModal({
                title: '',
                content: '确定提交信息',
                cancelText: '否',
                confirmText: '是',
                success: res => {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        this.setData({
                            //设置时间 数据库增加个time字段为提交时间
                            time: this.getDate()
                        })
                        const db = wx.cloud.database({
                            env: 'wumei-test-37e2a6'
                        })
                        const naxinInfo = db.collection('naxinInfo')
                        db.collection('naxinInfo').add({
                            // data 字段表示需新增的 JSON 数据
                            data: {
                                // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                                _name: this.data.userInfo.name,//姓名
                                _sex: this.data.userInfo.sex,//性别
                                _studentNumber: this.data.userInfo.studentNumber,//学号
                                _academy: this.data.userInfo.academy,//学院
                                _major: this.data.userInfo.major,//专业
                                _adjust: this.data.userInfo.adjust,//调剂
                                _phone: this.data.userInfo.phone,//联系方式
                                _department1: this.data.picker[this.data.index],//部门一
                                _department2: this.data.picker2[this.data.index2],//部门二
                                _time: this.data.time,//提交时间
                            },
                            success: function (res) {
                                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                                wx.showToast({
                                    title: '成功',
                                    icon: 'success',
                                    duration: 3000
                                })

                            },
                            complete: function (res) {
                                wx.redirectTo({
                                    //前面加/ 绝对路径 否则报错
                                    url: '/pages/baominginfo/baominginfo'
                                })
                                console.log("complete 跳转到显示所填写信息")
                            }
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                }
            })
        }
    },
    /*校验姓名是否中文名称组成 */



    //获取系统时间
    getDate() {
        var date = new Date();
        //年
        var Y = date.getFullYear();
        //月
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        //日
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        //时
        var h = date.getHours();
        //分
        var m = date.getMinutes();
        //秒
        var s = date.getSeconds();
        return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
    }
})



 



