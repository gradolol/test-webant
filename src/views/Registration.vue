<template>
  <auth-layout>
    <div class="card auth-form">
      <div class="card-content">
        <div class="card-title">Зарегистрироваться</div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="Полное имя" prop="fullname">
            <el-input type="text" v-model="ruleForm.fullname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Логин" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="E-mail" prop="email">
            <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Телефон" prop="phone">
            <el-input type="tel" v-model="ruleForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Пароль" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Повторите пароль" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="$router.push('/login')">Назад</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">Зарегистрироваться</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </auth-layout>
</template>

<script>
import axios from 'axios'
export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value !== this.ruleForm.password) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          fullname: '',
          username: '',
          email: '',
          phone: '',
          password: '',
          checkPass: '',
        },
        rules: {
          fullname: [
            { required: true, trugger: 'blur' }
          ],
          username: [
            { required: true, trugger: 'blur' }
          ],
          email: [
            { required: true, trugger: 'blur' }
          ],
          phone: [
            { required: true, trugger: 'blur' }
          ],
          password: [
            { required: true, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/api/users', this.ruleForm).then((response) => {
              this.$message.success('Вы успешно зарегистрировались!');
              this.$router.push('/login')
            }).catch(e => {
              this.$notify.error({
                title: 'Ошибка',
                message: e
              })
            })
          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
.auth-form {
  min-width: 400px;

  label {
    word-wrap: none;
  }

  .input-field {
    margin-bottom: 2rem;
  }

  .card-title {
    margin-bottom: 2rem;
    text-align: center;
  }

  .btn-group {
    display: flex;
    justify-content: space-between;
  }

}
</style>