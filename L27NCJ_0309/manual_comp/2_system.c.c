#include <stdio.h>
#include <stdlib.h>

#include <sys/types.h>
#include <sys/wait.h>

int main()
{    
    char* command;

    while(true){
        printf("Adj meg egy parancsot");
        scanf("%s", command);
        system(command);
    }
    exit(0);
}

