import { connectWallet, checkWalletConnection } from './web3.js';


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
  const connectedAccount = await checkWalletConnection();//connected wallet account le lo by web3.js k is function se check krke...
  updateNavbar(connectedAccount); // Update navbar based on wallet connection status
  
  const connectWalletBtn = document.getElementById('connect-wallet');
  connectWalletBtn.addEventListener('click', async () => {
    const account = await connectWallet();
    updateNavbar(account); // Update the section after connection

   
  });
  const dashButton=document.getElementById('dashboard-btn');
  dashButton.addEventListener('click',() =>{
    window.location.href="dashboard.html";
  })
});
//updates the navbar based on wallet connection state
function updateNavbar(account) {
  const connectWalletButton = document.getElementById('connect-wallet');
  const dashboardButton = document.getElementById('dashboard-btn');

  if (account) {
    // Wallet is connected: Hide 'Connect Wallet', show 'Dashboard'
    connectWalletButton.style.display = 'none';
    dashboardButton.style.display = 'inline-block'; 
  } else {
    // Wallet is not connected: Show 'Connect Wallet', hide 'Dashboard'
    connectWalletButton.style.display = 'inline-block';
    dashboardButton.style.display = 'none';
  }
}



document.addEventListener('DOMContentLoaded', async () => {
  const connectedAccount = await checkWalletConnection();
  updateHomeSection(connectedAccount); // Update the home section based on connection status

  const getStartedButton = document.getElementById('get-started-btn');
  getStartedButton.addEventListener('click', async () => {
    const account = await connectWallet(); 
    updateHomeSection(account); 
  });

  const exploreCampaignsButton = document.getElementById('explore-campaigns-btn');
  exploreCampaignsButton.addEventListener('click', () => {
    window.location.href = '#campaigns'; 
  });
});
function updateHomeSection(account) {
  const loggedOutSection = document.getElementById('home-logged-out');
  const loggedInSection = document.getElementById('home-logged-in');

  if (account) {
    loggedOutSection.style.display = 'none';
    loggedInSection.style.display = 'block';
  } else {
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
window.onscroll = function() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    goToTopBtn.style.display = "block";
  } else {
    goToTopBtn.style.display = "none";
  }
};
goToTopBtn.addEventListener("click", function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


const contactForm = document.getElementById("contact");
// Add an event listener to handle form submission
contactForm.addEventListener("submit", function(event) {
  event.preventDefault(); 
  
  alert("Message sent successfully!");
  contactForm.reset();
});



document.addEventListener("DOMContentLoaded", () => {
  const campaignsContainer = document.getElementById("campaigns-container");

  // Fetch campaigns from localStorage
  const campaigns = JSON.parse(localStorage.getItem("campaigns")) || [];

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

rightBtn.addEventListener('click', () => {
  container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
});

leftBtn.addEventListener('click', () => {
  container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
});



const registerButton = document.getElementById('register-campaignbtn');

registerButton.addEventListener('click', async (event) => {
  event.preventDefault(); 

  // Check if the wallet is connected
  const walletAddress = await checkWalletConnection();

  if (walletAddress) {
    // Redirect to the registration page
    window.location.href = 'register-campaign.html';
  } else {
    alert('Please connect your wallet to register a campaign.');
  }
});


