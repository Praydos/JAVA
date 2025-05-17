package com.jee.dynamic_instanciation.presentation;

import com.jee.dynamic_instanciation.dao.IDao;
import com.jee.dynamic_instanciation.dao.IDaoImpl;
import com.jee.dynamic_instanciation.dao.IDaoImplV2;
import com.jee.dynamic_instanciation.metier.IMetier;
import com.jee.dynamic_instanciation.metier.MetierImpl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class Presentation {
    public static void main(String[] args) {
        // injection via constructeur
        MetierImpl metier = new MetierImpl(new IDaoImplV2());
        //metier.setDao(new IDaoImpl()); // injection via setter

        System.out.println(metier.calcul());


    }


}