import java.time.LocalTime;
import java.time.OffsetTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;

public class Zad5 {
    public void printLocalTime(){
        System.out.println("Local time: " + LocalTime.now().truncatedTo(ChronoUnit.SECONDS));
    }

    public void printGlobalTime(){
        System.out.println("Global time: " + OffsetTime.now(ZoneOffset.UTC).truncatedTo(ChronoUnit.SECONDS));
    }
}
