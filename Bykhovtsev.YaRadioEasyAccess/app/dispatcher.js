
function getSongInfo() {
    var $tracks = $(".track__info");
    var $curr = $($tracks[$tracks.length - 3]);
    songInfo = {
        title: $curr.find(".track__title").text(),
        artist: $curr.find(".track__artists").text(),
        titleHref: $curr.find(".track__title").find("a").attr("href"),
        artistHref: $curr.find(".track__artists").find("a").attr("href"),
    }

    return songInfo;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if(request.command){
        switch(request.command)
        {
            case "getSong":
                sendResponse({ songInfo: getSongInfo() });
                break;
            case "play":
                $(".player-controls__play").click();
                break;
            case "next":
                $tracks = $(".slider__item.slider__item_track");
                $($tracks[$tracks.length - 2]).find("img").click();
                break;
            case "dislike":
                $("button.like.like_action_dislike").click();
                break;
            case "like":
                $("button.like.like_action_like").click();
                break;
        }
    }
});
$(function () {
    var skipper = true;
    var observer = new MutationObserver(
        function () {
            if (skipper) {
                skipper = false;
                return;
            }
            skipper = true;
            var $tracks = $(".track__info");
            var $curr = $($tracks[$tracks.length - 3]);
            chrome.runtime.sendMessage({
                songInfo: {
                    title: $curr.find(".track__title").text(),
                    artist: $curr.find(".track__artists").text()
                }
            });
        });
    observer.observe(document.getElementsByClassName("slider__items")[0], { childList: true, subtree:true });

})
