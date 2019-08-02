Page({
    data: {
        listData: [
            { "code": "一大", "one": "一1", "two": "二1", "three": "三1", "four": "四1", "five": "五1"},
            { "code": "二大", "one": "一2", "two": "二2", "three": "三2", "four": "四2", "five": "五2"},
            { "code": "三大", "one": "一3", "two": "二3", "three": "三3", "four": "四3", "five": "五3"},
            { "code": "四大", "one": "一4", "two": "二4", "three": "三4", "four": "四4", "five": "五4"}
        ]
    },
    onLoad: function () {
        console.log('onLoad')
    },
    change(e){
        console.log(e)
        console.log(this.data.listData)
    },
    formSubmit(e){
        console.log(e.detail.value)
    },
    formReset() {
        console.log('form发生了reset事件')
    },
    
})