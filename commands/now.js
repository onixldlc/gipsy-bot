module.exports = {
	name: 'now',
	description: 'prints current date with user region format',
	
	run: (bot, message, args) => {
		const now = new Date();
        const date = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
        const time = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();

        message.channel.send(`\`\`\`now is ${date} ${time} \`\`\``);
	}
};