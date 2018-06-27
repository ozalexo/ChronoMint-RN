To build develop version with external dependencies, please copy the file 'docs/waves-api.js' to ..ChronoMint/node_modules/@waves/waves-api/dist/waves-api.js
 (overwrite) and modify ChronoMint/node_modules/@waves/waves-api/package.json:
 -   "main": "dist/waves-api.min.js",
 +   "main": "dist/waves-api.js",
