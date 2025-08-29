export const lab0 =
  "# Lab 0: Git - rozproszony system kontroli wersji\n" +
  "\n" +
  "W tym ćwiczeniu zapoznamy się z systemem **Git**, jednym z najbardziej popularnych systemów do wersjonowania kodu źródłowego\n" +
  "oraz hostingiem do projektów **GitHub**. Git będzie nam towarzyszyć przez cały semestr (a także i pewnie poza zajęciami), dlatego warto poświęcić mu odpowiednio dużo uwagi.\n" +
  "\n" +
  "## Wstęp\n" +
  "\n" +
  "Git jest rozproszonym systemem wersjonowania pracy. Jego najważniejsze cechy to:\n" +
  "\n" +
  "* możliwość zapisywania stanu kodu źródłowego w określonym momencie\n" +
  "* możliwość przywracania starych wersji kodu źródłowego\n" +
  '* możliwość pracy w gałęziach ("branchach")\n' +
  "* brak centralnego repozytorium kodu (repozytorium rozproszone), co pozwala na lokalne wersjonowanie kodu bez wysyłania go na serwer\n" +
  "\n" +
  "## Zadania do wykonania (4xp)\n" +
  "\n" +
  "Do wykonania wszystkich ćwiczeń na tym laboratorium potrzebne będą **jedynie zainstalowany Git oraz terminal**. Jeśli nie jesteś fanem pracy z samą konsolą warto zaopatrzyć się też w aplikację z GUI do obsługi Git:\n" +
  "\n" +
  "- [GitKraken](https://www.gitkraken.com) - najbardziej zaawansowane narzędzie tego typu, wersja Pro jest darmowa dla studentów korzystających z [GitHub Student Developer Pack](https://education.github.com/pack) (bardzo polecam go sobie aktywować niezależnie od samego Gita!)\n" +
  "- [SourceTree](https://www.sourcetreeapp.com) - popularny darmowy klient z podstawowymi funkcjami i wizualizacją repozytorium.\n" +
  "\n" +
  "W trakcie semestru będziemy korzystać ze środowiska IntelliJ do tworzenia projektów w Javie. IntelliJ również umożliwia pracę z Gitem, można więc całkowicie zrezygnować z dodatkowych programów. Nie zalecamy jednak tego podejścia, szczególnie na początku przygody z Gitem, ponieważ IntelliJ opakowuje i ukrywa wiele operacji Gita i łatwo stracić nad tym kontrolę. Najlepszym wyborem na program towarzyszący nauce Gita wydaje się obecnie GitKraken. \n" +
  "\n" +
  "### Ćwiczenia Git\n" +
  "\n" +
  "1. Otwórz stronę https://gitexercises.fracz.com \n" +
  "2. Postępuj zgodnie z instrukcjami na stronie i zrealizuj **pierwsze 8 ćwiczeń z zestawu** (do *change-branch-history* włącznie).\n" +
  "\n" +
  "### Przygotowanie własnego repozytorium\n" +
  "\n" +
  "1. Zarejestruj się na GitHubie.\n" +
  "\n" +
  "2. Stwórz nowe repozytorium i nazwij je odpowiednio (schemat nazywania poniżej) - będziesz w nim przechowywać rozwiązania zadań z kolejnych laboratoriów.\n" +
  "\n" +
  "   * nazwa repozytorium to PO_2024_[dzień][godzina]_[nazwisko studenta] - np. PO_2024_PN1500_BRZECZYSZCZYKIEWICZ lub PO_2024_WT1820_PAPADOPOULOS. Dzień prosimy zapisać w formacie dwuliterowym bez polskich znaków (PN, WT, SR, CZ, PT),\n" +
  "   * repozytorium może być prywatne lub publiczne. Na potrzeby naszych zajęć repozytoria powinny być **prywatne**,\n" +
  "   * możesz na tym etapie zaznaczyć opcję *Add a README file* - zainicjujesz w ten sposób repozytorium plikiem, którego zawartość będzie domyślna na głównej stronie repozytorium.\n" +
  "\n" +
  "3. Nadaj uprawnienia dostępu do repozytorium prowadzącemu zajęcia (*Settings --> Collaborators --> Add people*).\n" +
  "\n" +
  "4. Sklonuj repozytorium na lokalny komputer.\n" +
  "\n" +
  "5. Utwórz *branch* o nazwie **lab0** i przełącz się na niego.\n" +
  "\n" +
  "6. Zmodyfikuj plik README.MD, dodając do niego następujące informacje:\n" +
  "\n" +
  "   1. Imię i nazwisko\n" +
  "\n" +
  "   2. Grupę i godzinę zajęć\n" +
  "\n" +
  "   3. Nazwę swojego zwierzaka\n" +
  "\n" +
  "   4. Link do swojego profilu na https://gitexercises.fracz.com\n" +
  "\n" +
  "   5. Możesz też dodać dowolny dodatkowy tekst, to Twoje repo. ;)\n" +
  "\n" +
  "   **Uwaga**: zanim zapiszesz nazwę swojego zwierzaka, [upewnij się czy nie jest ona już zajęta](https://aghedupl-my.sharepoint.com/:x:/g/personal/miidzik_agh_edu_pl/EbRk-hL6hWJKnESfA3NMlVEBJi-fSMmz-Z9pIOwQ7tpdkg?e=GwTsDz), żeby uniknąć kolizji z innymi studentami! Każdy zwierzak powinien być unikalny. Podlinkowany arkusz aktualizuje się automatycznie co jakiś czas.\n" +
  "\n" +
  "7. Dodaj plik **.gitignore** i przygotuj go do pracy ze środowiskiem IntelliJ - możesz skorzystać z [gotowego szablonu](https://github.com/github/gitignore/blob/main/Global/JetBrains.gitignore).\n" +
  "\n" +
  "8. Zrób *commit* i *push* swoich zmian na zdalny branch o tej samej nazwie (*origin/lab0*).\n" +
  "\n" +
  '9. Na stronie swojego repozytorium na GitHubie przejdź do sekcji *Pull requests*. Utwórz nowy Pull Request **lab0 --> main**. Możesz go nazwać np. "Lab0 do oceny". \n' +
  "\n" +
  "   W ten sposób prowadzący będzie mógł zobaczyć i ocenić Twoje zmiany (np. dodać komentarze w PR). Po sprawdzeniu i ocenieniu Lab PR-a należy scalić z główną gałęzią (przycisk ***Merge pull request*** w widoku PR). \n" +
  "\n" +
  "   **Podobną procedurę będziemy stosować na wszystkich kolejnych laboratoriach. Pamiętaj by zawsze na początku pracy tworzyć branch z głównej gałęzi, commitować zmiany (liczba commitów nie ma znaczenia), a na koniec przygotować PR do sprawdzenia. Więcej informacji na ten temat znajdziesz w dodatkowej instrukcji:**\n" +
  "   \n" +
  "   [Praca z Git na kolejnych laboratoriach](git_workflow_tutorial.md)\n" +
  "   \n" +
  "10. Po wykonaniu wszystkich ćwiczeń [zarejestruj swojego zwierzaka wypełniając formularz](https://forms.office.com/Pages/ResponsePage.aspx?id=PwOxgOAhgkq7wPBf3M07yF6m9cn7cIlCm9fFlCH8KDJUMzdIU0NaTzUyTkFLME5TUzBCVFJRUDVJUi4u). W ten sposób prowadzący będzie wiedział również, jak dostać się do Twojego repozytorium.\n" +
  "   \n" +
  "\n" +
  "## Przydatne informacje\n" +
  "\n" +
  "### Polecenia do wykonania za pierwszym razem (jeśli projekt nie jest w żadnym repozytorium)\n" +
  "\n" +
  "W celu przygotowania kodu źródłowego do pracy z Gitem należy, będąc w głównym katalogu naszej aplikacji, wykonać następujące polecenia\n" +
  "\n" +
  "1. `git init` (zainicjowanie plików Gita: w głównym katalogu naszej aplikacji, tworzony jest katalog `.git`, który\n" +
  "   zawiera repozytorium kodu źródłowego)\n" +
  "   \n" +
  "2. `echo 'out' > .gitignore` (dodanie katalogu `out` do listy ingorowanych plików/katalogów)\n" +
  "\n" +
  "   **Uwaga:** Powyższe polecenie w PowerShellu powoduje problemy. W tej sytuacji zalecane jest po prostu utworzenie pliku\n" +
  "   `.gitignore` w edytorze tekstu i wpisanie do niego linii o treści `out`.\n" +
  "\n" +
  "3. `git add .` (dodanie wszystkich plików, poza ignorowanymi, do *indeksu* Gita)\n" +
  "\n" +
  "4. `git status` (sprawdzenie aktualnego statusu kodu źródłowego, polecenie wykonywane bardzo często)\n" +
  "\n" +
  "5. `git commit -m 'Initial commit'` (*zatwierdzenie* (zacommitowanie) zmian w historii Gita)\n" +
  "\n" +
  "6. `git remote add origin https://github.com/<login>/<repozytorium>.git` (dodanie zdalnego repozytorium z Githuba)\n" +
  "\n" +
  "9. `git push origin master` (wysłanie zmian do zdalnego repozytorium)\n" +
  "\n" +
  "### Odtworzenie repozytorium\n" +
  "\n" +
  "1. `git clone https://github.com/<login>/<repozytorium>.git` - *sklonowanie* zdalnego repozytorium\n" +
  "\n" +
  "Alternatywnie\n" +
  "\n" +
  "1. IntelliJ -> Import from Git\n" +
  "\n" +
  "W poniższych poleceniach fragment ujęty w nawiasy ostre, np. `<file-name>`, należy zastąpić **innym** łańcuchem znaków.\n" +
  "\n" +
  "### Zatwierdzenie zmian na koniec pracy\n" +
  "\n" +
  "1. `git add <file-name>` (dodanie zmian w pliku `<file-name>` do *indeksu* - operację powtórzyć dla każdego modyfikowanego i nowego pliku, lub użyć wyrażenia typu `git add *.java`)\n" +
  "2. `git commit -m '<Meaningful description of change>'` (*zatwierdzenie* zmian znajdujących się w indeksie)\n" +
  "3. `git push origin <branch-name>` (wysłanie zmian do zdalnego repozytorium na gałąź `<branch-name>`; jeśli tworzymy nowy branch może być konieczne dodanie przełącznika `--set-upstream-to`)\n" +
  "\n" +
  "\n" +
  "### Aktualizowanie się względem zdalnej gałęzi `master`\n" +
  "\n" +
  "1. `git remote add <remote-repo-name> <remote-repo-address>` (dodanie zdalnego repozytorium; jeśli korzystamy z jednego zdalnego repozytorium, to zwyczajowo ma ono nazwę `origin`).\n" +
  "2. `git checkout master` (przełączenie się do lokalnej gałęzi master).\n" +
  "3. `git pull <remote-repo-name> master` (pobranie do lokalnej gałęzi `master` zmian ze zdalnej gałęzi `master`)\n" +
  "4. `git checkout <feature-branch>` (przełączenie się do gałęzi, na której pracowaliśmy).\n" +
  "5. `git rebase master` (przepięcie commitów z obecnej gałęzi tak, by poprzedzał je ostatni commit z `master`).\n" +
  "6. Rozwiązanie konfliktów, ewentualne wprowadzenie zmian.\n" +
  "7. `git push origin <feature-branch> -f` (wysłanie zaktualizowanej wersji do zdalnej gałęzi `<feature-branch>` w naszym\n" +
  "   repozytorium).\n" +
  "\n" +
  "\n" +
  "## Przydatne odnośniki\n" +
  "\n" +
  "* https://git-scm.com/book/pl/v2 - oficjalny podręcznik Gita, częściowo przetłumaczony na język polski\n" +
  "* https://guides.github.com/introduction/git-handbook/ - wprowadzenie do Gita, wyjaśnienie najważniejszych koncepcji\n" +
  "* https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud - inne wprowadzenie do Gita, zawiera dużo\n" +
  "  ilustracji";

