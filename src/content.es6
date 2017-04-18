import $ from "jquery";
import notifyjs from "notifyjs-browser";
notifyjs(document, $);

chrome.runtime.onMessage.addListener((msg, _sender, _sendResponse) => {
    if (!msg.scrabble) return false

    if (msg.scrabble.valid) {
        let message = `This word is valid\n\rScore: ${msg.scrabble.score}`;

        let config = {
            style: 'bootstrap',
            clickToHide: true,
            autoHide: true,
            className: 'success',
            autoHideDelay: 5000
        };
        $.notify(message, config);
    } else {
        $.notify('Sorry, this word is not valid :(', 'warning')
    }
});
