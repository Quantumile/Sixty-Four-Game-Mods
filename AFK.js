/*
 * Sixty-Four Mod: AFK-Mode
 *
 * https://sixtyfour.game-vault.net/wiki/Modding:Index
 *
 * Makes one fill last for billions of seconds for every machine that can be filled.
 * Machines are able to virtually work forever after they have been filled once.
 * This does change the overall balance of the game so recommend playing through a normal game first.
 * 
 */


(function () {

    Consumer.prototype.release = function() {
		const screenxy = this.master.uvToXYUntranslated(this.position)
		const pan = this.master.getPanValueFromX(screenxy[0])
		const loudness = this.master.getLoudnessFromXY(screenxy)
		this.master.playSound(`release`, pan, loudness)

		this.fill -= 1e-12
		if (this.fill <= 0){
			this.fill = 0
			if (this.state === 2) this.shootExhaust()
			this.state = 0
			this.sprite.switchSequence(0)
		}
		this.timer = this.resetTime

		for (let i = 0; i < this.resources.length; i++){
			this.resources[i] = Math.floor(this.resources[i] * (1 + (this.multiplicator * this.bonus)))
		}

		this.master.createResourceTransfer(this.resources, this.master.uvToXYUntranslated(this.position))
		this.resourceCount = 0
		this.resources = new Array(this.master.resources.length).fill(0)
		this.multiplicator = Math.min(this.multiplicator + 1, this.maxMultiplicator)
    };



    Preheater.prototype.tap = function() {   
		if (this.state === 2){
			this.fill -= 1e-12
			if (this.fill <= 0){
				this.fill = 0
				if (this.state === 2) this.shootExhaust()
				this.state = 0
				return 0
			}
			return this.multiplicator
		}
		return 0

    };



    Auxpump.prototype.tap = function(dt) {
		if (this.state === 2){
			this.fill -= 1e-12 * dt
			if (this.fill <= 0){
				this.fill = 0
				if (this.state === 2) this.shootExhaust()
				this.state = 0
			}
			return .25
		}
		return 0
    };



    Auxpump2.prototype.tap = function(dt) {

		if (this.state === 2){
			this.fill -= 1e-12 * dt
			if (this.fill <= 0){
				this.fill = 0
				if (this.state === 2) this.shootExhaust()
				this.state = 0
			}
			return 1
		}
		return 0
    };



    Valve.prototype.tap = function(dt) {
 		this.fill -= 1e-12 * dt;
		if (this.fill <= 0){
			this.fill = 0
			if (this.state === 2) this.shootExhaust()
			this.state = 0
		}
    };



    Injector.prototype.tap = function(mult) {
		this.fill -= 1e-12 * mult
		if (this.fill <= 0){
			this.fill = 0
			if (this.state === 2) this.shootExhaust()
			this.state = 0
			this.sprite.switchSequence(0)
		}
    };



    Entropic.prototype.tap = function() {
		this.fill -= 1e-12
		if (this.fill <= 0){
			this.fill = 0
			if (this.state === 2) this.shootExhaust()
			this.state = 0
		}
    };



    Entropic2.prototype.tap = function() {
		this.fill -= 1e-12
		if (this.fill <= 0){
			this.fill = 0
			if (this.state === 2) this.shootExhaust()
			this.state = 0
		}
    };



    Entropic2a.prototype.tap = function() {
 		this.fill -= 1e-12
		if (this.fill <= 0){
			this.fill = 0
			if (this.state === 2) this.shootExhaust()
			this.state = 0
		}
    };



    Entropic3.prototype.process = function() {
		if (this.state === 2){

			//Find cubes to break
			let cubesAround = false
			for (let i = 0; i < this.soi.length; i++){

				const cell = this.master.stuffMap[`u${this.position[0] + this.soi[i][0]}v${this.position[1] + this.soi[i][1]}`]
				if (cell && cell instanceof Cube && cell.state === 2){
					cubesAround = true
					cell.onmousedown(this.power)
				} else if (cell && cell instanceof Gradient && cell.isConnected()){
					cubesAround = true
					cell.tap(this.power)
				}

			}

			if (cubesAround) {
				this.master.createResourceExplosion([0,0,0,0,0,0,0,0,4], this.master.uvToXYUntranslated(this.position))
				this.fill -= 1e-12
				if (!this.master.voidsculpture) this.master.createHollowEvent(`#60F2`,500)
			}
		}
    };




    Destabilizer.prototype.tap = function(mult) {
		this.fill -= 1e-12 * mult;
		if (this.fill <= 0){
			this.fill = 0
			if (this.state === 2) this.shootExhaust()
			this.state = 0
		}
    		return 1
    };


    Destabilizer2.prototype.tap = function(mult) {
		this.fill -= 1e-12 * mult
		if (this.fill <= 0){
			this.fill = 0
			if (this.state === 2) this.shootExhaust()
			this.state = 0
		}
		return 2
    };



    Destabilizer2a.prototype.tap = function(mult) {
		this.fill -= 1e-12 * mult
		if (this.fill <= 0){
			this.fill = 0
			this.sprite.switchSequence(0)
			if (this.state === 2) this.shootExhaust()
			this.state = 0
		}
		return 625
    };



    Vessel.prototype.tap = function(dt) {
		this.fill -= 1e-12 * dt
		if (this.fill <= 0){
			this.fill = 0
			if (this.state === 2) this.shootExhaust()
			this.state = 0
		}
    };



    Silo.prototype.tap = function() {
		if (this.freeTimer <= 0){
			this.fill -= 1e-12
			if (this.fill <= 0){
				this.fill = 0
				if (this.state === 2) {
					const screenxy = this.master.uvToXYUntranslated(this.position)
					const pan = this.master.getPanValueFromX(screenxy[0])
					const loudness = this.master.getLoudnessFromXY(screenxy)
					this.master.playSound(`silo2`, pan, loudness)
					this.shootExhaust()
				}
				this.state = 4 //Bubbling
			}
		}
    };



    Silo2.prototype.tap = function() {
		this.fill -= 1e-12
		if (this.fill <= 0){
			this.fill = 0
			if (this.state === 2) {

				const screenxy = this.master.uvToXYUntranslated(this.position)
				const pan = this.master.getPanValueFromX(screenxy[0])
				const loudness = this.master.getLoudnessFromXY(screenxy)
				this.master.playSound(`silo2`, pan, loudness)
				this.shootExhaust()

				this.shootExhaust()
			}
			this.state = 4 //Bubbling
		}
    };


    Annihilator.prototype.tap = function() {
		if (this.state === 2){
			this.fill -= 1e-12
			if (this.fill <= 0){
				this.fill = 0
				if (this.state === 2) this.shootExhaust()
				this.state = 0
				this.sprite.switchSequence(3)
				this.timer = this.transitionTime
			}

			const screenxy = this.master.uvToXYUntranslated(this.position)
			this.master.createResourceSpark([0,0,0,0,0,0,0,0,1], screenxy)
			this.master.createResourceTransfer([0,0,0,0,0,0,0,0,1], screenxy)
			this.master.createResourceExplosion([0,0,0,0,0,0,0,0,4], screenxy)
			if (!this.master.voidsculpture) this.master.createHollowEvent(`#60F1`,500)

			return true
		}
		return false
    };


})();