export const lab1 =
  "# Lab 1: Instrukcje sterujące w Javie\n" +
  "\n" +
  "Celem laboratorium jest zapoznanie się z podstawowymi pojęciami oraz instrukcjami sterującymi w Javie.\n" +
  "\n" +
  "Najważniejsze zadania:\n" +
  "\n" +
  "1. Konfiguracja środowiska.\n" +
  "2. Stworzenie klasy `World` sterującej programem.\n" +
  "3. Stworzenie typu wyliczeniowego `MoveDirection` i narzędzia `OptionsParser`.\n" +
  "\n" +
  "\n" +
  "## Zadania do wykonania (4xp)\n" +
  "\n" +
  "**Uwaga 1:** Przed zainicjowaniem projektu zalecamy upewnić się, czy połączenie z Internetem jest stabilne i wystarczająco szybkie. Stworzenie projektu wymaga pobrania kilku dodatkowych narzędzi w tle. W szczególności **NIE** polecamy pracy na otwartej sieci `AGH-Guest` (lepiej skorzystać z `AGH-5` lub `AGH-WPA`).\n" +
  "\n" +
  '**Uwaga 2:** Projekt tworzony na zajęciach powinien znaleźć się w utworzonym wcześniej repozytorium Git. Kolejne laboratoria będą wymagały rozszerzania tego projektu o nowe elementy. **Pamiętaj, by każdą laborkę rozpoczynać od utworzenia brancha z aktualnego stanu repo (np. "lab1")**, a także o regularnym commitowaniu zmian i udostępnieniu gotowego rozwiązania w formie Pull Requesta do oceny zgodnie z wytycznymi prowadzącego. Zwracaj też uwagę na pliki, które commitujesz - nie umieszczaj w repo śmieci (w razie potrzebny zmodyfikuj *.gitignore*), jedynie sam kod i pliki konfiguracyjne gradle. Polecamy na początek zajrzeć do [dodatkowej instrukcji o pracy z Gitem podczas laboratoriów](../lab0/git_workflow_tutorial.md).\n' +
  "\n" +
  "1. Uruchom program IntelliJ.\n" +
  "\n" +
  "2. Utwórz nowy projekt o nazwie `oolab` typu **Gradle**. Pamiętaj, by w kreatorze projektu ustawić pole `Language` na `Java`, `Build system` na `Gradle`  (a **nie** na `IntelliJ`), a `Gradle DSL` najlepiej na `Groovy`. Możesz wybrać (lub w razie potrzeby pobrać) najnowszą wersję JDK, ale zalecamy **21**, ponieważ jest to wersja LTS i instrukcje do laboratoriów są o nią oparte. \n" +
  "\n" +
  "3. Po utworzeniu projektu poczekaj aż IntelliJ zainicjuje projekt - może to chwilę potrwać. Jeśli wszystko poszło ok, po lewej stronie zobaczysz drzewo katalogów. Katalog `java` (w `src/main`) powinien mieć niebieską ikonę (oznacza to, że został wykryty jako katalog ze źródłami po zainicjowaniu przez Gradle).\n" +
  "\n" +
  '4. W katalogu `src/main/java/` utwórz pakiet `agh.ics.oop` (ppm na `src/main/java` -> `New package`). Możesz też od razu usunąć ewentualne "śmieci" wygenerowane przez IntelliJ (pakiet `org.example`).\n' +
  "\n" +
  "5. W pakiecie `agh.ics.oop` utwórz klasę `World` ze statyczną metodą `main`.\n" +
  "\n" +
  "6. Zaimplementuj metodę `main` tak aby wyświetlały się dwa komunikaty:\n" +
  "   - `system wystartował`\n" +
  "   - `system zakończył działanie`\n" +
  "\n" +
  "7. Uruchom program, np. klikając zieloną ikonę pojawiającą się na początku linii, w której występuje metoda `main`.\n" +
  "\n" +
  "8. Dodaj metodę statyczną `run`, która jest wywoływana pomiędzy tymi komunikatami.\n" +
  "\n" +
  "9. Metoda `run` powinna informować o tym, że zwierzak idzie do przodu.\n" +
  "\n" +
  "10. Uruchom program.\n" +
  "\n" +
  "11. Rozszerz metodę `run` tak, by akceptowała tablicę argumentów typu `String`. Przekaż do niej tablicę `args`, która zawiera parametry wywołania programu.\n" +
  "\n" +
  "12. Po komunikacie o poruszaniu się do przodu wypisz w konsoli wartości wszystkich argumentów tej metody oddzielone przecinkami. Zwróć uwagę na to, żeby nie było nadmiarowych przecinków.\n" +
  "\n" +
  "13. Uruchom program z dowolnymi parametrami (muszą występować co najmniej 2). W IntelliJ parametry programu możesz ustawiać po wejściu w konfigurację uruchomieniową (rozwijane menu z nazwą klasy --> `Edit configurations...` --> pole `Program arguments`).\n" +
  "\n" +
  "14. Zmodyfikuj program tak, aby interpretował wprowadzone argumenty:\n" +
  "\n" +
  "    - `f` - oznacza, że zwierzak idzie do przodu,\n" +
  "    - `b` - oznacza, że zwierzak idzie do tyłu,\n" +
  "    - `r` - oznacza, że zwierzak skręca w prawo,\n" +
  "    - `l` - oznacza, że zwierzak skręca w lewo,\n" +
  "    - pozostałe argumenty powinny być ignorowane.\n" +
  "\n" +
  "15. Poruszanie się oraz zmiana kierunku ma być oznajmiana odpowiednim komunikatem. Program powinien akceptować dowolną liczbę\n" +
  "    argumentów. Przykładowo wprowadzenie sekwencji `f f r l` powinno dać w wyniku następujące komunikaty:\n" +
  "    - Start\n" +
  "    - Zwierzak idzie do przodu\n" +
  "    - Zwierzak idzie do przodu\n" +
  "    - Zwierzak skręca w prawo\n" +
  "    - Zwierzak skręca w lewo\n" +
  "    - Stop\n" +
  "\n" +
  "16. Zdefiniuj typ wyliczeniowy (enum) `MoveDirection`, który będzie zawierał wszystkie opcje ruchu (np. `FORWARD`, `BACKWARD` itp.). Enum powinien znajdować się w nowym pliku w pakiecie `agh.ics.oop.model` (utwórz w tym celu pod-pakiet `model`).\n" +
  "    \n" +
  "17. Zmodyfikuj program w ten sposób, aby metoda `run` nie akceptowała tablicy łańcuchów znaków, lecz tablicę\n" +
  "    wartości typu wyliczeniowego (`enum`).  W tym celu dodaj nową klasę `OptionsParser`, zawierającą jedną statyczną metodę. Powinna ona przyjmować tablicę łańcuchów znaków i zwracać tablicę `MoveDirection[]`. Niepoprawne opcje powinny być pomijane (tablica wynikowa powinna zawierać wyłącznie prawidłowe kierunki).\n" +
  "    **Uwaga:** Każdy plik `.java` może zawierać tylko jedną klasę publiczną i nazwa klasy musi być identyczna z nazwą pliku (także pod względem wielkości liter). Więc `OptionsParser` również powinien znaleźć się w osobnym pliku. Umieść go w głównym pakiecie `agh.ics.oop`.\n" +
  "    \n" +
  "18. Zweryfikuj poprawność działania programu poprzez jego uruchomienie.\n" +
  "\n" +
  "19. Zamknij IntelliJ.\n" +
  "\n" +
  "20. W pliku `build.gradle` w sekcji `plugins` dodaj linię `id 'application'`: \n" +
  "    ```groovy\n" +
  "    plugins {\n" +
  "      id 'application'\n" +
  "      id 'java'\n" +
  "    }\n" +
  "    ```\n" +
  "\n" +
  "21. W tym samym pliku dodaj sekcję:\n" +
  "    ```groovy\n" +
  "    application {\n" +
  "      getMainClass().set('agh.ics.oop.World')\n" +
  "    }\n" +
  "    ```\n" +
  "\n" +
  "22. W tym samym pliku dodaj sekcję:\n" +
  "    ```groovy\n" +
  "    java {\n" +
  "        toolchain {\n" +
  "            languageVersion.set(JavaLanguageVersion.of(21))\n" +
  "        }\n" +
  "    }\n" +
  "    ```\n" +
  "    (możesz wybrać inną wersję Javy).\n" +
  "\n" +
  "23. Otwórz konsolę (np. terminal/PowerShell).\n" +
  "\n" +
  "24. Wywołaj komendę `export JAVA_HOME=/usr/lib/jvm/java-21` (pod Windows trzeba będzie ustawić zmienną środowiskową wskazującą na katalog, w którym zainstalowana jest Java). **Komendę trzeba zaadaptować do lokalnej instalacji Javy!**\n" +
  "\n" +
  '25. Uruchom program poleceniem `./gradlew run --args="f l"` (lub `gradlew.bat ...` w systemie Windows)\n' +
  "\n" +
  "26. Zmodyfikuj argumenty wywołania i sprawdź zachowanie programu.\n" +
  "    \n" +
  "\n" +
  "## Przydatne informacje\n" +
  "\n" +
  "* W programie Javy funkcja (a właściwie metoda) `main` musi być częścią jakiejś klasy. Jest ona punktem startowym programu.\n" +
  "\n" +
  "* Metoda `main` akceptuje tablicę argumentów typu `String`, ponadto jest publiczną metodą statyczną:\n" +
  "\n" +
  "  ```java\n" +
  "  public class World {\n" +
  "     public static void main(String[] args) {\n" +
  "        // treść metody\n" +
  "     }\n" +
  "  }\n" +
  "  ```\n" +
  "\n" +
  "* Do wypisywania komunikatów użyj metod `System.out.print()` oraz `System.out.println()`.\n" +
  "\n" +
  "* Warunki logiczne w Javie są przechowywane w zmiennej typu `boolean` - nie ma automatycznej konwersji z innych typów.\n" +
  "\n" +
  "* W Javie dostępna jest standardowa pętla `for` znana z C/C++. Można również użyć alternatywnej pętli `for` (tzw. `for each`) \n" +
  "  do iterowania po elementach kolekcji:\n" +
  "\n" +
  "    ```java\n" +
  "  for (String argument : arguments) {\n" +
  "  \n" +
  "  }\n" +
  "    ```\n" +
  "\n" +
  "* **Uwaga:** W Javie łańcuchy znaków (oraz inne typy referencyjne) porównuje się za pomocą wywołania `equals`, np.\n" +
  "  `string1.equals(string2)`. Zapis `string1 == string2` jest składniowo poprawny, ale sprawdza **identyczność referencji**.\n" +
  "\n" +
  "* Typ wyliczeniowy deklaruje się za pomocą słowa kluczowego `enum`, np.:\n" +
  "\n" +
  "  ```java\n" +
  "  enum MoveDirection {\n" +
  "    FORWARD,\n" +
  "    BACKWARD,\n" +
  "    RIGHT,\n" +
  "    LEFT\n" +
  "  }\n" +
  "  ```\n" +
  "\n" +
  "* Typu wyliczeniowego można użyć odwołując się do jego składowych, np.:\n" +
  "\n" +
  "  ```java\n" +
  "  MoveDirection direction = MoveDirection.FORWARD;\n" +
  "  ```\n" +
  "\n" +
  "* Instrukcję `switch` można używać m. in. na typach wyliczeniowych oraz napisach zarówno w formie instrukcji, jak i wyrażenia, którego wynik można przypisać do zmiennej (od Javy 14):\n" +
  "\n" +
  "  ```java\n" +
  "   switch (argument) {\n" +
  '    case "f" ->  System.out.println("Do przodu");\n' +
  '    case "b" ->  System.out.println("Do tyłu");\n' +
  "  }\n" +
  "  \n" +
  "  String message = switch (argument) {\n" +
  '    case "f" -> "Do przodu";\n' +
  '    case "b" -> "Do tyłu";\n' +
  '    default -> "Nieznana komenda";\n' +
  "  };\n" +
  "  \n" +
  "  System.out.println(message);\n" +
  "  ```\n" +
  "\n" +
  "* W Javie można dość łatwo przekazać fragment tablicy, np. jako rezultat wywołania funkcji lub jako argument pętli `for`. Służy do tego wywołanie: \n" +
  "\n" +
  "  ```java\n" +
  "  Arrays.copyOfRange(array, startInclusive, endExclusive);\n" +
  "  ```\n";

