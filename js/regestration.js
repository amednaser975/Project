
var firstNameValue, lastNameValue, ageValue, emailInp, passwordValue, confirmValue;
$("#fnameInp").on("change", function () {  
    firstNameValue = $(this).val();
    console.log(firstNameValue)
});
$("#lnameInp").on("change", function () {  
    lastNameValue = $(this).val();
})
$("#ageInp").on("change", function () {  ageInp
    ageValue = $(this).val();
})
$("#emailInp").on("change", function () {  
    emailInp = $(this).val();
})
$("#passwordInp").on("change", function () {  
    passwordValue = $(this).val();
})
$("#confirmInp").on("change", function () {  
    confirmValue = $(this).val();
})
$("#submitBtn").on("click", function() {
    var data = {
        "first_name": firstNameValue, 
        "last_name": lastNameValue, 
        "age": ageValue, 
        "email": emailInp, 
        "password": passwordValue
    }
    setCookie("userData", JSON.stringify(data));
    console.log(data)
})
var flag = true;
var userName, phoneNumber, mobileNumber, email;
var RegExpName = /^[A-Za-z]{3,}$/;
var RegExpPhone = /^[0-9]{8}$/;
var RegExpMobile = /^(010|011|012|015)[0-9]{8}$/;
do {

    if(RegExpName.test(userName))
        flag = false;

}while(flag);
do {

    if(RegExpPhone.test(phoneNumber))
        flag = false;

}while(flag);
do {

    if(RegExpMobile.test(mobileNumber))
        flag = false;

}while(flag);
do {
    
    var RegExpEmail = /^[a-z][a-z0-9_\.\-]+@[A-Za-z0-9_\.\-]+(\.com)$/; 

}while(!email.match(RegExpEmail));