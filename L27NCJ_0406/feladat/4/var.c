#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <signal.h>

void do_nothing();

int main(void){
	printf("PID = %d\n", getpid());
	signal(SIGTERM, do_nothing);
	printf("varok de meddig? \n");
	
	pause();
	printf("Vegre itt az ALARM");

}

void do_nothing(){
	printf("Do nothing");
}
