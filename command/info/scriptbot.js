module.exports = {
	name: "scriptbot",
	alias: ["script", "sc", "scbot"],
	category: "info",
	isSpam: true,
	async run({ msg, conn }, { q, map, args }) {
		await conn.sendMessage(
			msg.from,
			{
				image: { url: config.thumbMenu },
				footer: config.namebot,
				caption: `Script Bot Is here\nDon't forget to fork & give star X3`,
				templateButtons: [
					{ urlButton: { displayText: "Script Bot", url: "https://github.com/RizzOwO/NodeBot-MD/" } },
				],
			},
			{ quoted: msg }
		);
	},
}
