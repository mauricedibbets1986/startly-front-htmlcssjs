window.onload = startlyLoad();

function startlyLoad() {
    console.log("startly load")
    loadAccountContent();
}

function currentTab(elem) {
    var a = document.getElementsByClassName('nav-link');
    for (i = 0; i < a.length; i++) {
        a[i].classList.remove('current-tab');
        a[i].childNodes[0].classList.remove ("nav-icon-active");
    }
    elem.classList.add("current-tab");
    elem.childNodes[0].classList.add ("nav-icon-active");
}

// TASK PAGES FUNCTIONS
//monthly tasks page
function loadTasksMonthlyContent() {

    var email = localStorage.getItem("startly-email");
    var password = localStorage.getItem("startly-password");
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){        
        if (xhr.readyState === XMLHttpRequest.DONE) {
        
            if (xhr.status === 'OK' || (xhr.status >= 200 && xhr.status < 400)) {
                var inhoudDB = JSON.parse(this.responseText);
                console.log("VERSTUREN loadAccountContent GELUKT!");
                var accountPageString =
                `
                <header class="content-header task-header">
                    <div class="container">
                        <div class="header-text-wrapper">
                            <div class="welcome-message">Hello, ${inhoudDB.userName}!</div>
                            <h1 class="h1 no-margin-bottom">These are your tasks. Give it your all!</h1>
                        </div>
                    </div>
                </header>


                <main class="main" id="task-monthly-main">
                    <div class="container">
                        <div class="actions-wrapper">
                            <select id="select-month" name="select-month" class="select-field">
                                <option value="Juni 2020">Juni 2020</option>
                                <option value="Juli 2020">Juli 2020</option>
                                <option value="Augustus 2020">Augustus 2020</option>
                                <option value="September 2020">September 2020 </option>
                            </select>
                            <button class="button new-button">New Task</button>
                        </div>
                        <div class="main-page-flex">
                            <div class="main-focus-content-wrapper">
                                <div class="card">

                                    <h2 class="h2">Tasks May 2020</h2>
                                    <div class="tasks-outer-wrapper">
                                        <div class="tasks-row header-row">
                                            <div class="task-column date-column">
                                                <h6 class="tasks-header">Datum</h6>
                                            </div>
                                            <div class="task-column date-what-column">
                                                <h6 class="tasks-header">Tasks</h6>
                                            </div>
                                            <div class="task-column">
                                                <h6 class="tasks-header">Totall time</h6>
                                            </div>
                                            <div class="task-column">
                                                <h6 class="tasks-header">Done?</h6>
                                            </div>
                                        </div>
                                        <div id="monthly-day-tasks">
                                            // days will be loaded from other function
                                        </div>
                                        <a href="#" class="tasks-row underlined w-inline-block">
                                            <div class="task-column date-column">
                                                <h6 class="tasks-header item-header">Maandag<br>18 mei</h6>
                                            </div>
                                            <div class="task-column date-what-column">
                                                <div class="paragraph-small">8 taken totaal</div>
                                            <div class="paragraph-small">Geen belangrijke afspraken</div>
                                            </div>
                                            <div class="task-column">
                                                <h6 class="tasks-header item-header">1,5 h</h6>
                                            </div>
                                            <div class="task-column"></div>
                                        </a>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="main-side-content-wrapper"></div>
                        </div>
                    </div>
                </main>
                `
                document.getElementById("page-content").innerHTML = accountPageString;
                loadAccountForm();
            } else {
                console.log("VERSTUREN loadAccountContent IS NIET GELUKT!");
            }
        }
    }   
     
    xhr.open("GET", "http://localhost:8082/api/customer/getByEmail/" + email, true);
    xhr.send();
}



// dayly tasks page
function loadTasksDailyContent() {

    var email = localStorage.getItem("startly-email");
    var today = new Date();
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){        
        if (xhr.readyState === XMLHttpRequest.DONE) {
        
            if (xhr.status === 'OK' || (xhr.status >= 200 && xhr.status < 400)) {
                var inhoudDB = JSON.parse(this.responseText);
                console.log("VERSTUREN loadAccountContent GELUKT!");
                var dailyPageString =
                `
                <header class="content-header task-header">
                    <div class="container">
                        <div class="header-text-wrapper">
                            <div class="welcome-message">Hello, ${inhoudDB.userName}!</div>
                            <h1 class="h1 no-margin-bottom">These are your tasks. Give it your all!</h1>
                        </div>
                    </div>
                </header>


                <main class="main" id="task-daily-main">
                    <div class="container">
                        <div class="actions-wrapper">
                            <input type="date" id="task-date-picker" name="task-date-picker" onchange="loadDayTasks(this.value)"></input>
                            <button class="button new-button" onclick="customerNewTask(${inhoudDB.userId})">New Task</button>
                        </div>
                        <div class="main-page-flex">
                            <div class="main-focus-content-wrapper">
                                <div class="card" id="monthly-day-tasks">
                                    // loaded from other js function
                                </div>
                            </div>
                            <div class="main-side-content-wrapper"></div>
                        </div>
                    </div>
                </main>
                `
                document.getElementById("page-content").innerHTML = dailyPageString;
                document.getElementById('task-date-picker').value = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + 
                '-' + today.getDate().toString().padStart(2, 0);
                loadDayTasks(today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + 
                '-' + today.getDate().toString().padStart(2, 0));
            } else {
                console.log("VERSTUREN loadAccountContent IS NIET GELUKT!");
            }
        }
    }   
     
    xhr.open("GET", "http://localhost:8082/api/customer/getByEmail/" + email, true);
    xhr.send();
}

