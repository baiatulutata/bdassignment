function getProfiles(favData) {

    fetch("https://fa.bdtechnologies.ch/api/v1/profiles")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("container");
            const mosaic_container = document.getElementById("mosaic_container");

            container.classList.add("row", "gy-3");
            var lastMosacicProfileElement;
            if (data.profiles && data.profiles.length > 0) {
                data.profiles.forEach(profile => {
                    const profileElement = document.createElement("div");
                    profileElement.classList.add("col-md-4");
                    profileElement.classList.add("col-lg-3");
                    profileElement.classList.add("col-xl-2");
                    profileElement.innerHTML = `
                        <div class="card position-relative  h-100">
                            <img src="${profile.avatar}" loading="lazy" class="card-img-top profile-box"  style="" alt="${profile.name}" />             
                            <button class="btn btn-outline-light position-absolute top-0 end-0 m-2 favorite-btn" data-id="${profile.id}" data-favorited="${favData.includes(profile.id)}">
                              <i class="bi bi-heart${favData.includes(profile.id) ? '-fill text-danger' : ''}"></i>
                            </button>
                              <div class="card-body mt-2">
                              <h5 class="card-title">${profile.name}, ${profile.age}</h5>
                              </div>
                            <div class="card-body  mt-2">
                            
                                <p class="card-text"><strong>Status:</strong> ${profile.relationship_status}</p>
                                <p class="card-text"><strong>City:</strong> ${profile.city}</p>
                             </div>
                            <div class="card-body d-flex align-content-end flex-wrap mb-2">
                            
                      
                                 <button class="btn btn-primary message-btn m-2" data-id="${profile.id}" data-bs-toggle="modal" data-bs-target="#messageModal">Message</button>
                              <a class="btn btn-secondary m-2" href="?id=${profile.id}" >New Page</a>
                             
                            </div>
                        </div>
                    `;
                    container.appendChild(profileElement);
                    const mosaicProfileElement = document.createElement("div");

                    mosaicProfileElement.classList.add("profile-card");
                    mosaicProfileElement.innerHTML = `
                     
                        <div class="card-inner">
                            <div class="card-front">
                            <img src="${profile.avatar}" loading="lazy" style="" alt="${profile.name}" />             
                            </div>
                            <div class="card-back">
                            <button class="btn position-absolute top-0 end-0 m-2 favorite-btn" data-id="${profile.id}" data-favorited="${favData.includes(profile.id)}">
                              <i class="bi bi-heart${favData.includes(profile.id) ? '-fill text-danger' : ''}"></i>
                            </button>
                                <h5>${profile.name}, ${profile.age}</h5>
                                <p>From:  ${profile.city}</p>
                                <p>Looking for: ${profile.relationship_status}</p>
                                <div class="d-flex">
                                 <button class="btn btn-info message-btn m-1" data-id="${profile.id}" data-bs-toggle="modal" data-bs-target="#messageModal"><i class="bi bi-envelope-heart"></i></button>
                                  <a class="btn btn-primary m-1" href="?id=${profile.id}" ><i class="bi bi-person-lines-fill"></i></a>
                                </div>
                        </div>
                 
                    </div>
                    `;
                    ///populate mosaic grid too
                    mosaic_container.appendChild(mosaicProfileElement);
                    if (lastMosacicProfileElement) {
                        mosaic_container.appendChild(lastMosacicProfileElement);
                    }
                    lastMosacicProfileElement = mosaicProfileElement.cloneNode(true);

                });


                document.querySelectorAll(".message-btn").forEach(button => {
                    button.addEventListener("click", function () {
                        const profileId = this.getAttribute("data-id");
                        fetch(`https://fa.bdtechnologies.ch/api/v1/profiles/${profileId}`)
                            .then(response => response.json())
                            .then(profileData => {

                                document.getElementById("modalTitle").innerText = `Message ${profileData.name}`;
                                document.getElementById("modalBody").innerHTML = `
                                    <img src="${profileData.avatar}" loading="lazy" class="img-fluid rounded mb-2" alt="${profileData.name}" />
                                    <p><strong>Age ${profileData.age}</strong></p>
                                    <p><strong>Status:</strong> ${profileData.relationship_status}</p>
                                    <p><strong>City:</strong> ${profileData.city}</p>
                                    <div class="d-flex gap-2 mb-3">
                                        <button class="btn btn-warning">Flirt</button>
                                        <button class="btn btn-success">Gift</button>
                                        <button class="btn btn-info">Wink</button>
                                    </div>
                                    <textarea class="form-control mb-2" id="messageText" placeholder="Type your message..."></textarea>
                                    <button class="btn btn-primary" id="sendMessage">Send</button>
                                `;
                            })
                            .catch(() => {

                                document.getElementById("modalBody").innerHTML = "<p class='text-danger'>Failed to fetch profile details.</p>";
                            });
                    });
                });

                document.querySelectorAll(".favorite-btn").forEach(button => {
                    button.addEventListener("click", function () {
                        const profileId = this.getAttribute("data-id");
                        const isFavorited = this.getAttribute("data-favorited") === "true";
                        addToFavorites(profileId, isFavorited, function () {
                            if (isFavorited) {
                                button.innerHTML = '<i class="bi bi-heart"></i>';
                                button.setAttribute("data-favorited", "false");
                            } else {
                                button.innerHTML = '<i class="bi bi-heart-fill text-danger"></i>';
                                button.setAttribute("data-favorited", "true");
                            }
                        })
                    });
                });
            } else {
                container.innerHTML = "<p class='text-center'>No profiles found.</p>";
            }
        })
        .catch(() => {
            document.getElementById("container").innerHTML = "<p class='text-center text-danger'>Failed to fetch profiles. Please try again later.</p>";
        });
}


