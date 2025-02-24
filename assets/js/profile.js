function getProfile(profileId, isFav) {
    $("header").toggleClass('d-none');
    var container = $("#container");
var isFav=isFav;
    $.ajax({
        url: `https://fa.bdtechnologies.ch/api/v1/profiles/${profileId}`,
        method: "GET",
        dataType: "json",
        success: function(profileData) {
            $("h1").html(profileData.name + "'s profile");
            container.html(`
               <div class="row">
    <!-- Profile Image -->
    <div class="col-md-4 text-center">
        <img src="${profileData.avatar}" loading="lazy" class="img-fluid rounded mb-2" alt="${profileData.name}" />
    </div>

    <!-- Profile Details -->
    <div class="col-md-8">
        <div class="d-flex flex-column gap-2 mb-3">
            <p><strong>Age:</strong> ${profileData.age}</p>
            <p><strong>Status:</strong> ${profileData.relationship_status}</p>
            <p><strong>City:</strong> ${profileData.city}</p>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex gap-2 mb-3 flex-wrap">
            <button class="btn btn-warning">${isFav ? "Remove from " : "Add to "}favorites</button>
            <button class="btn btn-success">Gift</button>
            <button class="btn btn-info">Wink</button>
        </div>

        <!-- Message Section -->
        <textarea class="form-control mb-2" id="messageText" placeholder="Type your message..."></textarea>
        <button class="btn btn-primary" id="sendMessage">Send</button>
    </div>
</div>
            `);
        },
        error: function() {
            $("#modalBody").html("<p class='text-danger'>Failed to fetch profile details.</p>");
        }
    });
}