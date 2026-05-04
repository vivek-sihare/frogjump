// ❌ Lose condition
info.onLifeZero(function () {
    game.over(false, effects.melt)
})
// ⭐ Collect lily pad
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(2)
    otherSprite.destroy(effects.hearts, 100)
})
// 💥 Hit by car
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    frog.setPosition(80, 110)
    otherSprite.destroy(effects.fire, 100)
})
let lily: Sprite = null
let car: Sprite = null
let frog: Sprite = null
// 🐸 Create frog (player)
frog = sprites.create(img`
    . . . . . 
    . 5 5 5 . 
    5 2 5 2 5 
    5 . 2 . 5 
    . 5 5 5 . 
    `, SpriteKind.Player)
controller.moveSprite(frog, 100, 100)
frog.setPosition(80, 110)
// ❤️ Lives & Score
info.setLife(3)
info.setScore(0)
// 🌊 Background (river + road)
scene.setBackgroundImage(img`
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `)
// 🌊 Water danger (top area check)
game.onUpdate(function () {
    if (frog.y < 40) {
        info.changeLifeBy(-1)
        frog.setPosition(80, 110)
    }
})
// 🏁 Win condition (reach top safely)
game.onUpdate(function () {
    if (frog.y < 10) {
        game.over(true, effects.confetti)
    }
})
// 🚗 Cars (road obstacles)
game.onUpdateInterval(1500, function () {
    car = sprites.create(img`
        1 1 1 
        1 . 1 
        1 1 1 
        `, SpriteKind.Enemy)
    car.setPosition(0, randint(60, 100))
    car.setVelocity(50, 0)
    car.setFlag(SpriteFlag.AutoDestroy, true)
})
// 🟢 Lily pads (bonus)
game.onUpdateInterval(3000, function () {
    lily = sprites.create(img`
        . 1 . 
        1 1 1 
        . 1 . 
        `, SpriteKind.Food)
    lily.setPosition(randint(10, 150), randint(20, 50))
    lily.setFlag(SpriteFlag.AutoDestroy, true)
})
