$(document).ready(function()
{
            var English = $('#Lang').val() == "English";
	        $("#wizard").steps(); 
            $("#form").steps({
                bodyTag: "fieldset",
                onStepChanging: function (event, currentIndex, newIndex)
                {
                    // Always allow going backward even if the current step contains invalid fields!

                    if (currentIndex > newIndex)
                    {
                        return true;
                    }

                    // Forbid suppressing "Warning" step if the user is to young
                    if (newIndex === 3 && Number($("#age").val()) < 18)
                    {
                        return false;
                    }
                    
                    var form = $(this);

                    // Clean up if user went backward before
                    if (currentIndex < newIndex)
                    {
                        // To remove error styles
                        $(".body:eq(" + newIndex + ") label.error", form).remove();
                        $(".body:eq(" + newIndex + ") .error", form).removeClass("error");
                    }

                    // Disable validation on fields that are disabled or hidden.
                    form.validate().settings.ignore = ":disabled,:hidden";

                    // Start validation; Prevent going forward if false
                    return form.valid();
                },
                onStepChanged: function (event, currentIndex, priorIndex)
                {

                },
                onFinishing: function (event, currentIndex)
                {
                    var form = $(this);

                    // Disable validation on fields that are disabled.
                    // At this point it's recommended to do an overall check (mean ignoring only disabled fields)
                    form.validate().settings.ignore = ":disabled";

                    return form.valid();
                },
                onFinished: function (event, currentIndex)
                {
                    var form = $(this);

                    // Submit form input
                    form.submit();
                }, 
                labels: 
                {
                    cancel: (English) ? "Cancel" : "Cancelar",
                    current:(English) ? "current step:" : "Paso Actual:",
                    pagination: (English) ? "Pagination" : "Paginacion",
                    finish: (English) ? "Finish" : "Finalizar",
                    next: (English) ? "Next" : "Siguiente",
                    previous: (English) ? "Previous" : "Anterior",
                    loading: (English) ? "Loading..." : "Cargando..."
                }          
            }).validate({
                        errorPlacement: function (error, element)
                        {
                            element.before(error);
                        },
                        rules: {
                            confirm: {
                                equalTo: "#password"
                            }
                        }
                    });

            $("select").imagepicker();
		    $('#scroll').slimScroll({
		        height: '250px',
		        wheelStep: 2
		    });
		    $('#project-list').slimScroll({
		        height: '100px',
		        wheelStep: 1
		    });
});

