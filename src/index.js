/**
 * A set of tools for handling and validating HBX Controls device sync codes.
 * Sync code structure: Series, Device, Identifier [A][BTU]-[1234] // ABTU-1234
 */
module.exports = {
	allowedDevices: ['BTU', 'CPU', 'ECO', 'FLO', 'PRE', 'SNO', 'SOL', 'THM', 'ZON'],

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

		if(parts.length !== 2) throw Error(`Invalid sync code structure. (${code})`)

		return parts
	},


	/**
	 * Creates a valid device sync code
	 * @param  {object} An object containing the sync code segments: series, device, identifier
	 * @return {string} Return a valid device sync code
	 */
	make(parts) {
		if(typeof parts !== 'object' || parts == null) {
			throw  Error("Invalid sync code parts. Must be an object containing: series, device, identifier.")
		}

		if(!parts.series || !parts.device || !parts.identifier) {
			throw  Error("Missing sync code parts. Must be an object containing: series, device, identifier.")
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
			throw Error("Invalid sync code series.")
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
			throw Error("Invalid sync code device type.")
		}

		// Throw error if device type is not allowed.
		if(!this.allowedDevices.includes(device.toUpperCase())) {
			throw Error("Device type not allowed.")
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
			throw Error("Invalid sync code identifier.")
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