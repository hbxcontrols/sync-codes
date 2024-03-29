/**
 * A set of tools for handling and validating HBX Controls device sync codes.
 * Sync code structure: Series, Device, Identifier [A][BTU]-[1234] // ABTU-1234
 */
module.exports = {
	allowedDevices: ['BTU', 'ENG', 'CPU', 'ECO', 'FLO', 'FLW', 'PRE', 'PRS', 'SNO', 'SUN', 'SGL', 'THM', 'ZON'],
	deviceDescriptions: {
		BTU: 'Energy Sensor',
		CPU: 'Boiler Controller',
		ECO: 'Geothermal Controller',
		ENG: 'Energy Sensor',
		FLO: 'Flow Sensor',
		FLW: 'Flow Sensor',
		PRE: 'Pressure Sensor',
		PRS: 'Pressure Sensor',
		SNO: 'Snow-melt Controller',
		SUN: 'Solar Controller',
		SGL: 'Single-zone Thermostat',
		THM: 'Thermostat',
		ZON: 'Zone Controller'
	},

	/**
	 * Returns a list of device descriptions
	 * @return {array}
	 */
	getDeviceDescriptions() {
		return this.deviceDescriptions
	},

	/**
	 * Returns an single device description
	 * @return {array}
	 */
	getDeviceDescription(device) {
		return this.deviceDescriptions[device]
	},

	/**
	 * Returns an array of allowed device types 
	 * @return {array}
	 */
	getAllowedDevices() {
		return this.allowedDevices
	},


	/**
	 * Returns an array of sync code parts split at hyphen
	 * @param  {string} A device sync code
	 * @return {array}	Array of sync code fragments
	 */
	split(code) {
		const parts = code.split('-')

		if(parts.length !== 2) throw new Error(`Invalid sync code structure. (${code})`)

		return parts
	},


	/**
	 * Creates a valid device sync code
	 * @param  {object} An object containing the sync code segments: series, device, identifier
	 * @return {string} Return a valid device sync code
	 */
	make(parts) {
		if(typeof parts !== 'object' || parts == null) {
			throw new Error("Invalid sync code parts. Must be an object containing: series, device, identifier.")
		}

		if(!parts.series || !parts.device || !parts.identifier) {
			throw new Error("Missing sync code parts. Must be an object containing: series, device, identifier.")
		}

		return this.validate([parts.series.concat(parts.device), parts.identifier].join('-'))
	},


	/**
	 * Returns the sync code series 
	 * @param  {string} A device sync code
	 * @return {string} A single letter representing the sync code series
	 */
	series(code) {
		const series = code.charAt(0)

		// Throw error if series is not a single letter.
		if(!series.match(/^[A-Za-z]{1}$/gm)) {
			throw new Error(`Invalid sync code series. (${code})`)
		}

		return series.toUpperCase()
	},


	/**
	 * Returns sync code device type
	 * @param  {string} A device sync code
	 * @return {string} A 3 digit string represeting the sync code device type
	 */
	device(code) {
		const parts = this.split(code)
		const device = parts[0].trim().substr(1)

		// Throw error if device type is not a 3 character string
		if(!device.match(/^[A-Za-z]{3}$/gm)) {
			throw new Error(`Invalid sync code device type. (${code})`)
		}

		// Throw error if device type is not allowed.
		if(!this.allowedDevices.includes(device.toUpperCase())) {
			throw new Error(`Device type not allowed. (${code})`)
		}

		return device.toUpperCase()
	},


	/**
	 * Returns sync code identifier number
	 * @param  {string} A device sync code
	 * @return {string} A 4 digit integer represeting the sync code identifier
	 */
	identifier(code) {
		const parts = this.split(code)
		const identifier = parts[1].trim()

		// Throw error if not a 4 digit number.
		if(!identifier.match(/^[0-9]{4}$/gm)) {
			throw new Error(`Invalid sync code identifier. (${code})`)
		}

		// Return identifier as an integer so sequences can be discovered.
		return identifier
	},


	/**
	 * Validates all parts of the sync code and returns the valid string
	 * @param  {string} A device sync code
	 * @return {string} Returns the valid sync code
	 */
	validate(code) {
		// Validate all sync code segments
		const series = this.series(code)
		const device = this.device(code)
		const identifier = this.identifier(code)
		const syncCode = [series.concat(device), identifier].join('-')

		return syncCode.toUpperCase()
	},




	hyphenate(code) {
		if(!code.includes('-') && code.length === 8) {
			code = code.slice(0, 4) + '-' + code.slice(4)
		}

		return code
	}
}