$(document).ready(function() {
    var recipe_id = GetURLParameter('recipe_id');
    $('#page-title').html("Edit Recipe");
    $('#save-btn').html("Save Edits");
    $('#save-btn').off('click').click(function() {
        var formdata = getFormData();
        formdata.append("recipe_id", recipe_id);
        $.ajax({
            url: "/recipe_api",
            type: "POST",
            data: formdata,
            processData: false,
            contentType: false
        }).done(function(ret) {
            handleResult(ret, function(retobj) {
                window.location.href = "/view-recipe?recipe_id="+recipe_id;
            });
        });
    });

    $('.cancel-btn').off('click').click(function() {
        window.location.href = "/view-recipe?recipe_id="+recipe_id;
    });

    $('#add-form').append("<div class='btn btn-danger' id='delete-btn'>Delete Recipe</div>");
    $('#delete-btn').click(function() {
        $.ajax({
            url:"/recipe_api?recipe_id="+recipe_id,
            type:"DELETE"
        }).done(function() {
            window.location.href = "/";
        });
    });

    $.ajax({
        url:"/recipe_api?recipe_id="+recipe_id,
        type:"GET"
    }).done(function(ret) {
        var retobj = JSON.parse(ret);
        var recipe = retobj['recipe'];
        $('#name').val(recipe['name']);
        $('#desc').val(recipe['desc'].replace(/<br\/>/g, "\n"));
        $('#yield').val(recipe['yield']);
        var ingredients = recipe.ingredients;
        if(Array.isArray(ingredients)) {
            for(var i = 0;i < ingredients.length;i++) {
                addIngredientField(ingredients[i]['amount'], ingredients[i]['name']);
            }
        }
        
        var steps = recipe.steps;
        for(var i = 0;i < steps.length;i++) {
            if(steps[i].trim().length > 0) {
                addStepField(steps[i].replace(/<br\/>/g, "\n"));
            }
        }
        $('#notes').val(recipe['notes'].replace(/<br\/>/g, "\n"));
        $('#keywords').val(recipe['keywords']);
    });


})