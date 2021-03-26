const syncCode = require('../src')
const code = 'ZBTU-0034';

try {
	console.log(syncCode.getAllowedDevices());
	console.log(syncCode.split(code));
	console.log(syncCode.make({ series: 'A', device: 'BTU', identifier: 1234 }))
	console.log(syncCode.series(code));
	console.log(syncCode.device(code));
	console.log(syncCode.identifier(code));
	console.log(syncCode.validate(code));
	console.log(syncCode.hyphenate('ZBTU0034'));
}

catch(error) {
	console.error(error);
}