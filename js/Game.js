MainGame.Game = function(game) {
    //declare a few 'global' variables here

    //variables
    this.margin = {
        top: 40,
        bottom: 25,
        left: 300,
        right: 25
    };
    this.cellW = 32;
    this.cellH = 32;
    this.originalSpriteW = 128;
    this.originalSpriteH = 128;
    this.cellAreaW = 10;
    this.cellAreaH = 20;

    this.colors = [
        'red', 'blue', 'pink', 'green', 'yellow', 'orange', 'grey'
    ];


    //Figures
    this.figuresList = ['Z', 'I', 'S', 'J', 'L', 'Q', 'T']
    this.figures = {};


    // Z figure
    this.figures.Z = [];
    
    this.figures.Z[0] = [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
    ];
    this.figures.Z[1] = [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
    ];
    /*this.figures.Z[2] = [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ];
    this.figures.Z[3] = [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
    ]; */

    this.figures.I = [];
    this.figures.I[0] = [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ];
    this.figures.I[1] = [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    this.figures.S = [];
    this.figures.S[0] = [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
    ];
    
    this.figures.S[1] = [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
    ];
    
    /*this.figures.S[2] = [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ];
    
    this.figures.S[3] = [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
    ];*/

    this.figures.J = [];
    this.figures.J[0] = [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ];
    
    this.figures.J[1] = [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ];
    
    this.figures.J[2] = [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ];
    
    this.figures.J[3] = [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
    ];

    this.figures.L = [];
    this.figures.L[0] = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ];
    
    this.figures.L[1] = [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
    ];
    
    this.figures.L[2] = [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ];
    
    this.figures.L[3] = [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ];

    this.figures.Q = [];
    this.figures.Q[0] = [
        [1, 1],
        [1, 1]
    ];

    this.figures.T = [];
    this.figures.T[0] = [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ];
    
    this.figures.T[1] = [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
    ];
    
    this.figures.T[2] = [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ];
    
    this.figures.T[3] = [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
    ];
};

