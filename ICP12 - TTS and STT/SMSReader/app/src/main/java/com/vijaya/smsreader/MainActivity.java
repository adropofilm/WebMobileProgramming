package com.vijaya.smsreader;
import android.content.ActivityNotFoundException;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.net.Uri;
import android.provider.ContactsContract;
import android.speech.RecognizerIntent;
import android.speech.tts.TextToSpeech;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.ToggleButton;
import android.widget.CompoundButton;
import android.widget.RadioGroup;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
public class MainActivity extends AppCompatActivity {
    private final int CHECK_CODE = 0x1;
    private final int LONG_DURATION = 5000;
    private final int SHORT_DURATION = 1200;
    private static final int REQ_CODE_SPEECH_INPUT = 100;
    private TextView mVoiceInputTv;
    private ImageButton mSpeakBtn;
    public String personName = "nothing";
    private Speaker speaker;
    private ToggleButton toggle;
    private CompoundButton.OnCheckedChangeListener toggleListener;
    private TextView smsText;
    private TextView smsSender;
    private BroadcastReceiver smsReceiver;
    private void checkTTS() {
        Intent check = new Intent();
        check.setAction(TextToSpeech.Engine.ACTION_CHECK_TTS_DATA);
        startActivityForResult(check, CHECK_CODE);
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == CHECK_CODE) {
            if (resultCode == TextToSpeech.Engine.CHECK_VOICE_DATA_PASS) {
                speaker = new Speaker(this);
            } else {
                Intent install = new Intent();
                install.setAction(TextToSpeech.Engine.ACTION_INSTALL_TTS_DATA);
                startActivity(install);
            }
        }
        if (requestCode == REQ_CODE_SPEECH_INPUT){
            if (resultCode == RESULT_OK ) {
                ArrayList<String> result = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                String txt = result.get(0);
                mVoiceInputTv.setText(txt);
                if (txt.contains("hello") || txt.contains("Hello")){
                    if(personName == "nothing"){
                        speaker.speak("Hello. What is your name?");
                    }
                    else{
                        speaker.speak("Hello " +personName);
                    }
                }
                else if (txt.contains("dying") || txt.contains("die")){
                    speaker.speak("If you need a free ride to the morgue call 9 1 1");
                }
                else if((txt.contains("name is")||(txt.contains("Name is")))){
                    String[] parts = txt.split(" ");
                    personName = parts[parts.length - 1];
                    speaker.speak("Hello "+ personName + ", nice to meet you");
                }
                else if (txt.contains("medicine")||txt.contains("Medicine")){
                    speaker.speak("I think you have a fever. Take these medicines");
                }
                else if (txt.contains("my name")){
                    speaker.speak("Your name is "+ personName);
                }
            }
        }
    }
    private void initializeSMSReceiver() {
        smsReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                Bundle bundle = intent.getExtras();
                if (bundle != null) {
                    Object[] pdus = (Object[]) bundle.get("pdus");
                    for (int i = 0; i < pdus.length; i++) {
                        byte[] pdu = (byte[]) pdus[i];
                        SmsMessage message = SmsMessage.createFromPdu(pdu);
                        String text = message.getDisplayMessageBody();
                        String sender = getContactName(message.getOriginatingAddress());
                        speaker.pause(LONG_DURATION);
                        speaker.speak("You have a new message from" + sender + "!");
                        speaker.pause(SHORT_DURATION);
                        speaker.speak(text);
                        smsSender.setText("Message from " + sender);
                        smsText.setText(text);
                    }
                }
            }
        };
    }
    private String getContactName(String phone) {
        Uri uri = Uri.withAppendedPath(ContactsContract.PhoneLookup.CONTENT_FILTER_URI, Uri.encode(phone));
        String projection[] = new String[]{ContactsContract.Data.DISPLAY_NAME};
        Cursor cursor = getContentResolver().query(uri, projection, null, null, null);
        if (cursor.moveToFirst()) {
            return cursor.getString(0);
        } else {
            return "unknown number";
        }
    }
    private void registerSMSReceiver() {
        IntentFilter intentFilter = new IntentFilter("android.provider.Telephony.SMS_RECEIVED");
        registerReceiver(smsReceiver, intentFilter);
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        TextToSpeech tts = new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int i) {
            }
        });
        tts.setLanguage(Locale.US);
        mVoiceInputTv = (TextView) findViewById(R.id.sms_text);
        mSpeakBtn = (ImageButton) findViewById(R.id.btnSpeak);
        mSpeakBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startVoiceInput();
            }
        });
        //toggle = (ToggleButton) findViewById(R.id.speechToggle);
        smsText = (TextView) findViewById(R.id.sms_text);
        smsSender = (TextView) findViewById(R.id.sms_sender);
        toggleListener = new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton view, boolean isChecked) {
                if (isChecked) {
                    speaker.allow(true);
                    speaker.speak(getString(R.string.start_speaking));
                } else {
                    speaker.speak(getString(R.string.stop_speaking));
                    speaker.allow(false);
                }
            }
        };
        //toggle.setOnCheckedChangeListener(toggleListener);
        checkTTS();
        initializeSMSReceiver();
        registerSMSReceiver();
        //speaker.speak("Hello and welcome. Press the mic button and tell me your name");
    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(smsReceiver);
        speaker.destroy();
    }
    private void startVoiceInput() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Hello, How can I help you?");
        try {
            startActivityForResult(intent, REQ_CODE_SPEECH_INPUT);
        } catch (ActivityNotFoundException a) {
        }
    }
}