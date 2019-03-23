package com.example.pizza;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.content.Intent;

public class MainActivity extends AppCompatActivity {
    private static final String MAIN_ACTIVITY_TAG = "MainActivity";
    final int PIZZA_PRICE = 5;
    final int TOPPING_PRICE = 1;
    final int SAUCE_PRICE = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void submitOrder(View view) {
        // get user name
        EditText userInputNameView = (EditText) findViewById(R.id.user_name);
        String userInputName = userInputNameView.getText().toString();

        // check sauces selected
        CheckBox marinara = (CheckBox) findViewById(R.id.marinara_checked);
        boolean hasMarinara = marinara.isChecked();

        CheckBox bbq = (CheckBox) findViewById(R.id.bbq_checked);
        boolean hasBbq = bbq.isChecked();

        // check toppings
        CheckBox pepperoni = (CheckBox) findViewById(R.id.pepperoni_checked);
        boolean hasPepperoni = pepperoni.isChecked();

        CheckBox jalepeno = (CheckBox) findViewById(R.id.jalepeno_checked);
        boolean hasJalepeno = jalepeno.isChecked();

        CheckBox chicken = (CheckBox) findViewById(R.id.chicken_checked);
        boolean hasChicken = chicken.isChecked();

        CheckBox veggie = (CheckBox) findViewById(R.id.veggie_checked);
        boolean hasVeggie = veggie.isChecked();

        // calculate and store the total price
        float totalPrice = calculatePrice(hasMarinara, hasBbq, hasPepperoni, hasJalepeno, hasChicken, hasVeggie);

        // create and store the order summary
        String orderSummaryMessage = createOrderSummary(userInputName, hasMarinara, hasBbq, hasPepperoni, hasJalepeno, hasChicken, hasVeggie, totalPrice);

        Intent i = new Intent(this, Confirm.class);
        i.putExtra("summary", orderSummaryMessage);
        i.putExtra("email", userInputName);
        startActivity(i);
    }

    /**
     * Method to calculate the total price
     *
     * @return total Price
     */
    private float calculatePrice(boolean sauceOne, boolean sauceTwo, boolean toppingOne, boolean toppingTwo, boolean toppingThree, boolean toppingFour) {
        int basePrice = PIZZA_PRICE;
        if (sauceOne) {
            basePrice += SAUCE_PRICE;
        }
        if (sauceTwo) {
            basePrice += SAUCE_PRICE;
        }
        if (toppingOne) {
            basePrice += TOPPING_PRICE;
        }
        if (toppingTwo) {
            basePrice += TOPPING_PRICE;
        }
        if (toppingThree) {
            basePrice += TOPPING_PRICE;
        }
        if (toppingFour) {
            basePrice += TOPPING_PRICE;
        }
        return basePrice;
    }

    private String boolToString(boolean bool) {
        return bool ? (getString(R.string.yes)) : (getString(R.string.no));
    }

    private String createOrderSummary(String userName, boolean hasMarinara, boolean hasBbq, boolean hasPepperoni, boolean hasJalepeno, boolean hasChicken, boolean hasVeggie, float price) {
        String orderSummaryMessage =
                "Email: " + userName + "\n" +
                "Add Marinara? " + boolToString(hasMarinara) + "\n" +
                "Add BBQ? " + boolToString(hasBbq) + "\n" +
                "Add Pepperoni? " + boolToString(hasPepperoni) + "\n" +
                "Add Jalepeno? "  + boolToString(hasJalepeno) + "\n" +
                "Add Chicken? " + boolToString(hasChicken) + "\n" +
                "Add Veggie? " + boolToString(hasVeggie) + "\n" +
                "Total: $" +  price + "\n\n\n" +
                "Thank you for your order!";
        return orderSummaryMessage;
    }

}
