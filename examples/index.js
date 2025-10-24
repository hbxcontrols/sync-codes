import syncCode from '../src/index.js'
const code = 'ZBTU-0034'

try {
	console.log('Starting sync code: ', code)
	console.log('Allowed devices: ', syncCode.getAllowedDevices())
	console.log('Split code: ', syncCode.split(code))
	console.log('Make a new sync code: ', syncCode.make({ series: 'A', device: 'BTU', identifier: 1234 }))
	console.log('Sync code series: ', syncCode.series(code))
	console.log('Sync code device type: ', syncCode.device(code))
	console.log('Sync code identifier: ', syncCode.identifier(code))
	console.log('Valid sync code: ', syncCode.validate(code))
	console.log('Add sync code hyphen: ', syncCode.hyphenate('ZBTU0034'))
}

catch (error) {
	console.error(error)
}