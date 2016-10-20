//To get TTN work with Telegram Bot
var ttn = require('ttn');
var appEUI = '70B3D57ED0000BC6';
var accessKey = 'bOMgdxB78BnKKSn5DPGru6PmBV+RX7Me9sshhAY/Fys=';
var client = new ttn.Client('staging.thethingsnetwork.org', appEUI, accessKey);

var TelegramBot = require('node-telegram-bot-api');
var token = '268381398:AAEIpX2LNbD6rfUS1-WDXlg82D22mO7Ochc';
var bot = new TelegramBot(token, {polling: true});

var UserID = 31760696;
var chatId;

// Any kind of message
bot.on('message', function (msg) {
  global.chatId = msg.chat.id;
  var UserIdentity = msg.from.id;
  var response = "ChatID is : " + global.chatId + "  ---  " + "By : " + UserIdentity;
  
  bot.sendMessage(UserID,response);
  bot.sendMessage(global.chatId, response);

});

client.on('connect', function() {
  console.log('[DEBUG]', 'Connected');
  var resp = "Connected To Server";
  bot.sendMessage(UserID, resp);
  //bot.sendMessage(UserID, global.chatId);  
});

client.on('error', function (err) {
  console.error('[ERROR]', err.message);
  var resp = "Error Connecting To Server";
  bot.sendMessage(UserID, resp);
});

client.on('activation', function (e) {
  console.log('[INFO] ', 'Activated: ', e.devEUI);
  var resp = 'Activated :  ' + e.devEUI;
  bot.sendMessage(UserID, resp);
});

client.on('uplink', function (msg) {
  console.info('[INFO] ', 'Uplink: ' + JSON.stringify(msg, null, 2));
  var resp = 'Uplink: ' + JSON.stringify(msg, null, 2);
  bot.sendMessage(UserID, resp);
});

client.on('uplink', function(msg) {

  if (msg.counter % 3 === 0) {
    console.log('[DEBUG]', 'Downlink');
    //48 is 'H', 69 is 'i'
    var payload = new Buffer('4869', 'hex');
    client.downlink(msg.devEUI, payload);
  }
});



// Any kind of message
//bot.on('message', function (msg) {
//  var fromId = msg.from.id;
//  bot.sendMessage(fromId, global.resp);
//  console.log('[MsgID]', fromId);
//});
