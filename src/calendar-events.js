const ical = require("node-ical");
module.exports = function(RED) {
  function EventsNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.on("input", function(msg) {
      ical.fromURL(config.url, {}, function(err, data) {
        if (err) {
          msg.payload = [];
          msg.error = err;
          node.send(msg);
          return;
        }

        const events = [];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            const event = data[key];
            if (event.type === "VEVENT") {
              events.push(data[key]);
            }
          }
        }
        msg.payload = events;
        node.send(msg);
      });
    });
  }

  RED.nodes.registerType("calendar-events", EventsNode);
};
