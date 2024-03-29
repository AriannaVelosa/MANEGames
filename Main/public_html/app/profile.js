/**
 *  Authors: Arianna Velosa, Michelle Ramos-Hernandez, Emma Elliot,Noelle Healey-Stewart

 * This javascript will create the functionality for
 * the profile page. It will allow the users to click
 * buttons to see infomation about their profile
 */


// this function will get the current users who is using the
// site, then display their user name in the top right hand corner when
// the page loads
var currUser = ""
function getCurrUser() {
    fetch("/get/curUsers/")
        .then(res => {
            return res.text();
        }).then(text => {
            currUser = text;
            usernameBox = document.getElementById("username");
            usernameBox.innerText += " " + currUser;
        })

}

function goBack() {
    window.location.href = "http://localhost/app/main.html";
}



function logOut() {
    fetch("/logout/user/", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => {
            return res.text();
        }).then(text => {
            if (text == "SUCCESS") {
                window.location.href = "http://localhost/index.html";
            }

        })
}

// this function will show the followers that the
// current users has in the column on the
// right when the user clicks the "show followers"
// button

const col2 = document.getElementById("column2");

function showFollowers() {
    col2.innerHTML = "";
    // fetch request to get followers from the database
    fetch("/get/followers/")

    .then((res) => {
        return res.text(); 
    })
    // will display followers on the page
    .then(followers => {
            data = JSON.parse(followers);
            topText = document.createElement("div")
            topText.innerText = 'You have ' + data.length + " followers"
            col2.appendChild(topText);
            for (let i = 0; i < data.length; i++) {
                curr = document.createElement('div');
                p = document.createElement('p');
                p.innerText = "Username: " + data[i]
                curr.appendChild(p)
                curr.style.height = "10vh";
                curr.style.border = "1px solid black"
                p.style.marginLeft = "25px"

                col2.appendChild(curr);
            }
        })

};

// this function will show the users that the that the
// current user is following in the column on the
// right when the user clicks the "show following"
// button
function showFollowing() {
    col2.innerHTML = "";
    // creates a fetch request to get following form the database
    fetch("/get/following/")

    .then((res) => {
        return res.text(); 
    })
    // will display the following users on the page
    .then(following => {

            data = JSON.parse(following);
            topText = document.createElement("div")
            topText.innerText = 'You are following ' + data.length + " users"
            col2.appendChild(topText);
            for (let i = 0; i < data.length; i++) {
                curr = document.createElement('div');
                p = document.createElement('p');
                p.innerText = "Username: " + data[i]
                curr.appendChild(p)
                curr.style.height = "10vh";
                curr.style.border = "1px solid black"
                p.style.marginLeft = "25px"

                col2.appendChild(curr);
            }
        })

};

function showStats() {
    col2.innerHTML = "";
    fetch("/get/stats")
        .then(res => {
            console.log(res);
            statsData = res;
            statsDiv = document.createElement("div");
            gameCounter = 0;
            for (let i = 0; i < statsData.length; i++) {
                currScore = statsData[i];
                curr = document.createElement('div');
                if (gameCounter == 0) {
                    curr.innerText += "Blackjack : " + currScore;
                }
                else if (gameCounter == 1) {
                    curr.innerText += "Boggle : " + currScore;
                }
                else if (gameCounter == 2) {
                    curr.innerText += "Hangman : " + currScore;
                }
                else {
                    curr.innerText += "Tic Tac Toe : " + currScore;
                }
                gameCounter += 1;
                col2.appendChild(curr);
            }
        }
        );
}

