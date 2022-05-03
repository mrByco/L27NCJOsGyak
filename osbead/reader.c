#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/sem.h>
#include <stdio.h>
#include <stdlib.h>

#define KEY 454321L
#define PERM 00666

int main() {

	struct sembuf up[1]  =  {0,  1, SEM_UNDO};
	struct sembuf down[1] = {0, -1, SEM_UNDO};

	puts("Reader: start\n");
	sleep(1);
        int 	id; 		/* A szemafor azonosítója */

	if ((id = semget(KEY, 1, 0)) < 0) { 
		perror("Reader: Semaphore does not exist, waiting for creation.\n");
		//exit(0);
	}

	puts("Reader: waiting for sem lock\n");
	semop(id, down, 1);
	puts("Reader: sem unlocked, reading file\n");

	FILE *file = fopen("shared_file", "r");

	char txt[512];
	fgets(txt, 512, file);
        printf("File tartalma: %s\nReader: Torles...\n\n", txt);

	remove("shared_file");

	if (semctl(id, 0, IPC_RMID, 0) < 0) {
		perror("Reader: Nem sikerült törölni.");
		exit(-1);
	}

	puts("Reader: A szemafort megszüntettük. \n");

	exit(0);
}
