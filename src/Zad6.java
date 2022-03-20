import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

public class Zad6 {
    public void printFileWithLineNumbers(){
        String path = "./Zad6.txt";
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


        String[] lines = builder.toString().split("\n");
        String[] linesWithNumbers = new String[lines.length];

        for (int i = 0; i < lines.length; i++) {
            linesWithNumbers[i] = (i+1)+". "+lines[i];
        }

        String text = String.join("\n", linesWithNumbers);

        System.out.println(text);
    }


}
