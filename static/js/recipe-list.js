$(document).ready(function() {
    $.ajax({
        type:"GET",
        url:"/recipes"
    }).done(function(data) {
        rows = JSON.parse(data);
        for(var i = 0;i < rows.length;i++) {
            var row = rows[i];
            $("#recipe-list").append('<div class="recipe-list-item list-group-item list-group-item-action" value="'+row['recipe_id']+'">\
                <span class="recipe-name">'+row['name']+'</span>\
                <button type="button" class="delete-btn btn btn-danger float-right">\
                    Delete\
                </button>\
                </div>'
            );
        }
        $('.recipe-list-item').click(function(event) {
            if(event.target != this) {
                $(this).preventDefault();
                return;
            }
            else {
                window.location.href = "/view?recipe_id=" + $(this).attr('value');
            }
        });
        $('.delete-btn').click(function(event) {
            var parent = $(this).parent();
            $.ajax({
                type:"DELETE",
                url: "/recipes?" + $.param({"recipe_id":$(this).parent().attr('value')})
            }).done(function(data) {
                parent.remove();
            });
        });
        // $('.edit-btn').click(function(event) {
        //     window.location.href = "/edit?recipe_id=" + $(this).parent().attr("value");
        // });
    });
});

{/* <a href="#" class="recipe-list-item list-group-item list-group-item-action" value="1">
            <span class="recipe-name">Cake</span>
            <button type="button" class="delete-btn btn btn-danger float-right">
                Delete
            </button>
            <button type="button" class="edit-btn btn btn-info float-right">
                Edit
            </button>
        </a> */}