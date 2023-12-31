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

// Filter Form Function
document.getElementById('filterForm').addEventListener('submit', function(event){
    event.preventDefault();

    var minPrice = document.getElementById('minPrice').value;
    var maxPrice = document.getElementById('maxPrice').value;
    var subjectFilter = document.getElementById('subjectFilter').value.toLowerCase();

    var tutorCards = document.getElementsByClassName('tutor-card');

    for (var i = 0; i < tutorCards.length; i++) {
        var price = parseFloat(tutorCards[i].querySelector('.tutor-price p').textContent);
        var subject = tutorCards[i].querySelector('.tutor-info strong').textContent.toLowerCase();

        if ((price >= minPrice && price <= maxPrice || minPrice === '' || maxPrice === '') && 
            (subject.includes(subjectFilter) || subjectFilter === '')) {
            tutorCards[i].style.display = '';
        } else {
            tutorCards[i].style.display = 'none';
        }
    }
});

function applyFilter() {
    var minPrice = document.getElementById('minPrice').value;
    var maxPrice = document.getElementById('maxPrice').value;
    var subjectFilter = document.getElementById('subjectFilter').value.toLowerCase();

    var tutorCards = document.getElementsByClassName('tutor-card');

    for (var i = 0; i < tutorCards.length; i++) {
        var priceText = tutorCards[i].getElementsByClassName('tutor-price')[0].innerText;

        // Remove currency symbol and commas from the price text, then convert it to a float
        var price = parseFloat(priceText.replace('₩', '').replace(/,/g, ''));

        var subject = tutorCards[i].getElementsByClassName('tutor-info')[0].getElementsByTagName('strong')[0].innerText.toLowerCase();

        var priceCondition = (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
        var subjectCondition = !subjectFilter || subject.includes(subjectFilter);

        tutorCards[i].style.display = (priceCondition && subjectCondition) ? '' : 'none';
    }
}

// Make sure to call applyFilter() when the form is submitted.
document.getElementById('filterForm').onsubmit = function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    applyFilter();
};