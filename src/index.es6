let getScore = (word) => {
    return fetch('http://95.85.42.243:3000/score_word/' + word)
        .then(response => {
            return response.json()
        })
        .catch(console.error);
};

let injectInToTab = (tab) => {
    return new Promise((resolve, reject) => {
        chrome.tabs.executeScript(tab.id, {code: "window.injected"}, (result) => {
            if (result[0]) {
                resolve();
            } else {
                chrome.tabs.executeScript(tab.id, {code: "window.injected = true"});
                if (tab.url.match(/^(http|https):/i)) {
                    chrome.tabs.executeScript(tab.id, {file: "content.js"}, () => {
                        resolve();
                    });
                }
            }
        });
    });
};

chrome.runtime.onInstalled.addListener(() => {
    let options = {
        contexts: ['selection'],
        title: 'Score word',
        id: 'score_word'
    };
    chrome.contextMenus.create(options);
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "score_word") {
        injectInToTab(tab)
            .then(() => {
                return getScore(info.selectionText)
            })
            .then(response => {
                chrome.tabs.sendMessage(tab.id, {scrabble: response})
            })
    }
});
