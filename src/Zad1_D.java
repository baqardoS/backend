import javax.swing.text.html.HTMLDocument;
import java.util.Iterator;
import java.util.LinkedList;

public class Zad1_D {
    public int[] removeOtherElementsFrom(int[] array){
        int[] result = new int[(int) Math.ceil(array.length / 2.0)];

        for (int i = 0; i < array.length; i++)
            if(i % 2 == 0) result[(int)Math.floor(i/2)] = array[i];

        return result;
    }

    public LinkedList<Integer> removeOtherElementsFrom(LinkedList<Integer> list){
        LinkedList<Integer> result = new LinkedList(list);

        Iterator iterator = result.iterator();

        int counter = 1;
        while(iterator.hasNext()){
            iterator.next();
            if(counter % 2 == 0){
                iterator.remove();
            }

            counter++;
        }

        return result;
    }
}
