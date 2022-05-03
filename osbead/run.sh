gcc writer.c -o writer.out -pthread
gcc reader.c -o reader.out -pthread
./writer.out &  ./reader.out
