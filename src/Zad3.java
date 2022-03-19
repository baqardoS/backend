public class Zad3 {
    public int searchIndex(int[] array, int value){
        int index = 0;
        int limit = array.length - 1;

        while(index <= limit){
            int point = (int) Math.ceil((index+limit) / 2);
            int entry  = array[point];
            if(value > entry){
                index = point + 1;
                continue;
            }
            if(value < entry){
                limit = point - 1;
                continue;
            }
            return point;
        }
        return -1;
    }
}
