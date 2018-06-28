const path = require('path')
const fs = require('fs')

const extraCustomNodeModules = {
  "_stream_transform": require.resolve('readable-stream/transform'),
  "crypto": require.resolve('react-native-crypto'),
  "fs": require.resolve('react-native-level-fs'),
  "http": require.resolve('react-native-http'),
  "https": require.resolve('https-browserify'),
  "net": require.resolve('react-native-tcp'),
  "os": require.resolve('react-native-os'),
  "path": require.resolve('path-browserify'),
  "stream": require.resolve('stream-browserify'),
  "tls": require.resolve('./'),
  "transform-es3-member-expression-literals": require.resolve('babel-plugin-transform-es3-member-expression-literals'),
  "transform-es3-property-literals": require.resolve('babel-plugin-transform-es3-property-literals'),
  "vm": require.resolve('vm-browserify'),
  "zlib": require.resolve('browserify-zlib'),
  "uuid/v1": require.resolve('react-native-uuid')
}

// As the metro bundler does not support linking correctly, we add additional
// search path queries to all modules.
const extraNodeModulesGetter = {
  get: (target, name) => {
    if (extraCustomNodeModules.hasOwnProperty(name)) {
      return extraCustomNodeModules[name];
    } else {
      return path.join(process.cwd(), `node_modules/${name}`);
    }
  },
};

// Get blacklist factory
try {
  blacklist = require('metro-bundler/src/blacklist');
} catch (e) {
  blacklist = require('metro/src/blacklist');
}

module.exports = {
  extraNodeModules: new Proxy({}, extraNodeModulesGetter),
  getBlacklistRE: function () {
    //Add whatever you need to the blacklist for your project
    return blacklist([
      /node_modules\/crypto\/.*/
    ])
  },
  getProjectRoots () {
    return [
      __dirname,
      path.resolve(fs.realpathSync('node_modules/@chronobank/core')),
      path.resolve(fs.realpathSync('node_modules/@chronobank/login')),
    ]
  },
  getSourceExts: () => [ 'jsx' ],
}

// const path = require('path');
// const fs = require('fs');

// let blacklist,
//     getPolyfills;

// // Get blacklist factory
// try {
//   blacklist = require('metro-bundler/src/blacklist');
// } catch(e) {
//   blacklist = require('metro/src/blacklist');
// }

// // Get default react-native polyfills
// try {
//   getPolyfills = require('react-native/rn-get-polyfills');
// } catch(e) {
//   getPolyfills = () => [];
// }

// // See if project has custom polyfills, if so, include the path to them
// try {
//   let customPolyfills = require.resolve('./polyfills.js');
//   getPolyfills = (function(originalGetPolyfills) {
//     return () => originalGetPolyfills().concat(customPolyfills);
//   })(getPolyfills);
// } catch(e) {}

// const moduleBlacklist = [
//   //Add whatever you need to the blacklist for your project
//   /node_modules[^\/]+\/.*/
// ];

// const baseModulePath = path.resolve(__dirname, 'node_modules/@chronobank');

// // NOTE: Scoped modules hasn't been fully tested yet. Please respond to
// // let th317erd know if this code works with scoped modules
// function getSymlinkedModules() {
//   function checkModule(fileName, alternateRoots) {
//     try {
//       let fullFileName = path.join(baseModulePath, fileName),
//           stats = fs.lstatSync(fullFileName);
//       console.log('> IsSym> ', fullFileName, stats.isSymbolicLink())
//       if (stats.isSymbolicLink()) {
//         let realPath = fs.realpathSync(fullFileName);
//         if (realPath.substring(0, (__dirname).length) !== __dirname)
//           alternateRoots.push(realPath);
//       }
//     } catch (e) {}
//   }

//   function checkAllModules(modulePath, alternateRoots) {
//     console.log('Found alternates:', alternateRoots)
//     var stats = fs.lstatSync(modulePath);
//     if (!stats.isDirectory())
//       return alternateRoots;

//     fs.readdirSync(modulePath).forEach((fileName) => {
//       if (fileName.charAt(0) === '.')
//         return;

//       if (fileName.charAt(0) !== '@')
//         checkModule(fileName, alternateRoots);
//       else
//         checkAllModules(path.join(modulePath, fileName), alternateRoots);
//     });

//     return alternateRoots;
//   }

//   // return checkAllModules(baseModulePath, []);
//   const res = checkAllModules(baseModulePath, []);
//   console.log('Alternate modules: ', res)
//   return res
// }

// function getExtraModulesForAlternateRoot(fullPath) {
//   var packagePath = path.join(fullPath, 'package.json'),
//       packageJSON = require(packagePath),
//       alternateModules = [].concat(Object.keys(packageJSON.dependencies || {}), Object.keys(packageJSON.devDependencies || {}), Object.keys(packageJSON.peerDependencies || {})),
//       extraModules = {};

//   for (var i = 0, il = alternateModules.length; i < il; i++) {
//     var moduleName = alternateModules[i];
//     extraModules[moduleName] = path.join(baseModulePath, moduleName);
//   }

//   return extraModules;
// }

// //alternate roots (outside of project root)
// var alternateRoots = getSymlinkedModules(),
// //resolve external package dependencies by forcing them to look into path.join(__dirname, "node_modules")
//     extraNodeModules = alternateRoots.reduce((obj, item) => {
//       Object.assign(obj, getExtraModulesForAlternateRoot(item));
//       return obj;
//     }, {});
//     extraNodeModules = {
//       ...extraNodeModules,
//       ...customExtraNodeModules
//     }

// console.log(extraNodeModules)

// if (alternateRoots && alternateRoots.length)
//   console.log('Found alternate project roots: ', alternateRoots);

// module.exports = {
//   getBlacklistRE: function() {
//     return blacklist(moduleBlacklist);
//   },
//   getProjectRoots() {
//     return [
//       // Keep your project directory.
//       path.resolve(__dirname)
//     ].concat(alternateRoots);
//   },
//   extraNodeModules,
//   getPolyfills,
//   getSourceExts: () => [ 'jsx' ],
// };

// module.exports = {
//   extraNodeModules,
//   getProjectRoots () {
//     return [
//       __dirname,
//     ]
//   },
//   getSourceExts: () => [ 'jsx' ],
// }
