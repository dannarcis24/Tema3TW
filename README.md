# CERINTA:
Aplicatie web, care permite procesarea si vizualizarea unor imagini preluate de la un API.                      
>API utilizat: API Dog CEO (https://dog.ceo/api/breeds/image/random                                            
>Toate interactiunile cu site ul, in sesiunea respectiva, sunt afisate cronologic
                              
# FUNCTIONALITATE:
La incarcarea paginii, aplicatia face un apel catre API pentru a prelua o imagine cu un caine, care urmeaza a fi procesata, 
astfel, aceasta este afisata de 2ori cu canvas:                       
1. Imaginea initiala                             
2. Imaginea modificata                             

Utilizatorului i se permite sa faca urmatoarele procesari asupra imaginii, respectiv o optiune (obligatoriu) si o tema de procesare. 
O tema de procesare nu poate fi efectuata fara a efectua o optiune, in cazul, in care se incearca, se va afisa un mesaj de eroare.
>Optiuni handleMenu(): Oglindire pe verticala si Prelucrare doar pe partea stanga                                                                
>Teme de procesare handleProcessing(): Imagine alb-negru si Normalizarea culorilor

Procesarea unei imagini este facuta astfel: imaginea este imapartita in 4parti egale si se aplica functia pe rand, dupa executarea unei 
fasii, aceasta este vizibila in imaginea a 2a si se afiseaza un mesaj corespunzator cu durata in consola.
