// ======= Pagination state =======
let currentPage = 1;
const blogsPerPage = 12;
let totalBlogs = 0;

// ======= Search state =======
let allBlogs = [];
let isSearching = false;
let searchResults = [];

const baseUrl = "https://dummyjson.com/posts";

// ======= Fetch paginated blogs =======
async function fetchBlogs({ limit = blogsPerPage, skip = 0 } = {}) {
  const res = await fetch(`${baseUrl}?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error(`API Failed: ${res.status}`);
  return res.json();
}

// ======= Fetch ALL blogs once (for search) =======
async function fetchAllBlogsForSearch() {
  const {total} = await fetchBlogs();
  const res = await fetch(`${baseUrl}?limit=${total}`);
  if (!res.ok) throw new Error("Search preload failed");
  const data = await res.json();
  allBlogs = data.posts;
}

// ======= Create blog card =======
function blogCard(post) {
  const div = document.createElement("div");
  div.className =
    "bg-black text-white shadow-lg hover:shadow-xl p-4 rounded-lg transition transform hover:scale-105";

  div.innerHTML = `
    <h2 class="text-xl font-bold mb-1">${post.title ?? "No Title"}</h2>
    <h3 class="my-2 font-semibold text-gray-300">${post.tags?.join(", ") || "No Tags"}</h3>
    <p class="text-sm mb-4">${post.body ?? "No Content"}</p>
    <div class="flex justify-between border-t border-gray-500 pt-2">
      <div class="flex gap-4">
        <span>👍 ${post.reactions?.likes ?? 0}</span>
        <span>👎 ${post.reactions?.dislikes ?? 0}</span>
      </div>
      <div>👁 ${post.views ?? 0}</div>
    </div>
  `;
  return div;
}

// ======= Show blogs =======
async function showBlogs(page = 1) {
  try {
    const blogsEl = document.getElementById("blogs");
    const statusEl = document.getElementById("status");
    const totalEl = document.getElementById("total-blogs");

    blogsEl.innerHTML = "";
    statusEl.textContent = "Loading...";

    let posts = [];
    let total = 0;

    if (isSearching) {
      total = searchResults.length;
      const start = (page - 1) * blogsPerPage;
      posts = searchResults.slice(start, start + blogsPerPage);
    } else {
      const skip = (page - 1) * blogsPerPage;
      const res = await fetchBlogs({ limit: blogsPerPage, skip });
      posts = res.posts;
      total = res.total;
    }

    statusEl.textContent = "";
    totalEl.textContent = `Total Blogs: ${total}`;
    totalBlogs = total;
    currentPage = page;

    posts.forEach(post => blogsEl.appendChild(blogCard(post)));

    updatePaginationButtons();
    renderPageNumbers();
  } catch (error) {
    document.getElementById("status").textContent =
      "Unable to load blogs. Please try again later";
    console.error(error.message);
  }
}

// ======= Pagination buttons =======
function updatePaginationButtons() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  prevBtn.classList.toggle("opacity-50", prevBtn.disabled);
  prevBtn.classList.toggle("cursor-not-allowed", prevBtn.disabled);
  nextBtn.classList.toggle("opacity-50", nextBtn.disabled);
  nextBtn.classList.toggle("cursor-not-allowed", nextBtn.disabled);
}

// ======= Page numbers (sliding) =======
function renderPageNumbers() {
  const el = document.getElementById("page-numbers");
  el.innerHTML = "";

  const totalPages = Math.ceil(totalBlogs / blogsPerPage);
  const maxVisible = 5;

  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `
      px-2 sm:px-3 py-1 rounded
      ${i === currentPage ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"}
    `;
    btn.onclick = () => showBlogs(i);
    el.appendChild(btn);
  }
}

// ======= Prev / Next events =======
document.getElementById("prev-btn").onclick = () => {
  if (currentPage > 1) showBlogs(currentPage - 1);
};

document.getElementById("next-btn").onclick = () => {
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);
  if (currentPage < totalPages) showBlogs(currentPage + 1);
};

// ======= Search input =======
document.getElementById("search-input").addEventListener("input", (e) => {
  const value = e.target.value.trim().toLowerCase();

  if (!value) {
    isSearching = false;
    currentPage = 1;
    showBlogs(currentPage);
    return;
  }

  isSearching = true;
  currentPage = 1;

  searchResults = allBlogs.filter(post =>
    post.title.toLowerCase().includes(value) ||
    post.body.toLowerCase().includes(value) ||
    post.tags.join(" ").toLowerCase().includes(value)
  );

  showBlogs(currentPage);
});

// ======= Init =======
fetchAllBlogsForSearch();
showBlogs(currentPage);
