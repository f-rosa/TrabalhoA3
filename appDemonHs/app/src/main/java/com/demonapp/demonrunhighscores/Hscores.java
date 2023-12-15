package com.demonapp.demonrunhighscores;

public class Hscores {


    public int id;
    public String playerName;

    @Override
    public String toString() {
        return "#"+ position + " - " + playerName + " - " + score;
    }

    public int score;
    public int position;


}
