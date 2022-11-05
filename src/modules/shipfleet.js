import Ship from './Ship';

function shipfleet() {
  return [
    new Ship('Carrier', 5),
    new Ship('Battleship', 4),
    new Ship('Cruiser', 3),
    new Ship('Cruiser', 3),
    new Ship('Destroyer', 2),
  ];
}

export default shipfleet;
