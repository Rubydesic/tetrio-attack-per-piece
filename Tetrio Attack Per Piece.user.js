// ==UserScript==
// @name         Tetrio Attack Per Piece
// @namespace    http://rubydesic.com/
// @version      0.1
// @description  Show APP on tetrio
// @author       You
// @match        https://ch.tetr.io/u/*
// @icon         https://www.google.com/s2/favicons?domain=tetr.io
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    // https://stackoverflow.com/a/61511955
    function waitForSelector(selector, condition = () => true) {
        return new Promise(resolve => {
            const res = document.querySelector(selector);
            if (res && condition(res)) {
                return resolve(res);
            }

            const observer = new MutationObserver(mutations => {
                const res = document.querySelector(selector)
                if (res && condition(res)) {
                    resolve(res);
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    const apm = (await waitForSelector('#user_league_apm', s => !!s.innerText)).innerText;
    const pps = (await waitForSelector('#user_league_pps', s => !!s.innerText)).innerText;

    const card = document.querySelector('#user_league_apm').parentNode;
    const app = Number(apm) / (60 * Number(pps));

    card.insertAdjacentHTML('beforebegin', `<div class="keyvalue" title="Attack Per Piece, average over the last 10 games"><p>APP</p><div></div><h1 id="user_league_app">${app.toFixed(2)}</h1></div>`);
})();