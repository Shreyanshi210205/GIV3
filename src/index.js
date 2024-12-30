import { connectWallet, checkWalletConnection } from './web3.js';


// Get the toggle button, image, and body element
const toggleBtn = document.getElementById('toggleBtn');
const modeIcon = document.getElementById('modeIcon');
const body = document.body;

// Check if the user has a preference for dark mode
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    modeIcon.src = 'assets/dark-mode.png';  // Update the image for dark mode. this keeps the css updated
}

// Toggle the mode when the button is clicked
toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');//this will only help to toggle nd not maintain the dark mode
    
    if (body.classList.contains('dark-mode')) {
        modeIcon.src = 'assets/dark-mode.png'; // Change the icon to dark mode
        localStorage.setItem('theme', 'dark');
    } else {
        modeIcon.src = 'assets/light-mode.png'; // Change the icon to light mode
        localStorage.setItem('theme', 'light');
    }
});



document.addEventListener('DOMContentLoaded', async () => {
  // Check if a wallet is already connected on page load
  const connectedAccount = await checkWalletConnection();//connected wallet account le lo by web3.js k is function se check krke...
  updateNavbar(connectedAccount); // Update navbar based on wallet connection status
  
  // Event Listener: Handle "Connect Wallet" button click
  const connectWalletBtn = document.getElementById('connect-wallet');
  connectWalletBtn.addEventListener('click', async () => {
    const account = await connectWallet(); // Trigger wallet connection
    updateNavbar(account); // Update the section after connection

   
  });
  const dashButton=document.getElementById('dashboard-btn');
  dashButton.addEventListener('click',() =>{
    window.location.href="dashboard.html";
  })
});
// Function: Updates the navbar based on wallet connection state
function updateNavbar(account) {
  const connectWalletButton = document.getElementById('connect-wallet');
  const dashboardButton = document.getElementById('dashboard-btn');

  if (account) {
    // Wallet is connected: Hide 'Connect Wallet', show 'Dashboard'
    connectWalletButton.style.display = 'none';
    dashboardButton.style.display = 'inline-block'; // Ensures it takes space
  } else {
    // Wallet is not connected: Show 'Connect Wallet', hide 'Dashboard'
    connectWalletButton.style.display = 'inline-block';
    dashboardButton.style.display = 'none';
  }
}



document.addEventListener('DOMContentLoaded', async () => {
  // Check wallet connection status when the page loads
  const connectedAccount = await checkWalletConnection();
  updateHomeSection(connectedAccount); // Update the home section based on connection status

  // Event Listener: "Get Started" button click (Logged-out view)
  const getStartedButton = document.getElementById('get-started-btn');
  getStartedButton.addEventListener('click', async () => {
    const account = await connectWallet(); // Trigger wallet connection
    updateHomeSection(account); // Update the section after connection
  });

  // Event Listener: "Explore Campaigns" button click (Logged-in view)
  const exploreCampaignsButton = document.getElementById('explore-campaigns-btn');
  exploreCampaignsButton.addEventListener('click', () => {
    window.location.href = '#campaigns'; // Navigate to the campaigns section
  });
});
function updateHomeSection(account) {
  const loggedOutSection = document.getElementById('home-logged-out');
  const loggedInSection = document.getElementById('home-logged-in');

  if (account) {
    // If wallet is connected, show logged-in view and hide logged-out view
    loggedOutSection.style.display = 'none';
    loggedInSection.style.display = 'block';
  } else {
    // If wallet is not connected, show logged-out view and hide logged-in view
    loggedOutSection.style.display = 'block';
    loggedInSection.style.display = 'none';
  }
}


//smooth scroll to page
document.querySelectorAll('.navbar-links a').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});


// Get the button
const goToTopBtn = document.getElementById("goToTopBtn");
// When the user scrolls down 100px from the top of the document, show the button
window.onscroll = function() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    goToTopBtn.style.display = "block";
  } else {
    goToTopBtn.style.display = "none";
  }
};
// When the user clicks the button, scroll to the top of the document
goToTopBtn.addEventListener("click", function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// Get the form element
const contactForm = document.getElementById("contact");
// Add an event listener to handle form submission
contactForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission (which reloads the page)
  
  // You can add your form handling logic here (e.g., show a success message)
  alert("Message sent successfully!");
  contactForm.reset();
});



document.addEventListener("DOMContentLoaded", () => {
  const campaignsContainer = document.getElementById("campaigns-container");

  // Fetch campaigns from localStorage
  const campaigns = JSON.parse(localStorage.getItem("campaigns")) || [];

  // Loop through campaigns and display them
  campaigns.forEach((campaign, index) => {
      const campaignCard = document.createElement("div");
      campaignCard.classList.add("campaign-card");

      campaignCard.innerHTML = `
          <img src="${campaign.image}" alt="${campaign.name}" class="campaign-image">
          <h3 class="campaign-title">${campaign.name}</h3>
          <p class="campaign-description">${campaign.description}</p>
          <button class="donate-button" data-index="${index}">DONATE</button>
      `;

      campaignsContainer.appendChild(campaignCard);
  });

  // Add event listeners to "Donate" buttons
  document.querySelectorAll(".donate-button").forEach((button) => {
      button.addEventListener("click", (e) => {
          const campaignIndex = e.target.getAttribute("data-index");
          localStorage.setItem("currentCampaign", JSON.stringify(campaigns[campaignIndex]));
          window.location.href = "campaign.html"; // Redirect to campaign details page
      });
  });
});



const container = document.getElementById('campaigns-container');
const leftBtn = document.querySelector('.nav-btn.left');
const rightBtn = document.querySelector('.nav-btn.right');

// Scroll functionality for buttons
rightBtn.addEventListener('click', () => {
  container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
});

leftBtn.addEventListener('click', () => {
  container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
});



const registerButton = document.getElementById('register-campaignbtn');

registerButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent default link behavior

  // Check if the wallet is connected
  const walletAddress = await checkWalletConnection();

  if (walletAddress) {
    // Redirect to the registration page
    window.location.href = 'register-campaign.html';
  } else {
    // Show alert if wallet is not connected
    alert('Please connect your wallet to register a campaign.');
  }
});


