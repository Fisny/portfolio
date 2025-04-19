(function () {
    const timestamp = Date.now();
    const selector = 'link[rel="stylesheet"], script[src]';

    document.querySelectorAll(selector).forEach(el => {
        const attr = el.tagName === 'SCRIPT' ? 'src' : 'href';
        const val = el.getAttribute(attr);
        if (val && val.includes('<DATE_HERE>')) {
            el.setAttribute(attr, val.replace('<DATE_HERE>', timestamp));
        }
    });
})();
