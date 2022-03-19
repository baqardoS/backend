import java.io.*;
import java.nio.charset.StandardCharsets;

public class Zad1 {
    public void printFile() {
        String path = "./Zad1.txt";
        StringBuilder builder = new StringBuilder();

        try(FileInputStream stream = new FileInputStream(path);
            Reader reader = new InputStreamReader(stream, StandardCharsets.UTF_8)){

            char[] buffer = new char[1024];
            while(true){
                int count = reader.read(buffer, 0, buffer.length);
                if(count == -1) break;

                builder.append(buffer, 0, count);
            }
        }catch(IOException e){
            e.printStackTrace();
        }

        System.out.println(builder.toString());
    }
}
