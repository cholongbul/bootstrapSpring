package com.example.bootstrap2.apigetter;

import org.w3c.dom.Document;

import java.io.File;
import java.io.IOException;

public class ApiExplorer {
    final static String XMLPATH = "C:\\Users\\ejatk\\IdeaProjects\\bootstrap2\\src\\\\main\\resources\\static\\data\\";

    public int getFilecnt(){
        File dir = new File(XMLPATH);
        int filecnt = dir.listFiles().length;
        return filecnt;
    }

    public String getDataAPI(int page) throws IOException {
        int filecnt = this.getFilecnt();


        File dir = new File(XMLPATH);
        File[] files = dir.listFiles();
        Document xmldom = XmlChanger.convertXMLFileToXMLDocument(XMLPATH + files[page].getName());
        String xmlstring = XmlChanger.convertXmlDocumentToString(xmldom);

        System.out.println(page);
        System.out.println(filecnt);
        return xmlstring;

    }
}
