function chunkArr (arr = [], size = 2) {
    return Array.from({ length: Math.ceil(arr.length / size)}, (v, idx) => arr.slice(idx * size, (idx + 1) * size))
}

function checkType (o) {
    return Object.toString.call(o).slice(8, -1)
}

function createElementFn(h, list, context) {
    const [e,o,c] = list
    const children = checkType(c) === 'Array' ? createElementFn(h, c, context) : c;
    return h(e, o, children)
}
function simulateInterval(callback, interval, async = false) {
    let timerId = null
    async function fn() {
        // 没有返回值是常态，所以保持继续运行定时器
        let result = false
        if (async) {
            try {
                result = await callback()
            } catch (error) {
                console.error(error)
            }
        } else {
            result = callback()
        }
        // 没有返回值是常态，所以保持继续运行定时器
        if (!result) {
            const prevTimmerId = timerId
            timerId = setTimeout(fn, interval)
            clearTimeout(prevTimmerId)
        }
    }
    return setTimeout(fn, interval)
}