// module
const FormData = require("form-data");
const { default: Axios } = require("axios");
const fs = require("fs");
const filetype = require("file-type");
//end module

//function upload file
const uploadFile = (path) =>
	new Promise((resolve, reject) => {
		const fd = new FormData();
		fd.append("file", fs.createReadStream(path));
		Axios({
			method: "POST",
			url: "https://file.rizfurr.ml/api/upload",
			data: fd,
			headers: {
				"user-agent": "MRHRTZ-ZONE :D",
				"content-type": `multipart/form-data; boundary=${fd._boundary}`,
			},
		})
			.then(({ data }) => resolve(data))
			.catch(reject);
	});
// end function

module.exports = {
	name: "upload",
	alias: ["tourl", "tolink"],
	desc: "Convert media to url",
	use: "reply media message",
	isMedia: {
		isQVideo: true,
		isQAudio: true,
		isQDocument: true,
		isQSticker: true,
		isQImage: true,
	},
	category: "tools",
	isSpam: true,
	isLimit: true,
	wait: true,
	async run({ msg, conn }, { q }) {
		let type = await filetype.fromBuffer(await msg.quoted.download());
		let filename = `./temp/${Date.now()}.${type.ext}`;
		fs.writeFileSync(filename, await msg.quoted.download());
		let file = await uploadFile(filename); 
		let res = `
		*• Host:* _https://file.rizfurr.ml_ 
		*• OriginalName:* _${file.result.originalname}_ 
		*• Encoding:* _${file.result.encoding}_ 
		*• Mimetype:* _${file.result.mimetype}_ 
		*• Filesize:* _${file.result.filesize}_ 
		*• UrlFile:* _${file.result.url}_`
		await msg.reply(res);
	},
};
