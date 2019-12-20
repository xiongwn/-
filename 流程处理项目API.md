# form
### getAllForm（获取表单模板列表）
+ 无参数

### getFormTemplateById （获取表单模板）
+ id // 表单模板id

### getFormInstanceById（获取某个表单实例）
+ id // 表单实例id

### createFormInstance（创建表单实例）
+ content // 实例中填写的内容
+ formTemplateId // 表单模板id
+ flowInstanceId // 流程实例id

### editFormInstance（编辑表单实例）
+ content // 实例中填写的内容
+ formTemplateId // 表单模板id
+ flowInstanceId // 流程实例id
+ id // 表单实例id

### **formTable1（表单模板）
+ title 标题
+ userName 提交人姓名
+ submitNum 提交数
+ content 内容
+ userId 提交用户id

### **formInstance（表单实例）
+ content // 实例中填写的内容
+ formTemplateId // 表单模板id
+ flowInstanceId // 流程实例id

# user
### getAllUser（获取用户列表）
+ 无参数

# flow
### createFlowTemplate（创建流程模板）
+ name // 模板名称
+ content // 模板内容

### editFlowTemplate（编辑流程模板）
+ name // 模板名称
+ content // 模板内容
+ flowId // 流程模板id

### createFlowInstance（创建流程实例）
+ userId // 用户id
+ flowTemplateId // 流程模板id
+ state // 状态
+ failTask // 失败任务id

### editFlowInstance（编辑流程实例）
+ userId // 用户id
+ flowTemplateId // 流程模板id
+ state // 状态
+ failTask // 失败任务id
+ id // 流程实例id

### getAllFlow（获取所有流程模板列表）
+ 无参数

### getFlowInstanceByUserId（通过用户id获取流程实例）
+ id // 用户id

### **flowTemplate（流程模板）
+ name // 模板名称
+ content // 模板内容

### **flowInstance（流程实例）
+ userId // 用户id
+ flowTemplateId // 流程模板id
+ state // 状态
+ failTaskId // 失败任务id

# node
### createNode（创建节点）
+ flowId // 流程模板id
+ nodeId // 节点id
+ type // 类型
+ formId // 表单模板id
+ feildPermission // 字段权限
+ operatePermissions // 操作权限
+ positions // 审批角色

### editNode（编辑节点模板）
+ flowId // 流程模板id
+ nodeId // 节点id
+ type // 类型
+ formId // 表单模板id
+ feildPermission // 字段权限
+ operatePermissions // 操作权限
+ positions // 审批角色
+ id // 节点模板id

### createNodeInstance（创建节点实例）
+ flowInstanceId // 流程实例id
+ nodeId // 节点id
+ state // 状态
+ prompt // 审批意见

### editNodeInstance（修改节点实例）
+ flowInstanceId // 流程实例id
+ nodeId // 节点id
+ state // 状态
+ prompt // 审批意见
+ id // 节点实例id

### getNodeInstanceByFlowInstanceId（通过流程实例id获取节点实例）
+ id // 流程实例id

### getNodeById（通过节点模板id获取）
+ id // 节点模板id

### getNodeByFlowTemplateId（通过流程模板id获取节点模板）
+ id // 流程模板id

### **nodeTable（节点模板）
+ flowTemplateId // 流程模板id
+ nodeId // 节点id
+ type // 类型
+ formId // 表单模板id
+ feildPermission // 字段权限
+ operatePermissions // 操作权限
+ positions // 审批角色

### **nodeInstance（节点实例）
+ flowInstanceId // 流程实例id
+ nodeId // 节点id
+ state // 状态
+ prompt // 审批意见

# task
### createTask（创建任务）
+ nodeInstanceId // 节点实例id
+ userId // 用户id
+ state // 状态

### editTask（编辑任务）
+ nodeInstanceId // 节点实例id
+ userId // 用户id
+ state // 状态
+ id // 任务id

### getTaskByNodeInstanceId（通过节点实例id获取任务）
+ id // 节点实例id

### getTaskByUserId（通过用户id获取任务）
+ id // 用户id

### **task（任务）
+ nodeInstanceId // 节点实例id
+ userId // 用户id
+ state // 状态