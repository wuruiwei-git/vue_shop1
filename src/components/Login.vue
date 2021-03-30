/* eslint-disable eqeqeq */

<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单区域 -->
      <!-- ref是引用 -->
      <el-form
        ref="loginFormRef"
        :rules="loginFormRules"
        :model="loginFrom"
        label-width="0px"
        class="login_from"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginFrom.username" prefix-icon="iconfont  icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginFrom.password"
            prefix-icon="iconfont icon-lock_fill"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginFrom: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法。
        username: [{ required: true, message: '请输入登录名', trigger: 'blur' },
        {
          min: 3,
          max: 10,
          message: '登录名长度在 3 到 10 个字符',
          trigger: 'blur'
        }],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '密码长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  // 事件函数
  methods: {
    resetLoginFrom () {
      // ref引用中设置一个属性方便得到form表单
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      console.log(11)
      // 对表单进行预验证 对loginFormRules里的条件进行验证 valid是一个布尔值
      this.$refs.loginFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        // 第一个请求地址，第二个请求参数
        // 发起请求时候需要将api接口中的数据库文件中app.js与phpstudy进行启动

        // 解构出这个请求函数内的data内容 ，从命名为res
        const { data: res } = await this.$http.post('login', this.loginFrom)
        // promise出现的目的是解决Node.js异步编程中回调地域的问题
        // 在普通函数定义的前面加上async关键字普通函数就变成了异步
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // 1、登录成功之后，需要将后台返回的token保存到sessionStorage中
        //    1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
        //    1.2token只应在当前网站打开期间生效，所以将token保存seeionStorange中
        window.sessionStorage.setItem('token', res.data.token)
        // 2、通过编程式导航跳转到后台主页，路由地址/home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b5b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
