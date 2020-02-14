package com.akijoey.typing.controller;

import com.akijoey.typing.crawler.JsoupParse;
import com.akijoey.typing.crawler.JacksonParse;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.HashMap;

@RestController
public class ApiController {
    @RequestMapping("/text")
    public ArrayList<HashMap<String, Object>> getText() {
        JsoupParse jsoupParser = new JsoupParse();
        String[] paragraph = jsoupParser.htmlParse();
        JacksonParse jacksonParser = new JacksonParse();
        String[] translations = jacksonParser.jsonParse(paragraph);
        ArrayList<HashMap<String, Object>> response = new ArrayList<>();
        for (int i = 0;i < paragraph.length;i++) {
            HashMap<String, Object> data = new HashMap<>();
            data.put("text", paragraph[i]);
            if (i == 0) {
                data.put("color", "#DA70D6");
            } else {
                data.put("color", "");
            }
            data.put("translation", translations[i]);
            data.put("visible", false);
            response.add(data);
        }
        return response;
    }
}
