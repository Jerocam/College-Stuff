
function submitForm() {
  
  // Field values
  let names = $("#fName").val();
  let email = $("#email").val();
  let phone = $("#phone").val();
  let prodname = $("#prodName").val();
  let prodprice = $("#prodPrice").val();
  let proddesc = $("#prodDesc").val();
  let prodcateg = $("#prodCateg").val();
  let prodimgValue = $("#prodImg").val();
  let prodimg = $("#prodImg")[0].files[0];
 
  let newFile = new FormData();
    newFile.append('fName', names);
    newFile.append('email', email);
    newFile.append('phone', phone);
    newFile.append('prodName', prodname);
    newFile.append('prodPrice', prodprice);
    newFile.append('prodDesc', proddesc);
    newFile.append('prodCateg', prodcateg);
    newFile.append('prodImg', prodimg);
  
  // Formatting fields
  let missing = " Required Field"
  let error = " Invalid Input";
  let isValid = true;
  let namesFormat = /^[a-zA-Z\s]*$/;
  let phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let imgType = prodimgValue.split('.').pop().toLowerCase();
  let imgExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];

  if(names==""){
    $("#fName").attr("required", true);
    isValid = false;
    $('#error').text(missing);}
  else {
    if (!namesFormat.test(names)){
      $("#fName").attr("required", true);
      isValid = false;
      $('#error').text(error);}
    else {
      $("#fName").attr("required", false);
      $('#error').text("");
    }
  } 
  
  if(email==""){
    $("#email").attr("required", true);
    isValid = false;
    $('#error2').text(missing);}
  else {
    if (!emailFormat.test(email)){
      $("#email").attr("required", true);
      isValid = false;
      $('#error2').text(error);}
    else {
      $("#email").attr("required", false);
      $('#error2').text("");
    }
  } 

  if(phone==""){
    $("#phone").attr("required", true);
    isValid = false;
    $('#error3').text(missing);}
  else {
    if (!phoneFormat.test(phone)){
      $("#phone").attr("required", true);
      isValid = false;
      $('#error3').text(error);}
    else {
      $("#phone").attr("required", false);
      $('#error3').text("");
    }
  }

  if(prodname==""){
    $("#prodName").attr("required", true);
    isValid = false;
    $('#error4').text(missing);}
  else {
    if (!namesFormat.test(prodname)){
      $("#prodName").attr("required", true);
      isValid = false;
      $('#error4').text(error);}
    else {
      $("#prodName").attr("required", false);
      $('#error4').text("");
    }
  }

  if(prodprice==""){
    $("#prodPrice").attr("required", true);
    isValid = false;
    $('#error5').text(missing);}
  else {
    if (isNaN(prodprice)){
      $("#prodPrice").attr("required", true);
      isValid = false;
      $('#error5').text(error);}
    else {
      $("#prodPrice").attr("required", false);
      $('#error5').text("");
    }
  }

  if(proddesc==""){
    $("#prodDesc").attr("required", true);
    isValid = false;
    $('#error6').text(missing);}
  else {
    $("#prodDesc").attr("required", false);
    $('#error6').text("");
  }

  if($('#prodCateg option:selected').prop('disabled') == true){
    $("#prodCateg").attr("required", true);
    isValid = false;
    $('#error7').text(missing);}
  else {
    $("#prodCateg").attr("required", false);
    $('#error7').text("");
  }

  if (!prodimg){
    $("#prodImg").attr("required", true);
    isValid = false;
    $('#error8').text(missing);
  }
  else {
    if($.inArray(imgType,imgExtension)==-1){
      $('#error8').text("Invalid File Type. Only .jpg, .jpeg or .png");
      isValid = false;
      $("#prodImg").attr("required", true);
    }
    else {
      $("#prodImg").attr("required", false);
      $('#error8').text("");
    }
  }

  if (isValid == true){
      $.ajax({
        url: "database/new_products.php",
        type: "POST",
        data: newFile,
        contentType: false,
        processData: false,
        cache: false,
        success: function(){
          $('#newSuccess').append('<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Submitted successfully!</strong> You should check in on the list of products below.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
          $('#submProduct')[0].reset();
        }
      });
    fadingAlert();
  }
}

function fadingAlert(){
  setTimeout(function(){
    $('.alert').fadeOut(2000); 
  }, 2000);
}

