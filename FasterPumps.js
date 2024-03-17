/*
 * Sixty-Four Mod: Faster Pumps
 *
 * https://sixtyfour.game-vault.net/wiki/Modding:Index
 *
 * Makes the pumps work faster which helps to speed up the game significantly.
 * This does change the overall balance of the game so recommend playing through a normal game first.
 * 
 */

(function () {

   	let _pump_init = Pump.prototype.init;
   	let _pump2_init = Pump2.prototype.init;

	Pump.prototype.init = function() {
		_pump_init.call(this);
		this.basePumpSpeed = .24;
	};


	Pump2.prototype.init = function() {
		_pump2_init.call(this);
		this.basePumpSpeed = .48;
	};

})();