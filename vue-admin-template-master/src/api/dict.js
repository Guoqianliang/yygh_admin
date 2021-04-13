// 引入工具类
import request from '@/utils/request'
/**
 * 定义数据字典接口路径
 */
export default {
    // 数据字典列表
    dictList(id) {
        return request({
            // 根据id查询子数据列表
            url: `/admin/cmn/dict/findChildData/${id}`,
            method: 'get'
        })
    },
}