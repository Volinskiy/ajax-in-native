

$(function(){
	$(".popup_open").on("click", function(){
		var data = "url="+$("#url").val();
		var $form = $("#url").parents("form");
		$.ajax({
			url: $form.attr('action'),
			data: data,
			dataType: "JSON",
			success: function(data){
				$(".popup_open").addClass("open");
				$(".popup_inner").addClass("open");
				$(".popup_inner").text(data.text);
				$(".popup_inner").before("<h1>"+data.title+"</h1>");
			}
		});
	});
});