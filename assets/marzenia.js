document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    const playPauseButton = document.getElementById("play-pause");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const volumeControl = document.getElementById("volume");
    const trackSlider = document.getElementById("track-slider");
    const currentTimeDisplay = document.getElementById("current-time");
    const totalDurationDisplay = document.getElementById("total-duration");
    const trackNameDisplay = document.getElementById("track-name");
    const albumPhoto = document.getElementById("album-photo");
    let ribbon = document.getElementById("ribbon"); // Assuming ribbon exists in HTML

    let isPlaying = false;
    let currentTrack = 0;
    let audioPosition = 0;

    // Array of Track URLs
    const trackList = [
        "audio/Nasza Droga.mp3",
        "audio/Ona.mp3",
        "audio/Sesja Marzeń.mp3",
        "audio/BMW.mp3",
        "audio/Razem Na Zawsze.mp3",
        "audio/Miasto.mp3"
    ];

    // Array of Album Photos
    const albumPhotos = [
        "assets/img/marzenia.jpg",
        "assets/img/marzenia.jpg",
        "assets/img/marzenia.jpg",
        "assets/img/marzenia.jpg",
        "assets/img/marzenia.jpg",
        "assets/img/hidden.jpg"
    ];

    // Function to toggle between Play and Pause
    function togglePlayPause() {
        if (!isPlaying) {
            if (audio.currentTime === 0) {
                // Start from the beginning of the track
                audio.src = trackList[currentTrack];
            }
            audio.play()
                .then(() => {
                    playPauseButton.innerHTML = '<i class="fa fa-pause"></i>';
                    isPlaying = true;
                    updateTrackName(currentTrack);
                    if (ribbon) {
                        ribbon.style.display = "block"; // Show the ribbon if it exists
                        ribbon.classList.add("active");
                    }
                })
                .catch((error) => {
                    console.error("Audio Playback Error: " + error.message);
                });
        } else {
            audio.pause();
            playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
            if (ribbon) {
                ribbon.style.display = "none"; // Hide the ribbon if it exists
            }
            isPlaying = false;
        }
    }

    playPauseButton.addEventListener("click", togglePlayPause);

    // Function to play the next track
    nextButton.addEventListener("click", function () {
        currentTrack = (currentTrack + 1) % trackList.length;
        playTrack(currentTrack);
    });

    // Function to play the previous track
    prevButton.addEventListener("click", function () {
        currentTrack = (currentTrack - 1 + trackList.length) % trackList.length;
        playTrack(currentTrack);
    });

    // Function to play a specific track
    function playTrack(trackIndex) {
        audio.src = trackList[trackIndex];
        audio.play()
            .then(() => {
                playPauseButton.innerHTML = '<i class="fa fa-pause"></i>';
                isPlaying = true;
                updateTrackName(trackIndex); // Updating the track name
                if (ribbon) {
                    ribbon.style.display = "block"; // Show the ribbon if it exists
                    ribbon.classList.add("active");
                }
            })
            .catch((error) => {
                console.error("Audio Playback Error: " + error.message);
            });
    }

    // Function to update the track name
    function updateTrackName(trackIndex) {
        const trackName = trackList[trackIndex];
        const cleanedTrackName = trackName.replace("audio/", "");
        trackNameDisplay.textContent = cleanedTrackName;
        albumPhoto.src = albumPhotos[trackIndex];
    }

    volumeControl.addEventListener("input", function () {
        audio.volume = volumeControl.value;
    });

    // Update the audio time displays
    audio.addEventListener("timeupdate", function () {
        const currentTime = formatTime(audio.currentTime);
        const totalDuration = formatTime(audio.duration);
        currentTimeDisplay.textContent = currentTime;
        totalDurationDisplay.textContent = totalDuration;

        // Update the track slider as the audio plays
        const position = (audio.currentTime / audio.duration) * 100;
        trackSlider.value = position;
    });

    // Seek to a position when the user interacts with the track slider
    trackSlider.addEventListener("input", function () {
        const newPosition = (trackSlider.value / 100) * audio.duration;
        audio.currentTime = newPosition;
    });

    // Handle track ending and play the next track
    audio.addEventListener("ended", function () {
        currentTrack = (currentTrack + 1) % trackList.length;
        playTrack(currentTrack);
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    }
});










        // // Wyświetl okno modalne z ostrzeżeniem
        // document.getElementById('age-warning-modal').style.display = 'block';
      
        // // Obsługa kliknięcia przycisku "Tak"
        // document.getElementById('age-yes-button').addEventListener('click', function() {
        // // Ukryj okno modalne
        // document.getElementById('age-warning-modal').style.display = 'none';
        // document.getElementById('allunlock').style.display = 'block';

        // // Wywołaj funkcję albumfunction(), jeśli taka jest zdefiniowana
        // if (typeof albumfunction === 'function') {
        //     albumfunction();
        // }
    // });
        
        // // Obsługa kliknięcia przycisku "Nie"
        // document.getElementById('age-no-button').addEventListener('click', function() {
        //   // Przekierowanie na inną stronę lub wyświetlenie komunikatu
        //   alert('Musisz mieć ukończone 18 lat, aby wejść na tę stronę.');
        //   window.location.href = 'https://example.com'; // Zmień ten URL na adres, na który chcesz przekierować
        // });