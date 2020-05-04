console.log('scripts activated')

const elPlayer = document.querySelector('.js-player');
const elPlay = document.querySelector('.js-play');
const elPause = document.querySelector('.js-pause');
const videoCC = document.querySelector('.captions')
const videoId = '4pKly2JojMw';
const breatheBubble = document.querySelector('svg')
const breatheContainer = document.querySelector('.breathe')
const breathePos = document.querySelector('.svg-container')
const p = document.querySelector('p')
const title = document.querySelector('.position_name')
const info = document.querySelector('.info')
const snoozebtn = document.querySelector('.snoozebtn')
const snooze = document.querySelector('#snooze')
const yesbtn = document.querySelector('.button')
const h1 = document.querySelector('h1')
const video = document.querySelector('.vid-container')


async function fetchCaption(cc) {
    const url = await fetch('./public/src/CC/captions.json')
    const res = await url.json()
    const json = res.CC.map((cc, i) => {
        return Object.assign(cc, {
            id: i + 1
        })
    })
    return json
}

// snooze button
snoozebtn.addEventListener('click', () => {
    snooze.classList.toggle('show')
    video.style.opacity = 0
    h1.textContent = "Okay five more minutes.."

})
yesbtn.addEventListener('click', () => {
    snooze.classList.remove('show')
    video.classList.add('show')
    video.style.opacity = 1
    h1.textContent = "Alrigh let's go"

})



let player = youtube({
        el: elPlayer,
        id: videoId
    })
    .on('timeupdate', async function (event) {
        let time = await getTimeStamp(event)
        let cc = await fetchCaption()
        let findCC = await getCaption(cc, time)
        console.log(time)
        if (findCC) {
            videoCC.innerHTML = findCC.text
        }if (time == "00:00") {
            videoCC.classList.add('show')

        }
        if (time == "00:30") {
            title.classList.add('show')
            info.classList.add('show')
            title.textContent = "Neck Release"
            info.textContent = "stretch ear form shoulder"

        }
        if (time == "00:35") {
            info.classList.remove('show')
        }if (time == "00:45") {
            title.classList.remove('show')

        }
        if (time == "00:46") {
            breatheContainer.classList.add('show')
            breatheBubble.classList.add('svg-breathing')

            // p.classList.add('svg-breathing')
            console.log(breatheBubble)
        }
        if (time == "01:10") {
            breatheContainer.classList.remove('show')
        }
        if (time == "01:20") {
            breatheContainer.classList.add('show')
            breatheBubble.classList.add('svg-breathing')
            breathePos.style.left = '55em'
        }
        if (time == "01:47") {
            breatheContainer.classList.remove('show')
        }
        if (time == "01:55") {
            title.classList.add('show')
            title.textContent = "Tabletop pose"
        }if (time == "02:00") {
            title.classList.remove('show')
        }

    })
    .on('pause', function (event) {
        elPlay.disabled = false;
        elPause.disabled = true;
    })
    .on('ended', function (event) {
        player.play();
    });

elPlay.addEventListener('click', function (event) {
    player.play();
});
elPause.addEventListener('click', function (event) {
    player.pause();
});


function getCaption(cc, time) {
    // console.log(cc, time)
    const match = cc.find(cc => cc.startTime == time || cc.endTime == time)
    return match ? match : null
    // console.log(match, 'match')
}


//Helper functions

//Find CC matching the video runtime

async function findCC(CC, time) {

    // console.log(CC, time)
    const matchingCaptions = CC.find(cc => cc.startTime == time && time == cc.endTime)
    return matchingCaptions ? matchingCaptions : null


}





//Check if CC is new or if CC is already being shown
function CCisNew(captions) {
    const currentCC = videoCC.getAttribute("captions-id")
    const newCC = "CC" + captions.id
    return currentCC != newCC
}



//Log the CC changes
function consoleLogUpdate(matchingCC) {
    console.log("updating CC: ", [{
        "old-CC: ": videoCC.textContent
    }, {
        "new-CC": matchingCC.text
    }])
}



//Update video CC
function updateVideoCC(captions) {
    videoCC.innerHTML = captions.text
    videoCC.setAttribute("captions-id", "CC" + captions.id)
}



//Reset the CC to "blank"
function resetCC() {
    videoCC.textContent = ""
    videoCC.setAttribute("captions-id", "")
    console.log("CC was reset")
}


function getTimeStamp(event) {

    let timeStamp = event.player._currentTime

    let minutes = Math.floor(timeStamp / 60)
    let seconds = timeStamp % 60
    seconds = Math.round((seconds * 100) / 100)

    let formatted = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')

    return formatted
}

// var tag = document.createElement('script')

// tag.src = "https://www.youtube.com/iframe_api"
// var firstScriptTag = document.getElementsByTagName('script')[0]
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// let player

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '390',
//         width: '640',
//         videoId: '4pKly2JojMw',
//         events: {
//             'onStateChange': onPlayerStateChange
//         }
//     })

//     let videoPos = !player.getCurrentTime ? 0.0 : player.getCurrentTime()
//     console.log(videoPos)
// }




// let done = false;

// function onPlayerStateChange(event) {
//     console.log(player)
//     let breatheBubble = document.querySelector('svg')
//     let breatheContainer = document.querySelector('.breathe')
//     let p = document.querySelector('p')
//     let names = ['breathe in', 'breathe out']
//     let currentItem = 0;

//     if (event.data == YT.PlayerState.PLAYING && !done) {
//         setTimeout(startTimer,10000)
//         setTimeout(()=> {
//             breatheBubble.classList.add('svg-breathing')
//             p.classList.add('svg-breathing')

//             setInterval(() => {
//                 p.textContent = names[currentItem];
//                 currentItem = (currentItem + 1) % names.length;

//             },3500)
//             breatheContainer.classList.add('show')
//         }, 15000)
//         done = true;
//     }
// }


// function stopVideo() {
//     player.stopVideo();
// }

// // timer 

// function startCountDown(duration, display) {
//     let timer = duration,
//         minutes, seconds
//     setInterval(() => {
//         minutes = parseInt(timer / 60, 10)
//         seconds = parseInt(timer % 60, 10)

//         minutes = minutes < 10 ? '0' + minutes : minutes
//         seconds = seconds < 10 ? '0' + seconds : seconds

//         display.textContent = minutes + ':' + seconds
//         if (--timer < 0) {
//             timer = duration
//         }
//     }, 1000);
// }

// function startTimer() {
//     let fiveMinutes = 60 * 4,
//         display = document.querySelector('#time'),
//         timer = document.querySelector('.timer')
//     timer.classList.add('show')
//     startCountDown(fiveMinutes, display)
// }