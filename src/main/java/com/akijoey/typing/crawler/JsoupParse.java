package com.akijoey.typing.crawler;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.util.ArrayList;

public class JsoupParse {
    public String httpParse() {
        HttpClientGet httpClient = new HttpClientGet();
        String url = "http://www.globaltimes.cn/";
        String html = httpClient.httpGet(url);
        Document document = Jsoup.parse(html);
        Elements elements = document.select(".op-news-title");
        url = elements.get(0).attr("href");
        html = httpClient.httpGet(url);
        document = Jsoup.parse(html);
        elements = document.select(".row-content");
        String[] element = elements.get(0).html().split("\\n<br>\\n<br>");
        ArrayList<String> article = new ArrayList<>();
        for (String paragraph : element) {
            if (paragraph.indexOf('\n') == -1 && paragraph.indexOf('<') == -1) {
                int index = paragraph.indexOf("&nbsp;");
                if (index != -1) {
                    article.add(paragraph.substring(0, index));
                } else {
                    article.add(paragraph);
                }
            }
        }
        int random = (int)(Math.random() * article.size());
        return article.get(random);
    }
}
