# Animal Crossing Memory Card Game
This is a memory card game inspired by Animal Crossing. Players must click on every unique villager card, with the cards shuffling after each selection. The game tests players' memory and observation skills.

[Link to project](https://a65e09fe.animal-crossing-memory-game.pages.dev/)

***Built using: React, HTML, CSS, Cloudflare Worker, and Nookiepedia API***

## Features
* Fetches villager data through a proxy API implemented as a Cloudflare Worker, with caching of the response data.
* Randomized card shuffling after every move using the Durstenfeld shuffle algorithm
* Simple and intuitive design for a fun and engaging experience

## How to run
1. Clone the repo
```bash
git clone https://github.com/smyler3/Animal-Crossing-Memory-Game.git
cd Animal-Crossing-Memory-Game
```
2. Install dependencies
```bash
npm install
```

3. Start dev server
```bash
npm run dev
```

## Acknowledgements
* All resources queried from [Nookiepedia API](https://api.nookipedia.com/)
* All characters, names, and related content used in this project are the property of their respective owners. This project is not affiliated with, endorsed by, or sponsored by Nintendo. All trademarks and copyrights belong to their original creators
