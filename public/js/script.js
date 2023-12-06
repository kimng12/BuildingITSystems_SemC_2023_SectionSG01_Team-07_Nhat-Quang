function toggleReadMore(index) {
    var fullIntro = document.getElementById('full-intro-' + index);
    var shortIntro = document.getElementById('short-intro-' + index);
    var readMoreBtn = document.querySelectorAll('.info-button')[index]; // Assuming each card has only one '.info-button'

    if (fullIntro.style.display === 'none') {
        fullIntro.style.display = 'block';
        shortIntro.style.display = 'none';
        readMoreBtn.textContent = 'Read less';
    } else {
        fullIntro.style.display = 'none';
        shortIntro.style.display = 'block';
        readMoreBtn.textContent = 'Read more';
    }
}
