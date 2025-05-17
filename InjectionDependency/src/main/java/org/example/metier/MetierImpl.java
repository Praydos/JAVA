package com.jee.dynamic_instanciation.metier;

import com.jee.dynamic_instanciation.dao.IDao;

public class MetierImpl implements IMetier {
    //couplage faible depende de la interface et n'est pas l'impleentation
    private IDao dao;

    /*
    * ces constructeur et setter
    * pour passer limplimentation de linterface
    * */

    public MetierImpl(IDao dao) {
        this.dao = dao;
    }

    public MetierImpl(){}

    public void setDao(IDao dao) {
        this.dao = dao;
    }

    @Override
    public int calcul() {
        int data = dao.getData();
        return data * 10;
    }
}
