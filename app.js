// initialize global variables
let app = undefined;
let player = undefined;


window.onload = function() {
    // Creates renderer, creates stage, and starts ticker for updating
    let app = new PIXI.Application(
        {
            width: 1920,
            height: 1080,
            backgroundColor: "darkBlue"
        }
    );

    document.body.appendChild(app.view);

    // load player sprite as PNG asynchronously
    let player = PIXI.Sprite.from('protagonist.png');
    // add player sprite to stage container - the root display container that's rendered
    app.stage.addChild(player);

    // set player's origin spot and position based on view
    player.anchor.set(0.5, 0.5)
    player.x = app.view.width / 2;
    player.y = app.view.height - 100;
    
    // Make the player smaller
    player.width = 150;
    player.height = 150;

    // load enemy sprites
    let enemy = PIXI.Sprite.from('antagonist.png');
    app.stage.addChild(enemy);
    enemy.width = 600;
    enemy.height = 600;

    // var to count seconds demo has ran
    let elapsed = 0.0;
    // load fleet
    for (let i = 0; i < 10; ++i) {
        let fleet = PIXI.Sprite.from('fleet.png');
        fleet.position.set(i * 180, 400 - (i * 50));
        app.stage.addChild(fleet);
        app.ticker.add((delta) => {
            elapsed += delta;
            fleet.x = (i * 180) + Math.cos(elapsed/200.0) * 100.0;
            fleet.y = (400 - (i * 50)) + Math.sin(elapsed/100.0) * 100.0;
        })
    }
        
    
    // have app run new callback every frame, passing in time difference/frame
    // app.ticker.add((delta) => {
    //     // Add frame-time to elapsed
    //     elapsed += delta;
    //     // Update player x pos, based on cos(elapsed time / 50.0) to slow animation
    //     // moves from -100 (left) to 1640 (right)
    //     player.x = app.view.width / 2 + Math.cos(elapsed/50.0) * 100.0;
    //     // moves from 800 (bottom) to -90 (top)
    //     player.y = app.view.height / 2 + Math.sin(elapsed/50.0) * 100.0;
    // }); // ticker is for doing render updates
    
    // Add event listener for arrow keys
    window.addEventListener("keydown", function(e) {
        keyHandler(e);
    });

    function keyHandler(e) {
        if (e.defaultPrevented) {
            return; // Do nothing if event already handled
        }
    
        switch (e.code) {
            case "ArrowLeft":
                player.x -=25;
                break;
            case "ArrowRight":
                player.x +=25;
                break;
            case "ArrowUp":
                player.y -=25;
                break;
            case "ArrowDown":
                player.y +=25;
                break;
            default:
                return; // Do nothing if event has nothing to handle              
        }
    
        // to prevent event from being handled twice
        e.preventDefault();
    }
};