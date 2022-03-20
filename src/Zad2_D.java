import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class Zad2_D {
    public Set<Integer> removeDuplicates(Integer[] array){
        Set<Integer> result = new HashSet<>(Arrays.asList(array));
        return result;
    }
}
