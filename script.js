const button = document.querySelector("#submit")  
button.addEventListener("click",(e)=>{
    const username = document.querySelector("#username").value
    console.log(username)
     
    fetch(`https://api.github.com/users/${username}`)
    .then(raw => raw.json())
    .then(data =>{
        document.getElementById('userData').innerHTML = `
            <img src="${data.avatar_url}" alt="Avatar">
            <h2>${data.name || 'No name provided'}</h2>
            <p><strong>Username:</strong> ${data.login}</p>
            <p><strong>Public Repos:</strong> ${data.public_repos}</p>
            <p><strong>Followers:</strong> ${data.followers}</p>
            <p><strong>Following:</strong> ${data.following}</p>
            <p><a href="${data.html_url}" target="_blank">View Profile</a></p>
          `;
      
    })

})