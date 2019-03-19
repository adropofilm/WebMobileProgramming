package com.example.loginapp;

import android.widget.Toast;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.os.Bundle;
import android.content.Intent;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void login(View a) {
        TextView username = (TextView) findViewById(R.id.username_text);
        String user_string = username.getText().toString();
        TextView password = (TextView) findViewById(R.id.password_text);
        String password_string = password.getText().toString();

        if (user_string != "admin" && password_string !="admin") {
            Toast.makeText(getApplicationContext(), "Invalid Username/Password", Toast.LENGTH_SHORT).show();
        } else {
            Intent redirect = new Intent(MainActivity.this, Login.class);
            startActivity(redirect);
        }
    }

}
