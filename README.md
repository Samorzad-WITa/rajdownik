1. In main project directory:
```
mvn clean install
```
2. Go to ./client-app/src/main/resources/application.yml
3. Change datasource url, username and password for Postgres database
4. Run client
```
mvn -pl client-app -am spring-boot:run
```
4. Swagger ui
```
http://localhost:1144/swagger-ui/index.html
```