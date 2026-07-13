here we created a demo project. 
commands => 
npm init -y (also give me commands for bun)
npm i typescript 
npx tsc --init (runs the ts compiler to create the default tsconfig.json file)

then create 2 folders src and dist . for writing code and then build it 

npx tsc (its builds the project and then created the .map and .d.ts files in the dist folder, along with the emmited .js file) 

node dist/index will execute our code.

then u can setup 2 scripts in package.json file:
    "start": "node dist/index",
    "dev":"npx tsc"
for easier execution