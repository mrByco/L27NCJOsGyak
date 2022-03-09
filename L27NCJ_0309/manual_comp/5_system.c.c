include <stdio.h>
#include <stdlib.h>

#include <unistd.h>
pid_t fork(void);

#include <sys/types.h>
#include <sys/wait.h>


pid_t wait(int *wstatis);
pid_t waitpid(pid_t pid, int* wstatus, int options);

int main()
{
    pid_t pid;
    int status;

    if ((pid = fork()) < 0) perror("fork hiba");
    else if (pid == 0)
        exit(7);
    if (wait(&status)!=pid) perror("wait hiba");
    if (WIFEXITED(status))
        printf("normal befejezodes, ertek: %d\n", WEXITSTATUS(status));

    if (pid = fork() < 0) perror("fork hiba");
        else if (pid == 0)
            abort();

    if (wait(&status) != pid) perror("wait hiba");
    if (WIFSIGNALED(status))
        printf("Abnormalis befejezodes, signal szama = %d\n", WTERMSIG(status));

}

