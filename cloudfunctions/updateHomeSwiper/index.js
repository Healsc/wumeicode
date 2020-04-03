// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
 
    return await db.collection('home-swiper-images').doc('4ac6beb8-eba6-4ddf-8899-5661a0b13557').update({
        data:{
            _url:event.url
        }
    })
}