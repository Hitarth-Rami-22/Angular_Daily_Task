<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript Task</title>
</head>
<body>
  <h1>Open the Console to See the Output</h1>

  <script>
    // Task 1
    function getPositiveNumbers(arr) {
      return arr.filter(num => num > 0);
    }

    function getSquaredEvens(arr) {
      return arr.filter(num => num % 2 === 0).map(num => num * num);
    }

    console.log(getPositiveNumbers([-3, 5, 0, 9, -1])); // [5, 0, 9]
    console.log(getSquaredEvens([1, 2, 3, 4, 5]));      // [4, 16]

    // Task 2
    function getFee(isMember) {
      return isMember ? '$2.00' : '$10.00';
    }

    console.log(getFee(true));   // '$2.00'
    console.log(getFee(false));  // '$10.00'
  </script>
</body>
</html>
