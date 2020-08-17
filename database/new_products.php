<?php
    include 'dbconnect.php';
    $conn = dbConnect();

    $filename = $_FILES['prodImg']['name'];
    $target_dir = "upload/";
    $target_file = $target_dir . basename($_FILES["prodImg"]["name"]);

    $new_data="INSERT INTO new_product (name_cont, email_cont, phone_cont, product_name, product_price, product_desc, product_categ, product_img) VALUES ('$_POST[fName]', '$_POST[email]', '$_POST[phone]', '$_POST[prodName]', '$_POST[prodPrice]', '$_POST[prodDesc]', '$_POST[prodCateg]', '$filename')";

    mysqli_query($conn, $new_data);

    move_uploaded_file($_FILES['prodImg']['tmp_name'], $target_dir.$filename);

    dbClose($conn);
?>

    


