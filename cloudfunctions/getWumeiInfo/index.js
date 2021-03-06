// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    return await db.collection('wumeiInfo').orderBy('_time','desc').where({
        _isWM:event.isWM
    }).skip(event.skip).limit(10).get()
}