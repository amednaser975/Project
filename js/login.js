$("#signInBtn").click(function (e) { 
    e.preventDefault();
    var userDataObj = JSON.parse(getCookie("userData"))
    console.log(userDataObj.email);
    console.log(userDataObj.password)
    if($("#emailInp").val() == userDataObj.email && $("#passwordInp").val() == userDataObj.password) {
        location.assign("../index.html");
        console.log("Index")
    } else {
        $(".invalid").css("display", "block");
    }
});