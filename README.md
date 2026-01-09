# Paimon's Sticker Stash
![Paimon: Ship out!](public/stickers/set_1/Icon_Emoji_Paimon's_Paintings_01_Paimon_2.webp)

[Paimon's Sticker Stash](https://paimons-sticker-stash.netlify.app) is basically a consolidated stash of stickers from the hit video game *Genshin Impact*, scraped from the [Fandom Wiki](https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki). It supports text search for sticker titles, and groups stickers by Paimon's Painting sets and by character.

The Sticker Stash also supports favouriting stickers for quick access (stored in browser LocalStorage), and since stickers are just images, you can copy them to use in messaging software like Discord or whatever. It also (theoretically) supports a [public API](https://paimons-sticker-stash.netlify.app/api) to query sticker data. Or you can just steal `stickers.db` and the `images/stickers` folder from this repository.

## Setup
This repo is a monorepo (?) which contains the Python scraper and the NextJS files for Paimon's Sticker Stash.

The Python scraper is triggered on a schedule via GitHub Actions. The scraper will look for any new stickers in tne latest *numerical* set, updating `stickers.db` database and downloading the images to `images/stickers/set_{name}/{image_name}`, then commit and push changes to the repo. The NextJS frontend and API routes works with `stickers.db` via Prisma ORM to read data from the database.

### Frontend (NextJS)
If for any reason you want to run Paimon's Sticker Stash locally on your machine, simply:
1. Clone the repository.
2. Install dependencies with `npm install` or whichever command it was
3. Generate Prisma ORM client:
   - Technically, I should've included the `.env` but whatever. Just create one in the project root with `DATABASE_URL="file:./stickers.db"`.
   - Run `npx prisma generate` to generate the client.
4. `npm run dev` and it should appear on `localhost:3000`.

### Python Scraper
If for any reason you want to run the... *questionably*-built Python scraper held together by hopes and dreams, the files are all located under `scraper`.
1. Clone the repository.
2. Install requirements `pip install -r ./scraper/requirements.txt` or something like that
3. Should be able to run the scraper now.
