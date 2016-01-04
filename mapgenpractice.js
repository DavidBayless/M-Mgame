var playerDirectionArray = [-mapSize, -1, mapSize, 1];
var playerDirection = 0;

if (event.which === 97) {
  if (playerDirection === 0) {
    playerDirection = playerDirectionArray.length - 1;
  } else {
    playerDirection -= 1;
  }
}

function directionalArrow(facing) {
  if (facing === -mapSize) {
    $mapMatrix[playerPlace].innerText = '&#9650';
  } else if (facing === -1) {
    $mapMatrix[playerPlace].innerText = '&#9664';
  } else if (facing === mapSize) {
    $mapMatrix[playerPlace].innerText = '&#9660';
  } else if (facing === 1) {
    $mapMatrix[playerPlace].innerText = '&#9654';
  }
}
