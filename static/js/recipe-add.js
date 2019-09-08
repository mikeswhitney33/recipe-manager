function add_ingredient_field() {
    $('#add-ingredient-list').append('<li class="add-ing-item list-group-item">\
        <div class="input-group">\
            <input type=text class="form-control ing-amount" placeholder="Enter Ingredient Amount..." name="ingredient-amount">\
            <input type=text class="form-control ing-name" placeholder="Enter Ingredient Name..." name="ingredient-name" >\
            <div class="input-group-append">\
                <button class="remove-ing-btn btn btn-danger" type="button">Remove</button>\
            </div>\
        </div>\
    </li>');
    $(".remove-ing-btn").click(function() {
        $(this).parents('.add-ing-item').remove();
    });
}

function add_step_field() {
    $('#add-step-list').append('<li class="add-step-item list-group-item">\
        <div class="input-group">\
            <textarea name="step" form="add-recipe-form" class="form-control step-field" placeholder="Enter Step..."></textarea>\
            <div class="input-group-append">\
                <button class="remove-step-btn btn btn-danger" type="button">Remove</button>\
            </div>\
        </div>\
    </li>');
    $('.remove-step-btn').click(function() {
        $(this).parents('.add-step-item').remove();
    });
}

function getFormData() {
    var ing_names = $('.ing-name').map(function(){return $(this).val()}).get();
    var ing_amounts = $('.ing-amount').map(function(){return $(this).val()}).get();
    var ingredients = [];
    for(var i = 0;i < ing_names.length;i++) {
        ingredients.push({
            'name':ing_names[i],
            'amount':ing_amounts[i]
        });
    }

    return {
        'name': $('#recipe_name').val(),
        'yld': $('#recipe_yield').val(),
        'desc': $('#recipe_desc').val(),
        'notes': $('#recipe_notes').val(),
        'ingredients': ingredients,
        'steps':$('.step-field').map(function(){return $(this).val()}).get()
    };
}

$(document).ready(function() {
    $('#add-ing-btn').click(function() {
        add_ingredient_field();
        $('.ing-amount').last().focus();
    });
    $('#add-step-btn').click(function() {
        add_step_field();
        $('.step-field').last().focus();
    });
    $('#cancel-btn').click(function() {
        window.location.href="/";
    });
    $('#submit-btn').click(function(event){
        event.preventDefault();
        $.ajax({
            type:"POST",
            url:"/recipes",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(getFormData()),
            dataType: 'json',
            success: function (data) {
                window.location.href = "/view?recipe_id="+data["recipe_id"];
            },
            error: function(){
                alert("An error occured while adding your recipe");
            }
        });
    });
});