function customerNewTask(id) {
    console.log("add task function started");

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){

        if (xhr.readyState === XMLHttpRequest.DONE) {
        
            if (xhr.status === 'OK' || (xhr.status >= 200 && xhr.status < 400)) {
                console.log("VERSTUREN ADD NEW TASK GELUKT!");
                loadTasksDailyContent();
            } else {
                console.log("VERSTUREN ADD NEW TASK IS NIET GELUKT!");
            }
        }   
    }

    var task = {};
    task.taskName = "Enter task name";
    task.taskExplain = "describe your task here";
    task.taskStatus = "Backlog";
    task.takDuration = 1.0;
    task.taskTimeLeft = 1.0;
    task.taskDate = new Date().toISOString().substring(0,10);


    var json = JSON.stringify(task);

    xhr.open("POST", "http://localhost:8082/api/task/" + id, true);
    xhr.setRequestHeader("Content-type","application/json")
    xhr.send(json);
}


function loadDayTasks(date) {
    var email = localStorage.getItem("startly-email");
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){        
        if (xhr.readyState === XMLHttpRequest.DONE) {
        
            if (xhr.status === 'OK' || (xhr.status >= 200 && xhr.status < 400)) {
                var inhoudDB = JSON.parse(this.responseText);
                console.log("VERSTUREN loadCustomerDailyTasks GELUKT!");
                var loadCustomerDailyTasksString =
                `
                <h2 class="h2">Tasks on</h2>
                <div class="tasks-outer-wrapper">
                    <div class="tasks-row header-row">
                        <div class="task-column what-column">
                            <h6 class="tasks-header">What task</h6>
                        </div>
                        <div class="task-column">
                            <h6 class="tasks-header">Time</h6>
                        </div>
                        <div class="task-column">
                            <h6 class="tasks-header">Done?</h6>
                        </div>
                    </div>
                `;
                for (x=0; x<inhoudDB.length; x++) {
                loadCustomerDailyTasksString +=
                    `
                    <a href="#" class="tasks-row underlined" onclick="loadSingleTask(${inhoudDB[x].taskId})">
                        <div class="task-column what-column what-flex">
                            <div class="type-of-task-color-circle"></div>
                            <div class="task-column-text-wrapper">
                                <h6 class="tasks-header item-header">${inhoudDB[x].taskName}</h6>
                                <div class="paragraph-small">${inhoudDB[x].taskExplain}</div>
                            </div>
                        </div>
                        <div class="task-column">
                            <h6 class="tasks-header item-header">${inhoudDB[x].taskTimeLeft}</h6>
                        </div>
                        <div class="task-column"></div>
                    </a>
                    `;
                }
                loadCustomerDailyTasksString += "</div>"
                document.getElementById("monthly-day-tasks").innerHTML = loadCustomerDailyTasksString;
            } else {
                console.log("VERSTUREN loadCustomerDailyTasks IS NIET GELUKT!");
            }
        }
    }   
    xhr.open("GET", "http://localhost:8082/api/customer/getByEmail/" + email + "/" + date, true);
    xhr.send();   
}

