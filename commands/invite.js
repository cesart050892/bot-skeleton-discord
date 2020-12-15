module.exports = {
    name: "invite",
    description: "Envia un link de invitación del bot",
    call(message) {
      return message.member
        .send(
          `https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=70282305&scope=bot
      `
        )
        .catch(console.error);
    }
  };