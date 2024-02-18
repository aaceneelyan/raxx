interface ExtendedJQueryAudio extends JQuery {
  mediaelementplayer(options): void
}

const CFbuildAudioPlayer = function (el) {
  try {
    el.each(function () {
      const $this = $(this)
      const audioURL = $this.attr('data-audio-url') || 'https://images.clickfunnels.com/images/SevenNationArmy.mp3'
      const loop = $this.attr('data-audio-loop') || 'no'

      const playerOptions = {
        class: 'elAudioElement',
        audioWidth: '100%',
        audioHeight: '100%',
        enableAutosize: true,
        enableProgressTooltip: false,
        loop: loop === 'yes',
        features: ['playpause', 'current', 'progress', 'duration', 'volume'],
      }

      const audio = $(this).find('audio') as ExtendedJQueryAudio
      audio.attr('src', audioURL)
      audio.mediaelementplayer(playerOptions)
    })
  } catch (err) {
    console.log(err)
  }
}

window.addEventListener('load', function () {
  CFbuildAudioPlayer($('.pageRoot .elAudioWrapper'))
})
