package com.akijoey.typing.crawler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

import com.fasterxml.jackson.core.JsonProcessingException;

public class JacksonParse {
    public String[] jsonParse(String[] paragraph) {
        HttpClientGet httpClient = new HttpClientGet();
        String url = "http://dict.youdao.com/jsonapi?q=";
        ObjectMapper mapper = new ObjectMapper();
        String[] translations = new String[paragraph.length];
        for (int i = 0;i < paragraph.length;i++) {
            try {
                String json = httpClient.httpGet(url + paragraph[i].replaceAll("[^a-zA-Z-]", ""));
                JsonNode node = mapper.readTree(json);
                JsonNode word = node.findPath("ec").findPath("word");
                JsonNode tr = word.get(0).findPath("trs").get(0).findPath("tr");
                String translation = tr.get(0).findPath("l").findPath("i").toString();
                translations[i] = translation.substring(2, translation.length() - 2).split("；")[0];
            } catch (JsonProcessingException | NullPointerException e) {
                translations[i] = "Unable to translate";
                e.printStackTrace();
            }
        }
        return translations;
    }
}
