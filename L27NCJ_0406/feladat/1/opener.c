#include <stdio.h>
#include <stdlib.h>

int main(void){
	int  fd, ret;
	char [32];

	int visszateres = open("L27NCJ.txt", O_RDWR);
	
	if (visszateres == -1){
		perror("error on file read");
	}

}
