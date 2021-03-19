const { sweatranks, casranks } = require("../ranks.json");

module.exports = {
  name: "givecas",
  description: "Gives cas role to a member",
  aliases: ["gc"],
  execute(message, args, client) {
    if (!["greektoxic", "newracket", "Fury"].includes(message.author.username)) {
      return message.channel.send("You do not have permissions to promote someone.");
    }

    message.guild.members.fetch()
      .then(guildMembers => {
        const membersToModify = args.map(arg => guildMembers.find(member => member.nickname == arg)).filter(e => e != undefined);
        [...Array.from(message.mentions.members, ([name, value]) => (value)), ...membersToModify].forEach(member => {
          const lastRank = casranks.filter(rank => member.roles.cache.map(role => role.name).includes(rank)).pop();

          if (casranks.indexOf(lastRank) == casranks.length - 1) {
            return message.channel.send(`This person is already ${lastRank} and cannot get any more cas roles.`);
          }
          else if (lastRank != undefined) {
            member.roles.add(message.guild.roles.cache.find(role => role.name == casranks[casranks.indexOf(lastRank) + 1]))
              .then(newMember => message.channel.send(`Successfully gave ${casranks[casranks.indexOf(lastRank) + 1]} to <@${newMember.id}>`));
          }
          else {
            const memberRoles = member.roles.cache.filter(role => !sweatranks.includes(role.name)).map(role => role.id);
            memberRoles.push(message.guild.roles.cache.find(role => role.name == "Cas").id);

            member.roles.set(memberRoles)
              .then(newMember => message.channel.send(`Successfully gave Cas to <@${newMember.id}>`));
          }
        });
      });
  }
}