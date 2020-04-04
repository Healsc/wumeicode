// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    return await db.collection('dahuo').orderBy('_createTime', 'desc').skip(event.skip).limit(10).get()
}