import os from "os";

//Example-1
// if (os.EOL === "\n") {
//   console.log(String.raw`You are working with line \n delimeter. Posix`);
// } else if (os.EOL === `\r\n`) {
//   console.log(String.raw`You are working with line \r\n delimeter. Windows`);
// }

// Example-2
//https://nodejs.org/dist/latest-v16.x/docs/api/os.html#os_os_constants_1
// console.log(os.constants);

// Example-3
// 'arm', 'arm64', 'ia32', 'mips', ..., 'x32', 'x64'
// console.log(os.arch());

// Example-4
// console.log(os.cpus());

// Example-5
// console.log(os.endianness());

// Examples-6
// console.table({
//   'Memory in bytes': os.freemem(),
//   'Mermoy in Kb': Math.round(os.freemem() / 1024),
//   'Mermoy in Mb': Math.round(os.freemem() / 1024 / 1024),
//   'Mermoy in Gb': Math.round(os.freemem() / 1024 / 1024 / 1024),
// });

// console.table({
//   'Memory in bytes': os.totalmem(),
//   'Mermoy in Kb': Math.round(os.totalmem() / 1024),
//   'Mermoy in Mb': Math.round(os.totalmem() / 1024 / 1024),
//   'Mermoy in Gb': Math.round(os.totalmem() / 1024 / 1024 / 1024),
// });

// Example-7
// console.log(os.homedir());

// Exammple-8
// console.log(os.hostname());

// Example-9
// Unix-specific
// console.log(os.loadavg());

// Example-10
// console.log(os.networkInterfaces());

// Example-11
// console.log(os.platform());

// Example-12
// console.log(os.release());

// Example-13
// console.log(os.tmpdir())

// Example-14
// console.log(os.type());

// Example-15
// console.table({
//   'seconds': os.uptime(),
//   'minutes': os.uptime() / 60,
//   'hours': os.uptime() / 60 / 60,
//   'days': os.uptime() / 60 / 60 / 60,
// })

// Example-15
// console.log(os.userInfo());
