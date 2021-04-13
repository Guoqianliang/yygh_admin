// 引入工具类
import request from '@/utils/request'
/**
 * 定义医院设置接口路径
 */
export default {
    // 医院设置列表
    getHospSetList(current, limit, searchObj) {
        return request({
            // 条件查询带分页接口
            url: `/admin/hosp/hospitalSet/findPage/${current}/${limit}`,
            method: 'post',
            // 使用JSON形式进行传递
            data: searchObj
        })
    },
    // 删除医院设置
    deleteHospSet(id) {
        return request({
            url: `/admin/hosp/hospitalSet/${id}`,
            method: 'delete'
        })
    },
    // 批量删除
    batchRemoveHospSet(idList) {
        return request({
            url: `/admin/hosp/hospitalSet/batchRemove`,
            method: 'delete',
            data: idList
        })
    },
    // 锁定和取消锁定
    lockHospSet(id, status) {
        return request({
            url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
            method: 'put'
        })
    },
    // 添加医院设置
    saveHospSet(hospitalSet) {
        return request({
            url: `/admin/hosp/hospitalSet/saveHospitalSet`,
            method: 'post',
            data: hospitalSet
        })
    },
    // 根据id查询医院设置
    getHospSet(id) {
        return request({
            url: `/admin/hosp/hospitalSet/HospitalSet/${id}`,
            method: 'get'
        })
    },
    // 更新医院设置记录
    updateHospSet(hospitalSet) {
        return request({
            url: `/admin/hosp/hospitalSet/updateHospitalSet`,
            method: 'post',
            data: hospitalSet
        })
    },
}