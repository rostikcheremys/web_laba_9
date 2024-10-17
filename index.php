<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>IP Lookup</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <header>
        <h1>IP Lookup</h1>
    </header>

    <div class="search-IP">
        <input type="text" id="ip-input" placeholder="Enter IP address.."/>
        <button type="button" id="search-button">Search</button>
    </div>

    <main id="main">
        <h4>IP details for <span id="ip-result"></span></h4>
        <h3>Geolocation Information</h3>
        <p>Country Code: <span id="country-code"></span></p>
        <img id="flag" src="flags_ISO_3166-1/_unitednations.png" alt="Country Flag"/>
        <p>Country Name: <span id="country-name"></span></p>
        <p>Region Name: <span id="region-name"></span></p>
        <p>Region: <span id="region"></span></p>
        <p>City: <span id="city"></span></p>
        <p>Postal Code: <span id="postal-code"></span></p>
        <p>Latitude: <span id="latitude"></span></p>
        <p>Longitude: <span id="longitude"></span></p>
    </main>

    <script src="script.js"></script>

    <footer>
        <p class="developer-name">made by Rostyslav Cheremys, 2024</p>
    </footer>
</body>
</html>
