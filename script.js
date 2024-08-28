$(document).ready(function () {
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    function populateYearSelect() {
        const yearSelect = $("#yearSelect");
        for (let i = 2024-1; i <= currentYear ; i++) {
            yearSelect.append(new Option(i, i));
        }
    }

    function populateMonthSelect() {
        const monthSelect = $("#monthSelect");
        for (let i = 0; i < monthNames.length; i++) {
            monthSelect.append(new Option(monthNames[i], i));
        }
    }

    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }

    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }
    function showSpinner() {
        $("#tabla-sppiner").show();
        $("#tabla-fechas").hide();
        setTimeout(()=>{
            hideSpinner();
        },1000)
    }
    function hideSpinner() {
        $("#tabla-sppiner").hide();
        $("#tabla-fechas").show();
    }

    function generateCalendar(year, month) {
        const firstDay = getFirstDayOfMonth(year, month) || 7; // Domingo es 0, ajustar para Lunes = 1
        const daysInMonth = getDaysInMonth(year, month);
        const calendarBody = $("#calendarBody");
        calendarBody.empty();
        showSpinner();
        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = $("<tr></tr>");

            for (let j = 1; j <= 7; j++) {
                if (i === 0 && j < firstDay) {
                    row.append($("<td class='empty'></td>"));
                } else if (date > daysInMonth) {
                    row.append($("<td class='empty'></td>"));
                } else {
                    let dayCell = $("<td></td>");
                    let divPadre = $(`<div class="d-flex justify-content-between"></div>`);
                    let divFecha = $(`<div class="day-number small-bullet">${date}</div>`);
                    let divBolitas = $(`<div></div>`)
                    if (date % 2 == 0) {
                        divBolitas.append(`<div class="small-bullet recibido">1</div>`);
                        divBolitas.append(`<div class="small-bullet notificado">2</div>`);
                        divBolitas.append(`<div class="small-bullet resuelto">3</div>`);
                        divBolitas.append(`<div class="small-bullet prorroga">4</div>`);
                    }
                    divPadre.append(divFecha);
                    divPadre.append(divBolitas);
                    dayCell.append(divPadre);
                    row.append(dayCell);
                    date++;
                }
            }

            calendarBody.append(row);
        }
        if (calendarBody.children().last().children().first().hasClass("empty")) {//Si el primer dia del row es vacio limpia el rom completo
            calendarBody.children().last().remove();
        }
    }


    populateYearSelect();
    populateMonthSelect();

    $("#yearSelect").val(currentYear);
    $("#monthSelect").val(currentMonth);

    generateCalendar(currentYear, currentMonth);

    $("#yearSelect, #monthSelect").change(function () {
        const selectedYear = $("#yearSelect").val();
        const selectedMonth = $("#monthSelect").val();
        generateCalendar(selectedYear, selectedMonth);
    });
});