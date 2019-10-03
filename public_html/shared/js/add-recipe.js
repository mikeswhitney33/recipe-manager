$(document).ready(function() {
    $("#search-bar-wrapper").find("input").hide();
    $("#page-title").html("Add Recipe");
    $('#special-btn').click(function(){
        window.location.href = "/";
    });
    $('.cancel-btn').click(function(){
        window.location.href = "/";
    });
    $('#special-btn').html("Cancel");

    $("#add-ingredient").click(function(){
        addIngredientField("", "");
    });

    $("#add-step").click(function(){
        addStepField("");
    });

    $('.required').keypress(function(){
        $(this).attr("style", "border-color: rgb(206, 212, 218);");
    });
    $('#save-btn').click(function(){
        var formdata = getFormData();
        $.ajax({
            url: "/recipe_api",
            type:"POST",
            data:formdata,
            contentType: false,
            processData: false
        }).done(function(ret){
            handleResult(ret, function(retobj) {
                window.location.href = "/view-recipe?recipe_id="+retobj['recipe_id'];
            });
        });
    });
});

function addIngredientField(amount, name) {
    $("#ingredient-list").append("<li class='list-group-item'>\
        <div class='input-group'>\
            <input value='"+amount+"' type='text' class='form-control ing-amount' placeholder='amount'>\
            <input value='"+name+"' type='text' class='form-control ing-name' placeholder='name'>\
            <div class='input-group-append'>\
                <div class='btn btn-danger ing-remove-btn'>Remove</div>\
            </div>\
        </div>\
    </li>");
    $('.ing-remove-btn').click(function(){
        $(this).parents('.list-group-item').remove();
    });
}

function addStepField(step) {
    $("#steps-list").append("<li class='list-group-item'>\
        <div class='input-group'>\
            <textarea class='form-control step'>"+step+"</textarea>\
            <div class='input-group-append'>\
                <div class='btn btn-danger step-remove-btn'>Remove</div>\
            </div>\
        </div>\
    </li>");
    $('.step-remove-btn').click(function(){
        $(this).parents('.list-group-item').remove();
    });
}

function handleResult(ret, successCallback) {
    var retobj = JSON.parse(ret);
    var status = retobj['status'];
    if(status === "success") {
        successCallback(retobj);
    }
    else if(status === "missing_field") {
        for(var i = 0;i < retobj['fields'].length;i++) {
            $("#"+retobj['fields'][i]).attr("style", "border-color:red");
        }
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#name-group").offset().top
        }, 500);
    }
}

function getFormData(){
    var formdata = new FormData();
    formdata.append("name", $("#name").val());
    formdata.append("desc", $("#desc").val().replace(/\n/g, '<br/>'));
    formdata.append("yield", $("#yield").val());
    formdata.append("impath", $("#impath")[0].files[0]);
    var ings = $('#ingredient-list').children();
    var ingredients = [];
    for(var i = 0;i < ings.length;i++){
        var amount = $(ings[i]).find('.ing-amount').val();
        var name = $(ings[i]).find('.ing-name').val();
        ingredients.push({"amount":amount,"name":name});
    }
    formdata.append("ingredients", JSON.stringify(ingredients));
    var steps_elems = $('#steps-list').children();
    var steps = [];
    for(var i = 0;i < steps_elems.length;i++){
        steps.push($(steps_elems[i]).find('.step').val().replace(/\n/g, '<br/>'));
    }
    formdata.append("steps", JSON.stringify(steps));
    formdata.append("notes", $("#notes").val().replace(/\n/g, "<br/>"));
    formdata.append("keywords", $("#keywords").val().replace(/\n/g, ""));
    return formdata;
}