document.addEventListener("DOMContentLoaded", loadTableData);

function addRow() {
    let name = document.getElementById("nameInput").value.trim();
    let link = document.getElementById("linkInput").value.trim();

    if (name === "" || link === "") return;
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
        alert("Please enter a valid URL starting with http:// or https://");
        return;
    }

    // Send data to the backend (PHP) to store in XML
    fetch('server.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `name=${encodeURIComponent(name)}&link=${encodeURIComponent(link)}`
    }).then(response => response.json()).then(data => {
        if (data.success) {
            loadTableData(); // Refresh table after saving
            document.getElementById("nameInput").value = "";
            document.getElementById("linkInput").value = "";
        } else {
            alert("Error saving data.");
        }
    });
}

function loadTableData() {
    fetch('server.php')
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("tableBody");
            tableBody.innerHTML = ""; // Clear table

            data.forEach(entry => {
                let row = document.createElement("tr");
                row.innerHTML = `<td>${entry.name}</td><td><a href="${entry.link}" target="_blank">Visit</a></td>`;
                tableBody.appendChild(row);
            });
        });
}
