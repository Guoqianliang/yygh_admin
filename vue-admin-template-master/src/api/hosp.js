// 引入工具类
import request from '@/utils/request'
/**
 * 定义数据字典接口路径
 */
export default {
    // 医院列表
    getHospList(page, limit, searchObj) {
        return request({
            url: `/admin/hosp/hospital/list/${page}/${limit}`,
            method: 'get',
            params: searchObj
        })
    },
    //根据dictcode查询所有子节点(查询省份)
    findByDictCode(dictCode) {
        return request({
            url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
            method: 'get'
        })
    },
    // 根据数据id查询子数据列表
    findChildId(id) {
        return request({
            url: `/admin/cmn/dict/findChildData/${id}`,
            method: 'get'
        })
    },
    // 更新医院上线状态
    updateStatus(id, status) {
        return request({
            url: `/admin/hosp/hospital/updateHospStatus/${id}/${status}`,
            method: 'get'
        })
    },
}
