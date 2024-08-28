const fs = require('node:fs/promises');
//const fs = require('node:fs');

// Execution Time: 2.5s
// CPU Usage: 17% (one core)
// Memory Usage: 15MB (approximately)

// (async () => {
//   console.time('writeMany');
//   const fileHandle = await fs.open('test.txt', 'w');

//   for (let i = 0; i < 100000; i++) {
//     await fileHandle.write(` ${i} `);
//   }
//   console.timeEnd('writeMany');
// })();

// Execution Time: 1.8s
// CPU Usage: 36% (one core)
// Memory Usage: 700MB (approximately)

// (async () => {
//   console.time('writeMany');
//   fs.open('test.txt', 'w', (err, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       fs.write(fd, ` ${i} `, () => {});
//     }
//     console.timeEnd('writeMany');
//   });
// })();

// Execution Time: 276ms
// CPU Usage: 0% (one core)
// Memory Usage: 9MB (approximately)

// (async () => {
//   console.time('writeMany');
//   fs.open('test.txt', 'w', (err, fd) => {
//     for (let i = 0; i < 100000; i++) {
//       const buff = Buffer.from(` ${i} `, 'utf-8');
//       fs.writeSync(fd, buff);
//     }
//     console.timeEnd('writeMany');
//   });
// })();

// Execution Time: 52ms
// CPU Usage: 0% (one core)
// Memory Usage: 38MB (approximately)
// DON'T DO IT THIS WAY. IT'S NOT BEST PRACTICE.
(async () => {
  console.time('writeMany');
  const fileHandle = await fs.open('test.txt', 'w');

  const stream = fileHandle.createWriteStream();

  for (let i = 0; i < 100000; i++) {
    const buff = Buffer.from(` ${i} `, 'utf-8');
    stream.write(buff);
  }
  console.timeEnd('writeMany');
})();
