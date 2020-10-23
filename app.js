// token, api
const config = require('./config/server.js')

// include scene
const bugs = require ('./scene/bugs.js')

// api, scene, session, stage vk bot
const VkBot = require('node-vk-bot-api')
const Scene = require('node-vk-bot-api/lib/scene');
const Session = require('node-vk-bot-api/lib/session');
const Stage = require('node-vk-bot-api/lib/stage');

// file system
const fs = require('fs');

// libery for Trello API
const Trello = require("trello");

// init API Trello and VK Bot
const trello = new Trello(config.KEY, config.TOKEN);
const bot = new VkBot(config.TOKENVK)
 
// command and start scene
bot.command('/bugs', (ctx) => {
  ctx.scene.enter('bugs');
});

 
// start polling
bot.startPolling();