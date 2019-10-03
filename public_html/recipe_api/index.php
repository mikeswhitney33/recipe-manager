<?php 

include('../../db/db.php');

$db = new DB();
$db->connect();

$method = $_SERVER["REQUEST_METHOD"];


// handle GET
if($method === "GET") {
    if(isset($_GET["recipe_id"]) && is_numeric($_GET["recipe_id"])) {
        $recipe = $db->getRecipe((int)$_GET['recipe_id']);
        $result = '{
            "status":"success",
            "recipe_id":'.$_GET['recipe_id'].',
            "recipe":'.$recipe->toString().'}';
        echo $result;
    }
    else {
        $recipes = $db->getRecipes();
        $result = '{
            "status":"success",
            "recipes":'.Recipe::toStringList($recipes).'}';
        echo $result;
    }
}
// Handle post
else if($method === "POST") {
    $vars = $_POST;
    error_log(json_encode($vars));
    if(!isset($_POST["name"]) || strlen(trim($_POST["name"])) == 0) {
        echo '{"status":"missing_field","fields":["name"]}'; 
        exit;
    }
    if(!isset($_POST['recipe_id'])) {
        error_log(json_encode($_FILES));
        if(isset($_FILES['impath'])) {
            $image_name = $_FILES['impath']['name'];
            $ext = pathinfo($image_name, PATHINFO_EXTENSION);
            $image_path = "/shared/images/uploads/" . uniqid() . "." . $ext;
            $target = realpath(dirname(__FILE__)) . "/.." . $image_path;
            move_uploaded_file( $_FILES['impath']['tmp_name'], $target);
        }
        else {
            $image_name = null;
            $image_path = null;
        }
        $_POST['image_name'] = $image_name;
        $_POST['image_path'] = $image_path;
        $recipe = Recipe::fromRow($_POST);
        $recipe_id = $db->insertRecipe($recipe);
        echo '{"status":"success","recipe_id":'.$recipe_id.'}';
        exit;
    }  
    else {
        $recipe = $db->getRecipe($vars['recipe_id']);
        if(isset($_FILES['impath'])) {
            $image_name = $_FILES['impath']['name'];
            $ext = pathinfo($image_name, PATHINFO_EXTENSION);
            $image_path = "/shared/images/uploads/" . uniqid() . "." . $ext;
            $target = realpath(dirname(__FILE__)) . "/.." . $image_path;
            move_uploaded_file( $_FILES['impath']['tmp_name'], $target);
            if($recipe['image_path'] != null) {
                $utarget = realpath(dirname(__FILE__)) . "/.." . $recipe['image_path'];
                unlink($utarget);
            }
        }
        else {
            $image_name = null;
            $image_path = null;
            if($recipe->hasImage()) {
                $image_name = $recipe->getImageName();
                $image_path = $recipe->getImagePath();
            }
        }
        $_POST['image_name'] = $image_name;
        $_POST['image_path'] = $image_path;
        $new_recipe = Recipe::fromRow($_POST);
        $recipe_id = $db->updateRecipe($_POST['recipe_id'], $new_recipe);
        echo '{"status":"success"}';
        exit;
    }
}
else if($method === "DELETE") {
    error_log(json_encode($_GET));
    if(!isset($_GET['recipe_id'])) {
        echo '{"status":"error"}';
        exit;
    }

    $recipe_id = $_GET['recipe_id'];

    $recipe = $db->getRecipe($recipe_id);;
    if($recipe->hasImage()) {
        $target = realpath(dirname(__FILE__)) . "/.." . $recipe->getImagePath();
        unlink($target);
    }
    $res = $db->deleteRecipe($recipe_id);
    echo '{"status":"success"}';
}
else {
    echo '{"status":"error"}';
}
 
