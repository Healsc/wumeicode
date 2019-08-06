// pages/wumei/classdetail/classdetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        departmentId:"",
        weekId:'',
        classInfo: [], 
        Mon1List: [], Mon2List: [], Mon3List: [], Mon4List: [],
        Tue1List: [], Tue2List: [], Tue3List: [], Tue4List: [],
        Wed1List: [], Wed2List: [], Wed3List: [], Wed4List: [],
        Thu1List: [], Thu2List: [], Thu3List: [], Thu4List: [],
        Fri1List: [], Fri2List: [], Fri3List: [], Fri4List: [],
        ListIndex:1,
        testMon1:[],
        listData: [
            { "code": "01", "text": "text1", "type": "type1" },
            { "code": "02", "text": "text2", "type": "type2" },
            { "code": "03", "text": "text3", "type": "type3" },
            { "code": "04", "text": "text4", "type": "type4" }       
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            departmentId: options.departmentId,
            weekId:options.weekId
        })
        const db = wx.cloud.database({
            env: 'wumei-test-37e2a6'
        })
        db.collection('class-week-' + this.data.weekId).where({
            _department: this.data.departmentId  
        }).get({
            success: (res) => {
                this.setData({
                    classInfo: res.data
                })
               
                this.setList();
                
                /* console.log("Mon1List", this.data.Mon1List)
                console.log("Mon2List", this.data.Mon2List)
                console.log("Mon3List", this.data.Mon3List)
                console.log("Mon4List", this.data.Mon4List)

                console.log("Tue1List", this.data.Tue1List)
                console.log("Tue2List", this.data.Tue2List)
                console.log("Tue3List", this.data.Tue3List)
                console.log("Tue4List", this.data.Tue4List)

                console.log("Wed1List", this.data.Wed1List)
                console.log("Wed2List", this.data.Wed2List)
                console.log("Wed3List", this.data.Wed3List)
                console.log("Wed4List", this.data.Wed4List)

                console.log("Thu1List", this.data.Thu1List)
                console.log("Thu2List", this.data.Thu2List)
                console.log("Thu3List", this.data.Thu3List)
                console.log("Thu4List", this.data.Thu4List)

                console.log("Fri1List", this.data.Fri1List)
                console.log("Fri2List", this.data.Fri2List)
                console.log("Fri3List", this.data.Fri3List)
                console.log("Fri4List", this.data.Fri4List) */
            },
            fail: (res) => {
                wx.showModal({
                    title: '提示',
                    content: '请刷新',
                })
            }         
        }) 
    },
    setList:function(){     
        var classInfoLen = this.data.classInfo.length;
        for (let i = 0; i < classInfoLen;i++){
           
            /* 周一开始 */
            if (this.data.classInfo[i]._Mon1 == "无课") {
                this.setData({
                    Mon1List: this.data.Mon1List.concat(this.data.classInfo[i]._name)
                })
            }
            if (this.data.classInfo[i]._Mon2 == "无课") {
                this.setData({
                    Mon2List: this.data.Mon2List.concat(this.data.classInfo[i]._name)
                })
            }
            if (this.data.classInfo[i]._Mon3 == "无课") {
                this.setData({
                    Mon3List: this.data.Mon3List.concat(this.data.classInfo[i]._name)
                })
            }
            if (this.data.classInfo[i]._Mon4 == "无课") {
                this.setData({
                    Mon4List: this.data.Mon4List.concat(this.data.classInfo[i]._name)
                }) 
            }
            /* 周一结束 */
           
           /* 周二开始 */

            if (this.data.classInfo[i]._Tue1 == "无课") {
                this.setData({
                    Tue1List: this.data.Tue1List.concat(this.data.classInfo[i]._name)
                })
            }
            if (this.data.classInfo[i]._Tue2 == "无课") {
                this.setData({
                    Tue2List: this.data.Tue2List.concat(this.data.classInfo[i]._name)
                })

            }
            if (this.data.classInfo[i]._Tue3 == "无课") {
                this.setData({
                    Tue3List: this.data.Tue3List.concat(this.data.classInfo[i]._name)
                })

            }
            if (this.data.classInfo[i]._Tue4 == "无课") {
                this.setData({
                    Tue4List: this.data.Tue4List.concat(this.data.classInfo[i]._name)
                })
              
            }
           /* 周二结束 */

            /* 周三开始 */
            if (this.data.classInfo[i]._Wed1 == "无课") {
                this.setData({
                    Wed1List: this.data.Wed1List.concat(this.data.classInfo[i]._name)
                })          
            }
            if (this.data.classInfo[i]._Wed2 == "无课") {
                this.setData({
                    Wed2List: this.data.Wed2List.concat(this.data.classInfo[i]._name)
                })

            }
            if (this.data.classInfo[i]._Wed3 == "无课") {
                this.setData({
                    Wed3List: this.data.Wed3List.concat(this.data.classInfo[i]._name)
                })

            }
            if (this.data.classInfo[i]._Wed4 == "无课") {
                this.setData({
                    Wed4List: this.data.Wed4List.concat(this.data.classInfo[i]._name)
                })
               
            }
            /* 周三结束 */

            /* 周四开始 */
            if (this.data.classInfo[i]._Thu1 == "无课") {
                this.setData({
                    Thu1List: this.data.Thu1List.concat(this.data.classInfo[i]._name)
                })
            }
            if (this.data.classInfo[i]._Thu2 == "无课") {
                this.setData({
                    Thu2List: this.data.Thu2List.concat(this.data.classInfo[i]._name)
                })
            }
            if (this.data.classInfo[i]._Thu3 == "无课") {
                this.setData({
                    Thu3List: this.data.Thu3List.concat(this.data.classInfo[i]._name)
                })
            }
            if (this.data.classInfo[i]._Thu4 == "无课") {
                this.setData({
                    Thu4List: this.data.Thu4List.concat(this.data.classInfo[i]._name)
                })

            }
            /* 周四结束 */
            /* 周五开始 */
            if (this.data.classInfo[i]._Fri1 == "无课") {
                this.setData({
                    Fri1List: this.data.Fri1List.concat(this.data.classInfo[i]._name)
                })
            }
            if (this.data.classInfo[i]._Fri2 == "无课") {
                this.setData({
                    Fri2List: this.data.Fri2List.concat(this.data.classInfo[i]._name)
                })
            }
            if (this.data.classInfo[i]._Fri3 == "无课") {
                this.setData({
                    Fri3List: this.data.Fri3List.concat(this.data.classInfo[i]._name)
                })
            }
            if (this.data.classInfo[i]._Fri4 == "无课") {
                this.setData({
                    Fri4List: this.data.Fri4List.concat(this.data.classInfo[i]._name)
                })
            }
            /* 周五结束 */
        }
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