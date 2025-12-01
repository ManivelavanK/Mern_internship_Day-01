// Resume Handler Functions
function viewResume() {
    // Check if file exists first
    fetch('Manivelavan Resume.pdf')
        .then(response => {
            if (response.ok) {
                window.open('Manivelavan Resume.pdf', '_blank');
            } else {
                alert('Resume file not found. Please ensure Manivelavan Resume.pdf is in the portfolio folder.');
            }
        })
        .catch(error => {
            alert('Resume file not found. Please ensure Manivelavan Resume.pdf is in the portfolio folder.');
        });
}

function downloadResume() {
    // Check if file exists first
    fetch('Manivelavan Resume.pdf')
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('File not found');
            }
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Manivelavan_Resume.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch(error => {
            alert('Resume file not found. Please ensure Manivelavan Resume.pdf is in the portfolio folder.');
        });
}