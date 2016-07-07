
const fib = (num) => {
    if (num < 2) {
        return Promise.resolve(1);
    }
    const fib1 = fib(num - 1);
    const fib2 = fib(num - 2);
    return Promise.all([fib1, fib2]).then((results) => {
        return results[0] + results[1];
    })
};

process.argv.slice(2).forEach((val) => {
    fib(parseInt(val,10)).then((result) => {
       console.log(`Fibonacci result for ${val} is ${result}`);
    });
});
console.log('Calculating the results....');