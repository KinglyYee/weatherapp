int main(void)
{
        char *line = NULL, *buf = NULL;
        size_t len = 0;
        size_t bufpos = 0, buflen = 0;
        ssize_t bytes = 0;
        char *p;
        char **command = NULL;
        size_t count = 0;
        int k;

        while((bytes = getline(&line, &len, stdin)) != -1)  {
                fprintf(stderr, "buf:%p, bufpos:%lu, buflen: %lu\n", buf, bufpos, buflen);
                buflen += bytes;
                buf = realloc(buf, buflen);
                strncpy(buf+bufpos, line, bytes);
                (buf+bufpos+bytes-1) = ' '; / change \n at the end to a space */
                bufpos = buflen;
        }

        free(line);

        if(buflen == 0) {
                exit(EXIT_FAILURE);
        }

        if(buf[buflen-1] == ' ')
                buf[buflen-1] = 0;

        command = malloc(sizeof(char )); / at least one command is there /

        / mark all the commands */
        command[0] = buf;
        count = 1;
        for(p = buf; p != 0; p++) {
                int delimit = 0;

                / eatup consecutive whitespaces /
                while(isspace(p)) {
                        delimit = 1;
                        p = 0;
                        p++;
                        if(!p || !isspace(p))
                                break;
                }

                if(delimit) {
                        command = realloc(command, (1+count)sizeof(char *));
                        command[count] = p;

                        count++;
                }
        }

        for (k = 0; k < count; k++) {
                fprintf(stdout, "%d : %s\n", k, command[k]);
        }

        free(command);
        free(buf);
        return 0;
}
int main(void){
    size_t bytes_read;
    size_t size = 10;

    char *string;

    printf("Enter vectors");
    string = (char *) malloc (size);
    bytes_read = getline(&string, &size, stdin);

    int arraysize = 0;

    if (bytes_read == -1){
        puts("error!");
    } else {
        puts("You entered the following string ");
        puts(string);
        printf ("/nCurrent size for string block: %d", bytes_read);
    }
    return 0;
}
