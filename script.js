const submitBtn = document.querySelector(".submit");
let username = document.querySelector(".username")


  function getUserData(username){
     return fetch(`https://api.github.com/users/${username}`)
    .then(raw => {
        if(!raw.ok) {
            throw new Error(' Please Enter correct username ');  // This will trigger catch
        }
        console.log(raw)
        return raw.json()
    })
  }

  function fillUserData(data){
        return  `<img src="${data.avatar_url}" alt="Profile Picture"
                 class="w-28 h-28 rounded-full mx-auto shadow-lg mb-4 object-cover">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">${data.name ?? data.login}</h2>

            <div class="flex justify-around text-center text-gray-600 mb-4">
              <div>
                <span class="block text-lg font-bold text-indigo-500">${data.followers}</span>
                Followers
              </div>
              <div>
                <span class="block text-lg font-bold text-indigo-500">${data.following}</span>
                Following
              </div>
              <div>
                <span class="block text-lg font-bold text-indigo-500">${data.public_repos}</span>
                Repos
              </div>
            </div>
        `;
  }

  
  submitBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    const usernameValue = username.value.trim();

    console.log(usernameValue)
    getUserData(usernameValue) 
    .then(data =>{
        console.log(data)
        document.querySelector('.profile-card').innerHTML = fillUserData(data)
      
    }).catch(()=>{
        document.querySelector('.profile-card').innerHTML = `
        <p style="color:red"> Please enter correct username!!! </p>`
    })


})