document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const formFile = document.getElementById('formFile');

    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files[0].name;
        formFile.textContent = fileName;
    });
});
