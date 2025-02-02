class Customer extends DynamicComponent {
    constructor(id) {
        // common with DynamicComponent
        var w = 180;
        var h = 180;
        var x = -100; // outsite the canvas
        var y = 780; // same value as lobby.y + distanceFromTopCarpet => aligned with the red carpet for its entry
        var iX = 420; // lobby.x + lobby.w + minimumDistanceFromRightBorder + 20
        var iY = y;
        var name = `customer` + id;
        var status = `isEnteringTheRestaurant`;

        super(w,h,x,y,iX,iY,id,name,status); // push to DynamicComponent

        // specific to customer
        const customerImage = document.createElement('img');
        customerImage.onload = () => {
          this.image = customerImage;
          this.imageW = 3200;
          this.imageH = 800;
          this.imageCols = 8;
          this.imageRows = 2;
          this.spriteX = 0;
          this.spriteY = 0;
          this.spriteW = this.imageW / this.imageCols;
          this.spriteH = this.imageH / this.imageRows;
        }
        customerImage.src = './img/customer.png';
        
        this.favoriteDish = this.chooseDish();
        this.animated = false;
        this.currentAnimationFrame = 0;
        this.animationCounter = 0;
        const bubbleImage = document.createElement('img');
        bubbleImage.onload = () => {
            this.bubbleImage = bubbleImage;
        }
        bubbleImage.src = './img/bubble.png';
    }

    draw() {
        if (!this.image) return; // if `this.img` is not loaded yet => don't draw

        const updateFrame = () => {
            this.currentAnimationFrame = ++(this.currentAnimationFrame) % this.imageCols;
            this.spriteX = this.currentAnimationFrame * this.spriteW;
            if(this.direction === `right`) {
                this.spriteY = 1 * this.spriteH; // tail left position
            } else {
                this.spriteY = 0 * this.spriteH; // tail right position
            }
        }

        if(frames % 300 === 0) {
            this.animated = true;
        }

        if(this.animated) { 
            if(frames % 3 === 0) { // if animated, sprints
                updateFrame();
                this.animationCounter++;
                if(this.animationCounter === this.imageCols) {
                    this.animated = false;
                    this.animationCounter = 0;
                }
            }
        } else { // if not animated, just change tail position according to the direction
            if(this.direction === `right`) {
                this.spriteY = 1 * this.spriteH; // tail left position
            } else {
                this.spriteY = 0 * this.spriteH; // tail right position
            }
        }

        ctx.drawImage(this.image, this.spriteX, this.spriteY, this.spriteW, this.spriteH, this.x-this.w/2, this.y-this.h/2, this.w, this.h);
    }

    chooseDish() {
        var randomIndex = Math.floor(Math.random() * menu.length);
        return menu[randomIndex];
    }

    callWaiter() {
        // bubble
        var bubbleW = 150;
        var bubbleH = 150;
        var bubbleX = this.x + bubbleW/4;
        var bubbleY = this.y - bubbleH;

        if (!this.bubbleImage) return;

        ctx.drawImage(this.bubbleImage, bubbleX, bubbleY, bubbleW, bubbleH);
        ctx.font = "bold 30px Open Sans";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("meow!", bubbleX+75, bubbleY+80);
    }

    showOrderedDish() {
        // bubble
        var bubbleW = 150;
        var bubbleH = 150;
        var bubbleX = this.x + bubbleW/4;
        var bubbleY = this.y - bubbleH;

        // ordered dish
        var orderedDishW = 100;
        var orderedDishH = 100;
        var orderedDishX = this.x + bubbleW/2 - 10;
        var orderedDishY = this.y - bubbleH + 20;
        var orderedDishSpriteX = 0;
        var orderedDishSpriteY = 0;
        var orderedDishSpriteW = 200;
        var orderedDishSpriteH = 200;

        const orderedDishImage = document.createElement('img');
        orderedDishImage.onload = () => {
        }
        orderedDishImage.src = './img/bowl.png';

        // display both
        if (!this.bubbleImage) return;
        if (!orderedDishImage) return;

        switch(this.favoriteDish.name) {
            case `Chocolate Milkshake` :
                orderedDishSpriteY = 0 * orderedDishSpriteH;
                break;
            case `Strawberry Milkshake` :
                orderedDishSpriteY = 1 * orderedDishSpriteH;
                break; 
            case `Vanilla Milkshake` :
                orderedDishSpriteY = 2 * orderedDishSpriteH;
                break;           
        }

        ctx.drawImage(this.bubbleImage, bubbleX, bubbleY, bubbleW, bubbleH);
        ctx.drawImage(orderedDishImage, orderedDishSpriteX, orderedDishSpriteY, orderedDishSpriteW, orderedDishSpriteH, orderedDishX, orderedDishY, orderedDishW, orderedDishH);
    }
}