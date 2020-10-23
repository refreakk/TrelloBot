const scene = new Scene('bugs',
  (ctx) => {
    ctx.scene.next();
    ctx.reply('Какой у тебя ник?');
  },
  (ctx) => {
    ctx.session.name = ctx.message.text;
 
    ctx.scene.next();
    ctx.reply('Какой баг обнаружил? Пожалуйста, опиши одним сообщением. Развернутно и понятно, можно со скриншотами ( ссылки ). ');
  },
  (ctx) => {
    ctx.session.desc = ctx.message.text;
 	
    ctx.scene.leave();
    ctx.reply(`Спасибо, ${ctx.session.name} . ${ctx.session.desc} - зафиксированный тобой баг:). Тебе начислен 1 балл`);

    trello.addCard(`Новый баг от ${ctx.session.name}`, `${ctx.session.desc}`, config.IDLIST,
	function (error, trelloCard) {
      	if (error) {
          	console.log('Could not add card:', error);
      	}
      	else {
          	// console.log(trelloCard)
      	}
  	});
    // end addCard
    let player = {
    	name: ctx.session.name
    }
    let data = JSON.stringify(player);
	fs.appendFile('players.json', data);
  },
);

const session = new Session();
const stage = new Stage(scene);
 
bot.use(session.middleware());
bot.use(stage.middleware());