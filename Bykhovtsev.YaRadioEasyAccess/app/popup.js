
document.addEventListener( "DOMContentLoaded", 
    function () {
        chrome.tabs.query({ url: "https://radio.yandex.ru/*" }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { command: "getSong" }, function (response) {
                if (response.songInfo){
                    document.getElementsByTagName("h2")[0].innerText = response.songInfo.title;
                    document.getElementsByTagName("h3")[0].innerText = response.songInfo.artist;
                    document.getElementsByClassName("song-title")[0].href = response.songInfo.titleHref;
                    document.getElementsByClassName("song-artist")[0].href = response.songInfo.artistHref;
                }
            });
        })
        pinButtonAction("play");
        pinButtonAction("like");
        pinButtonAction("dislike");
        pinButtonAction("next");
    }
    , false );

function pinButtonAction(name) {
    document.getElementById(name).addEventListener("click",
    function () {
        chrome.tabs.query({ url: "https://radio.yandex.ru/*" }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { command: name }, function (response) {

            });
        })
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.songInfo) {
        document.getElementsByTagName("h2")[0].innerText = response.songInfo.title;
        document.getElementsByTagName("h3")[0].innerText = response.songInfo.artist;
        document.getElementsByClassName("song-title")[0].href = response.songInfo.titleHref;
        document.getElementsByClassName("song-artist")[0].href = response.songInfo.artistHref;
    }
});