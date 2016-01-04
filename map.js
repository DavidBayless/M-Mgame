
$(document).ready(mapCreator);
var direction = 0;
function mapCreator(){
  var wallchance = 0;

  function mapSizeGenerator() {
    var size = Math.floor(Math.random() * 11 + 10);
    return size;
  }
  var mapSize = mapSizeGenerator();

  function generatedMap(size) {
    var mapArray = [];
    var pathingArray = [];
    for (var i = 0; i < size; i++) {
      var mapArrayRow = [];
      var pathingArrayRow = [];
      for (var j = 0; j < size; j++) {
        mapArrayRow.push(0);
        pathingArrayRow.push(1);
      }
      mapArray.push(mapArrayRow);
      pathingArray.push(pathingArrayRow);
    }

    for (var i = 0; i < mapArray.length; i++) {
      for (var j = 0; j < mapArray.length; j++) {
        if (mapArray[i - 1] === undefined || mapArray[i + 1] === undefined || mapArray[i][j - 1] === undefined || mapArray[i][j + 1] === undefined) {
          mapArray[i][j] = 1;
        } else if ((mapArray[i - 1][j] === 1 || mapArray[i][j-1] === 1 || mapArray[i][j+1] === 1) && (mapArray[i + 2] !== undefined)) {
          wallChance = wallProbability();
          if (wallChance > 1) {
            mapArray[i][j] = 1;
          }
        } else if (mapArray[i][j] === 0) {
          wallChance = wallProbability();
          if (wallChance > 3) {
            mapArray[i][j] = 1;
          }
        }
      }
    }

    for (var i = 0; i < mapArray.length; i++) {
      for (var j = 0; j < mapArray.length; j++) {
        if (mapArray[i + 1] !== undefined && mapArray[i - 1] !== undefined) {
          if (mapArray[i + 1][j] === 1 && mapArray[i - 1][j] && mapArray[i][j + 1] === 1 && mapArray[i][j - 1] === 1) {
            mapArray[i][j] = 1;
          }
          if ((mapArray[i + 1][j] === 1 && mapArray[i - 1][j] === 1 && mapArray[i][j - 1] === 1 && mapArray[i][j + 1] === 0) || (mapArray[i + 1][j] === 1 && mapArray[i - 1][j] === 1 && mapArray[i][j - 1] === 0 && mapArray[i][j + 1] === 1) || (mapArray[i + 1][j] === 1 && mapArray[i - 1][j] === 0 && mapArray[i][j - 1] === 1 && mapArray[i][j + 1] === 1) || (mapArray[i + 1][j] === 0 && mapArray[i - 1][j] === 1 && mapArray[i][j - 1] === 1 && mapArray[i][j + 1] === 1)) {
            mapArray[i][j] = 0;
          }
        }
      }
    }

    var looping = true;
    while (looping) {
      var counter = 0;
      for (var i = 0; i < mapArray.length; i++) {
        for (var j = 0; j < mapArray.length; j++) {
          if (mapArray[i][j] === 0) {

            if ((mapArray[i + 1][j] === 1 && mapArray[i - 1][j] === 1 && mapArray[i][j - 1] === 1 && mapArray[i][j + 1] === 0)) {
              if ((mapArray[i][j - 2] === 0 || mapArray[i + 1][j - 1] === 0 || mapArray[i - 1][j - 1] === 0) && mapArray[i][j - 2] !== undefined) {
                mapArray[i][j - 1] = 0;
                counter++;
              } else if (mapArray[i + 2] !== undefined && (mapArray[i + 2][j] === 0 || mapArray[i + 1][j + 1] === 0 || mapArray[i + 1][j - 1] === 0)) {
                mapArray[i + 1][j] = 0;
                counter++;
              } else if (mapArray[i - 2] !== undefined && (mapArray[i - 2][j] === 0 || mapArray[i - 1][j + 1] === 0 || mapArray[i - 1][j - 1] === 0)) {
                mapArray[i - 1][j] = 0;
                counter++;
              }

            } else if (mapArray[i + 1][j] === 1 && mapArray[i - 1][j] === 1 && mapArray[i][j - 1] === 0 && mapArray[i][j + 1] === 1) {
              if ((mapArray[i][j + 2] === 0 || mapArray[i + 1][j + 1] === 0 || mapArray[i - 1][j + 1] === 0) && mapArray[i][j + 2] !== undefined) {
                mapArray[i][j + 1] = 0;
                counter++;
              } else if (mapArray[i + 2] !== undefined && (mapArray[i + 2][j] === 0 || mapArray[i + 1][j + 1] === 0 || mapArray[i + 1][j - 1] === 0)) {
                mapArray[i + 1][j] = 0;
                counter++;
              } else if (mapArray[i - 2] !== undefined && (mapArray[i - 2][j] === 0 || mapArray[i - 1][j + 1] === 0 || mapArray[i - 1][j - 1] === 0)) {
                mapArray[i - 1][j] = 0;
                counter++;
              }

            } else if (mapArray[i + 1][j] === 1 && mapArray[i - 1][j] === 0 && mapArray[i][j - 1] === 1 && mapArray[i][j + 1] === 1) {
              if ((mapArray[i][j + 2] === 0 || mapArray[i + 1][j + 1] === 0 || mapArray[i - 1][j + 1] === 0) && mapArray[i][j + 2] !== undefined) {
                mapArray[i][j + 1] = 0;
                counter++;
              } else if (mapArray[i + 2] !== undefined && (mapArray[i + 2][j] === 0 || mapArray[i + 1][j + 1] === 0 || mapArray[i + 1][j - 1] === 0)) {
                mapArray[i + 1][j] = 0;
                counter++;
              } else if (mapArray[i][j - 2] !== undefined && (mapArray[i][j - 2] === 0 || mapArray[i - 1][j - 1] === 0 || mapArray[i + 1][j - 1] === 0)) {
                mapArray[i][j - 1] = 0;
                counter++;
              }

            } else if (mapArray[i + 1][j] === 0 && mapArray[i - 1][j] === 1 && mapArray[i][j - 1] === 1 && mapArray[i][j + 1] === 1) {
              if ((mapArray[i][j + 2] === 0 || mapArray[i + 1][j + 1] === 0 || mapArray[i - 1][j + 1] === 0) && mapArray[i][j + 2] !== undefined) {
                mapArray[i][j + 1] = 0;
                counter++;
              } else if (mapArray[i - 2] !== undefined && (mapArray[i - 2][j] === 0 || mapArray[i - 1][j + 1] === 0 || mapArray[i - 1][j - 1] === 0)) {
                mapArray[i - 1][j] = 0;
                counter++;
              } else if (mapArray[i][j - 2] !== undefined && (mapArray[i][j - 2] === 0 || mapArray[i + 1][j - 1] === 0 || mapArray[i - 1][j - 1] === 0)) {
                mapArray[i][j - 1] = 0;
                counter++;
              }
            }
          }
        }
      }
      if (counter === 0) {
        looping = false;
      }

      var checkIndex = firstFloorSpace(mapArray);
      mapArray = checkPathing(checkIndex[0], checkIndex[1], mapArray, pathingArray);

      var playerPosition = playerSpace(mapArray);
    }
    mapArray[playerPosition[0]][playerPosition[1]] = 3;
    mapArray[checkIndex[0]][checkIndex[1]] = 2;

    mapArray = enemyPlacement(mapArray);
    return mapArray;
  }

  function enemyPlacement(mapArray) {
    for (var i = 0; i < mapArray.length; i++) {
      for (var j = 0; j < mapArray.length; j++) {
        if (mapArray[i][j] === 0) {
          var randEncounter = Math.floor(Math.random() * 10 + 1);
          if (randEncounter > 9) {
            mapArray[i][j] = 4;
          }
        }
      }
    }
    return mapArray;
  }

  function checkPathing(x,y, arrayOne, arrayTwo) {

    if (arrayOne[x][y] === 0 && arrayTwo[x][y] !== 0) {
      arrayTwo[x][y] = 0;

      if (x - 1 >= 0) {
        checkPathing(x - 1, y, arrayOne, arrayTwo);
      }
      if (x + 1 < arrayOne.length) {
        checkPathing(x + 1, y, arrayOne, arrayTwo);
      }
      if (y - 1 >= 0) {
        checkPathing(x, y - 1, arrayOne, arrayTwo);
      }
      if (y + 1 < arrayOne.length) {
        checkPathing(x, y + 1, arrayOne, arrayTwo);
      }
    }
    return arrayTwo;
  }

  function wallProbability() {
    var chance = Math.floor(Math.random() * 6 + 1);
    return chance;
  }

  function firstFloorSpace(mapArray) {
    for (var i = 0; i < mapArray.length; i++) {
      for (var j = 0; j < mapArray.length; j++) {
        if (mapArray[i][j] === 0) {
          var startingPosition = [i, j];
          return startingPosition;
        }
      }
    }
  }

  function playerSpace(mapArray) {
    for (var i = mapArray.length -1; i >= 0; i--) {
      for (var j = mapArray.length -1; j >= 0; j--) {
        if (mapArray[i][j] === 0) {
          var playerPosition = [i, j];
          return playerPosition;
        }
      }
    }
  }

  var toDomMap = generatedMap(mapSize);
  var moveOption = [-mapSize, 1, mapSize, -1];
  var $container = $('.wrapper');
  var $window = $('html');
  var $viewWrapper = $('.viewWrapper');

  mapToDom(toDomMap, $container);

  function mapToDom(toDomMap, $container) {
    for (var i = 0; i < toDomMap.length; i++) {
      var $div = $container.append('<div class = "row"></div>');
      for (var j = 0; j < toDomMap.length; j++) {
        if (toDomMap[i][j] === 1) {
          var thisSpace = $div.append('<div class="col wall"></div>');
        } else if(toDomMap[i][j] === 0) {
          $div.append('<div class="col empty"></div>');
        } else if (toDomMap[i][j] === 2) {
          $div.append('<div class ="col stairs"></div>');
        } else if (toDomMap[i][j] === 3) {
          $div.append('<div class ="col empty" id = "player"><img src="blackTriangle.png"></div>');
        } else if (toDomMap[i][j] === 4) {
          $div.append('<div class ="col enemy"></div>');
        }
      }
    }
  }
  var $mapMatrix = $('.wrapper .col');
  var playerPlace = mapMatrixPlayerPosition($mapMatrix);
  viewScreen(direction, playerPlace);


  function mapMatrixPlayerPosition(mapMatrix) {
    for (var i = mapMatrix.length - 1; i >= 0; i--) {
      if (mapMatrix[i].id === 'player'){
        return i;
      }
    }
  }

  $window.keypress(movePlayer);
  function movePlayer() {

    if (event.which === 119 && $mapMatrix[playerPlace + moveOption[direction]].className !== 'col wall') {
      playerPlace = move($mapMatrix, playerPlace, mapSize, moveOption[direction]);
    } else if (event.which === 97) {
      direction = faceDirection(event.which, $mapMatrix, playerPlace, direction);
    } else if (event.which === 100) {
      direction = faceDirection(event.which, $mapMatrix, playerPlace, direction);
    }
  }

  function resetMap(){
    $container.html('');
    $window.off('keypress', movePlayer);
    direction = 0;
    mapCreator();
  }

  function move(mapMatrix, playerPlace, mapSize, moveDirection) {
    mapMatrix[playerPlace].id = '';
    mapMatrix[playerPlace].innerHTML = "";
    playerPlace = playerPlace + moveDirection;
    if (mapMatrix[playerPlace].className === 'col stairs') {
      resetMap();
      return playerPlace;
    }
    if (moveDirection === -mapSize) {
      mapMatrix[playerPlace].id = 'playerN';
      mapMatrix[playerPlace].innerHTML = "<img src='blackTriangle.png'>";
      viewScreen(direction, playerPlace);
      return playerPlace;
    } else if (moveDirection === -1) {
      mapMatrix[playerPlace].id = 'playerW';
      mapMatrix[playerPlace].innerHTML = "<img src='blackTriangle.png'>";
      viewScreen(direction, playerPlace);
      return playerPlace;
    } else if (moveDirection === 1) {
      mapMatrix[playerPlace].id = 'playerE';
      mapMatrix[playerPlace].innerHTML = "<img src='blackTriangle.png'>";
      viewScreen(direction, playerPlace);
      return playerPlace;
    } else if (moveDirection === mapSize) {
      mapMatrix[playerPlace].id = 'playerS';
      mapMatrix[playerPlace].innerHTML = "<img src='blackTriangle.png'>";
      viewScreen(direction, playerPlace);
      return playerPlace;
    }
  }

  function faceDirection(eventKey, mapMatrix, playerPlace, direction) {
    if (eventKey === 97) {
      if (direction === 0) {
        direction = moveOption.length - 1;
      } else {
        direction -= 1;
      }
    } else if (eventKey === 100) {
      if (direction === moveOption.length - 1) {
        direction = 0;
      } else {
        direction += 1;
      }
    }

    if (moveOption[direction] === -mapSize) {
      mapMatrix[playerPlace].id = '';
      mapMatrix[playerPlace].id = 'playerN';
      viewScreen(direction, playerPlace);
    } else if (moveOption[direction] === -1) {
      mapMatrix[playerPlace].id = '';
      mapMatrix[playerPlace].id = 'playerW';
      viewScreen(direction, playerPlace);
    } else if (moveOption[direction] === 1) {
      mapMatrix[playerPlace].id = '';
      mapMatrix[playerPlace].id = 'playerE';
      viewScreen(direction, playerPlace);
    } else if (moveOption[direction] === mapSize) {
      mapMatrix[playerPlace].id = '';
      mapMatrix[playerPlace].id = 'playerS';
      viewScreen(direction, playerPlace);
    }
    return direction;
  }

  function viewScreen(direction, playerPlace){
    if ($mapMatrix[playerPlace + moveOption[direction]].className === 'col empty') {
      $viewWrapper[0].className = 'col-xs-7 viewWrapper faceEmpty';
    } else if ($mapMatrix[playerPlace + moveOption[direction]].className === 'col wall') {
      $viewWrapper[0].className = 'col-xs-7 viewWrapper faceWall';
    } else if ($mapMatrix[playerPlace + moveOption[direction]].className === 'col enemy') {
      $viewWrapper[0].className = 'col-xs-7 viewWrapper faceEmpty';
    } else if ($mapMatrix[playerPlace + moveOption[direction]].className === 'col stairs') {
      $viewWrapper[0].className = 'col-xs-7 viewWrapper faceStairs';
    }
  }
}
