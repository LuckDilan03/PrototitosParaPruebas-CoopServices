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


    // Función para obtener los datos de la API
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Actualizar gráfico Miembros por Año
    fetchData('URL_PARA_OBTENER_DATOS_MIEMBROS').then(data => {
        var ctx1 = $("#miembros-anuales").get(0).getContext("2d");
        var myChart1 = new Chart(ctx1, {
            type: "line",
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Número de Miembros",
                    data: data.members,
                    backgroundColor: "rgba(15, 195, 92, .7)",
                    fill: true
                }]
            },
            options: {
                responsive: true
            }
        });
    });

    // Actualizar gráfico Préstamos por Mes
    fetchData('URL_PARA_OBTENER_DATOS_PRESTAMOS').then(data => {
        var ctx2 = $("#prestamos-mensuales").get(0).getContext("2d");
        var myChart2 = new Chart(ctx2, {
            type: "bar",
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Cantidad de Préstamos",
                    data: data.loans,
                    backgroundColor: "rgba(15, 195, 92, .7)"
                }]
            },
            options: {
                responsive: true
            }
        });
    });

    // Actualizar gráfico Distribución de Ahorros
    fetchData('URL_PARA_OBTENER_DATOS_AHORROS').then(data => {
        var ctx3 = $("#distribucion-ahorros").get(0).getContext("2d");
        var myChart3 = new Chart(ctx3, {
            type: "bar",
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Cuentas Corrientes",
                    data: data.currentAccounts,
                    backgroundColor: "rgba(15, 195, 92, .9)"
                },
                {
                    label: "Cuentas de Ahorros",
                    data: data.savingsAccounts,
                    backgroundColor: "rgba(15, 195, 92, .7)"
                },
                {
                    label: "Depósitos a Plazo",
                    data: data.timeDeposits,
                    backgroundColor: "rgba(15, 195, 92, .5)"
                }]
            },
            options: {
                responsive: true
            }
        });
    });

    // Actualizar gráfico Ventas y Ganancias por Año
    fetchData('URL_PARA_OBTENER_DATOS_VENTAS').then(data => {
        var ctx4 = $("#ventas-ganancias").get(0).getContext("2d");
        var myChart4 = new Chart(ctx4, {
            type: "line",
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Ventas",
                    data: data.sales,
                    backgroundColor: "rgba(15, 195, 92, .7)",
                    fill: true
                },
                {
                    label: "Ganancias",
                    data: data.profits,
                    backgroundColor: "rgba(15, 195, 92, .5)",
                    fill: true
                }]
            },
            options: {
                responsive: true
            }
        });
    });

    // Actualizar gráfico Ventas por Región
    fetchData('URL_PARA_OBTENER_DATOS_VENTAS_REGION').then(data => {
        var ctx5 = $("#prestamos-region").get(0).getContext("2d");
        var myChart5 = new Chart(ctx5, {
            type: "pie",
            data: {
                labels: data.labels,
                datasets: [{
                    backgroundColor: data.colors,
                    data: data.values
                }]
            },
            options: {
                responsive: true
            }
        });
    });

})(jQuery);