function list(){
  $(".nlist").switchClass("col-md-3","col-md-12", 0);
  $(".dRow").addClass("row");
  $(".cl1").addClass("col-md-2");
  $(".cl1 img").switchClass("card-img-top", "card-img", 0);
  $(".cl2").addClass("col-md-10");
  $(".cl2A").switchClass("col-sm-7","col-sm-4", 0);
  $(".cl2B").attr('hidden', false);
  $(".cl2C").switchClass("col-sm-5","col-sm-2", 0);
}

function grid(){
  $(".nlist").switchClass("col-md-12","col-md-3",0);
  $(".cl1 img").switchClass("card-img","card-img-top",0);
  $(".dRow").removeClass("row");
  $(".cl1").removeClass("col-md-2");
  $(".cl2").removeClass("col-md-10");
  $(".cl2A").switchClass("col-sm-4","col-sm-7",0);
  $(".cl2B").attr('hidden', true);
  $(".cl2C").switchClass("col-sm-2","col-sm-5",0);
}

//FUNCTION FOR LOADING ALL PRODUCT TYPES INCLUDE PAGINATION
function allcat(){ 
  $("#loadProducts").load('database/load_products.php');
  $("#loadProducts").on( "click", ".pagination a", function (e){
    e.preventDefault();
    let page = $(this).attr("data-page");
    $("#loadProducts").load("database/load_products.php",{"page":page}, function(){});
  });
}

//FUNCTION FOR PASSING CATEGORY VALUE AND LOAD PHP
function page_categ(pgcat){
  $("#loadProducts").load('database/categ'+pgcat+'.php');
  $("#loadProducts").on( "click", ".pag"+pgcat+" a", function (e){
		e.preventDefault();
		let page = $(this).attr("data-page");
		$("#loadProducts").load("database/categ"+pgcat+".php",{"page":page}, function(){});
	});
}

//FUNCTION TO CLICK A CATEGORY AND LOAD IT
function eachCateg(cat_id){
  if(cat_id=='Automotive'){
    page_categ(cat_id);
  }
  else if (cat_id=='Books'){
    page_categ(cat_id);
  }
  else if (cat_id=='Clothing'){
    page_categ(cat_id);
  }
  else if (cat_id=='Electronics'){
    page_categ(cat_id);
  }
  else if (cat_id=='Furniture'){
    page_categ(cat_id);
  }
  else {
    page_categ(cat_id);
  }
}

function carousels(){ //FUNCTION AJAX FOR LOADING RECENTLY PRODUCTS ON THE CAROUSEL
  $.ajax({
    type: "GET",
    url: "database/recent_products.php",
    cache:false,
    success: function (carousel) {
      $("#recProd").html(carousel);
      $('#products .carousel-item:first').addClass('active');
    }
  });
}

function searching(wordSearch){
  page_categ(wordSearch);
  // $.ajax({
  //   type: "POST",
  //   url: "database/categSearch.php",
  //   data: {search:wordSearch},
  //   success: function (result) {
  //     $('#loadProducts').html(result);
  //   }
  // });
}

function getresult(url) {
	$.ajax({
		url: url,
		type: "GET",
		data:  {rowcount:$("#rowcount").val(),"pagination_setting":$("#pagination-setting").val()},
		beforeSend: function(){$("#overlay").show();},
		success: function(data){
		$("#pagination-result").html(data);
		setInterval(function() {$("#overlay").hide(); },500);
		},
		error: function() 
		{} 	        
   });
}

function changePagination(option) {
	if(option!= "") {
		getresult("database/getresult.php");
	}
}

$(document).ready(function() {

  $( "form input, textarea, select" ).focus(function() {
    $(this).next( "span" ).text( "" );
    $(this).attr("required", false);
  });

  $("#prodPrice").focus(function(){
    $( '#error5' ).text( "" );
  });

  $('#btnSubmit').click(function (e) {
    e.preventDefault(); 
    submitForm();
  });

  $('.cancEmp').click(function () { 
    $('#submProduct')[0].reset();
    $('form input, form textarea, form select').attr('required', false).next( "span" ).text( "" );
    $( '#error5' ).text( "" );
    $('#loadProducts').load(location.reload(true)); 
  });

  //CLICK FOR LOADING A PRODUCT CATEGORY INCLUDE OWN PAGINATION
  $('#cateGroup a').click(function (e) { 
    e.preventDefault();
    let cat_id = $(this).attr('id');
    eachCateg(cat_id);
  });

  allcat(); //CALL FUNCTION TO LOAD PRODUCTS

  carousels(); //CALL FUNCTION TO LOAD RECENTLY PRODS
  
  $('#sprod').submit(function (e) {
    e.preventDefault();
    let wordSearch = $('#sprod input').val();
    searching(wordSearch);
  });

  // getresult("database/getresult.php");

});