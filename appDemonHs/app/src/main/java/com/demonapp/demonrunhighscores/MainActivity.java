package com.demonapp.demonrunhighscores;


import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private ListView highScoreListView;
    RequestQueue requestQueue;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        highScoreListView = findViewById(R.id.highScoreListView);

       buscaDadosApi();
    }

    private void buscaDadosApi (){
        String url="http://192.168.1.3:3000/api/busca-pontuacao";
        requestQueue = Volley.newRequestQueue(MainActivity.this);
        StringRequest stringRequest=new StringRequest(Request.Method.GET,url,
                response -> {
            String jsonString = response.toString();

                    Gson gson = new Gson();

                    TypeToken<List<Hscores>> token = new TypeToken<List<Hscores>>() {};
                    List<Hscores> listHscores = gson.fromJson(jsonString, token.getType());

                    ArrayAdapter adapter = new ArrayAdapter(this, android.R.layout.simple_list_item_1, listHscores);
                    highScoreListView.setAdapter(adapter);
                },
               error -> Toast.makeText(MainActivity.this, "erro.", Toast.LENGTH_LONG).show() );

        requestQueue.add(stringRequest);
    }




        }


