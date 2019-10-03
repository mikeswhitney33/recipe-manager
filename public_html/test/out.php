<?php 

include("../../db/include.php");
$ing = json_decode($_POST['ingredients'], true);
$ingredients = array();
foreach($ing as $i) {
    $ingredients[] = new Ingredient($i['name'], $i['amount']);
}

// $steps = array();
// echo $_POST['steps'];

// echo $res;
// foreach($ing as $key => $val) {
//     $res.=$key." => ".$val;
//     $res.="<br/>";
// }
// // $ing = json_decode($_POST['ingredients']);
// // echo $_POST['ingredients'];
// echo $res;
$recipe = new Recipe(
    $_POST["name"], 
    $_POST['desc'], 
    $_POST["yield"], 
    $ingredients, 
    json_decode($_POST['steps']), 
    $_POST['notes'], 
    $_POST["keywords"],
    $_POST["image_name"],
    $_POST["image_path"]
);

echo $recipe->toString();