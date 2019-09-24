const ical = require("ical-generator");
module.exports = function(RED) {
  function GenerateNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.on("input", function(msg) {
      msg.payload = ical({
        name: config.name || undefined,
        prodId: {
          company: config.domain || "mrbbot.dev",
          product: config.product || "node-red-contrib-calendar",
          language: config.language || "EN"
        },
        domain: config.domain || "mrbbot.dev",
        events: msg.payload
      }).toString();
      node.send(msg);
    });
  }
  RED.nodes.registerType("calendar-generate", GenerateNode);
};
