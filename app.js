const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    // Sample data
    const tutors = [
        {
            name: "Boram S.",
            image: "images/Tutor-Pic.png",
            subject: "Korean",
            studentCount: 27,
            lessonCount: 60,
            languages: "Korean (Native), English (Intermediate)",
            shortIntro: "Hello, I am an experienced Korean tutor...",
            fullIntro: "Hello, I am an experienced Korean tutor who specializes in teaching Korean as a Second Language. I focus on conversational skills, grammar, and cultural understanding. I have been teaching for over 5 years.",
            rating: "4.9",
            price: "₩300,000"
        },
        {
            name: "Alex J.",
            image: "images/Tutor-Pic-2.png",
            subject: "Mathematics",
            studentCount: 40,
            lessonCount: 80,
            languages: "English (Native), Spanish (Fluent)",
            shortIntro: "Passionate about mathematics and teaching...",
            fullIntro: "Passionate about mathematics and teaching, I have a decade of experience in tutoring students in algebra, calculus, and geometry. My approach is to make math accessible and fun for all students.",
            rating: "5.0",
            price: "₩250,000"
        },
        {
            name: "Maria G.",
            image: "images/Tutor-Pic-3.png",
            subject: "History",
            studentCount: 35,
            lessonCount: 70,
            languages: "English (Native), French (Intermediate)",
            shortIntro: "History enthusiast with a love for storytelling...",
            fullIntro: "As a history enthusiast with a love for storytelling, I bring historical events to life for my students. My expertise is in European and American history, with a focus on making learning interactive and engaging.",
            rating: "4.8",
            price: "₩280,000"
        }
        // You can add more tutors here
    ];
    

    res.render('index', { tutors: tutors });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
