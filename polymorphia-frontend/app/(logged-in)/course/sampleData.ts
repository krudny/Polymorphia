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
  "    ```C\n" +
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
  "export const sampleText =\n" +
  '  "# Lab 1: Instrukcje sterujące w Javie\\n" +\n' +
  '  "\\n" +\n' +
  '  "Celem laboratorium jest zapoznanie się z podstawowymi pojęciami oraz instrukcjami sterującymi w Javie.\\n" +\n' +
  '  "\\n" +\n' +
  '  "Najważniejsze zadania:\\n" +\n' +
  '  "\\n" +\n' +
  '  "1. Konfiguracja środowiska.\\n" +\n' +
  '  "2. Stworzenie klasy `World` sterującej programem.\\n" +\n' +
  '  "3. Stworzenie typu wyliczeniowego `MoveDirection` i narzędzia `OptionsParser`.\\n" +\n' +
  '  "\\n" +\n' +
  '  "\\n" +\n' +
  '  "## Zadania do wykonania (4xp)\\n" +\n' +
  '  "\\n" +\n' +
  '  "**Uwaga 1:** Przed zainicjowaniem projektu zalecamy upewnić się, czy połączenie z Internetem jest stabilne i wystarczająco szybkie. Stworzenie projektu wymaga pobrania kilku dodatkowych narzędzi w tle. W szczególności **NIE** polecamy pracy na otwartej sieci `AGH-Guest` (lepiej skorzystać z `AGH-5` lub `AGH-WPA`).\\n" +\n' +
  '  "\\n" +\n' +
  "  '**Uwaga 2:** Projekt tworzony na zajęciach powinien znaleźć się w utworzonym wcześniej repozytorium Git. Kolejne laboratoria będą wymagały rozszerzania tego projektu o nowe elementy. **Pamiętaj, by każdą laborkę rozpoczynać od utworzenia brancha z aktualnego stanu repo (np. \"lab1\")**, a także o regularnym commitowaniu zmian i udostępnieniu gotowego rozwiązania w formie Pull Requesta do oceny zgodnie z wytycznymi prowadzącego. Zwracaj też uwagę na pliki, które commitujesz - nie umieszczaj w repo śmieci (w razie potrzebny zmodyfikuj *.gitignore*), jedynie sam kod i pliki konfiguracyjne gradle. Polecamy na początek zajrzeć do [dodatkowej instrukcji o pracy z Gitem podczas laboratoriów](../lab0/git_workflow_tutorial.md).\\n' +\n" +
  '  "\\n" +\n' +
  '  "1. Uruchom program IntelliJ.\\n" +\n' +
  '  "\\n" +\n' +
  '  "2. Utwórz nowy projekt o nazwie `oolab` typu **Gradle**. Pamiętaj, by w kreatorze projektu ustawić pole `Language` na `Java`, `Build system` na `Gradle`  (a **nie** na `IntelliJ`), a `Gradle DSL` najlepiej na `Groovy`. Możesz wybrać (lub w razie potrzeby pobrać) najnowszą wersję JDK, ale zalecamy **21**, ponieważ jest to wersja LTS i instrukcje do laboratoriów są o nią oparte. \\n" +\n' +
  '  "\\n" +\n' +
  '  "3. Po utworzeniu projektu poczekaj aż IntelliJ zainicjuje projekt - może to chwilę potrwać. Jeśli wszystko poszło ok, po lewej stronie zobaczysz drzewo katalogów. Katalog `java` (w `src/main`) powinien mieć niebieską ikonę (oznacza to, że został wykryty jako katalog ze źródłami po zainicjowaniu przez Gradle).\\n" +\n' +
  '  "\\n" +\n' +
  "  '4. W katalogu `src/main/java/` utwórz pakiet `agh.ics.oop` (ppm na `src/main/java` -> `New package`). Możesz też od razu usunąć ewentualne \"śmieci\" wygenerowane przez IntelliJ (pakiet `org.example`).\\n' +\n" +
  '  "\\n" +\n' +
  '  "5. W pakiecie `agh.ics.oop` utwórz klasę `World` ze statyczną metodą `main`.\\n" +\n' +
  '  "\\n" +\n' +
  '  "6. Zaimplementuj metodę `main` tak aby wyświetlały się dwa komunikaty:\\n" +\n' +
  '  "   - `system wystartował`\\n" +\n' +
  '  "   - `system zakończył działanie`\\n" +\n' +
  '  "\\n" +\n' +
  '  "7. Uruchom program, np. klikając zieloną ikonę pojawiającą się na początku linii, w której występuje metoda `main`.\\n" +\n' +
  '  "\\n" +\n' +
  '  "8. Dodaj metodę statyczną `run`, która jest wywoływana pomiędzy tymi komunikatami.\\n" +\n' +
  '  "\\n" +\n' +
  '  "9. Metoda `run` powinna informować o tym, że zwierzak idzie do przodu.\\n" +\n' +
  '  "\\n" +\n' +
  '  "10. Uruchom program.\\n" +\n' +
  '  "\\n" +\n' +
  '  "11. Rozszerz metodę `run` tak, by akceptowała tablicę argumentów typu `String`. Przekaż do niej tablicę `args`, która zawiera parametry wywołania programu.\\n" +\n' +
  '  "\\n" +\n' +
  '  "12. Po komunikacie o poruszaniu się do przodu wypisz w konsoli wartości wszystkich argumentów tej metody oddzielone przecinkami. Zwróć uwagę na to, żeby nie było nadmiarowych przecinków.\\n" +\n' +
  '  "\\n" +\n' +
  '  "13. Uruchom program z dowolnymi parametrami (muszą występować co najmniej 2). W IntelliJ parametry programu możesz ustawiać po wejściu w konfigurację uruchomieniową (rozwijane menu z nazwą klasy --> `Edit configurations...` --> pole `Program arguments`).\\n" +\n' +
  '  "\\n" +\n' +
  '  "14. Zmodyfikuj program tak, aby interpretował wprowadzone argumenty:\\n" +\n' +
  '  "\\n" +\n' +
  '  "    - `f` - oznacza, że zwierzak idzie do przodu,\\n" +\n' +
  '  "    - `b` - oznacza, że zwierzak idzie do tyłu,\\n" +\n' +
  '  "    - `r` - oznacza, że zwierzak skręca w prawo,\\n" +\n' +
  '  "    - `l` - oznacza, że zwierzak skręca w lewo,\\n" +\n' +
  '  "    - pozostałe argumenty powinny być ignorowane.\\n" +\n' +
  '  "\\n" +\n' +
  '  "15. Poruszanie się oraz zmiana kierunku ma być oznajmiana odpowiednim komunikatem. Program powinien akceptować dowolną liczbę\\n" +\n' +
  '  "    argumentów. Przykładowo wprowadzenie sekwencji `f f r l` powinno dać w wyniku następujące komunikaty:\\n" +\n' +
  '  "    - Start\\n" +\n' +
  '  "    - Zwierzak idzie do przodu\\n" +\n' +
  '  "    - Zwierzak idzie do przodu\\n" +\n' +
  '  "    - Zwierzak skręca w prawo\\n" +\n' +
  '  "    - Zwierzak skręca w lewo\\n" +\n' +
  '  "    - Stop\\n" +\n' +
  '  "\\n" +\n' +
  '  "16. Zdefiniuj typ wyliczeniowy (enum) `MoveDirection`, który będzie zawierał wszystkie opcje ruchu (np. `FORWARD`, `BACKWARD` itp.). Enum powinien znajdować się w nowym pliku w pakiecie `agh.ics.oop.model` (utwórz w tym celu pod-pakiet `model`).\\n" +\n' +
  '  "    \\n" +\n' +
  '  "17. Zmodyfikuj program w ten sposób, aby metoda `run` nie akceptowała tablicy łańcuchów znaków, lecz tablicę\\n" +\n' +
  '  "    wartości typu wyliczeniowego (`enum`).  W tym celu dodaj nową klasę `OptionsParser`, zawierającą jedną statyczną metodę. Powinna ona przyjmować tablicę łańcuchów znaków i zwracać tablicę `MoveDirection[]`. Niepoprawne opcje powinny być pomijane (tablica wynikowa powinna zawierać wyłącznie prawidłowe kierunki).\\n" +\n' +
  '  "    **Uwaga:** Każdy plik `.java` może zawierać tylko jedną klasę publiczną i nazwa klasy musi być identyczna z nazwą pliku (także pod względem wielkości liter). Więc `OptionsParser` również powinien znaleźć się w osobnym pliku. Umieść go w głównym pakiecie `agh.ics.oop`.\\n" +\n' +
  '  "    \\n" +\n' +
  '  "18. Zweryfikuj poprawność działania programu poprzez jego uruchomienie.\\n" +\n' +
  '  "\\n" +\n' +
  '  "19. Zamknij IntelliJ.\\n" +\n' +
  '  "\\n" +\n' +
  "  \"20. W pliku `build.gradle` w sekcji `plugins` dodaj linię `id 'application'`: \\n\" +\n" +
  '  "    ```\\n" +\n' +
  '  "    plugins {\\n" +\n' +
  "  \"      id 'application'\\n\" +\n" +
  "  \"      id 'java'\\n\" +\n" +
  '  "    }\\n" +\n' +
  '  "    ```\\n" +\n' +
  '  "\\n" +\n' +
  '  "21. W tym samym pliku dodaj sekcję:\\n" +\n' +
  '  "    ```\\n" +\n' +
  '  "    application {\\n" +\n' +
  "  \"      getMainClass().set('agh.ics.oop.World')\\n\" +\n" +
  '  "    }\\n" +\n' +
  '  "    ```\\n" +\n' +
  '  "\\n" +\n' +
  '  "22. W tym samym pliku dodaj sekcję:\\n" +\n' +
  '  "    ```\\n" +\n' +
  '  "    java {\\n" +\n' +
  '  "        toolchain {\\n" +\n' +
  '  "            languageVersion.set(JavaLanguageVersion.of(21))\\n" +\n' +
  '  "        }\\n" +\n' +
  '  "    }\\n" +\n' +
  '  "    ```\\n" +\n' +
  '  "    (możesz wybrać inną wersję Javy).\\n" +\n' +
  '  "\\n" +\n' +
  '  "23. Otwórz konsolę (np. terminal/PowerShell).\\n" +\n' +
  '  "\\n" +\n' +
  '  "24. Wywołaj komendę `export JAVA_HOME=/usr/lib/jvm/java-21` (pod Windows trzeba będzie ustawić zmienną środowiskową wskazującą na katalog, w którym zainstalowana jest Java). **Komendę trzeba zaadaptować do lokalnej instalacji Javy!**\\n" +\n' +
  '  "\\n" +\n' +
  "  '25. Uruchom program poleceniem `./gradlew run --args=\"f l\"` (lub `gradlew.bat ...` w systemie Windows)\\n' +\n" +
  '  "\\n" +\n' +
  '  "26. Zmodyfikuj argumenty wywołania i sprawdź zachowanie programu.\\n" +\n' +
  '  "    \\n" +\n' +
  '  "\\n" +\n' +
  '  "## Przydatne informacje\\n" +\n' +
  '  "\\n" +\n' +
  '  "* W programie Javy funkcja (a właściwie metoda) `main` musi być częścią jakiejś klasy. Jest ona punktem startowym programu.\\n" +\n' +
  '  "\\n" +\n' +
  '  "* Metoda `main` akceptuje tablicę argumentów typu `String`, ponadto jest publiczną metodą statyczną:\\n" +\n' +
  '  "\\n" +\n' +
  '  "  ```java\\n" +\n' +
  '  "  public class World {\\n" +\n' +
  '  "     public static void main(String[] args) {\\n" +\n' +
  '  "        // treść metody\\n" +\n' +
  '  "     }\\n" +\n' +
  '  "  }\\n" +\n' +
  '  "  ```\\n" +\n' +
  '  "\\n" +\n' +
  '  "* Do wypisywania komunikatów użyj metod `System.out.print()` oraz `System.out.println()`.\\n" +\n' +
  '  "\\n" +\n' +
  '  "* Warunki logiczne w Javie są przechowywane w zmiennej typu `boolean` - nie ma automatycznej konwersji z innych typów.\\n" +\n' +
  '  "\\n" +\n' +
  '  "* W Javie dostępna jest standardowa pętla `for` znana z C/C++. Można również użyć alternatywnej pętli `for` (tzw. `for each`) \\n" +\n' +
  '  "  do iterowania po elementach kolekcji:\\n" +\n' +
  '  "\\n" +\n' +
  '  "    ```java\\n" +\n' +
  '  "  for (String argument : arguments) {\\n" +\n' +
  '  "  \\n" +\n' +
  '  "  }\\n" +\n' +
  '  "    ```\\n" +\n' +
  '  "\\n" +\n' +
  '  "* **Uwaga:** W Javie łańcuchy znaków (oraz inne typy referencyjne) porównuje się za pomocą wywołania `equals`, np.\\n" +\n' +
  '  "  `string1.equals(string2)`. Zapis `string1 == string2` jest składniowo poprawny, ale sprawdza **identyczność referencji**.\\n" +\n' +
  '  "\\n" +\n' +
  '  "* Typ wyliczeniowy deklaruje się za pomocą słowa kluczowego `enum`, np.:\\n" +\n' +
  '  "\\n" +\n' +
  '  "  ```java\\n" +\n' +
  '  "  enum MoveDirection {\\n" +\n' +
  '  "    FORWARD,\\n" +\n' +
  '  "    BACKWARD,\\n" +\n' +
  '  "    RIGHT,\\n" +\n' +
  '  "    LEFT\\n" +\n' +
  '  "  }\\n" +\n' +
  '  "  ```\\n" +\n' +
  '  "\\n" +\n' +
  '  "* Typu wyliczeniowego można użyć odwołując się do jego składowych, np.:\\n" +\n' +
  '  "\\n" +\n' +
  '  "  ```java\\n" +\n' +
  '  "  MoveDirection direction = MoveDirection.FORWARD;\\n" +\n' +
  '  "  ```\\n" +\n' +
  '  "\\n" +\n' +
  '  "* Instrukcję `switch` można używać m. in. na typach wyliczeniowych oraz napisach zarówno w formie instrukcji, jak i wyrażenia, którego wynik można przypisać do zmiennej (od Javy 14):\\n" +\n' +
  '  "\\n" +\n' +
  '  "  ```java\\n" +\n' +
  '  "   switch (argument) {\\n" +\n' +
  '  \'    case "f" ->  System.out.println("Do przodu");\\n\' +\n' +
  '  \'    case "b" ->  System.out.println("Do tyłu");\\n\' +\n' +
  '  "  }\\n" +\n' +
  '  "  \\n" +\n' +
  '  "  String message = switch (argument) {\\n" +\n' +
  '  \'    case "f" -> "Do przodu";\\n\' +\n' +
  '  \'    case "b" -> "Do tyłu";\\n\' +\n' +
  "  '    default -> \"Nieznana komenda\";\\n' +\n" +
  '  "  };\\n" +\n' +
  '  "  \\n" +\n' +
  '  "  System.out.println(message);\\n" +\n' +
  '  "  ```\\n" +\n' +
  '  "\\n" +\n' +
  '  "* W Javie można dość łatwo przekazać fragment tablicy, np. jako rezultat wywołania funkcji lub jako argument pętli `for`. Służy do tego wywołanie: \\n" +\n' +
  '  "\\n" +\n' +
  '  "  ```java\\n" +\n' +
  '  "  Arrays.copyOfRange(array, startInclusive, endExclusive);\\n" +\n' +
  '  "  ```\\n"';
