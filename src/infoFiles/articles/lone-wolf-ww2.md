Lone Wolf: WW2 is an arcade-style aerial combat game set in World War 2, where players take on the role of an RAF pilot flying missions across a campaign. My brother and I developed it together over the course of 2020, working in Unity and C#, and released it on Steam.

## Development Context

We built Lone Wolf during the 2020 lockdowns—I was in Year 9 at the time, and my brother was in Year 11. While we'd made small games together before, this was our first attempt at a large-scale project. Development took approximately a year of grinding sessions, learning as we went.

I handled all the visual art—creating detailed pixel art for every asset that appears on screen, including aircraft, environments, UI elements, and even the custom font. I also contributed to level design and some gameplay programming. My brother focused on the core programming and technical systems.

## The 2.5D Challenge

The game uses an unconventional 2.5D perspective inspired by Blue Max on the Commodore 64. The player's plane travels diagonally across the screen from bottom-left to top-right, with the camera following along. The player controls vertical and lateral movement while forward momentum remains constant.

This diagonal movement created a significant technical challenge: collision detection in this skewed perspective doesn't map cleanly to Unity's standard physics systems. We had to develop a custom collision system that could accurately handle interactions between the player, terrain, enemies, and projectiles within this unusual coordinate space. Getting bullets, obstacles, and enemy aircraft to behave correctly required considerable iteration.

## Game Features

Players progress through a mission-based campaign with varied objectives, flying different historical aircraft that can be unlocked and upgraded throughout the game. The upgrade system allows players to improve their plane's capabilities, and the game maintains a balance between arcade accessibility and WW2 historical setting.

## Reception and Learnings

The game wasn't a financial success, but it was an invaluable educational project. The players who did discover it left positive reviews, and finding YouTube videos of strangers genuinely enjoying the game was a rewarding moment—proof that we'd created something people wanted to play.

Building a complete commercial game from scratch taught us far more than any tutorial could. We learned about scope management, the complexities of game feel and balance, Steam integration, handling a full development cycle from concept to release, and most importantly, how to collaborate effectively on a long-term technical project.

Lone Wolf: WW2 remains available on [Steam](https://store.steampowered.com/app/1399180/Lone_Wolf_World_War_2/), representing both a technical achievement and a formative development experience built during an unusual year.
