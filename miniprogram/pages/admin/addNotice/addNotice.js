const db = wx.cloud.database();
Page({
  data: {
    formats: {},
    readOnly: false,
    placeholder: '需要输入标题(H2) 需要输入标题(H2)需要输入标题(H2)。。。第一行：左对齐、居中对齐、右对齐、H2、H3、H4。。。第二行：照片、分割线、时间、加粗、斜体、下划线。。。第三行：首行缩进、复选框、有序列表、无序列表、清除格式、清除内容',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    result: "",
    content: "",
    title: "",
    time: ""
  },
  getTitle(e) {
   // console.log(e.detail)
    this.setData({
      title: e.detail.value
    })
  },
  getTime(e) {
    this.setData({
      time: e.detail.value
    })
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({
      isIOS
    })
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const {
      windowHeight,
      platform
    } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({
      editorHeight,
      keyboardHeight
    })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const {
      statusBarHeight,
      platform
    } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  /* 缩进 */
  indent() {
    this.editorCtx.format('textIndent', '2em')
  },
  format(e) {
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats
    })
  },

  /* 分割线 */
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  /* 清除内容 */
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },

  /* 清除当前选区的样式 */
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  /* 插入时间 */
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },

  /* 插入图片 */
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        /* that.editorCtx.insertImage({
            src: res.tempFilePaths.length,
            data: {
              id: 'abcd',
              role: 'god'
            },
            width: '100%',
            success: function () {
              console.log('insert image success')
            }
          }), */
        let suffix = /\.[^\.]+$/.exec(res.tempFilePaths)[0];
        wx.cloud.uploadFile({
          cloudPath: 'notice/' + that.data.title + new Date().getTime() + suffix, // 上传至云端的路径
          filePath: res.tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            that.editorCtx.insertImage({
              src: res.fileID,
              data: {
                id: 'abcd',
                role: 'god'
              },
              width: '100%',
              success: function () {
                console.log('insert image success')
              }
            })

            // 返回文件 ID
            console.log(res.fileID)
          },
          fail: console.error
        })
      }
    })
  },


  /* 获取内容 */
  clickLogText(e) {
    const that = this;
    that.editorCtx.getContents({
      success: function (res) {
        db.collection('notice').add({
          data: {
            _createTime: new Date(),
            _title: that.data.title,
            _time: that.data.time,
            _content: res.html,
            _isShow: true
          }
        }).then(res => {
          wx.showToast({
            title: '发布成功',
            icon: "succsee",
            duration: 1000
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/admin/noticeList/noticeList',
            })
          }, 1500)
          that.clear();
          that.setData({
            title:"",
            time:""
          })
        }).catch(err => {
          console.error(err)
        })
        wx.setStorageSync("content", res.html); // 缓存本地
      }
    })
  }
})