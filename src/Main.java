import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class Main {
    public static void main(String[] args){
        Zad1 zad1 = new Zad1();
        Zad2 zad2 = new Zad2();
        Zad3 zad3 = new Zad3();
        Zad4 zad4 = new Zad4();
        Zad5 zad5 = new Zad5();
        Zad6 zad6 = new Zad6();
        Zad7 zad7 = new Zad7();
        Zad8 zad8 = new Zad8();
        Zad1_D zad1_d = new Zad1_D();

//        zad1.printFile();
//        zad2.writeFile();

//        int[] array = { 4, 5, 7, 11, 12, 15, 15, 21, 40, 45 };
//        int index = zad3.searchIndex(array, 40);
//        System.out.println("Wynik wyszukiwania: "+index);

//        System.out.println(zad4.crc32("Testowy test"));

//        zad5.printLocalTime();
//        zad5.printGlobalTime();

//        zad6.printFileWithLineNumbers();

//        User userObject = new User("John", 22);
//        String json = zad7.convertUserToJSON(userObject);
//        System.out.println(json);

//        String userJson = "{\"name\":\"John\",\"age\":21}";
//        User user = zad8.convertJSONtoUser(userJson);
//        System.out.println(user.getAge());
//        System.out.println(user.getName());

        List<Integer> array = new ArrayList<Integer>();
        System.out.println("ArrayList:");
        for (int i = 1; i < 20; i++) {
            array.add(i);
        }
        zad1_d.removeOtherElementsFrom(array);
        for (int element : array) {
            System.out.println(element);
        }

        System.out.println("LinkedList:");
        List<Integer> list = new LinkedList<Integer>();
        for (int i = 0; i < 20; i++) {
            list.add(i);
        }
        zad1_d.removeOtherElementsFrom(list);
        for (int element : list) {
            System.out.println(element);
        }

//        int[] duplicateArray = {1,1,2,3,3,3,4,5,6,1,2,3,4,5,6,7,9};




    }
}