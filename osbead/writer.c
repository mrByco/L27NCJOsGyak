#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/sem.h>
#include <stdio.h>
#include <stdlib.h>

#define KEY 454321L
#define PERM 00666


struct sembuf up[1]  =  {0,  1, SEM_UNDO};
struct sembuf down[1] = {0, -1, SEM_UNDO};

int create_sem()
{
	int 	id; /* A szemafor azonosítója */
 
	if ((id = semget(KEY, 1, 0)) < 0) { /* Még nem létezik. */
		if ((id = semget(KEY, 1, PERM | IPC_CREAT)) < 0) {
		 	perror("Writer: A szemafor nem nyitható meg. ");
			exit(-1);
		}
	}
	else    {
		perror("Writer:  Már létezik a szemafor. ");
	}

	if (semctl(id, 0, SETVAL, 1) < 0) {
		perror("Writer:  Nem lehetett inicializálni. ");
	} else {
		puts("Writer:  Kész és inicializált a szemafor. ");
	}
	return id;
}

int main(int argc, char *argv[])
{
	int id; //sem id
	id = create_sem();
	semop(id, down, 1);

	puts("Writer: Start");
	FILE *out_file = fopen("shared_file", "w");

	if (out_file == NULL)
        {
              printf("Writer: Error! Could not open file\n");
              exit(-1);
        }

	fprintf(out_file, "Hello hello syiasytok");

	sleep(10);
	fclose(out_file);
	semop(id, up, 1);
	sleep(1);
	puts("Writer: done");

    return 0;
}