MainGame.Game.prototype = {

    create: function() {
        
        //init variables
        this.initValues();
        
        //draw ui
        this.createUI();
    },

    initValues: function() {

        this.gameArea = [];
        this.gameAreaSprites = null;

        this.figureColor = 'red';
        this.figureForm = '';
        this.figureFormIndex = 0;
        this.figurePosition = { x: 2, y: 2 };
        this.activeFigureArray = null;
        this.activeFigure = null;
        this.nextActiveFigureSprite = null;
        this.nextActiveFigure = null;

        this.dropDelayTime = 500;
        this.dropDelayTimeRunning = 0;
        this.dropDelayDiff = 50;
        
        this.moveDelayTime = 150;
        this.moveDelayTimeRunning = 0;
        
        this.rotateDelayTime = 125;
        this.rotateDelayTimeRunning = 0;

        this.score = 0;
        this.gameState = 'initial';

        //Prepare game area
        for (y = 0; y < this.cellAreaH; y++) {
            this.gameArea[y] = [];
            for (x = 0; x < this.cellAreaW; x++) {
                this.gameArea[y][x] = '';
            }
        }

        // init keyboard inputs
        var cthis = this;
        this.game.input.keyboard.onUpCallback = function( e ){
            if(e.keyCode == Phaser.Keyboard.Z){
                cthis.rotateFigure('left');
            } else 
                if(e.keyCode == Phaser.Keyboard.X){
                    cthis.rotateFigure('right');
                }else 
                    if(e.keyCode == Phaser.Keyboard.DOWN){
                        cthis.dropFigureDown(true);
                    }
        }
        
        this.backgroundMusic = this.add.audio('backgroundMusic');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.3;
        
        this.beep = this.add.audio('beep');
        this.zap = this.add.audio('zap');
        this.zap2 = this.add.audio('zap2');
        
    },

    update: function() {

        //check keyboard press
        
        if (this.gameState === 'playing') {
            this.moveDelayTimeRunning += this.time.elapsed;
            this.dropDelayTimeRunning += this.time.elapsed;
            this.rotateDelayTimeRunning += this.time.elapsed;
            this.checkKeyboardInput();
            
            this.dropFigureDown();
        }
        

    },

    createFigure: function() {

        if (this.activeFigure !== null) {
            this.activeFigure.destroy();
            this.activeFigure = null;
        }

        this.figurePosition = { x: 3, y: -1 };
        var fig = this.nextActiveFigure;
        var figArr = this.figures[this.figuresList[fig]][0];
        var selectedColor = this.colors[fig];
        this.figureForm = this.figuresList[fig];
        this.figureFormIndex = 0;
        
        if(this.figuresList[fig] === "L" || this.figuresList[fig] === "J" || this.figuresList[fig] === "Q"){
            this.figurePosition.y = 0
        }
        
        this.activeFigure = this.add.sprite(
            this.margin.left + (this.figurePosition.x * this.cellW),
            this.margin.top + (this.figurePosition.y * this.cellH)
        );

        

        this.activeFigureArray = figArr;

        this.figureColor = selectedColor;

        this.activeFigure.x = this.margin.left + (this.figurePosition.x * this.cellW);
        this.activeFigure.y = this.margin.top + (this.figurePosition.y * this.cellH);

        //add all childs to active figure
        var xS = this.activeFigureArray.length;
        var yS = this.activeFigureArray.length;

        for (y = 0; y < yS; y++) {
            for (x = 0; x < xS; x++) {
                if (this.activeFigureArray[y][x] > 0) {
                    
                    var child = this.activeFigure.addChild(
                        this.game.make.sprite(
                            (this.cellW * x),
                            (this.cellH * y),
                            selectedColor + 'Tile'
                        )
                    );
                    
                    child.scale.setTo(this.cellW/this.originalSpriteW, this.cellH/this.originalSpriteH);
                }
                
            }
        }
        
        this.createNextFigure();
        
        itCollide = this.intersectCollide();
        
        if (itCollide) {
                this.gameState = "gameover";
                this.restartGame = true;
                this.digitalStartButton.inputEnabled = true;
                this.digitalStartButton.alpha = 1;
                
                this.youLoseSprite = this.add.sprite(this.world.centerX, this.world.centerY, 'youlose');
                this.youLoseSprite.anchor.setTo(0.5,0.5);
                this.youLoseSprite.alpha = 1;
                this.youLoseSprite.z = 1000;
                this.backgroundMusic.pause();
                return false;
        }


    },
    
    createNextFigure: function() {

        if (this.nextActiveFigureSprite !== null) {
            this.nextActiveFigureSprite.destroy();
            this.nextActiveFigureSprite = null;
            this.nextActiveFigure = null;
        }
        
        
        var fig = Math.floor((Math.random() * this.figuresList.length));
        var figArr = this.figures[this.figuresList[fig]][0];
        var selectedColor = this.colors[fig];
        
        this.nextActiveFigure = fig;
        
        this.nextActiveFigureSprite = this.add.sprite(
            700,
            75
        );
        
        //add all childs to active figure
        var xS = figArr.length;
        var yS = figArr.length;
        
        for (y = 0; y < yS; y++) {
            for (x = 0; x < xS; x++) {
                if (figArr[y][x] > 0) {
                    
                    var child = this.nextActiveFigureSprite.addChild(
                        this.game.make.sprite(
                            (this.cellW * x),
                            (this.cellH * y),
                            selectedColor + 'Tile'
                        )
                    );
                    
                    child.scale.setTo(this.cellW/this.originalSpriteW, this.cellH/this.originalSpriteH);
                }
                
            }
        }
        
        
    },
    
    renderGameArea: function(){
        
        if(this.gameState !== 'playing'){
            return false;
        }
        
        if (this.gameAreaSprites !== null) {
            this.gameAreaSprites.destroy();
            this.gameAreaSprites = null;
        }
        
        this.gameAreaSprites = this.add.sprite(
            this.margin.left,
            this.margin.top
        );
        

        for (y = 0; y < this.cellAreaH; y++) {
            for (x = 0; x < this.cellAreaW; x++) {
                if ( this.gameArea[y][x] != '') {
                    var child = this.gameAreaSprites.addChild(
                        this.game.make.sprite(
                            (this.cellW * x),
                            (this.cellH * y),
                            this.gameArea[y][x] + 'Tile'
                        )
                    );
                    
                    child.scale.setTo(this.cellW/this.originalSpriteW, this.cellH/this.originalSpriteH);
                }
            }
        }
    },
    
    storeFigure: function() {
        
        xLength = this.activeFigureArray.length;
        yLength = this.activeFigureArray.length;

        itCollide = false;
        for (y = 0; y < yLength; y ++ ) {
            for (x = 0; x < xLength; x ++ ) {
                if (this.activeFigureArray[y][x] === 1) {
                    this.gameArea[this.figurePosition.y+y][this.figurePosition.x+x] = this.figureColor;
                }
            }
        }
        
    },
    
    checkFullRows: function() {
        
        var removeValFromIndex = [];
        
        for (y = 0; y < this.cellAreaH; y++) {
            var canDeleteRow = true;
            for (x = 0; x < this.cellAreaW; x++) {
                if (this.gameArea[y][x] === '') {
                    canDeleteRow = false;
                }
            }
            
            if (canDeleteRow) {
                removeValFromIndex.push(y);
                this.score += 100;
            }
        }
        
        for (var i = removeValFromIndex.length -1; i >= 0; i--) {
            this.gameArea.splice(removeValFromIndex[i],1);
        }
        
        for (var i = 0; i < removeValFromIndex.length; i++) {
            this.gameArea.unshift(['','','','','','','','','','']);
        }
        
        if (removeValFromIndex.length > 0) {
            this.zap2.play();
            this.scoreText.setText("Score: " + this.score);
        }
        
    },

    checkKeyboardInput: function() {
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            this.moveFigure('left');
        }
        else
            if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                this.moveFigure('right');
            }else
                if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN))
                {
                    this.moveFigure('down');
                }
    },
    
    moveFigure: function(direction){
        
        if (this.gameState !== 'playing') {
            return true;
        }
        
        var oldPosition = {
            x: this.figurePosition.x,
            y: this.figurePosition.y
        }
        
        if(direction === "left"){
            if (this.moveDelayTimeRunning < this.moveDelayTime) {
                return true;
            }else{
                this.moveDelayTimeRunning = 0;
            }
            
            this.figurePosition.x -= 1;
        }
        
        if(direction === "right"){
            if (this.moveDelayTimeRunning < this.moveDelayTime) {
                return true;
            }else{
                this.moveDelayTimeRunning = 0;
            }
            
            this.figurePosition.x += 1;
        }
        
        if(direction === "down"){
            if (this.moveDelayTimeRunning < this.moveDelayTime) {
                return true;
            }else{
                this.moveDelayTimeRunning = 0;
            }
            
            this.figurePosition.y += 1;
        }
        
        //check bound collides
        itCollide = this.checkBoundCollide();

        if (itCollide) {
            this.figurePosition.x = oldPosition.x;
            this.figurePosition.y = oldPosition.y;
        }
        
        //check intersect collide
        itCollide = this.intersectCollide();
        
        if (itCollide) {
            this.figurePosition.x = oldPosition.x;
            this.figurePosition.y = oldPosition.y;
        }
        
        this.activeFigure.x = this.margin.left + (this.figurePosition.x * this.cellW);
        this.activeFigure.y = this.margin.top + (this.figurePosition.y * this.cellH);
        
        this.beep.play();
    },
    
    checkBoundCollide: function(){
        
        itCollidesMin = 100000;
        itCollidesMax = -1;
        itCollide = false;
        
        xLength = this.activeFigureArray.length;
        yLength = this.activeFigureArray.length;
        
        for (y = 0; y < yLength; y ++ ) {
            for (x = 0; x < xLength; x ++ ) {
                if (this.activeFigureArray[y][x] === 1) {
                    if (x < itCollidesMin) {
                        itCollidesMin = x;
                    }
                    
                    if (x > itCollidesMax) {
                        itCollidesMax = x;
                    }
                }
            }
        }
        
        //check left
        if ( (this.figurePosition.x + itCollidesMin) < 0) {
            itCollide = true;
        }
        
        if ((this.figurePosition.x + itCollidesMax) >= this.cellAreaW) {
            itCollide = true;
        }
        
        return itCollide;
        
    },
    
    checkDropCollide: function (){
        xLength = this.activeFigureArray.length;
        yLength = this.activeFigureArray.length;

        itCollide = false;
        for (y = 0; y < yLength; y ++ ) {
            for (x = 0; x < xLength; x ++ ) {
                if (this.activeFigureArray[y][x] === 1) {
                    if ((this.figurePosition.y+y+1) >= this.cellAreaH) {
                        itCollide = true;
                    }else
                        if (this.gameArea[this.figurePosition.y+y] !== undefined) {
                            if (this.gameArea[this.figurePosition.y+y+1][this.figurePosition.x+x] !== ''){
                                itCollide = true;
                            }
                        }
                }
            }
        }
        
        return itCollide;
    },
    
    intersectCollide: function(){
        xLength = this.activeFigureArray.length;
        yLength = this.activeFigureArray.length;

        itCollide = false;
        for (y = 0; y < yLength; y ++ ) {
            for (x = 0; x < xLength; x ++ ) {
                if (this.activeFigureArray[y][x] === 1) {
                    if ((this.figurePosition.y+y) >= this.cellAreaH) {
                        itCollide = true;
                    }else
                        if (this.gameArea[this.figurePosition.y+y] !== undefined) {
                            if (this.gameArea[this.figurePosition.y+y][this.figurePosition.x+x] !== ''){
                                itCollide = true;
                            }
                        }
                    
                    
                }
            }
        }
        
        return itCollide;
    },
    
    rotateFigure: function(direction){
        
        if (this.gameState !== 'playing') {
            return true;
        }

        if (this.activeFigure !== null) {
            this.activeFigure.destroy();
            this.activeFigure = null;
        }

        this.activeFigure = this.add.sprite(
            this.margin.left + (this.figurePosition.x * this.cellW),
            this.margin.top + (this.figurePosition.y * this.cellH)
        );

        this.activeFigure.x = this.margin.left + (this.figurePosition.x * this.cellW);
        this.activeFigure.y = this.margin.top + (this.figurePosition.y * this.cellH);
        
        if (direction === 'right') {
            this.figureFormIndex += 1;
        }else if (direction === 'left') {
            this.figureFormIndex -= 1;
        }
        
        if (this.figureFormIndex < 0){
            this.figureFormIndex = this.figures[this.figureForm].length -1;
        } else if (this.figureFormIndex >= (this.figures[this.figureForm].length)){
            this.figureFormIndex = 0;
        }
        
        oldFigureArray = this.activeFigureArray;
        this.activeFigureArray = this.figures[this.figureForm][this.figureFormIndex];
        
        itCollide = this.checkBoundCollide();
        
        itCollide2 = this.checkDropCollide();
        
        if (itCollide || itCollide2) {
            this.activeFigureArray = oldFigureArray;
        }

        var xS = this.activeFigureArray.length;
        var yS = this.activeFigureArray.length;

        for (y = 0; y < yS; y++) {
            for (x = 0; x < xS; x++) {
                if (this.activeFigureArray[y][x] > 0) {
                    
                    var child = this.activeFigure.addChild(
                        this.game.make.sprite(
                            (this.cellW * x),
                            (this.cellH * y),
                            this.figureColor + 'Tile'
                        )
                    );
                    
                    child.scale.setTo(this.cellW/this.originalSpriteW, this.cellH/this.originalSpriteH);
                }
                
            }
        }
        
        this.beep.play();
    },
    
    dropFigureDown: function(bypass = false){
        
        if (this.gameState !== 'playing') {
            return true;
        }
        
        if (this.dropDelayTimeRunning < this.dropDelayTime && bypass === false) {
            return true;
        }
        
        if(this.dropDelayTimeRunning > this.dropDelayTime || bypass === true){
            this.dropDelayTimeRunning = 0;
            
            itCollide = this.checkDropCollide();
        
            if (itCollide){
                this.zap.play();
                //store tiles
                this.storeFigure();
                //check row delete
                this.checkFullRows();
                //create new
                this.createFigure();
                //render game area again
                this.renderGameArea();
                return true;
            }
            
        }
        
        this.figurePosition.y += 1;
        
        this.activeFigure.x = this.margin.left + (this.figurePosition.x * this.cellW);
        this.activeFigure.y = this.margin.top + (this.figurePosition.y * this.cellH);
    },

    createBoundaries: function() {

    },

    createUI: function() {
        
        // Create background
        this.uiGameArea = this.add.sprite(
            this.margin.left,
            this.margin.top
        );

        for (y = 0; y < this.cellAreaH; y++){
            for (x = 0; x < this.cellAreaW; x++){
                var child = this.uiGameArea.addChild(
                        this.game.make.sprite(
                            (this.cellW * x),
                            (this.cellH * y),
                            'backTile'
                        )
                    );
                    
                child.scale.setTo(this.cellW/this.originalSpriteW, this.cellH/this.originalSpriteH);
            }
        }
        
        //set scores and speed
        var style = {
                align: "center",
                font: "bold 32px Arial",
                fill: "#FFF",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
        this.scoreText = this.add.text(20, 40, "Score: " + this.score, style);
        
        this.necxtText = this.add.text(650, 40, "NEXT FIGURE", style);
        
        //pad buttons
        this.digitalPadUp = this.add.sprite(100, this.world.height-310, 'digitalPadUp');
        this.digitalPadUp.direction = "up";
        this.digitalPadUp.inputEnabled = true;
        this.digitalPadUp.events.onInputDown.add(this.digitalPadTouched, this);
        
        this.digitalPadDown = this.add.sprite(100, this.world.height-190, 'digitalPadDown');
        this.digitalPadDown.direction = "down";
        this.digitalPadDown.inputEnabled = true;
        this.digitalPadDown.events.onInputDown.add(this.digitalPadTouched, this);
        
        this.digitalPadRight = this.add.sprite(150, this.world.height-240, 'digitalPadRight');
        this.digitalPadRight.direction = "right";
        this.digitalPadRight.inputEnabled = true;
        this.digitalPadRight.events.onInputDown.add(this.digitalPadTouched, this);
        
        this.digitalPadLeft = this.add.sprite(35, this.world.height-240, 'digitalPadLeft');
        this.digitalPadLeft.direction = "left";
        this.digitalPadLeft.inputEnabled = true;
        this.digitalPadLeft.events.onInputDown.add(this.digitalPadTouched, this);
        
        //rotation buttons
        this.digitalPadRotateR = this.add.sprite(800, this.world.height-240, 'digitalPadRotateR');
        this.digitalPadRotateR.rotation = "right";
        this.digitalPadRotateR.inputEnabled = true;
        this.digitalPadRotateR.events.onInputDown.add(this.digitalRotateTouched, this);
        
        this.digitalPadRotateL = this.add.sprite(650, this.world.height-240, 'digitalPadRotateL');
        this.digitalPadRotateL.rotation = "left";
        this.digitalPadRotateL.inputEnabled = true;
        this.digitalPadRotateL.events.onInputDown.add(this.digitalRotateTouched, this);
        
        
        //start button
        this.digitalStartButton = this.add.sprite(20, this.world.height-580, 'digitalStartButton');
        this.digitalStartButton.inputEnabled = true;
        this.digitalStartButton.events.onInputDown.add(this.digitalStartTouched, this);
        
        this.renderGameArea();

    },

    digitalRotateTouched: function(digitalPad) {
        this.rotateFigure(digitalPad.rotation);
    },
    
    digitalPadTouched: function(digitalPad) {
        this.moveFigure(digitalPad.direction);
    },

    digitalStartTouched: function(button) {
        
        if(this.restartGame === true && this.gameState === "gameover"){
            this.restartGame = false;
             this.state.start('Game');
             
            return;
        }
        
        this.digitalStartButton.inputEnabled = false;
        this.digitalStartButton.alpha = 0;
        
        this.createNextFigure();
        this.createFigure();
        this.gameState = 'playing';
        this.backgroundMusic.play();
    },

    render: function() {

        /*var rect = new Phaser.Rectangle(
            this.margin.left,
            this.margin.top,
            (this.cellW * (this.cellAreaW)),
            (this.cellH * (this.cellAreaH))
        );
        this.game.debug.geom(rect, 'rgba(255,0,0,0.2)');*/
    }

};
