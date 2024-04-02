document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const formFile = document.getElementById('formFile');

    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files[0].name;
        formFile.textContent = fileName;
    });

});

function showInputField() {
    var selectElement = document.getElementById("floatingSelect");
    var selectedValue = selectElement.options[selectElement.selectedIndex].value;
    var pagadoAField = document.getElementById("pagadoAField");
    
    // Si se selecciona Efectivo (value=5), mostrar el campo "Pagado A", de lo contrario, ocultarlo.
    if (selectedValue === "5") {
        pagadoAField.style.display = "block";
    } else {
        pagadoAField.style.display = "none";
    }
}