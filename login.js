function show(){
    var x = document.getElementById("Pass");
    if (x.type === "password") {
      x.type = "text";
      document.getElementById('s').value='hide' ; 
    } else {
      x.type = "password";
      document.getElementById('s').value='show' ;
    }
}
function submit(){
    window.open("https://www.w3schools.com");
}