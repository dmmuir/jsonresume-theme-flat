var fs = require("fs");
var Handlebars = require("handlebars");

function render(resume) {
	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var template = fs.readFileSync(__dirname + "/resume.template", "utf-8");
	return Handlebars.compile(template)({
		css: css,
		resume: resume
	});
}

Handlebars.registerHelper("nl2br", function(value) {
	return (value || "").replace(/\n/g, "</p><p>");
});

const readFrom = async (stream) => {
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
};

readFrom(process.stdin)
.then(resume => {
	console.log(render(resume));
}).catch((err) => {
        console.error(err);
    });;
