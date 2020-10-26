const createAnal = () => {
    let counter = 0;
    let isDestroyed = false;
    const listener = () => counter = counter + 1;
    document.addEventListener('click', listener)
    return {
        destroy() {
            document.removeEventListener("click", listener);
            isDestroyed = true;
        },
        getClicks() {
            if (isDestroyed) {
                return `Anal is destroyed. Total clicks = ${counter}`
            }
            return counter
        }
    }
}

window.anal = createAnal()
console.log('Test 123')