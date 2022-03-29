package com.example.bootstrap2.controller;

import com.example.bootstrap2.apigetter.ApiExplorer;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class ChartController {

    @GetMapping("/")
    public String chart(Model model){
        return "index";
    }


    @GetMapping("getData.do")
    @ResponseBody
    public String getElectiondata(HttpServletResponse response, HttpServletRequest request) throws Exception {
        String page = request.getParameter("page");
        ApiExplorer apiExplorer = new ApiExplorer();
        response.addIntHeader("xmlcnt", apiExplorer.getFilecnt());

        return apiExplorer.getDataAPI(Integer.parseInt(page));
    }
}
