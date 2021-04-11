// 引入工具类
import request from '@/utils/request'

export default {
    getHospSetList(current, limit, searchObj) {
        return request({
            // 条件查询带分页接口
            url: `/admin/hosp/hospitalSet/findPage/${current}/${limit}`,
            method: 'post',
            // 使用JSON形式进行传递
            data: searchObj
        })
    }
}