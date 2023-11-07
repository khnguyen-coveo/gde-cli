const ask = require('./ask');

module.exports = async () => {
	const name = await ask({
		type: `input`,
		name: `name`,
		message: `What do you want your GDE project to be called?`,
		hint: `(kebab-case only)`
	});
	const email = await ask({
		type: `input`,
		name: `email`,
		message: `What is your Coveo user email?`
	});
	const orgId = await ask({
		type: `input`,
		name: `orgId`,
		message: `What is your organization ID?`,
		hint: `(If not sure, please check Coveo Admin Console)`
	});
	const nonSecureApiKey = await ask({
		type: `input`,
		name: `nonSecureApiKey`,
		message: `What is your Coveo API key?`
	});
	const searchHub = await ask({
		type: `input`,
		name: `searchHub`,
		message: `What is your search hub?`,
		hint: `(Optional: If left blank, will be set to 'default')`,
		initial: `default`
	});
	const pipeline = await ask({
		type: `input`,
		name: `pipeline`,
		message: `What is your search pipeline?`,
		hint: `(Optional: If left blank, will be set to 'default')`,
		initial: `default`
	});
	const caseAssist = await ask({
		type: `input`,
		name: `caseAssist`,
		message: `What is your case assist ID?`
	});

	const vars = {
		name,
		email,
		orgId,
		nonSecureApiKey,
		searchHub: searchHub ? searchHub : 'default',
		pipeline: pipeline ? pipeline : 'default',
		caseAssist
	};

	return vars;
};
