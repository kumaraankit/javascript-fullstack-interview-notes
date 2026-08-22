// console.log("Start");

// setTimeout(() => console.log("Timeout"), 0);

// Promise.resolve().then(() => console.log("Promise"));

// console.log("End");

console.log('start')
setTimeout(() => console.log('timeout'), 0 )
setImmediate(() => console.log('immediate'))
process.nextTick(() => console.log('nextTick'))
Promise.resolve().then(() => console.log('promise'))
console.log('end')


// setImmediate() vs setTimeout(..., 0)
// In a top-level script, setTimeout usually wins
// After I/O, setImmediate() often executes before setTimeout
// process.nextTick() can starve the event loop
// If you queue too many next ticks, the event loop never moves on
// Promises are microtasks
// They run after the current callback finishes but before the next event-loop phase
// I/O callbacks usually happen in the poll phase
// This is the phase where file/network results come back
// Blocking JS code is the real problem
// CPU-heavy work blocks the whole loop, so use worker threads or child processes for heavy tasks