export const lab2 =
  "# Lab 2: Model obiektowy\n" +
  "\n" +
  "Celem laboratorium jest zapoznanie się z modelem obiektowym Javy, na przykładzie klasy reprezentującej dwuwymiarowy\n" +
  "wektor. Wprowadzamy też narzędzia do pisania testów jednostkowych.\n" +
  "\n" +
  "Najważniejsze zadania:\n" +
  "1. Stworzenie klasy `Vector2d`.\n" +
  "2. Stworzenie klasy `MapDirection`.\n" +
  "3. Testy jednostkowe.\n" +
  "\n" +
  "## Zadania do wykonania (4xp)\n" +
  "\n" +
  "Uwaga: dla przejrzystości pliki z klasami `Vector2d` oraz `MapDirection` należy umieścić w pakiecie `agh.ics.oop.model`.\n" +
  "\n" +
  "### Klasa `Vector2d`\n" +
  "\n" +
  "1. Utwórz klasę `Vector2d`, która:\n" +
  "\n" +
  "   * posiada dwa prywatne pola `x` i `y` typu `int`, które nie mogą być modyfikowane (`final`),\n" +
  "   * posiada konstruktor akceptujący parametry `x` i `y`, które są przypisywane do pól `x` i `y`,\n" +
  "   * posiada gettery umożliwiające odczyt wartości utworzonych atrybutów,\n" +
  "   * posiada metodę `String toString()`, która zamienia pozycję na napis `(x,y)`, np. dla `x = 1` oraz `y = 2`, napis ma postać\n" +
  "     `(1,2)`,\n" +
  "   * posiada metodę `boolean precedes(Vector2d other)`, akceptującą inny obiekt tej klasy i zwracającą wartość `true`, jeśli oba pola mają\n" +
  "     wartość mniejszą bądź równą polom drugiego obiektu,\n" +
  "   * posiada metodę `boolean follows(Vector2d other)`, akceptującą inny obiekt tej klasy i zwracającą wartość `true`, jeśli oba pola mają\n" +
  "     wartość większą bądź równą polom drugiego obiektu,\n" +
  "   * posiada metodę `Vector2d add(Vector2d other)`, która zwraca nowy obiekt klasy `Vector2d`, którego składowe są sumą odpowiednich składowych\n" +
  "     dodawanych pozycji,\n" +
  "   * posiada metodę `Vector2d subtract(Vector2d other)`, która zwraca nowy obiekt klasy `Vector2d`, którego składowe są różnicą \n" +
  "     odpowiednich składowych odejmowanych pozycji, \n" +
  "   * posiada metodę `Vector2d upperRight(Vector2d other)`, która akceptuje inny punkt i zwraca obiekt klasy `Vector2d` posiadający te składowe\n" +
  "     punktów, które mają większe wartości dla odpowiednich osi (innymi słowy jest prawym górnym rogiem prostokąta, który\n" +
  "     opisany jest na obu punktach, którego krawędzie są równoległe do osi X i Y),\n" +
  "   * posiada metodę `Vector2d lowerLeft(Vector2d other)`, która akceptuje inny punkt i zwraca obiekt klasy `Vector2d` posiadający te składowe\n" +
  "     punktów, które mają mniejsze wartości dla odpowiednich osi (tzn. lewy dolny róg prostokąta),\n" +
  "   * posiada metodę `Vector2d opposite()`, która zwraca nowy obiekt tej klasy, posiadający zmienione znaki obu składowych,\n" +
  "   * posiada metodę `boolean equals(Object other)`, która zwraca prawdę, jeśli obie pozycje są sobie równe (zwróć uwagę na typ parametru). **Uwaga:** Zastanów się, jaką inną metodę trzeba dodać po zdefiniowaniu własnego `equals`.\n" +
  "\n" +
  "2. Poniższy obrazek ilustruje metody `precedes` i `follows`. `v1` poprzedza (precedes) `v2` oraz `v3`. `v2` poprzedza `v3`.\n" +
  "   Wszystkie wektory poprzedzają również same siebie (relacja ta jest zwrotna). `v3` następuje po (follows) `v2` oraz\n" +
  "   `v1`, `v2` następuje po `v1`. Wszystkie wektory następują również po samych sobie.\n" +
  "   ![wektory](vector2d.png)\n" +
  "\n" +
  "3. Poniższy obrazek ilustruje metody `lowerLeft` oraz `upperRight`.\n" +
  "   ![rogi](vector2d-a.png)\n" +
  "\n" +
  "4. W metodzie `main` w klasie `World` wprowadź następujący kod:\n" +
  "\n" +
  "   ```java\n" +
  "   Vector2d position1 = new Vector2d(1,2);\n" +
  "   System.out.println(position1);\n" +
  "   Vector2d position2 = new Vector2d(-2,1);\n" +
  "   System.out.println(position2);\n" +
  "   System.out.println(position1.add(position2));\n" +
  "   ```\n" +
  "\n" +
  "   Sprawdź czy uzyskane wyniki są poprawne.\n" +
  "\n" +
  "### Klasa `MapDirection`\n" +
  "\n" +
  "6. Utwórz typ wyliczeniowy `MapDirection` z czterema kierunkami: `NORTH`, `SOUTH`, `WEST` i `EAST`, który:\n" +
  "   * posiada metodę `toString`, która dla kierunku `EAST` zwraca łańcuch `Wschód`, dla `WEST` - `Zachód`, itd.\n" +
  "   * posiada metodę `next`, która dla kierunku `EAST` zwraca `SOUTH` (kolejny kierunek zgodnie z ruchem wskazówek\n" +
  "     zegara) itd.\n" +
  "   * posiada metodę `previous`, która dla kierunku `EAST` zwraca `NORTH` (kolejny kierunek zgodnie z ruchem przeciwnym\n" +
  "     do ruchu wskazówek zegara) itd.\n" +
  "   * posiada metodę `toUnitVector`, która zwraca jednostkowy wektor przemieszczenia typu `Vector2d` zgodny z orientacją na mapie,\n" +
  "     tzn. dla `NORTH` wektor ten powinien mieć wartość `(0,1)`, dla `WEST` `(-1,0)`, itd.\n" +
  "\n" +
  "7. Sprawdź w metodzie `main` czy metody te działają zgodnie z opisem.\n" +
  "\n" +
  "\n" +
  "### Testy\n" +
  "\n" +
  "\n" +
  "1. Utwórz klasę `MapDirectionTest` w katalogu `src/test/java` w pakiecie `agh.ics.oop.model`.\n" +
  "\n" +
  "2. Zaimplementuj test weryfikujący poprawność działania metody `next()` dla wszystkich przypadków (dodaj adnotację\n" +
  "   `@Test` przed deklaracją metody).\n" +
  "\n" +
  "3. Uruchom test, korzystając z zielonych trójkątów po lewej stronie.\n" +
  "\n" +
  "4. Zaimplementuj test weryfikujący poprawność działania metody `previous()` dla wszystkich przypadków.\n" +
  "\n" +
  "5. Utwórz klasę `Vector2dTest`.\n" +
  "\n" +
  "6. Dodaj testy weryfikujące poprawność metod: `equals(Object other)`, `toString()`, `precedes(Vector2d other)`, `follows(Vector2d other)`,\n" +
  "   `upperRight(Vector2d other)`, `lowerLeft(Vector2d other)`, `add(Vector2d other)`, `subtract(Vector2d other)`,\n" +
  "   `opposite()`.\n" +
  "   \n" +
  "7. W podobny sposób przetestuj także `OptionsParser`.\n" +
  "\n" +
  "   Pamiętaj, że kod testów również powinien być czytelny i dobrze ustrukturyzowany. Warto zapoznać się z konwencją [Given When Then](https://www.j-labs.pl/blog-technologiczny/given-when-then-pattern-in-unit-tests/) i zawsze formułować przypadki testowe tak by jasno opisywały, co chcemy przetestować i jakie powinny być skutki badanej akcji.\n" +
  "\n" +
  "\n" +
  "\n" +
  "## Przydatne informacje\n" +
  "\n" +
  "* Atrybuty w obiekcie deklarowane są w ciele klasy, np. \n" +
  "    ```java\n" +
  "    class Vector2d {\n" +
  "      private int x;\n" +
  "      private int y;\n" +
  "    }\n" +
  "    ```\n" +
  "* Konstruktor jest specjalną metodą w każdej klasie. Nazywa się tak samo jak klasa i nie zwraca wartości. Konstruktor \n" +
  "  pozwala ustalić początkową wartość pól obiektu, jeśli mają być przekazane przez użytkownika, np.\n" +
  "    ```java\n" +
  "    class Vector2d {\n" +
  "      public Vector2d(int x, int y){\n" +
  "        this.x = x;\n" +
  "        this.y = y;\n" +
  "      }\n" +
  "    }\n" +
  "    ```\n" +
  "* Obiekty klasy tworzy się za pomocą wywołania `new`, np. \n" +
  "    ```java\n" +
  "    Vector2d position1 = new Vector2d(1,2);\n" +
  "    ```\n" +
  "* Słowo kluczowe `this` odnosi się do obiektu, na rzecz którego wywołano metodę.\n" +
  "  Przykładowo w języku C moglibyśmy zdefiniować metodę `createPoint`:\n" +
  "\n" +
  "    ```c\n" +
  "    struct Point {\n" +
  "      int x;\n" +
  "      int y;\n" +
  "    }\n" +
  "  \n" +
  "    struct Point * createPoint(int x, int y){\n" +
  "      struct Point * result = malloc(sizeof(struct Point));\n" +
  "      result->x = x;\n" +
  "      result->y = y;\n" +
  "      return result;\n" +
  "    }\n" +
  "  \n" +
  "    struct Point * p1 = createPoint(1,2);\n" +
  "    ```\n" +
  "\n" +
  "    Ten kod jest analogiczny do konstruktora, z ta różnicą, że w konstruktorze nie tworzymy obiektu *explicite*, tylko mamy do niego dostęp za pomocą słowa kluczowego `this`.\n" +
  "\n" +
  "* Metoda `equals` ma zwykle taki sam schemat:\n" +
  "\n" +
  "    ```java\n" +
  "    public boolean equals(Object other){\n" +
  "      if (this == other)\n" +
  "        return true;\n" +
  "      if (!(other instanceof Vector2d))\n" +
  "        return false;\n" +
  "      Vector2d that = (Vector2d) other;\n" +
  "      // tutaj przeprowadzane jest faktyczne porównanie\n" +
  "    }\n" +
  "    ```\n" +
  "\n" +
  "    Należy również pamiętać, że zmiana metody `equals` powinna powodować zmianę metody `hashCode`, w przeciwnym razie\n" +
  "umieszczenie obiektów w kolekcji takiej jak `Set` będzie niezgodne z semantyką metody `equals` (czyt. dużo debuggowania).\n" +
  "\n" +
  "\n" +
  "* Definicję typu wyliczeniowego można rozszerzać, dodając do niego pola i metody. Wymaga to umieszczenia średnika po ostatniej\n" +
  "  wartości typu, np.:\n" +
  "    ```java\n" +
  "    enum MapDirection {\n" +
  "      NORTH,\n" +
  "      SOUTH,\n" +
  "      EAST,\n" +
  "      WEST;\n" +
  "  \n" +
  "      public String toString(){\n" +
  "        return switch(this) {\n" +
  '          case NORTH -> "Północ";\n' +
  '          case SOUTH -> "Południe";\n' +
  "          //...\n" +
  "        }\n" +
  "      }\n" +
  "    }\n" +
  "    ```\n" +
  "\n" +
  "* Metody testujące posiadają adnotację `@Test`.\n" +
  "\n" +
  "* W metodach testujących można użyć m.in. następujących asercji:\n" +
  "  * `assertEquals(a, b)` - weryfikuje czy obiekty `a` i `b` są sobie równe (korzystając z metody `equals`),\n" +
  "  * `assertTrue(a)` - weryfikuje czy wartość logiczna `a` jest prawdą,\n" +
  "  * `assertFalse(a)` - weryfikuje czy wartość logiczna `a` jest fałszem.\n";

