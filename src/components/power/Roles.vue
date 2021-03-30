/* eslint-disable vue/no-unused-vars */
/* eslint-disable vue/valid-v-for */
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home'  }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域、 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="dialogVisible=true">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
      <el-table :data="rolelist" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', i1===0 ? 'bdtop' : '' ,'vcenter']"
              v-for="(item1 , i1) in scope.row.children "
              :key="item1.id"
            >
              <!-- 一级渲染 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="t el-icon-caret-right"></i>
              </el-col>
              <!-- 二级列表渲染 -->
              <el-col :span="19">
                <!-- 通过for循环  嵌套渲染二级权限 -->
                <el-row
                  :class="[i2===0 ? '':'bdtop' ,'vcenter']"
                  v-for="(item2 ,i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="t el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(item3) in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 返回的代码结构 -->
            <!-- <pre>{{scope.row}}</pre> -->
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <!-- slot-scope="scope" -->
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="changeDialog(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeEdit(scope.row.id)"
            >删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色区域 -->
    <el-dialog title="添加角色" :visible.sync="dialogVisible" width="50%" @close="ruleClosed">
      <!-- 内容主体区域 -->
      <el-form :model="ruleForm" ref="ruleFormRef" label-width="80px" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="ruleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addjuese">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改角色区域 -->
    <el-dialog title="修改角色" :visible.sync="editVisible" width="50%" @close="editClosed">
      <!-- 内容主体区域 -->
      <el-form :model="editiForm" ref="editFormRef" label-width="80px" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editiForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editiForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限区域 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightDialogClosed"
    >
      <!-- 树形结构控件 -->
      <el-tree
        :data="rightslist"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialo、g-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 所有的角色列表
      rolelist: [],
      // 添加角色显示与影藏
      dialogVisible: false,
      // 保存添加的数据
      ruleForm: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      // 修改角色的显示与隐藏
      editVisible: false,
      // 获取修改的信息
      editiForm: {},
      // 控制分配角色的显示与隐藏
      setRightDialogVisible: false,
      // 所有权限的数据
      rightslist: [],
      // 树形控件属性绑定对象
      treeProps: {
        // 父子节点通过什么嵌套的
        children: 'children',
        // 看到的那个属性对应的值
        label: 'authName'
      },
      // 默认选中节点id值数组
      defKeys: [],
      // 当前即将分配角色的id
      roleId: ''
    }
  },
  created () {
    // 角色列表
    this.getRolesList()
  },
  methods: {
    // 获取所有角色列表
    async getRolesList () {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.err('获取角色列表失败！')
      }
      this.rolelist = res.data
      // console.log(this.rolelist)
    },
    // 添加角色
    addjuese () {
      // console.log(this)
      this.$refs.ruleFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return
        const { data: res } = await this.$http.post('roles', this.ruleForm)
        // console.log(res)
        if (res.meta.status !== 201) {
          this.$message.err('创建角色失败')
        } this.$message.success('添加用户成功')
        // 隐藏用户对话框
        this.dialogVisible = false
        // 从新获取列表数据
        this.getRolesList()
      })
    },
    // 监听对话框关闭事件
    ruleClosed () {
      this.$refs.ruleFormRef.resetFields()
    },
    editClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 用户信息编辑
    async changeDialog (id) {
      // console.log(id)

      this.editVisible = true
      const { data: res } = await this.$http.get('roles/' + id)
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('查询不到该角色')
      }
      this.editiForm = res.data
      // console.log(this.editiForm.roleId)
    },
    // 修改表单提交
    editUser () {
      // 对表单进行预验证
      this.$refs.editFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return
        // 发起修改角色请求
        const { data: res } = await this.$http.put('roles/' + this.editiForm.roleId, { roleName: this.editiForm.roleName, roleDesc: this.editiForm.roleDesc })
        // console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.console.error('更新用户数据失败')
        }
        // 关闭对话框
        this.editVisible = false
        // 从新获取列表数据
        this.getRolesList()
        // 修改角色成功
        this.$message.success('修改用户信息成功！')
      })
    },
    // 删除
    async removeEdit (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      const { data: res } = await this.$http.delete('roles/' + id)
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      this.getRolesList()
    },
    // 根据id删除对应的权限
    async removeRightById (role, rightId) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消了删除')
      }
      const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      // console.log(confirmResult)
      // console.log('确认了删除')
      if (res.meta.status !== 200) {
        return this.$message.error('删除权限失败')
      }
      // 使用从新获取会使列表进行关闭
      // this.getRolesList()
      // 删除后将data的从新赋值给列表
      role.children = res.data
    },
    // 展示分配权限的对话框
    async showSetRightDialog (role) {
      // 获取id将id传入data，后期使用
      this.roleId = role.id
      // 获取所有权限的数据
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限数据失败！')
      }
      // 把获取到的权限数据保存到data中
      this.rightslist = res.data
      // console.log(this.rightslist)
      // 递归获取三级节点id
      this.getLeafKeys(role, this.defKeys)
      this.setRightDialogVisible = true
    },
    // 通过递归形式，获取三级权限下的所有id，并保存到defKeys数组中
    getLeafKeys (node, arr) {
      // 如果当前node节点不包含children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      // node中的子节点进行循环调用递归函数
      node.children.forEach(item => this.getLeafKeys(item, arr))
    },
    // 监听分配权限对话框的关闭事件

    setRightDialogClosed () {
      this.defKeys = []
    },
    // 点击角色分配对象
    async allotRights () {
      const keys = [
        // 被选中的节点的 key 所组成的数组
        ...this.$refs.treeRef.getCheckedKeys(),
        // 半选中的节点的 key 所组成的数组
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      console.log(keys)
      // 将数组转换成为以逗号分割的字符串
      const idStr = keys.join(',')
      console.log(idStr)
      // 需要传入id，需要在点击权限时候将id传入data中
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败！')
      }
      this.$message.success('分配权限成功!')
      // 从新获取数据
      this.getRolesList()
      // 隐藏对话框
      this.setRightDialogVisible = false
    }

  }
}
</script>
<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.bdtop {
  border-top: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
