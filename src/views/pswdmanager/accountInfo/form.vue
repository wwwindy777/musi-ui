<template>
    <el-dialog :title="form.id ? '编辑' : '新增'" v-model="visible"
      :close-on-click-modal="false" draggable>
      <el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
       <el-row :gutter="24">
    <el-col :span="12" class="mb20">
      <el-form-item label="账号类型" prop="accountType">
        <el-input v-model="form.accountType" placeholder="请输入账号类型"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="账号所属应用" prop="accountApp">
        <el-input v-model="form.accountApp" placeholder="请输入账号所属应用"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="用户名" prop="accountName">
        <el-input v-model="form.accountName" placeholder="请输入用户名"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="密码" prop="accountPw">
        <el-input v-model="form.accountPw" placeholder="请输入密码"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="网站链接" prop="accountUrl">
        <el-input v-model="form.accountUrl" placeholder="请输入网站链接"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="备注" prop="accountRemark">
        <el-input v-model="form.accountRemark" placeholder="请输入备注"/>
      </el-form-item>
      </el-col>

			</el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit" :disabled="loading">确认</el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script setup lang="ts" name="AccountInfoDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from "/@/hooks/message";
import { getObj, addObj, putObj } from '/@/api/pswdmanager/accountInfo'
import { rule } from '/@/utils/validate';
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false)
const loading = ref(false)
// 定义字典

// 提交表单数据
const form = reactive({
		id:'',
	  accountType: '',
	  accountApp: '',
	  accountName: '',
	  accountPw: '',
	  accountUrl: '',
	  accountRemark: '',
});

// 定义校验规则
const dataRules = ref({
        accountType: [{required: true, message: '账号类型不能为空', trigger: 'blur'}],
        accountApp: [{required: true, message: '账号所属应用不能为空', trigger: 'blur'}],
        accountName: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        accountPw: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        accountUrl: [{required: true, message: '网站链接不能为空', trigger: 'blur'}],
        accountRemark: [{required: true, message: '备注不能为空', trigger: 'blur'}],
})

// 打开弹窗
const openDialog = (id: string) => {
  visible.value = true
  form.id = ''

  // 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

  // 获取accountInfo信息
  if (id) {
    form.id = id
    getaccountInfoData(id)
  }
};

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => {});
	if (!valid) return false;

	try {
    loading.value = true;
		form.id ? await putObj(form) : await addObj(form);
		useMessage().success(form.id ? '修改成功' : '添加成功');
		visible.value = false;
		emit('refresh');
	} catch (err: any) {
		useMessage().error(err.msg);
	} finally {
    loading.value = false;
  }
};


// 初始化表单数据
const getaccountInfoData = (id: string) => {
  // 获取数据
  loading.value = true
  getObj(id).then((res: any) => {
    Object.assign(form, res.data)
  }).finally(() => {
    loading.value = false
  })
};

// 暴露变量
defineExpose({
  openDialog
});
</script>