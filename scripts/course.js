// course.js
// Course data for the Web and Computer Programming certificate.
// Update the "completed" property as i finish each course.

const courses = [
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: true },
  { subject: "WDD", number: 130, title: "Web Fundamentals",            credits: 2, completed: true },
  { subject: "CSE", number: 111, title: "Programming with Functions",  credits: 2, completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals",    credits: 2, completed: true },
  { subject: "CSE", number: 210, title: "Programming with Classes",    credits: 2, completed: true },
  { subject: "WDD", number: 231, title: "Web Frontend Development I",  credits: 2, completed: true },
];

const courseGrid = document.getElementById('course-grid');
const creditCount = document.getElementById('credit-count');
const filterButtons = document.querySelectorAll('#filter-buttons button');

function renderCourses(filter = 'all') {
  const filtered = filter === 'all'
    ? courses
    : courses.filter(course => course.subject.toLowerCase() === filter);

  courseGrid.innerHTML = filtered.map(course => `
    <div class="course-card ${course.completed ? 'completed' : ''}">
      <span class="course-tag">${course.subject}&middot;${course.number}</span>
      <span class="course-title">${course.title}</span>
      <span class="course-credits">${course.credits} credits</span>
    </div>
  `).join('');

  const totalCredits = filtered.reduce((total, course) => total + course.credits, 0);
  creditCount.textContent = totalCredits;
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    renderCourses(button.dataset.filter);
  });
});

renderCourses();