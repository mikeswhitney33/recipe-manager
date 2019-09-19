function addTitle(pdf, ml, cury, title) {
    pdf.setFontSize(8);
    pdf.setFontStyle('bold');
    pdf.text(ml, cury, title);
    cury += pdf.getTextDimensions(title)['h'] + 2.5;
    pdf.setFontType("normal");
    return cury;
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
        $('#download-btn').click(function( ){
            var pdf = new jsPDF("p", "mm", "a4");
            var cury = 25.4;
            var ml = 25.4;
            var mli = ml + 5;
            pdf.setFontSize(24);
            pdf.text(ml, cury, obj['name']);
            cury += pdf.getTextDimensions(obj['name'])['h'];
            if(obj['description'].length > 0) {
                cury = addTitle(pdf, ml, cury, "Description: ");
                var lines = pdf.splitTextToSize(obj['description'], 210 - (ml+mli));
                pdf.text(mli, cury, lines);
                cury += pdf.getTextDimensions(lines)['h'] + 2.5;
            }
            if(obj['yield'].length > 0) {
                cury = addTitle(pdf, ml, cury, "Yield: ");
                var lines = pdf.splitTextToSize(obj['yield'], 210 - (ml + mli));
                pdf.text(mli, cury, lines);
                cury += pdf.getTextDimensions(lines)['h'] + 2.5;
            }
            if(obj['ingredients'].length > 0) {
                cury = addTitle(pdf, ml, cury, "Ingredients: ");

                var longest = 0;
                for(var i = 0;i < obj['ingredients'].length;i++) {
                    var ing = obj['ingredients'][i];
                    if(ing['amount'].length > longest) {
                        longest = ing['amount'].length;
                    }
                }
                
                for(var i = 0;i < obj['ingredients'].length;i++) {
                    var ing = obj['ingredients'][i];
                    pdf.text(mli , cury, ing['amount']);
                    pdf.text(mli + longest + 15, cury, ing['name']);
                    cury += pdf.getTextDimensions(ing['name'])['h'] + 1;
                }
                cury += 2.5;
            }
            if(obj['steps'].length > 0) {
                cury = addTitle(pdf, ml, cury, "Directions: ");

                var longest = 0;
                for(var i = 0;i < obj['steps'].length;i++) {
                    if(pdf.getTextWidth((i+1) + '. ') > longest) {
                        longest = pdf.getTextWidth((i+1) + '. ');
                    }
                }

                for(var i = 0;i < obj['steps'].length;i++) {
                    pdf.text(mli, cury, (i+1) + ". ");
                    var lines = pdf.splitTextToSize(
                        obj['steps'][i],
                        210 - (mli + longest + ml));
                    pdf.text(mli + longest, cury, lines);
                    cury += pdf.getTextDimensions(lines)['h'] + 1;
                }
            }
            if(obj['notes'].length > 0) {
                cury = addTitle(pdf, ml, cury, "Notes: ");
                var lines = pdf.splitTextToSize(obj['notes'], 210 - (ml+mli));
                pdf.text(mli, cury, lines);
            }
            pdf.save(obj['name'] + ".pdf");
        });
        $('#recipe-viewer').append('<h1>'+obj['name']+'</h1>');
        if(obj['description'].length > 0) {
            $("#recipe-viewer").append('<h3>Description: </h3>\
            <p>'+obj['description']+'</p>');
        }
        if(obj['yield'].length > 0) {
            $("#recipe-viewer").append('<h3>Yield: </h3><p>'+obj['yield']+'</p>');
        }
        if(obj['ingredients'].length > 0) {
            $("#recipe-viewer").append('<h3>Ingredients: </h3><table class="table" id="ing-list"><tbody></tbody></table>');
            for(var i = 0;i < obj['ingredients'].length;i++) {
                $('#ing-list').append('<tr>\
                    <td>'+obj['ingredients'][i]['amount']+'</td>\
                    <td>'+obj['ingredients'][i]['name']+'</td>\
                </tr>');
            }
        }
        if(obj['steps'].length > 0) {
            $("#recipe-viewer").append('<h3>Directions: </h3><ol id="step-list"></ol>');
            for(var i = 0;i < obj['steps'].length;i++) {
                $('#step-list').append('<li>'+obj['steps'][i]+'</li>');
            }
        }
        if(obj['notes'].length > 0) {
            $('#recipe-viewer').append('<h3>Notes: </h3>\
            <p>'+obj['notes'].replace(/\n/g, '<br>')+'</p>');
        }
    });
});

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
