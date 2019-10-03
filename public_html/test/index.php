<?php
include("../../db/include.php");

$recipe = new Recipe(
    "Test", 
    "description", 
    "yield", 
    array(new Ingredient("1 cup", "sugar")), 
    array("step1", "step2"), 
    "these are notes", 
    "keywords",
    "image_name",
    "image_path"
);

$obj = $recipe->toArray();
foreach($obj as $key => $val) {
    echo $key." => ".$val;
    echo "<br/>";
}
// echo gettype(json_decode($recipe->toString()));
echo $recipe->toString();

?>

<style>
.btn {
    cursor:pointer;
    padding: 5px 15px;
    background-color: #0000ff;
    color: white;
    display: inline-block;
    border-radius: 5px;
    transition-duration: 0.2s;
}


.btn:hover {
    background-color: #3333ff;
}
</style>

<div id="content"></div>
<input type=file id="upload">
<div id="Submit" class="btn">Submit</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<script>
    $(document).ready(function() {
        $("#Submit").click(function() {
            var formData = new FormData();
            var ingredients = [];
            var steps = [];
            var obj = {
                name: "Test",
                desc: "Description",
                yield: "yield",
                ingredients: JSON.stringify(ingredients),
                steps: JSON.stringify(steps),
                notes: "notes",
                keywords: "keywords",
                image_name: "image_name",
                image_path: "image_path",
                // imfile: $("#upload")[0].files[0]
            };
            for(key in obj) {
                formData.append(key, obj[key]);
            }
            $.ajax({
                url: "/test/out.php",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false
            }).done(function(ret) {
                $('#content').html(ret);
            });
        });
        
    });
    
</script>