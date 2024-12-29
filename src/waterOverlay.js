import { Texture, TilingSprite } from "pixi.js";

let overlay;

export function addWaterOverlay(app)
{
    const texture = Texture.from("overlay");

    overlay = new TilingSprite({
        texture,
        width: app.screen.width,
        height: app.screen.height
    });

    app.stage.addChild(overlay);
}

export function animateWaterOverlay(app, time)
{
    const delta = time.deltaTime;

    overlay.tilePosition.x -= delta;
    overlay.tilePosition.y -= delta;

    console.log("animateWaterOverlay -> ", time);

}
