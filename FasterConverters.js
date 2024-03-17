/*
 * Sixty-Four Mod: Faster Converters
 *
 * https://sixtyfour.game-vault.net/wiki/Modding:Index
 *
 * Makes the converters work faster which helps to speed up the game significantly.
 * This does change the overall balance of the game so recommend playing through a normal game first.
 */

(function () {

   	let _converter32_init = Converter32.prototype.init;
   	let _converter13_init = Converter13.prototype.init;
   	let _converter41_init = Converter41.prototype.init;
   	let _converter76_init = Converter76.prototype.init;
   	let _converter64_init = Converter64.prototype.init;


	Converter32.prototype.init = function() {
		_converter32_init.call(this);
		this.baseConversionSpeed = 1e-4;
	};

	Converter13.prototype.init = function() {
		_converter13_init.call(this);
		this.baseConversionSpeed = 1e-4;
	};

	Converter41.prototype.init = function() {
		_converter41_init.call(this);
		this.baseConversionSpeed = 1e-4;
	};

	Converter76.prototype.init = function() {
		_converter76_init.call(this);
		this.baseConversionSpeed = 1e-4;
	};

	Converter64.prototype.init = function() {
		_converter64_init.call(this);
		this.baseConversionSpeed = 1e-4;
	};

})();