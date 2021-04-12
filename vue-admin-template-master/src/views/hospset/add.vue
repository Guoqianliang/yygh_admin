<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname" />
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode" />
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl" />
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName" />
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import hospset from "@/api/hospset";

export default {
  data() {
    return {
      // 定义一个对象,封装接收到的值
      hospitalSet: {},
    };
  },
  created() {
    //根据路由中的id值判断是去修改页面还是去添加页面
    if (this.$route.params && this.$route.params.id) {
      // 如果是修改页面,就调用接口获得医院设置信息
      const id = this.$route.params.id;
      this.getHospSet(id);
    } else {
      // 如果是添加页面,就将表单数据清空
      this.hospitalSet = {};
    }
  },
  methods: {
    // 根据id查询
    getHospSet(id) {
      hospset.getHospSet(id).then((response) => {
        this.hospitalSet = response.data;
      });
    },

    // 添加
    save() {
      hospset.saveHospSet(this.hospitalSet).then((response) => {
        // 1.提示成功
        this.$message({
          type: "success",
          message: "保存成功!",
        });
        // 2.路由跳转到列表页面
        this.$router.push({ path: "/hospSet/list" });
      });
    },
    // 修改
    update() {
      hospset.updateHospSet(this.hospitalSet).then((response) => {
        // 1.提示成功
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        // 2.路由跳转到列表页面
        this.$router.push({ path: "/hospSet/list" });
      });
    },
    saveOrUpdate() {
      if (!this.hospitalSet.id) {
        // 添加操作
        this.save();
      } else {
        // 修改操作
        this.update();
      }
    },
  },
};
</script>