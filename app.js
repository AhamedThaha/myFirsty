// Add your requirements
var restify = require('restify'); 
var builder = require('botbuilder'); 

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector
({ appId: '10ba2ced-8a81-4cf4-83eb-12775049d17f', appPassword: 'S0h4oBn8dNAT3fDUx6rYFKF' }); 
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot dialogs
bot.dialog('/', [
    function (session) {
        session.send("Hello, I am Ahamed Thaha's First Bot.");
        builder.Prompts.text(session, "What's your name?");
    },
    function (session, results) {
        session.userData.name = results.response;
        builder.Prompts.number(session, "Hi " + results.response + ", How many years have you been coding?"); 
    },
    function (session, results) {
        session.userData.coding = results.response;
        builder.Prompts.choice(session, "What language do you code using?", ["Java", "DotNet", "PHP"]);
    },
    function (session, results) {
        session.userData.language = results.response.entity;
        session.send("Got it... " + session.userData.name + 
                     " you've been programming for " + session.userData.coding + 
                     " years and use " + session.userData.language + ".");
        builder.Prompts.text(session, "Now Say, goodbye to end the conversation");
    },
    function (session, results) {
        session.userData.endmessage = results.response;
        if (results.response && session.userData.endmessage == 'goodbye') {
           // Exit
            session.endDialog();
        }else{
             builder.Prompts.text(session, session.userData.name + " please say goodbye");
        }
    }
]);