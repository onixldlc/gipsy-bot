const { evaluate } = require('mathjs')

module.exports = {
	name: 'mathfs',
	description: 'ngitung',
	hidden: false,
	checkOwner: false,
	run: (bot, message, args) => {
		message.channel.send(`${evaluate(args.join(""))}`)
		// just fyi gw pas smester 1 kuliah pernah pake bot line gw lupa nama nya tapi dia pake lib ini jg, 
		// gw sempet main main sama eval function nya, ati ati, sebab gw for some reason waktu itu hampir nemu celah atau bypass
		// not yet sadly, klo udah gw udh jadiin cve sih :V tpi sayang nya otak smester 1 gw kurang canggih jadi 
		// just incase watch for any mathjs update
		
	}
};
