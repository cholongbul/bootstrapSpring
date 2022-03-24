package com.example.bootstrap2.jsonapigetter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class ApiExplorer {

    public static String getAirportAPI() throws IOException {
        String urlString = "http://apis.data.go.kr/1360000/AirInfoService/getAirInfo?serviceKey=WBaXX3pce9C9AKfYTQc5%2FXVYPXYJWfHVzWNaird%2Fv0f8C0zKhPFhjY10Tuf2QuiA83hfkGLzHknlOz5FWPbaDQ%3D%3D&numOfRows=10&pageNo=%ED%8E%98%EC%9D%B4%EC%A7%80%20%EB%B2%88%ED%98%B8&dataType=JSON&fctm=202203240000&icaoCode=RKSS";

        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();

        return sb.toString();
    }

    public static String getElectionAPI() throws IOException {
        String urlString = "http://apis.data.go.kr/9760000/ElcntInfoInqireService/getCtpvElcntInfoInqire?serviceKey=WBaXX3pce9C9AKfYTQc5%2FXVYPXYJWfHVzWNaird%2Fv0f8C0zKhPFhjY10Tuf2QuiA83hfkGLzHknlOz5FWPbaDQ%3D%3D&pageNo=1&numOfRows=6&resultType=json&sgId=20220309";

        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();

        return sb.toString();
    }
}
