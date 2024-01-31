(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
        
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });


    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#000000";

    // Miembros por Año
    var ctx1 = $("#miembros-anuales").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "line",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
            datasets: [{
                    label: "Número de Miembros",
                    data: [12, 50, 90, 125, 180, 191, 210, 225, 240],
                    backgroundColor: "rgba(15, 195, 92, .7)",
                    fill: true
                }
            ]
        },
        options: {
            responsive: true
        }
    });

    // Préstamos por Mes
    var ctx2 = $("#prestamos-mensuales").get(0).getContext("2d");
    var myChart2 = new Chart(ctx2, {
        type: "bar",
        data: {
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            datasets: [{
                    label: "Cantidad de Préstamos",
                    data: [25, 13, 20, 8, 29, 41, 48, 19, 35, 38, 52, 70],
                    backgroundColor: "rgba(15, 195, 92, .7)"
                }
            ]
        },
        options: {
            responsive: true
        }
    });

    // Distribución de Ahorros
    var ctx4 = $("#distribucion-ahorros").get(0).getContext("2d");
    var myChart4 = new Chart(ctx4, {
        type: "bar",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "Cuentas Corrientes",
                    data: [150, 180, 200, 220, 240, 270, 300],
                    backgroundColor: "rgba(15, 195, 92, .9)"
                },
                {
                    label: "Cuentas de Ahorros",
                    data: [120, 140, 160, 180, 200, 220, 240],
                    backgroundColor: "rgba(15, 195, 92, .7)"
                },
                {
                    label: "Depósitos a plazo",
                    data: [20, 40, 60, 80, 100, 120, 140],
                    backgroundColor: "rgba(15, 195, 92, .5)"
                },]
        },
        options: {
            responsive: true
        }
    });


    // Ventas y Ganancias por Año
    var ctx5 = $("#ventas-ganancias").get(0).getContext("2d");
    var myChart5 = new Chart(ctx5, {
        type: "line",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "Ventas",
                    data: [15, 30, 55, 45, 70, 65, 85],
                    backgroundColor: "rgba(15, 195, 92, .7)",
                    fill: true
                },
                {
                    label: "Ganancias",
                    data: [99, 135, 170, 130, 190, 180, 270],
                    backgroundColor: "rgba(15, 195, 92, .5)",
                    fill: true
                }
            ]
        },
        options: {
            responsive: true
        }
    });
    // Ventas por Región
    var ctx3 = $("#prestamos-region").get(0).getContext("2d");
    var myChart3 = new Chart(ctx3, { 
        type: "pie",
        data: {
            labels: ["Caribe", "Pacífica", "Andina", "Orinoquia", "Amazonia", "Insular"],
            datasets: [{
                backgroundColor: [
                    "rgba(14, 195, 92, .7)",
                    "rgba(15, 196, 92, .5)",
                    "rgba(19, 195, 94, .7)",
                    "rgba(15, 195, 90, .5)",
                    "rgba(15, 190, 92, .5)",
                    "rgba(15, 195, 92, .3)"
                ],
                data: [150, 120, 220, 30, 30, 29]
            }]
        },
        options: {
            responsive: true
        }
    });

})(jQuery);
