const amqp = require("amqplib/callback_api")
//import { RunScraper } from "scraper/search_page.js";
const RunScraper = require("./search_page")

console.log("Starting Scraper")
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        console.log("error0");
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            console.log("error1");
            throw error1;
        }
        const queue = 'housing_schedule';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            RunScraper();
        }, {
            noAck: true
        });

    });

});



