//JacMan by Nathan Spring, May 27, '19
//Dedicated to my son Jack

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: {y: 300},
        debug: false
    }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
  
};


var player;
var stars;
var platforms;
var bombs;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var instructText;

var game = new Phaser.Game(config);
//Preload game elements to be used by Create function.
function preload ()
{
  this.load.image('sky', 'asset/bg.jpg');
  this.load.image('ground', 'asset/platform.png');
  this.load.image('star', 'asset/star.png');
  this.load.image('ghost', 'asset/ghost.png');
  this.load.spritesheet('jacman', 'asset/jacman.png', { frameWidth: 32, frameHeight: 48 });
}

//Create Elements 
function create ()
{
  this.add.image(400, 300, 'sky');
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  player = this.physics.add.sprite(10, 450, 'jacman');
  player.setBounce(0.1);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('jacman', {start: 0, end: 3}),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [ {key: 'jacman', frame: 4} ],
    frameRate: 20
  });
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('jacman', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});

cursors = this.input.keyboard.createCursorKeys();

stars = this.physics.add.group({
  key: 'star',
  repeat: 11,
  setXY: { x: 12, y: 0, stepX: 70 }
});

stars.children.iterate(function (child) {

  child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

});

bombs = this.physics.add.group();

//  The score
scoreText = this.add.text(16, 16, 'SCORE: 0', { fontSize: '32px', fill: 'yellow' });
instructText = this.add.text(16, 45, 'Left/Right: Arrows, Jump: Shift', { fontSize: '16px', fill: 'yellow' });

this.physics.add.collider(player, platforms);
this.physics.add.collider(stars, platforms);
this.physics.add.collider(bombs, platforms);

this.physics.add.overlap(player, stars, collectStar, null, this);
this.physics.add.collider(player, bombs, hitBomb, null, this);

}
//Used to update canvas with player movement, star collection, 
function update ()
{
  if (gameOver)
  {
      return;
  }

  if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.shift.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
}

function collectStar (player, star)
{
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('SCORE: ' + score);

    if (stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'ghost');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;

    this.scene.restart();

}