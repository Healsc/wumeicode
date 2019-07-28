const app = getApp();

Page({
    data: {
        userInfo: {},
        index: null,
        index2:null,
        picker: ['办公室', '技术部', '宣传部', '干训部', '纪检部', '外勤部'],
        picker2: ['办公室', '技术部', '宣传部', '干训部', '纪检部', '外勤部'],
    },
  
    PickerChange(e) {
        console.log(e);
     
        this.setData({
            index: e.detail.value
        })
        console.log(this.data.picker[this.data.index])
    },
    PickerChange2(e) {
        console.log(e);
        this.setData({
            index2: e.detail.value
        })
        console.log(this.data.picker2[this.data.index2])
    },
    //表单   //验证 提交到数据库
    formSubmit(e) {
        this.setData({
            userInfo: e.detail.value,
        })
        if (this.data.userInfo.name == "" || this.data.userInfo.sex == "" || this.data.userInfo.studentNumber == "" || this.data.userInfo.academy == "" || this.data.userInfo.major == "" || this.data.userInfo.phone == "") {
            console.log("信息不完整")
            wx.showModal({
                title: '',
                content: '信息不完整',
                cancelText: '退出',
                confirmText: '继续',
                success: res => {
                    console.log(this.data.userInfo)
                }

            })
        } else {
            wx.showModal({
                title: '',
                content: '确定提交信息',
                cancelText: '否',
                confirmText: '是',
                success: res => {
                    console.log(this.data.userInfo)
                    const db = wx.cloud.database()
                    const todos = db.collection('baomingxinxi')
                    db.collection('baomingxinxi').add({
                        // data 字段表示需新增的 JSON 数据
                        data: {
                            // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                            name: this.data.userInfo.name,
                            sex: this.data.userInfo.sex,
                            studentNumber: this.data.userInfo.studentNumber,
                            academy: this.data.userInfo.academy,
                            major: this.data.userInfo.major, 
                            adjust: this.data.userInfo.adjust,
                            phone: this.data.userInfo.phone,
                            department1: this.data.picker[this.data.index],
                            department2: this.data.picker2[this.data.index2]
                         },
                        success: function (res) {
                            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                            console.log(res)
                        }
                    })
                }

            })
        }
    },

  
})



