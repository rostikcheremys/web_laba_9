$(document).ready(function () {
    $('#ip-input').on('keypress', function (e) {
        const char = String.fromCharCode(e.which);
        if (!/[0-9:.]/.test(char)) {
            e.preventDefault();
        }
    });

    $('#search-button').on('click', function () {
        let ip = $('#ip-input').val().trim();

        if (ip === "") {
            displayMessage("[Enter IP address]");
            displayInfo("")
            return;
        }

        ip = ip.replace(/^\.+|\.+$/g, '').replace(/\.{2,}/g, '.');

        if (!isValid(ip)) {
            displayResult(ip, "Invalid IP Address");
            return;
        }

        $('#ip-result').text(ip);
        fetchInfo(ip);
    });

    function isValid(ip) {
        return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
    }

    function fetchInfo(ip) {
        $.ajax({
            type: "POST",
            url: "ip_info_json.php",
            data: { ip: ip },
            dataType: "json",
            success: function (data) {
                if (data.error) {
                    handleError(ip, data.error);
                } else {
                    displayInfo(data);
                }
            },
            error: function () {
                displayResult(ip, 'Server request error');
            }
        });
    }

    function handleError(ip, error) {
        switch (error) {
            case "invalid-request":
            case "reserved range":
                displayResult(ip, error === "invalid-request" ? "Invalid IP Address" : "Reserved IP");
                break;
            default:
                displayResult(ip, error);
        }
    }

    function displayInfo(data) {
        $('#country-code').text(data.countryCode || 'N/A');
        $('#country-name').text(data.country || 'N/A');
        $('#region').text(data.region || 'N/A');
        $('#region-name').text(data.regionName || 'N/A');
        $('#city').text(data.city || 'N/A');
        $('#postal-code').text(data.zip || 'N/A');
        $('#latitude').text(data.lat || 'N/A');
        $('#longitude').text(data.lon || 'N/A');
        $('#flag').attr('src', `flags_ISO_3166-1/${data.countryCode ? data.countryCode.toLowerCase() : '_unitednations'}.png`);
    }

    function displayResult(ip, errorMessage) {
        let resultHtml = `${ip} <span class="${errorMessage === "Invalid IP Address" ? 'invalid-ip ip-result' : 'reserved-ip'}">[${errorMessage}]</span>`;
        $('#ip-result').html(resultHtml);
        clearInfo();
    }

    function clearInfo() {
        $('#country-code, #country-name, #region-name, #region, #city, #postal-code, #latitude, #longitude').text('N/A');
        $('#flag').attr('src', 'flags_ISO_3166-1/_unitednations.png');
    }

    function displayMessage(message) {
        $('#ip-result').html(`<span class="error">${message}</span>`);
    }
});
