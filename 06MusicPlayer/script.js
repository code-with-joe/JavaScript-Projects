const playBtn = document.querySelector('.play-icon');
const image = document.querySelector('.image')
const playStop = document.getElementById('play-stop')
const fav = document.getElementById('fav')
const audio = document.querySelector('audio')
const h3 = document.querySelector('h3');
const h5 = document.querySelector('h5')
const h4 = document.querySelector('h4');
const h2 = document.querySelector('h2');
const circle = document.querySelector('.circle')
const line = document.querySelector('.line')
const line2 = document.querySelector('.line2')
const cover = document.querySelector('.cover')
const lyric = document.querySelector('.lyric')
const img = document.querySelector('img')
let msgTimeout;

cover.addEventListener("click", () => {
  img.style.display = "block"
  h2.style.display = "none"
  cover.style.background = "rgba(255, 255, 255, 0.2)";
  lyric.style.background = "transparent";
});
lyric.addEventListener("click", () => {
  img.style.display = "none"
  h2.style.display = "block"
  lyric.style.background = "rgba(255, 255, 255, 0.2)";
  cover.style.background = "transparent";
});

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playStop.className = "ri-pause-mini-line";
    image.style.transform = "scale(1)";

  } else {
    audio.pause();
    playStop.className = "ri-play-large-fill";
    image.style.transform = "scale(0.8)";
  }
});


fav.addEventListener('click', () => {
  if (fav.className != "ri-poker-hearts-fill") {
    fav.className = "ri-poker-hearts-fill"
    h3.innerText = "Favorited"
  } else {
    fav.className = "ri-poker-hearts-line"
    h3.innerText = "Removed from Favorites"
  }

  h3.style.display = "block";
  clearTimeout(msgTimeout);

  msgTimeout = setTimeout(() => {
    h3.style.display = "none";
  }, 2000)
})





function time(e) {
  const min = Math.floor(e / 60);
  const sec = Math.floor(e % 60);
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

audio.addEventListener('loadedmetadata', () => {
  h5.innerText = time(audio.duration);
});
function circleAnimation() {
  var count = 220;
  if (audio.currentTime < audio.duration) {
    const progress = audio.currentTime / audio.duration;
    const newpos = progress * count
    circle.style.left = ` ${newpos + 40}px`;
    line2.style.width = `${newpos + 10}px`
  }
  if (audio.currentTime === audio.duration) {
    playStop.className = "ri-play-large-fill";
  }


}

function displayWidth(event) {
  const lineRect = event.target.getBoundingClientRect();
  const clickX = event.clientX - lineRect.left
  const lineWidth = Math.trunc(clickX)

  const newTime = audio.duration / line.offsetWidth
  audio.currentTime = newTime * lineWidth


}


window.setInterval(function () {
  h4.innerText = time(audio.currentTime);
  circleAnimation()
}, 100);

line.addEventListener('click', displayWidth)