export const proj1 =
  "# Projekt: Darwin World\n" +
  "\n" +
  'Niniejsza treść została zaadaptowana przez Aleksandra Smywińskiego-Pohla na podstawie opisu oraz ilustracji przygotowanych przez Wojciecha Kosiora. Inspiracją dla niego była z kolei książka "Land of Lisp" Conrada Barskiego, który zaś zainspirował się artykułem w "Scientific American". A na końcu modyfikacje wprowadził Radosław Łazarz, bazując częściowo na książce "Algorytmy genetyczne i ich zastosowania" Davida E. Goldberga. Dużo ludzi jak na jeden projekcik.:-)\n' +
  "\n" +
  "## Cel projektu\n" +
  "\n" +
  "Stwórzmy grę! Nie będzie to jednak gra, w którą my gramy. Zamiast tego będzie to świat, który ewoluuje na naszych oczach! Stworzymy środowisko stepów i dżungli ze zwierzakami, które biegają, buszują w zaroślach, jedzą i rozmnażają się. A po kilku milionach lat zobaczymy, że wyewoluowały w różne gatunki!\n" +
  "\n" +
  "![dżungla](zwierzak.jpg)\n" +
  "\n" +
  "Świat naszej gry jest dość prosty. Składa się ze zwykłej, prostokątnej połaci podzielonej na kwadratowe pola. Większość świata pokrywają stepy, na których rośnie niewiele roślin stanowiących pożywienie zwierzaków. Niektóre rejeony porasta jednak dżungla, gdzie rośliny rosną dużo szybciej. Rośliny będą wyrastały w losowych miejscach, ale ich koncentracja będzie większa w dżungli niż na stepie.\n" +
  "\n" +
  "![dżungla](dzungla.jpg)\n" +
  "\n" +
  "Nasze zwierzęta, które są roślinożercami, będą przemierzały ten świat w poszukiwaniu pożywienia. Każdy zwierzak ma określoną energię, która zmniejsza się co dnia. Znalezienie i zjedzenie rośliny zwiększa poziom energii o pewną wartość.\n" +
  "\n" +
  "## Anatomia zwierzaka\n" +
  "\n" +
  "![dżungla](zwierzak2.jpg)\n" +
  "\n" +
  "Musimy śledzić kilka cech każdego zwierzaka. Po pierwsze, zarówno w przypadku rośliny jak i tych, którzy je zjadają, musimy znać koordynaty `x` i `y`. Wskazują nam one, gdzie dany zwierzak lub roślina jest na mapie.\n" +
  "\n" +
  "Musimy także wiedzieć, ile energii ma dany zwierzak. To darwinowska gra o przetrwanie, więc jeśli zwierzak nie zdoła zdobyć odpowiedniej ilości pożywienia, będzie głodować i zdechnie...  Energia mówi nam o tym, ile dni funkcjonowania zostało jeszcze danemu zwierzakowi. Musi ono koniecznie znaleźć więcej jedzenia, zanim jej zapas się wyczerpie.\n" +
  "\n" +
  "![dżungla](kierunki.jpg)\n" +
  "\n" +
  "Musimy również pamiętać, w którą stronę zwierzak jest zwrócony. Jest to ważne, ponieważ każdego dnia będzie ono poruszać się na mapie w tym właśnie kierunku. Istnieje osiem różnych możliwych pozycji i tyle samo możliwych obrotów. Obrót `0` oznacza, że zwierzak nie zmienia swojej orientacji, obrót `1` oznacza, że zwierzak obraca się o 45°, `2`, o 90°, itd. Przykładowo: jeśli zwierzak był skierowany na północ i obrót wynosi `1`, to zwierzak skierowany jest teraz na północny wschód.\n" +
  "\n" +
  "Na koniec musimy także przechowywać geny zwierzaka. Każdy zwierzak ma N genów, z których każdy jest jedną liczbą z zakresu od `0` do `7`. Geny te opisują (w bardzo uproszczony sposób) schemat zachowania danej istoty. Egzystencja naszych zwierzaków ma cykliczną naturę. Każdy z nich przechowuje informację o tym, z którego fragmentu swojego genomu będzie korzystał najbliższego dnia. Podczas każdego ruchu zwierzak zmienia najpierw swoje ustawienie, obracając się zgodnie z aktualnie aktywnym genem, a potem porusza się o jedno pole w wyznaczonym kierunku. Następnie gen ulega dezaktywacji, a aktywuje się gen na prawo od niego (będzie sterował zwierzakiem kolejnego dnia). Gdy geny skończą się, to aktywacja wraca na początek ich listy. Przykładowo - genom:\n" +
  "`0 0 7 0 4`\n" +
  "oznacza, że żyjątko będzie kolejno: szło przed siebie, szło przed siebie, szło nieco w lewo, szło przed siebie, zawracało, szło przed siebie, ... - itd.\n" +
  "\n" +
  "## Konsumpcja i rozmnażanie\n" +
  "\n" +
  "Jedzenie jest prostym procesem. Zakładamy, że zwierzak zjada roślinę, gdy stanie na jej polu, a jego energia wzrasta wtedy o z góry zdefiniowaną wartość.\n" +
  "\n" +
  "Rozmnażanie jest zwykle najciekawszą częścią każdej symulacji ze zwierzakami. Zdrowe młode może mieć tylko zdrowa para rodziców, dlatego nasze zwierzaki będą się rozmnażać tylko jeśli mają odpowiednią ilość energii. Przy reprodukcji rodzice tracą na rzecz młodego pewną część swojej energii - ta energia będzie rónocześnie stanowić startową energię ich potomka.\n" +
  "\n" +
  "Urodzone zwierzę otrzymuje genotyp będący krzyżówką genotypów rodziców. Udział genów jest proporcjonalny do energii rodziców i wyznacza miejsce podziału genotypu. Przykładowo, jeśli jeden rodzic ma 50, a  drugi 150 punktów energii, to dziecko otrzyma 25% genów pierwszego oraz 75% genów drugiego rodzica. Udział ten określa miejsce przecięcia genotypu, przyjmując, że geny są uporządkowane. W pierwszym kroku losowana jest strona genotypu, z której zostanie wzięta część osobnika silniejszego, np. *prawa*. W tym przypadku dziecko otrzymałoby odcinek obejmujący 25% *lewych* genów pierwszego rodzica oraz 75% *prawych* genów drugiego rodzica. Jeśli jednak wylosowana byłaby strona *lewa*, to dziecko otrzymałoby 75% *lewych* genów silniejszego osobnika oraz 25% *prawych* genów. Na koniec mają zaś miejsce mutacje: losowa liczba (wybranych również losowo) genów potomka zmienia swoje wartości na zupełnie nowe.\n" +
  "\n" +
  "\n" +
  "## Symulacja\n" +
  "\n" +
  "Symulacja każdego dnia składa się z poniższej sekwencji kroków:\n" +
  "\n" +
  "1. Usunięcie martwych zwierzaków z mapy.\n" +
  "2. Skręt i przemieszczenie każdego zwierzaka.\n" +
  "3. Konsumpcja roślin, na których pola weszły zwierzaki.\n" +
  "4. Rozmnażanie się najedzonych zwierzaków znajdujących się na tym samym polu.\n" +
  "5. Wzrastanie nowych roślin na wybranych polach mapy.\n" +
  "\n" +
  "Daną symulację opisuje szereg parametrów:\n" +
  "\n" +
  "* wysokość i szerokość mapy,\n" +
  "* wariant mapy (wyjaśnione w sekcji poniżej),\n" +
  "* startowa liczba roślin,\n" +
  "* energia zapewniana przez zjedzenie jednej rośliny,\n" +
  "* liczba roślin wyrastająca każdego dnia,\n" +
  "* wariant wzrostu roślin (wyjaśnione w sekcji poniżej),\n" +
  "* startowa liczba zwierzaków,\n" +
  "* startowa energia zwierzaków,\n" +
  "* energia konieczna, by uznać zwierzaka za najedzonego (i gotowego do rozmnażania),\n" +
  "* energia rodziców zużywana by stworzyć potomka,\n" +
  "* minimalna i maksymalna liczba mutacji u potomków (może być równa `0`),\n" +
  "* wariant mutacji (wyjaśnione w sekcji poniżej),\n" +
  "* długość genomu zwierzaków,\n" +
  "* wariant zachowania zwierzaków (wyjaśnione w sekcji poniżej).\n" +
  "\n" +
  "## Warianty konfiguracji\n" +
  "\n" +
  "Pewne aspekty symulacji są konfigurowalne i mogą silnie zmieniać jej przebieg. Część to zwykłe parametry liczbowe (np. początkowe rozmiary populacji). Część z nich  jednak dość znacząco modyfikuje jej zasady. Dotyczy to w szczególności: działania mapy, działania wzrostu roślin, działania mutacji, zachowania zwierzaków. Każdy zespół realizujący projekt **powinien zrealizować wszystkie aspekty z sekcji poniżej oznaczone jako obowiązkowe, a także dodatkowo 2 warianty przydzielone na pierwszych zajęciach przez prowadzącego**. Jeden z dodatkowych wariantów będzie dotyczyć mapy (jej kształtu lub roślinności), a drugi zwierzaków (ich zachowania lub mutacji przy rozmnażaniu). \n" +
  "\n" +
  "### Mapa i roślinność\n" +
  "\n" +
  "W przypadku mapy kluczowe jest to, jak obsługujemy jej krawędzie. Zrealizujemy następujące warianty:\n" +
  "\n" +
  "* [obowiązkowo dla wszystkich] **kula ziemska** - lewa i prawa krawędź mapy zapętlają się (jeżeli zwierzak wyjdzie za lewą krawędź, to pojawi się po prawej stronie - a jeżeli za prawą, to po lewej); górna i dolna krawędź mapy to bieguny - nie można tam wejść (jeżeli zwierzak próbuje wyjść poza te krawędzie mapy, to pozostaje na polu na którym był, a jego kierunek zmienia się na odwrotny);\n" +
  "* [A] **bieguny** – bieguny zdefiniowane są na dolnej i górnej krawędzi mapy. Im bliżej bieguna znajduje się zwierzę, tym większą energię traci podczas pojedynczego ruchu (na biegunach jest zimno);\n" +
  "* [B] **pożary** - co jakąś (zadaną w konfiguracji) liczbę tur na mapie pojawia się pożar. Pożar zaczyna się na jednym polu z rośliną i w każdej turze rozprzestrzenia się na wszystkie przylegające do niej rośliny (ale nie po skosie). Pożar na każdym polu trwa stałą zadaną (konfigurowalną) liczbę tur i po jego zakończeniu roślina na tym polu znika. Jeśli zwierzak wejdzie na pole z ogniem, umiera.  \n" +
  "* [C] **przypływy i odpływy** - na mapie znajdują się obszary wodne, na które zwierzaki nie mogą wejść; obszary te powiększają się i zmniejszają cyklicznie co kilka ruchów symulacji.\n" +
  "* [D] **dziki sowoniedźwiedź** - wyznaczony kwadratowy podobszar mapy (zajmujący 20% mapy) to terytorium dzikiego sowoniedźwiedzia. Sowoniedźwiedź w każdej turze porusza się podobnie jak zwierzaki na podstawie losowego genotypu, ale nie wychodzi nigdy poza swoje terytorium. Sowoniedźwiedź jest mięsożerny, więc nie wchodzi w interakcje z trawą. Interesują go tylko nasze zwierzaki. Gdy zwierzak znajdzie się na jednym polu z sowoniedźwiedziem, zostaje natychmiastowo skonsumowany i ginie. Sowoniedźwiedź jest nieśmiertelny i nie traci energii.\n" +
  "\n" +
  "W przypadku wzrostu roślin pewne pola są silnie preferowane, zgodnie z zasadą Pareto. Istnieje 80% szansy, że nowa roślina wyrośnie na preferowanym polu, a tylko 20% szans, że wyrośnie na polu drugiej kategorii. Preferowanych jest około 20% wszystkich miejsc na mapie, 80% miejsc jest uznawane za nieatrakcyjne. Implementujemy następujące warianty:\n" +
  "\n" +
  "* [obowiązkowo dla wszystkich] **zalesione równiki** - preferowany przez rośliny jest poziomy pas pól w centralnej części mapy (udający równik i okolice);\n" +
  "* [E] **życiodajne truchła** - rośliny preferują rosnąć na tych polach, w których sąsiedztwie niedawno zdechł zwierzak;\n" +
  "* [F] **pełzająca dżungla** - nowe rośliny pojawiają się najczęściej w sąsiedztwie już istniejących roślin (chyba, że mapa została z nich całkowicie ogołocona);\n" +
  "* [G] **dorodne plony** - preferowany jest rozkład równomierny, ale na pewnym kwadratowym podobszarze mapy (zajmującym 20% mapy) czasem pojawiają się większe rośliny, których zjedzenie dodaje zwierzakowi znacznie więcej energii. Każda taka roślina zajmuje kwadratowy obszar 2x2 pola. Obsługa sytuacji, w której więcej zwierzaków kończy ruch na jednym z pól należących do dużej rośliny powinna wyglądać tak samo jak w przypadku, gdy wiele zwierząt walczy o normalną roślinę na jednym polu.\n" +
  "\n" +
  "### Zwierzaki\n" +
  "\n" +
  "W przypadku mutacji mamy do czynienia z dwoma prostymi opcjami:\n" +
  "\n" +
  "* [obowiązkowo dla wszystkich] **pełna losowość** - mutacja zmienia gen na dowolny inny gen;\n" +
  "* [1] **lekka korekta** - mutacja zmienia gen o `1` w górę lub w dół (np. gen `3` może zostać zamieniony na `2` lub `4`, a gen `0` na `1` lub `7`);\n" +
  "* [2] **podmianka** - mutacja może też skutkować tym, że dwa geny zamienią się miejscami.\n" +
  "\n" +
  "Podobnie proste są warianty zachowania:\n" +
  "\n" +
  "* [obowiązkowo dla wszystkich] **pełna predestynacja** - zwierzak zawsze wykonuje kolejno geny, jeden po drugim;\n" +
  "* [3] **nieco szaleństwa** - w 80% przypadków zwierzak po wykonaniu genu aktywuje gen następujący zaraz po nim, w 20% przypadków przeskakuje jednak do innego, losowego genu;\n" +
  "* [4] **starość nie radość** - starsze zwierzaki poruszają się wolniej, raz na kilka tur pomijając swój ruch, ale nadal tracąc energię. Prawdopodobieństwo pominięcia ruchu rośnie z wiekiem, maksymalnie do 80%. \n" +
  "\n" +
  "### Przykład realizacji wariantów\n" +
  "Jeśli zespół projektowy otrzymał do realizacji projekt w wariancie B-3 to znaczy, że:\n" +
  "- musi zapewnić w konfiguracji symulacji możliwość wyboru między mapą _kula ziemska_ a _pożary_,\n" +
  "- musi zapewnić w konfiguracji symulacji możliwość wyboru zachowania zwierzaka: _pełna predestynacja_ lub _nieco szaleństwa_,\n" +
  "- w symulacji rośliny zawsze rosną zgodnie ze strategią _zalesione równiki_, a mutacje zwierząt są _w pełni losowe_ (brak dodatkowej konfiguracji)\n" +
  "\n" +
  "## Wymagania dla aplikacji\n" +
  "\n" +
  "1. Aplikacja ma być realizowana z użyciem graficznego interfejsu użytkownika z wykorzystaniem biblioteki JavaFX.\n" +
  "2. Jej głównym zadaniem jest umożliwienie uruchamiania symulacji o wybranych konfiguracjach.\n" +
  "   1. Powinna umożliwić wybranie jednej z uprzednio przygotowanych gotowych konfiguracji,\n" +
  '   1. "wyklikanie" nowej konfiguracji,\n' +
  "   1. oraz zapisanie jej do ponownego użytku w przyszłości.\n" +
  "3. Uruchomienie symulacji powinno skutkować pojawieniem się nowego okna obsługującego daną symulację.\n" +
  "   1. Jednocześnie uruchomionych może być wiele symulacji, każda w swoim oknie, każda na osobnej mapie.\n" +
  "4. Sekcja symulacji ma wyświetlać animację pokazującą pozycje zwierzaków, ich energię w dowolnej formie (np. koloru lub paska zdrowia) oraz pozycje roślin - i ich zmiany.\n" +
  "5. Program musi umożliwiać zatrzymywanie oraz wznawianie animacji w dowolnym momencie (niezależnie dla każdej mapy - patrz niżej).\n" +
  "6. Program ma pozwalać na śledzenie następujących statystyk dla aktualnej sytuacji w symulacji:\n" +
  "   * liczby wszystkich zwierzaków,\n" +
  "   * liczby wszystkich roślin,\n" +
  "   * liczby wolnych pól,\n" +
  "   * najpopularniejszych genotypów,\n" +
  "   * średniego poziomu energii dla żyjących zwierzaków,\n" +
  "   * średniej długości życia zwierzaków dla martwych zwierzaków (wartość uwzględnia wszystkie nieżyjące zwierzaki - od początku symulacji),\n" +
  "   * średniej liczby dzieci dla żyjących zwierzaków (wartość uwzględnia wszystkie powstałe zwierzaki, a nie tylko zwierzaki powstałe w danej epoce).\n" +
  "7. Po zatrzymaniu programu można oznaczyć jednego zwierzaka jako wybranego do śledzenia. Od tego momentu (do zatrzymania śledzenia) UI powinien przekazywać nam informacje o jego statusie i historii:\n" +
  "   * jaki ma genom,\n" +
  "   * która jego część jest aktywowana,\n" +
  "   * ile ma energii,\n" +
  "   * ile zjadł roślin,\n" +
  "   * ile posiada dzieci,\n" +
  "   * ile posiada potomków (niekoniecznie będących bezpośrednio dziećmi),\n" +
  "   * ile dni już żyje (jeżeli żyje),\n" +
  "   * którego dnia zmarło (jeżeli żywot już skończyło).\n" +
  "8. Po zatrzymaniu programu powinno być też możliwe:\n" +
  "   * pokazanie, które ze zwierząt mają dominujący (najpopularniejszy) genotyp (np. poprzez wyróżnienie ich wizualnie),\n" +
  "   * pokazanie, które z pól są preferowane przez rośliny (np. poprzez wyróżnienie ich wizualnie).\n" +
  '9. Jeżeli zdecydowano się na to w momencie uruchamiania symulacji, to jej statystyki powinny być zapisywane (każdego dnia) do pliku CSV. Plik ten powinnien być "otwieralny" przez dowolny rozujmiejący ten format program (np. MS Excel). \n' +
  "10. Aplikacja powinna być możliwa do zbudowania i uruchomienia z wykorzystaniem Gradle'a.\n" +
  "\n" +
  "## Ocenianie\n" +
  "\n" +
  "Za projekt można zdobyć łącznie **32xp** (powiększone o ewentualne bonusy wynikające z marchewek projektowych). Podczas oceniania uwzględniane będą następujące czynniki:\n" +
  "1. Funkcjonalność (16xp) - kompletność programu i pokrycie wszystkich wymagań, a także (przynajmniej minimalnie przyzwoita) ergonomia interfejsu użytkownika.\n" +
  "2. Kod programu (16xp)\n" +
  "   - Architektura - dekompozycja problemu, projekt modelu aplikacji, zastosowawnie wzorców projektowych;\n" +
  "   - Clean code - estetyka kodu, czytelność, stosowanie zasad SOLID, poprawne nazewnictwo itp;\n" +
  "   - Wydajność i techniczna realizacja - dobieranie odpowiednich narzędzi i algorytmów do problemów, prawidłowa obsługa wątków itp.\n" +
  "   - Obsługa błędów i zasobów zewnętrznych\n" +
  "   - Testy - powinny weryfikować przynajmniej kluczowe fragmenty logiki aplikacji\n" +
  "\n" +
  "## FAQ\n" +
  "\n" +
  "(A właściwie odpowiedzi na nie)\n" +
  "\n" +
  "* Nowo narodzony (lub wygenerowany) zwierzak jest ustawiony w losowym kierunku. Ma też aktywowany losowy gen (niekoniecznie pierwszy).\n" +
  "* Narodzone dziecko pojawia się na tym samym polu co jego rodzice.\n" +
  "* UI nie musi pozwalać na wprowadzanie dowolnych wartości parametrów. Lepiej ograniczyć dopuszczalne zakresy (w szczególności do takich, które nie spowodują natychmiastowego zawieszenia aplikacji).\n" +
  "* Energię traktujemy całkowitoliczbowo. Pilnujemy jednak, by jej jedynym źródłem były rośliny (po rozmnażaniu się suma energii organizmów na danym polu powinna być taka sama jak przed rozmnażaniem).\n" +
  "* Jeżeli na jednym polu kilka zwierzaków rywalizuje o roślinę (albo o możliwość rozmnażania), to konflikt ten jest rozwiązywany w następujący sposób:\n" +
  "  - pierwszeństwo mają organizmy o największej energii,\n" +
  "  - jeżeli to nie pozwala rozstrzygnąć, to pierwszeństwo mają organizmy najstarsze,\n" +
  "  - jeżeli to nie pozwala rozstrzygnąć, to pierwszeństwo mają organizmy o największej liczbie dzieci,\n" +
  "  - jeżeli to nie pozwala rozstrzygnąć, to wśród remisujących organizmów wybieramy losowo.\n" +
  "* Rośliny mogą rosnąć tam, gdzie stoją zwierzaki. Zjadanie ma miejsce w momencie wchodzenia na pole. Potem zwierzak nie przeszkadza już w istnieniu rośliny.\n" +
  "* Nowe rośliny nie pojawiają się, jeżeli nie ma już dla nich miejsca na mapie.\n" +
  "* Statystyki nie muszą być prezentowane w formie wykresu (choć na pewno byłoby to ciekawe usprawnienie).\n" +
  "* Powyższa specyfikacja może różnić się trochę (lub bardzo) od analogicznych dokumentów znanych ubiegłym rocznikom. Zaleca się czujność i unikanie dróg na skróty. :)\n" +
  "\n" +
  "# Przykładowe implementacje\n" +
  "\n" +
  "Uwaga: przedstawione implementacje niekoniecznie spełniają tegoroczne wymagania.\n" +
  "\n" +
  "* <https://www.youtube.com/watch?v=4FangGEpwe4>";
