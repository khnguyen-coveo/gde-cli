const ora = require('ora');
const path = require('path');
const execa = require('execa');
const alert = require('cli-alerts');
const copy = require('copy-template-dir');
const { green: g, yellow: y, dim: d } = require('chalk');

const spinner = ora({ text: '' });
const questions = require('./questions');

module.exports = async () => {
	const vars = await questions();
	const outDir = vars.name;
	const inDirPath = path.join(__dirname, `../template`);
	const outDirPath = path.join(process.cwd(), outDir);
	spinner.start(`${y(`GDE Repo`)} cloning…\n\n${d(`It may take moment…`)}`);
	await execa(`git`, [
		`clone`,
		`-b`,
		'Admin-console',
		`--single-branch`,
		`https://github.com/coveo/GDE.git`,
		`${vars.name}`
	]);
	spinner.succeed(`${g(`GDE repo`)} cloned!`);
	copy(inDirPath, outDirPath, vars, async (err, createdFiles) => {
		if (err) throw err;

		console.log(d(`\nCreating files in ${g(`./${outDir}`)} directory:\n`));

		createdFiles.forEach(filePath => {
			const fileName = path.basename(filePath);
			console.log(`${g(`CREATED`)} ${fileName}`);
		});

		console.log();

		alert({
			type: `success`,
			name: `ALL DONE`,
			msg: `\n\n${createdFiles.length} files created in ${d(
				`./${outDir}`
			)} directory`
		});
	});
};
