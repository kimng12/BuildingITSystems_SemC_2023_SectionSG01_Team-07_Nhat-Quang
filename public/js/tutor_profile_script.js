function showTab(tabName) {
    // Remove 'active' class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
      tab.style.borderBottom = '3px solid transparent'; // Reset to transparent border
    });
  
    // Add 'active' class and style to the clicked tab
    const activeTab = document.querySelector('.tab[onclick="showTab(\'' + tabName + '\')"]');
    activeTab.classList.add('active');
    activeTab.style.borderBottom = '3px solid #CBA0F0'; // Set the border color to #CBA0F0 for active tab
  
    // Placeholder content for demonstration purposes
    var content = 'Content for ' + tabName;
    document.getElementById('tab-content').innerHTML = content;
  
    // Optionally, implement AJAX call to server to get content for each tabName if needed
  }

  function renderReviews() {
    // Start with an empty string that will hold all our review HTML
    let reviewsHtml = '';
  
    // Loop over each review in our data structure and append its HTML to the string
    reviewsData.forEach(review => {
      reviewsHtml += `
        <div class="review">
          <div class="review-header">
            <span class="review-author">${review.author.charAt(0)}</span> <!-- Displaying just the first letter of the author's name -->
            <span class="review-date">${review.date}</span>
            <span class="stars">${'★'.repeat(review.rating)}</span>
          </div>
          <p class="review-content">${review.content}</p>
        </div>
      `;
    });
  
    // Return the complete reviews HTML
    return reviewsHtml;
  }
  
  
  const tabContent = {
    about: `
      <div id="about" class="tab-pane">
        <h2>About the Tutor</h2>
        <p>Hello! My name is Kwangho K., and I'm passionate about teaching Korean. With years of experience and a native fluency in Korean, along with proficiency in English and Japanese, I am equipped to provide comprehensive lessons tailored to all learning levels. I believe in creating a positive and interactive learning environment to help my students achieve their language goals. Whether you're starting from scratch or looking to improve your fluency, I'm here to support you every step of the way. Let's embark on this language learning journey together!</p>
      </div>
    `,
    // Define content for other tabs in a similar manner
    schedule: `
    <div id="schedule" class="tab-pane">
      <h2>Schedule</h2>
      <div class="info-box">
        <p>Choose the time for your first lesson. The timings are displayed in your local timezone.</p>
      </div>
      <div class="time-selection">
        <button class="time-button selected" onclick="selectDuration('25')">25 mins</button>
        <button class="time-button" onclick="selectDuration('50')">50 mins</button>
      </div>
      <div class="week-selector">
        <button class="week-nav" onclick="changeWeek(-1)">&#60;</button>
        <span id="week-range">Dec 8–14, 2023</span>
        <button class="week-nav" onclick="changeWeek(1)">&#62;</button>
      </div>
      <div class="timezone-selector">
        <label for="timezone">Timezone:</label>
        <select id="timezone">
          <option>Asia/Bangkok GMT +7:00</option>
          <!-- Add other timezones as options -->
        </select>
      </div>
      <div class="schedule-grid">
        <!-- Example for Monday -->
        <div class="schedule-day">
          <div class="day-title">Mon</div>
          <div class="day-slots">
            <button class="slot">09:00</button>
            <button class="slot">12:00</button>
            <!-- More slots... -->
          </div>
        </div>
        <!-- Repeat for other days -->
      </div>
    </div>
  `,
  reviews: `
  <div id="reviews" class="tab-pane">
    <h2>What students say</h2>
    <div class="rating-overview">
      <div class="average-rating">
        <span class="big-rating">5</span>
        <span class="stars">★★★★★</span>
        <span class="total-reviews">17 reviews</span>
      </div>
      <div class="rating-breakdown">
        <div class="rating-line">
          <span class="rating-number">5</span>
          <div class="rating-bar full" style="width: 100%;"></div>
          <span class="rating-count">(17)</span>
        </div>
        <!-- Repeat for ratings 4 through 1 -->
        <div class="rating-line">
          <span class="rating-number">4</span>
          <div class="rating-bar" style="width: 0%;"></div>
          <span class="rating-count">(0)</span>
        </div>
        <!-- Include rating lines for 3, 2, and 1 stars here -->
      </div>
    </div>
    <div class="review">
      <div class="review-header">
        <span class="review-author">Diana</span>
        <span class="review-date">November 24, 2023</span>
        <span class="stars">★★★★★</span>
      </div>
      <p class="review-content">Great teacher, well prepared for the lesson, focused on problems you come up with. Highly recommend!</p>
    </div>
    <!-- Additional reviews will go here -->
  </div>
`,
resume: `
<div id="resume" class="tab-pane">
  <h2>Resume</h2>
  <div class="resume-tabs">
    <span class="resume-tab" onclick="toggleResumeSection('education')">Education</span>
    <span class="resume-tab active" onclick="toggleResumeSection('work-experience')">Work experience</span>
  </div>
  <div id="education-content" class="resume-content" style="display: none;">
  <div class="time-period">
  <span class="start-year">2018</span> —
  <span class="end-year">Present</span>
</div>
<div class="institution">Dong-A University</div>
<div class="degree">undergraduate</div>
<div class="verification-status">
  <span class="verified">Diploma verified</span>
  <span class="icon">✔</span>
</div>
  </div>
  <div id="work-experience-content" class="resume-content">
    <div class="time-period">
      <span class="start-year">2018</span> —
      <span class="end-year">Present</span>
    </div>
    <div class="institution">Dong-A University</div>
    <div class="position">team leader of foreign students supporters team</div>
  </div>
</div>
`,
specialties: `
<div id="specialties" class="tab-pane">
  <h2>Specialties</h2>
  <div class="specialty">
    <h3>Korean for beginners</h3>
    <p>I can teach Korean in your view because that was what I had experience from my friend who was an English native when I started to study English. Don't worry about anything. I can raise you up like what my friend did for me!</p>
  </div>
  <div class="specialty">
    <h3>Conversational Korean</h3>
    <p>I have many foreign friends who can speak Korean so we usually have a communication in Korea. If you want to have this kind of conversation with me, I totally recommend this!</p>
  </div>
  <div class="specialty">
    <h3>Intensive Korean</h3>
    <p>I can make a textbook for you depending on your needs. At first class, I will ask you what kinds of Korean skills you want, and then I will make it for our next class so that we can study together with it more intensively!</p>
  </div>
  <div class="specialty">
    <h3>TOPIK</h3>
    <p>A friend of mine is seriously studying hard TOPIK, so I have gotten countless questions from her. I can teach you really well like what I have taught her so far. As friendly as a friend!</p>
  </div>
</div>
`,
  };
  
  function showTab(tabName) {
    // Remove 'active' class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
    });
  
    // Set 'active' class on clicked tab
    const activeTab = document.querySelector('.tab[onclick="showTab(\'' + tabName + '\')"]');
    activeTab.classList.add('active');
  
    // Display the content for the clicked tab
    document.getElementById('tab-content').innerHTML = tabContent[tabName];
  }
  
  // Function to initially load the "About" section content when the page loads
  function loadInitialTabContent() {
    document.getElementById('tab-content').innerHTML = tabContent['about'];
  }
  
  // Call this function to load the "About" content by default
  loadInitialTabContent();

  function showTab(tabName) {
    // Remove 'active' class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
    });
  
    // Set 'active' class on clicked tab
    const activeTab = document.querySelector('.tab[onclick="showTab(\'' + tabName + '\')"]');
    activeTab.classList.add('active');
  
    // Display the content for the clicked tab
    document.getElementById('tab-content').innerHTML = tabContent[tabName];
  }
  
  // Additional logic for the Schedule tab
  function selectDuration(duration) {
    // Update classes for duration buttons
    document.querySelectorAll('.time-button').forEach(button => {
      button.classList.remove('selected');
    });
    document.querySelector('.time-button[onclick="selectDuration(\'' + duration + '\')"]').classList.add('selected');
    
    // Update the schedule based on the selected duration
    // Placeholder: Implement the logic to filter or load the schedule based on the selected duration
  }
  
  function changeWeek(direction) {
    // Placeholder: Implement the logic to change the week range
    // This could involve calculating new dates and loading the corresponding schedule
    let currentWeekSpan = document.getElementById('week-range').textContent;
    // Logic to calculate new week range based on 'direction' (-1 for previous, 1 for next)
    // Update the week range display
    // document.getElementById('week-range').textContent = newWeekRange;
  }
  
  // Function to initially load the "About" section content when the page loads
  function loadInitialTabContent() {
    document.getElementById('tab-content').innerHTML = tabContent['about'];
  }
  
  // Call this function to load the "About" content by default
  loadInitialTabContent();

  function toggleResumeSection(section) {
    // Hide all sections
    document.getElementById('education-content').style.display = 'none';
    document.getElementById('work-experience-content').style.display = 'none';
  
    // Remove 'active' class from all tabs
    document.querySelectorAll('.resume-tab').forEach(tab => {
      tab.classList.remove('active');
    });
  
    // Show the selected section and add 'active' class to the selected tab
    document.getElementById(`${section}-content`).style.display = 'block';
    document.querySelector(`.resume-tab[onclick="toggleResumeSection('${section}')"]`).classList.add('active');
  }
  