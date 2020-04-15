console.log('scripts activated')

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: '4pKly2JojMw',
        events: {
            'onStateChange': onPlayerStateChange
        }
    })
}
let done = false;

function onPlayerStateChange(event) {
    let breatheBubble = document.querySelector('svg')
    let breatheContainer = document.querySelector('.breathe')
    let p = document.querySelector('p')
    let names = ['breathe in', 'breathe out']
    let currentItem = 0;


    if (event.data == YT.PlayerState.PLAYING && !done) {
        console.log('starting')
        setTimeout(startTimer,10000)
        setTimeout(()=> {
            breatheBubble.classList.add('svg-breathing')
            p.classList.add('svg-breathing')
        
            setInterval(() => {
                p.textContent = names[currentItem];
                currentItem = (currentItem + 1) % names.length;
                    
            },3500)
            breatheContainer.classList.add('show')
        }, 15000)
        done = true;
    }
}


function stopVideo() {
    player.stopVideo();
}

// timer 

function startCountDown(duration, display) {
    let timer = duration,
        minutes, seconds
    setInterval(() => {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)

        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds

        display.textContent = minutes + ':' + seconds
        if (--timer < 0) {
            timer = duration
        }
    }, 1000);
}

function startTimer() {
    let fiveMinutes = 60 * 4,
        display = document.querySelector('#time'),
        timer = document.querySelector('.timer')
    timer.classList.add('show')
    startCountDown(fiveMinutes, display)
}