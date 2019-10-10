<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item prop="name" label="Название">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Описание" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="Категория">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Новые" name="type"></el-checkbox>
          <el-checkbox label="Популярные" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-upload
        class="upload-demo file"
        ref="upload"
        action="/api/objects"
        :auto-upload="false"
        accept="image"
        :data="form.file"
        :on-change="change"
      >
        <el-button slot="trigger" size="small" type="primary" v-model="form.file">Выбрать файл</el-button>
        <!-- <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div> -->
      </el-upload>
      <el-button type="primary" @click="submitUpload">Загрузить</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'uploadForm',
  data(){
    return {
      form: {
        type: [],
        popular: false,
        new: false,
        name: '',
        desc: '',
        file: {}
      },
      rules: {
        name: [
          { required: true, message: 'Введите название', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: 'Введите описание', trigger: 'blur' }
        ],
      },
      fullscreenLoading: false
    }
  },
  methods: {
    ...mapActions({
      postPhoto: 'POST_PHOTO'
    }),
    submitUpload() {
      this.$refs.form.validate((valid) => {
        this.form.type.forEach( element => {
          if (element == 'Популярные') {
            this.form.popular = true
          }
          if (element == 'Новые') {
            this.form.newBool = true
          }
        })
        if (!this.form.file.raw){
          this.$notify.error({
            title: 'Error',
            message: 'File not loaded'
        })
          return false
        }
        if (!this.form.newBool && !this.form.popular){
          this.$notify.error({
            title: 'Error',
            message: 'Category not entered'
          })
          return false
        }
        if (valid && (this.form.newBool || this.form.popular) && this.form.file.raw) {
          this.fullscreenLoading = true
          this.sendFile();
        }
      })
    },
    change(file){
      this.form.file = file
    },
    async sendFile(){
      try {
        await this.postPhoto({
          ...this.form
        })
        this.fullscreenLoading = false
        this.$message.success('Изображение успешно загружено!')
        this.clearForm()
      } catch (e) {
        this.fullscreenLoading = false;
        this.$notify.error({
          title: 'Ошибка',
          message: e
        })
      }
    },
    clearForm() {
      this.form.type = []
      this.form.name = ''
      this.form.desc = ''
      this.form.newBool = false
      this.form.popular = false
      this.form.file = {}
      this.$refs.upload.clearFiles()
    }
  }
}
</script>

<style scoped>
  .file {
    margin-bottom: 30px;
  }
</style>