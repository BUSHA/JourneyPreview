document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("screenshotModal");
    const screenshotImage = document.getElementById("screenshotImage");
    const modalContent = modal.getElementsByClassName("modal-content")[0];

    document.getElementById('screenshotLink').addEventListener('click', function(event) {
        event.preventDefault();

        // Determine the active tab and the corresponding container
        let captureElement;
        if (document.getElementById('desktopTab').classList.contains('active')) {
            captureElement = document.getElementById('desktopContainer');
        } else {
            captureElement = document.getElementById('mobileContainer');
        }

        // Take screenshot of the selected container
        html2canvas(captureElement, { backgroundColor: "rgba(0,0,0,0)" }).then(canvas => {
            // Convert canvas to data URL
            const dataUrl = canvas.toDataURL();

            // Set image source to data URL
            screenshotImage.src = dataUrl;

            // Display modal
            modal.style.display = "flex";

            // Adjust modal width to image width after the image is fully loaded
            screenshotImage.onload = function() {
                modalContent.style.width = screenshotImage.naturalWidth / 2 + 'px';
                modalContent.style.maxWidth = '90%'; // Ensure it doesn't overflow screen width
            }
        });
    });



    // Close modal when the user clicks anywhere outside of the modal content
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});


function generatePreview() {
    
    const markdownInput = document.getElementById("markdownInput").value;

    document.getElementById('title').textContent = document.getElementById("titleInput").value;
    document.getElementById('titleMob').textContent = document.getElementById("titleInput").value;

    document.getElementById('phase').textContent = document.getElementById("phaseSelect").value;
    document.getElementById('phaseMob').textContent = document.getElementById("phaseSelect").value;


    document.getElementById('date').textContent = document.getElementById("dateInput").value;
    document.getElementById('dateMob').textContent = document.getElementById("dateInput").value;


    document.getElementById('parsedHtml').innerHTML = marked.parse(markdownInput);
    document.getElementById('parsedHtmlMob').innerHTML = marked.parse(markdownInput);

    document.getElementById('cta').textContent = document.getElementById("ctaInput").value;
    document.getElementById('ctaMob').textContent = document.getElementById("ctaInput").value;

    document.getElementById('priority').style.fill = document.getElementById("prioritySelect").value;;
    document.getElementById('priorityMob').style.fill = document.getElementById("prioritySelect").value;;

}

// function openTab(tabType) {
//     document.getElementById(`desktopTab`).classList.remove('active');
//     document.getElementById(`mobileTab`).classList.remove('active');
//     document.getElementById(`${tabType}Tab`).classList.add('active');

//     document.getElementById('desktopContainer').style.display = 'none';
//     document.getElementById('mobileContainer').style.display = 'none';
//     document.getElementById(`${tabType}Container`).style.display = 'flex';
// }

function openTab(tabType) {
    const tabs = ['desktop', 'mobile'];
    
    tabs.forEach(type => {
        document.getElementById(`${type}Tab`).classList.toggle('active', type === tabType);
        document.getElementById(`${type}Container`).style.display = type === tabType ? 'flex' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', generatePreview);
