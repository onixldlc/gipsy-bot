module.exports = {
	name: 'now',
	description: 'prints current date with user region format',
	ownerOnly: false,
    hidden: false,

	run: (bot, message, args) => {
		const now = new Date();
        const date = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
        const time = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
		var offset =  now.getTimezoneOffset()
		const timezone = () => {
			offset /= 60;

			if(offset == -7)
				return "WIB";
			else if(offset == -8)
				return "WITA";
			else if(offset == -9)
				return "WIT";
			else if(offset == 0) 
				return "UTC";
			else if(offset > 0){
				return "UTC +" + offset;
			}
			else if(offset < 0)
				return "UTC -" + offset;
			else 
				return;
		}

        message.channel.send(`\`\`\`now is ${date} ${time} ${timezone()}\`\`\``);
	}
};