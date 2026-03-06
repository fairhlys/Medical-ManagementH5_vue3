export function lock(fn) {
    let pending = false
    return async function(...args) {
        if(pending) return
        pending = true
        try{
            return await fn.apply(this, args)
        } finally {
            pending = false
        }
    }
}