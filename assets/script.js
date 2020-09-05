$("button").hide();
$(".container").on("click", ".event",function(){
    var text = $(this).find("p")
        .text()
        .trim();
    var rowEl=$(this).closest(".row");
    $(this).switchClass(
        "col-9 col-md-10",
        "col-7 col-md-9",
        {
            duration:200,
            complete: function(){
                rowEl.find(".btn").show({
                    effect:"slide",
                    duration:100,
                    complete: function(){
                        rowEl.find(".clearBtn").show();
                        var textInput = $("<textarea>")
                            .addClass("form-control mr-3 my-2")
                            .attr("rows",2)
                            .val(text);
                        rowEl.find(".event p").replaceWith(textInput);
                        textInput.trigger("focus");
                    }
                })
            }
        })
        
});
// $(".container").on("blur","textarea",function(){
//     var text = $(this)
//     .val()
//     .trim();
//     var newEvent = $("<p>")
//     .text(text);
//     $(this).replaceWith(newEvent);
// });

var reset = function(rowEl){
    rowEl.find(".btn").hide({
        effect: "slide",
        duration: 100,
        complete: function(){
            rowEl.find(".clearBtn").hide();
            rowEl.find(".event").switchClass(
                "col-7 col-md-9",
                "col-9 col-md-10"
            )
        }
    })
    var text = rowEl.find("textarea")
        .val()
        .trim();
    var newEvent = $("<p>")
    .text(text);
    rowEl.find("textarea").replaceWith(newEvent);
}

$(".container").on("click",".btn",function(){
    var id = $(this).closest(".row").attr("data-field");
    console.log("save "+id);
    reset($(this).closest(".row"));
});
$(".container").on("click",".clearBtn",function(){
    var id = $(this).closest(".row").attr("data-field");
    $(this).closest(".row").find("textarea").val("")
    console.log("clear "+id);
    reset($(this).closest(".row"));
});