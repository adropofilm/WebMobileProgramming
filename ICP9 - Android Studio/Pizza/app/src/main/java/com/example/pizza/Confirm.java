package com.example.pizza;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.content.Intent;
import android.widget.TextView;
import android.view.Gravity;

public class Confirm extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_confirm);

        Intent intent = getIntent();
        String summary = intent.getExtras().getString("summary");
        String email = intent.getExtras().getString("email");

        TextView textView = new TextView(this);
        textView.setTextSize(15);
        textView.setText(summary);
        textView.setGravity(Gravity.CENTER);
        // Set the text view as the activity layout
        setContentView(textView);



        // Write the relevant code for making the buttons work(i.e implement the implicit and explicit intents
        sendEmail(email, summary);
    }

    public void sendEmail(String name, String output) {
        // Write the relevant code for triggering email

        // Hint to accomplish the task
        Intent email = new Intent(Intent.ACTION_SEND_MULTIPLE);
        email.setType("text/plain");
        email.putExtra(Intent.EXTRA_EMAIL, new String[]{name});
        email.putExtra(Intent.EXTRA_SUBJECT, "Thank you for ordering!");
        email.putExtra(Intent.EXTRA_TEXT,"Sent From PizzaOrder\n\n" + output);
        startActivity(email);
    }

}
