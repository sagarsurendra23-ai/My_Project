document.getElementById("year").textContent = new Date().getFullYear();


// Reveal sections as they enter the viewport; graceful fallback if IntersectionObserver is unavailable.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Active navigation state based on the current section.
const navLinks = document.querySelectorAll(".nav-link");
const sections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: "-25% 0px -60% 0px" });
  sections.forEach((section) => navObserver.observe(section));
}

// Online flipbook reader. Each module also has a separate PDF download link.
const bookDialog = document.getElementById('bookDialog');
const bookTitle = document.getElementById('bookTitle');
const bookPage = document.getElementById('bookPage');
const bookPageImage = document.getElementById('bookPageImage');
const pageLabel = document.getElementById('pageLabel');
const pageProgress = document.getElementById('pageProgress');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const pageCounts = {1:11, 2:11, 3:11, 4:11, 5:11};
const bookSlugs = {
  1: 'module-1-introduction-to-data-science',
  2: 'module-2-python-for-data-science',
  3: 'module-3-statistics-and-probability',
  4: 'module-4-data-analysis-and-visualization',
  5: 'module-5-machine-learning-fundamentals'
};
let activeBook = 1;
let activePage = 1;
let pageTurnTimer;

function renderBookPage(direction = '') {
  const count = pageCounts[activeBook];
  bookPage.classList.remove('turn-next', 'turn-prev');
  if (direction) {
    bookPage.classList.add(direction === 'next' ? 'turn-next' : 'turn-prev');
    clearTimeout(pageTurnTimer);
    pageTurnTimer = setTimeout(() => bookPage.classList.remove('turn-next', 'turn-prev'), 380);
  }
  bookPageImage.src = `assets/flipbooks/${bookSlugs[activeBook]}/page-${String(activePage).padStart(2,'0')}.webp`;
  bookPageImage.alt = `${bookTitle.textContent}, page ${activePage}`;
  pageLabel.textContent = `PAGE ${String(activePage).padStart(2,'0')} / ${String(count).padStart(2,'0')}`;
  pageProgress.style.width = `${activePage / count * 100}%`;
  prevPageButton.disabled = activePage <= 1;
  nextPageButton.disabled = activePage >= count;
}

function turnPage(direction) {
  const next = activePage + (direction === 'next' ? 1 : -1);
  if (next < 1 || next > pageCounts[activeBook]) return;
  activePage = next;
  renderBookPage(direction);
}

document.querySelectorAll('.open-book').forEach((button) => {
  button.addEventListener('click', () => {
    activeBook = Number(button.dataset.module);
    activePage = 1;
    bookTitle.textContent = button.dataset.title || `Module ${activeBook}`;
    renderBookPage();
    bookDialog.showModal();
  });
});
prevPageButton.addEventListener('click', () => turnPage('prev'));
nextPageButton.addEventListener('click', () => turnPage('next'));
document.getElementById('firstPage').addEventListener('click', () => { activePage = 1; renderBookPage('prev'); });
document.getElementById('lastPage').addEventListener('click', () => { activePage = pageCounts[activeBook]; renderBookPage('next'); });
document.getElementById('closeBook').addEventListener('click', () => bookDialog.close());
bookDialog.addEventListener('click', (event) => { if (event.target === bookDialog) bookDialog.close(); });
document.addEventListener('keydown', (event) => {
  if (!bookDialog.open) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); turnPage('next'); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); turnPage('prev'); }
});
