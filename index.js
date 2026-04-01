const modal = document.getElementById('my_modal');
const modalContent = document.getElementById('modal-content');
document.addEventListener("DOMContentLoaded", () => {

  const loginSection = document.getElementById("login-section");
  const homeSection = document.getElementById("home-section");
  const form = document.getElementById("form");

  // login
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    loginSection.classList.add("hidden");
    homeSection.classList.remove("hidden");
  } else {
    loginSection.classList.remove("hidden");
    homeSection.classList.add("hidden");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("user").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");

      loginSection.classList.add("hidden");
      homeSection.classList.remove("hidden");

      form.reset();
    } else {
      alert("Invalid username or password");
    }
  });

});

function getPriorityButton(priority) {
  const display = (priority || 'HIGH').toUpperCase(); // force uppercase
  let bg = '';
  let text = '';

  switch (display) {
    case 'HIGH':
      bg = 'bg-red-100';
      text = 'text-red-500';
      break;
    case 'MEDIUM':
      bg = 'bg-yellow-100';
      text = 'text-yellow-500';
      break;
    case 'LOW':
      bg = 'bg-gray-100';
      text = 'text-gray-500';
      break;
    default:
      bg = 'bg-red-100';
      text = 'text-red-500';
  }

  return `<button class="px-4 rounded-3xl ${bg} ${text}">${display}</button>`;
}

const issuesContainer = document.getElementById('issues-container');
const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn');
const closedBtn = document.getElementById('closed-btn');

let issuesData = [];

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  issuesContainer.innerHTML = '<p>Loading...</p>';

  try {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    issuesData = data.data || [];
    renderIssues(issuesData);
  } catch (err) {
    console.error('Error searching issues:', err);
    issuesContainer.innerHTML = '<p class="text-red-500">Failed to search issues.</p>';
  }
});

// issueFetch
async function fetchIssues() {
  manageSpinner(true)
  try {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    console.log(data.data)
    issuesData = data.data; 
    renderIssues(issuesData); 
  } catch (err) {
    console.error('Error fetching issues:', err);
    issuesContainer.innerHTML = '<p class="text-red-500">Failed to load issues.</p>';
  }
}
const issuesCountHeading = document.querySelector('.flex.p-4 div h2'); 

function updateIssuesCount(issues) {
  issuesCountHeading.textContent = `${issues.length} issues`;
  
}
// modal

 function openModal(issue) {
      modalContent.innerHTML = `
      <div>
      <h1 class="font-semibold text-xl">${issue.title}</h1>
      <div class="flex gap-4 my-3">
      <p class="px-3 bg-green-500 text-white rounded-2xl">${issue.status}</p>
      <p class="flex gap-2 text-gray-500"><span>.</span>${issue.author}</p>
      <p class="flex gap-2 text-gray-500"><span>.</span>${issue.createdAt}</p>
      </div>
       <div class="flex items-center gap-2 my-4 flex-wrap">
  ${
    issue.labels.map(label => `
      <span class="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
        ${label}
      </span>
    `).join('')
  }
</div>
<p class="text-gray-500">${issue.description}</p>
<div class="bg-gray-200 flex justify-between p-5 my-4">
<div class="grid">
<h3>Assignee:</h3>
<p>${issue.assignee || 'Unassigned'}</p>
</div>
<div class="grid">
<h3>Priority:</h3>
<p class="px-4 bg-red-500 text-white rounded-2xl ">${issue.priority || "unknown"}</p>
</div>
</div>
      </div>
       `;
      modal.showModal();
    }

    function closeModal() { modal.close(); }


function renderIssues(issues) {
  issuesContainer.innerHTML = ''; 
 updateIssuesCount(issues);
  issues.forEach(issue => {
    const card = document.createElement('div');
   const borderColor =
  issue.status.toLowerCase() === 'open'
    ? 'border-green-500'
    : 'border-purple-500';

card.className = `card  h-full bg-base-100 border-t-4 ${borderColor} shadow-sm mb-5`;
    card.innerHTML = `
      <div  class="card-body  h-full flex flex-col justify-between">
        <div class="flex justify-between">
          <img src="assets/Open-Status.png" alt="">
         ${getPriorityButton(issue.priority)}
        </div>
        <div>
          <h1 class="font-semibold text-xl">${issue.title}</h1>
          <p class="text-gray-600 my-2">${issue.description}</p>
        <div class="flex items-center gap-2 my-4 flex-wrap">
  ${
    issue.labels.map(label => `
      <span class="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
        ${label}
      </span>
    `).join('')
  }
</div>
          <div class="border border-gray-200"></div>
          <div class="my-4">
            <p>#${issue.id} by ${issue.author || 'unknown'}</p>
            <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    `;
     card.addEventListener('click', () => openModal(issue));

    issuesContainer.appendChild(card);
   
  });
  manageSpinner(false)
}

// button 
function setActiveButton(activeBtn) {
  [allBtn, openBtn, closedBtn].forEach(btn => {
    btn.classList.remove('bg-[#4A00FF]', 'text-white');
  });

  activeBtn.classList.add('bg-[#4A00FF]', 'text-white');
}
allBtn.addEventListener('click', () => {
  setActiveButton(allBtn);
  renderIssues(issuesData);
});

openBtn.addEventListener('click', () => {
  setActiveButton(openBtn);
  const openIssues = issuesData.filter(i => i.status.toLowerCase() === 'open');
  renderIssues(openIssues);
});

closedBtn.addEventListener('click', () => {
  setActiveButton(closedBtn);
  const closedIssues = issuesData.filter(i => i.status.toLowerCase() === 'closed');
  renderIssues(closedIssues);
});
// spinner

const manageSpinner=(status)=>{
  if(status==true){
    document.getElementById('spinner').classList.remove('hidden')
    document.getElementById('card-sec').classList.add('hidden')
  }else {
    document.getElementById('card-sec').classList.remove('hidden')
    document.getElementById('spinner').classList.add('hidden')
  }
}
setActiveButton(allBtn);
fetchIssues();