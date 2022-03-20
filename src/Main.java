import java.nio.charset.StandardCharsets;
import java.util.LinkedList;

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

//        int[] array = {1,2,3,4,5,6,7,8,9};
//        int[] resultArray = zad1_d.removeOtherElementsFrom(array);
//        for (int element : resultArray) {
//            System.out.println(element);
//        }

        LinkedList<Integer> list = new LinkedList<Integer>();
        for (int i = 0; i < 20; i++) {
            list.add(i);
        }
        LinkedList<Integer> resultList = zad1_d.removeOtherElementsFrom(list);
        for (int element : resultList) {
            System.out.println(element);
        }


    }
}