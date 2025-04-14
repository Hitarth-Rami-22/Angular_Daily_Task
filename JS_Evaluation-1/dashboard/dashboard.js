// Error handling for localStorage
function getLocalStorageItem(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
}

// Check login
const user = getLocalStorageItem("loggedInUser");
if (!user) {
  window.location.href = "../login/login.html";
}

// Show username
document.getElementById("username").textContent = user.username;

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "../login/login.html";
});

const blogs = getLocalStorageItem("blogs") || [];
const container = document.getElementById("blogsContainer");

// Sanitize HTML input
function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Render blog posts
function renderBlogs() {
  container.innerHTML = ''; // Clear existing content
  
  blogs.forEach((blog, index) => {
    const blogCard = document.createElement("div");
    blogCard.className = "blog-card";

    blogCard.innerHTML = `
      <h3 class="blog-title">
        ${sanitizeHTML(blog.title)}
        <span class="comment-badge">${blog.comments.length}</span>
      </h3>
      <img src="../common/images/build-image-carousel-scratch-vanilla-javascript.png" alt="Blog Image"/>
      <p>${sanitizeHTML(blog.content)}</p>

      <div class="comment-list" id="comments-${index}">
        ${blog.comments.map((c, ci) =>
          `<div class="comment-item">
            <strong>${sanitizeHTML(c.username)}:</strong>
            <span>${sanitizeHTML(c.content)}</span>
            ${c.username === user.username ? 
              `<button onclick="editComment(${index}, ${ci})">Edit</button>
               <button onclick="deleteComment(${index}, ${ci})">Delete</button>` : 
              ''}
          </div>`).join("")}
      </div>

      <div class="comment-form">
        <textarea id="comment-${index}" placeholder="Add a comment..."></textarea>
        <button onclick="addComment(${index})">Post Comment</button>
      </div>
    `;

    container.appendChild(blogCard);
  });
}

// Add new comment
function addComment(blogIndex) {
  const textarea = document.getElementById(`comment-${blogIndex}`);
  const content = textarea.value.trim();
  
  if (!content) {
    alert('Please enter a comment');
    return;
  }

  blogs[blogIndex].comments.push({ 
    username: user.username, 
    content: sanitizeHTML(content) 
  });
  
  try {
    localStorage.setItem("blogs", JSON.stringify(blogs));
    renderBlogs(); // Update UI without page reload
    textarea.value = ''; // Clear the textarea
  } catch (error) {
    console.error('Error saving comment:', error);
    alert('Failed to save comment. Please try again.');
  }
}

// Edit comment
function editComment(blogIndex, commentIndex) {
  const commentItem = document.querySelector(`#comments-${blogIndex} .comment-item:nth-child(${commentIndex + 1}) span`);
  const currentContent = commentItem.textContent;
  
  commentItem.innerHTML = `
    <input type="text" value="${currentContent}" />
    <button onclick="saveComment(${blogIndex}, ${commentIndex}, this.previousElementSibling.value)">Save</button>
    <button onclick="cancelEdit(${blogIndex}, ${commentIndex}, '${currentContent}')">Cancel</button>
  `;
}

// Save edited comment
function saveComment(blogIndex, commentIndex, newContent) {
  if (!newContent.trim()) {
    alert('Comment cannot be empty');
    return;
  }

  blogs[blogIndex].comments[commentIndex].content = sanitizeHTML(newContent);
  
  try {
    localStorage.setItem("blogs", JSON.stringify(blogs));
    renderBlogs();
  } catch (error) {
    console.error('Error saving edited comment:', error);
    alert('Failed to save comment. Please try again.');
  }
}

// Cancel edit
function cancelEdit(blogIndex, commentIndex, originalContent) {
  renderBlogs();
}

// Delete comment
function deleteComment(blogIndex, commentIndex) {
  if (confirm('Are you sure you want to delete this comment?')) {
    blogs[blogIndex].comments.splice(commentIndex, 1);
    
    try {
      localStorage.setItem("blogs", JSON.stringify(blogs));
      renderBlogs();
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Please try again.');
    }
  }
}

// Initial render
renderBlogs();
