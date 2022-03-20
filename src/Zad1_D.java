import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class Zad1_D {
    public void removeOtherElementsFrom(List<Integer> list){
        Iterator iterator = list.iterator();

        int counter = 1;
        while(iterator.hasNext()){
            iterator.next();
            if(counter % 2 == 0){
                iterator.remove();
            }

            counter++;
        }
    }
}
