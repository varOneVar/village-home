function chunkArr (arr = [], size = 2) {
    return Array.from({ length: Math.ceil(arr.length / size)}, (v, idx) => arr.slice(idx * size, (idx + 1) * size))
}