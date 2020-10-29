# 表单api接口
## url：https://v4rel.h5sys.cn/api/10521416/statistics/addEditInfo
### 添加开发者操作信息
参数：
{
uid:number,
nid:number,
startTimestamp:number,
endTimestamp:number,
complexity:number,
}

使用说明：比如开发者如果12:30打开某案例开始开发13:40关闭编辑页面，则在13:00发送一次请求，参数为{uid，nid，startTimestamp:12:30时间戳，endTimestamp:13:00时间戳，complexity:该时间段内修改的复杂度}，在13:40发送一次请求，参数为{uid，nid，startTimestamp:13:00时间戳，endTimestamp:13:40时间戳，complexity:该时间段内修改的复杂度}

回包:
```javascript
{result:{}}
```

## url：https://v4rel.h5sys.cn/api/10521416/statistics/getStatistics
### 获取某个时间段内开发者的开发数据
参数：
{
uid:number,
startTimestamp:number,
endTimestamp:number,
}

回包:
```javascript
{result:[{
	uid:Number,
	nid:Number,
	startTimestamp:Number,
	endTimestamp:Number,
	complexity:Number,
}]}
```

## url：https://v4rel.h5sys.cn/api/10521416/statistics/getStatisticsByNid
### 获取某开发者的指定的nid案例的开发数据
参数：
{
uid:number,
nids:array,
}

回包:
```javascript
{result:[{
	uid:Number,
	nid:Number,
	startTimestamp:Number,
	endTimestamp:Number,
	complexity:Number,
}]}
```