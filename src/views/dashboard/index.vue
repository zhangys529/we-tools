<template>
  <div class="dashboard-container">
    <!--    <div class="dashboard-text">你好，{{ user.nickname }}</div>-->
    <el-form label-position="right" label-width="60px">
      <el-form-item label="1">
        <el-input v-model="a" size="mini" type="number" clearable />
      </el-form-item>
      <el-form-item label="2">
        <el-input v-model="b" size="mini" type="number" clearable />
      </el-form-item>
      <el-form-item label="3">
        <el-input v-model="c" size="mini" type="number" clearable />
      </el-form-item>
      <el-form-item label="总共">
        <el-input v-model="total" size="mini" type="number" clearable @keyup.enter.native="cou">
          <template slot="append">
            <el-button :loading="loading" size="mini" type="success" @click="cou">凑单</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="results" size="mini" border stripe :header-cell-style="{background: 'aliceblue'}">
      <el-table-column prop="i" :label="a" show-overflow-tooltip />
      <el-table-column prop="j" :label="b" show-overflow-tooltip />
      <el-table-column prop="k" :label="c" show-overflow-tooltip />
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      a: null,
      b: null,
      c: null,
      total: null,
      loading: false,
      results: []
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    cou() {
      this.loading = true
      this.results = []
      console.log(this.a, ',', this.b, ',', this.c, '==>', Number(this.total))
      if (this.c) {
        for (let i = 0; i < 300; i++) {
          if (this.a * i > Number(this.total)) {
            break
          }
          for (let j = 0; j < 300; j++) {
            if ((this.a * i + this.b * j) > Number(this.total)) {
              break
            }
            for (let k = 0; k < 300; k++) {
              const result = this.a * i + this.b * j + this.c * k
              if (result === Number(this.total)) {
                this.results.push({ i, j, k })
              } else if (result > Number(this.total)) {
                break
              }
            }
          }
        }
      } else {
        for (let i = 0; i < 300; i++) {
          if (this.a * i > Number(this.total)) {
            break
          }
          for (let j = 0; j < 300; j++) {
            const result = this.a * i + this.b * j
            if (result === Number(this.total)) {
              this.results.push({ i, j })
            } else if (result > Number(this.total)) {
              break
            }
          }
        }
      }
      console.log(this.results)
      this.$message({ message: '凑单完成 总共 [' + this.results.length + '] 种结果', type: 'success' })
      this.loading = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .el-form-item {
    .el-input {
      width: 250px;
    }
  }

  .el-card {
    width: 500px;
  }
</style>
