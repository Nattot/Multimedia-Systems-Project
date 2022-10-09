$(document).ready(function(){

    //navbar
    $("#submenu").click(function(){
        $("#nav").slideToggle("fast");
    });

    //window resize
    $(window).resize(function(){
        if($(window).width() > 1080){
          $("#nav").show();
        }
        else{
          $("#nav").hide();
        }
        $(".slider").css("marginLeft",0).css("marginLeft",-$(".image").width());
      });

    //image slider
    var interval = setInterval(slideshow, 4000);
    $(".slider").css({
        marginLeft : -$(".image").width()
    });
    function slideshow(){
        $(".slider").animate({
            left : -$(".image").width()
        }, 1000,
        function(){
            $(".image:first-child").appendTo(".slider");
            $(".slider").css({
                left: 0
            });
        });
    }
    $(".next").click(function(){
        clearInterval(interval);
        slideshow();
        interval = setInterval(slideshow, 4000);
    });
    $(".prev").click(function(){
        clearInterval(interval);
        $(".slider").animate({
            left : +$(".image").width()
        }, 1000,
        function(){
            $(".image:last-child").prependTo(".slider");
            $(".slider").css({
                left: 0
            });
        });
        interval = setInterval(slideshow, 4000);
    });

    inputAmount();
});

//check amount donation
function checkAmount(){
    var jumlah = document.forms["Donation"]["jumlah"].value
    var rgx = /^[0-9]+\.+[0-9]+$/
    var rgx2 = /^[0-9]+\.+[0-9]+\.+[0-9]+$/
    var EM = document.getElementById("errMsg")
    if(jumlah == ""){
        EM.innerText = "Amount must be filled!"
        EM.style.display = "block"
    }
    else if(!jumlah.match(rgx) && !jumlah.match(rgx2)){
        EM.innerText = "Invalid amount!"
        EM.style.display = "block"
    }
    else{
        localStorage.setItem("DAmount", JSON.stringify(jumlah))
        window.location.href = "./DonateForm.html"
    }
}

function inputAmount(){
    var donateAmount = localStorage.getItem("DAmount")
    donateAmount = JSON.parse(donateAmount)
    document.forms["Donate"]["jumlah"].value = donateAmount
}

function validation(){
    var nama = document.forms["Donate"]["nama"].value
    var surel = document.forms["Donate"]["surel"].value
    var telp = document.forms["Donate"]["telepon"].value
    var kartu = document.forms["Donate"]["kartu"].value
    var detil = document.forms["Donate"]["detil"].value
    var jumlah = document.forms["Donate"]["jumlah"].value
    var rgx = /^[0-9]+\.+[0-9]+$/
    var rgx2 = /^[0-9]+\.+[0-9]+\.+[0-9]+$/
    var valid = 1

    //name
    if(nama == ""){
        document.getElementById("errName").innerText = "Name must be filled!"
        valid = 0
    }
    else if(nama.length < 2){
        document.getElementById("errName").innerText = "Name must be more than 2 characters!"
        valid = 0
    }
    else if(/[^a-zA-Z ]/.test(nama)){
        document.getElementById("errName").innerText = "Name must be from letter A - Z!"
        valid = 0
    }
    else{
        document.getElementById("errName").innerText = ""
    }

    //email
    if(surel == ""){
        document.getElementById("errEmail").innerText = "Email must be filled!"
        valid = 0
    }
    else if(!surel.includes("@")){
        document.getElementById("errEmail").innerText = "Email invalid!"
        valid = 0
    }
    else{
        document.getElementById("errEmail").innerText = ""
    }

    //number
    if(telp == ""){
        document.getElementById("errNum").innerText = "Phone number must be filled!"
        valid = 0
    }else if(isNaN(telp)){
        document.getElementById("errNum").innerText = "Phone number must be numeric!"
        valid = 0
    }else if(telp.length<10 || telp.length>14){
        document.getElementById("errNum").innerText = "Phone number must be between 10 - 14 digits!"
        valid = 0
    }
    else{
        document.getElementById("errNum").innerText = ""
    }

    //card
    if(kartu == ""){
        document.getElementById("errDetail").innerText = "Card must be filled!"
        valid = 0
    }
    else if(detil == ""){
        document.getElementById("errDetail").innerText = "Card or account number must be filled!"
        valid = 0
    }
    else if(isNaN(detil)){
        document.getElementById("errDetail").innerText = "Card or account number must be numeric!"
        valid = 0
    }
    else{
        document.getElementById("errDetail").innerText = ""
    }

    //amount
    if(jumlah == ""){
        document.getElementById("errAmount").innerText = "Amount must be filled!"
        valid = 0
    }
    else if(!jumlah.match(rgx) && !jumlah.match(rgx2)){
        document.getElementById("errAmount").innerText = "Invalid amount!"
        valid = 0
    }
    else{
        document.getElementById("errAmount").innerText = ""
    }

    if(valid == 1){
        document.getElementById("errName").innerText = ""
        document.getElementById("errEmail").innerText = ""
        document.getElementById("errNum").innerText = ""
        document.getElementById("errDetail").innerText = ""
        document.getElementById("errAmount").innerText = ""
        document.getElementById("formDonation").reset();
        $("#body_donateForm").css("filter", "blur(2px)")
        $("#messageSent").show()
    }

}

//contact us
function messageValidation(){
    var nama = document.forms["contact"]["nama"].value
    var surel = document.forms["contact"]["surel"].value
    var subjek = document.forms["contact"]["subjek"].value
    var pesan = document.forms["contact"]["pesan"].value
    var valid = 1;

    //name
    if(nama == ""){
        document.getElementById("errName").innerText = "Name must be filled!"
        valid = 0
    }
    else if(nama.length < 2){
        document.getElementById("errName").innerText = "Name must be more than 2 characters!"
        valid = 0
    }
    else if(/[^a-zA-Z ]/.test(nama)){
        document.getElementById("errName").innerText = "Name must be from letter A - Z!"
        valid = 0
    }
    else{
        document.getElementById("errName").innerText = ""
    }

    //email
    if(surel == ""){
        document.getElementById("errEmail").innerText = "Email must be filled!"
        valid = 0
    }
    else if(!surel.includes("@")){
        document.getElementById("errEmail").innerText = "Email invalid!"
        valid = 0
    }
    else{
        document.getElementById("errEmail").innerText = ""
    }

    //subject
    if(subjek == ""){
        document.getElementById("errSubject").innerText = "subject must be filled!"
        valid = 0
    }
    else if(subjek.length < 2){
        document.getElementById("errSubject").innerText = "subject must be more than two characters!"
        valid = 0
    }
    else{
        document.getElementById("errSubject").innerText = ""
    }

    //message
    if(pesan == ""){
        document.getElementById("errMessage").innerText = "message must be filled!"
        valid = 0
    }
    else if(pesan.length < 2){
        document.getElementById("errMessage").innerText = "message must be more than two characters!"
        valid = 0
    }
    else{
        document.getElementById("errMessage").innerText = ""
    }

    if(valid == 1){
        document.forms["contact"]["nama"].value = ""
        document.forms["contact"]["surel"].value = ""
        document.forms["contact"]["subjek"].value = ""
        document.forms["contact"]["pesan"].value = ""
        $("#messageSent").show()
        $("#body_contactUs").children("div:first-child").css("filter", "blur(2px)")
    }
}

function exitNotif(){
    $("#messageSent").hide()
    $("#body_contactUs").children("div:first-child").css("filter", "blur(0px)")
    $("#body_donateForm").css("filter", "blur(0px)")
}
