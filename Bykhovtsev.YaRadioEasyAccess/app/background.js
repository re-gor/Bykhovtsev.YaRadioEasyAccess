chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.songInfo){
        chrome.notifications.create("", { type: "basic", iconUrl: "img/icon.png", title: request.songInfo.title, message: request.songInfo.artist });
        return true;
    }
});