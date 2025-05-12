export function getFirstImage(src) {
    if (Array.isArray(src)) {
        return src[0] || '';
    }
    if (typeof src === 'string') {
        try {
            const arr = JSON.parse(src);
            if (Array.isArray(arr)) return arr[0] || '';
        } catch {
            return src;
        }
    }
    return '';
}
