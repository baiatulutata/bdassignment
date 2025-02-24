document.addEventListener("DOMContentLoaded", function () {
    fetch(`https://fa.bdtechnologies.ch/api/v1/account`)
        .then(response => response.json())
        .then(accountData => {
            fetch(`https://fa.bdtechnologies.ch/api/v1/favorites`)
                .then(response => response.json())
                .then(favData => {
                    const params = new Proxy(new URLSearchParams(window.location.search), {
                        get: (searchParams, prop) => searchParams.get(prop),
                    });//get link details

                    decideWhatToDoNext(params, favData, accountData);
                })
                .catch(() => {
                    alert("failed to get favorites")
                });
        })
        .catch(() => {
            alert("failed to login")
        });
})

function decideWhatToDoNext(params, favData, accountData) {

    if (params && params.id) {
        //load one profile

        getProfile(params.id, favData.favorites[accountData.UID].includes(parseInt(params.id)));
    } else {
        getProfiles(favData.favorites[accountData.UID]);

    }
}

function addToFavorites(profileId, isFavorited, callBack) {
    const url = "https://fa.bdtechnologies.ch/api/v1/favorites";
    const method = isFavorited ? "DELETE" : "POST";

    fetch(url, {
        method: method,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({profileId: parseInt(profileId)})
    })
        .then(response => response.json())
        .then(() => {
            callBack()
        })
        .catch(() => {
            alert("Failed to update favorites.");
        });
}