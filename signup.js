function validateform(){
    var name = document.forms["myform"]["fname"].value;
    var con = document.forms["myform"]["con"].value;
    // var em = document.forms["myform"]["email"].value;
    var pass = document.forms["myform"]["pass"].value;
    var cp = document.forms["myform"]["cp"].value;
    var st=document.forms["myform"]["state"].value;
    var error=pass.localeCompare(cp);
    if(st=='state'){
        document.getElementById("formerror").innerHTML= "* Select the state you belong to";
        return false;
    }
    if(name.length<5){
        document.getElementById("formerror").innerHTML= "* The length of name should be more than 5 letter";
        return false;
    }
    if(con.length<10){
        document.getElementById("formerror").innerHTML= "* The length of contact no. should be 10 digit";
        return false;
    }
    // if(em.length<5){
    //     document.getElementById("formerror").innerHTML= "* The length of email address should be more than 5 digit";
    //     return false;
    // }
    if(pass.length<10){
        document.getElementById("formerror").innerHTML= "* The length of password shouldn't be less than 10 digit";
        return false;
    }
    if(cp.length<10){
        document.getElementById("formerror").innerHTML= "* The length of confirm password shouldn't be less than 10 digit";
        return false;
    }
    if(error!=0){
        document.getElementById("formerror").innerHTML="* Password and confirm password are not the same.";
        return false;
    }
    else{
        alert("logging in successfully");
        return true;
    }
}
function show(){
    var x=document.getElementById("cp");
    var eyeIcon = document.querySelector(".imgb");
    if(x.type==="password"){
        x.type="text";
        eyeIcon.src="img/bulbl.png";
        // document.getElementById('s').value='Hide';
    }
    else{
        x.type="password";
        eyeIcon.src="img/bulbo.png";
        // document.getElementById('s').value='Show';
    }
}