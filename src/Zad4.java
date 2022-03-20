import java.nio.charset.StandardCharsets;

public class Zad4 {
    public int[] CRC_TABLE = new int[256];

    public Zad4(){
        for (int i = 0; i < 256; ++i) {
            int code = i;
            for (int j = 0; j < 8; ++j) {
                code = (((code & 0x01) == 1) ? (0xEDB88320 ^ (code >>> 1)) : (code >>> 1));
            }

            CRC_TABLE[i] = code;
        }
    }

    public long crc32(String text) {
        int crc = -1;
        for (int i = 0; i < text.length(); ++i) {
            short code = (short) text.charAt(i);
            crc = CRC_TABLE[(code ^ crc) & 0xFF] ^ (crc >>> 8);
        }
        return Long.parseLong (Integer.toUnsignedString(-1 ^ crc));
    }


}
