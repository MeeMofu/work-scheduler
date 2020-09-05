var eventList;
var stamp = ['09:00am','10:00am','11:00am','12:00pm','01:00pm','02:00pm','03:00pm','04:00pm','05:00pm'];
var startTime = 9;

var timing = function(){
    // Update header
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

    // Update time table
    var currHour = parseInt(moment().format("kk"));
    var currHour = parseInt(moment().hour(10).format("kk")); 
    // loop over each field
    for (var i=0;i<stamp.length;i++){
        var event = $("[data-field='"+i+"']").find(".event");
        event.removeClass("past present future");
        if (currHour>(i+startTime)){
            event.addClass("past");
            console.log(i);
        } else if (currHour === (i+startTime)) {
            event.addClass("present");
        } else {
            event.addClass("future");
        }
        
    }
}

var createFields = function(){
    eventList = JSON.parse(localStorage.getItem("eventList"));
    if (!eventList){
        eventList = Array(stamp.length).fill(' ');
    }
    // Generate the empty fields
    for (var i=0;i<stamp.length;i++){
        // The html was tested out and parse into a string
        var field = $("<div>").html("<div class='col-3 col-md-2 time'><span class='mx-auto'>"+stamp[i]+"</span></div><div class='col-9 col-md-10 event'><p></p></div><div class='col-2 col-md-1 d-flex p-0'><button type='button' class='close text-primary clearBtn' aria-label='Close'><span aria-hidden='true'>&times;</span></button><button type='button' class='btn btn-info saveBtn w-100'>Save</button></div>");
        field.addClass("row no-gutter m-2 h-100").attr("data-field",i);
        
        // Updated the field with saved event
        field.find(".event p").text(eventList[i]);
    
        // Added the element to container
        $(".container").append(field);
        $("button").hide();
    }
    timing();
}


// Start editing a field
$(".container").on("click", ".event",function(){
    var text = $(this).find("p")
        .text()
        .trim();
    var rowEl=$(this).closest(".row");
    // Change size of the field
    $(this).switchClass(
        "col-9 col-md-10",
        "col-7 col-md-9",
        {
            duration:200,
            // once finished, show the save button
            complete: function(){
                rowEl.find(".saveBtn").show({
                    effect:"slide",
                    duration:200,
                    // once finished, show the text field and clear button
                    complete: function(){
                        rowEl.find(".clearBtn").show();
                        var textInput = $("<textarea>")
                            .addClass("form-control bg-transparent border-0 mr-3 my-2")
                            .attr("rows",2)
                            .val(text);
                        rowEl.find(".event p").replaceWith(textInput);
                        textInput.trigger("focus");
                    }
                })
            }
        })
        
});

// Save the updated field
var save = function(rowEl){
    var id = rowEl.attr("data-field");
    eventList[id]= rowEl.find("p").text().trim();

    // save to local storage
    localStorage.setItem("eventList", JSON.stringify(eventList));
}

// Reset the field into previous state
var reset = function(rowEl){
    // Hide save button
    rowEl.find(".saveBtn").hide({
        effect: "slide",
        duration: 200,
        // Once completed, hide clear and reset field size
        complete: function(){
            rowEl.find(".clearBtn").hide();
            rowEl.find(".event").switchClass(
                "col-7 col-md-9",
                "col-9 col-md-10"
            );
        }
    })

    // Change text area back to <p>
    var text = rowEl.find("textarea")
        .val()
        .trim();
    var newEvent = $("<p>")
    .text(text);
    rowEl.find("textarea").replaceWith(newEvent);
    save(rowEl);
}

// If save button was click
$(".container").on("click",".saveBtn",function(){
    reset($(this).closest(".row"));
});

// If clear button was click
$(".container").on("click",".clearBtn",function(){
    // Clear text area
    $(this).closest(".row").find("textarea").val("")
    reset($(this).closest(".row"));
});

createFields();

setInterval(function(){
    timing();
}, 5*60*1000); // Update every 5 min