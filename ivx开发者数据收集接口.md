# 表单api接口
## url：/customApi/statistics/addEditInfo
### 添加开发者操作信息
参数：
```javascript
{
uid:Number,
nid:Number,
startTimestamp:Number,
endTimestamp:Number,
deltaComplexity:Number,
totalComplexity:Number
}
```
使用说明：每10mins发一次请求，比如开发者如果12:30打开某案例开始开发，则在12:40发送一次请求，参数为{uid，nid，startTimestamp:12:30时间戳，endTimestamp:12:40时间戳，deltaComplexity:该时间段增加的复杂度，totalComplexity:该案例当前总共的复杂度}

回包:
```javascript
{result:{}}
```

## url：/customApi/statistics/getStatistics
### 获取某个时间段内开发者的开发数据
参数：
```javascript
{
uid:Number,
startTimestamp:Number,
endTimestamp:Number,
}
```
回包:
```javascript
{result:[{
	uid:Number,
	nid:Number,
	startTimestamp:Number,
	endTimestamp:Number,
	deltaComplexity:Number,
	totalComplexity:Number
}]}
```

## url：/customApi/statistics/getStatisticsByNid
### 获取某开发者的指定的nid案例的开发数据
参数：
```javascript
{
uid:Number,
nids:array,
}
```
回包:
```javascript
{result:[{
	uid:Number,
	nid:Number,
	startTimestamp:Number,
	endTimestamp:Number,
	deltaComplexity:Number,
	totalComplexity:Number
}]}
```