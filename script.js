$(document).ready(function () {
    $('#ip-input').on('keypress', function (e) {
        const char = String.fromCharCode(e.which);
        if (!/[0-9:.]/.test(char)) {
            e.preventDefault();
        }
    });

    $('#lookup-button').on('click', function () {
        let ip = $('#ip-input').val().trim();
        ip = ip.replace(/^\.+|\.+$/g, '').replace(/\.{2,}/g, '.');

        if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
            displayResult(ip, "Invalid IP Address");
            return;
        }

        $('#ip-result').text(ip);
        $.ajax({
            type: "POST",
            url: "ip_info_json.php",
            data: { ip: ip },
            dataType: "json",
            success: function (data) {
                if (data.error) {
                    if (data.error === "invalid-request") {
                        displayResult(ip, "Invalid IP Address");
                    } else if (data.error === "reserved range") {
                        displayResult(ip, "Reserved IP");
                    } else {
                        displayResult(ip, data.error);
                    }
                } else {
                    $('#country-code').text(data.countryCode || 'N/A');
                    $('#country-name').text(data.country || 'N/A');
                    $('#city').text(data.city || 'N/A');
                    $('#postal-code').text(data.zip || 'N/A');
                    $('#latitude').text(data.lat || 'N/A');
                    $('#longitude').text(data.lon || 'N/A');
                    $('#flag').attr('src', `flags_ISO_3166-1/${data.countryCode ? data.countryCode.toLowerCase() : 'unitednations'}.png`);
                }
            },
            error: function () {
                displayResult(ip, 'Server request error');
            }
        });
    });

    function displayResult(ip, errorMsg) {
        $('#ip-result').text(ip + " [" + errorMsg + "]");
        $('#country-code').text('N/A');
        $('#country-name').text('N/A');
        $('#city').text('N/A');
        $('#postal-code').text('N/A');
        $('#latitude').text('N/A');
        $('#longitude').text('N/A');
        $('#flag').attr('src', 'flags_ISO_3166-1/_unitednations.png');
    }
});