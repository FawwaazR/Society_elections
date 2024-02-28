var president = [0, 0, 0];
var treasurer = [0, 0, 0];
var secretary = [0, 0, 0];
var events = [0, 0];
var marketing = [0, 0];
var sports = [0, 0, 0];

var president_c = ["Loubna", "Amy", "Re-open Nominations"];
var treasurer_c = ["Aksheen", "Sadiq", "Re-open Nominations"];
var secretary_c = ["Aksheen", "Rania", "Re-open Nominations"];
var events_c = ["Zahra", "Re-open Nominations"];
var marketing_c = ["Asma", "Re-open Nominations"];
var sports_c = ["Rania", "Zahra", "Re-open Nominations"];


function register(vote, vote_bank){
    vote_bank[vote - 1]++;
};

function compile_votes(vote_bank, candidate_list){
    var max = Math.max(...vote_bank);
    var max_index = [];

    for(var i = 0; i < vote_bank.length; i++){
        if (vote_bank[i] === max){
            max_index.push(i);
        } 
    }

    var counts = "";
    for(var j = 0; j < vote_bank.length; j++){
        counts = counts + "<strong>" + candidate_list[j] + ":</strong> " + "<span style='color:red;'>" + vote_bank[j] + "</span> ";
    }

    counts = counts + "<br> <br>";

    return [counts, max_index];
}

function publish(vote_bank, candidate_list, role){
    var counts = compile_votes(vote_bank, candidate_list)[0];
    var max_index = compile_votes(vote_bank, candidate_list)[1];

   
    if(max_index.length === 1 && max_index[0] != candidate_list.length - 1){
        counts = counts + "<span style= 'color: #0000AA;'>" + "<em>Congratulations to<em> " + "<u><strong> new " + role + ", " + candidate_list[max_index[0]] + "!</strong></u></span>";
    }else if(max_index.length === 1){
        counts = counts + "<span style= 'color: #0000AA;'>" + "<u><strong>Need to Re-open Nominations</strong></u></span>";
    }else{
        counts = counts + "<span style= 'color: #0000AA;'>" + "<em>Draw between<em></span> ";
        for (var k = 0; k < max_index.length; k++){
            if(k === max_index.length - 1){
                counts = counts + "<span style= 'color: #0000AA;'>" + "<u><strong>" + candidate_list[max_index[k]] + "</strong></u></span>";
            }else{
                counts = counts + "<span style= 'color: #0000AA;'>" + "<u><strong>" + candidate_list[max_index[k]] + "</strong></u>" + " <em>and<em></span> ";
            }
        }
    }
    
    counts = counts + "<hr>";

    $("div").append($("<p>").html(counts));
};

function voting(){
    $("#submit").click(function(){

        var pres = parseInt($(".president input").val());

        if (pres === 4){
            $("div").remove();

            var newDiv = $("<div>").css({
                "background-color": "lightgray",
                "align-items": "center",
                "text-align": "center",
            });
            $("body").append(newDiv);

            publish(president, president_c, "president");
            publish(treasurer, treasurer_c, "treasurer");
            publish(secretary, secretary_c, "secretary");
            publish(events, events_c, "events officer");
            publish(marketing, marketing_c, "marketing officer");
            publish(sports, sports_c, "sports officer");

            $("p").addClass("results");
            return
        }

        var tres = parseInt($(".treasurer input").val());
        var sec = parseInt($(".secretary input").val());
        var eve = parseInt($(".events input").val());
        var mark = parseInt($(".marketing input").val());
        var sp = parseInt($(".sports input").val());

        register(pres, president);
        register(tres, treasurer);
        register(sec, secretary);
        register(eve, events);
        register(mark, marketing);
        register(sp, sports);

        $("input").val("");    
    });

    voting();
};

voting();