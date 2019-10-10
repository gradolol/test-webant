<template>
  <auth-layout>
    <div class="card auth-form">
      <div class="card-content">
        <div class="card-title">Войти</div>
        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="120px" class="ruleForm" :rules="rules">
          <el-form-item label="Логин" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Пароль" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="$router.push('/registration')">Зарегистрироваться</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">Войти</el-button>
          </el-form-item>
        </el-form>
        <router-link to="/">Войти как гость</router-link>
      </div>
    </div>
  </auth-layout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, trigger: 'blur' }
          ],
          password: [
            { required: true, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      ...mapActions({
        makeAuth: 'AUTHORIZATION'
      }),
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            try{
              await this.makeAuth({
                grant_type: 'password',
                ...this.ruleForm,
              });
              this.$router.push('/');
            } catch(e) {
              this.$notify.error({
                  title: 'Ошибка!',
                  message: e
                });
            }
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