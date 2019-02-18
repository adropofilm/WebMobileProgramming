angular.module('app_root', [])
    .controller('calculator_module', function($scope) {
        // Define necessary variables
        $scope.first_number=0;
        $scope.second_number=0;
        $scope.expression = "";
        $scope.results_display = "0";

        // This function updates expression string with data from button press
        $scope.update = function(button){
          $scope.expression += button;
        };

        // This function clears results display on top of calculator
        $scope.clear = function(results_display)
        {
          $scope.expression="";
          $scope.results_display=0;
        }

        // Define additional vars necessary for calculation
        $scope.division = "/";
        $scope.add = "+";
        $scope.subs = "-";
        $scope.multiplication = "*";
        $scope.operand = null;

        $scope.calculate = function (expression) {
            // Loop through expression and determine operand + position
            for (var i = 0; i<expression.length; i++)
            {
                if(["+", "-", "/", "*"].includes(expression[i]))
                {
                    $scope.operand = expression[i];
                    var operandPosition = i;
                }
            }

            // Parse first and second numbers to operate on from expression
            $scope.first_number = parseInt(expression.substring(0,operandPosition));
            $scope.second_number = parseInt(expression.substring(operandPosition+1,expression.length));

            // Operate and display results
            if($scope.operand=="*"){
                $scope.results_display = $scope.first_number*$scope.second_number;
            }
            else if($scope.operand=="/"){
                $scope.results_display = $scope.first_number/$scope.second_number;
            }
            else if($scope.operand=="+"){
                $scope.results_display = $scope.first_number+$scope.second_number;
            }
            else if($scope.operand=="-"){
                $scope.results_display = $scope.first_number-$scope.second_number;
            }
        };
    });
