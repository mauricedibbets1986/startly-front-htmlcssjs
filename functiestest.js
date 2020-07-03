// Aanmaken account
function signup() {
    console.log("signup function started");
    var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;

    localStorage.setItem("startly-email", email);
    localStorage.setItem("startly-password", password);


    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){

        if (xhr.readyState === XMLHttpRequest.DONE) {
        
            if (xhr.status === 'OK' || (xhr.status >= 200 && xhr.status < 400)) {
        
                var inhoudDB = JSON.parse(this.responseText);
                console.log("VERSTUREN SIGNUP GELUKT!");
                loadCustomer();

            } else {
                console.log("VERSTUREN SIGNUP IS NIET GELUKT!");
            }
        }
        
    }

    var user = {};
    user.emailAdress = email;
    user.passwordHash = password;

    var json = JSON.stringify(user);

    xhr.open("POST", "http://localhost:8082/api/customer/", true);
    xhr.setRequestHeader("Content-type","application/json")
    xhr.send(json);

}

function loadCustomer() {
    let email = localStorage.getItem("startly-email");
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
            var customerTestString = 
            `
            <div>${inhoudDB.customerName}</div>
            <div>${inhoudDB.emailAdress}</div>
            <div>${inhoudDB.lastLoginDateTime}</div>

            <input type="text" id="naam-change" value=${inhoudDB.customerName}>
            <input type="text" id="email-change" value=${inhoudDB.emailAdress}>
            <input type="button" value="Wijzigen" data-wait="Please wait..." onclick="changeCustomer(${inhoudDB.userId})">
            `
            document.getElementById("test-div").innerHTML = customerTestString;
        } else {
            alert("password incorrect");
        }
    }


    xhr.open("GET", "http://localhost:8082/api/customer/getByEmail/" + email, true);
    xhr.send();


}

function changeCustomer(id) {
    var xhr = new XMLHttpRequest();
    alert(id);
    xhr.onreadystatechange = function(){

        if (xhr.readyState === XMLHttpRequest.DONE) {
        
            if (xhr.status === 'OK' || (xhr.status >= 200 && xhr.status < 400)) {
                console.log("VERSTUREN CHANGE CUSTOMER GELUKT!");
                loadCustomer();

            } else {
                console.log("VERSTUREN CHANGE CUSTOMER IS NIET GELUKT!");
            }
        }
        
    }

    var customer = {
        customerName : document.getElementById('naam-change').value,
        emailAdress : document.getElementById('email-change').value,
        userId: id,
    };
    var json = JSON.stringify(customer);

    xhr.open("PUT", "http://localhost:8082/api/customer/" + id, true);
    xhr.setRequestHeader("Content-type","application/json")
    xhr.send(json);

}