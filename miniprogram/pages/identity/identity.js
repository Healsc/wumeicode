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


    PickerChange(e) {
        //console.log(e);
     
        this.setData({
            index: e.detail.value,
        })
        //console.log(this.data.picker[this.data.index])
    },
    PickerChange2(e) {
        console.log(e);
        this.setData({
            index2: e.detail.value,
            
        })
        //console.log(this.data.picker2[this.data.index2])
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
                    //console.log(this.data.userInfo)
                }

            })
        } else {
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
                                _name: this.data.userInfo.name,
                                _sex: this.data.userInfo.sex,
                                _studentNumber: this.data.userInfo.studentNumber,
                                _academy: this.data.userInfo.academy,
                                _major: this.data.userInfo.major,
                                _adjust: this.data.userInfo.adjust,
                                _phone: this.data.userInfo.phone,
                                _department1: this.data.picker[this.data.index],
                                _department2: this.data.picker2[this.data.index2],
                                _time: this.data.time,
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
        console.log("当前时间：" + Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s);
    }
})



 

/*校验姓名是否中文名称组成 */
function ischina(str) {
    var reg = /^[\u4E00-\u9FA5]{2,4}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}

/*校验是否全由8位数字组成 */
function isStudentNo(str) {
    var reg = /^[012][0123456789][1][89]\d{4} $/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}
//console.log(isStudentNo("07190472"))
function isSNo(str) {
    var reg = /^(1[3584]\d{9})$/;
    return reg.test(str);     /*进行验证*/
}

//console.log(isSNo("15636214551"));
//conosle.log(isSNo("A07170472"));
/*校验电话码格式 */
function isTelCode(str) {
    var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    return reg.test(str);
} 

