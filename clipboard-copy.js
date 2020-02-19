((w) => {
    'use strict';

    w.ClipboardCopyJS = class {
        constructor (className) {
            this._copyStr = '';

            document.addEventListener('copy', e => this._addDocuementCopyEvent(e));
            [...document.querySelectorAll(className)].map(elem => this._addClickEvent(elem));
        }

        /**
         * コピーイベント
         * @param e
         */
        _addDocuementCopyEvent (e) {
            if ( ! this._copyStr) return;

            e.preventDefault();

            if (e.clipboardData) {
                e.clipboardData.setData("text/plain" , this._copyStr);
            } else if (window.clipboardData) {
                window.clipboardData.setData("Text" , this._copyStr);
            }

            this._copyStr = '';
        }

        /**
         * クリックイベント
         * @param elem
         */
        _addClickEvent (elem) {
            elem.addEventListener('click', e => {
                this._copyStr = e.currentTarget.dataset.copy;
                document.execCommand("copy");
            });
        }
    }
})(window);
