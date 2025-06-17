const submitBtn = document.querySelector(".submit");
let username = document.querySelector(".username");

function getUserData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) {
      throw new Error(" Please Enter correct username "); // This will trigger catch
    }
    return raw.json();
  });
}
function getRepoData(username) {
  return fetch(`https://api.github.com/users/${username}/repos`).then((raw) => {
    return raw.json();
  });
}

function fillUserData(data) {
  return `<img src="${data.avatar_url}" alt="Profile Picture"
                 class="w-28 h-28 rounded-full mx-auto shadow-md mb-4 object-cover ring-2 ring-purple-500">
            <h2 class="text-xl font-semibold text-white mb-3">${
              data.name ?? data.login
            }</h2>

            <div class="flex justify-around text-sm text-gray-400">
              <div>
                <span class="block text-lg font-bold text-purple-400">${
                  data.followers
                }</span>
                Followers
              </div>
              <div>
                <span class="block text-lg font-bold text-purple-400">${
                  data.following
                }</span>
                Following
              </div>
              <div>
                <span class="block text-lg font-bold text-purple-400">${
                  data.public_repos
                }</span>
                Repos
              </div>
            </div>
        `;
}

function fillRepoData(repos) {
if (!repos || repos.length === 0) {
    return `<p class="text-gray-400">No public repos found.</p>`;
  } 
   const listItems = repos
  .map((repo)=>{
    return `
      <li class="bg-gray-800 px-4 py-2 rounded-lg text-sm text-gray-200 hover:bg-purple-600 transition">
        <a href='${repo.html_url}' target="_blank">${repo.name}</a>
      </li>
    `
  }).join('')

  return`<h3 class="text-lg font-semibold text-white mb-3">📁 Repositories</h3>
      <ul class="max-h-48 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
        ${listItems}
      </ul>
  `;
}


submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const usernameValue = username.value.trim();

  try {
    const userData = await getUserData(usernameValue);
    const repoData = await getRepoData(usernameValue);

    console.log("User:", userData);
    console.log("Repos:", repoData);

    document.querySelector(".profile-card").innerHTML = fillUserData(userData);
    document.querySelector(".repos").innerHTML = fillRepoData(repoData);

  } catch(err) {

    document.querySelector(".profile-card").innerHTML = 
    `
      <p style="color:red"> ${err.message} </p>
    `;
    document.querySelector(".repos").innerHTML = "";
  }
});
