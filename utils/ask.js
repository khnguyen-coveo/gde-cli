const fs = require('fs');
const { Input } = require('enquirer');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const shouldCancel = require('cli-should-cancel');

module.exports = async ({ type, name, message, hint, initial }) => {
	const [err, response] = await to(
		new Input({
			type,
			name,
			message,
			hint,
			initial,
			validate(value, state) {
				if (state && state.name === `command`) return true;
				// Checks if directory already exist
				if (state && state.name === `name`) {
					if (fs.existsSync(value)) {
						return `Directory already exists: ./${value}`;
					} else {
						return true;
					}
				}
				// Validate email is in the correct format
				if (state && state.name === `email`) {
					const emailRegexp =
						/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
					if (!emailRegexp.test(value)) {
						return `${value} is not a valid email address`;
					}
					return true;
				}
				// Validate API key
				if (state && state.name === `nonSecureApiKey`) {
					const apiKeyRegexp =
						/^xx[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
					if (!apiKeyRegexp.test(value)) {
						return `${value} is not a valid API key. It should start with xx follows by 8-4-4-4-12 characters separated by hyphens`;
					}
				}
				// Validate Case Assist UUID-like (Universal Unique Identifier) string
				if (state && state.name === `caseAssist`) {
					const caseAssistRegexp =
						/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
					if (!caseAssistRegexp.test(value)) {
						return `${value} is not a valid Case Assist key. It should have the following sequence: 8-4-4-4-12 characters separated by hyphens`;
					}
				}
				return !value ? `Please add a value.` : true;
			}
		})
			.on(`cancel`, () => shouldCancel())
			.run()
	);

	handleError(`INPUT`, err);

	return response;
};
