$("button").hide();
$(".container").on("click", ".event",function(){
    var text = $(this).find("p")
    .text()
    .trim();
    
        
    // console.log($(this).closest(".row").attr("data-field"));
    $(this).switchClass(
        "col-9 col-md-10",
        "col-7 col-md-9",
        {
            duration:200,
            complete: function(){
                $(this).closest(".row").find(".btn").show({
                    effect:"slide",
                    duration:100,
                    complete: function(){
                        $(this).closest(".row").find(".clearBtn").show();
                        var textInput = $("<textarea>")
                            .addClass("form-control mr-3 my-2")
                            .attr("rows",4)
                            .val(text);
                        $(this).closest(".row").find(".event p").replaceWith(textInput);
                        textInput.trigger("focus");
                        console.log(this)
                    }
                })
            }
        })
        
});
$(".container").on("click",".btn",function(){
    var id = $(this).closest(".row").attr("data-field");
    console.log(id);
});
$(".container").on("click",".clearBtn",function(){
    var id = $(this).closest(".row").attr("data-field");
    console.log("clear"+id);
});
$(".container").on("blur","textarea",function(){
    var text = $(this)
        .val()
        .trim();
    var newEvent = $("<p>")
        .text(text);
    console.log(this);
      // replace textarea with p element
      $(this).replaceWith(newEvent);
    // var newEvent = $("<span>")
    //     .text(text);
    // $(this).replaceWith(newEvent);
});