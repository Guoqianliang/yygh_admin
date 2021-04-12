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
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <el-button type="danger" @click="removeRows()" icon="el-icon-delete"
        >批量删除</el-button
      >
    </el-form>
    <!-- 批量删除按钮 -->

    <!-- 医院设置列表 -->
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
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
      <!-- 删除列 -->
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == 1"
            type="info"
            size="mini"
            icon="el-icon-lock"
            @click="lockHospSet(scope.row.id, 0)"
            >锁定
          </el-button>

          <el-button
            type="warning"
            v-if="scope.row.status == 0"
            size="mini"
            icon="el-icon-unlock"
            @click="lockHospSet(scope.row.id, 1)"
            >解锁
          </el-button>

          <router-link :to="'/hospSet/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          </router-link>

          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除
          </el-button>
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
      // 当前页、每页记录数、条件封装对象、每页数据集合、总记录数、已选择的复选框的记录列表
      current: 1,
      limit: 3,
      searchObj: {},
      list: [],
      total: 0,
      multipleSelection: [],
    };
  },
  created() {
    // 调用methods中定义的方法,得到数据
    this.getList();
  },
  methods: {
    // 定义具体方法,进行请求接口的调用

    /**
     * 锁定和解锁
     */
    lockHospSet(id, status) {
      hospset.lockHospSet(id, status).then((response) => {
        this.getList();
      });
    },
    /**
     * 获取已选择的复选框的id值
     */
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    /**
     * 删除多条记录
     */
    removeRows() {
      this.$confirm("此操作将永久删除医院设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定执行then()方法
        // 遍历数组中的值，放入idList数组中
        var idList = [];
        this.multipleSelection.forEach((element) => {
          idList.push(element.id);
        });
        // 调用接口
        hospset.batchRemoveHospSet(idList).then((response) => {
          // 1.提示成功
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 2.刷新页面
          this.getList(1);
        });
      });
    },

    /**
     * 医院设置列表
     */
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
    /**
     * 删除单条记录
     */
    removeDataById(id) {
      this.$confirm("此操作将永久删除医院设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定执行then()方法
        hospset.deleteHospSet(id).then((response) => {
          // 1.提示成功
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 2.刷新页面
          this.getList(1);
        });
      });
    },
  },
};
</script>