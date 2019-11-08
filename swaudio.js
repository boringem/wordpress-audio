document.addEventListener("DOMContentLoaded", function(event) {

var origSRC = document.getElementById('firstTrack').dataset.trackurl;
var music = document.getElementById('mainPlayer');
var source = document.getElementById('playerSource');
source.src = origSRC;
music.load();
loadTrackData();
var duration;
var pButton = document.getElementById('pButton');
var fButton = document.getElementById('fButton');
var lButton = document.getElementById('lButton');
var playhead = document.getElementById('playhead');
var timeline = document.getElementById('timeline');

var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

// play button 
pButton.addEventListener("click", playAudio);

// next button 
fButton.addEventListener("click", nextTrack);

// prev button
lButton.addEventListener("click", prevTrack);

//timeupdate 
music.addEventListener("timeupdate", timeUpdate, false);

// makes timeline clickable 
timeline.addEventListener("click", function(event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
}, false);

// returns the click as a percent of the duration
function clickPercent(event) {
    var percent = 100 * (music.currentTime / duration);
    var totalFill = event.clientX - getPosition(timeline);
    console.log(totalFill);
    console.log(timelineWidth);
    console.log(timeline.offsetWidth);
    console.log(playhead.offsetWidth);
    return (event.clientX - getPosition(timeline)) / timelineWidth;
}

// makes the playhead draggable 
playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

// audio is only updated only when the drag is released
var onplayhead = false;

// mouseDown listener
function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
}

// mouseUp listener
function mouseUp(event) {
    if(onplayhead == true) {
        moveplayhead(event);
        window.removeEventListener('mousemove', moveplayhead, true);
        music.currentTime = duration * clickPercent(event);
        music.addEventListener('timeupdate', timeUpdate, false);
    }
    onplayhead = false;
}

//mousemove listener
function moveplayhead(event) {
    var newMargLeft = event.clientX - getPosition(timeline);
    if( newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.width = newMargLeft + "%";
    }
    if(newMargLeft < 0) {
        playhead.style.width = "0%";
    }
    if(newMargLeft > timelineWidth) {
        playhead.style.width = timelineWidth + "%";
    }
}

// next track 

function playAudio() {
    if(music.paused) {
        music.play();
        pButton.className = "";
        pButton.className = "sw-pause";
    } else {
        music.pause();
        pButton.className = "";
        pButton.className = "sw-play";
    }
    loadTrackData();
}

// load track information 
function loadTrackData() {
    var currentTracks = document.getElementsByClassName("activeTrack");
    var trackTitle;
    var trackArtist;
    var currentTrackName = document.getElementById('moreTitle');
    var currentTrackArtist = document.getElementById('moreArtist');
    var currentTrackDesc = document.getElementById('moreInfo');

    for(var i=0, len = currentTracks.length; i < len; i++) {
        playingSong = currentTracks[i];
        trackTitle = playingSong.getAttribute('data-track-title');
        trackArtist = playingSong.getAttribute('data-track-artist');
        trackDesc = playingSong.getAttribute('data-track-desc');

    }
    var titleLoc = document.getElementById('trackTitle');
    var artistLoc = document.getElementById('trackArtist');

    titleLoc.innerHTML = trackTitle;
    artistLoc.innerHTML = trackArtist;
    currentTrackName.innerHTML = trackTitle;
    currentTrackArtist.innerHTML = trackArtist;
    currentTrackDesc.innerHTML = trackDesc;
}

// forward button 
function nextTrack() {
    music.pause();
    var prevElement = document.getElementsByClassName("activeTrack");
    var nextElement;

    for(var i = 0, len = prevElement.length; i < len; i++) {
        nextElement = prevElement[i].nextElementSibling;
        newSRC = nextElement.getAttribute('data-track-url');
        var oldSong = prevElement[i];
        oldSong.classList.remove("activeTrack");
        nextElement.classList.add("activeTrack");
        source.src = newSRC;
        music.load();
        loadTrackData();
    }
    music.play(); 
    pButton.className = "";
    pButton.className = "sw-pause";
}

function prevTrack() {
    music.pause();
    var oldElement = document.getElementsByClassName("activeTrack");
    var newSong;

    for(var i=0, len = oldElement.length; i < len; i++) {
        newSong = oldElement[i].previousElementSibling;
        newSRC = newSong.getAttribute('data-track-url');
        var oldSong = oldElement[i];
        oldSong.classList.remove("activeTrack");
        newSong.classList.add("activeTrack");
        source.src = newSRC;
        console.log(newSRC);
        music.load();

    }
    music.play();
    loadTrackData();
    pButton.classList = "";
    pButton.classList = "sw-pause";
}

function timeUpdate() {
    var playPercent = 100 * (music.currentTime / duration);
    playhead.style.width = playPercent + "%";
    if(music.currentTime == duration) {
        pButton.className = "";
        pButton.className = "sw-play";
    }
    timer = document.getElementById('timer');
    timer.innerHTML = reskinTime(music.currentTime.toString());
}

// current time for duration text 
function reskinTime(secs, format) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min *60));
    if(sec < 10) {
        sec = "0" + sec;
    }
    return min + ':' + sec;
}

music.addEventListener("canplaythrough", function() {
    duration = music.duration;
}, false);

function getPosition(el) {
    return el.getBoundingClientRect().left;
}

/* DOMContentLoaded */
});