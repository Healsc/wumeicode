const app = getApp();

Page({
    data: {
        userInfo: {},
        index: null,
        picker: ['办公室', '技术部', '宣传部', '干训部', '纪检部', '外勤部'],
    },
  
    PickerChange(e) {
        console.log(e);
        this.setData({
            index: e.detail.value
        })
    },
    //表单   //验证 提交到数据库
    formSubmit(e) {
        this.setData({
            userInfo: e.detail.value,
        })
        if (this.data.userInfo.name == "" || this.data.userInfo.sex == "" || this.data.userInfo.studentNumber == "" || this.data.userInfo.academy == "" || this.data.userInfo.mahor == "") {
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
                }

            })
        }
    },

})