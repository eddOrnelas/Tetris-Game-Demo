MainGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.ready = false;

};

MainGame.Preloader.prototype = {

	preload: function () {

		//Show the load bar
		this.bck = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBackground');
		this.bck.anchor.setTo(0.5,0.5);
		this.bck.scale.setTo(0.5,0.5);
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0,0.5);
		this.preloadBar.scale.setTo(0.5,1);
		this.preloadBar.x = this.world.centerX - this.preloadBar.width/2;
		
		this.load.setPreloadSprite(this.preloadBar);
		
		this.load.image('redTile', 'assets/img/tileRed_01.png');
		this.load.image('greenTile', 'assets/img/tileGreen_01.png');
		this.load.image('blueTile', 'assets/img/tileBlue_01.png');
		this.load.image('pinkTile', 'assets/img/tilePink_01.png');
		this.load.image('yellowTile', 'assets/img/tileYellow_01.png');
		this.load.image('orangeTile', 'assets/img/tileOrange_72.png');
		this.load.image('greyTile', 'assets/img/tileGrey_01.png');
		
		this.load.image('backTile', 'assets/img/tileBlack_01.png');
		
		this.load.image('digitalPadUp', 'assets/img/upButton.png');
        this.load.image('digitalPadDown', 'assets/img/downButton.png');
        this.load.image('digitalPadLeft', 'assets/img/leftButton.png');
        this.load.image('digitalPadRight', 'assets/img/rightButton.png');
        
        this.load.image('digitalPadRotateR', 'assets/img/rotateRightButton.png');
        this.load.image('digitalPadRotateL', 'assets/img/rotateLeftButton.png');
        
        this.load.image('digitalStartButton', 'assets/img/startButton.png');
        this.load.image('youlose', 'assets/img/youlose.png');
        
        this.load.audio('backgroundMusic', 'assets/music/backgroundMusic.mp3');
        this.load.audio('beep', 'assets/sound/pepSound1.mp3');
        this.load.audio('zap', 'assets/sound/zap1.mp3');
        this.load.audio('zap2', 'assets/sound/zap2.mp3');
		
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
		if (this.ready == false)
		{
			this.ready = true;
			this.state.start('Game');
		}
	}

};
