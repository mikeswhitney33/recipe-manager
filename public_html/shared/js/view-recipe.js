function setSingle(recipe, key) {
    if(recipe[key] && recipe[key].length > 0){
        $('#'+key).html(recipe[key]);
    }
    else {
        $('#'+key+'-group').hide();
    }
}

$(document).ready(function(){
    var recipe_id = GetURLParameter('recipe_id');
    $("#search-bar-wrapper").find("input").hide();
    $("#page-title").hide();
    if(recipe_id){
        $("#special-btn").click(function() {
            window.location.href = "/edit-recipe?recipe_id="+recipe_id;
        });
        $("#special-btn").html("Edit Recipe")
        $.ajax({
            url:"/recipe_api?recipe_id="+recipe_id,
            type:"GET"
        }).done(function(ret){
            var retobj = JSON.parse(ret);
            var status = retobj.status;
            if(status === "success"){
                var recipe = retobj.recipe;
                document.title = recipe.name;
                $("#recipe-title").html(recipe.name.capitalize());
                $('#desc').html(recipe.desc);
                setSingle(recipe, 'yield');
                var ingredients = recipe.ingredients;
                if(ingredients.length === 0) {
                    $('#ingredients-group').hide();
                }
                else {
                    for(var i = 0;i < ingredients.length;i++) {
                        var ingredient = ingredients[i];
                        $("#ingredient-table>tbody").append("<tr><td>"+ingredient.amount+"</td><td>"+ingredient.name+"</td></tr>")
                    }
                }

                if(recipe.image_path !== null && recipe.image_path.length > 0) {
                    $('#recipe_img').attr('src', recipe.image_path);
                }
                else {
                    $('#recipe_img').hide();
                }
                
                
                var steps = recipe.steps;
                if(steps.length === 0) $('#steps-group').hide();
                else {
                    // steps = steps.split(",");
                    for(var i = 0;i < steps.length;i++) {
                        $('#steps-list').append("<li>"+steps[i]+"</li>");
                    }
                }
                setSingle(recipe, 'notes');
                setSingle(recipe, 'keywords');
            }
        });
    }
    else {
        window.location.href = "/";
    }
});