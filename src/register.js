document.getElementById("campaign-form").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Collect form data
    const campaignId = document.getElementById('campaign-id').value;
    const name = document.getElementById("campaign-name").value;
    const walletAddress = document.getElementById('campaign-address').value;
    const description = document.getElementById("campaign-description").value;
    const imageFile = document.getElementById("campaign-image").files[0];
    const contact = document.getElementById("campaign-contact").value;



    if (!campaignId || !name || !description || !contact) {
        alert("Please fill in all fields.");
        return;
    }

    const campaigns = JSON.parse(localStorage.getItem("campaigns")) || [];

    // Check if a campaign with the same ID already exists
    const isDuplicateId = campaigns.some(campaign => campaign.campaignId === campaignId);

    if (isDuplicateId) {
        alert(`Campaign with ID "${campaignId}" already exists. Please use a different ID.`);
        return;
    }



    // Convert image to Base64 for localStorage
    const reader = new FileReader();
    reader.onloadend = () => {
        const image = reader.result;

        //  object of new campaign 
        const newCampaign = {
            campaignId,
            name,
            walletAddress,
            description,
            image,
            contact,
        };
        //for saving in local stprage
        const campaigns = JSON.parse(localStorage.getItem("campaigns")) || [];
        campaigns.push(newCampaign);
        localStorage.setItem("campaigns", JSON.stringify(campaigns));


        alert("Campaign registered successfully!");

        document.getElementById("campaign-form").reset();
    };

    reader.readAsDataURL(imageFile); // Trigger Base64 conversion
});
