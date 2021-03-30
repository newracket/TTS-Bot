const { CustomCommand } = require("../../modules/custommodules");

class EightBallCommand extends CustomCommand {
  constructor() {
    super('8ball', {
      aliases: ['8ball'],
      description: "8ball (totally not rigged)",
      usage: "8ball <question>",
      category: "Misc",
    });
  }

  exec(message) {
    const casWords = ["cas", "bad", "garbage", "trash", "garbonzo", "dogshit"];
    const names = ["justin", "john", "alan", "achintya", "oscar", "aaron", "david", "gio", "eric"];
    const reverseWords = ["no", "not"];
    let messageToSend = true;

    if (message.author.username == "newracket") {
      messageToSend = true;
      if (this.includesWords(message.content, names)) {
        messageToSend = !messageToSend;
      }
      if (!this.includesWords(message.content, casWords)) {
        messageToSend = !messageToSend;
      }
      if (this.includesWords(message.content, reverseWords)) {
        messageToSend = !messageToSend;
      }
    }
    else {
      messageToSend = false;
      if (message.content.includes("aniket")) {
        messageToSend = !messageToSend;
      }
      if (!this.includesWords(message.content, casWords)) {
        messageToSend = !messageToSend;
      }
      if (this.includesWords(message.content, reverseWords)) {
        messageToSend = !messageToSend;
      }
    }

    if (messageToSend) {
      message.channel.send("Yes");
    }
    else {
      message.channel.send("No");
    }
  };

  includesWords(input, words) {
    return words.filter(word => input.includes(word)).length > 0;
  };
}

module.exports = EightBallCommand;