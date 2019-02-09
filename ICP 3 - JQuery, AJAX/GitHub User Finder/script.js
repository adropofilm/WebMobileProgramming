
function getGithubInfo(username) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)
    const baseURL = 'https://api.github.com/users';
    const endpoint = `${baseURL}/${username}`;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.status == 200) {
        showUser(request.response);
      } else if (request.status == 404){
        noSuchUser(username);
      }
    };
    request.open("GET", endpoint, true);
    request.send();
}

function showUser(response) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    var user = JSON.parse(response);
    const info_div = document.getElementById('information').innerHTML =
    `<ul>
      <li> Name: ${user.name} </li>
      <li> ID: ${user.id} </li>
      <li> <a href=${user.html_url}> Github Link</a> </li>
    </ul>
    `;
    const avatar = document.getElementById('avatar').innerHTML =
      `<img src=${user.avatar_url}>`;
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
      const avatar = document.getElementById('avatar').innerHTML = `<img src='404.png'>`;
      const info_div = document.getElementById('information').innerHTML =
        `<h1>${username} not found</h1>`;
}

$(document).ready(function(){
    $(document).on('keypress', '#username', function(e){
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            getGithubInfo(username);
        }
    })
});
