function add_ingredient_field() {
    $('#add-ingredient-list').append('<li class="add-ing-item list-group-item">\
        <div class="input-group">\
            <input type=text class="form-control ing-name" placeholder="Enter Ingredient Name..." name="ingredient-name" >\
            <input type=text class="form-control ing-amount" placeholder="Enter Ingredient Amount..." name="ingredient-amount">\
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

    return {
        'recipe_name':$('#recipe_name').val(),
        'recipe_yield':$('#recipe_yield').val(),
        'recipe_desc':$('#recipe_desc').val(),
        'ingredient_names':$('.ing-name').map(function(){return $(this).val()}).get(),
        'ingredient_amounts':$('.ing-amount').map(function(){return $(this).val()}).get(),
        'steps':$('.step-field').map(function(){return $(this).val()}).get()
    };
}

$(document).ready(function() {
    $('#add-ing-btn').click(add_ingredient_field);
    $('#add-step-btn').click(add_step_field);
    $('#submit-btn').click(function(event){
        event.preventDefault();
        $.ajax({
            type:"POST",
            url:"/recipes",
            data: getFormData()
        }).done(function(data) {
            alert(data);
            // window.location.href="/";
        });
        // alert(JSON.stringify(data));
    });
});