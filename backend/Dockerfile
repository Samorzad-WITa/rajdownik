FROM maven:3.8.5-openjdk-17

WORKDIR /backend
COPY . .
RUN mvn clean install

CMD mvn -pl client-app -am spring-boot:run