//single task page
function loadSingleTask(id) {
    var email = localStorage.getItem("startly-email");
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){        
        if (xhr.readyState === XMLHttpRequest.DONE) {
        
            if (xhr.status === 'OK' || (xhr.status >= 200 && xhr.status < 400)) {
                var inhoudDB = JSON.parse(this.responseText);
                console.log("VERSTUREN loadSingleTask GELUKT!");
                var singleDayString =
                `
                <header class="content-header task-header">
                    <div class="container">
                        <div class="header-text-wrapper">
                            <div class="welcome-message">Hello, customerName!</div>
                            <h1 class="h1 no-margin-bottom">These are your tasks. Give it your all!</h1>
                        </div>
                    </div>
                </header>
                <main class="main">
                    <div class="container">
                            <form id="task-single-form" name="task-single-form">
                                <div class="main-page-flex">
                                    <div class="main-focus-content-wrapper">
                                        <div class="card">
                                            <input type="text" class="h2 no-border" value="${inhoudDB.taskName}" id="update-taskname" onchange="changeTask(${inhoudDB.taskId})">
                                            <h3 class="h3">Uitleg opdracht</h3>
                                            <textarea type="text" class="paragraph-normall no-border textarea" value="${inhoudDB.taskExplain}" placeholder="${inhoudDB.taskExplain}" id="update-taskexplain" onchange="changeTask(${inhoudDB.taskId})"></textarea>
                                            <h3 class="h3">Links</h3><a href="#" class="button add-sign-button">+</a>
                                            <ul role="list" class="task-links-list">
                                                <li class="task-link-item"><a href="#" class="paragraph-normall inline-link">Udemy course hst 2</a></li>
                                                <li class="task-link-item"><a href="#" class="paragraph-normall inline-link">Udemy course hst 2</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="main-side-content-wrapper">
                                        <div class="side-content-item">
                                            <div class="card small-card background-light-yellow">
                                                <div class="card-sub-item">
                                                    <h3 class="h3">Status</h3>
                                                    <div class="side-content-items-flex"><select id="field" name="field" class="select-field"><option value="">Select one...</option><option value="First">First Choice</option><option value="Second">Second Choice</option><option value="Third">Third Choice</option></select></div>
                                                </div>
                                                <div class="card-sub-item">
                                                    <h3 class="h3">Tijdsduur</h3>
                                                    <div class="side-content-items-flex align-left">
                                                        <div class="side-flex-content">
                                                            <div class="paragraph-small all-caps">verwachting</div>
                                                            <div class="paragraph-normall dark-semi-bold">4.50 uur</div>
                                                        </div>
                                                        <div>
                                                            <div class="paragraph-small all-caps">nog nodig</div>
                                                            <div class="paragraph-normall dark-semi-bold">2.50 uur</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                    </div>
                </main>
                `
                document.getElementById("page-content").innerHTML = singleDayString;
                
            } else {
                console.log("VERSTUREN loadSingleTask IS NIET GELUKT!");
            }
        }
    }   
    xhr.open("GET", "http://localhost:8082/api/task/" + id, true);
    xhr.send();
}

function changeTask(id) {
    console.log("change task function started");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){

        if (xhr.readyState === XMLHttpRequest.DONE) {
        
            if (xhr.status === 'OK' || (xhr.status >= 200 && xhr.status < 400)) {
                console.log("VERSTUREN CHANGE TASK GELUKT!");
            } else {
                console.log("VERSTUREN CHANGE TASK IS NIET GELUKT!");
            }
        }
    }

    var task = {};
    task.taskName = document.getElementById('update-taskname').value,
    task.taskExplain = document.getElementById('update-taskexplain').value,
    task.taskStatus = "Backlog";
    task.takDuration = 1.0;
    task.taskTimeLeft = 1.0;
    task.taskDate = new Date().toISOString().substring(0,10);

    var json = JSON.stringify(task);

    xhr.open("PUT", "http://localhost:8082/api/task/" + id, true);
    xhr.setRequestHeader("Content-type","application/json")
    xhr.send(json);

}

// ACCOUNT PAGE FUNCTIONS
function loadAccountContent() {
    var email = localStorage.getItem("startly-email");
    var password = localStorage.getItem("startly-password");
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){        
        if (xhr.readyState === XMLHttpRequest.DONE) {
        
            if (xhr.status === 'OK' || (xhr.status >= 200 && xhr.status < 400)) {
                var inhoudDB = JSON.parse(this.responseText);
                console.log("VERSTUREN loadAccountContent GELUKT!");
                var accountPageString =
                `
                <header class="content-header">
                    <div class="container">
                        <div class="header-text-wrapper">
                            <div class="welcome-message white-text">Hello, ${inhoudDB.userName}!</div>
                            <h1 class="h1 white-text no-margin-bottom">This is your account</h1>
                        </div>
                    </div>
                </header>


                <main class="main" id="account-main">
                    <div class="container">
                        <div class="main-page-flex">
                            <div class="main-focus-content-wrapper">
                                <div class="card">

                                    <!-- start account form -->
                                    <div class="account-update-forms-outer-wrapper" id="account-form">
                                        <!-- form loaded from js -->
                                    </div>
                                </div>
                            </div>
                            <div class="main-side-content-wrapper"></div>
                        </div>
                    </div>
                </main>
                `
                document.getElementById("page-content").innerHTML = accountPageString;
                loadAccountForm();
            } else {
                console.log("VERSTUREN loadAccountContent IS NIET GELUKT!");
            }
        }
    }   
 
    xhr.open("GET", "http://localhost:8082/api/customer/getByEmail/" + email, true);
    xhr.send();
}


