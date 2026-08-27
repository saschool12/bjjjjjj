// Add to Bet Slip
function addToSlip(match, odds) {
  const slipList = document.getElementById("slipList");
  const li = document.createElement("li");
  li.textContent = match + " | Odds: " + odds;
  slipList.appendChild(li);
}

// Handle Place Bet
document.addEventListener("DOMContentLoaded", () => {
  const placeBetBtn = document.getElementById("placeBetBtn");
  if (placeBetBtn) {
    placeBetBtn.addEventListener("click", function() {
      alert("✅ Bet placed successfully!");
      document.getElementById("slipList").innerHTML = ""; // clear slip
    });
  }
});
