function addTitle(pdf, ml, cury, title) {
    pdf.setFontSize(8);
    pdf.setFontStyle('bold');
    pdf.text(ml, cury, title);
    cury += pdf.getTextDimensions(title)['h'] + 2.5;
    pdf.setFontType("normal");
    return cury;
}

function addSingle(pdf, ml, mli, cury, title, body) {
    if(body.length > 0) {
        cury = addTitle(pdf, ml, cury, title);
        var lines = pdf.splitTextToSize(body, 210 - (ml+mli));
        pdf.text(mli, cury, lines);
        cury += pdf.getTextDimensions(lines)['h'] + 2.5;
    }
    return cury;
}

function addIngredients(pdf, ml, mli, cury, ingredients) {
    if(ingredients.length > 0) {
        cury = addTitle(pdf, ml, cury, "Ingredients: ");

        var longest = 0;
        for(var i = 0;i < ingredients.length;i++) {
            var ing = ingredients[i];
            if(ing['amount'].length > longest) {
                longest = ing['amount'].length;
            }
        }
        
        for(var i = 0;i < ingredients.length;i++) {
            var ing = ingredients[i];
            pdf.text(mli , cury, ing['amount']);
            pdf.text(mli + longest + 15, cury, ing['name']);
            cury += pdf.getTextDimensions(ing['name'])['h'] + 1;
        }
        cury += 2.5;
    }
    return cury;
}

function addSteps(pdf, ml, mli, cury, steps) {
    if(steps.length > 0) {
        cury = addTitle(pdf, ml, cury, "Directions: ");

        var longest = 0;
        for(var i = 0;i < steps.length;i++) {
            if(pdf.getTextWidth((i+1) + '. ') > longest) {
                longest = pdf.getTextWidth((i+1) + '. ');
            }
        }

        for(var i = 0;i < steps.length;i++) {
            pdf.text(mli, cury, (i+1) + ". ");
            var lines = pdf.splitTextToSize(
                steps[i],
                210 - (mli + longest + ml));
            pdf.text(mli + longest, cury, lines);
            cury += pdf.getTextDimensions(lines)['h'] + 1;
        }
    }
    return cury;
}

function makePdfVersion(name, desc, yld, ingredients, steps, notes) {
    var pdf = new jsPDF("p", "mm", "a4");
    var cury = 25.4;
    var ml = 25.4;
    var mli = ml + 5;
    pdf.setFontSize(24);
    pdf.text(ml, cury, name);
    cury += pdf.getTextDimensions(name)['h'];

    cury = addSingle(pdf, ml, mli, cury, "Description: ", desc);
    cury = addSingle(pdf, ml, mli, cury, "Yield: ", yld);
    cury = addIngredients(pdf, ml, mli, cury, ingredients);
    cury = addSteps(pdf, ml, mli, cury, steps);
    cury = addSingle(pdf, ml, mli, cury, "Notes: ", notes);
    return pdf;
}

function makeHtmlVersion(view, name, desc, yld, ingredients, steps, notes) {
    view.append('<h1>' + name + '</h1>');
    if(desc.length > 0) {
        view.append('<h3>Description: </h3>\
        <p>' + desc + '</p>');
    }
    if(yld.length > 0) {
        view.append('<h3>Yield: </h3><p>' + yld + '</p>');
    }
    if(ingredients.length > 0) {
        view.append('<h3>Ingredients: </h3><table class="table" id="ing-list"><tbody></tbody></table>');
        $.each(ingredients, function(i, ingredient) {
            $('#ing-list').append('<tr>\
                <td>' + ingredient['amount'] + '</td>\
                <td>' + ingredient['name'] + '</td>\
                </tr>');
        });
    }
    if(steps.length > 0) {
        $("#recipe-viewer").append('<h3>Directions: </h3><ol id="step-list"></ol>');
        $.each(steps, function(i, step) {
            $('#step-list').append('<li>' + step + '</li>');
        });
    }
    if(notes.length > 0) {
        view.append('<h3>Notes: </h3>\
        <p>' + notes.replace(/\n/g, '<br>') + '</p>');
    }
}

$(document).ready(function(){
    var recipe_id = getUrlVars()['recipe_id'];
    $("#edit-btn").click(function() {
        window.location.href = "/edit?recipe_id=" + recipe_id;
    });
    
    $.ajax({
        type: "GET",
        url: "/recipes?recipe_id=" + recipe_id
    }).done(function(data) {
        var obj = JSON.parse(data);
        $('#download-btn').click(function(){
            var pdf = makePdfVersion(
                obj['name'], 
                obj['description'], 
                obj['yield'], 
                obj['ingredients'], 
                obj['steps'], 
                obj['notes']);
            pdf.save(obj['name'] + ".pdf");
        });
        makeHtmlVersion(
            $('#recipe-viewer'), 
            obj['name'], 
            obj['description'], 
            obj['yield'], 
            obj['ingredients'], 
            obj['steps'], 
            obj['notes']);
    });
});
