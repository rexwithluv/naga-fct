package gal.iesteis.backend.concello;

public class ConcelloNotFoundException extends RuntimeException{
    public ConcelloNotFoundException(Integer id){
        super("No se ha encontrado el concello con el id " + id);
    }
}
