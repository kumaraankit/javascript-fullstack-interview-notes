
const promise = new Promise((resolve, reject) => {
    console.log("executor running")
    setTimeout(() => {
        resolve("Promise resolved")
    }, 2000)
})

promise.then((value) => {
    console.log("resolved:", value)
}).catch((error) => {
    console.log("rejected:", error)
}).finally(() => {
    console.log("Promise settled")
})

console.log("end")

// promise combinators

// promise.all 
// if one promise fails, the whole promise.all fails and all run parallelly independently

p = Promise.resolve('A')
p2 = new Promise(r => setTimeout(() => r('B'), 100))
p3 = Promise.resolve('C')

Promise.all([p, p2, p3]).then((values) => {
    console.log("Promise.all resolved:", values)
}).catch((error) => {
    console.log("Promise.all rejected:", error)
})

// promise.race([p1,p2])
//settles (resolve or reject) as soon as the first promise settles.
// implement timeouts or pick the fastest source among mirrors.

const op = new Promise(r => setTimeout(() => r('done'), 200))
const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 100))

Promise.race([op, timeout])
    .then(v => console.log('race result', v))
    .catch(err => console.error('race error', err.message)) // 'timeout'


// promise.allSettled([p1,p2])
// waits for all promises to settle (resolve or reject) and returns an array of objects describing the outcome of each promise.
//waits for all to settle and returns an array of { status: 'fulfilled'|'rejected', value?, reason? }. Never rejects.

Promise.allSettled([
    Promise.resolve('ok'),
    Promise.reject(new Error('bad'))
]).then(results => {
    results.forEach((r, i) => console.log(i, r))
})

//Practical tips / interview points:

// Use Promise.all when results are required together; prefer allSettled when tasks are independent and failures are acceptable.
// Use race for timeouts or picking the fastest provider. Implement timeouts by racing the operation vs a rejection timer.
// Use any when you only need the first success and can ignore early failures.
// Remember Promise.resolve() and Promise.reject() create already-settled promises helpful in tests/mocks.
// Parallelize with combinators for latency gains, but avoid starting too many parallel tasks (resource limits, rate limits).