function loadAccountForm() {
    var email = localStorage.getItem("startly-email");
    var password = localStorage.getItem("startly-password");
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        if (xhr.readyState === XMLHttpRequest.DONE) {
        
            if (xhr.status === 'OK' || (xhr.status >= 200 && xhr.status < 400)) {
                console.log("VERSTUREN LOADCUSTOMER GELUKT!");
            } else {
                console.log("VERSTUREN LOADCUSTOMER IS NIET GELUKT!");
            }
        }
        if (password == inhoudDB.passwordHash) {
            var accountString =
            `
            <div class="account-update-form">
                <form id="email-form" name="email-form" data-name="Email Form">
                    <h2 class="h2">Account details</h2>
                    <div class="form-row">
                        <div class="form-flex">
                            <div class="form-item-wrapper item-50">
                                <label for="update-name" class="field-label">Full Name</label>
                                <input type="text"
                                    class="input-field" maxlength="256" name="update-name"
                                    data-name="update name" value="${inhoudDB.customerName}" id="update-name">
                            </div>
                            <div class="form-item-wrapper item-50">
                                <label for="update-username" class="field-label">Username</label>
                                    <input type="text"
                                    class="input-field" maxlength="256"
                                    name="update-username" data-name="update username"
                                    value="${inhoudDB.userName}" id="update-username">
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-flex">
                            <div class="form-item-wrapper">
                                <label for="update-email" class="field-label">Email Adress</label>
                                <input type="email"
                                    class="input-field" maxlength="256" name="update-email"
                                    data-name="update email" value="${inhoudDB.emailAdress}" id="update-email">
                            </div>
                        </div>
                    </div><input type="button" value="Save Changes" data-wait="Please wait..." class="button" onclick="changeCustomer(${inhoudDB.userId})">
                </form>                                        
            </div>
            <div class="account-update-form">
                <form id="email-form" name="email-form" data-name="Email Form">
                    <h2 class="h2">Change Password</h2>
                    <div class="form-row">
                        <div class="form-flex">
                            <div class="form-item-wrapper">
                                <label for="update-old-password"
                                    class="field-label">Old password</label>
                                <input type="text"
                                    class="input-field" maxlength="256"
                                    name="update-old-password" data-name="update old password"
                                    placeholder="" id="update-old-password">
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-flex">
                            <div class="form-item-wrapper"><label for="update-password" class="field-label">New password</label>
                                <input type="password"
                                    class="input-field w-input" maxlength="256"
                                    name="update-password" data-name="update password"
                                    placeholder="" id="update-password">
                                </div>
                        </div>
                    </div><input type="button" value="Save Changes" data-wait="Please wait..." class="button">
                </form>
            </div>
            <div class="account-update-form">
                <h2 class="h2">Delete account</h2>
                <div class="text-button" onclick="deleteCustomer(${inhoudDB.userId})">Delete account</div>
            </div>
            `
            document.getElementById("account-form").innerHTML = accountString;
        } else {
            alert("password incorrect");
            window.location.href = "signup.html";
        }
    }

    xhr.open("GET", "http://localhost:8082/api/customer/getByEmail/" + email, true);
    xhr.send();

}

function changeCustomer(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){

        if (xhr.readyState === XMLHttpRequest.DONE) {
        
            if (xhr.status === 'OK' || (xhr.status >= 200 && xhr.status < 400)) {
                console.log("VERSTUREN CHANGE CUSTOMER GELUKT!");
                loadAccountContent();

            } else {
                console.log("VERSTUREN CHANGE CUSTOMER IS NIET GELUKT!");
            }
        }
    }

    var customer = {
        customerName : document.getElementById('update-name').value,
        userName : document.getElementById('update-username').value,
        emailAdress : document.getElementById('update-email').value,

        userId: id,
    };
    var json = JSON.stringify(customer);

    localStorage.setItem("startly-email", document.getElementById('update-email').value);

    xhr.open("PUT", "http://localhost:8082/api/customer/" + id, true);
    xhr.setRequestHeader("Content-type","application/json")
    xhr.send(json);

}

function deleteCustomer(id) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 'OK' || (xhr.status >= 200 && xhr.status < 400)) {
                console.log("VERSTUREN DELETE CUSTOMER GELUKT!");

            } else {
                console.log("VERSTUREN DELETE CUSTOMER IS NIET GELUKT!");
            }
        }
        window.localStorage.removeItem('startly-email');
        window.localStorage.removeItem('startly-password');
        window.location.href = "signup.html";
    }

    xhr.open("DELETE", "http://localhost:8082/api/customer/" + id, true);
    xhr.send();
}



