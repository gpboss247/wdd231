// course.js
// Course data for the Web and Computer Programming certificate.
// Update the "completed" property as you finish each course.

const courses = [
  {
    subject: "CSE", number: 110, title: "Introduction to Programming",
    credits: 2, completed: true,
    certificate: "Web and Computer Programming",
    description: "An introduction to programming concepts including variables, conditionals, loops, and functions, using a language to build foundational problem solving skills.",
    technology: ["Python"]
  },
  {
    subject: "WDD", number: 130, title: "Web Fundamentals",
    credits: 2, completed: true,
    certificate: "Web and Computer Programming",
    description: "An introduction to the core building blocks of the web, covering semantic HTML structure and foundational CSS styling to create simple, well formed web pages.",
    technology: ["HTML", "CSS"]
  },
  {
    subject: "CSE", number: 111, title: "Programming with Functions",
    credits: 2, completed: true,
    certificate: "Web and Computer Programming",
    description: "Builds on introductory programming skills with a focus on writing reusable functions, handling errors, and working with files and structured data.",
    technology: ["Python"]
  },
  {
    subject: "WDD", number: 131, title: "Dynamic Web Fundamentals",
    credits: 2, completed: true,
    certificate: "Web and Computer Programming",
    description: "Introduces JavaScript fundamentals for adding interactivity and dynamic behavior to web pages, including DOM manipulation and working with arrays and objects.",
    technology: ["HTML", "CSS", "JavaScript"]
  },
  {
    subject: "CSE", number: 210, title: "Programming with Classes",
    credits: 2, completed: true,
    certificate: "Web and Computer Programming",
    description: "Covers object-oriented programming principles including classes, inheritance, polymorphism, and encapsulation, applied through multi file program design.",
    technology: ["C#"]
  },
  {
    subject: "WDD", number: 231, title: "Web Frontend Development I",
    credits: 2, completed: true,
    certificate: "Web and Computer Programming",
    description: "Focuses on building responsive, accessible and standards based websites using semantic HTML, custom CSS, and vanilla JavaScript, including working with APIs and JSON data.",
    technology: ["HTML", "CSS", "JavaScript"]
  },
];

const courseGrid = document.getElementById('course-grid');
const creditCount = document.getElementById('credit-count');
const filterButtons = document.querySelectorAll('#filter-buttons button');
const courseDetails = document.getElementById('course-details');

function renderCourses(filter = 'all') {
  const filtered = filter === 'all'
    ? courses
    : courses.filter(course => course.subject.toLowerCase() === filter);

  courseGrid.innerHTML = filtered.map(course => `
    <div class="course-card ${course.completed ? 'completed' : ''}" data-subject="${course.subject}" data-number="${course.number}">
      <span class="course-tag">${course.subject}&middot;${course.number}</span>
      <span class="course-title">${course.title}</span>
      <span class="course-credits">${course.credits} credits</span>
    </div>
  `).join('');

  const totalCredits = filtered.reduce((total, course) => total + course.credits, 0);
  creditCount.textContent = totalCredits;

  // Attach a click listener to each rendered card so it opens the
  // modal with that course's full details.
  const cardElements = document.querySelectorAll('.course-card');
  cardElements.forEach(card => {
    card.addEventListener('click', () => {
      const subject = card.dataset.subject;
      const number = Number(card.dataset.number);
      const course = courses.find(c => c.subject === subject && c.number === number);
      displayCourseDetails(course);
    });
  });
}

function displayCourseDetails(course) {
  courseDetails.innerHTML = `
    <button id="closeModal" aria-label="Close details">&#10005;</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;

  courseDetails.showModal();

  const closeModal = document.getElementById('closeModal');
  closeModal.addEventListener('click', () => {
    courseDetails.close();
  });
}

// Close the modal if the user clicks outside of it (on the backdrop).
courseDetails.addEventListener('click', (event) => {
  const dialogBounds = courseDetails.getBoundingClientRect();
  const clickedOutside =
    event.clientX < dialogBounds.left ||
    event.clientX > dialogBounds.right ||
    event.clientY < dialogBounds.top ||
    event.clientY > dialogBounds.bottom;

  if (clickedOutside) {
    courseDetails.close();
  }
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    renderCourses(button.dataset.filter);
  });
});

renderCourses();