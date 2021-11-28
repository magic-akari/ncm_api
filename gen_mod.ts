const output: string[] = [];

for (const file of Deno.readDirSync("./src")) {
  const { name } = file;
  if (!name.startsWith("_")) {
    output.push(`export * from "./src/${name}";\n`);
  }
}

output.sort();

Deno.writeTextFileSync("mod.ts", output.join(""));
