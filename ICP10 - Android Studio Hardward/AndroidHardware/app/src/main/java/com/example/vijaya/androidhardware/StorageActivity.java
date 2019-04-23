package com.example.vijaya.androidhardware;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import android.util.Log;
import android.widget.Button;
import java.io.FileNotFoundException;

public class StorageActivity extends AppCompatActivity {
    EditText txt_content;
    EditText contenttoDisplay;
    String FILENAME = "MyAppStorage";
    Button save;
    Button displaySavedText;
    static final String errorControl = "error";
    String retrieveData;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_storage);
        txt_content = (EditText) findViewById(R.id.id_txt_mycontent);
        contenttoDisplay = (EditText) findViewById(R.id.id_txt_display);
        save = (Button) findViewById(R.id.id_btn_save);
        displaySavedText = (Button) findViewById(R.id.id_btn_display);
    }


    public void saveTofile(View v) throws IOException {

        // ICP Task4: Write the code to save the text
        save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String text=txt_content.getText().toString();
                FileOutputStream fileOutput=null;
                try{
                    fileOutput=openFileOutput(FILENAME, getApplicationContext().MODE_APPEND);
                    fileOutput.write( text.getBytes());
                    fileOutput.close();
                }catch(Exception e)
                {
                    Log.d(errorControl,"ERROR: File not saved");

                }
            }
        });

    }

    public void retrieveFromFile(View v) throws IOException {

        // ICP Task4: Write the code to display the above saved text
        displaySavedText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                FileInputStream fileInput = null;
                try {
                    fileInput = openFileInput(FILENAME);
                    InputStreamReader inputStreamReader = new InputStreamReader(fileInput);
                    BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
                    String receiveString = "";
                    StringBuilder stringBuilder = new StringBuilder();
                    while ((receiveString = bufferedReader.readLine())!= null){
                        stringBuilder.append(receiveString);
                    }
                    fileInput.close();
                    retrieveData = stringBuilder.toString();
                    contenttoDisplay.setText(retrieveData);
                    contenttoDisplay.setVisibility(View.VISIBLE);


                    contenttoDisplay.setText(txt_content.getText());
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
                catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }
}