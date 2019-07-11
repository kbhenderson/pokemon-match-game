const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
  if(lockBoard) return;
  if(this === firstCard) return;

  this.classList.add('flip');
  //first click

  if(!hasFlippedCard){
  hasFlippedCard = true;
  firstCard = this;

  return;
}

  secondCard = this;

  //do they match?
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.info === secondCard.dataset.info;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);

  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards(){
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

  resetBoard();
  }, 1500);
}

function resetBoard(){
  [hasFlippedCard, lockBoard]=[false, false];
  [firstCard, secondCard] = [null, null];

}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})(); //immediately invoked because of peranthesis two of them around and second.

cards.forEach(card=> card.addEventListener('click', flipCard));
