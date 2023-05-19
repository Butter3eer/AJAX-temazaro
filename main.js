const base_url = "https://retoolapi.dev/w9R9Mb/customers";

const baseUrl = "https://cataas.com";
const apiUrl = "https://cataas.com/cat?json=true";

$(function () {
    listPeople();
    macska_betolt();
    const gomb = $("#gomb");
    gomb.on("click", macska_betolt);

    $("#save").click(function (e) {
        e.preventDefault();
        const name = $("#name_input").val();
        const address = $("#address_input").val();
        const email = $("#email_input").val();
        const id = $("#personId").val();

        const person = {
            id: id,
            name: name,
            address: address,
            email: email
        };
        $.ajax({
            type: "PUT",
            url: `${base_url}/${id}`,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(person),
            success: function (data, textStatus, jqXHR) {
                if (textStatus === "success") {
                    listPeople();
                }
            },
        });
    });

    $("#personForm").submit(function (e) {
        e.preventDefault();
        const name = $("#name_input").val();
        const address = $("#address_input").val();
        const email = $("#email_input").val();
        const person = {
            name: name,
            address: address,
            email: email
        }
        $.post(base_url, person,
            function (data, textStatus, jqXHR) {
                if (textStatus === "success") {
                    $("#name_input").val("");
                    $("#address_input").val();
                    $("#email_input").val("");
                    listPeople();
                }
            },
            "json"
        );
    });
});

function listPeople() {
    $.get(base_url,
        function (data) {
            console.log(data);
            let html = "";
            data.forEach(person => {
                html += `<tr>
                    <td>${person.id}</td>
                    <td>${person.name}</td>
                    <td>${person.address}</td>
                    <td>${person.email}</td>
                    <td><i onclick="deletePerson(${person.id})" class="fa-solid fa-delete-left"></i></td>
                    <td><i onclick="readPerson(${person.id})" class="fa-solid fa-arrows-rotate"></i></td>
                </tr>`;
            })
            $("#peopleTable").html(html);
        },
        "json"
    );
}

function deletePerson(personId) {
    $.ajax({
        type: "DELETE",
        url: `${base_url}/${personId}`,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (textStatus === "success") {
                listPeople();
            };
        }
    });
}

function readPerson(personId) {
    $.get(`${base_url}/${personId}`,
        function (data, textStatus) {
            if (textStatus === "success") {
                $("#name_input").val(data.name);
                $("#address_input").val(data.address);
                $("#email_input").val(data.email);
                $("#personId").val(data.id);
            }
        },
        "json"
    );
}

function macska_betolt() {
    const kep = $("#kep");
  
    $.get(apiUrl, 
        function(response) {
            const imgUrl = response.url;
            const imgSrc = baseUrl + imgUrl;
            kep.attr("src", imgSrc);
        },
        "json"
    );
}