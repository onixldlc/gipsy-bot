module.exports={
	convertSecToDate:(sec)=>{
		var lookup = [1000,1,24,60,60]
		var humanReadable = ["days", "hour", "minute", "second", "ms"]
		return [86400000, 3600000, 60000, 1000, 1].map((value,index)=>{
			return String(~~(sec/value)%lookup[index])+humanReadable[index]+","
		}).join(" ")
	}
}