<?php
include "dbconnect.php";
$conn = dbConnect();

$results = "SELECT * FROM new_product ORDER BY id DESC LIMIT 3";

$query = $conn->query($results);


echo '
<div id="products" class="carousel slide carousel-fade" data-ride="carousel">
  <div  class="carousel-inner">';

  while($row = $query->fetch_assoc()){
    $load_image = $row['product_img'];
    $load_title = $row['product_name'];
    
    echo'
    <div class="carousel-item" data-interval="5000">
      <img src="database/upload/'.$load_image.'" class="d-block w-100" alt="product img" >
      <div class="carousel-caption d-none d-md-block">
        <h6>'.$load_title.'</h6>
      </div>
    </div>
    ';
  }

echo '
  </div>
  <a class="carousel-control-prev" href="#products" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#products" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
';

dbClose($conn);
?>