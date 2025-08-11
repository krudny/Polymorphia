# Backend maintenance info
## Database migrations
The app is using Flyway tool to handle the migrations. 
To enable them, you should add the following to your 
`application.properties` file:
```aiignore
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
spring.flyway.baseline-on-migrate=false
spring.flyway.baseline-version=1
```
You should also create the directory `src/main/resources/db/migration`.    

The state of migrations is written to flyway_schema_history table in the db.
The naming convention of the migration files required by Flyway is `V<number>__<name>.sql`.

A really good guide for IntelliJ users, among with pictures and animations 
is provided in a very clear way 
[here](https://blog.jetbrains.com/idea/2024/11/how-to-use-flyway-for-database-migrations-in-spring-boot-applications/), 
[this video](https://www.youtube.com/watch?v=AMopB9C2bH8) could also be helpful. 