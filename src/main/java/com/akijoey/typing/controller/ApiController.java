package com.akijoey.typing.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import com.akijoey.typing.crawler.JsoupParse;

import java.util.ArrayList;
import java.util.HashMap;

@RestController
public class ApiController {
    @RequestMapping("/text")
    public ArrayList<HashMap<String, Object>> getText() {
        JsoupParse Parser = new JsoupParse();
        String[] paragraph = Parser.httpParse().split(" ");
        ArrayList<HashMap<String, Object>> response = new ArrayList<>();
        for (String word : paragraph) {
            response.add(new HashMap<>(){
                {
                    put("text", word);
                    if (word.equals(paragraph[0])) {
                        put("color", "#DA70D6");
                    }
                }
            });
        }
        return response;
    }
}
