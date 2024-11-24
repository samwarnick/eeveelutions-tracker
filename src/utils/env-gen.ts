console.log("Generating .env...");

await Bun.write(".env", `POKEMON_TCG_TOKEN=${Bun.env.POKEMON_TCG_TOKEN}`);