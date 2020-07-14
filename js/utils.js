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


function storage() {
    const baseKey = 'meilixiangcun__'
    const storage = window.sessionStorage
    return {
        set(key, val) {
            try {
                const k = baseKey + key
                storage.setItem(k, JSON.stringify(val))
            } catch (error) {
                console.error('设置缓存错误', error)
            }
        },
        get(key, def) {
            try {
                const k = baseKey + key
                const val = storage.getItem(k)
                return JSON.parse(val)
            } catch (error) {
                console.error('获取缓存错误', error)
                return def
            }
        },
        remove(key) {
            try {
                const k = baseKey + key
                storage.removeItem(k)
            } catch (error) {
                console.error('删除缓存', error)
            }
        },
        clear() {
            try {
                storage.clear()
            } catch (error) {
                console.error('清空缓存', error)
            }
        }
    }
}
