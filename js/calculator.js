// js/calculator.js

function calculateTotal() {
  // 1. Get base package price
  const selectedPackage = document.querySelector('input[name="calc-package"]:checked');
  const basePrice = selectedPackage ? parseFloat(selectedPackage.value) : 150;
  
  // 2. Get number of games
  const gamesInput = document.getElementById('calc-games');
  let games = gamesInput ? parseInt(gamesInput.value, 10) : 1;
  if (isNaN(games) || games < 1) games = 1;

  // 3. Check if live streaming is selected
  const streamInput = document.getElementById('calc-stream');
  const isStreaming = streamInput ? streamInput.checked : false;
  const streamCost = isStreaming ? 35 : 0;

  // 4. Calculate total with $20 discount on additional games
  const perGameCost = basePrice + streamCost;
  let total = perGameCost;
  let savings = 0;

  if (games > 1) {
    const discountedGamePrice = perGameCost - 20;
    total += (games - 1) * discountedGamePrice;
    savings = (games - 1) * 20;
  }

  // 5. Update UI
  const priceDisplay = document.getElementById('calc-total-price');
  const savingsDisplay = document.getElementById('calc-savings');

  if (priceDisplay) priceDisplay.innerText = `$${total}`;
  if (savingsDisplay) {
    savingsDisplay.innerText = savings > 0 ? `Includes $${savings} Multi-Game Discount!` : '';
  }
}

// Ensure function is globally accessible
window.calculateTotal = calculateTotal;

// Attach listeners automatically once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  calculateTotal();

  // Attach change/input listeners to all calculator elements
  document.querySelectorAll('input[name="calc-package"]').forEach(radio => {
    radio.addEventListener('change', calculateTotal);
  });

  const gamesInput = document.getElementById('calc-games');
  if (gamesInput) {
    gamesInput.addEventListener('input', calculateTotal);
    gamesInput.addEventListener('change', calculateTotal);
  }

  const streamInput = document.getElementById('calc-stream');
  if (streamInput) {
    streamInput.addEventListener('change', calculateTotal);
  }
});