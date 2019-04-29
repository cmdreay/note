+ 1. 创建一个函数接受参数n个

    const res = (func, n) => (...arg) => func(...arg.slice(0,n))
    eg.
    const firstTwoMax = res(Math.max, 2)
    [[2, 6, 'a'], [8, 4, 6], [10]].map(x => firstTwoMax(...x)) // [6, 8, 10]
