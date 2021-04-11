<template>
  <div class="app-container">
    <!-- 条件查询 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
    </el-form>

    <!-- 医院设置列表 -->
    <el-table :data="list" stripe="true" style="width: 100%">
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="hoscode" label="医院编号" />
      <el-table-column prop="apiUrl" label="api基础路径" width="200" />
      <el-table-column prop="contactsName" label="联系人姓名" />
      <el-table-column prop="contactsPhone" label="联系人手机" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
// 引入接口定义的JS文件
import hospset from "@/api/hospset";
export default {
  data() {
    // 定义变量和初始值
    return {
      // 当前页、每页记录数、条件封装对象、每页数据集合、总记录数
      current: 1,
      limit: 3,
      searchObj: {},
      list: [],
      total: 0,
    };
  },
  created() {
    // 调用methods中定义的方法,得到数据
    this.getList();
  },
  methods: {
    // 定义具体方法,进行请求接口的调用

    // 医院设置列表
    getList(page = 1) {
      // page是当前页的参数
      this.current = page;
      hospset
        .getHospSetList(this.current, this.limit, this.searchObj)
        // 请求成功
        .then((response) => {
          // response是接口返回的数据
          this.list = response.data.records;
          this.total = response.data.total;
        })
        // 请求失败
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>