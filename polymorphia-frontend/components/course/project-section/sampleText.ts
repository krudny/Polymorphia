export const sampleText =
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
  "    ```\n" +
  "    plugins {\n" +
  "      id 'application'\n" +
  "      id 'java'\n" +
  "    }\n" +
  "    ```\n" +
  "\n" +
  "21. W tym samym pliku dodaj sekcję:\n" +
  "    ```\n" +
  "    application {\n" +
  "      getMainClass().set('agh.ics.oop.World')\n" +
  "    }\n" +
  "    ```\n" +
  "\n" +
  "22. W tym samym pliku dodaj sekcję:\n" +
  "    ```\n" +
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

export const sampleText2 =
  "[G] dorodne plony - preferowany jest rozkład równomierny, ale na pewnym kwadratowym podobszarze mapy (zajmującym 20% mapy) czasem pojawiają się większe rośliny, których zjedzenie dodaje zwierzakowi znacznie więcej energii. Każda taka roślina zajmuje kwadratowy obszar 2x2 pola. Obsługa sytuacji, w której więcej zwierzaków kończy ruch na jednym z pól należących do dużej rośliny powinna wyglądać tak samo jak w przypadku, gdy wiele zwierząt walczy o normalną roślinę na jednym polu.";
export const sampleText3 =
  "[2] podmianka - mutacja może też skutkować tym, że dwa geny zamienią się miejscami.";
